import { Link, useParams } from "react-router-dom";
import { ExternalLink, ShieldCheck, Sparkles, Clock, BookOpen, AlertTriangle, GitBranch, Scale } from "lucide-react";
import { regulationItemMap } from "@/data/regulationItems";
import type { RegulationAmendment, RegulationKeyArticle } from "@/data/regulationItems";

interface ListProps {
  title: string;
  items: string[];
  icon?: React.ReactNode;
}

const DetailList = ({ title, items, icon }: ListProps) => (
  <div className="space-y-2 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      {icon || <Sparkles className="h-4 w-4 text-primary" />}
      <span>{title}</span>
    </div>
    <ul className="space-y-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-primary">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const AmendmentTimeline = ({ amendments }: { amendments: RegulationAmendment[] }) => (
  <div className="space-y-3 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <Clock className="h-4 w-4 text-primary" />
      <span>Önemli Değişiklikler</span>
    </div>
    <div className="relative space-y-3 pl-4 before:absolute before:left-[7px] before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-primary/30">
      {amendments.map((a, i) => (
        <div key={i} className="relative flex gap-3">
          <div className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
          <div>
            <span className="text-xs font-bold text-primary">{a.year}</span>
            <p className="text-xs text-muted-foreground sm:text-sm">{a.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const KeyArticlesTable = ({ articles }: { articles: RegulationKeyArticle[] }) => (
  <div className="space-y-3 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <BookOpen className="h-4 w-4 text-primary" />
      <span>Temel Bölümler</span>
    </div>
    <div className="space-y-2">
      {articles.map((a, i) => (
        <div key={i} className="rounded-lg border border-border/40 bg-background/50 p-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">{a.id}</span>
            <span className="text-xs font-semibold text-foreground sm:text-sm">{a.title}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{a.summary}</p>
        </div>
      ))}
    </div>
  </div>
);

const RelatedRegulations = ({ slugs }: { slugs: string[] }) => {
  const related = slugs.map((s) => regulationItemMap[s]).filter(Boolean);
  if (related.length === 0) return null;
  return (
    <div className="space-y-2 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <GitBranch className="h-4 w-4 text-primary" />
        <span>İlişkili Regülasyonlar</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {related.map((r) => (
          <Link
            key={r.slug}
            to={`/regulations/${r.slug}`}
            className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/20"
          >
            {r.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function RegulationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const regulation = slug ? regulationItemMap[slug] : undefined;

  if (!regulation) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 px-4 py-12 text-center dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        <p className="text-lg font-semibold text-foreground">Regülasyon bilgisi bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/3 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-white shadow-lg">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">Regülasyon</p>
              <h1 className="text-3xl font-black text-foreground sm:text-4xl">{regulation.label}</h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">{regulation.overview}</p>
        </div>

        {/* History */}
        {regulation.history && (
          <div className="rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Scale className="h-4 w-4 text-primary" />
              <span>Tarihçe</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{regulation.history}</p>
          </div>
        )}

        {/* Applicability */}
        {regulation.applicability && regulation.applicability.length > 0 && (
          <DetailList title="Uygulama Kapsamı" items={regulation.applicability} icon={<BookOpen className="h-4 w-4 text-primary" />} />
        )}

        {/* Essentials & Actions */}
        <div className="grid gap-3 sm:grid-cols-2">
          <DetailList title="Temel Odak Alanları" items={regulation.essentials} />
          <DetailList title="Kritik Aksiyonlar" items={regulation.actions} />
        </div>

        {/* Key Articles */}
        {regulation.keyArticles && regulation.keyArticles.length > 0 && (
          <KeyArticlesTable articles={regulation.keyArticles} />
        )}

        {/* Amendments Timeline */}
        {regulation.amendments && regulation.amendments.length > 0 && (
          <AmendmentTimeline amendments={regulation.amendments} />
        )}

        {/* Penalties */}
        {regulation.penalties && regulation.penalties.length > 0 && (
          <DetailList title="Yaptırımlar ve Cezalar" items={regulation.penalties} icon={<AlertTriangle className="h-4 w-4 text-destructive" />} />
        )}

        {/* Related Regulations */}
        {regulation.relatedSlugs && regulation.relatedSlugs.length > 0 && (
          <RelatedRegulations slugs={regulation.relatedSlugs} />
        )}

        {/* Resources */}
        {regulation.resources && (
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 text-sm text-foreground shadow-inner sm:p-6">
            <p className="mb-3 text-base font-semibold text-primary">Kaynaklar ve bağlantılar</p>
            <ul className="space-y-2 text-muted-foreground">
              {regulation.resources.map((resource) => (
                <li key={resource.href} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-primary" />
                  <a href={resource.href} target="_blank" rel="noreferrer" className="font-semibold text-foreground transition hover:text-primary">
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
