'use client';

import React from 'react';
import { openCookiePreferences } from '../../components/CookieConsentBanner';

export function CookiePrefsButton() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11.5px] font-semibold text-white hover:bg-[#1D4ED8]"
    >
      Çerez Tercihlerini Yönet
    </button>
  );
}
