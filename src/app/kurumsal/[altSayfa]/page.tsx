import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { CORPORATE_SUBPAGES } from '../../../config/winsa-corporate.config';
import { MinimalSubpageHeader } from '../../../components/MinimalSubpageHeader';

export function generateStaticParams() {
  return CORPORATE_SUBPAGES.map((item) => ({
    altSayfa: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ altSayfa: string }>;
}): Promise<Metadata> {
  const { altSayfa } = await params;
  const pageData = CORPORATE_SUBPAGES.find((p) => p.slug === altSayfa);
  if (!pageData) {
    return { title: 'Kurumsal | Çelikpen & Winsa' };
  }
  return {
    title: `${pageData.title} | Kurumsal — ${SITE_CONFIG.brandName}`,
    description: pageData.seoDescription,
  };
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

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-slate-700 sm:px-6">
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
            <div className="border-b border-slate-100 bg-[#0B1560] px-4 py-3 text-white">
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
                        href={`/kurumsal/${item.slug}`}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                          active
                            ? 'bg-[#D91B24] text-white'
                            : 'text-[#0B1560] hover:bg-slate-100 hover:text-[#D91B24]'
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
                <p className="text-xl font-black text-[#0B1560]">{st.value}</p>
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
                    <span className="mt-0.5 text-xs font-black text-[#D91B24]">◆</span>
                    <div>
                      <h3 className="text-xs font-black text-[#0B1560]">{hl.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{hl.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alt Kompakt Showroom & Katalog Çubuğu */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#0B1560] p-5 text-white sm:flex-row sm:items-center">
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
                href="/urunler"
                className="rounded-lg bg-[#D91B24] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#B31219]"
              >
                Ürünleri İncele →
              </Link>
              <Link
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
