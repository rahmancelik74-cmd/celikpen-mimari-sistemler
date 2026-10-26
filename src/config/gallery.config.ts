export interface GalleryItem {
  src: string;
  alt: string;
  category: 'katlanir' | 'isicam' | 'surme' | 'giyotin' | 'kis-bahcesi';
  neighborhood: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [];
