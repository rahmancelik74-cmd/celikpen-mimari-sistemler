'use client';

import React, { useState } from 'react';

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
