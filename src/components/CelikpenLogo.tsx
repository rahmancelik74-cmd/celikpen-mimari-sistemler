import React from 'react';

interface CelikpenLogoProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const CelikpenLogo: React.FC<CelikpenLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const iconBox = size === 'sm' ? 'h-[24px] w-[24px]' : 'h-[26px] w-[26px]';
  const wordmarkSize =
    size === 'sm'
      ? 'text-[15px] tracking-[0.11em]'
      : 'text-[17px] tracking-[0.12em]';

  return (
    <div
      className={`inline-flex h-8 items-center gap-2.5 select-none ${className}`}
    >
      {/* 26x26px Minimalist Mimari Monogram / Pencere İkonu (1.75px İnce Çizgi) */}
      <div
        className={`relative flex shrink-0 items-center justify-center ${iconBox}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        >
          {/* Dış Geometrik Pencere / Cephe Çerçevesi (#0B1560) */}
          <rect
            x="4.5"
            y="4.5"
            width="19"
            height="19"
            rx="2"
            stroke="#0B1560"
            strokeWidth="1.75"
          />
          {/* İç Panoramik Cam Kanat Bölmeleri (#0B1560) */}
          <path
            d="M14 4.5V23.5M4.5 14H23.5"
            stroke="#0B1560"
            strokeWidth="1.4"
            strokeOpacity="0.45"
          />
          {/* İmza Kırmızı L-Köşe Mimari Vurgusu (#D91B24) */}
          <path
            d="M2 12V2H12"
            stroke="#D91B24"
            strokeWidth="2"
            strokeLinecap="square"
          />
          {/* Sağ Alt Küçük Kırmızı Köşe Noktası */}
          <rect x="16.5" y="16.5" width="4.5" height="4.5" rx="0.75" fill="#D91B24" />
        </svg>
      </div>

      {/* Kompakt & Zarif Tipografi: ÇELİKPEN + CAM & MİMARİ */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-start">
          <span
            className={`font-extrabold uppercase leading-none text-[#0B1560] ${wordmarkSize}`}
          >
            ÇELİKPEN
          </span>
          <span className="-mt-0.5 ml-0.5 text-[8.5px] font-bold text-[#D91B24]">
            ®
          </span>
        </div>
        <span className="mt-0.5 text-[7.5px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          CAM &amp; MİMARİ
        </span>
      </div>
    </div>
  );
};
