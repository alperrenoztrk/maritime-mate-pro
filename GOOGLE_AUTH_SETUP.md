# 🔐 **GOOGLE AUTHENTICATION KURULUM REHBERİ**
## Maritime Calculator - Complete Auth Integration

## **⚡ GÜNCEL UYGULAMA (2026-07) — ÖNCE BUNU OKUYUN**

Google girişi `src/hooks/useAuth.tsx` içinde ortama göre üç yoldan çalışır:

1. **Native (Android/iOS, Capacitor):** `supabase.auth.signInWithOAuth` +
   sistem tarayıcısı (`@capacitor/browser`). Dönüş
   `com.marinersbook.app://auth/callback` deep link'i ile alınır
   (AndroidManifest.xml'de intent-filter tanımlı).
2. **Lovable barındırması (`*.lovable.app`):** Lovable OAuth broker'ı
   (`@lovable.dev/cloud-auth-js`, `/~oauth/initiate`).
3. **Diğer web ortamları (localhost dahil):** `supabase.auth.signInWithOAuth`,
   dönüş `/auth/callback` rotasında karşılanır.

### Zorunlu backend yapılandırması (1 ve 3 numaralı yollar için)

Supabase (Lovable Cloud yönetimindeki proje) Auth ayarlarında:

- **Google provider etkin** olmalı ve Google Cloud Console'dan alınmış
  **Web Client ID / Client Secret** girilmiş olmalı.
- **Redirect URLs** izin listesine şunlar eklenmeli:
  - `com.marinersbook.app://auth/callback`
  - `http://localhost:8080/auth/callback`
  - `https://<yayın-domaininiz>/auth/callback`
- Google Cloud Console'daki OAuth client'ın **Authorized redirect URIs**
  listesinde Supabase callback'i olmalı:
  `https://<proje-ref>.supabase.co/auth/v1/callback`

Bu ayarlar yapılmadan 1 ve 3 numaralı yollar "provider is not enabled" /
"redirect_to not allowed" hatası verir. Aşağıdaki eski rehber genel
adımları anlatır; kod örnekleri güncel uygulamayı yansıtmayabilir.

---

### **📱 KURULUM ÖZETİ**

✅ **Google OAuth 2.0** - Güvenli kullanıcı girişi  
✅ **Supabase Auth** - Backend authentication  
✅ **User Profiles** - Kullanıcı profil yönetimi  
✅ **Calculation History** - Hesaplama geçmişi  
✅ **Favorites System** - Favori hesaplamalar  
✅ **User Analytics** - Kullanım istatistikleri  

---

## **1️⃣ GOOGLE CLOUD CONSOLE KURULUMU**

### **Google OAuth Client Oluşturma:**
1. [Google Cloud Console](https://console.cloud.google.com/) aç
2. **"New Project"** oluştur: `Maritime Calculator`
3. **APIs & Services** → **Credentials** git
4. **"Create Credentials"** → **OAuth 2.0 Client IDs**

### **OAuth 2.0 Client Configuration:**
```
Application Type: Web Application
Name: Maritime Calculator Web App

Authorized JavaScript Origins:
- http://localhost:8080 (development)
- https://your-domain.com (production)
- https://your-supabase-url.supabase.co

Authorized Redirect URIs:
- http://localhost:8080/auth/callback
- https://your-domain.com/auth/callback  
- https://your-supabase-project-ref.supabase.co/auth/v1/callback
```

### **Client ID ve Secret:**
```javascript
// Google OAuth Credentials:
Client ID: 123456789-abcdefghijklmnop.apps.googleusercontent.com
Client Secret: GOCSPX-xxxxxxxxxxxxxxxxx

// Bu bilgileri Supabase'e ekleyeceğiz
```

---

## **2️⃣ SUPABASE AUTH KURULUMU**

### **Supabase Dashboard:**
1. [Supabase Dashboard](https://supabase.com/dashboard) git
2. Projenizi seçin
3. **Authentication** → **Providers** → **Google**

### **Google Provider Configuration:**
```json
{
  "enabled": true,
  "client_id": "123456789-abcdefghijklmnop.apps.googleusercontent.com",
  "client_secret": "GOCSPX-xxxxxxxxxxxxxxxxx",
  "redirect_url": "https://your-project-ref.supabase.co/auth/v1/callback"
}
```

### **Site URL Configuration:**
```
Site URL: https://your-domain.com
Additional Redirect URLs:
- http://localhost:8080/**
- https://your-domain.com/**
```

---

## **3️⃣ DATABASE SETUP**

### **SQL Schema Uygulama:**
```sql
-- DATABASE_SCHEMA.sql dosyasını Supabase SQL Editor'da çalıştır

-- 1. User Profiles Table
-- 2. User Preferences Table  
-- 3. Calculation History Table
-- 4. Maritime Formulas Table
-- 5. User Sessions Table
-- 6. Functions & Triggers
-- 7. Row Level Security Policies
```

### **Environment Variables:**
```bash
# .env.local (development)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com

# Production'da bu değerler Vercel/Netlify/Host provider'da set edilecek
```

---

## **4️⃣ KULLANICI AKIŞI**

### **Authentication Flow:**
```
1. Kullanıcı "Google ile Giriş Yap" butonuna tıklar
2. Google OAuth consent screen açılır
3. Kullanıcı izin verir
4. Google auth code döner
5. Supabase auth code'u session token'a çevirir
6. User profile otomatik oluşturulur
7. Ana sayfaya yönlendirilir
8. Kullanıcı bilgileri navbar'da görünür
```

### **User Experience Features:**
```
✅ Otomatik profil oluşturma
✅ Hesaplama geçmişi kaydetme
✅ Favori hesaplamalar
✅ Kullanıcı istatistikleri
✅ Kişiselleştirilmiş öneriler
✅ Ad frequency customization
✅ Multi-language preferences
```

---

## **5️⃣ KULLANICI PROFİL ÖZELLİKLERİ**

### **User Profile Data:**
```typescript
interface GoogleUser {
  id: string;              // UUID from Supabase
  email: string;           // Google email
  name: string;            // Full name
  avatar_url?: string;     // Google profile photo
  provider: string;        // 'google'
  created_at: string;      // Account creation
  last_sign_in: string;    // Last login time
}
```

### **User Stats:**
```typescript
interface UserStats {
  total_calculations: number;           // Toplam hesaplama
  favorite_count: number;               // Favori sayısı
  last_activity: string;                // Son aktivite
  most_used_calculation: string;        // En çok kullanılan
  user_level: 'beginner' | 'intermediate' | 'expert' | 'professional';
}
```

### **User Preferences:**
```typescript
interface UserPreferences {
  language: string;                     // tr, en, es, vb.
  ad_frequency: number;                 // 1-10 arası
  theme: 'light' | 'dark' | 'system';  // Tema tercihi
  email_notifications: boolean;         // Email bildirimleri
  calculation_notifications: boolean;   // Hesaplama bildirimleri
  favorite_calculations: string[];      // Favori hesaplama türleri
}
```

---

## **6️⃣ VERİ YÖNETİMİ**

### **Calculation History:**
```typescript
// Hesaplama kaydetme
const saveCalculation = async (
  calculationType: string,
  inputData: any,
  resultData: any,
  title?: string,
  notes?: string
) => {
  const { data, error } = await supabase
    .from('calculation_history')
    .insert({
      user_id: user.id,
      calculation_type: calculationType,
      input_data: inputData,
      result_data: resultData,
      title: title || `${calculationType} Calculation`,
      notes: notes || '',
      is_favorite: false
    });
};
```

### **Favorites Management:**
```typescript
// Favoriye ekleme/çıkarma
const toggleFavorite = async (calculationId: string) => {
  const { error } = await supabase
    .from('calculation_history')
    .update({ is_favorite: !calculation.is_favorite })
    .eq('id', calculationId);
};
```

### **User Analytics:**
```sql
-- En popüler hesaplamalar
SELECT 
  calculation_type,
  COUNT(*) as usage_count,
  COUNT(DISTINCT user_id) as unique_users
FROM calculation_history
GROUP BY calculation_type
ORDER BY usage_count DESC;

-- Kullanıcı aktivite özeti
SELECT 
  user_id,
  COUNT(*) as total_calculations,
  COUNT(CASE WHEN is_favorite THEN 1 END) as favorites,
  MAX(created_at) as last_activity
FROM calculation_history
GROUP BY user_id;
```

---

## **7️⃣ MOBİL UYGULAMA ENTEGRASYONU**

### **Capacitor Google Auth:**
```bash
# Google Auth plugin install
npm install @codetrix-studio/capacitor-google-auth
npx cap sync

# Android configuration
# android/app/src/main/res/values/strings.xml
<string name="server_client_id">123456789-abcdefghijklmnop.apps.googleusercontent.com</string>
```

### **Mobile Auth Implementation:**
```typescript
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const signInWithGoogleMobile = async () => {
  try {
    await GoogleAuth.initialize({
      clientId: 'YOUR_CLIENT_ID',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
    
    const result = await GoogleAuth.signIn();
    
    // Supabase ile session oluştur
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: result.authentication.idToken,
    });
    
  } catch (error) {
    console.error('Mobile Google auth error:', error);
  }
};
```

---

## **8️⃣ GÜVENLİK VE PRİVACY**

### **Row Level Security (RLS):**
```sql
-- Kullanıcılar sadece kendi verilerini görebilir
CREATE POLICY "Users can view own data" ON calculation_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON calculation_history  
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON calculation_history
  FOR UPDATE USING (auth.uid() = user_id);
```

### **Data Privacy:**
```
✅ GDPR Compliant
✅ User data encryption at rest
✅ Secure API endpoints
✅ Row-level security
✅ JWT token authentication
✅ OAuth 2.0 standard
✅ No password storage
✅ Audit logging
```

---

## **9️⃣ ANALYTİCS & MONİTORİNG**

### **User Behavior Tracking:**
```typescript
// Google Analytics events
gtag('event', 'user_signup', {
  event_category: 'authentication',
  event_label: 'google_oauth',
  value: 1
});

gtag('event', 'calculation_saved', {
  event_category: 'engagement',
  event_label: calculation_type,
  value: 1
});
```

### **Business Metrics:**
```
📊 KEY METRICS:

• Daily Active Users (DAU)
• Calculation completion rate  
• Favorite conversion rate
• User retention (7-day, 30-day)
• Popular calculation types
• Geographic distribution
• Device/browser analytics
• Ad engagement rates
```

---

## **🔟 DEPLOYMENT CHECKLİST**

### **Production Deployment:**
```
☐ Google OAuth Client ID configured
☐ Supabase Auth provider enabled
☐ Database schema deployed
☐ Environment variables set
☐ SSL certificates active
☐ Domain redirects configured
☐ Mobile app store ready
☐ Analytics tracking active
☐ Privacy policy updated
☐ Terms of service updated
☐ GDPR compliance verified
☐ Performance testing done
```

### **Testing Checklist:**
```
☐ Login/logout flow
☐ Profile creation
☐ Calculation saving
☐ Favorites functionality
☐ Data persistence
☐ Mobile responsive
☐ Cross-browser testing
☐ Security testing
☐ Load testing
☐ Error handling
```

---

## **📞 SUPPORT & RESOURCES**

- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Capacitor:** https://capacitorjs.com/docs/guides/authentication
- **React Auth:** https://react.dev/learn/synchronizing-with-effects

---

## **🎯 USER EXPERIENCE GOALS**

### **Seamless Authentication:**
- ⚡ **1-click Google login**
- 🔄 **Auto-save calculations**
- ⭐ **Smart favorites**
- 📊 **Personal dashboard**
- 🎨 **Customized experience**
- 🌍 **Multi-language sync**

### **Data-Driven Features:**
- 📈 **Usage analytics**
- 🎯 **Personalized recommendations**
- 🔔 **Smart notifications**
- 💎 **Premium features**
- 🏆 **User achievements**
- 📚 **Learning path suggestions**

**🚀 Result: Professional maritime calculator with enterprise-level user management!** ⚓🔐