import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Defect report ve PMS work order takibi",
  roleSlug: "ucuncu-zabit",
  taskIndex: 6,
  estimatedPages: 23,
  intro: `Bir emniyet ekipmanı arızalandığında iki yol vardır: gizlemek veya raporlamak. Gizlemek denetimde yakar ve gerçek bir acilde hayat kaybettirir; raporlamak ise hem gemiyi hem mürettebatı korur. Üçüncü Zabit (Safety Officer); LSA/FFE ekipmanındaki kusurları defect olarak açar, gerektiğinde "out of service" işaretler, telafi tedbiri belirler ve PMS iş emirleriyle düzeltmeyi takip eder. Bu bölüm defect raporlama ve work order takibini ele alır.`,
  sources: [
    "ISM Code — defect raporlama ve düzeltici aksiyon",
    "SOLAS Chapter III — LSA bakım ve servis",
    "FSS Code — yangın emniyet sistemleri bakımı",
    "Gemi PMS yazılımı work order prosedürleri",
    "LSA/FFE maker bakım el kitapları",
  ],
  chapters: [
    {
      heading: "1. Raporlama Kültürü",
      sections: [
        {
          subheading: "1.1 Gizlemek vs raporlamak",
          paragraphs: [
            `Emniyet ekipmanındaki bir kusur gizlendiğinde, ekipman gerçek bir acil durumda çalışmaz ve sonuç ölümcül olabilir. Üçüncü Zabit, kusuru dürüstçe raporlamanın hem yasal hem etik zorunluluk olduğunu bilir; "denetimde görünmesin" diye saklanan bir arıza, en tehlikeli karardır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Saklanan kusur öldürür",
              text: `Çalışmayan bir SCBA düdüğü, zayıf bir lifeboat aküsü veya çatlak bir hortum bağlantısı; rutin bir denetimde "ufak" görünür ama gerçek bir yangın/terk durumunda hayat kaybettirir. Kusur saklanmaz, raporlanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Tipik Emniyet Kusurları",
      sections: [
        {
          subheading: "2.1 Sık karşılaşılan defectler",
          paragraphs: [
            `Üçüncü Zabit, rutin rondlarda emniyet ekipmanındaki kusurları yakalar: çalışmayan SCBA low-pressure düdüğü, zayıf lifeboat aküsü, çatlak yangın hortumu bağlantısı, kopuk EEBD mührü, sızdıran hidrant valf salmastrası. Her biri defect olarak açılır.`,
          ],
          table: {
            caption: "Örnek kusur ve aksiyon",
            headers: ["Kusur", "Aksiyon"],
            rows: [
              ["SCBA düdüğü çalışmıyor", "Defect aç, servise gönder, yedek"],
              ["Lifeboat aküsü zayıf", "Defect, değişim, test"],
              ["Hortum bağlantısı çatlak", "Out of service, değiştir"],
              ["EEBD mührü kopuk", "Kontrol/yenile, kayıt"],
              ["Hidrant valf sızıntısı", "Defect, salmastra bakımı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Defect Açma ve Out of Service",
      sections: [
        {
          subheading: "3.1 Defect kaydı",
          paragraphs: [
            `Kusur, PMS/defect sisteminde açılır: ekipman, kusur tanımı, tespit tarihi ve risk değerlendirmesi kaydedilir. Ekipman güvenli kullanılamayacak durumdaysa "out of service" işaretlenir ve fiziksel olarak etiketlenir ki yanlışlıkla güvenilmesin.`,
          ],
          bullets: [
            `Ekipman ve kusur tanımı`,
            `Tespit tarihi ve risk`,
            `Out of service etiketi (gerekiyorsa)`,
            `Telafi/yedek tedbir`,
          ],
        },
        {
          subheading: "3.2 Telafi tedbiri",
          paragraphs: [
            `Bir emniyet ekipmanı devre dışıyken risk telafi edilir: yedek ekipman devreye alınır, ek nöbet/önlem konur veya operasyon kısıtlanır. Üçüncü Zabit bu telafiyi belirler ve kaptanı bilgilendirir; özellikle yangın/can kurtarma ekipmanında boşluk kabul edilemez.`,
          ],
        },
      ],
    },
    {
      heading: "4. PMS Work Order Takibi",
      sections: [
        {
          subheading: "4.1 Düzeltmenin izlenmesi",
          paragraphs: [
            `Açılan defect, bir iş emrine (work order) bağlanır ve düzeltme tamamlanana kadar izlenir. İş bittiğinde; yapılan iş, kullanılan parça ve test sonucu kaydedilerek work order kapatılır. Üçüncü Zabit, açık emniyet kusurlarının "overdue" listesinde birikmesini önler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kapanışta test",
              text: `Bir emniyet ekipmanı onarıldığında mutlaka test edilerek kapatılır. "Onardım" demek yetmez; gerçekten çalıştığı doğrulanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Denetimle İlişki",
      sections: [
        {
          subheading: "5.1 Şeffaflık denetimde korur",
          paragraphs: [
            `PSC/klas denetiminde, açık ve telafi tedbiri olan bir defect; gizlenmiş bir arızadan çok daha iyi karşılanır. Şeffaf defect yönetimi, geminin emniyet kültürünün sağlıklı olduğunu gösterir. Üçüncü Zabit, defect ve work order kayıtlarını denetime hazır tutar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Defect yönetimi kontrolü",
          bullets: [
            `Tespit edilen emniyet kusurları defect olarak açıldı mı?`,
            `Güvenli kullanılamayan ekipman out of service işaretlendi mi?`,
            `Telafi/yedek tedbir belirlenip kaptan bilgilendirildi mi?`,
            `Defect bir work order'a bağlandı mı?`,
            `Onarım test edilerek kapatıldı mı?`,
            `Açık kusurlar overdue olmadan takip ediliyor mu?`,
            `Kayıtlar denetime hazır ve şeffaf mı?`,
          ],
          paragraphs: [
            `Defect raporlama ve work order takibi, Üçüncü Zabitin emniyet ekipmanını "kâğıt üzerinde" değil gerçekten çalışır tutmasının yoludur. Dürüst raporlama, telafi tedbiri ve disiplinli takip; bir acil durumda ekipmanın ilk seferde çalışmasını güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
