'use client';

import React, { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
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
 * - Arama + kategori filtreleri
 * - Öne çıkan amiral gemisi makale
 * - Kartlar gerçek /blog/[slug] bağlantılarıdır (SEO); normal tıklamada sayfa
 *   yenilenmeden interaktif okuyucu görünümü açılır (?yazi=slug).
 */
export function BlogHub({ basePath, breadcrumbLabel = 'Blog' }: { basePath: string; breadcrumbLabel?: string }) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState<'all' | BlogCategory>('all');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // URL’deki ?yazi= parametresiyle senkronizasyon (geri/ileri tuşları dahil)
  useEffect(() => {
    const sync = () => {
      const slug = new URLSearchParams(window.location.search).get(READER_PARAM);
      setActiveSlug(slug && getBlogPost(slug) ? slug : null);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const openPost = useCallback(
    (slug: string) => {
      window.history.pushState({ [READER_PARAM]: slug }, '', `${basePath}?${READER_PARAM}=${slug}`);
      setActiveSlug(slug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [basePath],
  );

  const closePost = useCallback(() => {
    window.history.pushState({}, '', basePath);
    setActiveSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [basePath]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLocaleLowerCase('tr-TR');
    return BLOG_POSTS.filter((post) => {
      const inCategory = category === 'all' || post.category === category;
      const haystack = [post.title, post.excerpt, post.category, ...post.keywords].join(' ').toLocaleLowerCase('tr-TR');
      return inCategory && (!q || haystack.includes(q));
    });
  }, [category, deferredQuery]);

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

  const showFeatured = category === 'all' && !deferredQuery.trim();
  const gridPosts = showFeatured ? filtered.filter((p) => p.slug !== FEATURED_BLOG_POST.slug) : filtered;
  const faqs = hubFaqs(BLOG_POSTS);

  return (
    <>
      {/* ------------------------------ Editoryal Hero ------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#1E293B] to-[#0F172A] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="container-shell relative py-12 sm:py-16">
          <nav aria-label="Sayfa yolu" className="text-[11px] text-slate-300">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-sky-200">{breadcrumbLabel}</li>
            </ol>
          </nav>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300">Çelikpen Mimari Rehber</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            Cam Balkon, PVC Pencere ve Kış Bahçesi Rehberleri
          </h1>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-300 sm:text-[15px]">
            30 yıllık saha tecrübemizle hazırladığımız teknik rehberler: güncel m² fiyatları, yalıtım değerleri, sistem karşılaştırmaları ve
            Bahçelievler’e özel uygulama ipuçları.
          </p>

          <div className="mt-8 max-w-xl">
            <label htmlFor="blog-arama" className="sr-only">Rehberlerde ara</label>
            <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-1.5 backdrop-blur">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ml-3 h-4 w-4 shrink-0 text-slate-300" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="blog-arama"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Örn. ısıcamlı cam balkon fiyatı, Dorado 76, pergola…"
                className="min-h-[44px] w-full bg-transparent px-2 text-[13.5px] text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Kategoriler">
            {(['all', ...BLOG_CATEGORIES] as const).map((cat) => {
              const selected = category === cat;
              const count = cat === 'all' ? BLOG_POSTS.length : BLOG_POSTS.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => startTransition(() => setCategory(cat))}
                  className={`rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold transition-colors ${
                    selected ? 'bg-white text-[#1E3A8A]' : 'border border-white/20 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {cat === 'all' ? 'Tümü' : cat} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container-shell py-10 sm:py-14">
        {/* ------------------------------ Öne Çıkan Makale ------------------------------ */}
        {showFeatured && (
          <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
              <Image
                src={FEATURED_BLOG_POST.image}
                alt={FEATURED_BLOG_POST.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Öne çıkan rehber
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full bg-sky-50 px-2.5 py-1 font-semibold text-sky-700">{FEATURED_BLOG_POST.category}</span>
                <span className="text-slate-500">{FEATURED_BLOG_POST.readTime} dk okuma</span>
                <span className="text-slate-400">·</span>
                <time dateTime={FEATURED_BLOG_POST.updatedDate} className="text-slate-500">
                  {formatBlogDate(FEATURED_BLOG_POST.updatedDate)}
                </time>
              </div>
              <h2 className="mt-3 text-xl font-bold leading-snug text-[#0F172A] sm:text-2xl">{FEATURED_BLOG_POST.title}</h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">{FEATURED_BLOG_POST.excerpt}</p>
              <ul className="mt-4 space-y-1.5">
                {FEATURED_BLOG_POST.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-[12.5px] text-slate-700">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                    {h}
                  </li>
                ))}
              </ul>
              <PostLink
                post={FEATURED_BLOG_POST}
                onOpen={openPost}
                className="mt-6 inline-flex min-h-[46px] w-fit items-center rounded-xl bg-[#1E3A8A] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
              >
                Rehberi Oku →
              </PostLink>
            </div>
          </article>
        )}

        {/* ------------------------------ Makale Kartları ------------------------------ */}
        <section aria-labelledby="tum-rehberler" className={showFeatured ? 'mt-12' : ''}>
          <div className="flex items-end justify-between gap-4">
            <h2 id="tum-rehberler" className="text-lg font-bold text-[#0F172A] sm:text-xl">
              {showFeatured ? 'Tüm rehberler' : `${filtered.length} rehber bulundu`}
            </h2>
          </div>
          {gridPosts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
              <p className="text-sm font-semibold text-[#0F172A]">Aramanıza uygun rehber bulunamadı.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                }}
                className="mt-4 rounded-lg bg-[#1E3A8A] px-4 py-2 text-[12px] font-semibold text-white"
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
                  <PostLink post={post} onOpen={openPost} className="relative block aspect-[16/10] overflow-hidden" ariaHidden>
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#1E3A8A] backdrop-blur">
                      {post.category}
                    </span>
                  </PostLink>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <time dateTime={post.updatedDate}>{formatBlogDate(post.updatedDate)}</time>
                      <span>·</span>
                      <span>{post.readTime} dk okuma</span>
                    </div>
                    <h3 className="mt-2 text-[15px] font-bold leading-snug text-[#0F172A]">
                      <PostLink post={post} onOpen={openPost} className="hover:text-[#1E3A8A]">
                        {post.title}
                      </PostLink>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-slate-600">{post.excerpt}</p>
                    <PostLink post={post} onOpen={openPost} className="mt-auto pt-4 text-[12px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8]">
                      Rehberi Oku →
                    </PostLink>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ------------------------------ SSS ------------------------------ */}
        <section id="sss" aria-labelledby="blog-sss" className="mt-14">
          <h2 id="blog-sss" className="text-lg font-bold text-[#0F172A] sm:text-xl">Sıkça Sorulan Sorular</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[13.5px] font-semibold text-[#0F172A]">{faq.question}</h3>
                  <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#1E3A8A] transition-transform group-open:rotate-45">
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">Ücretsiz keşif</p>
            <h2 className="mt-1.5 text-xl font-bold">Mimarlarımızdan Ücretsiz Keşif İsteyin</h2>
            <p className="mt-2 max-w-xl text-[13px] text-slate-300">Ölçü, danışmanlık ve net fiyat aynı gün — Bahçelievler’in tüm mahallelerinde.</p>
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

/** Gerçek makale bağlantısı; normal tıklamada okuyucu görünümünü açar. */
function PostLink({
  post,
  onOpen,
  className,
  children,
  ariaHidden = false,
}: {
  post: BlogPost;
  onOpen: (slug: string) => void;
  className?: string;
  children: React.ReactNode;
  ariaHidden?: boolean;
}) {
  return (
    <Link
      href={blogPostPath(post.slug)}
      prefetch={false}
      className={className}
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        onOpen(post.slug);
      }}
    >
      {children}
    </Link>
  );
}
