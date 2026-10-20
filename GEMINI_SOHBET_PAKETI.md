# ÇELİKPEN CAM BALKON & MİMARİ CAM SİSTEMLERİ — PROJE ÖZETİ VE BAĞLAM PAKETİ (GEMINI SOHBET AKTARIMI)

> **Kullanım Notu:** Bu dosyayı `gemini.google.com` üzerindeki yeni bir sohbete doğrudan yükleyebilir (veya kopyalayıp yapıştırabilirsiniz). Bu belge, Gemini'nin Çelikpen projesinin tüm mimarisini, sayfalarını, fiyat algoritmasını ve tasarım kararlarını tek seferde anlaması için hazırlanmıştır.

---

## 1. PROJE KİMLİĞİ VE AMACI
- **Marka:** Çelikpen Cam Balkon & Mimari Cam Sistemleri
- **Merkez / Atölye:** Kocasinan Merkez Mah. Mahmutbey Cad. No: 345, 34186 Bahçelievler / İstanbul
- **Hedef:** İstanbul Bahçelievler (ve 11 mahallesi) odaklı, yüksek dönüşüm oranına (CRO) ve hiper-yerel SEO'ya sahip kurumsal web platformu.
- **Teknoloji Yığını:**
  - **Framework:** Next.js 15.1.0 (App Router, Static Site Generation - SSG & React Server Components ağırlıklı)
  - **UI / Dil:** React 19, TypeScript (Strict Mode), Tailwind CSS 3.4
  - **Performans Hedefi:** LCP < 0.8s, CLS = 0, INP < 100ms

---

## 2. TASARIM DİLİ VE RENK SİSTEMİ (WİNSA TARZI AYDINLIK KURUMSAL TEMA)
`tailwind.config.ts` üzerinde tanımlı kurumsal renk paleti:
- **`celikpen-brand` (`#0B3B60`):** Ana Kurumsal Lacivert (Üst bar, kurumsal rozetler, başlık vurguları)
- **`celikpen-brand-soft` (`#1E6BAF`):** Kurumsal Açık Mavi (Linkler, ikon vurguları, seri kodları)
- **`celikpen-cta` (`#EA580C`):** Keşif & Dönüşüm Turuncusu (Ana aksiyon butonları, fiyat vurguları)
- **`celikpen-glass` (`#0284C7`):** Mimari Cam Mavisi
- **`celikpen-surface` (`#FFFFFF`):** Ana Beyaz Arka Plan
- **`celikpen-subtle` (`#F8FAFC`):** Bölüm Ayırıcı Açık Gri Zemin
- **`celikpen-border` (`#E5E7EB`):** Kart ve Tablo Kenarlıkları

---

## 3. ÜRÜN SERİLERİ VE 2026 NET m² BİRİM FİYAT MOTORU (`src/config/pricing.config.ts`)
Tüm fiyat hesaplamaları tek doğruluk kaynağından (`CELIKPEN_PRICING_CONFIG`) beslenir:

| Seri Kodu | Sistem Adı | Cam Özelliği | Isı / Ses Yalıtımı | Net m² Fiyatı |
| :--- | :--- | :--- | :--- | :--- |
| **VNS-80** | VNS Serisi Katlanır Cam Balkon | 8mm veya 10mm Temperli Tek Cam | %35 Isı / -24 dB Ses | **3.500 ₺ / m²** |
| **VBS-ISI** | VBS Serisi Isıcamlı Cam Balkon | 4+20+4 (28mm) Argon Gazlı Sinerji/Konfor Çift Cam | %65 Isı / -38 dB Ses | **4.950 ₺ / m²** |
| **VDS-SUR** | VDS Serisi Eşiksiz Sürme Sistem | 8mm Temperli Tek Cam veya 4+12+4 Isıcam | %40 Isı / -26 dB Ses | **3.950 ₺ / m²** |
| **GIY-MOT** | Kumandalı Motorlu Giyotin (Silinebilir) | 4+16+4 Temperli Isıcam + Somfy/Becker Tup Motor | %60 Isı / -36 dB Ses | **6.400 ₺ / m²** |
| **KIS-BIO** | Kış Bahçesi & Bioklimatik Tavan | Lamine + Temperli Güvenlikli Çift Cam Çatı | %70 Isı / -40 dB Ses | **7.900 ₺ / m²** |

