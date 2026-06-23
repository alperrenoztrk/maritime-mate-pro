import type { Scenario } from "./types";

/**
 * Çevre (environment) — kirlilik önleme/uyum karar senaryoları.
 * Kural atıfları MARPOL Ek I, Ek V, Ek VI ve SOPEP gerekliliklerine dayanır.
 */

export const environmentScenarios: Scenario[] = [
  {
    id: "env-ows-15ppm-pressure",
    topicKey: "environment",
    title: "Sintine Tahliyesi: 15 ppm Alarmı",
    level: "officer",
    briefing:
      "Makine dairesi sintine suyunu OWS ile denize basıyorsunuz. Gemi rota üzerinde ve açıkta. Aniden 15 ppm monitörü alarm veriyor ve tahliye otomatik duruyor. Baş mühendis 'iş bitsin, by-pass yapalım' diyor.",
    learningGoals: [
      "Makine dairesi sintine tahliyesi koşullarını (≤15 ppm, en route, alarmlı OWS)",
      "By-pass (magic pipe) talebinin yasadışılığı",
      "Oil Record Book doğruluğu",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Monitör 15 ppm'i aştığı için tahliye durdu. By-pass yapmak teknik olarak mümkün ama yasadışı.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "By-pass'ı reddederim; suyu sintineye/slop tankına geri alır, OWS'yi kontrol ederim",
            outcome: "safe",
            feedback:
              "Doğru. 15 ppm aşılınca tahliye durur ve su geri yönlendirilir. By-pass kesinlikle yapılmaz; OWS arızası giderilir.",
            source: { code: "MARPOL Ek I", detail: "≤15 ppm ve alarmlı OWS ile tahliye" },
            next: "step2",
          },
          {
            text: "Baş mühendisin talebiyle kısa süreli by-pass yaparım",
            outcome: "danger",
            feedback:
              "Yasadışı ve ağır cezalı. 'Magic pipe' MARPOL ihlalidir; hapis ve büyük para cezalarına yol açmıştır.",
            source: { code: "MARPOL Ek I", detail: "By-pass yasağı" },
            next: "step2",
          },
          {
            text: "Monitörü kapatıp tahliyeyi sürdürürüm",
            outcome: "danger",
            feedback:
              "İhlal. İzleme cihazını devre dışı bırakmak by-pass ile eşdeğer suçtur.",
            source: { code: "MARPOL Ek I", detail: "Oil content monitor zorunluluğu" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Tahliye durduruldu. Oil Record Book'a kayıt zamanı.",
        question: "ORB'ye nasıl işlersiniz?",
        choices: [
          {
            text: "Gerçek işlemi (durdurma dâhil) doğru kodla ve imzayla kaydederim",
            outcome: "safe",
            feedback:
              "Doğru. ORB gerçek tank/OWS verisiyle tutarlı olmalıdır; bu en sık denetlenen belgedir.",
            source: { code: "MARPOL Ek I", detail: "Oil Record Book doğruluğu" },
          },
          {
            text: "Sorun çıkmasın diye olayı hiç yazmam",
            outcome: "danger",
            feedback:
              "İhlal. Eksik/sahte ORB kaydı ciddi yaptırım nedenidir.",
            source: { code: "MARPOL Ek I", detail: "Kayıt yükümlülüğü" },
          },
          {
            text: "Tahliyeyi başarılı gibi yazarım",
            outcome: "danger",
            feedback:
              "Sahtecilik. ORB'de gerçeğe aykırı kayıt suçtur.",
            source: { code: "MARPOL Ek I", detail: "Sahte kayıt yasağı" },
          },
        ],
      },
    ],
    debrief:
      "Makine dairesi sintinesi yalnızca ≤15 ppm, gemi en route ve 15 ppm alarmlı OWS koşullarında tahliye edilir. Alarm verince tahliye durur ve su geri alınır. By-pass ('magic pipe') ve monitörü devre dışı bırakmak ağır cezalı MARPOL ihlalidir. Tüm işlemler Oil Record Book'a doğru ve dürüstçe kaydedilir.",
  },
  {
    id: "env-garbage-plastic-disposal",
    topicKey: "environment",
    title: "Çöp Yönetimi: Plastik ve Gıda Atığı",
    level: "cadet",
    briefing:
      "Açık denizde, kıyıdan 30 nm uzakta, gemi en route. Mutfaktan plastik ambalaj, gıda atığı ve karışık çöp toplandı. Bir tayfa 'açıktayız, hepsini denize atalım' diyor.",
    learningGoals: [
      "Plastik denize atma yasağını kavramak",
      "Gıda atığı tahliye mesafelerini bilmek",
      "Çöp ayrıştırma ve Garbage Record Book disiplini",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Çöp karışık: plastik + gıda atığı + diğer. Kıyıdan 30 nm açıktasınız.",
        question: "Plastik atıklar için ne yaparsınız?",
        choices: [
          {
            text: "Plastiği asla denize atmam; gemide depolar, limanda alım tesisine veririm",
            outcome: "safe",
            feedback:
              "Doğru. Plastik her zaman ve her yerde denize atılamaz; karaya teslim edilir.",
            source: { code: "MARPOL Ek V", detail: "Plastik denize atma yasağı" },
            next: "step2",
          },
          {
            text: "Açıkta olduğumuz için plastiği denize atarım",
            outcome: "danger",
            feedback:
              "İhlal. Plastik yasağı mesafeye bağlı değildir; istisnasız yasaktır.",
            source: { code: "MARPOL Ek V", detail: "Plastik istisnasız yasak" },
            next: "step2",
          },
          {
            text: "Plastiği yakarım (incinerator onaylı değil)",
            outcome: "risky",
            feedback:
              "Dikkat. Yakma yalnızca onaylı incinerator ile ve belirli atıklar için yapılır; gelişigüzel yakma uygun değildir.",
            source: { code: "MARPOL Ek VI", detail: "Gemide yakma kuralları" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Gıda atığı için karar veriyorsunuz. Öğütücü (comminuter) mevcut.",
        question: "Gıda atığını nasıl yönetirsiniz?",
        choices: [
          {
            text: "Öğütüp (≤25 mm) >3 nm'de; öğütmeden ise >12 nm'de, en route tahliye ederim (özel alan değilse)",
            outcome: "safe",
            feedback:
              "Doğru. Öğütülmüş gıda >3 nm, öğütülmemiş >12 nm; özel alanlarda kurallar daha katıdır. İşlemi GRB'ye kaydederim.",
            source: { code: "MARPOL Ek V", detail: "Gıda atığı tahliye mesafeleri" },
          },
          {
            text: "Tüm karışık çöpü gıda ile birlikte denize atarım",
            outcome: "danger",
            feedback:
              "İhlal. Karışık çöp ayrıştırılmadan ve plastik içerirken atılamaz; ayrıştırma şarttır.",
            source: { code: "MARPOL Ek V", detail: "Çöp ayrıştırma" },
          },
          {
            text: "Hiçbir kayıt tutmadan gıda atığını atarım",
            outcome: "risky",
            feedback:
              "Eksik. Tahliye uygun olsa bile Garbage Record Book'a kaydedilmelidir.",
            source: { code: "MARPOL Ek V", detail: "Garbage Record Book" },
          },
        ],
      },
    ],
    debrief:
      "Plastik denize ASLA atılmaz — mesafe fark etmez. Gıda atığı (özel alan dışında, en route) öğütülmüşse >3 nm, öğütülmemişse >12 nm tahliye edilebilir; ama önce çöp ayrıştırılır ve her işlem Garbage Record Book'a kaydedilir. 'Açıktayız, atalım' yaklaşımı plastik ve karışık çöp için ihlaldir.",
  },
];
