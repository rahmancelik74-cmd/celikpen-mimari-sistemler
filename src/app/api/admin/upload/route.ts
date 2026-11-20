import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { uploadImageToBlob } from '../../../../lib/blob-storage';
import { verifyAdminRequest } from '../../../../lib/admin-auth';

export const dynamic = 'force-dynamic';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

interface MagicImageSignature {
  mime: 'image/jpeg' | 'image/png' | 'image/webp';
  ext: '.jpg' | '.png' | '.webp';
}

/**
 * Strict Magic-Byte Validation (Stored XSS & Executable Disguise Defense):
 * Allows ONLY genuine JPEG (FF D8 FF), PNG (89 50 4E 47 0D 0A 1A 0A), and WEBP (RIFF....WEBP).
 * Rejects .svg, HTML, scripts, and disguised executables regardless of file extension.
 */
function detectAllowedImageMagicBytes(buffer: Buffer): MagicImageSignature | null {
  if (!buffer || buffer.length < 12) {
    return null;
  }

  // 1. JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { mime: 'image/jpeg', ext: '.jpg' };
  }

  // 2. PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mime: 'image/png', ext: '.png' };
  }

  // 3. WEBP: "RIFF" at 0..4 and "WEBP" at 8..12
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { mime: 'image/webp', ext: '.webp' };
  }

  return null;
}

function sanitizeFileName(rawName: string, verifiedExt: '.jpg' | '.png' | '.webp'): string {
  const base = path
    .basename(rawName, path.extname(rawName))
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);

  const safeBase = base || 'celikpen-proje';
  return `${safeBase}-${Date.now()}${verifiedExt}`;
}

async function tryDiskWrite(
  buffer: Buffer,
  fileName: string
): Promise<string | null> {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);
    return `/images/uploads/${fileName}`;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const password = String(formData.get('password') || '').trim();
      if (!verifyAdminRequest(request, password)) {
        return NextResponse.json(
          { ok: false, error: 'Yetkisiz erişim. Yönetici oturumu doğrulanamadı.' },
          { status: 401 }
        );
      }

      const file = formData.get('file');
      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { ok: false, error: 'Lütfen yüklenecek bir görsel dosyası seçin.' },
          { status: 400 }
        );
      }

      if (file.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json(
          { ok: false, error: 'Dosya boyutu 5 MB sınırını aşamaz.' },
          { status: 413 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const magic = detectAllowedImageMagicBytes(buffer);
      if (!magic) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'Geçersiz dosya formatı. Güvenlik politikası gereği yalnızca gerçek JPEG, PNG ve WEBP görsellerine izin verilmektedir (SVG ve çalıştırılabilir dosyalar engellendi).',
          },
          { status: 415 }
        );
      }

      const fileName = sanitizeFileName(file.name, magic.ext);

      const diskUrl = await tryDiskWrite(buffer, fileName);
      if (diskUrl) {
        return NextResponse.json({ ok: true, url: diskUrl, fileName });
      }

      const blobUrl = await uploadImageToBlob(fileName, buffer, magic.mime);
      if (blobUrl) {
        return NextResponse.json({ ok: true, url: blobUrl, fileName, blob: true });
      }

      const dataUrl = `data:${magic.mime};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        ok: true,
        url: dataUrl,
        fileName,
        inlineFallback: true,
      });
    }

    const body = (await request.json().catch(() => ({}))) as {
      password?: string;
      fileName?: string;
      base64?: string;
    };

    if (!verifyAdminRequest(request, body.password)) {
      return NextResponse.json(
        { ok: false, error: 'Yetkisiz erişim. Yönetici oturumu doğrulanamadı.' },
        { status: 401 }
      );
    }

    if (!body.base64) {
      return NextResponse.json(
        { ok: false, error: 'Görsel verisi bulunamadı.' },
        { status: 400 }
      );
    }

    const rawBase64 = body.base64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
    const buffer = Buffer.from(rawBase64, 'base64');

    if (buffer.length > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Dosya boyutu 5 MB sınırını aşamaz.' },
        { status: 413 }
      );
    }

    const magic = detectAllowedImageMagicBytes(buffer);
    if (!magic) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Geçersiz dosya formatı. Güvenlik politikası gereği yalnızca gerçek JPEG, PNG ve WEBP görsellerine izin verilmektedir.',
        },
        { status: 415 }
      );
    }

    const fileName = sanitizeFileName(body.fileName || 'celikpen-gorsel.jpg', magic.ext);

    const diskUrl = await tryDiskWrite(buffer, fileName);
    if (diskUrl) {
      return NextResponse.json({ ok: true, url: diskUrl, fileName });
    }

    const blobUrl = await uploadImageToBlob(fileName, buffer, magic.mime);
    if (blobUrl) {
      return NextResponse.json({ ok: true, url: blobUrl, fileName, blob: true });
    }

    return NextResponse.json({
      ok: true,
      url: `data:${magic.mime};base64,${buffer.toString('base64')}`,
      fileName,
      inlineFallback: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Görsel yüklenirken bir hata oluştu.',
      },
      { status: 500 }
    );
  }
}
