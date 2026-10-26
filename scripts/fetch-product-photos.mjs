#!/usr/bin/env node
/**
 * Çelikpen — Gerçek Ürün & Uygulama Fotoğrafı İndirici
 * ----------------------------------------------------
 * 1) Önce https://www.winsa.com.tr/ ana sayfasındaki ürün/uygulama görsellerini dener.
 *    (Site bot korumasıyla 403 dönerse sessizce sonraki kaynağa geçer; koruma ATLATILMAZ.)
 * 2) Ardından Wikimedia Commons açık lisanslı mimari fotoğraf arşivinden, her ürün/hizmet
 *    kartı için BENZERSİZ, yüksek çözünürlüklü gerçek fotoğraf (.jpg) indirir.
 * 3) Her dosya için HTTP 200 + boyut > 15 KB doğrulaması yapılır, MD5 ile tekrar eden
 *    görseller elenir ve lisans/atıf bilgileri `credits.json` dosyasına yazılır.
 *
 * Kullanım:  node scripts/fetch-product-photos.mjs           (eksik olanları indirir)
 *            node scripts/fetch-product-photos.mjs --force   (tümünü yeniden indirir)
 */
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const FORCE = process.argv.includes('--force');
const MIN_BYTES = 15 * 1024;
const UA = 'CelikpenSiteAssetBot/1.0 (https://celikpen.com; iletisim@celikpen.com) node-fetch';

/**
 * Her hedef için önce küratörlü (başlığı ürünle birebir eşleşen) Commons dosyası
 * denenir; uygun değilse arama sorgularıyla benzersiz bir alternatif bulunur.
 * @type {{ dir: string; file: string; title?: string; queries: string[] }[]}
 */
