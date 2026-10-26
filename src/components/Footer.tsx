import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '../config/site.config';
import { CelikpenLogo } from './CelikpenLogo';

const FOOTER_SERVICES = [
  { label: 'Katlanır Cam Balkon Sistemleri', href: '/hizmetlerimiz#katlanir-cam-balkon' },
  { label: 'Isıcamlı Cam Balkon Sistemleri', href: '/hizmetlerimiz#isicamli-cam-balkon' },
  { label: 'Sürme Cam Balkon Sistemleri', href: '/hizmetlerimiz#surme-cam-balkon' },
  { label: 'Motorlu Giyotin Cam Sistemleri', href: '/hizmetlerimiz#giyotin-cam-sistemleri' },
  { label: 'Kış Bahçesi Sistemleri', href: '/hizmetlerimiz#kis-bahcesi-sistemleri' },
  { label: 'Bioklimatik Pergola Sistemleri', href: '/hizmetlerimiz#bioklimatik-pergola' },
  { label: 'PVC Pencere & Kapı Montajı', href: '/hizmetlerimiz#pvc-pencere-kapi' },
  { label: 'Panjur, Kepenk & Kedi Sinekliği', href: '/hizmetlerimiz#panjur-kepenk-sineklik' },
];

const FOOTER_QUICK = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Hizmetlerimiz', href: '/hizmetlerimiz' },
  { label: 'Ürünlerimiz (Tümü)', href: '/urunler' },
  { label: 'Winsa Sistemleri', href: '/urunler/winsa' },
  { label: 'Albert Genau Sistemleri', href: '/urunler/albert-genau' },
  { label: 'Projelerimiz', href: '/profesyoneller/referanslar' },
  { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
  { label: 'Blog', href: '/profesyoneller/blog' },
  { label: 'Fiyat Hesapla', href: '/fiyat-hesapla' },
  { label: 'İletişim', href: '/iletisim' },
];

const FOOTER_SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/celikpen',
    icon: <IconInstagram />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/902125550034',
    icon: <IconWhatsApp />,
  },
  {
    label: 'Telefon',
    href: `tel:${SITE_CONFIG.phoneRaw}`,
    icon: <IconPhone />,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300">
      <div className="container-shell pt-12 sm:pt-14">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marka */}
          <div className="lg:col-span-4">
            <Link href="/" prefetch={true} aria-label="Çelikpen anasayfa" className="inline-block">
              <CelikpenLogo size="md" variant="light" />
            </Link>
            <p className="mt-5 max-w-sm text-[11.5px] leading-relaxed text-slate-400">
              1996’dan bugüne 30 yıllık üretim gücüyle Bahçelievler’in 11 mahallesinde cam balkon,
              kış bahçesi, giyotin, sürme cam, PVC doğrama ve mimari alüminyum çözümleri sunuyoruz.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 border-l-2 border-[#38BDF8] pl-3">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-white">30. YIL</span>
              <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                1996 — 2026
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {FOOTER_SOCIAL.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`Çelikpen ${social.label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition-colors hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <span className="flex h-2 w-2 rounded-full bg-[#10B981]" aria-hidden="true" />
              <span className="text-[9.5px] font-medium tracking-wide text-slate-300">
                Keşif ve fiyat teklifi ücretsiz
              </span>
            </div>
          </div>

          {/* Hizmetler */}
          <div className="lg:col-span-3">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white">
              Hizmetlerimiz
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="group inline-flex items-center gap-1.5 text-[11.5px] text-slate-400 transition-colors hover:text-[#BFDBFE]"
                  >
                    <span className="h-px w-0 bg-[#1E3A8A] transition-all duration-300 group-hover:w-2.5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Menü */}
          <div className="lg:col-span-2">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white">
              Hızlı Menü
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_QUICK.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="group inline-flex items-center gap-1.5 text-[11.5px] text-slate-400 transition-colors hover:text-[#BFDBFE]"
                  >
                    <span className="h-px w-0 bg-[#1E3A8A] transition-all duration-300 group-hover:w-2.5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="lg:col-span-3">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white">
              İletişim & Konum
            </h2>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex items-start gap-2.5 text-[11.5px] text-slate-300 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 text-[#BFDBFE]"><IconPhone /></span>
                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500">Telefon</span>
                    <span className="mt-0.5 block font-semibold text-white">{SITE_CONFIG.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:iletisim@celikpen.com"
                  className="flex items-start gap-2.5 text-[11.5px] text-slate-300 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 text-[#BFDBFE]"><IconMail /></span>
                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500">E-posta</span>
                    <span className="mt-0.5 block text-slate-300">iletisim@celikpen.com</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-slate-400">
                <span className="mt-0.5 shrink-0 text-[#BFDBFE]"><IconPin /></span>
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500">Showroom</span>
                  <span className="mt-0.5 block">{SITE_CONFIG.address}</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-slate-400">
                <span className="mt-0.5 shrink-0 text-[#BFDBFE]"><IconClock /></span>
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.12em] text-slate-500">Çalışma Saatleri</span>
                  <span className="mt-0.5 block">{SITE_CONFIG.workingHours}</span>
                </span>
              </li>
            </ul>
            <Link
              href="/iletisim?form=kesif"
              prefetch={true}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Ücretsiz Keşif İste <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Hizmet bölgeleri */}
        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="shrink-0 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Hizmet Bölgelerimiz
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {SITE_CONFIG.neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/bahcelievler/${neighborhood.slug}`}
                  prefetch={true}
                  className="text-[10px] text-slate-500 transition-colors hover:text-[#BFDBFE]"
                >
                  {neighborhood.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col items-center justify-between gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:flex-row">
          <p className="text-center text-[9.5px] text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Çelikpen Cam Balkon & Mimari Sistemler. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-medium tracking-wide text-slate-500">
              <IconLock className="h-3 w-3 text-[#10B981]" />
              256-Bit SSL • TLS 1.3 • HSTS
            </span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden="true" />
            <span className="text-[9px] text-slate-600">Kocasinan Merkez, Bahçelievler / İstanbul</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================================
   ICONS
   ============================================================================ */
function IconInstagram({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconWhatsApp({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.488-8.413Z" />
    </svg>
  );
}
function IconPhone({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconPin({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconClock({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  );
}
function IconArrowRight({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconLock({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
