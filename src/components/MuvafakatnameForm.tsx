'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/site.config';
import { CELIKPEN_PRICING_CONFIG } from '../config/pricing.config';

export function MuvafakatnameForm() {
  const [apartmentName, setApartmentName] = useState('Çelikpen Örnek Apartmanı');
  const [neighborhood, setNeighborhood] = useState('Kocasinan Merkez');
  const [addressDetail, setAddressDetail] = useState('Mahmutbey Cad. No: 12 Bahçelievler / İstanbul');
  const [applicantDoorNo, setApplicantDoorNo] = useState('5');
  const [applicantName, setApplicantName] = useState('');
  const [totalUnits, setTotalUnits] = useState<number>(10);
  const [selectedProfile, setSelectedProfile] = useState('Antrasit Gri (RAL 7016)');
  const [selectedGlass] = useState('Şeffaf / Alt %40 Kumlama Buzlu Temperli');

  const requiredApprovals = Math.ceil((totalUnits * 4) / 5);

  return (
    <section className="mt-10 rounded-2xl border border-celikpen-border bg-celikpen-subtle p-6 shadow-sm print:border-black print:bg-white print:p-0 print:text-black print:shadow-none">
      {/* Ekran Kontrol Paneli (Yazdırırken Gizlenir) */}
      <div className="mb-6 border-b border-celikpen-border pb-6 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-celikpen-brand/10 px-3 py-1 text-xs font-bold text-celikpen-brand">
              KMK Madde 19 Uyumlu • İnteraktif Belge Üretici
            </span>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              4/5 (%80) Kat Maliki Muvafakatname Formu Oluşturucu
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Apartman bilgilerinizi aşağıdan doldurun ve <strong>Yazdır / PDF Kaydet</strong> butonuna
              tıklayarak imzaya hazır resmi tutanağı alın.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-celikpen-cta px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-rose-500"
          >
            <span>🖨️ Formu Yazdır / PDF İndir</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Apartman / Site Adı</label>
            <input
              type="text"
              value={apartmentName}
              onChange={(e) => setApartmentName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Bahçelievler Mahallesi</label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
            >
              {SITE_CONFIG.neighborhoods.map((n) => (
                <option key={n.slug} value={n.name}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Sokak ve Kapı No</label>
            <input
              type="text"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Başvuran Daire No & Malik Adı
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                placeholder="Daire"
                value={applicantDoorNo}
                onChange={(e) => setApplicantDoorNo(e.target.value)}
                className="w-20 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-900"
              />
              <input
                type="text"
                placeholder="Ad Soyad"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Binadaki Toplam Bağımsız Bölüm (Daire)
            </label>
            <input
              type="number"
              min={2}
              max={60}
              value={totalUnits}
              onChange={(e) => setTotalUnits(Math.min(60, Math.max(2, Number(e.target.value) || 10)))}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
            />
            <span className="mt-0.5 block text-[11px] font-semibold text-emerald-700">
              Gerekli 4/5 Yasal Çoğunluk: En az <strong>{requiredApprovals}</strong> Kat Maliki İmzası
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Standart Dış Cephe Profil Rengi
            </label>
            <select
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
            >
              {Object.values(CELIKPEN_PRICING_CONFIG.profileColors).map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resmi Yazdırılabilir Belge Alanı */}
      <div className="rounded-xl border border-celikpen-border bg-white p-6 text-slate-700 print:border-0 print:bg-white print:p-4 print:text-black">
        <div className="border-b border-celikpen-border pb-4 text-center print:border-black">
          <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 print:text-black">
            634 SAYILI KAT MÜLKİYETİ KANUNU MADDE 19 UYARINCA
          </h3>
          <h4 className="mt-1 text-sm font-bold uppercase text-celikpen-brand print:text-black">
            GÖMME / AÇIK BALKON CAM BALKON KAPAMA 4/5 (%80) KAT MALİKLERİ MUVAFAKATNAMESİ
          </h4>
        </div>

        <div className="mt-4 space-y-2 text-xs leading-relaxed">
          <p>
            <strong className="text-slate-900">Apartman / Site Adı:</strong> {apartmentName} (
            {neighborhood} Mah. {addressDetail})
          </p>
          <p>
            <strong className="text-slate-900">Uygulama Yapılacak Bağımsız Bölüm:</strong> Daire No:{' '}
            {applicantDoorNo} {applicantName ? `— Malik: ${applicantName}` : ''}
          </p>
          <p>
            <strong className="text-slate-900">Bina Cephe Standardı ve Teknik Şart:</strong> Eylül
            2026 Yargıtay içtihatları ve Kat Mülkiyeti Kanunu 19. maddesi kapsamında; bina
            statiğine, kolon/kiriş yapısına ve ara duvarlara hiçbir müdahalede bulunulmaksızın,
            bina dış cephe estetiğiyle tam uyumlu <strong>{selectedProfile}</strong> alüminyum
            profil ve <strong>{selectedGlass}</strong> ({SITE_CONFIG.warranties.glassCertification})
            kullanılarak sürgülü/katlanır cam balkon sistemi yapılmasına, aşağıda imzası bulunan
            kat malikleri olarak (Toplam {totalUnits} bağımsız bölümden en az {requiredApprovals}{' '}
            malik onayı ile) yazılı muvafakat veriyoruz.
          </p>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-left text-xs print:border-black">
            <thead>
              <tr className="bg-celikpen-subtle text-slate-700 print:bg-gray-100 print:text-black">
                <th className="border border-slate-300 p-2 print:border-black">Sıra</th>
                <th className="border border-slate-300 p-2 print:border-black">Daire No</th>
                <th className="border border-slate-300 p-2 print:border-black">
                  Kat Maliki Adı Soyadı
                </th>
                <th className="border border-slate-300 p-2 print:border-black">Tarih</th>
                <th className="border border-slate-300 p-2 print:border-black">
                  Muvafakat İmzası
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(20, totalUnits) }).map((_, i) => (
                <tr key={i}>
                  <td className="border border-celikpen-border p-2 font-semibold print:border-black">
                    {i + 1}
                  </td>
                  <td className="border border-celikpen-border p-2 print:border-black">
                    Daire {i + 1}
                  </td>
                  <td className="border border-celikpen-border p-2 print:border-black">
                    ........................................................
                  </td>
                  <td className="border border-celikpen-border p-2 print:border-black">
                    ..../..../2026
                  </td>
                  <td className="border border-celikpen-border p-2 print:border-black">
                    ....................................
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 print:text-black">
          <span>
            Teknik Uygulayıcı Firma: <strong className="text-slate-900">{SITE_CONFIG.fullTitle}</strong>
          </span>
          <span>İletişim & Ücretsiz Keşif: {SITE_CONFIG.phoneDisplay}</span>
        </div>
      </div>
    </section>
  );
}
