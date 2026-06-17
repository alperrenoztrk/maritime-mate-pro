import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Separator (purifier) günlük bakımı",
  roleSlug: "yagci-fitter",
  taskIndex: 8,
  estimatedPages: 26,
  intro: `Santrifüj separatör (purifier), gemi yakıtını ve yağını su ve katı partiküllerden arındıran, makine sağlığının temel taşı bir ekipmandır; düzgün çalışmazsa cat fines ve su makineye ulaşır, enjeksiyon ve yataklar zarar görür. Yağcı/Fitter; FO/LO/sludge separatörlerinin (Alfa Laval, Westfalia/GEA vb.) günlük desludging (çamur atma), bowl temizliği, disc stack ayırma ve seal ring kontrolünü; yağ yoğunluğuna göre gravity disc (dam ring) seçimini; water seal ve operating water sisteminin kontrolünü; backwash/discharge valf operasyonunu ve discharge sıcaklığının izlenmesini yürütür. Bu bölüm separatörün çalışma prensibini, günlük/periyodik bakımını ve sık arızalarını adım adım açıklar.`,
  sources: [
    "Alfa Laval / GEA Westfalia Separator Operating & Maintenance Manuals",
    "MARPOL Annex I — sludge yönetimi ve Oil Record Book Part I",
    "ISO 8217 — Marine fuel spec (cat fines / su / yoğunluk)",
    "MAN B&W / Wärtsilä Fuel & Lubricating Oil Treatment Guidelines",
    "Class Society Rules — fuel/oil treatment ve PMS gereklilikleri",
    "ICS Engine-Room Procedures Guide",
    "CIMAC Fuel Quality & Treatment recommendations",
    "Company SMS — Purifier operation & maintenance procedures",
  ],
  chapters: [
    {
      heading: "1. Separatörün Çalışma Prensibi",
      lead: `Separatör, yer çekiminin binlerce katı bir merkezkaç kuvvetiyle, yoğunluğu farklı sıvıları ve katıları saniyeler içinde ayırır. Bu basit fizik, makinenin temiz yakıt/yağla beslenmesini sağlar.`,
      sections: [
        {
          subheading: "1.1 Merkezkaç ayrımın mantığı",
          paragraphs: [
            `Separatör bowl'u (kovan) çok yüksek devirde (genelde 6000-10000 rpm civarı) döner; bu dönme, yoğunluğu yüksek olan suyu ve katı partikülleri dışa, yoğunluğu düşük olan temiz yakıt/yağı içe iter. Disc stack (disk paketi), sıvının ince katmanlarda akmasını sağlayarak ayrım yüzeyini ve verimi artırır. Temiz yakıt/yağ üstten çıkar, su ve çamur dışta toplanır.`,
            `Separatör iki modda çalışabilir: purifier (su + katı ayırma, water seal ile) ve clarifier (yalnız katı ayırma, su girişi yoksa). HFO için genelde purifier modu kullanılır çünkü hem su hem cat fines ayrılmalıdır. Yağcı, separatörün hangi modda olduğunu ve neden o modda olduğunu bilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Purifier mi, clarifier mi?",
              text: `Purifier modunda water seal kurulur ve su+katı ayrılır; clarifier modunda su girişi olmaz, yalnız katı ayrılır. HFO'da su ve cat fines birlikte bulunduğundan genelde purifier modu seçilir. Mod seçimi yanlışsa ayrım verimi düşer ve makine kirli yakıt alır.`,
            },
          ],
        },
        {
          subheading: "1.2 Besleme sıcaklığı ve debi",
          paragraphs: [
            `Ayrım verimi büyük ölçüde besleme sıcaklığına bağlıdır; sıcaklık arttıkça yakıt/yağ viskozitesi düşer ve su/katı daha kolay ayrılır. HFO için tipik separatör besleme sıcaklığı ~98°C'ye (kaynamayı geçmeden) kadar çıkarılır; preheater bu sıcaklığı sağlar. LO için daha düşük (~90-95°C) değerler kullanılır.`,
            `Debi (flow rate) düşük tutuldukça ayrım süresi ve verimi artar; bu yüzden separatör nominal kapasitesinin altında çalıştırılarak (örn. üreticinin önerdiği oranda) daha iyi ayrım sağlanır. Yağcı, besleme sıcaklığını ve debiyi izler; düşük sıcaklık veya yüksek debi kötü ayrım demektir.`,
          ],
          table: {
            caption: `Tipik Separatör İşletme Parametreleri (Kılavuz)`,
            headers: ["Parametre", "FO (HFO)", "LO", "Not"],
            rows: [
              ["Besleme sıcaklığı", "~98 °C", "~90-95 °C", "Yüksek = iyi ayrım"],
              ["Debi", "Nominal altı", "Nominal altı", "Düşük debi = iyi ayrım"],
              ["Bowl devri", "Üretici nominal", "Üretici nominal", "Düşükse ayrım bozulur"],
              ["Desludge aralığı", "Yüke/kirliliğe göre", "Daha seyrek", "Otomatik timer veya manuel"],
              ["Gravity disc", "Yoğunluğa göre", "Yoğunluğa göre", "Yanlış seçim = seal kaybı"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Gravity Disc (Dam Ring) Seçimi",
      sections: [
        {
          subheading: "2.1 Yoğunluğa göre doğru disc",
          paragraphs: [
            `Purifier modunda, su ile yakıt arasındaki ayrım çizgisinin (interface) doğru yerde tutulması, gravity disc (dam ring / regulating ring) çapına bağlıdır. Yakıtın yoğunluğu (density) arttıkça daha küçük çaplı gravity disc seçilir. Yanlış disc seçimi interface'in kayması, water seal'in bozulması ve ya yakıtın suya ya suyun yakıta karışmasıyla sonuçlanır.`,
            `Yağcı, bunker yoğunluğuna göre üretici tablosundan (gravity disc selection chart) doğru disc'i seçer. Modern alkol/HFO yoğunlukları 991 kg/m³'e (15°C) yaklaştığında geleneksel purifier su ayrımı zorlaşır; bu yüzden yeni nesil separatörler (ALCAP / EHM gibi sistemler) gravity disc kullanmadan otomatik interface kontrolü yapar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış gravity disc = water seal kaybı",
              text: `Yoğunluğa uymayan gravity disc seçimi, su contasının (water seal) bozulmasına ve ya temiz yakıtın suya kaçmasına (oil loss) ya da suyun yakıt tarafına geçmesine yol açar. İkincisi makineye su gönderir; ciddi yanma ve enjeksiyon sorunları doğar. Disc seçim tablosu mutlaka kullanılır.`,
            },
          ],
        },
        {
          subheading: "2.2 Modern interface kontrollü sistemler",
          paragraphs: [
            `Yüksek yoğunluklu yakıtlarda gravity disc yetersiz kaldığından, üreticiler gravity disc'siz, su sensörü/iletkenlik ile interface'i otomatik izleyen sistemler geliştirmiştir. Bu sistemler suyu algıladığında otomatik su boşaltma (water draining) veya desludge tetikler. Yağcı, gemideki separatörün hangi nesil olduğunu ve buna göre günlük kontrol noktalarını bilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Günlük Desludging (Çamur Atma)",
      sections: [
        {
          subheading: "3.1 Desludge prensibi ve zamanlaması",
          paragraphs: [
            `Separatör çalıştıkça dış çeperde (bowl periferi) çamur (sludge) ve su birikir; belli aralıklarla bu birikim dışarı atılır (desludge / sludge discharge). Modern separatörlerde bu işlem otomatik timer ile yapılır; bowl tabanındaki hareketli kısım (sliding bowl bottom) operating water'la aşağı inerek çamur portlarını açar ve merkezkaçla çamuru dışarı fırlatır, sonra tekrar kapanır.`,
            `Desludge aralığı, yakıt kirliliğine ve yüke göre ayarlanır; çok kirli yakıtta sık, temiz yakıtta seyrek. Aralık çok uzunsa bowl tıkanır ve ayrım bozulur; çok kısaysa gereksiz yakıt/yağ kaybı ve operating water tüketimi olur. Yağcı, desludge'ın tam ve düzgün gerçekleştiğini (ses, titreşim, discharge gözlemi) doğrular.`,
          ],
          bullets: [
            `Desludge öncesi besleme yakıt durdurulur/displacement water verilir`,
            `Sliding bowl bottom açılır, çamur merkezkaçla atılır`,
            `Bowl tekrar kapanır, water seal yeniden kurulur`,
            `Besleme yeniden başlar`,
            `Discharge rengi/miktarı gözlemlenir (eksik atış = tıkanma)`,
          ],
        },
        {
          subheading: "3.2 Eksik/başarısız desludge belirtileri",
          paragraphs: [
            `Desludge düzgün olmazsa (partial discharge / no discharge) bowl içinde çamur birikir; bu, dengesizlik (titreşim), ayrım kaybı ve sonunda bowl'un tıkanmasına yol açar. Belirtiler: artan titreşim, ısınan gövde, ayrılan su/çamur miktarında düşüş ve temiz yakıt çıkışında kalite kaybı. Yağcı bu belirtileri tanır ve mühendise bildirir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Titreşim artışı = dengesizlik/tıkanma",
              text: `Separatörde artan titreşim ciddi bir uyarıdır: bowl'da çamur birikimi (dengesizlik), yanlış montaj, yatak aşınması veya bowl'un düzgün kapanmaması olabilir. Yüksek titreşimde separatör durdurulur; yüksek devirli bir bowl'un dengesizliği ağır hasar ve tehlike yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Operating Water ve Water Seal Sistemi",
      sections: [
        {
          subheading: "4.1 Operating water fonksiyonu",
          paragraphs: [
            `Operating water (kumanda suyu), separatörün hidrolik mekanizmasını çalıştırır: sliding bowl bottom'ı açıp kapatır (desludge), bowl'u kapatma konumunda tutar. Genelde temiz tatlı su (uygun basınç ve debide) kullanılır; kirli veya yetersiz basınçlı operating water, desludge'ın tam yapılmamasına veya bowl'un düzgün kapanmamasına yol açar.`,
            `Yağcı, operating water basıncını, debisini ve temizliğini izler; operating water filtresini/strainer'ını kontrol eder. Operating water sistemindeki bir arıza (düşük basınç, tıkalı nozzle) doğrudan desludge başarısızlığına dönüşür.`,
          ],
        },
        {
          subheading: "4.2 Water seal (su contası) kontrolü",
          paragraphs: [
            `Purifier modunda her desludge sonrası, ayrım başlamadan önce bowl'a belli miktarda sealing water verilerek water seal (su contası) kurulur. Bu su, yakıtın su çıkışından kaçmasını önleyen sınırdır. Seal düzgün kurulmazsa yakıt overboard (su tarafına) kaçar (broken seal / oil loss).`,
            `Yağcı, separatör start ve her desludge sonrası water seal'in kurulduğunu (su çıkışından temiz su gelmesi, yakıt kaçmaması) gözler. Yakıt çıkışında su veya su çıkışında yakıt görülmesi seal/gravity disc sorununu işaret eder ve raporlanır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Water seal — purifier'ın görünmez sınırı",
              text: `Water seal, temiz yakıt ile atılan su arasındaki dengeyi tutan su contasıdır. Her desludge sonrası yeniden kurulur. Kırık seal, ya değerli yakıtın denize kaybı ya da makineye su gitmesi demektir; her ikisi de ciddi sorundur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Bowl ve Disc Stack Temizliği (Periyodik Açma)",
      sections: [
        {
          subheading: "5.1 Bowl söküm ve temizlik",
          paragraphs: [
            `Otomatik desludge'a rağmen bowl ve disc stack zamanla yapışkan çamur, asfalten ve kireçle kaplanır; periyodik olarak (PMS aralığına göre) separatör durdurulup bowl sökülür ve elle temizlenir. Söküm öncesi separatör durdurulur, soğuması beklenir ve LOTO/enerji izolasyonu yapılır; yüksek devirli bowl tamamen durmadan açılmaz.`,
            `Bowl bileşenleri (bowl hood, sliding bowl bottom, disc stack, top disc, distributor) sırasıyla sökülür; her parça işaretli/numaralı olduğundan aynı sırayla geri takılır. Disc'ler tek tek temizlenir (uygun solvent/fırça ile), çizilmeden ve deforme edilmeden. Disc stack sayısı ve sırası kritiktir; eksik/yanlış sıra ayrımı bozar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Bowl tam durmadan AÇILMAZ",
              text: `Separatör bowl'u durduktan sonra bile uzun süre dönmeye devam eder (yüksek atalet). Tam durduğu (brake + gözlem) doğrulanmadan ve enerji izole edilmeden bowl'a el atılması, dönen kütleyle ölümcül yaralanma yaratır. Söküm yalnızca prosedüre göre yapılır.`,
            },
          ],
        },
        {
          subheading: "5.2 Montaj, balans ve sıkma momenti",
          paragraphs: [
            `Geri montajda parçalar doğru sırada, doğru yönde ve üretici sıkma momentiyle (özellikle lock ring / büyük somun) takılır. Yanlış montaj, dengesizlik (titreşim) ve hatta bowl'un savrulmasıyla felakete yol açabilir. Lock ring'in işaret çizgileri (alignment marks) hizalanır; aşırı/eksik sıkma tehlikelidir.`,
            `O-ring ve seal ring'ler her açımda kontrol edilir, gerekirse yenilenir. Eski/sertleşmiş O-ring sızdırır ve seal'i bozar. Yağcı, sökülen tüm contaları gözden geçirir ve aşınmışları değiştirir.`,
          ],
          table: {
            caption: `Bowl Açımında Kontrol Edilen Başlıca Parçalar`,
            headers: ["Parça", "Kontrol", "Aksiyon"],
            rows: [
              ["Disc stack", "Çamur, çizik, deformasyon", "Temizle, hasarlıyı değiştir"],
              ["Sliding bowl bottom", "Hareket, O-ring, oturma", "Temizle, conta yenile"],
              ["Lock ring", "Diş, işaret hizası", "Doğru momentle sık"],
              ["O-ring / seal ring", "Sertleşme, çatlak, ezilme", "Şüphede değiştir"],
              ["Distributor / top disc", "Erozyon, tıkanma", "Temizle, kontrol et"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. Discharge Sıcaklığı ve Performans İzleme",
      sections: [
        {
          subheading: "6.1 Sıcaklık ve sludge çıkışı gözlemi",
          paragraphs: [
            `Separatör performansı sürekli izlenir: besleme sıcaklığı, temiz yakıt/yağ çıkış kalitesi, su drenajı ve sludge discharge gözlemlenir. Discharge'ın koyu çamur olması normaldir; ancak temiz yakıt/yağın suya kaçması (oil loss) veya su çıkışında yakıt görülmesi seal/disc sorununu gösterir. Yağcı bu gözlemleri her vardiyada yapar.`,
            `Backwash/operating water sıcaklığı ve discharge sıcaklığı izlenir; anormal sıcaklık değişimi preheater veya ayrım sorununa işaret eder. Performans düşüşü (artan filtre DP, makineye giden su/kir) separatör verimsizliğinin dolaylı kanıtıdır.`,
          ],
        },
        {
          subheading: "6.2 Filtre ile ilişki ve cat fines",
          paragraphs: [
            `Separatör, filtreden önceki ana temizleme kademesidir; verimi düşerse filtre yükü artar ve DP hızla yükselir. Cat fines (Al+Si) özellikle separatörün ana hedefidir; iyi çalışan bir purifier cat fines'i büyük ölçüde uzaklaştırır. Yağcı, filtre içeriğinde kum benzeri parçacık görürse separatör verimini sorgular.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Separatör + filtre birlikte değerlendirilir",
              text: `Filtre DP'sinin hızlı yükselmesi sıklıkla separatörün iyi çalışmadığını gösterir. İkisini bir bütün olarak izleyin: iyi bir purifier, filtrenin ömrünü uzatır ve makineyi cat fines/su'dan korur. Filtre, separatörün performans aynasıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Separatör Türleri: FO, LO ve Sludge",
      sections: [
        {
          subheading: "7.1 FO ve LO separatörü farkları",
          paragraphs: [
            `FO separatörü ağır/kirli yakıtı işler; yüksek sıcaklık, sık desludge ve cat fines/su ayrımı odaklıdır. LO separatörü ise sistem yağını sürekli temizler (bypass purification); daha temiz beslemeyle çalışır, su ve aşınma metallerini ayırır. İkisinin besleme sıcaklığı, debisi ve desludge sıklığı farklıdır; karıştırılmaz.`,
            `Yağcı, hangi separatörün hangi sisteme hizmet ettiğini, yedek (standby) separatörün durumunu ve devreye alma prosedürünü bilir. Bir separatör bakıma alındığında standby devreye girer; makine beslemesi kesintiye uğramaz.`,
          ],
        },
        {
          subheading: "7.2 Sludge separatörü ve atık yönetimi",
          paragraphs: [
            `Bazı gemilerde sludge'ı daha da konsantre eden ayrı sludge separatör/decanter bulunur; atılan sıvının yağ içeriğini düşürerek bertaraf hacmini azaltır. Ayrılan sludge, MARPOL Annex I kapsamında sludge tankına gider ve incinerator'da yakılır veya sahile teslim edilir. Hiçbir koşulda denize verilmez.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — sludge bertarafı",
              text: `Separatörden çıkan sludge ve atık yağ, yalnızca incineration veya shore reception facility yoluyla bertaraf edilir; her işlem ORB Part I'e kaydedilir. Sludge'ın denize verilmesi veya kayıt tutarsızlığı ağır yaptırım getirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sık Arızalar ve Sorun Giderme",
      sections: [
        {
          subheading: "8.1 Tipik arızalar ve nedenleri",
          paragraphs: [
            `En sık görülen sorunlar: water seal kaybı (yanlış gravity disc, düşük besleme/sealing water), oil loss (broken seal, aşırı debi), titreşim (bowl'da çamur birikimi, yanlış montaj, yatak aşınması), eksik desludge (operating water basınç/tıkanma sorunu) ve makineye su/kir gitmesi (genel verim düşüşü). Her belirtinin kök nedeni sistematik aranır.`,
            `Düşük besleme sıcaklığı ayrımı bozar; preheater veya termostat arızası tipik nedendir. Yüksek titreşim daima ciddiye alınır ve separatör durdurulur. Yağcı, basit kontrolleri (sıcaklık, basınç, operating water) yapar ve çözülemeyeni mühendise iletir.`,
          ],
          table: {
            caption: `Separatör Arıza Belirtileri ve Olası Nedenler`,
            headers: ["Belirti", "Olası Neden", "İlk Aksiyon"],
            rows: [
              ["Yüksek titreşim", "Çamur birikimi / montaj / yatak", "Durdur, kontrol et, raporla"],
              ["Oil loss (su tarafına)", "Kırık seal / yanlış disc / yüksek debi", "Disc/seal/debi kontrolü"],
              ["Su makineye gidiyor", "Broken seal / kötü ayrım", "Seal yenile, sıcaklık kontrol"],
              ["Eksik desludge", "Operating water düşük/tıkalı", "Op. water basınç/filtre kontrolü"],
              ["Düşük ayrım verimi", "Düşük sıcaklık / yüksek debi", "Preheater/debi ayarı"],
            ],
          },
        },
        {
          subheading: "8.2 Vaka — Gözden kaçan water seal kaybı",
          paragraphs: [
            `Bir gemide separatör su çıkışından yakıt geldiği (oil loss) Yağcı tarafından fark edilmiş; inceleme, bunker yoğunluğu değiştiği halde gravity disc'in değiştirilmediğini ortaya koymuştur. Doğru disc takılınca water seal yeniden kurulmuş, yakıt kaybı durmuş ve makineye su gitmesi önlenmiştir. Günlük gözlem, hem yakıt israfını hem de makine riskini önlemiştir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Günlük gözlem para ve makine kurtarır",
              text: `Separatörün su ve temiz çıkışını her vardiyada gözlemlemek, kırık seal'i ve oil loss'u erken yakalar. Fark edilmeyen bir seal kaybı, hem değerli yakıtın denize gitmesi hem de makineye su girmesi demektir. Birkaç saniyelik bakış, büyük kayıpları önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Güvenlik ve Çevre",
      sections: [
        {
          subheading: "9.1 Sıcak ve dönen ekipman güvenliği",
          paragraphs: [
            `Separatör hem çok sıcaktır (~98°C besleme, ısıtıcı, sıcak yakıt) hem de çok yüksek devirli dönen bir kütledir; ikisi de ciddi yaralanma riski taşır. Sıcak yüzeylere temas, sızan sıcak yakıt ve dönen bowl başlıca tehlikelerdir. Bakım yalnızca durmuş, soğumuş ve enerjisi izole edilmiş ekipmanda yapılır.`,
            `Yağcı, separatör çalışırken muhafazaları çıkarmaz, dönen kısma yaklaşmaz ve sıcak yüzeylere karşı eldiven kullanır. Yakıt sızıntısı sıcak yüzeyle buluşursa yangın riski doğar; bu yüzden separatör room temizliği ve sızıntı kontrolü kritiktir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Purifier room yangın riski",
              text: `Purifier room, sıcak yakıt + sıcak yüzey + dönen ekipmanın bir arada olduğu yüksek yangın riskli bir bölgedir. Yakıt sızıntıları derhal temizlenir, drip tray'ler boşaltılır, yangın algılama/söndürme sistemi devrede tutulur. Pek çok makine dairesi yangını burada başlamıştır.`,
            },
          ],
        },
        {
          subheading: "9.2 Çevre ve kayıt",
          paragraphs: [
            `Separatör bakımı ve desludge'dan çıkan tüm yağlı atık sludge tankına gider; bakım sırasında dökülen yakıt/yağ toplanır, sintineye karıştırılmaz. Sludge transferleri ve bertarafı ORB'ye işlenir. Yağcı, bakım atığını doğru yönlendirerek MARPOL uyumunu korur.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Yağcı/Fitter'ın separatör checklist'i",
          bullets: [
            `Besleme sıcaklığı (HFO ~98°C) ve debi doğru aralıkta mı?`,
            `Gravity disc yakıt yoğunluğuna uygun seçildi mi (purifier modu)?`,
            `Her desludge sonrası water seal kuruluyor, oil loss yok mu?`,
            `Operating water basıncı/debisi/temizliği yeterli mi?`,
            `Desludge tam ve düzenli yapılıyor mu (eksik atış var mı)?`,
            `Titreşim ve gövde sıcaklığı normal mi?`,
            `Temiz çıkış ve su drenajı gözlemlendi, sapma var mı?`,
            `Periyodik bowl/disc temizliği PMS'e göre yapıldı, O-ringler kontrol edildi mi?`,
            `Bowl açımı yalnız tam durmuş + izole ekipmanda yapıldı mı?`,
            `Sludge atığı sludge tankına gitti ve ORB'ye işlendi mi?`,
          ],
          paragraphs: [
            `Separatör bakımı, makineyi cat fines ve sudan koruyan görünmez bir kalkandır. Doğru sıcaklık, doğru gravity disc, sağlam water seal, düzgün desludge ve titiz periyodik temizlik; hem yakıt/yağ kaybını önler hem de enjeksiyon ve yatakları korur. İyi bir Yağcı/Fitter, separatörün her vardiyada su ve temiz çıkışını gözleyen, titreşimi ciddiye alan ve bowl'a yalnızca tam durduğunda dokunan kişidir. Temiz yakıt, sağlam makine demektir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
