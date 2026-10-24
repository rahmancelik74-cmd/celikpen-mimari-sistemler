export type ProfessionalSubpageSlug =
  | 'proje-hizmetleri'
  | 'kataloglar'
  | 'teknik-sartnameler'
  | 'kalite-belgeleri'
  | 'profesyonel-bakis'
  | 'montaj-kilavuzu'
  | 'kullanim-kilavuzu'
  | 'acilim-secenekleri'
  | 'referanslar'
  | 'blog';

export interface ProfessionalSubpageMeta {
  slug: ProfessionalSubpageSlug;
  title: string;
  heroBadge: string;
  subtitle: string;
  seoDescription: string;
}

export const PROFESSIONAL_SUBPAGES: ProfessionalSubpageMeta[] = [
  {
    slug: 'proje-hizmetleri',
    title: 'Proje Hizmetleri',
    heroBadge: 'MİMARİ DANIŞMANLIK & STATİK ANALİZ',
    subtitle:
      'Mimari projelerinizde doğru seri seçimi, TS EN 1991-1-4 rüzgar yükü (Ix / Iy atalet momenti) hesaplamaları, akustik simülasyon ve şantiye süpervizörlüğü.',
    seoDescription:
      'Winsa & Çelikpen Proje Hizmetleri: TS EN 1991-1-4 rüzgar yükü statik hesaplaması, profil atalet momenti seçimi, akustik dB simülasyonu ve şantiye süpervizörlüğü.',
  },
  {
    slug: 'kataloglar',
    title: 'Kataloglar',
    heroBadge: 'DİJİTAL BROŞÜR & CAD MERKEZİ',
    subtitle:
      'Winsa PVC Pencere, Sürme, Panjur, Donanım ve Çelikpen Isıcamlı Cam Balkon sistemlerine ait güncel teknik kataloglar, renk kartelaları ve DWG/BIM kütüphanesi.',
    seoDescription:
      'Winsa ürün katalogları, teknik kesit föyleri, Renk Dünyası kartelası ve Çelikpen Isıcamlı Cam Balkon dijital broşür merkezi.',
  },
  {
    slug: 'teknik-sartnameler',
    title: 'Teknik Şartnameler',
    heroBadge: 'İHALE POZ TARİFLERİ & YASAL MUVAFAKATNAME',
    subtitle:
      'Kamu ve özel sektör projeleri için TS EN 12608-1 A Sınıfı PVC doğrama, Kaldır-Sür ve Isıcamlı Cam Balkon ihale şartname metinleri ve apartman muvafakatname aracı.',
    seoDescription:
      'PVC pencere, sürme ve ısıcamlı cam balkon teknik şartname metinleri, TS EN 12608-1 ihale poz tarifleri ve Kat Mülkiyeti Kanunu muvafakatname oluşturucu.',
  },
  {
    slug: 'kalite-belgeleri',
    title: 'Kalite Belgeleri',
    heroBadge: 'ULUSLARARASI AKREDİTASYON & SERTİFİKALAR',
    subtitle:
      'TSE, EN 12608-1, RAL-GZ 716, IFT Rosenheim, CE Performans Beyanları (DoP), ISO 9001, ISO 14001 ve 100% Kurşunsuz Yeşil Profil sertifikasyonlarımız.',
    seoDescription:
      'Winsa ve Çelikpen kalite belgeleri: TS EN 12608-1, RAL-GZ 716, IFT Rosenheim test raporları, CE ve ISO yönetim sistemi sertifikaları.',
  },
  {
    slug: 'profesyonel-bakis',
    title: 'Profesyonel Bakış',
    heroBadge: 'MİMARİ EKOLOJİ, AKUSTİK & TERMAL MÜHENDİSLİK',
    subtitle:
      'Bina kabuğunda enerji verimliliği, Uw / Ug / Uf ısı transfer katsayılarının optimizasyonu, kentsel gürültü kontrolü ve sürdürülebilir yapı fiziği makaleleri.',
    seoDescription:
      'Profesyonel Bakış: Mimari yapılarda ısı yalıtımı (Uw), akustik ses kontrolü (Rw dB), güneş faktörü (g-değeri) ve doğru cam/profil kombinasyonu rehberi.',
  },
  {
    slug: 'montaj-kilavuzu',
    title: 'Montaj Kılavuzu',
    heroBadge: 'UYGULAMA & CAM TAKOZLAMA STANDARTLARI',
    subtitle:
      'PVC doğrama ve cam balkon sistemlerinde teraziye alma, ankraj vida aralıkları, EPDM/poliüretan sızdırmazlık ve doğru cam takozlama (taşıyıcı & mesafe takozu) şemaları.',
    seoDescription:
      'Winsa & Çelikpen Montaj Kılavuzu: Kasa ankraj aralıkları, su tahliye kanalı prensipleri ve kanat sarkmasını önleyen doğru cam takozlama diyagramları.',
  },
  {
    slug: 'kullanim-kilavuzu',
    title: 'Kullanım Kılavuzu',
    heroBadge: 'PERİYODİK BAKIM & UZUN ÖMÜRLÜ KULLANIM',
    subtitle:
      'Pencere, sürme ve cam balkon sistemlerinizin ilk günkü yalıtım ve mekanik performansını koruması için temizlik, ispanyolet yağlama, conta bakımı ve mevsimsel ayar rehberi.',
    seoDescription:
      'PVC pencere ve cam balkon kullanım ve bakım kılavuzu: Koruyucu bant sökümü, su tahliye temizliği, conta bakımı ve kış/yaz eksantrik pim ayarı.',
  },
  {
    slug: 'acilim-secenekleri',
    title: 'Açılım Seçenekleri',
    heroBadge: 'MİMARİ AÇILIM DİYAGRAMLARI',
    subtitle:
      'Yaşam alanlarınızın mimari kurgusuna göre tek açılım, çift açılım (vasistas), paralel sürme, kaldır-sür (HS), katlanır ve giyotin açılım kinematik şemaları.',
    seoDescription:
      'Winsa pencere, kapı, sürme ve cam balkon açılım seçenekleri: Tek açılım, çift açılım (vasistas), Volkswagen sürme, Hebeschiebe ve katlanır şemalar.',
  },
  {
    slug: 'referanslar',
    title: 'Referanslar',
    heroBadge: 'SEÇKİN KONUT & MİMARİ UYGULAMALAR',
    subtitle:
      'İstanbul Bahçelievler (Kocasinan, Şirinevler, Yenibosna, Siyavuşpaşa, Yayla, Soğanlı) ve Marmara genelinde tamamladığımız nitelikli konut ve ticari cephe projeleri.',
    seoDescription:
      'Çelikpen & Winsa referans projeleri: Bahçelievler, Bakırköy ve İstanbul genelinde uygulanan Dorado 76, Revotech Gold, Panorama HS 76 ve Isıcamlı Cam Balkon projeleri.',
  },
  {
    slug: 'blog',
    title: 'Blog',
    heroBadge: 'MİMARİ CAM & YALITIM KÜTÜPHANESİ',
    subtitle:
      'Isıcamlı cam balkon m² maliyet analizleri, PVC doğrama terleme çözümleri, kedi tüllü sineklik dayanımı ve kentsel dönüşümde doğrama seçimi üzerine uzman yazıları.',
    seoDescription:
      'Çelikpen & Winsa Blog: 2026 cam balkon ve PVC pencere teknolojileri, enerji tasarrufu hesaplamaları ve kullanıcı rehberleri.',
  },
];

