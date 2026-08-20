/**
 * İki adımlı doğrulama (TOTP).
 *
 * Şifre + e-posta erişimi olan birinin hesaba girmesini engelleyen tek katman
 * budur: giriş sırasında kullanıcının kimlik doğrulayıcı uygulamasındaki
 * 6 haneli kod da istenir.
 *
 * Supabase bunu AAL (Authenticator Assurance Level) ile modeller:
 *  - `aal1`: yalnızca şifre/OAuth ile açılmış oturum.
 *  - `aal2`: ayrıca TOTP kodu doğrulanmış oturum.
 *
 * Doğrulanmış bir faktörü olan kullanıcı giriş yaptığında oturum `aal1`
 * seviyesinde başlar ve `nextLevel` `aal2` olur — uygulama o noktada kod
 * ister (bkz. src/components/auth/MfaChallengeForm.tsx ve RequireAuth.tsx).
 *
 * ÖNEMLİ: İstemcideki bu kapı tek başına güvenlik değildir; çalınmış bir
 * `aal1` jetonu REST API'ye doğrudan konuşabilir. Asıl zorlama veritabanında,
 * `20260807150000_require_aal2_for_mfa_users.sql` migration'ındaki
 * RESTRICTIVE RLS politikalarındadır: faktör kaydetmiş bir kullanıcının
 * satırları yalnızca `aal2` jetonuyla okunabilir/yazılabilir.
 */

import { supabase } from "@/integrations/supabase/safeClient";
import type { AuthenticatorAssuranceLevels, Session } from "@supabase/supabase-js";

export interface TotpFactor {
  id: string;
  friendlyName?: string;
  createdAt: string;
}

export interface EnrollmentStart {
  factorId: string;
  /** Kimlik doğrulayıcıya okutulacak QR (Supabase SVG data-URI döner). */
  qrCode: string;
  /** QR okutulamıyorsa elle girilecek gizli anahtar. */
  secret: string;
}

export type MfaStatus = {
  currentLevel: AuthenticatorAssuranceLevels | null;
  nextLevel: AuthenticatorAssuranceLevels | null;
  /** Kullanıcının doğrulanmış bir faktörü var ama oturum henüz aal1. */
  challengeRequired: boolean;
  /** Hesapta en az bir doğrulanmış TOTP faktörü kayıtlı. */
  enrolled: boolean;
};

/**
 * Hesaptaki doğrulanmış TOTP faktörleri.
 *
 * `listFactors()` dönüşünde `totp` alanı zaten yalnızca `verified` faktörleri
 * içerir (doğrulanmamışlar sadece `all` içinde görünür), bu yüzden ayrıca
 * süzmeye gerek yok.
 */
export const listVerifiedFactors = async (): Promise<TotpFactor[]> => {
  const { data, error } = await supabase.auth.mfa.listFactors();
  if (error || !data) return [];
  return (data.totp ?? []).map((f) => ({
    id: f.id,
    friendlyName: f.friendly_name ?? undefined,
    createdAt: f.created_at,
  }));
};

const NO_MFA: MfaStatus = {
  currentLevel: null,
  nextLevel: null,
  challengeRequired: false,
  enrolled: false,
};

/** JWT gövdesindeki `aal` iddiası. İmza doğrulanmaz — karar sunucuda RLS ile verilir. */
const readAalClaim = (accessToken: string): AuthenticatorAssuranceLevels | null => {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const aal = (JSON.parse(json) as { aal?: unknown }).aal;
    return aal === "aal1" || aal === "aal2" ? aal : null;
  } catch {
    return null;
  }
};

/**
 * Oturumun MFA durumunu **senkron** olarak çıkarır.
 *
 * Supabase'in `getAuthenticatorAssuranceLevel()` metodu da tam olarak bunu
 * yapar (JWT'deki `aal` + `session.user.factors`) ama Promise döndüğü için
 * girişten hemen sonra bir kare boyunca "MFA gerekmiyor" görünür — bu aralıkta
 * yönlendirme tetiklenip kod ekranı atlanırdı. Değer oturum nesnesinden
 * doğrudan türetilince o yarış ortadan kalkar.
 */
export const deriveMfaStatus = (session: Session | null): MfaStatus => {
  if (!session) return NO_MFA;
  const currentLevel = readAalClaim(session.access_token);
  const enrolled = (session.user?.factors ?? []).some((f) => f.status === "verified");
  return {
    currentLevel,
    nextLevel: enrolled ? "aal2" : currentLevel,
    challengeRequired: enrolled && currentLevel === "aal1",
    enrolled,
  };
};

/**
 * Yeni bir TOTP faktörü açar ve QR'ı döner. Faktör, kullanıcı ilk kodu
 * doğrulayana kadar `unverified` durumda kalır.
 *
 * Yarıda bırakılmış kayıtlar hesapta `unverified` faktör olarak birikir ve
 * Supabase'in faktör kotasını doldurur; yenisini açmadan önce temizlenir.
 */
export const startEnrollment = async (
  friendlyName = "Mariner's Book",
): Promise<{ data: EnrollmentStart | null; error: Error | null }> => {
  // Doğrulanmamış faktörler yalnızca `all` içinde görünür — `totp` alanı
  // SDK tarafından `verified` olanlara süzülmüştür.
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const stale = (factors?.all ?? []).filter(
    (f) => f.factor_type === "totp" && f.status === "unverified",
  );
  for (const factor of stale) {
    await supabase.auth.mfa.unenroll({ factorId: factor.id });
  }

  // friendlyName hesapta benzersiz olmak zorunda; aynı ada sahip doğrulanmış
  // bir faktör varsa Supabase hata döner.
  const verified = await listVerifiedFactors();
  const name = verified.some((f) => f.friendlyName === friendlyName)
    ? `${friendlyName} (${verified.length + 1})`
    : friendlyName;

  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName: name,
  });
  if (error || !data) {
    return { data: null, error: (error as Error) ?? new Error("Recording failed to start") };
  }
  return {
    data: { factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret },
    error: null,
  };
};

/**
 * Kayıt sırasında ilk kodu doğrular. Başarılı olursa faktör `verified` olur
 * ve oturum `aal2`ye yükselir.
 */
export const confirmEnrollment = async (
  factorId: string,
  code: string,
): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code: code.trim() });
  return { error: (error as Error) ?? null };
};

/** Girişteki kod adımı. Başarılı olursa oturum `aal2`ye yükselir. */
export const verifyChallenge = async (code: string): Promise<{ error: Error | null }> => {
  const factors = await listVerifiedFactors();
  const factor = factors[0];
  if (!factor) return { error: new Error("No registered validators found") };

  const { error } = await supabase.auth.mfa.challengeAndVerify({
    factorId: factor.id,
    code: code.trim(),
  });
  return { error: (error as Error) ?? null };
};

/**
 * Faktörü kaldırır. Supabase bu işlem için oturumun `aal2` olmasını şart
 * koşar, yani 2FA'yı yalnızca kodu elinde olan kişi kapatabilir.
 */
export const removeFactor = async (factorId: string): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.mfa.unenroll({ factorId });
  return { error: (error as Error) ?? null };
};
