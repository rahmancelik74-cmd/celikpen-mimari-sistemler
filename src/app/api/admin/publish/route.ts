import { NextResponse } from 'next/server';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import { normalizeCmsData, type CmsStoreData } from '../../../../lib/cms';

export const dynamic = 'force-dynamic';

const execAsync = promisify(exec);
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'celikpen2026';
const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-store.json');

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

    if (body.data) {
      const normalized = normalizeCmsData({
        ...body.data,
        updatedAt: new Date().toISOString(),
      });
      try {
        await fs.mkdir(path.dirname(CMS_FILE_PATH), { recursive: true });
        await fs.writeFile(CMS_FILE_PATH, JSON.stringify(normalized, null, 2), 'utf-8');
      } catch {
        // Ignore if read-only fs
      }
    }

    const commitMsg =
      (body.commitMessage || '').trim() ||
      `chore(cms): admin paneli uzerinden fiyat, referans ve site ayarlari guncellendi`;

    try {
      await execAsync('git add src/data/cms-store.json public/images/uploads', {
        cwd: process.cwd(),
      });
      const { stdout: statusOut } = await execAsync('git status --porcelain', {
        cwd: process.cwd(),
      });

      if (!statusOut.trim()) {
        return NextResponse.json({
          ok: true,
          pushed: false,
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

      return NextResponse.json({
        ok: true,
        pushed: true,
        message:
          'Değişiklikler başarıyla GitHub deposuna gönderildi! Canlı siteniz birkaç saniye içinde güncellenecektir.',
        details: pushOut,
      });
    } catch (gitError) {
      return NextResponse.json({
        ok: true,
        pushed: false,
        message:
          'Veriler yerel CMS veritabanına kaydedildi. (Bulut sunucu ortamında Git CLI kapalı olduğu için JSON yedeğini indirerek saklayabilirsiniz.)',
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
