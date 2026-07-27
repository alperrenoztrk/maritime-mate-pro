# Google ile Giriş (Supabase Auth) — Kurulum

Uygulama tarafındaki tüm kod hazır. Geriye yalnızca **Google Cloud Console** ve
**Supabase** panelinde yapılması gereken, API'den yapılamayan ayarlar kaldı.

## Mevcut durum

| | |
|---|---|
| Uygulamanın bağlı olduğu backend | `https://vrpbhguztsqakvjcezeb.supabase.co` (Lovable Cloud projesi) |
| Google sağlayıcısı | **Kapalı** — bu yüzden Google düğmesi şu an gizli |
| E-posta / şifre girişi | Açık, çalışıyor |

> **Not:** Supabase hesabınızdaki `MARINER'S BOOK` (`dhjvxtwflntmvbzkqsjn`)
> projesinde Google **açık**, ancak uygulama o projeyi kullanmıyor — tablolar,
> edge function'lar ve kullanıcılar Lovable Cloud projesinde. Bu yüzden Google'ı
> aşağıdaki adımlarla **`vrpbhguztsqakvjcezeb`** projesinde açmak gerekiyor.

Google sağlayıcısı açıldığı anda uygulamadaki "Google ile devam et" düğmesi
kendiliğinden görünür hale gelir; ek bir kod değişikliği veya yayın gerekmez.

## 1. Google Cloud Console — OAuth istemcisi

<https://console.cloud.google.com/apis/credentials>

1. **OAuth consent screen**'i doldurun (uygulama adı, destek e-postası, logo).
   Yayına alırken "Publishing status: In production" yapın, aksi halde yalnızca
   test kullanıcıları giriş yapabilir.
2. **Create Credentials → OAuth client ID → Web application** seçin.
3. **Authorized JavaScript origins** alanına ekleyin:

   ```
   https://nauticalleap-com.lovable.app
   https://id-preview--50250357-50a7-4f9d-8353-23b653380abc.lovable.app
   http://localhost:8080
   ```

4. **Authorized redirect URIs** alanına **yalnızca** Supabase'in callback adresini
   ekleyin (uygulamanın kendi adresini değil):

   ```
   https://vrpbhguztsqakvjcezeb.supabase.co/auth/v1/callback
   ```

5. Oluşan **Client ID** ve **Client Secret** değerlerini kopyalayın.

Tarayıcı tabanlı akış kullanıldığı için Android imza parmak izi (SHA-1) veya
ayrı bir Android OAuth istemcisi **gerekmiyor**.

## 2. Supabase — sağlayıcıyı açın

Lovable Cloud projesi olduğu için ayarlara iki yoldan ulaşabilirsiniz:

- **Lovable:** proje → **Cloud** sekmesi → **Users / Auth** → **Google**, veya
- **Supabase Dashboard:** `vrpbhguztsqakvjcezeb` → **Authentication → Providers → Google**

Yapılacaklar:

1. **Google** sağlayıcısını **Enable** edin.
2. 1. adımdaki **Client ID** ve **Client Secret** değerlerini yapıştırın, kaydedin.
3. **Authentication → URL Configuration** bölümünde:
   - **Site URL:** `https://nauticalleap-com.lovable.app`
   - **Redirect URLs** listesine şunları ekleyin:

     ```
     https://nauticalleap-com.lovable.app/auth/callback
     https://id-preview--50250357-50a7-4f9d-8353-23b653380abc.lovable.app/auth/callback
     http://localhost:8080/auth/callback
     com.marinersbook.app://auth/callback
     ```

     Son satır Android/iOS uygulaması içindir; eksik olursa mobil uygulamada
     Google turu tarayıcıda takılı kalır ve uygulamaya geri dönmez.

## 3. Doğrulama

Sağlayıcının gerçekten açıldığını şu komutla teyit edebilirsiniz — `google`
değeri `true` dönmelidir:

```bash
curl -s "https://vrpbhguztsqakvjcezeb.supabase.co/auth/v1/settings" \
  -H "apikey: <VITE_SUPABASE_PUBLISHABLE_KEY>" | grep -o '"google":[a-z]*'
```

Ardından:

- **Web:** `/auth` sayfasında "Google ile devam et" düğmesi görünür → tıklayın →
  Google hesabı seçin → `/auth/callback` üzerinden uygulamaya dönersiniz.
- **Mobil:** `npx cap sync` çalıştırıp uygulamayı yeniden derleyin (deep link
  tanımları native projelere bu komutla işlenir).

## Uygulama tarafında ne yapıldı

| Dosya | Değişiklik |
|---|---|
| `src/lib/authFlow.ts` | Google akışının tamamı: sağlayıcı kontrolü, web ve native yönlendirme, dönüş URL'sinden oturum kurma |
| `src/hooks/useAuth.tsx` | `signInWithGoogle()` eklendi; native `appUrlOpen` dinleyicisi ile deep link dönüşü işleniyor |
| `src/pages/Auth.tsx` | "Google ile devam et" düğmesi — yalnızca sağlayıcı açıksa görünür |
| `src/pages/AuthCallback.tsx` | Ortak akışı kullanacak şekilde sadeleştirildi (PKCE `?code=` ve implicit `#access_token=` ikisi de destekli) |
| `android/.../AndroidManifest.xml` | `com.marinersbook.app://` şeması için intent filter |
| `ios/App/App/Info.plist` | Aynı şema için `CFBundleURLTypes` |

## Sık karşılaşılan hatalar

| Hata | Sebep |
|---|---|
| `Unsupported provider: provider is not enabled` | 2. adım yapılmamış. Düğme zaten gizli kalır. |
| `redirect_uri_mismatch` | Google Cloud'daki redirect URI, Supabase callback adresiyle birebir aynı değil. |
| Giriş sonrası ana sayfaya değil, boş sayfaya dönme | İlgili adres Supabase **Redirect URLs** listesinde yok. |
| Mobilde tarayıcı açık kalıyor | `com.marinersbook.app://auth/callback` Redirect URLs'e eklenmemiş veya `npx cap sync` çalıştırılmamış. |
