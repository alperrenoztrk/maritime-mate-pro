import type { Scenario } from "./types";

/**
 * Yük (cargo) — vardiya/operasyon karar senaryoları.
 * Kural atıfları IMSBC Code, International Grain Code, CSS Code ve IMDG Code
 * gerçek gerekliliklerine dayanır.
 */

export const cargoScenarios: Scenario[] = [
  {
    id: "cargo-liquefaction-nickel-ore",
    topicKey: "cargo",
    title: "Sıvılaşma Riski: Nikel Cevheri Yüklemesi",
    level: "officer",
    briefing:
      "Tropik bir limanda Grup A bir dökme yük (nikel cevheri konsantresi) yüklüyorsunuz. Yağmur var ve yük rıhtımda açıkta beklemiş. Sevkiyatçının beyanındaki nem içeriği TML'ye çok yakın; gözle yük ıslak görünüyor.",
    learningGoals: [
      "Grup A yüklerde sıvılaşma (liquefaction) riskini tanımak",
      "TML ile nem içeriği ilişkisini operasyonel karara bağlamak",
      "Şüphe hâlinde yüklemeyi durdurma ve doğrulama refleksi",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Yük ıslak görünüyor ve beyan edilen nem TML sınırına çok yakın. Yağmur sürüyor.",
        question: "İlk kararınız ne olur?",
        choices: [
          {
            text: "Yüklemeyi durdurur, nem/TML sertifikalarını doğrular ve kaptanı bilgilendiririm",
            outcome: "safe",
            feedback:
              "Doğru. Grup A yüklerde nem TML'yi aşarsa sıvılaşma ve tehlikeli liste/alabora riski vardır. Şüphe varsa yükleme durdurulur ve doğrulama yapılır.",
            source: { code: "IMSBC Code", detail: "Grup A — nem içeriği TML altında olmalı" },
            next: "step2",
          },
          {
            text: "Beyan TML altında olduğundan yüklemeye devam ederim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Yağmurda açıkta beklemiş yükün gerçek nemi beyandan yüksek olabilir; sınıra yakın değerde ve görsel ıslaklıkta yükleme sürdürülmez.",
            source: { code: "IMSBC Code", detail: "Sıvılaşabilen yükler (Grup A)" },
            next: "step2",
          },
          {
            text: "Yükü güvertede biraz kurutmaya çalışırım",
            outcome: "risky",
            feedback:
              "Yetersiz ve riskli. Saha kurutma kontrolsüzdür; karar laboratuvar nem/TML sertifikasına dayanmalıdır.",
            source: { code: "IMSBC Code", detail: "Nem belirleme prosedürleri" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Doğrulama için zaman gerekiyor; sevkiyatçı baskı yapıyor. Hızlı bir saha kontrolü mümkün.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Can testi (can test) gibi bir saha kontrolü yapar, ama nihai kararı sertifikaya bağlarım",
            outcome: "safe",
            feedback:
              "Doğru. Can testi hızlı bir uyarı verir; akış görülürse yük kesinlikle reddedilir. Ancak resmî karar laboratuvar sertifikasına dayanır.",
            source: { code: "IMSBC Code", detail: "Can test — saha gösterge kontrolü" },
          },
          {
            text: "Sevkiyatçının baskısıyla yüklemeyi sürdürürüm",
            outcome: "danger",
            feedback:
              "Tehlikeli. Ticari baskı, emniyet kararını değiştirmez. Sıvılaşan yük gemiyi kaybettiren kazalara yol açmıştır.",
            source: { code: "IMSBC Code", detail: "Kaptanın yükü reddetme yetkisi" },
          },
          {
            text: "Yükü kabul eder ama seyirde balastla dengelerim",
            outcome: "danger",
            feedback:
              "Yanlış. Balast, sıvılaşan yükün serbest yüzey/kayma etkisini çözmez; sorun yükün kendisindedir.",
            source: { code: "IMSBC Code", detail: "Sıvılaşma mekanizması" },
          },
        ],
      },
    ],
    debrief:
      "Grup A yüklerde temel kural: yük nemi TML'nin (≈0.90×FMP) altında olmalıdır. Sınıra yakın değer + görsel ıslaklık + yağmur, sıvılaşma için yüksek risktir. Doğru refleks: yüklemeyi durdur, sertifikayı doğrula, gerekirse can testi yap ve şüphede yükü reddet. Ticari baskı bu kararı değiştirmez.",
  },
  {
    id: "cargo-imdg-segregation",
    topicKey: "cargo",
    title: "Tehlikeli Yük: Uyumsuz Konteyner İstifi",
    level: "officer",
    briefing:
      "Konteyner gemisinde yükleme planını kontrol ediyorsunuz. Plan, bir Sınıf 5.1 (oksitleyici) konteynerini bir Sınıf 3 (yanıcı sıvı) konteynerinin hemen yanına yerleştiriyor. Ayrıca bir IMDG konteyneri yaşam mahalline bitişik planlanmış.",
    learningGoals: [
      "IMDG segregation tablosunun istif planındaki uygulaması",
      "Uyumsuz sınıfların ayrım gerekliliğini tanımak",
      "Plan hatasını yükleme öncesi yakalama disiplini",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Sınıf 5.1 ile Sınıf 3 konteynerleri yan yana planlanmış; segregation tablosu bu çift için ayrım gerektiriyor.",
        question: "Plana nasıl yaklaşırsınız?",
        choices: [
          {
            text: "Planı reddeder, segregation tablosuna göre konumları düzelttirir ve yeniden onaylatırım",
            outcome: "safe",
            feedback:
              "Doğru. Oksitleyici ile yanıcı sıvının yan yana istifi tehlikeli tepkime/yangın riskidir; tablo gereği ayrılmaları gerekir.",
            source: { code: "IMDG Code", detail: "Segregation tablosu — uyumsuz sınıflar" },
            next: "step2",
          },
          {
            text: "Aynı güvertede oldukları için sorun görmem",
            outcome: "danger",
            feedback:
              "Tehlikeli. Aynı güverte yeterli ayrım değildir; tablo 'separated from' gibi belirli bir mesafe/engel isteyebilir.",
            source: { code: "IMDG Code", detail: "Segregation dereceleri" },
            next: "step2",
          },
          {
            text: "Aralarına birkaç genel yük konteyneri koymayı öneririm",
            outcome: "risky",
            feedback:
              "Kısmen. Araya engel koymak gerekebilir ama bunun tablodaki ayrım derecesini karşıladığı doğrulanmalıdır; gelişigüzel yapılmaz.",
            source: { code: "IMDG Code", detail: "Ayrım yöntemleri" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Diğer sorun: bir IMDG konteyneri yaşam mahalline ve ısı kaynağına bitişik planlanmış.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Konteyneri yaşam mahalli ve ısı kaynaklarından uzağa aldırırım",
            outcome: "safe",
            feedback:
              "Doğru. Tehlikeli yük, yaşam mahalli ve ateş/ısı kaynaklarından uzak tutulur; acil durumda erişim de gözetilir.",
            source: { code: "IMDG Code", detail: "İstif kategorileri ve yerleşim" },
          },
          {
            text: "Yaşam mahalline yakınlık önemli değil, bırakırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Sızıntı/yangın hâlinde yaşam mahalline yakınlık can riskini doğrudan artırır.",
            source: { code: "IMDG Code", detail: "Yaşam mahalli/ısı kaynağından uzaklık" },
          },
          {
            text: "Sadece yangın battaniyesi bulundururum",
            outcome: "risky",
            feedback:
              "Yetersiz. Konum hatası ekipmanla telafi edilmez; önce doğru istif/ayrım sağlanır.",
            source: { code: "IMDG Code", detail: "Önce doğru istif" },
          },
        ],
      },
    ],
    debrief:
      "Tehlikeli yük istifi IMDG segregation tablosuna göre yapılır: uyumsuz sınıflar (örn. 5.1 oksitleyici ↔ 3 yanıcı sıvı) gerekli derecede ayrılır ('away from' / 'separated from' ...). Ayrıca tehlikeli yük yaşam mahalli ve ısı kaynaklarından uzak tutulur. Plan hataları yükleme ÖNCESİ yakalanır; aynı güverte ya da gelişigüzel araya yük koymak tek başına ayrım sayılmaz.",
  },
];
