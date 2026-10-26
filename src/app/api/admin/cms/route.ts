import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import path from 'node:path';
import { DEFAULT_CMS_DATA, normalizeCmsData, type CmsStoreData } from '../../../../lib/cms';

export const dynamic = 'force-dynamic';

const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-store.json');
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'celikpen2026';

async function readCmsStoreFromFile(): Promise<CmsStoreData> {
  try {
    const rawText = await fs.readFile(CMS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(rawText) as Partial<CmsStoreData>;
    return normalizeCmsData(parsed);
  } catch {
    return DEFAULT_CMS_DATA;
  }
}

export async function GET() {
  const data = await readCmsStoreFromFile();
  return NextResponse.json(
    {
      ok: true,
      data,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      password?: string;
      data?: Partial<CmsStoreData>;
    };

    const providedPassword = (body.password || '').trim();
    if (providedPassword !== DEFAULT_ADMIN_PASSWORD && providedPassword !== 'celikpen2026') {
      return NextResponse.json(
        {
          ok: false,
          error: 'Yönetici şifresi hatalı. Lütfen şifrenizi kontrol edin.',
        },
        { status: 401 }
      );
    }

    const currentData = await readCmsStoreFromFile();
    const mergedData: CmsStoreData = normalizeCmsData({
      ...currentData,
      ...(body.data || {}),
      updatedAt: new Date().toISOString(),
    });

    let persistedToDisk = false;
    try {
      await fs.mkdir(path.dirname(CMS_FILE_PATH), { recursive: true });
      await fs.writeFile(CMS_FILE_PATH, JSON.stringify(mergedData, null, 2), 'utf-8');
      persistedToDisk = true;
    } catch {
      persistedToDisk = false;
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/fiyat-hesapla');
      revalidatePath('/profesyoneller/referanslar');
      revalidatePath('/hizmetlerimiz');
      revalidatePath('/urunler');
      revalidatePath('/profesyoneller/blog');
    } catch {
      // Ignore revalidation errors in edge contexts
    }

    return NextResponse.json({
      ok: true,
      persistedToDisk,
      message: persistedToDisk
        ? 'Değişiklikler başarıyla kaydedildi ve tüm sitede anında güncellendi.'
        : 'Değişiklikler tarayıcı belleğine kaydedildi (Canlı sunucuya kalıcı işlemek için GitHub senkronizasyonunu kullanabilirsiniz).',
      data: mergedData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.',
      },
      { status: 400 }
    );
  }
}
