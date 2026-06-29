# Gemici Bağları — Görsel Varlıkları (Knot Media)

Bu klasör, "Adım Adım Bağ Yapımı" oynatıcısının (`src/components/lessons/KnotMediaPlayer.tsx`)
gösterdiği görselleri tutar. Oynatıcı, bir bağın karelerini (frame) sırayla oynatır —
"Animated Knots" tarzı net, adım adım bir deneyim.

## Klasör / İsim Düzeni

```
public/knots/<knotId>/step-1.svg
public/knots/<knotId>/step-2.svg
...
```

`<knotId>` değerleri `src/data/knotTyingAnimations.ts` ile birebir aynıdır. Bağlar artık
Gemici Bağları sayfasında (`src/pages/SailorKnots.tsx`) kategorilere ayrılır ve her biri
açılır-kapanır bir kart olarak gösterilir.

| knotId                          | Bağ                       | Kategori   | Görsel                |
| ------------------------------- | ------------------------- | ---------- | --------------------- |
| `figure-eight`                  | Sekizli Düğüm             | Durdurucu  | `frame-1.jpg`         |
| `reef-knot`                     | Yassı Düğüm (Camadan)     | Durdurucu  | `frame-1.jpg`         |
| `bowline`                       | İzbarço Bağı              | İlmek      | `frame-1..5.jpg`      |
| `bowline-on-bight`              | Çifte İzbarço             | İlmek      | placeholder (`none`)  |
| `clove-hitch`                   | Kazık Bağı (Volta)        | Bağ        | `frame-1.jpg`         |
| `two-half-hitches`              | İki Yarım Anele           | Bağ        | `frame-1.jpg`         |
| `round-turn-two-half-hitches`   | Camadan Voltası           | Bağ        | `frame-1..3.jpg`      |
| `rolling-hitch`                 | Gronof Bağı               | Bağ        | `frame-1.jpg`         |
| `cleat-hitch`                   | Koç Boynuzuna Volta       | Bağ        | `frame-1.jpg`         |
| `anchor-bend`                   | Demir Bağı                | Bağ        | `frame-1.jpg`         |
| `sheet-bend`                    | Kıstırma Düğümü           | Ekleme     | `frame-1..4.jpg`      |
| `double-sheet-bend`             | Çifte Kıstırma            | Ekleme     | `frame-1.jpg`         |
| `carrick-bend`                  | Kropi Bağı                | Ekleme     | `frame-1.jpg`         |

Kart, mevcut tüm kareleri numaralı bir galeri olarak ve adımları sıralı bir liste olarak
gösterir — ileri/geri (önceki/sonraki) tuşu yoktur.

## Şu Anki Durum

`bowline-on-bight` (Çifte İzbarço) dışındaki tüm bağlar artık **tekniği gerçekten doğru gösteren**,
tek tek görsel olarak doğrulanmış Wikimedia Commons fotoğrafları kullanır (`frame-N.jpg`). Henüz
doğrulanmış görseli olmayan bağ (`media.kind: "none"`) markalı bir placeholder gösterir; metin
adımları yine de eksiksiz ve doğrudur — yanıltıcı görsel asla gösterilmez.

> Not: `figure-eight` için eski „Noeud gibus" fotoğrafları basit durdurucu yerine çift ilmekli
> (dekoratif) bir sekizli gösterdiğinden kaldırıldı; yerine „Der Barbar"ın gerçek durdurucu sekizli
> (Endacht) fotoğrafı kondu. `bowline-on-bight` için mevcut tek serbest lisanslı fotoğraf iki ilmeği
> net göstermediğinden bilerek placeholder'da bırakıldı.

Atıf bilgileri `src/data/knotTyingAnimations.ts` içindeki `media.attribution` alanında ve
aşağıdaki CREDITS bölümünde tutulur.

## Gerçek Görselleri Ekleme

İki yöntem var:

### Yöntem A — Kare dizisi (önerilen, en net)
1. Her adım için gerçek bir halat fotoğrafı/karesi hazırla (≈ 480×300 px, web formatı: `.webp` / `.jpg` / `.png`).
2. Dosyaları `public/knots/<knotId>/` altına koy.
3. `src/data/knotTyingAnimations.ts` içindeki ilgili bağın `media.frames` dizisini yeni dosya
   adlarına güncelle, ör.:
   ```ts
   media: { kind: "frames", frames: [
     "/knots/bowline/frame-1.webp",
     "/knots/bowline/frame-2.webp",
     "/knots/bowline/frame-3.webp",
     "/knots/bowline/frame-4.webp",
   ], attribution: "Kaynak — Lisans" },
   ```
   (Veya basitçe mevcut `step-N.svg` dosyalarının üzerine yaz; o zaman veri değişmez.)

### Yöntem B — Tek animasyonlu GIF/WebP
```ts
media: { kind: "gif", src: "/knots/bowline/animation.gif", attribution: "Kaynak — Lisans" }
```
GIF modunda oynatıcı dosyayı kendi döngüsünde oynatır; adımlar başlık olarak listelenir.

