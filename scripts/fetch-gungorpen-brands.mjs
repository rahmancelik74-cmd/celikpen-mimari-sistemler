import fs from 'node:fs';
import path from 'node:path';

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(`Downloaded ${dest} -> ${(buf.length / 1024).toFixed(1)} KB`);
}

async function main() {
  const downloads = [
    // Winsa card & detail images
    ['https://www.gungorpen.com/image/safir76.png', 'public/images/brands/winsa/safir-76.png'],
    ['https://www.gungorpen.com/image/safir76-1.png', 'public/images/brands/winsa/safir-76-detail.png'],
    ['https://www.gungorpen.com/image/dorado.png', 'public/images/brands/winsa/dorado-76.png'],
    ['https://www.gungorpen.com/image/dorado76.png', 'public/images/brands/winsa/dorado-76-logo.png'],
    ['https://www.gungorpen.com/image/dorado-1.png', 'public/images/brands/winsa/dorado-76-detail.png'],
    ['https://www.gungorpen.com/image/revotechgold.png', 'public/images/brands/winsa/revotech-gold.png'],
    ['https://www.gungorpen.com/image/revotechgold-1.png', 'public/images/brands/winsa/revotech-gold-detail.png'],
    ['https://www.gungorpen.com/image/confortslide.png', 'public/images/brands/winsa/comfort-slide-plus.png'],
    ['https://www.gungorpen.com/image/panoramahs76-2.png', 'public/images/brands/winsa/panorama-hs-76.png'],
    ['https://www.gungorpen.com/image/lotus.png', 'public/images/brands/winsa/lotus.png'],
    ['https://www.gungorpen.com/image/winstor.png', 'public/images/brands/winsa/winstor.png'],

    // Albert Genau card & detail images
    ['https://www.gungorpen.com/image/slidemaster.png', 'public/images/brands/albert-genau/isicamli-surme-cambalkon.png'],
    ['https://www.gungorpen.com/image/1-1.png', 'public/images/brands/albert-genau/isicamli-surme-detail.png'],
    ['https://www.gungorpen.com/image/tiara.png', 'public/images/brands/albert-genau/isicamli-katlanir-cambalkon.png'],
    ['https://www.gungorpen.com/image/tiaratwinmax.png', 'public/images/brands/albert-genau/tiara-twinmax-detail.png'],
    ['https://www.gungorpen.com/image/optima.png', 'public/images/brands/albert-genau/ekonomik-katlanir-cambalkon.png'],
    ['https://www.gungorpen.com/image/tambalkon.png', 'public/images/brands/albert-genau/tambalkon-giyotin.png'],
    ['https://www.gungorpen.com/image/tambalkon-1.png', 'public/images/brands/albert-genau/tambalkon-giyotin-detail.png'],
    ['https://www.gungorpen.com/image/kisbahcesi.png', 'public/images/brands/albert-genau/kis-bahcesi.png'],
    ['https://www.gungorpen.com/image/kisbahcesi01.png', 'public/images/brands/albert-genau/kis-bahcesi-detail.png'],
    ['https://www.gungorpen.com/image/pergola.png', 'public/images/brands/albert-genau/bioklimatik-pergola.png'],
    ['https://www.gungorpen.com/image/bioklimatikpergola.png', 'public/images/brands/albert-genau/bioklimatik-pergola-detail.png'],
  ];

  for (const [url, dest] of downloads) {
    try {
      await download(url, dest);
    } catch (e) {
      console.error('Failed:', url, e.message);
    }
  }
}

main();
