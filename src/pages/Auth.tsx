import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Anchor, Loader2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

const credentialsSchema = z.object({
  email: z.string().trim().email({ message: "Geçerli bir e-posta girin" }).max(255),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı" }).max(72),
});

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.5-1.7 4.4-5.5 4.4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.9 14.6 3 12 3 6.9 3 2.8 7.1 2.8 12S6.9 21 12 21c6.9 0 9.2-4.9 9.2-7.4 0-.5 0-.9-.1-1.3H12z" />
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithApple } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

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
            ? "E-posta veya şifre hatalı"
            : error.message;
          toast.error(msg);
        } else {
          toast.success("Giriş başarılı");
          navigate("/", { replace: true });
        }
      } else {
        const { error } = await signUpWithEmail(parsed.data.email, parsed.data.password);
        if (error) {
          const msg = error.message.includes("already registered")
            ? "Bu e-posta zaten kayıtlı"
            : error.message;
          toast.error(msg);
        } else {
          toast.success("Kayıt başarılı! E-postanızı kontrol edin.");
        }
      }
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
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
          <CardTitle className="text-2xl">Marine Expert Pro</CardTitle>
          <CardDescription>Hesabınıza giriş yapın veya yeni bir hesap oluşturun</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-card px-2 text-xs text-muted-foreground">
              veya e-posta ile
            </span>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Giriş Yap</TabsTrigger>
              <TabsTrigger value="signup">Kayıt Ol</TabsTrigger>
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
          placeholder="ornek@denizci.com"
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
          placeholder="••••••••"
          className="pl-9"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          required
        />
      </div>
    </div>
  </>
);

export default Auth;
