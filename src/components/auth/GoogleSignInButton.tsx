import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { isGoogleAuthEnabled } from "@/lib/authFlow";

export const GoogleIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true" className={className}>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.6 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 34.9 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.5 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.4l6.2 5.2C41.9 35.9 44 30.4 44 24c0-1.2-.1-2.4-.4-3.5z"/>
  </svg>
);

interface GoogleSignInButtonProps {
  /** Where the user lands once the OAuth round trip finishes. */
  returnPath?: string;
  /** Kept in sync with a surrounding form so both cannot be submitted at once. */
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
  className?: string;
}

/**
 * Google login button. It renders nothing until the backend confirms the
 * provider is switched on, so a project without Google configured never offers
 * a login that would fail with "Unsupported provider".
 */
export const GoogleSignInButton = ({
  returnPath = "/",
  disabled = false,
  onBusyChange,
  className,
}: GoogleSignInButtonProps) => {
  const { signInWithGoogle } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    isGoogleAuthEnabled().then((available) => {
      if (!cancelled) setEnabled(available);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!enabled) return null;

  const handleClick = async () => {
    setBusy(true);
    onBusyChange?.(true);
    const { error } = await signInWithGoogle(returnPath);
    if (error) toast.error(error.message || "Google ile giriş başarısız");
    // Web navigates away to Google; native returns through the deep link and
    // the auth listener, so release the button either way.
    setBusy(false);
    onBusyChange?.(false);
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={className ?? "w-full gap-2"}
      onClick={handleClick}
      disabled={disabled || busy}
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleIcon />}
      Google ile devam et
    </Button>
  );
};
