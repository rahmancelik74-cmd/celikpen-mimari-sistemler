import React from 'react';
import type { CorporateVisualVariant } from '../../config/winsa-corporate.config';

const VISUAL_LABELS: Record<CorporateVisualVariant, string> = {
  heritage: '35 Yıllık Kurumsal Miras',
  quality: 'Termal & Akustik Laboratuvar',
  certificates: 'Uluslararası Sertifikasyon',
  production: 'CNC Profil Üretim Hattı',
  sustainability: 'Enerji ve Karbon Performansı',
  careers: 'Ustalık ve Mühendislik Kültürü',
  privacy: 'KVKK Veri Güvenliği',
  press: 'Basın ve Marka Hafızası',
  events: 'Fuar ve Mimari Buluşmalar',
};

interface CorporateVisualProps {
  variant: CorporateVisualVariant;
  className?: string;
  bare?: boolean;
}

/**
 * Kurumsal sayfaların görsel omurgası.
 * Tüm kompozisyonlar SVG'dir; harici görsel, telif veya CDN bağımlılığı yoktur.
 */
export function CorporateVisual({ variant, className = '', bare = false }: CorporateVisualProps) {
  return (
    <div
      role="img"
      aria-label={VISUAL_LABELS[variant]}
      className={`${
        bare
          ? 'relative isolate min-h-[250px] overflow-hidden bg-[#0F172A]'
          : 'relative isolate min-h-[250px] overflow-hidden rounded-panel border border-white/10 bg-[#0F172A] shadow-[0_24px_70px_-30px_rgba(15,23,42,0.7)]'
      } ${className}`}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {variant === 'heritage' && <HeritageArt />}
        {variant === 'quality' && <QualityArt />}
        {variant === 'certificates' && <CertificatesArt />}
        {variant === 'production' && <ProductionArt />}
        {variant === 'sustainability' && <SustainabilityArt />}
        {variant === 'careers' && <CareersArt />}
        {variant === 'privacy' && <PrivacyArt />}
        {variant === 'press' && <PressArt />}
        {variant === 'events' && <EventsArt />}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/10 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-[2] flex flex-col justify-between p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#BFDBFE] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
            Çelikpen · 35. Yıl
          </span>
          <span
            className="h-6 w-6 border-r border-t border-[#38BDF8]"
            aria-hidden="true"
          />
        </div>

        <div className="flex items-end justify-between gap-3">
          <span className="max-w-[72%] text-[9px] font-semibold uppercase tracking-[0.14em] text-white/90 sm:text-[10px]">
            {VISUAL_LABELS[variant]}
          </span>
          <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.14em] text-[#93C5FD]">
            1991 — 2026
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   ORTAK SVG ÇERÇEVESİ
   ========================================================================== */

const svgProps = {
  viewBox: '0 0 800 500',
  preserveAspectRatio: 'xMidYMid slice' as const,
  className: 'h-full w-full',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
};

const font = 'Poppins, ui-sans-serif, system-ui, sans-serif';

/* ============================================================================
   1. 35 YILLIK MİRAS / MİMARİ CEPHE
   ========================================================================== */

function HeritageArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="heritage-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.55" stopColor="#172554" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="heritage-glass" x1="430" y1="60" x2="720" y2="450">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <radialGradient id="heritage-glow" cx="0.74" cy="0.2" r="0.72">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.32" />
          <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <pattern id="heritage-grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0v42" fill="none" stroke="#93C5FD" strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="500" fill="url(#heritage-bg)" />
      <rect width="800" height="500" fill="url(#heritage-grid)" />
      <rect width="800" height="500" fill="url(#heritage-glow)" />

      <g opacity="0.5">
        <path d="M0 388h800v112H0z" fill="#0B1120" />
        <path
          d="M38 388V272h108v116M172 388V216h142v172M340 388V246h102v142M468 388V190h156v198M650 388V284h112v104"
          fill="#1E3A8A"
          opacity="0.62"
        />
        <path
          d="M58 292h68M58 317h68M58 342h68M192 238h102M192 263h102M192 288h102M192 313h102M360 268h62M360 293h62M360 318h62M488 214h116M488 239h116M488 264h116M488 289h116M670 306h72M670 331h72"
          stroke="#93C5FD"
          strokeOpacity="0.38"
          strokeWidth="2"
        />
        <path d="M120 388V320h32v68M262 388V302h42v86M572 388V282h48v106" fill="#0F172A" opacity="0.85" />
      </g>

      <text
        x="38"
        y="318"
        fill="none"
        stroke="url(#heritage-glass)"
        strokeWidth="2.4"
        fontFamily={font}
        fontSize="236"
        fontWeight="800"
        letterSpacing="-14"
        opacity="0.92"
      >
        35
      </text>
      <text x="54" y="362" fill="#93C5FD" fontFamily={font} fontSize="19" fontWeight="700" letterSpacing="14">
        YIL
      </text>
      <text x="54" y="405" fill="#FFFFFF" fontFamily={font} fontSize="11" fontWeight="500" letterSpacing="4.5" opacity="0.72">
        MİMARİ MİRAS
      </text>

      <g>
        <path d="M470 82 575 52v304l-105 32z" fill="url(#heritage-glass)" fillOpacity="0.08" stroke="#93C5FD" strokeOpacity="0.4" strokeWidth="1.5" />
        <path d="M575 52 684 88v282l-109-14z" fill="url(#heritage-glass)" fillOpacity="0.12" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="1.5" />
        <path d="M522 67v303M575 52v304M630 69v292" stroke="#93C5FD" strokeOpacity="0.38" strokeWidth="1.4" />
        <path d="M493 350 563 73" stroke="#FFFFFF" strokeOpacity="0.38" strokeWidth="1.2" />
        <path d="M646 98 589 344" stroke="#38BDF8" strokeOpacity="0.5" strokeWidth="1.2" />
      </g>

      <g>
        <path d="M470 420h232" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="470" cy="420" r="5.5" fill="#38BDF8" />
        <circle cx="702" cy="420" r="5.5" fill="#FFFFFF" />
        <text x="470" y="450" fill="#93C5FD" fontFamily={font} fontSize="15" fontWeight="600" textAnchor="middle">
          1991
        </text>
        <text x="702" y="450" fill="#FFFFFF" fontFamily={font} fontSize="15" fontWeight="600" textAnchor="middle">
          2026
        </text>
        <text x="586" y="400" fill="#BFDBFE" fontFamily={font} fontSize="10" fontWeight="500" letterSpacing="3.5" textAnchor="middle">
          35 YILLIK KESİNTİSİZ ÜRETİM
        </text>
      </g>

      <path d="M738 42h24v24" fill="none" stroke="#38BDF8" strokeWidth="3" />
    </svg>
  );
}

