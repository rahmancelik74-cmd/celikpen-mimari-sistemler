'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ============================================================================
   MODÜL 1 VERİLERİ: SICAK NOKTA MİMARİ ANALİZ (5 HOTSPOT PİN)
   ============================================================================ */
interface HotspotPin {
  id: string;
  x: number; // %
  y: number; // %
  label: string;
  title: string;
  specBadge: string;
  cadCode: string;
  detail: string;
}

const HOTSPOT_PINS: HotspotPin[] = [
  {
    id: 'cam-panel',
    x: 46,
    y: 42,
    label: 'Cam Panel',
    title: '4+20+4 mm Argon Gazlı Sinerji Isıcam (%65 Isı Koruma)',
    specBadge: 'Uw: 0.79 W/m²K • TSE EN 12150 Temperli',
    cadCode: 'CAD-GLS-28',
    detail: 'Çift yüzeyi temperli Şişecam Low-E Konfor cam ve %90 Argon gaz dolgulu termal bariyer.',
  },
  {
    id: 'ray-rulman',
    x: 28,
    y: 18,
    label: 'Üst/Alt Ray',
    title: '8 Bilyalı Paslanmaz Çelik Çift Rulman Sistemi',
    specBadge: 'AISI 304 Çelik • 120 kg/Kanat Kapasite',
    cadCode: 'CAD-RLM-08',
    detail: 'Her kanatta 8 adet fırtına emniyetli, sessiz poliamid kaplı paslanmaz çelik rulman.',
  },
  {
    id: 'profil-birlesim',
    x: 69,
    y: 48,
    label: 'Profil Birleşimi',
    title: 'Alüminyum EPDM Contalı Fırtına & Su Sızdırmazlık Kalkanı',
    specBadge: 'Sınıf 9A Su Sızdırmazlık • 1600 Pa Rüzgar',
    cadCode: 'CAD-PRF-76',
    detail: 'Sararmayan alüminyum kenetli fitil ve çift sıra UV dayanımlı EPDM conta kalkanı.',
  },
  {
    id: 'kasa-damlalik',
    x: 38,
    y: 82,
    label: 'Kasa Damlalığı',
    title: 'Gizli Su Tahliye ve Yoğuşma Kanalı',
    specBadge: '45° Eğimli Deşarj • Geri Tepme Valfli',
    cadCode: 'CAD-DRN-04',
    detail: 'Şiddetli sağanak yağışta suyu dış cepheye yönlendiren çift kademeli gizli damlalık.',
  },
  {
    id: 'kilit-mekanizma',
    x: 78,
    y: 49,
    label: 'Kilit Mekanizması',
    title: 'Çocuk Emniyetli Paslanmaz İspanyolet Kilit',
    specBadge: 'RC2 Güvenlik • Çift Yönlü Kilit',
    cadCode: 'CAD-LCK-02',
    detail: 'Alt ve üst kasaya eşzamanlı kilitleme yapan çocuk güvenlik mandallı çelik mekanizma.',
  },
];

/* ============================================================================
   MODÜL 3 VERİLERİ: 3 TIKLA SİSTEM BULUCU (MİMARİ SİHİRBAZ)
   ============================================================================ */
type SpaceType = 'balkon' | 'teras' | 'bahce';
type PriorityType = 'yalitim' | 'panoramik' | 'otomasyon';

interface WizardRecommendation {
  code: string;
  name: string;
  category: string;
  image: string;
  href: string;
  badges: [string, string, string];
}

const WIZARD_MATRIX: Record<SpaceType, Record<PriorityType, WizardRecommendation>> = {
  balkon: {
    yalitim: {
      code: 'VBS-TERMAL',
      name: 'Vera Termal 4+20+4 Isıcamlı Cam Balkon',
      category: 'Maksimum Termal & Akustik Yalıtım',
      image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
      href: '/urunler/vera-isicamli-cam-balkon',
      badges: ['%65 Isı Koruma', '38 dB Ses Yalıtımı', '4+20+4 Argonlu Isıcam'],
    },
    panoramik: {
      code: 'VNS-PANORAMA',
      name: 'VNS Panoramik Katlanır Cam Balkon',
      category: 'Kesintisiz Manzara & Tam Açılım',
      image: '/images/siyavuspasa-surme-cam-balkon.jpg',
      href: '/urunler/vera-katlanir-cam-balkon',
      badges: ['%100 Tam Açılır Kanat', '8 Bilyalı Çelik Rulman', 'TSE Temperli Cam'],
    },
    otomasyon: {
      code: 'VERA-VERTICAL',
      name: 'Vera Vertical Somfy Motorlu Giyotin Sistem',
      category: 'Uzaktan Kumandalı Dikey Cam',
      image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
      href: '/urunler/giyotin-motorlu-silinebilir-cam',
      badges: ['Somfy RTS Motor', 'Silinebilir Kanat', 'Hareketli Küpeşte'],
    },
  },
  teras: {
    yalitim: {
      code: 'PANORAMA-HS76',
      name: 'Panorama HS 76 Kaldır-Sür (Hebeschiebe)',
      category: 'Ultra Yalıtımlı Teras Kapısı',
      image: '/images/siyavuspasa-surme-cam-balkon.jpg',
      href: '/urunler/panorama-hs-76',
      badges: ['Uw: 0.84 W/m²K', '300 kg Kanat Taşıma', '19 mm Engelsiz Eşik'],
    },
    panoramik: {
      code: 'COMFORT-SLIDE',
      name: 'Comfort Slide Plus & Eksenel Sürme',
      category: 'Geniş Açıklıklı Panoramik Teras',
      image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
      href: '/urunler/comfort-slide-plus',
      badges: ['Panoramik Cam Yüzey', 'EPDM Vakum Conta', 'Tek Parmakla Sürüş'],
    },
    otomasyon: {
      code: 'BIO-PERGOLA',
      name: 'Panorama Bioklimatik Kış Bahçesi',
      category: 'Motorlu Döner Lamel Tavan & Cam',
      image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
      href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
      badges: ['110° Eksenel Lamel', 'Entegre LED & Sensör', '4 Mevsim Teras'],
    },
  },
  bahce: {
    yalitim: {
      code: 'REVOTECH-GOLD',
      name: 'Revotech Gold 84mm & Kış Bahçesi',
      category: '7 Odacıklı Pasif Ev Standardı',
      image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
      href: '/urunler/revotech-gold',
      badges: ['84 mm 7 Odacık', 'Uw: 0.79 W/m²K', '-45 dB Akustik'],
    },
    panoramik: {
      code: 'VDS-ESIKSIZ',
      name: 'Panorama Eşiksiz Sürme Cam Sistemleri',
      category: 'Engelsiz Bahçe & Salon Geçişi',
      image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
      href: '/urunler/panorama-esiksiz-surme-cam-balkon',
      badges: ['0 mm Engelsiz Geçiş', '5 Raylı Panoramik', 'Kilitli Sürme Kanat'],
    },
    otomasyon: {
      code: 'VERA-GIYOTIN',
      name: 'Somfy Motorlu Giyotin & Bioklimatik Sistem',
      category: 'Restoran, Kafe & Villa Bahçesi',
      image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
      href: '/urunler/giyotin-motorlu-silinebilir-cam',
      badges: ['Uzaktan Kumandalı', 'Rüzgar & Yağmur Sensörü', 'Isıcamlı Giyotin'],
    },
  },
};

