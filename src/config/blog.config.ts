export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMin: number;
  tag: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'eylul-2026-yargitay-cam-balkon-karari',
    title: 'Eylül 2026 Yargıtay Cam Balkon Kararı: 4/5 Muvafakatname Rehberi',
    excerpt:
      'Kat Mülkiyeti Kanunu Madde 19 uyarınca apartman dış cephe bütünlüğünü koruyan, kat maliklerinin 4/5 (%80) yazılı rızasını içeren kurumsal montaj protokolü ve yazdırılabilir resmi muvafakatname formu.',
    date: '2026-09-20',
    readingMin: 6,
    tag: 'Mevzuat',
  },
  // TODO: yeni yazılar buraya
];
