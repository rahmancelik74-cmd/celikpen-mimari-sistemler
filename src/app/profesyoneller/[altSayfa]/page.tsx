import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  PROFESSIONAL_SUBPAGES,
  ProfessionalSubpageSlug,
  CATALOG_DOCUMENTS,
  TECHNICAL_SPEC_TEXTS,
  QUALITY_CERTIFICATES,
  PROFESSIONAL_INSIGHT_ARTICLES,
  OPENING_OPTIONS_DATA,
  REFERENCE_PROJECTS,
  BLOG_POSTS,
} from '../../../config/winsa-professionals.config';
import { SITE_CONFIG } from '../../../config/site.config';
import { MinimalSubpageHeader } from '../../../components/MinimalSubpageHeader';
import { CopySpecCard } from '../../../components/CopySpecCard';
import { PrintDatasheetButton } from '../../../components/PrintDatasheetButton';
import { MuvafakatnameForm } from '../../../components/MuvafakatnameForm';

export function generateStaticParams() {
  return PROFESSIONAL_SUBPAGES.map((item) => ({
    altSayfa: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ altSayfa: string }>;
}): Promise<Metadata> {
  const { altSayfa } = await params;
  const pageMeta = PROFESSIONAL_SUBPAGES.find((p) => p.slug === altSayfa);
  if (!pageMeta) {
    return { title: 'Profesyoneller | Çelikpen & Winsa' };
  }
  return {
    title: `${pageMeta.title} | Profesyoneller — ${SITE_CONFIG.brandName}`,
    description: pageMeta.seoDescription,
  };
}

export default async function ProfesyonellerAltSayfa({
  params,
}: {
  params: Promise<{ altSayfa: string }>;
}) {
  const { altSayfa } = await params;
  const currentMeta = PROFESSIONAL_SUBPAGES.find((p) => p.slug === altSayfa);

  if (!currentMeta) {
    notFound();
  }

  const slug = currentMeta.slug as ProfessionalSubpageSlug;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-slate-700 sm:px-6">
      <MinimalSubpageHeader
        breadcrumbLabel={currentMeta.title}
        parentBreadcrumb={{ label: 'Profesyoneller', href: '/profesyoneller' }}
        overline={currentMeta.heroBadge}
        title={currentMeta.title}
        subtitle={currentMeta.subtitle}
        rightAction={<PrintDatasheetButton label="🖨️ Sayfayı Yazdır" />}
      />

      {/* SOL KOMPAKT STICKY SIDEBAR (`w-60`) + SAĞ GÖRSEL BENTO İÇERİK */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Sol Sticky Sidebar (`w-60`) */}
        <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-60">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <div className="border-b border-slate-100 bg-[#0B1560] px-4 py-3 text-white">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300">
                PROFESYONELLER
              </p>
              <h2 className="text-sm font-black">10 Teknik Modül</h2>
            </div>
            <nav aria-label="Profesyoneller Alt Menüsü" className="p-1.5">
              <ul className="space-y-0.5">
                {PROFESSIONAL_SUBPAGES.map((item) => {
                  const active = item.slug === slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/profesyoneller/${item.slug}`}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                          active
                            ? 'bg-[#D91B24] text-white'
                            : 'text-[#0B1560] hover:bg-slate-100 hover:text-[#D91B24]'
                        }`}
                      >
                        <span>{item.title}</span>
                        <span>›</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Sağ İçerik Paneli */}
        <div className="min-w-0 flex-1 space-y-6">
          {/* 1. PROJE HİZMETLERİ */}
          {slug === 'proje-hizmetleri' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  {
                    step: '01',
                    title: 'TS EN 1991-1-4 Rüzgar Yükü & Atalet Hesabı',
                    desc: 'Kat yüksekliği ve cephe yönüne göre orta kayıt atalet momenti (Ix/Iy) ve destek sacı kesit analizi.',
                  },
                  {
                    step: '02',
                    title: 'EN ISO 10077-1 Termal (Uw) & Akustik Simülasyon',
                    desc: '76 mm / 84 mm profil ve üçlü Low-E / Akustik Lamine cam kombinasyonlarının modellenmesi.',
                  },
                  {
                    step: '03',
                    title: '1:1 AutoCAD Kesit & Körkasa Detayları',
                    desc: 'Mermer denizlik, mantolama ve monoblok panjur birleşim paftalarının hazırlanması.',
                  },
                  {
                    step: '04',
                    title: 'Lazerli Röleve & Süpervizörlü Montaj',
                    desc: 'Milimetrik lazer ölçüm ve EPDM sızdırmazlık kontrolü ile anahtar teslim kurulum.',
                  },
                ].map((card) => (
                  <div
                    key={card.step}
                    className="hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                  >
                    <span className="inline-block rounded bg-[#D91B24] px-2 py-0.5 text-[10px] font-black text-white">
                      ADIM {card.step}
                    </span>
                    <h3 className="mt-2.5 text-sm font-black text-[#0B1560]">{card.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <div className="bg-[#0B1560] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white">
                  Kat Yüksekliğine Göre Statik Sistem Seçim Tablosu
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-200 bg-slate-50 text-[#0B1560]">
                      <tr>
                        <th className="px-4 py-3 font-extrabold">Kat Yüksekliği</th>
                        <th className="px-4 py-3 font-extrabold">Rüzgar Basıncı</th>
                        <th className="px-4 py-3 font-extrabold">Önerilen PVC / Sürme</th>
                        <th className="px-4 py-3 font-extrabold">Önerilen Cam Balkon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="px-4 py-3 font-bold">0 – 8m (1 - 3. Kat)</td>
                        <td className="px-4 py-3">800 Pa</td>
                        <td className="px-4 py-3">Safir 76 / Dorado 76 / Lotus</td>
                        <td className="px-4 py-3">VNS Katlanır / VDS Sürme</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold">8 – 20m (4 - 7. Kat)</td>
                        <td className="px-4 py-3">1100 Pa</td>
                        <td className="px-4 py-3">Dorado 76 / Comfort Slide Plus</td>
                        <td className="px-4 py-3">VBS 4+20+4 Isıcamlı</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold">20 – 100m (8+ Kat)</td>
                        <td className="px-4 py-3">1300 – 1600 Pa</td>
                        <td className="px-4 py-3">Revotech Gold / Panorama HS 76</td>
                        <td className="px-4 py-3">VBS Isıcamlı (3mm Alüminyum)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. KATALOGLAR */}
          {slug === 'kataloglar' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {CATALOG_DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  className="hover-lift flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded bg-[#0B1560]/10 px-2 py-0.5 text-[10px] font-extrabold text-[#0B1560]">
                        {doc.category}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">{doc.code}</span>
                    </div>
                    <h3 className="mt-2.5 text-sm font-black text-[#0B1560]">{doc.title}</h3>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span>{doc.pages}</span>
                      <span>•</span>
                      <span>{doc.format}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <Link
                      href={`/urunler/${doc.relatedSlug}`}
                      className="inline-flex flex-1 items-center justify-center rounded-lg bg-[#0B1560] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#D91B24]"
                    >
                      📄 Kesit &amp; Seri Detayı
                    </Link>
                    <Link
                      href="/iletisim?form=bilgi"
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-[#0B1560] hover:border-[#D91B24] hover:text-[#D91B24]"
                    >
                      ⬇ DWG
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. TEKNİK ŞARTNAMELER (1-Click Kopyalanabilir Kartlar) */}
          {slug === 'teknik-sartnameler' && (
            <div className="space-y-6">
              <div className="space-y-3.5">
                {TECHNICAL_SPEC_TEXTS.map((spec) => (
                  <CopySpecCard
                    key={spec.id}
                    code={spec.code}
                    title={spec.title}
                    series={spec.series}
                    content={spec.content}
                  />
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D91B24]">
                  KAT MÜLKİYETİ KANUNU UYUMLU BELGE
                </span>
                <h3 className="mt-1 text-base font-black text-[#0B1560]">
                  Apartman &amp; Site Yönetimi Cam Balkon Muvafakatname Oluşturucu
                </h3>
                <div className="mt-4">
                  <MuvafakatnameForm />
                </div>
              </div>
            </div>
          )}

          {/* 4. KALİTE BELGELERİ */}
          {slug === 'kalite-belgeleri' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {QUALITY_CERTIFICATES.map((cert) => (
                <div
                  key={cert.code}
                  className="glass-sheen hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#0B1560] px-2.5 py-1 text-[11px] font-black text-white">
                      <span className="text-[#D91B24]">★</span>
                      <span>{cert.code}</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">{cert.validity}</span>
                  </div>
                  <p className="mt-2 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    {cert.org}
                  </p>
                  <h3 className="mt-1 text-sm font-black text-[#0B1560]">{cert.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{cert.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* 5. PROFESYONEL BAKIŞ */}
          {slug === 'profesyonel-bakis' && (
            <div className="space-y-4">
              {PROFESSIONAL_INSIGHT_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                >
                  <span className="inline-block rounded bg-[#D91B24]/10 px-2 py-0.5 text-[10px] font-extrabold text-[#D91B24]">
                    {article.tag}
                  </span>
                  <h2 className="mt-2 text-base font-black text-[#0B1560]">{article.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{article.summary}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    {article.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-center"
                      >
                        <p className="text-[10px] font-bold uppercase text-slate-400">{m.label}</p>
                        <p className="mt-0.5 text-sm font-black text-[#0B1560]">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* 6. MONTAJ KILAVUZU (DİYAGONAL CAM TAKOZLAMA SVG DİYAGRAMLI) */}
          {slug === 'montaj-kilavuzu' && (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-7">
                {[
                  {
                    title: '01. Lazer Terazi & Kama Boşluğu (10-15 mm)',
                    desc: 'Isıl genleşme ve poliüretan köpük dolgusu için 10-15 mm pay bırakılarak şakülüne alınır.',
                  },
                  {
                    title: '02. Ankraj Vida Aralıkları (Maks. 700 mm)',
                    desc: 'Köşelerden 150 mm içeriden başlanarak çelik destek sacına sabitlenir.',
                  },
                  {
                    title: '03. Diyagonal Cam Takozlama',
                    desc: 'Kanat yükünü menteşe alt köşesine aktarmak için taşıyıcı takozlar diyagonal yerleştirilir.',
                  },
                  {
                    title: '04. Su Tahliye & EPDM Sızdırmazlık',
                    desc: 'Dış cephe birleşim derzleri UV dayanımlı nötr silikon ve EPDM bant ile yalıtılır.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="hover-lift rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs"
                  >
                    <h3 className="text-xs font-black text-[#0B1560]">{item.title}</h3>
                    <p className="mt-1 text-xs text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#0B1560] bg-slate-900 p-5 text-white lg:col-span-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300">
                    CAD MONTAJ DİYAGRAMI
                  </span>
                  <h3 className="mt-1 text-sm font-black">Diyagonal Cam Takozlama Şeması</h3>
                </div>

                <div className="my-3 flex items-center justify-center rounded-xl bg-slate-950 p-4">
                  <svg
                    viewBox="0 0 260 300"
                    className="h-56 w-full max-w-[220px]"
                    aria-label="Cam Takozlama Şeması"
                  >
                    <rect x="20" y="20" width="220" height="260" fill="none" stroke="#94A3B8" strokeWidth="4" />
                    <rect x="36" y="36" width="188" height="228" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
                    <rect x="30" y="55" width="8" height="24" fill="#CBD5E1" />
                    <rect x="30" y="220" width="8" height="24" fill="#CBD5E1" />
                    <rect x="216" y="135" width="8" height="30" rx="2" fill="#D91B24" />
                    <line x1="46" y1="254" x2="214" y2="46" stroke="#D91B24" strokeWidth="2" strokeDasharray="6 4" />
                    <polyline points="44,44 216,150 44,256" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
                    <rect x="52" y="260" width="28" height="7" fill="#EF4444" />
                    <rect x="220" y="55" width="7" height="28" fill="#EF4444" />
                    <rect x="180" y="31" width="28" height="7" fill="#EF4444" />
                    <rect x="31" y="215" width="7" height="28" fill="#EF4444" />
                    <rect x="52" y="31" width="24" height="6" fill="#38BDF8" />
                    <rect x="180" y="260" width="24" height="6" fill="#38BDF8" />
                    <text x="65" y="150" fill="#F8FAFC" fontSize="10" fontWeight="bold">
                      DİYAGONAL YÜK AKSI
                    </text>
                  </svg>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-2.5 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-xs bg-red-500" />
                    <span>Taşıyıcı Takoz</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-xs bg-sky-400" />
                    <span>Mesafe Takozu</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 7. KULLANIM KILAVUZU */}
          {slug === 'kullanim-kilavuzu' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  badge: 'İLK 30 GÜN',
                  title: 'Koruyucu Folyo Bantların Sökülmesi',
                  desc: 'Montaj sonrası koruyucu bantlar UV altında kaynamaması için 30 gün içinde çıkarılmalıdır.',
                },
                {
                  badge: 'YILDA 1 KEZ',
                  title: 'Mekanizma ve Rulman Yağlaması',
                  desc: 'Kilitleme pimleri ve rulmanlar yılda 1 kez asitsiz yağ veya silikon sprey ile yağlanmalıdır.',
                },
                {
                  badge: 'MEVSİM GEÇİŞİ',
                  title: 'Yaz / Kış Eksantrik Baskı Ayarı',
                  desc: 'Eksantrik pimler kışın contaya sıkı basacak yöne, yazın nötr konuma alınmalıdır.',
                },
                {
                  badge: 'PERİYODİK BAKIM',
                  title: 'EPDM Conta ve Tahliye Kanalı Temizliği',
                  desc: 'Yalnızca ılık sabunlu su kullanılmalı, alt kasa su tahliye kanalları açık tutulmalıdır.',
                },
              ].map((guide) => (
                <div
                  key={guide.title}
                  className="hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D91B24]">
                    {guide.badge}
                  </span>
                  <h3 className="mt-1.5 text-sm font-black text-[#0B1560]">{guide.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{guide.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* 8. AÇILIM SEÇENEKLERİ (SVG KİNEMATİK DİYAGRAMLAR) */}
          {slug === 'acilim-secenekleri' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {OPENING_OPTIONS_DATA.map((opt) => (
                <div
                  key={opt.code}
                  className="hover-lift flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-[#0B1560] px-2 py-0.5 text-[10px] font-black text-white">
                        {opt.code}
                      </span>
                      <span className="text-[11px] font-bold text-[#D91B24]">{opt.series}</span>
                    </div>

                    <div className="my-3 flex h-24 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-2">
                      <svg viewBox="0 0 180 90" className="h-18 w-36" aria-label={opt.name}>
                        <rect x="15" y="10" width="150" height="70" fill="#FFFFFF" stroke="#0B1560" strokeWidth="3" />
                        {opt.type === 'single-turn' && (
                          <polyline points="15,10 165,45 15,80" fill="none" stroke="#D91B24" strokeWidth="2" strokeDasharray="4 3" />
                        )}
                        {opt.type === 'tilt-turn' && (
                          <>
                            <polyline points="15,10 165,45 15,80" fill="none" stroke="#D91B24" strokeWidth="2" strokeDasharray="4 3" />
                            <polyline points="15,80 90,10 165,80" fill="none" stroke="#004A8F" strokeWidth="2" />
                          </>
                        )}
                        {(opt.type === 'lift-slide' || opt.type === 'axial-slide') && (
                          <>
                            <line x1="90" y1="10" x2="90" y2="80" stroke="#0B1560" strokeWidth="2.5" />
                            <path d="M 35 45 L 75 45 M 65 37 L 75 45 L 65 53" fill="none" stroke="#D91B24" strokeWidth="2.5" />
                          </>
                        )}
                        {opt.type === 'folding-glass' && (
                          <>
                            <line x1="52" y1="10" x2="52" y2="80" stroke="#004A8F" strokeWidth="1.5" />
                            <line x1="90" y1="10" x2="90" y2="80" stroke="#004A8F" strokeWidth="1.5" />
                            <line x1="128" y1="10" x2="128" y2="80" stroke="#004A8F" strokeWidth="1.5" />
                            <path d="M 145 45 L 30 45 M 40 37 L 30 45 L 40 53" fill="none" stroke="#D91B24" strokeWidth="2.5" />
                          </>
                        )}
                        {opt.type === 'guillotine' && (
                          <>
                            <line x1="15" y1="35" x2="165" y2="35" stroke="#004A8F" strokeWidth="2" />
                            <line x1="15" y1="58" x2="165" y2="58" stroke="#004A8F" strokeWidth="2" />
                            <path d="M 90 20 L 90 70 M 82 60 L 90 70 L 98 60" fill="none" stroke="#D91B24" strokeWidth="2.5" />
                          </>
                        )}
                      </svg>
                    </div>

                    <h3 className="text-sm font-black text-[#0B1560]">{opt.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{opt.description}</p>
                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-2.5 text-[11px] text-slate-500">
                    <strong className="text-[#0B1560]">İdeal Alan:</strong> {opt.idealFor}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 9. REFERANSLAR */}
          {slug === 'referanslar' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {REFERENCE_PROJECTS.map((ref) => (
                <div
                  key={ref.id}
                  className="hover-lift rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#D91B24]">{ref.district}</span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                      {ref.year} • {ref.area}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-black text-[#0B1560]">{ref.title}</h3>
                  <p className="mt-1 text-xs text-slate-600">
                    <strong className="text-slate-900">Sistem:</strong> {ref.systemUsed} ({ref.color})
                  </p>
                  <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800">
                    ✓ {ref.highlight}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 10. BLOG */}
          {slug === 'blog' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="hover-lift flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="rounded bg-[#D91B24]/10 px-2 py-0.5 text-[#D91B24]">
                        {post.category}
                      </span>
                      <span className="text-slate-400">{post.readTime}</span>
                    </div>
                    <h2 className="mt-2.5 text-sm font-black text-[#0B1560]">{post.title}</h2>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <Link
                      href={post.ctaHref}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#0B1560] hover:text-[#D91B24]"
                    >
                      <span>{post.ctaLabel}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
