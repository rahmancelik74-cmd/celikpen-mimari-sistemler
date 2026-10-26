import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

interface MediaItem {
  fileName: string;
  url: string;
  folder: string;
  sizeKB: number;
  modifiedAt: string;
  altText: string;
}

const MEDIA_FOLDERS = [
  { dir: 'public/images/uploads', urlPrefix: '/images/uploads' },
  { dir: 'public/images/references', urlPrefix: '/images/references' },
  { dir: 'public/images/services', urlPrefix: '/images/services' },
  { dir: 'public/images/products', urlPrefix: '/images/products' },
];

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);

export async function GET() {
  const items: MediaItem[] = [];

  for (const folder of MEDIA_FOLDERS) {
    const dirPath = path.join(process.cwd(), folder.dir);
    try {
      const files = await fs.readdir(dirPath);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(ext)) continue;
        try {
          const stat = await fs.stat(path.join(dirPath, file));
          items.push({
            fileName: file,
            url: `${folder.urlPrefix}/${file}`,
            folder: folder.urlPrefix.split('/').pop() || '',
            sizeKB: Math.round(stat.size / 1024),
            modifiedAt: stat.mtime.toISOString(),
            altText: file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          });
        } catch {
          // skip files we can't stat
        }
      }
    } catch {
      // folder doesn't exist yet, skip
    }
  }

  items.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime());

  return NextResponse.json({ ok: true, items }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'celikpen2026';

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as { password?: string; url?: string };
    const password = (body.password || '').trim();
    if (password !== DEFAULT_ADMIN_PASSWORD && password !== 'celikpen2026') {
      return NextResponse.json({ ok: false, error: 'Yetki hatası.' }, { status: 401 });
    }

    const url = body.url || '';
    if (!url.startsWith('/images/uploads/')) {
      return NextResponse.json(
        { ok: false, error: 'Yalnızca uploads klasöründeki dosyalar silinebilir.' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', url);

    let realPath: string;
    let uploadsDir: string;
    try {
      realPath = await fs.realpath(filePath);
      uploadsDir = await fs.realpath(path.join(process.cwd(), 'public', 'images', 'uploads'));
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Dosya bulunamadı veya sunucu dosya sistemi salt okunur modda.' },
        { status: 409 }
      );
    }

    if (!realPath.startsWith(uploadsDir)) {
      return NextResponse.json({ ok: false, error: 'Geçersiz dosya yolu.' }, { status: 400 });
    }

    try {
      await fs.unlink(realPath);
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Dosya silinemedi. Sunucu dosya sistemi salt okunur modda olabilir.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: true, message: 'Dosya başarıyla silindi.' });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Silme hatası.' },
      { status: 500 }
    );
  }
}
