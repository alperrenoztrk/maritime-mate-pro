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

`<knotId>` değerleri `src/data/knotTyingAnimations.ts` ile birebir aynıdır:

| knotId                          | Bağ                                  |
| ------------------------------- | ------------------------------------ |
| `bowline`                       | İzbarço Bağı                          |
| `figure-eight`                  | Sekizli Düğüm                         |
| `clove-hitch`                   | Kazık Bağı                            |
| `reef-knot`                     | Yassı Düğüm                           |
| `sheet-bend`                    | Kıstırma Düğümü                       |
| `round-turn-two-half-hitches`   | Camadan Voltası                       |

Her bağ için ideal kare sayısı, o bağın adım (`steps`) sayısı kadardır; böylece her kare bir
adımla eşleşir.

## Şu Anki Durum

Tüm bağlar artık **Wikimedia Commons'tan serbest lisanslı gerçek halat görselleri** kullanır
(`frame-N.jpg`). Ayrı adım dizisi olan bağlar (izbarço, sekizli, kıstırma, camadan voltası)
kareler arasında ilerler; tek birleşik görsel kullanılan bağlar (kazık bağı, yassı düğüm)
görseli sabit tutup adım başlıklarını döndürür. Görsel stilleri kaynaklar farklı olduğu için
bağdan bağa değişebilir. Atıf bilgileri `src/data/knotTyingAnimations.ts` içindeki
`media.attribution` alanında ve aşağıdaki CREDITS bölümünde tutulur.

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

### figure-eight (Sekizli) — `frame-1..5.jpg`
- Yazar: **Airatique** · Lisans: **CC BY-SA 3.0**
- Kaynak: `File:Noeud gibus s2 01.JPG` … `Noeud gibus s2 05.JPG`
  https://commons.wikimedia.org/wiki/File:Noeud_gibus_s2_01.JPG

### clove-hitch (Kazık Bağı) — `frame-1.jpg` (birleşik, 3 adımda tekrarlanır)
- Yazar: **USCG (PTC Developer)** · Lisans: **CC0**
- Kaynak: `File:Clove Hitch - ABoK 11 - USCG.jpg`
  https://commons.wikimedia.org/wiki/File:Clove_Hitch_-_ABoK_11_-_USCG.jpg

### reef-knot (Yassı Düğüm) — `frame-1.jpg` (birleşik, 3 adımda tekrarlanır)
- Yazar: **USCG PTC Developer** · Lisans: **CC BY-SA 4.0**
- Kaynak: `File:Knot-square-ABoK 1204-USCG.jpg`
  https://commons.wikimedia.org/wiki/File:Knot-square-ABoK_1204-USCG.jpg

### sheet-bend (Kıstırma) — `frame-1..4.jpg`
- Yazar: **„Der Barbar"** · Lisans: **CC BY-SA 4.0**
- Kaynak: `File:Barb. Schotstek 01/03/05/07.jpg`
  https://commons.wikimedia.org/wiki/File:Barb._Schotstek_01.jpg

### round-turn-two-half-hitches (Camadan Voltası) — `frame-1..3.jpg`
- Yazar: **„Der Barbar"** · Lisans: **CC BY 4.0**
- Kaynak: `File:Barb01/02/03.Round turn and 2 Half Hitches.jpg`
  https://commons.wikimedia.org/wiki/File:Barb01.Round_turn_and_2_Half_Hitches.jpg
