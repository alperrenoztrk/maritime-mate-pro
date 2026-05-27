import type { TopicDetailContent } from "@/data/navigationTopicContents";

export const communicationTopicContents: Record<string, TopicDetailContent> = {
  "GMDSS Mimarisi ve Deniz Alanları": {
    title: "GMDSS Mimarisi ve Deniz Alanları",
    introduction:
      "GMDSS (Global Maritime Distress and Safety System), denizde tehlike ve emniyet haberleşmesini küresel ölçekte standartlaştıran, 1999'dan bu yana tamamen yürürlükte olan uluslararası bir sistemdir. GMDSS; tehlike alarmı verme ve alma, arama-kurtarma koordinasyonu, seyir ve meteorolojik emniyet bilgisi yayınlama, gemiler arası ve gemi-kıyı arası genel haberleşme fonksiyonlarını kapsar. Sistemin temelinde deniz alanı sınıflandırması yatar ve bu sınıflandırma, gemide taşınacak haberleşme ekipmanını doğrudan belirler.",
    sections: [
      {
        title: "Deniz Alanları (Sea Area) Sınıflandırması",
        content:
          "GMDSS dört deniz alanı tanımlar ve her alan, kapsama sağlayan altyapı teknolojisine göre belirlenir. A1 alanı, en az bir VHF kıyı istasyonunun DSC (Digital Selective Calling) kapsaması altındaki bölgedir; tipik menzili 20–30 deniz milidir. A2 alanı, A1 dışında kalan ancak bir MF (Medium Frequency) kıyı istasyonunun DSC kapsaması altındaki bölgedir; menzili tipik olarak yaklaşık 100–150 deniz miline kadar uzanır. A3 alanı, A1 ve A2 dışında kalan ancak Inmarsat uydu kapsaması altındaki bölgedir; bu kapsama yaklaşık 70°K – 70°G enlemleri arasını içerir. A4 alanı, A1, A2 ve A3 dışında kalan bölgeleri kapsar; esas olarak kutup bölgeleridir ve burada HF (High Frequency) radyo haberleşmesi temel iletişim aracıdır.",
      },
      {
        title: "Ekipman Gereklilikleri",
        content:
          "Geminin seyir planına dahil olan deniz alanları, taşıması gereken minimum ekipman setini belirler. Tüm alanlarda ortak olan ekipmanlar: VHF-DSC telsiz, NAVTEX alıcısı, EPIRB (406 MHz), SART veya AIS-SART, ve taşınabilir VHF setleri (en az 2 veya 3 adet). A1 dışına çıkan gemiler ek olarak MF-DSC telsiz taşımalıdır. A2 dışına çıkan gemiler Inmarsat terminal veya MF/HF-DSC telsiz taşımalıdır. A3 dışına çıkan (A4) gemiler HF-DSC telsiz zorunluluğundadır. Ekipman kombinasyonu bayrak devletinin onayına, gemi tipine ve tonajına göre detaylandırılır. 300 GT ve üzeri uluslararası sefer yapan tüm ticari gemiler GMDSS uyumlu olmak zorundadır.",
      },
      {
        title: "Bakım ve Çalışırlık Gereklilikleri",
        content:
          "GMDSS uyumluluğu yalnızca ekipmanın gemide bulunmasıyla sağlanmaz; ekipmanın çalışır durumda olması, düzenli test ve bakımının yapılması, kayıtlarının tutulması zorunludur. SOLAS Bölüm IV, üç bakım yöntemi tanımlar: denizde bakım (kısıtlı), kıyıda bakım (servis sözleşmesi) ve yedek ekipman bulundurma. Çoğu gemi, kıyıda bakım + sınırlı yedek ekipman kombinasyonunu kullanır. Haftalık ve aylık test prosedürleri vardır: DSC test çağrıları, EPIRB dahili test, SART test, NAVTEX alım kontrolü, batarya durumu ve son kullanma tarihlerinin doğrulanması. Bu testlerin sonuçları radyo log defterine kaydedilir ve PSC (Port State Control) denetimlerinde ilk kontrol edilen alanlar arasındadır.",
      },
      {
        title: "GMDSS Operatör Yeterliliği",
        content:
          "GMDSS ekipmanını kullanacak personelin GOC (General Operator Certificate) veya ROC (Restricted Operator Certificate) belgesine sahip olması zorunludur. GOC, tüm GMDSS ekipmanlarını kullanma yetkisi verirken, ROC yalnızca A1 ve A2 alanlarında geçerlidir. Zabitlerin STCW yeterlilik belgelerinde GMDSS yetkinliği ayrıca belirtilir. Tehlike çağrısı prosedürlerinin, DSC kullanımının ve EPIRB aktivasyonunun düzenli tatbikatlarla pekiştirilmesi, gerçek acil durumda doğru ve hızlı tepki verilmesini sağlar.",
      },
    ],
    keyPoints: [
      "GMDSS dört deniz alanı (A1–A4) tanımlar; her alan farklı kapsama teknolojisine dayanır.",
      "Deniz alanı değiştikçe zorunlu ekipman seti de değişir.",
      "GMDSS uyumluluğu cihaz varlığının ötesinde çalışırlık, test ve kayıt disiplini gerektirir.",
      "GOC/ROC belgesi ve düzenli tatbikat, operasyonel hazırlığın ön koşuludur.",
    ],
  },

  "VHF-DSC Operasyonları": {
    title: "VHF-DSC Operasyonları",
    introduction:
      "VHF (Very High Frequency) telsiz, kıyıya yakın ve gemiler arası haberleşmenin temel aracıdır. DSC (Digital Selective Calling) teknolojisi, çağrının dijital olarak otomatik, hedefli ve izlenebilir şekilde yapılmasını sağlar. Doğru kanal disiplini ve standart prosedürlerin uygulanması, köprüüstü haberleşme kalitesini ve deniz emniyetini doğrudan etkiler.",
    sections: [
      {
        title: "DSC Çağrı Mekanizması",
        content:
          "DSC, belirli bir frekans üzerinden (VHF Ch.70) dijital çağrı yapılmasını sağlayan otomatik bir sistemdir. Her geminin benzersiz bir MMSI (Maritime Mobile Service Identity) numarası vardır ve DSC çağrısı bu numara üzerinden gerçekleşir. DSC çağrı tipleri: tehlike (distress), aciliyet (urgency), emniyet (safety) ve rutin (routine). Bir DSC çağrısında çağrı tipi, MMSI, mevki (GPS bağlantılıysa otomatik eklenir), çağrılan istasyon ve iletişimin sürdürüleceği çalışma kanalı bilgileri dijital olarak iletilir. Karşı tarafın DSC alıcısı bu bilgileri otomatik olarak çözer, ekranda gösterir ve alarm verir.",
      },
      {
        title: "VHF Kanalları ve Kullanım Disiplini",
        content:
          "Ch.16 (156.800 MHz), uluslararası tehlike, emniyet ve çağrı kanalıdır. GMDSS uyumlu gemiler Ch.16'yı sürekli dinlemekle yükümlüdür; ancak DSC devreye girdikten sonra Ch.70 otomatik izleme birincil alarm kanalı olmuştur. Ch.13, köprüüstü-köprüüstü emniyet haberleşmesi (manevra, dar su geçişi, çatışmadan kaçınma) için ayrılmıştır. Liman operasyonları için VTS kanalları (genellikle Ch.12, Ch.14 veya bölgesel atanmış kanallar) kullanılır. Gereksiz uzun konuşma, standart dışı ifadeler ve teyitsiz komutlar köprüüstü emniyetini düşürür. SMCP (Standard Marine Communication Phrases) kullanımı yanlış anlamayı önemli ölçüde azaltır.",
      },
      {
        title: "Tehlike Çağrısı Prosedürü",
        content:
          "VHF-DSC ile tehlike çağrısı yapılırken şu adımlar izlenir: (1) DSC cihazında tehlike (distress) butonu açılır (genellikle koruyucu kapak altında), (2) tehlike tipi seçilir (batma, yangın, terk-i gemi, çatışma vb.), (3) GPS bağlıysa mevki otomatik eklenir, değilse manuel girilir, (4) tehlike çağrı butonu basılı tutularak çağrı Ch.70 üzerinden gönderilir. Çağrı gönderildikten sonra, (5) Ch.16'ya geçilir ve sesli MAYDAY mesajı prosedüre uygun şekilde verilir: 'MAYDAY MAYDAY MAYDAY, This is [gemi adı] [çağrı işareti] [MMSI], MAYDAY [gemi adı], my position is [...], I am [tehlike türü], I require [yardım talebi], [kişi sayısı] persons on board, over.' Teyit alınana kadar mesaj tekrarlanır.",
      },
      {
        title: "Test ve Bakım",
        content:
          "VHF-DSC cihazının haftalık test çağrısı yapılması ve sonucunun radyo log defterine kaydedilmesi standart prosedürdür. Test çağrısı 'routine' önceliğinde yapılır ve yakındaki bir kıyı istasyonu veya başka bir gemiyle gerçekleştirilir. GPS bağlantısının çalıştığı, MMSI'nin doğru programlandığı ve antenin sağlam olduğu kontrol edilir. Yedek VHF setlerinin batarya durumu ve kanal ayarları düzenli olarak doğrulanır. DSC dışında, ses kalitesi (squelch ayarı, anten performansı) da operasyonel haberleşme kalitesini doğrudan etkiler.",
      },
    ],
    keyPoints: [
      "DSC, Ch.70 üzerinden dijital, otomatik ve hedefli çağrı yapılmasını sağlar.",
      "Ch.16 tehlike ve çağrı kanalıdır; Ch.13 manevra emniyeti içindir.",
      "Tehlike çağrısında DSC + sesli MAYDAY birlikte uygulanır.",
      "SMCP kullanımı yanlış anlama riskini önemli ölçüde azaltır.",
      "Haftalık test çağrısı ve GPS bağlantı kontrolü standart bakım prosedürüdür.",
    ],
  },

  "Tehlike, Aciliyet ve Emniyet Haberleşmesi": {
    title: "Tehlike, Aciliyet ve Emniyet Haberleşmesi",
    introduction:
      "Deniz haberleşmesinde üç öncelik seviyesi vardır: tehlike (distress – MAYDAY), aciliyet (urgency – PAN PAN) ve emniyet (safety – SECURITE). Bu öncelik sıralaması, iletişim kanallarının ve kaynakların doğru yönetilmesini sağlar. Yanlış öncelik seçimi, arama-kurtarma kaynaklarının gereksiz yere harekete geçirilmesine veya gerçek acil durumda yetersiz müdahaleye yol açabilir.",
    sections: [
      {
        title: "Tehlike Haberleşmesi (MAYDAY)",
        content:
          "MAYDAY, geminin veya gemideki kişilerin ciddi ve yakın tehlike altında olduğu ve acil yardım gerektiği durumlarda kullanılır. Batma, kontrolsüz yangın, terk-i gemi, çarpışma sonrası su alma gibi durumlar MAYDAY gerektirir. MAYDAY mesajı tüm diğer haberleşmenin önüne geçer; MAYDAY yayını yapıldığında, bu yayınla ilgisi olmayan tüm istasyonlar sessizliğe geçer (SEELONCE MAYDAY). MAYDAY mesaj formatı standart ve kısadır: gemi kimliği, mevki, tehlike türü, yardım talebi ve gemideki kişi sayısı bilgilerini içerir. MAYDAY RELAY, tehlikedeki gemi adına başka bir geminin veya kıyı istasyonunun alarm yayması durumunda kullanılır.",
      },
      {
        title: "Aciliyet Haberleşmesi (PAN PAN)",
        content:
          "PAN PAN, acil ancak hayati tehlike oluşturmayan durumlar için kullanılır. Tıbbi acil durum (personel yaralanması, hastalık), makine arızası nedeniyle manevra kaybı, seyir tehlikesi (sürüklenen konteyner, kayıp nesne) gibi durumlar PAN PAN kapsamındadır. PAN PAN mesajı MAYDAY'den sonra en yüksek önceliğe sahiptir ve normal trafiğin önüne geçer. Mesaj Ch.16 üzerinden yayınlanır ve gerekirse tekrarlanır. PAN PAN durumunun MAYDAY'e dönüşmesi mümkündür; bu durumda öncelik yükseltilir. Tıbbi danışma (MEDICO) talepleri de PAN PAN önceliğiyle yapılır.",
      },
      {
        title: "Emniyet Haberleşmesi (SECURITE)",
        content:
          "SECURITE, seyir emniyeti veya meteorolojik emniyet ile ilgili önemli duyurular için kullanılır. Fener arızası, sürüklenen mayın, yeni keşfedilen sığ alan, fırtına uyarısı, büyük enkaz gibi tüm denizcilerin bilmesi gereken bilgiler SECURITE mesajıyla duyurulur. SECURITE mesajı en düşük öncelikli emniyet mesajıdır ancak tüm istasyonlar dinlemek ve gerekiyorsa not almakla yükümlüdür. Kıyı istasyonları ve VTS merkezleri SECURITE mesajlarını düzenli olarak yayınlar.",
      },
      {
        title: "Öncelik Yönetimi ve Yaygın Hatalar",
        content:
          "Doğru öncelik seçimi operasyonel disiplinin göstergesidir. MAYDAY önceliğinin gereksiz kullanımı, SAR kaynaklarının boşa harcanmasına ve gerçek acil durumlarda güven kaybına yol açar. PAN PAN durumunun MAYDAY olarak bildirilmesi aşırı tepkiye, MAYDAY durumunun PAN PAN olarak bildirilmesi ise yetersiz müdahaleye neden olabilir. Her üç öncelik seviyesi için mesaj formatları ve prosedürler düzenli olarak tatbikat edilmelidir. Tatbikatlarda gerçekçi senaryolar kullanılması, stres altında doğru karar verme kapasitesini artırır. Radyo log defterinde tüm tehlike, aciliyet ve emniyet haberleşmeleri detaylı olarak kaydedilmelidir.",
      },
    ],
    keyPoints: [
      "MAYDAY: ciddi ve yakın tehlike; PAN PAN: acil ama hayati olmayan; SECURITE: seyir/meteorolojik emniyet.",
      "MAYDAY tüm trafiğin önüne geçer; tüm istasyonlar sessizliğe geçer (SEELONCE MAYDAY).",
      "Yanlış öncelik seçimi hem emniyet hem hukuki açıdan ciddi sonuçlar doğurabilir.",
      "Üç öncelik seviyesi için düzenli tatbikat yapılmalıdır.",
    ],
  },

  "NAVTEX, SafetyNET ve MSI": {
    title: "NAVTEX, SafetyNET ve MSI",
    introduction:
      "MSI (Maritime Safety Information), seyir ve meteorolojik emniyet bilgilerinin gemilere ulaştırılmasını sağlayan yayın sistemidir. NAVTEX ve SafetyNET, MSI'nin iki temel dağıtım kanalıdır. IMO tarafından zorunlu tutulan bu yayınlar; seyir uyarıları, meteorolojik tahminler, SAR bilgileri ve diğer acil duyuruları kapsar. Bu bilgilerin düzenli alınması, değerlendirilmesi ve kayıt altına alınması, geminin emniyetli seyir yapabilmesinin ön koşuludur.",
    sections: [
      {
        title: "NAVTEX Sistemi",
        content:
          "NAVTEX, 518 kHz (uluslararası NAVTEX) ve 490 kHz (ulusal NAVTEX) frekanslarında otomatik olarak metin mesajları ileten bir radyo teleks sistemidir. Menzili yaklaşık 200–400 deniz milidir; bu nedenle esas olarak kıyıya yakın bölgelerde (A1/A2 alanları) hizmet verir. NAVTEX mesajları dört karakterli bir tanımlayıcıyla kodlanır: ilk harf istasyonu, ikinci harf mesaj türünü (A: seyir uyarısı, B: meteoroloji, D: SAR bilgisi vb.), son iki rakam sıra numarasını gösterir. Alıcı, daha önce alınmış mesajları otomatik olarak filtreler ve tekrar yazdırmaz. Mesaj türleri seçilebilir ancak A (seyir uyarısı), B (meteoroloji), D (SAR) ve L (NAVAREA uyarıları) her zaman açık tutulmalıdır — bunlar devre dışı bırakılamaz.",
      },
      {
        title: "SafetyNET Sistemi",
        content:
          "SafetyNET, Inmarsat-C uydu terminali üzerinden çalışan EGC (Enhanced Group Call) sistemidir. NAVTEX kapsamı dışındaki açık deniz bölgelerinde (A3 alanı) MSI dağıtımını sağlar. SafetyNET, belirli coğrafi alanları (NAVAREA/METAREA), dikdörtgensel bölgeleri veya dairesel bölgeleri hedefleyerek yayın yapabilir; böylece gemiler yalnızca kendi seyir alanıyla ilgili mesajları alır. Kutup bölgelerinde (A4 alanı) Inmarsat kapsaması zayıf olduğundan, HF radyo ile MSI alımı veya alternatif uydu sistemleri (Iridium vb.) kullanılır. SafetyNET mesajları da seyir uyarıları, meteorolojik tahminler, SAR koordinasyon bilgileri ve diğer acil duyuruları içerir.",
      },
      {
        title: "MSI Değerlendirme ve Kayıt Prosedürü",
        content:
          "Alınan MSI mesajları, seyir zabiti tarafından derhal değerlendirilmelidir. Seyir uyarıları harita üzerine işlenir; rota etkisi varsa kaptan bilgilendirilir ve gerekirse plan revize edilir. Meteorolojik tahminler ve uyarılar, hava değerlendirmesine entegre edilir. SAR duyuruları, gözcü düzenlemesi ve CPA hesaplamasıyla desteklenir. Tüm alınan mesajlar kronolojik olarak dosyalanır ve radyo log defterine kayıt düşülür. PSC denetimleri, MSI alım kayıtlarını ve NAVTEX/SafetyNET cihazlarının çalışırlığını kontrol eder; yetersiz kayıt veya cihaz arızası eksiklik raporu (deficiency) olarak kaydedilir.",
      },
      {
        title: "NAVAREA ve METAREA Sistemi",
        content:
          "Dünya denizleri 21 NAVAREA bölgesine ayrılmıştır; her NAVAREA'da bir koordinatör ülke seyir uyarılarını yönetir. Benzer şekilde METAREA bölgeleri meteorolojik tahmin ve uyarı sorumluluğunu paylaştırır. Gemiler, seyir planındaki NAVAREA/METAREA bölgelerinin yayınlarını alacak şekilde NAVTEX ve SafetyNET cihazlarını programlamalıdır. Bölge değişikliklerinde cihaz ayarları güncellenir. In-force NAVAREA uyarılarının listesi düzenli olarak kontrol edilir; süresi geçmiş uyarılar kaldırılır, yeni uyarılar haritaya işlenir.",
      },
    ],
    keyPoints: [
      "NAVTEX 518/490 kHz'de otomatik metin yayını yapar; menzili 200–400 NM'dir.",
      "SafetyNET Inmarsat-C üzerinden açık deniz MSI dağıtımı sağlar.",
      "A, B, D ve L mesaj tipleri NAVTEX'te devre dışı bırakılamaz.",
      "Alınan MSI derhal değerlendirilmeli, haritaya işlenmeli ve kayıt altına alınmalıdır.",
      "NAVAREA/METAREA ayarları seyir planına göre güncellenmelidir.",
    ],
  },

  "EPIRB, SART ve Arama Kurtarma Entegrasyonu": {
    title: "EPIRB, SART ve Arama Kurtarma Entegrasyonu",
    introduction:
      "EPIRB (Emergency Position Indicating Radio Beacon) ve SART (Search and Rescue Transponder), geminin terk edilmesi veya ağır acil durumlarda yer tespiti ve kurtarma birimlerinin yönlendirilmesi için kritik öneme sahip cihazlardır. Bu cihazların doğru çalışması, gerçek bir acil durumda hayat kurtarma süresini doğrudan belirler. Test, bakım ve kayıt disiplini, cihazın fiziksel varlığı kadar önemlidir.",
    sections: [
      {
        title: "EPIRB Çalışma Prensibi",
        content:
          "406 MHz EPIRB, COSPAS-SARSAT uydu sistemi üzerinden tehlike sinyali iletir. Sinyal, geminin kimliğini (MMSI veya kayıt numarası), GPS pozisyonunu (GPS modüllü ise) ve tehlike durumunu içerir. COSPAS-SARSAT uyduları bu sinyali alarak ilgili MRCC'ye (Maritime Rescue Coordination Centre) ileten LUT (Local User Terminal) istasyonlarına aktarır. GPS entegreli EPIRB ile konum doğruluğu yaklaşık 100 m'ye iner; GPS'siz modellerde Doppler etkisiyle konum belirlenir, bu daha yavaş ve daha az doğrudur (2–5 km). EPIRB, ek olarak 121.5 MHz homing sinyali yayarak uçak ve helikopterlerin yakın mesafede yönlenmesini sağlar.",
      },
      {
        title: "EPIRB Montajı, Bakımı ve Kayıt",
        content:
          "EPIRB, float-free montaj aparatına (hydrostatic release unit – HRU) yerleştirilmiş olarak gemi üzerinde taşınır. HRU, gemi belirli bir derinliğe battığında (genellikle 1.5–4 m) otomatik olarak EPIRB'i serbest bırakır ve EPIRB yüzeye çıkarak otomatik olarak aktive olur. Manuel aktivasyon da mümkündür. HRU'nun son kullanma tarihi (genellikle 2 yıl), EPIRB bataryasının son kullanma tarihi (genellikle 5 yıl) ve yıllık servis tarihi düzenli olarak kontrol edilmelidir. EPIRB ulusal otoriteye kayıtlı olmalıdır; kayıt bilgilerinde gemi adı, MMSI, acil durum kişisi gibi bilgiler bulunur. Kayıt bilgileri değiştiğinde güncellenmesi zorunludur — güncel olmayan kayıt, SAR operasyonunu geciktirebilir.",
      },
      {
        title: "SART ve AIS-SART",
        content:
          "SART, 9 GHz radar frekansında çalışan bir transponderdir. Arama birimi radarının sinyalini alarak yanıt verir; arama biriminin radar ekranında seri 12 nokta halinde görünür, böylece kurtarma aracını hayatta kalanlara yönlendirir. Geleneksel radar SART'ın dezavantajı sınırlı menzildir (yaklaşık 5–8 NM, anten yüksekliğine bağlı). AIS-SART, AIS (Automatic Identification System) frekanslarında çalışan modern alternatiftir. AIS-SART sinyali, çevredeki tüm gemilerin AIS ekranında belirgin bir simgeyle görünür ve pozisyon bilgisi verir. Menzili radar SART'a göre daha iyidir. Her iki tip de SOLAS tarafından kabul edilir; yeni gemilerde AIS-SART tercih edilmektedir.",
      },
      {
        title: "Test Prosedürleri ve Tatbikat Entegrasyonu",
        content:
          "EPIRB dahili test butonu ile aylık test yapılır; bu test uydu sinyali göndermez, sadece cihazın iç devrelerini kontrol eder. SART/AIS-SART de test modunda çalıştırılarak fonksiyon kontrolü yapılır. Tüm test sonuçları tarih, saat ve sonuçla birlikte radyo log defterine kaydedilir. Terk-i gemi tatbikatlarında EPIRB ve SART cihazlarının can kurtarma aracına aktarım prosedürü pratik edilmelidir: cihazın yerinin bilinmesi, taşınması, aktivasyonu ve can salına yerleştirilmesi adımları tekrarlanır. Gerçek bir terk-i gemi durumunda, EPIRB'in float-free mekanizmasına güvenmenin yanı sıra, zaman ve koşullar izin veriyorsa EPIRB'in manuel olarak alınması ve can kurtarma aracına aktarılması tercih edilir.",
      },
    ],
    keyPoints: [
      "406 MHz EPIRB, COSPAS-SARSAT üzerinden küresel tehlike alarmı ve konum bilgisi iletir.",
      "HRU son kullanma tarihi (2 yıl) ve EPIRB bataryası (5 yıl) düzenli kontrol edilmelidir.",
      "EPIRB kayıt bilgileri güncel tutulmalıdır; güncel olmayan kayıt SAR'ı geciktirir.",
      "AIS-SART, geleneksel radar SART'a göre daha iyi menzil ve tespit kolaylığı sağlar.",
      "Aylık test ve tatbikat entegrasyonu operasyonel hazırlığın ön koşuludur.",
    ],
  },
  "SMCP - Standart Deniz Haberleşme İfadeleri": {
    title: "SMCP — Standart Deniz Haberleşme İfadeleri",
    introduction:
      "IMO Standard Marine Communication Phrases (SMCP), IMO A.918(22) kararıyla kabul edilen ve denizde güvenlikle ilgili sözlü haberleşmede dil engelini ve yanlış anlamayı en aza indirmek için standartlaştırılmış ifadeler bütünüdür. SMCP, STCW Sözleşmesi gereği seyir vardiyasından sorumlu zabitlerin İngilizce kullanım yeterliliğinin bir parçasıdır ve köprüüstü-köprüüstü, gemi-VTS, gemi içi ve SAR haberleşmesinde temel araçtır.",
    sections: [
      {
        title: "Mesaj İşaretleri (Message Markers)",
        content:
          "Yanlış anlamayı önlemek için, özellikle VTS haberleşmesinde, bir mesajın türü baştan belirtilir. SMCP sekiz mesaj işareti tanımlar. İşaret, mesajın amacını net biçimde ortaya koyar ve alıcının doğru tepki vermesini sağlar.",
        image: "/diagrams/communication/smcp-mesaj-isaretleri.svg",
        imageAlt: "SMCP sekiz mesaj işareti: Instruction, Advice, Warning, Information, Question, Answer, Request, Intention",
        bulletPoints: [
          "Instruction (Talimat): Alıcıya yönelik zorunlu/emredici bir gereklilik bildirir.",
          "Advice (Tavsiye): Alıcıya yönelik bir öneri/tavsiye bildirir.",
          "Warning (İkaz): Bir tehlike hakkında uyarır.",
          "Information (Bilgi): Yalnızca bilgi aktarır.",
          "Question (Soru): Mesajın soru niteliğinde olduğunu ve cevap beklendiğini gösterir.",
          "Answer (Cevap): Mesajın bir önceki soruya verilen yanıt olduğunu gösterir.",
          "Request (İstek): Bir şey (eylem, izin vb.) talep edildiğini bildirir.",
          "Intention (Niyet): Konuşanın yapmayı düşündüğü acil seyir hareketini bildirir.",
        ],
      },
      {
        title: "Hece Kodu, Sayılar ve Tekrar Protokolü",
        content:
          "SMCP, ITU/ICAO fonetik alfabesini (Alfa, Bravo, Charlie ...) harf kodlaması için kullanır. Sayılar tek tek okunur (ör. 150 = 'one-five-zero'); ondalık nokta 'decimal', mevki ve mesafe için 'kilometres', 'nautical miles' gibi birimler açıkça belirtilir. Önemli mesajların doğru alındığını teyit etmek için kapalı döngü haberleşme (closed-loop) uygulanır: 'Say again' (tekrar et), 'Read back' (okuyarak teyit et), 'I say again' (tekrar ediyorum), 'Stand by' (bekle), 'No more' (mesaj bitti). Bir mesajın yanlış anlaşılması riskinde 'Mistake' denir ve doğru bilgi tekrarlanır.",
        bulletPoints: [
          "Fonetik alfabe: Alfa, Bravo, Charlie, Delta ... Zulu (harf belirtmede).",
          "Sayılar rakam rakam okunur; ondalık için 'decimal'.",
          "'Say again' = tekrarla; 'Read back' = okuyarak teyit et.",
          "'Affirmative' = evet/onaylıyorum; 'Negative' = hayır.",
          "Tehlike/aciliyet/emniyet önceliği: MAYDAY, PAN-PAN, SÉCURITÉ.",
        ],
      },
      {
        title: "Kullanım Alanları",
        content:
          "SMCP; çatışmadan kaçınma manevralarında köprüüstü-köprüüstü görüşmede, VTS bölgelerinde mevki/niyet bildiriminde, kılavuz alma-bırakma, römorkaj, demirleme ve yanaşma operasyonlarında, gemi içi komutlarda (dümen ve makine komutları, mooring komutları) ve arama-kurtarma koordinasyonunda kullanılır. Standart dümen komutları örnekleri: 'Hard-a-starboard' (alabanda sancak), 'Midships' (ortala), 'Steady' / 'Steady as she goes' (rotada tut). Standart ifadelerin dışına çıkmak, özellikle çok uluslu mürettebatta, yanlış anlama ve emniyet riskini artırır.",
      },
    ],
    keyPoints: [
      "SMCP, IMO A.918(22) ile kabul edilmiştir ve STCW İngilizce yeterliliğinin parçasıdır.",
      "Sekiz mesaj işareti: Instruction, Advice, Warning, Information, Question, Answer, Request, Intention.",
      "Sayılar rakam rakam, harfler fonetik alfabeyle okunur.",
      "Kapalı döngü teyit (read back / say again) yanlış anlamayı önler.",
    ],
  },
};
