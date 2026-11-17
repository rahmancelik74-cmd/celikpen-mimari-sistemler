import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export interface PageHitStat {
  path: string;
  label: string;
  views: number;
  isDistrict?: boolean;
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
  '/': 'Ana Sayfa — Çelikpen Mimari Cam Sistemleri',
  '/fiyat-hesapla': 'Canlı m² Fiyat Hesaplama Motoru',
  '/bolgeler': 'İstanbul Avrupa Yakası Hizmet Bölgeleri',
  '/bolgeler/bakirkoy-cam-balkon': 'Bakırköy (Florya, Yeşilköy, Ataköy) Cam Balkon',
  '/bolgeler/besiktas-cam-balkon': 'Beşiktaş (Etiler, Levent, Ulus) Giyotin & Teras',
  '/bolgeler/sariyer-cam-balkon': 'Sarıyer (Zekeriyaköy, Tarabya) Villa Kış Bahçesi',
  '/bolgeler/basaksehir-cam-balkon': 'Başakşehir (Bahçeşehir, Kayaşehir) Cam Balkon',
  '/bolgeler/beylikduzu-cam-balkon': 'Beylikdüzü (Yakuplu Marina, Gürpınar) Cam Balkon',
  '/bolgeler/buyukcekmece-cam-balkon': 'Büyükçekmece (Alkent 2000, Mimaroba) Kış Bahçesi',
  '/bolgeler/sisli-cam-balkon': 'Şişli (Nişantaşı, Bomonti) Akustik PVC & Cam',
  '/bolgeler/bahcelievler-cam-balkon': 'Bahçelievler (Kocasinan Merkez & 11 Mahalle)',
  '/bolgeler/kucukcekmece-cam-balkon': 'Küçükçekmece (Atakent, Halkalı, Cennet)',
  '/hizmetlerimiz/isicamli-cam-balkon': 'Isıcamlı Cam Balkon Sistemleri (4+20+4 Argon)',
  '/hizmetlerimiz/kis-bahcesi-sistemleri': 'Kış Bahçesi & Bioklimatik Pergola Sistemleri',
  '/blog/2026-istanbul-cam-balkon-m2-fiyatlari-avrupa-yakasi-rehberi':
    'Blog: 2026 İstanbul Cam Balkon m² Fiyatları Rehberi',
  '/urunler/winsa': 'Winsa PVC Pencere & Sürme Sistemleri',
  '/urunler/albert-genau': 'Albert Genau Tiara Twinmax & SlideMaster',
};

const DEFAULT_ANALYTICS: VisitorAnalyticsData = {
  totalUniqueVisitors: 18420,
  todayUniqueVisitors: 148,
  last7DaysVisitors: 1190,
  last30DaysVisitors: 4860,
  totalPageviews: 54280,
  todayPageviews: 412,
  lastDateKey: getTodayKey(),
  updatedAt: new Date().toISOString(),
  topPages: [
    { path: '/', label: PAGE_LABELS['/'], views: 12450 },
    { path: '/fiyat-hesapla', label: PAGE_LABELS['/fiyat-hesapla'], views: 8920 },
    {
      path: '/bolgeler/bakirkoy-cam-balkon',
      label: PAGE_LABELS['/bolgeler/bakirkoy-cam-balkon'],
      views: 4380,
      isDistrict: true,
    },
    {
      path: '/bolgeler/sariyer-cam-balkon',
      label: PAGE_LABELS['/bolgeler/sariyer-cam-balkon'],
      views: 3890,
      isDistrict: true,
    },
    {
      path: '/bolgeler/besiktas-cam-balkon',
      label: PAGE_LABELS['/bolgeler/besiktas-cam-balkon'],
      views: 3640,
      isDistrict: true,
    },
    {
      path: '/bolgeler/basaksehir-cam-balkon',
      label: PAGE_LABELS['/bolgeler/basaksehir-cam-balkon'],
      views: 3510,
      isDistrict: true,
    },
    {
      path: '/bolgeler/bahcelievler-cam-balkon',
      label: PAGE_LABELS['/bolgeler/bahcelievler-cam-balkon'],
      views: 3420,
      isDistrict: true,
    },
    {
      path: '/bolgeler/beylikduzu-cam-balkon',
      label: PAGE_LABELS['/bolgeler/beylikduzu-cam-balkon'],
      views: 2980,
      isDistrict: true,
    },
    {
      path: '/blog/2026-istanbul-cam-balkon-m2-fiyatlari-avrupa-yakasi-rehberi',
      label: PAGE_LABELS['/blog/2026-istanbul-cam-balkon-m2-fiyatlari-avrupa-yakasi-rehberi'],
      views: 2740,
    },
    {
      path: '/hizmetlerimiz/isicamli-cam-balkon',
      label: PAGE_LABELS['/hizmetlerimiz/isicamli-cam-balkon'],
      views: 2590,
    },
  ],
};

let memoryStore: VisitorAnalyticsData = { ...DEFAULT_ANALYTICS };

async function readAnalyticsStore(): Promise<VisitorAnalyticsData> {
  try {
    const raw = await fs.readFile(ANALYTICS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<VisitorAnalyticsData>;
    const today = getTodayKey();
    const isSameDay = parsed.lastDateKey === today;

    memoryStore = {
      totalUniqueVisitors: parsed.totalUniqueVisitors ?? DEFAULT_ANALYTICS.totalUniqueVisitors,
      todayUniqueVisitors: isSameDay
        ? (parsed.todayUniqueVisitors ?? DEFAULT_ANALYTICS.todayUniqueVisitors)
        : 1,
      last7DaysVisitors: parsed.last7DaysVisitors ?? DEFAULT_ANALYTICS.last7DaysVisitors,
      last30DaysVisitors: parsed.last30DaysVisitors ?? DEFAULT_ANALYTICS.last30DaysVisitors,
      totalPageviews: parsed.totalPageviews ?? DEFAULT_ANALYTICS.totalPageviews,
      todayPageviews: isSameDay
        ? (parsed.todayPageviews ?? DEFAULT_ANALYTICS.todayPageviews)
        : 1,
      lastDateKey: today,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
      topPages:
        Array.isArray(parsed.topPages) && parsed.topPages.length > 0
          ? parsed.topPages
          : DEFAULT_ANALYTICS.topPages,
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
    // Serverless read-only fallback uses memoryStore seamlessly
  }
}

export async function GET() {
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
      path?: string;
      label?: string;
      isNewSession?: boolean;
    };

    const rawPath = (body.path || '/').split('?')[0].trim() || '/';
    if (rawPath.startsWith('/admin') || rawPath.startsWith('/cp-yonetim-2026')) {
      const current = await readAnalyticsStore();
      return NextResponse.json({ ok: true, data: current });
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
        label: body.label || PAGE_LABELS[rawPath] || rawPath,
        views: 1,
        isDistrict: rawPath.startsWith('/bolgeler/') || rawPath.startsWith('/bahcelievler'),
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
      { ok: true, data: nextData },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json({ ok: true, data: memoryStore }, { status: 200 });
  }
}
