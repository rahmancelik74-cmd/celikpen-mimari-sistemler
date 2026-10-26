'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { AdminTabProps } from './types';
import { ConfirmModal, SearchInput } from './AdminShared';

interface MediaItem {
  fileName: string;
  url: string;
  folder: string;
  sizeKB: number;
  modifiedAt: string;
  altText: string;
}

const FOLDERS = ['Tümü', 'uploads', 'references', 'services', 'products'] as const;

export default function AdminMediaTab({ showNotice, uploadImageFile, savedPassword }: AdminTabProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState<string>('Tümü');
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altValues, setAltValues] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      const json = (await res.json()) as { ok: boolean; items: MediaItem[] };
      if (json.ok) {
        setItems(json.items);
        const alts: Record<string, string> = {};
        json.items.forEach(i => { alts[i.url] = i.altText; });
        setAltValues(alts);
      }
    } catch {
      showNotice('error', 'Medya dosyaları yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, [showNotice]);

  useEffect(() => { void fetchMedia(); }, [fetchMedia]);

  const filtered = items.filter(i => {
    if (folder !== 'Tümü' && i.folder !== folder) return false;
    if (search && !i.fileName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      await uploadImageFile(file);
    }
    await fetchMedia();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void handleUpload(e.dataTransfer.files);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: savedPassword || 'celikpen2026', url: deleteTarget.url }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (json.ok) {
        showNotice('success', `${deleteTarget.fileName} silindi.`);
        await fetchMedia();
      } else {
        showNotice('error', json.error || 'Silme hatası.');
      }
    } catch {
      showNotice('error', 'Silme işlemi başarısız.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const copyUrl = (url: string) => {
    void navigator.clipboard.writeText(url);
    showNotice('success', 'URL panoya kopyalandı.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">
            public/images/*
          </span>
          <h1 className="mt-1 text-xl font-black text-white">
            Medya Kütüphanesi ({items.length} Dosya)
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Sürükle-bırak veya dosya seçerek yeni görseller yükleyin. Uploads klasöründeki dosyalar silinebilir.
          </p>
        </div>
        <button type="button" onClick={() => fileRef.current?.click()}
          className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-xs font-extrabold text-white shadow ring-1 ring-sky-400/30 hover:bg-[#1D4ED8]">
          📁 Görsel Yükle
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={e => void handleUpload(e.target.files)} />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
          dragging ? 'border-sky-400 bg-sky-500/10' : 'border-white/15 bg-slate-900/40'
        }`}
      >
        <div>
          <div className="text-3xl">{dragging ? '📥' : '🖼️'}</div>
          <p className="mt-2 text-sm font-bold text-slate-300">
            {dragging ? 'Bırakarak yükleyin...' : 'Görselleri buraya sürükleyip bırakın'}
          </p>
          <p className="mt-1 text-xs text-slate-500">JPG, PNG, WebP, AVIF — Maks 5 MB</p>
        </div>
      </div>

      {/* Folder tabs + Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {FOLDERS.map(f => (
            <button key={f} type="button" onClick={() => setFolder(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                folder === f ? 'bg-[#1E3A8A] text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[200px]">
          <SearchInput value={search} onChange={setSearch} placeholder="Dosya adı ara..." />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-2xl bg-slate-800/60" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A] py-16">
          <div className="text-4xl">📂</div>
          <p className="mt-3 text-sm font-bold text-slate-400">Medya dosyası bulunamadı.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(item => (
            <div key={item.url} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={altValues[item.url] || item.altText}
                  className="h-full w-full object-cover transition group-hover:scale-105" />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition group-hover:opacity-100">
                  <button type="button" onClick={() => copyUrl(item.url)}
                    className="rounded-lg bg-sky-600 px-3 py-1.5 text-[11px] font-extrabold text-white shadow hover:bg-sky-500">
                    URL Kopyala
                  </button>
                  {item.folder === 'uploads' && (
                    <button type="button" onClick={() => setDeleteTarget(item)}
                      className="rounded-lg bg-rose-600 px-3 py-1.5 text-[11px] font-extrabold text-white shadow hover:bg-rose-500">
                      Sil
                    </button>
                  )}
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs font-bold text-white">{item.fileName}</span>
                  <span className="shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-[9px] font-bold text-slate-400">
                    {item.folder}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{item.sizeKB} KB</span>
                  <span>{new Date(item.modifiedAt).toLocaleDateString('tr-TR')}</span>
                </div>
                {/* Alt text editor */}
                <div className="mt-2">
                  {editingAlt === item.url ? (
                    <input type="text" autoFocus value={altValues[item.url] || ''}
                      onChange={e => setAltValues(prev => ({ ...prev, [item.url]: e.target.value }))}
                      onBlur={() => setEditingAlt(null)}
                      onKeyDown={e => { if (e.key === 'Enter') setEditingAlt(null); }}
                      className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-white focus:border-sky-400 focus:outline-none"
                      placeholder="Alt metin girin..." />
                  ) : (
                    <button type="button" onClick={() => setEditingAlt(item.url)}
                      className="w-full truncate rounded border border-transparent px-2 py-1 text-left text-[10px] text-slate-400 hover:border-slate-700 hover:text-white">
                      Alt: {altValues[item.url] || item.altText || '—'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Görseli Sil"
        message={`"${deleteTarget?.fileName}" dosyasını kalıcı olarak silmek istediğinize emin misiniz?`}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
