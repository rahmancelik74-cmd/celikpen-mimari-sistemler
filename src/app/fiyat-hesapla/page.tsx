import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../../config/seo.config';
import { PriceCalculator } from '../../components/PriceCalculator';

export const metadata: Metadata = generatePageMetadata({
  title: 'Cam Balkon Fiyat Hesaplama — 2026 Net m² Fabrika Fiyatı | Çelikpen',
  description:
    'Bahçelievler cam balkon fiyatlarını 30 saniyede hesaplayın. Balkon tipi, ölçü, cam ve profil rengi seçin; ısıcamlı, katlanır, sürme ve giyotin cam balkon 2026 net m² fabrika fiyatını anında görün.',
  path: '/fiyat-hesapla',
  keywords: [
    'cam balkon fiyat hesaplama',
    'cam balkon m2 fiyatı 2026',
    'Bahçelievler cam balkon fiyatları',
    'ısıcamlı cam balkon fiyat',
    'giyotin cam balkon fiyat',
  ],
});

export default function FiyatHesaplaPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <span className="text-xs font-bold uppercase tracking-wider text-celikpen-brand-soft">
        Çelikpen Kocasinan Fabrika Satış • 2D Canlı Cephe Simülatörü
      </span>
      <h1 className="mt-1 mb-4 text-3xl font-black text-slate-900 sm:text-5xl">
        Çelikpen Bahçelievler Cam Balkon Net m² Fiyat Hesaplama
      </h1>
      <p className="mb-8 text-slate-600">
        Balkonunuzun cephe ölçülerini ve istediğiniz Çelikpen sistem serisini seçerek net fabrika
        fiyatını saniyeler içinde hesaplayın.
      </p>
      <PriceCalculator />
    </main>
  );
}
