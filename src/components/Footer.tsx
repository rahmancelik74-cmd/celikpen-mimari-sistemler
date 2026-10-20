'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SITE_CONFIG } from '../config/site.config';
import { CelikpenLogo } from './CelikpenLogo';

interface FooterLinkItem {
  label: string;
  href: string;
  badge?: string;
}

const ROW_1_PRODUCT_COLUMNS: {
  title: string;
  titleHref: string;
  links: FooterLinkItem[];
  extraHeaders?: { title: string; href: string }[];
}[] = [
  {
    title: 'Pencere ve Kapı Sistemleri',
    titleHref: '/urunler?kategori=pencere-ve-kapi-sistemleri',
    links: [
      { label: 'Dorado 76', href: '/urunler/dorado-76', badge: '76mm' },
      { label: 'Revotech Gold', href: '/urunler/revotech-gold', badge: '84mm' },
      { label: 'Revotech', href: '/urunler/revotech' },
      { label: 'Safir 76', href: '/urunler/safir-76' },
      { label: 'Safir 70', href: '/urunler/safir-70' },
      { label: 'Karina', href: '/urunler/karina' },
    ],
  },
  {
    title: 'Sürme Sistemleri',
    titleHref: '/urunler?kategori=surme-sistemler',
    links: [
      { label: 'Comfort Slide Plus', href: '/urunler/comfort-slide-plus', badge: 'Yeni' },
      { label: 'Lotus', href: '/urunler/lotus' },
      { label: 'Panorama HS 76', href: '/urunler/panorama-hs-76', badge: 'HS' },
      { label: 'Dorado 76 Sürme', href: '/urunler/dorado-76-surme' },
      { label: 'Safir Sürme', href: '/urunler/safir-surme' },
    ],
  },
  {
    title: 'Panjur ve Kepenk Sistemleri',
    titleHref: '/urunler?kategori=panjur-ve-kepenk-sistemleri',
    links: [
      { label: 'Winkepenk', href: '/urunler/winkepenk' },
      { label: 'Winstor', href: '/urunler/winstor-monoblok-panjur', badge: 'Monoblok' },
      { label: 'Dıştan Takma Panjur', href: '/urunler/distan-takma-panjur' },
    ],
  },
  {
    title: 'Cam Balkon ve Donanım Sistemleri',
    titleHref: '/urunler?kategori=cam-balkon-sistemleri',
    links: [
      { label: 'VBS Isıcamlı Cam Balkon', href: '/urunler/vbs-isicamli-cam-balkon', badge: '4+20+4' },
      { label: 'VNS Katlanır Cam Balkon', href: '/urunler/vns-katlanir-cam-balkon' },
      { label: 'Panorama Eşiksiz Sürme', href: '/urunler/panorama-esiksiz-surme' },
      { label: 'Giyotin Motorlu Cam Balkon', href: '/urunler/giyotin-motorlu-cam-balkon' },
      { label: 'Bioklimatik Kış Bahçesi', href: '/urunler/bioklimatik-kis-bahcesi' },
    ],
    extraHeaders: [
      { title: 'Donanım Sistemleri', href: '/urunler?kategori=donanim-sistemleri' },
      { title: 'Renkler (Cool Colors)', href: '/urunler/winsa-renk-dunyasi' },
    ],
  },
];