/* ============================================================================
   2. CNC PROFİL ÜRETİM HATTI
   ========================================================================== */

function ProductionArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="production-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1220" />
          <stop offset="0.6" stopColor="#0F172A" />
          <stop offset="1" stopColor="#172554" />
        </linearGradient>
        <linearGradient id="production-metal" x1="120" y1="180" x2="660" y2="420">
          <stop offset="0" stopColor="#334155" />
          <stop offset="0.45" stopColor="#94A3B8" />
          <stop offset="0.7" stopColor="#475569" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="production-glass" x1="560" y1="160" x2="700" y2="350">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.08" />
        </linearGradient>
        <pattern id="production-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0v36" fill="none" stroke="#38BDF8" strokeOpacity="0.09" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="500" fill="url(#production-bg)" />
      <rect width="800" height="500" fill="url(#production-grid)" />
      <circle cx="690" cy="90" r="170" fill="#1E3A8A" opacity="0.24" />

      <g opacity="0.5">
        <path d="M0 430h800" stroke="#1E3A8A" strokeWidth="2" />
        <path d="M44 430V160M70 430V200M96 430V230" stroke="#38BDF8" strokeOpacity="0.25" />
        <path d="M44 180h16M44 210h10M44 240h16M44 270h10M44 300h16M44 330h10M44 360h16M44 390h10" stroke="#93C5FD" strokeOpacity="0.35" strokeWidth="1.2" />
      </g>

      <g>
        <rect x="86" y="158" width="628" height="238" rx="6" fill="#0B1120" stroke="#1E3A8A" strokeWidth="2" />
        <rect x="112" y="184" width="576" height="180" rx="3" fill="#0F172A" stroke="#38BDF8" strokeOpacity="0.38" />
        <path d="M112 240h576M112 308h576" stroke="#1E3A8A" strokeWidth="1.5" />
        <rect x="236" y="112" width="328" height="22" rx="3" fill="url(#production-metal)" />
        <rect x="368" y="134" width="64" height="106" rx="4" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.7" />
        <rect x="380" y="146" width="40" height="34" rx="2" fill="#1E3A8A" />
        <path d="M400 240v64" stroke="#38BDF8" strokeWidth="3" />
        <circle cx="400" cy="304" r="12" fill="#38BDF8" />
        <path d="M400 316 474 386" stroke="#38BDF8" strokeWidth="2" strokeDasharray="5 6" />
        <path d="M494 370 522 398" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
        <path d="M536 360 558 382" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.6" />

        <g transform="translate(148 344)">
          <rect width="300" height="16" rx="2" fill="url(#production-metal)" />
          <path d="M18 5h264M18 11h264" stroke="#0F172A" strokeOpacity="0.55" />
        </g>
        <g transform="translate(148 366)">
          <rect width="300" height="16" rx="2" fill="url(#production-metal)" opacity="0.9" />
          <path d="M18 5h264M18 11h264" stroke="#0F172A" strokeOpacity="0.55" />
        </g>
        <g transform="translate(148 388)">
          <rect width="300" height="16" rx="2" fill="url(#production-metal)" opacity="0.75" />
          <path d="M18 5h264M18 11h264" stroke="#0F172A" strokeOpacity="0.55" />
        </g>

        <rect x="558" y="166" width="116" height="172" rx="2" fill="url(#production-glass)" stroke="#93C5FD" strokeOpacity="0.6" />
        <path d="M574 180 652 326M602 172 668 298" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="1.2" />
        <path d="M558 220h116M558 286h116" stroke="#FFFFFF" strokeOpacity="0.14" />
      </g>

      <g>
        <text x="86" y="76" fill="#BFDBFE" fontFamily={font} fontSize="12" fontWeight="600" letterSpacing="4">
          CNC PROFİL ÜRETİM HATTI
        </text>
        <text x="86" y="104" fill="#FFFFFF" fontFamily={font} fontSize="26" fontWeight="800">
          0,1 mm tolerans
        </text>
        <text x="86" y="126" fill="#93C5FD" fontFamily={font} fontSize="10" fontWeight="500" letterSpacing="2.5">
          T66 ALÜMİNYUM • WINSA PVC • LAZER ÖLÇÜM
        </text>
      </g>

      <g>
        <rect x="566" y="72" width="148" height="54" rx="3" fill="#0F172A" stroke="#38BDF8" strokeOpacity="0.4" />
        <text x="580" y="92" fill="#93C5FD" fontFamily={font} fontSize="9" fontWeight="600" letterSpacing="2">
          AKTİF İŞ EMRİ
        </text>
        <text x="580" y="112" fill="#FFFFFF" fontFamily={font} fontSize="13" fontWeight="700">
          ÇP-VBS / 4+20+4
        </text>
      </g>

      <g fill="none" stroke="#38BDF8" strokeOpacity="0.55">
        <circle cx="706" cy="396" r="18" />
        <circle cx="706" cy="396" r="7" />
        <path d="M706 374v10M706 408v10M684 396h10M718 396h10" />
      </g>
      <text x="706" y="440" fill="#93C5FD" fontFamily={font} fontSize="9" fontWeight="500" textAnchor="middle">
        LAZER
      </text>
    </svg>
  );
}

