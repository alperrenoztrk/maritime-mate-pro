import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yakıt ve yağlama sistemi öğrenimi",
  roleSlug: "makine-stajyer",
  taskIndex: 7,
  estimatedPages: 26,
  intro: `Makine stajyeri, geminin can damarı olan yakıt (fuel oil) ve yağlama (lubricating oil) sistemlerini pratik olarak öğrenmek zorundadır. Bu öğrenim; bunker (yakıt ikmali) operasyonu, FO/DO settling ve service tank sistemleri, purifier (separatör) operasyonu, LO sump ve sirkülasyon devresinin gözetimli takibini kapsar. Stajyer ayrıca yakıt/yağ numune (sample) alma, viskozite ve density ölçümü gözlemini, ve Oil Record Book (ORB) Part I formatının okunması ile doldurma mantığını öğrenir. Bu sistemler hem makinenin güvenilirliği hem de MARPOL kapsamında deniz kirliliği önleme açısından kritiktir. Bu bölüm, sistemlerin işleyişini, kontrol noktalarını ve mevzuat gerekliliklerini adım adım açıklar.`,
  sources: [
    "MARPOL Annex I — Oil Record Book Part I (machinery space operations)",
    "MARPOL Annex VI — Fuel oil sulphur limits ve BDN (Bunker Delivery Note)",
    "ISO 8217 — Petroleum products — Fuels (marine) specifications",
    "SOLAS Chapter II-2 — Fuel oil arrangements (flashpoint, leakage)",
    "IMO Model Course 7.04 — Officer in charge of an engineering watch",
    "OEM separator/purifier ve ana makine yakıt sistemi el kitapları",
    "ISGOTT / Bunkering safety guidelines (bunker operasyon emniyeti)",
    "Reeds Marine Engineering — Fuels, Lubricants and Combustion",
  ],
  chapters: [
    {
      heading: "1. Yakıt ve Yağlama Sistemlerinin Önemi",
      lead: `Yakıt ve yağ, makinenin hem enerjisi hem korumasıdır. Bu sistemlerdeki bir hata, makine arızasından deniz kirliliğine kadar uzanan sonuçlar doğurur.`,
      sections: [
        {
          subheading: "1.1 Sistemlerin rolü ve risk profili",
          paragraphs: [
            `Yakıt sistemi, ham bunker yakıtını depolar, ısıtır, temizler (separatör) ve makineye uygun viskozite/sıcaklıkta basar. Yağlama sistemi ise hareketli parçaları yağlar, soğutur, temizler ve aşınmayı önler. İkisi de kesintisiz, temiz ve doğru spesifikasyonda çalışmalıdır; aksi halde makine durabilir veya ciddi hasar görebilir.`,
            `Risk profili yüksektir: yakıt yanıcıdır (yangın/patlama), sıcak yakıt/yağ sıçrama riski taşır, ve her ikisi de denize karışırsa kirlilik suçu oluşturur. Stajyer, bu sistemleri öğrenirken hem teknik işleyişi hem de emniyet ve çevre boyutunu birlikte kavramalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — Yakıt düzenlemeleri",
              text: `Yakıt sistemleri sızıntı ve yangın riskini azaltacak şekilde tasarlanır; yüksek basınçlı yakıt hatları çift cidarlı (double-walled) olabilir ve sıcak yüzeylerden uzak tutulur. Flashpoint sınırları (genelde ≥60°C) emniyet için kritiktir.`,
            },
          ],
        },
        {
          subheading: "1.2 Yakıt türleri ve spesifikasyon",
          paragraphs: [
            `Gemilerde başlıca yakıt türleri HFO (Heavy Fuel Oil), VLSFO (Very Low Sulphur Fuel Oil), MGO/MDO (Marine Gas/Diesel Oil) ve giderek LNG gibi alternatif yakıtlardır. Her birinin viskozitesi, sülfür içeriği ve işleme ihtiyacı farklıdır. ISO 8217, marine yakıt spesifikasyonlarını tanımlar; teslim alınan yakıtın bu spesifikasyona uyması beklenir.`,
            `MARPOL Annex VI, ECA (Emission Control Area) bölgelerinde ve genel sularda sülfür sınırlarını belirler (genel sınır %0.50 m/m, ECA içinde %0.10 m/m). Stajyer, hangi bölgede hangi yakıtın kullanıldığını, yakıt değişim (changeover) prosedürünü ve BDN (Bunker Delivery Note) kaydının önemini öğrenir.`,
          ],
          table: {
            caption: `Tipik Gemi Yakıtları ve Özellikleri`,
            headers: ["Yakıt", "Tipik kullanım", "İşleme ihtiyacı"],
            rows: [
              ["HFO", "Ana makine (ısıtmalı)", "Isıtma + separatör"],
              ["VLSFO", "Düşük sülfür bölge", "Isıtma + separatör"],
              ["MGO/MDO", "Manevra, jeneratör, ECA", "Az/orta işleme"],
              ["LNG", "Alternatif yakıt", "Özel sistem (cryogenic)"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Bunker (Yakıt İkmali) Operasyonu",
      sections: [
        {
          subheading: "2.1 Bunker öncesi hazırlık ve emniyet",
          paragraphs: [
            `Bunkering, gemiye yakıt alınması operasyonudur ve yüksek kirlilik/yangın riski taşır. Operasyon öncesi; bunker planı hazırlanır, tank kapasiteleri ve boşluklar (ullage) hesaplanır, hat kontrol edilir, valf alignment doğrulanır, SOPEP ekipmanı hazır tutulur ve scupper (güverte tahliye delikleri) tıkanır. Ship-shore checklist doldurulur ve haberleşme kurulur.`,
            `Bunker sırasında sürekli izleme yapılır: tank seviyeleri, akış hızı (loading rate), overflow tank durumu ve hat sızıntıları. Acil durdurma (emergency stop) sinyali önceden kararlaştırılır. Stajyer, bunker operasyonunu gözetimli olarak izleyerek hem teknik hem emniyet boyutunu öğrenir; ancak valf/pompa kontrolü yetkili personeldedir.`,
          ],
          bullets: [
            `Bunker planı ve tank kapasite/ullage hesabı`,
            `Hat ve valf alignment doğrulaması`,
            `SOPEP ekipmanı hazır, scupper kapalı`,
            `Ship-shore checklist ve haberleşme`,
            `Sürekli seviye/rate/sızıntı izleme`,
            `Acil durdurma sinyali ve overflow alarmı`,
          ],
        },
        {
          subheading: "2.2 BDN, numune ve kalite",
          paragraphs: [
            `Bunker tesliminde Bunker Delivery Note (BDN), yakıtın miktarını, yoğunluğunu, sülfür içeriğini ve teslim bilgilerini belgeler; MARPOL Annex VI gereği belirli süre saklanır. Teslim sırasında MARPOL numunesi (representative sample) alınır ve mühürlenir; uyuşmazlık veya PSC kontrolünde bu numune analiz edilir.`,
            `Yakıt kalitesi kritiktir: spesifikasyon dışı yakıt (off-spec — su, katı, kedi kraker, yüksek sülfür) makineye ciddi hasar verebilir. Stajyer, numune alma, mühürleme ve BDN kontrol mantığını gözlemler. Şüpheli yakıtta laboratuvar analizi (fuel testing) sonucu beklenmeden makinede kullanılmamalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Bunker = en yüksek kirlilik riski anı",
              text: `Bunker operasyonu, gemideki en yüksek yakıt dökülme riskini taşır. Tek bir overflow veya hat kaçağı ciddi deniz kirliliği ve ağır cezalar doğurur. Sürekli izleme, hazır SOPEP ve kapalı scupper bu riskin tek savunmasıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. FO/DO Tank Sistemleri ve Akış",
      sections: [
        {
          subheading: "3.1 Storage, settling ve service tank zinciri",
          paragraphs: [
            `Yakıt, depolama tankından (storage/bunker tank) settling tank'a, oradan service tank'a doğru akar. Settling tank'ta yakıt ısıtılır ve bekletilir; ağır su ve tortu dibe çöker ve drain edilir (settling). Service tank ise separatörden geçmiş, makineye basılmaya hazır temiz yakıtı tutar. Bu zincir, yakıtı kademeli olarak temizler.`,
            `Stajyer, bu tank zincirinin neden bu sırayla kurulduğunu öğrenir: settling süresi su/tortunun ayrılmasını sağlar, separatör kalan safsızlığı alır, service tank son temiz rezervi tutar. Settling tank water drain'i düzenli yapılmazsa su makineye ulaşır ve yanma/enjeksiyon sorunları çıkar.`,
          ],
          table: {
            caption: `Yakıt Tank Zinciri ve İşlevleri`,
            headers: ["Tank", "İşlev", "Kritik kontrol"],
            rows: [
              ["Storage/bunker", "Ham yakıt depolama", "Seviye, ısıtma"],
              ["Settling", "Bekletme + su/tortu ayırma", "Drain, sıcaklık"],
              ["Service", "Temiz yakıt rezervi", "Seviye, separatör beslemesi"],
              ["Overflow", "Taşma güvenliği", "Seviye/alarm"],
            ],
          },
        },
        {
          subheading: "3.2 Isıtma, viskozite ve sıcaklık kontrolü",
          paragraphs: [
            `Ağır yakıt (HFO/VLSFO) makineye doğru viskozitede ulaşmalıdır; bu yüzden tanklarda ve hatlarda ısıtma (heating coil, trace heating) bulunur. Viscotherm/viscosity controller, yakıtı enjeksiyon öncesi optimum viskoziteye (genelde ~12-15 cSt) getirmek için sıcaklığı otomatik ayarlar. Yanlış viskozite, kötü atomizasyon ve yanma sorunları yaratır.`,
            `Stajyer, yakıt sıcaklık ve viskozite kontrolünün makine performansıyla doğrudan ilişkisini öğrenir: çok soğuk/viskoz yakıt zayıf atomize olur, çok sıcak yakıt enjeksiyon pompalarında sorun yaratabilir. Bu denge, makinenin temiz ve verimli yanmasının temelidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Settling tank drain'ini ihmal etme",
              text: `Settling tank water drain'i düzenli yapılmazsa, biriken su separatörü zorlar ve makineye su kaçma riski doğar. Stajyer, drain rutininin neden günlük yapıldığını anlamalı: çöken su, sadece dibe çökerse zararsızdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Purifier (Separatör) Operasyonu",
      lead: `Separatör, yakıt ve yağı temizleyen santrifüj cihazdır. Doğru çalışması, makinenin sağlığının temelidir.`,
      sections: [
        {
          subheading: "4.1 Separatör çalışma prensibi",
          paragraphs: [
            `Separatör (purifier/clarifier), yüksek hızlı santrifüj kuvvetiyle yakıt/yağdan su ve katı partikülleri ayırır. Purifier modunda su ve yağ ayrılır (su atılır), clarifier modunda ise sadece katılar ayrılır. Yoğunluk farkına dayanan ayrım, gravity disc seçimi (geleneksel separatörlerde) veya otomatik su algılama (modern separatörlerde) ile dengelenir.`,
            `Stajyer, separatör operasyonunu gözetimli izler: besleme sıcaklığı (yağ/yakıt için optimum sıcaklık ayırmayı iyileştirir), debi, su atışı (water seal), ve periyodik desludging (çamur boşaltma). Doğru sıcaklık ve debi, ayırma verimini belirler; aşırı debi temizliği bozar.`,
          ],
          bullets: [
            `Besleme sıcaklığı (yakıt için ~98°C civarı tipik)`,
            `Doğru debi (kapasiteyi aşmama)`,
            `Water seal (su contası) ve su atışı`,
            `Desludging (çamur boşaltma) periyodu`,
            `Gravity disc / yoğunluk ayarı (uygun separatörlerde)`,
          ],
        },
        {
          subheading: "4.2 Yaygın sorunlar ve gözlem",
          paragraphs: [
            `En sık separatör sorunu, yağ/yakıtın su atışından (overboard) kaçmasıdır; bu, water seal kaybı, yanlış gravity disc veya aşırı debiden kaynaklanabilir ve hem yakıt kaybı hem kirlilik riski yaratır. Diğer sorunlar; titreşim (bowl dengesizliği), yetersiz desludging ve sızıntılardır.`,
            `Stajyer, separatörün "normal" çalışma sesini, titreşimini ve görünümünü öğrenmeli ki anormali fark edebilsin. Separatör overhaul'u (bowl temizliği, conta değişimi) düzenli bir PMS işidir; stajyer bu bakıma katılarak iç yapıyı öğrenir. Çıkan çamur (sludge) ise ORB kaydına tabi olarak yönetilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Water seal kaybı",
              text: `Bir separatörde water seal kaybolur ve yakıt su atışından denize kaçmaya başlar. Stajyer, atış hattındaki anormal yağ filmini fark eder ve raporlar. Hızlı müdahale hem yakıt kaybını hem kirlilik suçunu önler. Gözlem keskinliği değer üretir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. LO Sump ve Sirkülasyon Devresi",
      sections: [
        {
          subheading: "5.1 Yağlama devresinin işleyişi",
          paragraphs: [
            `Ana makine yağlama sistemi; LO sump tank (yağ haznesi), LO pompaları, LO cooler (soğutucu), filtreler ve dağıtım hatlarından oluşur. Yağ; ana yatakları (main bearings), crosshead/crankpin yataklarını, pistonu (piston cooling oil) ve kam mekanizmasını yağlar ve soğutur, sonra sump'a döner. Sirkülasyon sürekli ve basınçlıdır.`,
            `Stajyer; LO inlet pressure/temperature, sump seviyesi, filtre diferansiyel basıncı ve cooler giriş/çıkış sıcaklıklarını izlemeyi öğrenir. Düşen LO basıncı (pompa/filtre/sızıntı) kritik bir alarmdır ve slow-down/shut-down tetikler; bu yüzden LO sistemi sürekli gözetim altındadır.`,
          ],
          table: {
            caption: `LO Devresi İzleme Noktaları`,
            headers: ["Nokta", "İzlenen", "Anormallik işareti"],
            rows: [
              ["Sump tank", "Seviye", "Düşüş = sızıntı/tüketim"],
              ["LO inlet", "Basınç/sıcaklık", "Düşük basınç = kritik alarm"],
              ["Filter", "Diferansiyel basınç", "Yükselme = tıkanma"],
              ["LO cooler", "Giriş/çıkış sıcaklığı", "Soğutma yetersizliği"],
              ["Crankcase", "Oil mist", "Mist = bearing ısınma"],
            ],
          },
        },
        {
          subheading: "5.2 Cylinder oil ve system oil ayrımı",
          paragraphs: [
            `Büyük iki-zamanlı dizel makinelerde iki ayrı yağ vardır: system oil (crankcase yağlaması, soğutma) ve cylinder oil (silindir cidarı yağlaması, lubricator ile dozajlanır). Cylinder oil, yakıtın sülfür içeriğine uygun BN (Base Number) ile seçilir; sülfürle nötralizasyon için doğru BN ve feed rate kritiktir.`,
            `Stajyer, cylinder oil feed rate'in (g/kWh) neden yakıt sülfürüne göre ayarlandığını öğrenir: yetersiz yağlama liner aşınması ve scuffing, aşırı yağlama ise birikinti (deposit) ve maliyet yaratır. Scrape-down oil analizi, silindir durumunu izlemenin bir yoludur. Bu denge, makine ömrünün temelidir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili görev: Vardiya ve parametre okuma",
              text: `LO/FO parametrelerinin vardiya rutinindeki izlenmesi için "Makine vardiyasına eğitim amaçlı katılım" bölümüne bakınız. Sistem bilgisi, vardiya parametre yorumuyla birleşir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Numune Alma ve Ölçümler",
      sections: [
        {
          subheading: "6.1 Sample alma ve laboratuvar analizi",
          paragraphs: [
            `Yakıt ve yağ numuneleri düzenli alınır: bunker MARPOL numunesi, kullanım öncesi yakıt numunesi ve periyodik LO numunesi (used oil analysis). Numune, temsil edici (representative) ve temiz koşullarda alınmalı; kontamine numune yanlış sonuç verir. Numuneler etiketlenir ve ya gemide hızlı test edilir ya da laboratuvara gönderilir.`,
            `LO analizi; viskozite, su içeriği, BN, aşınma metalleri (Fe, Cu, Cr) ve birikinti açısından yağın durumunu gösterir. Artan aşınma metalleri bir bearing/liner sorununun erken işareti olabilir. Stajyer, numune alma disiplinini ve analiz sonuçlarının ne anlattığını gözlemleyerek öğrenir.`,
          ],
          bullets: [
            `Bunker MARPOL numunesi (mühürlü)`,
            `Kullanım öncesi yakıt numunesi`,
            `Periyodik LO numunesi (used oil analysis)`,
            `Temsil edici ve temiz numune alma`,
            `Etiketleme ve laboratuvar gönderimi`,
          ],
        },
        {
          subheading: "6.2 Viskozite ve density ölçümü gözlemi",
          paragraphs: [
            `Viskozite ve density (yoğunluk) ölçümü, yakıt kalitesinin ve separatör ayarının temel parametreleridir. Density, separatör yoğunluk ayarını (ve eski tip separatörlerde gravity disc seçimini) etkiler; çok yüksek density yakıtlarda su ayırma zorlaşır. Viskozite ise ısıtma/atomizasyon kontrolünün temelidir.`,
            `Stajyer, gemide bulunan ölçüm cihazlarıyla (viscometer, density meter / hydrometer) ölçüm yapılışını gözlemler ve bu değerlerin işletme ayarlarına nasıl yansıdığını öğrenir. Ölçüm, soyut bir laboratuvar işi değil; doğrudan makinenin temiz ve güvenli çalışmasının pratik aracıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Oil Record Book (ORB) Part I",
      lead: `ORB, makine dairesi yağ operasyonlarının yasal günlüğüdür. Doğru tutulması bir mevzuat zorunluluğu, sahte tutulması ağır bir suçtur.`,
      sections: [
        {
          subheading: "7.1 ORB Part I'in kapsamı ve kayıt mantığı",
          paragraphs: [
            `MARPOL Annex I gereği, makine dairesi yağ operasyonları Oil Record Book Part I'e kaydedilir: bunkering, iç yakıt/yağ transferleri, bilge suyu OWS üzerinden basma, sludge boşaltma (incinerator/ashore/tank), ve tank temizliği. Her işlem belirli kod harfleri (A, B, C, D, E, F, G, H, I) altında, tarih, miktar ve detayla kaydedilir ve sorumlu mühendisçe imzalanır.`,
            `Stajyer, ORB formatını okumayı ve her kayıt türünün ne anlama geldiğini öğrenir: bir bilge transferi neden ve nasıl kaydedilir, sludge nereye gönderildi, separatör çamuru nasıl yönetildi. ORB, PSC denetiminin en sık incelenen belgelerindendir; kayıtlar gerçek tank seviyeleriyle ve makine operasyonuyla tutarlı olmalıdır.`,
          ],
          table: {
            caption: `ORB Part I Kayıt Türleri (Örnek)`,
            headers: ["Kod", "İşlem", "Örnek"],
            rows: [
              ["C", "Sludge toplama/transfer", "Separatör çamuru sludge tank'a"],
              ["D", "Sludge bertaraf", "Incinerator yakma / karaya verme"],
              ["E", "Bilge suyu otomatik basma", "OWS üzerinden <15 ppm"],
              ["F", "Bilge suyu manuel basma", "OWS + ODMCS kayıtlı"],
              ["H", "Yakıt/yağ bunkering", "Bunker alımı, miktar/density"],
            ],
          },
        },
        {
          subheading: "7.2 Magic pipe ve sahte kayıt yasağı",
          paragraphs: [
            `Bilge suyunu OWS'yi by-pass eden gizli bir hat (magic pipe) ile denize basmak veya ORB'ye sahte kayıt girmek, denizdeki en ağır cezalandırılan suçlardandır. Şirketlere milyonlarca dolar ceza, mürettebata hapis cezası verilmiştir. Stajyer, ORB'nin neden bu kadar ciddiye alındığını ve dürüst kaydın neden tartışmasız olduğunu öğrenmelidir.`,
            `Stajyer ORB'yi imzalama yetkisine sahip değildir; bu yetki sorumlu mühendistedir. Ancak stajyer, kayıt mantığını öğrenir ve bir gün kendi imzasını atacağı bu defterin yasal ağırlığını içselleştirir. ORB'de dürüstlük, mühendislik mesleğinin onurunun parçasıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Magic pipe = ağır suç",
              text: `OWS'yi by-pass ederek bilge basmak ve ORB'ye sahte kayıt girmek, ABD ve diğer ülkelerde milyon dolarlık cezalar ve hapis cezasıyla sonuçlanmıştır. Stajyer bu suçun ciddiyetini bilmeli ve dürüst kaydın istisnasız olduğunu kavramalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Stajyerin yakıt/yağ sistemi kontrol listesi",
          bullets: [
            `Bunker emniyeti (SOPEP, scupper, checklist) ve izlemeyi gözlemledim mi?`,
            `FO storage-settling-service tank zincirini ve drain rutinini anladım mı?`,
            `Yakıt ısıtma/viskozite kontrolünün makineye etkisini kavradım mı?`,
            `Separatör çalışma prensibini ve su atışı anormalini öğrendim mi?`,
            `LO sump/basınç/filtre izleme noktalarını ve kritik alarmı biliyor muyum?`,
            `Cylinder oil ile system oil ayrımını ve BN mantığını öğrendim mi?`,
            `Numune alma ve viskozite/density ölçümünü gözlemledim mi?`,
            `ORB Part I kayıt mantığını ve magic pipe yasağını anladım mı?`,
          ],
          paragraphs: [
            `Yakıt ve yağlama sistemleri, geminin kalbini besleyen ve koruyan damarlardır. Bunker emniyeti, tank zinciri, separatör operasyonu ve LO sirkülasyonu; makinenin güvenilir çalışmasının temelidir. Aynı zamanda bu sistemler MARPOL kapsamında deniz kirliliğinin en kritik kaynaklarındandır; ORB dürüstlüğü ve emniyetli operasyon, mühendisliğin hem teknik hem etik boyutunu birleştirir. Stajyer, bu sistemleri öğrenirken "makine nasıl beslenir ve korunur" sorusu kadar "çevre ve emniyet nasıl korunur" sorusunu da içselleştirmelidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
