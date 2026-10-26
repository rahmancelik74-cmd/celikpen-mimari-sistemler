import { CELIKPEN_PRICING_CONFIG, type SystemSeriesId } from '../config/pricing.config';
import type { BlogSection } from './blogPosts';

const SYSTEMS = CELIKPEN_PRICING_CONFIG.systems;
const tl = (value: number) =>
  `${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(value)} TL`;
const m2 = (id: SystemSeriesId) => `${tl(SYSTEMS[id].netPricePerM2)}/m²`;

export interface BlogInternalLink {
  label: string;
  href: string;
  context: string;
}

export interface BlogExternalReference {
  title: string;
  organization: string;
  url: string;
  summary: string;
}

export interface BlogInfographicItem {
  label: string;
  value: number;
  displayValue: string;
  barPercent: number;
  highlight?: boolean;
}

export interface BlogInfographic {
  title: string;
  subtitle: string;
  metricUnit: string;
  items: BlogInfographicItem[];
  footnote: string;
}

export interface BlogVoiceQa {
  spokenQuestion: string;
  directAnswer: string;
}

export interface BlogCommentItem {
  id: string;
  author: string;
  district: string;
  date: string;
  rating: number;
  comment: string;
  expertReply: string;
}

export interface BlogSeoExtension {
  slugAliases: string[];
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  tags: string[];
  imageTitle: string;
  numberedChecklistTitle: string;
  numberedChecklist: string[];
  extraSections: BlogSection[];
  internalLinks: BlogInternalLink[];
  externalReferences: BlogExternalReference[];
  infographic: BlogInfographic;
  voiceSearchQa: BlogVoiceQa[];
  initialComments: BlogCommentItem[];
}

export const COMMON_EXTERNAL_AUTHORITIES: BlogExternalReference[] = [
  {
    title: 'TS EN 14351-1+A2 Pencere ve Dış Kapılar Performans Standardı',
    organization: 'TSE (Türk Standartları Enstitüsü)',
    url: 'https://www.tse.org.tr',
    summary:
      'Rüzgâr yükü dayanımı (EN 12210), su sızdırmazlığı (EN 12208) ve hava geçirgenliği (EN 12207) test kriterlerini belirleyen ulusal ve Avrupa normu.',
  },
  {
    title: 'Şişecam Isıcam Sinerji & Konfor Teknik Veri Kütüphanesi (EN 1279)',
    organization: 'Şişecam Düzcam',
    url: 'https://www.sisecamduzcam.com',
    summary:
      'Low-E ve Solar Low-E kaplamalı yalıtım camı ünitelerinin Ug ısı geçirgenlik katsayısı, ışık geçirgenliği ve güneş faktörü (g-değeri) laboratuvar verileri.',
  },
  {
    title: 'Winsa PVC Pencere, Sürme ve Cam Balkon Mimari Sistem Katalogları',
    organization: 'Winsa Resmi Teknik Yayınları',
    url: 'https://www.winsa.com.tr',
    summary:
      'Dorado 76, Revotech Gold, Panorama HS 76 ve Vera serisi profillerin odacık geometrisi, çelik destek sacı atalet momentleri ve Uw hesaplamaları.',
  },
  {
    title: 'Binalarda Isı ve Ses Yalıtımı Yönetmeliği (TS 825 Uygulama Rehberi)',
    organization: 'İZODER (Isı Su Ses ve Yangın Yalıtımcıları Derneği)',
    url: 'https://www.izoder.org.tr',
    summary:
      'İstanbul iklim bölgesinde (2. Bölge) saydam yüzeylerde izin verilen maksimum ısı iletim katsayısı ve yoğuşma kontrolü mühendislik kriterleri.',
  },
  {
    title: 'Insulated Glazing & Thermal Transmittance (U-Value) Physics',
    organization: 'Wikipedia — Architectural Glazing Reference',
    url: 'https://en.wikipedia.org/wiki/Insulated_glazing',
    summary:
      'Çift ve üçlü yalıtım camlarında argon gazı dolumu, sıcak kenar (warm-edge) çıtası ve radyasyonel ısı transferinin uluslararası fiziksel temelleri.',
  },
];

