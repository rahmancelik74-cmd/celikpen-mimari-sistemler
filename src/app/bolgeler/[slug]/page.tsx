import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../../components/SeoJsonLd';
import {
  SEO_DISTRICT_PAGES,
  getSeoDistrictBySlug,
} from '../../../data/seoDistricts';
import { SEO_SERVICE_PAGES } from '../../../data/seoServices';
import {
  EXACT_COORDINATES,
  EXACT_GOOGLE_MAPS_URL,
  EXACT_READ_REVIEWS_URL,
  EXACT_WRITE_REVIEW_URL,
} from '../../../lib/google-business';

export function generateStaticParams() {
  return SEO_DISTRICT_PAGES.map((district) => ({ slug: district.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const district = getSeoDistrictBySlug(slug);
  if (!district) return {};

  return generatePageMetadata({
    title: district.metaTitle,
    description: district.metaDescription,
    path: `/bolgeler/${district.slug}`,
    keywords: district.keywords,
    image: district.heroImage,
    imageAlt: district.heroImageAlt,
  });
}

export default async function BolgeDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const district = getSeoDistrictBySlug(slug);
  if (!district) notFound();

  const whatsappMessage = encodeURIComponent(
    `Merhaba, ${district.footerLabel} bölgesinde ücretsiz lazerli keşif ve 2026 fiyat teklifi almak istiyorum.`
  );
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Anasayfa', path: '/' },
    { name: 'Hizmet Bölgelerimiz', path: '/satis-noktalari' },
    { name: district.footerLabel, path: `/bolgeler/${district.slug}` },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: district.h1,
    description: district.metaDescription,
    path: `/bolgeler/${district.slug}`,
    type: 'WebPage',
  });

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.siteUrl}/bolgeler/${district.slug}#localbusiness`,
    name: `${SITE_CONFIG.brandName} — ${district.districtName} Cam Balkon & Mimari Sistemler`,
    url: `${SITE_CONFIG.siteUrl}/bolgeler/${district.slug}`,
    telephone: SITE_CONFIG.phoneRaw,
    email: 'iletisim@celikpen.com.tr',
    image: `${SITE_CONFIG.siteUrl}${district.heroImage}`,
    priceRange: '₺₺',
    hasMap: EXACT_GOOGLE_MAPS_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C',
      addressLocality: 'Bahçelievler',
      addressRegion: 'İstanbul',
      postalCode: '34186',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: EXACT_COORDINATES.latitude,
      longitude: EXACT_COORDINATES.longitude,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: `${district.districtName}, İstanbul`,
      },
      ...district.neighborhoods.map((nb) => ({
        '@type': 'Place',
        name: `${nb}, ${district.districtName}, İstanbul`,
      })),
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '11',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: district.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const otherDistricts = SEO_DISTRICT_PAGES.filter((d) => d.slug !== district.slug);

  return (
    <main className="bg-[#F8FAFC] pb-20">
      <JsonLd data={webPageSchema} id={`bolge-${district.slug}-webpage`} />
      <JsonLd data={breadcrumbSchema} id={`bolge-${district.slug}-breadcrumb`} />
      <JsonLd data={localBusinessSchema} id={`bolge-${district.slug}-localbusiness`} />
      <JsonLd data={faqSchema} id={`bolge-${district.slug}-faq`} />

      {/* ==================== #1E3A8A HERO ==================== */}
      <section className="relative overflow-hidden bg-[#1E3A8A] pt-10 pb-14 text-white sm:pt-14 sm:pb-18">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(191,219,254,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(191,219,254,0.22) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
          aria-hidden="true"
        />

        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] text-blue-200">
            <Link href="/" className="transition-colors hover:text-white">
              Anasayfa
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/satis-noktalari" className="transition-colors hover:text-white">
              Avrupa Yakası Hizmet Bölgeleri
            </Link>
            <span aria-hidden="true">›</span>
            <span className="font-semibold text-white">{district.footerLabel}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                {district.districtName} • Ücretsiz Lazerli Keşif &amp; Fabrika Montajı
              </div>

              <h1 className="mt-4 text-3xl font-black leading-[1.14] tracking-tight sm:text-4xl lg:text-[42px]">
                {district.h1}
              </h1>

              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-blue-100/95">
                {district.metaDescription}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {district.neighborhoods.map((nb) => (
                  <span
                    key={nb}
                    className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-blue-50"
                  >
                    {nb}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/iletisim?form=kesif"
                  className="inline-flex items-center justify-center rounded-xl bg-[#D91B24] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#b5161e]"
                >
                  Ücretsiz Keşif İste
                </Link>
                <Link
                  href="/fiyat-hesapla"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  2026 m² Fiyat Hesapla
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
                <Image
                  src={district.heroImage}
                  alt={district.heroImageAlt}
                  title={district.heroImageTitle}
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2-COLUMN AUTHORITY BODY ==================== */}
      <section className="container-shell pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-10 lg:col-span-8">
            {/* Concise AI-Search Summary Box */}
            <div className="rounded-2xl border border-blue-200 bg-[#EFF6FF] p-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#1E3A8A]">
                {district.districtName} Bölgesi Hızlı Teknik Özet
              </p>
              <p className="mt-2 text-[14px] leading-7 text-slate-800">{district.aiSummary}</p>
            </div>

            {/* Architectural Context */}
            <article className="space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
                {district.architecturalContextHeading}
              </h2>
              <p className="text-[14.5px] leading-7 text-slate-700">
                {district.architecturalContextBody}
              </p>
            </article>

            {/* Local Engineering Challenges */}
            <div>
              <h2 className="text-xl font-black tracking-tight text-[#0F172A]">
                {district.districtName} Bölgesine Özel Mimari &amp; İklim Çözümlerimiz
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {district.localChallenges.map((item, idx) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#1E3A8A] text-xs font-extrabold text-white">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 text-[14.5px] font-bold text-[#0F172A]">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-6 text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Systems */}
            <div>
              <h2 className="text-xl font-black tracking-tight text-[#0F172A]">
                {district.districtName} İçin En Çok Tercih Edilen Sistemler
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {district.recommendedSystems.map((sys) => (
                  <Link
                    key={sys.title}
                    href={sys.href}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-[#1E3A8A] hover:shadow-md"
                  >
                    <div>
                      <h3 className="text-[14.5px] font-bold text-[#0F172A] group-hover:text-[#1E3A8A]">
                        {sys.title}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                        {sys.spec}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#1E3A8A]">
                      Teknik Detay &amp; 2026 Fiyatları →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT STICKY COLUMN */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-black text-[#0F172A]">
                  {district.districtName} 2026 Fiyat &amp; Keşif Özeti
                </h2>
                <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 text-[10.5px] font-bold text-[#1E3A8A]">
                  Güncel 2026
                </span>
              </div>
              <p className="mt-3 text-[13.5px] leading-6 text-slate-700">
                {district.localPriceSummary}
              </p>

              <div className="mt-5 space-y-2.5">
                <Link
                  href="/fiyat-hesapla"
                  className="flex w-full items-center justify-center rounded-xl bg-[#1E3A8A] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1D4ED8]"
                >
                  2026 m² Fiyat Hesapla
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1fb855]"
                >
                  WhatsApp ile Hızlı Teklif Al
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-[#0F172A] transition hover:bg-slate-100"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-[12.5px] leading-relaxed text-slate-600">
              <p className="font-bold text-[#0F172A]">Merkez Üretim Tesisi &amp; Showroom</p>
              <p className="mt-1">
                Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C, 34186 Bahçelievler / İstanbul
              </p>
              <a
                href={EXACT_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-semibold text-[#1E3A8A] hover:underline"
              >
                Google Haritalar’da Yol Tarifi Al ↗
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ==================== LOCAL FAQ ACCORDION ==================== */}
      <section className="container-shell pt-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
            {district.districtName} Cam Balkon &amp; Doğrama — Sıkça Sorulan Sorular
          </h2>
          <div className="mt-6 space-y-3">
            {district.faqs.map((faq, idx) => (
              <details
                key={faq.question}
                open={idx === 0}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14.5px] font-bold text-[#0F172A]">
                  <span>{faq.question}</span>
                  <span className="shrink-0 text-lg font-bold text-[#1E3A8A] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-slate-100 pt-3 text-[13.5px] leading-6 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GOOGLE 4.9★ REVIEW STRIP ==================== */}
      <section className="container-shell pt-12">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-[#0F172A]">4.9 / 5.0</span>
              <span className="text-amber-500" aria-label="5 üzerinden 4.9 yıldız">
                ★★★★★
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Google İşletme Profili (11 Doğrulanmış Değerlendirme)
              </span>
            </div>
            <p className="mt-1 text-[13px] text-slate-600">
              {district.districtName} ve İstanbul Avrupa Yakası genelinde 30 yıllık üretim ve
              montaj tecrübesiyle gerçek müşteri yorumlarımızı inceleyin.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={EXACT_READ_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-[#0F172A] transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
            >
              Google Yorumlarını Oku ↗
            </a>
            <a
              href={EXACT_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              Google’da Yorum Bırak ↗
            </a>
          </div>
        </div>
      </section>

      {/* ==================== CROSS-LINKS TO ALL 7 SERVICE PAGES ==================== */}
      <section className="container-shell pt-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-black tracking-tight text-[#0F172A]">
            {district.districtName} Bölgesinde Sunduğumuz 7 Ana Hizmet &amp; 2026 Fiyat Rehberleri
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SEO_SERVICE_PAGES.map((srv) => (
              <Link
                key={srv.slug}
                href={`/hizmetlerimiz/${srv.slug}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-[13px] font-semibold text-slate-800 transition hover:border-[#1E3A8A] hover:bg-[#EFF6FF] hover:text-[#1E3A8A]"
              >
                <span>{srv.footerLabel}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
              Diğer Avrupa Yakası Hizmet Bölgelerimiz
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {otherDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/bolgeler/${d.slug}`}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
                >
                  {d.footerLabel}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
