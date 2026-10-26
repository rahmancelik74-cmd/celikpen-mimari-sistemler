import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { BLOG_POSTS, FEATURED_BLOG_POST } from '../../data/blogPosts';
import { BlogHub } from '../../components/blog/BlogHub';
import {
  buildAggregateFaqSchema,
  buildBlogPostingSchema,
  buildBlogSchema,
  hubFaqs,
} from '../../components/blog/blogSchema';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../components/SeoJsonLd';

const PAGE_TITLE = 'Mimari Rehber & Blog — Cam Balkon, PVC Doğrama ve Kış Bahçesi';
const PAGE_DESCRIPTION =
  '2026 ısıcamlı cam balkon m² fiyatları, Winsa Dorado 76 ve Revotech Gold karşılaştırması, katlanır ve eşiksiz sürme sistemler, motorlu giyotin cam ve bioklimatik pergola teknik rehberleri.';

export const metadata: Metadata = generatePageMetadata({
  title: `${PAGE_TITLE} | ${SITE_CONFIG.brandName}`,
  description: PAGE_DESCRIPTION,
  path: '/blog',
  keywords: BLOG_POSTS.flatMap((post) => post.keywords),
  image: FEATURED_BLOG_POST.image,
  imageAlt: FEATURED_BLOG_POST.imageAlt,
});

export default function BlogPage() {
  const path = '/blog';
  const webPageSchema = buildWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path,
    type: 'CollectionPage',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Blog', path },
  ]);
  const blogSchema = buildBlogSchema(BLOG_POSTS, path);
  const featuredArticleSchema = buildBlogPostingSchema(FEATURED_BLOG_POST);
  const faqSchema = buildAggregateFaqSchema(hubFaqs(BLOG_POSTS), path);

  return (
    <main>
      <JsonLd data={webPageSchema} id="blog-webpage-jsonld" />
      <JsonLd data={breadcrumbSchema} id="blog-breadcrumb-jsonld" />
      <JsonLd data={blogSchema} id="blog-jsonld" />
      <JsonLd data={featuredArticleSchema} id="blog-featured-article-jsonld" />
      <JsonLd data={faqSchema} id="blog-faq-jsonld" />
      <BlogHub basePath={path} breadcrumbLabel="Blog" />
    </main>
  );
}
