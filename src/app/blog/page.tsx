import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { BlogHub } from '../../components/professional/BlogHub';

const PAGE_TITLE = 'Mimari Rehber & Blog — Cam Balkon, PVC Doğrama ve Kış Bahçesi';
const PAGE_DESCRIPTION =
  'Eylül 2026 Yargıtay 4/5 kat maliki muvafakatname kararı, ısıcamlı cam balkon yalıtım rehberi, Winsa PVC serileri ve bioklimatik pergola teknik yazıları.';

export const metadata: Metadata = generatePageMetadata({
  title: `${PAGE_TITLE} | ${SITE_CONFIG.brandName}`,
  description: PAGE_DESCRIPTION,
  path: '/blog',
  keywords: [
    'cam balkon blog',
    'cam balkon mevzuat',
    'ısıcamlı cam balkon yalıtım',
    'Winsa PVC karşılaştırma',
    'bioklimatik pergola rehberi',
    'cam balkon bakım',
  ],
  image: '/images/products/vera-termal.jpg',
  imageAlt: 'Çelikpen mimari rehber ve blog merkezi',
});

export default function BlogPage() {
  return (
    <main>
      <BlogHub />
    </main>
  );
}
