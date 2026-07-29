# Para Kazanma (Monetization) Kurulumu

Model: **ücretsiz indirme + freemium**. Uygulama Google Play'de ücretsizdir;
Pro içerik **aylık/yıllık abonelik** veya **ömür boyu satın alma** ile açılır.
Ana teklif yıllık aboneliktir. Reklam (AdMob) ana gelir değil, yalnızca
ücretsiz paketi destekleyen ikincil gelirdir.

## Mimari özet

```
Android uygulaması
  └─ PlayBillingPlugin (native, Billing Library 7)
       └─ satın alma / geri yükleme → purchaseToken
            └─ Supabase edge function: verify-purchase
                 ├─ Google Play Developer API ile doğrular
                 ├─ user_entitlements tablosuna kullanıcıyla eşleyerek yazar
                 └─ satın almayı onaylar (acknowledge)
Google Play (RTDN / Pub/Sub push)
  └─ Supabase edge function: play-rtdn
       └─ yenileme / iptal / iade olaylarını tabloya işler

İstemci: EntitlementContext
  ├─ user_entitlements'ı RLS ile okur (yalnız kendi satırları)
  └─ sonucu localStorage'a önbellekler → çevrimdışında Pro erişimi
     OFFLINE_GRACE_DAYS (45 gün) korunur; ömür boyu paket süresiz.

AI (gemini-chat, ask-ai)
  └─ kimlik doğrulaması + pakete göre aylık kota (ai_usage + consume_ai_credit)
```

Pro hakkı **hiçbir zaman istemcide açılmaz**; tek gerçek kaynak sunucu
doğrulamasıyla yazılan `user_entitlements` tablosudur.

## 1. Google Play Console

### Ürünler (Monetize → Products)

| Ürün kimliği | Tür | Açıklama |
|---|---|---|
| `pro_monthly` | Abonelik (base plan: aylık) | Pro Aylık |
| `pro_yearly` | Abonelik (base plan: yıllık) | Pro Yıllık — ana teklif |
| `pro_lifetime` | Uygulama içi ürün (tek seferlik) | Ömür Boyu (sınırsız AI hariç) |

Fiyatlar Play Console'da **bölgesel fiyatlandırma** ile belirlenir (kur
çevirisi değil). Başlangıç önerisi: aylık $4.99 / ₺99–149, yıllık $34.99 /
₺699–999, ömür boyu $79.99 / ₺1.799–2.499. Uygulama fiyatı her zaman
mağazadan canlı okur; kodda fiyat yoktur.

### Servis hesabı (satın alma doğrulama)

1. Google Cloud Console'da bir servis hesabı oluşturun, JSON anahtar indirin.
2. Play Console → Users and permissions → servis hesabını davet edin;
   **Financial data** görüntüleme ve **Manage orders** izni verin.
3. JSON anahtarın tamamını Supabase secret'ına koyun (aşağıda).

### RTDN (Real-time developer notifications)

1. Cloud Pub/Sub'da bir topic açın; Play Console → Monetize → Monetization
   setup → topic adını girin.
2. Topic'e **push subscription** ekleyin, endpoint:
   `https://<proje>.supabase.co/functions/v1/play-rtdn?secret=<PLAY_RTDN_SECRET>`
3. Play Console'daki "Send test notification" ile doğrulayın.

RTDN olmadan da sistem çalışır (durum, kullanıcı uygulamayı açtığında
`verify-purchase` ile tazelenir); RTDN iptal/iade işlemlerini anında yansıtır.