const ROW_2_CORPORATE_COLUMNS: {
  title: string;
  titleHref: string;
  links: FooterLinkItem[];
}[] = [
  {
    title: 'Kurumsal',
    titleHref: '/kurumsal',
    links: [
      { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
      { label: 'Vizyon Misyon', href: '/kurumsal/vizyon-misyon' },
      { label: 'Neden PVC, Neden Winsa?', href: '/kurumsal/neden-winsa' },
      { label: 'AR-GE Çalışmalarımız', href: '/kurumsal/ar-ge' },
      { label: 'Çevre Dostu Pencere', href: '/kurumsal/cevre-dostu-pencere' },
      { label: 'Kampanyalar', href: '/kurumsal/kampanyalar', badge: '2026' },
    ],
  },
  {
    title: 'Profesyoneller',
    titleHref: '/profesyoneller',
    links: [
      { label: 'Proje Hizmetleri', href: '/profesyoneller/proje-hizmetleri' },
      { label: 'Kataloglar', href: '/profesyoneller/kataloglar' },
      { label: 'Teknik Şartnameler', href: '/profesyoneller/teknik-sartnameler' },
      { label: 'Kalite Belgeleri', href: '/profesyoneller/kalite-belgeleri' },
      { label: 'Profesyonel Bakış', href: '/profesyoneller/profesyonel-bakis' },
      { label: 'Montaj Kılavuzu', href: '/profesyoneller/montaj-kilavuzu' },
      { label: 'Kullanım Kılavuzu', href: '/profesyoneller/kullanim-kilavuzu' },
      { label: 'Açılım Seçenekleri', href: '/profesyoneller/acilim-secenekleri' },
      { label: 'Referanslar', href: '/profesyoneller/referanslar' },
      { label: 'Blog', href: '/profesyoneller/blog' },
    ],
  },
  {
    title: 'Medya & Bölgeler',
    titleHref: '/kurumsal/basinda-winsa',
    links: [
      { label: 'Basında Winsa', href: '/kurumsal/basinda-winsa' },
      { label: 'Fuarlar ve Etkinlikler', href: '/kurumsal/fuarlar-etkinlikler' },
      { label: 'Mimari Ürün Kataloğu', href: '/urunler', badge: '2026' },
      { label: 'Kocasinan Merkez Showroom', href: '/satis-noktalari' },
      { label: 'Bahçelievler Hizmet Bölgeleri', href: '/bahcelievler/kocasinan-merkez' },
      { label: '4/5 Apartman Muvafakatnamesi', href: '/blog/eylul-2026-yargitay-cam-balkon-karari' },
    ],
  },
  {
    title: 'İletişim',
    titleHref: '/iletisim',
    links: [
      { label: 'İletişim Bilgileri', href: '/iletisim' },
      { label: 'Bize Ulaşın', href: '/iletisim?form=kesif' },
      { label: 'Bilgi Alma Formu', href: '/iletisim?form=bilgi' },
      { label: 'Bayilik Başvuru Formu', href: '/iletisim?form=bayilik' },
      { label: 'İnsan Kaynakları', href: '/iletisim?form=ik' },
    ],
  },
];

export const Footer: React.FC = () => {
  const router = useRouter();

  const handlePrefetch = (href: string) => {
    try {
      router.prefetch(href);
    } catch {
      // ignore prefetch errors in dev
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="marble-surface relative overflow-hidden border-t border-[#E5E3DC] text-[#0B1560] print:hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6">
        {/* =====================================================================
            1. ÜST İNTERAKTİF MİMARİ DÖNÜŞÜM BENTO BARI (2x4 Matrisin Üstünde)
           ===================================================================== */}
        <div className="mb-14 rounded-2xl border border-white/10 bg-gradient-to-r from-[#0B1560] via-[#11207A] to-[#0B1560] p-6 text-white shadow-2xl sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            {/* Sütun 1: Kurumsal Mimari Danışmanlık & Showroom */}
            <div className="space-y-2 lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-sky-200">
                <span className="h-2 w-2 rounded-full bg-[#D91B24]" />
                Mimari Mühendislik & 3D Sistem Çözümleri
              </span>
              <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                Yaşam Alanlarınızı Winsa & Çelikpen Kalitesiyle Tasarlayın
              </h2>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-white transition hover:bg-white/20"
                >
                  📞 {SITE_CONFIG.phoneDisplay}
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-white transition hover:bg-white/20"
                >
                  📍 Kocasinan Merkez Showroom
                </Link>
              </div>
            </div>

            {/* Sütun 2: Mimari Ürün Kataloğu + 2026 Dijital E-Katalog */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-4">
              <Link
                href="/urunler"
                onMouseEnter={() => handlePrefetch('/urunler')}
                className="group rounded-xl border border-white/15 bg-white/5 p-3.5 transition-all hover:border-[#D91B24] hover:bg-white/10"
              >
                <div className="text-[11px] font-extrabold uppercase text-[#FF6B72]">
                  Mimari Koleksiyon
                </div>
                <div className="mt-1 text-sm font-bold text-white group-hover:text-rose-200">
                  Tüm Ürün ve Sistem Grupları →
                </div>
                <p className="mt-0.5 text-[11px] text-slate-300">
                  PVC Pencere, Sürme, Cam Balkon & Panjur
                </p>
              </Link>

              <Link
                href="/profesyoneller/kataloglar"
                onMouseEnter={() => handlePrefetch('/profesyoneller/kataloglar')}
                className="group rounded-xl border border-white/15 bg-white/5 p-3.5 transition-all hover:border-sky-400 hover:bg-white/10"
              >
                <div className="text-[11px] font-extrabold uppercase text-sky-300">
                  Teknik Kütüphane
                </div>
                <div className="mt-1 text-sm font-bold text-white group-hover:text-sky-200">
                  2026 Dijital E-Katalog Merkezi →
                </div>
                <p className="mt-0.5 text-[11px] text-slate-300">
                  1:1 CAD kesitler ve teknik föyler
                </p>
              </Link>
            </div>

            {/* Sütun 3: Doğrudan Aksiyon Butonları */}
            <div className="flex flex-col gap-2.5 sm:flex-row lg:col-span-3 lg:flex-col">
              <Link
                href="/profesyoneller/kataloglar"
                onMouseEnter={() => handlePrefetch('/profesyoneller/kataloglar')}
                className="inline-flex items-center justify-center rounded-xl bg-[#D91B24] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-[#B31219]"
              >
                ÜRÜN KATALOGLARINI İNCELE →
              </Link>
              <Link
                href="/satis-noktalari"
                onMouseEnter={() => handlePrefetch('/satis-noktalari')}
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-xs transition-all hover:border-white hover:bg-white/20"
              >
                İLETİŞİM & SHOWROOM →
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================================
            2. WİNSA 2 SATIR x 4 SÜTUN ANA LİNK MATRİSİ (8 KATEGORİ BLOĞU)
           ===================================================================== */}

        {/* 1. SATIR: 4 ÜRÜN SÜTUNU */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ROW_1_PRODUCT_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[15px] font-black tracking-tight text-[#0B1560]">
                <Link
                  href={col.titleHref}
                  onMouseEnter={() => handlePrefetch(col.titleHref)}
                  className="transition-colors hover:text-[#D91B24]"
                >
                  {col.title}
                </Link>
              </h3>
              {/* İki Tonlu Mimari Kırmızı (#D91B24) Alt Çizgi */}
              <div className="mt-2 mb-4 flex items-center">
                <span className="h-[3px] w-8 bg-[#D91B24]" />
                <span className="h-[1px] flex-1 bg-[#0B1560]/15" />
              </div>

              <ul className="space-y-2 text-[13.5px] font-medium text-[#0B1560]/85">
                {col.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => handlePrefetch(item.href)}
                      className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 hover:text-[#D91B24]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24] opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="rounded bg-[#0B1560]/10 px-1.5 py-0.5 text-[10px] font-extrabold text-[#0B1560] group-hover:bg-[#D91B24] group-hover:text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {col.extraHeaders && (
                <div className="mt-5 space-y-2 border-t border-[#0B1560]/15 pt-3.5">
                  {col.extraHeaders.map((eh) => (
                    <h4
                      key={eh.href}
                      className="text-[14.5px] font-black tracking-tight text-[#0B1560]"
                    >
                      <Link
                        href={eh.href}
                        onMouseEnter={() => handlePrefetch(eh.href)}
                        className="inline-flex items-center gap-1 transition-all hover:translate-x-1 hover:text-[#D91B24]"
                      >
                        <span>{eh.title}</span>
                        <span className="text-xs text-[#D91B24]">›</span>
                      </Link>
                    </h4>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2. SATIR: 4 KURUMSAL & PROFESYONELLER SÜTUNU */}
        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-[#0B1560]/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {ROW_2_CORPORATE_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[15px] font-black tracking-tight text-[#0B1560]">
                <Link
                  href={col.titleHref}
                  onMouseEnter={() => handlePrefetch(col.titleHref)}
                  className="transition-colors hover:text-[#D91B24]"
                >
                  {col.title}
                </Link>
              </h3>
              {/* İki Tonlu Mimari Kırmızı (#D91B24) Alt Çizgi */}
              <div className="mt-2 mb-4 flex items-center">
                <span className="h-[3px] w-8 bg-[#D91B24]" />
                <span className="h-[1px] flex-1 bg-[#0B1560]/15" />
              </div>

              <ul className="space-y-2 text-[13.5px] font-medium text-[#0B1560]/85">
                {col.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => handlePrefetch(item.href)}
                      className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 hover:text-[#D91B24]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24] opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="rounded bg-[#FFF1F2] px-1.5 py-0.5 text-[10px] font-extrabold text-[#D91B24] ring-1 ring-[#D91B24]/25">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {col.title === 'İletişim' && (
                <div className="mt-5 rounded-xl border border-[#0B1560]/15 bg-[#FAF9F5]/90 p-3.5 text-xs shadow-xs">
                  <p className="font-bold text-[#0B1560]">
                    📍 {SITE_CONFIG.address}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-600">
                    🕒 {SITE_CONFIG.workingHours}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* =====================================================================
            3. KURUMSAL GÜVENCE, CANLI SSL DURUMU & KALİTE ROZETLERİ ŞERİDİ
           ===================================================================== */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#0B1560]/15 bg-[#FAF9F5]/85 px-4 py-3.5 backdrop-blur-xs">
          {/* Canlı SSL Güvenlik Durumu */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-600/30 bg-emerald-50 px-3.5 py-1.5 text-xs font-extrabold text-emerald-900">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </span>
            <span>256-Bit TLS 1.3 SSL & HSTS Preload Korunmalı</span>
          </div>

          {/* 4 Kalite Sertifikasyon Rozeti */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold text-[#0B1560]">
            <span className="rounded-lg border border-[#E5E3DC] bg-white/90 px-2.5 py-1">
              ✓ TS EN 12608-1 A Sınıfı Profil
            </span>
            <span className="rounded-lg border border-[#E5E3DC] bg-white/90 px-2.5 py-1">
              ✓ TSE EN 12150 Temperli Cam
            </span>
            <span className="rounded-lg border border-[#E5E3DC] bg-white/90 px-2.5 py-1">
              ✓ IFT Rosenheim Akustik/Termal Onaylı
            </span>
            <span className="rounded-lg border border-[#D91B24]/25 bg-[#FFF1F2] px-2.5 py-1 text-[#D91B24]">
              ★ 10 Yıl Kurumsal Garanti
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          4. ALT TELİF HAKKI, LOGO, KVKK VE "YUKARI ÇIK ↑" BARI
         ===================================================================== */}
      <div className="relative z-10 border-t border-[#E5E3DC] bg-[#EAE7DF]/90 py-5 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="group inline-flex items-center">
              <CelikpenLogo size="sm" />
            </Link>
            <p className="text-xs font-semibold text-slate-600">
              © {new Date().getFullYear()} {SITE_CONFIG.brandName}. Tüm hakları saklıdır.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#0B1560]">
            <Link href="/kurumsal/hakkimizda" className="hover:text-[#D91B24]">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/kurumsal/cevre-dostu-pencere" className="hover:text-[#D91B24]">
              Çerez & Gizlilik Politikası
            </Link>
            <Link href="/profesyoneller/kalite-belgeleri" className="hover:text-[#D91B24]">
              Garanti Şartları
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Sayfanın Başına Dön"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0B1560]/30 bg-white/95 px-3.5 py-1.5 text-xs font-extrabold text-[#0B1560] shadow-xs backdrop-blur-xs transition-all hover:-translate-y-0.5 hover:border-[#D91B24] hover:bg-[#D91B24] hover:text-white"
            >
              <span>Yukarı Çık</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
