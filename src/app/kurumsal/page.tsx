import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { CORPORATE_SUBPAGES } from '../../config/winsa-corporate.config';
import { MinimalSubpageHeader } from '../../components/MinimalSubpageHeader';

export const metadata: Metadata = generatePageMetadata({
  title: `Kurumsal — Vizyon, CNC Üretim ve Kalite Standartlarımız | ${SITE_CONFIG.brandName}`,
  description:
    'Çelikpen Cam Balkon & Mimari Sistemler kurumsal yapısı: Kocasinan Merkez CNC üretim tesisi, TS EN 12608-1 ve TSE EN 12150 kalite politikamız.',
  path: '/kurumsal',
  keywords: [
    'Çelikpen kurumsal',
    'cam balkon üreticisi İstanbul',
    'CNC alüminyum üretim',
    'kalite belgeleri cam balkon',
  ],
});

const CORPORATE_COUNTERS = [
  { value: '25+ Yıl', label: 'Mimari Mühendislik Tecrübesi' },
  { value: '10 Yıl', label: 'Kurumsal Garanti Güvencesi' },
  { value: 'TSE & CE', label: 'Avrupa Normlarında Üretim' },
  { value: '%65', label: 'Maksimum Termal Yalıtım' },
];

const TIMELINE_STEPS = [
  { step: '01', title: 'Lazerli Mimari Röleve', desc: 'Milimetrik cephe ve teras ölçümü.' },
  { step: '02', title: 'CNC Hassas Üretim', desc: '0.1 mm toleranslı profil ve cam işleme.' },
  { step: '03', title: 'Sertifikalı Kurulum', desc: 'Kadrolu uzman ekiplerle sızdırmaz montaj.' },
  { step: '04', title: '10 Yıl Garanti', desc: 'Rulman, mekanizma ve profil güvencesi.' },
];

const CERTIFICATES = [
  { code: 'TS EN 12608-1', title: 'A Sınıfı PVC Profil Standardı' },
  { code: 'TSE EN 12150', title: 'Şişecam Temperli Güvenlik Camı' },
  { code: 'IFT ROSENHEIM', title: 'Akustik & Termal Test Onayı' },
  { code: 'ISO 9001:2015', title: 'Uluslararası Kalite Yönetimi' },
];

export default function KurumsalPage() {
  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-8 text-slate-700 sm:px-6 lg:px-8">
      <MinimalSubpageHeader
        breadcrumbLabel="Kurumsal"
        overline="ÇELİKPEN KURUMSAL YAPISI"
        title="Yalıtım, Estetik ve Mühendislik"
        subtitle="Bahçelievler Kocasinan Merkez üretim tesisimizde Avrupa standartlarında cam balkon ve PVC doğrama sistemleri üretiyoruz."
      />

      {/* 4'lü İstatistik Bento Kartları */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CORPORATE_COUNTERS.map((item) => (
          <div
            key={item.label}
            className="glass-sheen hover-lift rounded-card border border-slate-200 bg-white p-5 text-center shadow-xs"
          >
            <div className="text-2xl font-semibold tracking-tight text-[#0F172A] sm:text-3xl">{item.value}</div>
            <div className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.1em] text-slate-500">{item.label}</div>
          </div>
        ))}
      </section>

      {/* 8 Kurumsal Alt Sayfa Bento Grid */}
      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#7C3AED]">
          <span className="h-[1.5px] w-5 bg-[#7C3AED]" />
          <span>KURUMSAL BÖLÜMLERİMİZ</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CORPORATE_SUBPAGES.map((sub) => (
            <Link
              prefetch={true}
              key={sub.slug}
              href={`/kurumsal/${sub.slug}`}
              className="hover-lift group relative flex flex-col justify-between overflow-hidden rounded-card border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-[#DDD6FE]"
            >
              <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-[#7C3AED] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <div>
                <span className="inline-block rounded-full bg-[#F5F3FF] px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-[#6D28D9]">
                  {sub.categoryGroup}
                </span>
                <h2 className="mt-2.5 text-[14px] font-semibold leading-snug text-[#0F172A] transition-colors group-hover:text-[#7C3AED]">
                  {sub.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
                  {sub.subtitle}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[10.5px] font-semibold text-[#6D28D9]">
                <span>İncele</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 Adımlı Süreç Timeline & Kalite Sertifika Rozetleri */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-card border border-slate-200 bg-white p-6 shadow-xs lg:col-span-7">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#7C3AED]">
            ÜRETİM &amp; KURULUM PROTOKOLÜ
          </div>
          <h2 className="mt-1 text-lg font-black text-[#0F172A]">4 Adımda Kusursuz Süreç</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TIMELINE_STEPS.map((st) => (
              <div
                key={st.step}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F172A] text-xs font-black text-white">
                  {st.step}
                </span>
                <div>
                  <h3 className="text-xs font-black text-[#0F172A]">{st.title}</h3>
                  <p className="mt-0.5 text-[11px] text-slate-600">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-white/10 bg-[#0F172A] p-6 text-white shadow-card lg:col-span-5">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#DDD6FE]">
            ULUSLARARASI AKREDİTASYON
          </div>
          <h2 className="mt-1 text-lg font-black text-white">Kalite Sertifikalarımız</h2>
          <div className="mt-4 grid grid-cols-1 gap-2.5">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.code}
                className="glass-sheen flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-xs"
              >
                <span className="font-semibold text-slate-200">{cert.title}</span>
                <span className="rounded-full bg-[#7C3AED] px-2.5 py-1 text-[9px] font-semibold text-white">
                  {cert.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
