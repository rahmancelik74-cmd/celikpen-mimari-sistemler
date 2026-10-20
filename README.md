# Çelikpen Cam Balkon (Kocasinan / Bahçelievler) — Antigravity CLI Başlangıç Paketi

Bu paket, **Çelikpen Cam Balkon (Kocasinan Merkez Mah., Bahçelievler)** için Google Antigravity CLI (`agy`) üzerinde doğrudan geliştirmeye başlayabileceğiniz **Next.js App Router + TypeScript + Tailwind CSS** proje iskeletini içerir.

## İçindekiler
- `GEMINI.md`: Antigravity CLI ajanının otomatik okuduğu ana mimari, Core Web Vitals ve tasarım kuralları.
- `.antigravity/rules/`: Performans (`01-core-web-vitals.md`), net birim fiyat hesaplama motoru (`02-pricing-engine.md`) ve Bahçelievler yerel SEO / Eylül 2026 Yargıtay kararı (`03-local-seo-and-yargitay.md`) kuralları.
- `.antigravity/skills/cam-balkon-local-seo/SKILL.md`: Yeni mahalle ve ürün sayfaları üretmek için özel ajan becerisi.
- `ANTIGRAVITY_CLI_PROMPTS.md`: Faz 1, Faz 2, Faz 3 ve Faz 4 için kopyala-yapıştır Antigravity CLI komutları.
- `src/config/pricing.config.ts`: **Çelikpen Net Birim Fiyat Listesi** (Tek doğruluk kaynağı).
- `src/config/site.config.ts`: Kocasinan Merkez iletişim, garanti ve 7 ana Bahçelievler mahalle verisi.
- `src/components/PriceCalculator.tsx`: Düz/L/U balkon, cm bazlı m² hesabı, cam/profil simülasyonu ve tek tıkla WhatsApp teklif aktarım bileşeni.

## Hızlı Başlangıç (Antigravity CLI)
```bash
unzip celikpen_antigravity_starter.zip -d celikpen-web
cd celikpen-web
npm install
npm run test:pricing
agy
```
