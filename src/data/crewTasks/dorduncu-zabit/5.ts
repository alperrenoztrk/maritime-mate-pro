import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bağlama ve manevra operasyonlarına katılım",
  roleSlug: "dorduncu-zabit",
  taskIndex: 5,
  estimatedPages: 22,
  intro: `Yanaşma (berthing) ve kalkma (unberthing) operasyonları, güvertedeki en yoğun ve en riskli işlerdendir; gergin halatlar, dönen ırgatlar ve hızlı kararlar bir aradadır. Dördüncü Zabit, baş (forward) veya kıç (aft) istasyonda görev alarak halat/tel kullanımını, winch operasyonunu ve güvenli çalışma pratiklerini öğrenir; özellikle snap-back (halat kopmasında geri savrulma) tehlikesi ve ekip koordinasyonu üzerine farkındalık kazanır. Bu bölüm bağlama istasyonu görevini emniyet odağıyla ele alır.`,
  sources: [
    "Code of Safe Working Practices for Merchant Seafarers (COSWP) — mooring",
    "OCIMF Mooring Equipment Guidelines (MEG4)",
    "STCW — watchkeeping ve mooring station görevleri",
    "Şirket SMS — mooring risk assessment ve toolbox talk",
    "ISM Code — emniyetli operasyon prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Bağlama İstasyonunun Riskleri",
      sections: [
        {
          subheading: "1.1 Neden yüksek riskli?",
          paragraphs: [
            `Bağlama operasyonunda halat/teller yüksek gerilim altındadır; bir kopma, ucu kırbaç gibi savurarak ölümcül yaralanma yaratabilir (snap-back). Dönen ırgat tamburu, gergin halat üzerinde durmak ve dar güvertede hızlı hareket de ek tehlikelerdir. Dördüncü Zabit bu riskleri tanıyarak güvenli pozisyon alır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Snap-back zone",
              text: `Gergin bir halat koptuğunda savrulacağı bölge "snap-back zone"dur. Bu bölgede asla durulmaz. Modern anlayış, tüm güverteyi potansiyel tehlike kabul edip dikkatli konumlanmayı öğütler; eski "boyalı snap-back işaretleri" güvenliğin tek başına garantisi değildir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. İstasyon Görevleri",
      sections: [
        {
          subheading: "2.1 Forward / aft istasyon",
          paragraphs: [
            `Baş ve kıç istasyonlar genelde bir zabit (veya reis) sorumluluğunda çalışır. Dördüncü Zabit bu ekipte görev alır: halat verme/alma, winch kullanımı, heaving line atma ve köprüüstü ile telsiz haberleşmesini öğrenir. Komutlar (heave, slack, hold, make fast) net biçimde tekrarlanır ve uygulanır.`,
          ],
          bullets: [
            `Halat/tel hazırlığı ve fairlead'den geçirme`,
            `Winch/ırgat operasyonu`,
            `Heaving line atma ve halat verme`,
            `Köprüüstü ile telsiz raporlama`,
            `Make fast ve halat sayısı/diziliş kontrolü`,
          ],
        },
        {
          subheading: "2.2 Halat dizilişi ve fonksiyon",
          paragraphs: [
            `Head/stern line, breast line ve spring'ler farklı işlevler görür; spring'ler ileri-geri hareketi, breast'ler bordadan açılmayı sınırlar. Dördüncü Zabit halatların doğru fairlead ve bitt'lere alınmasını, eşit yük dağılımını ve gereksiz aşınmayı önlemeyi öğrenir.`,
          ],
          table: {
            caption: "Mooring halat işlevleri (genel)",
            headers: ["Halat", "İşlev"],
            rows: [
              ["Head/Stern line", "Boyuna tutma, ileri-geri sınırlama"],
              ["Breast line", "Bordadan açılmayı sınırlama"],
              ["Spring", "İleri-geri hareketi engelleme"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Güvenli Çalışma Pratikleri",
      sections: [
        {
          subheading: "3.1 KKD ve pozisyon",
          paragraphs: [
            `Baret, eldiven, çelik burunlu ayakkabı ve uygun iş elbisesi şarttır. Dördüncü Zabit; gergin halat hattının üzerinde/önünde durmaz, ırgat tamburunda parmak/giysi kaptırma riskine dikkat eder ve daima kaçış yolu olan bir noktada konumlanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Eldeki halatı izle",
              text: `Çalışırken sadece kendi halatına değil, çevredeki tüm gergin hatlara dikkat et. Yandaki halatın snap-back bölgesi senin durduğun yeri kapsayabilir.`,
            },
          ],
        },
        {
          subheading: "3.2 Toolbox talk",
          paragraphs: [
            `Operasyon öncesi kısa bir toolbox talk yapılır: görev dağılımı, sıralama, tehlikeler ve acil durumda ne yapılacağı konuşulur. Bu kısa konuşma, mooring kazalarını önleyen en pratik adımlardandır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Winch ve Ekipman",
      sections: [
        {
          subheading: "4.1 Winch operasyonu ve bakım",
          paragraphs: [
            `Mooring winch'lerinin frenleri, brake holding capacity ve tambur durumu emniyet için kritiktir. Dördüncü Zabit, winch kullanımını ve fren testini öğrenir; aşınmış halat/tel, hasarlı fairlead veya kayan fren rapor edilir. MEG4, ekipman ve halatların izlenebilir bakımını öngörür.`,
          ],
        },
      ],
    },
    {
      heading: "5. Ekip Koordinasyonu ve Haberleşme",
      sections: [
        {
          subheading: "5.1 Köprüüstü ile iletişim",
          paragraphs: [
            `İstasyon ile köprüüstü arasında net, kısa ve teyitli telsiz haberleşmesi şarttır. Dördüncü Zabit; raporları (örn. "forward two lines ashore, made fast") doğru terminolojiyle iletmeyi ve komutları tekrarlayıp uygulamayı öğrenir. Yanlış anlaşılma, manevrada ciddi risk yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Mooring istasyon kontrolü",
          bullets: [
            `KKD giyildi, toolbox talk yapıldı mı?`,
            `Snap-back/gergin hat bölgelerinden uzak konumlanıldı mı?`,
            `Halatlar doğru fairlead/bitt'e ve eşit yük ile alındı mı?`,
            `Winch fren ve ekipman durumu sağlıklı mı?`,
            `Köprüüstü ile haberleşme net ve teyitli mi?`,
            `Komutlar tekrarlanıp doğru uygulanıyor mu?`,
          ],
          paragraphs: [
            `Bağlama operasyonu, Dördüncü Zabitin pratik denizciliği ve emniyet bilincini birlikte geliştirdiği bir okuldur. Snap-back farkındalığı, doğru konumlanma ve net haberleşme; bu yüksek riskli işi güvenli bir rutine dönüştürür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
