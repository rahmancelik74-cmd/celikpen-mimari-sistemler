import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { GOOGLE_MAPS_REVIEW_URL, TESTIMONIALS } from '../../config/testimonials.config';
import { CustomerReviews } from '../../components/CustomerReviews';

export const metadata: Metadata = generatePageMetadata({
  title: `Google Haritalar Onaylı Müşteri Yorumları — Avrupa Yakası Cam Balkon | ${SITE_CONFIG.brandName}`,
  description:
    'Bakırköy Florya, Beşiktaş Etiler, Sarıyer Zekeriyaköy, Başakşehir Bahçeşehir, Bahçelievler ve Beylikdüzü projelerimize ait Google Haritalar doğrulanmış müşteri değerlendirmeleri.',
  path: '/yorumlar',
  keywords: [
    'Çelikpen Google yorumları',
    'Avrupa Yakası cam balkon yorumları',
    'Bakırköy Florya cam balkon memnuniyet',
    'ısıcamlı cam balkon müşteri yorumları',
  ],
});

export default function YorumlarPage() {
  return (
    <main className="min-h-screen bg-white pb-14 pt-6 text-slate-700">
      <CustomerReviews />

      <div className="container-shell mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          prefetch={true}
          href="/fiyat-hesapla"
          className="inline-flex rounded-xl bg-[#1E3A8A] px-6 py-3.5 text-xs font-extrabold text-white shadow transition hover:bg-[#1D4ED8]"
        >
          Balkonunuz İçin Net m² Fiyat Hesapla →
        </Link>
        <a
          href={GOOGLE_MAPS_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-extrabold text-[#0F172A] transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
        >
          Google Haritalar İşletme Profilimizi Görüntüle ↗
        </a>
      </div>
    </main>
  );
}
