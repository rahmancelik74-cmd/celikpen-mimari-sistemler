import { SITE_CONFIG } from '../../config/site.config';
import { SEO_BUSINESS, SEO_ICON, absoluteUrl } from '../../config/seo.config';
import type { BlogFaq, BlogPost } from '../../data/blogPosts';

const ORGANIZATION_ID = absoluteUrl('/#organization');

const publisher = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SEO_BUSINESS.name,
  url: SITE_CONFIG.siteUrl,
  logo: { '@type': 'ImageObject', url: absoluteUrl(SEO_ICON), width: 512, height: 512 },
};

export const blogPostPath = (slug: string) => `/blog/${slug}`;

/** Tek bir yazı için BlogPosting + Article (çoklu tip) şeması. */
export function buildBlogPostingSchema(post: BlogPost) {
  const url = absoluteUrl(blogPostPath(post.slug));
  return {
    '@context': 'https://schema.org',
    '@type': ['BlogPosting', 'Article'],
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: post.title.slice(0, 110),
    alternativeHeadline: post.seoTitle,
    description: post.metaDescription,
    image: [absoluteUrl(post.image)],
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    inLanguage: 'tr-TR',
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    wordCount: post.sections.reduce(
      (total, s) =>
        total +
        [...s.paragraphs, ...(s.bullets ?? []), ...(s.subsections ?? []).flatMap((x) => [...x.paragraphs, ...(x.bullets ?? [])])]
          .join(' ')
          .split(/\s+/).length,
      0,
    ),
    timeRequired: `PT${post.readTime}M`,
    author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role, worksFor: { '@id': ORGANIZATION_ID } },
    publisher,
    isPartOf: { '@type': 'Blog', '@id': absoluteUrl('/blog#blog') },
  };
}

export function buildFaqSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(blogPostPath(post.slug))}#faq`,
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Blog merkezi için Blog şeması (tüm yazılar BlogPosting olarak listelenir). */
export function buildBlogSchema(posts: BlogPost[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': absoluteUrl('/blog#blog'),
    url: absoluteUrl(path),
    name: `${SITE_CONFIG.brandName} Mimari Rehber & Blog`,
    description:
      'Isıcamlı cam balkon, Winsa PVC pencere, sürme sistemler, giyotin cam ve bioklimatik pergola hakkında mühendislik rehberleri.',
    inLanguage: 'tr-TR',
    publisher,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(blogPostPath(post.slug))}#article`,
      headline: post.title.slice(0, 110),
      description: post.metaDescription,
      url: absoluteUrl(blogPostPath(post.slug)),
      image: absoluteUrl(post.image),
      datePublished: post.publishDate,
      dateModified: post.updatedDate,
      author: { '@type': 'Person', name: post.author.name },
    })),
  };
}

/** Blog merkezinde görünür SSS bölümüyle birebir eşleşen FAQPage şeması. */
export function buildAggregateFaqSchema(faqs: BlogFaq[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Blog merkezinde gösterilen SSS listesi: her yazının ilk sorusu. */
export const hubFaqs = (posts: BlogPost[]): BlogFaq[] => posts.map((post) => post.faqs[0]).filter(Boolean);
