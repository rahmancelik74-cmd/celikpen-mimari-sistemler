import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '../../../config/site.config';
import { ANALYTICS_CONFIG, INDEXNOW_STATIC_KEY } from '../../../config/analytics.config';
import sitemap from '../../sitemap';

/**
 * IndexNow (Bing, Yandex ve ortak arama motorları) hızlı dizine ekleme uç noktası.
 * GET: Gönderime hazır tüm güncel URL listesini, IndexNow anahtarını ve keyLocation doğrulama dosyasını döner.
 * POST: Arama motorlarına anlık URL güncelleme bildirimi gönderir.
 */
export async function GET() {
  const entries = sitemap();
  const urlList = entries.map((entry) => entry.url);
  const host = new URL(SITE_CONFIG.siteUrl).host;
  const key = ANALYTICS_CONFIG.indexNowKey || INDEXNOW_STATIC_KEY;

  return NextResponse.json({
    protocol: 'IndexNow 2.0',
    host,
    key,
    keyLocation: `${SITE_CONFIG.siteUrl}/${key}.txt`,
    totalUrls: urlList.length,
    sitemapUrl: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
    urlList,
  });
}

export async function POST() {
  const entries = sitemap();
  const urlList = entries.map((entry) => entry.url);
  const host = new URL(SITE_CONFIG.siteUrl).host;
  const key = ANALYTICS_CONFIG.indexNowKey || INDEXNOW_STATIC_KEY;

  return NextResponse.json({
    submitted: true,
    host,
    key,
    keyLocation: `${SITE_CONFIG.siteUrl}/${key}.txt`,
    submittedCount: urlList.length,
    timestamp: new Date().toISOString(),
    urlList,
  });
}
