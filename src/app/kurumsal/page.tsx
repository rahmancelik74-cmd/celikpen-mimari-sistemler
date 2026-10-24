import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import {
  CORPORATE_CERTIFICATES,
  CORPORATE_CORE_PAGES,
  CORPORATE_COUNTERS,
  CORPORATE_MEDIA_PAGES,
  CORPORATE_STANDARDS,
} from '../../config/winsa-corporate.config';
import { CorporateVisual } from '../../components/corporate/CorporateArt';
import {
  CertificateWall,
  CorporateStats,
  StandardsGrid,
  WinsaPartnerBand,
} from '../../components/corporate/CorporateBlocks';
import { CorporateTimeline } from '../../components/corporate/CorporateTimeline';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../components/SeoJsonLd';

const PAGE_PATH = '/kurumsal';
const PAGE_TITLE = 'Kurumsal — 35 Yıllık Deneyim, Üretim ve Kalite | Çelikpen';
const PAGE_DESCRIPTION =
  'Çelikpen kurumsal yapısı: 1991–2026 arasında 35 yıllık deneyim, Kocasinan Merkez CNC üretim tesisi, EN 12207 / EN 12208 / EN 12210 performansı, TSE & CE sertifikaları ve Winsa yetkili üretim.';

export const metadata: Metadata = generatePageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  keywords: [
    'Çelikpen kurumsal',
    '35 yıllık cam balkon firması',
    '1991’den bugüne cam balkon',
    'Winsa yetkili üretici',
    'CNC alüminyum üretim İstanbul',
    'EN 12207 EN 12208 EN 12210',
  ],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Anasayfa', path: '/' },
  { name: 'Kurumsal', path: PAGE_PATH },
]);

const webPageSchema = buildWebPageSchema({
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  type: 'CollectionPage',
});

