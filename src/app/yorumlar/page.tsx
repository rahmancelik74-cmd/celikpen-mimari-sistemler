import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { TESTIMONIALS } from '../../config/testimonials.config';

const CONTENT = {
  metaTitle: `Bahçelievler Cam Balkon Müşteri Yorumları | ${SITE_CONFIG.brandName}`,
  metaDescription:
    'Kocasinan, Şirinevler, Siyavuşpaşa ve Soğanlı mahallelerinde Çelikpen cam balkon montajı yaptıran daire sahiplerinin gerçek deneyimleri.',
  badge: 'Bahçelievler Saha Deneyimleri • Şeffaf Müşteri Geri Bildirimleri',
  heading: 'Çelikpen Cam Balkon Müşteri Yorumları ve Mahalle Deneyimleri',
  subheading:
    'Kocasinan Merkez atölyemizden Bahçelievler’in 11 mahallesinde gerçekleştirdiğimiz ısıcamlı, katlanır, sürme ve giyotin cam balkon uygulamalarına dair değerlendirmeler.',
  avgLabel: 'Ortalama Memnuniyet Puanı',
  reviewCountSuffix: 'Doğrulanmış Montaj Değerlendirmesi',
  ctaCalculator: 'Balkonunuz İçin Net m² Fiyat Hesapla →',
};

export const metadata: Metadata = {
  title: CONTENT.metaTitle,
  description: CONTENT.metaDescription,
};

export default function YorumlarPage() {
  const reviewCount = TESTIMONIALS.length;
  const ratingSum = TESTIMONIALS.reduce((acc, item) => acc + item.rating, 0);
  const ratingValue = reviewCount > 0 ? (ratingSum / reviewCount).toFixed(1) : '5.0';

  const neighborhoodNameBySlug = Object.fromEntries(
    SITE_CONFIG.neighborhoods.map((n) => [n.slug, n.name])
  );

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.siteUrl}/#business`,
    name: SITE_CONFIG.fullTitle,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    review: TESTIMONIALS.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
      },
      datePublished: t.date,
      reviewBody: t.comment,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-10 text-slate-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Üst Başlık ve Dinamik Ortalama Puan Özeti */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-celikpen-border pb-8">
        <div>
          <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
            {CONTENT.badge}
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{CONTENT.heading}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{CONTENT.subheading}</p>
        </div>

        <div className="rounded-2xl border border-celikpen-border bg-celikpen-subtle px-5 py-4 text-right">
          <div className="text-xs text-slate-500">{CONTENT.avgLabel}</div>
          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="text-2xl font-black text-celikpen-cta">{ratingValue} / 5.0</span>
            <span className="text-sm text-celikpen-cta" aria-hidden="true">
              ★★★★★
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600">
            {reviewCount.toLocaleString('tr-TR')} {CONTENT.reviewCountSuffix}
          </div>
        </div>
      </div>

      {/* Yorum Kartları Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((item, idx) => {
          const neighborhoodName =
            neighborhoodNameBySlug[item.neighborhoodSlug] || item.neighborhoodSlug;
          return (
            <article
              key={`${item.name}-${idx}`}
              className="flex flex-col justify-between rounded-xl border border-celikpen-border bg-white p-5 shadow-sm transition hover:border-celikpen-brand-soft hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/bahcelievler/${item.neighborhoodSlug}`}
                    className="rounded bg-celikpen-brand/10 px-2.5 py-0.5 text-xs font-bold text-celikpen-brand hover:underline"
                  >
                    {neighborhoodName}
                  </Link>
                  <span className="text-xs font-semibold text-slate-500">{item.systemCode}</span>
                </div>

                <div
                  className="mt-3 text-sm text-celikpen-cta"
                  aria-label={`${item.rating} üzerinden 5 yıldız`}
                >
                  {'★'.repeat(item.rating)}
                  {'☆'.repeat(5 - item.rating)}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-700">“{item.comment}”</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-celikpen-border pt-3 text-xs text-slate-500">
                <span className="font-bold text-slate-900">{item.name}</span>
                <time dateTime={item.date}>{item.date}</time>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/fiyat-hesapla"
          className="inline-block rounded-lg bg-celikpen-cta px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-rose-500"
        >
          {CONTENT.ctaCalculator}
        </Link>
      </div>
    </main>
  );
}
