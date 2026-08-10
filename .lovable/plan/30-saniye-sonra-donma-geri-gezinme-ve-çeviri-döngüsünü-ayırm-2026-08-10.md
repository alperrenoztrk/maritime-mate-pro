# 30 saniye sonra donma: geri gezinme ve çeviri döngüsünü ayırma

## Doğrulanan durum

- Önceki 3 saniyelik perde koruması sorunu çözmedi; dolayısıyla tam ekran çeviri perdesi tek başına kök neden değil.
- Yeni 36 gezinme testinde ana iş parçacığı çalışmaya devam etti ve DOM sayısı kontrolsüz büyümedi. Buna rağmen bazı geri geçişlerinde aynı anda iki rota çerçevesi, görünmez bir çevrilmekte-olan rota ve çeviri katmanı birlikte kaldı.
- Web geri tuşu şu anda `popstate` içinde hem hiyerarşik yönlendirme yapıyor hem de hemen `history.pushState` çağırıyor (`useNavigationHierarchy.ts`). Bu işlem, React Router yeni rotayı tamamlamadan eski URL ile yeni geçmiş kaydı oluşturabildiği için geri tuşunda yarış durumu üretebilir.
- Çeviri sistemi tüm `document.body` değişikliklerini izliyor, eklenen/değişen alt ağacı geçici olarak gizliyor ve canlı çeviri kuyruğuna ekliyor (`LanguageContext.tsx`). Ayrıca başarısız canlı çeviri için tam **30.000 ms** bekleme penceresi var. Bunun donmanın sebebi olduğu henüz kanıtlanmış değil; yalnızca kullanıcının gözlediği süreyle eşleşiyor.

## Uygulama planı

### 1. Geri tuşunda tek bir geçmiş sahibi
- Web `popstate` akışını yeniden kur: olayın içinde eşzamanlı `navigate` + `pushState` yapma.
- Geri olayını tek sefer işleyen bir yeniden-giriş kilidi ekle; hedef rotayı hesapla, React Router geçişi tamamladıktan sonra gerekiyorsa koruyucu geçmiş kaydını güncelle.
- Native donanım geri tuşunu web geçmişi sentinel mantığından ayır; ikisi aynı anda rota yazamasın.
- Ekrandaki geri tuşu, kenardan kaydırma ve tarayıcı geri tuşunun aynı `goBack` çekirdeğini kullanmasını sağla.

### 2. Çeviri gözlemcisinin etkileşimi kilitlemesini engelle
- Navigasyon başlarken bekleyen MutationObserver kuyruğunu iptal et ve eski rotaya ait gizleme işaretlerini temizle; yeni rota yerleşince gözlemciyi tekrar etkinleştir.
- Tekrarlayan saat/hava durumu/animasyon metinlerini her DOM değişiminde canlı çeviri kuyruğuna sokma; yalnız gerçekten yeni ve çevrilebilir metni işle.
- Her `data-mt-translation-pending` öğesine kısa, mutlak görünürlük süresi koy; ağ isteği, 30 saniyelik devre kesici veya rota iptali hiçbir kapsayıcıyı gizli bırakamaz.
- Eski rota tamamlandığında gelen gecikmiş çeviri sonucunun yeni rotanın durumunu değiştirmesini token/run kimliğiyle engelle.

### 3. Donma kanıtını cihaz üzerinde yakalanabilir yap
- Mevcut heartbeat kaydını küçük bir halka tamponla genişlet: son rota, son geri olayı, geçmiş uzunluğu, aktif rota çerçevesi, çeviri kuyruğu ve görünür engelleyici sayısını tut.
- Gerçek ana iş parçacığı durması ile “uygulama çalışıyor fakat dokunuşu alan görünmez katman var” durumunu ayrı kodlarla kaydet.
- Kayıtları sınırlı boyutta `sessionStorage` içinde tut; kişisel veri, koordinat veya içerik kaydetme.

### 4. Doğrulama
- İngilizce dilde gerçek istemci yönlendirmeleriyle en az 60 saniye boyunca hızlı gezinme yap; tarayıcı geri, uygulama geri ve kenardan kaydırmayı ayrı ayrı en az 20 kez çalıştır.
- Her adımda tek aktif rota çerçevesi, sıfır eski `pending` öğesi, sıfır dokunuş engelleyici ve çalışan heartbeat doğrula.
- Mobil 375×684 ve tablet görünümünde aynı senaryoyu tekrarla; geri tuşunun doğru üst menüye çıktığını ve uygulamadan ayrılmadığını kontrol et.
- Seçili ilgili testleri ekle/çalıştır: art arda `popstate`, geri sırasında devam eden çeviri ve gecikmiş çeviri sonucunun yeni rotaya uygulanmaması.

## Teknik kapsam

Başlıca dosyalar: `src/hooks/useNavigationHierarchy.ts`, `src/hooks/useBackNavigation.ts`, `src/components/EdgeSwipeBack.tsx`, `src/contexts/LanguageContext.tsx`, `src/main.tsx`; gerekiyorsa yalnız test ve küçük bir tanılama yardımcı dosyası.

İçerik, hesaplamalar, görsel tasarım ve çeviri metinleri değişmeyecek.