import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Flag, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import SignalTonePlayer from "@/components/audio/SignalTonePlayer";
import { morsePattern } from "@/components/audio/signalTones";
import {
  COMMON_FLAG_GROUPS,
  SIGNAL_FLAGS,
  SIGNAL_FLAG_KIND_LABELS,
  SIGNAL_FLAG_KIND_ORDER,
  type FlagKind,
  type SignalFlag,
} from "@/data/signalFlags";

type Filter = "all" | FlagKind;

const FILTER_CHIPS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tümü" },
  ...SIGNAL_FLAG_KIND_ORDER.map((kind) => ({
    value: kind as Filter,
    label: SIGNAL_FLAG_KIND_LABELS[kind].title,
  })),
];

const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function FlagCard({ flag }: { flag: SignalFlag }) {
  return (
    <article className="flex gap-3 border-b border-border/30 px-4 py-3 last:border-b-0">
      <div className="flex w-24 shrink-0 flex-col items-center gap-1.5">
        <img
          src={`/flags/${flag.id}.svg`}
          alt={`${flag.label} — ${flag.design}`}
          loading="lazy"
          className="h-14 w-24 rounded-md object-contain"
        />
        <span className="text-sm font-bold text-foreground">{flag.label}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {flag.phonetic ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-muted px-2 py-0.5 text-micro font-medium text-muted-foreground">
              {flag.phonetic}
            </span>
            {flag.morse ? (
              <SignalTonePlayer
                steps={morsePattern(flag.morse)}
                preset="morse"
                label={flag.morse}
                size="sm"
              />
            ) : null}
          </div>
        ) : null}

        <p className="text-sm leading-relaxed text-foreground">{flag.meaning}</p>

        {flag.fishingMeaning ? (
          <p className="rounded-lg bg-amber-500/10 px-2.5 py-1.5 text-xs leading-relaxed text-amber-800 dark:text-amber-300">
            {flag.fishingMeaning}
          </p>
        ) : null}

        <p className="text-xs text-muted-foreground">{flag.design}</p>
      </div>
    </article>
  );
}

/**
 * Uluslararası İşaret Kodu referansı: 26 harf bayrağı, 10 rakam flaması,
 * 3 ikame flaması ve cevap flaması. Görseller public/flags altındaki
 * üretilmiş SVG'lerden gelir; harflerin mors karşılığı sesli çalınabilir.
 */
export default function SignalFlagsPage() {
  // Global arama /communication/flags?q=<harf> ile derin bağlantı kurar.
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [filter, setFilter] = useState<Filter>("all");

  const q = norm(query.trim());

  const grouped = useMemo(() => {
    const matches = SIGNAL_FLAGS.filter((flag) => {
      if (filter !== "all" && flag.kind !== filter) return false;
      if (!q) return true;
      const haystack = norm(
        [flag.label, flag.phonetic ?? "", flag.meaning, flag.fishingMeaning ?? "", flag.design].join(
          " ",
        ),
      );
      return haystack.includes(q);
    });

    return SIGNAL_FLAG_KIND_ORDER.map((kind) => ({
      kind,
      label: SIGNAL_FLAG_KIND_LABELS[kind],
      flags: matches.filter((flag) => flag.kind === kind),
    })).filter((section) => section.flags.length > 0);
  }, [filter, q]);

  const totalMatches = grouped.reduce((n, section) => n + section.flags.length, 0);

  return (
    <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-2">
          <Flag className="h-7 w-7 text-sky-500" />
          <h1 className="text-3xl font-bold md:text-4xl">İşaret Bayrakları</h1>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Bayrak ara (ör. kılavuz, denize adam düştü, Oscar)…"
            className="pl-9 pr-9"
            aria-label="İşaret bayrağı ara"
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

        {/* Kind filter chips */}
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
            <p className="text-sm font-medium text-foreground">Sonuç bulunamadı</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Farklı bir arama terimi deneyin veya filtreyi temizleyin.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(({ kind, label, flags }) => (
              <section
                key={kind}
                className="overflow-hidden rounded-2xl border border-border/50 bg-card/60"
              >
                <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="text-base font-semibold text-foreground">{label.title}</h2>
                    <span className="shrink-0 text-micro text-muted-foreground">
                      {flags.length} adet
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{label.description}</p>
                </div>

                <div>
                  {flags.map((flag) => (
                    <FlagCard key={flag.id} flag={flag} />
                  ))}
                </div>
              </section>
            ))}

            {/* İkame kuralı — bayrakların kendisi kadar sınavda çıkan kısım. */}
            <section className="overflow-hidden rounded-2xl border border-border/50 bg-card/60">
              <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
                <h2 className="text-base font-semibold text-foreground">İkame Flaması Kuralı</h2>
              </div>
              <div className="space-y-2 p-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Bir hoist içinde aynı harf veya rakam ikinci kez gerektiğinde, gemide ikinci bir
                  takım bayrak bulundurmak yerine ikame flaması çekilir. İkame flaması,{" "}
                  <span className="font-medium text-foreground">
                    yalnızca kendi sınıfındaki bayrağı
                  </span>{" "}
                  tekrarlar: harf bayrakları arasındaki bir ikame harfleri, rakam flamaları
                  arasındaki bir ikame rakamları sayar.
                </p>
                <p>
                  Örnek: <span className="font-mono font-semibold text-foreground">“ANNA”</span>{" "}
                  hoist'ında A-N-(2. ikame)-(1. ikame) çekilir. 2. ikame kendi sınıfındaki ikinci
                  bayrağı (N), 1. ikame ise birinci bayrağı (A) tekrarlar.
                </p>
                <p>
                  Üç ikame flaması sayesinde tek takım bayrakla dört karakterlik her kombinasyon
                  çekilebilir.
                </p>
              </div>
            </section>

            {/* Sık kullanılan iki harfli gruplar */}
            <section className="overflow-hidden rounded-2xl border border-border/50 bg-card/60">
              <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
                <h2 className="text-base font-semibold text-foreground">
                  Sık Kullanılan İki Harfli Gruplar
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Tek harfli işaretlerin ötesinde, iki harfli gruplar emniyet ve acil durum
                  mesajlarının çoğunu taşır.
                </p>
              </div>
              <div>
                {COMMON_FLAG_GROUPS.map((group) => (
                  <div
                    key={group.code}
                    className="flex gap-3 border-b border-border/30 px-4 py-2.5 last:border-b-0"
                  >
                    <div className="flex shrink-0 items-center gap-1">
                      {[...group.code].map((letter, index) => (
                        <img
                          key={index}
                          src={`/flags/${letter.toLowerCase()}.svg`}
                          alt={letter}
                          loading="lazy"
                          className="h-6 w-9 rounded-sm object-contain"
                        />
                      ))}
                    </div>
                    <span className="w-10 shrink-0 font-mono text-sm font-bold text-foreground">
                      {group.code}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {group.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
