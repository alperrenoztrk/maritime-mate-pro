import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Anchor, Loader2, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { sanitizeReturnPath } from "@/lib/authFlow";
import { supabase } from "@/integrations/supabase/safeClient";

const credentialsSchema = z.object({
  email: z.string().trim().email({ message: "Geçerli bir e-posta girin" }).max(255),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı" }).max(72),
});


const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const nextPath = useMemo(() => sanitizeReturnPath(searchParams.get("next")), [searchParams]);

  useEffect(() => {
    if (!loading && user) navigate(nextPath, { replace: true });
  }, [user, loading, navigate, nextPath]);

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
            ? "E-posta veya şifre hatalı. Bu hesabı Google ile oluşturduysanız \"Google ile devam et\" ile girin ya da aşağıdan şifre belirleyin."
            : error.message;
          toast.error(msg);
        } else {
          toast.success("Giriş başarılı");
          navigate(nextPath, { replace: true });
        }
      } else {
        const { error } = await signUpWithEmail(parsed.data.email, parsed.data.password, nextPath);
        if (error) {
          if (error.message.includes("already registered") || error.message.includes("User already")) {
            toast.error("Bu e-posta zaten kayıtlı. Google ile giriş yapın veya \"Şifremi unuttum\" ile şifre belirleyin.");
            setTab("signin");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Kayıt başarılı! E-postanızı kontrol edin.");
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
      toast.error("Önce geçerli bir e-posta girin");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(parsedEmail.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast.error(error.message || "Şifre belirleme e-postası gönderilemedi");
      } else {
        toast.success("Şifre belirleme bağlantısı e-postanıza gönderildi.");
      }
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
        toast.error(error.message || "Google ile giriş başarısız");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google ile giriş başarısız");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <Card className="w-full max-w-md shadow-2xl border-border/50 backdrop-blur">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <Anchor className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl notranslate" translate="no" lang="en">
            Mariner's Book
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(
            <>
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={handleGoogle}
                disabled={busy}
              >
                <GoogleIcon />
                Google ile devam et
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">veya e-posta ile</span>
                </div>
              </div>
            </>
          )}
          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signup">Kayıt Ol</TabsTrigger>
              <TabsTrigger value="signin">Giriş Yap</TabsTrigger>
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
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Giriş Yap"}
                </Button>
              </form>
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
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Kayıt Ol"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Şifre en az 8 karakter olmalıdır
                </p>
              </form>
            </TabsContent>
          </Tabs>
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
      <Label htmlFor="email">E-posta</Label>
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
      <Label htmlFor="password">Şifre</Label>
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
