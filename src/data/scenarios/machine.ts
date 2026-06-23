import type { Scenario } from "./types";

/**
 * Makine (machine-*) — makine dairesi vardiya/karar senaryoları (beta).
 *
 * topicKey, beta kategori id'siyle aynıdır: "machine-<slug>" (örn.
 * "machine-diesel-engines"). Atıflar SOLAS II-2, MARPOL Ek I/VI, STCW vardiya
 * kuralları, ISM ve yerleşik iyi mühendislik/üretici uygulamalarına dayanır.
 */
export const machineScenarios: Scenario[] = [
  // ─── Termodinamik ──────────────────────────────────────────────────────
  {
    id: "mac-thermo-cooling-loss",
    topicKey: "machine-thermodynamics",
    title: "Ana Makine Aşırı Isınma: Soğutma Suyu Düşüşü",
    level: "officer",
    briefing:
      "Seyir vardiyasındasınız. Ana makine silindir ceket soğutma suyu çıkış sıcaklığı hızla yükseliyor ve yüksek sıcaklık alarmı çaldı. Soğutma suyu genleşme tankı seviyesi düşüyor.",
    learningGoals: [
      "Aşırı ısınmada ısı dengesini ve doğru ilk müdahaleyi kavramak",
      "Termal şoktan kaçınmak için kademeli yük azaltma",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Sıcaklık yükseliyor, genleşme tankı seviyesi düşüyor (olası kaçak/hava). Köprüüstü manevra beklemiyor.",
        question: "İlk doğru müdahale nedir?",
        choices: [
          {
            text: "Köprüüstüne bildirip yükü kademeli azaltır, soğutma devresini (pompa, seviye, hava) kontrol ederim",
            outcome: "safe",
            feedback:
              "Doğru. Köprüüstü bilgilendirilir, yük kademeli düşürülerek ısı girişi azaltılır ve soğutma kaybının nedeni (kaçak, hava, pompa) araştırılır.",
            source: { code: "Makine vardiyası / STCW", detail: "Anomalide köprüüstüne bildir, kademeli yük" },
            next: "step2",
          },
          {
            text: "Yükü ve sıcaklığı yok sayıp seyre devam ederim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Aşırı ısınma piston sıkışması/silindir hasarına yol açabilir; alarm dikkate alınmalı ve yük azaltılmalıdır.",
            source: { code: "Makine emniyeti", detail: "Aşırı ısınma = ciddi hasar riski" },
            next: "step2",
          },
          {
            text: "Soğuk yedek su ile devreyi aniden doldururum",
            outcome: "risky",
            feedback:
              "Riskli. Sıcak motora ani soğuk su termal şok ve çatlak yaratabilir; doldurma kontrollü ve sıcaklık dengelenerek yapılır.",
            source: { code: "Termal şok", detail: "Ani sıcaklık farkından kaçın" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Yük azaltıldı, neden araştırılıyor. Sıcaklık hâlâ yüksek.",
        question: "Sıcaklık güvenli seviyeye inmezse ne yaparsınız?",
        choices: [
          {
            text: "Köprüüstüyle koordineli olarak makineyi durdurma seçeneğini değerlendiririm",
            outcome: "safe",
            feedback:
              "Doğru. Soğutma sağlanamıyorsa, ciddi hasarı önlemek için köprüüstüyle koordineli durdurma gündeme gelir; baş emniyeti gözetilir.",
            source: { code: "Makine emniyeti / köprü-makine koordinasyonu", detail: "Gerekirse koordineli durdurma" },
          },
          {
            text: "Sıcaklık sensörünü iptal eder, alarmı susturup devam ederim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Koruma/algılamayı devre dışı bırakmak gerçek arızayı gizler ve katastrofik hasara yol açar.",
            source: { code: "Makine emniyeti", detail: "Korumayı baypas etme" },
          },
        ],
      },
    ],
    debrief:
      "Aşırı ısınmada ısı girişini azaltmak için önce köprüüstü bilgilendirilip yük kademeli düşürülür, ardından soğutma kaybının nedeni (kaçak, hava, pompa arızası) araştırılır. Sıcak motora ani soğuk su termal şok yaratır. Soğutma sağlanamıyorsa köprüüstüyle koordineli durdurma değerlendirilir. Korumaların/sensörlerin baypas edilmesi asla çözüm değildir.",
  },

  // ─── Akışkanlar Mekaniği ───────────────────────────────────────────────
  {
    id: "mac-fluid-cavitation",
    topicKey: "machine-fluid-mechanics",
    title: "Pompa Kavitasyonu: Emiş Kaybı",
    level: "officer",
    briefing:
      "Bir transfer pompası çalışırken gürültü, titreşim ve dalgalı basınç gösteriyor; debi düştü. Emiş tarafı filtresi uzun süredir temizlenmemiş ve emiş tankı seviyesi düşük.",
    learningGoals: [
      "Kavitasyon/emiş kaybı belirtilerini ve NPSH mantığını tanımak",
      "Pompayı ve sistemi koruyacak doğru müdahaleyi seçmek",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Pompa 'çakıl çekiyormuş gibi' ses çıkarıyor, basınç dalgalı (kavitasyon belirtisi). Emiş filtresi kirli, tank seviyesi düşük.",
        question: "Belirtiyi nasıl yorumlar ve ne yaparsınız?",
        choices: [
          {
            text: "Kavitasyon/emiş kaybı; emiş basıncını (NPSH) düşüren nedenleri (kirli filtre, düşük seviye, kapalı valf) giderir, gerekirse pompayı durdururum",
            outcome: "safe",
            feedback:
              "Doğru. Kavitasyon, emiş basıncının buharlaşma basıncının altına inmesiyle olur; filtre temizliği, seviye ve valf kontrolü ile emiş şartı düzeltilir.",
            source: { code: "Akışkanlar mekaniği (NPSH/kavitasyon)", detail: "Emiş basıncını iyileştir" },
            next: "step2",
          },
          {
            text: "Debiyi artırmak için basma valfini sonuna kadar açarım",
            outcome: "danger",
            feedback:
              "Yanlış. Sorun emiş tarafındadır; basmayı açmak kavitasyonu çözmez, pompayı zorlar.",
            source: { code: "Pompa işletimi", detail: "Sorun emişte; basmada değil" },
            next: "step2",
          },
          {
            text: "Sesi normal sayıp çalıştırmaya devam ederim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Sürekli kavitasyon çark erozyonu ve mekanik salmastra/yatak hasarı yapar.",
            source: { code: "Kavitasyon hasarı", detail: "Çark/erozyon riski" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Pompa kuru çalışma riskine girdi (seviye çok düştü).",
        question: "Kuru çalışmaya karşı ne yaparsınız?",
        choices: [
          {
            text: "Pompayı durdurur, hava alır (priming) ve emiş şartı sağlanınca tekrar başlatırım",
            outcome: "safe",
            feedback:
              "Doğru. Kuru çalışma mekanik salmastrayı dakikalar içinde yakar; pompa durdurulup primlenir ve emiş garanti altına alınınca çalıştırılır.",
            source: { code: "Pompa koruması", detail: "Kuru çalışma salmastrayı yakar" },
          },
          {
            text: "Seviye düşse de pompayı çalışır tutarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Kuru çalışma sızdırmazlık ve yatak hasarına yol açar; pompa korunmalıdır.",
            source: { code: "Pompa koruması", detail: "Kuru çalışmadan kaçın" },
          },
        ],
      },
    ],
    debrief:
      "Gürültü, titreşim ve dalgalı basınç kavitasyon/emiş kaybı belirtisidir; neden emiş tarafındadır (kirli filtre, düşük seviye, kapalı valf — düşük NPSH). Çözüm emiş basıncını iyileştirmektir, basma valfini açmak değil. Düşük seviyede kuru çalışma mekanik salmastrayı dakikalar içinde yakar; pompa durdurulur, primlenir ve emiş sağlanınca yeniden başlatılır.",
  },

  // ─── Makine Elemanları ─────────────────────────────────────────────────
  {
    id: "mac-elements-bearing-vibration",
    topicKey: "machine-machine-elements",
    title: "Yatak Aşırı Isınma ve Titreşim",
    level: "officer",
    briefing:
      "Bir yardımcı makinenin yatağında sıcaklık yükseldi ve titreşim arttı. Yağlama yağı basıncı normalin altında, yağ sıcaklığı yüksek.",
    learningGoals: [
      "Yatak arızası belirtilerini (sıcaklık, titreşim, yağ basıncı) ilişkilendirmek",
      "İlerleyen hasarı önlemek için doğru karar vermek",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Yatak sıcaklığı ve titreşim artıyor, yağ basıncı düşük. Yetersiz yağ filmi yatağı tahrip edebilir.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Yük/devri azaltır, yağlama sistemini (basınç, seviye, filtre) kontrol eder, gerekirse durdururum",
            outcome: "safe",
            feedback:
              "Doğru. Düşük yağ basıncı + ısınma + titreşim yatak hasarının klasik üçlüsüdür; yük azaltılır ve yağlama incelenir, gerekirse makine durdurulur.",
            source: { code: "İyi mühendislik uygulaması", detail: "Düşük yağ basıncı + ısınma = yatak riski" },
            next: "step2",
          },
          {
            text: "Yükü artırarak yatağın 'oturmasını' beklerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Yük artırmak ısınmayı ve hasarı hızlandırır; yatak sıkışıp mil hasarına yol açabilir.",
            source: { code: "İyi mühendislik uygulaması", detail: "Arızada yük azaltılır" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Yağ basıncı düşük kalmaya devam ediyor.",
        question: "Sonraki adım?",
        choices: [
          {
            text: "Makineyi emniyetle durdurur, soğutup yatağı/yağ filtresini muayene eder ve kaydı tutarım",
            outcome: "safe",
            feedback:
              "Doğru. Yağ filmi garanti edilemiyorsa durdurma ve muayene şarttır; PMS kaydı yapılır.",
            source: { code: "PMS / bakım kaydı", detail: "Durdur, muayene et, kaydet" },
          },
          {
            text: "Alarmı susturup çalıştırmaya devam ederim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Alarmı susturmak hasarı gizler; yatak tamamen tahrip olabilir.",
            source: { code: "Makine emniyeti", detail: "Alarmı baypas etme" },
          },
        ],
      },
    ],
    debrief:
      "Yatakta sıcaklık artışı + titreşim + düşük yağ basıncı, yetersiz yağ filmi ve ilerleyen yatak hasarının işaretidir. Doğru tepki: yük/devri azaltmak, yağlama sistemini kontrol etmek ve gerekirse makineyi durdurup muayene etmektir. Yük artırmak veya alarmı susturmak hasarı hızlandırır. Bulgular ve müdahale PMS/bakım kayıtlarına işlenir.",
  },

  // ─── Dizel Makineler ───────────────────────────────────────────────────
  {
    id: "mac-diesel-scavenge-fire",
    topicKey: "machine-diesel-engines",
    title: "Süpürme Havası Yangını (Scavenge Fire)",
    level: "officer",
    briefing:
      "İki zamanlı ana makinede bir silindirin süpürme (scavenge) kuşağı bölgesi sıcaklığı hızla yükseldi, egzoz sıcaklığı değişti ve turbo devri düştü. Süpürme kuşağında yanma — scavenge fire — belirtileri var.",
    learningGoals: [
      "Scavenge fire belirtilerini ve nedenini (birikmiş yağ/kurum) tanımak",
      "Doğru söndürme ve sonrası kontrolü uygulamak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Süpürme kuşağı sıcaklığı yükseldi (scavenge fire). Birikmiş yağ/karbon tutuşmuş olabilir.",
        question: "İlk müdahale nedir?",
        choices: [
          {
            text: "Köprüüstüne bildirip yükü azaltır, yakıtı keser/azaltır ve etkilenen silindiri yağlamaya devam ederim; scavenge sabit söndürmesini kullanırım",
            outcome: "safe",
            feedback:
              "Doğru. Yük/yakıt azaltılır, silindir yağlaması sürdürülür ve süpürme kuşağı sabit söndürme tertibatı (buhar/CO₂) devreye alınır.",
            source: { code: "Üretici/iyi uygulama", detail: "Yük↓, yakıt↓, kuşak söndürme" },
            next: "step2",
          },
          {
            text: "Kuşak kapaklarını açıp içeriye bakarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Kapağı açmak hava (oksijen) verir ve alevi büyütür; geri tepme yanık riski yaratır.",
            source: { code: "Scavenge fire", detail: "Kapak açma = oksijen besler" },
            next: "step2",
          },
          {
            text: "Yükü artırarak yangını 'üfleyip' söndürmeye çalışırım",
            outcome: "danger",
            feedback:
              "Yanlış. Yük artırmak daha fazla yakıt/ısı verir ve durumu kötüleştirir.",
            source: { code: "Scavenge fire", detail: "Yük azaltılır" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Yangın söndü, sıcaklıklar düşüyor.",
        question: "Sonrasında ne yaparsınız?",
        choices: [
          {
            text: "Soğumasını bekler, kuşağı temizler, drenajları ve yağ birikimini kontrol eder, nedeni (zayıf yanma/aşırı yağlama) araştırırım",
            outcome: "safe",
            feedback:
              "Doğru. Scavenge fire genelde birikmiş yağ/kurumdan çıkar; temizlik, drenaj kontrolü ve kök neden (segman, yakıt, yağlama) incelenir.",
            source: { code: "Bakım/kök neden", detail: "Kuşak temizliği + neden analizi" },
          },
          {
            text: "Hemen tam yüke çıkarım",
            outcome: "risky",
            feedback:
              "Riskli. Kontrol ve temizlik yapılmadan tam yük, kalıntı/yeni tutuşma ve tekrar yangın riski taşır.",
            source: { code: "İyi uygulama", detail: "Kontrolden önce tam yük yok" },
          },
        ],
      },
    ],
    debrief:
      "Süpürme kuşağında sıcaklık artışı scavenge fire belirtisidir; nedeni genellikle kuşakta biriken yağ/kurumdur. Doğru tepki: köprüüstüne bildir, yük/yakıt azalt, silindir yağlamasını sürdür ve kuşak sabit söndürmesini kullan. Kuşak kapağını açmak oksijen verip alevi büyütür. Yangın sonrası soğuma beklenir, kuşak temizlenir ve kök neden (segman/yanma/yağlama) araştırılır.",
  },

  // ─── Gemi Sistemleri ───────────────────────────────────────────────────
  {
    id: "mac-shipsys-steering-failure",
    topicKey: "machine-ship-systems",
    title: "Dümen Donanımı Arızası: Dar Suda",
    level: "officer",
    briefing:
      "Gemi trafik ayrım şemasına yaklaşırken köprüüstü 'dümen cevap vermiyor' diye makine dairesini arıyor. Bir dümen hidrolik pompası alarm verdi.",
    learningGoals: [
      "Dümen arızasında yedek sisteme/ikinci pompaya geçişi bilmek",
      "Köprü-makine koordinasyonu ve acil dümen prosedürünü uygulamak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Bir dümen pompası arızalı; gemi dar/yoğun suda. Çoğu gemide iki bağımsız güç ünitesi vardır.",
        question: "İlk doğru aksiyon nedir?",
        choices: [
          {
            text: "Hemen ikinci/yedek dümen güç ünitesini devreye alır ve köprüüstüne bildiririm",
            outcome: "safe",
            feedback:
              "Doğru. SOLAS gereği dümen donanımında yedeklilik vardır; arızada ikinci ünite devreye alınır ve köprüüstü anında bilgilendirilir.",
            source: { code: "SOLAS II-1 (dümen donanımı)", detail: "Yedek güç ünitesine geçiş" },
            next: "step2",
          },
          {
            text: "Arızalı pompayı tamir edene kadar beklerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Dar suda dümensiz kalmak çatışma/karaya oturma riskidir; önce yedeğe geçilir, tamir sonra yapılır.",
            source: { code: "Acil dümen", detail: "Önce yedek, sonra tamir" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Köprü hâlâ tam kontrol alamadı; acil dümen istasyonuna gerek olabilir.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Dümen makine dairesindeki acil/lokal kumanda istasyonunu hazırlar, telefon/telgrafla köprüyle senkron dümen tutarım",
            outcome: "safe",
            feedback:
              "Doğru. Acil dümen kumandası ve köprü-makine haberleşmesiyle (helm order tekrarı) gemi yönlendirilebilir; bu prosedür düzenli talim edilir.",
            source: { code: "Acil dümen talimi / SOLAS V", detail: "Lokal dümen + köprü koordinasyonu" },
          },
          {
            text: "Köprünün kendi başına halletmesini beklerim",
            outcome: "danger",
            feedback:
              "Yanlış. Acil dümen, makine dairesi ekibinin aktif katılımını gerektirir; pasif beklemek tehlikelidir.",
            source: { code: "Acil dümen", detail: "Makine ekibi aktif rol alır" },
          },
        ],
      },
    ],
    debrief:
      "Dümen arızasında öncelik, SOLAS'ın gerektirdiği yedekliliği kullanmaktır: ikinci/yedek güç ünitesi hemen devreye alınır ve köprüüstü anında bilgilendirilir. Kontrol sağlanamazsa makine dairesindeki acil/lokal dümen istasyonu hazırlanır ve köprüyle senkron (helm order tekrarı) dümen tutulur. Bu acil dümen prosedürü düzenli talim gerektirir.",
  },

  // ─── Yardımcı Makineler ────────────────────────────────────────────────
  {
    id: "mac-aux-boiler-low-water",
    topicKey: "machine-auxiliary",
    title: "Kazan Düşük Su Seviyesi Alarmı",
    level: "officer",
    briefing:
      "Yardımcı buhar kazanında düşük su seviyesi alarmı çaldı. Besleme suyu pompası dalgalı çalışıyor ve gözetleme camında (gauge glass) seviye görünmüyor.",
    learningGoals: [
      "Düşük su seviyesinin tehlikesini (aşırı ısınma/patlama) kavramak",
      "Doğru müdahaleyi (ateşi kes, seviyeyi doğrula) uygulamak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Su seviyesi camda görünmüyor. Düşük seviyede ısıtma yüzeyleri açıkta kalıp aşırı ısınabilir.",
        question: "İlk müdahale nedir?",
        choices: [
          {
            text: "Yakıtı/ateşi keser (yanmayı durdurur), seviyeyi gauge glass'ı blöf ederek doğrularım",
            outcome: "safe",
            feedback:
              "Doğru. Düşük su seviyesinde önce ateş kesilir; sonra gauge glass blöf edilerek gerçek seviye doğrulanır. Bu, aşırı ısınma ve hasarı önler.",
            source: { code: "Kazan emniyeti", detail: "Düşük suda önce ateşi kes" },
            next: "step2",
          },
          {
            text: "Hemen bol miktarda soğuk besleme suyu basarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Aşırı ısınmış metale ani soğuk su termal şok ve ani buhar üretimiyle patlama riski yaratır; önce ateş kesilir.",
            source: { code: "Kazan emniyeti", detail: "Sıcak metale ani su = şok/patlama" },
            next: "step2",
          },
          {
            text: "Alarmı arıza sayıp görmezden gelirim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Düşük su seviyesi kazan patlamasının başlıca nedenidir; alarm doğrulanmadan yok sayılamaz.",
            source: { code: "Kazan emniyeti", detail: "Düşük su = patlama riski" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Ateş kesildi, seviye gerçekten çok düşük doğrulandı.",
        question: "Sonra ne yaparsınız?",
        choices: [
          {
            text: "Kazanı soğumaya bırakır, besleme sistemini (pompa, valf, otomatik kontrol) arızasını giderdikten sonra kontrollü doldururum",
            outcome: "safe",
            feedback:
              "Doğru. Kazan güvenli sıcaklığa inince besleme arızası giderilir ve kontrollü doldurma yapılır; otomatik düşük-su koruması test edilir.",
            source: { code: "Kazan işletme prosedürü", detail: "Soğut, arızayı gider, kontrollü doldur" },
          },
          {
            text: "Sıcakken hızlıca doldurup tekrar ateşlerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Aşırı ısınmış kazana hızlı doldurma ve yeniden ateşleme termal hasar/patlama riski taşır.",
            source: { code: "Kazan emniyeti", detail: "Sıcakken hızlı doldurma yok" },
          },
        ],
      },
    ],
    debrief:
      "Kazanda düşük su seviyesi en tehlikeli durumlardan biridir: ısıtma yüzeyleri açıkta kalıp aşırı ısınır. Doğru tepki: ÖNCE ateşi/yakıtı kes, sonra gauge glass'ı blöf edip gerçek seviyeyi doğrula. Aşırı ısınmış metale ani soğuk su termal şok ve patlama yaratır. Kazan soğuduktan sonra besleme arızası giderilip kontrollü doldurulur ve düşük-su koruması test edilir.",
  },

  // ─── Yakıt Teknolojisi ─────────────────────────────────────────────────
  {
    id: "mac-fuel-eca-changeover",
    topicKey: "machine-fuel-technology",
    title: "ECA Girişi: Yakıt Değişimi",
    level: "officer",
    briefing:
      "Gemi birkaç saat içinde bir Emisyon Kontrol Alanına (ECA) girecek. Şu an %0.50 kükürtlü VLSFO yakıyorsunuz; ECA içinde %0.10 sınırı geçerli. Değişimi düşük kükürtlü yakıta (uyumlu) yapmanız gerekiyor.",
    learningGoals: [
      "ECA kükürt sınırını (%0.10) ve zamanında değişim gereğini kavramak",
      "Yakıt değişimini kademeli yapıp kaydı tutmak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "ECA sınırına yaklaşıyorsunuz. Değişim sıcaklık/viskozite farkı nedeniyle dikkat ister.",
        question: "Değişimi nasıl planlarsınız?",
        choices: [
          {
            text: "ECA'ya girmeden önce, kademeli ve sıcaklık/viskoziteyi kontrol ederek tamamlar; saat/mevki/miktarı kaydederim",
            outcome: "safe",
            feedback:
              "Doğru. Değişim ECA sınırından önce tamamlanmalı; ani sıcaklık değişimi yakıt pompası sıkışmasına yol açabileceğinden kademeli yapılır ve kayıt tutulur.",
            source: { code: "MARPOL Ek VI (ECA %0.10)", detail: "Zamanında, kademeli değişim + kayıt" },
            next: "step2",
          },
          {
            text: "ECA'ya girince hızlıca değiştiririm",
            outcome: "danger",
            feedback:
              "Yanlış. ECA içinde sınırı aşan yakıtla seyir ihlaldir; değişim sınırdan ÖNCE tamamlanmalıdır.",
            source: { code: "MARPOL Ek VI", detail: "Sınırdan önce uyumlu yakıt" },
            next: "step2",
          },
          {
            text: "Değişimi ani ve tam yükte yaparım",
            outcome: "risky",
            feedback:
              "Riskli. Ani sıcaklık/viskozite değişimi yakıt enjeksiyon ekipmanında sıkışma/kaçak yaratabilir; kademeli yapılmalıdır.",
            source: { code: "Yakıt değişim prosedürü", detail: "Kademeli sıcaklık yönetimi" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Değişim sırasında bir yakıt pompasında sıkışma belirtisi var.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Sıcaklık değişim hızını yavaşlatır, viskoziteyi uygun aralıkta tutar ve sistemi yakından izlerim",
            outcome: "safe",
            feedback:
              "Doğru. Sıkışma genelde hızlı sıcaklık/viskozite değişimindendir; geçiş yavaşlatılır ve viskozite kontrol altında tutulur.",
            source: { code: "Yakıt değişim prosedürü", detail: "Viskozite/sıcaklık kontrolü" },
          },
          {
            text: "Pompayı zorla çalıştırmaya devam ederim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Zorlama plunger sıkışması/hasarı ve güç kaybına yol açabilir; geçiş koşulları düzeltilmelidir.",
            source: { code: "Yakıt sistemi", detail: "Sıkışmada zorlama yok" },
          },
        ],
      },
    ],
    debrief:
      "ECA içinde kükürt sınırı %0.10'dur ve uyumlu yakıta geçiş ECA sınırından ÖNCE tamamlanmalıdır. Değişim, sıcaklık/viskozite farkı yakıt enjeksiyon ekipmanını sıkıştırabileceğinden kademeli yapılır; saat, mevki ve miktar kayıt altına alınır. Sıkışma belirtisinde geçiş hızı yavaşlatılır ve viskozite uygun aralıkta tutulur; pompa zorlanmaz.",
  },

  // ─── Soğutma ve HVAC ───────────────────────────────────────────────────
  {
    id: "mac-cooling-refrigerant-leak",
    topicKey: "machine-cooling-hvac",
    title: "Soğutucu Gaz Kaçağı: Kompresör Dairesi",
    level: "officer",
    briefing:
      "Kumanya soğutma (provision) tesisinde düşük basınç alarmı ve gaz dedektörü uyarısı var. Kompresör dairesinde soğutucu gaz kaçağından şüpheleniliyor; mahal kapalı ve havalandırması sınırlı.",
    learningGoals: [
      "Soğutucu kaçağında personel güvenliğini (boğulma/oksijen yerini alma) önceliklemek",
      "Kaçak müdahalesi ve çevre/uyum (ODS) kaydını kavramak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Kapalı mahalde soğutucu gaz birikebilir; bazı gazlar oksijenin yerini alıp boğar. Gaz dedektörü uyarıyor.",
        question: "İlk aksiyon nedir?",
        choices: [
          {
            text: "Mahale girmeden havalandırır, personeli uzak tutar, sonra korunarak kaçağı araştırırım",
            outcome: "safe",
            feedback:
              "Doğru. Soğutucu gaz oksijenin yerini alıp boğabilir; önce havalandırma ve personel güvenliği, sonra korunaklı müdahale gelir.",
            source: { code: "Soğutucu güvenliği / kapalı mahal", detail: "Önce havalandır, personeli koru" },
            next: "step2",
          },
          {
            text: "Hemen içeri girip kaçağı elle kontrol ederim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Havalandırılmamış mahalde gaz birikimi boğulmaya yol açabilir; doğrudan giriş risklidir.",
            source: { code: "Kapalı mahal", detail: "Havalandırmadan giriş yok" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Kaçak bulundu ve giderildi. Bir miktar soğutucu gaz atmosfere kaçtı.",
        question: "Çevre/uyum açısından ne yaparsınız?",
        choices: [
          {
            text: "Gaz tipini/kaçağı kaydeder, ODS ise MARPOL Ek VI gerekliliklerine göre raporlar ve sistemi şarj ederim",
            outcome: "safe",
            feedback:
              "Doğru. Ozon tabakasına zararlı maddeler (ODS) için kayıt/raporlama gereklidir; kaçak giderilip uyumlu şekilde şarj edilir.",
            source: { code: "MARPOL Ek VI (ODS)", detail: "Soğutucu kaçağı kaydı/raporu" },
          },
          {
            text: "Sessizce şarj eder, hiçbir şey kaydetmem",
            outcome: "danger",
            feedback:
              "Yanlış. Soğutucu kaçakları kayıt gerektirir; ODS için uyum yükümlülüğü vardır, kayıtsızlık ihlaldir.",
            source: { code: "MARPOL Ek VI", detail: "Kayıt/uyum zorunlu" },
          },
        ],
      },
    ],
    debrief:
      "Kapalı kompresör dairesinde soğutucu gaz kaçağı, gazın oksijenin yerini alıp boğması nedeniyle önce bir CAN GÜVENLİĞİ sorunudur: havalandır, personeli uzak tut, korunarak müdahale et. Kaçak giderildikten sonra gaz tipi ve kaçak kaydedilir; ozon tabakasına zararlı maddeler (ODS) için MARPOL Ek VI raporlama/uyum yükümlülükleri yerine getirilir.",
  },

  // ─── Elektrik ──────────────────────────────────────────────────────────
  {
    id: "mac-elec-blackout-recovery",
    topicKey: "machine-electrical",
    title: "Blackout: Güç Geri Kazanımı",
    level: "officer",
    briefing:
      "Seyirde ana pano gerilimi düştü ve gemi karardı (blackout). Acil jeneratör otomatik devreye girip acil baraya güç verdi. Ana makine de durdu (yardımcıların kaybı).",
    learningGoals: [
      "Blackout sonrası güvenli güç geri kazanım sırasını bilmek",
      "Köprüüstüyle koordinasyon ve önceliklerin sırasını kavramak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Acil jeneratör acil barayı besliyor. Ana jeneratör(ler) durmuş. Köprüüstü durumu bilmiyor olabilir.",
        question: "İlk doğru aksiyon nedir?",
        choices: [
          {
            text: "Köprüüstüne bildirir, bir jeneratörü başlatıp ana panoya alır, sonra önemli yardımcıları sırayla devreye sokarım",
            outcome: "safe",
            feedback:
              "Doğru. Önce köprüüstü bilgilendirilir; jeneratör başlatılıp panoya alınır, ardından kademeli yük (soğutma, yağlama, dümen) verilerek güç kararlı geri kazanılır.",
            source: { code: "Blackout recovery / iyi uygulama", detail: "Köprü + kademeli yük" },
            next: "step2",
          },
          {
            text: "Tüm tüketicileri aynı anda devreye alırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Ani toplu yük jeneratörü tekrar trip ettirip yeni bir blackout yaratabilir; yük kademeli verilmelidir.",
            source: { code: "Güç yönetimi", detail: "Kademeli yük; ani toplu yük yok" },
            next: "step2",
          },
          {
            text: "Önce ana makineyi başlatmaya çalışırım",
            outcome: "risky",
            feedback:
              "Sıra yanlış. Ana makine için önce yardımcılar (yağlama, soğutma, başlatma havası) gerekir; önce panoya güç ve yardımcılar alınır.",
            source: { code: "Başlatma sırası", detail: "Önce güç+yardımcılar, sonra ana makine" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Pano enerjilendi, yardımcılar devrede. Blackout nedeni henüz belirsiz.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Nedeni (aşırı yük, yakıt, koruma trip, kısa devre) araştırır, kaydeder ve önlem alırım",
            outcome: "safe",
            feedback:
              "Doğru. Tekrarı önlemek için kök neden bulunur (örn. yedek jeneratör otomatik devreye alma/preferential trip ayarı) ve kayıt tutulur.",
            source: { code: "Kök neden / PMS", detail: "Nedeni bul, kaydet, önle" },
          },
          {
            text: "Çalıştı, nedeni araştırmaya gerek yok diye devam ederim",
            outcome: "danger",
            feedback:
              "Yanlış. Neden bulunmazsa blackout tekrarlar; özellikle manevra anında bu kritik tehlikedir.",
            source: { code: "ERM", detail: "Tekrarı önlemek için neden analizi" },
          },
        ],
      },
    ],
    debrief:
      "Blackout'ta acil jeneratör acil barayı besler. Güvenli geri kazanım sırası: köprüüstünü bilgilendir → bir jeneratörü başlatıp ana panoya al → önemli yardımcıları (soğutma, yağlama, dümen) KADEMELİ devreye sok → ana makineyi başlat. Tüm yükü aynı anda vermek yeni bir trip/blackout yaratır. Son olarak kök neden bulunup kaydedilir; aksi hâlde olay tekrarlar.",
  },

  // ─── Otomasyon ─────────────────────────────────────────────────────────
  {
    id: "mac-auto-sensor-fault",
    topicKey: "machine-automation",
    title: "Şüpheli Alarm: Sensör mü, Gerçek mi?",
    level: "officer",
    briefing:
      "UMS (insansız makine dairesi) modunda dinlenirken bir sıcaklık alarmı geldi: bir soğutma suyu sensörü çok yüksek değer gösteriyor. Ancak ilgili sistemdeki diğer göstergeler normal görünüyor.",
    learningGoals: [
      "Sensör arızası ile gerçek arızayı ayırt etmek için çapraz kontrol",
      "Korumayı baypas etmeden güvenli doğrulama yapmak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Bir sensör aşırı değer veriyor ama bağımsız göstergeler normal. Gerçek arıza da olabilir, sensör arızası da.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Makine dairesine inip yerinde (lokal manometre/termometre) çapraz kontrol yapar, gerçek durumu doğrularım",
            outcome: "safe",
            feedback:
              "Doğru. Alarm asla körü körüne yok sayılmaz; bağımsız ölçümle çapraz kontrol yapılarak sensör mü gerçek arıza mı belirlenir.",
            source: { code: "Otomasyon/ERM", detail: "Bağımsız çapraz kontrol" },
            next: "step2",
          },
          {
            text: "Diğerleri normal diye alarmı hemen susturup yatağa dönerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Doğrulamadan alarmı yok saymak gerçek bir arızayı (örn. yerel aşırı ısınma) gözden kaçırabilir.",
            source: { code: "Alarm yönetimi", detail: "Doğrulamadan susturma yok" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Yerinde kontrol sensörün arızalı olduğunu (gerçek değer normal) gösterdi.",
        question: "Sonra ne yaparsınız?",
        choices: [
          {
            text: "Arızalı sensörü kayda alır, değiştirilene kadar ilgili parametreyi manuel/yedek izlemeyle takip ederim",
            outcome: "safe",
            feedback:
              "Doğru. Arızalı sensör kaydedilir ve değişimine kadar parametre alternatif yolla izlenir; koruma kalıcı baypas edilmez.",
            source: { code: "PMS / otomasyon bakımı", detail: "Kaydet, izle, sensörü değiştir" },
          },
          {
            text: "Kanalı tamamen iptal eder ve unuturum",
            outcome: "danger",
            feedback:
              "Tehlikeli. Algılamayı kalıcı iptal etmek, sensör değişene kadar gerçek bir arızanın fark edilmemesine yol açar.",
            source: { code: "Alarm yönetimi", detail: "Korumayı kalıcı iptal etme" },
          },
        ],
      },
    ],
    debrief:
      "UMS modunda gelen şüpheli alarm körü körüne ne yok sayılır ne de doğru kabul edilir. Doğru yol, bağımsız ölçümle (lokal manometre/termometre) çapraz kontrol yapıp sensör arızası mı gerçek arıza mı olduğunu belirlemektir. Arızalı sensör kaydedilir ve değişimine kadar parametre alternatif izlemeyle takip edilir; algılama/koruma kalıcı olarak baypas edilmez.",
  },

  // ─── Makine Dairesi Operasyonları ──────────────────────────────────────
  {
    id: "mac-ops-watch-handover",
    topicKey: "machine-engine-room-ops",
    title: "Vardiya Devir-Teslimi: Eksik Bilgi",
    level: "cadet",
    briefing:
      "Makine vardiyasını devralacaksınız. Devreden mühendis acelesi var; 'her şey normal' deyip çıkmak istiyor. Ancak bir yakıt servis tankının seviyesi düşük ve bir purifier'da küçük bir alarm geçmişi var.",
    learningGoals: [
      "Eksiksiz makine vardiya devir-teslimi yapmak",
      "Devralmadan önce durumu doğrulamak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Devreden mühendis hızlı geçmek istiyor; ancak tank seviyesi ve purifier alarmı gibi açık konular var.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Devralmadan önce parametreleri, açık alarmları, devam eden işleri ve tank seviyelerini birlikte gözden geçiririm",
            outcome: "safe",
            feedback:
              "Doğru. STCW eksiksiz devir-teslim ister; devralan, durumu kendisi doğrulamadan vardiyayı kabul etmez.",
            source: { code: "STCW (makine vardiyası)", detail: "Eksiksiz devir-teslim + doğrulama" },
            next: "step2",
          },
          {
            text: "'Normal' bilgisine güvenip devralırım",
            outcome: "danger",
            feedback:
              "Yanlış. Doğrulanmamış 'normal' beyanı, düşük tank/purifier sorunu gibi açık konuları gizleyebilir.",
            source: { code: "STCW", detail: "Doğrulamadan devir kabul edilmez" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Devraldıktan kısa süre sonra purifier tekrar alarm verdi.",
        question: "Önceden bilgi almış olmanın faydası ne olurdu?",
        choices: [
          {
            text: "Alarm geçmişini bildiğim için nedeni hızla teşhis eder ve uygun müdahaleyi yaparım",
            outcome: "safe",
            feedback:
              "Doğru. İyi devir-teslim, tekrarlayan/önceden bilinen sorunlarda hızlı ve doğru müdahaleyi sağlar.",
            source: { code: "ERM", detail: "Bilgi sürekliliği = hızlı teşhis" },
          },
          {
            text: "Bilgim olmadığından sıfırdan araştırmaya başlardım (zaman kaybı)",
            outcome: "risky",
            feedback:
              "Bu, eksik devir-teslimin bedelidir: bilinen bir sorun yeniden, zaman kaybederek keşfedilir.",
            source: { code: "ERM", detail: "Eksik devir = tekrar eden teşhis" },
          },
        ],
      },
    ],
    debrief:
      "Makine vardiya devir-teslimi STCW gereği eksiksiz olmalıdır: parametreler, açık alarmlar, devam eden işler, tank seviyeleri ve özel talimatlar aktarılır ve devralan durumu kendisi doğrular. 'Her şey normal' beyanına doğrulamadan güvenmek, düşük tank/purifier alarmı gibi açık sorunları gizler. İyi devir-teslim, sonraki arızalarda hızlı ve doğru müdahale sağlar.",
  },

  // ─── Bakım ─────────────────────────────────────────────────────────────
  {
    id: "mac-maint-loto-permit",
    topicKey: "machine-maintenance",
    title: "Bakım Güvenliği: Pompaya Müdahale",
    level: "officer",
    briefing:
      "Arızalı bir pompanın çarkını sökeceksiniz. Pompa uzaktan (otomatik) da çalışabiliyor ve aynı baraya bağlı. Bir gemici işe başlamak için sizi bekliyor.",
    learningGoals: [
      "Enerji izolasyonu (LOTO) ve iş izni prosedürünü uygulamak",
      "Beklenmedik çalışmaya karşı korunmak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Pompa uzaktan otomatik çalışabilir. Sökme sırasında beklenmedik dönme ciddi yaralanma yapar.",
        question: "İşe başlamadan önce ne yaparsınız?",
        choices: [
          {
            text: "İş izni alır, elektriği kesip kilitler/etiketlerim (LOTO), uzaktan başlatmayı devre dışı bırakır ve dönmediğini doğrularım",
            outcome: "safe",
            feedback:
              "Doğru. Enerji izolasyonu (Lockout/Tagout) ve iş izni, beklenmedik çalışmayı önler; izolasyon test edilerek (try) doğrulanır.",
            source: { code: "İş izni / LOTO", detail: "İzole et, kilitle, etiketle, doğrula" },
            next: "step2",
          },
          {
            text: "Sadece yerel durdurma butonuna basıp başlarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Yerel stop, uzaktan/otomatik başlatmayı engellemez; ekipman çalışmaya başlayabilir. Tam izolasyon ve kilitleme gerekir.",
            source: { code: "LOTO", detail: "Yerel stop yeterli değil" },
            next: "step2",
          },
          {
            text: "Hızlı bir iş olduğu için doğrudan sökerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. 'Hızlı iş' algısı en sık kaza nedenidir; izolasyon yapılmadan dönen ekipmana müdahale edilmez.",
            source: { code: "İş güvenliği", detail: "İzolasyonsuz müdahale yok" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "İzolasyon yapıldı, iş sürüyor. Başka bir mühendis baraya bakım yapmak istiyor.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Etiket/kilidi ve devam eden izni gösterir, koordine olana kadar müdahaleyi engellerim",
            outcome: "safe",
            feedback:
              "Doğru. LOTO etiketi/kilidi başkalarını uyarır; izni veren kişi onaylamadan enerji geri verilmez.",
            source: { code: "LOTO", detail: "Kilit/etiket kaldırma kontrolü" },
          },
          {
            text: "Diğer mühendis bilir diye karışmam",
            outcome: "danger",
            feedback:
              "Tehlikeli. İletişim/koordinasyon olmadan enerji geri verilirse çalışan kişi tehlikeye girer.",
            source: { code: "LOTO", detail: "Koordinasyon zorunlu" },
          },
        ],
      },
    ],
    debrief:
      "Uzaktan/otomatik çalışabilen ekipmana müdahaleden önce iş izni alınır ve enerji izolasyonu (Lockout/Tagout) yapılır: elektrik kesilir, kilitlenir, etiketlenir, uzaktan başlatma devre dışı bırakılır ve çalışmadığı 'try' ile doğrulanır. Yerel stop tek başına yeterli değildir. Kilit/etiket başkalarını uyarır; enerji yalnızca izni veren kişinin onayı ve koordinasyonla geri verilir.",
  },

  // ─── Makine Dairesi Emniyeti ───────────────────────────────────────────
  {
    id: "mac-ersafety-er-fire-co2",
    topicKey: "machine-engine-room-safety",
    title: "Makine Dairesi Yangını: CO₂ Kararı",
    level: "officer",
    briefing:
      "Makine dairesinde yakıt sızıntısı sıcak yüzeyde tutuşarak yangın çıkardı. İlk müdahaleyle kontrol edilemedi, alevler büyüyor. Sabit CO₂ sistemi düşünülüyor.",
    learningGoals: [
      "Makine dairesi yangınında müdahale sırasını ve CO₂ boşaltma prosedürünü kavramak",
      "Personel sayımı ve mahal izolasyonunun önceliğini anlamak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Portatif müdahale yetersiz kaldı, yangın büyüyor. CO₂ boğucudur ve mahal kapatılmadan etkisizdir.",
        question: "CO₂ öncesi hangi adımlar şarttır?",
        choices: [
          {
            text: "Personeli tahliye edip sayar, yakıtı (quick-closing valf) keser, fanları/havalandırmayı durdurur, mahali kapatırım",
            outcome: "safe",
            feedback:
              "Doğru. CO₂ boşaltmadan önce tahliye+tam sayım, yakıt kesme, fan stop ve mahal sızdırmaz kapatma zorunludur; aksi hâlde insan kaybı ve etkisiz söndürme olur.",
            source: { code: "SOLAS II-2 / FSS Code", detail: "Tahliye+sayım, yakıt/fan kes, kapat" },
            next: "step2",
          },
          {
            text: "Hemen CO₂ basarım, sayım sonra",
            outcome: "danger",
            feedback:
              "Ölümcül. İçeride kalan biri olabilir; CO₂ boğar. Boşaltmadan önce mutlaka tam personel sayımı yapılır.",
            source: { code: "CO₂ prosedürü", detail: "Boşaltma öncesi tam sayım şart" },
            next: "step2",
          },
          {
            text: "Mahali açık bırakıp CO₂ basarım",
            outcome: "danger",
            feedback:
              "Yanlış. Açık mahalde CO₂ konsantrasyonu tutmaz; söndürme etkisiz olur. Mahal sızdırmaz kapatılmalıdır.",
            source: { code: "CO₂ prosedürü", detail: "Mahal kapatılmadan etkisiz" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Sayım tamam, mahal kapatıldı, yakıt/fan kesildi. CO₂ basıldı.",
        question: "CO₂ sonrası ne yapılır?",
        choices: [
          {
            text: "Sınır soğutma yapar, mahali kapalı tutar ve yeterince soğumadan/havalandırmadan açmam",
            outcome: "safe",
            feedback:
              "Doğru. Erken açmak oksijen verip yeniden tutuşma (re-ignition) yaratır; sınır soğutma sürdürülür ve mahal kontrollü açılır.",
            source: { code: "Yangın sonrası", detail: "Erken açma = re-ignition; sınır soğutma" },
          },
          {
            text: "Sonucu görmek için kapağı hemen açarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Sıcak ortama ani hava re-ignition yaratır; mahal yeterince soğumadan açılmaz.",
            source: { code: "Yangın sonrası", detail: "Yeterince soğumadan açma yok" },
          },
        ],
      },
    ],
    debrief:
      "Kontrol edilemeyen makine dairesi yangınında sabit CO₂ son çaredir ve sıkı prosedür gerektirir: ÖNCE personel tahliyesi + TAM sayım, yakıt kesme (quick-closing valf), fan/havalandırma durdurma ve mahali sızdırmaz kapatma. CO₂ boğucudur; sayımsız boşaltma ölümcüldür ve açık mahalde etkisizdir. Boşaltmadan sonra mahal soğuyana kadar kapalı tutulur ve sınır soğutma sürdürülür; erken açmak yeniden tutuşmaya yol açar.",
  },

  // ─── Çevre (Makine) ────────────────────────────────────────────────────
  {
    id: "mac-env-ows-15ppm",
    topicKey: "machine-environment-machine",
    title: "Sintine Tahliyesi: 15 ppm ve 'Magic Pipe' Baskısı",
    level: "officer",
    briefing:
      "Sintine tankı dolu, liman yaklaşıyor ve alım tesisi pahalı. Yağlı su ayırıcı (OWS) çıkışı zaman zaman 15 ppm'i aşıp tahliyeyi durduruyor. Biri 'baypas hattıyla hızlıca boşaltalım' diye öneriyor.",
    learningGoals: [
      "MARPOL Ek I 15 ppm kuralını ve Oil Record Book disiplinini kavramak",
      "Baypas ('magic pipe') ihlalinin ağırlığını anlamak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "OWS 15 ppm'i aşınca otomatik durdurma devreye giriyor. Baypas önerisi gündemde.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Baypası kesinlikle reddederim; OWS'yi düzgün çalıştırır, gerekirse alım tesisine veririm ve ORB'ye doğru kaydederim",
            outcome: "safe",
            feedback:
              "Doğru. 15 ppm sınırı, en route ve çalışır 15 ppm alarmı zorunludur; baypas yasadışıdır. Çözüm sistemi düzeltmek veya karaya vermektir.",
            source: { code: "MARPOL Ek I (15 ppm)", detail: "Baypas yasak; ORB doğru tutulur" },
            next: "step2",
          },
          {
            text: "Bir kerelik baypasla hızlıca boşaltırım",
            outcome: "danger",
            feedback:
              "Ağır ihlal. 'Magic pipe' yasadışı tahliyedir; ağır para cezası, gemi tutması ve adli sorumluluk doğurur.",
            source: { code: "MARPOL Ek I", detail: "Baypas = ciddi suç" },
            next: "step2",
          },
          {
            text: "ORB'ye sanki OWS'den geçmiş gibi yazarım",
            outcome: "danger",
            feedback:
              "Ağır ihlal. Sahte ORB kaydı, tahliyenin kendisi kadar ciddi bir suçtur ve denetimlerde en ağır yaptırımları doğurur.",
            source: { code: "MARPOL Ek I (ORB)", detail: "Sahte kayıt = ağır suç" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "OWS sık 15 ppm aşıyor; muhtemelen bakım/ayar sorunu var.",
        question: "Kalıcı çözüm için ne yaparsınız?",
        choices: [
          {
            text: "OWS'nin bakımını yapar (filtre/koalesör, 15 ppm monitör kalibrasyonu) ve sintine yönetimini iyileştiririm",
            outcome: "safe",
            feedback:
              "Doğru. Düzgün bakım ve sintine kaynak kontrolü (yağ kaçaklarını azaltma) hem uyumu hem operasyonu iyileştirir.",
            source: { code: "OWS bakımı / PMS", detail: "Bakım + sintine kaynak kontrolü" },
          },
          {
            text: "Sorunlu OWS ile baypası 'gerekirse' seçenek olarak tutarım",
            outcome: "danger",
            feedback:
              "Yanlış. Baypas hiçbir koşulda meşru bir seçenek değildir; tek yol uyumlu çalışan bir sistemdir.",
            source: { code: "MARPOL Ek I", detail: "Baypas asla seçenek değil" },
          },
        ],
      },
    ],
    debrief:
      "Makine dairesi sintine suyu yalnızca ≤15 ppm, en route ve çalışır 15 ppm alarmlı OWS ile tahliye edilebilir. Maliyet baskısı 'magic pipe' baypasını meşru kılmaz: hem yasadışı tahliye hem sahte Oil Record Book kaydı ağır para cezası, gemi tutması ve adli sorumlulukla sonuçlanır. Doğru yol, OWS bakımı/kalibrasyonu, sintine kaynak kontrolü ve gerekirse alım tesisine vermektir.",
  },

  // ─── ERM (Makine Dairesi Kaynak Yönetimi) ──────────────────────────────
  {
    id: "mac-erm-blackout-manoeuvre",
    topicKey: "machine-erm",
    title: "Manevrada Blackout: Kaynak Yönetimi",
    level: "officer",
    briefing:
      "Liman manevrasındasınız, köprüüstü bow thruster ve sık telgraf değişimi istiyor. Yük artışıyla bir jeneratör trip etti ve kısmi güç kaybı yaşandı. Yalnızca bir jeneratör devrede ve yük yüksek.",
    learningGoals: [
      "Manevra öncesi güç hazırlığı (yeterli jeneratör) ve ERM iletişimini kavramak",
      "Aşırı yük/blackout'u önlemek için proaktif karar",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Manevra yüksek ve değişken elektrik yükü demektir (thruster, pompalar). Tek jeneratör yetersiz kalabilir.",
        question: "Manevra başlamadan önce ideal hazırlık neydi / şimdi ne yaparsınız?",
        choices: [
          {
            text: "İkinci jeneratörü paralel devreye alıp yeterli güç rezervi sağlar, köprüüstüyle yük durumunu paylaşırım",
            outcome: "safe",
            feedback:
              "Doğru. Manevra öncesi yeterli jeneratör paralele alınır; ERM gereği köprü-makine arası yük/güç durumu açıkça paylaşılır.",
            source: { code: "ERM / güç yönetimi", detail: "Manevrada yeterli jeneratör + iletişim" },
            next: "step2",
          },
          {
            text: "Tek jeneratörle idare etmeye çalışırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Manevradaki ani yükler tek jeneratörü trip ettirip tam blackout'a — dümen/thruster kaybına — yol açabilir.",
            source: { code: "Güç yönetimi", detail: "Manevrada yetersiz güç = blackout riski" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Köprüüstü farkında olmadan büyük bir thruster yükü daha istiyor.",
        question: "ERM açısından doğru davranış nedir?",
        choices: [
          {
            text: "Güç sınırını köprüüstüne açıkça bildirir, gerekirse isteği güvenli seviyeye sınırlatırım",
            outcome: "safe",
            feedback:
              "Doğru. ERM, köprü ile makine arasında açık ve zamanında iletişim demektir; güç sınırı bilinmeden manevra güvenli planlanamaz.",
            source: { code: "ERM / BRM", detail: "Açık, zamanında köprü-makine iletişimi" },
          },
          {
            text: "Sessizce isteği uygular, blackout olursa olur derim",
            outcome: "danger",
            feedback:
              "Tehlikeli. İletişim kopukluğu, manevrada blackout kazalarının klasik kök nedenidir.",
            source: { code: "ERM", detail: "İletişim kopukluğu = kaza" },
          },
        ],
      },
    ],
    debrief:
      "Manevra, değişken ve yüksek elektrik yükü demektir; öncesinde yeterli sayıda jeneratör paralele alınmalıdır. ERM'nin özü, köprüüstü ile makine dairesi arasında açık ve zamanında iletişimdir: mevcut güç sınırı paylaşılır ve aşırı istek güvenli seviyeye sınırlanır. Tek jeneratörle yüksek manevra yükü, trip ve tam blackout (dümen/thruster kaybı) riskidir; iletişim kopukluğu bu kazaların başlıca kök nedenidir.",
  },

  // ─── Enerji Verimliliği ────────────────────────────────────────────────
  {
    id: "mac-energy-slow-steaming",
    topicKey: "machine-energy-efficiency",
    title: "Yakıt Tasarrufu: Hız Kararı ve CII",
    level: "officer",
    briefing:
      "Varışa kadar bolca zaman var (liman penceresi geniş). Şirket yakıt maliyetini ve geminin CII (karbon yoğunluğu) derecesini iyileştirmek istiyor. Şu an gemi tam servis hızında seyrediyor.",
    learningGoals: [
      "Hız-yakıt (~hızın küpü) ilişkisini ve slow steaming kararını kavramak",
      "Verimliliği makine emniyetiyle dengelemek",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Zaman bol; yakıt tüketimi yaklaşık hızın küpüyle artar, dolayısıyla hız düşürmek büyük tasarruf sağlar.",
        question: "Ne önerirsiniz?",
        choices: [
          {
            text: "Liman penceresini kaçırmadan hızı düşürürüm (slow steaming); yakıt ve CII iyileşir",
            outcome: "safe",
            feedback:
              "Doğru. Tüketim ~hızın küpüyle arttığından hızı düşürmek yakıttan önemli tasarruf ve daha iyi karbon yoğunluğu sağlar; varışı geciktirmeden uygulanır.",
            source: { code: "Enerji verimliliği / MARPOL Ek VI (CII)", detail: "Slow steaming yakıt+CII iyileştirir" },
            next: "step2",
          },
          {
            text: "Tam hızda gidip erken varırım (beklemek için)",
            outcome: "risky",
            feedback:
              "Verimsiz. Erken varıp demirde beklemek yakıtı boşa harcar; 'just-in-time' yaklaşımıyla hız optimize edilir.",
            source: { code: "Enerji verimliliği", detail: "Just-in-time varış" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Çok düşük hızda bazı motorlarda risk (yetersiz yük, fouling, kazan kararsızlığı) olabilir.",
        question: "Slow steaming'i nasıl güvenli uygularsınız?",
        choices: [
          {
            text: "Üretici alt yük sınırlarına uyar, gerekirse yardımcı kazanı/yağlama ayarını yönetir ve parametreleri izlerim",
            outcome: "safe",
            feedback:
              "Doğru. Çok düşük yükte üretici sınırları, yetersiz yanma/fouling ve kazan kararsızlığı gözetilir; verimlilik makine emniyetiyle dengelenir.",
            source: { code: "Üretici sınırları / iyi uygulama", detail: "Alt yük sınırı + izleme" },
          },
          {
            text: "Sınır tanımadan mümkün olan en düşük hıza inerim",
            outcome: "danger",
            feedback:
              "Riskli. Üretici alt sınırının altında çalışmak yetersiz yanma, kurum birikimi ve hasara yol açabilir.",
            source: { code: "Üretici sınırları", detail: "Alt sınırın altına inme" },
          },
        ],
      },
    ],
    debrief:
      "Yakıt tüketimi yaklaşık hızın küpüyle arttığından, zaman uygunsa hızı düşürmek (slow steaming) hem büyük yakıt tasarrufu hem daha iyi CII (karbon yoğunluğu) sağlar; 'just-in-time' varışla demirde bekleme önlenir. Ancak çok düşük yük üretici sınırları, yetersiz yanma/fouling ve yardımcı kazan kararsızlığı yaratabilir; bu nedenle verimlilik daima makine emniyeti ve üretici sınırlarıyla dengelenir.",
  },
];