export const CATALOG_DOCUMENTS = [
  {
    id: 'cat-dorado-revotech',
    title: 'Revotech Gold & Dorado 76 Mimari Sistem Kataloğu',
    category: 'Pencere ve Kapı Sistemleri',
    pages: '68 Sayfa',
    size: '14.2 MB',
    format: 'PDF + DWG Kesit',
    code: 'WNS-CAT-2026-01',
    relatedSlug: 'revotech-gold',
  },
  {
    id: 'cat-surme',
    title: 'Panorama HS 76, Comfort Slide Plus & Lotus Sürme Kataloğu',
    category: 'Sürme Sistemler',
    pages: '54 Sayfa',
    size: '11.8 MB',
    format: 'PDF + CAD Detay',
    code: 'WNS-CAT-2026-02',
    relatedSlug: 'comfort-slide-plus',
  },
  {
    id: 'cat-cambalkon',
    title: 'Çelikpen Winsa Vera Termal Isıcamlı, Vera Katlanır & Vera Giyotin Kataloğu',
    category: 'Cam Balkon Sistemleri',
    pages: '48 Sayfa',
    size: '9.6 MB',
    format: 'PDF + Statik Föy',
    code: 'CLK-CAT-2026-03',
    relatedSlug: 'vera-isicamli-cam-balkon',
  },
  {
    id: 'cat-panjur',
    title: 'Winstor Monoblok Panjur & Winkepenk Sistem Broşürü',
    category: 'Panjur ve Kepenk Sistemleri',
    pages: '32 Sayfa',
    size: '7.4 MB',
    format: 'PDF + Montaj Kesiti',
    code: 'WNS-CAT-2026-04',
    relatedSlug: 'winstor-monoblok-panjur',
  },
  {
    id: 'cat-renk-donanim',
    title: 'Winsa Renk Dünyası (Cool Colors) & Donanım Aksesuar Kataloğu',
    category: 'Donanım & Renkler',
    pages: '28 Sayfa',
    size: '8.1 MB',
    format: 'PDF Kartela',
    code: 'WNS-CAT-2026-05',
    relatedSlug: 'antrasit-ve-metalik-dis-cephe-renkleri',
  },
  {
    id: 'cat-statik',
    title: 'Mimari Rüzgar Yükü ve Atalet Momenti (Ix / Iy) Hesap Rehberi',
    category: 'Mühendislik El Kitabı',
    pages: '40 Sayfa',
    size: '6.5 MB',
    format: 'PDF Mühendislik Föyü',
    code: 'WNS-ENG-2026-06',
    relatedSlug: 'dorado-76',
  },
];

