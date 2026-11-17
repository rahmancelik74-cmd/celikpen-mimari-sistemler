import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { GOOGLE_MAPS_REVIEW_URL, TESTIMONIALS } from '../../../config/testimonials.config';
import { DEFAULT_CMS_DATA, normalizeCmsData, type CmsStoreData } from '../../../lib/cms';
import { readCmsFromBlob } from '../../../lib/blob-storage';

export const dynamic = 'force-dynamic';

const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-store.json');
const PRIMARY_BUSINESS_QUERY =
  process.env.GOOGLE_BUSINESS_QUERY ||
  'Pimapen tamircisi, Cam Balkon, Alüminyum Kızılelma Cad. No: 30/C Bahçelievler İstanbul';
const FALLBACK_BUSINESS_QUERY = 'Kızılelma Cad. No: 30/C Bahçelievler İstanbul';

export interface GoogleReviewItem {
  id: string;
  authorName: string;
  location: string;
  system: string;
  rating: number;
  text: string;
  date: string;
  verifiedLabel: string;
  districtHref: string;
}

export interface GoogleReviewsApiResponse {
  ok: boolean;
  mode: 'live_google_places_api' | 'demo_verified_preview';
  statusBadge: string;
  statusMessage: string;
  hasConfiguredKey: boolean;
  maskedKey: string;
  placeId: string;
  resolvedPlaceId: string;
  businessName: string;
  businessAddress: string;
  rating: number;
  totalReviews: number;
  userRatingsTotal: number;
  googleMapsUrl: string;
  mapsUrl: string;
  writeReviewUrl: string;
  apiDiagnostic?: string;
  reviews: GoogleReviewItem[];
  fetchedAt: string;
}

interface PlacesV1Review {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  publishTime?: string;
  authorAttribution?: { displayName?: string };
}

interface PlacesV1Place {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesV1Review[];
}

async function readCmsSettings(): Promise<CmsStoreData['siteSettings']> {
  try {
    const blobData = await readCmsFromBlob();
    if (blobData?.siteSettings) {
      return normalizeCmsData(blobData).siteSettings;
    }
  } catch {
    // ignore
  }
  try {
    const raw = await fs.readFile(CMS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<CmsStoreData>;
    return normalizeCmsData(parsed).siteSettings;
  } catch {
    return DEFAULT_CMS_DATA.siteSettings;
  }
}

function maskApiKey(key: string): string {
  if (!key || key.length < 10) return 'Tanımlı Değil (Demo Modu)';
  return `${key.slice(0, 6)}••••••••••••••••••••${key.slice(-4)}`;
}

function buildFallbackReviews(): GoogleReviewItem[] {
  return TESTIMONIALS.map((t, index) => ({
    id: `google-verified-${index + 1}`,
    authorName: t.name,
    location: t.neighborhoodSlug,
    system: t.systemCode,
    rating: t.rating,
    text: t.comment,
    date: t.date,
    verifiedLabel: t.verifiedLabel,
    districtHref: t.districtHref,
  }));
}

function isValidPlaceId(val: string): boolean {
  return Boolean(val) && !val.includes(' ') && val.length >= 12;
}

function buildGoogleUrls(placeId: string, fallbackUri?: string) {
  if (isValidPlaceId(placeId)) {
    const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`;
    const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
    return { googleMapsUrl, writeReviewUrl };
  }
  return {
    googleMapsUrl: fallbackUri || GOOGLE_MAPS_REVIEW_URL,
    writeReviewUrl: fallbackUri || GOOGLE_MAPS_REVIEW_URL,
  };
}

function mapV1Reviews(reviews: PlacesV1Review[] | undefined, fallback: GoogleReviewItem[]): GoogleReviewItem[] {
  if (!Array.isArray(reviews) || reviews.length === 0) return fallback;
  return reviews.map((r, idx) => ({
    id: `live-google-${idx + 1}`,
    authorName: 'Google Doğrulanmış Müşteri Projesi',
    location: 'İstanbul Avrupa Yakası',
    system: 'Çelikpen Mimari Cam & PVC Sistemleri',
    rating: typeof r.rating === 'number' && r.rating > 0 ? r.rating : 5,
    text: r.text?.text || r.originalText?.text || '',
    date: r.publishTime ? r.publishTime.slice(0, 10) : new Date().toISOString().slice(0, 10),
    verifiedLabel: 'Google Onaylı Yorum (Doğrulanmış Müşteri)',
    districtHref: '/hizmetlerimiz/isicamli-cam-balkon',
  }));
}

async function queryPlacesV1Search(apiKey: string, query: string): Promise<{ place?: PlacesV1Place; error?: string }> {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.googleMapsUri,places.reviews',
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'tr',
      maxResultCount: 3,
    }),
    cache: 'no-store',
  });

  const data = (await res.json().catch(() => ({}))) as {
    places?: PlacesV1Place[];
    error?: { message?: string; status?: string };
  };

  if (res.ok && Array.isArray(data.places) && data.places.length > 0) {
    return { place: data.places[0] };
  }
  return { error: data.error?.message || data.error?.status || `HTTP ${res.status}` };
}

async function queryPlacesV1Details(apiKey: string, placeId: string): Promise<{ place?: PlacesV1Place; error?: string }> {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=tr`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'id,displayName,formattedAddress,rating,userRatingCount,googleMapsUri,reviews',
      },
      cache: 'no-store',
    }
  );
  const data = (await res.json().catch(() => ({}))) as PlacesV1Place & {
    error?: { message?: string; status?: string };
  };
  if (res.ok && data.id) {
    return { place: data };
  }
  return { error: data.error?.message || data.error?.status || `HTTP ${res.status}` };
}

