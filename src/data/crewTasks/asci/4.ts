import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Mutfak ekipmanlarının bakımı",
  roleSlug: "asci",
  taskIndex: 4,
  estimatedPages: 24,
  intro: `Gemi mutfağındaki ekipmanlar; fırın, ocak, fritöz, buzdolabı/dondurucu, bulaşık makinesi, et kıyma ve dilimleme makineleri ve daha fazlasıyla galley'nin can damarıdır. Bu ekipmanların düzenli temizliği, koruyucu bakımı ve güvenli kullanımı hem gıda güvenliğini hem de iş emniyetini doğrudan belirler. Bir ekipmanın arızası, üç öğünü tehlikeye atabilir; yanlış kullanımı ise yanık, kesik veya elektrik çarpmasıyla sonuçlanabilir. Bu bölüm; ekipman bazlı bakım ve güvenli kullanım prosedürlerini, arıza raporlamasını, basit bakım işlerini ve planlı bakım sistemine (PMS) entegrasyonu, MLC 2006 ve ekipman güvenlik standartlarıyla uyumlu olarak açıklar.`,
  sources: [
    "MLC 2006 — Regulation 3.2 & Standard A3.2 (Food and Catering)",
    "WHO — Guide to Ship Sanitation (3rd Edition)",
    "ISM Code — Planned Maintenance System (PMS) requirements",
    "Manufacturer's Operation & Maintenance Manuals (galley equipment)",
    "IMO MSC.1/Circ. — Galley electrical & gas equipment safety guidance",
    "Codex Alimentarius — General Principles of Food Hygiene (CXC 1-1969)",
    "Nautical Institute — Ship Catering Management Best Practice",
  ],
  chapters: [
    {
      heading: "1. Bakım Felsefesi ve PMS Entegrasyonu",
      lead: `İyi bakım reaktif değil önleyicidir; ekipman bozulmadan önce müdahale eder.`,
      sections: [
        {
          subheading: "1.1 Koruyucu bakım (preventive maintenance) prensibi",
          paragraphs: [
            `Galley ekipmanı bakımının temeli, arızayı beklemek değil önlemektir. Aşçı, her ekipmanın üretici kılavuzunda belirtilen periyodik bakım adımlarını (temizlik, conta kontrolü, filtre değişimi, yağlama, kalibrasyon) bir takvime bağlar. Düzenli koruyucu bakım, ani arıza ihtimalini, yedek parça baskısını ve gıda güvenliği riskini birlikte azaltır.`,
            `Gemide ekipman bakımı genellikle ISM Code kapsamındaki Planned Maintenance System (PMS) içinde tanımlanır. Aşçı, galley ekipmanlarının bakım görevlerini PMS'e işler veya makine ekibiyle koordine eder; elektrik/mekanik müdahale gerektiren işler yetkili personele (elektrikçi, makine zabiti) bırakılır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISM Code — bakım kayıtları",
              text: `ISM Code, kritik ekipmanlar dahil gemi ekipmanlarının planlı bakımının yapılmasını ve kayıt altına alınmasını ister. Galley ekipmanı bakımı bu sistemin parçasıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Sorumluluk sınırı: aşçı vs. teknik ekip",
          paragraphs: [
            `Aşçı; temizlik, görsel kontrol, filtre/conta kontrolü, basit ayar ve kullanıcı seviyesi bakımdan sorumludur. Elektrik panosu, gaz hattı, kompresör, motor ve LOTO (kilitle-etiketle) gerektiren işler makine/elektrik ekibinin yetkisindedir. Bu sınırın net olması hem güvenliği hem de yetki karmaşasını önler.`,
          ],
          bullets: [
            `Aşçı: temizlik, görsel kontrol, basit ayar, arıza raporu`,
            `Elektrikçi/makine zabiti: elektrik, gaz, kompresör, motor işleri`,
            `LOTO (Lock-Out Tag-Out) gerektiren her iş yetkili personelce`,
            `Garanti/servis kapsamındaki işler kıyıdaki yetkili servise`,
          ],
        },
      ],
    },
    {
      heading: "2. Pişirme Ekipmanı: Ocak, Fırın, Izgara",
      sections: [
        {
          subheading: "2.1 Ocak ve fırın bakımı/güvenliği",
          paragraphs: [
            `Elektrikli veya gazlı ocak/fırın, her kullanım sonrası yağ ve dökülmeden temizlenir; biriken yağ hem hijyen hem yangın riskidir. Gazlı sistemlerde brülör delikleri tıkanmaya karşı kontrol edilir, alev rengi (sarı = eksik yanma/CO riski, mavi = sağlıklı) gözlenir ve gaz kaçağı için bağlantılar köpük testiyle denetlenir. Fırın kapı contası ısı kaybını ve verimi etkiler; hasarlı conta değiştirilir.`,
            `Elektrikli rezistans ve termostat arızaları sıcaklık sapmasına yol açar; aşçı fırın sıcaklığını periyodik bir termometreyle doğrular (kalibrasyon). Anormal koku, kıvılcım, ısınan kablo veya çalışmayan ısıtıcı derhal raporlanır ve yetkili personel müdahale edene kadar ekipman kullanılmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Gaz kaçağı ve CO riski",
              text: `Gazlı galley ekipmanında kaçak veya eksik yanma karbon monoksit (CO) üretebilir. Gaz kokusu, sarı alev veya baş ağrısı/uyuklama belirtisinde ekipman kapatılır, ortam havalandırılır ve makine ekibi çağrılır.`,
            },
          ],
        },
        {
          subheading: "2.2 Izgara/salamander ve sıcak tutucular",
          paragraphs: [
            `Izgara ve salamander yüzeyleri yağ birikmesine açıktır; her servis sonrası kazınıp temizlenir. Bain-marie ve sıcak tutucularda su seviyesi ve termostat kontrol edilir; kuru çalışma rezistansı yakar. Tüm bu ekipmanların yüzeyleri gıda temaslı olduğundan gıda güvenli temizlik ürünüyle bakılır ve gerekiyorsa durulanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Fritöz (Deep Fryer) Bakımı ve Güvenliği",
      sections: [
        {
          subheading: "3.1 Yağ yönetimi ve temizlik",
          paragraphs: [
            `Fritöz, galley'nin en yüksek yangın ve yanık riski taşıyan ekipmanıdır. Yağ düzenli süzülür, bozulduğunda (renk koyulaşması, köpürme, duman noktası düşmesi) değiştirilir; eski yağ ayrı atık kabına alınır (bertaraf ayrı görevde). Yağ seviyesi min-max arasında tutulur; aşırı dolu fritöz taşma ve yangın riski yaratır.`,
            `Termostat ve yüksek sıcaklık emniyet kesicisi (high-limit cut-off) fritözün kritik güvenlik bileşenleridir; bunlar arızalanırsa yağ aşırı ısınıp tutuşabilir. Aşçı bu kesicilerin çalıştığını periyodik doğrular ve şüphede ekipmanı kullanmaz.`,
          ],
          table: {
            caption: `Fritöz Yağı Bakım Göstergeleri`,
            headers: ["Belirti", "Anlamı", "Aksiyon"],
            rows: [
              ["Koyu renk / koku", "Yağ bozulması", "Süz veya değiştir"],
              ["Aşırı köpürme", "Su/parçacık kirliliği", "Süz, gerekirse değiştir"],
              ["Erken duman", "Duman noktası düştü", "Yağı değiştir (yangın riski)"],
              ["Termostat sapması", "Kontrol arızası", "Kullanma, raporla"],
            ],
          },
          callouts: [
            {
              type: "warning",
              title: "Yağ yangınına asla su atma",
              text: `Tutuşan fritöz yağına su atmak patlamalı buhar ve yayılan alev yaratır. Müdahale fire blanket veya Class F/K (wet chemical) söndürücü ile yapılır; detay mutfak yangın emniyeti görevinde.`,
            },
          ],
        },
        {
          subheading: "3.2 Kötü havada fritöz kullanımı",
          paragraphs: [
            `Şiddetli yalpada açık sıcak yağ ciddi yanık tehlikesidir; köprüüstü kötü hava uyarısı verdiğinde fritöz kullanımı sınırlandırılır veya durdurulur. Fritöz kapağı kapatılır, ısı kesilir ve ekipman sabitlenir. Bu, hem ekipman güvenliği hem de personel güvenliği kararıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Soğutma Ekipmanı: Buzdolabı ve Dondurucu",
      sections: [
        {
          subheading: "4.1 Kullanıcı bakımı ve performans takibi",
          paragraphs: [
            `Soğutucu (0-4°C) ve dondurucunun (-18°C ve altı) sürekli hedef sıcaklıkta çalışması gıda güvenliğinin temelidir. Aşçı; kapı contasını (hava sızdırmazlık), kondenser/evaporatör görünür kirini, defrost durumunu ve sıcaklık göstergesini düzenli kontrol eder. Kondenser ızgarasında toz/yağ birikimi soğutmayı düşürür ve kompresörü zorlar; kullanıcı seviyesinde temizlenir.`,
            `Sıcaklıkta yükselme, sürekli çalışan kompresör, anormal ses veya su sızıntısı arıza işaretidir ve raporlanır. Soğutucu arızasında soğuk zincir korunarak ürünler başka bir üniteye taşınır; bozulma riski olan ürün değerlendirilir veya imha edilir. Gaz kaçağı (soğutucu akışkan) makine ekibinin işidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Soğuk zincir = gıda güvenliği",
              text: `Soğutma ekipmanının hedef sıcaklığı tutması MLC 2006 ve HACCP açısından kritik kontrol noktasıdır. Sıcaklık logları günlük tutulur ve sapma derhal müdahale gerektirir.`,
            },
          ],
        },
        {
          subheading: "4.2 Bulaşık makinesi bakımı",
          paragraphs: [
            `Endüstriyel bulaşık makinesi hem hijyen hem verim açısından kritiktir; süzgeçleri her vardiyada temizlenir, püskürtme kolları tıkanmaya karşı kontrol edilir ve durulama suyu sıcaklığı (sanitasyon için tipik olarak ≥82°C son durulama) doğrulanır. Kireç birikimi (özellikle sert su) performansı düşürür; periyodik kireç çözücü uygulanır.`,
            `Deterjan/durulama yardımcısı (rinse aid) dozaj pompaları kontrol edilir; yetersiz deterjan kirli bulaşık, fazla deterjan ise kalıntı bırakır. Makine sanitasyon sıcaklığına ulaşmıyorsa el yıkama + kimyasal sanitasyona geçilir ve arıza raporlanır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Kesici/Karıştırıcı Makineler ve İş Güvenliği",
      sections: [
        {
          subheading: "5.1 Et kıyma, dilimleme ve mikser güvenliği",
          paragraphs: [
            `Dilimleyici (slicer), kıyma makinesi ve planet mikser galley'nin en yüksek kesik/uzuv kapma riski taşıyan ekipmanlarıdır. Temizlik ve bıçak değişimi yalnızca makine kapalı ve fişten çekiliyken (enerji kesilmiş) yapılır; dönen parçaya asla elle müdahale edilmez. Üretici koruyucuları (guard) hiçbir zaman çıkarılmaz veya bypass edilmez.`,
            `Bu makineler her kullanımdan sonra parçalarına ayrılarak temizlenir (et kalıntısı bakteriyel risk ve çapraz bulaşma kaynağıdır) ve doğru biçimde tekrar monte edilir. Sadece eğitimli/yetkili personel kullanır; yorgunluk ve dikkat dağınıklığı kazanın başlıca nedenidir.`,
          ],
          bullets: [
            `Temizlik ve bıçak değişimi yalnızca enerji kesildikten sonra`,
            `Koruyucu (guard) asla çıkarılmaz/bypass edilmez`,
            `Dönen parçaya elle müdahale yok, iticiyi/aparatı kullan`,
            `Her kullanım sonrası söküp temizle, doğru tekrar monte et`,
            `Sadece eğitimli personel; yorgunken kullanmaktan kaçın`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Dilimleyici = en sık galley kazası",
              text: `Slicer bıçağı durmadan temizliğe başlamak veya iticisiz besleme, ağır el yaralanmalarının başlıca nedenidir. Enerji kes, bıçak tam dursun, koruyucu yerinde olsun.`,
            },
          ],
        },
        {
          subheading: "5.2 El aletleri ve genel galley ergonomisi",
          paragraphs: [
            `Bıçaklar keskin tutulur (kör bıçak daha tehlikelidir, kayar) ve güvenli saklanır (mıknatıs çıta/blok). Sıcak yüzeyler için eldiven, kaymaz ayakkabı ve zemin kuru tutulur. Deniz hareketi bu risklerin tamamını artırır; bu yüzden ekipman güvenliği ile sea fastening (bkz. mutfak düzeni görevi) birlikte düşünülür.`,
          ],
        },
      ],
    },
    {
      heading: "6. Arıza Raporlama ve Basit Bakım",
      sections: [
        {
          subheading: "6.1 Arıza tespiti ve raporlama akışı",
          paragraphs: [
            `Aşçı bir arıza/anomali fark ettiğinde (ses, koku, sıcaklık sapması, kıvılcım, sızıntı) önce ekipmanı güvenli duruma alır (kapat/fişten çek/uyarı etiketi) ve durumu kaptana/makine zabitine raporlar. Rapor; ekipman, belirti, ne zaman başladığı ve alınan ilk önlemi içerir. Elektrik/mekanik müdahale yetkili personele bırakılır; aşçı kendi yetki alanı dışına çıkmaz.`,
            `Arıza ve yapılan bakım PMS/kayıt sistemine işlenir; tekrar eden arızalar yedek parça/servis planlamasını tetikler. Kritik ekipman (örn. ana fırın veya soğutucu) arızasında menü ve hazırlık planı bu kayba göre uyarlanır.`,
          ],
          table: {
            caption: `Arıza Belirtisi → İlk Aksiyon Matrisi`,
            headers: ["Belirti", "Olası Neden", "İlk Aksiyon"],
            rows: [
              ["Soğutucu ısınıyor", "Conta/kompresör/gaz", "Ürünü taşı, raporla, log tut"],
              ["Ocakta kıvılcım", "Elektrik arızası", "Kapat, fişten çek, elektrikçi"],
              ["Fritöz aşırı ısınıyor", "Termostat arızası", "Kullanma, raporla"],
              ["Dilimleyici takılıyor", "Bıçak/motor", "Enerji kes, kontrol, raporla"],
            ],
          },
        },
        {
          subheading: "6.2 Aşçının yapabileceği basit bakım",
          paragraphs: [
            `Aşçının yetki alanındaki basit bakım: conta temizleme/kontrol, filtre temizleme/değişme, derin temizlik, kireç çözme, bıçak bileme/değişimi (güvenli koşulda), termometre kalibrasyon kontrolü ve görünür gevşek bağlantı bildirimi. Bu işler ekipman ömrünü uzatır ve ani arızaları önler. Yetki dışı her şey raporlanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Conta küçük parça, büyük etki",
              text: `Fırın, soğutucu ve bulaşık makinesi contaları küçük ama performansı belirler. Hasarlı contayı erken değiştirmek enerji kaybını, sıcaklık sapmasını ve gıda güvenliği riskini önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Elektrik ve Su Güvenliği",
      sections: [
        {
          subheading: "7.1 Nemli ortamda elektrik güvenliği",
          paragraphs: [
            `Galley nemli ve ıslak bir ortamdır; su ile elektrik bir arada en ölümcül risklerden biridir. Kablo, fiş ve priz hasarları (yıpranma, su girişi) derhal raporlanır ve hasarlı ekipman kullanılmaz. Ekipman ıslak elle çalıştırılmaz; topraklama ve kaçak akım koruması (RCD) ekipman güvenliğinin temelidir ve bu, makine/elektrik ekibinin denetimindedir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Hasarlı ekipmanı kullanma",
              text: `Yıpranmış kablo, kırık fiş veya su almış pano elektrik çarpması ve yangın riskidir. Aşçı böyle ekipmanı izole eder, etiketler ve elektrikçi onaylamadan kullanmaz.`,
            },
          ],
        },
        {
          subheading: "7.2 Su tesisatı ve drenaj",
          paragraphs: [
            `Lavabo, bulaşık makinesi ve buz makinesi su bağlantıları sızıntıya karşı izlenir; drenaj tıkanması hijyen ve haşere problemi yaratır. Potable water (içme suyu) bağlantıları, gıda hazırlığında kullanılan ekipmanlar için sertifikalı ve geri akış korumalı olmalıdır (detay içme suyu görevinde). Sızıntı/tıkanma raporlanır ve giderilir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Ekipman bakım/güvenlik checklist'i",
          bullets: [
            `Pişirme ekipmanı her servis sonrası yağdan/dökülmeden temizlendi mi?`,
            `Gazlı ekipmanda alev rengi/kaçak kontrolü yapıldı mı?`,
            `Fritöz yağı durumu ve emniyet kesicisi kontrol edildi mi?`,
            `Soğutucu/dondurucu sıcaklık ve conta kontrolü ve log tamam mı?`,
            `Bulaşık makinesi süzgeç temiz, durulama sıcaklığı yeterli mi?`,
            `Kesici makineler enerji kesik temizlendi, guard yerinde mi?`,
            `Arızalar raporlandı ve PMS/kayda işlendi mi?`,
            `Hasarlı kablo/fiş/priz izole edildi mi?`,
            `Basit bakım (conta/filtre/kireç) yapıldı mı?`,
            `Yetki dışı işler ilgili teknik ekibe iletildi mi?`,
          ],
          paragraphs: [
            `Mutfak ekipmanlarının bakımı, görünmeyen ama belirleyici bir disiplindir: düzenli temizlik ve koruyucu bakım hem öğünlerin kesintisiz çıkmasını hem de yanık, kesik ve elektrik kazalarının önlenmesini sağlar. Aşçı, yetki sınırını bilen, arızayı erken yakalayıp doğru raporlayan ve kullanıcı bakımını disiplinle yapan kişi olarak galley'nin sürekli ve güvenli işlemesinin teminatıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
