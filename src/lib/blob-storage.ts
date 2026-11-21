import type { CmsStoreData } from './cms';

const CMS_BLOB_KEY = 'cms-store.json';
const CMS_BLOB_CACHE_TTL_MS = 60_000;

let cachedCmsData: CmsStoreData | null = null;
let cachedCmsAt = 0;

function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/**
 * Derives the deterministic public URL for `cms-store.json` directly from
 * `BLOB_READ_WRITE_TOKEN` (`vercel_blob_rw_<storeId>_<secret>`), completely
 * eliminating Vercel Blob `list()` Advanced Operations on every page load.
 */
function getDirectCmsBlobUrl(): string | null {
  const explicitUrl = process.env.CMS_BLOB_URL?.trim();
  if (explicitUrl) return explicitUrl;

  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return null;

  const parts = token.split('_');
  // Expected format: vercel_blob_rw_<storeId>_<secret>
  if (parts.length >= 4 && parts[0] === 'vercel' && parts[1] === 'blob' && parts[3]) {
    const storeId = parts[3].toLowerCase();
    return `https://${storeId}.public.blob.vercel-storage.com/${CMS_BLOB_KEY}`;
  }

  return null;
}

export async function readCmsFromBlob(options?: { bypassCache?: boolean }): Promise<CmsStoreData | null> {
  if (!isBlobConfigured()) return null;

  const now = Date.now();
  if (!options?.bypassCache && cachedCmsData && now - cachedCmsAt < CMS_BLOB_CACHE_TTL_MS) {
    return cachedCmsData;
  }

  const directUrl = getDirectCmsBlobUrl();
  if (!directUrl) return cachedCmsData;

  try {
    const res = await fetch(directUrl, { cache: 'no-store' });
    if (!res.ok) return cachedCmsData;
    const parsed = (await res.json()) as CmsStoreData;
    cachedCmsData = parsed;
    cachedCmsAt = Date.now();
    return parsed;
  } catch {
    return cachedCmsData;
  }
}

export async function writeCmsToBlob(data: CmsStoreData): Promise<boolean> {
  if (!isBlobConfigured()) return false;
  try {
    const { put } = await import('@vercel/blob');
    await put(CMS_BLOB_KEY, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
    cachedCmsData = data;
    cachedCmsAt = Date.now();
    return true;
  } catch {
    return false;
  }
}

export async function uploadImageToBlob(
  fileName: string,
  buffer: Buffer,
  contentType: string
): Promise<string | null> {
  if (!isBlobConfigured()) return null;
  try {
    const { put } = await import('@vercel/blob');
    const blob = await put(`uploads/${fileName}`, buffer, {
      access: 'public',
      contentType,
      addRandomSuffix: false,
    });
    return blob.url;
  } catch {
    return null;
  }
}

export { isBlobConfigured };
