import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '../config/site.config';
import { HeroSlider } from '../components/HeroSlider';
import { InnovativeShowcase } from '../components/InnovativeShowcase';
import { ArchitecturalVirtualTour } from '../components/ArchitecturalVirtualTour';

const MARQUEE_TERMS = [
  'CAM BALKON SİSTEMLERİ',
  'KIŞ BAHÇESİ',
  'GİYOTİN CAM',
  'ALÜMİNYUM & PVC DOĞRAMA',
  'PANJUR & KEPENK',
  'CEPHE GİYDİRME SİSTEMLERİ',
  'OFİS BÖLME SİSTEMLERİ',
  'KALDIR-SÜR SÜRME SİSTEMLER',
];

const NINE_SERVICE_CATEGORIES = [
  {
    id: '01',
    title: 'Cam Balkon Sistemleri',
    tag: '4+20+4 ISICAM & KATLANIR',
    image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    href: '/urunler?kategori=cam-balkon-sistemleri',
  },
  {
    id: '02',
    title: 'Kış Bahçesi Sistemleri',
    tag: 'BİOKLİMATİK & TERAS',
    image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
  },
  {
    id: '03',
    title: 'Giyotin Sistemleri',
    tag: 'SOMFY MOTORLU CAM',
    image: '/images/products/cam-balkon-default.svg',
    href: '/urunler/giyotin-motorlu-silinebilir-cam',
  },
  {
    id: '04',
    title: 'Alüminyum Sistemleri',
    tag: 'MİMARİ DOĞRAMA & DONANIM',
    image: '/images/products/donanim-aksesuar-default.svg',
    href: '/urunler?kategori=donanim-sistemleri',
  },
  {
    id: '05',
    title: 'Cephe Giydirme Sistemleri',
    tag: 'STRÜKTÜREL SİLİKON CEPHE',
    image: '/images/siyavuspasa-surme-cam-balkon.jpg',
    href: '/profesyoneller/proje-hizmetleri',
  },
  {
    id: '06',
    title: 'Ofis Bölme Sistemleri',
    tag: 'AKUSTİK CAM BÖLME',
    image: '/images/products/surme-sistem-default.svg',
    href: '/urunler/panorama-esiksiz-surme-cam-balkon',
  },
  {
    id: '07',
    title: 'PVC Pencere, Kapılar',
    tag: 'REVOTECH GOLD & DORADO 76',
    image: '/images/products/pvc-pencere-default.svg',
    href: '/urunler?kategori=pencere-ve-kapi-sistemleri',
  },
  {
    id: '08',
    title: 'Sürme Sistemler',
    tag: 'PANORAMA HS 76 & LOTUS',
    image: '/images/products/surme-sistem-default.svg',
    href: '/urunler?kategori=surme-sistemler',
  },
  {
    id: '09',
    title: 'Panjur & Kepenk',
    tag: 'WINSTOR & WINKEPENK',
    image: '/images/products/panjur-kepenk-default.svg',
    href: '/urunler?kategori=panjur-ve-kepenk-sistemleri',
  },
];

