'use client';

import React, { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  WINSA_PRODUCTS,
  type WinsaProductItem,
} from '../config/winsa-products.config';

export type CatalogFilterId =
  | 'all'
  | 'pvc-pencere-kapi'
  | 'winsa-surme'
  | 'vera-cam-balkon'
  | 'giyotin-bioklimatik'
  | 'winstor-panjur-sineklik';

interface FilterTabDef {
  id: CatalogFilterId;
  label: string;
  queryAliases: string[];
  matcher: (prod: WinsaProductItem) => boolean;
}

const FILTER_TABS: FilterTabDef[] = [
  {
    id: 'all',
    label: 'Tümü',
    queryAliases: ['all', 'tumu'],
    matcher: () => true,
  },
  {
    id: 'pvc-pencere-kapi',
    label: 'Winsa PVC Pencere & Kapı',
    queryAliases: ['pencere-ve-kapi-sistemleri', 'pvc-pencere-kapi', 'renk-dunyasi'],
    matcher: (p) =>
      p.categorySlug === 'pencere-ve-kapi-sistemleri' || p.categorySlug === 'renk-dunyasi',
  },
  {
    id: 'winsa-surme',
    label: 'Winsa Sürme (Hebeschiebe & Comfort Slide)',
    queryAliases: ['surme-sistemler', 'winsa-surme'],
    matcher: (p) => p.categorySlug === 'surme-sistemler',
  },
  {
    id: 'vera-cam-balkon',
    label: 'Winsa Vera Cam Balkon Serisi',
    queryAliases: ['cam-balkon-sistemleri', 'vera-cam-balkon'],
    matcher: (p) =>
      p.categorySlug === 'cam-balkon-sistemleri' &&
      !p.slug.includes('giyotin') &&
      !p.slug.includes('bioklimatik'),
  },
  {
    id: 'giyotin-bioklimatik',
    label: 'Giyotin & Bioklimatik Sistemler',
    queryAliases: ['giyotin-bioklimatik', 'kis-bahcesi'],
    matcher: (p) =>
      p.slug.includes('giyotin') || p.slug.includes('bioklimatik'),
  },
  {
    id: 'winstor-panjur-sineklik',
    label: 'Winstor Panjur & Sineklik',
    queryAliases: [
      'panjur-ve-kepenk-sistemleri',
      'donanim-sistemleri',
      'winstor-panjur-sineklik',
    ],
    matcher: (p) =>
      p.categorySlug === 'panjur-ve-kepenk-sistemleri' ||
      p.categorySlug === 'donanim-sistemleri',
  },
];

