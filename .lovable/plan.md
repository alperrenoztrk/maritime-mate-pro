# Bağlam-Farkındalıklı Çeviri Katmanı

## Sorun

Şu anki sözlük **tek kelime** bazlı çalışıyor: "Demurrage" → "Demurrage", "Hesap" → yok. Google Translate bunları görünce "Demurrage hesabı"nı **"Demurrage account"** yapıyor çünkü Türkçe "hesap" hem *account* hem *calculation* demek. Sözlük tek başına bunu düzeltemiyor — cümledeki denizcilik bağlamına bakması lazım.

Aynı sorun potansiyel olarak şu kelimelerde de var:
- **hesap / hesabı** → account vs calculation (demurrage/laytime/navlun/TCE/sefer bağlamında = calculation)
- **oran / oranı** → ratio vs rate (navlun, demurrage, despatch bağlamında = rate)
- **süre / süresi** → duration vs time/laytime (sefer, yükleme, tahliye bağlamında)
- **gider / geliri** → expense/income (sefer bağlamında = voyage cost / freight revenue)
- **açık** → open vs offshore (deniz bağlamında)
- **yol** → road vs way/course (seyir bağlamında)

## Çözüm — İki adımlı bağlam katmanı

### 1. Çok kelimeli ifade sözlüğü (phrase glossary)

`maritimeGlossary.ts` içine yeni bir **`maritimePhrases`** listesi eklenecek. Tek kelimelik terimlerin aksine, bunlar bağlam içeren tam ifadelerdir ve **her şeyden önce** eşleşir (mevcut tek-kelime maskelemeden önce):

```ts
{ tr: 'Demurrage Hesabı', translations: { en: 'Demurrage Calculation', de: 'Demurrage-Berechnung', ... } }
{ tr: 'Laytime Hesabı',    translations: { en: 'Laytime Calculation', ... } }
{ tr: 'Navlun Oranı',      translations: { en: 'Freight Rate', ... } }
{ tr: 'Sefer Gideri',      translations: { en: 'Voyage Cost', ... } }
{ tr: 'Sefer Geliri',      translations: { en: 'Voyage Revenue', ... } }
{ tr: 'Sefer Süresi',      translations: { en: 'Voyage Duration', ... } }
{ tr: 'Yükleme Oranı',     translations: { en: 'Loading Rate', ... } }
{ tr: 'Tahliye Oranı',     translations: { en: 'Discharge Rate', ... } }
{ tr: 'Despatch Oranı',    translations: { en: 'Despatch Rate', ... } }
{ tr: 'Bunker Maliyeti',   translations: { en: 'Bunker Cost', ... } }
{ tr: 'Açık Deniz',        translations: { en: 'Open Sea / Offshore', ... } }
// … 25 dilin tamamı için
```

Bunlar aynı `maskGlossaryTerms` / `getMaritimeTranslationOverride` boru hattından geçecek ama **daha uzun eşleşmeler önce** aranacak (greedy longest-match), böylece "Demurrage Hesabı" → tek atom olarak maskelenir, Google onu değiştiremez.

### 2. Bağlamsal düzeltme kuralları (contextual sweep)

`applyMaritimeCorrections` çıkışa şu türden regex tabanlı düzeltmeler ekleyecek — sadece maritime terim yakınında tetiklenir:

```
/\b(demurrage|laytime|voyage|freight|TCE)\s+account\b/gi  → "$1 calculation"
/\baccount of (demurrage|laytime|voyage)\b/gi             → "calculation of $1"
```

Böylece phrase sözlükte yakalanmayan varyantlar (çekim, sıralama farkı) da temizlenir.

## Dosyalar

- **`supabase/functions/_shared/maritimeGlossary.ts`**
  - Yeni `maritimePhrases: MaritimeTerm[]` dizisi (ilk parti: ~15 ifade × 25 dil)
  - `maskGlossaryTerms` içinde phrase'leri terimlerden **önce** ve **uzunluk azalan** sırayla eşleştir
  - `getMaritimeTranslationOverride` phrase listesine de bakacak
  - `applyMaritimeCorrections` sonuna `contextualCorrections` regex tablosu

- **`supabase/functions/translate/index.ts`** — değişiklik yok, mevcut boru hattı yeni katmanı otomatik kullanır

- **`src/utils/maritimeGlossary.ts`** — sadece re-export, dokunmaya gerek yok

- **`scripts/i18n/apply-contextual-fixes.mjs`** — mevcut static JSON paketlerine aynı bağlam düzeltmesini tekrar geçirmek için küçük bir çalıştırma (bir defalık)

## Doğrulama

- Küçük bir unit script: "Demurrage Hesabı", "Laytime hesabı yapıldı", "Navlun oranı 25 $/t" gibi 10-15 örneği İngilizce/Almanca/İspanyolcaya çevirip beklenen çıktı ile kıyasla
- `npm run build` + hızlı önizleme kontrolü (Ekonomi/Ticari Operasyonlar dersinde İngilizce görünüm)

## Kapsam dışı

- Yeni bir AI/LLM bağlam servisi eklenmez (kullanıcı AI izini minimumda istiyor)
- Diğer dillerdeki bağlam regex'leri sadece İngilizce ile başlar; Almanca/Fransızca genişlemesi ayrı bir tur olur
