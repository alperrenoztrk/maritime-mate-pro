// Single source of truth for the "Gemici Bağları" reference shown on
// src/pages/SailorKnots.tsx.
//
// This is a fully text-based reference — no images. Every knot is described
// with Turkish + English names, category, difficulty, what it is used for,
// its approximate strength loss, the step-by-step tying instructions and a
// short practical tip (a common mistake or a key point). This keeps the whole
// section 100% consistent: there are no missing or mismatched photos.

export interface KnotStep {
  title: string;
  description: string;
}

export type KnotCategory = "durdurucu" | "ilmek" | "bag" | "ekleme";

export interface SailorKnot {
  id: string;
  name: string;
  nameEn: string;
  /** Other common Turkish names, shown as small chips. */
  aka?: string[];
  category: KnotCategory;
  difficulty: "Kolay" | "Orta" | "Zor";
  /** What the knot is for, in one or two sentences. */
  use: string;
  /** Approximate strength loss vs. an undamaged line, when known. */
  strengthLoss?: string;
  steps: KnotStep[];
  /** A single practical pointer — a common mistake or the key to getting it right. */
  tip?: string;
}

export const KNOT_CATEGORY_ORDER: KnotCategory[] = ["durdurucu", "ilmek", "bag", "ekleme"];

export const KNOT_CATEGORY_LABELS: Record<
  KnotCategory,
  { title: string; subtitle: string }
