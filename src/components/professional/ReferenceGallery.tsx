'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCms } from '../CmsProvider';

export interface ReferencePhotoItem {
  id: string;
  image: string;
  title: string;
  district: string;
  system: string;
  category: string;
}

export const REFERENCE_PHOTOS: ReferencePhotoItem[] = [
  {
    id: 'ref-new-1',
    image: '/images/references/cekmekoy-magaza-dograma-kepenk.jpg',
    title: 'Çekmeköy Ticari Mağaza Vitrini Doğrama & Kepenk Sistemi',
    district: 'Çekmeköy, İstanbul',
    system: 'Aldoks/Termal Alüminyum Vitrin Doğrama, Temperli Güvenlik Camı ve Motorlu Kepenk',
    category: 'PVC & Alüminyum Doğrama',
  },
  {
    id: 'ref-new-2',
    image: '/images/references/yesilkoy-bahce-kati-surme-cam-balkon.jpg',
    title: 'Yeşilköy Bahçe Katı Antrasit Sürme Cam Balkon Uygulaması',
    district: 'Yeşilköy, Bakırköy / İstanbul',
    system: 'RAL 7016 Antrasit Sabit Alt Küpeşteli, Füme Temperli Sürme Cam Balkon',
    category: 'Sürme & Isıcamlı Cam Balkon',
  },
  {
    id: 'ref-new-3',
    image: '/images/references/yesilkoy-teras-kis-bahcesi-katlanir-cam.jpg',
    title: 'Yeşilköy Teras Kış Bahçesi ve Katlanır Cam Balkon',
    district: 'Yeşilköy, Bakırköy / İstanbul',
    system: 'Cam Tavanlı Teras Kış Bahçesi, Isıcamlı Katlanır Sistem ve Vasistas Havalandırma',
    category: 'Kış Bahçesi Sistemleri',
  },
  {
    id: 'ref-new-4',
    image: '/images/references/yesilkoy-bronz-aluminyum-giris-korkuluk.jpg',
    title: 'Yeşilköy Apartman Girişi Bronz Alüminyum Korkuluk & Kapı',
    district: 'Yeşilköy, Bakırköy / İstanbul',
    system: 'Bronz Eloksal Paslanmaz Alüminyum Giriş Kapısı ve Merdiven Küpeşte Sistemi',
    category: 'Alüminyum Küpeşte & Korkuluk',
  },
  {
    id: 'ref-new-5',
    image: '/images/references/yesilkoy-antrasit-bahce-duvar-korkuluk.jpg',
    title: 'Yeşilköy Peyzaj Çevresi Antrasit Alüminyum Bahçe Korkuluğu',
    district: 'Yeşilköy, Bakırköy / İstanbul',
    system: 'Elektrostatik Fırın Boyalı Siyah/Antrasit Dış Mekan Bahçe Duvar Korkuluğu',
    category: 'Alüminyum Küpeşte & Korkuluk',
  },
  {
    id: 'ref-new-6',
    image: '/images/references/yesilkoy-rezidans-cam-korkuluk-cephe.jpg',
    title: 'Yeşilköy Modern Rezidans Cam Balkon Korkuluk & Cephe Doğrama',
    district: 'Yeşilköy, Bakırköy / İstanbul',
    system: 'Lamine Temperli Camlı Alüminyum Balkon Korkulukları ve Cephe Doğrama Sistemleri',
    category: 'Alüminyum Küpeşte & Korkuluk',
  },
  {
    id: 'ref-new-7',
    image: '/images/references/bahcelievler-kocasinan-antrasit-pvc-dograma.jpg',
    title: 'Bahçelievler Kocasinan Antrasit PVC & Cephe Doğrama Montajı',
    district: 'Kocasinan, Bahçelievler / İstanbul',
    system: 'Antrasit Gri Çok Odacıklı Isı Yalıtımlı PVC Doğrama ve Çift Açılım Pencere Sistemi',
    category: 'PVC & Alüminyum Doğrama',
  },
  {
    id: 'ref-new-8',
    image: '/images/references/yesilkoy-villa-kis-bahcesi-surme-cam.jpg',
    title: 'Yeşilköy Villa Bahçesi Dört Mevsim Kış Bahçesi Sistemi',
    district: 'Yeşilköy, Bakırköy / İstanbul',
    system: 'Yüksek Yalıtımlı Cam Tavan, Eşikli Sürme Cam ve Kilitli Kapı Kış Bahçesi',
    category: 'Kış Bahçesi Sistemleri',
  },
  {
    id: 'ref-new-9',
    image: '/images/references/yesilkoy-park-apt-panjur-balkon-korkuluk.jpg',
    title: 'Yeşilköy Park Apartmanı Motorlu Panjur & Balkon Korkulukları',
    district: 'Yeşilköy, Bakırköy / İstanbul',
    system: 'Poliüretan Dolgulu Antrasit Otomatik Panjur ve Özel Tasarım Alüminyum Balkon Korkuluğu',
    category: 'Panjur & Kepenk Sistemleri',
  },
  {
    id: 'ref-new-10',
    image: '/images/references/yesilkoy-fume-veranda-cam-balkon-kapama.jpg',
    title: 'Yeşilköy Bahçe Katı Füme Cam Balkon ve Veranda Kapama',
    district: 'Yeşilköy, Bakırköy / İstanbul',
    system: 'Antrasit Alüminyum Karkas, Füme Temperli Cam ve Sabit Alt Panelli Veranda Kapama',
    category: 'Sürme & Isıcamlı Cam Balkon',
  },
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

function SearchZoomIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      <path d="M11 8v6M8 11h6" strokeLinecap="round" />
    </svg>
  );
}

