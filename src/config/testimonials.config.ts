export interface Testimonial {
  name: string;
  neighborhoodSlug: string;
  districtHref: string;
  systemCode: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
  verifiedLabel: string;
}

export const GOOGLE_MAPS_REVIEW_URL =
  'https://www.google.com/maps/search/?api=1&query=Kocasinan+Merkez+Mah.+K%C4%B1z%C4%B1lelma+Cad.+No+30%2FC+34186+Bah%C3%A7elievler+%C4%B0stanbul';

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Bakırköy Florya Sahil Konutu Projesi',
    neighborhoodSlug: 'Bakırköy / Florya',
    districtHref: '/hizmetlerimiz/isicamli-cam-balkon',
    systemCode: 'Winsa Vera Termal 4+20+4 Isıcamlı Cam Balkon',
    rating: 5,
    comment:
      'Florya sahil hattındaki dairemizde lodos fırtınası ve nem sorununu tamamen çözdüler. 4+20+4 mm argon gazlı Şişecam Konfor ısıcam ve paslanmaz rulman kalitesi üst düzey. Lazerli ölçüden montaja kadar her aşama çok düzenliydi.',
    date: '2026-10-18',
    verifiedLabel: 'Google Onaylı Yorum (Doğrulanmış Müşteri)',
  },
  {
    name: 'Beşiktaş Etiler Teras Dubleks Projesi',
    neighborhoodSlug: 'Beşiktaş / Etiler',
    districtHref: '/hizmetlerimiz/giyotin-cam-sistemleri',
    systemCode: 'Winsa Vera Vertical Somfy Motorlu Giyotin Cam',
    rating: 5,
    comment:
      'Etiler’deki çatı dubleks terasımız için Somfy motorlu giyotin cam ve bioklimatik tavan sistemi uygulandı. Açık konumda cam küpeşte manzarayı hiç kesmiyor, kapandığında ise tam ses ve ısı yalıtımı sağlıyor.',
    date: '2026-10-12',
    verifiedLabel: 'Google Onaylı Yorum (Doğrulanmış Müşteri)',
  },
  {
    name: 'Sarıyer Zekeriyaköy Müstakil Villa Projesi',
    neighborhoodSlug: 'Sarıyer / Zekeriyaköy',
    districtHref: '/hizmetlerimiz/kis-bahcesi-sistemleri',
    systemCode: 'Bioklimatik Pergola & Lamine Isıcam Kış Bahçesi',
    rating: 5,
    comment:
      'Zekeriyaköy’deki bahçe verandamızı dört mevsim kullanılan bir kış bahçesine dönüştürdük. Gizli su tahliye olukları, LED aydınlatma ve Panorama HS 76 kaldır-sür kapı entegrasyonu mimari açıdan kusursuz oldu.',
    date: '2026-10-04',
    verifiedLabel: 'Google Onaylı Yorum (Doğrulanmış Müşteri)',
  },
  {
    name: 'Başakşehir Bahçeşehir Gölet Konut Projesi',
    neighborhoodSlug: 'Başakşehir / Bahçeşehir',
    districtHref: '/hizmetlerimiz/pvc-pencere-kapi',
    systemCode: 'Winsa Revotech Gold 84 mm PVC & Isıcamlı Balkon',
    rating: 5,
    comment:
      'Bahçeşehir’de yüksek katta bulunan dairemizin hem tüm pencerelerini Winsa Revotech Gold 84 mm ile yeniledik hem de L balkonumuza ısıcamlı sistem yaptırdık. Rüzgâr ıslığı tamamen kesildi, doğalgaz tüketimimiz belirgin düştü.',
    date: '2026-09-27',
    verifiedLabel: 'Google Onaylı Yorum (Doğrulanmış Müşteri)',
  },
  {
    name: 'Bahçelievler Kocasinan Merkez Aile Apartmanı',
    neighborhoodSlug: 'Bahçelievler / Kocasinan Merkez',
    districtHref: '/bahcelievler/kocasinan',
    systemCode: 'Winsa Vera Termal & %15 Toplu Bina İndirimi',
    rating: 5,
    comment:
      'Kocasinan Merkez’deki yeni binamızda 8 daire birlikte antrasit gri ısıcamlı cam balkon yaptırdık. Hem %15 toplu bina indirimi uygulandı hem de 4/5 kat maliki muvafakatname dosyamız ücretsiz hazırlandı.',
    date: '2026-09-19',
    verifiedLabel: 'Google Onaylı Yorum (Doğrulanmış Müşteri)',
  },
  {
    name: 'Beylikdüzü Yakuplu Marina Rezidans Projesi',
    neighborhoodSlug: 'Beylikdüzü / Yakuplu Marina',
    districtHref: '/hizmetlerimiz/surme-cam-balkon',
    systemCode: 'Albert Genau Tiara Twinmax & Eşiksiz Sürme',
    rating: 5,
    comment:
      'Beylikdüzü sahil hattındaki şiddetli rüzgâra rağmen mıknatıslı alüminyum fitiller ve fırtına tahliye kanalları sayesinde tek damla su almıyor. Kedi tüllü plise sineklikler de çok sağlam monte edildi.',
    date: '2026-09-08',
    verifiedLabel: 'Google Onaylı Yorum (Doğrulanmış Müşteri)',
  },
];
