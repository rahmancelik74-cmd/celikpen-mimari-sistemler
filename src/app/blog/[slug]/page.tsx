import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generatePageMetadata } from '../../../config/seo.config';
import { BLOG_POSTS, getBlogPost } from '../../../data/blogPosts';
import { BlogArticle } from '../../../components/blog/BlogArticle';
import {
  blogPostPath,
  buildBlogPostingSchema,
  buildFaqSchema,
} from '../../../components/blog/blogSchema';
import { JsonLd, buildBreadcrumbSchema } from '../../../components/SeoJsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.seoTitle,
    description: post.metaDescription,
    path: blogPostPath(post.slug),
    keywords: post.keywords,
    image: post.image,
    imageAlt: post.imageAlt,
  });
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Blog', path: '/profesyoneller/blog' },
    { name: post.title, path: blogPostPath(post.slug) },
  ]);
  const articleSchema = buildBlogPostingSchema(post);
  const faqSchema = buildFaqSchema(post);

  return (
    <main>
      <JsonLd data={breadcrumbSchema} id={`blog-${post.slug}-breadcrumb-jsonld`} />
      <JsonLd data={articleSchema} id={`blog-${post.slug}-article-jsonld`} />
      <JsonLd data={faqSchema} id={`blog-${post.slug}-faq-jsonld`} />
      <BlogArticle
        post={post}
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
