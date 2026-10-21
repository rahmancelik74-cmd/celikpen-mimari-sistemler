import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { WINSA_CONTENT_CONFIG } from '../../config/winsa-content.config';

const CONTENT = {
  metaTitle: `Hakkımızda — Kocasinan Merkez CNC Üretim, Kalite & Sertifikalar | ${SITE_CONFIG.brandName}`,
  metaDescription: `${SITE_CONFIG.fullTitle}. ${SITE_CONFIG.address} adresindeki CNC üretim tesisimiz, TSE EN 12150 Şişecam Isıcam sertifikasyonumuz ve 10 yıl mekanik garantimiz.`,
  badge: 'Kurumsal Profil • Kocasinan Merkez CNC Üretim & Mühendislik Gücü',
  heading: 'Çelikpen Cam Balkon & Mimari Cam Sistemleri',
  section1: {
    title: '1. Kocasinan Merkez CNC Üretim Tesisimiz ve Ar-Ge Standartlarımız',
    p1: `${SITE_CONFIG.brandName}, İstanbul ${SITE_CONFIG.district} ilçesinde doğrudan üretici ve mühendislik merkezi kimliğiyle hizmet vermek üzere ${SITE_CONFIG.headquartersNeighborhood} mahallesinde kurulmuştur.`,
    p2: 'Aracı bayi komisyonu olmadan, balkon ve teras ölçünüze özel 0.1 mm hassasiyetli CNC alüminyum/PVC profil işleme, EPDM vakum contalama ve TSE EN 12150 Şişecam Temperli / Isıcam Konfor montajını kendi bünyemizde gerçekleştiriyoruz.',
  },
  section2: {
    title: '2. Kadrolu Mühendislik ve Montaj Organizasyonumuz',
    subtitle:
      'Keşiften satış sonrası desteğe kadar taşeron kullanmadan, iş güvenliği eğitimli ve sigortalı kendi uzman kadromuzla çalışıyoruz:',
    roles: [
      {
        role: 'Mimari Üretim & Kalite Yönetimi',
        desc: 'T66 ısıl işlemli birincil alüminyum profillerin, Winsa standardı çok odacıklı PVC serilerin ve 8 bilyalı paslanmaz rulmanların giriş kalite kontrolü.',
      },
      {
        role: 'Lazerli Ölçüm & Statik Keşif Uzmanı',
        desc: '3 boyutlu lazer terazi ile balkon geometrisi (Düz, L, U), rüzgar yükü (EN 12210), kombi bacası geçişi ve apartman dış cephe RAL renk emsali tespiti.',
      },
      {
        role: 'Sertifikalı Kurulum & İzolasyon Ekibi',
        desc: 'Eğitimli kadrolu ustalarımızla 5° eğimli su tahliye kanalı açımı, çift kademeli EPDM/mıknatıslı fitil izolasyonu ve 12 noktalı teslimat testi.',
      },
    ],
  },
  section3: {
    title: '3. Uluslararası Kalite Sertifikalarımız & Garanti Taahhüdümüz',
    labels: {
      glass: 'Resmi Cam & Isıcam Sertifikasyonu',
      warranty: 'Mekanik & Rulman Sistem Garantisi',
      survey: 'Ücretsiz Lazerli Keşif Taahhüdü',
      projects: 'Bahçelievler Tamamlanan Referans',
    },
  },
  ctaCalculator: 'Canlı m² Fiyat Hesaplama Motoruna Git →',
  ctaContact: 'İletişim & Ücretsiz Keşif Talebi →',
};

export const metadata: Metadata = generatePageMetadata({
  title: CONTENT.metaTitle,
  description: CONTENT.metaDescription,
  path: '/hakkimizda',
  keywords: [
    'Çelikpen hakkında',
    'cam balkon üreticisi Bahçelievler',
    'Kocasinan CNC üretim tesisi',
    'TS EN 12150 temperli cam',
  ],
});