/* ============================================================================
   3. TERMAL & AKUSTİK LABORATUVAR
   ========================================================================== */

function QualityArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="quality-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.55" stopColor="#172554" />
          <stop offset="1" stopColor="#0C4A6E" />
        </linearGradient>
        <linearGradient id="quality-warm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D91B24" stopOpacity="0.45" />
          <stop offset="1" stopColor="#D91B24" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="quality-cool" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="quality-glass" x1="280" y1="140" x2="520" y2="360">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>
        <pattern id="quality-grid" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0H0v34" fill="none" stroke="#93C5FD" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="500" fill="url(#quality-bg)" />
      <rect width="800" height="500" fill="url(#quality-grid)" />
      <rect x="0" y="0" width="400" height="500" fill="url(#quality-warm)" />
      <rect x="400" y="0" width="400" height="500" fill="url(#quality-cool)" />

      <g>
        <path d="M170 118h250M170 118v286M420 118v286" stroke="#93C5FD" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4 6" />
        <path d="M170 118h-18M170 168h-12M170 218h-18M170 268h-12M170 318h-18M170 368h-12M170 404h-18" stroke="#93C5FD" strokeOpacity="0.55" strokeWidth="1.4" />
        <text x="134" y="122" fill="#FCA5A5" fontFamily={font} fontSize="9" fontWeight="600" textAnchor="end">+24°C</text>
        <text x="134" y="222" fill="#FCA5A5" fontFamily={font} fontSize="9" fontWeight="600" textAnchor="end">İÇ</text>
        <text x="134" y="406" fill="#93C5FD" fontFamily={font} fontSize="9" fontWeight="600" textAnchor="end">DIŞ</text>
      </g>

      <g>
        <rect x="250" y="132" width="300" height="232" rx="4" fill="#0B1220" stroke="#93C5FD" strokeOpacity="0.55" strokeWidth="2" />
        <rect x="278" y="162" width="86" height="172" fill="url(#quality-glass)" stroke="#FFFFFF" strokeOpacity="0.48" />
        <rect x="436" y="162" width="86" height="172" fill="url(#quality-glass)" stroke="#FFFFFF" strokeOpacity="0.48" />
        <rect x="364" y="162" width="72" height="172" fill="#0F172A" stroke="#38BDF8" strokeOpacity="0.35" />
        <path d="M286 174 350 314M304 166 370 312M446 176 510 308M462 166 528 300" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.2" />
        <path d="M400 177v142" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="4 5" />
        <text x="400" y="252" fill="#93C5FD" fontFamily={font} fontSize="9" fontWeight="600" textAnchor="middle">
          ARGON
        </text>
        <path d="M250 220h300M250 284h300" stroke="#93C5FD" strokeOpacity="0.2" />
      </g>

      <g fill="none" strokeWidth="2">
        <path d="M564 178c30-30 30-58 0-88M592 178c46-30 46-58 0-88" stroke="#38BDF8" strokeOpacity="0.75" />
        <path d="M236 178c-30-30-30-58 0-88M208 178c-46-30-46-58 0-88" stroke="#FCA5A5" strokeOpacity="0.65" />
        <path d="M564 334c30 30 30 58 0 88M592 334c46 30 46 58 0 88" stroke="#38BDF8" strokeOpacity="0.5" />
        <path d="M236 334c-30 30-30 58 0 88M208 334c-46 30-46 58 0 88" stroke="#FCA5A5" strokeOpacity="0.45" />
      </g>

      <g>
        <rect x="76" y="396" width="148" height="56" rx="3" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.35" />
        <text x="90" y="416" fill="#93C5FD" fontFamily={font} fontSize="8" fontWeight="600" letterSpacing="2">
          HAVA GEÇİRİMSİZLİĞİ
        </text>
        <text x="90" y="440" fill="#FFFFFF" fontFamily={font} fontSize="18" fontWeight="800">
          EN 12207 / 4
        </text>
        <rect x="240" y="396" width="148" height="56" rx="3" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.35" />
        <text x="254" y="416" fill="#93C5FD" fontFamily={font} fontSize="8" fontWeight="600" letterSpacing="2">
          SU SIZDIRMAZLIK
        </text>
        <text x="254" y="440" fill="#FFFFFF" fontFamily={font} fontSize="18" fontWeight="800">
          EN 12208 / 9A
        </text>
        <rect x="404" y="396" width="148" height="56" rx="3" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.35" />
        <text x="418" y="416" fill="#93C5FD" fontFamily={font} fontSize="8" fontWeight="600" letterSpacing="2">
          RÜZGÂR YÜKÜ
        </text>
        <text x="418" y="440" fill="#FFFFFF" fontFamily={font} fontSize="18" fontWeight="800">
          EN 12210 / C5
        </text>
        <rect x="568" y="396" width="156" height="56" rx="3" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.35" />
        <text x="582" y="416" fill="#93C5FD" fontFamily={font} fontSize="8" fontWeight="600" letterSpacing="2">
          ISIL İLETKENLİK
        </text>
        <text x="582" y="440" fill="#FFFFFF" fontFamily={font} fontSize="18" fontWeight="800">
          Uw 0,8–1,1
        </text>
      </g>

      <text x="76" y="72" fill="#BFDBFE" fontFamily={font} fontSize="11" fontWeight="600" letterSpacing="4">
        TERMAL &amp; AKUSTİK LABORATUVAR
      </text>
      <text x="76" y="102" fill="#FFFFFF" fontFamily={font} fontSize="25" fontWeight="800">
        Ölçülebilir performans
      </text>
      <path d="M728 42h24v24" fill="none" stroke="#38BDF8" strokeWidth="3" />
    </svg>
  );
}

