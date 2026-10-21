import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { BLOG_POSTS } from '../../config/blog.config';

const CONTENT = {
  metaTitle: `Cam Balkon Mevzuat & Teknik Rehber Blogu | ${SITE_CONFIG.brandName}`,
  metaDescription:
    'Eylül 2026 Yargıtay 4/5 kat maliki muvafakatname kararı, ısıcamlı cam balkon yalıtım rehberi ve Bahçelievler kentsel dönüşüm apartman standartları.',
  badge: 'Mevzuat, Akustik & Mimari Rehber',
  heading: 'Çelikpen Cam Balkon Bilgi Bankası & Hukuki Rehberler',
  subheading:
    'Apartman yönetim kararları, 4/5 muvafakatname şablonları ve balkon yalıtım teknolojileri hakkında güncel uzman yazıları.',
  readMoreLabel: 'Rehberi Oku & Formu İndir →',
  readingSuffix: 'dk okuma',
};

export const metadata: Metadata = generatePageMetadata({
  title: CONTENT.metaTitle,
  description: CONTENT.metaDescription,
  path: '/blog',
  keywords: [
    'cam balkon blog',
    'Yargıtay cam balkon kararı',
    '4/5 muvafakatname',
    'cam balkon mevzuatı',
    'ısıcamlı cam balkon rehberi',
  ],
});

export default function BlogListPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-slate-700">
      <div className="mb-8">
        <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
          {CONTENT.badge}
        </span>
        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{CONTENT.heading}</h1>
        <p className="mt-2 text-sm text-slate-600">{CONTENT.subheading}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between rounded-xl border border-celikpen-border bg-white p-6 shadow-sm transition hover:border-celikpen-brand-soft hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="rounded bg-celikpen-cta/10 px-2.5 py-0.5 font-bold text-celikpen-cta">
                  {post.tag}
                </span>
                <span>
                  <time dateTime={post.date}>{post.date}</time> • {post.readingMin}{' '}
                  {CONTENT.readingSuffix}
                </span>
              </div>

              <h2 className="mt-3 text-xl font-bold text-slate-900">
                <Link
                  prefetch={true}
                  href={`/blog/${post.slug}`} className="hover:text-celikpen-brand-soft">
                  {post.title}
                </Link>
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
            </div>

            <div className="mt-5 border-t border-celikpen-border pt-4">
              <Link
                prefetch={true}
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-celikpen-brand-soft hover:underline"
              >
                {CONTENT.readMoreLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