const PANORAMIC_PROJECTS = [
  {
    title: 'Panoramik Villa Cephesi',
    location: 'Bahçelievler • Kocasinan',
    system: 'VBS 4+20+4 Isıcamlı Cam Balkon',
    image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    href: '/profesyoneller/referanslar',
  },
  {
    title: 'Lüks Teras & Bahçe Geçişi',
    location: 'Bakırköy • Yeşilköy',
    system: 'Panorama HS 76 Kaldır-Sür',
    image: '/images/siyavuspasa-surme-cam-balkon.jpg',
    href: '/profesyoneller/referanslar',
  },
  {
    title: 'Motorlu Giyotin & Kış Bahçesi',
    location: 'Bahçelievler • Siyavuşpaşa',
    system: 'Somfy Motorlu Giyotin Sistem',
    image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
    href: '/profesyoneller/referanslar',
  },
  {
    title: 'Modern Rezidans Doğrama',
    location: 'Florya & Ataköy',
    system: 'Revotech Gold 84mm Antrasit',
    image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    href: '/profesyoneller/referanslar',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* =====================================================================
          1. TAM EKRAN 3 AŞAMALI MİMARİ HERO VİTRİNİ (100dvh, Şeffaf Header Arkasında)
         ===================================================================== */}
      <HeroSlider />

      {/* =====================================================================
          2. DEKORATİF MİMARİ ŞERİT (INFINITE SMOOTH MARQUEE)
         ===================================================================== */}
      <div className="overflow-hidden border-y border-white/10 bg-[#0B1560] py-4 text-white/85">
        <div className="animate-architectural-marquee flex items-center gap-8 whitespace-nowrap text-xs font-extrabold tracking-[0.22em]">
          {[...MARQUEE_TERMS, ...MARQUEE_TERMS].map((term, idx) => (
            <span key={`${term}-${idx}`} className="inline-flex items-center gap-8">
              <span className="text-[#D91B24]">◆</span>
              <span>{term}</span>
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================================
          3. HİZMETLERİMİZ & ÜRÜN GRUPLARIMIZ — 9'LU L-KÖŞE DEKORATİF VİTRİN
         ===================================================================== */}
      <section className="marble-surface relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 border-b border-[#0B1560]/10 pb-8 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#D91B24]">
                <span className="h-[2px] w-6 bg-[#D91B24]" />
                <span>HİZMETLERİMİZ &amp; SİSTEM GRUPLARIMIZ</span>
              </div>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0B1560] sm:text-4xl">
                Mimari Cam ve Doğrama Çözümleri
              </h2>
            </div>

            <Link
              href="/urunler"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-[#0B1560]/20 bg-white px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#0B1560] shadow-xs transition-all hover:border-[#D91B24] hover:bg-[#D91B24] hover:text-white"
            >
              <span>Tüm Sistemleri Gör</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* 9 Ana Hizmet & Ürün Kartı Grid (4 Köşe L-Bracket Hover Dekorasyonlu) */}
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {NINE_SERVICE_CATEGORIES.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0B1560]/30 hover:shadow-[0_22px_45px_-16px_rgba(11,21,96,0.16)] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-0 after:bg-[#D91B24] after:transition-all after:duration-500 hover:after:w-full"
              >
                {/* Görsel + 4 Köşe Mimari L-Bracket (`┌ ┐ └ ┘`) Çerçeve */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={640}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1560]/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* 4 Köşe Kırmızı L-Brackets (`┌ ┐ └ ┘`) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-[#D91B24] opacity-0 transition-all duration-300 group-hover:top-2.5 group-hover:left-2.5 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-[#D91B24] opacity-0 transition-all duration-300 group-hover:top-2.5 group-hover:right-2.5 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#D91B24] opacity-0 transition-all duration-300 group-hover:bottom-2.5 group-hover:left-2.5 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#D91B24] opacity-0 transition-all duration-300 group-hover:bottom-2.5 group-hover:right-2.5 group-hover:opacity-100"
                  />

                  <span className="absolute top-3 left-3 rounded-md bg-[#0B1560]/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-0">
                    {item.tag}
                  </span>
                </div>

                {/* Minimalist Kart Alt Başlık & Kayar "İncele →" Rozeti */}
                <div className="mt-4 flex items-center justify-between pt-1">
                  <h3 className="text-lg font-black tracking-tight text-[#0B1560] transition-colors duration-300 group-hover:text-[#D91B24]">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-[#0B1560] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#D91B24] group-hover:text-white">
                    <span>İncele</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3B. 5'Lİ İNTERAKTİF MİMARİ LABORATUVAR (HOTSPOT, -38dB SES, SİHİRBAZ, STÜDYO, CAD LENS)
         ===================================================================== */}
      <InnovativeShowcase />

      {/* =====================================================================
          4. İNTERAKTİF GÜNDÜZ/GECE & SİSTEM DENEYİM VİTRİNİ (SANAL TUR)
         ===================================================================== */}
      <ArchitecturalVirtualTour />

      {/* =====================================================================
          5. MİNİMALİST 4'LÜ PROJE GALERİSİ & SHOWROOM DAVET ŞERİDİ
         ===================================================================== */}
      <section className="marble-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 border-b border-[#0B1560]/10 pb-8 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#D91B24]">
                <span className="h-[2px] w-6 bg-[#D91B24]" />
                <span>SEÇKİN REFERANSLAR</span>
              </div>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0B1560] sm:text-4xl">
                Panoramik Yaşam Alanları
              </h2>
            </div>

            <Link
              href="/profesyoneller/referanslar"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-[#0B1560]/20 bg-white px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#0B1560] transition-all hover:border-[#D91B24] hover:bg-[#D91B24] hover:text-white"
            >
              <span>Tüm Referanslar</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* 4 Büyük Panoramik Referans Kartı */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PANORAMIC_PROJECTS.map((proj) => (
              <Link
                key={proj.title}
                href={proj.href}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md"
              >
                <Image
                  src={proj.image}
                  alt={proj.title}
                  width={500}
                  height={620}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="
                  absolute inset-0 bg-gradient-to-t from-[#070E1E]/95 via-[#070E1E]/35 to-transparent
                " />

                {/* Köşe L-Bracket Hover */}
                <span className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-[#D91B24] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-[#D91B24] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-block rounded-full bg-[#D91B24] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                    {proj.location}
                  </span>
                  <h3 className="mt-2 text-base font-black leading-snug text-white">
                    {proj.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-300">
                    {proj.system}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Minimalist Showroom & Katalog Davet Şeridi */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#0B1560]/15 bg-white p-6 shadow-sm sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1560] text-lg font-black text-white">
                ◆
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0B1560]">
                  Kocasinan Merkez Showroom &amp; Deneyim Merkezi
                </h3>
                <p className="text-xs font-medium text-slate-600">
                  {SITE_CONFIG.address} • {SITE_CONFIG.workingHours}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/profesyoneller/kataloglar"
                className="rounded-full bg-[#0B1560] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-[#D91B24]"
              >
                E-Kataloglar
              </Link>
              <Link
                href="/iletisim"
                className="rounded-full border border-[#0B1560]/25 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[#0B1560] transition hover:border-[#D91B24] hover:text-[#D91B24]"
              >
                Showroom Konumu →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
