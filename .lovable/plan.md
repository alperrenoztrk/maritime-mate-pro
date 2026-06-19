## Amaç

Personel modülünde (`crewRoleDetails` + `CrewRoleDetail` sayfası) ulaştığımız "uzun girizgâh + numaralı detay başlıkları + checkpoint listeleri + kritik uyarılar" derinliğini, **konu anlatımları** (Seyir / Meteoroloji / Haberleşme / Makine / Stabilite vb.) için de uygulamak. Özellikle **hesaplama içeren konularda** her formülü adım-adım çözülmüş **sayısal örnekle** anlatmak ve **konuyla ilgisiz görselleri doğrularıyla** değiştirmek.

## Mevcut durum

- `TopicSection` şu an sadece `content / image / bulletPoints / formula{text, description}` taşıyor. Personeldeki "tasks (accordion) + equipment (checkpoints) + criticalNotes" zenginliği yok.
- `LessonTopicDetailPage` markdown'ı düz akıyor; örnek/adım/uyarı kutusu yok.
- `navigationTopicContents.ts` (12k satır), `meteorologyTopicContents.ts`, `communicationTopicContents.ts`, `machineTopicDetailContent*.ts` modüler ama içerikler ağırlıklı 2–3 cümlelik özet.
- Seyir için `navigationImageFallbacks` haritası zaten var (yanlış/HTTP görseli yerel SVG'ye çeviriyor) — diğer kategorilerde yok.

## Plan

### 1) Şema genişletmesi (`navigationTopicContents.ts`)
`TopicSection`'a opsiyonel alanlar ekle (geriye dönük uyumlu, eski içerikler çalışmaya devam eder):
- `deepDive?: string` — kavramın "neden / nasıl / pratik" uzun anlatımı (personel `intro` muadili)
- `steps?: { title: string; description: string }[]` — formül uygulamasının adımları (accordion)
- `workedExamples?: { scenario: string; given: { label: string; value: string }[]; solution: { step: string; expression?: string; result?: string }[]; answer: string; note?: string }[]`
- `commonMistakes?: string[]`, `criticalNotes?: string[]`, `references?: string[]`
- `imageAlt` zorunlu hâle gelmese de doldurma kuralı

### 2) Sayfa render katmanı (`LessonTopicDetailPage.tsx`)
- `deepDive` → personeldeki "Genel Bakış" kartı stili
- `steps` → numaralı accordion (CrewRoleDetail tasks deseni)
- `workedExamples` → "Verilenler → Çözüm adımları → Sonuç" 3 kolonlu kart, sonuç vurgulu
- `commonMistakes` → amber `AlertTriangle` kartı
- `criticalNotes` → emerald `CheckCircle2` kartı
- Eski tek `formula` alanı korunur; yeni alanlar yoksa görünüm değişmez.

### 3) Görsel düzeltme altyapısı (tüm kategoriler)
Mevcut `navigationImageFallbacks` mantığını ortak util'e taşı:
- `src/utils/lessonImageFallbacks.ts` — `{ navigation, meteorology, communication, machine, stability }` keyword→yerel asset eşlemeleri.
- `LessonTopicDetailPage` ve `MachineTopicDetailPage` aynı resolver'ı kullansın.
- Eksik temalarda gerekli SVG'leri `public/diagrams/<category>/` altından bağla (mevcut diagram dosyalarını kullan — yeni asset üretmeye gerek yok).
- HTTP-dış görseller + alt/title eşleşmesi yanlışsa otomatik doğrusuyla değiştirilir.

### 4) İçerik zenginleştirme — fazlı yaklaşım
İçerik hacmi büyük (12k+ satır). Tek seferde değil, **öncelik sırasıyla** ve hesaplama yoğunluğuna göre:

**Faz A — Pilot (bu PR):** Hesaplama ağırlıklı 6 konu, tam personel kalitesinde, her birinde ≥2 adım-adım çözülmüş sayısal örnek + yaygın hatalar + kritik uyarılar:
1. Seyir / **Düzlem seyir (plane sailing)**
2. Seyir / **Merkator seyri**
3. Seyir / **Büyük daire & Loksodrom**
4. Seyir / **Pusula düzeltmeleri (CDMVT)** — mem://technical/compass-mnemonic-cdmvt kuralına uygun
5. Meteoroloji / **Gerçek rüzgâr–görünen rüzgâr**
6. Stabilite / **GM ve GZ hesabı**

**Faz B (sonraki turlar, onay ile):** Gelgit, akıntı düzeltmesi, ETA/hız-mesafe, draft survey, FSC, trim, termodinamik çevrimler, vb.

### 5) Görsel doğrulama (pilot konular için)
Her pilot konunun mevcut görselleri kontrol edilir; `navigationImageFallbacks` haritasına eksik anahtarlar eklenir; konuyla ilgisiz olanlar yerel SVG'lere çevrilir. Yeni asset gerekirse `public/diagrams/...` altındaki mevcut çizimler bağlanır.

## Dokunulacak dosyalar (Faz A)

- `src/data/navigationTopicContents.ts` — `TopicSection` tipini genişlet + 4 seyir konusunun içeriklerini zenginleştir
- `src/data/meteorologyTopicContents.ts` — gerçek rüzgâr konusu
- `src/data/stabilityTopicsContent.ts` — GM/GZ konusu
- `src/pages/LessonTopicDetailPage.tsx` — yeni alanları render et + ortak image resolver'ı kullan
- `src/pages/MachineTopicDetailPage.tsx` — ortak image resolver'ı bağla
- `src/utils/lessonImageFallbacks.ts` (yeni) — kategori bazlı keyword→asset haritası

## Çıkmayacak şeyler

- Yapay zekâ ile içerik üretimi (mem: yapay zekâ izi minimumda). Tüm içerik elle, doğruluk öncelikli yazılır; formüller mevcut hesaplama araçlarındaki kaynaklarla birebir eşleşir (mem: calculation-formula-synchronization).
- Tasarım dili değişikliği yok; mevcut maritime global shell ve semantik tokenlar korunur.
- Personel modülüne dokunulmaz.

## Onayınız sonrası

Faz A'yı tek seferde uygulayıp size geri dönerim; Faz B konularını siz onayladıkça aynı şablonla genişletiriz.
