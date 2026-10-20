import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // C:\Users\rahma\package-lock.json yüzünden yanlış kök algılanmasını engeller
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  // Eski ürün bağlantılarını güncel WINSA katalog slug'larına kalıcı olarak yönlendirir.
  async redirects() {
    return [
      {
        source: '/urunler/vbs-isicamli-cam-balkon',
        destination: '/urunler/vera-isicamli-cam-balkon',
        permanent: true,
      },
      {
        source: '/urunler/vns-katlanir-cam-balkon',
        destination: '/urunler/vera-katlanir-cam-balkon',
        permanent: true,
      },
      {
        source: '/urunler/giyotin-motorlu-cam-balkon',
        destination: '/urunler/giyotin-motorlu-silinebilir-cam',
        permanent: true,
      },
      {
        source: '/urunler/bioklimatik-kis-bahcesi',
        destination: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
        permanent: true,
      },
      {
        source: '/urunler/panorama-esiksiz-surme',
        destination: '/urunler/panorama-esiksiz-surme-cam-balkon',
        permanent: true,
      },
      {
        source: '/urunler/lotus',
        destination: '/urunler/lotus-paralel-surme',
        permanent: true,
      },
      {
        source: '/urunler/winsa-renk-dunyasi',
        destination: '/urunler/antrasit-ve-metalik-dis-cephe-renkleri',
        permanent: true,
      },
      {
        source: '/urunler/distan-takma-panjur',
        destination: '/urunler/motorlu-aluminyum-poliuretanli-panjur',
        permanent: true,
      },
      {
        source: '/urunler/dorado-76-surme',
        destination: '/urunler?kategori=surme-sistemler',
        permanent: false,
      },
      {
        source: '/urunler/safir-surme',
        destination: '/urunler?kategori=surme-sistemler',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
