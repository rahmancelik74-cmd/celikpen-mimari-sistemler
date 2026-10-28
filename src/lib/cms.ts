import defaultCmsJson from '../data/cms-store.json';

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

export const DEFAULT_CMS_DATA: CmsStoreData = defaultCmsJson as unknown as CmsStoreData;

export function normalizeCmsData(raw: Partial<CmsStoreData> | null | undefined): CmsStoreData {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_CMS_DATA;
  }

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
    services:
      Array.isArray(raw.services) && raw.services.length > 0
        ? raw.services
        : DEFAULT_CMS_DATA.services,
    products:
      Array.isArray(raw.products) && raw.products.length > 0
        ? raw.products
        : DEFAULT_CMS_DATA.products,
    blogPosts:
      Array.isArray(raw.blogPosts) && raw.blogPosts.length > 0
        ? raw.blogPosts
        : DEFAULT_CMS_DATA.blogPosts,
    testimonials:
      Array.isArray(raw.testimonials) && raw.testimonials.length > 0
        ? raw.testimonials
        : DEFAULT_CMS_DATA.testimonials || [],
  };
}
