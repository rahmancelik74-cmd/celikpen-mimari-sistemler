import defaultCmsJson from '../data/cms-store.json';
import { BLOG_POSTS } from '../data/blogData';
import {
  COMMON_EXTERNAL_AUTHORITIES,
  CORPORATE_AUTHOR,
  type BlogCategory,
  type BlogPost,
  type BlogSection,
  type BlogTocItem,
} from '../data/blogTypes';

export type UserRole = 'super_admin' | 'editor' | 'moderator';

export interface CmsUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  twoFactorEnabled: boolean;
  twoFactorPin: string;
  createdAt: string;
}

export interface CmsSession {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  device: string;
  ip: string;
  loginAt: string;
  active: boolean;
}

export type AuditAction = 'GÜNCELLEME' | 'EKLEME' | 'SİLME' | 'GÜVENLİK' | 'YAYIN' | 'GİRİŞ';

export interface CmsAuditLog {
  id: string;
  timestamp: string;
  userName: string;
  role: UserRole;
  module: string;
  action: AuditAction;
  summary: string;
}

export interface CmsNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export type RequestStatus = 'pending' | 'contacted' | 'completed' | 'archived';

export interface CmsDiscoveryRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  district: string;
  system: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
}

export interface CmsSmtpSettings {
  host: string;
  port: number;
  user: string;
  password: string;
  senderName: string;
  senderEmail: string;
  encryption: 'TLS' | 'SSL' | 'NONE';
}

export interface CmsThemeSettings {
  darkMode: boolean;
  primaryColor: string;
}

export interface CmsMaintenanceMode {
  enabled: boolean;
  title: string;
  message: string;
}

export interface CmsSiteSettings {
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string;
  whatsappText: string;
  email: string;
  address: string;
  shortAddress: string;
  workingHours: string;
  experienceYears: number;
  showMagazaMenu: boolean;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  announcementText: string;
  googlePlacesApiKey?: string;
  googlePlaceId?: string;
}

export interface CmsPricingSystem {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  pricePerM2: number;
  badge: string;
  active: boolean;
}

export interface CmsPricingAddons {
  catScreenPerUnit: number;
  pleatedBlindPerM2: number;
}

export type ContentStatus = 'published' | 'draft' | 'archived';

export interface CmsReferenceItem {
  id: string;
  image: string;
  title: string;
  district: string;
  system: string;
  category: string;
  status?: ContentStatus;
  featured?: boolean;
}

export interface CmsServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  href: string;
  active: boolean;
}

export interface CmsProductItem {
  id: string;
  brand: 'Winsa' | 'Albert Genau' | string;
  title: string;
  category: string;
  badge: string;
  image: string;
  href: string;
  active: boolean;
}

export interface CmsBlogPostItem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  category: string;
  tags?: string[];
  status?: ContentStatus;
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  youtubeVideoId?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  excerpt: string;
  contentHtml: string;
}

