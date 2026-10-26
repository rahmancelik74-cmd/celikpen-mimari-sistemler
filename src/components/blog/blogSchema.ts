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

export const blogPostPath = (slug: string, basePath = '/blog') => `${basePath}/${slug}`;

/** Tek bir yazı için BlogPosting + TechArticle + Speakable + E-E-A-T + Citation şeması. */
export function buildBlogPostingSchema(post: BlogPost, basePath = '/blog') {
  const url = absoluteUrl(blogPostPath(post.slug, basePath));
  const wordCount = post.sections.reduce(
    (total, s) =>
      total +
      [
        ...s.paragraphs,
        ...(s.bullets ?? []),
        ...(s.subsections ?? []).flatMap((x) => [...x.paragraphs, ...(x.bullets ?? [])]),
      ]
        .join(' ')
        .split(/\s+/).length,
    post.numberedChecklist.join(' ').split(/\s+/).length + 450,
  );

  return {
    '@context': 'https://schema.org',
    '@type': ['BlogPosting', 'TechArticle', 'Article'],
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: post.title.slice(0, 110),
    name: post.seoTitle,
    alternativeHeadline: post.seoTitle,
    description: post.metaDescription,
    image: [
      {
        '@type': 'ImageObject',
        url: absoluteUrl(post.image.split('?')[0]),
        caption: post.imageAlt,
        name: post.imageTitle,
      },
    ],
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    inLanguage: 'tr-TR',
    articleSection: post.category,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords, ...post.tags].join(', '),
    wordCount,
    timeRequired: `PT${post.readTime}M`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: { '@id': ORGANIZATION_ID },
    },
    reviewedBy: {
      '@type': 'Organization',
      name: 'Çelikpen Mimari Mühendislik & Ar-Ge Kurulu',
      url: absoluteUrl('/kurumsal/hakkimizda'),
    },
    publisher,
    isPartOf: { '@type': 'Blog', '@id': absoluteUrl(`${basePath}#blog`) },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#makale-ozeti', '#sesli-arama-yanitlari', '#sss'],
    },
    citation: post.externalReferences.map((ref) => ({
      '@type': 'CreativeWork',
      name: ref.title,
      publisher: { '@type': 'Organization', name: ref.organization },
      url: ref.url,
    })),
    commentCount: post.initialComments.length,
    comment: post.initialComments.map((c) => ({
      '@type': 'Comment',
      text: c.comment,
      author: { '@type': 'Person', name: c.author },
    })),
  };
}

export function buildFaqSchema(post: BlogPost, basePath = '/blog') {
  const combinedFaqs: BlogFaq[] = [
    ...post.faqs,
    ...post.voiceSearchQa.map((v) => ({
      question: v.spokenQuestion,
      answer: v.directAnswer,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(blogPostPath(post.slug, basePath))}#faq`,
    mainEntity: combinedFaqs.map((faq) => ({
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
    '@id': absoluteUrl(`${path}#blog`),
    url: absoluteUrl(path),
    name: `${SITE_CONFIG.brandName} Mimari Rehber & Blog`,
    description:
      'Isıcamlı cam balkon, Winsa PVC pencere, sürme sistemler, giyotin cam ve bioklimatik pergola hakkında mühendislik rehberleri.',
    inLanguage: 'tr-TR',
    publisher,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(blogPostPath(post.slug, path))}#article`,
      headline: post.title.slice(0, 110),
      description: post.metaDescription,
      url: absoluteUrl(blogPostPath(post.slug, path)),
      image: absoluteUrl(post.image.split('?')[0]),
      datePublished: post.publishDate,
      dateModified: post.updatedDate,
      keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
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
