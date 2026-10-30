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
  return Object.keys(SLUG_ALIAS_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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

export default async function HizmetDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
