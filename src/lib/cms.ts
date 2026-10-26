/**
 * ÇELİKPEN MERKEZİ CMS VERİ DEPOSU YARDIMCISI (SERVER & CLIENT UYUMLU)
 * ---------------------------------------------------------------------
 * Bu modül hem API Route Handler'lar (`/api/admin/cms`) hem de istemci
 * bileşenleri (`CmsProvider.tsx`, `/admin`) tarafından güvenle import edilir.
 */
import defaultCmsJson from '../data/cms-store.json';

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

export interface CmsReferenceItem {
  id: string;
  image: string;
  title: string;
  district: string;
  system: string;
  category: string;
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
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  youtubeVideoId?: string;
  excerpt: string;
  contentHtml: string;
}

export interface CmsStoreData {
  updatedAt: string;
  siteSettings: CmsSiteSettings;
  pricingSystems: CmsPricingSystem[];
  pricingAddons: CmsPricingAddons;
  references: CmsReferenceItem[];
  services: CmsServiceItem[];
  products: CmsProductItem[];
  blogPosts: CmsBlogPostItem[];
}

export const DEFAULT_CMS_DATA: CmsStoreData = defaultCmsJson as CmsStoreData;

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
  };
}
