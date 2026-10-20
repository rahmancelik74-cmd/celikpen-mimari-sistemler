# ÇELİKPEN CAM BALKON & MİMARİ CAM SİSTEMLERİ — ANTIGRAVITY WORKSPACE KURALLARI

Bu proje, **İstanbul Bahçelievler (Kocasinan Merkez Mahallesi)** merkezli **Çelikpen Cam Balkon** için geliştirilen, yüksek dönüşüm (CRO) ve hiper-yerel SEO odaklı **Next.js (App Router) + TypeScript + Tailwind CSS** web platformudur.
Antigravity CLI (`agy`) her oturum başlangıcında bu dosyayı ve `.antigravity/rules/` altındaki kuralları referans alır.

## 1. Mimari ve Teknoloji Standartları
- **Çekirdek Yığın**: Next.js 15 (App Router, Static Site Generation - SSG ağırlıklı), React 19, TypeScript (Strict Mode), Tailwind CSS 3.4, Lucide Icons.
- **Performans & Core Web Vitals Hedefi**:
  - **LCP (Largest Contentful Paint) < 0.8s**: Ana sayfada ağır jQuery slider/carousel KULLANILMAZ. Tek bir yüksek çözünürlüklü mimari görsel (`fetchPriority="high"`, `priority`) ve yanında interaktif **Canlı m² Fiyat Hesaplama Modülü** (`src/components/PriceCalculator.tsx`) yer alır.
  - **CLS (Cumulative Layout Shift) = 0**: Tüm görsellerde, kartlarda ve video kapaklarında (Video Facade) açık `width`/`height` veya `aspect-ratio` sınıfları zorunludur.
  - **INP < 100ms**: Fiyat hesaplama modülü dışında kalan tüm kurumsal bölümler, ürün serileri ve mahalle sayfaları **React Server Components (RSC)** olarak statik derlenir.
- **Tasarım ve Renk Sistemi**:
  - Ana Kurumsal Zemin: Antrasit & Mat Siyah (`#0F172A` / `slate-900` ve `#1E293B` / `slate-800`)
  - Mimari Cam Vurgusu: Kristal Mavi (`#0284C7` / `sky-600` ve `#38BDF8` / `sky-400`)
  - Dönüşüm / CTA Vurgusu: Keşif Turuncusu (`#EA580C` / `orange-600`) ve WhatsApp Yeşili (`#16A34A` / `green-600`)

## 2. Dizin Yapısı ve Tek Doğruluk Kaynağı (Single Source of Truth)
- `src/config/pricing.config.ts`: **Çelikpen Net Birim Fiyat Listesi**. Tüm m² fiyatları, profil rengi farkları, cam tipi çarpanları, kedi tüllü sineklik ve plise perde birim fiyatları YALNIZCA bu dosyadan okunur. Bileşenlerin içine sabit (hardcoded) fiyat yazılması yasaktır.
- `src/config/site.config.ts`: Çelikpen Kocasinan Merkez Mah. adres, telefon, WhatsApp hattı, çalışma saatleri, 5 ana ürün serisi (`VNS Katlanır`, `VBS Isıcamlı`, `VDS Eşiksiz Sürme`, `Giyotin Motorlu`, `Kış Bahçesi & Bioklimatik`) ve Bahçelievler 11 mahalle verisi.
- `src/components/PriceCalculator.tsx`: 4 adımlı interaktif m² ve bütçe hesaplayıcı + WhatsApp hazır teklif mesajı oluşturucu.
- `src/components/SeoSchema.tsx`: 3 katmanlı JSON-LD (`HomeAndConstructionBusiness`, `Product` + `AggregateOffer`, `FAQPage`).
- `src/components/VideoFacade.tsx`: Sayfa açılışını yavaşlatmayan, tıklanınca yüklenen (lazy iframe) ürün tanıtım video bileşeni.

## 3. Doğrulama Döngüsü (Verification Loop) & Sürekli Açık Geliştirme Sunucusu
- **Sürekli Açık Localhost Kuralı**: Geliştirme sunucusu (`npm run dev` — `http://localhost:3000`) her zaman arka planda (`IsDaemon: true`) açık tutulmalıdır. Oturum başında çalışmıyorsa derhal başlatılmalı ve işlemler sırasında kapatılmamalıdır.
- Her kod değişikliğinden sonra Antigravity CLI ajanının çalıştırması gereken doğrulama komutları:
1. Birim fiyat ve m² algoritma testi: `npm run test:pricing`
2. Tip kontrolü: `npm run typecheck`
3. Üretim derlemesi kontrolü (yalnızca talep edildiğinde veya dev sunucusu kesintiye uğratılmadan): `npm run build`

## 4. Yasaklı Desenler (Anti-Patterns)
- Hero alanında otomatik dönen ağır JS slider/carousel kütüphaneleri (`swiper`, `slick-carousel` vb.) eklemeyin.
- YouTube/Vimeo `<iframe>` etiketlerini sayfa yüklenirken doğrudan DOM'a basmayın; her zaman `VideoFacade.tsx` bileşenini kullanın.
- Görsel dosya adlarında rastgele isimler (`img1.jpg`) yerine yerel SEO uyumlu isimler (`kocasinan-isicamli-cam-balkon.webp`, `siyavuspasa-katlanir-cam-uygulamasi.webp`) kullanın.
