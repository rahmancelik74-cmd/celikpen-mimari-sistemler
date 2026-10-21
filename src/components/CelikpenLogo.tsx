import React from 'react';

interface CelikpenLogoProps {
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Çelikpen kurumsal rozeti.
 * Beyaz zemin üzerinde ince geometrik pencere monogramı ve geniş harf aralıklı
 * kurumsal kelime markası. Header ve footer aynı rozeti paylaşır.
 */
export const CelikpenLogo: React.FC<CelikpenLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const isCompact = size === 'sm';
  const iconSize = isCompact ? 'h-7 w-7' : 'h-8 w-8';
  const wordmarkSize = isCompact
    ? 'text-[13px] tracking-[0.2em]'
    : 'text-[15.5px] tracking-[0.22em]';
  const descriptorSize = isCompact ? 'text-[6.5px] tracking-[0.22em]' : 'text-[7.5px] tracking-[0.25em]';
  const padding = isCompact ? 'px-3 py-2' : 'px-4 py-2.5';

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2.5 rounded-[4px] border border-slate-200/90 bg-white shadow-sm select-none sm:gap-3 ${padding} ${className}`}
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
            stroke="#0F172A"
            strokeWidth="1.4"
          />
          <path
            d="M21 5.25V26.75M5.25 21H26.75"
            stroke="#0F172A"
            strokeWidth="1.15"
            strokeOpacity="0.38"
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
            className={`whitespace-nowrap font-light uppercase leading-none text-[#0F172A] ${wordmarkSize}`}
          >
            ÇELİKPEN
          </span>
          <span
            className={`ml-0.5 font-medium leading-none text-slate-400 ${
              isCompact ? 'text-[6px]' : 'text-[7px]'
            }`}
          >
            ®
          </span>
        </span>
        <span
          className={`mt-1.5 flex items-center gap-1.5 whitespace-nowrap font-medium uppercase leading-none text-slate-500 ${descriptorSize}`}
        >
          <span className="h-px w-2 bg-slate-300" aria-hidden="true" />
          CAM BALKON SİSTEMLERİ
          <span className="h-px w-2 bg-slate-300" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
};
