'use client';

import React, { startTransition, useDeferredValue, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  WINSA_CATEGORIES,
  WINSA_PRODUCTS,
  type WinsaCategorySlug,
} from '../config/winsa-products.config';

export function WinsaCatalogGrid() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | WinsaCategorySlug>('all');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const filteredProducts = useMemo(() => {
    return WINSA_PRODUCTS.filter((p) => {
      const matchesCat =
        selectedCategory === 'all' ? true : p.categorySlug === selectedCategory;
      const q = deferredQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technicalSpecs.profilGenisligi.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [deferredQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Kompakt Kategori Sekmeleri ve Hızlı Arama */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Ürün Kategorileri">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => startTransition(() => setSelectedCategory('all'))}
              className={`rounded-lg px-3.5 py-1.5 text-[11.5px] font-bold transition ${
                selectedCategory === 'all'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
              }`}
            >
              Tümü ({WINSA_PRODUCTS.length})
            </button>

            {WINSA_CATEGORIES.map((cat) => {
              const count = WINSA_PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => startTransition(() => setSelectedCategory(cat.slug))}
                  className={`rounded-lg px-3.5 py-1.5 text-[11.5px] font-bold transition ${
                    isSelected
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
                  }`}
                >
                  {cat.shortName} ({count})
                </button>
              );
            })}
          </div>

          <div className="w-full sm:w-56">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Seri ara (Dorado 76, Vera)..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#1E3A8A] focus:outline-none focus:ring-2 focus:ring-[#BFDBFE]"
            />
          </div>
        </div>
      </div>

      {/* Minimalist L-Köşe (`┌ ┘`) Ürün Kartları Grid — Sıfır Metin Karmaşası */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((prod) => (
          <Link
            key={prod.slug}
            href={`/urunler/${prod.slug}`}
            prefetch={true}
            className="hover-lift group relative flex flex-col justify-between overflow-hidden rounded-card border border-slate-200/90 bg-white p-4 shadow-xs transition-colors hover:border-[#BFDBFE]"
          >
            {/* Animasyonlu Köşe L-Bracket (`┌ ┘`) Çerçevesi */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 z-20 h-3.5 w-3.5 border-t-2 border-l-2 border-[#1E3A8A] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 h-3.5 w-3.5 border-b-2 border-r-2 border-[#1E3A8A] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />

            {/* Gerçek uygulama fotoğrafı + üst köşede en fazla 2 kompakt teknik rozet */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
              <Image
                src={prod.defaultImage}
                alt={`${prod.name} — Çelikpen Bahçelievler uygulama fotoğrafı`}
                width={640}
                height={400}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <CompactSpecBadges
                uw={prod.technicalSpecs.isiYalitimiUw}
                db={prod.technicalSpecs.sesYalitimiDb}
              />
            </div>

            {/* Kategori Etiketi & Ürün Başlığı */}
            <div className="mt-3.5 flex items-center justify-between gap-2 pt-0.5">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A]">
                  {prod.category}
                </span>
                <h2 className="mt-0.5 text-base font-black text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
                  {prod.name}
                </h2>
              </div>

                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-xs font-bold text-[#1D4ED8] transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-[#1E3A8A] group-hover:text-white">
                  →
                </span>
              </div>
            </Link>
          ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full rounded-card border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-sm font-semibold text-[#0F172A]">Aramanıza uygun seri bulunamadı.</p>
            <p className="mt-1 text-xs text-slate-500">
              Farklı bir kategori seçebilir veya arama kelimenizi kısaltabilirsiniz.
            </p>
            <button
              type="button"
              onClick={() => {
                startTransition(() => {
                  setSelectedCategory('all');
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

/** "Uw = 0.79 W/(m²K) / Uf = 0.92 ..." → "0.79"; sayısal değer yoksa null. */
function shortUw(raw: string): string | null {
  const match = raw.match(/U[wf]\s*=\s*([\d.,]+)/i);
  return match ? match[1] : null;
}

/** "-46 dB (EN ISO 140-3 Sınıf 5)" → "46 dB"; "+10 dB Ek..." → "+10 dB". */
function shortDb(raw: string): string | null {
  const match = raw.match(/([+-]?)\s*(\d{2})\s*dB/i);
  if (!match) return null;
  return `${match[1] === '+' ? '+' : ''}${match[2]} dB`;
}

/** Fotoğrafı %90+ açık bırakan, tek satırlık en fazla 2 rozet. */
function CompactSpecBadges({ uw, db }: { uw: string; db: string }) {
  const uwValue = shortUw(uw);
  const dbValue = shortDb(db);
  if (!uwValue && !dbValue) return null;
  return (
    <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1">
      {uwValue && (
        <span className="whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[9.5px] font-bold leading-4 text-[#0F172A] shadow-sm backdrop-blur">
          Uw: {uwValue}
        </span>
      )}
      {dbValue && (
        <span className="whitespace-nowrap rounded-full bg-[#0F172A]/80 px-2 py-0.5 text-[9.5px] font-bold leading-4 text-white shadow-sm backdrop-blur">
          {dbValue}
        </span>
      )}
    </div>
  );
}
