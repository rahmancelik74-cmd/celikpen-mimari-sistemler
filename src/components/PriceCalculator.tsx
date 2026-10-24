'use client';

import React, { useState, useMemo } from 'react';
import {
  CELIKPEN_PRICING_CONFIG,
  BalconyGeometryId,
  SystemSeriesId,
  GlassOptionId,
  ProfileColorId,
  calculateBalconyQuote,
} from '../config/pricing.config';
import { SITE_CONFIG } from '../config/site.config';

export interface PriceCalculatorProps {
  defaultNeighborhood?: string;
  defaultSystemId?: SystemSeriesId;
}

const WIDTH_PRESETS_M = [1.5, 2.25, 2.6, 3.4, 4.25] as const;
const HEIGHT_PRESETS_M = [1.6, 1.9, 2.2, 2.6] as const;

/**
 * Metre veya santimetre girilen ondalıklı ölçüleri santimetreye çevirir.
 * "2,45", "2.45 m", "245.5 cm" ve "245,5" gibi tüm yaygın yazımları destekler.
 * 20 ve altındaki değerler metre, üzerindeki değerler santimetre kabul edilir.
 */
function parseMeasureToCm(raw: string): number | null {
  const normalized = raw
    .toLocaleLowerCase('tr-TR')
    .replace(/cm|m/g, '')
    .replace(/\s/g, '')
    .replace(',', '.');

  if (!normalized || !/^\d*\.?\d+$/.test(normalized)) return null;

  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value <= 0) return null;

  const cm = value <= 20 ? value * 100 : value;
  return Number(cm.toFixed(2));
}

function formatMeters(cm: number): string {
  return (cm / 100).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
}

function formatArea(area: number): string {
  return area.toFixed(2).replace('.', ',');
}

function clampWidth(cm: number): number {
  return Number(Math.min(2000, Math.max(50, cm)).toFixed(2));
}

function clampHeight(cm: number): number {
  return Number(Math.min(500, Math.max(100, cm)).toFixed(2));
}

