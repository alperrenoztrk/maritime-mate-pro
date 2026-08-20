/**
 * Legal document addresses.
 *
 * The same addresses appear in two places: the sign-in screen (so they can be
 * read before an account exists) and Settings. Google Play looks for these
 * links both in the store listing and inside the app; for an app with
 * subscriptions the terms of use are expected next to the privacy policy. They
 * are therefore managed from one place.
 *
 * The pages themselves live in the repo: public/privacy-policy.html,
 * public/terms-of-use.html. Each page carries the English text first and keeps
 * the Turkish text below it as the data controller's own record.
 */
export const PRIVACY_POLICY_URL = "https://nauticalleap.com/privacy-policy.html";

/**
 * The address entered in Play Console → Data safety → Data deletion.
 *
 * It goes straight to the "Account and Data Deletion" section instead of the
 * whole policy, so a reviewer does not have to scan the page for the deletion
 * method. The anchor is tied to `id="account-and-data-deletion"` in
 * privacy-policy.html — if that heading id changes, this must change with it.
 */
export const DATA_DELETION_URL = `${PRIVACY_POLICY_URL}#account-and-data-deletion`;

/**
 * Terms of use. The subscription conditions (auto-renewal, cancellation,
 * refunds), the scope of the lifetime package, the AI quota and the fact that
 * its output is not binding, that the content is for training purposes and that
 * official sources govern navigational safety decisions are all here.
 */
export const TERMS_OF_USE_URL = "https://nauticalleap.com/terms-of-use.html";

/**
 * Address of the section of a legal page that matches the given language.
 *
 * Both documents carry the English text first and the Turkish text below it.
 * The app itself ships no Turkish, so every language lands on the English
 * section — which is the top of the page — and only an explicit Turkish
 * preference reaches the Turkish record further down.
 */
function localizedLegalUrl(baseUrl: string, language: string): string {
  return language === "tr" ? `${baseUrl}#tr` : `${baseUrl}#en`;
}

/** Address of the privacy policy section matching the given language. */
export function getPrivacyPolicyUrl(language: string): string {
  return localizedLegalUrl(PRIVACY_POLICY_URL, language);
}

/** Address of the terms of use section matching the given language. */
export function getTermsOfUseUrl(language: string): string {
  return localizedLegalUrl(TERMS_OF_USE_URL, language);
}
