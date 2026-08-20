// Single Turkish detector shared by every guard that must not let Turkish reach
// the screen.
//
// Two callers depend on it and both fail in the same direction when the check is
// too narrow:
//
//   * The English pass in LanguageContext skips a source string that is already
//     English. A Turkish string the check misses is therefore never translated
//     and never fetched — it stays Turkish forever, whatever the network does.
//   * isTechnicalString() treats a formula as language independent. A Turkish
//     sentence misread as a formula is likewise pinned to the source language.
//
// The previous list held seventeen words, so ASCII-only Turkish ("Kaynak",
// "Toplam", "Rapor", "Standart") passed as English. Detection here is therefore
// deliberately generous: a false positive only costs one translation lookup that
// returns the string unchanged, while a false negative is untranslated Turkish
// in the UI.

// Letters that exist in Turkish but not in English. "â" appears in Turkish
// loanwords ("rüzgâr") and is treated the same way.
const TURKISH_LETTERS = /[şğıçöüâŞĞİÇÖÜÂ]/;

// Function words, high-frequency nouns and verb forms of the authored corpus.
// ASCII-only entries only: anything carrying a Turkish letter is already caught
// above.
const TURKISH_WORDS = [
  // function words / conjunctions
  've', 'ile', 'bu', 'bir', 'birden', 'olarak', 'veya', 'ise', 'ancak', 'ayrica',
  'gibi', 'kadar', 'daha', 'sonra', 'once', 'her', 'hem', 'cok', 'tum', 'tumu',
  'diger', 'baska', 'kendi', 'buna', 'bunun', 'bunlar', 'sadece', 'yalniz',
  'icin', 'gore', 'uzere', 'icinde', 'arasinda', 'olmasi', 'olup', 'ayni',
  'yani', 'boylece', 'anlami', 'anlaminda',
  // verbs / predicates
  'yok', 'olan', 'olur', 'olmali', 'edilir', 'yapilir', 'kullanilir', 'verilir',
  'alinir', 'gerekir', 'gerekli', 'zorunlu', 'bulunur', 'gosterir', 'saglar', 'yapar',
  'eder', 'kaydet', 'kaydedildi', 'sil', 'silindi', 'ekle', 'eklendi', 'sec', 'secildi',
  'kapat', 'iptal', 'tamam', 'geri', 'ileri', 'baslat', 'durdur',
  // frequent nouns of the corpus
  'gemi', 'gemiler', 'deniz', 'liman', 'yuk', 'kargo', 'ambar', 'guverte', 'makine',
  'seyir', 'rota', 'dalga', 'ruzgar', 'hava', 'su', 'basinc', 'sicaklik', 'yogunluk',
  'hesap', 'hesabi', 'hesaplama', 'formul', 'ornek', 'sonuc', 'deger', 'birim', 'oran',
  'sayfa', 'baslik', 'liste', 'listesi', 'tablo', 'sekil', 'resim', 'aciklama', 'bilgi',
  'kaynak', 'kural', 'kurallar', 'madde', 'bolum', 'konu', 'konular', 'ders', 'dersler',
  'soru', 'sorular', 'cevap', 'yanit', 'sinav', 'egitim', 'calisma', 'gorev',
  'durum', 'durumu', 'tipi', 'tanim', 'amac', 'ozellik', 'ozellikleri', 'sistem',
  'sistemi', 'cihaz', 'ekipman', 'donanim', 'guvenlik', 'emniyet', 'kontrol', 'olcum',
  'toplam', 'genel', 'temel', 'onemli', 'rapor', 'zaman', 'tarih', 'saat',
  'gun', 'yil', 'adet', 'sayi', 'notlar', 'ayar', 'ayarlar', 'secim',
  'kullanici', 'hesabim', 'profil', 'giris', 'cikis', 'dosya', 'klasor',
  'sart', 'sartlar', 'kisim', 'derece', 'aci', 'boyut', 'agirlik', 'yukseklik',
  'genislik', 'uzunluk', 'derinlik', 'mesafe', 'hiz', 'yon', 'nokta', 'cizgi', 'duzey',
  // question words
  'nedir', 'nasil', 'neden', 'hangi', 'nerede', 'kac',
];

// Matched on the accent-stripped string so "değer" is caught by "deger" and
// "açı" by "aci" without listing both spellings.
const TURKISH_WORD_RE = new RegExp(
  `(?:^|[^\\p{L}])(?:${TURKISH_WORDS.join('|')})(?=$|[^\\p{L}])`,
  'iu',
);

// Suffix shapes that essentially only occur in Turkish. They catch inflected
// forms the word list cannot enumerate ("yüklemeler", "hesaplanır", "gemide").
const TURKISH_SUFFIX_RE =
  /\p{L}{3,}(?:lari|leri|larin|lerin|lardan|lerden|lara|lere|larda|lerde|imiz|iniz|siniz|maktadir|mektedir|lidir|dadir|tedir|masi|mesi|nin|nun)(?=$|[^\p{L}])/iu;

const stripAccents = (value: string): string =>
  value
    .replace(/[ıİ]/g, 'i')
    .replace(/[şŞ]/g, 's')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[çÇ]/g, 'c')
    .replace(/[öÖ]/g, 'o')
    .replace(/[üÜ]/g, 'u')
    .replace(/[âÂ]/g, 'a');

/**
 * True when a string still reads as Turkish and must not be shown as-is.
 *
 * Turkish-specific letters answer it outright; the ASCII-only remainder is
 * matched against the corpus word list and against suffix shapes, so an
 * inflected form is caught even when its stem is not listed.
 */
export const hasTurkishText = (value: string): boolean => {
  if (!value) return false;
  if (TURKISH_LETTERS.test(value)) return true;
  const plain = stripAccents(value);
  return TURKISH_WORD_RE.test(plain) || TURKISH_SUFFIX_RE.test(plain);
};
