## Anladığım

Görsellerdeki gibi alt kısımda **tek bir iOS pill butonu** olacak:

- **Durağan halde** (IMG_0322): Pill üzerinde `🔍 Ara` yazıyor. Tıklayınca `GlobalSearch` dialog'u açılıyor.
- **Hareket halinde / swipe sırasında** (IMG_0323 + IMG_0321): Pill üzerinde 3 nokta görünüyor — ortadaki (aktif sayfanın) parlak beyaz daire, kenardakiler yarı saydam. Mevcut sayfa hangisiyse o nokta vurgulu.
- Swipe bitip sayfa oturduktan kısa süre sonra (~600 ms) pill tekrar `Ara` görünümüne döner.

Ayrıca: **Ana sayfanın üst kısmındaki arama kutusu** (`<GlobalSearch />` blok) tamamen kaldırılır. Arama yalnızca alttaki bu pill üzerinden açılır.

## Değişiklikler — yalnızca `src/pages/Index.tsx`

1. Üstteki header bloğundaki `<GlobalSearch />` ve onu saran `<div className="mt-5 px-4 pointer-events-auto">` kaldırılır.
2. Alt kısımdaki mevcut "page indicator dots" satırı (3 ayrı buton) **tek bir glassmorphism pill** ile değiştirilir:
   - Konum: `bottom-[max(1rem,env(safe-area-inset-bottom))]`, ortalanmış.
   - Stil: `rounded-full`, `bg-white/10`, `backdrop-blur-2xl`, `border border-white/20`, hafif gölge — Ayarlar butonuyla aynı dil.
   - İçerik state'e göre:
     - `isScrolling === false` → `Search` ikonu + `Ara` etiketi. `onClick` → `GlobalSearch` aç.
     - `isScrolling === true` → 3 nokta; `activePage` index'ine göre aktif olan beyaz/opak, diğerleri `bg-white/35`. Hepsi aynı boyut (~7px daire).
3. `isScrolling` state'i pager'ın `scroll` event'inde `true` yapılır; debounce timer (~500 ms scroll durduğunda) ile `false`'a döner. Tek nokta tıklaması artık olmadığı için sayfa atlamayı pill içindeki noktalara değil pager swipe'ına bırakıyoruz (kullanıcı zaten parmakla kaydırıyor).
4. `GlobalSearch` bileşeni şu an kendi tetik butonunu render ediyor. Pill'in tetikleyici olarak çalışması için iki seçenek var:
   - **A)** Tek dosya değişikliği: `GlobalSearch`'ü görünmez tutup pill `onClick`'inde global bir custom event (`window.dispatchEvent(new Event('open-global-search'))`) dispatch et; `GlobalSearch` bu event'i dinleyip açılsın. (Küçük bir ek — `src/components/GlobalSearch.tsx` içine event listener.)
   - **B)** `GlobalSearch`'ü `open` kontrollü prop'a çevirip Index'ten yönet (daha geniş refaktör).
   
   **A** önerilir — minimal değişiklik.

Hiçbir başka sayfa veya bileşen etkilenmez.