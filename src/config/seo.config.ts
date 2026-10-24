import type { Metadata } from 'next';
import { SITE_CONFIG } from './site.config';

/* ============================================================================
   ÇELİKPEN — MERKEZİ SEO & ANAHTAR KELİME İSTİHBARATI
   Tüm sayfaların metadata, canonical, OpenGraph ve robots sinyalleri buradan
   beslenir. Yeni bir sayfa eklerken generatePageMetadata() kullanılması yeterlidir.
   ========================================================================== */

export const PRIMARY_KEYWORDS = [
  'cam balkon',
  'ısıcamlı cam balkon',
  'katlanır cam balkon',
  'sürme cam balkon',
  'giyotin cam sistemleri',
  'motorlu giyotin cam',
  'bioklimatik pergola',
  'kış bahçesi sistemleri',
  'alüminyum doğrama',
  'PVC pencere ve kapı sistemleri',
  'panjur ve kepenk sistemleri',
  'kedi sinekliği',
  'plise sineklik',
  'plise perde',
] as const;

export const LOCAL_KEYWORDS = [
  'İstanbul cam balkon',
  'Bahçelievler cam balkon',
  'Kocasinan cam balkon',
  'Şirinevler cam balkon',
  'Bakırköy cam balkon',
  'Ataköy cam balkon',
  'Yenibosna cam balkon',
  'Avrupa Yakası cam balkon üretici',
  'Çelikpen cam balkon',
  '35 yıllık cam balkon firması',
  '1991’den bugüne cam balkon',
] as const;

export const LONG_TAIL_KEYWORDS = [
  'Bahçelievler cam balkon fiyatları 2026',
  'Kocasinan cam balkon m2 fiyatı',
  'ısıcamlı cam balkon ısı yalıtımı',
  'motorlu giyotin cam balkon güvenli mi',
  'bioklimatik pergola su geçirir mi',
  'apartmanda cam balkon 4/5 muvaffakatname',
  'kış bahçesi m2 fiyatları İstanbul',
  'plise perde ve sineklik sistemleri',
  'alüminyum doğrama üreticisi İstanbul',
  'PVC pencere ve kapı sistemleri Bahçelievler',
] as const;

export const ALL_KEYWORDS = Array.from(
  new Set<string>([...PRIMARY_KEYWORDS, ...LOCAL_KEYWORDS, ...LONG_TAIL_KEYWORDS])
);

