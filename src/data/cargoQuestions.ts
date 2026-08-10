import type { QuizQuestion } from "@/types/quiz";
import { cargoQuestionsExtended } from "@/data/cargoQuestionsExtended";

const baseCargoQuestions: QuizQuestion[] = [
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
      "Kargonun güvenli taşınabilir nem limiti",
      "Kargonun toplam ağırlık limiti",
      "Kargonun yoğunluk sınırı",
      "Kargonun maksimum taşıma sıcaklığı"
    ],
    correctAnswer: 0,
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
      "LCF konumundan doğan deplasman farkı için",
      "Ambar sıcaklık etkisini düzeltmek için",
      "Güverte rüzgâr etkisini düzeltmek için",
      "Deniz suyu yoğunluk farkını düzeltmek için"
    ],
    correctAnswer: 0,
    explanation: "Trim varken LCF nedeniyle AP/FP draftlarından elde edilen orta draft doğrudan LCF draftını temsil etmez; birinci düzeltme bunu ele alır.",
    category: "Draft Survey"
  },
  {
    id: 5,
    question: "VGM (Verified Gross Mass) hangi tür yükler için zorunludur?",
    options: ["Tüm konteynerler", "Sadece dökme yükler", "Sadece sıvı kargolar", "Sadece tehlikeli maddeler"],
    correctAnswer: 0,
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
    options: ["Sıvılaşma riski", "Zehirlenme riski", "Yanma riski", "Patlama riski"],
    correctAnswer: 0,
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
    options: ["Konteynerlerin birbirine kilitlenmesi", "Konteynerin brüt ağırlığının tartılması", "Konteyner kapılarının mühürlenmesi", "Konteyner içindeki yükün soğutulması"],
    correctAnswer: 0,
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
    options: ["Oksitleyiciler", "Zehirli maddeler", "Aşındırıcı maddeler", "Organik peroksitler"],
    correctAnswer: 2,
    explanation: "IMDG Class 8: Corrosives.",
    category: "IMDG"
  },
  {
    id: 13,
    question: "Draft survey'de 'mark correction' (işaret düzeltmesi) neden yapılır?",
    options: [
      "Draft marklarının konumundan doğan düzeltme",
      "Deniz suyu sıcaklığını düzeltmek için",
      "Güverteye gelen rüzgâr basıncını düzeltmek için",
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
    options: ["Deşarjı durdurup sistemi kontrol etmek", "OWS'yi geçici olarak bypass etmek", "Alarm kaydını jurnalden silmek", "Deşarja aynı debiyle devam etmek"],
    correctAnswer: 0,
    explanation: "15 ppm üstü alarmda deşarj durdurulur; ekipman arızası/yanlış işletim araştırılır.",
    category: "Operasyon"
  },
  {
    id: 17,
    question: "Bulk kargolarda 'angle of repose' neyi etkiler?",
    options: ["Kargonun kayma eğilimi ve istif emniyeti", "Kargonun pH değeri ve asitliği", "Kargonun ısıl iletkenlik katsayısı", "Kargonun konteyner ihtiyacı miktarı"],
    correctAnswer: 0,
    explanation: "Angle of repose, dökme kargonun eğimde ne kadar kaymadan durabildiğini gösterir; kayma riskini etkiler.",
    category: "IMSBC"
  },
  {
    id: 18,
    question: "Tahıl taşımada 'shifting board' temel amacı nedir?",
    options: ["Yükleme hızını belirgin biçimde artırmak", "Ambar içi havalandırmayı sağlamak", "Kargonun yanlara kaymasını sınırlamak", "Ambar kapağı sızdırmazlığını artırmak"],
    correctAnswer: 2,
    explanation: "Shifting board, grain shift riskini azaltmak için ambar içinde bölme/engel görevi görür.",
    category: "Grain"
  },
  {
    id: 19,
    question: "Konteynerlerin SOLAS VGM doğrulamasında iki yaygın yöntem hangileridir?",
    options: ["Yöntem 1 brüt tartım, Yöntem 2 hesap", "Kalibrasyonlu kantar ile göz kararı ölçüm", "Yalnızca liman idaresinin beyanı", "Sıcaklık ölçümü ile hacim ölçümü"],
    correctAnswer: 0,
    explanation: "Method 1: konteynerin brüt tartımı; Method 2: içerik/ambalaj/tara üzerinden hesap.",
    category: "Konteyner"
  },
  {
    id: 20,
    question: "Hatch cover cleat/locking kontrolü en kritik olarak neyi azaltır?",
    options: ["Ambar içindeki kargonun sıcaklığını azaltır", "Trim ve draft farkını azaltır", "Su girişi ve yük hasarı riskini azaltır", "Sefer yakıt tüketimini azaltır"],
    correctAnswer: 2,
    explanation: "Ambar kapak emniyeti, heavy weather'da su girişini ve cargo wetting riskini azaltır.",
    category: "Operasyon"
  },
  {
    id: 21,
    question: "Bill of Lading (B/L) için en doğru ifade hangisidir?",
    options: ["Taşıma sözleşmesi kanıtı ve makbuzdur", "Yalnızca bir gümrük beyannamesi belgesidir", "Kaptanın şahsi seyir notudur", "Yalnızca bir sigorta poliçesidir"],
    correctAnswer: 0,
    explanation: "B/L: receipt + evidence of contract + document of title (çoğu durumda).",
    category: "Dokümantasyon"
  },
  {
    id: 22,
    question: "IMSBC Koduna göre Group B kargoların genel özelliği nedir?",
    options: ["Sadece tahıldır", "Sıvılaşabilir", "Kimyasal tehlike taşır", "Hiç risk taşımaz"],
    correctAnswer: 2,
    explanation: "Group B: chemical hazards (toxic, corrosive, etc.).",
    category: "IMSBC"
  },
  {
    id: 23,
    question: "Kargo planlamasında 'segregation' ilkeleri en çok ne için kullanılır?",
    options: ["Uyuşmayan kargoları ayırmak için", "Geminin draftını düşürmek için", "Sefer yakıt tüketimini azaltmak için", "Kargo elleçleme hızını artırmak için"],
    correctAnswer: 0,
    explanation: "Özellikle IMDG/tehlikeli yüklerde, uyumsuzlukları ayırmak reaksiyon/yangın riskini azaltır.",
    category: "Planlama"
  },
  {
    id: 24,
    question: "Reefer konteynerlerde en sık kritik kontrol hangisidir?",
    options: ["Twist-lock üreticisinin marka bilgisi", "Konteyner kapı rengi ve etiketi", "Setpoint ve havalandırma ayarları", "Konteyner numarasının uzunluğu"],
    correctAnswer: 2,
    explanation: "Reefer setpoint, pulp temperature, ventilation ve power bağlantısı kargonun bozulmasını önler.",
    category: "Konteyner"
  },
  {
    id: 25,
    question: "Dökme yükte 'trimming' işlemi neden yapılır?",
    options: ["Yüzeyi düzleyip stabiliteyi artırmak", "Kargo yüzeyini ıslatmak için", "Yalnızca kayıt fotoğrafı için", "Kargoyu tek tarafa yığmak için"],
    correctAnswer: 0,
    explanation: "Trimming, boşlukları azaltır, kayma riskini düşürür ve ambar içi yük dağılımını iyileştirir.",
    category: "Operasyon"
  },
  {
    id: 26,
    question: "Broken stowage (kayıp istif) terimi neyi ifade eder?",
    options: [
      "Yanlış düzenlenmiş yük manifestosu",
      "Kargonun sefer sırasında bozulması",
      "Kargo aralarında boşa giden hacim",
      "Hasar görmüş kargonun miktarı"
    ],
    correctAnswer: 2,
    explanation: "Broken stowage, ambar şekli ve kargo biçimi nedeniyle dolu sayılamayan, kullanılamayan boş hacimdir; SF bu kayıpla artar.",
    category: "Stowage"
  },
  {
    id: 27,
    question: "Stowage factor 1.4 m³/t olan bir kargodan, broken stowage %10 ise 7000 m³'lük ambara yaklaşık kaç ton yüklenebilir?",
    options: ["4500 ton", "5000 ton", "5500 ton", "3500 ton"],
    correctAnswer: 0,
    explanation: "Kullanılabilir hacim = 7000 × 0.90 = 6300 m³; ağırlık = 6300 / 1.4 = 4500 ton.",
    category: "Stowage"
  },
  {
    id: 28,
    question: "CSS Code (Cargo Stowage and Securing) temel olarak neyi düzenler?",
    options: [
      "Mürettebat vardiya ve dinlenme düzenini",
      "Kargonun gümrük ve beyan işlemlerini",
      "Konteyner dışı kargonun bağlanmasını",
      "Gemide yakıt ikmali usul ve kayıtlarını"
    ],
    correctAnswer: 2,
    explanation: "CSS Code, konteyner dışı/standart dışı kargoların güvenli istif ve lashing prensiplerini belirler.",
    category: "Lashing/CSS"
  },
  {
    id: 29,
    question: "Lashing hesaplarında MSL (Maximum Securing Load) genellikle bağlama elemanının BS'sinin (Breaking Strength) ne kadarıdır?",
    options: ["%80", "%100", "%25", "%50"],
    correctAnswer: 3,
    explanation: "CSS Code'a göre çoğu bağlama elemanı için MSL = BS'nin %50'si alınır.",
    category: "Lashing/CSS"
  },
  {
    id: 30,
    question: "Güverte kargolarına etki eden ağırlık ve kuvvet hesaplarında en kritik dinamik etkiler hangileridir?",
    options: [
      "Rolling, pitching ve heaving ivmeleri",
      "Yalnızca güverteye gelen rüzgâr basıncı",
      "Yalnızca gelgit kaynaklı seviye değişimi",
      "Yalnızca kargonun statik ağırlığı"
    ],
    correctAnswer: 0,
    explanation: "CSS Code, rolling/pitching/heaving kaynaklı boyuna, enine ve düşey ivme kuvvetlerini lashing hesabına katar.",
    category: "Lashing/CSS"
  },
  {
    id: 31,
    question: "Draft survey'de net yük (cargo) miktarı nasıl bulunur?",
    options: [
      "Yalnızca trim ölçümü üzerinden",
      "Yalnızca son deplasman değerinden",
      "Deplasman farkından, sıvı düzeltmesiyle",
      "TPC ile draft çarpımı üzerinden"
    ],
    correctAnswer: 2,
    explanation: "Net kargo = (son net deplasman) − (ilk net deplasman); deplasmandan ballast, yakıt, su ve constant düşülür.",
    category: "Draft Survey"
  },
  {
    id: 32,
    question: "Draft survey'de okunan altı draft (forward, mid, aft / her iki bordo) ortalamasıyla bulunan 'mean of means' hesabında ortadaki drafta neden ağırlık verilir?",
    options: [
      "Güverte rüzgâr etkisini gidermek için",
      "Su tuzluluk farkını gidermek için",
      "Pusula sapma hatasını gidermek için",
      "Hogging/sagging deformasyonu için"
    ],
    correctAnswer: 3,
    explanation: "Mean of means (quarter mean) yöntemi, tekne hogging/sagging eğilmesini düzelterek daha doğru orta draft verir.",
    category: "Draft Survey"
  },
  {
    id: 33,
    question: "IMSBC Koduna göre Grup C kargoların özelliği nedir?",
    options: [
      "Sıvılaşma eğilimi gösteren kargolar",
      "Kimyasal tehlike taşıyan kargolar",
      "Ne sıvılaşan ne kimyasal tehlikeli",
      "Yalnızca tahıl grubu kargolar"
    ],
    correctAnswer: 2,
    explanation: "Grup C kargolar sıvılaşmaz ve kimyasal tehlike taşımaz (ör. demir cevheri parçaları, kömür hariç bazı mineraller).",
    category: "IMSBC"
  },
  {
    id: 34,
    question: "Grup A kargoda gerçek nem içeriği TML'i aşarsa ne yapılmalıdır?",
    options: [
      "Yüklenmemeli; özel gemiler hariç",
      "Yükleme hızı artırılarak sürdürülür",
      "Yalnızca kargo sıcaklığı ölçülür",
      "Kargo olağan biçimde yüklenebilir"
    ],
    correctAnswer: 0,
    explanation: "Nem > TML ise sıvılaşma riski yüksektir; standart gemilere yükleme yapılmamalıdır.",
    category: "IMSBC"
  },
  {
    id: 35,
    question: "Kömürün dökme taşınmasında IMSBC'ye göre başlıca iki tehlike nedir?",
    options: [
      "Yalnızca ambar içinde toz birikmesi olması",
      "Sıvılaşma ve radyasyon salımı",
      "Metan çıkışı ve kendiliğinden ısınma",
      "Yalnızca yoğun koku oluşması"
    ],
    correctAnswer: 2,
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
    options: ["Zehirli maddeler", "Yanıcı gazlar", "Aşındırıcılar", "Radyoaktif maddeler"],
    correctAnswer: 3,
    explanation: "IMDG Class 7: Radioactive material (radyoaktif maddeler).",
    category: "IMDG"
  },
  {
    id: 38,
    question: "IMDG tehlikeli yük taşımalarında her sevkiyatla birlikte hazırlanması gereken temel belge hangisidir?",
    options: [
      "Charter party sözleşme nüshası",
      "Dangerous Goods Declaration formu",
      "Yalnızca konşimento (B/L) nüshası",
      "Yalnızca yük sigorta poliçesi"
    ],
    correctAnswer: 1,
    explanation: "IMDG, gönderici tarafından imzalanan Dangerous Goods Declaration düzenlenmesini şart koşar.",
    category: "IMDG"
  },
  {
    id: 39,
    question: "International Grain Code'a göre 'filled compartment, trimmed' bir ambarda volumetric heeling moment hesabı neden gereklidir?",
    options: [
      "Sefer yakıt tüketimini hesaplamak için",
      "Tahıl kaymasından doğan momenti bulmak",
      "Ambar draft değerini bulmak için",
      "Sefer hız hesabını yapmak için"
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
      "Geminin servis hızını göstermek",
      "Asgari friborda uyarak yükleme sınırı",
      "Taşınan kargo türünü belirtmek",
      "Geminin bayrak devletini ve sicilini göstermek"
    ],
    correctAnswer: 1,
    explanation: "Load Line, geminin bölge/mevsime göre izin verilen azami draftını (minimum freeboard) işaretler.",
    category: "Load Line"
  },
  {
    id: 42,
    question: "Load line markasında 'TF' harfleri neyi ifade eder?",
    options: ["Tropical Fresh water yük hattı", "Total Freeboard toplam fribord hattı", "Tank Full doluluk işareti", "Trim Forward denge işareti"],
    correctAnswer: 0,
    explanation: "TF: Tropical Fresh water; tropikal bölgede tatlı suda izin verilen en derin yük hattıdır.",
    category: "Load Line"
  },
  {
    id: 43,
    question: "FWA (Fresh Water Allowance) neyi ifade eder?",
    options: [
      "Tatlı sudan tuzlu suya draft değişimi",
      "Sefer için ayrılan yakıt rezervi",
      "Alınması gereken balast miktarı",
      "Kargodaki izin verilen nem oranı"
    ],
    correctAnswer: 0,
    explanation: "FWA, geminin tatlı su (1.000) ile deniz suyu (1.025) arasında summer draftında batma/çıkma farkıdır.",
    category: "Load Line"
  },
  {
    id: 44,
    question: "Ro-Ro gemilerinde araçların güvertede emniyete alınmasında en kritik husus nedir?",
    options: [
      "Araçların dış boya ve renk düzeni",
      "Bağlama noktaları ve uygun gerginlik",
      "Yalnızca araçların el freni konumu",
      "Araçların depolarındaki yakıt seviyesi"
    ],
    correctAnswer: 1,
    explanation: "Ro-Ro'da araçlar deniz hareketlerine karşı uygun lashing noktalarından, yeterli sayı ve gerginlikte bağlanmalıdır.",
    category: "Ro-Ro"
  },
  {
    id: 45,
    question: "Tankerlerde 'ullage' ölçümü neyi ifade eder?",
    options: [
      "Tank içindeki sıvının yüksekliği",
      "Sıvı yüzeyi ile tank tavanı arası boşluk",
      "Kargonun ölçülen sıcaklık değeri",
      "Kargonun ölçülen yoğunluk değeri"
    ],
    correctAnswer: 1,
    explanation: "Ullage, tank referans noktasından sıvı yüzeyine kadar olan boş mesafedir; sounding'in tersidir.",
    category: "Tanker"
  },
  {
    id: 46,
    question: "Ham petrol tankerlerinde Inert Gas System (IGS) ile tank atmosferi neden inertize edilir?",
    options: [
      "Yük tankındaki kargoyu ısıtmak için",
      "Oksijeni düşürüp patlamayı önlemek için",
      "Yük tankındaki kargoyu soğutmak için",
      "Yük tankının iç yüzeyini temizlemek için"
    ],
    correctAnswer: 1,
    explanation: "IGS oksijeni genelde %8 (hacimce) altına indirerek tutuşmaya elverişli ortamı engeller.",
    category: "Tanker"
  },
  {
    id: 47,
    question: "Konteyner istifinde 'reefer plug' bağlantısı yapılırken en sık atlanan kontrol hangisidir?",
    options: [
      "Konteyner numarasının okunması",
      "Güç beslemesi ve set sıcaklığı girişi",
      "Twist-lock üreticisinin markası",
      "Kapı mührünün rengi ve numarası"
    ],
    correctAnswer: 1,
    explanation: "Reefer'ın güce bağlanmaması veya yanlış setpoint girilmesi kargonun bozulmasına yol açar.",
    category: "Konteyner"
  },
  {
    id: 48,
    question: "Konteyner istif planında ağır konteynerlerin yerleşimi için genel kural nedir?",
    options: [
      "En üst sıralara ve dış bordoya konur",
      "Altta ve ağırlık merkezi düşük istiflenir",
      "Yalnızca baş taraf bölmelerine konur",
      "İstif planı gözetilmeden rastgele yerleştirilir"
    ],
    correctAnswer: 1,
    explanation: "Ağır konteynerler aşağıya konarak GM ve istif emniyeti korunur, üst sıra ağırlık limitleri aşılmaz.",
    category: "Konteyner"
  },
  {
    id: 49,
    question: "Dökme yük gemilerinde ardışık (alternate hold) yükleme planı uygulanırken en büyük risk nedir?",
    options: [
      "Sefer boyunca yakıt kaybı artışı",
      "Aşırı yerel gerilme ve yapısal zorlanma",
      "Ambarda yoğun kargo kokusu oluşması",
      "Köprüüstünden ileri görüş açısının kapanması"
    ],
    correctAnswer: 1,
    explanation: "Alternatif ambar yüklemesi yüksek yoğunluklu kargoda istenir ama shear force ve bending moment limitleri dikkatle izlenmelidir.",
    category: "Operasyon"
  },
  {
    id: 50,
    question: "Tanker yüklemelerinde 'topping off' aşamasında neden çok dikkatli olunmalıdır?",
    options: [
      "Kargo pompasının debisi kendiliğinden artar",
      "Aşırı dolum ve taşma riski en yüksektir",
      "Kargo sıcaklığı hızla düşmeye başlar",
      "Geminin trimi kendiliğinden düzelir"
    ],
    correctAnswer: 1,
    explanation: "Topping off'ta tank dolmak üzeredir; taşma riskini önlemek için debi düşürülür ve yakından izlenir.",
    category: "Tanker"
  },
  {
    id: 51,
    question: "Tahıl yüklemesinde 'untrimmed ends' (trimlenmemiş uçlar) için Grain Code ne öngörür?",
    options: [
      "Herhangi bir ek önlem gerekmemektedir",
      "Boşluk açısı için ek heeling momenti",
      "Yalnızca ek havalandırma öngörülür",
      "Yalnızca ek yakıt rezervi öngörülür"
    ],
    correctAnswer: 1,
    explanation: "Trimlenemeyen uç bölmeler daha büyük tahıl kayma boşluğu yaratır; Grain Code bunlara artırılmış heeling momenti uygular.",
    category: "Grain"
  },
  {
    id: 52,
    question: "Stowage factor neden hiçbir zaman tam %100 ambar dolumunu temsil etmez?",
    options: [
      "Kargo her zaman nemli olduğu için",
      "Broken stowage nedeniyle boşluk kalır",
      "TPC değeri drafta göre değiştiği için",
      "Gemi her zaman trimli olduğu için"
    ],
    correctAnswer: 1,
    explanation: "Ambar şekli, kargo biçimi, dunnage ve istif düzensizlikleri broken stowage yaratır; bu yüzden teorik SF kadar tam dolum elde edilmez.",
    category: "Stowage"
  },
  {
    id: 53,
    question: "Çuvallı (bagged) kargolarda broken stowage tipik olarak balya/sandık kargolara göre nasıldır?",
    options: [
      "Balya ve sandığa göre daha yüksektir",
      "Genellikle daha düşüktür; boşluk dolar",
      "Balya ve sandıkla tam olarak aynıdır",
      "Her koşulda sıfır olarak kabul edilmektedir"
    ],
    correctAnswer: 1,
    explanation: "Çuvallar esnek olduğundan boşluklara oturup şekil alır; bu nedenle düzgün kutulara kıyasla broken stowage daha azdır.",
    category: "Stowage"
  },
  {
    id: 54,
    question: "CSS Code'a göre lashing hesabında kullanılan CS (Calculated Strength) kavramı nedir?",
    options: [
      "Bağlama donanımının ölçülmüş gerçek kopma yükü",
      "MSL'ye emniyet katsayısı uygulanmış değer",
      "Bağlanan kargonun toplam ağırlığı",
      "Geminin o andaki GM değeri"
    ],
    correctAnswer: 1,
    explanation: "Advanced calculation method'da CS = MSL / güvenlik faktörü (genelde 1.5) olarak alınır.",
    category: "Lashing/CSS"
  },
  {
    id: 55,
    question: "Lashing açısı dikeyden yataya doğru arttıkça (yere yaklaştıkça) bağlamanın yana kaymaya karşı etkinliği nasıl değişir?",
    options: [
      "Bağlama tümüyle etkisiz hâle gelir",
      "Yatay bileşen artar, düşey bastırma azalır",
      "Etkinliği hiçbir biçimde değişmez",
      "Yalnızca düşey bastırma bileşeni artar"
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
      "Geminin boş tekne ağırlığı, yani lightship",
      "Ölçülemeyen kalıcı ek ağırlıklar toplamı",
      "Tanklardaki toplam yakıt miktarı",
      "Tanklardaki toplam balast suyu"
    ],
    correctAnswer: 1,
    explanation: "Constant; çamur, artık, kuru gıda, kumanya gibi ölçülemeyen ek ağırlıkların toplamıdır ve hesaba katılır.",
    category: "Draft Survey"
  },
  {
    id: 58,
    question: "Draft survey'de düzeltmeler için tipik uygulama sırası aşağıdakilerden hangisidir?",
    options: [
      "Yoğunluk, sonra trim, sonra constant",
      "Trim düzeltmeleri, sonra yoğunluk",
      "Yalnızca yoğunluk düzeltmesi yeterlidir",
      "Önce constant, sonra draft okuması"
    ],
    correctAnswer: 1,
    explanation: "Önce ortalama draftlar bulunur, trim düzeltmeleri (1. ve 2.) ve yoğunluk düzeltmesi uygulanıp net deplasmana ulaşılır.",
    category: "Draft Survey"
  },
  {
    id: 59,
    question: "IMSBC Koduna göre 'can test' (kutu testi) hangi amaçla yapılır?",
    options: [
      "Kargonun pH ve asitliğini ölçmek",
      "Gemide sıvılaşma eğilimini değerlendirmek",
      "Kargonun iç sıcaklığını ölçmek",
      "Kargonun renk ve tane testini yapmak"
    ],
    correctAnswer: 1,
    explanation: "Can test, numune kaba konup vurularak yapılır; yüzeyde su/akışkan görünmesi sıvılaşma riskine işaret eder.",
    category: "IMSBC"
  },
  {
    id: 60,
    question: "IMSBC Koduna göre nikel cevheri (nickel ore) hangi açıdan yüksek riskli kabul edilir?",
    options: [
      "Patlayıcı özellik taşıması nedeniyle",
      "Group A sıvılaşma eğilimi nedeniyle",
      "Radyoaktif özellik taşıması nedeniyle",
      "Aşındırıcı özellik taşıması nedeniyle"
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
      "Maddenin birim piyasa fiyatını",
      "Acil durum müdahale prosedür kodunu",
      "Maddenin ölçülen yoğunluk ve viskozitesini",
      "Yükleme limanının resmî kodunu"
    ],
    correctAnswer: 1,
    explanation: "EmS (Emergency Schedules), o madde için yangın (F-) ve döküntü (S-) acil müdahale şemalarını belirtir.",
    category: "IMDG"
  },
  {
    id: 64,
    question: "IMDG'de iki tehlikeli madde için 'segregation table' (ayrım tablosu) ne sağlar?",
    options: [
      "İki madde arasında fiyat kıyaslaması",
      "Birlikte istif veya gerekli ayrım derecesi",
      "Konteyner numaralandırma düzeni",
      "Limanlara uğrama sırasının önceden belirlenmesi"
    ],
    correctAnswer: 1,
    explanation: "Ayrım tablosu sınıflar arası 'away from', 'separated from' gibi gereken minimum ayrımı verir.",
    category: "IMDG"
  },
  {
    id: 65,
    question: "International Grain Code kapsamına hangi kargolar girer?",
    options: [
      "Yalnızca buğday ve unlu mamuller",
      "Tahıllar, baklagiller ve tohumlar",
      "Dökme halde taşınan tüm mineral yükler",
      "Yalnızca pirinç ve mısır grubu"
    ],
    correctAnswer: 1,
    explanation: "Grain Code tahıl tanımı; buğday, mısır, arpa, yulaf, çavdar, pirinç, baklagiller ve davranışı benzer işlenmiş ürünleri kapsar.",
    category: "Grain"
  },
  {
    id: 66,
    question: "Tahıl yüklü gemide stabilite belgesi (grain loading manual/document of authorization) bulunmuyorsa ne yapılır?",
    options: [
      "Sınırsız biçimde tahıl yüklenebilir",
      "Tahıl taşınamaz; idare onayı gerekir",
      "Yalnızca yarım ambar tahıl yüklenir",
      "Yalnızca tatlı su limanında yüklenir"
    ],
    correctAnswer: 1,
    explanation: "Grain Code, tahıl taşıyacak geminin onaylı doküman/manual bulundurmasını şart koşar; aksi halde özel izin gerekir.",
    category: "Grain"
  },
  {
    id: 67,
    question: "Tankerlerde 'COW' (Crude Oil Washing) işleminin temel amacı nedir?",
    options: [
      "Tank içini deniz suyuyla yıkamak",
      "Tortuyu çözüp boşaltma verimini artırmak",
      "Yük tankındaki kargoyu ısıtmak",
      "Yük tankı atmosferini inertize etmek"
    ],
    correctAnswer: 1,
    explanation: "COW, ham petrol jetleriyle tank duvarındaki tortuyu çözer; ROB ve deniz kirliliğini azaltır, MARPOL Annex I ile ilişkilidir.",
    category: "Tanker"
  },
  {
    id: 68,
    question: "Tanker kargo hesaplarında 'VCF' (Volume Correction Factor) ne için kullanılır?",
    options: [
      "Hacmi 15 °C referans sıcaklığa düzeltmek",
      "Kargonun yoğunluğunu ölçmek için",
      "Trim kaynaklı farkı düzeltmek için",
      "Tank kalibrasyonunu doğrulamak için"
    ],
    correctAnswer: 0,
    explanation: "Petrol hacmi sıcaklıkla değişir; VCF ile gözlenen hacim standart sıcaklıktaki hacme indirgenir.",
    category: "Tanker"
  },
  {
    id: 69,
    question: "Ro-Ro gemilerinde su geçirmez ve hava koşullarına dayanıklı bow/stern kapılar neden kritiktir?",
    options: [
      "Yalnızca dış görünüm ve estetik için",
      "Su girişini ve stabilite kaybını önlemek",
      "Sefer yakıt tüketimini azaltmak için",
      "Servis hızını bir miktar yükseltmek için"
    ],
    correctAnswer: 1,
    explanation: "Ro-Ro araç güvertesine su girişi büyük serbest yüzey etkisi ve hızlı stabilite kaybı yaratır; kapı bütünlüğü hayatidir.",
    category: "Ro-Ro"
  },
  {
    id: 70,
    question: "Konteyner gemilerinde 'lashing bridge' temel olarak ne sağlar?",
    options: [
      "Yüksek seviyeden bağlama imkânı sağlar",
      "Üst sıra konteynerleri soğutmaya yarar",
      "Güverteye yakıt aktarımını kolaylaştırır",
      "Gemi hızının ölçülmesini kolaylaştırır"
    ],
    correctAnswer: 0,
    explanation: "Lashing bridge, daha yüksekten bağlama imkânı vererek daha fazla sıra konteynerin emniyetle istiflenmesini sağlar.",
    category: "Konteyner"
  },
  {
    id: 71,
    question: "Load Line markasında yaz yük hattı (S) ile kış yük hattı (W) arasındaki ilişki için doğru ifade hangisidir?",
    options: [
      "W, S'ten daha derin bir hatta çizilir",
      "W, S'ten daha sığdır; fribord artar",
      "W ile S aynı hizada çizilmektedir",
      "W yalnızca tatlı su limanları içindir"
    ],
    correctAnswer: 1,
    explanation: "Kışın daha kötü hava nedeniyle ek freeboard istenir; bu yüzden W hattına kadar yüklemede izin verilen draft daha azdır (W işareti bordada S'in altında yer alır).",
    category: "Load Line"
  },
  {
    id: 72,
    question: "DWA (Dock Water Allowance) ne için hesaplanır?",
    options: [
      "Sefer yakıt rezervini hesaplamak için",
      "Acı suda izin verilen draft düzeltmesi",
      "Kargo sıcaklık düzeltmesini yapmak için",
      "Balast değişim planını yapmak için"
    ],
    correctAnswer: 1,
    explanation: "DWA, FWA'dan türetilir ve liman suyu yoğunluğunun 1.000–1.025 arasında olduğu durumlarda izin verilen ek draft batmasını verir.",
    category: "Load Line"
  },
  {
    id: 73,
    question: "Kömür taşımasında ambar atmosferinde metan ölçümü ve havalandırma rejimi neden önemlidir?",
    options: [
      "Ambar içi kokuyu azaltmak için",
      "Metan birikimi ve self-heating izlemi",
      "Kargo nemini korumak amacıyla",
      "Ambar görünümünü korumak amacıyla"
    ],
    correctAnswer: 1,
    explanation: "Kömür metan salar; yüzey havalandırması metan birikimini engeller, ancak self-heating riski varsa havalandırma kısıtlanır ve O2/CO/temperature izlenir.",
    category: "IMSBC"
  },
  {
    id: 74,
    question: "Dökme yük gemisinde yükleme/boşaltma sırasında yükleme bilgisayarındaki shear force ve bending moment limitlerinin aşılmaması neden zorunludur?",
    options: [
      "Sefer yakıt tüketimini azaltmak için",
      "Tekne yapısal hasarını önlemek için",
      "Servis hızını korumak amacıyla",
      "Yalnızca kayıt tutmak amacıyla"
    ],
    correctAnswer: 1,
    explanation: "Aşırı kesme kuvveti ve eğilme momenti gövdede kalıcı deformasyon veya kırılmaya yol açabilir; limitler her aşamada izlenmelidir.",
    category: "Operasyon"
  },
  {
    id: 75,
    question: "Mate's Receipt (kaptan makbuzu) üzerine konan 'clause' (çekince/remark) ne anlama gelir?",
    options: [
      "Teslim alınan kargonun birim fiyatını",
      "Görünür hasar veya eksiklik kaydını",
      "Geminin izleyeceği sefer rotasını",
      "Limanda ödenecek hizmet ücretini"
    ],
    correctAnswer: 1,
    explanation: "Çekinceli (claused) makbuz/konşimento, kargonun görünür kusurla teslim alındığını belgeler; temiz (clean) değildir.",
    category: "Dokümantasyon"
  },
  {
    id: 76,
    question: "Tehlikeli yük istifinde 'on deck' (güvertede) taşıma bazı sınıflar için neden zorunlu olabilir?",
    options: [
      "Güverte taşımasının daha ucuz olması",
      "Jettison ve havalandırma kolaylığı",
      "Güverte taşımasının daha hızlı olması",
      "Yalnızca görünüm ve düzen kaygısı"
    ],
    correctAnswer: 1,
    explanation: "Bazı tehlikeli maddeler güvertede taşınır; acil müdahale, havalandırma ve gerekirse denize atma imkânı için.",
    category: "IMDG"
  }
];

export const cargoQuestions: QuizQuestion[] = [
  ...baseCargoQuestions,
  ...cargoQuestionsExtended,
];

