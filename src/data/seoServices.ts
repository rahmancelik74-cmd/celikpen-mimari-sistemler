export interface SeoServicePriceRow {
  system: string;
  spec: string;
  priceRange2026: string;
}

export interface SeoServiceSection {
  heading: string;
  paragraphs: string[];
  subSections?: { heading: string; text: string }[];
}

export interface SeoServicePageData {
  slug: string;
  name: string;
  footerLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  heroImageAlt: string;
  heroImageTitle: string;
  heroSubtitle: string;
  aiSummary: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  specs: { label: string; value: string }[];
  sections: SeoServiceSection[];
  priceRows: SeoServicePriceRow[];
  calculatorHref: string;
  faqs: { question: string; answer: string }[];
}

export const SEO_SERVICE_PAGES: SeoServicePageData[] = [
  {
    slug: 'cam-balkon-sistemleri',
    name: 'Cam Balkon Sistemleri',
    footerLabel: 'Cam Balkon Sistemleri & Fiyatları',
    h1: 'Cam Balkon Sistemleri & 2026 Isıcamlı Cam Balkon Fiyatları',
    metaTitle: 'Cam Balkon Sistemleri & 2026 m² Fiyatları | Isıcamlı Cam Balkon | Çelikpen',
    metaDescription:
      'İstanbul Avrupa Yakası 2026 cam balkon fiyatları, 4+20+4 argonlu ısıcamlı cam balkon, 8/10 mm katlanır ve eşiksiz sürme sistemleri. 10 yıl garanti, ücretsiz lazerli keşif.',
    keywords: [
      'cam balkon',
      'ısıcamlı cam balkon',
      'cam balkon fiyatları',
      '2026 cam balkon m2 fiyatları',
      'katlanır cam balkon',
      'eşiksiz sürme cam balkon',
      'İstanbul cam balkon üretici',
    ],
    heroImage: '/images/seo/hizmet-cam-balkon.jpg',
    heroImageAlt: 'İstanbul Avrupa Yakası 4+20+4 argonlu ısıcamlı katlanır cam balkon sistemi uygulaması — Çelikpen',
    heroImageTitle: 'Isıcamlı ve Katlanır Cam Balkon Sistemleri 2026',
    heroSubtitle:
      'Şişecam TSE EN 12150 temperli 8/10 mm katlanır, 4+20+4 mm argonlu ısıcamlı ve eşiksiz sürme cam balkon çözümlerinde doğrudan Kocasinan Merkez fabrika üretimi.',
    aiSummary:
      'Çelikpen cam balkon sistemleri, 2026 yılında 8/10 mm temperli katlanır, 4+20+4 mm argon gazlı ısıcamlı (Uw: 1.1 W/m²K, -38 dB) ve eşiksiz sürme seçenekleriyle İstanbul Avrupa Yakası genelinde 10 yıl garanti ve ücretsiz lazerli keşif avantajıyla üretilip monte edilir.',
    videoUrl: '',
    specs: [
      { label: 'Cam Seçenekleri', value: '8 mm / 10 mm Temperli & 28 mm (4+20+4) Argonlu Isıcam' },
      { label: 'Isı Yalıtımı (Uw)', value: '1.1 W/m²K (%72 Isı Tasarrufu — Isıcamlı Seri)' },
      { label: 'Akustik Yalıtım', value: '-38 dB Dış Ortam Gürültü Azaltımı' },
      { label: 'Sızdırmazlık', value: 'Alüminyum Mıknatıslı Fitil + Çift Sıra EPDM Conta' },
      { label: 'Taşıyıcı Rulman', value: 'AISI 304 Paslanmaz Çelik 8 Bilyalı Tekerlek' },
      { label: 'Garanti & Keşif', value: '10 Yıl Sistem Garantisi • Ücretsiz Lazerli Keşif' },
    ],
    sections: [
      {
        heading: 'Isıcamlı Cam Balkon ile Klasik 8/10 mm Cam Balkon Farkları',
        paragraphs: [
          'İstanbul ikliminde balkonunu dört mevsim oda konforunda kullanmak isteyen konut sahipleri için 28 mm (4+20+4) argon gazlı Şişecam Sinerji veya Konfor ısıcamlı cam balkon sistemleri standart 8 mm tek cama göre 4 kata kadar daha yüksek termal bariyer sunar. Yoğuşma ve cam terlemesini önleyerek kışın doğalgaz tüketimini belirgin biçimde azaltır.',
          'Klasik 8 mm ve yüksek katlar için önerilen 10 mm TSE EN 12150 temperli katlanır cam balkon sistemleri ise rüzgâr, yağmur ve tozu keserken yaz aylarında tüm kanatların tek köşeye toplanmasıyla %100 açık teras deneyimi sağlar.',
        ],
        subSections: [
          {
            heading: 'Alüminyum Fitil, EPDM Conta ve Gizli Su Tahliye Mühendisliği',
            text: 'Zamanla sararan şeffaf plastik fitiller yerine UV dayanımlı alüminyum mıknatıslı fitiller, çift sıra EPDM fırça conta ve eğimli damlalık kasa profili kullanılır. Şiddetli lodos yağışlarında dahi su tahliye kanalları sayesinde içeriye damlama yaşanmaz.',
          },
          {
            heading: '3 mm Et Kalınlıklı T66 Alüminyum Profil ve Paslanmaz Rulmanlar',
            text: 'Her kanatta 8 adet paslanmaz çelik rulman taşıyıcı kullanılır; yüksek katlarda rüzgâr yükü altında kanat sarkması ve ray sıkışması oluşmaz. RAL 7016 Antrasit, Mat Siyah, Bronz ve ahşap desen elektrostatik fırın boya seçenekleri apartman dış cephe bütünlüğünü korur.',
          },
        ],
      },
    ],
    priceRows: [
      { system: 'Katlanır Cam Balkon (8 mm Temperli)', spec: 'Şişecam 8 mm + Alüminyum Fitil', priceRange2026: '3.650 – 5.150 ₺ / m²' },
      { system: 'Yüksek Kat Katlanır (10 mm Temperli)', spec: 'Şişecam 10 mm + Çift Rulman', priceRange2026: '4.150 – 5.720 ₺ / m²' },
      { system: 'Isıcamlı Cam Balkon (4+20+4 Argonlu)', spec: 'Uw: 1.1 • -38 dB • Low-E Konfor', priceRange2026: '5.850 – 7.450 ₺ / m²' },
      { system: 'Eşiksiz Sürme Cam Balkon', spec: '8/10 mm veya Isıcamlı 3/5 Ray', priceRange2026: '4.300 – 6.250 ₺ / m²' },
    ],
    calculatorHref: '/fiyat-hesapla?seri=vbs_isicam',
    faqs: [
      {
        question: '2026 cam balkon m² fiyatları neye göre hesaplanır?',
        answer:
          'Balkonun tüm açık cephe genişliklerinin toplamı yükseklik ile çarpılarak toplam m² bulunur. Cam kalınlığı (8 mm, 10 mm veya 4+20+4 ısıcam), profil rengi (antrasit, bronz, mat siyah) ve köşe dönüş sayısı birim fiyatı belirler; 3,5 m² altı balkonlar minimum üretim alanı üzerinden hesaplanır.',
      },
      {
        question: 'Isıcamlı cam balkon kışın soğuk geçirir mi?',
        answer:
          'Her iki yüzeyi temperli 4+20+4 mm argon gazlı Şişecam Konfor/Sinerji ısıcam ve çift sıra EPDM mıknatıslı fitil sayesinde ısı kaybı tek camlı sistemlere göre %72 azalır; balkon oda sıcaklığına yakın konfor sunar.',
      },
      {
        question: 'Apartmanda cam balkon yaptırmak için izin gerekir mi?',
        answer:
          'Kat Mülkiyeti Kanunu 19. maddesi uyarınca 4/5 kat maliki yazılı muvafakatnamesi ve bina dış cephesiyle uyumlu profil rengi önerilir. Keşif aşamasında örnek muvafakatname dosyası ücretsiz sunulmaktadır.',
      },
    ],
  },
  {
    slug: 'motorlu-giyotin-cam',
    name: 'Motorlu Giyotin Cam Sistemleri',
    footerLabel: 'Motorlu Giyotin Cam Sistemleri',
    h1: 'Motorlu Giyotin Cam Sistemleri & 2026 Kumandalı Küpeşte Fiyatları',
    metaTitle: 'Motorlu Giyotin Cam Sistemleri & 2026 Fiyatları | Hareketli Küpeşte | Çelikpen',
    metaDescription:
      'Somfy ve Becker motorlu giyotin cam sistemleri, ısıcamlı hareketli küpeşte çözümleri ve 2026 m² fiyatları. Teras, dubleks, kafe ve restoranlar için 10 yıl sistem garantisi.',
    keywords: [
      'motorlu giyotin sistemleri',
      'motorlu giyotin',
      'giyotin cam fiyatları',
      'hareketli küpeşte cam',
      'kumandalı cam balkon',
      'Somfy motorlu giyotin cam',
    ],
    heroImage: '/images/seo/hizmet-motorlu-giyotin.jpg',
    heroImageAlt: 'Somfy uzaktan kumandalı ısıcamlı motorlu giyotin cam (hareketli küpeşte) teras uygulaması — Çelikpen',
    heroImageTitle: 'Motorlu Giyotin Cam ve Hareketli Küpeşte Sistemleri 2026',
    heroSubtitle:
      'Tek tuşla dikey açılıp kapanan Somfy / Becker RTS tüp motorlu, 4+16+4 ısıcamlı ve 110 cm sabit güvenlik küpeşteli modern cephe teknolojisi.',
    aiSummary:
      'Çelikpen motorlu giyotin cam sistemleri, Somfy veya Becker uzaktan kumandalı tüp motor, çift taraflı çelik zincir tahrik ve 4+16+4 mm temperli ısıcam üniteleriyle teras, dubleks ve kafe cephelerinde açıkken güvenli korkuluk, kapalıyken tam ısı ve ses yalıtımı sağlar.',
    videoUrl: '',
    specs: [
      { label: 'Motor & Otomasyon', value: 'Somfy / Becker RTS Uzaktan Kumandalı Tüp Motor' },
      { label: 'Cam Kombinasyonu', value: '24 mm (4+16+4) Temperli Argonlu Isıcam' },
      { label: 'Taşıyıcı Mekanizma', value: 'Çift Taraflı Paslanmaz Çelik Zincir / Triger Kayış' },
      { label: 'Isı & Ses Yalıtımı', value: 'Uw: 1.3 W/m²K • -36 dB Akustik Koruma' },
      { label: 'Güvenlik', value: '110 cm Sabit Alt Küpeşte + El Sıkışma Emniyeti' },
      { label: 'Opsiyonlar', value: 'Yağmur / Rüzgâr Sensörü & Akıllı Ev Entegrasyonu' },
    ],
    sections: [
      {
        heading: 'Hareketli Küpeşte (Giyotin Cam) Nasıl Çalışır?',
        paragraphs: [
          'Motorlu giyotin sistemlerinde 2 veya 3 adet yatay cam panel, gizli kasa içindeki sessiz tüp motorla dikey olarak aşağı veya yukarı hareket eder. Kanatlar tamamen açıldığında alt sabit cam panel 110 cm yüksekliğinde kesintisiz cam korkuluk (küpeşte) görevi görerek manzarayı kapatmadan tam güvenlik sunar.',
          'Özellikle Beşiktaş, Etiler, Ulus çatı dubleks terasları ile kafe, restoran ve otel dış mekanlarında tek kumanda ile birden fazla cephe senkronize şekilde saniyeler içinde açılıp kapatılabilir.',
        ],
        subSections: [
          {
            heading: 'Silinebilir Kanat Tasarımı ve EPDM Fırça Conta Sızdırmazlığı',
            text: 'Özel dıştan içe açılabilir silinebilir kanat opsiyonu sayesinde yüksek katlarda dış cam temizliği güvenle yapılabilir. Yan dikme kanallardaki çift sıra EPDM ve kıl fitil bariyerleri rüzgâr ıslığını ve yağmur suyu sızıntısını tamamen keser.',
          },
          {
            heading: 'Çelik Zincirli Ağır Hizmet Tahrik Sistemi',
            text: 'Ucuz plastik kayışlı mekanizmaların aksine kopmaya dayanıklı çift taraflı çelik zincir taşıyıcı sistem, 4+16+4 ısıcam ağırlığını yıllarca sessiz ve dengeli biçimde taşır.',
          },
        ],
      },
    ],
    priceRows: [
      { system: 'Tek Camlı Motorlu Giyotin (8/10 mm)', spec: 'Temperli Cam + Becker/Somfy Motor', priceRange2026: '6.900 – 7.800 ₺ / m²' },
      { system: 'Isıcamlı Motorlu Giyotin (4+16+4)', spec: 'Argonlu Isıcam + Çelik Zincir Tahrik', priceRange2026: '8.400 – 9.800 ₺ / m²' },
      { system: 'Silinebilir Premium Giyotin (Somfy RTS)', spec: 'Akıllı Ev + Yağmur Sensörü Uyumlu', priceRange2026: '9.600 – 11.200 ₺ / m²' },
    ],
    calculatorHref: '/fiyat-hesapla?seri=vgs_giyotin',
    faqs: [
      {
        question: 'Elektrik kesildiğinde motorlu giyotin cam nasıl kullanılır?',
        answer:
          'Giyotin camlar elektrik kesintisinde bulunduğu konumda emniyetli olarak kilitli kalır. İsteğe bağlı harici UPS güç kaynağı entegrasyonu ile kesintilerde de kumandadan açma-kapama yapılabilir.',
      },
      {
        question: 'Giyotin cam çocuklu evler ve yüksek teraslar için güvenli mi?',
        answer:
          'Evet. Sistem tamamen açıldığında en alt sabit panel 110 cm yüksekliğinde temperli cam korkuluk işlevi görür; ayrıca kanat birleşimlerinde el sıkışma önleyici emniyet profili standarttır.',
      },
      {
        question: 'Kafe ve restoranlarda birden fazla giyotin tek kumandayla yönetilebilir mi?',
        answer:
          'Çok kanallı Somfy RTS kumanda ile 16 farklı cephe hem ayrı ayrı hem de tek tuşla grup halinde aynı anda kontrol edilebilir.',
      },
    ],
  },
  {
    slug: 'kis-bahcesi-sistemleri',
    name: 'Kış Bahçesi & Bioklimatik Pergola',
    footerLabel: 'Kış Bahçesi & Bioklimatik Pergola',
    h1: 'Kış Bahçesi Sistemleri, Bioklimatik Pergola & 2026 m² Fiyatları',
    metaTitle: 'Kış Bahçesi Sistemleri & Bioklimatik Pergola Fiyatları 2026 | Çelikpen',
    metaDescription:
      'Villa, teras ve bahçe katları için dört mevsim lamine ısıcam tavanlı kış bahçesi ve motorlu bioklimatik pergola sistemleri. Gizli su tahliyesi, LED aydınlatma ve 2026 fiyat listesi.',
    keywords: [
      'kış bahçesi',
      'kış bahçesi fiyatları',
      'bioklimatik pergola',
      'rolling roof fiyatları',
      'cam tavan kış bahçesi',
      'villa kış bahçesi İstanbul',
    ],
    heroImage: '/images/seo/hizmet-kis-bahcesi.jpg',
    heroImageAlt: 'Sarıyer ve Avrupa Yakası villaları için dört mevsim motorlu bioklimatik pergola ve lamine ısıcamlı kış bahçesi — Çelikpen',
    heroImageTitle: 'Kış Bahçesi ve Bioklimatik Pergola Sistemleri 2026',
    heroSubtitle:
      '150 kg/m² kar yüküne dayanıklı taşıyıcı alüminyum karkas, kendi ekseninde dönen bioklimatik lamel veya 4+16+4 lamine ısıcam tavan ile dört mevsim yaşam alanı.',
    aiSummary:
      'Çelikpen kış bahçesi ve bioklimatik pergola sistemleri, T66 statik alüminyum taşıyıcı yapı, gizli yağmur oluğu, dimmerli LED aydınlatma ve ısıcamlı sürgülü/giyotin cephe entegrasyonuyla teras ve villa bahçelerini 12 ay yaşanabilir odalara dönüştürür.',
    videoUrl: '',
    specs: [
      { label: 'Tavan Seçeneği', value: 'Bioklimatik Alüminyum Lamel (0°–135°) veya Lamine Isıcam' },
      { label: 'Statik Kar Yükü', value: '150 kg/m² Ağır Kış Koşullarına Dayanıklı T66 Karkas' },
      { label: 'Cephe Entegrasyonu', value: 'Isıcamlı Katlanır, Eşiksiz Sürme, Giyotin veya HS 76' },
      { label: 'Su Tahliyesi', value: 'Taşıyıcı Dikme İçinden %100 Gizli Yağmur Drenajı' },
      { label: 'Aydınlatma', value: 'Entegre Günışığı / RGB Dimmerli Samsung LED Spot' },
      { label: 'Isı & Ses Yalıtımı', value: 'Uw: 1.1 W/m²K • -40 dB Akustik Konfor' },
    ],
    sections: [
      {
        heading: 'Bioklimatik Pergola mı, Sabit Cam Tavan Kış Bahçesi mi?',
        paragraphs: [
          'Motorlu bioklimatik pergola (Rolling Roof) sistemlerinde alüminyum tavan panelleri hem kendi ekseninde dönerek doğal hava sirkülasyonu sağlar hem de tamamen geriye toplanarak açık gökyüzü keyfi sunar. Kış aylarında ise EPDM contalı kilitlenen lameller su ve kar girişini engeller.',
          'Sabit cam tavan kış bahçeleri ise 4+4 lamine + 16 mm argon boşluk + 6 mm temperli güneş kontrollü Konfor cam kombinasyonuyla maksimum doğal gün ışığı ve kesintisiz yalıtım isteyen villa ve çatı dubleksleri için idealdir.',
        ],
        subSections: [
          {
            heading: 'Gizli Dere Tahliyesi ve Su Sızdırmazlık Detayları',
            text: 'Tavan eğimi lazerle hesaplanır; yağmur suyu taşıyıcı alüminyum oluklardan geçerek kolon içindeki gizli tahliye borularıyla doğrudan zemine aktarılır. Duvar birleşim noktalarında poliüretan esaslı UV dayanımlı yalıtım bariyerleri uygulanır.',
          },
          {
            heading: 'Çevre Cephe Kapatma Kombinasyonları',
            text: 'Kış bahçesi çevresi; kullanım alışkanlığına göre Winsa Panorama HS 76 kaldır-sür kapı, Vera Termal ısıcamlı cam balkon veya Somfy motorlu giyotin cam sistemleriyle tam uyumlu kapatılır.',
          },
        ],
      },
    ],
    priceRows: [
      { system: 'Sabit Lamine Isıcam Tavan Kış Bahçesi', spec: 'T66 Karkas + 4+4 Lamine Isıcam', priceRange2026: '9.800 – 12.500 ₺ / m²' },
      { system: 'Motorlu Bioklimatik Pergola (Vela / Rolling Roof)', spec: 'Somfy Motor + LED + Gizli Oluk', priceRange2026: '11.500 – 14.800 ₺ / m²' },
      { system: 'Komple 4 Mevsim Kış Bahçesi (Tavan + Cephe)', spec: 'Bioklimatik/Cam Tavan + Isıcamlı Cephe', priceRange2026: 'Projeye Özel Net Keşif' },
    ],
    calculatorHref: '/fiyat-hesapla?seri=pergola',
    faqs: [
      {
        question: 'Bioklimatik pergola tavanı şiddetli yağmurda su damlatır mı?',
        answer:
          'Hayır. Paneller kapandığında EPDM contalar birbirine kenetlenir ve yağmur suyu entegre yan derelerden taşıyıcı dikme içine yönlendirilerek tamamen sızdırmaz tahliye edilir.',
      },
      {
        question: 'Kış bahçesi kurulumu kaç gün sürer?',
        answer:
          'Lazerli keşif ve statik projelendirme sonrası Kocasinan Merkez tesisimizde ön imalat 10–15 iş gününde tamamlanır; yerinde montaj ise proje büyüklüğüne göre 2–4 gün içinde teslim edilir.',
      },
      {
        question: 'Teras ve bahçede ısıtma sistemleriyle uyumlu mudur?',
        answer:
          'Evet. Isıcamlı tavan ve cephe kombinasyonu sayesinde yerden ısıtma, şömine veya elektrikli radyant ısıtıcılarla kışın oda sıcaklığı düşük enerji tüketimiyle korunur.',
      },
    ],
  },
  {
    slug: 'pimapen-pvc-dograma',
    name: 'Pimapen & Winsa PVC Doğrama',
    footerLabel: 'Pimapen & Winsa PVC Doğrama',
    h1: 'Pimapen & Winsa PVC Pencere Kapı Doğrama Sistemleri (2026 Fiyatları)',
    metaTitle: 'Pimapen & Winsa PVC Pencere Fiyatları 2026 | Dorado 76 & Revotech Gold | Çelikpen',
    metaDescription:
      'Winsa Yetkili Bayisi Çelikpen ile 2026 pimapen ve PVC doğrama fiyatları. Dorado 76, 84 mm 7 odacıklı Revotech Gold ve Panorama HS 76 kaldır-sür sistemlerde A+ enerji tasarrufu.',
    keywords: [
      'pimapen',
      'pvc doğrama',
      'winsa pvc pencere fiyatları',
      'pimapen fiyatları 2026',
      'Winsa Dorado 76',
      'Winsa Revotech Gold 84 mm',
    ],
    heroImage: '/images/seo/hizmet-pimapen-pvc.jpg',
    heroImageAlt: 'Winsa Revotech Gold 84 mm antrasit gri PVC pencere ve kapı doğrama uygulaması — Çelikpen',
    heroImageTitle: 'Pimapen ve Winsa PVC Pencere Kapı Sistemleri 2026',
    heroSubtitle:
      'TS EN 12608-1 Sınıf A et kalınlığında Winsa Dorado 76, 7 odacıklı 3 contalı Revotech Gold (84 mm) ve Panorama HS 76 kaldır-sür doğrama çözümleri.',
    aiSummary:
      'Çelikpen, 30 yıllık Winsa yetkili bayiliğiyle İstanbul Avrupa Yakası genelinde Dorado 76 (Uw: 1.0), Revotech Gold 84 mm (Uw: 0.79, -46 dB) ve Panorama HS 76 PVC pencere-kapı sistemlerini 2026 fabrika fiyatlarıyla ücretsiz keşifle monte eder.',
    videoUrl: '',
    specs: [
      { label: 'Profil Genişliği', value: '76 mm (Dorado / Safir) • 84 mm (Revotech Gold)' },
      { label: 'Odacık & Conta', value: '5–7 Odacık • 2 veya 3 Sıra (Orta Conta) EPDM Bariyer' },
      { label: 'Isı İletim (Uw)', value: '0.79 W/m²K (Revotech Gold) • 1.0 W/m²K (Dorado 76)' },
      { label: 'Akustik Performans', value: '-46 dB’e Varan Trafik ve Şehir Gürültüsü İzolasyonu' },
      { label: 'Destek Sacı', value: '1,5–2,0 mm Galvanizli Çelik Takviye Profili' },
      { label: 'Cam Kalınlığı', value: '24 mm – 44 mm Çift veya Üçlü Şişecam Konfor/Sinerji' },
    ],
    sections: [
      {
        heading: 'Winsa Dorado 76 mı, Revotech Gold 84 mm mi Tercih Edilmeli?',
        paragraphs: [
          'İstanbul’un E-5, TEM, Basın Ekspres ve ana cadde akslarına bakan yüksek gürültülü ve rüzgârlı cephelerinde 84 mm kasa genişliğine, 7 odacığa ve orta contaya (3. conta) sahip Winsa Revotech Gold serisi -46 dB ses yalıtımı ve 0.79 W/m²K ısı geçirgenliğiyle maksimum koruma sağlar.',
          'Ara sokaklarda ve dengeli bütçe-performans hedefleyen daire yenilemelerinde ise 76 mm 5 odacıklı Winsa Dorado 76 ve 6 odacıklı Safir 76 serileri uzun ömürlü A+ yalıtım sunar.',
        ],
        subSections: [
          {
            heading: 'Panorama HS 76 Kaldır-Sür (Hebeschiebe) ve Comfort Slide Sürme',
            text: 'Geniş salon, teras ve bahçe çıkışları için 400 kg kanat taşıma kapasiteli Panorama HS 76 kaldır-sür sistemleri sıfır eşikli geçiş ve üstün rüzgâr/su sızdırmazlığı sunar.',
          },
          {
            heading: 'Söküm, Montaj ve Poliüretan + Mastik İzolasyon Standardı',
            text: 'Eski pencerelerin duvarlara zarar vermeden sökülmesi, kasa terazisinin lazerle alınması, yüksek yoğunluklu poliüretan köpük ve dış cephe UV dayanımlı silikon/mastik izolasyonu aynı gün tamamlanır.',
          },
        ],
      },
    ],
    priceRows: [
      { system: 'Winsa Dorado 76 / Safir 76 PVC', spec: '76 mm • 5–6 Odacık • Çift Isıcam', priceRange2026: '4.800 – 5.400 ₺ / m²' },
      { system: 'Winsa Revotech Gold 84 mm PVC', spec: '84 mm • 7 Odacık • 3 Conta • -46 dB', priceRange2026: '5.900 – 6.800 ₺ / m²' },
      { system: 'Winsa Comfort Slide Plus Sürme', spec: 'EPDM Vakum Contalı Yalıtımlı Sürme', priceRange2026: '6.400 – 7.400 ₺ / m²' },
      { system: 'Winsa Panorama HS 76 (Hebeschiebe)', spec: '400 kg Kanat • Sıfır Eşikli Teras Kapısı', priceRange2026: '7.900 – 9.500 ₺ / m²' },
    ],
    calculatorHref: '/fiyat-hesapla?seri=pvc_dograma',
    faqs: [
      {
        question: 'PVC pencere değişimi dairede kırma-dökme yapar mı?',
        answer:
          'Hayır. Kadrolu montaj ekibimiz eski kasaları duvar ve sıva bütünlüğünü koruyarak söker; özel pervazlı kasa profilleriyle boya-badana gerektirmeden temiz montaj yapar.',
      },
      {
        question: 'Antrasit gri ve ahşap desenli PVC profiller güneşte solar mı?',
        answer:
          'Winsa lamine folyoları UV koruma katmanlıdır; İstanbul güneşine ve deniz nemine karşı renk solması, kabarma ve soyulmaya karşı 10 yıl garantilidir.',
      },
      {
        question: 'Çift cam mı üçlü cam mı seçmeliyim?',
        answer:
          'Standart konutlarda 4+16+4 Argonlu Şişecam Konfor cam mükemmel sonuç verir; ana cadde veya kuzey rüzgârlı yüksek katlarda 36–44 mm üçlü akustik ısıcam önerilir.',
      },
    ],
  },
  {
    slug: 'aluminyum-dograma',
    name: 'Alüminyum Doğrama & Cephe Sistemleri',
    footerLabel: 'Alüminyum Doğrama Sistemleri',
    h1: 'Alüminyum Doğrama, Isı Yalıtımlı Alüminyum Pencere & Cephe Sistemleri',
    metaTitle: 'Alüminyum Doğrama & Isı Yalıtımlı Alüminyum Cephe Fiyatları 2026 | Çelikpen',
    metaDescription:
      'Isı yalıtımlı alüminyum doğrama, mağaza vitrin doğraması, Aldoks, termal kırılımlı pencere-kapı ve alüminyum korkuluk sistemleri. İstanbul Avrupa Yakası üretici fiyatlarıyla.',
    keywords: [
      'alüminyum doğrama',
      'ısı yalıtımlı alüminyum',
      'alüminyum cephe',
      'alüminyum pencere kapı fiyatları',
      'mağaza vitrin alüminyum doğrama',
      'termal alüminyum doğrama İstanbul',
    ],
    heroImage: '/images/seo/hizmet-aluminyum-dograma.jpg',
    heroImageAlt: 'Isı yalıtımlı antrasit alüminyum doğrama pencere, kapı ve ticari cephe uygulaması — Çelikpen',
    heroImageTitle: 'Isı Yalıtımlı Alüminyum Doğrama ve Cephe Sistemleri 2026',
    heroSubtitle:
      'Polyamid ısı bariyerli termal alüminyum pencere-kapı, geniş açıklıklı kaldırma-sürme cepheler, ticari mağaza vitrinleri ve lamine camlı alüminyum korkuluklar.',
    aiSummary:
      'Çelikpen alüminyum doğrama sistemleri, poliamid ısı bariyerli (thermal break) profiller, QUALICOAT elektrostatik toz boya ve yüksek statik dayanım özellikleriyle modern rezidans, villa ve ticari mağaza vitrinlerinde uzun ömürlü mimari çözümler sunar.',
    videoUrl: '',
    specs: [
      { label: 'Isı Bariyeri', value: '24–34 mm Poliamid (PA66 GF25) Termal Kırılım' },
      { label: 'Yüzey Kaplama', value: 'QUALICOAT Elektrostatik Toz Boya & Eloksal' },
      { label: 'Uygulama Serileri', value: 'Isı Yalıtımlı C60/C70, Aldoks Vitrin & Hebeschiebe' },
      { label: 'Isı İletim (Uw)', value: '1.2 – 1.4 W/m²K (Termal Bariyerli Seri)' },
      { label: 'Korozyon Dayanımı', value: 'Sahil Hattı Tuzlu Neme %100 Dayanıklı Alaşım' },
      { label: 'Aksesuar', value: 'Ağır Hizmet Paslanmaz Menteşe & Çok Noktalı Kilit' },
    ],
    sections: [
      {
        heading: 'Isı Yalıtımlı (Termal Bariyerli) Alüminyum Doğramanın Avantajları',
        paragraphs: [
          'Geniş açıklıklı modern mimari cephelerde ince profil görünümü ve maksimum cam alanı isteyen villa, rezidans ve ofis projelerinde alüminyum doğrama rakipsiz statik mukavemet sağlar. İç ve dış profil arasına yerleştirilen poliamid ısı bariyeri sayesinde metalin ısı köprüsü tamamen kesilir.',
          'Ticari mağaza vitrinleri, apartman giriş kapıları, ofis ara bölmeleri ve lamine camlı balkon korkuluklarında da yoğun kullanıma dayanıklı ağır hizmet profilleriyle 30 yılı aşan sorunsuz ömür sunar.',
        ],
        subSections: [
          {
            heading: 'QUALICOAT Yüzey Teknolojisi ve Sınırsız RAL Renk Seçeneği',
            text: 'Sahil hattındaki tuzlu nem ve yüksek UV radyasyonuna karşı QUALICOAT sertifikalı fırın boya veya bronz/naturel eloksal kaplama uygulanır; çizilme ve paslanma yaşanmaz.',
          },
          {
            heading: 'Mağaza Vitrin Doğrama ve Otomatik Kapı Entegrasyonu',
            text: 'Ticari işletmeler için temperli/lamine güvenlik camlı vitrin doğramaları, fotoselli kayar kapı ve motorlu kepenk sistemleriyle tek elden projelendirilir.',
          },
        ],
      },
    ],
    priceRows: [
      { system: 'Aldoks / Isı Yalıtımsız Alüminyum Vitrin', spec: 'Mağaza Vitrini & Ofis Bölme', priceRange2026: '5.500 – 6.800 ₺ / m²' },
      { system: 'Isı Yalıtımlı Alüminyum Pencere & Kapı', spec: 'PA66 Poliamid Bariyer + Isıcam', priceRange2026: '7.800 – 9.800 ₺ / m²' },
      { system: 'Isı Yalıtımlı Alüminyum Kaldır-Sür Cephe', spec: 'Geniş Açıklık • Villa & Teras', priceRange2026: '10.500 – 13.500 ₺ / m²' },
    ],
    calculatorHref: '/iletisim?form=kesif',
    faqs: [
      {
        question: 'Alüminyum doğrama kışın soğuk geçirir veya terleme yapar mı?',
        answer:
          'Poliamid (PA66 GF25) ısı bariyerli termal kırılımlı alüminyum serilerimiz, iç ve dış yüzeyi birbirinden yalıtarak terleme ve ısı köprüsü oluşumunu önler.',
      },
      {
        question: 'Apartman giriş kapısı ve mağaza vitrini için hangi seri uygundur?',
        answer:
          'Yoğun yaya trafiği olan apartman girişleri ve mağaza vitrinlerinde ağır hizmet menteşeli, kalın etli alüminyum doğrama profilleri ve 4+4 / 5+5 lamine güvenlik camı uygulanır.',
      },
      {
        question: 'Özel RAL renklerinde üretim yapılabiliyor mu?',
        answer:
          'Evet. Antrasit RAL 7016, Mat Siyah RAL 9005, Bronz Eloksal ve kurumsal cephe projelerine özel tüm RAL kodlarında elektrostatik boyalı üretim yapılmaktadır.',
      },
    ],
  },
  {
    slug: 'sineklik-sistemleri',
    name: 'Plise & Kedi Sinekliği Sistemleri',
    footerLabel: 'Plise & Kedi Sinekliği Sistemleri',
    h1: 'Plise (Pileli) Sineklik, Yırtılmaz Kedi Sinekliği & 2026 Fiyatları',
    metaTitle: 'Plise Sineklik & Yırtılmaz Kedi Sinekliği Fiyatları 2026 | Çelikpen',
    metaDescription:
      'Cam balkon, PVC pencere ve balkon kapıları için yırtılmaz çelik/polyester kedi sinekliği, yatay-dikey plise sineklik ve cam üstü plise perde sistemleri. Aynı gün ölçü ve montaj.',
    keywords: [
      'plise sineklik',
      'kedi sinekliği',
      'sineklik fiyatları',
      'cam balkon sinekliği',
      'yırtılmaz kedi sinekliği İstanbul',
      'pileli sineklik fiyatları 2026',
    ],
    heroImage: '/images/seo/hizmet-sineklik.jpg',
    heroImageAlt: 'Cam balkon ve PVC pencereler için yırtılmaz kedi tüllü sineklik ve akordeon plise sineklik uygulaması — Çelikpen',
    heroImageTitle: 'Plise Sineklik ve Yırtılmaz Kedi Sinekliği Sistemleri 2026',
    heroSubtitle:
      'Evcil hayvan patilerine dayanıklı yırtılmaz kedi tülü, dar alanlarda yer kaplamayan akordeon plise (pileli) sineklik ve cam balkon uyumlu duble açılım çözümleri.',
    aiSummary:
      'Çelikpen sineklik sistemleri, PVC pencere, kapı ve cam balkonlara özel alüminyum kasa, UV dayanımlı plise tül ve tırmalamaya karşı yüksek mukavemetli yırtılmaz kedi sinekliği seçenekleriyle İstanbul Avrupa Yakası genelinde ölçüye özel üretilir.',
    videoUrl: '',
    specs: [
      { label: 'Tül Seçenekleri', value: 'UV Fiberglass Plise Tül • Yırtılmaz Kedi/Çelik Tül' },
      { label: 'Açılım Tipleri', value: 'Yatay Plise, Dikey Plise, Duble Kapı & Menteşeli Kedi' },
      { label: 'Kasa Profili', value: '1,2 mm Kalın Etli Elektrostatik Boyalı Alüminyum' },
      { label: 'Cam Balkon Uyumu', value: 'Katlanır ve Eşiksiz Sürme Sistemlere %100 Uyumlu' },
      { label: 'Kilit Güvenliği', value: 'Evcil Hayvanların Açamayacağı Çift Emniyet Kilidi' },
      { label: 'Teslim Süresi', value: 'Ölçü Alımından Sonra 2–4 İş Gününde Montaj' },
    ],
    sections: [
      {
        heading: 'Yırtılmaz Kedi Sinekliği ile Standart Plise Sineklik Arasındaki Fark',
        paragraphs: [
          'Kedi ve köpek beslenen dairelerde standart fiberglass sineklik tülleri tırnak darbesiyle kısa sürede yırtılabilir ve yüksek katlarda ciddi düşme riski oluşturur. Çelikpen yırtılmaz kedi sinekliği, PVC kaplı yüksek mukavemetli çelik/polyester örgü tül, kalın alüminyum çerçeve ve özel kedi kilitleriyle evcil dostlarınız için tam güvenlik sağlar.',
          'Akordeon şeklinde katlanan plise (pileli) sineklikler ise kapı ve pencerelerde içe veya dışa açılma payı gerektirmez; özellikle panjurlu pencerelerde ve cam balkon çıkışlarında en ergonomik çözümdür.',
        ],
        subSections: [
          {
            heading: 'Cam Balkon İçi Plise Sineklik ve Plise Perde Entegrasyonu',
            text: 'Cam balkon kanatlarına engel olmadan çalışan içe açılır/sürme plise sineklik ve güneş kontrolü sağlayan cam üstü plise perde sistemleri tek keşifte ölçülendirilip uygulanır.',
          },
          {
            heading: 'Renk Uyumlu Alüminyum Çerçeve Seçenekleri',
            text: 'Beyaz, Antrasit Gri (RAL 7016), Altın Meşe, Maun ve Mat Siyah doğrama renklerinizle birebir uyumlu alüminyum kasalarla estetik bütünlük korunur.',
          },
        ],
      },
    ],
    priceRows: [
      { system: 'Pencere Plise (Pileli) Sineklik', spec: 'Standart Pencere Ölçüsü • Alüminyum Kasa', priceRange2026: '1.150 – 1.450 ₺ / Adet' },
      { system: 'Kapı Plise Sineklik (Tek / Duble)', spec: 'Balkon & Teras Kapısı • Eşiksiz Alt Ray', priceRange2026: '1.850 – 2.950 ₺ / Adet' },
      { system: 'Yırtılmaz Kedi Sinekliği (Pencere)', spec: 'Patiye Dayanıklı Özel Tül + Çift Kilit', priceRange2026: '1.750 – 2.350 ₺ / Adet' },
      { system: 'Cam Balkon Plise Perde', spec: 'Güneş Kırıcı & Mahremiyet • m² Bazlı', priceRange2026: '950 – 1.250 ₺ / m²' },
    ],
    calculatorHref: '/fiyat-hesapla',
    faqs: [
      {
        question: 'Kedi sinekliği gerçekten kedinin tırnağıyla yırtılmaz mı?',
        answer:
          'Evet. Standart tül yerine PVC kaplı güçlendirilmiş pet-screen veya ince paslanmaz çelik örgü tül kullanılır; kedilerin tırmanmasına ve tırnak darbelerine karşı yırtılmaz yapıdadır.',
      },
      {
        question: 'Dıştan takma veya monoblok panjurlu pencerelere plise sineklik olur mu?',
        answer:
          'Evet. 17 mm ince profilli plise sineklik kasalarımız panjur rayı ile pencere doğraması arasındaki dar boşluğa tam oturacak şekilde üretilir.',
      },
      {
        question: 'Plise sineklik temizliği nasıl yapılır?',
        answer:
          'Tül yüzeyi nemli yumuşak bez veya elektrik süpürgesinin fırçalı ucuyla kolayca temizlenir; sert fırça ve kimyasal çözücü kullanılmaması önerilir.',
      },
    ],
  },
  {
    slug: 'pimapen-cam-balkon-tamiri',
    name: 'Pimapen & Cam Balkon Tamiri',
    footerLabel: 'Pimapen & Cam Balkon Tamiri',
    h1: 'Pimapen Tamircisi, Cam Balkon Tamiri, Conta & Tekerlek Değişimi',
    metaTitle: 'Pimapen Tamircisi & Cam Balkon Tamiri İstanbul | Conta & Rulman Değişimi | Çelikpen',
    metaDescription:
      'İstanbul Avrupa Yakası pimapen tamircisi ve cam balkon tamiri servisi. EPDM conta değişimi, çift açılım ispanyolet ayarı, cam balkon tekerlek/rulman ve alüminyum fitil yenileme.',
    keywords: [
      'pimapen tamircisi',
      'cam balkon tamiri',
      'conta ve tekerlek değişimi',
      'pimapen pencere ayarı',
      'cam balkon fitil değişimi',
      'Bahçelievler pimapen tamircisi',
    ],
    heroImage: '/images/seo/hizmet-tamir-bakim.jpg',
    heroImageAlt: 'Pimapen pencere EPDM conta değişimi, ispanyolet ayarı ve cam balkon paslanmaz rulman tamir servisi — Çelikpen',
    heroImageTitle: 'Pimapen Tamircisi ve Cam Balkon Bakım Servisi 2026',
    heroSubtitle:
      'Soğuk ve rüzgâr alan PVC pencerelerde EPDM conta yenileme, sarkan kapı-pencere ayarı, kırık kol/ispanyolet değişimi ve zor açılan cam balkonlarda paslanmaz rulman bakımı.',
    aiSummary:
      'Çelikpen teknik servisi, İstanbul Avrupa Yakası genelinde pimapen pencere-kapı ayarı, EPDM kauçuk conta değişimi, ispanyolet/menteşe yenileme, cam balkon paslanmaz tekerlek değişimi ve sararan fitillerin alüminyum mıknatıslı fitille değiştirilmesi hizmetlerini garantili sunar.',
    videoUrl: '',
    specs: [
      { label: 'PVC Conta Yenileme', value: 'Orijinal Siyah/Gri EPDM Kauçuk Conta (Sızdırmazlık)' },
      { label: 'Mekanizma Tamiri', value: 'İspanyolet, Çift Açılım, Kilit ve Menteşe Değişimi' },
      { label: 'Cam Balkon Rulman', value: 'AISI 304 Paslanmaz Çelik 8 Bilyalı Tekerlek Seti' },
      { label: 'Fitil Yenileme', value: 'Sararan Plastik Yerine Alüminyum Mıknatıslı Fitil' },
      { label: 'Isıcam Değişimi', value: 'Buğulanan veya Çatlayan Isıcam Ünitesi Yenileme' },
      { label: 'Servis Bölgesi', value: 'Bahçelievler Merkez’den Tüm Avrupa Yakası’na Hızlı Servis' },
    ],
    sections: [
      {
        heading: 'Pimapen Pencere Neden Rüzgâr ve Soğuk Alır? Kesin Tamir Çözümleri',
        paragraphs: [
          'Zamanla sertleşen ve ezilen PVC contalar, sarkan kanat menteşeleri veya yazlık/kışlık baskı ayarı bozulan ispanyolet kilit mekanizmaları pencerelerden soğuk hava, toz ve trafik gürültüsü girmesine yol açar. Yeni pencere yaptırmaya gerek kalmadan orijinal EPDM conta değişimi ve hassas kanat ayarıyla ısı yalıtımı ilk günkü performansına döner.',
          'Cam balkonlarda ise kanatların rayda zor yürümesi, sürtme yapması veya yağmur suyu sızdırması genellikle aşınmış plastik tekerleklerden ve güneşten sertleşmiş fitillerden kaynaklanır.',
        ],
        subSections: [
          {
            heading: 'Cam Balkon Tekerlek (Rulman) ve Alüminyum Fitil Değişimi',
            text: 'Kırılan veya paslanan eski tekerlekler AISI 304 paslanmaz çelik rulmanlarla değiştirilir; sararan ve kopan plastik ara fitiller ömürlük alüminyum mıknatıslı fitillerle yenilenir.',
          },
          {
            heading: 'Çift Açılım Dönüşümü ve Çocuk Emniyet Kilidi Montajı',
            text: 'Tek açılır PVC pencereleriniz mekanizma revizyonuyla vasistaslı (çift açılım) hale getirilebilir; yüksek katlardaki tüm pencere ve cam balkonlara çelik halatlı çocuk emniyet kilidi takılır.',
          },
        ],
      },
    ],
    priceRows: [
      { system: 'PVC Pencere / Kapı Ayarı & Bakım', spec: 'Kanat Terazi + Kışlık Baskı Ayarı', priceRange2026: '750 – 1.250 ₺ / Servis' },
      { system: 'EPDM Kauçuk Conta Değişimi', spec: 'Kasa + Kanat Çift Sıra Yenileme', priceRange2026: '90 – 140 ₺ / mtül' },
      { system: 'Cam Balkon Tekerlek (Rulman) Değişimi', spec: 'Paslanmaz 8 Bilyalı Rulman Seti', priceRange2026: '350 – 550 ₺ / Kanat' },
      { system: 'Cam Balkon Alüminyum Fitil Yenileme', spec: 'UV Dayanımlı Mıknatıslı / H Fitil', priceRange2026: '180 – 280 ₺ / mtül' },
    ],
    calculatorHref: '/iletisim?form=kesif',
    faqs: [
      {
        question: 'Aynı gün pimapen ve cam balkon tamir servisi geliyor mu?',
        answer:
          'Bahçelievler Kocasinan Merkez merkezli mobil servis araçlarımızla Bahçelievler, Bakırköy, Bağcılar, Güngören, Küçükçekmece ve Avrupa Yakası genelinde aynı gün veya ertesi gün servis sağlıyoruz.',
      },
      {
        question: 'İçi buğulanan veya kırılan pimapen ısıcamı değiştirilebilir mi?',
        answer:
          'Evet. Pencere kasasını sökmeden yalnızca vakumu bozulmuş veya çatlamış ısıcam ünitesini ölçüp 4+16+4 Şişecam ısıcam ile yeniliyoruz.',
      },
      {
        question: 'Başka firmanın taktığı cam balkona tamir ve fitil değişimi yapıyor musunuz?',
        answer:
          'Evet. Marka fark etmeksizin tüm katlanır, sürme ve ısıcamlı cam balkon sistemlerinde rulman, kilit, silikon izolasyonu ve alüminyum fitil yenileme hizmeti veriyoruz.',
      },
    ],
  },
];

export function getSeoServiceBySlug(slug: string): SeoServicePageData | undefined {
  return SEO_SERVICE_PAGES.find((item) => item.slug === slug);
}
