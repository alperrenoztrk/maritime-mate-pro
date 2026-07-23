/**
 * Native (Capacitor) Google/Apple girişinin web köprüsü — erken yakalama.
 *
 * Android/iOS uygulamasında OAuth sistem tarayıcısında tamamlanır. Dönüş
 * adresi olarak özel şema (`com.marinersbook.app://auth/callback`) yerine
 * her zaman izin listesinde olan kendi web origin'imizdeki
 * `https://www.nauticalleap.com/auth/callback?flow=native` kullanılır:
 * özel şema Supabase "Redirect URLs" listesinden düşerse (örn. özel alan
 * adına geçişte liste yenilendiğinde) Supabase token'ları sessizce Site
 * URL'e gönderir ve uygulama oturumu hiç alamaz. Köprü sayfası
 * (AuthCallback, `flow=native` dalı) fragment'taki token'ları deep link ile
 * uygulamaya aktarır.
 *
 * Bu modül main.tsx'te Supabase istemcisi oluşturulmadan ÖNCE import edilir
 * çünkü supabase-js (detectSessionInUrl) aynı fragment'ı görürse tarayıcıda
 * da bir web oturumu kurar ve URL'i temizler. Refresh token tek kullanımlık
 * olduğundan uygulama ile tarayıcının aynı token ailesini paylaşması,
 * ileride "refresh token reuse" tespitiyle her iki oturumun birden
 * düşmesine yol açar. Burada fragment saklanır ve URL'den silinir; web
 * tarafında oturum kurulmaz.
 */

export const NATIVE_APP_DEEP_LINK = "com.marinersbook.app://auth/callback";

// Üretim web origin'i (Supabase Site URL ile aynı). Native WebView'de
// window.location.origin "https://localhost" olduğundan sabit yazılır.
export const NATIVE_BRIDGE_URL =
  "https://www.nauticalleap.com/auth/callback?flow=native";

export interface NativeBridgeCapture {
  /** URL /auth/callback?flow=native ile mi açıldı? */
  active: boolean;
  /** Ham fragment: access_token=…&refresh_token=… veya error=… */
  hash: string | null;
  /** PKCE dönüşü (?code=…) — mevcut implicit akışta beklenmez ama desteklenir. */
  code: string | null;
  /** Sağlayıcı/Supabase hata mesajı (fragment veya query'den). */
  errorDescription: string | null;
}

function capture(): NativeBridgeCapture {
  const empty: NativeBridgeCapture = {
    active: false,
    hash: null,
    code: null,
    errorDescription: null,
  };
  if (typeof window === "undefined") return empty;
  try {
    if (window.location.pathname !== "/auth/callback") return empty;
    const query = new URLSearchParams(window.location.search);
    if (query.get("flow") !== "native") return empty;

    const rawHash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;
    const hashParams = new URLSearchParams(rawHash);

    const result: NativeBridgeCapture = {
      active: true,
      hash: rawHash || null,
      code: query.get("code"),
      errorDescription:
        hashParams.get("error_description") ?? query.get("error_description"),
    };

    if (result.hash) {
      // supabase-js'in fragment'ı tüketip web oturumu kurmasını engelle;
      // token'lar yalnızca native uygulamaya aktarılacak.
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search,
      );
    }
    return result;
  } catch {
    return empty;
  }
}

/** Modül yüklenirken (Supabase istemcisinden önce) alınan tek seferlik kayıt. */
export const nativeBridgeCapture = capture();
