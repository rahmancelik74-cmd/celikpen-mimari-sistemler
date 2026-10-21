import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { CELIKPEN_PRICING_CONFIG, SystemSeriesId } from '../../config/pricing.config';
import { generatePageMetadata } from '../../config/seo.config';

const CONTENT = {
  metaTitle: 'Çelikpen Cam Balkon Serileri Karşılaştırma Tablosu (2026 Net Fiyatlı)',
  metaDescription:
    'Çelikpen 8mm/10mm Katlanır, 4+20+4 Argon Gazlı Isıcamlı, Eşiksiz Sürme ve Motorlu Giyotin cam balkon serilerini ısı tasarrufu, desibel ses yalıtımı ve net m² fiyatları ile yan yana karşılaştırın.',
  badge: 'Kocasinan Fabrika Satış • Teknik Karşılaştırma Matrisi',
  heading: 'Çelikpen Cam Balkon Serileri Karşılaştırma Tablosu (2026 Net Fiyatlı)',
  subheading:
    'Balkonunuzun cephe yönü, cadde gürültüsü ve kullanım amacına göre 5 mimari cam serimizi teknik verileri ve net m² birim fiyatlarıyla karşılaştırın.',
  tableCaption:
    'Çelikpen 2026 cam balkon sistemleri teknik özellik, ısı/ses yalıtımı ve net m² fiyat karşılaştırma tablosu',
  headers: {
    series: 'Seri',
    code: 'Kod',
    name: 'Seri Adı',
    glass: 'Cam',
    thermal: 'Isı Tasarrufu (%)',
    acoustic: 'Ses Kesici (dB)',
    price: 'Net m² Birim Fiyatı',
    mechanism: 'Katlanır / Sürme / Motorlu',
    warranty: 'Garanti',
    idealUse: 'İdeal Kullanım',
    detail: 'Detay',
  },
  mechanisms: {
    vns_8mm: 'Katlanır (8 Rulmanlı)',
    vns_10mm: 'Katlanır Pro (Çift Sıra Rulman)',
    vbs_isicam: 'Katlanır Termal (Mıknatıslı Fitil)',
    vds_surme: 'Eşiksiz Sürme (3/5 Raylı)',
    vgs_giyotin: 'Motorlu Dikey Giyotin (Kumandalı)',
  } satisfies Record<SystemSeriesId, string>,
  seriesSlugBySystemId: {
    vns_8mm: 'vns-katlanir-cam-balkon',
    vns_10mm: 'vns-katlanir-cam-balkon',
    vbs_isicam: 'vbs-isicamli-cam-balkon',
    vds_surme: 'vds-esiksiz-surme-cam-balkon',
    vgs_giyotin: 'vgs-motorlu-giyotin-cam',
  } satisfies Record<SystemSeriesId, string>,
  ctaCalculator: 'Seçtiğiniz Seriyle Canlı m² Fiyat Hesapla →',
  detailLinkLabel: 'İncele →',
};

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: CONTENT.metaTitle,
    description: CONTENT.metaDescription,
    path: '/karsilastir',
    keywords: [
      'cam balkon karşılaştırma',
      'ısıcamlı cam balkon mu katlanır cam mı',
      'giyotin cam balkon fiyat',
      'sürme cam balkon fiyat',
      'cam balkon ses yalıtımı',
    ],
  });
}

