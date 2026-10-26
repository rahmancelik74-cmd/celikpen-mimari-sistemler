'use client';

import React from 'react';

const SERIES_DATA: Record<string, { brand: string; series: string; accent: string; sub?: string }> = {
  'safir-76': { brand: 'WINSA', series: 'SAFİR', accent: '#1E3A8A', sub: '76 mm' },
  'dorado-76': { brand: 'WINSA', series: 'DORADO', accent: '#1E3A8A', sub: '76 mm' },
  'revotech-gold': { brand: 'WINSA', series: 'REVOTECH', accent: '#B45309', sub: 'GOLD 84 mm' },
  'comfort-slide-plus': { brand: 'WINSA', series: 'COMFORT SLIDE', accent: '#0F766E', sub: 'PLUS' },
  'panorama-hs-76': { brand: 'WINSA', series: 'PANORAMA', accent: '#1E3A8A', sub: 'HS 76' },
  'lotus-paralel-surme': { brand: 'WINSA', series: 'LOTUS', accent: '#7C3AED', sub: 'PARALEL' },
  'winstor-monoblok-panjur': { brand: 'WINSA', series: 'WINSTOR', accent: '#DC2626', sub: 'MONOBLOK' },
  'vera-katlanir-cam-balkon': { brand: 'ALBERT GENAU', series: 'VERA', accent: '#0369A1', sub: 'KATLANIR' },
  'vera-isicamli-cam-balkon': { brand: 'ALBERT GENAU', series: 'VERA', accent: '#0369A1', sub: 'TERMAL' },
  'panorama-esiksiz-surme-cam-balkon': { brand: 'ALBERT GENAU', series: 'PANORAMA', accent: '#1E3A8A', sub: 'EŞİKSİZ' },
  'giyotin-motorlu-silinebilir-cam': { brand: 'ALBERT GENAU', series: 'TAMBALKON', accent: '#0F172A', sub: 'GİYOTİN' },
  'kis-bahcesi-sistemleri': { brand: 'ALBERT GENAU', series: 'KIŞ BAHÇESİ', accent: '#166534', sub: 'SİSTEMLERİ' },
  'bioklimatik-kis-bahcesi-sistemleri': { brand: 'ALBERT GENAU', series: 'BİOKLİMATİK', accent: '#166534', sub: 'PERGOLA' },
};

export function WinsaSeriesLogo({ slug }: { slug: string }) {
  const data = SERIES_DATA[slug];
  if (!data) return null;

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 items-center rounded-md px-2" style={{ backgroundColor: data.accent }}>
        <span className="text-[9px] font-extrabold tracking-[0.14em] text-white">{data.brand}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[15px] font-black tracking-tight" style={{ color: data.accent }}>{data.series}</span>
        {data.sub && <span className="text-[11px] font-bold text-slate-500">{data.sub}</span>}
      </div>
    </div>
  );
}
