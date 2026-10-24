export type CorporateSubpageSlug =
  | 'hakkimizda'
  | 'kalite-politikamiz'
  | 'sertifikalarimiz'
  | 'uretim-teknolojimiz'
  | 'surdurulebilirlik'
  | 'insan-kaynaklari'
  | 'kvkk'
  | 'basinda-celikpen'
  | 'fuarlar-etkinlikler';

export type CorporateVisualVariant =
  | 'heritage'
  | 'quality'
  | 'certificates'
  | 'production'
  | 'sustainability'
  | 'careers'
  | 'privacy'
  | 'press'
  | 'events';

export interface CorporateStandard {
  code: string;
  title: string;
  description: string;
}

export interface CorporateCta {
  title: string;
  description: string;
  label: string;
  href: string;
}

export interface CorporateSubpageData {
  slug: CorporateSubpageSlug;
  title: string;
  categoryGroup: 'KURUMSAL' | 'KALİTE' | 'MEDYA';
  heroBadge: string;
  subtitle: string;
  seoDescription: string;
  visual: CorporateVisualVariant;
  paragraphs: string[];
  highlights: { title: string; desc: string }[];
  stats: { label: string; value: string }[];
  standards?: CorporateStandard[];
  listTitle?: string;
  list?: string[];
  cta?: CorporateCta;
}

/* ============================================================================
   ÇELİKPEN — 30 YILLIK KURUMSAL MİRAS
   1996–2026 kurumsal anlatısı, Avrupa performans standartları ve Winsa
   yetkili üretim modeli tek veri kaynağından beslenir. Slugs, static params,
   sitemap, hub kartları ve alt sayfa navigasyonu bu liste üzerinden üretilir.
   ========================================================================== */

export const CORPORATE_STANDARDS: CorporateStandard[] = [
  {
    code: 'EN 12207',
    title: 'Hava Geçirimsizliği',
    description:
      'Kanat-kasa birleşimlerinde sınıf 4 hava sızdırmazlığı; rüzgâr, toz ve ısı kaybına karşı ölçülebilir bariyer.',
  },
  {
    code: 'EN 12208',
    title: 'Su Sızdırmazlığı',
    description:
      'Sürme ve açılır sistemlerde 9A seviyesine kadar su sızdırmazlığı; gizli tahliye kanalı ve EPDM conta disiplini.',
  },
  {
    code: 'EN 12210',
    title: 'Rüzgâr Yükü Direnci',
    description:
      'C5/B5 sınıfına kadar 2000 Pa yük altında statik performans; cephe geometrisine göre mühendislik hesabı.',
  },
  {
    code: 'Uw',
    title: 'Isı İletim Katsayısı',
    description:
      'Sistem konfigürasyonuna göre Uw 0,8–1,1 W/(m²K); argon dolum, low-e kaplama ve sıcak kenar adaptörü.',
  },
];

export const CORPORATE_CERTIFICATES: CorporateStandard[] = [
  {
    code: 'TSE EN 12150',
    title: 'Temperli Güvenlik Camı',
    description:
      'Isıl işlemli temperli cam üretimi, kırılma güvenliği ve Şişecam kalite belgeleriyle doğrulanır.',
  },
  {
    code: 'EN 14351-1',
    title: 'Pencere ve Kapı Ürün Standardı',
    description:
      'Avrupa performans beyanı, CE işareti ve dış cephe doğramaları için harmonize ürün standardı.',
  },
  {
    code: 'CE',
    title: 'Avrupa Uygunluk Beyanı',
    description:
      'AB pazarına sunulan cam, doğrama ve yalıtım sistemleri için teknik dosya ve uygunluk işareti.',
  },
  {
    code: 'ISO 9001:2015',
    title: 'Kalite Yönetim Sistemi',
    description:
      'Tasarımdan sevkiyata, montajdan satış sonrası desteğe kadar tüm süreçlerin uluslararası yönetimi.',
  },
  {
    code: 'TS EN 12608-1',
    title: 'PVC Profil Sınıfı',
    description:
      'Winsa PVC profillerinde A sınıfı duvar kalınlığı, iklim dayanımı ve çok odacıklı gövde standardı.',
  },
  {
    code: 'QUALICOAT',
    title: 'Alüminyum Yüzey Kaplama',
    description:
      'Elektrostatik toz boya, ön işlem ve yüzey dayanımı için uluslararası kaplama kalite standardı.',
  },
];

