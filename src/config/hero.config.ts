export interface HeroSlide {
  badge: string;
  image: string;
  title: string;
  subtitle: string;
  specs: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    badge: 'WİNSA & ÇELİKPEN MİMARİ STANDARTLARI • TS EN 14351-1',
    image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    title: 'Geleceğin Mimarisinde Maksimum Yalıtım, Kusursuz Estetik',
    subtitle:
      'Kocasinan Merkez üretim tesisimizden tüm Bahçelievler’e aracısız fabrika fiyatlarıyla 4+20+4 Argon Gazlı Konfor Isıcamlı, Katlanır, Eşiksiz Sürme, Motorlu Giyotin ve 76/84 mm PVC Pencere Sistemleri.',
    specs: ['Uw = 1.1 W/(m²K) Isı Yalıtımı', '-38 dB Akustik Konfor', '10 Yıl Mekanik Garanti'],
    ctaPrimary: { label: 'Canlı m² Fiyat Hesapla', href: '/fiyat-hesapla' },
    ctaSecondary: { label: '5 Seriyi Karşılaştır', href: '/karsilastir' },
  },
  {
    badge: 'VERA TERMAL SERİSİ • ŞİŞECAM ISICAM SİNERJİ & KONFOR',
    image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
    title: 'Isıcamlı Sinerji ve Konfor Cam Sistemleriyle 4 Mevsim Yaşam Alanları',
    subtitle:
      'Şirinevler, E-5 ve Mahmutbey Caddesi trafik gürültüsünü -38 dB kesen, kışın %72 ısı tasarrufu sağlayan her iki camı TSE EN 12150 temperli 28 mm Argon gazlı termal seri.',
    specs: ['28 mm (4+20+4) Argonlu Isıcam', 'Sınıf 9A Su Sızdırmazlığı', 'Çift Sıra EPDM Conta'],
    ctaPrimary: { label: 'Isıcamlı Seriyi İncele', href: '/sistemler/vbs-isicamli-cam-balkon' },
    ctaSecondary: { label: 'Ücretsiz Lazerli Keşif', href: '/iletisim' },
  },
  {
    badge: 'EYLÜL 2026 YARGITAY MEVZUATI • KENTSEL DÖNÜŞÜM ÖZEL',
    image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    title: 'Apartman Cephe Emsaline Tam Uyum & 4/5 Muvafakatname Güvencesi',
    subtitle:
      'Kentsel dönüşüm binalarında dış cephe bütünlüğünü koruyan Antrasit RAL 7016, Mat Siyah ve Altın Meşe profiller; 5+ daire toplu bina kararlarında net %15 fabrika indirimi.',
    specs: ['KMK Madde 19 Uyumlu', '%15 Toplu Bina İndirimi', 'RAL 7016 Cephe Standardı'],
    ctaPrimary: {
      label: '4/5 Muvafakatname Formu Oluştur',
      href: '/blog/eylul-2026-yargitay-cam-balkon-karari',
    },
    ctaSecondary: { label: 'Renk & Yüzey Kartelası', href: '/#renk-kartelasi' },
  },
];
