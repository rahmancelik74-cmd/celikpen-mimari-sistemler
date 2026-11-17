'use client';

import React from 'react';
import Link from 'next/link';
import { GOOGLE_MAPS_REVIEW_URL, TESTIMONIALS } from '../config/testimonials.config';

function formatReviewDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day) return date;
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function CustomerReviews() {
  return (
    <section
      id="yorumlar"
      aria-labelledby="musteri-yorumlari-baslik"
      className="section-shell bg-white"
    >
      <div className="container-shell">
        {/* Üst Başlık ve Google Haritalar Doğrulanmış İşletme Rozeti */}
        <div className="flex flex-col gap-6 rounded-3xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#F8FAFC] p-6 shadow-xs sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#0F172A] shadow-2xs">
                <GoogleGIcon className="h-4 w-4 shrink-0" />
                <span>4.9 / 5.0 ★ — Google Haritalar Doğrulanmış İşletme Profili</span>
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10.5px] font-bold text-emerald-800">
                ✓ %100 Gerçek Saha Projeleri
              </span>
            </div>

            <h2
              id="musteri-yorumlari-baslik"
              className="mt-4 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
            >
              Google Haritalar Onaylı Müşteri Değerlendirmeleri
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Bakırköy Florya, Beşiktaş Etiler, Sarıyer Zekeriyaköy, Başakşehir Bahçeşehir,
              Bahçelievler ve Beylikdüzü başta olmak üzere İstanbul Avrupa Yakası genelinde
              tamamladığımız cam balkon, kış bahçesi ve Winsa PVC doğrama projelerine ait
              doğrulanmış Google Haritalar geri bildirimleri.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-2xs">
              <GoogleGIcon className="h-8 w-8 shrink-0" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-[#0F172A]">4.9 / 5.0</span>
                  <span className="text-sm text-amber-500" aria-hidden="true">
                    ★★★★★
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500">
                  128+ Google Haritalar Doğrulanmış Değerlendirme
                </p>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] px-5 py-3 text-xs font-extrabold text-white shadow-navy transition hover:bg-[#1D4ED8]"
            >
              <GoogleGIcon className="h-4 w-4 rounded-full bg-white p-0.5" />
              <span>Google Yorumlarımızı İnceleyin &amp; Yorum Bırakın ↗</span>
            </a>
          </div>
        </div>

        {/* Salt-Okunur (Read-Only) Google Onaylı Yorum Kartları */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-md"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                    <GoogleGIcon className="h-3.5 w-3.5 shrink-0" />
                    <span>{review.verifiedLabel}</span>
                  </span>
                  <time dateTime={review.date} className="text-[10.5px] font-medium text-slate-400">
                    {formatReviewDate(review.date)}
                  </time>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span
                    className="text-sm tracking-wider text-amber-500"
                    aria-label={`${review.rating} / 5 yıldız`}
                  >
                    {'★'.repeat(review.rating)}
                  </span>
                  <Link
                    href={review.districtHref}
                    className="rounded-md bg-[#EFF6FF] px-2.5 py-0.5 text-[10.5px] font-bold text-[#1E3A8A] hover:underline"
                  >
                    📍 {review.neighborhoodSlug}
                  </Link>
                </div>

                <p className="mt-3 text-[12.5px] leading-relaxed text-slate-700">
                  “{review.comment}”
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#0F172A]">{review.name}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                    ✓ Doğrulandı
                  </span>
                </div>
                <span className="mt-1.5 inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-[#1E3A8A]">
                  {review.systemCode}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Alt Bilgi & Tüm Yorumlar Bağlantısı */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-4 sm:flex-row">
          <p className="text-xs text-slate-600">
            Şeffaflık politikamız gereği sitemizde manuel yorum formu bulunmamaktadır; yalnızca{' '}
            <strong className="font-semibold text-[#0F172A]">
              Google Haritalar Doğrulanmış İşletme Profilimizdeki
            </strong>{' '}
            gerçek proje değerlendirmeleri sergilenmektedir.
          </p>
          <div className="flex shrink-0 flex-wrap gap-2.5">
            <Link
              href="/yorumlar"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-[#0F172A] transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
            >
              Tüm Proje Değerlendirmeleri →
            </Link>
            <a
              href={GOOGLE_MAPS_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#1E3A8A] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              Google Haritalar’da Aç ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleGIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
      />
    </svg>
  );
}
