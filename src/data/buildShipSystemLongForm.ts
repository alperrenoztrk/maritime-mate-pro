import { shipSystemsData } from "@/data/shipSystemsData";
import { getProfessionalSystemGuide } from "@/data/shipSystemsProfessionalData";
import type {
  ShipSystemChapter,
  ShipSystemLongForm,
  ShipSystemSection,
} from "@/data/shipSystems/longform/types";

const referenceSection = (
  subheading: string,
  bullets: string[],
  paragraphs: string[] = [],
): ShipSystemSection => ({ subheading, paragraphs, bullets });

export function buildGeneratedShipSystemLongForm(
  sectionId: string,
  topicIndex: number,
): ShipSystemLongForm | null {
  const category = shipSystemsData[sectionId];
  const topic = category?.topics[topicIndex];
  if (!category || !topic) return null;

  const guide = getProfessionalSystemGuide(sectionId, topicIndex, topic.title);

  const technicalSections: ShipSystemSection[] = topic.sections.map((section) => {
    const callouts: ShipSystemSection["callouts"] = [];
    if (section.formula) {
      callouts.push({
        type: "reference",
        title: "Formül ve değişkenler",
        text: `${section.formula.expression}. ${section.formula.variables.join("; ")}`,
      });
    }
    if (section.example) {
      callouts.push({
        type: "example",
        title: "Uygulama örneği",
        text: `${section.example.problem} ${section.example.steps.join(" ")} Sonuç: ${section.example.result}`,
      });
    }
    return {
      subheading: section.heading,
      paragraphs: section.paragraphs.length > 0
        ? section.paragraphs
        : ["Bu başlık, aşağıdaki tablo veya uygulama üzerinden okunmalıdır; değerler gerçek gemide onaylı plan ve üretici kitabıyla doğrulanır."],
      table: section.table,
      callouts: callouts.length > 0 ? callouts : undefined,
    };
  });

  const chapters: ShipSystemChapter[] = [
    {
      heading: "1. Sistemin görevi ve emniyet sınırı",
      lead: "Bir gemi sistemini öğrenmek, parça adlarını ezberlemekten önce sistemin hangi riski kontrol ettiğini ve hangi koşulda güvenilmez hâle geldiğini anlamaktır.",
      sections: [
        {
          subheading: "Operasyonel amaç",
          paragraphs: [topic.introduction, guide.purpose],
          callouts: [{ type: "tip", title: "Sorumluluk", text: guide.responsibleRole }],
        },
        {
          subheading: "Sistemin yapmadığı şey",
          paragraphs: [guide.boundary],
          callouts: [{
            type: "warning",
            title: "Yanlış güveni önle",
            text: "Normal bir ekran, basınç veya alarm lambası bütün sistemin doğru çalıştığını tek başına kanıtlamaz. Fiziksel çıktı, bağımsız kaynak ve gemiye özgü limitlerle çapraz doğrulama gerekir.",
          }],
        },
      ],
    },
    {
      heading: "2. Bileşenler, enerji ve veri akışı",
      lead: "Arıza ararken kaynaktan son çıktıya, emniyet ve kayıt fonksiyonuna kadar kesintisiz bir zincir takip edilir.",
      sections: [
        {
          subheading: "Beş aşamalı sistem zinciri",
          paragraphs: ["Aşağıdaki sıra yalnız bir görsel özet değildir; vardiya kontrolü ve arıza izolasyonunun takip edeceği gerçek mantık sırasıdır."],
          table: {
            headers: ["Aşama", "Görev", "Bu sistemde karşılığı"],
            rows: guide.flow.map((stage, index) => [String(index + 1), stage.label, stage.detail]),
          },
        },
        referenceSection(
          "Çalışma prensibi",
          topic.workingPrinciple?.length
            ? topic.workingPrinciple
            : guide.flow.map((stage) => `${stage.label}: ${stage.detail}`),
          ["Bileşenler tek başına değil, sensör/enerji kaynağı, kontrol mantığı ve emniyet geri beslemesiyle birlikte değerlendirilir."],
        ),
      ],
    },
    {
      heading: "3. Teknik temel",
      lead: "Tablo ve formüller, yalnız uygulandıkları varsayım ve çalışma zarfı açıkça biliniyorsa operasyonel anlam taşır.",
      sections: technicalSections.length > 0
        ? technicalSections
        : [referenceSection("Teknik çerçeve", guide.flow.map((stage) => stage.detail))],
    },
    {
      heading: "4. Hazırlık, devreye alma ve kullanım",
      lead: "Kontrol listesi, düşünmenin yerine geçen bir işaretleme formu değil; yanlış hat, yanlış mod ve eksik emniyet bariyerini operasyon başlamadan yakalayan savunmadır.",
      sections: [
        referenceSection("Operasyon öncesi hazırlık", guide.prepare),
        referenceSection(
          "Devreye alma ve normal kullanım sırası",
          topic.operation?.length ? topic.operation : guide.monitor,
          ["Komut, gerçek hareket/çıktı ve gösterge geri bildirimi her adımda aynı şeyi anlatmalıdır."],
        ),
      ],
    },
    {
      heading: "5. Vardiyada izleme ve bağımsız doğrulama",
      lead: "Profesyonel kullanıcı yalnız değeri okumaz; değerin kaynağını, yaşını, trendini, başka sistemlerle ortak hata ihtimalini ve fiziksel sonucu sorgular.",
      sections: [
        referenceSection("İşletmede izlenecekler", guide.monitor),
        referenceSection("Çapraz doğrulama", guide.verify),
        referenceSection("Kritik öğrenme noktaları", topic.keyPoints ?? []),
      ],
    },
    {
      heading: "6. Arıza, emniyetli durum ve yükseltme",
      lead: "İlk görev arızalı parçayı onarmak değil; yanlış çıktının operasyona etkisini sınırlamak, yedek düzeni kurmak ve yetkili kişiye doğru kanıtla yükseltmektir.",
      sections: [
        {
          subheading: "Belirti–muhtemel neden–ilk emniyetli hareket",
          paragraphs: ["Aşağıdaki nedenler teşhis başlangıcıdır. Ölçüm ve izolasyon yapılmadan parça değişimi veya koruma bypass'ı önermez."],
          table: topic.faults?.length
            ? {
                headers: ["Belirti", "Muhtemel neden", "İlk emniyetli hareket"],
                rows: topic.faults.map((fault) => [fault.fault, fault.cause, fault.action]),
              }
            : undefined,
        },
        {
          subheading: "Durdur ve yükselt kriterleri",
          paragraphs: [],
          bullets: guide.stopAndEscalate,
          callouts: [{
            type: "warning",
            title: "Koruma bypass'ı",
            text: "Alarm, trip, interlock, bağımsız high-level veya automatic stopping fonksiyonunu arızayı gizlemek için bypass etmek bir işletme çözümü değildir. Yetkili risk değerlendirmesi ve açık prosedür olmadan uygulanmaz.",
          }],
        },
        referenceSection("Personel ve ekipman emniyeti", topic.precautions ?? []),
      ],
    },
    {
      heading: "7. Kayıt, denetim ve dayanak",
      lead: "Bir sistemin çalıştığını söylemek yerine hangi objektif kanıtın bunu doğruladığı gösterilir.",
      sections: [
        referenceSection("Tutulacak kayıtlar", guide.records),
        {
          subheading: "Mevzuat ve gemiye özel kaynak hiyerarşisi",
          paragraphs: [
            "Uluslararası sözleşme ve kod asgari çerçeveyi verir. Bayrak devleti, klas, type approval, onaylı gemi planı, üretici kitabı ve şirket SMS'i gerçek gemide uygulanacak ayrıntıyı belirler.",
          ],
          table: {
            headers: ["Kaynak", "Bu sistemde kullanım alanı"],
            rows: guide.references.map((reference) => [reference.code, reference.scope]),
          },
          callouts: [{
            type: "regulation",
            title: "Uygulanabilirlik uyarısı",
            text: "Tonaj, gemi tipi, yapım/kurulum tarihi, sefer alanı ve ekipman type approval'ı bilinmeden bir taşıma veya test hükmü 'tüm gemilerde zorunlu' diye genellenmez.",
          }],
        },
      ],
    },
  ];

  const approxCharacters = JSON.stringify(chapters).length;
  const estimatedPages = Math.max(6, Math.min(18, Math.ceil(approxCharacters / 3_200)));

  return {
    title: topic.title,
    sectionId,
    topicIndex,
    intro: `${guide.purpose} Bu ders, sistemin mimarisini, normal işletmesini, sınırlarını, çapraz doğrulamasını ve arıza halinde emniyetli ilk hareketi tek akışta ele alır.`,
    estimatedPages,
    chapters,
    sources: guide.references.map((reference) => `${reference.code} — ${reference.scope}`),
  };
}