## 2. Supabase secrets (Edge Functions → Secrets)

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Evet | Servis hesabı JSON anahtarının tamamı |
| `GOOGLE_PLAY_PACKAGE_NAME` | Hayır | Varsayılan `com.marinersbook.app` |
| `PLAY_RTDN_SECRET` | RTDN için | Uzun rastgele dize; push URL'sindeki `?secret=` ile aynı |
| `PLAY_SUBSCRIPTION_IDS` | Hayır | Varsayılan `pro_monthly,pro_yearly` |
| `PLAY_LIFETIME_IDS` | Hayır | Varsayılan `pro_lifetime` |
| `AI_QUOTA_FREE` | Hayır | Ücretsiz paket aylık AI istek hakkı (varsayılan 10) |
| `AI_QUOTA_PRO` | Hayır | Pro abonelik aylık AI hakkı (varsayılan 300) |
| `AI_QUOTA_LIFETIME` | Hayır | Ömür boyu paket aylık AI hakkı (varsayılan 30) |

## 3. Dağıtım adımları

```bash
# Veritabanı (user_entitlements, ai_usage, consume_ai_credit)
supabase db push

# Edge functions
supabase functions deploy verify-purchase
supabase functions deploy play-rtdn --no-verify-jwt   # config.toml'da da işaretli
supabase functions deploy gemini-chat
supabase functions deploy ask-ai

# Android
npm run build && npx cap sync android
cd android && ./gradlew bundleRelease
```

Not: Billing Library, `com.android.vending.BILLING` iznini manifest
birleştirmeyle otomatik ekler. Satın alma testleri için Play Console'da
**License testing** hesapları tanımlayın ve uygulamayı internal testing
kanalından kurun (yerel derlemede satın alma akışı açılmaz).

## 4. Paket kuralları (kodda uygulanmış hali)

- **Ücretsiz:** sözlük, temel içerik, haber/hava durumu; AI ayda 10 istek.
- **Pro (abonelik):** tüm içerik + AI ayda 300 istek. `on_hold`/`paused`
  durumlarında erişim kapanır; `canceled` durumda dönem sonuna kadar sürer;
  `grace_period` erişimlidir (Google politikasına uygun).
- **Ömür boyu:** tüm çevrimdışı içerik kalıcı; AI ayda 30 istek
  (sınırsız AI bilinçli olarak abonelikte — sürekli maliyet sürekli gelirle
  eşleşir; Google'ın "abonelik sürekli değer sunmalı" politikasıyla uyumlu).
- **Çevrimdışı:** son başarılı eşitlemeden sonra Pro erişimi 45 gün korunur
  (`OFFLINE_GRACE_DAYS`, src/config/products.ts); ömür boyu süresiz. AI zaten
  internet gerektirdiği için kota çevrimdışında tüketilmez.

## 5. İçerik kapılama

Pro'ya alınacak her ekran/bileşen `ProGate` ile sarılır:

```tsx
import { ProGate } from "@/components/pro/ProGate";

<ProGate feature="3D Gemi Sistemleri">
  <ShipSystems3D />
</ProGate>
```

Hangi içeriğin ücretsiz kalacağı ürün kararıdır; öneri: sözlük, temel
COLREG/emniyet, birkaç kitap ve temel hesaplayıcılar ücretsiz kalmalı ki
uygulama tek başına da işe yarasın (mağaza yorumları için kritik).

## 6. Bilinen sınırlar / sonraki adımlar

- **iOS:** StoreKit entegrasyonu yok; web/iOS'ta satın alma düğmeleri
  gizlenir. App Store'a çıkmadan önce eklenmeli (Stripe, Play dışı dijital
  içerik satışında kullanılamaz; mevcut `stripe-checkout` yalnızca web için).
- **AdMob:** altyapı kurulu ve `useEntitlement().hasProAccess` ile kapılanmış
  (banner + geçiş reklamı, yalnızca ücretsiz pakette). Varsayılan olarak
  Google'ın TEST reklamları gösterilir; canlıya alma adımları
  `ADVERTISEMENT_SETUP.md`'de. Ödüllü (rewarded) reklam henüz yok.
- **Fiyat testi:** Play Console'da fiyat deneyleri (price experiments) ile
  yıllık/aylık oranını test edin; hedef, kullanıcıları yıllık plana yönlendirmek.
