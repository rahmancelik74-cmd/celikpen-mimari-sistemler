import React from 'react';
import { SITE_CONFIG } from '../config/site.config';
import { CELIKPEN_PRICING_CONFIG } from '../config/pricing.config';

export function SeoSchema() {
  const prices = Object.values(CELIKPEN_PRICING_CONFIG.systems).map(
    (s) => s.netPricePerM2
  );
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
        '@id': 'https://www.celikpen.com.tr/#business',
        name: SITE_CONFIG.fullTitle,
        description: SITE_CONFIG.slogan,
        telephone: SITE_CONFIG.phoneDisplay,
        priceRange: '₺₺',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address,
          addressLocality: 'Bahçelievler',
          addressRegion: 'İstanbul',
          postalCode: '34192',
          addressCountry: 'TR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE_CONFIG.coordinates.latitude,
          longitude: SITE_CONFIG.coordinates.longitude,
        },
        areaServed: SITE_CONFIG.neighborhoods.map((n) => ({
          '@type': 'Place',
          name: `${n.name}, Bahçelievler, İstanbul`,
        })),
      },
      {
        '@type': 'Product',
        name: 'Çelikpen Bahçelievler Cam Balkon Sistemleri (m²)',
        brand: {
          '@type': 'Brand',
          name: SITE_CONFIG.brandName,
        },
        description:
          'Kocasinan üretimli 8mm/10mm Katlanır, 4+20+4 Argon Gazlı Isıcamlı, Eşiksiz Sürme ve Motorlu Giyotin Cam Balkon Sistemleri.',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'TRY',
          lowPrice,
          highPrice,
          offerCount: Object.keys(CELIKPEN_PRICING_CONFIG.systems).length,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: SITE_CONFIG.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
