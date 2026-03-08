

## Gerçek Fener Karakteristikleri Uygulaması

### Mevcut Durum
Fener şu an sürekli 360° dönen bir ışık huzmesi kullanıyor (`lighthouse-rotate 8s linear infinite`). Bu gerçekçi değil — gerçek deniz fenerleri belirli **karakteristiklere** sahiptir.

### Gerçek Fener Davranışı

Denizcilik fenerlerinin ışık karakteristikleri IALA standartlarına göre tanımlanır. En yaygın tipler:

- **Fl (Flashing)**: Kısa flaş, ardından uzun karanlık. Aydınlık süresi < karanlık süresi.
- **Fl(2) (Group Flashing)**: Belirli aralıklarla 2 flaş grubu.
- **Oc (Occulting)**: Sürekli ışık, kısa karanlık kesintiler.
- **Iso (Isophase)**: Eşit süreli aydınlık ve karanlık.
- **Q (Quick)**: Saniyede 1+ flaş.

### Plan

`src/pages/Index.tsx` dosyasındaki fener animasyonunu şu şekilde değiştireceğiz:

1. **Sürekli dönüşü kaldır** — Gerçek fenerler böyle çalışmaz. Fresnel lens döner ama gözlemciye göre belirli aralıklarla flaş gelir.

2. **Fl(2) 10s karakteristiği uygula** — Klasik bir deniz feneri: Her 10 saniyede 2 kısa flaş grubu.
   - Flaş 1: 0.5s parlak
   - Karanlık: 1.0s
   - Flaş 2: 0.5s parlak
   - Karanlık: 8.0s (periyod tamamlanır)

3. **CSS keyframes ile uygulama**:
   - `lighthouse-rotate` kaldırılacak
   - Yerine `lighthouse-flash` keyframe: opacity bazlı flaş animasyonu
   - Işık huzmesi sabit açıda kalacak (sağa doğru, denize bakacak şekilde)
   - Flaş anında huzme ve Fresnel glow birlikte parlayıp sönecek

4. **Fresnel lens glow'u senkronize et** — Flaş anında parlak, karanlıkta loş ama tamamen sönmeyecek (gerçek fenerlerde lens her zaman hafif ışır).

5. **Atmosferik etki** — Flaş anında çevredeki scatter da birlikte artacak.

### Teknik Detay

Tek dosya değişikliği: `src/pages/Index.tsx`

- Işık huzmesi container'ından `lighthouse-rotate` animasyonu kaldırılacak, sabit açıya (`rotate(-15deg)` gibi, denize doğru) set edilecek.
- Yeni `lighthouse-flash` keyframe ile opacity kontrollü Fl(2) 10s karakteristiği.
- Fresnel pulse da aynı 10s periyoda senkronize edilecek.
- Huzme, scatter ve glow elementlerinin hepsi aynı animasyon timeline'ına bağlanacak.

