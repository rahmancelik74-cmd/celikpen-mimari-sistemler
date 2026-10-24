import { createServer } from 'node:http';
import next from 'next';

/**
 * Next.js üretim sunucusu için ince güvenlik sarmalayıcısı.
 *
 * Fetch standardı TRACE ve TRACK metotlarını Request nesnesinde desteklemediği
 * için Next'in kendi sunucusu bu istekleri middleware'e ulaşmadan 500 ile
 * kapatıyor. Bu sarmalayıcı, isteği Next'e aktarmadan önce 405 + Allow ve
 * güvenlik başlıklarıyla yanıtlar. Diğer tüm metotlar middleware'deki beyaz
 * listeye ve WAF katmanına tabidir.
 */
const dev = process.env.NODE_ENV === 'development';
// Windows'ta localhost önce ::1'e çözümlenir. Çift yığın dinleme, IPv6/IPv4
// arasındaki 200 ms'lik bağlantı fallback gecikmesini ortadan kaldırır.
const hostname = process.env.HOSTNAME || '::';
const port = Number.parseInt(process.env.PORT || '3000', 10);

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Permissions-Policy':
    'accelerometer=(), camera=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; media-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me; frame-ancestors 'self'",
  'X-DNS-Prefetch-Control': 'on',
  Link: '</icon.svg?v=30>; rel=icon, </manifest.webmanifest>; rel=manifest',
};

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const server = createServer((request, response) => {
  if (request.method === 'TRACE' || request.method === 'TRACK') {
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      response.setHeader(key, value);
    }
    response.statusCode = 405;
    response.setHeader('Allow', 'GET, HEAD, OPTIONS, POST');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.end('Method Not Allowed');
    return;
  }

  handle(request, response);
});

server.on('error', (error) => {
  console.error(`> Çelikpen server error: ${error.message}`);
  process.exit(1);
});

// Node'un HTTP parser'ı TRACK metodunu geçersiz sayıp 400 üretebiliyor.
// Ham paketi inceleyip TRACK/TRACE için standart 405 yanıtı döndürüyoruz.
server.on('clientError', (error, socket) => {
  const rawPacket = error.rawPacket?.toString('utf8', 0, 48) || '';
  const isTraceLike = /^(?:TRACK|TRACE)\s/i.test(rawPacket);

  if (!isTraceLike) {
    socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n');
    return;
  }

  const securityHeaderLines = Object.entries(SECURITY_HEADERS)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\r\n');

  socket.end(
    [
      'HTTP/1.1 405 Method Not Allowed',
      securityHeaderLines,
      'Allow: GET, HEAD, OPTIONS, POST',
      'Cache-Control: no-store',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Length: 18',
      'Connection: close',
      '',
      'Method Not Allowed',
    ].join('\r\n')
  );
});

await app.prepare();

server.listen(port, hostname, () => {
  console.log(
    `> Çelikpen production server ready on http://${hostname}:${port} (${dev ? 'development' : 'production'})`
  );
});
