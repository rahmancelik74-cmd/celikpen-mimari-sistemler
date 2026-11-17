import { CELIKPEN_PRICING_CONFIG, type SystemSeriesId } from '../config/pricing.config';
import {
  COMMON_EXTERNAL_AUTHORITIES,
  type RawBlogPost,
} from './blogTypes';

const SYSTEMS = CELIKPEN_PRICING_CONFIG.systems;
const tl = (value: number) =>
  `${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(value)} TL`;
const m2 = (id: SystemSeriesId) => `${tl(SYSTEMS[id].netPricePerM2)}/m²`;
const MIN_AREA = CELIKPEN_PRICING_CONFIG.minBillableAreaM2;
const BULK = Math.round(CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate * 100);
const CAT_SCREEN = tl(CELIKPEN_PRICING_CONFIG.addons.catScreenPerUnit);
const PLEATED = `${tl(CELIKPEN_PRICING_CONFIG.addons.pleatedBlindPerM2)}/m²`;

export const BLOG_ARTICLES_PART_1: RawBlogPost[] = [
  /* ============================================================================
     1. 2026 İSTANBUL CAM BALKON M2 FİYATLARI: AVRUPA YAKASI KOMPLE MALİYET REHBERİ
     ============================================================================ */
  {
    slug: '2026-istanbul-cam-balkon-m2-fiyatlari-avrupa-yakasi-rehberi',
    slugAliases: [
      'isicamli-cam-balkon-rehberi-2026',
      '2026-istanbul-cam-balkon-m2-fiyatlari',
    ],
    title: '2026 İstanbul Cam Balkon m² Fiyatları: Avrupa Yakası Komple Maliyet Rehberi',
    seoTitle: '2026 İstanbul Cam Balkon m² Fiyatları | Avrupa Yakası Maliyet Rehberi',
    metaDescription:
      '2026 İstanbul Avrupa Yakası cam balkon m² fiyatları: ısıcamlı, katlanır, eşiksiz sürme ve motorlu giyotin cam balkon net birim maliyetleri ve hesaplama rehberi.',
    primaryKeyword: 'istanbul cam balkon m2 fiyatları 2026',
    secondaryKeywords: [
      'avrupa yakası cam balkon fiyatları',
      'ısıcamlı cam balkon m2 fiyatı 2026',
      'katlanır cam balkon fiyatları istanbul',
      'cam balkon maliyet hesaplama',
    ],
    tags: [
      '#CamBalkonFiyatları2026',
      '#İstanbulCamBalkon',
      '#AvrupaYakasıCamBalkon',
      '#IsıcamlıCamBalkon',
      '#MaliyetRehberi',
    ],
    keywords: [
      'istanbul cam balkon m2 fiyatları 2026',
      'avrupa yakası cam balkon fiyatları',
      'ısıcamlı cam balkon m2 fiyatı',
      'cam balkon hesaplama',
    ],
    category: 'Cam Balkon',
    readTime: 12,
    publishDate: '2026-01-10',
    updatedDate: '2026-11-01',
    image: '/images/blog/blog-01-istanbul-fiyatlari.jpeg',
    imageAlt:
      '2026 İstanbul Avrupa Yakası panoramik ısıcamlı katlanır cam balkon uygulaması ve m² maliyet rehberi — Çelikpen',
    imageCaption:
      'Bahçelievler Kocasinan Merkez üretim tesisimizden İstanbul Avrupa Yakası genelinde uygulanan 4+20+4 mm argon gazlı ısıcamlı cam balkon sistemi.',
    imageTitle: '2026 İstanbul Cam Balkon m² Fiyatları ve Sistem Karşılaştırması',
    excerpt:
      'İstanbul Avrupa Yakası’nda 2026 yılı cam balkon m² fiyatlarını; 8 mm ve 10 mm temperli katlanır, 4+20+4 argon gazlı ısıcamlı, eşiksiz sürme ve motorlu giyotin sistemler bazında şeffaf fabrika verileriyle inceliyoruz.',
    highlights: [
      `8 mm / 10 mm Katlanır Seri: ${m2('vns_8mm')} – ${m2('vns_10mm')}`,
      `4+20+4 Argonlu Isıcamlı Seri: ${m2('vbs_isicam')}`,
      `5+ Daire Toplu Bina Projelerinde Net %${BULK} İndirim`,
    ],
    featured: true,
    relatedProductHref: '/fiyat-hesapla',
    numberedChecklistTitle: 'Cam Balkon Fiyat Teklifi Alırken 6 Kritik Mühendislik Kontrolü',
    numberedChecklist: [
      'Teklifteki m² birim fiyatının montaj, paslanmaz rulman ve alüminyum fitilleri kapsayan net anahtar teslim fiyat olduğunu teyit edin.',
      'Cam plakalarının üzerinde silinmez TSE EN 12150 Şişecam Temper mührü bulunduğunu sözleşmeye ekletin.',
      '5. kat ve üzeri dairelerde rüzgâr yükü (EN 12210) güvenliği için minimum 10 mm tek cam veya 4+20+4 mm her iki yüzü temperli ısıcam seçin.',
      'Balkon ölçümlerinin su terazisi yerine 3 boyutlu lazer terazi ile yapıldığını kontrol edin.',
      'Plastik sararan fitil yerine UV dayanımlı alüminyum mıknatıslı fitil ve çift sıra EPDM conta kullanıldığını doğrulayın.',
      'Apartman veya sitede 5+ daire birlikte yaptırarak toplu bina indiriminden (%15) yararlanın.',
    ],
    sections: [
      {
        id: '2026-cam-balkon-m2-birim-fiyat-tablosu',
        heading: '2026 İstanbul Avrupa Yakası Güncel Cam Balkon m² Birim Fiyatları',
        paragraphs: [
          `İstanbul Avrupa Yakası’nda cam balkon yaptırmak isteyen konut ve villa sahipleri için maliyetleri belirleyen en önemli unsur; seçilen sistemin termal yalıtım kapasitesi, cam kalınlığı ve alüminyum profil et kalınlığıdır. Bahçelievler Kocasinan Merkez’deki CNC üretim tesisimizden Bakırköy, Beşiktaş, Sarıyer, Başakşehir, Beylikdüzü ve tüm [Avrupa Yakası hizmet bölgelerimize](/satis-noktalari) aracı komisyonu olmadan doğrudan fabrika satış fiyatlarıyla üretim yapıyoruz.`,
          `Aşağıdaki tabloda yer alan 2026 net m² birim fiyatlarımız; [Şişecam](https://www.sisecam.com.tr) TSE EN 12150 sertifikalı temperli güvenlik camı, AISI 304 paslanmaz çelik rulmanlar, alüminyum mıknatıslı sızdırmazlık fitilleri ve kadrolu ekibimizle anahtar teslim montaj dahil değerlerdir. Kendi balkon ölçünüze göre saniyeler içinde bütçe çıkarmak için [Canlı m² Fiyat Hesaplama](/fiyat-hesapla) modülümüzü kullanabilirsiniz.`,
        ],
        table: {
          caption: '2026 Çelikpen Fabrika Net Cam Balkon & Mimari Sistem m² Fiyat Listesi',
          headers: ['Sistem Serisi', 'Cam & Profil Teknik Özelliği', 'Isı / Ses Yalıtımı', '2026 Net m² Fiyatı'],
          rows: [
            [
              SYSTEMS.vns_8mm.code,
              SYSTEMS.vns_8mm.glassSpec,
              `%${SYSTEMS.vns_8mm.thermalSavingPercent} Isı / -${SYSTEMS.vns_8mm.acousticReductionDb} dB`,
              m2('vns_8mm'),
            ],
            [
              SYSTEMS.vns_10mm.code,
              SYSTEMS.vns_10mm.glassSpec,
              `%${SYSTEMS.vns_10mm.thermalSavingPercent} Isı / -${SYSTEMS.vns_10mm.acousticReductionDb} dB`,
              m2('vns_10mm'),
            ],
            [
              SYSTEMS.vbs_isicam.code,
              SYSTEMS.vbs_isicam.glassSpec,
              `%${SYSTEMS.vbs_isicam.thermalSavingPercent} Isı / -${SYSTEMS.vbs_isicam.acousticReductionDb} dB`,
              m2('vbs_isicam'),
            ],
            [
              SYSTEMS.vds_surme.code,
              SYSTEMS.vds_surme.glassSpec,
              `%${SYSTEMS.vds_surme.thermalSavingPercent} Isı / -${SYSTEMS.vds_surme.acousticReductionDb} dB`,
              m2('vds_surme'),
            ],
            [
              SYSTEMS.vds_isicamli.code,
              SYSTEMS.vds_isicamli.glassSpec,
              `%${SYSTEMS.vds_isicamli.thermalSavingPercent} Isı / -${SYSTEMS.vds_isicamli.acousticReductionDb} dB`,
              m2('vds_isicamli'),
            ],
            [
              SYSTEMS.vgs_giyotin.code,
              SYSTEMS.vgs_giyotin.glassSpec,
              `%${SYSTEMS.vgs_giyotin.thermalSavingPercent} Isı / -${SYSTEMS.vgs_giyotin.acousticReductionDb} dB`,
              m2('vgs_giyotin'),
            ],
          ],
        },
        subsections: [
          {
            id: 'balkon-m2-hesabi-nasil-yapilir',
            heading: 'Düz, L Tipi ve U Tipi Balkonlarda m² Hesabı Nasıl Yapılır?',
            paragraphs: [
              `Cam balkon m² alanı hesaplanırken balkonun kapatılacak toplam yatay genişliği (metre cinsinden) ile parapet üstünden tavana kadar olan net yüksekliği çarpılır. Örneğin 4,20 metre genişliğinde ve 1,90 metre yüksekliğinde düz bir balkonun toplam alanı 7,98 m²’dir. L veya U tipi köşe balkonlarda ise tüm cephelerin genişlikleri toplanarak yükseklikle çarpılır. Sektör standardı gereği ${MIN_AREA} m² altındaki küçük balkonlar minimum üretim alanı olan ${MIN_AREA} m² üzerinden fiyatlandırılır.`,
            ],
            bullets: [
              `Düz Balkon Örneği (4,20 m × 1,90 m = 7,98 m²): Vera Termal Isıcamlı sistemde ${m2('vbs_isicam')} birim fiyatla hesaplanır.`,
              `Kedi Tüllü Sineklik Entegrasyonu: Kanat/ünite başına sabit ${CAT_SCREEN} ek maliyetle projeye dahil edilir.`,
              `Termal Plise Perde: Güneş kontrolü ve mahremiyet için ${PLEATED} birim fiyatla cam kanat üstüne uygulanır.`,
            ],
          },
        ],
        proTip: `Apartman veya sitenizde 5 ve üzeri daire birlikte karar aldığında toplam tutar üzerinden net %${BULK} toplu bina indirimi uygulanır. Bu indirim hem m² maliyetini düşürür hem de dış cephede tek tip RAL renk bütünlüğü sağlar.`,
      },
      {
        id: 'avrupa-yakasi-ilcelerine-gore-sistem-secimi',
        heading: 'Avrupa Yakası İlçelerine Göre Doğru Sistem ve Bütçe Optimizasyonu',
        paragraphs: [
          `İstanbul Avrupa Yakası’nın mikro iklimi ilçeden ilçeye büyük farklılık gösterir. [Bakırköy, Florya ve Yeşilköy](/profesyoneller/referanslar) sahil bandında Marmara Denizi’nden gelen şiddetli lodos ve nem korozyonu ön plandayken; [Sarıyer Zekeriyaköy](/hizmetlerimiz/kis-bahcesi-sistemleri) ve [Eyüpsultan Göktürk](/hizmetlerimiz/bioklimatik-pergola) hattında kış sıcaklıkları şehir merkezinden 4–5 °C daha düşüktür.`,
          `[Başakşehir Bahçeşehir](/hizmetlerimiz/isicamli-cam-balkon) ve [Beylikdüzü](/hizmetlerimiz/katlanir-cam-balkon) gibi yüksek katlı blokların yoğun olduğu ilçelerde ise [TSE](https://www.tse.org.tr) EN 12210 rüzgâr yükü standardına uyumlu 10 mm temperli veya 4+20+4 mm ısıcamlı profiller tercih edilmelidir. Tüm sistem detaylarını [Hizmetlerimiz](/hizmetlerimiz) sayfasında karşılaştırabilirsiniz.`,
        ],
      },
    ],
    internalLinks: [
      {
        label: 'Canlı m² Fiyat Hesaplama Motoru',
        href: '/fiyat-hesapla',
        context: 'Balkon en ve boy ölçülerinizi girerek 30 saniyede net 2026 fabrika teklifinizi oluşturun.',
      },
      {
        label: 'Tüm Cam Balkon ve Doğrama Hizmetlerimiz',
        href: '/hizmetlerimiz',
        context: 'Katlanır, ısıcamlı, sürme, motorlu giyotin ve kış bahçesi sistemlerimizin teknik özellikleri.',
      },
      {
        label: 'Showroom ve Keşif Ağımız',
        href: '/satis-noktalari',
        context: 'Kocasinan Merkez fabrikamız ve Avrupa Yakası ücretsiz lazerli keşif ağımız.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[2],
    ],
    infographic: {
      title: '2026 Cam Balkon Sistemleri Isı Tasarrufu ve Yalıtım Performansı',
      subtitle: 'Tek camlı ve 4+20+4 argon gazlı ısıcamlı sistemlerin termal verimlilik karşılaştırması',
      metricUnit: '% Isı Koruma',
      items: [
        {
          label: `Winsa Vera Termal 4+20+4 Argonlu Isıcam (${m2('vbs_isicam')})`,
          value: SYSTEMS.vbs_isicam.thermalSavingPercent,
          displayValue: `%${SYSTEMS.vbs_isicam.thermalSavingPercent} Termal Tasarruf (-${SYSTEMS.vbs_isicam.acousticReductionDb} dB)`,
          barPercent: 95,
          highlight: true,
        },
        {
          label: `Winsa Vera Vertical Motorlu Giyotin Isıcam (${m2('vgs_giyotin')})`,
          value: SYSTEMS.vgs_giyotin.thermalSavingPercent,
          displayValue: `%${SYSTEMS.vgs_giyotin.thermalSavingPercent} Termal Tasarruf (-${SYSTEMS.vgs_giyotin.acousticReductionDb} dB)`,
          barPercent: 90,
          highlight: true,
        },
        {
          label: `Winsa Vera Pro 10 mm Temperli Katlanır (${m2('vns_10mm')})`,
          value: SYSTEMS.vns_10mm.thermalSavingPercent,
          displayValue: `%${SYSTEMS.vns_10mm.thermalSavingPercent} Rüzgâr & Yağmur Koruması (-${SYSTEMS.vns_10mm.acousticReductionDb} dB)`,
          barPercent: 55,
        },
        {
          label: `Winsa Vera 8 mm Temperli Katlanır (${m2('vns_8mm')})`,
          value: SYSTEMS.vns_8mm.thermalSavingPercent,
          displayValue: `%${SYSTEMS.vns_8mm.thermalSavingPercent} Standart Koruma (-${SYSTEMS.vns_8mm.acousticReductionDb} dB)`,
          barPercent: 48,
        },
      ],
      footnote: 'Veriler EN 1279 ve TS 825 standartlarındaki İstanbul 2. derece gün-derece iklim bölgesi ölçümlerine dayanmaktadır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: '2026 yılında İstanbul’da ısıcamlı cam balkon metrekare fiyatı ne kadar?',
        directAnswer: `2026 yılında Çelikpen fabrika çıkışlı 4+20+4 mm argon gazlı Winsa Vera Termal ısıcamlı cam balkon net metrekare fiyatı montaj dahil ${m2('vbs_isicam')}, 8 mm temperli katlanır cam balkon fiyatı ise ${m2('vns_8mm')} seviyesindedir.`,
      },
      {
        spokenQuestion: 'Ortalama 8 metrekarelik bir balkonun cam balkon maliyeti kaç TL tutar?',
        directAnswer: `8 metrekarelik standart bir balkonda 8 mm katlanır sistem seçildiğinde ${m2('vns_8mm')} birim fiyat üzerinden, 4+20+4 ısıcamlı sistem seçildiğinde ise ${m2('vbs_isicam')} birim fiyat üzerinden net maliyet hesaplanır; 5+ daire toplu alımlarda %${BULK} indirim uygulanır.`,
      },
    ],
    faqs: [
      {
        question: '2026 cam balkon m² fiyatlarına keşif ve montaj dahil mi?',
        answer:
          'Evet. Sitemizde ve fiyat hesaplama modülümüzde yer alan tüm m² birim fiyatlarına İstanbul Avrupa Yakası genelinde ücretsiz lazerli keşif, CNC üretim, Şişecam temperli cam ve kadrolu ekibimizle anahtar teslim montaj dahildir.',
      },
      {
        question: 'Antrasit gri veya mat siyah profil seçildiğinde fiyat farkı oluşur mu?',
        answer:
          'Çelikpen’de en çok tercih edilen Antrasit Gri (RAL 7016), Mat Siyah (RAL 9005) ve Beyaz elektrostatik fırın boyalı profillerde m² fiyat farkı alınmaz (0 TL/m²).',
      },
      {
        question: 'Isıcamlı cam balkon fiyat farkını kaç yılda amorti eder?',
        answer:
          '4+20+4 mm argon gazlı ısıcamlı cam balkon, tek cama göre ısı kaybını %72 oranında azalttığı için doğalgaz ve klima faturalarında sağladığı tasarrufla aradaki fiyat farkını ortalama 2 ila 3 kış sezonunda amorti eder.',
      },
      {
        question: 'Keşif sonrası verilen fiyatta sürpriz ek maliyet çıkar mı?',
        answer:
          'Hayır. Lazerli keşif sonrası imzalanan resmi sözleşmedeki net fiyat sabittir; sonradan silikon, fitil, nakliye veya montaj adı altında hiçbir ek ücret talep edilmez.',
      },
    ],
  },

  /* ============================================================================
     2. ISICAMLI CAM BALKON MU KLASİK CAM BALKON MU? ISI YALITIM TESTİ
     ============================================================================ */
  {
    slug: 'isicamli-cam-balkon-mu-klasik-cam-balkon-mu-isi-yalitim-testi',
    slugAliases: ['bahcelievler-isicamli-cam-balkon-yalitim'],
    title: 'Isıcamlı Cam Balkon mu Klasik Sistem mi? Konfor Cam ve Isı Yalıtım Karşılaştırması',
    seoTitle: 'Isıcamlı Cam Balkon mu Klasik Sistem mi? Isı Yalıtım Testi 2026',
    metaDescription:
      '4+20+4 mm argon gazlı ısıcamlı cam balkon ile 8 mm klasik tek camlı sistem arasındaki Ug ısı iletim katsayısı, terleme/buğulanma ve ses yalıtımı karşılaştırması.',
    primaryKeyword: 'ısıcamlı cam balkon mu klasik cam balkon mu',
    secondaryKeywords: [
      'ısıcamlı cam balkon ısı yalıtımı',
      'cam balkon kışın sıcak tutar mı',
      '4+20+4 argon gazlı ısıcam',
      'cam balkon terleme yapar mı',
    ],
    tags: [
      '#IsıcamlıCamBalkon',
      '#IsıYalıtımı',
      '#KonforCam',
      '#WinsaVeraTermal',
      '#EnerjiTasarrufu',
    ],
    keywords: [
      'ısıcamlı cam balkon mu klasik cam balkon mu',
      'ısıcamlı cam balkon yalıtım testi',
      'konfor cam balkon',
      'cam balkon yoğuşma çözümü',
    ],
    category: 'Cam Balkon',
    readTime: 11,
    publishDate: '2026-01-18',
    updatedDate: '2026-11-01',
    image: '/images/blog/blog-02-isicamli-vs-klasik.jpeg',
    imageAlt:
      'Winsa Vera Termal 4+20+4 mm argon gazlı ısıcamlı cam balkon ile klasik tek camlı sistemin ısı yalıtım karşılaştırması',
    imageCaption:
      'Her iki yüzü TSE EN 12150 temperli 28 mm (4+20+4) argon gazlı Konfor Isıcam ünitesi kışın balkon iç yüzey sıcaklığını koruyarak yoğuşmayı önler.',
    imageTitle: 'Isıcamlı Cam Balkon vs Klasik 8mm Tek Camlı Sistem Termal Analizi',
    excerpt:
      'Balkonunuzu kışın da evin sıcak bir odası olarak kullanmak istiyorsanız 8 mm tek cam (Ug: 5.8 W/m²K) ile 4+20+4 argonlu Konfor Isıcam (Ug: 1.1 W/m²K) arasındaki 4,2 katlık yalıtım farkını inceleyin.',
    highlights: [
      'Ug = 1.1 W/(m²K) ile tek cama göre 4,2 kat daha yüksek ısı bariyeri',
      'Kışın cam yüzeyinde terleme, buğulanma ve küf oluşumuna kesin çözüm',
      `Vera Termal 28 mm Isıcamlı Sistem: ${m2('vbs_isicam')} | Vera 8 mm: ${m2('vns_8mm')}`,
    ],
    relatedProductHref: '/hizmetlerimiz/isicamli-cam-balkon',
    numberedChecklistTitle: 'Gerçek Isıcamlı Cam Balkonu Sahte Çift Camdan Ayıran 5 Kriter',
    numberedChecklist: [
      'Her iki cam plakasının da (4 mm iç + 4 mm dış) ayrı ayrı temperli olduğunu cam köşesindeki TSE EN 12150 mühründen kontrol edin.',
      'İki cam arasındaki alüminyum veya warm-edge çıta içinde nem alıcı moleküler elek (desikant) bulunduğunu doğrulayın.',
      'Cam boşluğuna %90+ saflıkta argon gazı basıldığını ve birincil bütül + ikincil tiyokol/poliüretan sızdırmazlık uygulandığını teyit edin.',
      'Dış camda veya iç camda Şişecam Sinerji / Konfor Low-E kaplama kullanıldığını çakmak alevi yansıma testiyle görün.',
      'Kasa ve kanat profillerinin 28 mm cam kalınlığını taşıyacak 8 bilyalı ağır hizmet rulmanlarına sahip olduğunu inceleyin.',
    ],
    sections: [
      {
        id: 'termal-fizik-ug-ve-uw-karsilastirmasi',
        heading: 'Termodinamik Test: 8 mm Tek Cam ile 4+20+4 Argonlu Isıcam Arasındaki Fark',
        paragraphs: [
          `Klasik 8 mm veya 10 mm tek camlı katlanır sistemler ([Vera 8 / Vera Pro 10](/hizmetlerimiz/katlanir-cam-balkon)), balkonu yağmur, rüzgâr, toz ve kuş girişine karşı mükemmel korur. Ancak tek plaka camın ısı iletim katsayısı ($U_g$) yaklaşık 5,8 W/(m²K) seviyesindedir. Dışarıda hava 0 °C iken tek cam hızla soğur ve balkon içindeki sıcak havayı dışarı kaçırır.`,
          `Buna karşılık [Isıcamlı Cam Balkon](/hizmetlerimiz/isicamli-cam-balkon) sistemimizde kullanılan 28 mm (4 mm temperli + 20 mm argon gazı boşluğu + 4 mm Low-E temperli) [Şişecam](https://www.sisecam.com.tr) Konfor/Sinerji ünitesinde $U_g$ değeri 1,1 W/(m²K) seviyesine düşer. [İZODER](https://www.izoder.org.tr) TS 825 standartlarına göre bu değer, ısı kaybının %72 oranında azaltılması ve cam iç yüzeyinde yoğuşmanın (terlemenin) tamamen engellenmesi anlamına gelir.`,
        ],
        table: {
          caption: 'Klasik Tek Camlı vs 4+20+4 Argon Gazlı Isıcamlı Cam Balkon Teknik Karşılaştırması',
          headers: ['Teknik Parametre', 'Klasik 8 mm Tek Cam (Vera 8)', '10 mm Tek Cam (Vera Pro 10)', '4+20+4 Argonlu Isıcam (Vera Termal)'],
          rows: [
            ['Cam Kombinasyonu', '8 mm Temperli Tek Cam', '10 mm Temperli Tek Cam', '28 mm (4+20+4) İki Yüzü Temperli Isıcam'],
            ['Isı İletim Katsayısı (Ug)', '5,8 W/(m²K)', '5,7 W/(m²K)', '1,1 W/(m²K) (Low-E + Argon)'],
            ['Termal Isı Tasarrufu', `%${SYSTEMS.vns_8mm.thermalSavingPercent}`, `%${SYSTEMS.vns_10mm.thermalSavingPercent}`, `%${SYSTEMS.vbs_isicam.thermalSavingPercent}`],
            ['Akustik Ses Yalıtımı', `-${SYSTEMS.vns_8mm.acousticReductionDb} dB`, `-${SYSTEMS.vns_10mm.acousticReductionDb} dB`, `-${SYSTEMS.vbs_isicam.acousticReductionDb} dB`],
            ['Kışın Terleme / Buğulanma', 'Yüksek nemde görülebilir', 'Yüksek nemde görülebilir', 'Yoğuşma sınırının üstünde (Terleme yapmaz)'],
            ['2026 Net m² Fiyatı', m2('vns_8mm'), m2('vns_10mm'), m2('vbs_isicam')],
          ],
        },
      },
      {
        id: 'hangi-durumda-hangisi-secilmeli',
        heading: 'Hangi Balkonda Klasik Sistem, Hangi Balkonda Isıcamlı Sistem Seçilmeli?',
        paragraphs: [
          `Eğer balkonunuzu yalnızca yaz-bahar aylarında oturmak, kışın ise kiler veya çamaşır kurutma alanı olarak kullanmak istiyorsanız ${m2('vns_8mm')} fiyatlı Vera 8 veya yüksek katlar için ${m2('vns_10mm')} fiyatlı Vera Pro 10 ekonomik ve uzun ömürlü bir tercihtir.`,
          `Ancak balkonunuzu çalışma odası, kış bahçesi, yemek alanı veya çocuk oyun köşesi olarak 365 gün kullanmayı hedefliyorsanız ya da salonla balkon arasındaki kapıyı kışın açık bırakmak istiyorsanız ${m2('vbs_isicam')} birim fiyatlı Vera Termal ısıcamlı cam balkon tek doğru mühendislik çözümüdür. Bütçenizi karşılaştırmak için [Fiyat Hesapla](/fiyat-hesapla) aracımızı ziyaret edebilirsiniz.`,
        ],
        proTip: 'Güney ve batı cepheli balkonlarda mutlaka Şişecam Konfor (Solar Low-E) seçin; böylece hem kışın içerideki ısıyı korursunuz hem de Temmuz-Ağustos aylarında balkonun aşırı ısınmasını %40 azaltırsınız.',
      },
    ],
    internalLinks: [
      {
        label: 'Isıcamlı Cam Balkon Hizmet Detayları',
        href: '/hizmetlerimiz/isicamli-cam-balkon',
        context: '4+20+4 argon gazlı ısıcamlı cam balkon profil kesitleri ve uygulama örnekleri.',
      },
      {
        label: 'Katlanır Cam Balkon Sistemleri',
        href: '/hizmetlerimiz/katlanir-cam-balkon',
        context: '8 mm ve 10 mm Şişecam temperli klasik katlanır cam balkon serileri.',
      },
      {
        label: 'Online m² Maliyet Karşılaştırma Aracı',
        href: '/fiyat-hesapla',
        context: 'Tek camlı ve ısıcamlı sistemlerin balkon ölçünüze göre fiyat farkını anında görün.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[3],
      COMMON_EXTERNAL_AUTHORITIES[1],
    ],
    infographic: {
      title: 'Kış Gecesi (0 °C Dış Hava) Cam İç Yüzey Sıcaklığı Karşılaştırması',
      subtitle: 'Oda sıcaklığı 22 °C iken cam yüzeyinde hissedilen sıcaklık (Yüksek değer daha sıcak yüzeyi gösterir)',
      metricUnit: '°C Yüzey Sıcaklığı',
      items: [
        {
          label: '4+20+4 mm Argonlu Konfor Isıcam (Vera Termal)',
          value: 18,
          displayValue: '17,8 °C (Terleme Yok • Sıcak Dokunuş)',
          barPercent: 92,
          highlight: true,
        },
        {
          label: 'Standart 4+12+4 mm Normal Çift Cam',
          value: 13,
          displayValue: '12,9 °C (Orta Yalıtım)',
          barPercent: 68,
        },
        {
          label: '8 mm / 10 mm Klasik Tek Cam (Vera 8 / Pro 10)',
          value: 5,
          displayValue: '5,2 °C (Soğuk Yüzey • Yoğuşma Riski)',
          barPercent: 30,
        },
      ],
      footnote: 'EN 673 ve ISO 10292 termal sınır koşullarına göre hesaplanmıştır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Isıcamlı cam balkon gerçekten kışın balkonu sıcak tutar mı?',
        directAnswer:
          'Evet. 4+20+4 mm argon gazlı ve Low-E kaplamalı ısıcamlı cam balkon, standart tek cama göre ısı kaybını %72 azaltır ve kışın dışarısı 0 dereceyken balkon sıcaklığını oda sıcaklığına yakın tutar.',
      },
    ],
    faqs: [
      {
        question: 'Isıcamlı cam balkon kanatları ağır olduğu için sarkma yapar mı?',
        answer:
          'Hayır. Isıcamlı sistemlerde her kanat 8 adet paslanmaz çelik bilyalı ağır hizmet rulmanı (toplam 60 kg/kanat taşıma kapasiteli) ve 3 mm et kalınlığında T66 alüminyum kasa üzerinde hareket eder.',
      },
      {
        question: 'Mevcut 8 mm tek camlı cam balkon sonradan ısıcamlıya çevrilebilir mi?',
        answer:
          'Hayır. Tek camlı sistemlerin kasa ve baza kanalları 8–10 mm genişliğindedir; ısıcam ünitesi ise 24–28 mm kalınlığında olduğu için ısıcamlı sisteme özel geniş kasa ve rulman takımı gerektirir.',
      },
      {
        question: 'Isıcamlı cam balkonda iki cam arası zamanla buğulanır mı?',
        answer:
          'EN 1279 standardında bütül + tiyokol çift kademeli sızdırmazlık ve moleküler nem alıcı çıta ile üretilen ısıcam ünitelerimiz 10 yıl iki cam arası buğulanmama garantilidir.',
      },
      {
        question: 'Ses yalıtımı açısından ısıcamlı sistem ne kadar fark yaratır?',
        answer:
          '8 mm tek camlı sistemler dış gürültüyü yaklaşık -24 dB azaltırken, 4+20+4 mm ısıcamlı Vera Termal serisi -38 dB akustik yalıtım sağlayarak cadde gürültüsünü fısıltı seviyesine indirir.',
      },
    ],
  },

  /* ============================================================================
     3. BAKIRKÖY, FLORYA VE YEŞİLKÖY SAHİL HATTINDA CAM BALKON VE KIŞ BAHÇESİ
     ============================================================================ */
  {
    slug: 'bakirkoy-florya-yesilkoy-cam-balkon-ve-kis-bahcesi-cozumleri',
    title: 'Bakırköy, Florya ve Yeşilköy Sahil Hattında Rüzgar Yüküne Dayanıklı Cam Balkon Sistemleri',
    seoTitle: 'Bakırköy, Florya ve Yeşilköy Cam Balkon & Kış Bahçesi | Çelikpen',
    metaDescription:
      'Bakırköy, Florya, Yeşilköy ve Ataköy sahil hattında lodos fırtınasına (EN 12210 C4) ve deniz nemine dayanıklı ısıcamlı cam balkon, kış bahçesi ve Hebeschiebe sistemleri.',
    primaryKeyword: 'bakırköy florya yeşilköy cam balkon',
    secondaryKeywords: [
      'florya kış bahçesi sistemleri',
      'yeşilköy ısıcamlı cam balkon',
      'ataköy cam balkon fiyatları',
      'rüzgara dayanıklı cam balkon',
    ],
    tags: [
      '#BakırköyCamBalkon',
      '#FloryaKışBahçesi',
      '#YeşilköyCamBalkon',
      '#AtaköyCamBalkon',
      '#SahilYalıtımı',
    ],
    keywords: [
      'bakırköy cam balkon',
      'florya cam balkon',
      'yeşilköy kış bahçesi',
      'ataköy ısıcamlı cam balkon',
    ],
    category: 'Yerel Rehber',
    readTime: 11,
    publishDate: '2026-02-02',
    updatedDate: '2026-11-01',
    image: '/images/blog/blog-03-bakirkoy-florya.jpeg',
    imageAlt:
      'Bakırköy Florya ve Yeşilköy sahil hattında rüzgar yüküne dayanıklı ısıcamlı cam balkon ve kış bahçesi uygulaması',
    imageCaption:
      'Yeşilköy ve Florya sahil villalarında deniz korozyonuna dayanıklı QUALICOAT alüminyum profil ve 4+20+4 mm Konfor Isıcam uygulaması.',
    imageTitle: 'Bakırköy, Florya ve Yeşilköy Sahil Hattı Cam Balkon & Kış Bahçesi Rehberi',
    excerpt:
      'Marmara Denizi’nden doğrudan lodos fırtınası ve tuzlu nem alan Bakırköy, Florya, Yeşilköy ve Ataköy konutlarında AISI 304 paslanmaz rulmanlı ve EN 12210 C4 sınıfı cam balkon çözümleri.',
    highlights: [
      'Tuzlu deniz nemine karşı %100 AISI 304 paslanmaz çelik rulman ve aksam',
      'EN 12208 Sınıf 9A fırtına su deşarj kanallı damlalık kasa profili',
      `Bakırköy & Florya 15 dk içinde ücretsiz lazerli keşif (${m2('vbs_isicam')})`,
    ],
    relatedProductHref: '/hizmetlerimiz/isicamli-cam-balkon',
    numberedChecklistTitle: 'Sahil Hattı (Florya, Yeşilköy, Ataköy) Montajlarında 5 Mühendislik Şartı',
    numberedChecklist: [
      'Deniz tuzunun oluşturduğu korozyona karşı zamak/demir tekerlek yerine 304 kalite paslanmaz çelik rulman kullanın.',
      'Lodos yağmurlarının içeri sızmasını önleyen eğimli damlalık alt kasa ve gizli su tahliye kanalı tercih edin.',
      'Güneş ve deniz yansımasını dengelemek için Şişecam Konfor (Solar Low-E) veya füme/bronz reflekte ısıcam seçin.',
      'Yüksek rüzgâr basıncında kanat esnemesini sıfırlayan kenetli alüminyum mıknatıslı fitil sistemini şart koşun.',
      'Villa bahçe katlarında 300 kg kanat kapasiteli Winsa Panorama HS 76 Kaldır-Sür (Hebeschiebe) sistemini değerlendirin.',
    ],
    sections: [
      {
        id: 'sahil-hattinda-lodos-ve-korozyon-muhendisligi',
        heading: 'Florya, Yeşilköy ve Ataköy Sahil Hattında Lodos ve Deniz Nemi Koruması',
        paragraphs: [
          `[Bakırköy, Florya, Yeşilköy ve Ataköy](/profesyoneller/referanslar) hattı, Marmara Denizi’nden gelen güneybatı (lodos) fırtınalarına doğrudan açık bir kıyı şerididir. Standart iç kesim apartmanları için üretilen ince profilli ve plastik fitilli cam balkonlar, sahil bandında 100 km/saat hıza ulaşan lodos altında ıslık sesi yapar, kanat aralarından yağmur suyu sızdırır ve 1–2 yıl içinde rulmanları paslanarak kilitlenir.`,
          `Çelikpen Mimari Mühendislik Ekibi olarak Florya ve Yeşilköy’deki villa teraslarında ve Ataköy’deki yüksek katlı bloklarda [TSE](https://www.tse.org.tr) EN 12210 rüzgâr yükü standardında 3 mm et kalınlığına sahip T66 alüminyum profiller, çift sıra EPDM conta ve [Şişecam](https://www.sisecam.com.tr) 4+20+4 mm argonlu Konfor Isıcam uyguluyoruz.`,
        ],
        table: {
          caption: 'Bakırköy, Florya, Yeşilköy ve Ataköy Konut Tiplerine Göre Önerilen Sistemler',
          headers: ['Bölge & Konut Tipi', 'Önerilen Çelikpen Sistemi', 'Teknik Avantaj', '2026 Net m² Fiyatı'],
          rows: [
            ['Florya & Yeşilköy Bahçe Katı Villa', SYSTEMS.pergola.name, 'Motorlu Lamel / Isıcam Tavan + Gizli Drenaj', m2('pergola')],
            ['Ataköy (1-11. Kısım) Yüksek Kat Daire', SYSTEMS.vbs_isicam.name, '-38 dB Ses Yalıtımı + %72 Isı Koruma', m2('vbs_isicam')],
            ['Yeşilyurt & Sahil Geniş Teras Geçişi', SYSTEMS.hs_surme.name, '300 kg Kanat + Sınıf 9A Vakum Sızdırmazlık', m2('hs_surme')],
            ['Zuhuratbaba & Kartaltepe Aile Konutu', SYSTEMS.vds_isicamli.name, 'Eşiksiz Alt Ray + Kenetli Rüzgâr Kilidi', m2('vds_isicamli')],
          ],
        },
        proTip: 'Denize ilk paralel binalarda profil boyasının tuzlu nemden kabarmaması için QUALICOAT sertifikalı elektrostatik toz boya veya eloksal yüzey kaplamalı profillerimizi tercih edin.',
      },
    ],
    internalLinks: [
      {
        label: 'Saha Referanslarımız & Proje Galerisi',
        href: '/profesyoneller/referanslar',
        context: 'Florya, Yeşilköy ve Ataköy’de tamamladığımız villa ve rezidans projeleri.',
      },
      {
        label: 'Kış Bahçesi Sistemleri',
        href: '/hizmetlerimiz/kis-bahcesi-sistemleri',
        context: 'Florya ve Yeşilköy müstakil bahçe katları için dört mevsim kış bahçesi çözümleri.',
      },
      {
        label: 'Canlı m² Fiyat Hesaplama',
        href: '/fiyat-hesapla',
        context: 'Sahil hattı ısıcamlı cam balkon ve kış bahçesi maliyetinizi anında hesaplayın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[2],
    ],
    infographic: {
      title: 'Sahil Hattı Rüzgâr Basıncı ve Su Sızdırmazlık Dayanımı (Pa)',
      subtitle: 'EN 12208 ve EN 12210 standartlarına göre sistemlerin fırtına direnci',
      metricUnit: 'Pascal (Pa)',
      items: [
        {
          label: 'Winsa Panorama HS 76 & Vera Termal Isıcamlı Sistem',
          value: 2000,
          displayValue: '2000 Pa Rüzgâr / 600 Pa Fırtına Yağışı Direnci',
          barPercent: 96,
          highlight: true,
        },
        {
          label: 'Albert Genau SlideMaster Eşiksiz Isıcamlı Sürme',
          value: 1800,
          displayValue: '1800 Pa Rüzgâr / Kenetli Dikme Koruması',
          barPercent: 88,
          highlight: true,
        },
        {
          label: 'Standart Plastik Fitilli Klasik Cam Balkon',
          value: 600,
          displayValue: '600 Pa (Lodos Fırtınasında Su ve Ses Sızdırma Riski)',
          barPercent: 35,
        },
      ],
      footnote: '120 km/s lodos fırtınası yaklaşık 750–900 Pa dinamik rüzgâr basıncına karşılık gelir.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Florya ve Yeşilköy sahilinde lodos fırtınasında su almayan cam balkon hangisidir?',
        directAnswer:
          'Eğimli damlalık kasa profili, gizli su deşarj kanalları ve alüminyum mıknatıslı EPDM contalara sahip Winsa Vera Termal ve Albert Genau Tiara Twinmax ısıcamlı cam balkon sistemleri lodos yağışlarında su sızdırmaz.',
      },
    ],
    faqs: [
      {
        question: 'Bakırköy, Florya ve Yeşilköy için keşif ücretli mi?',
        answer:
          'Hayır. Kocasinan Merkez üretim tesisimiz Bakırköy sınırında yer aldığı için Florya, Yeşilköy, Ataköy ve tüm Bakırköy mahallelerine aynı gün ücretsiz lazerli keşif hizmeti sunuyoruz.',
      },
      {
        question: 'Ataköy’deki koruma kurulu veya site yönetimi renk kurallarına uyumlu üretim var mı?',
        answer:
          'Evet. Ataköy Kısımları’nın dış cephe estetiğine uygun eloksal, bronz, antrasit gri ve beyaz profil seçenekleriyle site yönetim planına %100 uyumlu montaj yapıyoruz.',
      },
      {
        question: 'Deniz kenarında cam balkon rulmanları kaç yıl dayanır?',
        answer:
          'AISI 304 paslanmaz çelik gövdeli ve kapalı bilyalı rulmanlarımız deniz nemine karşı 10 yıl paslanmama ve kırılmama garantisi altındadır.',
      },
      {
        question: 'Yeşilköy bahçe katı teraslarda kış bahçesi ruhsat gerektirir mi?',
        answer:
          'Sabit betonarme yerine demonte alüminyum bioklimatik tavan ve sürme/katlanır cam cephe modülleriyle uygulanan sistemler, kat malikleri muvafakatnamesiyle uyumlu şekilde kurulmaktadır.',
      },
    ],
  },

  /* ============================================================================
     4. SARIYER, ZEKERİYAKÖY VE GÖKTÜRK VİLLA KIŞ BAHÇESİ & BİOKLİMATİK PERGOLA
     ============================================================================ */
  {
    slug: 'sariyer-zekeriyakoy-gokturk-villa-kis-bahcesi-bioklimatik-pergola',
    slugAliases: ['bioklimatik-pergola-ve-kis-bahcesi-rehberi'],
    title: 'Zekeriyaköy, Göktürk ve Kemerburgaz Villaları İçin Bioklimatik Pergola ve Kış Bahçesi Mimari Rehberi',
    seoTitle: 'Zekeriyaköy & Göktürk Villa Kış Bahçesi ve Bioklimatik Pergola | Çelikpen',
    metaDescription:
      'Sarıyer Zekeriyaköy, Göktürk ve Kemerburgaz villaları için kar yüküne dayanıklı lamine ısıcam tavanlı kış bahçesi, motorlu bioklimatik pergola ve m² fiyatları.',
    primaryKeyword: 'zekeriyaköy göktürk kış bahçesi bioklimatik pergola',
    secondaryKeywords: [
      'villa kış bahçesi modelleri',
      'bioklimatik pergola m2 fiyatları 2026',
      'sarıyer kış bahçesi firmaları',
      'cam tavanlı kış bahçesi',
    ],
    tags: [
      '#ZekeriyaköyKışBahçesi',
      '#GöktürkVilla',
      '#BioklimatikPergola',
      '#KışBahçesiFiyatları',
      '#SarıyerMimariCam',
    ],
    keywords: [
      'zekeriyaköy kış bahçesi',
      'göktürk bioklimatik pergola',
      'kemerburgaz kış bahçesi',
      'villa kış bahçesi fiyatları 2026',
    ],
    category: 'Kış Bahçesi',
    readTime: 12,
    publishDate: '2026-02-10',
    updatedDate: '2026-11-01',
    image: '/images/blog/blog-04-zekeriyakoy-villa.jpeg',
    imageAlt:
      'Sarıyer Zekeriyaköy ve Göktürk villalarında motorlu bioklimatik pergola ve lamine ısıcamlı kış bahçesi uygulaması',
    imageCaption:
      'Zekeriyaköy ve Göktürk müstakil villa bahçelerinde 150 kg/m² kar yüküne dayanıklı T66 alüminyum kış bahçesi ve Somfy motorlu bioklimatik tavan sistemi.',
    imageTitle: 'Zekeriyaköy ve Göktürk Villa Kış Bahçesi & Bioklimatik Pergola Rehberi',
    excerpt:
      'Kuzey ormanları iklim kuşağındaki Zekeriyaköy, Bahçeköy, Göktürk ve Kemerburgaz villalarında bahçe verandalarını 4 mevsim sıcak bir salon konforuna dönüştüren kış bahçesi ve bioklimatik pergola mühendisliği.',
    highlights: [
      `Bioklimatik Pergola & Kış Bahçesi 2026 Net Birim Fiyatı: ${m2('pergola')}`,
      '150 kg/m² kar yükü ve 2000 Pa rüzgâr yüküne dayanıklı statik konstrüksiyon',
      'Taşıyıcı kolon içinden görünmez yağmur oluğu ve entegre Samsung LED aydınlatma',
    ],
    relatedProductHref: '/hizmetlerimiz/kis-bahcesi-sistemleri',
    numberedChecklistTitle: 'Villa Kış Bahçesi Projelendirmesinde 6 Altın Mühendislik Kuralı',
    numberedChecklist: [
      'Çatı camlarında olası dal/buz düşmesine karşı mutlaka temperli + PVB lamine güvenlikli Konfor Isıcam (4+16+44.2) kullanın.',
      'Kuzey ormanları bölgesindeki yoğun kar yağışı için taşıyıcı kiriş sehim hesabının minimum 150 kg/m² yüke göre yapıldığını doğrulayın.',
      'Yağmur ve eriyen kar suyunun dışarıda boru görünmeden taşıyıcı dikme kolonların içinden tahliye edildiğini kontrol edin.',
      'Bioklimatik lamellerin içine poliüretan ısı/ses dolgusu enjekte edilmiş serileri tercih edin.',
      'Yan cephelerde eşiksiz geçiş için Winsa Panorama HS 76 Kaldır-Sür veya Somfy motorlu giyotin cam entegrasyonu planlayın.',
      'Zemin betonu ile alüminyum alt kasa arasına su yalıtım membranı ve EPDM bariyer uygulandığından emin olun.',
    ],
    sections: [
      {
        id: 'zekeriyakoy-ve-gokturk-ikliminde-kis-bahcesi-tasarimi',
        heading: 'Zekeriyaköy ve Göktürk İkliminde Cam Tavan mı, Bioklimatik Pergola mı?',
        paragraphs: [
          `[Sarıyer Zekeriyaköy](/hizmetlerimiz/kis-bahcesi-sistemleri) ve [Eyüpsultan Göktürk / Kemerburgaz](/hizmetlerimiz/bioklimatik-pergola) bölgeleri, Belgrad Ormanı ve Karadeniz iklim etkisi nedeniyle İstanbul’un en yoğun yağış ve kar alan villa bölgeleridir. Bu bölgelerde inşa edilen bir kış bahçesinin kışın soğuk geçirmemesi, yazın ise sera etkisiyle bunaltmaması gerekir.`,
          `Gökyüzünü ve ağaç manzarasını kesintisiz görmek isteyen villa sahipleri için [Şişecam](https://www.sisecam.com.tr) Solar Low-E kaplamalı lamine ısıcam tavanlı [Kış Bahçesi Sistemleri](/hizmetlerimiz/kis-bahcesi-sistemleri) idealdir. Yazın tavanı tamamen açıp doğal esinti almak isteyenler içinse kendi ekseninde 0°–135° dönen ve geriye toplanan [Bioklimatik Pergola](/hizmetlerimiz/bioklimatik-pergola) (${m2('pergola')}) en üst segment çözümdür.`,
        ],
        table: {
          caption: 'Villa Kış Bahçesi Tavan ve Cephe Kombinasyonları Karşılaştırması',
          headers: ['Sistem Tipi', 'Tavan Yapısı', 'Önerilen Yan Cephe', '2026 Net m² Fiyatı'],
          rows: [
            ['Bioklimatik Pergola Kış Bahçesi', 'Motorlu Döner & Toplanır Alüminyum Lamel', 'Motorlu Giyotin veya Eşiksiz Sürme', m2('pergola')],
            ['Termal Cam Tavanlı Kış Bahçesi', '6 mm Temperli Konfor + 16 Argon + 44.2 Lamine', 'Winsa Panorama HS 76 Kaldır-Sür', m2('pergola')],
            ['Cephe Kapama: Panorama HS 76', 'Mevcut Veranda / Çatı Altı', '300 kg Kanat Kapasiteli Kaldır-Sür', m2('hs_surme')],
            ['Cephe Kapama: Motorlu Giyotin', 'Mevcut Teras / Veranda Altı', 'Somfy Kumandalı Dikey Açılır Isıcam', m2('vgs_giyotin')],
          ],
        },
        proTip: 'Kış bahçesinde yerden ısıtma veya klima kullanılacaksa, alüminyum çatı profillerinin mutlaka ısı bariyerli (polyamid termal köprü kırıcılı) olmasına dikkat edin; aksi halde kışın metal profillerde terleme oluşur.',
      },
    ],
    internalLinks: [
      {
        label: 'Kış Bahçesi Sistemleri Hizmetimiz',
        href: '/hizmetlerimiz/kis-bahcesi-sistemleri',
        context: 'Lamine ısıcam tavanlı ve dört mevsim yalıtımlı villa kış bahçesi çözümlerimiz.',
      },
      {
        label: 'Canlı Kış Bahçesi m² Fiyat Hesapla',
        href: '/fiyat-hesapla',
        context: 'Veranda ve teras ölçünüze göre kış bahçesi ve pergola maliyetini hesaplayın.',
      },
      {
        label: 'Bioklimatik Pergola Teknik Detayları',
        href: '/hizmetlerimiz/bioklimatik-pergola',
        context: 'Motorlu lamel tavan, gizli drenaj ve Somfy otomasyon özellikleri.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[3],
    ],
    infographic: {
      title: 'Kış Bahçesi Sistemlerinde Dört Mevsim Konfor ve Statik Dayanım',
      subtitle: 'Termal yalıtım, kar yükü kapasitesi ve su sızdırmazlık skorları',
      metricUnit: 'Performans Skoru',
      items: [
        {
          label: 'Lamine Konfor Isıcam Tavan + Panorama HS 76 Cephe',
          value: 96,
          displayValue: '%96 Termal Yalıtım (Uw: 1.0 W/m²K • 150 kg/m² Kar Yükü)',
          barPercent: 96,
          highlight: true,
        },
        {
          label: 'Poliüretan Dolgulu Bioklimatik Pergola + Giyotin Cam',
          value: 94,
          displayValue: '%94 Dört Mevsim Havalandırma & Su Sızdırmazlık',
          barPercent: 94,
          highlight: true,
        },
        {
          label: 'Polikarbonat / Tek Camlı Basit Sundurma Tavan',
          value: 38,
          displayValue: '%38 (Yazın Sera Etkisi, Kışın Yüksek Isı Kaybı)',
          barPercent: 38,
        },
      ],
      footnote: 'TS EN 1991-1-3 kar yükü ve EN 12210 rüzgâr yükü hesaplamalarına göredir.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Zekeriyaköy ve Göktürk’te kış bahçesi metrekare fiyatları 2026 yılında ne kadar?',
        directAnswer: `2026 yılında motorlu bioklimatik pergola ve lamine ısıcam tavanlı kış bahçesi sistemlerimizin metrekare birim fiyatı ${m2('pergola')}, cephe kapamada kullanılan ısıcamlı giyotin cam fiyatı ise ${m2('vgs_giyotin')} seviyesindedir.`,
      },
    ],
    faqs: [
      {
        question: 'Bioklimatik pergola yoğun yağmurda ve karda su sızdırır mı?',
        answer:
          'Hayır. Birbirine kenetlenen EPDM contalı alüminyum lameller yağmur suyunu yan oluklara, oradan da taşıyıcı dikme kolonların içindeki gizli drenaj kanallarına aktararak zemine sızdırmaz.',
      },
      {
        question: 'Cam tavanlı kış bahçesinde yukarıdan düşen cisimlere karşı güvenlik nasıl sağlanır?',
        answer:
          'Tavan ünitelerinde dış katmanda dolu ve darbeye dayanıklı 6 mm TSE EN 12150 temperli cam, iç katmanda ise kırıldığında dağılmayan 44.2 PVB lamine güvenlik camı kullanılır.',
      },
      {
        question: 'Kış bahçesi montajı kaç gün sürer?',
        answer:
          'Lazerli ölçü sonrası Kocasinan Merkez CNC tesisimizde ön üretimi tamamlanan kış bahçesi konstrüksiyonu, sahada ortalama 2 ila 4 iş günü içinde temiz montajla teslim edilir.',
      },
      {
        question: 'Bioklimatik pergolada aydınlatma ve ısıtıcı entegrasyonu var mı?',
        answer:
          'Evet. Lameller ve çevresel oluk profilleri üzerinde uzaktan kumandalı dimmerli Samsung LED aydınlatma standarttır; ayrıca infrared ısıtıcı ve rüzgâr/yağmur sensörü entegre edilebilir.',
      },
    ],
  },

  /* ============================================================================
     5. BEŞİKTAŞ, ETİLER VE ULUS TERASLARINDA MOTORLU GİYOTİN CAM UYGULAMALARI
     ============================================================================ */
  {
    slug: 'besiktas-etiler-ulusta-rezidans-ve-teras-giyotin-cam-sistemleri',
    slugAliases: ['motorlu-giyotin-cam-sistemleri-rehberi'],
    title: 'Beşiktaş, Etiler ve Ulus Teraslarında Motorlu Giyotin Cam (Hareketli Küpeşte) Uygulamaları',
    seoTitle: 'Beşiktaş, Etiler & Ulus Motorlu Giyotin Cam Teras Sistemleri | Çelikpen',
    metaDescription:
      'Beşiktaş, Etiler, Ulus ve Bebek çatı terasları ve rezidansları için Somfy motorlu, silinebilir kanatlı, ısıcamlı giyotin cam (hareketli küpeşte) sistemleri ve 2026 fiyatları.',
    primaryKeyword: 'beşiktaş etiler motorlu giyotin cam',
    secondaryKeywords: [
      'giyotin cam balkon fiyatları 2026',
      'hareketli küpeşte cam sistemi',
      'silinebilir giyotin cam',
      'ulus teras kapatma sistemleri',
    ],
    tags: [
      '#BeşiktaşCamBalkon',
      '#EtilerTeras',
      '#MotorluGiyotinCam',
      '#HareketliKüpeşte',
      '#SomfyOtomasyon',
    ],
    keywords: [
      'beşiktaş giyotin cam',
      'etiler teras kapatma',
      'motorlu giyotin cam fiyatları 2026',
      'kumandalı cam balkon',
    ],
    category: 'Giyotin & Teras',
    readTime: 11,
    publishDate: '2026-02-16',
    updatedDate: '2026-11-01',
    image: '/images/blog/blog-05-besiktas-giyotin.jpeg',
    imageAlt:
      'Beşiktaş Etiler ve Ulus teraslarında uzaktan kumandalı Somfy motorlu giyotin cam (hareketli küpeşte) uygulaması',
    imageCaption:
      'Açıldığında 110 cm yüksekliğinde güvenli cam korkuluk (küpeşte) olan, kapandığında tam ısı ve ses yalıtımı sağlayan Winsa Vera Vertical motorlu giyotin cam.',
    imageTitle: 'Beşiktaş, Etiler ve Ulus Terasları İçin Motorlu Giyotin Cam Rehberi',
    excerpt:
      'Boğaz ve şehir manzaralı Beşiktaş, Etiler, Ulus ve Levent çatı dublekslerinde dikey kayıt olmadan panoramik manzara sunan uzaktan kumandalı motorlu giyotin cam teknolojisi.',
    highlights: [
      `Somfy / Becker Motorlu Isıcamlı Giyotin Cam: ${m2('vgs_giyotin')}`,
      'Açık konumda 110 cm güvenli cam küpeşte, kapalı konumda -36 dB ses yalıtımı',
      'Çift sıra çelik zincir / çelik telli triger kayış ve el sıkışma emniyet profili',
    ],
    relatedProductHref: '/hizmetlerimiz/giyotin-cam-sistemleri',
    numberedChecklistTitle: 'Motorlu Giyotin Cam Seçerken Kontrol Edilmesi Gereken 5 Güvenlik Detayı',
    numberedChecklist: [
      'Tüp motorun 5 yıl garantili orijinal Somfy veya Becker marka olduğunu ve sessiz frenleme yaptığını doğrulayın.',
      'Taşıyıcı sistemde kopma yapmayan çift sıra çelik zincir veya çelik telli poliüretan triger kayış kullanıldığını kontrol edin.',
      'Üst katlardaki teraslarda dış cam yüzeyini içeriden güvenle temizleyebilmek için "silinebilir vasistas açılımlı" giyotin serisini seçin.',
      'Çocuklu evlerde kanat kapanırken parmak sıkışmasını önleyen emniyetli baza profili bulunduğundan emin olun.',
      'Boğaz rüzgârına karşı 4+16+4 mm her iki yüzü temperli argonlu ısıcam ve fırçalı/EPDM yan dikme kanalları talep edin.',
    ],
    sections: [
      {
        id: 'etiler-ve-ulus-teraslarinda-neden-giyotin-cam',
        heading: 'Etiler, Ulus ve Bebek Teraslarında Neden Motorlu Giyotin Cam Tercih Ediliyor?',
        paragraphs: [
          `[Beşiktaş, Etiler, Ulus ve Bebek](/profesyoneller/referanslar) bölgesindeki çatı dublekslerinde ve teraslı dairelerde en değerli unsur Boğaz ve koru manzarasıdır. Klasik katlanır sistemlerde kanatlar açıldığında bir köşede toplanır ve her kanat birleşiminde dikey profiller bulunur. Oysa [Motorlu Giyotin Cam Sistemleri](/hizmetlerimiz/giyotin-cam-sistemleri) (Hareketli Küpeşte), uzaktan kumandanın tek tuşuyla dikey olarak aşağıya iner ve en alttaki sabit cam panelin arkasında toplanarak 110 cm yüksekliğinde güvenli bir cam korkuluk oluşturur.`,
          `Böylece ayrı bir demir veya alüminyum korkuluk yaptırmaya gerek kalmaz; otururken göz hizasında hiçbir profil olmadan kesintisiz manzara izlenir. Akşam rüzgâr çıktığında ise sistem saniyeler içinde yukarı kapanarak [Şişecam](https://www.sisecam.com.tr) 4+16+4 mm argonlu ısıcam sayesinde terası sıcak bir kış odasına dönüştürür.`,
        ],
        table: {
          caption: 'Motorlu Giyotin Cam (Vera Vertical & Tambalkon) Teknik Özellikleri',
          headers: ['Bileşen', 'Teknik Standart', 'Kullanıcı Avantajı'],
          rows: [
            ['Motor & Otomasyon', 'Somfy / Becker RTS Uzaktan Kumandalı Tüp Motor', 'Tek tuşla istenilen yükseklikte durdurma + Akıllı ev uyumu'],
            ['Cam Ünitesi', '4+16+4 mm Argon Gazlı Çift Yüzü Temperli Isıcam', `%${SYSTEMS.vgs_giyotin.thermalSavingPercent} ısı tasarrufu ve -${SYSTEMS.vgs_giyotin.acousticReductionDb} dB ses yalıtımı`],
            ['Taşıyıcı Mekanizma', 'Ağır Hizmet Çelik Zincir / Çelik Telli Triger Kayış', 'Sıfır kopma riski, sarsıntısız ve sessiz dikey hareket'],
            ['Temizlik Özelliği', 'İçe Açılır Silinebilir Kanat Mekanizması', 'Yüksek katlarda sarkmadan içeriden güvenli cam silme'],
            ['2026 Net m² Fiyatı', 'Motor, Kumanda, Isıcam ve Montaj Dahil', m2('vgs_giyotin')],
          ],
        },
        proTip: 'Terasınızda rüzgâr ve yağmur sensörü opsiyonunu tercih ederseniz, siz evde yokken ani yağış başladığında giyotin camlar otomatik olarak kapanarak teras mobilyalarınızı korur.',
      },
    ],
    internalLinks: [
      {
        label: 'Albert Genau Tambalkon Giyotin Kataloğu',
        href: '/urunler/albert-genau',
        context: 'Silinebilir kanatlı ve Somfy motorlu giyotin cam modelleri.',
      },
      {
        label: 'Motorlu Giyotin Cam Hizmet Sayfası',
        href: '/hizmetlerimiz/giyotin-cam-sistemleri',
        context: 'Silinebilir giyotin cam, motor seçenekleri ve küpeşte detayları.',
      },
      {
        label: 'Canlı Giyotin Cam m² Fiyat Hesapla',
        href: '/fiyat-hesapla',
        context: 'Teras genişlik ve yüksekliğinizi girerek motorlu giyotin maliyetini hesaplayın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[2],
    ],
    infographic: {
      title: 'Giyotin Cam Sistemlerinde Akustik ve Termal Performans',
      subtitle: 'Açık küpeşte ve tam kapalı ısıcam konumlarında koruma oranları',
      metricUnit: '% Performans',
      items: [
        {
          label: 'Tam Kapalı Konum: Termal & Akustik İzolasyon',
          value: 92,
          displayValue: `%${SYSTEMS.vgs_giyotin.thermalSavingPercent} Isı Tasarrufu • -${SYSTEMS.vgs_giyotin.acousticReductionDb} dB Gürültü Kesme`,
          barPercent: 92,
          highlight: true,
        },
        {
          label: 'Yarı Açık (Havalandırma & Rüzgâr Kalkanı Konumu)',
          value: 85,
          displayValue: '%85 Rüzgâr Kırıcı Kalkan + Doğal Hava Sirkülasyonu',
          barPercent: 85,
          highlight: true,
        },
        {
          label: 'Tam Açık Konum: EN 12600 Güvenlikli Cam Küpeşte',
          value: 100,
          displayValue: '%100 Panoramik Manzara + 110 cm Korkuluk Güvenliği',
          barPercent: 100,
        },
      ],
      footnote: 'EN 12600 sarkaç darbe testi ve EN 12210 rüzgâr yükü standartlarına uygundur.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Motorlu giyotin cam balkon dışarıdan nasıl silinir?',
        directAnswer:
          'Çelikpen’in uyguladığı silinebilir giyotin cam (Albert Genau Tambalkon ve Vera Vertical) sistemlerinde hareketli kanatlar özel emniyet mandalıyla içeriye doğru vasistas gibi yatırılarak dış yüzeyleri balkon içinden güvenle silinir.',
      },
    ],
    faqs: [
      {
        question: 'Elektrik kesildiğinde motorlu giyotin cam açılır mı?',
        answer:
          'Kesintisiz güç kaynağı (UPS) batarya modülü opsiyonu eklendiğinde elektrik kesintilerinde dahi kumandayla 10–15 kez açılıp kapanmaya devam eder.',
      },
      {
        question: 'Giyotin cam sisteminde sineklik uygulanabilir mi?',
        answer:
          'Evet. Giyotin sistemlerle entegre çalışan dikey stor veya motorlu giyotin sineklik çözümlerimiz mevcuttur.',
      },
      {
        question: 'Giyotin cam motorunun garantisi kaç yıldır?',
        answer:
          'Kullandığımız orijinal Somfy ve Becker RTS tüp motorlar 5 yıl birebir değişim garantisi, mekanik ve alüminyum profil aksamı ise 10 yıl Çelikpen sistem garantisi altındadır.',
      },
      {
        question: 'Mevcut parapet duvarı üzerine mi yoksa zeminden mi kurulur?',
        answer:
          'Her iki uygulama da mümkündür. Zeminden kurulduğunda sabit alt cam paneli korkuluk (küpeşte) görevi görür; mevcut parapet duvarı varsa duvar üstünden tavana kadar uygulanabilir.',
      },
    ],
  },

  /* ============================================================================
     6. 2026 WINSA PVC PENCERE FİYATLARI: DORADO 76, REVOTECH VE LOTUS ANALİZİ
     ============================================================================ */
  {
    slug: 'winsa-pvc-pencere-fiyatlari-2026-dorado-76-revotech-karsilastirma',
    slugAliases: [
      'winsa-dorado-76-mi-revotech-gold-mu',
      'winsa-pvc-dograma-serileri-karsilastirmasi',
      'winsa-panorama-hs-76-hebeschiebe-rehberi',
    ],
    title: '2026 Winsa PVC Pencere Fiyatları: Dorado 76, Revotech ve Lotus Serisi Teknik Analizi',
    seoTitle: '2026 Winsa PVC Pencere Fiyatları | Dorado 76 vs Revotech Gold Analizi',
    metaDescription:
      '2026 Winsa PVC pencere ve sürme kapı m² fiyatları: Dorado 76 (5 odacık), Revotech Gold 84 mm (7 odacık, 3 conta), Comfort Slide Plus ve Panorama HS 76 karşılaştırması.',
    primaryKeyword: 'winsa pvc pencere fiyatları 2026',
    secondaryKeywords: [
      'winsa dorado 76 fiyatları',
      'winsa revotech gold 84 mm',
      'winsa lotus sürme sistem',
      'pimapen m2 fiyatları istanbul',
    ],
    tags: [
      '#WinsaFiyatları2026',
      '#WinsaDorado76',
      '#WinsaRevotechGold',
      '#PVCPencere',
      '#SesVeIsıYalıtımı',
    ],
    keywords: [
      'winsa pvc pencere fiyatları 2026',
      'winsa dorado 76 mı revotech gold mu',
      'winsa yetkili üretici istanbul',
      '84 mm pvc doğrama',
    ],
    category: 'PVC Pencere',
    readTime: 12,
    publishDate: '2026-02-22',
    updatedDate: '2026-11-01',
    image: '/images/blog/blog-06-winsa-pvc.jpeg',
    imageAlt:
      '2026 Winsa PVC pencere fiyatları: Dorado 76, Revotech Gold 84 mm ve Lotus serisi profil kesit karşılaştırması',
    imageCaption:
      'TS EN 12608-1 Sınıf A et kalınlığında üretilen Winsa Dorado 76 (5 odacık) ve Winsa Revotech Gold (84 mm, 7 odacık, 3 conta) PVC doğrama sistemleri.',
    imageTitle: 'Winsa Dorado 76, Revotech Gold 84 ve Lotus/Comfort Slide Teknik Karşılaştırması',
    excerpt:
      'İstanbul Avrupa Yakası’nda eski pencerelerini yenilemek veya yeni konut projesine doğrama seçmek isteyenler için Winsa Dorado 76, Revotech Gold 84 mm ve yeni nesil sürme serilerinin Uw, dB ve 2026 m² fiyat analizi.',
    highlights: [
      `Winsa Dorado 76 & Revotech Gold PVC Doğrama: ${m2('pvc_dograma')}`,
      `Winsa Panorama HS 76 & Comfort Slide Plus Sürme: ${m2('hs_surme')}`,
      'Revotech Gold 84 mm ile Uw = 0.79 W/(m²K) pasif ev ısı yalıtımı ve -46 dB sessizlik',
    ],
    relatedProductHref: '/urunler/winsa',
    numberedChecklistTitle: 'Winsa PVC Pencere Siparişinde Dikkat Edilecek 6 Teknik Kriter',
    numberedChecklist: [
      'Profillerin içindeki galvanizli çelik destek sacının minimum 1,5 mm – 2,0 mm kapalı kutu kesitinde olduğunu teyit edin.',
      'E-5, TEM, Basın Ekspres veya havalimanı aksındaki gürültülü cephelerde 3 contalı (orta contalı) 84 mm Revotech Gold seçin.',
      'Cam ünitelerinde 4+16+4 mm argonlu Konfor/Sinerji çift cam veya 36–52 mm üçlü (triple) ısıcam kombinasyonu tercih edin.',
      'Balkon ve teras çıkışlarında menteşeli kapı yerine vakum contalı Comfort Slide Plus (Lotus) veya Panorama HS 76 sürme kullanın.',
      'Pencere kol ve ispanyolet mekanizmasında emniyet mantar başlıklı, çift açılımlı (vasistaslı) orijinal donanım isteyin.',
      'Söküm yapılan eski doğrama boşluklarında kasa çevresine poliüretan köpük + dış cephe mastik/bant izolasyonu yapıldığını kontrol edin.',
    ],
    sections: [
      {
        id: 'dorado-76-revotech-gold-84-lotus-teknik-farklar',
        heading: 'Winsa Dorado 76, Revotech Gold 84 mm ve Lotus / Comfort Slide Karşılaştırması',
        paragraphs: [
          `Türkiye’nin lider PVC profil üreticisi [Winsa](https://www.winsa.com.tr), [TSE](https://www.tse.org.tr) TS EN 12608-1 Sınıf A profil et kalınlığı standardında üretim yapar. Klasik 60 mm ve 70 mm profillerin yerini artık çok daha yüksek termal ve akustik bariyer sunan 76 mm ve 84 mm yeni nesil seriler almıştır. Çelikpen olarak Kocasinan Merkez CNC tesisimizde tüm [Winsa PVC Pencere ve Kapı](/hizmetlerimiz/pvc-pencere-kapi) serilerini 0,1 mm hassasiyetle üretiyoruz.`,
          `Standart şehir içi konutlarda 76 mm genişliğinde ve 5 odacıklı **Winsa Dorado 76** ($U_w = 0,98\text{ W/m}^2\text{K}$) mükemmel fiyat/performans dengesi sunarken; yüksek katlı rezidanslarda, Boğaz ve sahil hattında veya ana arter cephelerinde 84 mm genişliğinde, 7 odacıklı ve 3 kademeli EPDM orta contalı **Winsa Revotech Gold** ($U_w = 0,79\text{ W/m}^2\text{K}$, -46 dB) zirve performansı sağlar.`,
        ],
        table: {
          caption: '2026 Winsa PVC Pencere ve Sürme Sistemleri Teknik & Maliyet Tablosu',
          headers: ['Winsa Serisi', 'Profil & Odacık Yapısı', 'Conta & Cam Kapasitesi', 'Isı / Ses Yalıtımı', '2026 Net m² Fiyatı'],
          rows: [
            ['Winsa Dorado 76', '76 mm / 5 Odacık', '2 Sıra EPDM / 24–52 mm Cam', 'Uw: 0.98 W/m²K / -40 dB', m2('pvc_dograma')],
            ['Winsa Safir 76', '76 mm / 6 Odacık', '2 Sıra EPDM / 24–52 mm Cam', 'Uw: 0.93 W/m²K / -41 dB', m2('pvc_dograma')],
            ['Winsa Revotech Gold', '84 mm / 7 Odacık', '3 Sıra EPDM (Orta Conta) / 52 mm Üçlü Cam', 'Uw: 0.79 W/m²K / -46 dB', m2('pvc_dograma')],
            ['Comfort Slide Plus / Lotus', '150 mm Kasa / 76 mm Kanat', 'Çepeçevre Vakum EPDM Conta', 'Uw: 0.98 W/m²K / -42 dB', m2('comfort_slide')],
            ['Panorama HS 76 Hebeschiebe', '175 mm 8 Odacıklı Kasa', '300 kg Kaldır-Sür Vakum Conta', 'Uw: 0.89 W/m²K / -44 dB', m2('hs_surme')],
          ],
        },
        proTip: 'Orta conta (3. conta) teknolojisi yalnızca ısı ve ses yalıtımını artırmakla kalmaz; pencere içindeki çelik ispanyolet mekanizmasını dış ortam neminden ve yağmur suyundan izole ederek donanım ömrünü 2 katına çıkarır.',
      },
    ],
    internalLinks: [
      {
        label: 'Winsa Resmi Ürün Kataloğumuz',
        href: '/urunler/winsa',
        context: 'Dorado 76, Revotech Gold, Safir 76, Panorama HS 76 ve Winstor panjur detayları.',
      },
      {
        label: 'PVC Pencere & Kapı Montaj Hizmetimiz',
        href: '/hizmetlerimiz/pvc-pencere-kapi',
        context: 'Eski doğrama sökümü, lazerli ölçü ve anahtar teslim Winsa PVC montaj süreci.',
      },
      {
        label: 'Winsa PVC m² Fiyat Hesaplama',
        href: '/fiyat-hesapla',
        context: 'Pencere ve sürme kapı ölçülerinize göre 2026 Winsa doğrama maliyetini hesaplayın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[2],
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[3],
    ],
    infographic: {
      title: 'Winsa PVC Serileri Akustik Gürültü Azaltımı (dB)',
      subtitle: 'Trafik ve şehir gürültüsünü kesme kapasitesi (Yüksek dB daha yüksek sessizlik demektir)',
      metricUnit: 'Desibel (-dB)',
      items: [
        {
          label: 'Winsa Revotech Gold 84 mm (7 Odacık + 3 Conta + Üçlü Cam)',
          value: 46,
          displayValue: '-46 dB Akustik İzolasyon (Stüdyo Sessizliği)',
          barPercent: 96,
          highlight: true,
        },
        {
          label: 'Winsa Panorama HS 76 Hebeschiebe & Comfort Slide Plus',
          value: 43,
          displayValue: '-43 dB Vakum Contalı Sürme Yalıtımı',
          barPercent: 90,
          highlight: true,
        },
        {
          label: 'Winsa Dorado 76 (5 Odacık + Konfor Isıcam)',
          value: 40,
          displayValue: '-40 dB Yüksek Konut Konforu',
          barPercent: 84,
        },
      ],
      footnote: 'EN ISO 10140-2 laboratuvar akustik test verilerine dayanmaktadır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Winsa Dorado 76 mı yoksa Revotech Gold 84 mü tercih edilmeli?',
        directAnswer:
          'Ara sokak ve standart cephelerde 5 odacıklı Winsa Dorado 76 ideal fiyat/performans sunarken, ana cadde, E-5 ve rüzgâr yükü yüksek cephelerde 7 odacıklı ve 3 contalı Winsa Revotech Gold 84 mm tercih edilmelidir.',
      },
    ],
    faqs: [
      {
        question: 'Eski pencereler sökülürken evin duvarları ve boyası zarar görür mü?',
        answer:
          'Kadrolu montaj ekibimiz özel kesim ekipmanlarıyla eski doğramaları kırmadan söker; yeni Winsa kasaları monte edildikten sonra iç-dış pervaz ve mastik bitişleri yapılarak aynı gün temiz teslim edilir.',
      },
      {
        question: 'Winsa Antrasit Gri ve Altın Meşe renkli profiller güneşte solar mı?',
        answer:
          'Hayır. Winsa’nın Cool Colors teknolojili dış cephe folyo kaplamaları UV ışınlarını yansıtacak şekilde üretilmiştir; kabarma ve solmaya karşı üretici garantisi altındadır.',
      },
      {
        question: 'Lotus / Comfort Slide Plus sürme sistem klasik sürmelerden neden farklıdır?',
        answer:
          'Klasik sürmelerde kıl fitil kullanılırken, Comfort Slide Plus sisteminde kol çevrildiğinde kanat kasaya doğru 8 mm eksenel hareketle vakumlanır ve çepeçevre EPDM conta baskısıyla tam sızdırmazlık sağlar.',
      },
      {
        question: 'Winsa PVC doğrama ile Winstor monoblok panjur birlikte takılabilir mi?',
        answer:
          'Evet. Pencere üstüne entegre edilen EPS yalıtımlı Winsa Winstor monoblok panjur kutusu hem +%28 ek ısı yalıtımı sağlar hem de tam güvenlik ve karartma sunar.',
      },
    ],
  },

  /* ============================================================================
     7. ALBERT GENAU CAM BALKON SİSTEMLERİ: TİARA, TWİNMAX VE EŞİKSİZ SÜRME
     ============================================================================ */
  {
    slug: 'albert-genau-cam-balkon-sistemleri-tiara-twinmax-teknik-ozellikler',
    title: 'Albert Genau Cam Balkon Sistemleri: Tiara, Twinmax ve Eşiksiz Sürme Teknolojileri',
    seoTitle: 'Albert Genau Cam Balkon Sistemleri | Tiara Twinmax & SlideMaster 2026',
    metaDescription:
      'Albert Genau Tiara Twinmax ısıcamlı katlanır cam balkon, SlideMaster eşiksiz sürme ve Tambalkon motorlu giyotin sistemlerinin teknik özellikleri ve 2026 m² fiyatları.',
    primaryKeyword: 'albert genau cam balkon sistemleri',
    secondaryKeywords: [
      'albert genau tiara twinmax fiyat',
      'albert genau slidemaster sürme',
      'albert genau ısıcamlı cam balkon',
      'albert genau istanbul bayi',
    ],
    tags: [
      '#AlbertGenau',
      '#TiaraTwinmax',
      '#SlideMaster',
      '#IsıcamlıCamBalkon',
      '#MimariCamSistemleri',
    ],
    keywords: [
      'albert genau cam balkon',
      'tiara twinmax ısıcamlı cam balkon',
      'albert genau slidemaster',
      'albert genau tambalkon giyotin',
    ],
    category: 'Cam Balkon',
    readTime: 11,
    publishDate: '2026-03-01',
    updatedDate: '2026-11-01',
    image: '/images/blog/blog-07-albert-genau.jpeg',
    imageAlt:
      'Albert Genau Tiara Twinmax ısıcamlı katlanır cam balkon ve SlideMaster eşiksiz sürme sistem detayı',
    imageCaption:
      'Patentli rulman, rüzgâr kilidi ve EPDM mıknatıslı conta teknolojisiyle öne çıkan Albert Genau Tiara Twinmax ısıcamlı cam balkon sistemi.',
    imageTitle: 'Albert Genau Tiara Twinmax, SlideMaster ve Tambalkon Teknik İncelemesi',
    excerpt:
      'Avrupa standartlarında mühendislik detaylarıyla geliştirilen Albert Genau Tiara Twinmax ısıcamlı katlanır, SlideMaster sürme ve VertiFlex/Tambalkon giyotin sistemlerinin teknik analizi.',
    highlights: [
      'Tiara Twinmax ile köşe direksiz L ve U balkonlarda %100 panoramik açılım',
      'SlideMaster kenetli sürme serisinde sıfır eşik ve yüksek rüzgâr direnci',
      `Isıcamlı Katlanır (${m2('vbs_isicam')}) & Isıcamlı Sürme (${m2('vds_isicamli')})`,
    ],
    relatedProductHref: '/urunler/albert-genau',
    numberedChecklistTitle: 'Albert Genau Sistemlerinde Öne Çıkan 5 Mühendislik İnovasyonu',
    numberedChecklist: [
      'İki yöne eğimli (3D) ayarlanabilir ağır hizmet rulmanlarıyla tavan/zemin kot farklarını kusursuz tolere eder.',
      'Kanatlar arasında sararan şeffaf plastik fitil yerine ömür boyu dayanıklı alüminyum + EPDM conta kullanır.',
      'Köşe balkonlarda sabit dikme profiline ihtiyaç duymadan kanatların 90° ve 135° dönüşlerden kayarak geçmesini sağlar.',
      'Alt kasadaki gizli yoğunlaşma ve yağmur suyu tahliye kanalıyla iç mekâna su taşmasını %100 engeller.',
      'Çocuk emniyet kilidi ve içeriden kilitlenen paslanmaz ispanyolet kol mekanizmasıyla tam güvenlik sunar.',
    ],
    sections: [
      {
        id: 'tiara-twinmax-ve-slidemaster-farki',
        heading: 'Tiara Twinmax Isıcamlı Katlanır ve SlideMaster Sürme Sistem Analizi',
        paragraphs: [
          `[Albert Genau Sistemleri](/urunler/albert-genau), cam balkon sektöründe "balkonu odaya dönüştürme" kavramını mühendislik testleriyle standartlaştıran öncü mimari serilerden biridir. Özellikle **Tiara Twinmax** serisi, 28 mm kalınlığındaki çift yüzü [TSE](https://www.tse.org.tr) EN 12150 temperli [Şişecam](https://www.sisecam.com.tr) ısıcam plakalarını taşıyan çift sıra paslanmaz rulman teknolojisiyle dikkat çeker.`,
          `Balkonunda tül perde ve balkon mobilyası kullanan, kanatların içeriye katlanmasını istemeyen kullanıcılar için geliştirilen **SlideMaster** serisi ise; 8 mm tek cam (${m2('vds_surme')}) veya ısıcamlı (${m2('vds_isicamli')}) alternatifleriyle engelsiz alt eşik ve kenetli rüzgâr kilidi konforu sunar.`,
        ],
        table: {
          caption: 'Albert Genau Mimari Cam Balkon & Teras Serileri Karşılaştırması',
          headers: ['Sistem Modeli', 'Açılım Mekanizması', 'Cam Kapasitesi', 'Öne Çıkan Özellik', '2026 Net m² Fiyatı'],
          rows: [
            ['Tiara Twinmax', 'Tam Katlanır (Köşe Dönüşlü)', '28 mm (4+20+4) Argonlu Isıcam', '5 Noktalı Sızdırmazlık & Ispanyolet Kilit', m2('vbs_isicam')],
            ['SlideMaster Twin', 'Eşiksiz / Alçak Eşikli Sürme', '24–28 mm Temperli Isıcam', 'İçe Kanat Payı Sıfır & Kenetli Dikme', m2('vds_isicamli')],
            ['SlideMaster Tek Cam', 'Eşiksiz Rulmanlı Sürme', '8 mm / 10 mm Temperli Cam', 'Dar Balkonlar İçin Ekonomik Sürme', m2('vds_surme')],
            ['Tambalkon / VertiFlex', 'Motorlu Dikey Giyotin', '4+16+4 mm Argonlu Isıcam', 'Silinebilir Kanat & Güvenli Küpeşte', m2('vgs_giyotin')],
          ],
        },
        proTip: 'Köşe (L tipi) balkonunuzda kışın yemek masası kullanacaksanız Tiara Twinmax seçerek yazın tüm kanatları tek duvara toplayabilir ve köşede hiçbir sabit direk olmadan tamamen açık bir teras elde edebilirsiniz.',
      },
    ],
    internalLinks: [
      {
        label: 'Albert Genau Ürün Kataloğumuz',
        href: '/urunler/albert-genau',
        context: 'Tiara Twinmax, SlideMaster, Tambalkon giyotin ve bioklimatik pergola modellerimiz.',
      },
      {
        label: 'Isıcamlı Cam Balkon Hizmetimiz',
        href: '/hizmetlerimiz/isicamli-cam-balkon',
        context: '4+20+4 argon gazlı ısıcamlı cam balkon teknik şartnamesi.',
      },
      {
        label: 'Online m² Fiyat Hesaplama',
        href: '/fiyat-hesapla',
        context: 'Balkon ölçünüze göre Tiara Twinmax ve SlideMaster maliyetini hesaplayın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[3],
    ],
    infographic: {
      title: 'Tiara Twinmax & SlideMaster Yalıtım ve Rüzgâr Direnci',
      subtitle: 'Uluslararası EN 12210 ve EN 12208 test sonuçlarına göre performans profili',
      metricUnit: '% Başarı',
      items: [
        {
          label: 'Tiara Twinmax 4+20+4 Argonlu Isıcamlı Katlanır',
          value: 95,
          displayValue: '%95 Termal & Su Sızdırmazlık Performansı',
          barPercent: 95,
          highlight: true,
        },
        {
          label: 'SlideMaster Twin Isıcamlı Eşiksiz Sürme',
          value: 91,
          displayValue: '%91 Alan Kazancı & Rüzgâr Yükü Dayanımı',
          barPercent: 91,
          highlight: true,
        },
        {
          label: 'Tambalkon Motorlu Silinebilir Giyotin',
          value: 93,
          displayValue: '%93 Teras Güvenliği & Akustik Konfor',
          barPercent: 93,
        },
      ],
      footnote: 'Testler EN 12207, EN 12208 ve EN 12210 Avrupa cephe standartlarına göre doğrulanmıştır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Albert Genau Tiara Twinmax ısıcamlı cam balkonun farkı nedir?',
        directAnswer:
          'Tiara Twinmax, 28 mm argon gazlı temperli ısıcam ünitesini taşıyan 8 bilyalı paslanmaz rulmanları, alüminyum/EPDM mıknatıslı contaları ve L balkonlarda köşe direği gerektirmeyen tam açılım mekanizmasıyla en yüksek ısı yalıtımı sağlayan cam balkon serilerinden biridir.',
      },
    ],
    faqs: [
      {
        question: 'Albert Genau cam balkon sistemlerinde garanti süresi kaç yıldır?',
        answer:
          'Çelikpen tarafından uygulanan tüm Albert Genau ve Winsa Vera cam balkon sistemleri 10 yıl mekanik, profil ve iki cam arası buğulanmama garantisi altındadır.',
      },
      {
        question: 'SlideMaster sürme cam balkonda alt ray takılma yapar mı?',
        answer:
          'Hayır. SlideMaster eşiksiz sürme serisinde alt kasa yalnızca 8 mm pahlı engelsiz yüksekliğe sahiptir; çocuk, yaşlı ve tekerlekli sandalye geçişine %100 uygundur.',
      },
      {
        question: 'Tiara Twinmax sisteminde perde montajı için pay bırakılıyor mu?',
        answer:
          'Evet. Üst kasa üzerinde plise perde veya kornişli tül perde kullanımı için özel perde profili (perde yükseltme aparatı) standart olarak planlanır.',
      },
      {
        question: 'İstanbul Avrupa Yakası’nda hangi ilçelere montaj yapıyorsunuz?',
        answer:
          'Bahçelievler Kocasinan Merkez fabrikamızdan Bakırköy, Beşiktaş, Sarıyer, Başakşehir, Beylikdüzü, Büyükçekmece, Şişli ve tüm Avrupa Yakası ilçelerine ücretsiz keşif ve montaj hizmeti veriyoruz.',
      },
    ],
  },

  /* ============================================================================
     8. CAM BALKON APARTMAN YÖNETİMİ İZNİ, YARGITAY VE 4/5 MUVAFAKATNAME 2026
     ============================================================================ */
  {
    slug: 'cam-balkon-apartman-yonetimi-izni-yargitay-4-5-muvafakatname-2026',
    slugAliases: ['bahcelievler-cam-balkon-10-kritik-detay'],
    title: 'Cam Balkon Yaptırmak Yasal mı? 2026 Kat Mülkiyeti Kanunu, Yargıtay Kararları ve 4/5 Muvafakatname',
    seoTitle: 'Cam Balkon Yasal mı? 2026 Yargıtay Kararı & 4/5 Muvafakatname Rehberi',
    metaDescription:
      'Apartmanda ve sitede cam balkon yaptırmak yasal mı? 2026 Kat Mülkiyeti Kanunu Madde 19, Yargıtay içtihatları, belediye ruhsat durumu ve 4/5 kat maliki muvafakatname rehberi.',
    primaryKeyword: 'cam balkon apartman yönetimi izni yargıtay 2026',
    secondaryKeywords: [
      'cam balkon yaptırmak yasal mı',
      'cam balkon 4/5 muvafakatname',
      'kat mülkiyeti kanunu madde 19 cam balkon',
      'cam balkon belediye ruhsatı gerekir mi',
    ],
    tags: [
      '#CamBalkonYasalMı',
      '#YargıtayKararı2026',
      '#Muvafakatname',
      '#KatMülkiyetiKanunu',
      '#SiteYönetimiİzni',
    ],
    keywords: [
      'cam balkon apartman yönetimi izni',
      'yargıtay cam balkon kararı 2026',
      '4/5 muvafakatname örneği',
      'gömme balkon cam balkon yasal mı',
    ],
    category: 'Yerel Rehber',
    readTime: 10,
    publishDate: '2026-03-08',
    updatedDate: '2026-11-01',
    image: '/images/blog/blog-08-apartman-izni.jpeg',
    imageAlt:
      'Apartman ve sitelerde dış cephe rengine uyumlu (Antrasit RAL 7016) yasal cam balkon uygulaması — Çelikpen',
    imageCaption:
      'Kat Mülkiyeti Kanunu Madde 19 ve bina dış cephe RAL renk bütünlüğüne tam uyumlu katlanır ve sürme cam balkon uygulaması.',
    imageTitle: '2026 Kat Mülkiyeti Kanunu, Yargıtay Kararları ve 4/5 Cam Balkon Muvafakatname Rehberi',
    excerpt:
      'Apartman ve sitelerde hukuki ihtilaf yaşamadan cam balkon yaptırmanın tüm yasal kuralları: Planlı Alanlar İmar Yönetmeliği, KMK Madde 19, 4/5 kat maliki muvafakatnamesi ve dış cephe renk uyumu.',
    highlights: [
      'Planlı Alanlar İmar Yönetmeliği gereği katlanır/sürme cam balkon belediye ruhsatı gerektirmez',
      'Kat Mülkiyeti Kanunu Madde 19 uyarınca apartmanlarda 4/5 (%80) yazılı muvafakatname protokolü',
      'Çelikpen keşif ekibinden ücretsiz yazdırılabilir 4/5 Muvafakatname Formu desteği',
    ],
    relatedProductHref: '/blog/eylul-2026-yargitay-cam-balkon-karari',
    numberedChecklistTitle: 'Apartman ve Sitelerde Sorunsuz Cam Balkon İçin 5 Hukuki Adım',
    numberedChecklist: [
      'Apartman veya site yönetim planında dış cephe profil rengi (Antrasit RAL 7016, Beyaz, Bronz vb.) hakkında özel bir karar olup olmadığını kontrol edin.',
      'Sabit PVC doğrama yerine kayar/katlanır raylı cam balkon sistemi seçerek imar mevzuatındaki "emsal alan artışına girmeme" şartını koruyun.',
      'Salon ile balkon arasındaki ana taşıyıcı duvarı veya kirişi kesinlikle kırmayın; mevcut kapı doğramasını koruyun.',
      'Binadaki kat maliklerinin 4/5’inden (%80) yazılı muvafakatname imzası alarak apartman karar defterine işletin.',
      'Komşularınızla birlikte 5+ daire toplu sipariş vererek hem %100 cephe birliği sağlayın hem de %15 toplu bina indiriminden yararlanın.',
    ],
    sections: [
      {
        id: 'imar-yonetmeligi-ve-kmk-madde-19-analizi',
        heading: 'Belediye Ruhsatı ve Kat Mülkiyeti Kanunu Madde 19 Arasındaki Fark Nedir?',
        paragraphs: [
          `Cam balkon yaptırmak isteyen daire sahiplerinin en sık karıştırdığı konu **İmar Mevzuatı (Belediye Ruhsatı)** ile **Kat Mülkiyeti Kanunu (Apartman İçi Onay)** arasındaki farktır. [Resmî Gazete](https://www.resmigazete.gov.tr)’de yayımlanan Planlı Alanlar İmar Yönetmeliği’ne göre; balkonların açılır-kapanır katlanır veya sürme cam panellerle kapatılması bina taban alanını ve emsalini artırmadığı için **belediyeden inşaat ruhsatı alınmasını gerektirmez**.`,
          `Ancak 634 sayılı Kat Mülkiyeti Kanunu’nun 19. maddesi ve yerleşik Yargıtay 18. ve 20. Hukuk Dairesi içtihatları uyarınca, ana taşınmazın dış cephe görünümünü etkileyen uygulamalarda kat maliklerinin **4/5’inin (%80) yazılı rızası (muvafakatnamesi)** aranmaktadır. Sitemizdeki [İnteraktif 4/5 Muvafakatname Formu](/blog/eylul-2026-yargitay-cam-balkon-karari) aracımızla binanıza özel resmi tutanağı 1 dakikada hazırlayıp yazdırabilirsiniz.`,
        ],
        table: {
          caption: 'Uygulama Türüne Göre Hukuki ve İdari Uygunluk Tablosu',
          headers: ['Uygulama Tipi', 'Belediye Ruhsatı', 'Apartman 4/5 Onayı', 'Hukuki Risk Değerlendirmesi'],
          rows: [
            ['Cephe Rengiyle Uyumlu Katlanır / Sürme Cam Balkon', 'Gerekmez', '4/5 Muvafakatname ile Tam Yasal', 'En Güvenli & Sorunsuz Uygulama'],
            ['Sabit PVC Doğrama ile Balkon Kapatma', 'İhtilaflı (Kapalı Alan Sayılabilir)', '4/5 Onay Olsa Dahi İmar Riski Taşır', 'Sabit Doğrama Yerine Isıcamlı Katlanır Önerilir'],
            ['Balkon Ara Duvarını Yıkarak Salona Katma', 'Proje Tadilatı Gerektirir', 'Oybirliği (5/5) + Resmi Proje Şart', 'Yüksek Risk — Ara Duvar Yıkılmamalıdır'],
          ],
        },
        proTip: 'Apartmanınızda daha önce aynı renkte ve tipte cam balkon yaptırmış daireler varsa (emsal uygulama), aynı RAL profil rengi ve cam tonunu seçerek cephe bütünlüğünü birebir korumanız komşuluk hukuku açısından en önemli güvencedir.',
      },
    ],
    internalLinks: [
      {
        label: 'Ücretsiz 4/5 Muvafakatname Formu Oluşturucu',
        href: '/blog/eylul-2026-yargitay-cam-balkon-karari',
        context: 'Apartman bilgilerinizi girerek imzaya hazır resmi muvafakatname belgesini PDF olarak yazdırın.',
      },
      {
        label: 'Isıcamlı Katlanır Cam Balkon Sistemleri',
        href: '/hizmetlerimiz/isicamli-cam-balkon',
        context: 'Sabit PVC doğrama ihtilafı yaratmadan maksimum ısı yalıtımı sağlayan katlanır ısıcam sistemi.',
      },
      {
        label: 'Toplu Bina İndirimi & Fiyat Hesaplama',
        href: '/fiyat-hesapla',
        context: '5+ daire apartman siparişlerinde net %15 indirimli m² fiyatınızı hesaplayın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[4],
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[3],
    ],
    infographic: {
      title: 'Apartmanlarda Cam Balkon Yasal Uyum ve Onay Oranları',
      subtitle: 'Kat Mülkiyeti Kanunu Madde 19 kapsamında aranan yasal çoğunluk',
      metricUnit: '% Kat Maliki Oranı',
      items: [
        {
          label: 'Gerekli Yasal Yazılı Muvafakatname Çoğunluğu (4/5)',
          value: 80,
          displayValue: '%80 (Örn: 10 Daireli Binada En Az 8 Malik İmzası)',
          barPercent: 80,
          highlight: true,
        },
        {
          label: 'Toplu Bina Siparişinde Sağlanan Fabrika İndirimi (5+ Daire)',
          value: BULK,
          displayValue: `%${BULK} Net Toplu Üretim & Montaj İndirimi`,
          barPercent: 60,
          highlight: true,
        },
      ],
      footnote: '634 sayılı Kat Mülkiyeti Kanunu Madde 19/2 hükmüne göre hazırlanmıştır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Apartmanda cam balkon yaptırmak için kaç kişinin imzası gerekir?',
        directAnswer:
          '634 sayılı Kat Mülkiyeti Kanunu’nun 19. maddesi uyarınca apartmanda cam balkon yaptırmak için toplam kat maliklerinin beşte dördünün (%80) yazılı muvafakatname imzası gerekmektedir.',
      },
    ],
    faqs: [
      {
        question: 'Gömme balkonlarda da 4/5 muvafakatname gerekir mi?',
        answer:
          'Yargıtay kararlarında gömme veya çıkma balkon ayrımı yapılmaksızın dış cephe görünümünü etkileyen tüm uygulamalarda 4/5 kat maliki muvafakatnamesi ve bina rengiyle uyum önerilmektedir.',
      },
      {
        question: 'Kiracıyım, cam balkon yaptırmak için kimin onayını almalıyım?',
        answer:
          'Kiracıların öncelikle kendi ev sahibinden (kat malikinden) yazılı onay alması, ardından apartman yönetim planı ve 4/5 muvafakatname sürecine uyması gerekir.',
      },
      {
        question: 'Balkonda kombi varsa İGDAŞ açısından cam balkon yasal mı?',
        answer:
          'Evet. Hermetik kombi bacasının doğrudan dış ortama çıkması ve sabit cam panel üzerinde CNC kesimli havalandırma menfezi bırakılması şartıyla İGDAŞ yönetmeliğine %100 uygundur.',
      },
      {
        question: 'Muvafakatname formunu nereden temin edebilirim?',
        answer:
          'Sitemizdeki interaktif 4/5 Muvafakatname Formu sayfasından ücretsiz olarak doldurup yazdırabilir veya ücretsiz keşif ekibimizden basılı dosya olarak talep edebilirsiniz.',
      },
    ],
  },
];
