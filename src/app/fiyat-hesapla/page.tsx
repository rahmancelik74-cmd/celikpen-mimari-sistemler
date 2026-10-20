import React from 'react';
import { PriceCalculator } from '../../components/PriceCalculator';

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
