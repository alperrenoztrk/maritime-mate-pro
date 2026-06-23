import type { Scenario } from "./types";

/**
 * Stabilite (stability) — yükleme/stabilite karar senaryoları.
 * Kural atıfları IMO Intact Stability (IS) Code, International Grain Code ve
 * serbest yüzey etkisi ilkelerine dayanır.
 */

export const stabilityScenarios: Scenario[] = [
  {
    id: "stability-free-surface-slack-tanks",
    topicKey: "stability",
    title: "Serbest Yüzey: Yarı Dolu Tanklar",
    level: "officer",
    briefing:
      "Yükleme tamamlandı. Yüklü gemi limandan çıkacak. Birden fazla balast ve yakıt tankı yarı dolu (slack). Hesaplanan GM düşük çıkıyor ve gemi limanda hafif tendır (yumuşak) hissi veriyor.",
    learningGoals: [
      "Serbest yüzey etkisinin (FSE) GM'yi azalttığını kavramak",
      "Slack tank sayısını azaltma kararını uygulamak",
      "Düzeltilmiş GM ile yola çıkma disiplini",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Birçok tank slack; serbest yüzey momenti GM'yi düşürüyor ve gemi yumuşak davranıyor.",
        question: "Düşük GM'nin başlıca nedenini nasıl ele alırsınız?",
        choices: [
          {
            text: "Slack tank sayısını azaltırım (tankları doldurur veya tamamen boşaltırım)",
            outcome: "safe",
            feedback:
              "Doğru. Serbest yüzey etkisi slack tanklarda en yüksektir; tankları press-up (doldurma) veya boşaltma FSE'yi azaltır ve etkin GM'yi artırır.",
            source: { code: "IMO IS Code", detail: "Serbest yüzey düzeltmesi (FSC)" },
            next: "step2",
          },
          {
            text: "GM zaten pozitif, olduğu gibi yola çıkarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Düzeltilmiş GM kriterin altındaysa deniz hâlinde aşırı yalpa/stabilite kaybı riski vardır; FSE düzeltmesi şarttır.",
            source: { code: "IMO IS Code", detail: "Asgari GM kriterleri" },
            next: "step2",
          },
          {
            text: "Güverteye ağırlık ekleyip dengelerim",
            outcome: "danger",
            feedback:
              "Yanlış yön. Güverteye ağırlık KG'yi yükseltir ve GM'yi daha da düşürür; sorun serbest yüzeydir.",
            source: { code: "IMO IS Code", detail: "KG ve GM ilişkisi" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Slack tanklar azaltıldı. Yola çıkış öncesi son kontrol.",
        question: "Yola çıkış kararını neye dayandırırsınız?",
        choices: [
          {
            text: "Serbest yüzey düzeltmeli GM'nin IS Code kriterlerini sağladığını doğrularım",
            outcome: "safe",
            feedback:
              "Doğru. Karar, FSE düzeltmesi yapılmış (etkin) GM'nin asgari kriterleri sağlamasına dayanır.",
            source: { code: "IMO IS Code", detail: "Düzeltilmiş GM ile uygunluk" },
          },
          {
            text: "Limanda dengeli görünüyor, yeterli sayarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Liman hissi yanıltıcıdır; karar hesaplanmış kriterlere dayanmalıdır.",
            source: { code: "IMO IS Code", detail: "Hesaba dayalı uygunluk" },
          },
          {
            text: "Sadece başlangıç GM'sini (FSE'siz) kontrol ederim",
            outcome: "risky",
            feedback:
              "Eksik. FSE düzeltmesi yapılmamış GM gerçek durumu yansıtmaz; etkin GM kullanılır.",
            source: { code: "IMO IS Code", detail: "Serbest yüzey düzeltmesi zorunlu" },
          },
        ],
      },
    ],
    debrief:
      "Serbest yüzey etkisi (FSE) slack (yarı dolu) tanklarda GM'yi düşürür ve gemiyi 'yumuşak' yapar. Çözüm: slack tank sayısını azalt (press-up veya boşalt). Yola çıkış kararı, FSE düzeltmesi yapılmış ETKİN GM'nin IS Code kriterlerini sağlamasına dayanır — liman hissi veya düzeltmesiz GM değil.",
  },
  {
    id: "stability-grain-heel",
    topicKey: "stability",
    title: "Tahıl Stabilitesi: Yola Çıkış Onayı",
    level: "officer",
    briefing:
      "Dökme tahıl yüklemesi bitti. Bir ambar kısmen dolu (slack) kaldı. Grain loading hesabında tahıl kayması yatma açısı kriterin sınırında ve kaptan yola çıkış için sizden kontrol istiyor.",
    learningGoals: [
      "Grain Code kriterlerini (heel ≤12°, residual area ≥0.075 m·rad, GM ≥0.30 m)",
      "Slack ambar ve tahıl kayması ilişkisini kavramak",
      "Yapısal önlemlerle riski azaltmak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Slack ambar tahıl kayması momentini artırıyor; hesaplanan heel kriterin sınırında.",
        question: "Yola çıkış öncesi yaklaşımınız?",
        choices: [
          {
            text: "Slack ambarı azaltırım (trimleme/overstowing) ve Grain Code kriterlerini yeniden doğrularım",
            outcome: "safe",
            feedback:
              "Doğru. Slack yüzey kayma momentini artırır; trimleme, saddle/feeder veya overstowing ile azaltılır ve kriterler yeniden kontrol edilir.",
            source: { code: "International Grain Code", detail: "Slack ambar ve kayma momenti" },
            next: "step2",
          },
          {
            text: "Sınırda da olsa kriter sağlanıyor, dokunmadan çıkarım",
            outcome: "risky",
            feedback:
              "Riskli. Sınır değer, deniz hâlinde marj bırakmaz; mümkünse kayma momenti azaltılır.",
            source: { code: "International Grain Code", detail: "Stabilite marjı" },
            next: "step2",
          },
          {
            text: "Hesaba güvenmeyip GM'yi düşürmek için balast basarım",
            outcome: "danger",
            feedback:
              "Yanlış. GM'yi gereksiz düşürmek tahıl heel'ini büyütür; amaç yeterli GM ve düşük kayma momentidir.",
            source: { code: "International Grain Code", detail: "GM ≥ 0.30 m kriteri" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Önlemler alındı; onaylı Grain Loading Manual ve hesap önünüzde.",
        question: "Yola çıkışı neye göre onaylarsınız?",
        choices: [
          {
            text: "Heel ≤12°, residual area ≥0.075 m·rad ve GM ≥0.30 m kriterlerinin sağlandığını doğrularım",
            outcome: "safe",
            feedback:
              "Doğru. Onay, Grain Code'un üç temel kriterinin onaylı manuel/hesapla sağlandığını göstermeye dayanır.",
            source: { code: "International Grain Code", detail: "Heel/area/GM kriterleri" },
          },
          {
            text: "Document of Authorization olmadan kaptanın sözüyle çıkarım",
            outcome: "danger",
            feedback:
              "Yanlış. Tahıl yüklemesi için yetki belgesi ve onaylı Grain Loading Manual zorunludur.",
            source: { code: "International Grain Code", detail: "Document of Authorization" },
          },
          {
            text: "Sadece gözle dengeli görünüyor diye onaylarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Tahıl stabilitesi göz kararıyla değil, onaylı hesapla doğrulanır.",
            source: { code: "International Grain Code", detail: "Hesaba dayalı onay" },
          },
        ],
      },
    ],
    debrief:
      "Tahıl yola çıkışı, International Grain Code'un üç kriterine dayanır: tahıl kayması heel ≤ 12°, residual area ≥ 0.075 m·rad ve GM ≥ 0.30 m. Slack ambar kayma momentini artırır; trimleme/overstowing ile azaltılır. Onay, Document of Authorization ve onaylı Grain Loading Manual hesabıyla yapılır — göz kararıyla değil.",
  },
];
