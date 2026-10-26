'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { AdminTabProps } from './types';
import { ROLE_LABELS, type CmsAuditLog, type UserRole } from '../../lib/cms';
import { SearchInput, PaginationBar, usePagination, exportCsv } from './AdminShared';

type SubTab = 'corporate' | 'smtp' | 'maintenance' | 'logs' | 'health';

const SUB_TABS: { id: SubTab; label: string }[] = [
  { id: 'corporate', label: 'Kurumsal Ayarlar' },
  { id: 'smtp', label: 'SMTP E-Posta' },
  { id: 'maintenance', label: 'Bakım Modu' },
  { id: 'logs', label: 'Denetim Logları' },
  { id: 'health', label: 'API Sağlık' },
];

interface HealthStatus { name: string; url: string; ok: boolean | null; ms: number; checkedAt: string | null }

export default function AdminSettingsLogsTab(props: AdminTabProps) {
  const { draft, setDraft, saveAllToCms, isSaving, showNotice } = props;
  const [sub, setSub] = useState<SubTab>('corporate');
  const [logSearch, setLogSearch] = useState('');
  const [logRoleFilter, setLogRoleFilter] = useState<UserRole | ''>('');

  const updateSite = (patch: Partial<typeof draft.siteSettings>) =>
    setDraft(p => ({ ...p, siteSettings: { ...p.siteSettings, ...patch } }));
  const updateSmtp = (patch: Partial<typeof draft.smtpSettings>) =>
    setDraft(p => ({ ...p, smtpSettings: { ...p.smtpSettings, ...patch } }));

  const filteredLogs = draft.auditLogs.filter(l => {
    if (logRoleFilter && l.role !== logRoleFilter) return false;
    if (logSearch && !l.summary.toLowerCase().includes(logSearch.toLowerCase())) return false;
    return true;
  });
  const pg = usePagination(filteredLogs, 10);

  const handleExportLogs = () => {
    const headers = ['Tarih', 'Kullanıcı', 'Rol', 'Modül', 'İşlem', 'Özet'];
    const rows = filteredLogs.map(l => [
      new Date(l.timestamp).toLocaleString('tr-TR'), l.userName, ROLE_LABELS[l.role] || l.role, l.module, l.action, l.summary,
    ]);
    exportCsv(headers, rows, `celikpen-audit-logs-${new Date().toISOString().slice(0, 10)}.csv`);
    showNotice('success', 'Denetim logları CSV olarak indirildi.');
  };

  // Health check
  const [health, setHealth] = useState<HealthStatus[]>([
    { name: 'CMS API', url: '/api/admin/cms', ok: null, ms: 0, checkedAt: null },
    { name: 'Media API', url: '/api/admin/media', ok: null, ms: 0, checkedAt: null },
    { name: 'Upload API', url: '/api/admin/upload', ok: null, ms: 0, checkedAt: null },
  ]);

  const runHealthCheck = useCallback(async () => {
    const results = await Promise.all(
      health.map(async h => {
        const start = Date.now();
        try {
          const r = await fetch(h.url, { method: 'GET', cache: 'no-store' });
          return { ...h, ok: r.ok, ms: Date.now() - start, checkedAt: new Date().toISOString() };
        } catch {
          return { ...h, ok: false, ms: Date.now() - start, checkedAt: new Date().toISOString() };
        }
      })
    );
    setHealth(results);
  }, [health]);

  useEffect(() => { if (sub === 'health') { void runHealthCheck(); } }, [sub]); // eslint-disable-line react-hooks/exhaustive-deps

  const ACTION_COLORS: Record<string, string> = {
    GÜNCELLEME: 'text-sky-300 bg-sky-500/15',
    EKLEME: 'text-emerald-300 bg-emerald-500/15',
    SİLME: 'text-rose-300 bg-rose-500/15',
    GÜVENLİK: 'text-amber-300 bg-amber-500/15',
    YAYIN: 'text-violet-300 bg-violet-500/15',
    GİRİŞ: 'text-slate-300 bg-slate-500/15',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">Sistem Ayarları & Denetim</span>
          <h1 className="mt-1 text-xl font-black text-white">Kurumsal Ayarlar, E-Posta & Denetim Logları</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200">
            <span>{draft.themeSettings.darkMode ? '🌙 Koyu Tema' : '☀️ Açık Tema'}</span>
            <input type="checkbox" checked={draft.themeSettings.darkMode} onChange={e => setDraft(p => ({ ...p, themeSettings: { ...p.themeSettings, darkMode: e.target.checked } }))} className="h-4 w-4 accent-sky-500" />
          </label>
        </div>
      </div>

      {/* Sub-tab navigation */}
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-[#0F172A] p-2">
        {SUB_TABS.map(t => (
          <button key={t.id} type="button" onClick={() => setSub(t.id)}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${sub === t.id ? 'bg-[#1E3A8A] text-white shadow' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Kurumsal Ayarlar ── */}
      {sub === 'corporate' && (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0F172A] p-6">
          <h2 className="text-sm font-extrabold text-white">İletişim & Kurumsal Bilgiler</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Telefon (Görünüm)" value={draft.siteSettings.phoneDisplay} onChange={v => updateSite({ phoneDisplay: v })} />
            <Field label="Telefon (tel: kodu)" value={draft.siteSettings.phoneRaw} onChange={v => updateSite({ phoneRaw: v })} mono />
            <Field label="WhatsApp Numarası" value={draft.siteSettings.whatsappNumber} onChange={v => updateSite({ whatsappNumber: v })} mono />
            <Field label="WhatsApp Buton Metni" value={draft.siteSettings.whatsappText} onChange={v => updateSite({ whatsappText: v })} />
            <Field label="E-Posta" value={draft.siteSettings.email} onChange={v => updateSite({ email: v })} className="md:col-span-2" />
            <Field label="Showroom Açık Adresi" value={draft.siteSettings.address} onChange={v => updateSite({ address: v })} className="md:col-span-2" />
            <Field label="Kısa Adres" value={draft.siteSettings.shortAddress} onChange={v => updateSite({ shortAddress: v })} />
            <Field label="Çalışma Saatleri" value={draft.siteSettings.workingHours} onChange={v => updateSite({ workingHours: v })} />
            <Field label="Deneyim (Yıl)" value={String(draft.siteSettings.experienceYears)} onChange={v => updateSite({ experienceYears: Number(v) || 0 })} />
            <Field label="Duyuru Metni" value={draft.siteSettings.announcementText} onChange={v => updateSite({ announcementText: v })} />
          </div>
          <h3 className="mt-4 text-xs font-extrabold uppercase tracking-wider text-sky-300">Sosyal Medya Bağlantıları</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Instagram" value={draft.siteSettings.instagramUrl} onChange={v => updateSite({ instagramUrl: v })} />
            <Field label="YouTube" value={draft.siteSettings.youtubeUrl} onChange={v => updateSite({ youtubeUrl: v })} />
            <Field label="Facebook" value={draft.siteSettings.facebookUrl} onChange={v => updateSite({ facebookUrl: v })} />
            <Field label="LinkedIn" value={draft.siteSettings.linkedinUrl} onChange={v => updateSite({ linkedinUrl: v })} />
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" disabled={isSaving} onClick={() => void saveAllToCms(draft, 'Kurumsal ayarlar tüm sitede güncellendi!')}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-extrabold text-white shadow hover:bg-emerald-500 disabled:opacity-50">💾 Ayarları Kaydet</button>
          </div>
        </div>
      )}

      {/* ── SMTP E-Posta ── */}
      {sub === 'smtp' && (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0F172A] p-6">
          <h2 className="text-sm font-extrabold text-white">SMTP Mail Sunucu Ayarları</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="SMTP Host" value={draft.smtpSettings.host} onChange={v => updateSmtp({ host: v })} />
            <Field label="Port" value={String(draft.smtpSettings.port)} onChange={v => updateSmtp({ port: Number(v) || 587 })} />
            <Field label="Kullanıcı Adı" value={draft.smtpSettings.user} onChange={v => updateSmtp({ user: v })} />
            <Field label="Şifre" value={draft.smtpSettings.password} onChange={v => updateSmtp({ password: v })} type="password" />
            <Field label="Gönderici Adı" value={draft.smtpSettings.senderName} onChange={v => updateSmtp({ senderName: v })} />
            <Field label="Gönderici E-Posta" value={draft.smtpSettings.senderEmail} onChange={v => updateSmtp({ senderEmail: v })} />
            <div>
              <label className="block text-xs font-bold text-slate-300">Şifreleme</label>
              <select value={draft.smtpSettings.encryption} onChange={e => updateSmtp({ encryption: e.target.value as 'TLS' | 'SSL' | 'NONE' })}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white">
                <option value="TLS">TLS</option><option value="SSL">SSL</option><option value="NONE">Yok</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={() => showNotice('success', 'Test e-postası başarıyla gönderildi (simülasyon).')}
              className="rounded-lg border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-xs font-bold text-sky-200 hover:bg-sky-500/20">📧 Test E-Postası Gönder</button>
            <button type="button" disabled={isSaving} onClick={() => void saveAllToCms(draft, 'SMTP ayarları kaydedildi!')}
              className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500 disabled:opacity-50">💾 SMTP Ayarlarını Kaydet</button>
          </div>
        </div>
      )}

      {/* ── Bakım Modu ── */}
      {sub === 'maintenance' && (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0F172A] p-6">
          {draft.maintenanceMode.enabled && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-950/50 p-4 text-xs font-bold text-rose-200">
              ⚠️ DİKKAT: Bakım modu aktif! Ziyaretçiler siteye erişemez.
            </div>
          )}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white">🔧 Bakım Modu</h2>
            <button type="button"
              onClick={() => {
                const next = !draft.maintenanceMode.enabled;
                setDraft(p => ({ ...p, maintenanceMode: { ...p.maintenanceMode, enabled: next } }));
                void saveAllToCms({ ...draft, maintenanceMode: { ...draft.maintenanceMode, enabled: next } }, next ? 'Bakım modu etkinleştirildi!' : 'Bakım modu kapatıldı.');
              }}
              className={`rounded-xl px-6 py-3 text-sm font-extrabold shadow transition ${draft.maintenanceMode.enabled ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}>
              {draft.maintenanceMode.enabled ? '🔴 Bakım Modunu Kapat' : '🟢 Bakım Modunu Aç'}
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Bakım Sayfası Başlığı" value={draft.maintenanceMode.title} onChange={v => setDraft(p => ({ ...p, maintenanceMode: { ...p.maintenanceMode, title: v } }))} />
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300">Bakım Mesajı</label>
              <textarea rows={3} value={draft.maintenanceMode.message}
                onChange={e => setDraft(p => ({ ...p, maintenanceMode: { ...p.maintenanceMode, message: e.target.value } }))}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white" />
            </div>
          </div>
        </div>
      )}

      {/* ── Denetim Logları ── */}
      {sub === 'logs' && (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0F172A] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-extrabold text-white">Kim, Ne Zaman, Ne Yaptı?</h2>
            <button type="button" onClick={handleExportLogs}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/10">📥 CSV İndir</button>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex-1"><SearchInput value={logSearch} onChange={setLogSearch} placeholder="Logda ara..." /></div>
            <select value={logRoleFilter} onChange={e => setLogRoleFilter(e.target.value as UserRole | '')}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white">
              <option value="">Tüm Roller</option>
              {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">Henüz denetim kaydı bulunmuyor.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-white/10 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-3 py-2">Tarih</th><th className="px-3 py-2">Kullanıcı</th><th className="px-3 py-2">Rol</th>
                    <th className="px-3 py-2">Modül</th><th className="px-3 py-2">İşlem</th><th className="px-3 py-2">Özet</th>
                  </tr></thead>
                  <tbody>
                    {pg.paged.map((l: CmsAuditLog) => (
                      <tr key={l.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="whitespace-nowrap px-3 py-2 text-slate-400">{new Date(l.timestamp).toLocaleString('tr-TR')}</td>
                        <td className="px-3 py-2 font-bold text-white">{l.userName}</td>
                        <td className="px-3 py-2"><span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold text-sky-300">{ROLE_LABELS[l.role] || l.role}</span></td>
                        <td className="px-3 py-2 text-slate-300">{l.module}</td>
                        <td className="px-3 py-2"><span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${ACTION_COLORS[l.action] || 'text-slate-300 bg-slate-500/15'}`}>{l.action}</span></td>
                        <td className="px-3 py-2 text-slate-300">{l.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PaginationBar page={pg.page} totalPages={pg.totalPages} totalItems={pg.totalItems} pageSize={pg.pageSize} setPage={pg.setPage} setPageSize={pg.setPageSize} />
            </>
          )}
        </div>
      )}

      {/* ── API Sağlık ── */}
      {sub === 'health' && (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0F172A] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white">API Durum Monitörü</h2>
            <button type="button" onClick={() => void runHealthCheck()}
              className="rounded-lg border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-xs font-bold text-sky-200 hover:bg-sky-500/20">🔄 Yeniden Kontrol Et</button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {health.map(h => (
              <div key={h.name} className="rounded-xl border border-white/10 bg-slate-900/75 p-5">
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${h.ok === null ? 'bg-slate-500 animate-pulse' : h.ok ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                  <span className="text-sm font-extrabold text-white">{h.name}</span>
                </div>
                <p className="mt-1 text-[11px] font-mono text-slate-400">{h.url}</p>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className={h.ok ? 'font-bold text-emerald-300' : h.ok === false ? 'font-bold text-rose-300' : 'text-slate-500'}>
                    {h.ok === null ? 'Kontrol ediliyor...' : h.ok ? `Çalışıyor (${h.ms}ms)` : `Hata (${h.ms}ms)`}
                  </span>
                  {h.checkedAt && <span className="text-slate-500">{new Date(h.checkedAt).toLocaleTimeString('tr-TR')}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, mono, type, className }: {
  label: string; value: string; onChange: (v: string) => void; mono?: boolean; type?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-slate-300">{label}</label>
      <input type={type || 'text'} value={value} onChange={e => onChange(e.target.value)}
        className={`mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white ${mono ? 'font-mono text-sky-300' : ''}`} />
    </div>
  );
}
