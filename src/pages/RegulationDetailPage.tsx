import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  ExternalLink,
  FileCheck2,
  GitBranch,
  GraduationCap,
  HelpCircle,
  ListChecks,
  Scale,
  ShieldCheck,
  ShipWheel,
  Sparkles,
  Users,
} from "lucide-react";
import { regulationItemMap } from "@/data/regulationItems";
import type {
  RegulationAmendment,
  RegulationComplianceStage,
  RegulationDetailedSection,
  RegulationInspectionQuestion,
  RegulationKeyArticle,
  RegulationNarrativeChapter,
  RegulationOperationalRequirement,
  RegulationSourceStatus,
  RegulationTerm,
} from "@/data/regulationItems";

interface ListProps {
  title: string;
  items: string[];
  icon?: ReactNode;
  id?: string;
}

const DetailList = ({ title, items, icon, id }: ListProps) => (
  <section id={id} className="scroll-mt-20 space-y-2 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      {icon || <Sparkles className="h-4 w-4 text-primary" />}
      <h2>{title}</h2>
    </div>
    <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

const SectionHeader = ({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div className="mb-4">
    <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
      {icon}
      <span>{eyebrow}</span>
    </div>
    <h2 className="text-xl font-black text-foreground sm:text-2xl">{title}</h2>
    {description && <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
  </div>
);

const NarrativeChapters = ({ chapters }: { chapters: RegulationNarrativeChapter[] }) => (
  <section id="kapsamli-ders" className="scroll-mt-20">
    <SectionHeader
      icon={<BookOpen className="h-4 w-4" />}
      eyebrow="Ders kitabı anlatımı"
      title="Kapsamlı konu anlatımı"
      description="Hukukî yapıdan madde mantığına, gemideki karşılıktan vaka çözümüne ilerleyen bölümleri okuyun. Her bölüm; referans, yaygın hata ve operasyonel sonuçla tamamlanır."
    />
    <div className="space-y-5">
      {chapters.map((entry, chapterIndex) => (
        <details
          key={entry.id}
          open={chapterIndex === 0}
          className="group overflow-hidden rounded-2xl border border-primary/25 bg-card/75 shadow-sm open:border-primary/40"
        >
          <summary className="flex cursor-pointer list-none items-start gap-3 bg-gradient-to-r from-primary/[0.12] via-primary/[0.06] to-transparent p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground shadow-sm">
              {String(chapterIndex + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-black leading-snug text-foreground sm:text-xl">{entry.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.introduction}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                {entry.sections.length} alt konu · Açmak/kapatmak için dokunun
              </p>
            </div>
            <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" />
          </summary>

          <div className="space-y-5 border-t border-border/50 p-4 sm:p-6">
            {entry.sections.map((narrativeSection, sectionIndex) => (
              <article
                key={`${entry.id}-${narrativeSection.heading}`}
                className="rounded-2xl border border-border/55 bg-background/55 p-4 sm:p-5"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-xs font-black text-primary">
                    {chapterIndex + 1}.{sectionIndex + 1}
                  </span>
                  <h4 className="pt-0.5 text-sm font-black leading-relaxed text-foreground sm:text-lg">
                    {narrativeSection.heading}
                  </h4>
                </div>

                <div className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-8">
                  {narrativeSection.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${narrativeSection.heading}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>

                {narrativeSection.references && narrativeSection.references.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2" aria-label="İlgili kural ve kaynaklar">
                    {narrativeSection.references.map((reference) => (
                      <span
                        key={reference}
                        className="rounded-full border border-sky-500/20 bg-sky-500/[0.07] px-2.5 py-1 text-[10px] font-bold text-sky-600 dark:text-sky-400"
                      >
                        {reference}
                      </span>
                    ))}
                  </div>
                )}

                {narrativeSection.shipboardMeaning && (
                  <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] p-3 sm:p-4">
                    <p className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                      <ShipWheel className="h-4 w-4" />
                      Gemideki karşılığı
                    </p>
                    <p className="text-sm leading-7 text-muted-foreground">{narrativeSection.shipboardMeaning}</p>
                  </div>
                )}

                {narrativeSection.commonMistakes && narrativeSection.commonMistakes.length > 0 && (
                  <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3 sm:p-4">
                    <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="h-4 w-4" />
                      Sık karıştırılan noktalar
                    </p>
                    <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                      {narrativeSection.commonMistakes.map((mistake) => (
                        <li key={mistake} className="flex gap-2">
                          <span className="text-amber-500">•</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {narrativeSection.scenario && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-violet-500/25 bg-violet-500/[0.05]">
                    <div className="border-b border-violet-500/15 bg-violet-500/[0.08] px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">
                        Vaka analizi
                      </p>
                      <h5 className="mt-1 font-black text-foreground">{narrativeSection.scenario.title}</h5>
                    </div>
                    <div className="grid gap-3 p-4 lg:grid-cols-3">
                      <div>
                        <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-muted-foreground">Durum</p>
                        <p className="text-sm leading-6 text-muted-foreground">{narrativeSection.scenario.situation}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-violet-600 dark:text-violet-400">Kural analizi</p>
                        <p className="text-sm leading-6 text-muted-foreground">{narrativeSection.scenario.analysis}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Doğru yaklaşım</p>
                        <p className="text-sm leading-6 text-muted-foreground">{narrativeSection.scenario.correctApproach}</p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}

            {entry.chapterTakeaways && entry.chapterTakeaways.length > 0 && (
              <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-4">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-primary">Bölüm sonu kazanımları</p>
                <ul className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                  {entry.chapterTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  </section>
);

const DetailedSections = ({ sections }: { sections: RegulationDetailedSection[] }) => (
  <section
    id="konu-anlatimi"
    className="scroll-mt-20 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.07] via-card/70 to-transparent p-4 shadow-sm sm:p-6"
  >
    <SectionHeader
      icon={<GraduationCap className="h-4 w-4" />}
      eyebrow="Kuramsal temel"
      title="Hızlı kuramsal harita"
      description="Kapsamlı dersin ardından ana kavramları mevcut özet bölümleriyle hızlıca tekrar edin."
    />
    <div className="space-y-4">
      {sections.map((section, index) => (
        <article key={section.heading} className="rounded-xl border border-border/40 bg-background/50 p-4 sm:p-5">
          <h3 className="mb-3 flex items-start gap-2 text-sm font-bold text-primary sm:text-base">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
              {index + 1}
            </span>
            <span>{section.heading}</span>
          </h3>
          <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">{section.body}</p>
        </article>
      ))}
    </div>
  </section>
);

const LearningObjectives = ({ objectives }: { objectives: string[] }) => (
  <section
    id="ogrenme-hedefleri"
    className="scroll-mt-20 rounded-2xl border border-sky-500/25 bg-sky-500/[0.06] p-4 sm:p-6"
  >
    <SectionHeader
      icon={<ListChecks className="h-4 w-4" />}
      eyebrow="Okuma rotası"
      title="Bu içeriğin sonunda neyi yapabilmelisiniz?"
    />
    <div className="grid gap-3 md:grid-cols-2">
      {objectives.map((objective, index) => (
        <div key={objective} className="flex gap-3 rounded-xl border border-border/40 bg-background/45 p-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-xs font-black text-sky-500">
            {index + 1}
          </span>
          <p className="text-sm leading-relaxed text-foreground/85">{objective}</p>
        </div>
      ))}
    </div>
  </section>
);

const OperationalRequirements = ({ requirements }: { requirements: RegulationOperationalRequirement[] }) => (
  <section id="gemi-uygulamasi" className="scroll-mt-20">
    <SectionHeader
      icon={<ShipWheel className="h-4 w-4" />}
      eyebrow="Kuraldan operasyona"
      title="Gemide nasıl uygulanır?"
      description="Her gerekliliği hukukî dayanak, emniyet gerekçesi, sorumlu roller, objektif kanıt ve doğrulama adımlarıyla izleyin."
    />
    <div className="space-y-4">
      {requirements.map((entry, index) => (
        <article key={`${entry.regulatoryBasis}-${entry.title}`} className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm">
          <div className="border-b border-border/50 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-black text-foreground sm:text-lg">{entry.title}</h3>
                  <p className="mt-1 text-xs font-bold text-primary">{entry.regulatoryBasis}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entry.responsibleRoles.map((role) => (
                  <span key={role} className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-foreground">Gereklilik</p>
              <p className="text-sm leading-7 text-muted-foreground">{entry.requirement}</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.07] p-3">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">Neden önemli?</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry.rationale}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <FileCheck2 className="h-4 w-4 text-emerald-500" />
                  Gemide beklenen objektif kanıt
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {entry.onboardEvidence.map((evidence) => (
                    <li key={evidence} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <ClipboardCheck className="h-4 w-4 text-sky-500" />
                  Nasıl doğrulanır?
                </h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {entry.verification.map((step, stepIndex) => (
                    <li key={step} className="flex gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-[10px] font-black text-sky-500">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex gap-2 rounded-xl border border-destructive/20 bg-destructive/[0.06] p-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <div>
                <p className="text-xs font-bold text-destructive">Yaygın başarısızlık</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{entry.commonFailure}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const ComplianceCycle = ({ stages }: { stages: RegulationComplianceStage[] }) => (
  <section
    id="uyum-dongusu"
    className="scroll-mt-20 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05] p-4 sm:p-6"
  >
    <SectionHeader
      icon={<GitBranch className="h-4 w-4" />}
      eyebrow="Süreklilik"
      title="Beş aşamalı uyum döngüsü"
      description="Bir defalık denetim hazırlığı yerine, uygulanabilirlikten değişiklik yönetimine uzanan kalıcı sistemi kurun."
    />
    <div className="space-y-3">
      {stages.map((stage, index) => (
        <article key={stage.stage} className="grid gap-3 rounded-xl border border-border/40 bg-background/45 p-4 md:grid-cols-[2fr_3fr_2fr]">
          <div>
            <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{stage.stage}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/85">{stage.objective}</p>
          </div>
          <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            {stage.activities.map((activity) => (
              <li key={activity} className="flex gap-2">
                <span className="text-emerald-500">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-lg bg-emerald-500/[0.08] p-3">
            <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              Çıktı
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">{stage.outputs.join(" · ")}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const InspectionQuestions = ({ questions }: { questions: RegulationInspectionQuestion[] }) => (
  <section id="denetim-sorulari" className="scroll-mt-20">
    <SectionHeader
      icon={<HelpCircle className="h-4 w-4" />}
      eyebrow="PSC · Sörvey · Sözlü hazırlık"
      title="Denetçinin sorabileceği kritik sorular"
      description="Cevabın yalnız metnini değil, gösterilmesi gereken kanıtı ve ayrıntılı denetimi tetikleyebilecek kırmızı bayrakları görün."
    />
    <div className="space-y-3">
      {questions.map((entry, index) => (
        <details key={entry.question} className="group rounded-xl border border-border/60 bg-card/70 shadow-sm open:border-primary/30">
          <summary className="flex cursor-pointer list-none items-start gap-3 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-xs font-black text-primary">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 text-sm font-bold leading-relaxed text-foreground sm:text-base">{entry.question}</span>
            <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-180" />
          </summary>
          <div className="grid gap-4 border-t border-border/50 p-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-xs font-black uppercase tracking-wide text-primary">Beklenen cevap çerçevesi</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{entry.expectedAnswer}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Gösterilecek kanıt</p>
                <div className="flex flex-wrap gap-2">
                  {entry.evidence.map((evidence) => (
                    <span key={evidence} className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-1 text-xs text-muted-foreground">
                      {evidence}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-destructive/20 bg-destructive/[0.06] p-3">
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-destructive">Kırmızı bayraklar</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {entry.redFlags.map((flag) => (
                  <li key={flag} className="flex gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      ))}
    </div>
  </section>
);

const KeyArticlesTable = ({ articles }: { articles: RegulationKeyArticle[] }) => (
  <section id="temel-bolumler" className="scroll-mt-20 space-y-3 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <BookOpen className="h-4 w-4 text-primary" />
      <h2>Temel bölümler ve kural haritası</h2>
    </div>
    <div className="grid gap-2 md:grid-cols-2">
      {articles.map((article) => (
        <article key={`${article.id}-${article.title}`} className="rounded-lg border border-border/40 bg-background/50 p-3">
          <div className="flex items-start gap-2">
            <span className="shrink-0 rounded bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">{article.id}</span>
            <h3 className="text-xs font-semibold text-foreground sm:text-sm">{article.title}</h3>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{article.summary}</p>
        </article>
      ))}
    </div>
  </section>
);

const AmendmentTimeline = ({ amendments }: { amendments: RegulationAmendment[] }) => (
  <section id="degisiklikler" className="scroll-mt-20 space-y-3 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <Clock className="h-4 w-4 text-primary" />
      <h2>Önemli değişiklikler</h2>
    </div>
    <div className="relative space-y-3 pl-4 before:absolute before:left-[7px] before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-primary/30">
      {amendments.map((amendment) => (
        <div key={`${amendment.year}-${amendment.description}`} className="relative flex gap-3">
          <div className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
          <div>
            <span className="text-xs font-bold text-primary">{amendment.year}</span>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{amendment.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Glossary = ({ terms }: { terms: RegulationTerm[] }) => (
  <section id="terimler" className="scroll-mt-20">
    <SectionHeader icon={<BookOpen className="h-4 w-4" />} eyebrow="Terminoloji" title="Operasyonel sözlük" />
    <dl className="grid gap-3 md:grid-cols-2">
      {terms.map((entry) => (
        <div key={entry.term} className="rounded-xl border border-border/60 bg-card/70 p-4">
          <dt className="font-black text-primary">{entry.term}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.definition}</dd>
          {entry.practicalNote && (
            <dd className="mt-2 rounded-lg bg-primary/[0.07] p-2 text-xs leading-relaxed text-foreground/75">
              <strong>Pratik not:</strong> {entry.practicalNote}
            </dd>
          )}
        </div>
      ))}
    </dl>
  </section>
);

const RelatedRegulations = ({ slugs }: { slugs: string[] }) => {
  const related = slugs.map((slug) => regulationItemMap[slug]).filter(Boolean);
  if (related.length === 0) return null;

  return (
    <section className="space-y-2 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <GitBranch className="h-4 w-4 text-primary" />
        <h2>İlişkili regülasyonlar</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {related.map((entry) => (
          <Link
            key={entry.slug}
            to={`/regulations/${entry.slug}`}
            className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/20"
          >
            {entry.label}
          </Link>
        ))}
      </div>
    </section>
  );
};

const SourceStatus = ({ status }: { status: RegulationSourceStatus }) => (
  <section id="kaynak-durumu" className="scroll-mt-20 rounded-2xl border border-sky-500/25 bg-sky-500/[0.06] p-4 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Kaynak ve güncellik</p>
        <h2 className="mt-1 text-lg font-black text-foreground">Son kaynak kontrolü: {status.reviewedThrough}</h2>
      </div>
      <span className="rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-[10px] font-bold text-sky-500">
        Resmî metin ayrıca doğrulanmalı
      </span>
    </div>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{status.caution}</p>
    {status.officialSources.length > 0 && (
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {status.officialSources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/45 p-3 text-sm font-semibold text-foreground transition hover:border-sky-500/30 hover:text-sky-500"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              <span>{source.label}</span>
            </a>
          </li>
        ))}
      </ul>
    )}
  </section>
);

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

  const toc = [
    regulation.learningObjectives?.length && ["ogrenme-hedefleri", "Öğrenme hedefleri"],
    regulation.narrativeChapters?.length && ["kapsamli-ders", "Kapsamlı ders"],
    regulation.detailedSections?.length && ["konu-anlatimi", "Hızlı kuramsal harita"],
    regulation.operationalRequirements?.length && ["gemi-uygulamasi", "Gemide uygulama"],
    regulation.complianceStages?.length && ["uyum-dongusu", "Uyum döngüsü"],
    regulation.inspectionQuestions?.length && ["denetim-sorulari", "Denetim soruları"],
    regulation.keyArticles?.length && ["temel-bolumler", "Kural haritası"],
    regulation.terms?.length && ["terimler", "Terimler"],
    regulation.sourceStatus && ["kaynak-durumu", "Kaynak durumu"],
  ].filter(Boolean) as string[][];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/3 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-6 rounded-2xl border border-border/50 bg-card/65 p-4 shadow-sm backdrop-blur-md sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-white shadow-lg">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">{regulation.category}</p>
                <h1 className="mt-1 text-2xl font-black leading-tight text-foreground sm:text-4xl">{regulation.label}</h1>
              </div>
            </div>
            <p className="max-w-5xl text-sm leading-7 text-muted-foreground sm:text-base">{regulation.overview}</p>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-muted-foreground">
              <span className="rounded-full border border-border/60 bg-background/50 px-3 py-1">
                {regulation.narrativeChapters?.length || 0} kapsamlı ders bölümü
              </span>
              <span className="rounded-full border border-border/60 bg-background/50 px-3 py-1">
                {regulation.narrativeChapters?.reduce((total, entry) => total + entry.sections.length, 0) || 0} alt konu
              </span>
              <span className="rounded-full border border-border/60 bg-background/50 px-3 py-1">
                {regulation.operationalRequirements?.length || 0} operasyonel gereklilik
              </span>
              <span className="rounded-full border border-border/60 bg-background/50 px-3 py-1">
                {regulation.inspectionQuestions?.length || 0} denetim sorusu
              </span>
            </div>
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden lg:sticky lg:top-5 lg:block">
            <nav className="rounded-2xl border border-border/60 bg-card/75 p-3 shadow-sm backdrop-blur-md" aria-label="İçerik haritası">
              <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">İçerik haritası</p>
              <ul className="space-y-1">
                {toc.map(([id, label], index) => (
                  <li key={id}>
                    <a href={`#${id}`} className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-primary/10 hover:text-primary">
                      <span className="text-[10px] text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="min-w-0 space-y-6">
            {regulation.history && (
              <section className="rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Scale className="h-4 w-4 text-primary" />
                  <h2>Tarihçe ve sistem içindeki yeri</h2>
                </div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{regulation.history}</p>
              </section>
            )}

            {regulation.learningObjectives && regulation.learningObjectives.length > 0 && (
              <LearningObjectives objectives={regulation.learningObjectives} />
            )}

            {regulation.narrativeChapters && regulation.narrativeChapters.length > 0 && (
              <NarrativeChapters chapters={regulation.narrativeChapters} />
            )}

            {regulation.detailedSections && regulation.detailedSections.length > 0 && (
              <DetailedSections sections={regulation.detailedSections} />
            )}

            {regulation.applicability && regulation.applicability.length > 0 && (
              <DetailList
                title="Uygulama kapsamı"
                items={regulation.applicability}
                icon={<BookOpen className="h-4 w-4 text-primary" />}
              />
            )}

            {regulation.operationalRequirements && regulation.operationalRequirements.length > 0 && (
              <OperationalRequirements requirements={regulation.operationalRequirements} />
            )}

            {regulation.complianceStages && regulation.complianceStages.length > 0 && (
              <ComplianceCycle stages={regulation.complianceStages} />
            )}

            {regulation.inspectionQuestions && regulation.inspectionQuestions.length > 0 && (
              <InspectionQuestions questions={regulation.inspectionQuestions} />
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailList title="Temel odak alanları" items={regulation.essentials} />
              <DetailList title="Kritik aksiyonlar" items={regulation.actions} />
            </div>

            {regulation.keyArticles && regulation.keyArticles.length > 0 && (
              <KeyArticlesTable articles={regulation.keyArticles} />
            )}

            {regulation.amendments && regulation.amendments.length > 0 && (
              <AmendmentTimeline amendments={regulation.amendments} />
            )}

            {regulation.terms && regulation.terms.length > 0 && <Glossary terms={regulation.terms} />}

            {regulation.penalties && regulation.penalties.length > 0 && (
              <DetailList
                title="Yaptırımlar, operasyonel sonuçlar ve detention riski"
                items={regulation.penalties}
                icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
              />
            )}

            {regulation.relatedSlugs && regulation.relatedSlugs.length > 0 && (
              <RelatedRegulations slugs={regulation.relatedSlugs} />
            )}

            {regulation.sourceStatus ? (
              <SourceStatus status={regulation.sourceStatus} />
            ) : (
              regulation.resources && (
                <section className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 text-sm text-foreground shadow-inner sm:p-6">
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
                </section>
              )
            )}

            <section className="flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/[0.07] p-4">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <h2 className="font-bold text-foreground">Gemide kullanım ilkesi</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Denetimde ezber cümle yerine gemiye özgü uygulamayı gösterin: hangi hüküm uygulanıyor,
                  kim sorumlu, işlem nasıl yapılıyor, hangi kayıt oluşuyor ve arıza halinde emniyet nasıl korunuyor?
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
