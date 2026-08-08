// Mors alfabesi ve denizcilikte kullanılan mors prosedür işaretleri.
//
// Tek kaynak: bu dosya hem /communication/morse referans sayfasını hem de
// communicationTopicContents.ts içindeki "Görsel İşaretleşme" konu anlatımını
// besler.
//
// Kod tablosu ITU-R M.1677-1 ("International Morse code") esas alınarak
// yazılmıştır. Prosedür işaretleri ise IMO Uluslararası İşaret Kodu'nun
// (International Code of Signals) ışıkla mors işaretleşmesi bölümünden gelir —
// denizcinin gerçekten kullandığı kısım budur, salt alfabe değil.
//
// Zamanlama (ITU-R M.1677-1, madde 1):
//   nokta = 1 birim · çizgi = 3 birim · öğeler arası = 1 birim
//   harfler arası = 3 birim · kelimeler arası = 7 birim

export type MorseGroup = "letter" | "digit" | "punctuation" | "procedure" | "accented";

export interface MorseEntry {
  /** Gösterilecek karakter ya da kısaltma (ör. "A", "7", "AR"). */
  char: string;
  /** Nokta/çizgi dizisi. Prosedür işaretlerinde harfler bitişik gönderilir. */
  code: string;
  group: MorseGroup;
  /** Harf bayrağı/telsiz karşılığı (NATO fonetik alfabesi). */
  phonetic?: string;
  /** Denizcilikte ne anlama geldiği / nerede kullanıldığı. */
  maritimeUse?: string;
}

export const MORSE_GROUP_LABELS: Record<MorseGroup, { title: string; description: string }> = {
  letter: {
    title: "Harfler",
    description:
      "26 temel harf. Mors lambasıyla gönderilen her mesaj bu harflerden kurulur; işaret bayraklarının tek harfli anlamları da aynı harflere karşılık gelir.",
  },
  digit: {
    title: "Rakamlar",
    description:
      "0-9 arası rakamlar her zaman beş öğeden oluşur. Mevki, kanal, saat ve mesafe bildirirken rakamlar tek tek gönderilir.",
  },
  punctuation: {
    title: "Noktalama",
    description:
      "Mevki ve sayısal bilgi gönderirken gereken işaretler. Denizcilikte en çok ondalık ayracı, kesir çizgisi ve soru işareti kullanılır.",
  },
  procedure: {
    title: "Prosedür İşaretleri",
    description:
      "Uluslararası İşaret Kodu'nun ışıkla haberleşme bölümünde tanımlı servis işaretleri. Mesajın kendisini değil, haberleşmenin akışını yönetirler: çağrı, teyit, tekrar isteme, düzeltme ve bitiş.",
  },
  accented: {
    title: "Aksanlı Harfler (ITU)",
    description:
      "ITU-R M.1677-1'in tanımladığı aksanlı harfler. Türkçedeki Ç, Ö ve Ü bu kodlarla gönderilir; Ğ, İ ve Ş için uluslararası mors karşılığı YOKTUR — gemi adı hecelenirken bunlar temel harflerine (G, I, S) indirgenir.",
  },
};

export const MORSE_GROUP_ORDER: MorseGroup[] = [
  "letter",
  "digit",
  "procedure",
  "punctuation",
  "accented",
];

