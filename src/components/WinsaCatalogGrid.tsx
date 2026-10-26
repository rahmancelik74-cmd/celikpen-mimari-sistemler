'use client';

import React, { startTransition, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getProductsByBrand,
  type ProductBrand,
  type WinsaProductItem,
} from '../config/winsa-products.config';
import { WinsaSeriesLogo } from './WinsaSeriesLogo';

export type BrandFilterId = 'all' | 'winsa' | 'albert-genau';

interface WinsaCatalogGridProps {
  initialBrand?: BrandFilterId;
}

const WINSA_ORDER = [
  'safir-76',
  'dorado-76',
  'revotech-gold',
  'comfort-slide-plus',
  'panorama-hs-76',
  'lotus-paralel-surme',
  'winstor-monoblok-panjur',
];

const ALBERT_GENAU_ORDER = [
  'panorama-esiksiz-surme-cam-balkon',
  'vera-isicamli-cam-balkon',
  'vera-katlanir-cam-balkon',
  'giyotin-motorlu-silinebilir-cam',
  'kis-bahcesi-sistemleri',
  'bioklimatik-kis-bahcesi-sistemleri',
];

function sortByOrder(items: WinsaProductItem[], order: string[]): WinsaProductItem[] {
  return [...items].sort((a, b) => {
    const ia = order.indexOf(a.slug);
    const ib = order.indexOf(b.slug);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}

export function WinsaCatalogGrid({ initialBrand = 'all' }: WinsaCatalogGridProps) {
  const [selectedBrand, setSelectedBrand] = useState<BrandFilterId>(initialBrand);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const marka = params.get('marka');
    if (marka === 'winsa' || marka === 'albert-genau') {
      setSelectedBrand(marka);
    }
  }, []);

  const winsaProducts = useMemo(
    () => sortByOrder(getProductsByBrand('winsa'), WINSA_ORDER),
    []
  );

  const albertGenauProducts = useMemo(
    () => sortByOrder(getProductsByBrand('albert-genau'), ALBERT_GENAU_ORDER),
    []
  );

  const showWinsa = selectedBrand === 'all' || selectedBrand === 'winsa';
  const showAlbertGenau = selectedBrand === 'all' || selectedBrand === 'albert-genau';

  return (
    <div className="space-y-12">
      {/* Marka Seçici Sekmeler (Winsa & Albert Genau) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Marka Seçimi">
          <button
            type="button"
            role="tab"
            aria-selected={selectedBrand === 'all'}
            onClick={() => startTransition(() => setSelectedBrand('all'))}
            className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition sm:text-[13px] ${
              selectedBrand === 'all'
                ? 'bg-[#1E3A8A] text-white shadow-navy'
                : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A] hover:bg-[#EFF6FF] hover:text-[#1E3A8A]'
            }`}
          >
            Tüm Ürünlerimiz ({winsaProducts.length + albertGenauProducts.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedBrand === 'winsa'}
            onClick={() => startTransition(() => setSelectedBrand('winsa'))}
            className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition sm:text-[13px] ${
              selectedBrand === 'winsa'
                ? 'bg-[#1E3A8A] text-white shadow-navy'
                : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A] hover:bg-[#EFF6FF] hover:text-[#1E3A8A]'
            }`}
          >
            Winsa ({winsaProducts.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedBrand === 'albert-genau'}
            onClick={() => startTransition(() => setSelectedBrand('albert-genau'))}
            className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition sm:text-[13px] ${
              selectedBrand === 'albert-genau'
                ? 'bg-[#1E3A8A] text-white shadow-navy'
                : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A] hover:bg-[#EFF6FF] hover:text-[#1E3A8A]'
            }`}
          >
            Albert Genau ({albertGenauProducts.length})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link
            href="/urunler/winsa"
            prefetch={true}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11.5px] font-bold text-[#1E3A8A] transition hover:border-[#BFDBFE] hover:bg-[#EFF6FF]"
          >
            Winsa Kataloğu →
          </Link>
          <Link
            href="/urunler/albert-genau"
            prefetch={true}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11.5px] font-bold text-[#1E3A8A] transition hover:border-[#BFDBFE] hover:bg-[#EFF6FF]"
          >
            Albert Genau Kataloğu →
          </Link>
        </div>
      </div>

      {/* ============================ WINSA ÜRÜNLERİ ============================ */}
      {showWinsa && (
        <section id="winsa" aria-labelledby="winsa-heading" className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-[#1E3A8A]">
                PVC PENCERE • SÜRME • PANJUR SİSTEMLERİ
              </span>
              <h2
                id="winsa-heading"
                className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl"
              >
                Winsa Ürünlerimiz
              </h2>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Safir 76, Dorado 76, Revotech Gold, Comfort Slide Plus, Panorama HS 76, Lotus ve Winstor
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {winsaProducts.map((prod) => (
              <BrandProductCard key={prod.slug} prod={prod} brandLabel="WINSA" />
            ))}
          </div>
        </section>
      )}

      {/* ============================ ALBERT GENAU ÜRÜNLERİ ============================ */}
      {showAlbertGenau && (
        <section id="albert-genau" aria-labelledby="albert-genau-heading" className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-[#1E3A8A]">
                CAM BALKON • GİYOTİN • KIŞ BAHÇESİ • BİOKLİMATİK PERGOLA
              </span>
              <h2
                id="albert-genau-heading"
                className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl"
              >
                Albert Genau Ürünlerimiz
              </h2>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Isıcamlı Sürme, Isıcamlı Katlanır, Ekonomik Katlanır, Tambalkon Giyotin, Kış Bahçesi ve Bioklimatik Pergola
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albertGenauProducts.map((prod) => (
              <BrandProductCard key={prod.slug} prod={prod} brandLabel="ALBERT GENAU" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BrandProductCard({
  prod,
  brandLabel,
}: {
  prod: WinsaProductItem;
  brandLabel: string;
}) {
  const displayTitle = prod.cardTitle || prod.name;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_14px_34px_-22px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A] hover:shadow-[0_22px_44px_-20px_rgba(30,58,138,0.26)]">
      <Link
        href={`/urunler/${prod.slug}`}
        prefetch={true}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-white"
      >
        <Image
          src={prod.defaultImage}
          alt={`${displayTitle} (${brandLabel}) — Çelikpen ürün görseli`}
          title={`${displayTitle} — ${brandLabel} Mimari Sistemleri`}
          width={640}
          height={400}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="pointer-events-none absolute left-3.5 top-3.5 rounded-lg bg-[#0F172A]/85 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-sky-200 backdrop-blur-sm">
          {brandLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5">
        <WinsaSeriesLogo slug={prod.slug} />
        <h3 className="mt-2 text-[17px] font-black leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
          <Link href={`/urunler/${prod.slug}`} prefetch={true}>
            {displayTitle}
          </Link>
        </h3>

        <div className="mt-4 pt-1">
          <Link
            href={`/urunler/${prod.slug}`}
            prefetch={true}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] px-4 py-3 text-xs font-extrabold text-white shadow-navy transition-all hover:bg-[#1D4ED8]"
          >
            <span>Ürün Detayı</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
