import type { Scenario } from "./types";

/**
 * Haberleşme (communication) — GMDSS/tehlike haberleşmesi karar senaryoları.
 * Kural atıfları SOLAS Bölüm IV (GMDSS) ve telsiz haberleşme prosedürlerine dayanır.
 */

export const communicationScenarios: Scenario[] = [
  {
    id: "comm-distress-alert",
    topicKey: "communication",
    title: "Tehlike Çağrısı: Su Alıyoruz",
    level: "officer",
    briefing:
      "Gece vardiyasındasınız. Gemi ağır havada gövdeden su almaya başladı ve durum kötüleşiyor. Kaptan tehlike haberleşmesini başlatmanızı istedi. VHF-DSC ve diğer GMDSS cihazları çalışıyor.",
    learningGoals: [
      "DSC tehlike alarmı + sesli MAYDAY sırasını uygulamak",
      "MAYDAY mesajının doğru içeriğini kurmak",
      "Önceliklendirmeyi (MAYDAY/PAN-PAN) doğru yapmak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Gemi su alıyor ve batma tehlikesi büyüyor. Tehlike haberleşmesini başlatacaksınız.",
        question: "İlk adımınız nedir?",
        choices: [
          {
            text: "VHF-DSC'den tehlike (distress) alarmı gönderir, tehlike türünü seçer, sonra Ch.16'da sesli MAYDAY veririm",
            outcome: "safe",
            feedback:
              "Doğru. DSC tehlike alarmı (Ch.70) gönderilir, ardından Ch.16'da prosedüre uygun sesli MAYDAY verilir.",
            source: { code: "SOLAS Bölüm IV / GMDSS", detail: "DSC alarmı + sesli MAYDAY" },
            next: "step2",
          },
          {
            text: "Sadece Ch.16'da sesli anons yapar, DSC kullanmam",
            outcome: "risky",
            feedback:
              "Eksik. Sesli MAYDAY önemlidir ama önce DSC tehlike alarmı otomatik, hedefli ve konum içeren uyarıyı sağlar.",
            source: { code: "GMDSS", detail: "DSC önceliği" },
            next: "step2",
          },
          {
            text: "Önce PAN-PAN ile aciliyet çağrısı yaparım",
            outcome: "danger",
            feedback:
              "Yanlış öncelik. Batma tehlikesi ölümcül-acil bir durumdur; PAN-PAN değil MAYDAY (distress) gerekir.",
            source: { code: "GMDSS", detail: "MAYDAY vs PAN-PAN" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "DSC alarmı gönderildi; şimdi Ch.16'da sesli MAYDAY vereceksiniz.",
        question: "MAYDAY mesajını nasıl kurarsınız?",
        choices: [
          {
            text: "'MAYDAY ×3, gemi adı/çağrı işareti/MMSI, mevki, tehlike türü, yardım talebi, kişi sayısı'",
            outcome: "safe",
            feedback:
              "Doğru. MAYDAY mesajı kimlik, mevki, tehlike türü, yardım talebi ve gemideki kişi sayısını içerir.",
            source: { code: "GMDSS / Radio Procedures", detail: "MAYDAY mesaj içeriği" },
          },
          {
            text: "Sadece 'MAYDAY, batıyoruz' der, mevki vermem",
            outcome: "danger",
            feedback:
              "Yetersiz. Mevki ve kimlik olmadan kurtarma birimleri yönlendirilemez.",
            source: { code: "Radio Procedures", detail: "Mevki ve kimlik zorunlu" },
          },
          {
            text: "Teyit beklemeden cihazı kapatırım",
            outcome: "danger",
            feedback:
              "Yanlış. Teyit alınana kadar dinlemede kalınır ve gerekirse mesaj tekrarlanır.",
            source: { code: "Radio Procedures", detail: "Teyit ve tekrar" },
          },
        ],
      },
    ],
    debrief:
      "Batma gibi ölümcül-acil durumda MAYDAY (distress) önceliği kullanılır. Sıra: VHF-DSC tehlike alarmı (Ch.70) + tehlike türü → Ch.16'da sesli MAYDAY. Mesaj kimlik (gemi/çağrı işareti/MMSI), mevki, tehlike türü, yardım talebi ve kişi sayısını içerir. Teyit alınana dek dinlemede kalınır ve mesaj tekrarlanır.",
  },
  {
    id: "comm-false-alarm-cancel",
    topicKey: "communication",
    title: "Yanlış DSC Alarmı: Hızlı İptal",
    level: "cadet",
    briefing:
      "Eğitim sırasında bir tayfa yanlışlıkla VHF-DSC tehlike (distress) butonuna bastı ve bir tehlike alarmı yayınlandı. Gerçek bir tehlike yok. Köprüüstündesiniz.",
    learningGoals: [
      "Yanlış alarmın derhâl iptal edilmesi gerektiğini kavramak",
      "İptal yöntemini (Ch.16 sesli) doğru uygulamak",
      "Cihazı kapatmanın yanlış olduğunu anlamak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Yanlışlıkla bir DSC tehlike alarmı gönderildi; gerçek tehlike yok.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Derhâl Ch.16'da sesli olarak yanlış alarmı iptal ederim",
            outcome: "safe",
            feedback:
              "Doğru. Yanlış alarm hemen iptal edilir: Ch.16'da gemi adı, çağrı işareti, MMSI ve 'cancel my distress alert' bildirimi yapılır.",
            source: { code: "GMDSS", detail: "Yanlış alarm iptali" },
            next: "step2",
          },
          {
            text: "Cihazı kapatıp olayı görmezden gelirim",
            outcome: "danger",
            feedback:
              "Yanlış. Cihazı kapatmak alarmı iptal etmez; kurtarma kaynakları boşuna harekete geçer.",
            source: { code: "GMDSS", detail: "Cihaz kapatmak iptal değildir" },
            next: "step2",
          },
          {
            text: "Bir şey olmaz, beklerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. İptal edilmeyen yanlış alarm SAR kaynaklarını gereksiz seferber eder ve ciddi sorundur.",
            source: { code: "GMDSS", detail: "Yanlış alarm raporlama" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "İptal yayını yaptınız. Bir kıyı istasyonu/MRCC alarmı duymuş olabilir.",
        question: "Sonraki adım?",
        choices: [
          {
            text: "İlgili kıyı istasyonu/MRCC'ye yanlış alarmı bildirir ve kaydederim",
            outcome: "safe",
            feedback:
              "Doğru. İptal yayınının yanı sıra ilgili otoriteye bilgi verilir ve olay kayda geçirilir.",
            source: { code: "GMDSS", detail: "İlgili otoriteye bildirim" },
          },
          {
            text: "Kimseye haber vermem, iptal yeterli",
            outcome: "risky",
            feedback:
              "Eksik. İptal yayını esastır ama otoriteye bilgi ve kayıt da iyi uygulamadır.",
            source: { code: "GMDSS", detail: "Bildirim ve kayıt" },
          },
          {
            text: "MMSI'yi değiştiririm",
            outcome: "danger",
            feedback:
              "Yanlış. MMSI gemiye atanmıştır; değiştirilmez. Yapılması gereken iptal ve bildirimdir.",
            source: { code: "GMDSS", detail: "MMSI sabittir" },
          },
        ],
      },
    ],
    debrief:
      "Yanlışlıkla gönderilen DSC tehlike alarmı DERHÂL iptal edilir. Cihaz KAPATILMAZ; Ch.16'da sesli olarak gemi adı, çağrı işareti, MMSI ve 'cancel my distress alert' bildirilir. Ardından ilgili kıyı istasyonu/MRCC bilgilendirilir ve olay kaydedilir. İptal edilmeyen yanlış alarm SAR kaynaklarını boşuna seferber eder.",
  },
];
