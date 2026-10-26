#!/usr/bin/env node
/**
 * TASK 1: Deep Scrape & Download Real Architectural Imagery from https://www.gungorpen.com/
 * Downloads and verifies (> 15KB, HTTP 200, valid JPEG/PNG/WebP magic bytes) real photos into:
 * - public/images/references/ref-1.jpg ... ref-12.jpg
 * - public/images/services/
 * - public/images/products/
 * - public/images/blog/
 */
import { createHash } from 'node:crypto';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const MIN_BYTES = 15 * 1024;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function isValidImageBuffer(buf) {
  if (!buf || buf.length < MIN_BYTES) return false;
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  // WEBP: RIFF....WEBP
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  ) {
    return true;
  }
  return false;
}

const md5 = (buf) => createHash('md5').update(buf).digest('hex');

async function downloadFirstValid(candidates, usedHashes, allowDuplicateHash = false) {
  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        headers: {
          'user-agent': UA,
          referer: 'https://www.gungorpen.com/',
        },
      });
      if (res.status !== 200) continue;
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (!isValidImageBuffer(buf)) continue;
      const hash = md5(buf);
      if (!allowDuplicateHash && usedHashes.has(hash)) continue;
      usedHashes.add(hash);
      return { buf, url, sizeKB: Math.round(buf.length / 1024), contentType };
    } catch {
      // try next candidate
    }
  }
  return null;
}

/**
 * Curated mapping of real architectural photos from gungorpen.com
 */
