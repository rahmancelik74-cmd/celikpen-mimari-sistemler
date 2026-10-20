---
name: pricing-engine
description: Çelikpen net birim fiyat listesi ve m² hesaplama motoru kuralları
---
# Canlı m² Fiyat Hesaplama Motoru Kuralları

1. **Tek Merkezli Fiyat Yönetimi**: Tüm birim fiyatlar `src/config/pricing.config.ts` içerisindeki `CELIKPEN_PRICING_CONFIG` nesnesinden beslenir.
2. **Balkon Geometrisi Hesabı**:
   - `duz` (Düz Balkon - 1 Cephe): `Toplam En (m) = cephe1Cm / 100`
   - `l_tipi` (L Balkon - 2 Cephe): `Toplam En (m) = (cephe1Cm + cephe2Cm) / 100`
   - `u_tipi` (U Balkon - 3 Cephe): `Toplam En (m) = (cephe1Cm + cephe2Cm + cephe3Cm) / 100`
   - `Toplam Alan (m²) = Toplam En (m) * (yukseklikCm / 100)` (Minimum faturalandırma alanı: `minBillableAreaM2`, varsayılan `3.5 m²`).
3. **Maliyet Kalemleri**:
   - Sistem baz m² fiyatı (`basePricePerM2`)
   - Cam rengi/tipi m² farkı (`glassOptions[selectedGlass].extraPerM2`)
   - Profil rengi çarpanı veya m² farkı (`profileOptions[selectedProfile].multiplier`)
   - Çapraz satış (Cross-Sell) ekleri: Kedi Tüllü Sineklik (adet/m² bazlı) ve Plise Perde (m² bazlı).
4. **WhatsApp Dönüşüm Hunisi**: Hesaplama sonunda oluşan tüm teknik detaylar (`Balkon Tipi`, `Net m²`, `Seçilen Sistem`, `Cam/Profil Rengi`, `Ek Donanım`, `Net Teklif Tutarı`) URL-encoded olarak Çelikpen WhatsApp keşif hattına aktarılır.
