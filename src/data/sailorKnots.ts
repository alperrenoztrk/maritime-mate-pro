// Single source of truth for the "Gemici Bağları" reference shown on
// src/pages/SailorKnots.tsx.
//
// This list is intentionally focused on the knots most used in everyday
// seamanship (the core set taught by the Turkish Coast Guard and sailing
// schools): adi düğüm, izbarço, kazık bağı, camadan, sancak (iskota) ve
// çifte sancak, kropi/sekizli, iki yarım anele, camadan voltası, koç
// boynuzuna volta, barbarişka, dülger bağı, demir bağı, balıkçı bağı,
// yoma bağı and margarita (çürük bağı).
//
// Each knot is now demonstrated with a real, verified knot-tying VIDEO
// (`videoId`, a YouTube id) instead of a static diagram. The diagrams under
// /public/knots/ are still referenced as an offline poster/fallback so a card
// is never blank. Every videoId was checked against YouTube's oEmbed endpoint
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
  /** Other common Turkish names, shown as small chips. */
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
  /** Path to a diagram under /public/knots/, used as the video poster / offline fallback. */
  image: string;
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
    image: "/knots/overhand-knot.jpg",
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
    use: "Çımaya atılan durdurucu (stopper) düğümdür; halatın bloktan, makaradan veya kilometreden kaçmasını önler. Yük altında bile kolay çözülür.",
    strengthLoss: "~%25 dayanım kaybı",
    videoId: "EtzeIQjcKEs",
    videoCredit: GROG,
    image: "/knots/figure-eight.jpg",
    steps: [
      { title: "Kasa oluştur", description: "Çımayla beden halatının üzerinde bir kasa (göz) oluşturun." },
      { title: "Çımayı arkadan dola", description: "Çımayı bedenin arkasından dolayarak '8' şeklini başlatın." },
      { title: "Kasadan geçirip çek", description: "Çımayı ilk kasanın içinden geçirip her iki taraftan çekerek sekizi sıkın." },
    ],
    tip: "Basit kazık (overhand) düğümünün aksine sekizli, yük altında sıkışsa bile rahat çözülür — bu yüzden tercih edilir. Türkçede çoğu zaman 'Kropi bağı' olarak da anılır.",
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
    image: "/knots/reef-knot.jpg",
    steps: [
      { title: "Sol çımayı sağ çımanın üzerinden", description: "Sol çımayı sağ çımanın üzerinden alıp altından geçirin (sol-sağ)." },
      { title: "Sağ çımayı sol çımanın üzerinden", description: "Şimdi sağ çımayı sol çımanın üzerinden alıp altından geçirin (sağ-sol)." },
      { title: "İki çifti çekip sıkın", description: "Her iki çımayı birden çekin; yatık, simetrik bir düğüm oluşur. Çımalar bedenle aynı tarafta çıkmalıdır." },
    ],
    tip: "Yük taşıyan eklerde güvenilir DEĞİLDİR; farklı çaplı halatlarda kayar. Sadece toparlama/bağlama işi içindir, can emniyetinde kullanmayın.",
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
    image: "/knots/bowline.jpg",
    steps: [
      { title: "Beden üzerinde küçük kasa", description: "Bedeni serili tutun ve üzerinde küçük bir kasa (tavşan deliği) oluşturun; çıma üstte kalsın." },
      { title: "Kasadan yukarı çık", description: "Çımayı (tavşan) kasanın içinden aşağıdan yukarıya doğru geçirin." },
      { title: "Bedenin arkasından dola", description: "Çımayı beden halatının (ağaç) arkasından dolayın." },
      { title: "Kasadan geri sok", description: "Çımayı tekrar aynı kasanın içinden aşağı doğru geçirin." },
      { title: "Çekip sıkın", description: "Bedeni ve oluşan büyük kasayı ters yönde çekerek düğümü sıkın; kasa istenen boyutta sabitlenir." },
    ],
    tip: "Hatırlatma: tavşan delikten çıkar, ağacın etrafından dolaşır, deliğe geri girer. Çımanın kasanın İÇ tarafında kalması doğru izbarçonun işaretidir.",
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
    image: "/knots/clove-hitch.jpg",
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
    image: "/knots/two-half-hitches.jpg",
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
    image: "/knots/round-turn-two-half-hitches.png",
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
    image: "/knots/cleat-hitch.jpg",
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
    image: "/knots/rolling-hitch.jpg",
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
    image: "/knots/timber-hitch.jpg",
    steps: [
      { title: "Cismi dola", description: "Halatı çekilecek cismin (seren, kütük) etrafından dolayın." },
      { title: "Bedenin etrafından geçir", description: "Çımayı beden halatının etrafından dolayıp geri getirin." },
      { title: "Kendi voltasına sar", description: "Çımayı kendi voltasının içine, cisim boyunca 3-4 kez sarıp kıstırın." },
      { title: "Yükleyip kontrol et", description: "Bedeni çekin; sarımlar cisme yapışarak sıkışır ve bağ kilitlenir." },
    ],
    tip: "Sarımlar yük binince sıkıştığı için bağın tutması sürekli gerginliğe bağlıdır. Uzun bir cismi yedeklerken çekilen uca ayrıca bir yarım anele atın (dülger + yarım anele).",
  },
  {
    id: "anchor-bend",
    name: "Demir Bağı",
    nameEn: "Anchor (Fisherman's) Bend",
    category: "bag",
    use: "Halatı demir bedenine (anchor) veya ringe güvenle bağlar. Islanınca ve yük altında sıkışmaz; sarsıntılı yüke dayanıklıdır.",
    videoId: "gqgz4P1tMzw",
    videoCredit: GROG,
    image: "/knots/anchor-bend.jpg",
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
    image: "/knots/sheet-bend.jpg",
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
    image: "/knots/double-sheet-bend.jpg",
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
    image: "/knots/fishermans-knot.jpg",
    steps: [
      { title: "Halatları yan yana koy", description: "İki halatın çımalarını birbirine bakacak şekilde yan yana serin." },
      { title: "Birinci adi düğüm", description: "Birinci halatın çımasıyla, ikinci halatın bedeni üzerine bir adi düğüm atın." },
      { title: "İkinci adi düğüm", description: "İkinci halatın çımasıyla, birinci halatın bedeni üzerine ters yönde bir adi düğüm atın." },
      { title: "Bedenleri çekip kenetle", description: "Her iki bedeni ters yönde çekin; iki düğüm kayarak birbirine yaslanır ve kilitlenir." },
    ],
    tip: "İki düğüm birbirine tam oturmalı, aralarında boşluk kalmamalıdır. Çok kaygan halatta her adi düğüm yerine çifte düğüm atarak 'çifte balıkçı bağı' yapın.",
  },
  {
    id: "carrick-bend",
    name: "Yoma Bağı",
    nameEn: "Carrick Bend",
    category: "ekleme",
    use: "Palamar, yedek halatı gibi iki kalın halatı (yomayı) uç uca ekler. Büyük yük altında sıkışsa bile çözülebilen ve ıslakken güvenilirliğini koruyan klasik gemici eklemesidir.",
    videoId: "GJdJKuQJuYE",
    videoCredit: GROG,
    image: "/knots/carrick-bend.jpg",
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
    image: "/knots/sheepshank.jpg",
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
