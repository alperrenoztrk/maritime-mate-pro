import type { Scenario } from "./types";

/**
 * Ticari Operasyonlar (economics) — ticari karar senaryoları (beta).
 * Atıflar charter party uygulamaları, laytime/demurrage ilkeleri ve TCE
 * mantığının gerçek ticari denizcilik kurallarına dayanır.
 */
export const economicsScenarios: Scenario[] = [
  {
    id: "economics-nor-laytime",
    topicKey: "economics",
    title: "Laytime Başlıyor mu? NOR Geçerliliği",
    level: "officer",
    briefing:
      "Sefer çarteri (voyage charter) altında boşaltma limanına vardınız. Liman yoğun, serbest rıhtım yok ve demirde beklemeniz gerekiyor. Charter party 'whether in berth or not' (WIBON) ve 'NOR'dan 6 saat sonra laytime başlar' şartı içeriyor. Kiracı, 'gemi rıhtıma yanaşmadan NOR verilemez' diyor.",
    learningGoals: [
      "Geçerli NOR koşullarını ve laytime başlangıcını kavramak",
      "WIBON şartının demirde bekleme süresine etkisini değerlendirmek",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Gemi her bakımdan hazır ve charter party WIBON içeriyor. Kiracı NOR'u reddediyor.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Gemi hazırsa WIBON gereği demirde NOR veririm ve kaptana/acenteye yazılı kayıt tutarım",
            outcome: "safe",
            feedback:
              "Doğru. 'Whether in berth or not' şartı, rıhtım müsait olmasa da (gemi hazırsa) NOR verilebilmesini sağlar; laytime sözleşmedeki bekleme sonrası işler.",
            source: { code: "Charter Party (WIBON)", detail: "Rıhtım yoksa da geçerli NOR" },
            next: "step2",
          },
          {
            text: "Kiracı haklı; rıhtıma yanaşana kadar NOR vermem",
            outcome: "danger",
            feedback:
              "Yanlış. WIBON tam da bu durumu kapsar. NOR'u geciktirmek armatörün laytime/demurrage hakkını kaybettirir.",
            source: { code: "Charter Party (WIBON)", detail: "WIBON beklemeyi armatör lehine sayar" },
            next: "step2",
          },
          {
            text: "NOR'u sözlü veririm, kayıt tutmam",
            outcome: "risky",
            feedback:
              "Yetersiz. NOR'un geçerliliği ve zamanı uyuşmazlıkta kanıt gerektirir; yazılı verilmeli ve Statement of Facts'e işlenmelidir.",
            source: { code: "Laytime uygulaması", detail: "NOR yazılı ve kayıtlı olmalı" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Boşaltma başladı ama liman tatili ve kötü hava nedeniyle aralar oldu. Charter party 'weather working days, SHEX' diyor.",
        question: "Laytime sayımını nasıl yaparsınız?",
        choices: [
          {
            text: "Kötü hava ve tatil/pazar sürelerini laytime'dan düşer, Statement of Facts ile belgelerim",
            outcome: "safe",
            feedback:
              "Doğru. 'Weather working days' kötü havayı, 'SHEX' tatil/pazarı laytime dışı bırakır; gerçek olaylar time sheet ile kayıt altına alınır.",
            source: { code: "Laytime (WWD, SHEX)", detail: "Hava ve tatil istisnaları" },
          },
          {
            text: "Tüm geçen süreyi laytime sayarım",
            outcome: "danger",
            feedback:
              "Yanlış. WWD/SHEX şartları açıkça bu süreleri hariç tutar; hepsini saymak kiracıyla uyuşmazlık doğurur.",
            source: { code: "Laytime (WWD, SHEX)", detail: "İstisnalar sayımdan düşülür" },
          },
        ],
      },
    ],
    debrief:
      "Geçerli NOR, gemi her bakımdan hazır olduğunda verilir; WIBON şartı rıhtım müsait olmasa da demirde NOR verilmesini sağlar ve laytime sözleşmedeki bekleme süresi sonrası işler. NOR yazılı ve kayıtlı olmalıdır. Sayımda 'weather working days' kötü havayı, 'SHEX' tatil/pazarı hariç tutar; tüm olaylar Statement of Facts/time sheet ile belgelenir. Bu kayıtlar, demurrage/despatch uyuşmazlığının çözümünde esastır.",
  },
  {
    id: "economics-tce-fixture",
    topicKey: "economics",
    title: "Hangi Sefer? TCE Karşılaştırması",
    level: "officer",
    briefing:
      "Operatör olarak iki teklif arasında karar veriyorsunuz: (A) voyage charter, navlun $1.2M; tahmini sefer maliyeti (bunker+liman+kanal) $500k; toplam sefer 25 gün. (B) time charter, $20.000/gün. Geminin günlük OPEX'i $8.000.",
    learningGoals: [
      "TCE'yi hesaplayıp time charter hire ile karşılaştırmak",
      "Kararı net getiriye (OPEX sonrası) dayandırmak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Voyage teklifini değerlendirmek için ortak ölçü gerekiyor.",
        question: "Voyage charter'ın TCE'sini nasıl bulursunuz?",
        choices: [
          {
            text: "TCE = (Navlun − Sefer maliyetleri) / Sefer günü = (1.2M − 0.5M)/25 = $28.000/gün",
            outcome: "safe",
            feedback:
              "Doğru. TCE sefer net gelirini güne böler ve doğrudan time charter hire ile karşılaştırılabilir hâle getirir.",
            source: { code: "Sefer ekonomisi (TCE)", detail: "TCE = (navlun − sefer maliyeti)/gün" },
            next: "step2",
          },
          {
            text: "TCE = Navlun / Sefer günü = 1.2M/25 = $48.000/gün",
            outcome: "danger",
            feedback:
              "Yanlış. Sefer maliyetleri (bunker/liman/kanal) düşülmeden TCE bulunmaz; bu rakam yanıltıcıdır.",
            source: { code: "Sefer ekonomisi (TCE)", detail: "Sefer maliyetleri düşülmeli" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Voyage TCE'si $28.000/gün, time charter ise $20.000/gün. Geminin OPEX'i $8.000/gün.",
        question: "Hangi teklif ticari olarak daha cazip ve neden?",
        choices: [
          {
            text: "Voyage charter: TCE $28k > TC $20k; ikisi de OPEX'i karşılıyor ama voyage daha yüksek net getiri sağlıyor",
            outcome: "safe",
            feedback:
              "Doğru. TCE doğrudan hire ile kıyaslanır; $28k > $20k olduğundan voyage daha kârlıdır. Konumlanma (sonraki ballast leg) ve risk de göz önünde tutulur.",
            source: { code: "Sefer ekonomisi", detail: "TCE > hire ise voyage cazip" },
          },
          {
            text: "Time charter: sabit gelir her zaman daha iyidir",
            outcome: "risky",
            feedback:
              "Eksik. Sabit gelirin riski düşük olabilir, ama bu örnekte voyage TCE'si belirgin biçimde yüksek. Karar sayısal karşılaştırmaya ve risk iştahına dayanır, otomatik 'TC daha iyi' değildir.",
            source: { code: "Sefer ekonomisi", detail: "Karar TCE karşılaştırmasına dayanır" },
          },
        ],
      },
    ],
    debrief:
      "Farklı sefer tiplerini karşılaştırmanın yolu TCE'dir: (Navlun − Sefer maliyetleri) / Sefer günü. Sefer maliyetleri düşülmeden yapılan hesap (sadece navlun/gün) yanıltıcıdır. Bu örnekte voyage TCE $28k/gün, time charter $20k/gün; ikisi de $8k OPEX'i karşılar ama voyage daha yüksek net getiri verir. Nihai kararda konumlanma, karşı taraf riski ve piyasa beklentisi de tartılır.",
  },
];
