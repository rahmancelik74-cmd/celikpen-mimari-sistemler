import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';
import { generatePageMetadata } from '../../config/seo.config';
import { EUROPEAN_SIDE_DISTRICTS } from '../../data/districtsData';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../components/SeoJsonLd';

const PAGE_TITLE =
  'İstanbul Avrupa Yakası Hizmet Bölgelerimiz — Cam Balkon, Kış Bahçesi ve Winsa PVC';
const PAGE_DESCRIPTION =
  'Bahçelievler Kocasinan Merkez üretim tesisimizden Bakırköy (Florya, Yeşilköy, Ataköy), Beşiktaş (Etiler, Ulus), Sarıyer (Zekeriyaköy, Göktürk), Başakşehir (Bahçeşehir), Beylikdüzü, Büyükçekmece, Şişli ve tüm Avrupa Yakası ilçelerine ücretsiz lazerli keşif ve 10 yıl garantili montaj.';

export const metadata: Metadata = generatePageMetadata({
  title: `${PAGE_TITLE} | ${SITE_CONFIG.brandName}`,
  description: PAGE_DESCRIPTION,
  path: '/bolgeler',
  keywords: [
    'Avrupa Yakası cam balkon',
    'Bakırköy Florya Yeşilköy cam balkon',
    'Beşiktaş Etiler giyotin cam',
    'Sarıyer Zekeriyaköy kış bahçesi',
    'Başakşehir Bahçeşehir cam balkon',
    'Beylikdüzü cam balkon fiyatları',
    'Büyükçekmece Alkent 2000 kış bahçesi',
    'Şişli Nişantaşı PVC pencere',
    'Bahçelievler cam balkon üretici',
  ],
});

export default function BolgelerHubPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Avrupa Yakası Hizmet Bölgelerimiz', path: '/bolgeler' },
  ]);
  const webPageSchema = buildWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/bolgeler',
    type: 'CollectionPage',
  });

  const totalProjects = EUROPEAN_SIDE_DISTRICTS.reduce(
    (sum, d) => sum + d.completedProjectsCount,
    0
  );

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={breadcrumbSchema} id="bolgeler-breadcrumb-jsonld" />
      <JsonLd data={webPageSchema} id="bolgeler-webpage-jsonld" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#0F172A] to-[#0F172A] py-14 text-white sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl"
        />
        <div className="container-shell relative z-10">
          <nav aria-label="Breadcrumb" className="text-[11px] text-slate-300">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-sky-200">Avrupa Yakası Hizmet Bölgelerimiz</li>
            </ol>
          </nav>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200">
            1996’dan Bugüne • Kocasinan Merkez Fabrika Çıkışlı
          </span>

          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            İstanbul Avrupa Yakası Cam Balkon, Kış Bahçesi ve Winsa PVC Hizmet Bölgelerimiz
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Merkezimiz{' '}
            <strong className="font-semibold text-white">
              Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C, 34186 Bahçelievler / İstanbul
            </strong>{' '}
            adresindeki CNC üretim tesisimizden; Bakırköy Florya-Yeşilköy sahil hattından Beşiktaş Etiler’e, Sarıyer Zekeriyaköy villalarından Başakşehir Bahçeşehir ve Beylikdüzü’ne kadar tüm Avrupa Yakası ilçelerine ücretsiz lazerli keşif ve 10 yıl sistem garantili montaj sunuyoruz.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-white">25 İlçe</div>
              <div className="mt-0.5 text-[11px] text-slate-300">Tüm İstanbul Avrupa Yakası</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-sky-300">
                {totalProjects.toLocaleString('tr-TR')}+
              </div>
              <div className="mt-0.5 text-[11px] text-slate-300">Avrupa Yakası Referans</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-emerald-300">Aynı Gün</div>
              <div className="mt-0.5 text-[11px] text-slate-300">Ücretsiz Lazerli Keşif</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-amber-300">10 Yıl</div>
              <div className="mt-0.5 text-[11px] text-slate-300">Yazılı Sistem Garantisi</div>
            </div>
          </div>
        </div>
      </section>

      {/* AVRUPA YAKASI İLÇE KARTLARI */}
      <section className="section-shell bg-[#F8FAFC]">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">Bölgesel Mimari Çözümler</span>
              <h2 className="section-title">
                Avrupa Yakası Hizmet İlçelerimiz (Villa, Rezidans &amp; Konut)
              </h2>
              <p className="section-subtitle">
                Her ilçenin rüzgâr yükü, deniz nemi, akustik gürültü ve site yönetim planına özel geliştirdiğimiz mimari cam balkon ve doğrama çözümlerini inceleyin.
              </p>
            </div>
            <Link
              href="/fiyat-hesapla"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1E3A8A] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#1D4ED8]"
            >
              Canlı m² Fiyat Hesapla →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EUROPEAN_SIDE_DISTRICTS.map((district) => (
              <article
                key={district.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/40 hover:shadow-lg"
              >
                <Link
                  href={`/bolgeler/${district.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                >
                  <Image
                    src={district.heroImage}
                    alt={district.heroImageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#1E3A8A]/90 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                    {district.segmentBadge}
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-[10.5px] font-bold text-[#0F172A]">
                    {district.serviceTimeFromHq}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#1E3A8A]">
                      <Link href={`/bolgeler/${district.slug}`}>{district.name}</Link>
                    </h3>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-700">
                      {district.completedProjectsCount}+ Proje
                    </span>
                  </div>

                  <p className="mt-1 text-xs font-semibold text-[#1E3A8A]">
                    Öncelikli Bölgeler: {district.subDistricts}
                  </p>

                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-600">
                    {district.urbanFocus}
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3 text-[11px]">
                    <span className="block font-bold uppercase tracking-wider text-slate-400">
                      Önerilen Mimari Sistem
                    </span>
                    <span className="mt-0.5 block font-semibold text-[#0F172A]">
                      {district.primarySystemCode}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold">
                    <Link
                      href={`/bolgeler/${district.slug}`}
                      className="text-[#1E3A8A] hover:underline"
                    >
                      İlçe Rehberi &amp; Fiyatlar →
                    </Link>
                    <Link
                      href="/iletisim?form=kesif"
                      className="rounded-lg bg-orange-600 px-3 py-1.5 text-[11px] text-white hover:bg-orange-700"
                    >
                      Ücretsiz Keşif
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
