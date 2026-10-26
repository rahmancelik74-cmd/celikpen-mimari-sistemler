import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../../config/seo.config';
import { PriceCalculator } from '../../components/PriceCalculator';

export const metadata: Metadata = generatePageMetadata({
  title: 'Cam Balkon Fiyat Hesaplama — 2026 Net m² Fabrika Fiyatı | Çelikpen',
  description:
    'Bahçelievler cam balkon fiyatlarını 30 saniyede hesaplayın. Balkon tipi, ondalıklı ölçü, cam ve profil rengi seçin; ısıcamlı, katlanır, sürme ve giyotin cam balkon 2026 net m² fabrika fiyatını anında görün.',
  path: '/fiyat-hesapla',
  keywords: [
    'cam balkon fiyat hesaplama',
    'cam balkon m2 fiyatı 2026',
    'Bahçelievler cam balkon fiyatları',
    'ısıcamlı cam balkon fiyat',
    'giyotin cam balkon fiyat',
    'Winsa Vera Termal fiyat',
  ],
  image: '/images/products/kocasinan-vera-termal-isicamli-cam-balkon.jpg',
  imageAlt: 'Winsa Vera Termal ısıcamlı cam balkon 2026 fiyat hesaplama',
});

const ASSURANCES = [
  {
    title: 'Ondalıklı ölçü girişi',
    description: '2,45 m veya 245,5 cm girin; alan otomatik olarak 2 haneli m² olarak hesaplanır.',
  },
  {
    title: '2026 net fabrika fiyatı',
    description: 'Winsa Vera 8’den Vela & Lotus pergolaya kadar 10 resmi serinin güncel m² fiyatı.',
  },
  {
    title: 'Şeffaf keşif toleransı',
    description: 'Hesaplanan tutar ±%5 keşif bandıyla gösterilir; sürpriz kalem çıkmaz.',
  },
  {
    title: 'Ücretsiz lazerli keşif',
    description: 'Kocasinan Merkez ekibimiz Bahçelievler ve çevre ilçelerde aynı gün ölçü alır.',
  },
];

export default function FiyatHesaplaPage() {
  return (
    <main className="bg-[#F8FAFC] pb-16">
      <section className="relative overflow-hidden bg-[#0F172A] pt-10 pb-16 text-white sm:pt-14">
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
          className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-[#1E3A8A] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#D91B24]/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10.5px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Ana Sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-sky-200">Fiyat Hesapla</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24]" aria-hidden="true" />
                2026 Net m² Fabrika Fiyat Motoru
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px]">
                Cam balkon bütçenizi{' '}
                <span className="text-sky-300">ondalık ölçülerle netleştirin.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[12.5px] leading-6 text-slate-300 sm:text-[13px]">
                En ve boy ölçülerinizi metre veya santimetre olarak yazın. Balkon tipini, Winsa
                sistem serisini, cam ve profil rengini seçin; net fabrika fiyatını anında görün.
                Kocasinan Merkez üretim tesisimizden tüm Bahçelievler’e doğrudan fiyat.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-300">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">2,45 m · 3,75 m desteği</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">10 resmi Winsa serisi</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Anlık WhatsApp teklifi</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-200">
                Hesaplama nasıl çalışır?
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-slate-300">
                <span className="rounded-md bg-[#1E3A8A] px-2 py-1 text-white">01 Ölçü</span>
                <span aria-hidden="true">→</span>
                <span className="rounded-md bg-white/10 px-2 py-1">02 Sistem</span>
                <span aria-hidden="true">→</span>
                <span className="rounded-md bg-white/10 px-2 py-1">03 Cam &amp; Renk</span>
                <span aria-hidden="true">→</span>
                <span className="rounded-md bg-[#D91B24] px-2 py-1 text-white">04 Net Fiyat</span>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-slate-400">
                Fiyatlar KDV hariç fabrika satış birim fiyatlarıdır. Keşif ve montaj kapsamı
                teklif aşamasında yazılı olarak netleştirilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell relative -mt-8">
        <PriceCalculator />

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_14px_35px_-32px_rgba(15,23,42,0.5)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EFF6FF] text-[11px] font-black text-[#1E3A8A]">
                ✓
              </span>
              <h2 className="mt-2 text-[12px] font-black text-[#0F172A]">{item.title}</h2>
              <p className="mt-1 text-[10.5px] leading-5 text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 sm:flex-row sm:items-center">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1E3A8A]">
              Ölçüden emin değil misiniz?
            </div>
            <p className="mt-1 text-[12px] leading-5 text-slate-600">
              Lazerli ölçü ve cephe analizi için ücretsiz keşif planlayın; doğru sistemi birlikte
              seçelim.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/iletisim?form=kesif"
              className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              Ücretsiz Keşif İste
            </Link>
            <Link
              href="/urunler"
              className="rounded-lg border border-[#1E3A8A]/30 bg-white px-4 py-2.5 text-[11px] font-bold text-[#1E3A8A] transition hover:border-[#1E3A8A]"
            >
              Winsa Serilerini İncele
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
