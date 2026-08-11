# İlk açılışta kayıt ekranı + tekrar konum izni sorulmaması

## 1. İlk indirmede giriş/kayıt ekranı

Bugün uygulama içeriği herkese açık; giriş ekranı yalnızca Ayarlar ve kişisel
sayfalar (`/settings`, `/beta/documents`) için isteniyor.

Yeni davranış:

- Splash kaybolduktan hemen sonra oturumu olmayan her kullanıcı `/auth`
  ekranını görür; uygulamanın hiçbir sayfası oturumsuz kullanılamaz.
- Kayıt/giriş tamamlanınca kullanıcı doğrudan uygulamaya girer.
- Oturum cihazda saklandığı için uygulama tekrar açıldığında giriş ekranı
  görünmez; yalnızca Ayarlar → Çıkış yap sonrası tekrar görünür.
- Giriş ekranı Ayarlar'dan bir menü öğesi olarak açılmaz; sadece oturum yoksa
  otomatik gelir.
- Oturum kontrolü tamamlanana kadar boş/yükleniyor ekranı gösterilir ki giriş
  yapmış kullanıcıda ekran bir an bile "kayıt ol" diye yanıp sönmesin.

## 2. Tekrar girişte konum izni istenmemesi

- Konum izni sorulmadan önce tarayıcı/WebView izin durumu okunur. İzin daha
  önce verilmişse doğrudan konum alınır, reddedilmişse yeniden sorulmaz.
- Son bilinen konum (koordinat + zaman damgası) cihazda saklanır; uygulama
  yeniden açıldığında widget'lar önce bu konumla dolar, izin zaten verilmişse
  arka planda tazelenir.
- Kullanıcı manuel konum seçtiyse konum izni hiç istenmez.

## Teknik notlar

- `src/components/auth/RequireAuth.tsx`: `isPublicPath` kontrolü sadece
  `/auth`, `/auth/callback`, `/reset-password` gibi kimlik rotalarına
  daraltılır; diğer tüm rotalar oturum ister (`src/lib/authFlow.ts` içindeki
  `PRIVATE_PREFIXES` yerine `AUTH_ROUTES` beyaz listesi).
- Oturum yoksa `buildAuthRedirect` ile mevcut yol `next` parametresinde
  saklanarak `/auth`'a yönlendirilir; giriş sonrası aynı sayfaya dönülür.
- `src/pages/Settings.tsx`: varsa "Giriş yap" bağlantısı kaldırılır, yalnızca
  hesap bilgisi ve "Çıkış yap" kalır.
- `src/hooks/useCurrentWeather.ts`: `getCurrentPosition` çağrısından önce
  `navigator.permissions.query({ name: "geolocation" })` kontrolü; `prompt`
  dışındaki durumlarda gereksiz istek yapılmaz. Son konum
  `safeLocalStorage` içinde `maritime-last-position` anahtarıyla önbelleğe
  alınır ve ilk render'da kullanılır.
- `src/hooks/useLiveGpsPosition.ts` aynı izin kontrolünü kullanır.
