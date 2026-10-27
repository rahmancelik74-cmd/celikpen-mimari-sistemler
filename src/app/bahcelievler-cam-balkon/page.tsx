import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import {
  generatePageMetadata,
  SEO_BUSINESS,
  SEO_FAQS,
  absoluteUrl,
} from '../../config/seo.config';
import { CELIKPEN_PRICING_CONFIG } from '../../config/pricing.config';
import { PriceCalculator } from '../../components/PriceCalculator';
import { LocalBusinessMapCard } from '../../components/LocalBusinessMapCard';
import {
  JsonLd,
  buildBreadcrumbSchema,
} from '../../components/SeoJsonLd';

export const metadata: Metadata = generatePageMetadata({
  title: 'Bahçelievler Pimapen Cam Balkon | Garantili Montaj',
  description:
    '1996’dan bugüne 30 yıllık üretim tecrübesiyle Bahçelievler’in 11 mahallesinde ısıcamlı cam balkon, katlanır cam balkon, giyotin cam, bioklimatik pergola ve PVC pimapen montajı. 10 yıl garanti, ücretsiz lazerli keşif.',
  path: '/bahcelievler-cam-balkon',
  keywords: [
    'Bahçelievler cam balkon',
    'Bahçelievler pimapen',
    'Bahçelievler cam balkon fiyatları',
    'Bahçelievler cam balkon firması',
    'Bahçelievler ısıcamlı cam balkon',
    'Bahçelievler giyotin cam',
    'Bahçelievler bioklimatik pergola',
    'Bahçelievler PVC pencere',
    'Bahçelievler cam balkon montaj',
    'Kocasinan cam balkon',
    'Şirinevler cam balkon',
    'cam balkon fiyatları 2026',
  ],
});

const BUSINESS_ID = absoluteUrl('/#business');

function buildLandingJsonLd() {
  const prices = Object.values(CELIKPEN_PRICING_CONFIG.systems).map(
    (s) => s.netPricePerM2
  );
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
        '@id': BUSINESS_ID,
        name: SEO_BUSINESS.name,
        description: SEO_BUSINESS.description,
        url: SITE_CONFIG.siteUrl,
        telephone: SEO_BUSINESS.telephone,
        priceRange: SEO_BUSINESS.priceRange,
        foundingDate: SEO_BUSINESS.foundingDate,
        image: [absoluteUrl('/images/kocasinan-isicamli-cam-balkon-hero.jpg')],
        address: {
          '@type': 'PostalAddress',
          ...SEO_BUSINESS.address,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SEO_BUSINESS.geo.latitude,
          longitude: SEO_BUSINESS.geo.longitude,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: SEO_BUSINESS.aggregateRating.ratingValue,
          reviewCount: SEO_BUSINESS.aggregateRating.reviewCount,
          bestRating: SEO_BUSINESS.aggregateRating.bestRating,
        },
        areaServed: SITE_CONFIG.neighborhoods.map((n) => ({
          '@type': 'Place',
          name: `${n.name}, Bahçelievler, İstanbul`,
        })),
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:30',
          closes: '19:30',
        },
      },
      {
        '@type': 'Service',
        name: 'Bahçelievler Cam Balkon & Pimapen Montaj Hizmeti',
        serviceType: 'Cam balkon ve PVC doğrama montajı',
        description:
          'Bahçelievler ilçesinin 11 mahallesinde ısıcamlı cam balkon, katlanır cam balkon, sürme cam, motorlu giyotin cam, bioklimatik pergola, kış bahçesi ve Winsa PVC pencere-kapı montaj hizmeti.',
        provider: { '@id': BUSINESS_ID },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Bahçelievler, İstanbul' },
          { '@type': 'City', name: 'İstanbul' },
        ],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'TRY',
          lowPrice,
          highPrice,
          offerCount: Object.keys(CELIKPEN_PRICING_CONFIG.systems).length,
        },
        url: absoluteUrl('/bahcelievler-cam-balkon'),
      },
      {
        '@type': 'FAQPage',
        '@id': absoluteUrl('/bahcelievler-cam-balkon#sss'),
        mainEntity: SEO_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      buildBreadcrumbSchema([
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Bahçelievler Cam Balkon', path: '/bahcelievler-cam-balkon' },
      ]),
    ],
  };
}

