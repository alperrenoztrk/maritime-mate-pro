import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Gemicilik — "Dersler Beta" okunabilir konu anlatımı.
 *
 * İçerik klasik gemicilik bilgisine ve ilgili standartlara dayanır (SOLAS,
 * STCW, COLREG, Load Line, ISGOTT/OCIMF mooring kılavuzları). `TopicSection.title`
 * değerleri lessonFlow/seamanship.ts içindeki `sectionRef`/`sectionTitles` ile eşleşir.
 */
export const seamanshipTopicContents: Record<string, TopicDetailContent> = {
  "Halatlar, Knot ve Bağlama Teknikleri": {
    title: "Halatlar, Knot ve Bağlama Teknikleri",
    introduction:
      "Halat işçiliği (marlinspike seamanship), gemiciliğin temelidir. Doğru halat seçimi, doğru düğüm (knot) ve dikiş (splice), hem operasyonel verimi hem can güvenliğini belirler. Halatın malzemesi, dayanımı ve bakımı; bağlama, yedekleme ve yük operasyonlarında kritik rol oynar.",
    sections: [
      {
        title: "Halat Türleri ve Özellikleri",
        content:
          "Halatlar üç ana gruba ayrılır: **doğal lif** (manila, sisal, hindistan cevizi — bugün büyük ölçüde terk edilmiştir), **sentetik lif** (polyamid/naylon, polyester, polipropilen ve yüksek modüllü HMPE/Dyneema, aramid) ve **çelik tel halat** (wire rope). Bir halatın davranışını üç temel özellik belirler: kopma yükü (**MBL — Minimum Breaking Load**), uzama/esneklik (**elastisite**) ve çevresel dayanım (UV, aşınma, kimyasal). Bu özellikler malzemeye göre çok değişir ve halat, görevin gereğine göre seçilir.\n\n**Sentetik lif türleri:** **Naylon (polyamid)** en yüksek mukavemet ve en yüksek uzamaya (~%15–25) sahiptir; bu esneklik şok yükünü emmesini sağlar ve onu bağlama/yedeklemede değerli kılar — ancak aynı esneklik, koptuğunda depoladığı enerjiyi bir sapan gibi boşaltarak ölümcül **snap-back** yaratır. **Polyester (terylene)** daha az uzar (~%10), ıslakken mukavemetini korur ve UV'ye dayanıklıdır; sabit gergi gereken yerlerde tercih edilir. **Polipropilen** hafiftir, suda yüzer ve ucuzdur ama düşük mukavemetli ve UV'ye çok duyarlıdır. **HMPE (Dyneema/Spectra)** çelik kadar güçlü, çok hafif ve çok az uzayan bir liftir; modern yüksek performanslı bağlama halatlarında kullanılır fakat pahalıdır ve sürtünme ısısına duyarlıdır.\n\n**Kopma yükü ve güvenli çalışma yükü:** Her halatın bir **MBL**'si ve buna güvenlik katsayısı uygulanarak bulunan **güvenli çalışma yükü (SWL/WLL)** vardır. Örneğin MBL'si 60 ton olan bir halat, güvenlik katsayısı 5 ile SWL = 60 ÷ 5 = **12 ton** taşır. OCIMF bağlama kılavuzları, çalışma geriliminin halat MBL'sinin **%50–55'ini** aşmamasını önerir. Halat yaşlandıkça ve aşındıkça gerçek MBL düşer; bu yüzden etikette yazan değil, halatın fiili durumu esastır.\n\n**Snap-back enerjisi:** Gergin bir halatta depolanan elastik enerji, yaklaşık kuvvet × uzama ÷ 2 ile orantılıdır. Naylon çok uzadığı için aynı yükte polyestere göre çok daha fazla enerji depolar ve koptuğunda çok daha tehlikeli geri teper. **Gemide önemi:** Yanlış halat seçimi (sabit gergi gereken yerde naylon, ya da şok yükü olan yerde hiç uzamayan HMPE) hem operasyonu bozar hem can güvenliğini tehdit eder; bu nedenle her serviste tek tip, uygun malzeme halat kullanılır ve farklı esneklikteki halatlar aynı hatta karıştırılmaz.",
        formula: {
          text: "SWL = MBL ÷ Güvenlik Katsayısı (örn. 60 t ÷ 5 = 12 t)",
          description: "Halatın güvenli çalışma yükü; bağlamada çalışma gerilimi tipik olarak MBL'nin %50–55'ini aşmamalıdır",
        },
      },
      {
        title: "Temel Düğümler (Knots)",
        content:
          "Halat işçiliğinde üç kavram ayrılır: **düğüm (knot)** halatın kendi üzerine bağlanması, **bağ (bend)** iki halatın birbirine bağlanması, **volta (hitch)** halatın bir cisme (baba, halka, direk) bağlanmasıdır. Ortak ve kritik gerçek şudur: **her düğüm halatı zayıflatır.** Düğümdeki keskin dönüş ve sıkışma lifleri eşitsiz yükler ve halatın kopma mukavemetini tipik olarak %40–60'a düşürür; bu yüzden yük taşıyan kalıcı bağlantılarda düğüm yerine dikiş (splice) tercih edilir.\n\n**İzbarço (bowline):** Halatın ucunda sabit, yük altında sıkışmayan bir göz oluşturur ve yük kalksa bile kolay çözülür; bu yüzden 'düğümlerin kralı' denir. Can kurtarma, halat ucuna göz açma ve geçici bağlamada yaygındır. Zayıf yönü, döngüsel (bir gerilip bir gevşeyen) yük altında kendiliğinden gevşeyebilmesidir; kritik veya uzun süreli kullanımda ucu emniyete alınır (stopper) ya da çift izbarço kullanılır.\n\n**Diğer temel düğümler:** **Camadan bağı (reef knot)** iki eşit halatı geçici birleştirir ve yüke gelince sıkışıp gevşetildiğinde çözülür; farklı kalınlıkta veya yük taşıyan halatlarda güvenilmez (kayar). **Sekiz bağı (figure-eight)** halat ucunun bloktan/halkadan kaçmasını önleyen bir 'stopper'dır; sıkışmaz ve kolay çözülür. **Kazık bağı (clove hitch)** bir direğe hızlı bağlama sağlar ama yön değişince kayabilir. **Volta ve iki yarım bağ (round turn and two half hitches)** bir babaya/halkaya sağlam ve çözülebilir bağlantı verir. **Kösele/gergi bağı (rolling hitch)** gergin bir halata dik yönde tutunmak için (örn. yükü başka bir halata aktarmak) kullanılır.\n\n**Düğüm verimi (worked example):** MBL'si 20 ton olan bir halat düşünelim. İzbarço verimi ~%60 ise düğümlü halatın gerçek kopma yükü 20 × 0.60 = **12 ton**'a düşer; aynı halata eye splice (verim ~%90) yapılırsa 20 × 0.90 = **18 ton** korunur. **Gemide önemi:** Doğru düğümü bilmek kadar, o düğümün mukavemeti ne kadar düşürdüğünü ve nerede güvenilir olduğunu bilmek de kritiktir; kritik yük hatlarında düğüm değil dikiş kullanılır, geçici bağlarda uygun düğüm seçilip ucu emniyete alınır.",
        formula: {
          text: "Düğümlü mukavemet ≈ MBL × düğüm verimi (izbarço ~%60, dikiş ~%90)",
          description: "Her düğüm halatı zayıflatır; kalıcı yük hatlarında düğüm yerine dikiş (splice) tercih edilir",
        },
      },
      {
        title: "Dikişler (Splices) ve Sonlandırma",
        content:
          "Dikiş (**splice**), halatın kollarını (strand) çözüp birbirinin içinden geçirerek örmek suretiyle kalıcı bir bağlantı oluşturmaktır. Düğümün aksine dikiş, yükü lifler arasında yumuşak ve dağıtılmış biçimde aktarır; keskin bir dönüş/sıkışma olmadığından halat mukavemetinin çok büyük bölümünü (**~%85–95**) korur. Bu yüzden kalıcı gözler ve birleştirmeler dikişle yapılır.\n\n**Dikiş türleri:** **Eye splice (göz dikişi)** halatın ucunda kalıcı bir göz oluşturur; bir babaya, halkaya veya bağlama gözüne geçirilecek göz bu şekilde yapılır. **Short splice (kısa dikiş)** iki halatı birleştirir ve mukavemeti yüksek tutar, ancak birleşme noktasında halat kalınlaşır (bloktan geçmesi gereken halatta sorun olur). **Long splice (uzun dikiş)** kalınlaşmayı önler ve blok/makaradan geçen halatlarda tercih edilir, ama daha uzun ve zahmetlidir. **Back splice** halat ucunu çözülmeye karşı örer fakat ucu kalınlaştırır.\n\n**Göz tipleri ve yapı:** Göz doğrudan babaya geçecekse 'soft eye' (yumuşak göz), aşınmaya maruz bir yere oturacaksa metal bir **radansa (thimble)** ile 'hard eye' yapılır; radansa halatı keskin bükülme ve aşınmadan korur. Dikiş, halat yapısına göre değişir: üç kollu (3-strand) halatta klasik 'tuck' yöntemi, örme (braided) halatta ise özel içten geçirme teknikleri kullanılır. Dikişte yeterli sayıda 'tuck' (genelde en az 3–5) yapılmazsa dikiş kayar ve göz açılır.\n\n**Sonlandırma:** Halat ucunun çözülmesini önlemek için **piyan/whipping** (ince ip ile sıkı sarım), bant veya sentetik halatlarda **uç eritme** kullanılır. Eritme tek başına yeterli değildir; ısı liflerin mukavemetini bozabilir ve sert/keskin bir uç oluşturur, bu yüzden whipping ile birlikte uygulanır. **Gemide önemi:** Bağlama gözleri, yedek halatı gözleri ve kaldırma sapanları gibi can/yük kritik yerlerde düğüm değil dikiş kullanılır; yanlış veya yetersiz dikiş, tam yük altında sessizce açılıp ani boşalma ve snap-back yaratabilir.",
        formula: {
          text: "Dikiş verimi ≈ MBL × %85–95 (düğümün ~%40–60'ına karşı)",
          description: "Dikiş yükü liflere dağıtır; kalıcı göz ve birleştirmeler bu yüzden dikişle yapılır",
        },
      },
      {
        title: "Halat Bakımı ve Emniyet",
        content:
          "Halatlar **düzenli ve kayıtlı** olarak muayene edilir; muayene halatın tipine göre farklı hasar türlerini arar. **Sentetik halatlarda:** dıştan aşınma/tüylenme, kesik, iç liflerde toz oluşması (lifler birbirine sürtündükçe içeriden aşınır), ısı/sürtünmeden kaynaklı camlaşma-erime (glazing), sertleşme ve renk atması (UV bozulması). **Çelik tel halatlarda:** kopan teller, korozyon/pas, ezilme-kırılma (kink), yassılaşma ve iç yağın kaybı. İç hasar dıştan görünmeyebileceğinden çelik halat kolları da açılıp kontrol edilir.\n\n**Kullanımdan çıkarma (retirement) kriterleri:** Halat, artık mukavemeti güvenli sınırın altına düştüğünde atılır. Çelik tel halatta yaygın bir kural, **bir büküm boyunda (one lay length)** görünür kopan tel sayısının belirli bir eşiği (tipik olarak toplam telin ~%5'i veya standarttaki sayı) aşmasıdır; ayrıca ciddi korozyon, ezilme (kink) veya çap incelmesi de çıkarma sebebidir. Sentetik halatta belirgin lif kaybı, sertleşme, erime izi veya ölçülen artık mukavemetin düşmesi çıkarma gerektirir. Şüphe varsa halat servise alınmaz.\n\n**Saklama ve koruma:** Halatlar kuru, iyi havalandırılan, güneş almayan ve kimyasal/keskin yüzeylerden uzak yerde saklanır; sentetik halatlar UV'den korunur, çelik halatlar korozyona karşı yağlanır. Halat düzgün roda edilir (kink oluşturmadan), keskin köşelerden geçerken radansa/koruma kullanılır ve aşırı bükülmeden kaçınılır. Kimyasal döküntü (asit, boya sökücü) sentetik lifi görünmeden zayıflatabilir.\n\n**Emniyet:** En kritik tehlike **snap-back**'tir: gergin halat koptuğunda elastik enerjisini aniden boşaltıp kırbaç gibi savrulur ve ölümcül olabilir. Temel kurallar: gergin halatın olası geri tepme hattında **durmamak**, halatın altında/üstünde bulunmamak, gergin halata gereksiz yaklaşmamak, uygun **eldiven** kullanmak (ama halatı elle 'yakalamaya' çalışmamak) ve babaya volta edilen halatta yeterli tur/emniyet sağlamak. **Gemide önemi:** Halat bakımı yalnızca ekonomi değil doğrudan can güvenliğidir; bakımsız veya yanlış saklanmış bir halat, tam yük altında beklenmedik anda kopar.",
        formula: {
          text: "Çelik halat atma: bir bükümde kopan tel > eşik (tipik ~%5) → servisten çıkar",
          description: "Ayrıca ciddi korozyon, ezilme (kink) veya çap incelmesi de kullanımdan çıkarma sebebidir",
        },
      },
    ],
    keyPoints: [
      "Halatlar doğal/sentetik lif ve çelik tel olarak ayrılır; naylon elastiktir ama snap-back yapar.",
      "Temel düğümler: izbarço (sabit göz), camadan, sekiz, volta/kazık bağı.",
      "Eye splice kalıcı göz için kullanılır ve düğüme göre daha fazla mukavemet korur.",
      "Hasarlı halat çıkarılır; gergin halatın snap-back hattında durulmaz.",
    ],
  },

  "Demir ve Demirleme": {
    title: "Demir ve Demirleme",
    introduction:
      "Demirleme (anchoring), gemiyi belirli bir mevkide güvenle tutmak için demir ve zincirin deniz dibine yük aktarmasıdır. Doğru yer seçimi, yeterli kaloma (zincir boyu) ve zeminin tutuş kalitesi, geminin sürüklenmeden (dragging) durmasını sağlar. Demir donanımının bakımı ve manevra disiplini hem emniyet hem operasyonel güvenilirlik için kritiktir.",
    sections: [
      {
        title: "Demir Donanımı ve Türleri",
        content:
          "Demir donanımı birbirini tamamlayan parçalardan oluşur: **demir (anchor)**, **zincir (chain cable)**, **ırgat (windlass)**, **zincirlik (chain locker)**, **loça/kovan (hawse pipe)**, **zincir stoperi (chain stopper / devil's claw)** ve zincirin gemiye bağlandığı son nokta olan **kısrak/bitter end** (acil durumda içeriden bırakılabilir). Bu sistemin görevi, geminin ağırlığını ve dış kuvvetleri (rüzgâr, akıntı, dalga) kontrollü biçimde deniz dibine aktarmaktır.\n\n**Demir türleri:** En yaygın tip **stoksuz demir (stockless anchor)**'dir; başı oynak olduğundan tırnakları (flukes) zemine gömülerek tutar ve loçaya kolay çekilir. **Yüksek tutuş güçlü demirler (High Holding Power, HHP)** aynı tutuşu daha az ağırlıkla sağlar; klas onaylı bir HHP demir, standart demirin yaklaşık iki katı tutuşa karşılık gelir. Eski **çıpalı demir (stock / Admiralty anchor)** çok iyi tutar ama istifi zordur. Demirin tutuş gücü, ağırlığının bir katsayısı olarak ifade edilir: stoksuz demirde tutuş ~ağırlığın 3–4 katı, HHP tiplerde 10 katına kadar çıkabilir.\n\n**Zincir ve işaretleme:** Zincir, **kilit (shot / shackle length)** denen parçalara bölünür; bir kilit genellikle **27.5 m (15 kulaç)**'tır ve kilitler birbirine **Kenter kilidi** ile eklenir. Her birleşimdeki baklalar boyanır ve tel sarılarak salınan miktar sayılır (örn. '3 kilit suda'). Gemi zinciri genelde **lostromo baklası (stud-link)** tipidir; ortadaki çubuk (stud) zincirin dolaşmasını (kink) önler ve mukavemeti artırır.\n\n**Tutuş nasıl oluşur:** Tutuşun büyük kısmı demirin ağırlığından değil, **zincirin dipte yatay yatmasından** ve tırnakların gömülmesinden gelir. Dipte yatan zincir hem sürtünmeyle direnç yaratır hem de demire gelen çekmeyi yatay tutarak tırnakların sıyrılmasını engeller. **Worked example:** 5 tonluk stoksuz demir, tutuş katsayısı 3.5 ile ~17.5 ton yatay tutuş sağlar; buna dipte yatan zincirin sürtünme direnci de eklenir. **Gemide önemi:** Doğru demir/zincir seçimi ve bakımlı bir ırgat/stoper, ağır havada geminin tutunması ile sürüklenip karaya/başka gemiye bindirmesi arasındaki farktır.",
        formula: {
          text: "Tutuş ≈ katsayı × demir ağırlığı (stoksuz ~3–4×, HHP ~10× kadar)",
          description: "Toplam tutuşa dipte yatay yatan zincirin sürtünme direnci de eklenir",
        },
      },
      {
        title: "Kaloma (Scope) ve Tutuş",
        content:
          "Demirin tutması **yeterli kaloma (scope)** ile sağlanır; kaloma, salınan zincir boyunun su derinliğine (daha doğrusu loça–dip mesafesine) oranıdır. Mekanizma şudur: zincirin önemli bir bölümü dipte **yatay** yattığında, demir tırnaklarına gelen çekme yukarı değil yatay yönde olur ve tırnaklar zemine gömülü kalır; zincir asıldıkça (kaloma azaldıkça) çekme yukarı döner ve demir sıyrılıp tarar. Ek olarak, asılı zincirin oluşturduğu **eğri (catenary)** dalga/rüzgâr şoklarını yay gibi emerek demire gelen ani yükü yumuşatır.\n\n**Worked example:** Su derinliği 20 m, loçanın su üstü yüksekliği 10 m ise demire olan toplam mesafe ~30 m'dir. Normal koşulda 6× kaloma için 6 × 30 = **180 m ≈ 6.5 kilit** zincir salınır; ağır havada 8–10× için 240–300 m yani **~9–11 kilit** gerekir. Sığ suda kaloma oranı yüksek tutulur çünkü katmanın yatay bileşeni azalır.\n\n**Zemin (holding ground):** Tutuş zemine de bağlıdır: **çamur ve kil** en iyi tutar; **kum** orta; **kaya, mercan ve çakıl** ya zayıf tutar ya demiri takıp geri alınmasını zorlaştırır. Deniz haritasındaki dip cinsi (M=mud/çamur, S=sand/kum, R=rock/kaya) demir yeri seçiminde okunur. **Gemide önemi:** Yetersiz kaloma taramanın (dragging) bir numaralı sebebidir; kaptan ağır hava beklediğinde önceden kaloma artırır, çünkü fırtına içinde ilave zincir salmak hem zor hem tehlikelidir.",
        formula: {
          text: "Kaloma ≈ 5–6 × derinlik (normal), 8–10 × derinlik (ağır hava)",
          description: "Salınan zincir boyunun su derinliğine tipik oranı (zemin/koşula göre değişir)",
        },
      },
      {
        title: "Demirleme Manevrası",
        content:
          "Emniyetli demirleme, iyi bir **yer seçimi** ile başlar. Değerlendirilen etkenler: yeterli **derinlik** (çok sığ = UKC riski, çok derin = zincir yetmez), iyi **tutuş zemini** (çamur/kil), yeterli **salınım alanı (swinging room)** — gemi rüzgâr/akıntıyla demir etrafında döneceği için yarıçapı LOA + yatay kaloma kadar boş su gerekir —, **trafik**, diğer demirli gemilere ve tehlikelere uzaklık, ve dip kablo/boru hattı gibi yasak bölge olmaması.\n\n**Yaklaşım ve bırakma:** Gemi genellikle **rüzgâra/akıntıya karşı** ve düşük hızla mevkiye yaklaşır; hedefte durdurulur ve hafif **tornistan** verilerek geriye doğru hafif yol alınırken demir bırakılır. Böylece zincir demirin üzerine yığılmaz, dip boyunca **serilir**. Sığ suda demir 'let go' (fren bırakıp serbest düşürme) ile, derin suda ise ırgatla kontrollü 'walk back' ile indirilir (derin suda serbest bırakma zinciri ve ırgatı zorlar).\n\n**Tuttuğunu doğrulama (bringing up):** Zincir salınırken gerilir; gemi geri yol alırken zincir bir '**growing**' (asılıp gerilme) yapar ve ardından **düşer/gevşer** — bu, demirin tuttuğunun (**brought up**) işaretidir. Zincir sürekli gergin ve titreşimliyse demir tutmuyor (tarıyor) demektir.\n\n**Haberleşme:** Köprüüstü ile baş üstü (forecastle) arasında net ve standart haberleşme şarttır: kaç kilit suda olduğu, zincirin **yönü** (saat kadranı: 'up and down', 'leading ahead/astern'), **gerginliği** (gergin/gevşek) ve demirin durumu sürekli bildirilir. **Gemide önemi:** Aceleyle veya fazla hızla yapılan demirleme zinciri demirin üstüne yığar, demiri takar (foul anchor) veya zinciri koparabilir; disiplinli manevra bunları önler.",
      },
      {
        title: "Tarama (Dragging) ve İzleme",
        content:
          "Demirli gemi asla 'bırakılıp unutulmaz'; sürekli **demir vardiyası (anchor watch)** tutulur. Mevki üç bağımsız yöntemle izlenir: **GPS demir alarmı** (izin verilen sürüklenme yarıçapı girilir), **kerteriz/mesafe** (sabit bir cismin transiti veya radar range/bearing) ve **görsel referanslar**. Alarm yarıçapı, geminin normal salınım dairesini kapsayacak ama gerçek taramayı erken yakalayacak şekilde ayarlanır.\n\n**Tarama (dragging) belirtileri:** Zincirin **sürekli gergin ve titreşimli** olması (normalde bir gerilip bir gevşer), geminin sabit referanslara göre **kayması**, kerterizlerin değişmesi, GPS izinin salınım dairesinden çıkması ve demir alarmının çalması. Zincirdeki sürekli titreşim ('zincir şarkısı') genellikle ilk erken uyarıdır.\n\n**Tarama tespitinde eylem:** Önce **makine hazır (stand-by)** edilir ve dümene adam verilir; gereğinde **kaloma artırılır** (ilk ve en etkili adım), tutmazsa **ikinci demir** atılır veya **yeniden demirleme / seyre çıkma** yapılır. Ağır hava yaklaşıyorsa bu adımlar beklenmeden önceden alınır: kaloma artırılır, makine stand-by tutulur, personel hazır bulundurulur.\n\n**Önleyici tedbir:** Hava ve akıntı tahmini izlenir; gel-git ve rüzgâr dönüşünde salınım alanı yeniden değerlendirilir. **Gemide önemi:** Tarama, özellikle kalabalık demir sahasında veya karaya yakın, saatler içinde bindirme/karaya oturmaya dönüşebilir; erken tespit ve hazır makine çoğu demir kazasını önler.",
        formula: {
          text: "Salınım dairesi (swing circle) ≈ yatay kaloma + LOA",
          description: "GPS demir alarmı yarıçapı bu daireyi kapsayacak ama taramayı erken yakalayacak biçimde ayarlanır",
        },
      },
    ],
    keyPoints: [
      "Tutuş, demirin ağırlığından çok zincirin dipte yatay yatmasıyla sağlanır.",
      "Kaloma ≈ 5–6× derinlik (normal), 8–10× (ağır hava); yetersiz kaloma dragging riskidir.",
      "Yer seçimi: derinlik, tutuş zemini, swinging room ve trafik; yaklaşım rüzgâr/akıntıya karşı.",
      "Demirli gemi sürekli izlenir; tarama tespitinde makine hazır edilir, kaloma artırılır.",
    ],
  },

  "Bağlama (Mooring) Operasyonları": {
    title: "Bağlama (Mooring) Operasyonları",
    introduction:
      "Bağlama (mooring), gemiyi rıhtıma veya şamandıraya halatlarla emniyetle sabitlemektir. Doğru halat düzeni, gergi yönetimi ve emniyet disiplini hem geminin yerinde kalmasını hem personelin güvenliğini sağlar. Mooring operasyonları, güvertedeki en sık ciddi yaralanma kaynaklarından biridir.",
    sections: [
      {
        title: "Bağlama Halatları ve Düzeni",
        content:
          "Standart bir bağlama düzeni, her biri farklı yönde kuvvet dengeleyen halatlardan oluşur. **Baş ve kıç açmazları (head / stern lines)** gemiyi rıhtıma doğru çeker ve boyuna hareketi kısmen sınırlar. **Spring halatlar** (baş spring öne, kıç spring geriye doğru) geminin **boyuna (ileri-geri) hareketini** engeller — rıhtıma paralel uzandıkları için en etkili boyuna tutucudur. **Breast halatlar** rıhtıma neredeyse **dik** uzanır ve gemiyi rıhtıma yanaşık tutar. Tipik bir düzen bu grupların simetrik dağılımıdır (örn. 3-2-2).\n\n**Uzunluk ve simetri:** İyi bir düzen halatları **mümkün olduğunca uzun ve simetrik** yerleştirir. Nedeni fiziksel: uzun halat, geminin aynı miktar hareketinde **daha küçük oransal uzama** ve dolayısıyla daha az gerilim değişimi yaşar. Örneğin gemi 0.5 m kayarsa, 50 m'lik halatta uzama %1 iken 10 m'lik halatta %5'tir — kısa halat çok daha hızlı gerilir ve önce kopar. Aynı işi gören halatlar simetrik ve **eşit açıda** olmalı ki yükü paylaşsınlar.\n\n**Malzeme karıştırmama:** Aynı serviste (örn. tüm baş açmazları) **farklı malzeme/elastikiyette halat karıştırılmaz**. Naylon ve HMPE aynı hatta olursa, az uzayan HMPE yükün neredeyse tamamını alıp önce kopar, sonra yük naylona biner — yani halatlar yükü paylaşmaz, sırayla kopar. **Kuyruk (tail):** Çelik/HMPE halatların ucuna bazen kısa bir naylon **kuyruk** eklenir; bu esnek uç şok yükünü emerek ana halatı korur.\n\n**Gemide önemi:** Yanlış düzenlenmiş bir bağlama (kısa/asimetrik halatlar, karışık malzeme), gel-git veya geçen gemi dalgasında zincirleme kopmaya ve geminin rıhtımdan kaçmasına yol açar; doğru düzen yükü tüm halatlara paylaştırır.",
        formula: {
          text: "Uzama (%) = hareket ÷ halat boyu × 100 (uzun halat = az gerilim değişimi)",
          description: "0.5 m hareket 50 m halatta %1, 10 m halatta %5 uzama demektir; kısa halat önce kopar",
        },
      },
      {
        title: "Irgat, Vinç ve Gergi Yönetimi",
        content:
          "Bağlama halatları **ırgat/vinç (mooring winch)** ve **babalar (bitt / bollard)** yardımıyla gerilir ve tutulur. Halat vinç tamburuna sarılır ve **fren (brake)** ile emniyete alınır. Kritik tasarım ilkesi şudur: frenin **tutma (render) kapasitesi, halatın MBL'sinden düşük** ayarlanır (tipik olarak MBL'nin ~%60'ı). Böylece aşırı yük geldiğinde halat kopmadan önce **fren kayar (render eder)** ve yükü sınırlar; enerji ani bir kopma yerine kontrollü kayma ile boşalır. Fren çok sıkı ayarlanırsa bu koruma çalışmaz ve halat kopar.\n\n**Otomatik gergi (auto-tension):** Bazı vinçler halatı sabit gerginlikte tutmak için otomatik sarar/salar. Ancak gel-git veya yük değişiminde vinç sürekli çalışıp halatı yorabilir ve komşu halatlarla yük dengesini bozabilir; bu yüzden bağlı gemide auto-tension genellikle **kapatılır** ve halatlar elle tendize edilir.\n\n**Babaya volta ve emniyet:** Halat, kalıcı tutuşta tambura değil **babaya '8' (figure-of-eight)** şeklinde volta edilerek emniyete alınır; son turlar kilitlenir. Tambur üzerinde tutulan halatta ise yeterli sarım (turn) bırakılır.\n\n**Tendiz (line tending):** Gel-git, yükleme/tahliye ile draft değiştikçe halatların gerginliği değişir ve **düzenli kontrol edilip ayarlanır**. Alçalan suda halatlar gerilir (gevşetilir), yükselen suda gevşer (gerilir). **Gemide önemi:** İhmal edilen tendiz, gel-gitte halatların aşırı gerilip kopmasına veya aşırı gevşeyip geminin rıhtımdan açmasına yol açar; fren ayarı ise snap-back riskini doğrudan belirler.",
        formula: {
          text: "Fren tutma yükü ≈ halat MBL × %60 (kopmadan önce render eder)",
          description: "Fren çok sıkı ayarlanırsa halat kopar; doğru ayar yükü kayarak sınırlar",
        },
      },
      {
        title: "Snap-back Bölgeleri ve Emniyet",
        content:
          "Gergin bir halat, bir yay gibi **elastik enerji depolar**. Koptuğunda bu enerji bir anda boşalır ve halatın uçları kopma noktasından geriye doğru **kırbaç gibi savrulur (snap-back)**; savrulan halat bir insanı öldürecek hızdadır. Snap-back, güvertedeki **ölümcül yaralanmaların başlıca nedenidir**.\n\n**Neden naylon daha tehlikeli:** Depolanan enerji ~ kuvvet × uzama ÷ 2'dir. Naylon aynı yükte polyester veya HMPE'den çok daha fazla uzadığı için **çok daha fazla enerji** depolar ve koptuğunda daha uzağa, daha hızlı savrulur. Bu yüzden naylonun bağlamadaki avantajı (şok emme) aynı zamanda en büyük tehlikesidir.\n\n**Snap-back zone ve modern yaklaşım:** Halatın kopunca savrulacağı bölge 'snap-back zone' olarak bilinir. Eskiden güverteye sabit snap-back bölgeleri boyanırdı; ancak halat kılavuzdan (fairlead) saparsa gerçek tehlike alanı değişeceğinden sabit boya **yanıltıcı** olabilir. Günümüzde önerilen yaklaşım, **tüm mooring güvertesini potansiyel tehlikeli kabul etmek** ve her operasyon için **dinamik risk değerlendirmesi** yapmaktır.\n\n**Temel emniyet kuralları:** Gergin halatın **hattında/uzantısında durmamak**, halatın altında veya üstünde bulunmamak, gergin halata gereksiz yaklaşmamak, kılavuz (fairlead) ve baba yakınındaki 'bight' (halka) içine basmamak, uygun **KKD** kullanmak ve net iletişim. **Gemide önemi:** Snap-back saniyeler içinde olur ve kaçış imkânı yoktur; bu yüzden korunma, tehlike bölgesinde hiç bulunmamaya dayanır — 'dikkatli dur' değil, 'orada durma'.",
        formula: {
          text: "Snap-back enerjisi ∝ kuvvet × uzama ÷ 2 (naylon en çok depolar)",
          description: "Naylon aynı yükte daha çok uzar, daha çok enerji depolar ve koptuğunda daha tehlikeli savrulur",
        },
      },
      {
        title: "Operasyon Planı ve İletişim",
        content:
          "Bağlama/çözme, iyi planlanması gereken riskli bir ekip operasyonudur. Öncesinde **toolbox toplantısı (toolbox talk)** yapılır: görev dağılımı (kim vinçte, kim babada, kim gözcü), **halat sırası**, tehlikeler (snap-back bölgeleri, kaygan güverte), acil durdurma ve **iletişim yöntemi** netleştirilir.\n\n**Standart komutlar ve haberleşme:** Köprüüstü ile baş/kıç istasyonları arasında net telsiz haberleşmesi kullanılır ve komutlar standarttır: **'heave'** (vir/gergin al), **'slack'** (koyver/gevşet), **'hold'** (tut), **'make fast'** (bağla/emniyete al), **'let go'** (koyver). Belirsiz komut ('biraz al') yerine net komut verilir ve **geri okuma (read-back)** ile teyit edilir.\n\n**İnsan ve çevre koşulları:** Yeterli ve **dinlenmiş** personel, uygun **KKD** (baret, eldiven, emniyet ayakkabısı, gerektiğinde can yeleği) ve gece için iyi **aydınlatma** sağlanır. **Rüzgâr, akıntı ve gel-git** dikkate alınır; bunlar geminin rıhtıma yanaşma/açma eğilimini ve halat yüklerini belirler. **Römorkör** kullanılıyorsa köprüüstü onunla koordine eder.\n\n**Operasyon sonrası:** Halatlar kontrol edilir, fazlalık toplanır, fren/stoperler emniyete alınır ve deniz emniyeti (sea securing) sağlanır. **Gemide önemi:** Kazaların çoğu iletişim kopukluğu, yorgunluk ve plansız operasyondan doğar; disiplinli toolbox + standart komutlar hem yaralanmayı hem geminin kaçmasını önler.",
      },
    ],
    keyPoints: [
      "Düzen: head/stern lines (çeker), spring (boyuna hareket), breast (dik tutar); halatlar uzun ve simetrik.",
      "Vinç freni halat kopma yükünün altında tutar; halat babaya figure-of-eight ile volta edilir.",
      "Snap-back ölümcüldür; tüm güverte potansiyel tehlikeli kabul edilip gergin halattan uzak durulur.",
      "Operasyon öncesi toolbox + net telsiz komutları (heave/slack/hold/make fast) kullanılır.",
    ],
  },

  "Yedekleme (Towing) Operasyonları": {
    title: "Yedekleme (Towing) Operasyonları",
    introduction:
      "Yedekleme (towing), bir geminin başka bir gemiyi/yapıyı halatla çekmesidir: römorkör yardımı, arızalı gemiyi çekme veya acil durumda kurtarma (emergency towing) bağlamında uygulanır. Doğru donanım, bağlantı ve manevra, hem yedekleyen hem yedeklenen geminin güvenliğini belirler.",
    sections: [
      {
        title: "Römorkör Yardımı ve Bağlanma",
        content:
          "Liman ve kısıtlı su manevralarında **römorkörler (tug)** gemiye kuvvet uygular. İki temel yöntem vardır: **itme (push)** — römorkör baş/omuz/kıça bastırarak iter — ve **çekme (pull)** — römorkör kendi halatı veya geminin verdiği halatla çeker. Ayrıca yüksek hızda dümen/makine arızasına karşı geminin arkasında bağlı seyreden **escort towing** uygulaması vardır.\n\n**Bollard Pull (BP):** Bir römorkörün gücü, sabit çekme kuvveti olan **Bollard Pull** ile (ton cinsinden) ifade edilir; örneğin 60 t BP'lik bir römorkör. Gerekli römorkör sayısı ve BP'si; geminin büyüklüğüne, rüzgâr/akıntı kuvvetine ve manevranın zorluğuna göre seçilir. Yetersiz BP, geminin rüzgârda kontrolden çıkmasına yol açar.\n\n**Bağlanma ve bağlantı noktası:** Bağlantı, geminin verdiği yedek halatı veya römorkörün halatı ile yapılır; bağlantı noktası **yeterli mukavemette bir baba/fairlead** olmalı ve halat keskin köşeden geçmemelidir. Komut zinciri nettir: **kılavuz kaptan (pilot)** römorköre talimat verir, gemi köprüüstü koordine eder ve teyit alır.\n\n**Girting (girding) tehlikesi:** Çeken bir römorkör, çektiği geminin yan hareketiyle **yana devrilebilir (girting/capsizing)** — halat römorkörü yandan çeker ve alabora eder; römorkör kayıplarının klasik nedenidir. Bu yüzden römorkör daima **kaçış serbestliğini** korur, hızlı ayırma (quick release / gob rope) hazır tutar ve gemi römorköre fazla yaklaşmaz (baş/kıç dalgası ve etkileşim tehlikelidir). **Gemide önemi:** Römorkörle çalışma net komut ve doğru bağlantı gerektirir; yanlış anlaşılan bir komut veya zayıf bağlantı noktası hem gemiyi hem römorkörü tehlikeye atar.",
        formula: {
          text: "Römorkör gücü = Bollard Pull (BP), ton cinsinden statik çekme kuvveti",
          description: "Gerekli BP; gemi büyüklüğü, rüzgâr/akıntı ve manevra zorluğuna göre seçilir",
        },
      },
      {
        title: "Yedek Donanımı ve Bağlantı",
        content:
          "Açık deniz ve uzun mesafe yedeklemede **yedek donanımı**, tek bir halattan çok bir **sistemdir** ve her parçası şok yükünü yönetmek için tasarlanır. Tipik bir düzen: ana **yedek halatı (tow line — çelik tel veya yüksek mukavemetli sentetik)**, sürtünme/tutuş için bir **zincir parçası**, şok yükünü emen **esnek bir bölüm** ve ayrı bir **emniyet/yedek (back-up)** bağlantısı.\n\n**Bağlantı noktaları:** Yedeklenen gemide bağlantı, baş omuzlardan iki kol veren bir **çatal/bridle** veya güçlendirilmiş bir **towing bracket (SMIT bracket)** üzerinden yapılır; noktalar yeterli mukavemette olmalı ve halat **sürtünme koruması (chafe protection)** ile keskin yüzeylerden korunmalıdır. Sürtünme, uzun yedeklemede halatı sessizce keser.\n\n**Catenary (sarkma) ve şok emme:** Yedek halatının bir bölümünün suya değecek kadar **sarkması (catenary)**, sistemin en önemli şok emicisidir. Dalga ve gemi hareketi halatı gerdiğinde, önce bu sarkma düzleşir (askıdaki ağırlık kalkar) ve ani yükü bir yay gibi emer; sarkma yeterliyse halat ani ('snatch') yüklenip kopmaz. Bu yüzden derin suda uzun ve ağır (catenary'li) tow line tercih edilir; sığ suda sarkma azaldığından şok riski artar.\n\n**Römorkör emniyeti:** Römorkör tarafında, halatın yandan çekip devirmesini önlemek için **gob/gog rope** (halatı kıça yönlendiren emniyet halatı) kullanılır. **Gemide önemi:** İyi donanım ani kopmayı önler; zayıf bir bağlantı noktası, korumasız sürtünme veya yetersiz catenary, açık denizde yedeğin kopmasına ve geminin sürüklenmesine yol açar.",
        formula: {
          text: "Catenary derinse şok emer: uzun/ağır tow line ani ('snatch') yükü düşürür",
          description: "Sığ suda sarkma azalır ve şok yükü artar; derin suda uzun catenary güvenlidir",
        },
      },
      {
        title: "Yedekleme Manevrası ve Yük Yönetimi",
        content:
          "Yedeklemede en büyük tehlike **ani gergi (snatch) ve şok yüküdür**; bu yüzden yük **kademeli** uygulanır: römorkör/çeken gemi yavaşça yol alır, halat yumuşakça gerilir, hız ve rota **yavaş** değiştirilir. Ani makine/dümen hareketi, halatta statik çekmenin katı gerilim tepeleri yaratır.\n\n**Dinamik yük ve yan yük:** Yedek halatındaki gerilim sabit değildir; dalga, gemi hareketi ve yedeklenenin salınımıyla sürekli değişir ve **dinamik tepe gerilimi statik çekmenin birkaç katı** olabilir. Ani yön değişimleri halata **yan yük (side load)** bindirir; bu hem bağlantı noktasını zorlar hem çeken gemiyi/römorkörü tehlikeye atar. Bu yüzden dönüşler geniş ve yumuşak yapılır.\n\n**Salınım (yawing) kontrolü:** Yedeklenen gemi, arkadan çekilirken sağa-sola **salınma (yawing)** eğilimindedir; mümkünse kendi dümeniyle bu salınımı bastırmaya çalışır, gerekirse kıçtan sürüklenen bir **drag (kıç demiri/zincir)** ile stabilize edilir.\n\n**İzleme ve acil ayırma:** Tüm operasyon boyunca bağlantı noktaları, sürtünme bölgeleri ve halat gerilimi izlenir; her an **acil ayırma (emergency release)** imkânı hazır tutulur. **Gemide önemi:** Yedekleme kazalarının çoğu ani gergi, yan yük ve sürtünmeden doğar; yumuşak manevra, catenary'nin korunması ve sürekli gözlem bunları önler.",
        formula: {
          text: "Dinamik tepe gerilimi ≈ statik çekme × hareket faktörü (birkaç kat olabilir)",
          description: "Ani gergi ve yan yük gerilimi katlar; yük kademeli uygulanır, dönüşler geniş yapılır",
        },
      },
      {
        title: "Acil Yedekleme (Emergency Towing)",
        content:
          "Makinesi veya dümeni devre dışı kalan bir gemi, hızla **yedeğe alınmaya hazır** olmalıdır. Birçok gemide — özellikle tankerlerde SOLAS gereği — **hazır kurulu bir acil yedekleme düzeni (Emergency Towing Arrangement, ETA)** bulunur: geminin **baş ve kıçında** hızlı bağlanabilen güçlü bağlantı noktaları, ön hazırlıklı bir **halat/zincir (pick-up gear)** ve kurtarıcının bağlantıyı almasını sağlayan bir **mesafe halatı (messenger/pick-up line)** ile **şamandıra**.\n\n**Neden ön hazırlık şart:** Acil durumda koşullar genellikle **kötüdür** (fırtına, karanlık, karaya sürüklenme) ve **zaman kısıtlıdır**; donanımı o an sıfırdan kurmaya çalışmak çoğu zaman imkânsızdır. Bu yüzden ETA önceden kurulu, işaretli ve **hızlı devreye alınabilir** olmalı, mürettebat da tatbikatla **eğitimli** olmalıdır. Mesafe halatı ve şamandırası, kurtarıcı geminin ağır tow line'ı su üstünden hızla almasını sağlar.\n\n**Demir zinciri bir güç noktasıdır:** Baş taraf bağlantısı yoksa geminin **demir zinciri**, güçlü bir acil yedekleme bağlantı noktası olarak kullanılabilir (zincir loçadan verilir). Bu, gemi ağırlığını taşıyacak en güçlü hazır donanımlardan biridir.\n\n**Gemide önemi:** ETA ve düzenli tatbikat, karaya oturma/çevre felaketi ile kurtulma arasındaki farkı yaratır; özellikle yükünü çevreye dökebilecek tankerlerde bu hazırlık hem can hem çevre emniyetidir.",
      },
    ],
    keyPoints: [
      "Römorkör iter veya çeker; girting riskine karşı kaçış serbestliğini korur, köprüüstü koordine eder.",
      "Tow line düzeni şok emen bir bölüm (catenary/zincir) ve emniyet bağlantısı içerir.",
      "Yük kademeli uygulanır; ani gergi/yön değişimi şok ve yan yük yaratır.",
      "Tankerlerde hazır kurulu Emergency Towing Arrangement (ETA) ve eğitimli ekip bulunur.",
    ],
  },

  "Güverte Bakımı ve Korozyon Kontrolü": {
    title: "Güverte Bakımı ve Korozyon Kontrolü",
    introduction:
      "Deniz ortamı çelik tekne için sürekli bir korozyon tehdididir. Düzenli güverte bakımı — yüzey hazırlığı, boyama ve katodik koruma — geminin yapısal bütünlüğünü ve değerini korur. İyi planlanmış bakım, hem emniyet hem maliyet açısından kritiktir ve planlı bakım sisteminin (PMS) parçasıdır.",
    sections: [
      {
        title: "Korozyon Mekanizması",
        content:
          "Çeliğin korozyonu (paslanma) bir **elektrokimyasal** olaydır; kuru havada değil, **su ve oksijen** bir arada varken gerçekleşir. Metal yüzeyinde mikroskobik **anot** ve **katot** bölgeleri oluşur: anotta demir çözünür (**Fe → Fe²⁺ + 2e⁻**), açığa çıkan elektronlar metal içinden katoda akar ve orada oksijeni indirger (**O₂ + 2H₂O + 4e⁻ → 4OH⁻**). Demir iyonları hidroksitle birleşip **pas (demir oksit)** oluşturur. Su bir **elektrolit** (iyon iletkeni) olarak devreyi tamamlar; deniz suyundaki **klorür (tuz)** iletkenliği artırdığından korozyonu belirgin biçimde **hızlandırır**.\n\n**Galvanik korozyon:** Farklı iki metal bir elektrolit içinde temas ederse, **galvanik seride** daha aktif (soy olmayan) metal **anot** olup hızla aşınırken daha soy metal korunur. Örneğin çelik (aktif) bronz bir valfle (soy) temas ederse çelik hızla yenir. Bu ilke hem bir tehdit (yanlış metal eşleşmesi) hem bir korunma yöntemidir (feda anot — bkz. katodik koruma).\n\n**Yerel korozyon türleri:** **Çukurcuk/pitting** kaplama hasarlı küçük noktalarda yoğunlaşır ve derine iner; **çatlak/crevice korozyonu** conta altı ve bindirme gibi durgun-oksijenli aralıklarda oluşur; **gerilmeli korozyon (stress corrosion cracking)** yük ve korozyonun birlikte etkisiyle çatlak yaratır.\n\n**En çok etkilenen bölgeler:** Su hattı (ıslanma-kuruma, oksijen bol), **balast tankları** (tuzlu su + oksijen), güvertede su biriken alanlar, freeing port çevresi ve farklı metallerin birleştiği yerler. **Gemide önemi:** Korozyon geminin yapısal mukavemetini sessizce yer; erken tespit, iyi kaplama ve katodik koruma hem emniyet hem geminin değeri için kritiktir.",
        formula: {
          text: "Anot: Fe → Fe²⁺ + 2e⁻   ·   Katot: O₂ + 2H₂O + 4e⁻ → 4OH⁻",
          description: "Korozyon elektrokimyasaldır; su + oksijen + elektrolit (tuz) gerekir, klorür süreci hızlandırır",
        },
      },
      {
        title: "Yüzey Hazırlığı ve Boyama",
        content:
          "Boyanın ömrü, boyanın kalitesinden çok **yüzey hazırlığının** kalitesine bağlıdır; kötü hazırlanmış yüzeye uygulanan en iyi boya bile tutmaz ve altından pas ilerler. Amaç: yüzeyi **temiz (pas/eski boya yok), kuru, yağsız ve tuzdan arındırılmış** hâle getirmek ve boyanın tutunacağı bir **pürüz profili** oluşturmaktır.\n\n**Yüzey hazırlığı yöntemleri:** El aletiyle **raspa (chipping)**, tel fırça ve taşlama (**St** dereceleri) hafif işler için; **kumlama/grit blasting (Sa** dereceleri, ISO 8501) ise metalik parlaklığa kadar temizlik için kullanılır. Tuz (klorür) kalıntısı tatlı su ile yıkanarak giderilir; çünkü kapan tuz, boyanın altında ozmotik kabarcık ve pas yapar.\n\n**Boya sistemi (kat kat):** Koruma tek katta değil, **sistemle** sağlanır: **astar/primer** (yapışma + korozyon önleyici pigment, örn. çinko), **ara kat (intermediate/barrier)** (kalınlık ve su geçirmezlik) ve **son kat/topcoat** (UV ve aşınma direnci, renk). Her katın bir **kuru film kalınlığı (DFT)** hedefi vardır ve kalınlık ölçülür.\n\n**Kuruma/uygulama koşulları:** Her boyanın sıcaklık, nem ve **çiy noktası (dew point)** şartı vardır. Temel kural: yüzey sıcaklığı **çiy noktasının en az 3°C üstünde** olmalı; aksi hâlde yüzeyde yoğuşan nem boyanın tutmasını engeller. Su altı bölgesi ayrıca **anti-fouling** (canlı tutunmasını önleyen) boya ile kaplanır. **Gemide önemi:** Doğru hazırlık + doğru sistem + doğru koşul boyanın yıllarca korumasını sağlar; birinin atlanması kısa sürede pas ve tekrar iş demektir.",
        formula: {
          text: "Boyama şartı: yüzey sıcaklığı ≥ çiy noktası (dew point) + 3°C",
          description: "Aksi hâlde yüzeyde yoğuşan nem boyanın tutmasını engeller; her katın DFT hedefi ölçülür",
        },
      },
      {
        title: "Katodik Koruma",
        content:
          "Su altındaki çelik yüzeyler, boya tek başına yeterli olmadığından **katodik koruma** ile ek olarak korunur. Mantık şudur: korunacak çeliği elektrokimyasal olarak **katot** hâline getirirsen, artık orada demir çözünmez (anot reaksiyonu başka yere kayar). İki yöntem vardır.\n\n**Feda anot (sacrificial anode):** Çeliğe, galvanik seride daha aktif bir metal — **çinko, alüminyum veya (tatlı suda) magnezyum** — bloklar hâlinde bağlanır. Bu metaller çelikten daha aktif olduğu için **kendileri anot olup aşınır** ve çeliği korur; adı gibi 'feda' olurlar. Basittir, güç gerektirmez, ama anotlar tükendikçe **yenilenmelidir**. Tekne dibinde, dümen ve pervane yakınında, balast tanklarında kullanılır.\n\n**Empoze akım (Impressed Current Cathodic Protection, ICCP):** Bir güç kaynağı, tekneye dışarıdan **kontrollü bir doğru akım** vererek çeliği korunan potansiyele getirir; **referans elektrotlar** gerçek potansiyeli ölçer ve sistem akımı otomatik ayarlar. Tipik koruma potansiyeli, gümüş/gümüş-klorür referansına göre **yaklaşık −0.80 ile −0.90 V** aralığındadır. ICCP büyük gemilerde daha ekonomik ve ayarlanabilirdir, ama izlenmesi gerekir.\n\n**Aşırı koruma riski:** Potansiyel çok negatif olursa (aşırı koruma) katotta hidrojen açığa çıkıp **boyayı kaldırabilir (disbonding)** veya yüksek mukavemetli çelikte gevrekleşme yapabilir; bu yüzden potansiyel bir aralıkta tutulur. **Gemide önemi:** Çalışmayan/ihmal edilen katodik koruma, özellikle balast tanklarında ve tekne dibinde hızlı korozyon demektir; anotlar kontrol edilir, ICCP sistemi izlenir.",
        formula: {
          text: "Koruma potansiyeli ≈ −0.80 … −0.90 V (Ag/AgCl referansına göre)",
          description: "Çok negatif = aşırı koruma (boya kalkması / hidrojen gevrekleşmesi); anotlar tükenince yenilenir",
        },
      },
      {
        title: "Planlı Bakım ve Kayıt",
        content:
          "Güverte bakımı rastgele değil, **planlı bakım sistemi (Planned Maintenance System, PMS)** kapsamında programlanır. PMS; hangi alanın ne zaman raspalanıp boyanacağını, anotların ne zaman kontrol edileceğini, tank muayenelerini ve boya/malzeme ihtiyacını takvime bağlar. Böylece bakım 'bozulunca' değil, **bozulmadan önce** yapılır.\n\n**İş izinleri (permit to work):** Güverte bakımının çoğu, tehlikesi nedeniyle **iş izni** gerektirir: **yüksekte çalışma (working aloft)** ve **borda dışı çalışma (over side)** düşme/boğulma riski taşır (emniyet kemeri, can yeleği, gözcü); **sıcak iş (hot work — taşlama, kaynak)** yangın izni ve gaz ölçümü ister; **balast/kapalı tank** bakımı **kapalı mahal (enclosed space)** prosedürüne tabidir (gaz ölçümü, havalandırma, gözcü, kurtarma planı).\n\n**Malzeme ve donanım:** Yeterli boya stoğu, uygun **KKD** (solunum koruması, gözlük, eldiven), raspa makinesi, fırça ve püskürtme donanımı hazır tutulur; kullanılan boyaların güvenlik bilgi formu (SDS) bulunur.\n\n**Kayıt ve sörvey:** Yapılan bakım, ölçülen kalınlıklar (DFT), anot durumu ve tank muayeneleri **kayıt altına alınır**. Bu kayıtlar **klas sörveyleri** ve geminin durumunun (condition) izlenmesi için temeldir; iyi tutulmuş kayıt, sörveyde geminin bakımlı olduğunu kanıtlar. **Gemide önemi:** PMS ve doğru iş izinleri hem yapısal bütünlüğü korur hem bakım sırasındaki düşme, yangın ve kapalı mahal kazalarını önler.",
      },
    ],
    keyPoints: [
      "Korozyon elektrokimyasaldır; tuzlu su hızlandırır, farklı metaller galvanik korozyon yaratır.",
      "İyi boyama iyi yüzey hazırlığı ister: temizlik + astar/ara/son kat, doğru kuruma koşulları.",
      "Katodik koruma: feda anot (çinko/alüminyum) veya ICCP; anotlar kontrol edilip yenilenir.",
      "Bakım PMS'te programlanır; yüksekte/sıcak iş izinli, tank bakımı kapalı mahal prosedürlüdür.",
    ],
  },

  "Kapaklar, Su Geçmezlik ve Açıklıklar": {
    title: "Kapaklar, Su Geçmezlik ve Açıklıklar",
    introduction:
      "Geminin yüzerliği ve hasar dayanımı, tekne açıklıklarının (ambar kapakları, kapılar, menholler, havalandırmalar) su geçirmezliğine bağlıdır. SOLAS ve Load Line sözleşmesi, su geçmezlik bütünlüğünü (watertight/weathertight integrity) ve emniyetli yük sınırını düzenler. İyi bakımlı kapaklar, su girişini ve dolayısıyla batma/stabilite kaybını önler.",
    sections: [
      {
        title: "Su Geçmezlik vs. Hava Koşullarına Dayanıklılık",
        content:
          "Geminin su geçirmezliği iki ayrı standartla tanımlanır ve bunları karıştırmamak önemlidir. **Watertight (su geçirmez)** yapılar, belirli bir **su basıncı yüksekliğine (head)** karşı suyun **her iki yönde** geçişini önler; bunlar geminin içindeki bölmeleme sınırlarıdır (su geçmez perdeler ve kapılar) ve **hasarlı stabilitede** bir bölme su alsa bile suyun diğerlerine yayılmasını durdurur.\n\n**Weathertight (hava koşullarına dayanıklı)** açıklıklar ise normal deniz koşullarında **üstten/dışarıdan gelen** suyun içeri geçmesini önler, ancak sürekli su basıncı altında değil; örneği ambar kapakları ve açık güverte kapılarıdır. Yani weathertight 'yağmur/serpinti/dalga sıçraması geçmez' demektir; watertight 'basınç altında bile geçmez' demektir.\n\n**Nerede hangisi:** Bir açıklığın hangi standarda tabi olacağı **konumuna ve işlevine** göre belirlenir: su hattına yakın veya iç bölmeleme sınırındaki açıklıklar watertight; açık güvertedeki büyük açıklıklar weathertight olur. **Aşağı su alma noktaları (downflooding points)** — havalandırma, kapı, açıklık — stabilite hesabında geminin hangi yalpada su almaya başlayacağını belirler.\n\n**Neden kritik:** Bir geminin yüzerliği ve hasar sonrası ayakta kalması bu açıklıkların bütünlüğüne bağlıdır. **Gemide önemi:** Açık bırakılan bir su geçmez kapı veya bozuk bir conta, hasarda suyun bölmeler arası yayılmasını (progressive flooding) hızlandırıp geminin batmasına yol açabilir; bu yüzden 'hangi kapı ne zaman kapalı olmalı' kuralı hayatidir.",
      },
      {
        title: "Ambar Kapakları (Hatch Covers)",
        content:
          "Dökme yük ve genel kargo gemilerinde **ambar kapakları (hatch covers)**, deniz suyunun ambara girmesini önleyen **en büyük weathertight açıklıktır**; bu yüzden bütünlükleri doğrudan geminin emniyetiyle ilgilidir (su alan ambar hem yükü bozar hem stabiliteyi tehlikeye atar). Modern kapaklar genellikle **katlanır (folding)**, **yana kayar (side-rolling)** veya **ponton** tipi çelik panellerdir.\n\n**Sızdırmazlık nasıl sağlanır:** Kapağın çevresindeki **lastik conta (rubber gasket)** ile karşı yüzeydeki **bıçak/bası çubuğu (compression bar)** birbirine bastırılır; **kilit/kama (cleats, wedges)** kapağı aşağı çeker ve contayı sıkıştırır. Coaming (ambar ağzı yükseltisi) çevresindeki **drenaj kanalları ve çek valfleri (non-return)**, conta hattına gelen suyu dışarı atar ama geri kaçırmaz.\n\n**Arıza modları:** Ezilmiş/sertleşmiş conta, **paslı veya eğrilmiş oturma yüzeyi**, bası çubuğunda hasar, tıkalı drenaj kanalları ve gevşek cleatler su girişine yol açar. Conta ile bası çubuğu arasındaki temas sürekli ve düzgün olmalıdır.\n\n**Test yöntemleri:** Su geçmezlik; **hortum testi (hose test)**, **tebeşir testi (chalk test — bası çubuğuna tebeşir sürülüp contadaki iz kontrol edilir)** veya seyir öncesi tercih edilen **ultrasonik sızdırmazlık testi** ile kontrol edilir (ultrasonik test kapalı ambarda güvenlidir ve ışık sızması gibi açıklıkları bulur). **Gemide önemi:** Bakımsız ambar kapağı, ağır havada ambara tonlarca su alıp yükü ıslatabilir veya (özellikle dökme yükte) serbest yüzey/kayma ile stabiliteyi bozabilir; kapak bakımı klas ve PSC denetiminin de odağıdır.",
      },
      {
        title: "Yükleme Sınırı (Load Line / Plimsoll)",
        content:
          "**Load Line (Uluslararası Yükleme Sınırı Sözleşmesi, ILLC 1966)**, geminin emniyetle ne kadar batabileceğini — yani **maksimum draftı** — belirler ve bordadaki **yükleme sınırı markası (Plimsoll mark)** ile gösterilir. Marka, geminin yeterli **fribord (freeboard — su hattı ile güverte arasındaki yükseklik)** ve dolayısıyla yeterli **rezerv yüzerlik ve stabilite** ile yüzmesini güvence altına alır.\n\n**Marka çizgileri:** Ortadaki daire ve yatay çizgi yaz yükleme hattını gösterir; yanındaki tarak farklı bölge/mevsim çizgilerini içerir: **S (yaz/summer)**, **W (kış/winter)**, **WNA (kış Kuzey Atlantik)**, **T (tropik)**, **F (tatlı su)** ve **TF (tropik tatlı su)**. Kış çizgisi yazdan daha aşağıdadır (daha az yük), tropik daha yukarıda (daha çok yük); çünkü hava/deniz koşulu değiştikçe gereken rezerv yüzerlik değişir.\n\n**Tatlı su payı (FWA — worked example):** Tatlı suyun yoğunluğu düşük olduğundan gemi tatlı suda daha fazla batar; **F** çizgisi bu yüzden yazdan **FWA** kadar yukarıdadır. FWA (mm) = deplasman ÷ (4 × TPC) ile hesaplanır. Örneğin deplasman 10.000 t ve TPC 20 t/cm ise FWA = 10.000 ÷ (4 × 20) = **125 mm**; yani gemi tatlı su limanında yaz hattını 125 mm geçebilir, çünkü denize çıkınca (yoğun su) o kadar yükselecektir.\n\n**Denetim:** Markanın gereğinden fazla suya gömülmesi (aşırı yükleme) **yasaktır** ve **Liman Devleti Kontrolü (PSC)** tarafından denetlenir. **Gemide önemi:** Load Line, geminin ağır havada güvenle yüzmesi için gereken minimum fribordu garanti eder; markayı aşan yükleme, rezerv yüzerliği ve stabiliteyi tehlikeye atarak batma riski yaratır.",
        formula: {
          text: "FWA (mm) = Deplasman ÷ (4 × TPC)   ·   örn. 10.000 ÷ (4×20) = 125 mm",
          description: "Tatlı su payı; gemi tatlı suda daha çok battığından F çizgisi yaz hattından FWA kadar yukarıdadır",
        },
      },
      {
        title: "Açıklıkların Bakımı ve Denetimi",
        content:
          "Su geçmezlik yalnızca ambar kapaklarıyla değil, **teknedeki tüm açıklıkların** bakımıyla sağlanır ve bunlar düzenli kontrol edilir. **Su geçmez kapılar (WT doors):** conta durumu, kapama düzeneği ve varsa **uzaktan kapatma** ile gösterge sistemi çalışır olmalı. **Havalandırma başlıkları ve hava firar boruları (air pipes):** üstlerindeki **otomatik kapama düzeneği (float type)** su bindiğinde kapanıp geri açılmalı; tıkalı/sıkışmış float, tanka su girişi veya tank basınç hasarı demektir. **İskandil ve dolum borusu kapakları** ile **freeing port'lar** (güverteye binen suyun hızla tahliyesi için menteşeli kapaklar) serbest çalışmalıdır — sıkışmış freeing port güvertede su biriktirir ve stabiliteyi bozar.\n\n**Ağır hava öncesi:** Tüm açıklıklar **'sea-secure'** hâle getirilir: kapaklar kapatılıp kilitlenir, cleatler sıkılır, WT kapılar kapatılır, güverte açıklıkları emniyete alınır. Bu, ağır havada ilk ve en temel tedbirdir.\n\n**Seyirde WT kapı konumu:** Su geçmez kapıların seyir sırasında açık mı kapalı mı tutulacağı **kurallara ve kaptanın talimatına** göre yönetilir; gereksiz açık bırakılan bir WT kapı, hasar durumunda suyun bölmeler arası yayılımını hızlandırır. Bu yüzden geçiş dışında kapalı tutulur.\n\n**Gemide önemi:** Tek bir bakımsız hava firar borusu float'ı veya açık unutulmuş bir kapı, ağır havada veya hasarda geminin su alıp batmasına giden zincirin ilk halkası olabilir; bu yüzden açıklık bakımı ve seyir öncesi kontrol listesi kritiktir.",
      },
    ],
    keyPoints: [
      "Watertight basınca karşı her iki yönde, weathertight üstten gelen suya karşı korur.",
      "Ambar kapakları conta+compression bar+cleat ile sızdırmaz; conta/drenaj bakımı kritiktir.",
      "Load Line (Plimsoll) markası emniyetli max draftı ve yeterli fribordu belirler; aşırı yük yasaktır.",
      "Açıklıklar düzenli kontrol edilir ve ağır hava öncesi sea-secure yapılır.",
    ],
  },

  "Pilot Transferi ve Pilot Merdiveni": {
    title: "Pilot Transferi ve Pilot Merdiveni",
    introduction:
      "Kılavuz kaptanın (pilot) gemiye binip inmesi, denizcilikteki en riskli rutin operasyonlardan biridir; düşme ve boğulma kazaları yaşanmıştır. SOLAS Bölüm V ve ilgili IMO kuralları, pilot transfer donanımının (pilot ladder, combination arrangement) tasarımını, kurulumunu ve gözetimini katı biçimde düzenler.",
    sections: [
      {
        title: "Pilot Merdiveni (Pilot Ladder) Gereklilikleri",
        content:
          "Pilot merdiveni (pilot ladder), kılavuz kaptanın gemiye güvenle çıkıp inmesini sağlayan ve **SOLAS V/23** ile **IMO kararı A.1045(27)** tarafından ayrıntılı standarda bağlanan bir donanımdır. Basamaklar **sert ağaç veya eşdeğer** malzemeden; **yatay, kaymaz** yüzeyli, eşit aralıklı ve tek parça olmalıdır; basamak **aralığı yaklaşık 310–350 mm**, genişliği ve kalınlığı standarttadır. Basamaklar eğik veya kırık olmamalıdır.\n\n**Yayılma çıtaları (spreaders):** Merdivenin burulup dönmesini önlemek için belirli aralıklarla (en fazla dokuz basamakta bir) yeterli uzunlukta **spreader** basamaklar bulunur; bunlar merdiveni bordaya paralel ve düz tutar.\n\n**Yan halatlar ve bütünlük:** Yan halatlar uygun malzemeden (manila/eşdeğer) ve belirli bölgede eksiz olmalı; basamakları kama/takoz ile tutan düzen sağlam olmalıdır. Merdiven **onaylı sağlam bağlantı noktalarından** (güverteye sabit güçlü noktalar) emniyete alınır; gelişigüzel bir babaya halatla bağlama gibi **uygunsuz sabitleme kabul edilmez**.\n\n**Tırmanma sınırı:** Tek pilot merdiveni ile su hattından çıkış mesafesi **9 metre ile sınırlıdır**; daha yüksek fribordda kombinasyon düzeni gerekir. Merdiven sertifikalı, işaretli, hasarsız ve doğru kurulmuş olmalıdır. **Gemide önemi:** Pilot transferi kazalarının çoğu hasarlı, yanlış kurulmuş veya standart dışı merdivenden kaynaklanır; her transfer öncesi merdivenin kontrolü doğrudan bir can güvenliği tedbiridir.",
        formula: {
          text: "Basamak aralığı ≈ 310–350 mm · spreader ≤ her 9 basamakta · tek merdiven max 9 m",
          description: "SOLAS V/23 ve IMO A.1045(27) standardı; merdiven onaylı sağlam noktadan emniyete alınır",
        },
      },
      {
        title: "Kombinasyon Düzeni (Pilot/Accommodation Ladder)",
        content:
          "Su hattından güverteye dikey mesafe (fribord) belirli bir sınırı **(yaklaşık 9 m)** aştığında, pilot merdiveni tek başına yeterli ve güvenli değildir; bir **borda merdiveni (accommodation ladder)** ile birleştirilmiş **'kombinasyon düzeni (combination arrangement)'** kullanılır. Böylece pilotun tırmanacağı dikey mesafe güvenli bir seviyede tutulur.\n\n**Nasıl çalışır:** Pilot, deniz seviyesinden **pilot merdiveninden** borda merdiveninin **alt platformuna** çıkar, oradan borda merdiveniyle güverteye ulaşır. Pilot merdiveni, borda merdiveninin platformundan yaklaşık **2 m yukarı** taşacak ve platform hizasında emniyete alınacak şekilde kurulur.\n\n**Geometri ve emniyet:** Borda merdiveni gemiden **uzağa/kıça doğru eğimli**, **alt platform yatay** olmalı; pilot merdiveni ile platform arasındaki **geçiş noktası** güvenli olmalı (uygun açıklık, korkuluk, tutamak). Bazı düzenlerde platformda bir **kapak (trapdoor)** üzerinden geçilir. İki merdivenin **hizası** ve platform kenarının emniyeti kritiktir; pilot bu geçişte en savunmasız andadır.\n\n**Gemide önemi:** Yanlış kurulmuş kombinasyon (platformun eğik olması, pilot merdiveninin yeterli taşmaması, hizasızlık), pilotu iki merdiven arasında dengesiz bırakıp düşmeye yol açar; bu yüzden geometri ve emniyet detayları kurala göre titizlikle uygulanır.",
        formula: {
          text: "Fribord > ~9 m ⇒ kombinasyon düzeni (pilot merdiveni + borda merdiveni)",
          description: "Pilot merdiveni alt platformdan ~2 m yukarı taşar; borda merdiveni eğik, alt platform yatay olmalıdır",
        },
      },
      {
        title: "Yardımcı Donanım ve Gözetim",
        content:
          "Pilot transferinde, düşme ve boğulma ihtimaline karşı **yardımcı donanım hazır** bulundurulur. Transfer noktasının yakınında **ışıklı ve halatlı bir can simidi (lifebuoy with self-igniting light and buoyant line)** bulunur; pilot suya düşerse hemen atılır. Gerektiğinde bir **atkı halatı (heaving line)** ve pilot isterse bir **can halatı (man-rope)** sağlanır. Gece transferlerinde bordadaki merdiven ve su yüzeyi **iyi aydınlatılır** (parlama pilotun/pilot teknesinin gözünü almadan).\n\n**Güverteye güvenli geçiş:** Pilotun merdivenin üstünden güverteye çıkarken tutunabilmesi için borda kenarında **korkuluk/tutamak (stanchions, man-ropes)** ve güvenli bir geçiş bulunmalıdır; **pilot kapısı (shell door)** kullanılıyorsa eşik ve geçiş emniyeti sağlanır.\n\n**Gözetim:** Operasyon, **sorumlu bir zabit** tarafından telsizle köprüüstüyle irtibatlı biçimde gözetlenir; zabit, merdivenin doğru kurulduğunu doğrular ve **pilot güverteye güvenle ulaşana kadar onu yalnız bırakmaz**. Pilotu karşılayıp köprüüstüne götürecek bir refakatçi hazır olur.\n\n**Gemide önemi:** Yardımcı donanımın hazır ve gözetimin sürekli olması, bir düşme anında saniyelerin önem taşıdığı bu operasyonda pilotun hayatını kurtarır; ihmal edilen bir can simidi veya gözetimsiz bir transfer ölümcül sonuç doğurabilir.",
      },
      {
        title: "Manevra, Kontrol ve Emniyet",
        content:
          "Transfer sırasında **manevra ve zamanlama**, pilot teknesinin güvenliği için kritiktir. Gemi, pilot teknesine **zayıf bir su (lee) oluşturacak** şekilde manevra eder — yani rüzgâr/dalgaya göre bordasını siper yapıp pilot teknesinin çalışacağı tarafı sakinleştirir — ve pilot botunun yanaşmasına uygun bir **hızda** seyreder (genelde tekne yanaşabilecek kadar yol tutulur). Ani rota/hız değişimi ve aşırı yalpa tehlikelidir.\n\n**Kontrol disiplini:** Pilot merdiveni **her kullanım öncesi ve sonrası** kontrol edilir; her transfer öncesi sorumlu zabit donanımın doğru kurulduğunu bir **kontrol listesiyle** doğrular (basamaklar sağlam mı, spreader yerinde mi, bağlantı emniyetli mi, aydınlatma ve can simidi hazır mı).\n\n**Neden bu kadar titizlik:** Pilot transferi kazaları — bazıları ölümcül — düzenli olarak yaşanır ve kök nedenleri genellikle **hasarlı/yanlış kurulu merdiven, yetersiz aydınlatma, eksik yardımcı donanım veya gözetimsizliktir**. Bunların hepsi önlenebilir nedenlerdir.\n\n**Gemide önemi:** Rutin görünen bu operasyon, denizciliğin en ölümcül rutin işlerinden biridir; kontrol listesi, doğru manevra ve disiplinli gözetim, bir kılavuz kaptanın hayatı ile trajedi arasındaki farktır.",
      },
    ],
    keyPoints: [
      "Pilot merdiveni standart basamak/yan halat/spreader içerir ve onaylı noktadan emniyete alınır.",
      "Fribord ~9 m'yi aşınca pilot + borda merdiveni 'kombinasyon düzeni' kullanılır.",
      "Işıklı can simidi, man-rope, aydınlatma hazır; transfer sorumlu zabitçe gözetlenir.",
      "Gemi pilot teknesine lee oluşturur; her transfer öncesi donanım kontrol edilir.",
    ],
  },

  "Köprüüstü Vardiyası ve Gözcülük": {
    title: "Köprüüstü Vardiyası ve Gözcülük",
    introduction:
      "Emniyetli seyrin temeli, iyi tutulan bir köprüüstü vardiyasıdır. STCW ve COLREG Kural 5, her an uygun bir gözcülük (lookout) tutulmasını ve durumun sürekli değerlendirilmesini zorunlu kılar. Vardiya zabiti, geminin emniyetinden o vardiyada doğrudan sorumludur.",
    sections: [
      {
        title: "Gözcülük (Lookout) — COLREG Kural 5",
        content:
          "Emniyetli seyrin temel şartı, **COLREG Kural 5**'in gerektirdiği uygun gözcülüktür. Kural şöyle der: her gemi, **görme ve işitmenin yanı sıra o anki koşullara uygun tüm mevcut araçlarla** (radar, ARPA, AIS, dürbün, VHF dinleme) **sürekli ve uygun bir gözcülük** tutmalıdır. Amaç açıkça belirtilir: **durumun ve çatışma riskinin tam olarak değerlendirilmesi**.\n\n**Gözcülük yalnızca ekrana bakmak değildir:** İyi gözcülük görsel ve işitsel uyanıklığı da kapsar — ışıklar, şekiller, sis işaretleri, diğer geminin manevrası. Radar/ARPA ve AIS bunları **tamamlar**, yerine geçmez; yalnız ekrana güvenmek (radar-assisted collision) klasik bir kaza nedenidir.\n\n**Çatışma riskinin değerlendirilmesi:** COLREG Kural 7'ye göre, yaklaşan bir geminin **pusula kerterizi belirgin biçimde değişmiyor ve mesafe azalıyorsa çatışma riski vardır** (constant bearing, decreasing range — CBDR). Şüphe varsa risk **var kabul edilir**.\n\n**Ayrı gözcü ne zaman:** Gece, kısıtlı görüşte veya yoğun trafikte **ayrı bir gözcü (dedicated lookout)** atanır. Vardiya zabiti tek başına gözcülüğü **yalnızca gündüz, açık havada, güvenli koşullarda ve geçici** olarak üstlenebilir; bu koşullar bozulunca hemen gözcü çağrılır (STCW A-VIII/2). **Gemide önemi:** Çatışmaların büyük çoğunluğunun kök nedeni yetersiz gözcülüktür; sürekli ve çok yöntemli gözcülük, kaçınma manevrası için gereken erken uyarıyı sağlar.",
        formula: {
          text: "Çatışma riski: pusula kerterizi ~sabit + mesafe azalıyor ⇒ risk var (CBDR)",
          description: "COLREG Kural 7; şüphe hâlinde risk var kabul edilir ve erken, belirgin manevra yapılır",
        },
      },
      {
        title: "Vardiya Devir-Teslimi ve Sorumluluk",
        content:
          "Vardiya **devir-teslimi (handover)** eksiksiz ve net yapılır; devralan zabit durumu tam olarak kavramadan sorumluluğu almaz. Aktarılan bilgiler: geminin **mevkisi, rotası, hızı**, çevredeki **trafik** ve takip edilen hedefler, **hava ve görüş**, **seyir planı** (bir sonraki dönüş/waypoint, tehlikeler), yürürlükteki **özel talimatlar** ve **kaptanın çağrılma (call) koşulları**.\n\n**Devir kuralları:** Devralan zabit **durumu kendisi doğrulamadan** vardiyayı kabul etmez; bir **manevra anında devir yapılmaz** (önce manevra tamamlanır). Gözleri karanlığa uyum sağlamadan (gece) sorumluluk devralınmaz.\n\n**Sorumluluk kimde:** Vardiya zabiti, **kaptan köprüüstünde olsa bile**, kaptan açıkça 'komutu ben alıyorum' diyene ve bunu deftere işletene kadar seyirden **sorumlu olmaya devam eder**. Bu netlik, 'sorumluluğun havada kaldığı' tehlikeli belirsizliği önler.\n\n**Kaptanı çağırmak:** Şüphe, kısıtlı görüş, yoğun trafik, arıza veya planın bozulması gibi STCW'de tanımlı durumlarda **kaptan çağrılır**. Kaptanı çağırmak bir zayıflık değil, doğru ve beklenen bir uygulamadır; geç çağırmak ise birçok kazanın ortak nedenidir. **Gemide önemi:** Net devir-teslim ve net sorumluluk zinciri, insan hatasının ve iletişim boşluklarının kaza doğurmasını engeller.",
      },
      {
        title: "Yorgunluk ve Dinlenme Süresi",
        content:
          "Yorgunluk, insan hatasının ve seyir kazalarının **başlıca nedenlerinden biridir**; uykusuzluk, dikkat, tepki süresi ve karar kalitesini alkolle karşılaştırılabilir düzeyde bozar. Bu yüzden dinlenme süreleri kuralla güvence altına alınır.\n\n**STCW asgari dinlenme:** Herhangi bir **24 saatlik** dilimde en az **10 saat**, herhangi bir **7 günlük** dilimde en az **77 saat** dinlenme gerekir. Dinlenme en fazla **iki bölüme** ayrılabilir ve bölümlerden biri en az **6 saat kesintisiz** olmalıdır; iki dinlenme arası **14 saati** geçmemelidir. MLC 2006 da paralel çalışma/dinlenme sınırları getirir.\n\n**Kayıt ve denetim:** Dinlenme saatleri **kayıt altına alınır** ve Liman Devleti Kontrolü (PSC) tarafından denetlenebilir; sistematik ihlal, hem emniyet hem uygunluk sorunudur.\n\n**Yorgunluk yönetimi:** Vardiya düzeni (örn. 4 saat/8 saat), görev yükü ve liman/manevra yoğunluğu dinlenmeyi tüketebileceğinden, kaptan iş programını dinlenmeyi koruyacak şekilde planlar. **Gemide önemi:** Yorgun bir vardiya zabiti uygun gözcülük tutamaz ve mikro-uykularla (dalıp gitme) tüm gemiyi tehlikeye atar; dinlenme kuralları bu yüzden bir formalite değil, doğrudan seyir emniyetidir.",
        formula: {
          text: "Dinlenme: ≥10 saat/24 saat ve ≥77 saat/7 gün",
          description: "STCW asgari; en fazla 2 bölüm (biri ≥6 saat kesintisiz), iki dinlenme arası ≤14 saat",
        },
      },
      {
        title: "BRM ve Durumsal Farkındalık",
        content:
          "**Köprüüstü Kaynak Yönetimi (Bridge Resource Management, BRM)**, köprüüstündeki tüm kaynakların — insan, ekipman ve bilgi — etkin ve koordineli kullanılmasıdır. Amaç, tek bir kişinin hatasının kazaya dönüşmeden **yakalanmasıdır**.\n\n**İyi BRM'in unsurları:** Net **görev dağılımı** (kim dümende, kim seyirde, kim gözcü), **kapalı-döngü iletişim** (verilen komutun geri okunması), **çapraz kontrol (cross-check)** ve **sor-cevapla (challenge-and-response)** disiplini. Kıdem farkı (**authority gradient**) astın kaptanı uyarmasını engellememelidir; birçok kaza, bir ekip üyesinin gördüğü tehlikeyi söylemeye çekinmesinden doğmuştur.\n\n**Durumsal farkındalık (situational awareness):** Üç katmanlıdır — çevreyi **algılamak** (ne var?), anlamını **kavramak** (ne demek?) ve geleceğe **yansıtmak** (ne olacak?). Bu zincirin herhangi bir halkası koptuğunda (örn. yanlış tanınan bir ışık, gözden kaçan bir hedef) farkındalık kaybolur ve kaza gelir.\n\n**Otomasyon tuzağı:** ECDIS, otopilot ve ARPA güçlü araçlardır ama **aşırı güven** tehlikelidir; sistem hatası, yanlış girdi veya 'ekrana kilitlenme' gerçek durumu gizleyebilir. Bu yüzden otomasyon **çapraz kontrol** edilir (örn. ECDIS mevkisi görsel/radar kerterizle teyit edilir) ve tek kişiye bağımlılıktan kaçınılır. **Gemide önemi:** Modern köprüüstü kazalarının çoğu ekipman arızasından değil, zayıf BRM ve kaybedilen durumsal farkındalıktan kaynaklanır; disiplinli ekip çalışması bunları önler.",
      },
    ],
    keyPoints: [
      "COLREG Kural 5: görsel, işitsel ve tüm araçlarla (radar/ARPA/AIS) sürekli uygun gözcülük.",
      "Devir-teslimde mevki/rota/trafik/talimatlar aktarılır; devralan doğrulamadan kabul etmez.",
      "STCW dinlenme: ≥10 saat/24 saat, ≥77 saat/7 gün; yorgunluk kazaların başlıca nedeni.",
      "İyi BRM ve durumsal farkındalık esastır; otomasyona aşırı güven tehlikelidir.",
    ],
  },

  "Manevra ve Gemi Hareketi": {
    title: "Manevra ve Gemi Hareketi",
    introduction:
      "Gemi manevrası (shiphandling), geminin dümen, makine ve dış kuvvetler (rüzgâr, akıntı, sığ su) altındaki hareketini öngörüp kontrol etmektir. Büyük gemiler yavaş tepki verir ve durması uzun mesafe alır; bu nedenle manevra, fiziksel etkileri önceden hesaba katmayı gerektirir.",
    sections: [
      {
        title: "Dönme Dairesi ve Pivot Noktası",
        content:
          "Gemi dümen kırdığında düz gitmez; bir **dönme dairesi (turning circle)** çizer. Bu dairenin geometrisi standart terimlerle tanımlanır: **advance** (dümen kırıldıktan sonra baş yönünde alınan yol), **transfer** (yana kayma) ve **taktik çap (tactical diameter — 180° dönüşteki en büyük yanal mesafe)**. Dönerken geminin baş-kıç ekseni ile gerçek hareket yönü arasında bir **sürüklenme açısı (drift angle)** oluşur.\n\n**Pivot noktası (pivot point):** Gemi, üzerinde döner göründüğü bir nokta olan **pivot noktası** etrafında döner. **İleri yolda** bu nokta baştan yaklaşık **geminin boyunun 1/4'ü (L/4)** kadar geride, **tornistanda** ise kıça yakın olur. Pivot noktasının yeri önemlidir çünkü dümen, römorkör ve yanal kuvvetlerin yaratacağı **dönme momentinin kol uzunluğunu** belirler: kuvvet pivottan ne kadar uzaksa dönme etkisi o kadar büyüktür.\n\n**Kıç atması (kick):** Dümen kırıldığı ilk anda kıç, dönülen yönün **tersine** doğru dışa atar (kick); dar suda veya rıhtım yakınında bu, kıçın bir şeye çarpması açısından önemlidir.\n\n**Gemide önemi:** Manevra kararları (ne zaman dümen kıracağı, römorkörü nereye bağlayacağı, dar kanalda dönüşü nasıl planlayacağı) pivot noktası ve dönme dairesi bilgisine dayanır; bunları bilmeyen bir köprüüstü, dönüşü geç başlatıp sığlığa/kıyıya bindirebilir.",
        formula: {
          text: "Pivot noktası: ileri yolda ≈ baştan L/4 geride · tornistanda kıça yakın",
          description: "Kuvvetin pivota uzaklığı dönme momentini belirler; dümen ilk anda kıçı ters yöne atar (kick)",
        },
      },
      {
        title: "Durma Mesafesi ve Atalet",
        content:
          "Büyük bir gemi çok yüksek **kinetik enerji** taşır (**KE = ½ m V²**); bu enerji hızın **karesiyle** arttığından hız iki katına çıkınca durma zorluğu dört katına çıkar. Makine stop veya tornistan verildiğinde gemi hemen durmaz; uzun bir **durma mesafesi (stopping distance / head reach)** boyunca ilerler.\n\n**Crash stop:** Acil durma (crash stop) manevrasında bile, yüklü büyük bir gemi (örn. bir VLCC) **kilometrelerce** yol alabilir ve durması on dakikaları bulabilir. Ayrıca çoğu gemide **tornistan gücü ileri gücün yalnızca bir bölümüdür**, bu yüzden geriye doğru frenleme kabiliyeti sınırlıdır; tornistan verildiğinde pervane yan itmesi başı da çevirebilir.\n\n**Sonuç — erken ve kademeli:** Bu atalet, çatışmadan kaçınmada ve liman yaklaşımında **erken ve kademeli hız azaltmayı** zorunlu kılar; son ana bırakılan fren işe yaramaz. **COLREG Kural 6 (emniyetli hız)**, tam olarak geminin durma/manevra kabiliyetini, görüşü, trafiği ve su derinliğini dikkate almayı gerektirir.\n\n**Gemide önemi:** 'Gemiyi hızla durdururum' varsayımı büyük gemilerde geçersizdir; deneyimli manevra, geminin kolay duramayacağını bilip mesafeyi ve hızı çok önceden yönetmeye dayanır.",
        formula: {
          text: "Kinetik enerji = ½ m V² (hız 2× ⇒ durma zorluğu 4×)",
          description: "Durma mesafesi hıza güçlü bağlıdır; tornistan gücü ileri gücün bir bölümüdür, erken/kademeli yavaşlanır",
        },
      },
      {
        title: "Sığ Su Etkisi: Squat ve Tabana Yaklaşma",
        content:
          "Sığ suda, geminin altından geçen su daralan kesitte **hızlanır** ve **Bernoulli** ilkesi gereği basıncı düşer; bu düşük basınç gemiyi aşağı çeker, gemi suya **gömülür ve trim değiştirir**. Bu olaya **squat** denir ve geminin etkin draftını artırır.\n\n**Neye bağlı:** Squat, **hızın karesiyle (V²)** hızla artar; ayrıca geminin dolgunluğu (**blok katsayısı Cb**) ve suyun ne kadar kısıtlı olduğu (kanal/sığlık — blockage) squat'ı büyütür. Açık sığ suda yaygın **Barrass yaklaşımı**: maksimum squat ≈ Cb × V² ÷ 100 (metre, V knot). **Worked example:** Cb = 0.80 ve V = 12 knot için squat ≈ 0.80 × 12² ÷ 100 = 0.80 × 144 ÷ 100 ≈ **1.15 m**; dar kanalda bu değer yaklaşık iki katına çıkabilir. Hız 6 knota inerse squat ≈ 0.29 m'ye (dörtte bir) düşer — yani **hızı yarıya indirmek squat'ı dörtte bire indirir**.\n\n**Altta su payı (UKC):** Aşırı squat, geminin tabana değmesine (**grounding**) veya dümen etkinliğinin bozulmasına yol açar. Bu yüzden sığ/dar sularda yeterli **altta su payı (Under Keel Clearance, UKC)** planlanır ve **hız düşürülür** (squat'ı azaltmanın en pratik yolu). **Gemide önemi:** Birçok karaya oturma, hesaba katılmayan squat yüzündendir; derinlik azaldıkça hızı düşürmek hem squat'ı hem riski keser.",
        formula: {
          text: "Maks. squat ≈ Cb × V² ÷ 100 (m, açık su; Barrass) — örn. 0.8×12²/100 ≈ 1.15 m",
          description: "Squat hızın karesiyle artar; hızı yarıya indirmek squat'ı dörtte bire düşürür, dar suda ~iki kat",
        },
      },
      {
        title: "Etkileşim: Banka ve Gemi-Gemi Etkisi",
        content:
          "Dar kanallarda, sığ suda ve yakın geçişlerde geminin çevresindeki **basınç alanları** (baştaki yüksek basınç, ortadaki düşük basınç) diğer sınırlarla etkileşir; buna **etkileşim (interaction)** denir.\n\n**Banka etkisi (bank effect):** Gemi bir kıyıya/banka yaklaştığında, baştaki yüksek basınç başı kıyıdan **iterken (bank cushion)**, ortadaki-kıçtaki düşük basınç kıçı kıyıya **çeker (bank suction)**. Sonuç, geminin ani sapması (**sheer**) ve kontrolü zorlaşan bir dönme momentidir; bu yüzden dar kanalda gemi mümkünse **ortada** seyreder ve hız düşürülür.\n\n**Gemi-gemi etkileşimi:** Yan yana geçen (passing) veya yanaşarak geçen (overtaking) iki gemi arasındaki basınç alanları önce **itme**, sonra **çekme** kuvvetleri ve dönme momentleri yaratır; küçük gemi büyük geminin yanından geçerken bu etki onu tehlikeli biçimde savurabilir. Etki, **hızın karesiyle** ve azalan mesafeyle büyür ve sığ suda çok daha şiddetlidir.\n\n**Nasıl yönetilir:** Bu kuvvetler **hız azaltarak**, mümkün olan **mesafeyi koruyarak** ve etkiyi öngörüp **önceden dümen düzeltmesi** yaparak yönetilir. **Gemide önemi:** Banka ve gemi-gemi etkileşimi, dar sularda ani sheer ve çatışma/karaya oturmaya yol açabilir; kanal seyrinde düşük hız ve erken düzeltme, bu görünmez kuvvetlere karşı temel savunmadır.",
      },
    ],
    keyPoints: [
      "Gemi pivot noktası etrafında döner; ileri yolda baştan ~L/4 geride, tornistanda kıça yakın.",
      "Büyük gemi yüksek ataletlidir; durma mesafesi uzundur, hız erken ve kademeli azaltılır.",
      "Squat hızın karesiyle artar; sığ suda hız azaltmak ve yeterli UKC planlamak gerekir.",
      "Banka ve gemi-gemi etkileşimi sapma/çekme yaratır; hız ve mesafe ile yönetilir.",
    ],
  },
};