export function ReferenceGallery({
  photos: customPhotos,
  showFilters = false,
}: {
  photos?: ReferencePhotoItem[];
  showFilters?: boolean;
}) {
  const { cms } = useCms();
  const allPhotos: ReferencePhotoItem[] =
    customPhotos && customPhotos.length > 0
      ? customPhotos
      : cms.references && cms.references.length > 0
        ? cms.references
        : REFERENCE_PHOTOS;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = showFilters
    ? Array.from(new Set(allPhotos.map((p) => p.category)))
    : [];

  const photos = activeCategory
    ? allPhotos.filter((p) => p.category === activeCategory)
    : allPhotos;

  const selectedPhoto: ReferencePhotoItem | null =
    selectedIndex === null ? null : photos[selectedIndex] ?? null;

  const goNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current + 1) % photos.length
    );
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, closeLightbox, goNext, goPrev]);

  return (
    <div className="bg-[#F8FAFC] pb-16">
      {/* ============================ DARK NAVY HERO HEADER ============================ */}
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
                Bahçelievler, Bakırköy, Ataköy, Florya, Yeşilköy ve Başakşehir'de tamamlanan cam
                balkon, PVC doğrama, kaldır-sür ve bioklimatik pergola projelerinden seçkiler.
                Her kare, kendi montaj ekibimiz tarafından teslim edilen gerçek bir uygulamadır.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '22+', label: 'Öne çıkan proje' },
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

      {/* ============================ CATEGORY FILTER PILLS ============================ */}
      {showFilters && categories.length > 1 && (
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === null
                  ? 'bg-[#1E3A8A] text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
              }`}
            >
              Tümü ({allPhotos.length})
            </button>
            {categories.map((cat) => {
              const count = allPhotos.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? 'bg-[#1E3A8A] text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================ PURE PHOTO GALLERY GRID ============================ */}
      <section
        className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8"
        aria-label="Referans Fotoğraf Galerisi"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <div
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
              className="group cursor-pointer rounded-2xl border-2 border-[#1E3A8A]/20 bg-white p-2 shadow-md transition-all duration-300 hover:border-[#1E3A8A] hover:shadow-xl hover:shadow-blue-950/15"
            >
              <div className="relative h-[310px] w-full overflow-hidden rounded-xl ring-1 ring-slate-200 group-hover:ring-[#2563EB]/40 sm:h-[340px]">
                <Image
                  src={photo.image}
                  alt={`${photo.title} — Çelikpen referans uygulaması`}
                  fill
                  unoptimized={photo.image.startsWith('data:')}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-[#0F172A]/0 transition-all duration-300 group-hover:bg-[#0F172A]/30" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#1E3A8A] opacity-0 shadow-lg transition-all duration-300 scale-90 group-hover:opacity-100 group-hover:scale-100">
                    <SearchZoomIcon />
                  </span>
                </div>
              </div>
            </div>
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

      {/* ============================ FULLSCREEN LIGHTBOX MODAL ============================ */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0F172A]/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Fotoğraf büyütme"
          onClick={closeLightbox}
        >
          {/* Close button (top-right) */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Galeriyi kapat"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25"
          >
            <CloseIcon />
          </button>

          {/* Image counter (top-center) */}
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-sm">
            {selectedIndex !== null ? selectedIndex + 1 : 1} / {photos.length}
          </div>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Önceki fotoğraf"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0F172A]/70 text-white backdrop-blur-sm transition hover:bg-[#1E3A8A] sm:left-6"
          >
            <ArrowIcon direction="left" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Sonraki fotoğraf"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0F172A]/70 text-white backdrop-blur-sm transition hover:bg-[#1E3A8A] sm:right-6"
          >
            <ArrowIcon direction="right" />
          </button>

          {/* Main photo */}
          <div onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedPhoto.image}
              alt={`${selectedPhoto.title} — Çelikpen referans uygulaması`}
              width={1400}
              height={980}
              unoptimized={selectedPhoto.image.startsWith('data:')}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="max-h-[85vh] max-w-5xl w-auto h-auto rounded-xl border-2 border-white/90 object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
