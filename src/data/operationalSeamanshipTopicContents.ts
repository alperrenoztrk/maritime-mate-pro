import type { TopicDetailContent } from "@/data/navigationTopicContents";

/** İleri gemicilik, manevra, demirleme, bağlama ve gemi yapısı içerikleri. */
// Ders görselleri — depoda hâlihazırda bulunan varlıklar.
import rudderPropellerImage from "@/assets/seamanship/rudder-propeller.jpg";
import anchorChainImage from "@/assets/seamanship/anchor-chain.jpg";
import mooringEquipmentImage from "@/assets/seamanship/mooring-equipment.jpg";

export const operationalSeamanshipTopicContents: Record<string, TopicDetailContent> = {
  "İleri Gemi Manevrası ve Pervane Etkileri": {
    title: "İleri Gemi Manevrası ve Pervane Etkileri",
    introduction:
      "Gemi manevrası ezberlenmiş dümen komutlarından ibaret değildir. Pervane dönüş yönü, transverse thrust, pivot point, rüzgâr alanı, akıntı, sığ su, yükleme durumu ve römorkör kuvvetleri birlikte değerlendirilir. Her gemi kendi manoeuvring booklet verileriyle kullanılmalıdır.",
    sections: [
      {
        title: "Tek Pervaneli Gemide Transverse Thrust",
        content:
          "Pervane kanatlarının alt ve üst kısımlarındaki farklı su akışı özellikle tornistanda kıçın yana atmasına neden olur. Sağ dönüşlü sabit hatveli pervanede tipik olarak tornistanda kıç iskeleye, baş sancağa eğilim gösterir; ancak gövde, dümen, CPP ve thruster düzeni sonucu değiştirebilir. Manevra planı gemiye özel deneme ve pilot card verisine dayanmalıdır.",
        image: rudderPropellerImage,
        imageAlt: "Ship's propeller and rudder, which govern her handling",
      },
      {
        title: "Pivot Point ve Kuvvet Kolu",
        content:
          "İleri hareketli gemide pivot point başa yaklaşır; tornistanda kıça kayar. Römorkör, thruster, demir veya rüzgâr kuvvetinin pivot point'e olan mesafesi dönme momentini belirler. Baş römorkörü ileri yolda büyük dönme kolu yaratırken, kıç römorkörü rotayı kontrol etmede etkili olabilir. Kuvvetin büyüklüğü kadar uygulama noktası önemlidir.",
      },
      {
        title: "Rüzgâr ve Akıntının Yanaşmaya Etkisi",
        content:
          "Rüzgâr geminin su üstü lateral alanına, akıntı su altı alanına etki eder. Ballast gemi rüzgâra, yüklü gemi akıntıya daha duyarlı olabilir. Rüzgâr gemiyi yalnız sürüklemez; üst yapı merkezinin pivot point'e göre yerine bağlı olarak döndürür. Yanaşma öncesi set/drift, gust, kıyı etkisi ve rıhtım yaklaşma açısı birlikte planlanır.",
      },
      {
        title: "Single-Screw Berthing ve Unberthing",
        content:
          "Yaklaşma düşük fakat dümen etkisini koruyan hızla yapılır. Spring line, römorkör veya demir kontrollü pivot oluşturabilir. Son yaklaşmada fazla hız, makine tornistan verilse bile atalet nedeniyle rıhtım temas enerjisini büyütür. Halat verilmeden önce personel ve snap-back alanları hazır olmalıdır. Departure planı rüzgâr/akıntı altında geminin rıhtımdan hangi ucunun önce ayrılacağını belirler.",
      },
      {
        title: "MOB Dönüşleri",
        content:
          "Williamson turn, özellikle görüş kaybı veya gece durumunda gemiyi iz hattına geri getirir; Anderson turn hızlı, kişi görünürken uygundur; Scharnow turn uzun gecikmeyle fark edilen olaylarda kullanılabilir. Seçim gemi tipi, hız, trafik ve kişinin görülüp görülmediğine bağlıdır. İlk eylemler alarm, mevki işaretleme, gözcü, can simidi, makine manevrası ve kurtarma hazırlığıdır.",
      },
    ],
    keyPoints: [
      "Pervane etkisi genel kuralla değil gemiye özel veriyle doğrulanır.",
      "Pivot point kuvvetlerin dönme etkisini belirler.",
      "Ballast/yüklü durum rüzgâr ve akıntı hassasiyetini değiştirir.",
      "MOB dönüşü senaryoya göre seçilir; ilk dakikadaki mevki ve gözcülük kritiktir.",
    ],
  },

  "Römorkör Kullanımı ve Yanaşma Planı": {
    title: "Römorkör Kullanımı ve Yanaşma Planı",
    introduction:
      "Römorkör desteği geminin manevra sınırlarını genişletir ancak yanlış kuvvet yönü, girting, towline snap-back ve gemi-römorkör etkileşimi yeni riskler yaratır. Tug plan, pilotaj planının ayrılmaz parçasıdır.",
    sections: [
      {
        title: "Tug Type ve Bollard Pull",
        content:
          "Conventional, ASD ve tractor tugların çekme noktası ve manevra karakteri farklıdır. Bollard pull statik maksimum çekme kuvvetidir; gerçek deniz ve hız koşullarında kullanılabilir kuvvet daha düşük olabilir. Gerekli tug sayısı rüzgâr alanı, draft, akıntı, rıhtım, thruster ve acil durdurma ihtiyacına göre belirlenir.",
      },
      {
        title: "Push, Pull, Braking ve Escort Mode",
        content:
          "Römorkör bordaya basarak push, hatla çekerek pull, kıçtan frenleyerek braking yapabilir. Escort tug yüksek hızda dolaylı hidrodinamik kuvvet üretebilir; bu operasyon özel eğitim ve uygun tug ister. Talimatlar kısa, yön ve kuvveti açık biçimde verilir; yüzde güç veya ton bollard pull gemi-pilot-römorkör terminolojisine göre teyit edilir.",
      },
      {
        title: "Towline ve Personel Emniyeti",
        content:
          "Heaving line, messenger ve towline alma sırası önceden brifing edilir. Towline yalnız onaylı fairlead/bitt üzerinden alınır; bight ve snap-back alanları boş tutulur. Halat yük altındayken personel düzeltme yapmaz. Tug line'ın hızlı bırakma düzeni ve iletişim kaybı prosedürü bilinmelidir.",
      },
      {
        title: "Girting ve Etkileşim Riski",
        content:
          "Conventional tug, towline yandan yüklenip gemi tarafından çekildiğinde girting ile alabora olabilir. Büyük geminin baş/kıç dalgası ve emiş alanı römorkörü kontrolsüz yaklaştırabilir. Gemi hızı tug bağlantısı öncesi uygun seviyeye indirilir; tug kaptanının güvenli yaklaşım sınırları dikkate alınır.",
      },
      {
        title: "Tug Failure ve Abort Planı",
        content:
          "Yanaşma planı bir römorkörün kaybı, thruster arızası, hat kopması ve ani gust için abort point içerir. Kritik noktadan sonra manevrayı durdurmak mümkün değilse ek emniyet marjı gerekir. Kaptan/pilot, hangi durumda demir atılacağı, makine kullanılacağı veya açık suya dönüleceğini önceden kararlaştırır.",
      },
    ],
    keyPoints: [
      "Bollard pull gerçek koşullardaki kullanılabilir kuvvetle aynı değildir.",
      "Towline alma ve bırakma ayrı personel risk değerlendirmesi ister.",
      "Girting ve gemi-römorkör etkileşimi ölümcül risklerdir.",
      "Her tug plan arıza ve abort senaryosu içermelidir.",
    ],
  },

  "İleri Demirleme ve Anchor Watch": {
    title: "İleri Demirleme ve Anchor Watch",
    introduction:
      "Demirleme yalnız su derinliğinin katı kadar zincir vermek değildir. Anchor position, hawse yüksekliği, gelgit, swinging circle, catenary, yakın gemiler, tutma zemini ve ağır hava kaçış planı birlikte değerlendirilir.",
    sections: [
      {
        title: "Let Go ve Walk Back Yöntemleri",
        content:
          "Let go yönteminde fren kontrollü bırakılarak demir serbest düşer; uygun derinlik ve zincir hız kontrolü gerekir. Walk back yönteminde windlass ile zincir kontrollü indirilir ve derin su/yoğun trafikte daha hassas yerleştirme sağlar. Çok derin suda demirin serbest düşmesi ekipmana şok yükü bindirebilir. Gemi SMS'i ve windlass limitleri esas alınır.",
        image: anchorChainImage,
        imageAlt: "Anchor cable secured on the forecastle",
      },
      {
        title: "Anchor Position ve Swinging Circle",
        content:
          "ECDIS/GPS anten mevkii ile baştaki demirin gerçek mevkii aynı değildir. Anchor drop position planlanırken anten-demir ofseti uygulanır. Swinging circle; salınan zincir, gemi boyu, su derinliği/gelgit ve emniyet payını kapsar. Komşu gemilerin kendi dönüş merkezleri ve farklı zincir boyları hesaba katılır.",
        formula: {
          text: "Yaklaşık swing radius = chain paid out + distance hawse-to-stern + emniyet payı",
          description: "Gerçek risk değerlendirmesi gelgit, catenary ve komşu gemi geometrisini de içerir.",
        },
      },
      {
        title: "Başüstü Standart Raporları",
        content:
          "Başüstü zincirin kilit sayısını, yönünü ve yükünü standart ifadelerle raporlar: up and down, leading ahead/astern/port/starboard, long stay, short stay, brought up, anchor aweigh ve clear/foul. Köprüüstü bu raporları geminin hareketi ve makine komutlarıyla birlikte değerlendirir. Belirsiz 'normal' ifadesi yerine yön ve gerilim açık söylenir.",
      },
      {
        title: "Anchor Watch ve Dragging Tespiti",
        content:
          "Anchor watch yalnız tek GPS alarmına dayanmaz. Anchor position merkezli alarm, radar range/bearing, transit, echo sounder ve geminin beklenen swing modeli birlikte izlenir. Dragging işareti; geminin swing arc dışına sürekli çıkması, zincirin devamlı long stay/titreşimli olması, COG'nin sabit sürüklenme göstermesi ve beklenmeyen derinlik değişimidir.",
      },
      {
        title: "Ağır Hava ve Acil Demirleme",
        content:
          "Hava kötüleşmeden makine stand-by, ek zincir, ikinci demir hazırlığı ve açık denize çıkış planı yapılır. İkinci demir plansız atılırsa zincirler foul olabilir. Acil demirleme, dümen/makine kaybında geminin başını ve süratini dikkate alarak uygulanır; yüksek hızda bırakılan demir zinciri veya windlassı kaybettirebilir.",
      },
      {
        title: "Foul Anchor ve Bitter End",
        content:
          "Demir kalkmıyor veya kablo/boru/başka zincirle takılıysa kuvvet artırmadan durum değerlendirilir; port authority ve şirket bilgilendirilir. Bitter end yalnız son çare ve kontrollü bırakma planıyla serbestlenir; zincir şamandıra ile işaretlenebilir. Personel chain locker içine enclosed-space prosedürü olmadan girmez.",
      },
    ],
    keyPoints: [
      "Demir pozisyonu GPS anten pozisyonundan ofsetlidir.",
      "Swinging circle zincir + gemi boyu + emniyet payıyla planlanır.",
      "Dragging en az iki bağımsız yöntemle doğrulanır.",
      "Ağır hava ve acil demirleme için kaçış planı önceden hazırlanır.",
    ],
  },

  "İleri Mooring ve Halat Yönetimi": {
    title: "İleri Mooring ve Halat Yönetimi",
    introduction:
      "Modern mooring yönetimi yalnız halat sayısını değil; Ship Design MBL, line condition, brake setting, geometrik yük paylaşımı, çevresel kuvvetler ve personelin dinamik snap-back riskini kapsar.",
    sections: [
      {
        title: "Ship Design MBL ve Line Selection",
        content:
          "Mooring donanımı ve halatların tasarım referansı Ship Design Minimum Breaking Load değeridir. Halat malzemesi, uzama, çap, bağlantı elemanları ve winch kapasitesi bu sistemle uyumlu olmalıdır. Aşırı güçlü yeni halatı zayıf bitt/fairlead sistemine takmak emniyet sağlamaz; yükü daha zayıf elemana taşır.",
        image: mooringEquipmentImage,
        imageAlt: "Mooring lines and deck fittings used to secure the ship",
      },
      {
        title: "Mooring Line Management Plan",
        content:
          "Her halatın kimliği, üretici sertifikası, kullanıma giriş tarihi, inspeksiyonları, hasarları, uç değiştirme/end-for-ending ve retirement kriterleri kayıt altına alınır. Lif parlaması, glazing, abrasion, cut, hockle, diameter değişimi ve kimyasal/ısı hasarı değerlendirilir. Şüpheli halat yalnız görünüşe bakılarak hizmette tutulmaz.",
      },
      {
        title: "Winch Brake Holding ve Rendering",
        content:
          "Fren, halat kopmadan önce kontrollü kayarak aşırı yükü sınırlayacak şekilde gemi prosedüründeki yüzdeye ayarlanır. Brake holding testleri belirli aralıklarla yapılır ve ayar işaretlenir. Operasyonda manual brake ve split drum düzeni doğru kullanılmalıdır; halatın yanlış katmanda veya yetersiz sarımla tutulması kapasiteyi düşürür.",
      },
      {
        title: "Mixed Mooring ve Yük Paylaşımı",
        content:
          "Aynı yönde farklı uzama karakterli halatlar kullanılırsa sert halat yükü önce alır, elastik halat katkı vermez. Halat açıları ve uzunlukları mümkün olduğunca benzer olmalıdır. Kısa breast line gelgitte büyük gerilim değişimi yaşayabilir; uzun springler daha kontrollü davranır. Auto-tension her limanda güvenli varsayılmaz.",
      },
      {
        title: "Dinamik Snap-back Değerlendirmesi",
        content:
          "Kopma sonrası halatın geri dönüş yolu yalnız güvertede boyalı sabit üçgen değildir; halat geometrisi, bight, fairlead, bağlantı ve kopma noktasına göre değişir. Tüm yük altındaki hatlar tehlikeli kabul edilir. Personel halatın uzantısında, bight içinde, fairlead yanında veya halatla borda arasında durmaz.",
      },
      {
        title: "Liman Süresince İzleme",
        content:
          "Gelgit, draft, yükleme/boşaltma, rüzgâr, passing ship ve swell halat yükünü değiştirir. Mooring watch belirli aralıklarla line condition, lead, winch brake, gangway ve gemi-rıhtım mesafesini kontrol eder. Tek halatı aşırı kasarak gemiyi düzeltmek yerine tüm düzen dengelenir; terminalle ek halat/römorkör ihtiyacı görüşülür.",
      },
    ],
    keyPoints: [
      "Halat, winch, bitt ve fairlead tek bir tasarım sistemi olarak değerlendirilir.",
      "Halat ömrü kayıtlı inspeksiyon ve retirement kriterleriyle yönetilir.",
      "Mixed mooring eşit yük paylaşımını bozar.",
      "Snap-back alanı dinamik olup tüm gergin hat çevresi risklidir.",
    ],
  },

  "Gemi Yapısı ve Tekne Mukavemeti": {
    title: "Gemi Yapısı ve Tekne Mukavemeti",
    introduction:
      "Bir zabitin stabilite ve yük planını doğru yorumlayabilmesi için geminin yükleri hangi yapısal elemanlarla taşıdığını bilmesi gerekir. Tekne; boyuna ve enine elemanların birlikte çalıştığı büyük bir kiriş olarak davranır.",
    sections: [
      {
        title: "Ana Yapısal Elemanlar",
        content:
          "Keel, shell plating, deck plating, frames, beams, girders, longitudinals, floors ve bulkheads tekne yüklerini taşır. Double bottom; tank, boru ve yapısal derinlik sağlar. Collision bulkhead baş hasarında su yayılımını sınırlar. Watertight bulkhead ve kapılar hasar kontrolünün pasif bariyeridir.",
        image: "/diagrams/seamanship/gemi-kisimlari.svg",
        imageAlt: "Principal structural parts of a ship",
      },
      {
        title: "Boyuna Mukavemet: Hogging ve Sagging",
        content:
          "Gemi dalga tepesi ortasındayken orta bölge yukarı desteklenip baş-kıç aşağı yüklenirse hogging; dalga çukuru ortasındayken sagging eğilimi oluşur. Yük ve buoyancy dağılımı shear force ve bending moment üretir. Loading computer limitleri yalnız final durumda değil her yükleme/boşaltma adımında kontrol edilmelidir.",
      },
      {
        title: "Yerel Yükler ve Point Load",
        content:
          "Tank top, hatch cover, deck ve rampanın alan başına yük limitleri vardır. Heavy lift, steel coil, forklift ve container stack yükleri küçük alanda yoğunlaşabilir. Toplam tonaj uygun olsa bile point load aşımı plating, stiffener veya girder deformasyonu yaratabilir. Dunnage yükü uygun taşıyıcı elemanlara dağıtır.",
      },
      {
        title: "Panting, Pounding ve Slamming",
        content:
          "Baş bölgede dalga basıncının periyodik değişimi panting, baş dibinin dalgaya vurması pounding/slamming yükleri yaratır. Ağır havada hız ve rota değişikliği yapısal yükü azaltır. Bow flare slamming ve green water, hatch/coaming ve forecastle ekipmanında hasar oluşturabilir.",
      },
      {
        title: "Korozyon, Çatlak ve Buckling İşaretleri",
        content:
          "Coating breakdown, pitting, grooving, wasted bracket, çatlak boya hattı, kapı/kapak hizasızlığı ve yeni buckling yapısal soruna işaret edebilir. Çatlak üzerine yalnız boya sürmek onarım değildir. Alan fotoğraflanır, ölçülür, geçici güvenlik sağlanır ve kaptan/şirket/klas bilgilendirilir.",
      },
      {
        title: "Survey ve Dry-Dock Hazırlığı",
        content:
          "Klas surveylerinde tank/ambar erişimi, thickness measurement, close-up survey, hatch cover testleri, rudder/propeller/sea valve ve anchor chain kontrolleri yapılabilir. Dry-dock öncesi tank planı, stabilite, docking plan, plug list ve iş kapsamı hazırlanır. Yetkisiz yapısal sıcak iş klas onayı olmadan yapılmaz.",
      },
    ],
    keyPoints: [
      "Tekne boyuna büyük bir kiriş gibi çalışır.",
      "Loading computer limitleri ara operasyon adımlarında da kontrol edilir.",
      "Point load toplam ağırlıktan bağımsız yerel hasar yaratabilir.",
      "Çatlak, buckling ve hizasızlık yapısal inceleme gerektirir.",
    ],
  },
};
