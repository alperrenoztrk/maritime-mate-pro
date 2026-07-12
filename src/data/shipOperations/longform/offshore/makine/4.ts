import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP UPS ve control-power yedekliliği",
  shipType: "offshore",
  dept: "makine",
  opIndex: 4,
  estimatedPages: 18,
  intro: `DP bilgisayarları, operator station, PRS ve sensörler kesintisiz ve bağımsız control power'a bağlıdır; bu güç UPS'lerle sağlanır. UPS'ler thrusterları beslemez — control power mevcutken propulsion power kaybolabilir — ve ortak bir maintenance bypass iki UPS'yi tek hata noktasına çevirebilir. Bu bölüm UPS ve control-power yedekliliğini ele alır.`,
  sources: [
    "IMO MSC.1/Circ.1580",
    "IMCA M206",
    "IMCA M166",
    "UPS maker manual",
  ],
  chapters: [
    {
      heading: "1. Besleme Haritası",
      sections: [
        {
          subheading: "1.1 Hangi UPS neyi besliyor",
          bullets: [
            `Her UPS'nin beslediği controller, console, PRS, gyro, MRU ve network ekipmanını distribution çiziminden doğrula`,
            `Normal, bypass ve alternate supply konumlarını; charger, inverter ve battery alarmını kontrol et`,
            `Bir UPS kaybının diğer redundant group'u veya ortak network switch'i etkilemediğini FMEA ile karşılaştır`,
          ],
          callouts: [
            {
              type: "warning",
              title: "UPS thruster beslemez",
              text: `UPS thrusterları beslemez; control power mevcutken propulsion power kaybolabilir. Ortak maintenance bypass iki UPS'yi tek hata noktasına çevirebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Batarya ve Geri Dönüş",
      sections: [
        {
          subheading: "2.1 Autonomy testi",
          paragraphs: [
            `Battery autonomy/capacity testi planlı prosedürle yapılır ve kötü hücreler trendlenir. Bypass sonrası sistemin normal yedekli konfigürasyona döndüğü iki kişiyle doğrulanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 UPS son kontrol",
          bullets: [
            `UPS besleme haritası distribution çizimiyle doğrulandı mı?`,
            `Charger/inverter/battery alarmları temiz mi?`,
            `Battery autonomy testi yapıldı ve trendlendi mi?`,
            `Bypass sonrası yedekli konfigürasyon iki kişiyle doğrulandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
