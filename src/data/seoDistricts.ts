export interface SeoDistrictPageData {
  slug: string;
  footerLabel: string;
  districtName: string;
  neighborhoods: string[];
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  heroImageAlt: string;
  heroImageTitle: string;
  aiSummary: string;
  architecturalContextHeading: string;
  architecturalContextBody: string;
  localChallenges: { title: string; detail: string }[];
  recommendedSystems: { title: string; spec: string; href: string }[];
  localPriceSummary: string;
  faqs: { question: string; answer: string }[];
}

export const SEO_DISTRICT_PAGES: SeoDistrictPageData[] = [
  {
    slug: 'bakirkoy-florya-yesilkoy-atakoy-cam-balkon',
    footerLabel: 'Bakırköy (Florya, Yeşilköy, Ataköy)',
    districtName: 'Bakırköy',
    neighborhoods: ['Florya', 'Yeşilköy', 'Ataköy', 'Yeşilyurt', 'Zuhuratbaba', 'Kartaltepe'],
    h1: 'Bakırköy, Florya, Yeşilköy & Ataköy Cam Balkon ve Kış Bahçesi Sistemleri',
    metaTitle: 'Bakırköy, Florya, Yeşilköy & Ataköy Cam Balkon Fiyatları 2026 | Çelikpen',
    metaDescription:
      'Bakırköy sahil hattı (Florya, Yeşilköy, Ataköy) için lodos rüzgârına ve deniz tuzu korozyonuna dayanıklı ısıcamlı cam balkon, kış bahçesi ve Winsa PVC sistemleri.',
    keywords: [
      'Bakırköy cam balkon',
      'Florya cam balkon',
      'Yeşilköy kış bahçesi',
      'Ataköy ısıcamlı cam balkon',
      'Bakırköy pimapen tamircisi',
    ],
    heroImage: '/images/seo/bolge-avrupa-yakasi.jpg',
    heroImageAlt: 'Bakırköy Florya, Yeşilköy ve Ataköy sahil hattı ısıcamlı cam balkon uygulaması — Çelikpen',
    heroImageTitle: 'Bakırköy, Florya, Yeşilköy ve Ataköy Cam Balkon Sistemleri',
    aiSummary:
      'Bakırköy (Florya, Yeşilköy, Ataköy) sahil hattında lodos fırtınası ve tuzlu deniz nemine karşı QUALICOAT kaplı alüminyum profiller, AISI 304 paslanmaz rulmanlar ve 4+20+4 mm Şişecam Konfor ısıcamlı cam balkon sistemleri Çelikpen Kocasinan Merkez fabrikasından 15 dakikada keşif avantajıyla uygulanır.',
    architecturalContextHeading: 'Sahil Hattında Lodos Rüzgâr Yükü ve Deniz Tuzu Korozyonuna Karşı Mühendislik',
    architecturalContextBody:
      'Marmara Denizi’ne doğrudan cepheli Florya, Yeşilköy, Yeşilyurt ve Ataköy sitelerinde standart boyalı alüminyum profiller ve düşük kalite tekerlekler tuzlu nem nedeniyle kısa sürede oksitlenir. Çelikpen, Bakırköy sahil projelerinde deniz korozyonuna dayanıklı QUALICOAT sertifikalı boya, çift sıra EPDM conta ve yüksek rüzgâr dayanımlı 10 mm / 4+20+4 mm ısıcamlı sistemler kullanır.',
    localChallenges: [
      { title: 'Şiddetli Lodos & Yatay Yağmur', detail: 'Eğimli damlalık kasa ve gizli su tahliye kanallarıyla sağanak lodos yağışında %100 su deşarjı.' },
      { title: 'Tuzlu Deniz Nemi Korozyonu', detail: 'AISI 304 paslanmaz çelik rulman, krom menteşe ve deniz iklimine dayanıklı elektrostatik fırın boya.' },
      { title: 'Ataköy & Florya Site Cephe Uyumu', detail: 'Site yönetim planlarına %100 uyumlu RAL 7016 antrasit, bronz ve füme cam kombinasyonları.' },
    ],
    recommendedSystems: [
      { title: '4+20+4 Argonlu Isıcamlı Cam Balkon', spec: 'Uw: 1.1 • -38 dB • Lodos Kilitli', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Villa & Bahçe Katı Kış Bahçesi', spec: 'T66 Alüminyum + Bioklimatik Tavan', href: '/hizmetlerimiz/kis-bahcesi-sistemleri' },
      { title: 'Isı Yalıtımlı Alüminyum Doğrama', spec: 'Korozyonsuz Termal Kırılımlı Cephe', href: '/hizmetlerimiz/aluminyum-dograma' },
    ],
    localPriceSummary: 'Bakırköy, Florya, Yeşilköy ve Ataköy için 2026 cam balkon m² fiyatları 3.650 ₺ – 7.450 ₺ aralığındadır; aynı gün ücretsiz lazerli keşif sunulur.',
    faqs: [
      {
        question: 'Florya ve Yeşilköy sahilinde cam balkon rulmanları paslanır mı?',
        answer:
          'Çelikpen sistemlerinde kullanılan tüm rulmanlar AISI 304 paslanmaz çelik bilyalıdır ve kasa profilleri tuzlu neme dayanıklı QUALICOAT boya ile korunur; paslanma ve sıkışma yaşanmaz.',
      },
      {
        question: 'Ataköy bloklarında site yönetiminin istediği profil rengini uyguluyor musunuz?',
        answer:
          'Evet. Ataköy 1.–11. Kısım ve yeni rezidans projelerinin dış cephe RAL renk kodlarına birebir uyumlu antrasit, bronz, eloksal veya beyaz üretim yapıyoruz.',
      },
      {
        question: 'Bakırköy’de ücretsiz keşif ne kadar sürede gelir?',
        answer:
          'Kocasinan Merkez üretim tesisimiz Bakırköy sınırına 10 dakika mesafededir; talebinizle birlikte aynı gün ücretsiz lazerli keşif yapılmaktadır.',
      },
    ],
  },
  {
    slug: 'besiktas-etiler-levent-bebek-cam-balkon',
    footerLabel: 'Beşiktaş (Etiler, Levent, Bebek)',
    districtName: 'Beşiktaş',
    neighborhoods: ['Etiler', 'Levent', 'Bebek', 'Ulus', 'Akatlar', 'Ortaköy', 'Arnavutköy'],
    h1: 'Beşiktaş, Etiler, Levent & Bebek Motorlu Giyotin Cam ve Teras Sistemleri',
    metaTitle: 'Beşiktaş, Etiler, Levent & Bebek Motorlu Giyotin & Cam Balkon 2026 | Çelikpen',
    metaDescription:
      'Beşiktaş, Etiler, Ulus, Levent ve Bebek çatı dubleks terasları ve rezidansları için Somfy motorlu giyotin cam, bioklimatik pergola ve ısı yalıtımlı alüminyum doğrama.',
    keywords: [
      'Beşiktaş cam balkon',
      'Etiler motorlu giyotin cam',
      'Levent alüminyum doğrama',
      'Bebek teras kapatma',
      'Ulus kış bahçesi',
    ],
    heroImage: '/images/seo/hizmet-motorlu-giyotin.jpg',
    heroImageAlt: 'Beşiktaş Etiler ve Ulus çatı dubleks teraslarında Somfy motorlu giyotin cam uygulaması — Çelikpen',
    heroImageTitle: 'Beşiktaş, Etiler, Levent ve Bebek Teras ve Giyotin Cam Sistemleri',
    aiSummary:
      'Beşiktaş, Etiler, Levent, Ulus ve Bebek’teki çatı dubleks terasları, Boğaz manzaralı rezidanslar ve prestijli ticari mekanlar için Somfy motorlu giyotin cam, panoramik ısıcamlı sürme ve bioklimatik pergola çözümleri ücretsiz mimari keşifle uygulanır.',
    architecturalContextHeading: 'Boğaz Hattı Çatı Dubleks Terasları ve Prestijli Rezidans Mimari Çözümleri',
    architecturalContextBody:
      'Etiler, Ulus, Bebek ve Levent bölgesindeki teraslı dubleks dairelerde manzarayı kesmeyen ince profilli sistemler önceliklidir. Motorlu giyotin (hareketli küpeşte) cam sistemlerimiz açık konumda 110 cm şeffaf cam korkuluk olarak manzarayı özgür bırakırken, kapandığında Boğaz rüzgârını ve şehir gürültüsünü keser.',
    localChallenges: [
      { title: 'Boğaz Manzarası & İnce Profil İhtiyacı', detail: 'Görüş alanını daraltmayan minimal alüminyum kayıtlar ve ekstra şeffaf Low-Iron / Konfor ısıcam.' },
      { title: 'Çatı Dubleks Teras İzolasyonu', detail: 'Somfy RTS motorlu giyotin cam ve bioklimatik lamel tavanla 4 mevsim teras kullanımı.' },
      { title: 'Sessiz Montaj & Rezidans Kuralları', detail: 'Levent ve Etiler site çalışma saatlerine uyumlu, tozsuz ve titiz kadrolu montaj ekibi.' },
    ],
    recommendedSystems: [
      { title: 'Somfy Motorlu Giyotin Cam', spec: '4+16+4 Isıcam • Kumandalı Hareketli Küpeşte', href: '/hizmetlerimiz/motorlu-giyotin-cam' },
      { title: 'Bioklimatik Pergola & Teras Kış Bahçesi', spec: 'LED Aydınlatmalı • Gizli Su Tahliyeli', href: '/hizmetlerimiz/kis-bahcesi-sistemleri' },
      { title: 'Termal Alüminyum Doğrama', spec: 'Ultra İnce Profil • Yüksek Akustik Yalıtım', href: '/hizmetlerimiz/aluminyum-dograma' },
    ],
    localPriceSummary: 'Beşiktaş, Etiler, Levent ve Bebek projelerinde motorlu giyotin cam 8.400 ₺/m², bioklimatik pergola 11.500 ₺/m² başlangıç fiyatlarıyla projelendirilir.',
    faqs: [
      {
        question: 'Etiler ve Bebek’te eski teras korkuluğu sökülmeden giyotin cam takılır mı?',
        answer:
          'Evet. Giyotin sistemleri mevcut parapet duvarı üzerine veya korkuluk hattına statik takviyeli alüminyum kasa ile güvenle entegre edilebilir.',
      },
      {
        question: 'Levent ofis ve rezidansları için ses yalıtımlı alüminyum doğrama yapıyor musunuz?',
        answer:
          'Evet. Büyükdere Caddesi aksındaki trafik ve metro gürültüsüne karşı 44–46 dB akustik lamine ısıcamlı termal alüminyum ve Winsa Revotech Gold sistemleri uyguluyoruz.',
      },
      {
        question: 'Bebek ve Ortaköy’deki kafe-restoranlar için akıllı sensörlü giyotin var mı?',
        answer:
          'Somfy yağmur ve rüzgâr sensörlü, çok kanallı kumanda ile tek tuşta yönetilen ticari seri giyotin ve rolling roof sistemleri sunuyoruz.',
      },
    ],
  },
  {
    slug: 'sariyer-zekeriyakoy-tarabya-gokturk-cam-balkon',
    footerLabel: 'Sarıyer (Zekeriyaköy, Tarabya, Göktürk)',
    districtName: 'Sarıyer',
    neighborhoods: ['Zekeriyaköy', 'Tarabya', 'Göktürk', 'Kemerburgaz', 'İstinye', 'Yeniköy', 'Maslak'],
    h1: 'Sarıyer, Zekeriyaköy, Tarabya & Göktürk Villa Kış Bahçesi ve Bioklimatik Pergola',
    metaTitle: 'Zekeriyaköy, Tarabya, Göktürk & Sarıyer Kış Bahçesi & Cam Balkon 2026 | Çelikpen',
    metaDescription:
      'Sarıyer, Zekeriyaköy, Tarabya ve Göktürk müstakil villaları için 150 kg/m² kar yüküne dayanıklı kış bahçesi, bioklimatik pergola ve Panorama HS 76 kaldır-sür sistemleri.',
    keywords: [
      'Zekeriyaköy kış bahçesi',
      'Göktürk bioklimatik pergola',
      'Sarıyer cam balkon',
      'Tarabya ısıcamlı cam balkon',
      'Kemerburgaz villa doğrama',
    ],
    heroImage: '/images/seo/hizmet-kis-bahcesi.jpg',
    heroImageAlt: 'Sarıyer Zekeriyaköy ve Göktürk villalarında 4 mevsim kış bahçesi ve bioklimatik pergola — Çelikpen',
    heroImageTitle: 'Sarıyer, Zekeriyaköy, Tarabya ve Göktürk Villa Kış Bahçesi Sistemleri',
    aiSummary:
      'Sarıyer, Zekeriyaköy, Tarabya ve Göktürk’ün orman iklimi ve yoğun kış kar yüküne karşı 150 kg/m² statik dayanımlı T66 alüminyum kış bahçesi, motorlu bioklimatik pergola ve 400 kg taşıma kapasiteli Panorama HS 76 kaldır-sür kapı sistemleri uygulanır.',
    architecturalContextHeading: 'Belgrad Ormanı İklimi ve Müstakil Villa Verandaları İçin Dört Mevsim Yalıtım',
    architecturalContextBody:
      'Zekeriyaköy, Kemerburgaz, Göktürk ve Tarabya sırtları İstanbul merkezine göre kışın 3–5 °C daha soğuk ve yoğun kar yağışlıdır. Villa bahçelerindeki veranda ve havuz kenarı oturma alanlarında yüksek kar yükü statik hesabı, lamine ısıcam tavan ve termal bariyerli sürme cepheler bir arada projelendirilir.',
    localChallenges: [
      { title: 'Yüksek Kar Yükü & Orman Nemi', detail: '150 kg/m² kar yükü sertifikalı T66 alüminyum taşıyıcı karkas ve çift contalı su izolasyonu.' },
      { title: 'Geniş Bahçe Açıklıkları', detail: '400 kg kanat kapasiteli Winsa Panorama HS 76 veya termal alüminyum kaldır-sür sistemler.' },
      { title: 'Sivrisinek & Evcil Hayvan Güvenliği', detail: 'Geniş teras kapılarına özel duble plise sineklik ve yırtılmaz kedi sinekliği entegrasyonu.' },
    ],
    recommendedSystems: [
      { title: 'Bioklimatik Pergola & Kış Bahçesi', spec: '150 kg/m² Kar Yükü • Gizli Dere & LED', href: '/hizmetlerimiz/kis-bahcesi-sistemleri' },
      { title: 'Winsa Panorama HS 76 & Revotech', spec: 'Uw: 0.79 • Villa Cephe Doğraması', href: '/hizmetlerimiz/pimapen-pvc-dograma' },
      { title: 'Duble Kapı Plise & Kedi Sinekliği', spec: 'Geniş Veranda Çıkışlarına Özel', href: '/hizmetlerimiz/sineklik-sistemleri' },
    ],
    localPriceSummary: 'Zekeriyaköy, Göktürk ve Sarıyer villa projelerinde yerinde statik keşif ile net anahtar teslim fiyatlandırma yapılır; ücretsiz 3D sistem danışmanlığı dahildir.',
    faqs: [
      {
        question: 'Zekeriyaköy ve Göktürk’te yoğun kar yağışında kış bahçesi tavanı çöker mi?',
        answer:
          'Hayır. Taşıyıcı çelik takviyeli T66 alüminyum profillerimiz ve 4+4 lamine ısıcam tavan panellerimiz 150 kg/m² kar yükü mühendislik hesabıyla üretilir.',
      },
      {
        question: 'Villa verandasında ahşap desenli alüminyum veya PVC renkleri mevcut mu?',
        answer:
          'Evet. Altın Meşe, Ceviz, Antrasit RAL 7016 ve Mat Siyah renk seçenekleriyle doğa ve villa cephe mimarisine tam uyum sağlanır.',
      },
      {
        question: 'Tarabya ve İstinye’deki apartman daireleri için ısıcamlı cam balkon yapıyor musunuz?',
        answer:
          'Evet. Boğaz rüzgârına dayanıklı 4+20+4 mm argonlu Şişecam Konfor ısıcamlı katlanır ve sürme sistemleri aynı hafta içinde monte ediyoruz.',
      },
    ],
  },
  {
    slug: 'basaksehir-bahcesehir-cam-balkon',
    footerLabel: 'Başakşehir (Bahçeşehir)',
    districtName: 'Başakşehir',
    neighborhoods: ['Bahçeşehir 1. Kısım', 'Bahçeşehir 2. Kısım', 'Ispartakule', 'Kayaşehir', 'Başakşehir Merkez'],
    h1: 'Başakşehir & Bahçeşehir Yüksek Katlı Konutlarda Güvenli Isıcamlı Cam Balkon',
    metaTitle: 'Başakşehir & Bahçeşehir Cam Balkon Fiyatları 2026 | Yüksek Kat Güvenliği | Çelikpen',
    metaDescription:
      'Başakşehir, Bahçeşehir, Ispartakule ve Kayaşehir yüksek katlı rezidans ve siteleri için EN 12210 C4 rüzgâr dayanımlı 10 mm ve 4+20+4 ısıcamlı cam balkon sistemleri.',
    keywords: [
      'Başakşehir cam balkon',
      'Bahçeşehir cam balkon',
      'Ispartakule ısıcamlı cam balkon',
      'Kayaşehir cam balkon fiyatları',
      'Bahçeşehir Winsa PVC',
    ],
    heroImage: '/images/seo/hizmet-cam-balkon.jpg',
    heroImageAlt: 'Başakşehir ve Bahçeşehir yüksek katlı sitelerde 4+20+4 ısıcamlı güvenli cam balkon uygulaması — Çelikpen',
    heroImageTitle: 'Başakşehir ve Bahçeşehir Yüksek Katlı Cam Balkon Sistemleri',
    aiSummary:
      'Başakşehir, Bahçeşehir, Ispartakule ve Kayaşehir’in yüksek rakımlı ve sert rüzgâr koridorundaki çok katlı blokları için EN 12210 C4 sınıfı rüzgâr kilitli, 10 mm temperli veya 4+20+4 mm argonlu ısıcamlı cam balkon ve Winsa Revotech Gold 84 mm sistemleri uygulanır.',
    architecturalContextHeading: 'Yüksek Rakım ve Rüzgâr Koridorundaki Çok Katlı Bloklar İçin Statik Güvenlik',
    architecturalContextBody:
      'Bahçeşehir Gölet çevresi, Ispartakule ve Kayaşehir’deki 15–30 katlı konut kulelerinde rüzgâr basıncı zemin kata göre 2,5 kat daha fazladır. Bu bölgede 8 mm ince tek cam yerine mutlaka kalın etli profil, çift sıra paslanmaz rulman, çelik rüzgâr kilidi ve 10 mm temperli veya 4+20+4 mm çift temperli ısıcam kullanılması gerekir.',
    localChallenges: [
      { title: 'Yüksek Kat Rüzgâr Basıncı & Islık Sesi', detail: 'Alüminyum mıknatıslı fitil, orta kilit ve EN 12210 C4 sınıfı yüksek statik dayanımlı kasa.' },
      { title: 'Sert Kış Soğukları & Kombi Tasarrufu', detail: 'Uw: 1.1 W/m²K ısıcamlı balkon ve Winsa Revotech Gold 84 mm ile %72’ye varan ısı tasarrufu.' },
      { title: 'Çocuk & Evcil Hayvan Güvenliği', detail: 'Tüm kanatlarda ücretsiz çocuk emniyet kilidi ve yırtılmaz kedi sinekliği entegrasyonu.' },
    ],
    recommendedSystems: [
      { title: '4+20+4 Argonlu Isıcamlı Cam Balkon', spec: 'Çift Temperli • Rüzgâr Kilitli Yüksek Kat Serisi', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Winsa Revotech Gold 84 mm PVC', spec: '7 Odacık • 3 Conta • Sıfır Rüzgâr Islığı', href: '/hizmetlerimiz/pimapen-pvc-dograma' },
      { title: 'Yırtılmaz Kedi & Plise Sineklik', spec: 'Yüksek Kat Güvenlik Kilitli Tül', href: '/hizmetlerimiz/sineklik-sistemleri' },
    ],
    localPriceSummary: 'Başakşehir, Bahçeşehir ve Kayaşehir’de 5+ daire toplu site başvurularında %15 indirim ve ücretsiz lazerli keşif avantajı sunulmaktadır.',
    faqs: [
      {
        question: 'Bahçeşehir’de 20. katta cam balkon rüzgârda esner veya ses yapar mı?',
        answer:
          '3 mm et kalınlıklı kasa profili, kanat arası alüminyum mıknatıslı fitil ve üst-alt rüzgâr kilidiyle 20+ katlarda dahi esneme ve rüzgâr ıslığı tamamen engellenir.',
      },
      {
        question: 'Bahçeşehir villa ve bahçe katları için kış bahçesi uyguluyor musunuz?',
        answer:
          'Evet. Bahçeşehir 1. ve 2. Kısım villalarında bioklimatik pergola, cam tavan kış bahçesi ve ısıcamlı eşiksiz sürme kapama projeleri yapıyoruz.',
      },
      {
        question: 'Kayaşehir ve Ispartakule sitelerinde renk standartlarına uyum sağlıyor musunuz?',
        answer:
          'Tüm site yönetimlerinin belirlediği Antrasit Gri RAL 7016, Füme cam veya Bronz cam kombinasyonlarına %100 uyumlu üretim gerçekleştiriyoruz.',
      },
    ],
  },
  {
    slug: 'beylikduzu-cam-balkon',
    footerLabel: 'Beylikdüzü',
    districtName: 'Beylikdüzü',
    neighborhoods: ['Yakuplu', 'Kavaklı', 'Adnan Kahveci', 'Barış', 'Büyükşehir', 'Gürpınar', 'Marmara'],
    h1: 'Beylikdüzü Cam Balkon, Isıcamlı Balkon & Rüzgâr İzolasyonu (2026 Fiyatları)',
    metaTitle: 'Beylikdüzü Cam Balkon & Isıcamlı Cam Balkon Fiyatları 2026 | Çelikpen',
    metaDescription:
      'Beylikdüzü (Yakuplu, Kavaklı, Adnan Kahveci, Gürpınar) geniş balkonları için fırtına ve lodos rüzgârına tam dayanıklı 4+20+4 ısıcamlı ve eşiksiz sürme cam balkon sistemleri.',
    keywords: [
      'Beylikdüzü cam balkon',
      'Yakuplu cam balkon',
      'Adnan Kahveci ısıcamlı cam balkon',
      'Beylikdüzü pimapen tamircisi',
      'Beylikdüzü cam balkon fiyatları 2026',
    ],
    heroImage: '/images/seo/bolge-avrupa-yakasi.jpg',
    heroImageAlt: 'Beylikdüzü Yakuplu ve Adnan Kahveci geniş balkonlarında ısıcamlı cam balkon uygulaması — Çelikpen',
    heroImageTitle: 'Beylikdüzü Cam Balkon ve Isıcamlı Sistemler 2026',
    aiSummary:
      'Beylikdüzü’nün geniş metrekareli balkonları ve sert Marmara rüzgârına karşı fırtına tahliye kanallı, alüminyum mıknatıslı fitilli 4+20+4 mm ısıcamlı katlanır ve eşiksiz sürme cam balkon sistemleri Çelikpen fabrika garantisiyle uygulanır.',
    architecturalContextHeading: 'Beylikdüzü Geniş Balkonları ve Sert Lodos Rüzgârı İçin Maksimum Sızdırmazlık',
    architecturalContextBody:
      'Adnan Kahveci, Yakuplu Marina, Kavaklı ve Büyükşehir mahallelerindeki modern konutlarda balkonlar 10–25 m² gibi geniş ölçülere sahiptir. Açık coğrafi konumu nedeniyle yıl boyunca şiddetli rüzgâr alan Beylikdüzü’nde su ve soğuk hava sızdırmazlığı için 4+20+4 mm argonlu ısıcamlı sistemler ve takviyeli alt-üst raylar hayati önem taşır.',
    localChallenges: [
      { title: 'Geniş Cepheli L ve U Balkonlar', detail: 'Direksiz 90°/135° köşe dönüşlü katlanır veya 5 raylı eşiksiz sürme mekanizma seçenekleri.' },
      { title: 'Sert Kış Rüzgârı & Fırtına Suyu', detail: 'Fırtına tahliye oluğu, çift EPDM conta ve 10 mm / 28 mm ısıcam ile tam koruma.' },
      { title: 'Yüksek Rüzgârlı Pimapen Bakımı', detail: 'Rüzgâr alan PVC pencerelerde EPDM conta yenileme ve kışlık baskı ayarı servisi.' },
    ],
    recommendedSystems: [
      { title: '4+20+4 Argonlu Isıcamlı Cam Balkon', spec: 'Geniş Balkonları 4 Mevsim Odaya Çevirir', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Motorlu Giyotin & Teras Kapama', spec: 'Yakuplu & Gürpınar Dubleks Terasları İçin', href: '/hizmetlerimiz/motorlu-giyotin-cam' },
      { title: 'Pimapen Conta & Cam Balkon Tamiri', spec: 'Rüzgâr Sesi ve Su Alma Kesin Çözümü', href: '/hizmetlerimiz/pimapen-cam-balkon-tamiri' },
    ],
    localPriceSummary: 'Beylikdüzü geneli ücretsiz lazerli keşif ve fabrika fiyatlarıyla 2026 cam balkon m² fiyatları 3.650 ₺’den başlamaktadır.',
    faqs: [
      {
        question: 'Beylikdüzü’ndeki geniş L balkonlarda sürme mi katlanır mı daha uygundur?',
        answer:
          'Balkon içinde masa ve oturma grubu konumlandıracaksanız içeri açılma payı sıfır olan ısıcamlı eşiksiz sürme sistem; balkonun tamamını yazın açmak istiyorsanız ısıcamlı katlanır sistem önerilir.',
      },
      {
        question: 'Yakuplu Marina ve Gürpınar sahil hattında rüzgârda su alma sorunu yaşanır mı?',
        answer:
          'Eğimli damlalık kasa profili, su tahliye kanalları ve UV dayanımlı poliüretan dış izolasyon sayesinde en sert Marmara fırtınasında dahi su almaz.',
      },
      {
        question: 'Beylikdüzü’ne keşif ve montaj ekibiniz ne kadar sürede gelir?',
        answer:
          'Haftanın 6 günü Beylikdüzü’ne düzenli ücretsiz keşif ve montaj servisi sağlıyoruz; ölçü sonrası 7–10 iş gününde teslim ediyoruz.',
      },
    ],
  },
  {
    slug: 'buyukcekmece-cam-balkon',
    footerLabel: 'Büyükçekmece',
    districtName: 'Büyükçekmece',
    neighborhoods: ['Mimaroba', 'Sinanoba', 'Alkent 2000', 'Kumburgaz', 'Güzelce', 'Dizdariye', 'Tepecik'],
    h1: 'Büyükçekmece, Mimaroba, Sinanoba & Alkent 2000 Kış Bahçesi ve Cam Balkon',
    metaTitle: 'Büyükçekmece, Mimaroba & Alkent 2000 Cam Balkon ve Kış Bahçesi 2026 | Çelikpen',
    metaDescription:
      'Büyükçekmece sahil villaları, Alkent 2000, Mimaroba ve Sinanoba siteleri için kış bahçesi, bioklimatik pergola, eşiksiz sürme ve ısıcamlı cam balkon sistemleri.',
    keywords: [
      'Büyükçekmece cam balkon',
      'Mimaroba cam balkon',
      'Alkent 2000 kış bahçesi',
      'Sinanoba ısıcamlı cam balkon',
      'Güzelce bioklimatik pergola',
    ],
    heroImage: '/images/seo/hizmet-kis-bahcesi.jpg',
    heroImageAlt: 'Büyükçekmece Mimaroba ve Alkent 2000 villaları için kış bahçesi ve ısıcamlı cam balkon — Çelikpen',
    heroImageTitle: 'Büyükçekmece, Mimaroba ve Alkent 2000 Kış Bahçesi ve Cam Balkon',
    aiSummary:
      'Büyükçekmece’nin Mimaroba, Sinanoba, Güzelce ve Alkent 2000 bölgelerindeki sahil villaları ve yazlık-kışlık konutlar için deniz iklimine dayanıklı bioklimatik pergola, kış bahçesi, eşiksiz sürme cam balkon ve Winsa PVC doğrama sistemleri sunulur.',
    architecturalContextHeading: 'Sahil Villaları ve Göl-Deniz İklimi İçin Dört Mevsim Yaşam Alanları',
    architecturalContextBody:
      'Alkent 2000, Güzelce, Kumburgaz ve Mimaroba’da geniş bahçe verandaları ve deniz manzaralı teraslar öne çıkar. Yazın yakıcı güneşini Solar Low-E Şişecam Konfor cam ile %40’a kadar kırarken, kışın denizden gelen rutubetli soğuğu kesen ısıcamlı kış bahçesi ve sürme cam sistemleri tercih edilmektedir.',
    localChallenges: [
      { title: 'Yaz Güneşi & Sera Etkisi Kontrolü', detail: 'Şişecam Konfor (Solar Low-E) cam ile yazın klima yükünü azaltan güneş kontrolü.' },
      { title: 'Göl ve Deniz Kenarı Nem Korozyonu', detail: 'Paslanmaz çelik aksesuar, QUALICOAT fırın boya ve yüksek sızdırmazlıklı EPDM conta.' },
      { title: 'Geniş Veranda & Havuz Kenarı Kapatma', detail: 'Bioklimatik pergola + eşiksiz sürme cam entegrasyonuyla 12 ay kullanım.' },
    ],
    recommendedSystems: [
      { title: 'Bioklimatik Pergola & Villa Kış Bahçesi', spec: 'Alkent 2000 & Güzelce Villalarına Özel', href: '/hizmetlerimiz/kis-bahcesi-sistemleri' },
      { title: 'Isıcamlı Eşiksiz Sürme & Katlanır Balkon', spec: 'Mimaroba & Sinanoba Geniş Balkonlar', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Plise & Yırtılmaz Kedi Sinekliği', spec: 'Göl/Sahil Hattı Sivrisinek Koruması', href: '/hizmetlerimiz/sineklik-sistemleri' },
    ],
    localPriceSummary: 'Büyükçekmece’nin tüm mahallelerinde ücretsiz yerinde keşif ve aracısız fabrika fiyatlarıyla anahtar teslim uygulama yapılır.',
    faqs: [
      {
        question: 'Güzelce ve Kumburgaz sahil villalarında yazın cam balkon içi çok ısınır mı?',
        answer:
          'Güneş kontrollü Şişecam Isıcam Konfor (Solar Low-E) cam kullanıldığında güneş ısısı dışarı yansıtılır; ayrıca katlanır veya sürme kanatlar tamamen açılarak doğal serinlik sağlanır.',
      },
      {
        question: 'Büyükçekmece göl kenarında sivrisineklere karşı cam balkona sineklik takılır mı?',
        answer:
          'Evet. Cam balkon kanatlarıyla tam uyumlu çalışan yatay plise sineklik ve yırtılmaz kedi sinekliği sistemlerimizi birlikte uyguluyoruz.',
      },
      {
        question: 'Alkent 2000’de villa pencerelerinin tamamını Winsa PVC ile yeniliyor musunuz?',
        answer:
          'Evet. Winsa Revotech Gold 84 mm ve Panorama HS 76 kaldır-sür sistemleriyle tüm villa doğrama yenileme projelerini anahtar teslim gerçekleştiriyoruz.',
      },
    ],
  },
  {
    slug: 'sisli-cam-balkon',
    footerLabel: 'Şişli',
    districtName: 'Şişli',
    neighborhoods: ['Nişantaşı', 'Mecidiyeköy', 'Bomonti', 'Fulya', 'Esentepe', 'Osmanbey', 'Kurtuluş'],
    h1: 'Şişli, Nişantaşı, Mecidiyeköy & Bomonti Akustik Cam Balkon ve Alüminyum Doğrama',
    metaTitle: 'Şişli, Nişantaşı & Bomonti Akustik Cam Balkon ve PVC Doğrama 2026 | Çelikpen',
    metaDescription:
      'Şişli, Nişantaşı, Mecidiyeköy ve Bomonti’nin yoğun şehir gürültüsüne karşı -46 dB akustik Winsa PVC pencere, ısıcamlı cam balkon ve modern alüminyum doğrama sistemleri.',
    keywords: [
      'Şişli cam balkon',
      'Nişantaşı alüminyum doğrama',
      'Mecidiyeköy ses yalıtımlı pencere',
      'Bomonti cam balkon',
      'Şişli pimapen tamircisi',
    ],
    heroImage: '/images/seo/hizmet-aluminyum-dograma.jpg',
    heroImageAlt: 'Şişli Nişantaşı ve Bomonti’de yüksek ses yalıtımlı alüminyum doğrama ve ısıcamlı cam balkon — Çelikpen',
    heroImageTitle: 'Şişli, Nişantaşı, Mecidiyeköy ve Bomonti Akustik Cam & Doğrama',
    aiSummary:
      'Şişli, Nişantaşı, Mecidiyeköy ve Bomonti’deki yüksek trafik gürültüsüne maruz konut ve ofisler için -46 dB akustik Winsa Revotech Gold 84 mm PVC, ısı yalıtımlı alüminyum doğrama ve -38 dB ısıcamlı cam balkon sistemleri sunulur.',
    architecturalContextHeading: 'Yoğun Şehir Trafiğinde Maksimum Akustik Sessizlik ve Modern Cephe Estetiği',
    architecturalContextBody:
      'Mecidiyeköy, Halaskargazi, Fulya ve Bomonti aksında daire ve ofislerin en büyük problemi gün boyu süren trafik ve siren gürültüsü ile egzoz tozudur. Çelikpen, bu bölgede 3 contalı (orta conta) 84 mm Winsa Revotech Gold PVC doğrama, akustik lamine ısıcam ve termal alüminyum sistemlerle iç mekanda keskin sessizlik sağlar.',
    localChallenges: [
      { title: 'Yoğun Trafik & Şehir Gürültüsü', detail: '-46 dB’e ulaşan 3 contalı akustik PVC doğrama ve 4+20+4 mm ısıcamlı balkon bariyeri.' },
      { title: 'Nişantaşı & Kurtuluş Tarihi Bina Dokusu', detail: 'Mevcut cephe estetiğini bozmayan ince kayıtlı alüminyum ve özel renkli doğrama çözümleri.' },
      { title: 'Dar Şehir Balkonları & Alan Kazanımı', detail: 'İçe açılma payı olmayan eşiksiz sürme cam balkon ve plise sineklik uygulamaları.' },
    ],
    recommendedSystems: [
      { title: 'Winsa Revotech Gold 84 mm (Akustik)', spec: '7 Odacık • 3 Conta • -46 dB Ses Yalıtımı', href: '/hizmetlerimiz/pimapen-pvc-dograma' },
      { title: 'Isı Yalıtımlı Alüminyum Doğrama', spec: 'Nişantaşı & Bomonti Ofis/Rezidans Cepheleri', href: '/hizmetlerimiz/aluminyum-dograma' },
      { title: 'Isıcamlı & Eşiksiz Sürme Cam Balkon', spec: 'Dar Balkonlarda Tam Yalıtım ve Sessizlik', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
    ],
    localPriceSummary: 'Şişli, Nişantaşı, Mecidiyeköy ve Bomonti’de ücretsiz keşif ve ses yalıtımı odaklı teknik projelendirme hizmeti verilmektedir.',
    faqs: [
      {
        question: 'Mecidiyeköy ana cadde üzerindeki dairemde trafik sesini tamamen kesebilir miyim?',
        answer:
          'Winsa Revotech Gold 84 mm (3 contalı) kasa ile akustik lamine ısıcam kombinasyonu dış ortam gürültüsünü 44–46 dB oranında düşürerek yüksek düzeyde sessizlik sağlar.',
      },
      {
        question: 'Nişantaşı ve Osmanbey’de mağaza vitrini ve ofis bölme doğraması yapıyor musunuz?',
        answer:
          'Evet. Ticari vitrinler için temperli güvenlik camlı ısı yalıtımlı/Aldoks alüminyum doğrama ve motorlu giyotin cephe uygulamaları yapıyoruz.',
      },
      {
        question: 'Şişli’de eski pimapen pencerelerim için sadece conta ve ayar tamiri alabilir miyim?',
        answer:
          'Evet. Mobil teknik servisimizle EPDM conta değişimi, ispanyolet kilit tamiri ve kanat baskı ayarı hizmeti veriyoruz.',
      },
    ],
  },
  {
    slug: 'bahcelievler-cam-balkon',
    footerLabel: 'Bahçelievler',
    districtName: 'Bahçelievler',
    neighborhoods: ['Kocasinan Merkez', 'Şirinevler', 'Siyavuşpaşa', 'Soğanlı', 'Yenibosna', 'Hürriyet', 'Zafer', 'Çobançeşme', 'Cumhuriyet', 'Fevzi Çakmak', 'Bahçelievler Merkez'],
    h1: 'Bahçelievler Cam Balkon, Winsa PVC & Kentsel Dönüşüm Doğrama Merkezi',
    metaTitle: 'Bahçelievler Cam Balkon & Pimapen Fiyatları 2026 | Kocasinan Fabrika | Çelikpen',
    metaDescription:
      'Kocasinan Merkez üretim tesisimizden Bahçelievler’in tüm 11 mahallesine aynı gün ücretsiz lazerli keşif, aracısız fabrika fiyatıyla ısıcamlı cam balkon, Winsa PVC ve %15 toplu bina indirimi.',
    keywords: [
      'Bahçelievler cam balkon',
      'Kocasinan cam balkon',
      'Şirinevler ısıcamlı cam balkon',
      'Siyavuşpaşa cam balkon',
      'Bahçelievler pimapen tamircisi',
    ],
    heroImage: '/images/seo/hizmet-cam-balkon.jpg',
    heroImageAlt: 'Bahçelievler Kocasinan Merkez fabrikasından 4+20+4 ısıcamlı cam balkon uygulaması — Çelikpen',
    heroImageTitle: 'Bahçelievler Cam Balkon ve Pimapen Üretim Merkezi',
    aiSummary:
      '1996’dan beri Bahçelievler Kocasinan Merkez’de (Kızılelma Cad. No: 30/C) üretim yapan Çelikpen, Bahçelievler’in tüm 11 mahallesinde aynı gün ücretsiz lazerli keşif, aracısız fabrika fiyatı, 10 yıl garanti ve 5+ daire kentsel dönüşüm projelerinde %15 toplu indirim sunar.',
    architecturalContextHeading: 'Kocasinan Merkez Fabrika Avantajı, E-5 Ses Yalıtımı ve Kentsel Dönüşüm Standartları',
    architecturalContextBody:
      'Showroom ve üretim tesisimizin Bahçelievler Kocasinan Merkez’de yer alması sayesinde tüm 11 mahallede (Şirinevler, Siyavuşpaşa, Soğanlı, Yenibosna, Hürriyet, Zafer, Çobançeşme, Cumhuriyet, Fevzi Çakmak, Bahçelievler Merkez) en hızlı keşif, en kısa üretim süresi ve montaj sonrası anında teknik servis desteği sağlıyoruz.',
    localChallenges: [
      { title: 'E-5 & Mahmutbey Cad. Gürültüsü', detail: 'Şirinevler, Çobançeşme ve Kocasinan aksında -38 dB ısıcamlı balkon ve -46 dB Revotech Gold PVC.' },
      { title: 'Yeni Kentsel Dönüşüm Apartmanları', detail: '5 ve üzeri daireli binalarda %15 toplu bina indirimi ve ücretsiz 4/5 muvafakatname desteği.' },
      { title: 'Bitişik Nizam Mahremiyet İhtiyacı', detail: 'Siyavuşpaşa ve Fevzi Çakmak ara sokaklarında alt %40 kumlama buzlu veya füme cam seçeneği.' },
    ],
    recommendedSystems: [
      { title: '4+20+4 Argonlu Isıcamlı Cam Balkon', spec: 'Kocasinan Fabrika Fiyatı • 10 Yıl Garanti', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Winsa Dorado 76 & Revotech Gold PVC', spec: 'Bahçelievler Yetkili Bayi Montajı', href: '/hizmetlerimiz/pimapen-pvc-dograma' },
      { title: 'Aynı Gün Pimapen & Cam Balkon Tamiri', spec: 'Kocasinan Merkez’den Hızlı Teknik Servis', href: '/hizmetlerimiz/pimapen-cam-balkon-tamiri' },
    ],
    localPriceSummary: 'Bahçelievler’de 2026 cam balkon m² fiyatları 3.650 ₺’den başlar; Kocasinan Merkez showroomumuzda tüm sistem kesitlerini canlı inceleyebilirsiniz.',
    faqs: [
      {
        question: 'Kocasinan Merkez showroomunuzu ziyaret edip cam ve profil örneklerini görebilir miyim?',
        answer:
          'Evet. Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C Bahçelievler adresindeki showroomumuz Pazartesi–Cumartesi 08:30–19:30 arası açıktır.',
      },
      {
        question: 'Bahçelievler’deki yeni kentsel dönüşüm binamızda toplu indirim alabilir miyiz?',
        answer:
          '5 ve üzeri dairenin birlikte sipariş verdiği apartman projelerinde net %15 toplu bina indirimi ve tek tip RAL 7016 cephe standardı uygulanır.',
      },
      {
        question: 'Kombi bacası olan Bahçelievler balkonlarına cam balkon yapılıyor mu?',
        answer:
          'Evet. Temperleme öncesi CNC lazer kesimli hermetik kombi baca çıkışı ve İGDAŞ uyumlu menfez açıklığıyla güvenli montaj yapılır.',
      },
    ],
  },
  {
    slug: 'kucukcekmece-cam-balkon',
    footerLabel: 'Küçükçekmece',
    districtName: 'Küçükçekmece',
    neighborhoods: ['Halkalı', 'Atakent', 'Sefaköy', 'Cennet', 'Florya Beşyol', 'Kanarya', 'İnönü'],
    h1: 'Küçükçekmece, Halkalı, Atakent & Sefaköy Cam Balkon ve Winsa PVC Sistemleri',
    metaTitle: 'Küçükçekmece, Halkalı, Atakent & Sefaköy Cam Balkon Fiyatları 2026 | Çelikpen',
    metaDescription:
      'Küçükçekmece, Halkalı, Atakent siteleri, Cennet ve Sefaköy için göl nemine ve uçak/trafik sesine karşı ısıcamlı cam balkon, Winsa PVC doğrama ve plise sineklik.',
    keywords: [
      'Küçükçekmece cam balkon',
      'Halkalı Atakent cam balkon',
      'Sefaköy ısıcamlı cam balkon',
      'Cennet Mahallesi pimapen',
      'Küçükçekmece cam balkon fiyatları 2026',
    ],
    heroImage: '/images/seo/hizmet-pimapen-pvc.jpg',
    heroImageAlt: 'Küçükçekmece Halkalı Atakent ve Sefaköy’de Winsa PVC doğrama ve ısıcamlı cam balkon uygulaması — Çelikpen',
    heroImageTitle: 'Küçükçekmece, Halkalı, Atakent ve Sefaköy Cam Balkon ve PVC',
    aiSummary:
      'Küçükçekmece’nin Halkalı, Atakent, Sefaköy ve Cennet mahallelerindeki site ve yeni konut projelerinde göl nemi, yoğuşma ve E-5/Basın Ekspres gürültüsüne karşı 4+20+4 mm ısıcamlı cam balkon ve Winsa PVC doğrama sistemleri uygulanır.',
    architecturalContextHeading: 'Göl Nemine Karşı Yoğuşma Kontrolü ve Atakent Site Standartları',
    architecturalContextBody:
      'Küçükçekmece Gölü çevresi, Cennet, Sefaköy ve Halkalı Atakent sitelerinde yüksek bağıl nem nedeniyle standart tek camlı balkonlarda kışın yoğun cam terlemesi oluşur. Argon gazlı Low-E Şişecam üniteleri cam iç yüzey sıcaklığını yüksek tutarak yoğuşmayı ve küf oluşumunu önler.',
    localChallenges: [
      { title: 'Göl & Sahil Kaynaklı Yüksek Nem', detail: '4+20+4 mm Argonlu Low-E ısıcam ile yoğuşma ve terleme kontrolü.' },
      { title: 'Atakent & Halkalı Büyük Site Blokları', detail: 'Site cephe renklerine %100 uyumlu antrasit, bronz ve füme cam standartları.' },
      { title: 'Sefaköy & Cennet E-5 Trafik Gürültüsü', detail: '3 contalı Winsa Revotech Gold 84 mm ile -46 dB akustik yalıtım.' },
    ],
    recommendedSystems: [
      { title: 'Winsa PVC Pencere & Kapı Sistemleri', spec: 'Dorado 76 & Revotech Gold • Nem/Ses Bariyeri', href: '/hizmetlerimiz/pimapen-pvc-dograma' },
      { title: 'Isıcamlı & Katlanır Cam Balkon', spec: 'Terleme Yapmayan 4+20+4 Argonlu Seri', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Plise & Yırtılmaz Kedi Sinekliği', spec: 'Göl Çevresi Sivrisinek ve Evcil Hayvan Koruması', href: '/hizmetlerimiz/sineklik-sistemleri' },
    ],
    localPriceSummary: 'Küçükçekmece’nin tüm mahallelerine Kocasinan Merkez’den 15 dakikada ücretsiz lazerli keşif ve fabrika fiyatı sunulur.',
    faqs: [
      {
        question: 'Halkalı Atakent sitelerinde cam balkon rengi konusunda yönetim onayı alınıyor mu?',
        answer:
          'Atakent’teki büyük sitelerin renk standartlarını biliyoruz; yönetim planındaki RAL koduna uygun profil ve cam rengiyle sorunsuz montaj yapıyoruz.',
      },
      {
        question: 'Küçükçekmece Gölü yakınında kışın camlarda buğulanma olmaması için ne önerirsiniz?',
        answer:
          'Tek camlı sistem yerine 28 mm (4+20+4) argon gazlı Şişecam Sinerji veya Konfor ısıcamlı cam balkon tercih edilmesi buğulanmayı büyük ölçüde ortadan kaldırır.',
      },
      {
        question: 'Sefaköy ve Cennet’te eski pimapen tamiri ve conta değişimi yapıyor musunuz?',
        answer:
          'Evet. Aynı gün mobil servisimizle conta değişimi, ispanyolet tamiri ve pencere kışlık ayarı yapıyoruz.',
      },
    ],
  },
  {
    slug: 'zeytinburnu-cam-balkon',
    footerLabel: 'Zeytinburnu',
    districtName: 'Zeytinburnu',
    neighborhoods: ['Kazlıçeşme', 'Veliefendi', 'Merkezefendi', 'Cevizlibağ', 'Seyitnizam', 'Beştelsiz'],
    h1: 'Zeytinburnu, Kazlıçeşme & Merkezefendi Rezidans Cam Balkon ve Alüminyum Sistemler',
    metaTitle: 'Zeytinburnu, Kazlıçeşme & Merkezefendi Cam Balkon & Alüminyum 2026 | Çelikpen',
    metaDescription:
      'Zeytinburnu sahil rezidansları, Kazlıçeşme, Merkezefendi ve Cevizlibağ için deniz rüzgârına dayanıklı ısıcamlı cam balkon, termal alüminyum doğrama ve motorlu giyotin.',
    keywords: [
      'Zeytinburnu cam balkon',
      'Kazlıçeşme rezidans cam balkon',
      'Merkezefendi ısıcamlı cam balkon',
      'Zeytinburnu alüminyum doğrama',
      'Cevizlibağ pimapen',
    ],
    heroImage: '/images/seo/hizmet-aluminyum-dograma.jpg',
    heroImageAlt: 'Zeytinburnu Kazlıçeşme sahil rezidansları için termal alüminyum doğrama ve ısıcamlı cam balkon — Çelikpen',
    heroImageTitle: 'Zeytinburnu, Kazlıçeşme ve Merkezefendi Cam Balkon ve Alüminyum',
    aiSummary:
      'Zeytinburnu’nun Kazlıçeşme sahil hattı rezidansları, Merkezefendi ve Cevizlibağ projeleri için deniz korozyonuna dayanıklı termal alüminyum doğrama, 4+20+4 mm ısıcamlı cam balkon ve Somfy motorlu giyotin cam sistemleri Çelikpen garantisiyle uygulanır.',
    architecturalContextHeading: 'Sahil Hattı Modern Rezidansları ve E-5 Cevizlibağ Aksında Yüksek Yalıtım',
    architecturalContextBody:
      'Kazlıçeşme sahil bandındaki yüksek katlı rezidanslar yoğun Marmara rüzgârına maruz kalırken, Merkezefendi ve Cevizlibağ hattında E-5 metrobüs ve tramvay gürültüsü belirgindir. Her iki mikro bölge için de termal bariyerli alüminyum, 4+20+4 mm Konfor ısıcam ve yüksek akustik performanslı doğrama çözümleri sunuyoruz.',
    localChallenges: [
      { title: 'Kazlıçeşme Sahil Rüzgârı & Tuzlu Nem', detail: 'QUALICOAT sertifikalı alüminyum ve AISI 304 paslanmaz çelik rulman donanımı.' },
      { title: 'Cevizlibağ & E-5 Trafik Gürültüsü', detail: '-38 dB ısıcamlı balkon ve -46 dB Winsa Revotech Gold ses izolasyonu.' },
      { title: 'Rezidans Teras & Ticari Cepheler', detail: 'Somfy motorlu giyotin cam ve ince profilli termal alüminyum doğrama.' },
    ],
    recommendedSystems: [
      { title: 'Isı Yalıtımlı Alüminyum Doğrama', spec: 'Sahil Rezidansları & Ticari Mağaza Cepheleri', href: '/hizmetlerimiz/aluminyum-dograma' },
      { title: '4+20+4 Argonlu Isıcamlı Cam Balkon', spec: 'Rüzgâr Kilitli • Lodos Sızdırmaz', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Motorlu Giyotin Cam Sistemleri', spec: 'Rezidans Terasları ve Kafe Cepheleri', href: '/hizmetlerimiz/motorlu-giyotin-cam' },
    ],
    localPriceSummary: 'Zeytinburnu’nun tüm mahallelerine ücretsiz lazerli keşif ve 2026 fabrika birim fiyatlarıyla aynı hafta içinde montaj sağlanır.',
    faqs: [
      {
        question: 'Kazlıçeşme sahil rezidanslarında mevcut korkuluk üzerine cam balkon uygulanır mı?',
        answer:
          'Evet. Mevcut cam veya alüminyum korkuluk hattına özel statik takviyeli kasa profiliyle cephe bütünlüğünü bozmadan ısıcamlı sistem veya motorlu giyotin uygulanır.',
      },
      {
        question: 'Zeytinburnu’ndaki tekstil showroomları ve mağazalar için alüminyum vitrin yapıyor musunuz?',
        answer:
          'Evet. Temperli ve lamine güvenlik camlı alüminyum mağaza vitrini, ofis bölmesi ve motorlu kepenk sistemlerini anahtar teslim üretip monte ediyoruz.',
      },
      {
        question: 'Merkezefendi ve Veliefendi’de keşif ücretsiz mi?',
        answer:
          'Evet. Zeytinburnu genelinde lazerli ölçü, sistem danışmanlığı ve net fiyat teklifi tamamen ücretsizdir.',
      },
    ],
  },
  {
    slug: 'kagithane-eyupsultan-cam-balkon',
    footerLabel: 'Kağıthane & Eyüpsultan',
    districtName: 'Kağıthane & Eyüpsultan',
    neighborhoods: ['Seyrantepe', 'Hamidiye', 'Çağlayan', 'Alibeyköy', 'Eyüp Merkez', 'Rami', 'Yeşilpınar'],
    h1: 'Kağıthane & Eyüpsultan Yeni Konut Projeleri İçin Cam Balkon, PVC ve Plise Sineklik',
    metaTitle: 'Kağıthane & Eyüpsultan Cam Balkon, PVC & Plise Sineklik Fiyatları 2026 | Çelikpen',
    metaDescription:
      'Kağıthane (Seyrantepe, Hamidiye, Çağlayan) ve Eyüpsultan (Alibeyköy, Rami, Yeşilpınar) yeni rezidans ve siteleri için ısıcamlı cam balkon, Winsa PVC ve plise sineklik.',
    keywords: [
      'Kağıthane cam balkon',
      'Eyüpsultan cam balkon',
      'Seyrantepe ısıcamlı cam balkon',
      'Alibeyköy pimapen fiyatları',
      'Kağıthane plise sineklik',
    ],
    heroImage: '/images/seo/hizmet-pimapen-pvc.jpg',
    heroImageAlt: 'Kağıthane ve Eyüpsultan yeni konut sitelerinde Winsa PVC pencere ve cam balkon uygulaması — Çelikpen',
    heroImageTitle: 'Kağıthane ve Eyüpsultan Cam Balkon, PVC ve Sineklik Sistemleri',
    aiSummary:
      'Kağıthane (Seyrantepe, Hamidiye, Çağlayan) ve Eyüpsultan (Alibeyköy, Rami, Yeşilpınar) yeni konut projelerinde dar balkonlar için eşiksiz sürme cam balkon, 4+20+4 ısıcamlı katlanır sistem, Winsa PVC ve yırtılmaz kedi sinekliği fabrika fiyatlarıyla uygulanır.',
    architecturalContextHeading: 'Yeni Rezidans Projeleri, Fransız Balkonlar ve Kompakt Alan Çözümleri',
    architecturalContextBody:
      'Cendere Vadisi, Seyrantepe, Hamidiye ve Alibeyköy’de hızla yükselen yeni nesil konut sitelerinde balkon geometrileri kompakt ve antrasit cephe ağırlıklıdır. İç mekanda yer kaybettirmeyen eşiksiz sürme sistemler, cam balkon uyumlu plise sineklik ve plise perde çözümleri bu bölgede en çok tercih edilen kombinasyondur.',
    localChallenges: [
      { title: 'Kompakt & Dar Rezidans Balkonları', detail: 'İçe kanat açılma payını sıfırlayan eşiksiz sürme cam balkon ile %100 alan kazanımı.' },
      { title: 'TEM & Cendere Vadisi Trafik Sesi', detail: 'Isıcamlı balkon ve Winsa Dorado/Revotech PVC ile yüksek akustik izolasyon.' },
      { title: 'Yeni Teslim Binalarda Toplu Montaj', detail: '5+ daire site ve apartman gruplarına net %15 indirim ve hızlı teslimat.' },
    ],
    recommendedSystems: [
      { title: 'Eşiksiz Sürme & Isıcamlı Cam Balkon', spec: 'Dar Balkon Dostu • RAL 7016 Antrasit', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Winsa PVC Doğrama & Panjur', spec: 'Dorado 76 & Revotech Gold • A+ Yalıtım', href: '/hizmetlerimiz/pimapen-pvc-dograma' },
      { title: 'Plise Sineklik & Kedi Sinekliği', spec: 'Cam Balkon ve Fransız Balkonlara Özel', href: '/hizmetlerimiz/sineklik-sistemleri' },
    ],
    localPriceSummary: 'Kağıthane ve Eyüpsultan genelinde ücretsiz lazerli keşif, 2026 fabrika fiyatları ve 10 yıl garanti standarttır.',
    faqs: [
      {
        question: 'Kağıthane’deki dar balkonumda perde ve koltuk varken hangi cam balkon uygundur?',
        answer:
          'İçeriye doğru katlanmayan eşiksiz sürme cam balkon sistemi tül perdeye ve mobilyalara hiç çarpmadan tek parmakla kayarak açılır.',
      },
      {
        question: 'Eyüpsultan ve Alibeyköy’deki yeni dairem için hem cam balkon hem kedi sinekliği yapıyor musunuz?',
        answer:
          'Evet. Tek keşifte hem cam balkonunuzu hem de tüm pencereleriniz için yırtılmaz kedi sinekliği ve cam üstü plise perdelerinizi birlikte ölçülendirip monte ediyoruz.',
      },
      {
        question: 'Montaj süresi ne kadardır?',
        answer:
          'Ölçü alımından sonra ortalama 7–10 iş gününde üretim tamamlanır ve tek daire montajı 1 gün içinde temiz şekilde teslim edilir.',
      },
    ],
  },
  {
    slug: 'bagcilar-gungoren-cam-balkon',
    footerLabel: 'Bağcılar & Güngören',
    districtName: 'Bağcılar & Güngören',
    neighborhoods: ['Güneşli', 'Mahmutbey', 'Kirazlı', 'Merter', 'Haznedar', 'Tozkoparan', 'Güngören Merkez'],
    h1: 'Bağcılar, Güneşli, Merter & Güngören Cam Balkon, PVC Doğrama ve Tamir Servisi',
    metaTitle: 'Bağcılar, Güneşli, Merter & Güngören Cam Balkon & Pimapen 2026 | Çelikpen',
    metaDescription:
      'Bağcılar (Güneşli, Mahmutbey, Kirazlı) ve Güngören (Merter, Haznedar) için kentsel dönüşüm toplu bina indirimi, ısıcamlı cam balkon, Winsa PVC ve aynı gün pimapen tamiri.',
    keywords: [
      'Bağcılar cam balkon',
      'Güngören cam balkon',
      'Güneşli ısıcamlı cam balkon',
      'Merter pimapen tamircisi',
      'Haznedar cam balkon fiyatları 2026',
    ],
    heroImage: '/images/seo/hizmet-tamir-bakim.jpg',
    heroImageAlt: 'Bağcılar Güneşli ve Güngören Merter’de ısıcamlı cam balkon, PVC doğrama ve tamir servisi — Çelikpen',
    heroImageTitle: 'Bağcılar ve Güngören Cam Balkon, PVC ve Tamir Servisi',
    aiSummary:
      'Kocasinan Merkez fabrikamıza komşu Bağcılar (Güneşli, Mahmutbey, Kirazlı) ve Güngören (Merter, Haznedar) ilçelerinde aynı gün ücretsiz keşif, kentsel dönüşüm binalarında %15 toplu indirim, ısıcamlı cam balkon, Winsa PVC ve hızlı pimapen/cam balkon tamir servisi sunulur.',
    architecturalContextHeading: 'Fabrikamıza 10 Dakika Mesafede Kentsel Dönüşüm ve Hızlı Teknik Servis Avantajı',
    architecturalContextBody:
      'Bağcılar ve Güngören, üretim merkezimiz Kocasinan Merkez’e sınır komşusudur. Basın Ekspres, Güneşli ve Merter’deki yeni kentsel dönüşüm projelerinde hem komple Winsa PVC + ısıcamlı cam balkon montajı hem de mevcut dairelerde conta değişimi, tekerlek/rulman yenileme ve acil pimapen tamiri aynı gün çözüme kavuşturulur.',
    localChallenges: [
      { title: 'Basın Ekspres & E-5 Yoğun Gürültüsü', detail: 'Güneşli ve Merter aksında -46 dB Revotech Gold PVC ve -38 dB ısıcamlı cam balkon.' },
      { title: 'Kentsel Dönüşüm Toplu Apartmanlar', detail: '5+ daire toplu cam balkon ve sineklik siparişlerinde %15 bina indirimi.' },
      { title: 'Acil Pimapen & Cam Balkon Tamiri', detail: 'Aynı gün EPDM conta değişimi, pencere ayarı ve cam balkon rulman/fitil yenileme.' },
    ],
    recommendedSystems: [
      { title: 'Pimapen & Cam Balkon Tamir Servisi', spec: 'Bağcılar & Güngören Aynı Gün Mobil Servis', href: '/hizmetlerimiz/pimapen-cam-balkon-tamiri' },
      { title: '4+20+4 Isıcamlı & Katlanır Cam Balkon', spec: 'Fabrika Fiyatı • %15 Toplu Bina İndirimi', href: '/hizmetlerimiz/cam-balkon-sistemleri' },
      { title: 'Winsa Dorado 76 & Revotech Gold PVC', spec: 'Yüksek Ses ve Isı Yalıtımlı Doğrama', href: '/hizmetlerimiz/pimapen-pvc-dograma' },
    ],
    localPriceSummary: 'Bağcılar ve Güngören’de fabrika çıkış fiyatlarıyla cam balkon m² fiyatları 3.650 ₺’den, pimapen bakım servisleri 750 ₺’den başlamaktadır.',
    faqs: [
      {
        question: 'Güneşli ve Haznedar’da aynı gün pimapen tamiri ve conta değişimi yapıyor musunuz?',
        answer:
          'Evet. Kocasinan Merkez’deki atölyemiz Bağcılar ve Güngören’e 10 dakika mesafede olduğu için aynı gün içinde teknik servis yönlendiriyoruz.',
      },
      {
        question: 'Kentsel dönüşümle yeni teslim edilen binamızda komşularla birlikte indirim olur mu?',
        answer:
          'Evet. 5 ve üzeri dairenin birlikte başvurduğu projelerde net %15 toplu bina indirimi, tek tip profil rengi ve ücretsiz muvafakatname dosyası sunuyoruz.',
      },
      {
        question: 'Merter’deki ticari ofis ve atölyeler için alüminyum doğrama ve kepenk yapıyor musunuz?',
        answer:
          'Evet. Ofis ara bölme, mağaza vitrin alüminyum doğrama ve motorlu kepenk uygulamalarını kendi üretim tesisimizden teslim ediyoruz.',
      },
    ],
  },
];

export function getSeoDistrictBySlug(slug: string): SeoDistrictPageData | undefined {
  return SEO_DISTRICT_PAGES.find((item) => item.slug === slug);
}
