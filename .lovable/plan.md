## Değişiklikler

### 1. `src/components/home/AppIconGrid.tsx`
İki yeni icon eklenir:
- **Sözlük** → `/glossary`, `BookA` (veya `Book`) ikonu, mavi-mor degrade (`#0891b2 → #1e3a8a`).
- **Ayarlar** → `/settings`, `Settings` ikonu, nötr gri degrade (`#64748b → #334155`).

Sıralama:
1. Hesaplamalar
2. Dersler
3. Personel
4. Gemi Sistemleri
5. Operasyonlar
6. Sözlük (yeni)
7. Beta
8. Ayarlar (yeni — son)

### 2. `src/pages/Index.tsx`
- Sağ üstteki floating glassmorphism "Settings" butonu ve onunla ilgili `{activePage === "home" && (...)}` bloğu kaldırılır.
- `Settings` ve `useNavigate` importları artık kullanılmıyorsa temizlenir.

Başka hiçbir sayfa veya bileşen değişmez.