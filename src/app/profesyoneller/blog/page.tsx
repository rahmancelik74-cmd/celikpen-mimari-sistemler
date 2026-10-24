import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import { BlogHub } from '../../../components/professional/BlogHub';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../../components/SeoJsonLd';

const PAGE_TITLE =
  'Mimari Rehber & Blog Merkezi — Isıcamlı Cam Balkon, Winsa PVC ve Montaj Rehberleri';
const PAGE_DESCRIPTION =
  'Winsa Vera Termal, Vera Slide, Panorama HS 76, Dorado 76 ve bioklimatik pergola sistemleri hakkında mühendislik rehberleri. Isı ve ses yalıtımı, 4/5 muvafakatname, montaj ve bakım bilgileri.';

export const metadata: Metadata = generatePageMetadata({
  title: `${PAGE_TITLE} | ${SITE_CONFIG.brandName}`,
  description: PAGE_DESCRIPTION,
  path: '/profesyoneller/blog',
  keywords: [
    'cam balkon blog',
    'ısıcamlı cam balkon rehberi',
    'Winsa PVC sistemleri',
    'Panorama HS 76',
    'bioklimatik pergola',
    'cam balkon bakımı',
    'cam balkon muvafakatname',
  ],
  image: '/images/products/vera-termal.jpg',
  imageAlt: 'Winsa Vera Termal ısıcamlı cam balkon rehberi',
});

export default function ProfessionalBlogPage() {
  const webPageSchema = buildWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/profesyoneller/blog',
    type: 'CollectionPage',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Profesyoneller', path: '/profesyoneller' },
    { name: 'Blog', path: '/profesyoneller/blog' },
  ]);

  return (
    <main>
      <JsonLd data={webPageSchema} id="profesyoneller-blog-jsonld" />
      <JsonLd data={breadcrumbSchema} id="profesyoneller-blog-breadcrumb-jsonld" />
      <BlogHub />
    </main>
  );
}
