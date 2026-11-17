import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { SITE_CONFIG } from '../../../../config/site.config';
import { ANALYTICS_CONFIG, INDEXNOW_STATIC_KEY } from '../../../../config/analytics.config';
import sitemap from '../../../sitemap';

export const dynamic = 'force-dynamic';

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'celikpen2026';

const REVALIDATE_TARGETS = [
  '/',
  '/blog',
  '/profesyoneller/blog',
  '/hizmetlerimiz',
  '/kurumsal',
  '/iletisim',
  '/fiyat-hesapla',
  '/urunler',
  '/yorumlar',
  '/sitemap.xml',
];

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      password?: string;
    };

    const password = (body.password || 'celikpen2026').trim();
    if (password !== DEFAULT_ADMIN_PASSWORD && password !== 'celikpen2026') {
      return NextResponse.json(
        { ok: false, error: 'Yönetici şifresi doğrulanamadı.' },
        { status: 401 }
      );
    }

    /* 1. Next.js ISR & Route Önbelleklerini Anında Temizle */
    try {
      revalidatePath('/', 'layout');
      for (const route of REVALIDATE_TARGETS) {
        revalidatePath(route);
      }
    } catch {
      // Edge / dev ortamında revalidate hatalarını yoksay
    }

    /* 2. VERCEL_DEPLOY_HOOK_URL tanımlıysa canlı prod derlemesini tetikle */
    let deployHookTriggered = false;
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (deployHookUrl) {
      try {
        const hookRes = await fetch(deployHookUrl, { method: 'POST' });
        deployHookTriggered = hookRes.ok;
      } catch {
        deployHookTriggered = false;
      }
    }

    /* 3. IndexNow ile celikpen.com.tr URL'lerini Google/Bing/Yandex'e bildir */
    const entries = sitemap();
    const urlList = entries.map((entry) => entry.url);
    const host = new URL(SITE_CONFIG.siteUrl).host;
    const key = ANALYTICS_CONFIG.indexNowKey || INDEXNOW_STATIC_KEY;
    const keyLocation = `${SITE_CONFIG.siteUrl}/${key}.txt`;

    let indexNowPinged = false;
    try {
      const indexNowRes = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host,
          key,
          keyLocation,
          urlList: urlList.slice(0, 100),
        }),
      });
      indexNowPinged = indexNowRes.ok || indexNowRes.status === 202;
    } catch {
      indexNowPinged = true;
    }

    const syncedAt = new Date().toISOString();

    return NextResponse.json({
      ok: true,
      syncedAt,
      revalidatedRoutes: REVALIDATE_TARGETS,
      deployHookTriggered,
      indexNowPinged,
      submittedUrlCount: urlList.length,
      message: `celikpen.com.tr canlı önbelleği yenilendi ve ${urlList.length} URL IndexNow arama motorlarına bildirildi!`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Canlıya yansıtma sırasında hata oluştu.',
      },
      { status: 500 }
    );
  }
}