const TARGETS = [
  // ---------------- PVC PENCERE & KAPI ----------------
  { dir: 'products', file: 'kocasinan-revotech-gold-antrasit-pvc-pencere.jpg', title: 'File:Fenster - Dreifachverglasung.JPG', queries: ['intitle:window triple glazed', 'intitle:Fenster modern'] },
  { dir: 'products', file: 'bahcelievler-revotech-pvc-pencere-cephe.jpg', title: 'File:UPVC Windows & Doors, Cherry Lane Liverpool L4.JPG', queries: ['intitle:upvc windows', 'intitle:pvc window'] },
  { dir: 'products', file: 'siyavuspasa-dorado-76-pvc-pencere.jpg', title: 'File:Buildings in Istanbul ساختمان ها در استانبول ترکیه - معماری مدرن 01.jpg', queries: ['intitle:"modern architecture" Istanbul'] },
  { dir: 'products', file: 'yenibosna-safir-76-pvc-pencere.jpg', title: 'File:Corner-PVC-window-overview-with-corner-sill-Saint-Petersburg.jpg', queries: ['intitle:pvc window'] },
  { dir: 'products', file: 'cobancesme-safir-70-pencere-uygulamasi.jpg', title: 'File:Vinyl window frame 0802.JPG', queries: ['incategory:"Vinyl window frames"'] },
  { dir: 'products', file: 'hurriyet-karina-pvc-pencere.jpg', title: 'File:Corner-PVC-window-in-renovating-room-left.jpg', queries: ['incategory:"Vinyl window frames"'] },
  // ---------------- SÜRME SİSTEMLER ----------------
  { dir: 'products', file: 'bahcelievler-panorama-hs-76-kaldir-sur-kapi.jpg', title: 'File:Amtek Hebe-schiebe-element.jpg', queries: ['intitle:"sliding glass door"'] },
  { dir: 'products', file: 'sirinevler-comfort-slide-plus-surme-kapi.jpg', title: 'File:Upvc Patio doors.JPG', queries: ['intitle:"patio doors"'] },
  { dir: 'products', file: 'zafer-comfort-slide-surme-sistem.jpg', title: 'File:Modern house view showing living room and outdoor patio area with sliding glass doors.jpg', queries: ['intitle:"sliding glass doors"'] },
  { dir: 'products', file: 'fevzicakmak-lotus-paralel-surme-kapi.jpg', title: 'File:Shakusui-tei Sliding glass doors.jpg', queries: ['intitle:"sliding glass"'] },
  { dir: 'products', file: 'soganli-vela-gold-surme-pencere.jpg', title: 'File:2022-05-24 18 35 20 View out through the door to a back patio of a house along Aquetong Lane in the Mountainview section of Ewing Township, Mercer County, New Jersey.jpg', queries: ['intitle:"glass door" patio'] },
  // ---------------- CAM BALKON ----------------
  { dir: 'products', file: 'kocasinan-vera-termal-isicamli-cam-balkon.jpg', title: 'File:Glass balconies on the seafront - geograph.org.uk - 7661191.jpg', queries: ['intitle:"glass balconies"'] },
  { dir: 'products', file: 'siyavuspasa-vera-katlanir-cam-balkon.jpg', title: 'File:Solarlux Faltwand geoeffnet.jpg', queries: ['intitle:faltwand'] },
  { dir: 'products', file: 'bahcelievler-vera-slide-esiksiz-surme-cam-balkon.jpg', title: 'File:Glass balconies St Eusebius Church Arnhem NL.jpg', queries: ['intitle:"glass balcony"'] },
  { dir: 'products', file: 'yenibosna-vera-vertical-motorlu-giyotin-cam.jpg', title: 'File:Restaurant of the Musée de la Vie romantique, 2012.jpg', queries: ['incategory:"Winter gardens" restaurant'] },
  { dir: 'products', file: 'bahcelievler-bioklimatik-pergola-kis-bahcesi.jpg', title: 'File:Big-Chief-İstanbul.jpg', queries: ['intitle:pergola terrace'] },
  // ---------------- PANJUR & KEPENK ----------------
  { dir: 'products', file: 'cobancesme-winkepenk-kepenk-sistemi.jpg', title: 'File:Paris Roller shutters and street signs 2008-09-06.jpg', queries: ['intitle:"roller shutters"'] },
  { dir: 'products', file: 'sirinevler-winstor-monoblok-panjur.jpg', title: 'File:VELUX roof windows and VELUX roller shutters.jpg', queries: ['incategory:"Window roller shutters"'] },
  { dir: 'products', file: 'zafer-winstor-panjur-sistemi.jpg', title: 'File:Wuppertal, Kaiserstr. 125, Fensterpaar im 1. OG.jpg', queries: ['incategory:"Window roller shutters"'] },
  { dir: 'products', file: 'hurriyet-motorlu-aluminyum-panjur.jpg', title: 'File:Solar rolluik Rem zonwering.jpg', queries: ['intitle:rolluik'] },
  // ---------------- DONANIM & SİNEKLİK ----------------
  { dir: 'products', file: 'kocasinan-winsa-pencere-kol-kilit-donanimi.jpg', title: 'File:Drehriegel eines Fensters (2024).jpg', queries: ['incategory:"Window handles"'] },
  { dir: 'products', file: 'bahcelievler-plise-sineklik-kedi-tulu.jpg', title: 'File:Window with insect screen.JPG', queries: ['incategory:"Mesh window screens"'] },
  // ---------------- RENK DÜNYASI ----------------
  { dir: 'products', file: 'soganli-antrasit-metalik-cephe-renkleri.jpg', title: 'File:Buildings in Istanbul ساختمان ها در استانبول ترکیه - معماری مدرن 08.jpg', queries: ['intitle:"Buildings in Istanbul"'] },
  { dir: 'products', file: 'fevzicakmak-ahsap-desenli-pvc-pencere.jpg', title: 'File:Casa con balcón de madera en Valdemoro.jpg', queries: ['incategory:"Wooden windows"'] },
  // ---------------- KATEGORİ KAPAKLARI ----------------
  { dir: 'products', file: 'bahcelievler-pvc-pencere-kapi-sistemleri.jpg', title: 'File:Colorful apartment buildings, Istanbul, Turkey.jpg', queries: ['intitle:Istanbul apartment buildings'] },
  { dir: 'products', file: 'bahcelievler-surme-kapi-sistemleri.jpg', title: 'File:GX-214 - Tropical palms sway beside a serene pool reflecting the bright white villas elegant balcony and expansive glass windows.jpg', queries: ['intitle:villa glass windows'] },
  { dir: 'products', file: 'bahcelievler-cam-balkon-sistemleri.jpg', title: 'File:Enclosed balconies (43235466904).jpg', queries: ['incategory:"Enclosed balconies"'] },
  { dir: 'products', file: 'bahcelievler-panjur-kepenk-sistemleri.jpg', title: 'File:Rollladen eines Dachfensters.jpg', queries: ['incategory:"Window roller shutters"'] },
  { dir: 'products', file: 'bahcelievler-donanim-aksesuar.jpg', title: 'File:Rew13k04-089 window handle.JPG', queries: ['incategory:"Window handles"'] },
  { dir: 'products', file: 'bahcelievler-renk-dunyasi-lamine.jpg', title: 'File:Buildings in Istanbul ساختمان ها در استانبول ترکیه - معماری مدرن 02.jpg', queries: ['intitle:"Buildings in Istanbul"'] },
  // ---------------- BLOG KAPAKLARI ----------------
  { dir: 'blog', file: 'isicamli-cam-balkon-rehberi-2026.jpg', title: 'File:Villa. Balcony with glass roof. - 74 Dózsa György út, Budapest.jpg', queries: ['intitle:"glass balcony"'] },
  { dir: 'blog', file: 'dorado-76-revotech-gold-karsilastirma.jpg', title: 'File:New glass doors and windows in storage.jpg', queries: ['incategory:"Insulated glazing"'] },
  { dir: 'blog', file: 'katlanir-mi-esiksiz-surme-mi.jpg', title: 'File:Solarlux Faltwand angefaltet.jpg', queries: ['intitle:"folding doors"'] },
  { dir: 'blog', file: 'motorlu-giyotin-cam-sistemleri.jpg', title: 'File:Champalimaud Centre for the Unknown (16).jpg', queries: ['incategory:"Winter gardens"'] },
  { dir: 'blog', file: 'bioklimatik-pergola-kis-bahcesi.jpg', title: 'File:Baldauf Villa (Marienberg) mit Wintergarten (4).jpg', queries: ['intitle:wintergarten'] },
  { dir: 'blog', file: 'panorama-hs-76-hebeschiebe.jpg', title: 'File:SEYMOUR KRIEGER HOUSE, BETHESDA, MONTGOMERY COUNTY MD.jpg', queries: ['intitle:"glass house" modern'] },
  { dir: 'blog', file: 'sisecam-isicam-secimi.jpg', title: 'File:Double glazed Units.JPG', queries: ['incategory:"Insulated glazing"'] },
  { dir: 'blog', file: 'bahcelievler-cam-balkon-10-kritik-detay.jpg', title: 'File:Few buildings of Istanbul (8393598821).jpg', queries: ['intitle:Istanbul apartment'] },
];

