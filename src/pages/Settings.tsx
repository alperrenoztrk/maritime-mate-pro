import { useEffect, useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Settings2 as SettingsIcon, Type, LogOut, Crown, ChevronRight, Mail, Megaphone, Trash2, ShieldCheck, FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/safeClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { FONT_SIZE_OPTIONS, type FontSizeKey } from "@/contexts/font-size-context";
import { useFontSize } from "@/contexts/useFontSize";
import { useLanguage } from "@/contexts/useLanguage";
import { useAuth } from "@/hooks/useAuthContext";
import { useEntitlement } from "@/contexts/useEntitlement";
import { getLanguageFlag } from "@/utils/languages";
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from "@/config/legal";
import { TwoFactorCard } from "@/components/settings/TwoFactorCard";
import {
  areAdsSupported,
  initializeAds,
  isPrivacyOptionsRequired,
  openPrivacyOptionsForm,
} from "@/services/ads";
import { toast } from "sonner";

const Settings = () => {
  const { fontSize, setFontSize } = useFontSize();
  const { currentLanguage, changeLanguage, supportedLanguages, getLanguageName } = useLanguage();
  // RequireAuth already keeps anonymous visitors out of this page and carries
  // the return path, so no local redirect is needed here.
  const { user, signOut } = useAuth();
  const { tier, hasProAccess } = useEntitlement();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const tierLabels: Record<string, string> = {
    free: "Ücretsiz",
    pro: "Pro",
    lifetime: "Ömür Boyu",
  };

  const handleLanguageChange = async (value: string) => {
    await changeLanguage(value);
    toast.success(`Dil değiştirildi: ${getLanguageName(value)}`);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Çıkış yapıldı");
    // Settings is behind the login wall; leaving the user here would bounce
    // them straight into the auth screen.
    navigate("/", { replace: true });
  };

  // Hesap silme: sunucu tarafında tüm tablolar ve depolanan belgeler temizlenir.
  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      const { error } = await supabase.functions.invoke("delete-account", { body: {} });
      if (error) throw error;
      toast.success("Hesabınız ve tüm verileriniz silindi");
      await signOut();
      navigate("/", { replace: true });
    } catch {
      toast.error("Hesap silinemedi. Lütfen tekrar deneyin veya bize yazın.");
      setDeleting(false);
      setConfirmDelete(false);
    }
  };



  const displayName = (user?.user_metadata?.full_name as string) || "";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials = displayName ? displayName.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : "?";

  const provider =
    (user?.app_metadata?.provider as string) ||
    (user?.identities?.[0]?.provider as string) ||
    "";

  const providerLabels: Record<string, string> = {
    email: "E-posta",
  };
  const providerLabel = providerLabels[provider] || (provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : "Bilinmiyor");

  const fontSizeLabels: Record<FontSizeKey, string> = {
    small: "Küçük",
    normal: "Normal",
    large: "Büyük",
    xlarge: "Çok Büyük",
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value as FontSizeKey);
    toast.success(`Yazı boyutu: ${fontSizeLabels[value as FontSizeKey]}`);
  };

  // Reklam onayı (UMP): Google, onay formu gösterilen bölgelerde kullanıcının
  // tercihini sonradan değiştirebileceği bir giriş noktası zorunlu kılar.
  // Kart yalnızca reklam gören (ücretsiz, native) kullanıcıda anlamlıdır.
  const adsRelevant = areAdsSupported() && !hasProAccess;
  const [privacyOptionsAvailable, setPrivacyOptionsAvailable] = useState(false);

  useEffect(() => {
    if (!adsRelevant) {
      setPrivacyOptionsAvailable(false);
      return;
    }
    let cancelled = false;
    void initializeAds().then(() => {
      if (!cancelled) setPrivacyOptionsAvailable(isPrivacyOptionsRequired());
    });
    return () => {
      cancelled = true;
    };
  }, [adsRelevant]);

  const handlePrivacyOptions = async () => {
    const opened = await openPrivacyOptionsForm();
    if (!opened) toast.error("Reklam tercihleri şu anda açılamadı");
  };

  // Only reachable for the frame between signing out and the redirect landing.
  if (!user) {
    return null;
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <SettingsIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 nature-icon" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent nature-title">
                <span data-translatable>Ayarlar</span>
              </h1>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Account */}
            <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>
                  <span data-translatable>Hesap</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold text-primary">{initials}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    {displayName ? (
                      <div className="font-medium truncate">{displayName}</div>
                    ) : null}
                    {user.email ? (
                      <div className="flex items-center gap-1.5 text-sm text-foreground/90 min-w-0 font-medium">
                        <Mail className="w-3.5 h-3.5 shrink-0 text-primary" />
                        <span className="truncate" title={user.email}>{user.email}</span>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground italic">
                        <span data-translatable>E-posta bulunamadı</span>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground/80 truncate">
                      <span data-translatable>Sağlayıcı</span>: {providerLabel}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    <span data-translatable>Çıkış</span>
                  </Button>
                </div>

                {/* Yasal metinler ve hesap silme — Google Play zorunlu gereksinimleri.
                    Abonelik içeren uygulamalarda gizlilik politikasının yanında
                    kullanım şartlarının da uygulama içinden erişilebilir olması beklenir. */}
                <div className="mt-5 space-y-3 border-t border-border/60 pt-4">
                  <a
                    href={PRIVACY_POLICY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span data-translatable>Gizlilik Politikası</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <a
                    href={TERMS_OF_USE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span data-translatable>Kullanım Şartları</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      <span data-translatable>
                        Hesabınızı sildiğinizde profiliniz, sınav sonuçlarınız, istatistikleriniz, belgeleriniz ve yüklediğiniz dosyalar kalıcı olarak silinir. Bu işlem geri alınamaz.
                      </span>
                    </p>
                    {/* Play, hesap silmenin faturalandırmayı durdurmadığının
                        kullanıcıya açıkça söylenmesini istiyor. */}
                    <p className="text-xs font-medium text-destructive/90">
                      <span data-translatable>
                        Hesap silme, Google Play aboneliğinizi iptal etmez. Ödemenin durması için aboneliği Google Play &gt; Abonelikler bölümünden ayrıca iptal etmeniz gerekir.
                      </span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span data-translatable>
                          {deleting ? "Siliniyor..." : confirmDelete ? "Evet, hesabımı kalıcı olarak sil" : "Hesabımı sil"}
                        </span>
                      </Button>
                      {confirmDelete && !deleting && (
                        <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
                          <span data-translatable>Vazgeç</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hesap güvenliği: isteğe bağlı 2FA (bkz. src/lib/mfa.ts) */}
            <TwoFactorCard />

            {/* Pro membership */}
            <Card
              className="shadow-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:border-amber-400/60 transition-colors"
              onClick={() => navigate("/pro")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span data-translatable>Mariner's Book Pro</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    <span data-translatable>Paketiniz</span>:{" "}
                    <span className={hasProAccess ? "text-amber-400 font-medium" : ""} data-translatable>
                      {tierLabels[tier] ?? tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-amber-400">
                    <span data-translatable>{hasProAccess ? "Yönet" : "Pro'ya geç"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ads & privacy — free tier on native only */}
            {adsRelevant && (
              <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5" />
                    <span data-translatable>Reklamlar ve Gizlilik</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      <span data-translatable>{"Ücretsiz pakette reklam gösterilir. Pro üyelikte reklam yoktur."}</span>
                    </p>
                    {privacyOptionsAvailable && (
                      <Button variant="outline" size="sm" onClick={handlePrivacyOptions}>
                        <span data-translatable>Reklam tercihlerini yönet</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Font Size Settings */}
            <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  <span data-translatable>Yazı Boyutu</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-size-select">
                      <span data-translatable>Yazı Boyutu</span>
                    </Label>
                    <Select value={fontSize} onValueChange={handleFontSizeChange}>
                      <SelectTrigger id="font-size-select">
                        <SelectValue>
                          <span data-translatable>{fontSizeLabels[fontSize]}</span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_SIZE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.key} value={opt.key}>
                            <span data-translatable>{opt.labelTr}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span data-translatable>Dil Ayarları</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language-select">
                      <span data-translatable>Dil</span>
                    </Label>
                    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger id="language-select">
                        <SelectValue>
                          {getLanguageFlag(currentLanguage)} {getLanguageName(currentLanguage)}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                       {supportedLanguages.map((lang) => (
                         <SelectItem key={lang.language} value={lang.language}>
                           {getLanguageFlag(lang.language)} {lang.displayName || getLanguageName(lang.language)}
                         </SelectItem>
                       ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </MobileLayout>
  );
};

export default Settings;
