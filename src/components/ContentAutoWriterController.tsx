import { useCallback, useEffect, useMemo, useState } from "react";
import { Bot, RefreshCw, Timer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import { navigationTopicContents } from "@/data/navigationTopicContents";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import { buildNavigationSectionKey, setTopicContentOverride } from "@/services/topicContentOverrides";

const AUTO_INTERVAL_MS = 1000 * 60 * 20;

const SYSTEM_PROMPT = `Sen Marine Expert uygulaması için konu anlatımı yazım asistanısın.

Kurallar:
- Türkçe, resmi ve kısa anlatım yaz.
- 2-4 cümle, sadece metin.
- Görsel, bağlantı, tablo veya madde listesi ekleme.
- Yapay zeka ifadesi veya kişisel üslup kullanma.
- Denizcilik eğitimine uygun, doğrulanabilir ve teknik doğruluk öncelikli olmalı.`;

const stripImageMarkdown = (content: string) =>
  content.replace(/!\[[^\]]*]\([^)]*\)/g, "").replace(/\s+/g, " ").trim();

const isContentMissing = (content?: string) => {
  if (!content) return true;
  const stripped = stripImageMarkdown(content);
  return stripped.length === 0;
};

type ContentTarget = {
  key: string;
  topicTitle: string;
  sectionTitle: string;
};

const buildTargets = (overrides: Record<string, { content: string }>): ContentTarget[] => {
  const targets: ContentTarget[] = [];

  Object.entries(navigationTopicContents).forEach(([topicTitle, topic]) => {
    topic.sections.forEach((section) => {
      if (!isContentMissing(section.content)) return;
      const key = buildNavigationSectionKey(topicTitle, section.title);
      if (overrides[key]?.content) return;
      targets.push({
        key,
        topicTitle,
        sectionTitle: section.title,
      });
    });
  });

  return targets;
};

export const ContentAutoWriterController = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunAt, setLastRunAt] = useState<string | null>(null);
  const [lastTarget, setLastTarget] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const overrides = useTopicContentOverrides();

  const targets = useMemo(() => buildTargets(overrides), [overrides]);
  const nextTarget = targets[0];

  const runAutoWriter = useCallback(async () => {
    if (isRunning) return;
    if (!nextTarget) {
      toast.success("Bekleyen alt başlık kalmadı.");
      return;
    }

    setIsRunning(true);
    try {
      const userPrompt = [
        `Konu: ${nextTarget.topicTitle}`,
        `Alt başlık: ${nextTarget.sectionTitle}`,
        "İstenen: Alt başlık için kısa konu anlatımı yaz.",
      ].join("\n");

      const { data, error } = await supabase.functions.invoke("gemini-chat", {
        body: {
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
        },
      });

      if (error) throw error;
      const text = (data?.text || data?.answer || "").toString().trim();
      if (!text) {
        throw new Error("AI yanıtı boş geldi.");
      }

      setTopicContentOverride(nextTarget.key, {
        content: text,
        updatedAt: new Date().toISOString(),
      });

      setLastRunAt(new Date().toLocaleString("tr-TR"));
      setLastTarget(`${nextTarget.topicTitle} → ${nextTarget.sectionTitle}`);
      toast.success("Alt başlık içeriği güncellendi.");
    } catch (err) {
      console.error(err);
      toast.error("Otomatik içerik üretilemedi.");
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, nextTarget]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = window.setInterval(() => {
      runAutoWriter();
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoRefresh, runAutoWriter]);

  return (
    <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span data-translatable>Konu Anlatımı Otomasyonu</span>
        </CardTitle>
        <CardDescription>
          <span data-translatable>Eksik alt başlıkları 20 dakikada bir tamamlar.</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/50 bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">Bekleyen alt başlık</div>
            <div className="mt-1 text-lg font-semibold text-foreground">{targets.length}</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">Sıradaki</div>
            <div className="mt-1 text-sm font-semibold text-foreground">
              {nextTarget ? `${nextTarget.topicTitle} → ${nextTarget.sectionTitle}` : "Tamamlandı"}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={runAutoWriter} disabled={isRunning || !nextTarget}>
            {isRunning ? (
              <>
                <Timer className="mr-2 h-4 w-4 animate-pulse" />
                İçerik Yazılıyor
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Bir Alt Başlık Yaz
              </>
            )}
          </Button>
          <div className="flex items-center gap-2">
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            <span className="text-sm text-muted-foreground">20 dakikada bir otomatik yaz</span>
          </div>
          {lastRunAt && (
            <Badge variant="secondary">Son işlem: {lastRunAt}</Badge>
          )}
        </div>

        {lastTarget && (
          <div className="rounded-lg border border-border/50 bg-background/60 p-3 text-xs text-muted-foreground">
            Son güncelleme: <span className="font-medium text-foreground">{lastTarget}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