export const TECHNICAL_SPEC_TEXTS = [
  {
    id: 'spec-pvc-84',
    code: 'POZ NO: WNS-PVC-84 / 76',
    title: 'TS EN 12608-1 A Sınıfı PVC Pencere ve Kapı Doğrama Teknik Şartnamesi',
    series: 'Revotech Gold (84 mm) / Dorado 76 (76 mm)',
    content: `1. GENEL KAPSAM: Yapı dış cephe doğramalarında kullanılacak PVC profiller TS EN 12608-1 standardına uygun, %100 kurşunsuz (Ca-Zn kalsiyum-çinko stabilizatörlü) işlenmemiş (virgin) uPVC hammaddeden üretilmiş olmalıdır.
2. PROFİL GEOMETRİSİ VE ODACIK YAPISI: Ana kasa ve kanat profilleri projeye göre minimum 76 mm (5 odacıklı - Dorado 76) veya 84 mm (7 odacıklı, 3 contalı orta conta sistemli - Revotech Gold) montaj derinliğine sahip olmalıdır.
3. TAKVİYE SACI (STATİK DAYANIM): Tüm ana kasa, kanat ve orta kayıt profillerinin içerisinde TS EN 1991-1-4 rüzgar yükü hesaplarına göre belirlenmiş minimum 1.5 mm – 2.0 mm et kalınlığında sıcak daldırma galvanizli çelik destek sacı (Ix ve Iy atalet momenti değerlerini sağlayan bükümlü kesit) kesintisiz olarak kullanılacaktır.
4. SIZDIRMAZLIK VE CONTA: Profillerde yaşlanmaya ve UV ışınlarına dayanıklı TPE veya EPDM esaslı, köşelerde kesintisiz kaynaklanabilen/dönebilen iç-dış (veya ilave merkezi 3. conta) sızdırmazlık contaları bulunacaktır.
5. PERFORMANS DEĞERLERİ: Doğrama sisteminin toplam ısıl geçirgenlik katsayısı Uw <= 0.79 - 0.98 W/m²K, su sızdırmazlık sınıfı EN 12208'e göre minimum 9A (600 Pa), rüzgar yükü direnci EN 12210'a göre C3/B5 sınıfında olacaktır.`,
  },
  {
    id: 'spec-surme-hs',
    code: 'POZ NO: WNS-SUR-HS76 / CS',
    title: 'Yüksek Yalıtımlı Kaldır-Sür (Hebeschiebe) ve Yeni Nesil Sürme Şartnamesi',
    series: 'Panorama HS 76 / Comfort Slide Plus',
    content: `1. SİSTEM TANIMI: Geniş teras ve bahçe açıklıklarında eşiksiz veya 19 mm engelsiz alüminyum alt eşikli, kaldırma-sürme (Hebeschiebe) veya eksenel kilitlemeli (Comfort Slide Plus) PVC sürme sistemi kullanılacaktır.
2. KASA VE KANAT KESİTİ: Panorama HS 76 sisteminde kasa genişliği 175 mm, kanat genişliği 76 mm (5 odacıklı) olacak; kanat ağırlığı 250 kg - 300 kg'a kadar özel rulmanlı arabalarla tek parmak kuvvetiyle hareket ettirilebilecektir.
3. SIZDIRMAZLIK: Klasik fırça contalı sürmeler yerine, kilitlendiğinde tüm çevrede baskı oluşturan EPDM/TPE kauçuk contalı tam hava ve su sızdırmaz mekanizma kullanılacaktır.`,
  },
  {
    id: 'spec-cambalkon-vbs',
    code: 'POZ NO: CLK-Vera Termal-ISI28',
    title: 'Isıcamlı (4+20+4 mm Argon Gazlı + Temperli) Katlanır Cam Balkon Şartnamesi',
    series: 'Çelikpen Winsa Vera Termal Isıcamlı Seri (38 mm Kanat)',
    content: `1. ALÜMİNYUM PROFİL: Tüm taşıyıcı kasa ve kanat profilleri 6063-T6 (EN AW-6063) mimari alaşımlı birincil alüminyumdan çekilmiş, minimum 3.0 mm et kalınlığında ve elektrostatik toz boya (QUALICOAT belgeli RAL 7016 Antrasit / Mat Siyah) veya eloksal kaplamalı olacaktır.
2. CAM ÜNİTESİ: Her iki yüzü de TS EN 12150-1 standardına göre tam temperli (güvenlik camı) 4 mm + 20 mm ara boşluk (Argon gaz dolumlu) + 4 mm Low-E/Sinerji kaplamalı toplam 28 mm çift cam ünitesi kullanılacaktır.
3. TEKERLEK VE RULMAN: Her kanatta üstte 4, altta 4 olmak üzere toplam 8 adet paslanmaz çelik gövdeli, çift sıralı bilyalı rulman sistemi kullanılacak; plastik ara kapak yerine alüminyum etek ve dikey EPDM/manyetik fitil kullanılacaktır.`,
  },
];

