import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SITE_CONFIG } from '../config/site.config';
import { HeroSlider } from '../components/HeroSlider';
import {
  CorporatePrestigeSection,
  ProcessWorkflowBar,
  ProductShowcaseStrip,
} from '../components/CorporatePrestigeSection';
import { SeoGuide } from '../components/SeoGuide';

/* Ağır etkileşimli bölümler ilk rota geçişini kilitlemesin diye ayrı chunk'lara
   bölünür; SSR korunur, böylece SEO HTML'i ve görsel düzen değişmez. */
const ArchitecturalVirtualTour = dynamic(
  () =>
    import('../components/ArchitecturalVirtualTour').then(
      (module) => module.ArchitecturalVirtualTour
    ),
  { ssr: true }
);
const CustomerReviews = dynamic(
  () => import('../components/CustomerReviews').then((module) => module.CustomerReviews),
  { ssr: true }
);

/* ============================================================================
   HOMEPAGE CONTENT
   ============================================================================ */

const SERVICE_CARDS = [
  {
    title: 'Katlanır Cam Balkon Sistemleri',
    description:
      '8mm / 10mm Şişecam temperli güvenlik camı ve paslanmaz rulmanlarla %100 panoramik açılım.',
    href: '/hizmetlerimiz#katlanir-cam-balkon',
    image: '/images/services/katlanir-cam-balkon.jpg',
    badges: ['8/10 mm', 'Temperli'],
  },
  {
    title: 'Isıcamlı Cam Balkon Sistemleri',
    description:
      '4+20+4 argon gazlı temperli cam ve antrasit profil ile dört mevsim yaşayan balkonlar.',
    href: '/hizmetlerimiz#isicamli-cam-balkon',
    image: '/images/services/isicamli-cam-balkon.jpg',
    badges: ['Uw: 1.1', '38 dB'],
  },
  {
    title: 'Sürme Cam Balkon Sistemleri',
    description:
      'Eşiksiz alt ray, geniş açıklık ve tek parmakla sessiz kayma; dar balkonlarda alan kazancı.',
    href: '/hizmetlerimiz#surme-cam-balkon',
    image: '/images/services/surme-cam-balkon.jpg',
    badges: ['Eşiksiz', 'Sürme'],
  },
  {
    title: 'Motorlu Giyotin Cam Sistemleri',
    description:
      'Kumandalı, dikey açılan cam cephe; açıkken güvenli küpeşte, kapalıyken tam yalıtım.',
    href: '/hizmetlerimiz#giyotin-cam-sistemleri',
    image: '/images/services/giyotin-cam-sistemleri.jpg',
    badges: ['Uw: 1.3', '36 dB'],
  },
  {
    title: 'Kış Bahçesi Sistemleri',
    description:
      'Teras ve bahçe katlarını dört mevsim kullanılan ferah bir yaşam alanına dönüştürün.',
    href: '/hizmetlerimiz#kis-bahcesi-sistemleri',
    image: '/images/services/kis-bahcesi-sistemleri.jpg',
    badges: ['Uw: 1.1', '40 dB'],
  },
  {
    title: 'Bioklimatik Pergola & Tente',
    description:
      'Motorlu alüminyum lamelli tavan, gizli yağmur tahliyesi ve entegre LED aydınlatma.',
    href: '/hizmetlerimiz#bioklimatik-pergola',
    image: '/images/services/bioklimatik-pergola.jpg',
    badges: ['0°-135°', 'Lamel'],
  },
  {
    title: 'PVC Pencere & Kapı Montajı',
    description:
      'Revotech Gold, Dorado 76 ve Safir serileriyle yüksek yalıtımlı pencere ve kapı çözümleri.',
    href: '/hizmetlerimiz#pvc-pencere-kapi',
    image: '/images/services/pvc-pencere-kapi.jpg',
    badges: ['Uw: 0.79', '46 dB'],
  },
  {
    title: 'Panjur, Kepenk & Kedi Sinekliği',
    description:
      'Kedi tüllü sineklik, plise perde ve Winstor monoblok panjur entegrasyonu.',
    href: '/hizmetlerimiz#panjur-kepenk-sineklik',
    image: '/images/services/panjur-kepenk-sineklik.jpg',
    badges: ['Winstor', 'Kedi Tüllü'],
  },
];

