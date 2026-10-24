export type BalconyGeometryId = 'duz' | 'l_tipi' | 'u_tipi';
export type SystemSeriesId =
  | 'vns_8mm'
  | 'vns_10mm'
  | 'vbs_isicam'
  | 'vds_surme'
  | 'vds_isicamli'
  | 'vgs_giyotin'
  | 'pvc_dograma'
  | 'hs_surme'
  | 'comfort_slide'
  | 'pergola';
export type GlassOptionId = 'seffaf' | 'fume' | 'bronz' | 'alt_buzlu';
export type ProfileColorId = 'antrasit' | 'mat_siyah' | 'eloksal' | 'ahsap_desen';

export interface SystemSeriesPricing {
  id: SystemSeriesId;
  code: string;
  name: string;
  shortDesc: string;
  badge?: string;
  netPricePerM2: number; // Çelikpen Net TL/m² Birim Fiyatı
  thermalSavingPercent: number;
  acousticReductionDb: number;
  glassSpec: string;
}

export interface GlassOptionPricing {
  id: GlassOptionId;
  name: string;
  desc: string;
  extraPerM2: number; // TL/m² net fark
}

export interface ProfileColorPricing {
  id: ProfileColorId;
  name: string;
  hex: string;
  multiplier: number; // Örn: 1.00 = standart, 1.07 = +%7 fark
}

export interface PricingConfig {
  currency: 'TRY';
  lastUpdated: string;
  minBillableAreaM2: number;
  bulkBuildingDiscountRate: number; // 5+ daire toplu bina indirimi (0.15 = %15)
  quoteTolerancePercent: number; // Keşif öncesi tahmini bant (+/- %5)
  systems: Record<SystemSeriesId, SystemSeriesPricing>;
  glassOptions: Record<GlassOptionId, GlassOptionPricing>;
  profileColors: Record<ProfileColorId, ProfileColorPricing>;
  addons: {
    catScreenPerUnit: number; // Kedi tüllü sineklik (TL / sabit veya kanat başı)
    pleatedBlindPerM2: number; // Plise perde (TL / m²)
    childLockIncluded: boolean; // Çocuk emniyet kilidi ücretsiz mi?
  };
}

/**
 * ÇELİKPEN (KOCASİNAN / BAHÇELİEVLER) NET BİRİM FİYAT LİSTESİ
 * Tüm sitedeki hesaplayıcılar, karşılaştırma tabloları ve Google Schema (AggregateOffer)
 * doğrudan bu dosyadaki net birim fiyatları baz alır.
 */
