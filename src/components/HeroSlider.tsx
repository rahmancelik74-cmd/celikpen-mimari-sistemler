'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface Scene3Story {
  id: string;
  location: string;
  system: string;
  title: string;
  metrics: string;
  href: string;
}

const SCENE_3_STORIES: Scene3Story[] = [
  {
    id: 'story-01',
    location: 'Mimari Villa & Rezidans Cephe',
    system: 'Revotech Gold 84mm & 4+20+4 Argonlu Isıcam',
    title: 'Dört Mevsim Kesintisiz Panoramik Manzara',
    metrics: 'Uw: 0.79 W/m²K • -45 dB Akustik',
    href: '/urunler/revotech-gold',
  },
  {
    id: 'story-02',
    location: 'Modern Teras & Bahçe Geçişleri',
    system: 'Panorama HS 76 Kaldır-Sür (Hebeschiebe)',
    title: 'Tek Parmakla Açılan 300 kg Panoramik Camlar',
    metrics: 'Sınıf 9A Sızdırmazlık • 19 mm Alt Eşik',
    href: '/urunler/panorama-hs-76',
  },
  {
    id: 'story-03',
    location: 'Kış Bahçesi & Hareketli Küpeşte',
    system: 'Dorado 76 Antrasit & Somfy Motorlu Giyotin',
    title: 'Uzaktan Kumandalı Konfor ve Antrasit Estetik',
    metrics: '10 Yıl Garanti • TSE EN 12150 Temperli',
    href: '/urunler/giyotin-motorlu-silinebilir-cam',
  },
];

