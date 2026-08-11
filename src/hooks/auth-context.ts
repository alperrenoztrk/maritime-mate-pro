import { createContext } from "react";
import type { Session, User } from "@supabase/supabase-js";

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /**
   * Kullanıcının doğrulanmış bir TOTP faktörü var ama oturum henüz `aal1`:
   * kod adımı tamamlanana kadar korumalı sayfalar açılmamalı
   * (bkz. src/lib/mfa.ts ve RequireAuth).
   */
  mfaChallengeRequired: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, returnPath?: string) => Promise<{ error: Error | null }>;
  /** Şifresiz giriş: e-postaya tek kullanımlık bağlantı gönderir. */
  signInWithMagicLink: (email: string, returnPath?: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: (returnPath?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
