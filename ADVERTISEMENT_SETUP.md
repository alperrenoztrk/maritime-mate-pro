# 🎯 **REKLAM ENTEGRASYONİ REHBERİ**
## Maritime Calculator - Professional Ad Integration

### **📱 KURULUM ÖZETİ**

✅ **Google AdSense** - Web banner reklamları  
✅ **AdMob** - Mobil uygulama reklamları  
✅ **Native Ads** - Sponsorlu içerikler  
✅ **Smart Ad Manager** - Akıllı reklam yönetimi  
✅ **Analytics Integration** - Reklam performans takibi  

---

## **1️⃣ GOOGLE ADSENSE KURULUMU**

### **AdSense Hesabı Oluşturma:**
1. [AdSense.com](https://www.google.com/adsense/) adresine git
2. "Get Started" → Google hesabınla giriş yap
3. **Website URL'ini ekle:** `your-maritime-calculator-domain.com`
4. **Country/Territory seç:** Türkiye
5. **Payment method** bilgilerini gir

### **Publisher ID Alma:**
```javascript
// Örnek Publisher ID format:
ca-pub-1234567890123456

// index.html dosyasında güncelle:
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-BURAYA-KODUNUZu"></script>
```

### **Ad Units Oluşturma:**
```
📊 BANNER REKLAM BOYUTLARI:

1. Mobile Banner: 320x50 (slot: 1234567890)
2. Desktop Rectangle: 300x250 (slot: 0987654321)
3. Responsive Inline: Auto (slot: 1122334455)
4. Large Rectangle: 336x280 (slot: 5566778899)
```

---

## **2️⃣ ADMOB KURULUMU (Mobile App)**

### **AdMob Hesabı:**
1. [AdMob Console](https://admob.google.com/) açın
2. **"Add App"** → **"Android"** seçin
3. **App Name:** "Maritime Calculator"
4. **Package Name:** `com.marinersbook.app`

### **Ad Unit IDs:**
```javascript
// Android AdMob IDs:
Banner: ca-app-pub-XXXXXXXX/1234567890
Interstitial: ca-app-pub-XXXXXXXX/0987654321
Rewarded: ca-app-pub-XXXXXXXX/1122334455
Native: ca-app-pub-XXXXXXXX/5566778899
```

### **Capacitor AdMob Kurulumu:**
```bash
npm install @capacitor-community/admob
npx cap sync

# Android için izinler:
# android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

---

## **3️⃣ KOD GÜNCELLEME**

### **AdSense Publisher ID Güncelleme:**
```typescript
// src/hooks/useAdManager.ts dosyasında:
const script = document.createElement('script');
script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-GERÇEK-ID-BURAYA';

// src/components/ads/AdBanner.tsx dosyasında:
data-ad-client="ca-pub-GERÇEK-ID-BURAYA"
```

### **Ad Slot Güncelleme:**
```typescript
// AdBanner bileşenlerinde:
export const AdBannerMobile = () => (
  <AdBanner 
    slot="GERÇEK-SLOT-ID"  // Gerçek slot ID'nizi buraya
    format="auto"
  />
);
```

---

## **4️⃣ REKLAM STRATEJİSİ**

### **Reklam Pozisyonları:**
```
🎯 OPTIMAL REKLAM YERLEŞİMİ:

✅ Header sonrası (İlk izlenim)
✅ Her 4 hesaplama kartından sonra
✅ AI yanıt sonrası (Engagement yüksek)
✅ Sayfa sonu (Exit intent)
✅ Hesaplama tamamlandıktan sonra
```

### **Frekans Ayarları:**
```typescript
// src/hooks/useAdManager.ts
const adConfig = {
  enabled: true,
  frequency: 3,  // Her 3 etkileşimde bir reklam
  mobileEnabled: true,
  desktopEnabled: true,
}
```

---

## **5️⃣ NATIVE ADVERTISING**

### **Maritime Sektörü Sponsorları:**
```
🚢 HEDEF SPONSORLAR:

1. Naval Architecture Software (AutoCAD Marine, Rhino Marine)
2. Maritime Training Companies (STCW, MCA courses)
3. Ship Management Software (Fleet management, ECDIS)
4. Maritime Job Platforms (Maritime careers, crew jobs)
5. Marine Equipment Suppliers (Engines, navigation)
6. Classification Societies (DNV, ABS, Lloyd's)
```

### **Revenue Streams:**
```
💰 GELİR KAYNAKLARI:

1. AdSense: $0.50-$2.00 RPM (global traffic)
2. AdMob: $1.00-$5.00 RPM (mobile app)
3. Native Ads: $5.00-$50.00 per click
4. Sponsored Content: $100-$1000 per post
5. Maritime Software Affiliates: 10-30% commission
```

---

## **6️⃣ ANALYTICS & OPTIMIZATION**

### **Google Analytics 4 Setup:**
```javascript
// index.html güncelleme:
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GERÇEK-GA4-ID');
</script>
```

### **Conversion Tracking:**
```typescript
// Ad click tracking:
const handleAdClick = () => {
  gtag('event', 'ad_click', {
    event_category: 'advertisement',
    event_label: 'native_ad_maritime_software',
    value: 1
  });
};
```

---

## **7️⃣ PERFORMANCE OPTİMİZASYONU**

### **Ad Loading Optimization:**
```typescript
// Lazy loading ile performans iyileştirme
useEffect(() => {
  const timer = setTimeout(() => {
    loadAdSenseScript();
  }, 2000); // 2 saniye sonra yükle
  
  return () => clearTimeout(timer);
}, []);
```

### **Revenue Optimization:**
```
📈 GELİR OPTİMİZASYONU:

1. A/B Test ad placements
2. Optimize ad sizes for mobile
3. Monitor CTR and CPC
4. Test different ad frequencies
5. Seasonal content adjustments
```

---

## **8️⃣ COMPLIANCE & BEST PRACTICES**

### **GDPR Compliance:**
```typescript
// Cookie consent için
const [cookieConsent, setCookieConsent] = useState(false);

// Reklam göster sadece consent varsa
{cookieConsent && shouldShowAd('position') && <AdBanner />}
```

### **AdSense Policies:**
```
✅ ADSENSE POLİTİKA UYUMU:

• Yetişkin içerik yok ✅
• Şiddet içeriği yok ✅
• Telif hakkı ihlali yok ✅
• Spam/clickbait yok ✅
• Maritime education content ✅
• Professional engineering tools ✅
```

---

## **9️⃣ MOBILE APP MONETIZATION**

### **AdMob Implementation:**
```typescript
import { AdMob } from '@capacitor-community/admob';

// App başlatırken
await AdMob.initialize({
  requestTrackingAuthorization: true,
  testingDevices: ['YOUR_DEVICE_ID'],
});

// Banner reklam göster
await AdMob.showBanner({
  adId: 'ca-app-pub-XXXXXXXX/YYYYYY',
  adSize: BannerAdSize.BANNER,
  position: BannerAdPosition.BOTTOM_CENTER,
});
```

### **In-App Purchase Alternative:**
```
💎 PREMİUM FEATURES:

1. Ad-Free Experience: $2.99/month
2. Advanced Calculations: $4.99/month
3. Professional Reports: $9.99/month
4. Enterprise License: $49.99/month
```

---

## **🚀 DEPLOYMENT CHECKLİST**

```
☐ AdSense Publisher ID updated
☐ Ad slot IDs configured
☐ Analytics tracking active
☐ Mobile responsive ads tested
☐ GDPR compliance implemented
☐ Performance optimized
☐ Revenue tracking setup
☐ A/B testing framework ready
☐ Maritime-specific content created
☐ Professional sponsor outreach
```

---

## **📞 SUPPORT & RESOURCES**

- **AdSense Help:** https://support.google.com/adsense/
- **AdMob Help:** https://support.google.com/admob/
- **Maritime Ad Networks:** https://maritime-advertising.com/
- **Analytics Dashboard:** https://analytics.google.com/

---

**🎯 Hedef:** $500-2000/month revenue with 10k+ monthly users  
**⏱️ Timeline:** 2-4 weeks for full optimization  
**🌍 Markets:** Global maritime professionals, students, engineers