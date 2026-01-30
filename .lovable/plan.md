
# Haber Görsellerinin Kalitesini Artırma Planı

## Mevcut Durum
Şu anda Weserv.nl görsel proxy'si `w=1600&h=900&fit=cover` parametreleriyle kullanılıyor. Bu temel seviye kalite sağlıyor ancak daha fazla optimizasyon mümkün.

## Yapılacak Değişiklikler

### 1. Weserv Proxy Parametrelerini Güncelleme
`toProxyImageUrl` fonksiyonuna ek kalite parametreleri eklenecek:

| Parametre | Değer | Açıklama |
|-----------|-------|----------|
| `q` | 85 | Görsel kalitesi (JPEG için) |
| `we` | - | WebP formatına çevir (daha iyi sıkıştırma) |
| `il` | - | Progressive/interlaced yükleme |
| `sharp` | 1 | Hafif keskinleştirme |
| `dpr` | 2 | Retina ekranlar için 2x çözünürlük |

### 2. İlk Görseller İçin Eager Loading
İlk 3-4 görsel için `loading="eager"` kullanılacak. Bu sayede sayfa açılır açılmaz ana görseller hızlıca yüklenecek.

### 3. Srcset ile Responsive Görüntü Desteği
Farklı ekran boyutları için birden fazla çözünürlük sunulacak:
- Mobil: 640px genişlik
- Tablet: 1024px genişlik  
- Masaüstü: 1600px genişlik

### 4. Görsel Önbellek Kontrolü
Tarayıcı önbelleklemesini desteklemek için `decoding="async"` ve `fetchpriority` özellikleri eklenecek.

## Dosya Değişiklikleri

| Dosya | Değişiklik |
|-------|------------|
| `src/pages/MaritimeNews.tsx` | `toProxyImageUrl` fonksiyonu güncellenecek, srcset desteği ve eager loading eklenecek |

## Teknik Detaylar

### Güncellenecek toProxyImageUrl Fonksiyonu
```typescript
function toProxyImageUrl(url?: string, size: 'small' | 'medium' | 'large' = 'large'): string | undefined {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return undefined;

  const sizeConfig = {
    small: { w: 640, h: 360 },
    medium: { w: 1024, h: 576 },
    large: { w: 1600, h: 900 },
  };

  const { w, h } = sizeConfig[size];

  try {
    const parsed = new URL(normalized);
    const sanitized = `${parsed.hostname}${parsed.pathname}${parsed.search}${parsed.hash}`.replace(/^[\/]+/, "");
    if (!sanitized) return undefined;

    // Yüksek kalite parametreleri:
    // q=85: Kalite seviyesi
    // we: WebP formatı (daha küçük dosya, aynı kalite)
    // il: Progressive yükleme
    // dpr=2: Retina ekran desteği
    return `https://images.weserv.nl/?url=${encodeURIComponent(sanitized)}&w=${w}&h=${h}&fit=cover&q=85&we&il&dpr=2`;
  } catch {
    return undefined;
  }
}
```

### Srcset ile Responsive Görsel
```tsx
<img
  src={displayImageUrl}
  srcSet={`${smallImageUrl} 640w, ${mediumImageUrl} 1024w, ${largeImageUrl} 1600w`}
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1600px"
  loading={index < 3 ? "eager" : "lazy"}
  decoding="async"
  fetchPriority={index < 3 ? "high" : "auto"}
  // ...
/>
```

## Beklenen Sonuçlar
- Retina ekranlarda 2x daha keskin görseller
- WebP formatı ile daha hızlı yükleme
- Progressive yükleme ile daha iyi kullanıcı deneyimi
- İlk görsellerin anında görünmesi
