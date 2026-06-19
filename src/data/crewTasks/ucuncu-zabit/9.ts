import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Acil durumda fiilî müdahale rolü",
  roleSlug: "ucuncu-zabit",
  taskIndex: 9,
  estimatedPages: 23,
  intro: `Üçüncü Zabit (Safety Officer) sadece bir "kayıt zabiti" değildir; yangın, adam denize düşme (MOB) veya gemiyi terk (abandon ship) gibi acil durumlarda station bill'e göre aktif ve kritik bir rol üstlenir. Tipik görevler arasında ileri yangın ekibi liderliği, sınır soğutma koordinasyonu, rescue boat hazırlığı, can filikasına biniş kontrolü, sayım (head count) ve distress ekipmanı transferi yer alır. Bu bölüm Safety Officer'ın acil durum müdahale rolünü ele alır.`,
  sources: [
    "SOLAS Chapter III — emergency procedures ve muster",
    "Muster List / Station Bill düzenlemeleri",
    "FSS Code — yangınla mücadele",
    "IAMSAR — arama kurtarma (MOB)",
    "Şirket SMS — emergency response planı",
  ],
  chapters: [
    {
      heading: "1. Safety Officer'ın Aktif Rolü",
      sections: [
        {
          subheading: "1.1 Sahada lider",
          paragraphs: [
            `Safety Officer, emniyet ekipmanını yöneten kişi olduğu için acil durumda doğal bir saha lideridir. Station bill'e göre yangın ekibi liderliği, can kurtarma koordinasyonu gibi roller üstlenir. Bu, "kayıt tutan" değil, "müdahaleyi yöneten" bir roldür.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Station Bill belirler",
              text: `Herkesin acil durumdaki görevi Muster List / Station Bill'de tanımlıdır. Roller gemiye ve şirkete göre değişebilir, ama Safety Officer genelde müdahalenin önünde yer alır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Yangın Müdahalesi",
      sections: [
        {
          subheading: "2.1 Fire party ve boundary cooling",
          paragraphs: [
            `Yangında Safety Officer; ileri yangın ekibi (fire party) liderliği yapabilir, SCBA'lı ekibi yönlendirir ve sınır soğutma (boundary cooling) koordinasyonunu sağlar; yani yangının komşu bölmelere yayılmasını engellemek için bitişik yüzeyleri soğutur. Ekip güvenliği (hava süresi, geri çekilme sinyali) öncelikidir.`,
          ],
          bullets: [
            `Fire party liderliği ve SCBA ekibi yönlendirme`,
            `Boundary cooling koordinasyonu`,
            `Hava süresi ve geri çekilme yönetimi`,
            `Köprüüstü/OSC ile haberleşme`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ekip güvenliği önce",
              text: `Yangına müdahalede en büyük risk, ekibin kendisidir. SCBA hava süresi, ısı ve geri çekilme planı sürekli izlenir; hiçbir yük/mal, müdahale ekibinin hayatından önemli değildir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Adam Denize Düştü (MOB)",
      sections: [
        {
          subheading: "3.1 Rescue boat ve kurtarma",
          paragraphs: [
            `MOB durumunda Safety Officer, rescue boat (kurtarma botu) hazırlığını ve indirilmesini koordine edebilir, kurtarma ekibini yönetir. Hızlı ve organize müdahale, soğuk suda hayatta kalma süresi kısıtlı olduğundan kritiktir. MOB ekipmanı (can simidi, ışık, duman) hızla denize atılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Gemiyi Terk (Abandon Ship)",
      sections: [
        {
          subheading: "4.1 Embarkation ve head count",
          paragraphs: [
            `Abandon ship'te Safety Officer; can filikasına/sala biniş kontrolünü (embarkation), mürettebat sayımını (head count) ve distress ekipmanı transferini koordine edebilir. Herkesin sayıldığından emin olmak — kimsenin geride kalmaması — bu rolün en kritik parçasıdır.`,
          ],
          table: {
            caption: "Abandon ship koordinasyon görevleri",
            headers: ["Görev", "Amaç"],
            rows: [
              ["Embarkation kontrolü", "Düzenli, güvenli biniş"],
              ["Head count", "Kimse geride kalmasın"],
              ["Distress ekipman transferi", "EPIRB/SART/portable radio"],
              ["Survival craft hazırlığı", "Su/gıda/ekipman tam"],
            ],
          },
        },
        {
          subheading: "4.2 Sayımın hayati önemi",
          paragraphs: [
            `Eksik bir sayım, geride kalmış bir mürettebat demektir. Safety Officer, muster list'e göre herkesin mevcut olduğunu doğrular; eksik varsa arama organize edilir. Bu doğrulama, abandon ship'in en kritik adımıdır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Tatbikatla Hazırlık",
      sections: [
        {
          subheading: "5.1 Gerçekçi drill",
          paragraphs: [
            `Bu rollerin gerçek bir acilde işe yaraması, ancak gerçekçi ve düzenli tatbikatla mümkündür. Safety Officer, drill'leri senaryo zenginliğiyle planlar ve kendi rolünü de tatbik eder; kâğıt üstü tatbikat, gerçek anda paniğe dönüşür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kas hafızası",
              text: `Acil durumda insan düşünmez, tatbik ettiğini yapar. Gerçekçi drill, doğru refleksi kas hafızasına yazar; bu yüzden tatbikat ciddiyetle yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Müdahale rolü kontrolü",
          bullets: [
            `Station bill'deki acil durum rolüm net mi?`,
            `Yangında fire party/boundary cooling rolüne hazır mıyım?`,
            `MOB'da rescue boat koordinasyonunu biliyor muyum?`,
            `Abandon ship'te embarkation ve head count görevini biliyor muyum?`,
            `Distress ekipmanı transfer planı hazır mı?`,
            `Ekip güvenliği (SCBA hava, geri çekilme) öncelikli mi?`,
            `Roller gerçekçi drill ile tatbik edildi mi?`,
          ],
          paragraphs: [
            `Safety Officer'ın acil durum rolü, emniyet ekipmanını yönetmenin doğal uzantısıdır: kriz anında o ekipmanı kullanan ve ekibi yöneten kişi olmak. Net rol bilinci, ekip güvenliği önceliği ve gerçekçi tatbikat; bu kritik görevin gerçek bir acilde hayat kurtarmasını sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
