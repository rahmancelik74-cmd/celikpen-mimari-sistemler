'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface VideoFacadeProps {
  title: string;
  subtitle: string;
  posterUrl: string;
  videoEmbedUrl?: string;
}

export function VideoFacade({
  title,
  subtitle,
  posterUrl,
  videoEmbedUrl = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
}: VideoFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative flex h-full w-full items-center justify-center text-left focus:outline-none"
          aria-label={`${title} videosunu oynat`}
        >
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
          <div className="relative z-10 flex flex-col items-center p-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white shadow-lg transition transform group-hover:scale-110">
              ▶
            </span>
            <span className="mt-4 text-lg font-bold text-white">{title}</span>
            <span className="mt-1 text-xs text-slate-300">{subtitle}</span>
          </div>
        </button>
      ) : (
        <iframe
          src={videoEmbedUrl}
          title={title}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
