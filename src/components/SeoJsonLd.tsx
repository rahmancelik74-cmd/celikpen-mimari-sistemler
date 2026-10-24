import React from 'react';
import { SITE_CONFIG } from '../config/site.config';
import { TESTIMONIALS } from '../config/testimonials.config';
import { CELIKPEN_PRICING_CONFIG } from '../config/pricing.config';
import {
  SEO_BUSINESS,
  SEO_FAQS,
  SEO_ICON,
  SEO_SERVICE_GROUPS,
  ISTANBUL_DISTRICTS,
  absoluteUrl,
} from '../config/seo.config';

const BUSINESS_ID = absoluteUrl('/#business');
const ORGANIZATION_ID = absoluteUrl('/#organization');
const WEBSITE_ID = absoluteUrl('/#website');

const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  opens: '08:30',
  closes: '19:30',
};

const AREA_SERVED = [
  {
    '@type': 'City',
    name: 'İstanbul',
    containedInPlace: { '@type': 'Country', name: 'Türkiye' },
  },
  ...ISTANBUL_DISTRICTS.map((district) => ({
    '@type': 'AdministrativeArea',
    name: `${district}, İstanbul`,
    containedInPlace: { '@type': 'City', name: 'İstanbul' },
  })),
  ...SITE_CONFIG.neighborhoods.map((neighborhood) => ({
    '@type': 'Place',
    name: `${neighborhood.name}, Bahçelievler, İstanbul`,
    containedInPlace: { '@type': 'AdministrativeArea', name: 'Bahçelievler, İstanbul' },
  })),
];

const REVIEWS = TESTIMONIALS.map((testimonial) => ({
  '@type': 'Review',
  author: {
    '@type': 'Person',
    name: testimonial.name,
  },
  datePublished: testimonial.date,
  reviewRating: {
    '@type': 'Rating',
    ratingValue: testimonial.rating,
    bestRating: '5',
    worstRating: '1',
  },
  reviewBody: testimonial.comment,
  itemReviewed: { '@id': BUSINESS_ID },
}));

const SERVICE_ITEMS = SEO_SERVICE_GROUPS.map((service, index) => ({
  '@type': 'ListItem',
  position: index + 1,
  name: service.name,
  url: absoluteUrl(service.href),
  item: {
    '@type': 'Service',
    '@id': `${absoluteUrl('/')}#service-${index + 1}`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    provider: { '@id': BUSINESS_ID },
    areaServed: [
      { '@type': 'City', name: 'İstanbul' },
      { '@type': 'AdministrativeArea', name: 'Bahçelievler, İstanbul' },
    ],
    url: absoluteUrl(service.href),
  },
}));

const PRICES = Object.values(CELIKPEN_PRICING_CONFIG.systems).map(
  (system) => system.netPricePerM2
);
const LOW_PRICE = Math.min(...PRICES);
const HIGH_PRICE = Math.max(...PRICES);

/**
 * Site genelinde bir kez basılan JSON-LD grafiği.
 * LocalBusiness + Organization + WebSite + hizmet kataloğu + FAQ zengin sonuçları.
 */
