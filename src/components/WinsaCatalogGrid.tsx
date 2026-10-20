'use client';

import React, { useState, useMemo } from 'react';
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

  const filteredProducts = useMemo(() => {
    return WINSA_PRODUCTS.filter((p) => {
      const matchesCat =
        selectedCategory === 'all' ? true : p.categorySlug === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technicalSpecs.profilGenisligi.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="space-y-6">
      {/* Kompakt Kategori Sekmeleri ve Hızlı Arama */}
      <div className="glass-card rounded-2xl p-3.5 shadow-2xs sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Ürün Kategorileri">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-3.5 py-1.5 text-[11.5px] font-bold transition ${
                selectedCategory === 'all'
                  ? 'bg-[#0B1560] text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-[#0B1560] hover:border-[#D91B24] hover:text-[#D91B24]'
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
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`rounded-lg px-3.5 py-1.5 text-[11.5px] font-bold transition ${
                    isSelected
                      ? 'bg-[#0B1560] text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-[#0B1560] hover:border-[#D91B24] hover:text-[#D91B24]'
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
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 focus:border-[#0B1560] focus:outline-none"
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
            className="hover-lift group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs"
          >
            {/* Animasyonlu Köşe L-Bracket (`┌ ┘`) Çerçevesi */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 z-20 h-3.5 w-3.5 border-t-2 border-l-2 border-[#D91B24] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 h-3.5 w-3.5 border-b-2 border-r-2 border-[#D91B24] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />

            {/* Görsel + Köşede 2 Minimal Glassmorphic Spec Pill */}
            <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-100">
              <Image
                src={prod.defaultImage}
                alt={prod.name}
                width={560}
                height={360}
                className="aspect-[15/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1560]/35 via-transparent to-transparent" />

              {/* Köşede 2 Minimal Glassmorphic Spec Pill (Uw | dB) */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-md border border-white/30 bg-slate-950/65 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                    Uw: {prod.technicalSpecs.isiYalitimiUw}
                  </span>
                  <span className="rounded-md border border-white/30 bg-slate-950/65 px-2 py-0.5 text-[10px] font-bold text-sky-200 backdrop-blur-md">
                    {prod.technicalSpecs.sesYalitimiDb}
                  </span>
                </div>
                <span className="rounded-md bg-[#0B1560]/90 px-2 py-0.5 text-[9.5px] font-extrabold text-white">
                  {prod.technicalSpecs.profilGenisligi}
                </span>
              </div>
            </div>

            {/* Kategori Etiketi & Ürün Başlığı */}
            <div className="mt-3.5 flex items-center justify-between gap-2 pt-0.5">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#D91B24]">
                  {prod.category}
                </span>
                <h2 className="mt-0.5 text-base font-black text-[#0B1560] transition-colors group-hover:text-[#D91B24]">
                  {prod.name}
                </h2>
              </div>

              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-[#0B1560] transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-[#D91B24] group-hover:text-white">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
