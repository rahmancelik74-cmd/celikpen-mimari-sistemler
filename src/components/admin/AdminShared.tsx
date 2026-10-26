'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';

// ─── Toast System ────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastItem { id: string; type: ToastType; text: string }

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const show = useCallback((type: ToastType, text: string) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts(p => [...p, { id, type, text }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 5000);
  }, []);
  const dismiss = useCallback((id: string) => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);
  return { toasts, show, dismiss };
}

const TOAST_COLORS: Record<ToastType, string> = {
  success: 'border-emerald-500/40 bg-emerald-950/80 text-emerald-200',
  error: 'border-rose-500/40 bg-rose-950/80 text-rose-200',
  warning: 'border-amber-500/40 bg-amber-950/80 text-amber-200',
  info: 'border-sky-500/40 bg-sky-950/80 text-sky-200',
};

export function ToastStack({ toasts, dismiss }: { toasts: ToastItem[]; dismiss: (id: string) => void }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed right-4 top-20 z-[100] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-start justify-between rounded-xl border px-4 py-3 text-xs font-bold shadow-lg animate-slide-in ${TOAST_COLORS[t.type]}`}>
          <span className="flex-1">{t.text}</span>
          <button type="button" onClick={() => dismiss(t.id)} className="ml-3 shrink-0 rounded px-1.5 py-0.5 text-white/70 hover:bg-white/10">✕</button>
        </div>
      ))}
    </div>
  );
}

// ─── Confirmation Modal ──────────────────────────────────────────
export function ConfirmModal({ open, title, message, onConfirm, onCancel }: {
  open: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
        <h3 className="text-base font-extrabold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-300">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/5">Hayır, Vazgeç</button>
          <button type="button" onClick={onConfirm} className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-rose-500">Evet, Onayla</button>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton Loader ─────────────────────────────────────────────
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-slate-800/60 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
      <Skeleton className="h-4 w-1/3 mb-3" />
      <Skeleton className="h-8 w-2/3 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

// ─── Pagination ──────────────────────────────────────────────────
export function usePagination<T>(items: T[], defaultPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = pageSize === 0 ? items : items.slice((safePage - 1) * pageSize, safePage * pageSize);

  return { paged, page: safePage, setPage, pageSize, setPageSize, totalPages, totalItems: items.length };
}

export function PaginationBar({ page, totalPages, totalItems, pageSize, setPage, setPageSize }: {
  page: number; totalPages: number; totalItems: number; pageSize: number;
  setPage: (p: number) => void; setPageSize: (s: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Toplam: <strong className="text-white">{totalItems}</strong></span>
        <span>|</span>
        <label className="flex items-center gap-1.5">
          Sayfa Boyutu:
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={0}>Tümü</option>
          </select>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}
          className="rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-40">
          ← Önceki
        </button>
        <span className="text-xs font-bold text-slate-300">{page} / {totalPages}</span>
        <button type="button" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}
          className="rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-40">
          Sonraki →
        </button>
      </div>
    </div>
  );
}

// ─── Search Input ────────────────────────────────────────────────
export function SearchInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Ara...'}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none" />
    </div>
  );
}

// ─── Status Badge ────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  published: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  draft: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  archived: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  contacted: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

const STATUS_LABELS: Record<string, string> = {
  published: 'Yayında',
  draft: 'Taslak',
  archived: 'Arşiv',
  pending: 'Beklemede',
  contacted: 'İletişime Geçildi',
  completed: 'Tamamlandı',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${STATUS_STYLES[status] || STATUS_STYLES.draft}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

// ─── Export helpers ───────────────────────────────────────────────
export function exportCsv(headers: string[], rows: string[][], filename: string) {
  const BOM = '﻿';
  const csv = BOM + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportPrintHtml(title: string, tableHtml: string) {
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
<style>body{font-family:system-ui;padding:20px}table{width:100%;border-collapse:collapse}
th,td{border:1px solid #ccc;padding:8px;text-align:left;font-size:12px}
th{background:#1E3A8A;color:#fff}h1{font-size:18px;color:#1E3A8A}</style>
</head><body><h1>${title}</h1>${tableHtml}<script>window.print()</script></body></html>`);
  w.document.close();
}

