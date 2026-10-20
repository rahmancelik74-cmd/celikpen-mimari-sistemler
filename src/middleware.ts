import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'POST']);

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://i.ytimg.com https://images.unsplash.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "connect-src 'self' https://wa.me https://api.whatsapp.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join('; ');

export function middleware(request: NextRequest) {
  // 0. Bot & Anomali Metod Koruması (TRACE, TRACK, DELETE, PUT vb. reddi)
  if (!ALLOWED_METHODS.has(request.method.toUpperCase())) {
    return new NextResponse('Method Not Allowed', {
      status: 405,
      headers: {
        Allow: 'GET, HEAD, OPTIONS, POST',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  const { pathname, search } = request.nextUrl;
  const host = request.headers.get('host') || 'celikpen.com.tr';
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isLocalhost =
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.startsWith('192.168.');

  // 1. Üretim ortamında HTTP -> HTTPS 308 Kalıcı Yönlendirme
  if (
    process.env.NODE_ENV === 'production' &&
    !isLocalhost &&
    forwardedProto &&
    forwardedProto !== 'https'
  ) {
    const httpsUrl = new URL(`https://${host}${pathname}${search}`);
    return NextResponse.redirect(httpsUrl, 308);
  }

  const response = NextResponse.next();

  // 2. Kurumsal SSL / TLS ve Güvenlik Başlıkları (Winsa Enterprise Standardı)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), payment=(), interest-cohort=()'
  );
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Content-Security-Policy', CSP_DIRECTIVES);

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};
