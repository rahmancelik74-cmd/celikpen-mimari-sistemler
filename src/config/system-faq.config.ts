import type { FaqItem } from './site.config';

export const SYSTEM_FAQS: Record<string, FaqItem[]> = {
  'vns-katlanir-cam-balkon': [
    {
      question: '8mm ile 10mm temperli katlanır cam balkon arasındaki fark nedir?',
      answer:
        'Ara kat ve rüzgar yükü normal balkonlarda 8mm temperli cam yeterlidir. 6. kat ve üzeri yüksek cephelerde veya geniş açıklıklarda rüzgar esnemesini minimuma indirmek için 10mm Pro seri önerilir.',
    },
    {
      question: 'L ve U tipi balkonlarda köşe direği görüntüyü kapatır mı?',
      answer:
        'Winsa Vera serisinde hareketli köşe profili kullanıldığı için kanatlar köşeden dönerek tek bir noktada toplanır; sabit köşe direği kalmaz ve balkon tamamen açılır.',
    },
    {
      question: 'Katlanır cam balkon kanatları nasıl temizlenir?',
      answer:
        'Tüm kanatlar balkonun iç tarafına doğru 90 derece katlanarak açıldığı için dış cepheye sarkmadan, balkon içerisinden güvenle silinebilir.',
    },
  ],
  'vbs-isicamli-cam-balkon': [
    {
      question: '4+20+4 Argon gazlı ısıcamlı sistem kışın terleme ve buğulanma yapar mı?',
      answer:
        'İki temperli cam arasındaki 20mm boşlukta bulunan Argon gazı ve nem alıcı moleküler elek çıtası sayesinde iç-dış ısı köprüsü kesilir; tek cama kıyasla terleme ve buğulanma minimuma iner.',
    },
    {
      question: 'Isıcamlı cam balkonun her iki camı da temperli (güvenlikli) midir?',
      answer:
        'Evet. Winsa Vera Termal serisinde hem iç hem dış 4mm plakalar TSE EN 12150 Şişecam temperli olarak üretilir; darbe dayanımı standart düz cama göre 5 kat yüksektir.',
    },
    {
      question: 'Şirinevler ve E-5 gibi gürültülü caddelerde ne kadar ses keser?',
      answer:
        '28mm toplam cam kalınlığı ve alüminyum mıknatıslı fitil birleşimi sayesinde dış ortam trafik gürültüsünü 38 dB seviyesine kadar azaltır.',
    },
  ],
  'vds-esiksiz-surme-cam-balkon': [
    {
      question: 'Eşiksiz sürme sistemde ayak takılması olur mu?',
      answer:
        'Alt kasa profili yalnızca 8mm yüksekliğinde ve pahlı (eğimli) tasarlandığı için balkon kapısından çıkışta eşik engeli oluşturmaz; çocuklar ve tekerlekli geçişler için uygundur.',
    },
    {
      question: 'Sürme cam balkona kedi tüllü sineklik takılabilir mi?',
      answer:
        'Evet. Çok raylı kasa yapısı sayesinde cam kanatlarla aynı ray sistemi üzerinde çalışan sürgülü çelik/kedi tüllü sineklik entegre edilebilir.',
    },
    {
      question: 'Sürme sistem dar balkonlarda ne kadar alan kazandırır?',
      answer:
        'Kanatlar içeriye doğru açılmayıp kendi rayı üzerinde yana kaydığı için balkon içindeki masa, sandalye ve dolap mesafesinden sıfır kayıp yaşanır.',
    },
  ],
  'vgs-motorlu-giyotin-cam': [
    {
      question: 'Motorlu giyotin cam açıkken balkon korkuluğu görevi görür mü?',
      answer:
        'Evet. Sistem tam açıldığında hareketli kanatlar en alt sabit panelin hizasında toplanır ve yaklaşık 110 cm yüksekliğinde güvenli cam küpeşte (korkuluk) oluşturur.',
    },
    {
      question: 'Elektrik kesildiğinde veya kumanda pil bittiğinde ne olur?',
      answer:
        'Somfy ve Becker tüp motorlar aşırı yük korumalıdır; opsiyonel kesintisiz güç kaynağı (UPS) veya çok kanallı yedek duvar butonu ile kontrol devam eder.',
    },
    {
      question: 'Giyotin sistemlerde zincir mi yoksa triger kayış mı kullanılıyor?',
      answer:
        'Projenin ölçüsüne göre çift sıra çelik zincir veya çelik telli sessiz triger kayış mekanizması kullanılır; sistem genelinde 10 yıl Çelikpen garantisi altındadır.',
    },
  ],
  'kis-bahcesi-ve-bioklimatik-tavan': [
    {
      question: 'Kış bahçesi tavanında yağmur suyu tahliyesi nasıl yapılır?',
      answer:
        'Bioklimatik lameller ve cam tavan profilleri suyu çevresel gizli oluklara, oradan da taşıyıcı alüminyum dikme profillerinin içinden zemine sızdırmaz şekilde tahliye eder.',
    },
    {
      question: 'Teras kapatma ve kış bahçesi için apartmandan izin gerekir mi?',
      answer:
        'Kat Mülkiyeti Kanunu Madde 19 kapsamında kat maliklerinin 4/5 yazılı muvafakatnamesi alınması önerilir; keşif ekibimiz hazır muvafakatname dosyasını ücretsiz sunar.',
    },
    {
      question: 'Bioklimatik tavanın altına hangi cam balkon serisi uygulanır?',
      answer:
        'Kullanım amacına göre cephelere Winsa Vera Termal Isıcamlı Katlanır, Winsa Vera Slide Eşiksiz Sürme veya Winsa Vera Vertical Motorlu Giyotin cam sistemleri tam uyumlu olarak entegre edilir.',
    },
  ],
};
