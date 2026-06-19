# Ana sayfa tasarım dilini tüm uygulamaya yayma

## Hedef
Ana sayfanın görsel dilini (derin maritime gradyan + animasyonlu dalgalar + üst radial glow + cam efektli butonlar + açık tipografi) uygulamadaki **tüm** sayfalara taşımak — sayfaları tek tek elden geçirmeden.

## Mevcut Durum
- `MobileLayout` zaten aynı maritime shell'i sunuyor (gradyan + dalgalar) — fakat **31/138** sayfa kullanıyor.
- **107 sayfa** kendi arka planını çiziyor (örn. `bg-gradient-to-br from-blue-50 to-blue-100`, `bg-amber-50…`, `bg-white`, açık tema kartları). Bu yüzden görsel dil birbirini tutmuyor.
- Tek tek 107 sayfayı yeniden yazmak yerine **global bir shell + CSS örtbas (neutralize)** stratejisi kullanılacak.

## Strateji (3 adım, ~3 dosya)

### 1. Global Maritime Shell — `src/components/GlobalMaritimeBackground.tsx` (yeni)
- `position:fixed; inset:0; z-index:-1` katmanı.
- Ana sayfayla **birebir aynı** öğeleri içerir:
  - Derin gradyan: `hsl(214 84% 8%) → hsl(214 84% 15%) → hsl(200 80% 18%)`
  - Üst radial glow: `rgba(56,189,248,0.14)`
  - Alt animasyonlu çift dalga (22s + 16s, ters yönlü)
- `App.tsx`'de `<BrowserRouter>` öncesinde **tek sefer** mount edilir.

### 2. CSS Neutralize Katmanı — `src/index.css`'e eklenecek `body.marine-global` kuralları
- 107 sayfanın yazdığı opak arka planları **şeffaflaştırır** ki global shell görünsün:
  - `:where(.bg-white, .bg-slate-50, .bg-gray-50, .bg-blue-50, .bg-amber-50, …, [class*="bg-gradient-to"]:not(.marine-keep))` → `background: transparent !important`
  - Sadece sayfa kökündeki `min-h-screen` taşıyan konteynerleri hedefler (iç kartlar etkilenmez): `:where(.min-h-screen, [class*="min-h-["])` kombinasyonu.
- Açık tema metinlerini (slate-900, gray-700 vb.) maritime'a uygun açık renge çevirir — `MobileLayout`'taki `.marine-shell__content` kuralının global versiyonu.
- Açıkça korunmak istenen sayfalar `marine-keep` sınıfı ekleyerek dışarda kalabilir (örn. modal/print sayfaları).

### 3. App.tsx Entegrasyonu
- `<body>`'ye `marine-global` sınıfını ekle (tek useEffect).
- `<GlobalMaritimeBackground />` mount et.
- `MobileLayout` kullanan sayfalar otomatik çakışmaz — onun arka planı global'in üstüne yazar, aynı görsel olduğu için fark edilmez (veya `MobileLayout`'taki kendi `background` stilini kaldırıp global'e bırakabiliriz — daha temiz).

## Etki
- 107 sayfa **tek satır değiştirilmeden** maritime tema kazanır.
- Cam efektli butonlar, gradyan başlıklar gibi noktasal Index detayları **bu adımda değil** — sonraki opsiyonel pass'te eklenir (çünkü her sayfanın H1/button anatomisi farklı; doğru kapsam ayrı bir görev).

## Riskler
- Açık tema kartlı sayfalarda (Ballast, BetaFeatures) kartların okunabilirliği test edilmeli — kartlar için `bg-white/10 backdrop-blur` türü override gerekebilir, bunu da global CSS'e ekleyeceğim.
- Print / Auth ekranları için `marine-keep` istisnası eklenir.

## Dosyalar
- yeni: `src/components/GlobalMaritimeBackground.tsx`
- düzenlenir: `src/App.tsx` (mount + body class)
- düzenlenir: `src/index.css` (neutralize + text override kuralları)
- düzenlenir: `src/components/MobileLayout.tsx` (kendi gradyanını kaldır, global'i kullansın — opsiyonel temizlik)

## Onaylarsanız
Bu 4 dosyayı tek pass'te yazarım. Sonradan istediğiniz sayfaya `marine-keep` ekleyebilir veya kart stilini ince ayar yapabilirim.
