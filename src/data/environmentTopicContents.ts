import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Deniz Çevresinin Korunması — "Dersler Beta" okunabilir konu anlatımı.
 *
 * İçerik gerçek standartlara dayanır (MARPOL 73/78 Ek I–VI, BWM Convention,
 * AFS Convention, Hong Kong Convention). `TopicSection.title` değerleri
 * lessonFlow/environment.ts içindeki `sectionRef`/`sectionTitles` ile eşleşir.
 */
// Ders görselleri — depoda hâlihazırda bulunan varlıklar.
import tankerShipImage from "@/assets/ships/tanker-ship.jpg";

export const environmentTopicContents: Record<string, TopicDetailContent> = {
  "MARPOL Genel Yapısı ve Ekler": {
    title: "MARPOL Genel Yapısı ve Ekler",
    introduction:
      "MARPOL 73/78 (International Convention for the Prevention of Pollution from Ships), gemilerden kaynaklanan deniz kirliliğini önlemeye yönelik temel uluslararası sözleşmedir. Hem operasyonel (rutin tahliye) hem kaza kaynaklı kirliliği kapsar ve altı teknik ekten oluşur. Her ek farklı bir kirletici türünü düzenler; uyum, sörveyler ve gemideki kayıtlarla (record books) denetlenir.",
    sections: [
      {
        title: "Altı Ekin Genel Görünümü",
        content:
          "MARPOL'ün altı eki şunları düzenler: Ek I — Petrol kirliliği (oil); Ek II — Dökme zararlı sıvı maddeler (Noxious Liquid Substances); Ek III — Paketli zararlı maddeler (denizde taşınan deniz kirleticileri); Ek IV — Gemilerden kaynaklanan pis su (sewage); Ek V — Çöp (garbage); Ek VI — Gemilerden kaynaklanan hava kirliliği (SOx, NOx, partikül, sera gazları). Ek I ve II zorunlu (taraf devletler için bağlayıcı), Ek III–VI ise kabul edilmiş ve yürürlüktedir. Her ek, gemi tipi ve tonajına göre uygulanır.",
      },
      {
        title: "Özel Alanlar ve Emisyon Kontrol Alanları",
        content:
          "MARPOL bazı denizleri 'Özel Alan' (Special Area) ilan eder; buralarda tahliye kuralları daha katıdır veya tamamen yasaktır (örn. Akdeniz, Baltık, Karadeniz çeşitli ekler kapsamında özel alandır). Ek VI ayrıca 'Emisyon Kontrol Alanı' (Emission Control Area, ECA) tanımlar; bu bölgelerde kükürt ve/veya NOx limitleri daha sıkıdır (örn. Baltık, Kuzey Denizi, Kuzey Amerika ECA'ları). Geminin bulunduğu bölgeye göre uygulanacak kural değişir; bu nedenle mevki ve bölge sınırları sürekli izlenir.",
      },
      {
        title: "Sörvey, Sertifika ve Kayıtlar",
        content:
          "MARPOL uyumu periyodik sörveylerle doğrulanır ve sertifikalarla belgelenir: IOPP (Ek I — petrol), NLS/IPP (Ek II), ISPP (Ek IV — pis su), IAPP (Ek VI — hava). Ek olarak gemide zorunlu kayıt defterleri tutulur: Oil Record Book (Ek I), Cargo Record Book (Ek II), Garbage Record Book (Ek V) ve EEXI/SEEMP/CII belgeleri (Ek VI). Bu kayıtlardaki tutarsızlık ve sahtelik, PSC denetimlerinde ağır yaptırımlara ve cezalara yol açar.",
      },
      {
        title: "İhlal, Raporlama ve Yaptırım",
        content:
          "MARPOL ihlalleri (örn. yasadışı tahliye, kayıt sahteciliği, 'magic pipe' ile arıtmayı atlama) ağır para cezaları ve adli sorumlulukla sonuçlanır. Kazara kirlilik veya kirlilik tehdidi durumunda gemi, en yakın kıyı devletine ve şirkete derhâl bildirim yapar. Gemide petrol kirliliği acil durum planı (SOPEP) ve gerektiğinde zararlı madde planı (SMPEP) bulunur. Bayrak devleti, kıyı devleti ve liman devleti birlikte denetim ve yaptırım uygular.",
      },
    ],
    keyPoints: [
      "MARPOL altı ek: I petrol, II zararlı sıvı, III paketli, IV pis su, V çöp, VI hava.",
      "Özel Alanlar ve ECA'larda tahliye/emisyon kuralları daha katıdır; bölge sürekli izlenir.",
      "Uyum sörvey/sertifika (IOPP, IAPP...) ve kayıt defterleriyle (ORB, GRB...) denetlenir.",
      "İhlaller ağır cezalıdır; kazada en yakın kıyı devletine derhâl bildirim yapılır (SOPEP).",
    ],
  },

  "MARPOL Ek I — Petrol Kirliliği": {
    title: "MARPOL Ek I — Petrol Kirliliği",
    introduction:
      "MARPOL Ek I, gemilerden petrol ve petrollü karışımların denize tahliyesini düzenler. Hem makine dairesi sintine/yağlı suyu (tüm gemiler) hem tankerlerin yük/slop suyu kapsanır. Temel ilke: petrollü su ancak belirli arıtma, konsantrasyon ve mevki koşulları sağlandığında tahliye edilebilir; aksi hâlde gemide tutulur ve karaya verilir.",
    sections: [
      {
        title: "Makine Dairesi Sintine Suyu ve 15 ppm Kuralı",
        content:
          "Makine dairesinde biriken yağlı sintine suyu, denize verilmeden önce yağlı su ayırıcısından (Oil/Water Separator, OWS) geçirilir. Tahliye için temel koşullar: gemi rota üzerindeyken (en route), petrol içeriği 15 ppm'i (milyonda parça) aşmamalı ve sistem 15 ppm alarmlı bir izleme cihazıyla (oil content monitor) donatılmış olmalıdır. Konsantrasyon 15 ppm'i aşarsa otomatik durdurma valfi tahliyeyi keser ve suyu sintineye/slop tankına geri gönderir. Özel alanlarda kurallar daha katıdır.",
        formula: {
          text: "Tahliye: ≤ 15 ppm + en route + 15 ppm alarmlı OWS/monitor",
          description: "Makine dairesi sintine suyu için MARPOL Ek I asgari tahliye koşulları",
        },
      },
      {
        title: "Tankerlerde Yük Tahliyesi ve ODME",
        content:
          "Petrol tankerlerinde yük tanklarının yıkama/balast suyu özel kurallara tabidir. Tahliye için temel koşullar: gemi en route ve karadan en az 50 deniz mili uzakta olmalı, anlık tahliye oranı 30 litre/deniz mili'ni aşmamalı ve mevcut tankerlerde toplam tahliye, taşınan yükün belirli bir oranını (yeni tankerlerde 1/30.000, eskilerde 1/15.000) geçmemelidir. Tüm bu süreç, Oil Discharge Monitoring and Control system (ODME) ile sürekli ölçülür ve kaydedilir. Slop tankı, tank yıkama atıklarını biriktirip 'load on top' yöntemiyle yönetir.",
      },
      {
        title: "Oil Record Book (ORB)",
        content:
          "Tüm petrol/yağ işlemleri Oil Record Book'a kaydedilir. ORB Bölüm I (makine dairesi işlemleri — tüm gemiler) ve Bölüm II (yük/balast işlemleri — tankerler) olarak tutulur. Sintine transferi, OWS ile tahliye, slop yönetimi, yağ alımı/yakımı, kazara tahliyeler ayrı kodlarla ve imzayla kayıt altına alınır. ORB, PSC ve kıyı devleti denetimlerinde en sık incelenen belgedir; kayıtların gerçek tank ve OWS verileriyle tutarlı olması zorunludur. Sahte kayıt veya 'bypass' (magic pipe) ağır suçtur.",
      },
      {
        title: "SOPEP ve Önleme Donanımı",
        content:
          "Her gemide Shipboard Oil Pollution Emergency Plan (SOPEP) bulunur; bu plan petrol döküntüsü/kirlilik tehdidi durumunda kimin ne yapacağını, raporlama irtibatlarını (kıyı devleti, şirket) ve döküntü kontrol prosedürlerini tanımlar. Gemide SOPEP donanımı (emici pedler, dispersant, kürek, varil, tıkaç vb.) hazır bulundurulur. Bunker (yakıt alma) operasyonu, döküntü riski yüksek olduğundan kontrol listesi, gözcü ve hazır donanımla yürütülür; güverte tahliyeleri (scupper plug) kapatılır.",
      },
    ],
    keyPoints: [
      "Makine dairesi sintinesi ≤15 ppm, en route ve 15 ppm alarmlı OWS ile tahliye edilebilir.",
      "Tankerde yük tahliyesi: en route, >50 nm, ≤30 L/nm ve oran limiti; ODME ile izlenir.",
      "Tüm petrol işlemleri Oil Record Book'a kaydedilir; bypass/sahte kayıt ağır suçtur.",
      "SOPEP planı ve donanımı zorunludur; bunkerde döküntü önlemleri uygulanır.",
    ],
  },

  "MARPOL Ek II — Zararlı Sıvı Maddeler": {
    title: "MARPOL Ek II — Zararlı Sıvı Maddeler",
    introduction:
      "MARPOL Ek II, dökme olarak taşınan zararlı sıvı maddelerin (Noxious Liquid Substances, NLS) — başta kimyasal tankerlerin yükleri — denize tahliyesini düzenler. Her madde, deniz çevresine zararına göre kategorize edilir ve bu kategori, tank yıkama atıklarının nasıl bertaraf edileceğini belirler.",
    sections: [
      {
        title: "Kategoriler: X, Y, Z ve OS",
        content:
          "NLS dört gruba ayrılır. Kategori X: deniz çevresine büyük zarar; tahliyesi yasak, tank önyıkaması (prewash) ve atığın karaya verilmesi zorunlu. Kategori Y: önemli zarar; sınırlı koşullarla tahliyeye izin var, bazı durumlarda prewash gerekir. Kategori Z: küçük zarar; en az kısıtlama. OS (Other Substances): zararsız sayılan, MARPOL Ek II kapsamı dışı maddeler. Maddenin kategorisi, IBC Code ve ilgili kataloglarda tanımlıdır ve taşıma öncesi netleştirilir.",
        image: tankerShipImage,
        imageAlt: "Tanker carrying noxious liquid substances in bulk",
      },
      {
        title: "Tahliye Koşulları",
        content:
          "İzin verilen tahliye için tipik koşullar: gemi en route ve en az 7 knot hızda (kendinden tahrikli) olmalı, su hattının altındaki onaylı tahliye ağzından yapılmalı, kıyıdan en az 12 deniz mili uzakta ve su derinliği en az 25 metre olmalıdır. Tank dibinde kalan tortunun (residue) belirli sınırların altına indirilmesi için onaylı pompalama (stripping) ve gerektiğinde prewash uygulanır. Antarktika ve bazı bölgeler özel alan kapsamındadır ve daha katıdır.",
        formula: {
          text: "Tahliye: en route ≥7 kn + >12 nm + derinlik ≥25 m + su altı ağzı",
          description: "Kategori Y/Z artıkları için MARPOL Ek II tipik tahliye koşulları",
        },
      },
      {
        title: "Cargo Record Book ve P&A Manual",
        content:
          "Kimyasal tankerlerde tüm yük, tank yıkama, transfer ve tahliye işlemleri Cargo Record Book'a kaydedilir. Her gemide, tank yıkama ve atık yönetimi prosedürlerini madde kategorisine göre tanımlayan onaylı Procedures and Arrangements (P&A) Manual bulunur. Tank temizliği, önyıkama gereksinimi ve atığın akıbeti bu kılavuza göre yürütülür ve surveyör/otorite tarafından doğrulanır.",
      },
      {
        title: "Kimyasal Tanker Emniyeti ile Bağ",
        content:
          "Ek II uyumu, kimyasal tanker emniyetiyle iç içedir. Yüklerin uyumsuzluğu, toksisitesi ve reaktivitesi nedeniyle tank kaplama uyumu, inertleme, havalandırma ve KKD önlemleri uygulanır. Tank yıkama suları ve atıklar, hem çevre (Ek II) hem personel güvenliği açısından yönetilir. Yanlış tahliye veya prewash atlanması hem çevresel hem hukuki ağır sonuçlar doğurur.",
      },
    ],
    keyPoints: [
      "NLS kategorileri: X (yasak/prewash), Y (sınırlı), Z (en az kısıt), OS (kapsam dışı).",
      "Tahliye: en route ≥7 kn, >12 nm, derinlik ≥25 m, su altı onaylı ağızdan.",
      "Tüm işlemler Cargo Record Book'a kaydedilir; onaylı P&A Manual prosedürü belirler.",
      "Ek II uyumu kimyasal tanker emniyetiyle (uyumluluk, inertleme, KKD) birlikte yönetilir.",
    ],
  },

  "MARPOL Ek III — Paketli Zararlı Maddeler": {
    title: "MARPOL Ek III — Paketli Zararlı Maddeler",
    introduction:
      "MARPOL Ek III, paketli formda denizde taşınan zararlı maddelerin (deniz kirleticileri — marine pollutants) yol açtığı kirliliği önler. Uygulama büyük ölçüde IMDG Code üzerinden yürür: hangi maddelerin deniz kirletici sayıldığı, nasıl ambalajlanıp işaretleneceği ve istifleneceği burada düzenlenir.",
    sections: [
      {
        title: "Deniz Kirletici (Marine Pollutant) Kavramı",
        content:
          "Bazı paketli maddeler, deniz ortamına döküldüğünde sucul yaşam için toksiktir, birikir (bioaccumulation) veya uzun süre bozunmaz. Bunlar 'marine pollutant' olarak tanımlanır ve IMDG Code'da işaretlenir. Bir madde tek başına başka bir tehlike sınıfına girmese bile (örn. yalnızca çevresel tehlike taşıyan sınıf 9 maddeleri) deniz kirletici olarak ek kurallara tabi olabilir. Sınıflandırma, maddenin sucul toksisite verilerine dayanır.",
        image: "/diagrams/seamanship/imdg-ayrim.svg",
        imageAlt: "Segregation of packaged harmful substances under the IMDG Code",
      },
      {
        title: "Ambalajlama, İşaretleme ve Etiketleme",
        content:
          "Deniz kirleticiler, denize dökülmeyi en aza indirecek dayanıklı, onaylı (UN sertifikalı) ambalajlarda taşınır. Paket ve konteynerler, üçgen balık-ağaç sembolünü içeren 'marine pollutant' işaretiyle ve uygun sevkiyat adıyla işaretlenir. Belirli küçük miktarlar (limited/excepted quantities) için istisnalar tanımlıdır. Doğru işaretleme, acil durumda müdahale ekibinin maddeyi ve riskini hızlı tanımlamasını sağlar.",
      },
      {
        title: "İstif, Ayrım ve Denize Atma Yasağı",
        content:
          "Deniz kirleticiler, IMDG Code istif ve ayrım (segregation) kurallarına göre, uyumsuz maddelerden ve gerektiğinde yaşam mahalli/ısı kaynaklarından ayrı istiflenir. Bu maddelerin kasıtlı olarak denize atılması yasaktır. Yalnızca gemi/can güvenliği veya denizde can kurtarma amacıyla zorunlu hâllerde istisnai atma söz konusu olabilir; bu durumlar belgelenir ve raporlanır.",
      },
      {
        title: "Döküntü, Kayıp ve Raporlama",
        content:
          "Denizde paket kaybı veya döküntü olduğunda, kıyı devletine ve ilgili makamlara bildirim yapılır; özellikle konteyner denize düşmesi gibi olaylarda taşınan deniz kirleticiler raporlanır. Gemideki tehlikeli yük manifestosu ve istif planı, döküntü konumu ve madde bilgisini sağlar. EmS (acil durum çizelgeleri) döküntü müdahalesini yönlendirir. Doğru kayıt ve hızlı bildirim, çevresel etkiyi sınırlandırır.",
      },
    ],
    keyPoints: [
      "Marine pollutant, sucul yaşama toksik/birikici/kalıcı paketli maddedir; IMDG'de işaretlenir.",
      "Dayanıklı onaylı ambalaj + 'marine pollutant' işareti zorunludur (limited quantity istisnaları var).",
      "İstif/segregation kurallarına uyulur; kasıtlı denize atma yasaktır.",
      "Paket kaybı/döküntü kıyı devletine raporlanır; EmS müdahaleyi yönlendirir.",
    ],
  },

  "MARPOL Ek IV — Pis Su (Sewage)": {
    title: "MARPOL Ek IV — Pis Su (Sewage)",
    introduction:
      "MARPOL Ek IV, gemilerden kaynaklanan pis suyun (sewage — tuvalet, revir, belirli drenajlar) denize boşaltılmasını düzenler. Amaç, patojen ve besin maddesi yükünün kıyı sularını ve halk sağlığını tehdit etmesini önlemektir. Tahliye, arıtma durumu ve kıyıdan uzaklığa bağlıdır.",
    sections: [
      {
        title: "Pis Su Tanımı ve Kapsam",
        content:
          "Pis su; tuvaletlerden, pisuvarlardan, revir/hastane lavabo ve drenajlarından, canlı hayvan bulunan mahallerden gelen atık sudur. Ek IV genellikle 400 GT ve üzeri gemilere veya 15'ten fazla kişi taşıyan gemilere uygulanır. Geminin pis su arıtma tesisi (sewage treatment plant), parçalama/dezenfeksiyon sistemi veya toplama (holding) tankı bulundurması gerekir. Uyum, Uluslararası Pis Su Kirliliğini Önleme Sertifikası (ISPP) ile belgelenir.",
      },
      {
        title: "Tahliye Koşulları",
        content:
          "Arıtılmamış pis su, kıyıdan en az 12 deniz mili uzakta, gemi en route ve en az 4 knot hızdayken, makul bir oranda (tank dibinde biriktirilmemiş, seyrelmiş şekilde) tahliye edilebilir. Parçalanıp dezenfekte edilmiş pis su kıyıdan en az 3 deniz mili uzakta tahliye edilebilir. Onaylı bir arıtma tesisinden geçen ve standartları sağlayan çıkış suyu için mesafe kısıtı daha gevşektir. Yolcu gemilerinde özel alanlarda daha katı standartlar uygulanır.",
        formula: {
          text: "Arıtılmamış >12 nm (≥4 kn, en route) · parçalanmış+dezenfekte >3 nm",
          description: "MARPOL Ek IV pis su tahliye mesafeleri (onaylı tesis çıkışı için daha gevşek)",
        },
      },
      {
        title: "Toplama Tankı ve Karaya Verme",
        content:
          "Tahliyenin yasak olduğu bölgelerde (liman içi, kıyıya yakın, bazı özel alanlar) pis su holding tankında biriktirilir ve limanda alım tesisine (reception facility) veya tankere verilir. Tank kapasitesi ve transfer bağlantıları (standart kıyı bağlantısı) buna göre planlanır. Tank dolum seviyesi izlenir; taşma ve istem dışı tahliye önlenir.",
      },
      {
        title: "Arıtma Tesisi ve İzleme",
        content:
          "Onaylı pis su arıtma tesisi; biyolojik arıtma, dezenfeksiyon ve gerektiğinde katı ayırma adımlarıyla çıkış suyunu standartlara getirir (askıda katı madde, fekal koliform, BOİ sınırları). Tesisin düzenli bakımı, dezenfektan/biyolojik kültür yönetimi ve çıkış kalitesinin izlenmesi gereklidir. Arızalı tesis, çıkışı standardın dışına çıkararak ihlale yol açar; bu nedenle bakım ve kayıt önemlidir.",
      },
    ],
    keyPoints: [
      "Pis su tuvalet/revir/hayvan mahalli atık suyudur; Ek IV ≥400 GT veya >15 kişi gemilere uygulanır.",
      "Arıtılmamış >12 nm (en route ≥4 kn); parçalanmış+dezenfekte >3 nm tahliye edilebilir.",
      "Tahliye yasak bölgelerde holding tankı kullanılır, karaya/reception'a verilir.",
      "Onaylı arıtma tesisi standartları sağlar; bakım ve çıkış izleme zorunludur.",
    ],
  },

  "MARPOL Ek V — Çöp (Garbage)": {
    title: "MARPOL Ek V — Çöp (Garbage)",
    introduction:
      "MARPOL Ek V, gemilerden kaynaklanan çöpün (garbage) denize atılmasını düzenler ve plastiklerin denize atılmasını tamamen yasaklar. Deniz çöpü, özellikle plastik, deniz ekosistemleri için en kalıcı ve yaygın kirleticilerden biridir. Genel kural, çöpün denize atılmasının yasak olması; sınırlı istisnaların ise katı koşullara bağlı olmasıdır.",
    sections: [
      {
        title: "Plastik Yasağı ve Genel Yaklaşım",
        content:
          "Ek V'in en temel kuralı, her türlü plastiğin (sentetik halat, ağ, çöp poşeti, plastik ambalaj dâhil) denize atılmasının kesinlikle yasak olmasıdır. Genel felsefe değişmiştir: artık 'neyin atılabileceği' değil, 'çok sınırlı istisnalar dışında hiçbir şeyin atılamayacağı' esas alınır. Çöp kaynağında ayrıştırılır, mümkün olduğunca azaltılır, gemide depolanır ve limanda alım tesislerine verilir.",
      },
      {
        title: "Sınırlı Tahliye İstisnaları",
        content:
          "Çok sınırlı durumlarda, gemi en route ve kıyıdan yeterince uzaktayken bazı çöpler denize verilebilir: öğütülmüş gıda atıkları (parçacık boyutu ≤25 mm) kıyıdan en az 3 deniz mili, öğütülmemiş gıda atıkları en az 12 deniz mili uzakta atılabilir. Yük artığı (cargo residue) ve tank yıkama suları belirli koşullarda ve maddenin deniz çevresine zararlı olmaması hâlinde tahliye edilebilir. Özel alanlarda bu mesafeler ve koşullar çok daha katıdır; çoğu çöp tipi tamamen yasaktır.",
        formula: {
          text: "Öğütülmüş gıda (≤25 mm) >3 nm · öğütülmemiş gıda >12 nm · plastik HER ZAMAN yasak",
          description: "MARPOL Ek V gıda atığı tahliye mesafeleri (özel alanlarda daha katı)",
        },
      },
      {
        title: "Garbage Record Book ve Yönetim Planı",
        content:
          "Belirli gemilerde (genellikle 100 GT ve üzeri veya 15'ten fazla kişi) çöp yönetim planı (Garbage Management Plan) ve Garbage Record Book (GRB) zorunludur. Her çöp işlemi (denize tahliye, karaya verme, gemide yakma) tarih, mevki, kategori ve miktar ile kaydedilir ve imzalanır. Çöp kategorilere ayrılır (plastik, gıda atığı, evsel atık, yemeklik yağ, kül, operasyonel atık, yük artığı, e-atık vb.). Çöp afişleri (placard) ile mürettebat bilgilendirilir.",
      },
      {
        title: "Azaltma, Ayrıştırma ve Karaya Teslim",
        content:
          "Çöp yönetiminin omurgası kaynakta azaltma ve ayrıştırmadır: ambalaj minimize edilir, geri dönüştürülebilir malzemeler ayrılır, tehlikeli atıklar (boya, pil, kimyasal kap) ayrı toplanır. Gemide uygun depolama (sıkıştırma, öğütücü, gerektiğinde incinerator) kullanılır. Toplanan çöp limandaki alım tesislerine teslim edilir ve teslim makbuzu/dekontu saklanır. Bu makbuzlar, GRB kayıtlarını destekleyen kanıtlardır.",
      },
    ],
    keyPoints: [
      "Plastik denize atmak HER ZAMAN ve HER YERDE yasaktır.",
      "İstisna: öğütülmüş gıda (≤25 mm) >3 nm, öğütülmemiş gıda >12 nm; özel alanlar çok daha katı.",
      "Garbage Management Plan ve Garbage Record Book belirli gemilerde zorunludur.",
      "Çöp kaynakta azaltılır/ayrıştırılır ve limanda alım tesisine teslim edilir (makbuz saklanır).",
    ],
  },

  "MARPOL Ek VI — Hava Kirliliği ve Enerji Verimliliği": {
    title: "MARPOL Ek VI — Hava Kirliliği ve Enerji Verimliliği",
    introduction:
      "MARPOL Ek VI, gemilerden kaynaklanan hava kirliliğini (kükürt oksitleri SOx, azot oksitleri NOx, partikül madde, ozon tabakasına zararlı maddeler) ve sera gazı emisyonlarına yönelik enerji verimliliği gerekliliklerini düzenler. Uyum, IAPP sertifikası ve enerji verimliliği belgeleriyle kanıtlanır.",
    sections: [
      {
        title: "Kükürt (SOx) Limitleri ve ECA",
        content:
          "Yakıttaki kükürt oranı SOx emisyonunu doğrudan belirler. 2020'den itibaren küresel kükürt sınırı kütlece %0.50'dir (önceki %3.50'den düşürülmüştür). Emisyon Kontrol Alanlarında (ECA — örn. Baltık, Kuzey Denizi, Kuzey Amerika) sınır %0.10'dur. Uyum, düşük kükürtlü yakıt (VLSFO/MGO) kullanarak veya eşdeğer bir önlemle (egzoz gazı temizleme sistemi — 'scrubber') sağlanır. Yakıt değişimleri (fuel changeover) ve scrubber çalışması kayıt altına alınır; Bunker Delivery Note yakıt kükürt oranını belgeler.",
        formula: {
          text: "Küresel kükürt sınırı %0.50 · ECA içinde %0.10",
          description: "MARPOL Ek VI yakıt kükürt limitleri (kütlece); scrubber eşdeğer önlem sayılır",
        },
      },
      {
        title: "Azot Oksitleri (NOx) ve Tier Standartları",
        content:
          "Dizel motorların NOx emisyonu, motor devrine bağlı limitlerle 'Tier' kademeleriyle düzenlenir: Tier I (eski), Tier II (küresel, ~2011 sonrası inşa) ve Tier III (NOx ECA'larında çok daha katı). Tier III uyumu genellikle Seçici Katalitik İndirgeme (SCR), Egzoz Gazı Resirkülasyonu (EGR) veya LNG yakıt ile sağlanır. Motorun NOx uyumu Technical File ve EIAPP sertifikası ile belgelenir; ayar/parametre değişiklikleri bu dosyaya uygun olmalıdır.",
      },
      {
        title: "Diğer Emisyonlar: VOC, ODS ve Yakma",
        content:
          "Ek VI ayrıca uçucu organik bileşikleri (VOC — özellikle tankerlerde yük buharı), ozon tabakasına zararlı maddeleri (ODS — eski soğutucu gazlar, halonlar) ve gemide atık yakmayı (shipboard incineration) düzenler. Belirli ODS'lerin kullanımı/yeni kurulumu yasaktır; mevcut sistemlerin kayıtları tutulur. Incinerator yalnızca onaylı tip olmalı ve belirli atıklar (örn. Ek I/II/III artıkları, PCB, ağır metaller) yakılmamalıdır. Yakma kayıtları tutulur.",
      },
      {
        title: "Enerji Verimliliği: EEXI, SEEMP ve CII",
        content:
          "Sera gazı azaltımı için Ek VI tasarım ve operasyonel verimlilik araçları getirir. EEDI (yeni gemilerde tasarım verimliliği) ve EEXI (mevcut gemilerde teknik verimlilik endeksi) belirli eşikleri sağlamalıdır. Her gemide SEEMP (Ship Energy Efficiency Management Plan) bulunur. CII (Carbon Intensity Indicator) ise geminin yıllık taşıma işi başına karbon yoğunluğunu ölçer ve A–E arası derecelendirir; D (üç yıl üst üste) veya E alan gemiler düzeltici eylem planı hazırlamak zorundadır. Hız optimizasyonu, trim, hat temizliği ve atık ısı geri kazanımı verimliliği artırır.",
      },
    ],
    keyPoints: [
      "Küresel kükürt sınırı %0.50, ECA içinde %0.10; uyum düşük kükürtlü yakıt veya scrubber ile.",
      "NOx Tier I/II/III ile sınırlanır; Tier III için SCR/EGR/LNG kullanılır (EIAPP belgesi).",
      "VOC, ODS ve gemide yakma düzenlenir; bazı ODS'ler yasak, incinerator onaylı tip olmalı.",
      "EEXI/SEEMP/CII enerji verimliliğini ölçer; düşük CII derecesi düzeltici plan gerektirir.",
    ],
  },

  "Balast Suyu Yönetimi (BWM)": {
    title: "Balast Suyu Yönetimi (BWM)",
    introduction:
      "Gemiler stabilite ve trim için balast suyu alıp verir; ancak bu su, alındığı bölgedeki organizmaları (plankton, larva, patojen) başka bir ekosisteme taşıyarak istilacı tür sorununa yol açar. Ballast Water Management Convention (BWM), bu transferi yönetmek için standartlar getirir. Her geminin onaylı bir balast suyu yönetim planı ve kayıt defteri bulunur.",
    sections: [
      {
        title: "İstilacı Türler Sorunu",
        content:
          "Balast suyuyla taşınan yabancı organizmalar, yeni ortamda doğal düşmanları olmadığında hızla çoğalıp yerel türleri yerinden eder, ekolojik dengeyi ve ekonomik faaliyetleri (balıkçılık, su alma yapıları) zarara uğratır. Tarihte zebra midyesi ve çeşitli plankton/medusa örnekleri ciddi etkiler yaratmıştır. BWM Convention'ın amacı, balast suyu ve sedimanı yoluyla bu tür transferini en aza indirmektir.",
      },
      {
        title: "D-1 Değişim ve D-2 Arıtma Standardı",
        content:
          "İki temel standart vardır. D-1 (balast suyu değişimi): açık denizde, kıyıdan en az 200 deniz mili ve derinliği en az 200 metre olan bölgede balastın en az %95 hacimsel değişimi (mümkün değilse en az 50 nm / 200 m derinlik). D-2 (performans/arıtma standardı): balast suyu yönetim sistemiyle (BWMS) arıtılarak deşarj edilen sudaki canlı organizma sayısının belirli sınırların altına indirilmesi (örn. ≥50 µm organizmalar < 10 adet/m³, 10–50 µm organizmalar < 10 adet/mL ve gösterge mikroplar için limitler). Geçiş tamamlandıkça tüm gemiler D-2'yi sağlayan onaylı bir BWMS bulundurmak zorundadır.",
        formula: {
          text: "D-1: ≥%95 değişim (>200 nm, >200 m) · D-2: arıtma ile organizma limitleri",
          description: "BWM Convention balast suyu değişim (D-1) ve arıtma performans (D-2) standartları",
        },
      },
      {
        title: "Arıtma Sistemleri (BWMS)",
        content:
          "D-2 standardını sağlamak için balast suyu arıtma sistemleri kullanılır. Yaygın teknolojiler: filtrasyon + ultraviyole (UV) ile organizmaları öldürme/etkisizleştirme; filtrasyon + elektroklorinasyon/kimyasal dezenfeksiyon (aktif madde). Sistem, balast alımı ve/veya deşarjı sırasında devrede olur. Sedimanlar (tank dibinde biriken organizma içeren çamur) düzenli yönetilir ve uygun şekilde bertaraf edilir. BWMS'nin doğru çalışması ve kalibrasyonu, deşarjın yasal sınırlarda kalması için kritiktir.",
      },
      {
        title: "Plan, Kayıt ve Sertifika",
        content:
          "Her gemide onaylı Ballast Water Management Plan ve Ballast Water Record Book bulunur; her balast alımı, değişimi, arıtma ve deşarjı kaydedilir. Uyum International Ballast Water Management Certificate ile belgelenir. Bazı limanlar/kıyı devletleri ek örnekleme ve denetim uygular. Kayıtların gerçek operasyonla tutarlılığı ve sistemin çalışırlığı PSC denetimlerinde kontrol edilir.",
      },
    ],
    keyPoints: [
      "Balast suyu istilacı tür transferine yol açar; BWM Convention bunu yönetir.",
      "D-1 değişim: >200 nm, >200 m derinlikte ≥%95 hacimsel değişim.",
      "D-2 arıtma: onaylı BWMS ile deşarjdaki canlı organizma limitlerini sağlamak.",
      "Onaylı BWM Plan, Record Book ve BWM Certificate zorunludur; sediman yönetilir.",
    ],
  },

  "Biyo-kirlenme, Anti-fouling ve Gemi Geri Dönüşümü": {
    title: "Biyo-kirlenme, Anti-fouling ve Gemi Geri Dönüşümü",
    introduction:
      "Deniz çevresinin korunması, MARPOL ve balast suyunun ötesinde tekne dış yüzeyini, kullanılan boyaları ve geminin ömür sonu bertarafını da kapsar. Biyo-kirlenme (biofouling) yönetimi, anti-fouling sistemleri (AFS Convention) ve gemi geri dönüşümü (Hong Kong Convention) bu bütünün parçalarıdır.",
    sections: [
      {
        title: "Biyo-kirlenme (Biofouling) Yönetimi",
        content:
          "Tekne ve su altı yapılarında biriken organizmalar (biofilm, deniz kabukluları, yosun) hem istilacı tür transferine yol açar hem de sürtünmeyi artırarak yakıt tüketimini ve dolayısıyla emisyonu yükseltir. IMO biofouling kılavuzları; düzenli tekne kontrolü, hat (hull) temizliği, anti-fouling kaplama bakımı ve niş alanların (sea chest, pervane, dümen) yönetimini önerir. Temiz tekne hem çevreyi korur hem önemli yakıt tasarrufu sağlar.",
      },
      {
        title: "Anti-fouling Sistemleri ve AFS Convention",
        content:
          "Anti-fouling boyalar, tekneye organizma tutunmasını engeller. Geçmişte yaygın olan organotin bileşikleri (özellikle TBT — tribütiltin) deniz canlıları için son derece toksik olduğundan AFS Convention (Anti-fouling Systems) ile yasaklanmıştır. Günümüzde TBT içermeyen, kontrollü salınımlı veya foul-release (silikon esaslı) kaplamalar kullanılır. Uyum, International Anti-fouling System Certificate ile belgelenir; yasaklı maddeler bulunmamalı veya etkisiz bir kaplama ile örtülmelidir.",
      },
      {
        title: "Gemi Geri Dönüşümü (Hong Kong Convention)",
        content:
          "Gemiler ömür sonunda söküm tesislerinde geri dönüştürülür; bu süreçte asbest, PCB, ağır metaller, TBT ve petrol artıkları gibi tehlikeli maddeler hem işçi sağlığı hem çevre için risk oluşturur. Hong Kong Convention, gemilerin güvenli ve çevreye duyarlı geri dönüşümünü düzenler. Temel araç, gemide bulunan tehlikeli maddelerin envanteridir (Inventory of Hazardous Materials, IHM); bu envanter geminin yaşam döngüsü boyunca güncel tutulur ve söküm öncesi tesise verilir.",
      },
      {
        title: "Diğer Çevresel Konular",
        content:
          "Denizcilikte çevre yönetimi büyümeye devam etmektedir: su altı gürültüsü (deniz memelilerini etkiler ve pervane/gövde tasarımıyla azaltılabilir), karbon yoğunluğunun düşürülmesi (IMO sera gazı stratejisi ve alternatif yakıtlar — LNG, metanol, amonyak, hidrojen), enerji verimliliği önlemleri ve plastik/mikroplastik kirliliğinin azaltılması. Mürettebatın çevre bilinci, kayıt disiplini ve günlük iyi uygulamaları, tüm bu sözleşmelerin sahada işlemesini sağlar.",
      },
    ],
    keyPoints: [
      "Biofouling istilacı tür taşır ve sürtünme/yakıt tüketimini artırır; düzenli temizlik önemlidir.",
      "TBT gibi organotin anti-fouling boyalar AFS Convention ile yasaktır; IAFS sertifikası gerekir.",
      "Hong Kong Convention güvenli gemi geri dönüşümünü düzenler; IHM envanteri tutulur.",
      "Su altı gürültüsü, alternatif yakıtlar ve mikroplastik güncel çevre öncelikleridir.",
    ],
  },
};
