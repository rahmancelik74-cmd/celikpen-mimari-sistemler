'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type SystemKey = 'katlanir' | 'giyotin' | 'bioklimatik';
type AtmosphereMode = 'gunduz' | 'gece';

interface SystemPreset {
  key: SystemKey;
  label: string;
  tag: string;
  title: string;
  image: string;
  href: string;
  badges: [string, string, string];
}

const SYSTEM_PRESETS: Record<SystemKey, SystemPreset> = {
  katlanir: {
    key: 'katlanir',
    label: 'Katlanır Cam',
    tag: '4+20+4 Argonlu Isıcam & Panoramik Katlanır',
    title: 'Kesintisiz Panoramik Manzara',
    image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    href: '/urunler/vera-isicamli-cam-balkon',
    badges: ['%65 Isı Yalıtımı', '38 dB Akustik Konfor', 'TSE EN 12150 Güvenlik'],
  },
  giyotin: {
    key: 'giyotin',
    label: 'Giyotin',
    tag: 'Somfy Motorlu Silinebilir Hareketli Küpeşte',
    title: 'Tek Tuşla Dikey Açılan Cam Cephe',
    image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
    href: '/urunler/giyotin-motorlu-silinebilir-cam',
    badges: ['%65 Isı Yalıtımı', '38 dB Akustik Konfor', 'TSE EN 12150 Güvenlik'],
  },
  bioklimatik: {
    key: 'bioklimatik',
    label: 'Bioklimatik',
    tag: 'Eksenel Döner Alüminyum Lamel & LED Tavan',
    title: 'Dört Mevsim İklimlendirilebilir Teras',
    image: '/images/siyavuspasa-surme-cam-balkon.jpg',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    badges: ['%65 Isı Yalıtımı', '38 dB Akustik Konfor', 'TSE EN 12150 Güvenlik'],
  },
};

export const ArchitecturalVirtualTour: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<SystemKey>('katlanir');
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>('gunduz');

  const current = SYSTEM_PRESETS[selectedSystem];
  const isNight = atmosphere === 'gece';

  return (
    <section
      id="sanal-tur"
      className="relative overflow-hidden bg-[#0F172A] py-16 text-white sm:py-20"
    >
      {/* Dekoratif Köşe Çizgileri */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-6 h-12 w-12 border-l-2 border-t-2 border-[#1E3A8A]/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-6 h-12 w-12 border-r-2 border-b-2 border-[#1E3A8A]/50"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Üst Başlık ve İnteraktif Seçiciler */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#93C5FD]">
              <span className="h-[2px] w-6 bg-[#1E3A8A]" />
              <span>SANAL TUR &amp; MİMARİ DENEYİM</span>
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Mekanınızın Atmosferini Canlı Deneyimleyin
            </h2>
          </div>

          {/* Çift Kontrollü Seçici Barı: [Katlanır Cam / Giyotin / Bioklimatik] + [Gündüz Modu / Gece Modu] */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sistem Seçici */}
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
              {(['katlanir', 'giyotin', 'bioklimatik'] as SystemKey[]).map((key) => {
                const item = SYSTEM_PRESETS[key];
                const active = selectedSystem === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSystem(key)}
                    className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
                      active
                        ? 'bg-[#1E3A8A] text-white shadow-md'
                        : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Gündüz / Gece Modu Seçici */}
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setAtmosphere('gunduz')}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
                  !isNight
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span>☀</span>
                <span>Gündüz Modu</span>
              </button>
              <button
                type="button"
                onClick={() => setAtmosphere('gece')}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
                  isNight
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span>☾</span>
                <span>Gece Modu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ana Panoramik Sahne Vitrini */}
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/15 bg-slate-950 shadow-2xl">
          {/* 4 Köşe Mimari L-Bracket Dekorasyonu */}
          <span className="pointer-events-none absolute top-4 left-4 z-20 h-6 w-6 border-t-2 border-l-2 border-[#1E3A8A]" />
          <span className="pointer-events-none absolute top-4 right-4 z-20 h-6 w-6 border-t-2 border-r-2 border-[#1E3A8A]" />
          <span className="pointer-events-none absolute bottom-4 left-4 z-20 h-6 w-6 border-b-2 border-l-2 border-[#1E3A8A]" />
          <span className="pointer-events-none absolute bottom-4 right-4 z-20 h-6 w-6 border-b-2 border-r-2 border-[#1E3A8A]" />

          <div className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.title}
              className={`h-full w-full object-cover transition-all duration-700 ${
                isNight
                  ? 'scale-[1.02] brightness-[0.58] contrast-125 saturate-110'
                  : 'scale-100 brightness-105 contrast-100'
              }`}
            />

            {/* Gece / Gündüz Atmosfer Işık Katmanı */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                isNight
                  ? 'bg-gradient-to-tr from-[#04091A]/85 via-[#0F172A]/45 to-amber-500/20 opacity-100'
                  : 'bg-gradient-to-t from-slate-950/75 via-slate-900/15 to-sky-200/15 opacity-100'
              }`}
            />

            {/* Gece Modunda LED Ambiyans Efekti */}
            {isNight && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-12 top-8 h-1.5 rounded-full bg-amber-300/80 shadow-[0_0_35px_12px_rgba(251,191,36,0.45)] transition-all duration-700"
              />
            )}

            {/* Alt Overlay Bilgi ve 3 İkon Rozeti */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-between gap-4 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-6 sm:p-8 lg:flex-row lg:items-end">
              <div>
                <span className="inline-block rounded-full bg-[#1E3A8A] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                  {current.tag}
                </span>
                <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  {current.title}
                </h3>
              </div>

              {/* 3 Keskin İkon Rozeti + İncele Butonu */}
              <div className="flex flex-wrap items-center gap-2.5">
                {current.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-extrabold text-white backdrop-blur-md"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{badge}</span>
                  </span>
                ))}

                <Link

                  prefetch={true}

                  href={current.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#1D4ED8]"
                >
                  <span>SİSTEMİ İNCELE</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
