import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "500 m güvenlik bölgesi ve worksite yaklaşımı",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 5,
  estimatedPages: 20,
  intro: `Offshore tesisin çevresindeki 500 metrelik güvenlik bölgesi, gemi ile platform/rig arasındaki temas riskinin en yüksek olduğu alandır. Yaklaşım; tesisten izin, planlı kaçış rotası, blow-on/blow-off değerlendirmesi ve kademeli hız azaltmayla yürütülür. Bu bölüm bölgeye girişten final mevkiye yerleşmeye kadar olan kontrollü yaklaşımı ele alır.`,
  sources: [
    "IMCA M103",
    "IMCA M220",
    "MSF 182 (OSV / 500 m zone)",
    "Field 500 m zone procedures",
  ],
  chapters: [
    {
      heading: "1. Yaklaşım Planı",
      sections: [
        {
          subheading: "1.1 Saha ve çevre değerlendirmesi",
          bullets: [
            `Batimetri, sualtı yapıları, mooring hatları ve tesis hareketlerini incele`,
            `Baş, rüzgâr-akıntı yönü ve WCF sonrası sürüklenme yönünü belirle`,
            `En az riskli kaçış rotasını planla`,
          ],
        },
        {
          subheading: "1.2 Blow-on / blow-off tercihi",
          callouts: [
            {
              type: "warning",
              title: "Drift-on riski",
              text: `Drift-on (rüzgâr/akıntı tesise doğru) yaklaşım tek arızada temas riskini büyütür; tercih gerekçesi risk değerlendirmesinde açıkça belirtilmelidir. Kaçış rotası planlanmadan çalışma sahasına girilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Bölgeye Giriş ve Yerleşme",
      sections: [
        {
          subheading: "2.1 İzin ve kademeli yaklaşım",
          paragraphs: [
            `500 m bölgesine giriş için tesisten izin alınır ve pre-entry checklist tamamlanır. DP bölge dışında kurulup stabilize edilir; son 250 m'de ikinci bağımsız referans devreye alınır.`,
          ],
          bullets: [
            `Son mevkiye kısa adımlar ve yerleşme aralarıyla ilerle`,
            `Yaklaşma hızı ve adım büyüklüğünü saha prosedürüne göre düşür`,
            `Final mevkide watch circle, thrust/power marjı, haberleşme ve green-light'ı doğrula`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 500 m giriş son kontrol",
          bullets: [
            `Tesis izni alındı ve 500 m entry checklist tamamlandı mı?`,
            `Kaçış rotası planlandı ve bağımsız ikinci PRS devrede mi?`,
            `Blow-on/blow-off tercihi risk değerlendirmesinde gerekçeli mi?`,
            `Field clearance log ve approach plan kayıtlı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
