import React from 'react';
import Link from 'next/link';

interface MinimalSubpageHeaderProps {
  breadcrumbLabel: string;
  parentBreadcrumb?: { label: string; href: string };
  overline: string;
  title: string;
  subtitle: string;
  rightAction?: React.ReactNode;
}

export const MinimalSubpageHeader: React.FC<MinimalSubpageHeaderProps> = ({
  breadcrumbLabel,
  parentBreadcrumb,
  overline,
  title,
  subtitle,
  rightAction,
}) => {
  return (
    <header className="animate-fade-up relative mb-8 overflow-hidden rounded-2xl border border-[#0B1560]/12 bg-[#FAF9F5] px-6 py-9 shadow-xs sm:px-9">
      {/* İnce Geometrik Köşe Çizgileri */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3.5 left-3.5 h-4 w-4 border-t-2 border-l-2 border-[#D91B24]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3.5 right-3.5 h-4 w-4 border-b-2 border-r-2 border-[#0B1560]/35"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-500">
        <Link href="/" className="transition hover:text-[#0B1560]">
          Anasayfa
        </Link>
        {parentBreadcrumb && (
          <>
            <span>›</span>
            <Link href={parentBreadcrumb.href} className="transition hover:text-[#0B1560]">
              {parentBreadcrumb.label}
            </Link>
          </>
        )}
        <span>›</span>
        <span className="font-bold text-[#0B1560]">{breadcrumbLabel}</span>
      </nav>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-[#D91B24]">
            <span className="h-[1.5px] w-5 bg-[#D91B24]" />
            <span>{overline}</span>
          </div>
          <h1 className="mt-1.5 text-2xl font-black tracking-tight text-[#0B1560] sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
            {subtitle}
          </p>
        </div>

        {rightAction && <div className="shrink-0">{rightAction}</div>}
      </div>
    </header>
  );
};
