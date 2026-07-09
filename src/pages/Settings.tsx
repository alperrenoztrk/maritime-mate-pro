import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Settings2 as SettingsIcon, Type, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
// Density settings removed from Settings page; provider remains app-wide
import { useFontSize, FONT_SIZE_OPTIONS, type FontSizeKey } from "@/contexts/FontSizeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { getLanguageFlag } from "@/utils/languages";
import { toast } from "sonner";

const Settings = () => {
  const { fontSize, setFontSize } = useFontSize();
  const { currentLanguage, changeLanguage, supportedLanguages, getLanguageName } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLanguageChange = async (value: string) => {
    await changeLanguage(value);
    toast.success(`Dil değiştirildi: ${getLanguageName(value)}`);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Çıkış yapıldı");
  };

  const displayName = (user?.user_metadata?.full_name as string) || user?.email || "";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials = displayName ? displayName.charAt(0).toUpperCase() : "?";

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
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
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
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{displayName || user.email}</div>
                      {user.email && displayName && displayName !== user.email && (
                        <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                      )}
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
