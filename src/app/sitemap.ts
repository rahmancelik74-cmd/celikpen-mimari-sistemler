import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '../config/site.config';
import { WINSA_PRODUCTS } from '../config/winsa-products.config';
import { PROFESSIONAL_SUBPAGES } from '../config/winsa-professionals.config';
import { CORPORATE_SUBPAGES } from '../config/winsa-corporate.config';
import { BLOG_POSTS } from '../data/blogPosts';

/**
 * Tüm kamuya açık rotaları tek kaynaktan üretir.
 * Öncelikler: ana sayfa 1.0, ürünler 0.9, mahalle sayfaları 0.85,
 * profesyonel/kurumsal alt sayfalar 0.8.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/hizmetlerimiz`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/urunler`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/urunler/winsa`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/urunler/albert-genau`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/fiyat-hesapla`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/satis-noktalari`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/iletisim`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/karsilastir`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/galeri`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/yorumlar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/kurumsal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/projelerimiz`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/profesyoneller`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/hakkimizda`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${base}/nasil-calisiriz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${base}/bahcelievler-cam-balkon`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/profesyoneller/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/blog/eylul-2026-yargitay-cam-balkon-karari`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const blogArticleRoutes: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) => [
    {
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(`${post.updatedDate}T00:00:00Z`),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${base}/profesyoneller/blog/${post.slug}`,
      lastModified: new Date(`${post.updatedDate}T00:00:00Z`),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
  ]);

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
    priority: 0.8,
  }));

  const corporateSubRoutes: MetadataRoute.Sitemap = CORPORATE_SUBPAGES.map((sub) => ({
    url: `${base}/kurumsal/${sub.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = SITE_CONFIG.productSeries.map((p) => ({
    url: `${base}/sistemler/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const neighborhoodRoutes: MetadataRoute.Sitemap = SITE_CONFIG.neighborhoods.map((n) => ({
    url: `${base}/bahcelievler/${n.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...blogArticleRoutes,
    ...winsaCatalogRoutes,
    ...professionalSubRoutes,
    ...corporateSubRoutes,
    ...productRoutes,
    ...neighborhoodRoutes,
  ];
}
