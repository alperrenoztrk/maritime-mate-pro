import { Capacitor } from "@capacitor/core";
import { supabase, backendUrl, backendPublishableKey } from "@/integrations/supabase/safeClient";
import { sessionStorageAdapter } from "@/lib/secureSessionStorage";

/**
 * Custom URL scheme the native shells register (AndroidManifest.xml intent
 * filter + Info.plist CFBundleURLTypes). It must also be listed under
 * Authentication → URL Configuration → Redirect URLs in Supabase, otherwise
 * Supabase falls back to the Site URL and the app never regains control.
 */
export const NATIVE_REDIRECT_URL = "com.marinersbook.app://auth/callback";

/** Where to send the user once the OAuth round trip finishes. */
export const RETURN_PATH_KEY = "postAuthReturn";

const PROVIDER_CACHE_KEY = "googleAuthEnabled";

export const sanitizeReturnPath = (raw?: string | null) => {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
};

/**
 * Uygulama içeriği herkese açıktır: arama motorlarından, yer imlerinden veya
 * paylaşılan bağlantılardan gelen ziyaretçi istediği sayfayı doğrudan görür.
 * Yalnızca kişisel veriye dokunan rotalar oturum ister (bkz. RequireAuth).
 */
const PRIVATE_PREFIXES = [
  "/settings",
  "/beta/documents",
];

export const isPublicPath = (pathname: string) => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return !PRIVATE_PREFIXES.some((p) => clean === p || clean.startsWith(`${p}/`));
};


/** Sends the visitor to the login screen while remembering where they meant to go. */
export const buildAuthRedirect = (pathname: string, search = "") =>
  `/auth?next=${encodeURIComponent(`${pathname}${search}`)}`;

export const getOAuthCallbackUrl = () => new URL(window.location.href).toString();

export const isNativePlatform = () => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

export const rememberReturnPath = (nextPath: string) => {
  try {
    sessionStorage.setItem(RETURN_PATH_KEY, sanitizeReturnPath(nextPath));
  } catch {
    // Private mode / storage disabled: fall back to the default return path.
  }
};

export const consumeReturnPath = () => {
  let stored: string | null = null;
  try {
    stored = sessionStorage.getItem(RETURN_PATH_KEY);
    sessionStorage.removeItem(RETURN_PATH_KEY);
  } catch {
    // Storage unavailable: send the user home instead.
  }
  return sanitizeReturnPath(stored);
};

const readCachedProviderState = (): boolean | null => {
  try {
    const raw = sessionStorage.getItem(PROVIDER_CACHE_KEY);
    if (raw === "true") return true;
    if (raw === "false") return false;
  } catch {
    // Storage unavailable: re-query the provider list.
  }
  return null;
};

let providerCheck: Promise<boolean> | null = null;

/**
 * `signInWithOAuth` only works when the Google provider is switched on for the
 * project; otherwise it fails with "Unsupported provider". The public settings
 * endpoint reports which providers are live, so the UI can hide the button
 * instead of offering a login that is guaranteed to fail.
 */
export const isGoogleAuthEnabled = async (): Promise<boolean> => {
  const cached = readCachedProviderState();
  if (cached !== null) return cached;
  if (providerCheck) return providerCheck;

  providerCheck = (async () => {
    try {
      const res = await fetch(`${backendUrl}/auth/v1/settings`, {
        headers: { apikey: backendPublishableKey },
      });
      if (!res.ok) return false;
      const body = await res.json();
      const enabled = Boolean(body?.external?.google);
      try {
        sessionStorage.setItem(PROVIDER_CACHE_KEY, String(enabled));
      } catch {
        // Caching is best effort only.
      }
      return enabled;
    } catch {
      // Offline or blocked: Google login could not work anyway.
      providerCheck = null;
      return false;
    }
  })();

  return providerCheck;
};

const buildRedirectUrl = (nextPath: string) => {
  if (isNativePlatform()) return NATIVE_REDIRECT_URL;
  const url = new URL("/auth/callback", window.location.origin);
  if (nextPath !== "/") url.searchParams.set("next", nextPath);
  return url.toString();
};

/**
 * Şifresiz giriş bağlantısının döneceği adres. Google akışıyla aynı hedefi
 * kullanır: web'de /auth/callback, native kabukta özel URL şeması.
 */
export const buildMagicLinkRedirect = (nextPath = "/") =>
  buildRedirectUrl(sanitizeReturnPath(nextPath));

/**
 * Starts the Google round trip. On the web the browser navigates away; on
 * native the URL is opened in the system browser and the session is completed
 * by the `appUrlOpen` listener in AuthProvider.
 */
export const startGoogleSignIn = async (nextPath = "/"): Promise<{ error: Error | null }> => {
  const safeNext = sanitizeReturnPath(nextPath);
  rememberReturnPath(safeNext);

  const native = isNativePlatform();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: buildRedirectUrl(safeNext),
      skipBrowserRedirect: native,
      queryParams: { prompt: "select_account" },
    },
  });

  if (error) return { error: error as Error };

  if (native) {
    if (!data?.url) return { error: new Error("Google giriş adresi alınamadı.") };
    const { Browser } = await import("@capacitor/browser");
    await Browser.open({ url: data.url, presentationStyle: "popover" });
  }

  return { error: null };
};

/**
 * Turns an OAuth return URL into a session. Handles both flow types: PKCE
 * hands back `?code=`, the implicit flow puts tokens in the fragment.
 * `handled` is false when the URL carries no OAuth payload at all.
 */
export const finishOAuthFromUrl = async (
  rawUrl: string,
): Promise<{ handled: boolean; error: Error | null }> => {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { handled: false, error: null };
  }

  const hash = new URLSearchParams(parsed.hash.replace(/^#/, ""));
  const search = parsed.searchParams;
  const accessToken = search.get("access_token") || hash.get("access_token");
  const refreshToken = search.get("refresh_token") || hash.get("refresh_token");
  const code = search.get("code");
  const failure = search.get("error_description") || hash.get("error_description");

  if (failure) return { handled: true, error: new Error(failure) };

  if (accessToken && refreshToken) {
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    return { handled: true, error: (error as Error) ?? null };
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return { handled: true, error: null };

    // The client's own detectSessionInUrl may have consumed the code first;
    // a live session means the redirect really did succeed.
    const { data } = await supabase.auth.getSession();
    if (data.session) return { handled: true, error: null };
    return { handled: true, error: error as Error };
  }

  return { handled: false, error: null };
};

/**
 * PKCE code verifier'ı Supabase'in yazdığı yerden okur. Native kabukta bu
 * artık Keystore/Keychain olduğu için erişim asenkrondur; adaptör üzerinden
 * gitmek iki platformda da doğru kaynağa bakmayı garanti eder
 * (bkz. src/lib/secureSessionStorage.ts).
 */
export const getStoredCodeVerifier = async (): Promise<string | null> => {
  try {
    const storageKey = `sb-${new URL(backendUrl).hostname.split(".")[0]}-auth-token-code-verifier`;
    return (await sessionStorageAdapter.getItem(storageKey)) || null;
  } catch {
    return null;
  }
};
