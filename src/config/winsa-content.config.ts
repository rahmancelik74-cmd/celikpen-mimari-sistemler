export interface WinsaTopBarLink {
  label: string;
  href: string;
  badge?: string;
}

export interface WinsaArchitecturalSystemItem {
  code: string;
  name: string;
  category: 'pvc' | 'surme' | 'panjur';
  profileWidthMm: string;
  chamberCount: string;
  ufValue: string;
  uwValue: string;
  acousticDb: string;
  sealingSystem: string;
  glassThicknessRange: string;
  summary: string;
  highlights: string[];
}

export interface WinsaColorSwatch {
  id: string;
  name: string;
  ralOrCode: string;
  category: 'Antrasit & Metalik' | 'Doğal Ahşap Laminasyon' | 'Klasik & Modern Düz';
  hexPrimary: string;
  hexSecondary: string;
  surfaceFinish: string;
  uvResistanceClass: string;
  architecturalUsage: string;
}

export interface WinsaGlassOptionPreview {
  id: 'seffaf' | 'fume' | 'bronz' | 'alt_buzlu';
  name: string;
  lightTransmittance: string;
  solarFactor: string;
  privacyLevel: string;
  overlayCss: string;
  bottomOverlayCss?: string;
  description: string;
}

export interface WinsaEngineeringStandard {
  normCode: string;
  title: string;
  metricValue: string;
  classRating: string;
  description: string;
  technicalDetails: string[];
}

export interface WinsaHardwareItem {
  id: string;
  name: string;
  standardCode: string;
  loadCapacity: string;
  warrantyYears: number;
  description: string;
}

export interface WinsaSeriesDeepSpec {
  slug: string;
  winsaEquivalentSeries: string;
  profileDepthMm: string;
  glassCapacityMm: string;
  uwThermalCoefficient: string;
  acousticInsulationDb: string;
  waterTightnessClass: string;
  windLoadResistanceClass: string;
  airPermeabilityClass: string;
  maxSashWeightKg: string;
  maxSashHeightMm: string;
  crossSectionFeatures: string[];
  hardwareFeatures: string[];
}

