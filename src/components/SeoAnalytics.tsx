'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { ANALYTICS_CONFIG } from '../config/analytics.config';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushSeoEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...payload,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      page_path: window.location.pathname,
      ...payload,
    });
  }
}

/**
 * Google Search Console, Bing, Yandex doğrulama meta etiketleri,
 * Google Analytics 4 (GA4), Google Tag Manager (GTM) ve
 * otomatik dönüşüm (conversion) olay izleme bileşeni.
 */
export function SeoAnalytics() {
  const {
    googleSiteVerification,
    gaMeasurementId,
    gtmContainerId,
    bingVerification,
    yandexVerification,
  } = ANALYTICS_CONFIG;

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

      {gaMeasurementId ? (
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

      {gtmContainerId ? (
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
