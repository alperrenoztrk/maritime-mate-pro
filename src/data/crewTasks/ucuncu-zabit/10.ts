import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Safety housekeeping",
  roleSlug: "ucuncu-zabit",
  taskIndex: 10,
  estimatedPages: 22,
  intro: `"Safety housekeeping" — emniyet düzeni ve erişilebilirliği — küçümsenen ama gerçek bir acilde hayat belirleyen bir konudur. Yangın dolabı önünün dolu olması, kaçış yolunun tıkanması, can salı bağlarının boyayla yapışıp serbest kalmaması veya yangın kapısının takozla açık tutulması; denetimde "ufak kusur" görünür ama gerçek bir yangın/terkde insan öldürür. Üçüncü Zabit (Safety Officer) bu düzeni sürekli gözetir. Bu bölüm safety housekeeping'i ele alır.`,
  sources: [
    "SOLAS Chapter II-2 — yangın emniyeti ve kaçış yolları",
    "SOLAS Chapter III — LSA erişilebilirliği",
    "FSS Code — yangın ekipmanı erişimi",
    "Code of Safe Working Practices (COSWP)",
    "Şirket SMS — housekeeping ve inspection rounds",
  ],
  chapters: [
    {
      heading: "1. Housekeeping Neden Hayati?",
      sections: [
        {
          subheading: "1.1 Erişilebilirlik = hayat",
          paragraphs: [
            `Bir yangın söndürücüye veya can salına saniyeler içinde ulaşmak gerektiğinde, önündeki bir engel ölümcül gecikme yaratır. Kaçış yolu tıkalıysa, mahsur kalmak demektir. Bu yüzden emniyet ekipmanının ve yollarının her zaman erişilebilir, çalışır ve serbest olması hayatidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ufak değil, ölümcül",
              text: `"Sadece birkaç kutu" yangın dolabı önünde dursa veya can salı bağı boyayla yapışsa, bu denetimde küçük görünür; ama gerçek bir acilde o saniyeler ve o takılan release, hayat kaybı demektir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Tipik Housekeeping Sorunları",
      sections: [
        {
          subheading: "2.1 Sık karşılaşılan kusurlar",
          paragraphs: [
            `Üçüncü Zabit, rondlarında şunları arar: yangın dolabı/söndürücü önünün dolu olması, kaçış yolu üzerinde malzeme, çürümüş can simidi ışığı, boyayla yapışmış can salı bağları (release serbest değil), pasla kilitlenmiş hidrant dolabı ve takozla açık tutulan yangın kapısı.`,
          ],
          table: {
            caption: "Housekeeping kusuru → risk",
            headers: ["Kusur", "Gerçek acilde sonuç"],
            rows: [
              ["Söndürücü önü dolu", "Ekipmana ulaşılamaz"],
              ["Kaçış yolu tıkalı", "Mahsur kalma"],
              ["Liferaft bağı boyalı", "Otomatik release çalışmaz"],
              ["Hidrant dolabı paslı", "Yangın suyu gecikir"],
              ["Yangın kapısı takozla açık", "Yangın/duman yayılır"],
            ],
          },
        },
        {
          subheading: "2.2 Yangın kapısı disiplini",
          paragraphs: [
            `Yangın kapıları, yangın ve dumanın yayılmasını engellemek için kapalı (veya otomatik kapanır) olmalıdır. Takoz/wedge ile açık tutmak, bu korumayı tümüyle yok eder. Üçüncü Zabit bu yaygın ihlali kararlılıkla düzeltir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Düzenli Rondlar",
      sections: [
        {
          subheading: "3.1 Safety rounds",
          paragraphs: [
            `Üçüncü Zabit düzenli emniyet rondları yaparak housekeeping kusurlarını yakalar ve anında düzeltir/düzelttirir. Tekrarlayan sorunlar için ekibi bilgilendirir; housekeeping bir kişinin değil, tüm mürettebatın sürekli sorumluluğudur.`,
          ],
          bullets: [
            `Yangın ekipmanı önü serbest mi?`,
            `Kaçış yolları açık ve işaretli mi?`,
            `LSA erişilebilir ve serbest mi?`,
            `Yangın kapıları kapalı/otomatik mi?`,
          ],
        },
      ],
    },
    {
      heading: "4. Kültür Oluşturmak",
      sections: [
        {
          subheading: "4.1 Herkesin sorumluluğu",
          paragraphs: [
            `Safety housekeeping, sadece denetim öncesi yapılan bir temizlik değil, günlük bir alışkanlıktır. Üçüncü Zabit, "bir şeyi yerine koymak" ve "yolu kapatmamak" bilincini tüm ekibe yayar. Sürdürülebilir emniyet, bu küçük günlük doğru davranışların toplamıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Anında düzelt",
              text: `Bir engel/kusur görüldüğünde "sonra hallederim" denmez; mümkünse anında düzeltilir. Ertelenen küçük kusurlar, gerçek bir acilde toplu bir tehlikeye dönüşür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Denetimle İlişki",
      sections: [
        {
          subheading: "5.1 Sürekli düzen",
          paragraphs: [
            `Housekeeping kusurları PSC'de sık çıkan bulgulardandır ve geminin genel emniyet kültürü hakkında izlenim yaratır. Sürekli düzenli bir gemi, denetimde de güven verir. Üçüncü Zabit bu düzeni her gün korur.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Safety housekeeping kontrolü",
          bullets: [
            `Yangın söndürücü/dolap önü serbest mi?`,
            `Kaçış yolları açık, işaretli ve aydınlatılmış mı?`,
            `Can salı bağları serbest (boyayla yapışmamış) mı?`,
            `Hidrant dolapları açılabilir (pasla kilitlenmemiş) mi?`,
            `Yangın kapıları kapalı/otomatik mi (takoz yok)?`,
            `Can simidi ışıkları sağlam mı?`,
            `Görülen kusurlar anında düzeltildi mi?`,
          ],
          paragraphs: [
            `Safety housekeeping, emniyetin en somut ve en günlük halidir: ekipmanın önünü açık, yolları serbest ve kapıları doğru tutmak. Üçüncü Zabitin sürekli rondu ve "anında düzelt" disiplini; gerçek bir acilde her saniyenin ve her ekipmanın hayat kurtarmasını sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
