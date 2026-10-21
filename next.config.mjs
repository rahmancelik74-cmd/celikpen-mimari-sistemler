import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // WAF'ın /wp-admin/ gibi sondaki eğik çizgili probları Next'in otomatik
  // 308'inden önce görebilmesi için yerleşik trailing-slash yönlendirmesi kapalı.
  // Normalizasyon middleware içinde güvenlik başlıklarıyla birlikte yapılır.
  skipTrailingSlashRedirect: true,
  // C:\Users\rahma\package-lock.json yüzünden yanlış kök algılanmasını engeller
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next/image optimizasyon sonuçları bir yıl boyunca değişmez kabul edilir.
    minimumCacheTTL: 31536000,
  },
  // Kamu görselleri, derlenmiş chunk'lar ve favicon tarayıcıda kalıcı önbelleğe alınır.
  async headers() {
    const immutable = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ];

    return [
      { source: '/images/:path*', headers: immutable },
      { source: '/_next/static/:path*', headers: immutable },
      { source: '/favicon.ico', headers: immutable },
      { source: '/icon.svg', headers: immutable },
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
      {
        source: '/urunler/winstor',
        destination: '/urunler/winstor-monoblok-panjur',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