export const MORSE_CODE: MorseEntry[] = [
  // ─── Harfler ──────────────────────────────────────────────────────────────
  { char: "A", code: ".-", group: "letter", phonetic: "Alfa", maritimeUse: "Bayrak anlamı: 'Dalgıcım var, yavaş ve dikkatli geç.'" },
  { char: "B", code: "-...", group: "letter", phonetic: "Bravo", maritimeUse: "Bayrak anlamı: 'Tehlikeli yük alıyor/boşaltıyor/taşıyorum.'" },
  { char: "C", code: "-.-.", group: "letter", phonetic: "Charlie", maritimeUse: "Olumlu (evet). Dar kanalda geçme onayı düdükle de bu ritimle verilir: ▬ ● ▬ ●" },
  { char: "D", code: "-..", group: "letter", phonetic: "Delta", maritimeUse: "Bayrak anlamı: 'Beni uzak tutun, güçlükle manevra yapıyorum.'" },
  { char: "E", code: ".", group: "letter", phonetic: "Echo", maritimeUse: "Bayrak anlamı: 'Rotamı sancağa değiştiriyorum.'" },
  { char: "F", code: "..-.", group: "letter", phonetic: "Foxtrot", maritimeUse: "Bayrak anlamı: 'Kumandadan acizim, benimle haberleşin.'" },
  { char: "G", code: "--.", group: "letter", phonetic: "Golf", maritimeUse: "Bayrak anlamı: 'Kılavuz istiyorum.'" },
  { char: "H", code: "....", group: "letter", phonetic: "Hotel", maritimeUse: "Bayrak anlamı: 'Gemimde kılavuz var.'" },
  { char: "I", code: "..", group: "letter", phonetic: "India", maritimeUse: "Bayrak anlamı: 'Rotamı iskeleye değiştiriyorum.'" },
  { char: "J", code: ".---", group: "letter", phonetic: "Juliett", maritimeUse: "Bayrak anlamı: 'Yangınım var ve tehlikeli yük taşıyorum, benden uzak durun.'" },
  { char: "K", code: "-.-", group: "letter", phonetic: "Kilo", maritimeUse: "'Sizinle haberleşmek istiyorum.' Ayrıca gönderme davetidir (invitation to transmit)." },
  { char: "L", code: ".-..", group: "letter", phonetic: "Lima", maritimeUse: "Bayrak anlamı: 'Geminizi derhal durdurun.'" },
  { char: "M", code: "--", group: "letter", phonetic: "Mike", maritimeUse: "Bayrak anlamı: 'Gemim durdu, suya göre yol almıyor.'" },
  { char: "N", code: "-.", group: "letter", phonetic: "November", maritimeUse: "Olumsuz (hayır). NC birleşimi tehlike işaretidir." },
  { char: "O", code: "---", group: "letter", phonetic: "Oscar", maritimeUse: "Bayrak anlamı: 'Denize adam düştü.' (man overboard)" },
  { char: "P", code: ".--.", group: "letter", phonetic: "Papa", maritimeUse: "Limanda 'Blue Peter': gemi denize çıkmak üzere, herkes gemiye." },
  { char: "Q", code: "--.-", group: "letter", phonetic: "Quebec", maritimeUse: "Bayrak anlamı: 'Gemim sağlıklı, serbest pratika talep ediyorum.'" },
  { char: "R", code: ".-.", group: "letter", phonetic: "Romeo", maritimeUse: "Prosedürde 'Aldım' (received) anlamında kullanılır." },
  { char: "S", code: "...", group: "letter", phonetic: "Sierra", maritimeUse: "Bayrak anlamı: 'Makinelerim tornistan çalışıyor.'" },
  { char: "T", code: "-", group: "letter", phonetic: "Tango", maritimeUse: "Alınan her kelimeyi teyit etmek için tek başına gönderilir." },
  { char: "U", code: "..-", group: "letter", phonetic: "Uniform", maritimeUse: "Bayrak anlamı: 'Tehlikeye doğru gidiyorsunuz.'" },
  { char: "V", code: "...-", group: "letter", phonetic: "Victor", maritimeUse: "Bayrak anlamı: 'Yardıma ihtiyacım var.'" },
  { char: "W", code: ".--", group: "letter", phonetic: "Whiskey", maritimeUse: "Bayrak anlamı: 'Tıbbi yardım istiyorum.'" },
  { char: "X", code: "-..-", group: "letter", phonetic: "X-ray", maritimeUse: "Bayrak anlamı: 'Niyetinizden vazgeçin ve işaretlerimi gözleyin.'" },
  { char: "Y", code: "-.--", group: "letter", phonetic: "Yankee", maritimeUse: "Bayrak anlamı: 'Demirim tarıyor.'" },
  { char: "Z", code: "--..", group: "letter", phonetic: "Zulu", maritimeUse: "Bayrak anlamı: 'Römorkör istiyorum.'" },

  // ─── Rakamlar ─────────────────────────────────────────────────────────────
  { char: "1", code: ".----", group: "digit" },
  { char: "2", code: "..---", group: "digit" },
  { char: "3", code: "...--", group: "digit" },
  { char: "4", code: "....-", group: "digit" },
  { char: "5", code: ".....", group: "digit" },
  { char: "6", code: "-....", group: "digit" },
  { char: "7", code: "--...", group: "digit" },
  { char: "8", code: "---..", group: "digit" },
  { char: "9", code: "----.", group: "digit" },
  { char: "0", code: "-----", group: "digit" },

  // ─── Prosedür işaretleri (International Code of Signals) ───────────────────
  {
    char: "AA AA AA",
    code: ".- .- .-",
    group: "procedure",
    maritimeUse:
      "Genel çağrı. Karşı istasyonun adı/çağrı işareti bilinmediğinde, cevap gelene kadar tekrarlanır.",
  },
  {
    char: "TTTT",
    code: "- - - -",
    group: "procedure",
    maritimeUse:
      "Cevap işareti. Çağrıyı gören istasyon, mesajı almaya hazır olduğunu bildirmek için gönderir.",
  },
  {
    char: "K",
    code: "-.-",
    group: "procedure",
    maritimeUse: "Gönderme daveti: 'Mesajınızı verin.'",
  },
  {
    char: "T",
    code: "-",
    group: "procedure",
    maritimeUse:
      "Alma teyidi. Alıcı, aldığı HER kelime veya harf grubundan sonra tek T gönderir; T gelmiyorsa gönderen tekrarlar.",
  },
  {
    char: "AR",
    code: ".-.-.",
    group: "procedure",
    maritimeUse: "Bitiş işareti: mesajın veya haberleşmenin sonu.",
  },
  {
    char: "AS",
    code: ".-...",
    group: "procedure",
    maritimeUse: "Bekleme işareti: 'Bekleyin.'",
  },
  {
    char: "EEEEEEEE",
    code: "........",
    group: "procedure",
    maritimeUse:
      "Silme (hata) işareti. Sekiz nokta gönderilir; ardından son doğru kelimeden itibaren tekrar edilir.",
  },
  {
    char: "RPT",
    code: ".-. .--. -",
    group: "procedure",
    maritimeUse: "Tekrar isteği. AA / AB / WA / WB / BN ile birlikte hangi kısmın tekrarlanacağı belirtilir.",
  },
  {
    char: "AA",
    code: ".- .-",
    group: "procedure",
    maritimeUse: "'…'den sonrasının tamamı' (all after) — tekrar isteğinde kullanılır.",
  },
  {
    char: "AB",
    code: ".- -...",
    group: "procedure",
    maritimeUse: "'…'den öncesinin tamamı' (all before).",
  },
  {
    char: "WA",
    code: ".-- .-",
    group: "procedure",
    maritimeUse: "'…'den sonraki kelime/grup' (word or group after).",
  },
  {
    char: "WB",
    code: ".-- -...",
    group: "procedure",
    maritimeUse: "'…'den önceki kelime/grup' (word or group before).",
  },
  {
    char: "BN",
    code: "-... -.",
    group: "procedure",
    maritimeUse: "'… ile … arasının tamamı' (all between).",
  },
  {
    char: "DE",
    code: "-.. .",
    group: "procedure",
    maritimeUse: "'…'den' — gönderen istasyonun kimliğinden önce yollanır.",
  },
  {
    char: "CQ",
    code: "-.-. --.-",
    group: "procedure",
    maritimeUse: "Tüm istasyonlara genel çağrı.",
  },
  {
    char: "CS",
    code: "-.-. ...",
    group: "procedure",
    maritimeUse: "'Geminizin adı veya tanıtma işareti nedir?'",
  },
  {
    char: "RQ",
    code: ".-. --.-",
    group: "procedure",
    maritimeUse: "Soru işareti: kendisinden önceki işareti soru hâline getirir.",
  },
  {
    char: "OK",
    code: "--- -.-",
    group: "procedure",
    maritimeUse: "'Doğru' — tekrarın doğru alındığını teyit eder.",
  },
  {
    char: "SOS",
    code: "...---...",
    group: "procedure",
    maritimeUse:
      "Tehlike işareti. Aralıksız tek bir grup olarak gönderilir (harf araları verilmez). COLREG Ek IV'te sayılan tehlike işaretlerindendir.",
  },

  // ─── Noktalama ────────────────────────────────────────────────────────────
  { char: ".", code: ".-.-.-", group: "punctuation", maritimeUse: "Nokta / ondalık ayracı." },
  { char: ",", code: "--..--", group: "punctuation", maritimeUse: "Virgül." },
  { char: ":", code: "---...", group: "punctuation", maritimeUse: "İki nokta — saat bildiriminde kullanılır." },
  { char: "?", code: "..--..", group: "punctuation", maritimeUse: "Soru işareti." },
  { char: "'", code: ".----.", group: "punctuation", maritimeUse: "Kesme işareti." },
  { char: "-", code: "-....-", group: "punctuation", maritimeUse: "Tire." },
  { char: "/", code: "-..-.", group: "punctuation", maritimeUse: "Kesir çizgisi — enlem/boylam ve tarih yazımında." },
  { char: "(", code: "-.--.", group: "punctuation", maritimeUse: "Parantez açma." },
  { char: ")", code: "-.--.-", group: "punctuation", maritimeUse: "Parantez kapama." },
  { char: "\"", code: ".-..-.", group: "punctuation", maritimeUse: "Tırnak." },
  { char: "=", code: "-...-", group: "punctuation", maritimeUse: "Çift tire — mesaj içinde bölüm ayracı." },
  { char: "+", code: ".-.-.", group: "punctuation", maritimeUse: "Artı / haç işareti (AR ile aynı dizidir)." },
  { char: "@", code: ".--.-.", group: "punctuation", maritimeUse: "'At' işareti — e-posta adresi hecelerken." },

  // ─── ITU aksanlı harfler ──────────────────────────────────────────────────
  { char: "Ç", code: "-.-..", group: "accented", maritimeUse: "ITU aksanlı harf (ç). Türkçe gemi adlarında kullanılır." },
  { char: "Ö", code: "---.", group: "accented", maritimeUse: "ITU aksanlı harf (ö)." },
  { char: "Ü", code: "..--", group: "accented", maritimeUse: "ITU aksanlı harf (ü)." },
  { char: "Ñ", code: "--.--", group: "accented", maritimeUse: "ITU aksanlı harf (ñ)." },
  { char: "Ä", code: ".-.-", group: "accented", maritimeUse: "ITU aksanlı harf (ä)." },
  { char: "É", code: "..-..", group: "accented", maritimeUse: "ITU aksanlı harf (é)." },
  { char: "È", code: ".-..-", group: "accented", maritimeUse: "ITU aksanlı harf (è)." },
  { char: "À / Å", code: ".--.-", group: "accented", maritimeUse: "ITU aksanlı harf (à, å)." },
  { char: "CH", code: "----", group: "accented", maritimeUse: "ITU'da tek harf sayılan 'ch' ikilisi." },
];

