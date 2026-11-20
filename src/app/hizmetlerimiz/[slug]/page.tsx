import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '../../../config/site.config';
import { generatePageMetadata } from '../../../config/seo.config';
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from '../../../components/SeoJsonLd';
import {
  SEO_SERVICE_PAGES,
  getSeoServiceBySlug,
  type SeoServicePageData,
} from '../../../data/seoServices';
import { SEO_DISTRICT_PAGES } from '../../../data/seoDistricts';
import { LiteYouTubeEmbed } from '../../../components/LiteYouTubeEmbed';
import {
  EXACT_COORDINATES,
  EXACT_GOOGLE_MAPS_URL,
  EXACT_READ_REVIEWS_URL,
  EXACT_WRITE_REVIEW_URL,
} from '../../../lib/google-business';

function extractYouTubeId(url?: string): string | null {
  const cleaned = (url || '').trim();
  if (!cleaned) return null;
  const match = cleaned.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  image: string;
  warrantyBadge: string;
  specBadge: string;
  advantages: string[];
  technicalSpecs: { label: string; value: string }[];
  usageAreas: string[];
  description: string;
  faqs: { question: string; answer: string }[];
  productHref: string;
  calculatorHref: string;
  keywords: string[];
}

const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: 'katlanir-cam-balkon',
    slug: 'katlanir-cam-balkon',
    title: 'Katlanır Cam Balkon Sistemleri',
    subtitle: '8mm / 10mm Temperli & Maksimum Panoramik Açıklık',
    heroDescription:
      'Kanatların tamamı tek bir köşede toplanarak balkonunuzu yazın %100 açık bir terasa, kışın ise rüzgar, yağmur, toz ve gürültüden arındırılmış ferah bir yaşam alanına dönüştürür.',
    image: '/images/services/katlanir-cam-balkon.jpg',
    warrantyBadge: '10 Yıl Sistem Garantisi',
    specBadge: '8 mm / 10 mm TSE Temperli',
    advantages: [
      'Şişecam 8 mm ve 10 mm TSE EN 12150 temperli güvenlik camı',
      'Kanat başına 8 bilyalı AISI 304 paslanmaz çelik rulman mekanizması',
      'Sararma yapmayan alüminyum mıknatıslı fitil ve çift sıra EPDM conta',
      'L ve U tipi köşe balkonlarda direksiz 90° ve 135° kesintisiz dönüş',
    ],
    technicalSpecs: [
      { label: 'Cam Kalınlığı', value: '8 mm / 10 mm TSE EN 12150 Temperli' },
      { label: 'Profil Malzeme', value: '6063 T5 Alüminyum, Elektrostatik Toz Boya' },
      { label: 'Rulman Sistemi', value: '8 Bilyalı AISI 304 Paslanmaz Çelik' },
      { label: 'Conta Tipi', value: 'Çift Sıra EPDM + Mıknatıslı Fitil' },
      { label: 'Köşe Dönüşü', value: '90° ve 135° Direksiz' },
      { label: 'Garanti', value: '10 Yıl Sistem Garantisi' },
    ],
    usageAreas: ['Konut Balkonları', 'Köşe L & U Balkonlar', 'Teras Kapatmaları'],
    description:
      'Çelikpen katlanır cam balkon sistemleri, Albert Genau Vera serisi alüminyum profil altyapısıyla İstanbul\'un zorlu iklim koşullarına karşı %100 panoramik açılım ve üstün dayanıklılık sunar. 8 mm ve 10 mm Şişecam TSE EN 12150 temperli güvenlik camları, kanat başına 8 bilyalı AISI 304 paslanmaz çelik rulman mekanizması ve çift sıra EPDM conta sistemiyle rüzgar, yağmur ve toz geçirmez bir yaşam alanı oluşturur. L ve U tipi köşe balkonlarda direksiz 90° ve 135° kesintisiz dönüş sağlayan patentli köşe profili sayesinde balkonunuzu kesintisiz bir terasa dönüştürür.',
    faqs: [
      {
        question: 'Katlanır cam balkon rüzgara dayanıklı mıdır?',
        answer:
          '8 mm ve 10 mm temperli güvenlik camları ve çift sıra EPDM conta sistemiyle katlanır cam balkon sistemlerimiz 130 km/s rüzgar hızına kadar dayanıklıdır.',
      },
      {
        question: 'Katlanır cam balkon kaç yıl garanti kapsamındadır?',
        answer:
          'Çelikpen katlanır cam balkon sistemleri 10 yıl sistem garantisi ile teslim edilir; rulman, profil ve camı kapsar.',
      },
      {
        question: 'Katlanır cam balkon m² fiyatı 2026 yılında ne kadardır?',
        answer:
          'Fiyatlar cam kalınlığı, profil rengi ve köşe detayına göre değişir. Güncel m² fiyatı için ücretsiz keşif talep edin veya online fiyat hesaplama aracımızı kullanın.',
      },
    ],
    productHref: '/urunler/vera-katlanir-cam-balkon',
    calculatorHref: '/fiyat-hesapla?seri=vns_10mm',
    keywords: ['katlanır cam balkon', 'cam balkon fiyatları', 'katlanır cam balkon İstanbul', '8mm temperli cam balkon'],
  },
  {
    id: 'isicamli-cam-balkon',
    slug: 'isicamli-cam-balkon',
    title: 'Isıcamlı Cam Balkon Sistemleri',
    subtitle: '4+20+4 Argon Gazlı Sinerji/Konfor Cam & Üstün Isı Yalıtımı',
    heroDescription:
      'Her iki yüzeyi temperli 28 mm (4+20+4) Argon gazlı Şişecam Sinerji ve Konfor Isıcam üniteleriyle standart tek camlı sistemlere göre 4 kat daha yüksek ısı yalıtımı ve -38 dB akustik konfor sağlar.',
    image: '/images/services/isicamli-cam-balkon.jpg',
    warrantyBadge: '10 Yıl Yalıtım Garantisi',
    specBadge: 'Uw: 1.1 W/m²K • 4+20+4 Argonlu',
    advantages: [
      '28 mm (4+20+4) Argon gaz dolgulu, çift tarafı temperli Low-E Isıcam',
      'Isı kaybında %72 tasarruf ve dış ortam gürültüsünde -38 dB azalma',
      'Termal bariyerli kasa ve gizli yağmur suyu tahliye oluğu',
      'Çocuk emniyet kilidi, cam üstü plise perde ve kedi sinekliği uyumu',
    ],
    technicalSpecs: [
      { label: 'Cam Ünitesi', value: '28 mm (4+20+4) Argon Gazlı Low-E Isıcam' },
      { label: 'Isı Geçirgenliği', value: 'Uw: 1.1 W/m²K' },
      { label: 'Ses Yalıtımı', value: '-38 dB Akustik İzolasyon' },
      { label: 'Profil', value: 'Termal Bariyerli Alüminyum Kasa' },
      { label: 'Su Tahliye', value: 'Gizli Yağmur Suyu Tahliye Oluğu' },
      { label: 'Garanti', value: '10 Yıl Yalıtım Garantisi' },
    ],
    usageAreas: ['Dört Mevsim Yaşam Balkonları', 'Ana Cadde Cepheleri', 'Çalışma & Yemek Odası Balkonlar'],
    description:
      'Çelikpen ısıcamlı cam balkon sistemleri, 28 mm (4+20+4) Argon gazlı çift tarafı temperli Low-E Şişecam Sinerji ve Konfor Isıcam üniteleriyle standart tek camlı sistemlere göre %72 ısı tasarrufu ve -38 dB akustik konfor sağlar. Termal bariyerli alüminyum kasa profili ve gizli yağmur suyu tahliye oluğuyla dört mevsim kullanılabilir yaşam alanları oluşturur. Çocuk emniyet kilidi, cam üstü plise perde ve kedi sinekliği entegrasyonuyla güvenli ve konforlu bir balkon deneyimi sunar.',
    faqs: [
      {
        question: 'Isıcamlı cam balkon ne kadar ısı tasarrufu sağlar?',
        answer:
          '4+20+4 Argon gazlı Low-E Isıcam ünitesiyle standart tek camlı sistemlere göre %72 ısı tasarrufu sağlar.',
      },
      {
        question: 'Isıcamlı cam balkon ses yalıtımı ne kadardır?',
        answer:
          'Çift tarafı temperli 28 mm Isıcam ünitesi sayesinde dış ortam gürültüsünde -38 dB azalma sağlar.',
      },
      {
        question: 'Isıcamlı cam balkon kışın kullanılabilir mi?',
        answer:
          'Uw: 1.1 W/m²K ısı geçirgenlik değeriyle ısıcamlı cam balkon kışın bile konforlu bir yaşam alanı sunar; ek ısıtma kaynağıyla dört mevsim kullanılabilir.',
      },
    ],
    productHref: '/urunler/vera-isicamli-cam-balkon',
    calculatorHref: '/fiyat-hesapla?seri=vbs_isicam',
    keywords: ['ısıcamlı cam balkon', 'ısıcamlı cam balkon fiyatları', '4+20+4 cam balkon', 'argon gazlı cam balkon'],
  },
  {
    id: 'surme-cam-balkon',
    slug: 'surme-cam-balkon',
    title: 'Sürme (Sürgülü) Cam Balkon Sistemleri',
    subtitle: 'Eşiksiz ve Eşikli Raylı Sistemler',
    heroDescription:
      'İçe açılan kanat payını tamamen ortadan kaldıran paralel raylı sürme mimarisi; dar balkonlarda masa ve sandalye yerleşimini özgürleştirirken engelsiz alt eşiğiyle takılma riskini sıfırlar.',
    image: '/images/services/surme-cam-balkon.jpg',
    warrantyBadge: '10 Yıl Rulman & Profil Garantisi',
    specBadge: 'Eşiksiz / 3 & 5 Raylı',
    advantages: [
      'İçe kanat açılma payı sıfır; dar ve uzun balkonlarda %100 alan kazancı',
      '8 mm pahlı engelsiz alt ray veya yüksek yalıtımlı eşikli kasa opsiyonu',
      '8/10 mm temperli tek cam veya 4+12+4 ısıcamlı sürme kanat seçeneği',
      'Birbirini çeken kenetli alüminyum profillerle tek parmakla sessiz sürüş',
    ],
    technicalSpecs: [
      { label: 'Ray Sistemi', value: '3 ve 5 Raylı Paralel Sürme' },
      { label: 'Alt Eşik', value: '8 mm Pahlı Engelsiz veya Eşikli Kasa' },
      { label: 'Cam Seçenekleri', value: '8/10 mm Temperli veya 4+12+4 Isıcamlı' },
      { label: 'Profil', value: 'Kenetli Alüminyum, Sessiz Sürüş' },
      { label: 'Alan Kazancı', value: 'İçe Kanat Payı Sıfır' },
      { label: 'Garanti', value: '10 Yıl Rulman & Profil Garantisi' },
    ],
    usageAreas: ['Dar ve Uzun Balkonlar', 'Fransız Balkonlar', 'Kış Bahçesi & Teras Ara Bölmeleri'],
    description:
      'Çelikpen sürme cam balkon sistemleri, içe açılan kanat payını tamamen ortadan kaldıran paralel raylı mimarisiyle dar ve uzun balkonlarda %100 alan kazancı sağlar. 8 mm pahlı engelsiz alt ray veya yüksek yalıtımlı eşikli kasa opsiyonuyla farklı balkon tiplerine uyum sağlar. 8/10 mm temperli tek cam veya 4+12+4 ısıcamlı sürme kanat seçenekleriyle yalıtım ihtiyacınıza göre özelleştirilebilir.',
    faqs: [
      {
        question: 'Sürme cam balkon dar balkonlara uygun mudur?',
        answer:
          'Evet, paralel raylı sürme sistemi içe kanat açılma payını sıfırladığı için dar ve uzun balkonlarda %100 alan kazancı sağlar.',
      },
      {
        question: 'Eşiksiz sürme cam balkon nedir?',
        answer:
          'Eşiksiz sürme sistemde 8 mm pahlı engelsiz alt ray kullanılır; takılma riski sıfırlanır ve balkon geçiş alanı tamamen düz kalır.',
      },
      {
        question: 'Sürme cam balkon ısıcamlı olabilir mi?',
        answer:
          'Evet, 4+12+4 ısıcamlı sürme kanat seçeneğiyle yüksek ısı ve ses yalıtımı elde edilebilir.',
      },
    ],
    productHref: '/urunler/panorama-esiksiz-surme-cam-balkon',
    calculatorHref: '/fiyat-hesapla?seri=vds_surme',
    keywords: ['sürme cam balkon', 'sürgülü cam balkon', 'eşiksiz cam balkon', 'raylı cam balkon'],
  },
  {
    id: 'giyotin-cam-sistemleri',
    slug: 'giyotin-cam-sistemleri',
    title: 'Motorlu Giyotin (Hareketli Küpeşte) Cam Sistemleri',
    subtitle: 'Uzaktan Kumandalı Dikey Açılım',
    heroDescription:
      'Somfy ve Becker tüp motor teknolojisiyle uzaktan kumanda üzerinden dikey eksende açılıp kapanan giyotin cam; açık konumda 110 cm güvenli cam korkuluk, kapalı konumda tam yalıtımlı cephe oluşturur.',
    image: '/images/services/giyotin-cam-sistemleri.jpg',
    warrantyBadge: '5 Yıl Motor + 10 Yıl Sistem Garantisi',
    specBadge: 'Somfy / Becker RTS Otomasyon',
    advantages: [
      'Uzaktan kumandalı, çelik zincir ve triger kayış tahrikli sessiz mekanizma',
      'Dış cepheye sarkmadan içeriden temizlik sağlayan "Silinebilir Kanat" sistemi',
      '4+16+4 Argonlu temperli Isıcam ve el sıkışma emniyetli baza profili',
      'Yağmur/rüzgar sensörü ve akıllı telefon (Wi-Fi) kontrol entegrasyonu',
    ],
    technicalSpecs: [
      { label: 'Motor', value: 'Somfy / Becker Tüp Motor, RTS Otomasyon' },
      { label: 'Cam Ünitesi', value: '4+16+4 Argonlu Temperli Isıcam' },
      { label: 'Tahrik', value: 'Çelik Zincir + Triger Kayış' },
      { label: 'Güvenlik', value: 'El Sıkışma Emniyetli Baza Profili' },
      { label: 'Akıllı Ev', value: 'Wi-Fi + Yağmur/Rüzgar Sensörü' },
      { label: 'Garanti', value: '5 Yıl Motor + 10 Yıl Sistem' },
    ],
    usageAreas: ['Çatı Dubleks Terasları', 'Kafe & Restoran Cepheleri', 'Bahçe Katı Verandalar'],
    description:
      'Çelikpen motorlu giyotin cam sistemleri, Somfy ve Becker tüp motor teknolojisiyle uzaktan kumanda üzerinden dikey eksende açılıp kapanır. Açık konumda 110 cm güvenli cam korkuluk işlevi görürken, kapalı konumda 4+16+4 Argonlu temperli Isıcam ile tam yalıtımlı cephe oluşturur. Yağmur ve rüzgar sensörleriyle hava durumuna göre otomatik kapanma ve akıllı telefon kontrolü sunar.',
    faqs: [
      {
        question: 'Giyotin cam sistemi nasıl çalışır?',
        answer:
          'Somfy veya Becker tüp motor ile dikey eksende aşağıdan yukarıya açılır. Açıkken 110 cm cam korkuluk, kapalıyken tam yalıtımlı cephe oluşturur.',
      },
      {
        question: 'Giyotin cam sistemi yağmurda otomatik kapanır mı?',
        answer:
          'Evet, entegre yağmur ve rüzgar sensörleri sayesinde hava koşulları kötüleştiğinde otomatik kapanır.',
      },
      {
        question: 'Giyotin cam sistemi akıllı telefondan kontrol edilir mi?',
        answer:
          'Evet, Wi-Fi modülü ile akıllı telefon uygulaması üzerinden her yerden kontrol edilebilir.',
      },
    ],
    productHref: '/urunler/giyotin-motorlu-silinebilir-cam',
    calculatorHref: '/fiyat-hesapla?seri=vgs_giyotin',
    keywords: ['giyotin cam', 'motorlu giyotin cam', 'hareketli küpeşte', 'dikey açılan cam sistemi'],
  },
  {
    id: 'kis-bahcesi-sistemleri',
    slug: 'kis-bahcesi-sistemleri',
    title: 'Kış Bahçesi Sistemleri',
    subtitle: 'Dört Mevsim Yalıtımlı Cam Tavan & Cephe Sistemleri',
    heroDescription:
      'Teras, veranda ve bahçe katlarını 365 gün kullanılabilen aydınlık bir odaya dönüştüren lamine güvenlikli ısıcam tavan, gizli dere oluğu ve ısıcamlı katlanır/sürme cephe kombinasyonu.',
    image: '/images/services/kis-bahcesi-sistemleri.jpg',
    warrantyBadge: '10 Yıl Sızdırmazlık Garantisi',
    specBadge: '4+16+(4+4 Lamine) Güvenlikli Cam Tavan',
    advantages: [
      '150 kg/m² kar yüküne ve dolu yağışına dayanıklı lamine + temperli ısıcam çatı',
      'Taşıyıcı çelik takviyeli alüminyum kolonlar içinden gizli yağmur suyu tahliyesi',
      'Güneş kontrol kaplamalı Şişecam Sinerji cam ile yazın sera etkisini önleme',
      'Isıcamlı katlanır, eşiksiz sürme veya motorlu giyotin cephelerle tam entegrasyon',
    ],
    technicalSpecs: [
      { label: 'Çatı Camı', value: '4+16+(4+4 Lamine) Güvenlikli Isıcam' },
      { label: 'Kar Yükü', value: '150 kg/m² Dayanım' },
      { label: 'Taşıyıcı', value: 'Çelik Takviyeli Alüminyum Kolon' },
      { label: 'Güneş Kontrolü', value: 'Şişecam Sinerji Kaplamalı Cam' },
      { label: 'Su Tahliye', value: 'Gizli Dere Oluğu Sistemi' },
      { label: 'Garanti', value: '10 Yıl Sızdırmazlık Garantisi' },
    ],
    usageAreas: ['Villa Bahçeleri', 'Çatı Terasları', 'Müstakil Verandalar & Ticari Mekanlar'],
    description:
      'Çelikpen kış bahçesi sistemleri, teras, veranda ve bahçe katlarını 365 gün kullanılabilen aydınlık yaşam alanlarına dönüştürür. 4+16+(4+4 Lamine) güvenlikli ısıcam tavan 150 kg/m² kar yüküne dayanıklıdır. Çelik takviyeli alüminyum kolonlar içinden gizli yağmur suyu tahliyesi ve Şişecam Sinerji güneş kontrol kaplamalı camlarla sera etkisi önlenir.',
    faqs: [
      {
        question: 'Kış bahçesi yazın çok sıcak olmaz mı?',
        answer:
          'Güneş kontrol kaplamalı Şişecam Sinerji cam ve havalandırma panelleri sayesinde yazın sera etkisi önlenir ve konforlu bir iç ortam sağlanır.',
      },
      {
        question: 'Kış bahçesi cam tavanı kar yüküne dayanır mı?',
        answer:
          'Evet, 4+16+(4+4 Lamine) güvenlikli ısıcam tavan 150 kg/m² kar yüküne ve dolu yağışına dayanıklıdır.',
      },
      {
        question: 'Kış bahçesi belediye izni gerektirir mi?',
        answer:
          'Yapının konumuna ve büyüklüğüne göre değişir. Çelikpen ekibi keşif sonrası belediye mevzuatı hakkında bilgilendirme yapar.',
      },
    ],
    productHref: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    calculatorHref: '/fiyat-hesapla?seri=pergola',
    keywords: ['kış bahçesi', 'kış bahçesi sistemleri', 'cam tavan', 'veranda kapatma', 'teras kış bahçesi'],
  },
  {
    id: 'bioklimatik-pergola',
    slug: 'bioklimatik-pergola',
    title: 'Bioklimatik Pergola & Tente Sistemleri',
    subtitle: 'Motorlu Alüminyum Lamel Tavan',
    heroDescription:
      'Kendi ekseni etrafında 0°–135° dönerek doğal iklimlendirme sağlayan ve geriye doğru toplanarak gökyüzünü tamamen açan poliüretan dolgulu alüminyum lamel tavan sistemi.',
    image: '/images/services/bioklimatik-pergola.jpg',
    warrantyBadge: '10 Yıl Yapısal & Otomasyon Garantisi',
    specBadge: '0°–135° Hareketli Termal Lamel',
    advantages: [
      'Hem kendi ekseninde dönen (havalandırma) hem geriye toplanan alüminyum lameller',
      'EPDM contalı lamel kenetlenmesi ve 220 mm oluklu ana kirişle %100 su sızdırmazlık',
      'Dimmerli Samsung Günışığı / RGB LED aydınlatma ve ısıtıcı entegrasyonu',
      'Rüzgar ve yağmur sensörleriyle hava durumuna göre otomatik kapanma',
    ],
    technicalSpecs: [
      { label: 'Lamel Açısı', value: '0°–135° Hareketli, Toplanabilir' },
      { label: 'Lamel Dolgu', value: 'Poliüretan Termal Dolgulu Alüminyum' },
      { label: 'Sızdırmazlık', value: 'EPDM Contalı + 220 mm Oluklu Ana Kiriş' },
      { label: 'Aydınlatma', value: 'Samsung LED Günışığı / RGB Dimmerli' },
      { label: 'Otomasyon', value: 'Rüzgar & Yağmur Sensörü, Uzaktan Kumanda' },
      { label: 'Garanti', value: '10 Yıl Yapısal & Otomasyon Garantisi' },
    ],
    usageAreas: ['Teras & Penthouse', 'Restoran & Otel Açık Alanları', 'Bahçe Oturma Alanları'],
    description:
      'Çelikpen bioklimatik pergola sistemleri, 0°–135° hareketli poliüretan dolgulu alüminyum lamelleriyle doğal iklimlendirme sağlar. Lameller geriye toplanarak gökyüzünü tamamen açabilir. EPDM contalı kenetlenme ve 220 mm oluklu ana kirişle %100 su sızdırmazlık garantisi verir. Samsung LED aydınlatma, ısıtıcı entegrasyonu ve rüzgar/yağmur sensörleriyle akıllı bir dış mekan deneyimi sunar.',
    faqs: [
      {
        question: 'Bioklimatik pergola yağmurda su geçirir mi?',
        answer:
          'Hayır, EPDM contalı lamel kenetlenmesi ve 220 mm oluklu ana kiriş sistemiyle %100 su sızdırmazlık sağlanır.',
      },
      {
        question: 'Bioklimatik pergola kışın kullanılır mı?',
        answer:
          'Evet, lameller kapatıldığında yalıtımlı bir tavan oluşur; entegre ısıtıcılarla kış aylarında da konforlu kullanılır.',
      },
      {
        question: 'Bioklimatik pergola LED aydınlatma dahil mi?',
        answer:
          'Evet, Samsung günışığı ve RGB LED aydınlatma standart olarak dahildir; dimmer ile parlaklık ayarlanabilir.',
      },
    ],
    productHref: '/urunler/bioklimatik-kis-bahcesi-sistemleri',
    calculatorHref: '/fiyat-hesapla?seri=pergola',
    keywords: ['bioklimatik pergola', 'pergola sistemleri', 'motorlu pergola', 'alüminyum lamel tavan'],
  },
  {
    id: 'pvc-pencere-kapi',
    slug: 'pvc-pencere-kapi',
    title: 'PVC Pencere & Kapı Montaj / Yenileme Hizmetleri',
    subtitle: 'Lazer Ölçüm, Söküm ve Anahtar Teslim Uygulama',
    heroDescription:
      'Winsa Revotech Gold (84 mm 7 odacıklı), Dorado 76, Safir 76 ve Panorama HS 76 Kaldır-Sür sistemleriyle mevcut daire pencerelerinizi mermer ve duvar yapısına zarar vermeden yeniliyoruz.',
    image: '/images/services/pvc-pencere-kapi.jpg',
    warrantyBadge: '10 Yıl Winsa & İşçilik Garantisi',
    specBadge: 'Uw: 0.79 W/m²K • -46 dB Akustik',
    advantages: [
      'Winsa 76 mm ve 84 mm 7 odacıklı, 3 contalı A sınıfı et kalınlığında profiller',
      'Eski doğramaların hasarsız sökümü ve poliüretan köpük + EPDM bantlı montaj',
      'RC2 emniyetli mantar başlıklı çelik ispanyolet kilit ve akustik pencere kolları',
      'Antrasit Gri, Kumlu Antrasit, Altın Meşe ve Koyu Ceviz Cool Colors laminasyon',
    ],
    technicalSpecs: [
      { label: 'Profil', value: 'Winsa 76/84 mm, 7 Odacıklı, 3 Contalı, A Sınıfı' },
      { label: 'Isı Geçirgenliği', value: 'Uw: 0.79 W/m²K' },
      { label: 'Ses Yalıtımı', value: '-46 dB Akustik İzolasyon' },
      { label: 'Güvenlik', value: 'RC2 Mantar Başlıklı Çelik İspanyolet' },
      { label: 'Montaj', value: 'Poliüretan Köpük + EPDM Bantlı' },
      { label: 'Garanti', value: '10 Yıl Winsa & İşçilik Garantisi' },
    ],
    usageAreas: ['Daire Tadilat & Yenileme', 'Kentsel Dönüşüm Binaları', 'Teras Kaldır-Sür Kapılar'],
    description:
      'Çelikpen PVC pencere ve kapı montaj hizmetleri, Winsa Revotech Gold (84 mm 7 odacıklı), Dorado 76, Safir 76 ve Panorama HS 76 Kaldır-Sür sistemleriyle eski doğramalarınızı mermer ve duvar yapısına zarar vermeden yeniler. Uw: 0.79 W/m²K ısı geçirgenliği ve -46 dB akustik yalıtımla enerji tasarrufu ve sessizlik sağlar.',
    faqs: [
      {
        question: 'PVC pencere değişimi sırasında duvar hasar görür mü?',
        answer:
          'Hayır, eski doğramalar özel söküm tekniğiyle hasarsız çıkarılır ve yeni pencereler poliüretan köpük + EPDM bant ile monte edilir.',
      },
      {
        question: 'Winsa PVC pencere ne kadar enerji tasarrufu sağlar?',
        answer:
          'Uw: 0.79 W/m²K ısı geçirgenlik değeriyle eski doğramalara göre %60\'a kadar enerji tasarrufu sağlanır.',
      },
      {
        question: 'PVC pencere montajı ne kadar sürer?',
        answer:
          'Standart bir daire için 1-2 gün içinde söküm ve montaj tamamlanır. Büyük projelerde süre ölçü sonrası belirlenir.',
      },
    ],
    productHref: '/urunler?kategori=pencere-ve-kapi-sistemleri',
    calculatorHref: '/fiyat-hesapla?seri=pvc_dograma',
    keywords: ['PVC pencere', 'pvc pencere değişimi', 'Winsa pencere', 'pvc kapı montajı', 'pencere yenileme'],
  },
  {
    id: 'panjur-kepenk-sineklik',
    slug: 'panjur-kepenk-sineklik',
    title: 'Panjur, Kepenk ve Plise Sineklik Sistemleri',
    subtitle: 'Motorlu Monoblok Panjur & Kedi Tüllü Sineklik',
    heroDescription:
      'Güneş kontrolü, fırtına koruması ve hırsızlık emniyeti sağlayan Winsa Winstor monoblok panjur, motorlu alüminyum kepenk ve evcil hayvan yırtmalarına dayanıklı çelik telli kedi sinekliği çözümleri.',
    image: '/images/services/panjur-kepenk-sineklik.jpg',
    warrantyBadge: '5 Yıl Otomasyon & Tül Garantisi',
    specBadge: '+%28 Ek Isı Tasarrufu • Patiye Dayanıklı',
    advantages: [
      'Winsa Winstor EPS yalıtımlı monoblok kutu ve dıştan takma alüminyum panjur',
      'Somfy / Becker uzaktan kumandalı motor, zamanlayıcı ve akıllı ev uyumu',
      'Standart tüle göre 7 kat dayanıklı, yırtılmaz çelik/polyester Kedi Sinekliği',
      'Cam balkon kanatlarıyla birlikte katlanan güneşi %80 kesen içten Plise Perde',
    ],
    technicalSpecs: [
      { label: 'Panjur', value: 'Winsa Winstor EPS Yalıtımlı Monoblok' },
      { label: 'Motor', value: 'Somfy / Becker Uzaktan Kumandalı' },
      { label: 'Sineklik', value: 'Çelik/Polyester Kedi Sinekliği, 7× Dayanıklı' },
      { label: 'Plise Perde', value: 'Cam Balkon Uyumlu, %80 Güneş Kesme' },
      { label: 'Ek Yalıtım', value: '+%28 Ek Isı Tasarrufu' },
      { label: 'Garanti', value: '5 Yıl Otomasyon & Tül Garantisi' },
    ],
    usageAreas: ['Giriş & Bahçe Kat Güvenliği', 'Evcil Hayvanlı Daireler', 'Yatak Odası Tam Karartma'],
    description:
      'Çelikpen panjur, kepenk ve plise sineklik sistemleri, Winsa Winstor EPS yalıtımlı monoblok panjur, Somfy/Becker motorlu alüminyum kepenk ve çelik/polyester kedi sinekliği ile güneş kontrolü, fırtına koruması ve evcil hayvan güvenliği sağlar. Cam balkon kanatlarıyla uyumlu plise perde sistemiyle güneşi %80 keser.',
    faqs: [
      {
        question: 'Kedi sinekliği normal sineklikten ne farkı var?',
        answer:
          'Kedi sinekliği çelik/polyester örgüden üretilir ve standart tüle göre 7 kat daha dayanıklıdır; evcil hayvan yırtmalarına karşı güvenlidir.',
      },
      {
        question: 'Monoblok panjur ne kadar ısı tasarrufu sağlar?',
        answer:
          'EPS yalıtımlı Winstor monoblok panjur, pencere ısı yalıtımına ek olarak %28 tasarruf sağlar.',
      },
      {
        question: 'Panjur uzaktan kumandayla çalışır mı?',
        answer:
          'Evet, Somfy veya Becker motor ile uzaktan kumanda, zamanlayıcı ve akıllı ev sistemleriyle kontrol edilir.',
      },
    ],
    productHref: '/urunler/winstor-monoblok-panjur',
    calculatorHref: '/fiyat-hesapla',
    keywords: ['panjur', 'monoblok panjur', 'kedi sinekliği', 'plise sineklik', 'kepenk sistemleri'],
  },
];

