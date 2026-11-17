'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { ANALYTICS_CONFIG } from '../config/analytics.config';
import { COOKIE_CHANGE_EVENT, readCookieConsent } from './CookieConsentBanner';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const ADS_CONVERSION_EVENTS = ['whatsapp_click', 'phone_call_click'];
const SESSION_FLAG_KEY = 'celikpen_visitor_session_v1';
const LOCAL_TELEMETRY_KEY = 'celikpen_visitor_telemetry_v1';

export function pushSeoEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...payload,
  });

  if (
    ADS_CONVERSION_EVENTS.includes(eventName) &&
    ANALYTICS_CONFIG.googleAdsId &&
    ANALYTICS_CONFIG.googleAdsConversionLabel &&
    readCookieConsent()?.marketing &&
    typeof window.gtag === 'function'
  ) {
    window.gtag('event', 'conversion', {
      send_to: `${ANALYTICS_CONFIG.googleAdsId}/${ANALYTICS_CONFIG.googleAdsConversionLabel}`,
    });
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      page_path: window.location.pathname,
      ...payload,
    });
  }
}

export function SeoAnalytics() {
  const pathname = usePathname();
  const {
    googleSiteVerification,
    gaMeasurementId,
    gtmContainerId,
    googleAdsId,
    bingVerification,
    yandexVerification,
  } = ANALYTICS_CONFIG;

  const [analyticsAllowed, setAnalyticsAllowed] = React.useState(false);
  const [marketingAllowed, setMarketingAllowed] = React.useState(false);

  useEffect(() => {
    const sync = () => {
      const c = readCookieConsent();
      setAnalyticsAllowed(Boolean(c?.analytics));
      setMarketingAllowed(Boolean(c?.marketing));
    };
    sync();
    window.addEventListener(COOKIE_CHANGE_EVENT, onChange);
    function onChange() {
      sync();
    }
    return () => window.removeEventListener(COOKIE_CHANGE_EVENT, onChange);
  }, []);

  /* Sıfır gecikmeli (Zero-Latency) canlı ziyaretçi telemetri kaydı */
  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/cp-yonetim-2026')) {
      return;
    }

    const sendTelemetry = () => {
      try {
        let isNewSession = false;
        if (!window.sessionStorage.getItem(SESSION_FLAG_KEY)) {
          isNewSession = true;
          window.sessionStorage.setItem(SESSION_FLAG_KEY, String(Date.now()));
        }

        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            label: document.title || pathname,
            isNewSession,
          }),
          keepalive: true,
        })
          .then((res) => res.json())
          .then((json: { ok?: boolean; data?: unknown }) => {
            if (json?.ok && json.data) {
              try {
                window.localStorage.setItem(LOCAL_TELEMETRY_KEY, JSON.stringify(json.data));
              } catch {
                // ignore storage quota
              }
            }
          })
          .catch(() => {
            // non-blocking silent fallback
          });
      } catch {
        // ignore
      }
    };

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(sendTelemetry, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(sendTelemetry, 800);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const explicitEventEl = target.closest<HTMLElement>('[data-seo-event]');
      if (explicitEventEl) {
        const eventName = explicitEventEl.getAttribute('data-seo-event') || 'custom_interaction';
        const eventLabel = explicitEventEl.getAttribute('data-seo-label') || '';
        pushSeoEvent(eventName, { label: eventLabel });
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';

      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        pushSeoEvent('whatsapp_click', {
          href,
          text: (anchor.textContent || '').trim().slice(0, 80),
        });
      } else if (href.startsWith('tel:')) {
        pushSeoEvent('phone_call_click', {
          phone: href.replace('tel:', ''),
        });
      } else if (href.includes('/fiyat-hesapla')) {
        pushSeoEvent('price_calculator_used', {
          source_path: window.location.pathname,
        });
      } else if (href.endsWith('.pdf') || href.includes('/profesyoneller/kataloglar')) {
        pushSeoEvent('catalog_download', {
          href,
        });
      } else if (href.includes('google.com/maps') || href.includes('maps.google.com')) {
        pushSeoEvent('google_maps_directions_click', {
          href,
        });
      }
    };

    document.addEventListener('click', handleDocumentClick, { passive: true });
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <>
      {googleSiteVerification ? (
        <meta name="google-site-verification" content={googleSiteVerification} />
      ) : null}
      {bingVerification ? <meta name="msvalidate.01" content={bingVerification} /> : null}
      {yandexVerification ? <meta name="yandex-verification" content={yandexVerification} /> : null}

      {analyticsAllowed && gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      ) : null}

      {marketingAllowed && googleAdsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="gads-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){dataLayer.push(arguments);};
              gtag('js', new Date());
              gtag('config', '${googleAdsId}');`}
          </Script>
        </>
      ) : null}

      {analyticsAllowed && gtmContainerId ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmContainerId}');
          `}
        </Script>
      ) : null}
    </>
  );
}
