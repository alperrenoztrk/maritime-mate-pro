import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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


const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithApple, signInWithGoogle } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const nextPath = useMemo(() => {
    const raw = searchParams.get("next");
    if (!raw) return "/";
    if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
    return raw;
  }, [searchParams]);

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
            ? "E-posta veya şifre hatalı"
            : error.message;
          toast.error(msg);
        } else {
          toast.success("Giriş başarılı");
          navigate(nextPath, { replace: true });
        }
      } else {
        const { error } = await signUpWithEmail(parsed.data.email, parsed.data.password, nextPath);
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


  const handleApple = async () => {
    setBusy(true);
    const { error } = await signInWithApple(nextPath);
    if (error) {
      toast.error(error.message);
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await signInWithGoogle(nextPath);
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
          <CardDescription className="text-sm">Giriş yapın veya kayıt olun</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={handleApple}
            disabled={busy}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true" fill="currentColor">
              <path d="M16.365 1.43c0 1.14-.463 2.23-1.223 3.026-.816.855-2.15 1.517-3.245 1.428-.14-1.104.42-2.253 1.14-2.99.81-.83 2.223-1.44 3.328-1.464zM20.5 17.34c-.56 1.29-.83 1.87-1.55 3.01-.99 1.58-2.39 3.55-4.13 3.56-1.54.01-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.74-.01-3.06-1.79-4.05-3.37C.31 16.98-.07 12.55 1.6 10.09c1.19-1.75 3.06-2.78 4.82-2.78 1.79 0 2.92 1 4.4 1 1.44 0 2.32-1 4.39-1 1.57 0 3.23.86 4.42 2.34-3.88 2.13-3.25 7.69.87 8.69z"/>
            </svg>
            Apple ile devam et
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