const SLUG_ALIAS_MAP: Record<string, string> = {
  'katlanir-cam-balkon': 'katlanir-cam-balkon',
  'katlanir-cam-balkon-sistemleri': 'katlanir-cam-balkon',
  'isicamli-cam-balkon': 'isicamli-cam-balkon',
  'isicamli-cam-balkon-sistemleri': 'isicamli-cam-balkon',
  'surme-cam-balkon': 'surme-cam-balkon',
  'surme-cam-balkon-sistemleri': 'surme-cam-balkon',
  'giyotin-cam-sistemleri': 'giyotin-cam-sistemleri',
  'motorlu-giyotin-cam-sistemleri': 'giyotin-cam-sistemleri',
  'kis-bahcesi-sistemleri': 'kis-bahcesi-sistemleri',
  'bioklimatik-pergola': 'bioklimatik-pergola',
  'bioklimatik-pergola-tente-sistemleri': 'bioklimatik-pergola',
  'pvc-pencere-kapi': 'pvc-pencere-kapi',
  'pvc-pencere-kapi-sistemleri': 'pvc-pencere-kapi',
  'pvc-pencere-kapi-montaj-yenileme': 'pvc-pencere-kapi',
  'panjur-kepenk-sineklik': 'panjur-kepenk-sineklik',
  'panjur-kepenk-plise-sineklik-sistemleri': 'panjur-kepenk-sineklik',
};

