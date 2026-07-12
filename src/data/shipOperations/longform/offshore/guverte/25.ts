import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP dokümantasyonu ve operasyon kayıtları",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 25,
  estimatedPages: 18,
  intro: `Gemiye özel DP bilgisi; tek kaynaktan erişilebilir, güncel ve vardiya ekibince anlaşılmış halde tutulmalıdır. Genel üretici kılavuzu, gemiye özel failure effect ve prosedürün yerini tutmaz; eksik saat sıralaması olay incelemesinde kritik kanıt kaybına neden olur. Bu bölüm DP doküman kontrolü ve kayıt disiplinini ele alır.`,
  sources: [
    "IMCA M109 (DP Documentation)",
    "IMCA M103",
    "ISM Code",
    "Vessel document control procedure",
  ],
  chapters: [
    {
      heading: "1. Doküman Kontrolü",
      sections: [
        {
          subheading: "1.1 Güncel revizyonlar",
          bullets: [
            `DP Operations Manual, FMEA, trials, capability plots, CAMO/TAM, ASOG ve maker manual revizyonlarını kontrol et`,
            `Interface/bridging document, project procedure ve saha çizimlerinin güncel kopyasını DP istasyonunda hazır tut`,
            `Eski revizyonları kullanım dışı işaretle ve dağıtım listesini güncelle`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Genel kılavuz yetmez",
              text: `Genel üretici kılavuzu, gemiye özel failure effect ve prosedürün yerini tutmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Operasyon Kaydı",
      sections: [
        {
          subheading: "2.1 DP log içeriği",
          paragraphs: [
            `DP loguna DP'ye giriş/çıkış zamanı, görev, mevki, baş, online ekipman, PRS, çevre, alarm ve statü değişiklikleri kaydedilir. Bakım, bypass, defect, test ve drill kayıtları ilgili teknik dosyayla ilişkilendirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Saat sıralaması",
              text: `Eksik saat sıralaması, olay incelemesinde kritik kanıt kaybına neden olur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Dokümantasyon son kontrol",
          bullets: [
            `Tüm DP dokümanları güncel revizyonda mı?`,
            `DP istasyonunda saha çizimleri/bridging document hazır mı?`,
            `DP logbook zaman damgalı ve eksiksiz mi?`,
            `Document revision register ve defect/bypass log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
