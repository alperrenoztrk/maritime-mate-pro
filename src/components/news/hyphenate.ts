/**
 * Gazete dizgisi için yumuşak tire (soft hyphen) yerleştirme.
 *
 * İki yana yaslı dar sütunlarda tarayıcının `hyphens: auto` özelliği ancak o dil
 * için tireleme sözlüğü varsa çalışır; Chromium/Android WebView birçok dilde —
 * Türkçe dahil — sözlük getirmez. Sözlük yoksa uzun kelimeler satıra sığmaz ve
 * kelimeler arasında geniş boşluklar ("nehirler") oluşur; bu da basılı sayfa
 * hissini en çok bozan şey.
 *
 * Buradaki kural Türkçe hecelemenin ta kendisi ve Latin alfabesi kullanan diğer
 * dillerde de makul sonuç verir:
 *   • İki ünlü arasındaki tek ünsüz sonraki heceye gider:  ka-nal
 *   • İki ünlü arasındaki iki ünsüz ayrılır:               kan-tar
 * Yumuşak tire yalnızca bölünme *izni* verir; satır sığdığında görünmez.
 */

const SHY = "­";

/* Latin-1 Supplement + Latin Extended-A: uygulamanın Latin alfabeli dillerini
   kapsar. Latin dışı yazılar (ja/ko/zh) eşleşmez — zaten tirelemeye gerek yok. */
const LETTER_CLASS = "A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF\\u0100-\\u017F";
const LONG_WORD_RE = new RegExp(`[${LETTER_CLASS}]{8,}`, "g");

const VOWELS = new Set(
  "aeıioöuüàáâãäåèéêëìíîïòóôõùúûāăąēĕėęěīĭįōŏőũūŭůűųœæ".split(""),
);

function isVowel(ch: string): boolean {
  return VOWELS.has(ch.toLowerCase());
}

/** Uzun kelimelere hece sınırlarında yumuşak tire ekler. */
export function softHyphenate(text: string): string {
  if (!text) return text;
  return text.replace(LONG_WORD_RE, (word) => {
    const chars = Array.from(word);
    const out: string[] = [chars[0], chars[1]];
    // Bir önceki tireden bu yana kaç harf geçti — çok sık bölmemek için.
    let sinceBreak = 2;

    for (let i = 2; i < chars.length; i++) {
      const cur = chars[i];
      const prev = chars[i - 1];
      const next = chars[i + 1];
      // Sağda en az 3 harf kalsın: tek/çift harflik parçalar dizgide çirkin durur.
      const roomOnRight = chars.length - i >= 3;
      const breakHere =
        roomOnRight &&
        sinceBreak >= 3 &&
        next !== undefined &&
        isVowel(next) &&
        !isVowel(cur) &&
        // V|CV (ka-nal) ya da VC|CV (kan-tar)
        (isVowel(prev) || (i >= 3 && !isVowel(prev) && isVowel(chars[i - 2])));

      if (breakHere) {
        out.push(SHY);
        sinceBreak = 0;
      }
      out.push(cur);
      sinceBreak++;
    }
    return out.join("");
  });
}