## Lisans / Atıf

Dışarıdan görsel kullanırken **mutlaka lisansını kontrol et**. Telifli setler
(ör. Animated Knots by Grog, Knots 3D) kullanılamaz. Serbest lisanslı (CC BY / CC BY-SA / CC0,
Public Domain) görsellerde, lisans gerektiriyorsa `media.attribution` alanına kaynağı ve lisansı
yaz; oynatıcı bunu görselin altında küçük bir not olarak gösterir.

## CREDITS (mevcut görseller)

Tümü Wikimedia Commons. 640px web boyutuna küçültülmüştür; orijinaller kaynak sayfalarında.

### bowline (İzbarço) — `frame-1..5.jpg`
- Yazar: **Patricio Lorente** · Lisans: **CC BY-SA 2.5**
- Kaynak: `File:As de guia 1.jpg` … `As de guia 5.jpg`
  https://commons.wikimedia.org/wiki/File:As_de_guia_1.jpg

### figure-eight (Sekizli — durdurucu) — `frame-1.jpg`
- Yazar: **„Der Barbar"** · Lisans: **CC BY-SA 4.0**
- Kaynak: `File:Barb. Endacht 01.jpg`
  https://commons.wikimedia.org/wiki/File:Barb._Endacht_01.jpg
- Not: Eski „Noeud gibus" (Airatique) fotoğrafları çift ilmekli dekoratif sekizli olduğu için kaldırıldı.

### clove-hitch (Kazık Bağı) — `frame-1.jpg`
- Yazar: **USCG (PTC Developer)** · Lisans: **CC0**
- Kaynak: `File:Clove Hitch - ABoK 11 - USCG.jpg`
  https://commons.wikimedia.org/wiki/File:Clove_Hitch_-_ABoK_11_-_USCG.jpg

### reef-knot (Yassı Düğüm) — `frame-1.jpg`
- Yazar: **USCG PTC Developer** · Lisans: **CC BY-SA 4.0**
- Kaynak: `File:Knot-square-ABoK 1204-USCG.jpg`
  https://commons.wikimedia.org/wiki/File:Knot-square-ABoK_1204-USCG.jpg

### two-half-hitches (İki Yarım Anele) — `frame-1.jpg`
- Yazar: **USCG PTC Developer** · Lisans: **CC BY-SA 4.0**
- Kaynak: `File:Hitch-two half-ABoK 1710-USCG.jpg`
  https://commons.wikimedia.org/wiki/File:Hitch-two_half-ABoK_1710-USCG.jpg

### rolling-hitch (Gronof Bağı) — `frame-1.jpg`
- Yazar: **USCG PTC Developer** · Lisans: **CC BY-SA 4.0**
- Kaynak: `File:Hitch-rolling-ABoK 1681-USCG.jpg`
  https://commons.wikimedia.org/wiki/File:Hitch-rolling-ABoK_1681-USCG.jpg

### cleat-hitch (Koç Boynuzuna Volta) — `frame-1.jpg`
- Yazar: **Markus Bärlocher** · Lisans: **Public Domain**
- Kaynak: `File:Belegen auf der Klampe.jpg`
  https://commons.wikimedia.org/wiki/File:Belegen_auf_der_Klampe.jpg

### anchor-bend (Demir Bağı) — `frame-1.jpg`
- Yazar: **Chris 73** · Lisans: **CC BY-SA 3.0**
- Kaynak: `File:AnchorBend FinalKnot.jpg`
  https://commons.wikimedia.org/wiki/File:AnchorBend_FinalKnot.jpg

### sheet-bend (Kıstırma) — `frame-1..4.jpg`
- Yazar: **„Der Barbar"** · Lisans: **CC BY-SA 4.0**
- Kaynak: `File:Barb. Schotstek 01/03/05/07.jpg`
  https://commons.wikimedia.org/wiki/File:Barb._Schotstek_01.jpg

### double-sheet-bend (Çifte Kıstırma) — `frame-1.jpg`
- Yazar: **USCG PTC Developer** · Lisans: **CC0**
- Kaynak: `File:Double Sheet Bend - ABoK 1434 - USCG.jpg`
  https://commons.wikimedia.org/wiki/File:Double_Sheet_Bend_-_ABoK_1434_-_USCG.jpg

### carrick-bend (Kropi Bağı) — `frame-1.jpg`
- Yazar: **USCG PTC Developer** · Lisans: **CC BY-SA 4.0**
- Kaynak: `File:Carrick Bend - ABoK 1439 - USCG.jpg`
  https://commons.wikimedia.org/wiki/File:Carrick_Bend_-_ABoK_1439_-_USCG.jpg

### round-turn-two-half-hitches (Camadan Voltası) — `frame-1..3.jpg`
- Yazar: **„Der Barbar"** · Lisans: **CC BY 4.0**
- Kaynak: `File:Barb01/02/03.Round turn and 2 Half Hitches.jpg`
  https://commons.wikimedia.org/wiki/File:Barb01.Round_turn_and_2_Half_Hitches.jpg
