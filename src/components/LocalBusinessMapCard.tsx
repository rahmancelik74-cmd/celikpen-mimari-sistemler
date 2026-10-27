'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/site.config';
import { SEO_BUSINESS } from '../config/seo.config';

export function LocalBusinessMapCard({ className = '' }: { className?: string }) {
  const [loadMapIframe, setLoadMapIframe] = useState(false);

  const lat = SEO_BUSINESS.geo.latitude;
  const lng = SEO_BUSINESS.geo.longitude;
  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Kocasinan+Merkez+Mah.+K%C4%B1z%C4%B1lelma+Cad.+No%3A30%2FC+34186+Bah%C3%A7elievler+%C4%B0stanbul';
  const googleMapsSearchUrl =
    'https://www.google.com/maps/search/?api=1&query=Kocasinan+Merkez+Mah.+K%C4%B1z%C4%B1lelma+Cad.+No%3A30%2FC+34186+Bah%C3%A7elievler+%C4%B0stanbul';
  const embedMapUrl =
    'https://maps.google.com/maps?q=Kocasinan%20Merkez%20Mah.%20K%C4%B1z%C4%B1lelma%20Cad.%20No%3A30%2FC%20Bah%C3%A7elievler%20%C4%B0stanbul&t=&z=17&ie=UTF8&iwloc=&output=embed';

  return (
    <section
      aria-labelledby="google-haritalar-baslik"
      className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs ${className}`}
    >
      {/* Üst Başlık & Google İşletme Profili Rozetleri */}
      <div className="border-b border-slate-100 bg-[#0F172A] px-5 py-5 text-white sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Google İşletme Profili &amp; Haritalar Doğrulamalı Showroom
            </span>
            <h2
              id="google-haritalar-baslik"
              className="mt-2 text-lg font-extrabold tracking-tight text-white sm:text-xl"
            >
              {SITE_CONFIG.brandName} Kocasinan Merkez Fabrika &amp; Showroom Konumu
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2">
            <span className="text-lg font-black text-amber-400">★ {SEO_BUSINESS.aggregateRating.ratingValue}</span>
            <div className="text-[10.5px] leading-tight text-slate-300">
              <strong className="block font-bold text-white">
                {SEO_BUSINESS.aggregateRating.reviewCount}+ Doğrulanmış Müşteri
              </strong>
              <span>Bahçelievler / İstanbul</span>
            </div>
          </div>
        </div>
      </div>

      {/* Harita & NAP (Name, Address, Phone) Yerel SEO Izgarası */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Sol: NAP & Yol Tarifi / Google Değerlendirme Aksiyonları */}
        <div className="flex flex-col justify-between space-y-5 p-5 sm:p-7 lg:col-span-5">
          <div className="space-y-3.5">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1E3A8A]">
                Resmi Adres (NAP Standardı)
              </span>
              <p className="mt-1 text-sm font-bold leading-relaxed text-[#0F172A]">
                {SITE_CONFIG.address}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                GPS Koordinatları: {lat.toFixed(4)}° K, {lng.toFixed(4)}° D
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs">
              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-400">
                  Müşteri Hattı
                </span>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="mt-0.5 block font-extrabold text-[#1E3A8A] hover:underline"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-400">
                  Çalışma Saatleri
                </span>
                <span className="mt-0.5 block font-bold text-[#0F172A]">
                  Pzt–Cmt: 08:30–19:30
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Aynı Gün Ücretsiz Lazerli Keşif Mahalleleri
              </span>
              <p className="mt-1 text-[11.5px] leading-relaxed text-slate-600">
                Kocasinan Merkez, Şirinevler, Siyavuşpaşa, Soğanlı, Bahçelievler Merkez, Yenibosna,
                Çobançeşme, Hürriyet, Zafer, Fevzi Çakmak ve Cumhuriyet Mahallesi.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-seo-event="google_maps_directions_click"
              data-seo-label="Showroom Yol Tarifi"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] px-4 py-3 text-xs font-extrabold text-white shadow-navy transition hover:bg-[#1D4ED8]"
            >
              <span>📍 Google Haritalar’da Yol Tarifi Al</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-seo-event="google_business_review_click"
              data-seo-label="Google Isletme Profili Yorum"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-[#0F172A] transition hover:border-[#1E3A8A] hover:bg-[#EFF6FF] hover:text-[#1E3A8A]"
            >
              <span>★ Google İşletme Profilimizde Yorum Bırakın</span>
            </a>
          </div>
        </div>

        {/* Sağ: Performans Dostu (Lite Facade) Google Haritalar Önizlemesi */}
        <div className="relative min-h-[290px] border-t border-slate-100 bg-slate-900 lg:col-span-7 lg:border-l lg:border-t-0">
          {!loadMapIframe ? (
            <div className="flex h-full min-h-[290px] flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E3A8A] p-6 text-center text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-inner">
                📍
              </div>
              <h3 className="mt-3 text-base font-extrabold text-white">
                Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C, 34186 Bahçelievler / İstanbul
              </h3>
              <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-300">
                Sayfa açılış hızını (Core Web Vitals LCP) korumak için etkileşimli Google Haritası
                tıkladığınızda yüklenir.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setLoadMapIframe(true)}
                  className="rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-[#1E3A8A] shadow-sm transition hover:bg-sky-50"
                >
                  Etkileşimli Haritayı Yükle
                </button>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
                >
                  Haritalar Uygulamasında Aç ↗
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src={embedMapUrl}
              title={`${SITE_CONFIG.brandName} Kocasinan Merkez Showroom Google Haritası`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[290px] w-full border-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}
