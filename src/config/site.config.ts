export interface NeighborhoodInfo {
  slug: string;
  name: string;
  urbanFocus: string;
  recommendedSystem: string;
  highlightProblem: string;
  completedProjectsCount: number;
}

export interface ProductSeriesInfo {
  slug: string;
  code: string;
  name: string;
  pricingSystemId: 'vns_8mm' | 'vns_10mm' | 'vbs_isicam' | 'vds_surme' | 'vgs_giyotin';
  image?: string; // Opsiyonel: public/systems/{slug}.jpg eklendiğinde doldurulur
  tagline: string;
  description: string;
  idealFor: string[];
  technicalSpecs: { label: string; value: string }[];
  yargitayNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const SITE_CONFIG = {
  brandName: 'Çelikpen',
  fullTitle: 'Çelikpen Cam Balkon & Mimari Cam Sistemleri | Kocasinan, Bahçelievler',
  slogan: 'Kocasinan Üretim Gücüyle Bahçelievler’de Mimari Cam Balkon Teknolojisi',
  siteUrl: 'https://celikpen.com.tr',
  district: 'Bahçelievler',
  headquartersNeighborhood: 'Kocasinan Merkez',
  address: 'Kocasinan Merkez Mah. Mahmutbey Cad. Üretim & Showroom, Bahçelievler / İstanbul',
  phoneDisplay: '0 (212) 555 00 34',
  phoneRaw: '+902125550034',
  whatsappNumber: '905320000034', // Başında + olmadan ülke kodu ile
  workingHours: 'Pazartesi - Cumartesi: 08:30 - 19:30',
  coordinates: {
    latitude: 41.0168,
    longitude: 28.8475,
  },
  warranties: {
    glassCertification: 'TSE EN 12150 Şişecam Temperli & Isıcam Konfor Sertifikalı',
    mechanicalWarrantyYears: 5,
    freeSurveyPromise: 'Kocasinan Merkezden Tüm Bahçelievler’e Aynı Gün Lazerli Ücretsiz Keşif',
  },
  productSeries: [
    {
      slug: 'vns-katlanir-cam-balkon',
      code: 'ÇP-VNS 8 / 10',
      name: 'VNS 8mm & 10mm Temperli Katlanır Cam Balkon',
      pricingSystemId: 'vns_10mm',
      image: '/images/products/cam-balkon-default.svg',
      tagline: 'Tam açılır panoramik cephe, çift sıra paslanmaz rulman ve rüzgar kilidi.',
      description:
        'Bahçelievler ara sokak ve standart apartman balkonlarında rüzgar, yağmur, toz ve kuş girişini %100 kesen; yazın tüm kanatları köşeye toplanarak balkonu tamamen açık hale getiren klasik ve yüksek dayanımlı katlanır seri.',
      idealFor: [
        'Siyavuşpaşa, Hürriyet, Zafer ve Fevzi Çakmak aile apartmanları',
        'L ve U tipi köşe dönüşlü balkonlar (Köşe takozsuz tam açılım)',
        'Bütçe dostu, uzun ömürlü ve çocuk emniyet kilitli çözüm arayanlar',
      ],
      technicalSpecs: [
        { label: 'Cam Kalınlığı', value: '8mm veya 10mm Şişecam Temperli Tek Cam' },
        { label: 'Profil Et Kalınlığı', value: '3mm T66 Termik İşlemli Alüminyum Kasa' },
        { label: 'Rulman Sistemi', value: 'Kanat Başı 8 Adet Paslanmaz Çelik Rulman' },
        { label: 'Sızdırmazlık', value: 'Alüminyum Mıknatıslı Fitil + Çift Sıra Kıl Fitil' },
      ],
      yargitayNote:
        'Katlanır kanat yapısı imar mevzuatında kapalı alan artışına girmez; Antrasit RAL 7016 ve Mat Siyah profil seçenekleriyle apartman dış cephe bütünlüğünü korur.',
    },
    {
      slug: 'vbs-isicamli-cam-balkon',
      code: 'ÇP-VBS Termal',
      name: 'VBS 4+20+4 Argon Gazlı Isıcamlı Cam Balkon',
      pricingSystemId: 'vbs_isicam',
      image: '/images/products/cam-balkon-default.svg',
      tagline: '%72 ısı tasarrufu ve -38 dB trafik gürültüsü kesici termal seri.',
      description:
        'Balkonunu kışın da evin sıcak bir odası gibi kullanmak isteyenler ve Şirinevler, E-5, Mahmutbey Caddesi gibi yoğun gürültülü akslarda oturanlar için her iki camı da temperli 28mm (4+20+4) Argon gazlı Konfor Isıcam serisi.',
      idealFor: [
        'Şirinevler, Kocasinan Merkez, Çobançeşme ve Yenibosna cadde cepheleri',
        'Kışın balkonda terleme/buğulanma istemeyen ve kombi tasarrufu hedefleyen daireler',
        'Çalışma alanı veya kış yemek odasına dönüştürülen balkonlar',
      ],
      technicalSpecs: [
        { label: 'Cam Kombinasyonu', value: '28mm (4mm Temperli + 20mm Argon Boşluk + 4mm Konfor Temperli)' },
        { label: 'Ses İzolasyonu', value: '-38 dB Akustik Gürültü Azaltımı' },
        { label: 'Isı Yalıtım Kazancı', value: 'Tek Cama Göre 4.2 Kat Daha Yüksek Termal Bariyer (%72)' },
        { label: 'Su Tahliyesi', value: 'Eğimli Damlalık Kasa ve Gizli Su Deşarj Kanalları' },
      ],
      yargitayNote:
        'Eylül 2026 Yargıtay kararlarına tam uyumlu katlanır mekanizmaya sahiptir; sabit PVC doğrama gibi ruhsat ihtilafı yaratmadan maksimum ısı yalıtımı sunar.',
    },
    {
      slug: 'vds-esiksiz-surme-cam-balkon',
      code: 'ÇP-VDS Slide',
      name: 'VDS Eşiksiz Sürme (Sürgülü) Cam Balkon',
      pricingSystemId: 'vds_surme',
      image: '/images/products/surme-sistem-default.svg',
      tagline: 'İçe kanat açılma payı sıfır; dar balkonlar için masa-sandalye dostu ray sistemi.',
      description:
        'Kanatlar içeriye doğru katlanmadığı için balkon içindeki masa, sandalye, çamaşırlık veya çiçeklik alanını hiç daraltmaz. Alt eşiksiz (takılma yapmayan) 3 veya 5 raylı alüminyum kasa üzerinde tek parmakla kayarak açılır.',
      idealFor: [
        'Hürriyet, Soğanlı ve Bahçelievler Merkez’deki dar/uzun balkonlar ve Fransız balkonlar',
        'Tekerlekli sandalye ve çocuk geçişi için engelsiz zemin arayanlar',
        'Tül perde ve plise perdeyi kanat çarpması olmadan kullanmak isteyenler',
      ],
      technicalSpecs: [
        { label: 'Cam Seçeneği', value: '8mm / 10mm Temperli veya 4+12+4 Isıcam Opsiyonlu' },
        { label: 'Alt Ray Yüksekliği', value: '8mm Engelsiz Pahlı Eşiksiz Alt Kasa' },
        { label: 'Kenetleme', value: 'Kanatlar Arası Özel Alüminyum Kenetli Rüzgar Kilidi' },
        { label: 'Sineklik Uyumu', value: 'Sürme Kedi Tüllü Sineklik Rayı Entegreli' },
      ],
      yargitayNote:
        'Dikey kayıt aralıkları bina pencereleriyle hizalanır; dışarıdan bakıldığında bina cephesinde en sade ve modern mimari görünümü sağlar.',
    },
    {
      slug: 'vgs-motorlu-giyotin-cam',
      code: 'ÇP-VGS Auto',
      name: 'VGS Motorlu Giyotin (Kumandalı Küpeşte) Cam',
      pricingSystemId: 'vgs_giyotin',
      image: '/images/products/cam-balkon-default.svg',
      tagline: 'Uzaktan kumandalı dikey açılım; açıkken güvenli cam korkuluk, kapalıyken tam yalıtım.',
      description:
        'Somfy veya Becker tüp motorlu, çelik zincir/kayış tahrikli dikey hareketli sistem. Açıldığında en alt sabit cam panel 110 cm yüksekliğinde güvenli küpeşte (korkuluk) görevi görür; teraslar, dubleks daireler ve ticari işletmeler için zirve teknolojidir.',
      idealFor: [
        'Yenibosna Basın Ekspres rezidansları ve Bahçelievler çatı dubleks terasları',
        'Talatpaşa ve Şirinevler’deki kafe, restoran ve kış bahçesi cepheleri',
        'Akıllı ev / uzaktan kumanda konforu ve el sıkışma emniyetli sistem arayanlar',
      ],
      technicalSpecs: [
        { label: 'Motor & Otomasyon', value: 'Somfy / Becker RTS Kumandalı Motor (5 Yıl Garantili)' },
        { label: 'Cam Yapısı', value: '4+16+4 Argonlu Isıcam (Temperli Güvenlik Camı)' },
        { label: 'Taşıyıcı Mekanizma', value: 'Çift Taraf Çelik Zincir veya Çelik Telli Triger Kayış' },
        { label: 'Güvenlik', value: 'Sabit Alt Korkuluk Paneli + Rüzgar/Yağmur Sensörü Opsiyonu' },
      ],
      yargitayNote:
        'Mevcut balkon korkuluğunu değiştirmeden veya korkuluk yerine uygulanabilir; rezidans yönetim planlarıyla %100 uyumludur.',
    },
    {
      slug: 'kis-bahcesi-ve-bioklimatik-tavan',
      code: 'ÇP-WB Bioklimatik',
      name: 'Kış Bahçesi & Bioklimatik Pergola Cam Sistemleri',
      pricingSystemId: 'vgs_giyotin',
      image: '/images/products/cam-balkon-default.svg',
      tagline: 'Teras ve bahçe katlarını dört mevsim yaşam alanına dönüştüren tavan + cephe entegrasyonu.',
      description:
        'Bahçelievler’deki çatı terasları, bahçe katı daireler ve ticari mekanlar için kendi ekseninde dönerek havalandırma sağlayan ve geriye toplanan Bioklimatik alüminyum tavan veya 4+16+4 lamine ısıcam tavan ile VBS Isıcamlı / VGS Giyotin cephe kombinasyonu.',
      idealFor: [
        'Bahçelievler Merkez, Kocasinan ve Siyavuşpaşa çatı dubleks terasları',
        'Bahçe katı daire verandaları ve müstakil kış bahçesi projeleri',
        'LED aydınlatmalı, gizli yağmur oluklu dört mevsim açık/kapalı alanlar',
      ],
      technicalSpecs: [
        { label: 'Tavan Seçenekleri', value: 'Motorlu Bioklimatik Alüminyum Lamelli veya Lamine Isıcam Tavan' },
        { label: 'Cephe Entegrasyonu', value: 'ÇP-VBS Isıcamlı Katlanır, ÇP-VDS Sürme veya ÇP-VGS Giyotin' },
        { label: 'Su Tahliyesi', value: 'Taşıyıcı Dikme İçinden Gizli Yağmur Suyu Deşarj Sistemi' },
        { label: 'Aydınlatma', value: 'Entegre Dimmerli Günışığı / RGB Samsung LED Spot ve Şerit' },
      ],
      yargitayNote:
        'Demonte ve tekerlekli/katlanır cephe modülleriyle uygulanır; keşif ekibimiz teras projelerinde 4/5 kat maliki muvafakatname dosyasını ücretsiz hazırlar.',
    },
  ] as ProductSeriesInfo[],
  faqs: [
    {
      question: 'Eylül 2026 Yargıtay kararına göre apartmanda cam balkon izni nasıl alınır?',
      answer:
        'Kat Mülkiyeti Kanunu 19. maddesi uyarınca kat maliklerinin 4/5 (%80) yazılı muvafakatnamesi ve bina dış cephe rengiyle uyumlu (antrasit RAL 7016, mat siyah vb.) profil seçimi ile yasal güvence altında montaj yapılır. Sitemizdeki ücretsiz 4/5 Muvafakatname Formu aracımızla belgenizi 1 dakikada hazırlayıp yazdırabilirsiniz.',
    },
    {
      question: 'Balkonda kombi dolabı ve kombi bacası varsa cam balkon uygulanır mı?',
      answer:
        'Evet. Sabit karolaj veya temperleme öncesi CNC kesimli menfez ve hermetik kombi baca deliği açılarak İGDAŞ standartlarına tam uyumlu montaj gerçekleştirilir.',
    },
    {
      question: 'L balkon ve U balkon m² hesabı nasıl yapılır?',
      answer:
        'Balkonun tüm açık cephe genişlikleri (cm) toplanarak metreye çevrilir ve balkon yüksekliği ile çarpılır. 3.5 m² altındaki küçük balkonlar standart minimum üretim alanı olan 3.5 m² üzerinden fiyatlandırılır.',
    },
    {
      question: 'Çelikpen cam balkon sistemlerinde yağmur suyu ve rüzgar sızdırmazlığı nasıl sağlanır?',
      answer:
        'Eğimli damlalık kasa profili, su tahliye kanalları, UV dayanımlı alüminyum mıknatıslı fitiller ve çift sıra kıl fitil bariyeri ile sağanak yağışta dahi %100 su deşarjı sağlanır.',
    },
    {
      question: '5+ daire kentsel dönüşüm veya apartman toplu siparişlerinde indirim var mı?',
      answer:
        'Evet. Kocasinan Merkez fabrikamızdan Bahçelievler’deki 5 ve üzeri daireli toplu apartman veya kentsel dönüşüm projelerine net %15 toplu bina indirimi ve tek tip dış cephe renk standardizasyonu uygulanmaktadır.',
    },
  ] satisfies FaqItem[],
  neighborhoods: [
    {
      slug: 'kocasinan',
      name: 'Kocasinan Merkez',
      urbanFocus: 'Atölye Merkezimiz & Yeni Kentsel Dönüşüm Konutları',
      recommendedSystem: 'ÇP-VBS 4+20+4 Argon Gazlı Isıcamlı Sistem',
      highlightProblem: 'Mahmutbey Caddesi aksı gürültü izolasyonu ve yeni binalarda cephe bütünlüğü.',
      completedProjectsCount: 145,
    },
    {
      slug: 'siyavuspasa',
      name: 'Siyavuşpaşa',
      urbanFocus: 'Adnan Kahveci Bulvarı & Çamlık Cad. Aile Konutları',
      recommendedSystem: 'ÇP-VBS Isıcamlı + Alt %40 Buzlu Mahremiyet Camı',
      highlightProblem: 'Bitişik nizam apartmanlarda karşı cepheden görünme ve kışın ısı kaybı.',
      completedProjectsCount: 118,
    },
    {
      slug: 'soganli',
      name: 'Soğanlı',
      urbanFocus: 'Yoğun Kentsel Dönüşüm & Toplu Bina Projeleri',
      recommendedSystem: 'Antrasit Gri 10mm Katlanır & Isıcamlı Seri (%15 Toplu Bina İndirimi)',
      highlightProblem: 'Eylül 2026 Yargıtay kararına uyumlu 4/5 kat maliki muvafakatname ve standart profil rengi.',
      completedProjectsCount: 132,
    },
    {
      slug: 'sirinevler',
      name: 'Şirinevler',
      urbanFocus: 'E-5, Metrobüs ve Meydan Aksı Yüksek Gürültü Bölgesi',
      recommendedSystem: 'ÇP-VBS 28mm Argon Gazlı Akustik Isıcam (38 dB Ses Kesici)',
      highlightProblem: 'Yoğun trafik gürültüsü, egzoz tozu ve rüzgar ıslığı.',
      completedProjectsCount: 164,
    },
    {
      slug: 'yenibosna',
      name: 'Yenibosna Merkez',
      urbanFocus: 'Basın Ekspres Rezidansları & Ticari Kafe/Restoran Cepheleri',
      recommendedSystem: 'ÇP-VGS Motorlu Giyotin & 10mm Yüksek Kat Katlanır Sistem',
      highlightProblem: 'Yüksek kat rüzgar yükü dayanımı ve ticari işletmeler için kumandalı giyotin cam.',
      completedProjectsCount: 96,
    },
    {
      slug: 'hurriyet',
      name: 'Hürriyet',
      urbanFocus: 'Merkezi Sokaklar & Köşe Cephe L Tipi Balkonlar',
      recommendedSystem: 'ÇP-VDS Eşiksiz Sürme & Köşe Açılır L Balkon Sistemi',
      highlightProblem: 'Dar balkonlarda kanat açılma alanı kazanımı ve kedi tüllü sineklik entegrasyonu.',
      completedProjectsCount: 84,
    },
    {
      slug: 'zafer',
      name: 'Zafer',
      urbanFocus: 'Yeni Teslim Binalar & Aile Apartmanları',
      recommendedSystem: 'ÇP-VNS 10mm Füme/Bronz Güneş Kontrol Camlı Sistem',
      highlightProblem: 'Yaz güneşi kontrolü, mahremiyet ve çocuk emniyet kilidi güvenliği.',
      completedProjectsCount: 79,
    },
    {
      slug: 'cobancesme',
      name: 'Çobançeşme',
      urbanFocus: 'E-5 Yan Yol, Kuyumcukent Aksı & Rüzgar Yükü Yüksek Cepheler',
      recommendedSystem: 'ÇP-VBS 28mm Argon Gazlı Akustik Isıcam (38 dB Ses Kesici)',
      highlightProblem: 'Ana arter trafik gürültüsü, yüksek kat rüzgar basıncı ve toz yalıtımı.',
      completedProjectsCount: 72,
    },
    {
      slug: 'cumhuriyet',
      name: 'Cumhuriyet',
      urbanFocus: 'Kentsel Dönüşüm Apartmanları & Meydan Çevresi Konutları',
      recommendedSystem: 'ÇP-VBS Isıcamlı + Antrasit Gri (RAL 7016) Cephe Uyumlu Seri',
      highlightProblem: 'Yeni kentsel dönüşüm binalarında 4/5 kat maliki muvafakatname ve renk bütünlüğü.',
      completedProjectsCount: 91,
    },
    {
      slug: 'fevzi-cakmak',
      name: 'Fevzi Çakmak',
      urbanFocus: 'Merkezi Aile Apartmanları & Bitişik Nizam Sokaklar',
      recommendedSystem: 'ÇP-VNS 10mm Katlanır + Alt %40 Kumlama (Buzlu) Mahremiyet Camı',
      highlightProblem: 'Karşı apartman cephesinden görünme sorunu ve kombi dolabı/bacası geçişi.',
      completedProjectsCount: 88,
    },
    {
      slug: 'bahcelievler-merkez',
      name: 'Bahçelievler Merkez',
      urbanFocus: 'Talatpaşa Bulvarı, Yayalaştırılmış Cadde & Prestij Konutları',
      recommendedSystem: 'ÇP-VBS 4+20+4 Konfor Isıcam & ÇP-VGS Motorlu Giyotin Seri',
      highlightProblem: 'Estetik dış cephe standardı, dört mevsim balkon kullanımı ve maksimum ısı tasarrufu.',
      completedProjectsCount: 156,
    },
  ] satisfies NeighborhoodInfo[],
};