export const QUALITY_CERTIFICATES = [
  {
    code: 'TS EN 12608-1',
    org: 'TSE - Türk Standartları Enstitüsü',
    title: 'İklim Bölgesi S (Şiddetli İklim) uPVC Profil Uygunluk Belgesi',
    desc: 'Yüksek güneş radyasyonu ve sert iklim koşullarına karşı darbe, boyutsal kararlılık ve UV renk haslığı uygunluğu.',
    validity: 'Sürekli Denetimli • Aktif',
  },
  {
    code: 'RAL-GZ 716',
    org: 'Alman Kalite Güvence Enstitüsü (RAL)',
    title: 'RAL Kalite İşareti — Plastik Pencere Profil Sistemleri',
    desc: 'Hammadde formülasyonundan ekstrüzyon toleranslarına kadar Avrupa nın en sıkı bağımsız profil kalite standardı.',
    validity: 'Uluslararası Akreditasyon',
  },
  {
    code: 'IFT ROSENHEIM',
    org: 'ift Rosenheim GmbH (Almanya)',
    title: 'Uw Isı Yalıtımı, Akustik (dB) ve Hava/Su Sızdırmazlık Test Raporları',
    desc: 'Revotech Gold (Uw: 0.79 W/m²K), Dorado 76 ve Panorama HS 76 serilerinin bağımsız laboratuvar performans testleri.',
    validity: 'EN 14351-1 Doğrulamalı',
  },
  {
    code: 'TS EN 12150-1 & EN 1279',
    org: 'Şişecam / Akredite Cam Laboratuvarları',
    title: 'Temperli Güvenlik Camı ve Isıcam Yalıtım Ünitesi Sertifikası',
    desc: 'Cam balkon sistemlerinde kullanılan 8 mm - 10 mm temperli camların kırılma güvenliği ve argon gaz sızdırmazlık belgesi.',
    validity: 'CE İşaretli',
  },
  {
    code: 'ISO 9001 / 14001 / 45001',
    org: 'Uluslararası Standartlar Organizasyonu',
    title: 'Entegre Kalite, Çevre ve İş Sağlığı Güvenliği Yönetim Sistemleri',
    desc: '%100 Kurşunsuz (Ca-Zn) geri dönüştürülebilir üretim ve sıfır iş kazası hedefli montaj süreç yönetimi.',
    validity: '2026 Güncel Sertifika',
  },
  {
    code: 'QUALICOAT & QUALANOD',
    org: 'Avrupa Yüzey İşlem Birliği',
    title: 'Mimari Alüminyum Elektrostatik Toz Boya ve Eloksal Kalite Belgesi',
    desc: 'Alüminyum cam balkon ve panjur profillerinde korozyon, tuzlu su sisi ve UV solmasına karşı 10 yıl yüzey garantisi.',
    validity: 'Seaside Sınıfı Dayanım',
  },
];

