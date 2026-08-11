import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyChallenge } from "@/lib/mfa";

/**
 * Girişin ikinci adımı: kimlik doğrulayıcıdaki 6 haneli kod.
 *
 * Hem giriş ekranında (şifre doğrulandıktan sonra) hem de RequireAuth'un
 * kapısında kullanılır; ikisi de aynı `aal1 → aal2` yükseltmesini yapar.
 */
export const MfaChallengeForm = ({
  onVerified,
  onCancel,
}: {
  /**
   * Doğrulama başarılı olduğunda çağrılır. Zorunlu değildir: oturum `aal2`ye
   * yükselince AuthProvider bayrağı zaten düşer ve kapı kendiliğinden açılır.
   * Yalnızca giriş ekranı, ardından `next` adresine gitmek için kullanır.
   */
  onVerified?: () => void;
  onCancel?: () => void;
}) => {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length !== 6) {
      toast.error("6 haneli kodu girin");
      return;
    }
    setBusy(true);
    try {
      const { error } = await verifyChallenge(code);
      if (error) {
        // Supabase yanlış kod ile süresi geçmiş kodu ayırmaz; kullanıcıya
        // her iki durumda da işe yarayan tek bir yönlendirme veriyoruz.
        toast.error("The code could not be verified. Enter the current code from the app.");
        setCode("");
        return;
      }
      onVerified?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center">
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="space-y-1.5 text-center">
        <p className="text-sm font-medium">İki adımlı doğrulama</p>
        <p className="text-xs text-muted-foreground">
          Kimlik doğrulayıcı uygulamanızdaki 6 haneli kodu girin.
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="mfa-code" className="sr-only">
          Doğrulama kodu
        </Label>
        <Input
          id="mfa-code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          maxLength={6}
          placeholder="000000"
          className="text-center text-2xl tracking-[0.5em]"
        />
      </div>
      <Button type="submit" className="w-full" disabled={busy || code.length !== 6}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Doğrula"}
      </Button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="w-full text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-50"
        >
          Vazgeç ve çıkış yap
        </button>
      )}
      <p className="text-center text-micro leading-relaxed text-muted-foreground">
        Doğrulayıcınıza erişiminizi kaybettiyseniz destek için bize yazın;
        kimliğinizi doğruladıktan sonra 2FA'yı kaldırabiliriz.
      </p>
    </form>
  );
};
