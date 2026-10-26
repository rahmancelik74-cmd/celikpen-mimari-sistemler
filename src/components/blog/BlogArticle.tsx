import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '../../config/site.config';
import { absoluteUrl } from '../../config/seo.config';
import {
  BLOG_POSTS,
  formatBlogDate,
  type BlogInfographic,
  type BlogPost,
  type BlogSection,
  type BlogTable,
} from '../../data/blogPosts';
import { blogPostPath } from './blogSchema';
import { BlogCommentsSection, BlogShareBar } from './BlogInteractiveTools';
import { LiteYouTubeEmbed } from '../LiteYouTubeEmbed';
import { BacklinkCitationBox } from '../BacklinkCitationBox';

/**
 * Paragraf içindeki [Etiket](/ic-rota) veya [Etiket](https://dis-kaynak) ifadelerini
 * SEO uyumlu dahili <Link> veya harici <a rel="noopener noreferrer"> bağlantısına dönüştürür.
 */
function renderRichParagraph(text: string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    if (href.startsWith('http')) {
      parts.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#1E3A8A] underline decoration-sky-300 underline-offset-4 hover:text-[#1D4ED8]"
        >
          {label}
        </a>,
      );
    } else {
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-semibold text-[#1E3A8A] underline decoration-sky-300 underline-offset-4 hover:text-[#1D4ED8]"
        >
          {label}
        </Link>,
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function BlogArticle({
  post,
  backSlot,
  breadcrumbBase = { label: 'Blog', href: '/profesyoneller/blog' },
}: {
  post: BlogPost;
  backSlot?: React.ReactNode;
  breadcrumbBase?: { label: string; href: string };
}) {
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Merhaba, "${post.title}" yazınızı okudum. Ücretsiz keşif randevusu almak istiyorum.`,
  )}`;
  const canonicalArticleUrl = absoluteUrl(blogPostPath(post.slug, breadcrumbBase.href));

  return (
    <article itemScope itemType="https://schema.org/BlogPosting" className="bg-white">
      {/* ------------------------------ Başlık alanı ------------------------------ */}
      <header className="relative overflow-hidden bg-[#0F172A] text-white">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.imageAlt}
            title={post.imageTitle}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover opacity-30"
            itemProp="image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/70 via-[#0F172A]/85 to-[#0F172A]" />
        </div>
        <div className="container-shell relative py-10 sm:py-14">
          {backSlot}
          <nav aria-label="Sayfa yolu" className="mb-4 text-[11px] text-slate-300">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={breadcrumbBase.href} className="hover:text-white">
                  {breadcrumbBase.label}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-sky-200">{post.category}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-200">
              {post.category}
            </span>
            <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-200">
              ✓ Mühendislik Kurulu Onaylı (E-E-A-T)
            </span>
          </div>

          <h1
            itemProp="headline"
            className="mt-4 max-w-4xl text-2xl font-bold leading-tight sm:text-3xl lg:text-[2.4rem]"
          >
            {post.title}
          </h1>
          <p
            id="makale-ozeti"
            itemProp="description"
            className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base"
          >
            <strong className="font-semibold text-white">{post.primaryKeyword.toUpperCase()}:</strong>{' '}
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-slate-300">
            <span itemProp="author" itemScope itemType="https://schema.org/Person">
              <strong itemProp="name" className="font-semibold text-white">
                {post.author.name}
              </strong>
              <span className="text-slate-400"> · {post.author.role}</span>
            </span>
            <span>
              Yayın:{' '}
              <time itemProp="datePublished" dateTime={post.publishDate}>
                {formatBlogDate(post.publishDate)}
              </time>
            </span>
            <span>
              Güncelleme:{' '}
              <time itemProp="dateModified" dateTime={post.updatedDate}>
                {formatBlogDate(post.updatedDate)}
              </time>
            </span>
            <span>{post.readTime} dk okuma</span>
            <a href="#yorumlar" className="font-semibold text-sky-300 hover:underline">
              {post.initialComments.length} Yorum
            </a>
          </div>

          {/* Etiketler (Tags) */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`${breadcrumbBase.href}?etiket=${encodeURIComponent(tag)}`}
                className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-sky-100 transition-colors hover:bg-white/20"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ------------------------------ Gövde ------------------------------ */}
      <div className="container-shell grid gap-10 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-14">
        {/* İçindekiler */}
        <aside className="lg:order-none">
          <div className="lg:sticky lg:top-[130px]">
            <nav aria-label="İçindekiler" className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]">
                İçindekiler
              </p>
              <ol className="mt-3 space-y-1.5 text-[12.5px]">
                {post.tableOfContents.map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
                    <a
                      href={`#${item.id}`}
                      className={`block rounded-md px-2 py-1 leading-snug transition-colors hover:bg-white hover:text-[#1E3A8A] ${
                        item.level === 2 ? 'font-semibold text-[#0F172A]' : 'text-slate-500'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#video-inceleme"
                    className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]"
                  >
                    ▶ Sistem Video İncelemesi
                  </a>
                </li>
                <li>
                  <a
                    href="#infografik"
                    className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]"
                  >
                    Teknik İnfografik &amp; Analiz
                  </a>
                </li>
                <li>
                  <a
                    href="#kontrol-listesi"
                    className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]"
                  >
                    Adım Adım Kontrol Listesi
                  </a>
                </li>
                <li>
                  <a
                    href="#sesli-arama-yanitlari"
                    className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]"
                  >
                    Hızlı Yanıtlar (Sesli Arama)
                  </a>
                </li>
                <li>
                  <a
                    href="#sss"
                    className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]"
                  >
                    Sıkça Sorulan Sorular
                  </a>
                </li>
                <li>
                  <a
                    href="#bilimsel-kaynaklar"
                    className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]"
                  >
                    Standartlar &amp; Dış Kaynaklar
                  </a>
                </li>
                <li>
                  <a
                    href="#kaynak-goster-embed"
                    className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]"
                  >
                    Kaynak Göster / Embed Aracı
                  </a>
                </li>
                <li>
                  <a
                    href="#yorumlar"
                    className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]"
                  >
                    Okuyucu Yorumları ({post.initialComments.length})
                  </a>
                </li>
              </ol>
            </nav>

            <div className="mt-4 hidden rounded-2xl border border-orange-200 bg-orange-50 p-4 lg:block">
              <p className="text-[12px] font-semibold text-[#0F172A]">
                Balkonunuzun net fiyatını öğrenin
              </p>
              <Link
                href="/fiyat-hesapla"
                className="mt-3 flex min-h-[40px] items-center justify-center rounded-lg bg-orange-600 px-3 text-[12px] font-semibold text-white hover:bg-orange-700"
              >
                m² Fiyat Hesapla →
              </Link>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Üst Sosyal Paylaşım Çubuğu */}
          <BlogShareBar title={post.title} url={canonicalArticleUrl} />

          {/* Öne çıkanlar */}
          <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">
              Öne Çıkan Mühendislik Bulguları ({post.primaryKeyword})
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {post.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-xl bg-white px-3 py-2.5 text-[12.5px] font-medium leading-snug text-[#0F172A] shadow-xs"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Ana Görsel (SEO alt + title açıklamalı) */}
          <figure className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={post.image}
                alt={post.imageAlt}
                title={post.imageTitle}
                fill
                sizes="(min-width: 1024px) 780px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[11.5px] text-slate-600">
              <span>{post.imageTitle}</span>
              <span className="font-semibold text-[#1E3A8A]">Çelikpen Saha Uygulama Arşivi</span>
            </figcaption>
          </figure>

          {/* Makale Bölümleri */}
          <div itemProp="articleBody" className="mt-8 space-y-10">
            {post.sections.map((section) => (
              <ArticleSection key={section.id} section={section} />
            ))}
          </div>

          {/* Gömülü Winsa & Albert Genau Sistem Videosu (LiteYouTube + VideoObject Schema) */}
          <div id="video-inceleme" className="mt-12 scroll-mt-32">
            <LiteYouTubeEmbed slug={post.slug} />
          </div>

          {/* Gömülü Teknik İnfografik & Görsel Karşılaştırma Diyagramı */}
          {post.infographic.items.length > 0 && (
            <InfographicCard infographic={post.infographic} />
          )}

          {/* Numaralı Adım Adım Mühendislik Kontrol Listesi (<ol>) */}
          {post.numberedChecklist.length > 0 && (
            <section
              id="kontrol-listesi"
              aria-labelledby="kontrol-listesi-baslik"
              className="mt-12 scroll-mt-32 rounded-3xl border border-[#BFDBFE] bg-[#EFF6FF]/60 p-6 sm:p-8"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E3A8A]">
                Adım Adım Uygulama Rehberi
              </span>
              <h2
                id="kontrol-listesi-baslik"
                className="mt-1 text-xl font-bold text-[#0F172A] sm:text-2xl"
              >
                {post.numberedChecklistTitle}
              </h2>
              <ol className="mt-5 space-y-3">
                {post.numberedChecklist.map((step, idx) => (
                  <li
                    key={step}
                    className="flex items-start gap-3.5 rounded-2xl border border-white bg-white p-4 shadow-2xs"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A] text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="text-[14px] leading-relaxed text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Dahili Bağlantılar (Internal Links) Rehber Kutusu */}
          {post.internalLinks.length > 0 && (
            <section
              aria-labelledby="dahili-kaynaklar-baslik"
              className="mt-10 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E3A8A]">
                İlgili Ürün &amp; Hizmet Sayfalarımız
              </span>
              <h2 id="dahili-kaynaklar-baslik" className="mt-1 text-lg font-bold text-[#0F172A]">
                Konuyla İlgili Çelikpen Sistemleri ve Hesaplama Araçları
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {post.internalLinks.map((lnk) => (
                  <Link
                    key={lnk.href}
                    href={lnk.href}
                    className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:border-[#1E3A8A] hover:bg-[#EFF6FF]/50"
                  >
                    <span className="text-[13.5px] font-bold text-[#1E3A8A] group-hover:underline">
                      {lnk.label} →
                    </span>
                    <span className="mt-1 text-[12px] text-slate-600">{lnk.context}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Sesli Arama (Voice Search) & Doğal Dil Soru-Cevap Bölümü */}
          {post.voiceSearchQa.length > 0 && (
            <section
              id="sesli-arama-yanitlari"
              aria-labelledby="sesli-arama-baslik"
              className="mt-12 scroll-mt-32 rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                  Sesli Arama &amp; Hızlı Özet Yanıtlar (Speakable)
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-800">
                  Doğrudan Mühendis Yanıtı
                </span>
              </div>
              <h2 id="sesli-arama-baslik" className="mt-1.5 text-lg font-bold text-[#0F172A] sm:text-xl">
                Kullanıcıların En Çok Sorduğu Doğal Dil Soruları
              </h2>
              <div className="mt-4 space-y-3">
                {post.voiceSearchQa.map((vq) => (
                  <div
                    key={vq.spokenQuestion}
                    className="rounded-2xl border border-emerald-200/80 bg-white p-4"
                  >
                    <h3 className="text-[14px] font-bold text-[#0F172A]">
                      “{vq.spokenQuestion}”
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-700">
                      {vq.directAnswer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SSS */}
          <section id="sss" aria-labelledby="sss-baslik" className="mt-12 scroll-mt-32">
            <h2 id="sss-baslik" className="text-xl font-bold text-[#0F172A] sm:text-2xl">
              Sıkça Sorulan Sorular ({post.primaryKeyword})
            </h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {post.faqs.map((faq, index) => (
                <details key={faq.question} className="group px-5 py-4" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-semibold text-[#0F172A] [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[14px] font-semibold">{faq.question}</h3>
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#1E3A8A] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Bilimsel Kaynaklar, Uluslararası Standartlar ve Referans Kurumlar (External Links) */}
          <section
            id="bilimsel-kaynaklar"
            aria-labelledby="kaynaklar-baslik"
            className="mt-12 scroll-mt-32 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E3A8A]">
              Uluslararası Normlar &amp; Otorite Kaynaklar
            </span>
            <h2 id="kaynaklar-baslik" className="mt-1 text-lg font-bold text-[#0F172A] sm:text-xl">
              Bilimsel Kaynaklar, Standartlar ve Referans Kurumlar
            </h2>
            <p className="mt-1.5 text-[12.5px] text-slate-600">
              Bu teknik rehberdeki ısı iletim ($U_w, U_g$), akustik yalıtım ve rüzgâr yükü verileri aşağıdaki resmi kurum ve standartlara dayanmaktadır:
            </p>
            <ul className="mt-4 space-y-3">
              {post.externalReferences.map((ref) => (
                <li
                  key={ref.url}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4 transition-colors hover:border-sky-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] font-bold text-[#1E3A8A] hover:underline"
                    >
                      {ref.title} ↗
                    </a>
                    <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                      {ref.organization}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                    {ref.summary}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* E-E-A-T Yazar & Mühendislik Doğrulama Kutusu */}
          <section
            aria-labelledby="eeat-yazar-baslik"
            className="mt-10 rounded-3xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-slate-50 p-6 sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1E3A8A] text-lg font-extrabold text-white shadow-sm">
                  {post.author.name
                    .split(' ')
                    .slice(-2)
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800">
                    ✓ Çelikpen Mimari Mühendislik &amp; Ar-Ge Kurulu Tarafından Doğrulanmıştır
                  </span>
                  <h2 id="eeat-yazar-baslik" className="mt-1.5 text-base font-bold text-[#0F172A]">
                    {post.author.name} — <span className="font-medium text-slate-600">{post.author.role}</span>
                  </h2>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                    1996’dan bugüne İstanbul Bahçelievler (Kocasinan Merkez) üretim tesisimizde TS EN 14351-1, EN 12150 ve EN 1279 normlarında üretilen cam balkon, Winsa PVC doğrama ve kış bahçesi projelerinin saha mühendisliği verileriyle hazırlanmıştır.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200/80 pt-3.5 text-[11px] font-semibold text-[#1E3A8A]">
              <span className="rounded-lg bg-white px-2.5 py-1 shadow-2xs">TSE EN 12150 Temperli Cam</span>
              <span className="rounded-lg bg-white px-2.5 py-1 shadow-2xs">EN 12210 Rüzgâr Dayanımı</span>
              <span className="rounded-lg bg-white px-2.5 py-1 shadow-2xs">Winsa Yetkili Üretici Bayi</span>
              <span className="rounded-lg bg-white px-2.5 py-1 shadow-2xs">30 Yıllık Saha Deneyimi</span>
            </div>
          </section>

          {/* Backlink & Kaynak Göster / Embed Aracı */}
          <BacklinkCitationBox
            title={post.title}
            url={canonicalArticleUrl}
            authorName={post.author.name}
            publishDate={post.publishDate}
            primaryKeyword={post.primaryKeyword}
          />

          {/* Alt Sosyal Paylaşım Çubuğu */}
          <div className="mt-8">
            <BlogShareBar title={post.title} url={canonicalArticleUrl} />
          </div>

          {/* Okuyucu Yorumları & Soru-Cevap Bölümü */}
          <BlogCommentsSection slug={post.slug} initialComments={post.initialComments} />

          {/* Dönüşüm kartı */}
          <section
            aria-labelledby="kesif-cta"
            className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#1E293B] to-[#0F172A] p-6 text-white sm:p-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              Ücretsiz lazerli keşif
            </p>
            <h2 id="kesif-cta" className="mt-2 text-xl font-bold sm:text-2xl">
              Mimarlarımızdan Ücretsiz Keşif İsteyin
            </h2>
            <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-slate-300">
              {SITE_CONFIG.yearsOfExperience} yıllık tecrübemizle balkonunuzu yerinde ölçelim, size en uygun sistemi ve net fiyatı aynı gün sunalım.
              Bahçelievler’in tüm mahallelerinde keşif ve danışmanlık ücretsizdir.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/iletisim?form=kesif"
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-orange-600 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-orange-700"
              >
                Keşif Randevusu Al
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-green-600 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-green-700"
              >
                WhatsApp’tan Yazın
              </a>
              <Link
                href={post.relatedProductHref}
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/25 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                İlgili Sistemi İncele
              </Link>
            </div>
          </section>

          {/* İlgili yazılar */}
          <section aria-labelledby="ilgili-yazilar" className="mt-12">
            <h2 id="ilgili-yazilar" className="text-lg font-bold text-[#0F172A]">
              İlgili Teknik Rehberler
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={blogPostPath(r.slug, breadcrumbBase.href)}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-sky-200"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.imageAlt}
                        title={r.imageTitle}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-700">
                        {r.category}
                      </span>
                      <p className="mt-1 line-clamp-2 text-[13px] font-semibold leading-snug text-[#0F172A] group-hover:text-[#1E3A8A]">
                        {r.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}

function InfographicCard({ infographic }: { infographic: BlogInfographic }) {
  return (
    <section
      id="infografik"
      aria-labelledby="infografik-baslik"
      className="mt-12 scroll-mt-32 overflow-hidden rounded-3xl border border-slate-200 bg-[#0F172A] p-6 text-white sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300">
          Mimari Mühendislik İnfografiği
        </span>
        <span className="text-[11px] font-semibold text-slate-300">
          Ölçüt: {infographic.metricUnit}
        </span>
      </div>
      <h2 id="infografik-baslik" className="mt-3 text-xl font-bold text-white sm:text-2xl">
        {infographic.title}
      </h2>
      <p className="mt-1.5 text-[13px] text-slate-300">{infographic.subtitle}</p>

      <div className="mt-6 space-y-4">
        {infographic.items.map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border p-4 ${
              item.highlight
                ? 'border-sky-400/40 bg-sky-500/10'
                : 'border-white/10 bg-white/5'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
              <span className="font-semibold text-white">{item.label}</span>
              <span
                className={`font-bold ${
                  item.highlight ? 'text-sky-300' : 'text-slate-300'
                }`}
              >
                {item.displayValue}
              </span>
            </div>
            <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${
                  item.highlight
                    ? 'bg-gradient-to-r from-sky-400 to-emerald-400'
                    : 'bg-slate-400'
                }`}
                style={{ width: `${Math.min(100, Math.max(10, item.barPercent))}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {infographic.footnote && (
        <p className="mt-5 border-t border-white/10 pt-3 text-[11px] text-slate-400">
          {infographic.footnote}
        </p>
      )}
    </section>
  );
}

function ArticleSection({ section }: { section: BlogSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-baslik`} className="scroll-mt-32">
      <h2 id={`${section.id}-baslik`} className="text-xl font-bold leading-snug text-[#0F172A] sm:text-2xl">
        {section.heading}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.8] text-slate-700">
        {section.paragraphs.map((p) => (
          <p key={p}>{renderRichParagraph(p)}</p>
        ))}
      </div>
      {section.bullets && <BulletList items={section.bullets} />}
      {section.table && <ComparisonTable table={section.table} />}
      {section.subsections?.map((sub) => (
        <div key={sub.id} id={sub.id} className="mt-7 scroll-mt-32">
          <h3 className="text-[17px] font-semibold text-[#1E293B]">{sub.heading}</h3>
          <div className="mt-3 space-y-3 text-[15px] leading-[1.8] text-slate-700">
            {sub.paragraphs.map((p) => (
              <p key={p}>{renderRichParagraph(p)}</p>
            ))}
          </div>
          {sub.bullets && <BulletList items={sub.bullets} />}
        </div>
      ))}
      {section.proTip && (
        <aside className="mt-6 rounded-2xl border-l-4 border-orange-500 bg-orange-50 px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
            Uzman Mühendis İpucu
          </p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate-700">{section.proTip}</p>
        </aside>
      )}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[14.5px] leading-relaxed text-slate-700">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
          <span>{renderRichParagraph(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function ComparisonTable({ table }: { table: BlogTable }) {
  return (
    <figure className="mt-6">
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[520px] border-collapse text-left text-[13px]">
          <caption className="bg-[#0F172A] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200">
            Teknik Karşılaştırma Tablosu — {table.caption}
          </caption>
          <thead className="bg-slate-50">
            <tr>
              {table.headers.map((h) => (
                <th key={h} scope="col" className="border-b border-slate-200 px-4 py-3 font-semibold text-[#0F172A]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join('|')} className="odd:bg-white even:bg-slate-50/60">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={cell} scope="row" className="border-b border-slate-100 px-4 py-3 font-semibold text-[#1E293B]">
                      {cell}
                    </th>
                  ) : (
                    <td key={`${cell}-${i}`} className="border-b border-slate-100 px-4 py-3 text-slate-600">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