/* ============================================================================
   MODÜL 4 VERİLERİ: CANLI PROFİL & CAM RENGİ STÜDYOSU
   ============================================================================ */
interface ProfileFinish {
  id: string;
  name: string;
  code: string;
  frameColor: string;
  frameStroke: string;
  accentColor: string;
}

const PROFILE_FINISHES: ProfileFinish[] = [
  {
    id: 'antrasit',
    name: 'Antrasit Gri',
    code: 'RAL 7016',
    frameColor: '#2B323B',
    frameStroke: '#475569',
    accentColor: '#1E242B',
  },
  {
    id: 'mat-siyah',
    name: 'Mat Siyah',
    code: 'RAL 9005',
    frameColor: '#14171A',
    frameStroke: '#334155',
    accentColor: '#090B0E',
  },
  {
    id: 'altin-mese',
    name: 'Altın Meşe (3D Ahşap)',
    code: 'RENOLIT 2178',
    frameColor: '#8B5A2B',
    frameStroke: '#B87B42',
    accentColor: '#69411C',
  },
  {
    id: 'koyu-ceviz',
    name: 'Koyu Ceviz',
    code: 'RENOLIT 2052',
    frameColor: '#4A2E1B',
    frameStroke: '#6E472B',
    accentColor: '#362011',
  },
  {
    id: 'krem-beyaz',
    name: 'Krem / Beyaz',
    code: 'RAL 9016',
    frameColor: '#EAE8E1',
    frameStroke: '#CBD5E1',
    accentColor: '#D5D2C8',
  },
];

interface GlassTint {
  id: string;
  name: string;
  spec: string;
  fill: string;
  opacity: number;
  reflectionColor: string;
}

const GLASS_TINTS: GlassTint[] = [
  {
    id: 'seffaf',
    name: 'Ultra Şeffaf',
    spec: '%82 Işık Geçirgenliği • Low-E',
    fill: '#BAE6FD',
    opacity: 0.28,
    reflectionColor: '#FFFFFF',
  },
  {
    id: 'fume',
    name: 'Füme Reflekte',
    spec: '%48 Güneş Kontrol • Mahremiyet',
    fill: '#1E293B',
    opacity: 0.62,
    reflectionColor: '#94A3B8',
  },
  {
    id: 'bronz',
    name: 'Bronz Güneş Kontrol',
    spec: '%55 UV Blokaj • Sıcak Yansıma',
    fill: '#78350F',
    opacity: 0.48,
    reflectionColor: '#FDE68A',
  },
  {
    id: 'kumlama',
    name: 'Kumlama Buzlu',
    spec: '%100 Görsel Mahremiyet • Mat',
    fill: '#E2E8F0',
    opacity: 0.78,
    reflectionColor: '#FFFFFF',
  },
];

type ShowcaseModuleTab = 'hotspots' | 'acoustic' | 'wizard' | 'studio' | 'blueprint';

const MODULE_TABS: { id: ShowcaseModuleTab; badge: string; label: string }[] = [
  { id: 'hotspots', badge: '01', label: 'Sıcak Nokta Analiz' },
  { id: 'acoustic', badge: '02', label: '-38 dB Akustik Deneyim' },
  { id: 'wizard', badge: '03', label: '3 Tıkla Sistem Bulucu' },
  { id: 'studio', badge: '04', label: 'Renk & Cam Stüdyosu' },
  { id: 'blueprint', badge: '05', label: 'CAD Çizimden Gerçeğe' },
];

/* ============================================================================
   ÜRÜNLER SAYFASI İÇİN KOMPAKT İNTERAKTİF LAB ÖNİZLEMESİ
   ============================================================================ */
