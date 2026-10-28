// Single source of truth for the "Gemici Bağları" reference shown on
// src/pages/SailorKnots.tsx.
//
// This list is intentionally focused on the knots most used in everyday
// seamanship (the core set taught by the Turkish Coast Guard and sailing
// schools): adi düğüm, izbarço, kazık bağı, camadan, sancak (iskota) ve
// çifte sancak, kropi/sekizli, iki yarım anele, camadan voltası, koç
// boynuzuna volta, barbarişka, dülger bağı, demir bağı, balıkçı bağı,
// yoma bağı, margarita (çürük bağı), çifte balıkçı bağı and maymun yumruğu,
// plus bowline on a bight, running and Spanish bowline, figure 8 loop, eye
// splice, heaving line knot, marlinspike, midshipman's and trucker's hitch.
// Knots whose Turkish name is not confirmed use the English name as `name`.
//
// Each knot is now demonstrated with a real, verified knot-tying VIDEO
// (`videoId`, a YouTube id) instead of a static diagram. The old low-resolution,
// unsourced diagrams under /public/knots/ were removed; when the video thumbnail
// cannot load, the card shows the knot name instead. Every videoId was checked against YouTube's oEmbed endpoint
// to confirm it is live and embeddable, and that its title matches the knot.
//
// Terminology (denizcilik terimleri):
//   • çıma  → halatın serbest / çalışan ucu (the working / running end)
//   • beden → halatın ana gövdesi (the standing part)
//   • kasa  → halatta oluşturulan göz / sabit ilmek (an eye / fixed loop)
//   • gözcük→ halatın ikiye katlanmış U kısmı (a bight)

export interface KnotStep {
  title: string;
  description: string;
}

export type KnotCategory = "durdurucu" | "kasa" | "bag" | "ekleme" | "kisaltma";

export interface SailorKnot {
  id: string;
  name: string;
  nameEn: string;
  /** Other common Turkish names; used for search only, never displayed. */
  aka?: string[];
  category: KnotCategory;
  /** What the knot is for, in one or two sentences. */
  use: string;
  /** Approximate strength loss vs. an undamaged line, when known. */
  strengthLoss?: string;
  steps: KnotStep[];
  /** A single practical pointer — a common mistake or the key to getting it right. */
  tip?: string;
  /** YouTube video id of a verified knot-tying demonstration. */
  videoId: string;
  /** Source / channel credit for the video. */
  videoCredit: string;
  /**
   * Optional still of the finished knot under /public/knots/, used as the video
   * poster when YouTube's thumbnail cannot load (offline). Only real, sourced,
   * high-resolution photos belong here; leave it out rather than use a weak one.
   */
  image?: string;
}

const GROG = "Animated Knots by Grog (YouTube)";
const BOATUS = "BoatUS (YouTube)";
const HELPFUL_DIY = "Helpful DIY (YouTube)";
const HOWCAST = "Howcast (YouTube)";
const ART_OF_KNOT_TYING = "The Art of Knot Tying (YouTube)";

export const KNOT_CATEGORY_ORDER: KnotCategory[] = [
  "durdurucu",
  "kasa",
  "bag",
  "ekleme",
  "kisaltma",
];

export const KNOT_CATEGORY_LABELS: Record<
  KnotCategory,
  { title: string; subtitle: string }
> = {
  durdurucu: {
    title: "Durdurucu ve Bağlama Düğümleri",
    subtitle: "Çımayı durdurur veya iki ucu birbirine bağlar",
  },
  kasa: {
    title: "Kasalar",
    subtitle: "Halatın ucunda kaymayan sabit bir kasa (göz) oluşturur",
  },
  bag: {
    title: "Bağlar",
    subtitle: "Halatı bir nesneye (baba, ring, çubuk, koç boynuzu) bağlar",
  },
  ekleme: {
    title: "Eklemeler",
    subtitle: "İki ayrı halatı uç uca birleştirir",
  },
  kisaltma: {
    title: "Kısaltmalar",
    subtitle: "Halatı kesmeden kısaltır veya yıpranmış kısmı yükten kurtarır",
  },
};

