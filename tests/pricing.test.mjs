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
assert.equal(quoteStandard.netTotal, 51072, '7.98 m² x 6400 TL must equal 51,072 TL');

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

assert.equal(quoteBulk.discountAmount, 7661, '15% bulk discount amount must equal 7,661 TL');
assert.equal(quoteBulk.netTotal, 43411, '15% bulk building discount verified (43,411 TL)');

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

// 4. Config sabitliği doğrulaması
assert.equal(
  CELIKPEN_PRICING_CONFIG.systems.vbs_isicam.netPricePerM2,
  6400,
  'VBS Isıcam unit price must be 6400 TL/m²'
);

console.log('✅ Çelikpen Pricing Engine Verification Passed: 7.98m² -> 51,072 TL (Bulk: 43,411 TL, MinArea: 3.5m²)');
