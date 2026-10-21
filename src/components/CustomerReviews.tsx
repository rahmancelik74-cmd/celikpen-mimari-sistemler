'use client';

import React, { startTransition, useEffect, useMemo, useRef, useState } from 'react';

/* ============================================================================
   MÜŞTERİ YORUMLARI — canlı puan özeti, yıldız dağılımı ve yorum formu
   ============================================================================ */

type Review = {
  id: string;
  name: string;
  district: string;
  system: string;
  rating: number;
  text: string;
  date: string;
  submitted?: boolean;
};

type FormErrors = Partial<Record<'rating' | 'name' | 'system' | 'text', string>>;

const STORAGE_KEY = 'celikpen-customer-reviews-v1';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'seed-elif-bahcelievler',
    name: 'Elif Yılmaz',
    district: 'Bahçelievler',
    system: 'Isıcamlı Cam Balkon',
    rating: 5,
    date: '2026-09-12',
    text: 'Kocasinan’daki showroomda tüm sistemleri tek tek anlattılar. Balkonumuz kışın da evin en sıcak köşesi oldu; montaj ekibi koridoru ve balkonu bizden temiz bıraktı.',
  },
  {
    id: 'seed-murat-bakirkoy',
    name: 'Murat Demir',
    district: 'Bakırköy',
    system: 'Motorlu Giyotin Sistem',
    rating: 5,
    date: '2026-09-28',
    text: 'Sabah 9’da geldiler, öğleden sonra sistemi teslim ettiler. Motor çok sessiz, kumanda eşimle bana ayrı ayrı tanımlandı. İşçilik ve contalar beklediğimden çok daha düzgün.',
  },
  {
    id: 'seed-zeynep-atakoy',
    name: 'Zeynep Kaya',
    district: 'Ataköy',
    system: 'Bioklimatik Pergola',
    rating: 4,
    date: '2026-10-06',
    text: 'Terasın tamamı artık her hafta kullanılıyor. Lamel ve LED aydınlatma çok iyi çalışıyor. Montaj bir gün gecikti ama ekip önceden haber verdi ve işi eksiksiz tamamladı.',
  },
  {
    id: 'seed-ahmet-sirinevler',
    name: 'Ahmet Çelik',
    district: 'Şirinevler',
    system: 'Kış Bahçesi',
    rating: 5,
    date: '2026-10-14',
    text: 'E-5 tarafındaki gürültü belirgin şekilde azaldı. Ölçüye geldiklerinde renk ve cam seçeneklerini örnekleriyle gösterdiler; söz verilen tarihte bitirdiler. Garanti evraklarını da teslim ettiler.',
  },
];

const SYSTEM_OPTIONS = [
  'Cam Balkon',
  'Giyotin Sistem',
  'Kış Bahçesi',
  'Bioklimatik Pergola',
  'PVC & Alüminyum',
  'Sineklik / Perde',
];

const RATING_LABELS: Record<number, string> = {
  1: 'Çok Kötü',
  2: 'Orta',
  3: 'İyi',
  4: 'Çok İyi',
  5: 'Mükemmel',
};

function isStoredReview(value: unknown): value is Review {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.district === 'string' &&
    typeof item.system === 'string' &&
    typeof item.text === 'string' &&
    typeof item.date === 'string' &&
    typeof item.rating === 'number' &&
    Number.isInteger(item.rating) &&
    item.rating >= 1 &&
    item.rating <= 5
  );
}

