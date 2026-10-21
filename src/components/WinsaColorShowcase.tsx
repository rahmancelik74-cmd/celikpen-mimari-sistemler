'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WINSA_CONTENT_CONFIG } from '../config/winsa-content.config';

export function WinsaColorShowcase() {
  const [selectedColorId, setSelectedColorId] = useState<string>(
    WINSA_CONTENT_CONFIG.colorPalette[0].id
  );
  const [selectedGlassId, setSelectedGlassId] = useState<
    'seffaf' | 'fume' | 'bronz' | 'alt_buzlu'
  >('seffaf');

  const activeColor =
    WINSA_CONTENT_CONFIG.colorPalette.find((c) => c.id === selectedColorId) ||
    WINSA_CONTENT_CONFIG.colorPalette[0];

  const activeGlass =
    WINSA_CONTENT_CONFIG.glassOptionsPreview.find((g) => g.id === selectedGlassId) ||
    WINSA_CONTENT_CONFIG.glassOptionsPreview[0];

  return (
    <section
      id="renk-kartelasi"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12"
      aria-labelledby="renk-kartelasi-baslik"
    >
      <div className="rounded-3xl border border-celikpen-border bg-celikpen-subtle p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-celikpen-border pb-6">
          <div>
            <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
              Çelikpen Renk Dünyası • QUALICOAT & Renolit UV Laminasyon
            </span>
            <h2
              id="renk-kartelasi-baslik"
              className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl"
            >
              Mimari Renk & Yüzey Kartelası (Canlı Cephe Kombinasyonu)
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Apartman dış cephe emsalinize uygun alüminyum/PVC profil rengini ve Şişecam temperli
              cam tonunu seçerek balkon görünümünü test edin.
            </p>
          </div>
          <Link
            href="/fiyat-hesapla"
            className="rounded-lg bg-celikpen-brand px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-celikpen-brand-soft"
          >
            Seçtiğiniz Renkle m² Fiyat Hesapla →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Sol: Profil Rengi ve Cam Tonu Seçiciler */}
          <div className="space-y-6 lg:col-span-7">
            {/* 1. Profil Rengi Kartelası */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                1. Profil Rengi & Yüzey Dokusu Seçin ({WINSA_CONTENT_CONFIG.colorPalette.length}{' '}
                Standart Kartela)
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {WINSA_CONTENT_CONFIG.colorPalette.map((swatch) => {
                  const isSelected = swatch.id === activeColor.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedColorId(swatch.id)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                        isSelected
                          ? 'border-celikpen-brand bg-white ring-2 ring-celikpen-brand/20 shadow-sm'
                          : 'border-celikpen-border bg-white/70 hover:border-slate-400 hover:bg-white'
                      }`}
                    >
                      <span
                        className="h-9 w-9 shrink-0 rounded-lg border border-black/15 shadow-inner"
                        style={{
                          background: `linear-gradient(135deg, ${swatch.hexPrimary} 0%, ${swatch.hexSecondary} 100%)`,
                        }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-xs font-bold text-slate-900">
                          {swatch.name}
                        </div>
                        <div className="truncate text-[10px] font-semibold text-slate-500">
                          {swatch.ralOrCode}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Şişecam Temperli Cam Tonu Seçici */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                2. Şişecam Temperli / Isıcam Konfor Tonu Seçin
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {WINSA_CONTENT_CONFIG.glassOptionsPreview.map((glass) => {
                  const isSelected = glass.id === activeGlass.id;
                  return (
                    <button
                      key={glass.id}
                      type="button"
                      onClick={() => setSelectedGlassId(glass.id)}
                      className={`rounded-xl border p-3 text-left transition ${
                        isSelected
                          ? 'border-celikpen-brand-soft bg-white ring-2 ring-celikpen-brand-soft/20 shadow-sm'
                          : 'border-celikpen-border bg-white/70 hover:border-slate-400 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{glass.name}</div>
                      <div className="mt-1 text-[10px] font-semibold text-celikpen-brand-soft">
                        {glass.lightTransmittance}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seçili Kombinasyon Teknik Özeti */}
            <div className="rounded-2xl border border-celikpen-border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded bg-celikpen-brand/10 px-2.5 py-0.5 text-[11px] font-bold text-celikpen-brand">
                  {activeColor.category} • {activeColor.ralOrCode}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700">
                  ✓ {activeColor.uvResistanceClass}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                <strong className="text-slate-900">Cephe Uyumu:</strong>{' '}
                {activeColor.architecturalUsage}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                <strong className="text-slate-900">Cam Performansı ({activeGlass.name}):</strong>{' '}
                {activeGlass.description} ({activeGlass.solarFactor} • {activeGlass.privacyLevel})
              </p>
            </div>
          </div>

          {/* Sağ: Canlı Mimari Profil & Cam Kesit Simülasyonu */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-celikpen-border bg-white p-5 shadow-md">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  Canlı Cephe & Kanat Kesit Önizlemesi
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  Yargıtay 4/5 Emsal Uyumlu
                </span>
              </div>

              {/* Mimari Çerçeve Görselleştirmesi */}
              <div
                className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl p-3.5 shadow-inner transition-colors duration-300"
                style={{
                  background: `linear-gradient(135deg, ${activeColor.hexPrimary} 0%, ${activeColor.hexSecondary} 100%)`,
                }}
              >
                {/* İç Kanatlar (4 Kanatlı Panoramik Balkon Görünümü) */}
                <div className="grid h-full w-full grid-cols-4 gap-2 rounded-lg bg-slate-100/90 p-2">
                  {[1, 2, 3, 4].map((paneNo) => (
                    <div
                      key={paneNo}
                      className="relative flex flex-col overflow-hidden rounded border-4 shadow-sm transition-colors duration-300"
                      style={{
                        borderColor: activeColor.hexPrimary,
                      }}
                    >
                      {/* Üst Cam Alanı */}
                      <div
                        className="relative flex-1"
                        style={{
                          background: activeGlass.overlayCss,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
                        <span className="absolute left-1.5 top-1.5 rounded bg-black/35 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          K-{paneNo}
                        </span>
                      </div>

                      {/* Ara Kayıt / Korkuluk Hizası */}
                      <div
                        className="h-2 w-full"
                        style={{ backgroundColor: activeColor.hexSecondary }}
                      />

                      {/* Alt Cam Alanı (%40 Kumlama veya Seçili Cam) */}
                      <div
                        className="h-[38%] w-full"
                        style={{
                          background: activeGlass.bottomOverlayCss || activeGlass.overlayCss,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Alt Damlalık Kasa & Su Tahliye Rozeti */}
                <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] font-semibold text-white/90">
                  <span>{activeColor.surfaceFinish}</span>
                  <span>5° Eğimli Damlalık Kasa</span>
                </div>
              </div>

              {/* Alt Bilgi Satırı */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[11px]">
                <div className="rounded-lg border border-celikpen-border bg-celikpen-subtle p-2">
                  <span className="block text-slate-500">Seçilen Profil</span>
                  <strong className="text-slate-900">{activeColor.name}</strong>
                </div>
                <div className="rounded-lg border border-celikpen-border bg-celikpen-subtle p-2">
                  <span className="block text-slate-500">Seçilen Cam</span>
                  <strong className="text-celikpen-brand">{activeGlass.name}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
