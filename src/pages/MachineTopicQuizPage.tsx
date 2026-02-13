import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ListChecks, Shuffle } from "lucide-react";
import { StabilityQuiz as Quiz } from "@/components/stability/StabilityQuiz";
import type { QuizQuestion } from "@/types/quiz";

const topicQuestions: Record<string, QuizQuestion[]> = {
  thermodynamics: [
    { id: 1, question: "Carnot çevriminin verimi hangi parametrelere bağlıdır?", options: ["Yalnızca basınç", "Sıcak ve soğuk kaynak sıcaklıkları", "Hacim ve basınç", "Akışkan türü"], correctAnswer: 1, explanation: "Carnot verimi η = 1 − T_L/T_H formülüyle yalnızca kaynak sıcaklıklarına bağlıdır.", category: "Termodinamik" },
    { id: 2, question: "Adyabatik süreçte hangi büyüklük sabit kalır?", options: ["Sıcaklık", "Basınç", "Entropi", "Hacim"], correctAnswer: 2, explanation: "Adyabatik tersinir süreçte entropi sabit kalır (izentropik süreç).", category: "Termodinamik" },
    { id: 3, question: "Diesel çevrimi Otto çevriminden hangi yönüyle ayrılır?", options: ["Isı girişi sabit basınçta gerçekleşir", "Isı girişi sabit hacimde gerçekleşir", "Sıkıştırma oranı düşüktür", "Verimi her zaman düşüktür"], correctAnswer: 0, explanation: "Diesel çevriminde ısı girişi sabit basınçta, Otto'da ise sabit hacimde gerçekleşir.", category: "Termodinamik" },
    { id: 4, question: "LMTD neyi ifade eder?", options: ["Logaritmik ortalama tork farkı", "Logaritmik ortalama sıcaklık farkı", "Lineer minimum sıcaklık değeri", "Akış hızı ortalaması"], correctAnswer: 1, explanation: "LMTD, ısı eşanjörlerinde ısı transfer hesaplarında kullanılan logaritmik ortalama sıcaklık farkıdır.", category: "Termodinamik" },
    { id: 5, question: "Termodinamiğin ikinci yasası neyi ifade eder?", options: ["Enerjinin korunumu", "Entropinin her zaman artması veya sabit kalması", "İş ve ısının eşdeğerliği", "Mutlak sıfıra ulaşılamayacağı"], correctAnswer: 1, explanation: "İkinci yasa: izole bir sistemde toplam entropi asla azalmaz.", category: "Termodinamik" },
  ],
  "fluid-mechanics": [
    { id: 1, question: "Bernoulli denklemi hangi tip akış için geçerlidir?", options: ["Türbülanslı, sıkıştırılabilir", "Sürtünmesiz, sıkıştırılamaz, kararlı", "Tüm akış tipleri", "Yalnızca gaz akışları"], correctAnswer: 1, explanation: "Bernoulli denklemi ideal (sürtünmesiz), sıkıştırılamaz ve kararlı akış için geçerlidir.", category: "Akışkanlar" },
    { id: 2, question: "Reynolds sayısı 4000'den büyük olduğunda akış rejimi nedir?", options: ["Laminer", "Geçiş bölgesi", "Türbülanslı", "Durağan"], correctAnswer: 2, explanation: "Re > 4000 değerinde akış türbülanslı kabul edilir.", category: "Akışkanlar" },
    { id: 3, question: "Kavitasyon nedir?", options: ["Boru içinde hava sıkışması", "Sıvının buharlaşma basıncının altına düşmesi sonucu buhar kabarcıkları oluşması", "Pompa impellerinin aşınması", "Yüksek basınç nedeniyle çöken kabarcıklar"], correctAnswer: 1, explanation: "Kavitasyon, sıvı basıncının lokal olarak buhar basıncının altına düşmesiyle oluşan buhar kabarcıklarıdır.", category: "Akışkanlar" },
    { id: 4, question: "Pompa afinite kurallarına göre debi hangi oranla değişir?", options: ["Devir karesiyle", "Devir küpüyle", "Devirle doğru orantılı", "Devirin karekökü ile"], correctAnswer: 2, explanation: "Q₂/Q₁ = n₂/n₁ — debi, devirle doğrusal orantılıdır.", category: "Akışkanlar" },
    { id: 5, question: "NPSH_a nedir?", options: ["Pompa çıkış basıncı", "Net pozitif emme yüksekliği (mevcut)", "Nominal pompa seçim yüksekliği", "Boru kayıp katsayısı"], correctAnswer: 1, explanation: "NPSH_a: pompanın emme tarafında kavitasyona karşı mevcut olan basınç farkıdır.", category: "Akışkanlar" },
  ],
  "machine-elements": [
    { id: 1, question: "Bir mile etkiyen burulma gerilmesi nasıl hesaplanır?", options: ["σ = F/A", "τ = T·r/J", "σ = M·y/I", "τ = V·Q/(I·b)"], correctAnswer: 1, explanation: "Burulma gerilmesi τ = T·r/J formülüyle hesaplanır. T: tork, r: yarıçap, J: polar atalet momenti.", category: "Makine Elemanları" },
    { id: 2, question: "Barred speed range ne anlama gelir?", options: ["Geminin maksimum hız aralığı", "Torsiyonel titreşim nedeniyle kaçınılması gereken devir aralığı", "Jeneratör frekans aralığı", "Pompa çalışma aralığı"], correctAnswer: 1, explanation: "Barred speed range, şaft hattında torsiyonel rezonans oluşan ve sürekli çalışmanın yasak olduğu devir aralığıdır.", category: "Makine Elemanları" },
    { id: 3, question: "L₁₀ yatak ömrü ne ifade eder?", options: ["Yatağın %10 olasılıkla bozulacağı ömür", "Yatağın garanti ömrü", "Yatağın %90 olasılıkla dayanacağı ömür", "Yatağın maksimum ömrü"], correctAnswer: 2, explanation: "L₁₀: test edilen yatakların %90'ının arızasız ulaşacağı ömürdür (milyon devir).", category: "Makine Elemanları" },
    { id: 4, question: "Galvanik korozyon ne zaman oluşur?", options: ["Aynı malzemedeki gerilme çatlaklarında", "Farklı potansiyeldeki iki metalin elektrolit içinde temas etmesiyle", "Yüksek sıcaklıkta oksidasyon ile", "Asit ortamında kimyasal çözünme ile"], correctAnswer: 1, explanation: "Galvanik korozyon, elektrolit ortamda farklı potansiyeldeki metallerin temasıyla oluşur.", category: "Makine Elemanları" },
    { id: 5, question: "Pervane şaftı malzemesi için hangi standart referans alınır?", options: ["ISO 8217", "IACS UR M68", "SOLAS II-2", "STCW A-III/1"], correctAnswer: 1, explanation: "Pervane şaftı çapı ve malzeme gereksinimleri IACS UR M68 standardına göre belirlenir.", category: "Makine Elemanları" },
  ],
  "diesel-engines": [
    { id: 1, question: "Scavenge fire belirtisi hangisidir?", options: ["Düşük egzoz sıcaklığı", "Scavenge trunk sıcaklık artışı ve duman", "Yüksek soğutma suyu basıncı", "Düşük yağ basıncı"], correctAnswer: 1, explanation: "Scavenge fire belirtileri: scavenge trunk sıcaklık artışı, duman, yerel ısınma ve turboşarjer surgesi.", category: "Dizel Motor" },
    { id: 2, question: "İki zamanlı motorun dört zamanlıya göre avantajı nedir?", options: ["Daha düşük SFOC", "Her devir bir güç stroku üretmesi", "Daha az titreşim", "Daha yüksek devir"], correctAnswer: 1, explanation: "İki zamanlı motor her devirdebir güç stroku üretir; dört zamanlıda iki devirde bir.", category: "Dizel Motor" },
    { id: 3, question: "SFOC birimi nedir?", options: ["kg/saat", "g/kW·h", "L/mil", "ton/gün"], correctAnswer: 1, explanation: "SFOC (Specific Fuel Oil Consumption) birimi g/kW·h'dir; düşük değer daha yüksek verim demektir.", category: "Dizel Motor" },
    { id: 4, question: "Common rail enjeksiyon sisteminin avantajı nedir?", options: ["Daha düşük enjeksiyon basıncı", "Motor devrine bağımsız yüksek basınçlı enjeksiyon", "Mekanik basitlik", "Bakım gerektirmez"], correctAnswer: 1, explanation: "Common rail, motor devrine bağlı olmaksızın sabit yüksek basınçta (2000+ bar) enjeksiyon sağlar.", category: "Dizel Motor" },
    { id: 5, question: "Crankcase explosion'ın ana nedeni nedir?", options: ["Düşük yağ seviyesi", "Oil mist (yağ buharı) oluşumu ve tutuşması", "Aşırı soğuma", "Yüksek yakıt basıncı"], correctAnswer: 1, explanation: "Crankcase patlaması, sıcak noktalardan (hot spot) oluşan yağ buharının tutuşmasıyla gerçekleşir.", category: "Dizel Motor" },
  ],
  "ship-systems": [
    { id: 1, question: "HT soğutma devresi genellikle neyi soğutur?", options: ["Yalnızca yağı", "Silindir gömleklerini (jacket water)", "Şarj havasını", "Deniz suyunu"], correctAnswer: 1, explanation: "HT (High Temperature) devresi ana makine silindir gömleklerini soğutarak optimum çalışma sıcaklığını korur.", category: "Makine Sistemleri" },
    { id: 2, question: "Yakıt viskozite kontrolü neden önemlidir?", options: ["Motor gürültüsünü azaltır", "Doğru atomizasyon ve yanma sağlar", "Yakıt rengini iyileştirir", "Tank kapasitesini artırır"], correctAnswer: 1, explanation: "Doğru viskozite, enjektörde uygun atomizasyon sağlayarak tam yanmayı ve düşük emisyonu mümkün kılar.", category: "Makine Sistemleri" },
    { id: 3, question: "Yağlama sisteminde normal basınç aralığı nedir?", options: ["0,5–1 bar", "1–2 bar", "3–8 bar", "15–20 bar"], correctAnswer: 2, explanation: "Ana makine yağlama basıncı tipik olarak 3–5 bar (düşük devir) ve 5–8 bar (tam yük) arasındadır.", category: "Makine Sistemleri" },
    { id: 4, question: "Quick-closing valve ne zaman kullanılır?", options: ["Normal operasyonda", "Yangın veya acil durumda", "Yakıt transferinde", "Yağ değişiminde"], correctAnswer: 1, explanation: "Quick-closing valve yangın veya sızıntı durumunda yakıt/yağ akışını uzaktan kesmek için kullanılır.", category: "Makine Sistemleri" },
    { id: 5, question: "Egzoz back pressure yükseldiğinde ne olur?", options: ["Motor verimi artar", "Turboşarjer verimi düşer, SFOC artar", "Soğutma suyu sıcaklığı düşer", "Yağ basıncı yükselir"], correctAnswer: 1, explanation: "Yüksek egzoz back pressure turboşarjer verimini düşürür, yanma kalitesini bozar ve SFOC'u artırır.", category: "Makine Sistemleri" },
  ],
  auxiliary: [
    { id: 1, question: "Acil jeneratör ne kadar sürede devreye girmelidir?", options: ["10 saniye", "30 saniye", "45 saniye", "60 saniye"], correctAnswer: 2, explanation: "SOLAS II-1/Reg.44 gereği acil jeneratör 45 saniye içinde tam yükü besleyecek şekilde devreye girmelidir.", category: "Yardımcı Makineler" },
    { id: 2, question: "Separatörde Stokes yasası neyi belirler?", options: ["Yakıt kalitesini", "Parçacık ayrışma hızını", "Disk sayısını", "Motor verimini"], correctAnswer: 1, explanation: "Stokes yasası, yerçekimi/santrifüj kuvveti altında parçacıkların ayrışma hızını belirler.", category: "Yardımcı Makineler" },
    { id: 3, question: "Kazan emniyet valfi hangi basınçta açmalıdır?", options: ["Çalışma basıncının %50 fazlasında", "Set basıncının %3'ü içinde", "Çalışma basıncının 2 katında", "Herhangi bir basınçta"], correctAnswer: 1, explanation: "Emniyet valfi set basıncının ±%3'ü içinde açmalıdır.", category: "Yardımcı Makineler" },
    { id: 4, question: "Reverse power relay ne işe yarar?", options: ["Voltaj düşüşünü önler", "Jeneratörün motor olarak çalışmasını engeller", "Frekansı sabitler", "Yükü dengeler"], correctAnswer: 1, explanation: "Reverse power relay, jeneratörün şebekeden güç çekmesini (motorlaşmasını) algılayarak devreden çıkarır.", category: "Yardımcı Makineler" },
    { id: 5, question: "Tatlı su jeneratöründe vakum neden gereklidir?", options: ["Suyun tadını iyileştirir", "Düşük sıcaklıkta buharlaşmayı sağlar", "Enerji tasarrufu sağlar", "Tuz oranını kontrol eder"], correctAnswer: 1, explanation: "Vakum ortamında su 40–60°C gibi düşük sıcaklıklarda buharlaşır, böylece atık ısı kullanılabilir.", category: "Yardımcı Makineler" },
  ],
  "fuel-technology": [
    { id: 1, question: "CCAI nedir?", options: ["Yakıtın viskozite ölçüsü", "Yakıtın tutuşabilirlik göstergesi", "Karbon emisyon katsayısı", "Kükürt analiz indeksi"], correctAnswer: 1, explanation: "CCAI (Calculated Carbon Aromaticity Index), yakıtın tutuşma kalitesini gösteren bir indekstir. CCAI < 870 iyidir.", category: "Yakıt" },
    { id: 2, question: "HFO'dan MGO'ya geçişte en büyük risk nedir?", options: ["Yüksek maliyet", "Termal şok", "Düşük viskozite", "Tank kapasitesi"], correctAnswer: 1, explanation: "Ani sıcaklık değişimi (termal şok) pompa, enjektör ve boru bağlantılarında hasara yol açabilir.", category: "Yakıt" },
    { id: 3, question: "ISO 8217 neyi standartlaştırır?", options: ["Motor performansını", "Deniz yakıtı kalitesini", "Emisyon limitlerini", "Yağlama yağı özelliklerini"], correctAnswer: 1, explanation: "ISO 8217, deniz yakıtlarının kalite parametrelerini (viskozite, yoğunluk, kükürt, su, sediment vb.) standartlaştırır.", category: "Yakıt" },
    { id: 4, question: "Settling tank sıcaklığı HFO için ne olmalıdır?", options: ["40°C", "55°C", "70°C", "90°C"], correctAnswer: 2, explanation: "HFO settling tank sıcaklığı ~70°C'de tutularak su ve katı maddelerin yerçekimiyle çökmesi sağlanır.", category: "Yakıt" },
    { id: 5, question: "BDN kaç yıl saklanmalıdır?", options: ["1 yıl", "2 yıl", "3 yıl", "5 yıl"], correctAnswer: 2, explanation: "MARPOL Annex VI gereği Bunker Delivery Note en az 3 yıl saklanmalıdır.", category: "Yakıt" },
  ],
  "cooling-hvac": [
    { id: 1, question: "COP nedir?", options: ["Sıkıştırma oranı", "Performans katsayısı (soğutma kapasitesi/kompresör işi)", "Soğutucu akışkan katsayısı", "Kondenser verimi"], correctAnswer: 1, explanation: "COP = Q_L/W_comp, soğutma sisteminin etkinlik ölçüsüdür. Yüksek COP daha verimli sistemi gösterir.", category: "Soğutma" },
    { id: 2, question: "R-717 hangi akışkandır?", options: ["Freon", "Amonyak (NH₃)", "CO₂", "Propan"], correctAnswer: 1, explanation: "R-717 amonyaktır. Yüksek verimli ancak toksik ve yanıcıdır; özel güvenlik önlemleri gerektirir.", category: "Soğutma" },
    { id: 3, question: "Provision soğutma odası sıcaklığı ne olmalıdır?", options: ["-25°C ile -18°C arası (donmuş)", "+2°C ile +5°C arası (taze)", "Her ikisi de doğru", "+10°C ile +15°C arası"], correctAnswer: 2, explanation: "Donmuş ürünler -25°C ile -18°C, taze ürünler +2°C ile +5°C arasında muhafaza edilir.", category: "Soğutma" },
    { id: 4, question: "Kigali Değişikliği neyi hedefler?", options: ["ODS maddelerinin yasaklanması", "HFC'lerin kademeli azaltılması", "CO₂ emisyonlarının düşürülmesi", "NOx limitlerinin sıkılaştırılması"], correctAnswer: 1, explanation: "Kigali Değişikliği (2016), Montreal Protokolü kapsamında HFC soğutucu akışkanların kademeli azaltılmasını hedefler.", category: "Soğutma" },
    { id: 5, question: "Subcooling ne anlama gelir?", options: ["Soğutucunun aşırı ısınması", "Kondenser çıkışında sıvının doyma sıcaklığının altına soğutulması", "Evaporatörde tam buharlaşma", "Kompresör süperheat değeri"], correctAnswer: 1, explanation: "Subcooling, kondenser çıkışında sıvı soğutucunun doyma sıcaklığının birkaç derece altına soğutulmasıdır.", category: "Soğutma" },
  ],
  electrical: [
    { id: 1, question: "Gemi elektrik sistemlerinde neden IT topraklama kullanılır?", options: ["Maliyet düşüktür", "İlk toprak kaçağında sistem çalışmaya devam eder", "Daha yüksek verim sağlar", "Bakım gerektirmez"], correctAnswer: 1, explanation: "IT (izole nötr) sistemde ilk toprak kaçağında devre kesilmez; ikinci kaçakta alarm verilir.", category: "Elektrik" },
    { id: 2, question: "Black-out'un en yaygın nedeni nedir?", options: ["Yakıt bitimi", "Aşırı yük veya kısa devre", "Düşük deniz suyu sıcaklığı", "Yüksek rüzgar"], correctAnswer: 1, explanation: "Aşırı yük, kısa devre veya koruma hatası en yaygın black-out nedenleridir.", category: "Elektrik" },
    { id: 3, question: "İzolasyon direnci minimum ne olmalıdır?", options: ["100 kΩ", "500 kΩ", "1 MΩ", "10 MΩ"], correctAnswer: 2, explanation: "IEC 60092'ye göre minimum izolasyon direnci 1 MΩ'dur.", category: "Elektrik" },
    { id: 4, question: "Jeneratör senkronizasyonunda kontrol edilen parametreler nelerdir?", options: ["Yalnızca frekans", "Frekans, gerilim, faz sırası ve faz açısı", "Yalnızca gerilim ve akım", "Güç faktörü ve reaktif güç"], correctAnswer: 1, explanation: "Senkronizasyonda frekans, gerilim, faz sırası ve faz açısının eşleşmesi kontrol edilir.", category: "Elektrik" },
    { id: 5, question: "Shore connection'da faz sırası kontrolü neden önemlidir?", options: ["Enerji tasarrufu sağlar", "Motorların ters dönmesini önler", "Gerilim düşümünü engeller", "Jeneratör hasarını önler"], correctAnswer: 1, explanation: "Yanlış faz sırası motorların ters dönmesine, pompaların ters çalışmasına ve ekipman hasarına yol açar.", category: "Elektrik" },
  ],
  automation: [
    { id: 1, question: "PID kontrolcüde 'I' terimi ne yapar?", options: ["Ani tepki verir", "Kalıcı hatayı (offset) ortadan kaldırır", "Aşımı azaltır", "Gürültüyü filtreler"], correctAnswer: 1, explanation: "İntegral (I) terimi, zaman içinde biriken hatayı toplayarak kalıcı ofseti sıfırlar.", category: "Otomasyon" },
    { id: 2, question: "4-20 mA sinyalde 4 mA ne anlama gelir?", options: ["Hata durumu", "Ölçüm aralığının minimum değeri", "Sensör kapalı", "Kalibrasyon modu"], correctAnswer: 1, explanation: "4 mA = ölçüm aralığının alt sınırı (0%); 20 mA = üst sınır (%100). 0 mA kablo kopukluğunu gösterir.", category: "Otomasyon" },
    { id: 3, question: "UMS sertifikası neyi ifade eder?", options: ["Otomatik seyir sistemi", "Periyodsuz makine dairesi (Unattended Machinery Space)", "Acil durdurma sistemi", "Uzaktan kumanda yeterliliği"], correctAnswer: 1, explanation: "UMS: makine dairesinin belirli sürelerde insansız çalışmasına izin veren sertifikadır.", category: "Otomasyon" },
    { id: 4, question: "RTD (Pt100) sensörün 0°C'deki direnci kaç ohmdur?", options: ["10 Ω", "50 Ω", "100 Ω", "1000 Ω"], correctAnswer: 2, explanation: "Pt100: 0°C'de 100 Ω dirence sahip platin dirençli sıcaklık sensörüdür.", category: "Otomasyon" },
    { id: 5, question: "Dead band (ölü bant) ne anlama gelir?", options: ["Sensörün bozulduğu aralık", "Kontrol çıkışının değişmediği giriş aralığı", "Alarm eşiği", "Bakım aralığı"], correctAnswer: 1, explanation: "Dead band, kontrol sisteminin tepki vermediği giriş değişim aralığıdır; aşırı çalışmayı önler.", category: "Otomasyon" },
  ],
  "engine-room-ops": [
    { id: 1, question: "Ana makine devreye almadan önce turning gear ne kadar süre çalıştırılmalıdır?", options: ["5 dakika", "15 dakika", "En az 1 saat", "Gerek yoktur"], correctAnswer: 2, explanation: "Uzun durma sonrasında turning gear en az 1 saat çalıştırılarak yağ dağılımı ve mekanik kontrol yapılır.", category: "Operasyon" },
    { id: 2, question: "STCW'ye göre 24 saatte minimum dinlenme süresi ne kadardır?", options: ["6 saat", "8 saat", "10 saat", "12 saat"], correctAnswer: 2, explanation: "STCW Code A-VIII/1: 24 saatlik periyotta minimum 10 saat dinlenme zorunludur.", category: "Operasyon" },
    { id: 3, question: "Makine dairesinden köprüüstüne iletilmesi gereken en kritik bilgi nedir?", options: ["Yakıt miktarı", "Makine durumu ve hazırlık seviyesi", "Mürettebat sayısı", "Hava durumu"], correctAnswer: 1, explanation: "Makine durumu, hazırlık seviyesi ve mevcut kısıtlamalar köprüüstüne bildirilmelidir.", category: "Operasyon" },
    { id: 4, question: "Stand-by nedir?", options: ["Makine tam yükte çalışır", "Makine anında manevra yapabilecek hazırlıkta tutulur", "Makine kapatılır", "Yardımcı makineler durur"], correctAnswer: 1, explanation: "Stand-by: ana makine anında ileri-geri manevra yapabilecek durumda tutulur.", category: "Operasyon" },
    { id: 5, question: "Seyir jurnalinde hangi bilgiler kaydedilmelidir?", options: ["Yalnızca arızalar", "Makine çalışma parametreleri, yakıt tüketimi, vardiya olayları", "Yalnızca bakım kayıtları", "Mürettebat listesi"], correctAnswer: 1, explanation: "Seyir jurnalinde çalışma parametreleri, yakıt/yağ tüketimleri, arızalar ve vardiya olayları kaydedilir.", category: "Operasyon" },
  ],
  maintenance: [
    { id: 1, question: "MTBF'nin yüksek olması ne anlama gelir?", options: ["Sık arıza", "Yüksek güvenilirlik", "Yüksek bakım maliyeti", "Düşük verim"], correctAnswer: 1, explanation: "MTBF (Mean Time Between Failures) yüksek olduğunda ekipman daha güvenilirdir.", category: "Bakım" },
    { id: 2, question: "Klas special survey aralığı nedir?", options: ["Her yıl", "Her 2,5 yıl", "Her 5 yıl", "Her 10 yıl"], correctAnswer: 2, explanation: "Special survey (özel denetim) her 5 yılda bir gerçekleştirilir.", category: "Bakım" },
    { id: 3, question: "Yağ analizinde yüksek Fe (demir) ne gösterir?", options: ["İyi yağ kalitesi", "Anormal aşınma", "Düşük TBN", "Su kontaminasyonu"], correctAnswer: 1, explanation: "Yüksek Fe konsantrasyonu silindir gömleği, piston segmanı veya yatak aşınmasını işaret eder.", category: "Bakım" },
    { id: 4, question: "TBN nedir?", options: ["Toplam baz sayısı (asit nötralizasyon kapasitesi)", "Toplam bakım numarası", "Termal bozunma noktası", "Tork büyüklük numarası"], correctAnswer: 0, explanation: "TBN (Total Base Number): yağın asitleri nötralize etme kapasitesini gösterir. Düşük TBN = yağ değişimi gerekli.", category: "Bakım" },
    { id: 5, question: "Kestirimci bakımın amacı nedir?", options: ["Arıza olduktan sonra tamir etmek", "Belirli aralıklarla parça değiştirmek", "Ekipman durumunu izleyerek arıza öncesi müdahale etmek", "Bakım maliyetini sıfırlamak"], correctAnswer: 2, explanation: "Kestirimci bakım, titreşim analizi, yağ analizi vb. yöntemlerle arıza belirtilerini erken tespit eder.", category: "Bakım" },
  ],
  "engine-room-safety": [
    { id: 1, question: "Makine dairesinde CO₂ söndürme sistemini devreye almadan önce ne yapılmalıdır?", options: ["Ventilatörler çalıştırılır", "Tüm personel tahliye edilir ve ventilatörler durdurulur", "Yangın alarm sistemi kapatılır", "Ana makine tam yüke alınır"], correctAnswer: 1, explanation: "CO₂ deşarjı öncesi tüm personel tahliye edilmeli, ventilatörler ve damperler kapatılmalıdır.", category: "Güvenlik" },
    { id: 2, question: "Crankcase relief valve ne işe yarar?", options: ["Yağ basıncını düzenler", "Patlama basıncını dışarı atarak hasarı sınırlar", "Soğutma suyu akışını kontrol eder", "Yakıt girişini keser"], correctAnswer: 1, explanation: "Crankcase relief valve, patlama durumunda fazla basıncı güvenli şekilde dışarı atarak yapısal hasarı önler.", category: "Güvenlik" },
    { id: 3, question: "Makine dairesi kapalı alan giriş öncesi hangi ölçüm yapılmalıdır?", options: ["Yalnızca sıcaklık", "O₂, LEL ve toksik gaz ölçümü", "Yalnızca basınç", "Nem ölçümü"], correctAnswer: 1, explanation: "Kapalı alan girişi öncesi: O₂ (%21), LEL (<%1) ve toksik gaz (H₂S, CO vb.) ölçümü zorunludur.", category: "Güvenlik" },
    { id: 4, question: "Hot work permit ne zaman gereklidir?", options: ["Her zaman", "Kaynak, taşlama ve ısı üreten çalışmalarda", "Yalnızca yakıt tanklarında", "Yalnızca kıyıda"], correctAnswer: 1, explanation: "Kaynak, kesme, taşlama gibi ısı/kıvılcım üreten işlerde hot work permit zorunludur.", category: "Güvenlik" },
    { id: 5, question: "Quick-closing valve testleri ne sıklıkla yapılmalıdır?", options: ["Yılda bir", "Haftalık", "Haftada bir veya üretici tavsiyesine göre", "Yalnızca survey'de"], correctAnswer: 2, explanation: "Quick-closing valve testleri genellikle haftalık yapılır; sıklık üretici talimatı ve klas kurallarına bağlıdır.", category: "Güvenlik" },
  ],
  "environment-machine": [
    { id: 1, question: "OWS çıkış limiti kaç ppm'dir?", options: ["5 ppm", "10 ppm", "15 ppm", "25 ppm"], correctAnswer: 2, explanation: "MARPOL Annex I gereği OWS (Oily Water Separator) çıkış yağ konsantrasyonu ≤ 15 ppm olmalıdır.", category: "Çevre" },
    { id: 2, question: "Oil Record Book Part I neyi kapsar?", options: ["Yük operasyonları", "Makine bölümü yağlı atık kayıtları", "Çöp kayıtları", "Balast su kayıtları"], correctAnswer: 1, explanation: "ORB Part I: makine dairesi sintine, sludge, yakıt ve yağ transfer kayıtlarını kapsar.", category: "Çevre" },
    { id: 3, question: "MARPOL Annex IV atık su deşarj limiti nedir?", options: ["3 deniz milinden yakın yasak", "12 deniz milinden yakın arıtılmamış deşarj yasak", "Her ikisi de doğru", "Sınır yoktur"], correctAnswer: 2, explanation: "3 NM: arıtılmış bile yasak (bazı bölgelerde), 12 NM: arıtılmamış deşarj yasaktır.", category: "Çevre" },
    { id: 4, question: "IAPP sertifikası hangi gemilerde zorunludur?", options: ["Tüm gemilerde", "400 GT üzeri gemilerde", "Yalnızca tankerlerde", "Yalnızca yolcu gemilerinde"], correctAnswer: 1, explanation: "IAPP (International Air Pollution Prevention) sertifikası 400 GT üzeri uluslararası sefer yapan gemilerde zorunludur.", category: "Çevre" },
    { id: 5, question: "Gemi üzerinde yakma (incineration) nerede yasaktır?", options: ["Açık denizde", "Liman ve kıyıda", "Her yerde serbesttir", "Yalnızca ECA'da"], correctAnswer: 1, explanation: "Gemi üzerinde atık yakma (incineration) liman ve kıyıda yasaktır (MARPOL Annex VI).", category: "Çevre" },
  ],
  erm: [
    { id: 1, question: "ERM'de 'situational awareness' ne anlama gelir?", options: ["Ekipman farkındalığı", "Çevresel ve operasyonel koşulların sürekli değerlendirilmesi", "Güvenlik eğitimi", "Risk matrisi"], correctAnswer: 1, explanation: "Durumsal farkındalık: mevcut durumun, değişen koşulların ve potansiyel risklerin sürekli olarak değerlendirilmesidir.", category: "ERM" },
    { id: 2, question: "Swiss cheese model neyi açıklar?", options: ["Bakım planlamasını", "Kazaların birden fazla savunma katmanının aynı anda başarısız olmasıyla gerçekleştiğini", "Yağ filtre yapısını", "Emniyet valfi çalışma prensibini"], correctAnswer: 1, explanation: "Swiss cheese (James Reason) modeli: her savunma katmanında delikler vardır; hepsi aynı hizada olursa kaza gerçekleşir.", category: "ERM" },
    { id: 3, question: "MLC 2006 maksimum çalışma saatini ne olarak belirler?", options: ["12 saat/gün", "14 saat/24 saat veya 72 saat/7 gün", "16 saat/gün", "Sınırsız"], correctAnswer: 1, explanation: "MLC 2006: maksimum 14 saat/24 saatlik periyotta veya 72 saat/7 günlük periyotta çalışma.", category: "ERM" },
    { id: 4, question: "Near-miss nedir?", options: ["Gerçekleşmiş kaza", "Kazaya ramak kala olay", "Planlı bakım", "Risk matrisi sonucu"], correctAnswer: 1, explanation: "Near-miss: ciddi bir sonuç doğurabilecek ancak şans eseri hasarsız atlanan olaydır. Raporlanması zorunludur.", category: "ERM" },
    { id: 5, question: "Risk değerlendirmesinde hangi matris kullanılır?", options: ["3×3", "5×5 (olasılık × şiddet)", "10×10", "2×2"], correctAnswer: 1, explanation: "Standart risk matrisi 5×5 boyutundadır: olasılık (1–5) × şiddet (1–5) = risk seviyesi (1–25).", category: "ERM" },
  ],
  "energy-efficiency": [
    { id: 1, question: "CII derecelendirmesinde 'C' ne anlama gelir?", options: ["İyi", "Orta (kabul edilebilir minimum)", "Kötü", "Çok kötü"], correctAnswer: 1, explanation: "CII derecelendirmesi A (en iyi) – E (en kötü): C = orta/kabul edilebilir minimum. D ve E düzeltici eylem gerektirir.", category: "Enerji Verimliliği" },
    { id: 2, question: "EEXI hangi gemiler için zorunludur?", options: ["Yalnızca yeni gemiler", "2023 sonrası tüm mevcut gemiler (400 GT üzeri)", "Yalnızca tankerler", "Yalnızca konteyner gemileri"], correctAnswer: 1, explanation: "EEXI (Energy Efficiency Existing Ship Index) 2023'ten itibaren 400 GT üzeri tüm mevcut gemiler için zorunludur.", category: "Enerji Verimliliği" },
    { id: 3, question: "SEEMP ne içerir?", options: ["Yalnızca CII hesabı", "Enerji verimliliği yönetim planı, CII hesabı ve iyileştirme önlemleri", "Yalnızca yakıt raporu", "Emisyon ölçüm sonuçları"], correctAnswer: 1, explanation: "SEEMP (Ship Energy Efficiency Management Plan): enerji verimliliği politikası, CII izleme ve iyileştirme planını içerir.", category: "Enerji Verimliliği" },
    { id: 4, question: "Trim optimizasyonu yakıt tasarrufunu nasıl sağlar?", options: ["Motor gücünü artırır", "Gövde direncini azaltarak daha düşük güç gerektirir", "Yakıt kalitesini değiştirir", "Pervane verimini düşürür"], correctAnswer: 1, explanation: "Optimum trim, dalga direncini ve toplam gövde direncini minimize ederek daha düşük güçle aynı hızı sağlar.", category: "Enerji Verimliliği" },
    { id: 5, question: "WHR sistemi ne yapar?", options: ["Yakıtı önceden ısıtır", "Egzoz gazı atık ısısını elektrik veya buhar enerjisine dönüştürür", "Soğutma suyu sıcaklığını düşürür", "Balast suyunu arıtır"], correctAnswer: 1, explanation: "WHR (Waste Heat Recovery): egzoz gazı ve soğutma suyu atık ısısını kullanarak elektrik üretir veya buhar sağlar.", category: "Enerji Verimliliği" },
  ],
};

