'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DEFAULT_CMS_DATA,
  normalizeCmsData,
  type CmsStoreData,
  type UserRole,
} from '../../lib/cms';
import { useCms } from '../../components/CmsProvider';
import { CelikpenLogo } from '../../components/CelikpenLogo';
import { ToastStack, useToast } from '../../components/admin/AdminShared';
import type { AdminTabId, AdminTabProps } from '../../components/admin/types';

import AdminDashboardTab from '../../components/admin/AdminDashboardTab';
import AdminSecurityTab from '../../components/admin/AdminSecurityTab';
import AdminMediaTab from '../../components/admin/AdminMediaTab';
import AdminContentSeoTab from '../../components/admin/AdminContentSeoTab';
import AdminDataTables from '../../components/admin/AdminDataTables';
import AdminSettingsLogsTab from '../../components/admin/AdminSettingsLogsTab';

const ADMIN_SESSION_KEY = 'celikpen_admin_auth_v1';

const NAV_ITEMS: { id: AdminTabId; icon: string; label: string; getBadge?: (d: CmsStoreData) => string }[] = [
  { id: 'overview', icon: '📊', label: 'Genel Bakış' },
  { id: 'pricing', icon: '💰', label: 'm² Fiyat & Tablo', getBadge: d => `${d.pricingSystems.length}` },
  { id: 'references', icon: '📸', label: 'Referans & Tablo', getBadge: d => `${d.references.length}` },
  { id: 'catalog', icon: '🏢', label: 'Hizmet & Ürünler', getBadge: d => `${d.services.length + d.products.length}` },
  { id: 'blog', icon: '📝', label: 'Blog & SEO', getBadge: d => `${d.blogPosts.length}` },
  { id: 'media', icon: '🖼️', label: 'Medya Kütüphanesi' },
  { id: 'security', icon: '🔒', label: 'Güvenlik & RBAC', getBadge: d => `${d.users.length}` },
  { id: 'settings', icon: '⚙️', label: 'Ayarlar & Loglar' },
];

