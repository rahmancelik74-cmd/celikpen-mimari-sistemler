'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface ReferencePhotoItem {
  id: string;
  image: string;
  title: string;
  district: string;
  system: string;
  category: string;
}

/**
 * 12 Örnek Referans Fotoğrafı — Kendi proje fotoğraflarınızla değiştirmek için
 * aşağıdaki `image` yollarını (`/images/references/ref-1.jpg` ... `ref-12.jpg`) güncellemeniz yeterlidir.
 */
export const REFERENCE_PHOTOS: ReferencePhotoItem[] = [
  {
    id: 'ref-1',
    image: '/images/references/ref-1.jpg',
    title: 'Bahçelievler — Isıcamlı Cam Balkon',
    district: 'Bahçelievler / Kocasinan Merkez',
    system: 'Winsa Vera Termal 4+20+4 Argonlu Isıcam',
    category: 'Isıcamlı Cam Balkon',
  },
  {
    id: 'ref-2',
    image: '/images/references/ref-2.jpg',
    title: 'Ataköy — Bioklimatik Kış Bahçesi',
    district: 'Bakırköy / Ataköy',
    system: 'Winsa Vela Bioklimatik Pergola & Cam Cephe',
    category: 'Kış Bahçesi & Pergola',
  },
  {
    id: 'ref-3',
    image: '/images/references/ref-3.jpg',
    title: 'Bakırköy — Winsa Dorado 76 PVC',
    district: 'Bakırköy / Merkez',
    system: 'Winsa Dorado 76 Antrasit PVC Doğrama',
    category: 'PVC Pencere & Kapı',
  },
  {
    id: 'ref-4',
    image: '/images/references/ref-4.jpg',
    title: 'Florya — Motorlu Giyotin Sistem',
    district: 'Bakırköy / Florya',
    system: 'Winsa Vera Vertical Uzaktan Kumandalı Giyotin',
    category: 'Giyotin Cam Sistemi',
  },
  {
    id: 'ref-5',
    image: '/images/references/ref-5.jpg',
    title: 'Yeşilköy — Panorama HS 76 Kaldır-Sür',
    district: 'Bakırköy / Yeşilköy',
    system: 'Winsa Panorama HS 76 Hebeschiebe Sürme',
    category: 'Sürme Sistemler',
  },
  {
    id: 'ref-6',
    image: '/images/references/ref-6.jpg',
    title: 'Siyavuşpaşa — Köşe L-Balkon Katlanır Cam',
    district: 'Bahçelievler / Siyavuşpaşa',
    system: 'Winsa Vera Pro 10 mm Temperli Katlanır Sistem',
    category: 'Katlanır Cam Balkon',
  },
  {
    id: 'ref-7',
    image: '/images/references/ref-7.jpg',
    title: 'Başakşehir — Eşiksiz Sürme Cam Balkon',
    district: 'Başakşehir',
    system: 'Winsa Vera Slide Eşiksiz Paslanmaz Rulmanlı Sürme',
    category: 'Sürme Cam Balkon',
  },
  {
    id: 'ref-8',
    image: '/images/references/ref-8.jpg',
    title: 'Şirinevler — Revotech Gold 84 mm PVC',
    district: 'Bahçelievler / Şirinevler',
    system: 'Winsa Revotech Gold 7 Odacıklı 3 Contalı Sistem',
    category: 'PVC Pencere & Kapı',
  },
  {
    id: 'ref-9',
    image: '/images/references/ref-9.jpg',
    title: 'Kocasinan — Cam Tavanlı Kış Bahçesi',
    district: 'Bahçelievler / Kocasinan Merkez',
    system: 'Lamine Isıcam Tavan & Vera Termal Katlanır Cephe',
    category: 'Kış Bahçesi Sistemleri',
  },
  {
    id: 'ref-10',
    image: '/images/references/ref-10.jpg',
    title: 'Yenibosna — Teras & Kafe Giyotin Cephe',
    district: 'Bahçelievler / Yenibosna',
    system: 'Somfy Motorlu Giyotin & Bioklimatik Tavan',
    category: 'Giyotin & Pergola',
  },
  {
    id: 'ref-11',
    image: '/images/references/ref-11.jpg',
    title: 'Soğanlı — Winstor Monoblok Panjur & PVC',
    district: 'Bahçelievler / Soğanlı',
    system: 'Winsa Safir 76 & Winstor Motorlu Panjur',
    category: 'Panjur & PVC Doğrama',
  },
  {
    id: 'ref-12',
    image: '/images/references/ref-12.jpg',
    title: 'Çobançeşme — Comfort Slide Plus Sürme',
    district: 'Bahçelievler / Çobançeşme',
    system: 'Winsa Comfort Slide Plus Vakum Contalı Sürme',
    category: 'Sürme Sistemler',
  },
];

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-5 w-5"
    >
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ReferenceGallery({
  photos = REFERENCE_PHOTOS,
}: {
  photos?: ReferencePhotoItem[];
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto: ReferencePhotoItem | null =
    selectedIndex === null ? null : photos[selectedIndex] ?? null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length
        );
      }
      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % photos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, photos.length]);

  return (
    <div className="bg-[#F8FAFC] pb-16">
      {/* ============================ DARK NAVY HERO HEADER (PRESERVED) ============================ */}
      <section className="relative overflow-hidden bg-[#0F172A] pt-10 pb-14 text-white sm:pt-14 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,197,253,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.15) 1px, transparent 1px)',
            backgroundSize: '58px 58px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#1E3A8A] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#D91B24]/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10.5px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Ana Sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/profesyoneller" className="transition-colors hover:text-white">
              Profesyoneller
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-sky-200">Referanslar</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24]" aria-hidden="true" />
                Projelerimiz &amp; Uygulama Galerisi
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px]">
                İstanbul cephelerinde{' '}
                <span className="text-sky-300">30 yıllık saha imzası.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[12.5px] leading-6 text-slate-300 sm:text-[13px]">
                Bahçelievler, Bakırköy, Ataköy, Florya, Yeşilköy ve Başakşehir’de tamamlanan cam
                balkon, PVC doğrama, kaldır-sür ve bioklimatik pergola projelerinden seçkiler.
                Her kare, kendi montaj ekibimiz tarafından teslim edilen gerçek bir uygulamadır.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '12+', label: 'Öne çıkan proje' },
                { value: '30', label: 'Yıllık tecrübe' },
                { value: '10 Yıl', label: 'Sistem garantisi' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center backdrop-blur-sm"
                >
                  <div className="text-lg font-black text-white">{stat.value}</div>
                  <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 12-PHOTO REFERENCE GALLERY GRID ============================ */}
      <section className="container-shell pt-10 sm:pt-12" aria-label="Referans Fotoğraf Galerisi">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.id}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${photo.title} fotoğrafını tam ekran görüntüle`}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A] hover:shadow-[0_26px_52px_-26px_rgba(30,58,138,0.45)]"
            >
              <Image
                src={photo.image}
                alt={`${photo.title} — Çelikpen referans uygulaması`}
                width={1000}
                height={700}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Subtle bottom gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/25 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Top-left category badge & top-right zoom button */}
              <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                <span className="rounded-full border border-white/20 bg-[#0F172A]/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-200 backdrop-blur-md">
                  {photo.category}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1E3A8A] shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#1E3A8A] group-hover:text-white">
                  <ZoomIcon />
                </span>
              </div>

              {/* Bottom caption */}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-sky-300">
                  {photo.district}
                </p>
                <h2 className="mt-1 text-base font-extrabold leading-snug tracking-tight text-white sm:text-[17px]">
                  {photo.title}
                </h2>
                <p className="mt-1 text-[11.5px] font-medium text-slate-300">{photo.system}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1E3A8A]">
              Benzer bir proje mi planlıyorsunuz?
            </div>
            <p className="mt-1 text-[12.5px] leading-5 text-slate-600">
              Cephenizi yerinde ücretsiz ölçelim; sistem, cam ve renk alternatiflerini birlikte netleştirelim.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/iletisim?form=kesif"
              className="rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-[11.5px] font-bold text-white shadow-navy transition hover:bg-[#1D4ED8]"
            >
              Ücretsiz Keşif İste
            </Link>
            <Link
              href="/fiyat-hesapla"
              className="rounded-lg border border-[#1E3A8A]/30 bg-white px-5 py-2.5 text-[11.5px] font-bold text-[#1E3A8A] transition hover:border-[#1E3A8A] hover:bg-white"
            >
              Fiyat Hesapla
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ FULL-SCREEN LIGHTBOX MODAL ============================ */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#020617]/90 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reference-lightbox-title"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0F172A] text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0F172A] px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-[#1E3A8A] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-200">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {selectedIndex !== null ? selectedIndex + 1 : 1} / {photos.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Galeriyi kapat"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Modal Photo Stage */}
            <div className="relative flex items-center justify-center bg-slate-950">
              <Image
                src={selectedPhoto.image}
                alt={`${selectedPhoto.title} — Çelikpen referans uygulaması`}
                width={1200}
                height={840}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="max-h-[68vh] w-full object-contain"
              />
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((current) =>
                    current === null ? null : (current - 1 + photos.length) % photos.length
                  )
                }
                aria-label="Önceki fotoğraf"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0F172A]/80 text-white backdrop-blur-sm transition hover:bg-[#1E3A8A]"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((current) =>
                    current === null ? null : (current + 1) % photos.length
                  )
                }
                aria-label="Sonraki fotoğraf"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0F172A]/80 text-white backdrop-blur-sm transition hover:bg-[#1E3A8A]"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            {/* Modal Footer Info */}
            <div className="flex flex-col justify-between gap-4 border-t border-white/10 bg-[#0F172A] px-5 py-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-sky-300">
                  {selectedPhoto.district}
                </p>
                <h2 id="reference-lightbox-title" className="mt-0.5 text-lg font-extrabold text-white">
                  {selectedPhoto.title}
                </h2>
                <p className="mt-0.5 text-xs text-slate-300">{selectedPhoto.system}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/iletisim?form=kesif"
                  className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
                >
                  Bu Sistem İçin Keşif İste →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
