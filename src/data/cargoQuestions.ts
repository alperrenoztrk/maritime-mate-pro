import type { QuizQuestion } from "@/types/quiz";

export const cargoQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "TPC değeri 25 ton/cm olan bir geminin draftı 8.80 m'den 9.05 m'ye çıktığında yaklaşık kaç ton yük alınmıştır?",
    options: ["250 ton", "375 ton", "625 ton", "900 ton"],
    correctAnswer: 2,
    explanation: "ΔT = 0.25 m = 25 cm. Yük ≈ TPC × ΔT(cm) = 25 × 25 = 625 ton.",
    category: "TPC"
  },
  {
    id: 2,
    question: "IMSBC Koduna göre TML (Transportable Moisture Limit) ne anlama gelir?",
    options: [
      "Kargonun maksimum taşıma sıcaklığı",
      "Kargonun güvenli taşınabilir nem limiti",
      "Kargonun toplam ağırlık limiti",
      "Kargonun yoğunluk sınırı"
    ],
    correctAnswer: 1,
    explanation: "TML, sıvılaşma (liquefaction) riski olmadan güvenle taşınabilecek azami nem içeriğidir.",
    category: "IMSBC"
  },
  {
    id: 3,
    question: "International Grain Code'a göre düzeltilmiş GM (GMcorr) minimum kaç metre olmalıdır?",
    options: ["0.15 m", "0.20 m", "0.30 m", "0.50 m"],
    correctAnswer: 2,
    explanation: "Grain Code, tahıl taşımada GMcorr için tipik minimum 0.30 m şartını arar.",
    category: "Grain"
  },
  {
    id: 4,
    question: "Draft survey'de birinci trim düzeltmesi (First Trim Correction) ne için yapılır?",
    options: [
      "Yoğunluk farkını düzeltmek için",
      "LCF konumundan dolayı orta draft/deplasman farkını düzeltmek için",
      "Sıcaklık etkisini düzeltmek için",
      "Rüzgar etkisini düzeltmek için"
    ],
    correctAnswer: 1,
    explanation: "Trim varken LCF nedeniyle AP/FP draftlarından elde edilen orta draft doğrudan LCF draftını temsil etmez; birinci düzeltme bunu ele alır.",
    category: "Draft Survey"
  },
  {
    id: 5,
    question: "VGM (Verified Gross Mass) hangi tür yükler için zorunludur?",
    options: ["Sadece tehlikeli maddeler", "Tüm konteynerler", "Sadece dökme yükler", "Sadece sıvı kargolar"],
    correctAnswer: 1,
    explanation: "SOLAS gereği gemiye yüklenen tüm konteynerler için VGM beyanı zorunludur.",
    category: "Konteyner"
  },
  {
    id: 6,
    question: "Grain Code'a göre statik heeling açısı maksimum kaç derece olabilir?",
    options: ["5°", "8°", "12°", "15°"],
    correctAnswer: 2,
    explanation: "Tahıl kayması sonrası statik heeling açısı 12°'yi geçmemelidir (veya deck-edge daha küçükse).",
    category: "Grain"
  },
  {
    id: 7,
    question: "Draft survey'de yoğunluk düzeltmesi hangi durumda yapılır?",
    options: [
      "Deniz suyu yoğunluğu 1.025'ten farklıysa",
      "Hava sıcaklığı 20°C'nin altındaysa",
      "Trim 1 metreden fazlaysa",
      "Rüzgar hızı 15 knot'un üzerindeyse"
    ],
    correctAnswer: 0,
    explanation: "Deplasman tabloları genellikle 1.025 t/m³ deniz suyu içindir; farklı yoğunlukta düzeltme gerekir.",
    category: "Draft Survey"
  },
  {
    id: 8,
    question: "IMSBC Kodundaki Grup A kargolar için en önemli risk nedir?",
    options: ["Patlama riski", "Sıvılaşma riski", "Zehirlenme riski", "Yanma riski"],
    correctAnswer: 1,
    explanation: "Grup A kargolar sıvılaşabilir; TML/FMP kontrolleri bu yüzden kritiktir.",
    category: "IMSBC"
  },
  {
    id: 9,
    question: "Stowage Factor (SF) aşağıdakilerden hangisini ifade eder?",
    options: ["1 ton kargonun kapladığı hacim (m³/t)", "1 m³ kargonun ağırlığı (t/m³)", "Kargonun rutubet yüzdesi", "Kargonun boşaltma hızı"],
    correctAnswer: 0,
    explanation: "SF, birim ağırlık başına hacimdir (m³/ton).",
    category: "Stowage"
  },
  {
    id: 10,
    question: "Konteyner elleçlemede 'twist-lock' temel olarak ne işe yarar?",
    options: ["Yükün soğutulması", "Konteynerlerin birbirine/şasiye kilitlenmesi", "Konteyner tartımı", "Kapı mühürleme"],
    correctAnswer: 1,
    explanation: "Twist-lock, konteyner köşe dökümlerini kilitleyerek istif emniyetini sağlar.",
    category: "Konteyner"
  },
  {
    id: 11,
    question: "IMDG Code'a göre Sınıf 3 aşağıdakilerden hangisidir?",
    options: ["Yanıcı sıvılar", "Aşındırıcı maddeler", "Radyoaktif maddeler", "Sıkıştırılmış gazlar"],
    correctAnswer: 0,
    explanation: "IMDG Class 3: Flammable liquids.",
    category: "IMDG"
  },
  {
    id: 12,
    question: "IMDG Code'a göre Sınıf 8 aşağıdakilerden hangisidir?",
    options: ["Zehirli maddeler", "Aşındırıcı maddeler", "Organik peroksitler", "Oksitleyiciler"],
    correctAnswer: 1,
    explanation: "IMDG Class 8: Corrosives.",
    category: "IMDG"
  },
  {
    id: 13,
    question: "Draft survey'de 'mark correction' (işaret düzeltmesi) neden yapılır?",
    options: [
      "Draft marklarının gemi boyuna göre konumundan kaynaklı düzeltme için",
      "Deniz suyu sıcaklığını düzeltmek için",
      "Rüzgâr basıncını düzeltmek için",
      "Kargonun yoğunluğunu düzeltmek için"
    ],
    correctAnswer: 0,
    explanation: "Draft okuması markın konumuna ve okunan noktaya bağlı hatalar içerir; mark correction ile gerçek drafta yaklaşılır.",
    category: "Draft Survey"
  },
  {
    id: 14,
    question: "MARPOL Annex I en çok hangi kirliliği düzenler?",
    options: ["Petrol kirliliği", "Çöp/atıklar", "Hava emisyonları", "Pis su (sewage)"],
    correctAnswer: 0,
    explanation: "Annex I: Oil pollution prevention.",
    category: "Regülasyon"
  },
  {
    id: 15,
    question: "MARPOL Annex V hangi konuyu kapsar?",
    options: ["Çöp/atıklar", "Petrol", "Balast suyu", "SOx/NOx emisyonları"],
    correctAnswer: 0,
    explanation: "Annex V: Garbage (çöp) yönetimi ve deşarj kısıtları.",
    category: "Regülasyon"
  },
  {
    id: 16,
    question: "Bilge suyu (bilge) discharge'ında OWS (15 ppm) alarmı devreye girerse doğru aksiyon hangisidir?",
    options: ["Deşarja devam etmek", "Deşarjı durdurmak ve sistemi kontrol etmek", "OWS'i bypass etmek", "Sadece kaydı silmek"],
    correctAnswer: 1,
    explanation: "15 ppm üstü alarmda deşarj durdurulur; ekipman arızası/yanlış işletim araştırılır.",
    category: "Operasyon"
  },
  {
    id: 17,
    question: "Bulk kargolarda 'angle of repose' neyi etkiler?",
    options: ["Kargonun gemide kayma eğilimi/istif stabilitesi", "Kargonun pH değeri", "Kargonun ısıl iletkenliği", "Kargonun konteyner ihtiyacı"],
    correctAnswer: 0,
    explanation: "Angle of repose, dökme kargonun eğimde ne kadar kaymadan durabildiğini gösterir; kayma riskini etkiler.",
    category: "IMSBC"
  },
  {
    id: 18,
    question: "Tahıl taşımada 'shifting board' temel amacı nedir?",
    options: ["Havalandırma", "Kargonun yanlara kaymasını sınırlamak", "Ambar kapak sızdırmazlığı", "Yükleme hızını artırmak"],
    correctAnswer: 1,
    explanation: "Shifting board, grain shift riskini azaltmak için ambar içinde bölme/engel görevi görür.",
    category: "Grain"
  },
  {
    id: 19,
    question: "Konteynerlerin SOLAS VGM doğrulamasında iki yaygın yöntem hangileridir?",
    options: ["Sıcaklık ölçümü + hacim ölçümü", "Tartım + kalibrasyon", "Yöntem 1 (brüt tartım) + Yöntem 2 (bileşen hesap) ", "Sadece liman beyanı"],
    correctAnswer: 2,
    explanation: "Method 1: konteynerin brüt tartımı; Method 2: içerik/ambalaj/tara üzerinden hesap.",
    category: "Konteyner"
  },
  {
    id: 20,
    question: "Hatch cover cleat/locking kontrolü en kritik olarak neyi azaltır?",
    options: ["Trim", "Su girişi ve yük hasarı riskini", "Yakıt tüketimini", "Kargo sıcaklığını"],
    correctAnswer: 1,
    explanation: "Ambar kapak emniyeti, heavy weather'da su girişini ve cargo wetting riskini azaltır.",
    category: "Operasyon"
  },
  {
    id: 21,
    question: "Bill of Lading (B/L) için en doğru ifade hangisidir?",
    options: ["Sadece sigorta poliçesidir", "Taşıma sözleşmesi kanıtı ve makbuz/temsil belgesidir", "Sadece gümrük beyannamesidir", "Kaptanın şahsi notudur"],
    correctAnswer: 1,
    explanation: "B/L: receipt + evidence of contract + document of title (çoğu durumda).",
    category: "Dokümantasyon"
  },
  {
    id: 22,
    question: "IMSBC Koduna göre Group B kargoların genel özelliği nedir?",
    options: ["Sıvılaşabilir", "Kimyasal tehlike taşır", "Hiç risk taşımaz", "Sadece tahıldır"],
    correctAnswer: 1,
    explanation: "Group B: chemical hazards (toxic, corrosive, etc.).",
    category: "IMSBC"
  },
  {
    id: 23,
    question: "Kargo planlamasında 'segregation' ilkeleri en çok ne için kullanılır?",
    options: ["Kargonun hızını artırmak", "Uyuşmayan kargoları ayırarak tehlikeyi azaltmak", "Draftı düşürmek", "Yakıt tasarrufu"],
    correctAnswer: 1,
    explanation: "Özellikle IMDG/tehlikeli yüklerde, uyumsuzlukları ayırmak reaksiyon/yangın riskini azaltır.",
    category: "Planlama"
  },
  {
    id: 24,
    question: "Reefer konteynerlerde en sık kritik kontrol hangisidir?",
    options: ["Kapı rengi", "Setpoint ve havalandırma/airflow ayarları", "Konteyner numarası uzunluğu", "Twist-lock markası"],
    correctAnswer: 1,
    explanation: "Reefer setpoint, pulp temperature, ventilation ve power bağlantısı kargonun bozulmasını önler.",
    category: "Konteyner"
  },
  {
    id: 25,
    question: "Dökme yükte 'trimming' işlemi neden yapılır?",
    options: ["Kargoyu tek tarafa yığmak için", "Kargo yüzeyini düzleyerek stabilite ve yük emniyetini artırmak için", "Kargoyu ıslatmak için", "Sadece fotoğraf için"],
    correctAnswer: 1,
    explanation: "Trimming, boşlukları azaltır, kayma riskini düşürür ve ambar içi yük dağılımını iyileştirir.",
    category: "Operasyon"
  },
  {
    id: 26,
    question: "Broken stowage (kayıp istif) terimi neyi ifade eder?",
    options: [
      "Kargonun bozulması",
      "Kargo aralarında kullanılamayan, boşa giden hacim",
      "Hasarlı kargo miktarı",
      "Yanlış manifesto"
    ],
    correctAnswer: 1,
    explanation: "Broken stowage, ambar şekli ve kargo biçimi nedeniyle dolu sayılamayan, kullanılamayan boş hacimdir; SF bu kayıpla artar.",
    category: "Stowage"
  },
  {
    id: 27,
    question: "Stowage factor 1.4 m³/t olan bir kargodan, broken stowage %10 ise 7000 m³'lük ambara yaklaşık kaç ton yüklenebilir?",
    options: ["3500 ton", "4500 ton", "5000 ton", "5500 ton"],
    correctAnswer: 1,
    explanation: "Kullanılabilir hacim = 7000 × 0.90 = 6300 m³; ağırlık = 6300 / 1.4 = 4500 ton.",
    category: "Stowage"
  },
  {
    id: 28,
    question: "CSS Code (Cargo Stowage and Securing) temel olarak neyi düzenler?",
    options: [
      "Kargonun gümrük işlemlerini",
      "Konteyner dışı kargoların emniyetli istif ve bağlanmasını",
      "Yakıt ikmalini",
      "Mürettebat vardiyalarını"
    ],
    correctAnswer: 1,
    explanation: "CSS Code, konteyner dışı/standart dışı kargoların güvenli istif ve lashing prensiplerini belirler.",
    category: "Lashing/CSS"
  },
  {
    id: 29,
    question: "Lashing hesaplarında MSL (Maximum Securing Load) genellikle bağlama elemanının BS'sinin (Breaking Strength) ne kadarıdır?",
    options: ["%25", "%50", "%80", "%100"],
    correctAnswer: 1,
    explanation: "CSS Code'a göre çoğu bağlama elemanı için MSL = BS'nin %50'si alınır.",
    category: "Lashing/CSS"
  },
  {
    id: 30,
    question: "Güverte kargolarına etki eden ağırlık ve kuvvet hesaplarında en kritik dinamik etkiler hangileridir?",
    options: [
      "Sadece statik ağırlık",
      "Geminin rolling, pitching ve heaving hareketlerinden doğan ivme kuvvetleri",
      "Sadece rüzgar basıncı",
      "Sadece gelgit"
    ],
    correctAnswer: 1,
    explanation: "CSS Code, rolling/pitching/heaving kaynaklı boyuna, enine ve düşey ivme kuvvetlerini lashing hesabına katar.",
    category: "Lashing/CSS"
  },
  {
    id: 31,
    question: "Draft survey'de net yük (cargo) miktarı nasıl bulunur?",
    options: [
      "Sadece son deplasmandan",
      "Yükleme sonrası ve öncesi deplasman farkından, constant ve sıvıların (ballast, yakıt, su) değişimi düzeltilerek",
      "TPC × draft ile",
      "Sadece trim ölçümünden"
    ],
    correctAnswer: 1,
    explanation: "Net kargo = (son net deplasman) − (ilk net deplasman); deplasmandan ballast, yakıt, su ve constant düşülür.",
    category: "Draft Survey"
  },
  {
    id: 32,
    question: "Draft survey'de okunan altı draft (forward, mid, aft / her iki bordo) ortalamasıyla bulunan 'mean of means' hesabında ortadaki drafta neden ağırlık verilir?",
    options: [
      "Pusula hatası için",
      "Geminin hogging/sagging deformasyonunu hesaba katmak için",
      "Rüzgar için",
      "Tuzluluk için"
    ],
    correctAnswer: 1,
    explanation: "Mean of means (quarter mean) yöntemi, tekne hogging/sagging eğilmesini düzelterek daha doğru orta draft verir.",
    category: "Draft Survey"
  },
  {
    id: 33,
    question: "IMSBC Koduna göre Grup C kargoların özelliği nedir?",
    options: [
      "Sıvılaşabilen kargolar",
      "Kimyasal tehlike taşıyan kargolar",
      "Ne sıvılaşan ne de kimyasal tehlike taşıyan kargolar",
      "Sadece tahıl"
    ],
    correctAnswer: 2,
    explanation: "Grup C kargolar sıvılaşmaz ve kimyasal tehlike taşımaz (ör. demir cevheri parçaları, kömür hariç bazı mineraller).",
    category: "IMSBC"
  },
  {
    id: 34,
    question: "Grup A kargoda gerçek nem içeriği TML'i aşarsa ne yapılmalıdır?",
    options: [
      "Kargo yüklenebilir",
      "Kargo yüklenmemeli (özel olarak inşa edilmiş gemiler hariç)",
      "Sadece daha hızlı yüklenmeli",
      "Kargo sıcaklığı ölçülmeli"
    ],
    correctAnswer: 1,
    explanation: "Nem > TML ise sıvılaşma riski yüksektir; standart gemilere yükleme yapılmamalıdır.",
    category: "IMSBC"
  },
  {
    id: 35,
    question: "Kömürün dökme taşınmasında IMSBC'ye göre başlıca iki tehlike nedir?",
    options: [
      "Sıvılaşma ve radyasyon",
      "Metan gazı çıkışı ve kendiliğinden ısınma/oksitlenme",
      "Sadece koku",
      "Sadece toz patlaması yok"
    ],
    correctAnswer: 1,
    explanation: "Kömür metan (yanıcı/patlayıcı) salabilir ve self-heating/oksijen tüketimi riski taşır; bazı kömürler ayrıca sıvılaşabilir.",
    category: "IMSBC"
  },
  {
    id: 36,
    question: "IMDG Code'da Sınıf 1 hangi maddeleri kapsar?",
    options: ["Patlayıcılar", "Gazlar", "Yanıcı katılar", "Oksitleyiciler"],
    correctAnswer: 0,
    explanation: "IMDG Class 1: Explosives (patlayıcılar).",
    category: "IMDG"
  },
  {
    id: 37,
    question: "IMDG Code'da Sınıf 7 hangi maddeleri kapsar?",
    options: ["Aşındırıcılar", "Radyoaktif maddeler", "Zehirli maddeler", "Yanıcı gazlar"],
    correctAnswer: 1,
    explanation: "IMDG Class 7: Radioactive material (radyoaktif maddeler).",
    category: "IMDG"
  },
  {
    id: 38,
    question: "IMDG tehlikeli yük taşımalarında her sevkiyatla birlikte hazırlanması gereken temel belge hangisidir?",
    options: [
      "Charter party",
      "Dangerous Goods Declaration (DGD) / Multimodal form",
      "Sadece B/L",
      "Sadece sigorta"
    ],
    correctAnswer: 1,
    explanation: "IMDG, gönderici tarafından imzalanan Dangerous Goods Declaration düzenlenmesini şart koşar.",
    category: "IMDG"
  },
  {
    id: 39,
    question: "International Grain Code'a göre 'filled compartment, trimmed' bir ambarda volumetric heeling moment hesabı neden gereklidir?",
    options: [
      "Yakıt tüketimi için",
      "Tahıl yüzeyinin olası kayması sonucu oluşacak heeling momentini değerlendirmek için",
      "Draftı bulmak için",
      "Hız hesabı için"
    ],
    correctAnswer: 1,
    explanation: "Grain Code, ambar boşluklarındaki tahıl kayması (grain shift) kaynaklı heeling momentine karşı stabilite kriterlerini kontrol eder.",
    category: "Grain"
  },
  {
    id: 40,
    question: "Tahıl stabilite kriterinde, heeling arm ile righting arm eğrileri arasındaki rezidüel alan (0°–40° veya downflooding) en az kaç metre-radyan olmalıdır?",
    options: ["0.055 m·rad", "0.075 m·rad", "0.090 m·rad", "0.20 m·rad"],
    correctAnswer: 1,
    explanation: "Grain Code, iki eğri arasındaki rezidüel dinamik stabilite alanının en az 0.075 m·rad olmasını ister.",
    category: "Grain"
  },
  {
    id: 41,
    question: "Load line (yük hattı) markasının temel amacı nedir?",
    options: [
      "Geminin hızını göstermek",
      "Asgari friborda (minimum freeboard) uyarak emniyetli yükleme limitini belirlemek",
      "Kargo türünü belirtmek",
      "Bayrak devletini göstermek"
    ],
    correctAnswer: 1,
    explanation: "Load Line, geminin bölge/mevsime göre izin verilen azami draftını (minimum freeboard) işaretler.",
    category: "Load Line"
  },
  {
    id: 42,
    question: "Load line markasında 'TF' harfleri neyi ifade eder?",
    options: ["Tropical Fresh water", "Total Freeboard", "Tank Full", "Trim Forward"],
    correctAnswer: 0,
    explanation: "TF: Tropical Fresh water; tropikal bölgede tatlı suda izin verilen en derin yük hattıdır.",
    category: "Load Line"
  },
  {
    id: 43,
    question: "FWA (Fresh Water Allowance) neyi ifade eder?",
    options: [
      "Tatlı sudan tuzlu suya geçişte draftta oluşan değişim miktarı",
      "Yakıt rezervi",
      "Ballast miktarı",
      "Kargo nem oranı"
    ],
    correctAnswer: 0,
    explanation: "FWA, geminin tatlı su (1.000) ile deniz suyu (1.025) arasında summer draftında batma/çıkma farkıdır.",
    category: "Load Line"
  },
  {
    id: 44,
    question: "Ro-Ro gemilerinde araçların güvertede emniyete alınmasında en kritik husus nedir?",
    options: [
      "Araçların rengi",
      "Lashing/bağlama noktaları ve uygun gerginlikte sabitleme",
      "Sadece el freni",
      "Araçların yakıt seviyesi"
    ],
    correctAnswer: 1,
    explanation: "Ro-Ro'da araçlar deniz hareketlerine karşı uygun lashing noktalarından, yeterli sayı ve gerginlikte bağlanmalıdır.",
    category: "Ro-Ro"
  },
  {
    id: 45,
    question: "Tankerlerde 'ullage' ölçümü neyi ifade eder?",
    options: [
      "Tanktaki sıvı yüksekliği",
      "Sıvı yüzeyi ile tank tavanı arasındaki boş mesafe",
      "Kargo sıcaklığı",
      "Kargo yoğunluğu"
    ],
    correctAnswer: 1,
    explanation: "Ullage, tank referans noktasından sıvı yüzeyine kadar olan boş mesafedir; sounding'in tersidir.",
    category: "Tanker"
  },
  {
    id: 46,
    question: "Ham petrol tankerlerinde Inert Gas System (IGS) ile tank atmosferi neden inertize edilir?",
    options: [
      "Kargoyu ısıtmak için",
      "Oksijen seviyesini düşürerek yanma/patlama riskini ortadan kaldırmak için",
      "Kargoyu soğutmak için",
      "Tankı temizlemek için"
    ],
    correctAnswer: 1,
    explanation: "IGS oksijeni genelde %8 (hacimce) altına indirerek tutuşmaya elverişli ortamı engeller.",
    category: "Tanker"
  },
  {
    id: 47,
    question: "Konteyner istifinde 'reefer plug' bağlantısı yapılırken en sık atlanan kontrol hangisidir?",
    options: [
      "Konteyner numarası",
      "Güç beslemesinin verilmesi ve set sıcaklığının doğru girilmesi",
      "Twist-lock markası",
      "Kapı mührü rengi"
    ],
    correctAnswer: 1,
    explanation: "Reefer'ın güce bağlanmaması veya yanlış setpoint girilmesi kargonun bozulmasına yol açar.",
    category: "Konteyner"
  },
  {
    id: 48,
    question: "Konteyner istif planında ağır konteynerlerin yerleşimi için genel kural nedir?",
    options: [
      "En üst sıralara konur",
      "Altta/daha aşağı sıralarda ve ağırlık merkezi düşük olacak şekilde istiflenir",
      "Sadece baş tarafa konur",
      "Rastgele yerleştirilir"
    ],
    correctAnswer: 1,
    explanation: "Ağır konteynerler aşağıya konarak GM ve istif emniyeti korunur, üst sıra ağırlık limitleri aşılmaz.",
    category: "Konteyner"
  },
  {
    id: 49,
    question: "Dökme yük gemilerinde ardışık (alternate hold) yükleme planı uygulanırken en büyük risk nedir?",
    options: [
      "Yakıt kaybı",
      "Aşırı yerel gerilmeler (shear force/bending moment) nedeniyle tekne yapısal zorlanması",
      "Kargo kokusu",
      "Görüş kaybı"
    ],
    correctAnswer: 1,
    explanation: "Alternatif ambar yüklemesi yüksek yoğunluklu kargoda istenir ama shear force ve bending moment limitleri dikkatle izlenmelidir.",
    category: "Operasyon"
  },
  {
    id: 50,
    question: "Tanker yüklemelerinde 'topping off' aşamasında neden çok dikkatli olunmalıdır?",
    options: [
      "Hız artar",
      "Aşırı dolum ve taşma (overflow/spill) riski en yüksek olduğundan akış azaltılarak kontrol edilir",
      "Kargo soğur",
      "Trim düzelir"
    ],
    correctAnswer: 1,
    explanation: "Topping off'ta tank dolmak üzeredir; taşma riskini önlemek için debi düşürülür ve yakından izlenir.",
    category: "Tanker"
  },
  {
    id: 51,
    question: "Tahıl yüklemesinde 'untrimmed ends' (trimlenmemiş uçlar) için Grain Code ne öngörür?",
    options: [
      "Hiçbir önlem gerekmez",
      "Boşluk açısı nedeniyle ek heeling momenti hesaba katılır",
      "Sadece havalandırma",
      "Sadece ek yakıt"
    ],
    correctAnswer: 1,
    explanation: "Trimlenemeyen uç bölmeler daha büyük tahıl kayma boşluğu yaratır; Grain Code bunlara artırılmış heeling momenti uygular.",
    category: "Grain"
  },
  {
    id: 52,
    question: "Stowage factor neden hiçbir zaman tam %100 ambar dolumunu temsil etmez?",
    options: [
      "Çünkü kargo her zaman ıslaktır",
      "Broken stowage (kullanılamayan boşluklar) nedeniyle gerçek dolum daima daha azdır",
      "Çünkü TPC değişir",
      "Çünkü gemi her zaman trimlidir"
    ],
    correctAnswer: 1,
    explanation: "Ambar şekli, kargo biçimi, dunnage ve istif düzensizlikleri broken stowage yaratır; bu yüzden teorik SF kadar tam dolum elde edilmez.",
    category: "Stowage"
  },
  {
    id: 53,
    question: "Çuvallı (bagged) kargolarda broken stowage tipik olarak balya/sandık kargolara göre nasıldır?",
    options: [
      "Daha yüksektir",
      "Genellikle daha düşüktür çünkü çuvallar boşlukları doldurur",
      "Tam olarak aynıdır",
      "Her zaman sıfırdır"
    ],
    correctAnswer: 1,
    explanation: "Çuvallar esnek olduğundan boşluklara oturup şekil alır; bu nedenle düzgün kutulara kıyasla broken stowage daha azdır.",
    category: "Stowage"
  },
  {
    id: 54,
    question: "CSS Code'a göre lashing hesabında kullanılan CS (Calculated Strength) kavramı nedir?",
    options: [
      "Bağlamanın gerçek kopma yükü",
      "MSL'ye bir güvenlik faktörü uygulanarak elde edilen, hesapta kullanılan bağlama dayanımı",
      "Kargonun ağırlığı",
      "Geminin GM değeri"
    ],
    correctAnswer: 1,
    explanation: "Advanced calculation method'da CS = MSL / güvenlik faktörü (genelde 1.5) olarak alınır.",
    category: "Lashing/CSS"
  },
  {
    id: 55,
    question: "Lashing açısı dikeyden yataya doğru arttıkça (yere yaklaştıkça) bağlamanın yana kaymaya karşı etkinliği nasıl değişir?",
    options: [
      "Etkisiz hale gelir",
      "Yatay (kayma önleyici) bileşeni artar, düşey bastırma bileşeni azalır",
      "Hiç değişmez",
      "Sadece düşey bileşeni artar"
    ],
    correctAnswer: 1,
    explanation: "Düşük açılı bağlamalar yana kaymayı daha iyi önler; dik bağlamalar ise devrilmeye karşı düşey bastırma sağlar.",
    category: "Lashing/CSS"
  },
  {
    id: 56,
    question: "MSL'si 200 kN olan bir bağlama elemanının BS'si (kopma yükü) yaklaşık kaç kN'dur (genel kural)?",
    options: ["100 kN", "200 kN", "400 kN", "600 kN"],
    correctAnswer: 2,
    explanation: "Çoğu eleman için MSL = BS × 0.5 olduğundan BS = MSL / 0.5 = 400 kN.",
    category: "Lashing/CSS"
  },
  {
    id: 57,
    question: "Draft survey'de 'constant' (sabit) terimi neyi ifade eder?",
    options: [
      "Geminin boş ağırlığı (lightship)",
      "Lightship'e ek olarak gemide bulunan, deplasmana giren ama yük/yakıt/su olarak ölçülemeyen kalıcı ağırlıklar",
      "Yakıt miktarı",
      "Ballast suyu"
    ],
    correctAnswer: 1,
    explanation: "Constant; çamur, artık, kuru gıda, kumanya gibi ölçülemeyen ek ağırlıkların toplamıdır ve hesaba katılır.",
    category: "Draft Survey"
  },
  {
    id: 58,
    question: "Draft survey'de düzeltmeler için tipik uygulama sırası aşağıdakilerden hangisidir?",
    options: [
      "Yoğunluk → trim → constant",
      "Apparent trim/mean draft hesabı → birinci ve ikinci trim düzeltmesi → yoğunluk düzeltmesi → deplasman",
      "Sadece yoğunluk düzeltmesi yeterlidir",
      "Önce constant sonra draft okuması"
    ],
    correctAnswer: 1,
    explanation: "Önce ortalama draftlar bulunur, trim düzeltmeleri (1. ve 2.) ve yoğunluk düzeltmesi uygulanıp net deplasmana ulaşılır.",
    category: "Draft Survey"
  },
  {
    id: 59,
    question: "IMSBC Koduna göre 'can test' (kutu testi) hangi amaçla yapılır?",
    options: [
      "Kargonun pH'ını ölçmek",
      "Group A kargoda olası sıvılaşma eğilimini gemi üzerinde basitçe değerlendirmek",
      "Kargonun sıcaklığını ölçmek",
      "Kargonun renk testini yapmak"
    ],
    correctAnswer: 1,
    explanation: "Can test, numune kaba konup vurularak yapılır; yüzeyde su/akışkan görünmesi sıvılaşma riskine işaret eder.",
    category: "IMSBC"
  },
  {
    id: 60,
    question: "IMSBC Koduna göre nikel cevheri (nickel ore) hangi açıdan yüksek riskli kabul edilir?",
    options: [
      "Patlayıcı olması",
      "Group A olarak sıvılaşma (liquefaction) eğilimi",
      "Radyoaktif olması",
      "Aşındırıcı olması"
    ],
    correctAnswer: 1,
    explanation: "Nikel cevheri yüksek nemde sıvılaşabilen Group A kargodur; geçmişte ciddi kazalara yol açmıştır.",
    category: "IMSBC"
  },
  {
    id: 61,
    question: "IMSBC'de FMP (Flow Moisture Point) ile TML arasındaki ilişki nedir?",
    options: [
      "TML = FMP",
      "TML = FMP'nin %90'ı",
      "TML = FMP'nin %120'si",
      "Aralarında ilişki yoktur"
    ],
    correctAnswer: 1,
    explanation: "TML, akış nemi noktasının (FMP) %90'ı olarak tanımlanır; güvenlik payı bırakılır.",
    category: "IMSBC"
  },
  {
    id: 62,
    question: "IMDG Code'a göre Sınıf 2.1 hangi maddeleri kapsar?",
    options: ["Yanıcı gazlar", "Zehirli gazlar", "Yanıcı olmayan/zehirsiz gazlar", "Aşındırıcılar"],
    correctAnswer: 0,
    explanation: "IMDG Class 2.1: Flammable gases (yanıcı gazlar). 2.2 zehirsiz/yanıcı olmayan, 2.3 zehirli gazlardır.",
    category: "IMDG"
  },
  {
    id: 63,
    question: "IMDG Code'da bir maddenin EmS numarası neyi gösterir?",
    options: [
      "Maddenin fiyatını",
      "Acil durum müdahale (yangın ve döküntü) prosedür kodunu",
      "Maddenin yoğunluğunu",
      "Liman kodunu"
    ],
    correctAnswer: 1,
    explanation: "EmS (Emergency Schedules), o madde için yangın (F-) ve döküntü (S-) acil müdahale şemalarını belirtir.",
    category: "IMDG"
  },
  {
    id: 64,
    question: "IMDG'de iki tehlikeli madde için 'segregation table' (ayrım tablosu) ne sağlar?",
    options: [
      "Fiyat karşılaştırması",
      "Birlikte istiflenebilirlik veya gereken ayrım derecesinin belirlenmesi",
      "Konteyner numaralandırma",
      "Liman sırası"
    ],
    correctAnswer: 1,
    explanation: "Ayrım tablosu sınıflar arası 'away from', 'separated from' gibi gereken minimum ayrımı verir.",
    category: "IMDG"
  },
  {
    id: 65,
    question: "International Grain Code kapsamına hangi kargolar girer?",
    options: [
      "Sadece buğday",
      "Buğday, mısır, yulaf, çavdar, arpa, pirinç, baklagiller, tohumlar ve bunların işlenmiş benzer ürünleri",
      "Tüm dökme mineraller",
      "Sadece pirinç ve mısır"
    ],
    correctAnswer: 1,
    explanation: "Grain Code tahıl tanımı; buğday, mısır, arpa, yulaf, çavdar, pirinç, baklagiller ve davranışı benzer işlenmiş ürünleri kapsar.",
    category: "Grain"
  },
  {
    id: 66,
    question: "Tahıl yüklü gemide stabilite belgesi (grain loading manual/document of authorization) bulunmuyorsa ne yapılır?",
    options: [
      "Sınırsız tahıl yüklenebilir",
      "Tahıl taşıması yapılamaz veya idarenin özel onayı gerekir",
      "Sadece yarım ambar yüklenir",
      "Sadece tatlı suda yüklenir"
    ],
    correctAnswer: 1,
    explanation: "Grain Code, tahıl taşıyacak geminin onaylı doküman/manual bulundurmasını şart koşar; aksi halde özel izin gerekir.",
    category: "Grain"
  },
  {
    id: 67,
    question: "Tankerlerde 'COW' (Crude Oil Washing) işleminin temel amacı nedir?",
    options: [
      "Tankı su ile yıkamak",
      "Ham petrolün kendisiyle tank içi tortuyu/sediment'i çözüp boşaltma verimini artırmak ve atığı azaltmak",
      "Kargoyu ısıtmak",
      "Tankı inertize etmek"
    ],
    correctAnswer: 1,
    explanation: "COW, ham petrol jetleriyle tank duvarındaki tortuyu çözer; ROB ve deniz kirliliğini azaltır, MARPOL Annex I ile ilişkilidir.",
    category: "Tanker"
  },
  {
    id: 68,
    question: "Tanker kargo hesaplarında 'VCF' (Volume Correction Factor) ne için kullanılır?",
    options: [
      "Hacmi standart referans sıcaklığa (örn. 15°C) düzeltmek için",
      "Yoğunluğu ölçmek için",
      "Trim düzeltmesi için",
      "Tank kalibrasyonu için"
    ],
    correctAnswer: 0,
    explanation: "Petrol hacmi sıcaklıkla değişir; VCF ile gözlenen hacim standart sıcaklıktaki hacme indirgenir.",
    category: "Tanker"
  },
  {
    id: 69,
    question: "Ro-Ro gemilerinde su geçirmez ve hava koşullarına dayanıklı bow/stern kapılar neden kritiktir?",
    options: [
      "Sadece estetik",
      "Su girişini önleyerek araç güvertesinin (free surface) sular altında kalmasını ve stabilite kaybını engellemek için",
      "Yakıt tasarrufu için",
      "Hız artışı için"
    ],
    correctAnswer: 1,
    explanation: "Ro-Ro araç güvertesine su girişi büyük serbest yüzey etkisi ve hızlı stabilite kaybı yaratır; kapı bütünlüğü hayatidir.",
    category: "Ro-Ro"
  },
  {
    id: 70,
    question: "Konteyner gemilerinde 'lashing bridge' temel olarak ne sağlar?",
    options: [
      "Daha yüksek seviyelerden bağlama yapılarak üst sıra konteynerlerin emniyetli istiflenmesi",
      "Konteyner soğutması",
      "Yakıt aktarımı",
      "Gemi hızını ölçme"
    ],
    correctAnswer: 0,
    explanation: "Lashing bridge, daha yüksekten bağlama imkânı vererek daha fazla sıra konteynerin emniyetle istiflenmesini sağlar.",
    category: "Konteyner"
  },
  {
    id: 71,
    question: "Load Line markasında yaz yük hattı (S) ile kış yük hattı (W) arasındaki ilişki için doğru ifade hangisidir?",
    options: [
      "W, S'ten daha derindir",
      "W, S'ten daha sığdır (daha az draft); kışın daha fazla freeboard gerekir",
      "W ve S aynıdır",
      "W sadece tatlı su içindir"
    ],
    correctAnswer: 1,
    explanation: "Kışın daha kötü hava nedeniyle ek freeboard istenir; bu yüzden W hattı S'ten daha yukarıdadır (daha az draft).",
    category: "Load Line"
  },
  {
    id: 72,
    question: "DWA (Dock Water Allowance) ne için hesaplanır?",
    options: [
      "Yakıt rezervi için",
      "Limandaki yoğunluğu deniz suyundan farklı (acı/karışık) suda izin verilen draft düzeltmesi için",
      "Kargo sıcaklığı için",
      "Ballast değişimi için"
    ],
    correctAnswer: 1,
    explanation: "DWA, FWA'dan türetilir ve liman suyu yoğunluğunun 1.000–1.025 arasında olduğu durumlarda izin verilen ek draft batmasını verir.",
    category: "Load Line"
  },
  {
    id: 73,
    question: "Kömür taşımasında ambar atmosferinde metan ölçümü ve havalandırma rejimi neden önemlidir?",
    options: [
      "Kokuyu azaltmak için",
      "Patlayıcı metan birikimini önlemek ve self-heating'i izlemek için",
      "Kargoyu nemlendirmek için",
      "Sadece estetik"
    ],
    correctAnswer: 1,
    explanation: "Kömür metan salar; yüzey havalandırması metan birikimini engeller, ancak self-heating riski varsa havalandırma kısıtlanır ve O2/CO/temperature izlenir.",
    category: "IMSBC"
  },
  {
    id: 74,
    question: "Dökme yük gemisinde yükleme/boşaltma sırasında yükleme bilgisayarındaki shear force ve bending moment limitlerinin aşılmaması neden zorunludur?",
    options: [
      "Yakıt tasarrufu için",
      "Tekne yapısal hasarını (deformasyon/çatlak) önlemek için",
      "Hız için",
      "Sadece kayıt için"
    ],
    correctAnswer: 1,
    explanation: "Aşırı kesme kuvveti ve eğilme momenti gövdede kalıcı deformasyon veya kırılmaya yol açabilir; limitler her aşamada izlenmelidir.",
    category: "Operasyon"
  },
  {
    id: 75,
    question: "Mate's Receipt (kaptan makbuzu) üzerine konan 'clause' (çekince/remark) ne anlama gelir?",
    options: [
      "Kargonun fiyatını",
      "Teslim alınan kargonun görünür hasar/eksiklik/ambalaj kusuru içerdiğine dair kayıt",
      "Geminin rotasını",
      "Liman ücretini"
    ],
    correctAnswer: 1,
    explanation: "Çekinceli (claused) makbuz/konşimento, kargonun görünür kusurla teslim alındığını belgeler; temiz (clean) değildir.",
    category: "Dokümantasyon"
  },
  {
    id: 76,
    question: "Tehlikeli yük istifinde 'on deck' (güvertede) taşıma bazı sınıflar için neden zorunlu olabilir?",
    options: [
      "Daha ucuz olduğu için",
      "Acil durumda denize atma (jettison) ve havalandırma/erişim kolaylığı için",
      "Daha hızlı olduğu için",
      "Sadece estetik"
    ],
    correctAnswer: 1,
    explanation: "Bazı tehlikeli maddeler güvertede taşınır; acil müdahale, havalandırma ve gerekirse denize atma imkânı için.",
    category: "IMDG"
  }
];