export function HeroSlider() {
  const [activeScene, setActiveScene] = useState<number>(0);
  const [storyIndex, setStoryIndex] = useState<number>(0);

  const activeSceneRef = useRef<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const isLockedRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lockWheel = useCallback((duration = 750) => {
    isLockedRef.current = true;
    if (lockTimerRef.current) {
      clearTimeout(lockTimerRef.current);
    }
    lockTimerRef.current = setTimeout(() => {
      isLockedRef.current = false;
    }, duration);
  }, []);

  const setSceneSynchronized = useCallback(
    (nextScene: number, cooldownMs = 750) => {
      const clamped = Math.max(0, Math.min(2, nextScene));
      activeSceneRef.current = clamped;
      setActiveScene(clamped);
      lockWheel(cooldownMs);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('celikpen-hero-scene', { detail: { scene: clamped } })
        );
      }
    },
    [lockWheel]
  );

  const scrollBelowHero = useCallback(() => {
    if (typeof window === 'undefined') return;
    const heroHeight = containerRef.current?.offsetHeight || window.innerHeight;
    window.scrollTo({
      top: heroHeight - 80,
      behavior: 'smooth',
    });
  }, []);

  const goToScene = useCallback(
    (targetScene: number) => {
      if (isLockedRef.current) return;
      if (targetScene > 2) {
        scrollBelowHero();
        return;
      }
      if (typeof window !== 'undefined' && window.scrollY > 4) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setSceneSynchronized(targetScene, 750);
    },
    [scrollBelowHero, setSceneSynchronized]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (typeof window === 'undefined') return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const current = activeSceneRef.current;
      const deltaY = e.deltaY;

      if (Math.abs(deltaY) < 10) return;

      if (deltaY > 0) {
        if (scrollTop < 40) {
          if (current < 2) {
            e.preventDefault();
            if (!isLockedRef.current) {
              if (scrollTop > 0) {
                window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              }
              setSceneSynchronized(current + 1, 750);
            }
            return;
          }

          if (isLockedRef.current) {
            e.preventDefault();
            return;
          }
        }
      } else if (deltaY < 0) {
        if (scrollTop <= 10) {
          if (current > 0) {
            e.preventDefault();
            if (!isLockedRef.current) {
              setSceneSynchronized(current - 1, 750);
            }
          } else if (isLockedRef.current) {
            e.preventDefault();
          }
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [setSceneSynchronized]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (typeof window === 'undefined') return;
      if (window.scrollY > 40) return;
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(
          (e.target as HTMLElement)?.tagName || ''
        )
      ) {
        return;
      }

      const current = activeSceneRef.current;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (current < 2) {
          e.preventDefault();
          if (!isLockedRef.current) {
            setSceneSynchronized(current + 1, 750);
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (window.scrollY <= 10 && current > 0) {
          e.preventDefault();
          if (!isLockedRef.current) {
            setSceneSynchronized(current - 1, 750);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSceneSynchronized]);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartYRef.current = e.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartYRef.current === null) return;
    if (typeof window !== 'undefined' && window.scrollY > 40) return;
    const endY = e.changedTouches[0]?.clientY ?? touchStartYRef.current;
    const diff = touchStartYRef.current - endY;
    touchStartYRef.current = null;

    if (Math.abs(diff) < 42 || isLockedRef.current) return;
    const current = activeSceneRef.current;

    if (diff > 0) {
      if (current < 2) {
        setSceneSynchronized(current + 1, 750);
      } else {
        scrollBelowHero();
      }
    } else {
      if (current > 0) {
        setSceneSynchronized(current - 1, 750);
      }
    }
  };

  const currentStory = SCENE_3_STORIES[storyIndex];

  const handlePrevStory = () => {
    setStoryIndex((prev) => (prev - 1 + SCENE_3_STORIES.length) % SCENE_3_STORIES.length);
  };

  const handleNextStory = () => {
    setStoryIndex((prev) => (prev + 1) % SCENE_3_STORIES.length);
  };

  return (
    <section
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Çelikpen 3 Aşamalı Tam Ekran Mimari Vitrin"
      className="relative h-screen h-[100dvh] min-h-[600px] w-full select-none overflow-hidden bg-[#070E1E] sm:min-h-[640px]"
    >
      {/* 3 SAHNELİ DİKEY SAHNE KONTEYNERİ — Tam 0%, -100% ve -200% GPU Dönüşümü */}
      <div
        className="h-full w-full will-change-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translate3d(0, -${activeScene * 100}%, 0)`,
          transitionProperty: 'transform',
        }}
      >
        {/* =====================================================================
            SAHNE 1 (Index 0):
            Ferah gökyüzü + "Hayata / Çelikpen'den / Bak" + [SANAL TUR]
           ===================================================================== */}
        <div className="relative h-full w-full overflow-hidden">
          <div
            className={`absolute inset-0 transition-transform duration-[1400ms] ease-out ${
              activeScene === 0 ? 'scale-100' : 'scale-105'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/kocasinan-isicamli-cam-balkon-hero.jpg"
              alt="Hayata Çelikpen'den Bak — Modern taş ve antrasit cam cepheli mimari villa"
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
            {/* Üst 160px Aydınlık Gündüz Gökyüzü Atmosferi (Şeffaf Header'daki #0B1560 Menü Netliği İçin) */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#EBF2F7]/92 via-[#DCE8F2]/60 to-transparent" />
            {/* Sol Metin Kontrast Katmanı */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-900/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 pt-28 sm:px-10">
            <div className="ml-6 sm:ml-14 md:ml-20">
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm min-[390px]:px-3.5 min-[390px]:text-[10px] min-[390px]:tracking-[0.18em]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981]" aria-hidden="true" />
                <span className="truncate">Kocasinan Merkez Üretim • Bahçelievler</span>
              </div>
              <h1 className="text-[2.25rem] font-black leading-[1.06] tracking-tight text-white min-[390px]:text-5xl sm:text-6xl md:text-7xl lg:text-[84px]">
                <span className="block drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
                  Hayata
                </span>
                <span className="relative mt-1 inline-block">
                  <span
                    className={`absolute bottom-[6%] left-0 h-[42%] bg-[#D91B24] transition-all duration-700 ease-out ${
                      activeScene === 0 ? 'w-full' : 'w-0'
                    }`}
                  />
                  <span className="relative z-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
                    Çelikpen&apos;den
                  </span>
                </span>
                <span className="mt-1 block drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
                  Bak
                </span>
              </h1>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#sanal-tur"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-purple transition-all hover:-translate-y-0.5 hover:bg-[#6D28D9] min-[420px]:w-auto"
                >
                  <span>SANAL TUR</span>
                </a>
                <Link
                  href="/urunler"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 min-[420px]:w-auto"
                >
                  <span>SİSTEMLERİ KEŞFET</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            SAHNE 2 (Index 1): "Çelikpen'den / Ücretsiz / Keşif" + [KEŞİF İSTE] [TEKLİF AL]
           ===================================================================== */}
        <div className="relative h-full w-full overflow-hidden">
          <div
            className={`absolute inset-0 transition-transform duration-[1400ms] ease-out ${
              activeScene === 1 ? 'scale-100' : 'scale-105'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bahcelievler-giyotin-bioklimatik-sistem.jpg"
              alt="Çelikpen'den ücretsiz keşif — lüks teras ve mimari cam sistemleri"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040B1A]/90 via-[#081838]/70 to-[#040B1A]/45" />
            <svg
              viewBox="0 0 400 260"
              className="pointer-events-none absolute right-10 top-24 h-56 w-80 opacity-80"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0B1560" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="280" cy="80" r="75" fill="url(#moonGlow)" />
              <path
                d="M290 45 A32 32 0 1 0 322 95 A26 26 0 1 1 290 45 Z"
                fill="#FEF3C7"
                opacity="0.9"
              />
            </svg>
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 pt-28 sm:px-10">
            <div className="ml-6 sm:ml-14 md:ml-20">
              <h2 className="text-[2rem] font-black leading-[1.08] tracking-tight text-white min-[360px]:text-4xl sm:text-6xl md:text-7xl">
                <span className="relative mt-1 inline-block">
                  <span
                    className={`absolute bottom-[6%] left-0 h-[42%] bg-[#D91B24] transition-all duration-700 ease-out ${
                      activeScene === 1 ? 'w-full' : 'w-0'
                    }`}
                  />
                  <span className="relative z-10 drop-shadow-md">Çelikpen&apos;den</span>
                </span>
                <span className="mt-1 block drop-shadow-md">Ücretsiz</span>
                <span className="mt-1 block drop-shadow-md">Keşif</span>
              </h2>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/iletisim?form=kesif"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#7C3AED] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-purple transition-all hover:-translate-y-0.5 hover:bg-[#6D28D9] min-[420px]:w-auto"
                >
                  KEŞİF İSTE
                </Link>
                <Link
                  href="/iletisim?form=kesif"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-white/45 bg-white/10 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 min-[420px]:w-auto"
                >
                  TEKLİF AL
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            SAHNE 3 (Index 2): "Çelikpen ile Yaşandı — Panoramik Yaşam Alanları" + [<] [>]
           ===================================================================== */}
        <div className="relative h-full w-full overflow-hidden">
          <div
            className={`absolute inset-0 transition-transform duration-[1400ms] ease-out ${
              activeScene === 2 ? 'scale-100' : 'scale-105'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/siyavuspasa-surme-cam-balkon.jpg"
              alt="Çelikpen ile Yaşandı — panoramik yaşam alanları"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050C1C]/90 via-[#0A1936]/70 to-[#050C1C]/50" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 pt-28 sm:px-10">
            <div className="ml-6 w-full max-w-2xl sm:ml-14 md:ml-20">
              <h2 className="text-[2rem] font-black leading-[1.08] tracking-tight text-white min-[360px]:text-4xl sm:text-6xl md:text-7xl">
                <span className="relative inline-block">
                  <span
                    className={`absolute bottom-[6%] left-0 h-[42%] bg-[#D91B24] transition-all duration-700 ease-out ${
                      activeScene === 2 ? 'w-full' : 'w-0'
                    }`}
                  />
                  <span className="relative z-10 drop-shadow-md">Çelikpen</span>
                </span>{' '}
                <span className="drop-shadow-md">ile Yaşandı</span>
              </h2>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-500 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-[#DDD6FE] sm:text-xs">
                  <span className="min-w-0 break-words">{currentStory.location}</span>
                  <span className="max-w-full rounded-full bg-[#D91B24] px-2.5 py-1 text-[9px] font-black leading-tight text-white sm:px-3 sm:text-[11px]">
                    {currentStory.metrics}
                  </span>
                </div>
                <h3 className="mt-2.5 text-base font-extrabold leading-snug text-white sm:text-xl">
                  {currentStory.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-3 text-[11px] sm:text-xs">
                  <span className="min-w-0 break-words font-semibold text-slate-200">
                    {currentStory.system}
                  </span>
                  <Link
                    href={currentStory.href}
                    className="inline-flex min-h-[36px] items-center rounded-full bg-[#7C3AED] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-[#6D28D9] sm:px-5 sm:text-[11px]"
                  >
                    İNCELE →
                  </Link>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevStory}
                  aria-label="Önceki Mimari Hikaye"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 text-base font-light text-white transition-all hover:border-white hover:bg-white/15"
                >
                  &#10094;
                </button>
                <button
                  type="button"
                  onClick={handleNextStory}
                  aria-label="Sonraki Mimari Hikaye"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 text-base font-light text-white transition-all hover:border-white hover:bg-white/15"
                >
                  &#10095;
                </button>
                <span className="ml-2 text-xs font-bold tracking-widest text-white/75">
                  0{storyIndex + 1} / 0{SCENE_3_STORIES.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOL DİKEY 3 SEGMENTLİ İLERLEME ÇUBUĞU */}
      <div
        className="absolute left-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3 sm:left-8 md:left-12"
        aria-label="Sahne Seçici"
      >
        {[0, 1, 2].map((idx) => {
          const isActive = activeScene === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => goToScene(idx)}
              aria-label={`${idx + 1}. Sahneye Geç`}
              className="group py-1 px-2 focus:outline-none"
            >
              <span
                className={`block transition-all duration-500 ${
                  isActive
                    ? 'h-12 w-[4px] bg-[#D91B24] shadow-[0_0_12px_#D91B24]'
                    : 'h-10 w-[3px] bg-white/45 group-hover:bg-white/80'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* ALT MERKEZ "AŞAĞI KAYDIR" ANİMASYONLU MOUSE İNDİKATÖRÜ */}
      <button
        type="button"
        onClick={() => {
          if (activeScene < 2) {
            goToScene(activeScene + 1);
          } else {
            scrollBelowHero();
          }
        }}
        className="group absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/90 transition-opacity hover:text-white focus:outline-none"
      >
        <span className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/85 p-1 group-hover:border-[#D91B24]">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white group-hover:bg-[#D91B24]" />
        </span>
        <span className="text-[11px] font-semibold tracking-wider text-white/90">
          Aşağı Kaydır
        </span>
      </button>
    </section>
  );
}