/* ============================================================================
   4. SERTİFİKASYON DUVARI
   ========================================================================== */

function CertificatesArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="cert-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.6" stopColor="#172554" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="cert-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DBEAFE" />
        </linearGradient>
        <radialGradient id="cert-glow" cx="0.7" cy="0.2" r="0.75">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.32" />
          <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="500" fill="url(#cert-bg)" />
      <rect width="800" height="500" fill="url(#cert-glow)" />
      <g opacity="0.2" stroke="#93C5FD">
        <path d="M0 100h800M0 200h800M0 300h800M0 400h800" />
        <path d="M100 0v500M200 0v500M300 0v500M400 0v500M500 0v500M600 0v500M700 0v500" />
      </g>

      <g transform="rotate(-8 250 260)">
        <rect x="108" y="94" width="260" height="330" rx="8" fill="url(#cert-paper)" />
        <rect x="124" y="112" width="228" height="294" rx="3" fill="none" stroke="#1E3A8A" strokeOpacity="0.35" />
        <text x="146" y="152" fill="#1E3A8A" fontFamily={font} fontSize="11" fontWeight="700" letterSpacing="3">
          ÇELİKPEN
        </text>
        <text x="146" y="190" fill="#0F172A" fontFamily={font} fontSize="24" fontWeight="800">
          TSE EN 12150
        </text>
        <text x="146" y="214" fill="#475569" fontFamily={font} fontSize="11" fontWeight="500">
          TEMPERLİ GÜVENLİK CAMI
        </text>
        <path d="M146 238h178M146 252h140M146 266h160" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="234" cy="336" r="38" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="3 5" />
        <circle cx="234" cy="336" r="27" fill="#1E3A8A" />
        <path d="m222 336 8 8 16-18" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="234" y="382" fill="#1E3A8A" fontFamily={font} fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="2">
          DOĞRULANMIŞ
        </text>
      </g>

      <g transform="rotate(7 550 260)">
        <rect x="432" y="86" width="260" height="338" rx="8" fill="#EFF6FF" />
        <rect x="448" y="104" width="228" height="302" rx="3" fill="none" stroke="#1E3A8A" strokeOpacity="0.35" />
        <text x="470" y="146" fill="#1E3A8A" fontFamily={font} fontSize="11" fontWeight="700" letterSpacing="3">
          ÇELİKPEN
        </text>
        <text x="470" y="184" fill="#0F172A" fontFamily={font} fontSize="24" fontWeight="800">
          EN 14351-1
        </text>
        <text x="470" y="208" fill="#475569" fontFamily={font} fontSize="11" fontWeight="500">
          PENCERE VE KAPI STANDARDI
        </text>
        <path d="M470 232h178M470 246h140M470 260h160" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="558" cy="330" r="34" fill="none" stroke="#1E3A8A" strokeWidth="2" />
        <text x="558" y="341" fill="#1E3A8A" fontFamily={font} fontSize="24" fontWeight="800" textAnchor="middle">
          CE
        </text>
        <text x="558" y="382" fill="#1E3A8A" fontFamily={font} fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="2">
          AVRUPA UYGUNLUĞU
        </text>
      </g>

      <g>
        <rect x="78" y="62" width="126" height="48" rx="3" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.35" />
        <text x="90" y="82" fill="#93C5FD" fontFamily={font} fontSize="8" fontWeight="600" letterSpacing="2">
          YÖNETİM SİSTEMİ
        </text>
        <text x="90" y="99" fill="#FFFFFF" fontFamily={font} fontSize="13" fontWeight="700">
          ISO 9001:2015
        </text>
      </g>

      <text x="602" y="466" fill="#93C5FD" fontFamily={font} fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="3">
        TSE • CE • EN 14351-1 • ISO 9001
      </text>
      <path d="M728 30h24v24" fill="none" stroke="#38BDF8" strokeWidth="3" />
    </svg>
  );
}