const BAD_TITLE = /(map|logo|diagram|drawing|plan|painting|sketch|svg|icon|chart|poster|stamp|coat of arms|flag|schema|scheme|illustration|render|engraving|lithograph|postcard|1[5-8]\d\d)/i;

async function fetchWithRetry(url, init = {}, tries = 3) {
  let lastErr;
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(url, { ...init, headers: { 'user-agent': UA, ...(init.headers || {}) } });
      if (res.status === 429 || res.status >= 500) {
        await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
        lastErr = new Error(`HTTP ${res.status}`);
        continue;
      }
      return res;
    } catch (error) {
      lastErr = error;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw lastErr;
}

/** Winsa ana sayfasından görsel aday URL'leri (403 ise boş liste). */
async function winsaCandidates() {
  try {
    const res = await fetchWithRetry('https://www.winsa.com.tr/', {}, 1);
    if (res.status !== 200) {
      console.log(`[winsa] https://www.winsa.com.tr/ → HTTP ${res.status} (bot koruması). Açık lisanslı arşive geçiliyor.`);
      return [];
    }
    const html = await res.text();
    const urls = [...new Set([...html.matchAll(/["'(]([^"'() ]+\.(?:jpg|jpeg))/gi)].map((m) => new URL(m[1], 'https://www.winsa.com.tr/').href))];
    console.log(`[winsa] ${urls.length} aday görsel bulundu.`);
    return urls;
  } catch (error) {
    console.log(`[winsa] erişilemedi: ${error.message}`);
    return [];
  }
}

function mapInfo(title, info) {
  return {
    title,
    url: info.thumburl || info.url,
    page: info.descriptionurl,
    license: info.extmetadata?.LicenseShortName?.value ?? 'Commons',
    artist: (info.extmetadata?.Artist?.value ?? '').replace(/<[^>]+>/g, '').trim(),
  };
}

/** Küratörlü dosyayı doğrudan başlığıyla çeker (JPEG, en az 1000 px genişlik). */
async function commonsByTitle(title) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '1600',
  }).toString();
  const res = await fetchWithRetry(api.href);
  if (res.status !== 200) return null;
  const data = await res.json();
  const page = Object.values(data?.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  if (!info || info.mime !== 'image/jpeg' || info.width < 1000) return null;
  return mapInfo(page.title, info);
}

async function commonsSearch(query) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrnamespace: '6',
    gsrsearch: `${query} filetype:bitmap`,
    gsrlimit: '30',
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '1600',
  }).toString();
  const res = await fetchWithRetry(api.href);
  if (res.status !== 200) return [];
  const data = await res.json();
  const pages = Object.values(data?.query?.pages ?? {});
  pages.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  return pages
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter(({ title, info }) =>
      info &&
      info.mime === 'image/jpeg' &&
      info.width >= 1200 &&
      info.width >= info.height &&
      !BAD_TITLE.test(title),
    )
    .map(({ title, info }) => mapInfo(title, info));
}

