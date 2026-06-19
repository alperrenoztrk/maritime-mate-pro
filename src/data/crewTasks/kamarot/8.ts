import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Revir (sick bay) temizliği ve tıbbi yardım desteği",
  roleSlug: "kamarot",
  taskIndex: 8,
  estimatedPages: 23,
  intro: `Gemi reviri (sick bay), MLC 2006 ve SOLAS gerekliliklerine göre her an temiz, düzenli ve kullanıma hazır olmalıdır; hasta bir mürettebatın bakıldığı bu alan, hem hijyen hem denetim açısından kritiktir. Kamarot; revirin günlük temizliğini ve sanitasyonunu yürütür, hasta mürettebata yemek/içecek ve temel ihtiyaçları taşır, oda konforunu sağlar ve bulaşıcı hastalık şüphesinde artan dezenfeksiyon protokollerini uygular. Bu bölüm revir temizliği ve tıbbi yardım desteğini ele alır.`,
  sources: [
    "MLC 2006 Regulation 4.1 — medical care on board",
    "SOLAS Chapter III — ilk yardım ve revir",
    "WHO — Guide to Ship Sanitation",
    "IHR 2005 — enfeksiyon kontrolü",
    "Şirket SMS — revir ve hijyen prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Revirin Önemi",
      sections: [
        {
          subheading: "1.1 Hazır ve temiz olmalı",
          paragraphs: [
            `Revir, hasta/yaralı bakımı için ayrılmış bir alandır ve her an kullanıma hazır, temiz ve düzenli olmalıdır. Kirli veya dağınık bir revir, hem hasta bakımını riske atar hem denetimde doğrudan MLC uygunsuzluk bulgusu doğurur. Kamarot, revirin bu hazırlığını günlük olarak sağlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 & denetim",
              text: `Kirli veya düzensiz bir revir, PSC/MLC denetiminde doğrudan non-compliance bulgusudur. Revir, kullanılmıyor olsa bile her an temiz ve hazır tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Günlük Temizlik ve Sanitasyon",
      sections: [
        {
          subheading: "2.1 Temizlik kapsamı",
          paragraphs: [
            `Kamarot; revirin zemini, yatak/yatak takımı, tezgah, lavabo ve aletlerini düzenli temizler ve dezenfekte eder. Sanitasyon kontrolü (havalandırma, koku, hijyen) yapılır. Tıbbi aletler ve yüzeyler, enfeksiyon riskini düşürecek biçimde temiz tutulur.`,
          ],
          bullets: [
            `Zemin, yatak ve yatak takımı`,
            `Tezgah, lavabo ve yüzeyler`,
            `Havalandırma ve koku kontrolü`,
            `Dezenfeksiyon ve hijyen`,
          ],
        },
      ],
    },
    {
      heading: "3. Hasta Desteği",
      sections: [
        {
          subheading: "3.1 Temel ihtiyaçlar",
          paragraphs: [
            `Revirde yatan hasta mürettebata kamarot; yemek, içecek ve temel ihtiyaçları taşır, oda konforunu (sıcaklık, havalandırma, temizlik) sağlar. Hasta için uygun (gerekirse hafif/diyet) yemek aşçıyla koordine edilir. Bu destek, hastanın iyileşmesine ve moraline katkı sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Konfor iyileştirir",
              text: `Temiz, havadar ve sıcak bir oda ile düzenli beslenme, hastanın iyileşmesini destekler. Kamarotun özeni, tıbbi bakımı tamamlayan değerli bir katkıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Enfeksiyon Kontrolü",
      sections: [
        {
          subheading: "4.1 Bulaşıcı hastalık protokolü",
          paragraphs: [
            `Bulaşıcı hastalık şüphesinde kamarot, artan dezenfeksiyon protokollerini uygular: özellikle tuvalet, ortak yüzeyler ve hasta odasında sık ve yoğun dezenfeksiyon. Uygun KKD (eldiven, maske) kullanır, kontamine atığı ayrı toplar ve çapraz bulaşmayı önleyecek biçimde çalışır.`,
          ],
          table: {
            caption: "Enfeksiyon kontrol önlemleri",
            headers: ["Önlem", "Uygulama"],
            rows: [
              ["Sık dezenfeksiyon", "Tuvalet, yüzey, kapı kolu"],
              ["KKD", "Eldiven, maske"],
              ["Atık", "Kontamine atık ayrı toplama"],
              ["İzolasyon desteği", "Ayrı temizlik protokolü"],
            ],
          },
        },
        {
          subheading: "4.2 Kendini koruma",
          paragraphs: [
            `Kamarot, hasta bakımı ve revir temizliğinde kendi sağlığını da korur; KKD kullanır, el hijyenine dikkat eder. Kamarotun sağlığı, hizmetin sürekliliği ve diğer mürettebatın korunması için önemlidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Tıbbi Sorumluyla Koordinasyon",
      sections: [
        {
          subheading: "5.1 Medical Officer'a destek",
          paragraphs: [
            `Kamarot, tıbbi sorumlu zabit (genelde İkinci Zabit/Medical Officer) ile koordineli çalışır; hastanın durumundaki değişiklikleri (yemek yememe, ateş, kötüleşme) bildirir. Revirin temizliği ve hasta konforu, tıbbi bakımı tamamlayan bir ekip işidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Revir temizliği kontrolü",
          bullets: [
            `Revir her an temiz, düzenli ve kullanıma hazır mı?`,
            `Zemin/yatak/tezgah/aletler temizlenip dezenfekte edildi mi?`,
            `Havalandırma ve koku kontrolü yapıldı mı?`,
            `Hastaya yemek/içecek ve temel ihtiyaçlar sağlandı mı?`,
            `Bulaşıcı şüphesinde artan dezenfeksiyon ve KKD uygulandı mı?`,
            `Hasta durumundaki değişiklik tıbbi sorumluya bildirildi mi?`,
          ],
          paragraphs: [
            `Revir temizliği ve tıbbi yardım desteği, kamarotun hasta mürettebatın iyileşmesine ve geminin MLC uyumuna doğrudan katkı verdiği bir görevdir. Her an hazır bir revir, özenli hasta bakımı ve titiz enfeksiyon kontrolü; hem bireyin sağlığını hem tüm geminin hijyenini korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
