'use client';

import React, { useEffect, useState } from 'react';
import { EXACT_GOOGLE_MAPS_URL, EXACT_WRITE_REVIEW_URL } from '../lib/google-business';
import type { GoogleReviewItem, GoogleReviewsApiResponse } from '../app/api/google-reviews/route';

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

function getAuthorInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase('tr-TR') || '')
    .join('');
}

export function CustomerReviews() {
  const [loaded, setLoaded] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>(EXACT_GOOGLE_MAPS_URL);
  const [writeReviewUrl, setWriteReviewUrl] = useState<string>(EXACT_WRITE_REVIEW_URL);
  const [reviews, setReviews] = useState<GoogleReviewItem[]>([]);

  useEffect(() => {
    let active = true;
    fetch('/api/google-reviews', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload: GoogleReviewsApiResponse | null) => {
        if (!active) return;
        if (payload?.ok) {
          setRating(typeof payload.rating === 'number' ? payload.rating : 0);
          setTotalReviews(typeof payload.totalReviews === 'number' ? payload.totalReviews : 0);
          const readUrl = payload.readReviewsUrl || payload.googleMapsUrl;
          if (readUrl) setGoogleMapsUrl(readUrl);
          if (payload.writeReviewUrl) setWriteReviewUrl(payload.writeReviewUrl);
          setReviews(Array.isArray(payload.reviews) ? payload.reviews : []);
        }
        setLoaded(true);
      })
      .catch(() => {
        if (active) setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const gridClassName =
    reviews.length === 1
      ? 'mt-6 mx-auto grid max-w-2xl grid-cols-1 gap-6'
      : reviews.length === 2
        ? 'mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'
        : 'mt-6 grid grid-cols-1 gap-6 md:grid-cols-3';

  return (
    <section
      id="yorumlar"
      aria-labelledby="musteri-yorumlari-baslik"
      className="section-shell bg-slate-50/50"
    >
      <div className="container-shell">
        {/* Sade & Güven Veren Tek Satır Google Değerlendirme Üst Barı */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <GoogleGIcon className="h-6 w-6 shrink-0" />
            <h2
              id="musteri-yorumlari-baslik"
              className="text-lg font-bold tracking-tight text-[#0F172A] sm:text-xl"
            >
              Müşteri Değerlendirmeleri
            </h2>

            {rating > 0 && totalReviews > 0 ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-extrabold text-[#0F172A]">{rating.toFixed(1)}</span>
                <span className="text-amber-500" aria-label={`${rating.toFixed(1)} / 5 yıldız`}>
                  ★★★★★
                </span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-600 underline-offset-4 hover:text-[#1E3A8A] hover:underline"
                >
                  ({totalReviews} Google Yorumu)
                </a>
              </div>
            ) : (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-600 underline-offset-4 hover:text-[#1E3A8A] hover:underline"
              >
                Google Haritalar İşletme Profili ↗
              </a>
            )}
          </div>

          <a
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1D4ED8]"
          >
            <span>Google&apos;da Yorum Yaz ↗</span>
          </a>
        </div>

        {/* Gerçek Google Yorumları Izgarası */}
        {!loaded ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl border border-slate-200/80 bg-white p-6"
              />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className={gridClassName}>
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  {/* Üst Satır: Avatar + Yazar Adı + Göreceli Tarih + Google G İkonu */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {review.profilePhotoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={review.profilePhotoUrl}
                          alt={review.authorName}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-xs font-bold text-[#1E3A8A]">
                          {getAuthorInitials(review.authorName) || 'G'}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#0F172A]">
                          {review.authorName}
                        </p>
                        <time
                          dateTime={review.date}
                          className="block text-xs text-slate-400"
                        >
                          {review.relativeTime || formatReviewDate(review.date)}
                        </time>
                      </div>
                    </div>
                    <GoogleGIcon className="h-4 w-4 shrink-0 opacity-80" />
                  </div>

                  {/* Yıldız Satırı */}
                  <div
                    className="mt-3 text-sm tracking-wide text-amber-500"
                    aria-label={`${review.rating} / 5 yıldız`}
                  >
                    {'★'.repeat(Math.max(1, Math.min(5, Math.round(review.rating))))}
                  </div>

                  {/* Yorum Metni */}
                  {review.text && (
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
                      “{review.text}”
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
            <p className="text-sm text-slate-600">
              Google Haritalar işletme profilimizdeki güncel müşteri değerlendirmelerini inceleyebilir
              veya deneyiminizi paylaşabilirsiniz.
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-[#0F172A] transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
            >
              Google Haritalar&apos;da İncele ↗
            </a>
          </div>
        )}
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