export const SAILOR_KNOTS: SailorKnot[] = [
  // ── Durdurucu ve bağlama düğümleri ───────────────────────────────────────
  {
    id: "overhand-knot",
    name: "Adi Düğüm",
    nameEn: "Overhand Knot",
    aka: ["Yarım Düğüm", "Kör Düğüm"],
    category: "durdurucu",
    use: "Tüm denizci bağlarının temelini oluşturan en basit durdurucu düğümdür. Çımanın makara/blok gözünden kaçmasını ve halatın fitillerine ayrılıp dağılmasını geçici olarak önler.",
    strengthLoss: "~%60 dayanım kaybı",
    videoId: "I0ShGbIR0ZI",
    videoCredit: GROG,
    steps: [
      { title: "Kasa oluştur", description: "Çımayı bedenin üzerinden geçirerek küçük bir kasa (göz) oluşturun." },
      { title: "Çımayı içinden geçir", description: "Çımayı oluşan kasanın içinden geçirin." },
      { title: "Çekip sıkın", description: "Çımayı ve bedeni ters yönlerde çekerek düğümü sıkın." },
    ],
    tip: "Yük altında çok sıkışır ve zor çözülür; kalıcı durdurucu gerektiğinde sekizli (kropi) düğümü tercih edin. Buna rağmen birçok bağın yapı taşı olduğu için ilk öğrenilmesi gereken düğümdür.",
  },
  {
    id: "figure-eight",
    name: "Sekizli Düğüm",
    nameEn: "Figure-of-Eight",
    aka: ["Kropi Bağı", "Sekiz Düğümü"],
    category: "durdurucu",
    use: "Çımaya atılan durdurucu (stopper) düğümdür; halatın bloktan, makaradan veya bir delikten kaçmasını önler. Yük altında bile kolay çözülür.",
    strengthLoss: "~%25 dayanım kaybı",
    videoId: "EtzeIQjcKEs",
    videoCredit: GROG,
    steps: [
      { title: "Kasa oluştur", description: "Çımayla beden halatının üzerinde bir kasa (göz) oluşturun." },
      { title: "Çımayı arkadan dola", description: "Çımayı bedenin arkasından dolayarak '8' şeklini başlatın." },
      { title: "Kasadan geçirip çek", description: "Çımayı ilk kasanın içinden geçirip her iki taraftan çekerek sekizi sıkın." },
    ],
    tip: "Adi düğümün (overhand) aksine sekizli, yük altında sıkışsa bile rahat çözülür — bu yüzden tercih edilir. Türkçede çoğu zaman 'Kropi bağı' olarak da anılır.",
  },
  {
    id: "reef-knot",
    name: "Camadan Bağı",
    nameEn: "Reef / Square Knot",
    aka: ["Yassı Düğüm"],
    category: "durdurucu",
    use: "Aynı çaptaki iki halatın çımasını birbirine bağlar (binding/bağlama düğümü). Yelken ve branda toplamada yaygındır.",
    strengthLoss: "~%55 dayanım kaybı",
    videoId: "0Y_iorha2k4",
    videoCredit: GROG,
    steps: [
      { title: "Sol çımayı sağ çımanın üzerinden", description: "Sol çımayı sağ çımanın üzerinden alıp altından geçirin (sol-sağ)." },
      { title: "Sağ çımayı sol çımanın üzerinden", description: "Şimdi sağ çımayı sol çımanın üzerinden alıp altından geçirin (sağ-sol)." },
      { title: "İki çifti çekip sıkın", description: "Her iki çımayı birden çekin; yatık, simetrik bir düğüm oluşur. Çımalar bedenle aynı tarafta çıkmalıdır." },
    ],
    tip: "Yük taşıyan eklerde güvenilir DEĞİLDİR; farklı çaplı halatlarda kayar. Sadece toparlama/bağlama işi içindir, can emniyetinde kullanmayın.",
  },

  {
    id: "monkeys-fist",
    name: "Maymun Yumruğu",
    nameEn: "Monkey's Fist",
    category: "durdurucu",
    use: "Atma halatının ucuna atılan top şeklindeki düğümdür. Halata ağırlık vererek rıhtıma veya başka bir gemiye daha uzağa ve isabetle atılmasını sağlar.",
    videoId: "gp9w-T2d_NY",
    videoCredit: GROG,
    steps: [
      { title: "Birinci sarımlar", description: "Halatı parmaklarınızın etrafına üç tur sarın." },
      { title: "İkinci sarımlar", description: "Çımayla bu turların etrafına, onlara dik olarak üç tur daha sarın." },
      { title: "Üçüncü sarımlar", description: "Çımayı birinci turların içinden ve ikinci turların etrafından geçirerek üç tur daha sarın." },
      { title: "Sıkıp top şekli ver", description: "Boşluğu sarımlar boyunca sırayla alarak düğümü top şekline getirin ve çımayı bedene emniyetleyin." },
    ],
    tip: "İçine metal veya ağır bir cisim koymayın: atma halatı karşıdaki personele isabet edebilir ve ağır bir maymun yumruğu ciddi yaralanmaya yol açar.",
  },
  {
    id: "heaving-line-knot",
    name: "Heaving Line Knot",
    nameEn: "Heaving Line Knot",
    category: "durdurucu",
    use: "Atma halatının ucuna hızlıca ağırlık vermek için yapılan sarımlı düğümdür. Maymun yumruğundan daha çabuk atılır.",
    videoId: "wMH4b1a0lVo",
    videoCredit: GROG,
    steps: [
      { title: "Uzun gözcük al", description: "Halatın ucuna yakın uzun bir gözcük alın." },
      { title: "Gözcüğü sar", description: "Çımayı gözcüğün iki bacağının etrafına, gözcüğün ucuna doğru sık sarımlarla sarın." },
      { title: "Çımayı gözden geçir", description: "Yeterli sarımdan sonra çımayı gözcüğün ucunda kalan gözden geçirin." },
      { title: "Bedeni çekip kilitle", description: "Bedeni çekerek gözü sarımların içine alın ve çımayı kıstırın." },
    ],
    tip: "Sarımlar sık ve düzgün olmalıdır; gevşek sarımlar atış sırasında açılır.",
  },

  // ── Kasalar (loops) ──────────────────────────────────────────────────────
  {
    id: "bowline",
    name: "İzbarço Bağı",
    nameEn: "Bowline",
    aka: ["Kazık Kasası"],
    category: "kasa",
    use: "Halatın ucunda yük altında sıkışmayan, kolayca çözülebilen sabit bir kasa (göz) oluşturur. Can kurtarma, palamar geçirme ve genel amaçlı kullanımda en önemli denizcilik düğümüdür.",
    strengthLoss: "~%40 dayanım kaybı",
    videoId: "YXRnPES0Qec",
    videoCredit: GROG,
    steps: [
      { title: "Beden üzerinde küçük kasa", description: "Bedeni serili tutun ve üzerinde küçük bir kasa (tavşan deliği) oluşturun; çıma üstte kalsın." },
      { title: "Kasadan yukarı çık", description: "Çımayı (tavşan) kasanın içinden aşağıdan yukarıya doğru geçirin." },
      { title: "Bedenin arkasından dola", description: "Çımayı beden halatının (ağaç) arkasından dolayın." },
      { title: "Kasadan geri sok", description: "Çımayı tekrar aynı kasanın içinden aşağı doğru geçirin." },
      { title: "Çekip sıkın", description: "Bedeni ve oluşan büyük kasayı ters yönde çekerek düğümü sıkın; kasa istenen boyutta sabitlenir." },
    ],
    tip: "Hatırlatma: tavşan delikten çıkar, ağacın etrafından dolaşır, deliğe geri girer. Çımanın kasanın İÇ tarafında kalması doğru izbarçonun işaretidir.",
  },
  {
    id: "bowline-on-a-bight",
    name: "Bowline on a Bight",
    nameEn: "Bowline on a Bight",
    category: "kasa",
    use: "Halatın uçlarına gerek kalmadan, ortasında iki sabit kasa oluşturur. Kasalar yük altında kaymaz; yükü iki noktaya dağıtmak veya acil durumda bir kişiyi kaldırmak için kullanılır.",
    videoId: "CDZOYUZabV4",
    videoCredit: GROG,
    steps: [
      { title: "Gözcükle kasa oluştur", description: "Halatı ikiye katlayıp bir gözcük alın; bu çift halatla küçük bir kasa oluşturun." },
      { title: "Gözcüğü kasadan geçir", description: "Gözcüğün ucunu kasanın içinden aşağıdan yukarıya doğru geçirin." },
      { title: "Gözcüğü düğümün etrafından geçir", description: "Gözcüğün ucunu açın, iki büyük kasanın etrafından aşağı indirin ve bedenlerin arkasından yukarı getirin." },
      { title: "Çekip sıkın", description: "Bedenleri çekerek gözcüğü düğümün üzerine oturtun; iki sabit kasa oluşur." },
    ],
    tip: "Düğümü sıkmadan önce iki kasanın boyunu ayarlayın. Uçlara ulaşılamayan uzun bir halatta hızlıca sabit kasa gerektiğinde işe yarar.",
  },
  {
    id: "running-bowline",
    name: "Running Bowline",
    nameEn: "Running Bowline",
    category: "kasa",
    use: "Halatın ucunda, beden çekildikçe daralan kayar bir kasa oluşturur. Ulaşılamayan bir cismi, örneğin denize düşmüş bir nesneyi yakalayıp almak için kullanılır.",
    videoId: "D1m-tr6OAPo",
    videoCredit: GROG,
    steps: [
      { title: "Bedenin etrafından geçir", description: "Çımayı beden halatının etrafından geçirerek büyük bir kasa oluşturun." },
      { title: "Küçük kasa oluştur", description: "Çımaya yakın kısımda, izbarçoda olduğu gibi küçük bir kasa oluşturun." },
      { title: "İzbarçoyu tamamla", description: "Çımayı küçük kasadan yukarı geçirin, arkadan dolayın ve aynı kasadan geri sokun." },
      { title: "Çekip sıkın", description: "İzbarçoyu sıkın; beden çekildikçe büyük kasa daralır." },
    ],
    tip: "Kayar kasa yük altında daraldığı için asla bir kişinin etrafına atılmaz; can kurtarmada sabit kasa veren izbarço kullanılır.",
  },
  {
    id: "spanish-bowline",
    name: "Spanish Bowline",
    nameEn: "Spanish Bowline",
    category: "kasa",
    use: "Halatın ortasında iki sabit kasa oluşturur. Bir merdiveni veya acil durumda bir kişiyi kaldırmak ve yükü iki noktaya dağıtmak için kullanılır.",
    videoId: "eKe8h4fNVAA",
    videoCredit: GROG,
    steps: [
      { title: "Gözcük al ve geri katla", description: "Halatta uzun bir gözcük alın ve gözcüğün ucunu bedenlerin üzerine geri katlayarak iki kulak oluşturun." },
      { title: "Kulakları kasaya çevir", description: "Her kulağı yarım tur çevirerek iki küçük kasa oluşturun." },
      { title: "Kasaları iç içe geçir", description: "Sol kasayı sağ kasanın içinden geçirin." },
      { title: "Büyük kasaları çekip sıkın", description: "Her küçük kasanın içinden, alttaki büyük gözcüğün karşı kenarını yukarı çekin; iki büyük kasa oluşunca düğümü sıkın." },
    ],
    tip: "Sıkmadan önce iki kasanın boyunu eşitleyin; böylece kaldırılan yük dengeli asılır.",
  },
  {
    id: "figure-eight-loop",
    name: "Figure 8 Loop",
    nameEn: "Figure 8 Follow Through Loop",
    category: "kasa",
    use: "Halatın ucunda sabit ve çok emniyetli bir kasa oluşturur. Takip ederek atıldığı için kasa bir ringin veya kemerin içinden geçirilerek yapılabilir. Yük altında sıkışır ve zor çözülür.",
    videoId: "aLopeVBb7yU",
    videoCredit: GROG,
    steps: [
      { title: "Gevşek sekizli at", description: "Çımadan yeterli boy bırakarak halata gevşek bir sekizli düğüm atın." },
      { title: "Nesneden geçir", description: "Çımayı ringin veya bağlanacak nesnenin içinden geçirin." },
      { title: "Sekizliyi takip et", description: "Çımayı ilk sekizlinin yolunu ters yönde birebir izleyerek geri geçirin." },
      { title: "Çekip sıkın", description: "Dört kolu ayrı ayrı çekerek çift halat kısımlarının düzgün yan yana yattığından emin olun." },
    ],
    tip: "Düğümden sonra çımada halat çapının birkaç katı uzunluk bırakın.",
  },
  {
    id: "eye-splice",
    name: "Eye Splice",
    nameEn: "Eye Splice",
    category: "kasa",
    use: "Üç kollu halatın ucunda kalıcı bir göz oluşturur. Halatı düğümlerden çok daha az zayıflatır; palamar ve bağlama halatlarının gözleri bu yöntemle yapılır.",
    videoId: "3cZOn-vT0xA",
    videoCredit: GROG,
    steps: [
      { title: "Kolları aç", description: "Kolları beş-altı büküm boyunca açın ve her kolun ucunu bantlayın." },
      { title: "Gözü oluştur, ilk kolu sok", description: "Halatı istenen göz boyunda bükün; ortadaki kolu bedenin bir kolunun altından, bükümün tersine sokun." },
      { title: "İkinci ve üçüncü kolu sok", description: "İkinci kolu bir sonraki kolun altından sokun; halatı çevirip üçüncü kolu kalan kolun altından sokun. Her kol farklı bir aralıktan çıkmalıdır." },
      { title: "Sokmaları tamamla", description: "Her kolu birinin üzerinden, diğerinin altından geçirerek sokmaları tekrarlayın; sentetik halatta en az beş tur yapın, sonra uçları kesin." },
    ],
    tip: "Sentetik halat kaygan olduğundan doğal lifli halattan daha fazla sokma ister. İlk sokma turu yanlış olursa ekleme bükülür; ilk turu dikkatle kontrol edin.",
  },

  // ── Bağlar (hitches) ──────────────────────────────────────────────────────
  {
    id: "clove-hitch",
    name: "Kazık Bağı",
    nameEn: "Clove Hitch",
    aka: ["Volta"],
    category: "bag",
    use: "Halatı bir babaya, baraya, çubuğa veya küpeşteye geçici olarak bağlamak için kullanılır. Hızlı atılır ve hızlı çözülür.",
    videoId: "pwdZTHu5rTI",
    videoCredit: GROG,
    steps: [
      { title: "İlk volta", description: "Halatı direğin/çubuğun etrafından bir kez dolayın." },
      { title: "Çaprazlayıp ikinci volta", description: "İlk dönüşün üzerinden çaprazlayarak ikinci voltayı atın." },
      { title: "Çımayı altından geçirip sıkın", description: "Çımayı son dönüşün altından geçirip her iki yönden çekerek kilitleyin." },
    ],
    tip: "Tek başına güvenilir değildir; çımalar serbest kalırsa veya yük yön değiştirirse çözülebilir. Kritik bağlamada ek emniyet voltasıyla destekleyin.",
  },
  {
    id: "two-half-hitches",
    name: "İki Yarım Anele",
    nameEn: "Two Half Hitches",
    aka: ["Yarım Anele Bağı"],
    category: "bag",
    use: "Halatı bir baraya, ringe, babaya veya ağaca hızlıca bağlar. Kendi bedeni üzerine atılan iki yarım anele, yük bindikçe sıkışarak tutan kayar bir kasa oluşturur.",
    videoId: "HjNr7i-uA0M",
    videoCredit: HELPFUL_DIY,
    steps: [
      { title: "Halatı nesneden geçir", description: "Çımayı baranın/ringin etrafından veya içinden geçirin." },
      { title: "Birinci yarım anele", description: "Çımayı beden halatının etrafından dolayıp oluşan gözden geçirerek ilk yarım aneleyi atın." },
      { title: "İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atın; beden üzerinde bir kazık bağı oluşur." },
      { title: "Kaydırıp sıkın", description: "Aneleleri nesneye doğru kaydırıp bedeni çekerek sıkın." },
    ],
    tip: "İki anele de mutlaka AYNI yönde atılmalıdır; ters yönde atılırsa zayıf ve güvensiz olur. Ağır veya sürekli yükte önce bir tam tur ekleyin — bu sizi camadan voltasına götürür.",
  },
  {
    id: "round-turn-two-half-hitches",
    name: "Camadan Voltası",
    nameEn: "Round Turn & Two Half Hitches",
    aka: ["Tam Tur ve İki Yarım Anele"],
    category: "bag",
    use: "Bir halatı baraya, ringe veya babaya emniyetle bağlar. Tam tur yükü taşır, iki yarım anele düğümü kilitler. Yük altında bile bağlanıp çözülebilir.",
    videoId: "FqxESYQWTdQ",
    videoCredit: GROG,
    steps: [
      { title: "Tam tur (round turn)", description: "Halatı baranın/ringin etrafından iki kez dolayın; bu tam tur yükü taşır." },
      { title: "Birinci yarım anele", description: "Çımayı beden halatının etrafından dolayarak ilk yarım aneleyi atın." },
      { title: "İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atıp çekerek kilitleyin." },
    ],
    tip: "Tam tur sürtünmeyle yükü tuttuğu için, gergin bir halatı bağlarken iki yarım aneleyi rahatça atabilirsiniz — bu yüzden iki yarım aneleden daha emniyetlidir.",
  },
  {
    id: "cleat-hitch",
    name: "Koç Boynuzuna Volta",
    nameEn: "Cleat Hitch",
    category: "bag",
    use: "Palamar, şamandıra veya yat halatını güverte koç boynuzuna (cleat) emniyetle bağlar. Yük altında sıkıca tutar, gerektiğinde hızlıca çözülür.",
    videoId: "Gdu1xuJpJEw",
    videoCredit: BOATUS,
    steps: [
      { title: "Uzak boynuzdan tam tur", description: "Halatı önce koç boynuzunun uzak (karşı) boynuzundan dolayarak tam bir tur atın." },
      { title: "Sekiz şeklinde sarımlar", description: "Halatı boynuzların üzerine '8' şeklinde çapraz sarımlar atın." },
      { title: "Kilit volta ile sabitle", description: "Son sarımda ters bir kasa (kilit volta) atarak çımayı kilitleyin; çıma boynuzdan sarkmasın." },
    ],
    tip: "Tek bir kilit volta yeterlidir; fazlası halatı yük altında çözmeyi zorlaştırır. İlk turu daima uzak boynuzdan başlatın.",
  },
  {
    id: "rolling-hitch",
    name: "Barbarişka Bağı",
    nameEn: "Rolling Hitch",
    aka: ["Stoper Bağı"],
    category: "bag",
    use: "Bir halatı, çekiş yönü neredeyse paralelken başka bir gergin halata veya baraya kaymadan bağlar. Irgatta/vinçte sıkışan yüklü bir halatın yükünü almak (stoper koymak) için gemide standart bağdır.",
    videoId: "f4mHoUNHoO0",
    videoCredit: GROG,
    steps: [
      { title: "Yük tarafına iki volta", description: "Çımayı ana halatın/baranın etrafına, yükün geleceği tarafa doğru iki kez dolayın; her volta bir öncekinin üzerine binsin." },
      { title: "Çaprazla ve karşıya geç", description: "Çımayı iki voltanın üzerinden çaprazlayarak yükün ters tarafına geçirin." },
      { title: "Yarım anele ile kilitle", description: "Kazık bağında olduğu gibi bir yarım anele atıp çımayı altından geçirin ve sıkın." },
      { title: "Yükü yavaşça bindir", description: "Yükü bindirmeden önce voltaların düzgün oturduğunu kontrol edin; bağ paralel çekişte kaymadan tutar." },
    ],
    tip: "İki voltayı daima yükün geleceği tarafa atın — bağın kaymamasını sağlayan bu voltalardır. Modern kaygan (polyester/dyneema) halatlarda bir volta daha ekleyin.",
  },
  {
    id: "timber-hitch",
    name: "Dülger Bağı",
    nameEn: "Timber Hitch",
    category: "bag",
    use: "Seren, bumba, kütük gibi silindirik cisimleri sarıp çekmek, yedeklemek veya kaldırmak için kullanılır. Yük altında sıkıca tutar, yük kalkınca kendiliğinden gevşeyip kolayca çözülür.",
    videoId: "WsCU86SDfb4",
    videoCredit: GROG,
    steps: [
      { title: "Cismi dola", description: "Halatı çekilecek cismin (seren, kütük) etrafından dolayın." },
      { title: "Bedenin etrafından geçir", description: "Çımayı beden halatının etrafından dolayıp geri getirin." },
      { title: "Kendi voltasına sar", description: "Çımayı kendi voltasının içine, cisim boyunca 3-4 kez sarıp kıstırın." },
      { title: "Yükleyip kontrol et", description: "Bedeni çekin; sarımlar cisme yapışarak sıkışır ve bağ kilitlenir." },
    ],
    tip: "Sarımlar yük binince sıkıştığı için bağın tutması sürekli gerginliğe bağlıdır. Uzun bir cismi yedeklerken çekilen uca ayrıca bir yarım anele atın (dülger + yarım anele).",
  },
  {
    id: "marlinspike-hitch",
    name: "Marlinspike Hitch",
    nameEn: "Marlinspike Hitch",
    category: "bag",
    use: "Halata geçici olarak bir çubuk takar; çubuk tutamak olarak kullanılarak sargılar ve sürçeler sıkıca çekilir.",
    videoId: "MR61BYTQMwo",
    videoCredit: GROG,
    steps: [
      { title: "Kasa oluştur", description: "Halatta bir kasa oluşturun ve kasayı bedenin üzerine yatırın." },
      { title: "Çubuğu geçir", description: "Çubuğu kasanın bir kenarının üzerinden, bedenin altından ve kasanın diğer kenarının üzerinden geçirin." },
      { title: "Çekip kullan", description: "Halatı çekerek bağı çubuğa oturtun ve çubuğu tutamak olarak kullanın." },
    ],
    tip: "Çubuk çekilince bağ kendiliğinden çözülür; bu yüzden yalnızca çubuk takılıyken tutar.",
  },
  {
    id: "midshipmans-hitch",
    name: "Midshipman's Hitch",
    nameEn: "Midshipman's Hitch",
    category: "bag",
    use: "Halatın ucunda gerginliği ayarlanabilen bir kasa oluşturur. Yük altında kaymadan tutar; yük kalkınca beden boyunca kaydırılarak gerginlik ayarlanır. Tente ve sabitleme halatlarında kullanılır.",
    videoId: "5SiMoqbxxOo",
    videoCredit: GROG,
    steps: [
      { title: "Nesneden geçir", description: "Çımayı direğin etrafından veya ringin içinden geçirin." },
      { title: "Kasa içinde iki volta", description: "Çımayla, kasanın içinde kalacak şekilde bedenin etrafına iki volta atın; ikinci volta birinciyi sıkıştırsın." },
      { title: "Dışarıda yarım anele", description: "Çımayla kasanın dışında bedenin etrafına bir yarım anele atın." },
      { title: "Kaydırıp ayarla", description: "Bağı beden boyunca kaydırarak gerginliği ayarlayın; yük binince yerinde tutar." },
    ],
    tip: "Kaygan halatta kasa içine bir volta daha ekleyin.",
  },
  {
    id: "truckers-hitch",
    name: "Trucker's Hitch",
    nameEn: "Trucker's Hitch",
    category: "bag",
    use: "Halatı bir bağlama noktası üzerinden palanga etkisiyle sıkıca gerdirip bağlar. Güverte yükü, bot ve branda sabitlemede kullanılır.",
    videoId: "8N6blmw006U",
    videoCredit: GROG,
    steps: [
      { title: "Bedende kasa oluştur", description: "Halatın bir ucunu bağlayın ve beden halatının ortasında küçük bir kasa oluşturun." },
      { title: "Alt noktadan geçir", description: "Çımayı alttaki bağlama noktasının (ring, kanca) etrafından geçirin." },
      { title: "Kasadan geçirip gerdir", description: "Çımayı kasanın içinden geçirin ve aşağı doğru çekerek halatı gerdirin." },
      { title: "İki yarım anele ile kilitle", description: "Gerginliği korurken çımayı iki yarım anele ile bağlayın." },
    ],
    tip: "Kasa olarak kayar bir kasa kullanılırsa ağır yük altında devrilip çözülebilir; ağır yüklerde sabit bir kasa tercih edin.",
  },
  {
    id: "anchor-bend",
    name: "Demir Bağı",
    nameEn: "Anchor (Fisherman's) Bend",
    category: "bag",
    use: "Halatı demir bedenine (anchor) veya ringe güvenle bağlar. Islanınca ve yük altında sıkışmaz; sarsıntılı yüke dayanıklıdır.",
    videoId: "gqgz4P1tMzw",
    videoCredit: GROG,
    steps: [
      { title: "Ringden iki kez geçir", description: "Halatı ring/demir içinden iki kez geçirerek bir tam tur (round turn) oluşturun; turu gevşek bırakın." },
      { title: "İlk aneleyi turun içinden", description: "Çımayı beden halatının etrafından dolayıp az önce oluşan turların içinden geçirin." },
      { title: "İkinci anele + emniyet", description: "Beden üzerine bir yarım anele daha atarak kilitleyin; çımayı ince halatla bedene sürce (seizing) yaparak emniyete alın." },
    ],
    tip: "İlk yarım aneleyi tam turun İÇİNDEN geçirmek bu bağı camadan voltasından ayırır ve sarsıntılı yükte tutmasını sağlar.",
  },

  // ── Eklemeler (bends) ─────────────────────────────────────────────────────
  {
    id: "sheet-bend",
    name: "Sancak Bağı",
    nameEn: "Sheet Bend",
    aka: ["İskota Bağı", "Kıstırma Düğümü"],
    category: "ekleme",
    use: "Farklı çaptaki iki halatı birleştirir. Kalın halatla bir gözcük yapılır, ince halat içinden geçirilip kıstırılır. Denizcilikte 'sancak bağı' olarak da bilinir.",
    strengthLoss: "~%45 dayanım kaybı",
    videoId: "vsj7riFkulE",
    videoCredit: GROG,
    steps: [
      { title: "Kalın halatla gözcük", description: "Kalın halatla bir gözcük (bight) oluşturun." },
      { title: "İnce halatı içinden geçir", description: "İnce halatın çımasını gözcüğün içinden aşağıdan yukarı geçirin." },
      { title: "İki bacağın arkasından dola", description: "İnce halatı gözcüğün iki bacağının arkasından dolayın." },
      { title: "Kendi altına kıstırıp çek", description: "Çımayı kendi beden halatının altına kıstırıp çekin." },
    ],
    tip: "İki çıma AYNI tarafta çıkmalı; ters taraflarda çıkarsa düğüm zayıf 'sol kıstırma' olur ve kayabilir. Yük altında uçları gergin tutun.",
  },
  {
    id: "double-sheet-bend",
    name: "Çifte Sancak Bağı",
    nameEn: "Double Sheet Bend",
    aka: ["Çifte İskota Bağı"],
    category: "ekleme",
    use: "Çapları çok farklı, ıslak veya kaygan iki halatı emniyetle ekler. Sancak bağının çift voltalı hâlidir; ikinci volta bağın kayma ihtimalini büyük ölçüde azaltır.",
    videoId: "9XkB3Wk-57o",
    videoCredit: ART_OF_KNOT_TYING,
    steps: [
      { title: "Kalın halatla gözcük", description: "Kalın halatla bir gözcük (bight) oluşturun." },
      { title: "İnce halatı geçir ve dola", description: "İnce halatın çımasını gözcüğün içinden geçirip iki bacağın arkasından dolayın ve kendi bedeninin altına kıstırın (tek sancak bağı)." },
      { title: "İkinci voltayı at", description: "Çımayla gözcüğün etrafına aynı yönde bir volta daha atıp yine kendi bedeninin altından geçirin." },
      { title: "Çekip sıkın", description: "İnce halatın bedenini ve çımasını çekerek her iki voltayı da oturtup sıkın." },
    ],
    tip: "Tek sancak bağında olduğu gibi iki çıma AYNI tarafta çıkmalıdır. Halatlar arasındaki çap farkı büyüdükçe veya halatlar ıslak/kayganken çifte volta şarttır.",
  },
  {
    id: "fishermans-knot",
    name: "Balıkçı Bağı",
    nameEn: "Fisherman's Knot",
    category: "ekleme",
    use: "İki ince halatı, savloyu veya gırcalayı uç uca ekler. Her çıma diğer halatın bedeni üzerine bir adi düğüm atar; yük binince iki düğüm birbirine kenetlenir. Islak ve ince halatta güvenilirdir.",
    videoId: "TP-8YjOilKA",
    videoCredit: HOWCAST,
    steps: [
      { title: "Halatları yan yana koy", description: "İki halatın çımalarını birbirine bakacak şekilde yan yana serin." },
      { title: "Birinci adi düğüm", description: "Birinci halatın çımasıyla, ikinci halatın bedeni üzerine bir adi düğüm atın." },
      { title: "İkinci adi düğüm", description: "İkinci halatın çımasıyla, birinci halatın bedeni üzerine ters yönde bir adi düğüm atın." },
      { title: "Bedenleri çekip kenetle", description: "Her iki bedeni ters yönde çekin; iki düğüm kayarak birbirine yaslanır ve kilitlenir." },
    ],
    tip: "İki düğüm birbirine tam oturmalı, aralarında boşluk kalmamalıdır. Çok kaygan halatta her adi düğüm yerine çifte düğüm atarak 'çifte balıkçı bağı' yapın.",
  },
  {
    id: "double-fishermans-knot",
    name: "Çifte Balıkçı Bağı",
    nameEn: "Double Fisherman's Knot",
    category: "ekleme",
    use: "İki halatı uç uca kalıcı olarak ekler. Balıkçı bağının çifte düğümlü hâlidir; ince ve kaygan halatta daha emniyetlidir, ancak yük bindikten sonra zor çözülür.",
    videoId: "O6oJwedcb18",
    videoCredit: GROG,
    steps: [
      { title: "Halatları yan yana koy", description: "İki halatın çımalarını birbirine bakacak şekilde yan yana serin." },
      { title: "Birinci çifte düğüm", description: "Birinci halatın çımasını her iki halatın etrafına, kendi bedenine doğru iki tur sarın ve bu turların içinden geçirip sıkın." },
      { title: "İkinci çifte düğüm", description: "İkinci halatın çımasıyla aynı işlemi ters yönde tekrarlayın." },
      { title: "Bedenleri çekip kenetle", description: "Her iki bedeni ters yönde çekin; iki düğüm kayarak birbirine yaslanır ve kilitlenir." },
    ],
    tip: "Doğru atılmış bağda bir yüzde iki çarpı (X), diğer yüzde dört paralel sarım görünür. Çımaları kısa kesmeyin.",
  },
  {
    id: "carrick-bend",
    name: "Yoma Bağı",
    nameEn: "Carrick Bend",
    category: "ekleme",
    use: "Palamar, yedek halatı gibi iki kalın halatı (yomayı) uç uca ekler. Büyük yük altında sıkışsa bile çözülebilen ve ıslakken güvenilirliğini koruyan klasik gemici eklemesidir.",
    videoId: "GJdJKuQJuYE",
    videoCredit: GROG,
    steps: [
      { title: "Birinci halatla kasa", description: "Birinci halatın çımasıyla, çıma bedenin altında kalacak şekilde bir kasa oluşturun." },
      { title: "İkinci çımayı örgüye başlat", description: "İkinci halatın çımasını kasanın altından sokup birinci halatın bedeninin üzerinden, çımasının altından geçirin." },
      { title: "Alt-üst geçişleri tamamla", description: "Çımayı kasanın üzerinden, kendi bedeninin altından ve kasanın diğer kenarının üzerinden geçirerek örgü desenini tamamlayın." },
      { title: "Çekip oturt", description: "Her iki bedeni çekin; simetrik örgü deseni kendini toplayarak kilitlenir." },
    ],
    tip: "Doğru yoma bağında iki çıma birbirine göre çapraz (zıt köşelerde) çıkar. Yük binince düğüm şekil değiştirip bambaşka görünür — bu normaldir, bağ böyle kilitlenir.",
  },

  // ── Kısaltmalar (shortenings) ─────────────────────────────────────────────
  {
    id: "sheepshank",
    name: "Margarita Bağı",
    nameEn: "Sheepshank",
    aka: ["Çürük Bağı"],
    category: "kisaltma",
    use: "Uzun bir halatı kesmeden geçici olarak kısaltır veya halatın yıpranmış (çürük) kısmını yük taşımayan orta kata alarak devre dışı bırakır.",
    videoId: "lopGPwY-sno",
    videoCredit: GROG,
    steps: [
      { title: "Halatı üç kat katla", description: "Halatın kısaltılacak kısmını 'S/Z' şeklinde üç kat olacak biçimde katlayın; iki uçta birer gözcük oluşur." },
      { title: "Birinci gözcüğe yarım anele", description: "Bedenin bir tarafıyla bir yarım anele atıp yakındaki gözcüğün üzerine geçirin ve sıkın." },
      { title: "İkinci gözcüğe yarım anele", description: "Diğer taraftaki bedenle de ikinci gözcüğün üzerine bir yarım anele atıp sıkın." },
      { title: "Gerginliği ver", description: "Her iki bedeni çekerek bağı yük altına alın; katlar gerginken bağ formunu korur." },
    ],
    tip: "Margarita yalnızca SÜREKLİ gerginlik altında güvenlidir; yük boşalırsa dağılabilir. Çürük kısmı devre dışı bırakırken yıpranmış bölümün ortadaki (yüksüz) katta kalmasına dikkat edin.",
  },
];

export const SAILOR_KNOTS_BY_ID: Record<string, SailorKnot> = Object.fromEntries(
  SAILOR_KNOTS.map((k) => [k.id, k]),
);
