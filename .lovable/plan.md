## Amaç
Uygulamaya email/şifre ile kayıt + giriş, Google ile giriş, ve Ayarlar sayfasından oturum aç/kapat özelliklerini eklemek. Mevcut koyu tema ve maritime tasarım korunacak.

## Kapsam

### 1. Auth altyapısı
- `src/hooks/useAuth.tsx` (yeni): `AuthProvider` + `useAuth()` hook.
  - `supabase.auth.onAuthStateChange` dinleyicisi (senkron state update) + ardından `getSession()`.
  - `user`, `session`, `loading` state; `signInWithEmail`, `signUpWithEmail`, `signInWithGoogle`, `signOut` fonksiyonları.
- `src/App.tsx`: `AuthProvider` ile sarma (sağlayıcı ağacına eklenir).

### 2. Auth sayfası
- `src/pages/Auth.tsx` (yeni), route `/auth`:
  - Tabs: **Giriş Yap** / **Kayıt Ol**.
  - Email + şifre alanları, zod ile doğrulama (email format, min 8 karakter şifre).
  - `emailRedirectTo: window.location.origin` ile `signUp`.
  - "Google ile devam et" butonu → `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/auth/callback' } })`.
  - Zaten girişliyse `/` sayfasına yönlendir.
  - Koyu maritime tasarım (mevcut `Card` bileşenleri, ocean gradient arka plan).
- `src/App.tsx`: `/auth` route eklenir (lazy).

### 3. Ayarlar entegrasyonu
- `src/pages/Settings.tsx`: Yeni "Hesap" kartı eklenir.
  - Giriş yapılmışsa: kullanıcı avatarı (Google `avatar_url`), isim/email, "Çıkış Yap" butonu.
  - Girişli değilse: "Giriş Yap / Kayıt Ol" butonu → `/auth`.

### 4. Google OAuth aktifleştirme
- `supabase--configure_social_auth` ile Google provider açılır (Lovable Cloud yönetimli — ekstra credential istenmez, email provider da açık kalır).

### 5. Kapsam dışı
- Kullanıcı profil tablosu (`profiles`) — kullanıcı bunu istemedi; sadece `auth.users` kullanılır. İleride profil verisi (isim, avatar tercihi vb.) gerektiğinde ayrı bir görevde eklenir.
- Şifre sıfırlama akışı — bu turda talep edilmedi.
- Route koruma / private route guard'ları — mevcut sayfalar herkese açık kalmaya devam eder.

## Teknik notlar
- Mevcut `AuthCallback.tsx` (PKCE exchange) korunur, Google redirect bu sayfaya döner.
- `supabase` import'u `@/integrations/supabase/safeClient`'tan alınır (proje standardı).
- Toast bildirimleri `sonner` ile yapılır.
- Sadece koyu tema — `bg-background`, `text-foreground` gibi semantik token'lar kullanılır, hardcoded renk yok.
