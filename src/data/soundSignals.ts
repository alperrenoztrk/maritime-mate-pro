// COLREG Bölüm D — ses ve ışık işaretleri (Kural 32-37).
//
// Tek kaynak: /navigation/sound-signals referans sayfası bu dosyadan beslenir.
//
// `pattern` alanı SignalTonePlayer'ın `blastPattern()` yardımcısına verilir:
//   S = kısa düdük (≈1 sn) · L = uzun düdük (4-6 sn)
// Süreler Kural 32'nin tanımlarıdır; sayfadaki "Çal" düğmesi bu süreleri
// gerçek zamanlı çalar, böylece "1 uzun + 2 kısa" kalıbı ezber değil işitsel
// bir örüntü olarak öğrenilir.

export type SoundGroup = "manoeuvring" | "narrowChannel" | "restrictedVisibility" | "anchored" | "distress";

export interface SoundSignal {
  id: string;
  group: SoundGroup;
  /** İşaretin adı / hangi durumda verildiği. */
  title: string;
  /** S/L kalıbı; boşsa çalınamayan (çan/gong gibi) bir işarettir. */
  pattern: string;
  /** Kalıbın okunuşu, ör. "1 uzun + 2 kısa". */
  readable: string;
  /** İşaretin anlamı. */
  meaning: string;
  /** İlgili COLREG kuralı. */
  rule: string;
  /** Tekrar aralığı veya ek koşul. */
  interval?: string;
  note?: string;
}

export const SOUND_GROUP_LABELS: Record<SoundGroup, { title: string; description: string }> = {
  manoeuvring: {
    title: "Manevra ve İkaz İşaretleri (Kural 34)",
    description:
      "Birbirini GÖREN gemiler arasında kullanılır. Motorlu gemi, izin verilen veya gerekli bir manevrayı yaparken niyetini düdükle bildirir. Bu işaretler, aynı sayıda çakışla beyaz all-round ışıkla da desteklenebilir.",
  },
  narrowChannel: {
    title: "Dar Kanal Geçiş İşaretleri (Kural 34(c))",
    description:
      "Dar kanal veya su yolunda geçme (overtaking) niyeti ve buna verilen onay. Kural 9(e) uyarınca geçilecek gemi de kendi onayını vermek zorundadır.",
  },
  restrictedVisibility: {
    title: "Kısıtlı Görüşte İşaretler (Kural 35)",
    description:
      "Kısıtlı görüş alanında VEYA yakınında, gece-gündüz fark etmeksizin verilir. Karşıdaki gemi görülmese bile bu işaretler zorunludur.",
  },
  anchored: {
    title: "Demirde ve Karaya Oturmuş Gemi (Kural 35)",
    description:
      "Düdük yerine çan (ve büyük gemilerde gong) kullanılır. 100 m ve üzeri gemilerde çan başta, gong kıçta çalınır.",
  },
  distress: {
    title: "Tehlike İşaretleri (Kural 37 / Ek IV)",
    description:
      "Yalnızca gerçek ve yakın tehlikede, yardım talebiyle kullanılır. Kural 34(d)'deki beş kısa düdükle KARIŞTIRILMAMALIDIR — o bir şüphe/ikaz işaretidir.",
  },
};

export const SOUND_GROUP_ORDER: SoundGroup[] = [
  "manoeuvring",
  "narrowChannel",
  "restrictedVisibility",
  "anchored",
  "distress",
];

