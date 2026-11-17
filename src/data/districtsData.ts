export interface EuropeanSideDistrict {
  slug: string;
  slugAliases?: string[];
  name: string;
  footerLabel: string;
  subDistricts: string;
  neighborhoods: string[];
  priorityRank: number;
  segmentBadge: string;
  serviceTimeFromHq: string;
  completedProjectsCount: number;
  urbanFocus: string;
  recommendedSystems: string[];
  primarySystemCode: string;
  highlightProblem: string;
  architecturalSolution: string;
  heroImage: string;
  heroImageAlt: string;
  faqs: { question: string; answer: string }[];
}

export const EUROPEAN_SIDE_DISTRICTS: EuropeanSideDistrict[] = [
  {
    slug: 'bakirkoy-cam-balkon',
    slugAliases: ['florya-cam-balkon', 'yesilkoy-cam-balkon', 'atakoy-cam-balkon'],
    name: 'Bakırköy',
    footerLabel: 'Bakırköy (Florya, Yeşilköy, Ataköy)',
    subDistricts: 'Florya, Yeşilköy, Ataköy',
    neighborhoods: [
      'Florya (Şenlikköy)',
      'Yeşilköy',
      'Ataköy (1-11. Kısım)',
      'Yeşilyurt',
      'Zuhuratbaba',
      'Kartaltepe',
      'Cevizlik',
      'Osmaniye',
      'Sakızağacı',
      'Zeytinlik',
      'Basınköy',
    ],
    priorityRank: 1,
    segmentBadge: 'Sahil Hattı & Villa / Rezidans',
    serviceTimeFromHq: '15 dk • Aynı Gün Lazerli Keşif',
    completedProjectsCount: 640,
    urbanFocus:
      'Florya ve Yeşilköy müstakil villa terasları, Ataköy sahil rezidansları ve yüksek rüzgâr yüküne maruz deniz cepheli daireler.',
    recommendedSystems: [
      'Winsa Vera Termal 4+20+4 Argonlu Isıcamlı Cam Balkon',
      'Albert Genau Tiara Twinmax & SlideMaster Eşiksiz Sürme',
      'Winsa Panorama HS 76 Hebeschiebe Kaldır-Sür & Bioklimatik Pergola',
    ],
    primarySystemCode: 'Vera Termal 4+20+4 & Bioklimatik Kış Bahçesi',
    highlightProblem:
      'Marmara Denizi poyraz/lodos fırtına basıncı (EN 12210 C4), sahil nemi korozyonu ve E-5 / sahil yolu akustik yalıtım ihtiyacı.',
    architecturalSolution:
      'Bakırköy, Florya, Yeşilköy ve Ataköy projelerimizde AISI 304 paslanmaz çelik rulmanlar, tuzlu deniz nemine dayanıklı QUALICOAT sertifikalı alüminyum profiller ve her iki yüzü TSE EN 12150 temperli 4+20+4 mm Şişecam Konfor Isıcam kullanıyoruz.',
    heroImage: '/images/references/yesilkoy-villa-kis-bahcesi-surme-cam.jpg',
    heroImageAlt:
      'Bakırköy Florya ve Yeşilköy sahil hattında ısıcamlı cam balkon ve kış bahçesi uygulaması — Çelikpen',
    faqs: [
      {
        question: 'Florya ve Yeşilköy sahil hattında tuzlu deniz nemine karşı hangi cam balkon sistemi önerilir?',
        answer:
          'Deniz nemi ve lodos rüzgârına karşı AISI 304 paslanmaz çelik 8 bilyalı rulmanlara, QUALICOAT eloksal/elektrostatik kaplamaya ve EPDM sızdırmaz contalara sahip Winsa Vera Termal veya Albert Genau Tiara Twinmax ısıcamlı sistemlerimizi öneriyoruz.',
      },
      {
        question: 'Ataköy E-5 ve sahil cepheli dairelerde ses yalıtımı kaç desibeldir?',
        answer:
          '4+20+4 mm argon gazlı ve akustik lamine opsiyonlu ısıcamlı cam balkon ve Winsa Revotech Gold 84 mm PVC doğrama sistemlerimizde dış gürültü -38 dB ile -46 dB aralığında kesilir.',
      },
      {
        question: 'Bakırköy için keşif ve montaj süresi nedir?',
        answer:
          'Kocasinan Merkez üretim tesisimiz Bakırköy sınırında yer aldığı için Florya, Yeşilköy ve Ataköy mahallelerine 15 dakika içinde ücretsiz lazerli keşif ekibi yönlendiriyoruz.',
      },
    ],
  },
  {
    slug: 'besiktas-cam-balkon',
    slugAliases: ['etiler-cam-balkon', 'levent-cam-balkon', 'ulus-cam-balkon', 'bebek-cam-balkon'],
    name: 'Beşiktaş',
    footerLabel: 'Beşiktaş (Etiler, Levent, Bebek, Ulus)',
    subDistricts: 'Etiler, Levent, Bebek, Ulus',
    neighborhoods: [
      'Etiler',
      'Levent',
      'Bebek',
      'Ulus',
      'Akatlar',
      'Arnavutköy',
      'Ortaköy',
      'Gayrettepe',
      'Dikilitaş',
      'Balmumcu',
      'Kuruçeşme',
    ],
    priorityRank: 2,
    segmentBadge: 'Boğaz Hattı, Teras & Prestij Konut',
    serviceTimeFromHq: '25 dk • Randevulu Mimari Keşif',
    completedProjectsCount: 410,
    urbanFocus:
      'Etiler, Ulus ve Bebek Boğaz manzaralı çatı dubleks terasları, Levent ve Gayrettepe prestij rezidansları ile lüks kafe/restoran cepheleri.',
    recommendedSystems: [
      'Winsa Vera Vertical Somfy Motorlu Giyotin Cam (Hareketli Küpeşte)',
      'Albert Genau Bioklimatik Pergola & Lamine Isıcam Tavan Kış Bahçesi',
      'Winsa Panorama HS 76 Kaldır-Sür & Vera Termal Panoramik Cam Balkon',
    ],
    primarySystemCode: 'Motorlu Giyotin Cam & Bioklimatik Teras',
    highlightProblem:
      'Boğaz manzarasını kesmeyen dikey profilsiz panoramik görünüm, site yönetim planı estetik kriterleri ve rüzgâr/yağmur sensörlü otomasyon beklentisi.',
    architecturalSolution:
      'Beşiktaş, Etiler, Ulus ve Bebek projelerinde görüş alanını sıfır kayıpla koruyan Somfy/Becker RTS uzaktan kumandalı motorlu giyotin cam, eşiksiz ısıcamlı sürme ve bioklimatik alüminyum pergola sistemlerini mimari şartnameye uygun kuruyoruz.',
    heroImage: '/images/references/yesilkoy-rezidans-cam-korkuluk-cephe.jpg',
    heroImageAlt:
      'Beşiktaş Etiler ve Ulus teraslarında motorlu giyotin cam ve panoramik cam balkon uygulaması — Çelikpen',
    faqs: [
      {
        question: 'Etiler ve Ulus sitelerinde yönetim planına uygun cam balkon ve kış bahçesi nasıl yapılır?',
        answer:
          'Site yönetim planındaki RAL renk koduna (Antrasit RAL 7016, Mat Siyah veya Bronz Eloksal) birebir uyumlu profiller, dış cephe silüetini bozmayan eşiksiz sürme/giyotin sistemler ve teknik şartname dosyası ile süreç eksiksiz yürütülür.',
      },
      {
        question: 'Boğaz hattındaki teraslarda motorlu giyotin cam rüzgâr sesi yapar mı?',
        answer:
          'Çift kanallı EPDM conta, fırçalı rüzgâr kapanı ve 4+16+4 mm argonlu temperli ısıcam kullanılan Vera Vertical ve Albert Genau Tambalkon sistemlerimizde fırtınalı havalarda dahi ıslık sesi oluşmaz.',
      },
    ],
  },
  {
    slug: 'sariyer-cam-balkon',
    slugAliases: ['zekeriyakoy-cam-balkon', 'tarabya-cam-balkon', 'istinye-cam-balkon'],
    name: 'Sarıyer',
    footerLabel: 'Sarıyer (Zekeriyaköy, Tarabya, İstinye, Göktürk)',
    subDistricts: 'Zekeriyaköy, Tarabya, İstinye, Göktürk',
    neighborhoods: [
      'Zekeriyaköy',
      'Tarabya',
      'İstinye',
      'Yeniköy',
      'Emirgan',
      'Bahçeköy',
      'Uskumruköy',
      'Maslak',
      'Maden',
      'Reşitpaşa',
      'Büyükdere',
    ],
    priorityRank: 3,
    segmentBadge: 'Müstakil Villa & Kış Bahçesi Uzmanı',
    serviceTimeFromHq: '30 dk • Özel Villa Keşif Ekibi',
    completedProjectsCount: 385,
    urbanFocus:
      'Zekeriyaköy, Bahçeköy ve Uskumruköy müstakil villa bahçe verandaları, Tarabya ve İstinye Boğaz sırtı terasları, Maslak yüksek katlı rezidanslar.',
    recommendedSystems: [
      'Bioklimatik Pergola & Lamine Isıcam Tavanlı Villa Kış Bahçesi',
      'Winsa Panorama HS 76 Hebeschiebe (300 kg Kanat Kapasiteli Kaldır-Sür)',
      'Winsa Revotech Gold 84 mm 7 Odacıklı 3 Contalı Pasif Ev PVC Doğrama',
    ],
    primarySystemCode: 'Villa Kış Bahçesi & Panorama HS 76',
    highlightProblem:
      'Orman ve Karadeniz iklim kuşağında kışın yoğun kar yükü (150 kg/m²), yüksek nem ve geniş bahçe açıklıklarında dört mevsim ısı yalıtımı.',
    architecturalSolution:
      'Zekeriyaköy ve Sarıyer villalarında T66 ısıl işlemli ağır hizmet alüminyum taşıyıcı konstrüksiyon, taşıyıcı dikme içinden gizli yağmur drenajı, Şişecam Isıcam Sinerji/Konfor kombinasyonu ve Somfy otomasyonlu bioklimatik tavan sistemleri uyguluyoruz.',
    heroImage: '/images/blog/bioklimatik-pergola-kis-bahcesi.jpg',
    heroImageAlt:
      'Sarıyer Zekeriyaköy ve Tarabya villalarında bioklimatik pergola ve kış bahçesi uygulaması — Çelikpen',
    faqs: [
      {
        question: 'Zekeriyaköy villalarında kış bahçesi çatı sistemi kar yüküne dayanıklı mı?',
        answer:
          'Evet. Kış bahçesi sistemlerimizde kullanılan T66 alüminyum statik taşıyıcı profiller ve 4+16+44.2 temperli+lamine güvenlikli ısıcam tavan üniteleri 150 kg/m² kar yüküne ve 2000 Pa rüzgâr basıncına göre hesaplanır.',
      },
      {
        question: 'Villa bahçe çıkışlarında eşiksiz geniş açıklık için hangi sistem kullanılmalı?',
        answer:
          '6.5 metreye kadar geniş açıklıklarda tek parmakla kayarak açılan, 300 kg kanat kapasiteli Winsa Panorama HS 76 Hebeschiebe veya Albert Genau SlideMaster ısıcamlı eşiksiz sürme sistemlerimizi öneriyoruz.',
      },
    ],
  },
  {
    slug: 'basaksehir-cam-balkon',
    slugAliases: ['bahcesehir-cam-balkon', 'kayasehir-cam-balkon'],
    name: 'Başakşehir',
    footerLabel: 'Başakşehir (Bahçeşehir, Kayaşehir)',
    subDistricts: 'Bahçeşehir, Kayaşehir',
    neighborhoods: [
      'Bahçeşehir 1. Kısım',
      'Bahçeşehir 2. Kısım',
      'Boğazköy',
      'Kayaşehir',
      'Başak Mah. (1-5. Etap)',
      'Başakşehir Merkez',
      'Onurkent',
      'Metrokent',
      'Ispartakule',
      'Ziya Gökalp',
    ],
    priorityRank: 4,
    segmentBadge: 'Modern Site, Villa & Yüksek Kat',
    serviceTimeFromHq: '20 dk • Aynı Gün Lazerli Keşif',
    completedProjectsCount: 720,
    urbanFocus:
      'Bahçeşehir gölet çevresi villaları, Ispartakule ve Kayaşehir yüksek katlı modern site projeleri, geniş L ve U tipi panoramik daire balkonları.',
    recommendedSystems: [
      'Winsa Vera Termal 4+20+4 Argon Gazlı Isıcamlı Cam Balkon',
      'Albert Genau Tiara Twinmax Köşe Direksiz L/U Balkon Sistemi',
      'Winsa Vera Slide Eşiksiz Sürme & Kedi Tüllü Plise Sineklik',
    ],
    primarySystemCode: 'Vera Termal 4+20+4 & 10mm Temperli Yüksek Kat',
    highlightProblem:
      'Başakşehir ve Ispartakule’nin açık vadi koridorunda 10. kat ve üzeri dairelerde şiddetli rüzgâr yükü, kış soğuğu ve site yönetimlerinin renk/profil standartları.',
    architecturalSolution:
      'Başakşehir, Bahçeşehir ve Kayaşehir sitelerinde mevcut dış cephe RAL 7016 Antrasit veya Kahve/Bronz doğramalarla %100 uyumlu, yüksek kat rüzgâr kilidine sahip 10 mm temperli veya 28 mm argonlu ısıcamlı sistemleri 10 yıl garantiyle monte ediyoruz.',
    heroImage: '/images/references/ref-7.jpg',
    heroImageAlt:
      'Başakşehir Bahçeşehir ve Kayaşehir sitelerinde ısıcamlı ve eşiksiz sürme cam balkon uygulaması — Çelikpen',
    faqs: [
      {
        question: 'Bahçeşehir ve Kayaşehir’de 15. kat üzeri dairelerde hangi cam balkon güvenlidir?',
        answer:
          'Yüksek katlı bloklarda EN 12210 rüzgâr yükü standardı gereği minimum 10 mm Şişecam temperli tek cam (Vera Pro 10) veya her iki yüzü temperli 4+20+4 mm ısıcamlı (Vera Termal) sistem ve çocuk emniyet kilidi zorunludur.',
      },
      {
        question: 'Site yönetiminin belirlediği özel profil renginde üretim yapıyor musunuz?',
        answer:
          'Evet. Kocasinan Merkez fabrikamızda Antrasit Gri (RAL 7016), Mat Siyah, Bronz Eloksal, Kumlu Gri ve ahşap desen dahil tüm site şartname renklerinde birebir üretim yapıyoruz.',
      },
    ],
  },
  {
    slug: 'beylikduzu-cam-balkon',
    slugAliases: ['yakuplu-cam-balkon', 'gurpinar-cam-balkon', 'kavakli-cam-balkon'],
    name: 'Beylikdüzü',
    footerLabel: 'Beylikdüzü (Yakuplu Marina, Gürpınar, Kavaklı)',
    subDistricts: 'Yakuplu Marina, Gürpınar, Kavaklı',
    neighborhoods: [
      'Yakuplu (West İstanbul Marina)',
      'Gürpınar',
      'Kavaklı',
      'Adnan Kahveci',
      'Barış Mahallesi',
      'Büyükşehir',
      'Cumhuriyet',
      'Dereağzı',
      'Marmara Mahallesi',
      'Sahil Mahallesi',
    ],
    priorityRank: 5,
    segmentBadge: 'Marina, Sahil & Geniş Teras Konutlar',
    serviceTimeFromHq: '25 dk • Aynı Gün Lazerli Keşif',
    completedProjectsCount: 530,
    urbanFocus:
      'Adnan Kahveci ve Büyükşehir Mahallesi geniş balkonlu modern siteleri, Yakuplu Marina ve Gürpınar deniz manzaralı villa ve teras daireleri.',
    recommendedSystems: [
      'Winsa Vera Termal 4+20+4 Isıcamlı Katlanır & Sürme Cam Balkon',
      'Winsa Revotech Gold 84 mm 3 Contalı Rüzgâr Kalkanı PVC Pencere',
      'Motorlu Giyotin Cam & Bioklimatik Pergola Teras Kapatma',
    ],
    primarySystemCode: 'Vera Termal 28mm Isıcam & Revotech Gold 84mm',
    highlightProblem:
      'Beylikdüzü platosunun yüksek rakımı ve Marmara denizinden gelen sert lodos nedeniyle oluşan rüzgâr ıslığı, su sızması ve kışın yüksek doğalgaz faturası.',
    architecturalSolution:
      'Beylikdüzü’nün yüksek rüzgâr basıncına özel olarak eğimli damlalık kasa profili, gizli fırtına su tahliye kanalları, alüminyum mıknatıslı fitiller ve çift sıra EPDM conta bariyeri ile %100 su ve rüzgâr sızdırmazlığı sağlıyoruz.',
    heroImage: '/images/blog/isicamli-cam-balkon-rehberi-2026.jpg',
    heroImageAlt:
      'Beylikdüzü Yakuplu Marina ve Adnan Kahveci mahallesinde rüzgara dayanıklı ısıcamlı cam balkon — Çelikpen',
    faqs: [
      {
        question: 'Beylikdüzü’nde lodos fırtınasında cam balkon su alır mı veya rüzgâr sesi yapar mı?',
        answer:
          'Plastik fitilli ucuz sistemler lodos basıncında esneyerek su ve ıslık sesi alır. Çelikpen’in uyguladığı Winsa Vera Termal ve Albert Genau serilerinde alüminyum mıknatıslı contalar ve fırtına drenaj kanalları sayesinde 600 Pa yağış altında dahi su sızması yaşanmaz.',
      },
      {
        question: 'Beylikdüzü geniş L balkonlarda köşe direği olmadan tam açılım mümkün mü?',
        answer:
          'Evet. Hareketli köşe takozu ve 8 bilyalı paslanmaz rulman teknolojimizle L ve U tipi balkonlarda sabit köşe profili kullanmadan tüm kanatları tek bir noktada toplayabiliyoruz.',
      },
    ],
  },
  {
    slug: 'buyukcekmece-cam-balkon',
    slugAliases: ['alkent-2000-cam-balkon', 'mimaroba-cam-balkon', 'guzelce-cam-balkon'],
    name: 'Büyükçekmece',
    footerLabel: 'Büyükçekmece (Alkent 2000, Mimaroba, Güzelce)',
    subDistricts: 'Alkent 2000, Mimaroba, Güzelce',
    neighborhoods: [
      'Alkent 2000',
      'Mimaroba',
      'Sinanoba',
      'Güzelce',
      'Kumburgaz',
      'Karaağaç',
      'Büyükçekmece Sahil',
      'Tepecik',
      'Celaliye',
      'Kamiloba',
    ],
    priorityRank: 6,
    segmentBadge: 'Göl & Sahil Villaları • Kış Bahçesi',
    serviceTimeFromHq: '30 dk • Randevulu Lazerli Keşif',
    completedProjectsCount: 310,
    urbanFocus:
      'Alkent 2000 ve Karaağaç malikâne/villa projeleri, Mimaroba ve Sinanoba sahil konutları, Güzelce ve Kumburgaz yazlık/kışlık müstakil teraslar.',
    recommendedSystems: [
      'Bioklimatik Pergola & Lamine Isıcam Tavanlı Kış Bahçesi',
      'Winsa Panorama HS 76 Hebeschiebe Kaldır-Sür Teras Kapısı',
      'Winsa Winstor Motorlu Monoblok Panjur & Kedi Sineklik Sistemleri',
    ],
    primarySystemCode: 'Bioklimatik Kış Bahçesi & Panorama HS 76',
    highlightProblem:
      'Göl ve deniz hattındaki müstakil bahçe katlarında dört mevsim iklimlendirme, yaz güneş ısısı kontrolü (Solar Low-E) ve güvenlikli panjur/doğrama ihtiyacı.',
    architecturalSolution:
      'Alkent 2000, Mimaroba ve Güzelce projelerinde yazın güneş ısısını %40 geri yansıtan Şişecam Konfor 4+20+4 ısıcam, Somfy motorlu alüminyum panjur ve dört mevsim yaşam alanı sunan bioklimatik kış bahçesi sistemleri kuruyoruz.',
    heroImage: '/images/references/yesilkoy-teras-kis-bahcesi-katlanir-cam.jpg',
    heroImageAlt:
      'Büyükçekmece Alkent 2000 ve Mimaroba villalarında kış bahçesi ve sürme cam balkon uygulaması — Çelikpen',
    faqs: [
      {
        question: 'Alkent 2000 ve Mimaroba villalarında kış bahçesi yazın sera etkisi yapar mı?',
        answer:
          'Hayır. Güney ve batı cephelerde kullandığımız Şişecam Isıcam Konfor (Solar Low-E) kaplama güneşin yakıcı kızılötesi ısısını dışarıda tutar; bioklimatik açılır tavan lamelleri ise sıcak havayı üstten tahliye eder.',
      },
    ],
  },
  {
    slug: 'sisli-cam-balkon',
    slugAliases: ['nisantasi-cam-balkon', 'bomonti-cam-balkon', 'mecidiyekoy-cam-balkon'],
    name: 'Şişli',
    footerLabel: 'Şişli (Nişantaşı, Bomonti, Mecidiyeköy)',
    subDistricts: 'Nişantaşı, Bomonti, Mecidiyeköy',
    neighborhoods: [
      'Nişantaşı (Teşvikiye)',
      'Bomonti',
      'Mecidiyeköy',
      'Esentepe',
      'Fulya',
      'Kurtuluş',
      'Osmanbey',
      'Feriköy',
      'Halaskargazi',
      'Maslak / Ayazağa Aksı',
    ],
    priorityRank: 7,
    segmentBadge: 'Rezidans, Penthouse & Akustik İzolasyon',
    serviceTimeFromHq: '25 dk • Randevulu Keşif',
    completedProjectsCount: 340,
    urbanFocus:
      'Bomonti ve Mecidiyeköy yüksek katlı rezidansları, Nişantaşı ve Teşvikiye tarihi/prestij apartmanları, cadde üstü ticari kafe ve ofis terasları.',
    recommendedSystems: [
      'Winsa Revotech Gold 84 mm (-46 dB Akustik İzolasyonlu PVC Pencere)',
      'Winsa Vera Vertical Motorlu Giyotin & Eşiksiz Isıcamlı Sürme',
      'Winsa Vera Termal 4+20+4 Akustik Isıcamlı Cam Balkon',
    ],
    primarySystemCode: 'Akustik Isıcamlı Sistem & Revotech Gold 84',
    highlightProblem:
      'Şehir merkezindeki yoğun trafik uğultusu, yüksek katlı rezidanslarda rüzgâr yükü ve dar kent balkonlarında kanat açılma alanı kısıtı.',
    architecturalSolution:
      'Şişli, Nişantaşı ve Bomonti’de içeriye kanat açılma payı olmayan Vera Slide eşiksiz sürme cam balkon ve -46 dB akustik yalıtım sağlayan Winsa Revotech Gold 84 mm doğrama sistemleriyle şehir gürültüsünü tamamen izole ediyoruz.',
    heroImage: '/images/blog/panorama-hs-76-hebeschiebe.jpg',
    heroImageAlt:
      'Şişli Nişantaşı ve Bomonti rezidanslarında akustik ısıcamlı cam balkon ve PVC doğrama — Çelikpen',
    faqs: [
      {
        question: 'Nişantaşı ve Mecidiyeköy cadde cephelerinde trafik sesini en iyi hangi sistem keser?',
        answer:
          'Sabit doğramada 84 mm 7 odacıklı 3 contalı Winsa Revotech Gold (-46 dB), açılır balkonlarda ise 4+20+4 mm argon gazlı Winsa Vera Termal (-38 dB) en yüksek akustik yalıtımı sağlar.',
      },
    ],
  },
  {
    slug: 'bahcelievler-cam-balkon',
    slugAliases: ['kocasinan-cam-balkon', 'sirinevler-cam-balkon', 'yenibosna-cam-balkon'],
    name: 'Bahçelievler',
    footerLabel: 'Bahçelievler (Merkez & Tüm Mahalleler)',
    subDistricts: 'Merkez & Tüm 11 Mahalle',
    neighborhoods: [
      'Kocasinan Merkez (Fabrika & Showroom Merkezimiz)',
      'Bahçelievler Merkez (Talatpaşa)',
      'Şirinevler',
      'Siyavuşpaşa',
      'Soğanlı',
      'Yenibosna Merkez',
      'Hürriyet',
      'Zafer',
      'Çobançeşme',
      'Cumhuriyet',
      'Fevzi Çakmak',
    ],
    priorityRank: 8,
    segmentBadge: 'Merkez Üretim Tesisi • 11 Mahalle Aynı Gün Keşif',
    serviceTimeFromHq: '10 dk • Aynı Gün Fabrika Keşfi',
    completedProjectsCount: 1387,
    urbanFocus:
      'Kocasinan Merkez üretim tesisimiz çevresindeki tüm aile apartmanları, Talatpaşa ve Şirinevler prestij konutları, Yenibosna Basın Ekspres rezidansları ve kentsel dönüşüm projeleri.',
    recommendedSystems: [
      'Winsa Vera Termal 4+20+4 Argon Gazlı Isıcamlı Cam Balkon',
      'Winsa Vera Pro 10 mm Temperli Katlanır & Vera Slide Eşiksiz Sürme',
      'Winsa Dorado 76 & Revotech Gold 84 mm PVC Pencere Sistemleri',
    ],
    primarySystemCode: 'Tüm Winsa & Albert Genau Serileri (Fabrika Satış)',
    highlightProblem:
      'E-5 ve Mahmutbey Caddesi trafik gürültüsü, bitişik nizam sokaklarda mahremiyet ihtiyacı ve yeni kentsel dönüşüm binalarında 4/5 muvafakatname uyumu.',
    architecturalSolution:
      'Merkezimiz Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C adresinde bulunduğu için Bahçelievler’in 11 mahallesine aracısız fabrika fiyatıyla, aynı gün ücretsiz lazerli keşif ve 5+ daire toplu bina siparişlerinde net %15 indirim sunuyoruz.',
    heroImage: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    heroImageAlt:
      'Bahçelievler Kocasinan Merkez üretimli ısıcamlı cam balkon ve Winsa PVC doğrama — Çelikpen',
    faqs: [
      {
        question: 'Bahçelievler’de kentsel dönüşüm binalarına toplu cam balkon indirimi var mı?',
        answer:
          'Evet. Kocasinan Merkez fabrikamızdan Bahçelievler’deki 5 ve üzeri daireli apartmanlara net %15 toplu bina indirimi ve ücretsiz 4/5 kat maliki muvafakatname dosyası desteği sağlıyoruz.',
      },
    ],
  },
  {
    slug: 'kucukcekmece-cam-balkon',
    slugAliases: ['atakent-cam-balkon', 'halkali-cam-balkon', 'cennet-cam-balkon', 'sefakoy-cam-balkon'],
    name: 'Küçükçekmece',
    footerLabel: 'Küçükçekmece (Atakent, Halkalı, Cennet)',
    subDistricts: 'Atakent, Halkalı, Cennet',
    neighborhoods: [
      'Atakent (Soyak, Avrupa Konutları, Tema İstanbul)',
      'Halkalı Merkez',
      'Cennet Mahallesi',
      'Sefaköy (Kartaltepe, Tevfikbey)',
      'Florya Sınırı / Gültepe',
      'Cumhuriyet',
      'Fatih (Küçükçekmece Göl Hattı)',
      'Kanarya',
      'İnönü',
      'Mehmet Akif',
    ],
    priorityRank: 9,
    segmentBadge: 'Atakent & Halkalı Toplu Konut / Site Projeleri',
    serviceTimeFromHq: '15 dk • Aynı Gün Lazerli Keşif',
    completedProjectsCount: 690,
    urbanFocus:
      'Atakent, Tema İstanbul ve Halkalı markalı konut siteleri, Cennet Mahallesi ve Sefaköy E-5 aksı apartmanları, Küçükçekmece Gölü cepheli daireler.',
    recommendedSystems: [
      'Winsa Vera Termal 4+20+4 Argonlu Isıcamlı Cam Balkon',
      'Winsa Vera Slide Eşiksiz Sürme & Kedi Tüllü Plise Sineklik',
      'Winsa Dorado 76 & Safir 76 PVC Pencere ve Winstor Panjur',
    ],
    primarySystemCode: 'Vera Termal Isıcam & Vera Slide Sürme',
    highlightProblem:
      'Atakent ve Halkalı yüksek katlı sitelerinde şiddetli rüzgâr koridoru, Cennet ve Sefaköy E-5 hattında yüksek trafik gürültüsü.',
    architecturalSolution:
      'Atakent ve Halkalı sitelerinin yönetim planlarındaki RAL renk kodlarına (Antrasit, Gri, Kahve) tam uyumlu, rüzgâr kilidi güçlendirilmiş 10 mm temperli ve 4+20+4 mm ısıcamlı cam balkon sistemlerini tek günde temiz montajla teslim ediyoruz.',
    heroImage: '/images/products/bahcelievler-vera-slide-esiksiz-surme-cam-balkon.jpg',
    heroImageAlt:
      'Küçükçekmece Atakent, Halkalı ve Cennet mahallesinde ısıcamlı ve sürme cam balkon — Çelikpen',
    faqs: [
      {
        question: 'Atakent ve Halkalı sitelerinde cam balkon rengi site yönetimine uygun üretiliyor mu?',
        answer:
          'Kesinlikle. Avrupa Konutları, Tema İstanbul, Soyak Olympiakent ve Bosphorus City dahil tüm Atakent/Halkalı sitelerinin yönetim şartnamesindeki profil ve cam renklerinde birebir üretim yapıyoruz.',
      },
    ],
  },
  {
    slug: 'zeytinburnu-cam-balkon',
    slugAliases: ['cevizlibag-cam-balkon', 'topkapi-cam-balkon'],
    name: 'Zeytinburnu',
    footerLabel: 'Zeytinburnu (Sahil, Cevizlibağ, Topkapı)',
    subDistricts: 'Sahil, Cevizlibağ, Topkapı',
    neighborhoods: [
      'Kazlıçeşme (Sahil Rezidans Hattı)',
      'Cevizlibağ / Maltepe',
      'Topkapı (Merkezefendi)',
      'Sümer',
      'Veliefendi',
      'Çırpıcı',
      'Beştelsiz',
      'Telsiz',
      'Gökalp',
      'Nuripaşa',
    ],
    priorityRank: 10,
    segmentBadge: 'Sahil Kuleleri, Cevizlibağ Rezidans & Kentsel Dönüşüm',
    serviceTimeFromHq: '15 dk • Aynı Gün Lazerli Keşif',
    completedProjectsCount: 420,
    urbanFocus:
      'Zeytinburnu sahil bandı (Büyükyalı, Yedi Mavi, Ottomare) yüksek katlı rezidansları, Cevizlibağ-Topkapı yeni konut projeleri ve kentsel dönüşüm apartmanları.',
    recommendedSystems: [
      'Winsa Vera Termal 28 mm Argon Gazlı Akustik Isıcamlı Cam Balkon',
      'Winsa Vera Vertical Motorlu Giyotin & 10 mm Yüksek Kat Katlanır Sistem',
      'Winsa Comfort Slide Plus Vakum Kilitli Sürme Doğrama',
    ],
    primarySystemCode: 'Yüksek Kat Isıcamlı & Comfort Slide Plus',
    highlightProblem:
      'Kennedy Caddesi sahil rüzgârı, E-5/Tramvay hattı akustik gürültüsü ve yüksek katlı rezidans teraslarında statik cam güvenliği.',
    architecturalSolution:
      'Zeytinburnu sahil ve Cevizlibağ projelerinde EN 12210 C4 rüzgâr dayanım sınıfında kalın etli alüminyum kasa, temperli+lamine güvenlik camı ve vakum contalı sürme/katlanır sistemler uyguluyoruz.',
    heroImage: '/images/references/ref-12.jpg',
    heroImageAlt:
      'Zeytinburnu Sahil, Cevizlibağ ve Topkapı rezidanslarında ısıcamlı cam balkon — Çelikpen',
    faqs: [
      {
        question: 'Zeytinburnu sahil ve Cevizlibağ projelerinde aynı gün keşif hizmeti var mı?',
        answer:
          'Evet. Bahçelievler Kocasinan Merkez üretim tesisimizden Zeytinburnu, Cevizlibağ ve Topkapı bölgesine 15 dakika içinde ücretsiz lazerli keşif hizmeti veriyoruz.',
      },
    ],
  },
  {
    slug: 'eyupsultan-gokturk-cam-balkon',
    slugAliases: ['kagithane-cam-balkon', 'kemerburgaz-cam-balkon', 'gokturk-cam-balkon', 'vadistanbul-cam-balkon'],
    name: 'Kağıthane & Eyüpsultan',
    footerLabel: 'Kağıthane & Eyüpsultan (Kemerburgaz, Göktürk, Vadistanbul)',
    subDistricts: 'Kemerburgaz, Göktürk, Vadistanbul',
    neighborhoods: [
      'Göktürk Merkez',
      'Kemerburgaz',
      'Vadistanbul / Ayazağa Sınırı',
      'Cendere Vadisi / Kağıthane Merkez',
      'Seyrantepe',
      'Hamidiye',
      'Çağlayan',
      'Alibeyköy',
      'Rami',
      'Yeşilpınar',
    ],
    priorityRank: 11,
    segmentBadge: 'Göktürk & Kemerburgaz Villa • Cendere Rezidans',
    serviceTimeFromHq: '25 dk • Özel Mimari Keşif',
    completedProjectsCount: 360,
    urbanFocus:
      'Göktürk ve Kemerburgaz kütük/müstakil villa kış bahçeleri, Cendere Vadisi ve Seyrantepe yeni nesil rezidans terasları.',
    recommendedSystems: [
      'Bioklimatik Pergola & Lamine Isıcam Tavanlı Kış Bahçesi',
      'Winsa Vera Vertical Motorlu Giyotin & Panorama HS 76 Kaldır-Sür',
      'Winsa Vera Termal 4+20+4 Argonlu Isıcamlı Cam Balkon',
    ],
    primarySystemCode: 'Bioklimatik Kış Bahçesi & Motorlu Giyotin',
    highlightProblem:
      'Kuzey ormanları iklim kuşağında İstanbul ortalamasından 4-5 °C daha soğuk kış geceleri, yoğun yağış ve bahçe teraslarında ısı kaybı.',
    architecturalSolution:
      'Göktürk, Kemerburgaz ve Kağıthane projelerinde Uw = 0.79–1.1 W/(m²K) termal yalıtım değerine sahip argon gazlı üçlü/çiftli Şişecam Sinerji-Konfor ısıcam ve gizli drenajlı bioklimatik kış bahçesi sistemleri kuruyoruz.',
    heroImage: '/images/references/ref-9.jpg',
    heroImageAlt:
      'Eyüpsultan Göktürk, Kemerburgaz ve Kağıthane Vadistanbul kış bahçesi ve cam balkon — Çelikpen',
    faqs: [
      {
        question: 'Göktürk ve Kemerburgaz bahçe katı ve teraslarında kışın tam ısınma sağlanır mı?',
        answer:
          'Isı yalıtımlı (termal bariyerli) alüminyum kış bahçesi profilleri ve 4+20+4 mm argonlu Şişecam Sinerji+Konfor ısıcam kombinasyonuyla kış bahçeniz evinizin salonu kadar sıcak kalır.',
      },
    ],
  },
  {
    slug: 'bagcilar-cam-balkon',
    slugAliases: ['gungoren-cam-balkon', 'avcilar-cam-balkon', 'esenyurt-cam-balkon', 'gunesli-cam-balkon', 'merter-cam-balkon'],
    name: 'Bağcılar, Güngören, Avcılar & Esenyurt',
    footerLabel: 'Bağcılar, Güngören, Avcılar & Esenyurt',
    subDistricts: 'Güneşli, Merter, Ambarlı, Bahçeşehir Yanı',
    neighborhoods: [
      'Bağcılar (Güneşli, Mahmutbey, Basın Ekspres, Kirazlı)',
      'Güngören (Merter, Tozkoparan, Haznedar, Gençosman)',
      'Avcılar (Ambarlı Sahil, Denizköşkler, Cihangir, Ispartakule)',
      'Esenyurt (Cumhuriyet, Özyurtlar, Akbatı Aksı, Kıraç)',
      'Bayrampaşa & Esenler Kentsel Dönüşüm Hattı',
      'Fatih, Gaziosmanpaşa & Bakırköy Komşu Akslar',
    ],
    priorityRank: 12,
    segmentBadge: 'Basın Ekspres, Kentsel Dönüşüm & Toplu Bina İndirimi',
    serviceTimeFromHq: '10-20 dk • Aynı Gün Lazerli Keşif',
    completedProjectsCount: 1850,
    urbanFocus:
      'Güneşli Basın Ekspres rezidansları, Güngören Merter/Haznedar/Tozkoparan kentsel dönüşüm apartmanları, Avcılar sahil hattı ve Esenyurt yüksek katlı siteleri.',
    recommendedSystems: [
      'Winsa Vera Termal 4+20+4 Argonlu Isıcamlı Cam Balkon',
      'Winsa Vera 8 mm / Vera Pro 10 mm Temperli Katlanır Cam Balkon',
      'Winsa Dorado 76 & Safir 76 PVC Doğrama + Winstor Monoblok Panjur',
    ],
    primarySystemCode: 'Vera Termal Isıcam & Dorado 76 PVC (%15 Toplu Bina İndirimi)',
    highlightProblem:
      'Yeni kentsel dönüşüm binalarında toplu doğrama/cam balkon standardizasyonu, TEM/E-5 gürültüsü ve bütçe dostu fabrika doğrudan satış beklentisi.',
    architecturalSolution:
      'Kocasinan Merkez fabrikamıza 10 dakika mesafedeki Bağcılar, Güngören, Avcılar ve Esenyurt projelerinde 5+ daire toplu bina siparişlerine net %15 fabrika indirimi, 4/5 muvafakatname desteği ve 10 yıl yazılı sistem garantisi sunuyoruz.',
    heroImage: '/images/references/bahcelievler-kocasinan-antrasit-pvc-dograma.jpg',
    heroImageAlt:
      'Bağcılar, Güngören, Avcılar ve Esenyurt kentsel dönüşüm PVC doğrama ve cam balkon — Çelikpen',
    faqs: [
      {
        question: 'Bağcılar, Güngören ve Avcılar’da 5+ daire toplu bina indirimi geçerli mi?',
        answer:
          'Evet. Aynı apartman veya siteden 5 ve üzeri dairenin toplu cam balkon veya PVC doğrama siparişlerinde net %15 toplu üretim indirimi uyguluyoruz.',
      },
    ],
  },
];

export function getDistrictBySlug(slug: string): EuropeanSideDistrict | undefined {
  return EUROPEAN_SIDE_DISTRICTS.find(
    (d) => d.slug === slug || (d.slugAliases ?? []).includes(slug)
  );
}

export function getAllDistrictSlugs(): string[] {
  return EUROPEAN_SIDE_DISTRICTS.map((d) => d.slug);
}
