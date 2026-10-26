const queries = [
  'Winsa Dorado 76',
  'Winsa Revotech Gold',
  'Winsa Panorama HS 76',
  'Winsa Comfort Slide',
  'Winsa Winstor Panjur',
  'Albert Genau Tiara Twinmax',
  'Albert Genau SlideMaster',
  'Albert Genau Tambalkon Giyotin',
  'Albert Genau Bioklimatik Pergola Targa',
  'Albert Genau Kış Bahçesi',
];

for (const q of queries) {
  const res = await fetch(
    'https://www.youtube.com/results?search_query=' + encodeURIComponent(q),
    { headers: { 'User-Agent': 'Mozilla/5.0' } },
  );
  const html = await res.text();
  const ids = [...new Set([...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map((m) => m[1]))].slice(0, 4);
  for (const id of ids) {
    const oe = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
    );
    if (oe.ok) {
      const data = await oe.json();
      console.log(`${q} => ${id} | ${data.title} | ${data.author_name}`);
      break;
    }
  }
}
