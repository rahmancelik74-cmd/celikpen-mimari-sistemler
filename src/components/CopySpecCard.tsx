'use client';

import React, { useState } from 'react';

interface CopySpecCardProps {
  code: string;
  title: string;
  series: string;
  content: string;
}

export const CopySpecCard: React.FC<CopySpecCardProps> = ({
  code,
  title,
  series,
  content,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${code} - ${title}\n${content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-black text-[#7C3AED]">{code}</span>
          <h3 className="text-sm font-black text-[#0F172A]">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#0F172A]/10 px-2.5 py-1 text-[11px] font-bold text-[#0F172A]">
            {series}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`rounded-lg px-3 py-1 text-[11px] font-bold transition ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'border border-slate-200 bg-slate-50 text-[#0F172A] hover:border-[#7C3AED] hover:text-[#7C3AED]'
            }`}
          >
            {copied ? '✓ Kopyalandı' : '📋 Metni Kopyala'}
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">{content}</p>
    </div>
  );
};
