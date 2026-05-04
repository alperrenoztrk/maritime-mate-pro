# Personel İşleri için Uzun-Form Detaylı Anlatım Sistemi

## Mevcut Durum

`src/pages/CrewRoleDetail.tsx` her personel rolü (Kaptan, 1. Zabit, Başmühendis, ETO, Aşçı vb. — toplam **16 rol**) için bir accordion listesi gösteriyor. Her rolde ortalama **10–15 iş** (`tasks[]`) var ve her iş şu an `crewRoleDetails.ts` içinde **3–6 cümlelik tek paragraflık `description`** ile tanımlı (toplam ~180 iş).

İstek: Her bir iş **20–30 sayfa** uzunluğunda, çok detaylı, kitap-bölümü düzeyinde anlatılsın.

## Ölçek Gerçeği (Önemli)

180 iş × 25 sayfa ≈ **4500 sayfa içerik**. Bu, statik olarak elle yazılırsa:
- Tek dosyaya sığmaz (TS/Vite build patlatır)
- Tek bir AI çağrısıyla üretilemez (token limiti)
- Tek seferde gönderilirse uygulama bundle'ı 50–100 MB olur

Bu nedenle **iki katmanlı** bir mimari öneriyorum: (1) içerik depolama + okuma sistemi, (2) içerik üretim altyapısı (parça parça, kontrollü).

## Mimari Plan

### 1. Veri Modelinde Genişletme

`crewRoleDetails.ts` içinde `tasks[]` türünü genişletiyoruz — kısa açıklama korunuyor (liste görünümü için), bunun yanında **opsiyonel `longForm`** alanı eklenecek:

```ts
tasks: {
  title: string;
  description: string;        // mevcut özet (accordion preview)
  longForm?: {
    chapters: {
      heading: string;
      sections: { subheading: string; paragraphs: string[] }[];
      callouts?: { type: 'warning'|'reference'|'tip'; text: string }[];
      regulations?: string[]; // SOLAS V/34 vb.
    }[];
    estimatedPages: number;
    sources?: string[];       // SOLAS, ISM, MARPOL atıfları
  };
}
```

Her iş için içerik **kendi modül dosyasında** tutulacak: `src/data/crewTasks/{role-slug}/{task-index}.ts`. Böylece tree-shaking + lazy loading mümkün olur.

### 2. Lazy Loading ile Yükleme

Liste ekranında sadece `title` + `description` görünür. Kullanıcı bir işin "Detaylı Anlatımı Aç" butonuna bastığında ilgili dosya `import()` ile dinamik yüklenir. Böylece başlangıç bundle'ı şişmez.

### 3. Yeni Okuma Ekranı: `CrewTaskDeepDive`

Yeni route: `/crew/:roleSlug/task/:taskIndex`

Özellikler:
- Bölüm bölüm (chapter) navigasyon (sol kenar / üst sticky tabs)
- Tahmini okuma süresi + sayfa sayısı
- "Önceki / Sonraki bölüm" düğmeleri
- Mevzuat atıfları için renkli callout kutuları (uyarı / referans / ipucu)
- İlerleme çubuğu (scroll progress)
- Mobilde okunabilir tipografi (prose, satır aralığı, max-width)

### 4. İçerik Üretimi (Aşamalı)

180 işin tamamını tek mesajda üretmek imkânsız. Şu yaklaşımı öneriyorum:

**Faz 1 — Çatı + Pilot İçerik (bu turda yapılacak):**
- Veri modeli + lazy loading + yeni okuma ekranı + route kurulur
- **Pilot olarak 4 iş** seçip tam 20–30 sayfa uzunluğunda elle yazılmış içerikle doldururum:
  - Kaptan → "Seyir emniyetinin nihai sorumluluğu"
  - 1. Zabit → "Yük operasyonları planlama ve yürütme"
  - Başmühendis → "Ana makine işletim sorumluluğu"
  - Bosun (Reis) → "Güverte bakım planlaması"
- Bu 4 iş, hem kalite şablonu hem de UI doğrulaması olur

**Faz 2 — Toplu Üretim (sonraki turlarda, onayınızla):**
- Her turda 1 rolün tüm işlerini AI Gateway ile (Gemini 2.5 Pro / GPT-5) yapılandırılmış JSON çıktı olarak üretip statik dosyaya dönüştürürüm
- Her tur 1 rol = ~10-15 iş = ~250-400 sayfa içerik
- 16 rol = ~16 ek tur

Bu zorunlu çünkü tek mesajda üretirsek hem token aşımı olur hem de kalite kontrol edilemez.

## Bu Turda Teslim Edilecekler

1. `src/data/crewTasks/` klasörü + tip tanımları (`types.ts`)
2. `crewRoleDetails.ts` içindeki tip genişletmesi (geriye uyumlu — `longForm` opsiyonel)
3. **4 pilot iş için tam 20–30 sayfa içerik** (`kaptan/0.ts`, `birinci-zabit/X.ts`, `bas-muhendis/X.ts`, `reis-bosun/X.ts`)
4. Yeni `CrewTaskDeepDive.tsx` sayfası + route (`App.tsx`)
5. `CrewRoleDetail.tsx` içindeki accordion'a "Detaylı anlatımı aç →" butonu (sadece `longForm` olan işlerde görünür); olmayanlarda "Detaylı içerik hazırlanıyor" rozeti
6. İçerik üretiminin Türkçe, doğru, mevzuat atıflı (SOLAS/ISM/MARPOL/STCW/MLC) ve denizcilik pratiğine sadık olması

## Teknik Notlar

- Yeni dosyalar dışında değişen dosyalar: `crewRoleDetails.ts` (tip), `App.tsx` (route), `CrewRoleDetail.tsx` (buton)
- Bundle etkisi: pilot içerikler dynamic import ile yükleneceği için ana bundle'a eklenmez
- Erişilebilirlik: prose tipografi + dark mode korunur, mevcut `BackButton` ve `BottomNavigation` desenleri kullanılır
- Mevcut `crewRoleDetails.ts` (1586 satır) bozulmaz — sadece tip eklenir

## Onaylarsanız sıradaki adımlar

Onay sonrası bu turda yukarıdaki 6 maddeyi uygularım. Pilot 4 iş bitince diğer 176 işi rol-rol üretmek için (her tur 1 rol) yeniden onayınızı isterim. Bu tempo, hem kalite kontrolünüzü kaybetmemenizi hem de uygulamanın sağlıklı kalmasını sağlar.
