import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE_CONFIG } from '../../../../config/site.config';
import { absoluteUrl } from '../../../../config/seo.config';
import { getAllBlogSlugs, getBlogPost } from '../../../../data/blogPosts';
import { BlogArticle } from '../../../../components/blog/BlogArticle';
import {
  blogPostPath,
  buildBlogPostingSchema,
  buildFaqSchema,
} from '../../../../components/blog/blogSchema';
import { JsonLd, buildBreadcrumbSchema } from '../../../../components/SeoJsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const canonical = absoluteUrl(blogPostPath(post.slug, '/profesyoneller/blog'));
  const imageUrl = absoluteUrl(post.image.split('?')[0]);

  return {
    title: {
      absolute: post.seoTitle,
    },
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords, ...post.keywords],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      locale: 'tr_TR',
      url: canonical,
      siteName: `${SITE_CONFIG.brandName} Cam Balkon & Mimari Cam Sistemleri`,
      title: post.seoTitle,
      description: post.metaDescription,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProfessionalBlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Profesyoneller', path: '/profesyoneller' },
    { name: 'Blog', path: '/profesyoneller/blog' },
    { name: post.title, path: blogPostPath(post.slug, '/profesyoneller/blog') },
  ]);
  const articleSchema = buildBlogPostingSchema(post, '/profesyoneller/blog');
  const faqSchema = buildFaqSchema(post, '/profesyoneller/blog');

  return (
    <main>
      <JsonLd data={breadcrumbSchema} id={`prof-blog-${post.slug}-breadcrumb-jsonld`} />
      <JsonLd data={articleSchema} id={`prof-blog-${post.slug}-article-jsonld`} />
      <JsonLd data={faqSchema} id={`prof-blog-${post.slug}-faq-jsonld`} />
      <BlogArticle
        post={post}
        breadcrumbBase={{ label: 'Profesyoneller / Blog', href: '/profesyoneller/blog' }}
        backSlot={
          <Link
            href="/profesyoneller/blog"
            className="mb-5 inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-[12px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            ← Tüm rehberlere dön
          </Link>
        }
      />
    </main>
  );
}
