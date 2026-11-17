/**
 * ÇELİKPEN MİMARİ REHBER & BLOG — TEK DOĞRULUK KAYNAĞI (15 OTORİTE MAKALE)
 * -------------------------------------------------------------------------
 * İstanbul Avrupa Yakası odaklı 15 kapsamlı 100/100 SEO mühendislik makalesi.
 * Tüm m² fiyatları `pricing.config.ts` dosyasından dinamik okunur.
 * Kurumsal Yazar: "Çelikpen Mimari Mühendislik Ekibi"
 * Kurumsal Unvan: "Mimari Cephe & Yalıtım Sistemleri Teknik Kurulu"
 */
import { BLOG_ARTICLES_PART_1 } from './blogArticlesPart1';
import { BLOG_ARTICLES_PART_2 } from './blogArticlesPart2';
import {
  COMMON_EXTERNAL_AUTHORITIES,
  CORPORATE_AUTHOR,
  type BlogAuthor,
  type BlogCategory,
  type BlogCommentItem,
  type BlogExternalReference,
  type BlogFaq,
  type BlogInfographic,
  type BlogInfographicItem,
  type BlogInternalLink,
  type BlogPost,
  type BlogSection,
  type BlogSubsection,
  type BlogTable,
  type BlogTocItem,
  type BlogVoiceQa,
  type RawBlogPost,
} from './blogTypes';

export {
  COMMON_EXTERNAL_AUTHORITIES,
  CORPORATE_AUTHOR,
  type BlogAuthor,
  type BlogCategory,
  type BlogCommentItem,
  type BlogExternalReference,
  type BlogFaq,
  type BlogInfographic,
  type BlogInfographicItem,
  type BlogInternalLink,
  type BlogPost,
  type BlogSection,
  type BlogSubsection,
  type BlogTable,
  type BlogTocItem,
  type BlogVoiceQa,
  type RawBlogPost,
};

function buildToc(sections: BlogSection[]): BlogTocItem[] {
  return sections.flatMap((section) => [
    { id: section.id, label: section.heading, level: 2 as const },
    ...(section.subsections ?? []).map((sub) => ({
      id: sub.id,
      label: sub.heading,
      level: 3 as const,
    })),
  ]);
}

const ALL_RAW_POSTS: RawBlogPost[] = [
  ...BLOG_ARTICLES_PART_1,
  ...BLOG_ARTICLES_PART_2,
];

export const BLOG_POSTS: BlogPost[] = ALL_RAW_POSTS.map((post) => ({
  ...post,
  author: CORPORATE_AUTHOR,
  tableOfContents: buildToc(post.sections),
  initialComments: [],
}));

export const BLOG_CATEGORIES: BlogCategory[] = Array.from(
  new Set(BLOG_POSTS.map((p) => p.category))
);

export const ALL_BLOG_TAGS: string[] = Array.from(
  new Set(BLOG_POSTS.flatMap((p) => p.tags))
);

export const FEATURED_BLOG_POST: BlogPost =
  BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(
    (post) => post.slug === slug || (post.slugAliases ?? []).includes(slug)
  );
}

export function getAllBlogSlugs(): string[] {
  return Array.from(
    new Set(BLOG_POSTS.flatMap((post) => [post.slug, ...(post.slugAliases ?? [])]))
  );
}

export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00Z`));
}
