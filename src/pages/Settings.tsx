import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun, Globe, Settings2 as SettingsIcon, Palette, Type } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/useTheme";
// Density settings removed from Settings page; provider remains app-wide
import { useFontSize, FONT_SIZE_OPTIONS, type FontSizeKey } from "@/contexts/FontSizeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLanguageFlag } from "@/utils/languages";
import { toast } from "sonner";
import { ReleaseChecklistCard } from "@/components/settings/ReleaseChecklistCard";
import { WidgetSettings } from "@/components/settings/WidgetSettings";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
  const { currentLanguage, changeLanguage, supportedLanguages, getLanguageName } = useLanguage();

  // Neon and Nature themes are no longer available in Settings

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as "light" | "dark");
    const themeNames = {
      light: "Açık Tema",
      dark: "Koyu Tema",
    } as const;
    if (newTheme === "light") {
      toast.success(`${themeNames.light} aktif`);
    }
  };

  const handleLanguageChange = async (value: string) => {
    await changeLanguage(value);
    toast.success(`Dil değiştirildi: ${getLanguageName(value)}`);
  };

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
            <p className="text-lg text-muted-foreground">
              <span data-translatable>Uygulama tercihlerinizi özelleştirin</span>
            </p>
          </div>

          <div className="grid gap-6">
            {/* Theme Settings */}
            <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700 nature:bg-green-50 nature:border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  <span data-translatable>Tema Ayarları</span>
                </CardTitle>
                <CardDescription>
                  <span data-translatable>Arayüz temasını seçin</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme-select">
                      <span data-translatable>Tema</span>
                    </Label>
                    <Select value={theme} onValueChange={handleThemeChange}>
                      <SelectTrigger id="theme-select">
                        <SelectValue>
                          <span data-translatable>{theme === 'light' ? 'Açık Tema' : 'Koyu Tema'}</span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4" />
                            <span data-translatable>Açık Tema</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="w-4 h-4" />
                            <span data-translatable>Koyu Tema</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span data-translatable>Seçilen tema tüm uygulamada geçerli olacaktır</span>
                  </p>
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
                <CardDescription>
                  <span data-translatable>Uygulamadaki yazı boyutunu ayarlayın</span>
                </CardDescription>
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
                  <p className="text-sm text-muted-foreground">
                    <span data-translatable>Seçilen yazı boyutu tüm uygulamada geçerli olacaktır</span>
                  </p>
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
                <CardDescription>
                  <span data-translatable>Uygulama dilini seçin</span>
                </CardDescription>
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
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getLanguageFlag(currentLanguage)}</span>
                            <span data-translatable>{getLanguageName(currentLanguage)}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                       {supportedLanguages.map((lang) => (
                         <SelectItem key={lang.language} value={lang.language}>
                           <div className="flex items-center gap-2">
                             <span className="text-lg">{getLanguageFlag(lang.language)}</span>
                             <span data-translatable>{lang.displayName || getLanguageName(lang.language)}</span>
                           </div>
                         </SelectItem>
                       ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span data-translatable>Seçilen dil tüm uygulamada geçerli olacaktır</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span data-translatable>Çeviriler denizcilik terminolojisine uygun olarak uygulanır</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Home widgets */}
            <WidgetSettings />

            {/* Android Release Checklist */}
            <ReleaseChecklistCard />

          </div>

        </div>
      </div>
    </MobileLayout>
  );
};

export default Settings;
