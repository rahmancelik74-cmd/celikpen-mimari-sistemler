'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

export const COOKIE_CONSENT_KEY = 'celikpen_cookie_consent';
export const COOKIE_OPEN_EVENT = 'celikpen:open-cookie-prefs';
export const COOKIE_CHANGE_EVENT = 'celikpen:consent-changed';

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof p.analytics !== 'boolean' || typeof p.marketing !== 'boolean') return null;
    return { necessary: true, analytics: p.analytics, marketing: p.marketing, timestamp: String(p.timestamp ?? '') };
  } catch {
    return null;
  }
}

/** Footer vb. yerlerden tercih penceresini yeniden açar. */
export function openCookiePreferences() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(COOKIE_OPEN_EVENT));
}

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-[#1E3A8A]' : 'bg-slate-300'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}

export function CookieConsentBanner() {
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const openModal = useCallback((current: CookieConsent | null) => {
    setAnalytics(current?.analytics ?? false);
    setMarketing(current?.marketing ?? false);
    setShowModal(true);
  }, []);

  useEffect(() => {
    const existing = readCookieConsent();
    setSaved(existing);
    setShowBanner(!existing);
    setReady(true);
    const onOpen = () => openModal(readCookieConsent());
    window.addEventListener(COOKIE_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_OPEN_EVENT, onOpen);
  }, [openModal]);

  const persist = (a: boolean, m: boolean) => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: a,
      marketing: m,
      timestamp: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    } catch {
      /* depolama kapalıysa tercih yalnızca bu oturumda geçerlidir */
    }
    setSaved(consent);
    setShowBanner(false);
    setShowModal(false);
    window.dispatchEvent(new CustomEvent(COOKIE_CHANGE_EVENT, { detail: consent }));
  };

  if (!ready) return null;

  return (
    <>
      {showBanner && !showModal && (
        <div
          role="dialog"
          aria-label="Çerez bildirimi"
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-5"
        >
          <p className="text-[12px] leading-relaxed text-slate-600">
            Sitemizde zorunlu çerezlerin yanı sıra, onayınız olması halinde analitik ve pazarlama
            çerezleri kullanılır. Ayrıntılar için{' '}
            <Link href="/cerez-politikasi" className="font-semibold text-[#1E3A8A] underline">
              Çerez Politikası
            </Link>{' '}
            ve{' '}
            <Link href="/kvkk" className="font-semibold text-[#1E3A8A] underline">
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni inceleyebilirsiniz.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => persist(true, true)}
              className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11.5px] font-semibold text-white hover:bg-[#1D4ED8]"
            >
              Tümünü Kabul Et
            </button>
            <button
              type="button"
              onClick={() => persist(false, false)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[11.5px] font-semibold text-[#0F172A] hover:bg-slate-50"
            >
              Sadece Zorunlu Çerezler
            </button>
            <button
              type="button"
              onClick={() => openModal(saved)}
              className="rounded-lg px-4 py-2.5 text-[11.5px] font-semibold text-[#1E3A8A] underline hover:bg-slate-50"
            >
              Çerez Tercihlerini Yönet
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0F172A]/60 p-3 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Çerez tercihleri"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <h2 className="text-base font-semibold text-[#0F172A]">Çerez Tercihlerini Yönet</h2>
            <p className="mt-1 text-[11.5px] text-slate-500">
              Hangi çerez kategorilerine izin vereceğinizi seçin. Tercihinizi dilediğiniz zaman
              değiştirebilirsiniz.
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-3.5">
                <div>
                  <h3 className="text-[12.5px] font-semibold text-[#0F172A]">Zorunlu Çerezler</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    Güvenlik, oturum yönetimi ve tercih depolama için gereklidir. Her zaman aktiftir.
                  </p>
                </div>
                <Toggle checked disabled label="Zorunlu çerezler (her zaman aktif)" />
              </div>
              <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-3.5">
                <div>
                  <h3 className="text-[12.5px] font-semibold text-[#0F172A]">
                    Analitik ve Performans Çerezleri
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    Google Analytics 4 ve Search Console ile site performansının ölçülmesi.
                  </p>
                </div>
                <Toggle checked={analytics} onChange={setAnalytics} label="Analitik ve performans çerezleri" />
              </div>
              <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-3.5">
                <div>
                  <h3 className="text-[12.5px] font-semibold text-[#0F172A]">
                    Pazarlama ve Hedefleme Çerezleri
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    Google Ads dönüşüm takibi ve reklam performansı ölçümü.
                  </p>
                </div>
                <Toggle checked={marketing} onChange={setMarketing} label="Pazarlama ve hedefleme çerezleri" />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => persist(false, false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-[11.5px] font-semibold text-[#0F172A] hover:bg-slate-50"
              >
                Sadece Zorunlu Çerezler
              </button>
              <button
                type="button"
                onClick={() => persist(analytics, marketing)}
                className="rounded-lg border border-[#1E3A8A] px-4 py-2.5 text-[11.5px] font-semibold text-[#1E3A8A] hover:bg-slate-50"
              >
                Seçimimi Kaydet
              </button>
              <button
                type="button"
                onClick={() => persist(true, true)}
                className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11.5px] font-semibold text-white hover:bg-[#1D4ED8]"
              >
                Tümünü Kabul Et
              </button>
            </div>
          </div>
        </div>
      )}

      {!showBanner && !showModal && (
        <button
          type="button"
          onClick={() => openModal(saved)}
          aria-label="Çerez Tercihleri"
          className="fixed bottom-3 left-3 z-[80] rounded-full border border-slate-200 bg-white px-3 py-2 text-[10.5px] font-semibold text-[#1E3A8A] shadow-lg hover:bg-slate-50"
        >
          🍪 Çerez Tercihleri
        </button>
      )}
    </>
  );
}
