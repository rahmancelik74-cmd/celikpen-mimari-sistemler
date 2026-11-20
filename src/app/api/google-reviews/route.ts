import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { DEFAULT_CMS_DATA, normalizeCmsData, type CmsStoreData } from '../../../lib/cms';
import { readCmsFromBlob } from '../../../lib/blob-storage';
import { verifyAdminRequest } from '../../../lib/admin-auth';
import {
  EXACT_BUSINESS_NAME,
  EXACT_BUSINESS_PLACE_ID,
  EXACT_COORDINATES,
  EXACT_EMBED_MAP_URL,
  EXACT_GOOGLE_MAPS_URL,
  getExactWriteReviewUrl,
  isValidGooglePlaceId,
} from '../../../lib/google-business';

export const dynamic = 'force-dynamic';

const CMS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-store.json');
const EXACT_LAT = EXACT_COORDINATES.latitude;
const EXACT_LNG = EXACT_COORDINATES.longitude;
const DEFAULT_GOOGLE_PLACE_ID = EXACT_BUSINESS_PLACE_ID;
const PRIMARY_BUSINESS_QUERY = process.env.GOOGLE_BUSINESS_QUERY || EXACT_BUSINESS_NAME;
const FALLBACK_BUSINESS_QUERY = 'Kızılelma Cad. No: 30/C Bahçelievler İstanbul';
const REVIEWS_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

let cachedReviews: { data: GoogleReviewsApiResponse; expiresAt: number } | null = null;

export interface GoogleReviewItem {
  id: string;
  authorName: string;
  profilePhotoUrl?: string;
  relativeTime?: string;
  rating: number;
  text: string;
  date: string;
}

export interface GoogleReviewsApiResponse {
  ok: boolean;
  mode: 'live_google_places_api' | 'awaiting_google_api';
  statusBadge: string;
  statusMessage: string;
  hasConfiguredKey: boolean;
  maskedKey: string;
  placeId: string;
  resolvedPlaceId: string;
  businessName: string;
  businessAddress: string;
  coordinates: { latitude: number; longitude: number };
  rating: number;
  totalReviews: number;
  userRatingsTotal: number;
  googleMapsUrl: string;
  mapsUrl: string;
  writeReviewUrl: string;
  embedMapUrl: string;
  apiDiagnostic?: string;
  reviews: GoogleReviewItem[];
  fetchedAt: string;
}

interface PlacesV1Review {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  publishTime?: string;
  authorAttribution?: { displayName?: string; photoUri?: string };
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
  if (!key || key.length < 10) return 'Tanımlı Değil';
  return `${key.slice(0, 6)}••••••••••••••••••••${key.slice(-4)}`;
}

function buildGoogleUrls(placeId: string, apiMapsUri?: string) {
  return {
    googleMapsUrl: apiMapsUri || EXACT_GOOGLE_MAPS_URL,
    writeReviewUrl: getExactWriteReviewUrl(placeId),
    embedMapUrl: EXACT_EMBED_MAP_URL,
  };
}

function mapV1Reviews(reviews: PlacesV1Review[] | undefined): GoogleReviewItem[] {
  if (!Array.isArray(reviews) || reviews.length === 0) return [];
  return reviews
    .filter((r) => Boolean(r.text?.text || r.originalText?.text || r.authorAttribution?.displayName))
    .map((r, idx) => ({
      id: `live-google-${idx + 1}`,
      authorName: r.authorAttribution?.displayName || 'Google Kullanıcısı',
      profilePhotoUrl: r.authorAttribution?.photoUri,
      relativeTime: r.relativePublishTimeDescription,
      rating: typeof r.rating === 'number' && r.rating > 0 ? r.rating : 5,
      text: (r.text?.text || r.originalText?.text || '').trim(),
      date: r.publishTime ? r.publishTime.slice(0, 10) : new Date().toISOString().slice(0, 10),
    }));
}

