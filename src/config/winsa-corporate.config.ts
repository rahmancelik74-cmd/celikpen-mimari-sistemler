export type CorporateSubpageSlug =
  | 'hakkimizda'
  | 'vizyon-misyon'
  | 'neden-winsa'
  | 'ar-ge'
  | 'cevre-dostu-pencere'
  | 'kampanyalar'
  | 'basinda-winsa'
  | 'fuarlar-etkinlikler';

export interface CorporateSubpageData {
  slug: CorporateSubpageSlug;
  title: string;
  categoryGroup: 'KURUMSAL' | 'MEDYA';
  heroBadge: string;
  subtitle: string;
  seoDescription: string;
  paragraphs: string[];
  highlights: { title: string; desc: string }[];
  stats: { label: string; value: string }[];
}

export const CORPORATE_SUBPAGES: CorporateSubpageData[] = [
  {
    slug: 'hakkimizda',
    title: 'Hakkımızda',
    categoryGroup: 'KURUMSAL',
    heroBadge: 'MİMARİ MÜHENDİSLİK & ÜRETİM GÜCÜ',
    subtitle:
      'Egeprofil / Deceuninck küresel teknoloji mirasıyla şekillenen Winsa PVC sistemleri ve İstanbul Bahçelievler Kocasinan Merkez üssümüzde faaliyet gösteren Çelikpen Mimari Cam Sistemleri entegrasyonu.',
    seoDescription:
      'Çelikpen & Winsa Hakkımızda: Bahçelievler Kocasinan merkezli PVC pencere, kaldır-sür ve 4+20+4 ısıcamlı cam balkon üretim ve mühendislik merkezi.',
    paragraphs: [
      'Winsa, Türkiye’de PVC pencere, kapı ve panjur sistemleri sektörünün en köklü ve yenilikçi markalarından biri olarak yüksek yalıtım teknolojilerini mimari estetikle buluşturmaktadır. Uluslararası profil teknolojisi devleriyle entegre AR-GE altyapısı sayesinde S-Sınıfı (Şiddetli İklim) kriterlerinde %100 kurşunsuz uPVC profiller geliştirmektedir.',
      'İstanbul Bahçelievler (Kocasinan Merkez Mahallesi) merkezli Çelikpen Cam Balkon & Mimari Cam Sistemleri ise Winsa’nın üst segment PVC pencere ve Kaldır-Sür (Hebeschiebe) sistemlerini, kendi CNC alüminyum işleme ve temperli ısıcamlı cam balkon (VBS 4+20+4 Argon Gazlı, VNS Katlanır, Vera Motorlu Giyotin) uzmanlığıyla tek çatı altında birleştirmektedir.',
      'Ücretsiz lazerli şantiye rölevesi, TS EN 1991-1-4 rüzgar yükü statik analizi ve kadrolu montaj ekiplerimizle Bahçelievler’in 11 mahallesi başta olmak üzere tüm İstanbul’da sıfır taşeron prensibiyle anahtar teslim hizmet sunuyoruz.',
    ],
    highlights: [
      {
        title: 'Sıfır Taşeron — Kadrolu Montaj Mühendisliği',
        desc: 'Keşiften üretime ve son silikon/EPDM sızdırmazlık kontrolüne kadar tüm süreç kendi sigortalı uzman ekibimizce yürütülür.',
      },
      {
        title: 'TS EN 12608-1 & Şişecam Temperli Isıcam Güvencesi',
        desc: 'Tüm doğrama ve cam balkon serilerimizde sertifikalı hammaddeler ve 2.0 mm galvanizli çelik destek sacları kullanılır.',
      },
      {
        title: 'Kocasinan Merkez Showroom & Hızlı Servis',
        desc: 'Mahmutbey Caddesi aksındaki merkezimizden Bahçelievler ve çevresine aynı gün ücretsiz keşif ve satış sonrası servis desteği.',
      },
      {
        title: 'Şeffaf m² Birim Fiyat Politikası',
        desc: 'Dijital hesaplama modülümüzle sürpriz maliyet olmadan net m² ve donanım fiyatlarını anında görebilirsiniz.',
      },
    ],
    stats: [
      { label: 'Profil & Yüzey Garantisi', value: '10 Yıl' },
      { label: 'Maksimum Isı Yalıtımı (Uw)', value: '0.79 W/m²K' },
      { label: 'Akustik Ses Yalıtımı', value: '45 dB' },
      { label: 'Tamamlanan Konut & Teras', value: '4.800+' },
    ],
  },
  {
    slug: 'vizyon-misyon',
    title: 'Vizyon Misyon',
    categoryGroup: 'KURUMSAL',
    heroBadge: 'GELECEĞİN MİMARİ VİZYONU',
    subtitle:
      'Sıfır enerjili binalar (nZEB) ve pasif ev standartlarına uygun, karbon ayak izini minimize eden yüksek yalıtımlı pencere ve cam balkon sistemleriyle yaşam kalitesini yükseltmek.',
    seoDescription:
      'Çelikpen & Winsa Vizyon ve Misyonumuz: Sürdürülebilir mimari, yüksek enerji tasarrufu ve koşulsuz müşteri memnuniyeti ilkelerimiz.',
    paragraphs: [
      'VİZYONUMUZ: Değişen iklim koşulları ve yükselen enerji maliyetleri karşısında, binaların dış kabuğunu sadece kapatan değil; ısı, ses ve güneş enerjisini akıllıca yöneten mimari doğrama ve cam balkon teknolojilerinde Türkiye’nin en güvenilir referans noktası olmaktır.',
      'MİSYONUMUZ: Mimarların tasarım özgürlüğünü kısıtlamayan ince kesitli, yüksek statik mukavemetli (Dorado 76, Revotech Gold, Panorama HS 76, VBS Isıcamlı) sistemleri; dürüst fiyatlandırma, milimetrik montaj disiplini ve kesintisiz satış sonrası destekle her konuta ulaştırmaktır.',
    ],
    highlights: [
      {
        title: 'Enerji Verimliliği Odaklı Tasarım',
        desc: 'Her yeni projede ısıtma ve soğutma giderlerini minimum %40 düşüren Low-E ve Argon gazlı kombinasyonları standartlaştırıyoruz.',
      },
      {
        title: 'Estetik ve Fonksiyonel Bütünlük',
        desc: '23+ Cool Colors lamine renk seçeneği ve gizli menteşe/kol tasarımlarıyla modern cephe mimarisine değer katıyoruz.',
      },
      {
        title: 'Sürdürülebilir Ekoloji',
        desc: '%100 geri dönüştürülebilir kurşunsuz uPVC ve birincil alüminyum alaşımlarla doğaya saygılı üretim yapıyoruz.',
      },
      {
        title: 'Mühendislik Etiği',
        desc: 'Rüzgar yükü statiğine uygun olmayan hiçbir kesiti veya eksik et kalınlıklı destek sacını şantiyeye sokmuyoruz.',
      },
    ],
    stats: [
      { label: 'Enerji Tasarruf Oranı', value: '%46' },
      { label: 'Kurşunsuz Yeşil Üretim', value: '%100' },
      { label: 'Müşteri Memnuniyet Skoru', value: '4.9 / 5' },
      { label: 'Yedek Parça Bulunurluğu', value: '15 Yıl' },
    ],
  },
  {
    slug: 'neden-winsa',
    title: 'Neden PVC, Neden Çelikpen?',
    categoryGroup: 'KURUMSAL',
    heroBadge: 'MALZEME BİLİMİ & PERFORMANS KARŞILAŞTIRMASI',
    subtitle:
      'Neden modern mimaride çok odacıklı uPVC doğrama ve termal contalı ısıcamlı cam balkon sistemleri açık ara en yüksek fiyat/performans ve yalıtım değerini sunar?',
    seoDescription:
      'Neden PVC, Neden Çelikpen? PVC, ahşap ve standart alüminyum doğramaların ısı yalıtımı, akustik, ömür ve bakım maliyeti açısından teknik karşılaştırması.',
    paragraphs: [
      'Pencere ve kapı doğramalarında kullanılan malzemenin ısıl iletkenlik katsayısı (λ - Lambda), binanın toplam enerji kimliğini doğrudan belirler. uPVC malzemenin doğal ısıl iletkenliği (0.16 W/mK), alüminyumdan yaklaşık 1.000 kat daha düşüktür; bu sayede yoğuşma (terleme) ve ısı köprüsü oluşumunu doğal olarak engeller.',
      'Winsa’nın 7 odacıklı 84 mm Revotech Gold ve 5 odacıklı 76 mm Dorado 76 serileri, içlerindeki durgun hava odacıkları ve merkezi 3. TPE contalarıyla hem ısı hem de akustik yalıtımda (45 dB) standart doğramalara göre rakipsiz bir bariyer oluşturur.',
      'Balkon kapatma tarafında ise Çelikpen VBS Isıcamlı Cam Balkon serisi, klasik tek camlı balkonların aksine 4+20+4 mm Argon gazlı çift cam ve EPDM/alüminyum fitil teknolojisi kullanarak balkonunuzu kışın da evin sıcak bir odasına dönüştürür.',
    ],
    highlights: [
      {
        title: 'Maksimum Termal Yalıtım (Uw: 0.79 W/m²K)',
        desc: 'Kışın kombi doğalgaz faturanızı, yazın ise klima elektrik tüketiminizi ilk aydan itibaren gözle görülür şekilde düşürür.',
      },
      {
        title: 'Sıfır Boya ve Vernik Maliyeti',
        desc: 'Ahşap doğramalar gibi her 3 yılda bir zımpara ve vernik gerektirmez; korozyona, çürümeye ve asit yağmurlarına tam dayanıklıdır.',
      },
      {
        title: '45 dB Akustik Sessizlik',
        desc: 'Çok odacıklı profil geometrisi ve üçlü cam opsiyonu ile trafik, uçak ve şehir gürültüsünü %80 oranında keser.',
      },
      {
        title: 'Yüksek Yangın Güvenliği (B1 Sınıfı)',
        desc: 'uPVC hammaddesi zor alev alır ve alev kaynağı uzaklaştırıldığında kendiliğinden sönen (self-extinguishing) moleküler yapıya sahiptir.',
      },
    ],
    stats: [
      { label: 'Isıl İletkenlik (λ)', value: '0.16 W/mK' },
      { label: 'Maksimum Cam Kalınlığı', value: '52 mm' },
      { label: 'Su Sızdırmazlık Sınıfı', value: '9A (600 Pa)' },
      { label: 'Servis Ömrü Beklentisi', value: '40+ Yıl' },
    ],
  },
  {
    slug: 'ar-ge',
    title: 'AR-GE Çalışmalarımız',
    categoryGroup: 'KURUMSAL',
    heroBadge: 'AKREDİTE TEST LABORATUVARI & İNOVASYON',
    subtitle:
      'Rüzgar tüneli simülasyonlarından Cool Colors güneş yansıtıcı nanoteknoloji folyolara kadar geleceğin pencere ve cam balkon sistemlerini nasıl test ediyoruz?',
    seoDescription:
      'Winsa & Çelikpen AR-GE Çalışmalarımız: Akredite rüzgar/su sızdırmazlık test kabinleri, Cool Colors pigment teknolojisi ve yeni nesil sürme kinematiği.',
    paragraphs: [
      'AR-GE merkezimizde geliştirilen her yeni profil kalıbı ve cam balkon tekerlek/kilit mekanizması, seri üretime geçmeden önce EN 14351-1 standardına uygun iklimlendirme ve rüzgar tüneli test kabinlerinde binlerce çevrimlik zorlu testlere tabi tutulur.',
      'Saatte 160 km hıza ulaşan kasırga şiddetindeki rüzgar basıncı (1600 Pa) altında su sızdırmazlık (9A sınıfı) ve profil sehim testleri gerçekleştirilir. Ayrıca koyu renkli (Antrasit Gri, Mat Siyah) profillerin yaz güneşinde aşırı ısınmasını önleyen kızılötesi (NIR) yansıtıcı "Cool Colors" pigment teknolojisi AR-GE çalışmalarımızın en önemli çıktılarından biridir.',
    ],
    highlights: [
      {
        title: 'Cool Colors IR Yansıtıcı Yüzey Teknolojisi',
        desc: 'Koyu renkli lamine profillerde güneşin kızılötesi ışınlarını yansıtarak yüzey sıcaklığını 15°C daha serin tutar, genleşmeyi önler.',
      },
      {
        title: 'Comfort Slide Plus Eksenel Kilit Kinematiği',
        desc: 'Sürme sistemlerde fırça conta devrini kapatan, kanadı kasaya 6 mm vakumlayarak kilitleyen yeni nesil AR-GE tasarımı.',
      },
      {
        title: '25.000 Açma-Kapama Ömür Testi',
        desc: 'Menteşeler, ispanyoletler ve 8 bilyalı cam balkon rulmanları 25.000 çevrim (yaklaşık 25 yıllık kullanım) yük altında test edilir.',
      },
      {
        title: 'Termal Kamera (Flir) Saha Doğrulaması',
        desc: 'Montajı tamamlanan projelerde termal kamera ile ısı köprüsü kontrolü yapılarak uygulama kalitesi belgelenir.',
      },
    ],
    stats: [
      { label: 'Test Rüzgar Basıncı', value: '1600 Pa' },
      { label: 'Açma-Kapama Test Çevrimi', value: '25.000+' },
      { label: 'Yüzey Sıcaklık Avantajı', value: '-15 °C' },
      { label: 'UV Yaşlandırma Testi', value: '8.000 Saat' },
    ],
  },
  {
    slug: 'cevre-dostu-pencere',
    title: 'Çevre Dostu Pencere',
    categoryGroup: 'KURUMSAL',
    heroBadge: '%100 KURŞUNSUZ (Ca-Zn) & SÜRDÜRÜLEBİLİR EKOLOJİ',
    subtitle:
      'Ağır metal içermeyen Kalsiyum-Çinko (Ca-Zn) stabilizatörlü yeşil profil formülasyonu ve yaşam döngüsü boyunca tonlarca CO₂ emisyonunu önleyen yüksek yalıtım.',
    seoDescription:
      'Çevre Dostu Pencere: %100 kurşunsuz Ca-Zn uPVC profil üretimi, kapalı döngü geri dönüşüm ve enerji tasarrufuyla karbon ayak izinin azaltılması.',
    paragraphs: [
      'Winsa ve Çelikpen olarak doğaya karşı sorumluluğumuz, hammadde seçimiyle başlar. Ürettiğimiz ve uyguladığımız tüm PVC profillerde insan sağlığına ve ekosisteme zararlı kurşun bileşikleri yerine %100 çevre dostu Kalsiyum-Çinko (Ca-Zn) organik stabilizatörler kullanılmaktadır.',
      'Bir pencerenin çevreye en büyük katkısı ise kullanım ömrü boyunca sağladığı enerji tasarrufudur. Tek camlı veya eski nesil doğramaların Dorado 76, Revotech Gold veya VBS Isıcamlı Cam Balkon ile değiştirilmesi, tek bir dairede yılda ortalama 1.200 kg CO₂ salınımını engeller—bu değer her yıl 55 yetişkin ağacın doğaya kazandırdığı oksijene eşdeğerdir.',
    ],
    highlights: [
      {
        title: '%100 Kurşunsuz (Ca-Zn) Hammadde',
        desc: 'İç mekan hava kalitesini koruyan, bebek ve çocuk odalarında güvenle kullanılan ağır metalsiz yeşil formül.',
      },
      {
        title: '%100 Geri Dönüştürülebilir Yapı',
        desc: 'Hem uPVC profiller hem de 6063-T6 alüminyum ve cam üniteleri, kullanım ömrü sonunda kalitesini kaybetmeden 7 keze kadar geri dönüştürülebilir.',
      },
      {
        title: 'Düşük Karbon Ayak İzi',
        desc: 'Üretim tesislerimizde kapalı devre su soğutma sistemleri ve yüksek verimli ekstrüzyon hatlarıyla enerji tüketimi minimize edilir.',
      },
      {
        title: 'Isı Adası Etkisine Karşı Çözüm',
        desc: 'Yüksek güneş kontrol (Solar Low-E) camlarımız yazın klima yükünü azaltarak kentsel ısı adası etkisini düşürü.',
      },
    ],
    stats: [
      { label: 'Kurşun & Ağır Metal Oranı', value: '%0.0' },
      { label: 'Geri Dönüşüm Döngüsü', value: '7 Kez' },
      { label: 'Yıllık CO₂ Azaltımı / Daire', value: '1.2 Ton' },
      { label: 'ISO 14001 Çevre Standartı', value: 'Tam Uyum' },
    ],
  },
  {
    slug: 'kampanyalar',
    title: 'Kampanyalar',
    categoryGroup: 'KURUMSAL',
    heroBadge: '2026 SEZON FIRSATLARI & ÖDEME KOLAYLIKLARI',
    subtitle:
      'Kentsel dönüşüm, komple daire doğrama yenileme ve 4+20+4 Argon gazlı Isıcamlı Cam Balkon projelerinde geçerli güncel Çelikpen & Winsa kampanyaları.',
    seoDescription:
      'Winsa & Çelikpen 2026 Kampanyaları: Isıcamlı cam balkon, Dorado 76 PVC pencere ve kedi tüllü sineklik paketlerinde sezon indirimleri.',
    paragraphs: [
      'Evini kışa hazırlayanlar, balkonunu dört mevsim konforlu bir yaşam alanına dönüştürmek isteyenler ve kentsel dönüşüm projeleri için sunduğumuz avantajlı paketlerle üst segment yalıtımı en ulaşılabilir bütçelerle sunuyoruz.',
      'Tüm kampanyalarımızda ücretsiz lazerli keşif, 3D statik projelendirme ve Bahçelievler içi nakliye/montaj hizmetlerimiz standart olarak dahildir. Kendi ölçülerinizi girerek kampanya dahilindeki net bütçenizi Canlı m² Fiyat Hesaplama aracımızdan hemen görebilirsiniz.',
    ],
    highlights: [
      {
        title: 'KAMPANYA 1: VBS Isıcamlı Cam Balkonlarda Argon Gazı + Konfor Cam Farkı Bizden!',
        desc: '15 m² ve üzeri VBS Isıcamlı (4+20+4 mm) cam balkon siparişlerinizde ara boşluk Argon gazı dolumu ve ilk 1 adet Kedi Tüllü Plise Sineklik hediye.',
      },
      {
        title: 'KAMPANYA 2: Komple Daire Dorado 76 / Revotech Yenilemede Çift Açılım Hediyesi',
        desc: 'Eski pencerelerini Winsa Dorado 76 veya Revotech Gold ile yenileyen müşterilerimize tüm odalarda standart tek açılım fiyatına Çift Açılım (Vasistas) donanım yükseltmesi.',
      },
      {
        title: 'KAMPANYA 3: Apartman & Site Toplu Alımlarına Özel %12 Proje İskontosu',
        desc: 'Aynı apartman veya siteden 3 ve üzeri dairenin birlikte verdiği cam balkon veya PVC doğrama siparişlerinde net %12 toplu üretim indirimi.',
      },
      {
        title: 'KAMPANYA 4: Ücretsiz Lazerli Keşif + Termal Kamera Analizi',
        desc: 'Bahçelievler (Kocasinan, Şirinevler, Siyavuşpaşa, Yayla, Soğanlı, Yenibosna) genelinde mevcut pencerelerinizin ısı kaybını ücretsiz ölçüyoruz.',
      },
    ],
    stats: [
      { label: 'Toplu Proje İndirimi', value: '%12' },
      { label: 'Lazerli Keşif & Röleve', value: 'Ücretsiz' },
      { label: 'Teslimat Süresi', value: '7 - 12 İş Günü' },
      { label: 'Garanti Kapsamı', value: '10 Yıl' },
    ],
  },
  {
    slug: 'basinda-winsa',
    title: 'Basında Çelikpen',
    categoryGroup: 'MEDYA',
    heroBadge: 'MEDYA YANSIMALARI & SEKTÖREL HABERLER',
    subtitle:
      'Mimari yapı dergileri, ulusal basın ve sektörel yayınlarda yer alan yeni ürün lansmanlarımız, enerji verimliliği röportajlarımız ve ödüllerimiz.',
    seoDescription:
      'Basında Çelikpen: Mimari yayınlar, yeni nesil Comfort Slide Plus ve Revotech Gold lansman haberleri.',
    paragraphs: [
      'Yapı teknolojileri ve mimari cephe basını, yüksek enerji maliyetlerine karşı geliştirdiğimiz 84 mm Revotech Gold ve 4+20+4 Argon gazlı VBS Isıcamlı Cam Balkon çözümlerimizi yakından takip etmektedir.',
      'Kentsel dönüşüm bölgelerinde akustik konfor (45 dB) ve sıfır enerjili bina kabuğu üzerine yayınlanan teknik makalelerimiz ve basın bültenlerimiz aşağıda yer almaktadır.',
    ],
    highlights: [
      {
        title: 'Yapı & Mimari Dergisi — Ekim 2026: "Sürme Sistemlerde Yeni Çağ: Comfort Slide Plus"',
        desc: 'Fırça contalı klasik sürmelerin yerini alan, eksenel kilitleme mekanizmasıyla tam hava ve su sızdırmazlığı sağlayan Comfort Slide Plus serisi mimarlardan tam not aldı.',
      },
      {
        title: 'Ekonomi & Enerji Bülteni — Eylül 2026: "Isıcamlı Cam Balkon Doğalgaz Faturasını %38 Düşürüyor"',
        desc: 'Bahçelievler ve Bakırköy konutlarında yapılan termal kamera ölçümleri, VBS 4+20+4 Argon gazlı cam balkon uygulamasının kış aylarında balkon sıcaklığını +14°C koruduğunu kanıtladı.',
      },
      {
        title: 'Cephe Mühendisliği Özel Sayısı — Ağustos 2026: "Cool Colors ile Antrasit Gri Cephelerde Sıfır Genleşme"',
        desc: 'Koyu renkli doğramalarda güneş ısısını yansıtan nanoteknoloji pigment kaplamalarıyla 10 yıl renk ve form garantisi.',
      },
      {
        title: 'Dijital Dönüşüm Ödülü — Temmuz 2026: "Şeffaf Canlı m² Fiyat Hesaplama Modülü"',
        desc: 'Kullanıcıların saniyeler içinde balkon tipini ve cam kalınlığını seçerek net bütçe çıkarabildiği Çelikpen interaktif hesaplama motoru sektörde örnek gösterildi.',
      },
    ],
    stats: [
      { label: 'Sektörel Yayın & Makale', value: '45+' },
      { label: 'Mimar & Mühendis Semineri', value: '28' },
      { label: 'Tasarım & İnovasyon Ödülü', value: '6' },
      { label: 'Kurumsal İtibar Endeksi', value: 'A+' },
    ],
  },
  {
    slug: 'fuarlar-etkinlikler',
    title: 'Fuarlar ve Etkinlikler',
    categoryGroup: 'MEDYA',
    heroBadge: 'ULUSLARARASI YAPI FUARLARI & SHOWROOM GÜNLERİ',
    subtitle:
      'Avrasya Pencere, Cam ve Kapı Fuarı (Eurasia Window), İstanbul Yapı Fuarı (TurkeyBuild) katılımlarımız ve Bahçelievler Kocasinan Showroom mimar buluşmaları.',
    seoDescription:
      'Fuarlar ve Etkinlikler: Avrasya Pencere Fuarı, Yapı Fuarı İstanbul ve Çelikpen Kocasinan Showroom ürün deneyim etkinlikleri.',
    paragraphs: [
      'Her yıl düzenlenen uluslararası ihtisas fuarlarında mimarlar, mühendisler, müteahhitler ve son kullanıcılarla bir araya gelerek en yeni PVC pencere, kaldır-sür, panjur ve motorlu giyotin cam sistemlerimizi canlı ölçekte sergiliyoruz.',
      'Fuar dönemleri dışında da Bahçelievler Kocasinan Merkez Mahallesi’ndeki showroomumuzda tüm çalışan kesitleri, ses yalıtım test kabinini ve renk kartelalarını yılın 365 günü birebir deneyimleyebilirsiniz.',
    ],
    highlights: [
      {
        title: 'Avrasya Pencere & Cam Fuarı (TÜYAP İstanbul) — Kasım 2026',
        desc: 'Revotech Gold 84 mm, Panorama HS 76 Kaldır-Sür ve Somfy otomasyonlu Vera Giyotin Cam sistemlerimizin canlı performans lansmanı.',
      },
      {
        title: 'TurkeyBuild Yapı Fuarı İstanbul — Mayıs 2026',
        desc: 'Sürdürülebilir bina kabuğu, Winstor monoblok panjur akustik testleri ve Cool Colors yeni metalik renk koleksiyonu tanıtımı.',
      },
      {
        title: 'Kentsel Dönüşüm & Akustik Cephe Sempozyumu — Mart 2026',
        desc: 'İstanbul Avrupa Yakası müteahhit ve mimarlarına yönelik TS EN 1991-1-4 rüzgar yükü statiği ve ihale şartname standartları oturumu.',
      },
      {
        title: 'Kocasinan Merkez Showroom "Canlı Yalıtım Test Günleri" — Her Cumartesi',
        desc: 'Showroomumuzda ısı lambası ve desibelmetre ile tek cam, standart çift cam ve 4+20+4 Argonlu Konfor Isıcam farkını canlı olarak test edin.',
      },
    ],
    stats: [
      { label: 'Yıllık Fuar Katılımı', value: '4 Uluslararası' },
      { label: 'Showroom Canlı Numune', value: '22+ Seri' },
      { label: 'Haftalık Açık Gün', value: '6 Gün' },
      { label: 'Ücretsiz Teknik Sunum', value: 'Randevulu' },
    ],
  },
];
