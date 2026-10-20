'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SITE_CONFIG } from '../../config/site.config';
import { WINSA_PRODUCTS } from '../../config/winsa-products.config';
import { CelikpenLogo } from '../CelikpenLogo';

type DropdownKey = 'kurumsal' | 'hizmetlerimiz' | 'urunlerimiz' | 'profesyoneller' | null;

interface DropdownItem {
  label: string;
  href: string;
}

const HIZMETLERIMIZ_ITEMS: DropdownItem[] = [
  { label: 'Cam Balkon Sistemleri', href: '/urunler?kategori=cam-balkon-sistemleri' },
  { label: 'Kış Bahçesi Sistemleri', href: '/urunler/bioklimatik-kis-bahcesi' },
  { label: 'Giyotin Sistemleri', href: '/urunler/giyotin-motorlu-cam-balkon' },
  { label: 'Alüminyum Sistemleri', href: '/urunler?kategori=donanim-sistemleri' },
  { label: 'Cephe Giydirme Sistemleri', href: '/profesyoneller/proje-hizmetleri' },
  { label: 'Ofis Bölme Sistemleri', href: '/urunler/panorama-esiksiz-surme' },
  { label: 'PVC Pencere, Kapılar', href: '/urunler?kategori=pencere-ve-kapi-sistemleri' },
  { label: 'Sürme Sistemler', href: '/urunler?kategori=surme-sistemler' },
  { label: 'Panjur & Kepenk', href: '/urunler?kategori=panjur-ve-kepenk-sistemleri' },
];

const URUNLERIMIZ_ITEMS: DropdownItem[] = [
  { label: 'Dorado 76 & Revotech Gold', href: '/urunler/dorado-76' },
  { label: 'Safir 76 & Safir 70 Serisi', href: '/urunler/safir-76' },
  { label: 'Panorama HS 76 Kaldır-Sür', href: '/urunler/panorama-hs-76' },
  { label: 'Comfort Slide Plus & Lotus', href: '/urunler/comfort-slide-plus' },
  { label: 'VBS 4+20+4 Isıcamlı Cam Balkon', href: '/urunler/vbs-isicamli-cam-balkon' },
  { label: 'VNS Panoramik Katlanır Cam', href: '/urunler/vns-katlanir-cam-balkon' },
  { label: 'Somfy Motorlu Giyotin Cam', href: '/urunler/giyotin-motorlu-cam-balkon' },
  { label: 'Bioklimatik Kış Bahçesi', href: '/urunler/bioklimatik-kis-bahcesi' },
  { label: 'Winstor & Winkepenk Panjur', href: '/urunler/winstor-monoblok-panjur' },
  { label: 'Tüm Ürün Kataloğu (28 Seri)', href: '/urunler' },
];

