
## Amaç

Anasayfa, iOS/Android ana ekran benzeri 6 ikonlu uygulama grid'ine dönüşecek. Alttaki bottom navigation tamamen kaldırılacak. Widget sayfası kaldırılıp, kullanıcı widget'ları Ayarlar'dan seçip anasayfada (ikonların arasında) gösterebilecek.

## 1) Anasayfa (`src/pages/Index.tsx`)

iOS Home Screen paralelinde yeniden tasarım:

- Üstte mevcut başlık (MARINE EXPERT PRO) küçültülerek korunur; pusula kaldırılır (anasayfa artık launcher gibi davranır).
- Ortada 3 sütunlu (mobil) / 4 sütunlu (tablet) **app icon grid**:
  - Hesaplamalar → `/calculations` (Calculator)
  - Dersler → `/lessons` (BookOpen)
  - Personel → `/crew` (Users)
  - Gemi Sistemleri → `/ship-systems` (Ship)
  - Operasyonlar → `/ship-operations` (ClipboardList)
  - Beta → `/beta` (FlaskConical)
- Her ikon: yuvarlatılmış kare (rounded-[22%], iOS squircle benzeri), gradient zemin, lucide ikon, altında label. Tap-hold/scale aktif animasyon.
- Aşağıda **Widget alanı**: kullanıcının Ayarlar'dan seçtiği widget'lar ikonların altında/arasında çıkar. Boşsa hiçbir şey gösterilmez (ipucu metni gizli).
- Üstte GlobalSearch (iOS Spotlight çubuğu gibi pill arama), sağ üstte Ayarlar ikonu korunur.
- Mevcut sol/sağ swipe (haberler/widgets) kaldırılır; widgets rotası artık yok.
- "Keşfetmeye Başla" CTA kaldırılır (launcher mantığıyla gereksiz).
- Okyanus dalga arka planı korunur (görsellik için).

## 2) Bottom navigation kaldırma

`src/components/BottomNavigation.tsx` kullanan **15 sayfadan** import + `<BottomNavigation />` kullanımı silinir. Bileşen dosyası tamamen silinir. `MobileLayout` zaten bottom bar render etmiyor; sadece sayfaların alt padding'i (pb-20 vb.) gerekirse temizlenir.

## 3) Widget yönetimi → Ayarlar

Mevcut `/widgets` sayfası (`src/pages/WidgetPage.tsx`) ve tüm widget bileşenleri (`TimeWidgets`, `WeatherInfoWidgets`, `LocationCelestialWidgets`) korunur ama route kaldırılır. Yerine:

- **Yeni: `src/components/widgets/HomeWidgetGrid.tsx`** — localStorage'daki `home-widgets-enabled` listesini okur, ilgili widget kartlarını anasayfada render eder (kompakt iOS widget boyutları: small/medium).
- **Yeni: `src/pages/SettingsWidgets.tsx`** veya mevcut `Settings` sayfasına eklenen bölüm: kullanılabilir widget'ları toggle ile aç/kapat ve sıralayabilen liste (drag handle ile basit yukarı/aşağı butonları).
- localStorage key: `marine-home-widgets-v1` → `[{ id: "clock-national", enabled: true, order: 0 }, ...]`.
- Mevcut widget bileşenleri "compact" prop alacak şekilde küçük adapte edilir (kart boyutu için).

Kullanılabilir widget'lar (ilk sürüm):
- Saat (Ulusal / GMT / LMT / ZT)
- Hava durumu (sıcaklık + ikon)
- Rüzgar (yön + hız)
- Konum (enlem/boylam DMS)
- Güneş (doğuş/batış)

## 4) Routing

`src/App.tsx`'te:
- `/widgets` route'u kaldırılır.
- `Settings` içinde widget yönetimi bölümü açılır (ayrı route gerekmez).

## 5) Tasarım dili (iOS paralel)

- İkon kareleri: `aspect-square rounded-[22px]`, hafif iç gölge + dış gölge, semantik gradient (her modül için farklı maritime ton: deep blue, teal, slate, ocean).
- Label: `text-xs font-medium text-white/90`, ikon altında 6px boşluk.
- Grid: `grid-cols-3 gap-x-4 gap-y-6 px-6`.
- Tap feedback: `active:scale-95 transition-transform`.
- Widget kartları: glassmorphism (`bg-white/8 backdrop-blur-xl border border-white/15 rounded-3xl`).

## Teknik notlar

- Mevcut semantik token kuralı korunur; hardcoded hex sadece anasayfa launcher gradient'lerinde (mevcut pattern ile uyumlu) kullanılır.
- Compass listener Index'ten kaldırılır (artık dial yok) → sensör dinleme maliyeti düşer.
- Widget verisi için `useCurrentWeather` hook'u anasayfada bir kez çağrılır ve enabled widget'lara prop ile aktarılır (duplicate fetch yok).
- `WidgetPage.tsx` dosyası silinir; tutorial localStorage anahtarları temizlenmez (zararsız).

## Etkilenen dosyalar

- Değişen: `src/pages/Index.tsx`, `src/App.tsx`, `src/pages/Settings.tsx` (widget bölümü), 15 sayfadan `BottomNavigation` kaldırma.
- Yeni: `src/components/home/AppIconGrid.tsx`, `src/components/widgets/HomeWidgetGrid.tsx`, `src/components/settings/WidgetSettings.tsx`, `src/hooks/useHomeWidgets.ts`.
- Silinen: `src/components/BottomNavigation.tsx`, `src/pages/WidgetPage.tsx`.
