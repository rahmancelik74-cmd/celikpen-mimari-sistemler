import React from 'react';
import { MinimalSubpageHeader } from './MinimalSubpageHeader';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export function LegalPage({
  breadcrumbLabel,
  title,
  subtitle,
  sections,
  children,
}: {
  breadcrumbLabel: string;
  title: string;
  subtitle: string;
  sections: LegalSection[];
  children?: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-8 text-slate-700 sm:px-6 lg:px-8">
      <MinimalSubpageHeader
        breadcrumbLabel={breadcrumbLabel}
        overline="YASAL BİLGİLENDİRME"
        title={title}
        subtitle={subtitle}
      />
      <article className="mx-auto max-w-3xl rounded-card border border-slate-200 bg-white p-6 text-[13px] leading-relaxed shadow-xs sm:p-8">
        {sections.map((s, i) => (
          <section key={s.heading} className={i > 0 ? 'mt-7' : ''}>
            <h2 className="border-l-2 border-[#1E3A8A] pl-3 text-[15px] font-semibold text-[#0F172A]">
              {i + 1}. {s.heading}
            </h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-2.5">
                {p}
              </p>
            ))}
            {s.items && (
              <ul className="mt-2.5 list-disc space-y-1.5 pl-5">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {children}
        <p className="mt-8 border-t border-slate-200 pt-4 text-[11px] text-slate-400">
          Son güncelleme: 7 Kasım 2026
        </p>
      </article>
    </main>
  );
}

export const LEGAL_CONTACT = {
  title: 'Çelikpen Cam Balkon & Mimari Doğrama Sistemleri',
  address: 'Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C, 34186 Bahçelievler / İstanbul',
  phone: '0 (532) 333 20 85',
  email: 'iletisim@celikpen.com',
};
