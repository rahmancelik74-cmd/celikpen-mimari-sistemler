'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG } from '../../config/site.config';
import { CelikpenLogo } from '../CelikpenLogo';

type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const SERVICES: ServiceItem[] = [
  {
    title: 'Cam Balkon Sistemleri',
    description: 'Isıcamlı, katlanır ve panoramik balkon çözümleri',
    href: '/urunler?kategori=cam-balkon-sistemleri',
    icon: <IconPanels />,
  },
  {
    title: 'Giyotin Cam Sistemleri',
    description: 'Motorlu, kumandalı dikey açılan cam cephe',
    href: '/urunler/giyotin-motorlu-silinebilir-cam',
    icon: <IconArrowUpDown />,
  },
  {
    title: 'Bioklimatik Pergola',
    description: 'Dört mevsim yaşayan teras ve tavan sistemleri',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    icon: <IconSun />,
  },
  {
    title: 'Kış Bahçesi',
    description: 'Teras, bahçe ve ticari alanlar için cam mimari',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    icon: <IconHome />,
  },
  {
    title: 'Sürme Cam Sistemleri',
    description: 'Eşiksiz, geniş açıklıklı ve sessiz sürme çözümleri',
    href: '/urunler?kategori=surme-sistemler',
    icon: <IconSliders />,
  },
  {
    title: 'Alüminyum & PVC Sistemler',
    description: 'Pencere, kapı, panjur ve cephe doğramaları',
    href: '/urunler?kategori=pencere-ve-kapi-sistemleri',
    icon: <IconLayers />,
  },
  {
    title: 'Plise Perde & Sineklik',
    description: 'Kedi tüllü sineklik ve plise perde entegrasyonu',
    href: '/urunler/paslanmaz-rulman-ve-kedi-sinekligi-sistemleri',
    icon: <IconShield />,
  },
];

const MAIN_NAV = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Hizmetler', href: '#hizmetler', dropdown: true },
  { label: 'Mağaza', href: '/urunler' },
  { label: 'Projelerimiz', href: '/profesyoneller/referanslar' },
  { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Blog', href: '/blog' },
];