function sanitizeText(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/[<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

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

function localDateValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [system, setSystem] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const validReviews = parsed.filter(isStoredReview).slice(0, 80);
        if (validReviews.length > 0) setReviews(validReviews);
      }
    } catch {
      // Depolama kapalıysa varsayılan yorumlarla devam edilir.
    }
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const stats = useMemo(() => {
    const total = reviews.length;
    const sum = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
    const average = total > 0 ? sum / total : 0;
    const distribution = [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((review) => review.rating === star).length;
      return {
        star,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      };
    });

    return { total, average, distribution };
  }, [reviews]);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);
  const activeRating = hoverRating || rating;

  const persistReviews = (nextReviews: Review[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextReviews));
    } catch {
      // Depolama müsait değilse yorum yine bu oturumda görünür.
    }
  };

  const showSuccessToast = () => {
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 4500);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = sanitizeText(name).slice(0, 60);
    const cleanDistrict = sanitizeText(district).slice(0, 40);
    const cleanText = sanitizeText(text).slice(0, 600);
    const nextErrors: FormErrors = {};

    if (rating < 1 || rating > 5) {
      nextErrors.rating = 'Lütfen 1 ile 5 arasında bir puan seçin.';
    }
    if (cleanName.length < 2) {
      nextErrors.name = 'Lütfen adınızı ve soyadınızı yazın.';
    }
    if (!system) {
      nextErrors.system = 'Lütfen yapılan uygulamayı seçin.';
    }
    if (cleanText.length < 10) {
      nextErrors.text = 'Yorumunuz en az 10 karakter olmalıdır.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newReview: Review = {
      id: `review-${Date.now()}`,
      name: cleanName,
      district: cleanDistrict || 'İstanbul',
      system,
      rating,
      text: cleanText,
      date: localDateValue(),
      submitted: true,
    };

    const nextReviews = [newReview, ...reviews];
    setReviews(nextReviews);
    persistReviews(nextReviews);

    setName('');
    setDistrict('');
    setSystem('');
    setText('');
    setRating(0);
    setHoverRating(0);
    setErrors({});
    setShowAll(false);
    showSuccessToast();
  };

  return (
    <section id="yorumlar" aria-labelledby="musteri-yorumlari-baslik" className="section-shell bg-white">
      <div className="container-shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="section-kicker">Müşteri Deneyimi</span>
            <h2 id="musteri-yorumlari-baslik" className="section-title">
              Müşterilerimiz Bizim İçin Ne Diyor?
            </h2>
            <p className="section-subtitle">
              Gerçek uygulamalardan gelen deneyimler. Siz de yorumunuzu ekleyin; ortalama puan ve
              yıldız dağılımı anında güncellensin.
            </p>
          </div>

          <div
            className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-200 bg-[#F8FAFC] px-4 py-2"
            aria-live="polite"
            aria-atomic="true"
          >
            <Stars rating={stats.average} partial className="h-4 w-4" />
            <span className="text-[11px] font-semibold text-[#0F172A]">
              {stats.average.toFixed(1)} / 5
            </span>
            <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
            <span className="text-[10.5px] font-medium text-slate-500">
              {stats.total} değerlendirme
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Canlı puan özeti */}
          <div className="relative overflow-hidden rounded-card border border-slate-200 bg-gradient-to-br from-[#F5F3FF] via-white to-white p-5 shadow-xs sm:p-6">
            <span
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#7C3AED]/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
                  Canlı Puan Özeti
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-5xl font-black leading-none tracking-tight text-[#0F172A]">
                    {stats.average.toFixed(1)}
                  </span>
                  <span className="pb-1 text-[12px] font-medium text-slate-500">/ 5</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Stars rating={stats.average} partial className="h-4 w-4" />
                  <span className="text-[10.5px] font-semibold text-slate-600">
                    {stats.total} yorum
                  </span>
                </div>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DDD6FE] bg-white text-[#7C3AED] shadow-xs">
                <IconSparkle className="h-5 w-5" />
              </span>
            </div>

            <div className="relative mt-6 space-y-2.5">
              {stats.distribution.map((row) => (
                <div key={row.star} className="flex items-center gap-2.5">
                  <span className="flex w-8 shrink-0 items-center gap-1 text-[10.5px] font-semibold text-slate-600">
                    {row.star}
                    <IconStar className="h-2.5 w-2.5 text-[#F59E0B]" />
                  </span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200/80">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] transition-[width] duration-500 ease-out"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right text-[10px] font-medium tabular-nums text-slate-500">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>

            <p className="relative mt-5 border-t border-slate-200/70 pt-3 text-[10px] leading-relaxed text-slate-500">
              Ortalama puan, yayınlanan tüm yorumların yıldızlarına göre otomatik hesaplanır.
            </p>
          </div>

          {/* Yorum formu */}
          <div id="yorum-formu" className="scroll-mt-32 rounded-card border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
                  Deneyiminizi Paylaşın
                </p>
                <h3 className="mt-1 text-lg font-bold tracking-tight text-[#0F172A]">
                  Yorum Yap
                </h3>
              </div>
              <span className="hidden rounded-full bg-[#F5F3FF] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#6D28D9] sm:inline-flex">
                Anında yayınlanır
              </span>
            </div>

            {toastVisible && (
              <div
                role="status"
                aria-live="polite"
                className="animate-fade-up mt-3 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-[11px] font-medium leading-relaxed text-emerald-800"
              >
                <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Yorumunuz yayınlandı. Ortalama puan ve yıldız dağılımı güncellendi.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3.5">
              <fieldset>
                <legend className="text-[11px] font-semibold text-[#0F172A]">
                  Puanınız <span className="text-[#D91B24]">*</span>
                </legend>
                <div className="mt-1.5 flex flex-wrap items-center gap-1">
                  <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setRating(star);
                          setErrors((current) => ({ ...current, rating: undefined }));
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onFocus={() => setHoverRating(star)}
                        onBlur={() => setHoverRating(0)}
                        aria-label={`${star} yıldız — ${RATING_LABELS[star]}`}
                        aria-pressed={rating === star}
                        className="flex h-11 w-11 items-center justify-center rounded-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
                      >
                        <IconStar
                          className={`h-6 w-6 transition-colors ${
                            star <= activeRating
                              ? 'text-[#F59E0B]'
                              : 'text-slate-300 hover:text-[#F59E0B]/70'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="ml-1 text-[10.5px] font-medium text-slate-500" aria-live="polite">
                    {activeRating > 0 ? `${activeRating} - ${RATING_LABELS[activeRating]}` : 'Puan seçin'}
                  </span>
                </div>
                {errors.rating && <p className="mt-1 text-[10px] text-red-600">{errors.rating}</p>}
              </fieldset>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] font-semibold text-[#0F172A]">
                    Adınız Soyadınız <span className="text-[#D91B24]">*</span>
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setErrors((current) => ({ ...current, name: undefined }));
                    }}
                    maxLength={60}
                    autoComplete="name"
                    placeholder="Örn. Ayşe Yılmaz"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'review-name-error' : undefined}
                    className="mt-1.5 min-h-[44px] w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-[12px] text-[#0F172A] outline-none transition-colors placeholder:text-slate-400 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15"
                  />
                  {errors.name && (
                    <span id="review-name-error" className="mt-1 block text-[10px] text-red-600">
                      {errors.name}
                    </span>
                  )}
                </label>

                <label className="block">
                  <span className="text-[11px] font-semibold text-[#0F172A]">
                    İlçe / Semt <span className="font-normal text-slate-400">(opsiyonel)</span>
                  </span>
                  <input
                    type="text"
                    value={district}
                    onChange={(event) => setDistrict(event.target.value)}
                    maxLength={40}
                    autoComplete="address-level2"
                    placeholder="Örn. Bahçelievler"
                    className="mt-1.5 min-h-[44px] w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-[12px] text-[#0F172A] outline-none transition-colors placeholder:text-slate-400 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-[11px] font-semibold text-[#0F172A]">
                  Yapılan Uygulama <span className="text-[#D91B24]">*</span>
                </span>
                <select
                  value={system}
                  onChange={(event) => {
                    setSystem(event.target.value);
                    setErrors((current) => ({ ...current, system: undefined }));
                  }}
                  aria-invalid={Boolean(errors.system)}
                  aria-describedby={errors.system ? 'review-system-error' : undefined}
                  className="mt-1.5 min-h-[44px] w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-[12px] text-[#0F172A] outline-none transition-colors focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15"
                >
                  <option value="">Uygulama seçin</option>
                  {SYSTEM_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.system && (
                  <span id="review-system-error" className="mt-1 block text-[10px] text-red-600">
                    {errors.system}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="flex items-center justify-between gap-2 text-[11px] font-semibold text-[#0F172A]">
                  <span>
                    Yorumunuz <span className="text-[#D91B24]">*</span>
                  </span>
                  <span className="text-[9.5px] font-normal tabular-nums text-slate-400">
                    {text.length}/500
                  </span>
                </span>
                <textarea
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value);
                    setErrors((current) => ({ ...current, text: undefined }));
                  }}
                  maxLength={500}
                  rows={3}
                  placeholder="Ölçü, montaj, kullanım ve ekip deneyiminizi kısaca anlatın."
                  aria-invalid={Boolean(errors.text)}
                  aria-describedby={errors.text ? 'review-text-error' : undefined}
                  className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-[12px] leading-relaxed text-[#0F172A] outline-none transition-colors placeholder:text-slate-400 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15"
                />
                {errors.text && (
                  <span id="review-text-error" className="mt-1 block text-[10px] text-red-600">
                    {errors.text}
                  </span>
                )}
              </label>

              <button
                type="submit"
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-3 text-[12px] font-semibold text-white shadow-purple transition-all hover:-translate-y-0.5 hover:bg-[#6D28D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
              >
                <IconSend className="h-4 w-4" />
                Yorumu Yayınla
              </button>
              <p className="text-center text-[9.5px] leading-relaxed text-slate-400">
                Yorumunuz anında listeye eklenir ve bu tarayıcıda saklanır.
              </p>
            </form>
          </div>
        </div>

        {/* Yorum kartları */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visibleReviews.map((review) => (
            <article
              key={review.id}
              className="flex h-full flex-col rounded-card border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DDD6FE] hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <Stars rating={review.rating} className="h-3.5 w-3.5" />
                <div className="flex items-center gap-2">
                  {review.submitted && (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-emerald-700">
                      Yeni
                    </span>
                  )}
                  <time dateTime={review.date} className="text-[9.5px] text-slate-400">
                    {formatReviewDate(review.date)}
                  </time>
                </div>
              </div>

              <p className="mt-3 flex-1 text-[12px] leading-relaxed text-slate-600">
                “{review.text}”
              </p>

              <div className="mt-4 flex flex-col items-start gap-2.5 border-t border-slate-100 pt-3.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5F3FF] text-[11px] font-bold text-[#6D28D9]">
                    {review.name.charAt(0).toLocaleUpperCase('tr-TR')}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[11.5px] font-semibold text-[#0F172A]">
                      {review.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[9.5px] text-slate-500">
                      {review.district}
                    </span>
                  </span>
                </div>
                <span className="max-w-full rounded-full bg-[#F5F3FF] px-2.5 py-1 text-center text-[8.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-[#6D28D9]">
                  {review.system}
                </span>
              </div>
            </article>
          ))}
        </div>

        {reviews.length > 6 && !showAll && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => startTransition(() => setShowAll(true))}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[11px] font-semibold text-[#0F172A] transition-colors hover:border-[#DDD6FE] hover:text-[#7C3AED]"
            >
              Tüm yorumları göster ({reviews.length})
              <IconChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================================
   YILDIZLAR
   ============================================================================ */

function Stars({
  rating,
  partial = false,
  className = 'h-4 w-4',
}: {
  rating: number;
  partial?: boolean;
  className?: string;
}) {
  const filledPercentage = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <span
      className="relative inline-flex shrink-0 items-center gap-0.5"
      role="img"
      aria-label={`${rating.toFixed(1)} / 5 yıldız`}
    >
      <span className="flex items-center gap-0.5 text-slate-200" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <IconStar key={star} className={className} />
        ))}
      </span>
      <span
        className="absolute inset-y-0 left-0 flex items-center gap-0.5 overflow-hidden text-[#F59E0B]"
        style={{ width: partial ? `${filledPercentage}%` : '100%' }}
        aria-hidden="true"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <IconStar
            key={star}
            className={`${className} shrink-0 ${!partial && star > Math.round(rating) ? 'opacity-0' : ''}`}
          />
        ))}
      </span>
    </span>
  );
}

/* ============================================================================
   İKONLAR
   ============================================================================ */

type IconProps = { className?: string };

function IconStar({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="m12 2.6 2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.4l-5.8 3.06 1.11-6.46-4.7-4.58 6.49-.94L12 2.6Z" />
    </svg>
  );
}

function IconSparkle({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9L12 3Z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  );
}

function IconCheck({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function IconSend({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function IconChevronDown({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
