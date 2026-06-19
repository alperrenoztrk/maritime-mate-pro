import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Sıcaklık ve yoğunluk ölçümü",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 3,
  estimatedPages: 16,
  intro: `Yük hacminin ağırlığa ve standart koşullara dönüştürülmesi, doğru sıcaklık ve yoğunluk (density) ölçümüne bağlıdır. Hatalı T veya density, B/L miktarında ticari fark ve cargo claim yaratır. Bu bölüm çok noktalı sıcaklık ölçümünü, density tayinini ve API/ASTM tabloları ile düzeltmeyi ele alır.`,
  sources: [
    "API MPMS — Manual of Petroleum Measurement Standards",
    "ISO 91 — Petroleum measurement tables (54B/6B)",
    "ISGOTT 6th edition",
  ],
  chapters: [
    {
      heading: "1. Sıcaklık Ölçümü",
      sections: [
        {
          subheading: "1.1 Çok noktalı ölçüm",
          paragraphs: [
            `Tank içi sıcaklık homojen değildir; özellikle ısıtmalı (heated) kargolarda dikey gradyan vardır. Bu nedenle top/middle/bottom (üst/orta/alt) noktalardan ölçüm alınır ve ağırlıklı ortalama hesaplanır. Kapalı sistem portable elektronik termometre (MMC tipi) tercih edilir.`,
          ],
          bullets: [
            `Üç seviye (top/middle/bottom) ölçüm`,
            `Isıtmalı kargoda gradyan dikkate alınır`,
            `Kalibrasyonu geçerli portable cihaz`,
          ],
        },
      ],
    },
    {
      heading: "2. Yoğunluk (Density) Tayini",
      sections: [
        {
          subheading: "2.1 Hidrometre / refraktometre",
          paragraphs: [
            `Density numune üzerinden hidrometre (areometre) veya laboratuvar yöntemiyle belirlenir; çoğu zaman kıyı analiz sertifikası (certificate of quality) referans alınır. Ölçüm sıcaklığı kaydedilir çünkü density sıcaklığa bağlıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Observed vs standard",
              text: `Ölçülen (observed) density daima ölçüm sıcaklığıyla birlikte kaydedilir; standart 15°C density'ye tablo ile dönüştürülür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Tablolarla Düzeltme",
      sections: [
        {
          subheading: "3.1 ASTM/API 54B ve hacim→ağırlık",
          paragraphs: [
            `Gross observed volume (GOV), ortalama sıcaklık ve standart density ile ASTM table 54B kullanılarak gross standard volume (GSV) elde edilir; WCF (weight correction factor) ile ağırlığa (MT vacuum/air) dönüştürülür.`,
          ],
        },
        {
          subheading: "3.2 Güvenlik ve kayıt",
          paragraphs: [
            `Sıcak kargolarda (fuel oil, asfalt) ölçüm sırasında splash ve yanık riski vardır; uygun PPE şarttır. Sonuçlar cargo measurement report'a işlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hot oil splash",
              text: `Isıtmalı kargoda ölçüm portu açılırken sıçrama riskine karşı eldiven/yüz koruması kullanılır.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
