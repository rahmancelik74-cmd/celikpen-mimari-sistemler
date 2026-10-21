import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import { CELIKPEN_PRICING_CONFIG } from '../../../config/pricing.config';
import { SYSTEM_FAQS } from '../../../config/system-faq.config';
import { WINSA_CONTENT_CONFIG } from '../../../config/winsa-content.config';
import { PriceCalculator } from '../../../components/PriceCalculator';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildServiceSchema,
} from '../../../components/SeoJsonLd';

const CONTENT = {
  compareLinkLabel: '⚖️ Yakın Sistemlerle Karşılaştır →',
  seriesFaqTitleSuffix: 'İçin Sıkça Sorulan Sorular',
};

export function generateStaticParams() {
  return SITE_CONFIG.productSeries.map((p) => ({ seri: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seri: string }>;
}): Promise<Metadata> {
  const { seri } = await params;
  const prod =
    SITE_CONFIG.productSeries.find((p) => p.slug === seri) ||
    SITE_CONFIG.productSeries[0];
  const sysPricing = CELIKPEN_PRICING_CONFIG.systems[prod.pricingSystemId];

  return generatePageMetadata({
    title: `${prod.name} (${prod.code}) | ${sysPricing.netPricePerM2.toLocaleString('tr-TR')} ₺/m² | ${SITE_CONFIG.brandName}`,
    description: `${prod.tagline} ${prod.description}`,
    path: `/sistemler/${prod.slug}`,
    keywords: [
      prod.name,
      prod.code,
      `${prod.name} fiyat`,
      `${prod.name} m2 fiyatı`,
      'cam balkon sistemleri',
    ],
    image: prod.image,
    imageAlt: `${prod.name} mimari cam sistem detayı`,
  });
}

export default async function SistemSeriPage({
  params,
}: {
  params: Promise<{ seri: string }>;
}) {
  const { seri } = await params;
  const prod =
    SITE_CONFIG.productSeries.find((p) => p.slug === seri) ||
    SITE_CONFIG.productSeries[0];
  const sysPricing = CELIKPEN_PRICING_CONFIG.systems[prod.pricingSystemId];
  const seriesFaqs = SYSTEM_FAQS[prod.slug] || [];
  const deepSpec =
    WINSA_CONTENT_CONFIG.seriesDeepSpecs[prod.slug] ||
    WINSA_CONTENT_CONFIG.seriesDeepSpecs['vbs-isicamli-cam-balkon'];
  const imgSrc = prod.image || '/placeholder.svg';

  const serviceSchema = {
    ...buildServiceSchema({
      name: prod.name,
      description: prod.description,
      serviceType: 'Cam balkon ve mimari cam sistemleri',
      path: `/sistemler/${prod.slug}`,
      areaServed: ['İstanbul', 'Bahçelievler, İstanbul'],
    }),
    offers: {
      '@type': 'Offer',
      price: sysPricing.netPricePerM2,
      priceCurrency: 'TRY',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: sysPricing.netPricePerM2,
        priceCurrency: 'TRY',
        unitCode: 'MTK',
      },
      availability: 'https://schema.org/InStock',
      seller: { '@id': 'https://celikpen.com.tr/#business' },
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Mimari Cam Sistemleri', path: '/urunler' },
    { name: prod.name, path: `/sistemler/${prod.slug}` },
  ]);

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-10 text-slate-700">
      <JsonLd data={serviceSchema} id="sistem-service-jsonld" />
      <JsonLd data={breadcrumbSchema} id="sistem-breadcrumb-jsonld" />

      {/* Üst Navigasyon */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-celikpen-brand-soft">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span>Mimari Cam Sistemleri</span>
          <span>/</span>
          <span className="font-semibold text-slate-900">{prod.name}</span>
        </div>
        <Link
          href="/blog/eylul-2026-yargitay-cam-balkon-karari"
          className="font-semibold text-celikpen-cta hover:underline"
        >
          📄 Eylül 2026 Yargıtay 4/5 Muvafakatname Formu →
        </Link>
      </nav>

      {/* Ürün Serisi Hero */}
      <div className="rounded-2xl border border-celikpen-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
              {prod.code} • {SITE_CONFIG.warranties.glassCertification}
            </span>
            <span className="rounded-full border border-emerald-600/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              {deepSpec.winsaEquivalentSeries}
            </span>
          </div>
          <div className="rounded-xl border border-celikpen-cta/30 bg-celikpen-cta/10 px-4 py-1.5 text-sm font-extrabold text-celikpen-cta">
            Net Birim Fiyatı: {sysPricing.netPricePerM2.toLocaleString('tr-TR')} ₺ / m²
          </div>
        </div>

        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{prod.name}</h1>
        <p className="mt-2 text-base font-semibold text-celikpen-brand">{prod.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{prod.description}</p>

        {/* Ürün Görseli (placeholder.svg fallback destekli) */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-celikpen-border bg-slate-100">
          <Image
            src={imgSrc}
            alt={`${prod.name} Bahçelievler Uygulama Örneği`}
            width={1200}
            height={675}
            sizes="(max-width: 1024px) 100vw, 960px"
            className="aspect-video w-full object-cover"
          />
        </div>

        {/* Hızlı Teknik Özet Kartları */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {prod.technicalSpecs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-3.5"
            >
              <div className="text-[11px] font-semibold uppercase text-slate-500">
                {spec.label}
              </div>
              <div className="mt-1 text-xs font-bold text-slate-900">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Winsa Standartlarında Detaylı Mühendislik ve Performans Föyü */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-celikpen-border">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-celikpen-brand px-5 py-3 text-white">
            <h2 className="text-sm font-extrabold uppercase tracking-wider">
              📐 Çelikpen Teknik Performans Föyü (TS EN 14351-1)
            </h2>
            <span className="text-xs font-semibold text-sky-200">
              {deepSpec.winsaEquivalentSeries}
            </span>
          </div>
          <div className="divide-y divide-celikpen-border bg-white text-xs sm:text-sm">
            <div className="grid grid-cols-1 p-3.5 sm:grid-cols-3">
              <span className="font-bold text-slate-600">Profil Kasa Derinliği & Et Kalınlığı</span>
              <span className="font-semibold text-slate-900 sm:col-span-2">
                {deepSpec.profileDepthMm}
              </span>
            </div>
            <div className="grid grid-cols-1 bg-celikpen-subtle/60 p-3.5 sm:grid-cols-3">
              <span className="font-bold text-slate-600">Cam Kalınlığı & Kombinasyon Kapasitesi</span>
              <span className="font-semibold text-slate-900 sm:col-span-2">
                {deepSpec.glassCapacityMm}
              </span>
            </div>
            <div className="grid grid-cols-1 p-3.5 sm:grid-cols-3">
              <span className="font-bold text-slate-600">
                Isı İletim Katsayısı (Uw — EN ISO 10077)
              </span>
              <span className="font-extrabold text-emerald-700 sm:col-span-2">
                {deepSpec.uwThermalCoefficient}
              </span>
            </div>
            <div className="grid grid-cols-1 bg-celikpen-subtle/60 p-3.5 sm:grid-cols-3">
              <span className="font-bold text-slate-600">
                Akustik Ses Yalıtımı (Rw — EN ISO 140-3)
              </span>
              <span className="font-extrabold text-celikpen-brand sm:col-span-2">
                {deepSpec.acousticInsulationDb}
              </span>
            </div>
            <div className="grid grid-cols-1 p-3.5 sm:grid-cols-3">
              <span className="font-bold text-slate-600">Su Sızdırmazlık Sınıfı (EN 12208)</span>
              <span className="font-semibold text-slate-900 sm:col-span-2">
                {deepSpec.waterTightnessClass}
              </span>
            </div>
            <div className="grid grid-cols-1 bg-celikpen-subtle/60 p-3.5 sm:grid-cols-3">
              <span className="font-bold text-slate-600">Rüzgar Yükü Direnci (EN 12210)</span>
              <span className="font-semibold text-slate-900 sm:col-span-2">
                {deepSpec.windLoadResistanceClass}
              </span>
            </div>
            <div className="grid grid-cols-1 p-3.5 sm:grid-cols-3">
              <span className="font-bold text-slate-600">Hava Geçirgenlik Sınıfı (EN 12207)</span>
              <span className="font-semibold text-slate-900 sm:col-span-2">
                {deepSpec.airPermeabilityClass}
              </span>
            </div>
            <div className="grid grid-cols-1 bg-celikpen-subtle/60 p-3.5 sm:grid-cols-3">
              <span className="font-bold text-slate-600">
                Maksimum Kanat Ağırlığı & Yüksekliği
              </span>
              <span className="font-semibold text-slate-900 sm:col-span-2">
                {deepSpec.maxSashWeightKg} • {deepSpec.maxSashHeightMm}
              </span>
            </div>
          </div>
        </div>

        {/* Profil Kesit Mimarisi & Donanım Detayları */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-celikpen-brand">
              Mimari Kesit & Yalıtım Detayları
            </h3>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700">
              {deepSpec.crossSectionFeatures.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-celikpen-brand">
              Rulman, Kilit & Aksesuar Donanımı
            </h3>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700">
              {deepSpec.hardwareFeatures.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Uyumlu RAL & Ahşap Laminasyon Renk Seçenekleri */}
        <div className="mt-6 rounded-xl border border-celikpen-border bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Bu Seride Uygulanabilen Standart RAL & Ahşap Laminasyon Renkleri
            </h3>
            <Link
              href="/#renk-kartelasi"
              className="text-xs font-bold text-celikpen-brand-soft hover:underline"
            >
              Canlı Renk Simülatöründe Dene →
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {WINSA_CONTENT_CONFIG.colorPalette.map((swatch) => (
              <div
                key={swatch.id}
                className="flex items-center gap-2 rounded-lg border border-celikpen-border bg-celikpen-subtle p-2"
              >
                <span
                  className="h-6 w-6 shrink-0 rounded border border-black/15"
                  style={{
                    background: `linear-gradient(135deg, ${swatch.hexPrimary} 0%, ${swatch.hexSecondary} 100%)`,
                  }}
                />
                <div className="min-w-0">
                  <div className="truncate text-[11px] font-bold text-slate-900">{swatch.name}</div>
                  <div className="truncate text-[9px] text-slate-500">{swatch.ralOrCode}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yakın Sistemlerle Karşılaştır Linki */}
        <div className="mt-4 flex justify-end">
          <Link
            href={`/karsilastir#${prod.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-celikpen-brand bg-white px-4 py-2 text-xs font-bold text-celikpen-brand transition hover:bg-celikpen-subtle"
          >
            {CONTENT.compareLinkLabel}
          </Link>
        </div>

        {/* Kullanım Alanları & Yargıtay Uyum Kutusu */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-celikpen-brand-soft">
              Hangi Balkon ve Cepheler İçin İdealdir?
            </h2>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
              {prod.idealFor.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-emerald-600/30 bg-emerald-50 p-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Eylül 2026 Yargıtay & Apartman Cephe Uyumu
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">{prod.yargitayNote}</p>
          </div>
        </div>
      </div>

      {/* Bu Seriye Özel Seçili Canlı m² Hesaplama Motoru */}
      <section className="mt-8">
        <PriceCalculator defaultSystemId={prod.pricingSystemId} />
      </section>

      {/* Bu Seri İçin SSS */}
      {seriesFaqs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">
            {prod.code} — Bu Seri {CONTENT.seriesFaqTitleSuffix}
          </h2>
          <div className="mt-4 space-y-3">
            {seriesFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-celikpen-border bg-celikpen-subtle p-5 open:bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">
                  <span>{faq.question}</span>
                  <span className="text-celikpen-brand-soft transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Diğer Ürün Serileri */}
      <section className="mt-10 border-t border-celikpen-border pt-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Diğer Çelikpen Mimari Cam Serileri
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {SITE_CONFIG.productSeries.map((item) => (
            <Link
              key={item.slug}
              href={`/sistemler/${item.slug}`}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                item.slug === prod.slug
                  ? 'border-celikpen-brand bg-celikpen-brand/10 text-celikpen-brand'
                  : 'border-celikpen-border bg-white text-slate-600 hover:border-celikpen-brand-soft'
              }`}
            >
              {item.code} — {item.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