> = {
  durdurucu: {
    title: "Durdurucu ve Bağlama Düğümleri",
    subtitle: "Halat ucunu durdurur veya iki ucu birbirine bağlar",
  },
  ilmek: {
    title: "İlmekler",
    subtitle: "Halatın ucunda kaymayan sabit bir ilmek (loop) oluşturur",
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
    difficulty: "Kolay",
    use: "Halatın ucuna atılan durdurucu (stopper) düğümdür; halatın bloktan, makaradan veya kilometreden kaçmasını önler. Yük altında bile kolay çözülür.",
    strengthLoss: "~%25 dayanım kaybı",
    steps: [
      { title: "İlmek oluştur", description: "Çalışan uçla beden halatının (standing part) üzerinde bir ilmek oluşturun." },
      { title: "Ucu arkadan dola", description: "Çalışan ucu bedenin arkasından dolayarak '8' şeklini başlatın." },
      { title: "İlmekten geçirip çek", description: "Ucu ilk ilmeğin içinden geçirip her iki taraftan çekerek sekizi sıkın." },
    ],
    tip: "Basit kazık (overhand) düğümünün aksine sekizli, yük altında sıkışsa bile rahat çözülür — bu yüzden tercih edilir.",
  },
  {
    id: "reef-knot",
    name: "Yassı Düğüm",
    nameEn: "Reef / Square Knot",
    aka: ["Camadan Düğümü"],
    category: "durdurucu",
    difficulty: "Kolay",
    use: "Aynı çaptaki iki halat ucunu birbirine bağlar (binding/bağlama düğümü). Yelken ve branda toplamada yaygındır.",
    strengthLoss: "~%55 dayanım kaybı",
    steps: [
      { title: "Sol ucu sağ ucun üzerinden", description: "Sol ucu sağ ucun üzerinden alıp altından geçirin (sol-sağ)." },
      { title: "Sağ ucu sol ucun üzerinden", description: "Şimdi sağ ucu sol ucun üzerinden alıp altından geçirin (sağ-sol)." },
      { title: "İki çifti çekip sıkın", description: "Her iki ucu birden çekin; yatık, simetrik bir düğüm oluşur. Uçlar bedenle aynı tarafta çıkmalıdır." },
    ],
    tip: "Yük taşıyan eklerde güvenilir DEĞİLDİR; farklı çaplı halatlarda kayar. Sadece toparlama/bağlama işi içindir, can emniyetinde kullanmayın.",
  },

  // ── İlmekler (loops) ─────────────────────────────────────────────────────
  {
    id: "bowline",
    name: "İzbarço Bağı",
    nameEn: "Bowline",
    aka: ["Kazık İlmeği"],
    category: "ilmek",
    difficulty: "Orta",
    use: "Halatın ucunda yük altında sıkışmayan, kolayca çözülebilen sabit bir ilmek oluşturur. Can kurtarma, palamar geçirme ve genel amaçlı kullanımda en önemli denizcilik düğümüdür.",
    strengthLoss: "~%40 dayanım kaybı",
    steps: [
      { title: "Beden üzerinde küçük ilmek", description: "Bedeni serili tutun ve üzerinde küçük bir ilmek (tavşan deliği) oluşturun; çalışan uç üstte kalsın." },
      { title: "Delikten yukarı çık", description: "Çalışan ucu (tavşan) deliğin içinden aşağıdan yukarıya doğru geçirin." },
      { title: "Bedenin arkasından dola", description: "Ucu beden halatının (ağaç) arkasından dolayın." },
      { title: "Delikten geri sok", description: "Ucu tekrar aynı delikten aşağı doğru geçirin." },
      { title: "Çekip sıkın", description: "Bedeni ve oluşan ilmeği ters yönde çekerek düğümü sıkın; ilmek istenen boyutta sabitlenir." },
    ],
    tip: "Hatırlatma: tavşan delikten çıkar, ağacın etrafından dolaşır, deliğe geri girer. Çalışan ucun ilmeğin İÇ tarafında kalması doğru izbarçonun işaretidir.",
  },
  {
    id: "bowline-on-bight",
    name: "Çifte İzbarço",
    nameEn: "Bowline on a Bight",
    category: "ilmek",
    difficulty: "Zor",
    use: "Halatın ucuna erişmeden, ortasında iki adet kaymayan ilmek oluşturur. Yükü iki bacağa paylaştırmada ve acil oturak (bosun's chair) olarak kullanılır.",
    steps: [
      { title: "Katlı uçla ilmek", description: "Halatı ikiye katlayın (bight) ve katlı kısımla bedende küçük bir ilmek oluşturun." },
      { title: "Katlı ucu delikten geçir", description: "Katlı ucu (bight) bu ilmeğin içinden geçirin." },
      { title: "İki bacağın etrafından aç", description: "Katlı ucu açıp düğümün her iki ana bacağının etrafından aşırın." },
      { title: "Çekip sabitle", description: "Bedeni çekerek yan yana iki kaymayan ilmeği sabitleyin." },
    ],
    tip: "Halatın ortasında çalışıldığı için her iki uca da ihtiyaç duymaz; bu yüzden orta noktada ilmek gerektiğinde idealdir.",
  },

  // ── Bağlar (hitches) ──────────────────────────────────────────────────────
  {
    id: "clove-hitch",
    name: "Kazık Bağı",
    nameEn: "Clove Hitch",
    aka: ["Volta"],
    category: "bag",
    difficulty: "Kolay",
    use: "Halatı bir babaya, baraya, çubuğa veya küpeşteye geçici olarak bağlamak için kullanılır. Hızlı atılır ve hızlı çözülür.",
    steps: [
      { title: "İlk volta", description: "Halatı direğin/çubuğun etrafından bir kez dolayın." },
      { title: "Çaprazlayıp ikinci volta", description: "İlk dönüşün üzerinden çaprazlayarak ikinci voltayı atın." },
      { title: "Ucu altından geçirip sıkın", description: "Çalışan ucu son dönüşün altından geçirip her iki yönden çekerek kilitleyin." },
    ],
    tip: "Tek başına güvenilir değildir; uçlar serbest kalırsa veya yük yön değiştirirse çözülebilir. Kritik bağlamada ek emniyet voltasıyla destekleyin.",
  },
  {
    id: "two-half-hitches",
    name: "İki Yarım Anele",
    nameEn: "Two Half Hitches",
    category: "bag",
    difficulty: "Kolay",
    use: "Halatı bir ringe, baraya veya babaya bağlamanın hızlı yoludur. Çalışan uç, beden halatının etrafına aynı yönde atılan iki yarım anele ile kilitlenir.",
    steps: [
      { title: "Nesnenin etrafından geçir", description: "Halatı ringin/baranın etrafından geçirin." },
      { title: "Birinci yarım anele", description: "Çalışan ucu beden halatının etrafından dolayıp oluşan ilmeğin içinden geçirin." },
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
    difficulty: "Orta",
    use: "Bir halatı baraya, ringe veya babaya emniyetle bağlar. Tam tur yükü taşır, iki yarım anele düğümü kilitler. Yük altında bile bağlanıp çözülebilir.",
    steps: [
      { title: "Tam tur (round turn)", description: "Halatı baranın/ringin etrafından iki kez dolayın; bu tam tur yükü taşır." },
      { title: "Birinci yarım anele", description: "Çalışan ucu beden halatının etrafından dolayarak ilk yarım aneleyi atın." },
      { title: "İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atıp çekerek kilitleyin." },
    ],
    tip: "Tam tur sürtünmeyle yükü tuttuğu için, gergin bir halatı bağlarken iki yarım aneleyi rahatça atabilirsiniz — bu yüzden iki yarım aneleden daha emniyetlidir.",
  },
  {
    id: "rolling-hitch",
    name: "Gronof Bağı",
    nameEn: "Rolling Hitch",
    category: "bag",
    difficulty: "Orta",
    use: "Bir halatı, başka bir gergin halata veya çubuğa, ekseni boyunca kaymayacak şekilde bağlar. Gergin bir halattaki yükü geçici olarak almak (stopper) için kullanılır.",
    steps: [
      { title: "Yük yönüne iki dönüş", description: "Çalışan ucu yük yönüne doğru ana halatın etrafından iki kez dolayın; her dönüş bir öncekinin üzerine biner." },
      { title: "Üçüncü dönüşü ters yana", description: "Üçüncü dönüşü yük yönünün ters tarafına, ilk iki dönüşün dışına çaprazlayarak atın." },
      { title: "Altından geçirip sıkın", description: "Ucu bu son dönüşün altından geçirip çekerek sıkın; yük çekildiğinde dönüşler kilitlenir." },
    ],
    tip: "İki sarılı dönüş mutlaka yükün geleceği tarafta olmalı; yön ters olursa düğüm kayar ve tutmaz.",
  },
  {
    id: "cleat-hitch",
    name: "Koç Boynuzuna Volta",
    nameEn: "Cleat Hitch",
    category: "bag",
    difficulty: "Kolay",
    use: "Palamar, şamandıra veya yat halatını güverte koç boynuzuna (cleat) emniyetle bağlar. Yük altında sıkıca tutar, gerektiğinde hızlıca çözülür.",
    steps: [
      { title: "Uzak boynuzdan tam tur", description: "Halatı önce koç boynuzunun uzak (karşı) boynuzundan dolayarak tam bir tur atın." },
      { title: "Sekiz şeklinde sarımlar", description: "Halatı boynuzların üzerine '8' şeklinde çapraz sarımlar atın." },
      { title: "Kilit volta ile sabitle", description: "Son sarımda ters bir ilmek (kilit volta) atarak ucu kilitleyin; uç boynuzdan sarkmasın." },
    ],
    tip: "Tek bir kilit volta yeterlidir; fazlası halatı yük altında çözmeyi zorlaştırır. İlk turu daima uzak boynuzdan başlatın.",
  },
  {
    id: "anchor-bend",
    name: "Demir Bağı",
    nameEn: "Anchor (Fisherman's) Bend",
    category: "bag",
    difficulty: "Orta",
    use: "Halatı demir bedenine (anchor) veya ringe güvenle bağlar. Islanınca ve yük altında sıkışmaz; sarsıntılı yüke dayanıklıdır.",
    steps: [
      { title: "Ringden iki kez geçir", description: "Halatı ring/demir içinden iki kez geçirerek bir tam tur (round turn) oluşturun; turu gevşek bırakın." },
      { title: "İlk aneleyi turun içinden", description: "Çalışan ucu beden halatının etrafından dolayıp az önce oluşan turların içinden geçirin." },
      { title: "İkinci anele + emniyet", description: "Beden üzerine bir yarım anele daha atarak kilitleyin; ucu ince halatla bedene sürce (seizing) yaparak emniyete alın." },
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
    difficulty: "Orta",
    use: "Farklı çaptaki iki halatı birleştirir. Kalın halatla bir gözcük (bight) yapılır, ince halat içinden geçirilip kıstırılır.",
    strengthLoss: "~%45 dayanım kaybı",
    steps: [
      { title: "Kalın halatla gözcük", description: "Kalın halatla bir gözcük (bight) oluşturun." },
      { title: "İnce halatı içinden geçir", description: "İnce halatı gözcüğün içinden aşağıdan yukarı geçirin." },
      { title: "İki bacağın arkasından dola", description: "İnce halatı gözcüğün iki bacağının arkasından dolayın." },
      { title: "Kendi altına kıstırıp çek", description: "Ucu kendi beden halatının altına kıstırıp çekin." },
    ],
    tip: "İki uç AYNI tarafta çıkmalı; ters taraflarda çıkarsa düğüm zayıf 'sol kıstırma' olur ve kayabilir. Yük altında uçları gergin tutun.",
  },
  {
    id: "double-sheet-bend",
    name: "Çifte Kıstırma",
    nameEn: "Double Sheet Bend",
    category: "ekleme",
    difficulty: "Orta",
    use: "Çapları çok farklı veya kaygan iki halatı birleştirir. Tek kıstırmanın daha güvenli hâlidir; ikinci dönüş kavramayı artırır.",
    strengthLoss: "~%45 dayanım kaybı",
    steps: [
      { title: "Kalın halatla gözcük", description: "Kalın halatla bir gözcük (bight) oluşturun." },
      { title: "İnce halatı geçirip dola", description: "İnce halatı gözcüğün içinden geçirip iki bacağın arkasından dolayın ve kendi bedeninin altına kıstırın." },
      { title: "İkinci dönüşü at", description: "İnce halatla gözcüğün etrafına ikinci bir dönüş daha atın." },
      { title: "Tekrar kıstırıp çek", description: "Ucu yine kendi bedeninin altına kıstırıp her iki halatı çekerek sıkın." },
    ],
    tip: "Halatlar çok farklı çaptaysa veya sentetik/kayganaysa daima çifte kıstırmayı tercih edin; ekstra dönüş kaymayı belirgin azaltır.",
  },
  {
    id: "carrick-bend",
    name: "Kropi Bağı",
    nameEn: "Carrick Bend",
    category: "ekleme",
    difficulty: "Zor",
    use: "Kalın palamar ve yedek halatlarını birleştirir. Yük altında sıkışmaz, ıslanınca bile kolay çözülür ve düz oturduğu için makara/bloktan geçebilir.",
    steps: [
      { title: "İlk halatla ilmek", description: "Bir halatla bir ilmek (gözcük) oluşturun; çalışan uç beden halatının üstünde kalsın." },
      { title: "İkinci halatı altından getir", description: "İkinci halatı ilk ilmeğin altından getirin." },
      { title: "Örgü desenini doku", description: "İkinci halatı ilmeğin kenarlarının altından-üstünden (over-under) geçirerek simetrik örgü desenini oluşturun." },
      { title: "İki bedeni çek", description: "Her iki beden halatını çekin; düğüm kare/örgü şekline oturarak sıkışır." },
    ],
    tip: "Doğru atıldığında düz, simetrik bir örgü deseni görünür. Çekmeden önce 'over-under' düzenini kontrol edin; yanlış geçişte düğüm tutmaz.",
  },
];

export const SAILOR_KNOTS_BY_ID: Record<string, SailorKnot> = Object.fromEntries(
  SAILOR_KNOTS.map((k) => [k.id, k]),
);
