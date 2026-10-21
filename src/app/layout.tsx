import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { SITE_CONFIG } from '../config/site.config';
import {
  SEO_BUSINESS,
  SEO_ICON,
  generatePageMetadata,
} from '../config/seo.config';
import { SeoJsonLd } from '../components/SeoJsonLd';
import { SiteHeader } from '../components/header/MegaMenu';
import { Footer } from '../components/Footer';
import { PageTransitionBar } from '../components/PageTransitionBar';
import { InstantPrefetcher } from '../components/InstantPrefetcher';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins',
});

const baseMetadata = generatePageMetadata({
  title: SITE_CONFIG.fullTitle,
  description: SEO_BUSINESS.description,
  path: '/',
  keywords: [
    'Bahçelievler cam balkon',
    'Kocasinan cam balkon',
    'İstanbul cam balkon üretici',
    'ısıcamlı cam balkon fiyatları',
  ],
  imageAlt:
    'Çelikpen Bahçelievler Kocasinan Merkez ısıcamlı cam balkon ve bioklimatik pergola uygulaması',
});

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  applicationName: `${SITE_CONFIG.brandName} Cam Balkon & Mimari Cam Sistemleri`,
  authors: [{ name: SEO_BUSINESS.name, url: SITE_CONFIG.siteUrl }],
  creator: SEO_BUSINESS.name,
  publisher: SEO_BUSINESS.name,
  category: 'construction',
  classification: 'Cam balkon, mimari cam sistemleri ve alüminyum doğrama',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: SEO_ICON, type: 'image/svg+xml' },
    ],
    shortcut: SEO_ICON,
    apple: SEO_ICON,
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F172A',
  colorScheme: 'light',
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
        <InstantPrefetcher />
        <SeoJsonLd />

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
