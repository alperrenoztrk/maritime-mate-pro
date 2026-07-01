import { useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { askLessonTutor, type AIMessage, type TutorLevel } from "@/services/aiClient";

/**
 * "Dersler Beta" — derse gömülü adaptif AI eğitmen paneli.
 *
 * O konunun anlatımına topraklanır (lessonText). Hızlı aksiyon butonları
 * önceden hazır promptlar gönderir; "Daha basit anlat" seviyeyi düşürerek
 * adaptifliği sağlar. Tüm çağrılar `askLessonTutor` → `gemini-chat` üzerinden.
 */
type QuickAction = { label: string; prompt: string; level?: TutorLevel };

const QUICK_ACTIONS: QuickAction[] = [
  { label: "Daha basit anlat", prompt: "Bu konuyu en baştan, çok basit bir dille ve günlük bir benzetmeyle anlat.", level: "basit" },
  { label: "Bana bir soru sor", prompt: "Bu konuyu anlayıp anlamadığımı ölçmek için bana tek bir soru sor ve cevabımı bekle." },
  { label: "Gemideki uygulaması ne?", prompt: "Bu konunun gerçek bir gemideki/vardiyadaki pratik uygulamasını somut bir örnekle açıkla." },
  { label: "Sık yapılan hata ne?", prompt: "Bu konuda zabitlerin/öğrencilerin en sık yaptığı hataları ve nasıl kaçınılacağını anlat." },
];

export function LessonAITutor({
  topicTitle,
  lessonText,
}: {
  topicTitle: string;
  lessonText: string;
}) {
  const { currentLanguage: language } = useLanguage();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState<TutorLevel>("normal");
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = async (text: string, nextLevel?: TutorLevel) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const effectiveLevel = nextLevel ?? level;
    if (nextLevel) setLevel(nextLevel);

    const userMsg: AIMessage = { role: "user", content: trimmed };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const answer = await askLessonTutor(
        { topicTitle, lessonText, level: effectiveLevel },
        history,
        language,
      );
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Şu anda yanıt veremedim, lütfen tekrar deneyin." },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  };

  return (
    <section className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-4 shadow-md sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">AI Eğitmen</h2>
          <p className="text-xs text-muted-foreground">"{topicTitle}" konusunu sana özel anlatır</p>
        </div>
      </div>

      {messages.length > 0 && (
        <div
          ref={scrollRef}
          className="mb-3 max-h-80 space-y-3 overflow-y-auto rounded-xl border border-border/40 bg-background/60 p-3"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  m.role === "user" ? "bg-primary/20 text-primary" : "bg-indigo-500/20 text-indigo-600 dark:text-indigo-300"
                }`}
              >
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/90"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <p className="pl-9 text-xs italic text-muted-foreground">Eğitmen yazıyor…</p>
          )}
        </div>
      )}

      <div className="mb-3 flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((qa) => (
          <button
            key={qa.label}
            type="button"
            disabled={loading}
            onClick={() => send(qa.prompt, qa.level)}
            className="rounded-full border border-indigo-500/40 bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-indigo-500/10 disabled:opacity-50"
          >
            {qa.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Bu konu hakkında bir şey sor…"
          disabled={loading}
          className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary/50 disabled:opacity-50"
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </section>
  );
}
