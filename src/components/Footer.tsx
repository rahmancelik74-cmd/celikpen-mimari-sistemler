import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '../config/site.config';
import { CelikpenLogo } from './CelikpenLogo';

const FOOTER_SERVICES = [
  { label: 'Cam Balkon Sistemleri', href: '/urunler?kategori=cam-balkon-sistemleri' },
  { label: 'Giyotin Cam Sistemleri', href: '/urunler/giyotin-motorlu-silinebilir-cam' },
  { label: 'Bioklimatik Pergola', href: '/urunler/bioklimatik-kis-bahcesi-sistemleri' },
  { label: 'Kış Bahçesi', href: '/urunler/bioklimatik-kis-bahcesi-sistemleri' },
  { label: 'Sürme Cam Sistemleri', href: '/urunler?kategori=surme-sistemler' },
  { label: 'Alüminyum & PVC Sistemler', href: '/urunler?kategori=pencere-ve-kapi-sistemleri' },
  { label: 'Plise Perde & Sineklik', href: '/urunler/paslanmaz-rulman-ve-kedi-sinekligi-sistemleri' },
];

const FOOTER_QUICK = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
  { label: 'Projelerimiz', href: '/profesyoneller/referanslar' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Blog', href: '/blog' },
  { label: 'Fiyat Hesapla', href: '/fiyat-hesapla' },
  { label: 'İletişim', href: '/iletisim' },
];

const FOOTER_SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/celikpen',
    icon: <IconInstagram />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/902125550034',
    icon: <IconWhatsApp />,
  },
  {
    label: 'Telefon',
    href: `tel:${SITE_CONFIG.phoneRaw}`,
    icon: <IconPhone />,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300">
      <div className="container-shell pt-12 sm:pt-14">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marka */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Çelikpen anasayfa" className="inline-block">
              <CelikpenLogo size="md" variant="light" />
            </Link>
            <p className="mt-5 max-w-sm text-[11.5px] leading-relaxed text-slate-400">
              Kocasinan Merkez üretim gücüyle Bahçelievler’in 11 mahallesinde cam balkon, kış
              bahçesi, giyotin, sürme cam ve alüminyum doğrama çözümleri sunuyoruz.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {FOOTER_SOCIAL.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`Çelikpen ${social.label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition-colors hover:border-[#7C3AED] hover:bg-[#7C3AED] hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <span className="flex h-2 w-2 rounded-full bg-[#10B981]" aria-hidden="true" />
              <span className="text-[9.5px] font-medium tracking-wide text-slate-300">
                Keşif ve fiyat teklifi ücretsiz
              </span>
            </div>
          </div>

          {/* Hizmetler */}
          <div className="lg:col-span-3">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white">
              Hizmetlerimiz
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[11.5px] text-slate-400 transition-colors hover:text-[#DDD6FE]"
                  >
                    <span className="h-px w-0 bg-[#7C3AED] transition-all duration-300 group-hover:w-2.5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Menü */}
          <div className="lg:col-span-2">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white">
              Hızlı Menü
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_QUICK.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-[11.5px] text-slate-400 transition-colors hover:text-[#DDD6FE]"
                  >
                    <span className="h-px w-0 bg-[#7C3AED] transition-all duration-300 group-hover:w-2.5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="lg:col-span-3">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white">
              İletişim & Konum
            </h2>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex items-start gap-2.5 text-[11.5px] text-slate-300 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 text-[#DDD6FE]"><IconPhone /></span>
                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500">Telefon</span>
                    <span className="mt-0.5 block font-semibold text-white">{SITE_CONFIG.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:iletisim@celikpen.com"
                  className="flex items-start gap-2.5 text-[11.5px] text-slate-300 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 text-[#DDD6FE]"><IconMail /></span>
                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500">E-posta</span>
                    <span className="mt-0.5 block text-slate-300">iletisim@celikpen.com</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-slate-400">
                <span className="mt-0.5 shrink-0 text-[#DDD6FE]"><IconPin /></span>
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500">Showroom</span>
                  <span className="mt-0.5 block">{SITE_CONFIG.address}</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-slate-400">
                <span className="mt-0.5 shrink-0 text-[#DDD6FE]"><IconClock /></span>
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500">Çalışma Saatleri</span>
                  <span className="mt-0.5 block">{SITE_CONFIG.workingHours}</span>
                </span>
              </li>
            </ul>
            <Link
              href="/iletisim?form=kesif"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#7C3AED] px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#6D28D9]"
            >
              Ücretsiz Keşif İste <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Hizmet bölgeleri */}
        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="shrink-0 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Hizmet Bölgelerimiz
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {SITE_CONFIG.neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/bahcelievler/${neighborhood.slug}`}
                  className="text-[10px] text-slate-500 transition-colors hover:text-[#DDD6FE]"
                >
                  {neighborhood.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col items-center justify-between gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:flex-row">
          <p className="text-center text-[9.5px] text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Çelikpen Cam Balkon & Mimari Sistemler. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-medium tracking-wide text-slate-500">
              <IconLock className="h-3 w-3 text-[#10B981]" />
              256-Bit SSL • TLS 1.3 • HSTS
            </span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden="true" />
            <span className="text-[9px] text-slate-600">Kocasinan Merkez, Bahçelievler / İstanbul</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================================
   ICONS
   ============================================================================ */
function IconInstagram({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconWhatsApp({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}
function IconPhone({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconPin({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconClock({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  );
}
function IconArrowRight({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconLock({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
