Geri tuşuna kaç kez basılırsa basılsın uygulamadan çıkışı tamamen kapatacağım. Mevcut kodda ana sayfada ve bazı güvenlik durumlarında çıkış onay penceresi açılıyor; kullanıcı “Evet, Çık” derse native Android’de `exitApp()` çalışıyor. Bunu tamamen kaldıracağız.

Plan:

1. `src/hooks/useNavigationHierarchy.ts` dosyasını güncelleyeceğim
   - Android donanım geri tuşu yine tek yerden yakalanacak.
   - Geri tuşu artık hiçbir koşulda `CapacitorApp.exitApp()` çağırmayacak.
   - Ana sayfadayken (`/`) geri tuşuna basılırsa uygulama aynı sayfada kalacak; çıkış penceresi açılmayacak.
   - Üst seviye sayfalarda geri tuşu ana sayfaya dönecek.
   - Tanımsız/koruyucu durumlarda da çıkış yerine güvenli şekilde ana sayfaya yönlendirecek ya da bulunduğu yerde kalacak.

2. `src/App.tsx` içindeki çıkış penceresini kaldıracağım
   - “Uygulamadan Çık” dialog’u ve “Evet, Çık” butonu kaldırılacak.
   - Hook artık dialog state’i döndürmeyeceği için App tarafı sadeleşecek.

3. Web/PWA tarafında da geri tuşu/geri hareketi uygulamayı terk etmeyecek
   - Mevcut `popstate` sentinel mantığını koruyup güçlendireceğim.
   - Ana sayfadayken tarayıcı geri tuşuna basıldığında dışarı çıkmak yerine aynı sayfada kalması sağlanacak.

4. Kontrol edeceğim
   - Kodda başka `exitApp`, `backButton`, `popstate` veya çıkış penceresi kalmadığını tarayacağım.
   - TypeScript/build kontrolü çalıştıracağım.

Son davranış:

```text
Alt sayfa -> Geri -> Üst menü
Üst menü -> Geri -> Ana sayfa
Ana sayfa -> Geri -> Ana sayfada kal
Tekrar tekrar geri -> Uygulamadan çıkma yok
```

Teknik not:
- Bu değişiklik kullanıcı isteğine uygun olarak Android’in standart “ana sayfada geri = uygulamadan çık” davranışını bilinçli şekilde devre dışı bırakır.
- Uygulamadan çıkmak isteyen kullanıcı cihazın sistem hareketlerini/son uygulamalar ekranını kullanabilir; uygulama içi geri tuşu artık çıkış üretmez.