function getQuestions(slug: string): QuizQuestion[] {
  return topicQuestions[slug] || [];
}

function getRandomQuestions(slug: string, count: number, seed: number): QuizQuestion[] {
  const all = getQuestions(slug);
  if (count >= all.length) return all;
  const shuffled = [...all].sort(() => {
    seed = (seed * 16807) % 2147483647;
    return (seed / 2147483647) - 0.5;
  });
  return shuffled.slice(0, count);
}

export default function MachineTopicQuizPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const allQuestions = topicSlug ? getQuestions(topicSlug) : [];
  const maxCount = allQuestions.length;

  const [count, setCount] = useState<number>(Math.min(5, maxCount));
  const [seed, setSeed] = useState<number>(Date.now());

  const questions = useMemo(() => getRandomQuestions(topicSlug || "", count, seed), [topicSlug, count, seed]);

  if (!topic || maxCount === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Quiz bulunamadı</p>
      </div>
    );
  }

  const selectableCounts = Array.from(new Set([5, maxCount].filter(n => n <= maxCount))).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto p-4 space-y-4 max-w-4xl">
        <div className="flex items-center gap-2">
          <Link to="/lessons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Derslere Dön
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              {topic.title} Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Toplam soru: {maxCount}</span>
              <span>•</span>
              <span>Görüntülenen: {count}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectableCounts.map((c) => (
                <Button key={c} variant={count === c ? "default" : "outline"} size="sm" onClick={() => { setCount(c); setSeed(Date.now()); }}>
                  {c === maxCount ? `Tümü (${c})` : `${c} Soru`}
                </Button>
              ))}
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => setSeed(Date.now())}>
                <Shuffle className="h-4 w-4" /> Karıştır
              </Button>
            </div>

            <Quiz questions={questions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
