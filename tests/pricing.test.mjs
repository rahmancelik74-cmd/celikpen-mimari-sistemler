import assert from 'node:assert/strict';
import {
  calculateBalconyQuote,
  CELIKPEN_PRICING_CONFIG,
} from '../src/config/pricing.config.ts';

// 1. Standart 4.2m x 1.9m Isıcamlı hesaplama doğrulaması
const quoteStandard = calculateBalconyQuote({
  geometry: 'duz',
  widthsCm: [420, 0, 0],
  heightCm: 190,
  systemId: 'vbs_isicam',
  glassId: 'seffaf',
  profileId: 'antrasit',
  includeCatScreen: false,
  includePleatedBlind: false,
  isBulkBuilding: false,
});

assert.equal(quoteStandard.rawAreaM2, 7.98, 'Area calculation 4.2m x 1.9m must equal 7.98 m²');
assert.equal(quoteStandard.netTotal, 73017, '7.98 m² x 9150 TL must equal 73,017 TL');

// 2. 5+ Daire %15 toplu bina indirimi doğrulaması
const quoteBulk = calculateBalconyQuote({
  geometry: 'duz',
  widthsCm: [420, 0, 0],
  heightCm: 190,
  systemId: 'vbs_isicam',
  glassId: 'seffaf',
  profileId: 'antrasit',
  includeCatScreen: false,
  includePleatedBlind: false,
  isBulkBuilding: true,
});

assert.equal(quoteBulk.discountAmount, 10953, '15% bulk discount amount must equal 10,953 TL');
assert.equal(quoteBulk.netTotal, 62064, '15% bulk building discount verified (62,064 TL)');

// 3. Minimum faturalandırma alanı (3.5 m² taban) doğrulaması
const quoteMinArea = calculateBalconyQuote({
  geometry: 'duz',
  widthsCm: [100, 0, 0],
  heightCm: 100,
  systemId: 'vbs_isicam',
  glassId: 'seffaf',
  profileId: 'antrasit',
  includeCatScreen: false,
  includePleatedBlind: false,
  isBulkBuilding: false,
});

assert.equal(quoteMinArea.billableAreaM2, 3.5, 'Minimum billable area must be 3.5 m²');

// 4. 2026 Winsa resmi seri fiyatlarının tamamı doğrulanır
const expectedPrices = {
  vns_8mm: 5150,
  vns_10mm: 5720,
  vbs_isicam: 9150,
  vds_surme: 5900,
  vds_isicamli: 8650,
  vgs_giyotin: 9400,
  pvc_dograma: 6200,
  hs_surme: 8600,
  comfort_slide: 8600,
  pergola: 11800,
};

for (const [systemId, expectedPrice] of Object.entries(expectedPrices)) {
  assert.equal(
    CELIKPEN_PRICING_CONFIG.systems[systemId].netPricePerM2,
    expectedPrice,
    `${systemId} 2026 net m² fiyatı ${expectedPrice} TL olmalı`
  );
}

// 5. Ondalıklı (float) ölçü girişi 2 haneli alan hesabı
const quoteDecimal = calculateBalconyQuote({
  geometry: 'duz',
  widthsCm: [420.5, 0, 0],
  heightCm: 190.5,
  systemId: 'vbs_isicam',
  glassId: 'seffaf',
  profileId: 'antrasit',
  includeCatScreen: false,
  includePleatedBlind: false,
  isBulkBuilding: false,
});

assert.equal(quoteDecimal.rawAreaM2, 8.01, 'Ondalıklı ölçüler 2 hane m² olarak hesaplanmalı');
assert.equal(quoteDecimal.billableAreaM2.toFixed(2), '8.01', 'Faturalanabilir alan 2 hane gösterilmeli');

console.log('✅ Çelikpen Pricing Engine Verification Passed: 7.98m² -> 73,017 TL (Bulk: 62,064 TL, MinArea: 3.5m², Float: 8.01m²)');
