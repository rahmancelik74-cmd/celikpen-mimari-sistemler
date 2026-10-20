import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { PROFESSIONAL_SUBPAGES } from '../../config/winsa-professionals.config';
import { MinimalSubpageHeader } from '../../components/MinimalSubpageHeader';

export const metadata: Metadata = {
  title: `Profesyoneller — Mimar, Mühendis ve Teknik Katalog Merkezi | ${SITE_CONFIG.brandName}`,
  description:
    'Mimarlar, mühendisler ve proje yönetimleri için Winsa & Çelikpen CAD profil kesitleri, 2026 dijital kataloglar ve teknik şartnameler.',
};

export default function ProfesyonellerPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-slate-700 sm:px-6">
      <MinimalSubpageHeader
        breadcrumbLabel="Profesyoneller"
        overline="MİMAR & MÜHENDİS PORTALI"
        title="Teknik Katalog, CAD Kesit ve Şartname Merkezi"
        subtitle="Projeleriniz için 1:1 CAD profil kesitleri, ihale poz şartnameleri, açılım kinematikleri ve montaj kılavuzları."
        rightAction={
          <Link
            href="/profesyoneller/kataloglar"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#D91B24] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#B31219]"
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
            className="hover-lift group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
          >
            <span className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t-2 border-l-2 border-[#D91B24] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div>
              <span className="inline-block rounded bg-[#0B1560] px-2 py-0.5 text-[10px] font-black text-white transition-colors group-hover:bg-[#D91B24]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-2.5 text-base font-black text-[#0B1560] transition-colors group-hover:text-[#D91B24]">
                {sub.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                {sub.subtitle}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs font-bold text-[#0B1560] group-hover:text-[#D91B24]">
              <span>İncele</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
