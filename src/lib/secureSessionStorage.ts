/**
 * Oturum jetonu için donanım destekli depolama.
 *
 * Supabase oturumu (access + refresh token) varsayılan olarak WebView
 * localStorage'ında düz metin durur. Root'lanmış/jailbreak edilmiş bir
 * cihazda ya da cihaza bulaşmış bir kötü amaçlı yazılım için bu dosya
 * doğrudan okunabilir: `allowBackup=false` yalnızca yedek yolunu kapatır,
 * yerel dosya erişimini değil.
 *
 * Bu modül native kabuklarda jetonu Android Keystore / iOS Keychain
 * arkasına taşır (@aparajita/capacitor-secure-storage → AES/GCM, anahtar
 * `AndroidKeyStore` içinde üretilir ve TEE/StrongBox olan cihazlarda
 * donanımdan hiç çıkmaz; SharedPreferences'ta yalnızca şifreli metin kalır).
 * Web'de karşılığı olmadığı için mevcut `safeLocalStorage` davranışı korunur.
 *
 * Supabase'in `SupportedStorage` sözleşmesi async metotlara izin verir, bu
 * yüzden adaptör doğrudan `auth.storage` olarak verilebilir.
 */

import { Capacitor } from "@capacitor/core";
import { safeLocalStorage } from "@/lib/safeStorage";

export interface AsyncKeyValueStorage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

type SecureStorageApi = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

/** Web/PWA yolu: bugünkü davranış. Şifreleme yok, çökme koruması var. */
const localStorageAdapter: AsyncKeyValueStorage = {
  getItem: async (key) => safeLocalStorage.getItem(key),
  setItem: async (key, value) => safeLocalStorage.setItem(key, value),
  removeItem: async (key) => safeLocalStorage.removeItem(key),
};

/**
 * Bu modül `safeClient` üzerinden neredeyse her şeyin import zincirinde;
 * modül seviyesinde atılan bir istisna React mount olmadan uygulamayı
 * öldürür. `Capacitor` bazı gömülü WebView'larda erişimde patlayabildiği
 * için (bkz. authFlow.ts'teki aynı sarmalayıcı) korumalı okunur.
 */
const isNative = (): boolean => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

/**
 * Eklenti hiç yüklenemediğinde (web, `cap sync` yapılmamış bir kabuk, eski
 * bir kurulum) kalıcı olarak localStorage'a döneriz. Aksi hâlde kullanıcı
 * hiç giriş yapamaz; sessizce kilitlenmektense bugünkü risk seviyesinde
 * çalışmak yeğdir. Bu durum konsola bir kez yazılır.
 */
let degradedToLocalStorage = !isNative();

/**
 * KRİTİK: Capacitor eklenti nesnesi bir Proxy'dir ve üzerindeki HER özellik
 * erişimi native çağrıya çevrilir — `then` dahil. Bu yüzden eklenti nesnesi
 * asla doğrudan bir Promise'ten döndürülmemeli/await edilmemelidir; aksi
 * hâlde Promise çözümlemesi `plugin.then`'i okur ve Android'de
 * "SecureStorage.then() is not implemented" hatasıyla açılış patlar.
 * Çözüm: nesneyi bir sarmalayıcı içinde taşı.
 */
type PluginBox = { storage: SecureStorageApi | null };
let pluginPromise: Promise<PluginBox> | null = null;

const loadPlugin = async (): Promise<PluginBox> => {
  if (degradedToLocalStorage) return { storage: null };
  if (!pluginPromise) {
    pluginPromise = import("@aparajita/capacitor-secure-storage")
      .then((mod): PluginBox => ({
        storage: (mod.SecureStorage as unknown as SecureStorageApi) ?? null,
      }))
      .catch((err: unknown): PluginBox => {
        degrade("eklenti yüklenemedi", err);
        return { storage: null };
      });
  }
  try {
    // Keep the Capacitor Proxy boxed across the async boundary. Returning
    // `box.storage` directly from this async function would make Promise
    // resolution inspect `SecureStorage.then`, which Capacitor turns into a
    // native plugin call and leaves startup hanging on Android.
    return await pluginPromise;
  } catch (err) {
    degrade("eklenti kutusu çözülemedi", err);
    return { storage: null };
  }
};


const degrade = (reason: string, err?: unknown) => {
  if (degradedToLocalStorage) return;
  degradedToLocalStorage = true;
  console.warn(
    `[secureSessionStorage] Güvenli depolama devre dışı (${reason}); ` +
      "oturum jetonu localStorage'a yazılacak.",
    err,
  );
};

/**
 * Eklenti kuruluyken tekil bir işlemin patlaması ayrı bir durumdur:
 * Keystore anahtarı geçersizleşmiş olabilir (cihaz geri yükleme, ekran kilidi
 * değişikliği). Okumada `null` dönmek kullanıcıyı yeniden girişe yollar —
 * doğru davranış. Yazma/silme patlarsa kullanıcı hiç giriş yapamaz hâle
 * geleceği için orada localStorage'a düşeriz; bilinçli bir ödünleşme.
 */
const nativeAdapter: AsyncKeyValueStorage = {
  getItem: async (key) => {
    const { storage: plugin } = await loadPlugin();
    if (!plugin) return localStorageAdapter.getItem(key);

    try {
      const stored = await plugin.getItem(key);
      if (stored !== null) return stored;
    } catch (err) {
      // Keystore anahtarı geçersizleşmiş olabilir (cihaz geri yükleme, ekran
      // kilidi değişikliği). Şifreli kopya okunamıyorsa aşağıdaki göç yoluna
      // düşeriz; orada da bir şey yoksa null döner ve kullanıcı yeniden
      // giriş yapar — sessizce eski oturuma dönmekten iyisi budur.
      console.warn("[secureSessionStorage] Okuma başarısız.", err);
    }

    // Tek seferlik göç: sürüm yükseltmesinde localStorage'da duran oturumu
    // Keystore'a taşı ve düz metin kopyayı sil. Aksi hâlde bütün kullanıcılar
    // bu sürümde bir kez çıkış yapmış olurdu.
    const legacy = safeLocalStorage.getItem(key);
    if (legacy === null) return null;
    try {
      await plugin.setItem(key, legacy);
      safeLocalStorage.removeItem(key);
    } catch (err) {
      console.warn("[secureSessionStorage] Oturum göçü başarısız.", err);
    }
    return legacy;
  },

  setItem: async (key, value) => {
    const { storage: plugin } = await loadPlugin();
    if (!plugin) return localStorageAdapter.setItem(key, value);
    try {
      await plugin.setItem(key, value);
      // Göç yarıda kaldıysa düz metin kopya geride kalmasın.
      safeLocalStorage.removeItem(key);
    } catch (err) {
      degrade("yazma başarısız", err);
      await localStorageAdapter.setItem(key, value);
    }
  },

  removeItem: async (key) => {
    const { storage: plugin } = await loadPlugin();
    // Çıkışta her iki yerden de silinsin: göç öncesi kalıntı kalmasın.
    safeLocalStorage.removeItem(key);
    if (!plugin) return;
    try {
      await plugin.removeItem(key);
    } catch (err) {
      console.warn("[secureSessionStorage] Silme başarısız.", err);
    }
  },
};

/**
 * Supabase istemcisine `auth.storage` olarak verilen adaptör.
 * Native'de Keystore/Keychain, web'de localStorage.
 */
export const sessionStorageAdapter: AsyncKeyValueStorage = isNative()
  ? nativeAdapter
  : localStorageAdapter;
