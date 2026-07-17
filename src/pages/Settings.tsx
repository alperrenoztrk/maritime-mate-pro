import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Settings2 as SettingsIcon, Type, LogIn, LogOut, User as UserIcon, Crown, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
// Density settings removed from Settings page; provider remains app-wide
import { useFontSize, FONT_SIZE_OPTIONS, type FontSizeKey } from "@/contexts/FontSizeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useEntitlement } from "@/contexts/EntitlementContext";
import { getLanguageFlag } from "@/utils/languages";
import { toast } from "sonner";

const Settings = () => {
  const { fontSize, setFontSize } = useFontSize();
  const { currentLanguage, changeLanguage, supportedLanguages, getLanguageName } = useLanguage();
  const { user, signOut } = useAuth();
  const { tier, hasProAccess } = useEntitlement();
  const navigate = useNavigate();

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
  };

  const displayName = (user?.user_metadata?.full_name as string) || "";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials = displayName ? displayName.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : "?";

  const provider =
    (user?.app_metadata?.provider as string) ||
    (user?.identities?.[0]?.provider as string) ||
    "";

  const providerLabels: Record<string, string> = {
    google: "Google",
    apple: "Apple",
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
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg font-semibold text-primary">{initials}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      {displayName ? (
                        <div className="font-medium truncate">{displayName}</div>
                      ) : null}
                      {user.email ? (
                        <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                      ) : null}
                      <div className="text-xs text-muted-foreground/80 truncate">
                        <span data-translatable>Sağlayıcı</span>: {providerLabel}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
                      <LogOut className="w-4 h-4" />
                      <span data-translatable>Çıkış</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      <span data-translatable>Giriş yaparak hesabınızı senkronize edin</span>
                    </div>
                    <Button onClick={() => navigate("/auth")} className="gap-2">
                      <LogIn className="w-4 h-4" />
                      <span data-translatable>Giriş Yap</span>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

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
