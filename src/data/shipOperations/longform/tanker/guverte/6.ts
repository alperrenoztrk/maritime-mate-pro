import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yükleme operasyonu (loading rate, topping-up)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 6,
  estimatedPages: 18,
  intro: `Yükleme operasyonu; initial (hat doldurma), bulk (tam rate) ve topping-up (final ullage'a yaklaşırken düşürülen rate) aşamalarından oluşur. Rate kontrolü hem static elektrik hem IGS basınç dengesi hem de overflow riski açısından kritiktir. Bu bölüm aşama yönetimini ve son tank kapatma disiplinini ele alır.`,
  sources: [
    "ISGOTT 6th edition",
    "Terminal regulations / loading rate limits",
    "MARPOL Annex I",
  ],
  chapters: [
    {
      heading: "1. Yükleme Aşamaları",
      sections: [
        {
          subheading: "1.1 Initial flow",
          paragraphs: [
            `İlk akış düşük rate ile başlatılır; hatların doğru tanka yönlendiği, sızıntı olmadığı ve static elektrik birikiminin sınırlı kaldığı doğrulanır. İlk ~30 dakika düşük rate static elektrik açısından kritiktir.`,
          ],
          bullets: [
            `Düşük rate, line-up doğrulama`,
            `Static elektrik kontrolü (ilk 30 dk)`,
            `Sızıntı/yanlış valf taraması`,
          ],
        },
        {
          subheading: "1.2 Bulk ve topping-up",
          paragraphs: [
            `Hat doğrulandıktan sonra terminal limitine kadar bulk rate'e çıkılır; IGS pozitif basıncı korunur. Tank %90 dolduğunda topping-up rate'ine düşülür ve son ullage manuel/kapalı ölçümle takip edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Overflow",
              text: `Topping-up'ta rate düşürülmezse son tankta overflow ve MARPOL ihlali kaçınılmazdır. Son tankı tek operatör sürekli izler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Rate ve Basınç Dengesi",
      sections: [
        {
          subheading: "2.1 IGS ve venting",
          paragraphs: [
            `Yükleme sırasında yer değiştiren tank atmosferi venting/vapour return ile tahliye edilir; rate, venting kapasitesini aşmamalıdır, aksi halde aşırı basınç ve P/V valf zorlanması olur.`,
          ],
        },
        {
          subheading: "2.2 Line clearing",
          paragraphs: [
            `Yükleme sonunda hatlar son tanka veya terminale doğru temizlenir (line clearing); hatta kalan kargo sonraki operasyonda kontaminasyon yaratabilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kayıt ve Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Initial rate düşük tutuldu mu (static)?`,
            `Bulk rate terminal limitinde mi?`,
            `Topping-up rate zamanında düşürüldü mü?`,
            `Loading log + ullage record güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
