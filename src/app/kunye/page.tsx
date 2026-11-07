import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../../config/seo.config';
import { LegalPage, LEGAL_CONTACT as C } from '../../components/LegalPage';

export const metadata: Metadata = generatePageMetadata({
  title: 'Yasal Künye & Yer Sağlayıcı Bilgisi — Çelikpen',
  description:
    'Çelikpen resmi iletişim ve ticari künye bilgileri ile 5651 sayılı Kanun uyarınca yer sağlayıcı (hosting) bilgisi.',
  path: '/kunye',
  keywords: ['Çelikpen künye', 'yer sağlayıcı bilgisi', '5651'],
});

export default function KunyePage() {
  return (
    <LegalPage
      breadcrumbLabel="Yasal Künye"
      title="Yasal Künye & Yer Sağlayıcı Bilgisi"
      subtitle="Resmi iletişim, ticari künye ve 5651 sayılı Kanun kapsamındaki yer sağlayıcı bilgileri."
      sections={[
        {
          heading: 'Resmi İletişim & Ticari Künye',
          items: [
            `Unvan: ${C.title}`,
            `Açık Adres: ${C.address}`,
            `Telefon: ${C.phone}`,
            `E-posta: ${C.email}`,
            'KEP Adresi: (KEP adresi tanımlandığında burada yayımlanacaktır)',
            'Vergi Dairesi / Vergi Numarası / Ticaret Sicil No: (Resmi bilgiler tanımlandığında burada yayımlanacaktır)',
          ],
        },
        {
          heading: '5651 Sayılı Kanun Uyarınca Yer Sağlayıcı (Hosting) Bilgisi',
          paragraphs: [
            "5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun uyarınca, bu web sitesinin yer sağlayıcısı aşağıdaki gibidir:",
          ],
          items: [
            'Yer Sağlayıcı: Vercel Inc.',
            'Adres: 440 N Barranca Ave #4133, Covina, CA 91723, USA',
            'Web: https://vercel.com',
          ],
        },
        {
          heading: 'İçerik Sorumluluğu ve Bildirim',
          paragraphs: [
            `Hak ihlali veya hukuka aykırı içerik bildirimleri için ${C.email} adresine başvurabilirsiniz.`,
          ],
        },
      ]}
    />
  );
}
