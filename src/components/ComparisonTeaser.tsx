import React from 'react';
import Link from 'next/link';
import { CELIKPEN_PRICING_CONFIG, SystemSeriesId } from '../config/pricing.config';

const CONTENT = {
  badge: 'Hızlı Sistem Seçim Rehberi',
  heading: 'Hangi Çelikpen Cam Balkon Serisi Balkonunuza Uygun?',
  ctaAll: '5 Seriyi Yan Yana Karşılaştır →',
  columns: [
    {
      systemId: 'vns_10mm' as SystemSeriesId,
      slug: 'vns-katlanir-cam-balkon',
      title: 'Katlanır Seri (ÇP-VNS)',
      mechanism: 'Tam Açılır Katlanır Kanat',
      highlight: 'Rüzgar, yağmur ve toz koruması arayan standart apartman balkonları için ideal.',
    },
    {
      systemId: 'vbs_isicam' as SystemSeriesId,
      slug: 'vbs-isicamli-cam-balkon',
      title: 'Isıcamlı Seri (ÇP-VBS)',
      mechanism: '4+20+4 Argon Gazlı Termal',
      highlight: 'Kışın sıcak oda konforu ve E-5 / Şirinevler trafik gürültüsüne karşı maksimum yalıtım.',
    },
    {
      systemId: 'vgs_giyotin' as SystemSeriesId,
      slug: 'vgs-motorlu-giyotin-cam',
      title: 'Motorlu Giyotin (ÇP-VGS)',
      mechanism: 'Kumandalı Dikey Açılım',
      highlight: 'Teraslar, dubleks daireler ve ticari mekanlar için otomatik cam küpeşte teknolojisi.',
    },
  ],
};

export function ComparisonTeaser() {
  return (
    <section id="karsilastir" className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-celikpen-brand-soft">
            {CONTENT.badge}
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">{CONTENT.heading}</h2>
        </div>
        <Link
          href="/karsilastir"
          className="rounded-lg border border-celikpen-brand bg-white px-4 py-2 text-xs font-bold text-celikpen-brand transition hover:bg-celikpen-subtle"
        >
          {CONTENT.ctaAll}
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CONTENT.columns.map((col) => {
          const sys = CELIKPEN_PRICING_CONFIG.systems[col.systemId];
          return (
            <div
              key={col.systemId}
              className="flex flex-col justify-between rounded-xl border border-celikpen-border bg-white p-5 shadow-sm transition hover:border-celikpen-brand-soft hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-celikpen-brand/10 px-2.5 py-0.5 text-xs font-bold text-celikpen-brand">
                    {sys.code}
                  </span>
                  <span className="rounded bg-celikpen-cta/10 px-2.5 py-0.5 text-xs font-extrabold text-celikpen-cta">
                    {sys.netPricePerM2.toLocaleString('tr-TR')} ₺/m²
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{col.title}</h3>
                <p className="mt-1 text-xs font-semibold text-celikpen-brand-soft">{col.mechanism}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{col.highlight}</p>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-celikpen-border bg-celikpen-subtle p-3 text-xs">
                  <div>
                    <span className="block text-[11px] text-slate-500">Isı Tasarrufu</span>
                    <span className="font-bold text-emerald-700">%{sys.thermalSavingPercent}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500">Ses Kesici</span>
                    <span className="font-bold text-celikpen-brand">-{sys.acousticReductionDb} dB</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-celikpen-border pt-3 text-xs">
                <Link
                  href={`/sistemler/${col.slug}`}
                  className="font-semibold text-slate-600 hover:text-slate-900"
                >
                  Seri Detayı
                </Link>
                <Link
                  href={`/karsilastir#${col.slug}`}
                  className="font-bold text-celikpen-brand-soft hover:underline"
                >
                  Tabloda Gör →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
