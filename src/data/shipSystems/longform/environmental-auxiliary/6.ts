import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Provision Refrigeration (Soğuk Depo) Sistemi",
  sectionId: "environmental-auxiliary",
  topicIndex: 6,
  estimatedPages: 21,
  intro: `Provizyon soğutma (provision refrigeration) sistemi, geminin gıda erzakını (et, balık, sebze, süt ürünü) farklı sıcaklıktaki soğuk depolarda (cold rooms) saklayarak uzun seferlerde gıda güvenliğini sağlar. Bir soğutma çevrimi birden çok depoyu farklı set sıcaklıklarında besler. Bu bölüm; soğutma çevrimini (kompresör-kondenser-genleşme-evaporatör) ve soğutucu akışkanı, çoklu depo sıcaklık kontrolünü (et/balık dondurucu, sebze/günlük soğuk), defrost ve nem kontrolünü, gıda hijyeni ve sıcaklık kaydını, çevre (soğutucu gaz/F-gas) konularını ve bakım/arızayı ele alır.`,
  sources: [
    "MLC 2006 — food storage & safety",
    "WHO/FAO gıda güvenliği rehberleri",
    "Klas kuralları — provision refrigeration",
    "Üretici el kitapları (soğutma sistemleri)",
  ],
  chapters: [
    {
      heading: "1. Soğutma Çevrimi",
      sections: [
        {
          subheading: "1.1 Çevrim ve akışkan",
          paragraphs: [
            `Soğutma çevrimi: kompresör soğutucu gazı sıkıştırır (sıcak/yüksek basınç), kondenser (deniz suyu/hava soğutmalı) ısıyı atar ve gazı sıvılaştırır, genleşme valfi basıncı düşürür, evaporatör (depo içinde) düşük basınçta buharlaşırken depodan ısı çeker. Modern sistemler çevre dostu soğutucu (düşük GWP) kullanır.`,
          ],
          bullets: [
            `Kompresör → kondenser → genleşme → evaporatör`,
            `Evaporatör depodan ısı çeker`,
            `Düşük GWP soğutucu (F-gas uyumu)`,
          ],
        },
        {
          subheading: "1.2 Çoklu depo sıcaklık kontrolü",
          paragraphs: [
            `Bir kompresör ünitesi birkaç depoyu (et dondurucu ~-18 °C, balık ~-25 °C, sebze/günlük ~+2..+5 °C) besler; her deponun evaporatörü termostatik genleşme valfi ve solenoid ile ayrı sıcaklıkta tutulur. Düşük sıcaklık talebine göre kompresör yükü ayarlanır.`,
          ],
          table: {
            headers: ["Depo", "Tipik sıcaklık"],
            rows: [
              ["Balık dondurucu", "~ -25 °C"],
              ["Et dondurucu", "~ -18 °C"],
              ["Süt/günlük", "~ +2..+4 °C"],
              ["Sebze/meyve", "~ +4..+8 °C"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Defrost, Nem ve Hijyen",
      sections: [
        {
          subheading: "2.1 Defrost ve nem",
          paragraphs: [
            `Evaporatör üzerinde biriken buz (frost) ısı transferini düşürür; periyodik defrost (sıcak gaz/elektrik) bu buzu eritir. Aşırı nem sebze deposunda çürümeye, düşük nem kurumaya yol açar; havalandırma ve nem dengesi gıda kalitesini korur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Buzlanma = verim kaybı",
              text: `Defrost yetersizse evaporatör buzla kaplanır, soğutma düşer ve kompresör aşırı çalışır. Düzenli defrost şarttır.`,
            },
          ],
        },
        {
          subheading: "2.2 Gıda hijyeni ve sıcaklık kaydı",
          paragraphs: [
            `Gıda güvenliği için depo sıcaklıkları düzenli izlenir ve kaydedilir; soğuk zincir kırılırsa erzak bozulur. Çapraz kontaminasyon önlenir (çiğ et ayrı), depolar temiz tutulur. MLC, yeterli ve uygun saklanan gıda gerektirir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Bakım ve Arıza",
      sections: [
        {
          subheading: "3.1 Bakım",
          paragraphs: [
            `Bakım; soğutucu şarj ve kaçak kontrolü, kompresör yağ seviyesi, kondenser (deniz suyu tarafı) temizliği, defrost fonksiyonu, kapı conta ve termostat kontrolünü kapsar. Soğutucu gaz kaçağı çevre ve verim açısından önemlidir.`,
          ],
          bullets: [
            `Soğutucu kaçak/şarj kontrolü`,
            `Kondenser deniz suyu tarafı temizliği`,
            `Kapı conta ve defrost kontrolü`,
          ],
        },
        {
          subheading: "3.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Depo soğumuyor", "Soğutucu az/kompresör", "Şarj/kaçak ve kompresör kontrol"],
              ["Aşırı buzlanma", "Defrost arızası", "Defrost devresi kontrol"],
              ["Kompresör sürekli çalışıyor", "Conta/buz/yük", "Kapı conta + defrost"],
              ["Yüksek basınç alarmı", "Kondenser kirli/deniz suyu az", "Kondenser temizlik, su debisi"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
