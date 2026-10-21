import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../config/site.config';

const CONTENT = {
  metaTitle: `Nasıl Çalışırız? 4 Adımda Lazerli Keşif, CNC Üretim ve Montaj | ${SITE_CONFIG.brandName}`,
  metaDescription: `${SITE_CONFIG.warranties.freeSurveyPromise}. 4 adımda şeffaf cam balkon keşif, net teklif, Kocasinan CNC atölye üretimi ve 12 noktalı kalite kontrolle garantili montaj süreci.`,
  badge: 'Şeffaf Mühendislik Süreci • Kocasinan Merkez Fabrika Güvencesi',
  heading: 'Nasıl Çalışırız? 4 Adımda Ücretsiz Keşiften Garantili Montaja',
  subheading: SITE_CONFIG.warranties.freeSurveyPromise,
  steps: [
    {
      stepNo: '01',
      icon: '📏',
      title: '3 Boyutlu Lazerli Keşif & Cephe Emsal Analizi',
      line1: `${SITE_CONFIG.warranties.freeSurveyPromise}.`,
      line2:
        'Balkonunuzun milimetrik lazer terazi ölçümü alınır; üst/alt parapet terazisi, kombi bacası geçişi ve bina dış cephe RAL profil rengi (Antrasit RAL 7016, Mat Siyah, Altın Meşe vb.) yerinde tespit edilir.',
      checklist: [
        'Dijital lazer metre ile ±0.5 mm hassasiyetli röleve alımı',
        'Rüzgar yükü (kat yüksekliği) ve güneş yönüne göre cam tipi tavsiyesi',
        'Apartman yönetim planına uygun profil ve cam rengi kartela eşleştirmesi',
      ],
    },
    {
      stepNo: '02',
      icon: '📋',
      title: 'Net m² Sözleşmesi & 4/5 Muvafakatname Dosyası',
      line1:
        'Sürpriz ek maliyet olmadan, seçtiğiniz cam ve profil serisine göre m² birim fiyatı üzerinden resmi yazılı sözleşme sunulur.',
      line2:
        'Apartman yönetimi için gerekli Eylül 2026 Yargıtay uyumlu 4/5 (%80) kat maliki muvafakatname dosyası ve teknik kesit föyü ücretsiz teslim edilir.',
      checklist: [
        'İnternet sitemizdeki net m² birim fiyatlarıyla %100 aynı şeffaf bütçe',
        'Kat Mülkiyeti Kanunu Madde 19 uyumlu hazır imza çizelgesi',
        '5+ daire toplu bina siparişlerinde anında %15 fabrika iskontosu',
      ],
    },
    {
      stepNo: '03',
      icon: '🏭',
      title: 'Kocasinan Merkez CNC Üretim & Şişecam Temperleme',
      line1:
        'Alüminyum kasa ve kanat profilleri Kocasinan Merkez tesisimizde 0.1 mm hassasiyetli CNC kesimle balkon ölçünüze özel işlenir.',
      line2: `${SITE_CONFIG.warranties.glassCertification} plakalar rodajlanıp 650°C fırınlarda temperlenerek 5 kat darbe mukavemetine ulaştırılır.`,
      checklist: [
        'T66 ısıl işlemli 3 mm et kalınlığında birincil alüminyum profil kesimi',
        'Isıcamlı serilerde %90 Argon gazı dolumu ve Warm-Edge (sıcak kenar) çıta uygulaması',
        'Kanat başına 8 bilyalı AISI 304 paslanmaz çelik rulman montajı',
      ],
    },
    {
      stepNo: '04',
      icon: '🔧',
      title: 'Aynı Gün Temiz Montaj & 12 Noktalı Sızdırmazlık Testi',
      line1:
        'Kendi kadrolu ve sigortalı montaj ekibimiz tarafından ortalama 3-5 saat içinde su tahliye, EPDM contalama ve kanat terazi ayarları yapılarak kurulum tamamlanır.',
      line2:
        'Teslimat sırasında su deşarj testi, çocuk kilidi kontrolü yapılır ve 10 yıl rulman/mekanik garanti belgesi takdim edilir.',
      checklist: [
        'Paslanmaz çelik dübel ve vidalarla mermer/beton ankraj sabitlemesi',
        'UV dayanımlı antibakteriyel nötr cephe silikonu ve EPDM fitil izolasyonu',
        'Montaj sonrası balkonun temiz teslimi ve kullanıcı eğitimli garanti belgesi',
      ],
    },
  ],
  sidebar: {
    badge: 'Hızlı Keşif & Randevu Hattı',
    title: 'Balkonunuz İçin Bugün Ücretsiz Lazerli Keşif Planlayın',
    desc: 'Kocasinan Merkez üretim tesisimizden Bahçelievler’in 11 mahallesine aynı gün ölçü ve projelendirme ekibi yönlendiriyoruz.',
    whatsappLabel: 'WhatsApp ile Keşif Randevusu Al',
    calculatorLabel: 'Önce Canlı m² Fiyat Hesapla →',
    whatsappMessage: `Merhaba Çelikpen (${SITE_CONFIG.headquartersNeighborhood}), balkonum için ücretsiz lazerli keşif randevusu oluşturmak istiyorum.`,
  },
};

