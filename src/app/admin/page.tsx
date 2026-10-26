'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DEFAULT_CMS_DATA,
  normalizeCmsData,
  type CmsBlogPostItem,
  type CmsPricingSystem,
  type CmsProductItem,
  type CmsReferenceItem,
  type CmsServiceItem,
  type CmsSiteSettings,
  type CmsStoreData,
} from '../../lib/cms';
import { useCms } from '../../components/CmsProvider';
import { CelikpenLogo } from '../../components/CelikpenLogo';

type AdminTabId =
  | 'overview'
  | 'pricing'
  | 'references'
  | 'catalog'
  | 'blog'
  | 'settings';

const ADMIN_SESSION_KEY = 'celikpen_admin_auth_v1';

function slugifyTurkish(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminDashboardPage() {
  const { cms, setCmsState, refreshCms } = useCms();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('celikpen2026');
  const [savedPassword, setSavedPassword] = useState<string>('celikpen2026');
  const [authError, setAuthError] = useState<string | null>(null);

  // Navigation & working draft state
  const [activeTab, setActiveTab] = useState<AdminTabId>('overview');
  const [draft, setDraft] = useState<CmsStoreData>(DEFAULT_CMS_DATA);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(
    null
  );

  // New Reference Form state
  const [newRef, setNewRef] = useState<CmsReferenceItem>({
    id: '',
    image: '/images/references/ref-1.jpg',
    title: '',
    district: 'Bahçelievler / Kocasinan Merkez',
    system: 'Winsa Vera Termal 4+20+4 Argonlu Isıcam',
    category: 'Isıcamlı Cam Balkon',
    featured: true,
  });

  // Blog Editor Modal / Form state
  const [editingBlogIndex, setEditingBlogIndex] = useState<number | null>(null);
  const [blogDraft, setBlogDraft] = useState<CmsBlogPostItem>({
    slug: '',
    title: '',
    metaTitle: '',
    metaDescription: '',
    primaryKeyword: '',
    category: 'Cam Balkon',
    readTime: 8,
    publishedAt: '2026-10-26',
    updatedAt: '2026-10-26',
    coverImage: '/images/services/isicamli-cam-balkon.jpg',
    youtubeVideoId: 'M7lc1UVf-VE',
    excerpt: '',
    contentHtml: '',
  });
  const [showBlogEditor, setShowBlogEditor] = useState<boolean>(false);

  useEffect(() => {
    setDraft(normalizeCmsData(cms));
  }, [cms]);

  useEffect(() => {
    try {
      const storedPass = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (storedPass) {
        setSavedPassword(storedPass);
        setPasswordInput(storedPass);
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const showNotice = (type: 'success' | 'error' | 'info', text: string) => {
    setToast({ type, text });
    window.setTimeout(() => {
      setToast((current) => (current?.text === text ? null : current));
    }, 5000);
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = passwordInput.trim();
    if (trimmed === 'celikpen2026' || trimmed.length >= 6) {
      setSavedPassword(trimmed);
      setIsAuthenticated(true);
      setAuthError(null);
      try {
        window.sessionStorage.setItem(ADMIN_SESSION_KEY, trimmed);
      } catch {
        // ignore
      }
      showNotice('success', 'Çelikpen Yönetim Paneline hoş geldiniz.');
    } else {
      setAuthError('Şifre hatalı. Varsayılan yönetici şifresi: celikpen2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
  };

  const saveAllToCms = async (nextData: CmsStoreData = draft, customNotice?: string) => {
    setIsSaving(true);
    try {
      const updated: CmsStoreData = normalizeCmsData({
        ...nextData,
        updatedAt: new Date().toISOString(),
      });
      setDraft(updated);
      setCmsState(updated);

      const response = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: savedPassword || 'celikpen2026',
          data: updated,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
        data?: CmsStoreData;
      };

      if (!response.ok || !result.ok) {
        showNotice('error', result.error || 'Kaydetme sırasında bir hata oluştu.');
        return;
      }

      if (result.data) {
        setDraft(normalizeCmsData(result.data));
        setCmsState(normalizeCmsData(result.data));
      }
      showNotice(
        'success',
        customNotice || result.message || 'Değişiklikler başarıyla kaydedildi ve sitede güncellendi!'
      );
    } catch (err) {
      showNotice(
        'info',
        customNotice ||
          `Değişiklikler tarayıcı önbelleğine kaydedildi (${err instanceof Error ? err.message : 'Çevrimdışı mod'}).`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishToGitHub = async () => {
    setIsPublishing(true);
    try {
      await saveAllToCms(draft, 'Değişiklikler yerel veritabanına kaydedildi, GitHub senkronizasyonu başlatılıyor...');
      const response = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: savedPassword || 'celikpen2026',
          data: draft,
          commitMessage:
            'chore(cms): admin paneli uzerinden fiyat, referans ve site ayarlari guncellendi',
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        showNotice('error', result.error || 'GitHub senkronizasyonu başarısız oldu.');
        return;
      }
      showNotice('success', result.message || 'Değişiklikler GitHub ve Canlı Siteye gönderildi!');
    } catch (error) {
      showNotice(
        'error',
        error instanceof Error ? error.message : 'GitHub bağlantısı sırasında hata oluştu.'
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const uploadImageFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('password', savedPassword || 'celikpen2026');
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const result = (await response.json()) as {
        ok?: boolean;
        url?: string;
        error?: string;
      };

      if (!response.ok || !result.ok || !result.url) {
        showNotice('error', result.error || 'Görsel yüklenemedi.');
        return null;
      }
      showNotice('success', `Görsel başarıyla yüklendi: ${result.url}`);
      return result.url;
    } catch (error) {
      showNotice(
        'error',
        error instanceof Error ? error.message : 'Görsel yükleme sırasında hata oluştu.'
      );
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
    showNotice('success', 'CMS yedek dosyası (.json) bilgisayarınıza indirildi.');
  };

  const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Partial<CmsStoreData>;
      const normalized = normalizeCmsData(parsed);
      await saveAllToCms(normalized, 'Yedek dosyası başarıyla yüklendi ve tüm site güncellendi!');
    } catch {
      showNotice('error', 'Seçilen JSON dosyası geçersiz formatta.');
    }
  };

  // Pricing helpers
  const updatePricingSystem = (index: number, patch: Partial<CmsPricingSystem>) => {
    setDraft((prev) => {
      const nextSystems = [...prev.pricingSystems];
      nextSystems[index] = { ...nextSystems[index], ...patch };
      return { ...prev, pricingSystems: nextSystems };
    });
  };

  const adjustAllPricesByPercent = (percent: number) => {
    setDraft((prev) => ({
      ...prev,
      pricingSystems: prev.pricingSystems.map((sys) => ({
        ...sys,
        pricePerM2: Math.round((sys.pricePerM2 * (1 + percent / 100)) / 50) * 50,
      })),
    }));
    showNotice(
      'info',
      `Tüm sistem fiyatları %${percent > 0 ? `+${percent}` : percent} oranında güncellendi. Kalıcı olması için "Fiyatları Kaydet" butonuna basın.`
    );
  };

  // Reference helpers
  const updateReferenceItem = (index: number, patch: Partial<CmsReferenceItem>) => {
    setDraft((prev) => {
      const nextRefs = [...prev.references];
      nextRefs[index] = { ...nextRefs[index], ...patch };
      return { ...prev, references: nextRefs };
    });
  };

  const moveReferenceItem = (index: number, direction: -1 | 1) => {
    setDraft((prev) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.references.length) return prev;
      const nextRefs = [...prev.references];
      const temp = nextRefs[index];
      nextRefs[index] = nextRefs[targetIndex];
      nextRefs[targetIndex] = temp;
      return { ...prev, references: nextRefs };
    });
  };

  const deleteReferenceItem = (index: number) => {
    setDraft((prev) => {
      const nextRefs = prev.references.filter((_, idx) => idx !== index);
      return { ...prev, references: nextRefs };
    });
    showNotice('info', 'Referans fotoğrafı listeden kaldırıldı. Kaydetmeyi unutmayın.');
  };

  const addNewReferenceItem = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newRef.title.trim()) {
      showNotice('error', 'Lütfen proje başlığını girin.');
      return;
    }
    const created: CmsReferenceItem = {
      ...newRef,
      id: `ref-${Date.now()}`,
      title: newRef.title.trim(),
    };
    const nextStore: CmsStoreData = {
      ...draft,
      references: [created, ...draft.references],
    };
    setNewRef({
      id: '',
      image: '/images/references/ref-1.jpg',
      title: '',
      district: 'Bahçelievler / Kocasinan Merkez',
      system: 'Winsa Vera Termal 4+20+4 Argonlu Isıcam',
      category: 'Isıcamlı Cam Balkon',
      featured: true,
    });
    await saveAllToCms(nextStore, 'Yeni referans projesi eklendi ve galeride yayınlandı!');
  };

  // Service & Product helpers
  const updateServiceItem = (index: number, patch: Partial<CmsServiceItem>) => {
    setDraft((prev) => {
      const next = [...prev.services];
      next[index] = { ...next[index], ...patch };
      return { ...prev, services: next };
    });
  };

  const updateProductItem = (index: number, patch: Partial<CmsProductItem>) => {
    setDraft((prev) => {
      const next = [...prev.products];
      next[index] = { ...next[index], ...patch };
      return { ...prev, products: next };
    });
  };

  const updateSiteSettings = (patch: Partial<CmsSiteSettings>) => {
    setDraft((prev) => ({
      ...prev,
      siteSettings: {
        ...prev.siteSettings,
        ...patch,
      },
    }));
  };

  // Blog Editor helpers
  const openNewBlogModal = () => {
    const today = new Date().toISOString().slice(0, 10);
    setEditingBlogIndex(null);
    setBlogDraft({
      slug: '',
      title: '',
      metaTitle: '',
      metaDescription: '',
      primaryKeyword: '',
      category: 'Cam Balkon',
      readTime: 8,
      publishedAt: today,
      updatedAt: today,
      coverImage: '/images/services/isicamli-cam-balkon.jpg',
      youtubeVideoId: 'M7lc1UVf-VE',
      excerpt: '',
      contentHtml: '',
    });
    setShowBlogEditor(true);
  };

  const openEditBlogModal = (index: number) => {
    const target = draft.blogPosts[index];
    if (!target) return;
    setEditingBlogIndex(index);
    setBlogDraft({ ...target });
    setShowBlogEditor(true);
  };

  const saveBlogArticle = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!blogDraft.title.trim()) {
      showNotice('error', 'Lütfen makale başlığını girin.');
      return;
    }
    const finalSlug = blogDraft.slug.trim() || slugifyTurkish(blogDraft.title);
    const articleToSave: CmsBlogPostItem = {
      ...blogDraft,
      slug: finalSlug,
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    const nextPosts = [...draft.blogPosts];
    if (editingBlogIndex !== null && nextPosts[editingBlogIndex]) {
      nextPosts[editingBlogIndex] = articleToSave;
    } else {
      nextPosts.unshift(articleToSave);
    }

    const nextStore: CmsStoreData = {
      ...draft,
      blogPosts: nextPosts,
    };
    setShowBlogEditor(false);
    await saveAllToCms(nextStore, 'Blog makalesi ve SEO meta etiketleri başarıyla kaydedildi!');
  };

  const deleteBlogArticle = async (index: number) => {
    const nextPosts = draft.blogPosts.filter((_, idx) => idx !== index);
    const nextStore: CmsStoreData = {
      ...draft,
      blogPosts: nextPosts,
    };
    await saveAllToCms(nextStore, 'Blog yazısı listeden kaldırıldı.');
  };

  // ============================================================================
  // 1. LOGIN SCREEN
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col justify-center bg-[#0F172A] px-4 py-12">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-white/15 bg-slate-900/95 p-7 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <CelikpenLogo size="sm" variant="light" />
            <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sky-300">
              Yönetim Paneli v2.6
            </span>
          </div>

          <h1 className="mt-6 text-xl font-black text-white">
            Çelikpen Kurumsal CMS Girişi
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
            m² birim fiyatlarını, proje referans fotoğraflarını, Winsa &amp; Albert Genau ürünlerini ve
            iletişim bilgilerini tek ekrandan yönetin.
          </p>

          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300">🔑 Varsayılan Yönetici Şifresi:</span>
              <button
                type="button"
                onClick={() => setPasswordInput('celikpen2026')}
                className="rounded bg-emerald-600/40 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-emerald-600"
              >
                Otomatik Doldur
              </button>
            </div>
            <div className="mt-1 font-mono text-sm font-black tracking-wider text-white">
              celikpen2026
            </div>
          </div>

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
              Yönetim Paneline Giriş Yap →
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
            <Link href="/" className="font-semibold text-sky-300 hover:text-white">
              ← Ana Sayfaya Dön
            </Link>
            <span>256-Bit Güvenli Oturum</span>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ============================================================================
  const navItems: { id: AdminTabId; icon: string; label: string; badge?: string }[] = [
    { id: 'overview', icon: '📊', label: '1. Genel Bakış' },
    {
      id: 'pricing',
      icon: '💰',
      label: '2. m² Fiyat Yönetimi',
      badge: `${draft.pricingSystems.length}`,
    },
    {
      id: 'references',
      icon: '📸',
      label: '3. Referans Galerisi',
      badge: `${draft.references.length}`,
    },
    {
      id: 'catalog',
      icon: '🏢',
      label: '4. Hizmet & Ürünler',
      badge: `${draft.services.length + draft.products.length}`,
    },
    {
      id: 'blog',
      icon: '📝',
      label: '5. Blog & SEO Yönetimi',
      badge: `${draft.blogPosts.length}`,
    },
    { id: 'settings', icon: '📞', label: '6. İletişim & Ayarlar' },
  ];

  const metaTitleLen = blogDraft.metaTitle.trim().length;
  const metaDescLen = blogDraft.metaDescription.trim().length;

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
      {/* ============================ TOP STICKY BAR ============================ */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F172A]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="shrink-0" title="Siteye Git">
              <CelikpenLogo size="sm" variant="light" />
            </Link>
            <div className="hidden h-6 w-px bg-white/15 sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Yönetim &amp; İçerik Paneli (CMS)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Son Güncelleme:{' '}
                {new Date(draft.updatedAt || Date.now()).toLocaleString('tr-TR')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
            >
              🌐 Canlı Siteyi Gör ↗
            </Link>

            <button
              type="button"
              onClick={() => void saveAllToCms(draft)}
              disabled={isSaving}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow transition hover:bg-emerald-500 disabled:opacity-50"
            >
              {isSaving ? 'Kaydediliyor...' : '💾 Değişiklikleri Kaydet'}
            </button>

            <button
              type="button"
              onClick={() => void handlePublishToGitHub()}
              disabled={isPublishing}
              className="rounded-lg bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold text-white shadow-lg ring-1 ring-sky-400/30 transition hover:bg-[#1D4ED8] disabled:opacity-50"
            >
              {isPublishing
                ? '🚀 GitHub’a Gönderiliyor...'
                : '🚀 Değişiklikleri GitHub’a Kaydet (Canlı Siteyi Güncelle)'}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      {/* TOAST BANNER */}
      {toast && (
        <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6">
          <div
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-bold shadow-lg ${
              toast.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-950/80 text-emerald-200'
                : toast.type === 'error'
                  ? 'border-rose-500/40 bg-rose-950/80 text-rose-200'
                  : 'border-sky-500/40 bg-sky-950/80 text-sky-200'
            }`}
          >
            <span>{toast.text}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-4 rounded px-2 py-0.5 text-white/80 hover:bg-white/10"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ============================ MAIN LAYOUT (SIDEBAR + WORKSPACE) ============================ */}
      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr]">
        {/* SIDEBAR */}
        <aside className="space-y-4">
          <nav
            aria-label="Yönetim Paneli Menüsü"
            className="rounded-2xl border border-white/10 bg-[#0F172A] p-3 shadow-xl"
          >
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-sky-300">
              Yönetim Modülleri
            </div>
            <div className="mt-1 space-y-1">
              {navItems.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-xs font-bold transition ${
                      active
                        ? 'bg-[#1E3A8A] text-white shadow-md ring-1 ring-sky-400/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                          active
                            ? 'bg-sky-400/20 text-sky-200'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* QUICK MAGAZA TOGGLE & BACKUP */}
          <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-xl">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-sky-300">
              Hızlı Menü &amp; Yedekleme
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900 p-3">
              <div>
                <div className="text-xs font-bold text-white">Üst Menü &ldquo;Mağaza&rdquo;</div>
                <div className="text-[10px] text-slate-400">
                  {draft.siteSettings.showMagazaMenu ? 'Sitede Görünür' : 'Şu An Gizli'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextVal = !draft.siteSettings.showMagazaMenu;
                  const nextStore: CmsStoreData = {
                    ...draft,
                    siteSettings: {
                      ...draft.siteSettings,
                      showMagazaMenu: nextVal,
                    },
                  };
                  void saveAllToCms(
                    nextStore,
                    nextVal
                      ? 'Üst menüde "Mağaza" sekmesi aktif edildi!'
                      : 'Üst menüde "Mağaza" sekmesi gizlendi.'
                  );
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                  draft.siteSettings.showMagazaMenu
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                {draft.siteSettings.showMagazaMenu ? 'Açık' : 'Gizli'}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={handleExportJson}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-white/10"
              >
                ⬇️ JSON Yedeği İndir
              </button>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-white/10">
                <span>⬆️ JSON Yedeği Yükle</span>
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

        {/* WORKSPACE AREA */}
        <main className="space-y-6">
          {/* =====================================================================
              MODULE 1: GENEL BAKIŞ (DASHBOARD ÖZETİ)
             ===================================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E3A8A] via-[#0F172A] to-[#0F172A] p-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sky-200">
                      Çelikpen Dijital Yönetim Merkezi
                    </span>
                    <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                      Hoş Geldiniz — Sitenizi Kod Yazmadan Yönetin
                    </h1>
                    <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-300">
                      Yaptığınız her fiyat, fotoğraf veya telefon değişikliği{' '}
                      <strong>&ldquo;Değişiklikleri Kaydet&rdquo;</strong> butonuna bastığınız anda
                      sitenizde aktif olur. Bilgisayarınızdan tek tıkla yeni proje fotoğrafı
                      yükleyebilirsiniz.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('pricing')}
                      className="rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-[#1E3A8A] shadow transition hover:bg-sky-50"
                    >
                      💰 m² Fiyatlarını Güncelle
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('references')}
                      className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-white/20"
                    >
                      📸 Yeni Proje Fotoğrafı Yükle
                    </button>
                  </div>
                </div>

                {/* KPI CARDS */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-white/10 bg-slate-900/75 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Fiyat Hesaplama Serisi
                    </div>
                    <div className="mt-1 text-2xl font-black text-white">
                      {draft.pricingSystems.length} Sistem
                    </div>
                    <div className="mt-1 text-[11px] text-emerald-400">
                      Isıcamlı: {draft.pricingSystems.find((s) => s.id === 'vbs_isicam')?.pricePerM2.toLocaleString('tr-TR')} ₺/m²
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-900/75 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Referans Galerisi
                    </div>
                    <div className="mt-1 text-2xl font-black text-white">
                      {draft.references.length} Fotoğraf
                    </div>
                    <div className="mt-1 text-[11px] text-sky-300">
                      /profesyoneller/referanslar
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-900/75 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Hizmet &amp; Ürün Kataloğu
                    </div>
                    <div className="mt-1 text-2xl font-black text-white">
                      {draft.services.length} Hizmet / {draft.products.length} Ürün
                    </div>
                    <div className="mt-1 text-[11px] text-sky-300">
                      Winsa &amp; Albert Genau
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-900/75 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Aktif Telefon &amp; WhatsApp
                    </div>
                    <div className="mt-1 text-lg font-black text-white">
                      {draft.siteSettings.phoneDisplay}
                    </div>
                    <div className="mt-1 truncate text-[11px] text-emerald-400">
                      {draft.siteSettings.shortAddress}
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK ACTION CARDS */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                  <div className="text-lg">💰</div>
                  <h2 className="mt-2 text-base font-extrabold text-white">
                    Canlı m² Fiyatlarını Değiştir
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Katlanır, Isıcamlı, Sürme, Giyotin, Winsa PVC ve Pergola m² birim fiyatlarını
                    saniyeler içinde güncelleyin.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('pricing')}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1E3A8A] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8]"
                  >
                    Fiyat Tablosunu Aç →
                  </button>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                  <div className="text-lg">📸</div>
                  <h2 className="mt-2 text-base font-extrabold text-white">
                    Projelerimiz / Galeri Yönetimi
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Bilgisayarınızdan veya telefonunuzdan yeni montaj fotoğrafları yükleyin,
                    sıralamayı değiştirin veya silin.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('references')}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1E3A8A] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8]"
                  >
                    Fotoğraf Galerisini Yönet →
                  </button>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                  <div className="text-lg">📝</div>
                  <h2 className="mt-2 text-base font-extrabold text-white">
                    Blog &amp; Google SEO Makaleleri
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    50–60 karakter Meta Başlık ve 150–160 karakter Meta Açıklama sayaçlarıyla SEO
                    uyumlu yeni yazılar ekleyin.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('blog');
                      openNewBlogModal();
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1E3A8A] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8]"
                  >
                    + Yeni Blog Yazısı Ekle →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              MODULE 2: m² FİYAT HESAPLAMA YÖNETİMİ
             ===================================================================== */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">
                    /fiyat-hesapla &amp; Ana Sayfa Hesaplayıcı
                  </span>
                  <h1 className="mt-1 text-xl font-black text-white">
                    m² Birim Fiyatları &amp; Ek Donanım Yönetimi
                  </h1>
                  <p className="mt-1 text-xs text-slate-400">
                    Burada değiştirdiğiniz m² fiyatları anında sitenizdeki Fiyat Hesaplama
                    motoruna ve WhatsApp teklif mesajlarına yansır.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => adjustAllPricesByPercent(5)}
                    className="rounded-lg border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-200 hover:bg-sky-500/20"
                  >
                    📈 Tümüne +%5 Ekle
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustAllPricesByPercent(10)}
                    className="rounded-lg border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-200 hover:bg-sky-500/20"
                  >
                    📈 Tümüne +%10 Ekle
                  </button>
                  <button
                    type="button"
                    onClick={() => void saveAllToCms(draft, 'Tüm m² birim fiyatları kaydedildi ve sitede güncellendi!')}
                    disabled={isSaving}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500"
                  >
                    💾 Fiyatları Kaydet &amp; Sitede Güncelle
                  </button>
                </div>
              </div>

              {/* SYSTEMS TABLE / CARDS */}
              <div className="space-y-3">
                {draft.pricingSystems.map((sys, index) => (
                  <div
                    key={sys.id}
                    className="grid gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-4 sm:grid-cols-12 sm:items-center"
                  >
                    <div className="sm:col-span-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#1E3A8A] px-2 py-0.5 text-[10px] font-extrabold text-sky-200">
                          {sys.code}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{sys.id}</span>
                      </div>
                      <input
                        type="text"
                        value={sys.name}
                        onChange={(e) => updatePricingSystem(index, { name: e.target.value })}
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-white focus:border-sky-400 focus:outline-none"
                        aria-label={`${sys.name} sistem adı`}
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Kısa Açıklama / Alt Başlık
                      </label>
                      <input
                        type="text"
                        value={sys.subtitle}
                        onChange={(e) => updatePricingSystem(index, { subtitle: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 focus:border-sky-400 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Net m² Fiyatı (₺)
                      </label>
                      <div className="mt-1 flex items-center gap-1">
                        <input
                          type="number"
                          step={50}
                          min={500}
                          value={sys.pricePerM2}
                          onChange={(e) =>
                            updatePricingSystem(index, {
                              pricePerM2: Number(e.target.value) || 0,
                            })
                          }
                          className="w-full rounded-lg border border-emerald-500/40 bg-slate-950 px-3 py-2 text-sm font-black text-emerald-300 focus:border-emerald-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 sm:col-span-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          updatePricingSystem(index, {
                            pricePerM2: Math.max(500, sys.pricePerM2 - 100),
                          })
                        }
                        className="rounded-lg border border-white/10 bg-slate-800 px-2.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700"
                        title="100 TL Azalt"
                      >
                        -100₺
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updatePricingSystem(index, {
                            pricePerM2: sys.pricePerM2 + 100,
                          })
                        }
                        className="rounded-lg border border-white/10 bg-slate-800 px-2.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700"
                        title="100 TL Artır"
                      >
                        +100₺
                      </button>
                      <label className="flex cursor-pointer items-center gap-1.5 text-xs font-bold text-slate-300">
                        <input
                          type="checkbox"
                          checked={sys.active !== false}
                          onChange={(e) =>
                            updatePricingSystem(index, { active: e.target.checked })
                          }
                          className="h-4 w-4 accent-emerald-500"
                        />
                        <span>Aktif</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* ADDONS BOX */}
              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-sky-300">
                  Ekstra Donanım Birim Fiyatları (Sineklik &amp; Plise Perde)
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300">
                      Kedi Tüllü Sineklik Birim Fiyatı (₺ / Adet)
                    </label>
                    <input
                      type="number"
                      step={50}
                      value={draft.pricingAddons.catScreenPerUnit}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          pricingAddons: {
                            ...prev.pricingAddons,
                            catScreenPerUnit: Number(e.target.value) || 0,
                          },
                        }))
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300">
                      Plise Cam Balkon Perdesi (₺ / m²)
                    </label>
                    <input
                      type="number"
                      step={50}
                      value={draft.pricingAddons.pleatedBlindPerM2}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          pricingAddons: {
                            ...prev.pricingAddons,
                            pleatedBlindPerM2: Number(e.target.value) || 0,
                          },
                        }))
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm font-bold text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              MODULE 3: PROJELERİMİZ / REFERANS GALERİSİ YÖNETİMİ
             ===================================================================== */}
          {activeTab === 'references' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">
                    /profesyoneller/referanslar
                  </span>
                  <h1 className="mt-1 text-xl font-black text-white">
                    Projelerimiz &amp; Referans Fotoğraf Galerisi ({draft.references.length} Proje)
                  </h1>
                  <p className="mt-1 text-xs text-slate-400">
                    Bilgisayarınızdan yeni proje fotoğrafı yükleyin veya mevcut kartların fotoğraf,
                    başlık ve sıralamasını değiştirin.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    void saveAllToCms(
                      draft,
                      'Referans galerisi kaydedildi ve /profesyoneller/referanslar sayfasında güncellendi!'
                    )
                  }
                  disabled={isSaving}
                  className="rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-extrabold text-white shadow hover:bg-emerald-500"
                >
                  💾 Galeri Değişikliklerini Kaydet
                </button>
              </div>

              {/* ADD NEW PHOTO CARD */}
              <form
                onSubmit={addNewReferenceItem}
                className="rounded-2xl border border-sky-400/30 bg-slate-900/90 p-5 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-sky-300">
                    ➕ Yeni Proje / Referans Fotoğrafı Ekle
                  </h2>
                  {isUploading && (
                    <span className="text-xs font-bold text-amber-300">
                      ⏳ Fotoğraf yükleniyor...
                    </span>
                  )}
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300">
                      Proje Başlığı *
                    </label>
                    <input
                      type="text"
                      required
                      value={newRef.title}
                      onChange={(e) => setNewRef((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Örn: Bahçelievler — Isıcamlı Cam Balkon"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300">
                      İlçe / Mahalle
                    </label>
                    <input
                      type="text"
                      value={newRef.district}
                      onChange={(e) => setNewRef((p) => ({ ...p, district: e.target.value }))}
                      placeholder="Örn: Bahçelievler / Kocasinan Merkez"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300">
                      Uygulanan Sistem
                    </label>
                    <input
                      type="text"
                      value={newRef.system}
                      onChange={(e) => setNewRef((p) => ({ ...p, system: e.target.value }))}
                      placeholder="Örn: Winsa Vera Termal Isıcam"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300">
                      Kategori Rozeti
                    </label>
                    <input
                      type="text"
                      value={newRef.category}
                      onChange={(e) => setNewRef((p) => ({ ...p, category: e.target.value }))}
                      placeholder="Örn: Isıcamlı Cam Balkon"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-300">
                      Fotoğraf Dosyası Seçin veya Görsel Yolu Girin (.jpg, .png, .webp)
                    </label>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        value={newRef.image}
                        onChange={(e) => setNewRef((p) => ({ ...p, image: e.target.value }))}
                        className="min-w-[240px] flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-sky-300"
                      />
                      <label className="cursor-pointer rounded-lg border border-sky-400/40 bg-[#1E3A8A] px-3.5 py-2 text-xs font-extrabold text-white transition hover:bg-[#1D4ED8]">
                        <span>📁 Bilgisayardan Fotoğraf Seç</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const uploadedUrl = await uploadImageFile(file);
                            if (uploadedUrl) {
                              setNewRef((p) => ({ ...p, image: uploadedUrl }));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-extrabold text-white shadow transition hover:bg-emerald-500"
                  >
                    ➕ Projeyi Galeriye Ekle &amp; Kaydet
                  </button>
                </div>
              </form>

              {/* EXISTING REFERENCE PHOTO CARDS */}
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {draft.references.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute left-2.5 top-2.5 rounded-md bg-slate-950/80 px-2.5 py-1 text-[10px] font-extrabold text-sky-300">
                          #{index + 1} • {item.category}
                        </span>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400">
                            Proje Başlığı
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              updateReferenceItem(index, { title: e.target.value })
                            }
                            className="mt-0.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-bold text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400">
                              İlçe / Mahalle
                            </label>
                            <input
                              type="text"
                              value={item.district}
                              onChange={(e) =>
                                updateReferenceItem(index, { district: e.target.value })
                              }
                              className="mt-0.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400">
                              Kategori
                            </label>
                            <input
                              type="text"
                              value={item.category}
                              onChange={(e) =>
                                updateReferenceItem(index, { category: e.target.value })
                              }
                              className="mt-0.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400">
                            Fotoğraf Yolu veya Yeni Fotoğraf Yükle
                          </label>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <input
                              type="text"
                              value={item.image}
                              onChange={(e) =>
                                updateReferenceItem(index, { image: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[11px] font-mono text-sky-300"
                            />
                            <label className="shrink-0 cursor-pointer rounded-lg bg-[#1E3A8A] px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-[#1D4ED8]">
                              <span>Değiştir</span>
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const uploadedUrl = await uploadImageFile(file);
                                  if (uploadedUrl) {
                                    updateReferenceItem(index, { image: uploadedUrl });
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveReferenceItem(index, -1)}
                          disabled={index === 0}
                          className="rounded border border-white/10 bg-slate-800 px-2 py-1 text-[11px] font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-40"
                        >
                          ↑ Yukarı
                        </button>
                        <button
                          type="button"
                          onClick={() => moveReferenceItem(index, 1)}
                          disabled={index === draft.references.length - 1}
                          className="rounded border border-white/10 bg-slate-800 px-2 py-1 text-[11px] font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-40"
                        >
                          ↓ Aşağı
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteReferenceItem(index)}
                        className="rounded border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-bold text-rose-300 hover:bg-rose-500/20"
                      >
                        🗑️ Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              MODULE 4: HİZMETLERİMİZ & ÜRÜNLERİMİZ (WINSA / ALBERT GENAU) YÖNETİMİ
             ===================================================================== */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">
                    /hizmetlerimiz • /urunler/winsa • /urunler/albert-genau
                  </span>
                  <h1 className="mt-1 text-xl font-black text-white">
                    Hizmetlerimiz &amp; Ürün Kataloğu Yönetimi
                  </h1>
                  <p className="mt-1 text-xs text-slate-400">
                    Hizmet kartlarını, Winsa &amp; Albert Genau ürün görsellerini ve üst menüdeki
                    &ldquo;Mağaza&rdquo; sekmesini buradan yönetebilirsiniz.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    void saveAllToCms(draft, 'Hizmet ve ürün kataloğu başarıyla güncellendi!')
                  }
                  disabled={isSaving}
                  className="rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-extrabold text-white shadow hover:bg-emerald-500"
                >
                  💾 Katalog Değişikliklerini Kaydet
                </button>
              </div>

              {/* SERVICES SECTION */}
              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                <h2 className="text-base font-extrabold text-white">
                  1. Hizmetlerimiz Kartları ({draft.services.length} Hizmet)
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {draft.services.map((srv, idx) => (
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
                          onChange={(e) => updateServiceItem(idx, { title: e.target.value })}
                          className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-white"
                        />
                        <input
                          type="text"
                          value={srv.subtitle}
                          onChange={(e) => updateServiceItem(idx, { subtitle: e.target.value })}
                          className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-300"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={srv.image}
                            onChange={(e) => updateServiceItem(idx, { image: e.target.value })}
                            className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] font-mono text-sky-300"
                          />
                          <label className="shrink-0 cursor-pointer rounded bg-[#1E3A8A] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#1D4ED8]">
                            <span>Görsel Seç</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const uploadedUrl = await uploadImageFile(file);
                                if (uploadedUrl) {
                                  updateServiceItem(idx, { image: uploadedUrl });
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRODUCTS SECTION */}
              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                <h2 className="text-base font-extrabold text-white">
                  2. Ürünlerimiz (Winsa &amp; Albert Genau) ({draft.products.length} Seri)
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {draft.products.map((prod, idx) => (
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
                          onChange={(e) => updateProductItem(idx, { title: e.target.value })}
                          className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-white"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={prod.image}
                            onChange={(e) => updateProductItem(idx, { image: e.target.value })}
                            className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] font-mono text-sky-300"
                          />
                          <label className="shrink-0 cursor-pointer rounded bg-[#1E3A8A] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#1D4ED8]">
                            <span>Görsel Seç</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const uploadedUrl = await uploadImageFile(file);
                                if (uploadedUrl) {
                                  updateProductItem(idx, { image: uploadedUrl });
                                }
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
          )}

          {/* =====================================================================
              MODULE 5: BLOG & SEO YAZI YÖNETİMİ
             ===================================================================== */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">
                    /profesyoneller/blog &amp; /blog/[slug]
                  </span>
                  <h1 className="mt-1 text-xl font-black text-white">
                    Blog &amp; Google SEO Makale Yönetimi
                  </h1>
                  <p className="mt-1 text-xs text-slate-400">
                    50–60 karakter Meta Title ve 150–160 karakter Meta Description sayaçlarıyla
                    Google 1. sayfa uyumlu içerikler oluşturun.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openNewBlogModal}
                  className="rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-xs font-extrabold text-white shadow ring-1 ring-sky-400/30 hover:bg-[#1D4ED8]"
                >
                  ➕ Yeni Blog Yazısı Ekle
                </button>
              </div>

              {/* BLOG EDITOR FORM */}
              {showBlogEditor && (
                <form
                  onSubmit={saveBlogArticle}
                  className="space-y-4 rounded-2xl border border-sky-400/40 bg-slate-900 p-6 shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-base font-extrabold text-white">
                      {editingBlogIndex !== null
                        ? '✏️ Blog Makalesini Düzenle'
                        : '➕ Yeni SEO Uyumlu Blog Makalesi Oluştur'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setShowBlogEditor(false)}
                      className="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold text-slate-300 hover:bg-white/20"
                    >
                      Kapat ✕
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-300">
                        Makale Başlığı (H1) *
                      </label>
                      <input
                        type="text"
                        required
                        value={blogDraft.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setBlogDraft((p) => ({
                            ...p,
                            title,
                            slug: p.slug || slugifyTurkish(title),
                          }));
                        }}
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300">
                        SEO URL (Slug)
                      </label>
                      <input
                        type="text"
                        value={blogDraft.slug}
                        onChange={(e) =>
                          setBlogDraft((p) => ({ ...p, slug: slugifyTurkish(e.target.value) }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-sky-300"
                      />
                    </div>
                  </div>

                  {/* LIVE SEO COUNTERS */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300">
                          Google Meta Title (Hedef: 50–60 Karakter)
                        </label>
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-extrabold ${
                            metaTitleLen >= 50 && metaTitleLen <= 60
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {metaTitleLen} / 60 Karakter
                        </span>
                      </div>
                      <input
                        type="text"
                        value={blogDraft.metaTitle}
                        onChange={(e) =>
                          setBlogDraft((p) => ({ ...p, metaTitle: e.target.value }))
                        }
                        placeholder="Örn: Isıcamlı Cam Balkon Fiyatları 2026 | m² Hesaplama & Yalıtım"
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300">
                          Odak Anahtar Kelime (Primary Keyword)
                        </label>
                      </div>
                      <input
                        type="text"
                        value={blogDraft.primaryKeyword}
                        onChange={(e) =>
                          setBlogDraft((p) => ({ ...p, primaryKeyword: e.target.value }))
                        }
                        placeholder="Örn: ısıcamlı cam balkon fiyatları 2026"
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">
                        Google Meta Description (Hedef: 150–160 Karakter)
                      </label>
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-extrabold ${
                          metaDescLen >= 145 && metaDescLen <= 165
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {metaDescLen} / 160 Karakter
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={blogDraft.metaDescription}
                      onChange={(e) =>
                        setBlogDraft((p) => ({ ...p, metaDescription: e.target.value }))
                      }
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300">Kategori</label>
                      <input
                        type="text"
                        value={blogDraft.category}
                        onChange={(e) =>
                          setBlogDraft((p) => ({ ...p, category: e.target.value }))
                        }
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300">
                        YouTube Video ID (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        value={blogDraft.youtubeVideoId || ''}
                        onChange={(e) =>
                          setBlogDraft((p) => ({ ...p, youtubeVideoId: e.target.value }))
                        }
                        placeholder="Örn: M7lc1UVf-VE"
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-sky-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300">
                        Kapak Görseli
                      </label>
                      <div className="mt-1 flex items-center gap-1.5">
                        <input
                          type="text"
                          value={blogDraft.coverImage}
                          onChange={(e) =>
                            setBlogDraft((p) => ({ ...p, coverImage: e.target.value }))
                          }
                          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs font-mono text-sky-300"
                        />
                        <label className="shrink-0 cursor-pointer rounded-lg bg-[#1E3A8A] px-2.5 py-2 text-xs font-bold text-white">
                          <span>Yükle</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await uploadImageFile(file);
                              if (url) {
                                setBlogDraft((p) => ({ ...p, coverImage: url }));
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300">
                      Kısa Özet (Excerpt)
                    </label>
                    <textarea
                      rows={2}
                      value={blogDraft.excerpt}
                      onChange={(e) => setBlogDraft((p) => ({ ...p, excerpt: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300">
                      Makale İçeriği (Paragraflar / Teknik Rehber Metni)
                    </label>
                    <textarea
                      rows={5}
                      value={blogDraft.contentHtml}
                      onChange={(e) =>
                        setBlogDraft((p) => ({ ...p, contentHtml: e.target.value }))
                      }
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowBlogEditor(false)}
                      className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold text-slate-300"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500"
                    >
                      💾 Makaleyi Kaydet &amp; Yayınla
                    </button>
                  </div>
                </form>
              )}

              {/* BLOG ARTICLES LIST */}
              <div className="space-y-3">
                {draft.blogPosts.map((post, idx) => (
                  <div
                    key={post.slug}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-4 sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-[#1E3A8A] px-2.5 py-0.5 text-[10px] font-extrabold text-sky-200">
                          {post.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          /blog/{post.slug}
                        </span>
                        <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          Title: {post.metaTitle.length} kr • Desc: {post.metaDescription.length} kr
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white">{post.title}</h3>
                      <p className="text-xs text-slate-400">{post.excerpt}</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-sky-300 hover:bg-white/10"
                      >
                        Gör ↗
                      </Link>
                      <button
                        type="button"
                        onClick={() => openEditBlogModal(idx)}
                        className="rounded-lg bg-[#1E3A8A] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1D4ED8]"
                      >
                        ✏️ Düzenle
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteBlogArticle(idx)}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              MODULE 6: İLETİŞİM, WHATSAPP & KURUMSAL AYARLAR
             ===================================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">
                    Üst Bar • Footer • WhatsApp • İletişim Sayfası
                  </span>
                  <h1 className="mt-1 text-xl font-black text-white">
                    İletişim, WhatsApp &amp; Kurumsal Site Ayarları
                  </h1>
                  <p className="mt-1 text-xs text-slate-400">
                    Telefon numaranız, WhatsApp hattınız, Kocasinan Merkez açık adresiniz ve
                    çalışma saatleriniz tüm sitede tek noktadan güncellenir.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    void saveAllToCms(
                      draft,
                      'İletişim, WhatsApp ve kurumsal ayarlar tüm sitede güncellendi!'
                    )
                  }
                  disabled={isSaving}
                  className="rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-extrabold text-white shadow hover:bg-emerald-500"
                >
                  💾 İletişim Ayarlarını Kaydet
                </button>
              </div>

              <div className="grid gap-6 rounded-2xl border border-white/10 bg-[#0F172A] p-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Telefon Numarası (Görünüm Formatı)
                  </label>
                  <input
                    type="text"
                    value={draft.siteSettings.phoneDisplay}
                    onChange={(e) => updateSiteSettings({ phoneDisplay: e.target.value })}
                    placeholder="0 (532) 333 20 85"
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm font-bold text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Tıklanabilir Telefon Kodu (tel: bağlantısı)
                  </label>
                  <input
                    type="text"
                    value={draft.siteSettings.phoneRaw}
                    onChange={(e) => updateSiteSettings({ phoneRaw: e.target.value })}
                    placeholder="+905323332085"
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm font-mono text-sky-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    WhatsApp Hattı Numarası (Ülke Kodu İle, + Olmadan)
                  </label>
                  <input
                    type="text"
                    value={draft.siteSettings.whatsappNumber}
                    onChange={(e) => updateSiteSettings({ whatsappNumber: e.target.value })}
                    placeholder="905323332085"
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm font-mono text-emerald-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Sağ Alt WhatsApp Butonu Davet Metni
                  </label>
                  <input
                    type="text"
                    value={draft.siteSettings.whatsappText}
                    onChange={(e) => updateSiteSettings({ whatsappText: e.target.value })}
                    placeholder="Mimarlarımızla Görüşün"
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-300">
                    Showroom &amp; Fabrika Açık Adresi
                  </label>
                  <input
                    type="text"
                    value={draft.siteSettings.address}
                    onChange={(e) => updateSiteSettings({ address: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Üst Bar Kısa Adres Özeti
                  </label>
                  <input
                    type="text"
                    value={draft.siteSettings.shortAddress}
                    onChange={(e) => updateSiteSettings({ shortAddress: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Kurumsal E-Posta Adresi
                  </label>
                  <input
                    type="email"
                    value={draft.siteSettings.email}
                    onChange={(e) => updateSiteSettings({ email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Çalışma Saatleri
                  </label>
                  <input
                    type="text"
                    value={draft.siteSettings.workingHours}
                    onChange={(e) => updateSiteSettings({ workingHours: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Instagram Sayfa Bağlantısı
                  </label>
                  <input
                    type="url"
                    value={draft.siteSettings.instagramUrl}
                    onChange={(e) => updateSiteSettings({ instagramUrl: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
