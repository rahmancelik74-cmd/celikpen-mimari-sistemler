import React from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { SITE_CONFIG } from '../config/site.config';
import { SeoSchema } from '../components/SeoSchema';
import { SiteHeader } from '../components/header/MegaMenu';
import { Footer } from '../components/Footer';
import { PageTransitionBar } from '../components/PageTransitionBar';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: SITE_CONFIG.fullTitle,
  description:
    'Bahçelievler Kocasinan merkezli Çelikpen Cam Balkon & Mimari Sistemler: Isıcamlı cam balkon, giyotin cam, bioklimatik pergola, kış bahçesi, sürme cam, alüminyum & PVC doğrama ve plise perde sistemleri.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={poppins.variable}>
      <body className="bg-white font-sans text-slate-800 antialiased">
        <PageTransitionBar />
        <SeoSchema />

        {/* Sabit üst bar + ana menü; tüm sayfalarda aynı kurumsal kabuk */}
        <SiteHeader>{children}</SiteHeader>

        {/* Mirabalkon ritminde çok kolonlu kurumsal footer */}
        <Footer />

        {/* Tüm rotalarda sabit kalan hızlı WhatsApp hattı */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
