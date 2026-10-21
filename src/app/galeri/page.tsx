import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../../config/seo.config';
import { GalleryGrid } from '../../components/GalleryGrid';

const CONTENT = {
  metaTitle: 'Bahçelievler Cam Balkon Proje Galerisi | Çelikpen',
  metaDescription:
    'Kocasinan, Şirinevler, Siyavuşpaşa ve Soğanlı mahallelerinde uyguladığımız ısıcamlı, katlanır, sürme, giyotin ve kış bahçesi cam balkon projeleri.',
  badge: 'Kocasinan Merkez Üretim • Saha Uygulama Örnekleri',
  heading: 'Bahçelievler Cam Balkon Proje Galerisi',
  subheading:
    'Mahallenizdeki apartman ve teras tiplerine göre uyguladığımız antrasit, mat siyah ve kumlama buzlu cam balkon referanslarımız.',
};

export const metadata: Metadata = generatePageMetadata({
  title: CONTENT.metaTitle,
  description: CONTENT.metaDescription,
  path: '/galeri',
  keywords: [
    'Bahçelievler cam balkon galerisi',
    'cam balkon projeleri İstanbul',
    'Kocasinan cam balkon uygulama',
    'giyotin cam balkon fotoğrafları',
  ],
});

export default function GaleriPage() {
  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-10 text-slate-700">
      <div className="mb-8">
        <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
          {CONTENT.badge}
        </span>
        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{CONTENT.heading}</h1>
        <p className="mt-2 text-sm text-slate-600">{CONTENT.subheading}</p>
      </div>

      <GalleryGrid />
    </main>
  );
}
