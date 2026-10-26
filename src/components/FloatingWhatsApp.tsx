'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useCms } from './CmsProvider';

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const { cms } = useCms();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/cp-yonetim-2026')) {
    return null;
  }

  const whatsappNumber = cms.siteSettings.whatsappNumber || '905323332085';
  const whatsappText = cms.siteSettings.whatsappText || 'Mimarlarımızla Görüşün';
  const whatsappHref =
    `https://wa.me/${whatsappNumber}?text=` +
    encodeURIComponent('Merhaba, cam balkon / teras için ücretsiz keşif randevusu almak istiyorum.');

  return (
    <div className="fixed bottom-5 right-5 z-[90] sm:bottom-6 sm:right-6">
      <span
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-14 w-14 animate-ping rounded-full bg-[#25D366]/30 motion-reduce:animate-none"
        aria-hidden="true"
      />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp üzerinden mimarlarımızla görüşün — ücretsiz keşif ve destek"
        title={`Ücretsiz Keşif & Destek — ${whatsappText}`}
        className="group relative z-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#25D366] text-white shadow-xl transition-all duration-300 ease-out hover:w-[244px] hover:justify-start hover:pl-2 hover:pr-5 hover:bg-[#1EBE5D] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366] motion-reduce:transition-none"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition-colors duration-300 group-hover:bg-white/20 motion-reduce:transition-none">
          <IconWhatsApp className="h-6 w-6" />
        </span>

        <span className="ml-0 flex max-w-0 flex-col overflow-hidden whitespace-nowrap text-left opacity-0 transition-all duration-300 ease-out group-hover:ml-3 group-hover:max-w-[176px] group-hover:opacity-100 motion-reduce:transition-none">
          <span className="text-[10px] font-medium leading-tight tracking-wide text-emerald-50 opacity-95">
            Ücretsiz Keşif &amp; Destek
          </span>
          <span className="mt-0.5 block whitespace-nowrap text-[13px] font-bold leading-tight text-white">
            {whatsappText}
          </span>
        </span>
      </a>
    </div>
  );
}

function IconWhatsApp({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9C21.95 6.44 17.5 2 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.66.8-.81.96-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.3.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.87-.21-.49-.42-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.02 2.6.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}
