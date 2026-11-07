import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../../config/seo.config';
import { LegalPage, LEGAL_CONTACT as C } from '../../components/LegalPage';

export const metadata: Metadata = generatePageMetadata({
  title: 'Kullanım Koşulları — Çelikpen',
  description:
    'Çelikpen web sitesi kullanım koşulları, fikri mülkiyet hakları ve fiyat hesaplama aracının sorumluluk sınırları.',
  path: '/kullanim-kosullari',
  keywords: ['kullanım koşulları', 'Çelikpen şartlar'],
});

export default function KullanimKosullariPage() {
  return (
    <LegalPage
      breadcrumbLabel="Kullanım Koşulları"
      title="Kullanım Koşulları"
      subtitle="Bu siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız."
      sections={[
        {
          heading: 'Sitenin Kullanım Amacı',
          paragraphs: [
            `Bu web sitesi, ${C.title} ürün ve hizmetleri hakkında bilgi vermek, keşif talebi almak ve iletişim kurmak amacıyla işletilmektedir. Site hukuka ve genel ahlaka aykırı, sistemin işleyişini bozucu amaçlarla kullanılamaz.`,
          ],
        },
        {
          heading: 'Fikri Mülkiyet Hakları',
          paragraphs: [
            'Sitedeki tüm metin, görsel, logo, tasarım, yazılım ve teknik içerik Çelikpen\'e veya lisans verenlerine aittir ve 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile korunur. Yazılı izin olmaksızın kopyalanamaz, çoğaltılamaz, dağıtılamaz veya ticari amaçla kullanılamaz. Üçüncü taraf marka ve logoları ilgili hak sahiplerine aittir.',
          ],
        },
        {
          heading: 'Online m² Fiyat Hesaplama Aracı',
          paragraphs: [
            'Sitedeki Online m² Fiyat Hesaplama aracı yalnızca tahmini ve bilgilendirme amaçlıdır. Hesaplanan tutarlar bağlayıcı bir icap (teklif) niteliği taşımaz. Kesin fiyat; ücretsiz lazerli keşif ile yerinde ölçü alınması, ürün/cam/renk seçimi ve güncel birim fiyatlar esas alınarak belirlenir.',
          ],
        },
        {
          heading: 'Muvafakatname Örneği',
          paragraphs: [
            'Sitede sunulan Muvafakatname Örneği genel bilgilendirme amaçlı bir şablondur; hukuki danışmanlık değildir. Her bina ve site yönetim planı farklı olabileceğinden, kullanım öncesinde ilgili mevzuat ve yönetim planı kontrol edilmeli, gerekirse uzman görüşü alınmalıdır. Çelikpen, örneğin kullanımından doğan sonuçlardan sorumlu tutulamaz.',
          ],
        },
        {
          heading: 'Sorumluluk Sınırları',
          items: [
            'Sitedeki bilgiler özenle hazırlanır ancak eksiksiz, güncel veya hatasız olduğu garanti edilmez.',
            'Teknik özellikler, görseller ve renkler önceden bildirilmeksizin değiştirilebilir; ekran farklılıkları gerçek ürünü birebir yansıtmayabilir.',
            'Kesinti, erişim sorunu veya üçüncü taraf bağlantıların içeriğinden doğan zararlardan Çelikpen sorumlu değildir.',
            'Bağlayıcı sözleşme yalnızca keşif sonrası yazılı teklifin taraflarca onaylanmasıyla kurulur.',
          ],
        },
        {
          heading: 'Uygulanacak Hukuk ve Yetki',
          paragraphs: [
            'Bu koşullara Türkiye Cumhuriyeti hukuku uygulanır. Uyuşmazlıklarda, tüketici mevzuatındaki yetki kuralları saklı kalmak kaydıyla İstanbul mahkemeleri ve icra daireleri yetkilidir.',
          ],
        },
        {
          heading: 'İletişim',
          paragraphs: [`Sorularınız için: ${C.email} — ${C.phone}`],
        },
      ]}
    />
  );
}
