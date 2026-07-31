import type { QuizQuestion } from "@/types/quiz";
import { communicationQuestionsExtended } from "@/data/communicationQuestionsExtended";

const baseCommunicationQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "GMDSS açılımı nedir?",
    options: [
      "Global Maritime Distress and Safety System",
      "General Marine Distress and Signal System",
      "Global Maritime Direction and Safety Service",
      "General Maritime Data and Safety System"
    ],
    correctAnswer: 0,
    explanation: "GMDSS, 'Global Maritime Distress and Safety System' yani Küresel Deniz Tehlike ve Güvenlik Sistemi anlamına gelir.",
    category: "GMDSS Genel"
  },
  {
    id: 2,
    question: "GMDSS dünya genelinde hangi tarihte tam olarak yürürlüğe girmiştir?",
    options: ["1 Şubat 1992", "1 Şubat 1999", "1 Ocak 2000", "1 Temmuz 2002"],
    correctAnswer: 1,
    explanation: "GMDSS, kademeli geçişin ardından 1 Şubat 1999 tarihinde tam olarak yürürlüğe girmiştir.",
    category: "GMDSS Genel"
  },
  {
    id: 3,
    question: "GMDSS gereklilikleri SOLAS'ın hangi bölümünde düzenlenmiştir?",
    options: ["Bölüm II-1", "Bölüm III", "Bölüm IV", "Bölüm V"],
    correctAnswer: 2,
    explanation: "Telsiz haberleşmesi (GMDSS) gereklilikleri SOLAS Bölüm IV'te (Chapter IV) düzenlenir.",
    category: "SOLAS Bölüm IV"
  },
  {
    id: 4,
    question: "A1 deniz sahası nasıl tanımlanır?",
    options: [
      "En az bir VHF DSC sahil istasyonunun kapsama alanı",
      "En az bir MF DSC sahil istasyonunun kapsama alanı",
      "Inmarsat uydu kapsama alanı",
      "HF kapsama alanı"
    ],
    correctAnswer: 0,
    explanation: "A1 sahası, sürekli DSC alarmı imkânı olan en az bir VHF sahil istasyonunun telsiz kapsama alanıdır (yaklaşık 20-30 NM).",
    category: "Deniz Sahaları"
  },
  {
    id: 5,
    question: "A2 deniz sahası hangi bandın DSC kapsamasıyla tanımlanır?",
    options: ["VHF", "MF", "HF", "Inmarsat"],
    correctAnswer: 1,
    explanation: "A2 sahası, A1 dışında kalan ve en az bir MF DSC sahil istasyonunun kapsama alanıdır (yaklaşık 100-150 NM).",
    category: "Deniz Sahaları"
  },
  {
    id: 6,
    question: "A3 deniz sahası neyle tanımlanır?",
    options: [
      "VHF kapsama alanı",
      "MF kapsama alanı",
      "Inmarsat (geostationary) uydu kapsama alanı",
      "Cospas-Sarsat kapsama alanı"
    ],
    correctAnswer: 2,
    explanation: "A3 sahası, A1 ve A2 dışında kalan ve Inmarsat geostationary uydularının kapsadığı alandır (yaklaşık 70°K - 70°G enlemleri arası).",
    category: "Deniz Sahaları"
  },
  {
    id: 7,
    question: "A4 deniz sahası neresidir?",
    options: [
      "Ekvator çevresi",
      "A1, A2 ve A3 dışında kalan kutup bölgeleri",
      "Tüm kıyı suları",
      "Sadece Kuzey Atlantik"
    ],
    correctAnswer: 1,
    explanation: "A4 sahası, A1, A2 ve A3 sahalarının dışında kalan bölgelerdir; pratikte kutup bölgeleridir ve HF haberleşmesine dayanır.",
    category: "Deniz Sahaları"
  },
  {
    id: 8,
    question: "DSC açılımı nedir?",
    options: [
      "Digital Selective Calling",
      "Direct Satellite Communication",
      "Distress Signal Code",
      "Digital Safety Control"
    ],
    correctAnswer: 0,
    explanation: "DSC, 'Digital Selective Calling' (Sayısal Seçmeli Çağrı) anlamına gelir; otomatik alarm ve çağrı için kullanılır.",
    category: "DSC"
  },
  {
    id: 9,
    question: "VHF DSC tehlike alarmları hangi kanaldan iletilir?",
    options: ["Kanal 6", "Kanal 13", "Kanal 16", "Kanal 70"],
    correctAnswer: 3,
    explanation: "VHF DSC çağrıları (tehlike dahil) Kanal 70 üzerinden yapılır; Kanal 16 ise sesli tehlike/çağrı kanalıdır.",
    category: "DSC"
  },
  {
    id: 10,
    question: "MF bandında DSC tehlike çağrısı için ayrılmış frekans hangisidir?",
    options: ["2182 kHz", "2187.5 kHz", "4207.5 kHz", "8414.5 kHz"],
    correctAnswer: 1,
    explanation: "MF bandında DSC tehlike çağrı frekansı 2187.5 kHz'dir; 2182 kHz ise telsiz telefon (sesli) tehlike frekansıdır.",
    category: "DSC"
  },
  {
    id: 11,
    question: "Telsiz telefonla (sesli) MF tehlike çağrısı için uluslararası frekans hangisidir?",
    options: ["2182 kHz", "2187.5 kHz", "500 kHz", "156.8 MHz"],
    correctAnswer: 0,
    explanation: "MF telsiz telefon tehlike ve çağrı frekansı 2182 kHz'dir.",
    category: "MF/HF Haberleşme"
  },
  {
    id: 12,
    question: "VHF Kanal 16'nın frekansı nedir?",
    options: ["156.300 MHz", "156.650 MHz", "156.800 MHz", "157.000 MHz"],
    correctAnswer: 2,
    explanation: "VHF Kanal 16'nın frekansı 156.800 MHz'dir ve uluslararası tehlike, güvenlik ve çağrı kanalıdır.",
    category: "VHF Haberleşme"
  },
  {
    id: 13,
    question: "VHF Kanal 13 öncelikli olarak ne için kullanılır?",
    options: [
      "Liman operasyonları",
      "Köprüüstünden köprüüstüne (seyir güvenliği) haberleşme",
      "Telsiz telefon tehlike",
      "Hava raporu yayını"
    ],
    correctAnswer: 1,
    explanation: "VHF Kanal 13, gemiden gemiye seyir güvenliği (bridge-to-bridge) haberleşmesi için ayrılmıştır.",
    category: "VHF Haberleşme"
  },
  {
    id: 14,
    question: "EPIRB cihazları hangi frekansta uydu üzerinden alarm gönderir?",
    options: ["121.5 MHz", "243 MHz", "406 MHz", "1530 MHz"],
    correctAnswer: 2,
    explanation: "Modern EPIRB'ler 406 MHz'de Cospas-Sarsat uydularına tehlike alarmı gönderir.",
    category: "EPIRB/SART"
  },
  {
    id: 15,
    question: "EPIRB'lerdeki 121.5 MHz sinyali ne amaçla kullanılır?",
    options: [
      "Uydu alarmı",
      "Kurtarma birimlerinin yön bulması (homing)",
      "DSC çağrısı",
      "NAVTEX yayını"
    ],
    correctAnswer: 1,
    explanation: "406 MHz alarm gönderirken, 121.5 MHz düşük güçlü sinyal arama-kurtarma birimlerinin EPIRB'i bulması (homing) için kullanılır.",
    category: "EPIRB/SART"
  },
  {
    id: 16,
    question: "SART'ın açılımı ve çalıştığı bant nedir?",
    options: [
      "Search and Rescue Transponder, 9 GHz (X-band) radar",
      "Safety Alert Radio Transmitter, VHF",
      "Search and Rescue Telephone, MF",
      "Satellite Alert Relay Terminal, Inmarsat"
    ],
    correctAnswer: 0,
    explanation: "SART, 'Search and Rescue Transponder'dır ve 9 GHz (X-band, 3 cm) radar sinyaline yanıt verir.",
    category: "EPIRB/SART"
  },
  {
    id: 17,
    question: "Radar SART, X-band radar ekranında nasıl görünür?",
    options: [
      "Tek bir parlak nokta",
      "Hedefe doğru uzanan 12 noktalı bir çizgi (blip dizisi)",
      "Dairesel bir halka",
      "Kesik kesik yanıp sönen alan"
    ],
    correctAnswer: 1,
    explanation: "SART, radar ekranında SART konumundan dışa doğru uzanan 12 noktadan oluşan bir nokta dizisi (arc/line of blips) olarak görünür.",
    category: "EPIRB/SART"
  },
  {
    id: 18,
    question: "NAVTEX yayınları hangi frekansta yapılır (uluslararası)?",
    options: ["490 kHz", "518 kHz", "4209.5 kHz", "2187.5 kHz"],
    correctAnswer: 1,
    explanation: "Uluslararası NAVTEX yayını 518 kHz'de İngilizce olarak yapılır; 490 kHz yerel dilde, 4209.5 kHz ise tropik bölge yayını içindir.",
    category: "NAVTEX/MSI"
  },
  {
    id: 19,
    question: "MSI'ın açılımı nedir?",
    options: [
      "Maritime Safety Information",
      "Marine Signal Index",
      "Maritime Satellite Interface",
      "Master Safety Instruction"
    ],
    correctAnswer: 0,
    explanation: "MSI, 'Maritime Safety Information' yani Deniz Güvenliği Bilgisi'dir (seyir/meteoroloji uyarıları, acil bilgiler).",
    category: "NAVTEX/MSI"
  },
  {
    id: 20,
    question: "NAVTEX mesajlarında alıcının filtreleyemediği (her zaman alınması zorunlu) mesaj türleri hangileridir?",
    options: [
      "A, B ve D",
      "Seyir uyarıları, meteoroloji uyarıları ve arama-kurtarma bilgisi",
      "Sadece D harfi",
      "Tüm mesajlar filtrelenebilir"
    ],
    correctAnswer: 1,
    explanation: "B1 karakteri A (seyir uyarısı), B (meteoroloji uyarısı) ve D (arama-kurtarma) olan mesajlar kapatılamaz; her zaman alınır.",
    category: "NAVTEX/MSI"
  },
  {
    id: 21,
    question: "MAYDAY çağrısı hangi durumda kullanılır?",
    options: [
      "Acil ama hayati olmayan bir durumda",
      "Ciddi ve yakın tehlike altında, derhal yardım gerektiğinde",
      "Güvenlik bilgisi yayınlanırken",
      "Rutin çağrılarda"
    ],
    correctAnswer: 1,
    explanation: "MAYDAY, bir gemi/uçak veya kişinin ciddi ve yakın bir tehlikede olduğunu ve derhal yardım istendiğini belirten tehlike (distress) sinyalidir.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 22,
    question: "PAN-PAN çağrısı neyi ifade eder?",
    options: [
      "Tehlike (distress)",
      "Aciliyet (urgency) - bir gemi veya kişinin güvenliğiyle ilgili acil mesaj",
      "Güvenlik (safety) bilgisi",
      "Rutin haberleşme"
    ],
    correctAnswer: 1,
    explanation: "PAN-PAN, aciliyet (urgency) sinyalidir; bir geminin veya kişinin güvenliğiyle ilgili acil ama hayati tehlike içermeyen mesajlarda kullanılır.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 23,
    question: "SÉCURITÉ çağrısı ne anlama gelir?",
    options: [
      "Tehlike",
      "Aciliyet",
      "Güvenlik (safety) - seyir veya meteoroloji uyarısı",
      "Tıbbi yardım talebi"
    ],
    correctAnswer: 2,
    explanation: "SÉCURITÉ, güvenlik (safety) sinyalidir; önemli bir seyir veya meteoroloji uyarısı yayınlanacağını bildirir.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 24,
    question: "Telsiz haberleşmesinde öncelik sırası nasıldır (en yüksekten en düşüğe)?",
    options: [
      "Aciliyet > Tehlike > Güvenlik > Rutin",
      "Tehlike > Aciliyet > Güvenlik > Rutin",
      "Güvenlik > Tehlike > Aciliyet > Rutin",
      "Tehlike > Güvenlik > Aciliyet > Rutin"
    ],
    correctAnswer: 1,
    explanation: "Öncelik sırası: Tehlike (Distress/MAYDAY) > Aciliyet (Urgency/PAN-PAN) > Güvenlik (Safety/SÉCURITÉ) > Rutin.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 25,
    question: "MAYDAY çağrısı sözlü olarak kaç kez tekrarlanarak başlatılır?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    explanation: "Telsiz telefon tehlike çağrısı 'MAYDAY MAYDAY MAYDAY' şeklinde üç kez tekrarlanarak başlatılır.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 26,
    question: "Bir tehlike çağrısının başka bir gemi tarafından tekrar iletilmesine (relay) ne ad verilir?",
    options: ["MAYDAY", "MAYDAY RELAY", "PAN-PAN RELAY", "SÉCURITÉ RELAY"],
    correctAnswer: 1,
    explanation: "Başka bir geminin tehlikesini ileten gemi 'MAYDAY RELAY' kullanır; kendi tehlikesi değildir.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 27,
    question: "MMSI'ın açılımı nedir?",
    options: [
      "Maritime Mobile Service Identity",
      "Marine Mobile Satellite Identity",
      "Maritime Master Ship Identification",
      "Mobile Marine Signal Indicator"
    ],
    correctAnswer: 0,
    explanation: "MMSI, 'Maritime Mobile Service Identity' yani Deniz Mobil Servis Kimliği'dir; 9 haneli benzersiz bir numaradır.",
    category: "MMSI"
  },
  {
    id: 28,
    question: "Bir gemi MMSI numarası kaç hanedir?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 2,
    explanation: "MMSI 9 haneli bir numaradır ve ilk üç hane MID (ülke/deniz kimlik kodu) içerir.",
    category: "MMSI"
  },
  {
    id: 29,
    question: "Bir gemi istasyonu MMSI'sinin ilk üç hanesi (MID) neyi belirtir?",
    options: [
      "Gemi tipini",
      "Tescil ülkesini (bayrak/deniz kimlik kodu)",
      "Gemi tonajını",
      "Çağrı işaretini"
    ],
    correctAnswer: 1,
    explanation: "MMSI'nin ilk üç hanesi olan MID (Maritime Identification Digits), geminin bağlı olduğu ülkeyi/idareyi belirtir.",
    category: "MMSI"
  },
  {
    id: 30,
    question: "ITU Radio Regulations (Telsiz Tüzüğü) hangi kuruluş tarafından yayımlanır?",
    options: ["IMO", "ICAO", "ITU", "WMO"],
    correctAnswer: 2,
    explanation: "Telsiz Tüzüğü (Radio Regulations), Uluslararası Telekomünikasyon Birliği (ITU) tarafından yayımlanır.",
    category: "ITU Telsiz Tüzüğü"
  },
  {
    id: 31,
    question: "Yanlışlıkla gönderilen bir DSC tehlike alarmı sonrası ilk yapılması gereken nedir?",
    options: [
      "Cihazı kapatıp beklemek",
      "Alarmı iptal etmek ve Kanal 16'dan sesli olarak iptal mesajı yayınlamak",
      "Limanı aramak",
      "Hiçbir şey yapmamak"
    ],
    correctAnswer: 1,
    explanation: "Yanlış DSC alarmı derhal cihazdan iptal edilmeli ve Kanal 16'dan sesli olarak 'cancel my distress alert' bildirimi yapılmalıdır.",
    category: "Yanlış Alarm İptali"
  },
  {
    id: 32,
    question: "Yanlış DSC tehlike alarmının sesli iptalinde hangi kanal kullanılır?",
    options: ["Kanal 70", "Kanal 16", "Kanal 13", "Kanal 6"],
    correctAnswer: 1,
    explanation: "İptal çağrısı VHF Kanal 16 (ya da MF için 2182 kHz) üzerinden sesli olarak yapılır; tüm istasyonlara 'all stations' hitabıyla bildirilir.",
    category: "Yanlış Alarm İptali"
  },
  {
    id: 33,
    question: "Inmarsat hangi tür uydu sistemine dayanır?",
    options: [
      "Alçak yörünge (LEO)",
      "Geostationary (jeostatik) yörünge",
      "Orta yörünge (MEO)",
      "Kutupsal yörünge"
    ],
    correctAnswer: 1,
    explanation: "Inmarsat, ekvator üzerinde sabit görünen geostationary (jeostatik) uydular kullanır; bu nedenle yaklaşık ±70° enlemleri kapsar.",
    category: "Uydu Haberleşme"
  },
  {
    id: 34,
    question: "Cospas-Sarsat sistemi öncelikle hangi cihazların alarmlarını alır?",
    options: [
      "VHF DSC çağrıları",
      "406 MHz EPIRB/PLB/ELT alarmları",
      "NAVTEX mesajları",
      "Inmarsat-C mesajları"
    ],
    correctAnswer: 1,
    explanation: "Cospas-Sarsat uydu sistemi, 406 MHz'de yayın yapan EPIRB (deniz), PLB (kişisel) ve ELT (havacılık) cihazlarının alarmlarını algılar.",
    category: "EPIRB/SART"
  },
  {
    id: 35,
    question: "Telsiz tehlike kayıt defteri (radio log) ile ilgili genel kural nedir?",
    options: [
      "Sadece kaptan tutar",
      "Tehlike, aciliyet ve güvenlik haberleşmeleri kaydedilmelidir",
      "Hiçbir kayıt gerekmez",
      "Yalnızca rutin çağrılar kaydedilir"
    ],
    correctAnswer: 1,
    explanation: "GMDSS telsiz kayıt defterine tehlike, aciliyet ve güvenlikle ilgili tüm haberleşmeler ve önemli olaylar kaydedilir.",
    category: "Telsiz Vardiyası/Kayıt"
  },
  {
    id: 36,
    question: "DSC alarmlı VHF cihazlarında sürekli telsiz dinleme nöbeti hangi kanalda otomatik tutulur?",
    options: ["Kanal 16", "Kanal 70", "Kanal 13", "Kanal 6"],
    correctAnswer: 1,
    explanation: "VHF DSC kontrolör, Kanal 70'te sürekli otomatik DSC dinleme nöbeti tutar.",
    category: "Telsiz Vardiyası/Kayıt"
  },
  {
    id: 37,
    question: "GMDSS'in temel ilkelerinden biri, bir geminin tehlikeye düştüğünde en kısa sürede kime haber vermesini amaçlar?",
    options: [
      "Yalnızca en yakın gemiye",
      "Kıyıdaki arama-kurtarma yetkililerine (RCC) ve civardaki gemilere",
      "Yalnızca bayrak devletine",
      "Yalnızca limana"
    ],
    correctAnswer: 1,
    explanation: "GMDSS, tehlike alarmının kıyıdaki bir Kurtarma Koordinasyon Merkezi'ne (RCC) ve civardaki gemilere hızla ulaşmasını sağlamayı amaçlar.",
    category: "GMDSS Genel"
  },
  {
    id: 38,
    question: "A1 sahasında seyreden bir geminin asgari taşıması gereken GMDSS ekipmanlarından biri hangisidir?",
    options: [
      "HF DSC seti",
      "VHF DSC seti",
      "Inmarsat-C terminali",
      "MF DSC seti"
    ],
    correctAnswer: 1,
    explanation: "Yalnızca A1 sahasında çalışan gemi için DSC özellikli VHF seti zorunludur; HF/MF/Inmarsat daha geniş sahalar için gerekir.",
    category: "SOLAS Bölüm IV"
  },
  {
    id: 39,
    question: "A3 sahasında seyreden bir gemi için iki alternatif kapsama seçeneğinden biri nedir?",
    options: [
      "Sadece VHF",
      "Inmarsat (uydu) + MF/HF, ya da HF + MF kombinasyonu",
      "Sadece NAVTEX",
      "Sadece SART"
    ],
    correctAnswer: 1,
    explanation: "A3 sahası için gemi ya Inmarsat uydu + MF/HF DSC ya da HF (MF dahil) DSC donanımıyla donatılabilir.",
    category: "SOLAS Bölüm IV"
  },
  {
    id: 40,
    question: "HF bandında DSC tehlike çağrı frekanslarından biri hangisidir?",
    options: ["8414.5 kHz", "8291 kHz", "2182 kHz", "156.8 MHz"],
    correctAnswer: 0,
    explanation: "8414.5 kHz, HF bandındaki DSC tehlike çağrı frekanslarından biridir (4, 6, 8, 12, 16 MHz bantlarında ayrı DSC frekansları vardır).",
    category: "MF/HF Haberleşme"
  },
  {
    id: 41,
    question: "Inmarsat-C terminalinin temel haberleşme türü nedir?",
    options: [
      "Gerçek zamanlı sesli telefon",
      "Mağaza-ilet (store-and-forward) veri/telex mesajlaşması",
      "Video konferans",
      "Radar veri aktarımı"
    ],
    correctAnswer: 1,
    explanation: "Inmarsat-C, sesli değil; düşük hızlı store-and-forward veri/telex mesajlaşması (ve EGC/MSI alımı) sağlar.",
    category: "Uydu Haberleşme"
  },
  {
    id: 42,
    question: "EGC (Enhanced Group Call) sistemi ne için kullanılır?",
    options: [
      "Sesli tehlike çağrısı",
      "Inmarsat üzerinden MSI ve grup mesajlarının yayınlanması",
      "Radar transponder",
      "DSC çağrısı"
    ],
    correctAnswer: 1,
    explanation: "EGC, Inmarsat üzerinden MSI (SafetyNET) ve ticari grup çağrılarının (FleetNET) gemilere yayınlanmasını sağlar.",
    category: "NAVTEX/MSI"
  },
  {
    id: 43,
    question: "EPIRB'in suya battığında otomatik olarak serbest kalıp yüzmesini sağlayan düzenek nedir?",
    options: [
      "Manuel mandal",
      "Hidrostatik serbest bırakma (HRU)",
      "Manyetik kilit",
      "Zaman ayarlı röle"
    ],
    correctAnswer: 1,
    explanation: "EPIRB, hidrostatik serbest bırakma ünitesi (HRU) sayesinde belirli su derinliğinde otomatik olarak yuvasından çıkar, yüzer ve etkinleşir.",
    category: "EPIRB/SART"
  },
  {
    id: 44,
    question: "Tehlike çağrısı alan bir geminin yapması gereken ilk şey nedir?",
    options: [
      "Hemen kendi rotasını değiştirmek",
      "Alındığını teyit etmeden önce çağrıyı dikkatle dinlemek ve kaydetmek",
      "Kanal 70'i kapatmak",
      "EPIRB'i etkinleştirmek"
    ],
    correctAnswer: 1,
    explanation: "Tehlike çağrısı alındığında öncelikle dinlenip kaydedilir; kıyı istasyonunun teyidi beklenir, gerekirse yardım için duruma göre hareket edilir.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 45,
    question: "VHF Kanal 06'nın özelliği nedir?",
    options: [
      "Tehlike kanalı",
      "Gemiler arası (özellikle arama-kurtarma) haberleşme kanalı",
      "Liman kontrol kanalı",
      "DSC kanalı"
    ],
    correctAnswer: 1,
    explanation: "VHF Kanal 06, gemiden gemiye haberleşme için kullanılan ve arama-kurtarma koordinasyonunda da yararlanılan birincil ara-gemi kanalıdır.",
    category: "VHF Haberleşme"
  },
  {
    id: 46,
    question: "GMDSS'te 'two-way VHF radiotelephone' (taşınabilir telsiz) öncelikle ne için kullanılır?",
    options: [
      "Köprüüstü rutin haberleşmesi",
      "Filika/cankurtaranlardaki kurtarma alanı içi (on-scene) haberleşme",
      "Uydu çağrısı",
      "NAVTEX alımı"
    ],
    correctAnswer: 1,
    explanation: "Taşınabilir GMDSS VHF telsizleri, can kurtarma araçları ile kurtarma birimleri arasındaki olay yeri (on-scene) haberleşmesi içindir.",
    category: "GMDSS Genel"
  },
  {
    id: 47,
    question: "AIS-SART'ın SART (radar) cihazından farkı nedir?",
    options: [
      "Radar yerine AIS sinyaliyle konum yayınlar",
      "Sesli alarm verir",
      "Uydu üzerinden çalışır",
      "DSC çağrısı yapar"
    ],
    correctAnswer: 0,
    explanation: "AIS-SART, radar yanıtı yerine AIS mesajları yayınlayarak konumunu yakındaki AIS donanımlı gemilere bildirir.",
    category: "EPIRB/SART"
  },
  {
    id: 48,
    question: "Sahil istasyonuyla rutin telefon görüşmesi için bir gemi DSC'de hangi çağrı kategorisini kullanır?",
    options: ["Distress", "Urgency", "Safety", "Routine"],
    correctAnswer: 3,
    explanation: "Sıradan ticari/idari görüşme çağrılarında DSC kategorisi 'Routine' (rutin) seçilir.",
    category: "DSC"
  },
  {
    id: 49,
    question: "Bir DSC tehlike alarmında 'nature of distress' alanı doldurulamazsa hangi varsayılan değer iletilir?",
    options: [
      "'Sinking' otomatik girilir",
      "'Undesignated' (belirtilmemiş) distress iletilir",
      "Alarm gönderilmez",
      "'Fire' otomatik girilir"
    ],
    correctAnswer: 1,
    explanation: "Tehlike türü seçilmeden gönderilen DSC alarmı 'undesignated distress' (belirtilmemiş tehlike) olarak iletilir.",
    category: "DSC"
  },
  {
    id: 50,
    question: "Tehlike trafiğinde sessizlik istemek için kullanılan ifade hangisidir?",
    options: ["SILENCE FINI", "SEELONCE MAYDAY / SEELONCE DISTRESS", "PRUDONCE", "ROGER"],
    correctAnswer: 1,
    explanation: "Tehlikeyi yöneten istasyon, gereksiz trafiği susturmak için 'SEELONCE MAYDAY' (kontrol eden) veya 'SEELONCE DISTRESS' (diğer istasyonlar) ifadesini kullanır.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 51,
    question: "Tehlike trafiğinin sona erdiğini ve normal çalışmaya dönüldüğünü bildiren ifade hangisidir?",
    options: ["SEELONCE MAYDAY", "PRUDONCE", "SILENCE FINI / SEELONCE FEENEE", "PAN-PAN"],
    correctAnswer: 2,
    explanation: "'SEELONCE FEENEE' (silence fini), tehlike trafiğinin bittiğini ve frekansta normal çalışmaya dönülebileceğini bildirir.",
    category: "Tehlike/Acil/Güvenlik"
  },
  {
    id: 52,
    question: "GMDSS gemilerinde tehlike haberleşmesi için birden fazla bağımsız yöntem bulundurulmasının nedeni nedir?",
    options: [
      "Maliyeti artırmak",
      "Yedeklilik (redundancy) ve güvenilirlik sağlamak",
      "Yasal zorunluluğu atlatmak",
      "Mürettebatı eğitmek"
    ],
    correctAnswer: 1,
    explanation: "GMDSS, bir yöntem arızalansa bile alarm verilebilmesi için bağımsız ve yedekli haberleşme yolları öngörür.",
    category: "GMDSS Genel"
  },
  {
    id: 53,
    question: "Cospas-Sarsat'ın MEOSAR katmanı nasıl çalışır?",
    options: [
      "Yalnızca jeostasyoner tek bir uyduyla",
      "Yalnızca kutupsal LEO uydularıyla, Doppler ile",
      "GPS/Galileo/GLONASS navigasyon uydularına yerleştirilen SAR yükleriyle",
      "VHF kıyı istasyonlarıyla"
    ],
    correctAnswer: 2,
    explanation: "MEOSAR (Medium Earth Orbit), navigasyon uydularındaki SAR yükleriyle çalışır; geniş ve sürekli kapsamayla hızlı, hassas konumlandırma sağlar.",
    category: "Cospas-Sarsat/MEOSAR"
  },
  {
    id: 54,
    question: "Bir 406 MHz EPIRB sinyalinin tehlike merkezine ulaşma zinciri hangisidir?",
    options: [
      "Verici → Uydu → LUT → MCC → MRCC",
      "Verici → MRCC → Uydu → Liman",
      "Verici → VTS → AIS → Radar",
      "Verici → Kıyı VHF → Acente"
    ],
    correctAnswer: 0,
    explanation: "Sinyal uydularca alınıp LUT'a (Local User Terminal) iletilir; LUT konumu hesaplar, MCC kayıtlı kimliğe göre alarmı sorumlu MRCC'ye yönlendirir.",
    category: "Cospas-Sarsat/MEOSAR"
  },
  {
    id: 55,
    question: "Cospas-Sarsat GEOSAR katmanının temel sınırlaması nedir?",
    options: [
      "Hiçbir şekilde alarm alamaz",
      "Anında alarm verir ama vericide GNSS yoksa tek başına konum üretemez",
      "Yalnızca kutuplarda çalışır",
      "Sinyali günlerce gecikmeyle iletir"
    ],
    correctAnswer: 1,
    explanation: "GEOSAR jeostasyoner uydularla anında alarm sağlar; ancak vericide GNSS yoksa tek başına konum üretemez. LEOSAR ise Doppler kaymasıyla konumlar.",
    category: "Cospas-Sarsat/MEOSAR"
  },
  {
    id: 56,
    question: "SSAS (Ship Security Alert System) hangi düzenleme kapsamında zorunludur?",
    options: [
      "MARPOL Ek VI",
      "COLREG Kural 19",
      "STCW Bölüm A-VIII",
      "SOLAS Bölüm XI-2 / ISPS Kodu"
    ],
    correctAnswer: 3,
    explanation: "SSAS, 11 Eylül sonrası getirilen SOLAS Bölüm XI-2 ve ISPS Kodu kapsamında çoğu uluslararası sefer yapan gemi için zorunludur.",
    category: "SSAS Güvenlik Alarmı"
  },
  {
    id: 57,
    question: "SSAS tetiklendiğinde gemide ne olur?",
    options: [
      "Tüm gemide siren ve ışıklı alarm çalışır",
      "Gemide sesli/görsel uyarı üretmeden sessizce bir uyarı mesajı yayınlanır",
      "Genel emniyet alarmı (7 kısa + 1 uzun) verilir",
      "VHF Ch.16'da açık MAYDAY yayınlanır"
    ],
    correctAnswer: 1,
    explanation: "SSAS gizli çalışır: en az iki gizli tetikleme noktasıyla etkinleşir ve gemide hiçbir sesli/görsel işaret üretmeden mesaj gönderir; saldırganları uyarmaz.",
    category: "SSAS Güvenlik Alarmı"
  },
  {
    id: 58,
    question: "SSAS alarmı kime iletilir?",
    options: [
      "Çevredeki tüm gemilere açık olarak",
      "En yakın MRCC'ye GMDSS tehlike alarmı gibi",
      "Tüm denize değil; önceden tanımlı kara muhataplarına (CSO ve/veya idare)",
      "Yalnızca saldırganlara"
    ],
    correctAnswer: 2,
    explanation: "GMDSS'in aksine SSAS açık yayın yapmaz; alarm yalnızca bayrak devletinin belirlediği yetkililere (Şirket Güvenlik Sorumlusu/CSO ve/veya idare) gider.",
    category: "SSAS Güvenlik Alarmı"
  },
  {
    id: 59,
    question: "LRIT (Long-Range Identification and Tracking) sisteminin temel amacı nedir?",
    options: [
      "Emniyet, güvenlik ve çevre için devletlerin gemileri uzaktan izlemesi",
      "Gemiler arası anlık çatışmadan kaçınma",
      "Liman içi manevra koordinasyonu",
      "Yük miktarının hesaplanması"
    ],
    correctAnswer: 0,
    explanation: "LRIT, SOLAS Bölüm V kapsamında devletlerin kendi bayraklı/kıyısına yaklaşan gemileri emniyet, güvenlik ve çevre amacıyla izlemesi içindir; anlık seyir aracı değildir.",
    category: "LRIT İzleme"
  },
  {
    id: 60,
    question: "AIS ile LRIT arasındaki temel fark nedir?",
    options: [
      "İkisi de VHF üzerinden açık yayın yapar",
      "AIS yerel ve açık (VHF) iken LRIT küresel ve gizlidir (uydu, yalnızca yetkili taraflara)",
      "LRIT herkesin dinleyebildiği açık bir yayındır",
      "AIS uydudan, LRIT VHF'ten çalışır"
    ],
    correctAnswer: 1,
    explanation: "AIS VHF üzerinden yerel/açık gerçek zamanlı yayındır (çatışmadan kaçınma); LRIT uydu üzerinden küresel, gizli ve yalnızca yetkili devletlere açık seyrek izlemedir.",
    category: "LRIT İzleme"
  },
  {
    id: 61,
    question: "LRIT cihazı hangi bilgiyi iletir ve raporlama sıklığı nasıldır?",
    options: [
      "Yük manifestosu; sabit günlük tek rapor",
      "Radar görüntüsü; sürekli akış",
      "Gemi kimliği, konum ve zaman; raporlama uzaktan artırılabilir veya anlık sorgulanabilir",
      "Yalnızca hava tahmini; haftalık"
    ],
    correctAnswer: 2,
    explanation: "LRIT kimlik, konum (enlem/boylam) ve zaman damgası iletir; tipik raporlama birkaç saatte birdir ama veri merkezleri sıklığı uzaktan artırabilir veya anlık talep edebilir.",
    category: "LRIT İzleme"
  },
  {
    id: 62,
    question: "GMDSS yedek (acil) enerji kaynağının besleme kapasitesi ne olmalıdır?",
    options: [
      "Her durumda 10 dakika yeterlidir",
      "Acil jeneratör varsa en az 1 saat, yoksa en az 6 saat GMDSS yükünü beslemeli",
      "Yalnızca aydınlatmayı beslemeli",
      "Hiçbir süre şartı yoktur"
    ],
    correctAnswer: 1,
    explanation: "SOLAS IV, ana ve acil güce ek bir yedek kaynak zorunlu kılar; bu kaynak acil jeneratör varsa ≥1 saat, yoksa ≥6 saat tehlike/emniyet haberleşmesini beslemelidir.",
    category: "Telsiz Anten/Acil Güç"
  },
  {
    id: 63,
    question: "MF/HF telsiz antenleri verimli yayın için tipik olarak neye ihtiyaç duyar?",
    options: [
      "Uzun tel/kamçı anten ve anten uyum birimi (ATU); etkin topraklama",
      "Yalnızca kısa bir whip anten",
      "Hiçbir topraklama gerekmez",
      "Yalnızca uydu kubbe anteni"
    ],
    correctAnswer: 0,
    explanation: "VHF için kısa whip yeterliyken MF/HF çok daha uzun teller/kamçı antenler ve bir ATU ister; kötü topraklama menzili ciddi biçimde düşürür.",
    category: "Telsiz Anten/Acil Güç"
  },
  {
    id: 64,
    question: "GMDSS yedek akülerinin çalışırlığı nasıl güvenceye alınır?",
    options: [
      "Hiç test edilmez",
      "Yalnızca arıza anında bakılır",
      "Yalnızca rengi kontrol edilir",
      "Düzenli kontroller ve periyodik kapasite (deşarj) testi yapılır, sonuçlar log'a kaydedilir"
    ],
    correctAnswer: 3,
    explanation: "Akülerde günlük/haftalık/aylık kontroller (gerilim, şarj, elektrolit) ve periyodik kapasite testi yapılır; sonuçlar radyo log'a kaydedilir, düşük kapasiteli aküler değiştirilir.",
    category: "Telsiz Anten/Acil Güç"
  },
  {
    id: 65,
    question: "NAVDAT, NAVTEX'e göre ne sağlar?",
    options: [
      "Yalnızca sesli yayın",
      "Daha düşük veri hızı ve yalnızca metin",
      "500 kHz'de yüksek hızlı dijital MSI; metnin yanı sıra grafik, harita düzeltmesi ve dosya yayını",
      "Yalnızca VHF üzerinden kısa mesaj"
    ],
    correctAnswer: 2,
    explanation: "NAVDAT 500 kHz'de NAVTEX'ten çok daha yüksek veri hızıyla çalışır; yalnızca metin değil grafik, harita düzeltmeleri ve dosya da yayınlayabilir. NAVTEX'i tamamlar.",
    category: "GMDSS Modernizasyonu"
  },
  {
    id: 66,
    question: "GMDSS modernizasyonunun temel amacı nedir?",
    options: [
      "Eskiyen teknolojiyi güncellemek ve sistemi yeni uydu sağlayıcılara açmak",
      "GMDSS'i tamamen kaldırmak",
      "Tehlike haberleşmesini yasaklamak",
      "Yalnızca VHF kanal sayısını azaltmak"
    ],
    correctAnswer: 0,
    explanation: "Modernizasyon; eskiyen teknolojiyi güncellemeyi, yeni uydu sağlayıcılara açmayı ve dijital veri yayınını yaygınlaştırmayı amaçlar; SOLAS IV ve standartlar revize edilir.",
    category: "GMDSS Modernizasyonu"
  },
  {
    id: 67,
    question: "E-navigasyon vizyonu neyi hedefler?",
    options: [
      "Tüm elektronik cihazları kaldırıp yalnızca kâğıt harita kullanmak",
      "Seyir ve haberleşme bilgisinin uyumlu (harmonize) toplanıp paylaşılması; siber güvenlik kritik bileşen",
      "Haberleşmeyi seyir sistemlerinden tamamen ayırmak",
      "Yalnızca limanlarda veri paylaşımı"
    ],
    correctAnswer: 1,
    explanation: "E-navigasyonda GMDSS; ECDIS, AIS, VTS ve kıyı servisleriyle bütünleşik bir bilgi akışının parçası olur; standart veri biçimleri ve siber güvenlik temel bileşenlerdir.",
    category: "GMDSS Modernizasyonu"
  }
];

export const communicationQuestions: QuizQuestion[] = [
  ...baseCommunicationQuestions,
  ...communicationQuestionsExtended,
];
