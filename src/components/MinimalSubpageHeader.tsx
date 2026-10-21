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
    <header className="animate-fade-up relative mb-8 overflow-hidden rounded-panel border border-slate-200 bg-gradient-to-br from-white via-[#F8FAFC] to-[#F5F3FF] px-6 py-8 shadow-xs sm:px-9 sm:py-10">
      {/* İnce geometrik köşe vurguları */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-[#7C3AED]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-[#0F172A]/30"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#7C3AED]/10 blur-3xl"
      />

      <nav
        aria-label="Breadcrumb"
        className="relative mb-4 flex flex-wrap items-center gap-1.5 text-[10.5px] font-medium text-slate-500"
      >
        <Link href="/" className="transition-colors hover:text-[#7C3AED]">
          Anasayfa
        </Link>
        {parentBreadcrumb && (
          <>
            <span className="text-slate-300" aria-hidden="true">/</span>
            <Link href={parentBreadcrumb.href} className="transition-colors hover:text-[#7C3AED]">
              {parentBreadcrumb.label}
            </Link>
          </>
        )}
        <span className="text-slate-300" aria-hidden="true">/</span>
        <span className="font-semibold text-[#6D28D9]">{breadcrumbLabel}</span>
      </nav>

      <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="section-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" aria-hidden="true" />
            {overline}
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#0F172A] sm:text-3xl lg:text-[2.1rem]">
            {title}
          </h1>
          <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-slate-500 sm:text-[13px]">
            {subtitle}
          </p>
        </div>

        {rightAction && <div className="shrink-0">{rightAction}</div>}
      </div>
    </header>
  );
};