export interface CmsTestimonialItem {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CmsStoreData {
  updatedAt: string;
  siteSettings: CmsSiteSettings;
  smtpSettings: CmsSmtpSettings;
  themeSettings: CmsThemeSettings;
  maintenanceMode: CmsMaintenanceMode;
  users: CmsUser[];
  sessions: CmsSession[];
  auditLogs: CmsAuditLog[];
  notifications: CmsNotification[];
  discoveryRequests: CmsDiscoveryRequest[];
  pricingSystems: CmsPricingSystem[];
  pricingAddons: CmsPricingAddons;
  references: CmsReferenceItem[];
  services: CmsServiceItem[];
  products: CmsProductItem[];
  blogPosts: CmsBlogPostItem[];
  deletedBlogSlugs?: string[];
  testimonials: CmsTestimonialItem[];
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Süper Admin',
  editor: 'Editör',
  moderator: 'Moderatör',
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: ['pricing', 'settings', 'users', 'logs', 'publish', 'content', 'media', 'references', 'requests', 'blog', 'catalog'],
  editor: ['content', 'media', 'references', 'blog', 'catalog'],
  moderator: ['requests', 'content_approve'],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/* ─── BLOG VERİ BİRLEŞTİRME (15 OTORİTE MAKALE <-> /admin CMS) ────────── */

export function serializeRichPostToMarkdown(post: BlogPost): string {
  const blocks: string[] = [];
  for (const section of post.sections) {
    blocks.push(`## ${section.heading}`);
    for (const p of section.paragraphs) {
      blocks.push(p);
    }
    if (section.bullets?.length) {
      blocks.push(section.bullets.map((b) => `- ${b}`).join('\n'));
    }
    for (const sub of section.subsections ?? []) {
      blocks.push(`### ${sub.heading}`);
      for (const p of sub.paragraphs) {
        blocks.push(p);
      }
      if (sub.bullets?.length) {
        blocks.push(sub.bullets.map((b) => `- ${b}`).join('\n'));
      }
    }
  }
  return blocks.join('\n\n');
}

export function mapRichBlogPostToCmsItem(post: BlogPost): CmsBlogPostItem {
  return {
    slug: post.slug,
    title: post.title,
    metaTitle: post.seoTitle,
    metaDescription: post.metaDescription,
    primaryKeyword: post.primaryKeyword,
    category: post.category,
    tags: post.tags,
    status: 'published',
    readTime: post.readTime,
    publishedAt: post.publishDate,
    updatedAt: post.updatedDate,
    coverImage: post.image,
    youtubeVideoId: '',
    ogImage: post.image,
    ogTitle: post.seoTitle,
    ogDescription: post.metaDescription,
    canonicalUrl: '',
    excerpt: post.excerpt,
    contentHtml: serializeRichPostToMarkdown(post),
  };
}

export const BASE_BLOG_CMS_ITEMS: CmsBlogPostItem[] = BLOG_POSTS.map(mapRichBlogPostToCmsItem);

function slugifyId(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'bolum'
  );
}

function stripSimpleHtml(input: string): string {
  return input
    .replace(/<\/(p|h1|h2|h3|h4|li|div)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<h2[^>]*>/gi, '## ')
    .replace(/<h3[^>]*>/gi, '### ')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function parseContentToBlogSections(content: string, fallbackHeading: string): BlogSection[] {
  const clean = content.includes('<') ? stripSimpleHtml(content) : content;
  const lines = clean.split(/\r?\n/);
  const sections: BlogSection[] = [];
  let current: BlogSection | null = null;

  const ensureSection = (headingText: string) => {
    const heading = headingText.trim() || fallbackHeading;
    const sec: BlogSection = {
      id: `${slugifyId(heading)}-${sections.length + 1}`,
      heading,
      paragraphs: [],
      bullets: [],
    };
    sections.push(sec);
    current = sec;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('## ')) {
      ensureSection(line.slice(3));
    } else if (line.startsWith('### ')) {
      if (!current) ensureSection(fallbackHeading);
      const sec = current!;
      if (!sec.subsections) sec.subsections = [];
      const subHeading = line.slice(4).trim();
      sec.subsections.push({
        id: `${slugifyId(subHeading)}-${sec.subsections.length + 1}`,
        heading: subHeading,
        paragraphs: [],
      });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!current) ensureSection(fallbackHeading);
      const sec = current!;
      if (!sec.bullets) sec.bullets = [];
      sec.bullets.push(line.slice(2).trim());
    } else {
      if (!current) ensureSection(fallbackHeading);
      const sec = current!;
      if (sec.subsections && sec.subsections.length > 0) {
        sec.subsections[sec.subsections.length - 1].paragraphs.push(line);
      } else {
        sec.paragraphs.push(line);
      }
    }
  }

  return sections
    .map((sec) => ({
      ...sec,
      bullets: sec.bullets && sec.bullets.length > 0 ? sec.bullets : undefined,
      subsections: sec.subsections && sec.subsections.length > 0 ? sec.subsections : undefined,
    }))
    .filter((s) => s.paragraphs.length > 0 || (s.bullets && s.bullets.length > 0) || (s.subsections && s.subsections.length > 0));
}

function buildTocFromSections(sections: BlogSection[]): BlogTocItem[] {
  return sections.flatMap((section) => [
    { id: section.id, label: section.heading, level: 2 as const },
    ...(section.subsections ?? []).map((sub) => ({
      id: sub.id,
      label: sub.heading,
      level: 3 as const,
    })),
  ]);
}

