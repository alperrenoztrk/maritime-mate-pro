import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Jeneratör standby, auto-start ve load acceptance testi",
  shipType: "offshore",
  dept: "makine",
  opIndex: 2,
  estimatedPages: 18,
  intro: `Standby jeneratörün gerçek yedek sayılabilmesi için talep halinde doğru sırada başlaması, baraya bağlanması ve ani DP yükünü kabul etmesi gerekir. Soğuk bir motorun kâğıt üzerindeki standby durumu, gerçek hızlı yedek değildir; test sonrası yanlış konumda kalan bir selector hidden failure yaratır. Bu bölüm auto-start ve load acceptance testini ele alır.`,
  sources: [
    "IMCA M190",
    "IMCA M206",
    "Maker maintenance manual",
    "Vessel PMS",
  ],
  chapters: [
    {
      heading: "1. Başlatma Şartları",
      sections: [
        {
          subheading: "1.1 Ön şartlar ve logic",
          bullets: [
            `Starting air/battery, fuel, jacket water preheat ve lube oil pre-lube şartlarını kontrol et`,
            `Auto-start permissive, start failure, synchronisation ve breaker close logic'ini test et`,
            `Load acceptance/rejection performansını FMEA ve maker limitleriyle karşılaştır`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Soğuk motor ≠ hızlı yedek",
              text: `Soğuk motorun kâğıt üzerindeki standby durumu gerçek hızlı yedek değildir; preheat/pre-lube olmadan load acceptance başarısız olabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Test Sonrası Geri Alma",
      sections: [
        {
          subheading: "2.1 Selector ve bypass kontrolü",
          paragraphs: [
            `Failed/slow start bulgusu ASOG statüsüne yansıtılır ve yedek sıra güncellenir. Testten sonra tüm selector, breaker ve alarm bypasslar operasyon konumuna geri getirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış konumda selector",
              text: `Test sonrası local/remote selector'ın yanlış konumda kalması hidden failure yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Standby DG son kontrol",
          bullets: [
            `Preheat/pre-lube ve starting şartları sağlandı mı?`,
            `Auto-start ve breaker close logic test edildi mi?`,
            `Load acceptance maker limitlerinde mi?`,
            `Tüm selector/bypass operasyon konumuna geri alındı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
