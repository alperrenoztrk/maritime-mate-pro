import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Mail, Lock, ShieldCheck, FileText, ExternalLink, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuthContext";
import { sanitizeReturnPath } from "@/lib/authFlow";
import { MfaChallengeForm } from "@/components/auth/MfaChallengeForm";
import { supabase } from "@/integrations/supabase/safeClient";
import { getPrivacyPolicyUrl, getTermsOfUseUrl } from "@/config/legal";
import { useLanguage } from "@/contexts/useLanguage";

const credentialsSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(72),
});


const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading, mfaChallengeRequired, signOut, signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithMagicLink } =
    useAuth();
  const { currentLanguage } = useLanguage();
  const privacyPolicyUrl = getPrivacyPolicyUrl(currentLanguage);
  const termsOfUseUrl = getTermsOfUseUrl(currentLanguage);
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [magicCooldown, setMagicCooldown] = useState(0);

  // Tekrar gönderme sayacı: sunucu tarafı hız sınırına takılmayı önler.
  useEffect(() => {
    if (magicCooldown <= 0) return;
    const timer = window.setTimeout(() => setMagicCooldown((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [magicCooldown]);

  const nextPath = useMemo(() => sanitizeReturnPath(searchParams.get("next")), [searchParams]);

  // 2FA açık bir hesapta şifre doğru olsa bile oturum `aal1`dir; kod adımı
  // bitmeden yönlendirme yapılmaz, kart içinde kod ekranı gösterilir.
  useEffect(() => {
    if (!loading && user && !mfaChallengeRequired) navigate(nextPath, { replace: true });
  }, [user, loading, mfaChallengeRequired, navigate, nextPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credentialsSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      if (tab === "signin") {
        const { error } = await signInWithEmail(parsed.data.email, parsed.data.password);
        if (error) {
          const msg = error.message.includes("Invalid login")
            ? "Email or password is incorrect. If you created this account with Google, enter it with \"Continue with Google\" or set a password below."
            : error.message;
          toast.error(msg);
        } else {
          // Yönlendirmeyi yukarıdaki effect yapar: 2FA açıksa önce kod adımı
          // gösterilmeli, doğrudan navigate çağırmak o adımı atlardı.
          toast.success("Login successful");
        }
      } else {
        const { error } = await signUpWithEmail(parsed.data.email, parsed.data.password, nextPath);
        if (error) {
          if (error.message.includes("already registered") || error.message.includes("User already")) {
            toast.error("This email is already registered. Log in with Google or set a password with \"I forgot my password\".");
            setTab("signin");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Registration successful! Check your email.");
        }
      }
    } finally {
      setBusy(false);
    }
  };

  // Google ile açılmış hesapların şifresi yoktur; bu akış onlara şifre
  // belirleme imkânı verir ve klasik şifre sıfırlama olarak da çalışır.
  const handleResetPassword = async () => {
    const parsedEmail = credentialsSchema.shape.email.safeParse(email);
    if (!parsedEmail.success) {
      toast.error("First enter a valid email");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(parsedEmail.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast.error(error.message || "Password setting email could not be sent");
      } else {
        toast.success("The password setting link has been sent to your e-mail.");
      }
    } finally {
      setBusy(false);
    }
  };

  // Şifresiz giriş: sadece e-posta yeterli. Şifresi olmayan (Google ile açılmış)
  // hesaplar da bu yolla girebilir.
  const handleMagicLink = async () => {
    const parsedEmail = credentialsSchema.shape.email.safeParse(email);
    if (!parsedEmail.success) {
      toast.error("First enter a valid email");
      return;
    }
    setBusy(true);
    try {
      const { error } = await signInWithMagicLink(parsedEmail.data, nextPath);
      if (error) {
        const rate = /rate limit|too many|429/i.test(error.message);
        toast.error(
          rate
            ? "Too many requests have been sent. Please try again in a few minutes."
            : error.message || "Login link could not be sent",
        );
        return;
      }
      setMagicSent(true);
      setMagicCooldown(60);
      toast.success("The login link has been sent to your email.");
    } finally {
      setBusy(false);
    }
  };


  // Supabase owns the Google round trip: it builds the authorize URL against
  // its own /auth/v1/callback, so the only redirect URI Google ever sees is
  // the one registered for the Supabase project. The browser comes back to
  // /auth/callback, where AuthCallback turns the payload into a session.
  const handleGoogle = async () => {
    setBusy(true);
    try {
      const { error } = await signInWithGoogle(nextPath);
      if (error) {
        toast.error(error.message || "Login with Google failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login with Google failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <Card className="w-full max-w-md shadow-2xl border-border/50">
        <CardHeader className="text-center space-y-3">

          <CardTitle className="text-2xl notranslate" translate="no" lang="en">
            Mariner's Book
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mfaChallengeRequired ? (
            <MfaChallengeForm onVerified={() => navigate(nextPath, { replace: true })} onCancel={signOut} />
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={handleGoogle}
                disabled={busy}
              >
                <GoogleIcon />
                Continue with Google
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or by email</span>
                </div>
              </div>
              <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-4">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <EmailPasswordFields
                      email={email}
                      password={password}
                      onEmail={setEmail}
                      onPassword={setPassword}
                    />
                    <Button type="submit" className="w-full" disabled={busy}>
                      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                    </Button>
                  </form>
                  <div className="mt-3 space-y-3">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full gap-2"
                      onClick={handleMagicLink}
                      disabled={busy || magicCooldown > 0}
                    >
                      <Sparkles className="h-4 w-4" />
                      {magicCooldown > 0
                        ? `Send again (${magicCooldown} sn)`
                        : "Send login link without password"}
                    </Button>
                    {magicSent && (
                      <p className="text-xs text-center text-muted-foreground">
                        The login link has been sent to your email. Connect from this device
                        click; The session opens automatically.
                      </p>
                    )}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResetPassword}
                        disabled={busy}
                        className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-50"
                      >
                        I forgot my password / set password
                      </button>
                      <p className="mt-2 text-micro text-muted-foreground">
                        If you created your account with Google, you do not have a password. without password
                        You can use the login link or set a password here.
                      </p>
                    </div>
                  </div>
                </TabsContent>


                <TabsContent value="signup" className="mt-4">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <EmailPasswordFields
                      email={email}
                      password={password}
                      onEmail={setEmail}
                      onPassword={setPassword}
                    />
                    <Button type="submit" className="w-full" disabled={busy}>
                      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Password must be at least 8 characters
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </>
          )}

          {/* Legal texts must stay outside the sign-in wall: users need to read
              how their data is handled and what they agree to before creating an
              account. Same links as in Settings (see src/pages/Settings.tsx). */}
          <div className="border-t border-border/60 pt-4 text-center">
            <p className="text-micro leading-relaxed text-muted-foreground">
              By signing up or signing in you accept the{" "}
              <a
                href={termsOfUseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Terms of Use
              </a>
              {" "}and agree that your data is processed under the{" "}
              <a
                href={privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Privacy Policy
              </a>{" "}
              . You can permanently delete your account and all of your data at
              any time from Settings → Delete my account.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <a
                href={privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Privacy Policy
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
              <a
                href={termsOfUseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <FileText className="h-3.5 w-3.5" />
                Terms of Use
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EmailPasswordFields = ({
  email,
  password,
  onEmail,
  onPassword,
}: {
  email: string;
  password: string;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
}) => (
  <>
    <div className="space-y-1.5">
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id="email"
          type="email"
          autoComplete="email"
          className="pl-9"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          required
        />
      </div>
    </div>
    <div className="space-y-1.5">
      <Label htmlFor="password">password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          className="pl-9"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          required
        />
      </div>
    </div>
  </>
);

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.6 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 34.9 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.5 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.4l6.2 5.2C41.9 35.9 44 30.4 44 24c0-1.2-.1-2.4-.4-3.5z"/>
  </svg>
);

export default Auth;
