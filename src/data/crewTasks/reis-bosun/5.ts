import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bosun's store ve malzeme yönetimi",
  roleSlug: "reis-bosun",
  taskIndex: 5,
  estimatedPages: 25,
  intro: `Bosun's store (reis ambarı), güverte ekibinin tüm sarf ve teçhizat malzemesinin saklandığı, geminin "saha lojistik merkezi"dir. Reis bu deponun envanterinden, düzeninden, güvenli istifinden ve ikmal planlamasından bizzat sorumludur. Bu bölüm; halat ve tel stok yönetimi, boya ve kimyasal istifleme, shackle/turnbuckle gibi takım envanteri, ihtiyaç (requisition) listesi hazırlama, israfın önlenmesi, IMSBC/IMDG açısından tehlikeli madde saklama disiplini ve denetime hazır bir store tutmanın pratik yöntemlerini ele alır.`,
  sources: [
    "ISM Code (ISM) — Element 10: Maintenance of the ship and equipment",
    "MSC.1/Circ.1216 — Revised guidelines for the maintenance of personal life-saving appliances",
    "OCIMF — Mooring Equipment Guidelines (MEG4) — halat/tel envanter yönetimi",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP), MCA",
    "IMDG Code — paket halinde tehlikeli madde saklama esasları",
    "TMSA Element 4 & 6 — Stores, bunkering, maintenance",
    "ISO 8501-1 — Surface Preparation Standards (boya stok yönetimi referansı)",
  ],
  chapters: [
    {
      heading: "1. Bosun's Store'un İşlevi ve Düzen Felsefesi",
      lead: `Düzenli bir store, güvenli ve verimli bir güverte ekibinin görünmeyen temelidir.`,
      sections: [
        {
          subheading: "1.1 Store neden kritik bir varlıktır",
          paragraphs: [
            `Bosun's store, geminin baş tarafında (genelde forecastle altı) yer alan ve halat, tel, boya, kimyasal, el aleti, bağlama teçhizatı ile küçük yedek parçaların depolandığı kapalı bir mahaldir. Reis için bu depo, günlük işin akışını belirleyen lojistik kalbidir: doğru malzeme doğru anda elde değilse, planlı bakım durur ve iş emirleri sarkar.`,
            `Store'un bir diğer kritik boyutu emniyettir. Boya ve solventler yanıcı, bazı kimyasallar zararlı buhar üretir, ağır teçhizat (demir shackle, çelik tel makarası) deniz hareketinde kayıp yaralanmaya yol açabilir. Bu yüzden store yalnızca bir "depo" değil, aynı zamanda kontrollü bir tehlike alanıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Bir bakışta envanter",
              text: `İyi bir reis store'a girdiğinde rafa bakar ve neyin eksildiğini görür. Bunun için her malzemenin sabit bir yeri olur; "her şey yerinde, her yerin malzemesi belli" prensibi denetimde de zaman kazandırır.`,
            },
          ],
        },
        {
          subheading: "1.2 5S ve denizci düzeni",
          paragraphs: [
            `Endüstriyel 5S yaklaşımı (Seiri-ayıkla, Seiton-düzenle, Seiso-temizle, Seiketsu-standartlaştır, Shitsuke-sürdür) gemi store'una doğrudan uygulanır. Reis kullanılmayan/ekspire malzemeyi ayıklar, kalanını etiketli raflara yerleştirir, zemini ve havalandırmayı temiz tutar, etiketleme standardı koyar ve bunu vardiya değişimlerinde sürdürür.`,
            `Deniz hareketine karşı her ağır kalem lashing veya raf bariyeri ile sabitlenir. Yuvarlanabilen tel makaraları takozlanır, boya kutuları devrilmeye karşı kasalanır. Store içinde gevşek duran hiçbir ağır cisim bırakılmaz; bu hem yaralanma hem hasar riskidir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Halat Stok Yönetimi",
      sections: [
        {
          subheading: "2.1 Halat tipleri, MBL ve envanter kaydı",
          paragraphs: [
            `Modern gemilerde mooring rope olarak HMPE (Dyneema), polyester, polyamid (naylon) ve karışık (mixed) halatlar bulunur. Her halatın bir Line Design Break Force (LDBF) ve sertifikası vardır; OCIMF MEG4 kapsamında halatlar tip, çap, uzunluk, üretim tarihi ve MBL bilgisiyle envantere kaydedilir. Reis, kullanımdaki halatlar ile store'daki yedek halatları ayrı izler.`,
            `Yeni halat tesliminde sertifika (test certificate) kontrol edilir ve dosyalanır. Halat makaraları store'da güneş ışığından, ısı kaynağından ve kimyasal teması olmayan kuru bir alanda tutulur; UV ve solvent teması sentetik halatın mukavemetini hızla düşürür.`,
          ],
          table: {
            caption: `Tipik Güverte Halat Envanteri ve İzlenen Parametreler`,
            headers: ["Halat Tipi", "Tipik Çap", "Kullanım", "İzlenen Parametre"],
            rows: [
              ["HMPE (Dyneema)", "44-48 mm", "Ana mooring", "MBL, çekirdek hasarı, glazing"],
              ["Polyester", "64-72 mm", "Mooring/tail", "Çap, dış lif aşınması"],
              ["Polyamid (naylon)", "60-80 mm", "Tail/yedek", "Elastik yorulma, UV"],
              ["Manila/sisal", "16-24 mm", "Genel iş halatı", "Çürüme, nem"],
            ],
          },
        },
        {
          subheading: "2.2 Halat ömrü, retirement ve döngü",
          paragraphs: [
            `Reis, store'daki yedek halatları "first in, first out" (FIFO) mantığıyla döndürür; yıllarca rafta bekleyen sentetik halat kullanılmadan da yaşlanır. Yedeklerin üretim tarihi etikette görünür tutulur. Bir mooring halatı retirement kriterine ulaştığında (dış lif hasarı şirket eşiğini aşınca, çekirdek hasarı görülünce) store'dan yenisi çıkarılır ve eski halat tag'lenip iş halatına ayrılır veya imha listesine konur.`,
            `Halat kesip iş halatı (heaving line, gantline, lashing) üretmek de store yönetiminin parçasıdır. Reis artık parçaları israf etmez; uçları yakıp/whipping yaparak fonksiyonel kısa halatlara dönüştürür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "OCIMF MEG4 — Line Management Plan",
              text: `MEG4, her gemi için bir Mooring System Management Plan ve Line Management Plan öngörür. Halatların MBL'si, kullanım geçmişi ve retirement kriterleri bu planda kayıtlıdır; store envanteri bu planla tutarlı olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Tel Halat, Bağlama Teçhizatı ve El Aletleri",
      sections: [
        {
          subheading: "3.1 Wire rope ve greasing malzemesi",
          paragraphs: [
            `Cargo wire, mooring wire ve crane wire için store'da yedek tel makaraları, OEM tel yağı (lubricant), tel kelepçesi (wire clip), thimble ve socket bulunur. Reis tel makaralarını nemden korur; paslı tel mukavemetini ve esnekliğini kaybeder. Yedek tel sertifikaları halat sertifikalarıyla aynı dosyada saklanır.`,
            `Tel greasing için kullanılan yağ ve tiner gibi sarflar tehlikeli madde sınıfındadır; bunlar boya/solvent bölümünde, havalandırılan ve etiketli alanda tutulur.`,
          ],
        },
        {
          subheading: "3.2 Shackle, turnbuckle ve lashing teçhizatı",
          paragraphs: [
            `Shackle (kilit), turnbuckle (liftin), pad eye, chain, lashing bar, twist lock, bottle screw ve hook gibi yük emniyet teçhizatı SWL (Safe Working Load) damgalıdır. Reis bu kalemleri SWL ve boyuta göre ayrı kutularda tutar; karışık bir shackle kutusu, manevra sırasında yanlış SWL'li parça seçimine ve kazaya yol açar.`,
            `Her bağlama teçhizatı periyodik görsel kontrolden geçer: deformasyon, çatlak, aşırı korozyon, dişlerde ezilme. Hasarlı parça derhal envanterden çıkarılır ve "kullanım dışı" kutusuna konur; tekrar dolaşıma girmesi engellenir.`,
          ],
          table: {
            caption: `Bağlama Teçhizatı Kontrol ve Kabul Kriterleri`,
            headers: ["Teçhizat", "İzlenen Kusur", "Kabul Edilemez Durum"],
            rows: [
              ["Shackle", "Pin aşınması, deformasyon", "SWL damgası okunmuyor / çap %10 incelmiş"],
              ["Turnbuckle", "Diş hasarı, çatlak", "Dişler ezilmiş, gövdede çatlak"],
              ["Lashing bar", "Eğilme, korozyon", "Kalıcı bükülme, kesit kaybı"],
              ["Hook", "Latch arızası, açılma", "Safety latch çalışmıyor, ağız açılmış"],
            ],
          },
        },
        {
          subheading: "3.3 El aletleri ve elektrikli/havalı ekipman",
          paragraphs: [
            `Chipping hammer, needle scaler, angle grinder, disc sander, el raspası, tel fırça, boya fırçası, rulo ve airless spray tabancası store envanterindedir. Reis bu aletlerin sayısını, durumunu ve yedek sarfını (grinding disk, scaler iğnesi, fırça) izler. Elektrikli aletler periyodik elektriksel güvenlik kontrolünden (megger/insulation test) geçer; havalı aletlerin hortum ve bağlantıları kontrol edilir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Boya, Kimyasal ve Tehlikeli Madde Saklama",
      sections: [
        {
          subheading: "4.1 Paint locker disiplini",
          paragraphs: [
            `Boya, tiner, solvent ve epoxy sertleştiricileri yanıcı/parlayıcıdır ve genelde ayrı, havalandırmalı ve yangın söndürme tertibatlı bir paint locker'da tutulur. Reis bu mahalde sigara/açık alev yasağını, havalandırmanın çalışmasını ve dökülme (spillage) önlemlerini denetler. Açılmış boya kutuları sıkıca kapatılır; pot-life dolmuş karışım israf değil, güvenlik riski olarak imha edilir.`,
            `Boya stoğu batch number, üretim/son kullanım tarihi ve sistem (primer/intermediate/topcoat) bazında kayıtlanır. Bir boyama programı planlanırken Reis, mevcut DFT hedefine yetecek litre hesabını store stoğundan yapar; eksikse zamanında requisition açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Solvent buharı ve statik elektrik",
              text: `Paint locker'da biriken solvent buharı patlayıcı atmosfer oluşturabilir. Havalandırma çalışmadan içeride uzun süre kalınmaz; metal kovalardan dökme yapılırken statik boşalmaya karşı bonding/topraklamaya dikkat edilir.`,
            },
          ],
        },
        {
          subheading: "4.2 MSDS, etiketleme ve uyumsuz madde ayrımı",
          paragraphs: [
            `Her kimyasalın Güvenlik Bilgi Formu (MSDS/SDS) gemide erişilebilir olmalıdır. Reis, store'daki kimyasalların etiketlerinin okunur ve hasarsız olmasını sağlar; etiketsiz kap kabul edilmez. Asit ve baz, oksitleyici ve yanıcı gibi uyumsuz maddeler birbirinden ayrı tutulur.`,
            `Paket halinde tehlikeli madde (IMDG kapsamı) ile güverte sarf kimyasalı arasındaki fark önemlidir; ancak saklama mantığı aynıdır: ayrım, etiket, havalandırma ve döküntü kontrolü. Atık kimyasal ve boş boya kutuları MARPOL Annex V uyarınca ayrı toplanır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Envanter Takibi ve Stok Kontrolü",
      sections: [
        {
          subheading: "5.1 Stok kartı, min-max ve sayım periyodu",
          paragraphs: [
            `Reis her ana kalem için bir asgari stok (min) ve azami stok (max) eşiği belirler. Stok min eşiğine yaklaştığında requisition tetiklenir; max ise gereksiz aşırı stoğu ve store tıkanmasını önler. Sayım (stock-take) genelde ay sonu ve sefer başı/sonu yapılır; sonuçlar Birinci Zabit'e raporlanır.`,
            `Pek çok gemide envanter, gemi yönetim yazılımı (PMS/inventory modülü) üzerinden tutulur. Reis fiziksel sayımı dijital kayıtla mutabık tutar; kayıt ile raf arasındaki fark "kaçak tüketim", hırsızlık veya kayıt hatasına işaret eder ve araştırılır.`,
          ],
        },
        {
          subheading: "5.2 İsraf ve aşırı tüketimin önlenmesi",
          paragraphs: [
            `Malzeme israfı, hem maliyet hem de denetim açısından sorundur. En sık israf kaynakları: yanlış karıştırılıp atılan boya, açıkta kuruyan epoxy, gereksiz büyük halat kesimi, kaybolan el aleti ve disiplinsiz sarf çekimidir. Reis, malzeme dağıtımını kayıt altına alır; "kim ne kadar aldı" bilinir.`,
            `İsrafın önlenmesi cimrilik değil, doğru kullanım disiplinidir. Yetersiz boya stoğu yüzünden yarım kalan bir boyama, yapılan tüm yüzey hazırlığını boşa çıkarır; bu da en pahalı israftır. Denge, planlı tüketim ve zamanında ikmaldir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — kuruyan epoxy",
              text: `Bir gemide tayfa, 20 litrelik epoxy primeri tek seferde karıştırır ama yalnızca 6 litresini kullanabilir; geri kalanı pot-life dolunca katılaşır. Reisin kuralı: işin alanını ölç, pot-life'a göre kademeli karıştır. Bu basit disiplin tek seferde yüzlerce dolarlık israfı önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Requisition: İhtiyaç Listesi Hazırlama",
      sections: [
        {
          subheading: "6.1 İhtiyacın tespiti ve listenin yapısı",
          paragraphs: [
            `Reis, bakım programını ve stok durumunu birlikte değerlendirerek bir sonraki ikmal limanı için ihtiyaç listesi (requisition) hazırlar. İyi bir requisition; kalem adı, teknik tarif (marka/spesifikasyon/IMPA kodu), miktar, birim ve aciliyet içerir. Belirsiz "biraz boya" değil, "X marka epoxy primer, gri, 20 L, 4 adet" yazılır.`,
            `IMPA (International Marine Purchasing Association) kataloğu, gemi tedarikinde ortak dildir. IMPA kodu kullanmak, tedarikçinin yanlış parça göndermesini önler. Reis sık kalemler için bu kodları bilir veya kataloğa erişir.`,
          ],
        },
        {
          subheading: "6.2 Birinci Zabit ile koordinasyon ve onay zinciri",
          paragraphs: [
            `Reisin hazırladığı liste Birinci Zabit tarafından gözden geçirilir, bütçe ve önceliklerle birleştirilir ve şirket satınalma departmanına gönderilir. Reis, sürekli ihtiyaç (boya, sarf) ile bir defalık ihtiyacı (kırılan/bitmiş özel teçhizat) ayırır; böylece onay zinciri tıkanmaz.`,
            `İkmal limanına yaklaşırken Reis, tedarik penceresinin (delivery window) kısıtlı olduğunu bilir; geç verilen requisition bir sonraki limana kalır. Bu yüzden ihtiyaç tespiti reaktif değil, planlı ve önden yapılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Aciliyet etiketi",
              text: `Her kalemi "kritik / normal / stok tamamlama" olarak işaretle. Satınalma sınırlı bütçeyle önceliklendirir; kritik bir emniyet teçhizatı, kozmetik bir sarfla aynı kefeye konursa yanlış kararlar çıkar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. İkmal Teslim Alımı ve Stoklama",
      sections: [
        {
          subheading: "7.1 Teslimat kontrolü ve mutabakat",
          paragraphs: [
            `Malzeme gemiye geldiğinde Reis, teslimat irsaliyesini (delivery note) sipariş listesiyle karşılaştırır: kalem, miktar, spesifikasyon ve hasar kontrolü yapılır. Eksik, yanlış veya hasarlı kalem irsaliye üzerine "remark" olarak yazılır ve Birinci Zabit'e bildirilir; sessizce kabul edilen eksik, daha sonra geminin sorunu olur.`,
            `Teslim alınan kalemler vakit kaybetmeden store'daki yerlerine, FIFO mantığıyla (yeni gelen arkaya, eski öne) yerleştirilir. Sertifikalı kalemler (halat, tel, LSA teçhizatı) sertifikalarıyla birlikte kayıtlanır.`,
          ],
        },
        {
          subheading: "7.2 Ağır kaldırma ve store'a indirme güvenliği",
          paragraphs: [
            `Tel makarası, boya fıçısı, demir teçhizat gibi ağır kalemlerin store'a indirilmesi çoğu zaman vinç veya provizyon vinciyle yapılır. Reis bu operasyonda kaldırma teçhizatının SWL'sini, askı noktalarını ve personelin yük altında durmamasını denetler. Manuel taşımada doğru kaldırma tekniği (bel değil bacak) ve uygun PPE şarttır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yük altında durma",
              text: `Provizyon/store vinciyle indirilen ağır kalem askıdayken kimse yükün altında veya salınım yörüngesinde durmaz. Kopan bir tel makarası veya boya paleti ölümcüldür; bölge işaretlenir ve serbest tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Denetime Hazırlık ve Kayıt Disiplini",
      sections: [
        {
          subheading: "8.1 Port State Control, vetting ve klas gözünden store",
          paragraphs: [
            `Bir PSC, SIRE/CDI vetting veya klas denetçisi store'a girdiğinde birkaç şeye bakar: düzen, etiketleme, tehlikeli madde ayrımı, LSA/yedek teçhizat varlığı ve sertifika izlenebilirliği. Dağınık, etiketsiz veya uyumsuz madde karışık bir store, hemen "housekeeping" bulgusu yaratır ve geminin genel bakım kültürü hakkında olumsuz izlenim verir.`,
            `Reis, denetimden önce değil, sürekli denetime hazır bir store tutar. "Sürekli hazır" felsefesi, son dakika telaşını ve riskini ortadan kaldırır.`,
          ],
        },
        {
          subheading: "8.2 Kayıt, etiket ve izlenebilirlik",
          paragraphs: [
            `Sertifikalı teçhizat (halat, tel, kaldırma teçhizatı, LSA) için "neyin nerede, hangi sertifikayla" sorusunun anında cevabı olmalıdır. Reis, fiziksel etiket ile dijital kaydı eşler. İzlenebilirlik, bir kaza sonrası soruşturmada da geminin "gerekli özeni gösterdiği" (due diligence) kanıtıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code Element 10",
              text: `ISM Code, geminin ve teçhizatın bakımını ve bunun kayıtlı bir sistemle yürütülmesini şart koşar. Store envanteri ve malzeme yönetimi, bu bakım sisteminin lojistik ayağıdır ve denetimde belgelenebilir olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Reis için store yönetim kontrol listesi",
          paragraphs: [
            `Aşağıdaki liste, düzenli ve denetime hazır bir bosun's store için günlük/haftalık/sefer bazlı asgari kontrolleri özetler. Reis bu maddeleri rutin haline getirdiğinde store, ekibin işini hızlandıran bir varlığa dönüşür.`,
          ],
          bullets: [
            "Her ana kalemin sabit yeri ve okunur etiketi var mı?",
            "Halat ve tel sertifikaları güncel ve dosyalı mı, FIFO uygulanıyor mu?",
            "Boya/solvent ayrı, havalandırmalı locker'da; MSDS erişilebilir mi?",
            "Shackle/turnbuckle SWL'ye göre ayrılmış; hasarlı parça izole edilmiş mi?",
            "El/elektrikli aletler tam, sarf yedeği yeterli, güvenlik testleri yapılmış mı?",
            "Min-max stok eşikleri belirli; min'e gelen kalemler requisition'a girdi mi?",
            "Ay sonu/sefer sayımı yapıldı, dijital kayıtla mutabakat sağlandı mı?",
            "Ağır kalemler deniz hareketine karşı lashing'li mi?",
            "Teslimatlar irsaliye ile mutabık, eksik/hasar remark'landı mı?",
            "Store her an PSC/vetting denetimine hazır görünümde mi?",
          ],
        },
        {
          subheading: "9.2 Sonuç",
          paragraphs: [
            `Bosun's store yönetimi, dışarıdan basit bir "depo işi" gibi görünse de aslında geminin bakım kabiliyetini doğrudan belirleyen bir disiplindir. Doğru malzemenin doğru anda, güvenli ve izlenebilir biçimde hazır olması; planlı bakımın kesintisiz yürümesini, ekibin güvenliğini ve denetimlerden sorunsuz geçişi sağlar.`,
            `Reis, store'u bir maliyet kalemi değil, yönetilen bir varlık olarak görür. İyi tutulan bir store, israfı düşürür, ikmali öngörülebilir kılar ve geminin profesyonel bakım kültürünün en görünür kanıtlarından biri olur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
