# ANTIGRAVITY CLI (`agy`) İLE ÇALIŞMA KILAVUZU VE FAZ BAZLI KOMUTLAR

Projeyi bilgisayarınızda açtıktan sonra terminalde `agy` komutuyla Antigravity CLI oturumunu başlatabilir veya aşağıdaki tek satırlık/etkileşimli komutları doğrudan kopyalayıp kullanabilirsiniz.

## Kurulum ve İlk Çalıştırma
```bash
npm install
npm run test:pricing
npm run dev
```

## Antigravity CLI Güvenlik ve Sandbox Ayarı (`~/.gemini/antigravity-cli/settings.json`)
```json
{
  "toolPermission": "proceed-in-sandbox",
  "enableTerminalSandbox": true
}
```

---

## FAZ 1: Net Birim Fiyat Listesini ve Firma Bilgilerini Güncelleme
Kendi net birim fiyatlarınızı ` @src/config/pricing.config.ts ` dosyasına işlemek için Antigravity CLI içinde şu komutu verin:

```text
@src/config/pricing.config.ts ve @src/config/site.config.ts dosyalarını incele. Çelikpen Kocasinan için birim fiyatları şu şekilde güncelle:
- 8mm Katlanır Sistem (VNS-8): [NET_FIYAT] TL/m²
- 10mm Katlanır Sistem (VNS-10): [NET_FIYAT] TL/m²
- Isıcamlı 4+20+4 Argon Gazlı Sistem (VBS-Pro): [NET_FIYAT] TL/m²
- Eşiksiz Sürme Sistem (VDS-Slide): [NET_FIYAT] TL/m²
- Motorlu Giyotin Sistem (VGS-Auto): [NET_FIYAT] TL/m²
- Kedi Tüllü Sineklik: [NET_FIYAT] TL/adet
- Plise Perde: [NET_FIYAT] TL/m²
- Telefon / WhatsApp: [TELEFON_NUMARASI]
Ardından `npm run test:pricing` komutunu çalıştırarak hesaplama motorunu doğrula.
```

---

## FAZ 2: Mimari Ürün Serisi ve Görsel Simülatör Geliştirme
```text
/plan @src/components/PriceCalculator.tsx bileşenine 2D canlı balkon cephe önizleme (SVG tabanlı kanat sayısı, Antrasit/Mat Siyah/Ahşap profil rengi ve Şeffaf/Füme/Bronz/Alt %40 Buzlu cam görünümü) eklemek için uygulama planı çıkar. Onayımdan sonra kodu uygula ve `npm run build` ile test et.
```

---

## FAZ 3: Bahçelievler Hiper-Yerel Mahalle Sayfaları ve Kentsel Dönüşüm Kampanyası
```text
@src/app/bahcelievler/[mahalle]/page.tsx ve @src/config/site.config.ts dosyalarını kullanarak Kocasinan, Siyavuşpaşa, Soğanlı ve Şirinevler mahalle sayfalarına mahalle bazlı ses yalıtımı (Desibel tablosu), bitişik nizam mahremiyet camı önerisi ve 5+ daire toplu bina %15 kentsel dönüşüm indirimi modülünü ekle. JSON-LD LocalBusiness şemasını doğrula.
```

---

## FAZ 4: Eylül 2026 Yargıtay Kararı 4/5 Muvafakatname PDF/Yazdırılabilir Şablonu
```text
@src/app/blog/eylul-2026-yargitay-cam-balkon-karari/page.tsx sayfasına apartman yöneticilerinin ve daire sahiplerinin tarayıcıdan doğrudan doldurup yazdırabileceği (`window.print()` CSS destekli) resmi "Kat Mülkiyeti Kanunu Madde 19 Uyumlu 4/5 Kat Maliki Muvafakatname Formu" bileşeni ekle.
```

---

## Tek Satırlık Otomasyon Komutları (Non-Interactive CLI)
```bash
# Fiyat testlerini ve tip kontrolünü ajanla doğrula
agy -p "Run npm run test:pricing and npm run typecheck, fix any issues if found" --cwd $(pwd)

# SEO ve Schema denetimi yaptır
agy -p "Audit @src/components/SeoSchema.tsx against .antigravity/rules/03-local-seo-and-yargitay.md" --cwd $(pwd)
```
