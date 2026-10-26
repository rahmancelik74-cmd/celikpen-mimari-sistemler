'use client';

import React, { useState } from 'react';
import type { AdminTabProps, CmsStoreData, UserRole } from './types';
import { ROLE_LABELS } from '../../lib/cms';
import { ConfirmModal } from './AdminShared';

const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  editor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  moderator: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
};

const ROLE_DESCS: Record<UserRole, string> = {
  super_admin: 'Fiyat, ayarlar, kullanıcılar, loglar, yayın, içerik, medya, referanslar, talepler, blog, katalog',
  editor: 'İçerik, medya, referanslar, blog, katalog',
  moderator: 'Talep onaylama, içerik onaylama',
};

export default function AdminSecurityTab({ draft, setDraft, saveAllToCms, isSaving, showNotice }: AdminTabProps) {
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [pwForm, setPwForm] = useState({ userId: '', newPassword: '' });

  const updateUser = (userId: string, patch: Record<string, unknown>) => {
    setDraft((prev: CmsStoreData) => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? { ...u, ...patch } : u),
    }));
  };

  const addUser = () => {
    const id = `user-${Date.now()}`;
    setDraft((prev: CmsStoreData) => ({
      ...prev,
      users: [...prev.users, {
        id, name: 'Yeni Kullanıcı', email: '', password: 'celikpen2026',
        role: 'editor' as UserRole, twoFactorEnabled: false, twoFactorPin: '202630',
        createdAt: new Date().toISOString(),
      }],
    }));
    setEditingUserId(id);
    showNotice('info', 'Yeni kullanıcı eklendi. Bilgileri doldurup kaydedin.');
  };

  const deleteUser = (userId: string) => {
    setDraft((prev: CmsStoreData) => ({
      ...prev,
      users: prev.users.filter(u => u.id !== userId),
    }));
    setConfirmDelete(null);
    showNotice('info', 'Kullanıcı silindi. Kaydetmeyi unutmayın.');
  };

  const removeSession = (sessionId: string) => {
    setDraft((prev: CmsStoreData) => ({
      ...prev,
      sessions: prev.sessions.filter(s => s.id !== sessionId),
    }));
    showNotice('info', 'Oturum sonlandırıldı.');
  };

  const changePassword = () => {
    if (!pwForm.userId || pwForm.newPassword.length < 6) {
      showNotice('error', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }
    updateUser(pwForm.userId, { password: pwForm.newPassword });
    void saveAllToCms(undefined, 'Şifre başarıyla güncellendi!');
    setPwForm({ userId: '', newPassword: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">RBAC & 2FA Yönetimi</span>
          <h1 className="mt-1 text-xl font-black text-white">Güvenlik &amp; Kullanıcı Yönetimi</h1>
          <p className="mt-1 text-xs text-slate-400">Rol tabanlı erişim kontrolü (RBAC), iki faktörlü doğrulama ve aktif oturum yönetimi.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={addUser}
            className="rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-[#1D4ED8]">
            + Kullanıcı Ekle
          </button>
          <button type="button" onClick={() => void saveAllToCms(undefined, 'Güvenlik ayarları kaydedildi!')} disabled={isSaving}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500 disabled:opacity-50">
            {isSaving ? 'Kaydediliyor...' : '💾 Kaydet'}
          </button>
        </div>
      </div>

      {/* Role Descriptions */}
      <div className="grid gap-3 sm:grid-cols-3">
        {(['super_admin', 'editor', 'moderator'] as UserRole[]).map(role => (
          <div key={role} className="rounded-2xl border border-white/10 bg-[#0F172A] p-4">
            <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${ROLE_COLORS[role]}`}>
              {ROLE_LABELS[role]}
            </span>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{ROLE_DESCS[role]}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <h2 className="text-sm font-extrabold text-white">Kayıtlı Kullanıcılar ({draft.users.length})</h2>
        <div className="mt-4 space-y-3">
          {draft.users.map(user => {
            const isEditing = editingUserId === user.id;
            return (
              <div key={user.id} className="rounded-xl border border-white/10 bg-slate-900 p-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400">Ad</label>
                        <input type="text" value={user.name} onChange={e => updateUser(user.id, { name: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400">E-posta</label>
                        <input type="email" value={user.email} onChange={e => updateUser(user.id, { email: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400">Rol</label>
                        <select value={user.role} onChange={e => updateUser(user.id, { role: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none">
                          <option value="super_admin">Süper Admin</option>
                          <option value="editor">Editör</option>
                          <option value="moderator">Moderatör</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400">Şifre</label>
                        <input type="text" value={user.password} onChange={e => updateUser(user.id, { password: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:border-sky-400 focus:outline-none" />
                      </div>
                    </div>
                    {/* 2FA row */}
                    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-white/5 bg-slate-950/50 px-4 py-3">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <input type="checkbox" checked={user.twoFactorEnabled}
                          onChange={e => updateUser(user.id, { twoFactorEnabled: e.target.checked })}
                          className="h-4 w-4 accent-emerald-500" />
                        2FA Aktif
                      </label>
                      {user.twoFactorEnabled && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400">PIN:</span>
                          <input type="text" value={user.twoFactorPin} maxLength={6}
                            onChange={e => updateUser(user.id, { twoFactorPin: e.target.value })}
                            className="w-24 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs font-mono text-emerald-300 focus:border-sky-400 focus:outline-none" />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setEditingUserId(null)}
                        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/5">Kapat</button>
                      <button type="button" onClick={() => { setEditingUserId(null); void saveAllToCms(undefined, 'Kullanıcı bilgileri güncellendi!'); }}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-extrabold text-white hover:bg-emerald-500">Kaydet</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A8A]/30 text-sm font-black text-sky-300">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{user.name}</div>
                        <div className="text-[11px] text-slate-400">{user.email || '—'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${ROLE_COLORS[user.role]}`}>
                        {ROLE_LABELS[user.role]}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${user.twoFactorEnabled ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700/50 text-slate-400'}`}>
                        2FA: {user.twoFactorEnabled ? 'Aktif' : 'Kapalı'}
                      </span>
                      <button type="button" onClick={() => setEditingUserId(user.id)}
                        className="rounded-lg bg-[#1E3A8A] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1D4ED8]">Düzenle</button>
                      <button type="button" onClick={() => setConfirmDelete(user.id)}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20">Sil</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <h2 className="text-sm font-extrabold text-white">Aktif Oturumlar</h2>
        {draft.sessions.length === 0 ? (
          <div className="mt-4 rounded-xl border border-white/5 bg-slate-900/50 px-4 py-8 text-center">
            <p className="text-xs text-slate-400">Aktif oturum bulunmuyor.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {draft.sessions.map(s => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-300">
                    {s.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{s.userName} <span className={`ml-1 inline-flex rounded-full border px-1.5 py-px text-[9px] font-extrabold ${ROLE_COLORS[s.role]}`}>{ROLE_LABELS[s.role]}</span></div>
                    <div className="text-[10px] text-slate-400">{s.device} &middot; {s.ip} &middot; {new Date(s.loginAt).toLocaleString('tr-TR')}</div>
                  </div>
                </div>
                <button type="button" onClick={() => removeSession(s.id)}
                  className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20">
                  Oturumu Sonlandır
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Password Change */}
      <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <h2 className="text-sm font-extrabold text-white">Şifre Değiştir</h2>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400">Kullanıcı</label>
            <select value={pwForm.userId} onChange={e => setPwForm(p => ({ ...p, userId: e.target.value }))}
              className="mt-1 w-48 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none">
              <option value="">Seçin...</option>
              {draft.users.map(u => <option key={u.id} value={u.id}>{u.name} ({ROLE_LABELS[u.role]})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400">Yeni Şifre</label>
            <input type="password" value={pwForm.newPassword} onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))}
              placeholder="En az 6 karakter"
              className="mt-1 w-48 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none" />
          </div>
          <button type="button" onClick={changePassword}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500">
            Şifreyi Güncelle
          </button>
        </div>
      </div>

      <ConfirmModal
        open={!!confirmDelete}
        title="Kullanıcıyı Sil"
        message="Bu kullanıcıyı kalıcı olarak silmek istediğinize emin misiniz?"
        onConfirm={() => confirmDelete && deleteUser(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
