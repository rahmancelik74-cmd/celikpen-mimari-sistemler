import { NextResponse } from 'next/server';
import {
  buildAdminLogoutCookieHeader,
  buildAdminSessionCookieHeader,
  checkAdminRateLimit,
  clearFailedAdminLogins,
  createAdminSessionToken,
  getClientIp,
  recordFailedAdminLogin,
  verifyAdminPassword,
  verifyAdminRequest,
} from '../../../../lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authenticated = verifyAdminRequest(request);
  if (!authenticated) {
    return NextResponse.json(
      { ok: false, authenticated: false, error: 'Oturum doğrulanamadı.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }
  return NextResponse.json(
    { ok: true, authenticated: true },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateStatus = checkAdminRateLimit(ip);

  if (!rateStatus.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Çok fazla başarısız giriş denemesi. Lütfen ${Math.ceil(rateStatus.retryAfterSeconds / 60)} dakika sonra tekrar deneyin.`,
      },
      {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(rateStatus.retryAfterSeconds),
        },
      }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const providedPassword = (body.password || '').trim();

  if (!verifyAdminPassword(providedPassword)) {
    const failStatus = recordFailedAdminLogin(ip);
    if (failStatus.locked) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Maksimum giriş denemesi aşıldı (15 dakika IP kilidi aktif).',
        },
        {
          status: 429,
          headers: {
            'Cache-Control': 'no-store',
            'Retry-After': String(failStatus.retryAfterSeconds),
          },
        }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: 'Yönetici şifresi hatalı. Lütfen şifrenizi kontrol edin.',
      },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  clearFailedAdminLogins(ip);
  const sessionToken = createAdminSessionToken();

  return NextResponse.json(
    {
      ok: true,
      authenticated: true,
      message: 'Yönetici oturumu başarıyla başlatıldı.',
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Set-Cookie': buildAdminSessionCookieHeader(sessionToken),
      },
    }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { ok: true, authenticated: false, message: 'Oturum güvenli şekilde sonlandırıldı.' },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Set-Cookie': buildAdminLogoutCookieHeader(),
      },
    }
  );
}
