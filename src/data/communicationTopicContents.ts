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
          "GMDSS **dört deniz alanı (sea area)** tanımlar ve her alan, o bölgede tehlike alarmı iletebilen **kapsama altyapısına** göre belirlenir; bu sınıflandırma doğrudan gemide taşınacak ekipmanı belirler.\n\n**A1 alanı:** En az bir **VHF kıyı istasyonunun DSC (Digital Selective Calling)** kapsaması altındaki bölge; tipik menzil **20–30 deniz mili**. **A2 alanı:** A1 dışında kalan ama bir **MF (orta frekans) kıyı istasyonunun DSC** kapsamasındaki bölge; menzil tipik olarak **~100–150 deniz mili**.\n\n**A3 alanı:** A1/A2 dışında kalan ama **Inmarsat uydu** kapsamasındaki bölge; kabaca **70°K – 70°G** enlemleri arası (kutuplar hariç neredeyse tüm dünya). **A4 alanı:** bunların dışında kalan **kutup bölgeleri**; burada temel iletişim aracı **HF (yüksek frekans)** radyodur (uydu kapsaması zayıftır).\n\n**Gemide önemi:** Bir geminin seyredeceği en uzak deniz alanı, taşıması zorunlu haberleşme setini belirler; kaptan/telsiz zabiti, sefer planındaki alanları bilerek ekipmanın (ve yeterlilik belgesinin) uygunluğunu doğrular. Yanlış değerlendirilen bir alan, tehlikede alarmın hiç ulaşamaması demektir.",
        formula: {
          text: "A1: VHF-DSC ~20–30 NM · A2: MF-DSC ~100 NM · A3: Inmarsat 70°K–70°G · A4: kutup/HF",
          description: "Deniz alanı kapsama altyapısına göre tanımlanır ve zorunlu GMDSS ekipmanını belirler",
        },
      },
      {
        title: "Ekipman Gereklilikleri",
        content:
          "Geminin seyir planına dâhil olan **en uzak deniz alanı**, taşınması gereken **minimum ekipman setini** belirler; her alan bir öncekinin ekipmanına ekleme yapar.\n\n**Tüm alanlarda ortak zorunlu ekipman:** **VHF-DSC** telsiz, **NAVTEX** alıcısı, **EPIRB (406 MHz)**, **SART veya AIS-SART**, ve **taşınabilir VHF** setleri (en az 2–3 adet).\n\n**Alana göre eklenen ekipman:** **A1 dışına** çıkan gemiler ek olarak **MF-DSC** telsiz; **A2 dışına** çıkanlar **Inmarsat terminal veya MF/HF-DSC**; **A3 dışına (A4)** çıkanlar **HF-DSC** telsiz taşımak zorundadır. Ekipman kombinasyonu bayrak devleti onayına, gemi tipine ve tonajına göre detaylandırılır.\n\n**Kapsam ve önem:** **300 GT ve üzeri** uluslararası sefer yapan tüm ticari gemiler GMDSS uyumlu olmak zorundadır. **Gemide önemi:** Ekipman seti sefer bölgesiyle eşleşmezse gemi ya yasal olarak sefere çıkamaz ya da tehlikede alarm veremez; bu yüzden sefer planı değiştiğinde (örn. A2'den A3'e) ekipman uygunluğu önceden doğrulanır.",
      },
      {
        title: "Bakım ve Çalışırlık Gereklilikleri",
        content:
          "GMDSS uyumluluğu, ekipmanın yalnızca **gemide bulunmasıyla** değil, **çalışır durumda** olması, düzenli test/bakımının yapılması ve kayıt tutulmasıyla sağlanır.\n\n**Üç bakım yöntemi (SOLAS Bölüm IV):** **denizde bakım** (kısıtlı), **kıyıda bakım** (servis sözleşmesi) ve **yedek ekipman bulundurma**. Çoğu gemi **kıyıda bakım + sınırlı yedek ekipman** kombinasyonunu kullanır; A3/A4 gemilerinde en az iki bağımsız yöntem gerekebilir.\n\n**Test prosedürleri:** Haftalık ve aylık testler yapılır — **DSC test çağrıları**, **EPIRB dâhili testi**, **SART testi**, **NAVTEX alım kontrolü**, **batarya durumu** ve **son kullanma tarihleri**nin doğrulanması. Sonuçlar **radyo log defterine** kaydedilir.\n\n**Gemide önemi:** Bu testler PSC (Port State Control) denetimlerinde **ilk kontrol edilen** alanlar arasındadır; çalışmayan bir EPIRB veya kaydı tutulmamış bir test, hem denetim eksikliği (deficiency) hem gerçek bir acil durumda ölümcül bir başarısızlık demektir. Son kullanma tarihi geçmiş bataryalı bir GMDSS seti, kâğıt üzerinde uyumlu ama fiilen işlevsiz olabilir.",
      },
      {
        title: "GMDSS Operatör Yeterliliği",
        content:
          "GMDSS ekipmanını kullanacak personelin uygun **operatör yeterlilik belgesine** sahip olması zorunludur; ekipman ne kadar iyi olursa olsun, doğru kullanılmazsa işe yaramaz.\n\n**Belge türleri:** **GOC (General Operator Certificate)** tüm GMDSS ekipmanlarını kullanma yetkisi verir (A1–A4, tüm sistemler); **ROC (Restricted Operator Certificate)** ise yalnızca **A1 ve A2** alanlarında geçerlidir (VHF/MF-DSC). Zabitlerin STCW yeterlilik belgelerinde GMDSS yetkinliği ayrıca belirtilir.\n\n**Tatbikat şart:** **Tehlike çağrısı prosedürleri, DSC kullanımı ve EPIRB aktivasyonu** düzenli tatbikatlarla pekiştirilir; çünkü gerçek acil durum, prosedürü ilk kez uygulamayı öğrenme anı olamaz.\n\n**Gemide önemi:** Panik ve stres altında ancak defalarca tekrarlanmış (kas hafızası hâline gelmiş) bir prosedür doğru uygulanır; bir MAYDAY çağrısında tereddüt veya yanlış tuş, hayat maliyeti taşır. Bu yüzden yeterlilik belgesi bir başlangıçtır, düzenli tatbikat ise sürekliliktir.",
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
          "**DSC (Digital Selective Calling)**, belirli bir frekans üzerinden (**VHF Ch.70**) dijital çağrı yapılmasını sağlayan otomatik bir sistemdir; sesli çağrının aksine çağrı **hedefli, otomatik ve izlenebilirdir**.\n\n**MMSI ile kimlik:** Her geminin benzersiz bir **MMSI (Maritime Mobile Service Identity)** numarası vardır ve DSC çağrısı bu numara üzerinden gerçekleşir — yani çağrı belirli bir gemiye veya kıyı istasyonuna 'adreslenebilir'.\n\n**Çağrı tipleri ve içerik:** Dört öncelik vardır — **tehlike (distress), aciliyet (urgency), emniyet (safety) ve rutin (routine)**. Bir DSC çağrısında **çağrı tipi, MMSI, mevki** (GPS bağlıysa otomatik), **çağrılan istasyon** ve iletişimin sürdürüleceği **çalışma kanalı** dijital olarak iletilir; karşı tarafın DSC alıcısı bunları otomatik çözer, ekranda gösterir ve alarm verir.\n\n**Gemide önemi:** DSC, tehlikede tek tuşla mevki dâhil eksiksiz bir alarmın saniyeler içinde doğru adrese ulaşmasını sağlar; sesli çağrının aksine dil engeli veya kaçırılma riski düşüktür. Bu yüzden MMSI'nin doğru programlanması ve GPS bağlantısının çalışması hayatidir.",
      },
      {
        title: "VHF Kanalları ve Kullanım Disiplini",
        content:
          "VHF kanallarının doğru kullanımı, köprüüstü haberleşmesinin hem düzenini hem emniyetini belirler.\n\n**Kritik kanallar:** **Ch.16 (156.800 MHz)** uluslararası **tehlike, emniyet ve çağrı** kanalıdır; GMDSS gemileri Ch.16'yı sürekli dinlemekle yükümlüdür (DSC devreye girdikten sonra **Ch.70** otomatik izleme birincil alarm kanalı olmuştur). **Ch.13** köprüüstü-köprüüstü **manevra/emniyet** haberleşmesi (dar su geçişi, çatışmadan kaçınma) için ayrılmıştır. Liman için **VTS kanalları** (genellikle Ch.12/Ch.14 veya bölgesel atanmış) kullanılır.\n\n**Disiplin:** Gereksiz uzun konuşma, standart dışı ifadeler ve teyitsiz komutlar köprüüstü emniyetini düşürür. **SMCP (Standard Marine Communication Phrases)** kullanımı yanlış anlamayı önemli ölçüde azaltır.\n\n**Gemide önemi:** Yoğun trafikte veya dar suda, yanlış kanal veya belirsiz bir komut bir çatışmaya giden zincirin halkası olabilir; doğru kanal seçimi ve standart ifadeler, iki köprüüstünün niyetini net paylaşmasını sağlar. Ch.16'nın gereksiz sohbetle meşgul edilmemesi de gerçek bir tehlike çağrısının duyulması için kritiktir.",
        formula: {
          text: "Ch.16 tehlike/çağrı · Ch.70 DSC alarm · Ch.13 köprü-köprü manevra · Ch.12/14 VTS",
          description: "GMDSS gemileri Ch.16 ve Ch.70'i sürekli dinler; SMCP standart ifadeleri yanlış anlamayı azaltır",
        },
      },
      {
        title: "Tehlike Çağrısı Prosedürü",
        content:
          "VHF-DSC ile tehlike çağrısı iki aşamalıdır: önce **dijital DSC alarmı**, ardından **sesli MAYDAY**.\n\n**DSC alarmı (adımlar):** (1) DSC cihazında **tehlike (distress) butonu** açılır (genellikle koruyucu kapak altında); (2) **tehlike tipi** seçilir (batma, yangın, terk-i gemi, çatışma vb.); (3) GPS bağlıysa **mevki otomatik** eklenir, değilse manuel girilir; (4) tehlike butonu **basılı tutularak** çağrı **Ch.70** üzerinden gönderilir.\n\n**Sesli MAYDAY:** Çağrı gönderildikten sonra (5) **Ch.16'ya** geçilir ve prosedüre uygun sesli mesaj verilir: 'MAYDAY MAYDAY MAYDAY, this is [gemi adı] [çağrı işareti] [MMSI], MAYDAY [gemi adı], my position is [...], I am [tehlike türü], I require [yardım talebi], [kişi sayısı] persons on board, over.' **Teyit alınana kadar** mesaj tekrarlanır.\n\n**Gemide önemi:** DSC alarmı 'kim, nerede, ne' bilgisini saniyede iletir; sesli MAYDAY ise detayı ve insani teması sağlar. İkisinin birlikte ve doğru sırayla yapılması, kurtarma birimlerinin gemiyi hızla bulup doğru kaynakla gelmesini belirler — bu yüzden prosedür ezbere bilinmeli ve tatbik edilmelidir.",
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
          "VHF-DSC cihazının **haftalık test çağrısı** yapılması ve sonucunun **radyo log defterine** kaydedilmesi standart prosedürdür.\n\n**Test nasıl yapılır:** Test çağrısı **'routine' önceliğinde** yapılır ve yakındaki bir kıyı istasyonu veya başka bir gemiyle gerçekleştirilir. Bu sırada **GPS bağlantısının** çalıştığı, **MMSI'nin** doğru programlandığı ve **antenin** sağlam olduğu kontrol edilir.\n\n**Yedekler ve ses kalitesi:** Yedek VHF setlerinin **batarya durumu ve kanal ayarları** düzenli doğrulanır. DSC dışında **ses kalitesi** (squelch ayarı, anten performansı) da operasyonel haberleşmeyi doğrudan etkiler.\n\n**Gemide önemi:** Düzenli test, cihazın 'gerçekten çalıştığını' garanti eder; bir tehlike anında ilk kez fark edilen bir GPS kopukluğu veya bozuk anten, alarmı işe yaramaz hâle getirir. Kayıtlı testler ayrıca PSC denetiminde geminin GMDSS hazırlığını kanıtlar.",
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
          "**MAYDAY**, geminin veya gemideki kişilerin **ciddi ve yakın tehlike** altında olduğu ve **acil yardım** gerektiği durumlarda kullanılan en yüksek önceliktir. Batma, kontrolsüz yangın, terk-i gemi, çatışma sonrası su alma gibi durumlar MAYDAY gerektirir.\n\n**Mutlak öncelik — SEELONCE MAYDAY:** MAYDAY yayını tüm diğer haberleşmenin önüne geçer; yayın yapıldığında, bununla ilgisi olmayan tüm istasyonlar **sessizliğe geçer (SEELONCE MAYDAY)**. Böylece tehlike trafiği hiçbir gürültüyle bozulmaz.\n\n**Mesaj formatı:** Standart ve kısadır — **gemi kimliği, mevki, tehlike türü, yardım talebi ve gemideki kişi sayısı**. **MAYDAY RELAY**, tehlikedeki gemi adına başka bir geminin veya kıyı istasyonunun alarm yayması durumunda kullanılır (gemi kendisi yayın yapamıyorsa).\n\n**Gemide önemi:** MAYDAY, yardım zincirini başlatan tetiktir; mevkinin ve kişi sayısının doğru verilmesi, kurtarma birimlerinin nereye ve ne kadar kaynakla geleceğini belirler. Eksik veya yanlış bir MAYDAY, kurtarmayı geciktirir veya yanlış yere yönlendirir.",
      },
      {
        title: "Aciliyet Haberleşmesi (PAN PAN)",
        content:
          "**PAN PAN**, **acil ancak hayati-yakın tehlike oluşturmayan** durumlar için kullanılır ve MAYDAY'den sonraki en yüksek önceliktir.\n\n**Ne zaman:** Tıbbi acil durum (personel yaralanması, hastalık), makine arızası nedeniyle **manevra kaybı**, seyir tehlikesi (sürüklenen konteyner, kayıp nesne) gibi durumlar. Tıbbi danışma talepleri (**MEDICO**) da PAN PAN önceliğiyle yapılır.\n\n**Nasıl:** Mesaj **Ch.16** üzerinden yayınlanır ve gerekirse tekrarlanır; normal trafiğin önüne geçer. Durum kötüleşirse **PAN PAN, MAYDAY'e yükseltilebilir**.\n\n**Gemide önemi:** PAN PAN, 'yardıma ihtiyacım var ama henüz batmıyorum' mesajıdır; doğru kullanımı hem gereksiz bir MAYDAY paniğini önler hem gerçek acil durumu görünür kılar. Örneğin makine arızasıyla trafik ayrım şemasında sürüklenen bir gemi, PAN PAN ile çevredeki gemileri erkenden uyarıp çatışmayı önler.",
      },
      {
        title: "Emniyet Haberleşmesi (SECURITE)",
        content:
          "**SÉCURITÉ**, **seyir emniyeti veya meteorolojik emniyet** ile ilgili önemli duyurular için kullanılan en düşük öncelikli emniyet mesajıdır.\n\n**Ne zaman:** Fener arızası, sürüklenen mayın/konteyner, yeni keşfedilen sığ alan, **fırtına uyarısı**, büyük enkaz gibi **tüm denizcilerin bilmesi gereken** bilgiler. Kıyı istasyonları ve VTS merkezleri SÉCURITÉ mesajlarını düzenli yayınlar.\n\n**Dinleme yükümlülüğü:** En düşük öncelikli olsa da, tüm istasyonlar SÉCURITÉ mesajlarını **dinlemek ve gerekiyorsa not almakla** yükümlüdür; genellikle Ch.16'da duyurulur, detay bir çalışma kanalında verilir.\n\n**Gemide önemi:** SÉCURITÉ mesajları, bir tehlikeyi 'olmadan önce' önlemenin yoludur; sürüklenen bir konteyner uyarısını dinleyen bir gemi, gözcülüğünü artırıp çarpışmadan kaçınır. Bu yüzden 'sadece emniyet mesajı' diye göz ardı edilmez, seyir kararlarına entegre edilir.",
      },
      {
        title: "Öncelik Yönetimi ve Yaygın Hatalar",
        content:
          "**Doğru öncelik seçimi**, operasyonel disiplinin göstergesidir ve yanlış seçim iki yönde de zarar verir.\n\n**Aşırı ve yetersiz tepki:** **MAYDAY'in gereksiz kullanımı**, SAR kaynaklarını boşa harcar ve gerçek acil durumlarda güven kaybına yol açar. **PAN PAN durumunu MAYDAY** olarak bildirmek aşırı tepkiye; **MAYDAY durumunu PAN PAN** olarak bildirmek ise **yetersiz müdahaleye** neden olur — bu ikincisi çok daha tehlikelidir (yardım geç veya eksik gelir).\n\n**Tatbikat ve kayıt:** Her üç öncelik için mesaj formatları ve prosedürler **düzenli tatbik** edilmelidir; gerçekçi senaryolar, stres altında doğru karar kapasitesini artırır. Tüm tehlike/aciliyet/emniyet haberleşmeleri **radyo log defterine** ayrıntılı kaydedilir.\n\n**Gemide önemi:** Bir acil durumda öncelik seçimi saniyeler içinde ve doğru yapılmalıdır; bu ancak önceden içselleştirilmiş bir ayrımla mümkündür. Yanlış öncelik hem hayat hem hukuki sorumluluk (yanlış alarm cezası veya yetersiz müdahale suçlaması) doğurabilir.",
        formula: {
          text: "MAYDAY: ciddi/yakın tehlike · PAN PAN: acil, ölümcül değil · SÉCURITÉ: seyir/meteo uyarısı",
          description: "MAYDAY tüm trafiğin önüne geçer (SEELONCE MAYDAY); yanlış öncelik hem emniyet hem hukuki risktir",
        },
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
          "**NAVTEX**, **518 kHz (uluslararası)** ve **490 kHz (ulusal)** frekanslarında otomatik olarak **metin mesajları** ileten bir radyo teleks sistemidir; ekstra işleme gerek kalmadan mesajları yazdırır/gösterir.\n\n**Menzil ve kapsama:** Menzili yaklaşık **200–400 deniz mili** olduğundan esas olarak **kıyıya yakın (A1/A2)** bölgelerde hizmet verir.\n\n**Mesaj kodlaması:** Her mesaj **dört karakterli** bir tanımlayıcı taşır: 1. harf **istasyonu**, 2. harf **mesaj türünü** (A: seyir uyarısı, B: meteoroloji, D: SAR bilgisi vb.), son iki rakam **sıra numarasını** gösterir. Alıcı, daha önce alınmış mesajları **otomatik filtreler** (tekrar yazmaz). Mesaj türleri seçilebilir; ancak **A (seyir uyarısı), B (meteoroloji), D (SAR) ve L (NAVAREA)** her zaman açık tutulur — devre dışı bırakılamaz.\n\n**Gemide önemi:** NAVTEX, seyir zabitinin kıyı bölgesindeki tehlikeleri (yeni sığlık, fener arızası, fırtına) hiçbir talep göndermeden otomatik öğrenmesini sağlar; A/B/D/L tiplerinin kapalı olması, kritik bir uyarının hiç alınmaması demektir — bu yüzden bunlar kilitlidir.",
        formula: {
          text: "NAVTEX: 518 kHz (uluslararası) / 490 kHz (ulusal) · menzil ~200–400 NM · A/B/D/L kilitli",
          description: "A seyir uyarısı, B meteoroloji, D SAR, L NAVAREA; açık deniz (A3) için SafetyNET kullanılır",
        },
      },
      {
        title: "SafetyNET Sistemi",
        content:
          "**SafetyNET**, **Inmarsat-C** uydu terminali üzerinden çalışan **EGC (Enhanced Group Call)** sistemidir; NAVTEX'in ulaşamadığı **açık deniz (A3)** bölgelerinde MSI dağıtımını sağlar.\n\n**Hedefli yayın:** SafetyNET belirli **coğrafi alanları (NAVAREA/METAREA)**, dikdörtgen veya dairesel bölgeleri hedefleyerek yayın yapabilir; böylece gemi yalnızca **kendi seyir alanıyla** ilgili mesajları alır (gereksiz bilgi yükünü önler).\n\n**Kutup istisnası:** **Kutup bölgelerinde (A4)** Inmarsat kapsaması zayıf olduğundan MSI, **HF radyo** veya alternatif uydu sistemleriyle (Iridium vb.) alınır. SafetyNET mesajları da seyir uyarıları, meteorolojik tahminler ve SAR koordinasyon bilgilerini içerir.\n\n**Gemide önemi:** Açık okyanusta NAVTEX menzil dışıdır; SafetyNET, geminin dünyanın her yerinde kendi bölgesine ait emniyet bilgisini almasını sağlar. Cihazın doğru bölgeye (NAVAREA) programlanmaması, kritik bir uyarının hedef dışı kalıp alınmamasına yol açar.",
      },
      {
        title: "MSI Değerlendirme ve Kayıt Prosedürü",
        content:
          "Alınan MSI mesajları yalnızca **alınmakla kalmaz**, seyir zabiti tarafından **derhâl değerlendirilir** ve seyre entegre edilir.\n\n**Ne yapılır:** **Seyir uyarıları** harita üzerine işlenir; rota etkisi varsa **kaptan bilgilendirilir** ve plan gerekirse revize edilir. **Meteorolojik tahminler** hava değerlendirmesine katılır. **SAR duyuruları** gözcülük ve CPA hesabıyla desteklenir.\n\n**Kayıt:** Tüm mesajlar kronolojik dosyalanır ve **radyo log defterine** kayıt düşülür. **PSC denetimleri**, MSI alım kayıtlarını ve NAVTEX/SafetyNET cihazlarının çalışırlığını kontrol eder; yetersiz kayıt veya arıza **eksiklik (deficiency)** olarak yazılır.\n\n**Gemide önemi:** Bir uyarı alınıp haritaya işlenmezse hiç alınmamış gibidir; birçok karaya oturma, alınan ama değerlendirilmeyen bir seyir uyarısından doğmuştur. MSI'nin 'alım–değerlendirme–işleme–kayıt' döngüsünü kapatmak, emniyetli seyrin bir parçasıdır.",
      },
      {
        title: "NAVAREA ve METAREA Sistemi",
        content:
          "Dünya denizleri, sorumluluğu paylaştırmak için **21 NAVAREA** bölgesine ayrılmıştır; her NAVAREA'da bir **koordinatör ülke** seyir uyarılarını yönetir. Benzer şekilde **METAREA** bölgeleri **meteorolojik** tahmin/uyarı sorumluluğunu bölüştürür.\n\n**Programlama:** Gemiler, seyir planındaki **NAVAREA/METAREA** yayınlarını alacak şekilde NAVTEX ve SafetyNET cihazlarını **programlamalıdır**; bölge değiştikçe ayarlar güncellenir.\n\n**Yürürlükteki uyarılar:** **In-force NAVAREA uyarıları** listesi düzenli kontrol edilir — süresi geçmiş uyarılar kaldırılır, yeni uyarılar haritaya işlenir.\n\n**Gemide önemi:** Bir okyanus geçişinde gemi birden çok NAVAREA/METAREA'dan geçer; cihazın bir sonraki bölgeye zamanında ayarlanmaması, o bölgenin uyarılarının hiç alınmaması demektir. Bu yüzden bölge sınırları, MSI ayarlarıyla birlikte sefer planına işlenir.",
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
          "**406 MHz EPIRB**, **COSPAS-SARSAT** uydu sistemi üzerinden tehlike sinyali iletir; bu sinyal geminin **kimliğini** (MMSI/kayıt numarası), **GPS pozisyonunu** (GPS modüllüyse) ve tehlike durumunu içerir.\n\n**Sinyalin yolculuğu:** COSPAS-SARSAT uyduları sinyali alır ve **LUT (Local User Terminal)** istasyonlarına aktarır; LUT de ilgili **MRCC (Maritime Rescue Coordination Centre)**'ye iletir. Böylece alarm dakikalar içinde kurtarma koordinasyon merkezine ulaşır.\n\n**Konum doğruluğu:** **GPS entegreli** EPIRB ile konum ~**100 m**'ye iner; GPS'siz modellerde konum **Doppler etkisiyle** belirlenir — bu daha yavaş ve daha az doğrudur (**2–5 km**). Ayrıca EPIRB, **121.5 MHz homing** sinyali yayarak uçak/helikopterin yakın mesafede **yön bulmasını** sağlar.\n\n**Gemide önemi:** EPIRB, gemi tümüyle kaybolsa bile 'buradayım, tehlikedeyim' diyen küresel bir çığlıktır; GPS'li bir EPIRB, kurtarmayı 5 km'lik bir daireden 100 m'lik bir noktaya indirger — bu, açık denizde hayatta kalma süresi içinde bulunmakla bulunmamak arasındaki farktır.",
        formula: {
          text: "EPIRB: 406 MHz (COSPAS-SARSAT alarm) + 121.5 MHz (homing) · GPS'li ~100 m, GPS'siz 2–5 km",
          description: "Sinyal uydu → LUT → MRCC'ye ulaşır; float-free HRU gemi batınca EPIRB'i otomatik serbest bırakır",
        },
      },
      {
        title: "EPIRB Montajı, Bakımı ve Kayıt",
        content:
          "EPIRB, **float-free** montaj aparatı olan bir **hidrostatik serbest bırakma ünitesine (HRU — Hydrostatic Release Unit)** yerleştirilmiş olarak taşınır.\n\n**Otomatik ve manuel aktivasyon:** Gemi belirli bir derinliğe battığında (genellikle **1.5–4 m**), HRU EPIRB'i **otomatik serbest bırakır**; EPIRB yüzeye çıkıp **kendiliğinden aktive** olur. **Manuel aktivasyon** da mümkündür (zaman varsa tercih edilir).\n\n**Bakım tarihleri ve kayıt:** **HRU son kullanma tarihi** (genellikle ~2 yıl), **EPIRB bataryası** (genellikle ~5 yıl) ve **yıllık servis** tarihi düzenli kontrol edilir. EPIRB ulusal otoriteye kayıtlı olmalı (gemi adı, MMSI, acil durum irtibatı) ve bilgiler değiştikçe **güncellenmelidir**.\n\n**Gemide önemi:** Süresi geçmiş bir HRU, gemi batarken EPIRB'i serbest bırakmayabilir — yani cihaz var ama işlevsizdir. **Güncel olmayan kayıt** ise SAR'ı geciktirir: merkez, alarmın hangi gemiden geldiğini ve kimi arayacağını bilemez. Bu yüzden tarih ve kayıt kontrolü, cihazın varlığı kadar hayatidir.",
      },
      {
        title: "SART ve AIS-SART",
        content:
          "**SART (Search and Rescue Transponder)**, kurtarma birimlerini hayatta kalanlara **yönlendiren** bir cihazdır; iki tipi vardır.\n\n**Radar SART:** **9 GHz radar** frekansında çalışır; arama biriminin radar sinyalini alıp yanıt verir ve o radarın ekranında **seri 12 nokta** hâlinde belirir (kurtarma aracını can salına doğru yönlendirir). Dezavantajı **sınırlı menzildir** (~5–8 NM, anten yüksekliğine bağlı).\n\n**AIS-SART:** **AIS frekanslarında** çalışan modern alternatiftir; sinyali, çevredeki tüm gemilerin **AIS ekranında** belirgin bir simge ve **pozisyon bilgisiyle** görünür. Menzili radar SART'a göre daha iyidir. Her iki tip de SOLAS'ça kabul edilir; **yeni gemilerde AIS-SART** tercih edilmektedir.\n\n**Gemide önemi:** EPIRB kurtarmayı bölgeye getirir, SART ise son mili kapatır — can salını radar/AIS ekranında görünür kılarak. Özellikle kötü görüşte (sis, gece, yüksek dalga) gözle görülemeyen bir can salı SART sayesinde bulunur; bu yüzden terk-i gemide SART, EPIRB ile birlikte cana taşınır.",
      },
      {
        title: "Test Prosedürleri ve Tatbikat Entegrasyonu",
        content:
          "Cihazların gerçek anda çalışacağından emin olmanın tek yolu **düzenli test ve tatbikattır**.\n\n**Test:** **EPIRB dâhili test** butonuyla **aylık** test yapılır — bu test uydu sinyali **göndermez**, yalnızca iç devreleri kontrol eder (yanlışlıkla gerçek alarm verilmez). **SART/AIS-SART** de test modunda çalıştırılıp fonksiyon kontrol edilir. Tüm sonuçlar tarih/saat ile **radyo log defterine** kaydedilir.\n\n**Tatbikat entegrasyonu:** **Terk-i gemi tatbikatlarında** EPIRB ve SART'ın can kurtarma aracına **aktarım prosedürü** pratik edilir: cihazın yeri, taşınması, aktivasyonu ve can salına yerleştirilmesi. Gerçek terk-i gemide, float-free mekanizmaya güvenmenin yanı sıra — zaman ve koşullar izin veriyorsa — EPIRB'in **manuel alınıp** cana taşınması tercih edilir.\n\n**Gemide önemi:** Bir mürettebat cihazın yerini ve nasıl aktive edileceğini panik anında değil, önceden bilmelidir; tatbik edilmemiş bir prosedür, gerçek terk-i gemide kaybolan saniyeler demektir. Aylık test ise cihazın 'kâğıt üzerinde değil gerçekten' hazır olduğunu güvence altına alır.",
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
          "SMCP, güvenlik açısından kritik neredeyse tüm sözlü haberleşmede kullanılır: **çatışmadan kaçınma** manevralarında köprüüstü-köprüüstü görüşmede, **VTS** bölgelerinde mevki/niyet bildiriminde, **kılavuz alma-bırakma, römorkaj, demirleme ve yanaşma** operasyonlarında, **gemi içi komutlarda** (dümen ve makine komutları, mooring komutları) ve **arama-kurtarma** koordinasyonunda.\n\n**Standart komut örnekleri:** Dümen komutları — 'Hard-a-starboard' (alabanda sancak), 'Midships' (ortala), 'Steady' / 'Steady as she goes' (rotada tut). Bu komutlar sabit, kısa ve tek anlamlıdır; dümenci hangi dilde konuşursa konuşsun aynı tepkiyi verir.\n\n**Gemide önemi:** Standart ifadelerin dışına çıkmak, özellikle **çok uluslu mürettebatta**, yanlış anlama ve emniyet riskini artırır; 'biraz sağa' gibi belirsiz bir komut, dar suda bir dümenci hatasına ve çatışmaya dönüşebilir. SMCP, herkesin aynı sözcüğü aynı şekilde anlamasını garanti ederek bu riski keser.",
      },
    ],
    keyPoints: [
      "SMCP, IMO A.918(22) ile kabul edilmiştir ve STCW İngilizce yeterliliğinin parçasıdır.",
      "Sekiz mesaj işareti: Instruction, Advice, Warning, Information, Question, Answer, Request, Intention.",
      "Sayılar rakam rakam, harfler fonetik alfabeyle okunur.",
      "Kapalı döngü teyit (read back / say again) yanlış anlamayı önler.",
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
          "Telsizde harfler, gürültü ve parazitte karışmasınlar diye tek tek söylenmez; her harf standart bir kelimeyle (**fonetik alfabe / NATO alfabesi**) kodlanır: A-Alfa, B-Bravo, C-Charlie, D-Delta, E-Echo, F-Foxtrot, G-Golf, H-Hotel, I-India, J-Juliett, K-Kilo, L-Lima, M-Mike, N-November, O-Oscar, P-Papa, Q-Quebec, R-Romeo, S-Sierra, T-Tango, U-Uniform, V-Victor, W-Whiskey, X-X-ray, Y-Yankee, Z-Zulu.\n\n**Nerede kullanılır:** Çağrı işaretleri (call sign), gemi adları ve kritik kelimelerin **hecelenmesinde**. Örneğin 'TCA' çağrı işareti **'Tango Charlie Alfa'** olarak okunur.\n\n**Gemide önemi:** 'B' ile 'D', 'M' ile 'N' gibi harfler telsizde kolayca karışır; 'Bravo' ile 'Delta' ise karışmaz. Bir MMSI, çağrı işareti veya mevki harfinin yanlış anlaşılması, yanlış gemiyle iletişim veya yanlış konum demektir — fonetik alfabe bu hatayı kökten önler.",
      },
      {
        title: "Sayıların ve Ondalıkların Okunması",
        content:
          "Harfler gibi **sayılar da** yanlış anlaşılmayı önleyecek biçimde okunur: rakam rakam. Örneğin 'Channel 16' → **'Channel one six'**; 'one sixteen' denmez.\n\n**Ondalık ve birimler:** Ondalık ayraç **'decimal'** (bazı uygulamalarda 'point') olarak söylenir: 156.8 MHz → **'one five six decimal eight'**. Kritik sayılar, yanlış anlamayı önlemek için **tekrar ettirilir (read back)**.\n\n**Gemide önemi:** Bu disiplin özellikle **frekans/kanal, mevki (enlem-boylam), rota ve hız** bilgilerinde hayatidir; tek bir yanlış rakam, yanlış kanalda beklemeye, yanlış mevkiye kurtarma göndermeye veya yanlış rotaya dönmeye yol açar. Rakam rakam okuma + read back, bu sayısal hataları yakalar.",
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
          "Telsizde **gereksiz uzun konuşma, kanal işgali ve standart dışı ifadeler** emniyeti düşürür; kanal ortak bir kaynaktır ve doğru kullanılmalıdır.\n\n**Konuşma protokolü:** Konuşmadan önce **kanal dinlenir** (başka trafik var mı?); **PTT (bas-konuş)** düğmesine basıldıktan **kısa bir an sonra** konuşulur (ilk hece kesilmesin); cümleler **kısa ve standart** tutulur. Köprüüstü-köprüüstü manevrada **SMCP** ifadeleri ve **kapalı döngü teyit (closed-loop)** kullanılır.\n\n**Mesaj formatı:** Genellikle — çağrılan istasyon adı + **'this is'** + kendi adı + mesaj + **OVER**.\n\n**Gemide önemi:** Ch.16 gibi bir tehlike/çağrı kanalını gereksiz sohbetle meşgul etmek, gerçek bir MAYDAY'in duyulmamasına yol açabilir; disiplinli, kısa ve standart konuşma hem kanalı açık tutar hem yanlış anlamayı önler. İyi telsiz disiplini, iyi denizciliğin işitilebilir bir göstergesidir.",
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
          "**SOLAS Bölüm IV** gereği gemi, seyir hâlindeyken belirli kanal ve frekansları **sürekli dinlemek (nöbet/watch)** zorundadır; bu, tehlike çağrılarının hiç kaçırılmamasını sağlar.\n\n**Tutulan nöbetler:** **VHF Ch.70 DSC** otomatik izleme; sefer alanına göre **MF Ch.2187.5 kHz DSC** ve/veya **HF DSC** tehlike frekansları; **NAVTEX (518 kHz)** otomatik alım; ve uygun olduğunda **Inmarsat MSI** alımı. **Ch.16 sesli** dinleme, DSC'ye geçişten sonra da pek çok gemide sürdürülür.\n\n**Nasıl sağlanır:** Nöbet, ekipmanın **açık ve doğru ayarlı** tutulmasıyla otomatik sağlanır; operatörün görevi, gelen **alarmlara tepki vermektir**.\n\n**Gemide önemi:** Bu nöbet, bir başka geminin MAYDAY'inin veya bir seyir uyarısının duyulmasının tek garantisidir; kapatılmış veya yanlış ayarlı bir DSC alıcısı, yakındaki bir tehlikeyi hiç fark etmemek demektir. Bu yüzden nöbet frekansları asla operatör keyfine bırakılmaz.",
        formula: {
          text: "Sürekli nöbet: VHF Ch.70 DSC · MF 2187.5 kHz DSC · HF DSC · NAVTEX 518 kHz · Ch.16 sesli",
          description: "SOLAS Bölüm IV; sefer alanına göre değişir. Ekipman açık/ayarlı tutulur, operatör alarmlara tepki verir",
        },
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
          "GMDSS ekipmanı üç katmanlı güçle beslenir: **ana güç**, **acil güç (jeneratör)** ve **yedek güç kaynağı (akü/batarya)** — çünkü tehlike anı, tam da gücün kesildiği an olabilir.\n\n**Yedek akü kapasitesi:** Yedek akü, ana ve acil güç kesildiğinde GMDSS ekipmanını belirli bir süre çalıştıracak kapasitede olmalıdır — gemide acil güç kaynağı varsa genellikle **1 saat**, yoksa **6 saat**.\n\n**Kontrol:** Akü durumu düzenli **test edilir ve loglanır**; antenler, sigortalar ve bağlantılar fiziksel kontrol edilir.\n\n**Gemide önemi:** Bir çatışma veya su alma olayında ana güç ilk kaybedilenlerdendir; MAYDAY çağrısı tam o anda yapılmalıdır. Zayıf veya test edilmemiş bir yedek akü, gücün kesildiği kritik dakikada telsizi susturur — bu yüzden akü kapasitesi ve testi doğrudan bir can güvenliği unsurudur.",
      },
      {
        title: "Operatör Sorumluluğu",
        content:
          "Tehlike haberleşmesinin belirsizliğe bırakılmaması için, atanmış bir **radyo haberleşme sorumlusu** (genellikle bir güverte zabiti) bulunur; tehlike anında haberleşmeyi bu kişi yürütür.\n\n**Görev akışı:** Nöbet sırasında bir **DSC alarmı** geldiğinde operatör onu **derhâl değerlendirir**, gerekiyorsa **Ch.16'ya** geçer ve prosedürü uygular. **GOC/ROC belgesi** ve düzenli **tatbikat**, bu sorumluluğun ön koşuludur.\n\n**Gemide önemi:** Bir acil durumda 'kimin ne yapacağı' önceden belli olmalıdır; sorumluluğun net atanması, panik anında herkesin birbirini beklediği ölümcül boşluğu önler. Belge sahibi ama tatbik etmemiş bir operatör de yeterli değildir — hazırlık, düzenli tekrarla sürer.",
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
          "**Inmarsat**, **jeostatik (yer-sabit)** uydularla yaklaşık **70°K – 70°G** enlemleri arasını (**A3 alanı**) kapsar; **kutuplar (A4)** kapsama dışıdır.\n\n**Neden kutuplar hariç:** Jeostatik yörünge ekvator üzerindedir; çok yüksek enlemlerde uydu **ufka çok alçaldığından** sinyal yolu zorlaşır ve bağlantı güvenilmez olur. Bu, Inmarsat'ın temel coğrafi sınırıdır.\n\n**GMDSS'teki yeri:** GMDSS kapsamında **Inmarsat-C**; tehlike alarmı, MSI alımı ve mesajlaşma için tanınan bir hizmettir.\n\n**Gemide önemi:** Bir gemi A3 alanında seyrederken tehlike alarmı ve MSI'nin ana kaynağı Inmarsat'tır; ancak kutup sularına çıkan bir gemi (Polar Code), Inmarsat'ın oraya ulaşamadığını bilerek HF veya Iridium gibi alternatiflere hazır olmalıdır. Kapsama sınırını bilmek, doğru sistemi doğru bölgede kullanmanın ön şartıdır.",
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
          "**EGC (Enhanced Group Call)**, Inmarsat-C üzerinden yapılan bir **grup çağrısı yayınıdır**; iki hizmeti vardır.\n\n**SafetyNET:** **MSI** (seyir/meteoroloji uyarıları, SAR bilgisi) yayınında kullanılan **uluslararası** hizmettir ve NAVTEX kapsamı dışındaki **açık deniz** alanlarında MSI'nin **temel kaynağıdır**. Mesajlar coğrafi alana (**NAVAREA/METAREA**) göre adreslenebilir. **FleetNET:** ticari/idari **grup mesajları** (filo duyuruları) içindir.\n\n**Gemide önemi:** SafetyNET, açık okyanusta seyir zabitinin bölgesine ait uyarıları otomatik almasının yoludur; coğrafi adresleme sayesinde gemi yalnızca kendi alanının bilgisini alır. Cihazın doğru bölgeye ayarlı olması, kritik bir uyarının kaçırılmaması için gereklidir.",
      },
      {
        title: "Iridium ve GMDSS'e Eklenmesi",
        content:
          "**Iridium**, **alçak yörüngeli (LEO)** bir uydu takımyıldızıyla **kutuplar dâhil tüm dünyayı** kapsar; bu nedenle **A4 alanında** da hizmet verebilir — Inmarsat'ın en büyük sınırını (kutuplar) aşar.\n\n**GMDSS'e kabul:** IMO, Iridium'u bir **GMDSS uydu hizmet sağlayıcısı** olarak tanımıştır; GMDSS hizmeti onaylı terminallerle sunulur.\n\n**Gemide önemi:** Bu, özellikle **kutup sularında (Polar Code)** seyreden gemiler için haberleşme kapsamasını genişletir; artık A4 alanında tek seçenek HF olmaktan çıkmıştır. Bir kutup seferinde Iridium'lu GMDSS terminali, uydu tehlike alarmını mümkün kılar.",
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
          "**International Code of Signals (ICS)**, dil engelini aşmak için tasarlanmış, özellikle **emniyet ve seyir** konularını kapsayan standart bir koddur; telsiz sessizliği veya arızada da iletişimi mümkün kılar.\n\n**Nasıl kodlanır:** **26 harf bayrağı, 10 rakam flaması** ve yardımcı flamalarla; **tek harfli, iki harfli ve üç harfli** kodlanmış anlamlar iletilir. Mesajlar **bayrakla (flag hoist), mors lambasıyla veya sesle** iletilebilir.\n\n**Gemide önemi:** Telsizin çalışmadığı veya sessizlik gereken durumlarda ICS, iki geminin (hangi dili konuşurlarsa konuşsunlar) niyet ve durumlarını paylaşmasını sağlar; özellikle tek harfli acil işaretler, saniyelerin önemli olduğu durumlarda evrensel ve hızlı bir dildir. STCW köprüüstü zabitinden bu bilgiyi bekler.",
      },
      {
        title: "Tek Harfli İşaretlerden Önemli Örnekler",
        content:
          "Bazı tek harfli bayrak işaretleri acil ve sık kullanıldığından ezbere bilinmelidir. Örnekler: A (Alfa) – 'Dalgıcım var, yavaş ve dikkatli geç'; B (Bravo) – 'Tehlikeli yük yüklüyor/boşaltıyor/taşıyorum'; D (Delta) – 'Beni uzak tutun, güçlükle manevra yapıyorum'; G (Golf) – 'Kılavuz istiyorum'; H (Hotel) – 'Gemimde kılavuz var'; O (Oscar) – 'Denize adam düştü' (Man overboard); P (Papa/Blue Peter) – limanda 'gemi denize çıkmak üzere'; Q (Quebec) – 'Gemim sağlıklı, serbest pratika talep ediyorum'; U (Uniform) – 'Tehlikeye doğru gidiyorsunuz'; W (Whiskey) – 'Tıbbi yardım istiyorum'.",
        bulletPoints: [
          "O (Oscar): Denize adam düştü (man overboard).",
          "G: 'Kılavuz istiyorum' — H: 'Gemimde kılavuz var'.",
          "Q (Quebec): serbest pratika talebi.",
          "U: 'Tehlikeye doğru gidiyorsunuz' — uyarı.",
        ],
      },
      {
        title: "Mors Lambası (Aldis Lamp) ile Haberleşme",
        content:
          "**Mors lambası (signalling/Aldis lamp)**, ışığın **kısa (dot) ve uzun (dash)** yakılmasıyla mors alfabesi üzerinden mesaj iletir.\n\n**Kullanım:** Çağrı işareti, gemiler arası kısa mesaj ve **telsiz arızasında** alternatif iletişim. Alıcı, anladığını her kelime/harf grubundan sonra **teyit eder**; anlamadığında tekrar ister (kapalı döngü).\n\n**Avantajı:** **Gece görüş ve karartma (blackout)** koşullarında dahi kullanılabilir olması; radyo sessizliği gereken veya elektronik emisyonun istenmediği durumlarda değerlidir.\n\n**Gemide önemi:** Tüm elektronik haberleşme çökse bile, bir mors lambası ve mors bilgisi iki gemi arasında hâlâ mesaj taşıyabilir; bu, denizciliğin 'her şey başarısız olursa' katmanıdır ve bu yüzden hâlâ öğretilir. Karartma gereken durumlarda ise en güvenli görsel kanaldır.",
      },
      {
        title: "Diğer Görsel İşaretler",
        content:
          "Görsel iletişim, bayrak ve lambayla sınırlı değildir. **Semafor** (kollarla/bayraklarla işaret) tarihsel olarak kullanılmıştır ama bugün nadirdir.\n\n**COLREG işaretleri:** Geminin **durumunu** bildiren **gündüz işaretleri** (toplar, koniler, silindirler) ve **seyir fenerleri**, görsel iletişimin en yaygın ve zorunlu biçimidir; bunlar geminin demirde mi, **kumandadan aciz** mi, balıkçılıkla mı meşgul, yoksa kısıtlı manevra kabiliyetinde mi olduğunu — hiç konuşmadan — çevredeki tüm gemilere bildirir.\n\n**Gemide önemi:** Bir zabit, karşı geminin gösterdiği şekil ve fenerleri 'okuyarak' onun ne yaptığını ve COLREG'e göre kimin yol vereceğini anlar; bu, görsel işaretleşmenin her gece ve her karşılaşmada kullanılan hâlidir. Görsel işaretleşme bilgisi bu yüzden STCW köprüüstü yetkinliğinin ayrılmaz parçasıdır.",
      },
    ],
    keyPoints: [
      "International Code of Signals dil engelini aşan standart işaret kodudur.",
      "Tek harfli işaretler (O=MOB, G/H=kılavuz, Q=pratika) ezbere bilinmelidir.",
      "Mors lambası telsiz arızasında ve karartmada alternatif iletişim sağlar.",
      "Görsel işaretleşme STCW köprüüstü yetkinliğinin parçasıdır.",
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
          "**ITU (Uluslararası Telekomünikasyon Birliği) Radyo Tüzüğü**, deniz hizmetine ayrılan **frekans bantlarını**, tehlike/çağrı frekanslarını ve kullanım kurallarını belirler; radyo spektrumu ortak ve sınırlı bir kaynak olduğundan bu düzen zorunludur.\n\n**Temel kısıtlar:** Gemi telsizi yalnızca **tahsis edilen frekans/kanallarda** ve **izin verilen güçte** yayın yapabilir. **Tehlike frekanslarında** (Ch.16, Ch.70, 2182/2187.5 kHz vb.) gereksiz yayın **yasaktır** — bunlar hayat kurtaran kanallardır ve açık tutulmalıdır.\n\n**False distress:** Yanlış veya kötü niyetli **tehlike çağrısı (false distress)** ciddi yaptırımlara tabidir; boşa harcanan SAR kaynağı ve azalan güven nedeniyle ağır bir ihlaldir.\n\n**Gemide önemi:** Bir operatör, hangi frekansta ne yapabileceğini bilmelidir; yanlış frekansta yayın hem yasa dışıdır hem başka bir geminin tehlike trafiğini bozabilir. Tehlike frekanslarının disiplinli kullanımı, tüm sistemin güvenilirliğinin temelidir.",
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
          "GMDSS ekipmanını kullanacak personel, kapsamına uygun bir **yeterlilik belgesine** sahip olmalıdır.\n\n**Belge türleri:** **GOC (General Operator's Certificate)** — tüm deniz alanları ve tüm GMDSS ekipmanı için; **ROC (Restricted Operator's Certificate)** — yalnızca **A1 (VHF)** alanında çalışan gemiler için. Ayrıca eğlence/kısa menzil belgeleri (**LRC/SRC**) farklı kapsamlar için vardır. **STCW**, köprüüstü zabitlerinin hem **GMDSS yetkinliğini** hem **İngilizce (SMCP dâhil)** yeterliliğini şart koşar.\n\n**Gemide önemi:** Belge, operatörün bir tehlike çağrısını doğru ve hızlı yapabileceğinin güvencesidir; kapsam da önemlidir — A3'e çıkan bir gemide yalnızca ROC'lu bir operatör yeterli değildir. Doğru belge + düzenli tatbikat, kâğıt üzerindeki yetkinliği gerçek hazırlığa dönüştürür.",
      },
      {
        title: "Gizlilik, Kayıt ve Denetim",
        content:
          "Telsiz haberleşmesinin iki hukuki boyutu vardır: **gizlilik** ve **kayıt/denetim**.\n\n**Haberleşme gizliliği:** Telsizde duyulan/öğrenilen mesajların **ifşa edilmemesi** yasal bir ilkedir; başkasının trafiğini dinleyip yaymak yasaktır. **Tek istisna tehlike trafiğidir** — bir MAYDAY herkesçe duyulmalı ve gereğinde aktarılmalıdır.\n\n**Belgeler ve denetim:** **İstasyon ruhsatı, operatör belgeleri ve radyo log defteri** gemide bulundurulur ve **PSC denetiminde** kontrol edilir. Belgelerin geçerliliği, ekipmanın çalışırlığı ve kimliklerin (MMSI/call sign) doğruluğu, uyumun temel göstergeleridir.\n\n**Gemide önemi:** Eksik bir belge veya yanlış programlanmış bir MMSI, hem denetimde eksiklik (deficiency) hem gerçek bir tehlikede yanlış kimlikle alarm demektir; bu yüzden belgeler güncel, kimlikler doğru ve kayıtlar düzenli tutulur. Gizlilik ilkesi ise mesleki güvenin ve yasanın gereğidir.",
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
          "AIS **üç tür veri** yayınlar ve bunların kaynağı (otomatik mi, elle mi) doğruluklarını belirler.\n\n**Statik veriler:** Gemi kurulumunda **bir kez** girilir ve nadiren değişir — **MMSI, IMO numarası, çağrı işareti, gemi adı, gemi tipi, boyutlar** ve anten konumu.\n\n**Dinamik veriler:** Sensörlerden **otomatik** gelir — **mevki, karaya göre hız (SOG), karaya göre rota (COG), pruva (heading), dönüş oranı (ROT)** ve **seyir durumu (navigational status)** (seyirde, demirde, kumandadan aciz vb.).\n\n**Sefer verileri:** Her sefer başında **elle** girilir — **su çekimi (draught), tehlikeli yük durumu, varış limanı (destination), ETA** ve gemideki kişi sayısı.\n\n**Gemide önemi:** **Elle girilen** veriler (seyir durumu ve sefer verileri) sık hata kaynağıdır — güncellenmemiş bir draught veya yanlış bir 'demirde' durumu, karşı gemiyi yanıltır. Bu verilerin güncel tutulması **zabitin sorumluluğundadır**; çünkü başka gemiler senin AIS'ine bakarak karar verir.",
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
          "MF/HF menzili sabit değildir; sinyalin **nasıl yayıldığına** bağlıdır ve bu, VHF'ten temel farkıdır.\n\n**Yer dalgası (ground wave):** MF ve düşük HF'te sinyal büyük ölçüde **yeryüzünü izleyerek** yayılır; MF yer dalgası gündüz tipik **100–150 deniz mili**, gece daha fazla menzil verir. Güvenilir ama kısa-orta menzillidir.\n\n**Gök dalgası (sky wave):** Daha yüksek frekanslarda baskındır: dalga **iyonosfere** ulaşıp **kırılarak** yeryüzüne geri döner ve **binlerce mil** öteye ulaşabilir. Uzun menzilin kaynağıdır.\n\n**Ölü bölge (skip zone):** Yer dalgasının bittiği yer ile ilk gök dalgası sıçramasının düştüğü yer arasında sinyalin **alınamadığı bir boşluk** oluşabilir. İyonosfer gündüz/gece, mevsim ve güneş aktivitesiyle değiştiğinden **kullanılabilir frekanslar da değişir**.\n\n**Gemide önemi:** Bir operatör 'neden bağlanamıyorum?' sorusunun cevabını çoğu zaman yayılımda bulur — hedef ölü bölgede olabilir veya frekans o saate uygun değildir. Yayılımı anlamak, doğru frekansı seçip bağlantıyı kurmanın anahtarıdır.",
        formula: {
          text: "Yer dalgası: MF ~100–150 NM (gece daha uzun) · Gök dalgası: iyonosfer sıçramasıyla binlerce NM",
          description: "Arada sinyal alınamayan 'ölü bölge (skip zone)' oluşabilir; kullanılabilir frekans gün/gece ve mevsimle değişir",
        },
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
          "MF/HF vericileri, VHF'ten farklı olarak **iyi bir anten, etkin topraklama ve genellikle bir anten uyum birimi** gerektirir.\n\n**Anten ve topraklama:** Verimli yayın için iyi antene, **etkin topraklamaya (ground/counterpoise)** ve genellikle bir **anten uyum birimine (ATU — Antenna Tuning Unit)** ihtiyaç vardır; **kötü topraklama menzili ciddi biçimde düşürür** (güç antenden verimli çıkamaz).\n\n**Modlar:** Sesli haberleşmede **SSB (Single Side Band, J3E)**, teleks (NBDP) için **F1B/J2B** kullanılır.\n\n**Disiplin ve nöbet:** Tehlike frekanslarında gereksiz yayın yasaktır ve nöbet tutulur. Modern gemide **MF/HF-DSC kontrolör** tehlike alarmlarını ilgili bantlarda otomatik izler; alınan bir DSC tehlike alarmı, ilgili bandın **telsiz telefon tehlike frekansında** (örn. 2182 kHz) sesli takip edilir.\n\n**Gemide önemi:** İyi bir MF/HF kurulumu, açık okyanusta kıyıyla veya başka gemilerle uzun menzilli bağlantının tek yolu olabilir; bakımsız bir anten veya kötü topraklama, tam da en gerekli anda (A3/A4'te) telsizi işe yaramaz kılar. Bu yüzden anten/topraklama kontrolü rutin bir bakım kalemidir.",
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
          "VTS bölgelerinde haberleşme, yanlış anlamayı önlemek için **SMCP mesaj işaretleriyle** yapılır (Instruction, Advice, Warning, Information, Question, Answer, Request, Intention) — böylece her mesajın **amacı** baştan bellidir.\n\n**Rapor türleri:** Gemi tipik olarak bölgeye **giriş (entry) raporu**, **mevki raporu** ve **çıkış (final) raporu** verir; içerik gemi adı/çağrı işareti, mevki, rota, hız ve varış noktası gibi bilgileri kapsar. Atanmış **VTS kanalında sürekli nöbet** tutulur.\n\n**Teyit:** Kritik talimatların doğru alındığı **kapalı döngü teyit (read back)** ile doğrulanır.\n\n**Gemide önemi:** VTS ile net ve standart iletişim, yoğun bir boğaz veya liman yaklaşımında trafiğin güvenle akmasını sağlar; belirsiz bir rapor veya kaçırılan bir talimat, kalabalık suda bir çatışmaya yol açabilir. Bu yüzden VTS raporlaması disiplinli, standart ve teyitli yapılır.",
      },
      {
        title: "Zorunlu Gemi Raporlama Sistemleri (SRS)",
        content:
          "**SOLAS V/11**, IMO tarafından onaylanmış **zorunlu gemi raporlama sistemlerini (Ship Reporting Systems, SRS)** düzenler; belirli **hassas bölgelerde** (boğazlar, yoğun trafik, çevresel duyarlı alanlar) gemiler giriş ve çıkışta **standart formatta** rapor vermek zorundadır.\n\n**Standart rapor bölümleri:** Bir raporlama sistemi tipik olarak **sefer planı (sailing plan), mevki raporu (position report), rota değişikliği** ve **son rapor (final report)** bölümlerinden oluşur (her biri standart harf kodlarıyla).\n\n**Gönüllü sistemler:** **AMVER** gibi gönüllü sistemler, arama-kurtarmayı desteklemek için gemilerin mevkilerini paylaştığı küresel sistemlerdir; bir tehlikede en yakın gemiyi bulmayı hızlandırır.\n\n**Gemide önemi:** Zorunlu raporlama, kıyı otoritesinin hassas bir bölgedeki trafiği eksiksiz görmesini sağlar; raporu atlamak hem ihlal hem de o bölgenin trafik resminde bir 'kör nokta' demektir. AMVER'e katılım ise, kendi geminin bir gün yardıma muhtaç olduğunda en yakın gemiyi çağırabilmenin karşılıklı güvencesidir.",
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
          "Köprüüstü ile makine dairesi arasındaki ana komut bağlantısı **makine telgrafıdır (engine telegraph)**; modern gemilerde elektronik telgraf, istenen makine komutunu (örn. **Half Ahead, Stop, Full Astern**) hem köprüüstünde hem makine kontrol odasında **eşzamanlı gösterir ve onaylar**.\n\n**Yedek hatlar:** Telgrafın yanında köprüüstü ile makine kontrol odası arasında **telefon ve interkom** bağlantısı bulunur (telgraf arızasında veya açıklama gerektiğinde).\n\n**Kapalı döngü ve kayıt:** Köprü-makine komutları **kapalı döngüyle** (komutun makine tarafından tekrar edilip onaylanması) yürütülür — bu, yanlış manevrayı önler. Manevra sırasında verilen tüm makine komutları **otomatik kaydedici (engine movement recorder / bell book)** ile kayıt altına alınır.\n\n**Gemide önemi:** Yanaşma gibi kritik bir manevrada 'Full Astern' komutunun yanlış anlaşılması bir çarpmaya yol açabilir; telgrafın çift taraflı onayı ve kapalı döngü teyit bunu önler. Bell book kaydı ise bir olay sonrası ne komut verildiğini kanıtlayan resmî belgedir.",
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
          "Manevra, demirleme, palamar ve yük operasyonlarında **ekip içi anlık iletişim**, taşınabilir **UHF/VHF el telsizleriyle** sağlanır; baş-kıç manevra ekipleri ile köprüüstü arasında **net, kısa ve standart** komutlar kullanılır.\n\n**Patlayıcı ortam — Ex telsiz:** Tankerlerde ve tehlikeli yük taşıyan gemilerde, patlama riski nedeniyle yalnızca **kıvılcım güvenli (intrinsically safe / Ex onaylı)** telsizler kullanılabilir; standart bir telsizin kıvılcımı, yük buharını tutuşturabilir.\n\n**Can kurtarma VHF'i:** GMDSS kapsamında, can kurtarma araçları ve helikopterle haberleşme için onaylı **taşınabilir GMDSS VHF setleri (survival craft two-way VHF)** bulundurulur; bunlar **terk-i gemi** için ayrılmıştır ve **rutin işlerde kullanılmaz** (bataryası tükenmesin diye).\n\n**Gemide önemi:** Doğru telsiz doğru yerde kullanılmazsa sonuç felaket olabilir — tanker güvertesinde standart bir telsiz bir patlama, tükenmiş bir survival-craft VHF ise terk-i gemide sessizlik demektir. Bu yüzden telsiz tipi, ortam ve amaç titizlikle eşleştirilir.",
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
          "Gemide ciddi bir sağlık sorunu olduğunda iki mekanizma devreye girer: uzaktan danışma (**MEDICO**) ve tahliye (**MEDEVAC**).\n\n**MEDICO (uzaktan tıbbi danışma):** Kıyıdaki bir tıbbi merkezden **uzaktan danışma** alınır; bu trafik genellikle **PAN-PAN (aciliyet)** önceliğiyle, bir kıyı istasyonu veya MRCC aracılığıyla yürütülür. Doktor, semptom ve bulgulara göre **gemideki ilaç/donanımla** yapılacak tedaviyi önerir.\n\n**MEDEVAC (tıbbi tahliye):** Hastanın gemiden **tahliyesi** gerekiyorsa MEDEVAC düzenlenir — genellikle helikopterle veya hızlı bir deniz birimiyle. Bu, dikkatli koordinasyon gerektirir: **buluşma noktası, gemi rotası/hızı, rüzgâr** ve vinç operasyonu için hazırlık. Helikopter operasyonlarında köprüüstü-helikopter haberleşmesi **atanmış frekansta, net ve standart** yürütülür.\n\n**Gemide önemi:** Açık denizde en yakın hastane günlerce uzakta olabilir; MEDICO doğru tedaviyle çoğu durumu gemide yönetmeyi sağlar, MEDEVAC ise hayati durumlarda hastayı zamanında hastaneye ulaştırır. İkisinde de **net haberleşme** (semptomların doğru aktarılması, MEDEVAC koordinasyonu) sonucu doğrudan belirler.",
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
          "Cospas-Sarsat, kapsama ve konumlandırmayı güçlendirmek için **üç uydu katmanı** kullanır.\n\n**LEOSAR** (alçak kutupsal yörünge): **Doppler kayması** üzerinden konum hesaplar; ancak uydu o anda kapsama alanında değilse **beklemek (gecikme)** gerekir. **GEOSAR** (sabit/jeostasyoner uydu): **anlık alarm** sağlar fakat tek başına konum üretemez (vericide GNSS yoksa). **MEOSAR** (orta yörünge): **GPS/Galileo/GLONASS** navigasyon uydularına yerleştirilen SAR yükleriyle çalışır; geniş, sürekli kapsama ve birden çok uydudan eşzamanlı alımla **hızlı ve hassas** konumlandırma sunar.\n\n**Gemide önemi:** Modern sistemde GEOSAR'ın **anlık alarmı** ile MEOSAR'ın **hızlı bağımsız konumlandırması** birlikte kullanılır — böylece bir EPIRB aktivasyonu hem hemen fark edilir hem dakikalar içinde hassasça konumlandırılır. Bu, kurtarmanın 'ne zaman ve nereye' sorusunu en hızlı yanıtlayan katmandır.",
        bulletPoints: [
          "LEOSAR: kutupsal yörünge, Doppler konumu, olası bekleme süresi.",
          "GEOSAR: anlık alarm, tek başına konum üretemez.",
          "MEOSAR: navigasyon uydularında SAR yükü; hızlı, sürekli, hassas konum.",
        ],
      },
      {
        title: "Tehlike Sinyalinin Yolu: Cihazdan MRCC'ye",
        content:
          "Bir 406 MHz vericisi etkinleştiğinde, sinyal net bir **zincir** boyunca doğru kurtarma merkezine ulaşır.\n\n**Zincir:** Sinyal **uydular** tarafından alınıp yer istasyonlarına (**LUT — Local User Terminal**) iletilir; LUT sinyali çözer ve konumu hesaplar, ardından bilgi bir **MCC (Mission Control Centre)**'ye gönderilir. MCC, vericinin **kayıtlı kimliğine** ve konumuna göre alarmı sorumlu SAR bölgesindeki **MRCC**'ye yönlendirir.\n\n**Gemide önemi:** Bu zincir sayesinde, tehlikedeki bir gemi telsiz menzili dışında olsa bile alarm **dakikalar içinde doğru merkeze** ulaşır. 406 MHz dijital mesajı, vericinin **benzersiz kimliğini** (15 haneli hex) ve varsa **entegre GNSS konumunu** taşır — yani 'kim' ve 'nerede' bilgisi baştan gömülüdür; doğru kayıt olmadan bu kimlik işe yaramaz.",
        bulletPoints: [
          "Zincir: Verici → Uydu → LUT → MCC → MRCC.",
          "LUT konumu hesaplar; MCC doğru MRCC'ye yönlendirir.",
          "Dijital mesaj benzersiz cihaz kimliği ve (varsa) GNSS konumu içerir.",
        ],
      },
      {
        title: "Beacon Kaydı ve Yanlış Alarmların Önlenmesi",
        content:
          "Her 406 MHz vericisinin bayrak devleti/ulusal otorite nezdinde **kaydedilmesi zorunludur**; kayıt, alarmın hızla doğrulanmasının anahtarıdır.\n\n**Kayıt içeriği:** Gemi adı, MMSI, irtibat bilgileri ve **acil durum temasları**; bu sayede SAR birimleri alarmı arayıp **doğrulayabilir**. Kaydın **güncel tutulması** (gemi satışı, sahip/irtibat değişikliği) kritiktir.\n\n**Yanlış alarm:** Cospas-Sarsat alarmlarının **büyük bölümü yanlış alarmdır**; yanlış aktivasyon olduğunda **derhâl ilgili MRCC aranarak iptal** bildirilir. Yanlış tetiklemeyi önlemek için cihaz doğru saklanır, test düğmesi amacına uygun kullanılır ve hidrostatik bırakma düzeneği kontrol edilir.\n\n**Gemide önemi:** Güncel olmayan bir kayıt, gerçek bir tehlikede MRCC'nin 'bu alarm kimden, gerçek mi?' sorusunu yanıtlayamaması demektir — doğrulama için harcanan değerli dakikalar. İptal edilmeyen bir yanlış alarm ise SAR kaynaklarını boşa koşturur; her ikisi de kayıt/iptal disiplininin neden önemli olduğunu gösterir.",
        bulletPoints: [
          "406 MHz cihazlar zorunlu olarak kaydedilir; kayıt güncel tutulur.",
          "Kayıt, SAR'ın alarmı hızla doğrulamasını sağlar.",
          "Yanlış alarm derhâl ilgili MRCC aranarak iptal edilmelidir.",
        ],
      },
      {
        title: "121.5 MHz Yön Bulma ve Geri Bağlantı (RLS)",
        content:
          "406 MHz uydu sinyaline ek olarak cihazlar, düşük güçlü bir **121.5 MHz homing (yön bulma)** işareti yayar; arama birimleri ve helikopterler olay yerine yaklaşırken bu işaretle cihazı **yön bularak** bulur (son mili kapatır).\n\n**RLS (Return Link Service):** Yeni nesil MEOSAR yeteneklerinden biri, sistemin **alarmın alındığını ve işlendiğini cihaza geri bildirmesidir**; böylece tehlikedeki kişi, yardımın yolda olduğunu (cihaz üzerindeki bir göstergeyle) **teyit eder**. **AIS-SART ve EPIRB-AIS** gibi tamamlayıcı işaretler de olay yerinde yakın menzilli konumlandırmayı destekler.\n\n**Gemide önemi:** RLS, hayatta kalma mücadelesinde **moral ve karar** açısından güçlü bir yeniliktir — 'sinyalim gitti mi, duyan var mı?' belirsizliğini ortadan kaldırır. Homing işareti ise uydunun getirdiği ekibi son metrelerde can salına ulaştıran işaret olduğundan, EPIRB'in bu ikili (uydu + homing) yapısı bilinçli bir tasarımdır.",
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
          "GMDSS **1990'ların teknolojisiyle** tasarlandı; aradan geçen sürede uydu ve dijital haberleşme büyük ölçüde gelişti, bu yüzden IMO kapsamlı bir modernizasyon yürütür.\n\n**Amaçlar:** Eskiyen teknolojileri **güncellemek**, sistemi **yeni uydu sağlayıcılarına açmak**, **dijital veri yayınını** yaygınlaştırmak ve gereksiz çakışan zorunlulukları **sadeleştirmek**. Bu doğrultuda **SOLAS Bölüm IV** ve ilgili performans standartları revize edilmektedir.\n\n**Gemide önemi:** Hedef, tehlike/emniyet haberleşmesinin **güvenilirliğini korurken** modern ekipmanın hız, kapasite ve esnekliğinden yararlanmaktır. Modernizasyon **kademeli** yürür; gemiler ve idareler için geçiş takvimleri ve uyum gereklilikleri belirlenir — yani zabitler, ekipman ve kural değişikliklerini takip etmelidir.",
        bulletPoints: [
          "Amaç: eskiyen teknolojiyi güncellemek ve sistemi yeni sağlayıcılara açmak.",
          "SOLAS Bölüm IV ve performans standartları revize edilmektedir.",
          "Güvenilirlik korunurken modern ekipmanın hız ve kapasitesi kazanılır.",
        ],
      },
      {
        title: "Yeni Uydu Sağlayıcılar ve Kapsama",
        content:
          "Uzun süre **Inmarsat tek tanınmış** GMDSS uydu sağlayıcısıydı; modernizasyonla bu tekel açılmaktadır.\n\n**Yeni sağlayıcılar:** Ek mobil uydu servisleri de GMDSS hizmeti sunmak üzere tanınmaya başlamıştır; özellikle **alçak yörünge takımyıldızı** kullanan ve **kutuplar dâhil** küresel kapsama sunabilen sistemler, geleneksel jeostasyoner uyduların **kutup boşluğunu (A4 sorunu)** kapatma potansiyeli taşır.\n\n**Gemide önemi:** Birden fazla tanınmış sağlayıcı; **rekabet, yedeklilik ve daha geniş coğrafi kapsama** demektir — bir sistem çökse veya kapsayamasa diğeri devrede olabilir. Gemilerin hangi servisi taşıyacağı sefer bölgesine ve bayrak devleti onayına göre belirlenir; kutup seferi yapan bir gemi için bu, artık gerçek bir uydu seçeneği anlamına gelir.",
        bulletPoints: [
          "GMDSS artık birden fazla tanınmış uydu sağlayıcıya açılmaktadır.",
          "Kutupları da kapsayan takımyıldızlar A4 boşluğunu kapatabilir.",
          "Çok sağlayıcı: rekabet, yedeklilik ve daha geniş kapsama.",
        ],
      },
      {
        title: "NAVDAT ve Dijital MSI Yayını",
        content:
          "**NAVTEX**, on yıllardır metin tabanlı MSI (Denizcilik Emniyet Bilgisi) yayınının temeli olmuştur; ancak **düşük veri hızı** ve yalnızca metin desteği sınırlayıcıdır.\n\n**NAVDAT:** **NAVDAT (Navigational Data)**, **500 kHz** bandında çalışan yeni nesil **dijital yayın** sistemidir; NAVTEX'ten çok daha yüksek veri hızıyla yalnızca metin değil **grafik, harita düzeltmeleri, hava haritaları ve dosya** türü içeriği de yayınlayabilir.\n\n**Gemide önemi:** NAVDAT, MSI dağıtımını **zenginleştirip otomatikleştirme** yolunda önemli bir adımdır — örneğin bir seyir uyarısı, metin yerine doğrudan haritaya işlenebilir bir düzeltme olarak gelebilir. NAVTEX ile bir süre **birlikte var olması** beklenir, bu yüzden zabit her ikisini de tanımalıdır.",
        bulletPoints: [
          "NAVDAT: 500 kHz'de yüksek hızlı dijital MSI yayını.",
          "Metnin yanı sıra grafik, harita düzeltmesi ve dosya yayınlayabilir.",
          "NAVTEX'i tamamlar; geçiş döneminde birlikte kullanılır.",
        ],
      },
      {
        title: "E-Navigasyon Vizyonu ve Bütünleşme",
        content:
          "**E-navigasyon**, gemi içi ve kıyıdaki seyir/haberleşme bilgilerinin **uyumlu (harmonize)** biçimde toplanması, değişimi ve sunulmasıdır; amaç **emniyeti artırmak ve operatör iş yükünü azaltmaktır**.\n\n**Bütünleşme:** Bu vizyonda GMDSS haberleşmesi; **ECDIS, AIS, VTS** ve kıyı servisleriyle **bütünleşik** bir bilgi akışının parçası olur. **Standart veri biçimleri** (ortak deniz veri yapısı), **denizcilik tek penceresi (single window)** uygulamaları ve **siber güvenlik**, e-navigasyonun temel bileşenleridir.\n\n**Gemide önemi:** Bağlanabilirlik arttıkça, sistemlerin **siber tehditlere** karşı korunması ve yedekli/çalışır tutulması giderek daha kritik olur; entegre bir köprüüstünde bir siber saldırı veya veri hatası, birçok sistemi aynı anda etkileyebilir. Bu yüzden e-navigasyonun geleceği, kolaylık kadar **dayanıklılık ve güvenlik** meselesidir.",
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
          "**SSAS (Ship Security Alert System)**, 11 Eylül sonrası getirilen **SOLAS Bölüm XI-2 ve ISPS Kodu** kapsamında çoğu uluslararası sefer yapan gemi için **zorunludur**.\n\n**Amaç:** Geminin güvenliği ihlal edildiğinde veya tehdit altındayken (korsanlık, terör, kaçırma) kıyıdaki idareye **sessiz bir uyarı** iletmek. **GMDSS tehlike alarmından farkı:** SSAS çevredeki gemilere veya saldırganlara **açık alarm vermez**; yalnızca önceden tanımlı **kara muhataplarına gizli bildirim** gönderir.\n\n**Gemide önemi:** Bu gizlilik hayatidir — bir kaçırma/korsanlık girişimi sırasında açık bir alarm, saldırganları tetikleyip mürettebatı tehlikeye atardı. SSAS sayesinde müdahale planları, saldırganlar farkında olmadan **güvenlik içinde** başlatılabilir; bu yüzden SSAS, tehlike (distress) değil **güvenlik (security)** mantığıyla çalışır.",
        bulletPoints: [
          "SOLAS XI-2 / ISPS Kodu kapsamında zorunludur.",
          "Geminin güvenlik ihlali/tehdidini kıyıya GİZLİCE bildirir.",
          "GMDSS tehlike alarmının aksine açık yayın yapmaz.",
        ],
      },
      {
        title: "Çalışma Mantığı ve Tetikleme Noktaları",
        content:
          "SSAS, gemide **gizli konumlandırılmış en az iki tetikleme noktasıyla (activation point)** etkinleştirilir; bunlardan biri genellikle **köprüüstündedir**.\n\n**Sessiz çalışma:** Tetiklendiğinde sistem sessizce bir uyarı yayınlar — gemide **hiçbir sesli/görsel işaret üretmez** ve gemideki haberleşme ekipmanını uyarmaz. Mesaj; geminin **kimliğini, konumunu ve güvenlik alarmı durumunu** taşır ve düzenli aralıklarla güncellenerek gönderilebilir.\n\n**Gemide önemi:** Sistem, **yanlışlıkla kapatılamayacak veya kolayca devre dışı bırakılamayacak** şekilde tasarlanır — çünkü bir saldırgan onu bulup susturamamalıdır. Tetikleme noktalarının yerinin gizli ama mürettebatça bilinir olması, saldırı anında birinin fark ettirmeden alarmı basabilmesi için kritiktir.",
        bulletPoints: [
          "En az iki gizli tetikleme noktası (biri köprüüstünde) bulunur.",
          "Tetiklendiğinde gemide sesli/görsel uyarı ÜRETMEZ.",
          "Mesaj gemi kimliği, konum ve güvenlik durumunu taşır.",
        ],
      },
      {
        title: "Alarmın Yönlendirilmesi ve Muhataplar",
        content:
          "SSAS alarmı, GMDSS gibi **tüm denize değil**; bayrak devletinin belirlediği yetkililere gönderilir — genellikle **Şirket Güvenlik Sorumlusu (CSO)** ve/veya idare.\n\n**Test şart:** Alarmın **doğru kara muhataplarına ulaşması** düzenli test edilmelidir; test çağrıları, gerçek bir güvenlik alarmıyla karıştırılmamak için ilgili merkezlerle **önceden koordine** edilerek yapılır. Mesaj genellikle **uydu** kanalı üzerinden iletilir; gemi-kıyı zinciri ve irtibatlar **Gemi Güvenlik Planı'nda (SSP)** tanımlıdır.\n\n**Gemide önemi:** Bir güvenlik alarmının işe yaraması, yalnızca gönderilmesine değil **doğru yere ulaşmasına** bağlıdır; yanlış/eski bir irtibat, alarmı boşluğa gönderir. Bu yüzden muhatap bilgileri güncel tutulur ve zincir düzenli test edilir — sessiz bir alarmın 'ulaşmayan bir çığlık' olmaması için.",
        bulletPoints: [
          "Alarm tüm denize değil, önceden tanımlı kara muhataplarına gider.",
          "Muhataplar genellikle CSO ve/veya bayrak devleti idaresidir.",
          "Testler gerçek alarmla karışmaması için önceden koordine edilir.",
        ],
      },
      {
        title: "Korsanlık Bölgesinde Uygulama (BMP)",
        content:
          "Yüksek riskli korsanlık bölgelerinde SSAS, **en iyi yönetim uygulamaları (BMP — Best Management Practices)** çerçevesinde bir **savunma katmanıdır** (tek başına değil).\n\n**Uygulama:** Gemi, bölgeye girmeden önce ilgili **askeri/koordinasyon merkezlerine kayıt** olur ve raporlama yapar; saldırı anında mürettebat **güvenli mahale (citadel)** çekilirken SSAS tetiklenir ve durum kıyıya iletilir.\n\n**Gemide önemi:** SSAS tek başına yeterli değildir; **fiziksel önlemler** (dikenli tel, hız, manevra), **gözcülük, tatbikatlar** ve doğru raporlama ile birlikte bütünsel bir güvenlik yaklaşımının parçasıdır. Mürettebatın **tetikleme noktalarının yerini ve prosedürü tatbikatla bilmesi** esastır — çünkü gerçek saldırı, prosedürü ilk kez öğrenme anı olamaz.",
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
          "**LRIT (Long-Range Identification and Tracking)**, **SOLAS Bölüm V** kapsamında; çoğu uluslararası sefer yapan yolcu gemisi, yüksek hızlı tekne, **300 GT ve üzeri** yük gemisi ve mobil açıkdeniz sondaj birimleri için **zorunludur**.\n\n**Amaç:** **Emniyet, güvenlik (security) ve deniz çevresinin korunması** maksadıyla devletlerin; kendi bayraklı, kıyılarına yaklaşan veya limanlarına gelecek gemileri **izleyebilmesidir**. LRIT bir **'izleme (tracking)'** sistemidir — çatışmadan kaçınma gibi anlık seyir amaçlı **değildir**.\n\n**Gemide önemi:** Veriler yetkili merkezler arasında **kontrollü** paylaşılır; yani LRIT, geminin konumunu 'herkese' değil, yalnızca hukuken yetkili devletlere açar. Bir zabit için bu, geminin bayrak/liman/kıyı devletlerince küresel olarak izlenebildiğini ama bunun AIS gibi açık bir yayın olmadığını bilmek demektir.",
        bulletPoints: [
          "SOLAS Bölüm V kapsamında belirli gemi türleri için zorunludur.",
          "Amaç: emniyet, güvenlik ve çevre koruma için uzaktan izleme.",
          "Çatışmadan kaçınma için değil, devlet düzeyinde izleme içindir.",
        ],
      },
      {
        title: "İletilen Bilgi ve Raporlama Sıklığı",
        content:
          "LRIT cihazı; geminin **kimliğini, konumunu (enlem/boylam)** ve **konumun alındığı tarih-saati** otomatik iletir — sade ama yeterli bir 'nerede, ne zaman' verisi.\n\n**Sıklık:** Standart raporlama tipik olarak **günde birkaç kez** (ör. 6 saatte bir) yapılır; ancak veri merkezleri, izleyen devletin talebine göre sıklığı **uzaktan artırabilir** veya konumu **anlık talep edebilir (on-demand polling)**. Bu esneklik, gemi belirli bir bölgeye yaklaştığında daha sık takip sağlar.\n\n**Gemide önemi:** AIS'in aksine LRIT verisi **herkese açık değildir**; yalnızca yetkili taraflar erişir. Bu, geminin mahremiyeti ile devletlerin güvenlik ihtiyacı arasındaki dengeyi kurar — konum bilinir ama kontrollüdür. Sık raporlama talebi ise, bir geminin hassas bir bölgeye yaklaştığında görünürlüğünün artması demektir.",
        bulletPoints: [
          "İletilen veri: gemi kimliği, konum ve zaman damgası.",
          "Tipik raporlama birkaç saatte bir; uzaktan artırılabilir/anlık sorgulanabilir.",
          "AIS'in aksine veri açık değildir; yalnızca yetkililer erişir.",
        ],
      },
      {
        title: "Sistem Mimarisi: Veri Merkezleri ve IDE",
        content:
          "LRIT, gemilerdeki **uydu terminalleri** ile birbirine bağlı bir **Veri Merkezleri (Data Centre)** ağı üzerine kuruludur.\n\n**Yapı:** Her bayrak devleti bir **Ulusal/Bölgesel/Kooperatif veya Uluslararası** Veri Merkezi kullanır; veri merkezleri arasındaki akış, IMO'nun yönettiği **Uluslararası Veri Değişim noktası (IDE — International Data Exchange)** üzerinden yönlendirilir. Bir devletin hangi gemi verisine erişebileceği, IMO'nun **Veri Dağıtım Planı'na (DDP — Data Distribution Plan)** göre düzenlenir.\n\n**Gemide önemi:** Bu mimari sayesinde her devlet **yalnızca yetkili olduğu** gemilerin (kendi bayraklı, kıyısına yaklaşan, limanına gelecek) verisine erişir — ne fazlası ne eksiği. Yani LRIT'in gücü kadar **sınırı da** tasarıma gömülüdür; bu, sistemin hem işe yaramasını hem kötüye kullanılmamasını sağlar.",
        bulletPoints: [
          "Veri Merkezleri ağı + IDE (Uluslararası Veri Değişimi) mimarisi.",
          "Erişim hakları Veri Dağıtım Planı (DDP) ile düzenlenir.",
          "Devletler yalnızca yetkili oldukları gemi verisine erişir.",
        ],
      },
      {
        title: "LRIT ve AIS Karşılaştırması",
        content:
          "LRIT ile AIS sıkça karıştırılır ama **farklı sorunları** çözer; ikisini ayırmak önemlidir.\n\n**AIS:** **VHF** üzerinden **yerel ve açık** yayın yapar; menzili telsiz ufkuyla sınırlıdır ve esas amacı **çatışmadan kaçınma** ile yerel durum farkındalığıdır (herkes dinleyebilir). **LRIT:** **uydu** üzerinden **küresel** kapsama sağlar, daha **seyrek** rapor üretir ve verisi **gizlidir** (yalnızca yetkili devletlere açık).\n\n**Gemide önemi:** Özetle **AIS 'gemiler birbirini görsün'** içindir; **LRIT 'devletler gemileri uzaktan izlesin'** içindir. İkisi birbirinin yerine geçmez, birbirini tamamlar — biri anlık ve yerel emniyet, diğeri küresel ve stratejik izleme aracıdır. Bir zabit ikisinin de gemide çalışır olmasını sağlamalı ve amaçlarını karıştırmamalıdır.",
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
          "Anten boyutu ve tipi, **çalıştığı frekans bandıyla** doğrudan ilişkilidir — 'en iyi telsiz bile antenine bağlıdır'.\n\n**VHF:** kısa, **çubuk (whip)** tipi anten yeterlidir; direk/köprüüstü üstünde, **mümkün olan en yüksek ve açık** konuma yerleştirilir (telsiz ufku yükseklikle artar). **MF/HF:** çok daha **uzun teller veya kamçı antenler** ve bir **anten tuneri (ATU)** gerekir; bu antenler genellikle **gemi gövdesini topraklama düzlemi** olarak kullanır. **Uydu:** yönlü/sabit **kubbe antenler**; bazı sistemler uyduyu sürekli izleyen **stabilize antene** ihtiyaç duyarken, alçak yörünge takımyıldızları daha basit antenlerle çalışabilir.\n\n**Gemide önemi:** Anten seçimi ve yerleşimi rastgele değildir; örneğin VHF antenini alçak veya gölgeli bir yere koymak menzili keser. Doğru anten + doğru konum, bir telsizin kataloğdaki menzile gerçekten ulaşıp ulaşamayacağını belirler.",
        bulletPoints: [
          "VHF: kısa whip anten, mümkün olan en yüksek konum.",
          "MF/HF: uzun tel/kamçı + ATU; gövde topraklama düzlemi.",
          "Uydu: kubbe/yönlü anten; sistemine göre stabilizasyon gerekebilir.",
        ],
      },
      {
        title: "Anten Bakımı ve Yaygın Arızalar",
        content:
          "Anten ve besleme hattı sorunları, haberleşme arızalarının **sık görülen ve gözden kaçan** nedenidir; sorun çoğu zaman telsizde değil, antendedir.\n\n**Deniz ortamının etkisi:** Tuz, nem ve titreşim; **konnektörlerde korozyon**, kablo girişlerinde **su kaçağı** ve mekanik **gevşemeler** yapar. Düzenli kontrol noktaları: konnektörlerin **temiz ve sızdırmaz** olması, anten **izolatörlerinin** sağlamlığı, **topraklama** bağlantılarının bütünlüğü ve antenin fiziksel durumu.\n\n**Gemide önemi:** Anten sisteminin sağlığı, dolaylı olarak **verici-alıcı performansından** (zayıf menzil, yüksek gürültü) anlaşılır; haftalık test çağrılarında alınan/verilen **sinyal kalitesi** bu açıdan da değerlidir. Bir tehlike anında keşfedilen korozyonlu bir konnektör, tam da en gerekli anda menzili düşürebilir — bu yüzden anten bakımı rutin bir kalemdir.",
        bulletPoints: [
          "Tuz/nem/titreşim: korozyon, su kaçağı ve gevşeme yapar.",
          "Konnektör, izolatör, topraklama ve fiziksel bütünlük düzenli kontrol edilir.",
          "Zayıf menzil/yüksek gürültü çoğu zaman anten/besleme sorununa işaret eder.",
        ],
      },
      {
        title: "GMDSS İçin Yedek (Acil) Enerji Kaynağı",
        content:
          "**SOLAS Bölüm IV**, GMDSS ekipmanının ana ve acil güç kaynaklarına **ek olarak** bir **yedek enerji kaynağıyla (reserve source of energy)** beslenmesini zorunlu kılar; çünkü tehlike anı, tam da jeneratörlerin kaybedildiği an olabilir.\n\n**Kapasite:** Bu yedek kaynak (genellikle **aküler**), ana ve acil jeneratörlerin **ikisi de devre dışı** kaldığında dahi tehlike haberleşmesini sürdürebilmelidir — geminin acil jeneratörü varsa **en az 1 saat**, yoksa **en az 6 saat**. Kapasite, ekipmanın **yarısının verici, yarısının alıcı** durumunda çekeceği güce göre hesaplanır.\n\n**Gemide önemi:** Bu yedek güç, GMDSS'in 'her koşulda çalışır' vaadinin fiziksel temelidir; zayıf veya test edilmemiş bir akü, blackout anında telsizi susturur ve MAYDAY hiç gönderilemez. Bu yüzden yedek güç kapasitesi bir formalite değil, doğrudan bir can güvenliği gereğidir.",
        formula: {
          text: "GMDSS yedek enerji: acil jeneratör VARSA ≥1 saat, YOKSA ≥6 saat (SOLAS Bölüm IV)",
          description: "Kapasite, ekipmanın yarısı verici / yarısı alıcı durumundaki yüke göre hesaplanır; ana+acil güç kesilse bile çalışır",
        },
        bulletPoints: [
          "GMDSS için ana/acil güce ek bir yedek enerji kaynağı zorunludur.",
          "Acil jeneratör varsa ≥1 saat, yoksa ≥6 saat besleme kapasitesi.",
          "Kapasite, tehlike/emniyet haberleşmesi yükü esas alınarak hesaplanır.",
        ],
      },
      {
        title: "Akü Bakımı ve Testleri",
        content:
          "Yedek enerji kaynağının çalışırlığı, ancak **düzenli bakım ve testle** güvence altına alınır — kapasitesi kâğıtta değil, gerçekte olmalıdır.\n\n**Kontroller:** Aküler için günlük/haftalık/aylık kontroller tanımlıdır: **terminal gerilimi**, **şarj akımının** doğrulanması, **elektrolit seviyesi/yoğunluğu** (sulu tip akülerde), terminallerin **temiz ve korozyonsuz** olması ve **havalandırmanın** yeterliliği. Belirli aralıklarla bir **kapasite (deşarj) testi** yapılır ve sonuçlar **radyo log defterine** kaydedilir; düşen kapasiteli aküler **zamanında değiştirilir**.\n\n**Gemide önemi:** PSC denetimlerinde **GMDSS yedek güç kayıtları** sık kontrol edilen alanlardandır; test ve değişim disiplini doğrudan uyumluluğu etkiler. Ama asıl mesele denetim değil işlevdir: bir deşarj testi geçmemiş akü, gerçek bir tehlikede beklenen 6 saati vermeyebilir — bu yüzden akü testi, tüm GMDSS zincirinin en somut ama en çok ihmal edilen halkasıdır.",
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
