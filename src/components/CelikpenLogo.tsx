import React from 'react';

interface CelikpenLogoProps {
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'dark' | 'light';
}

/**
 * Çelikpen kurumsal kelime markası.
 * Header ve footer yüzeylerinde arka plan kutusu olmadan, tamamen şeffaf kullanılır.
 * Yeni marka işareti; açık sağ kenarıyla "C" harfini andıran mimari cephe
 * konturu, cam bölmeleri ve kırmızı eşik/çengel vurgusundan oluşur.
 */
export const CelikpenLogo: React.FC<CelikpenLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
}) => {
  const isCompact = size === 'sm';
  const isLight = variant === 'light';
  const iconSize = isCompact ? 'h-7 w-7' : 'h-8 w-8';
  const wordmarkSize = isCompact
    ? 'text-[12.5px] tracking-[0.17em]'
    : 'text-[15px] tracking-[0.19em]';
  const descriptorSize = isCompact
    ? 'text-[6.2px] tracking-[0.2em]'
    : 'text-[7px] tracking-[0.22em]';

  const stroke = isLight ? '#FFFFFF' : '#0F172A';
  const accent = isLight ? '#93C5FD' : '#1E3A8A';
  const glass = isLight ? '#93C5FD' : '#BFDBFE';
  const sill = isLight ? '#F87171' : '#D91B24';
  const wordmarkColor = isLight ? 'text-white' : 'text-[#0F172A]';
  const descriptorColor = isLight ? 'text-slate-300' : 'text-slate-500';
  const lineColor = isLight ? 'bg-white/40' : 'bg-[#BFDBFE]';
  const registeredColor = isLight ? 'text-[#93C5FD]' : 'text-[#1E3A8A]';

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2.5 border-none bg-transparent p-0 shadow-none select-none sm:gap-3 ${className}`}
      aria-label="Çelikpen Mimari Cam Sistemleri"
    >
      <span className={`relative shrink-0 ${iconSize}`} aria-hidden="true">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full overflow-visible"
        >
          {/* Açık sağ kenarlı mimari "C" cephe konturu */}
          <path
            d="M33.5 7.5H10A2.5 2.5 0 0 0 7.5 10v20a2.5 2.5 0 0 0 2.5 2.5h23.5"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="square"
          />
          {/* Dikey cam bölmeleri */}
          <path
            d="M16.5 7.5v25M24 7.5v25"
            stroke={accent}
            strokeWidth="1.4"
            strokeLinecap="square"
          />
          {/* Yatay travers */}
          <path
            d="M7.5 20h20.5"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.55"
          />
          {/* Cam yansıması */}
          <path
            d="M10.5 25 16 10.5"
            stroke={glass}
            strokeWidth="1"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />
          {/* Kırmızı eşik / çengel vurgusu */}
          <path
            d="M18 35h7"
            stroke={sill}
            strokeWidth="2.6"
            strokeLinecap="square"
          />
        </svg>
      </span>

      <span className="flex flex-col justify-center leading-none">
        <span className="flex items-start">
          <span
            className={`whitespace-nowrap uppercase leading-none ${
              isLight ? 'font-normal' : 'font-medium'
            } ${wordmarkColor} ${wordmarkSize}`}
          >
            ÇELİKPEN
          </span>
          <span
            className={`ml-0.5 font-medium leading-none ${registeredColor} ${
              isCompact ? 'text-[6px]' : 'text-[7px]'
            }`}
          >
            ®
          </span>
        </span>
        <span
          className={`mt-1.5 flex items-center gap-1.5 whitespace-nowrap font-medium uppercase leading-none ${descriptorColor} ${descriptorSize}`}
        >
          <span className={`h-px w-2 ${lineColor}`} aria-hidden="true" />
          MİMARİ CAM SİSTEMLERİ
          <span className={`h-px w-2 ${lineColor}`} aria-hidden="true" />
        </span>
      </span>
    </span>
  );
};