export function MegaMenu() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [servicesOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('#')) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const phoneHref = `tel:${SITE_CONFIG.phoneRaw}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ============================ ÜST BİLGİ BARI ============================ */}
      <div className="bg-[#0F172A] text-white">
        <div className="container-shell flex h-9 items-center justify-between gap-4 text-[10.5px] font-medium sm:text-[11px]">
          <div className="flex min-w-0 items-center gap-4 lg:gap-6">
            <a
              href={phoneHref}
              className="inline-flex shrink-0 items-center gap-1.5 text-slate-200 transition-colors hover:text-white"
            >
              <IconPhone className="h-3 w-3 text-[#DDD6FE]" />
              <span className="hidden sm:inline">Bizi Arayın:</span>
              <span className="font-semibold text-white">{SITE_CONFIG.phoneDisplay}</span>
            </a>
            <a
              href="mailto:iletisim@celikpen.com"
              className="hidden items-center gap-1.5 text-slate-300 transition-colors hover:text-white sm:inline-flex"
            >
              <IconMail className="h-3 w-3 text-[#DDD6FE]" />
              iletisim@celikpen.com
            </a>
            <span className="hidden items-center gap-1.5 text-slate-300 lg:inline-flex">
              <IconPin className="h-3 w-3 text-[#DDD6FE]" />
              Bahçelievler / İstanbul
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <Link
              href="/iletisim?form=kesif"
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#10B981] px-2.5 py-1 text-[9.5px] font-bold tracking-wide text-white transition-colors hover:bg-[#059669] sm:px-3 sm:text-[10px]"
            >
              <IconSparkle className="h-3 w-3 transition-transform group-hover:rotate-12" />
              <span className="hidden sm:inline">Yaz Sezonu</span> %15 İNDİRİM
            </Link>
            <a
              href="https://www.instagram.com/celikpen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Çelikpen Instagram"
              className="text-slate-300 transition-colors hover:text-white"
            >
              <IconInstagram className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ============================ ANA MENÜ ============================ */}
      <div
        ref={dropdownRef}
        className={`relative border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? 'shadow-header' : 'shadow-none'
        }`}
        onMouseLeave={() => setServicesOpen(false)}
      >
        <div className="container-shell flex h-[68px] items-center justify-between gap-3 lg:h-[74px] lg:gap-5">
          <Link href="/" className="group shrink-0" aria-label="Çelikpen anasayfa">
            <CelikpenLogo size="md" className="transition-shadow duration-300 group-hover:shadow-md" />
          </Link>

          <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex xl:gap-2">
            {MAIN_NAV.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((open) => !open)}
                    onMouseEnter={() => setServicesOpen(true)}
                    aria-expanded={servicesOpen}
                    aria-controls="hizmetler-dropdown"
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[12px] font-medium transition-colors xl:text-[12.5px] ${
                      servicesOpen
                        ? 'bg-[#F5F3FF] text-[#7C3AED]'
                        : 'text-[#1E293B] hover:bg-slate-50 hover:text-[#7C3AED]'
                    }`}
                  >
                    {item.label}
                    <IconChevron
                      className={`h-3 w-3 transition-transform duration-200 ${
                        servicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-lg px-2.5 py-2 text-[12px] font-medium transition-colors xl:text-[12.5px] ${
                    isActive(item.href)
                      ? 'bg-[#F5F3FF] text-[#7C3AED]'
                      : 'text-[#1E293B] hover:bg-slate-50 hover:text-[#7C3AED]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <a
              href={phoneHref}
              className="hidden items-center gap-2 rounded-full border border-[#DDD6FE] bg-[#EBE9FE] px-3.5 py-2 text-[11.5px] font-semibold text-[#5B21B6] transition-colors hover:bg-[#DDD6FE] xl:inline-flex"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/70 text-[#7C3AED]">
                <IconPhone className="h-3.5 w-3.5" />
              </span>
              {SITE_CONFIG.phoneDisplay}
            </a>
            <Link
              href="/iletisim?form=kesif"
              aria-label="Ücretsiz keşif iste"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#7C3AED] px-3 py-2.5 text-[11px] font-semibold text-white shadow-purple transition-all hover:-translate-y-0.5 hover:bg-[#6D28D9] sm:px-4 sm:text-[12px]"
            >
              <IconCalendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Keşif İste</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Mobil menüyü aç"
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F172A] transition-colors hover:border-[#DDD6FE] hover:bg-[#F5F3FF] lg:hidden"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ============================ HİZMETLER MEGA MENÜ ============================ */}
        {servicesOpen && (
          <div
            id="hizmetler-dropdown"
            className="absolute inset-x-0 top-full hidden border-b border-slate-200 bg-white shadow-[0_28px_56px_-30px_rgba(15,23,42,0.42)] lg:block"
          >
            <div className="container-shell grid grid-cols-12 gap-6 py-6">
              <div className="col-span-8">
                <div className="mb-4 flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7C3AED]">
                      Hizmetlerimiz
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Yaşam alanınıza uygun mimari cam sistemini seçin.
                    </p>
                  </div>
                  <Link
                    href="/urunler"
                    onClick={() => setServicesOpen(false)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7C3AED] hover:text-[#6D28D9]"
                  >
                    Tüm sistemler
                    <IconArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      onClick={() => setServicesOpen(false)}
                      className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F8FAFC]"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#7C3AED] transition-colors group-hover:border-[#DDD6FE] group-hover:bg-[#F5F3FF]">
                        {service.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-semibold text-[#0F172A] group-hover:text-[#7C3AED]">
                          {service.title}
                        </span>
                        <span className="mt-0.5 block text-[10.5px] leading-relaxed text-slate-500">
                          {service.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-span-4">
                <div className="relative h-full overflow-hidden rounded-2xl bg-[#0F172A] p-5 text-white">
                  <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#7C3AED]/40 blur-2xl" />
                  <span className="pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-[#D91B24]/20 blur-2xl" />
                  <span className="relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#DDD6FE]">
                    <IconSparkle className="h-2.5 w-2.5" />
                    Ücretsiz Keşif
                  </span>
                  <p className="relative mt-4 text-lg font-semibold leading-snug">
                    Balkonunuzu birlikte planlayalım.
                  </p>
                  <p className="relative mt-2 text-[11px] leading-relaxed text-slate-300">
                    Lazerli ölçü, renk danışmanlığı ve net fiyat teklifi aynı gün.
                  </p>
                  <Link
                    href="/iletisim?form=kesif"
                    onClick={() => setServicesOpen(false)}
                    className="relative mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2.5 text-[11px] font-semibold text-[#0F172A] transition-colors hover:bg-[#F5F3FF] hover:text-[#6D28D9]"
                  >
                    Keşif Randevusu Al
                    <IconArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================ MOBİL ÇEKMECE ============================ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobil menü">
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[#0F172A]/55 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(90vw,390px)] flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <CelikpenLogo size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Menüyü kapat"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <IconClose className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 px-4 py-4">
              <div className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-[#F8FAFC]"
                >
                  Anasayfa <IconArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between rounded-lg bg-[#F5F3FF] px-3 py-2.5 text-sm font-semibold text-[#6D28D9]"
                >
                  Hizmetler
                  <IconChevron
                    className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="space-y-0.5 pb-1 pl-2">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.title}
                        href={service.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] text-slate-600 hover:bg-slate-50 hover:text-[#7C3AED]"
                      >
                        <span className="text-[#7C3AED]">{service.icon}</span>
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
                {MAIN_NAV.filter((item) => item.label !== 'Anasayfa' && item.label !== 'Hizmetler').map(
                  (item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-[#F8FAFC]"
                    >
                      {item.label}
                      <IconArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>
                  )
                )}
              </div>

              <div className="mt-6 rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
                  Bugün keşif, aynı gün teklif
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">
                  Ölçü ve danışmanlık ücretsiz. Balkonunuz için net fiyatı öğrenin.
                </p>
                <Link
                  href="/iletisim?form=kesif"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[#7C3AED] px-3 py-2.5 text-[12px] font-semibold text-white hover:bg-[#6D28D9]"
                >
                  <IconCalendar className="h-3.5 w-3.5" /> Keşif İste
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-100 px-4 py-4">
              <a
                href={phoneHref}
                className="flex items-center gap-2.5 rounded-xl bg-[#0F172A] px-4 py-3 text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <IconPhone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[9px] font-medium uppercase tracking-[0.16em] text-slate-300">
                    Hemen arayın
                  </span>
                  <span className="block text-sm font-semibold">{SITE_CONFIG.phoneDisplay}</span>
                </span>
              </a>
              <p className="mt-3 flex items-start gap-1.5 text-[10.5px] leading-relaxed text-slate-500">
                <IconPin className="mt-0.5 h-3 w-3 shrink-0 text-[#7C3AED]" />
                {SITE_CONFIG.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================================================================
   SAYFA KABUĞU
   ============================================================================ */
export const SiteHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <MegaMenu />
      <div className={isHome ? '' : 'pt-[104px] lg:pt-[110px]'}>{children}</div>
    </>
  );
};

/* ============================================================================
   İKONLAR — 1.6px ince çizgi, mimari dil
   ============================================================================ */
type IconProps = { className?: string };

function IconPhone({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconPin({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconInstagram({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconSparkle({ className = 'h-3 w-3' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9L12 3Z" /><path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  );
}
function IconChevron({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function IconMenu({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function IconClose({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="m18 6-12 12M6 6l12 12" />
    </svg>
  );
}
function IconArrowRight({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconCalendar({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function IconPanels({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18M12 3v18" />
    </svg>
  );
}
function IconArrowUpDown({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m8 7 4-4 4 4M8 17l4 4 4-4M12 3v18" />
    </svg>
  );
}
function IconSun({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
function IconHome({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 21v-8h6v8" />
    </svg>
  );
}
function IconSliders({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" /><rect x="7" y="4" width="4" height="4" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="16" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconLayers({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </svg>
  );
}
function IconShield({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}