export const PROFESSIONAL_INSIGHT_ARTICLES = [
  {
    id: 'uw-ug-uf-analizi',
    tag: 'TERMAL FİZİK & ENERJİ',
    title: 'Mimari Cephede Uw, Ug ve Uf Katsayılarının Bütüncül Hesaplanması',
    summary:
      'Bir pencere veya cam balkon sisteminin ısı yalıtım performansı yalnızca camın (Ug) veya yalnızca profilin (Uf) değerine bakılarak ölçülemez. EN ISO 10077-1 standardına göre toplam ısı geçiş katsayısı (Uw) nasıl optimize edilir?',
    metrics: [
      { label: 'Revotech Gold Uw', value: '0.79 W/m²K' },
      { label: 'Dorado 76 Uw', value: '0.98 W/m²K' },
      { label: 'Winsa Vera Termal Isıcamlı Cam Balkon', value: '1.10 W/m²K' },
    ],
    body: `Yapı kabuğundaki ısı kayıplarının %35 ila %40'ı pencere ve balkon açıklıklarından gerçekleşir. EN ISO 10077-1 denkleminde toplam ısıl geçirgenlik (Uw); profil alanı ve Uf değeri, cam alanı ve Ug değeri ile cam çıtası birleşim hattındaki doğrusal ısı köprüsü kaybının (Psi - Ψ) ağırlıklı ortalamasıdır. 84 mm genişliğinde 7 odacıklı ve 3 contalı Revotech Gold profil sistemi, 52 mm üçlü Low-E argon gazlı cam ünitesi ve sıcak kenar (warm-edge) çıtası ile birleştiğinde Uw değerini 0.79 W/m²K seviyesine indirerek Pasif Ev (Passive House) kriterlerini karşılar.`,
  },
  {
    id: 'akustik-mimari',
    tag: 'AKUSTİK KONFOR & dB',
    title: 'E-5, Basın Ekspres ve Havalimanı Aksında 45 dB Ses Yalıtımı Mühendisliği',
    summary:
      'Desibel (dB) logaritmik bir ölçektir: Dış gürültüyü 10 dB azaltmak, insan kulağının algıladığı gürültü şiddetini tam %50 oranında yarıya indirir. Asimetrik cam kombinasyonu ve 3 contalı profil tasarımı nasıl çalışır?',
    metrics: [
      { label: 'Standart Tek Cam', value: '~26 dB' },
      { label: 'Standart Çift Cam', value: '~32 dB' },
      { label: 'Akustik Lamine + Revotech', value: '45 dB (%80+ Azalma)' },
    ],
    body: `Kentsel trafiğin yoğun olduğu Bahçelievler Kocasinan, Şirinevler ve Yenibosna gibi akslarda dış ortam gürültüsü 75-80 dB seviyesindedir. Dünya Sağlık Örgütü (WHO) sağlıklı bir uyku ve çalışma odası için iç ortam ses seviyesinin 30-35 dB altında olmasını önerir. Ses dalgalarının rezonans (coincidence dip) frekansını kırmak için dış ve iç cam kalınlıkları farklı seçilmeli (örneğin 6 mm Akustik Lamine + 16 mm Argon + 4 mm Düz Cam) ve ses sızıntısını sıfırlayan kesintisiz TPE orta contalı (Revotech Gold / Dorado 76) sistemler tercih edilmelidir.`,
  },
  {
    id: 'ruzgar-yuku-statik',
    tag: 'STATİK & ATALET MOMENTİ',
    title: 'Yüksek Katlarda TS EN 1991-1-4 Rüzgar Yükü ve Atalet Momenti (Ix / Iy) Seçimi',
    summary:
      '8. kat ve üzerindeki dairelerde veya açık cepheli teraslarda rüzgar emme ve basınç kuvvetleri katlanarak artar. Orta kayıt sehimini (esnemesini) L/300 sınırında tutmak için gerekli çelik destek sacı ve profil kesiti.',
    metrics: [
      { label: 'Maksimum İzin Verilen Sehim', value: 'L / 300' },
      { label: 'Rüzgar Direnç Sınıfı', value: 'C3 / B5 (EN 12210)' },
      { label: 'Su Sızdırmazlık Sınıfı', value: '9A (600 Pa)' },
    ],
    body: `Bir doğrama sisteminin rüzgar yükü altında esnememesi ve cam ünitesine aşırı yük bindirmemesi için orta kayıt (mullion) profilinin içindeki galvanizli çelik destek sacının Atalet Momenti (Ix - cm⁴) değeri kritik önem taşır. Çelikpen proje departmanı, her şantiyenin kat yüksekliği, bina konumu (rüzgar arazi kategorisi) ve doğrama açıklık ölçülerine göre gerekli Ix değerini hesaplar; geniş açıklıklarda statik ortakayıt veya takviyeli kenetli profiller kullanarak sıfır titreşim garantisi sunar.`,
  },
];

