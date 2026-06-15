import type { RuleGroup } from "@/data/courseContent/types";

/**
 * GMDSS / Telsiz Haberleşmesi kuralları.
 *
 * İçerik gerçek, kaynak gösterilmiş düzenlemelere dayanır:
 *  - SOLAS Bölüm IV (Küresel Deniz Tehlike ve Güvenlik Sistemi - GMDSS)
 *  - ITU Radyo Tüzüğü (Radio Regulations)
 *  - IMO standart muhabere usulleri
 *
 * Uydurma kural yoktur; ifadeler ilke düzeyinde ve doğrudur.
 */
export const communicationRules: RuleGroup[] = [
  {
    title: "GMDSS Deniz Alanları ve Taşıma Gereklilikleri",
    source: {
      code: "SOLAS Bölüm IV",
      detail: "Küresel Deniz Tehlike ve Güvenlik Sistemi (GMDSS)",
      url: "https://www.imo.org/en/OurWork/Safety/Pages/RadiocommunicationsAndSearchAndRescue.aspx",
    },
    rules: [
      {
        subtitle: "Deniz Alanlarının (Sea Area) Tanımı",
        content: [
          "A1: En az bir VHF kıyı istasyonunun DSC (Sayısal Seçici Çağrı) kapsamı içindeki alan; genellikle kıyıdan yaklaşık 20-30 deniz mili.",
          "A2: A1 dışında kalan, en az bir MF kıyı istasyonunun DSC kapsamındaki alan; tipik olarak kıyıdan yaklaşık 100-150 deniz mili.",
          "A3: A1 ve A2 dışında kalan, Inmarsat geostationer uydu kapsamı içindeki alan (yaklaşık 70°K - 70°G enlemleri arası).",
          "A4: A1, A2 ve A3 dışında kalan kalan alanlar; esas olarak kutup bölgeleri. Burada HF haberleşmesi zorunludur.",
        ],
      },
      {
        subtitle: "Alanlara Göre Asgari Cihaz Taşıma",
        content: [
          "Tüm gemiler: VHF DSC, NAVTEX alıcısı (NAVTEX servisinin verildiği alanlarda), SART, taşınabilir VHF ve uydu EPIRB taşır.",
          "A1: VHF DSC yeterli olabilir; A1 dışına çıkan gemiler ek olarak MF veya uydu donanımına ihtiyaç duyar.",
          "A2: VHF + MF DSC donanımı.",
          "A3: VHF + MF/HF veya VHF + MF + Inmarsat (uydu) ya kombinasyonu.",
          "A4: VHF + MF/HF DSC (uydu kapsamı olmadığı için HF zorunludur).",
        ],
      },
      {
        subtitle: "GMDSS Temel İşlevleri",
        content: [
          "Tehlike uyarısının gemiden kıyıya, kıyıdan gemiye ve gemiden gemiye iletilmesi.",
          "Arama-kurtarma (SAR) koordinasyon ve sahada (on-scene) muhabere.",
          "Yer tayini sinyalleri (homing - SART, AIS-SART).",
          "Denizcilik Güvenlik Bilgilerinin (MSI) yayını ve genel haberleşme.",
          "Köprüden köprüye (bridge-to-bridge) muhabere.",
        ],
      },
    ],
  },
  {
    title: "Tehlike, İvedi ve Güvenlik Muhabereleri",
    source: {
      code: "ITU Radyo Tüzüğü",
      detail: "Madde 32-33: Tehlike, ivedi ve güvenlik öncelikleri",
    },
    rules: [
      {
        subtitle: "Öncelik Sırası ve İşaret Sözcükleri",
        content: [
          "MAYDAY (Tehlike / Distress): Gemi veya kişinin ciddi ve yakın bir tehlike içinde olduğunu ve hemen yardım istendiğini belirtir; en yüksek önceliğe sahiptir.",
          "PAN-PAN (İvedi / Urgency): Gemi veya kişinin güvenliğiyle ilgili çok acil bir mesaj olduğunu, ancak yakın tehlike bulunmadığını belirtir (örn. tıbbi yardım, dümen arızası).",
          "SÉCURITÉ (Güvenlik / Safety): Seyir güvenliği veya önemli meteorolojik uyarılarla ilgili mesajları belirtir.",
          "İşaret sözcüğü çağrının başında üç kez tekrar edilir.",
        ],
      },
      {
        subtitle: "MAYDAY Çağrı Formatı",
        content: [
          "'MAYDAY' üç kez söylenir.",
          "'BURASI' (THIS IS) ve geminin adı/çağrı işareti/MMSI üç kez tekrarlanır.",
          "Tehlikedeki geminin mevkii (enlem/boylam veya seçkin bir noktaya kerteriz ve mesafe) bildirilir.",
          "Tehlikenin niteliği (yangın, batma, çatışma vb.) ve istenen yardım türü açıklanır.",
          "Gemideki kişi sayısı ve diğer yararlı bilgiler eklenebilir; mesaj 'OVER' ile bitirilir.",
        ],
      },
      {
        subtitle: "Tehlike Frekansları",
        content: [
          "VHF Kanal 16 (156.8 MHz): Telsiz-telefon tehlike, güvenlik ve çağrı frekansı.",
          "VHF Kanal 70 (156.525 MHz): Yalnızca VHF DSC tehlike ve güvenlik çağrıları için kullanılır; sesli muhabere yapılmaz.",
          "MF 2182 kHz: Telsiz-telefon tehlike frekansı; MF 2187.5 kHz: DSC tehlike frekansı.",
          "Tehlike trafiği denetimi (distress traffic control) genellikle olayı koordine eden istasyon (RCC/CRS) tarafından yürütülür.",
        ],
      },
    ],
  },
  {
    title: "DSC, MSI ve NAVTEX",
    source: {
      code: "ITU Radyo Tüzüğü",
      detail: "DSC sistemi; IMO NAVTEX/MSI esasları",
    },
    rules: [
      {
        subtitle: "Sayısal Seçici Çağrı (DSC)",
        content: [
          "DSC, ön tanımlı dijital mesajlarla tehlike uyarısı ve çağrı kurmak için kullanılır; her istasyonun benzersiz 9 haneli MMSI numarası vardır.",
          "Tehlike uyarısı gönderildikten sonra muhabere uygun bir çalışma frekansına (VHF 16 veya MF 2182 kHz) kaydırılır.",
          "Mümkünse tehlikenin niteliği ve geminin mevkii uyarıya elle eklenmeli; aksi halde sistem 'undesignated' (belirsiz) uyarı gönderir.",
        ],
      },
      {
        subtitle: "NAVTEX ve Denizcilik Güvenlik Bilgileri (MSI)",
        content: [
          "NAVTEX, 518 kHz (uluslararası, İngilizce) ve 490 kHz (ulusal dilde) frekanslarında otomatik dar bant doğrudan baskı (NBDP) servisidir.",
          "Tipik kapsama kıyıdan yaklaşık 200-400 deniz milidir; A, B, C, D ve L işaretli mesajlar (seyir/meteoroloji uyarıları, SAR bilgileri) reddedilemez ve daima basılır.",
          "Açık deniz MSI'si, A3/A4 alanlarında uydu tabanlı Genişletilmiş Grup Çağrısı (EGC / SafetyNET) ile sağlanır.",
        ],
      },
    ],
  },
  {
    title: "EPIRB / SART, Telsiz Jurnali ve Yanlış Alarm",
    source: {
      code: "SOLAS Bölüm IV",
      detail: "Kural 15-17: Bakım, gözcülük ve kayıtlar; ITU usulleri",
    },
    rules: [
      {
        subtitle: "EPIRB ve SART Taşıma ile Testi",
        content: [
          "Uydu EPIRB 406 MHz Cospas-Sarsat sistemi üzerinden çalışır; kendiliğinden yüzer ve serbest bırakma (float-free) tertibatı ile donatılır, suya battığında otomatik tetiklenir.",
          "SART (Arama-Kurtarma Radar Cevaplayıcısı) 9 GHz (X-band) radar ekranında bir dizi nokta üreterek can salının/geminin yerini gösterir; AIS-SART ise AIS üzerinden mevki yayınlar.",
          "EPIRB ve SART düzenli olarak (yerleşik test fonksiyonuyla) sınanır; batarya son kullanma tarihi ve serbest bırakma mekanizması periyodik olarak kontrol edilir.",
        ],
      },
      {
        subtitle: "Telsiz Gözcülüğü ve Jurnal",
        content: [
          "Gemiler denizde iken VHF Kanal 70, ilgili alanlarda MF/HF 2187.5 kHz DSC ve uydu EGC üzerinde sürekli gözcülük (watch) tutar.",
          "GMDSS ile ilgili olaylar Telsiz Jurnaline (Radio Log) kaydedilir: tehlike/ivedi/güvenlik trafiği özetleri, cihaz testleri, batarya kontrolleri ve önemli olaylar.",
          "Cihazların çalışır halde tutulması için denizde onarım, kıyıda bakım veya yedek (duplikasyon) yöntemlerinden uygun olanı seçilir.",
        ],
      },
      {
        subtitle: "Yanlış Tehlike Alarmının İptali",
        content: [
          "Yanlışlıkla bir tehlike uyarısı gönderilirse derhal iptal edilmelidir; uyarı asla görmezden gelinmez.",
          "DSC yanlış alarmı, ilgili frekansta (örn. VHF 16) sesli olarak iptal edilir: gemi adı, çağrı işareti/MMSI ve 'cancel my distress alert' bildirilir.",
          "Inmarsat veya EPIRB ile gönderilen yanlış uyarılar ilgili kıyı kontrol istasyonuna/RCC'ye bildirilerek iptal ettirilir.",
        ],
      },
    ],
  },
];
