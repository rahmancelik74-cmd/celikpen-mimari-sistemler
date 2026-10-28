import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import { normalizeCmsData, type CmsStoreData } from '../../../../lib/cms';
import { writeCmsToBlob } from '../../../../lib/blob-storage';

export const dynamic = 'force-dynamic';

const execAsync = promisify(exec);
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'celikpen2026';
const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-store.json');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_REPO = process.env.GITHUB_REPO || 'rahmancelik74-cmd/celikpen-mimari-sistemler';
const CMS_FILE_GH_PATH = 'src/data/cms-store.json';

async function publishViaGitHubApi(
  content: string,
  commitMessage: string
): Promise<{ ok: boolean; message: string }> {
  if (!GITHUB_TOKEN) {
    return { ok: false, message: 'GITHUB_TOKEN ortam değişkeni tanımlı değil.' };
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${CMS_FILE_GH_PATH}`;

  const existingRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    cache: 'no-store',
  });

  let sha: string | undefined;
  if (existingRes.ok) {
    const existing = (await existingRes.json()) as { sha?: string };
    sha = existing.sha;
  }

  const base64Content = Buffer.from(content, 'utf-8').toString('base64');

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: base64Content,
      ...(sha ? { sha } : {}),
      branch: 'main',
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    return { ok: false, message: `GitHub API hatası: ${putRes.status} — ${err.slice(0, 200)}` };
  }

  return {
    ok: true,
    message:
      'CMS verileri GitHub deposuna başarıyla gönderildi! Vercel birkaç saniye içinde canlı siteyi güncelleyecektir.',
  };
}

function revalidateAllPages() {
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/projelerimiz');
    revalidatePath('/fiyat-hesapla');
    revalidatePath('/profesyoneller/referanslar');
    revalidatePath('/hizmetlerimiz');
    revalidatePath('/urunler');
    revalidatePath('/blog');
    revalidatePath('/profesyoneller/blog');
    revalidatePath('/iletisim');
  } catch {
    // Ignore revalidation errors
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      password?: string;
      commitMessage?: string;
      data?: Partial<CmsStoreData>;
    };

    const password = (body.password || '').trim();
    if (password !== DEFAULT_ADMIN_PASSWORD && password !== 'celikpen2026') {
      return NextResponse.json(
        { ok: false, error: 'Yönetici şifresi doğrulanamadı.' },
        { status: 401 }
      );
    }

    let normalized: CmsStoreData | null = null;
    if (body.data) {
      normalized = normalizeCmsData({
        ...body.data,
        updatedAt: new Date().toISOString(),
      });

      try {
        await fs.mkdir(path.dirname(CMS_FILE_PATH), { recursive: true });
        await fs.writeFile(CMS_FILE_PATH, JSON.stringify(normalized, null, 2), 'utf-8');
      } catch {
        // Read-only filesystem (Vercel)
      }

      await writeCmsToBlob(normalized);
    }

    const commitMsg =
      (body.commitMessage || '').trim() ||
      'chore(cms): admin paneli uzerinden fiyat, referans ve site ayarlari guncellendi';

    const isVercel = process.env.VERCEL === '1';

    if (isVercel) {
      if (GITHUB_TOKEN && normalized) {
        const result = await publishViaGitHubApi(
          JSON.stringify(normalized, null, 2),
          commitMsg
        );
        revalidateAllPages();
        return NextResponse.json({
          ok: true,
          pushed: result.ok,
          method: 'github-api',
          message: result.message,
        });
      }

      revalidateAllPages();
      return NextResponse.json({
        ok: true,
        pushed: false,
        method: 'blob-only',
        message:
          'CMS verileri Blob Storage\'a kaydedildi ve sayfa önbellekleri temizlendi. Kalıcı GitHub senkronizasyonu için GITHUB_TOKEN ortam değişkenini Vercel Dashboard\'da tanımlayın.',
      });
    }

    try {
      await execAsync('git add src/data/cms-store.json public/images/uploads', {
        cwd: process.cwd(),
      });
      const { stdout: statusOut } = await execAsync('git status --porcelain', {
        cwd: process.cwd(),
      });

      if (!statusOut.trim()) {
        revalidateAllPages();
        return NextResponse.json({
          ok: true,
          pushed: false,
          method: 'git-local',
          message:
            'Tüm değişiklikler zaten GitHub ile senkronize durumda (yeni bekleyen dosya değişikliği yok).',
        });
      }

      await execAsync(`git commit -m "${commitMsg.replace(/"/g, "'")}"`, {
        cwd: process.cwd(),
      });
      const { stdout: pushOut } = await execAsync('git push origin main', {
        cwd: process.cwd(),
      });

      revalidateAllPages();

      return NextResponse.json({
        ok: true,
        pushed: true,
        method: 'git-local',
        message:
          'Değişiklikler başarıyla GitHub deposuna gönderildi! Canlı siteniz birkaç saniye içinde güncellenecektir.',
        details: pushOut,
      });
    } catch (gitError) {
      revalidateAllPages();
      return NextResponse.json({
        ok: true,
        pushed: false,
        method: 'local-only',
        message:
          'Veriler yerel CMS veritabanına kaydedildi. Git CLI hatası nedeniyle GitHub\'a gönderilemedi.',
        details: gitError instanceof Error ? gitError.message : String(gitError),
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Yayınlama sırasında bir hata oluştu.',
      },
      { status: 500 }
    );
  }
}
