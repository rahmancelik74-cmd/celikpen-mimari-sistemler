import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import {
  absoluteUrl,
  generatePageMetadata,
} from '../../../config/seo.config';
import { MuvafakatnameForm } from '../../../components/MuvafakatnameForm';
import {
  JsonLd,
  buildBreadcrumbSchema,
} from '../../../components/SeoJsonLd';

const BLOG_PATH = '/blog/eylul-2026-yargitay-cam-balkon-karari';
const BLOG_TITLE =
  'Eylül 2026 Yargıtay Cam Balkon Kararı: Apartmanda Yasal İzin ve 4/5 Muvafakatname Rehberi';
const BLOG_DESCRIPTION =
  'Kat Mülkiyeti Kanunu Madde 19 ve Eylül 2026 Yargıtay kararına göre apartmanda cam balkon izni, 4/5 kat maliki muvafakatnamesi ve 5 adımlı yasal montaj protokolü.';

export const metadata: Metadata = generatePageMetadata({
  title: `${BLOG_TITLE} | Çelikpen`,
  description: BLOG_DESCRIPTION,
  path: BLOG_PATH,
  keywords: [
    'Yargıtay cam balkon kararı',
    'apartmanda cam balkon izni',
    '4/5 muvafakatname',
    'kat mülkiyeti kanunu 19 cam balkon',
    'cam balkon yasal süreç',
  ],
});

export default function YargitayKarariBlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    image: [absoluteUrl('/images/kocasinan-isicamli-cam-balkon-hero.jpg')],
    datePublished: '2026-09-20',
    dateModified: '2026-10-01',
    inLanguage: 'tr-TR',
    articleSection: 'Cam Balkon Mevzuatı',
    author: {
      '@type': 'Organization',
      name: 'Çelikpen Mimari Cam & Doğrama Sistemleri',
      url: SITE_CONFIG.siteUrl,
    },
    publisher: {
      '@id': absoluteUrl('/#organization'),
      '@type': 'Organization',
      name: 'Çelikpen Mimari Cam & Doğrama Sistemleri',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.svg'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(BLOG_PATH),
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Eylül 2026 Yargıtay Cam Balkon Kararı', path: BLOG_PATH },
  ]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-slate-700 print:py-2">
      <JsonLd data={blogSchema} id="blogposting-jsonld" />
      <JsonLd data={breadcrumbSchema} id="blog-breadcrumb-jsonld" />
      <div className="mb-6 flex items-center justify-between text-xs text-slate-500 print:hidden">
        <Link href="/" className="hover:text-celikpen-brand-soft">
          ← Ana Sayfaya Dön
        </Link>
        <Link href="/fiyat-hesapla" className="font-semibold text-celikpen-brand-soft hover:underline">
          Canlı m² Fiyat Hesapla →
        </Link>
      </div>

      <div className="print:hidden">
        <span className="rounded-full bg-celikpen-cta/10 px-3 py-1 text-xs font-bold text-celikpen-cta">
          Hukuki Rehber & Ücretsiz 4/5 Muvafakatname Kiti
        </span>
        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">
          Eylül 2026 Yargıtay Cam Balkon Kararı: Apartmanda Yasal İzin ve 4/5 Muvafakatname Rehberi
        </h1>
        <p className="mt-4 text-slate-600">
          Kat Mülkiyeti Kanunu Madde 19 uyarınca apartman dış cephe bütünlüğünü koruyan ve kat
          maliklerinin 4/5 (%80) yazılı rızasını içeren 5 adımlı Çelikpen Kurumsal Montaj Protokolü:
        </p>
        <h2 className="mt-6 text-xl font-bold text-slate-900">
          5 Adımlı Yasal Cam Balkon Montaj Protokolü
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-sm text-slate-700">
          <li>
            <strong className="text-slate-900">Yönetim Planı ve Mimari Proje Kontrolü:</strong>{' '}
            Binanın yönetim planında açık hüküm olup olmadığının incelenmesi.
          </li>
          <li>
            <strong className="text-slate-900">Bina Cephe Emsali ve Renk Standardizasyonu:</strong>{' '}
            Mevcut bina doğramasına (Antrasit Gri RAL 7016, Mat Siyah vb.) birebir uyumlu alüminyum
            profil seçimi.
          </li>
          <li>
            <strong className="text-slate-900">4/5 (%80) Kat Maliki Yazılı Muvafakatname Alımı:</strong>{' '}
            Çelikpen ücretsiz keşif ekibinin sunduğu hazır muvafakatname çizelgesiyle yazılı onay
            alınması.
          </li>
          <li>
            <strong className="text-slate-900">Karar Defteri Kaydı ve İmar Uyumu:</strong> Ara duvar
            yıkımı yapılmaksızın yalnızca katlanır/sürme temperli sistem uygulanması.
          </li>
          <li>
            <strong className="text-slate-900">TSE EN 12150 Belgeli Kurulum:</strong>{' '}
            {SITE_CONFIG.warranties.glassCertification} garanti belgesi teslimi.
          </li>
        </ol>
      </div>

      <MuvafakatnameForm />
    </main>
  );
}