export const CELIKPEN_PRICING_CONFIG: PricingConfig = {
  currency: 'TRY',
  lastUpdated: '2026-10-25',
  minBillableAreaM2: 3.5,
  bulkBuildingDiscountRate: 0.15,
  quoteTolerancePercent: 5,
  systems: {
    vns_8mm: {
      id: 'vns_8mm',
      code: 'Winsa Vera 8',
      name: 'Winsa Vera 8mm Katlanır Cam Balkon',
      shortDesc: '8mm Şişecam temperli katlanır sistem; standart balkonlarda ekonomik ve panoramik çözüm.',
      netPricePerM2: 5150,
      thermalSavingPercent: 35,
      acousticReductionDb: 18,
      glassSpec: '8mm Şişecam Temperli Tek Cam',
    },
    vns_10mm: {
      id: 'vns_10mm',
      code: 'Winsa Vera Pro 10',
      name: 'Winsa Vera Pro 10mm Katlanır Cam Balkon',
      shortDesc: '10mm Şişecam temperli tam yalıtımlı sistem; yüksek kat ve rüzgar yüküne dayanıklı.',
      netPricePerM2: 5720,
      thermalSavingPercent: 42,
      acousticReductionDb: 24,
      glassSpec: '10mm Şişecam Temperli Tek Cam',
    },
    vbs_isicam: {
      id: 'vbs_isicam',
      code: 'Winsa Vera Termal',
      name: 'Winsa Vera Termal Isıcamlı Cam Balkon',
      shortDesc: '4+20+4 Argon gazlı Sinerji Isıcamlı sistem; dört mevsim maksimum ısı ve ses yalıtımı.',
      badge: 'En Çok Tercih Edilen',
      netPricePerM2: 9150,
      thermalSavingPercent: 72,
      acousticReductionDb: 38,
      glassSpec: '28mm (4+20+4) Argon Gazlı Konfor Isıcam (Her İki Cam Temperli)',
    },
    vds_surme: {
      id: 'vds_surme',
      code: 'Winsa Vera Slide',
      name: 'Winsa Vera Slide Eşiksiz Sürme Sistem',
      shortDesc: 'Paslanmaz rulmanlı eşiksiz sürme cam balkon; dar balkonda alan kazandıran sessiz ray.',
      netPricePerM2: 5900,
      thermalSavingPercent: 50,
      acousticReductionDb: 26,
      glassSpec: '8mm / 10mm Temperli Rulmanlı Sürme',
    },
    vds_isicamli: {
      id: 'vds_isicamli',
      code: 'Winsa Vera Slide Isıcamlı',
      name: 'Winsa Vera Slide Isıcamlı Sürme Sistem',
      shortDesc: 'Eşiksiz sürme konforunu 4+16+4 ısıcam yalıtımıyla birleştiren premium sürme sistem.',
      netPricePerM2: 8650,
      thermalSavingPercent: 68,
      acousticReductionDb: 34,
      glassSpec: '4+16+4 Argon Gazlı Isıcam',
    },
    vgs_giyotin: {
      id: 'vgs_giyotin',
      code: 'Winsa Vera Vertical',
      name: 'Winsa Vera Vertical Motorlu Giyotin',
      shortDesc: 'Kumandalı zincirli/motorlu giyotin cam sistemi; açıkken güvenli cam küpeşte.',
      badge: 'Premium Seri',
      netPricePerM2: 9400,
      thermalSavingPercent: 68,
      acousticReductionDb: 35,
      glassSpec: '4+16+4 Isıcamlı + Somfy / Becker Motorlu',
    },
    pvc_dograma: {
      id: 'pvc_dograma',
      code: 'Winsa Dorado 76 & Revotech Gold',
      name: 'Winsa Dorado 76 & Revotech Gold PVC Doğrama',
      shortDesc: '76mm / 84mm 6-7 odacıklı premium PVC pencere; üç contalı sessiz ve yalıtımlı doğrama.',
      netPricePerM2: 6200,
      thermalSavingPercent: 76,
      acousticReductionDb: 43,
      glassSpec: '52mm Üçlü Low-E / Argon Isıcam Opsiyonlu',
    },
    hs_surme: {
      id: 'hs_surme',
      code: 'Winsa Panorama HS 76',
      name: 'Winsa Panorama HS 76 Hebeschiebe',
      shortDesc: 'Yüksek yalıtımlı kaldır-sür sürme sistem; 300 kg kanat kapasitesi ve engelsiz eşik.',
      netPricePerM2: 8600,
      thermalSavingPercent: 70,
      acousticReductionDb: 36,
      glassSpec: 'Çift / Üçlü Isıcam Uyumlu (Panorama HS 76)',
    },
    comfort_slide: {
      id: 'comfort_slide',
      code: 'Winsa Comfort Slide Plus',
      name: 'Winsa Comfort Slide Plus PVC Sürme',
      shortDesc: 'Yüksek sızdırmazlıklı PVC sürme sistem; eksenel kilit ve tam çevre EPDM conta.',
      netPricePerM2: 8600,
      thermalSavingPercent: 72,
      acousticReductionDb: 38,
      glassSpec: '4+16+4 / 4+18+4+18+4 Isıcam Uyumlu',
    },
    pergola: {
      id: 'pergola',
      code: 'Winsa Vela & Lotus',
      name: 'Winsa Vela & Lotus Bioklimatik Pergola',
      shortDesc: 'Motorlu alüminyum bioklimatik tavan; gizli yağmur tahliyesi ve LED aydınlatma.',
      netPricePerM2: 11800,
      thermalSavingPercent: 65,
      acousticReductionDb: 30,
      glassSpec: 'Lamine Isıcam Tavan + Motorlu Lamel',
    },
  },
  glassOptions: {
    seffaf: {
      id: 'seffaf',
      name: 'Ultra Şeffaf (Clear) Cam',
      desc: 'Maksimum gün ışığı geçirgenliği, doğal görünüm.',
      extraPerM2: 0,
    },
    fume: {
      id: 'fume',
      name: 'Füme (Antrasit Uyumlu) Reflekte Cam',
      desc: 'Güneş ısısını kırar, dışarıdan içerinin görünmesini azaltır.',
      extraPerM2: 350,
    },
    bronz: {
      id: 'bronz',
      name: 'Bronz Güneş Kontrol Camı',
      desc: 'Sıcak mimari ton, batı cepheli balkonlarda parlama kontrolü.',
      extraPerM2: 350,
    },
    alt_buzlu: {
      id: 'alt_buzlu',
      name: 'Alt %40 Kumlama (Buzlu) + Üst Şeffaf Cam',
      desc: 'Bitişik nizam sokaklarda (Kocasinan, Soğanlı, Hürriyet) otururken tam mahremiyet.',
      extraPerM2: 450,
    },
  },
  profileColors: {
    antrasit: {
      id: 'antrasit',
      name: 'Antrasit Gri (RAL 7016)',
      hex: '#334155',
      multiplier: 1.0,
    },
    mat_siyah: {
      id: 'mat_siyah',
      name: 'Mat Siyah (Elektrostatik)',
      hex: '#0F172A',
      multiplier: 1.03,
    },
    eloksal: {
      id: 'eloksal',
      name: 'Doğal Eloksal Gri',
      hex: '#94A3B8',
      multiplier: 1.0,
    },
    ahsap_desen: {
      id: 'ahsap_desen',
      name: 'Transfer Baskı Ahşap Desen',
      hex: '#78350F',
      multiplier: 1.08,
    },
  },
  addons: {
    catScreenPerUnit: 2200,
    pleatedBlindPerM2: 650,
    childLockIncluded: true,
  },
};