/* ============================================================================
   5. SÜRDÜRÜLEBİLİRLİK / ENERJİ
   ========================================================================== */

function SustainabilityArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="sustain-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.58" stopColor="#064E3B" />
          <stop offset="1" stopColor="#0C4A6E" />
        </linearGradient>
        <linearGradient id="sustain-glass" x1="240" y1="120" x2="520" y2="420">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.42" />
          <stop offset="1" stopColor="#34D399" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="sustain-glow" cx="0.7" cy="0.25" r="0.7">
          <stop offset="0" stopColor="#34D399" stopOpacity="0.28" />
          <stop offset="1" stopColor="#34D399" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="500" fill="url(#sustain-bg)" />
      <rect width="800" height="500" fill="url(#sustain-glow)" />
      <g opacity="0.22" stroke="#A7F3D0">
        <path d="M0 100h800M0 200h800M0 300h800M0 400h800" />
        <path d="M100 0v500M200 0v500M300 0v500M400 0v500M500 0v500M600 0v500M700 0v500" />
      </g>

      <g>
        <circle cx="650" cy="112" r="46" fill="#FBBF24" opacity="0.85" />
        <g stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" opacity="0.7">
          <path d="M650 44v-18M650 198v-18M582 112h-18M736 112h-18M602 64l-13-13M711 173l-13-13M698 64l13-13M589 173l13-13" />
        </g>
      </g>

      <g>
        <rect x="168" y="118" width="364" height="286" rx="4" fill="#0B1220" stroke="#93C5FD" strokeOpacity="0.48" strokeWidth="2" />
        <rect x="190" y="140" width="150" height="240" fill="url(#sustain-glass)" stroke="#A7F3D0" strokeOpacity="0.4" />
        <rect x="360" y="140" width="150" height="240" fill="url(#sustain-glass)" stroke="#A7F3D0" strokeOpacity="0.4" />
        <path d="M208 158 318 366M228 148 346 362M378 158 488 366M398 148 516 362" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.2" />
        <path d="M350 140v240" stroke="#38BDF8" strokeOpacity="0.8" strokeWidth="3" />
      </g>

      <path
        d="M430 332c-38-8-56-42-46-80 32 1 65 19 77 51 4 11 3 22-2 32-10-1-20-2-29-3Z"
        fill="#34D399"
        opacity="0.9"
      />
      <path d="M394 288c22 18 38 38 49 63" stroke="#064E3B" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
      <path d="M352 352c34 8 68 4 96-14" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

      <g>
        <rect x="80" y="72" width="206" height="88" rx="3" fill="#0B1220" stroke="#34D399" strokeOpacity="0.4" />
        <text x="96" y="94" fill="#A7F3D0" fontFamily={font} fontSize="8" fontWeight="600" letterSpacing="2.4">
          YILLIK ENERJİ KAZANCI
        </text>
        <text x="96" y="128" fill="#FFFFFF" fontFamily={font} fontSize="34" fontWeight="800">
          %72
        </text>
        <text x="170" y="128" fill="#A7F3D0" fontFamily={font} fontSize="10" fontWeight="500">
          ısı tasarrufu
        </text>
        <text x="96" y="148" fill="#93C5FD" fontFamily={font} fontSize="9" fontWeight="500">
          4+20+4 argonlu ısıcam
        </text>
      </g>

      <g>
        <rect x="554" y="356" width="168" height="70" rx="3" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.35" />
        <text x="568" y="378" fill="#93C5FD" fontFamily={font} fontSize="8" fontWeight="600" letterSpacing="2">
          KARBON AZALTIMI
        </text>
        <text x="568" y="406" fill="#FFFFFF" fontFamily={font} fontSize="24" fontWeight="800">
          1,2 Ton
        </text>
        <text x="650" y="406" fill="#A7F3D0" fontFamily={font} fontSize="9" fontWeight="500">
          CO₂ / daire / yıl
        </text>
      </g>

      <g fill="none" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <path d="M80 440c44-28 88-28 132 0M236 440c44-28 88-28 132 0M392 440c44-28 88-28 132 0" />
        <path d="m92 430 18 10-18 10M248 430l18 10-18 10M404 430l18 10-18 10" />
      </g>
    </svg>
  );
}