export function cmsItemToRichBlogPost(item: CmsBlogPostItem): BlogPost {
  const basePost = BLOG_POSTS.find(
    (p) => p.slug === item.slug || (p.slugAliases ?? []).includes(item.slug)
  );

  if (basePost) {
    const baseSerialized = serializeRichPostToMarkdown(basePost).trim();
    const editedContent = (item.contentHtml || '').trim();
    const contentWasModified = editedContent.length > 0 && editedContent !== baseSerialized;
    const parsedSections = contentWasModified
      ? parseContentToBlogSections(editedContent, item.title || basePost.title)
      : basePost.sections;

    // Preserve structured tables/proTips on matching headings when user edited content in /admin
    const finalSections =
      contentWasModified && parsedSections.length > 0
        ? parsedSections.map((sec, idx) => {
            const matchedBase =
              basePost.sections.find((bs) => bs.heading === sec.heading) || basePost.sections[idx];
            return {
              ...sec,
              table: matchedBase?.table,
              proTip: matchedBase?.proTip,
            };
          })
        : basePost.sections;

    return {
      ...basePost,
      title: item.title || basePost.title,
      seoTitle: item.metaTitle || basePost.seoTitle,
      metaDescription: item.metaDescription || basePost.metaDescription,
      primaryKeyword: item.primaryKeyword || basePost.primaryKeyword,
      category: (item.category as BlogCategory) || basePost.category,
      tags: item.tags && item.tags.length > 0 ? item.tags : basePost.tags,
      readTime: item.readTime || basePost.readTime,
      publishDate: item.publishedAt || basePost.publishDate,
      updatedDate: item.updatedAt || basePost.updatedDate,
      image: item.coverImage || basePost.image,
      excerpt: item.excerpt || basePost.excerpt,
      sections: finalSections,
      tableOfContents: buildTocFromSections(finalSections),
    };
  }

  const parsedSections = parseContentToBlogSections(
    item.contentHtml || item.excerpt || item.title,
    item.title
  );
  const finalSections: BlogSection[] =
    parsedSections.length > 0
      ? parsedSections
      : [
          {
            id: 'genel-bakis',
            heading: item.title,
            paragraphs: [item.excerpt || item.metaDescription || item.title],
          },
        ];

  return {
    slug: item.slug,
    title: item.title,
    seoTitle: item.metaTitle || item.title,
    metaDescription: item.metaDescription || item.excerpt || item.title,
    primaryKeyword: item.primaryKeyword || item.title,
    secondaryKeywords: item.tags || [],
    tags: item.tags && item.tags.length > 0 ? item.tags : [item.category || 'Cam Balkon'],
    keywords: [item.primaryKeyword || item.title, ...(item.tags || [])].filter(Boolean),
    category: (item.category as BlogCategory) || 'Cam Balkon',
    readTime: item.readTime || 6,
    publishDate: item.publishedAt || new Date().toISOString().slice(0, 10),
    updatedDate: item.updatedAt || new Date().toISOString().slice(0, 10),
    author: CORPORATE_AUTHOR,
    image: item.coverImage || '/images/services/isicamli-cam-balkon.jpg',
    imageAlt: `${item.title} — Çelikpen`,
    imageCaption: item.excerpt || item.title,
    imageTitle: item.title,
    excerpt: item.excerpt || item.metaDescription || item.title,
    highlights: [
      item.excerpt || item.metaDescription || item.title,
      'Avrupa Yakası geneli ücretsiz lazerli keşif ve 10 yıl sistem garantisi.',
      'Bahçelievler Kocasinan Merkez üretim tesisinden doğrudan fabrika montajı.',
    ],
    numberedChecklistTitle: 'Mühendislik & Uygulama Kontrol Listesi',
    numberedChecklist: [],
    tableOfContents: buildTocFromSections(finalSections),
    sections: finalSections,
    internalLinks: [
      {
        label: '2026 Güncel m² Fiyat Hesaplama Motoru',
        href: '/fiyat-hesapla',
        context: 'Balkon ve doğrama ölçülerinize göre anlık maliyet hesaplayın.',
      },
      {
        label: 'Ücretsiz Lazerli Keşif Randevusu',
        href: '/iletisim?form=kesif',
        context: 'Aynı gün Avrupa Yakası yerinde ölçüm ve teknik danışmanlık.',
      },
    ],
    externalReferences: COMMON_EXTERNAL_AUTHORITIES,
    infographic: {
      title: item.title,
      subtitle: item.excerpt,
      metricUnit: 'Skor',
      items: [],
      footnote: '',
    },
    voiceSearchQa: [],
    initialComments: [],
    faqs: [
      {
        question: `${item.title} hakkında ücretsiz keşif alabilir miyim?`,
        answer:
          'Evet. İstanbul Avrupa Yakası genelinde Çelikpen Mimari Mühendislik Ekibimiz tarafından aynı gün ücretsiz lazerli keşif ve net fiyatlandırma hizmeti sunulmaktadır.',
      },
    ],
    relatedProductHref: '/urunler',
  };
}

