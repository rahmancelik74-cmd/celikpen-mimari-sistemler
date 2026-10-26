import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import { WinsaCatalogGrid } from '../../../components/WinsaCatalogGrid';

export const metadata: Metadata = generatePageMetadata({
  title: `Winsa PVC Pencere, Sürme ve Panjur Sistemleri | ${SITE_CONFIG.brandName}`,
  description:
    'Winsa Safir 76, Dorado 76, Revotech Gold PVC pencere profilleri, Comfort Slide Plus, Panorama HS 76 Kaldır-Sür, Lotus paralel sürme ve Winstor panjur sistemleri.',
  path: '/urunler/winsa',
  keywords: [
    'Winsa sistemleri',
    'Winsa Safir 76',
    'Winsa Dorado 76',
    'Winsa Revotech Gold',
    'Comfort Slide Plus',
    'Panorama HS 76',
    'Winsa Lotus',
    'Winsa Winstor',
  ],
  image: '/images/brands/winsa/dorado-76.png',
  imageAlt: 'Winsa PVC pencere ve sürme sistemleri ürün kataloğu',
});

export default function WinsaBrandPage() {
  return (
    <main className="bg-[#F8FAFC] pb-16">
      <section className="relative overflow-hidden bg-[#0F172A] pt-10 pb-12 text-white sm:pt-12 sm:pb-14">
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
        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10.5px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Ana Sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/urunler" className="transition-colors hover:text-white">
              Ürünlerimiz
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-sky-200">Winsa</span>
          </nav>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                WINSA YETKİLİ UYGULAMA &amp; ÜRETİM MERKEZİ
              </div>
              <h1 className="mt-3.5 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[42px]">
                Winsa <span className="text-sky-300">PVC Pencere, Sürme &amp; Panjur Sistemleri.</span>
              </h1>
              <p className="mt-3 max-w-2xl text-[12.5px] leading-6 text-slate-300 sm:text-[13.5px]">
                Safir 76, Dorado 76, Revotech Gold yalıtım profilleri, Comfort Slide Plus, Panorama HS
                76 Kaldır-Sür, Lotus paralel sürme ve Winstor monoblok panjur çözümlerimiz.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                prefetch={true}
                href="/fiyat-hesapla"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-xs font-bold text-white shadow-navy transition hover:bg-[#1D4ED8]"
              >
                Canlı m² Fiyat Hesapla →
              </Link>
              <Link
                prefetch={true}
                href="/urunler/albert-genau"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Albert Genau Ürünleri →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell pt-8 sm:pt-10">
        <WinsaCatalogGrid initialBrand="winsa" />
      </div>
    </main>
  );
}
