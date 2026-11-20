import crypto from 'node:crypto';

export const ADMIN_SESSION_COOKIE = 'celikpen_admin_session';
export const SESSION_TTL_SECONDS = 12 * 60 * 60; // 12 hours
export const SESSION_TTL_MS = SESSION_TTL_SECONDS * 1000;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 5;

interface RateLimitRecord {
  count: number;
  firstAttemptAt: number;
  lockedUntil: number;
}

const failedAttemptsByIp = new Map<string, RateLimitRecord>();

function getConfiguredAdminPassword(): string | null {
  const fromEnv = (process.env.ADMIN_PASSWORD || '').trim();
  if (fromEnv.length > 0) {
    return fromEnv;
  }
  if (process.env.NODE_ENV === 'development') {
    const devFallback = (process.env.ADMIN_DEV_FALLBACK || '').trim();
    if (devFallback.length > 0) return devFallback;
  }
  return null;
}

function getSigningSecret(): string {
  const explicitSecret = (process.env.ADMIN_SESSION_SECRET || '').trim();
  if (explicitSecret.length >= 16) return explicitSecret;
  const adminPw = getConfiguredAdminPassword() || 'unconfigured-production-secret';
  return crypto
    .createHash('sha256')
    .update(`celikpen-hmac-v2:${adminPw}`)
    .digest('hex');
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return '127.0.0.1';
}

export function checkAdminRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSeconds: number;
  remainingAttempts: number;
} {
  const now = Date.now();
  const record = failedAttemptsByIp.get(ip);

  if (!record) {
    return { allowed: true, retryAfterSeconds: 0, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  if (record.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((record.lockedUntil - now) / 1000),
      remainingAttempts: 0,
    };
  }

  if (now - record.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
    failedAttemptsByIp.delete(ip);
    return { allowed: true, retryAfterSeconds: 0, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_FAILED_ATTEMPTS - record.count);
  return {
    allowed: remaining > 0,
    retryAfterSeconds: remaining > 0 ? 0 : Math.ceil((record.firstAttemptAt + RATE_LIMIT_WINDOW_MS - now) / 1000),
    remainingAttempts: remaining,
  };
}

export function recordFailedAdminLogin(ip: string): {
  locked: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const existing = failedAttemptsByIp.get(ip);

  if (!existing || now - existing.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
    failedAttemptsByIp.set(ip, {
      count: 1,
      firstAttemptAt: now,
      lockedUntil: 0,
    });
    return { locked: false, retryAfterSeconds: 0 };
  }

  const nextCount = existing.count + 1;
  const lockedUntil = nextCount >= MAX_FAILED_ATTEMPTS ? now + RATE_LIMIT_WINDOW_MS : 0;

  failedAttemptsByIp.set(ip, {
    count: nextCount,
    firstAttemptAt: existing.firstAttemptAt,
    lockedUntil,
  });

  return {
    locked: lockedUntil > now,
    retryAfterSeconds: lockedUntil > now ? Math.ceil((lockedUntil - now) / 1000) : 0,
  };
}

export function clearFailedAdminLogins(ip: string): void {
  failedAttemptsByIp.delete(ip);
}

/**
 * Constant-time password comparison using SHA-256 digests and crypto.timingSafeEqual
 */
export function verifyAdminPassword(candidate: string | null | undefined): boolean {
  const configured = getConfiguredAdminPassword();
  if (!configured || !candidate) {
    return false;
  }
  const trimmedCandidate = candidate.trim();
  if (!trimmedCandidate) {
    return false;
  }

  const candidateDigest = crypto.createHash('sha256').update(trimmedCandidate, 'utf8').digest();
  const configuredDigest = crypto.createHash('sha256').update(configured, 'utf8').digest();

  return (
    candidateDigest.length === configuredDigest.length &&
    crypto.timingSafeEqual(candidateDigest, configuredDigest)
  );
}

export function createAdminSessionToken(): string {
  const now = Date.now();
  const payload = {
    iat: now,
    exp: now + SESSION_TTL_MS,
    nonce: crypto.randomBytes(16).toString('hex'),
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSigningSecret())
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${signature}`;
}

export function verifyAdminSessionToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return false;
  }
  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) {
    return false;
  }

  const expectedSig = crypto
    .createHmac('sha256', getSigningSecret())
    .update(payloadB64)
    .digest('base64url');

  const sigDigest = crypto.createHash('sha256').update(signature, 'utf8').digest();
  const expectedDigest = crypto.createHash('sha256').update(expectedSig, 'utf8').digest();

  if (!crypto.timingSafeEqual(sigDigest, expectedDigest)) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as {
      exp?: number;
    };
    if (typeof parsed.exp !== 'number' || parsed.exp <= Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function extractSessionCookie(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie') || '';
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [rawName, ...rest] = part.trim().split('=');
    if (rawName === ADMIN_SESSION_COOKIE) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

export function verifyAdminRequest(
  request: Request,
  fallbackPassword?: string | null
): boolean {
  const cookieToken = extractSessionCookie(request);
  if (cookieToken && verifyAdminSessionToken(cookieToken)) {
    return true;
  }

  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.slice(7).trim();
    if (verifyAdminSessionToken(bearerToken) || verifyAdminPassword(bearerToken)) {
      return true;
    }
  }

  if (fallbackPassword && verifyAdminPassword(fallbackPassword)) {
    return true;
  }

  return false;
}

export function buildAdminSessionCookieHeader(token: string): string {
  return `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function buildAdminLogoutCookieHeader(): string {
  return `${ADMIN_SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}
