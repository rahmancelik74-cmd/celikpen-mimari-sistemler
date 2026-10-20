import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { SalesPointsDirectory } from '../../components/SalesPointsDirectory';
import { MinimalSubpageHeader } from '../../components/MinimalSubpageHeader';

export const metadata: Metadata = {
  title: `Satış Noktaları & Showroom — Kocasinan Merkez ve Bahçelievler Keşif Ağı | ${SITE_CONFIG.brandName}`,
  description:
    'Çelikpen Kocasinan Merkez Mah. Mahmutbey Cad. No: 345 Bahçelievler/İstanbul fabrika showroomumuz ve 11 mahalle gezici lazerli keşif noktalarımız.',
};

export default function SatisNoktalariPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-slate-700 sm:px-6">
      <MinimalSubpageHeader
        breadcrumbLabel="Satış Noktaları"
        overline="FABRİKA SHOWROOM & HİZMET BÖLGELERİ"
        title="Satış Noktaları ve Showroom"
        subtitle="Kocasinan Merkez üretim tesisimizden tüm Bahçelievler ve Avrupa Yakası ilçelerine aynı gün ücretsiz lazerli keşif."
      />

      <SalesPointsDirectory />
    </main>
  );
}