export const SOUND_SIGNALS: SoundSignal[] = [
  // ─── Kural 34: manevra ve ikaz ────────────────────────────────────────────
  {
    id: "starboard",
    group: "manoeuvring",
    title: "Rotamı sancağa değiştiriyorum",
    pattern: "S",
    readable: "1 kısa",
    meaning: "Rotamı sancak tarafa değiştiriyorum.",
    rule: "Kural 34(a)",
  },
  {
    id: "port",
    group: "manoeuvring",
    title: "Rotamı iskeleye değiştiriyorum",
    pattern: "SS",
    readable: "2 kısa",
    meaning: "Rotamı iskele tarafa değiştiriyorum.",
    rule: "Kural 34(a)",
  },
  {
    id: "astern",
    group: "manoeuvring",
    title: "Tornistan çalışıyorum",
    pattern: "SSS",
    readable: "3 kısa",
    meaning: "Makinelerim tornistan (geri) çalışıyor.",
    rule: "Kural 34(a)",
    note: "Dikkat: 'geri gidiyorum' değil, 'makinelerim tornistan çalışıyor' demektir. Gemi hâlâ ileri yol alıyor olabilir.",
  },
  {
    id: "doubt",
    group: "manoeuvring",
    title: "Şüphe / ikaz işareti",
    pattern: "SSSSS",
    readable: "En az 5 kısa ve hızlı",
    meaning:
      "Karşı geminin niyetini anlamıyorum VEYA çatışmadan kaçınmak için yeterli önlem aldığından şüphe ediyorum.",
    rule: "Kural 34(d)",
    note: "Bu bir TEHLİKE işareti DEĞİLDİR. En az beş kısa ve hızlı ışık çakışıyla desteklenebilir.",
  },
  {
    id: "bend",
    group: "manoeuvring",
    title: "Görüşü kapalı dönemece yaklaşırken",
    pattern: "L",
    readable: "1 uzun",
    meaning:
      "Araya giren engel nedeniyle görülemeyen bir dönemece veya kanal bölgesine yaklaşıyorum.",
    rule: "Kural 34(e)",
    note: "Duyan gemi aynı işaretle (1 uzun) cevap verir.",
  },

  // ─── Kural 34(c): dar kanal geçişi ────────────────────────────────────────
  {
    id: "overtake-stbd",
    group: "narrowChannel",
    title: "Sancağınızdan geçmek istiyorum",
    pattern: "LLS",
    readable: "2 uzun + 1 kısa",
    meaning: "Dar kanalda sizi sancak tarafınızdan geçmek niyetindeyim.",
    rule: "Kural 34(c)(i)",
  },
  {
    id: "overtake-port",
    group: "narrowChannel",
    title: "İskelenizden geçmek istiyorum",
    pattern: "LLSS",
    readable: "2 uzun + 2 kısa",
    meaning: "Dar kanalda sizi iskele tarafınızdan geçmek niyetindeyim.",
    rule: "Kural 34(c)(i)",
  },
  {
    id: "overtake-agree",
    group: "narrowChannel",
    title: "Onay (geçebilirsiniz)",
    pattern: "LSLS",
    readable: "uzun-kısa-uzun-kısa",
    meaning: "Geçme niyetinizi kabul ediyorum.",
    rule: "Kural 34(c)(ii)",
    note: "Bu kalıp mors alfabesinde 'C' harfidir (▬ ● ▬ ●) — ICS'te C bayrağı da 'olumlu/evet' demektir. Tesadüf değil, aynı mantığın devamıdır.",
  },

  // ─── Kural 35: kısıtlı görüş ──────────────────────────────────────────────
  {
    id: "rv-underway",
    group: "restrictedVisibility",
    title: "Yolda olan motorlu gemi",
    pattern: "L",
    readable: "1 uzun",
    meaning: "Motorlu gemi, suya göre yol alıyor.",
    rule: "Kural 35(a)",
    interval: "En fazla 2 dakikada bir",
  },
  {
    id: "rv-stopped",
    group: "restrictedVisibility",
    title: "Durmuş, yol almayan motorlu gemi",
    pattern: "LL",
    readable: "2 uzun",
    meaning: "Motorlu gemi yolda, ancak suya göre yol almıyor (stopped, making no way).",
    rule: "Kural 35(b)",
    interval: "En fazla 2 dakikada bir; iki düdük arası yaklaşık 2 saniye",
  },
  {
    id: "rv-special",
    group: "restrictedVisibility",
    title: "NUC / RAM / CBD / yelkenli / balıkçı / çeken-iten gemi",
    pattern: "LSS",
    readable: "1 uzun + 2 kısa",
    meaning:
      "Kumandadan aciz, manevra kabiliyeti kısıtlı, draftından kısıtlı, yelkenli, balıkçılık yapan veya başka bir gemiyi çeken/iten gemi.",
    rule: "Kural 35(c)",
    interval: "En fazla 2 dakikada bir",
    note: "Altı farklı durumun tek bir ortak işareti vardır; hangisi olduğunu ses değil, radar/görsel bilgi ayırt eder.",
  },
  {
    id: "rv-towed",
    group: "restrictedVisibility",
    title: "Çekilen (manlı) gemi",
    pattern: "LSSS",
    readable: "1 uzun + 3 kısa",
    meaning:
      "Çekilen gemi; yedek dizisinde birden fazla gemi varsa yalnızca sonuncusu verir.",
    rule: "Kural 35(e)",
    interval: "Çeken geminin işaretinden hemen sonra",
  },
  {
    id: "rv-pilot",
    group: "restrictedVisibility",
    title: "Kılavuz gemisi kimlik işareti",
    pattern: "SSSS",
    readable: "4 kısa",
    meaning: "Kılavuzluk görevi yapan gemi, kimliğini bildirmek için verebilir.",
    rule: "Kural 35(k)",
    note: "İsteğe bağlıdır ve diğer zorunlu işaretlere EK olarak verilir.",
  },

  // ─── Kural 35: demirde / karaya oturmuş ───────────────────────────────────
  {
    id: "anchored",
    group: "anchored",
    title: "Demirde gemi",
    pattern: "",
    readable: "Yaklaşık 5 saniye hızlı çan çalma",
    meaning: "Gemi demirdedir.",
    rule: "Kural 35(g)",
    interval: "En fazla 1 dakikada bir",
    note: "100 m ve üzeri gemilerde çan baş tarafta çalınır, hemen ardından kıçta yaklaşık 5 saniye gong çalınır. Yaklaşan gemiyi uyarmak için ayrıca 1 kısa + 1 uzun + 1 kısa düdük verilebilir.",
  },
  {
    id: "aground",
    group: "anchored",
    title: "Karaya oturmuş gemi",
    pattern: "",
    readable: "3 ayrı vuruş + hızlı çan + 3 ayrı vuruş",
    meaning: "Gemi karaya oturmuştur.",
    rule: "Kural 35(h)",
    interval: "En fazla 1 dakikada bir",
    note: "Demir işaretindeki hızlı çan çalmanın hemen ÖNCESİNDE ve SONRASINDA üçer ayrı ve belirgin vuruş yapılır.",
  },

  // ─── Kural 37 / Ek IV: tehlike ────────────────────────────────────────────
  {
    id: "distress-foghorn",
    group: "distress",
    title: "Sürekli sis düdüğü",
    pattern: "LLLL",
    readable: "Aralıksız, sürekli ses",
    meaning: "Tehlike altındayım ve yardıma ihtiyacım var.",
    rule: "Kural 37 / Ek IV",
    note: "Herhangi bir sis işareti cihazının aralıksız çalıştırılması bir tehlike işaretidir.",
  },
  {
    id: "distress-sos",
    group: "distress",
    title: "Mors ile SOS",
    pattern: "",
    readable: "▪▪▪ ▬▬▬ ▪▪▪ (harf araları verilmeden)",
    meaning: "Tehlike altındayım ve yardıma ihtiyacım var.",
    rule: "Kural 37 / Ek IV",
    note: "Ses, ışık veya telsiz — herhangi bir yolla gönderilebilir. Tek bir grup olarak, harfler ayrılmadan verilir.",
  },
  {
    id: "distress-gun",
    group: "distress",
    title: "Dakikada bir top/silah atışı",
    pattern: "",
    readable: "Yaklaşık 1 dakika arayla tek atış",
    meaning: "Tehlike altındayım ve yardıma ihtiyacım var.",
    rule: "Kural 37 / Ek IV",
  },
];

export const soundSignalsByGroup = (group: SoundGroup) =>
  SOUND_SIGNALS.filter((signal) => signal.group === group);
