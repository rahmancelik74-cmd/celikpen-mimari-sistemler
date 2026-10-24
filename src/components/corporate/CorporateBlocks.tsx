import React from 'react';
import Link from 'next/link';
import type { CorporateStandard } from '../../config/winsa-corporate.config';

interface CorporateStatsProps {
  stats: { label: string; value: string; detail?: string }[];
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Rakamlarla Çelikpen: 35+ yıl, 15.000+ proje, lazer hassasiyeti ve sistem garantisi.
 */
export function CorporateStats({ stats, tone = 'light', className = '' }: CorporateStatsProps) {
  const dark = tone === 'dark';

  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 ${className}`}>
      {stats.map((stat) => (
        <div
          key={`${stat.value}-${stat.label}`}
          className={`hover-lift relative overflow-hidden rounded-card border p-4 sm:p-5 ${
            dark
              ? 'border-white/10 bg-white/[0.045]'
              : 'border-slate-200 bg-white shadow-xs'
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-full w-[3px] ${
              dark ? 'bg-[#38BDF8]' : 'bg-[#1E3A8A]'
            }`}
            aria-hidden="true"
          />
          <p
            className={`text-2xl font-extrabold tracking-tight sm:text-[1.7rem] ${
              dark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            {stat.value}
          </p>
          <p
            className={`mt-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] ${
              dark ? 'text-[#93C5FD]' : 'text-[#1E3A8A]'
            }`}
          >
            {stat.label}
          </p>
          {stat.detail && (
            <p className={`mt-1.5 text-[10px] leading-snug ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              {stat.detail}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

interface StandardsGridProps {
  standards: CorporateStandard[];
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * EN 12207 / EN 12208 / EN 12210 ve Uw performans kartları.
 */
export function StandardsGrid({ standards, tone = 'light', className = '' }: StandardsGridProps) {
  const dark = tone === 'dark';

  return (
    <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {standards.map((standard) => (
        <article
          key={standard.code}
          className={`group relative overflow-hidden rounded-card border p-4 transition-colors sm:p-5 ${
            dark
              ? 'border-white/10 bg-white/[0.045] hover:border-[#38BDF8]/60'
              : 'border-slate-200 bg-white shadow-xs hover:border-[#BFDBFE]'
          }`}
        >
          <span
            className={`absolute inset-x-0 top-0 h-[2px] ${dark ? 'bg-[#38BDF8]' : 'bg-[#1E3A8A]'}`}
            aria-hidden="true"
          />
          <div className="flex items-start justify-between gap-2">
            <p
              className={`font-mono text-[12px] font-bold tracking-[0.06em] ${
                dark ? 'text-[#38BDF8]' : 'text-[#1E3A8A]'
              }`}
            >
              {standard.code}
            </p>
            <span
              className={`rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] ${
                dark ? 'bg-white/10 text-slate-300' : 'bg-[#EFF6FF] text-[#1D4ED8]'
              }`}
            >
              Performans
            </span>
          </div>
          <h3 className={`mt-3 text-[12.5px] font-bold ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
            {standard.title}
          </h3>
          <p className={`mt-1.5 text-[10.5px] leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {standard.description}
          </p>
          <span
            className={`mt-3 block h-px w-8 transition-all duration-300 group-hover:w-14 ${
              dark ? 'bg-[#38BDF8]' : 'bg-[#1E3A8A]'
            }`}
            aria-hidden="true"
          />
        </article>
      ))}
    </div>
  );
}

interface CertificateWallProps {
  items: CorporateStandard[];
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * TSE, CE, EN 14351-1 ve ISO 9001 odaklı sertifika vitrini.
 */
export function CertificateWall({ items, tone = 'light', className = '' }: CertificateWallProps) {
  const dark = tone === 'dark';

  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <article
          key={item.code}
          className={`group relative overflow-hidden rounded-card border p-5 transition-all duration-300 ${
            dark
              ? 'border-white/10 bg-white/[0.045] hover:border-[#38BDF8]/55 hover:bg-white/[0.07]'
              : 'border-slate-200 bg-white shadow-xs hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-soft'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${
                dark ? 'border-[#38BDF8]/45 bg-[#1E3A8A]/35 text-[#7DD3FC]' : 'border-[#1E3A8A]/25 bg-[#EFF6FF] text-[#1E3A8A]'
              }`}
              aria-hidden="true"
            >
              <SealGlyph className="h-6 w-6" />
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] ${
                dark ? 'bg-[#38BDF8]/15 text-[#7DD3FC]' : 'bg-[#EFF6FF] text-[#1D4ED8]'
              }`}
            >
              Doğrulandı
            </span>
          </div>
          <p
            className={`mt-4 font-mono text-[11px] font-bold tracking-[0.06em] ${
              dark ? 'text-[#38BDF8]' : 'text-[#1E3A8A]'
            }`}
          >
            {item.code}
          </p>
          <h3 className={`mt-1 text-[13px] font-bold ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
            {item.title}
          </h3>
          <p className={`mt-2 text-[10.5px] leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {item.description}
          </p>
          <span
            className={`mt-4 block h-px w-10 bg-gradient-to-r ${
              dark ? 'from-[#38BDF8] to-transparent' : 'from-[#1E3A8A] to-transparent'
            }`}
            aria-hidden="true"
          />
        </article>
      ))}
    </div>
  );
}

interface WinsaPartnerBandProps {
  className?: string;
}

/**
 * Winsa yetkili üretim ve mimari çözüm ortaklığı vurgusu.
 */
export function WinsaPartnerBand({ className = '' }: WinsaPartnerBandProps) {
  return (
    <section
      aria-labelledby="winsa-partner-baslik"
      className={`relative overflow-hidden rounded-panel border border-white/10 bg-[#0F172A] text-white ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#1E3A8A]/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#38BDF8]/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7DD3FC]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
            Winsa Yetkili Üretim
          </div>
          <h2
            id="winsa-partner-baslik"
            className="mt-4 max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Winsa kalitesi, Çelikpen mühendisliği.
          </h2>
          <p className="mt-3 max-w-xl text-[12px] leading-relaxed text-slate-300">
            Çelikpen; Winsa PVC profil teknolojilerini kendi CNC üretim, lazer ölçüm ve kadrolu
            montaj disipliniyle birleştirir. Çok odacıklı gövde, çelik takviye, EPDM conta ve
            yüksek yalıtımlı cam kombinasyonları proje bazlı olarak boyutlandırılır.
          </p>
          <ul className="mt-5 grid gap-2.5 text-[11px] text-slate-300 sm:grid-cols-2">
            {[
              'Winsa PVC profil ve doğrama uyumu',
              'Çok odacıklı gövde ve çelik takviye',
              'EN 12207 / 12208 / 12210 performansı',
              '10 yıl sistem garantisi ve yedek parça',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#38BDF8]/15 text-[9px] font-bold text-[#7DD3FC]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/kurumsal/uretim-teknolojimiz"
              prefetch={true}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Üretim Teknolojimiz
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/kurumsal/kalite-politikamiz"
              prefetch={true}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:border-[#38BDF8]/60 hover:bg-white/10"
            >
              Kalite Politikamız
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[240px] overflow-hidden rounded-card border border-white/10 bg-[#0B1220]">
          <ProfileCrossSection />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
            <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
              Çok odacıklı PVC profil kesiti
            </span>
            <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-white/55">
              Winsa / Çelikpen
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SealGlyph({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.75 14.5 5l3.2.2.9 3.1 2.3 2.3-1.5 2.8.2 3.2-3 1.2-2 2.5-3-.9-3 .9-2-2.5-3-1.2.2-3.2-1.5-2.8 2.3-2.3.9-3.1L11.5 5 12 2.75Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="m8.6 12 2.3 2.3 4.5-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileCrossSection() {
  return (
    <svg
      viewBox="0 0 520 360"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="profile-metal" x1="80" y1="40" x2="440" y2="320">
          <stop offset="0" stopColor="#475569" />
          <stop offset="0.5" stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="profile-glass" x1="280" y1="60" x2="430" y2="320">
          <stop offset="0" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" fill="#0B1220" />
      <g opacity="0.22" stroke="#38BDF8">
        <path d="M0 60h520M0 120h520M0 180h520M0 240h520M0 300h520" />
        <path d="M60 0v360M120 0v360M180 0v360M240 0v360M300 0v360M360 0v360M420 0v360M480 0v360" />
      </g>

      <g transform="translate(60 54)">
        <rect width="300" height="234" rx="6" fill="url(#profile-metal)" stroke="#E2E8F0" strokeOpacity="0.7" strokeWidth="2" />
        <rect x="22" y="22" width="112" height="190" rx="3" fill="#0F172A" stroke="#93C5FD" strokeOpacity="0.5" />
        <rect x="150" y="22" width="128" height="88" rx="3" fill="#0F172A" stroke="#93C5FD" strokeOpacity="0.5" />
        <rect x="150" y="124" width="128" height="88" rx="3" fill="#0F172A" stroke="#93C5FD" strokeOpacity="0.5" />
        <path d="M44 44h68v146H44zM172 44h84v44h-84zM172 146h84v44h-84z" fill="none" stroke="#38BDF8" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M44 44h68M44 190h68M172 44h84M172 88h84M172 146h84M172 190h84" stroke="#FFFFFF" strokeOpacity="0.22" />
        <path d="M60 60v118M96 60v118M188 60v14M212 60v14M188 160v14M212 160v14" stroke="#38BDF8" strokeOpacity="0.55" strokeWidth="1.4" />
        <path d="M124 22v190" stroke="#E2E8F0" strokeOpacity="0.65" strokeWidth="3" />
        <path d="M124 54h26M124 178h26" stroke="#38BDF8" strokeWidth="3" />
      </g>

      <g transform="translate(390 72)">
        <rect width="82" height="220" rx="3" fill="url(#profile-glass)" stroke="#93C5FD" strokeOpacity="0.6" />
        <path d="M16 18 62 200M38 12 74 160" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.2" />
        <path d="M0 72h82M0 148h82" stroke="#FFFFFF" strokeOpacity="0.18" />
      </g>

      <g fill="#BFDBFE" fontFamily="Poppins, ui-sans-serif, sans-serif">
        <text x="60" y="320" fontSize="9" fontWeight="600" letterSpacing="2.2">
          ÇOK ODACIKLI GÖVDE
        </text>
        <text x="60" y="334" fontSize="8" fontWeight="400" fill="#93C5FD">
          ÇELİK TAKVİYE + EPDM CONTA
        </text>
        <text x="458" y="320" fontSize="8" fontWeight="500" textAnchor="end" fill="#93C5FD">
          4+20+4 ISICAM
        </text>
      </g>

      <g>
        <circle cx="462" cy="44" r="22" fill="none" stroke="#38BDF8" strokeOpacity="0.6" />
        <path d="M462 30v28M448 44h28" stroke="#38BDF8" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
