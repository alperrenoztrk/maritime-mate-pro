import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink, FileText } from "lucide-react";
import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";
import { createRegulationReadingPlan, type RegulationReadingStep } from "@/lib/regulationReadingPlan";
import { regulationItemMap } from "@/data/regulationItems";
import type { RegulationItem } from "@/data/regulations/types";
import { Button } from "@/components/ui/button";

function TextList({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag className="list-inside space-y-3 leading-relaxed marker:font-bold marker:text-primary">
      {items.map((item, index) => (
        <li key={index} className={ordered ? "list-decimal" : "list-disc"}>{item}</li>
      ))}
    </ListTag>
  );
}

function ReadingNote({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="space-y-2 rounded-xl border border-border/60 bg-muted/20 p-4">
      <h3 className="text-sm font-bold text-foreground">{heading}</h3>
      <div className="space-y-3 text-sm leading-7 text-foreground/85">{children}</div>
    </section>
  );
}

function renderRegulationContent(item: RegulationItem, page: RegulationReadingStep): ReactNode {
  const selected = (page.itemIndex ?? 0);
  const slice = <T,>(list: readonly T[] | undefined) => (list ?? []).slice(page.start ?? 0, page.end);
  const chapter = item.narrativeChapters?.[page.chapterIndex ?? 0];
  const narrative = chapter?.sections[page.sectionIndex ?? 0];

  switch (page.kind) {
    case "overview":
      return <div className="space-y-4"><p>{item.overview}</p>
        <ReadingNote heading="About this instrument">{item.category}</ReadingNote>
        <p className="text-xs text-muted-foreground">Educational reference — always verify the applicable official text and amendments.</p>
      </div>;
    case "history":
      return <p className="whitespace-pre-line">{item.history}</p>;
    case "learning":
      return <TextList ordered items={slice(item.learningObjectives)} />;
    case "chapter":
      return <div className="space-y-4">
        <p>{chapter?.introduction}</p>
        <p className="text-sm text-muted-foreground">This chapter has {chapter?.sections.length ?? 0} subtopics. Continue to read them individually.</p>
      </div>;
    case "narrative":
      return <div className="space-y-5">
        {slice(narrative?.paragraphs).map((paragraph, index) =>
          <p key={index} className="whitespace-pre-line">{paragraph}</p>)}
      </div>;
    case "narrative-application":
      return <div className="space-y-4">
        {narrative?.references?.length ? <ReadingNote heading="Relevant regulation references"><TextList items={narrative.references} /></ReadingNote> : null}
        {narrative?.shipboardMeaning ? <ReadingNote heading="What this means on board"><p>{narrative.shipboardMeaning}</p></ReadingNote> : null}
        {narrative?.commonMistakes?.length ? <ReadingNote heading="Common misunderstandings"><TextList items={narrative.commonMistakes} /></ReadingNote> : null}
        {narrative?.scenario ? <ReadingNote heading={`Case study: ${narrative.scenario.title}`}>
          <p><strong>Situation:</strong> {narrative.scenario.situation}</p>
          <p><strong>Legal analysis:</strong> {narrative.scenario.analysis}</p>
          <p><strong>Appropriate response:</strong> {narrative.scenario.correctApproach}</p>
        </ReadingNote> : null}
      </div>;
    case "chapter-takeaways":
      return <TextList items={slice(chapter?.chapterTakeaways)} />;
    case "detailed":
      return <p className="whitespace-pre-line">{item.detailedSections?.[selected].body}</p>;
    case "applicability":
      return <TextList items={slice(item.applicability)} />;
    case "operational": {
      const v = item.operationalRequirements?.[selected];
      return v && <div className="space-y-4">
        <ReadingNote heading="Regulatory basis"><p>{v.regulatoryBasis}</p></ReadingNote>
        <p>{v.requirement}</p>
        <ReadingNote heading="Why this matters"><p>{v.rationale}</p></ReadingNote>
        <ReadingNote heading="Responsible roles"><TextList items={v.responsibleRoles} /></ReadingNote>
        <ReadingNote heading="Evidence expected on board"><TextList items={v.onboardEvidence} /></ReadingNote>
        <ReadingNote heading="How to verify"><TextList ordered items={v.verification} /></ReadingNote>
        <ReadingNote heading="Common deficiency"><p>{v.commonFailure}</p></ReadingNote>
      </div>;
    }
    case "compliance": {
      const v = item.complianceStages?.[selected];
      return v && <div className="space-y-4">
        <p>{v.objective}</p>
        <ReadingNote heading="Activities"><TextList items={v.activities} /></ReadingNote>
        <ReadingNote heading="Expected outputs"><TextList items={v.outputs} /></ReadingNote>
      </div>;
    }
    case "inspection": {
      const v = item.inspectionQuestions?.[selected];
      return v && <div className="space-y-4">
        {v.reference && <ReadingNote heading="Source provision">
          <p>{v.reference.id} {v.reference.title}</p><p>{v.reference.summary}</p>
        </ReadingNote>}
        <ReadingNote heading="Expected answer"><p>{v.expectedAnswer}</p></ReadingNote>
        <ReadingNote heading="Evidence to show"><TextList items={v.evidence} /></ReadingNote>
        <ReadingNote heading="Inspection red flags"><TextList items={v.redFlags} /></ReadingNote>
      </div>;
    }
    case "essentials":
      return <TextList items={slice(item.essentials)} />;
    case "actions":
      return <TextList items={slice(item.actions)} />;
    case "article": {
      const v = item.keyArticles?.[selected];
      return <div className="space-y-4"><ReadingNote heading={v?.id ?? "Reference"}>{v?.summary}</ReadingNote></div>;
    }
    case "amendments":
      return <div className="space-y-4">{slice(item.amendments).map((v) =>
        <ReadingNote key={v.year + v.description} heading={v.year}><p>{v.description}</p></ReadingNote>)}</div>;
    case "terms":
      return <dl className="space-y-4">{slice(item.terms).map((v) =>
        <div key={v.term}><dt className="font-bold text-primary">{v.term}</dt>
          <dd className="mt-1">{v.definition}</dd>
          {v.practicalNote && <dd className="mt-2 text-sm text-muted-foreground"><strong>Shipboard:</strong> {v.practicalNote}</dd>}
        </div>)}</dl>;
    case "penalties":
      return <TextList items={slice(item.penalties)} />;
    case "related":
      return <div className="grid gap-2">{slice(item.relatedSlugs).map((slug) => {
        const related = regulationItemMap[slug];
        return related ? <Link key={slug} className="rounded-lg border border-border/60 p-3 text-sm font-semibold text-primary"
          to={`/regulations/${slug}`}>{related.label}</Link> : null;
      })}</div>;
    case "sources":
      return <div className="space-y-4">
        {item.sourceStatus && <>
          <ReadingNote heading={`Last reviewed: ${item.sourceStatus.reviewedThrough}`}><p>{item.sourceStatus.caution}</p></ReadingNote>
          {item.sourceStatus.officialSources.map((source) =>
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/60 p-3 text-sm font-semibold text-primary">
              <ExternalLink className="h-4 w-4 shrink-0" />{source.label}
            </a>)}
        </>}
        {item.resources?.map((resource) =>
          <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border/60 p-3 text-sm text-primary">
            <ExternalLink className="h-4 w-4 shrink-0" />{resource.label}
          </a>)}
      </div>;
    case "closing":
      return <div className="space-y-4">
        <p>Apply the rules using the ship’s actual procedures and documents, not a memorised statement alone.</p>
        <ReadingNote heading="Inspect, explain, demonstrate">
          <TextList items={[
            "Identify the applicable provision and edition.",
            "Explain who is responsible and what must be performed.",
            "Identify the evidence and records expected on board.",
            "Explain how deviations and failures are dealt with safely.",
          ]} />
        </ReadingNote>
      </div>;
    default:
      return null;
  }
}

export default function RegulationPagedReaderPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? regulationItemMap[slug] : undefined;
  if (!item) return <div className="p-8 text-center text-muted-foreground">Regulation not found.</div>;
  const pages: ReadingPage[] = createRegulationReadingPlan(item).map((page) => ({
    id: page.id,
    title: page.title,
    section: page.section,
    content: renderRegulationContent(item, page),
  }));
  return (
    <PagedReadingSurface
      key={item.slug}
      title={item.label}
      subtitle={item.category}
      pages={pages}
      storageKey={`mariners-book:regulation-page:${item.slug}`}
      headerAction={<Button asChild variant="ghost" size="sm" className="min-h-10 gap-1.5 rounded-lg">
        <Link to={`/regulations/${item.slug}/reference`}>
          <FileText className="h-4 w-4" /> Full reference
        </Link>
      </Button>}
    />
  );
}
