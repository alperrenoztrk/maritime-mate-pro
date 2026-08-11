# Donma sorunu: teşhis + kalıcı koruma

Yayındaki sitede, İngilizce dilde, birkaç tuştan sonra ekranın tamamen kilitlenmesi.

## Şu ana kadar doğrulananlar

Önizlemede 25 ardışık gezinme ile donma yeniden üretilemedi (ana iş parçacığı gecikmesi hep ~50 ms, DOM/heap büyümesi yok, sonsuz döngü yok). Buna karşılık gezinmelerin bazılarında (`/communication/flags`) tam ekran çeviri perdesi (`RouteTranslationGate`) navigasyondan ~1 sn sonra hâlâ ekrandaydı. Bu perde `position: fixed; inset: 0; z-index: 9999` ve opak bir katman: açık kaldığı sürece uygulama **normal görünür ama hiçbir dokunuşa tepki vermez** — kullanıcının tarif ettiği tabloyla birebir örtüşüyor.

Yani en olası neden "JavaScript sonsuz döngüsü" değil, **çeviri perdesinin/görünürlük kilidinin bazı yol değişimlerinde açık kalması**. Bu henüz kesin kanıtlanmadı; planın ilk adımı bunu kanıtlamak.

## Yapılacaklar

### 1. Kanıt toplama (önce bu)
- Çeviri perdesinin açılıp kapanışını, hangi rota token'ı için ne kadar süre açık kaldığını konsola işleyen hafif bir iz kaydı ekle.
- `PageTransition` içindeki "çeviri bitene kadar gizle" durumunun ne kadar sürdüğünü aynı şekilde kaydet.
- Ana iş parçacığı gerçekten kilitlenirse yakalayacak bir nabız (heartbeat) ölçer ekle: 1 sn'lik zamanlayıcı 5 sn'den geç çalışırsa konsola uyarı düşsün. Böylece "perde kilidi mi, gerçek donma mı" ayrımı bir sonraki raporda net görülür.

### 2. Perdenin asla kilitleyememesi
- Perde için mutlak bir üst süre uygula: süre dolduğunda rota değişse bile perde kaldırılsın (bugün serbest bırakma tek bir token'a bağlı; arka arkaya hızlı gezinmede yeni token için sayaç sıfırlanıyor).
- Perde çıkış animasyonu takılırsa ekranda kalmaması için çıkış sırasında dokunuşları geçiren hâle getir.
- Emniyet supabı: perde 3 sn'den uzun açık kalırsa çeviriyi beklemeden içeriği göster (kaynak dilde bir an görünmesi, kilitli ekrana yeğdir).
- Aynı mantığı `PageTransition`'daki `invisible` sınıfı için de uygula ki sayfa görünmez kalmasın.

### 3. Gezinme sırasında oluşan hataların ekranı kilitlememesi
- Rota içi hatalarda `ErrorBoundary` devreye girerken perdenin/görünürlük kilidinin sıfırlanmasını garanti et.
- Bir rota çevirisi hata verdiğinde o rotayı "hazır" işaretle; hata yüzünden sonsuza kadar bekleyen bir rota kalmasın.

### 4. Doğrulama
- Önizlemede 30+ hızlı gezinme, dil İngilizce; her adımda perde durumu, gecikme ve DOM sayısı ölçülüp raporlanır.
- Yayına alındıktan sonra, donma tekrar olursa konsol izleri hangi katmanın kilitlediğini doğrudan gösterecek.

## Teknik notlar

Dokunulacak dosyalar: `src/components/RouteTranslationGate.tsx`, `src/components/PageTransition.tsx`, `src/utils/routeTranslation.ts` (süre bütçeleri), `src/contexts/LanguageContext.tsx` (hata durumunda rotayı hazır işaretleme), `src/components/ErrorBoundary.tsx` (kilit sıfırlama), `src/main.tsx` (heartbeat).

İş mantığı, çeviri kalitesi ve içerik değişmiyor; yalnızca yükleme/perde yaşam döngüsü sağlamlaştırılıyor.
