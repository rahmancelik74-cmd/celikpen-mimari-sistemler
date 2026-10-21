'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/site.config';
import { WINSA_CONTENT_CONFIG } from '../config/winsa-content.config';

export type ContactFormType = 'kesif' | 'bilgi' | 'bayilik' | 'ik';

const FORM_TABS: {
  id: ContactFormType;
  label: string;
  heading: string;
  placeholder: string;
}[] = [
  {
    id: 'kesif',
    label: 'Keşif Randevusu',
    heading: 'Ücretsiz Lazerli Keşif Formu',
    placeholder: 'Örn: 4 metre balkon, Antrasit profil...',
  },
  {
    id: 'bilgi',
    label: 'Bilgi Talebi',
    heading: 'Teknik Bilgi & Katalog Talebi',
    placeholder: 'Örn: Dorado 76 ve Isıcamlı seri hakkında bilgi...',
  },
  {
    id: 'bayilik',
    label: 'Proje Partnerliği',
    heading: 'Mimari Proje & Partnerlik Formu',
    placeholder: 'Örn: Firma unvanınız ve proje detayınız...',
  },
  {
    id: 'ik',
    label: 'İnsan Kaynakları',
    heading: 'İnsan Kaynakları Başvurusu',
    placeholder: 'Örn: Başvurulan pozisyon ve tecrübe yılınız...',
  },
];

const PHONE_REGEX = /^0?5\d{9}$/;

export function sanitizeInput(raw: string): string {
  return raw
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/[<>]/g, '')
    .trim();
}

