export interface ArchitecturalVideoMeta {
  videoId: string;
  title: string;
  description: string;
  brandBadge: string;
  durationIso: string;
  durationDisplay: string;
  uploadDate: string;
  posterImage: string;
  highlights: string[];
}

export const ARCHITECTURAL_VIDEO_CATALOG: Record<string, ArchitecturalVideoMeta> = {
  'albert-genau-tiara-twinmax': {
    videoId: 'G3xEyHM3vOo',
    title: 'Albert Genau Tiara Twinmax & Vera Termal — 4+20+4 Argonlu Isıcamlı Cam Balkon İncelemesi',
    description:
      'Her iki yüzü TSE EN 12150 temperli 28 mm (4+20+4) Argon gazlı Konfor Isıcam, EPDM mıknatıslı contalar ve 8 bilyalı paslanmaz çelik rulmanlarla %72 ısı tasarrufu sağlayan ısıcamlı katlanır cam balkon sistemi.',
    brandBadge: 'Albert Genau Sistem İncelemesi',
    durationIso: 'PT2M45S',
    durationDisplay: '02:45',
    uploadDate: '2026-01-15T09:00:00+03:00',
    posterImage: '/images/brands/albert-genau/isicamli-katlanir-cambalkon.png',
    highlights: [
      '28 mm (4+20+4) Argon gazlı Şişecam Konfor Isıcam (Ug = 1.1 W/m²K)',
      'Çift sıra EPDM + alüminyum mıknatıslı sızdırmazlık fitili (-38 dB akustik yalıtım)',
      'AISI 304 paslanmaz çelik 8 bilyalı ağır hizmet rulmanları',
    ],
  },
  'albert-genau-slidemaster': {
    videoId: 'smSvgd5lp-c',
    title: 'Albert Genau SlideMaster Twin — Isıcamlı Eşiksiz Sürme Cam Balkon Sistemi',
    description:
      'Kanatların içeriye açılmadığı dar balkon ve teraslar için geliştirilen, kenetli rüzgar kilitli ve engelsiz alt raylı ısıcamlı sürme cam balkon sistemi.',
    brandBadge: 'Albert Genau Resmi Sistem Videosu',
    durationIso: 'PT2M18S',
    durationDisplay: '02:18',
    uploadDate: '2026-01-18T09:00:00+03:00',
    posterImage: '/images/brands/albert-genau/isicamli-surme-cambalkon.png',
    highlights: [
      'İçe kanat açılma payı sıfır — masa ve sandalye yerleşimine tam uyum',
      '8 mm pahlı engelsiz alt eşik ve gizli su tahliye kanalı',
      'Kenetli alüminyum dikme profilleri ile Sınıf C3 rüzgar direnci',
    ],
  },
  'albert-genau-tambalkon-giyotin': {
    videoId: '2ANT1PSXuhk',
    title: 'Albert Genau Tambalkon (VertiFlex) — Uzaktan Kumandalı Motorlu Giyotin Cam Sistemi',
    description:
      'Somfy/Becker RTS tüp motorlu, el sıkışmasını önleyen güvenlikli baza profiline ve içeriden silinebilir kanat mekanizmasına sahip otomatik dikey açılır giyotin cam balkon.',
    brandBadge: 'Albert Genau Resmi Sistem Videosu',
    durationIso: 'PT2M32S',
    durationDisplay: '02:32',
    uploadDate: '2026-01-20T09:00:00+03:00',
    posterImage: '/images/brands/albert-genau/tambalkon-giyotin.png',
    highlights: [
      'Uzaktan kumandalı Somfy / Becker motor ve akıllı sensör otomasyonu',
      'Açık konumda 110 cm EN 12600 güvenlikli cam küpeşte (korkuluk)',
      'El sıkışmasını önleyen emniyetli kapak profili ve silinebilir kanat',
    ],
  },
  'albert-genau-kis-bahcesi': {
    videoId: 'MNJGzn57IK0',
    title: 'Albert Genau Premium Kış Bahçesi & Bioklimatik Pergola Tavan Sistemleri',
    description:
      'Lamine + temperli güvenlikli Konfor ısıcam çatı veya kendi ekseninde dönerek açılan motorlu bioklimatik pergola tavan ile teras ve bahçe katlarını 4 mevsim yaşam alanına dönüştüren sistem.',
    brandBadge: 'Albert Genau Resmi Sistem Videosu',
    durationIso: 'PT3M10S',
    durationDisplay: '03:10',
    uploadDate: '2026-01-22T09:00:00+03:00',
    posterImage: '/images/brands/albert-genau/kis-bahcesi.png',
    highlights: [
      '150 kg/m² kar yükü ve 2000 Pa rüzgar yüküne dayanıklı T66 alüminyum konstrüksiyon',
      'Taşıyıcı kolon içinden görünmez yağmur suyu drenaj sistemi',
      'Giyotin, Isıcamlı Sürme ve Katlanır cephe sistemleriyle %100 entegrasyon',
    ],
  },
  'winsa-dorado-76': {
    videoId: 'Ew_gttJ-QM4',
    title: 'Winsa Dorado 76 — 76 mm 5 Odacıklı Minimalist PVC Pencere ve Kapı Sistemi',
    description:
      '76 mm kasa genişliği, 5 odacıklı yalıtım geometrisi ve 9 mm ince kanat görünümüyle %12 daha fazla gün ışığı ve Uw = 0.98 W/(m²K) ısı yalıtımı sunan Winsa Dorado 76 serisi.',
    brandBadge: 'Winsa Resmi Sistem Videosu',
    durationIso: 'PT2M05S',
    durationDisplay: '02:05',
    uploadDate: '2026-01-25T09:00:00+03:00',
    posterImage: '/images/brands/winsa/dorado-76.png',
    highlights: [
      '76 mm profil genişliği, 5 odacıklı kesit ve Uw = 0.98 W/(m²K) termal verim',
      '24 mm’den 52 mm’ye kadar çift ve üçlü (triple) Konfor Isıcam uyumu',
      'TS EN 12608-1 Sınıf A et kalınlığı ve 2 mm galvanizli çelik destek sacı',
    ],
  },
  'winsa-revotech-gold': {
    videoId: 'uaPyY_b8Yy8',
    title: 'Winsa Revotech Gold 84 — 84 mm 7 Odacıklı 3 Contalı Pasif Ev Pencere Sistemi',
    description:
      '84 mm profil derinliği, 7 odacıklı iç yapısı ve 3 kademeli EPDM orta conta bariyeriyle Uw = 0.79 W/(m²K) ısı yalıtımı ve -46 dB akustik izolasyon sağlayan Winsa Revotech serisi.',
    brandBadge: 'Winsa Sistem İncelemesi',
    durationIso: 'PT1M55S',
    durationDisplay: '01:55',
    uploadDate: '2026-01-28T09:00:00+03:00',
    posterImage: '/images/brands/winsa/revotech-gold.png',
    highlights: [
      '84 mm 7 odacıklı kasa/kanat ve 3 kademeli orta conta mimarisi',
      'Uw = 0.79 W/(m²K) ısı iletim katsayısı ve Sınıf 9A su sızdırmazlığı',
      'E-5 ve havalimanı aksı için -46 dB Rw akustik gürültü azaltımı',
    ],
  },
  'winsa-panorama-hs-76': {
    videoId: 'SL87ApQbDjc',
    title: 'Winsa Panorama HS 76 — Hebeschiebe (Kaldır-Sür) Panoramik Teras Kapı Sistemi',
    description:
      '175 mm 8 odacıklı kasa, 300 kg kanat taşıma kapasitesi ve basık termal alüminyum eşiği ile 6.5 metreye varan teras açıklıklarını tek parmakla açan Winsa Panorama HS 76.',
    brandBadge: 'Winsa Resmi Sistem Videosu',
    durationIso: 'PT1M48S',
    durationDisplay: '01:48',
    uploadDate: '2026-02-01T09:00:00+03:00',
    posterImage: '/images/brands/winsa/panorama-hs-76.png',
    highlights: [
      '175 mm 8 odacıklı kasa ve kanat başına 300 kg Hebeschiebe mekanizması',
      'Kilitlendiğinde EPDM contalar üzerine vakumlanan Sınıf 9A sızdırmazlık',
      'Termal bariyerli engelsiz alt eşik ve 44 mm üçlü cam kapasitesi',
    ],
  },
  'winsa-comfort-slide-plus': {
    videoId: 'g7oErg1IRhc',
    title: 'Winsa Comfort Slide Plus — Eksenel Vakum Kilitli Yeni Nesil Akıllı Sürme Sistemi',
    description:
      'Klasik kıl fitilli sürmelerin aksine kapanırken kasa profiline 8 mm eksenel hareketle vakumlanan, çepeçevre EPDM contalı Winsa Comfort Slide Plus sistemi.',
    brandBadge: 'Winsa Resmi Sistem Videosu',
    durationIso: 'PT1M52S',
    durationDisplay: '01:52',
    uploadDate: '2026-02-04T09:00:00+03:00',
    posterImage: '/images/brands/winsa/comfort-slide-plus.png',
    highlights: [
      'Kapanırken kasaya 8 mm vakumlanan çepeçevre EPDM conta teknolojisi',
      '150 mm 6 odacıklı kasa ve 76 mm 5 odacıklı yüksek yalıtımlı kanat',
      'Uw = 0.98 W/(m²K) ısı yalıtımı ve -42 dB ses izolasyonu',
    ],
  },
  'winsa-winstor-panjur': {
    videoId: 'ZcnFP9OUwUE',
    title: 'Winsa Winstor Monoblok Panjur & Kedi Tüllü Plise Sineklik Sistemleri',
    description:
      'EPS ısı/ses yalıtımlı monoblok kutusuyla +%28 ek termal tasarruf sağlayan Somfy/Becker motorlu Winsa Winstor panjur ve yırtılmaz çelik telli kedi sinekliği.',
    brandBadge: 'Winsa Sistem İncelemesi',
    durationIso: 'PT2M12S',
    durationDisplay: '02:12',
    uploadDate: '2026-02-06T09:00:00+03:00',
    posterImage: '/images/brands/winsa/winstor.png',
    highlights: [
      'EPS termal izolasyonlu monoblok kutu ile +%28 ek kış ısı tasarrufu',
      'Poliüretan dolgulu alüminyum lamel ve Somfy/Becker motor otomasyonu',
      'Evcil hayvan güvenliği için çelik/fiberglas alaşımlı yırtılmaz kedi tülü',
    ],
  },
};

