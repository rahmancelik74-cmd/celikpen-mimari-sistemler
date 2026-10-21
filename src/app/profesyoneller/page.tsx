import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { PROFESSIONAL_SUBPAGES } from '../../config/winsa-professionals.config';
import { MinimalSubpageHeader } from '../../components/MinimalSubpageHeader';

export const metadata: Metadata = generatePageMetadata({
  title: `Profesyoneller — Mimar, Mühendis ve Teknik Katalog Merkezi | ${SITE_CONFIG.brandName}`,
  description:
    'Mimarlar, mühendisler ve proje yönetimleri için Çelikpen CAD profil kesitleri, 2026 dijital kataloglar ve teknik şartnameler.',
  path: '/profesyoneller',
  keywords: [
    'cam balkon CAD kesit',
    'alüminyum profil şartnamesi',
    'mimari cam sistemleri kataloğu',
    'Winsa teknik doküman',
  ],
});

export default function ProfesyonellerPage() {
  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-8 text-slate-700 sm:px-6 lg:px-8">
      <MinimalSubpageHeader
        breadcrumbLabel="Profesyoneller"
        overline="MİMAR & MÜHENDİS PORTALI"
        title="Teknik Katalog, CAD Kesit ve Şartname Merkezi"
        subtitle="Projeleriniz için 1:1 CAD profil kesitleri, ihale poz şartnameleri, açılım kinematikleri ve montaj kılavuzları."
        rightAction={
          <Link
            href="/profesyoneller/kataloglar"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#7C3AED] px-4 py-2.5 text-[11px] font-semibold text-white shadow-purple transition-colors hover:bg-[#6D28D9]"
          >
            <span>2026 E-Kataloglar</span>
            <span>→</span>
          </Link>
        }
      />

      {/* 10 Uzmanlık Modülü (Minimalist L-Köşe Kartlar) */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PROFESSIONAL_SUBPAGES.map((sub, idx) => (
          <Link
            key={sub.slug}
            href={`/profesyoneller/${sub.slug}`}
            className="hover-lift group relative flex flex-col justify-between overflow-hidden rounded-card border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-[#DDD6FE]"
          >
            <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-[#7C3AED] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div>
              <span className="inline-block rounded-full bg-[#F5F3FF] px-2.5 py-1 text-[9px] font-semibold text-[#6D28D9] transition-colors group-hover:bg-[#7C3AED] group-hover:text-white">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-2.5 text-[13.5px] font-semibold leading-snug text-[#0F172A] transition-colors group-hover:text-[#7C3AED]">
                {sub.title}
              </h2>
              <p className="mt-1.5 line-clamp-2 text-[10.5px] leading-relaxed text-slate-500">
                {sub.subtitle}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[10.5px] font-semibold text-[#6D28D9]">
              <span>İncele</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
