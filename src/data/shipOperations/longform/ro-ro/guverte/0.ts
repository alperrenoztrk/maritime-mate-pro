import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Araç rampa açılış/kapanış prosedürü",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 0,
  estimatedPages: 18,
  intro: `Ro-Ro gemisinde stern/bow/side rampa, araçların gemiye giriş-çıkışını sağlar; rampa ve bow door'un sızdırmazlığı, kapanış kilidi ve interlock'u gemi güvenliğinin kritik unsurudur. Herald of Free Enterprise ve Estonia felaketleri, kapı/rampa disiplininin önemini trajik biçimde göstermiştir. Bu bölüm rampa operasyonunu ele alır.`,
  sources: ["SOLAS II-1 (subdivision)", "SOLAS II-1 Reg. 23 (special category spaces)", "Rampa maker manuals"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Açılış/kapanış ve kilit",
          paragraphs: [
            `Rampa hidrolik ile maker prosedürüne göre açılır/kapanır; kapanışta tüm kilitler (locking pins/cleats) bağlanır ve gösterge panelinde "secured/closed" durumu doğrulanır. Bow visor/door interlock sistemi kontrol edilir.`,
          ],
          bullets: [`Hidrolik prosedür`, `Kilit/locking pin doğrulama`, `Indicator panel "closed/secured"`, `Interlock kontrolü`],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Denize çıkmadan önce",
          paragraphs: [
            `Gemi rıhtımdan ayrılmadan rampa/bow door kapalı ve kilitli olduğu fiziksel ve göstergeden doğrulanır; açık/yarı kapalı kapı ile denize çıkmak su girişi ve hızlı alabora riski yaratır.`,
          ],
          callouts: [
            { type: "example", title: "Herald of Free Enterprise (1987)", text: `Bow door açık denize çıkıldı; araç güvertesine su girince gemi dakikalar içinde alabora oldu, 193 kişi öldü. Kapı durumu kalkıştan önce mutlaka teyit edilmelidir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Rampa/bow door kapalı/kilitli mi?`, `Indicator panel teyit edildi mi?`, `Sızdırmazlık kontrol edildi mi?`, `Kalkış öncesi doğrulama yapıldı mı?`],
        },
      ],
    },
  ],
};

export default content;