export const metadata: Metadata = {
  title: CONTENT.metaTitle,
  description: CONTENT.metaDescription,
};

export default function NasilCalisirizPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    CONTENT.sidebar.whatsappMessage
  )}`;

  return (
    <main className="mx-auto max-w-container px-4 pb-14 pt-10 text-slate-700">
      <div className="mb-8">
        <span className="inline-block rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
          {CONTENT.badge}
        </span>
        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">{CONTENT.heading}</h1>
        <p className="mt-2 text-sm text-slate-600">{CONTENT.subheading}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Sol: 4 Adım + Kalite Kontrol Maddeleri */}
        <div className="space-y-5 lg:col-span-8">
          {CONTENT.steps.map((step) => (
            <div
              key={step.stepNo}
              className="rounded-2xl border border-celikpen-border bg-white p-6 shadow-sm transition hover:border-celikpen-brand-soft hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-celikpen-border bg-celikpen-subtle text-2xl">
                  <span aria-hidden="true">{step.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-celikpen-brand px-2.5 py-0.5 text-xs font-extrabold text-white">
                      Adım {step.stepNo}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900">{step.title}</h2>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{step.line1}</p>
                  <p className="mt-1 text-xs text-slate-500">{step.line2}</p>

                  <ul className="mt-3 space-y-1 rounded-xl border border-celikpen-border bg-celikpen-subtle p-3 text-xs text-slate-700">
                    {step.checklist.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sağ: Yan Panel Keşif için WhatsApp CTA */}
        <aside className="sticky top-24 rounded-2xl border border-celikpen-border bg-celikpen-subtle p-6 shadow-sm lg:col-span-4">
          <span className="inline-block rounded-full bg-celikpen-cta/10 px-3 py-0.5 text-xs font-bold text-celikpen-cta">
            {CONTENT.sidebar.badge}
          </span>
          <h2 className="mt-3 text-xl font-bold text-slate-900">{CONTENT.sidebar.title}</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">{CONTENT.sidebar.desc}</p>

          <div className="mt-5 space-y-2 rounded-xl border border-celikpen-border bg-white p-4 text-xs text-slate-600">
            <div>📍 {SITE_CONFIG.address}</div>
            <div>🕒 {SITE_CONFIG.workingHours}</div>
            <div>✅ {SITE_CONFIG.warranties.glassCertification}</div>
            <div>🛡️ 10 Yıl Rulman & Mekanik Sistem Garantisi</div>
            <div>🔒 256-Bit SSL & Resmi Sözleşmeli Hizmet</div>
          </div>

          <div className="mt-5 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-celikpen-cta px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-rose-500"
            >
              <span>💬 {CONTENT.sidebar.whatsappLabel}</span>
            </a>

            <Link
              href="/fiyat-hesapla"
              className="block w-full rounded-lg border border-celikpen-brand bg-white px-4 py-2.5 text-center text-xs font-bold text-celikpen-brand transition hover:bg-celikpen-subtle"
            >
              {CONTENT.sidebar.calculatorLabel}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
