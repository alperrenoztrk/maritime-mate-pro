import type { QuizQuestion } from "@/types/quiz";
import { createSeededRng, pickRandomUnique } from "@/utils/random";

export const navigationQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Bir gemi 09:00'da yola çıkıp 156 NM'lik mesafeyi 13 kn sabit hızla alıyor. Varış saati (aynı zaman dilimi) nedir?",
    options: ["19:00", "20:00", "21:00", "22:00"],
    correctAnswer: 2,
    explanation: "Süre = 156 ÷ 13 = 12 saat; 09:00 + 12 = 21:00. (Yaygın hata: mesafeyi 12 kn'a bölüp 13 saat bulmak → 22:00.)",
    category: "Temel Seyir"
  },
  {
    id: 2,
    question: "Bir gemi 6 dakikada 1.4 NM alıyor. Hızı kaç kn'dur?",
    options: ["8.4", "12", "14", "16"],
    correctAnswer: 2,
    explanation: "6 dk = 0.1 saat. Hız = 1.4 ÷ 0.1 = 14 kn. (Trap: 1.4 × 6 = 8.4 yanlış çarpımdır.)",
    category: "Hız-Mesafe-Zaman"
  },
  {
    id: 3,
    question: "İki mevki aynı boylamda; enlem farkı 0°48' ise aralarındaki mesafe kaç NM'dir?",
    options: ["4.8 NM", "8 NM", "48 NM", "80 NM"],
    correctAnswer: 2,
    explanation: "Aynı boylamda mesafe = enlem farkı (dakika) × 1 NM. 0°48' = 48' ⇒ 48 NM. (Trap: 0.8° veya 4.8 gibi ondalık karışıklıkları.)",
    category: "Coğrafi Temeller"
  },
  {
    id: 4,
    question: "35°00'N ile 37°30'N arasındaki (aynı boylam) mesafe kaç NM'dir?",
    options: ["120 NM", "150 NM", "180 NM", "250 NM"],
    correctAnswer: 1,
    explanation: "Enlem farkı = 2°30' = 150'. Aynı boylamda 1' ≈ 1 NM ⇒ 150 NM. (Trap: 2.5×60=150 doğru; 180 için 3° varsaymak.)",
    category: "Coğrafi Temeller"
  },
  {
    id: 5,
    question: "COG 045° ve SOG 12 kn iken 2 saatte yer değiştirme yaklaşık kaç NM ve hangi hıza doğrudur?",
    options: ["12 NM, 045°", "24 NM, 045°", "20 NM, 090°", "24 NM, 090°"],
    correctAnswer: 1,
    explanation: "Yol = SOG × t = 12 × 2 = 24 NM, yön COG = 045°.",
    category: "Plotting"
  },
  {
    id: 6,
    question: "Set 090° ve drift 2 kn. 3 saatte akıntı toplam kaç NM doğuya sürükler?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 3,
    explanation: "Drift × süre = 2 × 3 = 6 NM; set 090° doğuya.",
    category: "Akıntı"
  },
  {
    id: 7,
    question: "Tasarım rota 000°, rüzgar ve akıntı yok. 1 saat 18 kn ile gidilirse enlem değişimi yaklaşık kaç dakikadır?",
    options: ["9'", "15'", "18'", "30'"],
    correctAnswer: 2,
    explanation: "Kuzey-güney doğrultusunda 18 NM yol ≈ 18'.",
    category: "Enlem-Boylam"
  },
  {
    id: 8,
    question: "Pusula kerteriziniz 062°C, sapma (deviation) +2°, manyetik sapma (variation) -4° ise manyetik kerteriz kaçtır?",
    options: ["064°M", "060°M", "058°M", "066°M"],
    correctAnswer: 0,
    explanation: "C → M dönüşümünde yalnız deviation uygulanır: 062°C + 2° = 064°M. (Variation M → T geçişinde kullanılır: 064° − 4° = 060°T.)",
    category: "Pusula"
  },
  {
    id: 9,
    question: "LOP (position line) nedir?",
    options: ["Hız vektörü", "Mesafe dairesi", "Konum doğrusu", "Akıntı doğrusu"],
    correctAnswer: 2,
    explanation: "LOP, bir ölçümden elde edilen ve konumun üzerinde bulunduğu doğru/çizgidir.",
    category: "Klasik Seyir"
  },
  {
    id: 10,
    question: "DR (dead reckoning) konumu hangi bilgiden üretilir?",
    options: ["COG/SOG", "HDG/Speed through water", "Rüzgar verisi", "GZ eğrisi"],
    correctAnswer: 1,
    explanation: "DR, gemi baş yönü (HDG) ve suya göre hızdan (STW) türetilir.",
    category: "Klasik Seyir"
  },
  {
    id: 11,
    question: "WGS84 hangi amaçla kullanılır?",
    options: ["Meteoroloji", "Jeodezik referans", "Manyetik harita", "Gelgit tahmini"],
    correctAnswer: 1,
    explanation: "WGS84, küresel konumlama için kullanılan jeodezik referans sistemidir.",
    category: "Jeodezi/GNSS"
  },
  {
    id: 12,
    question: "1 kn kaç m/s'ye en yakındır?",
    options: ["0.34", "0.51", "0.72", "1.00"],
    correctAnswer: 1,
    explanation: "1 kn ≈ 0.514 m/s.",
    category: "Birimler"
  },
  {
    id: 13,
    question: "1 NM yaklaşık kaç kilometredir?",
    options: ["1.6", "1.85", "2.0", "2.2"],
    correctAnswer: 1,
    explanation: "1 NM ≈ 1.852 km.",
    category: "Birimler"
  },
  {
    id: 14,
    question: "Compass error = deviation + variation. Deviation +3°, variation -5° ise toplam hata kaçtır?",
    options: ["-2°", "+2°", "+8°", "-8°"],
    correctAnswer: 0,
    explanation: "+3° + (-5°) = -2° (W).",
    category: "Pusula"
  },
  {
    id: 15,
    question: "UTC 12:00'da boylamınız 030°E ise yerel saat yaklaşık nedir? (15°=1 saat)",
    options: ["14:00", "10:00", "12:00", "13:00"],
    correctAnswer: 0,
    explanation: "030°E/15°=2 saat ileri; 12:00 + 2 = 14:00.",
    category: "Zaman Bölgeleri"
  },
  {
    id: 16,
    question: "Gemi 270°T doğrultusunda 12 kn, akıntı 180°T 3 kn. COG/SOG yaklaşık?",
    options: ["COG 255°, 13 kn", "COG 257°, 12.4 kn", "COG 236°, 9 kn", "COG 270°, 15 kn"],
    correctAnswer: 1,
    explanation: "Vektörel toplama: Batıya 12, güneye 3; sonuç ~257° ve büyüklük √(12²+3²)=12.37 ≈ 12.4 kn.",
    category: "Akıntı"
  },
  {
    id: 17,
    question: "Gelgit tablosunda MHWS neyi gösterir?",
    options: ["En düşük düşük su", "Ortalama yüksek su yay", "Ortalama düşük su neap", "En yüksek yüksek su"],
    correctAnswer: 1,
    explanation: "MHWS: Mean High Water Springs.",
    category: "Gelgit"
  },
  {
    id: 18,
    question: "Parakete (log) 14:00'te 3120.0 NM, 16:30'da 3157.5 NM gösteriyor. Ortalama STW kaç kn'dur?",
    options: ["12", "15", "18", "37.5"],
    correctAnswer: 1,
    explanation: "Kat edilen mesafe = 3157.5 − 3120.0 = 37.5 NM; süre 2.5 saat; STW = 37.5 ÷ 2.5 = 15 kn. (Trap: 37.5'i saat sanmak.)",
    category: "Aletler"
  },
  {
    id: 19,
    question: "COG ile HDG arasındaki fark temel olarak neyi gösterir?",
    options: ["Sapma", "Set/Drift etkisi", "Rüzgar yönü", "Deplasman"],
    correctAnswer: 1,
    explanation: "Akıntı ve rüzgâr etkileri geminin baş yönü ile iz yönü arasındaki farkı yaratır.",
    category: "Klasik Seyir"
  },
  {
    id: 20,
    question: "Bir gemi 45 NM'yi 15 kn ile, ardından 40 NM'yi 10 kn ile alıyor. Toplam ortalama hızı yaklaşık kaç kn'dur?",
    options: ["11.3", "12.1", "12.5", "13.0"],
    correctAnswer: 1,
    explanation: "Ortalama hız = toplam yol ÷ toplam süre = (45+40) ÷ (45/15 + 40/10) = 85 ÷ (3+4) = 85÷7 ≈ 12.1 kn. (Trap: hızların aritmetik ortalaması 12.5 kn yanlıştır.)",
    category: "Hız-Mesafe-Zaman"
  },
  {
    id: 21,
    question: "Azimut gözlemi ile bulunan hata hangi pusulaya uygulanır?",
    options: ["Cıvata pusulası", "Gyro", "Manyetik", "Harita"],
    correctAnswer: 1,
    explanation: "Güneş/keşif cismi azimutu ile gyro error belirlenir ve gyroya uygulanır.",
    category: "Pusula"
  },
  {
    id: 22,
    question: "Gyro error +3° ise gyro kuzeyi gerçek kuzeye göre nerededir?",
    options: ["Doğusunda 3°", "Batısında 3°", "Aynı", "30° fark"],
    correctAnswer: 0,
    explanation: "+ hata: gyro true'nun doğusunda.",
    category: "Pusula"
  },
  {
    id: 23,
    question: "RHUMB line (loxodrome) nedir?",
    options: ["Büyük daire", "Sabit kerterizli rota", "En kısa mesafe", "Akıntı doğrusu"],
    correctAnswer: 1,
    explanation: "Loxodrome sabit istikametle izlenen rotadır.",
    category: "Haritacılık"
  },
  {
    id: 24,
    question: "Great circle rotasının avantajı nedir?",
    options: ["Daha kısa mesafe", "Daha az değişken rüzgar", "Daha kolay çizim", "Pusula hatası sıfır"],
    correctAnswer: 0,
    explanation: "Büyük daire en kısa mesafeyi verir.",
    category: "Haritacılık"
  },
  {
    id: 25,
    question: "Mercator projeksiyonun özelliği hangisidir?",
    options: ["Alan korunumlu", "Açı korunumlu", "Uzaklık korunumlu", "Merkezî"],
    correctAnswer: 1,
    explanation: "Mercator konformaldir, açıları korur.",
    category: "Haritacılık"
  },
  {
    id: 26,
    question: "DR ile EP arasındaki fark nedir?",
    options: ["EP akıntı ve rüzgar dahil", "DR GPS'e dayanır", "EP kerterizsiz", "DR akıntı içerir"],
    correctAnswer: 0,
    explanation: "EP (Estimated Position) çevresel etkileri içerir; DR içermez.",
    category: "Klasik Seyir"
  },
  {
    id: 27,
    question: "Bir gemi güneye giderek enlemini 41°10'N'den 40°25'N'e düşürdü. Kat ettiği mesafe kaç NM'dir?",
    options: ["35 NM", "45 NM", "55 NM", "75 NM"],
    correctAnswer: 1,
    explanation: "Enlem farkı = 41°10' − 40°25' = 45'. Aynı boylamda 45' ⇒ 45 NM. (Trap: 41−40=1° sanıp 60 veya 75 bulmak.)",
    category: "Coğrafi Temeller"
  },
  {
    id: 28,
    question: "2 LOP kesişimi size ne verir?",
    options: ["Hız", "Rota", "Konum noktası (fix)", "Sapma"],
    correctAnswer: 2,
    explanation: "İki konum doğrusu, bir konum noktası (fix) oluşturur.",
    category: "Klasik Seyir"
  },
  {
    id: 29,
    question: "Radar 12 NM menzil (yarıçap) ölçeğinde çalışıyor ve ekranda 4 eşit menzil halkası var. Halkalar arası mesafe kaç NM'dir?",
    options: ["2 NM", "3 NM", "4 NM", "6 NM"],
    correctAnswer: 1,
    explanation: "Menzil halkaları eşit aralıklıdır: 12 NM ÷ 4 halka = her halka 3 NM. (Trap: çapı 12 sanıp 1.5 veya 6 bulmak.)",
    category: "Radar"
  },
  {
    id: 30,
    question: "CPA nedir?",
    options: ["Closest Point of Approach", "Course past area", "Compass point angle", "Calculated path angle"],
    correctAnswer: 0,
    explanation: "En yakın yaklaşma noktası.",
    category: "Çatışma Önleme"
  },
  {
    id: 31,
    question: "TCPA = 10 dk ve CPA = 0.2 NM ise hangi aksiyon önceliklidir?",
    options: ["Hiçbiri", "Seyri sürdür", "COLREG'e uygun kaçınma", "Hız artır"],
    correctAnswer: 2,
    explanation: "Kısa TCPA ve düşük CPA çarpışma riskidir; kaçınma manevrası gerekir.",
    category: "COLREG"
  },
  {
    id: 32,
    question: "VAR (variation) doğuda artı ise M'den T'ye dönüşüm nasıl?",
    options: ["T = M + Var(E)", "T = M − Var(E)", "M = T + Var(E)", "C = M + Dev"],
    correctAnswer: 0,
    explanation: "Doğu (+) variation eklenir: True = Magnetic + Var(E).",
    category: "Pusula"
  },
  {
    id: 33,
    question: "Deviation tabloları hangi pusula için tutulur?",
    options: ["Gyro", "Manyetik", "Harita", "Sextant"],
    correctAnswer: 1,
    explanation: "Deviation, manyetik pusulanın gemi üzeri manyetizmadan kaynaklı hatasıdır.",
    category: "Pusula"
  },
  {
    id: 34,
    question: "Plane sailing hangi varsayıma dayanır?",
    options: ["Küre", "Elipsoid", "Düzlem (küçük yaylar)", "Büyük daire"],
    correctAnswer: 2,
    explanation: "Küçük mesafelerde Dünya düzlem kabul edilir.",
    category: "Seyir Yöntemleri"
  },
  {
    id: 35,
    question: "Traverse sailing neyi çözer?",
    options: ["Kutupsal rota", "Küresel trigonometri", "Enlem ve boylam farklarını birlikte", "Sadece boylam farkı"],
    correctAnswer: 2,
    explanation: "Kuzey-güney ve doğu-batı bileşenlerini birlikte ele alır.",
    category: "Seyir Yöntemleri"
  },
  {
    id: 36,
    question: "Rota 270° ile 1 saat 18 kn seyredildi; akıntı seti 090°, drift 2 kn. Net batı bileşeni kaç NM?",
    options: ["16", "18", "20", "22"],
    correctAnswer: 0,
    explanation: "Gemi batıya 18 NM ilerler; set 090° (doğuya) 2 NM geri sürükler: 18 − 2 = 16 NM.",
    category: "Akıntı"
  },
  {
    id: 37,
    question: "38°50'N mevkisinden 1°35' güneye inilirse yeni enlem nedir?",
    options: ["36°15'N", "37°15'N", "37°25'N", "40°25'N"],
    correctAnswer: 1,
    explanation: "38°50' − 1°35' = 37°15'N (50'−35'=15', 38°−1°=37°). (Trap: 50'+35' toplamak ya da güney yerine kuzey.)",
    category: "Enlem-Boylam"
  },
  {
    id: 38,
    question: "Kerteriz 315°T nedir?",
    options: ["NW", "NE", "SW", "SE"],
    correctAnswer: 0,
    explanation: "315° yaklaşık NW yönüdür.",
    category: "Yönler"
  },
  {
    id: 39,
    question: "1 saatlik seyirde 10° sapma ile gidildi. Hedef çizgiden yanal hata ~? (Yol 12 NM)",
    options: ["~1.2 NM", "~2.1 NM", "~3.5 NM", "~0.5 NM"],
    correctAnswer: 1,
    explanation: "Yanal hata ≈ Yol × sin(10°) ≈ 12×0.1736 ≈ 2.08 NM.",
    category: "Plotting"
  },
  {
    id: 40,
    question: "Tide height interpolation en yaygın hangi yöntemle yapılır?",
    options: ["Doğrusal", "Kübik spline", "Logaritmik", "Üstel"],
    correctAnswer: 0,
    explanation: "Pratikte tablolar arasında doğrusal enterpolasyon yapılır.",
    category: "Gelgit"
  },
  {
    id: 41,
    question: "Eş kerteriz yöntemiyle elde edilen LOP tipi nedir?",
    options: ["Daire", "Doğru", "Parabol", "Elips"],
    correctAnswer: 1,
    explanation: "Eş kerteriz iki kerteriz farkından doğrusal bir LOP verir.",
    category: "Klasik Seyir"
  },
  {
    id: 42,
    question: "SOG 10 kn, STW 12 kn ise akıntı hızı yaklaşık kaç kn?",
    options: ["2", "-2", "0", "1"],
    correctAnswer: 0,
    explanation: "SOG = STW + akıntı bileşeni; 10 = 12 + x ⇒ x ≈ -2 kn (ters). Mutlak hız farkı 2 kn.",
    category: "Akıntı"
  },
  {
    id: 43,
    question: "ECDIS'te güvenli derinlik rengi tipik olarak?",
    options: ["Kırmızı", "Sarı", "Mavi", "Beyaz"],
    correctAnswer: 3,
    explanation: "Derin sular genelde beyaz/açık renk, sığlar mavi tonlar.",
    category: "Elektronik Seyir"
  },
  {
    id: 44,
    question: "GNSS'te HDOP düşükse konum doğruluğu?",
    options: ["Kötü", "Orta", "İyi", "Alakasız"],
    correctAnswer: 2,
    explanation: "Düşük DOP daha iyi geometri ve doğruluk demektir.",
    category: "Jeodezi/GNSS"
  },
  {
    id: 45,
    question: "Bir saatte 9 NM kuzeye ve 12 NM doğuya ilerlediniz. Net yer değiştirme ve kabaca yön nedir?",
    options: ["10.8 NM, ~053°", "15 NM, ~037°", "15 NM, ~053°", "21 NM, ~053°"],
    correctAnswer: 2,
    explanation: "Net mesafe = √(9²+12²) = √225 = 15 NM. Yön = atan(12 doğu / 9 kuzey) ≈ 53° ⇒ ~053°. (Trap: 9+12=21 yanlış; 037° bileşenleri ters kullanmaktır.)",
    category: "Vektör"
  },
  {
    id: 46,
    question: "Kerteriz değişimi ile hız tayini hangi yönteme aittir?",
    options: ["Leeway", "Delta bearing", "Running fix", "Doubling the angle"],
    correctAnswer: 3,
    explanation: "Kıyıdan belirli bir açıyı ikiye katlama yöntemi ile hız/mesafe tayini yapılır.",
    category: "Kıyı Seyri"
  },
  {
    id: 47,
    question: "Leeway nedir?",
    options: ["Rüzgar nedeniyle sapma açısı", "Akıntı hızı", "Pusula hatası", "Gelgit farkı"],
    correctAnswer: 0,
    explanation: "Rüzgarın gemiyi itmesiyle oluşan yanal sapma açısı.",
    category: "Rüzgar"
  },
  {
    id: 48,
    question: "Pilot chart'lar ne sunar?",
    options: ["Anlık hava", "İstatistiksel rüzgar/akıntı", "Gemi hatları", "Derinlik"],
    correctAnswer: 1,
    explanation: "Aylık ortalama rüzgar, akıntı ve rota tavsiyeleri bulunur.",
    category: "Planlama"
  },
  {
    id: 49,
    question: "Transit log hangi bilgiyi içermez?",
    options: ["Gemi kimliği", "Mürettebat listesi", "Yakıt fiyatı", "Güzergâh"],
    correctAnswer: 2,
    explanation: "Transit log operasyonel ve idari verileri içerir; fiyat bilgisi yer almaz.",
    category: "Operasyon"
  },
  {
    id: 50,
    question: "60°N enleminde COG 090°, SOG 15 kn ile 4 saat giderseniz boylam değişimi yaklaşık kaç derecedir?",
    options: ["1°", "2°", "3°", "4°"],
    correctAnswer: 1,
    explanation: "Yol = 15 × 4 = 60 NM (departure). 1° boylam = 60 × cos(60°) = 30 NM olduğundan DLong = 60/30 = 2°.",
    category: "Enlem-Boylam"
  },
  // CHALLENGING USCG LEVEL QUESTIONS START HERE
  {
    id: 51,
    question: "Geminin rotası 064°T, varyasyon 17°W ve pusula rotası 094°C ise sapma (deviation) ne kadardır?",
    options: ["4°E", "4°W", "13°E", "13°W"],
    correctAnswer: 3,
    explanation: "T = C + Dev + Var ⇒ 064° = 094° + Dev + (−17°) ⇒ Dev = 064° − 077° = −13° ⇒ 13°W.",
    category: "Pusula Hesaplamaları"
  },
  {
    id: 52,
    question: "Radar plotingde hedefin CPA'sı 0.8 NM ve TCPA'sı 12 dakika ise, çarpışma riski var mıdır?",
    options: ["Hayır, güvenli geçiş", "Evet, yüksek risk", "Şartlı, hızlara bağlı", "Belirsiz, takip gerekli"],
    correctAnswer: 1,
    explanation: "CPA < 1 NM ve TCPA < 20 dakika ise yüksek çarpışma riski vardır. Derhal kaçınma manevrası gereklidir.",
    category: "Radar & Çarpışma Önleme"
  },
  {
    id: 53,
    question: "Gök cismi yüksekliği 35°20', göz yüksekliği 12 m ve endeks hatası +2' ise gözlenen yükseklik (Ho) nedir?",
    options: ["35°16'", "35°18'", "35°22'", "35°12'"],
    correctAnswer: 3,
    explanation: "Ho = Hs - IE - DIP. DIP = 1.77√12 ≈ 6'. Ho = 35°20' - 2' - 6' = 35°12'",
    category: "Astronomik Seyir"
  },
  {
    id: 54,
    question: "Tidal stream 2.5 kn 090° yönünde akıyor. Hedef rota 000° ve hız 8 kn ise gerçek rota ne olmalı?",
    options: ["342°", "018°", "000°", "270°"],
    correctAnswer: 0,
    explanation: "Akıntı üçgeni çözümü gerekli. Stream etkisini yenmek için geminin başını batıya çevirmesi gerekir, yaklaşık 342°.",
    category: "Akıntı & Rüzgar"
  },
  {
    id: 55,
    question: "COLREGS'e göre, balıkçı gemisi, motorlu gemi ve yelkenli gemi karşılaştığında öncelik sırası nedir?",
    options: ["Yelkenli > Motorlu > Balıkçı", "Balıkçı > Yelkenli > Motorlu", "Motorlu > Balıkçı > Yelkenli", "Hepsi eşit"],
    correctAnswer: 1,
    explanation: "COLREGS Kural 18: Balıkçı gemisi (faaliyet halinde) > Yelkenli > Motorlu gemi öncelik sırası.",
    category: "COLREGS"
  },
  {
    id: 56,
    question: "GPS HDOP değeri 8.5 ise pozisyon kalitesi nasıl değerlendirilir?",
    options: ["Mükemmel (1-2)", "İyi (2-5)", "Orta (5-10)", "Kötü (>10)"],
    correctAnswer: 2,
    explanation: "HDOP (Horizontal Dilution of Precision): 5-10 arası orta kalite, 8.5 kabul edilebilir ama dikkatli kullanım gerekli.",
    category: "Elektronik Seyir"
  },
  {
    id: 57,
    question: "Mercator projeksiyonunda iki nokta arası rumb çizgisi rotası ve mesafe nasıl bulunur?",
    options: ["Harita üzerinde düz çizgi", "Büyük daire hesabı", "DLat ve DLong ile", "Gnomonik projeksiyon gerekli"],
    correctAnswer: 2,
    explanation: "Mercator'da rumb çizgisi düz çizgidir. tan(Rota) = DLong / DMP (meridyen parçaları farkı); mesafe = DLat / cos(Rota).",
    category: "Harita Projeksiyonları"
  },
  {
    id: 58,
    question: "Dead reckoning pozisyonundan fix'e kadar 2.5 NM error var. Bu durumda ne yapmalı?",
    options: ["DR'ı devam ettir", "Set ve drift hesapla", "Kompası kontrol et", "Hızı azalt"],
    correctAnswer: 1,
    explanation: "2.5 NM error büyük. Set (akıntı yönü) ve drift (akıntı hızı) hesaplayıp DR'ı düzeltmek gerekli.",
    category: "Dead Reckoning"
  },
  {
    id: 59,
    question: "Radar hedefi 2.0 NM mesafede, sancak 15°'de ve kerterizi değişmeden yaklaşıyor. Risk değerlendirmesi?",
    options: ["Güvenli geçiş", "Yakın geçiş, takip et", "Çarpışma kursu", "Manevraya gerek yok"],
    correctAnswer: 2,
    explanation: "Kerteriz değişmeden mesafe azalıyorsa çarpışma kursu vardır (COLREG Kural 7); kısa mesafede yüksek risk.",
    category: "Radar Navigasyon"
  },
  {
    id: 60,
    question: "Sunrise azimuth 078°, amplitudo 073° gözlenmiş. Magnetic compass sapması (deviation) nedir?",
    options: ["5°E", "5°W", "151°E", "151°W"],
    correctAnswer: 0,
    explanation: "Pusula hatası = Hakiki azimut − Pusula azimutu = 078° − 073° = +5° = 5°E (varyasyon sıfır kabul edilirse bu değer deviasyondur).",
    category: "Astronomik Pusula Kontrolü"
  },
  {
    id: 61,
    question: "Radar plotunda hedefin 5 dakikalık hareket vektörü 2 cm ölçülüyor; mesafe ölçeği 1 cm = 1 NM ise hedefin hızı ne kadardır?",
    options: ["6 kn", "12 kn", "24 kn", "30 kn"],
    correctAnswer: 2,
    explanation: "2 cm × 1 NM/cm = 2 NM / 5 dk. Hız = 2 × (60/5) = 24 kn.",
    category: "ARPA"
  },
  {
    id: 62,
    question: "Celestial sight reduction'da Hc = 35°25', Ho = 35°18' ise intercept ne kadardır?",
    options: ["7' Away", "7' Towards", "43' Away", "43' Towards"],
    correctAnswer: 0,
    explanation: "Intercept = Ho - Hc = 35°18' - 35°25' = -7'. Negatif değer 'Away' (uzak) demektir.",
    category: "Astronomik Seyir"
  },
  {
    id: 63,
    question: "Kuzey yarımkürede (güneş gözlemcinin güneyinde) local apparent noon'da güneşin gyro kerterizi 178° ise gyro hatası ne kadardır?",
    options: ["2°E", "2°W", "182°E", "182°W"],
    correctAnswer: 0,
    explanation: "LAN'da güneş tam güneyde (180°T) olmalı. Hata = Hakiki − Gyro = 180° − 178° = +2° = 2°E (gyro düşük okuyor; 'compass least, error east').",
    category: "Gyro Compass Kontrolü"
  },
  {
    id: 64,
    question: "Tidal heights: HW 4.2m at 1430, LW 0.8m at 2045. Saat 1700'de gelgit yüksekliği yaklaşık kaç metredir?",
    options: ["3.1m", "2.7m", "3.5m", "4.0m"],
    correctAnswer: 0,
    explanation: "Tidal curve rule of twelfths veya cosine rule kullanılır. 1430-1700 = 2.5 saat, tidal range 3.4m, yaklaşık 3.1m.",
    category: "Gelgit Hesaplamaları"
  },
  {
    id: 65,
    question: "Great circle navigation'da vertex latitude nedir?",
    options: ["Başlangıç lat.+ 25°", "Course değişiminin ortası", "En yüksek latitude", "Final lat.+ 25°"],
    correctAnswer: 2,
    explanation: "Great circle'da vertex en yüksek (veya en düşük) latitude noktasıdır.",
    category: "Great Circle"
  },
  {
    id: 66,
    question: "Composite great circle navigation ne zaman kullanılır?",
    options: ["Tüm uzun mesafelerde", "Ice limit varsa", "Fuel tasarrufu için", "Sadece Atlantik'te"],
    correctAnswer: 1,
    explanation: "Composite sailing, ice limit, traffic separation zones gibi kısıtlamalar olduğunda kullanılır.",
    category: "Composite Sailing"
  },
  {
    id: 67,
    question: "Electronic chart (ECDIS) alarm: 'Cross Track Error 0.5 NM'. Ne yapmalı?",
    options: ["Alarmı kapat", "Route'u kontrol et", "Manual steering'e geç", "Hızı azalt"],
    correctAnswer: 1,
    explanation: "XTE 0.5 NM büyük sapma. Route planını, akıntıyı ve steering mode'u kontrol etmek gerekli.",
    category: "ECDIS"
  },
  {
    id: 68,
    question: "Magnetic variation 15°W olan bölgede compass heading 270°M'dan true heading'e çevirmek için?",
    options: ["270° + 15° = 285°T", "270° - 15° = 255°T", "270° × 1.15", "Ek hesap gerekli"],
    correctAnswer: 1,
    explanation: "True = Magnetic + Variation. Westerly variation negatif: T = 270° + (-15°) = 255°T.",
    category: "Compass Corrections"
  },
  {
    id: 69,
    question: "COLREGS Rule 19 (fog) gereği radar contact'ta ne yapmalı?",
    options: ["Starboard'a dön", "Full astern", "Safe speed'e düş", "Fog signal ver"],
    correctAnswer: 2,
    explanation: "Rule 19: Görüş kısıtlı havada safe speed ile gitmek, ani manevralardan kaçınmak gerekir.",
    category: "COLREGS - Fog"
  },
  {
    id: 70,
    question: "Celestial navigation'da meridian passage time nasıl hesaplanır?",
    options: ["GHA = longitude", "SHA + GHA = 360°", "LMT = GMT + longitude", "Sunrise + 6 saat"],
    correctAnswer: 0,
    explanation: "Meridian passage'da GHA = observer longitude olduğu zamanı hesaplamak gerekir.",
    category: "Celestial Timing"
  },
  {
    id: 71,
    question: "Parallel sailing formülünde DLong = 180 NM, latitude 45°N ise departure ne kadardır?",
    options: ["127 NM", "180 NM", "255 NM", "360 NM"],
    correctAnswer: 0,
    explanation: "Departure = DLong × cos(lat) = 180 × cos(45°) = 180 × 0.707 = 127 NM.",
    category: "Parallel Sailing"
  },
  {
    id: 72,
    question: "GPS almanac data kaç gün geçerlidir?",
    options: ["1 gün", "7 gün", "30 gün", "180 gün"],
    correctAnswer: 3,
    explanation: "GPS almanac yaklaşık 6 ay (180 gün) geçerlidir. Ephemeris data ise 2-4 saat geçerli.",
    category: "GPS Teknik"
  },
  {
    id: 73,
    question: "Current triangle'da set 045°, drift 2.5 kn, ship's heading 000°, speed 10 kn ise track yaklaşık nedir?",
    options: ["009°", "346°", "045°", "000°"],
    correctAnswer: 0,
    explanation: "Vektör toplamı: Doğu bileşeni = 2.5·sin45° ≈ 1.77 kn, kuzey bileşeni = 10 + 2.5·cos45° ≈ 11.77 kn. Track = arctan(1.77/11.77) ≈ 009°.",
    category: "Current Calculations"
  },
  {
    id: 74,
    question: "Radar ufuk mesafesi 20 NM ise radar anten yüksekliği yaklaşık kaç metredir?",
    options: ["8 m", "20 m", "45 m", "80 m"],
    correctAnswer: 3,
    explanation: "Radar ufku d ≈ 2.23·√h (h metre, d NM). 20 = 2.23·√h ⇒ √h ≈ 8.97 ⇒ h ≈ 80 m.",
    category: "Radar Theory"
  },
  {
    id: 75,
    question: "SOLAS V/19 kapsamında uluslararası sefer yapan gemilerde AIS taşıma zorunluluğu hangi tonajdan itibaren başlar?",
    options: ["Tüm gemiler", ">300 GT", ">500 GT", ">1600 GT"],
    correctAnswer: 1,
    explanation: "AIS, uluslararası sefer yapan 300 GT ve üzeri gemiler (ve tüm yolcu gemileri) için zorunludur; SOLAS V/19 donanım gereklilikleri tonaja göre kademelidir.",
    category: "Maritime Regulations"
  },
  {
    id: 76,
    question: "Mercator chart'ta 1° latitude 60 NM ise, 45°N'de 1° longitude kaç NM'dir?",
    options: ["42.4 NM", "60 NM", "84.8 NM", "120 NM"],
    correctAnswer: 0,
    explanation: "45°N'de: 1° longitude = 60 × cos(45°) = 60 × 0.707 = 42.4 NM.",
    category: "Chart Projections"
  },
  {
    id: 77,
    question: "True wind speed 25 kn, direction 090°T. Ship heading 045°T, speed 15 kn ise apparent wind nedir?",
    options: ["18 kn, 063°T", "37 kn, 073°T", "25 kn, 090°T", "40 kn, 045°T"],
    correctAnswer: 1,
    explanation: "Rüzgâr 090°'dan esiyor (vektör: −25E). Gemi hareketi (10.6E, 10.6N); görünen rüzgâr vektörü = gerçek rüzgâr − gemi hızı = (−35.6, −10.6) ⇒ hız √(35.6²+10.6²) ≈ 37 kn, esme yönü ≈ 073°T.",
    category: "Wind Calculations"
  },
  {
    id: 78,
    question: "Seyir hâlindeki bir geminin AIS Class A dinamik veri raporlama aralığı ne kadardır?",
    options: ["Sabit 10 saniye", "Hıza/dönüşe bağlı 2-10 saniye", "Sabit 30 saniye", "Sabit 2 dakika"],
    correctAnswer: 1,
    explanation: "AIS Class A seyirde hıza ve rota değişimine bağlı olarak 2-10 saniyede bir rapor verir; demirli/bağlı gemide aralık 3 dakikadır.",
    category: "AIS Technical"
  },
  {
    id: 79,
    question: "Gyrocompass settling time genellikle ne kadardır?",
    options: ["15 dakika", "2-6 saat", "24 saat", "3 gün"],
    correctAnswer: 1,
    explanation: "Gyrocompass settling time (true north'a alignment) genellikle 2-6 saat sürer.",
    category: "Gyrocompass"
  },
  {
    id: 80,
    question: "COLREGS'te 'constrained by draught' geminin lights configuration nasıl olmalı?",
    options: ["3 red lights", "Red-White-Red", "2 black balls", "Diamond shape"],
    correctAnswer: 0,
    explanation: "Constrained by draught: 3 vertical red lights (gece) ve cylinder (gündüz) gösterir.",
    category: "COLREGS Signals"
  },
  {
    id: 81,
    question: "Resmî ENC güncellemeleri (update service) tipik olarak hangi sıklıkta yayımlanır ve uygulanır?",
    options: ["Haftalık", "Aylık", "Yılda bir", "Yalnızca sefer öncesi"],
    correctAnswer: 0,
    explanation: "ENC güncellemeleri (ör. AVCS/Primar servisleri) haftalık yayımlanır ve alınır alınmaz uygulanır; ayrıca sefer öncesi ve seyirde T&P/NAVAREA uyarıları takip edilir.",
    category: "Chart Corrections"
  },
  {
    id: 82,
    question: "Radar ARPA target acquisition için minimum time ne kadardır?",
    options: ["30 saniye", "1 dakika", "3 dakika", "5 dakika"],
    correctAnswer: 2,
    explanation: "ARPA reliable track establishment için minimum 3 dakika gerekmektedir.",
    category: "ARPA Technical"
  },
  {
    id: 83,
    question: "GPS Selective Availability hangi yılda kaldırılmıştır?",
    options: ["1995", "2000", "2005", "2010"],
    correctAnswer: 1,
    explanation: "GPS Selective Availability (artificial accuracy degradation) 1 Mayıs 2000'de kaldırıldı.",
    category: "GPS History"
  },
  {
    id: 84,
    question: "GMDSS sea area A2'de hangi communication systems zorunludur?",
    options: ["Sadece VHF", "VHF + MF", "Sadece INMARSAT", "Tüm sistemler"],
    correctAnswer: 1,
    explanation: "GMDSS A2 alanı: VHF (DSC) donanımına ek olarak MF (DSC) zorunludur; uydu haberleşmesi ek/alternatif işlevler için kullanılabilir.",
    category: "GMDSS"
  },
  {
    id: 85,
    question: "Tide tables'da secondary port için corrections nasıl uygulanır?",
    options: ["Direct reading", "Time & height differences", "Percentage calculation", "Linear interpolation"],
    correctAnswer: 1,
    explanation: "Secondary port: Standard port'tan time difference ve height difference uygulanır.",
    category: "Tidal Calculations"
  },
  {
    id: 86,
    question: "ECDIS'te over-scale uyarısı ne zaman görünür?",
    options: ["Compilation scale'den daha büyük ölçeğe yakınlaştırınca", "Compilation scale'den daha küçük ölçeğe uzaklaştırınca", "Sadece raster haritalarda", "TSS içinde her zaman"],
    correctAnswer: 0,
    explanation: "Over-scale, ENC compilation scale'in ötesinde yakınlaştırıldığında (daha büyük ölçek) görünür; detay güvenilir olmayabilir.",
    category: "ECDIS Display"
  },
  {
    id: 87,
    question: "GPS/GNSS integrity monitoring RAIM için minimum kaç uydu gerekir?",
    options: ["4", "5", "6", "8"],
    correctAnswer: 1,
    explanation: "RAIM (Receiver Autonomous Integrity Monitoring) için minimum 5 uydu gereklidir.",
    category: "GPS/GNSS"
  },
  {
    id: 88,
    question: "COLREGS Rule 2 (responsibility) en önemli prensibi nedir?",
    options: ["Right of way", "Good seamanship", "Technical compliance", "Speed limits"],
    correctAnswer: 1,
    explanation: "Rule 2: Good seamanship ve ordinary practice of seamen her durumda geçerlidir.",
    category: "COLREGS Philosophy"
  },
  {
    id: 89,
    question: "Chart datum ve GPS datum farkı pozisyon hatası yaratabilir mi?",
    options: ["Hayır, aynıdır", "Evet, yüzlerce metreye varabilir", "Sadece eski chartlarda", "Teknisyen ayarlar"],
    correctAnswer: 1,
    explanation: "Yerel harita datumu ile GPS datumu (WGS84) arasındaki fark, bölgeye göre yüzlerce metreye varan pozisyon hatası yaratabilir; harita üzerindeki datum notu kontrol edilmelidir.",
    category: "Datum Differences"
  },
  {
    id: 90,
    question: "Emergency navigation equipment listesinde olması gereken minimum items nelerdir?",
    options: ["Sadece compass", "Compass + charts", "Compass, charts, sextant", "Full bridge equipment"],
    correctAnswer: 2,
    explanation: "Emergency navigation: Magnetic compass, essential charts, sextant, chronometer, navigation tables minimum gereklidir.",
    category: "Emergency Navigation"
  }
];

export const getRandomNavigationQuestions = (count: number, seed?: number): QuizQuestion[] => {
  const rng = seed === undefined ? Math.random : createSeededRng(seed);
  return pickRandomUnique(navigationQuestions, count, rng);
};

export const getNavigationCategories = (): string[] => {
  return Array.from(new Set(navigationQuestions.map(q => q.category)));
};
