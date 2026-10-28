'use client';

import React, { useState, useMemo } from 'react';
import type { AdminTabProps, CmsPricingSystem, CmsReferenceItem, CmsStoreData } from './types';
import {
  SearchInput, PaginationBar, usePagination, useBulkSelect,
  ConfirmModal, exportCsv, exportPrintHtml,
} from './AdminShared';

type SubTab = 'pricing' | 'references';

export default function AdminDataTables(props: AdminTabProps & { initialSubTab?: SubTab }) {
  const { draft, setDraft, saveAllToCms, isSaving, showNotice, initialSubTab } = props;
  const [sub, setSub] = useState<SubTab>(initialSubTab || 'pricing');
  const [search, setSearch] = useState('');
  const [confirm, setConfirm] = useState<{ title: string; message: string; action: () => void } | null>(null);

  // ── Add New forms ───────────────────────────────────────────────
  const [showAddPricing, setShowAddPricing] = useState(false);
  const [newPricing, setNewPricing] = useState({ code: '', name: '', subtitle: '', pricePerM2: 3000, badge: '', active: true });
  const [isUploadingRef, setIsUploadingRef] = useState(false);

  const addPricingSystem = () => {
    if (!newPricing.name.trim()) { showNotice('error', 'Sistem adı zorunludur.'); return; }
    const id = `sys-${Date.now()}`;
    setDraft(prev => ({ ...prev, pricingSystems: [...prev.pricingSystems, { id, ...newPricing }] }));
    setNewPricing({ code: '', name: '', subtitle: '', pricePerM2: 3000, badge: '', active: true });
    setShowAddPricing(false);
    showNotice('success', 'Yeni fiyat sistemi eklendi. Kaydetmeyi unutmayın.');
  };

  const addReferenceFromFile = async (file: File) => {
    setIsUploadingRef(true);
    try {
      const url = await props.uploadImageFile(file);
      if (!url) { setIsUploadingRef(false); return; }
      const id = `ref-${Date.now()}`;
      const newRef: CmsReferenceItem = {
        id,
        image: url,
        title: '',
        district: '',
        system: '',
        category: '',
        status: 'published',
        featured: true,
      };
      const nextDraft: CmsStoreData = { ...draft, references: [newRef, ...draft.references] };
      setDraft(nextDraft);
      await saveAllToCms(nextDraft, 'Fotoğraf eklendi ve galeriye yayınlandı!');
    } finally {
      setIsUploadingRef(false);
    }
  };

  // ── Pricing helpers ──────────────────────────────────────────────
  const filteredPricing = useMemo(() => {
    const q = search.toLowerCase();
    return draft.pricingSystems.filter(
      s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q),
    );
  }, [draft.pricingSystems, search]);

  const pricingPag = usePagination(filteredPricing, 10);
  const pricingBulk = useBulkSelect(filteredPricing);

  const updatePricing = (id: string, patch: Partial<CmsPricingSystem>) => {
    setDraft(prev => ({
      ...prev,
      pricingSystems: prev.pricingSystems.map(s => (s.id === id ? { ...s, ...patch } : s)),
    }));
  };

  const bulkPricingAdjust = (mode: 'pct' | 'flat', value: number) => {
    setDraft(prev => ({
      ...prev,
      pricingSystems: prev.pricingSystems.map(s => {
        if (!pricingBulk.selected.has(s.id)) return s;
        const next = mode === 'pct'
          ? Math.round((s.pricePerM2 * (1 + value / 100)) / 50) * 50
          : Math.max(500, s.pricePerM2 + value);
        return { ...s, pricePerM2: next };
      }),
    }));
    showNotice('info', `Seçili ${pricingBulk.count} sistem fiyatı güncellendi.`);
  };

  const bulkPricingDelete = () => {
    setConfirm({
      title: 'Toplu Silme',
      message: `${pricingBulk.count} fiyat sistemi silinecek. Emin misiniz?`,
      action: () => {
        setDraft(prev => ({
          ...prev,
          pricingSystems: prev.pricingSystems.filter(s => !pricingBulk.selected.has(s.id)),
        }));
        pricingBulk.clearSelection();
        showNotice('info', 'Seçili fiyat sistemleri silindi.');
        setConfirm(null);
      },
    });
  };

  const exportPricingCsv = () => {
    const headers = ['Kod', 'Sistem Adı', 'Alt Başlık', 'm² Fiyat (₺)', 'Rozet', 'Aktif'];
    const rows = draft.pricingSystems.map(s => [
      s.code, s.name, s.subtitle, String(s.pricePerM2), s.badge, s.active ? 'Evet' : 'Hayır',
    ]);
    exportCsv(headers, rows, `celikpen-fiyatlar-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const printPricingTable = () => {
    const rows = draft.pricingSystems
      .map(s => `<tr><td>${s.code}</td><td>${s.name}</td><td>${s.subtitle}</td><td>${s.pricePerM2.toLocaleString('tr-TR')} ₺</td><td>${s.badge}</td><td>${s.active ? 'Evet' : 'Hayır'}</td></tr>`)
      .join('');
    exportPrintHtml(
      'Çelikpen — m² Birim Fiyatları',
      `<table><thead><tr><th>Kod</th><th>Sistem Adı</th><th>Alt Başlık</th><th>m² Fiyat</th><th>Rozet</th><th>Aktif</th></tr></thead><tbody>${rows}</tbody></table>`,
    );
  };

  // ── Reference helpers ────────────────────────────────────────────
  const moveRef = (id: string, dir: -1 | 1) => {
    setDraft(prev => {
      const refs = [...prev.references];
      const idx = refs.findIndex(r => r.id === id);
      const target = idx + dir;
      if (target < 0 || target >= refs.length) return prev;
      [refs[idx], refs[target]] = [refs[target], refs[idx]];
      return { ...prev, references: refs };
    });
  };

  const deleteRef = (id: string) => {
    setDraft(prev => ({ ...prev, references: prev.references.filter(r => r.id !== id) }));
    showNotice('info', 'Referans silindi. Kaydetmeyi unutmayın.');
  };

  const btn = 'rounded-lg border border-white/10 bg-slate-800 px-2.5 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700';
  const bulkBtn = 'rounded-lg px-3 py-1.5 text-xs font-extrabold';

  return (
    <div className="space-y-5">
      <ConfirmModal
        open={!!confirm}
        title={confirm?.title || ''}
        message={confirm?.message || ''}
        onConfirm={() => confirm?.action()}
        onCancel={() => setConfirm(null)}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">Gelişmiş Veri Tabloları</span>
          <h1 className="mt-1 text-xl font-black text-white">Fiyat & Referans Tabloları — Toplu İşlem & Dışa Aktarım</h1>
        </div>
        <button type="button" onClick={() => void saveAllToCms(draft, 'Tablo değişiklikleri kaydedildi!')} disabled={isSaving}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500 disabled:opacity-50">
          💾 Kaydet
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2">
        {(['pricing', 'references'] as SubTab[]).map(t => (
          <button key={t} type="button" onClick={() => { setSub(t); setSearch(''); pricingBulk.clearSelection(); }}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${sub === t ? 'bg-[#1E3A8A] text-white shadow ring-1 ring-sky-400/30' : 'border border-white/10 bg-slate-900 text-slate-300 hover:bg-white/5'}`}>
            {t === 'pricing' ? `💰 Fiyat Tablosu (${draft.pricingSystems.length})` : `📸 Referans Galerisi (${draft.references.length})`}
          </button>
        ))}
      </div>

      {/* ═══ PRICING TABLE ═══ */}
      {sub === 'pricing' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-72"><SearchInput value={search} onChange={setSearch} placeholder="Sistem adı veya kodu ara..." /></div>
            <button type="button" onClick={() => setShowAddPricing(!showAddPricing)}
              className="rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white shadow ring-1 ring-sky-400/30 hover:bg-[#1D4ED8]">
              + Yeni Sistem Ekle
            </button>
            <button type="button" onClick={exportPricingCsv} className={btn}>⬇ CSV İndir</button>
            <button type="button" onClick={printPricingTable} className={btn}>🖨 Yazdır / PDF</button>
          </div>

          {showAddPricing && (
            <div className="rounded-2xl border border-sky-400/30 bg-slate-900/90 p-5 shadow-lg">
              <h3 className="text-sm font-extrabold text-white">Yeni Fiyat Sistemi Ekle</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <input type="text" placeholder="Kod (ör: Vera Pro)" value={newPricing.code} onChange={e => setNewPricing(p => ({ ...p, code: e.target.value }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                <input type="text" placeholder="Sistem Adı *" value={newPricing.name} onChange={e => setNewPricing(p => ({ ...p, name: e.target.value }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                <input type="text" placeholder="Alt Başlık / Açıklama" value={newPricing.subtitle} onChange={e => setNewPricing(p => ({ ...p, subtitle: e.target.value }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                <input type="number" step={50} min={500} placeholder="m² Fiyat (₺)" value={newPricing.pricePerM2} onChange={e => setNewPricing(p => ({ ...p, pricePerM2: Number(e.target.value) || 0 }))}
                  className="rounded-lg border border-emerald-500/40 bg-slate-950 px-3 py-2 text-xs font-black text-emerald-300 focus:border-emerald-400 focus:outline-none" />
                <input type="text" placeholder="Rozet (ör: Ekonomik)" value={newPricing.badge} onChange={e => setNewPricing(p => ({ ...p, badge: e.target.value }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                <button type="button" onClick={addPricingSystem}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500">Ekle</button>
              </div>
            </div>
          )}

          {pricingBulk.count > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-950/40 px-4 py-2.5">
              <span className="text-xs font-extrabold text-sky-200">{pricingBulk.count} seçili:</span>
              <button type="button" onClick={bulkPricingDelete} className={`${bulkBtn} bg-rose-600 text-white hover:bg-rose-500`}>Toplu Sil</button>
              <button type="button" onClick={() => bulkPricingAdjust('pct', 5)} className={`${bulkBtn} bg-sky-600 text-white hover:bg-sky-500`}>+%5</button>
              <button type="button" onClick={() => bulkPricingAdjust('pct', 10)} className={`${bulkBtn} bg-sky-600 text-white hover:bg-sky-500`}>+%10</button>
              <button type="button" onClick={() => bulkPricingAdjust('flat', 100)} className={`${bulkBtn} bg-emerald-600 text-white hover:bg-emerald-500`}>+100₺</button>
              <button type="button" onClick={() => bulkPricingAdjust('flat', -100)} className={`${bulkBtn} bg-amber-600 text-white hover:bg-amber-500`}>-100₺</button>
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0F172A]">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="p-3"><input type="checkbox" checked={pricingBulk.allSelected} onChange={pricingBulk.toggleAll} className="accent-sky-500" /></th>
                  <th className="p-3">Kod</th><th className="p-3">Sistem Adı</th><th className="p-3">Alt Başlık</th>
                  <th className="p-3">m² Fiyat</th><th className="p-3">Rozet</th><th className="p-3">Aktif</th><th className="p-3">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {pricingPag.paged.map(sys => (
                  <tr key={sys.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-3"><input type="checkbox" checked={pricingBulk.selected.has(sys.id)} onChange={() => pricingBulk.toggleOne(sys.id)} className="accent-sky-500" /></td>
                    <td className="p-3"><span className="rounded bg-[#1E3A8A] px-2 py-0.5 text-[10px] font-extrabold text-sky-200">{sys.code}</span></td>
                    <td className="p-3 font-bold text-white">{sys.name}</td>
                    <td className="p-3 text-slate-400 max-w-[200px] truncate">{sys.subtitle}</td>
                    <td className="p-3">
                      <input type="number" step={50} min={500} value={sys.pricePerM2}
                        onChange={e => updatePricing(sys.id, { pricePerM2: Number(e.target.value) || 0 })}
                        className="w-24 rounded border border-emerald-500/40 bg-slate-950 px-2 py-1 text-sm font-black text-emerald-300 focus:border-emerald-400 focus:outline-none" />
                    </td>
                    <td className="p-3 text-slate-300">{sys.badge}</td>
                    <td className="p-3">
                      <input type="checkbox" checked={sys.active !== false} onChange={e => updatePricing(sys.id, { active: e.target.checked })} className="accent-emerald-500" />
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button type="button" onClick={() => updatePricing(sys.id, { pricePerM2: Math.max(500, sys.pricePerM2 - 100) })} className={btn}>-100₺</button>
                        <button type="button" onClick={() => updatePricing(sys.id, { pricePerM2: sys.pricePerM2 + 100 })} className={btn}>+100₺</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationBar {...pricingPag} />
        </div>
      )}

      {/* ═══ REFERENCES — SQUARE PHOTO GRID ═══ */}
      {sub === 'references' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className={`cursor-pointer rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white shadow ring-1 ring-sky-400/30 hover:bg-[#1D4ED8] ${isUploadingRef ? 'opacity-50 pointer-events-none' : ''}`}>
              {isUploadingRef ? 'Yükleniyor...' : '+ Fotoğraf Ekle'}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) void addReferenceFromFile(f); e.target.value = ''; }} />
            </label>
            <span className="text-xs text-slate-400">{draft.references.length} fotoğraf</span>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {draft.references.map((ref, idx) => (
              <div key={ref.id} className="group rounded-xl border border-white/10 bg-[#0F172A] overflow-hidden">
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ref.image} alt={ref.title || 'Referans'} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
                  <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 transition group-hover:opacity-100">
                    <button type="button" onClick={() => moveRef(ref.id, -1)} disabled={idx === 0}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur hover:bg-black/80 disabled:opacity-30" title="Sola">←</button>
                    <button type="button" onClick={() => moveRef(ref.id, 1)} disabled={idx === draft.references.length - 1}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur hover:bg-black/80 disabled:opacity-30" title="Sağa">→</button>
                    <button type="button" onClick={() => deleteRef(ref.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-600/80 text-xs text-white backdrop-blur hover:bg-rose-600" title="Sil">✕</button>
                  </div>
                </div>
                <div className="p-2">
                  <input type="text" value={ref.title} placeholder="İsim ekle..."
                    onChange={e => {
                      const val = e.target.value;
                      setDraft(prev => ({
                        ...prev,
                        references: prev.references.map(r => r.id === ref.id ? { ...r, title: val } : r),
                      }));
                    }}
                    className="w-full rounded border border-white/10 bg-transparent px-2 py-1 text-[11px] font-semibold text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
