/**
 * ÇELİKPEN MİMARİ REHBER & BLOG — TEK DOĞRULUK KAYNAĞI
 * ------------------------------------------------------------
 * 8 kapsamlı teknik makale. Tüm m² fiyatları `pricing.config.ts` dosyasından
 * okunur; makale metinlerinde sabit (hardcoded) fiyat bulunmaz.
 */
import { CELIKPEN_PRICING_CONFIG, type SystemSeriesId } from '../config/pricing.config';

export type BlogCategory =
  | 'Cam Balkon'
  | 'PVC Pencere'
  | 'Sürme Sistemler'
  | 'Giyotin & Teras'
  | 'Kış Bahçesi'
  | 'Cam Teknolojisi'
  | 'Yerel Rehber';

export interface BlogTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface BlogSubsection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: BlogSubsection[];
  table?: BlogTable;
  proTip?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogTocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  category: BlogCategory;
  readTime: number;
  publishDate: string;
  updatedDate: string;
  author: BlogAuthor;
  image: string;
  imageAlt: string;
  excerpt: string;
  highlights: string[];
  tableOfContents: BlogTocItem[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedProductHref: string;
  featured?: boolean;
}

type BlogPostInput = Omit<BlogPost, 'tableOfContents'>;

/* ---------------------------- Fiyat yardımcıları ---------------------------- */
const SYSTEMS = CELIKPEN_PRICING_CONFIG.systems;
const tl = (value: number) =>
  `${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(value)} TL`;
const m2 = (id: SystemSeriesId) => `${tl(SYSTEMS[id].netPricePerM2)}/m²`;
const MIN_AREA = CELIKPEN_PRICING_CONFIG.minBillableAreaM2;
const BULK = Math.round(CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate * 100);
const TOLERANCE = CELIKPEN_PRICING_CONFIG.quoteTolerancePercent;
const PRICE_DATE = CELIKPEN_PRICING_CONFIG.lastUpdated;
const CAT_SCREEN = tl(CELIKPEN_PRICING_CONFIG.addons.catScreenPerUnit);
const PLEATED = `${tl(CELIKPEN_PRICING_CONFIG.addons.pleatedBlindPerM2)}/m²`;

const AUTHORS = {
  architect: { name: 'Mimar Selin Çelik', role: 'Çelikpen Proje & Keşif Sorumlusu' },
  engineer: { name: 'Mak. Müh. Murat Çelik', role: 'Çelikpen Teknik Müdürü — 30 Yıllık Saha Tecrübesi' },
  advisor: { name: 'Çelikpen Mühendislik Ekibi', role: 'Bahçelievler Uygulama & Montaj Ekibi' },
} satisfies Record<string, BlogAuthor>;

/** Bölümlerden otomatik İçindekiler üretir (h2 + h3). */
function buildToc(sections: BlogSection[]): BlogTocItem[] {
  return sections.flatMap((section) => [
    { id: section.id, label: section.heading, level: 2 as const },
    ...(section.subsections ?? []).map((sub) => ({ id: sub.id, label: sub.heading, level: 3 as const })),
  ]);
}

