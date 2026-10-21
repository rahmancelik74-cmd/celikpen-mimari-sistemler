import React from 'react';

const WHATSAPP_HREF =
  'https://wa.me/902125550034?text=' +
  encodeURIComponent('Merhaba, cam balkon / teras için ücretsiz keşif randevusu almak istiyorum.');

/**
 * Tüm sayfalarda sağ altta görünen, mobilde kompaktlaşan WhatsApp hattı.
 */
export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 z-[90] sm:bottom-6 sm:right-6">
      <span
        className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/30 motion-reduce:animate-none"
        aria-hidden="true"
      />

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp üzerinden ücretsiz keşif talep edin"
        title="WhatsApp ile hemen yazın"
        className="group relative flex h-14 w-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1EBE5D] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 lg:min-h-[58px] lg:w-auto lg:justify-start lg:rounded-full lg:px-4 lg:py-3"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/20">
          <IconWhatsApp className="h-6 w-6" />
        </span>

        <span className="hidden min-w-0 text-left lg:flex lg:flex-col">
          <span className="text-[9px] font-semibold uppercase leading-none tracking-[0.14em] text-white/80">
            Hızlı WhatsApp Hattı
          </span>
          <span className="mt-1 whitespace-nowrap text-[11.5px] font-semibold leading-none text-white">
            Ücretsiz keşif için yazın
          </span>
        </span>

        <span
          className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform group-hover:translate-x-0.5 lg:flex"
          aria-hidden="true"
        >
          <IconArrowRight className="h-3.5 w-3.5" />
        </span>
      </a>
    </div>
  );
}

function IconWhatsApp({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function IconArrowRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