export function mergeBlogPostsForCms(
  storedPosts?: CmsBlogPostItem[],
  deletedSlugs?: string[]
): CmsBlogPostItem[] {
  const deletedSet = new Set(deletedSlugs || []);
  const storedBySlug = new Map<string, CmsBlogPostItem>();

  if (Array.isArray(storedPosts)) {
    for (const post of storedPosts) {
      if (post?.slug && !deletedSet.has(post.slug)) {
        storedBySlug.set(post.slug, post);
      }
    }
  }

  const baseSlugs = new Set(BASE_BLOG_CMS_ITEMS.map((p) => p.slug));
  const customNewPosts: CmsBlogPostItem[] = [];

  if (Array.isArray(storedPosts)) {
    for (const post of storedPosts) {
      if (post?.slug && !baseSlugs.has(post.slug) && !deletedSet.has(post.slug)) {
        customNewPosts.push(post);
      }
    }
  }

  const mergedBasePosts = BASE_BLOG_CMS_ITEMS.filter((p) => !deletedSet.has(p.slug)).map(
    (baseItem) => {
      const override = storedBySlug.get(baseItem.slug);
      if (!override) return baseItem;
      return {
        ...baseItem,
        ...override,
        tags: override.tags && override.tags.length > 0 ? override.tags : baseItem.tags,
        contentHtml:
          override.contentHtml && override.contentHtml.trim().length > 0
            ? override.contentHtml
            : baseItem.contentHtml,
      };
    }
  );

  return [...customNewPosts, ...mergedBasePosts];
}

export function mergeCmsToRichBlogPosts(cmsData: Pick<CmsStoreData, 'blogPosts'>): BlogPost[] {
  const items = Array.isArray(cmsData.blogPosts) && cmsData.blogPosts.length > 0
    ? cmsData.blogPosts
    : BASE_BLOG_CMS_ITEMS;
  return items
    .filter((item) => !item.status || item.status === 'published')
    .map(cmsItemToRichBlogPost);
}

const LEGACY_IMAGE_FIX_MAP: Record<string, string> = {
  '/images/services/giyotin-cam.jpg': '/images/services/giyotin-cam-sistemleri.jpg',
  '/images/services/kis-bahcesi.jpg': '/images/services/kis-bahcesi-sistemleri.jpg',
  '/images/services/panjur-sineklik.jpg': '/images/services/panjur-kepenk-sineklik.jpg',
  '/images/products/winsa-dorado-76.jpg': '/images/products/siyavuspasa-dorado-76-pvc-pencere.jpg',
  '/images/products/winsa-revotech.jpg': '/images/products/kocasinan-revotech-gold-antrasit-pvc-pencere.jpg',
  '/images/products/winsa-safir-76.jpg': '/images/products/yenibosna-safir-76-pvc-pencere.jpg',
  '/images/products/winsa-panorama-hs-76.jpg': '/images/products/bahcelievler-panorama-hs-76-kaldir-sur-kapi.jpg',
  '/images/products/winsa-comfort-slide.jpg': '/images/products/sirinevler-comfort-slide-plus-surme-kapi.jpg',
  '/images/products/winsa-vera-cam-balkon.jpg': '/images/products/kocasinan-vera-termal-isicamli-cam-balkon.jpg',
};