const DOWNLOAD_MANIFEST = [
  // ============================================================================
  // 1. REFERENCES (public/images/references/ref-1.jpg ... ref-12.jpg)
  // ============================================================================
  {
    dest: 'public/images/references/ref-1.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Gungorpen-1808-1.jpg',
      'https://www.gungorpen.com/image/1-1-1.jpg',
      'https://www.gungorpen.com/image/3-17.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-2.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Gungorpen-1808-2.jpg',
      'https://www.gungorpen.com/image/2-17.jpg',
      'https://www.gungorpen.com/image/2-11.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-3.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Gungorpen-1808-3.jpg',
      'https://www.gungorpen.com/image/1-19.jpg',
      'https://www.gungorpen.com/image/3-12.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-4.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Gungorpen-1808-4.jpg',
      'https://www.gungorpen.com/image/4-9.jpg',
      'https://www.gungorpen.com/image/3-1.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-5.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Gungorpen-1808-5.jpg',
      'https://www.gungorpen.com/image/1-10.jpg',
      'https://www.gungorpen.com/image/2-8.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-6.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Gungorpen-1808-6.jpg',
      'https://www.gungorpen.com/image/1-3.jpg',
      'https://www.gungorpen.com/image/1-12.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-7.jpg',
    candidates: [
      'https://www.gungorpen.com/image/gungorpen-1.jpeg',
      'https://www.gungorpen.com/image/8.jpg',
      'https://www.gungorpen.com/image/6-1.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-8.jpg',
    candidates: [
      'https://www.gungorpen.com/image/gungorpen-2.jpeg',
      'https://www.gungorpen.com/image/1-17.jpg',
      'https://www.gungorpen.com/image/4-10.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-9.jpg',
    candidates: [
      'https://www.gungorpen.com/image/gungorpen-3.jpeg',
      'https://www.gungorpen.com/image/5-9.jpg',
      'https://www.gungorpen.com/image/7.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-10.jpg',
    candidates: [
      'https://www.gungorpen.com/image/gungorpen-4.jpeg',
      'https://www.gungorpen.com/image/2-15.jpg',
      'https://www.gungorpen.com/image/3-15.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-11.jpg',
    candidates: [
      'https://www.gungorpen.com/image/ref001.jpg',
      'https://www.gungorpen.com/image/01-1.jpg',
      'https://www.gungorpen.com/image/2-18.jpg',
    ],
  },
  {
    dest: 'public/images/references/ref-12.jpg',
    candidates: [
      'https://www.gungorpen.com/image/01-2.jpg',
      'https://www.gungorpen.com/image/01-3.jpg',
      'https://www.gungorpen.com/image/1-20.jpg',
      'https://www.gungorpen.com/image/3-18.jpg',
    ],
  },

  // ============================================================================
  // 2. SERVICES (public/images/services/)
  // ============================================================================
  {
    dest: 'public/images/services/katlanir-cam-balkon.jpg',
    candidates: [
      'https://www.gungorpen.com/image/cambalkon.jpg',
      'https://www.gungorpen.com/image/1-1-1.jpg',
      'https://www.gungorpen.com/image/2-11.jpg',
    ],
  },
  {
    dest: 'public/images/services/isicamli-cam-balkon.jpg',
    candidates: [
      'https://www.gungorpen.com/image/tiaratwinmax.png',
      'https://www.gungorpen.com/image/3-12.jpg',
      'https://www.gungorpen.com/image/1-1.jpg',
      'https://www.gungorpen.com/image/5.jpg',
    ],
  },
  {
    dest: 'public/images/services/surme-cam-balkon.jpg',
    candidates: [
      'https://www.gungorpen.com/image/surmesistemler.jpg',
      'https://www.gungorpen.com/image/surmesistem01.jpg',
      'https://www.gungorpen.com/image/2-14.jpg',
    ],
  },
  {
    dest: 'public/images/services/giyotin-cam-sistemleri.jpg',
    candidates: [
      'https://www.gungorpen.com/image/giyotinsistemleri.jpg',
      'https://www.gungorpen.com/image/1-3.jpg',
      'https://www.gungorpen.com/image/1-12.jpg',
    ],
  },
  {
    dest: 'public/images/services/kis-bahcesi-sistemleri.jpg',
    candidates: [
      'https://www.gungorpen.com/image/kisbahcesi.jpg',
      'https://www.gungorpen.com/image/4-9.jpg',
      'https://www.gungorpen.com/image/3-1.jpg',
    ],
  },
  {
    dest: 'public/images/services/bioklimatik-pergola.jpg',
    candidates: [
      'https://www.gungorpen.com/image/bioklimatikpergola.png',
      'https://www.gungorpen.com/image/pergola.png',
      'https://www.gungorpen.com/image/1-10.jpg',
      'https://www.gungorpen.com/image/2-8.jpg',
    ],
  },
  {
    dest: 'public/images/services/pvc-pencere-kapi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/pvcdograma.jpg',
      'https://www.gungorpen.com/image/1-7.jpg',
      'https://www.gungorpen.com/image/1-14.jpg',
    ],
  },
  {
    dest: 'public/images/services/panjur-kepenk-sineklik.jpg',
    candidates: [
      'https://www.gungorpen.com/image/kepenkpanjur.jpg',
      'https://www.gungorpen.com/image/panjurkepenk.jpg',
      'https://www.gungorpen.com/image/5-8.jpg',
    ],
  },

  // ============================================================================
  // 3. BLOG POSTS (public/images/blog/) — 8 Topic-Matched Real Architectural Photos
  // ============================================================================
  {
    // 1. Isıcamlı Cam Balkon Rehberi 2026
    dest: 'public/images/blog/isicamli-cam-balkon-rehberi-2026.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Cam-Balkon-Su-Alirmi.jpg',
      'https://www.gungorpen.com/image/cambalkonalbert.jpg',
      'https://www.gungorpen.com/image/1-1-1.jpg',
    ],
  },
  {
    // 2. Winsa Dorado 76 mı, Revotech Gold mu? PVC Pencere Karşılaştırması
    dest: 'public/images/blog/dorado-76-revotech-gold-karsilastirma.jpg',
    candidates: [
      'https://www.gungorpen.com/image/pvc.jpg',
      'https://www.gungorpen.com/image/Pvcpencerekapi-1.jpg',
      'https://www.gungorpen.com/image/1-7.jpg',
    ],
  },
  {
    // 3. Katlanır Cam Balkon mu, Eşiksiz Sürme Sistem mi?
    dest: 'public/images/blog/katlanir-mi-esiksiz-surme-mi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Katlanir-Cam-Balkon-Sistemi-ile-Surme-Cam-Balkon-Sistemin-Farki-Nedir.jpg',
      'https://www.gungorpen.com/image/Cam-Balkon-Sistemi-Nasil-Calisir.jpg',
      'https://www.gungorpen.com/image/2-11.jpg',
    ],
  },
  {
    // 4. Motorlu Giyotin Cam Sistemleri: Teras, Kafe ve Kış Bahçelerinde Kumandalı Konfor
    dest: 'public/images/blog/motorlu-giyotin-cam-sistemleri.jpg',
    candidates: [
      'https://www.gungorpen.com/image/2-10.jpg',
      'https://www.gungorpen.com/image/3-11.jpg',
      'https://www.gungorpen.com/image/4-2.jpg',
      'https://www.gungorpen.com/image/1-3.jpg',
    ],
  },
  {
    // 5. Bioklimatik Pergola ve Kış Bahçesi Sistemlerinde Su Sızdırmazlığı
    dest: 'public/images/blog/bioklimatik-pergola-kis-bahcesi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/3-9.jpg',
      'https://www.gungorpen.com/image/4-9.jpg',
      'https://www.gungorpen.com/image/3-1.jpg',
      'https://www.gungorpen.com/image/kisbahcesi01.png',
    ],
  },
  {
    // 6. Hebeschiebe (Panorama HS 76) Kaldır-Sür Sürme Sistemler
    dest: 'public/images/blog/panorama-hs-76-hebeschiebe.jpg',
    candidates: [
      'https://www.gungorpen.com/image/1-16.jpg',
      'https://www.gungorpen.com/image/3-14.jpg',
      'https://www.gungorpen.com/image/2-14.jpg',
      'https://www.gungorpen.com/image/surmesistem01.jpg',
    ],
  },
  {
    // 7. Şişecam Sinerji & Konfor Isıcam Seçimi
    dest: 'public/images/blog/sisecam-isicam-secimi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Neden-Cam-Balkon-Yaptirmaliyim2.jpeg',
      'https://www.gungorpen.com/image/cam-balkon-nasil-hesaplanir.jpg',
      'https://www.gungorpen.com/image/3-12.jpg',
    ],
  },
  {
    // 8. Bahçelievler ve İstanbul'da Cam Balkon Yaptırırken 10 Kritik Detay
    dest: 'public/images/blog/bahcelievler-cam-balkon-10-kritik-detay.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Cam-Balkon-Yaptirmadan-Once-Sorulmasi-Gereken-5-Soru.jpg',
      'https://www.gungorpen.com/image/cambalkonalbert.jpg',
      'https://www.gungorpen.com/image/5.jpg',
    ],
  },

  // ============================================================================
  // 4. PRODUCTS (public/images/products/) — Real Winsa & Architectural Product Photos
  // ============================================================================
  {
    dest: 'public/images/products/kocasinan-revotech-gold-antrasit-pvc-pencere.jpg',
    candidates: [
      'https://www.gungorpen.com/image/revotechgold-1.png',
      'https://www.gungorpen.com/image/revotechgold.png',
      'https://www.gungorpen.com/image/1-7.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-revotech-pvc-pencere-cephe.jpg',
    candidates: [
      'https://www.gungorpen.com/image/1-14.jpg',
      'https://www.gungorpen.com/image/2-13.jpg',
      'https://www.gungorpen.com/image/pvcdograma.jpg',
    ],
  },
  {
    dest: 'public/images/products/siyavuspasa-dorado-76-pvc-pencere.jpg',
    candidates: [
      'https://www.gungorpen.com/image/dorado-1.png',
      'https://www.gungorpen.com/image/dorado.png',
      'https://www.gungorpen.com/image/3-13.jpg',
    ],
  },
  {
    dest: 'public/images/products/yenibosna-safir-76-pvc-pencere.jpg',
    candidates: [
      'https://www.gungorpen.com/image/safir76-1.png',
      'https://www.gungorpen.com/image/safir76.png',
      'https://www.gungorpen.com/image/2-5.jpg',
    ],
  },
  {
    dest: 'public/images/products/cobancesme-safir-70-pencere-uygulamasi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/2-13.jpg',
      'https://www.gungorpen.com/image/3-13.jpg',
      'https://www.gungorpen.com/image/1-7.jpg',
    ],
  },
  {
    dest: 'public/images/products/hurriyet-karina-pvc-pencere.jpg',
    candidates: [
      'https://www.gungorpen.com/image/2-5.jpg',
      'https://www.gungorpen.com/image/3-13.jpg',
      'https://www.gungorpen.com/image/1-14.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-panorama-hs-76-kaldir-sur-kapi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/panoramahs76-1.png',
      'https://www.gungorpen.com/image/panoramahs76-2.png',
      'https://www.gungorpen.com/image/surmesistem01.jpg',
    ],
  },
  {
    dest: 'public/images/products/sirinevler-comfort-slide-plus-surme-kapi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/comfortslideplus-1.png',
      'https://www.gungorpen.com/image/confortslide.png',
      'https://www.gungorpen.com/image/2-14.jpg',
    ],
  },
  {
    dest: 'public/images/products/zafer-comfort-slide-surme-sistem.jpg',
    candidates: [
      'https://www.gungorpen.com/image/2-14.jpg',
      'https://www.gungorpen.com/image/1-16.jpg',
      'https://www.gungorpen.com/image/3-14.jpg',
    ],
  },
  {
    dest: 'public/images/products/fevzicakmak-lotus-paralel-surme-kapi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Lotus-1.png',
      'https://www.gungorpen.com/image/lotus.png',
      'https://www.gungorpen.com/image/3-14.jpg',
    ],
  },
  {
    dest: 'public/images/products/soganli-vela-gold-surme-pencere.jpg',
    candidates: [
      'https://www.gungorpen.com/image/slidemaster.png',
      'https://www.gungorpen.com/image/1-1.png',
      'https://www.gungorpen.com/image/surmesistem01.jpg',
    ],
  },
  {
    dest: 'public/images/products/kocasinan-vera-termal-isicamli-cam-balkon.jpg',
    candidates: [
      'https://www.gungorpen.com/image/tiara.png',
      'https://www.gungorpen.com/image/tiaratwinmax.png',
      'https://www.gungorpen.com/image/1-1-1.jpg',
    ],
  },
  {
    dest: 'public/images/products/siyavuspasa-vera-katlanir-cam-balkon.jpg',
    candidates: [
      'https://www.gungorpen.com/image/optima.png',
      'https://www.gungorpen.com/image/2-11.jpg',
      'https://www.gungorpen.com/image/3-12.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-vera-slide-esiksiz-surme-cam-balkon.jpg',
    candidates: [
      'https://www.gungorpen.com/image/1-1.png',
      'https://www.gungorpen.com/image/slidemaster.png',
      'https://www.gungorpen.com/image/1-1.jpg',
    ],
  },
  {
    dest: 'public/images/products/yenibosna-vera-vertical-motorlu-giyotin-cam.jpg',
    candidates: [
      'https://www.gungorpen.com/image/tambalkon-1.png',
      'https://www.gungorpen.com/image/tambalkon.png',
      'https://www.gungorpen.com/image/1-12.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-bioklimatik-pergola-kis-bahcesi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/kisbahcesi01.png',
      'https://www.gungorpen.com/image/kisbahcesi.png',
      'https://www.gungorpen.com/image/pergola.png',
      'https://www.gungorpen.com/image/4-9.jpg',
    ],
  },
  {
    dest: 'public/images/products/cobancesme-winkepenk-kepenk-sistemi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/4-8.jpg',
      'https://www.gungorpen.com/image/3-8.jpg',
      'https://www.gungorpen.com/image/2-7.jpg',
    ],
  },
  {
    dest: 'public/images/products/sirinevler-winstor-monoblok-panjur.jpg',
    candidates: [
      'https://www.gungorpen.com/image/winstor-1.png',
      'https://www.gungorpen.com/image/winstor.png',
      'https://www.gungorpen.com/image/5-8.jpg',
    ],
  },
  {
    dest: 'public/images/products/zafer-winstor-panjur-sistemi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/winstor.png',
      'https://www.gungorpen.com/image/2-7.jpg',
      'https://www.gungorpen.com/image/1-9.jpg',
    ],
  },
  {
    dest: 'public/images/products/hurriyet-motorlu-aluminyum-panjur.jpg',
    candidates: [
      'https://www.gungorpen.com/image/1-9.jpg',
      'https://www.gungorpen.com/image/3-8.jpg',
      'https://www.gungorpen.com/image/panjurkepenk.jpg',
    ],
  },
  {
    dest: 'public/images/products/kocasinan-winsa-pencere-kol-kilit-donanimi.jpg',
    candidates: [
      'https://www.gungorpen.com/image/optima-kilit.png',
      'https://www.gungorpen.com/image/paslanmazteker.png',
      'https://www.gungorpen.com/image/tekerlekx300.png',
      'https://www.gungorpen.com/image/4-3.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-plise-sineklik-kedi-tulu.jpg',
    candidates: [
      'https://www.gungorpen.com/image/1-15.jpg',
      'https://www.gungorpen.com/image/2-3.jpg',
      'https://www.gungorpen.com/image/3-3.jpg',
    ],
  },
  {
    dest: 'public/images/products/soganli-antrasit-metalik-cephe-renkleri.jpg',
    candidates: [
      'https://www.gungorpen.com/image/1-11.jpg',
      'https://www.gungorpen.com/image/2-9.jpg',
      'https://www.gungorpen.com/image/4-4.jpg',
    ],
  },
  {
    dest: 'public/images/products/fevzicakmak-ahsap-desenli-pvc-pencere.jpg',
    candidates: [
      'https://www.gungorpen.com/image/5-3.jpg',
      'https://www.gungorpen.com/image/2-4.jpg',
      'https://www.gungorpen.com/image/3-10.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-pvc-pencere-kapi-sistemleri.jpg',
    candidates: [
      'https://www.gungorpen.com/image/Pvcpencerekapi-1.jpg',
      'https://www.gungorpen.com/image/pvcdograma.jpg',
      'https://www.gungorpen.com/image/1-7.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-surme-kapi-sistemleri.jpg',
    candidates: [
      'https://www.gungorpen.com/image/surmesistem01.jpg',
      'https://www.gungorpen.com/image/surmesistemler.jpg',
      'https://www.gungorpen.com/image/2-14.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-cam-balkon-sistemleri.jpg',
    candidates: [
      'https://www.gungorpen.com/image/1-1-1.jpg',
      'https://www.gungorpen.com/image/cambalkon.jpg',
      'https://www.gungorpen.com/image/2-11.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-panjur-kepenk-sistemleri.jpg',
    candidates: [
      'https://www.gungorpen.com/image/panjurkepenk.jpg',
      'https://www.gungorpen.com/image/kepenkpanjur.jpg',
      'https://www.gungorpen.com/image/5-8.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-donanim-aksesuar.jpg',
    candidates: [
      'https://www.gungorpen.com/image/aluminyumdograma.jpg',
      'https://www.gungorpen.com/image/4-3.jpg',
      'https://www.gungorpen.com/image/3-3.jpg',
    ],
  },
  {
    dest: 'public/images/products/bahcelievler-renk-dunyasi-lamine.jpg',
    candidates: [
      'https://www.gungorpen.com/image/3-10.jpg',
      'https://www.gungorpen.com/image/1-11.jpg',
      'https://www.gungorpen.com/image/2-9.jpg',
    ],
  },

  // ============================================================================
  // 5. HERO & PRESTIGE IMAGES (public/images/)
  // ============================================================================
  {
    dest: 'public/images/kocasinan-isicamli-cam-balkon-hero.jpg',
    candidates: [
      'https://www.gungorpen.com/image/home-3.jpg',
      'https://www.gungorpen.com/image/Gungorpen-1808-1.jpg',
    ],
  },
  {
    dest: 'public/images/bahcelievler-giyotin-bioklimatik-sistem.jpg',
    candidates: [
      'https://www.gungorpen.com/image/home-2.jpg',
      'https://www.gungorpen.com/image/4-9.jpg',
    ],
  },
  {
    dest: 'public/images/siyavuspasa-surme-cam-balkon.jpg',
    candidates: [
      'https://www.gungorpen.com/image/bg002.jpg?id=154',
      'https://www.gungorpen.com/image/1-16.jpg',
    ],
  },
];

// Fallback pool of high-res real reference photos from gungorpen.com
const FALLBACK_POOL = [
  'https://www.gungorpen.com/image/1-18.jpg',
  'https://www.gungorpen.com/image/2-16.jpg',
  'https://www.gungorpen.com/image/3-16.jpg',
  'https://www.gungorpen.com/image/4-11.jpg',
  'https://www.gungorpen.com/image/2-1-1.jpg',
  'https://www.gungorpen.com/image/1-1-3.jpg',
  'https://www.gungorpen.com/image/Gungorpen-1808-1-1.jpg',
  'https://www.gungorpen.com/image/Gungorpen-1808-1-2.jpg',
  'https://www.gungorpen.com/image/Gungorpen-1808-1-3.jpg',
  'https://www.gungorpen.com/image/1-min-1.png',
  'https://www.gungorpen.com/image/2-min-1.png',
  'https://www.gungorpen.com/image/3-min-1.png',
  'https://www.gungorpen.com/image/4-min-1.png',
  'https://www.gungorpen.com/image/5-min-1.png',
  'https://www.gungorpen.com/image/6-min-1.png',
  'https://www.gungorpen.com/image/7-min-1.png',
  'https://www.gungorpen.com/image/8-min-1.png',
  'https://www.gungorpen.com/image/9-min-1.png',
  'https://www.gungorpen.com/image/10-min-1.png',
  'https://www.gungorpen.com/image/11-min-1.png',
  'https://www.gungorpen.com/image/12-min-1.png',
  'https://www.gungorpen.com/image/dikey1.jpg',
  'https://www.gungorpen.com/image/dikey2.jpg',
  'https://www.gungorpen.com/image/dikey3.jpg',
  'https://www.gungorpen.com/image/dikey4.jpg',
  'https://www.gungorpen.com/image/dikey5.jpg',
  'https://www.gungorpen.com/image/teklifimg01.jpg',
];

async function run() {
  const usedHashes = new Set();
  const report = [];
  let failedCount = 0;

  for (const item of DOWNLOAD_MANIFEST) {
    const absPath = path.join(ROOT, item.dest);
    await mkdir(path.dirname(absPath), { recursive: true });

    // Try unique hash first, then allow duplicate from candidates, then fallback pool
    let result = await downloadFirstValid(item.candidates, usedHashes, false);
    if (!result) {
      result = await downloadFirstValid(FALLBACK_POOL, usedHashes, false);
    }
    if (!result) {
      result = await downloadFirstValid([...item.candidates, ...FALLBACK_POOL], usedHashes, true);
    }

    if (result) {
      await writeFile(absPath, result.buf);
      const st = await stat(absPath);
      console.log(
        `✓ SAVED ${item.dest} (${result.sizeKB} KB, ${result.contentType}) <-- ${result.url}`
      );
      report.push({
        dest: item.dest,
        sourceUrl: result.url,
        bytes: st.size,
        sizeKB: result.sizeKB,
        contentType: result.contentType,
        valid: st.size >= MIN_BYTES,
      });
    } else {
      failedCount++;
      console.error(`✗ FAILED ${item.dest}`);
    }
  }

  await writeFile(
    path.join(ROOT, 'scripts', 'gungorpen-downloaded-images.json'),
    JSON.stringify(report, null, 2)
  );
  console.log(
    `\nDownload & Verification Complete: ${report.length}/${DOWNLOAD_MANIFEST.length} images verified (>15KB, HTTP 200, valid MIME).`
  );
  if (failedCount > 0) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
