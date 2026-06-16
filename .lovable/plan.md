## Sorun

Lovable mobil uygulamasındaki preview WebView "this project couldn't render correctly in the mobile preview" diyor. Kodda runtime error veya console error yok — yani uygulama aslında çalışıyor (tarayıcıda açtığında sorunsuz). Sorun **ilk paint süresi**: Lovable mobil preview, sayfa belirli bir süre içinde anlamlı içerik göstermezse "couldn't render" fallback'ine düşüyor.

Suçlu: `index.html` içindeki splash ekranı.

`index.html` 33 KB / 619 satır ve şu anda inline olarak şunları çalıştırıyor:
- 200 yıldızlı canvas starfield + sürekli rAF döngüsü + shooting stars
- 2 katmanlı blur'lu aurora (filter: blur(60px))
- 2 katmanlı fog drift animasyonu
- 4 katmanlı sürekli hareket eden dalga
- Dönen lighthouse beacon ışınları + glow
- 200×200 compass rose SVG
- Ay + krater + glow pulse
- SVG gemi + duman + köprü pencereleri
- Particle sparkle layer
- Çoklu cubic-bezier title reveal + divider + loader

Bu, mobil WebView'da ilk frame'i hem CPU hem GPU açısından bloke ediyor — yüksek bundle indirme + canvas rAF + birçok blurred composite layer üst üste binince Lovable shell timeout süresini geçiyor ve "couldn't render" diyor.

## Çözüm

`index.html` splash ekranını **çok daha hafif** bir versiyona indir. Görsel kimlik (Marine Expert Pro markası, deniz teması, altın aksanlı) korunsun ama:

- Canvas starfield ve shooting-star rAF döngüsü **kaldırılsın**
- Blur'lu aurora ve fog katmanları **kaldırılsın**
- Beacon rotation, particle sparkles, multi-layer waves **kaldırılsın**
- Lighthouse / ship / compass / moon SVG'leri **kaldırılsın**
- Yalnızca şunlar kalsın: koyu deniz arka planı (sade gradient), küçük çapa/pusula ikonu, "MARINE EXPERT PRO" başlığı + tagline, ince loader bar
- Tek hafif fade-in animasyonu (transform/opacity, GPU-cheap)

Splash'in zaten React mount olur olmaz (`requestAnimationFrame` + 100ms) gizlendiğini biliyoruz — yani kullanıcı görsel olarak fark etmeyecek kadar kısa sürede kayboluyor zaten. Splash içindeki bütün zengin animasyonlar pratikte kimseye gösterilmiyor, sadece ilk paint'i geciktiriyor.

Sonuç: `index.html` ~33 KB'tan ~3-4 KB'a düşecek, canvas rAF tamamen gidecek, blur composite layer kalmayacak. Mobil preview'in timeout'unun altına rahat ineceğiz.

### Etkilenen dosyalar

- `index.html` — splash bölümü (50-614. satırlar) sadeleştirilecek. `<head>` (SEO meta'ları, JSON-LD, fontlar) ve sayfanın geri kalanı aynen korunacak.

### Yapılmayacaklar

- React tarafına dokunulmayacak (`src/main.tsx`, `App.tsx`, rotalar aynen kalacak).
- Capacitor / native config'e dokunulmayacak.
- Backend, business logic, ders/hesaplama içeriği etkilenmeyecek.
- Splash'in zengin animasyonlu hali istenirse sonradan **React içine** (mount sonrası, sadece bir kez gösterilen bir loading overlay olarak) ayrı bir görevde taşınabilir — ama bu görevin kapsamında değil.

Onaylarsan uygulayayım.