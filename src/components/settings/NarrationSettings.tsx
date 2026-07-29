import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { listVoicesForLanguage, waitForVoices, type VoiceOption } from "@/services/lessonNarration";
import {
  getNarrationPreferences,
  setNarrationPreferences,
  type NarrationPreferences,
} from "@/services/narrationPreferences";

const RATE_OPTIONS = [
  { value: "0.8", label: "Yavaş (0.8×)" },
  { value: "1", label: "Normal (1×)" },
  { value: "1.25", label: "Hızlı (1.25×)" },
  { value: "1.5", label: "Çok hızlı (1.5×)" },
];

const AUTO_VOICE = "__auto__";

/**
 * Ders slaytlarının seslendirme ayarları.
 *
 * Ses listesi cihaza göre değişir; varsayılan olarak uygulama dilindeki ERKEK
 * ses otomatik seçilir, kullanıcı isterse buradan başka bir ses belirleyebilir.
 */
export function NarrationSettings() {
  const { currentLanguage } = useLanguage();
  const [prefs, setPrefs] = useState<NarrationPreferences>(() => getNarrationPreferences());
  const [voices, setVoices] = useState<VoiceOption[]>([]);

  useEffect(() => {
    let active = true;
    void waitForVoices().then(() => {
      if (active) setVoices(listVoicesForLanguage(currentLanguage));
    });
    return () => {
      active = false;
    };
  }, [currentLanguage]);

  const update = (patch: Partial<NarrationPreferences>) => {
    setPrefs(setNarrationPreferences(patch));
  };

  return (
    <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          <span data-translatable>Ders Seslendirme</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="narration-enabled" className="flex-1">
              <span data-translatable>Slaytları sesli anlat</span>
            </Label>
            <Switch
              id="narration-enabled"
              checked={prefs.enabled}
              onCheckedChange={(checked) => update({ enabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="narration-autoplay" className="flex-1">
              <span data-translatable>Ders açılınca otomatik oynat</span>
            </Label>
            <Switch
              id="narration-autoplay"
              checked={prefs.autoplay}
              onCheckedChange={(checked) => update({ autoplay: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="narration-rate">
              <span data-translatable>Konuşma hızı</span>
            </Label>
            <Select
              value={String(prefs.rate)}
              onValueChange={(value) => update({ rate: Number(value) })}
            >
              <SelectTrigger id="narration-rate">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RATE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span data-translatable>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="narration-voice">
              <span data-translatable>Ses</span>
            </Label>
            <Select
              value={prefs.voiceURI ?? AUTO_VOICE}
              onValueChange={(value) => update({ voiceURI: value === AUTO_VOICE ? null : value })}
            >
              <SelectTrigger id="narration-voice">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={AUTO_VOICE}>
                  <span data-translatable>Otomatik (erkek ses)</span>
                </SelectItem>
                {voices.map((voice) => (
                  <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name}
                    {voice.isMale ? " ♂" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {voices.length === 0 && (
              <p className="text-xs text-muted-foreground">
                <span data-translatable>
                  Bu cihazda bu dil için ses bulunamadı; seslendirme buluttan yapılır.
                </span>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