const KURUMSAL_ITEMS: DropdownItem[] = [
  { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
  { label: 'Vizyon ve Misyon', href: '/kurumsal/vizyon-misyon' },
  { label: 'Neden PVC, Neden Winsa?', href: '/kurumsal/neden-winsa' },
  { label: 'AR-GE Çalışmalarımız', href: '/kurumsal/ar-ge' },
  { label: 'Çevre Dostu Pencere', href: '/kurumsal/cevre-dostu-pencere' },
  { label: 'Kampanyalar', href: '/kurumsal/kampanyalar' },
  { label: 'Basında Biz', href: '/kurumsal/basinda-winsa' },
  { label: 'Satış Noktaları & Showroom', href: '/satis-noktalari' },
];

const PROFESYONELLER_ITEMS: DropdownItem[] = [
  { label: 'Proje Hizmetleri', href: '/profesyoneller/proje-hizmetleri' },
  { label: 'Dijital Kataloglar (2026)', href: '/profesyoneller/kataloglar' },
  { label: 'Teknik Şartnameler', href: '/profesyoneller/teknik-sartnameler' },
  { label: 'Kalite Belgeleri (TSE / IFT)', href: '/profesyoneller/kalite-belgeleri' },
  { label: 'Profesyonel Bakış', href: '/profesyoneller/profesyonel-bakis' },
  { label: 'Montaj Kılavuzu', href: '/profesyoneller/montaj-kilavuzu' },
  { label: 'Kullanım Kılavuzu', href: '/profesyoneller/kullanim-kilavuzu' },
  { label: 'Açılım Seçenekleri', href: '/profesyoneller/acilim-secenekleri' },
  { label: 'Mimari Blog', href: '/profesyoneller/blog' },
];

/** Keskin Vektörel Türk Bayrağı SVG (#E30A17 Ay-Yıldız) */
const TurkishFlagSvg: React.FC<{ className?: string }> = ({ className = 'h-3 w-4' }) => (
  <svg
    viewBox="0 0 36 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 rounded-[2px] ${className}`}
    aria-hidden="true"
  >
    <rect width="36" height="24" rx="2" fill="#E30A17" />
    <circle cx="13.5" cy="12" r="6" fill="#FFFFFF" />
    <circle cx="15" cy="12" r="4.8" fill="#E30A17" />
    <polygon
      points="20.2,12 23.8,13.2 21.6,10.1 21.6,13.9 23.8,10.8"
      fill="#FFFFFF"
    />
  </svg>
);

export interface MegaMenuProps {
  isTransparent?: boolean;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isTransparent = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<DropdownKey>('hizmetlerimiz');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (menu: DropdownKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 180);
  };

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handlePrefetch = (href: string) => {
    try {
      router.prefetch(href);
    } catch {
      // ignore prefetch errors in dev
    }
  };

  const filteredProducts =
    searchQuery.trim().length > 0
      ? WINSA_PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 8)
      : WINSA_PRODUCTS.slice(0, 6);

  const isHomeActive = pathname === '/';
  const isKurumsalActive = openMenu === 'kurumsal' || pathname.startsWith('/kurumsal');
  const isHizmetlerimizActive = openMenu === 'hizmetlerimiz';
  const isUrunlerimizActive =
    openMenu === 'urunlerimiz' ||
    pathname.startsWith('/urunler') ||
    pathname.startsWith('/sistemler');
  const isProfesyonellerActive =
    openMenu === 'profesyoneller' ||
    pathname === '/profesyoneller' ||
    (pathname.startsWith('/profesyoneller/') && pathname !== '/profesyoneller/referanslar');
  const isReferanslarActive =
    pathname === '/profesyoneller/referanslar' || pathname === '/galeri';
  const isIletisimActive = pathname.startsWith('/iletisim');

  // Güngörpen L-Köşe Çerçeve (`┌`) Hover & Active Sınıfı — Kompakt 13px Tipografi
  const getNavButtonClass = (isActive: boolean) =>
    `relative inline-flex items-center gap-1 py-1 text-[13px] font-semibold uppercase tracking-wide transition-all duration-200 before:content-[''] before:absolute before:-top-1 before:-left-2 before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-[#D91B24] before:transition-all before:duration-200 ${
      isActive
        ? 'text-[#D91B24] before:opacity-100'
        : 'text-[#0B1560] before:opacity-0 hover:text-[#D91B24] hover:before:opacity-100'
    }`;

  // Tek Sütun Beyaz Kart Dropdown (`w-56 py-1.5`)
  const renderSingleColumnDropdown = (items: DropdownItem[], menuKey: DropdownKey) => {
    if (openMenu !== menuKey) return null;
    return (
      <div
        onMouseEnter={() => handleMouseEnter(menuKey)}
        onMouseLeave={handleMouseLeave}
        className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-['']"
      >
        <div className="relative w-56 overflow-visible rounded-md border border-gray-100 bg-white py-1.5 shadow-2xl">
          {/* Üst Beyaz Ok İşaretçisi */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-gray-100 bg-white"
          />

          <ul className="relative z-10 flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b border-gray-100/80 last:border-none">
                <Link
                  href={item.href}
                  onClick={() => setOpenMenu(null)}
                  onMouseEnter={() => handlePrefetch(item.href)}
                  className="group flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-[#2D3748] transition-all duration-200 hover:bg-gray-50/90 hover:pl-5 hover:text-[#D91B24]"
                >
                  <span className="text-[11px] text-slate-400 transition-colors duration-200 group-hover:text-[#D91B24]">
                    ▸
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* =====================================================================
          1. KOMPAKT KOYU ÜST İLETİŞİM & KAMPANYA ŞERİDİ (`h-[34px] text-[11px]`, `max-w-6xl`)
         ===================================================================== */}
      <div className="bg-[#0D1322] text-[11px] text-white/90">
        <div className="mx-auto flex h-[34px] max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Sol: Telefon | E-posta | Konum */}
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-1 font-medium text-white/90 transition hover:text-white"
            >
              <span className="text-emerald-400">📞</span>
              <span>0 (212) 555 00 34</span>
            </a>
            <span className="hidden text-white/20 sm:inline">|</span>
            <a
              href="mailto:iletisim@celikpen.com.tr"
              className="hidden items-center gap-1 text-white/80 transition hover:text-white sm:inline-flex"
            >
              <span className="text-sky-400">✉️</span>
              <span>iletisim@celikpen.com.tr</span>
            </a>
            <span className="hidden text-white/20 md:inline">|</span>
            <Link
              href="/satis-noktalari"
              className="hidden items-center gap-1 text-white/80 transition hover:text-white md:inline-flex"
            >
              <span className="text-[#D91B24]">📍</span>
              <span>Bahçelievler, İstanbul</span>
            </Link>
          </div>

          {/* Sağ: Kompakt Yeşil Kampanya Rozeti + Instagram */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/kurumsal/kampanyalar"
              className="hidden items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3 py-0.5 text-[10.5px] font-medium text-emerald-400 transition hover:border-emerald-400 hover:bg-emerald-900/70 lg:flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span>Sezona Özel Cam Balkon &amp; Teras Kapatmada %15 İndirim!</span>
            </Link>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Çelikpen Instagram"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition hover:border-white/40 hover:bg-white/15 hover:text-white"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. KOMPAKT ANA HEADER BARI (`h-[68px]`, `max-w-6xl mx-auto px-4 sm:px-6`)
         ===================================================================== */}
      <div
        className={`transition-all duration-300 ${
          isTransparent
            ? 'border-b border-transparent bg-gradient-to-b from-white/65 via-white/30 to-transparent shadow-none backdrop-blur-[1px]'
            : 'border-b border-black/5 bg-[#F4F3EF]/95 shadow-sm backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Sol: Küçük, Zarif Butik Mimari ÇELİKPEN Logo (`h-8`) */}
          <Link
            href="/"
            aria-label="Çelikpen Ana Sayfa"
            onMouseEnter={() => handlePrefetch('/')}
            className="group shrink-0"
          >
            <CelikpenLogo size="md" />
          </Link>

          {/* Orta: Dengeli & Kompakt Masaüstü Navigasyon (`gap-5 xl:gap-6`) */}
          <nav
            aria-label="Ana Navigasyon"
            className="hidden items-center gap-5 lg:flex xl:gap-6"
          >
            {/* 1. ANASAYFA */}
            <Link
              href="/"
              onMouseEnter={() => {
                setOpenMenu(null);
                handlePrefetch('/');
              }}
              className={getNavButtonClass(isHomeActive)}
            >
              ANASAYFA
            </Link>

            {/* 2. KURUMSAL ⌄ */}
            <div
              className="relative py-3"
              onMouseEnter={() => {
                handleMouseEnter('kurumsal');
                handlePrefetch('/kurumsal');
              }}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/kurumsal" className={getNavButtonClass(isKurumsalActive)}>
                <span>KURUMSAL</span>
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${
                    openMenu === 'kurumsal' ? 'rotate-180 text-[#D91B24]' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              {renderSingleColumnDropdown(KURUMSAL_ITEMS, 'kurumsal')}
            </div>

            {/* 3. HİZMETLERİMİZ ⌄ */}
            <div
              className="relative py-3"
              onMouseEnter={() => {
                handleMouseEnter('hizmetlerimiz');
                handlePrefetch('/urunler');
              }}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/urunler" className={getNavButtonClass(isHizmetlerimizActive)}>
                <span>HİZMETLERİMİZ</span>
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${
                    openMenu === 'hizmetlerimiz' ? 'rotate-180 text-[#D91B24]' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              {renderSingleColumnDropdown(HIZMETLERIMIZ_ITEMS, 'hizmetlerimiz')}
            </div>

            {/* 4. ÜRÜNLERİMİZ ⌄ */}
            <div
              className="relative py-3"
              onMouseEnter={() => {
                handleMouseEnter('urunlerimiz');
                handlePrefetch('/urunler');
              }}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/urunler" className={getNavButtonClass(isUrunlerimizActive)}>
                <span>ÜRÜNLERİMİZ</span>
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${
                    openMenu === 'urunlerimiz' ? 'rotate-180 text-[#D91B24]' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              {renderSingleColumnDropdown(URUNLERIMIZ_ITEMS, 'urunlerimiz')}
            </div>

            {/* 5. PROFESYONELLER ⌄ */}
            <div
              className="relative py-3"
              onMouseEnter={() => {
                handleMouseEnter('profesyoneller');
                handlePrefetch('/profesyoneller');
              }}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/profesyoneller" className={getNavButtonClass(isProfesyonellerActive)}>
                <span>PROFESYONELLER</span>
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${
                    openMenu === 'profesyoneller' ? 'rotate-180 text-[#D91B24]' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              {renderSingleColumnDropdown(PROFESYONELLER_ITEMS, 'profesyoneller')}
            </div>

            {/* 6. REFERANSLAR */}
            <Link
              href="/profesyoneller/referanslar"
              onMouseEnter={() => {
                setOpenMenu(null);
                handlePrefetch('/profesyoneller/referanslar');
              }}
              className={getNavButtonClass(isReferanslarActive)}
            >
              REFERANSLAR
            </Link>

            {/* 7. İLETİŞİM */}
            <Link
              href="/iletisim"
              onMouseEnter={() => {
                setOpenMenu(null);
                handlePrefetch('/iletisim');
              }}
              className={getNavButtonClass(isIletisimActive)}
            >
              İLETİŞİM
            </Link>
          </nav>

          {/* Sağ Aksiyon Alanı: Kompakt "Keşif İste" Pill + 32x32px [TR] + [🔍] */}
          <div className="flex items-center gap-2">
            <Link
              href="/iletisim"
              onMouseEnter={() => handlePrefetch('/iletisim')}
              className="hidden items-center gap-1.5 rounded-lg bg-[#0B1560] px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#D91B24] sm:inline-flex"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Keşif İste</span>
            </Link>

            {/* 1. Vektörel Türk Bayraklı [TR] Butonu (`h-8`) */}
            <button
              type="button"
              aria-label="Dil Seçimi: Türkçe"
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#0B1560]/25 bg-white/90 px-2 text-[11px] font-bold text-[#0B1560] transition hover:border-[#0B1560] hover:bg-white"
            >
              <TurkishFlagSvg />
              <span>TR</span>
            </button>

            {/* 2. Arama [🔍] Butonu (`w-8 h-8`) */}
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="Ürün ve Sistem Ara"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#0B1560]/25 bg-white/90 text-[#0B1560] transition hover:border-[#D91B24] hover:bg-white hover:text-[#D91B24]"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
              </svg>
            </button>

            {/* Mobil Menü Butonu (`w-8 h-8`) */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Mobil Menüyü Aç/Kapat"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#0B1560]/25 bg-white/90 text-xs text-[#0B1560] lg:hidden"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          HIZLI ÜRÜN ARAMA MODALI ([🔍])
         ===================================================================== */}
      {searchOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-5 shadow-2xl">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between gap-3">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sistem veya seri adı yazın (Örn: Dorado 76, Giyotin, Cam Balkon)..."
                className="w-full rounded-xl border border-[#0B1560]/30 px-4 py-2.5 text-xs font-medium text-slate-900 focus:border-[#0B1560] focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-xl bg-slate-100 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                Kapat
              </button>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/urunler/${item.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-2.5 text-xs transition hover:border-[#D91B24] hover:bg-slate-50"
                >
                  <div>
                    <div className="font-bold text-[#0B1560]">{item.name}</div>
                    <div className="text-[10px] text-slate-500">{item.category}</div>
                  </div>
                  <span className="font-bold text-[#D91B24]">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MOBİL MENÜ ÇEKMECESİ
         ===================================================================== */}
      {mobileOpen && (
        <div className="max-h-[82vh] overflow-y-auto border-b border-slate-300 bg-white px-4 py-4 shadow-2xl lg:hidden">
          <div className="space-y-1.5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-extrabold text-[#0B1560] hover:bg-slate-100"
            >
              ANASAYFA
            </Link>

            {/* Mobil Hizmetlerimiz */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'hizmetlerimiz' ? null : 'hizmetlerimiz')
                }
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-extrabold text-[#0B1560] hover:bg-slate-100"
              >
                <span>HİZMETLERİMİZ</span>
                <span>{mobileAccordion === 'hizmetlerimiz' ? '−' : '+'}</span>
              </button>
              {mobileAccordion === 'hizmetlerimiz' && (
                <div className="mt-1 space-y-1 pl-4">
                  {HIZMETLERIMIZ_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1 text-xs font-medium text-slate-700 hover:text-[#D91B24]"
                    >
                      ▸ {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobil Ürünlerimiz */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'urunlerimiz' ? null : 'urunlerimiz')
                }
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-extrabold text-[#0B1560] hover:bg-slate-100"
              >
                <span>ÜRÜNLERİMİZ</span>
                <span>{mobileAccordion === 'urunlerimiz' ? '−' : '+'}</span>
              </button>
              {mobileAccordion === 'urunlerimiz' && (
                <div className="mt-1 space-y-1 pl-4">
                  {URUNLERIMIZ_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1 text-xs font-medium text-slate-700 hover:text-[#D91B24]"
                    >
                      ▸ {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobil Kurumsal */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'kurumsal' ? null : 'kurumsal')
                }
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-extrabold text-[#0B1560] hover:bg-slate-100"
              >
                <span>KURUMSAL</span>
                <span>{mobileAccordion === 'kurumsal' ? '−' : '+'}</span>
              </button>
              {mobileAccordion === 'kurumsal' && (
                <div className="mt-1 space-y-1 pl-4">
                  {KURUMSAL_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1 text-xs font-medium text-slate-700 hover:text-[#D91B24]"
                    >
                      ▸ {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobil Profesyoneller */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(
                    mobileAccordion === 'profesyoneller' ? null : 'profesyoneller'
                  )
                }
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-extrabold text-[#0B1560] hover:bg-slate-100"
              >
                <span>PROFESYONELLER</span>
                <span>{mobileAccordion === 'profesyoneller' ? '−' : '+'}</span>
              </button>
              {mobileAccordion === 'profesyoneller' && (
                <div className="mt-1 space-y-1 pl-4">
                  {PROFESYONELLER_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1 text-xs font-medium text-slate-700 hover:text-[#D91B24]"
                    >
                      ▸ {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/profesyoneller/referanslar"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-extrabold text-[#0B1560] hover:bg-slate-100"
            >
              REFERANSLAR
            </Link>

            <Link
              href="/iletisim"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-extrabold text-[#0B1560] hover:bg-slate-100"
            >
              İLETİŞİM
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * Ana Sayfa İlk Konteynerde Şeffaf, Kaydırınca ve Alt Sayfalarda Kurumsal Header Wrapper
 */
export const SiteHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [heroScene, setHeroScene] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleHeroScene = (e: Event) => {
      const customEvent = e as CustomEvent<{ scene: number }>;
      if (customEvent.detail && typeof customEvent.detail.scene === 'number') {
        setHeroScene(customEvent.detail.scene);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('winsa-hero-scene', handleHeroScene);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('winsa-hero-scene', handleHeroScene);
    };
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setHeroScene(0);
    }
  }, [pathname]);

  const isHomepage = pathname === '/';
  const isTransparent = isHomepage && scrollY < 50 && heroScene === 0;

  return (
    <>
      <MegaMenu isTransparent={isTransparent} />
      <div className={isHomepage ? 'pt-0' : 'pt-[102px]'}>{children}</div>
    </>
  );
};