export function ContactForm({ initialTab = 'kesif' }: { initialTab?: ContactFormType }) {
  const [activeTab, setActiveTab] = useState<ContactFormType>(initialTab);
  const [ad, setAd] = useState('');
  const [telefon, setTelefon] = useState('');
  const [mahalle, setMahalle] = useState(SITE_CONFIG.neighborhoods[0].name);
  const [sistem, setSistem] = useState(SITE_CONFIG.productSeries[1].name);
  const [mesaj, setMesaj] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const mountedAtRef = useRef<number>(Date.now());
  const lastSubmitRef = useRef<number>(0);

  const [errors, setErrors] = useState<{
    ad?: string;
    telefon?: string;
    mesaj?: string;
    security?: string;
  }>({});

  useEffect(() => {
    mountedAtRef.current = Date.now();
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qForm = params.get('form') as ContactFormType | null;
      if (qForm && ['kesif', 'bilgi', 'bayilik', 'ik'].includes(qForm)) {
        setActiveTab(qForm);
      }
    }
  }, []);

  const currentTabConfig =
    FORM_TABS.find((t) => t.id === activeTab) || FORM_TABS[0];

  const allSystemOptions = [
    ...SITE_CONFIG.productSeries.map((p) => `${p.code} — ${p.name}`),
    ...WINSA_CONTENT_CONFIG.pvcAndArchitecturalSystems.map((s) => `${s.code} — ${s.name}`),
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (websiteUrl.trim().length > 0) {
      return;
    }

    const now = Date.now();
    if (now - mountedAtRef.current < 1500 || now - lastSubmitRef.current < 1500) {
      setErrors({
        security: 'Lütfen formu göndermeden önce birkaç saniye bekleyin.',
      });
      return;
    }

    const cleanAd = sanitizeInput(ad);
    const cleanedPhone = sanitizeInput(telefon).replace(/\s+/g, '');
    const cleanMesaj = sanitizeInput(mesaj);

    const nextErrors: { ad?: string; telefon?: string; mesaj?: string } = {};

    if (cleanAd.length < 2) {
      nextErrors.ad = 'Lütfen adınızı girin.';
    }
    if (!PHONE_REGEX.test(cleanedPhone)) {
      nextErrors.telefon = 'Geçerli bir cep telefonu girin (Örn: 05321234567).';
    }
    if (cleanMesaj.length > 500) {
      nextErrors.mesaj = 'Mesajınız en fazla 500 karakter olabilir.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    lastSubmitRef.current = now;

    const lines = [
      `Merhaba Çelikpen (${SITE_CONFIG.headquartersNeighborhood}), [${currentTabConfig.label}] üzerinden talep gönderiyorum:`,
      `• Ad Soyad / Firma: ${cleanAd}`,
      `• Telefon: ${cleanedPhone}`,
      `• Bölge: ${sanitizeInput(mahalle)}`,
      activeTab !== 'ik' ? `• Sistem: ${sanitizeInput(sistem)}` : '',
      cleanMesaj ? `• Not: ${cleanMesaj}` : '',
    ].filter(Boolean);

    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-card border border-slate-200 bg-white p-6 shadow-xs"
    >
      {/* Anti-Bot Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_url">Website URL</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
      </div>

      {/* 4 Kompakt Sekme */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {FORM_TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2 text-[10.5px] font-semibold transition-all ${
                isSelected
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : 'border border-slate-200 bg-[#F8FAFC] text-[#0F172A] hover:border-[#DDD6FE] hover:bg-[#F5F3FF] hover:text-[#6D28D9]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <h2 className="text-lg font-semibold tracking-tight text-[#0F172A]">{currentTabConfig.heading}</h2>

      <div className="mt-4 space-y-3.5">
        {errors.security && (
          <p role="alert" className="rounded-lg bg-rose-50 p-2 text-xs font-bold text-[#D91B24]">
            {errors.security}
          </p>
        )}

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-ad" className="block text-xs font-semibold text-slate-700">
              {activeTab === 'bayilik' ? 'Firma / Ad Soyad *' : 'Adınız Soyadınız *'}
            </label>
            <input
              id="contact-ad"
              name="ad"
              type="text"
              required
              minLength={2}
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              placeholder="Ahmet Yılmaz"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#7C3AED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DDD6FE]"
            />
            {errors.ad && (
              <p role="alert" className="mt-1 text-[11px] font-semibold text-[#D91B24]">
                {errors.ad}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-telefon" className="block text-xs font-semibold text-slate-700">
              Cep Telefonu *
            </label>
            <input
              id="contact-telefon"
              name="telefon"
              type="tel"
              required
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="05XX XXX XX XX"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#7C3AED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DDD6FE]"
            />
            {errors.telefon && (
              <p role="alert" className="mt-1 text-[11px] font-semibold text-[#D91B24]">
                {errors.telefon}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-mahalle" className="block text-xs font-semibold text-slate-700">
              Bölge / Mahalle
            </label>
            <select
              id="contact-mahalle"
              name="mahalle"
              value={mahalle}
              onChange={(e) => setMahalle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#7C3AED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DDD6FE]"
            >
              {SITE_CONFIG.neighborhoods.map((n) => (
                <option key={n.slug} value={n.name}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-sistem" className="block text-xs font-semibold text-slate-700">
              {activeTab === 'ik' ? 'Departman' : 'İlgilenilen Sistem'}
            </label>
            <select
              id="contact-sistem"
              name="sistem"
              value={sistem}
              onChange={(e) => setSistem(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#7C3AED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DDD6FE]"
            >
              {allSystemOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-mesaj" className="block text-xs font-semibold text-slate-700">
            Notunuz (Opsiyonel)
          </label>
          <textarea
            id="contact-mesaj"
            name="mesaj"
            rows={2}
            maxLength={500}
            value={mesaj}
            onChange={(e) => setMesaj(e.target.value)}
            placeholder={currentTabConfig.placeholder}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#7C3AED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DDD6FE]"
          />
          {errors.mesaj && (
            <p role="alert" className="mt-1 text-[11px] font-semibold text-[#D91B24]">
              {errors.mesaj}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#7C3AED] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-purple transition-colors hover:bg-[#6D28D9]"
        >
          WhatsApp Üzerinden Gönder →
        </button>
      </div>
    </form>
  );
}
