/**
 * Yasal doküman adresleri.
 *
 * Aynı adres iki yerde geçiyor: giriş ekranı (hesap açmadan önce okunabilsin
 * diye) ve Ayarlar. Google Play hem mağaza kaydında hem uygulama içinde bu
 * bağlantıyı arıyor, ayrıca sayfanın "Hesap ve Veri Silme" bölümü Play
 * Console'daki Data safety → Data deletion alanına girilen URL'dir; bu yüzden
 * adres tek bir yerden yönetilir.
 *
 * Sayfanın kaynağı repoda: public/privacy-policy.html
 */
export const PRIVACY_POLICY_URL = "https://nauticalleap.com/privacy-policy.html";
