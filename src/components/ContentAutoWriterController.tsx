import { useCallback, useEffect, useMemo, useState } from "react";
import { Bot, CheckCircle, Loader2, Play, RefreshCw, Square, Timer, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import { getTopicContentsByCategory } from "@/data/topicContents";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import {
  buildSectionKey,
  setMultipleTopicContentOverrides,
  type ContentCategory,
  type TopicContentOverride,
} from "@/services/topicContentOverrides";

const AUTO_INTERVAL_MS = 1000 * 60 * 20;

type ContentTarget = {
  key: string;
  topicTitle: string;
  sectionTitle: string;
  category: ContentCategory;
};

type BatchResult = {
  key: string;
  content?: string;
  success: boolean;
  error?: string;
};

const stripImageMarkdown = (content: string) =>
  content.replace(/!\[[^\]]*]\([^)]*\)/g, "").replace(/\s+/g, " ").trim();

const isContentMissing = (content?: string) => {
  if (!content) return true;
  const stripped = stripImageMarkdown(content);
  return stripped.length === 0;
};

const getCategoryData = (category: ContentCategory) => getTopicContentsByCategory(category);

const buildTargets = (
  category: ContentCategory,
  overrides: Record<string, { content: string }>
): ContentTarget[] => {
  const targets: ContentTarget[] = [];
  const data = getCategoryData(category);

  Object.entries(data).forEach(([topicTitle, topic]) => {
    if (!topic?.sections) return;
    topic.sections.forEach((section: { title: string; content?: string }) => {
      if (!isContentMissing(section.content)) return;
      const key = buildSectionKey(category, topicTitle, section.title);
      if (overrides[key]?.content) return;
      targets.push({
        key,
        topicTitle,
        sectionTitle: section.title,
        category,
      });
    });
  });

  return targets;
};

const BATCH_SIZES = [5, 10, 20] as const;
type BatchSize = typeof BATCH_SIZES[number];