export default function HakkimizdaPage() {
  const totalCompletedProjects = SITE_CONFIG.neighborhoods.reduce(
    (acc, n) => acc + n.completedProjectsCount,
    0
  );

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.siteUrl}/hakkimizda#organization`,
    name: SITE_CONFIG.fullTitle,
    description: SITE_CONFIG.slogan,
    telephone: SITE_CONFIG.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address,
      addressLocality: SITE_CONFIG.district,
      addressRegion: 'İstanbul',
      postalCode: '34186',
      addressCountry: 'TR',
    },
    founder: {
      '@type': 'Person',
      jobTitle: 'Kurucu & Üretim Direktörü',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 25,
    },
    areaServed: SITE_CONFIG.neighborhoods.map((n) => ({
      '@type': 'Place',
      name: `${n.name}, ${SITE_CONFIG.district}, İstanbul`,
    })),
  };

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-10 text-slate-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Üst Başlık ve Proje Rozeti */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-celikpen-border pb-8">
        <div>
          <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
            {CONTENT.badge}
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{CONTENT.heading}</h1>
          <p className="mt-2 text-sm text-slate-600">{SITE_CONFIG.slogan}</p>
        </div>

        <div className="rounded-2xl border border-emerald-600/30 bg-emerald-50 px-5 py-3 text-right">
          <div className="text-2xl font-black text-emerald-700">
            {totalCompletedProjects.toLocaleString('tr-TR')}+ tamamlanmış proje
          </div>
          <div className="text-xs text-slate-600">
            {SITE_CONFIG.district} ({SITE_CONFIG.neighborhoods.length} Mahallede Aktif Referans)
          </div>
        </div>
      </div>

      {/* 1. Bölüm: Kocasinan Merkez CNC Üretim Tesisimiz */}
      <section className="mt-8 rounded-2xl border border-celikpen-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">{CONTENT.section1.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{CONTENT.section1.p1}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{CONTENT.section1.p2}</p>

        <div className="mt-5 grid grid-cols-1 gap-3 rounded-xl border border-celikpen-border bg-celikpen-subtle p-4 text-xs sm:grid-cols-3">
          <div>
            <span className="block font-semibold text-slate-500">Üretim & Showroom Adresi</span>
            <span className="mt-1 block font-bold text-slate-900">{SITE_CONFIG.address}</span>
          </div>
          <div>
            <span className="block font-semibold text-slate-500">Çalışma Saatleri & Telefon</span>
            <span className="mt-1 block font-bold text-celikpen-brand-soft">
              {SITE_CONFIG.workingHours} • {SITE_CONFIG.phoneDisplay}
            </span>
          </div>
          <div>
            <span className="block font-semibold text-slate-500">Üretim Normları</span>
            <span className="mt-1 block font-bold text-emerald-700">
              TS EN 14351-1 • QUALICOAT • ISO 9001:2015
            </span>
          </div>
        </div>
      </section>

      {/* 2. Bölüm: Kadrolu Mühendislik ve Montaj Organizasyonumuz */}
      <section className="mt-8 rounded-2xl border border-celikpen-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">{CONTENT.section2.title}</h2>
        <p className="mt-1 text-xs text-slate-500">{CONTENT.section2.subtitle}</p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTENT.section2.roles.map((item) => (
            <div
              key={item.role}
              className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-4 transition hover:border-celikpen-brand-soft"
            >
              <span className="inline-block rounded bg-celikpen-brand/10 px-2.5 py-0.5 text-xs font-bold text-celikpen-brand">
                {item.role}
              </span>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bölüm: Sertifikalarımız & Garanti Şartları */}
      <section
        id="garanti-belgeleri"
        className="mt-8 scroll-mt-24 rounded-2xl border border-celikpen-border bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold text-slate-900">{CONTENT.section3.title}</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">
              {CONTENT.section3.labels.glass}
            </div>
            <div className="mt-1 text-sm font-bold text-celikpen-brand-soft">
              {SITE_CONFIG.warranties.glassCertification}
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Her cam plakasında silinmez Şişecam Temper ve TSE EN 12150 güvenlik mührü yer alır.
            </p>
          </div>

          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">
              {CONTENT.section3.labels.warranty}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900">
              10 Yıl Paslanmaz Rulman, EPDM Conta & Profil Boya Garantisi
            </div>
            <p className="mt-1 text-xs text-slate-600">
              QUALICOAT elektrostatik fırın boya soyulmalarına ve AISI 304 paslanmaz rulmanlara
              karşı yazılı sözleşmeli güvence.
            </p>
          </div>

          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">
              {CONTENT.section3.labels.survey}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900">
              {SITE_CONFIG.warranties.freeSurveyPromise}
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Keşif esnasında apartman yönetimine sunulacak 4/5 muvafakatname dosyası ücretsiz
              hazırlanır.
            </p>
          </div>

          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">
              {CONTENT.section3.labels.projects}
            </div>
            <div className="mt-1 text-sm font-bold text-emerald-700">
              {totalCompletedProjects.toLocaleString('tr-TR')}+ Tamamlanmış Balkon & Teras Uygulaması
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Kocasinan, Soğanlı, Şirinevler ve Siyavuşpaşa başta olmak üzere tüm Bahçelievler’de
              birebir referanslar.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Bölüm: Winsa Mühendislik Normları Özeti */}
      <section className="mt-8 rounded-2xl border border-celikpen-border bg-celikpen-subtle p-6">
        <h2 className="text-lg font-bold text-slate-900">
          Üretimde Uyguladığımız Avrupa Test ve Yalıtım Standartları
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WINSA_CONTENT_CONFIG.engineeringStandards.map((std) => (
            <div
              key={std.normCode}
              className="rounded-xl border border-celikpen-border bg-white p-4"
            >
              <span className="text-[11px] font-extrabold text-celikpen-brand">{std.normCode}</span>
              <div className="mt-1 text-xs font-bold text-slate-900">{std.title}</div>
              <div className="mt-1 text-xs font-extrabold text-emerald-700">{std.metricValue}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Alt Navigasyon CTA */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          prefetch={true}
          href="/fiyat-hesapla"
          className="rounded-lg bg-celikpen-cta px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-rose-500"
        >
          {CONTENT.ctaCalculator}
        </Link>
        <Link
          prefetch={true}
          href="/iletisim"
          className="rounded-lg border border-celikpen-brand bg-white px-5 py-3 text-sm font-bold text-celikpen-brand transition hover:bg-celikpen-subtle"
        >
          {CONTENT.ctaContact}
        </Link>
      </div>
    </main>
  );
}
