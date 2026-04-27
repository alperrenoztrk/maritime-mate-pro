## Amaç

`ShipOperationsDetail` sayfasındaki geri-tuşu mantığını uygulamanın tamamına yaymak: **bir tıkla, kullanıcının nereden geldiğine bakmaksızın, sayfanın mantıksal parent rotasına dön.**

## Operasyon Sayfasındaki Mantık (Referans)

`src/pages/ShipOperationsDetail.tsx` (satır 62-67):

```tsx
<Link
  to="/ship-operations"          // ← Sabit parent rota
  className="...rounded-full..."
>
  <ArrowLeft className="h-4 w-4" />
</Link>
```

Önemli noktalar:
- `navigate(-1)` veya `history.back()` **kullanılmıyor** (browser history zincirine bağlı kalmaz, döngüye girmez).
- Sayfa nereden açılırsa açılsın hep aynı parent'a döner → tahmin edilebilir.
- Tek tıkla çalışır; ara index sayfalarında durmaz.
- Bu yaklaşım `mem://navigation/logical-hierarchy-back-button` kuralıyla da örtüşüyor.

## Tespit Edilen Sorunlar

Yaklaşık 76 sayfa `ArrowLeft` ikonu kullanıyor. Tarama sonucu üç ana problem var:

1. **Tıklanabilir değil** — ikon var ama `<Link>` sarmalayıcı yok, dolayısıyla geri çalışmıyor. Örnek: `StabilityGM.tsx`, `StabilityGZ.tsx`, `MachineQuiz.tsx` (sadece `import { ArrowLeft }` var, JSX'te kullanılmıyor ya da pasif).
2. **Yanlış/uyumsuz hedef** — bazı detay sayfaları kullanıcıyı parent yerine ana hesaplama merkezine atıyor. Örn. `BridgeDeviceDetail.tsx` → "Hesaplama Merkezine dön" diyor; oysa parent `/bridge-devices` olmalı.
3. **Belirsiz "Geri" etiketi** — `Glossary`, `LessonsPage`, `ShipTaskDetailPage`'de buton "Geri" diyor ama hedefi muğlak / browser history bazlı değil ama metin yanıltıcı.

## Yapılacaklar

### 1. Ortak `BackButton` bileşeni oluştur

`src/components/BackButton.tsx` — Operasyon sayfasındaki yuvarlak ok stilini bire bir taşıyan, tek prop'lu bir bileşen:

```tsx
type Props = { to: string; label?: string };
```

- Yuvarlak ikon-only varyant (header'larda).
- Opsiyonel etiketli "pill" varyant (sayfa boş-state'lerinde).
- İçeride `<Link to={to}>` kullanır — `navigate(-1)` **asla**.

### 2. Sayfa → parent rota eşlemesi

Mantıksal hiyerarşiye göre standart parent eşlemesi:

| Sayfa grubu | Parent rota |
|---|---|
| `ShipOperationsDetail` | `/ship-operations` (zaten doğru) |
| `ShipSystemDetailPage` | `/ship-systems` |
| `ShipTaskDetailPage` | `/ship-tasks` |
| `CrewRoleDetail` | `/crew` |
| `BridgeDeviceDetail` | `/bridge-devices` (mevcut: `/calculations` — yanlış) |
| `Stability*` (GM, GZ, Trim, List, Loll, vs.) | `/calculations/stability` |
| `DraftSurvey*` | `/calculations/draft-survey` |
| `Machine*` (Quiz, Rules, Formulas) | `/lessons/machine` (veya `/calculations/machine` hangisi parent ise) |
| `Seamanship*` | `/lessons/seamanship` |
| `Cargo*`, `Safety*`, `Emission*` | İlgili lesson/calculation parent'ı |
| `Glossary`, `Converter`, `Formulas`, `LocationSelector` | `/calculations` (giriş noktası) |
| `LessonsPage`, `BetaFeaturesPage` | `/` (ana sayfa) |

Eşleme tablosunu kodda tek bir yerde (`src/lib/parentRoutes.ts`) tutmak, ileride bakım kolaylığı sağlar.

### 3. Sayfaları tek tek güncelle

Her sayfada:
- `ArrowLeft` ikonu içeren mevcut header bloğunu `<BackButton to="...">` ile değiştir.
- Görsel stil (`rounded-full`, `border`, boyut) birebir Operasyon sayfası gibi olsun.
- Tıklanabilir olmayan ikonları kaldır / aktif hale getir.
- "Geri Dön", "Tüm İşler", "Hesaplama Merkezine dön" gibi karışık etiketler yerine tek standart: ikon-only buton.

### 4. Doğrulama

- Her sayfada elle gezinme testi: detay sayfasını farklı yollardan aç → tek tıkla parent'a döndüğünü doğrula.
- Android cihazda donanım geri tuşu (`useAndroidFeatures`'taki `backButton` listener) zaten `window.history.back()` çağırıyor; bu davranışı değiştirmiyoruz, sadece ekran içi UI butonunu standartlaştırıyoruz.

## Memory Güncellemesi

`mem://navigation/logical-hierarchy-back-button` memory'sini yeni standardı (ortak `BackButton` bileşeni + `parentRoutes` haritası) yansıtacak şekilde güncelle.

## Kapsam Dışı

- Donanım geri tuşu (Android) davranışı — değişmiyor.
- Browser history yönetimi — değişmiyor.
- Modal'lar içindeki kapatma butonları — bu plan sadece sayfa düzeyinde geri butonlarını kapsıyor.
