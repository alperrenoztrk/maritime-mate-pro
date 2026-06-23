import type { Scenario } from "./types";

/**
 * Gemicilik (seamanship) — operasyon/manevra karar senaryoları.
 * Kural atıfları yerleşik gemicilik uygulamaları, OCIMF mooring kılavuzları,
 * SOLAS pilot transfer ve squat/UKC ilkelerine dayanır.
 */

export const seamanshipScenarios: Scenario[] = [
  {
    id: "seamanship-anchor-dragging",
    topicKey: "seamanship",
    title: "Demir Tarıyor: Gece Ani Rüzgâr",
    level: "officer",
    briefing:
      "Demirde gece vardiyasındasınız. Rüzgâr aniden 35 knot'a çıktı. GPS demir alarmı çaldı ve gemi referans kerterizlerine göre kayıyor; zincir gergin ve titreşimli. Yakında başka demirli gemiler var.",
    learningGoals: [
      "Tarama (dragging) belirtilerini tanımak",
      "Önce makineyi hazır etme refleksini geliştirmek",
      "Kaloma/ikinci demir/yeniden demirleme kararları",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Alarm çaldı, zincir gergin/titreşimli, gemi referanslara göre kayıyor.",
        question: "İlk eyleminiz nedir?",
        choices: [
          {
            text: "Kaptanı çağırır, makineyi stand-by ettiririm ve baş üstünü uyarırım",
            outcome: "safe",
            feedback:
              "Doğru. Tarama belirtisinde önce makine hazır edilir ve kaptan çağrılır; gemi her an manevraya hazır olmalıdır.",
            source: { code: "Good Seamanship / STCW", detail: "Şüphede kaptanı çağır; makineyi hazır et" },
            next: "step2",
          },
          {
            text: "Alarmı susturup beklerim, kendiliğinden tutar",
            outcome: "danger",
            feedback:
              "Tehlikeli. Tarama ilerledikçe karaya oturma veya başka gemiye çatma riski büyür; beklemek kayıptır.",
            source: { code: "Good Seamanship", detail: "Erken müdahale" },
            next: "step2",
          },
          {
            text: "Hemen demir alıp seyre çıkarım",
            outcome: "risky",
            feedback:
              "Acele. Önce durum değerlendirilir ve makine hazır edilir; ani demir alma trafikte ve karanlıkta risk taşır.",
            source: { code: "Good Seamanship", detail: "Durum değerlendirmesi" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Makine hazır, kaptan köprüüstünde. Gemi hâlâ hafifçe kayıyor, etrafta demirli gemiler var.",
        question: "Sonraki adım ne olur?",
        choices: [
          {
            text: "Kaloma artırır; tutmazsa makineyle destekler veya yeniden demirler/seyre çıkarım",
            outcome: "safe",
            feedback:
              "Doğru. Önce kaloma artırılır; yetmezse makine ile baş tutulur, gerekirse yeniden demirleme veya emniyetli su arayışı yapılır.",
            source: { code: "Good Seamanship", detail: "Kaloma artırma ve makine desteği" },
          },
          {
            text: "İkinci demiri tam yolla bırakırım",
            outcome: "risky",
            feedback:
              "Dikkat. İkinci demir yardımcı olabilir ama kontrolsüz/yüksek hızda bırakmak zinciri/ırgatı zorlar; kontrollü yapılır.",
            source: { code: "Good Seamanship", detail: "İkinci demir kullanımı" },
          },
          {
            text: "Hiçbir şey değiştirmeden izlemeye devam ederim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Tarama sürerken eylemsizlik çatma/oturma ile sonuçlanır.",
            source: { code: "Good Seamanship", detail: "Eylemsizlik riski" },
          },
        ],
      },
    ],
    debrief:
      "Demir tarama belirtileri: alarm, sürekli gergin/titreşimli zincir, referanslara göre kayma. Doğru sıra: kaptanı çağır, makineyi stand-by et, baş üstünü uyar; sonra kaloma artır, tutmazsa makineyle destekle veya kontrollü ikinci demir / yeniden demirleme yap. Beklemek ve eylemsizlik en tehlikeli seçeneklerdir.",
  },
  {
    id: "seamanship-mooring-snapback",
    topicKey: "seamanship",
    title: "Bağlama: Aşırı Gergin Halat",
    level: "cadet",
    briefing:
      "Rıhtımda bağlama operasyonundasınız. Güçlü rüzgâr gemiyi rıhtımdan ayırıyor; bir baş halatı aşırı gerginleşti ve gıcırdıyor. Bir tayfa halatı ayarlamak için tam gerilim hattının üstünden geçmek üzere.",
    learningGoals: [
      "Snap-back tehlikesini ve geri tepme hattını tanımak",
      "Vinç freni ve gerilim yönetimini uygulamak",
      "Güvenli pozisyon ve iletişim",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Baş halatı aşırı gergin ve gıcırdıyor; tayfa gerilim hattının üzerinden geçecek.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Tayfayı durdururum; kimse gergin halatın geri tepme hattında durmaz",
            outcome: "safe",
            feedback:
              "Doğru. Gergin halat koparsa snap-back ölümcüldür; tüm güverte potansiyel tehlikeli kabul edilir ve geri tepme hattından uzak durulur.",
            source: { code: "OCIMF / Good Seamanship", detail: "Snap-back zone'dan uzak durma" },
            next: "step2",
          },
          {
            text: "Tayfa hızlı geçerse sorun olmaz, devam etsin derim",
            outcome: "danger",
            feedback:
              "Ölümcül risk. Halat ne zaman kopacağı bilinmez; geri tepme bir anda olur.",
            source: { code: "OCIMF", detail: "Snap-back ani ve öngörülemez" },
            next: "step2",
          },
          {
            text: "Halatı elle iterek gevşetmeye çalışırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Aşırı gergin halata elle müdahale edilmez; gerilim vinç/baba üzerinden kontrol edilir.",
            source: { code: "OCIMF", detail: "Gergin halata elle müdahale yasağı" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Personel güvenli mesafede. Halat gerilimini düşürmek gerekiyor.",
        question: "Gerilimi nasıl yönetirsiniz?",
        choices: [
          {
            text: "Vinçle kontrollü kaloma verir/ayarlar; freni doğru ayarlı tutarım",
            outcome: "safe",
            feedback:
              "Doğru. Vinç freni halatın kopma yükü altında kaymaya ayarlıdır; gerilim vinçle kontrollü yönetilir.",
            source: { code: "OCIMF", detail: "Vinç freni ve gerilim yönetimi" },
          },
          {
            text: "Halatı babadan aniden bırakırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Yük altındaki halatı ani bırakmak kontrolsüz savrulma ve yaralanma yaratır.",
            source: { code: "Good Seamanship", detail: "Yük altında ani bırakma yasağı" },
          },
          {
            text: "Hiçbir şey yapmadan rüzgârın dinmesini beklerim",
            outcome: "risky",
            feedback:
              "Yetersiz. Halat kopabilir; gerilim aktif olarak yönetilmelidir.",
            source: { code: "OCIMF", detail: "Aktif gerilim yönetimi" },
          },
        ],
      },
    ],
    debrief:
      "Aşırı gergin halat snap-back riski taşır ve bu, güvertedeki en ölümcül kazalardandır. Önce personeli geri tepme hattından uzaklaştır; gergin halata elle müdahale etme. Gerilimi vinç ile (kopma yükü altında kayan fren ile) kontrollü yönet. Ani bırakma ve eylemsizlik tehlikelidir.",
  },
];