export const SEO_FAQS = [
  {
    question: 'Isıcamlı cam balkon ısı yalıtımı sağlar mı?',
    answer:
      'Evet. Çelikpen VBS serisinde kullanılan 4+20+4 mm argon gazlı Konfor Isıcam, tek cama göre yaklaşık %72 daha yüksek termal bariyer oluşturur. Kışın balkonda terleme ve buğulanma azalır, yazın güneş ısısı daha kontrollü içeri girer; balkon dört mevsim yaşam alanı olarak kullanılabilir.',
  },
  {
    question: 'Cam balkon m² fiyatları neye göre belirlenir?',
    answer:
      'Cam balkon m² fiyatı; cam kalınlığı (8 mm, 10 mm veya 4+20+4 ısıcam), alüminyum profil kalınlığı, kanat sayısı, balkonun L/U formu, renk seçimi ve motorlu sistem gibi teknik detaylara göre belirlenir. Çelikpen fiyat hesaplama aracıyla ölçülerinizi girerek 2026 net fabrika birim fiyatını anında görebilirsiniz.',
  },
  {
    question: 'Giyotin cam sistemi güvenli mi?',
    answer:
      'Motorlu giyotin cam sistemlerinde temperli güvenlik camı, sabit alt korkuluk paneli, çift taraflı çelik zincir veya çelik telli triger kayış ve el sıkışma emniyeti bulunur. Çocuklu aileler ve rezidans teraslarında, kumandalı kullanım sayesinde açıkken dahi güvenli küpeşte koruması sağlar.',
  },
  {
    question: 'Bioklimatik pergola su geçirir mi?',
    answer:
      'Doğru montaj ve gizli yağmur tahliye kanallarıyla bioklimatik pergola tavanı su geçirmez. Motorlu alüminyum lameller kapalı konumdayken yağmur suyunu taşıyıcı dikme içindeki gizli oluklara yönlendirir. Çelikpen uygulamalarında eğim, drenaj ve cephe birleşim detayları projeye özel hesaplanır.',
  },
  {
    question: 'Apartmanda cam balkon için izin veya 4/5 muvafakatname gerekir mi?',
    answer:
      'Kat Mülkiyeti Kanunu 19. maddesi kapsamında apartmanda cam balkon uygulaması için kat maliklerinin 4/5 (%80) yazılı muvafakatnamesi ve bina dış cephesiyle uyumlu profil rengi önerilir. Çelikpen, Eylül 2026 Yargıtay kararlarına uyumlu ücretsiz muvafakatname formu ve keşif dosyası desteği sunar.',
  },
  {
    question: 'Cam balkon bakımı ve garanti süresi nasıl işliyor?',
    answer:
      'Çelikpen cam balkon sistemlerinde 10 yıl sistem garantisi, TSE EN 12150 temperli cam ve Isıcam konfor belgeli üretim için üretici garantisi bulunur. Motor ve otomasyon bileşenleri üretici garantisi kapsamındadır. Periyodik olarak ray temizliği, fitil kontrolü ve paslanmaz rulman bakımı yapılması yeterlidir; montaj sonrası bakım ve yedek parça desteği kurumsal servis ekibimiz tarafından sağlanır.',
  },
] as const;

export const SEO_SERVICE_GROUPS = [
  {
    name: 'Cam Balkon Sistemleri',
    description:
      'Katlanır, ısıcamlı ve panoramik cam balkon sistemleri; Kocasinan Merkez üretim tesisi ve Bahçelievler montaj ekibi.',
    href: '/urunler?kategori=cam-balkon-sistemleri',
    serviceType: 'Cam balkon sistemleri',
  },
  {
    name: 'Giyotin Cam Sistemleri',
    description:
      'Motorlu ve kumandalı giyotin cam sistemleri; teras, rezidans ve ticari cepheler için güvenli dikey açılım.',
    href: '/urunler/giyotin-motorlu-silinebilir-cam',
    serviceType: 'Motorlu giyotin cam sistemleri',
  },
  {
    name: 'Bioklimatik Pergola',
    description:
      'Motorlu alüminyum lamelli bioklimatik pergola, gizli yağmur tahliyesi ve entegre LED aydınlatma çözümleri.',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    serviceType: 'Bioklimatik pergola sistemleri',
  },
  {
    name: 'Kış Bahçesi',
    description:
      'Teras ve bahçe katları için dört mevsim kullanılabilen kış bahçesi ve cam tavan sistemleri.',
    href: '/sistemler/kis-bahcesi-ve-bioklimatik-tavan',
    serviceType: 'Kış bahçesi sistemleri',
  },
  {
    name: 'Sürme Cam Sistemleri',
    description:
      'Eşiksiz alt ray, geniş açıklık ve sessiz kayma sağlayan sürme cam balkon ve sürgülü pencere sistemleri.',
    href: '/urunler?kategori=surme-sistemler',
    serviceType: 'Sürme cam sistemleri',
  },
  {
    name: 'Alüminyum & PVC Sistemler',
    description:
      'Alüminyum doğrama, PVC pencere ve kapı sistemleri, panjur ve kepenk çözümleri; yüksek ısı ve ses yalıtımı.',
    href: '/urunler?kategori=pencere-ve-kapi-sistemleri',
    serviceType: 'Alüminyum ve PVC doğrama sistemleri',
  },
  {
    name: 'Plise Perde & Sineklik',
    description:
      'Plise perde, plise sineklik, kedi sinekliği ve panjur entegrasyonuyla temiz ve konforlu iç mekânlar.',
    href: '/urunler/paslanmaz-rulman-ve-kedi-sinekligi-sistemleri',
    serviceType: 'Plise perde ve sineklik sistemleri',
  },
] as const;

