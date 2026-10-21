import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '../config/site.config';
import {
  SEO_FAQS,
  SEO_SERVICE_GROUPS,
} from '../config/seo.config';

/**
 * Ana sayfanın en altında yer alan, görsel olarak sade kalan SEO rehberi.
 * Hizmet kategorileri ve mahalle sayfalarına iç link, SSS içeriğine ise
 * erişilebilir <details> akordeonu sağlar. İçerik HTML'de her zaman mevcuttur;
 * böylece FAQPage JSON-LD ile birebir eşleşir.
 */
export function SeoGuide() {
  return (
    <section
      aria-labelledby="seo-rehber-baslik"
      className="border-t border-slate-200 bg-[#F8FAFC]"
    >
      <div className="container-shell py-9 sm:py-11">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Mimari Bilgi Rehberi</span>
          <h2
            id="seo-rehber-baslik"
            className="mt-2 text-xl font-semibold tracking-tight text-[#0F172A] sm:text-2xl"
          >
            Bahçelievler Cam Balkon Rehberi ve Hizmet Bölgeleri
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[11.5px] leading-relaxed text-slate-500 sm:text-[12.5px]">
            Aradığınız sistemleri ve mahallenizi tek ekranda bulun. Tüm hizmet
            bölgelerimiz, ürün gruplarımız ve en sık sorulan teknik soruların
            yanıtları aşağıda yer alıyor.
          </p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Hizmet Kategorileri
            </h3>
            <nav aria-label="Çelikpen hizmet kategorileri" className="mt-3">
              <ul className="flex flex-wrap gap-1.5">
                {SEO_SERVICE_GROUPS.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="inline-flex rounded-full border border-slate-200 bg-[#F8FAFC] px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 transition-colors hover:border-[#DDD6FE] hover:bg-[#F5F3FF] hover:text-[#6D28D9]"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/urunler"
              className="mt-4 inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#7C3AED] hover:text-[#6D28D9]"
            >
              Tüm ürün kataloğunu incele <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Bahçelievler Hizmet Bölgeleri
            </h3>
            <nav aria-label="Bahçelievler mahalle sayfaları" className="mt-3">
              <ul className="flex flex-wrap gap-1.5">
                {SITE_CONFIG.neighborhoods.map((neighborhood) => (
                  <li key={neighborhood.slug}>
                    <Link
                      href={`/bahcelievler/${neighborhood.slug}`}
                      className="inline-flex rounded-full border border-slate-200 bg-[#F8FAFC] px-3 py-1.5 text-[10.5px] font-semibold text-slate-700 transition-colors hover:border-[#DDD6FE] hover:bg-[#F5F3FF] hover:text-[#6D28D9]"
                    >
                      {neighborhood.name} cam balkon
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/satis-noktalari"
              className="mt-4 inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#7C3AED] hover:text-[#6D28D9]"
            >
              Showroom ve keşif ağını görüntüle <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-card border border-slate-200 bg-white shadow-xs">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Sıkça Sorulan Teknik Sorular
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {SEO_FAQS.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-[11.5px] font-semibold leading-relaxed text-[#0F172A] marker:hidden hover:bg-[#F8FAFC] sm:px-6">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[13px] font-normal text-slate-500 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-4 pr-12 text-[10.5px] leading-relaxed text-slate-500 sm:px-6 sm:pr-16">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-400">
          Çelikpen Mimari Cam &amp; Doğrama Sistemleri • Kocasinan Merkez,
          Bahçelievler / İstanbul •{' '}
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="font-semibold text-slate-500 hover:text-[#7C3AED]"
          >
            {SITE_CONFIG.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
