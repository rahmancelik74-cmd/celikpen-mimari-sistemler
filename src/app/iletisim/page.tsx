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
    <main className="mx-auto max-w-6xl px-4 py-8 text-slate-700 sm:px-6">
      <MinimalSubpageHeader
        breadcrumbLabel="İletişim"
        overline="DOĞRUDAN FABRİKA & SHOWROOM İLETİŞİM"
        title="İletişim ve Ücretsiz Keşif"
        subtitle="Projeniz için uzman mühendislerimizden bilgi alın veya aynı gün ücretsiz lazerli ölçü randevusu oluşturun."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Sol: Minimalist Kurumsal İletişim Kartları */}
        <div className="space-y-4 lg:col-span-5">
          <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
              📍 Showroom &amp; Üretim Adresi
            </span>
            <p className="mt-1 text-sm font-bold text-[#0B1560]">{SITE_CONFIG.address}</p>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <a
                href={directionsWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D91B24] hover:underline"
              >
                <span>WhatsApp’tan Canlı Konum İste</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                📞 Kurumsal Keşif Hattı
              </span>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="mt-1 block text-lg font-black text-[#0B1560] hover:text-[#D91B24]"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
              <p className="mt-1 text-xs text-slate-500">{SITE_CONFIG.workingHours}</p>
            </div>

            <div className="rounded-2xl border border-emerald-600/25 bg-emerald-50/70 p-4 text-xs text-slate-700">
              <div className="font-extrabold text-emerald-800">
                🔒 256-Bit SSL &amp; KVKK Güvencesi
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                Bilgileriniz uçtan uca şifreli bağlantı üzerinden yalnızca ücretsiz keşif randevunuz için yetkili mühendisimize iletilir.
              </p>
            </div>
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