export default function KarsilastirPage() {
  const systems = Object.values(CELIKPEN_PRICING_CONFIG.systems);
  const warrantyText = `${SITE_CONFIG.warranties.mechanicalWarrantyYears} Yıl Mekanik + Şişecam Sertifikası`;

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-10 text-slate-700">
      <div className="mb-8">
        <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
          {CONTENT.badge}
        </span>
        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{CONTENT.heading}</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{CONTENT.subheading}</p>
      </div>

      {/* Yatay Karşılaştırma Tablosu (İlk Sütun Sticky) */}
      <div className="overflow-x-auto rounded-2xl border border-celikpen-border bg-white shadow-sm">
        <table className="w-full min-w-[980px] border-collapse text-left text-xs sm:text-sm">
          <caption className="sr-only">{CONTENT.tableCaption}</caption>
          <thead className="border-b border-celikpen-border bg-celikpen-subtle text-xs uppercase text-slate-500">
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-20 bg-celikpen-subtle p-4 font-bold text-slate-900 shadow-[2px_0_6px_rgba(15,23,42,0.06)]"
              >
                {CONTENT.headers.series}
              </th>
              <th scope="col" className="p-4">
                {CONTENT.headers.code}
              </th>
              <th scope="col" className="p-4">
                {CONTENT.headers.name}
              </th>
              <th scope="col" className="p-4">
                {CONTENT.headers.glass}
              </th>
              <th scope="col" className="p-4">
                {CONTENT.headers.thermal}
              </th>
              <th scope="col" className="p-4">
                {CONTENT.headers.acoustic}
              </th>
              <th scope="col" className="bg-celikpen-cta/10 p-4 text-right text-celikpen-cta">
                {CONTENT.headers.price}
              </th>
              <th scope="col" className="p-4">
                {CONTENT.headers.mechanism}
              </th>
              <th scope="col" className="p-4">
                {CONTENT.headers.warranty}
              </th>
              <th scope="col" className="p-4">
                {CONTENT.headers.idealUse}
              </th>
              <th scope="col" className="p-4 text-right">
                {CONTENT.headers.detail}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-celikpen-border">
            {systems.map((sys) => {
              const targetSlug = CONTENT.seriesSlugBySystemId[sys.id];
              const prodSeries =
                SITE_CONFIG.productSeries.find((p) => p.slug === targetSlug) ||
                SITE_CONFIG.productSeries[0];

              return (
                <tr
                  key={sys.id}
                  id={targetSlug}
                  className="transition hover:bg-celikpen-subtle"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white p-4 font-bold text-celikpen-brand-soft shadow-[2px_0_6px_rgba(15,23,42,0.06)]"
                  >
                    <div>{sys.code}</div>
                    {sys.badge && (
                      <span className="mt-1 inline-block rounded bg-celikpen-brand/10 px-2 py-0.5 text-[10px] font-semibold text-celikpen-brand">
                        {sys.badge}
                      </span>
                    )}
                  </th>
                  <td className="p-4 font-semibold text-slate-600">{sys.code}</td>
                  <td className="p-4 font-bold text-slate-900">{sys.name}</td>
                  <td className="p-4 text-slate-600">{sys.glassSpec}</td>
                  <td className="p-4 font-semibold text-emerald-700">
                    %{sys.thermalSavingPercent} Tasarruf
                  </td>
                  <td className="p-4 font-semibold text-celikpen-brand">
                    -{sys.acousticReductionDb} dB
                  </td>
                  <td className="bg-celikpen-cta/10 p-4 text-right text-base font-extrabold text-celikpen-cta">
                    {sys.netPricePerM2.toLocaleString('tr-TR')} ₺/m²
                  </td>
                  <td className="p-4 text-slate-700">{CONTENT.mechanisms[sys.id]}</td>
                  <td className="p-4 text-slate-600">{warrantyText}</td>
                  <td className="max-w-xs p-4 text-xs text-slate-600">
                    <strong className="block text-slate-900">{prodSeries.tagline}</strong>
                    <span className="mt-1 block text-slate-500">{sys.shortDesc}</span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/sistemler/${targetSlug}`}
                      className="inline-block rounded-lg border border-celikpen-brand bg-white px-3 py-1.5 text-xs font-bold text-celikpen-brand transition hover:bg-celikpen-subtle"
                    >
                      {CONTENT.detailLinkLabel}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Alt Dönüşüm Kutusu */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-celikpen-border bg-celikpen-subtle p-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {SITE_CONFIG.warranties.freeSurveyPromise}
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            5+ daire toplu apartman ve kentsel dönüşüm projelerinde tüm serilerde net %
            {Math.round(CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate * 100)} indirim uygulanır.
          </p>
        </div>
        <Link
          href="/fiyat-hesapla"
          className="rounded-lg bg-celikpen-cta px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-rose-500"
        >
          {CONTENT.ctaCalculator}
        </Link>
      </div>
    </main>
  );
}
