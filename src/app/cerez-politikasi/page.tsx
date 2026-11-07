import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../../config/seo.config';
import { LegalPage } from '../../components/LegalPage';
import { CookiePrefsButton } from './CookiePrefsButton';

export const metadata: Metadata = generatePageMetadata({
  title: 'Çerez Politikası — Çelikpen',
  description:
    'Çelikpen çerez politikası: kullanılan çerez türleri, süreleri, amaçları ve tarayıcıdan çerez kontrolü.',
  path: '/cerez-politikasi',
  keywords: ['çerez politikası', 'Çelikpen çerezler'],
});

export default function CerezPolitikasiPage() {
  return (
    <LegalPage
      breadcrumbLabel="Çerez Politikası"
      title="Çerez Politikası"
      subtitle="Sitemizde hangi çerezlerin neden kullanıldığını ve nasıl kontrol edebileceğinizi öğrenin."
      sections={[
        {
          heading: 'Çerez Nedir?',
          paragraphs: [
            'Çerezler, web sitesini ziyaret ettiğinizde cihazınızda saklanan küçük metin dosyalarıdır. Yerel depolama (localStorage) gibi benzer teknolojiler de bu politika kapsamındadır.',
          ],
        },
        {
          heading: 'Kullanılan Çerez Türleri, Amaçları ve Süreleri',
          items: [
            'Zorunlu çerezler (her zaman aktif): güvenlik, oturum yönetimi ve çerez tercihinizin saklanması (celikpen_cookie_consent). Süre: oturum / tercih değiştirilene kadar.',
            'Analitik ve performans çerezleri (onaya bağlı): Google Analytics 4 ve Search Console ile ziyaret ve performans ölçümü. Süre: en fazla 24 ay.',
            'Pazarlama ve hedefleme çerezleri (onaya bağlı): Google Ads dönüşüm takibi. Süre: en fazla 90 gün.',
          ],
        },
        {
          heading: 'Tercihlerinizi Yönetme',
          paragraphs: [
            'Zorunlu olmayan çerezler yalnızca onayınızla kullanılır. Tercihinizi dilediğiniz zaman değiştirebilirsiniz.',
          ],
        },
        {
          heading: 'Tarayıcılardan Çerez Kontrolü',
          items: [
            'Google Chrome: Ayarlar › Gizlilik ve güvenlik › Üçüncü taraf çerezleri.',
            'Mozilla Firefox: Ayarlar › Gizlilik ve Güvenlik › Çerezler ve Site Verileri.',
            'Safari: Ayarlar › Gizlilik › Web sitesi verilerini yönet.',
            'Microsoft Edge: Ayarlar › Çerezler ve site izinleri.',
            'Çerezleri tamamen engellemeniz halinde sitenin bazı işlevleri düzgün çalışmayabilir.',
          ],
        },
      ]}
    >
      <div className="mt-6">
        <CookiePrefsButton />
      </div>
    </LegalPage>
  );
}
