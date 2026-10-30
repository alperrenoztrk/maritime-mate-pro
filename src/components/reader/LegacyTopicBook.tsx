import { splitLegacyReadingText } from "@/lib/legacyReadingText";
import type { ReactNode } from "react";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";
import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";

export interface LegacyBookTopic {
  title: string;
  introduction?: string;
  content?: string;
  bulletPoints?: string[];
  examples?: Array<{ problem: string; solution: string }>;
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
  table?: { title: string; headers: string[]; rows: string[][] };
}
export interface LegacyBookExtra {
  id: string;
  title: string;
  content: ReactNode;
}

/** Preserve full source text, splitting only at blank-line boundaries. */
export function createLegacyReadingPlan(topic: LegacyBookTopic, extras: readonly LegacyBookExtra[] = []): ReadingPage[] {
  const pages: ReadingPage[] = [{
    id: "intro", title: topic.title, section: "Introduction",
    content: <p className="whitespace-pre-line">{topic.introduction || "Read the following topic."}</p>,
  }];
  pages.push(...extras.map((entry) => ({
    id: `extra-${entry.id}`, title: entry.title, section: "Illustrations and demonstrations", content: entry.content,
  })));
  splitLegacyReadingText(topic.content ?? "").forEach((chunk, index, chunks) => {
    pages.push({ id: `explanation-${index}`,
      title: chunks.length > 1 ? `Subject explanation · Part ${index + 1}` : "Subject explanation",
      section: "Core knowledge",
      content: <StructuredLessonText text={chunk} />,
    });
  });
  if (topic.table) pages.push({ id: "table", title: topic.table.title, section: "Reference data", content:
    <div className="max-w-full overflow-x-auto rounded-lg border border-border/70">
      <table className="w-full min-w-max text-left text-sm">
        <thead className="bg-muted/40"><tr>{topic.table.headers.map((x,i)=><th key={i} className="px-3 py-2">{x}</th>)}</tr></thead>
        <tbody>{topic.table.rows.map((row,i)=><tr key={i} className="border-t border-border/60">{row.map((cell,j)=><td key={j} className="px-3 py-2">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>,
  });
  if (topic.bulletPoints?.length) pages.push({id:"bullet-points",title:"Important details",section:"Key facts",
    content:<ul className="list-disc space-y-2 pl-5">{topic.bulletPoints.map((point,i)=><li key={i}>{point}</li>)}</ul>});
  if (topic.formula) pages.push({id:"formula",title:topic.formula.name,section:"Formula",
    content:<div className="space-y-4"><p className="break-words rounded-xl bg-muted/40 p-4 font-mono text-base text-primary">{topic.formula.expression}</p><p>{topic.formula.description}</p></div>});
  topic.examples?.forEach((example,index)=>pages.push({id:`example-${index}`,
    title:`Worked example ${index+1}`,section:"Applications",content:<div className="space-y-4">
      <p className="font-semibold">{example.problem}</p><p className="whitespace-pre-line">{example.solution}</p>
    </div>}));
  if(topic.keyPoints?.length)pages.push({id:"key-points",title:"Key points",section:"Review",
    content:<ol className="list-decimal space-y-3 pl-6">{topic.keyPoints.map((point,i)=><li key={i}>{point}</li>)}</ol>});
  if(topic.warnings?.length)pages.push({id:"warnings",title:"Operational warnings",section:"Safety",
    content:<ul className="list-disc space-y-3 pl-5">{topic.warnings.map((v,i)=><li key={i}>{v}</li>)}</ul>});
  return pages;
}

export function LegacyTopicBook({
  topic, storageKey, extras = [],
}: {
  topic: LegacyBookTopic;
  storageKey: string;
  extras?: LegacyBookExtra[];
}) {
  return <PagedReadingSurface title={topic.title} pages={createLegacyReadingPlan(topic,extras)}
    storageKey={storageKey} subtitle="Maritime learning · Book reader" />;
}
