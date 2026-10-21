import React from 'react';

interface CelikpenLogoProps {
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'dark' | 'light';
}

/**
 * Çelikpen kurumsal kelime markası.
 * Header ve footer yüzeylerinde arka plan kutusu olmadan, tamamen şeffaf kullanılır.
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
    ? 'text-[13px] tracking-[0.2em]'
    : 'text-[15.5px] tracking-[0.22em]';
  const descriptorSize = isCompact
    ? 'text-[6.5px] tracking-[0.22em]'
    : 'text-[7.5px] tracking-[0.25em]';

  const stroke = isLight ? '#FFFFFF' : '#0F172A';
  const wordmarkColor = isLight ? 'text-white' : 'text-[#0F172A]';
  const descriptorColor = isLight ? 'text-slate-300' : 'text-slate-500';
  const lineColor = isLight ? 'bg-white/30' : 'bg-slate-300';
  const registeredColor = isLight ? 'text-slate-400' : 'text-slate-400';

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2.5 border-none bg-transparent p-0 shadow-none select-none sm:gap-3 ${className}`}
      aria-label="Çelikpen Cam Balkon Sistemleri"
    >
      <span className={`relative shrink-0 ${iconSize}`} aria-hidden="true">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full overflow-visible"
        >
          <rect
            x="5.25"
            y="5.25"
            width="21.5"
            height="21.5"
            rx="1.25"
            stroke={stroke}
            strokeWidth="1.4"
          />
          <path
            d="M21 5.25V26.75M5.25 21H26.75"
            stroke={stroke}
            strokeWidth="1.15"
            strokeOpacity={isLight ? '0.38' : '0.38'}
          />
          <path
            d="M2 10.5V2H10.5"
            stroke="#7C3AED"
            strokeWidth="2.2"
            strokeLinecap="square"
          />
          <rect x="22.4" y="22.4" width="4.2" height="4.2" rx="0.6" fill="#D91B24" />
        </svg>
      </span>

      <span className="flex flex-col justify-center leading-none">
        <span className="flex items-start">
          <span
            className={`whitespace-nowrap uppercase leading-none ${
              isLight ? 'font-normal' : 'font-light'
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
          CAM BALKON SİSTEMLERİ
          <span className={`h-px w-2 ${lineColor}`} aria-hidden="true" />
        </span>
      </span>
    </span>
  );
};
