# KVKK — avukata sorulacaklar (Mariner's Book)

Hazırlanma: 29 Ekim 2026. Uygulama ve gizlilik politikası bu tarihte aşağıdaki
durumdadır. Bu not hukuki görüş değildir; avukatla netleştirilecek konuları
toplar.

## Veri sorumlusu

- Politikada ve kullanım şartlarında: **Alperen Öztürk (Nautical Leap)**.
  Nautical Leap kayıtlı bir şirket değil, marka adı olarak kullanılıyor.
- İletişim: nauticalleapapps@gmail.com. Adres yazılı değil (Google Play geliştirici
  sayfasındaki adres eklenebilir).
- Sorulacak: Adres/KEP adresi eklenmeli mi? VERBİS kaydı gerekiyor mu (belgelerde
  sağlık verisi işlenebiliyor)?

## Yurt dışına aktarım (KVKK m.9, 2024 değişikliği)

Uygulama kullanıcı verisini aşağıdaki sağlayıcılara gönderiyor. Ülke bilgileri
sağlayıcıların genel bilgisidir, teyit edilmeli.

| Sağlayıcı | Giden veri | Muhtemel konum |
|---|---|---|
| Supabase (Lovable Cloud) | Hesap, belge fotoğrafları, quiz sonuçları, satın alma kaydı | Bölge Lovable'dan teyit edilmeli (Türkiye dışı) |
| Lovable AI Gateway → Google Gemini | Yapay zekâ soruları, belge fotoğrafları | AB / ABD |
| Wolfram Alpha | Hesaplama sorguları | ABD |
| Google (giriş, çeviri, Play) | E-posta/ad (giriş), uygulama metni + IP (çeviri), satın alma jetonu | ABD |
| Open-Meteo | Konum koordinatı | İsviçre / AB |
| BigDataCloud | Konum koordinatı | Avustralya |
| ipapi.co | IP adresi | ABD |
| OpenStreetMap, YouTube, Wikimedia, Unsplash, images.weserv.nl | IP adresi | İngiltere, ABD, Hollanda |

Uygulamada yapılanlar:

- Yapay zekâ ve belge yükleme, ilk istekten önce açık rıza ekranı gösteriyor
  (verinin Türkiye dışına gittiği yazıyor). Rıza cihazda ve hesap kaydında
  (`user_metadata.consents`) tarihiyle saklanıyor; Ayarlar → Privacy choices'tan
  geri çekilebiliyor.
- Politika: "Diğer aktarımlar sağlayıcıların sözleşmesel veri koruma
  taahhütleri kapsamında yapılır."

Sorulacak:

1. Supabase (barındırma) gibi sürekli aktarımlar için Kurul'un standart
   sözleşmesi imzalanıp 5 iş günü içinde Kurul'a bildirilmeli mi? Tek kişilik
   geliştirici olarak bunu nasıl yaparım?
2. Yapay zekâ ve belge için alınan açık rıza, m.9'daki "arızi aktarım" için
   yeterli mi, yoksa bunlar da standart sözleşme mi istiyor?
3. Belgelerde sağlık verisi (sağlık yoklama belgesi) için açık rıza metni yeterli
   mi?
4. Konum ve IP tabanlı konum (ipapi.co) için ayrı rıza gerekir mi?

## Telif

- Ders görselleri Wikimedia Commons'tan, lisansları Library → Image credits and
  licences sayfasında (113 görsel; 76'sı CC BY / BY-SA, atıf zorunlu).
- Haberler: uygulama artık yalnız başlık, kısa özet (en çok 320 karakter) ve
  görsel gösteriyor; tam metin yayıncının sitesinde açılıyor.
