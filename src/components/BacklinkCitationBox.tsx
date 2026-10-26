'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/site.config';
import { pushSeoEvent } from './SeoAnalytics';

interface BacklinkCitationBoxProps {
  title: string;
  url: string;
  authorName: string;
  publishDate: string;
  primaryKeyword: string;
}

type CitationTab = 'html' | 'markdown' | 'embed';

export function BacklinkCitationBox({
  title,
  url,
  authorName,
  publishDate,
  primaryKeyword,
}: BacklinkCitationBoxProps) {
  const [activeTab, setActiveTab] = useState<CitationTab>('html');
  const [copied, setCopied] = useState(false);

  const year = publishDate.slice(0, 4) || '2026';

  const htmlSnippet = `<a href="${url}" rel="dofollow" title="${title} — ${SITE_CONFIG.brandName} Mimari Sistemler">${title} (${SITE_CONFIG.brandName} Teknik Rehberi)</a>`;

  const markdownApaSnippet = `${authorName} (${year}). "${title}". ${SITE_CONFIG.brandName} Cam Balkon & Mimari Sistemler Mühendislik Yayını. Kaynak: [${primaryKeyword} — ${SITE_CONFIG.brandName}](${url})`;

  const embedSnippet = `<blockquote cite="${url}" style="border-left:4px solid #1E3A8A;padding:12px 16px;background:#F8FAFC;font-family:sans-serif;font-size:14px;color:#0F172A;">
  <strong>${title}</strong> — Teknik norm ($U_w$, EN 12210, EN 12150) ve saha analiz verileri.
  <br /><small>Kaynak: <a href="${url}" rel="dofollow" style="color:#1E3A8A;font-weight:700;">${SITE_CONFIG.brandName} Mimari Sistemler (${url})</a></small>
</blockquote>`;

  const currentCode =
    activeTab === 'html'
      ? htmlSnippet
      : activeTab === 'markdown'
        ? markdownApaSnippet
        : embedSnippet;

  const buttonLabel =
    activeTab === 'html'
      ? 'HTML Kodunu Kopyala'
      : activeTab === 'markdown'
        ? 'Kaynakça Metnini Kopyala'
        : 'Embed Kodunu Kopyala';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      pushSeoEvent('backlink_citation_copied', {
        tab: activeTab,
        article_url: url,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignore
    }
  };

  return (
    <section
      id="kaynak-goster-embed"
      aria-labelledby="kaynak-goster-baslik"
      className="mt-10 scroll-mt-32 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1E3A8A]">
          🔗 Kaynak Göster / Atıf &amp; Embed Aracı
        </span>
        <span className="text-[11px] font-semibold text-slate-500">
          Mimarlık Ofisleri, Bloglar, Forumlar &amp; Akademik Atıf İçin
        </span>
      </div>

      <h2 id="kaynak-goster-baslik" className="mt-2 text-lg font-bold text-[#0F172A] sm:text-xl">
        Bu Teknik Rehberi Web Sitenizde veya Forumlarda Kaynak Gösterin
      </h2>
      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
        Tablo, infografik ve mühendislik hesaplamalarımızı kaynak bağlantısı (backlink) belirterek
        blog yazılarınızda, mimari şartnamelerinizde ve forum konularında serbestçe paylaşabilirsiniz.
      </p>

      {/* Sekmeler */}
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Kaynak Gösterme Formatları">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'html'}
          onClick={() => {
            setActiveTab('html');
            setCopied(false);
          }}
          className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            activeTab === 'html'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A]'
          }`}
        >
          1. HTML Backlink Kodu (Web &amp; Blog)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'markdown'}
          onClick={() => {
            setActiveTab('markdown');
            setCopied(false);
          }}
          className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            activeTab === 'markdown'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A]'
          }`}
        >
          2. Forum &amp; Makale Kaynakça (Markdown / APA)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'embed'}
          onClick={() => {
            setActiveTab('embed');
            setCopied(false);
          }}
          className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            activeTab === 'embed'
              ? 'bg-[#1E3A8A] text-white shadow-xs'
              : 'border border-slate-200 bg-white text-[#0F172A] hover:border-[#1E3A8A]'
          }`}
        >
          3. İnfografik / Tablo Embed Kodu
        </button>
      </div>

      {/* Kod Alanı */}
      <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
        <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs leading-relaxed text-slate-800">
          {currentCode}
        </pre>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <span className="text-[11px] font-medium text-slate-500">
            Kanoni̇k URL: <strong className="text-[#0F172A]">{url}</strong>
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white transition hover:bg-[#1D4ED8]"
          >
            <span>{copied ? '✓ Panoya Kopyalandı!' : buttonLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
