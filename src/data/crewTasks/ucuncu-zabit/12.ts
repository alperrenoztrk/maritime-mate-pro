import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Uyuşturucu ve alkol testi (Drug & Alcohol testing)",
  roleSlug: "ucuncu-zabit",
  taskIndex: 12,
  estimatedPages: 22,
  intro: `Gemide sıfır toleranslı bir uyuşturucu ve alkol (Drug & Alcohol — D&A) politikası, emniyetin temel taşlarından biridir; etki altındaki tek bir kişi tüm gemiyi tehlikeye atabilir. Üçüncü Zabit (Safety Officer), şirket D&A politikası kapsamında rastgele (random) test programının lojistiğini yürütür: test kitlerinin yönetimi, testlerin belirsiz aralıklarla ve kayıt altında uygulanması, pozitif sonuçların gizlilikle kaptan ve şirkete bildirilmesi. Bu bölüm D&A test yönetimini ele alır.`,
  sources: [
    "ISM Code & şirket SMS — D&A politikası",
    "OCIMF / vetting — D&A test beklentileri",
    "STCW — fitness for duty",
    "Chain of custody (gözetim zinciri) prosedürleri",
    "Liman devleti / USCG D&A denetim uygulamaları",
  ],
  chapters: [
    {
      heading: "1. D&A Politikasının Gerekçesi",
      sections: [
        {
          subheading: "1.1 Sıfır tolerans",
          paragraphs: [
            `Uyuşturucu veya alkol etkisindeki bir kişi; dikkatini, muhakemesini ve reflekslerini kaybeder ve emniyet açısından bir bomba haline gelir. Bu yüzden gemilerde genellikle sıfır toleranslı bir D&A politikası uygulanır. Üçüncü Zabit, bu politikanın sahadaki uygulayıcısı olarak emniyeti korur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Fitness for duty",
              text: `STCW ve şirket SMS, görev başında olan herkesin D&A etkisinden uzak (fit for duty) olmasını şart koşar. Vetting ve PSC, D&A test programının varlığını ve uygulanmasını sorgular.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Random Test Programı",
      sections: [
        {
          subheading: "2.1 Belirsiz aralık ve adillik",
          paragraphs: [
            `Rastgele test programı, testlerin önceden tahmin edilemeyen aralıklarla ve tarafsız bir seçimle yapılmasını gerektirir. Belirli kişilerin hedeflenmesi veya tahmin edilebilir bir takvim, programın caydırıcılığını ve adilliğini bozar. Üçüncü Zabit bu lojistiği tarafsız ve kayıtlı yürütür.`,
          ],
          bullets: [
            `Belirsiz, tahmin edilemeyen aralık`,
            `Tarafsız (rastgele) kişi seçimi`,
            `Yeni katılan personel testi`,
            `Olay sonrası (post-incident) test`,
          ],
        },
        {
          subheading: "2.2 Test türleri",
          paragraphs: [
            `Alkol genellikle breathalyzer ile, uyuşturucu ise idrar/tükürük test kitleriyle ölçülür. Üçüncü Zabit, test prosedürünün doğru uygulanmasını ve sonuçların kaydını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "3. Test Kiti Yönetimi",
      sections: [
        {
          subheading: "3.1 Stok ve son kullanma tarihi",
          paragraphs: [
            `Test kitleri ve breathalyzer'ın çalışır, kalibrasyonlu ve son kullanma tarihi geçmemiş olması gerekir. Süresi dolmuş bir kit yanlış sonuç verebilir. Üçüncü Zabit kit stokunu ve SKT'lerini izler, eksikleri ikmal eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kit SKT'sini izle",
              text: `Süresi geçmiş bir test kiti yanlış negatif/pozitif verebilir ve programın güvenilirliğini yok eder. Kit tarihleri de diğer emniyet ekipmanı gibi takip edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Gizlilik ve Pozitif Sonuç",
      sections: [
        {
          subheading: "4.1 Gizli bildirim",
          paragraphs: [
            `Pozitif bir sonuç, gizlilikle ve doğrudan kaptana, ardından şirkete bildirilir. Süreç, kişinin onurunu koruyacak ve dedikoduya yol açmayacak biçimde yürütülür. Şirket politikasına göre pozitif sonuç genelde görevden alma ve ileri işlemle sonuçlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Gizlilik şart",
              text: `D&A sonuçları hassas kişisel veridir. Sızdırılması hem etik ihlal hem hukuki sorundur. Sonuç yalnızca yetkili (kaptan/şirket) ile gizlilikle paylaşılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Chain of Custody ve Kayıt",
      sections: [
        {
          subheading: "5.1 Gözetim zinciri",
          paragraphs: [
            `Numune alımından sonuca kadar gözetim zinciri (chain of custody) korunur: kim aldı, nasıl saklandı, kim test etti kayıt altına alınır. Bu, özellikle pozitif sonuçlarda itirazlara karşı sonucun geçerliliğini sağlar. İmha kayıtları da tutulur.`,
          ],
          table: {
            caption: "Chain of custody öğeleri",
            headers: ["Aşama", "Kayıt"],
            rows: [
              ["Numune alımı", "Kim, ne zaman, kimden"],
              ["Saklama/taşıma", "Koşullar, mühür"],
              ["Test/sonuç", "Yöntem, sonuç, tanık"],
              ["İmha", "Kit/numune imha kaydı"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. Liman Denetimleri",
      sections: [
        {
          subheading: "6.1 Otorite/terminal D&A talebi",
          paragraphs: [
            `Bazı liman devletleri (örn. USCG) veya terminaller D&A denetimi talep edebilir. Üçüncü Zabit, bu denetimlerde sürecin koordinasyonunu yapar ve gemi programının kayıtlarını sunar. Hazır ve düzenli bir program, bu denetimleri sorunsuz geçirir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 D&A program kontrolü",
          bullets: [
            `Random test belirsiz aralık ve tarafsız seçimle yapılıyor mu?`,
            `Yeni katılan/olay sonrası testler uygulanıyor mu?`,
            `Test kitleri/breathalyzer çalışır, kalibrasyonlu ve SKT geçerli mi?`,
            `Pozitif sonuçlar gizlilikle kaptan/şirkete bildiriliyor mu?`,
            `Chain of custody korunuyor, kayıtlar tutuluyor mu?`,
            `Kit imha kayıtları mevcut mu?`,
            `Liman/terminal D&A denetimine hazır mı?`,
          ],
          paragraphs: [
            `D&A test yönetimi, emniyetin en hassas ama en gerekli alanlarından biridir; tarafsız uygulama, gizlilik ve sağlam gözetim zinciri gerektirir. Üçüncü Zabitin düzenli ve adil programı; etki altındaki bir kişinin tüm gemiyi tehlikeye atmasını önleyen caydırıcı bir kalkandır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
