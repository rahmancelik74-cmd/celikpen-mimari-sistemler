import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../config/site.config';
import { SeoSchema } from '../components/SeoSchema';
import { SiteHeader } from '../components/header/MegaMenu';
import { Footer } from '../components/Footer';
import { PageTransitionBar } from '../components/PageTransitionBar';
import './globals.css';

export const metadata: Metadata = {
  title: SITE_CONFIG.fullTitle,
  description:
    'Bahçelievler Kocasinan merkezli Çelikpen Cam Balkon & Mimari Sistemler: Winsa standardında PVC Pencere (Revotech Gold, Dorado 76, Safir), Kaldır-Sür (Panorama HS), 4+20+4 Argon Gazlı Isıcamlı Cam Balkon ve Monoblok Panjur sistemleri.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="marble-cream-bg text-slate-900 antialiased">
        <PageTransitionBar />
        <SeoSchema />

        {/* Ana Sayfa İlk Konteynerde Şeffaf, Kaydırınca ve İç Sayfalarda Kurumsal Header */}
        <SiteHeader>{children}</SiteHeader>

        {/* Winsa 2x4 Kurumsal Mimari Mermer Dokulu Footer */}
        <Footer />
      </body>
    </html>
  );
}