export function WinsaCatalogGrid() {
  const [selectedTab, setSelectedTab] = useState<CatalogFilterId>('all');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const kat = params.get('kategori');
    if (!kat) return;
    const matched = FILTER_TABS.find((t) => t.queryAliases.includes(kat));
    if (matched) {
      setSelectedTab(matched.id);
    }
  }, []);

  const activeTabDef = useMemo(
    () => FILTER_TABS.find((t) => t.id === selectedTab) ?? FILTER_TABS[0],
    [selectedTab]
  );

  const filteredProducts = useMemo(() => {
    return WINSA_PRODUCTS.filter((p) => {
      const matchesCat = activeTabDef.matcher(p);
      const q = deferredQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technicalSpecs.profilGenisligi.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeTabDef, deferredQuery]);

  return (
    <div className="space-y-7">
      {/* Kategori Sekmeleri ve Hızlı Arama */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Ürün Kategorileri">
            {FILTER_TABS.map((tab) => {
              const count = WINSA_PRODUCTS.filter(tab.matcher).length;
              const isSelected = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => startTransition(() => setSelectedTab(tab.id))}
                  className={`rounded-lg px-3.5 py-2 text-[11.5px] font-bold transition ${
                    isSelected
                      ? 'bg-[#1E3A8A] text-white shadow-navy'
                      : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A] hover:bg-[#EFF6FF] hover:text-[#1E3A8A]'
                  }`}
                >
                  {tab.label}{' '}
                  <span
                    className={`ml-1 text-[10px] ${
                      isSelected ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full lg:w-64">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Seri ara (Revotech Gold, Dorado 76, Vera)..."
              className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2 text-xs font-medium text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#1E3A8A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BFDBFE]"
            />
          </div>
        </div>
      </div>

      {/* GüngörPen Ürünlerimiz Vitrin Mimarisi + Teknik Tablolu Ürün Kartları */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((prod) => (
          <article
            key={prod.slug}
            className="hover-lift group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_16px_38px_-28px_rgba(15,23,42,0.38)] transition-all duration-300 hover:border-[#1E3A8A]"
          >
            {/* L-Bracket Köşe Vurgusu */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 z-20 h-3.5 w-3.5 border-t-2 border-l-2 border-[#1E3A8A] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 h-3.5 w-3.5 border-b-2 border-r-2 border-[#1E3A8A] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />

            <div>
              {/* Ürün Görseli */}
              <Link
                href={`/urunler/${prod.slug}`}
                prefetch={true}
                className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-slate-100 bg-slate-100"
              >
                <Image
                  src={prod.defaultImage}
                  alt={`${prod.name} — Çelikpen ürün ve uygulama görseli`}
                  width={700}
                  height={440}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-md bg-[#0F172A]/85 px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-sky-200 backdrop-blur-sm">
                  {prod.code}
                </span>
                <CompactSpecBadges
                  uw={prod.technicalSpecs.isiYalitimiUw}
                  db={prod.technicalSpecs.sesYalitimiDb}
                />
              </Link>

              {/* Kategori & Başlık */}
              <div className="mt-4">
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1E3A8A]">
                  {prod.category}
                </span>
                <Link href={`/urunler/${prod.slug}`} prefetch={true}>
                  <h2 className="mt-1 text-[16px] font-black leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
                    {prod.name}
                  </h2>
                </Link>
                <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-slate-600">
                  {prod.shortDescription}
                </p>
              </div>

              {/* Teknik Özellikler Tablosu */}
              <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-[#F8FAFC] px-3.5 py-2 text-[11px]">
                <div className="flex items-center justify-between gap-2 py-1.5">
                  <dt className="font-semibold text-slate-500">Profil Genişliği</dt>
                  <dd className="truncate font-bold text-[#0F172A]">
                    {prod.technicalSpecs.profilGenisligi}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-1.5">
                  <dt className="font-semibold text-slate-500">Odacık Sayısı</dt>
                  <dd className="truncate font-bold text-[#0F172A]">
                    {prod.technicalSpecs.odacikSayisi}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-1.5">
                  <dt className="font-semibold text-slate-500">Isı İletim (Uw)</dt>
                  <dd className="truncate font-bold text-[#1E3A8A]">
                    {prod.technicalSpecs.isiYalitimiUw}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-1.5">
                  <dt className="font-semibold text-slate-500">Ses Yalıtımı (dB)</dt>
                  <dd className="truncate font-bold text-[#0F172A]">
                    {prod.technicalSpecs.sesYalitimiDb}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2 py-1.5">
                  <dt className="font-semibold text-slate-500">Cam Kalınlığı</dt>
                  <dd className="truncate font-bold text-[#0F172A]">
                    {prod.technicalSpecs.camKalinligi}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Aksiyon Butonları */}
            <div className="mt-4 flex items-center gap-2 pt-2">
              <Link
                href={`/urunler/${prod.slug}`}
                prefetch={true}
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#1E3A8A] px-3.5 py-2.5 text-[11.5px] font-bold text-white shadow-navy transition hover:bg-[#1D4ED8]"
              >
                Teknik Detay →
              </Link>
              <Link
                href={
                  prod.pricingSystemId
                    ? `/fiyat-hesapla?seri=${prod.pricingSystemId}`
                    : '/fiyat-hesapla'
                }
                prefetch={true}
                className="inline-flex items-center justify-center rounded-xl border border-[#1E3A8A]/30 bg-[#EFF6FF] px-3.5 py-2.5 text-[11.5px] font-bold text-[#1E3A8A] transition hover:border-[#1E3A8A] hover:bg-[#DBEAFE]"
              >
                Fiyat Hesapla
              </Link>
            </div>
          </article>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-sm font-semibold text-[#0F172A]">Aramanıza uygun seri bulunamadı.</p>
            <p className="mt-1 text-xs text-slate-500">
              Farklı bir kategori seçebilir veya arama kelimenizi kısaltabilirsiniz.
            </p>
            <button
              type="button"
              onClick={() => {
                startTransition(() => {
                  setSelectedTab('all');
                  setQuery('');
                });
              }}
              className="mt-4 rounded-lg bg-[#1E3A8A] px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Tüm ürünleri göster
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function shortUw(raw: string): string | null {
  const match = raw.match(/U[wf]\s*=\s*([\d.,]+)/i);
  return match ? match[1] : null;
}

function shortDb(raw: string): string | null {
  const match = raw.match(/([+-]?)\s*(\d{2})\s*dB/i);
  if (!match) return null;
  return `${match[1] === '+' ? '+' : '-'}${match[2]} dB`;
}

function CompactSpecBadges({ uw, db }: { uw: string; db: string }) {
  const uwValue = shortUw(uw);
  const dbValue = shortDb(db);
  if (!uwValue && !dbValue) return null;
  return (
    <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1">
      {uwValue && (
        <span className="whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 text-[9.5px] font-bold leading-4 text-[#0F172A] shadow-sm backdrop-blur">
          Uw: {uwValue}
        </span>
      )}
      {dbValue && (
        <span className="whitespace-nowrap rounded-full bg-[#1E3A8A]/95 px-2 py-0.5 text-[9.5px] font-bold leading-4 text-white shadow-sm backdrop-blur">
          {dbValue}
        </span>
      )}
    </div>
  );
}
