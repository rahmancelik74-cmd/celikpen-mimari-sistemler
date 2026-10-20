'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '../config/site.config';

const EUROPEAN_SIDE_ZONES = [
  {
    district: 'Bakırköy • Ataköy • Florya',
    serviceTime: '20 dk • Aynı Gün Keşif',
    focus: 'Panorama HS 76 Kaldır-Sür ve VBS 4+20+4 Isıcamlı Cam Balkon sistemleri.',
  },
  {
    district: 'Güngören • Merter • Tozkoparan',
    serviceTime: '15 dk • Aynı Gün Keşif',
    focus: 'Kentsel dönüşüm Antrasit RAL 7016 cam balkon ve Dorado 76 PVC doğrama.',
  },
  {
    district: 'Bağcılar • Mahmutbey • Güneşli',
    serviceTime: '10 dk • Aynı Gün Keşif',
    focus: 'Yüksek rüzgar dirençli Revotech Gold 84 mm ve Motorlu Giyotin sistemler.',
  },
  {
    district: 'Küçükçekmece • Sefaköy • Halkalı',
    serviceTime: '20 dk • Aynı Gün Keşif',
    focus: 'Akustik Isıcam ve Bioklimatik kış bahçesi çözümleri.',
  },
];

export function SalesPointsDirectory() {
  const [selectedNeighborhoodSlug, setSelectedNeighborhoodSlug] = useState<string>('all');

  const filteredNeighborhoods = useMemo(() => {
    if (selectedNeighborhoodSlug === 'all') {
      return SITE_CONFIG.neighborhoods;
    }
    return SITE_CONFIG.neighborhoods.filter((n) => n.slug === selectedNeighborhoodSlug);
  }, [selectedNeighborhoodSlug]);

  const whatsappLocationUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Merhaba Çelikpen (${SITE_CONFIG.headquartersNeighborhood}), Kocasinan Merkez fabrika showroom konumunu ve ücretsiz keşif randevusu bilgisini alabilir miyim?`
  )}`;

  return (
    <div className="space-y-8">
      {/* 1. Merkez Fabrika & Showroom Kartı */}
      <section className="rounded-2xl border border-[#0B1560]/20 bg-white p-6 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="rounded-md bg-[#D91B24] px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-white">
              MERKEZ SHOWROOM
            </span>
            <h2 className="mt-1.5 text-xl font-black text-[#0B1560]">
              Kocasinan Merkez Üretim Tesisi &amp; Deneyim Merkezi
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="rounded-lg bg-[#0B1560] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#004A8F]"
            >
              📞 {SITE_CONFIG.phoneDisplay}
            </a>
            <a
              href={whatsappLocationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-emerald-500"
            >
              📍 Konum İste
            </a>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-[10.5px] font-bold uppercase text-slate-400">Açık Adres</div>
            <div className="mt-1 text-xs font-bold text-slate-900">{SITE_CONFIG.address}</div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-[10.5px] font-bold uppercase text-slate-400">Çalışma Saatleri</div>
            <div className="mt-1 text-xs font-bold text-[#0B1560]">{SITE_CONFIG.workingHours}</div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-[10.5px] font-bold uppercase text-slate-400">Canlı Numuneler</div>
            <div className="mt-1 text-xs font-bold text-slate-800">
              1:1 Cam Balkon, Kaldır-Sür, Giyotin &amp; Renk Kartelası
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bahçelievler 11 Mahalle Hizmet Noktaları */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-black text-[#0B1560]">
            Bahçelievler 11 Mahalle Hizmet Ağı
          </h2>

          <select
            aria-label="Mahalle Filtrele"
            value={selectedNeighborhoodSlug}
            onChange={(e) => setSelectedNeighborhoodSlug(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#0B1560] focus:border-[#0B1560] focus:outline-none"
          >
            <option value="all">Tüm Mahalleler (11)</option>
            {SITE_CONFIG.neighborhoods.map((n) => (
              <option key={n.slug} value={n.slug}>
                {n.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNeighborhoods.map((n) => (
            <div
              key={n.slug}
              className="hover-lift flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-[#0B1560]">{n.name}</h3>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    {n.completedProjectsCount}+ Proje
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-600">{n.recommendedSystem}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
                <Link
                  href={`/bahcelievler/${n.slug}`}
                  className="font-bold text-[#0B1560] hover:text-[#D91B24]"
                >
                  Bölge Detayı →
                </Link>
                <Link
                  href="/iletisim"
                  className="rounded-md bg-[#D91B24] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#B31219]"
                >
                  Keşif İste
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Avrupa Yakası Komşu Bölgeler */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {EUROPEAN_SIDE_ZONES.map((zone) => (
          <div
            key={zone.district}
            className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-black text-[#0B1560]">{zone.district}</h3>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700">
                {zone.serviceTime}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-600">{zone.focus}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
