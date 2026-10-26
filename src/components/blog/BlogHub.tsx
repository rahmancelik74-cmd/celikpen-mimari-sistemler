'use client';

import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ALL_BLOG_TAGS,
  BLOG_CATEGORIES,
  BLOG_POSTS,
  FEATURED_BLOG_POST,
  formatBlogDate,
  getBlogPost,
  type BlogCategory,
  type BlogPost,
} from '../../data/blogPosts';
import { BlogArticle } from './BlogArticle';
import { blogPostPath, hubFaqs } from './blogSchema';

const READER_PARAM = 'yazi';

/**
 * Lüks editoryal blog merkezi.
 * - Arama + kategori + popüler anahtar kelime etiketi (#Tag) filtreleri
 * - Öne çıkan amiral gemisi makale
 * - Kartlar doğrudan SEO dostu /profesyoneller/blog/[slug] ve /blog/[slug] URL'lerine gider;
 *   eski ?yazi=slug parametresiyle gelen bağlantıları da geriye dönük destekler.
 */
export function BlogHub({
  basePath,
  breadcrumbLabel = 'Blog',
}: {
  basePath: string;
  breadcrumbLabel?: string;
}) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState<'all' | BlogCategory>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get(READER_PARAM);
      const tagParam = params.get('etiket');
      setActiveSlug(slug && getBlogPost(slug) ? slug : null);
      if (tagParam) setSelectedTag(tagParam);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const closePost = useCallback(() => {
    window.history.pushState({}, '', basePath);
    setActiveSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [basePath]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLocaleLowerCase('tr-TR');
    return BLOG_POSTS.filter((post) => {
      const inCategory = category === 'all' || post.category === category;
      const inTag = !selectedTag || post.tags.includes(selectedTag);
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        post.primaryKeyword,
        ...post.secondaryKeywords,
        ...post.tags,
        ...post.keywords,
      ]
        .join(' ')
        .toLocaleLowerCase('tr-TR');
      return inCategory && inTag && (!q || haystack.includes(q));
    });
  }, [category, selectedTag, deferredQuery]);

  const activePost = activeSlug ? getBlogPost(activeSlug) : undefined;

  if (activePost) {
    return (
      <BlogArticle
        post={activePost}
        breadcrumbBase={{ label: breadcrumbLabel, href: basePath }}
        backSlot={
          <button
            type="button"
            onClick={closePost}
            className="mb-5 inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-[12px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            ← Tüm rehberlere dön
          </button>
        }
      />
    );
  }

  const showFeatured = category === 'all' && !selectedTag && !deferredQuery.trim();
  const gridPosts = showFeatured
    ? filtered.filter((p) => p.slug !== FEATURED_BLOG_POST.slug)
    : filtered;
  const faqs = hubFaqs(BLOG_POSTS);

  return (
    <>
      {/* ------------------------------ Editoryal Hero ------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#1E293B] to-[#0F172A] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl"
        />
        <div className="container-shell relative py-12 sm:py-16">
          <nav aria-label="Sayfa yolu" className="text-[11px] text-slate-300">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-sky-200">{breadcrumbLabel}</li>
            </ol>
          </nav>
          <span className="mt-4 inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-200">
            Çelikpen Mimari Rehber &amp; Mühendislik Kütüphanesi
          </span>
          <h1 className="mt-4 max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">
            Cam Balkon, Winsa PVC ve Kış Bahçesi İçin Mühendis Rehberleri
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            2026 güncel m² birim fiyatları, ısı ve ses yalıtımı ($U_w$, dB) karşılaştırmaları, TSE EN 14351-1 standartları ve 30 yıllık Bahçelievler saha tecrübemizle hazırlanan teknik makaleler.
          </p>

          {/* Arama + kategori filtresi */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1 sm:max-w-md">
              <span className="sr-only">Rehberlerde ara</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Örn: ısıcamlı cam balkon, Dorado 76, giyotin, pergola..."
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-white/10 px-4 text-[13px] text-white placeholder:text-slate-300 backdrop-blur focus:border-sky-300 focus:outline-none"
              />
            </label>
            <div
              role="tablist"
              aria-label="Kategoriler"
              className="flex flex-wrap gap-1.5"
            >
              {(['all', ...BLOG_CATEGORIES] as const).map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(cat)}
                    className={`min-h-[36px] rounded-full px-3.5 text-[11.5px] font-semibold transition-colors ${
                      active
                        ? 'bg-white text-[#1E3A8A]'
                        : 'border border-white/15 bg-white/5 text-slate-200 hover:bg-white/15'
                    }`}
                  >
                    {cat === 'all' ? 'Tümü' : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popüler Etiketler (Tags) */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] font-semibold text-sky-200">Popüler Etiketler:</span>
            {ALL_BLOG_TAGS.slice(0, 12).map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag((curr) => (curr === tag ? null : tag))}
                  className={`rounded-full px-2.5 py-1 text-[10.5px] font-medium transition-colors ${
                    active
                      ? 'bg-orange-600 text-white'
                      : 'border border-white/15 bg-white/10 text-sky-100 hover:bg-white/20'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {selectedTag && (
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="ml-1 text-[11px] font-semibold text-orange-300 underline hover:text-white"
              >
                Etiketi Temizle
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container-shell py-10 sm:py-14">
        {/* ------------------------------ Öne Çıkan Makale ------------------------------ */}
        {showFeatured && (
          <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
            <Link
              href={blogPostPath(FEATURED_BLOG_POST.slug, basePath)}
              className="relative block aspect-[16/10] lg:aspect-auto lg:min-h-[380px]"
            >
              <Image
                src={FEATURED_BLOG_POST.image}
                alt={FEATURED_BLOG_POST.imageAlt}
                title={FEATURED_BLOG_POST.imageTitle}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Öne Çıkan Rehber
              </span>
            </Link>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full bg-sky-50 px-2.5 py-1 font-semibold text-sky-700">
                  {FEATURED_BLOG_POST.category}
                </span>
                <span className="text-slate-500">{FEATURED_BLOG_POST.readTime} dk okuma</span>
                <span className="text-slate-400">·</span>
                <time dateTime={FEATURED_BLOG_POST.updatedDate} className="text-slate-500">
                  {formatBlogDate(FEATURED_BLOG_POST.updatedDate)}
                </time>
                <span className="text-slate-400">·</span>
                <span className="font-semibold text-[#1E3A8A]">
                  {FEATURED_BLOG_POST.initialComments.length} Yorum
                </span>
              </div>

              <h2 className="mt-3 text-xl font-bold leading-snug text-[#0F172A] sm:text-2xl">
                <Link
                  href={blogPostPath(FEATURED_BLOG_POST.slug, basePath)}
                  className="hover:text-[#1E3A8A]"
                >
                  {FEATURED_BLOG_POST.title}
                </Link>
              </h2>

              <p className="mt-1.5 text-[11.5px] font-medium text-slate-500">
                Yazar: <strong className="text-slate-700">{FEATURED_BLOG_POST.author.name}</strong> ({FEATURED_BLOG_POST.author.role})
              </p>

              <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                {FEATURED_BLOG_POST.excerpt}
              </p>

              <ul className="mt-4 space-y-1.5">
                {FEATURED_BLOG_POST.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-[12.5px] text-slate-700">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {FEATURED_BLOG_POST.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-medium text-[#1E3A8A] hover:bg-sky-100"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <Link
                href={blogPostPath(FEATURED_BLOG_POST.slug, basePath)}
                className="mt-6 inline-flex min-h-[46px] w-fit items-center rounded-xl bg-[#1E3A8A] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
              >
                Rehberi Oku →
              </Link>
            </div>
          </article>
        )}

        {/* ------------------------------ Makale Kartları ------------------------------ */}
        <section aria-labelledby="tum-rehberler" className={showFeatured ? 'mt-12' : ''}>
          <div className="flex items-end justify-between gap-4">
            <h2 id="tum-rehberler" className="text-lg font-bold text-[#0F172A] sm:text-xl">
              {showFeatured ? 'Tüm Teknik Rehberler' : `${filtered.length} rehber bulundu`}
            </h2>
          </div>
          {gridPosts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
              <p className="text-sm font-semibold text-[#0F172A]">
                Aramanıza uygun rehber bulunamadı.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                  setSelectedTag(null);
                }}
                className="mt-4 rounded-lg bg-[#1E3A8A] px-4 py-2 text-[12px] font-semibold text-white"
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post: BlogPost) => {
                const postUrl = blogPostPath(post.slug, basePath);
                return (
                  <article
                    key={post.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                  >
                    <Link
                      href={postUrl}
                      className="relative block aspect-[16/10] overflow-hidden"
                    >
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        title={post.imageTitle}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#1E3A8A] backdrop-blur">
                        {post.category}
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <time dateTime={post.updatedDate}>{formatBlogDate(post.updatedDate)}</time>
                        <span>·</span>
                        <span>{post.readTime} dk okuma</span>
                        <span>·</span>
                        <span className="font-semibold text-[#1E3A8A]">
                          {post.initialComments.length} Yorum
                        </span>
                      </div>

                      <h3 className="mt-2 text-[15px] font-bold leading-snug text-[#0F172A]">
                        <Link href={postUrl} className="hover:text-[#1E3A8A]">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="mt-1 text-[11px] font-medium text-slate-500">
                        {post.author.name}
                      </p>

                      <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-slate-600">
                        {post.excerpt}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTag(tag)}
                            className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 hover:bg-sky-50 hover:text-[#1E3A8A]"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <Link
                        href={postUrl}
                        className="mt-auto pt-4 text-[12px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8]"
                      >
                        Rehberi Oku →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ------------------------------ SSS ------------------------------ */}
        <section id="sss" aria-labelledby="blog-sss" className="mt-14">
          <h2 id="blog-sss" className="text-lg font-bold text-[#0F172A] sm:text-xl">
            Sıkça Sorulan Sorular
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[13.5px] font-semibold text-[#0F172A]">{faq.question}</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#1E3A8A] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------ Dönüşüm ------------------------------ */}
        <section className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#0F172A] p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              Ücretsiz keşif
            </p>
            <h2 className="mt-1.5 text-xl font-bold">Mimarlarımızdan Ücretsiz Keşif İsteyin</h2>
            <p className="mt-2 max-w-xl text-[13px] text-slate-300">
              Ölçü, danışmanlık ve net fiyat aynı gün — Bahçelievler’in tüm mahallelerinde.
            </p>
          </div>
          <Link
            href="/iletisim?form=kesif"
            className="inline-flex min-h-[46px] shrink-0 items-center rounded-xl bg-orange-600 px-5 text-[13px] font-semibold text-white hover:bg-orange-700"
          >
            Keşif Randevusu Al
          </Link>
        </section>
      </div>
    </>
  );
}
