'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SITE_CONFIG } from '../config/site.config';
import { CelikpenLogo } from './CelikpenLogo';

/**
 * Mağaza menüsü şu anda ziyaretçiye gösterilmez. Tüm navigasyon nesnesi ve
 * masaüstü/mobil görünüm korunur; ileride tek satırla tekrar açılabilir.
 */
const SHOW_MAGAZA_MENU = false;

type DropdownKind = 'services' | 'products';

type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownKind;
  disabled?: boolean;
};

const MAGAZA_NAV_ITEM: NavItem = {
  label: 'Mağaza',
  href: '/urunler',
  disabled: true,
};

type MenuCardItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const SERVICES: MenuCardItem[] = [
  {
    title: 'Katlanır Cam Balkon Sistemleri',
    description: '8mm / 10mm temperli & maksimum panoramik açıklık',
    href: '/hizmetlerimiz#katlanir-cam-balkon',
    icon: <IconPanels />,
  },
  {
    title: 'Isıcamlı Cam Balkon Sistemleri',
    description: '4+20+4 argon gazlı Sinerji/Konfor cam & üstün yalıtım',
    href: '/hizmetlerimiz#isicamli-cam-balkon',
    icon: <IconThermalGlass />,
  },
  {
    title: 'Sürme (Sürgülü) Cam Balkon Sistemleri',
    description: 'Eşiksiz ve eşikli paslanmaz rulmanlı raylı sistemler',
    href: '/hizmetlerimiz#surme-cam-balkon',
    icon: <IconSliders />,
  },
  {
    title: 'Motorlu Giyotin Cam Sistemleri',
    description: 'Uzaktan kumandalı dikey açılan hareketli küpeşte',
    href: '/hizmetlerimiz#giyotin-cam-sistemleri',
    icon: <IconArrowUpDown />,
  },
  {
    title: 'Kış Bahçesi Sistemleri',
    description: 'Dört mevsim yalıtımlı cam tavan & cephe sistemleri',
    href: '/hizmetlerimiz#kis-bahcesi-sistemleri',
    icon: <IconHome />,
  },
  {
    title: 'Bioklimatik Pergola & Tente Sistemleri',
    description: 'Motorlu alüminyum lamel tavan ve gizli drenaj',
    href: '/hizmetlerimiz#bioklimatik-pergola',
    icon: <IconSun />,
  },
  {
    title: 'PVC Pencere & Kapı Montaj / Yenileme',
    description: 'Lazer ölçüm, söküm ve anahtar teslim Winsa uygulama',
    href: '/hizmetlerimiz#pvc-pencere-kapi',
    icon: <IconLayers />,
  },
  {
    title: 'Panjur, Kepenk ve Plise Sineklik',
    description: 'Motorlu monoblok panjur & kedi tüllü sineklik',
    href: '/hizmetlerimiz#panjur-kepenk-sineklik',
    icon: <IconShield />,
  },
];

const PRODUCTS_MENU: MenuCardItem[] = [
  {
    title: 'Winsa PVC Pencere ve Kapı Sistemleri',
    description: 'Revotech Gold 84, Dorado 76 ve Safir 76 yalıtım serileri',
    href: '/urunler?kategori=pencere-ve-kapi-sistemleri',
    icon: <IconLayers />,
  },
  {
    title: 'Winsa Sürme Sistemler',
    description: 'Panorama HS 76 Hebeschiebe, Comfort Slide Plus & Lotus',
    href: '/urunler?kategori=surme-sistemler',
    icon: <IconSliders />,
  },
  {
    title: 'Cam Balkon Sistemleri (Vera Serisi)',
    description: 'Vera Termal 4+20+4 Isıcamlı, Vera Katlanır ve Vera Slide',
    href: '/urunler?kategori=cam-balkon-sistemleri',
    icon: <IconPanels />,
  },
  {
    title: 'Giyotin & Kış Bahçesi Sistemleri',
    description: 'Vera Vertical Motorlu Giyotin ve Vela Bioklimatik Pergola',
    href: '/urunler/giyotin-motorlu-silinebilir-cam',
    icon: <IconArrowUpDown />,
  },
  {
    title: 'Panjur & Kepenk Sistemleri (Winstor)',
    description: 'Winstor monoblok panjur, Winkepenk ve motorlu kepenk',
    href: '/urunler?kategori=panjur-ve-kepenk-sistemleri',
    icon: <IconShield />,
  },
  {
    title: 'Alüminyum Doğrama Sistemleri',
    description: 'Antrasit cephe, kedi tüllü sineklik ve RC2 donanım',
    href: '/urunler?kategori=donanim-sistemleri',
    icon: <IconHome />,
  },
  {
    title: 'Isıcam & Konfor Cam Çözümleri',
    description: 'Şişecam Sinerji, Konfor Low-E ve temperli cam kombinasyonları',
    href: '/urunler/vera-isicamli-cam-balkon',
    icon: <IconThermalGlass />,
  },
];

