# Hub menüsünden geri tuşunda çıkış sorununu çöz

## Sorun

Ekran görüntüsündeki menüden (`/hub/machine` — Makine hub'ı) geri tuşuna **tek basışta** uygulamadan atılıyor. Beklenen davranış: ana sayfaya dönmek.

## Kök neden

Bir önceki turda `useNavigationHierarchy.ts`'deki sentinel `pushState` çağrısı performans için `queueMicrotask` ile ertelendi. Bu bir **yarış koşulu** yarattı:

1. React route'u commit ediyor (ör. `/hub/machine`).
2. Sentinel push microtask'a kuyruklanıyor — henüz çalışmadı.
3. Kullanıcı bu arada tarayıcının/Android'in geri tuşuna basıyor.
4. `popstate` ateşliyor ama history'de bizim sentinel marker'ımız yok.
5. Tarayıcı bizim popstate handler'ımızı çağırırken aynı anda **bir önceki gerçek sayfaya** düşüyor — yani hub'a gelmeden önceki Lovable preview/uygulama dışı sayfaya gidiyor → uygulamadan atılma efekti.

Bu bug yalnızca microtask gecikmesi sırasında geri tuşuna basıldığında tetiklendiği için "bazen oluyor, bazen olmuyor" şeklinde gözüküyor.

## Çözüm

`useNavigationHierarchy.ts` içinde sentinel `pushState`'i **senkron** hâle çevir (microtask kuyruğuna alma). Maliyet: route başına bir adet `pushState` çağrısı — pratikte ölçülemeyecek kadar küçük. Kazanç: yarış koşulu tamamen ortadan kalkıyor, geri tuşu **her zaman** mantıksal hiyerarşiye uyuyor.

Hiyerarşi zaten doğru:
- `/hub/machine` → `/calculations` → `/` → çıkış onay diyaloğu

Yani sentinel yarışı düzelince kullanıcı `/hub/machine`'den geri basınca önce `/calculations`'a, ikinci basışta `/`'a, üçüncüde "çıkmak istiyor musunuz?" diyaloğuna ulaşacak — uygulamadan asla **istemeden** atılmayacak.

## Yapılacak değişiklik

**`src/hooks/useNavigationHierarchy.ts`** — sentinel push effect'inde `queueMicrotask(...)` sarmasını kaldır, `pushState` çağrısını doğrudan senkron yap. Cancellation flag'i ve geri-dönüş cleanup'ı da artık gerekmiyor.

## Etki

- Hiçbir görsel değişiklik yok.
- Diğer optimizasyonlar (tek-listener pattern, ref-based handler, parent path cache, useMemo return) aynen korunuyor.
- Geri tuşu "atıyor" bug'ı bitiyor.