export const ContentAutoWriterController = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const [lastRunAt, setLastRunAt] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [category, setCategory] = useState<ContentCategory>("navigation");
  const [batchSize, setBatchSize] = useState<BatchSize>(5);
  const [selectedTargets, setSelectedTargets] = useState<Set<string>>(new Set());
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  
  const overrides = useTopicContentOverrides();
  const targets = useMemo(() => buildTargets(category, overrides), [category, overrides]);

  // Reset selections when category changes
  useEffect(() => {
    setSelectedTargets(new Set());
    setBatchResults([]);
  }, [category]);

  const toggleTarget = (key: string) => {
    setSelectedTargets(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const selectAll = () => {
    const maxSelect = Math.min(targets.length, 50);
    setSelectedTargets(new Set(targets.slice(0, maxSelect).map(t => t.key)));
  };

  const clearSelection = () => {
    setSelectedTargets(new Set());
  };

  const runBatchWriter = useCallback(async () => {
    if (isBatchRunning) return;
    
    const selectedList = targets.filter(t => selectedTargets.has(t.key));
    if (selectedList.length === 0) {
      toast.error("Lütfen en az bir alt başlık seçin.");
      return;
    }

    setIsBatchRunning(true);
    setShouldStop(false);
    setBatchResults([]);
    setBatchProgress({ current: 0, total: selectedList.length });

    const allResults: BatchResult[] = [];
    const updates: Record<string, TopicContentOverride> = {};

    // Process in batches
    for (let i = 0; i < selectedList.length && !shouldStop; i += batchSize) {
      const batch = selectedList.slice(i, i + batchSize);
      
      try {
        const { data, error } = await supabase.functions.invoke("batch-content-writer", {
          body: {
            targets: batch.map(t => ({
              key: t.key,
              topicTitle: t.topicTitle,
              sectionTitle: t.sectionTitle,
            })),
          },
        });

        if (error) throw error;

        const results: BatchResult[] = data?.results || [];
        allResults.push(...results);
        setBatchResults([...allResults]);

        // Save successful results
        results.forEach((r: BatchResult) => {
          if (r.success && r.content) {
            updates[r.key] = {
              content: r.content,
              updatedAt: new Date().toISOString(),
            };
          }
        });

        setBatchProgress({ current: Math.min(i + batchSize, selectedList.length), total: selectedList.length });
      } catch (err) {
        console.error("Batch error:", err);
        toast.error(`Batch işlemi başarısız (${i + 1}-${Math.min(i + batchSize, selectedList.length)})`);
      }

      // Delay between batches
      if (i + batchSize < selectedList.length && !shouldStop) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Save all successful results at once
    if (Object.keys(updates).length > 0) {
      setMultipleTopicContentOverrides(updates);
    }

    const successCount = allResults.filter(r => r.success).length;
    setLastRunAt(new Date().toLocaleString("tr-TR"));
    
    if (shouldStop) {
      toast.info(`İşlem durduruldu. ${successCount} içerik kaydedildi.`);
    } else {
      toast.success(`Tamamlandı! ${successCount}/${selectedList.length} içerik üretildi.`);
    }

    setIsBatchRunning(false);
    setShouldStop(false);
    setSelectedTargets(new Set());
  }, [isBatchRunning, targets, selectedTargets, batchSize, shouldStop]);

  const stopBatch = () => {
    setShouldStop(true);
  };

  // Legacy single writer for auto-refresh
  const runSingleWriter = useCallback(async () => {
    if (isRunning || targets.length === 0) return;

    setIsRunning(true);
    const target = targets[0];

    try {
      const { data, error } = await supabase.functions.invoke("batch-content-writer", {
        body: {
          targets: [{
            key: target.key,
            topicTitle: target.topicTitle,
            sectionTitle: target.sectionTitle,
          }],
        },
      });

      if (error) throw error;

      const result = data?.results?.[0];
      if (result?.success && result?.content) {
        setMultipleTopicContentOverrides({
          [target.key]: {
            content: result.content,
            updatedAt: new Date().toISOString(),
          },
        });
        setLastRunAt(new Date().toLocaleString("tr-TR"));
        toast.success("Alt başlık içeriği güncellendi.");
      } else {
        throw new Error(result?.error || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      toast.error("Otomatik içerik üretilemedi.");
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, targets]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = window.setInterval(() => {
      runSingleWriter();
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoRefresh, runSingleWriter]);

  const progressPercent = batchProgress.total > 0 
    ? Math.round((batchProgress.current / batchProgress.total) * 100) 
    : 0;

  return (
    <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span data-translatable>Toplu Konu Anlatımı Üretimi</span>
        </CardTitle>
        <CardDescription>
          <span data-translatable>Eksik alt başlıkları toplu olarak AI ile tamamlayın.</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category and Batch Size Selection */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Kategori</label>
            <Select value={category} onValueChange={(v) => setCategory(v as ContentCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="navigation">Seyir (Navigation)</SelectItem>
                <SelectItem value="stability" disabled>Stabilite (Tamamlandı)</SelectItem>
                <SelectItem value="cargo" disabled>Kargo (Yakında)</SelectItem>
                <SelectItem value="meteorology" disabled>Meteoroloji (Yakında)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Batch Boyutu</label>
            <Select value={batchSize.toString()} onValueChange={(v) => setBatchSize(Number(v) as BatchSize)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BATCH_SIZES.map(size => (
                  <SelectItem key={size} value={size.toString()}>{size} alt başlık</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/50 bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">Bekleyen</div>
            <div className="mt-1 text-lg font-semibold text-foreground">{targets.length}</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">Seçilen</div>
            <div className="mt-1 text-lg font-semibold text-foreground">{selectedTargets.size}</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">Tamamlanan</div>
            <div className="mt-1 text-lg font-semibold text-foreground">
              {Object.keys(overrides).filter(k => k.startsWith(`${category}:`)).length}
            </div>
          </div>
        </div>

        {/* Target Selection */}
        {targets.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Alt Başlıklar</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAll} disabled={isBatchRunning}>
                  Tümünü Seç (max 50)
                </Button>
                <Button variant="outline" size="sm" onClick={clearSelection} disabled={isBatchRunning}>
                  Temizle
                </Button>
              </div>
            </div>
            <ScrollArea className="h-48 rounded-md border p-2">
              <div className="space-y-1">
                {targets.slice(0, 100).map((target) => (
                  <div
                    key={target.key}
                    className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted/50"
                  >
                    <Checkbox
                      checked={selectedTargets.has(target.key)}
                      onCheckedChange={() => toggleTarget(target.key)}
                      disabled={isBatchRunning}
                    />
                    <span className="text-sm truncate flex-1">
                      <span className="font-medium">{target.topicTitle}</span>
                      <span className="text-muted-foreground"> → {target.sectionTitle}</span>
                    </span>
                  </div>
                ))}
                {targets.length > 100 && (
                  <div className="text-xs text-muted-foreground px-2 py-1">
                    ...ve {targets.length - 100} daha
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Progress */}
        {isBatchRunning && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>İlerleme: {batchProgress.current}/{batchProgress.total}</span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        )}

        {/* Batch Results */}
        {batchResults.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Son Sonuçlar</span>
            <ScrollArea className="h-32 rounded-md border p-2">
              <div className="space-y-1">
                {batchResults.map((result, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    {result.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="truncate flex-1">{result.key.split("::")[1]}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {isBatchRunning ? (
            <Button variant="destructive" onClick={stopBatch}>
              <Square className="mr-2 h-4 w-4" />
              Durdur
            </Button>
          ) : (
            <Button 
              onClick={runBatchWriter} 
              disabled={selectedTargets.size === 0}
            >
              <Play className="mr-2 h-4 w-4" />
              Toplu Üret ({selectedTargets.size})
            </Button>
          )}

          <div className="flex items-center gap-2">
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} disabled={isBatchRunning} />
            <span className="text-sm text-muted-foreground">20 dk'da bir tek yaz</span>
          </div>

          {lastRunAt && (
            <Badge variant="secondary">Son: {lastRunAt}</Badge>
          )}
        </div>

        {targets.length === 0 && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-600 dark:text-green-400">
            🎉 Bu kategorideki tüm alt başlıklar tamamlandı!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