export default function KurumsalPage() {
  return (
    <main className="bg-white">
      <JsonLd data={breadcrumbSchema} id="kurumsal-breadcrumb-jsonld" />
      <JsonLd data={webPageSchema} id="kurumsal-webpage-jsonld" />

      {/* ============================ KURUMSAL HERO ============================ */}
      <section className="relative isolate overflow-hidden bg-[#0F172A] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,197,253,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.16) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 -top-28 h-96 w-96 rounded-full bg-[#1E3A8A]/70 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-[#38BDF8]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-shell relative py-8 sm:py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Anasayfa
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-[#93C5FD]">Kurumsal</span>
          </nav>

          <div className="mt-7 grid items-center gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div>
              <div className="inline-flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-sm border border-[#38BDF8]/35 bg-[#38BDF8]/10 px-3 py-1.5">
                  <span className="text-[13px] font-extrabold leading-none tracking-tight text-white">
                    35.
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#7DD3FC]">
                    Yıl
                  </span>
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  1991 — 2026
                </span>
              </div>

              <h1 className="mt-5 max-w-3xl text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-[2.45rem] lg:text-[2.85rem]">
                35 Yıllık Mühendislik Mirası,{' '}
                <span className="mt-1 block text-[#7DD3FC]">Geleceğe Bakan Mimari Vizyon</span>
              </h1>

              <p className="mt-5 max-w-2xl text-[12.5px] leading-7 text-slate-300 sm:text-[13px]">
                1991’den bugüne İstanbul’un cam balkon ve mimari doğrama sistemleri alanında
                üretiyoruz. Kendi CNC tesisimiz, lazer ölçüm ekiplerimiz, Winsa profil
                teknolojilerimiz ve 10 yıl sistem garantimizle konut ve ticari projelere uçtan uca
                değer katıyoruz.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/kurumsal/hakkimizda"
                  prefetch={true}
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-[11.5px] font-bold text-[#0F172A] transition-all hover:-translate-y-0.5 hover:bg-[#EFF6FF] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                >
                  Hikâyemizi Keşfedin
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/iletisim?form=kesif"
                  prefetch={true}
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-[11.5px] font-semibold text-white transition-all hover:border-[#38BDF8]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                >
                  Ücretsiz Keşif
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                  1991’den beri üretim
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                  15.000+ proje
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                  Winsa yetkili üretim
                </span>
              </div>
            </div>

            <div className="relative">
              <CorporateVisual
                variant="heritage"
                className="aspect-[4/3] w-full border-white/15 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.75)]"
              />
              <div className="absolute -bottom-4 -left-4 hidden rounded-sm border border-white/15 bg-[#0F172A]/95 px-4 py-3 shadow-xl backdrop-blur-sm sm:block">
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">
                  Kurumsal Hafıza
                </p>
                <p className="mt-1 text-[11px] font-bold text-white">1991 — 2026 / 35 Yıl</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ RAKAMLARLA ÇELİKPEN ============================ */}
      <section
        aria-labelledby="rakamlarla-celikpen-baslik"
        className="border-b border-slate-200 bg-white py-10 sm:py-12"
      >
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">
                <span className="h-px w-7 bg-[#1E3A8A]" aria-hidden="true" />
                Rakamlarla Çelikpen
              </div>
              <h2
                id="rakamlarla-celikpen-baslik"
                className="mt-2 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl"
              >
                35 yılın ölçülebilir özeti.
              </h2>
            </div>
            <p className="max-w-md text-[11px] leading-relaxed text-slate-500">
              Deneyim, üretim kapasitesi ve mühendislik hassasiyeti; her projede aynı kalite
              standardında birleşir.
            </p>
          </div>

          <CorporateStats stats={CORPORATE_COUNTERS} className="mt-6" />
        </div>
      </section>

      {/* ============================ 35 YILLIK TARİHÇE ============================ */}
      <section className="bg-[#F8FAFC] py-10 sm:py-12">
        <div className="container-shell">
          <CorporateTimeline />
        </div>
      </section>

      {/* ============================ KURUMSAL SAYFALAR ============================ */}
      <section aria-labelledby="kurumsal-yapi-baslik" className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">
                <span className="h-px w-7 bg-[#1E3A8A]" aria-hidden="true" />
                Kurumsal Yapı
              </div>
              <h2
                id="kurumsal-yapi-baslik"
                className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
              >
                Deneyimin kurumsal katmanları
              </h2>
              <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-slate-500">
                Hakkımızdan kalite politikamıza, üretim teknolojimizden sürdürülebilirliğe kadar
                Çelikpen’in 35 yıllık yaklaşımını dokuz başlıkta keşfedin.
              </p>
            </div>
            <Link
              href="/iletisim"
              className="inline-flex w-fit items-center gap-2 text-[11px] font-semibold text-[#1E3A8A] transition-colors hover:text-[#1D4ED8]"
            >
              Kurumsal İletişim
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORPORATE_CORE_PAGES.map((page, index) => (
              <Link
                key={page.slug}
                href={`/kurumsal/${page.slug}`}
                prefetch={true}
                className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-card border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
              >
                <span
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1E3A8A] to-[#38BDF8] opacity-50 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] font-bold tracking-[0.14em] text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">
                    {page.categoryGroup}
                  </span>
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
                  {page.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[10.5px] leading-relaxed text-slate-500">
                  {page.subtitle}
                </p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                  <span className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {page.highlights.length} başlık
                  </span>
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-[12px] text-[#1E3A8A] transition-all group-hover:border-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {CORPORATE_MEDIA_PAGES.map((page, index) => (
              <Link
                key={page.slug}
                href={`/kurumsal/${page.slug}`}
                prefetch={true}
                className="group flex items-center gap-4 rounded-card border border-[#BFDBFE] bg-[#EFF6FF]/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1E3A8A]/40 hover:bg-[#EFF6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#0F172A] font-mono text-[11px] font-bold text-[#7DD3FC]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.16em] text-[#1D4ED8]">
                    Medya
                  </span>
                  <span className="mt-0.5 block text-[13px] font-bold text-[#0F172A]">
                    {page.title}
                  </span>
                  <span className="mt-1 line-clamp-1 block text-[10px] text-slate-500">
                    {page.subtitle}
                  </span>
                </span>
                <span className="ml-auto text-[14px] text-[#1E3A8A] transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ ÜRETİM & LABORATUVAR ============================ */}
      <section aria-labelledby="uretim-laboratuvar-baslik" className="bg-[#F8FAFC] py-10 sm:py-14">
        <div className="container-shell">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">
              <span className="h-px w-7 bg-[#1E3A8A]" aria-hidden="true" />
              Üretim & Doğrulama
            </div>
            <h2
              id="uretim-laboratuvar-baslik"
              className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
            >
              Tasarımdan teslimata kadar ölçülebilir üretim.
            </h2>
            <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
              CNC profil işleme, lazer ölçüm ve termal/akustik doğrulama; aynı dijital proje
              dosyasında birleşir.
            </p>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <article>
              <CorporateVisual variant="production" className="aspect-[16/10]" />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F172A]">
                    CNC Profil Üretim Tesisi
                  </h3>
                  <p className="mt-1 max-w-md text-[11px] leading-relaxed text-slate-500">
                    0,1 mm toleransla kesim, freze ve delme; alüminyum ve PVC profillerde
                    tekrarlanabilir kalite.
                  </p>
                </div>
                <Link
                  href="/kurumsal/uretim-teknolojimiz"
                  prefetch={true}
                  className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8]"
                >
                  Detay
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            <article>
              <CorporateVisual variant="quality" className="aspect-[16/10]" />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F172A]">
                    Termal & Akustik Laboratuvar
                  </h3>
                  <p className="mt-1 max-w-md text-[11px] leading-relaxed text-slate-500">
                    EN 12207, EN 12208, EN 12210 ve Uw değerleri; proje konfigürasyonuna göre
                    doğrulanır.
                  </p>
                </div>
                <Link
                  href="/kurumsal/kalite-politikamiz"
                  prefetch={true}
                  className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8]"
                >
                  Detay
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================ STANDARTLAR ============================ */}
      <section className="relative overflow-hidden bg-[#0F172A] py-10 text-white sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,197,253,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.18) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
          aria-hidden="true"
        />
        <div className="container-shell relative">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7DD3FC]">
                <span className="h-px w-7 bg-[#38BDF8]" aria-hidden="true" />
                Mühendislik Standartları
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ölçülebilir yalıtım, belgeli performans.
              </h2>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-300">
                Hava geçirimsizliği, su sızdırmazlığı, rüzgâr yükü ve ısı iletim katsayısı; üretim
                ve montaj kararlarımızın merkezindedir.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['EN 12207', 'EN 12208', 'EN 12210', 'Uw'].map((code) => (
                <span
                  key={code}
                  className="rounded-sm border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#7DD3FC]"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>

          <StandardsGrid tone="dark" standards={CORPORATE_STANDARDS} className="mt-7" />
        </div>
      </section>

      {/* ============================ SERTİFİKALAR ============================ */}
      <section aria-labelledby="sertifikalar-baslik" className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">
                <span className="h-px w-7 bg-[#1E3A8A]" aria-hidden="true" />
                Kalite Belgeleri
              </div>
              <h2
                id="sertifikalar-baslik"
                className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
              >
                TSE, CE, EN 14351-1 ve ISO 9001.
              </h2>
            </div>
            <Link
              href="/kurumsal/sertifikalarimiz"
              prefetch={true}
              className="inline-flex w-fit items-center gap-2 rounded-md border border-[#1E3A8A]/35 px-4 py-2.5 text-[10.5px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#1E3A8A] hover:text-white"
            >
              Tüm Sertifikalar
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <CertificateWall items={CORPORATE_CERTIFICATES} className="mt-7" />
        </div>
      </section>

      {/* ============================ WINSA PARTNERLİĞİ ============================ */}
      <section aria-labelledby="winsa-baslik" className="bg-[#F8FAFC] py-10 sm:py-14">
        <div className="container-shell">
          <h2 id="winsa-baslik" className="sr-only">
            Winsa Yetkili Üretim ve Mimari Çözüm Ortaklığı
          </h2>
          <WinsaPartnerBand />
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="bg-white pb-14 pt-2 sm:pb-16">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-panel bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#0F172A] px-6 py-8 text-white sm:px-10 sm:py-10">
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 right-24 h-52 w-52 rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#BFDBFE]">
                  Çelikpen · 35. Yıl
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Projenizi 35 yıllık deneyimle planlayalım.
                </h2>
                <p className="mt-2 text-[12px] leading-relaxed text-[#DBEAFE]">
                  Ücretsiz mimari keşif, lazer ölçüm, statik projelendirme ve anahtar teslim montaj
                  için ekibimizle görüşün.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/iletisim?form=kesif"
                  prefetch={true}
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-[11px] font-bold text-[#1E3A8A] transition-colors hover:bg-[#EFF6FF]"
                >
                  Ücretsiz Keşif
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
