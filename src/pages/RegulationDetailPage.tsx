import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { AppSymbol } from "@/components/ui/AppSymbol";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { hapticImpact, hapticSelection } from "@/lib/haptics";
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

function SectionBlock({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <h2 className="px-1 text-lg font-semibold tracking-[-0.015em] text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function DisclosureRow({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <details className="ios-disclosure-row ios-list-row group">
      <summary
        onClick={() => hapticSelection()}
        className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60 [&::-webkit-details-marker]:hidden"
      >
        <span className="min-w-0 flex-1 text-[0.9375rem] font-semibold leading-snug text-foreground">
          {title}
        </span>
        {meta ? (
          <span className="max-w-[38%] truncate text-xs font-medium text-muted-foreground">{meta}</span>
        ) : null}
        <AppSymbol
          name="chevron.down"
          fallback={ChevronDown}
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-control group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-border/60 px-4 pb-4 pt-3 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

function ContentLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-foreground/75">
      {children}
    </p>
  );
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.68rem] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2">
      {items.map((item, index) => (
        <li key={item} className="flex gap-2.5">
          <span className="min-w-5 shrink-0 font-semibold tabular-nums text-primary">{index + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function InternalLinkRow({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      onClick={() => hapticImpact("light")}
      className="ios-list-row flex min-h-14 items-center gap-3 px-4 py-3 text-[0.9375rem] font-semibold text-foreground outline-none transition-colors duration-control hover:bg-foreground/[0.035] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60"
    >
      <span className="min-w-0 flex-1">{label}</span>
      <AppSymbol name="chevron.right" fallback={ChevronRight} className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}

function ExternalLinkRow({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => hapticImpact("light")}
      className="ios-list-row flex min-h-14 items-center gap-3 px-4 py-3 text-[0.9375rem] font-semibold text-foreground outline-none transition-colors duration-control hover:bg-foreground/[0.035] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60"
    >
      <span className="min-w-0 flex-1">{label}</span>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
    </a>
  );
}

function Overview({
  overview,
  history,
  learningObjectives,
  applicability,
  essentials,
  actions,
}: {
  overview: string;
  history?: string;
  learningObjectives?: string[];
  applicability?: string[];
  essentials: string[];
  actions: string[];
}) {
  return (
    <SectionBlock title="Özet">
      <InsetGroupedList>
        <article className="ios-list-row px-4 py-4 text-sm leading-7 text-muted-foreground">
          {overview}
        </article>
        {history ? (
          <DisclosureRow title="Tarihçe ve sistem içindeki yeri">
            <p>{history}</p>
          </DisclosureRow>
        ) : null}
        {learningObjectives?.length ? (
          <DisclosureRow title="Bu içeriğin sonunda neyi yapabilmelisiniz?">
            <TextList items={learningObjectives} />
          </DisclosureRow>
        ) : null}
        {applicability?.length ? (
          <DisclosureRow title="Uygulama kapsamı">
            <TextList items={applicability} />
          </DisclosureRow>
        ) : null}
        <DisclosureRow title="Temel odak alanları">
          <TextList items={essentials} />
        </DisclosureRow>
        <DisclosureRow title="Kritik aksiyonlar">
          <TextList items={actions} />
        </DisclosureRow>
      </InsetGroupedList>
    </SectionBlock>
  );
}

function NarrativeChapters({ chapters }: { chapters: RegulationNarrativeChapter[] }) {
  return (
    <SectionBlock id="kapsamli-ders" title="Kapsamlı konu anlatımı">
      <InsetGroupedList>
        {chapters.map((chapter) => (
          <DisclosureRow key={chapter.id} title={chapter.title}>
            <p className="text-foreground/85">{chapter.introduction}</p>

            <div className="mt-5 space-y-6">
              {chapter.sections.map((section) => (
                <article key={`${chapter.id}-${section.heading}`} className="border-t border-border/60 pt-5 first:border-t-0 first:pt-0">
                  <h3 className="text-base font-semibold leading-snug text-foreground">{section.heading}</h3>
                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={`${section.heading}-${index}`}>{paragraph}</p>
                    ))}
                  </div>

                  {section.references?.length ? (
                    <p className="mt-3 text-xs font-medium text-primary">{section.references.join(" · ")}</p>
                  ) : null}

                  {section.shipboardMeaning ? (
                    <div className="mt-4 border-l-2 border-emerald-500/55 pl-3">
                      <ContentLabel>Gemideki karşılığı</ContentLabel>
                      <p>{section.shipboardMeaning}</p>
                    </div>
                  ) : null}

                  {section.commonMistakes?.length ? (
                    <div className="mt-4 border-l-2 border-amber-500/55 pl-3">
                      <ContentLabel>Sık karıştırılan noktalar</ContentLabel>
                      <TextList items={section.commonMistakes} />
                    </div>
                  ) : null}

                  {section.scenario ? (
                    <div className="mt-4 border-l-2 border-primary/55 pl-3">
                      <ContentLabel>{section.scenario.title}</ContentLabel>
                      <div className="space-y-3">
                        <div>
                          <ContentLabel>Durum</ContentLabel>
                          <p>{section.scenario.situation}</p>
                        </div>
                        <div>
                          <ContentLabel>Kural analizi</ContentLabel>
                          <p>{section.scenario.analysis}</p>
                        </div>
                        <div>
                          <ContentLabel>Doğru yaklaşım</ContentLabel>
                          <p>{section.scenario.correctApproach}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            {chapter.chapterTakeaways?.length ? (
              <div className="mt-5 border-t border-border/60 pt-4">
                <ContentLabel>Bölüm sonu kazanımları</ContentLabel>
                <TextList items={chapter.chapterTakeaways} />
              </div>
            ) : null}
          </DisclosureRow>
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function DetailedSections({ sections }: { sections: RegulationDetailedSection[] }) {
  return (
    <SectionBlock id="konu-anlatimi" title="Hızlı kuramsal harita">
      <InsetGroupedList>
        {sections.map((section) => (
          <DisclosureRow key={section.heading} title={section.heading}>
            <p className="whitespace-pre-line">{section.body}</p>
          </DisclosureRow>
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function OperationalRequirements({
  requirements,
}: {
  requirements: RegulationOperationalRequirement[];
}) {
  return (
    <SectionBlock id="gemi-uygulamasi" title="Gemide nasıl uygulanır?">
      <InsetGroupedList>
        {requirements.map((entry) => (
          <DisclosureRow
            key={`${entry.regulatoryBasis}-${entry.title}`}
            title={entry.title}
            meta={entry.regulatoryBasis}
          >
            <div className="space-y-4">
              <div>
                <ContentLabel>Dayanak</ContentLabel>
                <p>{entry.regulatoryBasis}</p>
              </div>
              <div>
                <ContentLabel>Gereklilik</ContentLabel>
                <p>{entry.requirement}</p>
              </div>
              <div>
                <ContentLabel>Neden önemli?</ContentLabel>
                <p>{entry.rationale}</p>
              </div>
              <div>
                <ContentLabel>Sorumlu</ContentLabel>
                <p>{entry.responsibleRoles.join(" · ")}</p>
              </div>
              <div>
                <ContentLabel>Gemide beklenen objektif kanıt</ContentLabel>
                <TextList items={entry.onboardEvidence} />
              </div>
              <div>
                <ContentLabel>Nasıl doğrulanır?</ContentLabel>
                <NumberedList items={entry.verification} />
              </div>
              <div className="border-l-2 border-destructive/55 pl-3">
                <ContentLabel>Yaygın başarısızlık</ContentLabel>
                <p>{entry.commonFailure}</p>
              </div>
            </div>
          </DisclosureRow>
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function ComplianceCycle({ stages }: { stages: RegulationComplianceStage[] }) {
  return (
    <SectionBlock id="uyum-dongusu" title="Beş aşamalı uyum döngüsü">
      <InsetGroupedList>
        {stages.map((stage) => (
          <DisclosureRow key={stage.stage} title={stage.stage}>
            <div className="space-y-4">
              <div>
                <ContentLabel>Amaç</ContentLabel>
                <p>{stage.objective}</p>
              </div>
              <div>
                <ContentLabel>Uygulama</ContentLabel>
                <TextList items={stage.activities} />
              </div>
              <div>
                <ContentLabel>Çıktı</ContentLabel>
                <TextList items={stage.outputs} />
              </div>
            </div>
          </DisclosureRow>
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function InspectionQuestions({
  questions,
}: {
  questions: RegulationInspectionQuestion[];
}) {
  return (
    <SectionBlock id="denetim-sorulari" title="Denetçinin sorabileceği kritik sorular">
      <InsetGroupedList>
        {questions.map((entry) => (
          <DisclosureRow key={entry.question} title={entry.question}>
            <div className="space-y-4">
              <div>
                <ContentLabel>Beklenen cevap çerçevesi</ContentLabel>
                <p>{entry.expectedAnswer}</p>
              </div>
              <div>
                <ContentLabel>Gösterilecek kanıt</ContentLabel>
                <TextList items={entry.evidence} />
              </div>
              <div className="border-l-2 border-destructive/55 pl-3">
                <ContentLabel>Kırmızı bayraklar</ContentLabel>
                <TextList items={entry.redFlags} />
              </div>
            </div>
          </DisclosureRow>
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function KeyArticles({ articles }: { articles: RegulationKeyArticle[] }) {
  return (
    <SectionBlock id="temel-bolumler" title="Temel bölümler ve kural haritası">
      <InsetGroupedList>
        {articles.map((article) => (
          <DisclosureRow key={`${article.id}-${article.title}`} title={article.title} meta={article.id}>
            <p>{article.summary}</p>
          </DisclosureRow>
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function AmendmentTimeline({ amendments }: { amendments: RegulationAmendment[] }) {
  return (
    <SectionBlock id="degisiklikler" title="Önemli değişiklikler">
      <InsetGroupedList>
        {amendments.map((amendment) => (
          <DisclosureRow
            key={`${amendment.year}-${amendment.description}`}
            title={amendment.year}
          >
            <p>{amendment.description}</p>
          </DisclosureRow>
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function Glossary({ terms }: { terms: RegulationTerm[] }) {
  return (
    <SectionBlock id="terimler" title="Operasyonel sözlük">
      <InsetGroupedList>
        {terms.map((entry) => (
          <DisclosureRow key={entry.term} title={entry.term}>
            <p>{entry.definition}</p>
            {entry.practicalNote ? (
              <div className="mt-3 border-l-2 border-primary/55 pl-3">
                <ContentLabel>Pratik not:</ContentLabel>
                <p>{entry.practicalNote}</p>
              </div>
            ) : null}
          </DisclosureRow>
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function SourceStatus({ status }: { status: RegulationSourceStatus }) {
  return (
    <SectionBlock id="kaynak-durumu" title="Kaynak ve güncellik">
      <InsetGroupedList>
        <article className="ios-list-row px-4 py-4 text-sm leading-7 text-muted-foreground">
          <ContentLabel>Son kaynak kontrolü:</ContentLabel>
          <p className="font-semibold text-foreground">{status.reviewedThrough}</p>
          <p className="mt-2">{status.caution}</p>
        </article>
        {status.officialSources.map((source) => (
          <ExternalLinkRow key={source.href} href={source.href} label={source.label} />
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

function RelatedRegulations({ slugs }: { slugs: string[] }) {
  const related = slugs
    .map((slug) => regulationItemMap[slug])
    .filter((entry) => entry !== undefined);
  if (!related.length) return null;

  return (
    <SectionBlock title="İlişkili regülasyonlar">
      <InsetGroupedList>
        {related.map((entry) => (
          <InternalLinkRow key={entry.slug} to={`/regulations/${entry.slug}`} label={entry.label} />
        ))}
      </InsetGroupedList>
    </SectionBlock>
  );
}

export default function RegulationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const regulation = slug ? regulationItemMap[slug] : undefined;

  if (!regulation) {
    return (
      <LibraryPageShell title="Regülasyon bilgisi bulunamadı" maxWidth="max-w-4xl">
        <div className="py-10" />
      </LibraryPageShell>
    );
  }

  return (
    <LibraryPageShell title={regulation.label} maxWidth="max-w-4xl">
      <main className="space-y-7">
        <Overview
          overview={regulation.overview}
          history={regulation.history}
          learningObjectives={regulation.learningObjectives}
          applicability={regulation.applicability}
          essentials={regulation.essentials}
          actions={regulation.actions}
        />

        {regulation.narrativeChapters?.length ? (
          <NarrativeChapters chapters={regulation.narrativeChapters} />
        ) : null}

        {regulation.detailedSections?.length ? (
          <DetailedSections sections={regulation.detailedSections} />
        ) : null}

        {regulation.operationalRequirements?.length ? (
          <OperationalRequirements requirements={regulation.operationalRequirements} />
        ) : null}

        {regulation.complianceStages?.length ? (
          <ComplianceCycle stages={regulation.complianceStages} />
        ) : null}

        {regulation.inspectionQuestions?.length ? (
          <InspectionQuestions questions={regulation.inspectionQuestions} />
        ) : null}

        {regulation.keyArticles?.length ? <KeyArticles articles={regulation.keyArticles} /> : null}

        {regulation.amendments?.length ? (
          <AmendmentTimeline amendments={regulation.amendments} />
        ) : null}

        {regulation.terms?.length ? <Glossary terms={regulation.terms} /> : null}

        {regulation.penalties?.length ? (
          <SectionBlock title="Yaptırımlar, operasyonel sonuçlar ve detention riski">
            <InsetGroupedList>
              <article className="ios-list-row px-4 py-4 text-sm leading-7 text-muted-foreground">
                <TextList items={regulation.penalties} />
              </article>
            </InsetGroupedList>
          </SectionBlock>
        ) : null}

        {regulation.relatedSlugs?.length ? (
          <RelatedRegulations slugs={regulation.relatedSlugs} />
        ) : null}

        {regulation.sourceStatus ? (
          <SourceStatus status={regulation.sourceStatus} />
        ) : regulation.resources?.length ? (
          <SectionBlock title="Kaynaklar ve bağlantılar">
            <InsetGroupedList>
              {regulation.resources.map((resource) => (
                <ExternalLinkRow key={resource.href} href={resource.href} label={resource.label} />
              ))}
            </InsetGroupedList>
          </SectionBlock>
        ) : null}
      </main>
    </LibraryPageShell>
  );
}
