import { NextRequest, NextResponse } from 'next/server';

/* ============================================================================
   ÇELİKPEN — KURUMSAL WAF & GÜVENLİK KATMANI
   - HTTP metot beyaz listesi
   - SQLi / XSS / path traversal / hassas dosya probu engeli
   - A+ seviye güvenlik yanıt başlıkları
   - Üretimde HTTP -> HTTPS 308 yönlendirmesi
   ========================================================================== */

const ALLOWED_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'POST']);

const WAF_PATTERNS: RegExp[] = [
  /* SQL Injection */
  /\bunion\b[\s+]+(?:all\b[\s+]+)?select\b/i,
  /(?:'|%27|")\s*(?:or|and)\s+(?:'|%27|")?\d+\s*=\s*\d+/i,
  /\b(?:or|and)\b\s+1\s*=\s*1\b/i,
  /\b(?:sleep|benchmark|pg_sleep)\s*\(/i,
  /\binformation_schema\b/i,
  /\bxp_cmdshell\b/i,
  /\b(?:drop|truncate)\s+(?:table|database)\b/i,
  /* Cross-Site Scripting */
  /<script\b/i,
  /javascript\s*:/i,
  /\bon(?:error|load|click|mouseover|focus|submit)\s*=/i,
  /<\s*(?:iframe|object|embed|svg)\b[^>]*(?:src|data|on\w+)\s*=/i,
  /\bdocument\.(?:cookie|domain|write)\b/i,
  /* Directory traversal & null byte */
  /(?:\.\.\/|\.\.\\|%2e%2e(?:%2f|%5c|\/|\\))/i,
  /(?:\/|%2f|%5c)%00/i,
  /* Hassas dosya / yönetim paneli probları */
  /(?:^|[/\\])\.env(?:[/\\.]|$)/i,
  /(?:^|[/\\])\.git(?:[/\\.]|$)/i,
  /(?:^|[/\\])\.(?:aws|ssh|svn|hg)(?:[/\\]|$)/i,
  /\b(?:wp-admin|wp-login|xmlrpc\.php|phpmyadmin|adminer|config\.php|etc\/passwd)\b/i,
  /\.(?:sql|bak|old|backup)(?:$|[?#])/i,
  /\/vendor\/phpunit\b/i,
  /(?:^|[/\\])\.DS_Store$/i,
];

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https:",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
  "frame-ancestors 'self'",
].join('; ');

const SECURITY_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'],
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'SAMEORIGIN'],
  ['X-XSS-Protection', '1; mode=block'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Cross-Origin-Opener-Policy', 'same-origin'],
  ['Cross-Origin-Resource-Policy', 'same-origin'],
  ['X-Permitted-Cross-Domain-Policies', 'none'],
  [
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()',
  ],
  ['Content-Security-Policy', CSP_DIRECTIVES],
  ['X-DNS-Prefetch-Control', 'on'],
];

function isLocalhostHost(host: string): boolean {
  const normalized = host.toLowerCase();
  return (
    normalized.startsWith('localhost') ||
    normalized.startsWith('127.0.0.1') ||
    normalized.startsWith('192.168.') ||
    normalized.startsWith('[::1]')
  );
}

function applySecurityHeaders(
  response: NextResponse,
  upgradeInsecureRequests = false
): NextResponse {
  for (const [key, value] of SECURITY_HEADERS) {
    response.headers.set(
      key,
      key === 'Content-Security-Policy' && upgradeInsecureRequests
        ? `${value}; upgrade-insecure-requests`
        : value
    );
  }
  // Next'in otomatik font/asset preload Link başlığını ezmemek için append kullanılır.
  response.headers.append(
    'Link',
    '</icon.svg?v=35>; rel=icon, </manifest.webmanifest>; rel=manifest'
  );
  return response;
}

function safeDecode(value: string): string {
  let decoded = value;
  for (let i = 0; i < 2; i += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return decoded;
}

function hasMaliciousPayload(request: NextRequest): boolean {
  const { pathname, search } = request.nextUrl;
  const rawTarget = `${pathname}${search}`;
  const decodedTarget = safeDecode(rawTarget);
  const target = `${rawTarget}\n${decodedTarget}`;

  return WAF_PATTERNS.some((pattern) => pattern.test(target));
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || 'celikpen.com.tr';
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isLocalhost = isLocalhostHost(host);
  const isHttpRequest = forwardedProto
    ? forwardedProto !== 'https'
    : request.nextUrl.protocol === 'http:';
  // HTTP localhost geliştirmesinde alt kaynakları HTTPS'e yükseltmeyiz.
  const shouldUpgradeInsecureRequests =
    process.env.NODE_ENV === 'production' && !isLocalhost && !isHttpRequest;

  /* 1. HTTP metot beyaz listesi */
  if (!ALLOWED_METHODS.has(request.method.toUpperCase())) {
    return applySecurityHeaders(
      new NextResponse('Method Not Allowed', {
        status: 405,
        headers: {
          Allow: 'GET, HEAD, OPTIONS, POST',
          'Cache-Control': 'no-store',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      }),
      shouldUpgradeInsecureRequests
    );
  }

  /* 2. WAF / zararlı istek kalkanı */
  if (hasMaliciousPayload(request)) {
    return applySecurityHeaders(
      new NextResponse('Forbidden', {
        status: 403,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      }),
      shouldUpgradeInsecureRequests
    );
  }

  /* 3. CORS ön kontrol istekleri: sayfa yönlendirmesine girmeden 204 dön */
  if (request.method === 'OPTIONS') {
    return applySecurityHeaders(
      new NextResponse(null, {
        status: 204,
        headers: {
          Allow: 'GET, HEAD, OPTIONS, POST',
          'Cache-Control': 'no-store',
        },
      }),
      shouldUpgradeInsecureRequests
    );
  }

  const { pathname, search } = request.nextUrl;

  /* 4. Sondaki eğik çizgi normalizasyonu (WAF kontrolünden sonra) */
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const normalizedUrl = request.nextUrl.clone();
    normalizedUrl.pathname = pathname.replace(/\/+$/, '') || '/';
    return applySecurityHeaders(
      NextResponse.redirect(normalizedUrl, 308),
      shouldUpgradeInsecureRequests
    );
  }

  /* 5. Üretimde HTTP -> HTTPS 308 kalıcı yönlendirme (localhost hariç) */
  if (process.env.NODE_ENV === 'production' && !isLocalhost && isHttpRequest) {
    const httpsUrl = new URL(`https://${host}${pathname}${search}`);
    return applySecurityHeaders(NextResponse.redirect(httpsUrl, 308));
  }

  /* 6. Güvenlik başlıkları */
  const response = NextResponse.next();
  return applySecurityHeaders(response, shouldUpgradeInsecureRequests);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};
