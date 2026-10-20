'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GALLERY_ITEMS, GalleryItem } from '../config/gallery.config';

const CONTENT = {
  filterLabel: 'Kategoriye Göre Filtrele',
  categories: [
    { id: 'all', label: 'Tümü' },
    { id: 'katlanir', label: 'Katlanır Sistem' },
    { id: 'isicam', label: 'Isıcamlı Seri' },
    { id: 'surme', label: 'Eşiksiz Sürme' },
    { id: 'giyotin', label: 'Motorlu Giyotin' },
    { id: 'kis-bahcesi', label: 'Kış Bahçesi' },
  ] as const,
  emptyTitle: 'Yakında: Saha galerimiz hazırlanıyor',
  emptyDesc:
    'Kocasinan, Şirinevler, Siyavuşpaşa ve Soğanlı mahallelerinde tamamladığımız montaj fotoğrafları yüksek çözünürlüklü olarak yüklenmektedir. Bu süreçte canlı 2D simülatörümüzden balkon cephenizi önizleyebilirsiniz.',
  ctaSimulator: '2D Canlı Balkon Simülatörünü Dene →',
};

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | GalleryItem['category']>('all');

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div>
      {/* Kategori Filtre Chip'leri */}
      <div
        role="group"
        aria-label={CONTENT.filterLabel}
        className="mb-6 flex flex-wrap items-center gap-2"
      >
        {CONTENT.categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={isActive}
              className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition ${
                isActive
                  ? 'border-celikpen-brand bg-celikpen-brand text-white'
                  : 'border-celikpen-border bg-white text-slate-600 hover:border-celikpen-brand-soft'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Boş Durum veya Masonry Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-celikpen-border bg-celikpen-subtle p-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">{CONTENT.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-600">
            {CONTENT.emptyDesc}
          </p>
          <Link
            href="/fiyat-hesapla"
            className="mt-5 inline-block rounded-lg bg-celikpen-cta px-5 py-2.5 text-xs font-bold text-white shadow transition hover:bg-rose-500"
          >
            {CONTENT.ctaSimulator}
          </Link>
        </div>
      ) : (
        <div className="columns-2 gap-4 md:columns-3">
          {filteredItems.map((item) => (
            <figure
              key={item.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-celikpen-border bg-white shadow-sm"
            >
              <Image
                src={item.src || '/placeholder.svg'}
                alt={item.alt}
                width={800}
                height={600}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="p-3 text-xs text-slate-600">
                <span className="font-bold text-celikpen-brand-soft">{item.neighborhood}</span> —{' '}
                {item.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
