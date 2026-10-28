import type { CmsStoreData } from './cms';

const CMS_BLOB_KEY = 'cms-store.json';

function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function readCmsFromBlob(): Promise<CmsStoreData | null> {
  if (!isBlobConfigured()) return null;
  try {
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: CMS_BLOB_KEY, limit: 1 });
    const match = blobs.find((b) => b.pathname === CMS_BLOB_KEY);
    if (!match) return null;
    const res = await fetch(match.url, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as CmsStoreData;
  } catch {
    return null;
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
