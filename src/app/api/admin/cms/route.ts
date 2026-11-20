import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import path from 'node:path';
import { DEFAULT_CMS_DATA, normalizeCmsData, type CmsStoreData } from '../../../../lib/cms';
import { getMergedCmsData } from '../../../../lib/cms-server';
import { writeCmsToBlob } from '../../../../lib/blob-storage';
import { verifyAdminRequest } from '../../../../lib/admin-auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-store.json');

function redactSensitiveCmsFields(data: CmsStoreData): CmsStoreData {
  return {
    ...data,
    siteSettings: {
      ...data.siteSettings,
      googlePlacesApiKey: '',
    },
    smtpSettings: {
      ...DEFAULT_CMS_DATA.smtpSettings,
      user: '',
      password: '',
    },
    users: [],
    sessions: [],
    auditLogs: [],
    discoveryRequests: [],
  };
}

async function commitCmsToGitHubIfConfigured(content: string): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN || '';
  if (!token) return false;

  const repo = process.env.GITHUB_REPO || 'rahmancelik74-cmd/celikpen-mimari-sistemler';
  const filePath = 'src/data/cms-store.json';
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  try {
    const existingRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    let sha: string | undefined;
    if (existingRes.ok) {
      const existing = (await existingRes.json()) as { sha?: string };
      sha = existing.sha;
    }

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'chore(cms): admin paneli iki yonlu senkronizasyon guncellemesi',
        content: Buffer.from(content, 'utf-8').toString('base64'),
        ...(sha ? { sha } : {}),
        branch: 'main',
      }),
    });

    return putRes.ok;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const data = await getMergedCmsData();
  const isAdmin = verifyAdminRequest(request);
  return NextResponse.json(
    {
      ok: true,
      data: isAdmin ? data : redactSensitiveCmsFields(data),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

async function handleWriteCms(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      password?: string;
      data?: Partial<CmsStoreData>;
    };

    if (!verifyAdminRequest(request, body.password)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Yetkisiz erişim. Lütfen yönetici girişi yapın.',
        },
        { status: 401 }
      );
    }

    const currentData = await getMergedCmsData();
    const mergedData: CmsStoreData = normalizeCmsData({
      ...currentData,
      ...(body.data || {}),
      updatedAt: new Date().toISOString(),
    });

    const serialized = JSON.stringify(mergedData, null, 2);

    let persistedToDisk = false;
    try {
      await fs.mkdir(path.dirname(CMS_FILE_PATH), { recursive: true });
      await fs.writeFile(CMS_FILE_PATH, serialized, 'utf-8');
      persistedToDisk = true;
    } catch {
      persistedToDisk = false;
    }

    const persistedToBlob = await writeCmsToBlob(mergedData);
    const persistedToGitHub = await commitCmsToGitHubIfConfigured(serialized);

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/projelerimiz');
      revalidatePath('/fiyat-hesapla');
      revalidatePath('/profesyoneller/referanslar');
      revalidatePath('/hizmetlerimiz');
      revalidatePath('/urunler');
      revalidatePath('/blog');
      revalidatePath('/profesyoneller/blog');
      revalidatePath('/iletisim');
      revalidatePath('/kurumsal');
      revalidatePath('/yorumlar');
      revalidatePath('/sitemap.xml');
      for (const post of mergedData.blogPosts) {
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath(`/profesyoneller/blog/${post.slug}`);
      }
    } catch {
      // Ignore revalidation errors in edge contexts
    }

    const persisted = persistedToDisk || persistedToBlob || persistedToGitHub;

    return NextResponse.json({
      ok: true,
      persistedToDisk,
      persistedToBlob,
      persistedToGitHub,
      message: persisted
        ? 'Değişiklikler başarıyla kaydedildi ve tüm sitede anında güncellendi.'
        : 'Değişiklikler tarayıcı belleğine kaydedildi (Canlı sunucuya kalıcı işlemek için Vercel Blob Storage veya GITHUB_TOKEN ayarlayın).',
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

export async function POST(request: Request) {
  return handleWriteCms(request);
}

export async function PUT(request: Request) {
  return handleWriteCms(request);
}

export async function DELETE(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { ok: false, error: 'Yetkisiz erişim. Lütfen yönetici girişi yapın.' },
      { status: 401 }
    );
  }
  return NextResponse.json({ ok: true, message: 'İşlem yetkisi doğrulandı.' });
}