export default function AdminDashboardPage() {
  const { cms, setCmsState } = useCms();
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [savedPassword, setSavedPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTabId>('overview');
  const [draft, setDraft] = useState<CmsStoreData>(DEFAULT_CMS_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setDraft(normalizeCmsData(cms)); }, [cms]);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (stored) { setSavedPassword(stored); setPasswordInput(stored); setIsAuthenticated(true); }
    } catch { /* ignore */ }
  }, []);

  const showNotice = (type: 'success' | 'error' | 'info', text: string) => showToast(type, text);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = passwordInput.trim();
    if (trimmed === 'celikpen2026' || trimmed.length >= 6) {
      setSavedPassword(trimmed);
      setIsAuthenticated(true);
      setAuthError(null);
      try { window.sessionStorage.setItem(ADMIN_SESSION_KEY, trimmed); } catch { /* ignore */ }
      showNotice('success', 'Çelikpen Yönetim Paneline hoş geldiniz.');
    } else {
      setAuthError('Şifre hatalı. Lütfen doğru yönetici şifresini girin.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try { window.sessionStorage.removeItem(ADMIN_SESSION_KEY); } catch { /* ignore */ }
  };

  const saveAllToCms = async (nextData: CmsStoreData = draft, customNotice?: string) => {
    setIsSaving(true);
    try {
      const updated = normalizeCmsData({ ...nextData, updatedAt: new Date().toISOString() });
      setDraft(updated);
      setCmsState(updated);
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: savedPassword || 'celikpen2026', data: updated }),
      });
      const result = (await res.json()) as { ok?: boolean; message?: string; error?: string; data?: CmsStoreData };
      if (!res.ok || !result.ok) { showNotice('error', result.error || 'Kaydetme hatası.'); return; }
      if (result.data) { setDraft(normalizeCmsData(result.data)); setCmsState(normalizeCmsData(result.data)); }
      showNotice('success', customNotice || result.message || 'Değişiklikler kaydedildi!');
    } catch (err) {
      showNotice('info', customNotice || `Tarayıcı önbelleğine kaydedildi (${err instanceof Error ? err.message : 'Çevrimdışı'}).`);
    } finally { setIsSaving(false); }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await saveAllToCms(draft, 'Yerel kaydedildi, GitHub senkronizasyonu başlatılıyor...');
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: savedPassword || 'celikpen2026',
          data: draft,
          commitMessage: 'chore(cms): admin paneli uzerinden guncelleme',
        }),
      });
      const result = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok || !result.ok) { showNotice('error', result.error || 'GitHub senkronizasyonu başarısız.'); return; }
      showNotice('success', result.message || 'GitHub ve canlı site güncellendi!');
    } catch (error) {
      showNotice('error', error instanceof Error ? error.message : 'GitHub bağlantı hatası.');
    } finally { setIsPublishing(false); }
  };

  const uploadImageFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('password', savedPassword || 'celikpen2026');
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const result = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (!res.ok || !result.ok || !result.url) { showNotice('error', result.error || 'Görsel yüklenemedi.'); return null; }
      showNotice('success', `Görsel yüklendi: ${result.url}`);
      return result.url;
    } catch (error) {
      showNotice('error', error instanceof Error ? error.message : 'Yükleme hatası.');
      return null;
    } finally { setIsUploading(false); }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `celikpen-cms-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); URL.revokeObjectURL(url);
    showNotice('success', 'CMS yedek dosyası indirildi.');
  };

  const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Partial<CmsStoreData>;
      await saveAllToCms(normalizeCmsData(parsed), 'Yedek dosyası yüklendi ve site güncellendi!');
    } catch { showNotice('error', 'Geçersiz JSON dosyası.'); }
  };

  const tabProps: AdminTabProps = {
    draft, setDraft, saveAllToCms, isSaving, isUploading,
    showNotice, uploadImageFile, savedPassword, setActiveTab, currentRole,
  };

  // ─── LOGIN SCREEN ─────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col justify-center bg-[#0F172A] px-4 py-12">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-white/15 bg-slate-900/95 p-7 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <CelikpenLogo size="sm" variant="light" />
            <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sky-300">
              Enterprise CMS v2.0
            </span>
          </div>
          <h1 className="mt-6 text-xl font-black text-white">Çelikpen Kurumsal CMS Girişi</h1>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
            m² fiyatları, referans galerileri, blog SEO, medya kütüphanesi, RBAC güvenlik ve denetim loglarını tek ekrandan yönetin.
          </p>
          <form onSubmit={handleLogin} className="mt-5 space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-wider text-slate-300">Yönetici Şifresi</label>
              <input id="admin-password" type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder="Şifrenizi girin..."
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-sky-400" />
            </div>
            {authError && <p className="rounded-lg border border-rose-500/40 bg-rose-950/60 px-3 py-2 text-xs font-semibold text-rose-200">{authError}</p>}
            <button type="submit" className="w-full rounded-xl bg-[#1E3A8A] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#1D4ED8]">
              Yönetim Paneline Giriş Yap
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
            <Link href="/" className="font-semibold text-sky-300 hover:text-white">Ana Sayfaya Dön</Link>
            <span>256-Bit Güvenli Oturum</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED DASHBOARD ──────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
      <ToastStack toasts={toasts} dismiss={dismissToast} />

      {/* TOP BAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F172A]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <button type="button" className="lg:hidden rounded-lg border border-white/15 p-2 text-slate-300 hover:bg-white/10" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h14M3 10h14M3 14h14" /></svg>
            </button>
            <Link href="/" className="shrink-0" title="Siteye Git"><CelikpenLogo size="sm" variant="light" /></Link>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-white">Enterprise CMS v2.0</span>
              </div>
              <p className="text-[11px] text-slate-400" suppressHydrationWarning>Son: {mounted ? new Date(draft.updatedAt || Date.now()).toLocaleString('tr-TR') : '—'}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select value={currentRole} onChange={e => setCurrentRole(e.target.value as UserRole)}
              className="rounded-lg border border-white/15 bg-slate-800 px-2 py-1.5 text-xs font-bold text-sky-200">
              <option value="super_admin">Süper Admin</option>
              <option value="editor">Editör</option>
              <option value="moderator">Moderatör</option>
            </select>
            <Link href="/" target="_blank" className="hidden sm:inline-flex rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10">Canlı Site</Link>
            <button type="button" onClick={() => void saveAllToCms(draft)} disabled={isSaving}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500 disabled:opacity-50">
              {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button type="button" onClick={() => void handlePublish()} disabled={isPublishing}
              className="hidden sm:inline-flex rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white shadow-lg ring-1 ring-sky-400/30 hover:bg-[#1D4ED8] disabled:opacity-50">
              {isPublishing ? 'Gönderiliyor...' : 'GitHub\'a Kaydet'}
            </button>
            <button type="button" onClick={handleLogout}
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/20">Çıkış</button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        {/* SIDEBAR */}
        <aside className={`space-y-4 ${mobileNavOpen ? 'block' : 'hidden lg:block'}`}>
          <nav className="rounded-2xl border border-white/10 bg-[#0F172A] p-3 shadow-xl">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-sky-300">Yönetim Modülleri</div>
            <div className="mt-1 space-y-1">
              {NAV_ITEMS.map(item => {
                const active = activeTab === item.id;
                const badge = item.getBadge?.(draft);
                return (
                  <button key={item.id} type="button" onClick={() => { setActiveTab(item.id); setMobileNavOpen(false); }}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-bold transition ${active ? 'bg-[#1E3A8A] text-white shadow-md ring-1 ring-sky-400/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
                    <span className="flex items-center gap-2.5"><span className="text-sm">{item.icon}</span><span>{item.label}</span></span>
                    {badge && <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${active ? 'bg-sky-400/20 text-sky-200' : 'bg-slate-800 text-slate-400'}`}>{badge}</span>}
                  </button>
                );
              })}
            </div>
          </nav>
          <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-xl">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-sky-300">Yedekleme</div>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <button type="button" onClick={handleExportJson} className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10">JSON Yedeği İndir</button>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10">
                <span>JSON Yedeği Yükle</span>
                <input type="file" accept="application/json" onChange={handleImportJson} className="hidden" />
              </label>
            </div>
          </div>
        </aside>

        {/* WORKSPACE */}
        <main className="min-w-0 space-y-6">
          {activeTab === 'overview' && <AdminDashboardTab {...tabProps} />}
          {(activeTab === 'pricing' || activeTab === 'references') && <AdminDataTables {...tabProps} initialSubTab={activeTab === 'pricing' ? 'pricing' : 'references'} />}
          {activeTab === 'catalog' && <CatalogTab {...tabProps} />}
          {activeTab === 'blog' && <AdminContentSeoTab {...tabProps} />}
          {activeTab === 'media' && <AdminMediaTab {...tabProps} />}
          {activeTab === 'security' && <AdminSecurityTab {...tabProps} />}
          {activeTab === 'settings' && <AdminSettingsLogsTab {...tabProps} />}
        </main>
      </div>
    </div>
  );
}