function fixLegacyImagePath(img: string): string {
  return LEGACY_IMAGE_FIX_MAP[img] || img;
}

const rawJson = defaultCmsJson as unknown as CmsStoreData;

export const DEFAULT_CMS_DATA: CmsStoreData = {
  ...rawJson,
  services: Array.isArray(rawJson.services)
    ? rawJson.services.map((s) => ({ ...s, image: fixLegacyImagePath(s.image) }))
    : [],
  products: Array.isArray(rawJson.products)
    ? rawJson.products.map((p) => ({ ...p, image: fixLegacyImagePath(p.image) }))
    : [],
  deletedBlogSlugs: Array.isArray(rawJson.deletedBlogSlugs) ? rawJson.deletedBlogSlugs : [],
  blogPosts: mergeBlogPostsForCms(rawJson.blogPosts, rawJson.deletedBlogSlugs),
};

export function normalizeCmsData(raw: Partial<CmsStoreData> | null | undefined): CmsStoreData {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_CMS_DATA;
  }

  const deletedBlogSlugs = Array.isArray(raw.deletedBlogSlugs)
    ? raw.deletedBlogSlugs
    : DEFAULT_CMS_DATA.deletedBlogSlugs || [];

  return {
    updatedAt: raw.updatedAt || DEFAULT_CMS_DATA.updatedAt,
    siteSettings: {
      ...DEFAULT_CMS_DATA.siteSettings,
      ...(raw.siteSettings || {}),
    },
    smtpSettings: {
      ...DEFAULT_CMS_DATA.smtpSettings,
      ...(raw.smtpSettings || {}),
    },
    themeSettings: {
      ...DEFAULT_CMS_DATA.themeSettings,
      ...(raw.themeSettings || {}),
    },
    maintenanceMode: {
      ...DEFAULT_CMS_DATA.maintenanceMode,
      ...(raw.maintenanceMode || {}),
    },
    users:
      Array.isArray(raw.users) && raw.users.length > 0
        ? raw.users
        : DEFAULT_CMS_DATA.users,
    sessions: Array.isArray(raw.sessions) ? raw.sessions : [],
    auditLogs: Array.isArray(raw.auditLogs) ? raw.auditLogs : [],
    notifications: Array.isArray(raw.notifications) ? raw.notifications : DEFAULT_CMS_DATA.notifications || [],
    discoveryRequests: Array.isArray(raw.discoveryRequests) ? raw.discoveryRequests : DEFAULT_CMS_DATA.discoveryRequests || [],
    pricingSystems:
      Array.isArray(raw.pricingSystems) && raw.pricingSystems.length > 0
        ? raw.pricingSystems
        : DEFAULT_CMS_DATA.pricingSystems,
    pricingAddons: {
      ...DEFAULT_CMS_DATA.pricingAddons,
      ...(raw.pricingAddons || {}),
    },
    references:
      Array.isArray(raw.references) && raw.references.length > 0
        ? raw.references
        : DEFAULT_CMS_DATA.references,
    services: (
      Array.isArray(raw.services) && raw.services.length > 0
        ? raw.services
        : DEFAULT_CMS_DATA.services
    ).map((s) => ({ ...s, image: fixLegacyImagePath(s.image) })),
    products: (
      Array.isArray(raw.products) && raw.products.length > 0
        ? raw.products
        : DEFAULT_CMS_DATA.products
    ).map((p) => ({ ...p, image: fixLegacyImagePath(p.image) })),
    blogPosts: mergeBlogPostsForCms(
      Array.isArray(raw.blogPosts) && raw.blogPosts.length > 0
        ? raw.blogPosts
        : DEFAULT_CMS_DATA.blogPosts,
      deletedBlogSlugs
    ),
    deletedBlogSlugs,
    testimonials:
      Array.isArray(raw.testimonials) && raw.testimonials.length > 0
        ? raw.testimonials
        : DEFAULT_CMS_DATA.testimonials || [],
  };
}
