// Single source of truth for the "Gemici Bağları" reference shown on
// src/pages/SailorKnots.tsx.
//
// Each knot carries Turkish + English names, category, what it is used for,
// its approximate strength loss, the step-by-step tying instructions, a short
// practical tip and a reference to a verified diagram under /public/knots/.
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

export type KnotCategory = "durdurucu" | "kasa" | "bag" | "ekleme";

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
  /** Path to the verified diagram under /public/knots/. */
  image: string;
  /** Source / license credit for the diagram. */
  credit?: string;
}

// Most diagrams are the consistent public-domain line engravings from the
// Encyclopædia Britannica (1911); a few gaps are filled with clearly-correct
// CC BY-SA diagrams credited individually below.
const EB1911 = "Encyclopædia Britannica (1911) — kamu malı";

export const KNOT_CATEGORY_ORDER: KnotCategory[] = ["durdurucu", "kasa", "bag", "ekleme"];

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
};

export const SAILOR_KNOTS: SailorKnot[] = [
  // ── Durdurucu ve bağlama düğümleri ───────────────────────────────────────
  {
    id: "figure-eight",
    name: "Sekizli Düğüm",
    nameEn: "Figure-of-Eight",
    aka: ["Sekiz Düğümü"],
    category: "durdurucu",
    use: "Çımaya atılan durdurucu (stopper) düğümdür; halatın bloktan, makaradan veya kilometreden kaçmasını önler. Yük altında bile kolay çözülür.",
    strengthLoss: "~%25 dayanım kaybı",
    image: "/knots/figure-eight.jpg",
    credit: EB1911,
    steps: [
      { title: "Kasa oluştur", description: "Çımayla beden halatının üzerinde bir kasa (göz) oluşturun." },
      { title: "Çımayı arkadan dola", description: "Çımayı bedenin arkasından dolayarak '8' şeklini başlatın." },
      { title: "Kasadan geçirip çek", description: "Çımayı ilk kasanın içinden geçirip her iki taraftan çekerek sekizi sıkın." },
    ],
    tip: "Basit kazık (overhand) düğümünün aksine sekizli, yük altında sıkışsa bile rahat çözülür — bu yüzden tercih edilir.",
  },
  {
    id: "reef-knot",
    name: "Yassı Düğüm",
    nameEn: "Reef / Square Knot",
    aka: ["Camadan Düğümü"],
    category: "durdurucu",
    use: "Aynı çaptaki iki halatın çımasını birbirine bağlar (binding/bağlama düğümü). Yelken ve branda toplamada yaygındır.",
    strengthLoss: "~%55 dayanım kaybı",
    image: "/knots/reef-knot.jpg",
    credit: EB1911,
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
    image: "/knots/bowline.jpg",
    credit: EB1911,
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
    id: "bowline-on-bight",
    name: "Çifte İzbarço",
    nameEn: "Bowline on a Bight",
    category: "kasa",
    use: "Halatın çımasına erişmeden, ortasında iki adet kaymayan kasa oluşturur. Yükü iki bacağa paylaştırmada ve acil oturak (bosun's chair) olarak kullanılır.",
    image: "/knots/bowline-on-bight.jpg",
    credit: EB1911,
    steps: [
      { title: "Gözcükle kasa", description: "Halatı ikiye katlayın (gözcük) ve katlı kısımla bedende küçük bir kasa oluşturun." },
      { title: "Gözcüğü kasadan geçir", description: "Katlı ucu (gözcük) bu kasanın içinden geçirin." },
      { title: "İki bacağın etrafından aç", description: "Gözcüğü açıp düğümün her iki ana bacağının etrafından aşırın." },
      { title: "Çekip sabitle", description: "Bedeni çekerek yan yana iki kaymayan kasayı sabitleyin." },
    ],
    tip: "Halatın ortasında çalışıldığı için çımaya ihtiyaç duymaz; bu yüzden orta noktada kasa gerektiğinde idealdir.",
  },

  // ── Bağlar (hitches) ──────────────────────────────────────────────────────
  {
    id: "clove-hitch",
    name: "Kazık Bağı",
    nameEn: "Clove Hitch",
    aka: ["Volta"],
    category: "bag",
    use: "Halatı bir babaya, baraya, çubuğa veya küpeşteye geçici olarak bağlamak için kullanılır. Hızlı atılır ve hızlı çözülür.",
    image: "/knots/clove-hitch.jpg",
    credit: EB1911,
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
    category: "bag",
    use: "Halatı bir ringe, baraya veya babaya bağlamanın hızlı yoludur. Çıma, beden halatının etrafına aynı yönde atılan iki yarım anele ile kilitlenir.",
    image: "/knots/two-half-hitches.jpg",
    credit: EB1911,
    steps: [
      { title: "Nesnenin etrafından geçir", description: "Halatı ringin/baranın etrafından geçirin." },
      { title: "Birinci yarım anele", description: "Çımayı beden halatının etrafından dolayıp oluşan kasanın içinden geçirin." },
      { title: "İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atın." },
      { title: "Bedene yaslayıp sıkın", description: "İki aneleyi birbirine ve bedene yaslayarak çekip sıkın." },
    ],
    tip: "İki anele AYNI yönde atılmalı; bu hâlde düğüm bedenin üzerinde küçük bir kazık bağı oluşturarak kilitlenir.",
  },
  {
    id: "round-turn-two-half-hitches",
    name: "Camadan Voltası",
    nameEn: "Round Turn & Two Half Hitches",
    category: "bag",
    use: "Bir halatı baraya, ringe veya babaya emniyetle bağlar. Tam tur yükü taşır, iki yarım anele düğümü kilitler. Yük altında bile bağlanıp çözülebilir.",
    image: "/knots/round-turn-two-half-hitches.png",
    credit: "Stephan Brunker — CC BY-SA 3.0, Wikimedia Commons",
    steps: [
      { title: "Tam tur (round turn)", description: "Halatı baranın/ringin etrafından iki kez dolayın; bu tam tur yükü taşır." },
      { title: "Birinci yarım anele", description: "Çımayı beden halatının etrafından dolayarak ilk yarım aneleyi atın." },
      { title: "İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atıp çekerek kilitleyin." },
    ],
    tip: "Tam tur sürtünmeyle yükü tuttuğu için, gergin bir halatı bağlarken iki yarım aneleyi rahatça atabilirsiniz — bu yüzden iki yarım aneleden daha emniyetlidir.",
  },
  {
    id: "rolling-hitch",
    name: "Gronof Bağı",
    nameEn: "Rolling Hitch",
    category: "bag",
    use: "Bir halatı, başka bir gergin halata veya çubuğa, ekseni boyunca kaymayacak şekilde bağlar. Gergin bir halattaki yükü geçici olarak almak (stopper) için kullanılır.",
    image: "/knots/rolling-hitch.jpg",
    credit: EB1911,
    steps: [
      { title: "Yük yönüne iki dönüş", description: "Çımayı yük yönüne doğru ana halatın etrafından iki kez dolayın; her dönüş bir öncekinin üzerine biner." },
      { title: "Üçüncü dönüşü ters yana", description: "Üçüncü dönüşü yük yönünün ters tarafına, ilk iki dönüşün dışına çaprazlayarak atın." },
      { title: "Altından geçirip sıkın", description: "Çımayı bu son dönüşün altından geçirip çekerek sıkın; yük çekildiğinde dönüşler kilitlenir." },
    ],
    tip: "İki sarılı dönüş mutlaka yükün geleceği tarafta olmalı; yön ters olursa düğüm kayar ve tutmaz.",
  },
  {
    id: "cleat-hitch",
    name: "Koç Boynuzuna Volta",
    nameEn: "Cleat Hitch",
    category: "bag",
    use: "Palamar, şamandıra veya yat halatını güverte koç boynuzuna (cleat) emniyetle bağlar. Yük altında sıkıca tutar, gerektiğinde hızlıca çözülür.",
    image: "/knots/cleat-hitch.jpg",
    credit: "BenFrantzDale — CC BY-SA 3.0, Wikimedia Commons",
    steps: [
      { title: "Uzak boynuzdan tam tur", description: "Halatı önce koç boynuzunun uzak (karşı) boynuzundan dolayarak tam bir tur atın." },
      { title: "Sekiz şeklinde sarımlar", description: "Halatı boynuzların üzerine '8' şeklinde çapraz sarımlar atın." },
      { title: "Kilit volta ile sabitle", description: "Son sarımda ters bir kasa (kilit volta) atarak çımayı kilitleyin; çıma boynuzdan sarkmasın." },
    ],
    tip: "Tek bir kilit volta yeterlidir; fazlası halatı yük altında çözmeyi zorlaştırır. İlk turu daima uzak boynuzdan başlatın.",
  },
  {
    id: "anchor-bend",
    name: "Demir Bağı",
    nameEn: "Anchor (Fisherman's) Bend",
    category: "bag",
    use: "Halatı demir bedenine (anchor) veya ringe güvenle bağlar. Islanınca ve yük altında sıkışmaz; sarsıntılı yüke dayanıklıdır.",
    image: "/knots/anchor-bend.jpg",
    credit: EB1911,
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
    name: "Kıstırma Düğümü",
    nameEn: "Sheet Bend",
    aka: ["İskota Bağı"],
    category: "ekleme",
    use: "Farklı çaptaki iki halatı birleştirir. Kalın halatla bir gözcük yapılır, ince halat içinden geçirilip kıstırılır.",
    strengthLoss: "~%45 dayanım kaybı",
    image: "/knots/sheet-bend.jpg",
    credit: EB1911,
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
    name: "Çifte Kıstırma",
    nameEn: "Double Sheet Bend",
    category: "ekleme",
    use: "Çapları çok farklı veya kaygan iki halatı birleştirir. Tek kıstırmanın daha güvenli hâlidir; ikinci dönüş kavramayı artırır.",
    strengthLoss: "~%45 dayanım kaybı",
    image: "/knots/double-sheet-bend.svg",
    credit: "Lucasbosch — CC BY-SA 3.0, Wikimedia Commons",
    steps: [
      { title: "Kalın halatla gözcük", description: "Kalın halatla bir gözcük (bight) oluşturun." },
      { title: "İnce halatı geçirip dola", description: "İnce halatı gözcüğün içinden geçirip iki bacağın arkasından dolayın ve kendi bedeninin altına kıstırın." },
      { title: "İkinci dönüşü at", description: "İnce halatla gözcüğün etrafına ikinci bir dönüş daha atın." },
      { title: "Tekrar kıstırıp çek", description: "Çımayı yine kendi bedeninin altına kıstırıp her iki halatı çekerek sıkın." },
    ],
    tip: "Halatlar çok farklı çaptaysa veya sentetik/kayganaysa daima çifte kıstırmayı tercih edin; ekstra dönüş kaymayı belirgin azaltır.",
  },
  {
    id: "carrick-bend",
    name: "Kropi Bağı",
    nameEn: "Carrick Bend",
    category: "ekleme",
    use: "Kalın palamar ve yedek halatlarını birleştirir. Yük altında sıkışmaz, ıslanınca bile kolay çözülür ve düz oturduğu için makara/bloktan geçebilir.",
    image: "/knots/carrick-bend.jpg",
    credit: EB1911,
    steps: [
      { title: "İlk halatla kasa", description: "Bir halatla bir kasa (göz) oluşturun; çıma beden halatının üstünde kalsın." },
      { title: "İkinci halatı altından getir", description: "İkinci halatı ilk kasanın altından getirin." },
      { title: "Örgü desenini doku", description: "İkinci halatı kasanın kenarlarının altından-üstünden (over-under) geçirerek simetrik örgü desenini oluşturun." },
      { title: "İki bedeni çek", description: "Her iki beden halatını çekin; düğüm kare/örgü şekline oturarak sıkışır." },
    ],
    tip: "Doğru atıldığında düz, simetrik bir örgü deseni görünür. Çekmeden önce 'over-under' düzenini kontrol edin; yanlış geçişte düğüm tutmaz.",
  },
];

export const SAILOR_KNOTS_BY_ID: Record<string, SailorKnot> = Object.fromEntries(
  SAILOR_KNOTS.map((k) => [k.id, k]),
);