/* ============================================================================
   6. İNSAN KAYNAKLARI / USTALIK
   ========================================================================== */

function CareersArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="careers-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1220" />
          <stop offset="0.55" stopColor="#172554" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="careers-figure" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#93C5FD" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <pattern id="careers-blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" fill="none" stroke="#93C5FD" strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="500" fill="url(#careers-bg)" />
      <rect width="800" height="500" fill="url(#careers-blueprint)" />
      <path d="M58 410h684" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M58 410 140 300h520l82 110" fill="none" stroke="#93C5FD" strokeOpacity="0.22" strokeWidth="1.4" />

      <g>
        <circle cx="294" cy="248" r="48" fill="url(#careers-figure)" />
        <path d="M214 410c0-58 36-100 80-100s80 42 80 100" fill="#1D4ED8" opacity="0.85" />
        <path d="M252 228c0-28 18-48 42-48s42 20 42 48" fill="#0F172A" stroke="#93C5FD" strokeOpacity="0.55" strokeWidth="2" />
        <path d="M252 228h84" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
      </g>

      <g>
        <circle cx="470" cy="232" r="54" fill="url(#careers-figure)" />
        <path d="M376 410c0-68 42-116 94-116s94 48 94 116" fill="#0F172A" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="2" />
        <path d="M430 196c8-24 25-38 44-38 20 0 36 14 44 38" fill="#0F172A" stroke="#93C5FD" strokeOpacity="0.55" strokeWidth="2" />
        <path d="M438 190h64" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        <path d="M470 300v110" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.4" strokeDasharray="4 6" />
      </g>

      <g>
        <circle cx="638" cy="270" r="40" fill="url(#careers-figure)" />
        <path d="M572 410c0-50 30-86 66-86s66 36 66 86" fill="#0EA5E9" opacity="0.45" />
        <path d="M606 252c0-22 14-38 32-38s32 16 32 38" fill="#0F172A" stroke="#93C5FD" strokeOpacity="0.55" strokeWidth="2" />
      </g>

      <g fill="#BFDBFE" fontFamily={font} fontSize="10" fontWeight="600" letterSpacing="2.4">
        <text x="294" y="440" textAnchor="middle">USTALIK</text>
        <text x="470" y="440" textAnchor="middle">MÜHENDİSLİK</text>
        <text x="638" y="440" textAnchor="middle">EĞİTİM</text>
      </g>

      <g>
        <path d="M92 92h128v38H92z" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.4" />
        <text x="106" y="116" fill="#93C5FD" fontFamily={font} fontSize="9" fontWeight="600" letterSpacing="2">
          35 YILLIK EKİP KÜLTÜRÜ
        </text>
        <path d="M690 90h28v28M718 90l-46 46M638 124h28v28" fill="none" stroke="#38BDF8" strokeWidth="2.4" />
        <text x="688" y="174" fill="#BFDBFE" fontFamily={font} fontSize="9" fontWeight="600" textAnchor="end" letterSpacing="2">
          GELECEĞE
        </text>
      </g>
    </svg>
  );
}

