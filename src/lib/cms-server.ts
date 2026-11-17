import fs from 'node:fs/promises';
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

export async function readCmsStoreFromFile(): Promise<CmsStoreData> {
  try {
    const rawText = await fs.readFile(CMS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(rawText) as Partial<CmsStoreData>;
    return normalizeCmsData(parsed);
  } catch {
    return DEFAULT_CMS_DATA;
  }
}

/**
 * Birleşik Sunucu Veri Kaynağı (Single Source of Truth):
 * `src/data/blogData.ts` içindeki tüm 15 SEO blog makalesi, hizmetler, ürünler, referanslar,
 * m² fiyatlandırma ve site ayarlarını `src/data/cms-store.json` + Vercel Blob kayıtlarıyla
 * iki yönlü olarak birleştirir.
 */
export async function getMergedCmsData(): Promise<CmsStoreData> {
  const fileData = await readCmsStoreFromFile();
  try {
    const blobData = await readCmsFromBlob();
    if (blobData) {
      const normalizedBlob = normalizeCmsData(blobData);
      const blobTime = new Date(normalizedBlob.updatedAt || 0).getTime();
      const fileTime = new Date(fileData.updatedAt || 0).getTime();
      return blobTime >= fileTime ? normalizedBlob : fileData;
    }
  } catch {
    // Fallback to fileData
  }
  return fileData;
}

export async function getMergedRichBlogPosts(): Promise<BlogPost[]> {
  const merged = await getMergedCmsData();
  return mergeCmsToRichBlogPosts(merged);
}

export async function getMergedRichBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getMergedRichBlogPosts();
  return posts.find(
    (post) => post.slug === slug || (post.slugAliases ?? []).includes(slug)
  );
}
