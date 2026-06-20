import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Araç güvertesi zorunlu havalandırma sistemi kontrolü",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 7,
  estimatedPages: 16,
  intro: `Araç güverteleri için zorunlu mekanik havalandırma, egzoz/CO ve yakıt buharını tahliye ederek hem sağlık hem patlama riskini yönetir; SOLAS belirli hava değişim oranı zorunlu kılar. Bu bölüm ventilasyon sistemini (makine tarafı) ele alır.`,
  sources: ["SOLAS II-2 Reg. 20 (vehicle spaces)", "Class ventilation requirements"],
  chapters: [
    {
      heading: "1. Sistem",
      sections: [
        {
          subheading: "1.1 Fan kapasitesi ve hava değişimi",
          paragraphs: [
            `Fanlar belirlenen hava değişim oranını sağlayacak kapasitede çalışır; araç elleçleme sırasında tam kapasite, seyirde gereken oranda işletilir. Fan arızası alarmla bildirilir.`,
          ],
          bullets: [`Fan kapasitesi/hava değişimi`, `Elleçlemede tam kapasite`, `Fan arıza alarmı`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 CO/patlayıcı buhar",
          paragraphs: [`Yetersiz ventilasyon CO birikimi ve yakıt buharı kaynaklı patlama riski yaratır; sistem sürekli işler durumda tutulur.`],
          callouts: [
            { type: "warning", title: "Ventilasyon arızası", text: `Araç güvertesi ventilasyon arızası ölümcül CO ve patlama riski yaratır; derhal müdahale edilir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Fanlar çalışıyor mu?`, `Hava değişimi yeterli mi?`, `Alarmlar çalışıyor mu?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
