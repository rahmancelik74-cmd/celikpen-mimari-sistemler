'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WINSA_PRODUCTS } from '../config/winsa-products.config';
import { WINSA_CONTENT_CONFIG } from '../config/winsa-content.config';

type WinsaProductItem = (typeof WINSA_PRODUCTS)[number];

interface ProductDetailInteractiveProps {
  product: WinsaProductItem;
}

export const ProductDetailInteractive: React.FC<ProductDetailInteractiveProps> = ({
  product,
}) => {
  const swatches = WINSA_CONTENT_CONFIG.colorPalette;
  const [selectedSwatch, setSelectedSwatch] = useState(swatches[0]);
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights' | 'usage'>('specs');

  return (
    <div className="space-y-6">
      {/* 1. YAN YANA GÖRSEL + 1:1 CAD KESİT VİTRİNİ (Seçili Renk Çerçeveli) */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Sol: Ürün Görseli + Canlı Profil Rengi Çerçevesi */}
        <div
          className="relative overflow-hidden rounded-2xl border-4 bg-slate-100 shadow-sm transition-colors duration-300 lg:col-span-7"
          style={{ borderColor: selectedSwatch.hexPrimary }}
        >
          <Image
            src={product.defaultImage}
            alt={product.name}
            width={780}
            height={500}
            priority
            className="aspect-[15/10] w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-20 transition-colors duration-300"
            style={{
              background: `linear-gradient(135deg, ${selectedSwatch.hexPrimary} 0%, transparent 65%)`,
            }}
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-white/25 bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            <span
              className="h-3.5 w-3.5 rounded-full border border-white/40"
              style={{ backgroundColor: selectedSwatch.hexPrimary }}
            />
            <span>Seçili Profil: {selectedSwatch.name}</span>
            <span className="text-[10px] text-slate-300">({selectedSwatch.ralOrCode})</span>
          </div>
        </div>

        {/* Sağ: 1:1 Mimari CAD Profil Kesiti */}
        <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-[#0F172A] p-4 text-white shadow-sm lg:col-span-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-xs">
            <span className="font-bold text-sky-300">📐 1:1 CAD Profil Kesiti</span>
            <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold">
              {product.technicalSpecs.profilGenisligi}
            </span>
          </div>
          <div className="my-2 overflow-hidden rounded-xl bg-slate-900">
            <Image
              src={product.crossSectionSvg}
              alt={`${product.name} CAD Profil Kesiti`}
              width={560}
              height={390}
              className="aspect-[10/7] w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-lg bg-slate-800/90 p-2.5">
              <span className="block text-slate-400">Odacık &amp; Kasa</span>
              <strong className="text-white">{product.technicalSpecs.odacikSayisi}</strong>
            </div>
            <div className="rounded-lg bg-slate-800/90 p-2.5">
              <span className="block text-slate-400">Standart</span>
              <strong className="text-emerald-400">{product.technicalSpecs.standart}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. İNTERAKTİF RENK KARTELASI PİLLERİ (Tıklanınca Görsel Çerçevesini Günceller) */}
      <div className="glass-card rounded-2xl p-4">
        <div className="mb-2.5 flex items-center justify-between text-xs">
          <span className="font-extrabold uppercase tracking-wider text-[#0F172A]">
            İnteraktif Renk &amp; Laminasyon Seçimi
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            Önizleme için renge tıklayın
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {swatches.map((swatch) => {
            const isSelected = selectedSwatch.id === swatch.id;
            return (
              <button
                key={swatch.id}
                type="button"
                onClick={() => setSelectedSwatch(swatch)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? 'border-[#1E3A8A] bg-[#0F172A] text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-[#0F172A]'
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/20"
                  style={{
                    background: `linear-gradient(135deg, ${swatch.hexPrimary} 0%, ${swatch.hexSecondary} 100%)`,
                  }}
                />
                <span>{swatch.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 4'LÜ BENTO PERFORMANS KARTLARI */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <span className="text-base">📏</span>
          <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
            Profil Genişliği
          </div>
          <div className="mt-0.5 text-sm font-black text-[#0F172A]">
            {product.technicalSpecs.profilGenisligi}
          </div>
        </div>

        <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <span className="text-base">🔥</span>
          <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
            Isı Yalıtımı (Uw)
          </div>
          <div className="mt-0.5 text-sm font-black text-emerald-700">
            {product.technicalSpecs.isiYalitimiUw}
          </div>
        </div>

        <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <span className="text-base">🔇</span>
          <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
            Ses İzolasyonu
          </div>
          <div className="mt-0.5 text-sm font-black text-[#0F172A]">
            {product.technicalSpecs.sesYalitimiDb}
          </div>
        </div>

        <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <span className="text-base">💎</span>
          <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
            Cam Kapasitesi
          </div>
          <div className="mt-0.5 text-sm font-black text-slate-900">
            {product.technicalSpecs.camKalinligi}
          </div>
        </div>
      </div>

      {/* 4. SEKMELİ (TABBED) KOMPAKT TEKNİK DETAY GÖRÜNÜMÜ */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50 p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition ${
              activeTab === 'specs'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Teknik Parametreler
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('highlights')}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition ${
              activeTab === 'highlights'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Mühendislik Avantajları
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('usage')}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition ${
              activeTab === 'usage'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Mimari Kullanım Alanları
          </button>
        </div>

        <div className="p-5">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500">Profil Genişliği</span>
                <strong className="text-slate-900">{product.technicalSpecs.profilGenisligi}</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500">Odacık &amp; Kesit</span>
                <strong className="text-slate-900">{product.technicalSpecs.odacikSayisi}</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500">Conta Yapısı</span>
                <strong className="text-slate-900">{product.technicalSpecs.contaYapisi}</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500">Cam Kalınlığı</span>
                <strong className="text-slate-900">{product.technicalSpecs.camKalinligi}</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500">Su Sızdırmazlık</span>
                <strong className="text-[#0F172A]">{product.technicalSpecs.suSizdirmazlik}</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-500">Rüzgar Yükü Direnci</span>
                <strong className="text-[#0F172A]">{product.technicalSpecs.ruzgarDirenci}</strong>
              </div>
            </div>
          )}

          {activeTab === 'highlights' && (
            <ul className="grid grid-cols-1 gap-2.5 text-xs sm:grid-cols-2">
              {product.highlights.map((hl) => (
                <li
                  key={hl}
                  className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-700"
                >
                  <span className="font-black text-[#1E3A8A]">✓</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'usage' && (
            <ul className="grid grid-cols-1 gap-2.5 text-xs sm:grid-cols-2">
              {product.usageAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-700"
                >
                  <span className="font-black text-[#0F172A]">◆</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
