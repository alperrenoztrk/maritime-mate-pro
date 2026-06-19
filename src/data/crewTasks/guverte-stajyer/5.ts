import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "ISM ve güvenlik prosedürlerini öğrenme",
  roleSlug: "guverte-stajyer",
  taskIndex: 5,
  estimatedPages: 22,
  intro: `Modern denizcilik, sistematik bir emniyet ve güvenlik yönetimi üzerine kuruludur. Güverte stajyeri; geminin Safety Management System'ini (SMS), risk değerlendirme prosedürlerini, Permit to Work (PTW) sistemini ve ISPS gerekliliklerini öğrenir. Near-miss raporlama sistemini, Safety Committee yapısını ve çevresel koruma prosedürlerini tanır. Bu bölüm stajyerin ISM ve güvenlik prosedürlerini öğrenmesini ele alır.`,
  sources: [
    "ISM Code — Safety Management System",
    "ISPS Code — gemi güvenliği",
    "MARPOL — çevre koruma",
    "Şirket SMS — risk assessment ve PTW prosedürleri",
    "STCW — emniyet yetkinlikleri",
  ],
  chapters: [
    {
      heading: "1. SMS'i Anlamak",
      sections: [
        {
          subheading: "1.1 Sistematik emniyet",
          paragraphs: [
            `Safety Management System (SMS), geminin tüm operasyonlarını emniyetli ve mevzuata uygun yürütmek için kurulmuş prosedürler bütünüdür. Stajyer, SMS'in "rafta duran bir klasör" değil, günlük işin çerçevesi olduğunu öğrenir; her prosedürün bir kaza dersinden doğduğunu kavrar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code",
              text: `ISM Code, şirket ve geminin emniyetli işletim için belgelenmiş bir sistem kurmasını ve sürekli iyileştirmesini şart koşar. SMS, bu sistemin gemideki somut halidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Risk Değerlendirmesi",
      sections: [
        {
          subheading: "2.1 Tehlikeyi önceden görmek",
          paragraphs: [
            `Risk değerlendirmesi (risk assessment), bir iş öncesi tehlikeleri belirleyip kontrol tedbiri planlamaktır. Stajyer; tehlike tanımlama, olasılık/şiddet değerlendirme ve hiyerarşik kontrol (eleme, ikame, mühendislik, idari, KKD) mantığını öğrenir. Bu düşünme biçimi, kariyer boyu emniyetin temelidir.`,
          ],
          bullets: [
            `Tehlikeleri tanımla`,
            `Olasılık ve şiddeti değerlendir`,
            `Kontrol tedbirlerini belirle`,
            `Artık riski kabul edilebilir kıl`,
          ],
        },
      ],
    },
    {
      heading: "3. Permit to Work (PTW)",
      sections: [
        {
          subheading: "3.1 İzin sistemi",
          paragraphs: [
            `Yüksek riskli işler (enclosed space, hot work, aloft, elektrik) Permit to Work ile yapılır; iş, tedbirler ve onay kayıt altına alınır. Stajyer, PTW'nin neden var olduğunu ve hiçbir yüksek riskli işin izinsiz yapılmaması gerektiğini öğrenir.`,
          ],
          table: {
            caption: "Tipik permit gerektiren işler",
            headers: ["İş", "Ana risk"],
            rows: [
              ["Enclosed space entry", "Boğulma/zehirlenme"],
              ["Hot work", "Yangın/patlama"],
              ["Working aloft/overside", "Düşme"],
              ["Elektrik çalışması", "Çarpma/arc flash"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. ISPS Güvenliği",
      sections: [
        {
          subheading: "4.1 Gemi güvenliği temelleri",
          paragraphs: [
            `Stajyer; ISPS kapsamında güvenlik seviyeleri, erişim kontrolü, restricted area ve ziyaretçi yönetimini öğrenir. Güvenliğin (security) emniyetten (safety) farklı ama tamamlayıcı bir alan olduğunu kavrar; izinsiz giriş, kaçak yolcu ve tehdit yönetiminin temelini tanır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Near-miss ve Çevre",
      sections: [
        {
          subheading: "5.1 Raporlama ve MARPOL",
          paragraphs: [
            `Stajyer, near-miss raporlamanın değerini (bildirilen her ramak kala, önlenecek bir kaza) ve Safety Committee yapısını öğrenir. Ayrıca MARPOL kapsamında çöp, yağ ve emisyon yönetimi gibi çevre koruma prosedürlerini tanır. Denizi korumanın bir görev olduğunu içselleştirir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Bildirmekten çekinme",
              text: `Stajyer olarak gördüğün bir tehlikeyi veya near-miss'i bildirmek değerlidir. Açık raporlama kültürü, en deneyimsiz kişinin bile emniyete katkı yapabileceği anlamına gelir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 ISM/güvenlik öğrenme kontrolü",
          bullets: [
            `SMS'in günlük işteki rolü kavrandı mı?`,
            `Risk assessment mantığı (tehlike/kontrol) öğrenildi mi?`,
            `PTW sistemi ve hangi işlerin izin gerektirdiği biliniyor mu?`,
            `ISPS güvenlik temelleri (seviye/erişim) tanındı mı?`,
            `Near-miss raporlama ve Safety Committee anlaşıldı mı?`,
            `MARPOL çevre prosedürleri öğrenildi mi?`,
          ],
          paragraphs: [
            `ISM ve güvenlik prosedürlerini öğrenmek, güverte stajyerini "kuralları uygulayan" değil, "neden uygulandığını anlayan" bir denizciye dönüştürür. Risk düşüncesi, izin disiplini ve açık raporlama kültürü; stajyerin ileride güvenli bir zabit olmasının temelini kurar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
