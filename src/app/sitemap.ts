import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '../config/site.config';
import { WINSA_PRODUCTS } from '../config/winsa-products.config';
import { PROFESSIONAL_SUBPAGES } from '../config/winsa-professionals.config';
import { CORPORATE_SUBPAGES } from '../config/winsa-corporate.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/kurumsal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/urunler`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${base}/satis-noktalari`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/profesyoneller`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/fiyat-hesapla`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/blog/eylul-2026-yargitay-cam-balkon-karari`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/karsilastir`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/nasil-calisiriz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/hakkimizda`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/iletisim`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/yorumlar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/galeri`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const winsaCatalogRoutes: MetadataRoute.Sitemap = WINSA_PRODUCTS.map((prod) => ({
    url: `${base}/urunler/${prod.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const professionalSubRoutes: MetadataRoute.Sitemap = PROFESSIONAL_SUBPAGES.map((sub) => ({
    url: `${base}/profesyoneller/${sub.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const corporateSubRoutes: MetadataRoute.Sitemap = CORPORATE_SUBPAGES.map((sub) => ({
    url: `${base}/kurumsal/${sub.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = SITE_CONFIG.productSeries.map((p) => ({
    url: `${base}/sistemler/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const neighborhoodRoutes: MetadataRoute.Sitemap = SITE_CONFIG.neighborhoods.map((n) => ({
    url: `${base}/bahcelievler/${n.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...winsaCatalogRoutes,
    ...professionalSubRoutes,
    ...corporateSubRoutes,
    ...productRoutes,
    ...neighborhoodRoutes,
  ];
}