export function PriceCalculator({
  defaultNeighborhood = 'Kocasinan Merkez',
  defaultSystemId = 'vbs_isicam',
}: PriceCalculatorProps = {}) {
  const [geometry, setGeometry] = useState<BalconyGeometryId>('duz');
  const [widthsCm, setWidthsCm] = useState<[number, number, number]>([420, 160, 160]);
  const [heightCm, setHeightCm] = useState<number>(190);
  const [widthDrafts, setWidthDrafts] = useState<[string, string, string]>([
    '4,20',
    '1,60',
    '1,60',
  ]);
  const [heightDraft, setHeightDraft] = useState<string>('1,90');
  const [systemId, setSystemId] = useState<SystemSeriesId>(defaultSystemId);
  const [glassId, setGlassId] = useState<GlassOptionId>('seffaf');
  const [profileId, setProfileId] = useState<ProfileColorId>('antrasit');
  const [includeCatScreen, setIncludeCatScreen] = useState<boolean>(false);
  const [includePleatedBlind, setIncludePleatedBlind] = useState<boolean>(false);
  const [isBulkBuilding, setIsBulkBuilding] = useState<boolean>(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>(defaultNeighborhood);

  const quote = useMemo(
    () =>
      calculateBalconyQuote({
        geometry,
        widthsCm,
        heightCm,
        systemId,
        glassId,
        profileId,
        includeCatScreen,
        includePleatedBlind,
        isBulkBuilding,
      }),
    [
      geometry,
      widthsCm,
      heightCm,
      systemId,
      glassId,
      profileId,
      includeCatScreen,
      includePleatedBlind,
      isBulkBuilding,
    ]
  );

  const selectedSystem = CELIKPEN_PRICING_CONFIG.systems[systemId];
  const selectedGlass = CELIKPEN_PRICING_CONFIG.glassOptions[glassId];
  const selectedProfile = CELIKPEN_PRICING_CONFIG.profileColors[profileId];
  const activeFronts = geometry === 'duz' ? 1 : geometry === 'l_tipi' ? 2 : 3;
  const exactTotalWidthCm = widthsCm
    .slice(0, activeFronts)
    .reduce((total, width) => total + width, 0);
  const exactHeightCm = Math.max(100, heightCm);

  const updateWidthDraft = (index: 0 | 1 | 2, raw: string) => {
    setWidthDrafts((prev) => {
      const next = [...prev] as [string, string, string];
      next[index] = raw;
      return next;
    });

    const parsed = parseMeasureToCm(raw);
    if (parsed === null) return;
    const safeWidth = clampWidth(parsed);
    setWidthsCm((prev) => {
      const next = [...prev] as [number, number, number];
      next[index] = safeWidth;
      return next;
    });
  };

  const applyWidthPreset = (meters: number) => {
    const cm = Math.round(meters * 100);
    setWidthsCm((prev) => [cm, prev[1], prev[2]]);
    setWidthDrafts((prev) => [formatMeters(cm), prev[1], prev[2]]);
  };

  const updateWidthSlider = (index: 0 | 1 | 2, meters: number) => {
    const cm = Number((meters * 100).toFixed(2));
    setWidthsCm((prev) => {
      const next = [...prev] as [number, number, number];
      next[index] = cm;
      return next;
    });
    setWidthDrafts((prev) => {
      const next = [...prev] as [string, string, string];
      next[index] = formatMeters(cm);
      return next;
    });
  };

  const updateHeightDraft = (raw: string) => {
    setHeightDraft(raw);
    const parsed = parseMeasureToCm(raw);
    if (parsed === null) return;
    setHeightCm(clampHeight(parsed));
  };

  const applyHeightPreset = (meters: number) => {
    const cm = Math.round(meters * 100);
    setHeightCm(cm);
    setHeightDraft(formatMeters(cm));
  };

  const updateHeightSlider = (meters: number) => {
    const cm = Number((meters * 100).toFixed(2));
    setHeightCm(cm);
    setHeightDraft(formatMeters(cm));
  };

  const glassStyle = useMemo(() => {
    switch (glassId) {
      case 'fume':
        return {
          topFill: 'rgba(51, 65, 85, 0.42)',
          bottomFill: 'rgba(51, 65, 85, 0.55)',
          label: 'Füme Reflekte',
        };
      case 'bronz':
        return {
          topFill: 'rgba(146, 64, 14, 0.32)',
          bottomFill: 'rgba(146, 64, 14, 0.45)',
          label: 'Bronz Güneş Kontrol',
        };
      case 'alt_buzlu':
        return {
          topFill: 'rgba(2, 132, 199, 0.16)',
          bottomFill: 'rgba(203, 213, 225, 0.85)',
          label: 'Alt %40 Kumlama Buzlu',
        };
      default:
        return {
          topFill: 'rgba(2, 132, 199, 0.16)',
          bottomFill: 'rgba(2, 132, 199, 0.22)',
          label: 'Ultra Şeffaf',
        };
    }
  }, [glassId]);

  const whatsappUrl = useMemo(() => {
    const text = [
      `Merhaba Çelikpen (${SITE_CONFIG.headquartersNeighborhood}), web sitenizdeki Canlı Hesaplama aracından fiyat teklifi ve ücretsiz keşif randevusu rica ediyorum:`,
      `• Mahalle: ${selectedNeighborhood}`,
      `• Balkon Tipi: ${geometry.toUpperCase()} (${formatMeters(exactTotalWidthCm)} m En x ${formatMeters(exactHeightCm)} m Yükseklik = ${formatArea(quote.billableAreaM2)} m²)`,
      `• Seçilen Sistem: ${selectedSystem.code} - ${selectedSystem.name} (${quote.effectiveUnitPricePerM2.toLocaleString('tr-TR')} TL/m²)`,
      `• Cam & Profil: ${selectedGlass.name} / ${selectedProfile.name}`,
      `• Ek Donanım: ${includeCatScreen ? 'Kedi Sinekliği Var, ' : ''}${includePleatedBlind ? 'Plise Perde Var, ' : ''}${isBulkBuilding ? '5+ Daire Toplu Bina (%15 İndirim)' : 'Bireysel Daire'}`,
      `• Hesaplanan Net Tutar: ${quote.netTotal.toLocaleString('tr-TR')} TL`,
    ].join('\n');
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }, [
    selectedNeighborhood,
    geometry,
    quote,
    exactTotalWidthCm,
    exactHeightCm,
    selectedSystem,
    selectedGlass,
    selectedProfile,
    includeCatScreen,
    includePleatedBlind,
    isBulkBuilding,
  ]);

  const previewPanels = Math.min(12, Math.max(3, quote.panelCountEstimate));

  return (
    <div className="rounded-2xl border border-celikpen-border bg-white p-6 text-slate-700 shadow-lg">
      <div className="mb-4 flex items-center justify-between border-b border-celikpen-border pb-3">
        <div>
          <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-0.5 text-xs font-bold text-celikpen-brand">
            Çelikpen Kocasinan Fabrika Satış
          </span>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Canlı m² & Net Fiyat Hesaplama Motoru
          </h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Net Alan</div>
          <div className="text-lg font-extrabold text-celikpen-brand-soft">
            {formatArea(quote.billableAreaM2)} m²
          </div>
        </div>
      </div>

      {/* 2D Canlı Mimari Cephe Simülatörü (SVG - Açık Tema Uyumlu) */}
      <div className="mb-4 rounded-xl border border-celikpen-border bg-celikpen-subtle p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-900">
            2D Canlı Cephe Simülasyonu ({quote.panelCountEstimate} Kanat • {selectedSystem.code})
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded border border-celikpen-border bg-white px-2 py-0.5 text-slate-700">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full border border-slate-400"
                style={{ backgroundColor: selectedProfile.hex }}
              />
              {selectedProfile.name}
            </span>
            <span className="rounded bg-celikpen-brand/10 px-2 py-0.5 font-semibold text-celikpen-brand">
              {glassStyle.label}
            </span>
          </div>
        </div>
        <div className="aspect-[16/5] w-full overflow-hidden rounded-lg border border-celikpen-border bg-gradient-to-b from-sky-50 to-slate-100 p-2">
          <svg
            viewBox="0 0 600 170"
            className="h-full w-full"
            role="img"
            aria-label={`${selectedSystem.name} ${selectedProfile.name} ${selectedGlass.name} 2D Balkon Önizlemesi`}
          >
            {/* Üst ve Alt Kasa Ray Profilleri */}
            <rect x="12" y="10" width="576" height="9" rx="2" fill={selectedProfile.hex} />
            <rect x="12" y="145" width="576" height="11" rx="2" fill={selectedProfile.hex} />

            {/* Kanatlar */}
            {Array.from({ length: previewPanels }).map((_, idx) => {
              const totalW = 568;
              const panelW = totalW / previewPanels;
              const x = 16 + idx * panelW;
              const isCornerLeft = geometry !== 'duz' && idx === 1;
              const isCornerRight = geometry === 'u_tipi' && idx === previewPanels - 2;

              return (
                <g key={idx}>
                  {/* Cam Üst %60 Bölümü */}
                  <rect
                    x={x + 2}
                    y={20}
                    width={panelW - 4}
                    height={75}
                    fill={glassStyle.topFill}
                    stroke={selectedProfile.hex}
                    strokeWidth="2.5"
                  />
                  {/* Cam Alt %40 Bölümü (Alt Buzlu seçiliyse kumlama efekti) */}
                  <rect
                    x={x + 2}
                    y={95}
                    width={panelW - 4}
                    height={49}
                    fill={glassStyle.bottomFill}
                    stroke={selectedProfile.hex}
                    strokeWidth="2.5"
                  />
                  {/* Plise Perde Efekti */}
                  {includePleatedBlind && (
                    <rect
                      x={x + 4}
                      y={22}
                      width={panelW - 8}
                      height={32}
                      fill="rgba(11, 59, 96, 0.18)"
                    />
                  )}
                  {/* Cam Yansıma Çizgisi */}
                  <line
                    x1={x + 8}
                    y1={30}
                    x2={x + Math.min(22, panelW - 8)}
                    y2={68}
                    stroke="rgba(255,255,255,0.75)"
                    strokeWidth="2"
                  />
                  {/* L veya U Balkon Köşe Birleşim Dikmesi */}
                  {(isCornerLeft || isCornerRight) && (
                    <rect
                      x={x + panelW - 3}
                      y={10}
                      width={6}
                      height={146}
                      fill="#0B3B60"
                      opacity={0.85}
                    />
                  )}
                </g>
              );
            })}

            {/* Kedi Tüllü Sineklik Gösterimi */}
            {includeCatScreen && (
              <g>
                <rect
                  x="18"
                  y="20"
                  width={568 / previewPanels - 4}
                  height="124"
                  fill="rgba(11, 59, 96, 0.14)"
                  stroke="#1E3A8A"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                <text x="26" y="136" fill="#1E3A8A" fontSize="9" fontWeight="bold">
                  KEDİ TÜLÜ
                </text>
              </g>
            )}

            {/* Ölçü Etiketi */}
            <text
              x="300"
              y="166"
              textAnchor="middle"
              fill="#0B3B60"
              fontSize="10"
              fontWeight="bold"
            >
              Toplam Cephe: {formatMeters(exactTotalWidthCm)} m × Yükseklik:{' '}
              {formatMeters(exactHeightCm)} m = Net {formatArea(quote.billableAreaM2)} m²
            </text>
          </svg>
        </div>
      </div>

      {/* 1. Balkon Geometrisi ve Mahalle */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            1. Balkon Şekli
          </label>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {(
              [
                ['duz', 'Düz (1 Cephe)'],
                ['l_tipi', 'L Balkon'],
                ['u_tipi', 'U Balkon'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setGeometry(id)}
                className={`rounded-lg border px-2 py-2 text-xs font-bold transition ${
                  geometry === id
                    ? 'border-celikpen-brand bg-celikpen-brand text-white'
                    : 'border-slate-300 bg-celikpen-subtle text-slate-700 hover:border-celikpen-brand-soft'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Bahçelievler Mahallesi
          </label>
          <select
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-celikpen-brand-soft focus:outline-none"
          >
            {SITE_CONFIG.neighborhoods.map((n) => (
              <option key={n.slug} value={n.name}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Ondalıklı Ölçü Girişleri ve Presetler */}
      <div className="mt-4 space-y-4 rounded-xl border border-celikpen-border bg-celikpen-subtle p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              2. Ölçüler (ondalık destekli)
            </div>
            <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
              Metre veya santimetre girin: <strong>2,45</strong> · <strong>2.45 m</strong> ·{' '}
              <strong>245,5 cm</strong> aynı ölçüyü ifade eder.
            </p>
          </div>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-celikpen-brand ring-1 ring-celikpen-border">
            adım 0,05 m
          </span>
        </div>

        {(
          [
            [0, '1. Cephe Eni', 1.5, 9],
            [1, '2. Yan Cephe Eni', 0.8, 5],
            [2, '3. Yan Cephe Eni', 0.8, 5],
          ] as const
        ).map(([index, label, sliderMin, sliderMax]) =>
          index === 1 && geometry === 'duz' ? null : index === 2 && geometry !== 'u_tipi' ? null : (
            <div key={label} className="rounded-lg border border-celikpen-border bg-white p-3">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <label
                  htmlFor={`width-${index}`}
                  className="text-xs font-semibold text-slate-700"
                >
                  {label}
                </label>
                <span className="text-[11px] font-bold text-celikpen-brand-soft">
                  {widthsCm[index]} cm · {formatMeters(widthsCm[index])} m
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  id={`width-${index}`}
                  type="text"
                  inputMode="decimal"
                  step="0.01"
                  autoComplete="off"
                  value={widthDrafts[index]}
                  onChange={(e) => updateWidthDraft(index, e.target.value)}
                  onBlur={() => {
                    const parsed = parseMeasureToCm(widthDrafts[index]);
                    if (parsed === null) {
                      setWidthDrafts((prev) => {
                        const next = [...prev] as [string, string, string];
                        next[index] = formatMeters(widthsCm[index]);
                        return next;
                      });
                    } else {
                      setWidthDrafts((prev) => {
                        const next = [...prev] as [string, string, string];
                        next[index] = formatMeters(clampWidth(parsed));
                        return next;
                      });
                    }
                  }}
                  aria-label={`${label} metre veya santimetre cinsinden`}
                  aria-invalid={
                    widthDrafts[index].trim() !== '' &&
                    parseMeasureToCm(widthDrafts[index]) === null
                  }
                  className={`w-full rounded-lg border px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-celikpen-brand-soft focus:ring-2 focus:ring-celikpen-brand/20 ${
                    widthDrafts[index].trim() !== '' &&
                    parseMeasureToCm(widthDrafts[index]) === null
                      ? 'border-rose-400 bg-rose-50'
                      : 'border-slate-300 bg-white'
                  }`}
                  placeholder="Örn. 4,20 veya 420"
                />
                <span className="shrink-0 rounded-md bg-celikpen-subtle px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  m / cm
                </span>
              </div>

              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={0.05}
                value={Math.min(sliderMax, Math.max(sliderMin, widthsCm[index] / 100))}
                onChange={(e) => updateWidthSlider(index, Number(e.target.value))}
                aria-label={`${label} kaydırıcı`}
                className="mt-2 w-full accent-celikpen-brand"
              />

              {index === 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Hızlı En:
                  </span>
                  {WIDTH_PRESETS_M.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => applyWidthPreset(preset)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-bold transition ${
                        Math.abs(widthsCm[0] - preset * 100) < 0.01
                          ? 'border-celikpen-brand bg-celikpen-brand text-white'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-celikpen-brand hover:text-celikpen-brand'
                      }`}
                    >
                      {preset.toFixed(2)}m
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        )}

        <div className="rounded-lg border border-celikpen-border bg-white p-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <label htmlFor="height-input" className="text-xs font-semibold text-slate-700">
              Balkon Yüksekliği
            </label>
            <span className="text-[11px] font-bold text-celikpen-brand-soft">
              {heightCm} cm · {formatMeters(heightCm)} m
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              id="height-input"
              type="text"
              inputMode="decimal"
              step="0.01"
              autoComplete="off"
              value={heightDraft}
              onChange={(e) => updateHeightDraft(e.target.value)}
              onBlur={() => {
                const parsed = parseMeasureToCm(heightDraft);
                if (parsed === null) {
                  setHeightDraft(formatMeters(heightCm));
                } else {
                  setHeightDraft(formatMeters(clampHeight(parsed)));
                }
              }}
              aria-label="Balkon yüksekliği metre veya santimetre cinsinden"
              aria-invalid={
                heightDraft.trim() !== '' && parseMeasureToCm(heightDraft) === null
              }
              className={`w-full rounded-lg border px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-celikpen-brand-soft focus:ring-2 focus:ring-celikpen-brand/20 ${
                heightDraft.trim() !== '' && parseMeasureToCm(heightDraft) === null
                  ? 'border-rose-400 bg-rose-50'
                  : 'border-slate-300 bg-white'
              }`}
              placeholder="Örn. 1,90 veya 190"
            />
            <span className="shrink-0 rounded-md bg-celikpen-subtle px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              m / cm
            </span>
          </div>

          <input
            type="range"
            min={1.4}
            max={2.8}
            step={0.05}
            value={Math.min(2.8, Math.max(1.4, heightCm / 100))}
            onChange={(e) => updateHeightSlider(Number(e.target.value))}
            aria-label="Balkon yüksekliği kaydırıcı"
            className="mt-2 w-full accent-celikpen-brand"
          />

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Hızlı Boy:
            </span>
            {HEIGHT_PRESETS_M.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => applyHeightPreset(preset)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-bold transition ${
                  Math.abs(heightCm - preset * 100) < 0.01
                    ? 'border-celikpen-brand bg-celikpen-brand text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-celikpen-brand hover:text-celikpen-brand'
                }`}
              >
                {preset.toFixed(2)}m
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#1E3A8A]/5 px-3 py-2 text-[11px] text-slate-600">
          <span>
            Ham alan: <strong>{formatArea(quote.rawAreaM2)} m²</strong> · Faturalanabilir alan:{' '}
            <strong>{formatArea(quote.billableAreaM2)} m²</strong>
          </span>
          <span className="font-semibold text-celikpen-brand">
            {formatMeters(exactTotalWidthCm)} m × {formatMeters(exactHeightCm)} m
          </span>
        </div>
      </div>

      {/* 3. Sistem Seçimi */}
      <div className="mt-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          3. Resmi Winsa Sistem Serisi (2026 Net m² Birim Fiyatlı)
        </label>
        <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Object.values(CELIKPEN_PRICING_CONFIG.systems).map((sys) => (
            <button
              key={sys.id}
              type="button"
              onClick={() => setSystemId(sys.id)}
              className={`flex flex-col justify-between rounded-xl border p-2.5 text-left transition ${
                systemId === sys.id
                  ? 'border-celikpen-brand bg-celikpen-brand/10 text-slate-900'
                  : 'border-celikpen-border bg-celikpen-subtle text-slate-700 hover:border-celikpen-brand-soft'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-celikpen-brand-soft">{sys.code}</span>
                <span className="text-xs font-extrabold text-celikpen-cta">
                  {sys.netPricePerM2.toLocaleString('tr-TR')} ₺/m²
                </span>
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-900">{sys.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Cam ve Profil Özelleştirme */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Cam Rengi / Mahremiyet
          </label>
          <select
            value={glassId}
            onChange={(e) => setGlassId(e.target.value as GlassOptionId)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
          >
            {Object.values(CELIKPEN_PRICING_CONFIG.glassOptions).map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} ({g.extraPerM2 > 0 ? `+${g.extraPerM2} ₺/m²` : 'Standart'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Alüminyum Profil Rengi
          </label>
          <select
            value={profileId}
            onChange={(e) => setProfileId(e.target.value as ProfileColorId)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
          >
            {Object.values(CELIKPEN_PRICING_CONFIG.profileColors).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. Ekstra Donanımlar & Toplu Bina İndirimi */}
      <div className="mt-4 flex flex-wrap gap-2">
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-celikpen-subtle px-3 py-1.5 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={includeCatScreen}
            onChange={(e) => setIncludeCatScreen(e.target.checked)}
            className="accent-celikpen-brand"
          />
          <span>
            Kedi Tüllü Sineklik (+
            {CELIKPEN_PRICING_CONFIG.addons.catScreenPerUnit.toLocaleString('tr-TR')} ₺)
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-celikpen-subtle px-3 py-1.5 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={includePleatedBlind}
            onChange={(e) => setIncludePleatedBlind(e.target.checked)}
            className="accent-celikpen-brand"
          />
          <span>
            Plise Perde (+{CELIKPEN_PRICING_CONFIG.addons.pleatedBlindPerM2} ₺/m²)
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-600/40 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
          <input
            type="checkbox"
            checked={isBulkBuilding}
            onChange={(e) => setIsBulkBuilding(e.target.checked)}
            className="accent-emerald-600"
          />
          <span>5+ Daire Toplu Bina / Kentsel Dönüşüm (%15 İndirim)</span>
        </label>
      </div>

      {/* Sonuç ve WhatsApp CTA */}
      <div className="mt-5 rounded-xl border border-celikpen-brand/30 bg-celikpen-subtle p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs text-slate-500">
              Çelikpen Net Hesaplanan Tutar ({quote.panelCountEstimate} Kanat /{' '}
              {formatArea(quote.billableAreaM2)} m²)
            </div>
            <div className="text-2xl font-black text-celikpen-brand">
              {quote.netTotal.toLocaleString('tr-TR')} ₺
            </div>
            <div className="text-xs text-slate-500">
              Keşif Tolerans Aralığı: {quote.minEstimate.toLocaleString('tr-TR')} ₺ –{' '}
              {quote.maxEstimate.toLocaleString('tr-TR')} ₺
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-celikpen-cta px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-rose-500"
          >
            <span>WhatsApp’a Aktar & Keşif İste</span>
          </a>
        </div>
      </div>
    </div>
  );
}
