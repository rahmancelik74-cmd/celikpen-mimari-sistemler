#!/usr/bin/env bash
# ==============================================================================
# ÇELİKPEN CAM BALKON & MİMARİ SİSTEMLER (celikpen.com.tr)
# KURUMSAL SSL / TLS 1.3 & NGINX GÜVENLİK OTOMASYON BETİĞİ
# ==============================================================================
# Kullanım:
#   Yerel HTTPS Geliştirme Sertifikası (mkcert):
#     bash scripts/setup-ssl.sh local
#
#   Üretim Let's Encrypt SSL + Nginx Reverse Proxy (Ubuntu/Debian):
#     sudo bash scripts/setup-ssl.sh production celikpen.com.tr info@celikpen.com.tr
# ==============================================================================

set -euo pipefail

MODE="${1:-local}"
DOMAIN="${2:-celikpen.com.tr}"
EMAIL="${3:-info@celikpen.com.tr}"
CERT_DIR="./certificates"

if [[ "$MODE" == "local" ]]; then
  echo "🔒 [Çelikpen SSL] Yerel geliştirme ortamı için güvenilir HTTPS sertifikası hazırlanıyor..."
  mkdir -p "$CERT_DIR"

  if command -v mkcert >/dev/null 2>&1; then
    mkcert -install
    mkcert -key-file "$CERT_DIR/localhost-key.pem" -cert-file "$CERT_DIR/localhost.pem" localhost 127.0.0.1 ::1
    echo "✅ [Çelikpen SSL] Sertifikalar oluşturuldu:"
    echo "   - Sertifika: $CERT_DIR/localhost.pem"
    echo "   - Özel Anahtar: $CERT_DIR/localhost-key.pem"
    echo "🚀 Başlatmak için: npm run dev:ssl"
  else
    echo "ℹ️  mkcert bulunamadı, OpenSSL ile 365 günlük yerel TLS sertifikası üretiliyor..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout "$CERT_DIR/localhost-key.pem" \
      -out "$CERT_DIR/localhost.pem" \
      -subj "/C=TR/ST=Istanbul/L=Bahcelievler/O=Celikpen Mimari Cam Sistemleri/CN=localhost"
    echo "✅ [Çelikpen SSL] OpenSSL sertifikaları $CERT_DIR altında oluşturuldu."
    echo "🚀 Başlatmak için: npm run dev:ssl"
  fi
  exit 0
fi

if [[ "$MODE" == "production" ]]; then
  echo "🏢 [Çelikpen Enterprise SSL] $DOMAIN için Let's Encrypt TLS 1.2/1.3 & Nginx yapılandırılıyor..."

  apt-get update -y
  apt-get install -y nginx certbot python3-certbot-nginx openssl

  # 2048-bit DH Parametresi
  if [[ ! -f /etc/ssl/certs/dhparam.pem ]]; then
    openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
  fi

  # Let's Encrypt Sertifika Talebi
  certbot certonly --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
    --non-interactive --agree-tos -m "$EMAIL" --keep-until-expiring

  # Nginx Kurumsal Yapılandırması (TLS 1.2 / 1.3, HTTP/2, OCSP Stapling, HSTS)
  cat > "/etc/nginx/sites-available/$DOMAIN" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    return 308 https://$DOMAIN\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/$DOMAIN/chain.pem;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;

    # Modern TLS 1.2 & TLS 1.3 Protokolleri
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 1.1.1.1 8.8.8.8 valid=300s;
    resolver_timeout 5s;

    # Kurumsal Güvenlik Başlıkları
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

  ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
  nginx -t && systemctl reload nginx

  # Otomatik Sertifika Yenileme Cron Görevi
  systemctl enable certbot.timer
  systemctl start certbot.timer

  echo "✅ [Çelikpen Enterprise SSL] $DOMAIN üzerinde 256-Bit TLS 1.3 SSL aktif edildi!"
  exit 0
fi

echo "Kullanım: bash scripts/setup-ssl.sh [local|production] [domain] [email]"
exit 1
