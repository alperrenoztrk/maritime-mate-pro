/**
 * Yasal doküman adresleri.
 *
 * Aynı adresler iki yerde geçiyor: giriş ekranı (hesap açmadan önce okunabilsin
 * diye) ve Ayarlar. Google Play hem mağaza kaydında hem uygulama içinde bu
 * bağlantıları arıyor; abonelik içeren uygulamalarda gizlilik politikasının
 * yanında kullanım şartları da beklenir. Bu yüzden adresler tek bir yerden
 * yönetilir.
 *
 * Sayfaların kaynağı repoda: public/privacy-policy.html, public/terms-of-use.html
 */
export const PRIVACY_POLICY_URL = "https://nauticalleap.com/privacy-policy.html";

/**
 * Play Console → Data safety → Data deletion alanına girilecek adres.
 *
 * Politikanın tamamı yerine doğrudan "Hesap ve Veri Silme" bölümüne iner;
 * inceleyen kişinin silme yönteminde sayfayı taraması gerekmez. Anchor,
 * privacy-policy.html'deki `id="hesap-ve-veri-silme"` başlığına bağlıdır —
 * başlık id'si değişirse burası da güncellenmeli.
 */
export const DATA_DELETION_URL = `${PRIVACY_POLICY_URL}#hesap-ve-veri-silme`;

/**
 * Kullanım şartları. Abonelik koşulları (otomatik yenileme, iptal, iade),
 * ömür boyu paketin kapsamı, yapay zekâ kotası ve çıktılarının bağlayıcı
 * olmadığı, içeriğin eğitim amaçlı olduğu ve seyir emniyeti kararlarında
 * resmi kaynakların esas alınacağı buradadır.
 */
export const TERMS_OF_USE_URL = "https://nauticalleap.com/terms-of-use.html";
