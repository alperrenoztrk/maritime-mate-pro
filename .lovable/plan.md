# Yapay Zeka İzini Minimuma İndirme Planı

Amaç: Uygulamanın "AI tarafından üretilmiş / hazırlanıyor / yakında / asistan" hissi veren tüm yüzey öğelerini sadeleştirmek. AI özellikleri kalmaya devam edecek, ama **görsel ve dilsel iz** denizcilik referans kitabı tonuna çekilecek.

## 1) "İçerik yok / İçerik hazırlanıyor / Yakında" yazılarının kaldırılması

Bu ifadeler kullanıcıya "burayı AI dolduracak, henüz boş" hissi veriyor. Kaldırılacak / yeniden yazılacak yerler:

- `src/pages/LessonTopicDetailPage.tsx` (satır 86–91): "Bu konu başlığı için içerik hazırlanmaktadır… İçerik hazırlanıyor" placeholder'ı → konu için **gerçek özet + kaynak referansı** ile değiştir; içerik gerçekten yoksa o başlığı listeden gizle.
- `src/pages/MachineTopicDetailPage.tsx` (satır 20): "İçerik hazırlanıyor..." → veri yoksa başlık menüden çıkarılsın; loader yerine sessiz iskelet.
- `src/pages/MaritimeNews.tsx` (satır 586): "Bu haber için içerik bulunamadı." → haber kartı doğrudan kaynak siteye yönlendirsin, mesaj gösterilmesin.
- `src/components/ContentAutoWriterController.tsx` (satır 278–279) ve `src/data/calculationCenterConfig.ts` (716, 731): **"(Yakında)"** rozetli devre dışı seçenekler menüden tamamen kaldırılacak.
- `src/components/calculations/NavigationCalculations.tsx` (2076, 2110): "Yakında: Mevki Hesapla" / "Yakında: Koçanlı Mevki Hesapla" placeholder kartları kaldırılacak veya gerçek hesaplama bağlanacak.
- `src/components/ui/module-card.tsx` (25): default "Yakında" badge tanımı kaldırılsın.

## 2) "AI / Yapay Zeka / 🤖" etiketlerinin temizlenmesi

Kullanıcıya AI markası dayatan yerler nötrleştirilecek:

- `src/pages/Formulas.tsx` (174): "Google Gemini AI ile gelişmiş maritime mühendisliği analizi." → "Maritime mühendisliği analizi."
- `src/pages/BetaWorkHoursTool.tsx` (394): buton metni **"AI ile çıkar"** → **"Otomatik çıkar"**.
- `src/components/ContentAutoWriterController.tsx` (263): "Eksik alt başlıkları toplu olarak AI ile tamamlayın" → "Eksik alt başlıkları toplu olarak tamamla". (Bu panel zaten yönetici aracı, son kullanıcıya görünmüyorsa olduğu gibi kalabilir — kontrol edip karar verilecek.)
- `src/components/PermanentAIAssistant.tsx`:
  - "🤖 Local Maritime AI Database", "🤖 Maritime AI Ready", "Maritime Mühendisliği AI Asistanı" başlıkları → "Denizcilik Referans Asistanı" / "Hazır" gibi nötr ifadeler, robot emojisi tamamen kalkacak.
  - "Hazırlanıyor" badge'i (264) → "Yanıtlanıyor" gibi operasyonel dile çekilecek.
- `src/data/searchIndex.ts` (41): "Stabilite Asistanı" anahtar kelimeleri `["AI","yapay zeka"]` → `["danışman","rehber","stabilite"]` olarak güncellenecek; arama sonuçlarında AI öne çıkmayacak.
- `src/data/calculationCenterConfig.ts` (412): "AI ile yükleme sırası ve trim danışmanlığı" → "Yükleme sırası ve trim danışmanlığı".

## 3) Asistan sayfalarındaki dil ve görsel iz

Tüm `*Assistant.tsx` sayfalarında (`MeteorologyAssistant`, `SeamanshipAssistant`, `SafetyAssistant`, `StabilityAssistant`, `MachineAssistant`, `EmissionAssistant`, `CargoAssistant`):

- Sayfa başlıklarındaki "… Asistanı" ibaresi korunabilir (denizcilik referans rehberi tonunda) ama:
  - Alt başlıklardan "AI / yapay zeka / chatbot" geçen tüm ifadeler çıkarılacak.
  - `AssistantInterface.tsx` içindeki `preparing: "Yanıt hazırlanıyor..."` → `"Hesaplanıyor..."`.
  - Konuşma balonu robot/parlama efektleri sadeleştirilecek; düz, kitap stili kart görünümü.
- `PermanentAIAssistant.tsx` ve `WorkingAIAssistant.tsx` ana sayfada kayan/parlayan buton olarak duruyorsa, **glow + robot ikonu yerine** sade bir "Soru Sor" düğmesi (kitap/soru işareti ikonu) olacak.

## 4) Boş durum (empty state) standardı

Tek bir kural getirilecek:

- Bir liste / detay boşsa: **"Veri yok" / "İçerik bulunamadı" yazma**. Onun yerine ya bölümü gizle, ya da o konunun **gerçek tanımı + ilgili formül/kaynak referansı** ile bir mini kart göster. Bu, mem://style/curriculum-content-standard ile uyumlu.

## 5) Toast ve bildirim metinleri

`toast.success/error/info` çağrılarında geçen "AI", "yapay zeka", "üretildi", "oluşturuldu" gibi ifadeler operasyonel dile çekilecek (ör. "Hesap tamamlandı", "Rapor hazır"). Tarama yapılıp tek tek değiştirilecek.

## 6) Kaldırılması önerilen bileşenler

Aşağıdakiler işlevsel olarak çakışıyor ve "AI markası"nı çoğaltıyor — sadece biri tutulacak:

- `TestGeminiAI.tsx` → kullanılmıyorsa silinecek.
- `WorkingAIAssistant.tsx` vs `PermanentAIAssistant.tsx` vs `UnifiedMaritimeAssistant.tsx`: tek bir "Denizcilik Danışma" bileşenine indirgenecek (en zengin olan korunup diğerleri kaldırılacak).

## Onay sonrası uygulama sırası

1. `pages/*Assistant.tsx` ve `AssistantInterface.tsx` metin temizliği.
2. "Yakında / hazırlanıyor / içerik bulunamadı" yer tutucularının kaldırılması.
3. `searchIndex`, `calculationCenterConfig`, `Formulas`, `BetaWorkHoursTool` etiket güncellemeleri.
4. `PermanentAIAssistant` görsel sadeleştirmesi + duplicate asistan bileşenlerinin temizlenmesi.
5. `bun run build` ile doğrulama.

## Açık sorular

- Asistan sayfalarının kendisi (Gemicilik / Stabilite / Makine / Emisyon / Emniyet asistanları) **kalsın mı, yoksa tamamen kaldırılıp** yerine sadece statik referans sayfaları mı gelsin? Tonu belirler:
  - **A**: Asistanlar kalsın, sadece dil ve görsel iz nötrleşsin (bu plan).
  - **B**: Asistan sayfaları tamamen kaldırılsın; yalnızca konu anlatımı + hesaplama + formül kalsın.
- "Soru Sor" düğmesi anasayfada kalsın mı, yoksa sadece ilgili modül (ör. Stabilite) içinde mi görünsün?