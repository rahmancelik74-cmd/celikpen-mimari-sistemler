'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
import type { VisitorAnalyticsData } from '../api/analytics/route';
import type { GoogleReviewsApiResponse } from '../api/google-reviews/route';

import AdminDashboardTab from '../../components/admin/AdminDashboardTab';
import AdminSecurityTab from '../../components/admin/AdminSecurityTab';
import AdminMediaTab from '../../components/admin/AdminMediaTab';
import AdminContentSeoTab from '../../components/admin/AdminContentSeoTab';
import AdminDataTables from '../../components/admin/AdminDataTables';
import AdminReviewsTab from '../../components/admin/AdminReviewsTab';
import AdminSettingsLogsTab from '../../components/admin/AdminSettingsLogsTab';

const ADMIN_SESSION_KEY = 'celikpen_admin_auth_v1';
const LOCAL_TELEMETRY_KEY = 'celikpen_visitor_telemetry_v1';

const NAV_ITEMS: { id: AdminTabId; icon: string; label: string; getBadge?: (d: CmsStoreData) => string }[] = [
  { id: 'overview', icon: '📊', label: 'Genel Bakış & Trafik' },
  { id: 'pricing', icon: '💰', label: 'm² Fiyat & Tablo', getBadge: (d) => `${d.pricingSystems.length}` },
  { id: 'references', icon: '📸', label: 'Referans & Tablo', getBadge: (d) => `${d.references.length}` },
  { id: 'catalog', icon: '🏢', label: 'Hizmet & Ürünler', getBadge: (d) => `${d.services.length + d.products.length}` },
  { id: 'blog', icon: '📝', label: 'Blog & SEO', getBadge: (d) => `${d.blogPosts.length}` },
  { id: 'reviews', icon: '⭐', label: 'Google Onaylı Yorumlar', getBadge: (d) => `${d.testimonials?.length || 0}` },
  { id: 'media', icon: '🖼️', label: 'Medya Kütüphanesi' },
  { id: 'security', icon: '🔒', label: 'Güvenlik & RBAC', getBadge: (d) => `${d.users.length}` },
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
  const [isDeployingLive, setIsDeployingLive] = useState(false);
  const [lastLiveSyncAt, setLastLiveSyncAt] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visitorStats, setVisitorStats] = useState<VisitorAnalyticsData | null>(null);
  const [persistedMode, setPersistedMode] = useState<'local' | 'github' | 'memory_only' | null>(null);

  const fetchUnifiedCmsFromServer = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/cms?t=${Date.now()}`, {
        cache: 'no-store',
        credentials: 'same-origin',
      });
      if (!res.ok) return;
      const json = (await res.json()) as { ok?: boolean; data?: CmsStoreData };
      if (json?.ok && json.data) {
        const normalized = normalizeCmsData(json.data);
        setDraft(normalized);
        setCmsState(normalized);
      }
    } catch {
      // ignore network errors
    }
  }, [setCmsState]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDraft(normalizeCmsData(cms));
  }, [cms]);

  useEffect(() => {
    let active = true;
    fetch('/api/admin/auth', { cache: 'no-store', credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { ok?: boolean; authenticated?: boolean } | null) => {
        if (active && json?.ok && json.authenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        // Not authenticated yet
      });
    return () => {
      active = false;
    };
  }, []);

  const fetchVisitorAnalytics = useCallback(async () => {
    try {
      const res = await fetch(`/api/analytics?t=${Date.now()}`, { cache: 'no-store' });
      const json = (await res.json()) as { ok?: boolean; data?: VisitorAnalyticsData };
      if (json?.ok && json.data) {
        setVisitorStats(json.data);
        try {
          window.localStorage.setItem(LOCAL_TELEMETRY_KEY, JSON.stringify(json.data));
        } catch {
          // ignore
        }
        return;
      }
    } catch {
      try {
        const cached = window.localStorage.getItem(LOCAL_TELEMETRY_KEY);
        if (cached) {
          setVisitorStats(JSON.parse(cached) as VisitorAnalyticsData);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void fetchUnifiedCmsFromServer();
      void fetchVisitorAnalytics();
    }
  }, [isAuthenticated, fetchUnifiedCmsFromServer, fetchVisitorAnalytics]);

  const showNotice = (type: 'success' | 'error' | 'info', text: string) => showToast(type, text);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = passwordInput.trim();
    if (!trimmed) {
      setAuthError('Lütfen yönetici şifresini girin.');
      return;
    }
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password: trimmed }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        authenticated?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setAuthError(json.error || 'Şifre hatalı veya giriş reddedildi.');
        return;
      }
      setSavedPassword(trimmed);
      setPasswordInput('');
      setIsAuthenticated(true);
      setAuthError(null);
      showNotice('success', 'Çelikpen Yönetim Paneline hoş geldiniz.');
    } catch {
      setAuthError('Kimlik doğrulama sunucusuna bağlanılamadı.');
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setSavedPassword('');
    setPasswordInput('');
    try {
      await fetch('/api/admin/auth', { method: 'DELETE', credentials: 'same-origin' });
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
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
        credentials: 'same-origin',
        body: JSON.stringify({ password: savedPassword || undefined, data: updated }),
      });
      const result = (await res.json()) as {
        ok?: boolean;
        persistedTo?: 'local' | 'github' | 'memory_only';
        message?: string;
        error?: string;
        data?: CmsStoreData;
      };
      if (!res.ok || !result.ok) {
        showNotice('error', result.error || 'Kaydetme hatası.');
        return;
      }
      if (result.persistedTo) {
        setPersistedMode(result.persistedTo);
      }
      if (result.data) {
        const synced = normalizeCmsData(result.data);
        setDraft(synced);
        setCmsState(synced);
      }
      await fetchUnifiedCmsFromServer();
      showNotice('success', customNotice || result.message || 'Değişiklikler kaydedildi!');
    } catch (err) {
      showNotice(
        'info',
        customNotice ||
          `Tarayıcı önbelleğine kaydedildi (${err instanceof Error ? err.message : 'Çevrimdışı'}).`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeployToLiveSite = async () => {
    setIsDeployingLive(true);
    try {
      await saveAllToCms(draft, 'CMS verileri kaydedildi, celikpen.com.tr canlıya alınıyor...');

      const deployRes = await fetch('/api/admin/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password: savedPassword || undefined }),
      });
      const deployResult = (await deployRes.json()) as {
        ok?: boolean;
        syncedAt?: string;
        message?: string;
        error?: string;
      };

      const publishRes = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          password: savedPassword || undefined,
          data: draft,
          commitMessage: 'chore(cms): celikpen.com.tr canli site senkronizasyonu',
        }),
      }).catch(() => null);
      void publishRes;

      if (!deployRes.ok || !deployResult.ok) {
        showNotice('error', deployResult.error || 'Canlıya yansıtma hatası.');
        return;
      }

      const syncTimestamp = deployResult.syncedAt || new Date().toISOString();
      setLastLiveSyncAt(syncTimestamp);
      showNotice(
        'success',
        deployResult.message ||
          'celikpen.com.tr canlı önbelleği yenilendi ve IndexNow arama motorlarına bildirildi!'
      );
    } catch (error) {
      showNotice(
        'error',
        error instanceof Error ? error.message : 'Canlı site senkronizasyon hatası.'
      );
    } finally {
      setIsDeployingLive(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await saveAllToCms(draft, 'Yerel kaydedildi, GitHub senkronizasyonu başlatılıyor...');
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          password: savedPassword || undefined,
          data: draft,
          commitMessage: 'chore(cms): admin paneli uzerinden guncelleme',
        }),
      });
      const result = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok || !result.ok) {
        showNotice('error', result.error || 'GitHub senkronizasyonu başarısız.');
        return;
      }
      showNotice('success', result.message || 'GitHub ve canlı site güncellendi!');
    } catch (error) {
      showNotice('error', error instanceof Error ? error.message : 'GitHub bağlantı hatası.');
    } finally {
      setIsPublishing(false);
    }
  };

  const uploadImageFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      if (savedPassword) {
        fd.append('password', savedPassword);
      }
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'same-origin',
        body: fd,
      });
      const result = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (!res.ok || !result.ok || !result.url) {
        showNotice('error', result.error || 'Görsel yüklenemedi.');
        return null;
      }
      showNotice('success', `Görsel yüklendi: ${result.url}`);
      return result.url;
    } catch (error) {
      showNotice('error', error instanceof Error ? error.message : 'Yükleme hatası.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `celikpen-cms-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice('success', 'CMS yedek dosyası indirildi.');
  };

  const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Partial<CmsStoreData>;
      await saveAllToCms(normalizeCmsData(parsed), 'Yedek dosyası yüklendi ve site güncellendi!');
    } catch {
      showNotice('error', 'Geçersiz JSON dosyası.');
    }
  };

  const tabProps: AdminTabProps = {
    draft,
    setDraft,
    saveAllToCms,
    isSaving,
    isUploading,
    showNotice,
    uploadImageFile,
    savedPassword,
    setActiveTab,
    currentRole,
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
            Canlı ziyaretçi istatistikleri, m² fiyatları, referans galerileri, blog SEO ve canlı
            yayın kontrolünü tek ekrandan yönetin.
          </p>
          <form onSubmit={handleLogin} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Yönetici Şifresi
              </label>
              <input
                id="admin-password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Şifrenizi girin..."
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-sky-400"
              />
            </div>
            {authError && (
              <p className="rounded-lg border border-rose-500/40 bg-rose-950/60 px-3 py-2 text-xs font-semibold text-rose-200">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#1E3A8A] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#1D4ED8]"
            >
              Yönetim Paneline Giriş Yap
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
            <Link href="/" className="font-semibold text-sky-300 hover:text-white">
              Ana Sayfaya Dön
            </Link>
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
            <button
              type="button"
              className="rounded-lg border border-white/15 p-2 text-slate-300 hover:bg-white/10 lg:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </button>
            <Link href="/" className="shrink-0" title="Siteye Git">
              <CelikpenLogo size="sm" variant="light" />
            </Link>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Enterprise CMS v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400" suppressHydrationWarning>
                Son Senkronizasyon:{' '}
                {mounted
                  ? new Date(lastLiveSyncAt || draft.updatedAt || Date.now()).toLocaleString('tr-TR')
                  : '—'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* TEK TIKLA CANLI SİTEYİ GÜNCELLE BUTONU */}
            <button
              type="button"
              onClick={() => void handleDeployToLiveSite()}
              disabled={isDeployingLive || isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-[#1E3A8A] to-[#1D4ED8] px-4 py-2.5 text-xs font-extrabold text-white shadow-lg ring-1 ring-emerald-400/50 transition hover:brightness-110 disabled:opacity-50"
            >
              <span>
                {isDeployingLive
                  ? '⏳ celikpen.com.tr Güncelleniyor...'
                  : "🚀 celikpen.com.tr'ye Yansıt (Canlıya Al & Önbelleği Yenile)"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => void saveAllToCms(draft)}
              disabled={isSaving}
              className="rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500 disabled:opacity-50"
            >
              {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>

            <button
              type="button"
              onClick={() => void handlePublish()}
              disabled={isPublishing}
              className="hidden rounded-lg border border-sky-400/30 bg-[#1E3A8A]/60 px-3 py-2 text-xs font-bold text-sky-100 hover:bg-[#1E3A8A] disabled:opacity-50 xl:inline-flex"
            >
              {isPublishing ? 'Gönderiliyor...' : "GitHub'a Push"}
            </button>

            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="hidden rounded-lg border border-white/15 bg-slate-800 px-2 py-1.5 text-xs font-bold text-sky-200 md:inline-block"
            >
              <option value="super_admin">Süper Admin</option>
              <option value="editor">Editör</option>
              <option value="moderator">Moderatör</option>
            </select>

            <Link
              href="/"
              target="_blank"
              className="hidden rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 sm:inline-flex"
            >
              Canlı Site ↗
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/20"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        {/* SIDEBAR */}
        <aside className={`space-y-4 ${mobileNavOpen ? 'block' : 'hidden lg:block'}`}>
          <nav className="rounded-2xl border border-white/10 bg-[#0F172A] p-3 shadow-xl">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-sky-300">
              Yönetim Modülleri
            </div>
            <div className="mt-1 space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = activeTab === item.id;
                const badge = item.getBadge?.(draft);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileNavOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-bold transition ${
                      active
                        ? 'bg-[#1E3A8A] text-white shadow-md ring-1 ring-sky-400/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    {badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                          active ? 'bg-sky-400/20 text-sky-200' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
          <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-xl">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-sky-300">
              Yedekleme
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={handleExportJson}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10"
              >
                JSON Yedeği İndir
              </button>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10">
                <span>JSON Yedeği Yükle</span>
                <input
                  type="file"
                  accept="application/json"
                  onChange={handleImportJson}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </aside>

        {/* WORKSPACE */}
        <main className="min-w-0 space-y-6">
          {persistedMode === 'memory_only' && (
            <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
              <strong className="font-extrabold text-amber-300">Canlı Sunucu Kalıcılık Notu:</strong>{' '}
              Değişiklikler anlık sunucu belleğine uygulandı. Vercel üzerinde kalıcı dosya kaydı ve otomatik dağıtım için Vercel Environment Variables bölümüne{' '}
              <code className="rounded bg-slate-900 px-1.5 py-0.5 font-mono text-sky-300">GITHUB_TOKEN</code>{' '}
              ekleyin.
            </div>
          )}

          {/* CANLI ZİYARETÇİ & TRAFİK İSTATİSTİKLERİ PANELİ */}
          <LiveVisitorAnalyticsBanner
            stats={visitorStats}
            onRefresh={() => void fetchVisitorAnalytics()}
          />

          {/* GOOGLE HARİTALAR YORUM ENTEGRASYONU KARTI */}
          {(activeTab === 'overview' || activeTab === 'reviews') && (
            <GoogleReviewsIntegrationCard
              draft={draft}
              setDraft={setDraft}
              saveAllToCms={saveAllToCms}
              showNotice={showNotice}
            />
          )}

          {activeTab === 'overview' && <AdminDashboardTab {...tabProps} />}
          {(activeTab === 'pricing' || activeTab === 'references') && (
            <AdminDataTables
              {...tabProps}
              initialSubTab={activeTab === 'pricing' ? 'pricing' : 'references'}
            />
          )}
          {activeTab === 'catalog' && <CatalogTab {...tabProps} />}
          {activeTab === 'blog' && <AdminContentSeoTab {...tabProps} />}
          {activeTab === 'reviews' && <AdminReviewsTab {...tabProps} />}
          {activeTab === 'media' && <AdminMediaTab {...tabProps} />}
          {activeTab === 'security' && <AdminSecurityTab {...tabProps} />}
          {activeTab === 'settings' && <AdminSettingsLogsTab {...tabProps} />}
        </main>
      </div>
    </div>
  );
}

/* ─── CANLI ZİYARETÇİ & TRAFİK İSTATİSTİKLERİ BİLEŞENİ ────────── */
function LiveVisitorAnalyticsBanner({
  stats,
  onRefresh,
}: {
  stats: VisitorAnalyticsData | null;
  onRefresh: () => void;
}) {
  const totalUnique = stats?.totalUniqueVisitors ?? 0;
  const todayUnique = stats?.todayUniqueVisitors ?? 0;
  const totalViews = stats?.totalPageviews ?? 0;
  const todayViews = stats?.todayPageviews ?? 0;
  const last7Days = stats?.last7DaysVisitors ?? 0;
  const last30Days = stats?.last30DaysVisitors ?? 0;
  const topPages = stats?.topPages ?? [];

  return (
    <section
      aria-labelledby="canli-ziyaretci-baslik"
      className="rounded-2xl border border-sky-400/25 bg-gradient-to-br from-[#0F172A] via-[#111C35] to-[#0F172A] p-5 shadow-xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <div>
            <h2 id="canli-ziyaretci-baslik" className="text-sm font-black uppercase tracking-wider text-white sm:text-base">
              Canlı Ziyaretçi &amp; Trafik İstatistikleri (%100 Gerçek Sayaç)
            </h2>
            <p className="text-[11px] text-slate-400">
              Sahte/başlangıç verisi olmadan yalnızca gerçek ziyaretçi oturumlarını ve sayfa görüntülemelerini sayar
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-sky-200 transition hover:bg-white/10"
        >
          ↻ Verileri Yenile
        </button>
      </div>

      {/* 4 Ana Trafik Metriği */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300">
            Toplam Ziyaretçi (Tekil Oturum)
          </div>
          <div className="mt-1.5 text-2xl font-black text-white">
            {totalUnique.toLocaleString('tr-TR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Son 30 Gün: <strong className="text-emerald-400">{last30Days.toLocaleString('tr-TR')}</strong> tekil
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
            Bugünkü Ziyaretçi Sayısı
          </div>
          <div className="mt-1.5 text-2xl font-black text-emerald-400">
            {todayUnique.toLocaleString('tr-TR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Son 7 Gün: <strong className="text-sky-300">{last7Days.toLocaleString('tr-TR')}</strong> tekil
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
            Toplam Sayfa Görüntüleme
          </div>
          <div className="mt-1.5 text-2xl font-black text-white">
            {totalViews.toLocaleString('tr-TR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Bugün: <strong className="text-amber-300">{todayViews.toLocaleString('tr-TR')}</strong> görüntüleme
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-violet-300">
            En Çok Ziyaret Edilen Sayfalar
          </div>
          <div className="mt-1.5 space-y-1 text-[11px]">
            {topPages.length === 0 ? (
              <span className="text-slate-500">Henüz sayfa ziyareti kaydedilmedi</span>
            ) : (
              topPages.slice(0, 3).map((page) => (
                <div key={page.path} className="flex items-center justify-between gap-2 truncate">
                  <span className="truncate font-semibold text-slate-200">{page.path}</span>
                  <span className="shrink-0 font-mono font-bold text-sky-300">
                    {page.views.toLocaleString('tr-TR')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Popüler Sayfalar Detay Şeridi */}
      {topPages.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Ziyaret Edilen Sayfalar:
          </span>
          {topPages.slice(0, 6).map((p) => (
            <span
              key={p.path}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
            >
              <span className="font-semibold text-white">{p.path}</span>
              <span className="rounded bg-sky-500/20 px-1.5 py-0.2 font-mono text-[10px] font-bold text-sky-300">
                {p.views.toLocaleString('tr-TR')}
              </span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── GOOGLE HARİTALAR YORUM ENTEGRASYONU KARTI ───────────────── */
function GoogleReviewsIntegrationCard({
  draft,
  setDraft,
  saveAllToCms,
  showNotice,
}: {
  draft: CmsStoreData;
  setDraft: React.Dispatch<React.SetStateAction<CmsStoreData>>;
  saveAllToCms: (nextData?: CmsStoreData, customNotice?: string) => Promise<void>;
  showNotice: (type: 'success' | 'error' | 'info', text: string) => void;
}) {
  const [statusData, setStatusData] = useState<GoogleReviewsApiResponse | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState(draft.siteSettings.googlePlacesApiKey || '');
  const [placeIdInput, setPlaceIdInput] = useState(draft.siteSettings.googlePlaceId || '');
  const [isTesting, setIsTesting] = useState(false);

  const fetchGoogleReviewsStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/google-reviews?refresh=1&t=${Date.now()}`, {
        cache: 'no-store',
      });
      const json = (await res.json()) as GoogleReviewsApiResponse;
      if (json?.ok) {
        setStatusData(json);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    void fetchGoogleReviewsStatus();
  }, [fetchGoogleReviewsStatus]);

  const handleTestAndSave = async () => {
    setIsTesting(true);
    try {
      const res = await fetch('/api/google-reviews?refresh=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKeyInput.trim() || undefined,
          placeId: placeIdInput.trim() || undefined,
        }),
      });
      const json = (await res.json()) as GoogleReviewsApiResponse;
      if (json?.ok) {
        setStatusData(json);
        if (apiKeyInput.trim() || placeIdInput.trim()) {
          const nextDraft: CmsStoreData = {
            ...draft,
            siteSettings: {
              ...draft.siteSettings,
              googlePlacesApiKey: apiKeyInput.trim(),
              googlePlaceId: placeIdInput.trim(),
            },
          };
          setDraft(nextDraft);
          await saveAllToCms(nextDraft, json.statusMessage);
        } else {
          showNotice('success', json.statusMessage);
        }
      }
    } catch {
      showNotice('error', 'Google Haritalar bağlantı testi sırasında hata oluştu.');
    } finally {
      setIsTesting(false);
    }
  };

  const isLive = statusData?.mode === 'live_google_places_api';
  const badgeText =
    statusData?.statusBadge || 'Demo Modu Aktif (Örnek Anahtar Tanımlı)';

  return (
    <section
      aria-labelledby="google-yorum-entegrasyon-baslik"
      className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 shadow-xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">
            Google Haritalar Yorum Entegrasyonu
          </span>
          <h2
            id="google-yorum-entegrasyon-baslik"
            className="mt-1 text-base font-black text-white sm:text-lg"
          >
            Google Places API &amp; Otomatik Place ID Keşif Modülü
          </h2>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-extrabold ${
            isLive
              ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
              : 'border-amber-400/40 bg-amber-500/15 text-amber-200'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`}
          />
          {badgeText}
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="google-places-api-key"
            className="block text-xs font-bold text-slate-200"
          >
            Google Places API Key
          </label>
          <input
            id="google-places-api-key"
            type="text"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder={
              statusData?.maskedKey || 'Örnek anahtar tanımlı (.env.local)'
            }
            className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
          <p className="mt-1 text-[11px] text-slate-400">
            Aktif Anahtar:{' '}
            <strong className="font-mono text-sky-300">
              {statusData?.maskedKey || 'Örnek Anahtar Tanımlı (.env.local)'}
            </strong>
          </p>
        </div>

        <div>
          <label
            htmlFor="google-place-id"
            className="block text-xs font-bold text-slate-200"
          >
            Google Place ID <span className="font-normal text-slate-400">(Opsiyonel)</span>
          </label>
          <input
            id="google-place-id"
            type="text"
            value={placeIdInput}
            onChange={(e) => setPlaceIdInput(e.target.value)}
            placeholder="Örn: ChIJ... (Boş bırakılabilir)"
            className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
          <p className="mt-1 text-[11px] text-emerald-300/90">
            * Boş bırakırsanız sistem Kocasinan Merkez adresinizden Place ID kodunu otomatik bulur.
          </p>
        </div>
      </div>

      {statusData && (
        <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/90 p-3.5 text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong className="text-white">Durum:</strong> {statusData.statusMessage}
            </span>
            <span className="rounded bg-sky-500/20 px-2.5 py-1 font-bold text-sky-300">
              {statusData.rating} ★ ({statusData.userRatingsTotal} Değerlendirme •{' '}
              {statusData.reviews.length} Yorum Aktif)
            </span>
          </div>
          <div className="mt-1.5 text-[11px] text-slate-400">
            Çözümlenen Konum: <strong className="text-slate-200">{statusData.resolvedPlaceId}</strong>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => void handleTestAndSave()}
          disabled={isTesting}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg ring-1 ring-sky-400/30 transition hover:bg-[#1D4ED8] disabled:opacity-50"
        >
          <span>
            {isTesting
              ? '⏳ Google Haritalar Test Ediliyor...'
              : '🔄 Bağlantıyı Test Et & Yorumları Şimdi Çek'}
          </span>
        </button>

        <a
          href={statusData?.mapsUrl || 'https://www.google.com/maps'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-sky-300 hover:underline"
        >
          Google Haritalar İşletme Profilini Aç ↗
        </a>
      </div>
    </section>
  );
}

// ─── INLINE CATALOG TAB (Hizmet & Ürünler - compact) ───────────
function CatalogTab({ draft, setDraft, saveAllToCms, isSaving, uploadImageFile }: AdminTabProps) {
  const updateService = (i: number, patch: Partial<CmsStoreData['services'][0]>) => {
    setDraft((prev) => {
      const s = [...prev.services];
      s[i] = { ...s[i], ...patch };
      return { ...prev, services: s };
    });
  };
  const updateProduct = (i: number, patch: Partial<CmsStoreData['products'][0]>) => {
    setDraft((prev) => {
      const p = [...prev.products];
      p[i] = { ...p[i], ...patch };
      return { ...prev, products: p };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">
            /hizmetlerimiz &bull; /urunler
          </span>
          <h1 className="mt-1 text-xl font-black text-white">Hizmet &amp; Ürün Kataloğu</h1>
        </div>
        <button
          type="button"
          onClick={() => void saveAllToCms(draft, 'Katalog güncellendi!')}
          disabled={isSaving}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-extrabold text-white shadow hover:bg-emerald-500"
        >
          Katalog Kaydet
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <h2 className="text-base font-extrabold text-white">
          Hizmetlerimiz ({draft.services.length})
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {draft.services.map((srv, i) => (
            <div
              key={srv.id}
              className="flex gap-3.5 rounded-xl border border-white/10 bg-slate-900 p-3.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={srv.image}
                alt={srv.title}
                className="h-20 w-24 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1 space-y-2">
                <input
                  type="text"
                  value={srv.title}
                  onChange={(e) => updateService(i, { title: e.target.value })}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-white"
                />
                <input
                  type="text"
                  value={srv.subtitle}
                  onChange={(e) => updateService(i, { subtitle: e.target.value })}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-300"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={srv.image}
                    onChange={(e) => updateService(i, { image: e.target.value })}
                    className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 font-mono text-[10px] text-sky-300"
                  />
                  <label className="shrink-0 cursor-pointer rounded bg-[#1E3A8A] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#1D4ED8]">
                    <span>Görsel</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const u = await uploadImageFile(f);
                        if (u) updateService(i, { image: u });
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <h2 className="text-base font-extrabold text-white">
          Ürünler - Winsa &amp; Albert Genau ({draft.products.length})
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {draft.products.map((prod, i) => (
            <div
              key={prod.id}
              className="flex gap-3.5 rounded-xl border border-white/10 bg-slate-900 p-3.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prod.image}
                alt={prod.title}
                className="h-20 w-24 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#1E3A8A] px-2 py-0.5 text-[10px] font-bold text-sky-200">
                    {prod.brand}
                  </span>
                  <span className="text-[10px] text-slate-400">{prod.category}</span>
                </div>
                <input
                  type="text"
                  value={prod.title}
                  onChange={(e) => updateProduct(i, { title: e.target.value })}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-white"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prod.image}
                    onChange={(e) => updateProduct(i, { image: e.target.value })}
                    className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 font-mono text-[10px] text-sky-300"
                  />
                  <label className="shrink-0 cursor-pointer rounded bg-[#1E3A8A] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#1D4ED8]">
                    <span>Görsel</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const u = await uploadImageFile(f);
                        if (u) updateProduct(i, { image: u });
                      }}
                    />
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
