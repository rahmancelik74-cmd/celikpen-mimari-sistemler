# ÇELİKPEN CAM BALKON & MİMARİ SİSTEMLER — KURUMSAL SSL / TLS 1.3 VE GÜVENLİK MİMARİSİ

Bu belge, **Çelikpen Cam Balkon (`celikpen.com.tr`)** web platformunda uygulanan **Winsa kurumsal standartlarındaki** uçtan uca HTTPS/SSL şifreleme, HSTS Preload ve HTTP güvenlik başlığı altyapısını açıklar.

---

## 1. Uygulama Katmanı Güvenliği (`src/middleware.ts` & `next.config.mjs`)

1. **Otomatik HTTPS Yönlendirmesi (308 Permanent Redirect):**
   - Üretim ortamında (`NODE_ENV === 'production'`) `x-forwarded-proto !== 'https'` olan tüm istekler kesintisiz olarak `https://celikpen.com.tr` adresine yönlendirilir.
2. **HSTS (HTTP Strict Transport Security) Preload:**
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` başlığı ile tarayıcılar 2 yıl boyunca yalnızca HTTPS üzerinden bağlantı kurmaya zorlanır.
3. **Saldırı Önleme Başlıkları:**
   - **Clickjacking Koruması:** `X-Frame-Options: SAMEORIGIN` ve CSP `frame-ancestors 'self'`
   - **MIME Sniffing Koruması:** `X-Content-Type-Options: nosniff`
   - **XSS & İçerik Güvenliği (CSP):** Yalnızca güvenilir kaynaklara (`self`, YouTube video facade, Google Fonts ve resmi WhatsApp API uç noktaları) izin veren sıkı `Content-Security-Policy`.
   - **Gizlilik ve İzin Politikası:** `Permissions-Policy: camera=(), microphone=(), geolocation=(self), interest-cohort=()`
   - **Sunucu İmzası Gizleme:** `poweredByHeader: false` ile `X-Powered-By: Next.js` başlığı kaldırılmıştır.

---

## 2. Yerel Geliştirme Ortamında HTTPS (`npm run dev:ssl`)

Yerel ortamda HTTPS (`https://localhost:3000`) üzerinde test yapmak için:

```bash
# 1. Yerel sertifikaları oluşturmak için (opsiyonel mkcert/openssl betiği):
bash scripts/setup-ssl.sh local

# 2. Next.js 15 yerleşik HTTPS geliştirme sunucusunu başlatmak için:
npm run dev:ssl
```

---

## 3. Üretim Sunucusu (Nginx + Let's Encrypt TLS 1.3) Kurulumu

Ubuntu/Debian tabanlı üretim sunucusunda A+ SSL Labs skoru sağlayan hazır kurulum:

```bash
sudo bash scripts/setup-ssl.sh production celikpen.com.tr info@celikpen.com.tr
```

### Aktif Edilen Kriptografik Standartlar:
- **Protokoller:** Yalnızca `TLSv1.2` ve `TLSv1.3` (Eski SSLv3, TLS 1.0 ve TLS 1.1 tamamen devre dışıdır).
- **Şifreleme Paketleri (Cipher Suites):** `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-GCM-SHA384`, `CHACHA20-POLY1305` (Forward Secrecy destekli).
- **OCSP Stapling:** Tarayıcıların sertifika geçerlilik kontrolünü hızlandırır ve LCP süresini iyileştirir.
- **Otomatik Yenileme:** `certbot.timer` systemd servisi ile 90 günlük sertifikalar kesintisiz yenilenir.