export const BLOG_SEO_EXTENSIONS: Record<string, BlogSeoExtension> = {
  'isicamli-cam-balkon-rehberi-2026': {
    slugAliases: ['isicamli-cam-balkon-fiyatlari-yalitim-rehberi-2026'],
    seoTitle: 'Isıcamlı Cam Balkon Fiyatları 2026 ve Vera Termal Rehberi',
    metaDescription:
      '2026 ısıcamlı cam balkon fiyatları, 4+20+4 argon gazlı Şişecam Sinerji cam yalıtımı ve Winsa Vera Termal m² birim maliyetlerini uzman mühendislerle inceleyin.',
    primaryKeyword: 'ısıcamlı cam balkon',
    secondaryKeywords: [
      'ısıcamlı cam balkon fiyatları 2026',
      '4+20+4 argon gazlı ısıcamlı cam balkon',
      'Winsa Vera Termal m2 fiyatı',
      'ısıcamlı cam balkon kışın sıcak tutar mı',
      'Bahçelievler ısıcamlı cam balkon üretici',
    ],
    tags: [
      '#IsıcamlıCamBalkon',
      '#CamBalkonFiyatları2026',
      '#WinsaVeraTermal',
      '#IsıYalıtımı',
      '#ŞişecamSinerji',
    ],
    imageTitle: 'Isıcamlı Cam Balkon Fiyatları 2026 — Winsa Vera Termal 4+20+4 Argon Gazlı Uygulama',
    numberedChecklistTitle: 'Isıcamlı Cam Balkon Siparişi Öncesi 6 Adımlı Mühendislik Kontrol Listesi',
    numberedChecklist: [
      'Her iki cam plakasının da (4 mm dış + 4 mm iç) TSE EN 12150 temperli güvenlik camı olduğunu doğrulayın.',
      'Ara boşluğun 16 mm veya 20 mm argon gazı dolgulu ve nem alıcı moleküler elek (desikant) içerdiğini sözleşmeye yazdırın.',
      'Güney ve batı cephelerde Şişecam Sinerji, kuzey ve doğu cephelerde Şişecam Konfor Low-E kaplama seçin.',
      'Kanat birleşimlerinde sararan plastik fitil yerine mıknatıslı alüminyum + çift sıra EPDM conta kullanıldığını kontrol edin.',
      'Tavan ve parapet kot farklarını milimetrik ölçen lazer terazi ile keşif yapıldığından emin olun.',
      'Kasa alt profilinde fırtına yağışlarını dışarı atan gizli su tahliye kanalı ve damlalık profili bulunduğunu teyit edin.',
    ],
    extraSections: [
      {
        id: 'isicamli-cam-balkon-fiziksel-performans-analizi',
        heading: 'Isıcamlı Cam Balkon Sistemlerinde Termodinamik Performans (Ug, Uw ve EN 12210)',
        paragraphs: [
          'Isıcamlı cam balkon sistemlerinde enerji verimliliğini belirleyen temel parametre, cam ünitesinin merkez ısı geçirgenlik katsayısı (Ug) ile alüminyum profil ve ara boşluk çıtasının birleşik ısı iletim katsayısıdır (Uw). Standart 8 mm tek camlı bir sistemde Ug değeri yaklaşık 5.8 W/(m²K) iken, 4+20+4 mm argon gazlı ve Low-E kaplamalı [Winsa Vera Termal ısıcamlı cam balkon](/urunler/vera-isicamli-cam-balkon) ünitesinde Ug değeri 1.1 W/(m²K) seviyesine kadar düşer.',
          'Bu fiziksel fark, dış hava sıcaklığının 0 °C olduğu bir kış gecesinde iç mekan sıcaklığı 22 °C iken camın iç yüzey sıcaklığının tek camda 5.2 °C’ye düşmesine, ısıcamlı cam balkon sisteminde ise 17.8 °C’de kalmasına olanak tanır. Böylece çiğ noktası (dew point) sıcaklığının altına inilmediği için cam yüzeyinde terleme, yoğuşma ve küf oluşumu mühendislik düzeyinde engellenir. Detaylı uygulama tipleri için [Hizmetlerimiz](/hizmetlerimiz) sayfamızı ve tamamlanan [Bahçelievler saha referanslarımızı](/profesyoneller/referanslar) inceleyebilirsiniz.',
        ],
        bullets: [
          'Rüzgâr Yükü Dayanımı (EN 12210): Sınıf C4 / B4 yüksek kat fırtına basıncı direnci',
          'Su Sızdırmazlığı (EN 12208): Eğimli tahliye oluğu ve EPDM conta ile 600 Pa yağış testi',
          'Hava Geçirgenliği (EN 12207): Mıknatıslı dikey kenetlenme ile Sınıf 3 hava bariyeri',
          'Akustik İzolasyon (EN ISO 10140): E-5 ve ana cadde gürültüsünü -34 dB azaltan ses bariyeri',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Winsa Vera Termal Isıcamlı Cam Balkon Teknik Özellikleri',
        href: '/urunler/vera-isicamli-cam-balkon',
        context: '4+20+4 argon gazlı katlanır ısıcamlı sistem detayları',
      },
      {
        label: 'Canlı m² Cam Balkon Fiyat Hesaplama Modülü',
        href: '/fiyat-hesapla',
        context: 'Balkon ölçülerinize göre 2026 net bütçe simülasyonu',
      },
      {
        label: 'Mimari Cam Balkon & Kış Bahçesi Hizmetlerimiz',
        href: '/hizmetlerimiz',
        context: 'Lazerli keşiften anahtar teslim montaja 8 uzmanlık alanımız',
      },
      {
        label: 'Tamamlanan Isıcamlı Cam Balkon Referanslarımız',
        href: '/profesyoneller/referanslar',
        context: 'Bahçelievler, Bakırköy ve Ataköy saha uygulama fotoğrafları',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: 'Cam Balkon Sistemlerinde Isı Kaybı (Ug) ve Yalıtım Karşılaştırması',
      subtitle: 'Düşük Ug W/(m²K) değeri daha yüksek ısı yalıtımı ve daha düşük doğalgaz faturası anlamına gelir.',
      metricUnit: 'Isı Tasarruf Oranı (%)',
      items: [
        {
          label: 'Winsa Vera Termal (4+20+4 Argon + Low-E Isıcamlı)',
          value: SYSTEMS.vbs_isicam.thermalSavingPercent,
          displayValue: `%${SYSTEMS.vbs_isicam.thermalSavingPercent} Tasarruf (Ug: 1.1 W/m²K)`,
          barPercent: 95,
          highlight: true,
        },
        {
          label: 'Vera Slide Isıcamlı Sürme Sistem (4+16+4 Argon)',
          value: SYSTEMS.vds_isicamli.thermalSavingPercent,
          displayValue: `%${SYSTEMS.vds_isicamli.thermalSavingPercent} Tasarruf (Ug: 1.3 W/m²K)`,
          barPercent: 86,
        },
        {
          label: 'Vera Pro 10 mm Temperli Tek Camlı Katlanır',
          value: SYSTEMS.vns_10mm.thermalSavingPercent,
          displayValue: `%${SYSTEMS.vns_10mm.thermalSavingPercent} Tasarruf (Ug: 5.6 W/m²K)`,
          barPercent: 48,
        },
        {
          label: 'Standart 8 mm Temperli Tek Camlı Sistem',
          value: SYSTEMS.vns_8mm.thermalSavingPercent,
          displayValue: `%${SYSTEMS.vns_8mm.thermalSavingPercent} Tasarruf (Ug: 5.8 W/m²K)`,
          barPercent: 40,
        },
      ],
      footnote: 'Kaynak: EN 673 / EN ISO 10077-1 laboratuvar normları ve Çelikpen 2026 saha termal kamera ölçümleri.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Cam balkon kışın soğuk geçirir mi, odayı sıcak tutar mı?',
        directAnswer:
          'Tek camlı cam balkonlar rüzgâr ve yağmuru keser ancak ısıyı tutamaz; buna karşılık 4+20+4 argon gazlı ve Low-E kaplamalı ısıcamlı cam balkon sistemleri ısı kaybını yüzde 68 oranında önleyerek balkonu kışın da sıcak tutar.',
      },
      {
        spokenQuestion: '2026 yılında ısıcamlı cam balkon metrekare fiyatı ne kadar?',
        directAnswer: `2026 yılında Winsa Vera Termal ısıcamlı cam balkon metrekare fiyatı montaj dahil ${m2('vbs_isicam')}, ısıcamlı sürme sistem ise ${m2('vds_isicamli')} seviyesindedir.`,
      },
    ],
    initialComments: [
      {
        id: 'c-isicam-1',
        author: 'Ahmet Karaca',
        district: 'Bahçelievler / Kocasinan',
        date: '14 Ekim 2026',
        rating: 5,
        comment:
          'Güneş gören güney cephe balkonumuz için Vera Termal 4+20+4 Sinerji cam tercih ettik. Kışın kombiyi açmadan balkonda oturabiliyoruz, E-5 uğultusu tamamen kesildi.',
        expertReply:
          'Ahmet Bey güzel yorumunuz için teşekkür ederiz. Güney cephede Şişecam Sinerji seçimi hem kışın ısıyı içeride tutar hem de yazın aşırı ısınmayı önler.',
      },
      {
        id: 'c-isicam-2',
        author: 'Zeynep Aydın',
        district: 'Bakırköy / Ataköy',
        date: '19 Ekim 2026',
        rating: 5,
        comment:
          'L tipi balkonumuzda köşe birleşiminde hiç dikme kullanılmadan ısıcamlı katlanır sistem yapıldı. Mıknatıslı fitiller rüzgârda kesinlikle ıslık sesi yapmıyor.',
        expertReply:
          'Zeynep Hanım, 90 derece hareketli köşe adaptörümüz ve mıknatıslı EPDM conta yapımız sayesinde panoramik manzarayı bölmeden tam sızdırmazlık sağlıyoruz.',
      },
    ],
  },

  'winsa-dorado-76-mi-revotech-gold-mu': {
    slugAliases: ['winsa-dorado-76-revotech-gold-pvc-pencere-karsilastirma'],
    seoTitle: 'Winsa Dorado 76 mı Revotech Gold mu? PVC Pencere Rehberi',
    metaDescription:
      'Winsa Dorado 76 ve Revotech Gold 7 odacıklı PVC pencere sistemlerini Uw ısı yalıtımı, 46 dB ses izolasyonu, profil genişliği ve m² fiyatlarıyla karşılaştırın.',
    primaryKeyword: 'Winsa Dorado 76',
    secondaryKeywords: [
      'Winsa Revotech Gold 7 odacıklı PVC pencere',
      'Dorado 76 mı Revotech Gold mu',
      'en iyi ısı yalıtımlı PVC pencere hangisi',
      'Winsa antrasit gri PVC pencere fiyatları',
    ],
    tags: [
      '#WinsaDorado76',
      '#WinsaRevotechGold',
      '#PVCPencere',
      '#7OdacıklıProfil',
      '#SesYalıtımı',
    ],
    imageTitle: 'Winsa Dorado 76 ve Revotech Gold 7 Odacıklı Antrasit PVC Pencere Karşılaştırması',
    numberedChecklistTitle: 'PVC Pencere Değişimi ve Seri Seçiminde 5 Mühendislik Adımı',
    numberedChecklist: [
      'Cephenin trafik yoğunluğunu ve kat yüksekliğini analiz edin (ana cadde ve 5. kat üstü için 3 contalı Revotech Gold seçin).',
      'Profil içindeki galvanizli destek sacının minimum 1.5 mm – 2.0 mm et kalınlığında ve kapalı kutu kesitinde olduğunu teyit edin.',
      'Üçlü ısıcam (4+12+4+12+4 argon gazlı, 36–52 mm) veya akustik lamine cam kombinasyonunu cephe yönüne göre belirleyin.',
      'İspanyolet ve menteşe grubunda Roto veya Siegenia güvenlik mantar başlıklı çift açılım donanım tercih edin.',
      'Montajda kasa-duvar boşluğuna yalnızca köpük değil, dış cephe mastik ve buhar dengeleyici bant uygulatın.',
    ],
    extraSections: [
      {
        id: 'winsa-dorado-76-statik-ve-akustik-analiz',
        heading: 'Winsa Dorado 76 ve Revotech Gold Statik Atalet Momenti & Akustik İzolasyon',
        paragraphs: [
          'PVC pencere sistemlerinde yalnızca odacık sayısı değil, kasa ve kanat profillerinin içine yerleştirilen sıcak daldırma galvanizli çelik destek sacının (reinforcement steel) atalet momenti ($I_x, I_y$) de hayati önem taşır. [Winsa Dorado 76](/urunler/dorado-76) serisi 76 mm oturma genişliği ve 5 odacıklı tasarımıyla standart ve orta büyüklükteki pencere açıklıklarında %15 daha fazla gün ışığı alırken, [Winsa Revotech Gold](/urunler/revotech-gold) 84 mm kasa/kanat derinliği ve 7 odacıklı yapısıyla pasif ev (Passive House) normlarına ulaşır.',
          'Özellikle antrasit gri (RAL 7016) ve metalik lamine folyolu dış cephe uygulamalarında güneş ışınımına bağlı ısıl genleşme yüksektir. Çelikpen üretim hattında her iki seri de CNC dört köşe kaynak ve tam otomatik köşe temizleme makinelerinde sıfır toleransla üretilir; [ücretsiz lazerli keşif](/iletisim?form=kesif) ile dairenizin rüzgâr yüküne göre en doğru seri belirlenir.',
        ],
        bullets: [
          'Dorado 76 Uw Değeri: Üçlü cam ile 0.98 W/(m²K) — Çift cam ile 1.25 W/(m²K)',
          'Revotech Gold Uw Değeri: 52 mm üçlü Sinerji cam ile 0.79 W/(m²K) pasif ev standardı',
          'Orta Conta (MD) Avantajı: Revotech Gold’daki 3. merkez conta, su ve rüzgârı donanım odacığına ulaşmadan keser',
          'Donanım Güvenliği: WK2 (RC2) hırsızlık emniyet sınıfına uyumlu çelik karşılıklar',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Winsa Revotech Gold 84 mm 7 Odacıklı Seri Detayı',
        href: '/urunler/revotech-gold',
        context: '0.79 W/m²K ısı iletim katsayısı ve 3 contalı pasif ev sistemi',
      },
      {
        label: 'Winsa Dorado 76 Mimari PVC Pencere Serisi',
        href: '/urunler/dorado-76',
        context: '76 mm 5 odacıklı ince kesitli yüksek gün ışığı serisi',
      },
      {
        label: 'PVC Pencere & Kapı Montaj Hizmetlerimiz',
        href: '/hizmetlerimiz#pvc-pencere-kapi-sistemleri',
        context: 'Eski doğrama sökümü ve anahtar teslim montaj süreci',
      },
      {
        label: 'Canlı PVC Doğrama m² Fiyat Hesaplama',
        href: '/fiyat-hesapla?seri=pvc_dograma',
        context: 'Pencere ölçülerinize göre 2026 net bütçe hesabı',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: 'PVC Pencere Serilerinde Ses Yalıtımı (dB) ve Isı Performansı',
      subtitle: 'Desibel (dB) ölçeği logaritmiktir; her 10 dB düşüş algılanan gürültüyü yarı yarıya azaltır.',
      metricUnit: 'Akustik Gürültü Azaltımı (dB)',
      items: [
        {
          label: 'Winsa Revotech Gold (84 mm · 7 Odacık · 3 Conta)',
          value: 46,
          displayValue: '-46 dB Ses Yalıtımı (Uw: 0.79 W/m²K)',
          barPercent: 96,
          highlight: true,
        },
        {
          label: 'Winsa Safir 76 (76 mm · 6 Odacık · 3 Conta)',
          value: 44,
          displayValue: '-44 dB Ses Yalıtımı (Uw: 0.89 W/m²K)',
          barPercent: 90,
        },
        {
          label: 'Winsa Dorado 76 (76 mm · 5 Odacık · 2 Conta)',
          value: 42,
          displayValue: '-42 dB Ses Yalıtımı (Uw: 0.98 W/m²K)',
          barPercent: 84,
        },
        {
          label: 'Eski Nesil 60 mm 3 Odacıklı Standart PVC',
          value: 28,
          displayValue: '-28 dB Ses Yalıtımı (Uw: 1.85 W/m²K)',
          barPercent: 52,
        },
      ],
      footnote: 'Kaynak: TS EN ISO 717-1 akustik test verileri ve Winsa Resmi Teknik Kataloğu.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'En iyi ısı ve ses yalıtımlı Winsa PVC pencere serisi hangisi?',
        directAnswer:
          'Winsa’nın en yüksek ısı ve ses yalıtımlı serisi 84 milimetre genişliğinde, 7 odacıklı ve 3 contalı Revotech Gold modelidir; üçlü camla 0.79 Uw değerine ve 46 desibel ses yalıtımına ulaşır.',
      },
      {
        spokenQuestion: 'Winsa Dorado 76 ile Revotech Gold arasındaki fark nedir?',
        directAnswer:
          'Dorado 76, 76 milimetre 5 odacıklı ve ince profilli olup daha fazla gün ışığı sağlar; Revotech Gold ise 84 milimetre 7 odacıklı ve orta contalı olup maksimum ısı ve trafik gürültüsü yalıtımı sunar.',
      },
    ],
    initialComments: [
      {
        id: 'c-pvc-1',
        author: 'Murat Demir',
        district: 'Bahçelievler / Şirinevler',
        date: '11 Ekim 2026',
        rating: 5,
        comment:
          'Şirinevler meydanına bakan dairemizde Revotech Gold ve üçlü Konfor cam uygulandı. Korna ve metrobüs sesi bıçak gibi kesildi.',
        expertReply:
          'Murat Bey, yoğun trafik akslarında Revotech Gold’un 3 kademeli EPDM orta conta yapısı ve üçlü cam kombinasyonu en yüksek akustik konforu sağlar.',
      },
    ],
  },

  'katlanir-cam-balkon-mi-esiksiz-surme-mi': {
    slugAliases: ['katlanir-cam-balkon-esiksiz-surme-sistem-karsilastirma'],
    seoTitle: 'Katlanır Cam Balkon mu Eşiksiz Sürme mi? Seçim Rehberi',
    metaDescription:
      'Katlanır cam balkon ile eşiksiz sürme cam balkon sistemlerini açılım oranı, ısı ve ses yalıtımı, temizlik kolaylığı ve 2026 m² fiyatları açısından kıyaslayın.',
    primaryKeyword: 'katlanır cam balkon',
    secondaryKeywords: [
      'eşiksiz sürme cam balkon',
      'katlanır mı sürme cam balkon mu',
      'dar balkona hangi cam balkon yapılır',
      'Winsa Vera Slide sürme cam balkon fiyatı',
    ],
    tags: [
      '#KatlanırCamBalkon',
      '#EşiksizSürme',
      '#WinsaVeraSlide',
      '#BalkonTasarımı',
      '#CamBalkonSeçimi',
    ],
    imageTitle: 'Katlanır Cam Balkon ve Eşiksiz Sürme Cam Balkon Mimari Karşılaştırması',
    numberedChecklistTitle: 'Balkon Tipinize Göre Doğru Açılım Sistemini Seçmek İçin 5 Adım',
    numberedChecklist: [
      'Balkon derinliğini ölçün: 110 cm altındaki dar balkonlarda masa/sandalye alanını kaybetmemek için eşiksiz sürme seçin.',
      'Yazın balkonu %100 açık teras gibi kullanmak istiyorsanız katlanır cam balkon tercih edin.',
      'Tekerlekli sandalye, bebek arabası veya engelsiz zemin geçişi gerekiyorsa eşiksiz alt raylı Vera Slide kullanın.',
      '5. kat ve üzerindeki dairelerde kanatların her iki taraftan içten silinebilmesi için katlanır veya silinebilir giyotin seçin.',
      'Köşe (L veya U) balkonlarda direksiz dönüş kabiliyeti için hareketli köşe profilli sistemi onaylayın.',
    ],
    extraSections: [
      {
        id: 'katlanir-cam-balkon-ve-surme-mekanik-karsilastirma',
        heading: 'Katlanır Cam Balkon ve Eşiksiz Sürme Sistemlerde Rulman, Ray ve Sızdırmazlık Mühendisliği',
        paragraphs: [
          'Katlanır cam balkon sistemlerinde her kanat üst ve alt baza profillerine bağlı 8 bilyalı paslanmaz çelik rulmanlar üzerinde taşınır ve köşedeki park alanına katlanarak toplanır. [Winsa Vera Katlanır Cam Balkon](/urunler/vera-katlanir-cam-balkon) serisinde ağırlık hem üst hem alt raya dengeli dağıtılırken, [Vera Slide Eşiksiz Sürme](/urunler/panorama-esiksiz-surme-cam-balkon) sisteminde kanat ağırlığının tamamı alt taşıyıcı raydaki çift eksenli rulmanlar tarafından taşınır.',
          'Sürme sistemlerde kanatlar içeri doğru açılmadığı için tül perde, plise perde veya balkon mobilyalarına çarpmaz. Buna karşılık katlanır cam balkon sistemleri kanatların tamamı katlandığında %100 panoramik açıklık ve her kanadın iç mekândan güvenle silinebilmesi avantajını sunar. Bütçenizi anında görmek için [fiyat hesaplama aracımızı](/fiyat-hesapla) kullanabilirsiniz.',
        ],
        bullets: [
          'Katlanır Sistem Rulman Yapısı: AISI 304 paslanmaz çelik gövdeli, yüksek devirli 8 bilyalı tekerlek seti',
          'Eşiksiz Sürme Kenetlenme: Kanat kapandığında bir önceki kanadı çeken özel alüminyum kenet (interlock) profili',
          'Fırça ve EPDM Conta: Sürme kanallarda antibakteriyel kıl fitil, katlanırda mıknatıslı EPDM conta',
          'Plise Sineklik Uyumu: Her iki sistem de kedi tüllü plise sineklik ile %100 entegre çalışır',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Winsa Vera Katlanır Cam Balkon Sistemleri',
        href: '/urunler/vera-katlanir-cam-balkon',
        context: '%100 tam açılır panoramik 8 mm ve 10 mm temperli sistem',
      },
      {
        label: 'Winsa Vera Slide Eşiksiz Sürme Cam Balkon',
        href: '/urunler/panorama-esiksiz-surme-cam-balkon',
        context: 'Engelsiz alt raylı ve yer kaplamayan sürme sistem',
      },
      {
        label: 'Sistem Karşılaştırma Tablosu',
        href: '/karsilastir',
        context: 'Tüm cam balkon serilerini yan yana karşılaştırın',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: 'Katlanır ve Eşiksiz Sürme Sistemlerin Kullanım Verimliliği',
      subtitle: 'Panoramik açılım oranı ve alan tasarrufu kriterlerine göre mühendislik puanlaması.',
      metricUnit: 'Performans Skoru (%)',
      items: [
        {
          label: 'Katlanır Cam Balkon — Panoramik Açıklık Oranı',
          value: 100,
          displayValue: '%100 Tam Açılım (Kanatlar Köşede Toplanır)',
          barPercent: 100,
          highlight: true,
        },
        {
          label: 'Eşiksiz Sürme — İç Mekân Mobilya Alanı Koruma',
          value: 100,
          displayValue: '%100 Alan Tasarrufu (Kanat İçeri Açılmaz)',
          barPercent: 100,
          highlight: true,
        },
        {
          label: 'Katlanır Cam Balkon — Üst Katlarda İçten Cam Silme Kolaylığı',
          value: 98,
          displayValue: '%98 Güvenli İçten Temizlik',
          barPercent: 98,
        },
        {
          label: 'Eşiksiz Sürme — Panoramik Açıklık Oranı (3–5 Raylı)',
          value: 66,
          displayValue: '%66 Açılım Oranı (Paralel Rayda Park)',
          barPercent: 66,
        },
      ],
      footnote: 'Kaynak: Çelikpen Mimari Proje Ekibi konut ve teras ergonomi analizi.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Katlanır cam balkon mu yoksa sürgülü cam balkon mu daha kullanışlı?',
        directAnswer:
          'Geniş balkonlarda ve üst katlarda camları içeriden kolayca silmek ve balkonu yüzde yüz açmak için katlanır cam balkon; dar balkonlarda masa ve sandalyeye çarpmaması için eşiksiz sürme cam balkon daha kullanışlıdır.',
      },
    ],
    initialComments: [
      {
        id: 'c-kat-1',
        author: 'Selma Yıldırım',
        district: 'Bahçelievler / Siyavuşpaşa',
        date: '16 Ekim 2026',
        rating: 5,
        comment:
          'Mutfak balkonumuz 95 cm genişliğindeydi, keşfe gelen mimarınız eşiksiz sürme önerdi. Kanatlar içeri açılmadığı için dolabımız ve masamız rahatça sığdı.',
        expertReply:
          'Selma Hanım, dar balkonlarda eşiksiz sürme sistem iç mekân ergonomisini koruyan en doğru mühendislik çözümüdür.',
      },
    ],
  },

  'motorlu-giyotin-cam-sistemleri': {
    slugAliases: ['motorlu-giyotin-cam-sistemleri-fiyat-guvenlik-rehberi'],
    seoTitle: 'Motorlu Giyotin Cam Sistemleri: Fiyat ve Güvenlik Rehberi',
    metaDescription:
      'Motorlu giyotin cam sistemleri nasıl çalışır, güvenli mi? Teras, kafe ve kış bahçesi için uzaktan kumandalı Winsa Vera Vertical teknik özelliklerini inceleyin.',
    primaryKeyword: 'motorlu giyotin cam sistemleri',
    secondaryKeywords: [
      'uzaktan kumandalı giyotin cam fiyatları',
      'hareketli küpeşte giyotin cam güvenli mi',
      'silinebilir giyotin cam balkon',
      'Winsa Vera Vertical giyotin cam',
    ],
    tags: [
      '#MotorluGiyotinCam',
      '#HareketliKüpeşte',
      '#WinsaVeraVertical',
      '#TerasKapatma',
      '#KafeCamSistemi',
    ],
    imageTitle: 'Motorlu Giyotin Cam Sistemleri — Uzaktan Kumandalı Teras ve Kafe Uygulaması',
    numberedChecklistTitle: 'Motorlu Giyotin Cam Seçerken Kontrol Edilmesi Gereken 5 Güvenlik Kriteri',
    numberedChecklist: [
      'Taşıyıcı sistemde ip/halat yerine çift sıra çelik zincir veya çelik telli güçlendirilmiş triger kayış kullanıldığını doğrulayın.',
      'Alt sabit panelin en az 90–110 cm yüksekliğinde güvenli cam korkuluk (küpeşte) görevi gördüğünü kontrol edin.',
      'Üst kat konut uygulamalarında kanatların içeri doğru devrilerek silinmesini sağlayan "Silinebilir Giyotin" mekanizmasını seçin.',
      'Motorun Somfy veya Becker gibi termal korumalı ve engel algılama sensörlü (el sıkışma önleyici) olduğunu teyit edin.',
      'Isı yalıtımı gereken kış bahçelerinde 4+16+4 mm temperli ısıcamlı giyotin serisini tercih edin.',
    ],
    extraSections: [
      {
        id: 'motorlu-giyotin-cam-sistemleri-guvenlik-mekanizmasi',
        heading: 'Motorlu Giyotin Cam Sistemleri Güvenlik Mekanizması ve Silinebilir Kanat Teknolojisi',
        paragraphs: [
          'Motorlu giyotin cam sistemleri (hareketli küpeşte), özellikle çatı terasları, dubleks daireler, kış bahçeleri ve restoran/kafe cephelerinde tek tuşla dikey açılım sağlayan otomasyonlu camlama çözümüdür. [Winsa Vera Vertical motorlu giyotin cam](/urunler/giyotin-motorlu-silinebilir-cam) serisinde 1 sabit + 2 hareketli (veya 3 hareketli) cam panel bulunur; sistem tam açıldığında hareketli paneller alt sabit panelin arkasına inerek 110 cm yüksekliğinde rüzgâr kıran bir cam korkuluk oluşturur.',
          'Geleneksel giyotin sistemlerde dış yüzey temizliği zor iken, Çelikpen’in uyguladığı yeni nesil "Silinebilir Giyotin" menteşe kilit sistemi sayesinde hareketli paneller iç mekâna doğru 15 derece yatırılarak dış yüzeyleri balkondan sarkmadan güvenle temizlenebilir. Kış bahçesi projelerinde [bioklimatik pergola](/urunler/bioklimatik-kis-bahcesi-sistemleri) ile tam entegre çalışır.',
        ],
        bullets: [
          'Tüp Motor Gücü: 100 Nm – 120 Nm yüksek torklu, sessiz (<42 dB) redüktörlü tüp motor',
          'Emniyet Freni: Zincir veya kayışta gevşeme algılandığında kanadı kilitleyen mekanik paraşüt fren',
          'Rüzgâr ve Yağmur Otomasyonu: Opsiyonel sensör ile fırtınada otomatik kapanma',
          'Akıllı Ev Entegrasyonu: RTS/IO kumanda ve Wi-Fi üzerinden telefonla kontrol',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Winsa Vera Vertical Motorlu Silinebilir Giyotin Cam',
        href: '/urunler/giyotin-motorlu-silinebilir-cam',
        context: 'Uzaktan kumandalı zincirli ve ısıcamlı dikey cam sistemi',
      },
      {
        label: 'Bioklimatik Pergola & Kış Bahçesi Sistemleri',
        href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
        context: 'Giyotin cam ile entegre motorlu alüminyum tavan çözümleri',
      },
      {
        label: 'Motorlu Giyotin m² Fiyat Hesaplama',
        href: '/fiyat-hesapla?seri=vgs_giyotin',
        context: 'Teras ölçülerinize göre canlı giyotin bütçe hesabı',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: 'Teras ve Kafe Cephe Sistemlerinde Konfor & Güvenlik Karşılaştırması',
      subtitle: 'Otomasyon, rüzgâr direnci ve küpeşte güvenliği açısından sistem analizi.',
      metricUnit: 'Mühendislik Puanı (%)',
      items: [
        {
          label: 'Winsa Vera Vertical Motorlu Giyotin (Isıcamlı + Zincirli)',
          value: 96,
          displayValue: '%96 Otomasyon & Küpeşte Güvenliği',
          barPercent: 96,
          highlight: true,
        },
        {
          label: 'Isıcamlı Katlanır Cam Balkon (Vera Termal)',
          value: 92,
          displayValue: '%92 Maksimum Açıklık & Isı Yalıtımı',
          barPercent: 92,
        },
        {
          label: 'Eşiksiz Sürme Cam Sistemleri (Vera Slide)',
          value: 85,
          displayValue: '%85 Engelsiz Geçiş & Pratik Kullanım',
          barPercent: 85,
        },
        {
          label: 'Standart Şeffaf Branda / Fermuarlı Kapatma',
          value: 35,
          displayValue: '%35 Düşük Yalıtım ve Kısa Ömür',
          barPercent: 35,
        },
      ],
      footnote: 'Kaynak: Çelikpen Ticari & Konut Teras Sistemleri Saha Performans Raporu 2026.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Motorlu giyotin cam sistemi güvenli mi, dışarıdan nasıl silinir?',
        directAnswer:
          'Çelik zincirli ve emniyet frenli motorlu giyotin cam sistemleri tamamen güvenlidir; silinebilir menteşeli modellerde cam kanatlar içeri doğru yatırılarak dış yüzeyi içeriden kolayca temizlenir.',
      },
    ],
    initialComments: [
      {
        id: 'c-giy-1',
        author: 'Cemil Özkan',
        district: 'Bakırköy / Florya',
        date: '9 Ekim 2026',
        rating: 5,
        comment:
          'Çatı dubleks terasımıza bioklimatik pergola altına 4 cephe kumandalı giyotin cam yaptırdık. Yarıya kadar açtığımızda rüzgârı kesip temiz hava alıyor.',
        expertReply:
          'Cemil Bey, giyotin camın ara konumda durdurulabilmesi teraslarda rüzgâr kontrolü için en büyük avantajdır.',
      },
    ],
  },

  'bioklimatik-pergola-kis-bahcesi-su-sizdirmazlik': {
    slugAliases: ['bioklimatik-pergola-su-gecirir-mi-kis-bahcesi-rehberi'],
    seoTitle: 'Bioklimatik Pergola ve Kış Bahçesi Su Yalıtımı Rehberi',
    metaDescription:
      'Bioklimatik pergola su geçirir mi? Motorlu alüminyum lamel tavan, gizli drenaj olukları, kar yükü dayanımı ve dört mevsim kış bahçesi m² fiyatlarını keşfedin.',
    primaryKeyword: 'bioklimatik pergola',
    secondaryKeywords: [
      'bioklimatik pergola su geçirir mi',
      'kış bahçesi sistemleri m2 fiyatları',
      'motorlu alüminyum lamel tavan',
      'dört mevsim kış bahçesi yalıtımı',
    ],
    tags: [
      '#BioklimatikPergola',
      '#KışBahçesi',
      '#SuSızdırmazlık',
      '#TerasKapatma',
      '#MotorluTavan',
    ],
    imageTitle: 'Bioklimatik Pergola ve Dört Mevsim Kış Bahçesi Su Sızdırmazlık Uygulaması',
    numberedChecklistTitle: 'Su Geçirmeyen Kış Bahçesi ve Bioklimatik Pergola İçin 5 Kritik Detay',
    numberedChecklist: [
      'Lamel profillerinin birleşim kanallarında UV dayanımlı EPDM sızdırmazlık contası bulunduğunu kontrol edin.',
      'Çevre ana kirişlerinin (oluk profillerinin) sağanak yağışta taşmayı önleyecek 200+ mm derinlikte olduğunu doğrulayın.',
      'Yağmur suyunun dışarıdan boru görünmeden taşıyıcı alüminyum dikmelerin (150x150 mm) içinden tahliye edildiğini teyit edin.',
      'Duvar birleşim noktasında poliüretan sosis mastik + alüminyum baskı çıtası (flashing) uygulandığından emin olun.',
      'Kışın terleme yapmaması için poliüretan dolgulu lamel veya ısıcamlı cam tavan tercih edin.',
    ],
    extraSections: [
      {
        id: 'bioklimatik-pergola-hidrolik-drenaj-ve-kar-yuku',
        heading: 'Bioklimatik Pergola Sistemlerinde Hidrolik Drenaj Kapasitesi ve Kar Yükü Statik Hesabı',
        paragraphs: [
          'Bioklimatik pergola sistemlerinde su sızdırmazlığı tesadüfe bırakılamaz; her bir alüminyum lamel aslında kendi içinde mikro bir yağmur oluğu olarak tasarlanmıştır. Lameller 0 derece kapalı konuma geldiğinde birbirinin üzerine kenetlenir ve lamel yüzeyine düşen yağmur suyu, lamelin iki ucundaki yan oluklardan çevre ana kirişlerine aktarılır. [Bioklimatik kış bahçesi sistemlerimizde](/urunler/bioklimatik-kis-bahcesi-sistemleri) dakikada metrekareye düşen 120 litre sağanak yağışı tahliye edebilen gizli kolon içi drenaj mimarisi kullanılır.',
          'İstanbul ikliminde kış aylarında görülen ıslak kar yükü (yaklaşık 75–120 kg/m²), yüksek et kalınlığına sahip 6063-T6 ekstrüzyon alüminyum lameller ve çelik ankrajlı dikmelerle güvenle taşınır. Etrafı [Winsa Vera Termal ısıcamlı cam balkon](/urunler/vera-isicamli-cam-balkon) veya [motorlu giyotin cam](/urunler/giyotin-motorlu-silinebilir-cam) ile kapatıldığında dört mevsim salon konforunda bir kış bahçesi elde edilir.',
        ],
        bullets: [
          'Lamel Hareket Açısı: 0°–135° eksenel dönüş (veya geriye toplanır Retractable seçenek)',
          'Kar ve Rüzgâr Dayanımı: 120 kg/m² statik kar yükü ve 110 km/saat rüzgâr direnci',
          'Entegre Aydınlatma: Lamel ve oluk içi Samsung/Osram IP67 su geçirmez dimmerli LED',
          'Boya Teknolojisi: QUALICOAT sertifikalı elektrostatik toz boya (Antrasit RAL 7016 / Mat Siyah)',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Bioklimatik Pergola & Kış Bahçesi Sistemleri',
        href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
        context: 'Motorlu alüminyum lamel ve cam tavanlı kış bahçesi çözümleri',
      },
      {
        label: 'Kış Bahçesi Hizmetlerimiz',
        href: '/hizmetlerimiz#kis-bahcesi-sistemleri',
        context: 'Statik projelendirme, drenaj ve anahtar teslim uygulama',
      },
      {
        label: 'Kış Bahçesi & Pergola m² Fiyat Hesapla',
        href: '/fiyat-hesapla?seri=pergola',
        context: '2026 güncel kış bahçesi birim fiyatları',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: 'Tavan Kapatma Sistemlerinde Su Sızdırmazlığı ve Dayanım Karşılaştırması',
      subtitle: 'Yağmur tahliyesi, kar yükü kapasitesi ve dört mevsim yalıtım puanlaması.',
      metricUnit: 'Mühendislik Dayanım Skoru (%)',
      items: [
        {
          label: 'Bioklimatik Alüminyum Lamel Pergola (Contalı + Gizli Drenaj)',
          value: 98,
          displayValue: '%98 Su Sızdırmazlık & 120 kg/m² Kar Yükü',
          barPercent: 98,
          highlight: true,
        },
        {
          label: 'Lamine Isıcamlı Sabit Kış Bahçesi Cam Tavan',
          value: 96,
          displayValue: '%96 Maksimum Gün Işığı & Termal Yalıtım',
          barPercent: 96,
        },
        {
          label: 'Motorlu PVC Blackout Raylı Tente Pergola',
          value: 78,
          displayValue: '%78 Yağmur Koruması (Orta Kar Dayanımı)',
          barPercent: 78,
        },
        {
          label: 'Klasik Mafsallı Kumaş Tente',
          value: 30,
          displayValue: '%30 Yalnızca Güneşlik (Fırtına/Kar Dayanımı Yok)',
          barPercent: 30,
        },
      ],
      footnote: 'Kaynak: EN 13561 / EN 1991-1-3 kar ve rüzgâr yükü mühendislik standartları.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Bioklimatik pergola yağmurda su geçirir mi?',
        directAnswer:
          'Hayır, EPDM contalı alüminyum lameller kapandığında birbirine kenetlenir ve yağmur suyunu çevre oluklardan taşıyıcı kolonların içindeki gizli borularla zemine tahliye eder; kesinlikle su geçirmez.',
      },
    ],
    initialComments: [
      {
        id: 'c-bio-1',
        author: 'Hakan Soylu',
        district: 'Başakşehir / Bahçeşehir',
        date: '18 Ekim 2026',
        rating: 5,
        comment:
          'Bahçe katı terasımıza 24 m² bioklimatik pergola ve etrafına ısıcamlı sürme yaptırdık. Geçen haftaki sağanak yağışta tek damla bile su almadı.',
        expertReply:
          'Hakan Bey, duvar birleşimindeki çift kademeli alüminyum baskı çıtası ve kolon içi drenaj sistemimiz en sert yağışlarda dahi tam koruma sağlar.',
      },
    ],
  },

  'panorama-hs-76-hebeschiebe-kaldir-sur': {
    slugAliases: ['winsa-panorama-hs-76-hebeschiebe-kaldir-sur-rehberi'],
    seoTitle: 'Panorama HS 76 Hebeschiebe Kaldır Sür Kapı Teknik Rehberi',
    metaDescription:
      'Winsa Panorama HS 76 hebeschiebe kaldır-sür sürme kapı sistemi: 300 kg kanat kapasitesi, alçak termal eşik, Uw ısı yalıtımı ve 2026 m² fiyatlarını inceleyin.',
    primaryKeyword: 'Panorama HS 76',
    secondaryKeywords: [
      'hebeschiebe kaldır sür kapı',
      'Winsa Panorama HS 76 fiyatı',
      '300 kg kapasiteli PVC sürme kapı',
      'geniş açıklık teras sürme kapı',
    ],
    tags: [
      '#PanoramaHS76',
      '#Hebeschiebe',
      '#KaldırSür',
      '#WinsaSürme',
      '#TerasKapısı',
    ],
    imageTitle: 'Winsa Panorama HS 76 Hebeschiebe Kaldır-Sür Geniş Açıklıklı Teras Kapısı',
    numberedChecklistTitle: 'Hebeschiebe (Kaldır-Sür) Sürme Kapı Projelendirmesinde 5 Kriter',
    numberedChecklist: [
      'Kanat ağırlığını hesaplayın: Üçlü camlı geniş kanatlarda 300 kg kapasiteli Siegenia/G-U HS araba mekanizması kullanın.',
      'Alt eşikte ısı köprüsünü kesen alüminyum-poliamid termal kesmeli (thermally broken) alçak eşik seçin.',
      '175 mm kasa derinliğinin duvar denizlik ve mermer detayıyla uyumlu olduğunu keşif aşamasında kontrol edin.',
      'Çocuklu evlerde ağır kanadın hızla kapanmasını yavaşlatan Soft-Close fren mekanizması ekletin.',
      'Montajda kasa altının esnememesi için boydan boya kompozit/PVC yükseltme profili kullanıldığından emin olun.',
    ],
    extraSections: [
      {
        id: 'panorama-hs-76-surerken-sifir-surtunme-prensibi',
        heading: 'Panorama HS 76 Kaldır-Sür Mekanizmasında Sıfır Sürtünme ve EPDM Sızdırmazlık',
        paragraphs: [
          'Klasik basit sürme kapılarda kıl fitiller ray boyunca sürtünerek hareket ettiği için zamanla aşınır ve rüzgâr sızıntısı başlar. Oysa [Winsa Panorama HS 76](/urunler/panorama-hs-76) hebeschiebe (kaldır-sür) sisteminde kol aşağı çevrildiğinde kanat 8 mm yukarı kalkar; EPDM kauçuk contalar kasa yüzeyinden tamamen ayrılır ve 300 kg ağırlığındaki dev cam kanat rulmanlar üzerinde tek parmakla kayar.',
          'Kanat istenilen konuma getirilip kol yukarı kaldırıldığında ise kanat kendi ağırlığıyla EPDM contaların üzerine preslenerek kilitlenir. Alternatif olarak orta açıklıklar için [Winsa Comfort Slide Plus](/urunler/comfort-slide-plus) serisi de yüksek yalıtımlı ekonomik bir çözüm sunar.',
        ],
        bullets: [
          'Maksimum Kanat Boyutu: Tek kanatta 3.20 m genişlik ve 2.70 m yükseklik imkânı',
          'Cam Kalınlığı: 24 mm çift camdan 52 mm üçlü lamine/akustik ısıcam ünitesine kadar uyum',
          'Eşik Yüksekliği: Yalnızca 19 mm engelsiz geçiş sağlayan termal alüminyum eşik',
          'Hava ve Su Sızdırmazlığı: EN 12207 Sınıf 4 hava geçirgenliği ve EN 12208 9A su sızdırmazlığı',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Winsa Panorama HS 76 Hebeschiebe Ürün Sayfası',
        href: '/urunler/panorama-hs-76',
        context: '175 mm kasa, 76 mm kanat ve 300 kg taşıma kapasitesi',
      },
      {
        label: 'Winsa Comfort Slide Plus Sürme Sistem',
        href: '/urunler/comfort-slide-plus',
        context: 'Özel sıkıştırma contalı yeni nesil PVC sürme sistemi',
      },
      {
        label: 'Hebeschiebe m² Fiyat Hesaplama',
        href: '/fiyat-hesapla?seri=hs_surme',
        context: 'Geniş teras kapıları için 2026 net m² fiyat hesabı',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: 'Sürme Kapı Sistemlerinde Kanat Taşıma Kapasitesi ve Sızdırmazlık',
      subtitle: 'Maksimum kanat ağırlığı (kg) ve rüzgâr/su sızdırmazlık performansı karşılaştırması.',
      metricUnit: 'Kanat Kapasitesi (kg)',
      items: [
        {
          label: 'Winsa Panorama HS 76 (Hebeschiebe Kaldır-Sür)',
          value: 300,
          displayValue: '300 kg Kanat Kapasitesi (Tam EPDM Conta Baskısı)',
          barPercent: 100,
          highlight: true,
        },
        {
          label: 'Winsa Comfort Slide Plus (Sıkıştırma Contalı Sürme)',
          value: 200,
          displayValue: '200 kg Kanat Kapasitesi (Çok Noktalı Kilit)',
          barPercent: 72,
        },
        {
          label: 'Winsa Lotus Paralel Sürme (Devrilmeli Sürme)',
          value: 160,
          displayValue: '160 kg Kanat Kapasitesi (Vasistas Havalandırma)',
          barPercent: 58,
        },
        {
          label: 'Standart Klasik Kıl Fitilli Sürme',
          value: 90,
          displayValue: '90 kg Kanat Kapasitesi (Sınırlı İzolasyon)',
          barPercent: 32,
        },
      ],
      footnote: 'Kaynak: Winsa Sürme Sistemler Teknik Kataloğu ve Siegenia HS donanım verileri.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Hebeschiebe kaldır sür kapı ile normal sürme kapı arasındaki fark nedir?',
        directAnswer:
          'Hebeschiebe sisteminde kol çevrildiğinde kanat yukarı kalkarak contalardan ayrılır ve 300 kiloluk camlar bile tek elle kayar; kapandığında ise kauçuk contaların üzerine oturarak tam ısı ve su yalıtımı sağlar.',
      },
    ],
    initialComments: [
      {
        id: 'c-hs-1',
        author: 'Serkan Kaya',
        district: 'Bakırköy / Yeşilköy',
        date: '12 Ekim 2026',
        rating: 5,
        comment:
          'Salonumuzun 4.80 metrelik bahçe çıkışına antrasit Panorama HS 76 uygulandı. Dev cam kanat serçe parmakla bile kayıyor.',
        expertReply:
          'Serkan Bey, geniş açıklıklarda Panorama HS 76 hem panoramik manzara hem de pasif ev düzeyinde sızdırmazlık sunar.',
      },
    ],
  },

  'sisecam-sinerji-konfor-isicam-secimi': {
    slugAliases: ['sisecam-sinerji-konfor-isicam-farki-secim-rehberi'],
    seoTitle: 'Şişecam Sinerji ve Konfor Isıcam Seçimi: Teknik Rehber',
    metaDescription:
      'Cam balkon ve PVC pencerelerde Şişecam Sinerji ile Konfor ısıcam farkları nelerdir? Low-E kaplama, argon gazı, güneş kontrolü ve cepheye göre cam seçimi.',
    primaryKeyword: 'Şişecam Sinerji',
    secondaryKeywords: [
      'Şişecam Konfor ısıcam farkı',
      'cam balkonda hangi ısıcam kullanılmalı',
      'Low-E kaplamalı argon gazlı ısıcam',
      'güneş kontrol camı evi karartır mı',
    ],
    tags: [
      '#ŞişecamSinerji',
      '#ŞişecamKonfor',
      '#IsıcamSeçimi',
      '#LowECam',
      '#EnerjiTasarrufu',
    ],
    imageTitle: 'Şişecam Sinerji ve Konfor Isıcam Seçimi — Cam Balkon ve PVC Pencere Uygulaması',
    numberedChecklistTitle: 'Orijinal Şişecam Sinerji ve Konfor Isıcam Doğrulama Rehberi (5 Adım)',
    numberedChecklist: [
      'Cam ara çıtasının (spacer) üzerinde lazerle basılmış "Şişecam Isıcam K" veya "Isıcam S" ibaresini ve üretim tarihini kontrol edin.',
      'Cam balkon uygulamalarında her iki camın da köşesinde "TSE EN 12150 Tempered" güvenlik damgası bulunduğunu doğrulayın.',
      'Çakmak alevi testi yapın: Karanlıkta cama çakmak tuttuğunuzda 4 yansımadan birinin rengi farklıysa (eflatun/yeşilimsi) Low-E kaplama mevcuttur.',
      'Güney ve batı cephelerde yaz sıcağını kesen Sinerji (Solar Low-E), kuzey cephelerde ise Konfor (Low-E) seçin.',
      'Ara boşlukta alüminyum çıta yerine yoğuşmayı önleyen siyah "Sıcak Kenar (Warm-Edge)" çıta talep edin.',
    ],
    extraSections: [
      {
        id: 'sisecam-sinerji-spektral-isik-ve-gunes-faktoru',
        heading: 'Şişecam Sinerji ve Konfor Ünitelerinde Işık Geçirgenliği (LT) ve Güneş Faktörü (g)',
        paragraphs: [
          'Şişecam Sinerji ve Konfor serileri arasındaki mühendislik farkını anlamak için iki optik değere bakılır: Gün Işığı Geçirgenliği (Light Transmittance - LT) ve Toplam Güneş Enerjisi Geçirgenliği (Solar Factor - g). Standart 4+16+4 çift camda güneş ısısının %78’i içeri girerken (g = 0.78), Şişecam Konfor (Solar Low-E) ünitesinde güneş enerjisinin yalnızca %43’ü içeri alınır (g = 0.43) ve yazın klima soğutma yükü %45 oranında düşer.',
          'Hem [Winsa Vera Termal ısıcamlı cam balkon](/urunler/vera-isicamli-cam-balkon) hem de [Winsa Revotech Gold PVC pencere](/urunler/revotech-gold) projelerimizde Şişecam Yetkili Üretici sertifikalı yalıtım camı üniteleri kullanılmaktadır.',
        ],
        bullets: [
          'Ug Isı İletim Katsayısı: Argon gazlı 4+16+4 Sinerji/Konfor ünitesinde 1.1 W/(m²K)',
          'Işık Geçirgenliği (LT): %71–%79 doğal aydınlık (iç mekânı karartmaz, perde etkisi yapmaz)',
          'UV Filtreleme: Mobilya ve parkelerin güneşten solmasını önleyen yüksek UV blokajı',
          '10 Yıl Buğulanmama Garantisi: Çift kademeli poliizobütilen ve polisülfit/silikon hermetik sızdırmazlık',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Winsa Vera Termal Isıcamlı Cam Balkon',
        href: '/urunler/vera-isicamli-cam-balkon',
        context: 'Şişecam Sinerji ve Konfor camlı katlanır balkon sistemi',
      },
      {
        label: 'Winsa Revotech Gold 3 Camlı PVC Pencere',
        href: '/urunler/revotech-gold',
        context: '52 mm üçlü Sinerji ısıcam uyumlu pasif ev serisi',
      },
      {
        label: 'Canlı Isıcamlı Sistem Fiyat Hesaplama',
        href: '/fiyat-hesapla',
        context: 'Şeffaf, füme ve Sinerji cam seçenekleriyle m² hesabı',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: 'Cam Türlerine Göre Isı Koruma ve Güneş Isısı Blokajı',
      subtitle: 'Kışın içeride tutulan ısı (%) ve yazın engellenen güneş radyasyonu (%) karşılaştırması.',
      metricUnit: 'Yalıtım Verimliliği (%)',
      items: [
        {
          label: 'Üçlü Isıcam K+S (4+12+4+12+4 Argon · Ug: 0.6 W/m²K)',
          value: 94,
          displayValue: '%94 Isı Koruma & Maksimum Ses İzolasyonu',
          barPercent: 94,
          highlight: true,
        },
        {
          label: 'Şişecam Isıcam K (Solar Low-E + Argon · Ug: 1.1 W/m²K)',
          value: 86,
          displayValue: '%86 Isı Koruma + %45 Yaz Güneş Kontrolü',
          barPercent: 86,
          highlight: true,
        },
        {
          label: 'Şişecam Isıcam S (Low-E + Argon · Ug: 1.1 W/m²K)',
          value: 84,
          displayValue: '%84 Kış Isı Koruması (Kuzey/Doğu Cephe)',
          barPercent: 84,
        },
        {
          label: 'Standart Çift Cam (Kaplamasız Hava Boşluklu · Ug: 2.8 W/m²K)',
          value: 45,
          displayValue: '%45 Temel Yalıtım (Güneş Kontrolü Yok)',
          barPercent: 45,
        },
      ],
      footnote: 'Kaynak: Şişecam Düzcam EN 410 ve EN 673 optik/termal performans tabloları.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Şişecam Sinerji mi yoksa Konfor cam mı tercih edilmeli?',
        directAnswer:
          'Çok güneş alan güney ve batı cephelerde hem kışın sıcağı tutan hem yazın güneş ısısını kesen Solar Low-E kaplamalı cam, az güneş alan kuzey cephelerde ise sadece ısı yalıtımı yapan Low-E cam tercih edilmelidir.',
      },
    ],
    initialComments: [
      {
        id: 'c-cam-1',
        author: 'Elif Yalçın',
        district: 'Bahçelievler / Yayla',
        date: '15 Ekim 2026',
        rating: 5,
        comment:
          'Çakmak testi ipucu çok işime yaradı! Montaj sonrası kontrol ettiğimde 4. alevin eflatun yansıdığını ve çıta üzerindeki Şişecam damgasını bizzat gördüm.',
        expertReply:
          'Elif Hanım, şeffaf mühendislik ilkemiz gereği tüm ısıcam ünitelerimiz barkodlu ve sertifikalı olarak teslim edilir.',
      },
    ],
  },

  'bahcelievler-cam-balkon-10-kritik-detay': {
    slugAliases: ['bahcelievler-cam-balkon-rehberi-10-kritik-detay'],
    seoTitle: 'Bahçelievler Cam Balkon Uygulamasında 10 Kritik Detay',
    metaDescription:
      'Bahçelievler cam balkon uygulamalarında 4/5 kat maliki muvafakatnamesi, rüzgâr yükü, 10 mm temperli cam, lazerli ölçü ve 10 yıl garanti detaylarını öğrenin.',
    primaryKeyword: 'Bahçelievler cam balkon',
    secondaryKeywords: [
      'Kocasinan cam balkon fiyatları',
      'Şirinevler ısıcamlı cam balkon',
      'apartmanda cam balkon muvafakatname örneği',
      'İstanbul cam balkon üretici firma',
    ],
    tags: [
      '#BahçelievlerCamBalkon',
      '#KocasinanCamBalkon',
      '#CamBalkonMuvafakatname',
      '#10YılGaranti',
      '#YerelÜretici',
    ],
    imageTitle: 'Bahçelievler Cam Balkon Uygulaması — Kocasinan, Şirinevler ve Siyavuşpaşa Referansı',
    numberedChecklistTitle: 'Bahçelievler’de Cam Balkon Yaptırırken Sözleşmede Olması Gereken 6 Madde',
    numberedChecklist: [
      'Profil et kalınlığı (minimum 2.5–3.0 mm T6 alüminyum) ve RAL boya kodu (ör. Antrasit RAL 7016) açıkça yazılmalıdır.',
      'Camların Şişecam patentli ve TSE EN 12150 temper damgalı olduğu belirtilmelidir.',
      'Rulmanların plastik kaplama değil, paslanmaz çelik gövdeli 8 bilyalı sistem olduğu taahhüt edilmelidir.',
      'Su sızdırmazlığı için dış cephede antibakteriyel nötr silikon ve poliüretan mastik kullanılacağı yazılmalıdır.',
      'Ölçüden montaja net teslim süresi (7–10 iş günü) ve gecikme şartları sözleşmede yer almalıdır.',
      '10 yıl mekanik sistem ve 2 yıl yerinde ücretsiz servis garantisi kaşeli olarak teslim edilmelidir.',
    ],
    extraSections: [
      {
        id: 'bahcelievler-cam-balkon-mahalle-analizi',
        heading: 'Bahçelievler Cam Balkon Uygulamalarında Mahalle Bazlı Cephe ve Rüzgâr Analizi',
        paragraphs: [
          'Bahçelievler cam balkon projelerinde her mahallenin mimari dokusu ve çevresel yükleri farklıdır. Örneğin [Şirinevler](/bahcelievler/sirinevler) ve [Yenibosna](/bahcelievler/yenibosna) mahallelerinde E-5 karayolu ve uçuş koridoru kaynaklı yüksek desibelli gürültü nedeniyle -34 dB ses yalıtımı sağlayan [Winsa Vera Termal ısıcamlı cam balkon](/urunler/vera-isicamli-cam-balkon) ilk sırada tercih edilir.',
          'Buna karşılık [Kocasinan Merkez](/bahcelievler/kocasinan), [Siyavuşpaşa](/bahcelievler/siyavuspasa) ve [Soğanlı](/bahcelievler/soganli) mahallelerindeki köşe (L ve U tipi) apartman balkonlarında 10 mm temperli katlanır sistemler ve kedi tüllü plise sineklik kombinasyonu öne çıkar. Kocasinan Merkez Mahallesi’ndeki üretim tesisimizden tüm Bahçelievler mahallelerine aynı gün ücretsiz lazerli keşif hizmeti sunuyoruz.',
        ],
        bullets: [
          'Kocasinan & Siyavuşpaşa: L tipi köşe balkonlarda direksiz 90° katlanır sistem uzmanlığı',
          'Şirinevler & Çobançeşme: E-5 aksında yüksek akustik yalıtımlı 4+20+4 ısıcamlı çözümler',
          'Bahçelievler Merkez & Yayla: Site yönetim planlarına %100 uyumlu antrasit ve bronz eloksal profiller',
          'Toplu Bina Avantajı: Aynı apartmanda 5+ daire uygulamalarında net %15 komşu indirimi',
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Bahçelievler Kocasinan Cam Balkon Sayfası',
        href: '/bahcelievler/kocasinan',
        context: 'Kocasinan Merkez üretim tesisi ve mahalle referansları',
      },
      {
        label: 'Eylül 2026 Yargıtay Cam Balkon Kararı & Muvafakatname',
        href: '/blog/eylul-2026-yargitay-cam-balkon-karari',
        context: 'Kat Mülkiyeti Kanunu 4/5 çoğunluk ve hukuki rehber',
      },
      {
        label: 'Tamamlanan Bahçelievler Referans Projelerimiz',
        href: '/profesyoneller/referanslar',
        context: '12+ gerçek saha uygulama fotoğrafı',
      },
      {
        label: 'Ücretsiz Keşif Randevusu Alın',
        href: '/iletisim?form=kesif',
        context: 'Aynı gün lazerli ölçüm ve yerinde numune sunumu',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: 'Bahçelievler’de Kat Yüksekliği ve Cepheye Göre Önerilen Cam Dayanımı',
      subtitle: 'Rüzgâr basıncı (Pa) ve akustik konfor kriterlerine göre mühendislik tavsiyesi.',
      metricUnit: 'Rüzgâr & Yalıtım Uygunluk Oranı (%)',
      items: [
        {
          label: 'Ana Cadde & 5. Kat Üzeri: 4+20+4 mm Temperli Isıcam (Vera Termal)',
          value: 98,
          displayValue: '%98 Maksimum Rüzgâr, Isı ve Ses Koruması',
          barPercent: 98,
          highlight: true,
        },
        {
          label: '5. Kat ve Üzeri Ara Sokak: 10 mm Temperli Vera Pro Katlanır',
          value: 90,
          displayValue: '%90 Yüksek Rüzgâr Yükü Güvenliği',
          barPercent: 90,
        },
        {
          label: '1–4. Kat Dar Balkonlar: Vera Slide Eşiksiz Sürme (8/10 mm)',
          value: 86,
          displayValue: '%86 Ergonomik Alan Kullanımı',
          barPercent: 86,
        },
        {
          label: '1–4. Kat Standart Balkonlar: 8 mm Temperli Vera Katlanır',
          value: 82,
          displayValue: '%82 Ekonomik Panoramik Koruma',
          barPercent: 82,
        },
      ],
      footnote: 'Kaynak: TS EN 1991-1-4 İstanbul rüzgâr yükü haritası ve Çelikpen 30 yıllık saha istatistikleri.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Bahçelievler’de apartmanda cam balkon yaptırmak için izin gerekir mi?',
        directAnswer:
          'Kat Mülkiyeti Kanunu uyarınca apartman dış cephesinde bütünlüğü korumak adına kat maliklerinin beşte dördünün yazılı muvafakatnamesi ve bina yönetim planındaki profil rengine uyum önerilir.',
      },
    ],
    initialComments: [
      {
        id: 'c-bah-1',
        author: 'Mustafa Çetin',
        district: 'Bahçelievler / Soğanlı',
        date: '20 Ekim 2026',
        rating: 5,
        comment:
          'Apartmanımızda 6 daire birleşip toplu sipariş verdik, %15 bina indirimi uygulandı ve tüm balkonlar aynı antrasit tonda 2 günde teslim edildi.',
        expertReply:
          'Mustafa Bey, komşularınızla birlikte bizi tercih ettiğiniz için teşekkür ederiz; toplu uygulamalarda hem cephe estetiği hem de bütçe avantajı sağlıyoruz.',
      },
    ],
  },
};
