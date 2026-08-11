import { useEffect, useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Settings2 as SettingsIcon, Type, LogOut, Mail, Megaphone, Trash2, ShieldCheck, FileText, ExternalLink, Vibrate, Monitor, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getHapticsEnabled, setHapticsEnabled, hapticImpact } from "@/lib/haptics";
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
import { getPrivacyPolicyUrl, getTermsOfUseUrl } from "@/config/legal";
import { TwoFactorCard } from "@/components/settings/TwoFactorCard";
import {
  areAdsSupported,
  initializeAds,
  isPrivacyOptionsRequired,
  openPrivacyOptionsForm,
} from "@/services/ads";
import { toast } from "sonner";
import { useTheme, type Theme } from "@/hooks/useTheme";

const Settings = () => {
  const { fontSize, setFontSize } = useFontSize();
  const { theme, setTheme } = useTheme();
  const { currentLanguage, changeLanguage, supportedLanguages, getLanguageName } = useLanguage();
  // RequireAuth already keeps anonymous visitors out of this page and carries
  // the return path, so no local redirect is needed here.
  const { user, signOut } = useAuth();
  const { hasProAccess } = useEntitlement();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // Read once on mount; the haptics module owns the persisted value.
  const [hapticsOn, setHapticsOn] = useState(() => getHapticsEnabled());

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

  const fontSizeLabels: Partial<Record<FontSizeKey, string>> = {
    normal: "Normal",
    large: "Büyük",
  };


  const appearanceOptions: Array<{ value: Theme; label: string; icon: typeof Monitor }> = [
    { value: "system", label: "Sistem", icon: Monitor },
    { value: "light", label: "Açık", icon: Sun },
    { value: "dark", label: "Koyu", icon: Moon },
  ];

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
      <div className="min-h-screen w-full max-w-full overflow-x-hidden py-2 text-foreground sm:py-4 [overflow-wrap:anywhere]">
        <div className="max-w-4xl mx-auto space-y-6">


          {/* Header */}
          <div className="space-y-1 pb-1">
            <div className="flex items-center gap-3">
              <span className="surface-2 inline-flex h-10 w-10 items-center justify-center rounded-xl border">
                <SettingsIcon className="h-5 w-5 text-primary" />
              </span>
              <h1 data-page-title className="text-3xl font-bold tracking-[-0.025em] text-foreground">
                <span data-translatable>Ayarlar</span>
              </h1>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Account */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <span data-translatable>Hesap</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold text-primary">{initials}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 basis-40 space-y-1">
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
                    href={getPrivacyPolicyUrl(currentLanguage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tap-target="true"
                    className="flex items-center gap-2 rounded-lg px-2 text-sm text-primary hover:bg-primary/10"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span data-translatable>Gizlilik Politikası</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <a
                    href={getTermsOfUseUrl(currentLanguage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tap-target="true"
                    className="flex items-center gap-2 rounded-lg px-2 text-sm text-primary hover:bg-primary/10"
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


            {/* Ads & privacy — free tier on native only */}
            {adsRelevant && (
              <Card>
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

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  <span data-translatable>Görünüm</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="surface-1 grid grid-cols-3 gap-1 rounded-xl border p-1" role="radiogroup" aria-label="Görünüm">
                  {appearanceOptions.map(({ value, label, icon: Icon }) => {
                    const selected = theme === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          setTheme(value);
                          hapticImpact("light");
                        }}
                        className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-control ${
                          selected
                            ? "bg-background text-foreground shadow-elev-1"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span data-translatable>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Font Size Settings */}
            <Card>
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

            {/* Haptic feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vibrate className="w-5 h-5" />
                  <span data-translatable>Dokunsal Geri Bildirim</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="haptics-toggle" className="flex-1">
                    <span data-translatable>Dokunmalarda titreşim</span>
                    <span className="mt-1 block text-caption font-normal text-muted-foreground" data-translatable>
                      Yalnızca telefon uygulamasında çalışır.
                    </span>
                  </Label>
                  <Switch
                    id="haptics-toggle"
                    checked={hapticsOn}
                    onCheckedChange={(checked) => {
                      setHapticsEnabled(checked);
                      setHapticsOn(checked);
                      // Confirm the new state with the thing being toggled.
                      if (checked) hapticImpact("light");
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card>
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
