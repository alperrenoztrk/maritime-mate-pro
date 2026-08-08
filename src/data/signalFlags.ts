// Uluslararası İşaret Kodu (International Code of Signals — ICS) bayrakları.
//
// Tek kaynak: /communication/flags referans sayfası ve
// communicationTopicContents.ts içindeki "Görsel İşaretleşme" konu anlatımı
// bu dosyadan beslenir.
//
// Görseller public/flags/*.svg altındadır ve
// scripts/generate-signal-flag-svgs.mjs tarafından üretilir; geometri o
// script'in başındaki notta açıklandığı gibi doğrulanmıştır.
//
// Tek harfli anlamlar ICS'in "Single-letter signals" bölümündendir. Bazı
// harflerin balıkçı teknelerine özel ikinci bir anlamı vardır; bunlar
// `fishingMeaning` alanında tutulur — sınavda ve sahada en çok karıştırılan
// ayrım budur.

export type FlagKind = "letter" | "numeral" | "substitute" | "answering";

export interface SignalFlag {
  /** public/flags/<id>.svg ile eşleşen kimlik. */
  id: string;
  /** Gösterilecek etiket: harf, rakam veya flama adı. */
  label: string;
  kind: FlagKind;
  /** NATO/ITU fonetik okunuşu (harfler) veya ICS sayı telaffuzu (rakamlar). */
  phonetic?: string;
  /** Mors karşılığı — mors sayfasıyla çapraz referans için. */
  morse?: string;
  /** Tek başına çekildiğinde taşıdığı anlam. */
  meaning: string;
  /** Balıkçı teknelerinin av sahasına yakın kullanımındaki farklı anlam. */
  fishingMeaning?: string;
  /** Renk ve desenin sözle tarifi — arama ve erişilebilirlik için. */
  design: string;
}

export const SIGNAL_FLAG_KIND_LABELS: Record<FlagKind, { title: string; description: string }> = {
  letter: {
    title: "Harf Bayrakları",
    description:
      "26 harf bayrağı. Her biri tek başına çekildiğinde emniyetle ilgili tek bir anlam taşır; iki ve üç harfli gruplar hâlinde çekildiğinde kodlanmış mesaj iletir.",
  },
  numeral: {
    title: "Rakam Flamaları",
    description:
      "0-9 arası rakamlar. Mevki, saat, kanal, mesafe ve kod grubu numaralarını iletmek için kullanılır; harf bayraklarıyla aynı hoist içinde birleştirilebilir.",
  },
  substitute: {
    title: "İkame Flamaları",
    description:
      "Aynı hoist içinde tekrar eden bir bayrağı, ikinci bir takım taşımadan gösterebilmeyi sağlar. Üç ikame flaması sayesinde tek takım bayrakla dört karakterlik her kombinasyon çekilebilir.",
  },
  answering: {
    title: "Cevap Flaması",
    description:
      "Haberleşmenin akışını yöneten flama. Yarıya çekilmesi, tam çekilmesi ve indirilmesi ayrı anlamlar taşır; rakam gruplarında ondalık ayracı olarak da kullanılır.",
  },
};

export const SIGNAL_FLAG_KIND_ORDER: FlagKind[] = ["letter", "numeral", "substitute", "answering"];

