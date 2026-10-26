import React from 'react';
import Script from 'next/script';

/**
 * Google Search Console doğrulama meta etiketi ve Google Analytics 4 (GA4)
 * performans dostu (afterInteractive) izleme bileşeni.
 * - NEXT_PUBLIC_GOOGLE_SITE_verification veya NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID
 */
export function SeoAnalytics() {
  const gscVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_verification ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    '';
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

  return (
    <>
      {gscVerification ? (
        <meta name="google-site-verification" content={gscVerification} />
      ) : null}

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
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
