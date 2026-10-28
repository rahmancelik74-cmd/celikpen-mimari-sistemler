import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { ReferenceGallery } from '../../components/professional/ReferenceGallery';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../components/SeoJsonLd';

const PAGE_TITLE = 'Projelerimiz — Cam Balkon, PVC Doğrama, Korkuluk & Pergola Uygulamaları';
const PAGE_DESCRIPTION =
  'Bahçelievler, Bakırköy, Yeşilköy, Çekmeköy ve İstanbul genelinde tamamlanan cam balkon, sürme cam, kış bahçesi, alüminyum korkuluk, PVC doğrama ve panjur projelerimiz.';

export const metadata: Metadata = generatePageMetadata({
  title: `${PAGE_TITLE} | ${SITE_CONFIG.brandName}`,
  description: PAGE_DESCRIPTION,
  path: '/projelerimiz',
  keywords: [
    'cam balkon projeleri',
    'cam balkon referansları',
    'Yeşilköy cam balkon',
    'Çekmeköy doğrama',
    'alüminyum korkuluk İstanbul',
    'kış bahçesi projeleri',
    'PVC doğrama montaj',
    'panjur kepenk projeleri',
  ],
  image: '/images/references/yesilkoy-teras-kis-bahcesi-katlanir-cam.jpg',
  imageAlt: 'Çelikpen cam balkon, kış bahçesi ve alüminyum korkuluk proje galerisi',
});

export default function ProjelerimizPage() {
  const webPageSchema = buildWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/projelerimiz',
    type: 'CollectionPage',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Projelerimiz', path: '/projelerimiz' },
  ]);

  return (
    <main>
      <JsonLd data={webPageSchema} id="projelerimiz-jsonld" />
      <JsonLd data={breadcrumbSchema} id="projelerimiz-breadcrumb-jsonld" />
      <ReferenceGallery showFilters />
    </main>
  );
}
