import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { WINSA_PRODUCTS } from '../../config/winsa-products.config';
import { WinsaCatalogGrid } from '../../components/WinsaCatalogGrid';
import { MinimalSubpageHeader } from '../../components/MinimalSubpageHeader';

export const metadata: Metadata = generatePageMetadata({
  title: `Ürünlerimiz — Cam Balkon, Kış Bahçesi, Giyotin ve PVC Sistemler | ${SITE_CONFIG.brandName}`,
  description:
    'Revotech Gold, Dorado 76, Safir 76/70, Panorama HS 76 Kaldır-Sür, Comfort Slide, Lotus, Vera 4+20+4 Isıcamlı Cam Balkon ve Winstor Panjur sistemleri mimari ürün kataloğu.',
  path: '/urunler',
  keywords: [
    'cam balkon modelleri',
    'ısıcamlı cam balkon serileri',
    'giyotin cam sistemleri',
    'PVC pencere sistemleri',
    'alüminyum doğrama kataloğu',
  ],
});

export default function UrunlerHubPage() {
  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-8 text-slate-700 sm:px-6 lg:px-8">
      <MinimalSubpageHeader
        breadcrumbLabel="Ürünlerimiz"
        overline={`MİMARİ KOLEKSİYON • ${WINSA_PRODUCTS.length} SERİ`}
        title="Ürünlerimiz ve Sistem Gruplarımız"
        subtitle="Yüksek ısı ve ses yalıtımlı PVC doğrama, Kaldır-Sür teras kapıları, temperli cam balkon ve panjur sistemlerimiz."
        rightAction={
          <Link
            prefetch={true}
            href="/profesyoneller/kataloglar"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#BFDBFE] bg-white px-4 py-2.5 text-[11px] font-semibold text-[#1D4ED8] shadow-xs transition-colors hover:bg-[#EFF6FF]"
          >
            <span>2026 Dijital Kataloglar</span>
            <span>→</span>
          </Link>
        }
      />

      <WinsaCatalogGrid />
    </main>
  );
}