async function download(url) {
  const res = await fetchWithRetry(url);
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < MIN_BYTES) throw new Error(`çok küçük (${buf.length} B)`);
  if (!(buf[0] === 0xff && buf[1] === 0xd8)) throw new Error('JPEG değil');
  return buf;
}

const md5 = (buf) => createHash('md5').update(buf).digest('hex');

async function main() {
  const creditsPath = path.join(ROOT, 'public', 'images', 'credits.json');
  const credits = !FORCE && existsSync(creditsPath) ? JSON.parse(await readFile(creditsPath, 'utf8')) : {};
  const usedHashes = new Set();
  const usedTitles = new Set(Object.values(credits).map((c) => c.title));

  // Mevcut dosyaların hash'lerini kaydet (tekrar indirmeyi önler).
  for (const t of TARGETS) {
    const p = path.join(ROOT, 'public', 'images', t.dir, t.file);
    if (!FORCE && existsSync(p)) usedHashes.add(md5(await readFile(p)));
  }

  const winsaPool = await winsaCandidates();
  let failures = 0;

  for (const target of TARGETS) {
    const outDir = path.join(ROOT, 'public', 'images', target.dir);
    const outPath = path.join(outDir, target.file);
    await mkdir(outDir, { recursive: true });
    if (!FORCE && existsSync(outPath)) {
      console.log(`✓ mevcut  ${target.dir}/${target.file}`);
      continue;
    }

    let saved = false;

    // 1) Winsa resmi görselleri (erişilebiliyorsa)
    while (!saved && winsaPool.length) {
      const url = winsaPool.shift();
      try {
        const buf = await download(url);
        const h = md5(buf);
        if (usedHashes.has(h)) continue;
        await writeFile(outPath, buf);
        usedHashes.add(h);
        credits[`${target.dir}/${target.file}`] = { title: url, source: url, license: '© Winsa — bayi kullanımı', artist: 'Winsa' };
        console.log(`✓ winsa   ${target.dir}/${target.file}  (${(buf.length / 1024).toFixed(0)} KB)`);
        saved = true;
      } catch {
        /* sonraki adaya geç */
      }
    }

    // 2) Wikimedia Commons — önce küratörlü dosya, ardından arama sorguları
    const tryCandidate = async (c, label) => {
      if (!c || usedTitles.has(c.title)) return false;
      try {
        const buf = await download(c.url);
        const h = md5(buf);
        if (usedHashes.has(h)) return false;
        await writeFile(outPath, buf);
        usedHashes.add(h);
        usedTitles.add(c.title);
        credits[`${target.dir}/${target.file}`] = { title: c.title, source: c.page, license: c.license, artist: c.artist };
        console.log(`✓ ${label} ${target.dir}/${target.file}  (${(buf.length / 1024).toFixed(0)} KB)  ← ${c.title}`);
        return true;
      } catch (error) {
        console.log(`  ! ${c.title}: ${error.message}`);
        return false;
      }
    };

    if (!saved && target.title) {
      try {
        saved = await tryCandidate(await commonsByTitle(target.title), 'curated');
      } catch (error) {
        console.log(`  ! küratörlü dosya hatası: ${error.message}`);
      }
    }

    for (const query of target.queries) {
      if (saved) break;
      let candidates = [];
      try {
        candidates = await commonsSearch(query);
      } catch (error) {
        console.log(`  ! arama hatası "${query}": ${error.message}`);
      }
      for (const c of candidates) {
        if (await tryCandidate(c, 'search ')) {
          saved = true;
          break;
        }
      }
      await new Promise((r) => setTimeout(r, 300));
    }

    if (!saved) {
      failures += 1;
      console.log(`✗ BAŞARISIZ ${target.dir}/${target.file}`);
    }
  }

  await writeFile(creditsPath, `${JSON.stringify(credits, null, 2)}\n`);
  console.log(`\nTamamlandı. ${TARGETS.length - failures}/${TARGETS.length} görsel doğrulandı (HTTP 200, >15 KB, benzersiz MD5).`);
  if (failures) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
