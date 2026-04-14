

# Eski Modül Menü Sayfalarını Kaldırma Planı

## Ne Silinecek

İlk ekran görüntüsündeki büyük kartlı eski menü görünümü (`ModuleSectionsPage` + `CalculationGridScreen` layout'u) kullanılıyor. Zaten `LessonsPage` (ikinci ekran görüntüsü) aynı işlevi kompakt ikon satırlarıyla sağlıyor.

## Yapılacak İşler

### 1. Route'ları kaldır (`src/App.tsx`)
- `/hub` ve `/hub/:categoryId` route'larını sil
- `HubCategoryPage` inline bileşenini sil
- `ModuleSectionsPage` import'unu sil

### 2. Dosyaları sil
- `src/pages/ModuleSectionsPage.tsx` — eski büyük kartlı menü sayfası
- `src/pages/EmissionsMenu.tsx` — sadece `ModuleSectionsPage` çağıran wrapper

### 3. Geri bağlantıları güncelle
- `src/pages/NavigationRules.tsx`: `to="/hub/navigation"` → `to="/lessons"` olarak değiştir
- `src/pages/StabilityFormulas.tsx`: `to="/hub/stability"` → `to="/lessons"` olarak değiştir
- `src/pages/StabilityPractical.tsx`: `to="/hub/stability"` → `to="/lessons"` olarak değiştir

### 4. `CalculationGridScreen` bileşeni korunacak
Bu bileşen hesaplama sayfalarında (`EmissionCalculationsPage`, `TankCalculations`, `StabilityCalculations` vb.) hâlâ aktif olarak kullanılıyor — sadece menü sayfası olarak kullanımı kaldırılacak.

