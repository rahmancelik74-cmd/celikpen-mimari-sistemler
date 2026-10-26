import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ============================================================================
   ÇELİKPEN — KURUMSAL PRESTİJ, ÜRÜN GRUPLARI VE UYGULAMA SÜRECİ
   GüngörPen kurumsal vitrininden ilham alan; çift çerçeveli mimari görsel,
   editoryal marka anlatımı, 30. yıl rozeti ve net dönüşüm aksiyonları.
   ========================================================================== */

const PRODUCT_GROUPS = [
  {
    title: 'Isıcamlı Cam Balkon',
    note: '4+20+4 Argon gazlı Sinerji/Konfor cam ve termal kasa',
    href: '/urunler/vera-isicamli-cam-balkon',
    image: '/images/services/isicamli-cam-balkon.jpg',
    icon: <IconPanels />,
  },
  {
    title: 'Katlanır Cam Balkon',
    note: 'Tam açılım, geniş manzara ve sessiz kanat hareketi',
    href: '/urunler/vera-katlanir-cam-balkon',
    image: '/images/services/katlanir-cam-balkon.jpg',
    icon: <IconFold />,
  },
  {
    title: 'Sürme Cam Sistemleri',
    note: 'Eşiksiz ray, geniş açıklık ve kesintisiz kullanım',
    href: '/urunler?kategori=surme-sistemler',
    image: '/images/services/surme-cam-balkon.jpg',
    icon: <IconSlide />,
  },
  {
    title: 'Kış Bahçesi Sistemleri',
    note: 'Teras ve bahçeler için dört mevsim cam mimari',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    image: '/images/services/kis-bahcesi-sistemleri.jpg',
    icon: <IconWinterGarden />,
  },
  {
    title: 'Giyotin Cam Sistemleri',
    note: 'Motorlu, kumandalı ve güvenli dikey cam cephe',
    href: '/urunler/giyotin-motorlu-silinebilir-cam',
    image: '/images/services/giyotin-cam-sistemleri.jpg',
    icon: <IconGiyotin />,
  },
  {
    title: 'Bioklimatik Pergola',
    note: 'Motorlu lamel tavan, LED ve yağmur tahliyesi',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    image: '/images/services/bioklimatik-pergola.jpg',
    icon: <IconPergola />,
  },
  {
    title: 'PVC Pencere & Kapı',
    note: '76 ve 84 mm yüksek yalıtımlı Winsa profil serileri',
    href: '/urunler?kategori=pencere-ve-kapi-sistemleri',
    image: '/images/services/pvc-pencere-kapi.jpg',
    icon: <IconWindow />,
  },
  {
    title: 'Panjur & Sineklik',
    note: 'Winstor panjur, plise perde ve kedi tüllü sineklik',
    href: '/urunler/winstor-monoblok-panjur',
    image: '/images/services/panjur-kepenk-sineklik.jpg',
    icon: <IconShutter />,
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Ücretsiz Keşif',
    description: 'Lazerli ölçü, cephe analizi ve ihtiyaç tespiti kendi ekibimizle yapılır.',
    icon: <IconCompass />,
  },
  {
    number: '02',
    title: 'Projelendirme',
    description: 'Sistem, cam, renk ve montaj detayları net bir teknik plana dönüştürülür.',
    icon: <IconBlueprint />,
  },
  {
    number: '03',
    title: 'Üretim',
    description: 'Kocasinan Merkez atölyemizde CNC hassasiyetiyle üretim tamamlanır.',
    icon: <IconFactory />,
  },
  {
    number: '04',
    title: 'Uzman Montaj',
    description: 'Kendi montaj ekibimiz tarafından temiz teslim ve garanti belgesiyle tamamlanır.',
    icon: <IconWrench />,
  },
];

