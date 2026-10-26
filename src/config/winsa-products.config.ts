import type { SystemSeriesId } from './pricing.config';

export type WinsaCategorySlug =
  | 'pencere-ve-kapi-sistemleri'
  | 'surme-sistemler'
  | 'cam-balkon-sistemleri'
  | 'panjur-ve-kepenk-sistemleri'
  | 'donanim-sistemleri'
  | 'renk-dunyasi';

export interface WinsaCategoryInfo {
  slug: WinsaCategorySlug;
  name: string;
  shortName: string;
  description: string;
  defaultImage: string;
  badge: string;
}

export interface WinsaProductTechnicalSpecs {
  profilGenisligi: string;
  odacikSayisi: string;
  contaYapisi: string;
  camKalinligi: string;
  isiYalitimiUw: string;
  sesYalitimiDb: string;
  suSizdirmazlik: string;
  ruzgarDirenci: string;
  standart: string;
}

export type ProductBrand = 'winsa' | 'albert-genau';

export interface WinsaProductItem {
  slug: string;
  code: string;
  name: string;
  cardTitle?: string;
  brand?: ProductBrand;
  featuredInBrandCatalog?: boolean;
  category: string;
  categorySlug: WinsaCategorySlug;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  defaultImage: string;
  crossSectionSvg: string;
  highlights: string[];
  usageAreas: string[];
  technicalSpecs: WinsaProductTechnicalSpecs;
  availableColors: string[];
  calculatorSeriesCode?: 'Vera-80' | 'Vera Termal-ISI' | 'Vera Slide-SUR' | 'GIY-MOT' | 'KIS-BIO';
  pricingSystemId?: SystemSeriesId;
}

export const WINSA_CATEGORIES: WinsaCategoryInfo[] = [
  {
    slug: 'pencere-ve-kapi-sistemleri',
    name: 'Pencere ve Kapı Sistemleri',
    shortName: 'Pencere & Kapı',
    description:
      '60 mm’den 84 mm profil genişliğine, 7 odacıklı ve 3 contalı pasif ev standartlarında maksimum ısı ve ses yalıtımlı PVC pencere ve kapı sistemleri.',
    defaultImage: '/images/products/bahcelievler-pvc-pencere-kapi-sistemleri.jpg?v=2',
    badge: 'TS EN 12608-1 Sınıf A',
  },
  {
    slug: 'surme-sistemler',
    name: 'Sürme Sistemler',
    shortName: 'Sürme Sistemler',
    description:
      'Geniş teras ve balkon açıklıklarında kesintisiz manzara sunan Kaldır-Sür (Hebeschiebe), yeni nesil akıllı Comfort Slide ve paralel sürme çözümleri.',
    defaultImage: '/images/products/bahcelievler-surme-kapi-sistemleri.jpg?v=2',
    badge: '300 kg Kanat Kapasitesi',
  },
  {
    slug: 'cam-balkon-sistemleri',
    name: 'Cam Balkon Sistemleri',
    shortName: 'Cam Balkon',
    description:
      '4+20+4 Argon gazlı Isıcamlı Vera Termal, 8-10 mm temperli katlanır, eşiksiz sürme, motorlu silinebilir giyotin ve bioklimatik kış bahçesi serileri.',
    defaultImage: '/images/products/bahcelievler-cam-balkon-sistemleri.jpg?v=2',
    badge: 'TSE EN 12150 Temperli',
  },
  {
    slug: 'panjur-ve-kepenk-sistemleri',
    name: 'Panjur ve Kepenk Sistemleri',
    shortName: 'Panjur & Kepenk',
    description:
      'Güneş kontrolü, fırtına güvenliği ve +%28 ek ısı yalıtımı sağlayan Winstor monoblok panjur ve Somfy/Becker motorlu poliüretanlı alüminyum kepenkler.',
    defaultImage: '/images/products/bahcelievler-panjur-kepenk-sistemleri.jpg?v=2',
    badge: 'Somfy / Becker Otomasyon',
  },
  {
    slug: 'donanim-sistemleri',
    name: 'Donanım ve Aksesuar Sistemleri',
    shortName: 'Donanım Sistemleri',
    description:
      'Winsa profilleriyle %100 entegre çalışan RC2 emniyetli ispanyolet kilitler, akustik pencere kolları, çocuk emniyet kilitleri ve 8 bilyalı paslanmaz rulmanlar.',
    defaultImage: '/images/products/bahcelievler-donanim-aksesuar.jpg?v=2',
    badge: '10 Yıl Sistem Garantisi',
  },
  {
    slug: 'renk-dunyasi',
    name: 'Renk Dünyası & Lamine Yüzeyler',
    shortName: 'Renk Dünyası',
    description:
      'Cool Colors teknolojili Antrasit Gri (RAL 7016), Kumlu Antrasit, Altın Meşe, Koyu Ceviz, Maun ve Metalik Gümüş UV dayanımlı dış cephe laminasyon kartelası.',
    defaultImage: '/images/products/bahcelievler-renk-dunyasi-lamine.jpg?v=2',
    badge: 'EN 513 Sınıf S UV Dayanım',
  },
];

const STANDARD_COLORS = [
  'Antrasit Gri (RAL 7016)',
  'Kumlu Antrasit',
  'Gece Siyahı (RAL 9005)',
  'Altın Meşe (Golden Oak)',
  'Koyu Ceviz & Fındık',
  'Maun & Venge',
  'Metalik Gümüş Gri',
  'Trafik Beyazı (RAL 9016) & Krem',
];