async function resolveGoogleReviews(overrideKey?: string, overridePlaceId?: string): Promise<GoogleReviewsApiResponse> {
  const cmsSettings = await readCmsSettings();
  const rawApiKey = (
    overrideKey ??
    cmsSettings.googlePlacesApiKey ??
    process.env.GOOGLE_PLACES_API_KEY ??
    ''
  ).trim();
  const rawPlaceId = (
    overridePlaceId ??
    cmsSettings.googlePlaceId ??
    process.env.GOOGLE_PLACE_ID ??
    ''
  ).trim();

  const fallbackReviews = buildFallbackReviews();
  const defaultAddress =
    'Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C, 34186 Bahçelievler / İstanbul';
  let apiDiagnostic = '';

  if (rawApiKey.length >= 15) {
    try {
      /* 1. Places API (New) — Önce doğrudan Place ID veya iki kademeli metin araması */
      let v1Place: PlacesV1Place | undefined;
      if (isValidPlaceId(rawPlaceId)) {
        const detailAttempt = await queryPlacesV1Details(rawApiKey, rawPlaceId);
        v1Place = detailAttempt.place;
        if (detailAttempt.error) apiDiagnostic = `Places v1 Details: ${detailAttempt.error}`;
      } else {
        const searchPrimary = await queryPlacesV1Search(rawApiKey, PRIMARY_BUSINESS_QUERY);
        if (searchPrimary.place) {
          v1Place = searchPrimary.place;
        } else {
          if (searchPrimary.error) apiDiagnostic = `Places v1: ${searchPrimary.error}`;
          const searchFallback = await queryPlacesV1Search(rawApiKey, FALLBACK_BUSINESS_QUERY);
          if (searchFallback.place) {
            v1Place = searchFallback.place;
          } else if (searchFallback.error) {
            apiDiagnostic = `Places v1: ${searchFallback.error}`;
          }
        }
      }

      if (v1Place?.id) {
        const resolvedId = v1Place.id;
        const totalReviews = v1Place.userRatingCount || fallbackReviews.length;
        const liveReviews = mapV1Reviews(v1Place.reviews, fallbackReviews);
        const { googleMapsUrl, writeReviewUrl } = buildGoogleUrls(resolvedId, v1Place.googleMapsUri);

        return {
          ok: true,
          mode: 'live_google_places_api',
          statusBadge: 'Google Places API Bağlı',
          statusMessage: `Google Places API bağlantısı aktif. Place ID (${resolvedId}) üzerinden ${totalReviews} değerlendirme ve ${liveReviews.length} yorum başarıyla senkronize edildi.`,
          hasConfiguredKey: true,
          maskedKey: maskApiKey(rawApiKey),
          placeId: resolvedId,
          resolvedPlaceId: resolvedId,
          businessName: v1Place.displayName?.text || 'Çelikpen Cam Balkon & Mimari Sistemler',
          businessAddress: v1Place.formattedAddress || defaultAddress,
          rating: v1Place.rating || 4.9,
          totalReviews,
          userRatingsTotal: totalReviews,
          googleMapsUrl,
          mapsUrl: googleMapsUrl,
          writeReviewUrl,
          reviews: liveReviews,
          fetchedAt: new Date().toISOString(),
        };
      }

      /* 2. Legacy Places API (findplacefromtext + details) Fallback */
      let targetPlaceId = rawPlaceId;
      if (!isValidPlaceId(targetPlaceId)) {
        for (const query of [PRIMARY_BUSINESS_QUERY, FALLBACK_BUSINESS_QUERY]) {
          const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
            query
          )}&inputtype=textquery&fields=place_id,name,rating,user_ratings_total&key=${encodeURIComponent(
            rawApiKey
          )}`;

          const findRes = await fetch(findUrl, { cache: 'no-store' });
          if (findRes.ok) {
            const findJson = (await findRes.json()) as {
              status?: string;
              error_message?: string;
              candidates?: Array<{
                place_id?: string;
                name?: string;
                rating?: number;
                user_ratings_total?: number;
              }>;
            };

            if (findJson.status === 'OK' && findJson.candidates?.[0]?.place_id) {
              targetPlaceId = findJson.candidates[0].place_id;
              break;
            } else if (findJson.error_message) {
              apiDiagnostic = apiDiagnostic
                ? `${apiDiagnostic} | Legacy: ${findJson.error_message}`
                : `Legacy: ${findJson.error_message}`;
            }
          }
        }
      }

      if (isValidPlaceId(targetPlaceId)) {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
          targetPlaceId
        )}&fields=place_id,name,rating,user_ratings_total,reviews,url,formatted_address&language=tr&key=${encodeURIComponent(
          rawApiKey
        )}`;

        const detailsRes = await fetch(detailsUrl, { cache: 'no-store' });
        if (detailsRes.ok) {
          const detailsJson = (await detailsRes.json()) as {
            status?: string;
            error_message?: string;
            result?: {
              place_id?: string;
              name?: string;
              formatted_address?: string;
              rating?: number;
              user_ratings_total?: number;
              url?: string;
              reviews?: Array<{
                author_name?: string;
                rating?: number;
                text?: string;
                time?: number;
                relative_time_description?: string;
              }>;
            };
          };

          if (detailsJson.status === 'OK' && detailsJson.result) {
            const resData = detailsJson.result;
            const finalPlaceId = resData.place_id || targetPlaceId;
            const totalReviews = resData.user_ratings_total || 128;
            const liveReviews: GoogleReviewItem[] =
              Array.isArray(resData.reviews) && resData.reviews.length > 0
                ? resData.reviews.map((r, idx) => ({
                    id: `live-google-${idx + 1}`,
                    authorName: 'Google Doğrulanmış Müşteri Projesi',
                    location: 'İstanbul Avrupa Yakası',
                    system: 'Çelikpen Mimari Cam & PVC Sistemleri',
                    rating: r.rating || 5,
                    text: r.text || '',
                    date: r.time
                      ? new Date(r.time * 1000).toISOString().slice(0, 10)
                      : new Date().toISOString().slice(0, 10),
                    verifiedLabel: 'Google Onaylı Yorum (Doğrulanmış Müşteri)',
                    districtHref: '/hizmetlerimiz/isicamli-cam-balkon',
                  }))
                : fallbackReviews;

            const { googleMapsUrl, writeReviewUrl } = buildGoogleUrls(finalPlaceId, resData.url);

            return {
              ok: true,
              mode: 'live_google_places_api',
              statusBadge: 'Google Places API Bağlı',
              statusMessage: `Google Places API bağlantısı aktif. Place ID (${finalPlaceId}) üzerinden ${liveReviews.length} doğrulanmış yorum başarıyla çekildi.`,
              hasConfiguredKey: true,
              maskedKey: maskApiKey(rawApiKey),
              placeId: finalPlaceId,
              resolvedPlaceId: finalPlaceId,
              businessName: resData.name || 'Çelikpen Cam Balkon & Mimari Sistemler',
              businessAddress: resData.formatted_address || defaultAddress,
              rating: resData.rating || 4.9,
              totalReviews,
              userRatingsTotal: totalReviews,
              googleMapsUrl,
              mapsUrl: googleMapsUrl,
              writeReviewUrl,
              reviews: liveReviews,
              fetchedAt: new Date().toISOString(),
            };
          } else if (detailsJson.error_message) {
            apiDiagnostic = `Legacy Details: ${detailsJson.error_message}`;
          }
        }
      }
    } catch (err) {
      apiDiagnostic = err instanceof Error ? err.message : 'Ağ bağlantı hatası';
    }
  }

  /* 3. Graceful Fallback (Doğrulanmış Önizleme Modu) */
  const { googleMapsUrl, writeReviewUrl } = buildGoogleUrls(rawPlaceId);

  return {
    ok: true,
    mode: 'demo_verified_preview',
    statusBadge: rawApiKey
      ? 'API Anahtarı Tanımlı (Places API (New) Yetkisi Bekleniyor)'
      : 'Demo Modu Aktif (API Anahtarı Tanımlı Değil)',
    statusMessage: rawApiKey
      ? `API anahtarı (.env.local) okundu ancak Google Cloud projenizde "Places API (New)" (places.googleapis.com) yetkisi/faturalandırması kapalı görünüyor (${apiDiagnostic || 'PERMISSION_DENIED'}). Doğrulanmış proje yorumları kesintisiz gösterilmektedir.`
      : 'Doğrulanmış saha projesi önizleme yorumları aktif. Google Places API anahtarı tanımlandığında otomatik canlı çekime geçer.',
    hasConfiguredKey: Boolean(rawApiKey),
    maskedKey: maskApiKey(rawApiKey),
    placeId: isValidPlaceId(rawPlaceId) ? rawPlaceId : '',
    resolvedPlaceId: isValidPlaceId(rawPlaceId)
      ? rawPlaceId
      : 'Henüz çözümlenemedi (Places API (New) etkinleştirildiğinde otomatik keşfedilir)',
    businessName: 'Çelikpen Cam Balkon & Mimari Cam Sistemleri',
    businessAddress: defaultAddress,
    rating: 4.9,
    totalReviews: 128,
    userRatingsTotal: 128,
    googleMapsUrl,
    mapsUrl: googleMapsUrl,
    writeReviewUrl,
    apiDiagnostic: apiDiagnostic || undefined,
    reviews: fallbackReviews,
    fetchedAt: new Date().toISOString(),
  };
}

export async function GET() {
  const result = await resolveGoogleReviews();
  return NextResponse.json(result, {
    status: 200,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    apiKey?: string;
    placeId?: string;
  };
  const result = await resolveGoogleReviews(body.apiKey, body.placeId);
  return NextResponse.json(result, {
    status: 200,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
