import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import { BLOG_POSTS, FEATURED_BLOG_POST } from '../../../data/blogPosts';
import { BlogHub } from '../../../components/blog/BlogHub';
import {
  buildAggregateFaqSchema,
  buildBlogPostingSchema,
  buildBlogSchema,
  hubFaqs,
} from '../../../components/blog/blogSchema';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../../components/SeoJsonLd';

const PAGE_TITLE =
  'Mimari Rehber & Blog Merkezi — Isıcamlı Cam Balkon, Winsa PVC ve Kış Bahçesi Rehberleri';
const PAGE_DESCRIPTION =
  '2026 ısıcamlı cam balkon m² fiyatları, Winsa Dorado 76 ve Revotech Gold karşılaştırması, katlanır ve eşiksiz sürme sistemler, motorlu giyotin cam ve bioklimatik pergola mühendislik rehberleri.';

export const metadata: Metadata = generatePageMetadata({
  title: `${PAGE_TITLE} | ${SITE_CONFIG.brandName}`,
  description: PAGE_DESCRIPTION,
  path: '/profesyoneller/blog',
  keywords: BLOG_POSTS.flatMap((post) => post.keywords),
  image: FEATURED_BLOG_POST.image,
  imageAlt: FEATURED_BLOG_POST.imageAlt,
});

export default function ProfessionalBlogPage() {
  const path = '/profesyoneller/blog';
  const webPageSchema = buildWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path,
    type: 'CollectionPage',
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Profesyoneller', path: '/profesyoneller' },
    { name: 'Blog', path },
  ]);
  const blogSchema = buildBlogSchema(BLOG_POSTS, path);
  const featuredArticleSchema = buildBlogPostingSchema(FEATURED_BLOG_POST);
  const faqSchema = buildAggregateFaqSchema(hubFaqs(BLOG_POSTS), path);

  return (
    <main>
      <JsonLd data={webPageSchema} id="profesyoneller-blog-webpage-jsonld" />
      <JsonLd data={breadcrumbSchema} id="profesyoneller-blog-breadcrumb-jsonld" />
      <JsonLd data={blogSchema} id="profesyoneller-blog-jsonld" />
      <JsonLd data={featuredArticleSchema} id="profesyoneller-blog-featured-article-jsonld" />
      <JsonLd data={faqSchema} id="profesyoneller-blog-faq-jsonld" />
      <BlogHub basePath={path} breadcrumbLabel="Profesyoneller / Blog" />
    </main>
  );
}