export const OPENING_OPTIONS_DATA = [
  {
    code: 'AÇILIM-01',
    name: 'Tek Açılım Pencere / Kapı',
    series: 'Dorado 76, Revotech, Safir 76, Karina',
    type: 'single-turn',
    description:
      'Dikey menteşe ekseni etrafında içe doğru 90°-180° açılan klasik ve ekonomik kanat sistemi. Temizliği kolaydır ve tam çevre kilitleme sağlar.',
    idealFor: 'Yatak odaları, salon yan kanatları, balkon kapıları.',
  },
  {
    code: 'AÇILIM-02',
    name: 'Çift Açılım (Turn & Tilt / Vasistaslı)',
    series: 'Revotech Gold, Dorado 76, Safir 76',
    type: 'tilt-turn',
    description:
      'Hem normal içe açılım hem de üstten 15 cm devrilerek (vasistas) güvenli ve cereyansız havalandırma sağlayan çift fonksiyonlu mekanizma.',
    idealFor: 'Çocuk odaları, mutfaklar, tüm yaşam alanları (Standart Önerilen).',
  },
  {
    code: 'AÇILIM-03',
    name: 'Kaldır-Sür (Hebeschiebe / HS)',
    series: 'Panorama HS 76',
    type: 'lift-slide',
    description:
      'Kol çevrildiğinde kanadı 8 mm yukarı kaldırarak EPDM contaları serbest bırakan, 300 kg ağırlığındaki dev cam panelleri tek parmakla kaydıran lüks sistem.',
    idealFor: 'Geniş salon terasları, bahçe çıkışları, dubleks çatı katları.',
  },
  {
    code: 'AÇILIM-04',
    name: 'Yeni Nesil Eksenel Sürme',
    series: 'Comfort Slide Plus, Lotus',
    type: 'axial-slide',
    description:
      'Sürme pratikliğini pencere sızdırmazlığıyla birleştiren; kapanırken kasa contasına doğru 6 mm vakumlanarak tam kilitlenen yeni nesil sürme.',
    idealFor: 'Dar balkonlar, mutfak-balkon geçişleri, rüzgarlı üst katlar.',
  },
  {
    code: 'AÇILIM-05',
    name: 'Katlanır Cam Balkon (8 Tekerlekli)',
    series: 'Winsa Vera Termal Isıcamlı Cam Balkon, Vera Katlanır',
    type: 'folding-glass',
    description:
      'Bağımsız kanatların alüminyum ray üzerinde kayarak köşe park alanında kitap gibi katlandığı, balkonu %100 açık veya %100 kapalı odaya dönüştüren sistem.',
    idealFor: 'L balkonlar, U balkonlar, oval ve düz apartman balkonları.',
  },
  {
    code: 'AÇILIM-06',
    name: 'Dikey Motorlu Giyotin (Hareketli Küpeşte)',
    series: 'Vera Giyotin Motorlu Sistem',
    type: 'guillotine',
    description:
      'Uzaktan kumanda ile dikey eksende aşağı-yukarı hareket eden, açık konumda alt sabit panelin 110 cm güvenli cam korkuluk olduğu motorlu sistem.',
    idealFor: 'Kış bahçeleri, teraslar, restoranlar ve panoramik dubleksler.',
  },
];

