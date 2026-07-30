import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Anchor, Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/safeClient";

const passwordSchema = z.string().min(8, { message: "Şifre en az 8 karakter olmalı" }).max(72);

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setHasSession(true);
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      setHasSession(!!session);
      setReady(true);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (password !== confirm) {
      toast.error("Şifreler eşleşmiyor");
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message || "Şifre güncellenemedi");
        return;
      }
      toast.success("Şifreniz belirlendi. Artık e-posta ve şifre ile giriş yapabilirsiniz.");
      navigate("/", { replace: true });
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
          <CardTitle className="text-2xl">Şifre Belirle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!ready ? (
            <div className="flex justify-center py-6">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : !hasSession ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                Bu bağlantı geçersiz veya süresi dolmuş. Lütfen giriş sayfasından yeni bir
                şifre belirleme e-postası isteyin.
              </p>
              <Button className="w-full" onClick={() => navigate("/auth", { replace: true })}>
                Giriş sayfasına dön
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="new-password">Yeni şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">Yeni şifre (tekrar)</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    className="pl-9"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Şifreyi Kaydet"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Şifre en az 8 karakter olmalıdır
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
