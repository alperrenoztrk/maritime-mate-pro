import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { regulationItems, type RegulationCategory } from "@/data/regulationItems";
import {
  BookOpenCheck,
  ClipboardCheck,
  ClipboardList,
  FileSearch,
  Globe,
  Leaf,
  Map,
  Scale,
  Search,
  Shield,
  type LucideIcon,
} from "lucide-react";

const regulationCards: { category: RegulationCategory; title: string; icon: LucideIcon }[] = [
  { category: "IMO Sözleşmeleri", title: "IMO Sözleşmeleri", icon: Globe },
  { category: "Emniyet Kodları", title: "Emniyet Kodları", icon: Shield },
  { category: "Çevresel Düzenlemeler", title: "Çevresel Düzenlemeler", icon: Leaf },
  { category: "Denetim & Sörvey", title: "Denetim & Sörvey", icon: Search },
  { category: "Gemi Sertifikaları", title: "Gemi Sertifikaları", icon: ClipboardList },
  { category: "Bölgesel Düzenlemeler", title: "Bölgesel Düzenlemeler", icon: Map },
];

const regulationStyles: Record<RegulationCategory, { dot: string; icon: string; ring: string }> = {
  "IMO Sözleşmeleri": { dot: "bg-primary", icon: "text-primary", ring: "border-primary/25" },
  "Emniyet Kodları": { dot: "bg-amber-500", icon: "text-amber-500", ring: "border-amber-500/25" },
  "Çevresel Düzenlemeler": { dot: "bg-emerald-500", icon: "text-emerald-500", ring: "border-emerald-500/25" },
  "Denetim & Sörvey": { dot: "bg-sky-500", icon: "text-sky-500", ring: "border-sky-500/25" },
  "Gemi Sertifikaları": { dot: "bg-violet-500", icon: "text-violet-500", ring: "border-violet-500/25" },
  "Bölgesel Düzenlemeler": { dot: "bg-rose-500", icon: "text-rose-500", ring: "border-rose-500/25" },
};

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const searchableText = (item: (typeof regulationItems)[number]) =>
  normalize(
    [
      item.label,
      item.category,
      item.overview,
      ...(item.essentials || []),
      ...(item.keyArticles || []).flatMap((article) => [article.id, article.title, article.summary]),
      ...(item.detailedSections || []).flatMap((section) => [section.heading, section.body]),
      ...(item.terms || []).flatMap((entry) => [entry.term, entry.definition]),
    ].join(" "),
  );

const Regulations = () => {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query.trim());

  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  const filteredItems = useMemo(
    () =>
      normalizedQuery
        ? regulationItems.filter((item) => searchableText(item).includes(normalizedQuery))
        : regulationItems,
    [normalizedQuery],
  );

  const categoryGroups = regulationCards
    .map((card) => ({
      ...card,
      items: filteredItems.filter((item) => item.category === card.category),
    }))
    .filter((card) => card.items.length > 0);

  const operationalCount = regulationItems.reduce(
    (total, item) => total + (item.operationalRequirements?.length || 0),
    0,
  );
  const inspectionCount = regulationItems.reduce(
    (total, item) => total + (item.inspectionQuestions?.length || 0),
    0,
  );

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6">
        <header className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-black text-foreground sm:text-3xl">Regülasyonlar</h1>
          </div>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Sözleşme özetinden gemideki uygulamaya ilerleyin: uygulanabilirlik, sorumlular,
            objektif kanıtlar, doğrulama adımları ve denetim soruları aynı anlatımda.
          </p>
        </header>

        <section className="grid gap-3 sm:grid-cols-3" aria-label="Regülasyon içerik özeti">
          <div className="rounded-xl border border-border/50 bg-card/70 p-4 backdrop-blur-md">
            <BookOpenCheck className="mb-2 h-5 w-5 text-primary" />
            <p className="text-2xl font-black text-foreground">{regulationItems.length}</p>
            <p className="text-xs text-muted-foreground">benzersiz regülasyon ve kod</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/70 p-4 backdrop-blur-md">
            <ClipboardCheck className="mb-2 h-5 w-5 text-emerald-500" />
            <p className="text-2xl font-black text-foreground">{operationalCount}</p>
            <p className="text-xs text-muted-foreground">yapılandırılmış gemi gerekliliği</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/70 p-4 backdrop-blur-md">
            <FileSearch className="mb-2 h-5 w-5 text-sky-500" />
            <p className="text-2xl font-black text-foreground">{inspectionCount}</p>
            <p className="text-xs text-muted-foreground">denetim ve yeterlik sorusu</p>
          </div>
        </section>

        <div className="relative mx-auto w-full max-w-3xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <label htmlFor="regulation-search" className="sr-only">
            Regülasyonlarda ara
          </label>
          <input
            id="regulation-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Örn. SOLAS, work/rest, yangın, TML, PSC..."
            className="h-12 w-full rounded-2xl border border-border/60 bg-card/80 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none backdrop-blur-md transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {categoryGroups.length > 0 ? (
          <div className="grid items-start gap-5 lg:grid-cols-2">
            {categoryGroups.map((card) => {
              const style = regulationStyles[card.category];
              return (
                <section
                  key={card.category}
                  className={`rounded-2xl border ${style.ring} bg-card/65 p-4 shadow-sm backdrop-blur-md sm:p-5`}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="flex items-center gap-2 font-bold text-foreground">
                      <card.icon className={`h-5 w-5 shrink-0 ${style.icon}`} aria-hidden />
                      {card.title}
                    </h2>
                    <span className="rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                      {card.items.length} içerik
                    </span>
                  </div>

                  <div className="space-y-3">
                    {card.items.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/regulations/${item.slug}`}
                        className="group block rounded-xl border border-border/40 bg-background/45 p-3 transition hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background/65 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`} aria-hidden />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-foreground transition group-hover:text-primary">
                              {item.label}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              {item.overview}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-semibold text-muted-foreground">
                              <span>{item.detailedSections?.length || 0} anlatım bölümü</span>
                              <span aria-hidden>·</span>
                              <span>{item.operationalRequirements?.length || 0} gemi uygulaması</span>
                              <span aria-hidden>·</span>
                              <span>{item.inspectionQuestions?.length || 0} denetim sorusu</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-12 text-center">
            <Search className="mx-auto mb-3 h-7 w-7 text-muted-foreground" />
            <p className="font-semibold text-foreground">Aramanızla eşleşen regülasyon bulunamadı.</p>
            <p className="mt-1 text-sm text-muted-foreground">Kural numarası, ekipman, belge veya operasyon adıyla tekrar deneyin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Regulations;