export const REFERENCE_PROJECTS = [
  {
    id: 'ref-01',
    title: 'Kocasinan Merkez Mah. Panoramik Dubleks Teras & Cephe Dönüşümü',
    district: 'Bahçelievler / Kocasinan Merkez',
    systemUsed: 'Revotech Gold (84mm) + Winsa Vera Termal 4+20+4 Isıcamlı Cam Balkon',
    color: 'Antrasit Gri (RAL 7016) & Füme Reflekte Cam',
    area: '48 m² Doğrama & Cam Balkon',
    year: '2026',
    highlight: 'Isı kaybında %46 tasarruf, 42 dB akustik ses yalıtımı sağlandı.',
  },
  {
    id: 'ref-02',
    title: 'Şirinevler E-5 Cepheli Konut Sitesi Akustik Doğrama Yenilemesi',
    district: 'Bahçelievler / Şirinevler',
    systemUsed: 'Dorado 76 (5 Odacıklı) + Akustik Lamine Üçlü Cam',
    color: 'Altın Meşe (Lamine) / İç Beyaz',
    area: '36 Daire (Toplu Proje)',
    year: '2025 - 2026',
    highlight: 'E-5 karayolu gürültüsü 78 dB seviyesinden 32 dB iç ortam konforuna düşürüldü.',
  },
  {
    id: 'ref-03',
    title: 'Siyavuşpaşa Çamlık Caddesi Köşe L-Balkon Isıcamlı Kapatma',
    district: 'Bahçelievler / Siyavuşpaşa',
    systemUsed: 'Winsa Vera Termal Isıcamlı Cam Balkon + Kedi Tüllü Plise Sineklik',
    color: 'Mat Siyah Eloksal + Şeffaf Konfor Cam',
    area: '18.5 m² Köşe Balkon',
    year: '2026',
    highlight: 'Köşe birleşiminde sabit kayıt kullanılmadan %100 kesintisiz manzara elde edildi.',
  },
  {
    id: 'ref-04',
    title: 'Basın Ekspres & Yenibosna Rezidans Teras Kaldır-Sür Uygulaması',
    district: 'Bahçelievler / Yenibosna Merkez',
    systemUsed: 'Panorama HS 76 (Kaldır-Sür) + Winstor Motorlu Panjur',
    color: 'Metalik Antrasit (Cool Colors)',
    area: '32 m² Teras Cephesi',
    year: '2026',
    highlight: '19 mm engelsiz eşik ve Somfy akıllı ev otomasyonlu panjur entegrasyonu.',
  },
  {
    id: 'ref-05',
    title: 'Bahçelievler Merkez (Yayla) Bahçe Katı Bioklimatik Kış Bahçesi',
    district: 'Bahçelievler / Yayla',
    systemUsed: 'Bioklimatik Pergola + Vera Motorlu Giyotin Cam',
    color: 'Antrasit Gri + Günışığı LED Entegrasyonlu',
    area: '28 m² Bahçe Terası',
    year: '2026',
    highlight: '4 mevsim oturma odası konforunda, uzaktan kumandalı cam ve tavan sistemi.',
  },
  {
    id: 'ref-06',
    title: 'Soğanlı & Cumhuriyet Mah. Kentsel Dönüşüm Blokları PVC Doğrama',
    district: 'Bahçelievler / Soğanlı',
    systemUsed: 'Safir 76 + Comfort Slide Plus Sürme + Winstor Panjur',
    color: 'Krem & Antrasit Kombinasyonu',
    area: '24 Bağımsız Bölüm',
    year: '2025 - 2026',
    highlight: 'TS EN 12608-1 şartnamesine tam uyumlu anahtar teslim şantiye montajı.',
  },
];

