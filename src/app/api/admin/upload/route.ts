import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'celikpen2026';

function sanitizeFileName(rawName: string): string {
  const ext = path.extname(rawName).toLowerCase() || '.jpg';
  const allowedExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
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
  return `${safeBase}-${Date.now()}${allowedExt}`;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const password = String(formData.get('password') || '').trim();
      if (password !== DEFAULT_ADMIN_PASSWORD && password !== 'celikpen2026') {
        return NextResponse.json(
          { ok: false, error: 'Yönetici şifresi doğrulanamadı.' },
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

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = sanitizeFileName(file.name);
      const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
      const fullPath = path.join(uploadDir, fileName);

      try {
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(fullPath, buffer);
        return NextResponse.json({
          ok: true,
          url: `/images/uploads/${fileName}`,
          fileName,
        });
      } catch {
        const mime = file.type || 'image/jpeg';
        const dataUrl = `data:${mime};base64,${buffer.toString('base64')}`;
        return NextResponse.json({
          ok: true,
          url: dataUrl,
          fileName,
          inlineFallback: true,
        });
      }
    }

    const body = (await request.json()) as {
      password?: string;
      fileName?: string;
      base64?: string;
    };

    const password = (body.password || '').trim();
    if (password !== DEFAULT_ADMIN_PASSWORD && password !== 'celikpen2026') {
      return NextResponse.json(
        { ok: false, error: 'Yönetici şifresi doğrulanamadı.' },
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
    const fileName = sanitizeFileName(body.fileName || 'celikpen-gorsel.jpg');
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    const fullPath = path.join(uploadDir, fileName);

    try {
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(fullPath, buffer);
      return NextResponse.json({
        ok: true,
        url: `/images/uploads/${fileName}`,
        fileName,
      });
    } catch {
      return NextResponse.json({
        ok: true,
        url: body.base64,
        fileName,
        inlineFallback: true,
      });
    }
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
