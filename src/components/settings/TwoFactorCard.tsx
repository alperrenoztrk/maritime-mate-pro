import { useCallback, useEffect, useState } from "react";
import { KeyRound, Loader2, ShieldCheck, ShieldOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  confirmEnrollment,
  listVerifiedFactors,
  removeFactor,
  startEnrollment,
  type EnrollmentStart,
  type TotpFactor,
} from "@/lib/mfa";

/**
 * Ayarlar → İki adımlı doğrulama.
 *
 * İsteğe bağlıdır: kullanıcı açmazsa giriş bugünkü gibi çalışır. Açtığında
 * hesabı yalnızca şifreyi bilen değil, doğrulayıcı uygulamayı da elinde tutan
 * kişi açabilir — ve veritabanı tarafındaki RESTRICTIVE RLS politikaları
 * sayesinde bu, çalınmış bir `aal1` jetonu için de geçerlidir.
 */
export const TwoFactorCard = () => {
  const [factors, setFactors] = useState<TotpFactor[] | null>(null);
  const [enrollment, setEnrollment] = useState<EnrollmentStart | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setFactors(await listVerifiedFactors());
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleStart = async () => {
    setBusy(true);
    try {
      const { data, error } = await startEnrollment();
      if (error || !data) {
        toast.error(error?.message || "İki adımlı doğrulama başlatılamadı");
        return;
      }
      setEnrollment(data);
      setCode("");
    } finally {
      setBusy(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollment) return;
    setBusy(true);
    try {
      const { error } = await confirmEnrollment(enrollment.factorId, code);
      if (error) {
        toast.error("The code could not be verified. Enter the current code in the app.");
        setCode("");
        return;
      }
      toast.success("İki adımlı doğrulama açıldı");
      setEnrollment(null);
      setCode("");
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async (factorId: string) => {
    setBusy(true);
    try {
      const { error } = await removeFactor(factorId);
      if (error) {
        toast.error(error.message || "İki adımlı doğrulama kapatılamadı");
        return;
      }
      toast.success("İki adımlı doğrulama kapatıldı");
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  const enabled = (factors?.length ?? 0) > 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {enabled ? (
            <ShieldCheck className="h-4 w-4 text-primary" />
          ) : (
            <ShieldOff className="h-4 w-4 text-muted-foreground" />
          )}
          <span data-translatable>Two-step verification</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {factors === null ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : enabled ? (
          <>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Açık. Girişte şifrenizin yanında doğrulayıcı uygulamanızdaki 6 haneli kod
              da istenir.
            </p>
            {factors.map((factor) => (
              <Button
                key={factor.id}
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => handleRemove(factor.id)}
                className="w-full text-destructive hover:text-destructive"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Close"}
              </Button>
            ))}
          </>
        ) : enrollment ? (
          <form onSubmit={handleConfirm} className="space-y-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Google Authenticator, 1Password, Authy gibi bir uygulamayla aşağıdaki
              QR'ı okutun, ardından ürettiği 6 haneli kodu girin.
            </p>
            {/* Supabase QR'ı hazır SVG data-URI olarak döner; harici bir QR
                kütüphanesine ya da ağ isteğine gerek yok. CSP `img-src data:`
                zaten açık (bkz. vite.config.ts). */}
            <img
              src={enrollment.qrCode}
              alt="İki adımlı doğrulama QR kodu"
              className="mx-auto h-44 w-44 rounded-lg bg-white p-2"
            />
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                QR okutamıyorsanız bu anahtarı elle girin
              </Label>
              <code className="block break-all rounded bg-muted px-2 py-1.5 text-micro">
                {enrollment.secret}
              </code>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mfa-enroll-code" className="text-xs">
                verification code
              </Label>
              <Input
                id="mfa-enroll-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="000000"
                className="text-center text-lg tracking-[0.4em]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                disabled={busy}
                onClick={() => setEnrollment(null)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="flex-1" disabled={busy || code.length !== 6}>
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Onayla"}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Şu anda devre dışı. Etkinleştirdiğinizde hesabınıza yalnızca şifrenizi
              bilen değil, doğrulayıcı uygulamanıza da erişebilen biri girebilir.
            </p>
            <Button variant="outline" size="sm" className="w-full gap-2" disabled={busy} onClick={handleStart}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Etkinleştir
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
