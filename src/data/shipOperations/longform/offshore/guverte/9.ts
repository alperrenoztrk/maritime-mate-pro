import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP capability, consequence analysis ve footprint değerlendirmesi",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 9,
  estimatedPages: 20,
  intro: `Capability plot geminin belirli draft ve konfigürasyonda hangi çevre şartına kadar mevkiyi tutabileceğini tahmin eder; consequence analysis tek hata sonrası sonucu online hesaplar; footprint ise gerçek station-keeping performansını gösterir. Bu üç araç birlikte değerlendirilmeden operasyon zarfının güvenli olduğu söylenemez. Bu bölüm üçünün birlikte okunmasını ele alır.`,
  sources: [
    "IMCA M140 (Capability Plots)",
    "IMCA M103",
    "IMCA M220",
    "Vessel FMEA",
  ],
  chapters: [
    {
      heading: "1. Tahmin ve Gerçek Performans",
      sections: [
        {
          subheading: "1.1 Capability ve consequence",
          bullets: [
            `Capability plot'ta mevcut draft, thruster konfigürasyonu ve çevresel yön için marjı kontrol et`,
            `Online consequence analysis'in switchboard/DG/thruster durumunu doğru algıladığını doğrula`,
            `WCF sonrası kalan güç ve itkinin operasyon limitini karşıladığını incele`,
          ],
        },
        {
          subheading: "1.2 Footprint ile karşılaştırma",
          paragraphs: [
            `Footprint plot ile gerçek pozisyon-baş dağılımı, thrust kullanımı ve çevresel trend kaydedilir. Model ile saha performansı uyuşmazsa limitler azaltılır, sebep araştırılır ve ASOG'a göre hareket edilir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Yorumlama Tuzakları",
      sections: [
        {
          subheading: "2.1 Tahminin sınırı",
          callouts: [
            {
              type: "warning",
              title: "Capability bir tahmindir",
              text: `Capability plot ani squall, soliton, thruster derating veya etkileşimi tam yansıtmayabilir; 'green' consequence analysis, yanlış konfigürasyon girdisini telafi etmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Değerlendirme son kontrol",
          bullets: [
            `Capability marjı mevcut çevre yönü için yeterli mi?`,
            `Consequence analysis gerçek konfigürasyonu yansıtıyor mu?`,
            `Footprint gerçek performansı model beklentisiyle uyumlu mu?`,
            `Uyuşmazlıkta limit azaltıldı ve kayıt tutuldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
