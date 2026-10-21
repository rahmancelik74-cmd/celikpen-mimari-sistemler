import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '../config/site.config';
import { SEO_BUSINESS } from '../config/seo.config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.brandName} Cam Balkon & Mimari Cam Sistemleri`,
    short_name: SITE_CONFIG.brandName,
    description: SEO_BUSINESS.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#0F172A',
    lang: 'tr-TR',
    dir: 'ltr',
    orientation: 'portrait-primary',
    categories: ['business', 'shopping', 'utilities'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