export const ISTANBUL_DISTRICTS = [
  'Adalar',
  'Arnavutköy',
  'Ataşehir',
  'Avcılar',
  'Bağcılar',
  'Bahçelievler',
  'Bakırköy',
  'Başakşehir',
  'Bayrampaşa',
  'Beşiktaş',
  'Beykoz',
  'Beylikdüzü',
  'Beyoğlu',
  'Büyükçekmece',
  'Çatalca',
  'Çekmeköy',
  'Esenler',
  'Esenyurt',
  'Eyüpsultan',
  'Fatih',
  'Gaziosmanpaşa',
  'Güngören',
  'Kadıköy',
  'Kağıthane',
  'Kartal',
  'Küçükçekmece',
  'Maltepe',
  'Pendik',
  'Sancaktepe',
  'Sarıyer',
  'Silivri',
  'Sultanbeyli',
  'Sultangazi',
  'Şile',
  'Şişli',
  'Tuzla',
  'Ümraniye',
  'Üsküdar',
  'Zeytinburnu',
] as const;

export const SEO_BUSINESS = {
  name: 'Çelikpen Mimari Cam & Doğrama Sistemleri',
  shortName: SITE_CONFIG.brandName,
  description:
    '1991’den bugüne 35 yıllık mühendislik birikimiyle Bahçelievler Kocasinan Merkez merkezli cam balkon üreticisi. Isıcamlı cam balkon, giyotin cam, bioklimatik pergola, kış bahçesi, sürme cam, alüminyum & PVC doğrama ve plise perde sistemleri.',
  foundingDate: '1991',
  slogan:
    '35 Yıllık Deneyimle İstanbul’un Öncü Cam Balkon ve Mimari Doğrama Sistemleri Markası',
  foundingLocation: {
    '@type': 'Place',
    name: 'Bahçelievler, İstanbul',
  },
  telephone: SITE_CONFIG.phoneRaw,
  telephoneDisplay: SITE_CONFIG.phoneDisplay,
  priceRange: '₺₺',
  address: {
    streetAddress: 'Kocasinan Merkez Mah. Mahmutbey Cad. Üretim & Showroom',
    addressLocality: 'Bahçelievler',
    addressRegion: 'İstanbul',
    postalCode: '34192',
    addressCountry: 'TR',
  },
  geo: {
    latitude: SITE_CONFIG.coordinates.latitude,
    longitude: SITE_CONFIG.coordinates.longitude,
  },
  aggregateRating: {
    ratingValue: '4.9',
    reviewCount: '128',
    bestRating: '5',
    worstRating: '1',
  },
} as const;

export const SEO_DEFAULT_IMAGE = '/images/kocasinan-isicamli-cam-balkon-hero.jpg';
export const SEO_ICON = '/icon.svg?v=35';

export function absoluteUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.siteUrl}${normalized === '/' ? '' : normalized}`;
}

export function brandTitle(title: string): string {
  if (/çelikpen/i.test(title)) return title;
  return `${title} | ${SITE_CONFIG.brandName} Cam Balkon & Mimari Cam Sistemleri`;
}

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}

/**
 * Tüm rotalar için tutarlı; canonical, OpenGraph (tr_TR), Twitter Card ve
 * gelişmiş GoogleBot robots direktiflerini otomatik üreten metadata yardımcısı.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = SEO_DEFAULT_IMAGE,
  imageAlt = 'Çelikpen Bahçelievler ısıcamlı cam balkon ve mimari cam sistemleri uygulaması',
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = brandTitle(title);
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const mergedKeywords = Array.from(new Set<string>([...keywords, ...ALL_KEYWORDS]));

  return {
    title: fullTitle,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: canonical,
      siteName: `${SITE_CONFIG.brandName} Cam Balkon & Mimari Cam Sistemleri`,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