export const SIGNAL_FLAGS: SignalFlag[] = [
  {
    id: "a",
    label: "A",
    kind: "letter",
    phonetic: "Alfa",
    morse: ".-",
    meaning: "Dalgıcım var; yavaş hızla ve benden uzak durarak geçin.",
    design: "Kırlangıç kuyruklu. Mandar tarafı beyaz, fly tarafı mavi.",
  },
  {
    id: "b",
    label: "B",
    kind: "letter",
    phonetic: "Bravo",
    morse: "-...",
    meaning: "Tehlikeli yük alıyorum, boşaltıyorum veya taşıyorum.",
    design: "Kırlangıç kuyruklu, tamamı kırmızı.",
  },
  {
    id: "c",
    label: "C",
    kind: "letter",
    phonetic: "Charlie",
    morse: "-.-.",
    meaning: "Olumlu — 'Evet' / önceki grubun anlamı olumlu okunmalıdır.",
    design: "Beş yatay bant: mavi, beyaz, kırmızı, beyaz, mavi.",
  },
  {
    id: "d",
    label: "D",
    kind: "letter",
    phonetic: "Delta",
    morse: "-..",
    meaning: "Benden uzak durun; güçlükle manevra yapıyorum.",
    design: "Sarı zemin üzerinde geniş mavi yatay bant (sarı-mavi-sarı).",
  },
  {
    id: "e",
    label: "E",
    kind: "letter",
    phonetic: "Echo",
    morse: ".",
    meaning: "Rotamı sancağa değiştiriyorum.",
    design: "Üstte mavi, altta kırmızı iki eşit yatay bant.",
  },
  {
    id: "f",
    label: "F",
    kind: "letter",
    phonetic: "Foxtrot",
    morse: "..-.",
    meaning: "Kumandadan acizim; benimle haberleşin.",
    design: "Beyaz zemin üzerinde, kenar ortalarına değen kırmızı baklava.",
  },
  {
    id: "g",
    label: "G",
    kind: "letter",
    phonetic: "Golf",
    morse: "--.",
    meaning: "Kılavuz istiyorum.",
    fishingMeaning: "Av sahasına yakın balıkçı teknesi için: 'Ağlarımı topluyorum.'",
    design: "Altı dikey şerit: sarı ve mavi dönüşümlü, mandardan sarı başlar.",
  },
  {
    id: "h",
    label: "H",
    kind: "letter",
    phonetic: "Hotel",
    morse: "....",
    meaning: "Gemimde kılavuz var.",
    design: "Mandar tarafı beyaz, fly tarafı kırmızı iki dikey bant.",
  },
  {
    id: "i",
    label: "I",
    kind: "letter",
    phonetic: "India",
    morse: "..",
    meaning: "Rotamı iskeleye değiştiriyorum.",
    design: "Sarı zemin üzerinde ortalanmış siyah daire.",
  },
  {
    id: "j",
    label: "J",
    kind: "letter",
    phonetic: "Juliett",
    morse: ".---",
    meaning: "Yangınım var ve tehlikeli yük taşıyorum; benden iyice uzak durun.",
    design: "Üç yatay bant: mavi, beyaz, mavi.",
  },
  {
    id: "k",
    label: "K",
    kind: "letter",
    phonetic: "Kilo",
    morse: "-.-",
    meaning: "Sizinle haberleşmek istiyorum.",
    design: "Mandar tarafı sarı, fly tarafı mavi iki dikey bant.",
  },
  {
    id: "l",
    label: "L",
    kind: "letter",
    phonetic: "Lima",
    morse: ".-..",
    meaning: "Geminizi derhal durdurun.",
    fishingMeaning: "Av sahasına yakın balıkçı teknesi için: 'Ağlarım bir engele takıldı.'",
    design: "Dörde bölünmüş: sarı üst-mandar ve alt-fly, siyah üst-fly ve alt-mandar.",
  },
  {
    id: "m",
    label: "M",
    kind: "letter",
    phonetic: "Mike",
    morse: "--",
    meaning: "Gemim durdu; suya göre yol almıyor.",
    design: "Mavi zemin üzerinde beyaz çapraz haç (saltire).",
  },
  {
    id: "n",
    label: "N",
    kind: "letter",
    phonetic: "November",
    morse: "-.",
    meaning: "Olumsuz — 'Hayır' / önceki grubun anlamı olumsuz okunmalıdır.",
    design: "16 kareli mavi-beyaz dama; üst-mandar köşe mavidir.",
  },
  {
    id: "o",
    label: "O",
    kind: "letter",
    phonetic: "Oscar",
    morse: "---",
    meaning: "Denize adam düştü.",
    design: "Köşegen bölünme: üst-fly üçgeni kırmızı, alt-mandar üçgeni sarı.",
  },
  {
    id: "p",
    label: "P",
    kind: "letter",
    phonetic: "Papa",
    morse: ".--.",
    meaning:
      "Limanda: 'Gemi denize çıkmak üzere, herkes gemiye dönsün.' (Blue Peter)",
    fishingMeaning: "Denizde balıkçı teknesi için: 'Ağlarım bir engele takıldı.'",
    design: "Mavi zemin üzerinde ortalanmış beyaz kare.",
  },
  {
    id: "q",
    label: "Q",
    kind: "letter",
    phonetic: "Quebec",
    morse: "--.-",
    meaning: "Gemim sağlıklı; serbest pratika talep ediyorum.",
    design: "Tamamı sarı.",
  },
  {
    id: "r",
    label: "R",
    kind: "letter",
    phonetic: "Romeo",
    morse: ".-.",
    meaning:
      "Yürürlükteki ICS'te tek harfli anlamı yoktur. Prosedürde 'Aldım' (received) karşılığı olarak kullanılır.",
    design: "Kırmızı zemin üzerinde sarı Yunan haçı.",
  },
  {
    id: "s",
    label: "S",
    kind: "letter",
    phonetic: "Sierra",
    morse: "...",
    meaning: "Makinelerim tornistan çalışıyor.",
    design: "Beyaz zemin üzerinde ortalanmış mavi kare.",
  },
  {
    id: "t",
    label: "T",
    kind: "letter",
    phonetic: "Tango",
    morse: "-",
    meaning: "Benden uzak durun; ikili (pair) trol avcılığı yapıyorum.",
    design: "Üç dikey şerit: kırmızı, beyaz, mavi.",
  },
  {
    id: "u",
    label: "U",
    kind: "letter",
    phonetic: "Uniform",
    morse: "..-",
    meaning: "Tehlikeye doğru gidiyorsunuz.",
    design: "Dörde bölünmüş: kırmızı üst-mandar ve alt-fly, beyaz üst-fly ve alt-mandar.",
  },
  {
    id: "v",
    label: "V",
    kind: "letter",
    phonetic: "Victor",
    morse: "...-",
    meaning: "Yardıma ihtiyacım var.",
    design: "Beyaz zemin üzerinde kırmızı çapraz haç (saltire).",
  },
  {
    id: "w",
    label: "W",
    kind: "letter",
    phonetic: "Whiskey",
    morse: ".--",
    meaning: "Tıbbi yardıma ihtiyacım var.",
    design: "İç içe üç dikdörtgen: dışta mavi, ortada beyaz, merkezde kırmızı.",
  },
  {
    id: "x",
    label: "X",
    kind: "letter",
    phonetic: "X-ray",
    morse: "-..-",
    meaning: "Niyetinizden vazgeçin ve işaretlerimi gözleyin.",
    design: "Beyaz zemin üzerinde mavi Yunan haçı.",
  },
  {
    id: "y",
    label: "Y",
    kind: "letter",
    phonetic: "Yankee",
    morse: "-.--",
    meaning: "Demirim tarıyor.",
    design: "Sarı ve kırmızı çapraz (diyagonal) şeritler.",
  },
  {
    id: "z",
    label: "Z",
    kind: "letter",
    phonetic: "Zulu",
    morse: "--..",
    meaning: "Römorkör istiyorum.",
    fishingMeaning: "Av sahasına yakın balıkçı teknesi için: 'Ağlarımı atıyorum.'",
    design:
      "Merkezde birleşen dört üçgen: üstte sarı, mandarda siyah, altta kırmızı, fly'da mavi.",
  },

  // ─── Rakam flamaları ──────────────────────────────────────────────────────
  {
    id: "n0",
    label: "0",
    kind: "numeral",
    phonetic: "Nadazero",
    morse: "-----",
    meaning: "Sıfır rakamı.",
    design: "Sivri flama; sarı-kırmızı-sarı dikey üçlü bölünme.",
  },
  {
    id: "n1",
    label: "1",
    kind: "numeral",
    phonetic: "Unaone",
    morse: ".----",
    meaning: "Bir rakamı.",
    design: "Sivri flama; beyaz zemin, mandara yakın kırmızı daire.",
  },
  {
    id: "n2",
    label: "2",
    kind: "numeral",
    phonetic: "Bissotwo",
    morse: "..---",
    meaning: "İki rakamı.",
    design: "Sivri flama; mavi zemin, mandara yakın beyaz daire.",
  },
  {
    id: "n3",
    label: "3",
    kind: "numeral",
    phonetic: "Terrathree",
    morse: "...--",
    meaning: "Üç rakamı.",
    design: "Sivri flama; kırmızı-beyaz-mavi dikey üçlü bölünme.",
  },
  {
    id: "n4",
    label: "4",
    kind: "numeral",
    phonetic: "Kartefour",
    morse: "....-",
    meaning: "Dört rakamı.",
    design: "Sivri flama; kırmızı zemin üzerinde beyaz haç.",
  },
  {
    id: "n5",
    label: "5",
    kind: "numeral",
    phonetic: "Pantafive",
    morse: ".....",
    meaning: "Beş rakamı.",
    design: "Sivri flama; mandar yarısı sarı, fly yarısı mavi.",
  },
  {
    id: "n6",
    label: "6",
    kind: "numeral",
    phonetic: "Soxisix",
    morse: "-....",
    meaning: "Altı rakamı.",
    design: "Sivri flama; üst yarısı siyah, alt yarısı beyaz.",
  },
  {
    id: "n7",
    label: "7",
    kind: "numeral",
    phonetic: "Setteseven",
    morse: "--...",
    meaning: "Yedi rakamı.",
    design: "Sivri flama; üst yarısı sarı, alt yarısı kırmızı.",
  },
  {
    id: "n8",
    label: "8",
    kind: "numeral",
    phonetic: "Oktoeight",
    morse: "---..",
    meaning: "Sekiz rakamı.",
    design: "Sivri flama; beyaz zemin üzerinde kırmızı haç.",
  },
  {
    id: "n9",
    label: "9",
    kind: "numeral",
    phonetic: "Novenine",
    morse: "----.",
    meaning: "Dokuz rakamı.",
    design:
      "Sivri flama; dörde bölünmüş: beyaz üst-mandar, siyah üst-fly, kırmızı alt-mandar, sarı alt-fly.",
  },

  // ─── İkame flamaları ──────────────────────────────────────────────────────
  {
    id: "sub1",
    label: "1. İkame",
    kind: "substitute",
    meaning:
      "Aynı hoist içinde, kendi sınıfındaki (harf veya rakam) BİRİNCİ bayrağı tekrarlar.",
    design: "Üçgen flama; mavi zemin üzerinde, uca değmeyen sarı iç üçgen.",
  },
  {
    id: "sub2",
    label: "2. İkame",
    kind: "substitute",
    meaning: "Aynı hoist içinde, kendi sınıfındaki İKİNCİ bayrağı tekrarlar.",
    design: "Üçgen flama; mandar tarafı mavi, fly tarafı beyaz.",
  },
  {
    id: "sub3",
    label: "3. İkame",
    kind: "substitute",
    meaning: "Aynı hoist içinde, kendi sınıfındaki ÜÇÜNCÜ bayrağı tekrarlar.",
    design: "Üçgen flama; beyaz zemin üzerinde yatay siyah bant.",
  },

  // ─── Cevap flaması ────────────────────────────────────────────────────────
  {
    id: "answer",
    label: "Cevap Flaması",
    kind: "answering",
    meaning:
      "Yarıya çekili (at the dip): 'İşaretinizi gördüm, henüz çözemedim.' Tam çekili (close up): 'Anladım.' İndirilmesi: haberleşmenin bittiğini bildirir. Rakam grupları arasında ondalık ayracı olarak da kullanılır.",
    design: "Sivri flama; beş dikey şerit — kırmızı, beyaz, kırmızı, beyaz, kırmızı.",
  },
];

