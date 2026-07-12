import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Pozisyon referans sistemlerinin seçimi ve izlenmesi",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 7,
  estimatedPages: 20,
  intro: `DP'nin mevkiyi tutabilmesi, birbirinden bağımsız ve güvenilir pozisyon referans sistemlerine (PRS) bağlıdır. Mutlak (DGNSS) ve göreceli (HPR/USBL, taut wire, laser, microwave) referanslar, ortak hata ihtimalini azaltacak şekilde seçilir ve operasyon boyunca bağımsız izlenir. Bu bölüm PRS seçimi, doğrulama ve sapma yönetimini ele alır.`,
  sources: [
    "IMCA M252 (Position Reference Systems)",
    "IMCA M103",
    "Maker PRS manuals",
  ],
  chapters: [
    {
      heading: "1. Referans Seçimi",
      sections: [
        {
          subheading: "1.1 Görev ve derinliğe göre kombinasyon",
          paragraphs: [
            `Görev ve su derinliğine göre DGNSS, HPR/USBL, taut wire, laser, microwave veya relative PRS kombinasyonu seçilir. Aynı uydu/düzeltme kaynağını kullanan iki GNSS'nin gerçek anlamda bağımsız olmayabileceği değerlendirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sahte bağımsızlık",
              text: `İki GNSS aynı düzeltme servisini kullanıyorsa ortak-mode hataya birlikte açıktır; bu bir yedeklilik değildir.`,
            },
          ],
        },
        {
          subheading: "1.2 Kurulum doğrulaması",
          bullets: [
            `Koordinat datumu, hedef kimliği, anten/lever-arm değerleri`,
            `Tesis ofsetleri ve relative hedef tanımları`,
          ],
        },
      ],
    },
    {
      heading: "2. İzleme ve Sapma Yönetimi",
      sections: [
        {
          subheading: "2.1 Monitor → enable",
          paragraphs: [
            `Yeni referans önce monitor konumunda gözlenir; residual, variance ve trend tutarlıysa kontrollü biçimde enable edilir. Bir referans saparsa hemen deselect etmek yerine ortak sensör, hedef, geometri ve çevresel nedenler karşılaştırılır.`,
          ],
        },
        {
          subheading: "2.2 Ağırlıklandırma ve tek referans",
          callouts: [
            {
              type: "warning",
              title: "Fark edilmeden tek referans",
              text: `Yanlış hedef seçimi veya multipath, doğru görünen fakat tehlikeli göreceli mevki üretebilir. Fark edilmeden tek referansa düşmek ASOG statüsünü değiştirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 PRS son kontrol",
          bullets: [
            `En az iki bağımsız (ortak-hata riski düşük) referans devrede mi?`,
            `Datum, hedef, lever-arm ve ofsetler doğrulandı mı?`,
            `Yeni referans monitor'da doğrulanıp enable edildi mi?`,
            `Reference comparison log tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