function findService(slug: string): ServiceDetail | undefined {
  const canonicalSlug = SLUG_ALIAS_MAP[slug];
  if (!canonicalSlug) return undefined;
  return SERVICE_DETAILS.find((s) => s.slug === canonicalSlug);
}

export function generateStaticParams() {
  const allSlugs = Array.from(
    new Set([
      ...SEO_SERVICE_PAGES.map((s) => s.slug),
      ...Object.keys(SLUG_ALIAS_MAP),
    ])
  );
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seoService = getSeoServiceBySlug(slug);
  if (seoService) {
    return generatePageMetadata({
      title: seoService.metaTitle,
      description: seoService.metaDescription,
      path: `/hizmetlerimiz/${seoService.slug}`,
      keywords: seoService.keywords,
      image: seoService.heroImage,
      imageAlt: seoService.heroImageAlt,
    });
  }

  const service = findService(slug);
  if (!service) return {};

  return generatePageMetadata({
    title: `${service.title} | ${SITE_CONFIG.brandName}`,
    description: service.heroDescription,
    path: `/hizmetlerimiz/${slug}`,
    keywords: service.keywords,
    image: service.image,
    imageAlt: `${service.title} — Çelikpen uygulama fotoğrafı`,
  });
}

function SeoAuthorityServicePage({ seoService }: { seoService: SeoServicePageData }) {
  const youtubeId = extractYouTubeId(seoService.videoUrl);
  const whatsappMessage = encodeURIComponent(
    `Merhaba, ${seoService.name} ve 2026 m² fiyatları hakkında ücretsiz keşif & teklif almak istiyorum.`
  );
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Anasayfa', path: '/' },
    { name: 'Hizmetlerimiz', path: '/hizmetlerimiz' },
    { name: seoService.name, path: `/hizmetlerimiz/${seoService.slug}` },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: seoService.h1,
    description: seoService.metaDescription,
    path: `/hizmetlerimiz/${seoService.slug}`,
    type: 'WebPage',
  });

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.siteUrl}/hizmetlerimiz/${seoService.slug}#service`,
    name: seoService.name,
    serviceType: seoService.name,
    description: seoService.metaDescription,
    image: `${SITE_CONFIG.siteUrl}${seoService.heroImage}`,
    url: `${SITE_CONFIG.siteUrl}/hizmetlerimiz/${seoService.slug}`,
    areaServed: SEO_DISTRICT_PAGES.map((d) => ({
      '@type': 'AdministrativeArea',
      name: `${d.districtName}, İstanbul`,
    })),
    provider: {
      '@type': 'LocalBusiness',
      name: `${SITE_CONFIG.brandName} Cam Balkon & Mimari Sistemler`,
      telephone: SITE_CONFIG.phoneRaw,
      email: 'iletisim@celikpen.com.tr',
      hasMap: EXACT_GOOGLE_MAPS_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kocasinan Merkez Mah. Kızılelma Cad. No: 30/C',
        addressLocality: 'Bahçelievler',
        addressRegion: 'İstanbul',
        postalCode: '34186',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: EXACT_COORDINATES.latitude,
        longitude: EXACT_COORDINATES.longitude,
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seoService.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const otherServices = SEO_SERVICE_PAGES.filter((s) => s.slug !== seoService.slug);

  return (
    <main className="bg-[#F8FAFC] pb-20">
      <JsonLd data={webPageSchema} id={`seo-${seoService.slug}-webpage`} />
      <JsonLd data={breadcrumbSchema} id={`seo-${seoService.slug}-breadcrumb`} />
      <JsonLd data={serviceSchema} id={`seo-${seoService.slug}-service`} />
      <JsonLd data={faqSchema} id={`seo-${seoService.slug}-faq`} />

      {/* ==================== #1E3A8A HERO ==================== */}
      <section className="relative overflow-hidden bg-[#1E3A8A] pt-10 pb-14 text-white sm:pt-14 sm:pb-18">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(191,219,254,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(191,219,254,0.22) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
          aria-hidden="true"
        />

        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] text-blue-200">
            <Link href="/" className="transition-colors hover:text-white">
              Anasayfa
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/hizmetlerimiz" className="transition-colors hover:text-white">
              Hizmetlerimiz
            </Link>
            <span aria-hidden="true">›</span>
            <span className="font-semibold text-white">{seoService.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                30 Yıllık Fabrika Üretimi • İstanbul Avrupa Yakası
              </div>

              <h1 className="mt-4 text-3xl font-black leading-[1.14] tracking-tight sm:text-4xl lg:text-[42px]">
                {seoService.h1}
              </h1>

              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-blue-100/95">
                {seoService.heroSubtitle}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/iletisim?form=kesif"
                  className="inline-flex items-center justify-center rounded-xl bg-[#D91B24] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#b5161e]"
                >
                  Ücretsiz Keşif İste
                </Link>
                <Link
                  href={seoService.calculatorHref}
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  2026 m² Fiyat Hesapla
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
                <Image
                  src={seoService.heroImage}
                  alt={seoService.heroImageAlt}
                  title={seoService.heroImageTitle}
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2-COLUMN AUTHORITY BODY ==================== */}
      <section className="container-shell pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN: AI Summary + H2/H3 Authority Content + Specs + Conditional Video */}
          <div className="space-y-10 lg:col-span-8">
            {/* Concise AI-Search Summary Box (~45 words) */}
            <div className="rounded-2xl border border-blue-200 bg-[#EFF6FF] p-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#1E3A8A]">
                Hızlı Teknik Özet
              </p>
              <p className="mt-2 text-[14px] leading-7 text-slate-800">
                {seoService.aiSummary}
              </p>
            </div>

            {/* Crisp H2 / H3 Keyword & Technical Definitions */}
            {seoService.sections.map((section) => (
              <article key={section.heading} className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-[14.5px] leading-7 text-slate-700">
                    {p}
                  </p>
                ))}
                {section.subSections && section.subSections.length > 0 && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {section.subSections.map((sub) => (
                      <div
                        key={sub.heading}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                      >
                        <h3 className="text-[15px] font-bold text-[#0F172A]">{sub.heading}</h3>
                        <p className="mt-2 text-[13.5px] leading-6 text-slate-600">{sub.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}

            {/* Technical Specifications Table */}
            <div>
              <h2 className="text-xl font-black tracking-tight text-[#0F172A]">
                {seoService.name} Teknik Özellikleri
              </h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-[13.5px]">
                  <tbody>
                    {seoService.specs.map((spec, idx) => (
                      <tr key={spec.label} className={idx % 2 === 0 ? 'bg-slate-50/80' : 'bg-white'}>
                        <th className="w-2/5 px-5 py-3.5 font-bold text-[#0F172A]">{spec.label}</th>
                        <td className="px-5 py-3.5 text-slate-700">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conditional Video SEO Slot (Renders NOTHING & 0 KB JS when videoUrl is empty) */}
            {youtubeId ? (
              <LiteYouTubeEmbed
                video={{
                  videoId: youtubeId,
                  title: seoService.videoTitle || seoService.h1,
                  description: seoService.videoDescription || seoService.metaDescription,
                  durationIso: 'PT1M30S',
                  durationDisplay: '01:30',
                  uploadDate: '2026-01-15',
                  posterImage: seoService.heroImage,
                  brandBadge: 'Çelikpen Video Rehber',
                  highlights: seoService.specs.slice(0, 3).map((s) => `${s.label}: ${s.value}`),
                }}
              />
            ) : null}
          </div>

          {/* RIGHT STICKY COLUMN: Compact 2026 m² Price Table + Calculator + WhatsApp */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-black text-[#0F172A]">2026 m² Fiyat Tablosu</h2>
                <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 text-[10.5px] font-bold text-[#1E3A8A]">
                  Güncel 2026
                </span>
              </div>

              <div className="mt-4 divide-y divide-slate-100">
                {seoService.priceRows.map((row) => (
                  <div key={row.system} className="py-3 first:pt-1 last:pb-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[13px] font-bold text-[#0F172A]">{row.system}</p>
                      <p className="shrink-0 text-[13px] font-extrabold text-[#1E3A8A]">
                        {row.priceRange2026}
                      </p>
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-slate-500">{row.spec}</p>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                * Fiyatlar 2026 İstanbul Avrupa Yakası referans m² aralıklarıdır. Net tutar ücretsiz
                lazerli keşif sonrası belirlenir.
              </p>

              <div className="mt-5 space-y-2.5">
                <Link
                  href={seoService.calculatorHref}
                  className="flex w-full items-center justify-center rounded-xl bg-[#1E3A8A] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1D4ED8]"
                >
                  Online m² Fiyat Hesapla
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1fb855]"
                >
                  WhatsApp ile Hızlı Teklif Al
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-[#0F172A] transition hover:bg-slate-100"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                Diğer Hizmet &amp; Fiyat Rehberlerimiz
              </h3>
              <ul className="mt-3 space-y-2">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/hizmetlerimiz/${s.slug}`}
                      className="block text-[13px] font-semibold text-slate-700 transition hover:text-[#1E3A8A]"
                    >
                      → {s.footerLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ==================== EXPANDABLE FAQ ACCORDION ==================== */}
      <section className="container-shell pt-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
            {seoService.name} — Sıkça Sorulan Sorular
          </h2>
          <div className="mt-6 space-y-3">
            {seoService.faqs.map((faq, idx) => (
              <details
                key={faq.question}
                open={idx === 0}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14.5px] font-bold text-[#0F172A]">
                  <span>{faq.question}</span>
                  <span className="shrink-0 text-lg font-bold text-[#1E3A8A] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-slate-100 pt-3 text-[13.5px] leading-6 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LIVE GOOGLE 4.9★ REVIEW STRIP ==================== */}
      <section className="container-shell pt-12">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-[#0F172A]">4.9 / 5.0</span>
              <span className="text-amber-500" aria-label="5 üzerinden 4.9 yıldız">
                ★★★★★
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Google İşletme Profili (11 Doğrulanmış Değerlendirme)
              </span>
            </div>
            <p className="mt-1 text-[13px] text-slate-600">
              Bahçelievler Kocasinan Merkez fabrikamız ve Avrupa Yakası montaj ekibimiz için
              doğrulanmış müşteri yorumlarını Google Haritalar’da görüntüleyin.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={EXACT_READ_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-[#0F172A] transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
            >
              Google Yorumlarını Oku ↗
            </a>
            <a
              href={EXACT_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
            >
              Google’da Yorum Bırak ↗
            </a>
          </div>
        </div>
      </section>

      {/* ==================== CROSS-LINKS TO ALL 12 EUROPEAN SIDE DISTRICTS ==================== */}
      <section className="container-shell pt-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-black tracking-tight text-[#0F172A]">
            İstanbul Avrupa Yakası Hizmet Verdiğimiz 12 Bölge
          </h2>
          <p className="mt-1 text-[13px] text-slate-600">
            {seoService.name} için aynı gün ücretsiz lazerli keşif sunduğumuz ilçe rehberleri:
          </p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {SEO_DISTRICT_PAGES.map((district) => (
              <Link
                key={district.slug}
                href={`/bolgeler/${district.slug}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-[13px] font-semibold text-slate-800 transition hover:border-[#1E3A8A] hover:bg-[#EFF6FF] hover:text-[#1E3A8A]"
              >
                <span>{district.footerLabel}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function HizmetDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const seoService = getSeoServiceBySlug(slug);
  if (seoService) {
    return <SeoAuthorityServicePage seoService={seoService} />;
  }

  const service = findService(slug);
  if (!service) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetlerimiz', path: '/hizmetlerimiz' },
    { name: service.title, path: `/hizmetlerimiz/${slug}` },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: service.title,
    description: service.heroDescription,
    path: `/hizmetlerimiz/${slug}`,
    type: 'WebPage',
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const whatsappMessage = encodeURIComponent(
    `Merhaba, ${service.title} hakkında bilgi almak istiyorum.`
  );
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="bg-[#F8FAFC] pb-20">
      <JsonLd data={webPageSchema} id={`${service.id}-webpage-jsonld`} />
      <JsonLd data={breadcrumbSchema} id={`${service.id}-breadcrumb-jsonld`} />
      <JsonLd data={faqSchema} id={`${service.id}-faq-jsonld`} />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-[#0F172A] pt-10 pb-16 text-white sm:pt-14 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,197,253,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.15) 1px, transparent 1px)',
            backgroundSize: '58px 58px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#1E3A8A] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#D91B24]/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-shell relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10.5px] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">
              Anasayfa
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/hizmetlerimiz" className="transition-colors hover:text-white">
              Hizmetlerimiz
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-sky-200">{service.title}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D91B24]" aria-hidden="true" />
                Çelikpen Mimari Uygulama Merkezi
              </div>
              <h1 className="mt-4 max-w-2xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[44px]">
                {service.title}
              </h1>
              <p className="mt-2 text-base font-semibold text-sky-300">{service.subtitle}</p>
              <p className="mt-4 max-w-xl text-[13px] leading-6 text-slate-300">
                {service.heroDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300">
                  {service.warrantyBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-[11px] font-bold text-sky-300">
                  {service.specBadge}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D91B24] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#b5161e]"
                >
                  Ücretsiz Keşif İste
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fb855]"
                >
                  WhatsApp ile Fiyat Al
                </a>
                <Link
                  href={service.calculatorHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  m² Fiyat Hesapla
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={service.image}
                alt={`${service.title} — Çelikpen uygulama fotoğrafı`}
                title={service.title}
                width={800}
                height={600}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DETAILED DESCRIPTION ==================== */}
      <section className="container-shell pt-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
            {service.title} Hakkında
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-slate-700">{service.description}</p>
        </div>
      </section>

      {/* ==================== ADVANTAGES ==================== */}
      <section className="container-shell pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-black tracking-tight text-[#0F172A] sm:text-2xl">
            Teknik Avantajlar
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.advantages.map((adv, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A] text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[13px] leading-relaxed text-slate-700">{adv}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==================== TECHNICAL SPECS ==================== */}
      <section className="container-shell pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-black tracking-tight text-[#0F172A] sm:text-2xl">
            Teknik Özellikler
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-[13px]">
              <tbody>
                {service.technicalSpecs.map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-5 py-3 font-bold text-[#0F172A]">{spec.label}</td>
                    <td className="px-5 py-3 text-slate-600">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==================== USAGE AREAS ==================== */}
      <section className="container-shell pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-black tracking-tight text-[#0F172A] sm:text-2xl">
            Kullanım Alanları
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {service.usageAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-2 text-[12px] font-semibold text-[#1E3A8A]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="container-shell pt-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-black tracking-tight text-[#0F172A] sm:text-2xl">
            Sıkça Sorulan Sorular
          </h2>
          <dl className="mt-6 space-y-4">
            {service.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <dt className="text-[14px] font-bold text-[#0F172A]">{faq.question}</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="container-shell pt-14">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#0F172A] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            {service.title} için Ücretsiz Keşif
          </h2>
          <p className="mt-3 text-[13px] text-slate-300">
            Uzman teknik ekibimiz adresinize gelir, lazer metre ile milimetrik ölçü alır ve size
            özel proje + net bütçe sunar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D91B24] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#b5161e]"
            >
              Ücretsiz Keşif İste
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1fb855]"
            >
              WhatsApp ile Fiyat Al
            </a>
            <Link
              href={service.calculatorHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              m² Fiyat Hesapla
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
