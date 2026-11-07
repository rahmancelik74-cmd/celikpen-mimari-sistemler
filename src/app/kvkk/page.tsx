import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '../../config/seo.config';
import { LegalPage, LEGAL_CONTACT as C } from '../../components/LegalPage';

export const metadata: Metadata = generatePageMetadata({
  title: 'KVKK Aydınlatma Metni — Çelikpen',
  description:
    '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Çelikpen aydınlatma metni: veri sorumlusu, işleme amaçları, hukuki sebepler ve ilgili kişi hakları.',
  path: '/kvkk',
  keywords: ['KVKK aydınlatma metni', 'Çelikpen kişisel veriler'],
});

export default function KvkkPage() {
  return (
    <LegalPage
      breadcrumbLabel="KVKK Aydınlatma Metni"
      title="KVKK Aydınlatma Metni"
      subtitle="6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca hazırlanmıştır."
      sections={[
        {
          heading: 'Veri Sorumlusu Kimliği',
          paragraphs: [
            `Veri sorumlusu: ${C.title}.`,
            `Adres: ${C.address}`,
          ],
          items: [`Telefon: ${C.phone}`, `E-posta: ${C.email}`],
        },
        {
          heading: 'İşlenen Kişisel Veriler',
          items: [
            'Kimlik bilgileri: ad, soyad.',
            'İletişim bilgileri: telefon numarası, e-posta adresi, adres/mahalle bilgisi.',
            'Müşteri işlem bilgileri: talep edilen ürün/sistem, ölçü ve keşif bilgileri, form ve mesaj içerikleri.',
            'İşlem güvenliği bilgileri: IP adresi, tarayıcı ve cihaz bilgisi, erişim kayıtları.',
          ],
        },
        {
          heading: 'İşleme Amaçları ve Hukuki Sebepler',
          paragraphs: [
            'Kişisel verileriniz; keşif ve fiyat tekliflerinin hazırlanması, taleplerinize dönüş yapılması, sözleşme süreçlerinin yürütülmesi, satış sonrası hizmetler, site güvenliğinin sağlanması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.',
          ],
          items: [
            "KVKK m. 5/2-c: Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması.",
            "KVKK m. 5/2-ç: Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi için zorunlu olması.",
            "KVKK m. 5/2-f: İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati için zorunlu olması.",
            'Açık rıza gerektiren işlemlerde (ör. isteğe bağlı analitik/pazarlama çerezleri) ayrıca açık rızanız alınır.',
          ],
        },
        {
          heading: 'Üçüncü Taraflara Aktarım',
          paragraphs: [
            'Kişisel verileriniz; yasal yükümlülükler çerçevesinde yetkili kamu kurum ve kuruluşlarına, web sitesi altyapısı ve barındırma (yer sağlayıcı) hizmeti aldığımız tedarikçilere, iletişim kanalı olarak kullanılan WhatsApp gibi hizmet sağlayıcılara, KVKK m. 8 ve m. 9 hükümlerine uygun olarak ve yalnızca gerekli ölçüde aktarılabilir. Verileriniz üçüncü kişilere satılmaz.',
          ],
        },
        {
          heading: 'Toplama Yöntemi',
          paragraphs: [
            'Verileriniz; web sitesindeki iletişim ve yorum formları, WhatsApp, telefon, e-posta ve showroom görüşmeleri aracılığıyla otomatik veya kısmen otomatik yollarla toplanır.',
          ],
        },
        {
          heading: 'KVKK Madde 11 Kapsamındaki Haklarınız',
          items: [
            'Kişisel verilerinizin işlenip işlenmediğini öğrenme,',
            'İşlenmişse buna ilişkin bilgi talep etme,',
            'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,',
            'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,',
            'Eksik veya yanlış işlenmişse düzeltilmesini isteme,',
            "KVKK m. 7 çerçevesinde silinmesini veya yok edilmesini isteme ve bu işlemlerin aktarılan üçüncü kişilere bildirilmesini isteme,",
            'İşlenen verilerin analiz edilmesi suretiyle aleyhinize bir sonuç doğmasına itiraz etme,',
            'Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme.',
          ],
        },
        {
          heading: 'Başvuru Yöntemi',
          paragraphs: [
            `Haklarınıza ilişkin taleplerinizi kimliğinizi doğrulayan bilgilerle birlikte yazılı olarak ${C.address} adresine elden/posta yoluyla veya ${C.email} e-posta adresine iletebilirsiniz. Başvurular en geç 30 gün içinde ücretsiz olarak sonuçlandırılır; işlemin ayrıca maliyet gerektirmesi halinde Kurul tarafından belirlenen tarife uygulanabilir.`,
          ],
        },
      ]}
    />
  );
}