export function SeoJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
        '@id': BUSINESS_ID,
        name: SEO_BUSINESS.name,
        alternateName: [
          SITE_CONFIG.fullTitle,
          `${SITE_CONFIG.brandName} Cam Balkon`,
          'Çelikpen Cam Balkon & Mimari Cam Sistemleri',
        ],
        description: SEO_BUSINESS.description,
        foundingDate: SEO_BUSINESS.foundingDate,
        slogan: SEO_BUSINESS.slogan,
        foundingLocation: SEO_BUSINESS.foundingLocation,
        url: SITE_CONFIG.siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(SEO_ICON),
          width: 512,
          height: 512,
        },
        image: [absoluteUrl('/images/kocasinan-isicamli-cam-balkon-hero.jpg')],
        telephone: SEO_BUSINESS.telephone,
        priceRange: SEO_BUSINESS.priceRange,
        currenciesAccepted: 'TRY',
        paymentAccepted: 'Nakit, Kredi Kartı, Havale/EFT',
        address: {
          '@type': 'PostalAddress',
          ...SEO_BUSINESS.address,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SEO_BUSINESS.geo.latitude,
          longitude: SEO_BUSINESS.geo.longitude,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${SEO_BUSINESS.geo.latitude},${SEO_BUSINESS.geo.longitude}`,
        openingHoursSpecification: [OPENING_HOURS],
        areaServed: AREA_SERVED,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: SEO_BUSINESS.aggregateRating.ratingValue,
          reviewCount: SEO_BUSINESS.aggregateRating.reviewCount,
          bestRating: SEO_BUSINESS.aggregateRating.bestRating,
          worstRating: SEO_BUSINESS.aggregateRating.worstRating,
        },
        review: REVIEWS,
        makesOffer: SERVICE_ITEMS.map((item) => ({
          '@type': 'Offer',
          itemOffered: item.item,
          priceCurrency: 'TRY',
          priceSpecification: {
            '@type': 'AggregateOffer',
            lowPrice: LOW_PRICE,
            highPrice: HIGH_PRICE,
            priceCurrency: 'TRY',
            offerCount: PRICES.length,
          },
        })),
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: absoluteUrl('/iletisim?form=kesif'),
            inLanguage: 'tr-TR',
            actionPlatform: [
              'https://schema.org/DesktopWebPlatform',
              'https://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'Reservation',
            name: 'Ücretsiz Lazerli Keşif Randevusu',
          },
        },
      },
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: SEO_BUSINESS.name,
        url: SITE_CONFIG.siteUrl,
        logo: absoluteUrl(SEO_ICON),
        description: SEO_BUSINESS.description,
        foundingDate: SEO_BUSINESS.foundingDate,
        slogan: SEO_BUSINESS.slogan,
        foundingLocation: SEO_BUSINESS.foundingLocation,
        address: {
          '@type': 'PostalAddress',
          ...SEO_BUSINESS.address,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: SEO_BUSINESS.telephone,
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: ['Turkish', 'English'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_CONFIG.siteUrl,
        name: `${SITE_CONFIG.brandName} Cam Balkon & Mimari Cam Sistemleri`,
        description: SEO_BUSINESS.description,
        inLanguage: 'tr-TR',
        publisher: { '@id': ORGANIZATION_ID },
        about: { '@id': BUSINESS_ID },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_CONFIG.siteUrl}/urunler?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': absoluteUrl('/#webpage'),
        url: SITE_CONFIG.siteUrl,
        name: SITE_CONFIG.fullTitle,
        description: SEO_BUSINESS.description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': BUSINESS_ID },
        inLanguage: 'tr-TR',
      },
      {
        '@type': 'ItemList',
        '@id': absoluteUrl('/#services'),
        name: 'Çelikpen Mimari Cam ve Doğrama Hizmetleri',
        description:
          'Cam balkon, giyotin cam, bioklimatik pergola, kış bahçesi, sürme cam, alüminyum & PVC doğrama, plise perde ve sineklik hizmetleri.',
        numberOfItems: SERVICE_ITEMS.length,
        itemListElement: SERVICE_ITEMS,
      },
      {
        '@type': 'FAQPage',
        '@id': absoluteUrl('/#sss'),
        name: 'Çelikpen Cam Balkon Sıkça Sorulan Sorular',
        mainEntity: SEO_FAQS.map((faq) => ({
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

  return <JsonLd data={schema} id="celikpen-seo-jsonld" />;
}

/* ============================================================================
   YENİDEN KULLANILABİLİR JSON-LD ARAÇLARI
   ========================================================================== */

export function JsonLd({
  data,
  id,
}: {
  data: Record<string, unknown>;
  id?: string;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  serviceType,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: {
      '@id': BUSINESS_ID,
      '@type': 'LocalBusiness',
      name: SEO_BUSINESS.name,
      telephone: SEO_BUSINESS.telephone,
      address: {
        '@type': 'PostalAddress',
        ...SEO_BUSINESS.address,
      },
    },
    areaServed:
      areaServed?.map((area) => ({
        '@type': 'AdministrativeArea',
        name: area,
      })) ?? [
        { '@type': 'City', name: 'İstanbul' },
        { '@type': 'AdministrativeArea', name: 'Bahçelievler, İstanbul' },
      ],
  };
}

export function buildProductSchema({
  name,
  description,
  sku,
  category,
  path,
  image,
  lowPrice = LOW_PRICE,
  highPrice = HIGH_PRICE,
}: {
  name: string;
  description: string;
  sku: string;
  category: string;
  path: string;
  image?: string;
  lowPrice?: number;
  highPrice?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    sku,
    category,
    description,
    image: [image ? absoluteUrl(image) : absoluteUrl('/images/products/cam-balkon-default.svg')],
    brand: {
      '@type': 'Brand',
      name: SEO_BUSINESS.name,
    },
    url: absoluteUrl(path),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'TRY',
      lowPrice,
      highPrice,
      offerCount: 1,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        '@id': BUSINESS_ID,
        name: SEO_BUSINESS.name,
      },
    },
  };
}

export function buildWebPageSchema({
  name,
  description,
  path,
  type = 'WebPage',
}: {
  name: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    inLanguage: 'tr-TR',
    publisher: { '@id': ORGANIZATION_ID },
  };
}
