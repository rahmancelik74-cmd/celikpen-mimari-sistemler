import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import { CORPORATE_SUBPAGES } from '../../../config/winsa-corporate.config';
import { MinimalSubpageHeader } from '../../../components/MinimalSubpageHeader';
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
      description: 'Çelikpen kurumsal bilgileri.',
      path: `/kurumsal/${altSayfa}`,
      noIndex: true,
    });
  }
  return generatePageMetadata({
    title: `${pageData.title} | Kurumsal — ${SITE_CONFIG.brandName}`,
    description: pageData.seoDescription,
    path: `/kurumsal/${pageData.slug}`,
    keywords: [
      pageData.title,
      `${SITE_CONFIG.brandName} kurumsal`,
      'cam balkon üreticisi İstanbul',
      'Bahçelievler cam balkon firması',
    ],
  });
}

export default async function KurumsalAltSayfa({
  params,
}: {
  params: Promise<{ altSayfa: string }>;
}) {
  const { altSayfa } = await params;
  const currentData = CORPORATE_SUBPAGES.find((p) => p.slug === altSayfa);

  if (!currentData) {
    notFound();
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kurumsal', path: '/kurumsal' },
    { name: currentData.title, path: `/kurumsal/${currentData.slug}` },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: `${currentData.title} | Çelikpen Kurumsal`,
    description: currentData.seoDescription,
    path: `/kurumsal/${currentData.slug}`,
    type: 'AboutPage',
  });

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-8 text-slate-700 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbSchema} id="kurumsal-breadcrumb-jsonld" />
      <JsonLd data={webPageSchema} id="kurumsal-webpage-jsonld" />
      <MinimalSubpageHeader
        breadcrumbLabel={currentData.title}
        parentBreadcrumb={{ label: 'Kurumsal', href: '/kurumsal' }}
        overline={currentData.heroBadge}
        title={currentData.title}
        subtitle={currentData.subtitle}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sol Kompakt Sticky Sidebar (`w-60`) */}
        <aside className="lg:col-span-3">
          <div className="sticky top-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <div className="border-b border-slate-100 bg-[#0F172A] px-4 py-3 text-white">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300">
                KURUMSAL MENÜ
              </p>
              <h2 className="text-sm font-black">Bölümler</h2>
            </div>
            <nav aria-label="Kurumsal Alt Menüsü" className="p-1.5">
              <ul className="space-y-0.5">
                {CORPORATE_SUBPAGES.map((item) => {
                  const active = item.slug === currentData.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        prefetch={true}
                        href={`/kurumsal/${item.slug}`}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                          active
                            ? 'bg-[#7C3AED] text-white'
                            : 'text-[#0F172A] hover:bg-slate-100 hover:text-[#7C3AED]'
                        }`}
                      >
                        <span>{item.title}</span>
                        <span>›</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Sağ Minimalist Bento İçerik Alanı (%60 Kısaltılmış Özlü Metin + Kartlar) */}
        <div className="space-y-6 lg:col-span-9">
          {/* 4'lü İstatistik Bento Kartları */}
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {currentData.stats.map((st) => (
              <div
                key={st.label}
                className="glass-sheen hover-lift rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-2xs"
              >
                <p className="text-xl font-black text-[#0F172A]">{st.value}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-500">{st.label}</p>
              </div>
            ))}
          </div>

          {/* Özlü Özet + Bento Highlight Kartları */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
            <p className="text-sm leading-relaxed text-slate-600">
              {currentData.paragraphs[0]}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3.5 md:grid-cols-2">
              {currentData.highlights.map((hl) => (
                <div
                  key={hl.title}
                  className="hover-lift rounded-xl border border-slate-200/80 bg-slate-50/70 p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-xs font-black text-[#7C3AED]">◆</span>
                    <div>
                      <h3 className="text-xs font-black text-[#0F172A]">{hl.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{hl.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alt Kompakt Showroom & Katalog Çubuğu */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#0F172A] p-5 text-white sm:flex-row sm:items-center">
            <div>
              <h3 className="text-sm font-black">
                Kocasinan Merkez Showroom &amp; Dijital Katalog Merkezi
              </h3>
              <p className="mt-0.5 text-xs text-slate-300">
                Tüm mimari serilerimizi yerinde inceleyin veya 2026 kataloglarını indirin.
              </p>
            </div>
            <div className="flex shrink-0 gap-2.5">
              <Link
                prefetch={true}
                href="/urunler"
                className="rounded-lg bg-[#7C3AED] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#6D28D9]"
              >
                Ürünleri İncele →
              </Link>
              <Link
                prefetch={true}
                href="/iletisim"
                className="rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20"
              >
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