const MAIN_NAV: NavItem[] = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Hizmetlerimiz', href: '/hizmetlerimiz', dropdown: 'services' },
  { label: 'Ürünlerimiz', href: '/urunler', dropdown: 'products' },
  ...(SHOW_MAGAZA_MENU ? [MAGAZA_NAV_ITEM] : []),
  { label: 'Projelerimiz', href: '/profesyoneller/referanslar' },
  { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
  { label: 'Blog', href: '/profesyoneller/blog' },
  { label: 'İletişim', href: '/iletisim' },
];

export function MegaMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKind | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
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
    setActiveDropdown(null);
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
    if (!activeDropdown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveDropdown(null);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [activeDropdown]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('#')) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const prefetchGroup = (kind: DropdownKind) => {
    const list = kind === 'services' ? SERVICES : PRODUCTS_MENU;
    try {
      router.prefetch(kind === 'services' ? '/hizmetlerimiz' : '/urunler');
    } catch {
      // ignore
    }
    list.forEach((entry) => {
      try {
        router.prefetch(entry.href);
      } catch {
        // Prefetch hatası gezinmeyi engellemez.
      }
    });
  };

  const openDropdown = (kind: DropdownKind) => {
    prefetchGroup(kind);
    setActiveDropdown(kind);
  };

  const phoneHref = `tel:${SITE_CONFIG.phoneRaw}`;

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      {/* ============================ ÜST BİLGİ BARI ============================ */}
      <div className="bg-[#0F172A] text-white">
        <div className="container-shell flex h-9 items-center justify-between gap-3 text-[10px] font-medium sm:text-[11px]">
          <div className="flex min-w-0 items-center gap-3.5 lg:gap-6">
            <a
              href={phoneHref}
              className="inline-flex shrink-0 items-center gap-1.5 text-slate-200 transition-colors hover:text-white"
            >
              <IconPhone className="h-3 w-3 shrink-0 text-[#BFDBFE]" />
              <span className="hidden sm:inline">Bizi Arayın:</span>
              <span className="whitespace-nowrap font-semibold text-white">
                {SITE_CONFIG.phoneDisplay}
              </span>
            </a>
            <a
              href="mailto:iletisim@celikpen.com"
              className="hidden items-center gap-1.5 text-slate-300 transition-colors hover:text-white md:inline-flex"
            >
              <IconMail className="h-3 w-3 text-[#BFDBFE]" />
              iletisim@celikpen.com
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3.5">
            <span className="inline-flex items-center gap-1 text-[9px] text-slate-300 sm:text-[10px] md:text-[11px]">
              <IconPin className="h-3 w-3 shrink-0 text-[#BFDBFE]" />
              <span className="whitespace-nowrap md:hidden">Bahçelievler</span>
              <span className="hidden whitespace-nowrap md:inline">Bahçelievler / İstanbul</span>
            </span>
            <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />
            <a
              href="https://www.instagram.com/celikpen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Çelikpen Instagram"
              className="relative flex h-7 w-7 items-center justify-center text-white/80 transition-colors before:absolute before:-inset-2 before:content-[''] hover:text-white"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/905326702654"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Çelikpen WhatsApp hattı"
              className="relative flex h-7 w-7 items-center justify-center text-white/80 transition-colors before:absolute before:-inset-2 before:content-[''] hover:text-white"
            >
              <IconWhatsApp className="h-4 w-4" />
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
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="container-shell flex h-[68px] items-center justify-between gap-3 lg:h-[74px] lg:gap-4">
          <Link href="/" prefetch={true} className="group shrink-0" aria-label="Çelikpen anasayfa">
            <CelikpenLogo size="md" />
          </Link>

          <nav aria-label="Ana menü" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {MAIN_NAV.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative flex items-center"
                  onMouseEnter={() => openDropdown(item.dropdown!)}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    onFocus={() => prefetchGroup(item.dropdown!)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[12px] font-medium transition-colors xl:text-[12.5px] ${
                      activeDropdown === item.dropdown || isActive(item.href)
                        ? 'bg-[#EFF6FF] text-[#1E3A8A]'
                        : 'text-[#1E293B] hover:bg-slate-50 hover:text-[#1E3A8A]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <IconChevron
                      className={`h-3 w-3 transition-transform duration-200 ${
                        activeDropdown === item.dropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>
                </div>
              ) : item.disabled ? (
                <span
                  key={item.label}
                  aria-disabled="true"
                  title="Mağaza kısa süre içinde hizmete açılacak"
                  className="flex cursor-not-allowed select-none items-center gap-1.5 rounded-lg px-2.5 py-2 text-[12px] font-medium text-slate-400 opacity-55 xl:text-[12.5px]"
                >
                  {item.label}
                  <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-slate-600">
                    Yakında
                  </span>
                </span>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={true}
                  onMouseEnter={() => setActiveDropdown(null)}
                  className={`rounded-lg px-2.5 py-2 text-[12px] font-medium transition-colors xl:text-[12.5px] ${
                    isActive(item.href)
                      ? 'bg-[#EFF6FF] text-[#1E3A8A]'
                      : 'text-[#1E293B] hover:bg-slate-50 hover:text-[#1E3A8A]'
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
              className="hidden items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3.5 py-2 text-[11.5px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#DBEAFE] xl:inline-flex"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1E3A8A] text-white">
                <IconPhone className="h-3.5 w-3.5" />
              </span>
              {SITE_CONFIG.phoneDisplay}
            </a>
            <Link
              href="/iletisim?form=kesif"
              prefetch={true}
              aria-label="Ücretsiz keşif iste"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-[#1E3A8A] px-3 py-2.5 text-[11px] font-semibold text-white shadow-navy transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8] sm:px-4 sm:text-[12px]"
            >
              <IconCalendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Keşif İste</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Mobil menüyü aç"
              aria-expanded={mobileOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F172A] transition-colors hover:border-[#BFDBFE] hover:bg-[#EFF6FF] lg:hidden"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ============================ HİZMETLERİMİZ MEGA MENÜ ============================ */}
        {activeDropdown === 'services' && (
          <div
            id="hizmetlerimiz-dropdown"
            className="gpu-layer absolute inset-x-0 top-full hidden border-b border-slate-200 bg-white shadow-[0_28px_56px_-30px_rgba(15,23,42,0.42)] lg:block"
          >
            <div className="container-shell py-6">
              <div className="mx-auto max-w-3xl">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">
                      Hizmetlerimiz
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-slate-500">
                      Lazerli ücretsiz keşiften anahtar teslim montaja 8 uzmanlık alanımız.
                    </p>
                  </div>
                  <Link
                    href="/hizmetlerimiz"
                    prefetch={true}
                    onClick={() => setActiveDropdown(null)}
                    className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8]"
                  >
                    Tüm hizmetlerimiz
                    <IconArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      prefetch={true}
                      onClick={() => setActiveDropdown(null)}
                      className="group flex min-h-[62px] items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F8FAFC]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors duration-200 group-hover:border-[#BFDBFE] group-hover:bg-[#EFF6FF] group-hover:text-[#1E3A8A]">
                        {service.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-semibold leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
                          {service.title}
                        </span>
                        <span className="mt-1 block text-[10.5px] leading-snug text-slate-500">
                          {service.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================ ÜRÜNLERİMİZ MEGA MENÜ ============================ */}
        {activeDropdown === 'products' && (
          <div
            id="urunlerimiz-dropdown"
            className="gpu-layer absolute inset-x-0 top-full hidden border-b border-slate-200 bg-white shadow-[0_28px_56px_-30px_rgba(15,23,42,0.42)] lg:block"
          >
            <div className="container-shell py-6">
              <div className="mx-auto max-w-3xl">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">
                      Ürünlerimiz &amp; Sistem Kataloğu
                    </p>
                    <p className="mt-1 text-[12.5px] font-medium text-slate-500">
                      Winsa PVC doğrama, sürme sistemler, Vera cam balkon, giyotin ve Winstor panjur serileri.
                    </p>
                  </div>
                  <Link
                    href="/urunler"
                    prefetch={true}
                    onClick={() => setActiveDropdown(null)}
                    className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8]"
                  >
                    Tüm ürünleri gör
                    <IconArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {PRODUCTS_MENU.map((prod) => (
                    <Link
                      key={prod.title}
                      href={prod.href}
                      prefetch={true}
                      onClick={() => setActiveDropdown(null)}
                      className="group flex min-h-[62px] items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F8FAFC]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors duration-200 group-hover:border-[#BFDBFE] group-hover:bg-[#EFF6FF] group-hover:text-[#1E3A8A]">
                        {prod.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-semibold leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
                          {prod.title}
                        </span>
                        <span className="mt-1 block text-[10.5px] leading-snug text-slate-500">
                          {prod.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================ MOBİL ÇEKMECE ============================ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobil menü">
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[#0F172A]/55 backdrop-blur-sm"
          />
          <div className="gpu-layer absolute inset-y-0 right-0 flex w-[min(92vw,390px)] flex-col overflow-y-auto overscroll-contain bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <CelikpenLogo size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Menüyü kapat"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <IconClose className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 px-4 py-4">
              <div className="space-y-1">
                <Link
                  href="/"
                  prefetch={true}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-[#F8FAFC]"
                >
                  Anasayfa <IconArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>

                {/* Mobil Hizmetlerimiz */}
                <div className="rounded-lg border border-slate-100 bg-slate-50/60">
                  <div className="flex min-h-[44px] items-center justify-between px-3 py-2">
                    <Link
                      href="/hizmetlerimiz"
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-semibold text-[#1E3A8A]"
                    >
                      Hizmetlerimiz
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        prefetchGroup('services');
                        setMobileServicesOpen((open) => !open);
                      }}
                      aria-expanded={mobileServicesOpen}
                      aria-label="Hizmetlerimiz alt menüsünü aç"
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#1E3A8A] shadow-2xs"
                    >
                      <IconChevron
                        className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                  {mobileServicesOpen && (
                    <div className="space-y-0.5 border-t border-slate-100 px-2 py-2">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.title}
                          href={service.href}
                          prefetch={true}
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-[40px] items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] text-slate-600 hover:bg-white hover:text-[#1E3A8A]"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#1E3A8A]">
                            {service.icon}
                          </span>
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobil Ürünlerimiz */}
                <div className="rounded-lg border border-slate-100 bg-slate-50/60">
                  <div className="flex min-h-[44px] items-center justify-between px-3 py-2">
                    <Link
                      href="/urunler"
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-semibold text-[#1E3A8A]"
                    >
                      Ürünlerimiz
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        prefetchGroup('products');
                        setMobileProductsOpen((open) => !open);
                      }}
                      aria-expanded={mobileProductsOpen}
                      aria-label="Ürünlerimiz alt menüsünü aç"
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#1E3A8A] shadow-2xs"
                    >
                      <IconChevron
                        className={`h-4 w-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                  {mobileProductsOpen && (
                    <div className="space-y-0.5 border-t border-slate-100 px-2 py-2">
                      {PRODUCTS_MENU.map((prod) => (
                        <Link
                          key={prod.title}
                          href={prod.href}
                          prefetch={true}
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-[40px] items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] text-slate-600 hover:bg-white hover:text-[#1E3A8A]"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#1E3A8A]">
                            {prod.icon}
                          </span>
                          {prod.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {MAIN_NAV.filter(
                  (item) =>
                    item.label !== 'Anasayfa' &&
                    item.label !== 'Hizmetlerimiz' &&
                    item.label !== 'Ürünlerimiz'
                ).map((item) =>
                  item.disabled ? (
                    <span
                      key={item.label}
                      aria-disabled="true"
                      title="Mağaza kısa süre içinde hizmete açılacak"
                      className="flex min-h-[44px] cursor-not-allowed select-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 opacity-55"
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-slate-600">
                          Yakında
                        </span>
                      </span>
                      <IconArrowRight className="h-3.5 w-3.5 text-slate-300" />
                    </span>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-[#F8FAFC]"
                    >
                      {item.label}
                      <IconArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>
                  )
                )}
              </div>

              <div className="mt-6 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1E3A8A]">
                  Bugün keşif, aynı gün teklif
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">
                  Ölçü ve danışmanlık ücretsiz. Balkonunuz için net fiyatı öğrenin.
                </p>
                <Link
                  href="/iletisim?form=kesif"
                  prefetch={true}
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-[#1E3A8A] px-3 py-2.5 text-[12px] font-semibold text-white hover:bg-[#1D4ED8]"
                >
                  <IconCalendar className="h-3.5 w-3.5" /> Keşif İste
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-100 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
              <div className="grid grid-cols-1 gap-2">
                <a
                  href={phoneHref}
                  className="flex min-h-[48px] items-center gap-2 rounded-xl bg-[#0F172A] px-3 py-2.5 text-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <IconPhone className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[8.5px] font-medium uppercase tracking-[0.12em] text-slate-300">
                      Hemen ara
                    </span>
                    <span className="block truncate text-[11.5px] font-semibold">
                      {SITE_CONFIG.phoneDisplay}
                    </span>
                  </span>
                </a>
                <a
                  href="https://wa.me/905326702654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <IconWhatsApp className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[8.5px] font-medium uppercase tracking-[0.12em] text-white/80">
                      WhatsApp
                    </span>
                    <span className="block truncate text-[11.5px] font-semibold">Hızlı yazın</span>
                  </span>
                </a>
              </div>
              <p className="mt-3 flex items-start gap-1.5 text-[10.5px] leading-relaxed text-slate-500">
                <IconPin className="mt-0.5 h-3 w-3 shrink-0 text-[#1E3A8A]" />
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
      <div className={isHome ? '' : 'pt-[105px] lg:pt-[111px]'}>{children}</div>
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
function IconWhatsApp({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.488-8.413Z" />
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
function IconPanels({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M4.5 21V8h15v13" />
      <path d="M4.5 11.5h15" />
      <path d="M9.5 11.5V21M14.5 11.5V21" />
      <path d="M4.5 8 7 3h10l2.5 5" />
    </svg>
  );
}
function IconThermalGlass({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 3v18M15 3v18M6.5 7.5l1.5 1.5M16.5 15l1.5 1.5" />
    </svg>
  );
}
function IconArrowUpDown({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="15" height="18" rx="1.5" />
      <path d="M3 9.5h15M6.5 6.5h8" />
      <path d="M21 9v6M19.5 10.5 21 9l1.5 1.5M19.5 13.5 21 15l1.5-1.5" />
    </svg>
  );
}
function IconSun({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 5.5h18M5 5.5V20M19 5.5V20M3 20h18" />
      <path d="M5 11h14" />
      <path d="M6.5 5.5 8 2.5M10.5 5.5 12 2.5M14.5 5.5 16 2.5M18.5 5.5 20 2.5" />
    </svg>
  );
}
function IconHome({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V10l7-6 7 6v11" />
      <path d="M5 10h14M12 4v17M8.5 10v11M15.5 10v11" />
    </svg>
  );
}
function IconSliders({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="16" rx="1.5" />
      <path d="M12 3v16M5.5 7.5h4M14.5 7.5h4M5.5 12h4M14.5 12h4" />
      <path d="M4 19v2M20 19v2M3 21h18" />
    </svg>
  );
}
function IconLayers({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="3" width="16" height="15" rx="1" />
      <path d="M12 3v15M4 10.5h16" />
      <path d="M2 21h20M8 18v3M16 18v3" />
    </svg>
  );
}
function IconShield({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 3v18M19 3v18" />
      <path d="M19 6 5 9l14 3-14 3 14 3" />
    </svg>
  );
}
