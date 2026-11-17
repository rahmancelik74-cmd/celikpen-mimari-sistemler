export type BlogCategory =
  | 'Cam Balkon'
  | 'PVC Pencere'
  | 'Sürme Sistemler'
  | 'Giyotin & Teras'
  | 'Kış Bahçesi'
  | 'Cam Teknolojisi'
  | 'Yerel Rehber';

export interface BlogTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface BlogSubsection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: BlogSubsection[];
  table?: BlogTable;
  proTip?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogTocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogInternalLink {
  label: string;
  href: string;
  context: string;
}

export interface BlogExternalReference {
  title: string;
  organization: string;
  url: string;
  summary: string;
}

export interface BlogInfographicItem {
  label: string;
  value: number;
  displayValue: string;
  barPercent: number;
  highlight?: boolean;
}

export interface BlogInfographic {
  title: string;
  subtitle: string;
  metricUnit: string;
  items: BlogInfographicItem[];
  footnote: string;
}

export interface BlogVoiceQa {
  spokenQuestion: string;
  directAnswer: string;
}

export interface BlogCommentItem {
  id: string;
  author: string;
  district: string;
  date: string;
  rating: number;
  comment: string;
  expertReply: string;
}

export interface BlogPost {
  slug: string;
  slugAliases?: string[];
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  tags: string[];
  keywords: string[];
  category: BlogCategory;
  readTime: number;
  publishDate: string;
  updatedDate: string;
  author: BlogAuthor;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imageTitle: string;
  excerpt: string;
  highlights: string[];
  numberedChecklistTitle: string;
  numberedChecklist: string[];
  tableOfContents: BlogTocItem[];
  sections: BlogSection[];
  internalLinks: BlogInternalLink[];
  externalReferences: BlogExternalReference[];
  infographic: BlogInfographic;
  voiceSearchQa: BlogVoiceQa[];
  initialComments: BlogCommentItem[];
  faqs: BlogFaq[];
  relatedProductHref: string;
  featured?: boolean;
}

export type RawBlogPost = Omit<BlogPost, 'author' | 'tableOfContents' | 'initialComments'>;

export const CORPORATE_AUTHOR: BlogAuthor = {
  name: 'Çelikpen Mimari Mühendislik Ekibi',
  role: 'Mimari Cephe & Yalıtım Sistemleri Teknik Kurulu',
};

export const COMMON_EXTERNAL_AUTHORITIES: BlogExternalReference[] = [
  {
    title: 'Şişecam Isıcam Sistemleri — Konfor & Sinerji Yalıtım Camı Kütüphanesi (EN 1279)',
    organization: 'Şişecam Resmi Teknik Yayınlar',
    url: 'https://www.sisecam.com.tr',
    summary:
      'Low-E (Sinerji) ve Solar Low-E (Konfor) kaplamalı ısıcam ünitelerinin Ug ısı geçirgenlik katsayısı, güneş faktörü ve TSE EN 12150 temperleme standartları.',
  },
  {
    title: 'TS EN 14351-1+A2 Pencere, Dış Kapı ve Cam Cephe Performans Standardı',
    organization: 'Türk Standartları Enstitüsü (TSE)',
    url: 'https://www.tse.org.tr',
    summary:
      'Rüzgâr yükü dayanımı (EN 12210), su sızdırmazlığı (EN 12208) ve hava geçirimsizliği (EN 12207) laboratuvar test kriterlerini belirleyen resmi ulusal norm.',
  },
  {
    title: 'Winsa PVC Pencere, Sürme ve Mimari Cam Sistemleri Teknik Katalogları',
    organization: 'Winsa Mimari Sistemler',
    url: 'https://www.winsa.com.tr',
    summary:
      'Dorado 76, Revotech Gold 84, Panorama HS 76, Lotus ve Vera serisi profillerin odacık geometrisi, çelik destek sacı atalet momentleri ve Uw hesaplamaları.',
  },
  {
    title: 'TS 825 Binalarda Isı Yalıtım Kuralları ve Akustik Performans Rehberi',
    organization: 'İZODER (Isı Su Ses ve Yangın Yalıtımcıları Derneği)',
    url: 'https://www.izoder.org.tr',
    summary:
      'İstanbul iklim bölgesinde saydam cephe elemanlarında yoğuşma kontrolü, ısı kaybı hesabı ve desibel (dB) cinsinden akustik yalıtım kriterleri.',
  },
  {
    title: '634 Sayılı Kat Mülkiyeti Kanunu ve İmar Mevzuatı Resmi Yayınları',
    organization: 'T.C. Cumhurbaşkanlığı Resmî Gazete',
    url: 'https://www.resmigazete.gov.tr',
    summary:
      'Kat Mülkiyeti Kanunu Madde 19 kapsamında ana taşınmaz dış cephe bütünlüğü, 4/5 kat maliki yazılı muvafakatnamesi ve Yargıtay Hukuk Dairesi içtihatları.',
  },
];
