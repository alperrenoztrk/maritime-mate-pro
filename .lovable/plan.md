## Sorun

Telefonun donanım geri tuşuna **ard arda hızlı iki defa** basıldığında uygulama beklenmedik şekilde kapanıyor / arka plana atılıyor. Tek basışta üst menüye dönme doğru çalışıyor.

## Kök Neden Analizi

`useNavigationHierarchy` Capacitor `backButton` dinleyicisini doğru kuruyor, ama iki ince problem var:

1. **`capacitor.config.ts` içindeki `App.skipBackButton: true` opsiyonu Capacitor 7'de yok** (Cap 6 kalıntısı). Bu yüzden bazı cihazlarda native taraf, JS dinleyici çalışsa bile WebView'in kendi geri geçmişini (`webView.goBack()`) tüketmeye çalışıyor; geçmiş tükendiğinde Android Activity'yi minimize ediyor — kullanıcıya "uygulama kapandı" gibi görünüyor.
2. **Yarış (race) durumu**: İki tıklama 100–200 ms arayla geldiğinde `handleBack` arka arkaya iki kez çağrılıyor; navigate işlemi React commit'iyle çakışırken ikinci `handleBack` aynı path'i tekrar okuyabiliyor. Re-entrancy koruması yok.
3. **Native tarafta sentinel yok**: `popstate` sentinel'i sadece web/PWA için ekleniyor. Native'de WebView geçmişinde "tüketilebilir" bir dummy entry olmadığı için sistem default davranışı tetiklenince geçmiş hemen tükeniyor.

## Yapılacaklar

### 1. `capacitor.config.ts`
- Geçersiz olan `App.skipBackButton: true` opsiyonunu kaldır. Capacitor 7'de `backButton` dinleyicisinin varlığı zaten default'u bastırır; bu opsiyon parser'da uyarıya yol açıyor olabilir.

### 2. `src/hooks/useNavigationHierarchy.ts`
- **Re-entrancy guard**: `isHandlingBackRef` (boolean) ile aynı tick içinde ikinci `handleBack` çağrısı yapılırsa atla. ~250 ms'lik soft-cooldown ile rapid double-tap'i debounce et — ikinci basış kuyrukta tutulup ilk navigate tamamlandıktan sonra çalışsın (kaybolmasın).
- **Native sentinel**: `Capacitor.isNativePlatform()` durumunda da her route değişiminde `window.history.pushState` ile dummy bir entry yerleştir. Böylece WebView olası bir default `goBack()` denerse sentinel'i tüketir, app foreground'da kalır.
- **Defansif preventDefault**: Dinleyiciye gelen `event` argümanını `(event?.preventDefault?.())` ile koruma altına al (Cap 7'de no-op, ileride yardımcı).
- **HARD GUARD — '/'** üzerinde geri basıldığında `App.exitApp` çağrılmamasını sağlamak için açık bir `return` zaten var; yorum güçlendirilecek ve guard'ın test edilmesi için bir console.debug log eklenecek (geliştirme aşamasında).

### 3. `useAndroidFeatures.ts`
- Değişiklik yok; yalnızca yorum güncellenerek bu hook'un asla `backButton` dinleyicisi eklemeyeceği vurgulanacak (regression koruması).

## Test Planı (kullanıcıya talimat)

Yerel cihazda denemek için:
1. `git pull` → `npm install` → `npx cap sync android`
2. `npx cap run android` ile cihazda aç.
3. Ana ekrandan herhangi bir alt sayfaya (örn. Dersler → Seyir → Enlem) git, sonra donanım geri tuşuna hızlı 2–3 kez bas. Uygulama her basışta bir üst seviyeye çıkmalı; ana ekrana ulaşınca takılı kalmalı, **asla minimize olmamalı**.

## Teknik Notlar

- Capacitor 7 App plugin'inde listener varlığı default'u suppress eder, fakat `server.url` (remote URL) kullanıldığında WebView başlangıç geçmişi 1 entry olduğu için ekstra defansif sentinel önemli.
- Hash router'a geçmek alternatif bir çözüm olurdu ama mevcut yapıda tüm route'lar BrowserRouter'a göre yazılmış — refactor riski yüksek, bu yüzden tercih edilmiyor.
- Değişiklikler yalnızca presentation/navigation katmanı; iş mantığı ve veri akışı etkilenmez.