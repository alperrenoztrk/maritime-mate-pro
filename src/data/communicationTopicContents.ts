import type { TopicDetailContent } from "@/data/navigationTopicContents";

// Ders görselleri — depoda hâlihazırda bulunan varlıklar.
import epirbSartImage from "@/assets/lessons/epirb-sart.jpg";
import signalFlagsImage from "@/assets/lessons/signal-flags-chart.png";
import dscPanelImage from "@/assets/bridge/dsc-panel.jpg";
import vhfRadioImage from "@/assets/bridge/vhf-radio.jpg";
import navtexImage from "@/assets/bridge/navtex-receiver.jpg";
import inmarsatImage from "@/assets/bridge/inmarsat-terminal.jpg";
import aisDisplayImage from "@/assets/bridge/ais-display.jpg";
import dscDistressImage from "@/assets/navigation/dsc-distress.svg";
import bridgeOverviewImage from "@/assets/bridge/ship-bridge-overview.jpg";

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
        image: dscPanelImage,
        imageAlt: "GMDSS console carrying the required radio installations",
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
        image: vhfRadioImage,
        imageAlt: "VHF radiotelephone with DSC controller",
      },
      {
        title: "VHF Kanalları ve Kullanım Disiplini",
        content:
          "Ch.16 (156.800 MHz), uluslararası tehlike, emniyet ve çağrı kanalıdır. GMDSS uyumlu gemiler Ch.16'yı sürekli dinlemekle yükümlüdür; ancak DSC devreye girdikten sonra Ch.70 otomatik izleme birincil alarm kanalı olmuştur. Ch.13, köprüüstü-köprüüstü emniyet haberleşmesi (manevra, dar su geçişi, çatışmadan kaçınma) için ayrılmıştır. Liman operasyonları için VTS kanalları (genellikle Ch.12, Ch.14 veya bölgesel atanmış kanallar) kullanılır. Gereksiz uzun konuşma, standart dışı ifadeler ve teyitsiz komutlar köprüüstü emniyetini düşürür. SMCP (Standard Marine Communication Phrases) kullanımı yanlış anlamayı önemli ölçüde azaltır.",
      },
      {
        title: "Kanal Tahsis Tablosu (ITU Appendix 18)",
        content:
          "Kanal numaraları rastgele değildir; ITU Radyo Tüzüğü Ek 18 ile tahsis edilmiştir ve bir kanalın amacı dışında kullanılması ihlaldir. Aşağıdaki kanallar dünya genelinde aynı amaca ayrılmıştır; bunların dışındaki kanallar bölgesel olarak liman idaresince atanır ve seyir planı hazırlanırken ilgili Liste (ALRS Vol.6) ya da liman rehberinden okunur.",
        bulletPoints: [
          "Ch.06 — Gemi-gemi arama kurtarma (SAR) haberleşmesi; uçak-gemi SAR koordinasyonunda da kullanılır.",
          "Ch.09 — İkincil çağrı kanalı; bazı bölgelerde tekne trafiği ve kılavuz haberleşmesi.",
          "Ch.10 — Gemi-gemi; kirlilik olaylarında müdahale koordinasyonu için sık kullanılır.",
          "Ch.13 — KÖPRÜÜSTÜ-KÖPRÜÜSTÜ emniyet haberleşmesi. Çatışmadan kaçınma görüşmesinin kanalıdır.",
          "Ch.15 ve Ch.17 — Gemi içi haberleşme; azami çıkış gücü 1 W ile sınırlıdır.",
          "Ch.16 (156.800 MHz) — Uluslararası tehlike, aciliyet, emniyet ve çağrı kanalı; sürekli dinlenir.",
          "Ch.67 — Bazı bölgelerde ek emniyet/SAR kanalı (ör. Birleşik Krallık).",
          "Ch.70 (156.525 MHz) — YALNIZCA DSC. Bu kanalda sesli konuşma yapılmaz.",
          "Ch.12, Ch.14 — Tipik liman operasyonu ve VTS kanalları (bölgesel atama).",
          "Ch.72, Ch.77 — Gemi-gemi genel çalışma kanalları (kamu yazışması yok).",
          "AIS 1 (161.975 MHz / Ch.87B) ve AIS 2 (162.025 MHz / Ch.88B) — AIS veri yayını; sesli kullanılmaz.",
        ],
      },
      {
        title: "Tehlike Çağrısı Prosedürü",
        content:
          "VHF-DSC ile tehlike çağrısı yapılırken şu adımlar izlenir: (1) DSC cihazında tehlike (distress) butonu açılır (genellikle koruyucu kapak altında), (2) tehlike tipi seçilir (batma, yangın, terk-i gemi, çatışma vb.), (3) GPS bağlıysa mevki otomatik eklenir, değilse manuel girilir, (4) tehlike çağrı butonu basılı tutularak çağrı Ch.70 üzerinden gönderilir. Çağrı gönderildikten sonra, (5) Ch.16'ya geçilir ve sesli MAYDAY mesajı prosedüre uygun şekilde verilir: 'MAYDAY MAYDAY MAYDAY, This is [gemi adı] [çağrı işareti] [MMSI], MAYDAY [gemi adı], my position is [...], I am [tehlike türü], I require [yardım talebi], [kişi sayısı] persons on board, over.' Teyit alınana kadar mesaj tekrarlanır.",
      },
      {
        title: "Aciliyet, Emniyet Çağrıları ve Tehlike Teyidi/Aktarımı",
        content:
          "Tehlike dışındaki öncelikler de DSC ve sesle yürütülür. Aciliyet (urgency) çağrısı, gemi veya bir kişinin güvenliğiyle ilgili ancak ani-ölümcül olmayan durumlarda kullanılır ve seste 'PAN-PAN' üç kez tekrarlanır (ör. tıbbi yardım, makine arızası, sürüklenme). Emniyet (safety) çağrısı seyir veya meteorolojik uyarılar içindir ve seste 'SÉCURITÉ' üç kez tekrarlanır. Her ikisi de DSC ile ilgili öncelik seçilerek duyurulur, ardından bir çalışma kanalında sesli mesaj verilir.\n\nBir DSC tehlike alarmı ALAN gemi, alarmı hemen DSC ile teyit ETMEZ (aksi hâlde alarmın yayılması durur); Ch.16'yı dinler. Bir kıyı istasyonu teyidi DSC ile yapar. Yaklaşık 5 dakika içinde hiçbir kıyı istasyonu teyit etmemişse ve gemi yardım edebilecek durumdaysa, teyidi DSC ile değil Ch.16'da TELSİZ TELEFONLA verir ve MRCC'ye bildirir. Başka bir geminin tehlikesine tanık olunup o gemi yayın yapamıyorsa, onun adına DSC 'tehlike aktarımı' (distress relay) gönderilebilir.\n\nYanlışlıkla gönderilen tehlike alarmı DERHÂL iptal edilmelidir: cihaz kapatılmaz; Ch.16'da sesli olarak yanlış alarm iptali yapılır (gemi adı, çağrı işareti, MMSI ve 'cancel my distress alert' bildirimi).",
        bulletPoints: [
          "Aciliyet: 'PAN-PAN' ×3 (gemi/kişi güvenliği, ölümcül-acil değil).",
          "Emniyet: 'SÉCURITÉ' ×3 (seyir/meteoroloji uyarısı).",
          "DSC tehlike alarmını gemi hemen DSC ile teyit etmez; Ch.16 dinlenir.",
          "Kıyı istasyonu DSC ile teyit eder; ~5 dk sonra gemi Ch.16'da telsizle teyit edebilir.",
          "Yanlış alarm Ch.16'da sesli olarak derhâl iptal edilir.",
        ],
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
        image: dscDistressImage,
        imageAlt: "Structure of a DSC distress alert and its follow-up call",
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
        image: navtexImage,
        imageAlt: "NAVTEX receiver printing maritime safety information",
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
        image: epirbSartImage,
        imageAlt: "Emergency beacons used to raise and home in on a distress alert",
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
        imageAlt: "SMCP message markers and their use",
        image: "/diagrams/communication/smcp-mesaj-isaretleri.svg",
        imageAlt: "The eight SMCP message markers: Instruction, Advice, Warning, Information, Question, Answer, Request, Intention",
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
          "SMCP; çatışmadan kaçınma manevralarında köprüüstü-köprüüstü görüşmede, VTS bölgelerinde mevki/niyet bildiriminde, kılavuz alma-bırakma, römorkaj, demirleme ve yanaşma operasyonlarında, gemi içi komutlarda (dümen ve makine komutları, mooring komutları) ve arama-kurtarma koordinasyonunda kullanılır. Standart ifadelerin dışına çıkmak, özellikle çok uluslu mürettebatta, yanlış anlama ve emniyet riskini artırır.",
      },
      {
        title: "Bölüm A1 — Tehlike, Aciliyet ve Emniyet Trafiği",
        content:
          "SMCP Bölüm A1, tehlike haberleşmesinin sabit kalıplarını verir. Bu ifadeler doğaçlanmaz; sıraları ve sözcükleri aynen kullanılır. Öncelik sırası MAYDAY (tehlike) > PAN-PAN (aciliyet) > SÉCURITÉ (emniyet) şeklindedir ve her biri üç kez tekrarlanarak başlatılır.",
        bulletPoints: [
          "MAYDAY MAYDAY MAYDAY — THIS IS [gemi adı ×3] [çağrı işareti] [MMSI].",
          "MY POSITION IS [enlem/boylam veya bir noktaya kerteriz ve mesafe].",
          "I AM ON FIRE / I AM SINKING / I AM FLOODING / I AM AGROUND / I AM IN COLLISION.",
          "I REQUIRE [assistance / medical assistance / tug / escort / helicopter].",
          "[sayı] PERSONS ON BOARD. — I AM ABANDONING VESSEL. — OVER.",
          "Tehlike teyidi (kıyı/gemi): MAYDAY [tehlikedeki gemi] — THIS IS [teyit eden] — RECEIVED MAYDAY.",
          "Tehlike aktarımı: MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY — THIS IS [aktaran].",
          "PAN-PAN ×3: hayati tehlike YOK ama gemi/kişi hakkında acil bir mesaj var.",
          "SÉCURITÉ ×3: seyir veya meteorolojik emniyet uyarısı geliyor.",
          "SEELONCE MAYDAY: telsiz sessizliğini yalnız tehlikedeki gemi veya RCC uygular.",
          "SEELONCE FEENEE: tehlike trafiği bitti, normal çalışmaya dönülebilir.",
          "PRU-DONCE: tehlike sürüyor ama sınırlı normal trafiğe izin veriliyor.",
        ],
      },
      {
        title: "Bölüm B — Standart Dümen Komutları",
        content:
          "Dümen komutları SMCP'nin en sık kullanılan bölümüdür. Komut verilir, dümenci komutu AYNEN tekrarlar (repeat back), manevra tamamlandığında 'yerine getirildi' bildirir. Kaptan/pilot ile dümenci arasındaki bu kapalı döngü, yanlış tarafa dümen kırılmasını önleyen tek mekanizmadır.",
        bulletPoints: [
          "Midships — dümeni ortala (0°).",
          "Port / Starboard five — iskeleye/sancağa 5 derece.",
          "Port / Starboard ten — fifteen — twenty — twenty-five: ilgili derece kadar.",
          "Hard-a-port / Hard-a-starboard — alabanda iskele/sancak.",
          "Ease to five / ten / fifteen / twenty — dümen açısını belirtilen dereceye azalt.",
          "Steady — geminin dönüşünü durdur, mevcut baştaki rotayı tut.",
          "Steady as she goes — o anki pruva rotasında sabit kal (dümenci rotayı okur).",
          "Keep buoy / mark / beacon on port side — işareti iskelede tut.",
          "Report if she does not answer the wheel — dümen cevap vermezse bildir.",
          "Finished with the wheel, no more steering — dümen görevi bitti.",
        ],
      },
      {
        title: "Bölüm B — Standart Makine Komutları ve Demirleme/Bağlama",
        content:
          "Makine ve güverte komutları da standarttır. Makine komutlarında 'Full/Half/Slow/Dead slow' kademeleri ileri (ahead) ve tornistan (astern) için ayrı ayrı kullanılır. Demirleme ve bağlama komutlarında halatın adı (headline, breast line, spring) ve eylemi (slack away, heave away, hold on, make fast) birlikte söylenir.",
        bulletPoints: [
          "Makine: (Full / Half / Slow / Dead slow) ahead — (…) astern — Stop engine(s).",
          "Emergency full ahead / astern — acil tam yol.",
          "Stand by engine — makine manevraya hazır. — Finished with engines.",
          "Demir: Walk out the anchor — Let go port/starboard anchor — Slack away the cable.",
          "How is the cable leading? — Cevap: 'Cable is leading ahead / astern / up and down.'",
          "Is the anchor holding? / Is she brought up? — demirin tuttuğunu doğrulama.",
          "Bağlama: Send out the headline / stern line / breast line / spring.",
          "Heave away — vira et. — Slack away / Walk back — laçka et. — Hold on — tut.",
          "Make fast fore and aft — baş ve kıçta halatları vola et.",
          "Single up to two lines and one spring — halatları teke düşür (kalkışa hazırlık).",
        ],
      },
      {
        title: "VTS Raporlama ve Köprüüstü-Köprüüstü Görüşme",
        content:
          "VTS bölgelerinde rapor formatı önceden bellidir; telsizi açıp doğaçlama konuşmak yerine bu sıra izlenir. Köprüüstü-köprüüstü görüşmede ise en kritik kural, VHF'in bir çatışmadan kaçınma aracı olarak COLREG'in yerine geçmemesidir: telsizle 'anlaşılan' bir manevra, Kural 8'in gerektirdiği erken, belirgin ve geniş açılı hareketin yerini tutmaz.",
        bulletPoints: [
          "VTS çağrısı: [VTS adı] — THIS IS [gemi adı] [çağrı işareti] — INFORMATION: my position is …",
          "Rapor içeriği: gemi adı/çağrı işareti, mevki, rota, hız, varış/kalkış limanı, draft, tehlikeli yük, kılavuz durumu.",
          "INTENTION: I will alter course to starboard — niyet bildirimi.",
          "QUESTION: What are your intentions? — ADVICE: Advise you to pass astern of me.",
          "WARNING: You are running into danger — INSTRUCTION: Do not overtake in the fairway.",
          "Kimlik doğrulaması gemi ADIYLA yapılır; 'the ship on my port bow' gibi ifadeler yanlış gemiyle anlaşmaya yol açar.",
          "Telsizle yapılan anlaşma COLREG yükümlülüğünü ORTADAN KALDIRMAZ.",
        ],
      },
    ],
    keyPoints: [
      "SMCP, IMO A.918(22) ile kabul edilmiştir ve STCW İngilizce yeterliliğinin parçasıdır.",
      "Sekiz mesaj işareti: Instruction, Advice, Warning, Information, Question, Answer, Request, Intention.",
      "Öncelik: MAYDAY > PAN-PAN > SÉCURITÉ; her biri üç kez tekrarlanır.",
      "Dümen komutu verilir → dümenci aynen tekrarlar → yerine getirildiğini bildirir.",
      "'Steady' dönüşü durdurmak, 'Steady as she goes' mevcut rotada kalmaktır — aynı şey değildir.",
      "Sayılar rakam rakam, harfler fonetik alfabeyle okunur.",
      "VHF ile yapılan anlaşma COLREG yükümlülüğünün yerine geçmez.",
    ],
  },

  "Fonetik Alfabe ve Telsiz Konuşma Disiplini": {
    title: "Fonetik Alfabe ve Telsiz Konuşma Disiplini",
    introduction:
      "Telsiz haberleşmesinde harf ve sayıların yanlış anlaşılması ciddi emniyet sonuçları doğurabilir. ITU/IMO tarafından standartlaştırılan fonetik alfabe (NATO alfabesi) ve procedure word'ler (prosedür sözcükleri), gürültülü ve parazitli ortamda mesajın doğru iletilmesini sağlar.",
    sections: [
      {
        title: "Uluslararası Fonetik Alfabe",
        content:
          "Harfler tek tek söylenmek yerine standart kelimelerle kodlanır: A-Alfa, B-Bravo, C-Charlie, D-Delta, E-Echo, F-Foxtrot, G-Golf, H-Hotel, I-India, J-Juliett, K-Kilo, L-Lima, M-Mike, N-November, O-Oscar, P-Papa, Q-Quebec, R-Romeo, S-Sierra, T-Tango, U-Uniform, V-Victor, W-Whiskey, X-X-ray, Y-Yankee, Z-Zulu. Bu alfabe çağrı işaretleri (call sign), gemi adları ve kritik kelimelerin hecelenmesinde kullanılır. Örnek: 'TCA' çağrı işareti 'Tango Charlie Alfa' olarak okunur.",
        image: signalFlagsImage,
        imageAlt: "International Code of Signals flags with their phonetic alphabet names",
      },
      {
        title: "Sayıların ve Ondalıkların Okunması",
        content:
          "Sayılar rakam rakam okunur: 'Channel 16' → 'Channel one six'. Ondalık ayraç 'decimal' (veya bazı uygulamalarda 'point') olarak söylenir: 156.8 MHz → 'one five six decimal eight'. Yanlış anlamayı önlemek için kritik sayılar tekrar ettirilir (read back). Bu disiplin özellikle frekans/kanal, mevki (enlem-boylam), rota ve hız bilgilerinde hayati önemdedir.",
      },
      {
        title: "Procedure Word'ler (Prosedür Sözcükleri)",
        content:
          "Standart prosedür sözcükleri konuşma trafiğini kısaltır ve netleştirir: OVER (mesajım bitti, cevap bekliyorum), OUT (haberleşme sona erdi, cevap beklemiyorum), ROGER (mesajınızı aldım), AFFIRMATIVE/NEGATIVE (evet/hayır), SAY AGAIN (tekrarlayın), I SAY AGAIN (tekrar ediyorum), READ BACK (geri okuyun), STANDBY (bekleyin), WILCO (anladım ve uygulayacağım), CORRECTION (düzeltme). 'OVER' ve 'OUT' asla birlikte kullanılmaz.",
        bulletPoints: [
          "OVER: mesaj bitti, cevap bekleniyor.",
          "OUT: haberleşme bitti, cevap beklenmiyor (OVER ile birlikte kullanılmaz).",
          "SAY AGAIN: tekrar isteme; 'repeat' kullanılmaz (askeri çağrışım).",
          "READ BACK / I READ BACK: kritik mesajın doğruluğunu teyit eder.",
        ],
      },
      {
        title: "Kanal ve Konuşma Disiplini",
        content:
          "Telsizde gereksiz uzun konuşma, kanal işgali ve standart dışı ifadeler emniyeti düşürür. Konuşmadan önce kanal dinlenir (başka trafik var mı?), basılı tut-konuş (PTT) düğmesine basıldıktan kısa bir an sonra konuşulur, cümleler kısa ve standart tutulur. Köprüüstü-köprüüstü manevra haberleşmesinde SMCP ifadeleri ve kapalı döngü teyit (closed-loop) kullanılır. Mesaj formatı genellikle: çağrılan istasyon adı + 'this is' + kendi adı + mesaj + OVER.",
      },
    ],
    keyPoints: [
      "NATO fonetik alfabesi harf karışıklığını önler (Alfa, Bravo, Charlie...).",
      "Sayılar rakam rakam, ondalık 'decimal' olarak okunur.",
      "OVER ve OUT birlikte kullanılmaz; 'say again' tercih edilir.",
      "Kritik bilgiler read back ile teyit edilir.",
    ],
  },

  "Telsiz Nöbeti ve Radyo Log Defteri": {
    title: "Telsiz Nöbeti ve Radyo Log Defteri",
    introduction:
      "GMDSS gemileri belirli kanal ve frekansları sürekli dinlemek (nöbet/watch) ve haberleşme olaylarını radyo log defterine kaydetmekle yükümlüdür. Doğru nöbet ve kayıt disiplini, tehlike çağrılarının kaçırılmamasını ve denetimlerde uyumun kanıtlanmasını sağlar.",
    sections: [
      {
        title: "Sürekli Nöbet (Continuous Watch) Yükümlülükleri",
        content:
          "SOLAS Bölüm IV gereği gemi, seyir halindeyken şu nöbetleri sürekli tutar: VHF Ch.70 DSC otomatik izleme; sefer alanına göre MF Ch.2187.5 kHz DSC ve/veya HF DSC tehlike frekansları; NAVTEX (518 kHz) otomatik alım; ve uygun olduğunda Inmarsat MSI alımı. Ch.16 sesli dinleme, DSC'ye geçişten sonra da pek çok gemide sürdürülür. Nöbet, ekipmanın açık ve doğru ayarlı tutulmasıyla otomatik olarak sağlanır; operatör alarmlara tepki vermekle yükümlüdür.",
        image: vhfRadioImage,
        imageAlt: "Radio installation on which the listening watch is kept",
      },
      {
        title: "Radyo Log Defteri (Radio Log)",
        content:
          "Tüm tehlike, aciliyet ve emniyet haberleşmeleri; cihaz testleri (DSC test çağrısı, EPIRB/SART testi, batarya kontrolü); ve önemli olaylar tarih-saat (UTC) ile radyo log defterine kaydedilir. Kayıtlar, kimin nöbette olduğunu ve hangi işlemin yapıldığını gösterir. Yanlış alarm iptalleri de kayda geçer. Log defteri PSC denetiminde ilk kontrol edilen belgelerdendir.",
        bulletPoints: [
          "Tehlike/aciliyet/emniyet trafiği UTC ile kaydedilir.",
          "Haftalık DSC test çağrısı ve EPIRB/SART testleri loglanır.",
          "Batarya ve ekipman durumu kontrolleri kayıt altına alınır.",
          "Yanlış alarm ve iptali mutlaka kaydedilir.",
        ],
      },
      {
        title: "Güç Kaynağı ve Yedekleme",
        content:
          "GMDSS ekipmanı ana güç, acil güç (jeneratör) ve yedek güç kaynağı (akü/batarya) ile beslenir. Yedek akü, ana ve acil güç kesildiğinde GMDSS ekipmanını belirli bir süre (genellikle 1 veya 6 saat) çalıştıracak kapasitede olmalıdır. Akü durumu düzenli test edilir ve sonuçlar loglanır. Antenler, sigortalar ve bağlantılar fiziksel olarak kontrol edilir.",
      },
      {
        title: "Operatör Sorumluluğu",
        content:
          "Atanmış bir radyo haberleşme sorumlusu (genellikle bir güverte zabiti), tehlike anında haberleşmeyi yürütmekle görevlidir. Nöbet sırasında DSC alarmı geldiğinde operatör derhal değerlendirir, gerekiyorsa Ch.16'ya geçer ve prosedürü uygular. Personelin GOC/ROC belgesi ve düzenli tatbikat bu sorumluluğun ön koşuludur.",
      },
    ],
    keyPoints: [
      "VHF Ch.70 DSC, MF/HF DSC ve NAVTEX sürekli nöbet tutulur (SOLAS IV).",
      "Tüm tehlike/test/önemli olaylar UTC ile radyo log'a kaydedilir.",
      "Yedek akü ana/acil güç kesilince GMDSS'i belirli süre besler.",
      "Radyo log PSC denetiminde ilk kontrol edilen belgelerdendir.",
    ],
  },

  "Inmarsat ve Uydu Haberleşme Sistemleri": {
    title: "Inmarsat ve Uydu Haberleşme Sistemleri",
    introduction:
      "Kıyıdan uzakta (A3 deniz alanı) gemiler, tehlike ve genel haberleşme için uydu sistemlerine dayanır. Inmarsat ve uydu temelli MSI yayını, açık deniz seyrinin haberleşme omurgasını oluşturur. Son yıllarda GMDSS uydu sağlayıcılarına Iridium da eklenmiştir.",
    sections: [
      {
        title: "Inmarsat Sistemi ve Kapsama",
        content:
          "Inmarsat, jeostatik (yer-sabit) uydularla yaklaşık 70°K – 70°G enlemleri arasını (A3 alanı) kapsar; kutuplar (A4) kapsama dışıdır. Jeostatik yörünge nedeniyle çok yüksek enlemlerde uydu ufka çok alçaldığından bağlantı zorlaşır. GMDSS kapsamında Inmarsat-C, tehlike alarmı, MSI alımı ve mesajlaşma için tanınan bir hizmettir.",
        image: inmarsatImage,
        imageAlt: "Inmarsat satellite terminal antenna radomes",
      },
      {
        title: "Inmarsat-C ve Fleet/FleetBroadband",
        content:
          "Inmarsat-C, düşük hızlı ama güvenilir bir store-and-forward (depola-ilet) mesaj sistemidir; metin tabanlı tehlike alarmı, e-posta, telex benzeri mesajlaşma ve EGC (Enhanced Group Call) ile MSI alımı sağlar. Küçük omnidirectional (her yöne) anten kullanır; gemi yalpalasa da bağlantı korunur. Fleet ve FleetBroadband ise daha yüksek bant genişliği sunan, ses + IP veri (internet) hizmetleri sağlayan sistemlerdir; operasyonel ve idari haberleşme, hava/rota verisi indirme için kullanılır.",
        bulletPoints: [
          "Inmarsat-C: düşük hızlı, store-and-forward, tehlike + MSI (EGC) + mesaj.",
          "FleetBroadband: yüksek hızlı ses/IP veri, operasyonel haberleşme.",
          "Inmarsat-C anteni omnidirectional; stabilize anten gerektirmez.",
        ],
      },
      {
        title: "EGC: SafetyNET ve FleetNET",
        content:
          "EGC (Enhanced Group Call), Inmarsat-C üzerinden grup çağrısı yayınıdır. SafetyNET, MSI (seyir/meteoroloji uyarıları, SAR bilgisi) yayınında kullanılan uluslararası hizmettir ve NAVTEX kapsamı dışındaki açık deniz alanlarında MSI'nin temel kaynağıdır. FleetNET ise ticari/idari grup mesajları (filo duyuruları) içindir. SafetyNET mesajları coğrafi alana (NAVAREA/METAREA) göre adreslenebilir.",
      },
      {
        title: "Iridium ve GMDSS'e Eklenmesi",
        content:
          "Iridium, alçak yörüngeli (LEO) uydu takımyıldızıyla KUTUPLAR DAHİL tüm dünyayı kapsar; bu nedenle A4 alanında da hizmet verebilir. IMO, Iridium'u GMDSS uydu hizmet sağlayıcısı olarak tanımıştır (GMDSS hizmeti onaylı terminallerle sunulur). Bu, özellikle kutup sularında (Polar Code) haberleşme kapsamasını genişletir.",
      },
    ],
    keyPoints: [
      "Inmarsat jeostatik uydularla A3 (~70°K-70°G) kapsar; kutuplar (A4) hariç.",
      "Inmarsat-C tehlike + MSI (EGC/SafetyNET) + mesaj; FleetBroadband yüksek hızlı veri.",
      "SafetyNET açık denizde MSI'nin temel kaynağıdır (NAVTEX dışı alanlar).",
      "Iridium LEO takımyıldızı kutuplar dahil küresel kapsama sağlar (A4).",
    ],
  },

  "Görsel İşaretleşme: Bayraklar ve Mors Lambası": {
    title: "Görsel İşaretleşme: Bayraklar ve Mors Lambası",
    introduction:
      "Telsiz haberleşmesinin yanı sıra denizciler, telsiz sessizliği veya arıza durumunda da iletişim kurabilmek için görsel işaretleşme yöntemlerini bilmek zorundadır. Uluslararası İşaret Kodu (International Code of Signals) bayraklar, mors lambası ve ses ile mesaj iletimini standartlaştırır.",
    sections: [
      {
        title: "Uluslararası İşaret Kodu (ICS)",
        content:
          "International Code of Signals (ICS), dil engelini aşmak için tasarlanmış, özellikle emniyet ve seyir konularını kapsayan standart bir koddur. 26 harf bayrağı, 10 rakam flaması ve yardımcı flamalar ile tek harfli, iki harfli ve üç harfli kodlanmış anlamlar iletilir. Mesajlar bayrakla (flag hoist), mors lambasıyla veya sesle iletilebilir.",
        image: signalFlagsImage,
        imageAlt: "International Code of Signals alphabet flags, numeral pennants and substitutes",
      },
      {
        title: "Tek Harfli İşaretlerin Tamamı (A-Z)",
        content:
          "Tek harfli işaretler, ICS'in en acil ve en sık kullanılan bölümüdür; tamamı ezbere bilinmelidir. Aşağıda 26 harfin tümü verilmiştir. Bazı harflerin, av sahasına yakın balıkçı tekneleri için ayrı bir anlamı vardır (G, L, P, Z) — sınavda ve sahada en çok karıştırılan ayrım budur.",
        bulletPoints: [
          "A (Alfa): Dalgıcım var; yavaş hızla ve benden uzak durarak geçin.",
          "B (Bravo): Tehlikeli yük alıyorum, boşaltıyorum veya taşıyorum.",
          "C (Charlie): Olumlu — 'Evet'.",
          "D (Delta): Benden uzak durun; güçlükle manevra yapıyorum.",
          "E (Echo): Rotamı sancağa değiştiriyorum.",
          "F (Foxtrot): Kumandadan acizim; benimle haberleşin.",
          "G (Golf): Kılavuz istiyorum. (Balıkçı: 'Ağlarımı topluyorum.')",
          "H (Hotel): Gemimde kılavuz var.",
          "I (India): Rotamı iskeleye değiştiriyorum.",
          "J (Juliett): Yangınım var ve tehlikeli yük taşıyorum; iyice uzak durun.",
          "K (Kilo): Sizinle haberleşmek istiyorum.",
          "L (Lima): Geminizi derhal durdurun. (Balıkçı: 'Ağlarım engele takıldı.')",
          "M (Mike): Gemim durdu; suya göre yol almıyor.",
          "N (November): Olumsuz — 'Hayır'.",
          "O (Oscar): Denize adam düştü.",
          "P (Papa): Limanda 'Blue Peter' — gemi denize çıkmak üzere, herkes gemiye.",
          "Q (Quebec): Gemim sağlıklı; serbest pratika talep ediyorum.",
          "R (Romeo): Yürürlükteki ICS'te tek harfli anlamı yoktur.",
          "S (Sierra): Makinelerim tornistan çalışıyor.",
          "T (Tango): Benden uzak durun; ikili (pair) trol avcılığı yapıyorum.",
          "U (Uniform): Tehlikeye doğru gidiyorsunuz.",
          "V (Victor): Yardıma ihtiyacım var.",
          "W (Whiskey): Tıbbi yardıma ihtiyacım var.",
          "X (X-ray): Niyetinizden vazgeçin ve işaretlerimi gözleyin.",
          "Y (Yankee): Demirim tarıyor.",
          "Z (Zulu): Römorkör istiyorum. (Balıkçı: 'Ağlarımı atıyorum.')",
        ],
      },
      {
        title: "Rakam Flamaları, İkame Flamaları ve Cevap Flaması",
        content:
          "Harf bayraklarının yanında üç grup yardımcı flama vardır. Rakam flamaları (0-9) mevki, saat, kanal ve kod grubu numaralarını taşır. İkame flamaları, aynı hoist içinde tekrar eden bir bayrağı ikinci bir takım taşımadan göstermeyi sağlar: bir ikame flaması YALNIZCA kendi sınıfındaki (harf ya da rakam) bayrağı tekrarlar. Örneğin 'ANNA' hoist'ı A-N-(2. ikame)-(1. ikame) olarak çekilir; 2. ikame kendi sınıfındaki ikinci bayrağı (N), 1. ikame ise birinciyi (A) tekrarlar. Üç ikame flaması sayesinde tek takım bayrakla dört karakterlik her kombinasyon çekilebilir. Cevap flaması ise haberleşmenin akışını yönetir.",
        bulletPoints: [
          "Rakam flamaları: 0-9, sivri (tapered) biçimlidir.",
          "1., 2. ve 3. ikame flaması — üçgen biçimli; yalnız kendi sınıfındaki bayrağı tekrarlar.",
          "Cevap flaması yarıya çekili: 'İşaretinizi gördüm, henüz çözemedim.'",
          "Cevap flaması tam çekili: 'Anladım.' İndirilmesi haberleşmenin bittiğini bildirir.",
          "Cevap flaması rakam grupları arasında ondalık ayracı olarak da kullanılır.",
        ],
      },
      {
        title: "İki Harfli Kod Grupları",
        content:
          "Tek harfli işaretlerin ötesinde, emniyet ve acil durum mesajlarının çoğu iki harfli gruplarla iletilir. Bunlar dil bilgisinden bağımsız olarak, ICS kitabındaki karşılığıyla okunur.",
        bulletPoints: [
          "NC: Tehlike altındayım ve acil yardıma ihtiyacım var.",
          "AC: Gemimi terk ediyorum. — AE: Gemimi terk etmek zorundayım.",
          "AN: Doktora ihtiyacım var. — CB: Acil yardıma ihtiyacım var.",
          "DX: Batıyorum. — GW: Denize adam düştü; almak için harekete geçin.",
          "JL: Karaya oturma riski altındasınız. — PD: Seyir fenerleriniz görünmüyor.",
          "QQ: Sağlık kontrolü (free pratique) talep ediyorum. — UM: Liman trafiğe kapalıdır.",
          "ZL: İşaretiniz alındı ancak anlaşılmadı.",
        ],
      },
      {
        title: "Mors Lambası (Aldis Lamp) ile Haberleşme",
        content:
          "Mors lambası (signalling/Aldis lamp), ışığın kısa (nokta) ve uzun (çizgi) yakılmasıyla mors alfabesi üzerinden mesaj iletir. Telsiz arızasında, telsiz sessizliğinde ve karartma (blackout) koşullarında çalışan tek görsel yöntemdir. Zamanlama ITU-R M.1677 ile sabittir: nokta 1 birim, çizgi 3 birim, aynı harfin öğeleri arası 1 birim, harfler arası 3 birim, kelimeler arası 7 birim. Hız değişse de bu ORANLAR sabit kalır; mors 'hızlı/yavaş' değil, oranı doğru gönderildiğinde okunur.",
        bulletPoints: [
          "Çağrı: Karşı istasyonun adı bilinmiyorsa AA AA AA genel çağrısı tekrarlanır.",
          "Cevap: Alıcı TTTT göndererek almaya hazır olduğunu bildirir.",
          "Teyit: Alıcı, aldığı HER kelime/harf grubundan sonra tek T gönderir; T gelmiyorsa gönderen tekrarlar.",
          "Hata: Sekiz nokta (EEEEEEEE) silme işaretidir; son doğru kelimeden itibaren tekrar edilir.",
          "Tekrar isteği: RPT ile birlikte AA (…dan sonrası), AB (…dan öncesi), WA/WB (kelime sonrası/öncesi) veya BN (… ile … arası) kullanılır.",
          "Bitiş: AR mesajın veya haberleşmenin sonunu bildirir; K ise 'gönderin' davetidir.",
          "SOS (▪▪▪ ▬▬▬ ▪▪▪) harf araları verilmeden tek grup hâlinde gönderilir.",
        ],
      },
      {
        title: "Mors ve Seyir Yardımcıları: Mo ve RACON",
        content:
          "Mors yalnız gemiler arası haberleşmede değil, seyir yardımcılarının kimliğinde de kullanılır. Bir fenerin veya şamandıranın ışık karakteri 'Mo(A)' yazıyorsa, ışık mors 'A' harfini (kısa-uzun) yanıp sönerek tekrarlar; emniyetli su işaretlerinde ve landfall şamandıralarında sık görülür. RACON (radar beacon) ise radar ekranında, işaretin konumundan dışa doğru uzanan mors kodlu bir iz üretir; haritada RACON'un hangi harfi verdiği belirtilir. Her iki durumda da mors bilgisi, gece ve kötü görüşte işareti TEŞHİS etmenin aracıdır.",
      },
      {
        title: "Diğer Görsel İşaretler",
        content:
          "Semafor (kollarla/bayraklarla işaret) tarihsel olarak kullanılmıştır ancak günümüzde nadirdir. Ayrıca COLREG kapsamındaki gündüz işaretleri (toplar, koniler, silindirler) ve seyir fenerleri de görsel iletişimin bir parçasıdır; bunlar geminin durumunu (demirde, kumandadan aciz, balıkçılık vb.) bildirir. Görsel işaretleşme bilgisi, STCW kapsamında köprüüstü zabitinden beklenen bir yetkinliktir.",
      },
    ],
    keyPoints: [
      "International Code of Signals dil engelini aşan standart işaret kodudur.",
      "26 harfin tek harfli anlamı ezbere bilinmelidir; G, L, P ve Z'nin balıkçı teknesine özel ikinci anlamı vardır.",
      "İkame flaması yalnız kendi sınıfındaki (harf/rakam) bayrağı tekrarlar; üç ikame ile tek takım yeter.",
      "Mors zamanlaması oransaldır: nokta 1, çizgi 3, harf arası 3, kelime arası 7 birim.",
      "Mors lambası telsiz arızasında ve karartmada çalışan tek görsel yöntemdir.",
      "Mo(A) ışık karakteri ve RACON imzası, seyir yardımcılarını gece teşhis etmeyi sağlar.",
    ],
  },

  "Telsiz Mevzuatı ve Operatör Lisansları": {
    title: "Telsiz Mevzuatı ve Operatör Lisansları",
    introduction:
      "Deniz telsiz haberleşmesi, ITU Radyo Tüzüğü (Radio Regulations), SOLAS Bölüm IV ve STCW çerçevesinde düzenlenir. Gemi telsiz istasyonunun ruhsatı ve operatörün yeterlilik belgesi, yasal ve emniyetli haberleşmenin ön koşuludur.",
    sections: [
      {
        title: "ITU Radyo Tüzüğü ve Frekans Yönetimi",
        content:
          "ITU (Uluslararası Telekomünikasyon Birliği) Radyo Tüzüğü, deniz hizmetine ayrılan frekans bantlarını, tehlike/çağrı frekanslarını ve kullanım kurallarını belirler. Gemi telsizi yalnızca tahsis edilen frekans/kanallarda ve izin verilen güçte yayın yapabilir. Tehlike frekanslarında (Ch.16, Ch.70, 2182/2187.5 kHz vb.) gereksiz yayın yasaktır. Yanlış/kötü niyetli tehlike çağrısı (false distress) ciddi yaptırımlara tabidir.",
        image: "/diagrams/communication/gmdss-deniz-alanlari.svg",
        imageAlt: "GMDSS sea areas, which determine the required equipment and operator certificate",
      },
      {
        title: "Gemi İstasyon Ruhsatı ve Kimlikler",
        content:
          "Her gemi telsiz istasyonu, bayrak devleti idaresince verilen bir İstasyon Ruhsatı (Ship Station Licence) ile çalışır. Gemiye benzersiz kimlikler atanır: Çağrı işareti (call sign), MMSI (Maritime Mobile Service Identity – DSC ve AIS'te kullanılır) ve gerekiyorsa Inmarsat numarası. Bu kimliklerin doğru programlanması (özellikle MMSI) DSC çağrılarının ve EPIRB tescilinin doğruluğu için kritiktir.",
        bulletPoints: [
          "Call sign: geminin telsiz çağrı işareti.",
          "MMSI: DSC ve AIS'te kullanılan 9 haneli benzersiz kimlik.",
          "EPIRB, geminin kimliğiyle ilişkili olarak tescil edilir (registration).",
        ],
      },
      {
        title: "Operatör Yeterlilik Belgeleri",
        content:
          "GMDSS ekipmanını kullanacak personel uygun belgeye sahip olmalıdır: GOC (General Operator's Certificate) – tüm deniz alanları ve tüm GMDSS ekipmanı için; ROC (Restricted Operator's Certificate) – yalnızca A1 (VHF) alanında çalışan gemiler için. Ayrıca daha eski/özel sertifikalar (örn. LRC/SRC gibi eğlence/kısa menzil belgeleri) farklı kapsamlar için vardır. STCW, köprüüstü zabitlerinin GMDSS yetkinliğini ve İngilizce (SMCP dahil) yeterliliğini şart koşar.",
      },
      {
        title: "Gizlilik, Kayıt ve Denetim",
        content:
          "Telsiz haberleşmesinde haberleşme gizliliği (öğrenilen mesajların ifşa edilmemesi) yasal bir ilkedir; tehlike trafiği bunun istisnasıdır. İstasyon ruhsatı, operatör belgeleri ve radyo log defteri gemide bulundurulur ve PSC denetiminde kontrol edilir. Belgelerin geçerliliği, ekipmanın çalışırlığı ve kimliklerin doğruluğu uyumun temel göstergeleridir.",
      },
    ],
    keyPoints: [
      "ITU Radyo Tüzüğü deniz frekanslarını ve kullanım kurallarını belirler.",
      "Gemi telsizi İstasyon Ruhsatı ile çalışır; MMSI/call sign doğru olmalıdır.",
      "GOC tüm alanlar, ROC yalnızca A1 (VHF) için geçerlidir.",
      "Yanlış tehlike çağrısı yasaktır ve yaptırıma tabidir.",
    ],
  },

  "AIS — Otomatik Tanımlama Sistemi": {
    title: "AIS — Otomatik Tanımlama Sistemi",
    introduction:
      "AIS (Automatic Identification System), gemilerin kimlik, mevki, hız ve seyir bilgilerini VHF bandında otomatik olarak yayınlayıp çevredeki gemiler ve kıyı istasyonlarıyla paylaşmasını sağlayan bir veri haberleşme sistemidir. SOLAS Bölüm V gereği 300 GT ve üzeri uluslararası sefer yapan gemiler, 500 GT ve üzeri tüm gemiler ve tüm yolcu gemileri AIS taşımak zorundadır. AIS; çatışmadan kaçınma, VTS gözetimi, arama-kurtarma ve seyir emniyeti için radarın ve görsel gözcülüğün tamamlayıcısıdır — ancak hiçbirinin yerini almaz.",
    sections: [
      {
        title: "Çalışma Prensibi ve Kanallar",
        content:
          "AIS, iki özel VHF deniz kanalında çalışır: AIS 1 (Ch.87B, 161.975 MHz) ve AIS 2 (Ch.88B, 162.025 MHz). Class A transponderler SOTDMA (Self-Organizing Time Division Multiple Access) tekniğiyle zaman dilimlerini kendi aralarında otomatik paylaşır; böylece merkezî bir kontrole gerek kalmadan yüzlerce gemi aynı kanalı çakışmadan kullanabilir. Cihaz GPS/GNSS'ten aldığı mevkiyi ve gemi sensörlerinden (cayro, hız logu) aldığı verileri belirli aralıklarla yayınlar. Yayın aralığı gemi durumuna göre değişir: demirdeyken veya yavaşken birkaç dakikada bir, yüksek hızda veya manevrada birkaç saniyede bir güncellenir.",
        image: aisDisplayImage,
        imageAlt: "AIS display listing nearby vessels and their data",
        bulletPoints: [
          "AIS 1 = Ch.87B (161.975 MHz), AIS 2 = Ch.88B (162.025 MHz).",
          "Class A: SOTDMA, 12.5 W — SOLAS gemileri için zorunlu.",
          "Class B: daha düşük güç/öncelik — küçük tekne ve balıkçı gemileri.",
          "Yayın aralığı hız ve manevraya göre 2 sn ile 3 dk arasında değişir.",
        ],
      },
      {
        title: "Statik, Dinamik ve Sefer Verileri",
        content:
          "AIS üç tür veri yayınlar. Statik veriler gemi kurulumunda bir kez girilir ve nadiren değişir: MMSI, IMO numarası, çağrı işareti, gemi adı, gemi tipi, boyutlar ve anten konumu. Dinamik veriler sensörlerden otomatik gelir: mevki, karaya göre hız (SOG), karaya göre rota (COG), pruva (heading), dönüş oranı (ROT) ve seyir durumu (navigational status — seyirde, demirde, kumandadan aciz vb.). Sefer verileri her sefer başında elle girilir: su çekimi (draught), tehlikeli yük durumu, varış limanı (destination), tahmini varış zamanı (ETA) ve gemideki kişi sayısı. Seyir durumu ve sefer verilerinin elle girildiği için güncel tutulması zabitin sorumluluğundadır.",
      },
      {
        title: "AIS-SART, AIS-MOB ve AtoN",
        content:
          "AIS yalnızca gemilere değil, emniyet cihazlarına ve seyir yardımcılarına da uygulanır. AIS-SART, bir can salına yerleştirildiğinde mevkisini AIS ağına yayar ve çevredeki tüm gemilerin ekranında belirgin bir simgeyle görünür; geleneksel radar SART'a göre daha kolay tespit ve daha iyi menzil sağlar. AIS-MOB (man overboard) cihazları, denize düşen kişinin can yeleğine bağlı olarak mevki yayar. AIS AtoN (Aids to Navigation), şamandıra ve fenerlerin gerçek konumunu yayınlayabildiği gibi, fiziksel olarak orada bulunmayan ancak haritada gösterilmesi gereken 'sanal' (virtual) seyir yardımcılarını da temsil edebilir — örneğin yeni bir batık üzerine hızla sanal AtoN tanımlanabilir.",
        bulletPoints: [
          "AIS-SART: can salından mevki yayar, çevre gemilerin AIS ekranında görünür.",
          "AIS-MOB: denize düşen kişinin mevkisini yayar.",
          "AIS AtoN: gerçek veya sanal (virtual) seyir yardımcısı yayını.",
        ],
      },
      {
        title: "Sınırlamalar ve Doğru Kullanım",
        content:
          "AIS güçlü bir durumsal farkındalık aracıdır ancak ciddi sınırlamaları vardır. Statik ve sefer verileri elle girildiğinden hatalı olabilir (yanlış varış limanı, güncellenmemiş su çekimi, yanlış seyir durumu sık görülür). AIS kapatılabilir veya kasıtlı yanlış bilgi (spoofing) yayınlanabilir; tüm gemiler (özellikle küçük tekneler ve bazı askerî birimler) AIS taşımaz. Bu nedenle COLREG ve iyi denizcilik uygulaması gereği AIS bilgisi tek başına çatışmadan kaçınma kararı için kullanılamaz; radar/ARPA gözlemi ve görsel/işitsel gözcülükle birlikte değerlendirilmelidir. AIS hedef verisi ile radar hedefi arasında tutarsızlık varsa, durum dikkatle teyit edilmelidir.",
        bulletPoints: [
          "Veriler elle girilir; hatalı/eski olabilir.",
          "Kapatılabilir, spoofing yapılabilir; her gemi taşımaz.",
          "AIS tek başına çatışmadan kaçınma temeli olamaz (COLREG).",
          "Radar/ARPA ve görsel gözcülükle birlikte değerlendirilir.",
        ],
      },
    ],
    keyPoints: [
      "AIS, iki özel VHF kanalında (Ch.87B/88B) otomatik kimlik ve seyir verisi yayınlar.",
      "Statik (kimlik), dinamik (sensör) ve sefer (elle girilen) verileri ayırt edilmelidir.",
      "AIS-SART/MOB ve AtoN, emniyet ve seyir yardımcısı uygulamalarıdır.",
      "AIS radar ve gözcülüğün tamamlayıcısıdır; tek başına çatışmadan kaçınma temeli olamaz.",
    ],
  },

  "MF/HF Telsiz ve Dalga Yayılımı": {
    title: "MF/HF Telsiz ve Dalga Yayılımı",
    introduction:
      "VHF kıyıya yakın haberleşmeyi karşılarken, kıyıdan uzakta (A2/A3/A4 alanları) MF (Medium Frequency) ve HF (High Frequency) telsizler devreye girer. Bu bantlarda menzil; frekansa, günün saatine, mevsime ve iyonosfer koşullarına bağlı olarak değişir. MF/HF haberleşmeyi etkin kullanmak için dalga yayılımı (propagation) mantığını ve doğru frekans seçimini bilmek gerekir.",
    sections: [
      {
        title: "MF ve HF Bantları, Tehlike Frekansları",
        content:
          "MF bandı 300 kHz – 3 MHz arasıdır; deniz haberleşmesinde 2 MHz civarı kullanılır. MF telsiz telefon tehlike/çağrı frekansı 2182 kHz, MF-DSC tehlike frekansı ise 2187.5 kHz'tir. HF bandı 3 – 30 MHz arasıdır ve deniz hizmetine 4, 6, 8, 12 ve 16 MHz dolaylarında bantlar ayrılmıştır; her bantta ayrı bir DSC tehlike frekansı vardır (örn. 8414.5 kHz). HF, dünya çapında uzun menzil sağlayabildiğinden A4 (kutup) dahil tüm alanlarda temel uzun menzil haberleşme aracıdır. NBDP (Narrow-Band Direct Printing / teleks) de MF/HF bantlarında çalışır.",
        image: vhfRadioImage,
        imageAlt: "Ship's radio installation carrying the MF/HF and VHF sets",
        bulletPoints: [
          "MF telsiz telefon tehlike/çağrı: 2182 kHz; MF-DSC: 2187.5 kHz.",
          "HF deniz bantları: ~4/6/8/12/16 MHz; her birinde ayrı DSC frekansı.",
          "Örnek HF-DSC: 8414.5 kHz.",
          "HF, A4 (kutup) dahil uzun menzilin temelidir.",
        ],
      },
      {
        title: "Dalga Yayılımı: Yer Dalgası ve Gök Dalgası",
        content:
          "MF ve düşük HF'te sinyal büyük ölçüde 'yer dalgası' (ground wave) olarak yeryüzünü izleyerek yayılır; MF yer dalgası gündüz tipik 100–150 deniz mili, gece daha fazla menzil verir. Daha yüksek frekanslarda 'gök dalgası' (sky wave) baskındır: dalga iyonosfere ulaşıp kırılarak yeryüzüne geri döner ve binlerce mil öteye ulaşabilir. Yer dalgasının bittiği yer ile ilk gök dalgası sıçramasının düştüğü yer arasında sinyalin alınamadığı bir 'ölü bölge' (skip zone) oluşabilir. İyonosfer gündüz/gece, mevsim ve güneş aktivitesiyle değiştiği için kullanılabilir frekanslar da değişir.",
      },
      {
        title: "Frekans Seçimi ve Günün Saati",
        content:
          "Doğru frekans seçimi başarılı bağlantının anahtarıdır. Genel kural: düşük frekanslar (4–6 MHz) gece ve kısa-orta mesafe için, yüksek frekanslar (12–16 MHz) gündüz ve uzun mesafe için daha uygundur. İyonosferin gündüz daha yoğun iyonlaşması yüksek frekansların kırılarak geri dönmesini sağlarken, gece düşük frekanslar daha iyi yansır. Bağlantı kurulamadığında, bir üst veya alt banda geçmek çoğu zaman çözüm olur. Pek çok cihazda ITU kanal/çift frekans tabloları tanımlıdır; tehlike trafiği için ilgili bandın DSC ve telsiz telefon tehlike frekansları kullanılır.",
        bulletPoints: [
          "Gece + kısa/orta mesafe → düşük bantlar (4–6 MHz).",
          "Gündüz + uzun mesafe → yüksek bantlar (12–16 MHz).",
          "Bağlantı yoksa bir üst/alt banda geç.",
        ],
      },
      {
        title: "Anten, Topraklama ve Kullanım Disiplini",
        content:
          "MF/HF vericiler verimli yayın için iyi bir antene, etkin topraklamaya (ground/counterpoise) ve genellikle bir anten uyum birimine (ATU – Antenna Tuning Unit) ihtiyaç duyar; kötü topraklama menzili ciddi biçimde düşürür. Kullanımda SSB (Single Side Band, J3E modu) telsiz telefon için, F1B/J2B teleks (NBDP) için kullanılır. Tehlike frekanslarında gereksiz yayın yasaktır ve bu frekanslarda nöbet tutulur. Modern gemilerde MF/HF-DSC kontrolör, tehlike alarmlarını ilgili bantlarda otomatik olarak izler; alınan DSC tehlike alarmı, ilgili bandın telsiz telefon tehlike frekansında (örn. 2182 kHz) sesli olarak takip edilir.",
      },
    ],
    keyPoints: [
      "MF tehlike: 2182 kHz (telefon) / 2187.5 kHz (DSC); HF bantlarında ayrı DSC frekansları vardır.",
      "Yer dalgası kısa menzil, gök dalgası (iyonosfer) uzun menzil sağlar; aralarında ölü bölge oluşabilir.",
      "Gece düşük, gündüz yüksek bantlar genelde daha iyi çalışır.",
      "İyi topraklama ve ATU, MF/HF menzili için kritiktir; SSB (J3E) sesli haberleşmede kullanılır.",
    ],
  },

  "VTS ve Gemi Raporlama Sistemleri": {
    title: "VTS ve Gemi Raporlama Sistemleri",
    introduction:
      "VTS (Vessel Traffic Service – Gemi Trafik Hizmeti) ve gemi raporlama sistemleri, yoğun veya dar sularda trafik emniyetini ve verimliliğini artırmak için kıyı otoritelerince yürütülen gözetim ve haberleşme hizmetleridir. SOLAS Bölüm V, VTS ve gemi raporlama sistemlerini düzenler. Gemi, VTS bölgesine girerken doğru ve standart raporlama yapmak, talimat/tavsiyelere uymak ve atanmış kanalda nöbet tutmakla yükümlüdür.",
    sections: [
      {
        title: "VTS Hizmet Türleri",
        content:
          "VTS, IMO A.857(20) kararı çerçevesinde üç temel hizmet sunar. Bilgi Hizmeti (INS – Information Service): trafik, hava, seyir engelleri gibi emniyet için gerekli bilgilerin belirli zamanlarda veya talep üzerine yayınlanması. Trafik Düzenleme Hizmeti (TOS – Traffic Organization Service): trafiğin akışını düzenlemek için geçiş sırası, hız, bekleme noktaları gibi düzenlemeler. Seyir Yardım Hizmeti (NAS – Navigational Assistance Service): zor seyir veya meteorolojik koşullarda, gemi talebi veya VTS'nin gerekli görmesi hâlinde mevki ve seyir konusunda yardım. VTS talimatları geminin kaptanının seyir sorumluluğunu ortadan kaldırmaz; nihai sorumluluk kaptandadır.",
        image: bridgeOverviewImage,
        imageAlt: "Bridge from which VTS reporting is carried out",
        bulletPoints: [
          "INS: emniyet bilgisi yayını (trafik, hava, engeller).",
          "TOS: trafik akışının düzenlenmesi (sıra, hız, bekleme).",
          "NAS: talep/gerek hâlinde seyir yardımı.",
          "VTS talimatı kaptanın nihai sorumluluğunu kaldırmaz.",
        ],
      },
      {
        title: "VTS Raporlama ve SMCP Kullanımı",
        content:
          "VTS bölgelerinde haberleşme, yanlış anlamayı önlemek için SMCP mesaj işaretleriyle (message markers — Instruction, Advice, Warning, Information, Question, Answer, Request, Intention) yapılmalıdır. Gemi tipik olarak bölgeye giriş (entry) raporu, mevki raporu ve çıkış (final) raporu verir; rapor içeriği gemi adı/çağrı işareti, mevki, rota, hız, varış noktası gibi bilgileri içerir. Atanmış VTS kanalında sürekli nöbet tutulur. Kapalı döngü teyit (read back) ile kritik talimatların doğru alındığı doğrulanır.",
      },
      {
        title: "Zorunlu Gemi Raporlama Sistemleri (SRS)",
        content:
          "SOLAS V/11, IMO tarafından onaylanmış zorunlu gemi raporlama sistemlerini (Ship Reporting Systems) düzenler. Belirli hassas bölgelerde (boğazlar, yoğun trafik, çevresel duyarlı alanlar) gemiler bölgeye giriş ve çıkışta standart formatta rapor vermek zorundadır. Standart bir raporlama sistemi; sefer planı (sailing plan), mevki raporu (position report), rota değişikliği ve son rapor (final report) bölümlerinden oluşur. AMVER gibi gönüllü sistemler ise arama-kurtarmayı desteklemek için gemilerin mevkilerini paylaştığı küresel sistemlerdir.",
      },
      {
        title: "LRIT, AIS ve Uzaktan Tanımlama",
        content:
          "VTS ve raporlama, modern gemi takibi teknolojileriyle bütünleşir. AIS, VTS merkezlerinin gemileri gerçek zamanlı ve otomatik gözetlemesini sağlar; kıyı AIS istasyonları gemi verilerini doğrudan alır. LRIT (Long-Range Identification and Tracking), gemilerin kimlik ve mevkisini uydu üzerinden bayrak/liman/kıyı devletlerine uzun menzilde iletir ve esas olarak emniyet ve güvenlik amaçlıdır. AIS yerel/açık bir yayınken, LRIT küresel ve yalnızca yetkili taraflara kapalı bir sistemdir; ikisi birbirini tamamlar.",
        bulletPoints: [
          "AIS: yerel, açık, gerçek zamanlı VTS gözetimi.",
          "LRIT: küresel, kapalı, yetkili taraflara uydu üzerinden takip.",
          "SRS raporları ile birlikte trafik resmini tamamlarlar.",
        ],
      },
    ],
    keyPoints: [
      "VTS üç hizmet sunar: INS (bilgi), TOS (trafik düzenleme), NAS (seyir yardımı).",
      "VTS haberleşmesi SMCP mesaj işaretleriyle ve kapalı döngü teyitle yapılır.",
      "SOLAS V/11 kapsamındaki zorunlu raporlama sistemleri standart formatta rapor gerektirir.",
      "AIS yerel/açık, LRIT küresel/kapalı takip sağlar; VTS talimatı kaptanın sorumluluğunu kaldırmaz.",
    ],
  },

  "Gemi İçi Haberleşme Sistemleri": {
    title: "Gemi İçi Haberleşme Sistemleri",
    introduction:
      "Denizde haberleşme yalnızca gemiler ve kıyı arasında değil, gemi içinde köprüüstü, makine dairesi, dümen dairesi, baş-kıç istasyonları ve yük operasyon noktaları arasında da kritiktir. Gemi içi haberleşme sistemleri; normal operasyon, manevra ve acil durumlarda güvenilir, anlaşılır ve gerektiğinde elektriksiz çalışabilen iletişim sağlamak üzere tasarlanır. SOLAS, manevra ve acil durumlar için belirli iç haberleşme ve alarm sistemlerini zorunlu kılar.",
    sections: [
      {
        title: "Köprüüstü–Makine Haberleşmesi ve Telgraf",
        content:
          "Köprüüstü ile makine dairesi arasındaki ana komut bağlantısı makine telgrafıdır (engine telegraph); modern gemilerde elektronik telgraf, istenen makine komutunu (örn. Half Ahead, Stop, Full Astern) hem köprüüstünde hem makine kontrol odasında eşzamanlı gösterir ve onaylar. Telgrafın yanında köprüüstü ile makine kontrol odası arasında telefon ve interkom bağlantısı bulunur. Köprü-makine komutlarının kapalı döngüyle (komutun makine tarafından tekrar edilip onaylanması) yürütülmesi yanlış manevrayı önler. Manevra sırasında verilen tüm makine komutları otomatik kaydedici (engine movement recorder / bell book) ile kayıt altına alınır.",
        image: bridgeOverviewImage,
        imageAlt: "Bridge console carrying the internal communication equipment",
      },
      {
        title: "Ses-Güçlü Telefonlar ve İnterkom",
        content:
          "Ses-güçlü telefonlar (sound-powered telephones), konuşmacının sesinin ürettiği enerjiyle çalışan, harici güç gerektirmeyen sistemlerdir; bu yüzden tam elektrik kesintisinde (blackout) bile çalışırlar ve acil durumlar için kritik öneme sahiptirler. Tipik olarak köprüüstü, makine dairesi, dümen dairesi ve baş kasara gibi noktalar arasında bağlantı kurarlar. Talkback/interkom sistemleri ise hoparlörlü, eller serbest haberleşme sağlar ve manevra, demirleme, yük operasyonları sırasında istasyonlar arası hızlı iletişim için kullanılır. Acil dümen manevrasında köprüüstü ile dümen dairesi arasında bağımsız bir haberleşme hattı bulunması SOLAS gereğidir.",
        bulletPoints: [
          "Ses-güçlü telefon: harici güç gerektirmez, blackout'ta çalışır.",
          "Köprü–makine–dümen dairesi–baş kasara arası bağlantı sağlar.",
          "Talkback/interkom: eller serbest, manevra ve yük operasyonları için.",
          "Köprü–dümen dairesi acil haberleşme hattı SOLAS gereğidir.",
        ],
      },
      {
        title: "Genel Anons (PA) ve Genel Alarm",
        content:
          "Gemide genel anons sistemi (Public Address – PA), kaptanın veya köprüüstünün mürettebata ve yolculara duyuru yapmasını sağlar; tüm yaşam mahalleri, çalışma alanları ve güverteler hoparlörlerle kapsanmalı ve makine sesi üzerinde duyulabilmelidir. Genel emniyet alarmı (general emergency alarm), tüm gemide işitilebilen, yedi kısa + bir uzun düdük/zil işaretiyle verilir ve mürettebatı toplanma istasyonlarına çağırır. Yangın alarmı, terk-i gemi ve diğer acil durum işaretleri Muster List'te (toplanma cetveli) tanımlanır. Bu sistemler düzenli test edilir ve sonuçlar kaydedilir.",
        bulletPoints: [
          "Genel emniyet alarmı: 7 kısa + 1 uzun işaret → toplanma istasyonları.",
          "PA tüm yaşam/çalışma alanlarında makine sesi üstünde duyulmalı.",
          "Alarm işaretleri ve görevler Muster List'te tanımlanır.",
        ],
      },
      {
        title: "Taşınabilir Telsizler ve Operasyonel Güvenlik",
        content:
          "Manevra, demirleme, palamar ve yük operasyonlarında ekip içi anlık iletişim taşınabilir UHF/VHF el telsizleriyle sağlanır; baş-kıç manevra ekipleri ve köprüüstü arasında net, kısa ve standart komutlar kullanılır. Tankerlerde ve tehlikeli yük taşıyan gemilerde, patlayıcı ortam riski nedeniyle yalnızca kıvılcım güvenli (intrinsically safe / Ex onaylı) telsizler kullanılabilir. GMDSS kapsamında ayrıca, can kurtarma araçlarıyla ve helikopterle haberleşme için onaylı taşınabilir GMDSS VHF setleri (survival craft two-way VHF) bulundurulur; bunlar terk-i gemi durumunda kurtarma birimleriyle iletişim için ayrılmıştır ve rutin işlerde kullanılmaz.",
      },
    ],
    keyPoints: [
      "Makine telgrafı köprü–makine komutlarını eşzamanlı gösterir ve onaylar; komutlar kaydedilir.",
      "Ses-güçlü telefonlar harici güç gerektirmez ve blackout'ta çalışır.",
      "Genel emniyet alarmı 7 kısa + 1 uzun işaretle verilir; görevler Muster List'tedir.",
      "Tankerlerde yalnızca kıvılcım güvenli (Ex) taşınabilir telsiz kullanılır.",
    ],
  },

  "Arama-Kurtarma Haberleşmesi ve Olay Yeri Koordinasyonu": {
    title: "Arama-Kurtarma Haberleşmesi ve Olay Yeri Koordinasyonu",
    introduction:
      "Bir tehlike alarmından sonra başarılı kurtarma, doğru ve disiplinli haberleşmeye bağlıdır. Arama-kurtarma (SAR) operasyonları IAMSAR (International Aeronautical and Maritime Search and Rescue) el kitabına göre yürütülür ve kıyı-deniz birimleri ile yardıma giden gemiler arasındaki haberleşme net bir koordinasyon yapısı içinde işler. Bu konu, tehlike sonrası SAR organizasyonunu, olay yeri haberleşmesini ve tıbbi yardım taleplerini kapsar.",
    sections: [
      {
        title: "SAR Organizasyonu ve MRCC",
        content:
          "Dünya denizleri SAR sorumluluk bölgelerine ayrılmıştır; her bölgeyi bir MRCC (Maritime Rescue Coordination Centre) yönetir. Bir tehlike alarmı (DSC, EPIRB, telsiz telefon vb.) MRCC'ye ulaştığında, SAR Görev Koordinatörü (SMC – SAR Mission Coordinator) operasyonu planlar ve yönetir. Tehlike durumu üç aşamada değerlendirilir: belirsizlik (INCERFA – uncertainty), alarm (ALERFA – alert) ve tehlike (DETRESFA – distress). MRCC, bölgedeki gemilere yardım çağrısı yapabilir; SOLAS ve denizcilik geleneği gereği tehlikedeki kişilere yardım, kaptanın temel bir yükümlülüğüdür.",
        image: epirbSartImage,
        imageAlt: "Beacons that mark the distress position for on-scene coordination",
        bulletPoints: [
          "MRCC, SAR bölgesini yönetir; SMC operasyonu koordine eder.",
          "Tehlike aşamaları: INCERFA (belirsizlik), ALERFA (alarm), DETRESFA (tehlike).",
          "Tehlikedeki kişilere yardım kaptanın temel yükümlülüğüdür.",
        ],
      },
      {
        title: "Olay Yeri Koordinatörü (OSC) ve Haberleşme",
        content:
          "Olay yerine birden fazla birim katıldığında, MRCC bunlardan birini Olay Yeri Koordinatörü (OSC – On-Scene Coordinator) olarak atar; OSC genellikle ilk varan veya en donanımlı gemidir. OSC, arama düzenini (search pattern) uygular, birimleri yönlendirir ve MRCC ile düzenli durum raporları paylaşır. Olay yeri haberleşmesi belirlenen bir çalışma kanalında yürütülür: gemiler arası tipik olarak VHF Ch.16 ve atanmış bir çalışma kanalı veya MF 2182 kHz; uçaklarla haberleşme için 121.5 MHz ve olay yeri hava frekansları kullanılır. Tüm trafik kısa, standart ve SMCP'ye uygun olmalıdır.",
        bulletPoints: [
          "OSC, MRCC adına olay yerindeki birimleri koordine eder.",
          "Gemi-gemi: VHF Ch.16 + çalışma kanalı veya MF 2182 kHz.",
          "Gemi-uçak: 121.5 MHz ve olay yeri hava frekansları.",
          "Arama düzeni ve durum raporları OSC tarafından yönetilir.",
        ],
      },
      {
        title: "Tıbbi Yardım: MEDICO ve MEDEVAC",
        content:
          "Gemide ciddi bir sağlık sorunu olduğunda, kıyıdaki bir tıbbi merkezden uzaktan tıbbi danışma (MEDICO) alınabilir; bu trafik genellikle PAN-PAN (aciliyet) önceliğiyle, bir kıyı istasyonu veya MRCC aracılığıyla yürütülür. Doktor, semptom ve bulgulara göre tedavi önerir. Hastanın gemiden tahliyesi gerekiyorsa MEDEVAC (medical evacuation) düzenlenir; bu, genellikle helikopterle veya hızlı bir deniz birimiyle yapılır ve dikkatli haberleşme ile koordinasyon gerektirir (buluşma noktası, gemi rotası/hızı, rüzgâr, vinç operasyonu için hazırlık). Helikopter operasyonlarında köprüüstü ile helikopter arasındaki haberleşme atanmış frekansta, net ve standart yürütülür.",
      },
      {
        title: "Telsiz Sessizliği ve SAR'da SMCP",
        content:
          "Bir tehlike trafiği sürerken, MRCC veya trafiği kontrol eden istasyon 'SEELONCE MAYDAY' diyerek ilgisiz tüm yayınları durdurabilir; ilgisiz bir istasyon bile düzeni korumak için 'SEELONCE DISTRESS' diyebilir. Trafik kısmen rahatladığında 'PRUDONCE' ile sınırlı haberleşmeye izin verilir, tehlike tamamen bittiğinde 'SEELONCE FEENEE' ile normal trafiğe dönülür. SAR haberleşmesinde SMCP'nin standart arama-kurtarma ifadeleri (arama düzeni, varış zamanı, kişi sayısı, hayatta kalan durumu vb.) kullanılır. Tüm SAR trafiği radyo log defterine UTC ile kaydedilir.",
        bulletPoints: [
          "SEELONCE MAYDAY / DISTRESS: tehlike trafiğinde telsiz sessizliği.",
          "PRUDONCE: kısıtlı normal trafiğe izin; FEENEE: sessizliğin sonu.",
          "SAR trafiğinde standart SMCP ifadeleri kullanılır.",
          "Tüm SAR haberleşmesi UTC ile radyo log'a kaydedilir.",
        ],
      },
    ],
    keyPoints: [
      "SAR, IAMSAR'a göre MRCC/SMC tarafından koordine edilir; aşamalar INCERFA/ALERFA/DETRESFA'dır.",
      "OSC olay yerindeki birimleri yönetir; haberleşme Ch.16/çalışma kanalı, MF 2182 ve 121.5 MHz üzerinden yürür.",
      "MEDICO tıbbi danışma PAN-PAN ile alınır; gerekirse MEDEVAC düzenlenir.",
      "SEELONCE/PRUDONCE/FEENEE telsiz sessizliğini yönetir; tüm trafik UTC ile loglanır.",
    ],
  },

  "Cospas-Sarsat ve MEOSAR Uydu Tespit Sistemi": {
    title: "Cospas-Sarsat ve MEOSAR Uydu Tespit Sistemi",
    introduction:
      "Cospas-Sarsat, 406 MHz acil durum vericilerinden (EPIRB, ELT, PLB) gelen tehlike sinyallerini uydularla algılayıp arama-kurtarma birimlerine ulaştıran uluslararası bir uydu sistemidir. EPIRB gemide tehlike alarmını başlatan cihazken, Cospas-Sarsat o alarmı uzaydan yakalayıp konumlandıran ve doğru MRCC'ye yönlendiren küresel altyapıdır. Sistem, son yıllarda MEOSAR teknolojisine geçerek tespit hızını ve konum doğruluğunu büyük ölçüde artırmıştır.",
    sections: [
      {
        title: "Sistem Mimarisi: LEOSAR, GEOSAR ve MEOSAR",
        content:
          "Cospas-Sarsat üç uydu katmanı kullanır. LEOSAR, alçak kutupsal yörüngedeki uydularla çalışır; Doppler kayması üzerinden konum hesaplar ancak uydu o anda kapsama alanında değilse beklemek (gecikme) gerekir. GEOSAR, sabit (jeostasyoner) uydularla anında alarm sağlar fakat tek başına konum üretemez (vericide GNSS yoksa). MEOSAR (Medium Earth Orbit), GPS/Galileo/GLONASS gibi navigasyon uydularına yerleştirilen SAR yükleriyle çalışır; geniş, sürekli kapsama ve birden çok uydudan eşzamanlı alımla hızlı ve hassas konumlandırma sunar. Modern sistemde GEOSAR'ın anlık alarmı ile MEOSAR'ın hızlı bağımsız konumlandırması birlikte kullanılır.",
        image: epirbSartImage,
        imageAlt: "406 MHz beacons detected by the Cospas-Sarsat satellite system",
        bulletPoints: [
          "LEOSAR: kutupsal yörünge, Doppler konumu, olası bekleme süresi.",
          "GEOSAR: anlık alarm, tek başına konum üretemez.",
          "MEOSAR: navigasyon uydularında SAR yükü; hızlı, sürekli, hassas konum.",
        ],
      },
      {
        title: "Tehlike Sinyalinin Yolu: Cihazdan MRCC'ye",
        content:
          "Bir 406 MHz vericisi etkinleştiğinde sinyal uydular tarafından alınır ve yer istasyonlarına (LUT – Local User Terminal) iletilir. LUT, sinyali çözer ve konumu hesaplar; ardından bilgi bir MCC'ye (Mission Control Centre) gönderilir. MCC, vericinin kayıtlı kimliğine ve konumuna göre alarmı sorumlu SAR bölgesindeki MRCC'ye yönlendirir. Bu zincir sayesinde, tehlikedeki bir gemi telsiz menzili dışında olsa bile alarm dakikalar içinde doğru kurtarma merkezine ulaşır. 406 MHz dijital mesajı, vericinin benzersiz kimliğini (15 haneli hex kimlik) ve varsa entegre GNSS konumunu taşır.",
        bulletPoints: [
          "Zincir: Verici → Uydu → LUT → MCC → MRCC.",
          "LUT konumu hesaplar; MCC doğru MRCC'ye yönlendirir.",
          "Dijital mesaj benzersiz cihaz kimliği ve (varsa) GNSS konumu içerir.",
        ],
      },
      {
        title: "Beacon Kaydı ve Yanlış Alarmların Önlenmesi",
        content:
          "Her 406 MHz vericisinin bayrak devleti veya ulusal otorite nezdinde kaydedilmesi zorunludur. Kayıt; gemi adı, MMSI, irtibat bilgileri ve acil durum temaslarını içerir ve SAR birimlerinin alarmı hızla doğrulamasını sağlar. Kaydın güncel tutulması (gemi satışı, sahip değişikliği, irtibat değişikliği) kritik öneme sahiptir. Cospas-Sarsat alarmlarının büyük bölümü yanlış alarmdır; yanlış aktivasyon yapıldığında derhâl ilgili MRCC aranarak iptal bildirilmelidir. Cihazın yanlışlıkla tetiklenmemesi için doğru saklanması, test düğmesinin amacına uygun kullanılması ve hidrostatik bırakma düzeneğinin kontrolü önemlidir.",
        bulletPoints: [
          "406 MHz cihazlar zorunlu olarak kaydedilir; kayıt güncel tutulur.",
          "Kayıt, SAR'ın alarmı hızla doğrulamasını sağlar.",
          "Yanlış alarm derhâl ilgili MRCC aranarak iptal edilmelidir.",
        ],
      },
      {
        title: "121.5 MHz Yön Bulma ve Geri Bağlantı (RLS)",
        content:
          "406 MHz uydu sinyaline ek olarak cihazlar düşük güçlü bir 121.5 MHz homing (yön bulma) işareti yayar; arama birimleri ve helikopterler olay yerine yaklaşırken bu işaretle cihazı yön bularak bulur. Yeni nesil MEOSAR yeteneklerinden biri Geri Bağlantı Hizmeti'dir (RLS – Return Link Service): sistem, alarmın alındığını ve işlendiğini cihaza geri bildirebilir; böylece tehlikedeki kişi yardımın yolda olduğunu (örneğin cihaz üzerindeki bir gösterge ile) teyit eder; bu, moral ve karar verme açısından değerlidir. AIS-SART ve EPIRB-AIS gibi tamamlayıcı işaretler de olay yerinde yakın menzilli konumlandırmayı destekler.",
        bulletPoints: [
          "121.5 MHz homing sinyali, olay yerinde yön bulmayı sağlar.",
          "RLS (Return Link Service): alarmın alındığı cihaza geri bildirilebilir.",
          "AIS-SART/EPIRB-AIS yakın menzilli konumlandırmayı tamamlar.",
        ],
      },
    ],
    keyPoints: [
      "Cospas-Sarsat, 406 MHz tehlike sinyallerini uyduyla algılayıp MRCC'ye ulaştırır.",
      "MEOSAR (navigasyon uydularında SAR yükü) hızlı, sürekli ve hassas konumlandırma sağlar.",
      "Alarm zinciri: Verici → Uydu → LUT → MCC → MRCC.",
      "Beacon kaydı zorunludur; yanlış alarm derhâl MRCC'ye iptal ettirilir.",
    ],
  },

  "GMDSS Modernizasyonu ve E-Navigasyon": {
    title: "GMDSS Modernizasyonu ve E-Navigasyon",
    introduction:
      "GMDSS, 1990'lardaki teknolojiyle tasarlandı; aradan geçen sürede uydu ve dijital haberleşme büyük ölçüde gelişti. IMO, GMDSS'i çağa uyarlamak için kapsamlı bir modernizasyon programı yürütmektedir. Bu konu; yeni uydu servis sağlayıcılarının tanınması, NAVDAT gibi yeni dijital yayın sistemleri ve e-navigasyon vizyonu çerçevesinde haberleşmenin geleceğini ele alır.",
    sections: [
      {
        title: "Modernizasyonun Gerekçesi ve Kapsamı",
        content:
          "GMDSS modernizasyonu; eskiyen teknolojileri güncellemeyi, sistemin yeni uydu sağlayıcılarına açılmasını, dijital veri yayınını yaygınlaştırmayı ve gereksiz çakışan zorunlulukları sadeleştirmeyi amaçlar. SOLAS Bölüm IV ve ilgili performans standartları bu doğrultuda revize edilmektedir. Hedef; tehlike ve emniyet haberleşmesinin güvenilirliğini korurken modern ekipmanın getirdiği hız, kapasite ve esneklikten yararlanmaktır. Modernizasyon kademeli yürür; gemiler ve idareler için geçiş takvimleri ve uyum gereklilikleri belirlenir.",
        image: "/diagrams/communication/gmdss-deniz-alanlari.svg",
        imageAlt: "GMDSS sea areas A1 to A4 and their carriage requirements",
        bulletPoints: [
          "Amaç: eskiyen teknolojiyi güncellemek ve sistemi yeni sağlayıcılara açmak.",
          "SOLAS Bölüm IV ve performans standartları revize edilmektedir.",
          "Güvenilirlik korunurken modern ekipmanın hız ve kapasitesi kazanılır.",
        ],
      },
      {
        title: "Yeni Uydu Sağlayıcılar ve Kapsama",
        content:
          "Uzun süre Inmarsat tek tanınmış GMDSS uydu sağlayıcısıydı. Modernizasyonla birlikte ek mobil uydu servisleri de GMDSS hizmeti sunmak üzere tanınmaya başlamıştır; özellikle alçak yörünge takımyıldızı kullanan ve kutuplar dâhil küresel kapsama sunabilen sistemler, geleneksel jeostasyoner uyduların kutup boşluğunu (A4 sorunu) kapatma potansiyeli taşır. Birden fazla tanınmış sağlayıcı; rekabet, yedeklilik ve daha geniş coğrafi kapsama anlamına gelir. Gemilerin hangi servisi taşıyacağı, sefer bölgesine ve bayrak devleti onayına bağlı olarak belirlenir.",
        bulletPoints: [
          "GMDSS artık birden fazla tanınmış uydu sağlayıcıya açılmaktadır.",
          "Kutupları da kapsayan takımyıldızlar A4 boşluğunu kapatabilir.",
          "Çok sağlayıcı: rekabet, yedeklilik ve daha geniş kapsama.",
        ],
      },
      {
        title: "NAVDAT ve Dijital MSI Yayını",
        content:
          "NAVTEX, on yıllardır metin tabanlı Denizcilik Emniyet Bilgisi (MSI) yayınının temeli olmuştur fakat düşük veri hızı ve yalnızca metin desteği sınırlayıcıdır. NAVDAT (Navigational Data), 500 kHz bandında çalışan yeni nesil dijital yayın sistemidir; NAVTEX'ten çok daha yüksek veri hızıyla yalnızca metin değil grafik, harita düzeltmeleri, hava haritaları ve dosya türü içeriği de yayınlayabilir. NAVDAT, MSI dağıtımını zenginleştirip otomatikleştirme yolunda önemli bir adımdır ve NAVTEX ile bir süre birlikte var olması beklenir.",
        bulletPoints: [
          "NAVDAT: 500 kHz'de yüksek hızlı dijital MSI yayını.",
          "Metnin yanı sıra grafik, harita düzeltmesi ve dosya yayınlayabilir.",
          "NAVTEX'i tamamlar; geçiş döneminde birlikte kullanılır.",
        ],
      },
      {
        title: "E-Navigasyon Vizyonu ve Bütünleşme",
        content:
          "E-navigasyon, gemi içi ve kıyıdaki seyir/haberleşme bilgilerinin uyumlu (harmonize) biçimde toplanması, değişimi ve sunulmasıdır; amaç emniyeti artırmak ve operatör iş yükünü azaltmaktır. Bu vizyonda GMDSS haberleşmesi; ECDIS, AIS, VTS ve kıyı servisleriyle bütünleşik bir bilgi akışının parçası olur. Standart veri biçimleri (ortak deniz veri yapısı), maritime tek pencere (single window) uygulamaları ve siber güvenlik, e-navigasyonun temel bileşenleridir. Modern haberleşmenin getirdiği bağlanabilirlik arttıkça, sistemlerin siber tehditlere karşı korunması ve yedekli/çalışır tutulması giderek daha kritik hâle gelir.",
        bulletPoints: [
          "E-navigasyon: seyir/haberleşme bilgisinin uyumlu toplanıp paylaşılması.",
          "GMDSS, ECDIS/AIS/VTS ile bütünleşik bilgi akışının parçası olur.",
          "Standart veri biçimleri ve siber güvenlik temel bileşenlerdir.",
        ],
      },
    ],
    keyPoints: [
      "GMDSS modernizasyonu sistemi güncel uydu ve dijital teknolojiye uyarlar.",
      "Artık birden fazla uydu sağlayıcı tanınır; kutup kapsaması iyileşir.",
      "NAVDAT, NAVTEX'ten çok daha zengin dijital MSI yayını sağlar.",
      "E-navigasyon, haberleşmeyi seyir sistemleriyle bütünleştirir; siber güvenlik kritiktir.",
    ],
  },

  "SSAS - Gemi Güvenlik Alarm Sistemi": {
    title: "SSAS - Gemi Güvenlik Alarm Sistemi",
    introduction:
      "SSAS (Ship Security Alert System), ISPS Kodu kapsamında zorunlu kılınan, gemiye yönelik bir güvenlik tehdidinde (korsanlık, terör, kaçırma) sessiz bir alarm gönderen sistemdir. Tehlike haberleşmesinin aksine SSAS GİZLİ çalışır: gemideki saldırganları uyarmadan, kıyıdaki yetkililere geminin tehdit altında olduğunu bildirir. Bu yönüyle GMDSS tehlike alarmından temelde farklı bir amaca ve mantığa sahiptir.",
    sections: [
      {
        title: "Amaç ve ISPS Çerçevesi",
        content:
          "SSAS, 11 Eylül sonrası getirilen SOLAS Bölüm XI-2 ve ISPS Kodu kapsamında, çoğu uluslararası sefer yapan gemi için zorunlu hâle getirilmiştir. Amaç, geminin güvenliği ihlal edildiğinde veya tehdit altındayken kıyıdaki idareye sessiz bir uyarı iletmektir. Tehlike alarmından (GMDSS) farkı: SSAS, çevredeki gemilere veya saldırganlara açık bir alarm vermez; yalnızca önceden tanımlanmış kara muhataplarına gizli bildirim gönderir. Böylece kaçırma veya korsanlık girişimi sırasında müdahale planları güvenlik içinde başlatılabilir.",
        image: dscPanelImage,
        imageAlt: "Ship security alarm activated from the bridge console",
        bulletPoints: [
          "SOLAS XI-2 / ISPS Kodu kapsamında zorunludur.",
          "Geminin güvenlik ihlali/tehdidini kıyıya GİZLİCE bildirir.",
          "GMDSS tehlike alarmının aksine açık yayın yapmaz.",
        ],
      },
      {
        title: "Çalışma Mantığı ve Tetikleme Noktaları",
        content:
          "SSAS, gemide gizli konumlandırılmış en az iki tetikleme noktasıyla (activation point) etkinleştirilir; bunlardan biri genellikle köprüüstündedir. Tetiklendiğinde sistem sessizce bir uyarı mesajı yayınlar: alarm gemide hiçbir sesli/görsel işaret üretmez ve gemideki haberleşme ekipmanını uyarmaz. Mesaj, geminin kimliğini, konumunu ve güvenlik alarmı durumunu içerir; bu bilgi otomatik olarak ve düzenli aralıklarla güncellenerek gönderilebilir. Sistem yanlışlıkla kapatılamayacak veya kolayca devre dışı bırakılamayacak şekilde tasarlanır.",
        bulletPoints: [
          "En az iki gizli tetikleme noktası (biri köprüüstünde) bulunur.",
          "Tetiklendiğinde gemide sesli/görsel uyarı ÜRETMEZ.",
          "Mesaj gemi kimliği, konum ve güvenlik durumunu taşır.",
        ],
      },
      {
        title: "Alarmın Yönlendirilmesi ve Muhataplar",
        content:
          "SSAS alarmı, GMDSS gibi tüm denize değil; bayrak devletinin belirlediği yetkililere (Şirket Güvenlik Sorumlusu/CSO ve/veya idare) gönderilir. Önemli bir nokta, alarmın doğru kara muhataplarına ulaşmasının düzenli test edilmesidir. Test çağrıları, gerçek bir güvenlik alarmıyla karıştırılmamak için ilgili merkezlerle önceden koordine edilerek yapılır. Mesaj genellikle uydu haberleşme kanalı üzerinden iletilir; gemi-kıyı zinciri ve irtibat bilgileri Gemi Güvenlik Planı'nda (SSP) tanımlıdır.",
        bulletPoints: [
          "Alarm tüm denize değil, önceden tanımlı kara muhataplarına gider.",
          "Muhataplar genellikle CSO ve/veya bayrak devleti idaresidir.",
          "Testler gerçek alarmla karışmaması için önceden koordine edilir.",
        ],
      },
      {
        title: "Korsanlık Bölgesinde Uygulama (BMP)",
        content:
          "Yüksek riskli korsanlık bölgelerinde SSAS, en iyi yönetim uygulamaları (BMP – Best Management Practices) çerçevesinde bir savunma katmanıdır. Gemi, bölgeye girmeden önce ilgili askeri/koordinasyon merkezlerine kayıt olur ve raporlama yapar; saldırı anında mürettebat güvenli mahale (citadel) çekilirken SSAS tetiklenir ve durum kıyıya iletilir. SSAS tek başına yeterli değildir; fiziksel önlemler, gözcülük, tatbikatlar ve doğru raporlama ile birlikte bütünsel bir güvenlik yaklaşımının parçası olarak çalışır. Mürettebatın tetikleme noktalarının yerini ve prosedürü tatbikatla bilmesi esastır.",
        bulletPoints: [
          "Yüksek riskli bölgelerde BMP'nin bir parçasıdır.",
          "Saldırıda citadel'e çekilirken SSAS tetiklenir.",
          "Fiziksel önlem, gözcülük ve tatbikatla birlikte etkilidir.",
        ],
      },
    ],
    keyPoints: [
      "SSAS, ISPS kapsamında zorunlu, gizli (sessiz) bir güvenlik alarm sistemidir.",
      "GMDSS'in aksine açık yayın yapmaz; yalnızca tanımlı kara muhataplarına bildirir.",
      "En az iki gizli tetikleme noktası vardır ve gemide uyarı üretmez.",
      "Korsanlık bölgelerinde BMP ve citadel uygulamalarıyla birlikte kullanılır.",
    ],
  },

  "LRIT - Uzun Menzilli Tanımlama ve İzleme": {
    title: "LRIT - Uzun Menzilli Tanımlama ve İzleme",
    introduction:
      "LRIT (Long-Range Identification and Tracking), gemilerin küresel ölçekte uzaktan tanımlanması ve izlenmesi için SOLAS kapsamında kurulan bir sistemdir. AIS yerel/menzil içi bir yayın sistemiyken, LRIT bir geminin kimliğini ve konumunu uydu üzerinden, yetkili devletlere kapalı (gizli) bir veri akışı olarak iletir. Bu yönüyle LRIT, açık yayın yapan AIS'ten hem amaç hem de mahremiyet açısından ayrılır.",
    sections: [
      {
        title: "Amaç ve Yasal Dayanak",
        content:
          "LRIT, SOLAS Bölüm V (Seyir Güvenliği) kapsamında, çoğu uluslararası sefer yapan yolcu gemisi, yüksek hızlı tekne, 300 GT ve üzeri yük gemisi ile mobil açıkdeniz sondaj birimleri için zorunludur. Amaç; emniyet, güvenlik (security) ve deniz çevresinin korunması maksadıyla devletlerin kendi bayraklı, kıyılarına yaklaşan veya limanlarına gelecek gemileri izleyebilmesidir. LRIT bir 'izleme' (tracking) sistemidir; çatışmadan kaçınma gibi anlık seyir amaçlı değildir. Veriler yetkili merkezler arasında kontrollü biçimde paylaşılır.",
        image: aisDisplayImage,
        imageAlt: "Vessel tracking display of the kind LRIT reporting feeds",
        bulletPoints: [
          "SOLAS Bölüm V kapsamında belirli gemi türleri için zorunludur.",
          "Amaç: emniyet, güvenlik ve çevre koruma için uzaktan izleme.",
          "Çatışmadan kaçınma için değil, devlet düzeyinde izleme içindir.",
        ],
      },
      {
        title: "İletilen Bilgi ve Raporlama Sıklığı",
        content:
          "LRIT cihazı, geminin kimliğini, konumunu (enlem/boylam) ve konumun alındığı tarih-saati otomatik olarak iletir. Standart raporlama tipik olarak günde birkaç kez (ör. 6 saatte bir) yapılır; ancak veri merkezleri, izleyen devletin talebine göre raporlama sıklığını uzaktan artırabilir veya konum bilgisini anlık talep edebilir (on-demand polling). Bu esneklik, bir gemi belirli bir bölgeye yaklaştığında veya özel bir durumda daha sık takip imkânı verir. AIS'in aksine LRIT verisi herkese açık değildir; yalnızca yetkili taraflar erişebilir.",
        bulletPoints: [
          "İletilen veri: gemi kimliği, konum ve zaman damgası.",
          "Tipik raporlama birkaç saatte bir; uzaktan artırılabilir/anlık sorgulanabilir.",
          "AIS'in aksine veri açık değildir; yalnızca yetkililer erişir.",
        ],
      },
      {
        title: "Sistem Mimarisi: Veri Merkezleri ve IDE",
        content:
          "LRIT, gemilerdeki uydu terminalleri ile birbirine bağlı bir Veri Merkezleri (Data Centre) ağı üzerine kuruludur. Her bayrak devleti bir Ulusal/Bölgesel/Kooperatif veya Uluslararası Veri Merkezi kullanır. Veri merkezleri arasındaki bilgi akışı, IMO tarafından yönetilen Uluslararası Veri Değişim noktası (IDE – International Data Exchange) üzerinden yönlendirilir. Bir devletin hangi gemi verisine erişebileceği, IMO'nun belirlediği Veri Dağıtım Planı'na (DDP – Data Distribution Plan) göre düzenlenir; böylece her devlet yalnızca kendi bayraklı, kıyısına yaklaşan veya limanına gelecek gemilerin verisine erişir.",
        bulletPoints: [
          "Veri Merkezleri ağı + IDE (Uluslararası Veri Değişimi) mimarisi.",
          "Erişim hakları Veri Dağıtım Planı (DDP) ile düzenlenir.",
          "Devletler yalnızca yetkili oldukları gemi verisine erişir.",
        ],
      },
      {
        title: "LRIT ve AIS Karşılaştırması",
        content:
          "LRIT ile AIS sıkça karıştırılır ancak farklı sorunları çözer. AIS, VHF üzerinden yerel ve açık yayın yapar; menzili telsiz ufkuyla sınırlıdır ve esas amacı çatışmadan kaçınma ile yerel durum farkındalığıdır (herkes dinleyebilir). LRIT ise uydu üzerinden küresel kapsama sağlar, daha seyrek rapor üretir ve verisi gizlidir/yalnızca yetkili devletlere açıktır. Özetle AIS 'gemiler birbirini görsün' içindir; LRIT 'devletler gemileri uzaktan izlesin' içindir. İkisi birbirinin yerine geçmez, birbirini tamamlar.",
        bulletPoints: [
          "AIS: VHF, yerel, açık yayın, anlık çatışmadan kaçınma.",
          "LRIT: uydu, küresel, gizli veri, seyrek devlet düzeyi izleme.",
          "Birbirinin yerini almaz; farklı amaçlara hizmet eder.",
        ],
      },
    ],
    keyPoints: [
      "LRIT, gemileri uydu üzerinden küresel ve gizli biçimde izleyen SOLAS sistemidir.",
      "Gemi kimliği, konum ve zaman iletir; raporlama sıklığı uzaktan ayarlanabilir.",
      "Veri Merkezleri + IDE mimarisiyle çalışır; erişim DDP ile sınırlanır.",
      "AIS yerel/açık iken LRIT küresel/gizlidir; ikisi birbirini tamamlar.",
    ],
  },

  "Telsiz Anten Sistemleri ve Acil Güç Kaynakları": {
    title: "Telsiz Anten Sistemleri ve Acil Güç Kaynakları",
    introduction:
      "En iyi telsiz bile, antenine ve güç kaynağına bağlıdır. GMDSS ekipmanının her koşulda — özellikle ana güç kesildiğinde — çalışır kalması, tehlike haberleşmesinin temel güvencesidir. Bu konu; telsiz antenlerinin türleri ve bakımı ile GMDSS'in zorunlu kıldığı yedek (acil) enerji kaynaklarını ele alır.",
    sections: [
      {
        title: "Anten Türleri ve Frekansa Göre Tasarım",
        content:
          "Anten boyutu ve tipi, çalıştığı frekans bandıyla doğrudan ilişkilidir. VHF için kısa, çubuk (whip) tipi anteni yeterlidir; tipik olarak direk veya köprüüstü üstünde, mümkün olan en yüksek ve açık konuma yerleştirilir (telsiz ufku yükseklikle artar). MF/HF için çok daha uzun teller veya kamçı antenler ve bir anten tuneri (ATU – Antenna Tuning Unit) gerekir; bu antenler genellikle gemi gövdesini topraklama düzlemi olarak kullanır. Uydu (Inmarsat/diğer) terminalleri ise yönlü/sabit kubbe antenler kullanır; bazı sistemler uyduyu sürekli takip eden stabilize antene ihtiyaç duyarken, alçak yörünge takımyıldızları daha basit antenlerle çalışabilir.",
        image: inmarsatImage,
        imageAlt: "Satellite antenna radomes and the mast carrying the radio aerials",
        bulletPoints: [
          "VHF: kısa whip anten, mümkün olan en yüksek konum.",
          "MF/HF: uzun tel/kamçı + ATU; gövde topraklama düzlemi.",
          "Uydu: kubbe/yönlü anten; sistemine göre stabilizasyon gerekebilir.",
        ],
      },
      {
        title: "Anten Bakımı ve Yaygın Arızalar",
        content:
          "Anten ve besleme hattı sorunları, haberleşme arızalarının sık görülen ve gözden kaçan nedenidir. Deniz ortamında tuz, nem ve titreşim; konnektörlerde korozyona, kablo girişlerinde su kaçağına ve mekanik gevşemelere yol açar. Düzenli kontrol noktaları: konnektörlerin temiz ve sızdırmaz olması, anten izolatörlerinin kırık/kirli olmaması, topraklama bağlantılarının sağlamlığı ve antenin fiziksel bütünlüğü. Anten sisteminin sağlığı dolaylı olarak verici-alıcı performansından (zayıf menzil, yüksek gürültü) anlaşılabilir; haftalık test çağrılarında alınan/verilen sinyal kalitesi bu açıdan da değerlidir.",
        bulletPoints: [
          "Tuz/nem/titreşim: korozyon, su kaçağı ve gevşeme yapar.",
          "Konnektör, izolatör, topraklama ve fiziksel bütünlük düzenli kontrol edilir.",
          "Zayıf menzil/yüksek gürültü çoğu zaman anten/besleme sorununa işaret eder.",
        ],
      },
      {
        title: "GMDSS İçin Yedek (Acil) Enerji Kaynağı",
        content:
          "SOLAS Bölüm IV, GMDSS ekipmanının ana ve acil güç kaynaklarına ek olarak bir yedek enerji kaynağıyla (reserve source of energy) beslenmesini zorunlu kılar. Bu yedek kaynak (genellikle aküler), gemideki ana ve acil jeneratörlerin ikisi de devre dışı kaldığında dahi tehlike haberleşmesini sürdürebilmelidir. Yedek kaynak; geminin acil jeneratörü varsa en az 1 saat, yoksa en az 6 saat boyunca GMDSS yükünü (asgari tehlike/emniyet haberleşmesi) besleyecek kapasitede olmak zorundadır. Bu kapasite, ekipmanın yarısının verici, yarısının alıcı durumunda çekeceği güce göre hesaplanır.",
        bulletPoints: [
          "GMDSS için ana/acil güce ek bir yedek enerji kaynağı zorunludur.",
          "Acil jeneratör varsa ≥1 saat, yoksa ≥6 saat besleme kapasitesi.",
          "Kapasite, tehlike/emniyet haberleşmesi yükü esas alınarak hesaplanır.",
        ],
      },
      {
        title: "Akü Bakımı ve Testleri",
        content:
          "Yedek enerji kaynağının çalışırlığı, ancak düzenli bakım ve testle güvence altına alınır. Aküler için günlük/haftalık/aylık kontroller tanımlıdır: terminal gerilimi ölçümü, şarj akımının doğrulanması, elektrolit seviyesi/yoğunluğu (sulu tip akülerde), terminallerin temiz ve korozyonsuz olması ve havalandırmanın yeterliliği. Akülerin kapasite (deşarj) testi belirli aralıklarla yapılır ve sonuçlar radyo log defterine kaydedilir; düşen kapasiteli aküler zamanında değiştirilir. PSC denetimlerinde GMDSS yedek güç kayıtları sık kontrol edilen alanlardandır; bu nedenle test ve değişim disiplini doğrudan uyumluluğu etkiler.",
        bulletPoints: [
          "Akülerde günlük/haftalık/aylık kontroller standarttır (gerilim, şarj, elektrolit).",
          "Periyodik kapasite (deşarj) testi yapılır ve log'a kaydedilir.",
          "Düşük kapasiteli aküler zamanında değiştirilir; PSC bu kayıtları kontrol eder.",
        ],
      },
    ],
    keyPoints: [
      "Anten tipi frekansa bağlıdır: VHF whip, MF/HF tel+ATU, uydu kubbe anteni.",
      "Anten/besleme arızaları (korozyon, su kaçağı) haberleşme sorunlarının sık nedenidir.",
      "GMDSS için yedek enerji kaynağı zorunludur: acil jeneratör varsa ≥1, yoksa ≥6 saat.",
      "Akü bakımı, kapasite testi ve log kaydı uyumluluğun ön koşuludur.",
    ],
  },
};
