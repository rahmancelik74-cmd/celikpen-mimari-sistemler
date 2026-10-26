import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import {
  WINSA_PRODUCTS,
  getWinsaProductBySlug,
  getWinsaProductsByCategory,
  getAllWinsaProductSlugs,
} from '../../../config/winsa-products.config';
import { MinimalSubpageHeader } from '../../../components/MinimalSubpageHeader';
import { ProductDetailInteractive } from '../../../components/ProductDetailInteractive';
import { PrintDatasheetButton } from '../../../components/PrintDatasheetButton';
import { LiteYouTubeEmbed } from '../../../components/LiteYouTubeEmbed';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildProductSchema,
} from '../../../components/SeoJsonLd';

export function generateStaticParams() {
  return getAllWinsaProductSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prod = getWinsaProductBySlug(slug) || WINSA_PRODUCTS[0];

  return generatePageMetadata({
    title: `${prod.name} | Teknik Özellikler & Kesit | ${SITE_CONFIG.brandName}`,
    description: `${prod.tagline} ${prod.shortDescription}`,
    path: `/urunler/${prod.slug}`,
    keywords: [
      prod.name,
      prod.category,
      prod.code,
      `${prod.name} fiyat`,
      'cam balkon teknik özellikler',
    ],
    image: prod.defaultImage,
    imageAlt: `${prod.name} teknik kesit ve uygulama görseli`,
  });
}

export default async function UrunDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prod = getWinsaProductBySlug(slug) || WINSA_PRODUCTS[0];
  const relatedProducts = getWinsaProductsByCategory(prod.categorySlug)
    .filter((item) => item.slug !== prod.slug)
    .slice(0, 4);

  const productSchema = buildProductSchema({
    name: prod.name,
    sku: prod.code,
    category: prod.category,
    description: prod.fullDescription || prod.shortDescription,
    path: `/urunler/${prod.slug}`,
    image: prod.defaultImage,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Ürünlerimiz', path: '/urunler' },
    { name: prod.name, path: `/urunler/${prod.slug}` },
  ]);

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-8 text-slate-700 sm:px-6 lg:px-8 print:py-2">
      <JsonLd data={productSchema} id="urun-product-jsonld" />
      <JsonLd data={breadcrumbSchema} id="urun-breadcrumb-jsonld" />

      <MinimalSubpageHeader
        breadcrumbLabel={prod.code}
        parentBreadcrumb={{ label: 'Ürünlerimiz', href: '/urunler' }}
        overline={`${prod.category} • ${prod.code}`}
        title={prod.name}
        subtitle={prod.shortDescription}
        rightAction={
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <PrintDatasheetButton />
            <Link
              prefetch={true}
              href="/iletisim"
              className="rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#1D4ED8]"
            >
              Keşif &amp; Bilgi Al →
            </Link>
          </div>
        }
      />

      {/* İnteraktif Bento Spec Grid + 1:1 CAD Kesit + Canlı Renk Seçici */}
      <ProductDetailInteractive product={prod} />

      {/* Resmi Sistem Video İncelemesi (LiteYouTube + VideoObject JSON-LD) */}
      <div className="mt-10 print:hidden">
        <LiteYouTubeEmbed slug={prod.slug} />
      </div>

      {/* Bu Kategorideki Diğer Sistemler */}
      {relatedProducts.length > 0 && (
        <section className="mt-10 border-t border-slate-200/80 pt-8 print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#0F172A]">
              {prod.category} Grubundaki Diğer Seriler
            </h2>
            <Link
              prefetch={true}
              href="/urunler" className="text-xs font-bold text-[#1E3A8A] hover:underline">
              Tüm Ürünler →
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rel) => (
              <Link
                prefetch={true}
                key={rel.slug}
                href={`/urunler/${rel.slug}`}
                className="hover-lift group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={rel.defaultImage}
                    alt={`${rel.name} gerçek uygulama fotoğrafı`}
                    title={`${rel.name} (${rel.code}) — Çelikpen Sistem Kataloğu`}
                    width={480}
                    height={300}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded bg-slate-950/75 px-2 py-0.5 text-[9.5px] font-extrabold text-white backdrop-blur-sm">
                    {rel.code}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-black text-[#0F172A] group-hover:text-[#1E3A8A]">
                    {rel.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {rel.technicalSpecs.profilGenisligi} • Uw: {rel.technicalSpecs.isiYalitimiUw}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