export const SIGNAL_FLAG_BY_ID: Record<string, SignalFlag> = Object.fromEntries(
  SIGNAL_FLAGS.map((flag) => [flag.id, flag]),
);

/** Operasyonda en sık kullanılan iki harfli kod grupları. */
export interface FlagGroup {
  code: string;
  meaning: string;
}

export const COMMON_FLAG_GROUPS: FlagGroup[] = [
  { code: "NC", meaning: "Tehlike altındayım ve acil yardıma ihtiyacım var." },
  { code: "AC", meaning: "Gemimi terk ediyorum." },
  { code: "AE", meaning: "Gemimi terk etmek zorundayım." },
  { code: "AN", meaning: "Doktora ihtiyacım var." },
  { code: "CB", meaning: "Acil yardıma ihtiyacım var." },
  { code: "DX", meaning: "Batıyorum." },
  { code: "EL", meaning: "Tehlike mevkiini tekrarlayın." },
  { code: "GW", meaning: "Denize adam düştü; almak için harekete geçin." },
  { code: "JL", meaning: "Karaya oturma riski altındasınız." },
  { code: "PD", meaning: "Seyir fenerleriniz görünmüyor." },
  { code: "PP", meaning: "Benden iyice uzak durun." },
  { code: "QD", meaning: "İleri yol veriyorum." },
  { code: "QT", meaning: "Tornistan veriyorum." },
  { code: "QQ", meaning: "Sağlık kontrolü (free pratique) talep ediyorum." },
  { code: "RU", meaning: "Benden uzak durun; güçlükle manevra yapıyorum." },
  { code: "UM", meaning: "Liman trafiğe kapalıdır." },
  { code: "UP", meaning: "Limana giriş izni acilen talep ediliyor; acil durumum var." },
  { code: "YU", meaning: "Sizinle Uluslararası İşaret Kodu ile haberleşeceğim." },
  { code: "ZL", meaning: "İşaretiniz alındı ancak anlaşılmadı." },
];
