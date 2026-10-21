import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import { CELIKPEN_PRICING_CONFIG } from '../../../config/pricing.config';
import { PriceCalculator } from '../../../components/PriceCalculator';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildServiceSchema,
} from '../../../components/SeoJsonLd';

export function generateStaticParams() {
  const baseParams = SITE_CONFIG.neighborhoods.map((n) => ({ mahalle: n.slug }));
  return [...baseParams, { mahalle: 'kocasinan-merkez' }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mahalle: string }>;
}): Promise<Metadata> {
  const { mahalle } = await params;
  const info =
    SITE_CONFIG.neighborhoods.find((n) => n.slug === mahalle) ||
    SITE_CONFIG.neighborhoods[0];

  return generatePageMetadata({
    title: `${info.name} Cam Balkon & 2026 Net m² Fiyatları | ${SITE_CONFIG.brandName}`,
    description: `${info.name} (${info.urbanFocus}) bölgesine özel ${info.recommendedSystem}. Kocasinan Merkez fabrikamızdan aynı gün ücretsiz lazerli keşif ve %15 kentsel dönüşüm indirimi.`,
    path: `/bahcelievler/${mahalle}`,
    keywords: [
      `${info.name} cam balkon`,
      `${info.name} cam balkon fiyatları`,
      `${info.name} ısıcamlı cam balkon`,
      `${info.name} giyotin cam`,
      `${info.name} cam balkon üretici`,
      'Bahçelievler cam balkon',
    ],
  });
}

