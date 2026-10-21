'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* ============================================================================
   ÇELİKPEN — ANLIK ROTA PREFETCH MOTORU
   - Boşta kalan tarayıcıda ana rota ve ürün gövdelerini ısıtır.
   - Herhangi bir iç bağlantıya mouseover / touchstart / focus anında
     router.prefetch() çağırır; tıklama tamamlanmadan RSC önbelleği hazır olur.
   ========================================================================== */

const PRIMARY_ROUTES = [
  '/',
  '/urunler',
  '/profesyoneller',
  '/profesyoneller/referanslar',
  '/profesyoneller/blog',
  '/profesyoneller/kataloglar',
  '/kurumsal',
  '/kurumsal/hakkimizda',
  '/satis-noktalari',
  '/iletisim',
];

const SERVICE_ROUTES = [
  '/urunler?kategori=cam-balkon-sistemleri',
  '/urunler/giyotin-motorlu-silinebilir-cam',
  '/urunler/bioklimatik-kis-bahcesi-sistemleri',
  '/urunler?kategori=surme-sistemler',
  '/urunler?kategori=pencere-ve-kapi-sistemleri',
  '/urunler/paslanmaz-rulman-ve-kedi-sinekligi-sistemleri',
];

const PRODUCT_ROUTES = [
  '/urunler/vera-isicamli-cam-balkon',
  '/urunler/vera-katlanir-cam-balkon',
  '/urunler/giyotin-motorlu-cam-balkon',
  '/urunler/giyotin-motorlu-silinebilir-cam',
  '/urunler/bioklimatik-kis-bahcesi',
  '/urunler/bioklimatik-kis-bahcesi-sistemleri',
  '/urunler/panorama-hs-76',
  '/urunler/comfort-slide-plus',
  '/urunler/revotech-gold',
  '/urunler/dorado-76',
  '/urunler/winstor-monoblok-panjur',
];

const SECONDARY_ROUTES = [
  '/galeri',
  '/blog',
  '/fiyat-hesapla',
  '/yorumlar',
  '/karsilastir',
];

const PREFETCH_ROUTES = Array.from(
  new Set([...PRIMARY_ROUTES, ...SERVICE_ROUTES, ...PRODUCT_ROUTES, ...SECONDARY_ROUTES])
);

const FALLBACK_DELAY_MS = 800;
const IDLE_TIMEOUT_MS = 1800;

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout?: number }
  ) => number;
  cancelIdleCallback?: (id: number) => void;
};

type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
};

function getInternalPath(href: string): string | null {
  if (!href || href.startsWith('#') || href.startsWith('//') || !href.startsWith('/')) {
    return null;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin || !url.pathname.startsWith('/')) {
      return null;
    }
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

export function InstantPrefetcher() {
  const router = useRouter();

  useEffect(() => {
    const prefetched = new Set<string>();
    const currentPath = `${window.location.pathname}${window.location.search}`;
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike })
      .connection;
    const idleWindow = window as IdleWindow;

    const prefetch = (href: string) => {
      const path = getInternalPath(href);
      if (!path || path === currentPath || prefetched.has(path)) return;

      prefetched.add(path);
      try {
        router.prefetch(path);
      } catch {
        // Prefetch başarısız olsa da normal gezinme çalışmaya devam eder.
      }
    };

    let idleId: number | null = null;
    let fallbackTimer: number | null = null;

    if (!connection?.saveData) {
      if (typeof idleWindow.requestIdleCallback === 'function') {
        idleId = idleWindow.requestIdleCallback(
          () => {
            PREFETCH_ROUTES.forEach(prefetch);
          },
          { timeout: IDLE_TIMEOUT_MS }
        );
      } else {
        fallbackTimer = window.setTimeout(() => {
          PREFETCH_ROUTES.forEach(prefetch);
        }, FALLBACK_DELAY_MS);
      }
    }

    const handleIntent = (event: Event) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (href) prefetch(href);
    };

    document.addEventListener('mouseover', handleIntent, { passive: true });
    document.addEventListener('touchstart', handleIntent, { passive: true });
    document.addEventListener('focusin', handleIntent);

    return () => {
      if (idleId !== null) idleWindow.cancelIdleCallback?.(idleId);
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      document.removeEventListener('mouseover', handleIntent);
      document.removeEventListener('touchstart', handleIntent);
      document.removeEventListener('focusin', handleIntent);
    };
  }, [router]);

  return null;
}