const SERVICE_CARDS = [
  {
    title: 'Isıcamlı Cam Balkon',
    desc: '4+20+4 argon gazlı Konfor Isıcam, %72 ısı tasarrufu ve -38 dB ses yalıtımı.',
    icon: '🏠',
    href: '/urunler/vera-isicamli-cam-balkon',
  },
  {
    title: 'Katlanır Cam Balkon',
    desc: '8mm / 10mm temperli cam, tam açılır panoramik balkon, çocuk emniyet kilidi.',
    icon: '🪟',
    href: '/urunler/vera-katlanir-cam-balkon',
  },
  {
    title: 'Sürme Cam Balkon',
    desc: 'Eşiksiz alt ray, dar balkonlarda alan kazandıran kayar cam sistemi.',
    icon: '↔️',
    href: '/urunler/panorama-esiksiz-surme-cam-balkon',
  },
  {
    title: 'Motorlu Giyotin Cam',
    desc: 'Somfy kumandalı dikey açılım, güvenli küpeşte, rezidans ve ticari cepheler.',
    icon: '⬆️',
    href: '/urunler/giyotin-motorlu-silinebilir-cam',
  },
  {
    title: 'Bioklimatik Pergola',
    desc: 'Motorlu alüminyum lamel, gizli yağmur tahliyesi, dört mevsim teras.',
    icon: '☀️',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
  },
  {
    title: 'PVC Pencere & Kapı',
    desc: 'Winsa Dorado 76, Revotech Gold 84 ve Safir 76 serilerinde tam yalıtım.',
    icon: '🚪',
    href: '/urunler/winsa',
  },
];