export default async function MahallePage({
  params,
}: {
  params: Promise<{ mahalle: string }>;
}) {
  const { mahalle } = await params;
  const info =
    SITE_CONFIG.neighborhoods.find((n) => n.slug === mahalle) ||
    SITE_CONFIG.neighborhoods[0];

  const systems = Object.values(CELIKPEN_PRICING_CONFIG.systems);
  const frostedOption = CELIKPEN_PRICING_CONFIG.glassOptions.alt_buzlu;
  const discountPercent = Math.round(CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate * 100);

  const serviceSchema = buildServiceSchema({
    name: `${info.name} Cam Balkon ve Mimari Cam Sistemleri`,
    description: `${info.name} mahallesinde ısıcamlı cam balkon, katlanır cam balkon, sürme cam, giyotin cam ve kış bahçesi uygulamaları. ${info.highlightProblem}`,
    serviceType: 'Cam balkon ve mimari cam sistemleri',
    path: `/bahcelievler/${mahalle}`,
    areaServed: [info.name, 'Bahçelievler, İstanbul', 'İstanbul'],
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Bahçelievler', path: '/satis-noktalari' },
    { name: info.name, path: `/bahcelievler/${mahalle}` },
  ]);

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-10 text-slate-700">
      <JsonLd data={serviceSchema} id="mahalle-service-jsonld" />
      <JsonLd data={breadcrumbSchema} id="mahalle-breadcrumb-jsonld" />
      {/* Üst Navigasyon */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Link
            prefetch={true}
            href="/" className="hover:text-celikpen-brand-soft">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span>Bahçelievler</span>
          <span>/</span>
          <span className="font-semibold text-slate-900">{info.name}</span>
        </div>
        <Link
          prefetch={true}
          href="/blog/eylul-2026-yargitay-cam-balkon-karari"
          className="font-semibold text-celikpen-cta hover:underline"
        >
          📄 Eylül 2026 Yargıtay 4/5 Muvafakatname Formu →
        </Link>
      </nav>

      {/* Mahalle Hero Başlığı */}
      <div className="rounded-2xl border border-celikpen-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
            Çelikpen Kocasinan Merkezden Aynı Gün Ücretsiz Keşif
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {info.completedProjectsCount}+ Tamamlanan {info.name} Referansı
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">
          {info.name} Cam Balkon Sistemleri ve 2026 Net m² Fiyatları
        </h1>

        <p className="mt-3 text-base text-slate-600">
          <strong className="text-slate-900">Bölge Mimari Odağı:</strong> {info.urbanFocus} —{' '}
          {info.highlightProblem}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">
              Önerilen Çelikpen Çözümü
            </div>
            <div className="mt-1 text-sm font-bold text-celikpen-brand-soft">
              {info.recommendedSystem}
            </div>
          </div>
          <div className="rounded-xl border border-celikpen-border bg-celikpen-subtle p-4">
            <div className="text-xs font-semibold uppercase text-slate-500">
              Bitişik Nizam Mahremiyet
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900">
              {frostedOption.name} (+{frostedOption.extraPerM2} ₺/m²)
            </div>
          </div>
          <div className="rounded-xl border border-emerald-600/30 bg-emerald-50 p-4">
            <div className="text-xs font-semibold uppercase text-emerald-700">
              Kentsel Dönüşüm & Toplu Bina
            </div>
            <div className="mt-1 text-sm font-bold text-emerald-800">
              5+ Daire Apartmanlara Net %{discountPercent} İndirim
            </div>
          </div>
        </div>
      </div>

      {/* Canlı Hesaplama Motoru */}
      <section className="mt-8">
        <PriceCalculator defaultNeighborhood={info.name} />
      </section>

      {/* FAZ 3: Mahalle Bazlı Ses Yalıtımı (Desibel) ve Termal Karşılaştırma Tablosu */}
      <section className="mt-12 rounded-2xl border border-celikpen-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          {info.name} İçin Akustik (Desibel) & Termal Performans Tablosu
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          {info.name} bölgesindeki cadde gürültüsü, rüzgar yükü ve kış ısı kaybına göre Çelikpen
          serilerinin laboratuvar ve saha değerleri:
        </p>

        <div className="mt-4 overflow-x-auto rounded-xl border border-celikpen-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-celikpen-subtle text-xs uppercase text-slate-500">
              <tr>
                <th className="p-3.5">Seri Kodu</th>
                <th className="p-3.5">Sistem & Cam Teknik Özelliği</th>
                <th className="p-3.5">Ses Kesme (Akustik)</th>
                <th className="p-3.5">Isı Tasarrufu</th>
                <th className="p-3.5 text-right">Net m² Fiyatı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-celikpen-border bg-white">
              {systems.map((sys) => (
                <tr key={sys.id} className="hover:bg-celikpen-subtle">
                  <td className="p-3.5 font-bold text-celikpen-brand-soft">{sys.code}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900">{sys.name}</div>
                    <div className="text-xs text-slate-500">{sys.glassSpec}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-700">
                    -{sys.acousticReductionDb} dB Gürültü İzolasyonu
                  </td>
                  <td className="p-3.5 text-slate-700">%{sys.thermalSavingPercent} Termal Koruma</td>
                  <td className="p-3.5 text-right font-extrabold text-celikpen-cta">
                    {sys.netPricePerM2.toLocaleString('tr-TR')} ₺/m²
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bitişik Nizam Mahremiyet & %15 Kentsel Dönüşüm Kampanya Kartları */}
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-celikpen-border bg-white p-6 shadow-sm">
          <span className="rounded bg-celikpen-brand/10 px-2.5 py-1 text-xs font-bold text-celikpen-brand">
            Bitişik Nizam Sokak Çözümü
          </span>
          <h3 className="mt-3 text-lg font-bold text-slate-900">
            {frostedOption.name} ile Perdesiz Mahremiyet
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {info.name} mahallesindeki karşılıklı apartmanlarda balkonunuzda otururken dışarıdan
            içerinin görünmesini engeller, üst şeffaf bölümü sayesinde gökyüzü ve gün ışığını
            kesmez. Yalnızca <strong>+{frostedOption.extraPerM2} ₺/m²</strong> farkla tüm serilere
            uygulanır.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-600/30 bg-emerald-50 p-6 shadow-sm">
          <span className="rounded bg-emerald-600/15 px-2.5 py-1 text-xs font-bold text-emerald-800">
            Apartman Yönetimi & Kentsel Dönüşüm Paketi
          </span>
          <h3 className="mt-3 text-lg font-bold text-slate-900">
            5+ Daire Toplu Siparişlerde Net %{discountPercent} Bina İndirimi
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            Yeni teslim edilen kentsel dönüşüm binalarında veya mevcut apartmanlarda Eylül 2026
            Yargıtay kararına uygun tek tip profil rengi (Antrasit RAL 7016 / Mat Siyah) ve ücretsiz
            4/5 kat maliki muvafakatname dosyası desteği sunuyoruz.
          </p>
        </div>
      </section>

      {/* Diğer Bahçelievler Mahalleleri İç Linkleme */}
      <section className="mt-10 border-t border-celikpen-border pt-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Bahçelievler Diğer Hizmet Bölgelerimiz
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {SITE_CONFIG.neighborhoods.map((n) => (
            <Link
              prefetch={true}
              key={n.slug}
              href={`/bahcelievler/${n.slug}`}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                n.slug === info.slug
                  ? 'border-celikpen-brand bg-celikpen-brand/10 text-celikpen-brand'
                  : 'border-celikpen-border bg-white text-slate-600 hover:border-celikpen-brand-soft'
              }`}
            >
              {n.name} Cam Balkon
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