export function CorporatePrestigeSection() {
  return (
    <section
      id="kurumsal-prestij"
      aria-labelledby="kurumsal-prestij-baslik"
      className="relative overflow-hidden bg-[#F8FAFC] py-16 sm:py-20 lg:py-24"
    >
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#1E3A8A]/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#D91B24]/[0.08] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
          {/* Çift çerçeveli mimari görsel kompozisyonu */}
          <div className="relative pb-5 sm:pb-8 lg:pb-4">
            <div className="relative w-[92%] rounded-sm bg-white p-2.5 shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src="/images/bahcelievler-giyotin-bioklimatik-sistem.jpg"
                  alt="Çelikpen bioklimatik pergola ve giyotin cam sistem uygulaması"
                  title="Bahçelievler Bioklimatik Pergola ve Motorlu Giyotin Cam Uygulaması — Çelikpen"
                  fill
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/[0.65] via-transparent to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 pb-12 sm:p-5 sm:pb-14">
                  <div>
                    <span className="block text-[8px] font-semibold uppercase tracking-[0.22em] text-[#BFDBFE]">
                      Mimari Uygulama
                    </span>
                    <span className="mt-1 block text-[12px] font-semibold text-white">
                      Bioklimatik Teras &amp; Giyotin Cephe
                    </span>
                  </div>
                  <span className="rounded-sm border border-white/20 bg-white/10 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    Bahçelievler
                  </span>
                </div>
              </div>
              <span
                className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#1E3A8A]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#D91B24]"
                aria-hidden="true"
              />
            </div>

            <div className="relative z-10 -mt-24 ml-auto w-[72%] rounded-sm bg-white p-2.5 shadow-[0_25px_60px_rgba(15,23,42,0.16)] sm:-mt-32 sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src="/images/siyavuspasa-surme-cam-balkon.jpg"
                  alt="Çelikpen panoramik sürme cam balkon ve teras manzarası"
                  title="Çelikpen Panoramik Sürme Cam Balkon ve Teras Kapatma Sistemleri"
                  fill
                  sizes="(min-width: 1024px) 34vw, 66vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/[0.35] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-sm bg-[#1E3A8A] px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white">
                  Panoramik Yaşam
                </span>
              </div>
              <span
                className="pointer-events-none absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-[#1E3A8A]"
                aria-hidden="true"
              />
            </div>

            <div className="absolute -left-3 bottom-16 hidden items-center gap-2 lg:flex">
              <span className="h-px w-8 bg-[#BFDBFE]" aria-hidden="true" />
              <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400 [writing-mode:vertical-rl]">
                Çelikpen Mimari Sistemler
              </span>
            </div>
          </div>

          {/* Editoryal kurumsal anlatım */}
          <div className="relative">
            <div className="flex items-center gap-3">
              <span
                className="h-3.5 w-3.5 shrink-0 border-l-2 border-t-2 border-[#1E3A8A]"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold tracking-[0.32em] text-slate-400">
                Ç E L İ K P E N
              </span>
            </div>

            <h2
              id="kurumsal-prestij-baslik"
              className="mt-2 text-2xl font-extrabold leading-[1.22] text-[#0F172A] sm:text-3xl lg:text-[32px]"
            >
              30 Yıllık Tecrübeyle İstanbul&apos;un Güvenilir Cam Balkon ve PVC Sistemleri Firması
            </h2>

            <div className="mt-5 space-y-4 text-[12.5px] leading-7 text-slate-600 sm:text-[13px]">
              <p>
                Temelleri 30 yıl önce{' '}
                <strong className="font-semibold text-[#0F172A]">İstanbul / Bahçelievler</strong>&apos;de atılan{' '}
                <strong className="font-semibold text-[#0F172A]">Çelikpen</strong>, otuz yıllık
                mühendislik tecrübesiyle{' '}
                <strong className="font-semibold text-[#0F172A]">
                  ısıcamlı cam balkon, katlanır cam balkon, sürme seri sistemler, motorlu giyotin
                  cam, bioklimatik pergola, kış bahçesi, PVC pencere &amp; kapı, panjur ve mimari
                  alüminyum sistemleri
                </strong>{' '}
                üretiminde İstanbul&apos;un referans markalarından biridir. Yüksek yalıtım
                standartları, kusursuz işçilik ve estetik mimari yaklaşımıyla hem konut hem de
                prestijli ticari projelerde dört mevsim konforlu yaşam alanları inşa etmektedir.
              </p>
              <p>
                Gelişmiş üretim altyapısı, lazer ölçüm teknolojisi ve kendi bünyesindeki uzman montaj
                kadrosuyla uçtan uca çözüm sunan Çelikpen;{' '}
                <strong className="font-semibold text-[#0F172A]">Winsa</strong> kalitesi ve yüksek
                nitelikli temperli/ısıcam teknolojilerini bir araya getirerek{' '}
                <strong className="font-semibold text-[#0F172A]">
                  ısıcamlı cam balkon, giyotin cam, kış bahçesi, bioklimatik tavan ve yeni nesil PVC
                  doğrama
                </strong>{' '}
                çözümlerini 10 yıl sistem garantisiyle yaşam alanlarınıza taşır.
              </p>
            </div>

            <div className="mt-7 grid gap-4 border border-[#BFDBFE] bg-white/80 p-4 sm:grid-cols-[auto_1fr] sm:items-center sm:p-5">
              <div className="relative flex w-fit items-baseline gap-0.5 border-2 border-[#1E3A8A] px-4 py-3 text-[#1E3A8A]">
                <span
                  className="pointer-events-none absolute inset-1 border border-[#1E3A8A]/20"
                  aria-hidden="true"
                />
                <span className="relative text-4xl font-black leading-none tracking-tighter sm:text-5xl">
                  30
                </span>
                <span className="relative text-sm font-extrabold">. YIL</span>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-[#0F172A]">
                  30 Yıllık Deneyimle Güven, Mühendislik ve Prestij
                </h3>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-600">
                  30 yıllık köklü geçmişimizle ücretsiz mimari keşiften statik projelendirmeye,
                  hassas üretimden anahtar teslim montaja kadar her aşamada tam güvence sunuyoruz.
                  Sertifikalı malzeme kalitemiz ve satış sonrası kesintisiz destek anlayışımızla
                  mekanlarınıza değer katıyoruz.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm font-bold text-[#0F172A]">
              Çelikpen – 30 Yıllık Tecrübeyle İstanbul&apos;un Güvenilir Cam Balkon ve PVC Sistemleri
              Uzmanı
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/kurumsal/hakkimizda"
                prefetch={true}
                className="inline-flex items-center gap-2.5 rounded-md border border-[#1E3A8A]/40 px-5 py-2.5 text-xs font-semibold text-[#1E3A8A] transition-all hover:border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
              >
                <IconList />
                Hakkımızda
                <IconArrowRight />
              </Link>
              <Link
                href="/profesyoneller/kataloglar"
                prefetch={true}
                className="inline-flex items-center gap-2.5 rounded-md border border-[#1E3A8A]/40 px-5 py-2.5 text-xs font-semibold text-[#1E3A8A] transition-all hover:border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
              >
                <IconBook />
                e-Katalog
                <IconArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductShowcaseStrip() {
  return (
    <section
      aria-labelledby="urun-gruplari-baslik"
      className="relative overflow-hidden bg-[#0F172A] py-14 text-white sm:py-16"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1E3A8A]/[0.55] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-[#D91B24]/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-shell relative">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#93C5FD]">
              <span className="h-px w-6 bg-[#93C5FD]" aria-hidden="true" />
              Uygulama &amp; Ürün Grupları
            </div>
            <h2
              id="urun-gruplari-baslik"
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Tek çatı altında sekiz mimari sistem ailesi
            </h2>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-slate-400">
              Balkondan cepheye, terastan iç mekâna kadar tüm cam ve doğrama ihtiyaçlarınız için
              ölçülü, belgeli ve uzun ömürlü çözümler.
            </p>
          </div>
          <Link
            href="/urunler"
            prefetch={true}
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:border-[#93C5FD] hover:bg-white/10"
          >
            Tüm ürün ailesi
            <IconArrowRight />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_GROUPS.map((product, index) => (
            <Link
              key={product.title}
              href={product.href}
              prefetch={true}
              className="group relative flex flex-col overflow-hidden border border-white/10 bg-white/[0.045] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#93C5FD]/[0.45] hover:bg-[#1E3A8A]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                <Image
                  src={product.image}
                  alt={`${product.title} — Çelikpen gerçek uygulama fotoğrafı`}
                  width={640}
                  height={400}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-[#0F172A]/80 px-2 py-0.5 text-[9.5px] font-bold leading-4 text-white backdrop-blur">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[12.5px] font-semibold text-white">{product.title}</h3>
                <p className="mt-1.5 min-h-[32px] text-[10px] leading-relaxed text-slate-400 transition-colors group-hover:text-blue-100">
                  {product.note}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#93C5FD] transition-colors group-hover:text-white">
                  İncele
                  <IconArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-[9.5px] font-medium uppercase tracking-[0.14em] text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#93C5FD]" aria-hidden="true" />
            TSE &amp; CE belgeli sistemler
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#93C5FD]" aria-hidden="true" />
            Kendi üretim ve montaj ekibi
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#93C5FD]" aria-hidden="true" />
            10 Yıl Sistem Garantisi
          </span>
        </div>
      </div>
    </section>
  );
}

export function ProcessWorkflowBar() {
  return (
    <section aria-labelledby="surec-baslik" className="bg-white py-12 sm:py-16">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-panel border border-[#BFDBFE] bg-[#EFF6FF] p-6 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#1E3A8A]/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">
                Çalışma Modelimiz
              </span>
              <h2
                id="surec-baslik"
                className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
              >
                Fikirden uzman montaja, dört net adım
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                Ücretsiz Keşif → Projelendirme → Üretim → Uzman Montaj. Her aşamada tek muhatap,
                net takvim ve yazılı garanti.
              </p>
            </div>
            <Link
              href="/iletisim?form=kesif"
              prefetch={true}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#1E3A8A] px-5 py-3 text-[11px] font-semibold text-white shadow-navy transition-colors hover:bg-[#1D4ED8]"
            >
              <IconCalendar />
              Ücretsiz keşif planla
            </Link>
          </div>

          <ol className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <li
                key={step.number}
                className="relative border border-[#BFDBFE] bg-white p-4 shadow-xs sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A8A] text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                  <span className="text-[#1E3A8A]" aria-hidden="true">
                    {step.icon}
                  </span>
                </div>
                <h3 className="mt-4 text-[13px] font-bold text-[#0F172A]">{step.title}</h3>
                <p className="mt-1.5 text-[10.5px] leading-relaxed text-slate-500">
                  {step.description}
                </p>
                {index < PROCESS_STEPS.length - 1 && (
                  <span
                    className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-[#BFDBFE] bg-white text-[#1E3A8A] lg:flex"
                    aria-hidden="true"
                  >
                    <IconArrowRight />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   İKONLAR — 24px ızgara, ince mimari çizgi dili
   ========================================================================== */
type IconProps = { className?: string };

function IconArrowRight({ className = 'h-3.5 w-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function IconList({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}

function IconBook({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 6.5C10.5 5.3 8.4 4.8 6 4.8c-1.1 0-2.1.1-3 .4v14.6c.9-.3 1.9-.4 3-.4 2.4 0 4.5.5 6 1.7 1.5-1.2 3.6-1.7 6-1.7 1.1 0 2.1.1 3 .4V5.2c-.9-.3-1.9-.4-3-.4-2.4 0-4.5.5-6 1.7Z" />
      <path d="M12 6.5v14.6" />
    </svg>
  );
}

function IconPanels({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18M4.5 21V8h15v13M4.5 11.5h15M9.5 11.5V21M14.5 11.5V21M4.5 8 7 3h10l2.5 5" />
    </svg>
  );
}

function IconFold({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 5h4l4 7-4 7H3M9 5h4l4 7-4 7H9M15 5h6v14h-6" />
    </svg>
  );
}

function IconSlide({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="16" rx="1.5" />
      <path d="M12 3v16M5.5 7.5h4M14.5 7.5h4M4 19v2M20 19v2M3 21h18" />
    </svg>
  );
}

function IconWinterGarden({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18M5 21V9l7-6 7 6v12M5 9h14M12 3v18M8.5 9v12M15.5 9v12" />
      <path d="M2 6h3M19 6h3" />
    </svg>
  );
}

function IconGiyotin({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="15" height="18" rx="1.5" />
      <path d="M3 9.5h15M6.5 6.5h8M21 9v6M19.5 10.5 21 9l1.5 1.5M19.5 13.5 21 15l1.5-1.5" />
    </svg>
  );
}

function IconPergola({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 5.5h18M5 5.5V20M19 5.5V20M3 20h18M5 11h14" />
      <path d="M6.5 5.5 8 2.5M10.5 5.5 12 2.5M14.5 5.5 16 2.5M18.5 5.5 20 2.5" />
    </svg>
  );
}

function IconWindow({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M12 3v18M4 12h16M7 7h2M15 17h2" />
    </svg>
  );
}

function IconShutter({ className = 'h-[18px] w-[18px]' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 3h16M5 3v18M19 3v18M3 21h18M7 6h10M7 9.5h10M7 13h10M7 16.5h10" />
    </svg>
  );
}

function IconCompass({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
    </svg>
  );
}

function IconBlueprint({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 3h16v18H4zM4 8h16M9 8v13M14 8v13M4 13h5M14 13h6M9 18h5" />
    </svg>
  );
}

function IconFactory({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18M4 21V10l5 3V10l5 3V7l5 3v11M7 21v-3M12 21v-3M17 21v-3" />
      <path d="M4 7h3M4 4h3" />
    </svg>
  );
}

function IconWrench({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14.7 6.3a4.5 4.5 0 0 0-5.9 5.9L3 18l3 3 5.8-5.8a4.5 4.5 0 0 0 5.9-5.9l-2.7 2.7-2.7-2.7 2.4-3Z" />
    </svg>
  );
}

function IconCalendar({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