const TRUST_STATS = [
  { value: '15.000+', label: 'Tamamlanan proje' },
  { value: '11', label: 'Bahçelievler mahallesi' },
  { value: '10 Yıl', label: 'Sistem garantisi' },
  { value: '38 dB', label: 'Akustik konfor' },
  { value: '%100', label: 'Ücretsiz keşif' },
];

const WHY_POINTS = [
  {
    title: 'Kocasinan Merkez Üretim',
    text: 'Kendi atölyemizde CNC hassasiyetinde üretim, aracısız fabrika fiyatı.',
  },
  {
    title: 'Lazerli Ücretsiz Keşif',
    text: 'Milimetrik ölçü, renk danışmanlığı ve aynı gün net fiyat teklifi.',
  },
  {
    title: 'TSE & CE Belgeli Sistemler',
    text: 'Temperli cam, paslanmaz rulman ve TS EN 14351-1 uyumlu profil.',
  },
  {
    title: '10 Yıl Kurumsal Güvence',
    text: 'Montaj sonrası bakım, yedek parça ve ücretsiz servis desteği.',
  },
];

const PROJECTS = [
  {
    title: 'Kocasinan Isıcamlı Balkon',
    meta: 'Vera Termal • 4+20+4 Isıcam',
    image: '/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    href: '/urunler/vera-isicamli-cam-balkon',
    tag: 'Bahçelievler',
  },
  {
    title: 'Giyotin & Bioklimatik Teras',
    meta: 'Motorlu Giyotin • Pergola',
    image: '/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
    href: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    tag: 'Kış Bahçesi',
  },
];

const BLOG_POSTS = [
  {
    title: '2026 Isıcamlı Cam Balkon Rehberi: m² Fiyatları ve Vera Termal',
    excerpt: 'Isıcamlı cam balkon m² fiyatları, 4+20+4 argon gazlı ısıcam ve ısı yalıtımı rehberi.',
    category: 'Cam Balkon',
    read: '9 dk okuma',
    href: '/blog/isicamli-cam-balkon-rehberi-2026',
    image: '/images/blog/isicamli-cam-balkon-rehberi-2026.jpg?v=2',
  },
  {
    title: 'Winsa Dorado 76 mı, Revotech Gold mu? PVC Pencere Karşılaştırması',
    excerpt: 'Odacık sayısı, conta yapısı ve ısı yalıtımı açısından profil seçimini anlatıyoruz.',
    category: 'PVC Pencere',
    read: '8 dk okuma',
    href: '/blog/winsa-dorado-76-mi-revotech-gold-mu',
    image: '/images/blog/dorado-76-revotech-gold-karsilastirma.jpg?v=2',
  },
  {
    title: 'Bahçelievler ve İstanbul’da Cam Balkon Yaptırırken 10 Kritik Detay',
    excerpt: '4/5 kat maliki muvafakatnamesi, cam kalınlığı, rüzgâr yükü ve montaj detayları.',
    category: 'Yerel Rehber',
    read: '9 dk okuma',
    href: '/blog/bahcelievler-cam-balkon-10-kritik-detay',
    image: '/images/blog/bahcelievler-cam-balkon-10-kritik-detay.jpg?v=2',
  },
];

const ADDITIONAL_LINKS = [
  { label: 'Fiyat Hesapla', href: '/fiyat-hesapla' },
  { label: 'Proje Galerisi', href: '/profesyoneller/referanslar' },
  { label: 'Müşteri Yorumları', href: '/yorumlar' },
  { label: 'Karşılaştır', href: '/karsilastir' },
];