export function getVideoForSlug(slug: string): ArchitecturalVideoMeta {
  const s = slug.toLowerCase();
  if (s.includes('revotech')) return ARCHITECTURAL_VIDEO_CATALOG['winsa-revotech-gold'];
  if (s.includes('dorado') || s.includes('safir') || s.includes('karina') || s.includes('winsa')) {
    return ARCHITECTURAL_VIDEO_CATALOG['winsa-dorado-76'];
  }
  if (s.includes('panorama-hs') || s.includes('hebeschiebe')) {
    return ARCHITECTURAL_VIDEO_CATALOG['winsa-panorama-hs-76'];
  }
  if (s.includes('comfort-slide') || s.includes('lotus') || s.includes('vela-gold')) {
    return ARCHITECTURAL_VIDEO_CATALOG['winsa-comfort-slide-plus'];
  }
  if (s.includes('winstor') || s.includes('panjur') || s.includes('kepenk') || s.includes('sineklik')) {
    return ARCHITECTURAL_VIDEO_CATALOG['winsa-winstor-panjur'];
  }
  if (s.includes('giyotin') || s.includes('tambalkon')) {
    return ARCHITECTURAL_VIDEO_CATALOG['albert-genau-tambalkon-giyotin'];
  }
  if (s.includes('kis-bahcesi') || s.includes('bioklimatik') || s.includes('pergola')) {
    return ARCHITECTURAL_VIDEO_CATALOG['albert-genau-kis-bahcesi'];
  }
  if (s.includes('surme')) {
    return ARCHITECTURAL_VIDEO_CATALOG['albert-genau-slidemaster'];
  }
  return ARCHITECTURAL_VIDEO_CATALOG['albert-genau-tiara-twinmax'];
}
