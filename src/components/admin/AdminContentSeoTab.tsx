'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import type { AdminTabProps, CmsBlogPostItem, CmsStoreData } from './types';
import type { ContentStatus } from '../../lib/cms';
import { StatusBadge, SearchInput, PaginationBar, usePagination, ConfirmModal } from './AdminShared';

function slugifyTurkish(text: string): string {
  return text.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const EMPTY_POST: CmsBlogPostItem = {
  slug: '', title: '', metaTitle: '', metaDescription: '', primaryKeyword: '',
  category: 'Cam Balkon', tags: [], status: 'draft', readTime: 8,
  publishedAt: new Date().toISOString().slice(0, 10),
  updatedAt: new Date().toISOString().slice(0, 10),
  coverImage: '/images/services/isicamli-cam-balkon.jpg',
  youtubeVideoId: '', ogImage: '', ogTitle: '', ogDescription: '', canonicalUrl: '',
  excerpt: '', contentHtml: '',
};

const STATUS_OPTIONS: { value: ContentStatus; label: string; cls: string }[] = [
  { value: 'published', label: 'Yayında', cls: 'bg-emerald-600 text-white' },
  { value: 'draft', label: 'Taslak', cls: 'bg-amber-600 text-white' },
  { value: 'archived', label: 'Arşiv', cls: 'bg-slate-600 text-white' },
];

const TOOLBAR: { label: string; prefix: string; suffix: string }[] = [
  { label: 'B', prefix: '**', suffix: '**' },
  { label: 'I', prefix: '*', suffix: '*' },
  { label: 'H2', prefix: '\n## ', suffix: '' },
  { label: 'H3', prefix: '\n### ', suffix: '' },
  { label: 'List', prefix: '\n- ', suffix: '' },
  { label: 'Link', prefix: '[', suffix: '](url)' },
  { label: 'Img', prefix: '![alt](', suffix: ')' },
  { label: 'Table', prefix: '\n| Başlık | Değer |\n|--------|-------|\n| ', suffix: ' | |\n' },
];

export default function AdminContentSeoTab(props: AdminTabProps) {
  const { draft, saveAllToCms, isSaving, showNotice, uploadImageFile } = props;

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [bd, setBd] = useState<CmsBlogPostItem>({ ...EMPTY_POST });
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const categories = useMemo(() => [...new Set(draft.blogPosts.map(p => p.category))], [draft.blogPosts]);

  const filtered = useMemo(() => {
    let list = draft.blogPosts;
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (catFilter) list = list.filter(p => p.category === catFilter);
    if (statusFilter) list = list.filter(p => (p.status || 'published') === statusFilter);
    return list;
  }, [draft.blogPosts, search, catFilter, statusFilter]);

  const pag = usePagination(filtered, 10);

  const openNew = () => {
    const today = new Date().toISOString().slice(0, 10);
    setEditIdx(null);
    setBd({ ...EMPTY_POST, publishedAt: today, updatedAt: today });
    setTagsInput('');
    setShowEditor(true);
  };

  const openEdit = (globalIdx: number) => {
    const post = draft.blogPosts[globalIdx];
    if (!post) return;
    setEditIdx(globalIdx);
    setBd({ ...post });
    setTagsInput((post.tags || []).join(', '));
    setShowEditor(true);
  };

  const insertAtCursor = (prefix: string, suffix: string) => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = bd.contentHtml.substring(start, end) || 'metin';
    const newVal = bd.contentHtml.substring(0, start) + prefix + sel + suffix + bd.contentHtml.substring(end);
    setBd(p => ({ ...p, contentHtml: newVal }));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + prefix.length, start + prefix.length + sel.length); }, 0);
  };

  const saveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bd.title.trim()) { showNotice('error', 'Makale başlığı gerekli.'); return; }
    const finalSlug = bd.slug.trim() || slugifyTurkish(bd.title);
    const article: CmsBlogPostItem = {
      ...bd, slug: finalSlug, updatedAt: new Date().toISOString().slice(0, 10),
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
    };
    const posts = [...draft.blogPosts];
    if (editIdx !== null && posts[editIdx]) posts[editIdx] = article;
    else posts.unshift(article);
    setShowEditor(false);
    await saveAllToCms({ ...draft, blogPosts: posts } as CmsStoreData, 'Blog makalesi ve SEO meta etiketleri kaydedildi!');
  };

  const confirmDelete = async () => {
    if (deleteIdx === null) return;
    const posts = draft.blogPosts.filter((_, i) => i !== deleteIdx);
    setDeleteIdx(null);
    await saveAllToCms({ ...draft, blogPosts: posts } as CmsStoreData, 'Blog yazısı silindi.');
  };

  const globalIndex = (pageItem: CmsBlogPostItem) => draft.blogPosts.findIndex(p => p.slug === pageItem.slug);
  const mtLen = bd.metaTitle.trim().length;
  const mdLen = bd.metaDescription.trim().length;
  const serpTitle = bd.ogTitle || bd.metaTitle || bd.title || 'Başlık';
  const serpDesc = bd.ogDescription || bd.metaDescription || bd.excerpt || 'Açıklama...';
  const serpImg = bd.ogImage || bd.coverImage;

  return (
    <div className="space-y-6">
      <ConfirmModal open={deleteIdx !== null} title="Makaleyi Sil" message="Bu blog yazısını kalıcı olarak silmek istediğinize emin misiniz?" onConfirm={() => void confirmDelete()} onCancel={() => setDeleteIdx(null)} />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">/profesyoneller/blog & /blog/[slug]</span>
          <h1 className="mt-1 text-xl font-black text-white">Blog & SEO İçerik Yönetimi ({draft.blogPosts.length})</h1>
          <p className="mt-1 text-xs text-slate-400">WYSIWYG, Meta Tag sayaçları, SERP & OG önizleme ile içerik üretin.</p>
        </div>
        <button type="button" onClick={openNew} className="rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-xs font-extrabold text-white shadow ring-1 ring-sky-400/30 hover:bg-[#1D4ED8]">+ Yeni Makale</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-64"><SearchInput value={search} onChange={setSearch} placeholder="Başlık ile ara..." /></div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white">
          <option value="">Tüm Kategoriler</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white">
          <option value="">Tüm Durumlar</option>
          <option value="published">Yayında</option>
          <option value="draft">Taslak</option>
          <option value="archived">Arşiv</option>
        </select>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <form onSubmit={e => void saveBlog(e)} className="space-y-4 rounded-2xl border border-sky-400/40 bg-slate-900 p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-extrabold text-white">{editIdx !== null ? '✏️ Makaleyi Düzenle' : '+ Yeni SEO Makale'}</h2>
            <button type="button" onClick={() => setShowEditor(false)} className="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold text-slate-300 hover:bg-white/20">Kapat ✕</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-300">Başlık (H1) *</label>
              <input type="text" required value={bd.title} onChange={e => { const t = e.target.value; setBd(p => ({ ...p, title: t, slug: p.slug || slugifyTurkish(t) })); }} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">SEO URL (Slug)</label>
              <input type="text" value={bd.slug} onChange={e => setBd(p => ({ ...p, slug: slugifyTurkish(e.target.value) }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-sky-300" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-slate-300">Kategori</label>
              <input type="text" value={bd.category} onChange={e => setBd(p => ({ ...p, category: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">Etiketler (virgülle)</label>
              <input type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="cam balkon, fiyat, 2026" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">Durum</label>
              <div className="mt-1 flex gap-1">
                {STATUS_OPTIONS.map(s => (
                  <button key={s.value} type="button" onClick={() => setBd(p => ({ ...p, status: s.value }))}
                    className={`rounded-lg px-3 py-2 text-[10px] font-extrabold transition ${(bd.status || 'draft') === s.value ? s.cls : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{s.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Meta Title & Description with counters */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">Meta Title (50–60 kr)</label>
                <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold ${mtLen >= 50 && mtLen <= 60 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>{mtLen}/60</span>
              </div>
              <input type="text" value={bd.metaTitle} onChange={e => setBd(p => ({ ...p, metaTitle: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">Odak Anahtar Kelime</label>
              <input type="text" value={bd.primaryKeyword} onChange={e => setBd(p => ({ ...p, primaryKeyword: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">Meta Description (150–160 kr)</label>
              <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold ${mdLen >= 145 && mdLen <= 165 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>{mdLen}/160</span>
            </div>
            <textarea rows={2} value={bd.metaDescription} onChange={e => setBd(p => ({ ...p, metaDescription: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
          </div>

          {/* OG Fields */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-slate-300">OG Image</label>
              <div className="mt-1 flex items-center gap-1.5">
                <input type="text" value={bd.ogImage || ''} onChange={e => setBd(p => ({ ...p, ogImage: e.target.value }))} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs font-mono text-sky-300" />
                <label className="shrink-0 cursor-pointer rounded-lg bg-[#1E3A8A] px-2.5 py-2 text-xs font-bold text-white">
                  <span>Yükle</span>
                  <input type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (f) { const u = await uploadImageFile(f); if (u) setBd(p => ({ ...p, ogImage: u })); } }} />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">OG Title</label>
              <input type="text" value={bd.ogTitle || ''} onChange={e => setBd(p => ({ ...p, ogTitle: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">OG Description</label>
              <input type="text" value={bd.ogDescription || ''} onChange={e => setBd(p => ({ ...p, ogDescription: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
            </div>
          </div>

          {/* Cover, YouTube, Excerpt */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-slate-300">Kapak Görseli</label>
              <div className="mt-1 flex items-center gap-1.5">
                <input type="text" value={bd.coverImage} onChange={e => setBd(p => ({ ...p, coverImage: e.target.value }))} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs font-mono text-sky-300" />
                <label className="shrink-0 cursor-pointer rounded-lg bg-[#1E3A8A] px-2.5 py-2 text-xs font-bold text-white">
                  <span>Yükle</span>
                  <input type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (f) { const u = await uploadImageFile(f); if (u) setBd(p => ({ ...p, coverImage: u })); } }} />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">YouTube Video ID</label>
              <input type="text" value={bd.youtubeVideoId || ''} onChange={e => setBd(p => ({ ...p, youtubeVideoId: e.target.value }))} placeholder="M7lc1UVf-VE" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-sky-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">Okuma Süresi (dk)</label>
              <input type="number" min={1} value={bd.readTime} onChange={e => setBd(p => ({ ...p, readTime: Number(e.target.value) || 5 }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300">Kısa Özet (Excerpt)</label>
            <textarea rows={2} value={bd.excerpt} onChange={e => setBd(p => ({ ...p, excerpt: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" />
          </div>

          {/* WYSIWYG Toolbar + Content */}
          <div>
            <label className="block text-xs font-bold text-slate-300">Makale İçeriği (Markdown)</label>
            <div className="mt-1 flex flex-wrap gap-1 rounded-t-lg border border-b-0 border-slate-700 bg-slate-800 px-2 py-1.5">
              {TOOLBAR.map(t => (
                <button key={t.label} type="button" onClick={() => insertAtCursor(t.prefix, t.suffix)}
                  className="rounded px-2 py-1 text-[10px] font-extrabold text-slate-200 hover:bg-slate-600">{t.label}</button>
              ))}
            </div>
            <textarea ref={contentRef} rows={8} value={bd.contentHtml} onChange={e => setBd(p => ({ ...p, contentHtml: e.target.value }))}
              className="w-full rounded-b-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white font-mono" />
          </div>

          {/* SERP & WhatsApp Preview */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white p-4">
              <div className="text-[10px] font-bold text-slate-400 mb-2">Google SERP Önizleme</div>
              <div className="text-sm font-medium text-blue-700 leading-tight truncate">{serpTitle}</div>
              <div className="text-xs text-green-700 mt-0.5 truncate">celikpen.com/blog/{bd.slug || '...'}</div>
              <div className="text-xs text-gray-600 mt-1 line-clamp-2">{serpDesc}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-800 p-4">
              <div className="text-[10px] font-bold text-slate-400 mb-2">WhatsApp Paylaşım Kartı</div>
              <div className="flex gap-3 rounded-lg border border-white/10 bg-slate-900 p-2.5">
                {serpImg && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={serpImg} alt="og" className="h-16 w-16 shrink-0 rounded object-cover" />
                )}
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{serpTitle}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{serpDesc}</div>
                  <div className="text-[10px] text-sky-400 mt-1">celikpen.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowEditor(false)} className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold text-slate-300">İptal</button>
            <button type="submit" disabled={isSaving} className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-500 disabled:opacity-50">💾 Kaydet & Yayınla</button>
          </div>
        </form>
      )}

      {/* Blog List */}
      <div className="space-y-3">
        {pag.paged.map(post => {
          const gi = globalIndex(post);
          return (
            <div key={post.slug} className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#0F172A] p-4 sm:flex-row sm:items-center">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#1E3A8A] px-2.5 py-0.5 text-[10px] font-extrabold text-sky-200">{post.category}</span>
                  <StatusBadge status={post.status || 'published'} />
                  <span className="text-[11px] font-mono text-slate-400">/blog/{post.slug}</span>
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">T:{post.metaTitle.length} D:{post.metaDescription.length}</span>
                </div>
                <h3 className="text-sm font-extrabold text-white truncate">{post.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">{post.tags.map(t => <span key={t} className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">{t}</span>)}</div>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link href={`/blog/${post.slug}`} target="_blank" className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-sky-300 hover:bg-white/10">Gör ↗</Link>
                <button type="button" onClick={() => openEdit(gi)} className="rounded-lg bg-[#1E3A8A] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1D4ED8]">✏️ Düzenle</button>
                <button type="button" onClick={() => setDeleteIdx(gi)} className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20">Sil</button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length > 5 && (
        <PaginationBar page={pag.page} totalPages={pag.totalPages} totalItems={pag.totalItems} pageSize={pag.pageSize} setPage={pag.setPage} setPageSize={pag.setPageSize} />
      )}
    </div>
  );
}
