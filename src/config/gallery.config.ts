export interface GalleryItem {
  src: string;
  alt: string;
  category: 'katlanir' | 'isicam' | 'surme' | 'giyotin' | 'kis-bahcesi';
  neighborhood: string;
}

// TODO: public/galeri/ altına saha görselleri eklendikçe bu diziyi doldurun
export const GALLERY_ITEMS: GalleryItem[] = [];
