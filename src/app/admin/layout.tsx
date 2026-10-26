import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yönetim Paneli (CMS) | Çelikpen Cam Balkon & Mimari Sistemler',
  description:
    'Çelikpen m² fiyat hesaplama, referans proje galerisi, Winsa & Albert Genau ürün kataloğu, blog SEO ve kurumsal iletişim yönetim paneli.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
}
