import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { verifyAdminRequest } from '../../../lib/admin-auth';

export const dynamic = 'force-dynamic';

export interface PageHitStat {
  path: string;
  label: string;
  views: number;
}

export interface VisitorAnalyticsData {
  totalUniqueVisitors: number;
  todayUniqueVisitors: number;
  last7DaysVisitors: number;
  last30DaysVisitors: number;
  totalPageviews: number;
  todayPageviews: number;
  lastDateKey: string;
  updatedAt: string;
  topPages: PageHitStat[];
}

const ANALYTICS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'analytics-store.json');

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

const PAGE_LABELS: Record<string, string> = {
  '/': 'Ana Sayfa',
  '/fiyat-hesapla': 'm² Fiyat Hesaplama Motoru',
  '/hizmetlerimiz': 'Hizmetlerimiz',
  '/urunler': 'Ürün Kataloğu',
  '/urunler/winsa': 'Winsa Sistemleri',
  '/urunler/albert-genau': 'Albert Genau Sistemleri',
  '/profesyoneller/referanslar': 'Referans Projelerimiz',
  '/blog': 'Blog & Mimari Rehberler',
  '/yorumlar': 'Müşteri Yorumları',
  '/iletisim': 'İletişim & Keşif Formu',
};

const ZERO_ANALYTICS: VisitorAnalyticsData = {
  totalUniqueVisitors: 0,
  todayUniqueVisitors: 0,
  last7DaysVisitors: 0,
  last30DaysVisitors: 0,
  totalPageviews: 0,
  todayPageviews: 0,
  lastDateKey: getTodayKey(),
  updatedAt: new Date().toISOString(),
  topPages: [],
};

let memoryStore: VisitorAnalyticsData = { ...ZERO_ANALYTICS };

function sanitizeTrackedPath(raw?: string): string {
  if (!raw || typeof raw !== 'string') return '/';
  const withoutQuery = raw.split('?')[0].split('#')[0].trim();
  const normalized = withoutQuery.replace(/[^a-zA-Z0-9/_-]/g, '').slice(0, 140);
  if (!normalized.startsWith('/')) return '/';
  return normalized.replace(/\/+/g, '/') || '/';
}

function sanitizeTrackedLabel(raw?: string, fallbackPath = '/'): string {
  if (!raw || typeof raw !== 'string') {
    return PAGE_LABELS[fallbackPath] || fallbackPath;
  }
  const cleaned = raw.replace(/[<>"'`\\\r\n\t]/g, '').trim().slice(0, 100);
  return cleaned || PAGE_LABELS[fallbackPath] || fallbackPath;
}

async function readAnalyticsStore(): Promise<VisitorAnalyticsData> {
  const today = getTodayKey();

  try {
    const raw = await fs.readFile(ANALYTICS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<VisitorAnalyticsData>;
    const isSameDay = parsed.lastDateKey === today;

    memoryStore = {
      totalUniqueVisitors: parsed.totalUniqueVisitors ?? 0,
      todayUniqueVisitors: isSameDay ? (parsed.todayUniqueVisitors ?? 0) : 0,
      last7DaysVisitors: parsed.last7DaysVisitors ?? 0,
      last30DaysVisitors: parsed.last30DaysVisitors ?? 0,
      totalPageviews: parsed.totalPageviews ?? 0,
      todayPageviews: isSameDay ? (parsed.todayPageviews ?? 0) : 0,
      lastDateKey: today,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
      topPages: Array.isArray(parsed.topPages) ? parsed.topPages : [],
    };
    return memoryStore;
  } catch {
    return memoryStore;
  }
}

async function writeAnalyticsStore(nextData: VisitorAnalyticsData): Promise<void> {
  memoryStore = nextData;
  try {
    await fs.mkdir(path.dirname(ANALYTICS_FILE_PATH), { recursive: true });
    await fs.writeFile(ANALYTICS_FILE_PATH, JSON.stringify(nextData, null, 2), 'utf-8');
  } catch {
    // Serverless read-only fallback uses memoryStore (0 Vercel Blob operations)
  }
}

export async function GET(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { ok: false, error: 'Yetkisiz erişim. Ziyaretçi analitikleri yalnızca yöneticilere açıktır.' },
      { status: 401, headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  }

  const data = await readAnalyticsStore();
  return NextResponse.json(
    {
      ok: true,
      data,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      action?: 'reset';
      path?: string;
      label?: string;
      isNewSession?: boolean;
    };

    if (body.action === 'reset') {
      if (!verifyAdminRequest(request)) {
        return NextResponse.json(
          { ok: false, error: 'Yetkisiz işlem.' },
          { status: 401, headers: { 'Cache-Control': 'no-store' } }
        );
      }

      const fresh: VisitorAnalyticsData = {
        ...ZERO_ANALYTICS,
        lastDateKey: getTodayKey(),
        updatedAt: new Date().toISOString(),
      };
      await writeAnalyticsStore(fresh);
      return NextResponse.json({ ok: true, data: fresh });
    }

    const rawPath = sanitizeTrackedPath(body.path);
    if (rawPath.startsWith('/admin') || rawPath.startsWith('/cp-yonetim-2026')) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const current = await readAnalyticsStore();
    const today = getTodayKey();
    const isNewDay = current.lastDateKey !== today;
    const isNewVisitor = Boolean(body.isNewSession);

    const updatedPages = [...current.topPages];
    const existingIdx = updatedPages.findIndex((p) => p.path === rawPath);
    if (existingIdx >= 0) {
      updatedPages[existingIdx] = {
        ...updatedPages[existingIdx],
        views: updatedPages[existingIdx].views + 1,
      };
    } else {
      updatedPages.push({
        path: rawPath,
        label: sanitizeTrackedLabel(body.label, rawPath),
        views: 1,
      });
    }

    updatedPages.sort((a, b) => b.views - a.views);

    const nextData: VisitorAnalyticsData = {
      totalUniqueVisitors: current.totalUniqueVisitors + (isNewVisitor ? 1 : 0),
      todayUniqueVisitors: (isNewDay ? 0 : current.todayUniqueVisitors) + (isNewVisitor ? 1 : 0),
      last7DaysVisitors: current.last7DaysVisitors + (isNewVisitor ? 1 : 0),
      last30DaysVisitors: current.last30DaysVisitors + (isNewVisitor ? 1 : 0),
      totalPageviews: current.totalPageviews + 1,
      todayPageviews: (isNewDay ? 0 : current.todayPageviews) + 1,
      lastDateKey: today,
      updatedAt: new Date().toISOString(),
      topPages: updatedPages.slice(0, 15),
    };

    await writeAnalyticsStore(nextData);

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
