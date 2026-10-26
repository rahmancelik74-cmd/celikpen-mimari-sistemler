import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../components/SeoJsonLd';

const PAGE_TITLE =
  'Hizmetlerimiz — Cam Balkon, Kış Bahçesi, Giyotin, Pergola ve PVC Doğrama Uygulamaları';
const PAGE_DESCRIPTION =
  'İstanbul Bahçelievler merkezli Çelikpen mimari cam ve PVC uygulama hizmetleri: Katlanır cam balkon, 4+20+4 ısıcamlı cam balkon, eşiksiz sürme, motorlu giyotin, kış bahçesi, bioklimatik pergola, Winsa PVC pencere ve panjur sistemleri.';

export const metadata: Metadata = generatePageMetadata({
  title: `${PAGE_TITLE} | ${SITE_CONFIG.brandName}`,
  description: PAGE_DESCRIPTION,
  path: '/hizmetlerimiz',
  keywords: [
    'cam balkon hizmetleri',
    'ısıcamlı cam balkon uygulaması',
    'kış bahçesi sistemleri',
    'motorlu giyotin cam',
    'bioklimatik pergola',
    'Winsa PVC pencere montajı',
    'panjur ve kedi sinekliği',
    'Bahçelievler cam balkon',
  ],
  image: '/images/services/isicamli-cam-balkon.jpg',
  imageAlt: 'Çelikpen mimari cam balkon, kış bahçesi ve PVC doğrama hizmetleri',
});

interface ArchitecturalServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  warrantyBadge: string;
  specBadge: string;
  advantages: string[];
  usageAreas: string[];
  productHref: string;
  calculatorHref: string;
}

