import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import {
  CORPORATE_CERTIFICATES,
  CORPORATE_SUBPAGES,
  type CorporateSubpageData,
} from '../../../config/winsa-corporate.config';
import { CorporateVisual } from '../../../components/corporate/CorporateArt';
import {
  CertificateWall,
  CorporateStats,
  StandardsGrid,
  WinsaPartnerBand,
} from '../../../components/corporate/CorporateBlocks';
import { CorporateTimeline } from '../../../components/corporate/CorporateTimeline';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../../components/SeoJsonLd';

export function generateStaticParams() {
  return CORPORATE_SUBPAGES.map((item) => ({
    altSayfa: item.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ altSayfa: string }>;
}): Promise<Metadata> {
  const { altSayfa } = await params;
  const pageData = CORPORATE_SUBPAGES.find((p) => p.slug === altSayfa);

  if (!pageData) {
    return generatePageMetadata({
      title: 'Kurumsal | Çelikpen',
      description:
        'Çelikpen kurumsal sayfaları: 30 yıllık deneyim, üretim teknolojisi, kalite standartları ve sertifikalar.',
      path: `/kurumsal/${altSayfa}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${pageData.title} | 30 Yıllık Çelikpen Kurumsal`,
    description: pageData.seoDescription,
    path: `/kurumsal/${pageData.slug}`,
    keywords: [
      pageData.title,
      'Çelikpen kurumsal',
      '30 yıllık cam balkon firması',
      'Winsa yetkili üretici',
    ],
  });
}

export default async function KurumsalAltSayfa({
  params,
}: {
  params: Promise<{ altSayfa: string }>;
}) {
  const { altSayfa } = await params;
  const pageData = CORPORATE_SUBPAGES.find((p) => p.slug === altSayfa);

  if (!pageData) notFound();

  const currentData: CorporateSubpageData = pageData;
  const pageIndex = CORPORATE_SUBPAGES.findIndex((p) => p.slug === currentData.slug);
  const cta =
    currentData.cta ?? {
      title: 'Projenizi 30 yıllık deneyimle planlayalım.',
      description:
        'Ücretsiz mimari keşif, lazer ölçüm ve anahtar teslim montaj için ekibimizle görüşün.',
      label: 'Ücretsiz Keşif',
      href: '/iletisim?form=kesif',
    };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Anasayfa', path: '/' },
    { name: 'Kurumsal', path: '/kurumsal' },
    { name: currentData.title, path: `/kurumsal/${currentData.slug}` },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: `${currentData.title} | 30 Yıllık Çelikpen Kurumsal`,
    description: currentData.seoDescription,
    path: `/kurumsal/${currentData.slug}`,
    type: 'AboutPage',
  });

  const certificateItems =
    currentData.slug === 'sertifikalarimiz'
      ? currentData.standards ?? CORPORATE_CERTIFICATES
      : null;

  const standards =
    currentData.standards && currentData.slug !== 'sertifikalarimiz'
      ? currentData.standards
      : null;

  const showPartnerBand =
    currentData.slug === 'hakkimizda' ||
    currentData.slug === 'kalite-politikamiz' ||
    currentData.slug === 'uretim-teknolojimiz' ||
    currentData.slug === 'sertifikalarimiz';

  return (
    <main className="bg-[#F8FAFC] pb-14">
      <JsonLd data={breadcrumbSchema} id="kurumsal-breadcrumb-jsonld" />
      <JsonLd data={webPageSchema} id="kurumsal-webpage-jsonld" />

      {/* ============================ ALT SAYFA HERO ============================ */}
      <section className="relative isolate overflow-hidden bg-[#0F172A] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,197,253,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.16) 1px, transparent 1px)',
            backgroundSize: '46px 46px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#1E3A8A]/70 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-36 left-1/3 h-80 w-80 rounded-full bg-[#38BDF8]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-shell relative py-7 sm:py-9 lg:py-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Anasayfa
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/kurumsal" className="transition-colors hover:text-white">
              Kurumsal
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-[#93C5FD]">{currentData.title}</span>
          </nav>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
            <div>
              <div className="inline-flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-sm border border-[#38BDF8]/35 bg-[#38BDF8]/10 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#7DD3FC]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                  {currentData.heroBadge}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  1996 — 2026
                </span>
              </div>

              <h1 className="mt-4 max-w-2xl text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.3rem] lg:text-[2.55rem]">
                {currentData.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[12.5px] leading-7 text-slate-300">
                {currentData.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/kurumsal"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[11px] font-bold text-[#0F172A] transition-colors hover:bg-[#EFF6FF]"
                >
                  Kurumsal Merkez
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:border-[#38BDF8]/60 hover:bg-white/10"
                >
                  İletişim
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <CorporateVisual
              variant={currentData.visual}
              className="aspect-[4/3] w-full border-white/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </section>

      {/* ============================ RAKAM ŞERİDİ ============================ */}
      <div className="relative z-10 -mt-7">
        <div className="container-shell">
          <CorporateStats stats={currentData.stats} />
        </div>
      </div>

      {/* ============================ İÇERİK + SIDEBAR ============================ */}
      <div className="container-shell mt-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="overflow-hidden rounded-panel border border-slate-200 bg-white shadow-xs">
                <div className="border-b border-white/10 bg-[#0F172A] px-4 py-4 text-white">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#7DD3FC]">
                    Kurumsal Menü
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-white/90">30 Yıllık Deneyim</p>
                </div>
                <nav aria-label="Kurumsal alt sayfalar" className="p-2">
                  {CORPORATE_SUBPAGES.map((page) => {
                    const active = page.slug === currentData.slug;
                    return (
                      <Link
                        key={page.slug}
                        href={`/kurumsal/${page.slug}`}
                        prefetch={true}
                        aria-current={active ? 'page' : undefined}
                        className={`group flex items-center justify-between gap-2 rounded-sm px-3 py-2.5 text-[11px] font-medium transition-colors ${
                          active
                            ? 'bg-[#1E3A8A] text-white'
                            : 'text-slate-600 hover:bg-[#EFF6FF] hover:text-[#1E3A8A]'
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate">{page.title}</span>
                          <span
                            className={`mt-0.5 block text-[7.5px] font-semibold uppercase tracking-[0.12em] ${
                              active ? 'text-[#BFDBFE]' : 'text-slate-400'
                            }`}
                          >
                            {page.categoryGroup}
                          </span>
                        </span>
                        <span
                          className={`text-[10px] transition-transform group-hover:translate-x-0.5 ${
                            active ? 'text-[#BFDBFE]' : 'text-slate-300'
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="rounded-panel border border-[#BFDBFE] bg-[#EFF6FF] p-4">
                <div className="flex items-baseline gap-1 text-[#1E3A8A]">
                  <span className="text-2xl font-extrabold leading-none">35</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em]">Yıl</span>
                </div>
                <p className="mt-2 text-[10.5px] leading-relaxed text-slate-600">
                  1996’dan bugüne kesintisiz üretim, saha tecrübesi ve mühendislik birikimi.
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[10.5px] font-bold text-[#1E3A8A] hover:text-[#1D4ED8]"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
                <Link
                  href="/iletisim?form=kesif"
                  prefetch={true}
                  className="mt-3 flex items-center justify-center gap-2 rounded-md bg-[#1E3A8A] px-3 py-2.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Ücretsiz Keşif
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </aside>

          <div className="space-y-5 lg:col-span-9">
            <section
              aria-labelledby="kurumsal-icerik-baslik"
              className="rounded-panel border border-slate-200 bg-white p-5 shadow-xs sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]">
                    Kurumsal Yaklaşım
                  </p>
                  <h2
                    id="kurumsal-icerik-baslik"
                    className="mt-1 text-lg font-bold tracking-tight text-[#0F172A]"
                  >
                    {currentData.title}
                  </h2>
                </div>
                <span className="rounded-full border border-slate-200 bg-[#F8FAFC] px-2.5 py-1 font-mono text-[9px] font-semibold text-slate-500">
                  {String(pageIndex + 1).padStart(2, '0')} / {String(CORPORATE_SUBPAGES.length).padStart(2, '0')}
                </span>
              </div>

              <div className="mt-5 space-y-4 text-[12.5px] leading-7 text-slate-600">
                {currentData.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {currentData.highlights.map((highlight, index) => (
                  <div
                    key={highlight.title}
                    className="group rounded-card border border-slate-200 bg-[#F8FAFC] p-4 transition-colors hover:border-[#BFDBFE] hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-[#1E3A8A]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-2 text-[12px] font-bold text-[#0F172A]">
                      {highlight.title}
                    </h3>
                    <p className="mt-1.5 text-[10.5px] leading-relaxed text-slate-500">
                      {highlight.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {standards && (
              <section
                aria-labelledby="performans-standartlari-baslik"
                className="rounded-panel border border-slate-200 bg-white p-5 shadow-xs sm:p-7"
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]">
                      Mühendislik
                    </p>
                    <h2
                      id="performans-standartlari-baslik"
                      className="mt-1 text-lg font-bold tracking-tight text-[#0F172A]"
                    >
                      Performans standartları
                    </h2>
                  </div>
                  <span className="rounded-sm bg-[#EFF6FF] px-2.5 py-1 font-mono text-[9px] font-semibold text-[#1E3A8A]">
                    EN / Uw
                  </span>
                </div>
                <StandardsGrid standards={standards} className="mt-5" />
              </section>
            )}

            {certificateItems && (
              <section
                aria-labelledby="sertifika-vitrini-baslik"
                className="rounded-panel border border-slate-200 bg-white p-5 shadow-xs sm:p-7"
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]">
                      Sertifikasyon
                    </p>
                    <h2
                      id="sertifika-vitrini-baslik"
                      className="mt-1 text-lg font-bold tracking-tight text-[#0F172A]"
                    >
                      Belgeli üretim altyapısı
                    </h2>
                  </div>
                  <span className="rounded-sm bg-[#EFF6FF] px-2.5 py-1 font-mono text-[9px] font-semibold text-[#1E3A8A]">
                    TSE / CE / ISO
                  </span>
                </div>
                <CertificateWall items={certificateItems} className="mt-5" />
              </section>
            )}

            {currentData.slug === 'hakkimizda' && <CorporateTimeline />}

            {currentData.list && (
              <section
                aria-labelledby="kurumsal-liste-baslik"
                className="rounded-panel border border-slate-200 bg-white p-5 shadow-xs sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] text-[12px] font-bold text-[#7DD3FC]">
                    {String(currentData.list.length).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]">
                      {currentData.slug === 'kvkk' ? 'Yasal Haklar' : 'Kariyer'}
                    </p>
                    <h2
                      id="kurumsal-liste-baslik"
                      className="mt-0.5 text-base font-bold text-[#0F172A]"
                    >
                      {currentData.listTitle ?? 'Başlıklar'}
                    </h2>
                  </div>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {currentData.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-sm border border-slate-100 bg-[#F8FAFC] px-3 py-2.5 text-[10.5px] leading-relaxed text-slate-600"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-[8px] font-bold text-[#1E3A8A]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {showPartnerBand && <WinsaPartnerBand />}

            <section className="overflow-hidden rounded-panel bg-[#0F172A] p-6 text-white sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="max-w-xl">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#7DD3FC]">
                    Çelikpen · 30. Yıl
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">{cta.title}</h2>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-300">{cta.description}</p>
                </div>
                <Link
                  href={cta.href}
                  prefetch={true}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-[11px] font-bold text-[#1E3A8A] transition-colors hover:bg-[#EFF6FF]"
                >
                  {cta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
