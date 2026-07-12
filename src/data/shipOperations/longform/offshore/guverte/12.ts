import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "SIMOPS, interface document ve iletişim yönetimi",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 12,
  estimatedPages: 20,
  intro: `Aynı sahada eşzamanlı yürüyen faaliyetler (SIMOPS) birbiri için tehlike üretir: dalış ile crane, drilling ile supply, bunkering ile helicopter. Bu tehlikeler önceden tanımlanıp tek bir arayüz planı ve net komuta zinciriyle yönetilmezse, acil ayrılma kararı gecikir. Bu bölüm SIMOPS matrisi, bridging document ve iletişim planını ele alır.`,
  sources: [
    "IMCA M203 (SIMOPS)",
    "IMCA M125",
    "Project SIMOPS plan & Permit to Work system",
  ],
  chapters: [
    {
      heading: "1. Çakışmaların Tanımlanması",
      sections: [
        {
          subheading: "1.1 SIMOPS matrisi",
          bullets: [
            `Dalış, ROV, crane, drilling, supply, helicopter, bunkering ve diğer gemi hareketleri arasındaki çakışmaları belirle`,
            `Tüm taraflarla SIMOPS toplantısı yap`,
            `Operasyon, PTW ve iletişimde kimin öncelikli yetkiye sahip olduğunu yaz`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Green herkes için değildir",
              text: `Bir tarafın green durumu, diğer tarafın faaliyetinin güvenli olduğu anlamına gelmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Arayüz ve İletişim",
      sections: [
        {
          subheading: "2.1 Bridging document ve kanallar",
          paragraphs: [
            `Interface/bridging document ile prosedür ve SMS farklılıkları kapatılır. İletişim kanalları, çağrı adları, alert kelimeleri, kayıp iletişim aksiyonu ve ortak acil durumlar mutabık kalınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Belirsiz komuta zinciri",
              text: `Belirsiz komuta zinciri, acil ayırma kararını geciktirir; kimin 'stop' diyebileceği önceden nettir.`,
            },
          ],
        },
        {
          subheading: "2.2 Günlük koordinasyon",
          bullets: [
            `Hava, program, izolasyon, gemi hareketi ve ASOG durumunu güncelle`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 SIMOPS son kontrol",
          bullets: [
            `SIMOPS matrisi ve öncelik yetkisi yazılı mı?`,
            `Bridging document prosedür farklarını kapatıyor mu?`,
            `İletişim planı, alert kelimesi ve kayıp iletişim aksiyonu mutabık mı?`,
            `Günlük koordinasyon toplantısı yapıldı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