// ─── Bulk Selection Hook ─────────────────────────────────────────
export function useBulkSelect<T extends { id: string }>(items: T[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggleOne = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);
  const toggleAll = useCallback(() => {
    setSelected(prev => prev.size === items.length ? new Set() : new Set(items.map(i => i.id)));
  }, [items]);
  const clearSelection = useCallback(() => setSelected(new Set()), []);
  const allSelected = items.length > 0 && selected.size === items.length;
  return { selected, toggleOne, toggleAll, clearSelection, allSelected, count: selected.size };
}

// ─── SVG Chart Components ────────────────────────────────────────
export function BarChart({ data, width = 500, height = 220 }: {
  data: { label: string; value: number; color?: string }[]; width?: number; height?: number;
}) {
  const max = Math.max(...data.map(d => d.value), 1);
  const barW = Math.min(40, (width - 80) / data.length - 8);
  const chartH = height - 60;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Fiyat karşılaştırma grafiği">
      {data.map((d, i) => {
        const barH = (d.value / max) * chartH;
        const x = 50 + i * ((width - 80) / data.length);
        const y = chartH - barH + 20;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} rx={4} fill={d.color || '#2563EB'} opacity={0.85} />
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" className="fill-slate-300 text-[9px] font-bold">
              {d.value.toLocaleString('tr-TR')} ₺
            </text>
            <text x={x + barW / 2} y={height - 8} textAnchor="middle" className="fill-slate-400 text-[8px]">
              {d.label.length > 10 ? d.label.slice(0, 10) + '…' : d.label}
            </text>
          </g>
        );
      })}
      <line x1={45} y1={20} x2={45} y2={chartH + 20} stroke="#334155" strokeWidth={1} />
      <line x1={45} y1={chartH + 20} x2={width - 10} y2={chartH + 20} stroke="#334155" strokeWidth={1} />
    </svg>
  );
}

export function AreaChart({ data, width = 500, height = 200 }: {
  data: { label: string; value: number }[]; width?: number; height?: number;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data.map(d => d.value), 1);
  const padL = 50, padR = 20, padT = 20, padB = 35;
  const cw = width - padL - padR;
  const ch = height - padT - padB;
  const pts = data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * cw,
    y: padT + ch - (d.value / max) * ch,
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${padT + ch} L${pts[0].x},${padT + ch} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Aylık büyüme grafiği">
      <defs>
        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1={padL} y1={padT} x2={padL} y2={padT + ch} stroke="#334155" strokeWidth={1} />
      <line x1={padL} y1={padT + ch} x2={padL + cw} y2={padT + ch} stroke="#334155" strokeWidth={1} />
      <path d={areaPath} fill="url(#area-grad)" />
      <path d={linePath} fill="none" stroke="#2563EB" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={data[i].label}>
          <circle cx={p.x} cy={p.y} r={3.5} fill="#2563EB" stroke="#0F172A" strokeWidth={2} />
          <text x={p.x} y={padT + ch + 15} textAnchor="middle" className="fill-slate-400 text-[8px]">{data[i].label}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Checklist Widget ────────────────────────────────────────────
export function ChecklistWidget({ items }: { items: { label: string; done: boolean }[] }) {
  const doneCount = items.filter(i => i.done).length;
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-white">Teslimat Durumu</h3>
        <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold ${doneCount === items.length ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
          {doneCount}/{items.length} Modül Aktif
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs">
            <span className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold ${item.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
              {item.done ? '✓' : '○'}
            </span>
            <span className={item.done ? 'font-bold text-white' : 'text-slate-400'}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
