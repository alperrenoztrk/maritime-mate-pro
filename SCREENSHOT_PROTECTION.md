# Ekran Görüntüsü Engelleme Sistemi

Uygulama içindeki içeriğin ekran görüntüsü / ekran kaydı ile kopyalanmasını
engelleyen, platforma özel bir korumadır. Uygulama açıldığında **otomatik ve
uygulama genelinde** etkinleşir.

## Nasıl çalışır?

Native tarafta özel bir Capacitor eklentisi (`ScreenProtection`) uygulanmıştır.
JS/React katmanı bu eklentiyi uygulama kökünde etkinleştirir.

| Platform | Davranış | Tam engelleme? |
|----------|----------|----------------|
| **Android** | `FLAG_SECURE` penceresel bayrağı. Ekran görüntüsü ve ekran kaydını engeller, uygulamayı "son kullanılanlar" önizlemesinde gizler. | ✅ Evet |
| **iOS** | Güvenli katman (secure text-field) tekniği: alınan ekran görüntüsü/kaydı boş/siyah çıkar, app-switcher önizlemesi gizlenir. Ayrıca ekran görüntüsü alındığında bildirim gösterilir. | ⚠️ Kısmi (Apple tam engellemeye izin vermez) |
| **Web** | Tarayıcılar engelleyemez; no-op. | ❌ Hayır |

## Dosyalar

- `src/plugins/screenProtection.ts` — Eklenti arayüzü + `registerPlugin`.
- `src/plugins/screenProtection.web.ts` — Web fallback (no-op).
- `src/hooks/useScreenProtection.ts` — Uygulama kökünde korumayı açar; iOS'ta
  ekran görüntüsü alındığında toast bildirimi gösterir.
- `src/App.tsx` — `useScreenProtection()` çağrısı.
- `android/app/src/main/java/com/marinersbook/app/ScreenProtectionPlugin.java` — Android (`FLAG_SECURE`).
- `android/app/src/main/java/com/marinersbook/app/MainActivity.java` — Eklenti kaydı + ilk kareden itibaren `FLAG_SECURE`.
- `ios/App/App/ScreenProtectionPlugin.swift` — iOS güvenli katman + ekran görüntüsü tespiti.

## JS API

```ts
import { ScreenProtection } from '@/plugins/screenProtection';

await ScreenProtection.enable();                 // korumayı aç
await ScreenProtection.disable();                // korumayı kapat
const { enabled } = await ScreenProtection.isEnabled();

// iOS: ekran görüntüsü alındığında (engellenemez, yalnızca tespit)
ScreenProtection.addListener('screenshotTaken', () => { /* ... */ });
```

## Sonraki adımlar (native değişiklik gerektirir)

Native kodda değişiklik yapıldığı için mağaza yapısı öncesi senkronizasyon gerekir:

```bash
npm run build
npx cap sync
```

- **Android:** ek işlem gerekmez; derleyip çalıştırın.
- **iOS:** `ScreenProtectionPlugin.swift` Xcode projesine (`project.pbxproj`)
  eklenmiştir. `npx cap sync ios` sonrası `App.xcworkspace` üzerinden derleyin.
  Güvenli katman tekniği gerçek cihazda test edilmelidir; herhangi bir görüntüleme
  sorununda `useScreenProtection` içinde iOS için `enable()` çağrısı atlanabilir.

## Notlar

- Koruma varsayılan olarak **her zaman açıktır**. İstenirse bir ayar anahtarına
  bağlanabilir (`ScreenProtection.enable()/disable()` çağrılarıyla).
- iOS'ta tek bir ekran görüntüsünün *tamamen* engellenmesi Apple tarafından
  desteklenmez; güvenli katman tekniği görüntüyü boşaltır ancak platform
  garantisi Android'e özgüdür.
