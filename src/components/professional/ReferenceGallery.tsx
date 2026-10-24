'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MAGAZINE_REFERENCES,
  REFERENCE_FILTERS,
  type ReferenceProject,
} from '../../config/professional-magazine.config';

type ReferenceFilter = (typeof REFERENCE_FILTERS)[number];

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReferenceGallery() {
  const [activeFilter, setActiveFilter] = useState<ReferenceFilter>('Tümü');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tümü') return MAGAZINE_REFERENCES;
    return MAGAZINE_REFERENCES.filter((project) => project.filterCategory === activeFilter);
  }, [activeFilter]);

  const selectedProject: ReferenceProject | null =
    selectedIndex === null ? null : filteredProjects[selectedIndex] ?? null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) =>
          current === null
            ? null
            : (current - 1 + filteredProjects.length) % filteredProjects.length
        );
      }
      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % filteredProjects.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, filteredProjects.length]);

  const changeFilter = (filter: ReferenceFilter) => {
    setActiveFilter(filter);
    setSelectedIndex(null);
  };

  const openProject = (project: ReferenceProject) => {
    const index = filteredProjects.findIndex((item) => item.id === project.id);
    setSelectedIndex(index >= 0 ? index : null);
  };

  return (
    <div className="bg-[#F8FAFC] pb-16">
      <section className="relative overflow-hidden bg-[#0F172A] pt-10 pb-14 text-white sm:pt-14 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,197,253,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.15) 1px, transparent 1px)',
            backgroundSize: '58px 58px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#1E3A8A] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#D91B24]/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10.5px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Ana Sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/profesyoneller" className="transition-colors hover:text-white">
              Profesyoneller
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-sky-200">Referanslar</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24]" aria-hidden="true" />
                Projelerimiz &amp; Uygulama Galerisi
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px]">
                İstanbul cephelerinde{' '}
                <span className="text-sky-300">30 yıllık saha imzası.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[12.5px] leading-6 text-slate-300 sm:text-[13px]">
                Bahçelievler, Bakırköy, Ataköy, Florya, Yeşilköy ve Başakşehir’de tamamlanan cam
                balkon, PVC doğrama, kaldır-sür ve bioklimatik pergola projelerinden seçkiler.
                Her kare, kendi montaj ekibimiz tarafından teslim edilen gerçek bir uygulamadır.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '10+', label: 'Öne çıkan proje' },
                { value: '30', label: 'Yıllık tecrübe' },
                { value: '10 Yıl', label: 'Sistem garantisi' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center backdrop-blur-sm"
                >
                  <div className="text-lg font-black text-white">{stat.value}</div>
                  <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell relative -mt-7">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.45)] sm:p-4">
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Referans kategorileri">
            {REFERENCE_FILTERS.map((filter) => {
              const selected = activeFilter === filter;
              const count =
                filter === 'Tümü'
                  ? MAGAZINE_REFERENCES.length
                  : MAGAZINE_REFERENCES.filter((project) => project.filterCategory === filter)
                      .length;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => changeFilter(filter)}
                  className={`rounded-lg px-3 py-2 text-[11px] font-bold transition ${
                    selected
                      ? 'bg-[#1E3A8A] text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-[#1E3A8A] hover:text-[#1E3A8A]'
                  }`}
                >
                  {filter}
                  <span
                    className={`ml-1.5 text-[9.5px] font-semibold ${
                      selected ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 flex items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3A8A]">
              Uygulama arşivi
            </span>
            <h2 className="mt-1 text-xl font-black text-[#0F172A]">
              {activeFilter === 'Tümü' ? 'Tamamlanan projeler' : activeFilter}
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {filteredProjects.length} proje
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-34px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-[0_24px_48px_-30px_rgba(30,58,138,0.4)]"
              onClick={() => openProject(project)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openProject(project);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${project.title} projesini büyüt`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={720}
                  height={450}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[9.5px] font-extrabold text-[#0F172A] shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24]" aria-hidden="true" />
                  {project.locationBadge}
                </span>
                <span className="absolute right-3 top-3 rounded-md border border-white/20 bg-slate-950/65 px-2 py-1 text-[9.5px] font-bold text-sky-100 backdrop-blur-sm">
                  {project.year}
                </span>
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                  <span className="rounded-md bg-[#1E3A8A]/95 px-2 py-1 text-[9.5px] font-bold uppercase tracking-[0.08em] text-white">
                    {project.filterCategory}
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#1E3A8A]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[14px] font-black leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
                  {project.title}
                </h3>
                <p className="mt-2 text-[11px] font-semibold leading-5 text-[#1E3A8A]">
                  {project.systemUsed}
                </p>
                <p className="mt-1 text-[10.5px] leading-5 text-slate-500">{project.highlight}</p>
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <span className="text-[10px] font-semibold text-slate-500">{project.area}</span>
                  <span className="text-[10.5px] font-extrabold text-[#1E3A8A]">Galeriyi Aç →</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 sm:flex-row sm:items-center">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1E3A8A]">
              Benzer bir proje mi planlıyorsunuz?
            </div>
            <p className="mt-1 text-[12px] leading-5 text-slate-600">
              Cephenizi yerinde ölçelim; sistem, cam ve renk alternatiflerini birlikte netleştirelim.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/iletisim?form=kesif"
              className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              Ücretsiz Keşif
            </Link>
            <Link
              href="/fiyat-hesapla"
              className="rounded-lg border border-[#1E3A8A]/30 bg-white px-4 py-2.5 text-[11px] font-bold text-[#1E3A8A] transition hover:border-[#1E3A8A]"
            >
              2026 Fiyat Hesapla
            </Link>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#020617]/80 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reference-lightbox-title"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative flex max-h-[93vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1E3A8A]">
                Proje Galerisi • {selectedProject.locationBadge}
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Galeriyi kapat"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-[#0F172A]"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="relative bg-slate-900">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  width={1400}
                  height={800}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="max-h-[52vh] w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((current) =>
                      current === null
                        ? null
                        : (current - 1 + filteredProjects.length) % filteredProjects.length
                    )
                  }
                  aria-label="Önceki proje"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/65 text-white backdrop-blur-sm transition hover:bg-slate-950"
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((current) =>
                      current === null ? null : (current + 1) % filteredProjects.length
                    )
                  }
                  aria-label="Sonraki proje"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/65 text-white backdrop-blur-sm transition hover:bg-slate-950"
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#1E3A8A] px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-white">
                    {selectedProject.filterCategory}
                  </span>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[9.5px] font-bold text-slate-600">
                    {selectedProject.district}
                  </span>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[9.5px] font-bold text-slate-600">
                    {selectedProject.year}
                  </span>
                </div>

                <h2
                  id="reference-lightbox-title"
                  className="mt-3 text-xl font-black leading-tight text-[#0F172A] sm:text-2xl"
                >
                  {selectedProject.title}
                </h2>
                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  {selectedProject.highlight}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ['Kullanılan Sistem', selectedProject.systemUsed],
                    ['Renk & Cam', selectedProject.color],
                    ['Metraj', selectedProject.area],
                    ['Lokasyon', selectedProject.district],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        {label}
                      </div>
                      <div className="mt-1 text-[11px] font-semibold leading-5 text-[#0F172A]">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                  <span className="text-[10px] font-semibold text-slate-400">
                    Proje {selectedIndex !== null ? selectedIndex + 1 : 1} / {filteredProjects.length}
                    {' '}• Ok tuşlarıyla gezinebilirsiniz
                  </span>
                  <Link
                    href="/iletisim?form=kesif"
                    className="rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#1D4ED8]"
                  >
                    Benzer Proje İçin Keşif İste
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
