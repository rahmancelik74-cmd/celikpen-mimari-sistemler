import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { ContactForm } from '../../components/ContactForm';
import { MinimalSubpageHeader } from '../../components/MinimalSubpageHeader';

export const metadata: Metadata = {
  title: 'İletişim & Ücretsiz Lazerli Keşif — Çelikpen Bahçelievler | 0 (212) 555 00 34',
  description: `${SITE_CONFIG.address}. Ücretsiz lazerli ölçü ve mimari sistem danışmanlığı için telefon: ${SITE_CONFIG.phoneDisplay}.`,
};

export default function IletisimPage() {
  const directionsWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Merhaba Çelikpen (${SITE_CONFIG.headquartersNeighborhood}), Kocasinan Merkez showroom için konum paylaşabilir misiniz?`
  )}`;

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-8 text-slate-700 sm:px-6 lg:px-8">
      <MinimalSubpageHeader
        breadcrumbLabel="İletişim"
        overline="DOĞRUDAN FABRİKA & SHOWROOM İLETİŞİM"
        title="İletişim ve Ücretsiz Keşif"
        subtitle="Projeniz için uzman mühendislerimizden bilgi alın veya aynı gün ücretsiz lazerli ölçü randevusu oluşturun."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Sol: Kurumsal iletişim kartları */}
        <div className="space-y-4 lg:col-span-5">
          <div className="hover-lift rounded-card border border-slate-200 bg-white p-5 shadow-xs">
            <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#6D28D9]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" aria-hidden="true" />
              Showroom &amp; Üretim Adresi
            </span>
            <p className="mt-2 text-[13px] font-semibold leading-relaxed text-[#0F172A]">{SITE_CONFIG.address}</p>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <a
                href={directionsWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#7C3AED] hover:underline"
              >
                <span>WhatsApp’tan Canlı Konum İste</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="hover-lift rounded-card border border-slate-200 bg-white p-5 shadow-xs">
              <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#6D28D9]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" aria-hidden="true" />
                Kurumsal Keşif Hattı
              </span>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="mt-2 block text-xl font-semibold tracking-tight text-[#0F172A] transition-colors hover:text-[#7C3AED]"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
              <p className="mt-1 text-[10.5px] text-slate-500">{SITE_CONFIG.workingHours}</p>
            </div>

            <div className="rounded-card border border-emerald-200 bg-emerald-50/70 p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                <IconLock className="h-3.5 w-3.5" />
                256-Bit SSL &amp; KVKK Güvencesi
              </div>
              <p className="mt-1.5 text-[10.5px] leading-relaxed text-emerald-900/75">
                Bilgileriniz uçtan uca şifreli bağlantı üzerinden yalnızca ücretsiz keşif
                randevunuz için yetkili mühendisimize iletilir.
              </p>
            </div>
          </div>

          <div className="rounded-card border border-[#DDD6FE] bg-[#F5F3FF] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6D28D9]">
              Hızlı İletişim
            </p>
            <a
              href="mailto:iletisim@celikpen.com"
              className="mt-1.5 block text-[12px] font-semibold text-[#0F172A] hover:text-[#6D28D9]"
            >
              iletisim@celikpen.com
            </a>
            <p className="mt-1 text-[10px] text-slate-500">
              E-posta taleplerine aynı iş günü içinde dönüş yapıyoruz.
            </p>
          </div>
        </div>

        {/* Sağ: Sade ve Adımsız Modern İletişim Kartı */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

function IconLock({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
