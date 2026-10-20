'use client';

import React from 'react';

export function PrintDatasheetButton({ label = '🖨️ Teknik Föyü Yazdır / PDF Kaydet' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl border border-[#0B1560] bg-white px-4 py-2.5 text-xs font-bold text-[#0B1560] shadow-sm transition hover:bg-[#0B1560] hover:text-white print:hidden"
    >
      <span>{label}</span>
    </button>
  );
}
