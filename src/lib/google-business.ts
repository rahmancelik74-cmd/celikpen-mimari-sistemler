export const EXACT_BUSINESS_NAME =
  'Pimapen tamircisi, Cam Balkon, Alüminyum doğrama ve Sineklik';

export const EXACT_COORDINATES = {
  latitude: 41.0225161,
  longitude: 28.8353366,
} as const;

export const EXACT_BUSINESS_PLACE_ID =
  (typeof process !== 'undefined' && process.env?.GOOGLE_PLACE_ID?.trim()) || '';

export const EXACT_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Pimapen+tamircisi,+Cam+Balkon,+Al%C3%BCminyum+do%C4%9Frama+ve+Sineklik/@41.0225161,28.8353366,19z/data=!3m1!4b1!4m6!3m5!1s0x14caa4e835eefa23:0xa7492c8743470278!8m2!3d41.0225161!4d28.8353366!16s%2Fg%2F11hckdph8v';

export const EXACT_EMBED_MAP_URL = `https://maps.google.com/maps?q=${EXACT_COORDINATES.latitude},${EXACT_COORDINATES.longitude}&hl=tr&z=18&output=embed`;

export function isValidGooglePlaceId(placeId?: string | null): boolean {
  const cleaned = (placeId || '').trim();
  return Boolean(cleaned) && !cleaned.includes(' ') && cleaned.length >= 12;
}

export function getExactWriteReviewUrl(placeId?: string | null): string {
  const resolved = (placeId || EXACT_BUSINESS_PLACE_ID).trim();
  if (isValidGooglePlaceId(resolved)) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(resolved)}`;
  }
  return EXACT_GOOGLE_MAPS_URL;
}

export const EXACT_WRITE_REVIEW_URL = getExactWriteReviewUrl();
