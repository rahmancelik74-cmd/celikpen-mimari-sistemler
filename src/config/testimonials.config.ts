export interface Testimonial {
  name: string;
  neighborhoodSlug: string;
  systemCode: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
}

// TODO: gerçek yorumlarla değiştir
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'M. Kaya',
    neighborhoodSlug: 'kocasinan',
    systemCode: 'Winsa Vera Termal',
    rating: 5,
    comment:
      "Keşif ekibi sabah geldi, öğleden sonra fiyatı WhatsApp'tan aldım. Montaj 1 günde bitti, temizlik yaptılar.",
    date: '2026-10-12',
  },
  {
    name: 'A. Demir',
    neighborhoodSlug: 'sirinevler',
    systemCode: 'Winsa Vera Termal',
    rating: 5,
    comment:
      'Caddeye bakan balkonumuzda trafik sesi belirgin şekilde azaldı. 4+20+4 ısıcamlı seri kışın terleme yapmadı.',
    date: '2026-10-05',
  },
  {
    name: 'S. Yılmaz',
    neighborhoodSlug: 'siyavuspasa',
    systemCode: 'Winsa Vera 8 / Vera Pro 10',
    rating: 5,
    comment:
      'Karşı bina yakın olduğu için alt %40 kumlama buzlu cam seçtik. Gündüz ışığı kesmeden mahremiyet sağladı.',
    date: '2026-09-28',
  },
  {
    name: 'H. Çelik',
    neighborhoodSlug: 'soganli',
    systemCode: 'Winsa Vera 8 / Vera Pro 10',
    rating: 5,
    comment:
      'Apartman olarak 7 daire birlikte yaptırdık. Hem %15 toplu bina indirimi uygulandı hem de 4/5 muvafakatname sürecinde yardımcı oldular.',
    date: '2026-09-19',
  },
  {
    name: 'E. Arslan',
    neighborhoodSlug: 'hurriyet',
    systemCode: 'Winsa Vera Slide',
    rating: 4,
    comment:
      'Dar balkonumuzda katlanır kanat yer kaplamasın diye eşiksiz sürme tercih ettik. Kedi sinekliği de gayet sağlam oldu.',
    date: '2026-09-11',
  },
  {
    name: 'B. Öztürk',
    neighborhoodSlug: 'yenibosna',
    systemCode: 'Winsa Vera Vertical',
    rating: 5,
    comment:
      'Teras katımız için kumandalı giyotin sistem kuruldu. Rüzgarlı havalarda ıslık sesi yok, motor çalışması sessiz.',
    date: '2026-08-29',
  },
];
