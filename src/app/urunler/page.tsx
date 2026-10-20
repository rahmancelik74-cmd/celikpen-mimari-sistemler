import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { WINSA_PRODUCTS } from '../../config/winsa-products.config';
import { WinsaCatalogGrid } from '../../components/WinsaCatalogGrid';
import { MinimalSubpageHeader } from '../../components/MinimalSubpageHeader';
import { InteractiveLabPreview } from '../../components/InnovativeShowcase';

export const metadata: Metadata = {
  title: `Ürünlerimiz — Cam Balkon, Kış Bahçesi, Giyotin ve PVC Sistemler | ${SITE_CONFIG.brandName}`,
  description:
    'Revotech Gold, Dorado 76, Safir 76/70, Panorama HS 76 Kaldır-Sür, Comfort Slide, Lotus, Vera 4+20+4 Isıcamlı Cam Balkon ve Winstor Panjur sistemleri mimari ürün kataloğu.',
};

export default function UrunlerHubPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-slate-700 sm:px-6">
      <MinimalSubpageHeader
        breadcrumbLabel="Ürünlerimiz"
        overline={`MİMARİ KOLEKSİYON • ${WINSA_PRODUCTS.length} SERİ`}
        title="Ürünlerimiz ve Sistem Gruplarımız"
        subtitle="Yüksek ısı ve ses yalıtımlı PVC doğrama, Kaldır-Sür teras kapıları, temperli cam balkon ve panjur sistemlerimiz."
        rightAction={
          <Link
            href="/profesyoneller/kataloglar"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#0B1560]/20 bg-white px-4 py-2 text-xs font-bold text-[#0B1560] shadow-2xs transition hover:border-[#D91B24] hover:text-[#D91B24]"
          >
            <span>2026 Dijital Kataloglar</span>
            <span>→</span>
          </Link>
        }
      />

      <WinsaCatalogGrid />

      <div className="mt-12">
        <InteractiveLabPreview />
      </div>
    </main>
  );
}