async function queryPlacesV1Search(
  apiKey: string,
  query: string
): Promise<{ place?: PlacesV1Place; error?: string }> {
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
      locationBias: {
        circle: {
          center: { latitude: EXACT_LAT, longitude: EXACT_LNG },
          radius: 100.0,
        },
      },
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

async function queryPlacesV1Details(
  apiKey: string,
  placeId: string
): Promise<{ place?: PlacesV1Place; error?: string }> {
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

async function resolveGoogleReviews(
  overrideKey?: string,
  overridePlaceId?: string
): Promise<GoogleReviewsApiResponse> {
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
    DEFAULT_GOOGLE_PLACE_ID ??
    ''
  ).trim();

  const defaultAddress =
    'Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C, 34186 Bahçelievler / İstanbul';
  let apiDiagnostic = '';

  if (rawApiKey.length >= 15) {
    try {
      /* 1. Places API (New) — Doğrudan Place ID veya 41.0225161, 28.8353366 locationBias araması */
      let v1Place: PlacesV1Place | undefined;
      if (isValidGooglePlaceId(rawPlaceId)) {
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
        const liveReviews = mapV1Reviews(v1Place.reviews);
        const totalReviews = v1Place.userRatingCount ?? liveReviews.length;
        const rating = typeof v1Place.rating === 'number' ? v1Place.rating : 0;
        const { googleMapsUrl, writeReviewUrl, embedMapUrl } = buildGoogleUrls(
          resolvedId,
          v1Place.googleMapsUri
        );

        return {
          ok: true,
          mode: 'live_google_places_api',
          statusBadge: 'Google Places API Bağlı',
          statusMessage: `Google Places API bağlantısı aktif. Place ID (${resolvedId}) üzerinden ${totalReviews} değerlendirme ve ${liveReviews.length} gerçek yorum çekildi.`,
          hasConfiguredKey: true,
          maskedKey: maskApiKey(rawApiKey),
          placeId: resolvedId,
          resolvedPlaceId: resolvedId,
          businessName: v1Place.displayName?.text || EXACT_BUSINESS_NAME,
          businessAddress: v1Place.formattedAddress || defaultAddress,
          coordinates: { latitude: EXACT_LAT, longitude: EXACT_LNG },
          rating,
          totalReviews,
          userRatingsTotal: totalReviews,
          googleMapsUrl,
          mapsUrl: googleMapsUrl,
          writeReviewUrl,
          embedMapUrl,
          reviews: liveReviews,
          fetchedAt: new Date().toISOString(),
        };
      }

      /* 2. Legacy Places API (nearbysearch + details) Fallback */
      let targetPlaceId = rawPlaceId;
      if (!isValidGooglePlaceId(targetPlaceId)) {
        const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${EXACT_LAT},${EXACT_LNG}&radius=80&keyword=${encodeURIComponent(
          'Pimapen Cam Balkon'
        )}&language=tr&key=${encodeURIComponent(rawApiKey)}`;

        const nearbyRes = await fetch(nearbyUrl, { cache: 'no-store' });
        if (nearbyRes.ok) {
          const nearbyJson = (await nearbyRes.json()) as {
            status?: string;
            error_message?: string;
            results?: Array<{ place_id?: string; name?: string }>;
          };
          if (nearbyJson.status === 'OK' && nearbyJson.results?.[0]?.place_id) {
            targetPlaceId = nearbyJson.results[0].place_id;
          } else if (nearbyJson.error_message) {
            apiDiagnostic = apiDiagnostic
              ? `${apiDiagnostic} | Legacy Nearby: ${nearbyJson.error_message}`
              : `Legacy Nearby: ${nearbyJson.error_message}`;
          }
        }
      }

      if (isValidGooglePlaceId(targetPlaceId)) {
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
                profile_photo_url?: string;
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
            const liveReviews: GoogleReviewItem[] = Array.isArray(resData.reviews)
              ? resData.reviews
                  .filter((r) => Boolean(r.text || r.author_name))
                  .map((r, idx) => ({
                    id: `live-google-${idx + 1}`,
                    authorName: r.author_name || 'Google Kullanıcısı',
                    profilePhotoUrl: r.profile_photo_url,
                    relativeTime: r.relative_time_description,
                    rating: typeof r.rating === 'number' && r.rating > 0 ? r.rating : 5,
                    text: (r.text || '').trim(),
                    date: r.time
                      ? new Date(r.time * 1000).toISOString().slice(0, 10)
                      : new Date().toISOString().slice(0, 10),
                  }))
              : [];
            const totalReviews = resData.user_ratings_total ?? liveReviews.length;
            const rating = typeof resData.rating === 'number' ? resData.rating : 0;

            const { googleMapsUrl, writeReviewUrl, embedMapUrl } = buildGoogleUrls(
              finalPlaceId,
              resData.url
            );

            return {
              ok: true,
              mode: 'live_google_places_api',
              statusBadge: 'Google Places API Bağlı',
              statusMessage: `Google Places API bağlantısı aktif. Place ID (${finalPlaceId}) üzerinden ${liveReviews.length} gerçek yorum çekildi.`,
              hasConfiguredKey: true,
              maskedKey: maskApiKey(rawApiKey),
              placeId: finalPlaceId,
              resolvedPlaceId: finalPlaceId,
              businessName: resData.name || EXACT_BUSINESS_NAME,
              businessAddress: resData.formatted_address || defaultAddress,
              coordinates: { latitude: EXACT_LAT, longitude: EXACT_LNG },
              rating,
              totalReviews,
              userRatingsTotal: totalReviews,
              googleMapsUrl,
              mapsUrl: googleMapsUrl,
              writeReviewUrl,
              embedMapUrl,
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

  /* 3. Sahte/Örnek Yorum Yok — Yalnızca Google API Yetkisi Beklenirken Boş Liste Döner */
  const { googleMapsUrl, writeReviewUrl, embedMapUrl } = buildGoogleUrls(rawPlaceId);

  return {
    ok: true,
    mode: 'awaiting_google_api',
    statusBadge: rawApiKey
      ? 'Google Places API Yetkisi Bekleniyor'
      : 'Google Places API Anahtarı Tanımlı Değil',
    statusMessage: rawApiKey
      ? `API anahtarı (.env.local) tanımlı ancak Google Cloud projenizden canlı yorum çekimi henüz açılmamış (${apiDiagnostic || 'PERMISSION_DENIED'}). Sahte yorum gösterilmemektedir.`
      : 'Google Places API anahtarı tanımlandığında gerçek işletme yorumları burada otomatik listelenir.',
    hasConfiguredKey: Boolean(rawApiKey),
    maskedKey: maskApiKey(rawApiKey),
    placeId: isValidGooglePlaceId(rawPlaceId) ? rawPlaceId : '',
    resolvedPlaceId: isValidGooglePlaceId(rawPlaceId)
      ? rawPlaceId
      : 'Places API yetkisi açıldığında ChIJ Place ID otomatik çözümlenir',
    businessName: EXACT_BUSINESS_NAME,
    businessAddress: defaultAddress,
    coordinates: { latitude: EXACT_LAT, longitude: EXACT_LNG },
    rating: 0,
    totalReviews: 0,
    userRatingsTotal: 0,
    googleMapsUrl,
    mapsUrl: googleMapsUrl,
    writeReviewUrl,
    embedMapUrl,
    apiDiagnostic: apiDiagnostic || undefined,
    reviews: [],
    fetchedAt: new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const wantsRefresh = url.searchParams.get('refresh') === '1';

  if (wantsRefresh && !verifyAdminRequest(request)) {
    if (cachedReviews && cachedReviews.expiresAt > Date.now()) {
      return NextResponse.json(cachedReviews.data, {
        status: 200,
        headers: { 'Cache-Control': 'public, max-age=300' },
      });
    }
    return NextResponse.json(
      { ok: false, error: 'Önbellek yenileme (?refresh=1) yalnızca yönetici oturumuna açıktır.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (!wantsRefresh && cachedReviews && cachedReviews.expiresAt > Date.now()) {
    return NextResponse.json(cachedReviews.data, {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  }

  const result = await resolveGoogleReviews();
  cachedReviews = {
    data: result,
    expiresAt: Date.now() + REVIEWS_CACHE_TTL_MS,
  };

  return NextResponse.json(result, {
    status: 200,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}

export async function POST(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { ok: false, error: 'Yetkisiz erişim. Yönetici oturumu gerekli.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    apiKey?: string;
    placeId?: string;
  };
  const result = await resolveGoogleReviews(body.apiKey, body.placeId);
  cachedReviews = {
    data: result,
    expiresAt: Date.now() + REVIEWS_CACHE_TTL_MS,
  };

  return NextResponse.json(result, {
    status: 200,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
