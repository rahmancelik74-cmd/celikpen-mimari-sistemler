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

export function PriceCalculator({
  defaultNeighborhood = 'Kocasinan Merkez',
  defaultSystemId = 'vbs_isicam',
}: PriceCalculatorProps = {}) {
  const [geometry, setGeometry] = useState<BalconyGeometryId>('duz');
  const [widthsCm, setWidthsCm] = useState<[number, number, number]>([420, 160, 160]);
  const [heightCm, setHeightCm] = useState<number>(190);
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
      `• Balkon Tipi: ${geometry.toUpperCase()} (${quote.totalWidthMeters}m En x ${quote.heightMeters}m Yükseklik = ${quote.billableAreaM2} m²)`,
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
            {quote.billableAreaM2} m²
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
              Toplam Cephe: {quote.totalWidthMeters}m × Yükseklik: {quote.heightMeters}m = Net{' '}
              {quote.billableAreaM2} m²
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

      {/* 2. Ölçü Kaydırıcıları */}
      <div className="mt-4 space-y-3 rounded-xl border border-celikpen-border bg-celikpen-subtle p-3.5">
        <div>
          <div className="flex justify-between text-xs">
            <span className="font-medium text-slate-700">1. Cephe Genişliği (cm)</span>
            <span className="font-bold text-celikpen-brand-soft">{widthsCm[0]} cm</span>
          </div>
          <input
            type="range"
            min={150}
            max={900}
            step={10}
            value={widthsCm[0]}
            onChange={(e) =>
              setWidthsCm([Number(e.target.value), widthsCm[1], widthsCm[2]])
            }
            className="mt-1 w-full accent-celikpen-brand"
          />
        </div>

        {geometry !== 'duz' && (
          <div>
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700">2. Yan Cephe Genişliği (cm)</span>
              <span className="font-bold text-celikpen-brand-soft">{widthsCm[1]} cm</span>
            </div>
            <input
              type="range"
              min={80}
              max={500}
              step={10}
              value={widthsCm[1]}
              onChange={(e) =>
                setWidthsCm([widthsCm[0], Number(e.target.value), widthsCm[2]])
              }
              className="mt-1 w-full accent-celikpen-brand"
            />
          </div>
        )}

        {geometry === 'u_tipi' && (
          <div>
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700">3. Yan Cephe Genişliği (cm)</span>
              <span className="font-bold text-celikpen-brand-soft">{widthsCm[2]} cm</span>
            </div>
            <input
              type="range"
              min={80}
              max={500}
              step={10}
              value={widthsCm[2]}
              onChange={(e) =>
                setWidthsCm([widthsCm[0], widthsCm[1], Number(e.target.value)])
              }
              className="mt-1 w-full accent-celikpen-brand"
            />
          </div>
        )}

        <div>
          <div className="flex justify-between text-xs">
            <span className="font-medium text-slate-700">Balkon Yüksekliği (cm)</span>
            <span className="font-bold text-celikpen-brand-soft">{heightCm} cm</span>
          </div>
          <input
            type="range"
            min={140}
            max={280}
            step={5}
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="mt-1 w-full accent-celikpen-brand"
          />
        </div>
      </div>

      {/* 3. Sistem Seçimi */}
      <div className="mt-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          3. Çelikpen Sistem Serisi (Net m² Birim Fiyatlı)
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
              {quote.billableAreaM2} m²)
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
