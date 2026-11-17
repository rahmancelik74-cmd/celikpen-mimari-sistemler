import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata, absoluteUrl } from '../../../config/seo.config';
import { CELIKPEN_PRICING_CONFIG } from '../../../config/pricing.config';
import {
  EUROPEAN_SIDE_DISTRICTS,
  getAllDistrictSlugs,
  getDistrictBySlug,
} from '../../../data/districtsData';
import { PriceCalculator } from '../../../components/PriceCalculator';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildServiceSchema,
} from '../../../components/SeoJsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDistrictSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);
  if (!district) return {};

  return generatePageMetadata({
    title: `${district.name} (${district.subDistricts}) Cam Balkon, Kış Bahçesi & 2026 m² Fiyatları | ${SITE_CONFIG.brandName}`,
    description: `${district.name} (${district.subDistricts}) bölgesinde ${district.primarySystemCode}. Bahçelievler Kocasinan Merkez fabrikamızdan ücretsiz lazerli keşif ve 10 yıl garantili montaj.`,
    path: `/bolgeler/${district.slug}`,
    image: district.heroImage,
    imageAlt: district.heroImageAlt,
    keywords: [
      `${district.name} cam balkon`,
      `${district.name} ısıcamlı cam balkon`,
      `${district.name} kış bahçesi`,
      `${district.name} bioklimatik pergola`,
      `${district.name} giyotin cam`,
      `${district.name} Winsa PVC pencere`,
      ...district.neighborhoods.map((n) => `${n} cam balkon`),
    ],
  });
}