### Hesaplama Kuralları (`calculateBalconyQuote`):
- **Minimum Faturalandırılabilir Yükseklik:** `1.80 m` (Yükseklik 1.80m'nin altındaysa 1.80m baz alınır).
- **Minimum Faturalandırılabilir Alan:** `3.50 m²`.
- **Balkon Geometrileri:**
  - `duz` (Düz Balkon - Tek Cephe)
  - `l_balkon` (L Tipi Köşe Balkon - +1 adet 90° köşe dönüş profili: `1.250 ₺`)
  - `u_balkon` (U Tipi Balkon - +2 adet 90° köşe dönüş profili: `2 x 1.250 ₺ = 2.500 ₺`)
- **Cam Rengi Çarpanları:** Şeffaf (`1.0x`), Füme (`1.06x`), Bronz (`1.06x`), Alt %40 Kumlama Buzlu (`1.08x`).
- **Profil Rengi Çarpanları:** Antrasit Gri RAL 7016 (`1.0x`), Mat Siyah RAL 9005 (`1.0x`), Pres Beyaz RAL 9016 (`0.97x`), Ahşap Desen (`1.12x`).
- **Opsiyonel Ek Donanımlar:**
  - Yırtılmaz Çelik Telli Kedi Sinekliği: `+650 ₺ / m²`
  - İçten Cam Üstü Plise Perde: `+550 ₺ / m²`
  - 5+ Daire Toplu Bina / Apartman Kararı İndirimi: `%15 İndirim`

---

## 4. SAYFA MİMARİSİ VE ROTALAR (`src/app/`)
1. **`/` (`src/app/page.tsx`) — Ana Sayfa:**
   - `HeroSlider`: 3 slaytlı Winsa tarzı kurumsal vitrin
   - `TrustStrip`: 4 kurumsal güvence rozeti (Kocasinan Fabrika, TSE EN 12150, 10 Yıl Garanti, Yargıtay 4/5 Uyum)
   - `PriceCalculator`: 4 adımlı interaktif m² hesaplayıcı + Canlı SVG Balkon Kesiti + Hazır WhatsApp Teklif Mesajı
   - Net m² Birim Fiyat Tablosu
   - 5 Ana Ürün Serisi Kartları + `VideoFacade` (Lazy YouTube oynatıcı)
   - `ComparisonTeaser` & `ProcessStrip` (4 Adımda Kurulum)
   - Bahçelievler 11 Mahalle Hiper-Yerel SEO Matrisi
   - Müşteri Yorumları Özeti, SSS (FAQ) ve `CtaBand`
2. **`/fiyat-hesapla` (`src/app/fiyat-hesapla/page.tsx`):** Bağımsız tam ekran interaktif fiyat hesaplama sayfası.
3. **`/sistemler/[seri]` (`src/app/sistemler/[seri]/page.tsx`):** 5 ürün serisi için dinamik teknik detay, profil kesit özellikleri, seri SSS ve o seriye özel ön-seçili fiyat hesaplayıcı.
4. **`/bahcelievler/[mahalle]` (`src/app/bahcelievler/[mahalle]/page.tsx`):** Bahçelievler'in 11 mahallesi (*Kocasinan Merkez, Soğanlı, Siyavuşpaşa, Şirinevler, Bahçelievler Merkez, Çobançeşme, Zafer, Yayla, Yenibosna Merkez, Cumhuriyet, Fevzi Çakmak / Hürriyet*) için özel mimari yapı analizi, rüzgar/gürültü profili ve mahalle bazlı fiyat hesaplayıcı.
5. **`/karsilastir` (`src/app/karsilastir/page.tsx`):** 5 cam balkon serisinin teknik ve maliyet açısından yan yana karşılaştırma matrisi.
6. **`/galeri` (`src/app/galeri/page.tsx` & `src/components/GalleryGrid.tsx`):** Mahalle ve sistem serisine göre filtrelenebilir gerçek montaj galerisi.
7. **`/yorumlar` (`src/app/yorumlar/page.tsx`):** Doğrulanmış Bahçelievler müşteri deneyimleri ve puanlamaları.
8. **`/nasil-calisiriz` (`src/app/nasil-calisiriz/page.tsx`):** Ücretsiz lazerli keşiften 3D projelendirme, Kocasinan CNC üretim ve EPDM contalı montaja kadar 4 adımlı süreç.
9. **`/hakkimizda` (`src/app/hakkimizda/page.tsx`):** Kocasinan Merkez üretim tesisi, kalite belgeleri ve kurumsal hikaye.
10. **`/iletisim` (`src/app/iletisim/page.tsx` & `src/components/ContactForm.tsx`):** Hızlı keşif randevu formu (WhatsApp entegreli) ve Kocasinan fabrika iletişim bilgileri.
11. **`/blog` ve `/blog/eylul-2026-yargitay-cam-balkon-karari`:** Hukuki rehber ve **İnteraktif 4/5 (%80) Kat Maliki Muvafakatname Formu Üretici** (`src/components/MuvafakatnameForm.tsx` — `window.print()` ile resmi PDF tutanak çıktısı verir).

---

## 5. SEO VE YAPISAL VERİ KATMANI
- **`src/components/SeoSchema.tsx`:** `HomeAndConstructionBusiness`, `Product` + `AggregateOffer` ve `FAQPage` olmak üzere 3 katmanlı JSON-LD şeması.
- **`src/app/sitemap.ts` & `src/app/robots.ts`:** Tüm statik sayfaları, 5 ürün serisini, 11 mahalleyi ve blog yazılarını içeren otomatik XML site haritası.

---

## 6. GEMINI İLE BU SOHBETTE NELER KONUŞABİLİRİZ?
Bu bağlam üzerinden şu konularda beyin fırtınası yapabilir veya geliştirme kararları alabiliriz:
1. **Dönüşüm Optimizasyonu (CRO):** Fiyat hesaplayıcıdan WhatsApp'a geçiş oranını artıracak yeni mikro-etkileşimler.
2. **Yerel SEO & İçerik Stratejisi:** Bahçelievler mahalle sayfaları ve blog için yeni içerik fikirleri.
3. **Görsel ve Medya Üretimi:** Eksik ürün/mahalle görselleri için prompt tasarımı veya gerçek şantiye fotoğraflarının entegrasyonu.
4. **Canlıya Alma (Deployment) & Analitik:** Vercel / özel sunucu kurulumu, Google Analytics 4 (GA4), Google Ads dönüşüm takibi ve Search Console doğrulaması.
5. **Site İçi Yapay Zeka (Gemini API):** Müşterilerin doğal dille balkon ölçüsü/mahalle yazıp teklif alabileceği canlı AI asistan entegrasyonu.