export const CORPORATE_COUNTERS = [
  { value: '30 Yıl', label: 'Deneyim', detail: '1996’dan bugüne' },
  { value: '15.000+', label: 'Tamamlanan Proje', detail: 'Konut ve ticari uygulama' },
  { value: '%100', label: 'Lazer Ölçüm Hassasiyeti', detail: 'Milimetrik keşif ve üretim' },
  { value: '10 Yıl', label: 'Sistem Garantisi', detail: 'Yazılı ve devredilebilir güvence' },
];

export const CORPORATE_SUBPAGES: CorporateSubpageData[] = [
  {
    slug: 'hakkimizda',
    title: 'Hakkımızda',
    categoryGroup: 'KURUMSAL',
    heroBadge: '1996’DAN BUGÜNE 30 YILLIK MİMARİ MİRAS',
    subtitle:
      'Bahçelievler’de başlayan atölye üretiminden İstanbul’un mimari cam ve doğrama markasına uzanan 30 yıllık mühendislik hikâyesi.',
    seoDescription:
      'Çelikpen Hakkımızda: 1996’dan bugüne 30 yıllık deneyim, 15.000+ tamamlanan proje, kendi CNC üretim tesisi ve Winsa çözüm ortaklığı.',
    visual: 'heritage',
    paragraphs: [
      'Temelleri 1996 yılında İstanbul / Bahçelievler’de atılan Çelikpen, 30 yıllık birikimini ısıcamlı cam balkon, katlanır cam balkon, sürme seri sistemler, motorlu giyotin cam, bioklimatik pergola, kış bahçesi, PVC pencere & kapı, panjur ve mimari alüminyum sistemleriyle bugünün yaşam alanlarına taşıyor.',
      'Kendi üretim tesisi, lazer ölçüm teknolojisi ve kadrolu montaj ekibiyle keşiften anahtar teslim montaja kadar tek muhatap olarak çalışıyor; konut ve prestijli ticari projelerde dört mevsim konforlu, yüksek yalıtımlı ve estetik çözümler üretiyoruz.',
      '1996–2026 aralığında 15.000’den fazla projeyi tamamlayan markamız; Winsa kalitesini temperli/ısıcam teknolojileriyle birleştirerek 10 yıl sistem garantisiyle İstanbul’un referans markalarından biri olmayı sürdürüyor.',
    ],
    highlights: [
      {
        title: '1996’dan Bugüne',
        desc: '30 yıllık kesintisiz üretim, saha tecrübesi ve kurumsal hafıza.',
      },
      {
        title: 'Kendi Üretim ve Montaj',
        desc: 'CNC atölyesi, lazer ölçüm ve kadrolu montaj ekibi; süreçte taşeron yok.',
      },
      {
        title: 'Winsa Çözüm Ortaklığı',
        desc: 'Winsa PVC profil ve yalıtım teknolojileriyle uyumlu mühendislik ve üretim.',
      },
      {
        title: '10 Yıl Sistem Garantisi',
        desc: 'Profil, mekanizma ve montaj bütünlüğü için yazılı güvence.',
      },
    ],
    stats: [
      { value: '30 Yıl', label: 'Deneyim' },
      { value: '15.000+', label: 'Tamamlanan Proje' },
      { value: '1996', label: 'Kuruluş Yılı' },
      { value: '10 Yıl', label: 'Sistem Garantisi' },
    ],
    cta: {
      title: '30 Yıllık Hikâyeyi Yakından Tanıyın',
      description:
        'Kocasinan Merkez üretim tesisimizi ve mimari sistem showroomumuzu ziyaret edin; projenize özel mühendislik yaklaşımımızı yerinde görün.',
      label: 'Showroom Randevusu',
      href: '/iletisim?form=kesif',
    },
  },
  {
    slug: 'kalite-politikamiz',
    title: 'Kalite Politikamız',
    categoryGroup: 'KALİTE',
    heroBadge: 'ÖLÇÜLEBİLİR KALİTE, BELGELİ ÜRETİM',
    subtitle:
      'Hammadde girişinden montaj sonrası teslimata kadar her aşama; ölçülebilir kontrol noktaları ve Avrupa performans standartlarıyla yönetilir.',
    seoDescription:
      'Çelikpen Kalite Politikası: EN 12207 hava geçirimsizliği, EN 12208 su sızdırmazlığı, EN 12210 rüzgâr yükü ve Uw ısı iletim katsayısı standartlarında üretim.',
    visual: 'quality',
    paragraphs: [
      'Çelikpen kalite politikası; alüminyum profil, PVC doğrama, temperli cam, ısıcam ve donanım bileşenlerinin giriş kalite kontrolünden başlar. Her partide boyut, yüzey, sertlik, renk ve tolerans değerleri kayıt altına alınır.',
      'Üretimde 0,1 mm hassasiyetli CNC işleme, kontrollü temperleme, argon dolum ve EPDM conta uygulamaları standarttır. Montaj öncesinde hava geçirimsizliği, su sızdırmazlığı ve rüzgâr yükü performansı proje detaylarına göre doğrulanır.',
      'Her teslimat; ölçü kontrolü, kanat hareketi, kilit ve ispanyolet testi, su deşarj testi ve garanti belgesiyle tamamlanır. Amacımız yalnızca ilk gün değil, 10 yıl sonra da aynı performansı koruyan sistemler teslim etmektir.',
    ],
    highlights: [
      {
        title: 'Hammadde Giriş Kontrolü',
        desc: 'Profil, cam, conta ve donanım partileri üretime girmeden önce belgeli kontrol sürecinden geçer.',
      },
      {
        title: 'Ölçülebilir Üretim',
        desc: 'CNC toleransları, kesim listeleri ve montaj numaraları dijital iş emriyle eşleştirilir.',
      },
      {
        title: 'Performans Doğrulama',
        desc: 'Hava, su, rüzgâr ve ısı performansı proje konfigürasyonuna göre hesaplanır ve raporlanır.',
      },
      {
        title: 'Teslim Sonrası Takip',
        desc: 'Garanti kapsamı, kullanım talimatı ve periyodik bakım planı teslimat dosyasında yer alır.',
      },
    ],
    stats: [
      { value: '%100', label: 'Giriş Kalite Kontrolü' },
      { value: '0,1 mm', label: 'CNC Toleransı' },
      { value: '9A', label: 'Su Sızdırmazlığı' },
      { value: '10 Yıl', label: 'Sistem Garantisi' },
    ],
    standards: CORPORATE_STANDARDS,
    cta: {
      title: 'Teknik Dosyayı İnceleyin',
      description:
        'Projeniz için performans sınıfları, cam konfigürasyonu ve garanti kapsamını birlikte netleştirelim.',
      label: 'Teknik Görüşme Planla',
      href: '/iletisim?form=bilgi',
    },
  },
  {
    slug: 'sertifikalarimiz',
    title: 'Sertifikalarımız',
    categoryGroup: 'KALİTE',
    heroBadge: 'TSE • CE • EN 14351-1 • ISO 9001',
    subtitle:
      'Ürün güvenliği, yalıtım performansı ve üretim disiplinini belgeleyen ulusal ve uluslararası sertifikasyon altyapısı.',
    seoDescription:
      'Çelikpen sertifikaları: TSE EN 12150 temperli cam, EN 14351-1, CE uygunluk beyanı, ISO 9001:2015, TS EN 12608-1 ve QUALICOAT kalite belgeleri.',
    visual: 'certificates',
    paragraphs: [
      'Çelikpen’in üretim ve uygulama süreçleri; TSE EN 12150 temperli cam, EN 14351-1 pencere ve kapı standardı, CE uygunluk beyanı ve ISO 9001:2015 kalite yönetim sistemi ile belgelenir.',
      'Winsa PVC profil teknolojileri TS EN 12608-1 kapsamında değerlendirilir; alüminyum yüzeylerde QUALICOAT uyumlu ön işlem ve elektrostatik toz boya kullanılır. Cam tedarikinde Şişecam Temper ve Isıcam Konfor belgeleri esas alınır.',
      'Sertifikasyon yalnızca bir dosya değil, süreklilik taahhüdüdür. Her yeni seri ve tedarikçi, mevcut kalite sistemine eklenmeden önce teknik dosya ve numune kontrolünden geçirilir.',
    ],
    highlights: [
      {
        title: 'Ürün Güvenliği',
        desc: 'Temperli cam, lamine cam ve korkuluk bileşenlerinde kırılma güvenliği belgeleri.',
      },
      {
        title: 'Avrupa Performansı',
        desc: 'EN 14351-1 kapsamında hava, su, rüzgâr, ısı ve akustik performans beyanı.',
      },
      {
        title: 'Süreç Belgelendirme',
        desc: 'ISO 9001:2015 ile tasarım, üretim, montaj ve satış sonrası süreçlerin izlenebilirliği.',
      },
      {
        title: 'Yüzey ve Profil Kalitesi',
        desc: 'QUALICOAT uyumlu alüminyum kaplama ve TS EN 12608-1 PVC profil sınıfı.',
      },
    ],
    stats: [
      { value: 'TSE', label: 'Türk Standartları' },
      { value: 'CE', label: 'Avrupa Uygunluğu' },
      { value: 'EN 14351-1', label: 'Ürün Standardı' },
      { value: 'ISO 9001', label: 'Kalite Yönetimi' },
    ],
    standards: CORPORATE_CERTIFICATES,
    cta: {
      title: 'Belge ve Teknik Dosya Talebi',
      description:
        'Proje dosyanız için güncel sertifika kopyalarını ve teknik şartname eklerini paylaşabiliriz.',
      label: 'Belge Talep Et',
      href: '/iletisim?form=bilgi',
    },
  },
  {
    slug: 'uretim-teknolojimiz',
    title: 'Üretim Teknolojimiz',
    categoryGroup: 'KALİTE',
    heroBadge: 'CNC • LAZER ÖLÇÜM • TERMAL LABORATUVAR',
    subtitle:
      'Kocasinan Merkez üretim tesisinde dijital ölçüm, CNC işleme ve performans doğrulama tek akışta birleşir.',
    seoDescription:
      'Çelikpen üretim teknolojisi: CNC alüminyum ve PVC profil işleme, lazer ölçüm, temperli/ısıcam konfigürasyonu, termal ve akustik test yaklaşımı.',
    visual: 'production',
    paragraphs: [
      'Kocasinan Merkez üretim tesisimizde alüminyum ve PVC profiller CNC işleme merkezlerinde kesilir, frezelenir ve delinir. Lazer ölçüm ekipleri cephe geometrisini milimetrik olarak projeye aktarır; üretim ve montaj aynı dijital dosya üzerinden ilerler.',
      'Temperli cam, 4+20+4 argonlu ısıcam, low-e kaplama, lamine güvenlik camı ve motorlu giyotin mekanizmaları proje bazlı konfigüre edilir. Winsa PVC profil teknolojileri; çok odacıklı gövde ve çelik takviye ile rüzgâr ve ısı yüküne karşı boyutlandırılır.',
      'Termal ve akustik laboratuvar yaklaşımımız; Uw değeri, hava-su sızdırmazlığı ve mekanizma çevrim testlerini kapsar. Üretim sonrası her ünite, sevkiyat öncesi son kalite kontrolünden geçer.',
    ],
    highlights: [
      {
        title: 'CNC Profil İşleme',
        desc: '0,1 mm toleranslı kesim, freze ve delme; tekrar edilebilir üretim kalitesi.',
      },
      {
        title: 'Lazerli Keşif',
        desc: 'Cephe, teras ve balkon geometrisinin milimetrik ölçümü; statik yük analizi.',
      },
      {
        title: 'Termal & Akustik Doğrulama',
        desc: 'Uw, EN 12207, EN 12208 ve EN 12210 performanslarının proje bazlı kontrolü.',
      },
      {
        title: 'Kadrolu Montaj',
        desc: 'Eğitimli, sigortalı ve kendi bünyemizdeki montaj ekipleriyle anahtar teslim uygulama.',
      },
    ],
    stats: [
      { value: '0,1 mm', label: 'CNC Toleransı' },
      { value: '15.000+', label: 'Tamamlanan Proje' },
      { value: '4+20+4', label: 'Argon Isıcam' },
      { value: '10 Yıl', label: 'Sistem Garantisi' },
    ],
    standards: CORPORATE_STANDARDS,
    cta: {
      title: 'Üretim Tesisimizi Ziyaret Edin',
      description:
        'CNC hattımızı, cam konfigürasyon laboratuvarımızı ve Winsa profil sistemlerini yerinde inceleyin.',
      label: 'Tesis Randevusu',
      href: '/iletisim?form=kesif',
    },
  },
  {
    slug: 'surdurulebilirlik',
    title: 'Sürdürülebilirlik',
    categoryGroup: 'KALİTE',
    heroBadge: 'DÖRT MEVSİM KONFOR, DÜŞÜK KARBON',
    subtitle:
      'Enerji verimli cam, uzun ömürlü doğrama ve geri dönüştürülebilir malzeme seçimiyle yapıların karbon ayak izini azaltıyoruz.',
    seoDescription:
      'Çelikpen sürdürülebilirlik: Uw 0,8–1,1 W/(m²K) ısıcam, %72 ısı tasarrufu, -38 dB akustik konfor, geri dönüştürülebilir alüminyum ve PVC profil.',
    visual: 'sustainability',
    paragraphs: [
      'Bir binanın enerji performansı, cephesinde kullandığı cam ve doğrama sistemleriyle başlar. Çelikpen; 4+20+4 argonlu ısıcam, low-e kaplama ve sıcak kenar adaptörü kombinasyonlarıyla ısı kaybını azaltan, dört mevsim konforlu cepheler üretir.',
      'Alüminyum profil sonsuz dönüştürülebilir bir malzemedir; PVC doğramalar ise uzun servis ömrü ve düşük bakım ihtiyacıyla kaynak verimliliği sağlar. Üretim tesisimizde kesim artıkları ayrıştırılır, cam ve profil atıkları yetkili geri dönüşüm kanallarına yönlendirilir.',
      'Lazerli ölçüm ve dijital üretim, malzeme firelerini azaltırken montaj öncesi planlama da saha kaybını en aza indirir. Amacımız; 30 yıllık deneyimi düşük karbonlu, uzun ömürlü ve bakımı kolay yapı bileşenlerine dönüştürmektir.',
    ],
    highlights: [
      {
        title: 'Enerji Verimli Cam',
        desc: 'Argon dolum, low-e kaplama ve ısı yalıtımlı çerçeveyle ısıtma-soğutma yükü azalır.',
      },
      {
        title: 'Geri Dönüştürülebilir Profil',
        desc: 'Alüminyum sonsuz dönüştürülebilir; PVC ve cam atıkları yetkili kanallarda toplanır.',
      },
      {
        title: 'Su ve Hava Yönetimi',
        desc: 'Gizli tahliye, eğimli damlalık ve EPDM conta ile su sızdırmazlığı ve hava geçirimsizliği.',
      },
      {
        title: 'Dijital Ölçüm',
        desc: 'Lazer ölçüm ve CNC üretim, malzeme firesini ve saha revizyonlarını azaltır.',
      },
    ],
    stats: [
      { value: '%72', label: 'Isı Tasarrufu' },
      { value: '-38 dB', label: 'Akustik Konfor' },
      { value: '1,2 Ton', label: 'Yıllık CO₂ Azaltımı / Daire' },
      { value: '4+20+4', label: 'Argon Isıcam' },
    ],
    cta: {
      title: 'Enerji Performansınızı Hesaplayalım',
      description:
        'Mevcut cephenizi ve kullanım alışkanlıklarınızı değerlendirerek uygun cam ve doğrama konfigürasyonunu birlikte belirleyelim.',
      label: 'Enerji Danışmanlığı',
      href: '/iletisim?form=bilgi',
    },
  },
  {
    slug: 'insan-kaynaklari',
    title: 'İnsan Kaynakları',
    categoryGroup: 'KURUMSAL',
    heroBadge: 'USTALIK, MÜHENDİSLİK VE EĞİTİM KÜLTÜRÜ',
    subtitle:
      '30 yıllık marka hafızasını geleceğe taşıyan; sahada ustalık, ofiste mühendislik ve her gün öğrenme disipliniyle çalışan ekipler.',
    seoDescription:
      'Çelikpen İnsan Kaynakları: kadrolu montaj ekipleri, mühendislik ve CNC üretim kadrosu, iş sağlığı güvenliği, teknik eğitim ve kariyer fırsatları.',
    visual: 'careers',
    paragraphs: [
      'Çelikpen’de üretim, mühendislik ve montaj ekipleri aynı proje masasında çalışır. Keşiften teslimata kadar her aşamada bilgi paylaşımı ve saha geri bildirimi vardır; bu kültür 30 yıllık marka hafızasını canlı tutar.',
      'Kadrolu ekiplerle çalışır, iş sağlığı ve güvenliği eğitimlerini düzenli olarak yenileriz. CNC operatörlerinden montaj ustalarına, mimari proje uzmanlarından mühendislere kadar her rol; teknik eğitim ve saha deneyimiyle gelişir.',
      'Yeni mezunlar ve deneyimli adaylar için mimari cam, PVC doğrama, üretim planlama ve proje yönetimi alanlarında başvuru kabul ediyoruz. Başvurular, ilgili departman yöneticileri ve insan kaynakları ekibi tarafından birlikte değerlendirilir.',
    ],
    highlights: [
      {
        title: 'Kadrolu Ekipler',
        desc: 'Montaj ve üretimde taşeron değil; eğitimli, sigortalı ve uzun vadeli ekip arkadaşları.',
      },
      {
        title: 'Teknik Eğitim',
        desc: 'CNC, cam teknolojisi, yalıtım standartları ve montaj güvenliği düzenli eğitim programları.',
      },
      {
        title: 'İş Sağlığı & Güvenliği',
        desc: 'Saha risk analizi, kişisel koruyucu donanım ve sürekli iyileştirme kültürü.',
      },
      {
        title: 'Kariyer Yolu',
        desc: 'Ustalık ve mühendislik rollerinde performans, eğitim ve sorumlulukla ilerleme imkânı.',
      },
    ],
    stats: [
      { value: '30 Yıl', label: 'Kurumsal Deneyim' },
      { value: '0', label: 'Taşeron Montaj' },
      { value: '10 Yıl', label: 'Sistem Garantisi' },
      { value: '6 Gün', label: 'Haftalık Showroom' },
    ],
    listTitle: 'Başvuru Alanları',
    list: [
      'Mimari proje satış ve teknik danışmanlık',
      'CNC alüminyum / PVC profil operatörlüğü',
      'Cam balkon ve doğrama montaj ustalığı',
      'Üretim planlama, kalite kontrol ve lojistik',
      'Mimarlık, inşaat ve makine mühendisliği stajları',
    ],
    cta: {
      title: 'Ekibimize Katılın',
      description:
        'Özgeçmişinizi ve ilgilendiğiniz pozisyonu insan kaynakları formumuz üzerinden bize iletin. Tüm başvurular gizlilikle değerlendirilir.',
      label: 'İnsan Kaynakları Formu',
      href: '/iletisim?form=ik',
    },
  },
  {
    slug: 'kvkk',
    title: 'KVKK',
    categoryGroup: 'KURUMSAL',
    heroBadge: 'KİŞİSEL VERİLERİN KORUNMASI',
    subtitle:
      '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu olarak kişisel verilerinizi şeffaf, sınırlı ve güvenli biçimde işliyoruz.',
    seoDescription:
      'Çelikpen KVKK Aydınlatma Metni: veri sorumlusu, kişisel veri işleme amaçları, hukuki sebepler, saklama süreleri, veri güvenliği ve ilgili kişi hakları.',
    visual: 'privacy',
    paragraphs: [
      'Çelikpen Mimari Cam ve Doğrama Sistemleri olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu sıfatıyla hareket ediyoruz. Keşif, teklif, ölçüm, üretim, montaj ve satış sonrası hizmet süreçlerinde paylaştığınız kişisel verileri hukuka uygun olarak işliyoruz.',
      'Ad, soyad, iletişim bilgileri, proje adresi, bina/balkon ölçüleri ve talep içeriği; hizmetin ifası, teklif hazırlanması, sözleşme yönetimi, garanti takibi ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır. Verileriniz pazarlama amacıyla üçüncü kişilerle paylaşılmaz.',
      'Kişisel veriler; işleme amacının gerektirdiği süre ve yasal saklama süreleri boyunca tutulur. Yetkisiz erişime, kayba ve hukuka aykırı işlemeye karşı idari ve teknik güvenlik tedbirleri uygulanır. Başvurularınızı yazılı olarak showroom adresimize veya iletişim kanallarımız üzerinden iletebilirsiniz.',
    ],
    highlights: [
      {
        title: 'Veri Sorumlusu',
        desc: 'Çelikpen Mimari Cam ve Doğrama Sistemleri; işleme amaçları ve hukuki sebepler aydınlatma metninde belirtilir.',
      },
      {
        title: 'İşleme Amaçları',
        desc: 'Keşif, teklif, sözleşme, montaj, garanti, servis ve yasal yükümlülüklerle sınırlı veri işleme.',
      },
      {
        title: 'Saklama ve Güvenlik',
        desc: 'Yetkisiz erişime karşı teknik-idari tedbirler; amaç ve yasal süre sonunda silme, yok etme veya anonimleştirme.',
      },
      {
        title: 'İlgili Kişi Hakları',
        desc: 'Verilerinize erişme, düzeltme, silme, işlemeye itiraz etme ve zararın giderilmesini talep etme hakları.',
      },
    ],
    stats: [
      { value: '6698', label: 'Kanun No' },
      { value: '2026', label: 'Güncel Metin' },
      { value: 'Çelikpen', label: 'Veri Sorumlusu' },
      { value: 'Yazılı / Elektronik', label: 'Başvuru Kanalı' },
    ],
    listTitle: 'KVKK Kapsamındaki Haklarınız',
    list: [
      'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
      'İşlenmişse buna ilişkin bilgi talep etme',
      'İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme',
      'Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme',
      'Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme',
      'Silinmesini veya yok edilmesini isteme',
      'Otomatik sistemlerle analiz sonucu aleyhinize çıkan sonuca itiraz etme',
      'Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde giderilmesini talep etme',
    ],
    cta: {
      title: 'KVKK Başvurusu',
      description:
        'Kişisel verilerinizle ilgili taleplerinizi iletişim formu üzerinden veya yazılı olarak bize iletebilirsiniz.',
      label: 'Başvuru İlet',
      href: '/iletisim?form=bilgi',
    },
  },
  {
    slug: 'basinda-celikpen',
    title: 'Basında Çelikpen',
    categoryGroup: 'MEDYA',
    heroBadge: '30 YILLIK MARKA HAFIZASI, GÜNCEL MİMARİ GÜNDEM',
    subtitle:
      'Çelikpen’in 1996’dan bugüne uzanan hikâyesi, saha uzmanlığı ve mimari cam teknolojileri üzerine basın ve yayın çalışmaları.',
    seoDescription:
      'Basında Çelikpen: 30 yıllık mimari cam ve doğrama deneyimi, cam balkon teknolojileri, PVC doğrama ve yalıtım standartları üzerine basın içerikleri.',
    visual: 'press',
    paragraphs: [
      'Çelikpen’in 30 yıllık hikâyesi; Bahçelievler’de başlayan bir atölyenin İstanbul’un mimari cam ve doğrama markasına dönüşmesini anlatır. Basın çalışmalarımızda marka mirasını, saha tecrübesini ve mühendislik yaklaşımımızı şeffaf biçimde paylaşıyoruz.',
      'Cam balkon, motorlu giyotin cam, bioklimatik pergola, kış bahçesi, PVC pencere-kapı ve panjur sistemlerinde uzman görüşlerimiz; yapı fiziği, enerji verimliliği ve güvenli montaj başlıklarında yayınlanır.',
      'Basın mensupları için teknik bilgi, proje referansları ve görsel arşiv taleplerini iletişim ekibimiz üzerinden iletebilirsiniz. Röportaj ve saha ziyareti talepleri, uygunluk durumuna göre planlanır.',
    ],
    highlights: [
      {
        title: 'Marka Hikâyesi',
        desc: '1996–2026 arası kurumsal dönüm noktaları ve 30 yıllık üretim mirası.',
      },
      {
        title: 'Uzman Görüşü',
        desc: 'Cam balkon, yalıtım, statik yük ve PVC doğrama konularında teknik değerlendirme.',
      },
      {
        title: 'Proje Referansları',
        desc: 'Konut, teras ve ticari cephe uygulamalarından seçilmiş saha örnekleri.',
      },
      {
        title: 'Basın İletişimi',
        desc: 'Röportaj, görsel arşiv ve teknik dosya talepleri için doğrudan iletişim.',
      },
    ],
    stats: [
      { value: '30 Yıl', label: 'Marka Hikâyesi' },
      { value: '15.000+', label: 'Tamamlanan Proje' },
      { value: '2026', label: 'Güncel Dönem' },
      { value: '4', label: 'Uluslararası Fuar' },
    ],
    cta: {
      title: 'Basın ve Medya Talepleri',
      description:
        'Röportaj, teknik görüş veya görsel arşiv talepleriniz için iletişim ekibimizle görüşün.',
      label: 'Basın İletişimi',
      href: '/iletisim?form=bilgi',
    },
  },
  {
    slug: 'fuarlar-etkinlikler',
    title: 'Fuarlar & Etkinlikler',
    categoryGroup: 'MEDYA',
    heroBadge: 'MİMARİ DİYALOG VE SAHA BULUŞMALARI',
    subtitle:
      'Mimarlar, müteahhitler ve son kullanıcılarla buluştuğumuz fuarlar, teknik sunumlar ve showroom deneyim etkinlikleri.',
    seoDescription:
      'Çelikpen fuarlar ve etkinlikler: mimari cam sistemleri, PVC doğrama ve yalıtım teknolojileri üzerine sektörel buluşmalar, showroom etkinlikleri.',
    visual: 'events',
    paragraphs: [
      'Çelikpen, her yıl düzenlenen yapı ve pencere teknolojileri fuarlarında mimarlar, mühendisler, müteahhitler ve son kullanıcılarla bir araya gelir. Yeni nesil cam balkon, motorlu giyotin, bioklimatik pergola ve PVC doğrama sistemlerini canlı ölçekte sergiler.',
      'Fuar dönemleri dışında Kocasinan Merkez showroomumuzda teknik sunumlar, renk kartelası çalışmaları ve ses/ısı yalıtımı deneyimleri düzenliyoruz. Etkinlik takvimi, proje ekipleri ve davetli gruplar için randevuyla planlanır.',
      'Mimari ofisler ve yüklenici ekipleri için özel teknik oturumlar; EN 12207, EN 12208, EN 12210 performansları, Uw hesapları ve montaj detayları üzerine uygulamalı olarak gerçekleştirilir.',
    ],
    highlights: [
      {
        title: 'Sektörel Fuarlar',
        desc: 'Yapı, pencere ve mimari cam teknolojileri fuarlarında canlı ürün deneyimi.',
      },
      {
        title: 'Showroom Etkinlikleri',
        desc: 'Kocasinan Merkez’de teknik sunum, renk seçimi ve yalıtım deneyimi.',
      },
      {
        title: 'Mimari Sunumlar',
        desc: 'Proje ekiplerine özel Uw, rüzgâr yükü ve montaj detayı oturumları.',
      },
      {
        title: 'Saha Buluşmaları',
        desc: 'Uygulama öncesi keşif, ölçüm ve montaj planlama görüşmeleri.',
      },
    ],
    stats: [
      { value: '2026', label: 'Etkinlik Dönemi' },
      { value: '4', label: 'Uluslararası Fuar' },
      { value: '22+', label: 'Showroom Serisi' },
      { value: '6 Gün', label: 'Haftalık Açık' },
    ],
    cta: {
      title: 'Etkinlik ve Showroom Randevusu',
      description:
        'Mimari ekibiniz veya proje grubunuz için teknik showroom sunumu planlayalım.',
      label: 'Randevu Planla',
      href: '/iletisim?form=kesif',
    },
  },
];

export const CORPORATE_CORE_PAGES = CORPORATE_SUBPAGES.filter(
  (page) => page.categoryGroup !== 'MEDYA'
);

export const CORPORATE_MEDIA_PAGES = CORPORATE_SUBPAGES.filter(
  (page) => page.categoryGroup === 'MEDYA'
);