export interface CalculationInput {
  geometry: BalconyGeometryId;
  widthsCm: [number, number, number]; // cephe 1, cephe 2, cephe 3
  heightCm: number;
  systemId: SystemSeriesId;
  glassId: GlassOptionId;
  profileId: ProfileColorId;
  includeCatScreen: boolean;
  includePleatedBlind: boolean;
  isBulkBuilding: boolean; // 5+ daire kentsel dönüşüm/apartman toplu iş
}

export interface CalculationResult {
  totalWidthMeters: number;
  heightMeters: number;
  rawAreaM2: number;
  billableAreaM2: number;
  panelCountEstimate: number;
  effectiveUnitPricePerM2: number;
  baseSystemCost: number;
  addonsCost: number;
  subtotal: number;
  discountAmount: number;
  netTotal: number;
  minEstimate: number;
  maxEstimate: number;
}

export function calculateBalconyQuote(
  input: CalculationInput,
  config: PricingConfig = CELIKPEN_PRICING_CONFIG
): CalculationResult {
  const activeFronts =
    input.geometry === 'duz' ? 1 : input.geometry === 'l_tipi' ? 2 : 3;
  const totalWidthCm = input.widthsCm
    .slice(0, activeFronts)
    .reduce((acc, val) => acc + Math.max(0, val), 0);

  const safeHeightCm = Math.max(100, input.heightCm);
  const totalWidthMeters = Number((totalWidthCm / 100).toFixed(2));
  const heightMeters = Number((safeHeightCm / 100).toFixed(2));
  // Alan, yuvarlanmış metre değerleri yerine ham cm ölçülerinden tek seferde
  // 2 ondalığa yuvarlanır; 2,45 m gibi ondalıklı girişlerde sapma oluşmaz.
  const rawAreaM2 = Number(((totalWidthCm * safeHeightCm) / 10000).toFixed(2));
  const billableAreaM2 = Number(
    Math.max(config.minBillableAreaM2, rawAreaM2).toFixed(2)
  );

  const system = config.systems[input.systemId];
  const glass = config.glassOptions[input.glassId];
  const profile = config.profileColors[input.profileId];

  const effectiveUnitPricePerM2 = Math.round(
    (system.netPricePerM2 + glass.extraPerM2) * profile.multiplier
  );

  const baseSystemCost = Math.round(billableAreaM2 * effectiveUnitPricePerM2);

  let addonsCost = 0;
  if (input.includeCatScreen) {
    addonsCost += config.addons.catScreenPerUnit;
  }
  if (input.includePleatedBlind) {
    addonsCost += Math.round(billableAreaM2 * config.addons.pleatedBlindPerM2);
  }

  const subtotal = baseSystemCost + addonsCost;
  const discountAmount = input.isBulkBuilding
    ? Math.round(subtotal * config.bulkBuildingDiscountRate)
    : 0;
  const netTotal = subtotal - discountAmount;

  const tol = config.quoteTolerancePercent / 100;
  const minEstimate = Math.round((netTotal * (1 - tol)) / 100) * 100;
  const maxEstimate = Math.round((netTotal * (1 + tol)) / 100) * 100;
  const panelCountEstimate = Math.max(3, Math.ceil(totalWidthCm / 65));

  return {
    totalWidthMeters,
    heightMeters,
    rawAreaM2,
    billableAreaM2,
    panelCountEstimate,
    effectiveUnitPricePerM2,
    baseSystemCost,
    addonsCost,
    subtotal,
    discountAmount,
    netTotal,
    minEstimate,
    maxEstimate,
  };
}