export default async function DistrictDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);
  if (!district) notFound();

  const systems = Object.values(CELIKPEN_PRICING_CONFIG.systems);
  const discountPercent = Math.round(CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate * 100);

  const serviceSchema = buildServiceSchema({
    name: `${district.name} (${district.subDistricts}) Cam Balkon, Kış Bahçesi ve Winsa PVC Sistemleri`,
    description: `${district.urbanFocus} ${district.architecturalSolution}`,
    serviceType: 'Cam balkon, kış bahçesi, bioklimatik pergola ve PVC doğrama sistemleri',
    path: `/bolgeler/${district.slug}`,
    areaServed: [
      `${district.name}, İstanbul`,
      ...district.neighborhoods.map((n) => `${n}, ${district.name}, İstanbul`),
    ],
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Avrupa Yakası Hizmet Bölgelerimiz', path: '/bolgeler' },
    { name: `${district.name} (${district.subDistricts})`, path: `/bolgeler/${district.slug}` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(`/bolgeler/${district.slug}`)}#faq`,
    mainEntity: district.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <JsonLd data={serviceSchema} id={`district-${district.slug}-service-jsonld`} />
      <JsonLd data={breadcrumbSchema} id={`district-${district.slug}-breadcrumb-jsonld`} />
      <JsonLd data={faqSchema} id={`district-${district.slug}-faq-jsonld`} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0F172A] py-12 text-white sm:py-16">
        <div className="absolute inset-0">
          <Image
            src={district.heroImage}
            alt={district.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/75 via-[#0F172A]/90 to-[#0F172A]" />
        </div>

        <div className="container-shell relative z-10">
          <nav aria-label="Breadcrumb" className="text-[11px] text-slate-300">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/bolgeler" className="hover:text-white">
                  Avrupa Yakası Bölgelerimiz
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-sky-200">{district.name}</li>
            </ol>
          </nav>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-200">
              {district.segmentBadge}
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-200">
              ✓ {district.completedProjectsCount}+ Tamamlanan {district.name} Projesi
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white">
              ⏱ {district.serviceTimeFromHq}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-2xl font-extrabold leading-tight sm:text-4xl lg:text-[2.6rem]">
            {district.name} ({district.subDistricts}) Cam Balkon, Kış Bahçesi ve 2026 m² Fiyatları
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
            {district.urbanFocus} {district.architecturalSolution}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-5 py-3 text-xs font-extrabold text-white shadow-lg transition hover:bg-[#1D4ED8]"
            >
              📞 Hemen Ara: {SITE_CONFIG.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Merhaba Çelikpen, ${district.name} (${district.subDistricts}) bölgesindeki projemiz için ücretsiz keşif ve fiyat bilgisi almak istiyorum.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-xs font-extrabold text-white shadow-lg transition hover:bg-green-700"
            >
              💬 WhatsApp Hızlı Teklif Hattı
            </a>
            <Link
              href="/blog/cam-balkon-apartman-yonetimi-izni-yargitay-4-5-muvafakatname-2026"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold text-white hover:bg-white/20"
            >
              📄 2026 Yargıtay &amp; 4/5 Muvafakatname Rehberi
            </Link>
          </div>
        </div>
      </section>

      <div className="container-shell py-10 sm:py-14">
        {/* MİMARİ ANALİZ KARTLARI */}
        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A]">
              Bölgesel İklim &amp; Cephe Analizi
            </span>
            <h2 className="mt-1.5 text-base font-bold text-[#0F172A]">
              {district.name} Cephe Problemi
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {district.highlightProblem}
            </p>
          </div>

          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF]/60 p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A]">
              Çelikpen Mimari Mühendislik Ekibi Önerisi
            </span>
            <h2 className="mt-1.5 text-base font-bold text-[#0F172A]">
              Önerilen Sistem Kombinasyonları
            </h2>
            <ul className="mt-2 space-y-1.5 text-xs font-medium text-slate-700">
              {district.recommendedSystems.map((sys) => (
                <li key={sys} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" />
                  <span>{sys}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Fabrika Doğrudan Satış Avantajı
            </span>
            <h2 className="mt-1.5 text-base font-bold text-[#0F172A]">
              5+ Daire Site &amp; Apartmanlara Net %{discountPercent} İndirim
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              Bahçelievler Kocasinan Merkez üretim tesisimizden {district.name} bölgesindeki toplu site, villa ve kentsel dönüşüm projelerine aracısız fabrika fiyatı ve 10 yıl garanti sunuyoruz.
            </p>
          </div>
        </section>

        {/* CANLI FİYAT HESAPLAYICI */}
        <section className="mt-10">
          <PriceCalculator defaultNeighborhood={district.name} />
        </section>

        {/* TEKNİK PERFORMANS & FİYAT TABLOSU */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-xl font-bold text-[#0F172A]">
            {district.name} İçin 2026 Sistem m² Fiyatları ve Yalıtım Tablosu
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Tüm fiyatlar `pricing.config.ts` resmi fabrika listemizden anlık çekilmektedir:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0F172A] text-[11px] uppercase text-sky-200">
                <tr>
                  <th className="p-3.5">Seri Kodu</th>
                  <th className="p-3.5">Sistem &amp; Cam Özelliği</th>
                  <th className="p-3.5">Akustik Yalıtım</th>
                  <th className="p-3.5">Isı Tasarrufu</th>
                  <th className="p-3.5 text-right">2026 Net m² Fiyatı</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {systems.map((sys) => (
                  <tr key={sys.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-[#1E3A8A]">{sys.code}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-[#0F172A]">{sys.name}</div>
                      <div className="text-xs text-slate-500">{sys.glassSpec}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-emerald-700">
                      -{sys.acousticReductionDb} dB Ses Kesici
                    </td>
                    <td className="p-3.5 text-slate-700">%{sys.thermalSavingPercent} Termal Koruma</td>
                    <td className="p-3.5 text-right font-extrabold text-[#1E3A8A]">
                      {sys.netPricePerM2.toLocaleString('tr-TR')} ₺/m²
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* HİZMET VERİLEN MAHALLELER */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
          <h2 className="text-lg font-bold text-[#0F172A]">
            {district.name} İlçesinde Ücretsiz Keşif Yaptığımız Mahalle ve Semtler
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {district.neighborhoods.map((neighborhood) => (
              <span
                key={neighborhood}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#0F172A] shadow-2xs"
              >
                📍 {neighborhood}
              </span>
            ))}
          </div>
        </section>

        {/* SSS */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0F172A]">
            {district.name} Cam Balkon &amp; Kış Bahçesi Sıkça Sorulan Sorular
          </h2>
          <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {district.faqs.map((faq, idx) => (
              <details key={faq.question} className="group p-5" open={idx === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#0F172A]">
                  <span>{faq.question}</span>
                  <span className="text-[#1E3A8A] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* DİĞER AVRUPA YAKASI İLÇELERİ */}
        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1E3A8A]">
            Diğer Avrupa Yakası Hizmet İlçelerimiz
          </h2>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {EUROPEAN_SIDE_DISTRICTS.map((item) => (
              <Link
                key={item.slug}
                href={`/bolgeler/${item.slug}`}
                className={`rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                  item.slug === district.slug
                    ? 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-[#1E3A8A]'
                }`}
              >
                {item.footerLabel}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
