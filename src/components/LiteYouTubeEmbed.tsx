'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '../config/site.config';
import {
  ARCHITECTURAL_VIDEO_CATALOG,
  getVideoForSlug,
  type ArchitecturalVideoMeta,
} from '../config/videos.config';

export { ARCHITECTURAL_VIDEO_CATALOG, getVideoForSlug, type ArchitecturalVideoMeta };

interface LiteYouTubeEmbedProps {
  video?: ArchitecturalVideoMeta;
  slug?: string;
  sectionTitle?: string;
  className?: string;
}

export function LiteYouTubeEmbed({
  video,
  slug = 'isicamli-cam-balkon',
  sectionTitle,
  className = '',
}: LiteYouTubeEmbedProps) {
  const resolvedVideo = video || getVideoForSlug(slug);
  const [mode, setMode] = useState<'poster' | 'youtube' | 'cad'>('poster');

  const absoluteThumb = resolvedVideo.posterImage.startsWith('http')
    ? resolvedVideo.posterImage
    : `${SITE_CONFIG.siteUrl}${resolvedVideo.posterImage}`;
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${resolvedVideo.videoId}`;
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${resolvedVideo.videoId}?autoplay=1&rel=0&modestbranding=1`;

  const videoObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: resolvedVideo.title,
    description: resolvedVideo.description,
    thumbnailUrl: [
      absoluteThumb,
      `https://i.ytimg.com/vi/${resolvedVideo.videoId}/hqdefault.jpg`,
    ],
    uploadDate: resolvedVideo.uploadDate,
    duration: resolvedVideo.durationIso,
    contentUrl: youtubeWatchUrl,
    embedUrl: `https://www.youtube-nocookie.com/embed/${resolvedVideo.videoId}`,
    inLanguage: 'tr-TR',
    publisher: {
      '@type': 'Organization',
      name: `${SITE_CONFIG.brandName} Cam Balkon & Mimari Sistemler`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.siteUrl}/icon.svg`,
      },
    },
  };

  return (
    <section
      aria-label={sectionTitle || resolvedVideo.title}
      className={`overflow-hidden rounded-3xl border border-slate-200/90 bg-[#0F172A] text-white shadow-[0_22px_50px_-24px_rgba(15,23,42,0.5)] ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoObjectSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* Üst Başlık & Mod Seçici */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-sky-200">
            <span className="h-2 w-2 rounded-full bg-[#EF4444]" aria-hidden="true" />
            {resolvedVideo.brandBadge}
          </span>
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10.5px] font-bold text-slate-200">
            {resolvedVideo.durationDisplay} • HD
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMode('youtube')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
              mode === 'youtube'
                ? 'bg-[#1E3A8A] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white'
            }`}
          >
            ▶ Video Oynatıcı
          </button>
          <button
            type="button"
            onClick={() => setMode('cad')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
              mode === 'cad'
                ? 'bg-[#1E3A8A] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white'
            }`}
          >
            ⚙ Teknik Animasyon &amp; Kesit
          </button>
        </div>
      </div>

      {/* Video Sahnesi (Zero PageSpeed Impact Lite Facade) */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        {mode === 'poster' && (
          <div className="group relative h-full w-full">
            <Image
              src={resolvedVideo.posterImage}
              alt={`${resolvedVideo.title} — Video kapak görseli`}
              title={resolvedVideo.title}
              fill
              sizes="(min-width: 1024px) 840px, 100vw"
              className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/45 to-transparent"
              aria-hidden="true"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <button
                type="button"
                onClick={() => setMode('youtube')}
                aria-label={`${resolvedVideo.title} videosunu oynat`}
                data-seo-event="video_play_click"
                data-seo-label={resolvedVideo.title}
                className="group/btn inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-[#1E3A8A]/95 px-6 py-4 text-sm font-extrabold text-white shadow-[0_20px_45px_-10px_rgba(30,58,138,0.85)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#1D4ED8]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1E3A8A] shadow-sm transition-transform group-hover/btn:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-0.5 h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="text-left">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-sky-200">
                    Sıfır Gecikmeli Oynatıcı
                  </span>
                  <span className="block text-sm font-extrabold text-white sm:text-base">
                    Videoyu İzle ({resolvedVideo.durationDisplay})
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}

        {mode === 'youtube' && (
          <iframe
            src={youtubeEmbedUrl}
            title={resolvedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0"
          />
        )}

        {mode === 'cad' && (
          <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-lg bg-sky-400/15 px-3 py-1 text-xs font-bold text-sky-300">
                Canlı Termal &amp; Akustik Sistem Özeti
              </span>
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-sky-300 underline hover:text-white"
              >
                YouTube Üzerinde Aç ↗
              </a>
            </div>

            <div className="my-auto grid gap-3 sm:grid-cols-3">
              {resolvedVideo.highlights.map((item, idx) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1E3A8A] text-xs font-black text-white">
                    {idx + 1}
                  </span>
                  <p className="mt-2.5 text-xs font-semibold leading-relaxed text-slate-100 sm:text-[13px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px] text-slate-300">
              <span>Çelikpen Mimari Mühendislik Video Kütüphanesi</span>
              <button
                type="button"
                onClick={() => setMode('youtube')}
                className="font-bold text-sky-300 hover:underline"
              >
                ▶ YouTube Oynatıcıya Dön
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alt Bilgi & Doğrudan YouTube Bağlantısı */}
      <div className="flex flex-col justify-between gap-3 bg-[#0F172A] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-white sm:text-[15px]">
            {resolvedVideo.title}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-300">
            {resolvedVideo.description}
          </p>
        </div>

        <a
          href={youtubeWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-[11.5px] font-bold text-sky-200 transition hover:border-sky-400/40 hover:bg-white/10 hover:text-white"
        >
          <span>YouTube’da İzle</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
