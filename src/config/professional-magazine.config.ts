export type MagazineCategory =
  | 'Isıcamlı Cam Balkon'
  | 'Winsa PVC Sistemleri'
  | 'Isı & Ses Yalıtımı'
  | 'Kış Bahçesi & Pergola'
  | 'Bakım & Montaj Rehberi';

export const MAGAZINE_CATEGORIES: MagazineCategory[] = [
  'Isıcamlı Cam Balkon',
  'Winsa PVC Sistemleri',
  'Isı & Ses Yalıtımı',
  'Kış Bahçesi & Pergola',
  'Bakım & Montaj Rehberi',
];

export interface MagazineSection {
  heading: string;
  body: string;
}

export interface MagazinePost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  filterCategory: MagazineCategory;
  date: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  keyTakeaways: string[];
  sections: MagazineSection[];
  ctaHref: string;
  ctaLabel: string;
}

export const MAGAZINE_POSTS: MagazinePost[] = [
  {
    slug: 'isicamli-cam-balkon-mu-katlanir-tek-cam-mi',
    title: '4+20+4 Argon Gazlı Isıcamlı Cam Balkon mu, 8 mm Tek Cam Katlanır mı?',
    excerpt:
      'Balkonunuzu kışın da çalışma odası, kış bahçesi veya yemek alanı olarak kullanmak istiyorsanız 28 mm Isıcamlı Vera Termal ile standart 8 mm tek cam arasındaki 3,5 katlık yalıtım farkını inceleyin.',
    category: 'Karşılaştırma & Rehber',
    filterCategory: 'Isıcamlı Cam Balkon',
    date: '15 Ekim 2026',
    readTime: '5 dk okuma',
    author: 'Çelikpen Mühendislik Ekibi',
    image: '/images/products/vera-termal.jpg',
    imageAlt: 'Winsa Vera Termal ısıcamlı cam balkon uygulaması',
    featured: true,
    keyTakeaways: [
      'Winsa Vera Termal Isıcamlı sistemde Uw değeri 1,1 W/m²K, tek camda ise 5,2 W/m²K seviyesindedir.',
      'Kış aylarında cam yüzeyinde oluşan yoğuşma ısıcamlı sistemde %90 oranında engellenir.',
      'Her iki yüzeyin temperli olması darbe ve rüzgar güvenliğini birlikte sağlar.',
    ],
    sections: [
      {
        heading: 'Isı yalıtımı neden yalnızca cam kalınlığıyla ölçülmez?',
        body: 'Bir cam balkonun termal performansı; camın Ug değeri, alüminyum profilin Uf değeri ve cam ile profil birleşimindeki ısı köprüsü birlikte değerlendirilerek hesaplanır. 8 mm tek camlı katlanır sistemler rüzgar ve yağmur korumasında başarılıdır; ancak kışın balkonun ısıtılabilir bir yaşam alanına dönüşmesi hedefleniyorsa 4+20+4 Argon gazlı ısıcam şarttır. 20 mm argon boşluğu, camlar arasındaki iletim ve konveksiyon kaybını ciddi biçimde düşürür.',
      },
      {
        heading: 'Vera Termal ile Vera 8 ve Vera Pro 10 arasındaki fark',
        body: 'Winsa Vera 8 ve Vera Pro 10 serileri temperli tek camlı katlanır sistemlerdir. Vera Termal ise 4 mm temperli + 20 mm argon + 4 mm temperli Konfor Isıcam kullanır. Çelikpen 2026 net m² fiyatları Vera 8 için 5.150 TL, Vera Pro 10 için 5.720 TL, Vera Termal için 9.150 TL seviyesindedir. Fiyat farkı yalnızca camdan değil; daha derin kasa, termal bariyer, çift sıra fitil ve daha yüksek montaj hassasiyetinden kaynaklanır.',
      },
      {
        heading: 'Hangi balkonda hangi seri seçilmeli?',
        body: 'Kışın balkonu nadiren kullanıyorsanız, önceliğiniz rüzgar ve toz ise Vera 8 ekonomik bir çözümdür. Yüksek kat, açık cephe ve yoğun rüzgar varsa Vera Pro 10 daha güvenli bir seçimdir. Balkonda çamaşır kurutma, çalışma masası, spor alanı veya kış bahçesi planlıyorsanız Vera Termal Isıcamlı sistemi tercih etmelisiniz. Keşif sırasında cephe yönü, kat seviyesi ve gürültü ölçümü birlikte değerlendirilir.',
      },
    ],
    ctaHref: '/urunler/vera-isicamli-cam-balkon',
    ctaLabel: 'Winsa Vera Termal Isıcamlı Sistemi İncele',
  },
  {
    slug: 'pvc-pencerede-76mm-ve-84mm-profil-farki',
    title: 'Yeni Nesil PVC Doğramada 76 mm Dorado 76 ve 84 mm Revotech Gold Seçimi',
    excerpt:
      'Klasik 60 mm profiller neden yerini 76 mm ve 84 mm çok odacıklı sistemlere bıraktı? Orta conta teknolojisinin rüzgar ıslığı, yoğuşma ve fatura tasarrufuna doğrudan etkisi.',
    category: 'Mimari Mühendislik',
    filterCategory: 'Winsa PVC Sistemleri',
    date: '08 Ekim 2026',
    readTime: '6 dk okuma',
    author: 'Çelikpen Proje Departmanı',
    image: '/images/products/pvc-pencere.jpg',
    imageAlt: 'Antrasit PVC pencere ve kapı sistemi uygulaması',
    keyTakeaways: [
      '84 mm Revotech Gold, 7 odacıklı yapısı ve üçüncü orta contasıyla Uw 0,79 W/m²K değerine ulaşır.',
      '52 mm’ye kadar üçlü ısıcam kullanımına olanak tanır.',
      'Orta conta, ispanyolet mekanizmasını dış nemden koruyarak donanım ömrünü uzatır.',
    ],
    sections: [
      {
        heading: '76 mm ile 84 mm arasındaki gerçek fark',
        body: 'Profil genişliği arttıkça yalnızca daha fazla odacık elde edilmez; cam kalınlığı, conta sayısı ve statik takviye derinliği de artar. Winsa Dorado 76 beş odacıklı yapısıyla standart konutlarda yüksek performans sunar. Revotech Gold ise 84 mm gövdesi, 7 odacığı ve üçüncü orta contasıyla özellikle E-5, Basın Ekspres ve havalimanı aksındaki gürültülü cephelerde fark yaratır.',
      },
      {
        heading: 'Üçüncü conta neden önemlidir?',
        body: 'İlk iki conta kanat-kasa birleşiminde hava ve su geçişini engeller. Üçüncü orta conta ise kasa içindeki donanım boşluğunu dış ortamdan ayırır. Bu bariyer sayesinde lodos ve sağanak yağışta su itme performansı artar; ispanyolet, menteşe ve kilit mekanizması daha uzun ömürlü çalışır. Aynı zamanda ses köprüsünü keserek akustik konforu iyileştirir.',
      },
      {
        heading: 'Doğru PVC pencere seçim kontrol listesi',
        body: 'Önce cephe gürültüsünü ve kat yüksekliğini ölçün. Çift cam yeterli mi, üçlü cam gerekli mi belirleyin. Kasa renginin bina cephesiyle uyumunu ve yönetim planı şartlarını kontrol edin. Son olarak montaj ekibinin kendi ekibiniz mi, taşeron mu olduğunu netleştirin. Çelikpen’de keşif, statik değerlendirme ve montaj aynı teknik ekip tarafından yürütülür.',
      },
    ],
    ctaHref: '/urunler/revotech-gold',
    ctaLabel: 'Winsa Revotech Gold Serisini İncele',
  },
  {
    slug: 'apartmanlarda-cam-balkon-yasal-muvafakatname-rehberi',
    title: 'Kat Mülkiyeti Kanunu Madde 19 ve Cam Balkon Muvafakatname Rehberi',
    excerpt:
      'Apartman ve sitelerde dış cephe bütünlüğünü koruyarak sorunsuz cam balkon yaptırmanın yolları: 4/5 kat maliki onayı, RAL renk uyumu, yönetim planı ve hazır belge şablonu.',
    category: 'Mevzuat & Hukuk',
    filterCategory: 'Bakım & Montaj Rehberi',
    date: '01 Ekim 2026',
    readTime: '4 dk okuma',
    author: 'Çelikpen Hukuk & Proje Ekibi',
    image: '/images/products/panorama-hs-76.jpg',
    imageAlt: 'Apartman terasında panoramik cam balkon uygulaması',
    keyTakeaways: [
      'Kat Mülkiyeti Kanunu 19. maddesi kapsamında 4/5 yazılı muvafakatname alınmalıdır.',
      'Profil rengi ve cam tonu bina dış cephe kararına birebir uyumlu olmalıdır.',
      'Muvafakatname ve montaj evrakları uzun yıllar saklanacak şekilde arşivlenmelidir.',
    ],
    sections: [
      {
        heading: 'Cam balkon için yasal dayanak nedir?',
        body: 'Kat Mülkiyeti Kanunu’nun 19. maddesi, ana taşınmazın dış cephesini etkileyen mimari değişikliklerde kat maliklerinin 4/5 çoğunluğunun yazılı onayını gerekli kılar. Uygulamada bu onay “muvafakatname” olarak adlandırılır. Yönetim planında ayrıca renk, profil tipi ve montaj saatleriyle ilgili daha özel kurallar bulunabilir. Bu nedenle yalnızca çoğunluk onayı değil, yönetim planı uyumu da kontrol edilmelidir.',
      },
      {
        heading: 'Muvafakatname dosyasında hangi belgeler olmalı?',
        body: 'Kat maliki imza listesi, yönetim kurulu kararı, uygulanacak sistemin teknik broşürü, profil ve cam rengi örneği, montaj firması bilgileri ve iş güvenliği taahhüdü dosyada yer almalıdır. Çelikpen, keşif sonrası bina yönetimine sunulacak teknik dosyayı ücretsiz hazırlar; dijital muvafakatname aracıyla belgeyi dakikalar içinde yazdırabilirsiniz.',
      },
      {
        heading: 'Hangi renk ve sistem seçilmelidir?',
        body: 'Yönetim planı aksi bir renk öngörmüyorsa antrasit RAL 7016, mat siyah veya eloksal gri en yaygın tercihlerdir. Camda ise füme, bronz veya şeffaf seçenekleri bina genelindeki bütünlüğe göre belirlenir. Katlanır ve eşiksiz sürme sistemleri, cephede sabit doğrama etkisi oluşturmadığı için onay süreçlerinde sıklıkla tercih edilir.',
      },
    ],
    ctaHref: '/profesyoneller/teknik-sartnameler',
    ctaLabel: 'Teknik Şartname ve Muvafakatname Aracını Aç',
  },
  {
    slug: 'kedi-tullu-plise-sineklik-dayanim-testi',
    title: 'Evcil Hayvan Sahipleri İçin Patiye Dayanıklı Kedi Tüllü Plise Sineklik',
    excerpt:
      'Standart fiberglas tüller kedi tırnaklarına karşı neden yetersiz kalır? PVC kaplı yüksek mukavemetli polyester tül ve emniyet kilitli profil sisteminin avantajları.',
    category: 'Donanım & Güvenlik',
    filterCategory: 'Bakım & Montaj Rehberi',
    date: '22 Eylül 2026',
    readTime: '3 dk okuma',
    author: 'Çelikpen Donanım Uzmanları',
    image: '/images/products/winsa-donanim.jpg',
    imageAlt: 'Kedi tüllü sineklik ve pencere donanım detayı',
    keyTakeaways: [
      'Kedi tülünün yırtılma direnci standart sineklik tülüne göre yaklaşık 7 kat daha yüksektir.',
      'Hem PVC pencereye hem katlanır ve sürme cam balkon kasalarına entegre edilebilir.',
      'UV dayanımı sayesinde güneş altında gevşeme veya sarkma yapmaz.',
    ],
    sections: [
      {
        heading: 'Standart tül neden yırtılır?',
        body: 'Standart fiberglas sineklik tülleri ince iplik yapısı nedeniyle kedi tırnağı temasında kolayca deforme olur. Kedi tüllü sistemlerde PVC kaplı yüksek mukavemetli polyester iplik kullanılır. Bu yapı esneme payı sayesinde tırnak darbesini emer, delinme ve yırtılma riskini azaltır. Aynı zamanda çocuklu evlerde pencere önü güvenliği için ek bariyer oluşturur.',
      },
      {
        heading: 'Plise sineklik mi, sabit sineklik mi?',
        body: 'Plise sineklik, kullanılmadığında akordeon gibi toplanarak görüş alanını açar. Katlanır cam balkonlarda kanat hareketine engel olmaz; sürme sistemlerde ise ray hizasına monte edilir. Sabit sineklik daha ekonomiktir ancak geniş açıklıklarda görüş alanını sürekli kapatır. Çelikpen, balkon tipine göre plise, sürme veya menteşeli çerçeve seçeneklerini birlikte değerlendirir.',
      },
      {
        heading: 'Doğru ölçü ve montajın önemi',
        body: 'Sineklik kasetinin profil genişliği, cam balkon kanat açıklığı ve kedi geçiş yüksekliği ölçülmeden üretim yapılmamalıdır. Yanlış ölçü, tülün gerginliğini bozar ve kısa sürede yıpranmaya yol açar. Montaj sonrası tül gerginliği, kilit hizası ve ray temizliği kontrol edilmelidir.',
      },
    ],
    ctaHref: '/urunler/paslanmaz-rulman-ve-kedi-sinekligi-sistemleri',
    ctaLabel: 'Kedi Tüllü Sineklik Sistemlerini İncele',
  },
  {
    slug: 'bioklimatik-pergola-ile-kis-bahcesi-rehberi',
    title: 'Bioklimatik Pergola ile Kış Bahçesi: Terası Dört Mevsim Kullanma Rehberi',
    excerpt:
      'Motorlu lamel tavan, gizli yağmur tahliyesi ve cam cephe entegrasyonuyla terasınızı yaz-kış kullanılan bir yaşam alanına dönüştürürken dikkat edilmesi gereken teknik detaylar.',
    category: 'Kış Bahçesi & Pergola',
    filterCategory: 'Kış Bahçesi & Pergola',
    date: '17 Eylül 2026',
    readTime: '7 dk okuma',
    author: 'Çelikpen Mimari Çözümler Ekibi',
    image: '/images/products/pergola.jpg',
    imageAlt: 'Winsa Vela ve Lotus bioklimatik pergola teras uygulaması',
    keyTakeaways: [
      'Motorlu lamel tavan 0-135 derece arasında güneş ve hava kontrolü sağlar.',
      'Yağmur suyu taşıyıcı dikme içinden gizli kanalla tahliye edilmelidir.',
      'Cam cephede Vera Slide veya Vera Vertical sistemleri pergolayla tam entegre çalışır.',
    ],
    sections: [
      {
        heading: 'Bioklimatik pergola nasıl çalışır?',
        body: 'Alüminyum lamel tavan, motorlu bir mil üzerinde döner. Lameller kapalıyken yağmur ve güneş geçişini engeller; açıldığında doğal havalandırma sağlar. Yan cephede cam balkon veya sürme cam sistemleri kullanıldığında teras dört mevsim kullanılabilir. LED aydınlatma, rüzgar sensörü ve yağmur sensörü opsiyonlarıyla otomasyon tamamlanır.',
      },
      {
        heading: 'Statik ve su tahliyesi neden kritiktir?',
        body: 'Pergola, binaya veya zemine bağlanan taşıyıcı dikmelerle ayakta durur. Kar ve rüzgar yükü, açıklık genişliği ve bağlantı detayı projeye göre hesaplanmalıdır. Su tahliyesi için lamel eğimi, oluk kapasitesi ve iniş borusu doğru boyutlandırılmalıdır. Aksi halde yoğun yağışta su taşması ve profil içinde birikme görülür.',
      },
      {
        heading: 'Kış bahçesi cam cephesi seçimi',
        body: 'Kapalı cephede ısı yalıtımı ön plandaysa 4+16+4 veya 4+20+4 ısıcam, tamamen açılabilir cephe isteyenler için Vera Slide eşiksiz sürme ya da Vera Vertical motorlu giyotin uygundur. Cam balkon ve pergola bağlantısında su yalıtımı, drenaj ve profil renk uyumu tek proje içinde çözülmelidir.',
      },
    ],
    ctaHref: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    ctaLabel: 'Winsa Vela ve Lotus Pergola Sistemini İncele',
  },
  {
    slug: 'argon-gazli-isicam-ses-ve-isi-yalitimi',
    title: 'Argon Gazlı Isıcam Ses ve Isı Yalıtımında Gerçekten Ne Kadar Etkili?',
    excerpt:
      'Argon dolgu, low-e kaplama, cam kalınlığı ve ara boşluk ölçüsü birlikte nasıl çalışır? E-5 ve Basın Ekspres cephelerinde 45 dB akustik konfor için doğru cam kombinasyonu.',
    category: 'Isı & Ses Yalıtımı',
    filterCategory: 'Isı & Ses Yalıtımı',
    date: '10 Eylül 2026',
    readTime: '6 dk okuma',
    author: 'Çelikpen Termal Fizik Ekibi',
    image: '/images/products/vera-slide.jpg',
    imageAlt: 'Isıcamlı sürme cam balkon ve geniş cam cephe uygulaması',
    keyTakeaways: [
      'Argon gazı, hava boşluğuna göre ısı iletimini yaklaşık %15-20 azaltır.',
      'Ses yalıtımında cam kalınlıklarının farklı olması rezonansı kırar.',
      'Uw değeri cam, profil ve birleşim kayıplarının toplamıdır.',
    ],
    sections: [
      {
        heading: 'Argon gazı tek başına yeterli mi?',
        body: 'Argon, camlar arasındaki boşlukta hava yerine kullanılan ağır ve düşük iletkenli bir gazdır. Ancak tek başına mucize yaratmaz. Low-e kaplama, doğru boşluk ölçüsü, sıcak kenar çıtası ve sızdırmaz fitil ile birlikte kullanıldığında anlamlı tasarruf sağlar. Boşluk çok dar veya çok geniş olursa konveksiyon artar; bu nedenle 16-20 mm aralık ideal kabul edilir.',
      },
      {
        heading: 'Ses yalıtımında cam kalınlığı neden farklı seçilir?',
        body: 'Aynı kalınlıktaki iki cam aynı frekansta titreşerek sesi içeri taşır. 4 mm ve 6 mm gibi farklı kalınlıklar kullanıldığında rezonans frekansları ayrışır ve trafik gürültüsünde belirgin düşüş elde edilir. Lamine ara katman ise özellikle konuşma ve müzik gibi orta-yüksek frekanslarda ek yalıtım sağlar.',
      },
      {
        heading: 'Doğru kombinasyon nasıl seçilir?',
        body: 'Cephe gürültüsü 70 dB’nin üzerindeyse asimetrik kalınlıkta akustik lamine cam önerilir. Isı kaybı ön plandaysa low-e kaplamalı argonlu ısıcam, yoğuşma problemi varsa sıcak kenar çıtası ve yüksek kaliteli fitil birlikte değerlendirilir. Çelikpen keşif ekibi cephe yönü, kat ve gürültü ölçümüne göre kombinasyonu belirler.',
      },
    ],
    ctaHref: '/fiyat-hesapla',
    ctaLabel: 'Isıcamlı Sistem Fiyatını Hesapla',
  },
  {
    slug: 'cam-balkon-montaj-sonrasi-bakim-rehberi',
    title: 'Cam Balkon Montaj Sonrası Bakım: Ray, Fitil ve Rulman Ömrünü Uzatan 8 Adım',
    excerpt:
      'Katlanır ve sürme cam balkonlarda ray temizliği, fitil bakımı, drenaj kontrolü ve doğru temizlik ürünü seçimiyle sistem ömrünü uzatmanın pratik yolları.',
    category: 'Bakım & Montaj',
    filterCategory: 'Bakım & Montaj Rehberi',
    date: '03 Eylül 2026',
    readTime: '4 dk okuma',
    author: 'Çelikpen Montaj Sonrası Destek',
    image: '/images/products/surme-sistem.jpg',
    imageAlt: 'Sürme cam balkon ray ve profil detayı',
    keyTakeaways: [
      'Alt rayı ayda bir kuru fırça veya elektrikli süpürgeyle temizleyin.',
      'Fitilleri silikon bazlı bakım spreyiyle koruyun, çözücü kullanmayın.',
      'Drenaj deliklerini yaprak ve tozdan arındırın.',
    ],
    sections: [
      {
        heading: 'Ray ve tekerlek bakımı',
        body: 'Cam balkon raylarına biriken toz ve kum, paslanmaz rulmanların ömrünü kısaltır. Ayda bir kuru fırça veya düşük emişli süpürgeyle ray içini temizleyin. Kesinlikle yağlı temizleyici kullanmayın; yağ tozu tutarak daha hızlı kirlenmeye yol açar. Rulmanlarda ses veya sürtünme fark ederseniz yetkili servisle iletişime geçin.',
      },
      {
        heading: 'Fitil ve cam temizliği',
        body: 'EPDM fitilleri silikon bazlı bakım ürünüyle nemlendirmek esnekliğini korur. Cam yüzeyde amonyak bazlı ürünler yerine pH nötr cam temizleyici kullanın. Basınçlı suyu doğrudan fitil ve kilit bölgesine tutmayın; su itme performansı zarar görebilir.',
      },
      {
        heading: 'Drenaj ve mevsimsel kontrol',
        body: 'Sonbahar öncesi drenaj deliklerini yaprak ve tozdan temizleyin. Kışın kar birikintisini kürekle değil yumuşak fırçayla alın. İlkbaharda menteşe, kilit ve kol vidalarını kontrol edin. Yıllık bakım, 10 yıl sistem garantisinin sürdürülebilmesi için de önemlidir.',
      },
    ],
    ctaHref: '/iletisim?form=servis',
    ctaLabel: 'Bakım ve Servis Talebi Oluştur',
  },
  {
    slug: 'esiksiz-surme-mi-katlanir-mi',
    title: 'Eşiksiz Sürme mi, Katlanır Cam Balkon mu? Balkon Tipine Göre Karar Rehberi',
    excerpt:
      'Dar balkon, L köşe ve geniş teraslarda kanat hareketi, eşik yüksekliği, temizlik ve manzara sürekliliği açısından iki sistemin karşılaştırması.',
    category: 'Karşılaştırma & Rehber',
    filterCategory: 'Isıcamlı Cam Balkon',
    date: '27 Ağustos 2026',
    readTime: '5 dk okuma',
    author: 'Çelikpen Keşif Ekibi',
    image: '/images/products/vera-katlanir.jpg',
    imageAlt: 'Katlanır cam balkon ve panoramik balkon manzarası',
    keyTakeaways: [
      'Dar ve dikdörtgen balkonlarda eşiksiz sürme alan kaybını sıfıra indirir.',
      'L ve U balkonlarda katlanır sistem köşe açıklığında avantaj sağlar.',
      'Her iki sistem de 8, 10 mm temperli veya ısıcamlı üretilebilir.',
    ],
    sections: [
      {
        heading: 'Alan kullanımı ve kanat hareketi',
        body: 'Katlanır sistemde kanatlar içeri doğru katlanır ve balkonun bir köşesinde toplanır. Bu nedenle balkonda masa, sandalye veya çamaşırlık varsa hareket alanını daraltabilir. Eşiksiz sürmede kanatlar yan yana kaydığı için içeri doğru açılma payı yoktur. Dar ve uzun balkonlarda özellikle avantajlıdır.',
      },
      {
        heading: 'Eşik yüksekliği ve temizlik',
        body: 'Eşiksiz sürme sistemlerde alt ray gömülü olduğu için takılma yapmaz; çocuk, yaşlı ve tekerlekli sandalye geçişi açısından güvenlidir. Katlanır sistemlerde ise alt kasa yüksekliği modele göre değişir. Temizlikte sürme rayları daha fazla toz tutabilir; düzenli fırçalama gerekir.',
      },
      {
        heading: 'Manzara ve maliyet dengesi',
        body: 'Katlanır sistem açıldığında cepheyi tamamen boşaltır ve kesintisiz manzara sunar. Sürme sistemde ise kanatlar üst üste bindiği için her zaman bir profil hattı görünür. 2026 net fiyatlarda Vera 8 5.150 TL/m², Vera Slide 5.900 TL/m², Vera Termal 9.150 TL/m² seviyesindedir. Bütçe, kullanım sıklığı ve cephe ölçüsü birlikte değerlendirilmelidir.',
      },
    ],
    ctaHref: '/urunler/panorama-esiksiz-surme-cam-balkon',
    ctaLabel: 'Winsa Vera Slide Sistemini İncele',
  },
];