export const BLOG_POSTS = [
  {
    slug: 'isicamli-cam-balkon-mu-katlanir-tek-cam-mi',
    category: 'Karşılaştırma & Rehber',
    date: '15 Ekim 2026',
    readTime: '5 dk okuma',
    title: '4+20+4 Argon Gazlı Isıcamlı Cam Balkon mu, 8mm Tek Cam Katlanır mı?',
    excerpt:
      'Balkonunuzu kışın da aktif bir oda (çalışma odası, kış bahçesi veya yemek alanı) olarak kullanmak istiyorsanız 28 mm Isıcamlı Vera Termal serisi ile standart 8 mm tek cam arasındaki 3.5 katlık ısı yalıtım farkını inceleyin.',
    keyTakeaways: [
      'Isıcamlı Vera Termal serisinde Uw değeri 1.1 W/m²K iken tek camda 5.2 W/m²K seviyesindedir.',
      'Kış aylarında cam yüzeyinde oluşan yoğuşma (terleme) ısıcamlı sistemde %90 oranında engellenir.',
      'Her iki yüzeyin temperli olması maksimum darbe ve rüzgar güvenliği sağlar.',
    ],
    ctaHref: '/urunler/vera-isicamli-cam-balkon',
    ctaLabel: 'Winsa Vera Termal Isıcamlı Sistem Teknik Detayları',
  },
  {
    slug: 'pvc-pencerede-76mm-ve-84mm-profil-farki',
    category: 'Mimari Mühendislik',
    date: '08 Ekim 2026',
    readTime: '6 dk okuma',
    title: 'Yeni Nesil PVC Doğramada 76 mm (Dorado 76) ve 84 mm (Revotech Gold) Seçimi',
    excerpt:
      'Klasik 60 mm profiller neden yerini 76 mm ve 84 mm çok odacıklı sistemlere bıraktı? Orta conta (3. conta) teknolojisinin rüzgar ıslığı ve fatura tasarrufuna doğrudan etkisi.',
    keyTakeaways: [
      '84 mm Revotech Gold, 7 odacıklı yapısı ve 3. merkezi contasıyla Uw: 0.79 W/m²K değerine ulaşır.',
      '52 mm ye kadar üçlü ısıcam (4+18+4+18+4) kullanımına olanak tanır.',
      'İispanyolet mekanizmasını dış nemden koruyarak donanım ömrünü ikiye katlar.',
    ],
    ctaHref: '/urunler/revotech-gold',
    ctaLabel: 'Revotech Gold Serisini İncele',
  },
  {
    slug: 'apartmanlarda-cam-balkon-yasal-muvafakatname-rehberi',
    category: 'Mevzuat & Hukuk',
    date: '01 Ekim 2026',
    readTime: '4 dk okuma',
    title: 'Kat Mülkiyeti Kanunu (KMK Madde 19) ve Cam Balkon Yönetici İzin Rehberi',
    excerpt:
      'Apartman ve sitelerde dış cephe bütünlüğünü koruyarak sorunsuz cam balkon yaptırmanın altın kuralları: Gömme balkon Yargıtay içtihatları, RAL renk uyumu ve hazır muvafakatname belgesi.',
    keyTakeaways: [
      'Gömme balkonlarda bina statiğine ve dış cephe rengine sadık kalınması esastır.',
      'Yönetim planında belirlenen RAL 7016 Antrasit veya Füme cam rengine birebir uyum sağlanmalıdır.',
      'Online Muvafakatname aracımızla 30 saniyede imzaya hazır izin belgesi çıkarabilirsiniz.',
    ],
    ctaHref: '/profesyoneller/teknik-sartnameler',
    ctaLabel: 'Muvafakatname Oluşturucuyu Aç',
  },
  {
    slug: 'kedi-tullu-plise-sineklik-dayanim-testi',
    category: 'Donanım & Güvenlik',
    date: '22 Eylül 2026',
    readTime: '3 dk okuma',
    title: 'Evcil Hayvan Sahipleri İçin Patiye Dayanıklı Kedi Tüllü Plise Sineklik',
    excerpt:
      'Standart fiberglas tüller kedi tırnaklarına karşı neden yetersiz kalır? Çelikpen PVC kaplı yüksek mukavemetli polyester (Pet-Screen) kedi tülü ve emniyet kilitli profil sistemi.',
    keyTakeaways: [
      'Yırtılma direnci standart sineklik tülüne göre 7 kat daha yüksektir.',
      'Hem PVC pencerelere hem de katlanır/sürme cam balkon kasalarına tam entegre olur.',
      'Güneş UV ışınlarında gevreme veya sarkma yapmaz.',
    ],
    ctaHref: '/urunler/paslanmaz-rulman-ve-kedi-sinekligi-sistemleri',
    ctaLabel: 'Kedi Tüllü Sineklik Detayları',
  },
];
