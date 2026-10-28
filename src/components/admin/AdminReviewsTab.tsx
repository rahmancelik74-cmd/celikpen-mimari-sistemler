'use client';

import React, { useState } from 'react';
import type { AdminTabProps, CmsTestimonialItem } from './types';
import { ConfirmModal } from './AdminShared';

const EMPTY_REVIEW: Omit<CmsTestimonialItem, 'id'> = {
  name: '',
  location: '',
  service: '',
  rating: 5,
  comment: '',
  date: new Date().toISOString().slice(0, 10),
};

export default function AdminReviewsTab({ draft, setDraft, saveAllToCms, isSaving, showNotice }: AdminTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Omit<CmsTestimonialItem, 'id'>>(EMPTY_REVIEW);
  const [showAdd, setShowAdd] = useState(false);
  const [newForm, setNewForm] = useState<Omit<CmsTestimonialItem, 'id'>>(EMPTY_REVIEW);
  const [confirm, setConfirm] = useState<{ title: string; message: string; action: () => void } | null>(null);

  const testimonials = draft.testimonials || [];

  const startEdit = (t: CmsTestimonialItem) => {
    setEditingId(t.id);
    setEditForm({ name: t.name, location: t.location, service: t.service, rating: t.rating, comment: t.comment, date: t.date });
  };

  const saveEdit = () => {
    if (!editingId) return;
    setDraft(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === editingId ? { ...t, ...editForm } : t),
    }));
    setEditingId(null);
    showNotice('info', 'Yorum güncellendi. Kaydetmeyi unutmayın.');
  };

  const addReview = () => {
    if (!newForm.name.trim() || !newForm.comment.trim()) {
      showNotice('error', 'Ad ve yorum alanları zorunludur.');
      return;
    }
    const id = `review-${Date.now()}`;
    setDraft(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { id, ...newForm }],
    }));
    setNewForm(EMPTY_REVIEW);
    setShowAdd(false);
    showNotice('success', 'Yeni yorum eklendi. Kaydetmeyi unutmayın.');
  };

  const deleteReview = (id: string) => {
    setDraft(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id),
    }));
    showNotice('info', 'Yorum silindi. Kaydetmeyi unutmayın.');
  };

  const moveReview = (id: string, dir: -1 | 1) => {
    setDraft(prev => {
      const arr = [...prev.testimonials];
      const idx = arr.findIndex(t => t.id === id);
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return prev;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return { ...prev, testimonials: arr };
    });
  };

  const fieldCls = 'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none';

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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">Müşteri Yorumları</span>
          <h1 className="mt-1 text-xl font-black text-white">Yorumları Düzenle ({testimonials.length})</h1>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setShowAdd(!showAdd)}
            className="rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white shadow ring-1 ring-sky-400/30 hover:bg-[#1D4ED8]">
            + Yeni Yorum Ekle
          </button>
          <button type="button" onClick={() => void saveAllToCms(draft, 'Yorumlar kaydedildi!')} disabled={isSaving}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500 disabled:opacity-50">
            Kaydet
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="rounded-2xl border border-sky-400/30 bg-slate-900/90 p-5 shadow-lg">
          <h3 className="text-sm font-extrabold text-white">Yeni Müşteri Yorumu</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <input type="text" placeholder="Ad Soyad *" value={newForm.name} onChange={e => setNewForm(p => ({ ...p, name: e.target.value }))} className={fieldCls} />
            <input type="text" placeholder="İlçe (ör: Bakırköy)" value={newForm.location} onChange={e => setNewForm(p => ({ ...p, location: e.target.value }))} className={fieldCls} />
            <input type="text" placeholder="Hizmet (ör: Cam Balkon)" value={newForm.service} onChange={e => setNewForm(p => ({ ...p, service: e.target.value }))} className={fieldCls} />
            <select value={newForm.rating} onChange={e => setNewForm(p => ({ ...p, rating: Number(e.target.value) }))} className={fieldCls}>
              {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{'★'.repeat(r)}{'☆'.repeat(5 - r)} ({r})</option>)}
            </select>
            <input type="date" value={newForm.date} onChange={e => setNewForm(p => ({ ...p, date: e.target.value }))} className={fieldCls} />
            <button type="button" onClick={addReview}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500">Ekle</button>
          </div>
          <textarea placeholder="Yorum metni *" value={newForm.comment} onChange={e => setNewForm(p => ({ ...p, comment: e.target.value }))}
            rows={3} className={`${fieldCls} mt-3`} />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {testimonials.map((t, idx) => (
          <div key={t.id} className="rounded-2xl border border-white/10 bg-[#0F172A] p-4">
            {editingId === t.id ? (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <input type="text" value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className={fieldCls} placeholder="Ad Soyad" />
                  <input type="text" value={editForm.location} onChange={e => setEditForm(p => ({ ...p, location: e.target.value }))} className={fieldCls} placeholder="İlçe" />
                  <input type="text" value={editForm.service} onChange={e => setEditForm(p => ({ ...p, service: e.target.value }))} className={fieldCls} placeholder="Hizmet" />
                  <select value={editForm.rating} onChange={e => setEditForm(p => ({ ...p, rating: Number(e.target.value) }))} className={fieldCls}>
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{'★'.repeat(r)}{'☆'.repeat(5 - r)} ({r})</option>)}
                  </select>
                  <input type="date" value={editForm.date} onChange={e => setEditForm(p => ({ ...p, date: e.target.value }))} className={fieldCls} />
                </div>
                <textarea value={editForm.comment} onChange={e => setEditForm(p => ({ ...p, comment: e.target.value }))}
                  rows={3} className={fieldCls} placeholder="Yorum" />
                <div className="flex gap-2">
                  <button type="button" onClick={saveEdit}
                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-extrabold text-white hover:bg-emerald-500">Kaydet</button>
                  <button type="button" onClick={() => setEditingId(null)}
                    className="rounded-lg border border-white/15 bg-slate-800 px-4 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-700">İptal</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{t.name}</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-sky-300">{t.location}</span>
                    <span className="rounded bg-[#1E3A8A]/40 px-2 py-0.5 text-[10px] font-bold text-sky-200">{t.service}</span>
                    <span className="text-amber-400 text-xs">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
                    <span className="text-[10px] text-slate-500">{t.date}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{t.comment}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => moveReview(t.id, -1)} disabled={idx === 0}
                    className="rounded-lg border border-white/10 bg-slate-800 px-2 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-30" title="Yukarı">↑</button>
                  <button type="button" onClick={() => moveReview(t.id, 1)} disabled={idx === testimonials.length - 1}
                    className="rounded-lg border border-white/10 bg-slate-800 px-2 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-30" title="Aşağı">↓</button>
                  <button type="button" onClick={() => startEdit(t)}
                    className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-2.5 py-1.5 text-xs font-bold text-sky-300 hover:bg-sky-500/20">Düzenle</button>
                  <button type="button" onClick={() => setConfirm({
                    title: 'Yorumu Sil',
                    message: `"${t.name}" yorumu silinecek. Emin misiniz?`,
                    action: () => { deleteReview(t.id); setConfirm(null); },
                  })}
                    className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20">Sil</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/20 bg-[#0F172A] p-10 text-center">
            <p className="text-sm text-slate-400">Henüz müşteri yorumu eklenmemiş.</p>
            <button type="button" onClick={() => setShowAdd(true)}
              className="mt-3 rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#1D4ED8]">
              + İlk Yorumu Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
