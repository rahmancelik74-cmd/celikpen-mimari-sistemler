'use client';

import React, { useEffect, useState } from 'react';
import type { AdminTabProps } from './types';
import { BarChart, AreaChart, ChecklistWidget, StatusBadge } from './AdminShared';

const MONTHLY_VISITORS = [
  { label: 'Oca', value: 1200 },
  { label: 'Şub', value: 1400 },
  { label: 'Mar', value: 1800 },
  { label: 'Nis', value: 2200 },
  { label: 'May', value: 2600 },
  { label: 'Haz', value: 3100 },
  { label: 'Tem', value: 2800 },
  { label: 'Ağu', value: 3400 },
  { label: 'Eyl', value: 3900 },
  { label: 'Eki', value: 4200 },
];

function EnvironmentBanner() {
  const [env, setEnv] = useState<{ isVercel: boolean; hasBlob: boolean; hasGithub: boolean } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/cms?t=${Date.now()}`, { cache: 'no-store' })
      .then(res => res.headers)
      .then(headers => {
        const isVercel = !!headers.get('x-vercel-id') || window.location.hostname.includes('vercel.app') || window.location.hostname.includes('celikpen.com.tr');
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        setEnv({ isVercel: isVercel && !isLocalhost, hasBlob: false, hasGithub: false });
      })
      .catch(() => setEnv(null));
  }, []);

  if (!env) return null;

  if (env.isVercel) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-950/40 p-4">
        <div className="flex items-start gap-3">
          <span className="text-lg">☁️</span>
          <div>
            <h3 className="text-sm font-extrabold text-amber-200">Vercel Bulut Ortamı</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-amber-300/80">
              Canlı sunucudasınız. &ldquo;Kaydet&rdquo; butonuyla yapılan değişiklikler Blob Storage&apos;a ve sayfa önbelleğine anlık yansır.
              &ldquo;GitHub&apos;a Kaydet&rdquo; ise kalıcı kayıt için Vercel&apos;i yeniden deploy eder.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4">
      <div className="flex items-start gap-3">
        <span className="text-lg">💻</span>
        <div>
          <h3 className="text-sm font-extrabold text-emerald-200">Yerel Geliştirme Ortamı</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-emerald-300/80">
            Localhost&apos;ta çalışıyorsunuz. &ldquo;Kaydet&rdquo; değişiklikleri cms-store.json dosyasına yazar.
            &ldquo;GitHub&apos;a Kaydet&rdquo; ile git push yapılır ve Vercel otomatik deploy başlar.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardTab({ draft, setActiveTab }: AdminTabProps) {
  const pendingRequests = draft.discoveryRequests?.filter(r => r.status === 'pending') || [];

  const checklist = [
    { label: 'Fiyat Hesaplama Motoru', done: draft.pricingSystems.length > 0 },
    { label: 'Referans Galerisi', done: draft.references.length > 0 },
    { label: 'Hizmet Kartları', done: draft.services.length > 0 },
    { label: 'Ürün Kataloğu (Winsa & Albert Genau)', done: draft.products.length > 0 },
    { label: 'Blog & SEO Makaleleri', done: draft.blogPosts.length > 0 },
    { label: 'İletişim & WhatsApp Ayarları', done: !!draft.siteSettings.phoneDisplay },
    { label: 'RBAC Kullanıcı Yönetimi', done: (draft.users?.length ?? 0) > 0 },
    { label: 'Medya Kütüphanesi API', done: true },
  ];

  const priceChartData = draft.pricingSystems.map((s, i) => ({
    label: s.code,
    value: s.pricePerM2,
    color: i % 2 === 0 ? '#2563EB' : '#1E3A8A',
  }));

  return (
    <div className="space-y-6">
      {/* ── Environment Banner ──────────────────────────────── */}
      <EnvironmentBanner />

      {/* ── Hero Banner ─────────────────────────────────────── */}
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
              sitenizde aktif olur.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setActiveTab('pricing')}
              className="rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-[#1E3A8A] shadow transition hover:bg-sky-50">
              m² Fiyatlarını Güncelle
            </button>
            <button type="button" onClick={() => setActiveTab('references')}
              className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-white/20">
              Yeni Proje Fotoğrafı Yükle
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <KpiCard label="Fiyat Sistemleri" value={`${draft.pricingSystems.length}`}
          sub={`Isıcamlı: ${draft.pricingSystems.find(s => s.id === 'vbs_isicam')?.pricePerM2.toLocaleString('tr-TR') ?? '—'} ₺/m²`}
          accent="text-emerald-400" />
        <KpiCard label="Referans Galerisi" value={`${draft.references.length} Proje`}
          sub="/profesyoneller/referanslar" accent="text-sky-300" />
        <KpiCard label="Hizmet & Ürünler" value={`${draft.services.length} / ${draft.products.length}`}
          sub="Winsa & Albert Genau" accent="text-sky-300" />
        <KpiCard label="Blog Yazıları" value={`${draft.blogPosts.length} Makale`}
          sub="SEO Optimizasyonlu" accent="text-violet-300" />
        <KpiCard label="Keşif Talepleri" value={`${draft.discoveryRequests?.length ?? 0}`}
          sub={`${pendingRequests.length} beklemede`}
          accent={pendingRequests.length > 0 ? 'text-amber-300' : 'text-emerald-400'} />
        <KpiCard label="Aktif Telefon" value={draft.siteSettings.phoneDisplay}
          sub={draft.siteSettings.shortAddress} accent="text-emerald-400" />
      </div>

      {/* ── Charts Row ──────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
          <h3 className="mb-3 text-sm font-extrabold text-white">Aylık Ziyaretçi Trendi</h3>
          <AreaChart data={MONTHLY_VISITORS} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
          <h3 className="mb-3 text-sm font-extrabold text-white">Sistem m² Fiyat Karşılaştırması</h3>
          <BarChart data={priceChartData} />
        </div>
      </div>

      {/* ── Discovery Requests Table ────────────────────────── */}
      {draft.discoveryRequests && draft.discoveryRequests.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
          <h3 className="mb-4 text-sm font-extrabold text-white">
            Son Müşteri Keşif Talepleri ({draft.discoveryRequests.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="px-3 py-2">Ad Soyad</th>
                  <th className="px-3 py-2">Telefon</th>
                  <th className="px-3 py-2">İlçe</th>
                  <th className="px-3 py-2">Sistem</th>
                  <th className="px-3 py-2">Mesaj</th>
                  <th className="px-3 py-2">Durum</th>
                  <th className="px-3 py-2">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {draft.discoveryRequests.map(req => (
                  <tr key={req.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="px-3 py-2.5 font-bold text-white">{req.name}</td>
                    <td className="px-3 py-2.5 font-mono text-sky-300">{req.phone}</td>
                    <td className="px-3 py-2.5 text-slate-300">{req.district}</td>
                    <td className="px-3 py-2.5 text-slate-300">{req.system}</td>
                    <td className="max-w-[200px] truncate px-3 py-2.5 text-slate-400">{req.message}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={req.status} /></td>
                    <td className="px-3 py-2.5 text-slate-500">
                      {new Date(req.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Checklist + Quick Actions ───────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChecklistWidget items={checklist} />

        <div className="grid gap-3 sm:grid-cols-1">
          <QuickActionCard icon="💰" title="Canlı m² Fiyatlarını Değiştir"
            desc="Katlanır, Isıcamlı, Sürme, Giyotin, Winsa PVC ve Pergola m² birim fiyatlarını saniyeler içinde güncelleyin."
            btnLabel="Fiyat Tablosunu Aç →" onClick={() => setActiveTab('pricing')} />
          <QuickActionCard icon="📸" title="Projelerimiz / Galeri Yönetimi"
            desc="Bilgisayarınızdan yeni montaj fotoğrafları yükleyin, sıralamayı değiştirin veya silin."
            btnLabel="Fotoğraf Galerisini Yönet →" onClick={() => setActiveTab('references')} />
          <QuickActionCard icon="📝" title="Blog & Google SEO Makaleleri"
            desc="Meta Başlık ve Meta Açıklama sayaçlarıyla SEO uyumlu yeni yazılar ekleyin."
            btnLabel="+ Yeni Blog Yazısı Ekle →" onClick={() => setActiveTab('blog')} />
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────── */

function KpiCard({ label, value, sub, accent }: {
  label: string; value: string; sub: string; accent: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0F172A] p-4">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-black text-white leading-tight">{value}</div>
      <div className={`mt-1 truncate text-[11px] ${accent}`}>{sub}</div>
    </div>
  );
}

function QuickActionCard({ icon, title, desc, btnLabel, onClick }: {
  icon: string; title: string; desc: string; btnLabel: string; onClick: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-4">
      <div className="flex items-start gap-3">
        <span className="text-lg">{icon}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-extrabold text-white">{title}</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{desc}</p>
          <button type="button" onClick={onClick}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#1E3A8A] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#1D4ED8]">
            {btnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
