import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '../../config/site.config';
import { BLOG_POSTS, formatBlogDate, type BlogPost, type BlogSection, type BlogTable } from '../../data/blogPosts';
import { blogPostPath } from './blogSchema';

/**
 * Dikkat dağıtmayan tam makale okuyucu.
 * Hook içermez: hem statik /blog/[slug] sayfalarında (RSC) hem de blog
 * merkezindeki interaktif okuyucu görünümünde (client) kullanılır.
 */
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

  return (
    <article itemScope itemType="https://schema.org/BlogPosting" className="bg-white">
      {/* ------------------------------ Başlık alanı ------------------------------ */}
      <header className="relative overflow-hidden bg-[#0F172A] text-white">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.imageAlt}
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
                <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={breadcrumbBase.href} className="hover:text-white">{breadcrumbBase.label}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-sky-200">{post.category}</li>
            </ol>
          </nav>
          <span className="inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-200">
            {post.category}
          </span>
          <h1 itemProp="headline" className="mt-4 max-w-4xl text-2xl font-bold leading-tight sm:text-3xl lg:text-[2.4rem]">
            {post.title}
          </h1>
          <p itemProp="description" className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-slate-300">
            <span itemProp="author" itemScope itemType="https://schema.org/Person">
              <strong itemProp="name" className="font-semibold text-white">{post.author.name}</strong>
              <span className="text-slate-400"> · {post.author.role}</span>
            </span>
            <span>
              Yayın: <time itemProp="datePublished" dateTime={post.publishDate}>{formatBlogDate(post.publishDate)}</time>
            </span>
            <span>
              Güncelleme: <time itemProp="dateModified" dateTime={post.updatedDate}>{formatBlogDate(post.updatedDate)}</time>
            </span>
            <span>{post.readTime} dk okuma</span>
          </div>
        </div>
      </header>

      {/* ------------------------------ Gövde ------------------------------ */}
      <div className="container-shell grid gap-10 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-14">
        {/* İçindekiler */}
        <aside className="lg:order-none">
          <div className="lg:sticky lg:top-[130px]">
            <nav aria-label="İçindekiler" className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]">İçindekiler</p>
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
                  <a href="#sss" className="block rounded-md px-2 py-1 font-semibold text-[#0F172A] hover:bg-white hover:text-[#1E3A8A]">
                    Sıkça Sorulan Sorular
                  </a>
                </li>
              </ol>
            </nav>
            <div className="mt-4 hidden rounded-2xl border border-orange-200 bg-orange-50 p-4 lg:block">
              <p className="text-[12px] font-semibold text-[#0F172A]">Balkonunuzun net fiyatını öğrenin</p>
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
          {/* Öne çıkanlar */}
          <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">Öne çıkanlar</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {post.highlights.map((h) => (
                <li key={h} className="rounded-xl bg-white px-3 py-2.5 text-[12.5px] font-medium leading-snug text-[#0F172A] shadow-xs">
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div itemProp="articleBody" className="mt-8 space-y-10">
            {post.sections.map((section) => (
              <ArticleSection key={section.id} section={section} />
            ))}
          </div>

          {/* SSS */}
          <section id="sss" aria-labelledby="sss-baslik" className="mt-12 scroll-mt-32">
            <h2 id="sss-baslik" className="text-xl font-bold text-[#0F172A] sm:text-2xl">
              Sıkça Sorulan Sorular
            </h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {post.faqs.map((faq, index) => (
                <details key={faq.question} className="group px-5 py-4" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-semibold text-[#0F172A] [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[14px] font-semibold">{faq.question}</h3>
                    <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#1E3A8A] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Dönüşüm kartı */}
          <section
            aria-labelledby="kesif-cta"
            className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#1E293B] to-[#0F172A] p-6 text-white sm:p-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">Ücretsiz lazerli keşif</p>
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
            <h2 id="ilgili-yazilar" className="text-lg font-bold text-[#0F172A]">İlgili rehberler</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={blogPostPath(r.slug)} className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-sky-200">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.imageAlt}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-700">{r.category}</span>
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

function ArticleSection({ section }: { section: BlogSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-baslik`} className="scroll-mt-32">
      <h2 id={`${section.id}-baslik`} className="text-xl font-bold leading-snug text-[#0F172A] sm:text-2xl">
        {section.heading}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.8] text-slate-700">
        {section.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {section.bullets && <BulletList items={section.bullets} />}
      {section.table && <ComparisonTable table={section.table} />}
      {section.subsections?.map((sub) => (
        <div key={sub.id} id={sub.id} className="mt-7 scroll-mt-32">
          <h3 className="text-[17px] font-semibold text-[#1E293B]">{sub.heading}</h3>
          <div className="mt-3 space-y-3 text-[15px] leading-[1.8] text-slate-700">
            {sub.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {sub.bullets && <BulletList items={sub.bullets} />}
        </div>
      ))}
      {section.proTip && (
        <aside className="mt-6 rounded-2xl border-l-4 border-orange-500 bg-orange-50 px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">Uzman ipucu</p>
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
          <span>{item}</span>
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
