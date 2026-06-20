import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Demir Irgadı (Windlass)",
  sectionId: "deck-machinery",
  topicIndex: 0,
  estimatedPages: 26,
  intro: `Demir ırgadı (windlass), geminin demirleme operasyonunda zincir ve demiri fonksiyonel olarak toplayan, fundo eden ve demir üzerinde gemiyi tutan ana güverte makinesidir. SOLAS ve klas kuralları, ırgadın belirli bir zincir ağırlığını sürekli kaldırabilecek ("continuous duty pull") ve kısa süreli daha yüksek yükü ("overload pull") karşılayacak şekilde boyutlandırılmasını şart koşar. Bu bölüm; ırgadın mekanik mimarisini (gypsy/wildcat, devirdaim freni, kavrama), tahrik sistemlerini (hidrolik, elektrik, buhar), holding/hauling kapasitesi hesabını, bakım ve arıza teşhisini ve demirleme operasyonundaki rolünü mühendislik derinliğinde ele alır. Amaç; zabit ve mühendisin ırgadı yalnızca "buton basılan" bir cihaz değil, kapasite limitleri ve emniyet kilitleri olan bir güç sistemi olarak kavramasıdır.`,
  sources: [
    "SOLAS Ch. II-1 — Equipment / anchoring arrangements",
    "IACS UR A1 & A2 — Equipment number & anchoring equipment",
    "ISO 3730 — Shipbuilding, mooring winches",
    "OCIMF Mooring Equipment Guidelines (MEG4)",
    "Üretici el kitapları (Rolls-Royce/MacGregor, Hatlapa, Brattvaag)",
  ],
  chapters: [
    {
      heading: "1. Görev, Tanım ve Sınıflandırma",
      lead: `Irgadın gemideki rolü, kapasite tanımları ve klas kurallarındaki yeri.`,
      sections: [
        {
          subheading: "1.1 Irgadın temel görevleri",
          paragraphs: [
            `Demir ırgadının üç ana görevi vardır: demiri fundo etmek (bırakmak), demiri ve zinciri geri toplamak (heave/hauling) ve gemiyi demir üzerinde tutmak (holding). Bu görevlerin her biri ırgadın farklı bir alt sistemini zorlar: fundo işleminde band freni ve serbest dönüş; toplama işleminde tahrik motoru ve dişli kutusu; tutma işleminde ise zincir stoppe ve gypsy freni belirleyicidir.`,
            `Modern gemilerde ırgat genellikle baş kasarada, baş pik bölmesinin üzerinde konumlanır ve her iki demir için ayrı gypsy (wildcat) içerir. Bazı tasarımlarda ırgat ve baş bağlama vinçleri ortak tahrik ünitesini (windlass-mooring winch combination) paylaşır.`,
          ],
          bullets: [
            `Fundo (let go): freni gevşet, demir serbest düşer`,
            `Heave up (vira): tahrikle zinciri topla`,
            `Hold: zincir stoppe + band freni ile gemiyi tut`,
            `Warping: drum ile halat alma (bağlama desteği)`,
          ],
        },
        {
          subheading: "1.2 Kapasite tanımları ve klas gereksinimi",
          paragraphs: [
            `IACS Unified Requirements (UR A1/A2), her geminin "equipment number" (EN) değerine göre demir ağırlığı, zincir çapı ve uzunluğunu belirler. Irgat bu zinciri belirli bir hızda kaldırabilmelidir. Tipik klas şartı: ırgat, üç kilit (shackle, ~82.5 m) suya batmış zinciri ve demiri en az 9 m/dk ortalama hızla toplayabilmelidir.`,
          ],
          table: {
            headers: ["Kapasite tanımı", "Tipik değer", "Süre"],
            rows: [
              ["Continuous duty pull", "Zincir kopma yükünün ~%18'i", "30 dk sürekli"],
              ["Overload pull", "Continuous'ün ~%150'si", "2 dk"],
              ["Holding (band brake)", "Zincir kopma yükünün ~%45'i", "Statik"],
              ["Hauling hızı", "≥ 9 m/dk", "Ortalama"],
            ],
            caption: "Klas tipik ırgat kapasite kriterleri (üreticiye göre değişir)",
          },
        },
      ],
    },
    {
      heading: "2. Mekanik Mimari",
      sections: [
        {
          subheading: "2.1 Gypsy (Wildcat) ve zincir yatağı",
          paragraphs: [
            `Gypsy (wildcat), zincirin baklalarına birebir oturacak şekilde profillenmiş dişli bir tamburdur. Her zincir çapı için ayrı gypsy gereklidir; baklaların gypsy yuvasına tam oturması, kayma ("jumping") ve zincir hasarını önler. Gypsy ile ana mil arasında kavrama (clutch/dog clutch) bulunur; fundo sırasında kavrama ayrılır ve gypsy serbest döner.`,
            `Zincir, gypsy'den spurling pipe (zincir borusu) üzerinden chain locker'a (zincir kuyusu) iner. Bitter end (zincirin son ucu) emniyetli bir şekilde ama acil durumda kesilebilecek biçimde kuyuya bağlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Gypsy uyumu",
              text: `Yanlış pitch'li gypsy ile çalışmak zincirin "tırmanmasına" ve fundo sırasında kontrolsüz boşalmaya yol açar. Zincir değişiminde gypsy uyumu mutlaka doğrulanır.`,
            },
          ],
        },
        {
          subheading: "2.2 Band freni, kavrama ve zincir stoppe",
          paragraphs: [
            `Band freni (brake band), gypsy'nin dış kasnağını saran ve volan ile sıkılan bir fren bandıdır. Demir üzerinde gemiyi tutan ana statik elemandır. Kavrama (clutch) gypsy ile tahrik milini bağlar/ayırır. Zincir stoppe (chain stopper / devil's claw / guillotine) ise demirleme tamamlandıktan sonra zinciri mekanik olarak kilitleyerek yükü ırgattan alır.`,
          ],
          bullets: [
            `Demir seyir konumuna alındığında yük zincir stoppe'ye aktarılır`,
            `Band freni yalnızca operasyon sırasında ve geçici tutmada kullanılır`,
            `Stoppe'siz uzun süre band freni ile durmak fren aşınmasına ve kaymaya yol açar`,
          ],
        },
      ],
    },
    {
      heading: "3. Tahrik Sistemleri",
      sections: [
        {
          subheading: "3.1 Hidrolik tahrik",
          paragraphs: [
            `Hidrolik ırgatlar, makine dairesi veya güverte altındaki bir hidrolik güç ünitesinden (HPU) beslenir. Değişken debili pompa, ırgat motoruna basınçlı yağ gönderir; hız ve tork basınç/debi ile ayarlanır. Hidrolik sistem aşırı yüke karşı doğal koruma sağlar: yük arttıkça basınç yükselir, emniyet valfi (relief valve) açılarak ırgadı durdurur ("stall"), böylece mekanik hasar önlenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Stall koruması",
              text: `Hidrolik ırgatta motor "stall" ettiğinde sistem zinciri zorlamaz; bu, demirin takıldığı (foul anchor) durumlarda güverteyi korur.`,
            },
          ],
        },
        {
          subheading: "3.2 Elektrikli tahrik",
          paragraphs: [
            `Elektrikli ırgatlarda kademeli (pole-changing) veya frekans çevirici (VFD) kontrollü motorlar kullanılır. Aşırı yük koruması termal röle ve akım sınırlama ile sağlanır. Elektrikli sistemler bakımı kolaydır ancak ani aşırı yükte motor zorlanır; bu nedenle "torque limiter" veya kayar kavrama (slip clutch) eklenebilir.`,
          ],
          table: {
            headers: ["Tahrik tipi", "Avantaj", "Dezavantaj"],
            rows: [
              ["Hidrolik", "Yumuşak tork, doğal aşırı yük koruması", "HPU ve hat bakımı, sızıntı riski"],
              ["Elektrik (VFD)", "Hassas hız, az bakım", "Aşırı yükte motor zorlanması"],
              ["Buhar", "Yüksek tork, basit", "Eski, verimsiz, yalnızca buharlı gemilerde"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Demirleme Operasyonu ve Irgat Kullanımı",
      sections: [
        {
          subheading: "4.1 Fundo (let go) prosedürü",
          paragraphs: [
            `Demir atmadan önce ırgat çalıştırılır, kavrama takılır ve demir suya kadar "walk back" ile indirilir (kontrollü). Köprüüstü "let go" komutu verdiğinde kavrama ayrılır, band freni gevşetilir ve demir serbest düşer. Zincir hızını band freni kontrol eder; aşırı hız zinciri ve gypsy'yi tahrip eder.`,
          ],
          bullets: [
            `Derin suda "walk back" ile indir, serbest fundo etme`,
            `Zincir markaları (shackle/kilit) ile boşalan zincir takip edilir`,
            `İstenen kalomaya ulaşınca band freni sıkılır ve stoppe takılır`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Derin su uyarısı",
              text: `90 m'den derin sularda serbest fundo zinciri kontrolsüz hızlandırır; daima tahrikle (walk back) indirilir. Aksi hâlde gypsy ve fren tahrip olur.`,
            },
          ],
        },
        {
          subheading: "4.2 Vira (heave up) ve dragging kontrolü",
          paragraphs: [
            `Vira sırasında ırgat zinciri toplar; köprüüstü ile baş arasında zincir yönü (leading direction) ve gerginlik (weight/up & down) iletişimi kritiktir. Demir taramaya başlarsa (dragging) ırgat zorlanmamalı, gerekirse makine desteği istenmelidir. Demir su yüzeyine geldiğinde "anchor aweigh" bildirilir ve yıkanarak (wash down) yuvasına alınır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Bakım, Muayene ve Arıza Teşhisi",
      sections: [
        {
          subheading: "5.1 Periyodik bakım",
          paragraphs: [
            `Irgat bakımı; dişli kutusu yağ seviyesi/analizi, band freni balata kalınlığı, hidrolik basınç testi, kavrama ve mil yataklarının greslenmesi ve gypsy aşınma kontrolünü kapsar. PMS (Planned Maintenance System) içinde haftalık çalıştırma testi ve yıllık detaylı muayene tanımlanır.`,
          ],
          table: {
            headers: ["Kontrol", "Periyot", "Kriter"],
            rows: [
              ["Band freni balata", "3 ayda bir", "Min. kalınlık üreticiye göre"],
              ["Dişli yağı", "Yıllık + analiz", "Su/metal içeriği limit altında"],
              ["Hidrolik basınç", "Yıllık", "Relief valf set basıncı doğru"],
              ["Gypsy aşınması", "Havuz/yıllık", "Bakla oturması tam"],
            ],
          },
        },
        {
          subheading: "5.2 Tipik arızalar",
          paragraphs: [
            `Aşağıdaki tablo saha arızalarını ve müdahaleyi özetler.`,
          ],
          table: {
            headers: ["Belirti", "Olası neden", "Müdahale"],
            rows: [
              ["Zincir alınamıyor / zayıf tork", "Hidrolik basınç düşük, pompa aşınması", "Basınç ölç, relief valf ve pompayı kontrol et"],
              ["Zincir gypsy'de atlıyor", "Yanlış/aşınmış gypsy", "Gypsy uyumunu doğrula, değiştir"],
              ["Band freni tutmuyor", "Balata aşınmış/yağlı", "Balatayı değiştir, yağ kaçağını gider"],
              ["Aşırı titreşim", "Mil/yatak hizasızlığı", "Hizalama ve yatak kontrolü"],
            ],
          },
          callouts: [
            {
              type: "example",
              title: "Saha örneği",
              text: `Demir alırken ırgadın "stall" etmesi çoğu kez foul anchor (demire takılmış kablo/zincir) işaretidir. Zorlamak yerine demir tekrar bırakılıp döndürülerek (clearing) serbest bırakılır.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
