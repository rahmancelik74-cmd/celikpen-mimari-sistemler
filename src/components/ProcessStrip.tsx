import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '../config/site.config';

const CONTENT = {
  badge: 'Kocasinan Merkezden Balkonunuza • 4 Adımda Kurulum',
  heading: 'Ücretsiz Keşiften Garantili Montaja Çelikpen Süreci',
  linkLabel: 'Sürecin Detaylarını İncele →',
  steps: [
    {
      icon: '📏',
      title: '1) Ücretsiz Lazer Keşif',
      desc: 'Aynı gün milimetrik lazer ölçüm ve cephe renk tespiti.',
    },
    {
      icon: '📋',
      title: '2) Net Fiyat Teklifi',
      desc: 'Sürpriz fark olmadan m² bazlı yazılı teklif + 4/5 muvafakatname.',
    },
    {
      icon: '🏭',
      title: '3) Kocasinan Üretim',
      desc: 'Şişecam temperli cam ve T66 alüminyum CNC imalatı.',
    },
    {
      icon: '🔧',
      title: `4) Montaj + ${SITE_CONFIG.warranties.mechanicalWarrantyYears} Yıl Garanti`,
      desc: 'Tek günde temiz kurulum ve su sızdırmazlık testi.',
    },
  ],
};

export function ProcessStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-2xl border border-celikpen-border bg-celikpen-subtle p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-celikpen-brand-soft">
              {CONTENT.badge}
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">{CONTENT.heading}</h2>
          </div>
          <Link
            href="/nasil-calisiriz"
            className="text-xs font-bold text-celikpen-brand-soft hover:underline"
          >
            {CONTENT.linkLabel}
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTENT.steps.map((step) => (
            <Link
              key={step.title}
              href="/nasil-calisiriz"
              className="rounded-xl border border-celikpen-border bg-white p-4 shadow-sm transition hover:border-celikpen-brand-soft hover:shadow-md"
            >
              <div className="text-2xl" aria-hidden="true">
                {step.icon}
              </div>
              <h3 className="mt-2 text-sm font-bold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{step.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