export const WINSA_CONTENT_CONFIG = {
  topBarLinks: [
    {
      label: 'Mimari Çözüm Merkezi',
      href: '/karsilastir',
      badge: 'EN 14351-1',
    },
    {
      label: 'E-Katalog & Teknik Föyler',
      href: '/sistemler/vbs-isicamli-cam-balkon',
    },
    {
      label: 'Renk ve Yüzey Kartelası',
      href: '/#renk-kartelasi',
    },
    {
      label: 'Yargıtay 4/5 Muvafakatname',
      href: '/blog/eylul-2026-yargitay-cam-balkon-karari',
      badge: '2026 Mevzuat',
    },
    {
      label: 'Ücretsiz Lazerli Keşif Hattı',
      href: '/iletisim',
    },
  ] satisfies WinsaTopBarLink[],

  pvcAndArchitecturalSystems: [
    {
      code: 'DORADO 76',
      name: 'Dorado 76 — Yeni Nesil Yüksek Yalıtımlı PVC Pencere & Kapı Sistemi',
      category: 'pvc',
      profileWidthMm: '76 mm',
      chamberCount: '6 Odacıklı (3 Contalı Orta Conta Sistemi)',
      ufValue: '1.0 W/(m²K)',
      uwValue: '0.78 W/(m²K) (Üçlü Isıcam ile)',
      acousticDb: '44 dB (EN ISO 140-3)',
      sealingSystem: '3 Kademeli TPE / EPDM Gri & Siyah Conta',
      glassThicknessRange: '24 mm – 52 mm (Çift ve Üçlü Konfor Isıcam)',
      summary:
        'Bahçelievler kentsel dönüşüm projelerinde ve kuzey cepheli dairelerde pasif ev standartlarına yakın maksimum termal ve akustik bariyer sunan 76 mm 6 odacıklı amiral gemisi seri.',
      highlights: [
        'Üçlü (Triple) 4+16+4+16+4 Argon gazlı Sinerji/Konfor cam uygulaması',
        '3. orta conta bariyeri ile sağanak yağış ve fırtınada sıfır su/hava sızıntısı',
        'Alüminyum dış kapak (AluClip) opsiyonu ile dış cephede kusursuz antrasit görünüm',
      ],
    },
    {
      code: 'REVOTECH GOLD',
      name: 'Revotech Gold — 84 mm 7 Odacıklı Üst Segment Termal Seri',
      category: 'pvc',
      profileWidthMm: '84 mm',
      chamberCount: '7 Odacıklı Maksimum İzolasyon Kesiti',
      ufValue: '0.92 W/(m²K)',
      uwValue: '0.71 W/(m²K)',
      acousticDb: '46 dB (E-5 ve Havalimanı Aksı Standardı)',
      sealingSystem: '3 Kademeli EPDM Akustik ve Termal Conta',
      glassThicknessRange: '24 mm – 52 mm',
      summary:
        'Şirinevler E-5 yan yol, Çobançeşme ve Basın Ekspres aksındaki yüksek katlı rezidanslarda en zorlu rüzgar yükü ve trafik gürültüsünü kesmek üzere tasarlanmış 84 mm 7 odacıklı seri.',
      highlights: [
        '84 mm kasa/kanat derinliği ile sınıfının en düşük ısı iletim katsayısı',
        '2 mm galvanizli kapalı kutu destek sacı ile yüksek kat rüzgar mukavemeti',
        'Hırsızlığa karşı WK2 / RC2 emniyetli mantar başlıklı İspanyolet donanım uyumu',
      ],
    },
    {
      code: 'SAFİR 70',
      name: 'Safir 70 — 70 mm 5 Odacıklı İdeal Mimari Çözüm',
      category: 'pvc',
      profileWidthMm: '70 mm',
      chamberCount: '5 Odacıklı Dengeli Tasarım',
      ufValue: '1.2 W/(m²K)',
      uwValue: '1.05 W/(m²K)',
      acousticDb: '38 dB',
      sealingSystem: 'Çift Sıra EPDM Sızdırmazlık Contası',
      glassThicknessRange: '20 mm – 36 mm',
      summary:
        'Kocasinan, Soğanlı ve Siyavuşpaşa aile apartmanlarında estetik damlalıklı kanat tasarımı ve optimum fiyat/performans dengesiyle en çok tercih edilen 70 mm seri.',
      highlights: [
        'Kendinden damlalıklı ve düz kanat alternatifleriyle cephe estetiği',
        '4+16+4 (24 mm) ve 4+20+4 (28 mm) Konfor Isıcam tam uyumu',
        'Zengin ahşap ve metalik laminasyon folyo kaplama seçenekleri',
      ],
    },
    {
      code: 'PANORAMA HS 76',
      name: 'Panorama HS — Kaldır-Sür (Hebeschiebe) Panoramik Teras Sistemi',
      category: 'surme',
      profileWidthMm: '179 mm Kasa / 76 mm Kanat',
      chamberCount: '5 Odacıklı + Termal Bariyerli Alüminyum Eşik',
      ufValue: '1.3 W/(m²K)',
      uwValue: '0.95 W/(m²K)',
      acousticDb: '42 dB',
      sealingSystem: 'Kaldır-Sür EPDM Vakum Contalı Sızdırmazlık',
      glassThicknessRange: '24 mm – 52 mm',
      summary:
        'Bahçelievler çatı dubleks terasları ve bahçe katı kış bahçelerinde 300 kg kanat ağırlığına kadar tek parmakla kayarak açılan, engelsiz alt eşikli panoramik sürme sistemi.',
      highlights: [
        '6.5 metreye kadar kesintisiz panoramik açıklık imkanı',
        'İçe/dışa açılan kanat kaybı olmadan maksimum mekan kullanımı',
        'Özel EPDM vakum contaları sayesinde sürme sistemlerde pencere düzeyinde yalıtım',
      ],
    },
    {
      code: 'COMFORT SLIDE',
      name: 'Comfort Slide — Yeni Nesil Yalıtımlı Akıllı Sürme Sistemi',
      category: 'surme',
      profileWidthMm: '148 mm Kasa / 76 mm Kanat',
      chamberCount: '5 Odacıklı Çok Noktalı Kilitli Sürme',
      ufValue: '1.3 W/(m²K)',
      uwValue: '1.08 W/(m²K)',
      acousticDb: '40 dB',
      sealingSystem: 'Çepeçevre EPDM Conta (Kıl Fitilsiz Tam Basma)',
      glassThicknessRange: '24 mm – 44 mm',
      summary:
        'Klasik sürme sistemlerin aksine kıl fitil yerine çepeçevre EPDM kauçuk conta baskısı uygulayarak rüzgar ıslığını ve su sızıntısını %100 engelleyen akıllı eksenel sürme.',
      highlights: [
        'Kapanırken kasa üzerine 8 mm vakumlanarak tam sızdırmazlık sağlayan mekanizma',
        'Dar balkon ve mutfak çıkışlarında yer kaplamayan ergonomik kullanım',
        'Devrilme emniyetli ve mikro-havalandırma pozisyonlu özel donanım',
      ],
    },
    {
      code: 'WINSTOR PANJUR',
      name: 'Winstor — Yalıtımlı Monoblok Panjur & Motorlu Kepenk Sistemi',
      category: 'panjur',
      profileWidthMm: '195x220 mm / 230x255 mm Yalıtımlı Kutu',
      chamberCount: 'Poliüretan Dolgulu Alüminyum Lamel + EPS Termal Kutu',
      ufValue: '0.85 W/(m²K) Kutu Yalıtımı',
      uwValue: 'Kışın +%28 Ek Isı Tasarrufu',
      acousticDb: '+10 dB Ek Akustik Bariyer',
      sealingSystem: 'Fırçalı Yan Dikme Rayları & EPDM Alt Eşik Contası',
      glassThicknessRange: 'Tüm PVC ve Isıcamlı Cam Balkon Serileriyle Entegre',
      summary:
        'Güneş kontrolü, tam karartma, fırtına koruması ve giriş/zemin kat dairelerde üst düzey hırsızlık güvenliği sağlayan Somfy/Becker motorlu monoblok panjur sistemi.',
      highlights: [
        'Uzaktan kumanda, duvar butonu veya akıllı telefon üzerinden zamanlayıcılı kontrol',
        'Poliüretan köpük dolgulu 39 mm ve 55 mm alüminyum lameller',
        'Entegre stor sineklik opsiyonu ve dış cephe RAL renkleriyle birebir uyum',
      ],
    },
  ] satisfies WinsaArchitecturalSystemItem[],

  colorPalette: [
    {
      id: 'antrasit_ral7016',
      name: 'Antrasit Gri',
      ralOrCode: 'RAL 7016 / Kumlu Mat',
      category: 'Antrasit & Metalik',
      hexPrimary: '#2F3640',
      hexSecondary: '#1E272E',
      surfaceFinish: 'Elektrostatik Toz Boya & Kumlu Dokulu Folyo',
      uvResistanceClass: 'EN 513 Sınıf S (Ağır İklim & UV Dayanımlı)',
      architecturalUsage:
        'Kocasinan, Soğanlı ve Cumhuriyet yeni kentsel dönüşüm binalarında %82 oranında standart dış cephe rengi.',
    },
    {
      id: 'mat_siyah_ral9005',
      name: 'Mat Siyah (Gece Siyahı)',
      ralOrCode: 'RAL 9005 / Eloksal Mat',
      category: 'Antrasit & Metalik',
      hexPrimary: '#181B20',
      hexSecondary: '#0F1115',
      surfaceFinish: 'İpek Mat Elektrostatik Fırın Boya',
      uvResistanceClass: 'QUALICOAT & GSB Uluslararası Sertifikalı',
      architecturalUsage:
        'Yenibosna Basın Ekspres rezidansları, loft daireler ve modern kış bahçesi / giyotin cam projeleri.',
    },
    {
      id: 'altin_mese',
      name: 'Altın Meşe (Golden Oak)',
      ralOrCode: 'Ahşap Transfer / Renolit Folyo',
      category: 'Doğal Ahşap Laminasyon',
      hexPrimary: '#8C5220',
      hexSecondary: '#633712',
      surfaceFinish: '3D Doğal Damar Dokulu UV Korumalı Laminasyon',
      uvResistanceClass: 'Cool Colors Teknolojisi (Güneş Isısını Yansıtan Pigment)',
      architecturalUsage:
        'Bahçelievler Merkez, Siyavuşpaşa ve Yayla’daki bahçe katı daireler ve sıcak ahşap cepheli apartmanlar.',
    },
    {
      id: 'findik_ceviz',
      name: 'Koyu Ceviz & Fındık',
      ralOrCode: 'Natürel Ceviz Doku',
      category: 'Doğal Ahşap Laminasyon',
      hexPrimary: '#5C3A21',
      hexSecondary: '#3E2514',
      surfaceFinish: 'Mat Ahşap Gözenekli Termal Kaplama',
      uvResistanceClass: 'EN 513 Sınıf S — Soyulma ve Solmazlık Garantili',
      architecturalUsage:
        'Klasik mimarili aile apartmanları, ahşap pergole altı kapatmalar ve teras kış bahçeleri.',
    },
    {
      id: 'metalik_gumus',
      name: 'Metalik Gümüş / Bronz Eloksal',
      ralOrCode: 'RAL 9006 / E6-EV1 Eloksal',
      category: 'Antrasit & Metalik',
      hexPrimary: '#7F8FA6',
      hexSecondary: '#576574',
      surfaceFinish: '20 Mikron Doğal Eloksal & Metalik Kumlu',
      uvResistanceClass: 'QUALANOD Korozyon ve Deniz Tuzu Dirençli',
      architecturalUsage:
        'Alüminyum kompozit cepheli iş merkezleri, ticari mağazalar ve modern balkon korkuluk üstü sistemler.',
    },
    {
      id: 'pres_beyaz_ral9016',
      name: 'Trafik Beyazı / Krem',
      ralOrCode: 'RAL 9016 / Parlak Beyaz',
      category: 'Klasik & Modern Düz',
      hexPrimary: '#F1F5F9',
      hexSecondary: '#CBD5E1',
      surfaceFinish: 'Yüksek Parlaklıkta UV Stabilizörlü Yüzey',
      uvResistanceClass: 'Sararma Yapmayan Titanyum Dioksit Formülasyon',
      architecturalUsage:
        'Mevcut PVC doğramaları beyaz olan standart apartmanlarda dış cephe emsalini birebir korumak için.',
    },
  ] satisfies WinsaColorSwatch[],

  glassOptionsPreview: [
    {
      id: 'seffaf',
      name: 'Şişecam Ultra Şeffaf Konfor',
      lightTransmittance: '%81 Gün Işığı Geçirgenliği',
      solarFactor: '%58 Güneş Enerjisi Kontrolü',
      privacyLevel: 'Panoramik Tam Açık Görüş',
      overlayCss: 'linear-gradient(180deg, rgba(14, 165, 233, 0.14) 0%, rgba(2, 132, 199, 0.24) 100%)',
      description:
        'Balkon ve salonun gün ışığını hiç kesmeden maksimum ısı ve ses yalıtımı sağlayan standart berrak temperli cam.',
    },
    {
      id: 'fume',
      name: 'Füme Reflekte Güneş Kontrol',
      lightTransmittance: '%46 Gün Işığı Geçirgenliği',
      solarFactor: '%39 Yüksek Güneş Isısı Kesimi',
      privacyLevel: 'Gündüz Dışarıdan İçeriyi Göstermez',
      overlayCss: 'linear-gradient(180deg, rgba(30, 41, 59, 0.52) 0%, rgba(15, 23, 42, 0.68) 100%)',
      description:
        'Antrasit ve Mat Siyah profillerle kusursuz uyum sağlayan, batı ve güney cephelerde yaz sıcağını ve parlamayı kesen füme cam.',
    },
    {
      id: 'bronz',
      name: 'Bronz Termal Reflekte',
      lightTransmittance: '%50 Gün Işığı Geçirgenliği',
      solarFactor: '%42 Güneş Kontrolü',
      privacyLevel: 'Yüksek Gündüz Mahremiyeti',
      overlayCss: 'linear-gradient(180deg, rgba(120, 53, 15, 0.38) 0%, rgba(69, 26, 3, 0.56) 100%)',
      description:
        'Altın Meşe, Ceviz ve Antrasit doğramalarla sıcak mimari kontrast oluşturan, UV ışınlarını %94 filtreleyen bronz temperli cam.',
    },
    {
      id: 'alt_buzlu',
      name: 'Alt %40 Kumlama Buzlu Mahremiyet',
      lightTransmittance: 'Üst %81 / Alt Mat Kumlama',
      solarFactor: '%54 Dengeli Isı Kontrolü',
      privacyLevel: 'Balkon Korkuluk Hizasında %100 Mahremiyet',
      overlayCss: 'linear-gradient(180deg, rgba(14, 165, 233, 0.14) 0%, rgba(2, 132, 199, 0.22) 100%)',
      bottomOverlayCss: 'linear-gradient(180deg, rgba(226, 232, 240, 0.88) 0%, rgba(203, 213, 225, 0.95) 100%)',
      description:
        'Siyavuşpaşa, Fevzi Çakmak ve Hürriyet gibi bitişik nizam sokaklarda balkon zemini, çamaşırlık ve oturma hizasını gizlerken gökyüzü ferahlığını korur.',
    },
  ] satisfies WinsaGlassOptionPreview[],

  engineeringStandards: [
    {
      normCode: 'TS EN ISO 10077-1',
      title: 'Termal Yalıtım & Argon Gazlı Isıcam Sinerji Teknolojisi',
      metricValue: 'Uw = 1.1 W/(m²K)',
      classRating: '%72’ye Varan Enerji Tasarrufu',
      description:
        '28 mm (4+20+4) çift tarafı temperli Isıcam Konfor/Sinerji plakalar ve çok odacıklı alüminyum/PVC profiller sayesinde kışın ısı kaybını, yazın klima yükünü minimuma indirir.',
      technicalDetails: [
        '20 mm ara boşlukta %90 saflıkta Argon gazı dolgusu',
        'Low-E kaplama ile iç mekandaki radyatör ısısını geri yansıtma',
        'Kış aylarında cam yüzeyinde terleme ve yoğuşmayı önleyen sıcak kenar (Warm Edge) çıtası',
      ],
    },
    {
      normCode: 'TS EN ISO 140-3',
      title: 'Akustik İzolasyon ve Desibel Bariyeri',
      metricValue: '-38 dB / -44 dB',
      classRating: 'Sınıf 4 Akustik Konfor',
      description:
        'Şirinevler, E-5, Metrobüs ve Mahmutbey Caddesi aksındaki 80 dB trafik gürültüsünü kütüphane sessizliği seviyesine (35-40 dB) düşüren çok katmanlı sızdırmazlık.',
      technicalDetails: [
        'Farklı kalınlıktaki temperli cam kombinasyonlarıyla ses dalgası sönümleme',
        'Kanat birleşimlerinde UV dayanımlı alüminyum mıknatıslı ve EPDM kauçuk fitiller',
        'Rüzgar ıslığını tamamen kesen çift kademeli kasa-kanat kenetleme',
      ],
    },
    {
      normCode: 'TS EN 12210 & EN 12150',
      title: 'Rüzgar Yükü Direnci ve Darbe Güvenliği',
      metricValue: 'Sınıf C4 / B5 (2000 Pa)',
      classRating: '160 km/s Fırtına Dayanımı',
      description:
        '3 mm et kalınlığında T66 ısıl işlemli birincil (primer) alüminyum profiller ve normal cama göre 5 kat daha mukavemetli TSE EN 12150 Şişecam temperli güvenlik camları.',
      technicalDetails: [
        'Yüksek katlarda esneme ve sehim yapmayan etli taşıyıcı üst/alt kasa',
        'Kanat başına 8 bilyalı paslanmaz çelik rulman ile 120 kg taşıma kapasitesi',
        'Kırılma anında kesici parça oluşturmayan güvenli zar büyüklüğünde dağılma standardı',
      ],
    },
    {
      normCode: 'TS EN 12208 & EN 12207',
      title: 'Su Sızdırmazlığı ve Fırtınalı Yağış Deşarjı',
      metricValue: 'Sınıf 9A (600 Pa)',
      classRating: '%100 Eğimli Su Tahliyesi',
      description:
        'Şiddetli lodos ve sağanak yağışta cam yüzeyinden süzülen suyu iç mekana almadan doğrudan dış cepheye deşarj eden kademeli damlalık kasa mimarisi.',
      technicalDetails: [
        '5° kendinden eğimli alt damlalık ve gizli su tahliye kanalları',
        'Geri tepmeyi önleyen rüzgar kapaklı dış deşarj yuvaları',
        'Antibakteriyel, küflenmez nötr cephe silikonu ve poliüretan köpük yalıtımı',
      ],
    },
  ] satisfies WinsaEngineeringStandard[],

  hardwareCatalog: [
    {
      id: 'paslanmaz_rulman',
      name: 'Çift Sıra 8 Bilyalı Paslanmaz Çelik Rulman',
      standardCode: 'AISI 304 / EN 13126',
      loadCapacity: 'Kanat Başı 120 kg',
      warrantyYears: 10,
      description:
        'Poliamid sessiz dış gömlekli, korozyona ve tozlanmaya karşı kapalı rulman yatağı sayesinde yıllarca tek parmakla sessizce kayan taşıyıcı teker sistemi.',
    },
    {
      id: 'epdm_miknatis_fitil',
      name: 'Alüminyum Gövdeli Mıknatıslı & EPDM Sızdırmazlık Fitili',
      standardCode: 'DIN 7863 / EN 12365',
      loadCapacity: '-40°C / +120°C Termal Dayanım',
      warrantyYears: 10,
      description:
        'Şeffaf plastik fitiller gibi 1 yılda sararıp kırılmayan; alüminyum kanal içine entegre edilmiş mıknatıslı ve çift sıra antibakteriyel kıl fitilli tam sızdırmaz bariyer.',
    },
    {
      id: 'ispanyolet_cocuk_kilidi',
      name: 'Paslanmaz İspanyolet Kollu & Çocuk Emniyet Kilit Mekanizması',
      standardCode: 'EN 16281 Çocuk Güvenliği',
      loadCapacity: 'Üst ve Alt Çift Nokta Kilitleme',
      warrantyYears: 5,
      description:
        'Hem alt hem üst kasaya çelik pimlerle kilitlenen ergonomik metal kol ve yüksek katlarda çocukların kanadı izinsiz açmasını engelleyen emniyet mandalı.',
    },
    {
      id: 'somfy_becker_motor',
      name: 'Somfy / Becker RTS & io Akıllı Tüp Motor Otomasyonu',
      standardCode: 'CE / EN 60335-2-97',
      loadCapacity: '120 Nm Tork / Engelsiz Durdurma',
      warrantyYears: 5,
      description:
        'Giyotin ve Bioklimatik tavan sistemlerinde kullanılan, engel algıladığında otomatik duran (el sıkışma emniyetli) sessiz Alman/Fransız motor teknolojisi.',
    },
  ] satisfies WinsaHardwareItem[],

  seriesDeepSpecs: {
    'vns-katlanir-cam-balkon': {
      slug: 'vns-katlanir-cam-balkon',
      winsaEquivalentSeries: 'Vera / Panorama Katlanır Cam Balkon Serisi',
      profileDepthMm: '42 mm Kasa / 3.0 mm T66 Alüminyum Et Kalınlığı',
      glassCapacityMm: '8 mm veya 10 mm Şişecam Temperli Tek Cam',
      uwThermalCoefficient: '2.6 W/(m²K) (Termal Fitilli Kasa)',
      acousticInsulationDb: '-24 dB Gürültü Azaltımı (EN ISO 140-3)',
      waterTightnessClass: 'Sınıf 7A (450 Pa Eğimli Damlalık Kasa)',
      windLoadResistanceClass: 'Sınıf C3 (1200 Pa / 130 km/s Rüzgar Direnci)',
      airPermeabilityClass: 'Sınıf 3 (Alüminyum Mıknatıslı Fitil)',
      maxSashWeightKg: '90 kg / Kanat (8 Bilyalı Paslanmaz Rulman)',
      maxSashHeightMm: '2600 mm Maksimum Kanat Yüksekliği',
      crossSectionFeatures: [
        'T66 ısıl işlemli birincil alüminyum alaşım (EN AW-6063) kasa ve kanat profilleri',
        '5° eğimli dahili su tahliye oluğu ve geri tepme önleyici dış kapaklar',
        'L ve U tipi balkonlarda köşe direksiz 90° ve 135° tam panoramik toplanabilme',
        'Sararma yapmayan alüminyum gövdeli mıknatıslı kanat birleşim fitilleri',
      ],
      hardwareFeatures: [
        'Her kanatta 2 üst + 2 alt toplam 8 bilyalı paslanmaz çelik rulman takımı',
        'İspanyolet metal açma kolu ve yüksek kat çocuk emniyet kilidi',
        'Rüzgarda açık kanatların çarpmasını önleyen poliamid kanat sabitleme stoperi',
        'İçten cam üstü plise perde ve yırtılmaz çelik telli kedi sinekliği tam uyumu',
      ],
    },
    'vbs-isicamli-cam-balkon': {
      slug: 'vbs-isicamli-cam-balkon',
      winsaEquivalentSeries: 'Vera Termal 4+20+4 Argonlu Isıcamlı Seri',
      profileDepthMm: '58 mm Termal Geniş Kasa / 3.2 mm Alüminyum Et Kalınlığı',
      glassCapacityMm: '28 mm (4 mm Temperli + 20 mm Argon + 4 mm Konfor/Sinerji Temperli)',
      uwThermalCoefficient: '1.1 W/(m²K) (%72’ye Varan Isı Tasarrufu)',
      acousticInsulationDb: '-38 dB Akustik Gürültü Kesimi (EN ISO 140-3)',
      waterTightnessClass: 'Sınıf 9A (600 Pa Fırtına Sızdırmazlık Sınıfı)',
      windLoadResistanceClass: 'Sınıf C4 / B5 (1600 Pa Yüksek Kat Direnci)',
      airPermeabilityClass: 'Sınıf 4 (Çift Sıra EPDM + Mıknatıslı Termal Fitil)',
      maxSashWeightKg: '125 kg / Kanat (Ağır Hizmet Çift Eksen Rulman)',
      maxSashHeightMm: '2800 mm Maksimum Kanat Yüksekliği',
      crossSectionFeatures: [
        'Her iki cam plakası da TSE EN 12150 temperli 28 mm Argon gazlı Şişecam Isıcam Konfor',
        'Soğuk köprü oluşumunu ve terlemeyi engelleyen çok odacıklı geniş alüminyum baza profili',
        'Kanatlar arası çift kademeli EPDM kauçuk ve alüminyum mıknatıs contalı kenetleme',
        'Gizli su deşarj kanallı ağır hizmet tipi damlalık kasa kesiti',
      ],
      hardwareFeatures: [
        'Ağır ısıcam kanatları için özel tasarlanmış 125 kg kapasiteli çelik gövdeli rulmanlar',
        'Üst ve alt kasaya aynı anda kilitleme yapan paslanmaz İspanyolet kilit mekanizması',
        'Balkonu havalandırma modunda sabitleyen kademeli çocuk emniyet mandalı',
        '28 mm cam çıtasına sıfır oturan termal plise perde entegrasyonu',
      ],
    },
    'vds-esiksiz-surme-cam-balkon': {
      slug: 'vds-esiksiz-surme-cam-balkon',
      winsaEquivalentSeries: 'Vela / Comfort Slide Eşiksiz Sürme Serisi',
      profileDepthMm: '3 Raylı (98 mm) veya 5 Raylı (156 mm) Engelsiz Kasa',
      glassCapacityMm: '8 mm / 10 mm Temperli veya 4+12+4 (20 mm) Isıcam',
      uwThermalCoefficient: '1.6 W/(m²K) (Isıcamlı Sürme Opsiyonu İle)',
      acousticInsulationDb: '-28 dB Akustik Yalıtım',
      waterTightnessClass: 'Sınıf 8A (Eğimli Gizli Tahliyeli Alt Ray)',
      windLoadResistanceClass: 'Sınıf C3 (Alüminyum Kenetli Dikey Kayıt)',
      airPermeabilityClass: 'Sınıf 4 (Kenetli EPDM + Antibakteriyel Fırça Conta)',
      maxSashWeightKg: '140 kg / Kanat (Alttan Taşıymalı Çelik Rulman)',
      maxSashHeightMm: '2700 mm Maksimum Kanat Yüksekliği',
      crossSectionFeatures: [
        'Yalnızca 8 mm yüksekliğinde pahlı, tekerlekli sandalye ve çocuk dostu engelsiz alt eşik',
        'Kanatlar açılırken birbirini peş peşe çeken entegre etek kenetleme profili',
        'İçe kanat açılma payı sıfır; balkon içindeki masa, sandalye ve dolaplara çarpmaz',
        'Sürme kedi tüllü çelik sineklik için dahili ekstra ray kanalı',
      ],
      hardwareFeatures: [
        'Ayarlanabilir eksantrik gövdeli, alttan taşımalı ağır hizmet paslanmaz rulmanlar',
        'İçeriden ve opsiyonel dışarıdan kilitlenebilen gömme kancalı sürme kilit',
        'Kanatların birbirine sert çarpmasını önleyen elastomerik stoper takozlar',
        'Ray içi toz ve su tahliye yuvaları ile kolay temizlenebilir alt kasa',
      ],
    },
    'vgs-motorlu-giyotin-cam': {
      slug: 'vgs-motorlu-giyotin-cam',
      winsaEquivalentSeries: 'Vera Vertical Motorlu Giyotin (Silinebilir) Seri',
      profileDepthMm: '132 mm 3 Kanallı Yan Dikme / Termal Üst Motor Kutusu',
      glassCapacityMm: '24 mm (4+16+4) Argonlu Temperli Isıcam veya 8/10 mm Temperli',
      uwThermalCoefficient: '1.3 W/(m²K)',
      acousticInsulationDb: '-36 dB Akustik Yalıtım',
      waterTightnessClass: 'Sınıf 9A (Sabit Alt Küpeşte + Vakumlu Kapanış)',
      windLoadResistanceClass: 'Sınıf C4 (1800 Pa Yüksek Kat & Teras Direnci)',
      airPermeabilityClass: 'Sınıf 4 (Yan Dikme EPDM & Çift Sıra Fırça Bariyer)',
      maxSashWeightKg: '160 kg Toplam Hareketli Kanat Ağırlığı',
      maxSashHeightMm: '3500 mm Maksimum Sistem Yüksekliği',
      crossSectionFeatures: [
        'Açık konumda 110 cm yüksekliğinde EN 1991-1-1 standartlarında güvenli cam küpeşte (korkuluk)',
        'İçeriden dış camların güvenle silinmesini sağlayan patentli "Silinebilir Kanat" mekanizması',
        'Çift sıra çelik zincir veya çelik telli yüksek mukavemetli triger kayış tahrik sistemi',
        'El ve parmak sıkışmasını önleyen emniyetli baza birleşim detayı',
      ],
      hardwareFeatures: [
        'Somfy veya Becker RTS uzaktan kumandalı, 5 yıl garantili sessiz tüp motor',
        'Akıllı telefon (Wi-Fi) kontrolü ile yağmur ve rüzgar sensörü entegrasyon opsiyonu',
        'Elektrik kesintilerinde sistemin düşmesini %100 engelleyen elektromanyetik fren',
        'Üst motor kutusu içinde entegre ses yalıtım süngeri ve kolay müdahale kapağı',
      ],
    },
    'kis-bahcesi-ve-bioklimatik-tavan': {
      slug: 'kis-bahcesi-ve-bioklimatik-tavan',
      winsaEquivalentSeries: 'Panorama Kış Bahçesi & Bioklimatik Pergola Sistemi',
      profileDepthMm: '150x150 mm Taşıyıcı Kolon / 220 mm Yağmur Oluklu Ana Kiriş',
      glassCapacityMm: 'Tavan: 4+16+ (4+4 Lamine) Güvenlikli Isıcam veya Poliüretan Alüminyum Lamel',
      uwThermalCoefficient: '1.1 W/(m²K) (4 Mevsim İklimlendirme Uyumu)',
      acousticInsulationDb: '-40 dB Yağmur ve Çevre Gürültüsü Yalıtımı',
      waterTightnessClass: 'Sınıf 9A (Kolon İçi Gizli Yağmur Suyu Deşarjı)',
      windLoadResistanceClass: 'Sınıf C5 (2000 Pa + 150 kg/m² Kar Yükü Taşıma)',
      airPermeabilityClass: 'Sınıf 4 (EPDM Contalı Lamel & Cephe Birleşimi)',
      maxSashWeightKg: '150 kg/m² Statik Kar ve Rüzgar Yükü Kapasitesi',
      maxSashHeightMm: '7000 mm x 4500 mm Tek Modül Açıklık',
      crossSectionFeatures: [
        '110° kendi ekseninde dönerek doğal baca etkisiyle havalandırma sağlayan ve geriye toplanan bioklimatik lameller',
        'Sabit cam tavan tercihinde kırıldığında dağılmayan 4+4 lamine + 16 mm argon + 6 mm temperli güneş kontrol camı',
        'Dört bir yanından geçen gizli dere oluğu ve taşıyıcı dikme içinden zemine görünmez su tahliyesi',
        'Winsa Vera Termal Isıcamlı Katlanır, Winsa Vera Slide Sürme veya Winsa Vera Vertical Giyotin cephelerle %100 modüler birleşim',
      ],
      hardwareFeatures: [
        'Uzaktan kumandalı Somfy/Becker lineer piston ve kayışlı tavan tahrik otomasyonu',
        'Dimmerli (ışık şiddeti ayarlanabilir) Samsung Günışığı ve RGB LED spot/şerit aydınlatma',
        'Paslanmaz çelik (AISI 316) bağlantı ankrajları ve elektrostatik QUALICOAT fırın boya',
        'Opsiyonel zip perde, radyant ısıtıcı ve rüzgar/yağmur/kar sensörü otomasyonu',
      ],
    },
  } as Record<string, WinsaSeriesDeepSpec>,
};
