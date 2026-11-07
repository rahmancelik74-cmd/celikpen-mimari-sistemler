import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../../config/seo.config';
import { LegalPage, LEGAL_CONTACT as C } from '../../components/LegalPage';

export const metadata: Metadata = generatePageMetadata({
  title: 'Gizlilik Politikası — Çelikpen',
  description:
    'Çelikpen web sitesi gizlilik politikası: veri güvenliği tedbirleri, üçüncü taraf bağlantılar ve saklama süreleri.',
  path: '/gizlilik-politikasi',
  keywords: ['gizlilik politikası', 'Çelikpen veri güvenliği'],
});

export default function GizlilikPage() {
  return (
    <LegalPage
      breadcrumbLabel="Gizlilik Politikası"
      title="Gizlilik Politikası"
      subtitle="Kişisel verilerinizin güvenliği ve gizliliği bizim için önceliklidir."
      sections={[
        {
          heading: 'Kapsam',
          paragraphs: [
            `Bu politika, ${C.title} tarafından işletilen web sitesinin ziyaretçilerine ilişkin gizlilik uygulamalarını açıklar. Kişisel verilerin işlenmesine ilişkin ayrıntılar KVKK Aydınlatma Metni'nde yer alır.`,
          ],
        },
        {
          heading: 'Veri Güvenliği Tedbirleri',
          items: [
            '256-Bit TLS 1.3 SSL şifrelemesi ile tüm veri iletimi korunur.',
            'HSTS (HTTP Strict Transport Security) ile yalnızca güvenli bağlantı zorunlu kılınır.',
            'CSP (Content Security Policy) ile izinsiz içerik/betik yüklenmesi engellenir.',
            'XSS koruması: girdiler temizlenir (sanitization) ve çıktılar kaçışlanır.',
            'Formlarda bot/spam koruması (honeypot, zaman kontrolü) uygulanır.',
            'Verilere erişim yetkili kişilerle sınırlıdır.',
          ],
        },
        {
          heading: 'Üçüncü Taraf Bağlantılar',
          paragraphs: [
            'Sitemiz; WhatsApp (iletişim talepleri), Google Haritalar (konum), Instagram ve YouTube gibi üçüncü taraf hizmetlere bağlantı veya gömülü içerik barındırabilir. Bu hizmetlerin gizlilik uygulamaları ilgili sağlayıcıların politikalarına tabidir ve Çelikpen bu sitelerin içeriğinden sorumlu değildir. WhatsApp üzerinden ilettiğiniz bilgiler yalnızca sizin başlattığınız görüşme kapsamında paylaşılır.',
          ],
        },
        {
          heading: 'Saklama Süreleri',
          items: [
            'İletişim ve teklif talepleri: talebin sonuçlanmasından itibaren en fazla 2 yıl.',
            'Sözleşme ve fatura kayıtları: ilgili mevzuattaki yasal süre (genel olarak 10 yıl).',
            'Erişim (log) kayıtları: 5651 sayılı Kanun uyarınca 6 ay.',
            'Çerez tercihleri: tarayıcınızda silene kadar veya değiştirene kadar.',
          ],
        },
        {
          heading: 'Haklarınız ve İletişim',
          paragraphs: [
            `Gizlilikle ilgili sorularınız ve KVKK m. 11 kapsamındaki talepleriniz için ${C.email} adresine veya ${C.address} adresine başvurabilirsiniz.`,
          ],
        },
      ]}
    />
  );
}
