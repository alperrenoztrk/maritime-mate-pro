import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "ISM Safety Committee ve near-miss yönetimi",
  roleSlug: "ucuncu-zabit",
  taskIndex: 11,
  estimatedPages: 23,
  intro: `Çoğu şirketin Emniyet Yönetim Sistemi (SMS), gemide düzenli (genelde aylık) bir Emniyet Komitesi (Safety Committee) toplantısı öngörür. Bu toplantıyı sıklıkla Üçüncü Zabit/Safety Officer organize eder ve yönetir: gündem hazırlama, near-miss raporlarının değerlendirilmesi, düzeltici/önleyici aksiyon (CAPA) takibi ve tutanağın DPA'ya iletilmesi. Near-miss kültürünü canlı tutmak — "korktuğu için bildirmeyen" bir ekipten kaçınmak — bu görevin kalbidir. Bu bölüm Safety Committee ve near-miss yönetimini ele alır.`,
  sources: [
    "ISM Code — Safety Management System, raporlama ve sürekli iyileştirme",
    "Şirket SMS — Safety Committee ve near-miss prosedürleri",
    "CAPA (Corrective and Preventive Action) metodolojisi",
    "IMO insan faktörü ve emniyet kültürü kılavuzları",
    "Heinrich/Bird kaza piramidi prensibi",
  ],
  chapters: [
    {
      heading: "1. Safety Committee'nin Amacı",
      sections: [
        {
          subheading: "1.1 Katılımcı emniyet",
          paragraphs: [
            `Emniyet Komitesi, mürettebatın emniyet konularını açıkça konuştuğu, sorunları ve önerileri paylaştığı bir platformdur. Amaç, emniyeti "yönetimin dayattığı" değil, "herkesin sahiplendiği" bir kültüre dönüştürmektir. Üçüncü Zabit bu toplantıyı katılımcı ve verimli kılar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code",
              text: `ISM, sürekli iyileştirmeyi ve raporlamayı şart koşar. Safety Committee, near-miss değerlendirmesi ve CAPA takibi bu sürekli iyileştirme döngüsünün gemideki uygulamasıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Toplantı Organizasyonu",
      sections: [
        {
          subheading: "2.1 Gündem ve katılım",
          paragraphs: [
            `Üçüncü Zabit; gündem hazırlar (önceki aksiyonlar, yeni near-miss'ler, drill değerlendirmeleri, denetim bulguları, öneriler), katılımcıları belirler ve toplantıyı yönetir. Toplantı, herkesin söz alabildiği, suçlamadan çok çözüm odaklı bir biçimde yürütülür.`,
          ],
          bullets: [
            `Gündem hazırlama ve duyuru`,
            `Önceki aksiyonların durumu`,
            `Yeni near-miss ve olayların değerlendirmesi`,
            `Öneri ve çözüm tartışması`,
            `Tutanak ve aksiyon atama`,
          ],
        },
        {
          subheading: "2.2 Tutanak ve DPA",
          paragraphs: [
            `Toplantı tutanağı; kararlar, atanan aksiyonlar ve sorumlularla birlikte kayda geçirilir ve DPA'ya (Designated Person Ashore) iletilir. Bu, kıyı yönetiminin gemideki emniyet nabzını tutmasını ve gerekli desteği vermesini sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "3. Near-Miss Yönetimi",
      sections: [
        {
          subheading: "3.1 Near-miss nedir, neden değerli?",
          paragraphs: [
            `Near-miss (ramak kala), zarara yol açmamış ama açabilecek bir olaydır. Her near-miss, ileride önlenebilecek bir kazanın habercisidir. Kaza piramidi prensibine göre, çok sayıda bildirilen near-miss'in altında daha az sayıda ciddi kaza yatar; near-miss'leri yöneterek ciddi kazalar önlenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Bildirilen her near-miss bir derstir",
              text: `Düşen bir aletin kimseye çarpmaması bir "şans" değil, bir uyarıdır. Bildirildiğinde neden araştırılır ve tedbir alınır; bir dahaki sefere alet birine çarpmadan sorun çözülmüş olur.`,
            },
          ],
        },
        {
          subheading: "3.2 Raporlama kültürü",
          paragraphs: [
            `Near-miss kültürünün en büyük düşmanı korkudur: "bildirim cezalandırılır" algısı raporlamayı öldürür. Üçüncü Zabit, bildirimin suçlama değil öğrenme aracı olduğunu vurgular; ceza değil, çözüm odaklı bir ortam kurar. Açık bildirim, canlı bir emniyet kültürünün işaretidir.`,
          ],
        },
      ],
    },
    {
      heading: "4. CAPA — Düzeltici/Önleyici Aksiyon",
      sections: [
        {
          subheading: "4.1 Aksiyon döngüsü",
          paragraphs: [
            `Her near-miss veya bulgu için kök neden araştırılır ve düzeltici (corrective) ile önleyici (preventive) aksiyon belirlenir. Aksiyonlara sorumlu ve termin atanır; tamamlanana kadar izlenir. Üçüncü Zabit, açık aksiyonların unutulup kapanmadan kalmasını önler.`,
          ],
          table: {
            caption: "CAPA takibi (kavram)",
            headers: ["Aşama", "İçerik"],
            rows: [
              ["Olay/near-miss", "Ne oldu, nasıl?"],
              ["Kök neden", "Neden oldu?"],
              ["Düzeltici aksiyon", "Bu olayı gider"],
              ["Önleyici aksiyon", "Tekrarını önle"],
              ["Takip", "Sorumlu + termin + kapanış"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Sürekli İyileştirme",
      sections: [
        {
          subheading: "5.1 Döngüyü canlı tutmak",
          paragraphs: [
            `Safety Committee ve near-miss yönetimi, ancak süreklilik kazandığında işe yarar. Üçüncü Zabit, toplantıların düzenli, tutanakların gerçek ve aksiyonların kapanır olmasını sağlayarak emniyet kültürünü canlı tutar; "formalite" haline gelen bir komite, değerini yitirir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Safety Committee/near-miss kontrolü",
          bullets: [
            `Toplantı düzenli (aylık) yapılıyor, gündem hazırlanıyor mu?`,
            `Near-miss'ler suçlamadan değerlendiriliyor mu?`,
            `Raporlama kültürü canlı (korku olmadan bildirim) mı?`,
            `Her olay için kök neden ve CAPA belirleniyor mu?`,
            `Aksiyonlara sorumlu/termin atandı ve izleniyor mu?`,
            `Tutanak DPA'ya iletiliyor mu?`,
            `Önceki aksiyonlar kapanır olmadan birikmiyor mu?`,
          ],
          paragraphs: [
            `Safety Committee ve near-miss yönetimi, geminin emniyet kültürünün nabzıdır. Üçüncü Zabitin canlı tuttuğu açık raporlama, ciddi kök-neden analizi ve kapanan aksiyonlar; bugünün küçük uyarılarını yarının önlenmiş kazalarına dönüştürür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
