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

Tüm karelerin `step-N.svg` dosyaları **placeholder**'dır (markalı, "Gerçek görsel eklenecek"
notu içeren basit çizimler). Henüz telifsiz/serbest lisanslı tutarlı bir gerçek halat fotoğraf
seti bulunmadığı için bunlar geçici görsel olarak konmuştur.

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
