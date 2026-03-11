# Technical Debt Cards

## TD-001 — `hasContent` Alanını Otomatik Türetme (Derive) Refactor
- **Durum:** Açık
- **Öncelik:** Orta
- **Kapsam:** `subTopics` içinde manuel `hasContent` işaretleme yerine, içerik kaynaklarından otomatik derive mekanizması kurulması.
- **Amaç:** İçerik eklendiğinde `hasContent` alanının manuel unutulmasından doğan görünürlük hatalarını azaltmak.
- **Referans davranış:** `src/pages/LessonTopicsPage.tsx` içindeki `const hasContent = isNavigation ? ... : sub.hasContent;`
- **Beklenen çıktı:**
  - `hasContent` değeri tek bir kaynaktan (content map / title index) otomatik hesaplanmalı.
  - Manuel `hasContent` alanı mümkünse kaldırılmalı veya migration sonrası opsiyonel hale getirilmeli.
  - Geriye dönük doğrulama için içerik-var/yok raporu üreten küçük bir kontrol script’i eklenmeli.