export const InteractiveLabPreview: React.FC = () => {
  return (
    <section
      aria-labelledby="interaktif-lab-preview-title"
      className="overflow-hidden rounded-2xl border border-[#0B1560]/15 bg-white shadow-2xs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5">
          <div className="inline-flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-[#D91B24]">
            <span className="h-[1.5px] w-5 bg-[#D91B24]" />
            <span>İNTERAKTİF MİMARİ LABORATUVAR</span>
          </div>
          <h2
            id="interaktif-lab-preview-title"
            className="mt-1.5 text-xl font-black tracking-tight text-[#0B1560] sm:text-2xl"
          >
            CAD Çizimden Gerçeğe, Renkten Dokuya
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Profil ve cam rengini canlı deneyin, 1:1 CAD kesiti gerçek uygulamayla
            karşılaştırın. Beş interaktif modül ana sayfadaki mimari laboratuvarda.
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {[
              'Sıcak Nokta Analizi',
              '-38 dB Akustik Test',
              '3 Tıkla Sistem Bulucu',
              'Renk Stüdyosu',
              'CAD Lens',
            ].map((label) => (
              <span
                key={label}
                className="rounded-md border border-[#0B1560]/12 bg-[#FAF9F5] px-2 py-1 text-[10px] font-bold text-[#0B1560]"
              >
                {label}
              </span>
            ))}
          </div>

          <Link
            href="/#mimari-inovasyon-merkezi"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-[#D91B24] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-xs transition hover:bg-[#B31219]"
          >
            <span>5 Modülü Canlı Keşfet</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <Link
          href="/#mimari-inovasyon-merkezi"
          aria-label="İnteraktif mimari laboratuvarı ana sayfada aç"
          className="group relative min-h-[300px] overflow-hidden bg-[#071126] lg:col-span-7"
        >
          <Image
            src="/images/kocasinan-isicamli-cam-balkon-hero.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* 1:1 CAD Blueprint Katmanı */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[54%] overflow-hidden bg-[#081638]">
            <svg
              viewBox="0 0 500 340"
              preserveAspectRatio="xMidYMid slice"
              className="h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <pattern id="previewCadGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1E3A8A" strokeWidth="0.7" />
                </pattern>
              </defs>
              <rect width="500" height="340" fill="url(#previewCadGrid)" />
              <rect x="36" y="40" width="330" height="238" fill="none" stroke="#38BDF8" strokeWidth="2" />
              <rect x="48" y="52" width="306" height="214" fill="none" stroke="#60A5FA" strokeWidth="1" />
              <line x1="124" y1="52" x2="124" y2="266" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="202" y1="52" x2="202" y2="266" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="280" y1="52" x2="280" y2="266" stroke="#38BDF8" strokeWidth="1.5" />
              <polyline points="48,52 124,159 48,266" fill="none" stroke="#F43F5E" strokeWidth="1.2" strokeDasharray="5 4" />
              <text x="40" y="30" fill="#7DD3FC" fontSize="11" fontFamily="monospace" fontWeight="bold">
                1:1 CAD KESİT
              </text>
              <text x="42" y="306" fill="#BAE6FD" fontSize="10" fontFamily="monospace">
                Uw = 0.79 W/m²K
              </text>
            </svg>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-[54%] z-10 w-0.5 bg-[#D91B24] shadow-[0_0_10px_#D91B24]">
            <span className="absolute top-1/2 -left-3.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#D91B24] text-[10px] font-black text-white shadow-lg">
              ↔
            </span>
          </div>

          <span className="absolute bottom-3 left-3 rounded-md bg-[#0B1560] px-2.5 py-1 font-mono text-[10px] font-bold text-sky-300">
            📐 CAD TEKNİK KESİT
          </span>
          <span className="absolute bottom-3 right-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-[10px] font-extrabold text-white backdrop-blur-xs">
            GERÇEK UYGULAMA
          </span>

          {/* Mini Profil Renk Paleti */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/65 px-2.5 py-1.5 backdrop-blur-md">
            {PROFILE_FINISHES.map((pf) => (
              <span
                key={pf.id}
                title={pf.name}
                className="h-3 w-3 rounded-full border border-white/50"
                style={{ backgroundColor: pf.frameColor }}
              />
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
};

export const InnovativeShowcase: React.FC = () => {
  // Aktif Modül Sekmesi (Kullanıcı tek tıkla geçiş yapabilir)
  const [activeModule, setActiveModule] = useState<ShowcaseModuleTab>('hotspots');

  // Modül 1 State: Seçili Sıcak Nokta Pin
  const [selectedPin, setSelectedPin] = useState<HotspotPin>(HOTSPOT_PINS[0]);

  // Modül 2 State: Ses Yalıtımı (Açık 74 dB vs Kapalı 34 dB)
  const [isWindowClosed, setIsWindowClosed] = useState<boolean>(true);

  // Modül 3 State: 3 Tıkla Sistem Bulucu
  const [wizardSpace, setWizardSpace] = useState<SpaceType>('balkon');
  const [wizardPriority, setWizardPriority] = useState<PriorityType>('yalitim');

  // Modül 4 State: Canlı Profil & Cam Rengi Stüdyosu
  const [selectedProfile, setSelectedProfile] = useState<ProfileFinish>(PROFILE_FINISHES[0]);
  const [selectedGlass, setSelectedGlass] = useState<GlassTint>(GLASS_TINTS[0]);

  // Modül 5 State: CAD Mimari Çizimden Gerçeğe Lens Yüzdesi (0 - 100)
  const [lensPercent, setLensPercent] = useState<number>(52);
  const [isLensDragging, setIsLensDragging] = useState<boolean>(false);
  const lensContainerRef = useRef<HTMLDivElement | null>(null);

  // Sekme çubuğu klavye odağı (roving tabindex)
  const moduleTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleLensMove = (clientX: number) => {
    const el = lensContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, Math.round((relX / rect.width) * 100)));
    setLensPercent(pct);
  };

  const handleLensPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsLensDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    handleLensMove(event.clientX);
  };

  const handleLensPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Fare ile üzerinde gezinirken lens takip eder; dokunmatikte yalnızca aktif sürüklemede çalışır.
    if (event.pointerType === 'mouse' || isLensDragging) {
      handleLensMove(event.clientX);
    }
  };

  const handleLensPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsLensDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const matchedSystem = WIZARD_MATRIX[wizardSpace][wizardPriority];

  const handleModuleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % MODULE_TABS.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + MODULE_TABS.length) % MODULE_TABS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = MODULE_TABS.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveModule(MODULE_TABS[nextIndex].id);
    moduleTabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      id="mimari-inovasyon-merkezi"
      aria-labelledby="interaktif-lab-baslik"
      className="marble-surface relative overflow-hidden border-y border-[#0B1560]/10 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Üst Başlık + 5 İnovatif Modül Seçici Bar */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#D91B24]">
              <span className="h-[1.5px] w-5 bg-[#D91B24]" />
              <span>İNTERAKTİF MİMARİ LABORATUVAR</span>
            </div>
            <h2
              id="interaktif-lab-baslik"
              className="mt-1.5 text-2xl font-black tracking-tight text-[#0B1560] sm:text-3xl"
            >
              Teknolojiyi ve Detayları Canlı Keşfedin
            </h2>
          </div>

          {/* 5 Sekmeli Minimalist Modül Seçici */}
          <div
            role="tablist"
            aria-label="İnteraktif Mimari Modüller"
            className="flex flex-wrap gap-1.5 rounded-2xl border border-[#0B1560]/15 bg-white p-1.5 shadow-2xs"
          >
            {MODULE_TABS.map((tab, tabIndex) => {
              const isSelected = activeModule === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(element) => {
                    moduleTabRefs.current[tabIndex] = element;
                  }}
                  id={`showcase-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`showcase-panel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveModule(tab.id)}
                  onKeyDown={(event) => handleModuleTabKeyDown(event, tabIndex)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D91B24] focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'bg-[#0B1560] text-white shadow-xs'
                      : 'text-[#0B1560]/80 hover:bg-slate-100 hover:text-[#D91B24]'
                  }`}
                >
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-black ${
                      isSelected ? 'bg-[#D91B24] text-white' : 'bg-slate-100 text-[#0B1560]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            MODÜL 1: SICAK NOKTA MİMARİ ANALİZ (5 PULSING HOTSPOT PİNS)
           ===================================================================== */}
        {activeModule === 'hotspots' && (
          <div
            role="tabpanel"
            id="showcase-panel-hotspots"
            aria-labelledby="showcase-tab-hotspots"
            tabIndex={0}
            className="animate-fade-up mt-8 grid grid-cols-1 gap-6 focus:outline-none lg:grid-cols-12 lg:items-center"
          >
            {/* Sol: Vektörel Mimari Cephe & Cam Balkon Kesiti + 5 Kırmızı '+' Pin */}
            <div className="relative overflow-hidden rounded-2xl border border-[#0B1560]/20 bg-[#0B1560] p-4 shadow-xl lg:col-span-7">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#071126]">
                {/* Vektörel Villa Cephesi & Panoramik Cam Balkon İllüstrasyonu */}
                <svg
                  viewBox="0 0 800 500"
                  className="absolute inset-0 h-full w-full"
                  role="img"
                  aria-label="Modern villa cephesinde panoramik cam balkon, alüminyum kasa, cam kanatlar ve gizli su tahliye detayları"
                >
                  <defs>
                    <linearGradient id="hsSky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#050A18" />
                      <stop offset="55%" stopColor="#0B1560" />
                      <stop offset="100%" stopColor="#132B5A" />
                    </linearGradient>
                    <linearGradient id="hsGlass" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.38" />
                      <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="hsMetal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="38%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    <linearGradient id="hsMarble" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FAF9F5" stopOpacity="0.92" />
                      <stop offset="52%" stopColor="#E7E2D6" stopOpacity="0.78" />
                      <stop offset="100%" stopColor="#CFC6B4" stopOpacity="0.6" />
                    </linearGradient>
                    <pattern id="hsGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E3A8A" strokeWidth="0.6" />
                    </pattern>
                  </defs>

                  <rect width="800" height="500" fill="url(#hsSky)" />
                  <rect width="800" height="500" fill="url(#hsGrid)" opacity="0.5" />

                  {/* Uzak Şehir Silüeti */}
                  <g fill="#020617" opacity="0.34">
                    <rect x="0" y="336" width="88" height="164" />
                    <rect x="96" y="366" width="54" height="134" />
                    <rect x="160" y="318" width="72" height="182" />
                    <rect x="600" y="352" width="62" height="148" />
                    <rect x="676" y="326" width="46" height="174" />
                    <rect x="730" y="372" width="70" height="128" />
                  </g>

                  {/* Gece Gökyüzü Işıması */}
                  <circle cx="690" cy="78" r="58" fill="#38BDF8" opacity="0.08" />
                  <circle cx="690" cy="78" r="22" fill="#BAE6FD" opacity="0.5" />
                  <circle cx="206" cy="56" r="1.4" fill="#E0F2FE" opacity="0.9" />
                  <circle cx="262" cy="82" r="1" fill="#E0F2FE" opacity="0.6" />
                  <circle cx="548" cy="42" r="1.2" fill="#E0F2FE" opacity="0.75" />
                  <circle cx="742" cy="124" r="1" fill="#E0F2FE" opacity="0.55" />

                  {/* Villa Taşıyıcı Kabuğu */}
                  <path d="M20 28 H780 V472 H20 Z" fill="#0A1330" stroke="#1E3A8A" strokeWidth="1.5" />
                  <path d="M42 48 H758 V452 H42 Z" fill="#0B1738" stroke="#1E40AF" strokeWidth="1" />
                  <rect x="42" y="48" width="30" height="404" fill="url(#hsMarble)" opacity="0.82" />
                  <rect x="728" y="48" width="30" height="404" fill="url(#hsMarble)" opacity="0.82" />

                  {/* Üst Teras Pergolası */}
                  <g opacity="0.85">
                    {[0, 1, 2, 3, 4, 5, 6].map((slat) => (
                      <rect
                        key={slat}
                        x="88"
                        y={54 + slat * 5}
                        width="624"
                        height="2"
                        fill="#1D4ED8"
                        opacity={0.55 - slat * 0.05}
                      />
                    ))}
                  </g>
                  <rect x="78" y="89" width="644" height="9" fill="#050A18" />
                  <rect x="78" y="89" width="644" height="2" fill="#38BDF8" opacity="0.4" />

                  {/* İç Mekan Sıcak Işığı */}
                  <rect x="100" y="280" width="600" height="96" fill="#F59E0B" opacity="0.055" />
                  <ellipse cx="400" cy="374" rx="270" ry="42" fill="#FDE68A" opacity="0.035" />

                  {/* Üst Alüminyum Ray & Alt Kasa */}
                  <rect x="80" y="70" width="640" height="24" fill="url(#hsMetal)" stroke="#64748B" strokeWidth="1" />
                  <rect x="86" y="75" width="628" height="3" fill="#BAE6FD" opacity="0.4" />
                  <rect x="80" y="394" width="640" height="30" fill="url(#hsMetal)" stroke="#64748B" strokeWidth="1" />
                  <rect x="86" y="400" width="628" height="3" fill="#E2E8F0" opacity="0.22" />
                  <rect x="86" y="418" width="628" height="3" fill="#D91B24" opacity="0.75" />

                  {/* Yan Dikmeler */}
                  <rect x="80" y="70" width="14" height="354" fill="#172554" stroke="#475569" strokeWidth="1" />
                  <rect x="706" y="70" width="14" height="354" fill="#172554" stroke="#475569" strokeWidth="1" />

                  {/* 4 Panoramik Temperli Cam Kanat */}
                  {[0, 1, 2, 3].map((panel) => {
                    const panelX = 96 + panel * 152;
                    return (
                      <g key={panel}>
                        <rect
                          x={panelX}
                          y="94"
                          width="148"
                          height="300"
                          fill="url(#hsGlass)"
                          stroke="#7DD3FC"
                          strokeWidth="1"
                          strokeOpacity="0.7"
                        />
                        {/* Cam Yansıma Prizması */}
                        <polygon
                          points={`${panelX + 8},100 ${panelX + 52},100 ${panelX + 26},388 ${panelX + 8},388`}
                          fill="#E0F2FE"
                          opacity="0.1"
                        />
                        <polygon
                          points={`${panelX + 88},112 ${panelX + 98},112 ${panelX + 70},388 ${panelX + 62},388`}
                          fill="#FFFFFF"
                          opacity="0.05"
                        />
                        {/* Alt ve Üst Kanat Fitili */}
                        <rect x={panelX + 3} y="97" width="142" height="4" fill="#0B1560" opacity="0.75" />
                        <rect x={panelX + 3} y="387" width="142" height="4" fill="#0B1560" opacity="0.8" />
                      </g>
                    );
                  })}

                  {/* Dikey Profil Birleşimleri */}
                  {[244, 396, 548].map((mullionX) => (
                    <rect
                      key={mullionX}
                      x={mullionX}
                      y="94"
                      width="4"
                      height="300"
                      fill="#0F172A"
                      stroke="#64748B"
                      strokeWidth="0.7"
                    />
                  ))}

                  {/* İspanyolet Kilit Kolu */}
                  <rect x="625" y="214" width="6" height="52" rx="2" fill="#D91B24" />
                  <circle cx="628" cy="210" r="5" fill="#D91B24" stroke="#FCA5A5" strokeWidth="1" />

                  {/* Balkon Mermer Zemin */}
                  <path d="M62 424 H738 L704 482 H96 Z" fill="url(#hsMarble)" opacity="0.94" />
                  <path d="M108 438 H690 M128 456 H664 M158 472 H632" stroke="#A8A090" strokeWidth="0.8" opacity="0.32" />
                  <path d="M170 430 C 244 448, 310 438, 380 470" stroke="#B9B0A0" strokeWidth="0.7" fill="none" opacity="0.3" />
                  <path d="M470 432 C 540 446, 598 438, 664 466" stroke="#B9B0A0" strokeWidth="0.7" fill="none" opacity="0.3" />

                  {/* Saksı ve Bitkiler */}
                  <g>
                    <path d="M112 424 L150 424 L144 470 L118 470 Z" fill="#1E293B" stroke="#475569" strokeWidth="1" />
                    <path d="M131 424 C 120 404, 118 392, 128 382 C 134 396, 134 408, 131 424" fill="#047857" opacity="0.85" />
                    <path d="M133 424 C 142 398, 152 392, 160 390 C 154 404, 145 414, 137 424" fill="#10B981" opacity="0.75" />
                    <path d="M130 424 C 126 402, 132 388, 142 378 C 141 394, 136 410, 134 424" fill="#34D399" opacity="0.65" />
                  </g>
                  <g>
                    <path d="M646 424 L684 424 L678 470 L652 470 Z" fill="#1E293B" stroke="#475569" strokeWidth="1" />
                    <path d="M665 424 C 654 404, 652 392, 662 382 C 668 396, 668 408, 665 424" fill="#047857" opacity="0.85" />
                    <path d="M667 424 C 676 398, 686 392, 694 390 C 688 404, 679 414, 671 424" fill="#10B981" opacity="0.75" />
                  </g>

                  {/* Ölçü ve Teknik Çizim Çizgileri */}
                  <line x1="80" y1="46" x2="720" y2="46" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.55" />
                  <line x1="80" y1="40" x2="80" y2="52" stroke="#38BDF8" strokeWidth="1" opacity="0.7" />
                  <line x1="720" y1="40" x2="720" y2="52" stroke="#38BDF8" strokeWidth="1" opacity="0.7" />
                  <text x="350" y="37" fill="#7DD3FC" fontSize="10" fontFamily="monospace" letterSpacing="1">
                    6.400 mm
                  </text>
                  <line x1="46" y1="96" x2="46" y2="394" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.5" />
                  <line x1="40" y1="96" x2="52" y2="96" stroke="#38BDF8" strokeWidth="1" opacity="0.65" />
                  <line x1="40" y1="394" x2="52" y2="394" stroke="#38BDF8" strokeWidth="1" opacity="0.65" />
                  <text
                    x="36"
                    y="245"
                    fill="#7DD3FC"
                    fontSize="10"
                    fontFamily="monospace"
                    letterSpacing="1"
                    transform="rotate(-90 36 245)"
                    textAnchor="middle"
                  >
                    2.960 mm
                  </text>
                  <text x="88" y="63" fill="#93C5FD" fontSize="7.5" fontFamily="monospace" letterSpacing="0.8">
                    T66 ALÜMİNYUM ÜST RAY
                  </text>
                  <text x="88" y="440" fill="#CBD5E1" fontSize="7.5" fontFamily="monospace" letterSpacing="0.6">
                    GİZLİ SU TAHLİYE KANALI
                  </text>

                  {/* Kırmızı Mimari Köşe Braketleri */}
                  <path d="M18 50 V28 H40" fill="none" stroke="#D91B24" strokeWidth="2" />
                  <path d="M760 450 V472 H738" fill="none" stroke="#D91B24" strokeWidth="2" />
                </svg>

                {/* 5 Pulsing `#D91B24` Kırmızı `+` Hotspot Pinleri */}
                {HOTSPOT_PINS.map((pin) => {
                  const isActive = selectedPin.id === pin.id;
                  return (
                    <button
                      key={pin.id}
                      type="button"
                      onMouseEnter={() => setSelectedPin(pin)}
                      onClick={() => setSelectedPin(pin)}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      aria-label={pin.label}
                      aria-pressed={isActive}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    >
                      <span
                        className={`absolute -inset-2 animate-ping rounded-full bg-[#D91B24] ${
                          isActive ? 'opacity-80' : 'opacity-40'
                        }`}
                      />
                      <span
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-black text-white shadow-lg transition-transform duration-200 ${
                          isActive
                            ? 'scale-125 bg-[#D91B24]'
                            : 'bg-[#0B1560] group-hover:scale-110 group-hover:bg-[#D91B24]'
                        }`}
                      >
                        +
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Alt Hızlı Pin Seçici Etiketler */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {HOTSPOT_PINS.map((pin) => (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setSelectedPin(pin)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                      selectedPin.id === pin.id
                        ? 'bg-[#D91B24] text-white'
                        : 'bg-white/10 text-white/75 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    + {pin.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sağ: Yüzen Glassmorphism Detay Kartı (Mini CAD Kesit İkonlu) */}
            <div className="lg:col-span-5">
              <div
                key={selectedPin.id}
                className="animate-fade-up relative overflow-hidden rounded-2xl border border-[#0B1560]/15 bg-white/95 p-6 shadow-2xl backdrop-blur-md"
              >
                <span className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-[#D91B24]" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#0B1560]/40" />

                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-[#0B1560] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                    {selectedPin.label}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-slate-400">
                    {selectedPin.cadCode}
                  </span>
                </div>

                {/* Mini Vektörel CAD Kesit İkonu + Başlık */}
                <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1560] text-white">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeOpacity="0.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#D91B24]">
                      {selectedPin.specBadge}
                    </div>
                    <h3 className="mt-0.5 text-base font-black leading-snug text-[#0B1560]">
                      {selectedPin.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3.5 text-xs leading-relaxed text-slate-600">
                  {selectedPin.detail}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Noktaların üzerine tıklayarak inceleyin
                  </span>
                  <Link
                    href="/urunler/vera-isicamli-cam-balkon"
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-[#D91B24] hover:underline"
                  >
                    <span>Seriyi İncele</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            MODÜL 2: CANLI SES YALITIMI DENEYİMİ (-38 dB AKUSTİK OSİLOSKOP)
           ===================================================================== */}
        {activeModule === 'acoustic' && (
          <div
            role="tabpanel"
            id="showcase-panel-acoustic"
            aria-labelledby="showcase-tab-acoustic"
            tabIndex={0}
            className="animate-fade-up mt-8 rounded-2xl border border-[#0B1560]/15 bg-white p-6 shadow-sm focus:outline-none sm:p-8"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              {/* Sol: Açık / Kapalı Kontrolü ve Desibel Göstergesi */}
              <div className="space-y-4 lg:col-span-5">
                <span className="inline-block rounded-full bg-[#0B1560]/10 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-[#0B1560]">
                  EN ISO 140-3 AKUSTİK TEST SİMÜLASYONU
                </span>
                <h3 className="text-2xl font-black text-[#0B1560]">
                  Canlı Ses Yalıtımı Deneyimi
                </h3>

                {/* 2 Modlu Kaydırıcı / Buton Çubuğu */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setIsWindowClosed(false)}
                    aria-pressed={!isWindowClosed}
                    className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                      !isWindowClosed
                        ? 'border-[#D91B24] bg-rose-50/80 shadow-xs'
                        : 'border-slate-200 bg-slate-50 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <span className="text-base">🔓</span>
                    <span className="mt-1 text-xs font-black text-[#D91B24]">
                      Cam Balkon Açık
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">
                      74 dB Dış Gürültü
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsWindowClosed(true)}
                    aria-pressed={isWindowClosed}
                    className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                      isWindowClosed
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                        : 'border-slate-200 bg-slate-50 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <span className="text-base">🔒</span>
                    <span className="mt-1 text-xs font-black text-[#0B1560]">
                      Çelikpen Isıcamlı Kapalı
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      34 dB Huzurlu İç Mekan
                    </span>
                  </button>
                </div>

                {/* Canlı Desibel Fark Rozeti */}
                <div className="flex items-center justify-between rounded-xl bg-[#0B1560] px-4 py-3 text-white">
                  <span className="text-xs font-bold">Akustik Gürültü Blokajı:</span>
                  <span className="rounded-md bg-[#D91B24] px-2.5 py-1 text-xs font-black">
                    {isWindowClosed ? '34 dB Sessizlik Modu (%85 Yalıtım)' : '74 dB Cadde & Rüzgar Sesi'}
                  </span>
                </div>
              </div>

              {/* Sağ: Canlı SVG Ses Dalgası Osiloskop + Cam Kanat Kapanma Animasyonu */}
              <div className="relative overflow-hidden rounded-2xl bg-[#070E1E] p-6 text-white lg:col-span-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                  <span className="font-bold text-sky-300">
                    {isWindowClosed
                      ? '🔒 4+20+4 Argonlu Isıcam + Çift EPDM Conta Aktif'
                      : '🔓 Cam Kanatlar Açık — Dış Ortam Gürültüsü'}
                  </span>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-black ${
                      isWindowClosed
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-[#D91B24] text-white'
                    }`}
                  >
                    {isWindowClosed ? '34 dB' : '74 dB'}
                  </span>
                </div>

                {/* Cam Kanat Kapanma Animasyonu — Açıkken ses dalgası, kapalıyken sızdırmaz cam cephe */}
                <div className="relative mt-4 h-24 overflow-hidden rounded-xl border border-white/10 bg-[#0B1560]/70">
                  {/* Dış Ortam Gürültüsü (Yalnızca camlar açıkken görünür) */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isWindowClosed ? 'opacity-15' : 'opacity-100'
                    }`}
                  >
                    <svg viewBox="0 0 600 96" preserveAspectRatio="none" className="h-full w-full">
                      {Array.from({ length: 34 }).map((_, idx) => {
                        const noiseHeight = 12 + ((idx * 23) % 58);
                        return (
                          <rect
                            key={idx}
                            x={10 + idx * 17.5}
                            y={48 - noiseHeight / 2}
                            width="6"
                            height={noiseHeight}
                            rx="3"
                            fill="#D91B24"
                            opacity="0.55"
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#070E1E] to-transparent" />
                  </div>

                  {/* 4 Temperli Cam Kanat: Kapalıyken cepheyi kapatır, açıkken sol tarafa toplanır */}
                  <div className="absolute inset-x-2 inset-y-2 flex gap-[2px]" aria-hidden="true">
                    {[0, 1, 2, 3].map((panel) => (
                      <div
                        key={panel}
                        className="relative h-full flex-1 overflow-hidden rounded-sm border border-sky-200/40 bg-gradient-to-br from-sky-200/25 via-emerald-100/10 to-[#0B1560]/30 backdrop-blur-[1px] transition-all duration-700 ease-out"
                        style={{
                          transformOrigin: 'left center',
                          transform: isWindowClosed
                            ? 'translateX(0) scaleX(1)'
                            : `translateX(-${panel * 100}%) scaleX(0.45)`,
                          opacity: isWindowClosed ? 1 : 0.28,
                        }}
                      >
                        <span className="absolute inset-y-0 left-1/3 w-1/4 skew-x-[-14deg] bg-white/20" />
                        <span className="absolute inset-x-0 bottom-0 h-1.5 bg-[#0B1560]/70" />
                      </div>
                    ))}
                  </div>

                  {/* Üst Kasa ve Alt Ray */}
                  <div className="absolute inset-x-2 top-1.5 h-1 rounded-full bg-slate-400/50" />
                  <div className="absolute inset-x-2 bottom-1.5 h-1 rounded-full bg-slate-500/60" />

                  <span
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider transition-colors duration-300 ${
                      isWindowClosed
                        ? 'bg-emerald-500/90 text-[#052E1B]'
                        : 'bg-[#D91B24] text-white'
                    }`}
                  >
                    {isWindowClosed ? 'Cam Cephe Kapalı • 34 dB' : 'Cam Cephe Açık • 74 dB'}
                  </span>
                </div>

                {/* Animasyonlu SVG Osiloskop Barları */}
                <div className="my-5 flex h-36 items-center justify-center">
                  <svg
                    viewBox="0 0 600 120"
                    className="h-full w-full"
                    role="img"
                    aria-label={
                      isWindowClosed
                        ? '34 desibel sessizlik modu, ses dalgası sönümlendi'
                        : '74 desibel cadde ve rüzgar gürültüsü, ses dalgası yüksek'
                    }
                  >
                    {Array.from({ length: 28 }).map((_, idx) => {
                      const x = 14 + idx * 21;
                      const openHeight = 28 + ((idx * 19) % 76);
                      const closedHeight = 6 + (idx % 3) * 4;
                      const barHeight = isWindowClosed ? closedHeight : openHeight;
                      const y = 60 - barHeight / 2;
                      return (
                        <rect
                          key={idx}
                          x={x}
                          y={y}
                          width="10"
                          height={barHeight}
                          rx="5"
                          fill={isWindowClosed ? '#10B981' : '#D91B24'}
                          className={`acoustic-wave-bar transition-all duration-500 ease-out ${
                            isWindowClosed ? '' : 'acoustic-wave-bar--active'
                          }`}
                          style={{ animationDelay: `${idx * 34}ms` }}
                        />
                      );
                    })}
                    {/* Merkez Referans Çizgisi */}
                    <line
                      x1="0"
                      y1="60"
                      x2="600"
                      y2="60"
                      stroke={isWindowClosed ? '#38BDF8' : '#F87171'}
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                  </svg>
                </div>

                <div className="mb-3 flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10.5px]">
                  <span className="font-bold text-slate-200">
                    {isWindowClosed
                      ? '4+20+4 Argonlu Isıcam + Çift EPDM Conta'
                      : 'Cam Kanatlar Açık — Dış Ortam Gürültüsü'}
                  </span>
                  <span
                    aria-live="polite"
                    className={`rounded-full px-2.5 py-0.5 font-black tabular-nums ${
                      isWindowClosed
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-[#D91B24]/20 text-rose-300'
                    }`}
                  >
                    {isWindowClosed ? '34 dB Sessizlik Modu — %85 Akustik Yalıtım' : '74 dB Cadde & Rüzgar Sesi'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px] text-slate-300">
                  <span>IFT Rosenheim Akustik Test Standardı</span>
                  <Link
                    href="/urunler/revotech-gold"
                    className="font-extrabold text-sky-300 hover:text-white"
                  >
                    Akustik Serileri İncele →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            MODÜL 3: MİNİMALİST "3 TIKLA SİSTEM BULUCU" GÖRSEL SİHİRBAZ
           ===================================================================== */}
        {activeModule === 'wizard' && (
          <div
            role="tabpanel"
            id="showcase-panel-wizard"
            aria-labelledby="showcase-tab-wizard"
            tabIndex={0}
            className="animate-fade-up mt-8 grid grid-cols-1 gap-6 focus:outline-none lg:grid-cols-12 lg:items-center"
          >
            {/* Sol: 2 Hızlı Seçim Adımı + 3. Tıkla İncele */}
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs lg:col-span-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D91B24]">
                  ADIM 1 • UYGULAMA MEKANI SEÇİN
                </span>
                <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'balkon' as SpaceType, icon: '🏢', label: 'Ev Balkonu' },
                    { id: 'teras' as SpaceType, icon: '🌤️', label: 'Teras & Çatı' },
                    { id: 'bahce' as SpaceType, icon: '🌿', label: 'Bahçe & Kafe' },
                  ].map((sp) => {
                    const active = wizardSpace === sp.id;
                    return (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => setWizardSpace(sp.id)}
                        aria-pressed={active}
                        className={`flex flex-col items-center rounded-xl border p-3 text-center transition-all ${
                          active
                            ? 'border-[#D91B24] bg-[#0B1560] text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-[#0B1560] hover:border-[#0B1560]'
                        }`}
                      >
                        <span className="text-lg">{sp.icon}</span>
                        <span className="mt-1 text-xs font-bold">{sp.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D91B24]">
                  ADIM 2 • ÖNCELİKLİ BEKLENTİNİZ
                </span>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[
                    {
                      id: 'yalitim' as PriorityType,
                      icon: '🔥',
                      label: 'Maksimum Isı & Ses Yalıtımı',
                    },
                    {
                      id: 'panoramik' as PriorityType,
                      icon: '🌅',
                      label: 'Tam Açılır Panoramik Manzara',
                    },
                    {
                      id: 'otomasyon' as PriorityType,
                      icon: '🎛️',
                      label: 'Kumandalı Otomasyon',
                    },
                  ].map((pr) => {
                    const active = wizardPriority === pr.id;
                    return (
                      <button
                        key={pr.id}
                        type="button"
                        onClick={() => setWizardPriority(pr.id)}
                        aria-pressed={active}
                        className={`flex flex-col items-center rounded-xl border p-3 text-center transition-all ${
                          active
                            ? 'border-[#D91B24] bg-[#0B1560] text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-[#0B1560] hover:border-[#0B1560]'
                        }`}
                      >
                        <span className="text-lg">{pr.icon}</span>
                        <span className="mt-1 text-[11.5px] font-bold leading-snug">
                          {pr.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sağ: Eşleşen İdeal Sistem Kartı */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-[#0B1560]/20 bg-white p-5 shadow-md">
                <span className="pointer-events-none absolute top-3 left-3 z-20 h-4 w-4 border-t-2 border-l-2 border-[#D91B24]" />
                <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-4 w-4 border-b-2 border-r-2 border-[#D91B24]" />

                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={matchedSystem.image}
                    alt={matchedSystem.name}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1560]/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-md bg-[#D91B24] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                    ÖNERİLEN SİSTEM • {matchedSystem.code}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#D91B24]">
                    {matchedSystem.category}
                  </span>
                  <h3 className="mt-0.5 text-lg font-black text-[#0B1560]">
                    {matchedSystem.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {matchedSystem.badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-[#0B1560]"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-3">
                    <Link
                      href={matchedSystem.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#D91B24] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-xs transition hover:bg-[#B31219]"
                    >
                      <span>Sistemi İncele</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            MODÜL 4: CANLI PROFİL & CAM RENGİ STÜDYOSU (LIVE MATERIAL STUDIO)
           ===================================================================== */}
        {activeModule === 'studio' && (
          <div
            role="tabpanel"
            id="showcase-panel-studio"
            aria-labelledby="showcase-tab-studio"
            tabIndex={0}
            className="animate-fade-up mt-8 grid grid-cols-1 gap-6 focus:outline-none lg:grid-cols-12 lg:items-center"
          >
            {/* Sol: Dinamik Vektörel 3D Mimari Pencere & Cam Balkon Çerçevesi */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#0F172A] p-6 text-white shadow-lg lg:col-span-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-sky-300">
                  CANLI MİMARİ MATERYAL ÖNİZLEME
                </span>
                <span className="rounded bg-white/10 px-2.5 py-0.5 text-[11px] font-bold">
                  {selectedProfile.name} + {selectedGlass.name}
                </span>
              </div>

              <div className="my-4 flex items-center justify-center rounded-xl bg-gradient-to-b from-sky-950/60 to-slate-950 p-6">
                <svg
                  viewBox="0 0 420 260"
                  className="h-56 w-full max-w-[380px] drop-shadow-2xl"
                  aria-label="Canlı Profil ve Cam Rengi Simülatörü"
                >
                  {/* Dış Kasa Çerçevesi (Seçilen Profil Rengi) */}
                  <rect
                    x="20"
                    y="16"
                    width="380"
                    height="228"
                    rx="6"
                    fill={selectedProfile.frameColor}
                    stroke={selectedProfile.frameStroke}
                    strokeWidth="4"
                    className="transition-colors duration-300"
                  />
                  {/* İç Kasa Pah Çizgisi */}
                  <rect
                    x="34"
                    y="30"
                    width="352"
                    height="200"
                    rx="3"
                    fill={selectedProfile.accentColor}
                    stroke={selectedProfile.frameStroke}
                    strokeWidth="2"
                    className="transition-colors duration-300"
                  />

                  {/* 3 Panoramik Cam Kanat */}
                  {[0, 1, 2].map((panelIdx) => {
                    const px = 44 + panelIdx * 112;
                    return (
                      <g key={panelIdx}>
                        {/* Kanat Profil Çerçevesi */}
                        <rect
                          x={px}
                          y="40"
                          width="108"
                          height="180"
                          fill={selectedProfile.frameColor}
                          stroke={selectedProfile.frameStroke}
                          strokeWidth="2"
                        />
                        {/* Şişecam Temperli Cam Yüzeyi */}
                        <rect
                          x={px + 8}
                          y="48"
                          width="92"
                          height="164"
                          fill={selectedGlass.fill}
                          fillOpacity={selectedGlass.opacity}
                          stroke={selectedGlass.reflectionColor}
                          strokeWidth="1"
                          strokeOpacity="0.45"
                          className="transition-all duration-300"
                        />
                        {/* Cam Diyagonal Yansıma Efekti */}
                        <polygon
                          points={`${px + 14},54 ${px + 46},54 ${px + 22},204 ${px + 14},204`}
                          fill={selectedGlass.reflectionColor}
                          fillOpacity="0.18"
                        />
                      </g>
                    );
                  })}

                  {/* Sağ Kanat İspanyolet Kolu */}
                  <rect
                    x="368"
                    y="118"
                    width="6"
                    height="28"
                    rx="2"
                    fill="#D91B24"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-300">
                <span>Profil: {selectedProfile.code}</span>
                <span>Cam: {selectedGlass.spec}</span>
              </div>
            </div>

            {/* Sağ: Yuvarlak Materyal ve Cam Tonu Seçiciler */}
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs lg:col-span-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D91B24]">
                  1. PROFİL RENGİ SEÇİN (COOL COLORS &amp; RAL)
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {PROFILE_FINISHES.map((pf) => {
                    const active = selectedProfile.id === pf.id;
                    const checkColor =
                      pf.id === 'krem-beyaz' || pf.id === 'altin-mese' ? '#0B1560' : '#FFFFFF';
                    return (
                      <button
                        key={pf.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedProfile(pf)}
                        className={`group flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all ${
                          active
                            ? 'border-[#D91B24] bg-[#0B1560]/5 shadow-xs'
                            : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-inner transition-transform duration-200 group-hover:scale-105 ${
                            active
                              ? 'border-[#D91B24] ring-2 ring-[#D91B24]/20'
                              : 'border-white'
                          }`}
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${pf.frameColor} 0%, ${pf.frameStroke} 100%)`,
                          }}
                        >
                          {active && (
                            <span
                              aria-hidden="true"
                              className="text-xs font-black"
                              style={{ color: checkColor }}
                            >
                              ✓
                            </span>
                          )}
                        </span>
                        <span className="text-center text-[10.5px] font-bold leading-tight text-[#0B1560]">
                          {pf.name}
                          <span className="mt-0.5 block font-mono text-[8.5px] font-semibold text-slate-400">
                            {pf.code}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B1560]">
                  2. ŞİŞECAM TEMPERLİ CAM TONU SEÇİN
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {GLASS_TINTS.map((gt) => {
                    const active = selectedGlass.id === gt.id;
                    return (
                      <button
                        key={gt.id}
                        type="button"
                        onClick={() => setSelectedGlass(gt)}
                        aria-pressed={active}
                        className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                          active
                            ? 'border-[#D91B24] bg-[#0B1560] text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-[#0B1560]'
                        }`}
                      >
                        <span
                          className="h-6 w-6 shrink-0 rounded-full border border-slate-300"
                          style={{
                            backgroundColor: gt.fill,
                            opacity: Math.max(0.55, gt.opacity),
                          }}
                        />
                        <div>
                          <div className="text-xs font-bold">{gt.name}</div>
                          <div
                            className={`text-[10px] ${
                              active ? 'text-sky-200' : 'text-slate-500'
                            }`}
                          >
                            {gt.spec}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            MODÜL 5: "CAD MİMARİ ÇİZİMDEN GERÇEĞE" (BLUEPRINT-TO-REALITY LENS)
           ===================================================================== */}
        {activeModule === 'blueprint' && (
          <div
            role="tabpanel"
            id="showcase-panel-blueprint"
            aria-labelledby="showcase-tab-blueprint"
            tabIndex={0}
            className="animate-fade-up mt-8 rounded-2xl border border-[#0B1560]/15 bg-white p-6 shadow-2xs focus:outline-none"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D91B24]">
                  1:1 CAD KESİT &amp; GERÇEK UYGULAMA KARŞILAŞTIRMASI
                </span>
                <h3 className="text-lg font-black text-[#0B1560]">
                  Fareyi Görsel Üzerinde Gezdirerek CAD Çizimden Gerçeğe Geçiş Yapın
                </h3>
              </div>
              <input
                type="range"
                min={5}
                max={95}
                value={lensPercent}
                onChange={(e) => setLensPercent(Number(e.target.value))}
                aria-label="CAD Çizim ve Gerçek Görsel Geçiş Oranı"
                className="w-44 accent-[#D91B24]"
              />
            </div>

            <div
              ref={lensContainerRef}
              onPointerDown={handleLensPointerDown}
              onPointerMove={handleLensPointerMove}
              onPointerUp={handleLensPointerUp}
              onPointerCancel={handleLensPointerUp}
              className={`relative aspect-[16/8] max-h-[420px] w-full touch-pan-y overflow-hidden rounded-2xl border border-slate-200 bg-[#071126] select-none ${
                isLensDragging ? 'cursor-grabbing' : 'cursor-ew-resize'
              }`}
            >
              {/* Katman 1 (Sağ Taraf): Fotogerçekçi Mimari Render */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/kocasinan-isicamli-cam-balkon-hero.jpg"
                alt="Gerçek Mimari Uygulama"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-3 right-3 rounded-md bg-slate-950/80 px-3 py-1 text-[11px] font-extrabold text-white backdrop-blur-xs">
                GERÇEK MİMARİ UYGULAMA
              </span>

              {/* Katman 2 (Sol Taraf): 1:1 CAD Blueprint Teknik Wireframe */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden bg-[#081638]"
                style={{ width: `${lensPercent}%` }}
              >
                <svg
                  viewBox="0 0 900 450"
                  preserveAspectRatio="xMidYMid slice"
                  className="h-full w-full"
                  aria-label="1:1 CAD Mimari Teknik Çizim"
                >
                  <defs>
                    <pattern id="cadGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path
                        d="M 30 0 L 0 0 0 30"
                        fill="none"
                        stroke="#1E3A8A"
                        strokeWidth="0.8"
                      />
                    </pattern>
                  </defs>
                  <rect width="900" height="450" fill="url(#cadGrid)" />

                  {/* CAD Mimari Cephe & Profil Kesit Çizgileri */}
                  <rect x="70" y="55" width="760" height="340" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                  <rect x="90" y="75" width="720" height="300" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
                  <line x1="270" y1="75" x2="270" y2="375" stroke="#38BDF8" strokeWidth="2" />
                  <line x1="450" y1="75" x2="450" y2="375" stroke="#38BDF8" strokeWidth="2" />
                  <line x1="630" y1="75" x2="630" y2="375" stroke="#38BDF8" strokeWidth="2" />

                  {/* Diyagonal Açılım Aksları */}
                  <polyline points="90,75 270,225 90,375" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="6 4" />
                  <polyline points="810,75 630,225 810,375" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="6 4" />

                  {/* CAD Ölçülendirme Yazıları */}
                  <text x="95" y="42" fill="#7DD3FC" fontSize="13" fontFamily="monospace" fontWeight="bold">
                    CAD SCALE 1:1 • REVOTECH GOLD 84MM &amp; VBS 4+20+4 ISICAM KESİTİ
                  </text>
                  <text x="135" y="230" fill="#BAE6FD" fontSize="12" fontFamily="monospace">
                    Uw = 0.79 W/m²K
                  </text>
                  <text x="485" y="230" fill="#BAE6FD" fontSize="12" fontFamily="monospace">
                    Rw = -45 dB
                  </text>
                </svg>

                <span className="absolute bottom-3 left-3 rounded-md bg-[#0B1560] px-3 py-1 font-mono text-[11px] font-bold text-sky-300">
                  📐 1:1 CAD TEKNİK KESİT
                </span>
              </div>

              {/* Dikey Kırmızı Ayırıcı Lens Çizgisi */}
              <div
                className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-[#D91B24] shadow-[0_0_12px_#D91B24]"
                style={{ left: `${lensPercent}%` }}
              >
                <span className="absolute top-1/2 -left-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#D91B24] text-xs font-black text-white shadow-lg">
                  ↔
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
