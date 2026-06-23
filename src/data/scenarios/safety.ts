import type { Scenario } from "./types";

/**
 * Emniyet (safety) — acil durum karar senaryoları.
 * Kural atıfları SOLAS, LSA/FSS Code ve yerleşik kapalı mahal giriş
 * uygulamalarına dayanır.
 */

export const safetyScenarios: Scenario[] = [
  {
    id: "safety-enclosed-space-collapse",
    topicKey: "safety",
    title: "Kapalı Mahal: Yerde Yatan Tayfa",
    level: "officer",
    briefing:
      "Bir balast tankı muayenesi sırasında, içeri giren tayfanın baygın hâlde tank dibinde yattığını gözcü bildiriyor. Atmosfer girişten önce tam test edilmemiş olabilir. Köprüüstüne haber verildi.",
    learningGoals: [
      "Kapalı mahal kazalarında 'kurtarmaya koşma' refleksinin ölümcül olduğunu kavramak",
      "Korunaklı kurtarma prosedürünü uygulamak",
      "Atmosfer/oksijen azlığı tehlikesini önceliklendirmek",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Tank dibinde baygın bir kişi var; nedeni büyük olasılıkla oksijen azlığı veya zehirli gaz.",
        question: "İlk eyleminiz ne olur?",
        choices: [
          {
            text: "Alarm veririm, kurtarma ekibini ve SCBA/kurtarma donanımını çağırırım; korunmasız KİMSE girmez",
            outcome: "safe",
            feedback:
              "Doğru. Kapalı mahal kazalarında ölümlerin çoğu korunmasız kurtarıcılarda olur. Önce alarm, ekip ve solunum cihazı.",
            source: { code: "SOLAS / Enclosed Space Entry", detail: "Korunaklı kurtarma; solunum cihazı" },
            next: "step2",
          },
          {
            text: "Hemen içeri girip arkadaşımı dışarı çıkarırım",
            outcome: "danger",
            feedback:
              "Ölümcül hata. Aynı atmosfer sizi de bayıltır; kurban sayısı artar. Bu, en sık ölüm nedenidir.",
            source: { code: "Enclosed Space Entry", detail: "İçgüdüsel kurtarma yasağı" },
            next: "step2",
          },
          {
            text: "Bir nefes tutup hızlıca girer çıkarırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Oksijensiz ortamda nefes tutmak işe yaramaz; birkaç saniyede bilinç kaybedilebilir.",
            source: { code: "Enclosed Space Entry", detail: "O₂ azlığının ani etkisi" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Kurtarma ekibi ve SCBA hazırlanıyor; havalandırma başlatılabilir.",
        question: "Kurtarma nasıl yürütülür?",
        choices: [
          {
            text: "Havalandırmayı artırır, SCBA'lı ekip kurtarma halatı/üçayakla girer, gözcü dışarıda kalır",
            outcome: "safe",
            feedback:
              "Doğru. Havalandırma + SCBA + kurtarma halatı/tripod ile korunaklı giriş yapılır; gözcü iletişimi sürdürür.",
            source: { code: "SOLAS", detail: "Kapalı mahal kurtarma donanımı ve tatbikatı" },
          },
          {
            text: "Havalandırmayı beklemeden SCBA'sız ama hızlı girerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. SCBA olmadan giriş yine kurban yaratır; hız emniyetin yerini tutmaz.",
            source: { code: "Enclosed Space Entry", detail: "Solunum cihazı zorunluluğu" },
          },
          {
            text: "Tank ağzından su hortumuyla içeriyi serinletirim",
            outcome: "risky",
            feedback:
              "Konu dışı. Su, oksijen azlığını veya gazı çözmez; gereken havalandırma ve korunaklı kurtarmadır.",
            source: { code: "Enclosed Space Entry", detail: "Havalandırma esastır" },
          },
        ],
      },
    ],
    debrief:
      "Kapalı mahal acil durumunda altın kural: ASLA korunmasız girme. Önce alarm, kurtarma ekibi ve SCBA. Kurtarma; artırılmış havalandırma, solunum cihazı ve kurtarma halatı/üçayak ile yapılır, gözcü dışarıda iletişimi sürdürür. İçgüdüsel kurtarma, kapalı mahal ölümlerinin başlıca nedenidir.",
  },
  {
    id: "safety-engine-room-fire-co2",
    topicKey: "safety",
    title: "Makine Dairesi Yangını ve CO₂ Kararı",
    level: "officer",
    briefing:
      "Makine dairesinde yakıt kaynaklı bir yangın büyüyor. İlk müdahale yetersiz kaldı; sıcaklık yükseliyor. Kaptan, sabit CO₂ sistemini boşaltmayı değerlendiriyor.",
    learningGoals: [
      "CO₂ boşaltma öncesi zorunlu adımları (tahliye, sayım, kapatma) uygulamak",
      "Sınır soğutma ve yakıt izolasyonunun önemini kavramak",
      "Acil durumda doğru sıralamayı kurmak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Taşınabilir söndürücüler yetersiz kaldı; CO₂ boşaltma gündemde. Personel hâlâ makine dairesinde olabilir.",
        question: "CO₂ boşaltmadan önce ilk öncelik nedir?",
        choices: [
          {
            text: "Makine dairesini tamamen tahliye eder, personel sayımı yaparım",
            outcome: "safe",
            feedback:
              "Doğru. CO₂ boğucudur; boşaltmadan önce mahal mutlaka tahliye edilip kişi sayımı yapılır.",
            source: { code: "SOLAS / FSS Code", detail: "CO₂ boşaltma öncesi tahliye ve sayım" },
            next: "step2",
          },
          {
            text: "Zaman kaybetmeden CO₂'yi hemen boşaltırım",
            outcome: "danger",
            feedback:
              "Ölümcül. İçeride kişi varsa CO₂ onları boğar. Sayım yapılmadan boşaltma yapılmaz.",
            source: { code: "FSS Code", detail: "Boşaltma öncesi kişi sayımı" },
            next: "step2",
          },
          {
            text: "Önce kapıları açıp havalandırırım",
            outcome: "danger",
            feedback:
              "Yanlış. Açık kapı/havalandırma yangına oksijen verir ve CO₂'nin etkisini bozar; tam tersi gerekir.",
            source: { code: "FSS Code", detail: "Boşaltmadan önce mahal kapatılır" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Tahliye tamam, sayım eksiksiz. Boşaltma hazırlığı sürüyor.",
        question: "Boşaltmadan hemen önce ne yapılır?",
        choices: [
          {
            text: "Yakıtı kapatır (quick-closing valf), fanları durdurur, tüm açıklıkları kapatır; sonra boşaltırım",
            outcome: "safe",
            feedback:
              "Doğru. Yakıt ve havalandırma kesilip mahal sızdırmaz hâle getirilir; ardından iki ayrı işlemle CO₂ salınır. Sınır soğutma da sürdürülür.",
            source: { code: "SOLAS II-2 / FSS Code", detail: "Yakıt izolasyonu, fan stop, mahal kapatma" },
          },
          {
            text: "Açıklıkları açık bırakıp boşaltırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Açık mahalde CO₂ konsantrasyonu söndürme eşiğine ulaşmaz; yangın sürer.",
            source: { code: "FSS Code", detail: "Total flooding için mahal kapalı olmalı" },
          },
          {
            text: "Yakıtı açık tutar, sadece CO₂'ye güvenirim",
            outcome: "danger",
            feedback:
              "Yanlış. Yakıt beslemesi sürerse yangın yeniden parlar; önce yakıt izole edilir.",
            source: { code: "SOLAS II-2", detail: "Quick-closing valf ile yakıt kesimi" },
          },
        ],
      },
    ],
    debrief:
      "Sabit CO₂ ile söndürme katı bir sıra ister: (1) mahali tamamen tahliye et ve kişi SAYIMI yap, (2) yakıtı kapat (quick-closing valf) ve fanları durdur, (3) tüm açıklıkları kapat, (4) iki ayrı işlemle CO₂'yi boşalt, (5) sınır soğutmayı sürdür. CO₂ boğucudur; sayım yapılmadan asla boşaltılmaz ve boşaltma için mahal sızdırmaz olmalıdır.",
  },
];