const POSTS: BlogPostInput[] = [
  /* ============================================================ 1 */
  {
    slug: 'isicamli-cam-balkon-rehberi-2026',
    title: '2026 Isıcamlı Cam Balkon Rehberi: m² Fiyatları, Isı Yalıtımı ve Winsa Vera Termal Avantajları',
    seoTitle: 'Isıcamlı Cam Balkon Fiyatları 2026 (m²) | Winsa Vera Termal Rehberi',
    metaDescription:
      'Isıcamlı cam balkon m² fiyatları 2026, 4+20+4 argon gazlı ısıcam, ısı yalıtımı ve Winsa Vera Termal avantajları. Bahçelievler’de ücretsiz keşifle net fiyat alın.',
    keywords: [
      'ısıcamlı cam balkon fiyatları',
      'ısıcamlı cam balkon m2 fiyatı 2026',
      'Winsa Vera Termal',
      'ısıcamlı cam balkon yalıtım',
      'Bahçelievler ısıcamlı cam balkon',
    ],
    category: 'Cam Balkon',
    readTime: 9,
    publishDate: '2026-01-12',
    updatedDate: '2026-10-25',
    author: AUTHORS.engineer,
    image: '/images/blog/isicamli-cam-balkon-rehberi-2026.jpg',
    imageAlt: 'Isıcamlı cam balkon uygulaması — dört mevsim kullanılabilen kapalı balkon',
    excerpt:
      'Isıcamlı cam balkon, balkonu dört mevsim kullanılabilen bir yaşam alanına dönüştürür. 2026 m² fiyatlarını, ısıcam katmanlarını ve Winsa Vera Termal’in tek camlı sistemlere göre farkını mühendis gözüyle anlattık.',
    highlights: [
      `Vera Termal net birim fiyatı: ${m2('vbs_isicam')}`,
      `%${SYSTEMS.vbs_isicam.thermalSavingPercent} ısı tasarrufu, -${SYSTEMS.vbs_isicam.acousticReductionDb} dB ses yalıtımı`,
      '4+20+4 argon gazlı, her iki camı temperli ısıcam ünitesi',
    ],
    featured: true,
    relatedProductHref: '/urunler/vera-isicamli-cam-balkon',
    sections: [
      {
        id: 'isicamli-cam-balkon-nedir',
        heading: 'Isıcamlı cam balkon nedir, tek camlı sistemden farkı ne?',
        paragraphs: [
          'Isıcamlı cam balkon, iki temperli cam plakanın arasında argon gazıyla doldurulmuş, kenarları sızdırmaz şekilde kapatılmış bir ısıcam ünitesi kullanan katlanır veya sürme balkon sistemidir. Tek camlı sistemler rüzgâr, toz ve yağmuru keserken; ısıcamlı sistemler buna ek olarak ısı kaybını ve dış ortam gürültüsünü ciddi oranda azaltır.',
          'Winsa Vera Termal serisinde her iki cam da TSE EN 12150 standardında temperlenir; 4 mm + 20 mm argon boşluğu + 4 mm Low-E kaplamalı cam kombinasyonu, standart 8 mm tek cama göre çok daha düşük bir ısı geçirgenliği sağlar. Bu yüzden balkon, salonun doğal bir uzantısı gibi kışın da kullanılabilir.',
        ],
        subsections: [
          {
            id: 'isicam-katmanlari',
            heading: '4+20+4 ısıcam katmanları nasıl çalışır?',
            paragraphs: [
              'Dış cam güneş ve yağmura karşı ilk bariyerdir; ara boşluktaki argon gazı havadan daha yoğun olduğu için ısı transferini yavaşlatır; iç camdaki Low-E kaplama ise oda ısısını içeri geri yansıtır. Ara boşluğu çevreleyen çıta içindeki nem alıcı (desikant) da camlar arasında buğu oluşmasını engeller.',
            ],
            bullets: [
              'Dış cam: 4 mm temperli, darbe dayanımı 5 kat',
              'Ara boşluk: 20 mm argon gazı + nem alıcı çıta',
              'İç cam: 4 mm temperli Low-E (Konfor / Sinerji)',
            ],
          },
        ],
      },
      {
        id: 'isicamli-cam-balkon-fiyatlari-2026',
        heading: '2026 ısıcamlı cam balkon m² fiyatları',
        paragraphs: [
          `Aşağıdaki tablo Çelikpen net birim fiyat listesinden (güncelleme: ${PRICE_DATE}) otomatik olarak alınmıştır. Fiyatlar montaj dahil m² başına net rakamlardır; kesin tutar, lazerli keşif sonrasında ±%${TOLERANCE} bandında netleşir. Minimum faturalandırılan alan ${MIN_AREA} m²’dir.`,
        ],
        table: {
          caption: 'Çelikpen 2026 cam balkon net m² birim fiyatları',
          headers: ['Sistem', 'Cam yapısı', 'Isı tasarrufu', 'Net m² fiyatı'],
          rows: [
            [SYSTEMS.vns_8mm.name, SYSTEMS.vns_8mm.glassSpec, `%${SYSTEMS.vns_8mm.thermalSavingPercent}`, m2('vns_8mm')],
            [SYSTEMS.vns_10mm.name, SYSTEMS.vns_10mm.glassSpec, `%${SYSTEMS.vns_10mm.thermalSavingPercent}`, m2('vns_10mm')],
            [SYSTEMS.vds_isicamli.name, SYSTEMS.vds_isicamli.glassSpec, `%${SYSTEMS.vds_isicamli.thermalSavingPercent}`, m2('vds_isicamli')],
            [SYSTEMS.vbs_isicam.name, SYSTEMS.vbs_isicam.glassSpec, `%${SYSTEMS.vbs_isicam.thermalSavingPercent}`, m2('vbs_isicam')],
          ],
        },
        subsections: [
          {
            id: 'fiyati-etkileyen-faktorler',
            heading: 'Fiyatı etkileyen 5 faktör',
            paragraphs: ['Aynı m²’ye sahip iki balkonun teklifi farklı çıkabilir. Bunun nedeni ölçünün yanında aşağıdaki teknik değişkenlerdir:'],
            bullets: [
              'Balkon geometrisi (düz, L veya U tipi köşe dönüşleri)',
              'Cam tipi (şeffaf, füme, bronz veya alt kısmı buzlu)',
              'Profil rengi (antrasit, mat siyah, eloksal veya ahşap desen)',
              `Kedi tüllü sineklik (${CAT_SCREEN}) ve plise perde (${PLEATED}) gibi ek donanımlar`,
              `5 ve üzeri daireli toplu bina uygulamalarında %${BULK} indirim`,
            ],
          },
        ],
        proTip:
          'Fiyat karşılaştırırken yalnızca m² rakamına bakmayın; camın her iki katmanının temperli olup olmadığını, argon gazı belgesini ve conta yapısını mutlaka teklif metninde yazılı olarak isteyin.',
      },
      {
        id: 'isi-yalitimi-ve-tasarruf',
        heading: 'Isı yalıtımı ve enerji tasarrufu: rakamlarla Vera Termal',
        paragraphs: [
          `Vera Termal, standart tek camlı katlanır sistemlere göre yaklaşık 4 kat daha iyi ısı yalıtımı sunar ve balkon kaynaklı ısı kaybında %${SYSTEMS.vbs_isicam.thermalSavingPercent} seviyesine varan tasarruf sağlar. Bahçelievler gibi E-5 ve TEM aksına yakın ilçelerde ise -${SYSTEMS.vbs_isicam.acousticReductionDb} dB akustik yalıtım, trafik gürültüsünü kütüphane sessizliğine yaklaştırır.`,
          'Kışın balkonun iç yüzey sıcaklığı yükseldiği için cam yüzeyinde terleme (kondens) azalır; bu da küf, nem lekesi ve profil kenarlarında siyahlaşma riskini düşürür.',
        ],
      },
      {
        id: 'vera-termal-avantajlari',
        heading: 'Winsa Vera Termal’in öne çıkan avantajları',
        paragraphs: ['Vera Termal’i yalnızca ısıcamlı bir balkon değil, bir yaşam alanı sistemi yapan detaylar şunlardır:'],
        bullets: [
          'Isı yalıtımlı alüminyum profil ve mıknatıslı kanat birleşim contası',
          'Tamamen katlanarak balkonun %100’ünü açabilme',
          'Çocuk emniyet kilidi ve iç taraftan silinebilir kanat yapısı',
          '10 yıl sistem garantisi ve Bahçelievler merkezli yerinde servis',
        ],
      },
    ],
    faqs: [
      {
        question: 'Isıcamlı cam balkon kışın gerçekten sıcak tutar mı?',
        answer: `Evet. 4+20+4 argon gazlı ısıcam ve yalıtımlı profil sayesinde Vera Termal, balkon kaynaklı ısı kaybında %${SYSTEMS.vbs_isicam.thermalSavingPercent} seviyesine kadar tasarruf sağlar; balkon kışın salonun bir uzantısı olarak kullanılabilir.`,
      },
      {
        question: 'Isıcamlı cam balkon m² fiyatı 2026’da ne kadar?',
        answer: `Çelikpen net birim fiyat listesinde Winsa Vera Termal ${m2('vbs_isicam')}, Vera Slide Isıcamlı sürme sistem ise ${m2('vds_isicamli')} seviyesindedir. Kesin fiyat ücretsiz lazerli keşifle netleşir.`,
      },
      {
        question: 'Isıcamlı cam balkon montajı kaç gün sürer?',
        answer: 'Ölçü alındıktan sonra üretim ortalama 7–10 iş günü sürer; standart bir daire balkonunun montajı ise tek günde tamamlanır.',
      },
    ],
  },

  /* ============================================================ 2 */
  {
    slug: 'winsa-dorado-76-mi-revotech-gold-mu',
    title: 'Winsa Dorado 76 mı, Revotech Gold mu? 7 Odacıklı PVC Pencere Sistemleri Karşılaştırması',
    seoTitle: 'Dorado 76 mı Revotech Gold mu? Winsa PVC Pencere Karşılaştırması',
    metaDescription:
      'Winsa Dorado 76 ile Revotech Gold PVC pencere sistemlerini odacık sayısı, Uw değeri, ses yalıtımı ve kullanım alanına göre karşılaştırdık. Doğru seri seçimi rehberi.',
    keywords: ['Winsa Dorado 76', 'Winsa Revotech Gold', '7 odacıklı PVC pencere', 'PVC pencere karşılaştırma', 'Winsa pencere fiyatları'],
    category: 'PVC Pencere',
    readTime: 8,
    publishDate: '2026-02-03',
    updatedDate: '2026-10-25',
    author: AUTHORS.engineer,
    image: '/images/blog/dorado-76-revotech-gold-karsilastirma.jpg',
    imageAlt: 'Montaja hazır yeni nesil PVC pencere ve kapı doğramaları',
    excerpt:
      'Dorado 76 ince görünümlü 76 mm mimari seri, Revotech Gold ise 84 mm 7 odacıklı pasif ev sınıfı bir sistem. Hangisinin evinize daha uygun olduğunu teknik verilerle karşılaştırdık.',
    highlights: ['Revotech Gold: Uw 0.79 W/m²K, -46 dB', 'Dorado 76: 9 mm ince profil, daha fazla gün ışığı', `PVC doğrama net fiyatı: ${m2('pvc_dograma')}`],
    relatedProductHref: '/urunler/revotech-gold',
    sections: [
      {
        id: 'iki-seriye-genel-bakis',
        heading: 'İki seriye genel bakış',
        paragraphs: [
          'Winsa Dorado 76, 76 mm profil derinliği ve 9 mm’ye kadar düşen iç-dış profil görünümüyle cam yüzeyini maksimize eden minimalist bir seridir. Revotech Gold ise 84 mm kasa-kanat derinliği, 7 odacık ve 3 kademeli conta sistemiyle Winsa’nın pasif ev standartlarına en yakın premium serisidir.',
          'Kısacası Dorado 76 estetik ve gün ışığını; Revotech Gold ise maksimum ısı ve ses yalıtımını önceliklendirir.',
        ],
      },
      {
        id: 'teknik-karsilastirma',
        heading: 'Teknik karşılaştırma tablosu',
        paragraphs: ['Aşağıdaki değerler Winsa sistem dokümanları ve Çelikpen saha ölçümleriyle derlenmiştir.'],
        table: {
          caption: 'Winsa Dorado 76 ve Revotech Gold teknik karşılaştırması',
          headers: ['Özellik', 'Dorado 76', 'Revotech Gold'],
          rows: [
            ['Profil derinliği', '76 mm', '84 mm kasa / 84 mm kanat'],
            ['Odacık sayısı', '5 odacık', '7 odacık'],
            ['Conta sistemi', '2 conta', '3 kademeli orta conta'],
            ['Isı geçirgenliği (Uw)', '0.98 W/(m²K)', '0.79 W/(m²K)'],
            ['Ses yalıtımı', '-42 dB', '-46 dB'],
            ['Maks. cam kalınlığı', '44 mm', '52 mm (üçlü cam uyumlu)'],
            ['İdeal kullanım', 'Modern konut, geniş cam yüzey', 'Ana cadde, yüksek kat, pasif ev'],
          ],
        },
      },
      {
        id: 'hangi-durumda-hangisi',
        heading: 'Hangi durumda hangi seri?',
        paragraphs: ['Seçim, evin konumu ve beklentiye göre değişir.'],
        subsections: [
          {
            id: 'dorado-76-kimler-icin',
            heading: 'Dorado 76 kimler için ideal?',
            paragraphs: ['Gün ışığını önemseyen, ince ve modern bir cephe görünümü isteyen, orta yoğunlukta trafiğe sahip sokaklarda oturan kullanıcılar için en dengeli seçenektir.'],
          },
          {
            id: 'revotech-gold-kimler-icin',
            heading: 'Revotech Gold kimler için ideal?',
            paragraphs: ['Şirinevler E-5, Basın Ekspres gibi yoğun trafik akslarında, rüzgâr yükü yüksek üst katlarda veya enerji faturasını minimuma indirmek isteyen kullanıcılar için Revotech Gold açık ara öndedir.'],
          },
        ],
        proTip: 'Profil kadar cam da önemlidir: Revotech Gold’u üçlü cam (4+12+4+12+4) ile kullandığınızda ses ve ısı performansının tam potansiyeline ulaşırsınız.',
      },
      {
        id: 'fiyat-ve-yatirim',
        heading: 'Fiyat ve yatırım geri dönüşü',
        paragraphs: [
          `Çelikpen net listesinde Dorado 76 & Revotech Gold PVC doğrama ${m2('pvc_dograma')} olarak fiyatlandırılır; cam paketi ve renk seçimine göre teklif netleşir. Revotech Gold’un düşük Uw değeri, ısıtma giderlerinde birkaç sezonda kendini amorti eden bir fark yaratır.`,
        ],
      },
    ],
    faqs: [
      {
        question: '7 odacıklı PVC pencere gerçekten fark yaratır mı?',
        answer: 'Evet. Odacık sayısı arttıkça profil içindeki hava katmanı çoğalır ve ısı köprüsü azalır. Revotech Gold’un 7 odacığı, 0.79 W/(m²K) Uw değerine ulaşmasını sağlar.',
      },
      {
        question: 'Dorado 76 ses yalıtımı için yeterli mi?',
        answer: 'Ortalama yoğunluktaki sokaklar için -42 dB ses yalıtımı fazlasıyla yeterlidir. Ana cadde cephelerinde Revotech Gold önerilir.',
      },
    ],
  },

  /* ============================================================ 3 */
  {
    slug: 'katlanir-cam-balkon-mi-esiksiz-surme-mi',
    title: 'Katlanır Cam Balkon mu, Eşiksiz Sürme Sistem mi? Balkonunuza En Uygun Sistemi Seçin',
    seoTitle: 'Katlanır mı Sürme Cam Balkon mu? Avantaj, Fiyat ve Seçim Rehberi',
    metaDescription:
      'Katlanır cam balkon ile eşiksiz sürme cam balkonu açılım oranı, yalıtım, temizlik, fiyat ve balkon tipine göre karşılaştırın. Winsa Vera ve Vera Slide rehberi.',
    keywords: ['katlanır cam balkon', 'sürme cam balkon', 'eşiksiz cam balkon', 'Winsa Vera Slide', 'cam balkon hangisi daha iyi'],
    category: 'Cam Balkon',
    readTime: 7,
    publishDate: '2026-03-08',
    updatedDate: '2026-10-25',
    author: AUTHORS.architect,
    image: '/images/blog/katlanir-mi-esiksiz-surme-mi.jpg',
    imageAlt: 'Yarı açık konumda katlanır cam sistem',
    excerpt:
      'Katlanır sistem balkonu tamamen açar, sürme sistem ise yer kaplamadan sessizce kayar. Balkonunuzun ölçüsüne, kullanım alışkanlığınıza ve bütçenize göre doğru seçimi yapmanız için karşılaştırdık.',
    highlights: ['Katlanır: %100 açılım', 'Sürme: kanat açma alanı gerektirmez', `Vera Slide net fiyatı: ${m2('vds_surme')}`],
    relatedProductHref: '/urunler/panorama-esiksiz-surme-cam-balkon',
    sections: [
      {
        id: 'temel-farklar',
        heading: 'İki sistem arasındaki temel fark',
        paragraphs: [
          'Katlanır cam balkonda kanatlar tek tek kayıp bir kenarda paketlenir ve balkonun tamamı açılır. Eşiksiz sürme sistemde ise kanatlar paralel raylarda birbirinin önüne kayar; balkonun yaklaşık yarısı ile üçte ikisi arası açılabilir ancak içeri doğru kanat açma alanı gerekmez.',
        ],
      },
      {
        id: 'karsilastirma-tablosu',
        heading: 'Katlanır ve sürme sistem karşılaştırma tablosu',
        paragraphs: ['Her iki sistemi Çelikpen fiyat listesi ve saha verileriyle karşılaştırdık.'],
        table: {
          caption: 'Katlanır ve eşiksiz sürme cam balkon karşılaştırması',
          headers: ['Kriter', 'Katlanır (Vera / Vera Pro)', 'Eşiksiz Sürme (Vera Slide)'],
          rows: [
            ['Açılım oranı', '%100', '%50 – %66'],
            ['Kanat açma alanı', 'Gerekir', 'Gerekmez'],
            ['Isı tasarrufu', `%${SYSTEMS.vns_8mm.thermalSavingPercent} – %${SYSTEMS.vns_10mm.thermalSavingPercent}`, `%${SYSTEMS.vds_surme.thermalSavingPercent}`],
            ['Ses yalıtımı', `-${SYSTEMS.vns_8mm.acousticReductionDb} / -${SYSTEMS.vns_10mm.acousticReductionDb} dB`, `-${SYSTEMS.vds_surme.acousticReductionDb} dB`],
            ['Zemin', 'Alt ray', 'Eşiksiz, tekerlekli sandalye uyumlu'],
            ['Net m² fiyatı', `${m2('vns_8mm')} – ${m2('vns_10mm')}`, m2('vds_surme')],
          ],
        },
      },
      {
        id: 'balkon-tipine-gore-secim',
        heading: 'Balkon tipine göre doğru seçim',
        paragraphs: ['Balkonun ölçüsü ve kullanım alışkanlığı, sistem seçiminin en belirleyici iki unsurudur.'],
        subsections: [
          {
            id: 'dar-balkonlar',
            heading: 'Dar ve uzun balkonlar',
            paragraphs: ['Derinliği 1 metrenin altında olan balkonlarda içeri açılan kanatlar oturma alanını daraltır. Bu tip balkonlarda Vera Slide eşiksiz sürme sistem yaşam alanını korur.'],
          },
          {
            id: 'genis-teraslar',
            heading: 'Geniş balkon ve teraslar',
            paragraphs: ['Yazın balkonu tamamen açık kullanmak isteyenler için katlanır sistem rakipsizdir. Vera Pro 10 mm, yüksek katlarda rüzgâr yüküne karşı ekstra güvenlik sağlar.'],
          },
        ],
        proTip: 'Evde küçük çocuk veya evcil hayvan varsa, iki sistemde de çocuk kilidi ve kedi tüllü sineklik seçeneğini teklif aşamasında ekletin.',
      },
    ],
    faqs: [
      {
        question: 'Hangisi daha fazla ısı yalıtımı sağlar, katlanır mı sürme mi?',
        answer: `Tek camlı sistemlerde Vera Slide sürme sistem %${SYSTEMS.vds_surme.thermalSavingPercent} ısı tasarrufuyla öne çıkar. En yüksek yalıtım için ise ısıcamlı Vera Termal katlanır sistem tercih edilmelidir.`,
      },
      {
        question: 'Sürme cam balkonu temizlemek zor mu?',
        answer: 'Hayır. Vera Slide kanatları birbirinin önüne kaydırılarak iç taraftan güvenle silinebilir; paslanmaz rulmanlı ray yapısı toz birikimini azaltır.',
      },
      {
        question: 'Eşiksiz sürme sistem yağmur suyu alır mı?',
        answer: 'Eşiksiz sistemlerde su tahliye kanallı alt profil kullanılır. Doğru eğimli montajla normal yağışlarda içeri su girişi olmaz.',
      },
    ],
  },

  /* ============================================================ 4 */
  {
    slug: 'motorlu-giyotin-cam-sistemleri',
    title: 'Motorlu Giyotin Cam Sistemleri: Teras, Kafe ve Kış Bahçelerinde Kumandalı Konfor',
    seoTitle: 'Motorlu Giyotin Cam Sistemleri | Fiyat, Güvenlik ve Kullanım Alanları',
    metaDescription:
      'Motorlu giyotin cam sistemi nedir, nasıl çalışır, güvenli mi? Teras, kafe ve kış bahçesi uygulamaları ile Winsa Vera Vertical m² fiyatı rehberi.',
    keywords: ['giyotin cam sistemi', 'motorlu giyotin cam', 'giyotin cam fiyatları', 'kafe cam sistemi', 'Winsa Vera Vertical'],
    category: 'Giyotin & Teras',
    readTime: 7,
    publishDate: '2026-04-15',
    updatedDate: '2026-10-25',
    author: AUTHORS.advisor,
    image: '/images/blog/motorlu-giyotin-cam-sistemleri.jpg',
    imageAlt: 'Cam cepheli, aydınlık kış bahçesi ve teras alanı',
    excerpt:
      'Giyotin cam sistemleri dikey hareket eden camlarıyla teras ve kafelerde kumandayla açılıp kapanan bir cephe oluşturur. Çalışma prensibini, güvenlik donanımlarını ve fiyatlandırmayı anlattık.',
    highlights: ['Uzaktan kumandalı zincirli motor sistemi', 'Engel algılama ve düşme emniyeti', `Vera Vertical net fiyatı: ${m2('vgs_giyotin')}`],
    relatedProductHref: '/urunler/giyotin-motorlu-silinebilir-cam',
    sections: [
      {
        id: 'giyotin-cam-nedir',
        heading: 'Giyotin cam sistemi nedir?',
        paragraphs: [
          'Giyotin cam sistemi, camların yatay değil dikey eksende hareket ettiği bir cephe sistemidir. Camlar motor yardımıyla aşağı-yukarı hareket ederek terasın üst kısmını açar veya tamamen kapatır. Böylece hem panoramik görüş korunur hem de hava sirkülasyonu kontrol edilebilir.',
        ],
      },
      {
        id: 'nasil-calisir',
        heading: 'Motorlu sistem nasıl çalışır?',
        paragraphs: ['Winsa Vera Vertical, yan dikmelerdeki zincir-dişli mekanizması ve termal motor kutusu ile çalışır.'],
        bullets: [
          'Uzaktan kumanda, duvar anahtarı veya akıllı ev entegrasyonu',
          'Ara konumda durdurma ile kademeli havalandırma',
          'Engel algılama: cam bir nesneye temas ettiğinde otomatik durur',
          'Elektrik kesintisinde manuel kurtarma',
        ],
      },
      {
        id: 'kullanim-alanlari',
        heading: 'Kullanım alanları',
        paragraphs: ['Giyotin cam, konuttan ticari alanlara kadar geniş bir kullanım yelpazesine sahiptir.'],
        subsections: [
          {
            id: 'kafe-restoran',
            heading: 'Kafe ve restoranlar',
            paragraphs: ['İşletmeler yaz-kış aynı alanı kullanarak masa kapasitesini yıl boyu korur. Kumandayla saniyeler içinde açık teras konseptine geçilebilir.'],
          },
          {
            id: 'konut-teraslari',
            heading: 'Konut terasları ve kış bahçeleri',
            paragraphs: ['Villa ve çatı katı teraslarında bioklimatik pergola ile birlikte kullanıldığında dört mevsim yaşam alanı oluşturur.'],
          },
        ],
        table: {
          caption: 'Giyotin cam ve katlanır cam karşılaştırması',
          headers: ['Kriter', 'Motorlu Giyotin', 'Katlanır Cam Balkon'],
          rows: [
            ['Hareket yönü', 'Dikey', 'Yatay'],
            ['Kullanım', 'Kumanda / akıllı ev', 'Elle'],
            ['Isı tasarrufu', `%${SYSTEMS.vgs_giyotin.thermalSavingPercent}`, `%${SYSTEMS.vns_10mm.thermalSavingPercent}`],
            ['Net m² fiyatı', m2('vgs_giyotin'), m2('vns_10mm')],
          ],
        },
        proTip: 'Kafe uygulamalarında motor kutusunun bakım kapağına kolay erişim olacak şekilde montaj planlatın; yıllık bakım süresi yarı yarıya kısalır.',
      },
    ],
    faqs: [
      {
        question: 'Giyotin cam sistemi güvenli mi?',
        answer: 'Evet. Vera Vertical; temperli veya lamine cam, engel algılama sensörü ve zincir kopmasına karşı düşme emniyetiyle donatılmıştır.',
      },
      {
        question: 'Giyotin cam m² fiyatı ne kadar?',
        answer: `Çelikpen net birim fiyat listesinde Winsa Vera Vertical motorlu giyotin ${m2('vgs_giyotin')} olarak yer alır; motor tipi ve cam seçimine göre teklif netleşir.`,
      },
    ],
  },

  /* ============================================================ 5 */
  {
    slug: 'bioklimatik-pergola-kis-bahcesi-su-sizdirmazlik',
    title: 'Bioklimatik Pergola ve Kış Bahçesi Sistemlerinde Su Sızdırmazlığı ve Dört Mevsim Yalıtım',
    seoTitle: 'Bioklimatik Pergola Su Geçirir mi? Kış Bahçesi Yalıtım Rehberi',
    metaDescription:
      'Bioklimatik pergola su sızdırmazlığı, oluk ve drenaj detayları, kış bahçesinde dört mevsim yalıtım ve m² fiyatları. Winsa Vela & Lotus sistem rehberi.',
    keywords: ['bioklimatik pergola', 'bioklimatik pergola su geçirir mi', 'kış bahçesi sistemleri', 'pergola fiyatları', 'kış bahçesi yalıtım'],
    category: 'Kış Bahçesi',
    readTime: 8,
    publishDate: '2026-05-20',
    updatedDate: '2026-10-25',
    author: AUTHORS.architect,
    image: '/images/blog/bioklimatik-pergola-kis-bahcesi.jpg',
    imageAlt: 'Villaya entegre cam kış bahçesi uygulaması',
    excerpt:
      'Bioklimatik pergolanın dönebilen alüminyum lamelleri yağmuru kanallara yönlendirir. Su sızdırmazlığını sağlayan mühendislik detaylarını ve kış bahçesinde dört mevsim konforun sırlarını açıklıyoruz.',
    highlights: ['Entegre oluk ve gizli drenaj kolonları', 'Yağmur sensörüyle otomatik kapanma', `Bioklimatik pergola net fiyatı: ${m2('pergola')}`],
    relatedProductHref: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    sections: [
      {
        id: 'bioklimatik-pergola-nedir',
        heading: 'Bioklimatik pergola nedir?',
        paragraphs: [
          'Bioklimatik pergola, 0–135 derece arasında dönebilen alüminyum lamellerden oluşan bir çatı sistemidir. Lameller açıldığında doğal havalandırma ve gün ışığı sağlar; kapandığında ise yağmur ve kara karşı tam bir çatı oluşturur.',
        ],
      },
      {
        id: 'su-sizdirmazlik-detaylari',
        heading: 'Su sızdırmazlığını sağlayan mühendislik detayları',
        paragraphs: ['Pergolanın su geçirmezliği lamel tasarımı, oluk sistemi ve montaj kalitesinin birleşimidir.'],
        subsections: [
          {
            id: 'lamel-ve-oluk',
            heading: 'Lamel profili ve entegre oluklar',
            paragraphs: ['Kapalı konumda lameller birbirine EPDM contalarla kenetlenir. Lamel üzerindeki su, kenar kirişlerdeki 220 mm oluklu ana kirişe yönlenir.'],
          },
          {
            id: 'drenaj-kolonlari',
            heading: 'Gizli drenaj kolonları',
            paragraphs: ['Toplanan su, 150×150 mm taşıyıcı kolonların içinden geçen gizli borularla zemine tahliye edilir; dışarıdan görünen bir boru bulunmaz.'],
          },
        ],
        table: {
          caption: 'Bioklimatik pergola ve klasik tente karşılaştırması',
          headers: ['Kriter', 'Bioklimatik Pergola', 'Klasik Tente'],
          rows: [
            ['Su sızdırmazlığı', 'Tam (contalı lamel + oluk)', 'Sınırlı'],
            ['Kar yükü', 'Yüksek dayanım', 'Düşük'],
            ['Havalandırma', 'Lamel açısıyla ayarlanabilir', 'Yok'],
            ['Otomasyon', 'Yağmur / rüzgâr sensörü', 'Opsiyonel motor'],
            ['Net m² fiyatı', m2('pergola'), 'Sisteme göre değişir'],
          ],
        },
      },
      {
        id: 'kis-bahcesinde-yalitim',
        heading: 'Kış bahçesinde dört mevsim yalıtım',
        paragraphs: [
          'Pergolanın yan yüzeyleri giyotin cam, ısıcamlı sürme veya katlanır sistemlerle kapatıldığında tam donanımlı bir kış bahçesi elde edilir. Lamine ısıcam tavan seçeneği ise kışın ısı kaybını, yazın güneş yükünü azaltır.',
        ],
        bullets: ['Yan cepheler: Vera Vertical giyotin veya Vera Termal', 'Tavan: bioklimatik lamel veya lamine ısıcam', 'Opsiyonel LED aydınlatma ve infrared ısıtıcı entegrasyonu'],
        proTip: 'Pergola siparişinde yağmur sensörünü mutlaka ekleyin; ani sağanaklarda lameller siz evde olmasanız da otomatik kapanır.',
      },
    ],
    faqs: [
      {
        question: 'Bioklimatik pergola su geçirir mi?',
        answer: 'Hayır. Kapalı konumda contalı lameller, entegre oluklar ve kolon içi drenaj sayesinde bioklimatik pergola yağmur suyunu tamamen tahliye eder.',
      },
      {
        question: 'Bioklimatik pergola kar yüküne dayanıklı mı?',
        answer: 'Winsa Vela & Lotus sistemleri, statik hesapla belirlenen kolon aralıklarıyla İstanbul iklimindeki kar yüklerine dayanacak şekilde projelendirilir.',
      },
      {
        question: 'Pergola için belediye izni gerekir mi?',
        answer: 'Sökülebilir hafif yapılar çoğu durumda ruhsat gerektirmez; ancak site yönetimi ve kat maliklerinin onayı alınmalıdır. Keşif sırasında bu konuda ücretsiz danışmanlık veriyoruz.',
      },
    ],
  },

  /* ============================================================ 6 */
  {
    slug: 'panorama-hs-76-hebeschiebe-kaldir-sur',
    title: 'Hebeschiebe (Panorama HS 76) Kaldır-Sür Sürme Sistemlerin Geniş Cephelerdeki Mühendislik Gücü',
    seoTitle: 'Panorama HS 76 Hebeschiebe Kaldır-Sür Sistem | Teknik Rehber',
    metaDescription:
      'Winsa Panorama HS 76 hebeschiebe kaldır-sür sürme sistemi: 300 kg kanat kapasitesi, ısı yalıtımı, geniş açıklıklar ve m² fiyatı hakkında teknik rehber.',
    keywords: ['hebeschiebe', 'kaldır sür sistem', 'Panorama HS 76', 'PVC sürme kapı', 'geniş açıklık sürme kapı'],
    category: 'Sürme Sistemler',
    readTime: 7,
    publishDate: '2026-06-18',
    updatedDate: '2026-10-25',
    author: AUTHORS.engineer,
    image: '/images/blog/panorama-hs-76-hebeschiebe.jpg',
    imageAlt: 'Geniş cam cepheli modern konut mimarisi',
    excerpt:
      'Kaldır-sür (hebeschiebe) sistemler, 300 kg’a varan kanatları tek elle hareket ettirerek salon ile teras arasındaki sınırı kaldırır. Panorama HS 76’nın mühendislik detaylarını inceledik.',
    highlights: ['300 kg kanat taşıma kapasitesi', '175 mm kasa / 76 mm kanat', `Panorama HS 76 net fiyatı: ${m2('hs_surme')}`],
    relatedProductHref: '/urunler/panorama-hs-76',
    sections: [
      {
        id: 'hebeschiebe-nedir',
        heading: 'Hebeschiebe (kaldır-sür) nedir?',
        paragraphs: [
          'Hebeschiebe, Almanca “kaldır ve sür” anlamına gelir. Kol 180 derece çevrildiğinde kanat birkaç milimetre yukarı kalkar, contalar kasadan ayrılır ve kanat makaralar üzerinde rahatça kayar. Kol kapatıldığında kanat yeniden contalara oturarak tam sızdırmazlık sağlar.',
        ],
      },
      {
        id: 'muhendislik-detaylari',
        heading: 'Panorama HS 76’nın mühendislik detayları',
        paragraphs: ['Geniş cephelerde performansı belirleyen dört temel unsur vardır.'],
        subsections: [
          {
            id: 'kanat-kapasitesi',
            heading: '300 kg kanat kapasitesi',
            paragraphs: ['Çelik takviyeli profil ve yüksek taşıma kapasiteli makaralar sayesinde 3 metreyi aşan kanat genişliklerinde bile tek elle hafif kullanım sağlanır.'],
          },
          {
            id: 'termal-esik',
            heading: 'Termal kesmeli alçak eşik',
            paragraphs: ['Isı yalıtımlı alt eşik, hem ısı köprüsünü engeller hem de salon ile teras arasında takılmadan geçiş imkânı verir.'],
          },
        ],
        table: {
          caption: 'Winsa sürme sistemleri karşılaştırması',
          headers: ['Sistem', 'Kasa / Kanat', 'Kanat kapasitesi', 'Net m² fiyatı'],
          rows: [
            ['Panorama HS 76', '175 mm / 76 mm', '300 kg', m2('hs_surme')],
            ['Comfort Slide Plus', '150 mm / 76 mm', '200 kg', m2('comfort_slide')],
          ],
        },
        proTip: 'Kanat genişliği 2,5 metreyi aşıyorsa üçlü cam yerine lamine + ısıcam kombinasyonu seçin; hem ağırlık hem güvenlik açısından daha dengeli bir çözüm olur.',
      },
      {
        id: 'nerelerde-kullanilir',
        heading: 'Nerelerde kullanılır?',
        paragraphs: ['Villa salonları, çatı katı teras çıkışları, bahçe katı daireler ve ticari showroom cepheleri hebeschiebe sistemlerin en verimli olduğu alanlardır.'],
      },
    ],
    faqs: [
      {
        question: 'Hebeschiebe ile normal sürme kapı arasındaki fark nedir?',
        answer: 'Normal sürme sistemlerde contalar sürtünerek kayar; hebeschiebe’de kanat kaldırılıp contalardan ayrıldığı için hem çok daha hafif kayar hem de kapandığında tam sızdırmazlık sağlar.',
      },
      {
        question: 'Panorama HS 76 fiyatı ne kadar?',
        answer: `Çelikpen net listesinde Winsa Panorama HS 76 ${m2('hs_surme')} olarak fiyatlandırılır; cam paketi ve renk seçimine göre teklif netleşir.`,
      },
    ],
  },

  /* ============================================================ 7 */
  {
    slug: 'sisecam-sinerji-konfor-isicam-secimi',
    title: 'Cam Balkon ve PVC Doğramalarda Şişecam Sinerji & Konfor Isıcam Seçimi Neden Önemlidir?',
    seoTitle: 'Şişecam Sinerji mi Konfor mu? Isıcam Seçim Rehberi',
    metaDescription:
      'Şişecam Sinerji ve Konfor ısıcam farkları, Low-E kaplama, güneş kontrolü ve cam balkon ile PVC pencerelerde doğru ısıcam seçimi rehberi.',
    keywords: ['Şişecam Sinerji', 'Şişecam Konfor', 'ısıcam seçimi', 'Low-E cam', 'ısıcam çeşitleri'],
    category: 'Cam Teknolojisi',
    readTime: 6,
    publishDate: '2026-07-22',
    updatedDate: '2026-10-25',
    author: AUTHORS.engineer,
    image: '/images/blog/sisecam-isicam-secimi.jpg',
    imageAlt: 'Çift camlı ısıcam üniteleri',
    excerpt:
      'Profil ne kadar iyi olursa olsun, pencere yüzeyinin %70’i camdır. Şişecam Sinerji ve Konfor ısıcamlar arasındaki farkı, hangi cepheye hangi camın seçilmesi gerektiğini anlattık.',
    highlights: ['Konfor: ısı yalıtımı odaklı Low-E', 'Sinerji: ısı + güneş kontrolü', 'Güney ve batı cephelerde Sinerji önerilir'],
    relatedProductHref: '/urunler/vera-isicamli-cam-balkon',
    sections: [
      {
        id: 'neden-cam-onemli',
        heading: 'Neden cam seçimi profil kadar önemli?',
        paragraphs: [
          'Bir pencerenin veya cam balkonun yüzey alanının yaklaşık %70–85’i camdan oluşur. Bu yüzden ısı kaybının ve güneş kaynaklı aşırı ısınmanın büyük bölümü camdan gerçekleşir. Doğru ısıcam seçimi, enerji faturasında profil seçiminden bile daha büyük fark yaratabilir.',
        ],
      },
      {
        id: 'sinerji-ve-konfor',
        heading: 'Şişecam Sinerji ve Konfor arasındaki fark',
        paragraphs: ['İki ürün de Low-E (düşük salınımlı) kaplamalıdır ancak öncelikleri farklıdır.'],
        subsections: [
          {
            id: 'konfor-isicam',
            heading: 'Konfor ısıcam',
            paragraphs: ['Kışın oda ısısını içeride tutmaya odaklanır; kuzey ve doğu cephelerde, güneş almayan odalarda idealdir.'],
          },
          {
            id: 'sinerji-isicam',
            heading: 'Sinerji ısıcam',
            paragraphs: ['Isı yalıtımına ek olarak güneş enerjisinin önemli bir kısmını dışarı yansıtır. Güney ve batı cephelerde yazın klima yükünü belirgin şekilde azaltır.'],
          },
        ],
        table: {
          caption: 'Isıcam türleri karşılaştırması',
          headers: ['Cam türü', 'Isı yalıtımı', 'Güneş kontrolü', 'Önerilen cephe'],
          rows: [
            ['Standart çift cam', 'Orta', 'Yok', 'Bütçe odaklı projeler'],
            ['Konfor (Low-E)', 'Yüksek', 'Düşük', 'Kuzey / Doğu'],
            ['Sinerji (Low-E + güneş kontrol)', 'Yüksek', 'Yüksek', 'Güney / Batı'],
            ['Üçlü cam', 'Çok yüksek', 'Kaplamaya bağlı', 'Ana cadde, pasif ev'],
          ],
        },
        proTip: 'Aynı evde farklı cepheler için farklı ısıcam seçmek mümkündür; keşif sırasında cephe yönlerine göre karma cam paketi planlıyoruz.',
      },
      {
        id: 'argon-ve-cita',
        heading: 'Argon gazı ve sıcak kenar çıtası',
        paragraphs: ['Isıcamın performansını tamamlayan iki detay vardır: camlar arasına doldurulan argon gazı ve alüminyum yerine kullanılan sıcak kenar (warm-edge) çıtası. Sıcak kenar çıtası cam kenarlarında terlemeyi belirgin şekilde azaltır.'],
      },
    ],
    faqs: [
      {
        question: 'Sinerji cam evi karartır mı?',
        answer: 'Hayır. Sinerji camın ışık geçirgenliği yüksektir; gözle fark edilir bir kararma yaratmadan güneş ısısını filtreler.',
      },
      {
        question: 'Cam balkonda Low-E cam kullanılabilir mi?',
        answer: 'Evet. Winsa Vera Termal ısıcamlı cam balkonda iç cam Low-E Konfor veya Sinerji olarak üretilebilir.',
      },
    ],
  },

  /* ============================================================ 8 */
  {
    slug: 'bahcelievler-cam-balkon-10-kritik-detay',
    title: "Bahçelievler ve İstanbul'da Cam Balkon Yaptırırken Dikkat Edilmesi Gereken 10 Kritik Detay",
    seoTitle: "Bahçelievler'de Cam Balkon Yaptırırken 10 Kritik Detay | Çelikpen",
    metaDescription:
      "Bahçelievler ve İstanbul'da cam balkon yaptırırken muvafakatname, cam tipi, rüzgâr yükü, montaj ve garanti gibi 10 kritik detayı uzman gözüyle anlattık.",
    keywords: ['Bahçelievler cam balkon', 'İstanbul cam balkon', 'cam balkon yaptırırken dikkat edilmesi gerekenler', 'cam balkon muvafakatname', 'Kocasinan cam balkon'],
    category: 'Yerel Rehber',
    readTime: 9,
    publishDate: '2026-09-10',
    updatedDate: '2026-10-25',
    author: AUTHORS.advisor,
    image: '/images/blog/bahcelievler-cam-balkon-10-kritik-detay.jpg',
    imageAlt: 'İstanbul’da apartman cepheleri ve balkonlar',
    excerpt:
      "30 yıllık Bahçelievler saha tecrübemizle, cam balkon yaptırırken sonradan pişmanlık yaşatmayacak 10 kritik detayı derledik: yasal süreçten rüzgâr yüküne, ölçüden garantiye kadar.",
    highlights: ['4/5 kat maliki muvafakatnamesi', 'Yüksek katlarda 10 mm cam zorunluluğu', `5+ daireli binalarda %${BULK} toplu indirim`],
    relatedProductHref: '/bahcelievler/kocasinan',
    sections: [
      {
        id: 'yasal-ve-planlama',
        heading: 'Yasal süreç ve planlama (Detay 1–3)',
        paragraphs: ['Cam balkon projesinin sağlıklı ilerlemesi, montajdan önce atılan adımlara bağlıdır.'],
        subsections: [
          {
            id: 'detay-1-muvafakatname',
            heading: '1. Kat malikleri muvafakatnamesi',
            paragraphs: ['Kat Mülkiyeti Kanunu kapsamında dış cepheyi etkileyen değişikliklerde kat maliklerinin 4/5 onayı aranır. Muvafakatname formunu Çelikpen olarak ücretsiz hazırlıyoruz.'],
          },
          {
            id: 'detay-2-cephe-uyumu',
            heading: '2. Bina cephesiyle renk uyumu',
            paragraphs: ['Apartmanda farklı renklerde cam balkon görsel kirlilik yaratır. Yönetim planında belirlenmiş bir renk varsa (genellikle antrasit RAL 7016) ona uyulmalıdır.'],
          },
          {
            id: 'detay-3-lazerli-olcu',
            heading: '3. Lazerli ölçü ve şaşma kontrolü',
            paragraphs: ['Eski binalarda tavan ve parapetler milimetrik olarak düz değildir. Lazerli ölçüm, kanatların yıllarca sorunsuz çalışmasının temelidir.'],
          },
        ],
      },
      {
        id: 'teknik-secimler',
        heading: 'Teknik seçimler (Detay 4–7)',
        paragraphs: ['Doğru sistem, balkonun konumuna ve beklentiye göre seçilmelidir.'],
        subsections: [
          {
            id: 'detay-4-cam-kalinligi',
            heading: '4. Kat yüksekliğine göre cam kalınlığı',
            paragraphs: ['5. kat ve üzerinde rüzgâr yükü artar; bu katlarda 10 mm Vera Pro veya ısıcamlı sistem tercih edilmelidir.'],
          },
          {
            id: 'detay-5-tek-cam-isicam',
            heading: '5. Tek cam mı, ısıcam mı?',
            paragraphs: ['Balkonu kışın da kullanacaksanız ısıcamlı sistem; yalnızca toz, rüzgâr ve yağmurdan korunmak istiyorsanız tek camlı sistem yeterlidir.'],
          },
          {
            id: 'detay-6-ses-yalitimi',
            heading: '6. E-5 ve ana cadde cephelerinde ses yalıtımı',
            paragraphs: ['Şirinevler, Yenibosna ve Basın Ekspres hattında akustik performansı yüksek ısıcamlı sistemler yaşam kalitesini belirgin şekilde artırır.'],
          },
          {
            id: 'detay-7-aksesuar',
            heading: '7. Sineklik, perde ve çocuk kilidi',
            paragraphs: [`Kedi tüllü sineklik (${CAT_SCREEN}) ve plise perde (${PLEATED}) sonradan eklemek yerine projeyle birlikte planlanmalıdır.`],
          },
        ],
        table: {
          caption: 'Bahçelievler kat ve konuma göre önerilen sistemler',
          headers: ['Konum', 'Önerilen sistem', 'Net m² fiyatı'],
          rows: [
            ['1–4. kat, ara sokak', SYSTEMS.vns_8mm.name, m2('vns_8mm')],
            ['5. kat ve üzeri', SYSTEMS.vns_10mm.name, m2('vns_10mm')],
            ['Dar balkon', SYSTEMS.vds_surme.name, m2('vds_surme')],
            ['Ana cadde / kış kullanımı', SYSTEMS.vbs_isicam.name, m2('vbs_isicam')],
          ],
        },
      },
      {
        id: 'montaj-ve-garanti',
        heading: 'Montaj ve garanti (Detay 8–10)',
        paragraphs: ['Montaj kalitesi ve satış sonrası hizmet, en az ürün kadar önemlidir.'],
        bullets: [
          '8. Montajı firmanın kendi ekibinin yaptığından emin olun (taşeron değil).',
          '9. Garanti belgesinde profil, cam, aksesuar ve işçilik ayrı ayrı yazmalıdır.',
          '10. Yerel servis: Bahçelievler merkezli bir firma, arıza anında aynı gün müdahale edebilir.',
        ],
        proTip: `Apartmanınızda 5 veya daha fazla daire birlikte cam balkon yaptırırsa toplu bina indirimiyle %${BULK} avantaj sağlanır; yönetim toplantısında bu fırsatı gündeme getirin.`,
      },
    ],
    faqs: [
      {
        question: 'Bahçelievler’de cam balkon için ücretsiz keşif var mı?',
        answer: 'Evet. Çelikpen, Kocasinan Merkez Mahallesi’ndeki showroom’undan tüm Bahçelievler mahallelerine ücretsiz lazerli keşif hizmeti verir.',
      },
      {
        question: 'Cam balkon için kat maliklerinin onayı şart mı?',
        answer: 'Dış cepheyi değiştiren uygulamalarda kat maliklerinin 4/5 onayı aranır. Muvafakatname formunu ücretsiz hazırlayıp süreci birlikte yönetiyoruz.',
      },
      {
        question: 'Cam balkon garantisi kaç yıl?',
        answer: 'Winsa Vera serisi cam balkon sistemlerinde 10 yıl sistem garantisi ve yerinde servis desteği sunuyoruz.',
      },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = POSTS.map((post) => ({
  ...post,
  tableOfContents: buildToc(post.sections),
}));

export const BLOG_CATEGORIES: BlogCategory[] = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));

export const FEATURED_BLOG_POST: BlogPost = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${iso}T00:00:00Z`));
}
