import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { SalesPointsDirectory } from '../../components/SalesPointsDirectory';
import { MinimalSubpageHeader } from '../../components/MinimalSubpageHeader';
import { LocalBusinessMapCard } from '../../components/LocalBusinessMapCard';

export const metadata: Metadata = generatePageMetadata({
  title: `Satış Noktaları & Showroom — Kocasinan Merkez ve Bahçelievler Keşif Ağı | ${SITE_CONFIG.brandName}`,
  description:
    'Çelikpen Kocasinan Merkez Mah. Mahmutbey Cad. No: 345 Bahçelievler/İstanbul fabrika showroomumuz ve 11 mahalle gezici lazerli keşif noktalarımız.',
  path: '/satis-noktalari',
  keywords: [
    'Çelikpen showroom',
    'Bahçelievler cam balkon showroom',
    'Kocasinan Merkez fabrika',
    'cam balkon satış noktaları',
  ],
});

export default function SatisNoktalariPage() {
  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-8 text-slate-700 sm:px-6 lg:px-8">
      <MinimalSubpageHeader
        breadcrumbLabel="Satış Noktaları"
        overline="FABRİKA SHOWROOM & HİZMET BÖLGELERİ"
        title="Satış Noktaları ve Showroom"
        subtitle="Kocasinan Merkez üretim tesisimizden tüm Bahçelievler ve Avrupa Yakası ilçelerine aynı gün ücretsiz lazerli keşif."
      />

      <SalesPointsDirectory />
      <LocalBusinessMapCard className="mt-10" />
    </main>
  );
}
