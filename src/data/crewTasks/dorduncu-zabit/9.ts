import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "GMDSS distress drill ve haberleşme testlerine katılım",
  roleSlug: "dorduncu-zabit",
  taskIndex: 9,
  estimatedPages: 22,
  intro: `GMDSS (Global Maritime Distress and Safety System), denizde tehlike ve emniyet haberleşmesinin omurgasıdır; bir acil durumda doğru çalışması hayat kurtarır. Dördüncü Zabit; İkinci Zabit'in liderliğinde haftalık ve aylık DSC testlerine, abandon ship drill'inde portable VHF kullanımına, pyrotechnics tatbikatına ve EPIRB/SART self-test gözlemine katılarak bu sistemi öğrenir. Bu bölüm GMDSS test ve tatbikatlarına katılımı ele alır.`,
  sources: [
    "SOLAS Chapter IV — Radiocommunications (GMDSS)",
    "SOLAS Chapter III — life-saving appliances ve drills",
    "ITU Radio Regulations — DSC ve distress prosedürleri",
    "GMDSS Manual / radio log gereklilikleri",
    "Üretici EPIRB/SART/VHF el kitapları",
  ],
  chapters: [
    {
      heading: "1. GMDSS'in Mantığı",
      sections: [
        {
          subheading: "1.1 Sea area ve ekipman",
          paragraphs: [
            `GMDSS, seyir bölgesine (sea area A1-A4) göre belirlenen ekipmanla tehlike alarmı vermeyi ve emniyet haberleşmesini sağlar: VHF/MF/HF DSC, Inmarsat, EPIRB, SART, NAVTEX. Dördüncü Zabit, hangi ekipmanın hangi durumda kullanıldığını ve neden yedekli tasarlandığını öğrenir.`,
          ],
          table: {
            caption: "GMDSS bileşenleri (genel)",
            headers: ["Ekipman", "İşlev"],
            rows: [
              ["VHF/MF/HF DSC", "Dijital tehlike alarmı/haberleşme"],
              ["EPIRB", "Uydu üzerinden tehlike konumu"],
              ["SART", "Radar transponder (arama-kurtarma)"],
              ["NAVTEX", "Seyir/hava uyarıları"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Düzenli Testler",
      sections: [
        {
          subheading: "2.1 Haftalık ve aylık DSC testleri",
          paragraphs: [
            `Haftalık VHF DSC test ve aylık MF/HF DSC test, ekipmanın çalışırlığını doğrular ve radio log'a kaydedilir. Dördüncü Zabit, gerçek distress alarmı ile test alarmını karıştırmamayı ve test prosedürünü doğru uygulamayı öğrenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış distress alarmı",
              text: `Kazara gönderilen gerçek distress alarmı, arama-kurtarma kaynaklarını boşa harcar ve cezaya yol açar. Yanlışlıkla gönderilirse derhal iptal mesajı verilir. Genç zabit DSC kullanımını dikkatle öğrenir.`,
            },
          ],
        },
        {
          subheading: "2.2 EPIRB ve SART self-test",
          paragraphs: [
            `EPIRB ve SART'ın düzenli self-test'i (gerçek alarm göndermeden) ve batarya/hidrostatik release son kullanma tarihleri kontrol edilir. Dördüncü Zabit bu kontrollere katılarak ekipmanın acil anda hazır olmasının nasıl güvence altına alındığını öğrenir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Abandon Ship ve Portable VHF",
      sections: [
        {
          subheading: "3.1 Tatbikatta haberleşme",
          paragraphs: [
            `Abandon ship drill'inde can filikası/salı haberleşmesi için portable (taşınabilir) VHF kullanılır. Dördüncü Zabit, bu cihazların şarjlı/hazır tutulmasını ve tatbikatta doğru kullanımını öğrenir. Tatbikat, gerçek bir terk durumunda paniği azaltan kas hafızasını kurar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Pyrotechnics Tatbikatı",
      sections: [
        {
          subheading: "4.1 İşaret fişeği güvenliği",
          paragraphs: [
            `Süresi dolmuş işaret fişekleriyle yapılan tatbikatta güvenlik perimetresi kurulur, rüzgâr/yön dikkate alınır ve KKD kullanılır. Dördüncü Zabit, pyrotechnic'lerin doğru ve güvenli ateşlenmesini öğrenir; yanlış kullanım yangın ve yaralanma riski taşır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Güvenli atış",
              text: `İşaret fişeği rüzgâr yönü dikkate alınarak, gemiden uzağa ve yukarı doğru, güvenlik mesafesi sağlanarak ateşlenir. Tatbikat, gerçek bir durumda doğru refleksi kazandırır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Radio Log ve Kayıt",
      sections: [
        {
          subheading: "5.1 GMDSS kayıt disiplini",
          paragraphs: [
            `Tüm testler, tatbikatlar ve distress/safety haberleşmeleri radio log'a kaydedilir. Dördüncü Zabit, bu kayıtların hem yasal zorunluluk hem de ekipman güvenilirliğinin kanıtı olduğunu öğrenir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 GMDSS katılım kontrolü",
          bullets: [
            `Haftalık/aylık DSC testleri doğru yapılıp kaydedildi mi?`,
            `Test ile gerçek distress alarmı ayrımı öğrenildi mi?`,
            `EPIRB/SART self-test ve SKT/batarya kontrolü gözlemlendi mi?`,
            `Abandon ship drill'de portable VHF doğru kullanıldı mı?`,
            `Pyrotechnics tatbikatında güvenlik perimetresi kuruldu mu?`,
            `Radio log girişleri eksiksiz mi?`,
          ],
          paragraphs: [
            `GMDSS test ve tatbikatlarına katılım, Dördüncü Zabite acil haberleşmenin hayati önemini ve disiplinini öğretir. Düzenli test, doğru kullanım ve eksiksiz kayıt; bir acil durumda yardım çağrısının ilk seferde ve doğru biçimde ulaşmasını güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