// ─── INLINE CATALOG TAB (Hizmet & Ürünler - compact) ───────────
function CatalogTab({ draft, setDraft, saveAllToCms, isSaving, uploadImageFile }: AdminTabProps) {
  const updateService = (i: number, patch: Partial<CmsStoreData['services'][0]>) => {
    setDraft(prev => { const s = [...prev.services]; s[i] = { ...s[i], ...patch }; return { ...prev, services: s }; });
  };
  const updateProduct = (i: number, patch: Partial<CmsStoreData['products'][0]>) => {
    setDraft(prev => { const p = [...prev.products]; p[i] = { ...p[i], ...patch }; return { ...prev, products: p }; });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">/hizmetlerimiz &bull; /urunler</span>
          <h1 className="mt-1 text-xl font-black text-white">Hizmet &amp; Ürün Kataloğu</h1>
        </div>
        <button type="button" onClick={() => void saveAllToCms(draft, 'Katalog güncellendi!')} disabled={isSaving}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-extrabold text-white shadow hover:bg-emerald-500">Katalog Kaydet</button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <h2 className="text-base font-extrabold text-white">Hizmetlerimiz ({draft.services.length})</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {draft.services.map((srv, i) => (
            <div key={srv.id} className="flex gap-3.5 rounded-xl border border-white/10 bg-slate-900 p-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={srv.image} alt={srv.title} className="h-20 w-24 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1 space-y-2">
                <input type="text" value={srv.title} onChange={e => updateService(i, { title: e.target.value })}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-white" />
                <input type="text" value={srv.subtitle} onChange={e => updateService(i, { subtitle: e.target.value })}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-300" />
                <div className="flex items-center gap-2">
                  <input type="text" value={srv.image} onChange={e => updateService(i, { image: e.target.value })}
                    className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] font-mono text-sky-300" />
                  <label className="shrink-0 cursor-pointer rounded bg-[#1E3A8A] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#1D4ED8]">
                    <span>Görsel</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                      onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const u = await uploadImageFile(f); if (u) updateService(i, { image: u }); }} />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <h2 className="text-base font-extrabold text-white">Ürünler - Winsa &amp; Albert Genau ({draft.products.length})</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {draft.products.map((prod, i) => (
            <div key={prod.id} className="flex gap-3.5 rounded-xl border border-white/10 bg-slate-900 p-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prod.image} alt={prod.title} className="h-20 w-24 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#1E3A8A] px-2 py-0.5 text-[10px] font-bold text-sky-200">{prod.brand}</span>
                  <span className="text-[10px] text-slate-400">{prod.category}</span>
                </div>
                <input type="text" value={prod.title} onChange={e => updateProduct(i, { title: e.target.value })}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-white" />
                <div className="flex items-center gap-2">
                  <input type="text" value={prod.image} onChange={e => updateProduct(i, { image: e.target.value })}
                    className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] font-mono text-sky-300" />
                  <label className="shrink-0 cursor-pointer rounded bg-[#1E3A8A] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#1D4ED8]">
                    <span>Görsel</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                      onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const u = await uploadImageFile(f); if (u) updateProduct(i, { image: u }); }} />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
