/**
 * ÇELİKPEN MİMARİ SİSTEMLER — SEO ANALİTİK, ARAMA MOTORU DOĞRULAMA & INDEXNOW MERKEZİ
 *
 * Google Search Console, Google Analytics 4 (GA4), Google Tag Manager (GTM),
 * Bing Webmaster Tools, Yandex Webmaster ve IndexNow anlık dizinleme yapılandırması.
 */

export const INDEXNOW_STATIC_KEY = 'c7e9a2b4d6f8e1a3c5b7d9f0a2e4c6b8';

export const ANALYTICS_CONFIG = {
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_verification ||
    '',
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  gtmContainerId: process.env.NEXT_PUBLIC_GTM_ID || '',
  bingVerification: process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
  indexNowKey: process.env.INDEXNOW_API_KEY || INDEXNOW_STATIC_KEY,
  indexNowKeyLocation: `/c7e9a2b4d6f8e1a3c5b7d9f0a2e4c6b8.txt`,
  trackedConversionEvents: [
    'whatsapp_click',
    'phone_call_click',
    'price_calculator_used',
    'catalog_download',
    'article_share',
    'backlink_citation_copied',
    'video_play_click',
    'google_maps_directions_click',
  ] as const,
};
