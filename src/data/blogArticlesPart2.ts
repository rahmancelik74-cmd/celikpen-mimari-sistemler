import { CELIKPEN_PRICING_CONFIG, type SystemSeriesId } from '../config/pricing.config';
import {
  COMMON_EXTERNAL_AUTHORITIES,
  type RawBlogPost,
} from './blogTypes';

const SYSTEMS = CELIKPEN_PRICING_CONFIG.systems;
const tl = (value: number) =>
  `${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(value)} TL`;
const m2 = (id: SystemSeriesId) => `${tl(SYSTEMS[id].netPricePerM2)}/m²`;
const BULK = Math.round(CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate * 100);
const CAT_SCREEN = tl(CELIKPEN_PRICING_CONFIG.addons.catScreenPerUnit);
const PLEATED = `${tl(CELIKPEN_PRICING_CONFIG.addons.pleatedBlindPerM2)}/m²`;
const FROSTED_DIFF = tl(CELIKPEN_PRICING_CONFIG.glassOptions.alt_buzlu.extraPerM2);

export const BLOG_ARTICLES_PART_2: RawBlogPost[] = [
  /* ============================================================================
     9. BAHÇEŞEHİR VE BEYLİKDÜZÜ YÜKSEK KATLI BİNALARDA CAM BALKON GÜVENLİĞİ
     ============================================================================ */
  {
    slug: 'basaksehir-bahcesehir-beylikduzu-yuksek-katli-binalarda-cam-balkon-guvenligi',
    title: 'Bahçeşehir ve Beylikdüzü Yüksek Katlı Konutlarda Temperli ve Lamine Cam Balkon Güvenliği',
    seoTitle: 'Bahçeşehir & Beylikdüzü Yüksek Kat Cam Balkon Güvenliği | Çelikpen',
    metaDescription:
      'Başakşehir, Bahçeşehir, Ispartakule ve Beylikdüzü yüksek katlı sitelerinde EN 12210 rüzgâr yükü hesabı, 10 mm TSE EN 12150 temperli/lamine cam ve çocuk emniyet kilidi rehberi.',
    primaryKeyword: 'yüksek katlı binalarda cam balkon güvenliği',
    secondaryKeywords: [
      'bahçeşehir cam balkon fiyatları',
      'beylikdüzü ısıcamlı cam balkon',
      'temperli cam balkon kırılır mı',
      'cam balkon çocuk kilidi güvenliği',
    ],
    tags: [
      '#BahçeşehirCamBalkon',
      '#BeylikdüzüCamBalkon',
      '#YüksekKatGüvenliği',
      '#TemperliCam',
      '#EN12210',
    ],
    keywords: [
      'bahçeşehir cam balkon',
      'beylikdüzü cam balkon güvenliği',
      '10 mm temperli cam balkon',
      'ıspartakule cam balkon',
    ],
    category: 'Cam Teknolojisi',
    readTime: 11,
    publishDate: '2026-03-14',
    updatedDate: '2026-11-01',
    image: '/images/references/ref-7.jpg',
    imageAlt:
      'Başakşehir Bahçeşehir ve Beylikdüzü yüksek katlı konutlarda 10 mm temperli ve ısıcamlı güvenli cam balkon uygulaması',
    imageCaption:
      'Yüksek rakım ve rüzgâr koridorundaki Bahçeşehir, Ispartakule ve Beylikdüzü bloklarında EN 12210 C4 sınıfı rüzgâr kilitli cam balkon uygulaması.',
    imageTitle: 'Bahçeşehir ve Beylikdüzü Yüksek Katlı Binalarda Cam Balkon Statik Güvenlik Rehberi',
    excerpt:
      '10. kat ve üzerindeki Bahçeşehir, Ispartakule, Kayaşehir ve Beylikdüzü konutlarında rüzgâr emme kuvvetine karşı 10 mm temperli cam, çift yüzü temperli ısıcam ve emniyet kilidi standartları.',
    highlights: [
      `Yüksek Kat 10 mm Vera Pro: ${m2('vns_10mm')} | 28 mm Vera Termal Isıcam: ${m2('vbs_isicam')}`,
      'TSE EN 12150 ısıl temperleme ile normal cama göre 5 kat yüksek darbe direnci',
      'Fırtınada kanat açılmasını önleyen çelik pimli çocuk ve rüzgâr emniyet kilidi',
    ],
    relatedProductHref: '/bolgeler/basaksehir-cam-balkon',
    numberedChecklistTitle: 'Yüksek Katlı Rezidans ve Sitelerde 5 Maddelik Güvenlik Protokolü',
    numberedChecklist: [
      '6. kat ve üzerindeki dairelerde 8 mm tek cam yerine mutlaka 10 mm temperli (Vera Pro 10) veya 4+20+4 mm çift yüzü temperli ısıcam (Vera Termal) seçin.',
      'Kanat yüksekliği 210 cm’yi aşıyorsa her kanatta 8 bilyalı ağır hizmet tipi AISI 304 paslanmaz çelik rulman kullanıldığını doğrulayın.',
      'Alt ve üst alüminyum kasa profillerinin betonarme tavana/parapete 10 cm aralıklarla çelik dübel veya kimyasal dübel ile sabitlendiğini kontrol edin.',
      'Negatif rüzgâr emme (vakum) yüküne karşı kanatların raydan çıkmasını engelleyen güvenlik tırnaklı baza profili isteyin.',
      'Çocuklu ve evcil hayvanlı dairelerde anahtarlı çocuk emniyet kilidi ile yırtılmaz kedi tüllü sineklik entegrasyonunu unutmayın.',
    ],
    sections: [
      {
        id: 'yuksek-katlarda-ruzgar-yuku-ve-cam-kalinligi',
        heading: 'Bahçeşehir, Ispartakule ve Beylikdüzü’nde Kat Yüksekliğine Göre Cam Seçimi',
        paragraphs: [
          `[Başakşehir (Bahçeşehir, Ispartakule, Kayaşehir)](/bolgeler/basaksehir-cam-balkon) ve [Beylikdüzü](/bolgeler/beylikduzu-cam-balkon), İstanbul Avrupa Yakası’nın en yüksek rakımlı ve açık rüzgâr koridorlarına sahip iki bölgesidir. [TSE](https://www.tse.org.tr) EN 12210 standardına göre bina yüksekliği arttıkça cepheye etkiyen pozitif rüzgâr basıncı ve köşe bölgelerdeki negatif emme (vakum) kuvveti katlanarak artar.`,
          `Bu nedenle Çelikpen Mimari Mühendislik Ekibi olarak 1–5. kat arası korunaklı cephelerde 8 mm temperli cam (${m2('vns_8mm')}) uygularken; 6. kat ve üzerindeki açık cepheli dairelerde esneme (sehim) yapmayan **10 mm Şişecam Temperli Cam** (${m2('vns_10mm')}) veya toplam 8 mm temperli cam kütlesine ve 28 mm kesit rijitliğine sahip **4+20+4 mm Vera Termal Isıcam** (${m2('vbs_isicam')}) kullanıyoruz.`,
        ],
        table: {
          caption: 'Kat Yüksekliği ve Rüzgâr Bölgesine Göre Mühendislik Sistem Tablosu',
          headers: ['Kat Seviyesi', 'Rüzgâr Yükü (EN 12210)', 'Zorunlu / Önerilen Cam & Sistem', '2026 Net m² Fiyatı'],
          rows: [
            ['1. – 5. Kat (Ara Sokak)', '600 – 900 Pa (Sınıf B2)', `${SYSTEMS.vns_8mm.code} — 8 mm Temperli`, m2('vns_8mm')],
            ['6. – 14. Kat (Site Cephesi)', '1200 – 1600 Pa (Sınıf C3)', `${SYSTEMS.vns_10mm.code} — 10 mm Temperli`, m2('vns_10mm')],
            ['15. Kat+ & Vadi/Sahil Cephesi', '1800 – 2000 Pa (Sınıf C4)', `${SYSTEMS.vbs_isicam.code} — 4+20+4 İki Yüzü Temperli Isıcam`, m2('vbs_isicam')],
          ],
        },
        proTip: 'Yüksek katlarda camları dışarıdan silmek için sarkma riski yaratmayan, tüm kanatları balkonun içine doğru 90 derece katlanan sistemleri veya içeriden silinebilen vasistaslı giyotin sistemleri tercih edin.',
      },
    ],
    internalLinks: [
      {
        label: 'Başakşehir & Bahçeşehir Bölge Hizmetlerimiz',
        href: '/bolgeler/basaksehir-cam-balkon',
        context: 'Bahçeşehir, Ispartakule ve Kayaşehir sitelerindeki cam balkon referanslarımız.',
      },
      {
        label: 'Beylikdüzü Bölge Hizmetlerimiz',
        href: '/bolgeler/beylikduzu-cam-balkon',
        context: 'Yakuplu Marina, Gürpınar ve Adnan Kahveci mahallesi yüksek kat uygulamalarımız.',
      },
      {
        label: 'Yüksek Kat Cam Balkon Fiyat Hesaplama',
        href: '/fiyat-hesapla',
        context: '10 mm temperli ve 4+20+4 ısıcamlı sistemlerin m² maliyetini karşılaştırın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[3],
    ],
    infographic: {
      title: 'Temperli Güvenlik Camı vs Normal Düz Cam Darbe & Eğilme Direnci',
      subtitle: 'TSE EN 12150 ısıl işlem sonrası mekanik mukavemet artışı (MPa)',
      metricUnit: 'MPa Direnç',
      items: [
        {
          label: 'TSE EN 12150 Şişecam Temperli Güvenlik Camı (8 mm / 10 mm / Isıcam)',
          value: 120,
          displayValue: '120 MPa Eğilme Direnci (Normal Camdan 5 Kat Güçlü)',
          barPercent: 95,
          highlight: true,
        },
        {
          label: 'Temperli + PVB Lamine Güvenlik Camı (Kış Bahçesi Çatı & Korkuluk)',
          value: 140,
          displayValue: '140 MPa + Kırıldığında Dağılmayan PVB Film Tutuculuğu',
          barPercent: 100,
          highlight: true,
        },
        {
          label: 'Standart İşlemsiz (Temperlenmemiş) Düz Cam',
          value: 25,
          displayValue: '25 MPa (Cam Balkonda Kullanımı Kesinlikle Yasaktır)',
          barPercent: 22,
        },
      ],
      footnote: 'TSE EN 12150-1 ve EN 12600 sarkaç darbe güvenlik standartlarına göredir.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Yüksek katlarda cam balkon rüzgârdan düşer mi veya kırılır mı?',
        directAnswer:
          'Çelikpen tarafından EN 12210 standardında üretilen, 3 mm T66 alüminyum kasaya, çelik rulmanlara ve TSE EN 12150 Şişecam temperli cama sahip sistemler 2000 Pascal fırtına yüküne dayanıklıdır; raydan çıkma veya kırılma riski taşımaz.',
      },
    ],
    faqs: [
      {
        question: 'Temperli cam kırılırsa nasıl dağılır?',
        answer:
          'TSE EN 12150 temperli güvenlik camı, çok şiddetli noktasal darbeyle kırılması halinde keskin parçalar yerine otomobil camı gibi küçük, köşesiz taneciklere ayrılarak yaralanma riskini ortadan kaldırır.',
      },
      {
        question: '15. kattaki dairemde 8 mm cam balkon yaptırabilir miyim?',
        answer:
          'Mühendislik güvenliği açısından 6. kat ve üzerindeki açık cephelerde 8 mm yerine esneme yapmayan 10 mm temperli tek cam veya 28 mm (4+20+4) çift yüzü temperli ısıcam öneriyoruz.',
      },
      {
        question: 'Çocuk emniyet kilidi tüm cam balkonlara takılıyor mu?',
        answer:
          'Evet. Çelikpen’in tüm katlanır ve sürme cam balkon serilerinde çocuk emniyet kilidi ve rüzgâr sabitleme mekanizması standart güvenlik donanımı olarak sunulur.',
      },
      {
        question: 'Bahçeşehir ve Beylikdüzü’nde keşif için ne zaman gelebilirsiniz?',
        answer:
          'Avrupa Yakası gezici lazerli keşif araçlarımızla Bahçeşehir, Ispartakule, Kayaşehir ve Beylikdüzü’ne aynı gün ücretsiz keşif hizmeti veriyoruz.',
      },
    ],
  },

  /* ============================================================================
     10. EŞİKSİZ SÜRME CAM BALKON MU KATLANIR CAM BALKON MU? SEÇİM REHBERİ
     ============================================================================ */
  {
    slug: 'esiksiz-surme-cam-balkon-mu-katlanir-cam-balkon-mu-hangisi-kullanisli',
    slugAliases: [
      'katlanir-mi-esiksiz-surme-cam-balkon-mu',
      'esiksiz-surme-mi-katlanir-mi',
    ],
    title: 'Eşiksiz Sürme Cam Balkon mu Katlanır Sistem mi? Dar ve Geniş Balkonlar İçin Seçim Rehberi',
    seoTitle: 'Eşiksiz Sürme mi Katlanır Cam Balkon mu? 2026 Seçim Rehberi',
    metaDescription:
      'Dar balkonlar, L köşe balkonlar ve teraslar için eşiksiz sürme cam balkon ile katlanır cam balkon karşılaştırması: alan kazancı, perde kullanımı, yalıtım ve 2026 m² fiyatları.',
    primaryKeyword: 'eşiksiz sürme cam balkon mu katlanır cam balkon mu',
    secondaryKeywords: [
      'sürgülü cam balkon fiyatları 2026',
      'katlanır cam balkon mu sürgülü mü',
      'dar balkon için cam balkon',
      'ısıcamlı sürme cam balkon',
    ],
    tags: [
      '#EşiksizSürmeCamBalkon',
      '#KatlanırCamBalkon',
      '#SürgülüCamBalkon',
      '#DarBalkonÇözümleri',
      '#WinsaVeraSlide',
    ],
    keywords: [
      'eşiksiz sürme cam balkon mu katlanır mı',
      'sürgülü cam balkon kullanışlı mı',
      'vera slide eşiksiz sürme',
      'ısıcamlı sürme cam balkon fiyatları',
    ],
    category: 'Sürme Sistemler',
    readTime: 10,
    publishDate: '2026-03-20',
    updatedDate: '2026-11-01',
    image: '/images/blog/katlanir-mi-esiksiz-surme-mi.jpg',
    imageAlt:
      'Eşiksiz sürme cam balkon ile katlanır cam balkon sisteminin balkon alanı kullanımı karşılaştırması',
    imageCaption:
      'Kanatların içeriye açılmadığı, masa ve tül perde kullanımını kolaylaştıran Winsa Vera Slide eşiksiz sürme cam balkon sistemi.',
    imageTitle: 'Eşiksiz Sürme Cam Balkon vs Katlanır Cam Balkon Karşılaştırma Rehberi',
    excerpt:
      'Balkonunuzda masa-sandalye ve tül perde kullanırken kanatların içeriye çarpmasını istemiyorsanız eşiksiz sürme; cephenin %100 açılmasını istiyorsanız katlanır sistem analizimiz.',
    highlights: [
      `Eşiksiz Sürme (8/10 mm): ${m2('vds_surme')} | Isıcamlı Sürme: ${m2('vds_isicamli')}`,
      `Katlanır Sistem (8 mm): ${m2('vns_8mm')} | Isıcamlı Katlanır: ${m2('vbs_isicam')}`,
      'Eşiksiz sürme sistemde içe kanat açılma payı 0 cm — dar balkonlarda maksimum alan',
    ],
    relatedProductHref: '/hizmetlerimiz/surme-cam-balkon',
    numberedChecklistTitle: 'Sürme mi Katlanır mı? 5 Soruda Balkonunuza Doğru Sistemi Seçin',
    numberedChecklist: [
      'Balkon derinliğiniz 130 cm’den dar ise içeriye kanat açılma payı gerektirmeyen Eşiksiz Sürme (Vera Slide) seçin.',
      'Balkonunuzda L veya U şeklinde köşe dönüşü varsa ve köşenin tamamen açılmasını istiyorsanız Katlanır Sistem seçin.',
      'Zeminden tavana kadar (zemin kat / teras) engelsiz kapı geçişi gerekiyorsa 8 mm pahlı Eşiksiz Sürme tercih edin.',
      'Üst katlarda dış camları balkon içinden kolayca silmek birinci önceliğinizse tüm kanatları içe açılan Katlanır Sistem seçin.',
      'Maksimum kış ısı yalıtımı arıyorsanız her iki sistemin de 4+20+4 mm Argonlu Isıcamlı versiyonunu tercih edin.',
    ],
    sections: [
      {
        id: 'alan-kullanimi-perde-ve-temizlik-karsilastirmasi',
        heading: 'Kullanım Pratiği: Mobilya Yerleşimi, Tül Perde ve Cam Temizliği',
        paragraphs: [
          `[Katlanır Cam Balkon](/hizmetlerimiz/katlanir-cam-balkon) sistemlerinde kanatlar bir ray boyunca kayarak balkonun köşesine gelir ve içeriye doğru (yaklaşık 55–65 cm) kitap sayfası gibi katlanır. Bu sayede balkon cephesinin %95’i tamamen açılır ve dış camların tamamı balkon içinden güvenle silinebilir. Ancak kanatların katlandığı köşede masa, dolap veya saksı bulundurulamaz ve kornişli tül perde kullanıldığında perdeyi kenara çekmek gerekir.`,
          `[Sürme Cam Balkon](/hizmetlerimiz/surme-cam-balkon) (**Winsa Vera Slide** & **Albert Genau SlideMaster**) sistemlerinde ise kanatlar 3 veya 5 raylı alüminyum kasa üzerinde birbirinin arkasına paralel kayarak toplanır. İçeriye doğru 1 santimetre bile kanat çıkıntısı oluşmaz; masa, sandalye ve tül perdeniz kanatlara hiç değmeden kullanılır.`,
        ],
        table: {
          caption: 'Eşiksiz Sürme vs Katlanır Cam Balkon Mühendislik Karşılaştırması',
          headers: ['Karşılaştırma Kriteri', 'Eşiksiz Sürme Cam Balkon', 'Katlanır Cam Balkon'],
          rows: [
            ['İçe Kanat Açılma Payı', '0 cm (İçeriye hiç açılmaz, rayda kayar)', '55 – 65 cm (Köşede içeriye katlanır)'],
            ['Dar Balkonlarda Mobilya Kullanımı', 'Mükemmel (Masa ve koltuklara çarpmaz)', 'Toplanma köşesi boş bırakılmalıdır'],
            ['Maksimum Cephe Açıklığı', '%66 – %80 (3 veya 5 raylı sisteme göre)', '%95 (Tüm kanatlar köşeye toplanır)'],
            ['Zemin Eşik Yüksekliği', '8 mm Engelsiz Pahlı Eşiksiz Alt Ray', 'Damlalık Kasa (Parapet üstü için ideal)'],
            ['2026 Net m² Fiyatı (Tek Cam / Isıcam)', `${m2('vds_surme')} / ${m2('vds_isicamli')}`, `${m2('vns_8mm')} / ${m2('vbs_isicam')}`],
          ],
        },
        proTip: 'Sürme cam balkonlarda klasik kıl fitilli sistemler yerine kanatların birbirini alüminyum kenet profiliyle yakaladığı "kenetli ısıcamlı sürme" serimizi tercih ederek katlanır sistem kalitesinde rüzgâr sızdırmazlığı elde edebilirsiniz.',
      },
    ],
    internalLinks: [
      {
        label: 'Sürme Cam Balkon Hizmet Detayları',
        href: '/hizmetlerimiz/surme-cam-balkon',
        context: 'Eşiksiz ve ısıcamlı sürme cam balkon modellerimiz ve ray seçenekleri.',
      },
      {
        label: 'Katlanır Cam Balkon Hizmet Detayları',
        href: '/hizmetlerimiz/katlanir-cam-balkon',
        context: '8 mm, 10 mm ve 4+20+4 ısıcamlı katlanır cam balkon sistemlerimiz.',
      },
      {
        label: 'Sürme vs Katlanır Fiyat Hesapla',
        href: '/fiyat-hesapla',
        context: 'Balkon ölçünüze göre sürme ve katlanır sistem fiyatlarını anında karşılaştırın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[2],
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[0],
    ],
    infographic: {
      title: 'Balkon Tipine Göre Kullanıcı Memnuniyet Oranları',
      subtitle: '15.000+ Çelikpen saha uygulamasında balkon geometrisine göre tercih dağılımı',
      metricUnit: '% Tercih & Uyum',
      items: [
        {
          label: 'Dar & Uzun Balkonlar + Zemin Teraslar: Eşiksiz Sürme (Vera Slide)',
          value: 94,
          displayValue: '%94 Alan Kazancı & Engelsiz Geçiş Memnuniyeti',
          barPercent: 94,
          highlight: true,
        },
        {
          label: 'L / U Köşe Balkonlar & Yüksek Katlar: Katlanır Sistem (Vera Termal)',
          value: 96,
          displayValue: '%96 Tam Açılım & Kolay İçeriden Cam Silme',
          barPercent: 96,
          highlight: true,
        },
      ],
      footnote: 'Çelikpen İstanbul Avrupa Yakası saha montaj verilerine dayanmaktadır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Dar balkonlar için katlanır cam balkon mu sürgülü cam balkon mu daha kullanışlı?',
        directAnswer:
          'Derinliği dar olan balkonlarda kanatlar içeriye açılmadığı ve masa-sandalye alanını daraltmadığı için eşiksiz sürme (sürgülü) cam balkon çok daha kullanışlıdır.',
      },
    ],
    faqs: [
      {
        question: 'Sürme cam balkon üst katlarda dışarıdan nasıl temizlenir?',
        answer:
          'Sürme sistemlerde kanatlar yan yana kaydığı için her kanat aralandığında dış yüzeyine kol mesafesinden veya mıknatıslı/teleskopik cam silme aparatlarıyla kolayca ulaşılabilir.',
      },
      {
        question: 'Eşiksiz sürme cam balkon yağmurda içeri su alır mı?',
        answer:
          'Dışa eğimli basamaklı alt ray tasarımı ve dış tahliye kanalları sayesinde yağmur suyu iç ray hattına geçmeden dışarı deşarj edilir.',
      },
      {
        question: 'Sürme cam balkona sineklik takılabilir mi?',
        answer:
          'Evet. Sürme cam balkon kasasının iç rayına entegre sürme kedi sinekliği veya akordeon plise sineklik sorunsuz şekilde monte edilir.',
      },
      {
        question: 'Isıcamlı sürme cam balkon var mı?',
        answer: `Evet. 4+12+4 veya 4+20+4 mm argon gazlı temperli ısıcam kullanılan Isıcamlı Sürme (${m2('vds_isicamli')}) serimiz hem sıfır kanat açılma payı hem de yüksek kış yalıtımı sunar.`,
      },
    ],
  },

  /* ============================================================================
     11. KAFE VE RESTORANLAR İÇİN MOTORLU GİYOTİN CAM VE ROLLING ROOF MALİYETLERİ
     ============================================================================ */
  {
    slug: 'kafe-ve-restoranlar-icin-motorlu-giyotin-cam-ve-rolling-roof-maliyetleri',
    title: 'Kafe, Restoran ve Ticari Mekanlar İçin Uzaktan Kumandalı Giyotin Cam ve Rolling Roof Çözümleri',
    seoTitle: 'Kafe & Restoran Motorlu Giyotin Cam ve Bioklimatik Pergola 2026',
    metaDescription:
      'İstanbul Avrupa Yakası kafe, restoran, otel ve ticari işletmeler için Somfy motorlu giyotin cam, bioklimatik pergola (Rolling Roof) sistemleri ve 2026 m² fiyatları.',
    primaryKeyword: 'kafe restoran motorlu giyotin cam bioklimatik pergola',
    secondaryKeywords: [
      'kafe cam kapama sistemleri fiyatları',
      'restoran kış bahçesi maliyeti',
      'rolling roof bioklimatik tavan',
      'otomatik giyotin cam sistemleri',
    ],
    tags: [
      '#KafeRestoranCam',
      '#MotorluGiyotinCam',
      '#RollingRoof',
      '#BioklimatikPergola',
      '#TicariMekanKapatma',
    ],
    keywords: [
      'kafe giyotin cam fiyatları',
      'restoran bioklimatik pergola',
      'ticari kış bahçesi sistemleri',
      'kumandalı giyotin cam',
    ],
    category: 'Giyotin & Teras',
    readTime: 11,
    publishDate: '2026-03-26',
    updatedDate: '2026-11-01',
    image: '/images/references/ref-10.jpg',
    imageAlt:
      'Kafe ve restoran dış mekanlarında Somfy motorlu giyotin cam ve bioklimatik pergola (Rolling Roof) uygulaması',
    imageCaption:
      'Ticari işletmelerin bahçe ve teras cirosunu 12 aya çıkaran uzaktan kumandalı motorlu giyotin cam ve bioklimatik açılır tavan entegrasyonu.',
    imageTitle: 'Kafe ve Restoranlar İçin Motorlu Giyotin Cam & Bioklimatik Tavan Rehberi',
    excerpt:
      'Beşiktaş, Bakırköy, Şişli, Sarıyer, Başakşehir ve Basın Ekspres hattındaki kafe, restoran ve otellerde açık alanları 4 mevsim gelir getiren salona dönüştüren giyotin cam ve bioklimatik pergola çözümleri.',
    highlights: [
      `Ticari Motorlu Giyotin Cam: ${m2('vgs_giyotin')} | Bioklimatik Pergola: ${m2('pergola')}`,
      'Tek kumandayla 10 saniyede açık terastan tam yalıtımlı kış salonuna geçiş',
      'Sigara yönetmeliğine uygun %100 açılır tavan ve dikey cam cephe kombinasyonu',
    ],
    relatedProductHref: '/hizmetlerimiz/giyotin-cam-sistemleri',
    numberedChecklistTitle: 'Ticari İşletme (Kafe / Restoran) Kapamalarında 5 Yatırım Kriteri',
    numberedChecklist: [
      'Açık alan mevzuatına tam uyum için hem tavanın (Bioklimatik Pergola) hem de yan cephelerin (Giyotin Cam) motorlu açılır yapıda olmasını sağlayın.',
      'Yoğun ticari kullanımda günde puluhan kez açılıp kapanacak giyotin panellerde ağır hizmet çelik zincir ve Somfy/Becker motor tercih edin.',
      'Kışın dış ortam ısıtıcılarının (radyant/klima) enerjisini içeride tutmak için 4+16+4 mm argonlu Şişecam Sinerji/Konfor ısıcam kullanın.',
      'Giriş-çıkış kapılarında garson ve müşteri trafiğini aksatmayan fotoselli kayar kapı veya eşiksiz sürme sistem planlayın.',
      'Elektrostatik toz boyada işletmenizin kurumsal kimliğine uygun Antrasit, Mat Siyah veya özel RAL rengi seçin.',
    ],
    sections: [
      {
        id: 'ticari-mekanlarda-yatirim-geri-donusu-roi',
        heading: 'Kafe ve Restoranlarda Giyotin Cam & Bioklimatik Tavan Yatırım Geri Dönüşü',
        paragraphs: [
          `İstanbul’da bahçe veya teras alanı bulunan bir kafe ya da restoran, açık alanını kapatmadığında yılın yaklaşık 160 yağışlı ve soğuk gününde masa kapasitesinin %50’sini kaybeder. [Motorlu Giyotin Cam](/hizmetlerimiz/giyotin-cam-sistemleri) (${m2('vgs_giyotin')}) ve [Bioklimatik Pergola / Rolling Roof](/hizmetlerimiz/bioklimatik-pergola) (${m2('pergola')}) kombinasyonu, dış mekânı tek tuşla saniyeler içinde sıcak ve rüzgârsız bir kış bahçesine dönüştürür.`,
          `Yaz akşamlarında veya güneşli havalarda ise tavan lamelleri geriye toplanır, giyotin camlar masa hizasına (110 cm korkuluk seviyesine) iner ve müşterileriniz tamamen açık havada oturma deneyimi yaşar. İşletme yatırım maliyetini ilk kış sezonundaki masa cirosu artışıyla amorti eder.`,
        ],
        table: {
          caption: 'Ticari Mekan (Kafe, Restoran, Otel) Cephe & Tavan Çözümleri',
          headers: ['Sistem Çözümü', 'Kullanım Alanı', 'Otomasyon & Yalıtım', '2026 Net m² Fiyatı'],
          rows: [
            ['Motorlu Giyotin Cam (Vera Vertical)', 'Cadde & Bahçe Cepheleri', 'Somfy RTS Motor + 4+16+4 Argonlu Isıcam', m2('vgs_giyotin')],
            ['Bioklimatik Pergola (Rolling Roof)', 'Teras & Bahçe Tavanı', '0°-135° Döner/Toplanır Lamel + Samsung LED', m2('pergola')],
            ['Eşiksiz Isıcamlı Sürme (SlideMaster)', 'Giriş & Yürüyüş Yolu Cephesi', 'Engelsiz Sıfır Eşik + Kenetli Kilit', m2('vds_isicamli')],
          ],
        },
        proTip: 'Birden fazla giyotin modülü olan restoran cephelerinde "çok kanallı grup kumanda" kullanarak 10 ayrı cam cepheyi tek tuşla aynı anda veya rüzgâr yönüne göre tek tek kontrol edebilirsiniz.',
      },
    ],
    internalLinks: [
      {
        label: 'Motorlu Giyotin Cam Sistemleri',
        href: '/hizmetlerimiz/giyotin-cam-sistemleri',
        context: 'Kafe ve restoran cepheleri için uzaktan kumandalı giyotin cam teknik özellikleri.',
      },
      {
        label: 'Bioklimatik Pergola & Tavan Sistemleri',
        href: '/hizmetlerimiz/bioklimatik-pergola',
        context: 'Gizli su tahliyeli ve LED aydınlatmalı motorlu alüminyum tavan çözümleri.',
      },
      {
        label: 'Ticari Proje m² Fiyat Hesaplama',
        href: '/fiyat-hesapla',
        context: 'İşletmenizin cephe ve tavan ölçülerine göre anında bütçe oluşturun.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[2],
    ],
    infographic: {
      title: 'Ticari Mekanlarda Dört Mevsim Masa Kapasitesi ve Enerji Verimliliği',
      subtitle: 'Giyotin cam ve bioklimatik pergola uygulaması sonrası işletme kazanımları',
      metricUnit: '% Artış / Tasarruf',
      items: [
        {
          label: 'Yıllık Dış Mekan Masa Kullanım Süresi (365 Gün Aktif Ciro)',
          value: 100,
          displayValue: '%100 Yıl Boyu Kesintisiz Masa Kapasitesi',
          barPercent: 100,
          highlight: true,
        },
        {
          label: 'Dış Mekan Isıtıcı (Radyant / Doğalgaz) Enerji Tasarrufu',
          value: 68,
          displayValue: '%68 Isıtma Maliyeti Tasarrufu (4+16+4 Isıcam Sayesinde)',
          barPercent: 78,
          highlight: true,
        },
      ],
      footnote: 'İstanbul Avrupa Yakası ticari işletme projelerimizin saha verilerine dayanmaktadır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Kafe ve restoranlar için motorlu giyotin cam metrekare fiyatı ne kadar?',
        directAnswer: `2026 yılında Somfy veya Becker motorlu, 4+16+4 mm argonlu temperli ısıcamlı giyotin cam sistemlerimizin anahtar teslim metrekare fiyatı ${m2('vgs_giyotin')}, bioklimatik pergola tavan fiyatı ise ${m2('pergola')} seviyesindedir.`,
      },
    ],
    faqs: [
      {
        question: 'İşletmemiz açıkken montaj yapılabilir mi, iş kaybı yaşar mıyız?',
        answer:
          'Kocasinan Merkez fabrikamızda tüm modüller hazır toplanmış olarak sevk edildiği için işletmenizin kapalı olduğu sabah saatlerinde veya tek iş günü içinde hızlı montaj yapılarak ciro kaybı önlenir.',
      },
      {
        question: 'Giyotin camlarda işletme logosu veya kumlama şerit uygulanabilir mi?',
        answer:
          'Evet. Sabit alt küpeşte camlarına işletmenizin kurumsal logosu CNC kumlama veya UV baskı ile işlenebilir.',
      },
      {
        question: 'Kurumsal fatura ve ticari garanti kapsamı nasıldır?',
        answer:
          'Tüm ticari projelerimiz %100 kurumsal faturalı, resmi sözleşmeli, 5 yıl motor ve 10 yıl mekanik sistem garantili olarak teslim edilir.',
      },
      {
        question: 'Avrupa Yakası’nda ticari keşif aynı gün yapılıyor mu?',
        answer:
          'Evet. Beşiktaş, Bakırköy, Şişli, Sarıyer, Başakşehir, Beylikdüzü ve Basın Ekspres dahil tüm Avrupa Yakası’nda aynı gün ücretsiz mimari keşif ve 3D projelendirme sunuyoruz.',
      },
    ],
  },

  /* ============================================================================
     12. CAM BALKONDA SU ALMA VE RÜZGAR SESİ NEDEN OLUR? İZOLASYON ÇÖZÜMLERİ
     ============================================================================ */
  {
    slug: 'cam-balkonda-su-alma-ve-ruzgar-sesi-neden-olur-izolasyon-cozumleri',
    slugAliases: ['cam-balkon-montaj-sonrasi-bakim-rehberi'],
    title: 'Cam Balkon Neden Su Alır veya Rüzgar Sesi Yapar? EPDM Conta ve Alüminyum Fitil Rehberi',
    seoTitle: 'Cam Balkon Neden Su Alır ve Rüzgar Sesi Yapar? Kesin Çözüm 2026',
    metaDescription:
      'Cam balkondan su sızması ve rüzgârda ıslık sesi neden olur? Plastik fitil yerine alüminyum mıknatıslı EPDM conta, eğimli damlalık kasa ve fırtına tahliye kanalı rehberi.',
    primaryKeyword: 'cam balkon neden su alır rüzgar sesi yapar',
    secondaryKeywords: [
      'cam balkon su sızdırmazlık',
      'cam balkon alüminyum fitil',
      'cam balkon rüzgar ıslık sesi çözümü',
      'epdm conta cam balkon',
    ],
    tags: [
      '#CamBalkonSuAlma',
      '#RüzgarSesiÇözümü',
      '#AlüminyumFitil',
      '#EPDMConta',
      '#Balkonİzolasyonu',
    ],
    keywords: [
      'cam balkon neden su alır',
      'cam balkon rüzgar sesi',
      'cam balkon fitil değişimi',
      'su almayan cam balkon',
    ],
    category: 'Cam Balkon',
    readTime: 10,
    publishDate: '2026-04-02',
    updatedDate: '2026-11-01',
    image: '/images/products/siyavuspasa-vera-katlanir-cam-balkon.jpg',
    imageAlt:
      'Su almayan ve rüzgar sesi yapmayan alüminyum mıknatıslı fitilli ve EPDM contalı cam balkon detayı',
    imageCaption:
      'Sararan plastik fitiller yerine kullanılan alüminyum mıknatıslı fitiller, çift sıra EPDM conta ve eğimli damlalık tahliye kasası.',
    imageTitle: 'Cam Balkonda Su Alma ve Rüzgâr Sesi Sorunlarına Mühendislik Çözümleri',
    excerpt:
      'Fırtınalı havalarda cam balkondan içeri yağmur suyu sızmasının ve rüzgâr ıslığının 4 temel mühendislik nedeni: plastik fitil deformasyonu, damlalıksız kasa, yanlış mastik ve rulman ayarsızlığı.',
    highlights: [
      'Şeffaf plastik fitil yerine %100 UV dayanımlı alüminyum + mıknatıslı EPDM conta',
      'Eğimli damlalık kasa ve tek yönlü fırtına valfli su tahliye kanalları',
      'Antibakteriyel nötr dış cephe mastiği ve lazer terazili milimetrik montaj',
    ],
    relatedProductHref: '/hizmetlerimiz/isicamli-cam-balkon',
    numberedChecklistTitle: 'Su ve Rüzgâr Sızdırmazlığı İçin 5 Maddelik Montaj Kontrol Listesi',
    numberedChecklist: [
      'Kanat birleşimlerinde 6 ayda güneşte sararıp kırılan şeffaf PVC fitil yerine alüminyum gövdeli EPDM/mıknatıslı fitil kullanıldığını doğrulayın.',
      'Alt kasa profilinin iç kısmında yoğuşma ve yağmur suyunu toplayıp dışarı atan "damlalık oluğu" bulunduğunu kontrol edin.',
      'Su tahliye deliklerinin rüzgârın suyu geri tepmesini önleyen kademeli (şaşırtmalı) açıldığını teyit edin.',
      'Kasa ile parapet mermeri arasında ucuz akrilik silikon yerine poliüretan sosis mastik ve nötr silikon kullanıldığından emin olun.',
      'Yan dikme profillerinde çift sıra antibakteriyel fırça + EPDM conta bariyeri bulunduğunu inceleyin.',
    ],
    sections: [
      {
        id: 'cam-balkon-neden-su-alir-ve-islik-sesi-yapar',
        heading: 'Cam Balkonlarda Su Sızması ve Rüzgâr Islığının 4 Teknik Nedeni',
        paragraphs: [
          `Kullanıcıların cam balkon sistemlerinde en çok şikâyet ettiği iki sorun; sağanak yağışta içeriye su girmesi ve rüzgârlı havalarda kanat aralarından ıslık sesi gelmesidir. [TSE](https://www.tse.org.tr) EN 12208 (Su Sızdırmazlığı) ve EN 12207 (Hava Geçirimsizliği) standartlarına göre incelendiğinde bu sorunların nedeni cam balkonun doğası değil, düşük kaliteli profil ve işçilik hatalarıdır.`,
          `Birinci neden **şeffaf plastik (H) fitillerdir**; güneşin UV ışınlarıyla 1 yıl içinde sertleşip büzüşen plastik fitiller kanatlar arasında 2–3 mm boşluk bırakır ve rüzgâr bu boşluktan geçerken düdük gibi ıslık sesi çıkarır. Çelikpen’in tüm [Katlanır](/hizmetlerimiz/katlanir-cam-balkon) ve [Isıcamlı Cam Balkon](/hizmetlerimiz/isicamli-cam-balkon) serilerinde plastik fitil kesinlikle kullanılmaz; bunun yerine birbirine kenetlenen **alüminyum + EPDM mıknatıslı fitiller** kullanılır.`,
        ],
        table: {
          caption: 'Standart Piyasa İşi vs Çelikpen EN 12208 Sızdırmazlık Mühendisliği',
          headers: ['Sızdırmazlık Noktası', 'Standart Piyasa Uygulaması (Sorunlu)', 'Çelikpen Mühendislik Standardı (Kesin Çözüm)'],
          rows: [
            ['Kanat Arası Fitiller', 'Şeffaf Plastik Fitil (Sararır, rüzgâr ve su alır)', 'Alüminyum Gövdeli EPDM & Mıknatıslı Fitil'],
            ['Alt Kasa Profili', 'Düz Kasa (Yağmur suyu balkon içine taşar)', '5° Eğimli Damlalık Kasa + Gizli Tahliye Oluğu'],
            ['Mermer / Duvar Birleşimi', 'Akvaryum Silikonu (1 yılda çatlar ve açılır)', 'Poliüretan Sosis Mastik + UV Nötr Cephe Silikonu'],
            ['Rulman & Terazi Ayarı', 'Su Terazisi (Kanatlar kasar, tam kapanmaz)', '3D Lazer Terazi + Eksantrik Ayarlı 8 Bilyalı Rulman'],
          ],
        },
        proTip: 'Mevcut cam balkonunuzda sonbahar öncesi alt kasa içindeki su tahliye deliklerini elektrikli süpürge ve ince bir fırçayla toz/yaprak birikintilerinden temizlemek, kış fırtınalarında suyun hızla deşarj edilmesini sağlar.',
      },
    ],
    internalLinks: [
      {
        label: 'Sızdırmaz Isıcamlı Cam Balkon Sistemlerimiz',
        href: '/hizmetlerimiz/isicamli-cam-balkon',
        context: 'EPDM contalı ve damlalık kasalı Vera Termal ve Tiara Twinmax detayları.',
      },
      {
        label: 'Sistem Karşılaştırma Tablosu',
        href: '/karsilastir',
        context: 'Tüm cam balkon serilerimizin su, rüzgâr ve ses yalıtım sınıflarını karşılaştırın.',
      },
      {
        label: 'Ücretsiz Keşif & Fiyat Hesaplama',
        href: '/fiyat-hesapla',
        context: '10 yıl sızdırmazlık garantili cam balkon fiyatlarını anında hesaplayın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[3],
      COMMON_EXTERNAL_AUTHORITIES[2],
    ],
    infographic: {
      title: 'Fitil ve Conta Tipine Göre 10 Yıllık Sızdırmazlık Ömrü',
      subtitle: 'UV güneş ışınları ve kış donlarına karşı malzeme dayanımı',
      metricUnit: '% Sızdırmazlık Koruma',
      items: [
        {
          label: 'Alüminyum Mıknatıslı Fitil + Çift Sıra EPDM Kauçuk Conta',
          value: 98,
          displayValue: '%98 Sızdırmazlık (10+ Yıl Sararmaz, Çatlamaz)',
          barPercent: 98,
          highlight: true,
        },
        {
          label: 'Alüminyum Kıl Fitilli Kenetli Profil',
          value: 86,
          displayValue: '%86 Hava ve Toz Bariyeri',
          barPercent: 86,
        },
        {
          label: 'Şeffaf Plastik (PVC) Ara Fitil',
          value: 25,
          displayValue: '%25 (6-12 Ay İçinde Sararır ve Rüzgâr Sesi Yapar)',
          barPercent: 25,
        },
      ],
      footnote: 'EN 12207 hava geçirimsizliği ve EN 12208 su sızdırmazlığı yaşlandırma testlerine göredir.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Cam balkon rüzgârda neden ıslık sesi çıkarır ve nasıl çözülür?',
        directAnswer:
          'Rüzgâr ıslığı, kanatlar arasındaki plastik fitillerin zamanla büzüşmesi veya kasa birleşimlerindeki silikon boşluklarından kaynaklanır. Plastik fitillerin alüminyum EPDM contalı fitillerle değiştirilmesiyle ses tamamen kesilir.',
      },
    ],
    faqs: [
      {
        question: 'Alüminyum fitil manzarayı kapatır mı?',
        answer:
          'Hayır. İnce kesitli (minimalist) alüminyum fitiller profil renginizle (antrasit, siyah, bronz) birebir aynı renkte üretilir ve şeffaf plastik fitillerin sararmış görüntüsünden çok daha estetik durur.',
      },
      {
        question: 'Eğimli damlalık kasa suyun içeri girmesini nasıl engeller?',
        answer:
          'Şiddetli fırtınada kanat süzüntüsünden alt kasaya inen su damlaları, kasa içindeki 5 derece dışa eğimli kanalda toplanır ve dış cephedeki tahliye deliklerinden balkon dışına atılır.',
      },
      {
        question: 'Çelikpen montajlarında su sızdırmazlık garantisi var mı?',
        answer:
          'Evet. Tüm cam balkon, kış bahçesi ve PVC doğrama montajlarımızda poliüretan dış cephe izolasyonu ve 10 yıl yazılı sistem/sızdırmazlık garantisi sunuyoruz.',
      },
      {
        question: 'Balkon duvarında mantolama varsa su sızmasını önlemek için ne yapılır?',
        answer:
          'Mantolama (EPS/taşyünü) yüzeylerde suyun mantolama arkasından sızmaması için kasa birleşimine alüminyum köşebent ve çift kademeli poliüretan mastik bariyeri uygulanır.',
      },
    ],
  },

  /* ============================================================================
     13. ŞİŞECAM KONFOR CAM VE ISICAM SİNERJİ NEDİR? ENERJİ TASARRUFU HESABI
     ============================================================================ */
  {
    slug: 'sisecam-konfor-cam-ve-isicam-sinerji-nedir-enerji-tasarrufu-hesabi',
    slugAliases: [
      'sisecam-isicam-sinerji-ve-konfor-cam-secimi',
      'argon-gazli-isicam-ses-ve-isi-yalitimi',
    ],
    title: 'Şişecam Isıcam Konfor ve Sinerji Nedir? Kışın Isı Kaybını %70 Azaltan Cam Teknolojileri',
    seoTitle: 'Şişecam Isıcam Konfor ve Sinerji Nedir? Enerji Tasarrufu 2026',
    metaDescription:
      'Şişecam Isıcam Sinerji (Low-E) ve Isıcam Konfor (Solar Low-E) arasındaki fark nedir? Ug değeri, güneş faktörü (g), argon gazı ve cephe yönüne göre cam seçimi.',
    primaryKeyword: 'şişecam konfor cam ve ısıcam sinerji nedir',
    secondaryKeywords: [
      'ısıcam konfor mu sinerji mi',
      'low-e cam nedir',
      'argon gazlı ısıcam özellikleri',
      'cam balkon güneş kontrol camı',
    ],
    tags: [
      '#ŞişecamKonfor',
      '#IsıcamSinerji',
      '#LowETeknolojisi',
      '#EnerjiTasarrufu',
      '#CamTeknolojisi',
    ],
    keywords: [
      'şişecam konfor cam nedir',
      'ısıcam sinerji farkı',
      'güneş kontrol camı',
      '4+20+4 konfor ısıcam',
    ],
    category: 'Cam Teknolojisi',
    readTime: 11,
    publishDate: '2026-04-08',
    updatedDate: '2026-11-01',
    image: '/images/blog/sisecam-isicam-secimi.jpg',
    imageAlt:
      'Şişecam Isıcam Konfor (Solar Low-E) ve Isıcam Sinerji (Low-E) katman yapısı ve ısı yansıtma prensibi',
    imageCaption:
      'Kışın oda ısısını içeri geri yansıtan, yazın güneşin yakıcı kızılötesi radyasyonunu dışarıda tutan Şişecam Isıcam Konfor teknolojisi.',
    imageTitle: 'Şişecam Isıcam Konfor ve Sinerji Teknik Karşılaştırması & Cephe Seçim Rehberi',
    excerpt:
      'Isıcamlı cam balkon ve Winsa PVC pencerelerde kullanılan Şişecam Isıcam Sinerji (Low-E) ile Isıcam Konfor (Solar Low-E) kaplamalarının ışık geçirgenliği, güneş faktörü ve fatura tasarrufu hesabı.',
    highlights: [
      'Ug = 1.1 W/(m²K) ile klasik çift cama göre %50, tek cama göre %72 daha az ısı kaybı',
      'Isıcam Konfor ile yazın güneş ısısı girişinde %40 azalma (Klima tasarrufu)',
      'Kuzey cepheye Sinerji, Güney ve Batı cepheye Konfor cam mühendislik kuralı',
    ],
    relatedProductHref: '/hizmetlerimiz/isicamli-cam-balkon',
    numberedChecklistTitle: 'Cephe Yönünüze Göre Doğru Şişecam Kombinasyonu Seçim Rehberi',
    numberedChecklist: [
      'Güney, Güneybatı ve Batı cepheli balkonlarda hem kış yalıtımı hem yaz güneş kontrolü için Şişecam Isıcam Konfor (Solar Low-E) seçin.',
      'Kuzey ve Kuzeydoğu cepheli, az güneş alan serin balkonlarda kış güneşinden maksimum faydalanmak için Şişecam Isıcam Sinerji (Low-E) tercih edin.',
      'Cam balkon uygulamalarında her iki plakanın da TSE EN 12150 temperli güvenlik camı olarak üretildiğini doğrulayın.',
      'Ara boşluğun kuru hava yerine ısı iletimini %20 daha fazla düşüren Argon gazı ile doldurulduğunu kontrol edin.',
      'Karşı bina mesafesi yakın olan bitişik nizam sokaklarda alt %40 kumlama (buzlu) veya füme/bronz reflekte Konfor opsiyonunu değerlendirin.',
    ],
    sections: [
      {
        id: 'isicam-sinerji-ve-isicam-konfor-teknik-farki',
        heading: 'Isıcam Sinerji (Low-E) ile Isıcam Konfor (Solar Low-E) Arasındaki Fark Nedir?',
        paragraphs: [
          `[Şişecam](https://www.sisecam.com.tr) tarafından geliştirilen **Isıcam Sinerji** ve **Isıcam Konfor**, cam yüzeyine vakumlu ortamda mikroskobik metal oksit katmanlar kaplanarak üretilen yüksek teknolojili yalıtım camlarıdır. Her iki camın da kışın içerideki ısıyı koruma performansı ($U_g = 1,1\text{ W/m}^2\text{K}$ — argon gazlı) birebir aynıdır ve [İZODER](https://www.izoder.org.tr) standartlarında üst sınıf ısı yalıtımı sağlar.`,
          `İkisi arasındaki temel fark **yaz güneş ısısı kontrolüdür (g-değeri)**. **Isıcam Sinerji** kış güneşinin ısı enerjisinin %71’ini içeri alarak evin doğal ısınmasına yardımcı olur (Kuzey cepheler için idealdir). **Isıcam Konfor** ise çift fonksiyonlu Solar Low-E kaplaması sayesinde kışın içerideki ısıyı dışarı kaçırmazken, yazın güneşin yakıcı ısısını %40 oranında dışarı geri yansıtır (Güney ve Batı cepheler ile kış bahçeleri için vazgeçilmezdir).`,
        ],
        table: {
          caption: 'Tek Cam, Klasik Çift Cam, Isıcam Sinerji ve Isıcam Konfor Laboratuvar Değerleri (EN 1279)',
          headers: ['Cam Ünitesi (4+20+4 Argon)', 'Isı Geçirgenliği (Ug)', 'Güneş Faktörü (g)', 'Işık Geçirgenliği', 'İdeal Cephe Yönü'],
          rows: [
            ['8 mm Standart Tek Cam', '5,8 W/(m²K)', '%82 (Güneş ısısını geçirir)', '%88', 'Yalnızca Rüzgâr/Yağmur Koruması'],
            ['Klasik Normal Çift Cam (Düz)', '2,7 W/(m²K)', '%76', '%80', 'Eski Tip Standart Doğrama'],
            ['Şişecam Isıcam Sinerji (Low-E)', '1,1 W/(m²K)', '%71 (Kış güneşinden kazanç)', '%79', 'Kuzey, Kuzeydoğu & Gölge Cepheler'],
            ['Şişecam Isıcam Konfor (Solar Low-E)', '1,1 W/(m²K)', '%44 (Yaz güneşini %40 keser)', '%71', 'Güney, Batı Cepheler & Kış Bahçesi'],
          ],
        },
        proTip: 'Takılan camın gerçekten Low-E (Sinerji/Konfor) kaplamalı olup olmadığını karanlıkta cama bir çakmak alevi yaklaştırarak test edebilirsiniz: İki camda toplam 4 alev yansıması görünür; Low-E kaplamalı yüzeydeki yansıma diğer üçünden farklı olarak morumsu/farklı bir tonda parlar.',
      },
    ],
    internalLinks: [
      {
        label: '4+20+4 Argonlu Isıcamlı Cam Balkon',
        href: '/hizmetlerimiz/isicamli-cam-balkon',
        context: 'Şişecam Konfor ve Sinerji cam kullanılan Vera Termal sistem detayları.',
      },
      {
        label: 'Winsa PVC Pencere Sistemleri',
        href: '/hizmetlerimiz/pvc-pencere-kapi',
        context: 'Çift ve üçlü Konfor ısıcam entegreli Winsa Dorado 76 ve Revotech Gold serileri.',
      },
      {
        label: 'Cam Seçenekli Fiyat Hesaplama Motoru',
        href: '/fiyat-hesapla',
        context: 'Şeffaf, füme, bronz ve buzlu cam seçenekleriyle m² fiyatınızı hesaplayın.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[0],
      COMMON_EXTERNAL_AUTHORITIES[3],
      COMMON_EXTERNAL_AUTHORITIES[1],
    ],
    infographic: {
      title: 'Cam Teknolojilerine Göre Yıllık Isıtma ve Soğutma Faturası Tasarrufu',
      subtitle: '8 mm tek cama kıyasla 4+20+4 mm argonlu Şişecam ünitelerinin enerji verimi',
      metricUnit: '% Enerji Tasarrufu',
      items: [
        {
          label: 'Şişecam Isıcam Konfor (Kış Isıtma + Yaz Klima Tasarrufu)',
          value: 72,
          displayValue: '%72 Kış Isı Koruma + %40 Yaz Klima Tasarrufu',
          barPercent: 95,
          highlight: true,
        },
        {
          label: 'Şişecam Isıcam Sinerji (Maksimum Kış Isı Yalıtımı)',
          value: 72,
          displayValue: '%72 Kış Isı Koruma + Yüksek Kış Güneşi Kazancı',
          barPercent: 90,
          highlight: true,
        },
        {
          label: 'Standart Kaplamasız Klasik Çift Cam',
          value: 42,
          displayValue: '%42 Orta Seviye Yalıtım',
          barPercent: 52,
        },
      ],
      footnote: 'EN 1279 ve Şişecam Düzcam performans simülasyon verilerine dayanmaktadır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Isıcam Konfor ile Isıcam Sinerji arasındaki fark nedir?',
        directAnswer:
          'Isıcam Sinerji yalnızca kışın içerideki ısının kaçmasını önler; Isıcam Konfor ise hem kışın ısı kaybını önler hem de yazın güneş ısısının içeri girmesini %40 azaltarak serinlik sağlar.',
      },
    ],
    faqs: [
      {
        question: 'Isıcam Konfor evin içini karartır mı?',
        answer:
          'Hayır. Şişecam Isıcam Konfor %71 yüksek gün ışığı geçirgenliğine sahiptir; içeriden bakıldığında şeffaftır, yalnızca güneşin görünmeyen kızılötesi (IR) ısı dalgalarını filtreler.',
      },
      {
        question: 'Füme veya bronz renkli ısıcam yapılabilir mi?',
        answer:
          'Evet. Dış plakası füme veya bronz harmanlı temperli cam, iç plakası ise Low-E kaplamalı temperli cam olarak üretilerek hem yüksek mahremiyet hem de maksimum ısı yalıtımı sağlanır.',
      },
      {
        question: 'Alt kısmı buzlu (kumlamalı) cam balkon nasıl uygulanır?',
        answer: `Bitişik nizam apartmanlarda balkon korkuluk hizasına denk gelen alt %40’lık bölüm CNC kumlama (buzlu) yapılırken üst %60’lık bölüm şeffaf bırakılır (+${FROSTED_DIFF}/m² farkla).`,
      },
      {
        question: 'Argon gazı zamanla uçup biter mi?',
        answer:
          'EN 1279 standardında poliizobütilen (bütül) birincil sızdırmazlık ve tiyokol ikincil sızdırmazlık uygulanan ısıcam ünitelerinde yıllık gaz kaybı %1’in altındadır ve 10 yıl garantilidir.',
      },
    ],
  },

  /* ============================================================================
     14. SİNEKLİK SİSTEMLERİ REHBERİ: PLİSE (PİLELİ) VE KEDİ SİNEKLİĞİ FİYATLARI
     ============================================================================ */
  {
    slug: 'sineklik-sistemleri-rehberi-plise-pileli-kedi-sinekligi-fiyatlari',
    slugAliases: ['kedi-tullu-plise-sineklik-dayanim-testi'],
    title: 'Cam Balkon ve PVC Pencereler İçin Plise (Pileli) ve Yırtılmaz Kedi Sinekliği Rehberi',
    seoTitle: 'Plise (Pileli) Sineklik & Yırtılmaz Kedi Sinekliği Fiyatları 2026',
    metaDescription:
      'Cam balkon ve Winsa PVC pencereler için akordeon plise (pileli) sineklik, çelik/polyester alaşımlı yırtılmaz kedi sinekliği ve termal plise perde 2026 fiyatları.',
    primaryKeyword: 'plise sineklik ve yırtılmaz kedi sinekliği fiyatları',
    secondaryKeywords: [
      'cam balkon sinekliği nasıl olur',
      'kedi sinekliği yırtılır mı',
      'pileli sineklik fiyatları 2026',
      'cam balkon plise perde fiyatları',
    ],
    tags: [
      '#KediSinekliği',
      '#PliseSineklik',
      '#CamBalkonSinekliği',
      '#PlisePerde',
      '#EvcilHayvanGüvenliği',
    ],
    keywords: [
      'kedi sinekliği fiyatları 2026',
      'cam balkon plise sineklik',
      'yırtılmaz kedi tülü',
      'termal plise perde',
    ],
    category: 'PVC Pencere',
    readTime: 9,
    publishDate: '2026-04-14',
    updatedDate: '2026-11-01',
    image: '/images/products/kocasinan-winsa-pencere-kol-kilit-donanimi.jpg',
    imageAlt:
      'Cam balkon ve PVC pencereler için patiye dayanıklı yırtılmaz kedi tüllü sineklik ve plise sineklik sistemi',
    imageCaption:
      'Evcil hayvan güvenliği için geliştirilen yırtılmaz çelik/polyester alaşımlı kedi sinekliği ve akordeon plise sineklik uygulaması.',
    imageTitle: 'Plise (Pileli) Sineklik, Yırtılmaz Kedi Sinekliği ve Plise Perde Rehberi',
    excerpt:
      'Evcil hayvan sahipleri için kedi tırnağına 7 kat dayanıklı yırtılmaz kedi sinekliği, katlanır ve sürme cam balkonlara tam uyumlu akordeon plise sineklik ve plise perde maliyetleri.',
    highlights: [
      `Yırtılmaz Kedi Tüllü Sineklik Birim Fiyatı: ${CAT_SCREEN} / Adet`,
      `Termal Güneş Kırıcı Plise Perde Birim Fiyatı: ${PLEATED}`,
      'Kedi tırnağına karşı standart fiberglas tülden 7 kat yüksek kopma mukavemeti',
    ],
    relatedProductHref: '/hizmetlerimiz/panjur-kepenk-sineklik',
    numberedChecklistTitle: 'Kedi Sinekliği ve Cam Balkon Sinekliği Seçerken 5 Önemli Detay',
    numberedChecklist: [
      'Kedinizin ağırlığıyla yüklendiğinde çerçevenin dışarı açılmaması için "çelik mandallı / anahtarlı emniyet kilidi" bulunduğunu doğrulayın.',
      'Standart ince fiberglas tül yerine vinil kaplı kalın polyester (PetScreen) veya paslanmaz çelik telli yırtılmaz tül seçin.',
      'Katlanır cam balkonlarda ilk açılan kanat veya tüm cephe boyunca çalışan 27 mm alüminyum kasalı duble plise sineklik tercih edin.',
      'Sürme cam balkonlarda (Vera Slide) iç ray üzerinde kayan özel tekerlekli sürme sineklik profilini kullanın.',
      'Sineklik profil renginin doğrama veya cam balkon kasa rengiyle (Antrasit RAL 7016, Beyaz, Altın Meşe) birebir aynı fırın boyalı olmasını isteyin.',
    ],
    sections: [
      {
        id: 'yirtilmaz-kedi-sinekligi-ve-plise-sineklik-farki',
        heading: 'Standart Sineklik ile Yırtılmaz Kedi Sinekliği Arasındaki Teknik Fark',
        paragraphs: [
          `Standart sinekliklerde kullanılan 0,25 mm fiberglas tüller yalnızca sinek ve böcek girişini engellemek için üretilmiştir; bir kedinin tırnak darbesiyle veya cama yaslanmasıyla saniyeler içinde yırtılır. Çelikpen’in [Panjur, Kepenk & Kedi Sinekliği](/hizmetlerimiz/panjur-kepenk-sineklik) grubunda sunduğu **Yırtılmaz Kedi Sinekliği** (${CAT_SCREEN}/adet) ise 0,80 mm kalınlığında PVC kaplı yüksek mukavemetli polyester veya çelik alaşımlı dokuma kullanır.`,
          `Ayrıca kedi sinekliklerimizde tül, alüminyum çerçeve kanalına derin tırtıklı EPDM fitille preslenir ve çerçeve üzerinde kedinin patisiyle açamayacağı **çift kademeli metal emniyet mandalı** yer alır. Cam balkonunuzla birlikte hem sineklik hem de [Termal Plise Perde](/fiyat-hesapla) (${PLEATED}) sipariş ederek tek seferde kusursuz entegrasyon sağlayabilirsiniz.`,
        ],
        table: {
          caption: '2026 Sineklik ve Plise Perde Sistemleri Karşılaştırma Tablosu',
          headers: ['Sistem Türü', 'Tül & Mekanizma Yapısı', 'Uyumlu Olduğu Doğrama', '2026 Net Birim Fiyatı'],
          rows: [
            ['Yırtılmaz Kedi Sinekliği (Menteşeli / Sürme)', 'Kalın PetScreen / Çelik Tül + Emniyet Kilidi', 'PVC Pencere, Balkon Kapısı & Sürme Cam', `${CAT_SCREEN} / Ünite`],
            ['Akordeon Plise (Pileli) Sineklik', 'Katlanır Polyester Plise Tül + Gergi İpi', 'Katlanır & Sürme Cam Balkon, Hebeschiebe', `${CAT_SCREEN} / Ünite`],
            ['Cam Balkon Termal Plise Perde', 'Altta-Üstte Toplanabilen Güneş Kırıcı Kumaş', 'Tüm Katlanır ve Sürme Cam Balkon Kanatları', PLEATED],
          ],
        },
        proTip: 'Cam balkon yaptırırken plise perde kullanmayı düşünüyorsanız bunu keşif aşamasında mutlaka belirtin; böylece üst kasa üzerine 2 cm’lik perde profili eklenerek kanatların perdeye sürtmesi tamamen engellenir.',
      },
    ],
    internalLinks: [
      {
        label: 'Panjur, Kepenk ve Kedi Sinekliği Hizmetimiz',
        href: '/hizmetlerimiz/panjur-kepenk-sineklik',
        context: 'Winstor monoblok panjur, plise sineklik ve yırtılmaz kedi sinekliği detayları.',
      },
      {
        label: 'Sineklik & Plise Perde Dahil Fiyat Hesapla',
        href: '/fiyat-hesapla',
        context: 'Cam balkon teklifinize kedi sinekliği ve plise perde ekleyerek toplam tutarı görün.',
      },
      {
        label: 'Avrupa Yakası Hizmet Bölgelerimiz',
        href: '/bolgeler',
        context: 'Tüm Avrupa Yakası ilçelerinde cam balkon ve doğrama ile entegre sineklik montajı.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[2],
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[0],
    ],
    infographic: {
      title: 'Sineklik Tülü Türlerinin Kopma ve Yırtılma Dayanımı',
      subtitle: 'Evcil hayvan pençe darbesi ve rüzgâr yükü altında mukavemet karşılaştırması',
      metricUnit: '% Mukavemet',
      items: [
        {
          label: 'Çelik / Kalın Polyester Alaşımlı Yırtılmaz Kedi Tülü (PetScreen)',
          value: 96,
          displayValue: '%96 Yırtılma Direnci (Standart Tülden 7 Kat Dayanıklı)',
          barPercent: 96,
          highlight: true,
        },
        {
          label: 'UV Dayanımlı Akordeon Plise (Pileli) Sineklik Tülü',
          value: 80,
          displayValue: '%80 Esneklik & Geniş Açıklıklarda Kolay Toplanma',
          barPercent: 80,
          highlight: true,
        },
        {
          label: 'Standart İnce Fiberglas Sineklik Tülü',
          value: 20,
          displayValue: '%20 (Yalnızca Haşere Koruması • Kedi Tırnağına Dayanamaz)',
          barPercent: 20,
        },
      ],
      footnote: 'ASTM D5034 kopma mukavemeti test verilerine göre hazırlanmıştır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Katlanır cam balkona sineklik takılır mı?',
        directAnswer:
          'Evet. Katlanır cam balkonların iç kasa yüzeyine veya ilk açılan havalandırma kanadına akordeon gibi katlanan plise (pileli) sineklik veya kedi tüllü sürme sineklik tam uyumlu olarak monte edilir.',
      },
    ],
    faqs: [
      {
        question: 'Kedi sinekliği dışarıdan gelen havayı keser mi?',
        answer:
          'Hayır. Yırtılmaz kedi tülü (PetScreen) özel gözenek aralığı sayesinde hem kedi tırnağının geçmesini engeller hem de doğal hava sirkülasyonunu ve görüş netliğini korur.',
      },
      {
        question: 'Plise sineklik kışın sökülmeli mi?',
        answer:
          'Sökülmesine gerek yoktur. Kış aylarında plise sinekliği yan kasa profilinin içine kapalı konumda topladığınızda tül dış etkenlerden, tozdan ve güneşten korunmuş olur.',
      },
      {
        question: 'Plise perde yıkanabilir mi?',
        answer:
          'Evet. Cam balkon kanatlarına klipsle takılan plise perdeler saniyeler içinde yerinden çıkarılıp ılık duş suyuyla yıkanabilir ve ıslak olarak yerine asıldığında kırışmadan kurur.',
      },
      {
        question: 'Kedi sinekliği ve plise perde fiyatları ne kadar?',
        answer: `2026 güncel listemizde yırtılmaz kedi tüllü sineklik birim fiyatı ${CAT_SCREEN}/ünite, termal plise perde ise ${PLEATED} olarak uygulanmaktadır.`,
      },
    ],
  },

  /* ============================================================================
     15. BAHÇELİEVLER, BAĞCILAR VE KÜÇÜKÇEKMECE KENTSEL DÖNÜŞÜM PVC VE CAM BALKON
     ============================================================================ */
  {
    slug: 'bahcelievler-bagcilar-kucukcekmece-kentsel-donusum-pvc-ve-cam-balkon',
    title: 'Bahçelievler, Bağcılar ve Küçükçekmece Yeni Konut Projelerinde Doğrama ve Cam Balkon Standartları',
    seoTitle: 'Bahçelievler, Bağcılar & Küçükçekmece Kentsel Dönüşüm Cam Balkon 2026',
    metaDescription:
      'Bahçelievler (Kocasinan, Soğanlı, Şirinevler), Bağcılar (Güneşli), Güngören ve Küçükçekmece (Atakent, Halkalı) kentsel dönüşüm binalarında %15 toplu bina indirimli cam balkon ve Winsa PVC.',
    primaryKeyword: 'bahçelievler bağcılar küçükçekmece kentsel dönüşüm cam balkon',
    secondaryKeywords: [
      'toplu bina cam balkon indirimi',
      'bahçelievler cam balkon üretici fabrika',
      'küçükçekmece atakent cam balkon',
      'kentsel dönüşüm pvc doğrama şartnamesi',
    ],
    tags: [
      '#BahçelievlerCamBalkon',
      '#KüçükçekmeceCamBalkon',
      '#BağcılarCamBalkon',
      '#KentselDönüşüm',
      '#TopluBinaİndirimi',
    ],
    keywords: [
      'bahçelievler cam balkon',
      'kocasinan cam balkon fabrikası',
      'atakent halkalı cam balkon',
      'bağcılar güneşli cam balkon',
    ],
    category: 'Yerel Rehber',
    readTime: 11,
    publishDate: '2026-04-20',
    updatedDate: '2026-11-01',
    image: '/images/references/bahcelievler-kocasinan-antrasit-pvc-dograma.jpg',
    imageAlt:
      'Bahçelievler, Bağcılar ve Küçükçekmece yeni kentsel dönüşüm binalarında Antrasit RAL 7016 Winsa PVC doğrama ve ısıcamlı cam balkon uygulaması',
    imageCaption:
      'Kocasinan Merkez üretim tesisimizden Bahçelievler, Küçükçekmece ve Bağcılar kentsel dönüşüm apartmanlarına uygulanan Antrasit RAL 7016 cephe standartları.',
    imageTitle: 'Bahçelievler, Bağcılar ve Küçükçekmece Kentsel Dönüşüm Doğrama & Cam Balkon Rehberi',
    excerpt:
      'Yeni teslim edilen Bahçelievler, Küçükçekmece (Atakent, Halkalı, Cennet), Bağcılar ve Güngören binalarında müteahhitler ve apartman yönetimleri için %15 toplu bina indirimli fabrika çözümleri.',
    highlights: [
      `5+ Daire Kentsel Dönüşüm & Apartman Siparişlerine Net %${BULK} Fabrika İndirimi`,
      'Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C fabrikamızdan 15 dakikada aynı gün keşif',
      `Winsa Vera Termal Isıcamlı (${m2('vbs_isicam')}) & Winsa PVC Doğrama (${m2('pvc_dograma')})`,
    ],
    relatedProductHref: '/bolgeler/bahcelievler-cam-balkon',
    numberedChecklistTitle: 'Yeni Teslim Kentsel Dönüşüm Binaları İçin 5 Adımlı Toplu Uygulama Planı',
    numberedChecklist: [
      'İskân sonrası ilk bina yönetim toplantısında dış cephe bütünlüğü için standart profil rengini (genellikle Antrasit RAL 7016) ve cam tonunu karara bağlayın.',
      'Çelikpen ücretsiz keşif ekibini davet ederek tüm daire tiplerinin (ön cephe, arka cephe, dubleks teras) lazerli ölçümlerini tek dosyada çıkartın.',
      '4/5 kat maliki muvafakatname tutanağını yönetim karar defterine işleyerek tüm binayı hukuki güvence altına alın.',
      '5 ve üzeri dairenin toplu siparişiyle toplam liste fiyatı üzerinden net %15 fabrika toplu bina indiriminden faydalanın.',
      'Kombi dolabı ve hermetik kombi bacası geçişlerini CNC kesimli sabit karolaj modülleriyle İGDAŞ normlarına uygun tamamlayın.',
    ],
    sections: [
      {
        id: 'kocasinan-merkez-fabrikadan-dogrudan-uretim-avantaji',
        heading: 'Kocasinan Merkez Fabrikamızdan Bahçelievler, Küçükçekmece ve Bağcılar’a Doğrudan Üretim',
        paragraphs: [
          `[Bahçelievler](/bolgeler/bahcelievler-cam-balkon) (Kocasinan, Soğanlı, Siyavuşpaşa, Şirinevler, Yenibosna), [Küçükçekmece](/bolgeler/kucukcekmece-cam-balkon) (Atakent, Halkalı, Cennet, Sefaköy) ve [Bağcılar / Güngören](/bolgeler/bagcilar-cam-balkon) aksı, İstanbul Avrupa Yakası’nda kentsel dönüşümün ve yeni konut projelerinin en yoğun olduğu merkezdir. Yeni teslim edilen binalarda her dairenin farklı bir firmaya farklı renk ve modelde cam balkon yaptırması hem bina estetiğini bozar hem de daire başına maliyeti artırır.`,
          `Çelikpen olarak **Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C Bahçelievler** adresindeki CNC üretim tesisimizden, komşu ilçelerimizdeki yeni binalara ve müteahhit projelerine aracı komisyonu olmadan doğrudan fabrika satış fiyatı ve **5+ dairede net %${BULK} toplu bina indirimi** uyguluyoruz. Bireysel ve toplu bina fiyatlarını [Fiyat Hesapla](/fiyat-hesapla) aracımızda anında görebilirsiniz.`,
        ],
        table: {
          caption: 'Bireysel Sipariş vs 5+ Daire Toplu Kentsel Dönüşüm İndirimli m² Fiyatları',
          headers: ['Sistem Serisi', 'Standart Fabrika m² Fiyatı', `5+ Daire Toplu Bina İndirimli (%${BULK})`, 'Önerilen Cephe'],
          rows: [
            [
              SYSTEMS.vns_8mm.name,
              m2('vns_8mm'),
              `${tl(Math.round(SYSTEMS.vns_8mm.netPricePerM2 * (1 - CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate)))}/m²`,
              'Ara Sokak 1–4. Kat Balkonlar',
            ],
            [
              SYSTEMS.vns_10mm.name,
              m2('vns_10mm'),
              `${tl(Math.round(SYSTEMS.vns_10mm.netPricePerM2 * (1 - CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate)))}/m²`,
              '5. Kat ve Üzeri Rüzgârlı Cepheler',
            ],
            [
              SYSTEMS.vbs_isicam.name,
              m2('vbs_isicam'),
              `${tl(Math.round(SYSTEMS.vbs_isicam.netPricePerM2 * (1 - CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate)))}/m²`,
              'Ana Cadde, E-5 & Kışlık Oda Balkonlar',
            ],
            [
              SYSTEMS.pvc_dograma.name,
              m2('pvc_dograma'),
              `${tl(Math.round(SYSTEMS.pvc_dograma.netPricePerM2 * (1 - CELIKPEN_PRICING_CONFIG.bulkBuildingDiscountRate)))}/m²`,
              'Tüm Bina Dış Cephe PVC Pencere & Kapı',
            ],
          ],
        },
        proTip: 'Fiyat hesaplama modülümüzde "5+ Daire Kentsel Dönüşüm / Apartman Toplu Siparişi (%15 İndirim)" kutucuğunu işaretleyerek daire başına düşen net indirimli tutarı saniyeler içinde hesaplayabilirsiniz.',
      },
    ],
    internalLinks: [
      {
        label: 'Bahçelievler Bölge & Fabrika Showroom Rehberi',
        href: '/bolgeler/bahcelievler-cam-balkon',
        context: 'Kocasinan Merkez fabrikamız ve Bahçelievler 11 mahalle hizmet ağımız.',
      },
      {
        label: 'Küçükçekmece (Atakent, Halkalı, Cennet) Rehberi',
        href: '/bolgeler/kucukcekmece-cam-balkon',
        context: 'Atakent, Halkalı ve Cennet Mahallesi site ve konut projelerimiz.',
      },
      {
        label: '%15 Toplu Bina İndirimli Fiyat Hesapla',
        href: '/fiyat-hesapla',
        context: 'Apartman ve kentsel dönüşüm projeleriniz için indirimli teklif oluşturun.',
      },
    ],
    externalReferences: [
      COMMON_EXTERNAL_AUTHORITIES[1],
      COMMON_EXTERNAL_AUTHORITIES[2],
      COMMON_EXTERNAL_AUTHORITIES[4],
    ],
    infographic: {
      title: 'Kentsel Dönüşüm Projelerinde Çelikpen Fabrika Avantajları',
      subtitle: 'Aracısız üretim, toplu bina indirimi ve 10 yıl garanti etkisi',
      metricUnit: '% Avantaj',
      items: [
        {
          label: 'Dış Cephe Mimari Renk ve Profil Standardizasyonu',
          value: 100,
          displayValue: '%100 Tek Tip Antrasit RAL 7016 Cephe Bütünlüğü',
          barPercent: 100,
          highlight: true,
        },
        {
          label: 'Isıcamlı Sistem ile Daire Başına Kış Doğalgaz Tasarrufu',
          value: 72,
          displayValue: '%72 Balkon Isı Kaybı Azaltımı (TS 825 Uyumlu)',
          barPercent: 85,
          highlight: true,
        },
        {
          label: `5+ Daire Toplu Siparişlerde Net Fabrika İndirimi (%${BULK})`,
          value: BULK,
          displayValue: `%${BULK} Doğrudan Maliyet Avantajı`,
          barPercent: 60,
        },
      ],
      footnote: 'Çelikpen Kocasinan Merkez üretim tesisi 2026 proje verilerine dayanmaktadır.',
    },
    voiceSearchQa: [
      {
        spokenQuestion: 'Bahçelievler ve çevresinde apartman olarak toplu cam balkon yaptırırsak indirim olur mu?',
        directAnswer: `Evet. Çelikpen Kocasinan Merkez fabrikamızdan aynı apartman veya sitedeki 5 ve üzeri dairenin toplu cam balkon ve PVC doğrama siparişlerine net %${BULK} toplu bina indirimi uygulanmaktadır.`,
      },
    ],
    faqs: [
      {
        question: 'Kocasinan Merkez showroomunuzu ziyaret edip sistemleri canlı görebilir miyiz?',
        answer:
          'Evet. Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C, 34186 Bahçelievler / İstanbul adresindeki üretim tesisimiz ve showroomumuz Pazartesi–Cumartesi 08:30–19:30 saatleri arasında açıktır; tüm sistemleri 1:1 ölçekte inceleyebilirsiniz.',
      },
      {
        question: 'Müteahhitler ve inşaat firmaları için toplu PVC doğrama üretimi yapıyor musunuz?',
        answer:
          'Evet. Kendi CNC PVC ve alüminyum işleme hattımızda kentsel dönüşüm ve yeni konut projeleri için Winsa Dorado 76, Safir 76, Revotech Gold ve Winstor panjur sistemlerinin toplu üretim ve montajını gerçekleştiriyoruz.',
      },
      {
        question: 'Toplu bina siparişlerinde her daire kendi ödeme planını seçebilir mi?',
        answer:
          'Evet. Toplu bina indirimi tüm dairelere uygulanırken, her kat maliki kendi dairesinin ödemesini nakit, havale veya kredi kartı seçenekleriyle ayrı ayrı yapabilir.',
      },
      {
        question: 'Servis veya ayar gerektiğinde kaç günde müdahale ediyorsunuz?',
        answer:
          'Üretim merkezimiz Avrupa Yakası’nın kalbinde (Bahçelievler Kocasinan Merkez) yer aldığı için kadrolu servis ekibimiz aynı gün veya en geç 24 saat içinde yerinde destek sağlar.',
      },
    ],
  },
];