export const WINSA_PRODUCTS: WinsaProductItem[] = [
  // ============================================================================
  // 1. PENCERE VE KAPI SİSTEMLERİ (6 ÜRÜN)
  // ============================================================================
  {
    slug: 'revotech-gold',
    code: 'REVOTECH GOLD 84',
    name: 'Winsa Revotech Gold — 84 mm 7 Odacıklı 3 Contalı Premium Pencere Sistemi',
    cardTitle: 'Revotech Gold',
    brand: 'winsa',
    featuredInBrandCatalog: true,
    category: 'Pencere ve Kapı Sistemleri',
    categorySlug: 'pencere-ve-kapi-sistemleri',
    tagline: 'Pasif bina standartlarında Uw: 0.79 W/(m²K) ısı yalıtımı ve 3 kademeli orta conta teknolojisi.',
    shortDescription:
      '84 mm kasa/kanat genişliği, 7 odacıklı kesiti ve 3 contalı (orta conta) mimarisiyle en zorlu iklim ve gürültü koşullarında zirve yalıtım sunar.',
    fullDescription:
      'Winsa ürün ailesinin en üst segment yalıtım serisi olan Revotech Gold; 84 mm profil derinliği ve 7 odacıklı iç geometrisiyle ısı kayıplarını minimuma indirir. Üçüncü orta conta bariyeri sayesinde şiddetli lodos ve sağanak yağışta su sızdırmazlığını Sınıf 9A seviyesine taşırken, 52 mm’ye kadar üçlü (triple) Argon gazlı Konfor Isıcam uygulamasına olanak tanır.',
    defaultImage: '/images/brands/winsa/revotech-gold.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '84 mm profil genişliği ve 7 odacıklı simetrik kasa/kanat mimarisi',
      '3 kademeli TPE/EPDM orta conta sistemi ile üstün hava ve su sızdırmazlığı',
      '24 mm’den 52 mm’ye kadar çift ve üçlü (triple) Sinerji/Konfor Isıcam imkanı',
      'Şirinevler E-5, Basın Ekspres ve yüksek katlı rezidanslar için -46 dB akustik yalıtım',
    ],
    usageAreas: [
      'Yüksek katlı rezidanslar ve rüzgar yükü yüksek kuzey cepheler',
      'Ana cadde, otoyol ve havalimanı aksındaki yüksek gürültülü konutlar',
      'Maksimum doğalgaz ve klima tasarrufu hedefleyen kentsel dönüşüm projeleri',
    ],
    technicalSpecs: {
      profilGenisligi: '84 mm Kasa / 84 mm Kanat',
      odacikSayisi: '7 Odacıklı Kasa ve Kanat',
      contaYapisi: '3 Contalı (EPDM / TPE Orta Conta Bariyerli)',
      camKalinligi: '24 mm – 36 mm – 44 mm – 52 mm (Üçlü Cam)',
      isiYalitimiUw: 'Uw = 0.79 W/(m²K) / Uf = 0.92 W/(m²K)',
      sesYalitimiDb: '-46 dB (EN ISO 140-3 Sınıf 5)',
      suSizdirmazlik: 'Sınıf E900 / 9A (EN 12208)',
      ruzgarDirenci: 'Sınıf C5 / B5 (EN 12210 — 2000 Pa)',
      standart: 'TS EN 12608-1 Sınıf A • CE',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'revotech',
    code: 'REVOTECH 84',
    name: 'Winsa Revotech — 84 mm 7 Odacıklı Yüksek Performanslı Pencere ve Kapı Sistemi',
    category: 'Pencere ve Kapı Sistemleri',
    categorySlug: 'pencere-ve-kapi-sistemleri',
    tagline: '84 mm taban genişliği ve 7 odacıklı yapısıyla üstün statik mukavemet ve termal konfor.',
    shortDescription:
      '84 mm genişliğindeki 7 odacıklı profil yapısı ve çift sıra EPDM conta sistemi ile yüksek ısı ve ses izolasyonu sağlayan güçlü mimari seri.',
    fullDescription:
      'Revotech serisi, 84 mm kasa-kanat oturma genişliği ve 7 odacıklı iç tasarımıyla büyük ebatlı pencere ve balkon kapılarında esneme yapmayan yüksek statik direnç sunar. Kapalı kutu galvanizli destek sacı yapısı sayesinde yüksek katlarda rüzgar yüküne karşı tam güvenlik sağlar.',
    defaultImage: '/images/products/bahcelievler-revotech-pvc-pencere-cephe.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '84 mm 7 odacıklı profil kesiti ile düşük ısı iletim katsayısı (Uf: 1.0 W/m²K)',
      '2 mm kalınlığında galvanizli çelik destek sacı ile yüksek rüzgar mukavemeti',
      '52 mm’ye kadar üçlü ısıcam ve akustik lamine cam uygulanabilme',
      'Geniş su tahliye haznesi ve eğimli kasa yüzeyi ile sorunsuz deşarj',
    ],
    usageAreas: [
      'Kocasinan, Soğanlı ve Cumhuriyet mahallelerindeki yeni kentsel dönüşüm binaları',
      'Geniş açıklıklı salon pencereleri ve Fransız balkon kapıları',
      'Dubleks daireler ve müstakil konut projeleri',
    ],
    technicalSpecs: {
      profilGenisligi: '84 mm Kasa / 84 mm Kanat',
      odacikSayisi: '7 Odacıklı',
      contaYapisi: '2 Kademeli Çift Sıra EPDM Conta',
      camKalinligi: '24 mm – 36 mm – 44 mm – 52 mm',
      isiYalitimiUw: 'Uw = 0.86 W/(m²K) / Uf = 1.0 W/(m²K)',
      sesYalitimiDb: '-44 dB (EN ISO 140-3)',
      suSizdirmazlik: 'Sınıf 9A (EN 12208)',
      ruzgarDirenci: 'Sınıf C4 / B5 (EN 12210)',
      standart: 'TS EN 12608-1 • RAL Kalite Belgeli',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'dorado-76',
    code: 'DORADO 76',
    name: 'Winsa Dorado 76 — Minimalist Hatlı 76 mm 5 Odacıklı Mimari Pencere Sistemi',
    cardTitle: 'Dorado 76',
    brand: 'winsa',
    featuredInBrandCatalog: true,
    category: 'Pencere ve Kapı Sistemleri',
    categorySlug: 'pencere-ve-kapi-sistemleri',
    tagline: '9 mm iç-dış düşük profil görünümüyle daha fazla gün ışığı ve Uw: 0.98 W/(m²K) termal verim.',
    shortDescription:
      '76 mm profil genişliği, 5 odacıklı yapısı ve ince kenar görünümüyle modern mimari projelerin en çok tercih edilen pencere ve kapı serisi.',
    fullDescription:
      'Dorado 76; keskin ve minimalist mimari hatları, 9 mm’ye düşürülmüş iç-dış kanat binisi ve 76 mm kasa derinliği ile hem estetik hem de yüksek yalıtım beklentisini tek potada eritir. 24 mm’den 52 mm’ye kadar tüm çift ve üçlü cam kombinasyonlarıyla tam uyumludur.',
    defaultImage: '/images/brands/winsa/dorado-76.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '76 mm profil genişliği ve 5 odacıklı yüksek yalıtım geometrisi',
      '9 mm ince kanat görünümü sayesinde %12 daha geniş cam alanı ve gün ışığı',
      'Kendinden damlalıklı ve düz kanat seçenekleriyle dış cephe estetiği',
      'Alüminyum dış kapak (AluClip) ve zengin Renolit ahşap/antrasit folyo seçenekleri',
    ],
    usageAreas: [
      'Modern mimarili apartman ve rezidans projeleri',
      'Balkon kapatma ile birlikte yenilenen salon ve oda doğramaları',
      'Yüksek enerji tasarrufu arayan konut ve ofis binaları',
    ],
    technicalSpecs: {
      profilGenisligi: '76 mm',
      odacikSayisi: '5 Odacıklı',
      contaYapisi: '2 Kademeli TPE / EPDM Sızdırmazlık Contası',
      camKalinligi: '24 mm – 30 mm – 36 mm – 44 mm – 52 mm',
      isiYalitimiUw: 'Uw = 0.98 W/(m²K) / Uf = 1.1 W/(m²K)',
      sesYalitimiDb: '-42 dB (EN ISO 140-3)',
      suSizdirmazlik: 'Sınıf 9A (600 Pa)',
      ruzgarDirenci: 'Sınıf C4 / B4 (EN 12210)',
      standart: 'TS EN 12608-1 • CE',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'safir-76',
    code: 'SAFİR 76',
    name: 'Winsa Safir 76 — 76 mm 5 Odacıklı Güçlü ve Ekonomik Termal Seri',
    cardTitle: 'Safir 76',
    brand: 'winsa',
    featuredInBrandCatalog: true,
    category: 'Pencere ve Kapı Sistemleri',
    categorySlug: 'pencere-ve-kapi-sistemleri',
    tagline: '76 mm sınıfında optimum fiyat/performans dengesi ve yüksek rüzgar direnci.',
    shortDescription:
      '76 mm oturma genişliği ve 5 odacıklı tasarımıyla hem yeni binalarda hem de pencere yenileme projelerinde uzun ömürlü yalıtım sağlar.',
    fullDescription:
      'Safir 76, 70 mm sistemlere kıyasla artırılmış 76 mm kasa derinliği sayesinde ısı ve ses yalıtımında bir üst sınıf performans sunar. Bahçelievler’deki daire tadilatlarında mevcut denizlik ve mermer yapısına zarar vermeden hızlıca uygulanabilir.',
    defaultImage: '/images/brands/winsa/safir-76.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '76 mm 5 odacıklı kasa ve kanat yapısı',
      'Çift ve üçlü Isıcam (24-44 mm) uygulama kapasitesi',
      'RC2 hırsızlık emniyetli donanım ve çocuk kilidi uyumu',
      'Kolay temizlenebilir parlak ve lamine yüzey teknolojisi',
    ],
    usageAreas: [
      'Daire içi pencere ve balkon kapısı yenileme projeleri',
      'Toplu konut ve apartman dış cephe doğramaları',
    ],
    technicalSpecs: {
      profilGenisligi: '76 mm',
      odacikSayisi: '5 Odacıklı',
      contaYapisi: '2 Contalı EPDM Sistem',
      camKalinligi: '24 mm – 36 mm – 44 mm',
      isiYalitimiUw: 'Uw = 1.04 W/(m²K) / Uf = 1.15 W/(m²K)',
      sesYalitimiDb: '-40 dB',
      suSizdirmazlik: 'Sınıf 9A',
      ruzgarDirenci: 'Sınıf C4',
      standart: 'TS EN 12608-1',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'safir-70',
    code: 'SAFİR 70',
    name: 'Winsa Safir 70 — 70 mm 5 Odacıklı Klasik Mimari Pencere ve Kapı Sistemi',
    category: 'Pencere ve Kapı Sistemleri',
    categorySlug: 'pencere-ve-kapi-sistemleri',
    tagline: 'Türkiye’nin en çok tercih edilen 70 mm 5 odacıklı dengeli yalıtım serisi.',
    shortDescription:
      '70 mm genişliği, 5 odacıklı kesiti ve damlalıklı kanat opsiyonuyla her türlü apartman dairesinde kanıtlanmış dayanıklılık.',
    fullDescription:
      'Safir 70; 70 mm profil genişliği, 5 odacıklı iç yapısı ve 20-36 mm cam kalınlığı desteği ile standart apartman dairelerinde yüksek ısı ve ses izolasyonu sağlar. Damlalıklı kanat tasarımı yağmur suyunun conta yüzeyine temas etmeden tahliye edilmesine yardımcı olur.',
    defaultImage: '/images/products/cobancesme-safir-70-pencere-uygulamasi.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '70 mm 5 odacıklı ideal kasa ve kanat kesiti',
      '4+16+4 (24 mm) ve 4+20+4 (28 mm) Şişecam Konfor Isıcam tam uyumu',
      'Kendinden damlalıklı estetik kanat profili',
      'Winstor monoblok panjur ve sineklik sistemleriyle doğrudan entegrasyon',
    ],
    usageAreas: [
      'Siyavuşpaşa, Hürriyet, Zafer ve Fevzi Çakmak aile apartmanları',
      'Standart konut pencere ve balkon kapıları',
    ],
    technicalSpecs: {
      profilGenisligi: '70 mm',
      odacikSayisi: '5 Odacıklı',
      contaYapisi: 'Çift Sıra TPE / EPDM Conta',
      camKalinligi: '20 mm – 24 mm – 30 mm – 36 mm',
      isiYalitimiUw: 'Uw = 1.15 W/(m²K) / Uf = 1.25 W/(m²K)',
      sesYalitimiDb: '-38 dB',
      suSizdirmazlik: 'Sınıf 8A',
      ruzgarDirenci: 'Sınıf C3 / B4',
      standart: 'TS EN 12608-1',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'karina',
    code: 'KARİNA 60',
    name: 'Winsa Karina — 60 mm 4 Odacıklı Fonksiyonel Pencere ve Kapı Sistemi',
    category: 'Pencere ve Kapı Sistemleri',
    categorySlug: 'pencere-ve-kapi-sistemleri',
    tagline: 'Dar uygulama alanları ve iç mekan bölmeleri için ekonomik 60 mm 4 odacıklı çözüm.',
    shortDescription:
      '60 mm profil derinliği ve 4 odacıklı yapısıyla iç mekan bölmeleri, ara kapılar ve ekonomik konut projeleri için pratik çözüm.',
    fullDescription:
      'Karina 60 serisi, 4 odacıklı profil yapısı ve 60 mm oturma derinliği ile dar denizlikli pencerelerde, apartman merdiven sahanlıklarında ve ofis içi bölmelerde güvenilir performans ve ekonomik bütçe avantajı sağlar.',
    defaultImage: '/images/products/hurriyet-karina-pvc-pencere.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '60 mm 4 odacıklı kompakt profil tasarımı',
      'Tek cam (4-6 mm) ve çift cam (20-24 mm) çıta seçenekleri',
      'Ekonomik proje maliyeti ve uzun ömürlü yüzey kalitesi',
    ],
    usageAreas: [
      'Apartman ortak alan ve sahanlık pencereleri',
      'İç mekan ofis bölmeleri ve ıslak hacim pencereleri',
    ],
    technicalSpecs: {
      profilGenisligi: '60 mm',
      odacikSayisi: '4 Odacıklı',
      contaYapisi: '2 Contalı EPDM Sistem',
      camKalinligi: '4 mm – 20 mm – 24 mm',
      isiYalitimiUw: 'Uw = 1.4 W/(m²K)',
      sesYalitimiDb: '-34 dB',
      suSizdirmazlik: 'Sınıf 7A',
      ruzgarDirenci: 'Sınıf C2',
      standart: 'TS EN 12608-1',
    },
    availableColors: STANDARD_COLORS,
  },

  // ============================================================================
  // 2. SÜRME SİSTEMLER (5 ÜRÜN)
  // ============================================================================
  {
    slug: 'panorama-hs-76',
    code: 'PANORAMA HS 76',
    name: 'Winsa Panorama HS 76 Hebeschiebe — Yüksek Yalıtımlı Kaldır-Sür Sistemi',
    cardTitle: 'Panorama HS 76',
    brand: 'winsa',
    featuredInBrandCatalog: true,
    category: 'Sürme Sistemler',
    categorySlug: 'surme-sistemler',
    tagline: '175 mm 8 odacıklı kasa, 300 kg kanat kapasitesi ve engelsiz eşikle kesintisiz panoramik manzara.',
    shortDescription:
      'Geniş teras, bahçe ve balkon açıklıklarında devasa cam kanatların tek parmakla kaldırılarak kaydırıldığı üst segment Hebeschiebe sistemi.',
    fullDescription:
      'Panorama HS 76 Kaldır-Sür sistemi; 175 mm genişliğindeki 8 odacıklı kasa profili, 76 mm 5 odacıklı kanat yapısı ve termal bariyerli alüminyum alt eşiği ile 6.5 metreye varan açıklıkları tek bir panoramik cam duvara dönüştürür. Kolu çevirdiğinizde kanat hafifçe yükselerek özel rulmanlar üzerinde zahmetsizce kayar; kilitlendiğinde ise EPDM contalar üzerine vakumlanarak tam sızdırmazlık sağlar.',
    defaultImage: '/images/brands/winsa/panorama-hs-76.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '175 mm 8 odacıklı kasa ve 76 mm 5 odacıklı yüksek mukavemetli kanat',
      'Kanat başına 300 kg taşıma kapasiteli özel Kaldır-Sür (HS) mekanizması',
      '24 mm’den 44 mm’ye kadar üçlü (triple) güvenlikli Konfor Isıcam uyumu',
      'Termal bariyerli basık alüminyum eşik ile iç ve dış mekan arasında sıfır engel',
    ],
    usageAreas: [
      'Bahçelievler çatı dubleks teras çıkışları ve kış bahçesi cepheleri',
      'Bahçe katı daireler, villalar ve geniş salon-balkon geçişleri',
    ],
    technicalSpecs: {
      profilGenisligi: '175 mm Kasa / 76 mm Kanat',
      odacikSayisi: '8 Odacıklı Kasa / 5 Odacıklı Kanat',
      contaYapisi: 'Çepeçevre EPDM Kaldır-Sür Vakum Contası',
      camKalinligi: '24 mm – 36 mm – 44 mm',
      isiYalitimiUw: 'Uw = 0.95 W/(m²K) / Uf = 1.2 W/(m²K)',
      sesYalitimiDb: '-43 dB (EN ISO 140-3)',
      suSizdirmazlik: 'Sınıf 9A (EN 12208)',
      ruzgarDirenci: 'Sınıf C4 / B4 (EN 12210)',
      standart: 'TS EN 14351-1 • CE',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'comfort-slide-plus',
    code: 'COMFORT SLIDE PLUS',
    name: 'Winsa Comfort Slide Plus — Yeni Nesil Eksenel Kilitli Yalıtımlı Sürme Sistemi',
    cardTitle: 'Comfort Slide Plus',
    brand: 'winsa',
    featuredInBrandCatalog: true,
    category: 'Sürme Sistemler',
    categorySlug: 'surme-sistemler',
    tagline: 'Klasik sürmelerin ötesinde: Kapanırken kasaya 8 mm vakumlanan tam sızdırmaz akıllı sürme.',
    shortDescription:
      '150 mm kasa ve 76 mm kanat yapısıyla kıl fitil yerine çepeçevre EPDM kauçuk conta baskısı uygulayan yeni nesil akıllı sürme sistemi.',
    fullDescription:
      'Comfort Slide Plus, sürme sistemlerin kullanım kolaylığını açılır pencerelerin üstün yalıtım gücüyle birleştirir. Kol kapatıldığında kanat tüm çevresi boyunca kasa profiline doğru 8 mm eksenel hareket yaparak EPDM contaları sıkıştırır; böylece rüzgar ıslığı, toz ve yağmur sızıntısını %100 ortadan kaldırır.',
    defaultImage: '/images/brands/winsa/comfort-slide-plus.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '150 mm kasa ve 76 mm kanat derinliği ile yüksek termal bariyer',
      'Kıl fitilsiz, çepeçevre EPDM kauçuk conta baskılı eksenel kilitleme',
      '200 kg kanat ağırlığına kadar sarsıntısız ve sessiz kayma hareketi',
      'Mikro-havalandırma pozisyonu ve yüksek güvenlikli mantar başlıklı kilitler',
    ],
    usageAreas: [
      'Rüzgar yükü yüksek katlarda balkon ve teras çıkış kapıları',
      'İçe açılan kanatların yer kaplamasının istenmediği mutfak ve salonlar',
    ],
    technicalSpecs: {
      profilGenisligi: '150 mm Kasa / 76 mm Kanat',
      odacikSayisi: '6 Odacıklı Kasa / 5 Odacıklı Kanat',
      contaYapisi: 'Çepeçevre EPDM Vakum Conta (Sıfır Kıl Fitil)',
      camKalinligi: '24 mm – 36 mm – 44 mm',
      isiYalitimiUw: 'Uw = 0.98 W/(m²K)',
      sesYalitimiDb: '-42 dB',
      suSizdirmazlik: 'Sınıf 9A',
      ruzgarDirenci: 'Sınıf C4',
      standart: 'TS EN 14351-1',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'comfort-slide',
    code: 'COMFORT SLIDE',
    name: 'Winsa Comfort Slide — 149 mm Kasa 76 mm Kanat Konfor Sürme Sistemi',
    category: 'Sürme Sistemler',
    categorySlug: 'surme-sistemler',
    tagline: 'Ergonomik tasarım, 52 mm’ye varan cam kapasitesi ve dört mevsim yalıtım konforu.',
    shortDescription:
      '149 mm 6 odacıklı kasa ve 76 mm 5 odacıklı kanat profiliyle dar alanlarda maksimum açıklık ve yüksek ısı yalıtımı sağlar.',
    fullDescription:
      'Comfort Slide, balkon ve teras geçişlerinde kanat açılma payını sıfırlayarak iç mekan mobilya yerleşimini özgürleştirir. Özel eksenel rulman mekanizması sayesinde ağır ısıcamlı kanatlar dahi tek elle kolayca hareket ettirilir.',
    defaultImage: '/images/products/zafer-comfort-slide-surme-sistem.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '149 mm 6 odacıklı kasa ve 76 mm 5 odacıklı kanat kesiti',
      '24 mm’den 52 mm’ye kadar çift ve üçlü ısıcam uygulaması',
      'Dört bir yandan kilitleme sağlayan güvenli ispanyolet mekanizması',
    ],
    usageAreas: [
      'Salon ve mutfaktan balkona çıkış kapıları',
      'Kış bahçesi ve teras ara bölmeleri',
    ],
    technicalSpecs: {
      profilGenisligi: '149 mm Kasa / 76 mm Kanat',
      odacikSayisi: '6 Odacık Kasa / 5 Odacık Kanat',
      contaYapisi: 'Çepeçevre EPDM Conta',
      camKalinligi: '24 mm – 52 mm',
      isiYalitimiUw: 'Uw = 1.05 W/(m²K)',
      sesYalitimiDb: '-40 dB',
      suSizdirmazlik: 'Sınıf 9A',
      ruzgarDirenci: 'Sınıf C4',
      standart: 'TS EN 14351-1',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'lotus-paralel-surme',
    code: 'LOTUS PS',
    name: 'Winsa Lotus — Paralel Sürme ve Vasistas Açılımlı Kapı & Pencere Sistemi',
    cardTitle: 'Lotus',
    brand: 'winsa',
    featuredInBrandCatalog: true,
    category: 'Sürme Sistemler',
    categorySlug: 'surme-sistemler',
    tagline: 'Hem üstten vasistas havalandırma hem de paralel ray üzerinde kayarak açılma özelliği.',
    shortDescription:
      'Dorado 76, Revotech ve Safir 70 serileriyle tam uyumlu çalışan, yüksek sızdırmazlıklı paralel sürme (devirmeli sürme) sistemi.',
    fullDescription:
      'Lotus Paralel Sürme sistemi, standart pencere profillerinin yüksek yalıtım kabiliyetini sürme konforuyla birleştirir. İlk kademede kanat üstten devrilerek (vasistas) güvenli havalandırma sağlar; ikinci kademede ise sabit kanadın önüne geçerek ray üzerinde kayar.',
    defaultImage: '/images/brands/winsa/lotus.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Çift kademeli kullanım: Vasistas havalandırma + Paralel sürme açılım',
      '70 mm, 76 mm ve 84 mm Winsa pencere serileriyle %100 profil uyumu',
      'Devrilme emniyetli ve otomatik kavrama özellikli yarı-otomatik mekanizma',
    ],
    usageAreas: [
      'Fransız balkonlar ve dar mutfak/salon balkon kapıları',
      'Yüksek ısı ve ses yalıtımı gerektiren rüzgarlı cepheler',
    ],
    technicalSpecs: {
      profilGenisligi: '70 mm / 76 mm / 84 mm Uyumlu',
      odacikSayisi: '5 – 7 Odacıklı',
      contaYapisi: '2 veya 3 Kademeli EPDM Conta',
      camKalinligi: '24 mm – 52 mm',
      isiYalitimiUw: 'Uw = 0.92 – 1.15 W/(m²K)',
      sesYalitimiDb: '-42 dB',
      suSizdirmazlik: 'Sınıf 9A',
      ruzgarDirenci: 'Sınıf C4',
      standart: 'TS EN 14351-1',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'vela-gold-surme',
    code: 'VELA GOLD',
    name: 'Winsa Vela Gold & Vela — Sineklik Entegreli Çok Raylı Pratik Sürme Sistemi',
    brand: 'winsa',
    category: 'Sürme Sistemler',
    categorySlug: 'surme-sistemler',
    tagline: 'Çift ve üç raylı kasa alternatifleri, entegre sineklik rayı ve ekonomik sürme konforu.',
    shortDescription:
      'Balkon kapatma, teras ve iç mekan bölmelerinde geniş açıklıkları ekonomik ve pratik şekilde kapatmak için tasarlanmış çok raylı sürme serisi.',
    fullDescription:
      'Vela Gold ve Vela sürme sistemleri; tek ray, çift ray, kendinden sineklik raylı ve pervazlı kasa seçenekleriyle her türlü balkon ve pencere detayına uyum sağlar. Kanat birleşimlerindeki özel kenet profilleri sayesinde rüzgar ve toz geçişini engeller.',
    defaultImage: '/images/products/soganli-vela-gold-surme-pencere.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Çift raylı ve 3 raylı (3 kanadın üst üste toplanabildiği) kasa alternatifleri',
      'Kendinden sineklik raylı kasa opsiyonu ile entegre sürme sineklik',
      'Alüminyum takviye profilleri ile yüksek kat rüzgar mukavemeti',
    ],
    usageAreas: [
      'Standart apartman balkonları ve yazlık/kışlık teras kapatmaları',
      'Mutfak servis pencereleri ve balkon ara bölmeleri',
    ],
    technicalSpecs: {
      profilGenisligi: '70 mm / 118 mm (3 Raylı Kasa)',
      odacikSayisi: '3 – 4 Odacıklı',
      contaYapisi: 'Fin-Seal Kıl Fitil + EPDM Cam Contası',
      camKalinligi: '4 mm – 20 mm – 24 mm',
      isiYalitimiUw: 'Uw = 1.6 W/(m²K)',
      sesYalitimiDb: '-32 dB',
      suSizdirmazlik: 'Sınıf 7A',
      ruzgarDirenci: 'Sınıf C3',
      standart: 'TS EN 12608-1',
    },
    availableColors: STANDARD_COLORS,
  },

  // ============================================================================
  // 3. CAM BALKON SİSTEMLERİ (ALBERT GENAU & VERA SERİLERİ — FİYAT HESAPLAYICI ENTEGRE)
  // ============================================================================
  {
    slug: 'panorama-esiksiz-surme-cam-balkon',
    code: 'SLIDEMASTER / VERA SLIDE',
    name: 'Isıcamlı Sürme Cambalkon — Albert Genau SlideMaster & Vera Slide Serisi',
    cardTitle: 'Isıcamlı Sürme Cambalkon',
    brand: 'albert-genau',
    featuredInBrandCatalog: true,
    category: 'Cam Balkon Sistemleri',
    categorySlug: 'cam-balkon-sistemleri',
    tagline: 'İçe kanat açılma payı sıfır; dar balkonlar için masa-sandalye dostu engelsiz ısıcamlı sürme ray sistemi.',
    shortDescription:
      'Kanatlar içeriye doğru katlanmadığı için balkon kullanım alanını hiç daraltmayan, 3 veya 5 raylı engelsiz alt eşikli ısıcamlı sürme cam balkon.',
    fullDescription:
      'Albert Genau SlideMaster & Vera Slide Isıcamlı Sürme Cam Balkon; yalnızca 8 mm yüksekliğindeki pahlı alt rayı sayesinde ayak takılmasına izin vermez, tekerlekli sandalye ve çocuklar için engelsiz geçiş sunar. Kanatlar birbirini çeken kenetli alüminyum profillerle tek parmakla kayarak açılır.',
    defaultImage: '/images/brands/albert-genau/isicamli-surme-cambalkon.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'İçe açılan kanat payı sıfır; balkon içindeki masa, sandalye ve dolaplara çarpmaz',
      '8 mm pahlı engelsiz alt eşik ve alttan taşımalı ağır hizmet çelik rulmanlar',
      '8/10 mm temperli tek cam veya 4+12+4 / 4+20+4 ısıcamlı sürme opsiyonu',
      'Entegre sürme kedi sinekliği rayı ve içten kancalı güvenlik kilidi',
    ],
    usageAreas: [
      'Dar ve uzun balkonlar, Fransız balkonlar ve teras ara bölmeleri',
      'Tül perde ve plise perdeyi kanat çarpması olmadan kullanmak isteyen daireler',
    ],
    technicalSpecs: {
      profilGenisligi: '98 mm (3 Raylı) / 156 mm (5 Raylı) Kasa',
      odacikSayisi: 'Çok Raylı Gizli Su Tahliyeli Alt Kasa',
      contaYapisi: 'Alüminyum Kenetli Rüzgar Kilidi + EPDM & Fırça Conta',
      camKalinligi: '8 mm / 10 mm Temperli veya 20-28 mm Isıcam',
      isiYalitimiUw: 'Uw = 1.6 W/(m²K) (Isıcamlı Opsiyon)',
      sesYalitimiDb: '-28 dB',
      suSizdirmazlik: 'Sınıf 8A',
      ruzgarDirenci: 'Sınıf C3',
      standart: 'TSE EN 12150',
    },
    availableColors: STANDARD_COLORS,
    calculatorSeriesCode: 'Vera Slide-SUR',
    pricingSystemId: 'vds_surme',
  },
  {
    slug: 'vera-isicamli-cam-balkon',
    code: 'TIARA TWINMAX / VERA TERMAL',
    name: 'Isıcamlı Katlanır Cambalkon — Albert Genau Tiara Twinmax & Vera Termal 4+20+4 Sistem',
    cardTitle: 'Isıcamlı Katlanır Cambalkon',
    brand: 'albert-genau',
    featuredInBrandCatalog: true,
    category: 'Cam Balkon Sistemleri',
    categorySlug: 'cam-balkon-sistemleri',
    tagline: '%72 ısı tasarrufu ve -38 dB akustik yalıtım sağlayan çift tarafı temperli Konfor Isıcam serisi.',
    shortDescription:
      'Balkonunu kışın da evin sıcak bir odası gibi kullanmak isteyenler için 28 mm Argon gazlı Şişecam Sinerji/Konfor Isıcamlı ve EPDM contalı katlanır sistem.',
    fullDescription:
      'Albert Genau Tiara Twinmax & Vera Termal Isıcamlı Katlanır Cam Balkon; her iki cam plakası da TSE EN 12150 standardında temperlenmiş 28 mm (4 mm + 20 mm Argon boşluk + 4 mm Low-E Konfor) cam üniteleriyle standart tek camlı sistemlere göre 4.2 kat daha yüksek ısı yalıtımı sağlar. Alüminyum mıknatıslı ve EPDM kauçuk kanat birleşim contaları sayesinde Şirinevler ve E-5 aksındaki yoğun trafik gürültüsünü -38 dB keser.',
    defaultImage: '/images/brands/albert-genau/isicamli-katlanir-cambalkon.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '28 mm (4+20+4) Argon gazlı ve her iki yüzeyi TSE EN 12150 temperli Konfor Isıcam',
      'Kanat başına 8 bilyalı ağır hizmet tipi AISI 304 paslanmaz çelik rulman (125 kg kapasite)',
      'Sararma yapmayan alüminyum mıknatıslı fitil ve çift sıra EPDM sızdırmazlık bariyeri',
      'Eylül 2026 Yargıtay 4/5 muvafakatname ve apartman dış cephe RAL renklerine %100 uyum',
    ],
    usageAreas: [
      'Şirinevler, Kocasinan Merkez, Soğanlı ve Siyavuşpaşa cadde cepheli daireler',
      'Kışın çalışma odası, yemek alanı veya oyun odası olarak kullanılan balkonlar',
    ],
    technicalSpecs: {
      profilGenisligi: '58 mm Termal Kasa / 3.2 mm T66 Alüminyum Et Kalınlığı',
      odacikSayisi: 'Çok Odacıklı Termal Baza & Eğimli Damlalık Kasa',
      contaYapisi: 'Alüminyum Mıknatıslı Fitil + Çift Sıra EPDM Kauçuk Conta',
      camKalinligi: '28 mm (4+20+4 Argonlu Temperli Isıcam)',
      isiYalitimiUw: 'Uw = 1.1 W/(m²K) (%72 Isı Tasarrufu)',
      sesYalitimiDb: '-38 dB (EN ISO 140-3)',
      suSizdirmazlik: 'Sınıf 9A (600 Pa Gizli Su Tahliyeli)',
      ruzgarDirenci: 'Sınıf C4 / B5 (1600 Pa)',
      standart: 'TSE EN 12150 • EN 14351-1',
    },
    availableColors: STANDARD_COLORS,
    calculatorSeriesCode: 'Vera Termal-ISI',
    pricingSystemId: 'vbs_isicam',
  },
  {
    slug: 'vera-katlanir-cam-balkon',
    code: 'OPTIMA / VERA 8-10MM',
    name: 'Ekonomik Katlanır Cambalkon — Albert Genau Optima & Vera 8mm / 10mm Temperli Sistem',
    cardTitle: 'Ekonomik Katlanır Cambalkon',
    brand: 'albert-genau',
    featuredInBrandCatalog: true,
    category: 'Cam Balkon Sistemleri',
    categorySlug: 'cam-balkon-sistemleri',
    tagline: 'Tam açılır panoramik cephe, çift sıra paslanmaz rulman ve alüminyum mıknatıslı sızdırmazlık.',
    shortDescription:
      'Yazın tüm kanatları köşeye toplanarak balkonu tamamen açık hale getiren, kışın yağmur, rüzgar ve tozu %100 kesen katlanır cam balkon.',
    fullDescription:
      'Albert Genau Optima & Vera Katlanır Cam Balkon Sistemi; 8 mm veya 10 mm Şişecam temperli güvenlik camları, 3 mm et kalınlığında T66 ısıl işlemli alüminyum profilleri ve L/U tipi balkonlarda köşe direksiz tam açılım sağlayan özel dönüş mekanizmasıyla kesintisiz panoramik manzara sunar.',
    defaultImage: '/images/brands/albert-genau/ekonomik-katlanir-cambalkon.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '8 mm ve 10 mm TSE EN 12150 Şişecam temperli güvenlik camı seçenekleri',
      'L ve U balkonlarda köşe takozsuz 90° ve 135° kesintisiz kanat geçişi',
      'Paslanmaz İspanyolet çocuk emniyet kilidi ve rüzgar sabitleme stoperi',
      'Yırtılmaz çelik telli kedi sinekliği ve cam üstü plise perde uyumu',
    ],
    usageAreas: [
      'Ara sokak aile apartmanları, L ve U tipi köşe balkonlar',
      'Toz, yağmur, rüzgar ve kuş girişini engellemek isteyen tüm daireler',
    ],
    technicalSpecs: {
      profilGenisligi: '42 mm Kasa / 3.0 mm T66 Alüminyum Et Kalınlığı',
      odacikSayisi: '3 Odacıklı Eğimli Damlalık Kasa',
      contaYapisi: 'Alüminyum Gövdeli Mıknatıslı Fitil + Çift Sıra Kıl Fitil',
      camKalinligi: '8 mm veya 10 mm Temperli Tek Cam',
      isiYalitimiUw: 'Uw = 2.6 W/(m²K) (%35 – %45 Isı Kazancı)',
      sesYalitimiDb: '-24 dB / -28 dB',
      suSizdirmazlik: 'Sınıf 7A (450 Pa)',
      ruzgarDirenci: 'Sınıf C3 (1200 Pa)',
      standart: 'TSE EN 12150 • QUALICOAT',
    },
    availableColors: STANDARD_COLORS,
    calculatorSeriesCode: 'Vera-80',
    pricingSystemId: 'vns_10mm',
  },
  {
    slug: 'giyotin-motorlu-silinebilir-cam',
    code: 'VERTIFLEX / TAMBALKON',
    name: 'Tambalkon – Giyotin — Albert Genau VertiFlex Uzaktan Kumandalı Motorlu Giyotin Cam',
    cardTitle: 'Tambalkon – Giyotin',
    brand: 'albert-genau',
    featuredInBrandCatalog: true,
    category: 'Cam Balkon Sistemleri',
    categorySlug: 'cam-balkon-sistemleri',
    tagline: 'Uzaktan kumandalı dikey açılım; açıkken güvenli cam küpeşte, kapalıyken tam ısı ve ses yalıtımı.',
    shortDescription:
      'Somfy/Becker tüp motorlu, içeriden dış camları güvenle silinebilen ve açık konumda 110 cm cam korkuluk görevi gören otomatik giyotin sistem.',
    fullDescription:
      'Albert Genau Tambalkon (VertiFlex) & Vera Vertical Motorlu Giyotin Cam Sistemi; çelik zincir veya çelik telli triger kayış tahrikiyle uzaktan kumanda üzerinden dikey olarak açılıp kapanır. Patentli silinebilir kanat mekanizması sayesinde dış cepheye sarkmadan içeriden temizlik yapılabilir.',
    defaultImage: '/images/brands/albert-genau/tambalkon-giyotin.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Somfy veya Becker RTS uzaktan kumandalı, 5 yıl garantili sessiz tüp motor',
      'İçeriden dış yüzey temizliğine imkan tanıyan "Silinebilir Kanat" teknolojisi',
      '4+16+4 (24 mm) Argonlu temperli Isıcam ve el sıkışma emniyetli baza profili',
      'Opsiyonel yağmur/rüzgar sensörü ve akıllı telefon (Wi-Fi) otomasyonu',
    ],
    usageAreas: [
      'Yenibosna Basın Ekspres rezidansları ve çatı dubleks terasları',
      'Kafe, restoran, pastane ve ticari kış bahçesi cepheleri',
    ],
    technicalSpecs: {
      profilGenisligi: '132 mm 3 Kanallı Yan Dikme / Termal Motor Kutusu',
      odacikSayisi: 'Akustik İzolasyonlu Motor Kutusu & 3 Raylı Dikme',
      contaYapisi: 'EPDM Vakum Conta + Çift Sıra Antibakteriyel Fırça',
      camKalinligi: '24 mm (4+16+4 Argonlu Isıcam) veya 8/10 mm Temperli',
      isiYalitimiUw: 'Uw = 1.3 W/(m²K)',
      sesYalitimiDb: '-36 dB',
      suSizdirmazlik: 'Sınıf 9A',
      ruzgarDirenci: 'Sınıf C4 (1800 Pa)',
      standart: 'CE • EN 60335-2-97 • TSE EN 12150',
    },
    availableColors: STANDARD_COLORS,
    calculatorSeriesCode: 'GIY-MOT',
    pricingSystemId: 'vgs_giyotin',
  },
  {
    slug: 'kis-bahcesi-sistemleri',
    code: 'ATRIUM KIŞ BAHÇESİ',
    name: 'Kış Bahçesi — Albert Genau Atrium Dört Mevsim Yalıtımlı Cam Tavan & Cephe Sistemi',
    cardTitle: 'Kış Bahçesi',
    brand: 'albert-genau',
    featuredInBrandCatalog: true,
    category: 'Cam Balkon Sistemleri',
    categorySlug: 'cam-balkon-sistemleri',
    tagline: 'Lamine + temperli güvenlikli ısıcam çatı, gizli yağmur drenajı ve dört mevsim konforlu yaşam alanı.',
    shortDescription:
      'Müstakil bahçeleri, verandaları ve çatı teraslarını dört mevsim yalıtımlı bir yaşam odasına dönüştüren statik alüminyum kış bahçesi sistemi.',
    fullDescription:
      'Albert Genau Atrium Kış Bahçesi sistemi; yüksek kar ve rüzgar yüküne dayanıklı T66 alüminyum taşıyıcı konstrüksiyonu, güneş kontrol kaplamalı (Low-E) lamine + temperli güvenlikli çift cam tavanı ve taşıyıcı kolon içinden görünmez su tahliye mimarisiyle teras ve bahçe katlarını 365 gün kullanılabilen prestijli bir yaşam alanına dönüştürür.',
    defaultImage: '/images/brands/albert-genau/kis-bahcesi.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '4+16+(4+4 Lamine) Güneş Kontrol (Konfor) güvenlikli ısıcam çatı sistemi',
      'Taşıyıcı kolon içinden gizli yağmur oluğu ve terleme/yoğuşma tahliye kanalları',
      'Isıcamlı Sürme (SlideMaster), Isıcamlı Katlanır (Tiara) ve Giyotin cephelerle %100 entegrasyon',
      'Entegre Samsung LED ray aydınlatma ve motorlu tavan zip perde opsiyonu',
    ],
    usageAreas: [
      'Çatı dubleks terasları, bahçe katı daire verandaları ve müstakil villa bahçeleri',
      'Restoran, kafe ve sosyal tesis kış bahçesi projeleri',
    ],
    technicalSpecs: {
      profilGenisligi: '150x150 mm Taşıyıcı Kolon / Termal Çatı Kirişi',
      odacikSayisi: 'Çok Odacıklı Statik Taşıyıcı Alüminyum Konstrüksiyon',
      contaYapisi: 'Üç Kademeli EPDM Çatı Sızdırmazlık & Yoğuşma Contası',
      camKalinligi: 'Tavan: 28 mm Lamine+Temperli Isıcam / Cephe: 24-28 mm Isıcam',
      isiYalitimiUw: 'Uw = 1.1 W/(m²K)',
      sesYalitimiDb: '-40 dB',
      suSizdirmazlik: 'Sınıf 9A (Kolon İçi Gizli Deşarj)',
      ruzgarDirenci: 'Sınıf C5 (2000 Pa + 150 kg/m² Kar Yükü)',
      standart: 'TS EN 1090-2 • CE • TSE EN 12150',
    },
    availableColors: STANDARD_COLORS,
    calculatorSeriesCode: 'KIS-BIO',
    pricingSystemId: 'vgs_giyotin',
  },
  {
    slug: 'bioklimatik-kis-bahcesi-sistemleri',
    code: 'TARGA BİOKLİMATİK',
    name: 'Bioklimatik Pergola — Albert Genau Targa Motorlu Açılır-Toplanır Alüminyum Tavan Sistemi',
    cardTitle: 'Bioklimatik Pergola',
    brand: 'albert-genau',
    featuredInBrandCatalog: true,
    category: 'Cam Balkon Sistemleri',
    categorySlug: 'cam-balkon-sistemleri',
    tagline: 'Kendi ekseninde dönerek doğal havalandırma sağlayan ve geriye toplanan motorlu bioklimatik pergola.',
    shortDescription:
      'Uzaktan kumandayla hem kendi ekseninde açılan (rolling) hem de geriye toplanan (retractable) poliüretan dolgulu alüminyum lamel tavan sistemi.',
    fullDescription:
      'Albert Genau Targa Bioklimatik Pergola sistemi; güneş ışığını ve doğal hava sirkülasyonunu dilediğiniz açıda kontrol etmenizi sağlayan aerodinamik alüminyum lamelleriyle teras ve bahçelerde dört mevsim iklimlendirme sağlar. Tam kapandığında yağmur ve kar suyunu taşıyıcı kolonların içinden gizlice tahliye eder.',
    defaultImage: '/images/brands/albert-genau/bioklimatik-pergola.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Motorlu açılır-toplanır (Rolling + Retractable) poliüretan dolgulu alüminyum tavan lamelleri',
      'Taşıyıcı dikme içinden görünmez yağmur suyu deşarjı ve 150 kg/m² kar yükü direnci',
      'Entegre dimmerli Samsung Günışığı / RGB LED aydınlatma',
      'Isıcamlı Sürme, Katlanır ve Motorlu Giyotin (Tambalkon) cephelerle %100 uyum',
    ],
    usageAreas: [
      'Çatı dubleks terasları, bahçe katı daire verandaları ve müstakil kış bahçeleri',
      'Ticari sosyal alanlar, restoran ve otel terasları',
    ],
    technicalSpecs: {
      profilGenisligi: '150x150 mm Taşıyıcı Kolon / 220 mm Oluklu Ana Kiriş',
      odacikSayisi: 'Poliüretan Dolgulu Termal Lamel & Çok Odacıklı Kiriş',
      contaYapisi: 'EPDM Lamel Birleşim Contası & Gizli Dere Oluğu',
      camKalinligi: 'Tavan: Poliüretan Dolgulu Alüminyum Lamel / Cephe: 24-28 mm Isıcam',
      isiYalitimiUw: 'Uw = 1.1 W/(m²K)',
      sesYalitimiDb: '-40 dB',
      suSizdirmazlik: 'Sınıf 9A (Kolon İçi Gizli Deşarj)',
      ruzgarDirenci: 'Sınıf C5 (2000 Pa + 150 kg/m² Kar Yükü)',
      standart: 'TS EN 1090-2 • CE • TSE EN 12150',
    },
    availableColors: STANDARD_COLORS,
    calculatorSeriesCode: 'KIS-BIO',
    pricingSystemId: 'vgs_giyotin',
  },

  // ============================================================================
  // 4. PANJUR VE KEPENK SİSTEMLERİ (3 ÜRÜN: WİNKEPENK, WINSTOR, ALU-ROLL)
  // ============================================================================
  {
    slug: 'winkepenk',
    code: 'WİNKEPENK',
    name: 'Winsa Winkepenk — Estetik ve Güvenlikli Mimari Kepenk Sistemi',
    brand: 'winsa',
    category: 'Panjur ve Kepenk Sistemleri',
    categorySlug: 'panjur-ve-kepenk-sistemleri',
    tagline: 'Ege ve Akdeniz mimarisinden modern şehir konutlarına uzanan estetik, rüzgar ve güneş kontrolü.',
    shortDescription:
      'Pencere ve kapıları güneş ışınlarından, fırtınadan ve dış etkenlerden korurken bina dış cephesine üstün mimari karakter kazandıran kepenk sistemi.',
    fullDescription:
      'Winsa Winkepenk sistemi; sabit veya hareketli lamel seçenekleri, kemerli ve dikdörtgen form uygulanabilirliği, zengin ahşap/antrasit laminasyon renkleri ve korozyona tam dayanıklı donanımıyla hem müstakil konutlarda hem de kentsel dönüşüm cephelerinde yüksek güvenlik ve ısı/ışık kontrolü sağlar.',
    defaultImage: '/images/products/cobancesme-winkepenk-kepenk-sistemi.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Sabit ve hareketli (açı ayarlı) aerodinamik lamel seçenekleri',
      'Güneşin UV ışınlarını ve yaz sıcağını cam yüzeyine ulaşmadan %85 kesme',
      'Çelik destek saclı kasa ve kanat profilleriyle fırtına ve darbe mukavemeti',
      'Altın Meşe, Koyu Ceviz, Antrasit Gri (RAL 7016) ve Beyaz renk alternatifleri',
    ],
    usageAreas: [
      'Bahçe katı daireler, dubleks teraslar, müstakil villalar ve butik apartmanlar',
      'Maksimum güvenlik ve mahremiyet arayan giriş kat konutlar',
    ],
    technicalSpecs: {
      profilGenisligi: '60 mm Kasa / 68 mm Kepenk Kanat Profili',
      odacikSayisi: '3 – 4 Odacıklı Çelik Destek Saclı Gövde',
      contaYapisi: 'EPDM Darbe ve Rüzgar Sönümleme Contası',
      camKalinligi: '35 mm ve 50 mm Hareketli/Sabit Lamel',
      isiYalitimiUw: '+%30 Güneş Radyasyonu ve Kış Soğuğu Bariyeri',
      sesYalitimiDb: '+12 dB Fırtına ve Çevre Gürültüsü Kesimi',
      suSizdirmazlik: 'Tam Dış Cephe Yağış ve Dolu Kalkanı',
      ruzgarDirenci: 'Sınıf 6 (TS EN 13659 Yüksek Rüzgar Direnci)',
      standart: 'TS EN 13659 • CE',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'winstor-monoblok-panjur',
    code: 'WINSTOR',
    name: 'Winsa Winstor — Yalıtımlı Monoblok Panjur ve Entegre Sineklik Sistemi',
    cardTitle: 'Winstor',
    brand: 'winsa',
    featuredInBrandCatalog: true,
    category: 'Panjur ve Kepenk Sistemleri',
    categorySlug: 'panjur-ve-kepenk-sistemleri',
    tagline: '185x185, 220x220 ve 185x220 yalıtımlı kutu seçenekleriyle +%28 ek ısı tasarrufu ve tam karartma.',
    shortDescription:
      'Tüm Winsa pencere ve sürme serileriyle tek parça (monoblok) olarak birleşen, EPS ısı/ses yalıtımlı ve motorlu/manuel kontrol seçenekli panjur sistemi.',
    fullDescription:
      'Winstor Monoblok Panjur Sistemi, pencere üstüne entegre edilen özel yalıtımlı kutusu sayesinde dış cephe estetiğini bozmadan güneş kontrolü, fırtına koruması ve caydırıcı hırsızlık güvenliği sağlar. Kış aylarında pencere ile panjur arasında oluşan durgun hava tabakası sayesinde ısı kaybını %28’e kadar azaltır.',
    defaultImage: '/images/brands/winsa/winstor.png',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '185x185 mm, 220x220 mm ve kendinden yalıtımlı 185x220 mm kutu seçenekleri',
      '37 mm ve 55 mm PVC veya poliüretan dolgulu alüminyum lamel alternatifleri',
      'Somfy/Becker uzaktan kumandalı motor, duvar butonu veya manuel makaralı kullanım',
      'Kutu içine entegre edilebilen dikey stor sineklik uyumu',
    ],
    usageAreas: [
      'Zemin kat, giriş kat ve bahçe katı dairelerde güvenlik ve mahremiyet',
      'Yoğun güneş ve rüzgar alan batı/kuzey cephe yatak odası ve salon pencereleri',
    ],
    technicalSpecs: {
      profilGenisligi: '185x185 mm / 220x220 mm / 185x220 mm Monoblok Kutu',
      odacikSayisi: 'EPS Strafor Termal & Akustik İzolasyonlu Kutu Gövdesi',
      contaYapisi: 'Fırçalı Yan Dikme Rayları & EPDM Alt Eşik Contası',
      camKalinligi: '37 mm ve 55 mm Lamel Kalınlığı',
      isiYalitimiUw: 'Kutu Uf = 0.85 W/(m²K) (+%28 Ek Termal Kazanç)',
      sesYalitimiDb: '+10 dB Ek Akustik Gürültü Azaltımı',
      suSizdirmazlik: 'Sınıf 9A Fırtına ve Dolu Koruması',
      ruzgarDirenci: 'Sınıf 6 (EN 13659)',
      standart: 'TS EN 13659 • CE',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'winstor-monoblok-panjur-sistemi',
    code: 'WINSTOR MONOBLOK',
    name: 'Winsa Winstor — Yalıtımlı Monoblok Panjur ve Entegre Sineklik Sistemi',
    category: 'Panjur ve Kepenk Sistemleri',
    categorySlug: 'panjur-ve-kepenk-sistemleri',
    tagline: '185x185, 220x220 ve 185x220 yalıtımlı kutu seçenekleriyle +%28 ek ısı tasarrufu ve tam karartma.',
    shortDescription:
      'Tüm Winsa pencere ve sürme serileriyle tek parça (monoblok) olarak birleşen, EPS ısı/ses yalıtımlı ve motorlu/manuel kontrol seçenekli panjur sistemi.',
    fullDescription:
      'Winstor Monoblok Panjur Sistemi, pencere üstüne entegre edilen özel yalıtımlı kutusu sayesinde dış cephe estetiğini bozmadan güneş kontrolü, fırtına koruması ve caydırıcı hırsızlık güvenliği sağlar. Kış aylarında pencere ile panjur arasında oluşan durgun hava tabakası sayesinde ısı kaybını %28’e kadar azaltır.',
    defaultImage: '/images/products/zafer-winstor-panjur-sistemi.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '185x185 mm, 220x220 mm ve kendinden yalıtımlı 185x220 mm kutu seçenekleri',
      '37 mm ve 55 mm PVC veya poliüretan dolgulu alüminyum lamel alternatifleri',
      'Somfy/Becker uzaktan kumandalı motor, duvar butonu veya manuel makaralı kullanım',
      'Kutu içine entegre edilebilen dikey stor sineklik uyumu',
    ],
    usageAreas: [
      'Zemin kat, giriş kat ve bahçe katı dairelerde güvenlik ve mahremiyet',
      'Yoğun güneş ve rüzgar alan batı/kuzey cephe yatak odası ve salon pencereleri',
    ],
    technicalSpecs: {
      profilGenisligi: '185x185 mm / 220x220 mm / 185x220 mm Monoblok Kutu',
      odacikSayisi: 'EPS Strafor Termal & Akustik İzolasyonlu Kutu Gövdesi',
      contaYapisi: 'Fırçalı Yan Dikme Rayları & EPDM Alt Eşik Contası',
      camKalinligi: '37 mm ve 55 mm Lamel Kalınlığı',
      isiYalitimiUw: 'Kutu Uf = 0.85 W/(m²K) (+%28 Ek Termal Kazanç)',
      sesYalitimiDb: '+10 dB Ek Akustik Gürültü Azaltımı',
      suSizdirmazlik: 'Sınıf 9A Fırtına ve Dolu Koruması',
      ruzgarDirenci: 'Sınıf 6 (EN 13659)',
      standart: 'TS EN 13659 • CE',
    },
    availableColors: STANDARD_COLORS,
  },
  {
    slug: 'motorlu-aluminyum-poliuretanli-panjur',
    code: 'ALU-ROLL MOTORLU',
    name: 'Winsa Motorlu Alüminyum Poliüretan Dolgulu Dıştan Takma Panjur & Kepenk',
    category: 'Panjur ve Kepenk Sistemleri',
    categorySlug: 'panjur-ve-kepenk-sistemleri',
    tagline: 'Mevcut pencereleri değiştirmeden dıştan uygulanabilen, poliüretan köpük dolgulu motorlu güvenlik panjuru.',
    shortDescription:
      'Cam balkonların, mevcut PVC pencerelerin ve terasların dışına doğrudan monte edilebilen uzaktan kumandalı alüminyum panjur ve kepenk sistemi.',
    fullDescription:
      'Dıştan takma (alüminyum kutulu) motorlu panjur sistemi; mevcut doğramalarınızı kırmadan veya değiştirmeden balkon ve pencerelerinize tam otomasyonlu güvenlik ve yalıtım kazandırır. Yüksek yoğunluklu poliüretan köpük dolgulu alüminyum lameller dolu yağışı, fırtına ve zorlamalara karşı yüksek direnç gösterir.',
    defaultImage: '/images/products/hurriyet-motorlu-aluminyum-panjur.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      '45° pahlı veya oval alüminyum dış kutu (165 mm, 180 mm, 205 mm, 250 mm)',
      'Poliüretan dolgulu 39 mm, 45 mm ve 55 mm elektrostatik boyalı alüminyum lamel',
      'Engel tanıma özellikli Somfy/Becker tüp motor ve grup kontrol kumandası',
      'Alt etek kilidi ve motor blokaj sistemiyle dışarıdan kaldırılmaya karşı emniyet',
    ],
    usageAreas: [
      'Mevcut daire pencereleri, cam balkon dış cepheleri ve dükkan/mağaza girişleri',
    ],
    technicalSpecs: {
      profilGenisligi: '165 mm – 250 mm Alüminyum Kutu',
      odacikSayisi: 'Poliüretan Köpük Dolgulu Çift Cidarlı Alüminyum Lamel',
      contaYapisi: 'EPDM Fitilli Alüminyum Yan Dikme Kanalları',
      camKalinligi: '39 mm / 45 mm / 55 mm Lamel Yüksekliği',
      isiYalitimiUw: '+%25 Isı ve Güneş Radyasyonu Kesimi',
      sesYalitimiDb: '+10 dB Akustik İzolasyon',
      suSizdirmazlik: 'Tam Dış Cephe Koruması',
      ruzgarDirenci: 'Sınıf 6 Yüksek Rüzgar Mukavemeti',
      standart: 'TS EN 13659 • QUALICOAT',
    },
    availableColors: STANDARD_COLORS,
  },

  // ============================================================================
  // 5. DONANIM VE AKSESUAR SİSTEMLERİ (2 ÜRÜN)
  // ============================================================================
  {
    slug: 'winsa-acilim-ve-kilit-donanimlari',
    code: 'WİNSA HARDWARE RC2',
    name: 'Winsa Tam Uyumlu Açılım, İspanyolet Kilit ve Akustik Kol Sistemleri',
    category: 'Donanım ve Aksesuar Sistemleri',
    categorySlug: 'donanim-sistemleri',
    tagline: 'Tek açılım, çift açılım, paralel sürme, çocuk emniyetli ve RC2 hırsızlık güvenlikli orijinal donanım.',
    shortDescription:
      'Pencere ve kapıların sızdırmazlık ve güvenliğini belirleyen mantar başlıklı çelik ispanyolet kilitler, akustik kollar ve ağır hizmet menteşeleri.',
    fullDescription:
      'Bir pencere veya cam balkon sisteminin yalıtım ömrü kullanılan donanımın kalitesiyle doğrudan ilişkilidir. Winsa ve Çelikpen sistemlerinde kullanılan korozyon dirençli (EN 1670 Sınıf 5) çift açılım mekanizmaları, mantar başlıklı RC2 güvenlik pimler ve kademeli akustik pencere kolları on binlerce açma-kapama çevriminde ilk günkü sıkılığını korur.',
    defaultImage: '/images/products/kocasinan-winsa-pencere-kol-kilit-donanimi.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Tek açılım, çift açılım (vasistas), paralel sürme ve katlanır donanım grupları',
      'Hırsızlığa karşı çelik karşılıklı ve mantar başlıklı RC2 / WK2 emniyet pimleri',
      'EN 16281 standardında anahtarlı çocuk emniyet kilidi ve emniyet mandalları',
      'Ergonomik akustik pencere kolları (Gümüş, Antrasit, Mat Siyah, Bronz, Beyaz)',
    ],
    usageAreas: [
      'Tüm PVC pencere, balkon kapısı, sürme ve cam balkon sistemleri',
      'Yüksek kat çocuk güvenliği ve giriş kat hırsızlık emniyeti gerektiren daireler',
    ],
    technicalSpecs: {
      profilGenisligi: '13 mm Aks Mesafeli Tüm Winsa Serileriyle Tam Uyum',
      odacikSayisi: 'Çepeçevre Çok Noktalı Kilitleme Mekanizması',
      contaYapisi: 'Ayarlanabilir Eksantrik Conta Baskı Pimleri',
      camKalinligi: '130 kg – 300 kg Kanat Taşıma Kapasitesi',
      isiYalitimiUw: 'Tam Conta Baskısı İle Sıfır Hava Kaçağı',
      sesYalitimiDb: 'Mikro-Havalandırma & Akustik Kilit Pozisyonu',
      suSizdirmazlik: 'EN 1670 Sınıf 5 Korozyon Direnci (480 Saat Tuz Testi)',
      ruzgarDirenci: 'EN 13126-8 — 25.000 Açma/Kapama Ömür Testi',
      standart: 'TS EN 13126 • EN 16281 • RC2',
    },
    availableColors: ['Mat Siyah', 'Antrasit Gri', 'Titanyum Gümüş', 'Bronz', 'Beyaz'],
  },
  {
    slug: 'paslanmaz-rulman-ve-kedi-sinekligi-sistemleri',
    code: 'WINSA RULMAN & SİNEKLİK',
    name: 'Winsa 8 Bilyalı Paslanmaz Çelik Rulman, EPDM Fitil & Çelik Telli Kedi Sinekliği',
    category: 'Donanım ve Aksesuar Sistemleri',
    categorySlug: 'donanim-sistemleri',
    tagline: 'AISI 304 paslanmaz çelik rulmanlar, yırtılmaz kedi tüllü sineklik ve cam üstü termal plise perde.',
    shortDescription:
      'Cam balkon sistemlerinde 10 yıl sarsıntısız yürüyüş sağlayan 8 bilyalı rulmanlar, alüminyum mıknatıs fitiller ve evcil hayvan dostu çelik sineklikler.',
    fullDescription:
      'Çelikpen cam balkon serilerinde plastik veya zamak teker yerine her kanatta 8 bilyalı AISI 304 paslanmaz çelik rulman kullanılır. Ayrıca evcil hayvanların tırmalamasına ve yüklenmesine dayanıklı çelik/polyester alaşımlı yırtılmaz Kedi Sinekliği ve 28 mm cam çıtasına sıfır oturan içten Plise Perde sistemleri kendi atölyemizde üretilir.',
    defaultImage: '/images/products/bahcelievler-plise-sineklik-kedi-tulu.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Kanat başına 8 bilyalı, poliamid sessiz gömlekli AISI 304 paslanmaz çelik rulman',
      'Evcil hayvan yırtmalarına ve düşmeye karşı emniyetli çelik telli Kedi Sinekliği',
      'Cam kanatlarla birlikte katlanan, güneşi %80 kesen içten Plise Perde',
      'Sararma ve kırılma yapmayan alüminyum gövdeli mıknatıslı sızdırmazlık fitilleri',
    ],
    usageAreas: [
      'Kedi ve evcil hayvan bulunan tüm apartman daireleri',
      'Eski cam balkon rulman/fitil revizyonları ve yeni montaj projeleri',
    ],
    technicalSpecs: {
      profilGenisligi: 'Tüm Katlanır (Vera/Vera Termal) ve Sürme (Vera Slide) Serilerle Uyumlu',
      odacikSayisi: 'Çift Eksenli Tork Dengeleyici Rulman Gövdesi',
      contaYapisi: 'DIN 7863 EPDM + Neodimyum Mıknatıslı Alüminyum Fitil',
      camKalinligi: '8 mm, 10 mm, 20 mm, 24 mm ve 28 mm Cam Uyumu',
      isiYalitimiUw: 'Plise Perde İle Yazın +%35 Güneş Isısı Kesimi',
      sesYalitimiDb: 'Mıknatıslı Fitil İle Rüzgar Islığı Önleme',
      suSizdirmazlik: '%100 Paslanmaz Buhar ve Nem Direnci',
      ruzgarDirenci: 'Çelik Telli Kedi Tülü (Yırtılmaz Dokuma)',
      standart: 'AISI 304 • DIN 7863 • 10 Yıl Garanti',
    },
    availableColors: STANDARD_COLORS,
  },

  // ============================================================================
  // 6. RENK DÜNYASI & LAMİNE YÜZEYLER (2 ÜRÜN)
  // ============================================================================
  {
    slug: 'antrasit-ve-metalik-dis-cephe-renkleri',
    code: 'RENK KARTELASI — METALİK',
    name: 'Winsa Antrasit Gri (RAL 7016), Kumlu Antrasit & Metalik Mimari Yüzeyler',
    category: 'Renk Dünyası & Lamine Yüzeyler',
    categorySlug: 'renk-dunyasi',
    tagline: 'Kentsel dönüşüm cepheleriyle %100 uyumlu Cool Colors teknolojili Antrasit ve Mat Siyah kartela.',
    shortDescription:
      'Güneşin kızılötesi (IR) ışınlarını yansıtarak profilin aşırı ısınmasını önleyen Kumlu Antrasit, RAL 7016, Gece Siyahı ve Gümüş Gri yüzeyler.',
    fullDescription:
      'Bahçelievler’deki yeni kentsel dönüşüm apartmanlarının %80’inde dış cephe standardı olan Antrasit Gri (RAL 7016), Kumlu Antrasit ve Gece Siyahı (RAL 9005) renklerimiz; PVC profillerde Cool Colors UV laminasyon folyosu, alüminyum cam balkon profillerinde ise QUALICOAT sertifikalı elektrostatik fırın boya ile uygulanır.',
    defaultImage: '/images/products/soganli-antrasit-metalik-cephe-renkleri.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Kumlu Antrasit, Düz Antrasit Gri (RAL 7016), Gece Siyahı (RAL 9005) ve Metalik Gümüş',
      'Güneş ısısını %80’e kadar geri yansıtan Cool Colors pigment teknolojisi',
      'EN 513 Sınıf S ağır iklim sertifikası ile soyulma, kabarma ve solmazlık garantisi',
      'İç mekan beyaz, dış cephe antrasit (Çift Yönlü / Tek Yönlü) uygulama opsiyonu',
    ],
    usageAreas: [
      'Kentsel dönüşüm binalarında apartman dış cephe emsalini korumak için',
      'Modern rezidans, loft daire ve kış bahçesi tasarımları',
    ],
    technicalSpecs: {
      profilGenisligi: 'Tüm PVC (60-84 mm) ve Alüminyum Cam Balkon Serileri',
      odacikSayisi: 'Tek Yön (Dış Cephe) veya Çift Yön (İç + Dış) Kaplama',
      contaYapisi: 'Profil Rengiyle Uyumlu Siyah ve Gri TPE/EPDM Contalar',
      camKalinligi: 'Şeffaf, Füme, Bronz ve Alt Buzlu Camlarla Tam Uyum',
      isiYalitimiUw: 'Cool Colors IR Yansıtıcı Yüzey Teknolojisi',
      sesYalitimiDb: 'QUALICOAT 60-80 Mikron Elektrostatik Fırın Boya',
      suSizdirmazlik: 'Tuzlu Su, Nem ve Hava Kirliliğine Tam Direnç',
      ruzgarDirenci: 'EN 513 Sınıf S (Ağır İklim UV Dayanımı)',
      standart: 'QUALICOAT • RAL • EN 513 Sınıf S',
    },
    availableColors: [
      'Antrasit Gri (RAL 7016)',
      'Kumlu Antrasit',
      'Gece Siyahı (RAL 9005)',
      'Metalik Gümüş Gri (RAL 9006)',
      'Bronz Eloksal',
    ],
  },
  {
    slug: 'dogal-ahsap-desenli-laminasyon-renkleri',
    code: 'RENK KARTELASI — AHŞAP',
    name: 'Winsa Altın Meşe, Koyu Ceviz, Fındık & Maun 3D Doğal Ahşap Laminasyon Serisi',
    category: 'Renk Dünyası & Lamine Yüzeyler',
    categorySlug: 'renk-dunyasi',
    tagline: 'Ahşabın doğal sıcaklığını PVC ve alüminyumun sıfır bakım konforuyla buluşturan 3D dokulu yüzeyler.',
    shortDescription:
      'Vernik veya boya bakımı gerektirmeyen, gerçek ahşap damar dokusuna sahip Altın Meşe, Fındık, Ceviz, Maun ve Venge laminasyon kartelası.',
    fullDescription:
      'Ahşap görünümlü pencerelerin ve cam balkonların estetiğini seven ancak her yıl zımpara ve vernik bakımıyla uğraşmak istemeyen kullanıcılar için geliştirilen 3D dokulu laminasyon serimiz; Altın Meşe, Fındık, Koyu Ceviz, Maun ve Venge tonlarıyla hem iç mekana sıcaklık katar hem de dış cephede uzun yıllar ilk günkü canlılığını korur.',
    defaultImage: '/images/products/fevzicakmak-ahsap-desenli-pvc-pencere.jpg?v=2',
    crossSectionSvg: '/images/products/cad-cross-section.svg',
    highlights: [
      'Gerçek ahşap gözenek ve damar hissiyatı veren 3D kabartmalı Renolit/Skai folyo',
      'Alüminyum cam balkon profillerinde yüksek çözünürlüklü fırınlı ahşap transfer baskı',
      'Koyu kahve / karamel gövde profili üzerine kaplama ile kesitlerde kusursuz bütünlük',
      'Bronz ve Füme reflekte temperli camlarla üst düzey mimari uyum',
    ],
    usageAreas: [
      'Bahçe katı daireler, ahşap pergole altı kapatmalar ve müstakil kış bahçeleri',
      'Klasik mimarili apartmanlarda ahşap doğrama emsalini korumak isteyen daireler',
    ],
    technicalSpecs: {
      profilGenisligi: 'Tüm PVC Pencere, Sürme, Panjur ve Cam Balkon Serileri',
      odacikSayisi: 'Karamel / Kahve Gövde Profili Üzerine Çift Yön Laminasyon',
      contaYapisi: 'Karamel ve Siyah EPDM Sızdırmazlık Contaları',
      camKalinligi: 'Bronz, Füme ve Şeffaf Konfor Isıcam Uyumu',
      isiYalitimiUw: 'Güneş Isısını Emen Değil Yansıtan Cool Colors Katmanı',
      sesYalitimiDb: 'Çizilmeye ve Aşınmaya Dayanıklı PMMA Üst Akrilik Katman',
      suSizdirmazlik: 'Çürüme, Kurtlanma ve Kabarma Yapmayan Polimer Yapı',
      ruzgarDirenci: 'EN 513 Sınıf S UV ve İklim Testi Onaylı',
      standart: 'RAL-GZ 716 • EN 513 Sınıf S',
    },
    availableColors: [
      'Altın Meşe (Golden Oak)',
      'Koyu Ceviz',
      'Fındık (Nut Tree)',
      'Maun (Mahogany)',
      'Venge',
      'Krem (RAL 9001)',
    ],
  },
];

