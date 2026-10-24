'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MAGAZINE_CATEGORIES,
  MAGAZINE_POSTS,
  type MagazineCategory,
  type MagazinePost,
} from '../../config/professional-magazine.config';

const ALL_CATEGORIES = ['Tümü', ...MAGAZINE_CATEGORIES] as const;

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function BlogHub() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<(typeof ALL_CATEGORIES)[number]>(
    'Tümü'
  );
  const [selectedPost, setSelectedPost] = useState<MagazinePost | null>(null);

  const featuredPost = useMemo(
    () => MAGAZINE_POSTS.find((post) => post.featured) ?? MAGAZINE_POSTS[0],
    []
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('tr-TR');
    return MAGAZINE_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'Tümü' || post.filterCategory === selectedCategory;
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        post.filterCategory,
        post.author,
        ...post.keyTakeaways,
      ]
        .join(' ')
        .toLocaleLowerCase('tr-TR');
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [query, selectedCategory]);

  const showFeatured = query.trim() === '' && selectedCategory === 'Tümü';
  const cardPosts = showFeatured
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : filteredPosts;

  useEffect(() => {
    if (!selectedPost) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPost(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('Tümü');
  };

  return (
    <div className="bg-[#F8FAFC] pb-16">
      {/* Navy editoryal başlık */}
      <section className="relative overflow-hidden bg-[#0F172A] pt-10 pb-14 text-white sm:pt-14 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,197,253,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.16) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#1E3A8A] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-[#D91B24]/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10.5px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Ana Sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/profesyoneller" className="transition-colors hover:text-white">
              Profesyoneller
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-sky-200">Blog</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24]" aria-hidden="true" />
                Mimari Rehber &amp; Blog Merkezi
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px]">
                Cam balkondan PVC cepheye,{' '}
                <span className="text-sky-300">doğru kararın mühendislik rehberi.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[12.5px] leading-6 text-slate-300 sm:text-[13px]">
                1996’dan bugüne 30 yıllık saha tecrübesi, Winsa sistem bilgisi ve İstanbul
                cephelerinden gerçek uygulama notları. Isı yalıtımından montaj detayına kadar
                bilmeniz gereken her şey tek merkezde.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-sm">
              <label
                htmlFor="magazine-search"
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-sky-200"
              >
                Rehberlerde ara
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </span>
                <input
                  id="magazine-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Isıcam, HS 76, pergola, bakım..."
                  className="w-full rounded-xl border border-white/15 bg-slate-950/55 py-2.5 pl-9 pr-3 text-xs font-medium text-white placeholder:text-slate-500 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300/20"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                <span>{filteredPosts.length} rehber listeleniyor</span>
                <span className="font-semibold text-sky-200">4–7 dk okuma</span>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            <span>Isı &amp; ses yalıtımı</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
            <span>Winsa sistem karşılaştırmaları</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
            <span>Montaj ve bakım</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
            <span>Mevzuat</span>
          </div>
        </div>
      </section>

      <div className="container-shell relative -mt-7">
        {/* Kategori filtreleri */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.45)] sm:p-4">
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Blog kategorileri">
            {ALL_CATEGORIES.map((category) => {
              const selected = selectedCategory === category;
              const count =
                category === 'Tümü'
                  ? MAGAZINE_POSTS.length
                  : MAGAZINE_POSTS.filter((post) => post.filterCategory === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setSelectedCategory(category as MagazineCategory | 'Tümü')}
                  className={`rounded-lg px-3 py-2 text-[11px] font-bold transition ${
                    selected
                      ? 'bg-[#1E3A8A] text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
                  }`}
                >
                  {category}
                  <span
                    className={`ml-1.5 text-[9.5px] font-semibold ${
                      selected ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Öne çıkan editoryal kart */}
        {showFeatured && (
          <article className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_65px_-40px_rgba(15,23,42,0.55)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <button
                type="button"
                onClick={() => setSelectedPost(featuredPost)}
                className="group relative min-h-[280px] overflow-hidden bg-slate-900 text-left lg:min-h-[390px]"
                aria-label={`${featuredPost.title} rehberini oku`}
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt}
                  width={1000}
                  height={700}
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#D91B24] px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.15em] text-white">
                      Öne Çıkan Rehber
                    </span>
                    <span className="rounded-full border border-white/25 bg-slate-950/45 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-sky-100 backdrop-blur-sm">
                      {featuredPost.filterCategory}
                    </span>
                  </div>
                  <h2 className="mt-3 max-w-xl text-xl font-black leading-tight text-white sm:text-2xl">
                    {featuredPost.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[10.5px] font-medium text-slate-300">
                    <span>{featuredPost.author}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-500" aria-hidden="true" />
                    <span>{featuredPost.date}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-500" aria-hidden="true" />
                    <span className="font-bold text-sky-200">{featuredPost.readTime}</span>
                  </div>
                </div>
              </button>

              <div className="flex flex-col justify-between p-5 sm:p-7">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1E3A8A]">
                    Editörün seçimi
                  </div>
                  <p className="mt-2 text-[12.5px] leading-6 text-slate-600">
                    {featuredPost.excerpt}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {featuredPost.keyTakeaways.map((item) => (
                      <li key={item} className="flex gap-2 text-[11.5px] leading-5 text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPost(featuredPost)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8]"
                  >
                    Makaleyi Oku
                    <span aria-hidden="true">→</span>
                  </button>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Rehber kartları */}
        <section className="mt-8" aria-labelledby="rehber-listesi-baslik">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3A8A]">
                Tüm yazılar
              </span>
              <h2 id="rehber-listesi-baslik" className="mt-1 text-xl font-black text-[#0F172A]">
                {showFeatured ? 'Öne çıkanın devamında' : 'Aramanıza uygun rehberler'}
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              {cardPosts.length + (showFeatured ? 1 : 0)} yazı
            </span>
          </div>

          {cardPosts.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <p className="text-sm font-bold text-[#0F172A]">Aramanıza uygun rehber bulunamadı.</p>
              <p className="mt-1 text-xs text-slate-500">
                Farklı bir kelime deneyin veya kategori filtresini temizleyin.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-lg bg-[#1E3A8A] px-4 py-2 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8]"
              >
                Tüm rehberleri göster
              </button>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cardPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-34px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-[0_24px_48px_-30px_rgba(30,58,138,0.4)]"
                  onClick={() => setSelectedPost(post)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedPost(post);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${post.title} rehberini oku`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      width={720}
                      height={450}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-md border border-white/20 bg-slate-950/65 px-2 py-1 text-[9.5px] font-bold uppercase tracking-[0.12em] text-sky-100 backdrop-blur-sm">
                      {post.filterCategory}
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-md bg-white/95 px-2 py-1 text-[9.5px] font-extrabold text-[#1E3A8A]">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                      <span className="text-[#1E3A8A]">{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="mt-2 text-[14px] font-black leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[11.5px] leading-5 text-slate-600">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                      <span className="text-[10px] font-semibold text-slate-500">{post.author}</span>
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-extrabold text-[#1E3A8A]">
                        Oku
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Bilgi notu */}
        <div className="mt-9 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 sm:flex-row sm:items-center">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1E3A8A]">
              Projeniz için teknik destek
            </div>
            <p className="mt-1 text-[12px] leading-5 text-slate-600">
              Cephe ölçüsü, sistem seçimi ve 2026 m² fiyatları için mühendislik ekibimizle
              konuşun.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/fiyat-hesapla"
              className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              Fiyat Hesapla
            </Link>
            <Link
              href="/iletisim?form=kesif"
              className="rounded-lg border border-[#1E3A8A]/30 bg-white px-4 py-2.5 text-[11px] font-bold text-[#1E3A8A] transition hover:border-[#1E3A8A]"
            >
              Ücretsiz Keşif
            </Link>
          </div>
        </div>
      </div>

      {/* Tam makale okuyucu modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#020617]/75 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-reader-title"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative shrink-0 overflow-hidden bg-slate-900">
              <Image
                src={selectedPost.image}
                alt={selectedPost.imageAlt}
                width={1200}
                height={600}
                sizes="(min-width: 768px) 768px, 100vw"
                className="h-44 w-full object-cover sm:h-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/25 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Makaleyi kapat"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/65 text-white backdrop-blur-sm transition hover:bg-slate-950"
              >
                <CloseIcon />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.12em]">
                  <span className="rounded bg-[#1E3A8A] px-2 py-1 text-white">
                    {selectedPost.filterCategory}
                  </span>
                  <span className="text-sky-100">{selectedPost.readTime}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-200">{selectedPost.date}</span>
                </div>
                <h2
                  id="article-reader-title"
                  className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl"
                >
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Yazar
                  </div>
                  <div className="text-[12px] font-extrabold text-[#0F172A]">
                    {selectedPost.author}
                  </div>
                </div>
                <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-[10px] font-bold text-[#1E3A8A]">
                  Çelikpen Teknik Yayın
                </span>
              </div>

              <p className="mt-4 text-[12.5px] font-medium leading-6 text-slate-600">
                {selectedPost.excerpt}
              </p>

              <div className="mt-5 rounded-xl border border-[#BFDBFE] bg-[#F8FAFC] p-4">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1E3A8A]">
                  Kısa özet
                </div>
                <ul className="mt-2 space-y-2">
                  {selectedPost.keyTakeaways.map((item) => (
                    <li key={item} className="flex gap-2 text-[11.5px] leading-5 text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D91B24]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-6">
                {selectedPost.sections.map((section) => (
                  <section key={section.heading}>
                    <h3 className="text-[15px] font-black leading-snug text-[#0F172A]">
                      {section.heading}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-6 text-slate-600">{section.body}</p>
                  </section>
                ))}
              </div>

              <div className="mt-7 flex flex-col justify-between gap-3 rounded-xl bg-[#0F172A] p-4 sm:flex-row sm:items-center">
                <div>
                  <div className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-sky-300">
                    İlgili ürün ve hesaplama
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-300">
                    Rehberde anlatılan sistemi inceleyin veya güncel m² fiyatı hesaplayın.
                  </p>
                </div>
                <Link
                  href={selectedPost.ctaHref}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[11px] font-bold text-[#0F172A] transition hover:bg-sky-100"
                >
                  {selectedPost.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
