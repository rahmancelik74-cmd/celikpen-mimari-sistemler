import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import { ReferenceGallery } from '../../../components/professional/ReferenceGallery';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../../components/SeoJsonLd';

const PAGE_TITLE = 'Projelerimiz & Referanslar — Cam Balkon, PVC ve Pergola Uygulamaları';
const PAGE_DESCRIPTION =
  'Bahçelievler, Bakırköy, Ataköy, Florya, Yeşilköy ve Başakşehir’de tamamlanan Winsa cam balkon, Panorama HS 76, Dorado 76 PVC doğrama ve bioklimatik pergola projeleri.';

export const metadata: Metadata = generatePageMetadata({
  title: `${PAGE_TITLE} | ${SITE_CONFIG.brandName}`,
  description: PAGE_DESCRIPTION,
  path: '/profesyoneller/referanslar',
  keywords: [
    'cam balkon referansları',
    'Bahçelievler cam balkon projeleri',
    'Ataköy kaldır sür proje',
    'Florya pergola uygulaması',
    'Yeşilköy giyotin cam',
    'Başakşehir cam balkon',
  ],
  image: '/images/products/pergola.jpg',
  imageAlt: 'Çelikpen bioklimatik pergola ve cam balkon proje galerisi',
});

export default function ProfessionalReferencesPage() {
  const webPageSchema = buildWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/profesyoneller/referanslar',
    type: 'CollectionPage',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Profesyoneller', path: '/profesyoneller' },
    { name: 'Referanslar', path: '/profesyoneller/referanslar' },
  ]);

  return (
    <main>
      <JsonLd data={webPageSchema} id="profesyoneller-referanslar-jsonld" />
      <JsonLd data={breadcrumbSchema} id="profesyoneller-referanslar-breadcrumb-jsonld" />
      <ReferenceGallery />
    </main>
  );
}