/** Metin → mors çevirisi için tablo. Prosedür işaretleri dışarıda bırakılır. */
const ENCODE_TABLE: Record<string, string> = Object.fromEntries(
  MORSE_CODE.filter((entry) => entry.group !== "procedure" && entry.char.length === 1).map(
    (entry) => [entry.char.toLocaleUpperCase("tr-TR"), entry.code],
  ),
);

// ITU'da karşılığı olmayan Türkçe harfler temel harflerine indirgenir; gemi
// adı hecelenirken sahada yapılan da budur.
const TURKISH_FALLBACK: Record<string, string> = {
  Ğ: "G",
  İ: "I",
  I: "I",
  Ş: "S",
};

export interface MorseEncodedWord {
  /** Kaynak kelime. */
  word: string;
  /** Harf harf çeviri. `code` boşsa karakterin mors karşılığı yoktur. */
  letters: { char: string; code: string }[];
}

/**
 * Bir metni mors dizisine çevirir. Sonuç kelime kelime döner ki arayüz
 * kelime aralarını (7 birim) görsel olarak ayırabilsin.
 */
export const encodeToMorse = (text: string): MorseEncodedWord[] =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({
      word,
      letters: [...word].map((raw) => {
        const upper = raw.toLocaleUpperCase("tr-TR");
        const normalized = TURKISH_FALLBACK[upper] ?? upper;
        return { char: raw, code: ENCODE_TABLE[normalized] ?? "" };
      }),
    }));

export const MORSE_BY_GROUP = (group: MorseGroup) =>
  MORSE_CODE.filter((entry) => entry.group === group);
