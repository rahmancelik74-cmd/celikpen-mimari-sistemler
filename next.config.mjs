import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      config.output.filename = 'static/chunks/[name].js?v=20261026';
      config.output.chunkFilename = 'static/chunks/[name].js?v=20261026';
    }
    return config;
  },
  // WAF'ın /wp-admin/ gibi sondaki eğik çizgili probları Next'in otomatik
  // 308'inden önce görebilmesi için yerleşik trailing-slash yönlendirmesi kapalı.
  // Normalizasyon middleware içinde güvenlik başlıklarıyla birlikte yapılır.
  skipTrailingSlashRedirect: true,
  // C:\Users\rahma\package-lock.json yüzünden yanlış kök algılanmasını engeller
  outputFileTracingRoot: projectRoot,
  // Arka plandaki `next dev` (.next) ile `next build` çakışmasını önler
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: process.env.NODE_ENV === 'production' ? 3600 : 0,
  },
  // Kamu görselleri, derlenmiş chunk'lar ve favicon önbellek yönetimi.
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      const noStore = [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      ];
      return [
        { source: '/:path*', headers: noStore },
        { source: '/images/:path*', headers: noStore },
        { source: '/_next/static/:path*', headers: noStore },
      ];
    }

    const immutable = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ];
    const revalidateImages = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600, must-revalidate',
      },
    ];

    return [
      { source: '/images/:path*', headers: revalidateImages },
      { source: '/_next/static/:path*', headers: immutable },
      { source: '/favicon.ico', headers: revalidateImages },
      { source: '/icon.svg', headers: revalidateImages },
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
      // 35. yıl kurumsal yapılandırmasında birleştirilen eski alt sayfalar.
      {
        source: '/kurumsal/vizyon-misyon',
        destination: '/kurumsal/hakkimizda#kurumsal-tarihce',
        permanent: true,
      },
      {
        source: '/kurumsal/neden-winsa',
        destination: '/kurumsal/kalite-politikamiz',
        permanent: true,
      },
      {
        source: '/kurumsal/ar-ge',
        destination: '/kurumsal/uretim-teknolojimiz',
        permanent: true,
      },
      {
        source: '/kurumsal/cevre-dostu-pencere',
        destination: '/kurumsal/surdurulebilirlik',
        permanent: true,
      },
      {
        source: '/kurumsal/kampanyalar',
        destination: '/kurumsal',
        permanent: true,
      },
      {
        source: '/kurumsal/basinda-winsa',
        destination: '/kurumsal/basinda-celikpen',
        permanent: true,
      },
      {
        source: '/kurumsal/fuarlar-etkinlikleri',
        destination: '/kurumsal/fuarlar-etkinlikler',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