const ARCHITECTURAL_SERVICES: ArchitecturalServiceItem[] = [
  {
    id: 'katlanir-cam-balkon',
    slug: 'katlanir-cam-balkon-sistemleri',
    number: '01',
    title: 'Katlanır Cam Balkon Sistemleri',
    subtitle: '8mm / 10mm Temperli & Maksimum Panoramik Açıklık',
    description:
      'Kanatların tamamı tek bir köşede toplanarak balkonunuzu yazın %100 açık bir terasa, kışın ise rüzgar, yağmur, toz ve gürültüden arındırılmış ferah bir yaşam alanına dönüştürür.',
    image: '/images/services/katlanir-cam-balkon.jpg',
    warrantyBadge: '10 Yıl Sistem Garantisi',
    specBadge: '8 mm / 10 mm TSE Temperli',
    advantages: [
      'Şişecam 8 mm ve 10 mm TSE EN 12150 temperli güvenlik camı',
      'Kanat başına 8 bilyalı AISI 304 paslanmaz çelik rulman mekanizması',
      'Sararma yapmayan alüminyum mıknatıslı fitil ve çift sıra EPDM conta',
      'L ve U tipi köşe balkonlarda direksiz 90° ve 135° kesintisiz dönüş',
    ],
    usageAreas: ['Konut Balkonları', 'Köşe L & U Balkonlar', 'Teras Kapatmaları'],
    productHref: '/urunler/vera-katlanir-cam-balkon',
    calculatorHref: '/fiyat-hesapla?seri=vns_10mm',
  },
  {
    id: 'isicamli-cam-balkon',
    slug: 'isicamli-cam-balkon-sistemleri',
    number: '02',
    title: 'Isıcamlı Cam Balkon Sistemleri',
    subtitle: '4+20+4 Argon Gazlı Sinerji/Konfor Cam & Üstün Isı Yalıtımı',
    description:
      'Her iki yüzeyi temperli 28 mm (4+20+4) Argon gazlı Şişecam Sinerji ve Konfor Isıcam üniteleriyle standart tek camlı sistemlere göre 4 kat daha yüksek ısı yalıtımı ve -38 dB akustik konfor sağlar.',
    image: '/images/services/isicamli-cam-balkon.jpg',
    warrantyBadge: '10 Yıl Yalıtım Garantisi',
    specBadge: 'Uw: 1.1 W/m²K • 4+20+4 Argonlu',
    advantages: [
      '28 mm (4+20+4) Argon gaz dolgulu, çift tarafı temperli Low-E Isıcam',
      'Isı kaybında %72 tasarruf ve dış ortam gürültüsünde -38 dB azalma',
      'Termal bariyerli kasa ve gizli yağmur suyu tahliye oluğu',
      'Çocuk emniyet kilidi, cam üstü plise perde ve kedi sinekliği uyumu',
    ],
    usageAreas: ['Dört Mevsim Yaşam Balkonları', 'Ana Cadde Cepheleri', 'Çalışma & Yemek Odası Balkonlar'],
    productHref: '/urunler/vera-isicamli-cam-balkon',
    calculatorHref: '/fiyat-hesapla?seri=vbs_isicam',
  },
  {
    id: 'surme-cam-balkon',
    slug: 'surme-cam-balkon-sistemleri',
    number: '03',
    title: 'Sürme (Sürgülü) Cam Balkon Sistemleri',
    subtitle: 'Eşiksiz ve Eşikli Raylı Sistemler',
    description:
      'İçe açılan kanat payını tamamen ortadan kaldıran paralel raylı sürme mimarisi; dar balkonlarda masa ve sandalye yerleşimini özgürleştirirken engelsiz alt eşiğiyle takılma riskini sıfırlar.',
    image: '/images/services/surme-cam-balkon.jpg',
    warrantyBadge: '10 Yıl Rulman & Profil Garantisi',
    specBadge: 'Eşiksiz / 3 & 5 Raylı',
    advantages: [
      'İçe kanat açılma payı sıfır; dar ve uzun balkonlarda %100 alan kazancı',
      '8 mm pahlı engelsiz alt ray veya yüksek yalıtımlı eşikli kasa opsiyonu',
      '8/10 mm temperli tek cam veya 4+12+4 ısıcamlı sürme kanat seçeneği',
      'Birbirini çeken kenetli alüminyum profillerle tek parmakla sessiz sürüş',
    ],
    usageAreas: ['Dar ve Uzun Balkonlar', 'Fransız Balkonlar', 'Kış Bahçesi & Teras Ara Bölmeleri'],
    productHref: '/urunler/panorama-esiksiz-surme-cam-balkon',
    calculatorHref: '/fiyat-hesapla?seri=vds_surme',
  },
  {
    id: 'giyotin-cam-sistemleri',
    slug: 'motorlu-giyotin-cam-sistemleri',
    number: '04',
    title: 'Motorlu Giyotin (Hareketli Küpeşte) Cam Sistemleri',
    subtitle: 'Uzaktan Kumandalı Dikey Açılım',
    description:
      'Somfy ve Becker tüp motor teknolojisiyle uzaktan kumanda üzerinden dikey eksende açılıp kapanan giyotin cam; açık konumda 110 cm güvenli cam korkuluk, kapalı konumda tam yalıtımlı cephe oluşturur.',
    image: '/images/services/giyotin-cam-sistemleri.jpg',
    warrantyBadge: '5 Yıl Motor + 10 Yıl Sistem Garantisi',
    specBadge: 'Somfy / Becker RTS Otomasyon',
    advantages: [
      'Uzaktan kumandalı, çelik zincir ve triger kayış tahrikli sessiz mekanizma',
      'Dış cepheye sarkmadan içeriden temizlik sağlayan "Silinebilir Kanat" sistemi',
      '4+16+4 Argonlu temperli Isıcam ve el sıkışma emniyetli baza profili',
      'Yağmur/rüzgar sensörü ve akıllı telefon (Wi-Fi) kontrol entegrasyonu',
    ],
    usageAreas: ['Çatı Dubleks Terasları', 'Kafe & Restoran Cepheleri', 'Bahçe Katı Verandalar'],
    productHref: '/urunler/giyotin-motorlu-silinebilir-cam',
    calculatorHref: '/fiyat-hesapla?seri=vgs_giyotin',
  },
  {
    id: 'kis-bahcesi-sistemleri',
    slug: 'kis-bahcesi-sistemleri',
    number: '05',
    title: 'Kış Bahçesi Sistemleri',
    subtitle: 'Dört Mevsim Yalıtımlı Cam Tavan & Cephe Sistemleri',
    description:
      'Teras, veranda ve bahçe katlarını 365 gün kullanılabilen aydınlık bir odaya dönüştüren lamine güvenlikli ısıcam tavan, gizli dere oluğu ve ısıcamlı katlanır/sürme cephe kombinasyonu.',
    image: '/images/services/kis-bahcesi-sistemleri.jpg',
    warrantyBadge: '10 Yıl Sızdırmazlık Garantisi',
    specBadge: '4+16+(4+4 Lamine) Güvenlikli Cam Tavan',
    advantages: [
      '150 kg/m² kar yüküne ve dolu yağışına dayanıklı lamine + temperli ısıcam çatı',
      'Taşıyıcı çelik takviyeli alüminyum kolonlar içinden gizli yağmur suyu tahliyesi',
      'Güneş kontrol kaplamalı Şişecam Sinerji cam ile yazın sera etkisini önleme',
      'Isıcamlı katlanır, eşiksiz sürme veya motorlu giyotin cephelerle tam entegrasyon',
    ],
    usageAreas: ['Villa Bahçeleri', 'Çatı Terasları', 'Müstakil Verandalar & Ticari Mekanlar'],
    productHref: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    calculatorHref: '/fiyat-hesapla?seri=pergola',
  },
  {
    id: 'bioklimatik-pergola',
    slug: 'bioklimatik-pergola-tente-sistemleri',
    number: '06',
    title: 'Bioklimatik Pergola & Tente Sistemleri',
    subtitle: 'Motorlu Alüminyum Lamel Tavan',
    description:
      'Kendi ekseni etrafında 0°–135° dönerek doğal iklimlendirme sağlayan ve geriye doğru toplanarak gökyüzünü tamamen açan poliüretan dolgulu alüminyum lamel tavan sistemi.',
    image: '/images/services/bioklimatik-pergola.jpg',
    warrantyBadge: '10 Yıl Yapısal & Otomasyon Garantisi',
    specBadge: '0°–135° Hareketli Termal Lamel',
    advantages: [
      'Hem kendi ekseninde dönen (havalandırma) hem geriye toplanan alüminyum lameller',
      'EPDM contalı lamel kenetlenmesi ve 220 mm oluklu ana kirişle %100 su sızdırmazlık',
      'Dimmerli Samsung Günışığı / RGB LED aydınlatma ve ısıtıcı entegrasyonu',
      'Rüzgar ve yağmur sensörleriyle hava durumuna göre otomatik kapanma',
    ],
    usageAreas: ['Teras & Penthouse', 'Restoran & Otel Açık Alanları', 'Bahçe Oturma Alanları'],
    productHref: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    calculatorHref: '/fiyat-hesapla?seri=pergola',
  },
  {
    id: 'pvc-pencere-kapi',
    slug: 'pvc-pencere-kapi-montaj-yenileme',
    number: '07',
    title: 'PVC Pencere & Kapı Montaj / Yenileme Hizmetleri',
    subtitle: 'Lazer Ölçüm, Söküm ve Anahtar Teslim Uygulama',
    description:
      'Winsa Revotech Gold (84 mm 7 odacıklı), Dorado 76, Safir 76 ve Panorama HS 76 Kaldır-Sür sistemleriyle mevcut daire pencerelerinizi mermer ve duvar yapısına zarar vermeden yeniliyoruz.',
    image: '/images/services/pvc-pencere-kapi.jpg',
    warrantyBadge: '10 Yıl Winsa & İşçilik Garantisi',
    specBadge: 'Uw: 0.79 W/m²K • -46 dB Akustik',
    advantages: [
      'Winsa 76 mm ve 84 mm 7 odacıklı, 3 contalı A sınıfı et kalınlığında profiller',
      'Eski doğramaların hasarsız sökümü ve poliüretan köpük + EPDM bantlı montaj',
      'RC2 emniyetli mantar başlıklı çelik ispanyolet kilit ve akustik pencere kolları',
      'Antrasit Gri, Kumlu Antrasit, Altın Meşe ve Koyu Ceviz Cool Colors laminasyon',
    ],
    usageAreas: ['Daire Tadilat & Yenileme', 'Kentsel Dönüşüm Binaları', 'Teras Kaldır-Sür Kapılar'],
    productHref: '/urunler?kategori=pencere-ve-kapi-sistemleri',
    calculatorHref: '/fiyat-hesapla?seri=pvc_dograma',
  },
  {
    id: 'panjur-kepenk-sineklik',
    slug: 'panjur-kepenk-plise-sineklik-sistemleri',
    number: '08',
    title: 'Panjur, Kepenk ve Plise Sineklik Sistemleri',
    subtitle: 'Motorlu Monoblok Panjur & Kedi Tüllü Sineklik',
    description:
      'Güneş kontrolü, fırtına koruması ve hırsızlık emniyeti sağlayan Winsa Winstor monoblok panjur, motorlu alüminyum kepenk ve evcil hayvan yırtmalarına dayanıklı çelik telli kedi sinekliği çözümleri.',
    image: '/images/services/panjur-kepenk-sineklik.jpg',
    warrantyBadge: '5 Yıl Otomasyon & Tül Garantisi',
    specBadge: '+%28 Ek Isı Tasarrufu • Patiye Dayanıklı',
    advantages: [
      'Winsa Winstor EPS yalıtımlı monoblok kutu ve dıştan takma alüminyum panjur',
      'Somfy / Becker uzaktan kumandalı motor, zamanlayıcı ve akıllı ev uyumu',
      'Standart tüle göre 7 kat dayanıklı, yırtılmaz çelik/polyester Kedi Sinekliği',
      'Cam balkon kanatlarıyla birlikte katlanan güneşi %80 kesen içten Plise Perde',
    ],
    usageAreas: ['Giriş & Bahçe Kat Güvenliği', 'Evcil Hayvanlı Daireler', 'Yatak Odası Tam Karartma'],
    productHref: '/urunler/winstor-monoblok-panjur',
    calculatorHref: '/fiyat-hesapla',
  },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Ücretsiz Lazerli Keşif',
    description:
      'Uzman teknik ekibimiz adresinize gelir, lazer metre ile milimetrik ölçü alır ve cephe yönüne göre cam/profil numunelerini sunar.',
  },
  {
    step: '02',
    title: 'Mimari Projelendirme',
    description:
      'Seçilen sistem, rüzgar yükü statik hesabı, su tahliye detayı ve net m² bütçesi şeffaf sözleşme ile yazılı olarak onayınıza sunulur.',
  },
  {
    step: '03',
    title: 'Hassas Üretim',
    description:
      'Kocasinan Merkez üretim tesisimizde CNC kesim, TSE EN 12150 temperli/ısıcam hazırlığı ve kalite kontrol testleri tamamlanır.',
  },
  {
    step: '04',
    title: 'Garantili Uzman Montaj',
    description:
      'Taşeron kullanmadan kendi kadrolu montaj ekibimizle temiz kurulum yapılır ve 10 yıl geçerli sistem garanti belgesi teslim edilir.',
  },
];

