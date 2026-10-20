---
name: cam-balkon-local-seo
description: Yeni bir Bahçelievler mahalle sayfası veya ürün serisi sayfası oluştururken yerel SEO, JSON-LD şeması ve dönüşüm bileşenlerini otomatik kurgular.
---
# Çelikpen Mahalle ve Ürün Sayfası Oluşturma Becerisi

Yeni bir mahalle veya ürün sayfası istendiğinde şu adımları uygula:
1. `src/config/site.config.ts` içindeki `NEIGHBORHOODS` veya `PRODUCT_SERIES` dizisini kontrol et.
2. Sayfada mahallenin mimari dokusuna özel sorun/çözüm eşleşmesini kullan:
   - **Şirinevler / Yenibosna / Çobançeşme**: E-5 ve Metrobüs gürültüsüne karşı 4+20+4 Argon Gazlı Isıcamlı (VBS) desibel izolasyonu.
   - **Soğanlı / Hürriyet / Zafer**: Bitişik nizam binalarda mahremiyet sağlayan Alt %40 Buzlu (Frosted) + Üst Şeffaf veya Füme/Bronz cam seçeneği ve kentsel dönüşüm toplu bina (%15) indirimi.
   - **Kocasinan / Siyavuşpaşa / Bahçelievler Merkez**: Üretim atölyesinden aynı gün ücretsiz lazerli keşif ve 2026 Yargıtay 4/5 muvafakatname dosyası desteği.
3. Sayfaya `SeoSchema` ve `PriceCalculator` bileşenlerini entegre et.