export interface ReferenceProject {
  id: string;
  title: string;
  district: string;
  locationBadge: string;
  filterCategory: 'Villa & Teras' | 'Konut Cam Balkon' | 'Kafe & Restoran Giyotin' | 'Winsa PVC & Hebeschiebe';
  systemUsed: string;
  color: string;
  area: string;
  year: string;
  highlight: string;
  image: string;
  imageAlt: string;
}

export const REFERENCE_FILTERS = [
  'Tümü',
  'Villa & Teras',
  'Konut Cam Balkon',
  'Kafe & Restoran Giyotin',
  'Winsa PVC & Hebeschiebe',
] as const;

export const MAGAZINE_REFERENCES: ReferenceProject[] = [
  {
    id: 'ref-01',
    title: 'Kocasinan Merkez Mah. Panoramik Dubleks Teras & Cephe Dönüşümü',
    district: 'Bahçelievler / Kocasinan Merkez',
    locationBadge: 'Bahçelievler',
    filterCategory: 'Villa & Teras',
    systemUsed: 'Winsa Revotech Gold + Winsa Vera Termal Isıcamlı Cam Balkon',
    color: 'Antrasit Gri RAL 7016 & Füme Reflekte Cam',
    area: '48 m² Doğrama & Cam Balkon',
    year: '2026',
    highlight: 'Isı kaybında %46 tasarruf, 42 dB akustik ses yalıtımı sağlandı.',
    image: '/images/products/pergola.jpg',
    imageAlt: 'Kocasinan panoramik dubleks teras pergola uygulaması',
  },
  {
    id: 'ref-02',
    title: 'Şirinevler E-5 Cepheli Konut Sitesi Akustik Doğrama Yenilemesi',
    district: 'Bahçelievler / Şirinevler',
    locationBadge: 'Bahçelievler',
    filterCategory: 'Winsa PVC & Hebeschiebe',
    systemUsed: 'Winsa Dorado 76 + Akustik Lamine Üçlü Cam',
    color: 'Altın Meşe Lamine / İç Beyaz',
    area: '36 Daire Toplu Proje',
    year: '2025 - 2026',
    highlight: 'E-5 gürültüsü 78 dB seviyesinden 32 dB iç ortam konforuna düşürüldü.',
    image: '/images/products/pvc-pencere.jpg',
    imageAlt: 'Şirinevler konut sitesi PVC pencere yenileme projesi',
  },
  {
    id: 'ref-03',
    title: 'Siyavuşpaşa Çamlık Caddesi Köşe L-Balkon Isıcamlı Kapatma',
    district: 'Bahçelievler / Siyavuşpaşa',
    locationBadge: 'Bahçelievler',
    filterCategory: 'Konut Cam Balkon',
    systemUsed: 'Winsa Vera Termal Isıcamlı + Kedi Tüllü Plise Sineklik',
    color: 'Mat Siyah Eloksal + Şeffaf Konfor Cam',
    area: '18,5 m² Köşe Balkon',
    year: '2026',
    highlight: 'Köşe birleşiminde sabit kayıt kullanılmadan %100 kesintisiz manzara elde edildi.',
    image: '/images/products/vera-termal.jpg',
    imageAlt: 'Siyavuşpaşa L balkon ısıcamlı cam balkon projesi',
  },
  {
    id: 'ref-04',
    title: 'Ataköy Marina Rezidans Teras Kaldır-Sür Uygulaması',
    district: 'Bakırköy / Ataköy',
    locationBadge: 'Ataköy',
    filterCategory: 'Winsa PVC & Hebeschiebe',
    systemUsed: 'Winsa Panorama HS 76 Hebeschiebe + Winstor Motorlu Panjur',
    color: 'Metalik Antrasit Cool Colors',
    area: '32 m² Teras Cephesi',
    year: '2026',
    highlight: '19 mm engelsiz eşik ve Somfy akıllı ev otomasyonlu panjur entegrasyonu.',
    image: '/images/products/panorama-hs-76.jpg',
    imageAlt: 'Ataköy Marina rezidans HS 76 kaldır-sür teras projesi',
  },
  {
    id: 'ref-05',
    title: 'Florya Bahçe Katı Bioklimatik Pergola ve Kış Bahçesi',
    district: 'Bakırköy / Florya',
    locationBadge: 'Florya',
    filterCategory: 'Villa & Teras',
    systemUsed: 'Winsa Vela & Lotus Bioklimatik Pergola + Vera Vertical Giyotin',
    color: 'Antrasit Gri + Günışığı LED Entegrasyonu',
    area: '28 m² Bahçe Terası',
    year: '2026',
    highlight: 'Dört mevsim oturma odası konforunda, uzaktan kumandalı cam ve tavan sistemi.',
    image: '/images/products/kis-bahcesi.jpg',
    imageAlt: 'Florya villa bioklimatik pergola ve kış bahçesi projesi',
  },
  {
    id: 'ref-06',
    title: 'Soğanlı Kentsel Dönüşüm Blokları PVC Doğrama ve Panjur',
    district: 'Bahçelievler / Soğanlı',
    locationBadge: 'Bahçelievler',
    filterCategory: 'Winsa PVC & Hebeschiebe',
    systemUsed: 'Winsa Safir 76 + Comfort Slide Plus + Winstor Panjur',
    color: 'Krem & Antrasit Kombinasyonu',
    area: '24 Bağımsız Bölüm',
    year: '2025 - 2026',
    highlight: 'TS EN 12608-1 şartnamesine tam uyumlu anahtar teslim şantiye montajı.',
    image: '/images/products/pvc-anthracite.jpg',
    imageAlt: 'Soğanlı kentsel dönüşüm PVC doğrama projesi',
  },
  {
    id: 'ref-07',
    title: 'Yeşilköy Sahil Kafe Motorlu Giyotin Cam Cephe',
    district: 'Bakırköy / Yeşilköy',
    locationBadge: 'Yeşilköy',
    filterCategory: 'Kafe & Restoran Giyotin',
    systemUsed: 'Winsa Vera Vertical Motorlu Giyotin + Isıcamlı Cam',
    color: 'Mat Siyah Elektrostatik + Füme Cam',
    area: '42 m² Ticari Cephe',
    year: '2026',
    highlight: 'Kışın kapalı, yazın tamamen açık kafe cephesi; rüzgar sensörü ve uzaktan kumanda.',
    image: '/images/products/vera-vertical.jpg',
    imageAlt: 'Yeşilköy sahil kafe motorlu giyotin cam cephe projesi',
  },
  {
    id: 'ref-08',
    title: 'Başakşehir Geniş Teras Eşiksiz Sürme Cam Balkon',
    district: 'Başakşehir',
    locationBadge: 'Başakşehir',
    filterCategory: 'Konut Cam Balkon',
    systemUsed: 'Winsa Vera Slide Isıcamlı Eşiksiz Sürme',
    color: 'Kumlu Antrasit + Şeffaf Isıcam',
    area: '22 m² Teras Balkon',
    year: '2026',
    highlight: 'Sıfır eşik yüksekliği ve paslanmaz rulman sistemiyle tek parmakla sürüş.',
    image: '/images/products/vera-slide.jpg',
    imageAlt: 'Başakşehir geniş teras eşiksiz sürme cam balkon projesi',
  },
  {
    id: 'ref-09',
    title: 'Bakırköy Merkez Restoran Katlanır Cam Balkon',
    district: 'Bakırköy',
    locationBadge: 'Bakırköy',
    filterCategory: 'Kafe & Restoran Giyotin',
    systemUsed: 'Winsa Vera Pro 10 Katlanır Cam Balkon',
    color: 'Antrasit RAL 7016 + Bronz Güneş Kontrol Cam',
    area: '30 m² Restoran Cephesi',
    year: '2025',
    highlight: 'Akşam saatlerinde tam açılım, gündüz güneş kontrollü bronz cam konforu.',
    image: '/images/products/comfort-slide.jpg',
    imageAlt: 'Bakırköy restoran katlanır cam balkon projesi',
  },
  {
    id: 'ref-10',
    title: 'Yenibosna Rezidans Kış Bahçesi Cam Tavan Uygulaması',
    district: 'Bahçelievler / Yenibosna',
    locationBadge: 'Bahçelievler',
    filterCategory: 'Villa & Teras',
    systemUsed: 'Winsa Vela & Lotus Lamine Isıcam Tavan + Vera Termal Cephe',
    color: 'Beyaz & Antrasit İkili Kombinasyon',
    area: '26 m² Kış Bahçesi',
    year: '2026',
    highlight: 'Lamine ısıcam tavan ve gizli drenaj ile yıl boyu yoğuşmasız kullanım.',
    image: '/images/products/winter-garden.jpg',
    imageAlt: 'Yenibosna rezidans kış bahçesi cam tavan projesi',
  },
];