const SLUG_ALIASES: Record<string, string> = {
  'panorama-esiksiz-surme': 'panorama-esiksiz-surme-cam-balkon',
  'giyotin-motorlu-cam-balkon': 'giyotin-motorlu-silinebilir-cam',
  'bioklimatik-kis-bahcesi': 'bioklimatik-kis-bahcesi-sistemleri',
  'winstor': 'winstor-monoblok-panjur',
  'lotus': 'lotus-paralel-surme',
  'isicamli-surme-cambalkon': 'panorama-esiksiz-surme-cam-balkon',
  'isicamli-katlanir-cambalkon': 'vera-isicamli-cam-balkon',
  'ekonomik-katlanir-cambalkon': 'vera-katlanir-cam-balkon',
  'tambalkon-giyotin': 'giyotin-motorlu-silinebilir-cam',
  'kis-bahcesi': 'kis-bahcesi-sistemleri',
  'bioklimatik-pergola': 'bioklimatik-kis-bahcesi-sistemleri',
};

export function getWinsaProductBySlug(slug: string): WinsaProductItem | undefined {
  const resolved = SLUG_ALIASES[slug] || slug;
  return WINSA_PRODUCTS.find((p) => p.slug === resolved || p.slug === slug);
}

export function getAllWinsaProductSlugs(): string[] {
  const baseSlugs = WINSA_PRODUCTS.map((p) => p.slug);
  const aliasSlugs = Object.keys(SLUG_ALIASES);
  return Array.from(new Set([...baseSlugs, ...aliasSlugs]));
}

export function getWinsaProductsByCategory(categorySlug: WinsaCategorySlug): WinsaProductItem[] {
  return WINSA_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getProductsByBrand(brand: ProductBrand): WinsaProductItem[] {
  return WINSA_PRODUCTS.filter((p) => p.brand === brand && p.featuredInBrandCatalog);
}
