import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Radio, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import SignalTonePlayer from "@/components/audio/SignalTonePlayer";
import { morsePattern } from "@/components/audio/signalTones";
import {
  MORSE_CODE,
  MORSE_GROUP_LABELS,
  MORSE_GROUP_ORDER,
  encodeToMorse,
  type MorseEntry,
  type MorseGroup,
} from "@/data/morseCode";

type Filter = "all" | MorseGroup;

const FILTER_CHIPS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...MORSE_GROUP_ORDER.map((group) => ({
    value: group as Filter,
    label: MORSE_GROUP_LABELS[group].title,
  })),
];

const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Nokta/çizgiyi metin yerine tipografik sembollerle gösterir. */
function CodeGlyphs({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center gap-[3px] font-mono" aria-label={code}>
      {[...code].map((symbol, index) => {
        if (symbol === " ") return <span key={index} className="w-2" />;
        return (
          <span
            key={index}
            className={
              symbol === "-"
                ? "inline-block h-[3px] w-3.5 rounded-full bg-sky-500"
                : "inline-block h-[3px] w-[3px] rounded-full bg-sky-500"
            }
          />
        );
      })}
    </span>
  );
}

function MorseRow({ entry }: { entry: MorseEntry }) {
  return (
    <div className="flex flex-col gap-2 border-b border-border/30 px-4 py-3 last:border-b-0 sm:flex-row sm:items-start sm:gap-4">
      <div className="flex min-w-0 shrink-0 items-center gap-3 sm:w-40">
        <span className="font-mono text-lg font-bold text-foreground">{entry.char}</span>
        {entry.phonetic ? (
          <span className="truncate text-xs text-muted-foreground">{entry.phonetic}</span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-3">
          <CodeGlyphs code={entry.code} />
          <code className="text-xs text-muted-foreground">{entry.code}</code>
        </div>
        {entry.maritimeUse ? (
          <p className="text-xs leading-relaxed text-muted-foreground">{entry.maritimeUse}</p>
        ) : null}
      </div>

      <SignalTonePlayer
        steps={morsePattern(entry.code)}
        preset="morse"
        className="shrink-0"
        showProgress
      />
    </div>
  );
}

/** Metin → mors çevirici. Gemi adı/çağrı işareti hecelemek için. */
function MorseTranslator() {
  const [text, setText] = useState("");
  const words = useMemo(() => encodeToMorse(text), [text]);

  // Kelimeleri tek bir mors dizisine bağla: harf arası 3 birim, kelime arası
  // 7 birim (ITU-R M.1677-1). morsePattern zaten öğe aralarını ekliyor.
  const fullCode = useMemo(
    () =>
      words
        .map((word) =>
          word.letters
            .filter((letter) => letter.code)
            .map((letter) => letter.code)
            .join(" "),
        )
        .filter(Boolean)
        .join("  "),
    [words],
  );

  const hasUnknown = words.some((word) => word.letters.some((letter) => !letter.code));

  return (
    <section className="overflow-hidden rounded-2xl border border-border/50 bg-card/60">
      <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
        <h2 className="text-base font-semibold text-foreground">Metin → Mors Çevirici</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Gemi adı, çağrı işareti veya kısa bir mesaj yazın; harf harf mors karşılığını görün ve
          dinleyin.
        </p>
      </div>

      <div className="space-y-3 p-4">
        <Input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Ör. TCA veya MAYDAY"
          aria-label="Morsa çevrilecek metin"
          maxLength={60}
        />

        {words.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-x-4 gap-y-2 rounded-xl bg-muted/30 p-3">
              {words.map((word, wordIndex) => (
                <div key={wordIndex} className="flex flex-wrap items-end gap-2">
                  {word.letters.map((letter, letterIndex) => (
                    <div key={letterIndex} className="flex flex-col items-center gap-1">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {letter.char}
                      </span>
                      {letter.code ? (
                        <CodeGlyphs code={letter.code} />
                      ) : (
                        <span className="text-micro text-muted-foreground">—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {fullCode ? (
              <SignalTonePlayer
                steps={morsePattern(fullCode)}
                preset="morse"
                label="Tamamını çal"
              />
            ) : null}

            {hasUnknown ? (
              <p className="text-xs text-muted-foreground">
                “—” ile gösterilen karakterlerin uluslararası mors karşılığı yoktur; sahada bu
                harfler temel karşılıklarıyla (Ğ→G, İ→I, Ş→S) hecelenir.
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Mors alfabesi referansı: ITU-R M.1677-1 kod tablosu + Uluslararası İşaret
 * Kodu'nun ışıkla haberleşme prosedür işaretleri. Her satır Web Audio ile
 * sentezlenmiş tonla dinlenebilir (asset yok, tamamen offline).
 */
export default function MorseCodePage() {
  // Global arama /communication/morse?q=<karakter> ile derin bağlantı kurar.
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [filter, setFilter] = useState<Filter>("all");

  const q = norm(query.trim());

  const grouped = useMemo(() => {
    const matches = MORSE_CODE.filter((entry) => {
      if (filter !== "all" && entry.group !== filter) return false;
      if (!q) return true;
      const haystack = norm(
        [entry.char, entry.code, entry.phonetic ?? "", entry.maritimeUse ?? ""].join(" "),
      );
      return haystack.includes(q);
    });

    return MORSE_GROUP_ORDER.map((group) => ({
      group,
      label: MORSE_GROUP_LABELS[group],
      entries: matches.filter((entry) => entry.group === group),
    })).filter((section) => section.entries.length > 0);
  }, [filter, q]);

  const totalMatches = grouped.reduce((n, section) => n + section.entries.length, 0);

  return (
    <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-2">
          <Radio className="h-7 w-7 text-sky-500" />
          <h1 className="text-3xl font-bold md:text-4xl">Mors Alfabesi</h1>
        </div>

        <div className="mb-5 rounded-xl border border-border/50 bg-muted/20 p-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Zamanlama kuralı:</span> nokta 1 birim ·
            çizgi 3 birim · aynı harfin öğeleri arası 1 birim · harfler arası 3 birim · kelimeler
            arası 7 birim. Hız değişse de bu oranlar sabit kalır; mors “hızlı/yavaş” değil, oranı
            doğru gönderildiğinde okunur.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Harf, kod veya anlam ara (ör. SOS, denize adam düştü)…"
            className="pl-9 pr-9"
            aria-label="Mors kodu ara"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Group filter chips */}
        <div className="mb-5 flex flex-wrap gap-2">
          {FILTER_CHIPS.map((chip) => {
            const active = filter === chip.value;
            return (
              <button
                key={chip.value}
                type="button"
                onClick={() => setFilter(chip.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-sky-500/50 bg-sky-500/15 text-sky-700 dark:text-sky-400"
                    : "border-border/50 bg-card/40 text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {totalMatches === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-card/60 px-4 py-10 text-center">
            <p className="text-sm font-medium text-foreground">No results found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Farklı bir arama terimi deneyin veya grup filtresini temizleyin.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(({ group, label, entries }) => (
              <section
                key={group}
                className="overflow-hidden rounded-2xl border border-border/50 bg-card/60"
              >
                <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="text-base font-semibold text-foreground">{label.title}</h2>
                    <span className="shrink-0 text-micro text-muted-foreground">
                      {entries.length} kayıt
                    </span>
                  </div>
                </div>

                <div>
                  {entries.map((entry) => (
                    <MorseRow key={`${entry.group}-${entry.char}`} entry={entry} />
                  ))}
                </div>
              </section>
            ))}

            <MorseTranslator />
          </div>
        )}
      </div>
    </div>
  );
}
