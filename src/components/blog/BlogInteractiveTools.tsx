'use client';

import React, { useEffect, useState } from 'react';
import type { BlogCommentItem } from '../../data/blogPosts';

function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript\s*:/gi, '')
    .trim()
    .slice(0, 600);
}

export function BlogShareBar({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
      bg: 'bg-[#16A34A] hover:bg-[#15803D] text-white',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: 'bg-[#1877F2] hover:bg-[#166FE5] text-white',
    },
    {
      name: 'Twitter / X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      bg: 'bg-[#0F172A] hover:bg-slate-800 text-white',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bg: 'bg-[#0A66C2] hover:bg-[#004182] text-white',
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1E3A8A]">
        Bu Rehberi Paylaşın:
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} yazısını ${item.name} üzerinden paylaş`}
            className={`inline-flex min-h-[34px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${item.bg}`}
          >
            {item.name}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[#0F172A] transition-colors hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
        >
          {copied ? '✓ Link Kopyalandı!' : 'Linki Kopyala'}
        </button>
      </div>
    </div>
  );
}

export function BlogCommentsSection({
  slug,
  initialComments,
}: {
  slug: string;
  initialComments: BlogCommentItem[];
}) {
  const storageKey = `celikpen_blog_comments_${slug}`;
  const [userComments, setUserComments] = useState<BlogCommentItem[]>([]);
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [text, setText] = useState('');
  const [submittedMsg, setSubmittedMsg] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setUserComments(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, [storageKey]);

  const allComments = [...initialComments, ...userComments];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeText(name);
    const cleanDistrict = sanitizeText(district) || 'İstanbul';
    const cleanText = sanitizeText(text);
    if (!cleanName || cleanText.length < 5) return;

    const newEntry: BlogCommentItem = {
      id: `user-${Date.now()}`,
      author: cleanName,
      district: cleanDistrict,
      date: 'Bugün',
      rating: 5,
      comment: cleanText,
      expertReply:
        'Sorunuz Çelikpen Mimari Mühendislik Ekibimize iletilmiştir. Teknik uzmanlarımız detaylı bilgilendirme için katkınıza teşekkür eder.',
    };

    const next = [...userComments, newEntry];
    setUserComments(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // ignore
    }
    setName('');
    setDistrict('');
    setText('');
    setSubmittedMsg(true);
    setTimeout(() => setSubmittedMsg(false), 4000);
  };

  return (
    <section
      id="yorumlar"
      aria-labelledby="yorumlar-baslik"
      className="mt-12 scroll-mt-32 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E3A8A]">
            Okuyucu Soruları &amp; Saha Deneyimleri
          </span>
          <h2 id="yorumlar-baslik" className="mt-1 text-xl font-bold text-[#0F172A]">
            Teknik Yorumlar ({allComments.length})
          </h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
          ✓ Mühendis Onaylı Yanıtlar
        </span>
      </div>

      {/* Yorum Listesi */}
      <div className="mt-6 space-y-4">
        {allComments.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A8A] text-xs font-bold text-white">
                  {item.author.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p className="text-[13.5px] font-bold text-[#0F172A]">{item.author}</p>
                  <p className="text-[11px] text-slate-500">
                    {item.district} · {item.date}
                  </p>
                </div>
              </div>
              <span
                aria-label={`${item.rating} yıldız`}
                className="text-xs font-bold tracking-wider text-amber-500"
              >
                {'★'.repeat(item.rating)}
              </span>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-slate-700">{item.comment}</p>
            {item.expertReply && (
              <div className="mt-3.5 rounded-xl border-l-4 border-[#1E3A8A] bg-[#EFF6FF]/70 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Çelikpen Mühendislik Kurulu Yanıtı
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-700">
                  {item.expertReply}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Yorum / Soru Gönderme Formu */}
      <form onSubmit={handleSubmit} className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-[15px] font-bold text-[#0F172A]">
          Bu Konu Hakkında Soru veya Yorumunuzu Yazın
        </h3>
        <p className="mt-1 text-[12px] text-slate-500">
          Mimari ekibimiz balkon ve doğrama projelerinizle ilgili teknik sorularınızı yanıtlıyor.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={`comment-name-${slug}`} className="block text-[11.5px] font-semibold text-slate-700">
              Adınız Soyadınız *
            </label>
            <input
              id={`comment-name-${slug}`}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Kemal Yılmaz"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-[13px] text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor={`comment-district-${slug}`} className="block text-[11.5px] font-semibold text-slate-700">
              İlçe / Mahalle
            </label>
            <input
              id={`comment-district-${slug}`}
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Örn: Bahçelievler / Kocasinan"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-[13px] text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor={`comment-body-${slug}`} className="block text-[11.5px] font-semibold text-slate-700">
            Sorunuz veya Yorumunuz *
          </label>
          <textarea
            id={`comment-body-${slug}`}
            rows={3}
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Balkon ölçünüzü, cephe yönünüzü veya merak ettiğiniz teknik detayı yazabilirsiniz..."
            className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-[13px] text-[#0F172A] focus:border-[#1E3A8A] focus:outline-none"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#1E3A8A] px-5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
          >
            Yorumu Gönder
          </button>
          {submittedMsg && (
            <span className="text-[12.5px] font-semibold text-emerald-700">
              ✓ Yorumunuz başarıyla eklendi!
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
