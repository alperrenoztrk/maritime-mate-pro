import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Power Management System, load sharing ve spinning reserve",
  shipType: "offshore",
  dept: "makine",
  opIndex: 1,
  estimatedPages: 20,
  intro: `DP talebi sürekli değişirken frekans, yük paylaşımı ve yeterli döner yedek (spinning reserve) korunmalı; aksi halde overload veya blackout gelişir. Sadece toplam plant yüzdesine bakmak, bir switchboard grubundaki lokal overload'u gizleyebilir. Bu bölüm PMS yönetimi, load sharing dengesi ve spinning reserve takibini ele alır.`,
  sources: [
    "IMCA M206",
    "IMCA M220",
    "PMS maker manual",
    "Vessel ASOG",
  ],
  chapters: [
    {
      heading: "1. PMS ve Yük Paylaşımı",
      sections: [
        {
          subheading: "1.1 Doğru algı ve denge",
          bullets: [
            `PMS'nin running/standby DG, load-dependent start sırası ve breaker durumunu doğru gördüğünü doğrula`,
            `Governor/AVR load sharing ile her grup içindeki kW ve kVAr dağılımını izle`,
            `ASOG'daki DG/switchboard/thruster yük limitlerini uygula`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yüzde 80 kuralı",
              text: `DP sunumundaki yüzde 80 gösterge değeri, gemi prosedüründeki gerçek limitlerle karşılaştırılmalıdır; toplam yüzde lokal overload'u gizleyebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Spinning Reserve",
      sections: [
        {
          subheading: "2.1 Kayıp sonrası kapasite",
          paragraphs: [
            `En büyük online jeneratör veya grup kaybı sonrası frekans ve kalan kapasiteyi değerlendiren spinning reserve takip edilir. Yük trendi limite yaklaşmadan standby jeneratör başlatılıp senkronize edilir; köprüüstü bilgilendirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Dengesizlik trip yapar",
              text: `Yük paylaşım dengesizliği jeneratör trip zinciri ve loss of position oluşturabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 PMS son kontrol",
          bullets: [
            `PMS running/standby ve breaker durumunu doğru mu görüyor?`,
            `kW/kVAr paylaşımı gruplar içinde dengeli mi?`,
            `Spinning reserve en büyük grup kaybını karşılıyor mu?`,
            `Generator load trend ve spinning reserve record tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
