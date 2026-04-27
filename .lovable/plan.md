## Plan

Uygulama genelinde geri gelme davranışını test ettim ve birkaç kök problem tespit ettim. Bunları tek merkezden düzelteceğim.

### Tespit edilen sorunlar

1. **Bazı geri hedefleri uygulamada tanımlı değil**
   - `useNavigationHierarchy.ts` içinde `/hub/cargo`, `/hub/navigation`, `/hub/machine`, `/hub/meteorology`, `/hub/environment`, `/hub/solas`, `/seamanship-menu`, `/safety-menu`, `/weather-menu` gibi hedefler var.
   - Ancak `App.tsx` içinde bu rotaların çoğu yok. Bu yüzden geri tuşu bazen bilinmeyen rotaya gidip wildcard ile ana sayfaya düşüyor veya beklenmeyen davranıyor.

2. **Hesaplama/Ders menü akışı tutarsız**
   - Örneğin bir hesaplama detayından geri gelince kullanıcı mantıken “Hesaplamalar” merkezine veya ilgili kategori menüsüne dönmeli.
   - Şu an bazı hesaplama sayfalarında parent rota `/hub/...` gibi olmayan bir rota olduğu için geri zinciri kararsızlaşıyor.

3. **Browser/PWA sentinel yaklaşımı gerçek geçmişle karışıyor**
   - Testte, detay sayfasındayken browser geri davranışının her zaman mantıksal parent’a dönmediğini gördüm.
   - Mevcut sentinel yaklaşımı history stack’i yakalamaya çalışıyor ama route değişimleri ve replace/push karışınca bazı durumlarda beklenen geri zinciri bozuluyor.

4. **Eksik rota eşleşmeleri var**
   - `/beta/work-hours`, `/cargo/formulas`, `/economics`, `/empty-page`, bazı top-level ve bazı ders/hub sayfaları parent haritasında net değil.
   - Bu eksikler kullanıcı iki kere geri bastığında “uygulamadan çıkma / ana sayfaya atma / beklenmeyen sayfaya dönme” hissi oluşturuyor.

### Yapılacak düzeltme

1. **Tek ve güvenilir parent route haritası oluşturacağım**
   - `src/hooks/useNavigationHierarchy.ts` içindeki `navigationRules` tüm mevcut `App.tsx` rotalarıyla uyumlu hale getirilecek.
   - Tanımsız hedefler kaldırılacak veya gerçek rotalara bağlanacak:
     - `/hub/cargo` → `/calculations` veya ilgili gerçek kargo sayfası
     - `/hub/navigation` → `/calculations`
     - `/hub/machine` → `/calculations` veya `/lessons` bağlamına göre gerçek üst sayfa
     - `/seamanship-menu`, `/safety-menu`, `/weather-menu` → gerçek mevcut rotalar
   - Kullanıcı açısından hedef: her geri basışı bir üst mantıksal menüye götürsün, tanımsız sayfaya düşmesin.

2. **Geri akışını netleştireceğim**
   Genel hedef akış:
   ```text
   Detay / alt araç sayfası
     → ilgili kategori / modül sayfası
     → Hesaplamalar veya Dersler ana sekmesi
     → Ana sayfa
     → yalnızca burada çıkış onayı
   ```

   Örnekler:
   ```text
   /cargo/calculations/draft-survey → /cargo/calculations → /calculations → /
   /navigation/calc/tides        → /navigation       → /calculations → /
   /machine/diesel-engines/topics/x → /machine/diesel-engines/topics → /lessons → /
   /stability/formulas/id        → /stability/formulas → /stability → /calculations veya /lessons bağlamı yerine güvenli üst menü
   ```

3. **Web/PWA geri yakalamayı daha deterministik yapacağım**
   - Sentinel state’i sadece “var mı yok mu” kontrolüyle değil, route’a bağlı marker ile yöneteceğim.
   - Popstate geldiğinde önce sentinel tekrar kurulacak, sonra `handleBack()` mantıksal parent’a `replace` ile yönlendirecek.
   - Aynı route için gereksiz `pushState` tekrarlarını önleyeceğim.
   - Top-level sayfalarda uygulama doğrudan kapanmayacak; sadece çıkış onayı açılacak.

4. **Android donanım geri tuşu için aynı mantığı koruyacağım**
   - `useAndroidFeatures.ts` içine ikinci back listener eklenmeyecek.
   - `useNavigationHierarchy` tek sahip kalacak.
   - Android’de her geri basışı aynı parent haritasını kullanacak.

5. **Sayfa içi geri butonları ile sistem geri tuşunu eşitleyeceğim**
   - Mevcut `BackButton` zaten `replace` kullanıyor; bunu koruyacağım.
   - Gerekirse bazı sayfalardaki `BackButton to` değerlerini parent haritasıyla uyumlu hale getireceğim.

6. **Test edeceğim**
   Mobil viewportta şu akışları kontrol edeceğim:
   - `/calculations → /cargo/calculations/draft-survey → back`
   - `/calculations → /navigation → /navigation/calc/... → back`
   - `/lessons → machine topic → topic detail → back`
   - `/ship-systems/:id → back`
   - `/crew/:roleSlug → back`
   - `/ship-operations/:shipType → back`
   - top-level sayfalarda geri basınca çıkış onayı açılıyor mu

### Teknik dosyalar

- Ana değişiklik: `src/hooks/useNavigationHierarchy.ts`
- Gerekirse küçük uyumluluk düzeltmeleri:
  - `src/components/BackButton.tsx`
  - belirli sayfalardaki yanlış `BackButton to` hedefleri
- Otomatik dosyalar olan Supabase client/types ve `.env` dosyalarına dokunulmayacak.

Onaydan sonra bu düzeltmeleri uygulayıp geri navigasyonu yeniden test edeceğim.