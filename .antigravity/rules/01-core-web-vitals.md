---
name: core-web-vitals
description: LCP, CLS ve INP performans kuralları (95-100 PageSpeed hedefi)
---
# Core Web Vitals Mühendislik Kuralları

1. **Sıfır Slider Kuralı**: Hero (Manşet) alanında carousel/slider kullanılmaz. Sol sütunda Çelikpen Kocasinan değer önerisi ve mimari görsel önizlemesi, sağ sütunda ise doğrudan `PriceCalculator` yer alır.
2. **Görsel Optimizasyonu**: Tüm görsellerde açıklayıcı Türkçe + mahalle odaklı `alt` etiketi (ör. `"Bahçelievler Kocasinan 4+20+4 Argon Gazlı Isıcamlı Cam Balkon Uygulaması"`) bulunmalıdır.
3. **Video Facade**: Ürün montaj ve ses/desibel testi videoları başlangıçta yalnızca hafif bir kapak görseli ve Play butonu olarak render edilir.