export default function HizmetlerimizPage() {
  const webPageSchema = buildWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/hizmetlerimiz',
    type: 'CollectionPage',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetlerimiz', path: '/hizmetlerimiz' },
  ]);

  return (
    <main className="bg-[#F8FAFC] pb-20">
      <JsonLd data={webPageSchema} id="hizmetlerimiz-webpage-jsonld" />
      <JsonLd data={breadcrumbSchema} id="hizmetlerimiz-breadcrumb-jsonld" />

      {/* ============================ HERO BANNER ============================ */}
      <section className="relative overflow-hidden bg-[#0F172A] pt-10 pb-14 text-white sm:pt-14 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,197,253,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.15) 1px, transparent 1px)',
            backgroundSize: '58px 58px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#1E3A8A] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#D91B24]/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10.5px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Ana Sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-sky-200">Hizmetlerimiz</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24]" aria-hidden="true" />
                Çelikpen Mimari Uygulama Merkezi
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px]">
                Yaşam alanlarınıza değer katan{' '}
                <span className="text-sky-300">8 uzmanlık alanı.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[12.5px] leading-6 text-slate-300 sm:text-[13.5px]">
                Lazerli ücretsiz keşiften CNC üretime ve kadrolu uzman montaja kadar tüm cam balkon,
                kış bahçesi, giyotin, pergola ve Winsa PVC doğrama süreçlerini tek çatı altında,
                10 yıl garantiyle sunuyoruz.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '8', label: 'Uzman Hizmet' },
                { value: '30 Yıl', label: 'Saha Tecrübesi' },
                { value: '%100', label: 'Ücretsiz Keşif' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center backdrop-blur-sm"
                >
                  <div className="text-lg font-black text-white">{stat.value}</div>
                  <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ QUICK SERVICE ANCHOR BAR ============================ */}
      <div className="border-b border-slate-200 bg-white shadow-xs">
        <div className="container-shell flex items-center gap-2 overflow-x-auto py-3.5 no-scrollbar">
          {ARCHITECTURAL_SERVICES.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className=" shrink-0 rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-1.5 text-[11px] font-bold text-[#0F172A] transition hover:border-[#1E3A8A] hover:bg-[#EFF6FF] hover:text-[#1E3A8A]"
            >
              <span className="mr-1.5 text-[10px] font-extrabold text-[#1E3A8A]">
                {service.number}
              </span>
              {service.title.replace(' Sistemleri', '').replace(' Hizmetleri', '')}
            </a>
          ))}
        </div>
      </div>

      {/* ============================ 8 CORE ARCHITECTURAL SERVICES GRID ============================ */}
      <section className="container-shell pt-10 sm:pt-14" aria-label="Hizmetlerimiz Listesi">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {ARCHITECTURAL_SERVICES.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="group flex scroll-mt-32 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.4)] transition-all duration-300 hover:border-[#1E3A8A]/50 hover:shadow-[0_24px_50px_-28px_rgba(30,58,138,0.35)]"
            >
              {/* Service Real Photo Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={service.image}
                  alt={`${service.title} — Çelikpen uygulama fotoğrafı`}
                  width={700}
                  height={440}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/20 to-transparent" />

                <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A8A] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white shadow-md">
                    Hizmet {service.number}
                  </span>
                  <span className="rounded-full border border-white/25 bg-[#0F172A]/80 px-3 py-1 text-[10px] font-bold text-sky-200 backdrop-blur-md">
                    {service.warrantyBadge}
                  </span>
                </div>

                <div className="absolute inset-x-5 bottom-4">
                  <span className="inline-block rounded-md bg-white/95 px-2.5 py-0.5 text-[10px] font-extrabold text-[#1E3A8A]">
                    {service.specBadge}
                  </span>
                  <h2 className="mt-2 text-xl font-black leading-snug text-white sm:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-0.5 text-xs font-semibold text-sky-200">{service.subtitle}</p>
                </div>
              </div>

              {/* Service Content Body */}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[12.5px] leading-relaxed text-slate-600">
                  {service.description}
                </p>

                {/* Technical Advantages */}
                <div className="mt-5">
                  <h3 className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-[#1E3A8A]">
                    Teknik Avantajlar &amp; Standartlar
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {service.advantages.map((adv) => (
                      <li
                        key={adv}
                        className="flex items-start gap-2 text-[11.5px] font-medium leading-snug text-slate-700"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#1E3A8A]">
                          ✓
                        </span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Usage Areas */}
                <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-4">
                  <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Kullanım Alanları:
                  </span>
                  {service.usageAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-2">
                  <Link
                    href="/iletisim?form=kesif"
                    prefetch={true}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1E3A8A] px-4 py-3 text-xs font-bold text-white shadow-navy transition hover:bg-[#1D4ED8]"
                  >
                    Ücretsiz Keşif İste
                  </Link>
                  <Link
                    href={service.calculatorHref}
                    prefetch={true}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#1E3A8A] bg-[#EFF6FF] px-4 py-3 text-xs font-bold text-[#1E3A8A] transition hover:bg-[#DBEAFE]"
                  >
                    Fiyat Hesapla
                  </Link>
                  <Link
                    href={service.productHref}
                    prefetch={true}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs font-bold text-slate-700 transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
                    title={`${service.title} ürün detaylarını incele`}
                  >
                    Ürün Detayı →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================ 4-STEP WORKFLOW STRIP ============================ */}
      <section className="container-shell pt-16" aria-labelledby="hizmet-sureci-baslik">
        <div className="overflow-hidden rounded-2xl border border-[#BFDBFE] bg-white p-6 shadow-xs sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-[#1E3A8A]">
                Çelikpen 4 Adımlı Uygulama Standardı
              </span>
              <h2
                id="hizmet-sureci-baslik"
                className="mt-2 text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl"
              >
                1. Ücretsiz Lazerli Keşif → 2. Mimari Projelendirme → 3. Hassas Üretim → 4. Garantili Uzman Montaj
              </h2>
            </div>
            <Link
              href="/urunler"
              prefetch={true}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#1E3A8A]"
            >
              Tüm Ürün Kataloğunu İncele →
            </Link>
          </div>

          <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((item) => (
              <li
                key={item.step}
                className="relative flex flex-col justify-between rounded-xl border border-slate-200/90 bg-[#F8FAFC] p-5"
              >
                <div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E3A8A] text-xs font-black text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-sm font-extrabold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
