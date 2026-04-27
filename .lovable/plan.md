# Geri tuşu davranışını düzelt

## Sorun

Şu an "geri" davranışı **üç ayrı yerden** kontrol ediliyor ve hepsi history yığınına müdahale ediyor:

1. **`BackButton`** → `<Link to=...>` kullanıyor (push). Yani üst sayfaya dönerken history'de yeni bir kayıt bırakıyor. History yığını: `Index → Calculations → Detail → Calculations`. Sonraki "geri" basışı `Detail`'a, ondan sonraki basış `Calculations`'a, sonraki Index'e... Sonuçta birkaç basıştan sonra uygulamadan çıkıyor.
2. **`useNavigationHierarchy`** her route değişiminde `window.history.pushState` ile fazladan kayıt ekliyor; `popstate`'i yakalayıp parent'a gönderiyor — ama Link tıklamaları popstate tetiklemediği için bu mantık `BackButton`'la senkronize çalışmıyor.
3. **`useAndroidFeatures`** ayrı bir Capacitor `backButton` listener'ı daha kuruyor ve `window.history.back()` çağırıyor — `useNavigationHierarchy`'deki listener ile yarışıyor. (Hook şu an `App.tsx`'de import edilmese de ileride bir yerde import edildiğinde sessizce kırılır.)

İki "geri" basışında uygulamanın atması bu üç katmanın aynı history yığını üzerinde birbirini ezmesinden kaynaklanıyor.

## Çözüm

Tek doğru kaynak ilkesini uygulayalım:

- **BackButton, push yerine replace yapsın** — üst sayfaya geçerken history'ye yeni kayıt eklemesin, mevcut kaydı değiştirsin. Böylece `Index → Calculations → Detail` zincirinde BackButton'a basınca history `Index → Calculations` olur; native geri tuşu mantıklı şekilde Index'e götürür, bir basış daha çıkış onayı gösterir.
- **Çakışan Capacitor listener'ı kaldıralım** — `useAndroidFeatures` artık `backButton` dinlemesin. Tek yetkili `useNavigationHierarchy` olsun.
- **`useNavigationHierarchy` çift kayıt eklemesin** — şu anki `pushState` döngüsünü "yalnızca bir kez" garanti eden bir mantığa çevirelim ve native ortamda (Capacitor) **çıkış onay diyaloğu** gerçekten gösterilsin (zaten state'i var, sadece tetikleyelim).

Sonuç:
- Web/PWA: Tarayıcı geri tuşu → mantıksal parent. Tekrar basılırsa parent'ın parent'ı. Ana sayfada basılırsa tarayıcı geçmişine düşer (normal davranış).
- Android (Capacitor): Donanım geri tuşu → parent. Ana sayfada basılınca **çıkış onay diyaloğu** çıkar; "Hayır" derse uygulamada kalır. Yani iki kez basınca artık ASLA atılmaz.

## Yapılacak değişiklikler

**1. `src/components/BackButton.tsx`**
- `<Link to>` yerine `useNavigate` + `navigate(to, { replace: true })` kullan. Görsel ve API (`to`, `variant`, `label`) aynı kalır — çağrı tarafında hiçbir şey değişmez.

**2. `src/hooks/useAndroidFeatures.ts`**
- `App.addListener('backButton', ...)` bloğunu tamamen kaldır. Diğer özellikler (klavye, haptik) aynen kalır.

**3. `src/hooks/useNavigationHierarchy.ts`**
- Her route değişiminde tek bir sentinel `pushState` ekle, popstate yakalanınca:
  - Eğer mevcut sayfa zaten bir top-level hub (`/`, `/calculations`, `/lessons`, vb.) ise → çıkış diyaloğunu aç (Capacitor'da `setShowExitDialog(true)`, web'de hiçbir şey yapma → tarayıcı normal davransın).
  - Aksi halde → `navigateToParent()`.
- Capacitor `backButton` listener'ı aynı mantığı paylaşsın (tek fonksiyona delege edilsin) — top-level'de diyalog, alt sayfada parent'a git.

**4. Doğrulama**
- Ship Operations Detail referans akışı (zaten doğru çalışıyor) bozulmamalı.
- Build alıp önceki PWA kurulumunun bozulmadığını teyit et.

## Etki

- Hiçbir sayfanın görsel düzeni değişmiyor.
- BackButton API'si değişmiyor — kullanan 8+ sayfada kod düzenlemesi gerekmez.
- "İki kez basınca uygulamadan atılma" tamamen ortadan kalkar.