export default function BahcelievlerCamBalkonPage() {
  const jsonLd = buildLandingJsonLd();
  const totalProjects = SITE_CONFIG.neighborhoods.reduce(
    (sum, n) => sum + n.completedProjectsCount,
    0
  );

  return (
    <main>
      <JsonLd data={jsonLd} id="bahcelievler-cam-balkon-jsonld" />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-16 text-white sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/kocasinan-isicamli-cam-balkon-hero.jpg')] bg-cover bg-center opacity-[0.12]"
        />
        <div className="container-shell relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            30. Yıl — 1996'dan Bugüne
          </div>

          <h1 className="mt-6 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Bahçelievler Cam Balkon &amp; Pimapen
            <span className="block text-[#60A5FA]">Garantili Üretim &amp; Montaj</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Kocasinan Merkez atölyemizden Bahçelievler'in 11 mahallesine aynı gün ücretsiz
            lazerli keşif ve 10 yıl sistem garantili cam balkon, giyotin cam, bioklimatik
            pergola ve Winsa PVC pencere montajı.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1D4ED8]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Hemen Ara: {SITE_CONFIG.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Merhaba, Bahçelievler cam balkon fiyat bilgisi almak istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.488-8.413Z" />
              </svg>
              WhatsApp ile Yaz
            </a>
          </div>

          {/* Trust stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { value: '30', label: 'Yıllık Tecrübe' },
              { value: `${totalProjects.toLocaleString('tr-TR')}+`, label: 'Tamamlanan Proje' },
              { value: '11', label: 'Bahçelievler Mahallesi' },
              { value: '10 Yıl', label: 'Sistem Garantisi' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
              >
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          HİZMET KARTLARI
          ================================================================ */}
      <section className="section-shell bg-white">
        <div className="container-shell">
          <div className="text-center">
            <span className="section-kicker">Hizmetlerimiz</span>
            <h2 className="section-title mx-auto">
              Bahçelievler'de Sunduğumuz Cam Balkon &amp; PVC Sistemleri
            </h2>
            <p className="section-subtitle mx-auto">
              Kocasinan Merkez üretim tesisimizden Bahçelievler'in her mahallesine profesyonel montaj ve 10 yıl garanti.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                prefetch={true}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#1E3A8A]/30 hover:shadow-lg"
              >
                <span className="text-3xl" aria-hidden="true">{card.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-[#1E3A8A]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Detaylı İncele
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          FİYAT HESAPLAYICI
          ================================================================ */}
      <section id="fiyat" className="section-shell bg-slate-50">
        <div className="container-shell">
          <div className="text-center">
            <span className="section-kicker">Online Fiyat</span>
            <h2 className="section-title mx-auto">
              Bahçelievler Cam Balkon m² Fiyat Hesaplayıcı
            </h2>
            <p className="section-subtitle mx-auto">
              Balkon ölçülerinizi girerek 2026 net fabrika fiyatınızı anında görün. Keşif sonrası birebir aynı fiyat garantisi.
            </p>
          </div>
          <div className="mt-10">
            <PriceCalculator defaultNeighborhood="bahcelievler-merkez" />
          </div>
        </div>
      </section>

      {/* ================================================================
          11 MAHALLE GRIDI
          ================================================================ */}
      <section className="section-shell bg-white">
        <div className="container-shell">
          <div className="text-center">
            <span className="section-kicker">Hizmet Alanlarımız</span>
            <h2 className="section-title mx-auto">
              Bahçelievler'in 11 Mahallesinde Cam Balkon Hizmeti
            </h2>
            <p className="section-subtitle mx-auto">
              Her mahalle için bölgeye özel sistem önerisi, ücretsiz lazerli keşif ve toplu bina indirim fırsatları.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.neighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/bahcelievler/${n.slug}`}
                prefetch={true}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#1E3A8A]/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1E3A8A]">
                    {n.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-bold text-[#1E3A8A]">
                    {n.completedProjectsCount} Proje
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {n.urbanFocus}
                </p>
                <p className="mt-1.5 text-[11px] font-semibold text-[#1E3A8A]">
                  {n.recommendedSystem}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SSS (FAQ)
          ================================================================ */}
      <section id="sss" className="section-shell bg-slate-50">
        <div className="container-shell">
          <div className="text-center">
            <span className="section-kicker">Sıkça Sorulan Sorular</span>
            <h2 className="section-title mx-auto">
              Bahçelievler Cam Balkon Hakkında Merak Edilenler
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200">
            {SEO_FAQS.map((faq, i) => (
              <details
                key={i}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-sm font-semibold text-slate-800 marker:hidden">
                  <span>{faq.question}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          HARİTA & İLETİŞİM
          ================================================================ */}
      <section className="section-shell bg-white">
        <div className="container-shell">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <span className="section-kicker">Konum & İletişim</span>
              <h2 className="section-title">
                Kocasinan Merkez Showroom &amp; Atölye
              </h2>
              <p className="section-subtitle">
                Bahçelievler'in merkezinde, Kızılelma Caddesi üzerinde showroom ve üretim
                atölyemizi ziyaret edebilir, ürünlerimizi bire bir inceleyebilirsiniz.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-[#1E3A8A]">📍</span>
                  <span>{SITE_CONFIG.address}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-[#1E3A8A]">📞</span>
                  <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="font-semibold hover:text-[#1E3A8A]">
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-[#1E3A8A]">🕐</span>
                  <span>{SITE_CONFIG.workingHours}</span>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/iletisim?form=kesif"
                  prefetch={true}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-[#1D4ED8]"
                >
                  Ücretsiz Keşif Randevusu Al
                </Link>
                <Link
                  href="/fiyat-hesapla"
                  prefetch={true}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
                >
                  Online Fiyat Hesapla
                </Link>
              </div>
            </div>

            <LocalBusinessMapCard className="rounded-2xl" />
          </div>
        </div>
      </section>

      {/* ================================================================
          SON CTA
          ================================================================ */}
      <section className="bg-[#1E3A8A] py-12 text-center text-white sm:py-14">
        <div className="container-shell">
          <h2 className="text-2xl font-black sm:text-3xl">
            Bahçelievler'de Cam Balkon Yaptırmak İstiyorum
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-blue-200">
            30 yıllık tecrübe, Kocasinan Merkez'den aynı gün ücretsiz lazerli keşif, TSE belgeli
            temperli cam ve 10 yıl sistem garantisi.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#1E3A8A] shadow-lg transition hover:bg-blue-50"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Merhaba, Bahçelievler cam balkon fiyat bilgisi almak istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              WhatsApp ile Yaz
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
