import React from 'react';

interface CelikpenLogoProps {
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'dark' | 'light';
}

/**
 * Çelikpen kurumsal kimliği.
 *
 * 32×32 kare içinde iki açılı mimari cam düzlemin birleşmesinden oluşan,
 * ince bir Ç/P prizması taşır. Açık zeminlerde safir→gökyüzü (#1E3A8A →
 * #38BDF8), koyu zeminlerde gökyüzü→beyaz (#38BDF8 → #FFFFFF) gradyan
 * kullanılır. Sağ üstteki hassas köşe çentiği mühendislik vurgusudur.
 *
 * Kelime markası; ÇELİK + PEN olarak iki renkli, geniş harf aralıklı ve
 * mikro ölçekli "CAM BALKON & MİMARİ SİSTEMLER" alt başlığıyla kullanılır.
 */
export const CelikpenLogo: React.FC<CelikpenLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
}) => {
  const isCompact = size === 'sm';
  const isLight = variant === 'light';
  const iconSize = isCompact ? 'h-7 w-7' : 'h-8 w-8';
  const gradientId = isLight ? 'celikpen-prism-on-dark' : 'celikpen-prism-on-light';
  const gradientFrom = isLight ? '#38BDF8' : '#1E3A8A';
  const gradientTo = isLight ? '#FFFFFF' : '#38BDF8';
  const accent = isLight ? '#FFFFFF' : '#38BDF8';

  const wordmarkSize = isCompact
    ? 'text-[12.5px] sm:text-[13.5px]'
    : 'text-[13px] min-[380px]:text-[14px] sm:text-[15px]';

  const captionSize = isCompact
    ? 'text-[6.2px] tracking-[0.2em] sm:text-[7px] sm:tracking-[0.24em]'
    : 'text-[6.2px] tracking-[0.18em] min-[380px]:text-[6.8px] min-[380px]:tracking-[0.2em] sm:text-[8px] sm:tracking-[0.26em]';

  return (
    <span className={`inline-flex select-none items-center gap-2.5 sm:gap-3 ${className}`}>
      <span className={`relative inline-flex shrink-0 ${iconSize}`} aria-hidden="true">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="3.4"
              y1="3.2"
              x2="28.6"
              y2="28.8"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={gradientFrom} />
              <stop offset="1" stopColor={gradientTo} />
            </linearGradient>
          </defs>

          {/* Birbirine geçen iki açılı cam düzlem */}
          <path
            d="M3.6 6.2 14.8 3.1v26.1L3.6 25.8V6.2Z"
            fill={`url(#${gradientId})`}
            opacity={isLight ? 0.14 : 0.12}
          />
          <path
            d="M17.2 3.1 28.4 6.2v19.6l-11.2 3.1V3.1Z"
            fill={`url(#${gradientId})`}
            opacity={isLight ? 0.2 : 0.16}
          />

          {/* Açılı cam kenarları */}
          <path
            d="M3.6 6.2 14.8 3.1v26.1L3.6 25.8V6.2ZM17.2 3.1l11.2 3.1v19.6l-11.2 3.1V3.1Z"
            stroke={`url(#${gradientId})`}
            strokeOpacity={isLight ? 0.5 : 0.38}
            strokeWidth="0.7"
            strokeLinejoin="miter"
          />

          {/* Ç — açık sağ kenarlı, merkeze oturan mimari çerçeve */}
          <path
            d="M16.9 7.35 10.3 8.95 7.25 16l3.05 7.05 6.6 1.6"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* P — dikey taşıyıcı ve prizmatik göbek */}
          <path
            d="M18 5.25v21.5"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="square"
          />
          <path
            d="M18 6.8 24.75 8.35 27.2 12.05v3.7l-2.45 3.7L18 20.95"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Cam yansımaları */}
          <path
            d="M9.55 22.1 14.15 9.85"
            stroke={`url(#${gradientId})`}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity={isLight ? 0.75 : 0.6}
          />
          <path
            d="M20.2 10.25 25.15 11.45 26.55 14.05"
            stroke={accent}
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity={isLight ? 0.8 : 0.55}
          />

          {/* Hassas köşe vurgusu */}
          <path
            d="M26.3 4h2.6v2.6"
            stroke={accent}
            strokeWidth="1.45"
            strokeLinecap="square"
          />
        </svg>
      </span>

      <span className="flex min-w-0 flex-col justify-center">
        <span
          className={`flex items-baseline whitespace-nowrap font-extrabold uppercase leading-none tracking-[0.14em] ${wordmarkSize}`}
        >
          <span className={isLight ? 'text-white' : 'text-[#0F172A]'}>ÇELİK</span>
          <span className={isLight ? 'text-[#38BDF8]' : 'text-[#1E3A8A]'}>PEN</span>
        </span>
        <span
          className={`mt-1.5 whitespace-nowrap font-semibold uppercase leading-none ${captionSize} ${
            isLight ? 'text-[#BFDBFE]' : 'text-slate-500'
          }`}
        >
          CAM BALKON &amp; MİMARİ SİSTEMLER
        </span>
      </span>
    </span>
  );
};
