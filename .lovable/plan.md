

# Denizcilik Terminolojisine Uygun Çeviri Sistemi

## Sorun
Şu an uygulama çeviriler için Google Translate'in ücretsiz API'sini (`translate.googleapis.com/translate_a/single`) kullanıyor. Bu API genel amaçlı çeviri yapıyor ve denizcilik terimlerini yanlış çeviriyor (örneğin "sancak" → "starboard" yerine genel bir anlam veriyor, "alabanda" düzgün çevrilmiyor).

Ayrıca bir runtime hatası var: `AskAIPopup` bileşeni `LanguageProvider` dışında render ediliyor — bu da düzeltilecek.

## Çözüm
Google Translate API yerine, mevcut `translate` edge function'ı (Lovable AI Gateway + Gemini) kullanılacak. Bu function'ın system prompt'u zaten denizcilik terminolojisi için talimat içeriyor ama şu an sadece AI chat'te kullanılıyor, sayfa çevirilerinde kullanılmıyor.

### Değişiklikler

#### 1. Edge Function Prompt'unu Güçlendir (`supabase/functions/translate/index.ts`)
- System prompt'a detaylı denizcilik terminoloji talimatı ekle:
  - IMO/SOLAS/MARPOL standart terimlerinin korunması
  - Her dil için o dilin resmi denizcilik terminolojisinin kullanılması
  - Teknik terimlerin (EPIRB, SART, EEBD, SCBA, LSA, FFE vb.) kısaltma olarak korunması
  - Gemicilik fiillerinin (alabanda, manevra, demir alma, palamar vb.) doğru karşılıklarının kullanılması

#### 2. `LanguageContext.tsx` — `translateText` fonksiyonunu güncelle
- Google Translate API çağrısını kaldır, yerine mevcut `translate` edge function'ı çağır
- Auth gerektirdiği için: giriş yapmış kullanıcılar için edge function, giriş yapmamışlar için Google Translate fallback
- Batch çeviri desteği ekle (birden fazla metni tek istekle çevir — API çağrısı sayısını azaltmak için)

#### 3. Runtime Hatası Düzelt
- `AskAIPopup` bileşeninin `LanguageProvider` içinde render edildiğinden emin ol (muhtemelen App.tsx'teki sıralama sorunu)

### Teknik Detaylar
- Edge function'daki system prompt şöyle genişletilecek:
  ```
  You are a professional maritime translator specializing in nautical terminology.
  Use official maritime terminology recognized by IMO for the target language.
  Keep technical abbreviations unchanged: SOLAS, MARPOL, ISM, EPIRB, SART, EEBD, SCBA, LSA, FFE, PSC, PMS, VHF, DSC, GMDSS, AIS, ECDIS, COLREG.
  For nautical terms, use the standard terminology of the target language's maritime tradition (e.g., "starboard/port" in English, "tribord/bâbord" in French, "Steuerbord/Backbord" in German).
  ```
- `translateText` fonksiyonu: supabase client üzerinden `functions.invoke('translate', ...)` çağrısı yapacak
- Cache mekanizması korunacak

