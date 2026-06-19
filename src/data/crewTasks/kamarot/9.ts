import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Kamara ve ortak alanlarda yangın/sigara güvenliği",
  roleSlug: "kamarot",
  taskIndex: 9,
  estimatedPages: 22,
  intro: `Yaşam mahalli, yangının en sık başladığı ve en hızlı can kaybına yol açabildiği bölgelerdendir; sigara, izinsiz elektrikli alet ve dikkatsizlik başlıca nedenlerdir. Kamarot, yaşam mahallinde sürekli dolaştığı için yangın güvenliğinin doğal bir gözcüsüdür: sigara alanlarının temizliği ve kül tablası kontrolü, fire door'ların kapalı tutulması, yangın detektör kapaklarının açık bulundurulması ve kamaralardaki riskli durumların (izinsiz alet, çoklu priz, açık ateş) raporlanması bu görevin kapsamındadır. Bu bölüm kamara/ortak alan yangın güvenliğini ele alır.`,
  sources: [
    "SOLAS Chapter II-2 — yaşam mahalli yangın emniyeti",
    "FSS Code — yangın algılama sistemleri",
    "Şirket SMS — sigara ve elektrikli alet politikası",
    "Code of Safe Working Practices (COSWP)",
    "Yangın önleme pratiği",
  ],
  chapters: [
    {
      heading: "1. Yaşam Mahalli Yangın Riski",
      sections: [
        {
          subheading: "1.1 En sık başlangıç noktası",
          paragraphs: [
            `Yaşam mahalli yangınları çoğu zaman küçük bir dikkatsizlikten — söndürülmemiş sigara, aşırı yüklenmiş priz, izinsiz ısıtıcı — başlar ve hızla büyür. Kamarot, bu alanları sürekli görerek riskleri erken yakalayabilir. Yangın güvenliği, kamarotun günlük işinin doğal bir parçasıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Küçük kaynak, büyük yangın",
              text: `Bir kül tablasındaki köz veya aşırı yüklü bir çoklu priz, yaşam mahallinde ölümcül bir yangın başlatabilir. Bu küçük riskler ciddiye alınır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Sigara Güvenliği",
      sections: [
        {
          subheading: "2.1 Alan ve kül tablası",
          paragraphs: [
            `Sigara yalnızca izin verilen alanlarda içilir; kamarot bu alanların temizliğini ve kül tablalarının doğru (közü tam söndüren) kullanımını kontrol eder. Yatakta veya izinsiz alanda sigara izi/koku fark ederse raporlar. Sigara, yaşam mahalli yangınlarının başlıca nedenlerindendir.`,
          ],
          bullets: [
            `İzinli sigara alanları temiz tutuluyor mu?`,
            `Kül tablaları köz bırakmadan boşaltılıyor mu?`,
            `Yatakta/izinsiz alanda sigara izi var mı?`,
          ],
        },
      ],
    },
    {
      heading: "3. Fire Door ve Detektör",
      sections: [
        {
          subheading: "3.1 Yangın kapısı disiplini",
          paragraphs: [
            `Yaşam mahalli yangın kapıları kapalı (veya otomatik kapanır) tutulur; takozla açık bırakmak yangın ve dumanın yayılmasına yol açar. Kamarot, çalışırken bu kuralı uygular ve takozlanmış kapıyı düzeltir/raporlar. Bu yaygın ihlal, gerçek bir yangında ölümcül sonuç doğurur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Fire door kapalı kalır",
              text: `Yangın kapıları, bölmelere ayırma (compartmentation) ile yangını sınırlar. Takozla açık tutmak bu korumayı yok eder ve SOLAS II-2 ihlalidir.`,
            },
          ],
        },
        {
          subheading: "3.2 Detektör açıklığı",
          paragraphs: [
            `Yangın detektörlerinin (duman/ısı) önü kapatılmaz; üzeri örtülen veya boyanan bir detektör çalışmaz. Kamarot, yaşam mahallindeki detektörlerin açık ve işlevsel kalmasını gözetir; engellenmiş bir detektör raporlanır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Kamara Riskleri",
      sections: [
        {
          subheading: "4.1 İzinsiz alet ve priz",
          paragraphs: [
            `Kamaralarda izinsiz elektrikli alet (ısıtıcı, güçlü cihaz), kontrolsüz çoklu priz veya açık ateş kaynağı tespit edilirse kamarot derhal raporlar. Bu cihazlar, aşırı yüklenme ve yangına yol açabilir. Şirket politikası genelde belirli cihazları yasaklar.`,
          ],
          table: {
            caption: "Kamara yangın riskleri",
            headers: ["Risk", "Sonuç"],
            rows: [
              ["İzinsiz ısıtıcı/güçlü cihaz", "Aşırı yük, yangın"],
              ["Kontrolsüz çoklu priz", "Aşırı yük, kıvılcım"],
              ["Açık ateş (mum vb.)", "Doğrudan tutuşma"],
              ["Örtülü detektör", "Yangın algılanmaz"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. İlk Fark Eden Olmak",
      sections: [
        {
          subheading: "5.1 Erken alarm",
          paragraphs: [
            `Tek başına çalışırken kamarot, bir yangın belirtisini (duman, koku, sıcaklık) ilk fark eden kişi olabilir. Böyle bir durumda derhal alarm verir ve prosedüre göre hareket eder. Erken fark ediş, yaşam mahalli yangınında hayat kurtarır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Yangın/sigara güvenliği kontrolü",
          bullets: [
            `İzinli sigara alanları temiz, kül tablaları köz bırakmadan boşaltılıyor mu?`,
            `Fire door'lar kapalı/otomatik (takoz yok) mu?`,
            `Yangın detektörlerinin önü açık ve örtüsüz mü?`,
            `İzinsiz elektrikli alet/çoklu priz/açık ateş raporlanıyor mu?`,
            `Yatakta/izinsiz sigara izi izleniyor mu?`,
            `Yangın belirtisinde derhal alarm verme refleksi var mı?`,
          ],
          paragraphs: [
            `Kamara ve ortak alanlarda yangın/sigara güvenliği, kamarotun yaşam mahallini sürekli görmesinden doğan değerli bir gözetim görevidir. Kül tablası disiplini, fire door ve detektör farkındalığı, riskli cihaz raporlaması ve erken alarm; yaşam mahallini yangının en sık başladığı bölge olmaktan korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
