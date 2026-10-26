'use client';

import React, { useState, useMemo } from 'react';
import type { AdminTabProps, CmsPricingSystem, CmsReferenceItem, CmsStoreData } from './types';
import {
  SearchInput, PaginationBar, usePagination, useBulkSelect,
  StatusBadge, ConfirmModal, exportCsv, exportPrintHtml,
} from './AdminShared';

type SubTab = 'pricing' | 'references';

export default function AdminDataTables(props: AdminTabProps & { initialSubTab?: SubTab }) {
  const { draft, setDraft, saveAllToCms, isSaving, showNotice, initialSubTab } = props;
  const [sub, setSub] = useState<SubTab>(initialSubTab || 'pricing');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [confirm, setConfirm] = useState<{ title: string; message: string; action: () => void } | null>(null);

  // ── Add New forms ───────────────────────────────────────────────
  const [showAddPricing, setShowAddPricing] = useState(false);
  const [newPricing, setNewPricing] = useState({ code: '', name: '', subtitle: '', pricePerM2: 3000, badge: '', active: true });
  const [showAddRef, setShowAddRef] = useState(false);
  const [newRef, setNewRef] = useState<{ title: string; district: string; system: string; category: string; image: string; status: 'published' | 'draft' }>({ title: '', district: 'Bahçelievler / Kocasinan Merkez', system: 'Winsa Vera Termal', category: 'Isıcamlı Cam Balkon', image: '/images/references/ref-1.jpg', status: 'published' });

  const addPricingSystem = () => {
    if (!newPricing.name.trim()) { showNotice('error', 'Sistem adı zorunludur.'); return; }
    const id = `sys-${Date.now()}`;
    setDraft(prev => ({ ...prev, pricingSystems: [...prev.pricingSystems, { id, ...newPricing }] }));
    setNewPricing({ code: '', name: '', subtitle: '', pricePerM2: 3000, badge: '', active: true });
    setShowAddPricing(false);
    showNotice('success', 'Yeni fiyat sistemi eklendi. Kaydetmeyi unutmayın.');
  };

  const addReference = async () => {
    if (!newRef.title.trim()) { showNotice('error', 'Proje başlığı zorunludur.'); return; }
    const id = `ref-${Date.now()}`;
    const nextDraft: CmsStoreData = { ...draft, references: [{ id, ...newRef, featured: true }, ...draft.references] };
    setDraft(nextDraft);
    setNewRef({ title: '', district: 'Bahçelievler / Kocasinan Merkez', system: 'Winsa Vera Termal', category: 'Isıcamlı Cam Balkon', image: '/images/references/ref-1.jpg', status: 'published' });
    setShowAddRef(false);
    await saveAllToCms(nextDraft, 'Yeni referans eklendi ve galeriye yayınlandı!');
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
  const categories = useMemo(
    () => [...new Set(draft.references.map(r => r.category))].sort(),
    [draft.references],
  );

  const filteredRefs = useMemo(() => {
    const q = search.toLowerCase();
    return draft.references.filter(r => {
      if (q && !r.title.toLowerCase().includes(q) && !r.district.toLowerCase().includes(q)) return false;
      if (catFilter && r.category !== catFilter) return false;
      if (statusFilter && (r.status || 'published') !== statusFilter) return false;
      return true;
    });
  }, [draft.references, search, catFilter, statusFilter]);

  const refPag = usePagination(filteredRefs, 10);
  const refBulk = useBulkSelect(filteredRefs);

  const bulkRefStatus = (status: 'published' | 'draft' | 'archived') => {
    setDraft(prev => ({
      ...prev,
      references: prev.references.map(r =>
        refBulk.selected.has(r.id) ? { ...r, status } : r,
      ),
    }));
    refBulk.clearSelection();
    showNotice('info', `Seçili referanslar "${status}" olarak güncellendi.`);
  };

  const bulkRefDelete = () => {
    setConfirm({
      title: 'Toplu Silme',
      message: `${refBulk.count} referans silinecek. Emin misiniz?`,
      action: () => {
        setDraft(prev => ({
          ...prev,
          references: prev.references.filter(r => !refBulk.selected.has(r.id)),
        }));
        refBulk.clearSelection();
        showNotice('info', 'Seçili referanslar silindi.');
        setConfirm(null);
      },
    });
  };

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

  const exportRefCsv = () => {
    const headers = ['Başlık', 'İlçe', 'Sistem', 'Kategori', 'Durum'];
    const rows = draft.references.map(r => [r.title, r.district, r.system, r.category, r.status || 'published']);
    exportCsv(headers, rows, `celikpen-referanslar-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const printRefTable = () => {
    const rows = draft.references
      .map(r => `<tr><td>${r.title}</td><td>${r.district}</td><td>${r.system}</td><td>${r.category}</td><td>${r.status || 'published'}</td></tr>`)
      .join('');
    exportPrintHtml(
      'Çelikpen — Referans Projeleri',
      `<table><thead><tr><th>Başlık</th><th>İlçe</th><th>Sistem</th><th>Kategori</th><th>Durum</th></tr></thead><tbody>${rows}</tbody></table>`,
    );
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
          <button key={t} type="button" onClick={() => { setSub(t); setSearch(''); setCatFilter(''); setStatusFilter(''); pricingBulk.clearSelection(); refBulk.clearSelection(); }}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition ${sub === t ? 'bg-[#1E3A8A] text-white shadow ring-1 ring-sky-400/30' : 'border border-white/10 bg-slate-900 text-slate-300 hover:bg-white/5'}`}>
            {t === 'pricing' ? `💰 Fiyat Tablosu (${draft.pricingSystems.length})` : `📸 Referans Tablosu (${draft.references.length})`}
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

      {/* ═══ REFERENCES TABLE ═══ */}
      {sub === 'references' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-72"><SearchInput value={search} onChange={setSearch} placeholder="Başlık veya ilçe ara..." /></div>
            <button type="button" onClick={() => setShowAddRef(!showAddRef)}
              className="rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white shadow ring-1 ring-sky-400/30 hover:bg-[#1D4ED8]">
              + Yeni Referans Projesi Ekle
            </button>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white">
              <option value="">Tüm Kategoriler</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white">
              <option value="">Tüm Durumlar</option>
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
              <option value="archived">Arşiv</option>
            </select>
            <button type="button" onClick={exportRefCsv} className={btn}>⬇ CSV İndir</button>
            <button type="button" onClick={printRefTable} className={btn}>🖨 Yazdır / PDF</button>
          </div>

          {showAddRef && (
            <div className="rounded-2xl border border-sky-400/30 bg-slate-900/90 p-5 shadow-lg">
              <h3 className="text-sm font-extrabold text-white">Yeni Referans Projesi Ekle</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <input type="text" placeholder="Proje Başlığı *" value={newRef.title} onChange={e => setNewRef(p => ({ ...p, title: e.target.value }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                <input type="text" placeholder="İlçe / Mahalle" value={newRef.district} onChange={e => setNewRef(p => ({ ...p, district: e.target.value }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                <input type="text" placeholder="Uygulanan Sistem" value={newRef.system} onChange={e => setNewRef(p => ({ ...p, system: e.target.value }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                <input type="text" placeholder="Kategori" value={newRef.category} onChange={e => setNewRef(p => ({ ...p, category: e.target.value }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
                <select value={newRef.status} onChange={e => setNewRef(p => ({ ...p, status: e.target.value as 'published' | 'draft' }))}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none">
                  <option value="published">Yayında</option>
                  <option value="draft">Taslak</option>
                </select>
                <div className="flex items-center gap-2">
                  <input type="text" value={newRef.image} onChange={e => setNewRef(p => ({ ...p, image: e.target.value }))}
                    className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-[10px] font-mono text-sky-300 focus:border-sky-400 focus:outline-none" />
                  <label className="shrink-0 cursor-pointer rounded-lg bg-sky-600 px-3 py-2 text-[10px] font-bold text-white hover:bg-sky-500">
                    <span>Yükle</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                      onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const u = await props.uploadImageFile(f); if (u) setNewRef(p => ({ ...p, image: u })); }} />
                  </label>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button type="button" onClick={() => void addReference()}
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500">Referansı Kaydet ve Ekle</button>
              </div>
            </div>
          )}

          {refBulk.count > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-950/40 px-4 py-2.5">
              <span className="text-xs font-extrabold text-sky-200">{refBulk.count} seçili:</span>
              <button type="button" onClick={bulkRefDelete} className={`${bulkBtn} bg-rose-600 text-white hover:bg-rose-500`}>Toplu Sil</button>
              <button type="button" onClick={() => bulkRefStatus('published')} className={`${bulkBtn} bg-emerald-600 text-white hover:bg-emerald-500`}>Toplu Yayınla</button>
              <button type="button" onClick={() => bulkRefStatus('draft')} className={`${bulkBtn} bg-amber-600 text-white hover:bg-amber-500`}>Toplu Taslak</button>
              <button type="button" onClick={() => bulkRefStatus('archived')} className={`${bulkBtn} bg-slate-600 text-white hover:bg-slate-500`}>Toplu Arşivle</button>
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0F172A]">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="p-3"><input type="checkbox" checked={refBulk.allSelected} onChange={refBulk.toggleAll} className="accent-sky-500" /></th>
                  <th className="p-3">Görsel</th><th className="p-3">Başlık</th><th className="p-3">İlçe</th>
                  <th className="p-3">Sistem</th><th className="p-3">Kategori</th><th className="p-3">Durum</th><th className="p-3">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {refPag.paged.map(ref => (
                  <tr key={ref.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-3"><input type="checkbox" checked={refBulk.selected.has(ref.id)} onChange={() => refBulk.toggleOne(ref.id)} className="accent-sky-500" /></td>
                    <td className="p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ref.image} alt={ref.title} className="h-10 w-14 rounded object-cover" />
                    </td>
                    <td className="p-3 font-bold text-white max-w-[180px] truncate">{ref.title}</td>
                    <td className="p-3 text-slate-300">{ref.district}</td>
                    <td className="p-3 text-slate-400 max-w-[160px] truncate">{ref.system}</td>
                    <td className="p-3"><span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-sky-300">{ref.category}</span></td>
                    <td className="p-3"><StatusBadge status={ref.status || 'published'} /></td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button type="button" onClick={() => moveRef(ref.id, -1)} className={btn} title="Yukarı">↑</button>
                        <button type="button" onClick={() => moveRef(ref.id, 1)} className={btn} title="Aşağı">↓</button>
                        <button type="button" onClick={() => deleteRef(ref.id)}
                          className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20">Sil</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationBar {...refPag} />
        </div>
      )}
    </div>
  );
}
