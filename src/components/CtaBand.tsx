import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '../config/site.config';

const CONTENT = {
  badge: 'Kocasinan Merkez Fabrika Satış • Aynı Gün Ücretsiz Keşif',
  heading: 'Balkonunuzun net fiyatını 30 saniyede öğrenin',
  subheading: SITE_CONFIG.warranties.freeSurveyPromise,
  calcBtn: 'Canlı m² Fiyat Hesapla →',
  whatsappBtn: "💬 WhatsApp'tan yazın",
  whatsappMessage: `Merhaba Çelikpen (${SITE_CONFIG.headquartersNeighborhood}), balkonum için net m² fiyat bilgisi ve ücretsiz keşif randevusu almak istiyorum.`,
};

export function CtaBand() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    CONTENT.whatsappMessage
  )}`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-celikpen-border bg-celikpen-subtle p-6 shadow-sm sm:p-8">
        <div>
          <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
            {CONTENT.badge}
          </span>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            {CONTENT.heading}
          </h2>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">{CONTENT.subheading}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            prefetch={true}
            href="/fiyat-hesapla"
            className="rounded-lg bg-celikpen-cta px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-rose-500"
          >
            {CONTENT.calcBtn}
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-celikpen-brand bg-white px-5 py-3 text-sm font-bold text-celikpen-brand transition hover:bg-celikpen-subtle"
          >
            {CONTENT.whatsappBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
