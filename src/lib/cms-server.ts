import fsSync from 'node:fs';
import path from 'node:path';
import {
  DEFAULT_CMS_DATA,
  mergeCmsToRichBlogPosts,
  normalizeCmsData,
  type CmsStoreData,
} from './cms';
import { readCmsFromBlob } from './blob-storage';
import type { BlogPost } from '../data/blogTypes';

const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-store.json');

let runtimeCmsCache: CmsStoreData | null = null;

export function setRuntimeCmsCache(data: CmsStoreData): void {
  runtimeCmsCache = normalizeCmsData(data);
}

export function readCmsStoreFromFileSync(): CmsStoreData {
  try {
    const rawText = fsSync.readFileSync(CMS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(rawText) as Partial<CmsStoreData>;
    return normalizeCmsData(parsed);
  } catch {
    return DEFAULT_CMS_DATA;
  }
}

export async function readCmsStoreFromFile(): Promise<CmsStoreData> {
  return readCmsStoreFromFileSync();
}

/**
 * Tek Doğruluk Kaynağı (Single Source of Truth — Runtime Dynamic Loader):
 * `src/data/cms-store.json` dosyasını çalışma anında `fs.readFileSync` ile dinamik olarak okur
 * (derleme anında dondurulmuş statik JSON importuna bağlı kalmaz), bellek içi önbellek ve
 * Vercel Blob ile karşılaştırarak en güncel durumu döndürür.
 */
export async function getCmsData(): Promise<CmsStoreData> {
  const fileData = readCmsStoreFromFileSync();
  let newest = fileData;

  if (runtimeCmsCache) {
    const memTime = new Date(runtimeCmsCache.updatedAt || 0).getTime();
    const fileTime = new Date(newest.updatedAt || 0).getTime();
    if (memTime >= fileTime) {
      newest = runtimeCmsCache;
    }
  }

  try {
    const blobData = await readCmsFromBlob();
    if (blobData) {
      const normalizedBlob = normalizeCmsData(blobData);
      const blobTime = new Date(normalizedBlob.updatedAt || 0).getTime();
      const newestTime = new Date(newest.updatedAt || 0).getTime();
      if (blobTime >= newestTime) {
        newest = normalizedBlob;
      }
    }
  } catch {
    // Fallback to newest (file / memory)
  }

  runtimeCmsCache = newest;
  return newest;
}

export const getMergedCmsData = getCmsData;

export async function getMergedRichBlogPosts(): Promise<BlogPost[]> {
  const merged = await getCmsData();
  return mergeCmsToRichBlogPosts(merged);
}

export async function getMergedRichBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getMergedRichBlogPosts();
  return posts.find(
    (post) => post.slug === slug || (post.slugAliases ?? []).includes(slug)
  );
}
