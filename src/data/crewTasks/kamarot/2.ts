import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bulaşık ve mutfak destek işleri",
  roleSlug: "kamarot",
  taskIndex: 2,
  estimatedPages: 23,
  intro: `Kamarot, gemi mutfağının (galley) işleyişinde aşçının (cook) en yakın destekçisidir. Bu görev; bulaşık yıkama (makine veya elde), kap-kacak ve servis araçlarının organizasyonu, mutfak genel temizliğine destek, aşçının talimatıyla basit hazırlık işleri (sebze doğrama, malzeme çıkarma) ve servis ekipmanının bakımını kapsar. Bu bölüm; bulaşık hijyeninin gıda güvenliğindeki rolünü, doğru yıkama-durulama-sanitasyon zincirini, galley temizlik standartlarını ve bıçak/ekipman emniyetini profesyonel düzeyde açıklar. Temiz bulaşık ve düzenli mutfak, gemideki gıda kaynaklı salgınları önlemenin görünmeyen ilk savunma hattıdır.`,
  sources: [
    "MLC 2006 Standard A3.2 — Food and Catering (galley hygiene)",
    "Codex Alimentarius — HACCP Principles (CAC/RCP 1-1969)",
    "WHO Five Keys to Safer Food",
    "ILO/WHO Guide to Ship Sanitation — Galley and Food Handling",
    "Ship's Cook Certification — Galley Hygiene Standards (MCA MGN)",
    "ISO 22000 — Food Safety Management (referans çerçeve)",
    "Manufacturer manuals — Dishwasher / Galley Equipment Operation",
  ],
  chapters: [
    {
      heading: "1. Galley'de Kamarotun Rolü ve Gıda Güvenliği",
      lead: `Mutfak desteği, kamarotun gıda güvenliği zincirindeki en kritik halkasıdır. Temiz bulaşık ve düzenli galley olmadan, en iyi pişen yemek bile zehirlenme kaynağına dönüşebilir.`,
      sections: [
        {
          subheading: "1.1 Aşçı-kamarot işbölümü",
          paragraphs: [
            `Galley'de aşçı pişirmeden, kamarot ise temizlik, bulaşık ve hazırlık desteğinden sorumludur; bu işbölümü servisin akışını belirler. Kamarot, aşçının talimatıyla malzeme çıkarır, basit ön hazırlık (sebze yıkama/doğrama, malzeme tartma) yapar ve servis sonrası tüm bulaşık-temizlik yükünü üstlenir. İyi koordinasyon, küçük bir mutfakta iki kişinin verimli çalışmasını sağlar.`,
            `Galley, geminin en yüksek gıda riski taşıyan alanıdır; sıcak yüzeyler, keskin aletler, kaynar sıvı ve patojen riski bir aradadır. Kamarot bu ortamda hem hijyen hem de iş güvenliği disiplinini sürekli korur.`,
          ],
        },
        {
          subheading: "1.2 Bulaşığın gıda güvenliğindeki yeri",
          paragraphs: [
            `Kirli veya yetersiz yıkanmış tabak-çatal, doğrudan ağza giden bir kontaminasyon yoludur. Yanlış yıkanan bir kesme tahtası, çiğ etten pişmiş gıdaya patojen taşıyabilir. Bu nedenle bulaşık, "kirlilik temizleme" değil, gıda güvenliği işlemidir ve doğru yöntemle (yıkama → durulama → sanitasyon) yapılmalıdır.`,
            `MLC denetiminde galley hijyeni, bulaşık alanı düzeni, ekipman temizliği ve depolama kontrol edilir. Yağlı, kirli veya düzensiz bir galley doğrudan MLC bulgusu doğurur ve geminin gıda güvenliği yönetimine güveni sarsar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — galley hijyeni",
              text: `Mutfak ve gıda hazırlık alanları temiz, hijyenik ve iyi onarılmış tutulmalıdır. Bulaşık, ekipman ve yüzey hijyeni catering standardının parçasıdır; ihlal denetimde doğrudan bulgu doğurur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Bulaşık Yıkama: Üç Aşamalı Sistem",
      sections: [
        {
          subheading: "2.1 Yıkama → durulama → sanitasyon zinciri",
          paragraphs: [
            `Profesyonel bulaşık, üç aşamalı sistemle yapılır: (1) ön kazıma ve sıcak deterjanlı su ile yıkama (yağ ve kalıntı çözülür), (2) temiz sıcak su ile durulama (deterjan kalıntısı uzaklaşır), (3) sanitasyon (yüksek sıcaklıkta su veya kimyasal sanitizer ile mikrop öldürme). Tek aşamalı "deterjanla silip bırakma" hijyenik bulaşık değildir.`,
            `Elde yıkamada genellikle üç gözlü evye (wash–rinse–sanitise) kullanılır. Sanitasyon ya çok sıcak su (≈82°C) ya da onaylı bir kimyasal sanitizer ile yapılır. Sıcak su sanitasyonunda yanık riski nedeniyle eldiven kullanılır. Kurulama bezi yerine hava ile kurutma tercih edilir; kirli bez yeniden bulaştırır.`,
          ],
          table: {
            caption: `Üç Aşamalı Bulaşık Sistemi (manuel)`,
            headers: ["Aşama", "İşlem", "Sıcaklık/Not"],
            rows: [
              ["1. Yıkama", "Deterjanlı sıcak su, yağ/kalıntı çöz", "≈45-50°C"],
              ["2. Durulama", "Temiz sıcak su", "Deterjan kalıntısı yok"],
              ["3. Sanitasyon", "Sıcak su veya sanitizer", "≈82°C / kimyasal doz"],
              ["Kurutma", "Hava ile kurutma", "Kirli bez kullanma"],
            ],
          },
        },
        {
          subheading: "2.2 Bulaşık makinesi kullanımı",
          paragraphs: [
            `Bulaşık makinesi varsa, doğru kullanım kritiktir: tabaklar önce kabaca kazınır, makineye doğru yerleştirilir (su jeti her yüzeye ulaşmalı), uygun deterjan-parlatıcı dozajı sağlanır ve makinenin yıkama/durulama sıcaklığı kontrol edilir. Endüstriyel makinelerde durulama suyu yaklaşık 82-85°C olmalıdır; bu sıcaklık sanitasyonu sağlar.`,
            `Makine her gün sonunda boşaltılıp temizlenir; filtre temizliği, kireç kontrolü ve süzgeç boşaltma rutin bakımdır. Tıkalı filtre hem yıkamayı bozar hem de koku ve bakteri üretir. Makine arızası (ısıtmama, su almama) derhal bildirilir; düşük sıcaklıkta yıkanan bulaşık sanitize olmaz.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Ön kazıma şart",
              text: `Bulaşık makinesi yağ/yemek çözücü değil sanitize edicidir. Tabaklar makineye konmadan kabaca kazınmazsa filtre tıkanır, jetler tıkanır ve bulaşık temiz çıkmaz. "Kazı, yerleştir, doğru dozla, sıcaklığı doğrula" sırası izlenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kesme Tahtası, Bıçak ve Çapraz Bulaşma",
      sections: [
        {
          subheading: "3.1 Çiğ-pişmiş ayrımı ve renk kodlu tahtalar",
          paragraphs: [
            `Çapraz bulaşmanın en tehlikeli yolu, çiğ et/tavuk/balık ile pişmiş gıda veya salatanın aynı tahta/bıçakla işlenmesidir. Profesyonel mutfaklarda renk kodlu kesme tahtaları kullanılır (örn. kırmızı: çiğ et, mavi: çiğ balık, yeşil: sebze/meyve, beyaz: pişmiş/süt ürünü). Kamarot, hazırlık desteğinde bu ayrımı titizlikle uygular.`,
            `Çiğ tavuk ve et, Salmonella ve Campylobacter gibi ciddi patojenler taşır; bu patojenlerin pişmiş yemeğe geçmesi gemide salgına yol açar. Her kullanım sonrası tahta ve bıçak yıkanıp sanitize edilir, çiğ ürün işlendikten sonra eller yıkanır.`,
          ],
          table: {
            caption: `Renk Kodlu Kesme Tahtası Sistemi (yaygın standart)`,
            headers: ["Renk", "Kullanım", "Risk"],
            rows: [
              ["Kırmızı", "Çiğ kırmızı et", "Yüksek (patojen)"],
              ["Mavi", "Çiğ balık/deniz ürünü", "Yüksek + alerjen"],
              ["Sarı", "Çiğ tavuk/kümes", "Çok yüksek (Salmonella)"],
              ["Yeşil", "Sebze ve meyve", "Orta"],
              ["Beyaz", "Pişmiş gıda / ekmek / süt", "Düşük (son ürün)"],
            ],
          },
        },
        {
          subheading: "3.2 Bıçak ve keskin alet emniyeti",
          paragraphs: [
            `Bıçak emniyeti, gemi mutfağında en sık iş kazası kaynaklarındandır. Kör bıçak keskin bıçaktan daha tehlikelidir çünkü baskı gerektirir ve kayar. Bıçaklar keskin, temiz ve doğru saklanır (bıçaklık/manyetik şerit); evye içinde köpük altında asla bırakılmaz — köre dokunan el ciddi kesik alır.`,
            `Doğrama sırasında "köprü tutuş" ve doğru kesme tekniği kullanılır, parmaklar bıçaktan uzak tutulur. Ağır havada doğrama işi mümkünse ertelenir veya azaltılır; yalpada bıçak kontrolü zorlaşır. Kesik durumunda gıda kontamine olur ve ilk yardım uygulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Bıçağı köpük altında bırakma",
              text: `Bulaşık suyu içinde görünmez kalan bıçak, ele uzanan birinde derin kesik yaratır. Bıçaklar ayrı yıkanır, hemen kurutulur ve saklanır. Köprüde elin emniyeti için bıçak asla köpük/su altında bekletilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Hazırlık Desteği: Sebze, Malzeme ve Saklama",
      sections: [
        {
          subheading: "4.1 Ön hazırlık (mise en place)",
          paragraphs: [
            `Kamarot, aşçının talimatıyla basit ön hazırlık yapar: sebze-meyve yıkama, soyma, doğrama, malzeme tartma ve buzdolabından çıkarma. Sebzeler kirden ve olası kalıntıdan arındırmak için iyice yıkanır; bu, gıda güvenliğinin parçasıdır. Doğrama, aşçının istediği boyut ve düzende yapılır.`,
            `Hazırlanan malzeme, kullanılana kadar uygun sıcaklıkta tutulur; oda sıcaklığında uzun bekletilen malzeme danger zone'a girer. Çiğ et/tavuk hazırlığı en son yapılır veya ayrı alanda yapılır ve sonrasında yüzeyler sanitize edilir.`,
          ],
        },
        {
          subheading: "4.2 Soğuk depolama ve FIFO",
          paragraphs: [
            `Buzdolabı ve dondurucu düzeni gıda güvenliğinin temelidir. Çiğ gıda her zaman alt rafta (damlama pişmiş gıdayı kirletmesin diye), pişmiş/hazır gıda üst rafta saklanır. Saklama "FIFO" (first in, first out) ilkesiyle yapılır: önce gelen önce kullanılır, eski stok öne alınır. Açık gıda kapalı kaba alınır ve etiketlenir (tarih).`,
            `Buzdolabı sıcaklığı (0-5°C) ve dondurucu (≤ -18°C) düzenli kontrol edilir; kapı uzun açık bırakılmaz. Son kullanma tarihi geçen veya bozulan ürün ayrılır ve aşçıya bildirilir. Düzenli soğuk depo, hem güvenlik hem de stok israfını önler.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "FIFO ve raf düzeni",
              text: `Çiğ gıda alt rafta, pişmiş üstte; damlama çapraz bulaşmayı önler. FIFO ile eski stok önce kullanılır. Her açık ürün kapalı ve tarihli saklanır. Bu basit düzen, hem gıda zehirlenmesini hem de israfı azaltır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Galley Genel Temizliği ve Yüzey Hijyeni",
      sections: [
        {
          subheading: "5.1 Tezgah, yüzey ve ekipman temizliği",
          paragraphs: [
            `Servis ve hazırlık sonrası tüm çalışma yüzeyleri (tezgah, kesme alanı), ocak çevresi, evye ve dokunma noktaları temizlenip sanitize edilir. Gıda temas yüzeyleri yeşil kodlu ekipmanla işlenir. Yağ birikimi temizlenir; biriken yağ hem hijyen hem de yangın riskidir.`,
            `Mikrodalga, fırın, mikser, et kıyma makinesi gibi ekipmanlar kullanım sonrası temizlenir; parçalanabilen ekipman sökülerek yıkanır. Sıcak yüzeylere dikkat edilir, elektrikli ekipman temizlenirken fişten çekilir.`,
          ],
        },
        {
          subheading: "5.2 Davlumbaz, filtre ve gider temizliği",
          paragraphs: [
            `Davlumbaz (galley range hood) ve yağ filtreleri düzenli temizlenir; biriken yağ galley yangınının en yaygın nedenidir. Yağlı filtre alev alabilir ve yangını havalandırma hattına taşıyabilir. Bu temizlik haftalık/programlı yapılır ve ihmal edilmez.`,
            `Yer giderleri (floor drains) ve evye süzgeçleri düzenli açılır; tıkalı gider koku, su birikmesi (kayma riski) ve haşere çeker. Yağın gidere dökülmesi tıkanma yapar; yağ ayrı toplanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Davlumbaz yağı = yangın",
              text: `Galley yangınlarının büyük kısmı davlumbaz ve filtrelerde biriken yağdan çıkar. Yağ filtreleri düzenli temizlenmezse tutuşur ve yangın havalandırma kanalına yayılır. Filtre temizliği bir hijyen değil, yangın emniyeti görevidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Galley İş Güvenliği",
      sections: [
        {
          subheading: "6.1 Yanık, kayma ve ağır hava",
          paragraphs: [
            `Galley iş kazaları açısından geminin en riskli alanlarından biridir: sıcak yüzeyler, kaynar sıvı, kızgın yağ ve keskin aletler bir aradadır. Sıcak kap eldivenle taşınır, kaynar su dikkatle boşaltılır, kızgın yağa su asla dökülmez. Zemin ıslak/yağlı kalmaz; kaymaz ayakkabı giyilir.`,
            `Ağır havada galley operasyonu özel risktir: yalpada devrilen kaynar tencere ciddi yanık yaratır. Kötü havada ocak fiddle'ları (pot clamp) kullanılır, kaplar az doldurulur ve yüksek riskli pişirme/doğrama azaltılır. Kamarot bu koşullarda hareketlerini yavaşlatır ve tutamak/korkuluk kullanır.`,
          ],
          table: {
            caption: `Galley Risk ve Önlem Tablosu`,
            headers: ["Risk", "Önlem", "Acil Durum"],
            rows: [
              ["Yanık (sıcak yüzey/sıvı)", "Eldiven, dikkatli taşıma", "Soğuk su, ilk yardım"],
              ["Kayma (ıslak/yağlı zemin)", "Kaymaz ayakkabı, anında temizlik", "Düşme raporu"],
              ["Kesik (bıçak)", "Keskin bıçak, doğru tutuş", "Baskı + ilk yardım"],
              ["Yağ yangını", "Filtre temizliği, su dökme", "Yangın battaniyesi/söndürücü"],
            ],
          },
        },
        {
          subheading: "6.2 Yağ yangınına müdahale bilinci",
          paragraphs: [
            `Galley'de yağ/fritöz yangınına asla su ile müdahale edilmez; su, kızgın yağı patlatarak yangını büyütür ve ciddi yanık yaratır. Yağ yangınında ısı kaynağı kesilir, yangın battaniyesi veya uygun sınıf söndürücü (galley'de genellikle özel söndürücü bulunur) kullanılır ve derhal alarm verilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Fritöz yangını",
              text: `Bir gemide aşırı ısınan fritöz tutuştu; panikle dökülen su, alevli yağı her yöne sıçrattı ve yangın büyüdü. Ders: yağ yangınına su yasaktır. Isı kesilir, battaniye/uygun söndürücü kullanılır, alarm verilir. Filtre/yağ temizliği bu yangınları en baştan önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Servis Araçları ve Bulaşık Sonrası Düzen",
      sections: [
        {
          subheading: "7.1 Kap-kacak organizasyonu",
          paragraphs: [
            `Yıkanan ve kurutulan tabaklar, bardaklar, çatal-bıçak ve servis kapları düzenli ve temiz dolaplara, doğru yerlerine kaldırılır. Nemli kaldırılan eşya leke ve mikrop tutar; tam kurutma şarttır. Organize bir kap-kacak düzeni, bir sonraki servisin hızlı ve hijyenik başlamasını sağlar.`,
            `Servis kaşıkları, maşalar ve özel servis araçları temizlenip ayrı tutulur. Kırık/çatlak tabak ve bardak ayıklanır; çatlak yüzey hem yaralanma hem de bakteri barınma riski taşır.`,
          ],
        },
        {
          subheading: "7.2 Bulaşık alanı ve atık düzeni",
          paragraphs: [
            `Bulaşık alanı her vardiya sonunda temizlenir; evye, tezgah ve zemin sanitize edilir. Gıda atığı MARPOL Annex V'e göre ayrılır ve gecikmeden boşaltılır. Yağ ve gres ayrı toplanır, gidere dökülmez. Düzenli bir bulaşık alanı, galley'in genel hijyeninin ölçüsüdür.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "8.1 Bulaşık ve mutfak destek kontrol listesi",
          bullets: [
            `Bulaşık üç aşamalı (yıka-durula-sanitize) yapıldı mı?`,
            `Makine durulama sıcaklığı (~82°C) ve filtre temizliği kontrol edildi mi?`,
            `Renk kodlu kesme tahtaları çiğ-pişmiş ayrımına uygun kullanıldı mı?`,
            `Bıçaklar keskin, temiz ve güvenli saklandı mı (köpük altında değil)?`,
            `Çiğ gıda alt rafta, FIFO ve tarih etiketi uygulandı mı?`,
            `Tezgah/ekipman sanitize, davlumbaz filtresi temiz mi?`,
            `Gider/süzgeç açık, yağ ayrı toplandı mı?`,
            `Yanık/kayma/yağ yangını önlemleri alındı mı?`,
            `Kap-kacak tam kuru ve düzenli kaldırıldı mı?`,
            `Gıda atığı MARPOL'a göre ayrıldı, bulaşık alanı temizlendi mi?`,
          ],
          paragraphs: [
            `Bulaşık ve mutfak desteği görünürde sıradan ama gerçekte gemideki gıda güvenliğinin temel taşıdır. Doğru yıkanmış bir tabak, doğru ayrılmış bir kesme tahtası ve temiz bir galley; bir salgını sessizce önler. Bu görevin titizlikle yapılması, hem mürettebatın sağlığını hem de geminin kesintisiz seferini korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