/* ============================================================================
   PAGE
   ============================================================================ */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />

      {/* ============================ GÜVEN BARI ============================ */}
      <section aria-label="Çelikpen güven göstergeleri" className="border-b border-slate-200 bg-white">
        <div className="container-shell grid grid-cols-2 gap-x-4 gap-y-6 py-7 sm:grid-cols-3 lg:grid-cols-5 lg:py-8">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:border-r lg:border-slate-200 lg:last:border-r-0">
              <p className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.13em] text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ KURUMSAL PRESTİJ ============================ */}
      <CorporatePrestigeSection />

      {/* ============================ ÜRÜN GRUPLARI VİTRİNİ ============================ */}
      <ProductShowcaseStrip />

      {/* ============================ HİZMETLER ============================ */}
      <section id="hizmetler" className="section-shell bg-[#F8FAFC]">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-kicker">Hizmetlerimiz</span>
            <h2 className="section-title">Balkonunuz için doğru cam sistemi</h2>
            <p className="section-subtitle mx-auto">
              Ölçüden montaja kadar tek elden; yaşam alanınıza, cephenize ve bütçenize uygun
              mimari cam çözümleri.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CARDS.map((service) => (
              <Link
                prefetch={true}
                key={service.title}
                href={service.href}
                className="group relative flex flex-col overflow-hidden rounded-card border border-slate-200 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={service.image}
                    alt={`${service.title} — Çelikpen uygulama fotoğrafı`}
                    width={640}
                    height={400}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1">
                    {service.badges.map((badge, i) => (
                      <span
                        key={badge}
                        className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[9.5px] font-bold leading-4 shadow-sm backdrop-blur ${
                          i === 0 ? 'bg-white/90 text-[#0F172A]' : 'bg-[#0F172A]/80 text-white'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-[#0F172A] group-hover:text-[#1D4ED8]">
                  {service.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-slate-500">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1E3A8A]">
                  Detayları incele
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}

            <div className="relative flex flex-col justify-between overflow-hidden rounded-card bg-[#0F172A] p-6 text-white">
              <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#1E3A8A]/45 blur-2xl" />
              <div className="relative">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#BFDBFE]">
                  Emin olamadınız mı?
                </span>
                <h3 className="mt-3 text-xl font-semibold leading-snug">
                  Lazerli keşifte birlikte karar verelim.
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-slate-300">
                  Balkonunuzu ölçüp ihtiyacınıza en uygun sistemi, renk ve cam seçenekleriyle
                  gösteriyoruz.
                </p>
              </div>
              <Link
                prefetch={true}
                href="/iletisim?form=kesif"
                className="relative mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[11px] font-semibold text-[#0F172A] transition-colors hover:bg-[#EFF6FF] hover:text-[#1D4ED8]"
              >
                Ücretsiz Keşif İste
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ NEDEN BİZ ============================ */}
      <section className="section-shell bg-white">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel border border-slate-200 bg-slate-100 shadow-card">
              <Image
                src="/images/bahcelievler-giyotin-bioklimatik-sistem.jpg"
                alt="Çelikpen bioklimatik pergola ve giyotin cam sistem uygulaması"
                title="Bahçelievler Bioklimatik Pergola ve Giyotin Cam Sistem Uygulaması — Çelikpen"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/55 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-xl border border-slate-200 bg-white p-4 shadow-soft sm:left-6 sm:right-auto sm:w-64">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EFF6FF] text-[#1E3A8A]">
                  <IconBadge />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-[#0F172A]">TSE EN 12150</p>
                  <p className="text-[9.5px] text-slate-500">Temperli cam güvenliği</p>
                </div>
                <span className="ml-auto h-2 w-2 rounded-full bg-[#10B981]" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <span className="section-kicker">Neden Biz?</span>
            <h2 className="section-title">İşin her adımında yanınızdayız</h2>
            <p className="section-subtitle">
              Çelikpen; Kocasinan Merkez üretim tesisi, kendi montaj ekibi ve kurumsal garanti
              anlayışıyla Bahçelievler’in 11 mahallesinde hizmet veriyor.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {WHY_POINTS.map((point) => (
                <div key={point.title} className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <IconCheck className="h-2.5 w-2.5" />
                    </span>
                    <div>
                      <h3 className="text-[12px] font-semibold text-[#0F172A]">{point.title}</h3>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-500">{point.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                prefetch={true}
                href="/kurumsal/hakkimizda"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F172A] px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#1E293B]"
              >
                Kurumsal Hikâyemiz <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                prefetch={true}
                href="/fiyat-hesapla"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-semibold text-[#0F172A] transition-colors hover:border-[#BFDBFE] hover:bg-[#EFF6FF] hover:text-[#1D4ED8]"
              >
                Fiyat Hesapla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 4 ADIMLI UYGULAMA SÜRECİ ============================ */}
      <ProcessWorkflowBar />

      {/* ============================ SANAL TUR ============================ */}
      <ArchitecturalVirtualTour />

      {/* ============================ FİYAT / DÖNÜŞÜM BANDI ============================ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-shell">
          <div className="overflow-hidden rounded-panel border border-[#BFDBFE] bg-[#EFF6FF]">
            <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]">
                  Şeffaf fiyatlandırma
                </span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0F172A] sm:text-3xl">
                  Balkonunuzun fiyatını 30 saniyede öğrenin.
                </h2>
                <p className="mt-2 max-w-xl text-[12.5px] leading-relaxed text-slate-600">
                  Balkon tipini, genişliğini ve cam seçeneğini girin; tahmini metrekare fiyatını
                  anında görün. Net teklif için lazerli keşif her zaman ücretsiz.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row lg:justify-end">
                <Link
                  prefetch={true}
                  href="/fiyat-hesapla"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#1E3A8A] px-5 py-3 text-[12px] font-semibold text-white shadow-navy transition-colors hover:bg-[#1D4ED8]"
                >
                  Fiyat Hesapla <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  prefetch={true}
                  href="/iletisim?form=kesif"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#BFDBFE] bg-white px-5 py-3 text-[12px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#DBEAFE]"
                >
                  Keşif İste
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ PROJELER ============================ */}
      <section id="projelerimiz" className="section-shell bg-[#F8FAFC]">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">Uygulamalarımız</span>
              <h2 className="section-title">Öne Çıkan Son Projelerimiz</h2>
              <p className="section-subtitle">
                Bahçelievler ve çevresinde tamamladığımız cam balkon, kış bahçesi ve sürme sistem
                uygulamalarından bir seçki.
              </p>
            </div>
            <Link
              prefetch={true}
              href="/profesyoneller/referanslar"
              className="inline-flex shrink-0 items-center gap-1.5 text-[11.5px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8]"
            >
              Tüm projeleri incele <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PROJECTS.map((project) => (
              <Link
                prefetch={true}
                key={project.title}
                href={project.href}
                className="group overflow-hidden rounded-card border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    title={`${project.title} — ${project.meta} | Çelikpen`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#1D4ED8] backdrop-blur-sm">
                    {project.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-[13.5px] font-semibold text-[#0F172A] group-hover:text-[#1D4ED8]">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[10.5px] text-slate-500">{project.meta}</p>
                </div>
              </Link>
            ))}

            <Link
              prefetch={true}
              href="/profesyoneller/referanslar"
              className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-card border border-[#BFDBFE] bg-gradient-to-br from-[#0F172A] via-[#172554] to-[#1D4ED8] p-6 text-white shadow-xs transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#1E3A8A]/40 blur-2xl" />
              <span className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-[#D91B24]/15 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#BFDBFE]">
                  Proje Arşivi
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-[#BFDBFE] group-hover:bg-white group-hover:text-[#1D4ED8]">
                  <IconArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="relative mt-10">
                <p className="text-4xl font-semibold tracking-tight">15.000+</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-300">
                  Tamamlanan uygulama
                </p>
                <p className="mt-4 max-w-xs text-[11.5px] leading-relaxed text-slate-300">
                  Bahçelievler ve çevresindeki gerçek uygulamalarımızı, ölçü ve sistem detaylarıyla
                  birlikte inceleyin.
                </p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white">
                Galeriyi Aç <IconArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ YORUMLAR ============================ */}
      <div className="cv-auto">
        <CustomerReviews />
      </div>

      {/* ============================ SSS ============================ */}
      <section id="sss" className="section-shell bg-[#F8FAFC]">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div>
            <span className="section-kicker">Sıkça Sorulan Sorular</span>
            <h2 className="section-title">Aklınıza takılanlar</h2>
            <p className="section-subtitle">
              Cam balkon izni, ölçü, yalıtım ve garanti hakkında en sık aldığımız soruların
              yanıtları.
            </p>
            <div className="mt-6 rounded-card border border-slate-200 bg-white p-5 shadow-xs">
              <p className="text-[11px] font-semibold text-[#0F172A]">Başka bir sorunuz mu var?</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-slate-500">
                Teknik ekibimiz hafta içi 08:30 - 19:30 arasında yanınızda.
              </p>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1E3A8A]"
              >
                <IconPhone className="h-3.5 w-3.5" /> {SITE_CONFIG.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="divide-y divide-slate-200 overflow-hidden rounded-card border border-slate-200 bg-white">
            {SITE_CONFIG.faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[12px] font-semibold leading-relaxed text-[#0F172A] marker:hidden hover:bg-[#F8FAFC]">
                  {faq.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform group-open:rotate-45">
                    <IconPlus className="h-3 w-3" />
                  </span>
                </summary>
                <div className="px-5 pb-4 pr-12 text-[11px] leading-relaxed text-slate-500">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ BLOG ============================ */}
      <section id="blog" className="section-shell bg-white">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">Bilgi Merkezi</span>
              <h2 className="section-title">Blog & mimari rehberler</h2>
              <p className="section-subtitle">
                Doğru sistemi seçmenize yardımcı olacak teknik ve yasal içerikler.
              </p>
            </div>
            <Link
              prefetch={true}
              href="/profesyoneller/blog"
              className="inline-flex shrink-0 items-center gap-1.5 text-[11.5px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8]"
            >
              Tüm yazılar <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                prefetch={true}
                key={post.title}
                href={post.href}
                className="group flex flex-col overflow-hidden rounded-card border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    title={`${post.title} — Çelikpen Mimari Rehber & Blog`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#0F172A]/85 px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-[13.5px] font-semibold leading-snug text-[#0F172A] group-hover:text-[#1D4ED8]">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[10.5px] leading-relaxed text-slate-500">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400">
                      {post.read}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1E3A8A]">
                      Oku <IconArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SON DÖNÜŞÜM CTA ============================ */}
      <section className="bg-white pb-14 sm:pb-20">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-panel bg-[#0F172A] px-6 py-10 text-white sm:px-10 sm:py-14">
            <span className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#1E3A8A]/35 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-[#D91B24]/15 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#BFDBFE]">
                  <IconSparkle className="h-3 w-3" /> Aynı Gün Ücretsiz Keşif
                </span>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Evinizde Ücretsiz Keşif Yapalım
                </h2>
                <p className="mt-3 max-w-xl text-[12.5px] leading-relaxed text-slate-300">
                  Balkonunuzu ölçelim, ihtiyacınıza uygun sistemi ve cam seçeneklerini birlikte
                  belirleyelim. Keşif ve fiyat teklifi tamamen ücretsiz.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10.5px] text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <IconCheck className="h-3 w-3 text-[#10B981]" /> Lazerli ölçü
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <IconCheck className="h-3 w-3 text-[#10B981]" /> Renk danışmanlığı
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <IconCheck className="h-3 w-3 text-[#10B981]" /> Net fiyat
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col lg:items-stretch">
                <Link
                  prefetch={true}
                  href="/iletisim?form=kesif"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#1E3A8A] px-5 py-3.5 text-[12px] font-semibold text-white shadow-navy transition-colors hover:bg-[#1D4ED8]"
                >
                  <IconCalendar className="h-4 w-4" /> Keşif Randevusu Al
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/25 bg-white/5 px-5 py-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <IconPhone className="h-4 w-4" /> {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] text-slate-500">
            {ADDITIONAL_LINKS.map((link) => (
              <Link
                prefetch={true}
                key={link.href} href={link.href} className="transition-colors hover:text-[#1E3A8A]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="cv-auto">
        <SeoGuide />
      </div>
    </main>
  );
}

/* ============================================================================
   ICONS
   ============================================================================ */
type IconProps = { className?: string };

function IconArrowRight({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconCheck({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
function IconPlus({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function IconSparkle({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9L12 3Z" /><path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  );
}
function IconCalendar({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function IconPhone({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconBadge({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconGlass({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18M12 3v18" /><path d="m7 7 2 2" opacity=".45" />
    </svg>
  );
}
function IconVertical({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m8 7 4-4 4 4M8 17l4 4 4-4M12 3v18" />
    </svg>
  );
}
function IconSun({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
function IconHome({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 21v-8h6v8" />
    </svg>
  );
}
function IconSlide({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 3v18M8 8h2M14 16h2" />
    </svg>
  );
}
function IconLayers({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </svg>
  );
}
function IconShield({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}
