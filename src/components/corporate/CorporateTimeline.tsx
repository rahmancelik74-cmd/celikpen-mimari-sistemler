'use client';

import React, { useState } from 'react';

const MILESTONES = [
  {
    year: '1996',
    title: 'Bahçelievler’de Temel',
    summary:
      'İstanbul / Bahçelievler’de aile atölyesinde alüminyum doğrama üretimi başladı. İlk yıllarda balkon kapatma ve özel ölçü doğrama işleri yapıldı.',
    details: ['Aile atölyesi ve ilk usta kadrosu', 'Özel ölçü alüminyum doğrama', 'Bahçelievler ve çevresinde saha tecrübesi'],
  },
  {
    year: '2002',
    title: 'Kurumsal Atölye',
    summary:
      'Büyüyen taleple birlikte üretim alanı genişletildi; cam balkon sistemleri ve seri üretim disiplini kurumsal kimliğin parçası oldu.',
    details: ['Daha geniş üretim alanı', 'Cam balkon sistemlerine geçiş', 'Kendi montaj ekibinin oluşturulması'],
  },
  {
    year: '2008',
    title: 'Isıcam ve Temperli Cam',
    summary:
      'Enerji verimliliği ve güvenlik öne çıktı. Temperli cam ve ısıcam konfigürasyonları ürün gamına eklendi; yalıtım odaklı projeler hızlandı.',
    details: ['TSE EN 12150 temperli cam', 'Isıcam ve argon dolum', 'Dört mevsim kullanılabilir balkonlar'],
  },
  {
    year: '2014',
    title: 'CNC ve Lazer Ölçüm',
    summary:
      'CNC profil işleme hattı ve lazerli saha ölçümü devreye alındı. Toleranslar milimetrik seviyeye indirildi, montaj revizyonları azaltıldı.',
    details: ['0,1 mm CNC toleransı', 'Lazerli cephe rölövesi', 'Dijital iş emri ve üretim takibi'],
  },
  {
    year: '2019',
    title: 'Winsa Yetkili Üretim',
    summary:
      'Winsa PVC profil teknolojileriyle çözüm ortaklığı genişletildi. Çok odacıklı profil, çelik takviye ve EPDM conta disiplini üretime entegre edildi.',
    details: ['Winsa PVC profil sistemleri', 'EN 12207 / 12208 / 12210 performansı', 'PVC pencere ve kapı üretimi'],
  },
  {
    year: '2024',
    title: 'Dijitalleşme ve Garanti',
    summary:
      'Keşif, üretim ve montaj süreçleri dijital takip sistemine bağlandı. 10 yıl sistem garantisi ve satış sonrası bakım planı standart hâle geldi.',
    details: ['Dijital proje dosyası', '10 yıl sistem garantisi', 'Periyodik bakım ve yedek parça desteği'],
  },
  {
    year: '2026',
    title: '30. Yıl',
    summary:
      'Çelikpen 30. yılında 15.000’den fazla projeyi geride bıraktı. Mimari cam, PVC doğrama ve yalıtım teknolojilerinde İstanbul’un referans markalarından biri olmayı sürdürüyor.',
    details: ['30 yıllık kesintisiz üretim', '15.000+ tamamlanan proje', 'Yeni nesil mimari sistemler'],
  },
];

export function CorporateTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = MILESTONES[activeIndex];

  return (
    <section
      id="kurumsal-tarihce"
      aria-labelledby="kurumsal-tarihce-baslik"
      className="scroll-mt-28 rounded-panel border border-slate-200 bg-white p-5 shadow-xs sm:p-7"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">
            <span className="h-px w-7 bg-[#1E3A8A]" aria-hidden="true" />
            Kurumsal Hafıza
          </div>
          <h2
            id="kurumsal-tarihce-baslik"
            className="mt-2 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl"
          >
            30 Yıllık Kurumsal Miras (1996–2026)
          </h2>
          <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
            Bir atölyeden İstanbul’un mimari cam ve doğrama markasına uzanan yolculukta her dönüm
            noktası, bugünkü üretim ve mühendislik kültürümüzü şekillendirdi.
          </p>
        </div>
        <div className="inline-flex w-fit items-baseline gap-1 rounded-sm border border-[#1E3A8A]/25 bg-[#EFF6FF] px-3 py-2 text-[#1E3A8A]">
          <span className="text-2xl font-extrabold leading-none">30</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em]">Yıl</span>
        </div>
      </div>

      <div className="no-scrollbar mt-7 overflow-x-auto pb-1">
        <div className="flex min-w-[840px]" role="group" aria-label="Çelikpen tarihsel dönüm noktaları">
          {MILESTONES.map((milestone, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={milestone.year}
                type="button"
                aria-pressed={selected}
                aria-label={`${milestone.year} — ${milestone.title}`}
                onClick={() => setActiveIndex(index)}
                className={`group relative flex min-w-[120px] flex-1 flex-col items-start border-t-2 px-3 pb-3 pt-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 ${
                  selected
                    ? 'border-[#1E3A8A] bg-[#EFF6FF]'
                    : 'border-slate-200 bg-white hover:border-[#93C5FD] hover:bg-slate-50'
                }`}
              >
                <span
                  className={`absolute -top-[6px] left-3 h-3 w-3 rounded-full border-2 transition-colors ${
                    selected
                      ? 'border-[#1E3A8A] bg-[#1E3A8A]'
                      : 'border-slate-300 bg-white group-hover:border-[#93C5FD]'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`text-[13px] font-extrabold tracking-tight transition-colors ${
                    selected ? 'text-[#1E3A8A]' : 'text-[#0F172A]'
                  }`}
                >
                  {milestone.year}
                </span>
                <span
                  className={`mt-1 text-[10px] font-semibold leading-snug transition-colors ${
                    selected ? 'text-[#1D4ED8]' : 'text-slate-500'
                  }`}
                >
                  {milestone.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="mt-5 grid gap-5 rounded-card border border-[#BFDBFE] bg-[#F8FAFC] p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:p-6"
        aria-live="polite"
      >
        <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-sm bg-[#0F172A] text-white">
          <span className="text-3xl font-extrabold leading-none tracking-tight">{active.year}</span>
          <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">
            Kilometre Taşı
          </span>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-[#0F172A]">{active.title}</h3>
            <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#1E3A8A]">
              {active.year}
            </span>
          </div>
          <p className="mt-2 max-w-3xl text-[12px] leading-relaxed text-slate-600">{active.summary}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {active.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-[10.5px] leading-relaxed text-slate-600">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" aria-hidden="true" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
