import type {
  CmsStoreData,
  CmsBlogPostItem,
  CmsReferenceItem,
  CmsPricingSystem,
  CmsServiceItem,
  CmsProductItem,
  CmsSiteSettings,
  CmsTestimonialItem,
  UserRole,
} from '../../lib/cms';

export type AdminTabId =
  | 'overview'
  | 'pricing'
  | 'references'
  | 'catalog'
  | 'blog'
  | 'reviews'
  | 'settings'
  | 'security'
  | 'media'
  | 'logs';

export interface AdminTabProps {
  draft: CmsStoreData;
  setDraft: React.Dispatch<React.SetStateAction<CmsStoreData>>;
  saveAllToCms: (nextData?: CmsStoreData, customNotice?: string) => Promise<void>;
  isSaving: boolean;
  isUploading: boolean;
  showNotice: (type: 'success' | 'error' | 'info', text: string) => void;
  uploadImageFile: (file: File) => Promise<string | null>;
  savedPassword: string;
  setActiveTab: (tab: AdminTabId) => void;
  currentRole: UserRole;
}

export type {
  CmsStoreData,
  CmsBlogPostItem,
  CmsReferenceItem,
  CmsPricingSystem,
  CmsServiceItem,
  CmsProductItem,
  CmsSiteSettings,
  CmsTestimonialItem,
  UserRole,
};