/* ============================================================================
   7. KVKK / VERİ GÜVENLİĞİ
   ========================================================================== */

function PrivacyArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="privacy-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.58" stopColor="#172554" />
          <stop offset="1" stopColor="#0C4A6E" />
        </linearGradient>
        <linearGradient id="privacy-shield" x1="480" y1="110" x2="650" y2="390">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#privacy-bg)" />
      <g opacity="0.18" stroke="#93C5FD">
        <path d="M0 100h800M0 200h800M0 300h800M0 400h800" />
        <path d="M100 0v500M200 0v500M300 0v500M400 0v500M500 0v500M600 0v500M700 0v500" />
      </g>

      <g>
        <path d="M530 116 642 156v92c0 86-52 136-112 162-60-26-112-76-112-162v-92z" fill="#0B1220" stroke="url(#privacy-shield)" strokeWidth="3" />
        <rect x="548" y="228" width="104" height="86" rx="8" fill="#1E3A8A" stroke="#93C5FD" strokeOpacity="0.7" />
        <path d="M568 228v-24c0-24 14-42 32-42s32 18 32 42v24" fill="none" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
        <circle cx="600" cy="264" r="10" fill="#38BDF8" />
        <path d="M600 274v20" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
        <path d="M566 342h68" stroke="#38BDF8" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="4 5" />
      </g>

      <g>
        <rect x="92" y="104" width="278" height="292" rx="5" fill="#0B1220" stroke="#93C5FD" strokeOpacity="0.38" />
        <text x="116" y="142" fill="#93C5FD" fontFamily={font} fontSize="10" fontWeight="600" letterSpacing="3">
          KİŞİSEL VERİ ENVANTERİ
        </text>
        <path d="M116 164h214M116 190h160M116 214h190M116 238h132" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
        <g fill="#38BDF8">
          <circle cx="124" cy="292" r="5" />
          <circle cx="168" cy="292" r="5" />
          <circle cx="212" cy="292" r="5" />
          <circle cx="256" cy="292" r="5" />
        </g>
        <path d="M124 292 196 334 268 292 340 334" fill="none" stroke="#38BDF8" strokeOpacity="0.65" strokeWidth="1.5" />
        <circle cx="196" cy="334" r="6" fill="#FFFFFF" />
        <circle cx="340" cy="334" r="6" fill="#FFFFFF" />
        <text x="116" y="374" fill="#FFFFFF" fontFamily={font} fontSize="18" fontWeight="800">
          6698 / KVKK
        </text>
      </g>

      <g fill="none" stroke="#38BDF8" strokeOpacity="0.5" strokeWidth="1.5">
        <path d="M370 200h110M370 260h110M370 320h110" strokeDasharray="4 6" />
        <circle cx="480" cy="200" r="4" fill="#38BDF8" />
        <circle cx="480" cy="260" r="4" fill="#38BDF8" />
        <circle cx="480" cy="320" r="4" fill="#38BDF8" />
      </g>

      <text x="92" y="446" fill="#BFDBFE" fontFamily={font} fontSize="9" fontWeight="600" letterSpacing="3">
        ŞEFFAFLIK • SINIRLI İŞLEME • VERİ GÜVENLİĞİ
      </text>
      <path d="M728 30h24v24" fill="none" stroke="#38BDF8" strokeWidth="3" />
    </svg>
  );
}

/* ============================================================================
   8. BASIN / MARKA HAFIZASI
   ========================================================================== */

function PressArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="press-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.6" stopColor="#172554" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="press-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DBEAFE" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#press-bg)" />
      <g opacity="0.16" stroke="#93C5FD">
        <path d="M0 100h800M0 200h800M0 300h800M0 400h800" />
        <path d="M100 0v500M200 0v500M300 0v500M400 0v500M500 0v500M600 0v500M700 0v500" />
      </g>

      <g transform="rotate(-5 300 260)">
        <rect x="94" y="88" width="356" height="352" rx="5" fill="url(#press-paper)" />
        <text x="118" y="134" fill="#0F172A" fontFamily={font} fontSize="28" fontWeight="800">
          MİMARİ GÜNDEM
        </text>
        <path d="M118 150h300" stroke="#1E3A8A" strokeWidth="3" />
        <rect x="118" y="174" width="148" height="112" fill="#1E3A8A" />
        <path d="M138 256 184 202l42 54 28-30 24 30" fill="none" stroke="#93C5FD" strokeWidth="3" />
        <circle cx="146" cy="198" r="10" fill="#38BDF8" />
        <path d="M284 182h110M284 200h94M284 218h110M284 236h82M284 254h102M284 272h70" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
        <path d="M118 316h300M118 334h246M118 352h276M118 370h198M118 388h250" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
        <text x="118" y="422" fill="#1E3A8A" fontFamily={font} fontSize="9" fontWeight="700" letterSpacing="2">
          35 YILLIK MARKA HİKÂYESİ
        </text>
      </g>

      <g transform="translate(494 86)">
        <text x="0" y="86" fill="#38BDF8" fontFamily="Georgia, serif" fontSize="120" fontWeight="700" opacity="0.8">
          “
        </text>
        <text x="8" y="152" fill="#FFFFFF" fontFamily={font} fontSize="24" fontWeight="700">
          35 yıl,
        </text>
        <text x="8" y="184" fill="#BFDBFE" fontFamily={font} fontSize="18" fontWeight="500">
          kesintisiz üretim
        </text>
        <path d="M8 210h236" stroke="#38BDF8" strokeOpacity="0.45" />
        <text x="8" y="242" fill="#93C5FD" fontFamily={font} fontSize="10" fontWeight="600" letterSpacing="2.4">
          BASIN NOTLARI
        </text>
        <path d="M8 264h184M8 282h150M8 300h210M8 318h164" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g>
        <rect x="562" y="364" width="164" height="72" rx="3" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.38" />
        <text x="578" y="388" fill="#93C5FD" fontFamily={font} fontSize="8" fontWeight="600" letterSpacing="2">
          BASIN İLETİŞİMİ
        </text>
        <text x="578" y="414" fill="#FFFFFF" fontFamily={font} fontSize="15" fontWeight="700">
          medya@celikpen.com.tr
        </text>
      </g>
      <path d="M728 30h24v24" fill="none" stroke="#38BDF8" strokeWidth="3" />
    </svg>
  );
}

/* ============================================================================
   9. FUAR & ETKİNLİK
   ========================================================================== */

function EventsArt() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="events-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1220" />
          <stop offset="0.55" stopColor="#172554" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="events-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.32" />
          <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="events-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#events-bg)" />
      <path d="M160 0 250 380H70z" fill="url(#events-beam)" />
      <path d="M640 0 730 380h-180z" fill="url(#events-beam)" />

      <g stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="2" fill="none">
        <path d="M80 96h640M80 120h640M80 96l40 24h560l40-24M120 120v40h560v-40" />
        <path d="M160 96v380M240 96v380M320 96v380M400 96v380M480 96v380M560 96v380M640 96v380" strokeOpacity="0.16" />
      </g>

      <g>
        <rect x="112" y="180" width="174" height="240" fill="url(#events-glass)" stroke="#93C5FD" strokeOpacity="0.35" />
        <rect x="314" y="180" width="174" height="240" fill="url(#events-glass)" stroke="#93C5FD" strokeOpacity="0.35" />
        <rect x="516" y="180" width="174" height="240" fill="url(#events-glass)" stroke="#93C5FD" strokeOpacity="0.35" />
        <path d="M144 204 254 396M184 190 286 370M346 204 456 396M386 190 488 370M548 204 658 396M588 190 690 370" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1.2" />
      </g>

      <g>
        <rect x="128" y="150" width="144" height="34" fill="#1E3A8A" />
        <text x="200" y="172" fill="#FFFFFF" fontFamily={font} fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">
          CAM BALKON
        </text>
        <rect x="330" y="150" width="144" height="34" fill="#0EA5E9" />
        <text x="402" y="172" fill="#0B1220" fontFamily={font} fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">
          GİYOTİN CAM
        </text>
        <rect x="532" y="150" width="144" height="34" fill="#E0F2FE" />
        <text x="604" y="172" fill="#0F172A" fontFamily={font} fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">
          PVC DOĞRAMA
        </text>
      </g>

      <g>
        <path d="M84 420h632" stroke="#38BDF8" strokeWidth="2" />
        <path d="M96 420v34M704 420v34" stroke="#38BDF8" strokeOpacity="0.5" />
        <text x="400" y="462" fill="#BFDBFE" fontFamily={font} fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="4">
          MİMARİ DİYALOG • 2026
        </text>
      </g>

      <g>
        <rect x="596" y="46" width="128" height="44" rx="3" fill="#0B1220" stroke="#38BDF8" strokeOpacity="0.38" />
        <text x="660" y="64" fill="#93C5FD" fontFamily={font} fontSize="8" fontWeight="600" textAnchor="middle" letterSpacing="2">
          FUAR & ETKİNLİK
        </text>
        <text x="660" y="82" fill="#FFFFFF" fontFamily={font} fontSize="13" fontWeight="700" textAnchor="middle">
          4 Uluslararası
        </text>
      </g>
      <path d="M72 42h24v24" fill="none" stroke="#38BDF8" strokeWidth="3" />
    </svg>
  );
}
