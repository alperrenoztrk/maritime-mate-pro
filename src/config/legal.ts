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
 * The URL to enter in Play Console → Data safety → Data deletion.
 *
 * It lands directly on the "Account and Data Deletion" section instead of the
 * whole policy, so a reviewer does not have to scan the page for the deletion
 * method. The anchor tracks the `id="account-and-data-deletion"` heading in
 * privacy-policy.html — update this if that heading id changes.
 *
 * NOTE: the app ships English-only, so this points at the English section. The
 * matching field in Play Console has to be updated by hand to stay in sync.
 */
export const DATA_DELETION_URL = `${PRIVACY_POLICY_URL}#account-and-data-deletion`;

/**
 * Kullanım şartları. Abonelik koşulları (otomatik yenileme, iptal, iade),
 * ömür boyu paketin kapsamı, yapay zekâ kotası ve çıktılarının bağlayıcı
 * olmadığı, içeriğin eğitim amaçlı olduğu ve seyir emniyeti kararlarında
 * resmi kaynakların esas alınacağı buradadır.
 */
export const TERMS_OF_USE_URL = "https://nauticalleap.com/terms-of-use.html";

/**
 * Builds the address that lands on the readable section of a legal page.
 *
 * Both documents carry more than one language on a single page. The app is
 * English-only, so every link jumps to the English section (`#en`) rather than
 * to the top of the page — no supported interface language has its own
 * translation of these documents, and English is the closest readable match.
 *
 * The `language` parameter is kept so callers can stay language-aware if a
 * translated legal page is published later.
 */
function localizedLegalUrl(baseUrl: string, _language: string): string {
  return `${baseUrl}#en`;
}

/** Address of the privacy policy, on its readable section. */
export function getPrivacyPolicyUrl(language: string): string {
  return localizedLegalUrl(PRIVACY_POLICY_URL, language);
}

/** Address of the terms of use, on its readable section. */
export function getTermsOfUseUrl(language: string): string {
  return localizedLegalUrl(TERMS_OF_USE_URL, language);
}
