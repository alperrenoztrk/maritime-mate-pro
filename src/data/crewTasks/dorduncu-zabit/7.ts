import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Kayıt ve dokümantasyon desteği",
  roleSlug: "dorduncu-zabit",
  taskIndex: 7,
  estimatedPages: 22,
  intro: `Doğru kayıt tutma, denizciliğin görünmez ama vazgeçilmez bir disiplinidir; bir olay yaşandığında geminin tek savunması çoğu zaman dürüst ve eksiksiz kayıtlardır. Dördüncü Zabit; deck logbook girişlerine destek verir, seyir kayıtlarını düzenler, emniyet kontrol formlarını doldurur ve drill raporlarının hazırlanmasına katkıda bulunarak bu disiplini kariyerinin başında kazanır. Bu bölüm kayıt ve dokümantasyon desteğini ele alır.`,
  sources: [
    "SOLAS Chapter V — seyir kayıtları",
    "MARPOL — Oil/Garbage Record Book disiplini",
    "ISM Code — kayıt ve raporlama gereklilikleri",
    "STCW — watchkeeping kayıtları",
    "Şirket SMS — form ve checklist sistemleri",
  ],
  chapters: [
    {
      heading: "1. Kaydın Önemi",
      sections: [
        {
          subheading: "1.1 Neden doğru kayıt?",
          paragraphs: [
            `Loglar ve formlar; seyrin, bakımın ve emniyet faaliyetlerinin resmi kanıtıdır. Bir olay sonrası inceleme, sigorta süreci veya denetimde bu kayıtların doğruluğu geminin lehine veya aleyhine sonuç doğurur. Dördüncü Zabit, kaydı bir formalite değil, bir sorumluluk olarak öğrenir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kayıt = kanıt",
              text: `İyi tutulmuş bir kayıt, doğru yapılan işi belgeler; tutulmamış veya hatalı kayıt, doğru yapılmış işi bile şüpheye düşürür. Denizcilikte "kaydedilmediyse yapılmadı" sayılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Deck Logbook",
      sections: [
        {
          subheading: "2.1 Logbook girişleri",
          paragraphs: [
            `Deck logbook; pozisyon, rota, hız, hava, trafik, manevra ve özel olayların zaman damgalı kaydıdır. Dördüncü Zabit, girişleri okunaklı, doğru ve gerçek zamanlı yapmayı öğrenir. Sonradan hatırlanarak doldurulan veya düzeltme izi bırakmadan değiştirilen log, güvenilirliğini kaybeder.`,
          ],
          bullets: [
            `Saat başı pozisyon ve hava`,
            `Rota değişimi ve manevra`,
            `Trafik ve özel olaylar`,
            `Düzeltme: üstü çizili + paraf (silme yok)`,
          ],
        },
      ],
    },
    {
      heading: "3. Emniyet Kontrol Formları",
      sections: [
        {
          subheading: "3.1 Checklist disiplini",
          paragraphs: [
            `Manevra öncesi, enclosed space entry, hot work, bunkering gibi işlerde checklist'ler doldurulur. Dördüncü Zabit; bu formların "kutu işaretleme" değil, gerçekten kontrol edildikten sonra imzalanması gerektiğini öğrenir. Gerçeği yansıtmayan bir checklist, en tehlikeli kayıttır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sahte tik tehlikesi",
              text: `Kontrol etmeden form işaretlemek (pencil-whipping), bir adımın atlanmasını gizler ve gerçek bir riski görünmez kılar. Checklist, ancak dürüst doldurulduğunda emniyet sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Drill Raporları",
      sections: [
        {
          subheading: "4.1 Tatbikat dokümantasyonu",
          paragraphs: [
            `Yangın, abandon ship, enclosed space rescue gibi tatbikatlar SOLAS gereği kaydedilir. Dördüncü Zabit; tatbikat senaryosu, katılım, süre, gözlemler ve iyileştirme noktalarının raporlanmasına katkı verir. İyi bir drill raporu, bir sonraki tatbikatı daha gerçekçi kılar.`,
          ],
          table: {
            caption: "Drill raporu içeriği",
            headers: ["Alan", "Örnek"],
            rows: [
              ["Senaryo", "Makine dairesi yangını"],
              ["Katılım", "Tüm mürettebat / istasyonlar"],
              ["Süre/yanıt", "Müdahale süresi"],
              ["Bulgu", "Eksik/iyileştirme noktaları"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Yasal Defterlerle Tanışma",
      sections: [
        {
          subheading: "5.1 ORB, Garbage Record Book",
          paragraphs: [
            `Dördüncü Zabit, ORB (yağ) ve Garbage Record Book gibi yasal defterlerin önemini ve doğru tutulmasının PSC açısından kritikliğini öğrenir. Bu defterlerdeki tutarsızlık, en sık ceza ve gemi tutma nedenlerindendir; genç zabit bu hassasiyeti erken kazanır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Vardiya Devri Kaydı",
      sections: [
        {
          subheading: "6.1 Handover bütünlüğü",
          paragraphs: [
            `Vardiya devrinde önemli bilgiler (trafik, rota, beklenen olaylar, ekipman durumu) net biçimde aktarılır ve gerektiğinde kaydedilir. Dördüncü Zabit, eksiksiz handover'ın emniyet zincirinin bir halkası olduğunu öğrenir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Dokümantasyon kontrolü",
          bullets: [
            `Logbook girişleri okunaklı, doğru ve gerçek zamanlı mı?`,
            `Düzeltmeler iz bırakarak (üstü çizili+paraf) yapılıyor mu?`,
            `Checklist'ler gerçekten kontrol edilip imzalanıyor mu?`,
            `Drill raporları senaryo/bulgu ile eksiksiz mi?`,
            `Yasal defterlerin (ORB vb.) önemi kavrandı mı?`,
            `Vardiya devri eksiksiz aktarılıyor mu?`,
          ],
          paragraphs: [
            `Kayıt ve dokümantasyon disiplini, Dördüncü Zabitin meslek hayatı boyunca taşıyacağı bir alışkanlıktır. Dürüst, zamanında ve eksiksiz kayıt; hem geminin hukuki güvenliğini hem de emniyet kültürünün sağlamlığını birlikte korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
