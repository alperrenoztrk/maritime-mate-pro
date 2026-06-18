import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Loglogbook ve seyir kayıtlarına eksiksiz katılım",
  roleSlug: "dorduncu-zabit",
  taskIndex: 10,
  estimatedPages: 22,
  intro: `Bridge logbook ve seyir kayıtları, vardiyanın resmi belleğidir; saat başı pozisyondan rota değişimine, hava verisinden özel olaylara kadar her şey bu kayıtlarda yaşar. Dördüncü Zabit, bu kayıtlara doğru, okunaklı ve eksiksiz katkı vererek profesyonel kayıt disiplinini kazanır; ayrıca compass error gözlemi ve vardiya devir-tesliminde eksiksiz handover'ı öğrenir. Bu bölüm bridge logbook ve seyir kayıt disiplinini ele alır.`,
  sources: [
    "SOLAS Chapter V — seyir kayıtları ve compass",
    "STCW — bridge watchkeeping ve handover",
    "ISM Code — kayıt gereklilikleri",
    "ICS Bridge Procedures Guide",
    "VDR ve deck log delil değeri",
  ],
  chapters: [
    {
      heading: "1. Bridge Logbook'un Rolü",
      sections: [
        {
          subheading: "1.1 Vardiyanın resmi kaydı",
          paragraphs: [
            `Bridge logbook; geminin nerede olduğunu, ne yaptığını ve hangi koşullarla karşılaştığını zaman damgalı biçimde belgeler. Bir olay sonrası, bu kayıtlar VDR ile birlikte gerçeği ortaya koyar. Dördüncü Zabit, kaydın doğruluğunun geminin lehine en güçlü kanıt olduğunu öğrenir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Log ve VDR tutarlılığı",
              text: `Logbook, VDR ve diğer kayıtlar birbiriyle tutarlı olmalıdır. Tutarsızlık, bir incelemede geminin anlatısını zayıflatır; tutarlı kayıt ise güçlü bir savunma sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Logbook Girişleri",
      sections: [
        {
          subheading: "2.1 Ne kaydedilir?",
          paragraphs: [
            `Saat başı pozisyon, hava verisi (rüzgâr, deniz, barometre, görüş), trafik, vessel movements, rota değişimleri (course alteration) ve özel olaylar kaydedilir. Dördüncü Zabit, girişleri gerçek zamanlı ve okunaklı yapmayı öğrenir; eksik veya toplu doldurulan log, güvenilirliğini yitirir.`,
          ],
          bullets: [
            `Saat başı pozisyon ve hava`,
            `Trafik ve vessel movements`,
            `Course alteration ve manevralar`,
            `Özel olaylar (drill, arıza, olay)`,
          ],
        },
        {
          subheading: "2.2 Düzeltme kuralı",
          paragraphs: [
            `Hatalı bir giriş silinmez; üstü tek çizgiyle çizilir, doğrusu yazılır ve paraflanır. Bu kural, kaydın bütünlüğünü ve güvenilirliğini korur; "temiz görünsün" diye silmek veya üzerine yazmak kabul edilmez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Silme/tahrifat yasak",
              text: `Logbook'ta silme, üzerine yazma veya sayfa koparma, kaydın delil değerini yok eder ve tahrifat şüphesi doğurur. Hata, iz bırakan düzeltmeyle gösterilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Compass Error Gözlemi",
      sections: [
        {
          subheading: "3.1 Pusula hatası takibi",
          paragraphs: [
            `Compass error (gyro ve manyetik), düzenli gözlemle (azimuth/transit) belirlenir ve kaydedilir. Dördüncü Zabit, pusula hatasının seyir doğruluğu için neden kritik olduğunu ve nasıl gözlemlendiğini öğrenir. Kaydedilen error, rota kontrolünde kullanılır.`,
          ],
          table: {
            caption: "Pusula hatası kaydı (kavram)",
            headers: ["Gözlem", "Yöntem", "Kayıt"],
            rows: [
              ["Gyro error", "Azimuth/transit", "Logbook + compass record"],
              ["Magnetic deviation", "Karşılaştırma", "Deviation card kontrol"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Vardiya Devir-Teslim (Handover)",
      sections: [
        {
          subheading: "4.1 Eksiksiz devir",
          paragraphs: [
            `Vardiya devrinde; mevcut rota/hız, trafik durumu, beklenen manevra/olaylar, ekipman durumu ve kaptanın talimatları devralan zabite net biçimde aktarılır. Dördüncü Zabit, devralan zabit durumu tam kavrayana kadar nöbeti devretmemeyi öğrenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kontrol listesiyle devir",
              text: `Bir handover checklist'i, hiçbir önemli bilginin atlanmamasını sağlar. Özellikle yoğun trafik veya yaklaşan manevrada eksiksiz devir, emniyetin kritik bir halkasıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt Kültürü",
      sections: [
        {
          subheading: "5.1 Dürüstlük ve süreklilik",
          paragraphs: [
            `İyi kayıt, bir alışkanlıktır. Dördüncü Zabit, vardiya boyunca olayları olurken kaydetmeyi, tahmin/dolgu yapmamayı ve dürüstlüğü esas almayı öğrenir. Bu kültür, kariyeri boyunca geminin güvenliğine hizmet eder.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Seyir kaydı kontrolü",
          bullets: [
            `Saat başı pozisyon/hava ve özel olaylar kaydedildi mi?`,
            `Girişler gerçek zamanlı ve okunaklı mı?`,
            `Düzeltmeler iz bırakarak (çizgi+paraf) yapılıyor mu?`,
            `Compass error gözlemlendi ve kaydedildi mi?`,
            `Vardiya devri eksiksiz ve teyitli mi?`,
            `Logbook, VDR ve diğer kayıtlarla tutarlı mı?`,
          ],
          paragraphs: [
            `Bridge logbook ve seyir kayıtlarına eksiksiz katılım, Dördüncü Zabitin profesyonel kimliğinin temel taşlarından biridir. Doğru, dürüst ve sürekli kayıt; hem seyir emniyetini hem de geminin hukuki güvenliğini birlikte güçlendirir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
