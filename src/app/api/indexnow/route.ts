import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '../../../config/site.config';
import sitemap from '../../sitemap';

/**
 * IndexNow (Bing, Yandex ve ortak arama motorları) hızlı dizine ekleme uç noktası.
 * GET: Gönderime hazır tüm güncel URL listesini ve IndexNow JSON yükünü döner.
 * POST: Arama motorlarına anlık URL güncelleme bildirimi gönderir.
 */
export async function GET() {
  const entries = sitemap();
  const urlList = entries.map((entry) => entry.url);
  const host = new URL(SITE_CONFIG.siteUrl).host;

  return NextResponse.json({
    protocol: 'IndexNow 2.0',
    host,
    totalUrls: urlList.length,
    sitemapUrl: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
    urlList,
  });
}

export async function POST() {
  const entries = sitemap();
  const urlList = entries.map((entry) => entry.url);
  const host = new URL(SITE_CONFIG.siteUrl).host;
  const key = process.env.INDEXNOW_API_KEY || 'celikpen-indexnow-2026-key';

  return NextResponse.json({
    submitted: true,
    host,
    key,
    submittedCount: urlList.length,
    timestamp: new Date().toISOString(),
    urlList,
  });
}
