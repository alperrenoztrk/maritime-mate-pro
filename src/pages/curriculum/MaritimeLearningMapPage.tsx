import { LearningAssessment } from "@/components/curriculum/LearningAssessment";
import { assessmentStorageKey } from "@/data/learningAssessment";
import { getLearningProgressAccount } from "@/utils/learningProgress";
import { LearningProgressStatus } from "@/components/curriculum/LearningProgressStatus";
import { useLanguage } from "@/contexts/useLanguage";
import { getStaticTranslation } from "@/utils/staticTranslations";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { getBetaModules } from "@/data/betaLessons";
import { getCurriculumCourse } from "@/data/curriculumHierarchy";
import { courseHref, courseLearningGuides, learningBranches, topicHref } from "@/data/learningGuide";
import { LibraryPageShell, LibrarySearchField } from "@/components/library/LibraryInterface";
import { useLearningProgress } from "@/hooks/useLearningProgress";

const introductions = [
  { title: "One ship, several connected disciplines", text: "The hull provides flotation and structural strength. Machinery provides power and services. The bridge team navigates. The whole crew shares safety and environmental responsibilities. Their interaction keeps the ship operating.", href: "/lessons/stability/topics", label: "Start with flotation and stability" },
  { title: "A department is an organisation of people", text: "Deck personnel work on navigation, cargo and deck operations. Engine personnel work on machinery, power and technical services. Catering and other service roles support life on board. The Master commands the ship; the crew pages explain individual responsibilities.", href: "/crew", label: "Explore personnel and responsibilities" },
  { title: "A subject explains why; a system shows how", text: "Fluid mechanics explains pressure and flow. A ballast system applies those principles through tanks, pumps, valves and pipes. An operation describes how people use that system for a task. Learn the principle, inspect the system and then follow the operation.", href: "/ship-systems", label: "Explore ship systems" },
  { title: "Ship type changes the application", text: "A tanker, bulk carrier, container ship, passenger ship or offshore vessel uses many shared principles. Cargo properties, equipment, work organisation and operating limits change the application. Use ship-type operations to compare them.", href: "/ship-operations", label: "Compare ship operations" },
  { title: "Safety and security address different threats", text: "Safety manages accidental hazards such as fire, flooding and injury. Security addresses deliberate threats such as unauthorised access. Both depend on clear responsibilities, communication and the ship's procedures.", href: "/lessons/safety/topics", label: "Begin shipboard safety" },
  { title: "Read, explain, apply and check", text: "Start with the foundation topics. Explain the idea in your own words, work through its example and answer the linked questions. Use the module description and related courses to connect the lesson to the rest of the ship. Progress records your reading and practice on this device.", href: "/glossary", label: "Look up maritime terms" },
];

const paths = [
  { id: "new", title: "New to maritime learning", text: "Build the vocabulary and the picture of the ship before moving to calculations and operating procedures.", courses: ["safety", "seamanship", "stability", "navigation", "communication"] },
  { id: "deck", title: "Deck learning sequence", text: "Move from the ship and deck work to navigation, the marine environment, cargo and commercial operation.", courses: ["seamanship", "safety", "stability", "navigation", "meteorology", "communication", "cargo", "environment", "economics"] },
  { id: "engine", title: "Engine learning sequence", text: "Build physical principles and safe-work knowledge before machinery, controls, watchkeeping and maintenance.", courses: ["machine-engine-room-safety", "machine-thermodynamics", "machine-fluid-mechanics", "machine-machine-elements", "machine-electrical", "machine-diesel-engines", "machine-auxiliary", "machine-automation", "machine-engine-room-ops", "machine-maintenance"] },
];
const normalise = (value: string) => value.toLocaleLowerCase("tr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i");

export default function MaritimeLearningMapPage() {
  const { currentLanguage } = useLanguage();
  const translated = (value: string) => getStaticTranslation(value, currentLanguage) ?? value;
  // The placement opens by itself only once, after the first sign-in
  // (FirstSignInPlacement); here it waits behind "My personal learning path".
  const [exploring, setExploring] = useState(true);
  const [query, setQuery] = useState("");
  const [pathId, setPathId] = useState("new");
  const progress = useLearningProgress();
  const storageKey = assessmentStorageKey(getLearningProgressAccount());
  const activePath = paths.find((entry) => entry.id === pathId)!;
  const needle = normalise(query.trim());
  if (!exploring) return (
    <div className="min-h-[100svh] px-[max(1rem,var(--safe-left))] pt-[calc(var(--safe-top)+1.5rem)] pb-[calc(var(--safe-bottom)+1.5rem)]">
      <LearningAssessment key={storageKey} storageKey={storageKey} onExplore={() => setExploring(true)} />
    </div>
  );
  let results = 0;
  return (
    <LibraryPageShell title="Maritime learning map" icon={Compass} maxWidth="max-w-5xl">
      <button type="button" className="self-start min-h-11 rounded-xl border px-4 py-2 text-sm font-semibold" onClick={() => setExploring(false)}>My personal learning path</button>
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">Understand the whole ship, find a subject and follow its branches from a first principle to shipboard practice.</p>
      <LearningProgressStatus />
      <details className="rounded-2xl border bg-card p-4">
        <summary className="min-h-11 cursor-pointer text-lg font-semibold">Start here: how maritime knowledge fits together</summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {introductions.map((entry, index) => <article key={entry.title} className="rounded-xl border p-4">
            <p className="text-xs font-semibold text-primary">{index + 1} / {introductions.length}</p>
            <h2 className="mt-2 font-semibold">{entry.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.text}</p>
            <Link to={entry.href} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline">{entry.label}</Link>
          </article>)}
        </div>
      </details>
      <section className="space-y-4 rounded-2xl border bg-card p-4 sm:p-5">
        <h2 className="text-lg font-semibold">Choose a reading sequence</h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Reading sequence">
          {paths.map((entry) => <button type="button" key={entry.id} aria-pressed={pathId === entry.id} onClick={() => setPathId(entry.id)} className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold ${pathId === entry.id ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}>{entry.title}</button>)}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{activePath.text}</p>
        <ol className="grid gap-2 sm:grid-cols-2">
          {activePath.courses.map((key, index) => <li key={key}><Link to={courseHref(key)} className="flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2 text-sm"><span className="font-semibold text-primary">{index + 1}.</span>{getCurriculumCourse(key)?.title}</Link></li>)}
        </ol>
      </section>
      <section className="space-y-4" aria-labelledby="knowledge-tree-title">
        <h2 id="knowledge-tree-title" className="text-xl font-semibold">Explore the knowledge tree</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">A discipline is a branch of knowledge. Deck and engine are departments; ship types describe different applications. Expand a branch, a course and a module to see where each topic belongs.</p>
        <LibrarySearchField value={query} onChange={setQuery} placeholder="Find a course or topic…" ariaLabel="Search the learning tree" />
        {learningBranches.map((branch) => {
          const courses = branch.courses.map((key) => {
            const course = getCurriculumCourse(key)!;
            const guide = courseLearningGuides[key];
            const courseMatches = !needle || normalise(`${branch.title} ${course.title} ${translated(course.title)} ${guide.purpose}`).includes(needle);
            const modules = getBetaModules(key).map((module) => ({ ...module, topics: module.topics.filter((topic) => courseMatches || normalise(`${module.title} ${translated(module.title)} ${module.description} ${topic.title} ${translated(topic.title)}`).includes(needle)) })).filter((module) => module.topics.length > 0);
            return { key, course, guide, modules };
          }).filter((entry) => entry.modules.length > 0);
          if (!courses.length) return null;
          results += courses.length;
          return <details key={branch.id} open={needle ? true : undefined} className="rounded-2xl border bg-card p-4 sm:p-5">
            <summary className="min-h-11 cursor-pointer font-semibold">{branch.title}</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{branch.description}</p>
            <div className="mt-4 space-y-3 border-l-2 border-primary/25 pl-3 sm:pl-5">
              {courses.map(({ key, course, guide, modules }) => <details key={key} open={needle ? true : undefined} className="rounded-xl border p-3">
                <summary className="min-h-11 cursor-pointer text-sm font-semibold">{course.title}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.purpose}</p>
                <Link to={courseHref(key)} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline">Open course</Link>
                <div className="space-y-2 border-l border-border pl-3">
                  {modules.map((module) => <details key={module.id} open={needle ? true : undefined} className="rounded-lg bg-muted/30 p-3">
                    <summary className="min-h-11 cursor-pointer text-sm font-medium">{module.title}</summary>
                    <p className="my-2 text-sm leading-relaxed text-muted-foreground">{module.description}</p>
                    <ul className="space-y-1 border-l border-border pl-3">
                      {module.topics.map((topic) => <li key={topic.id}><Link to={topicHref(key, topic.id)} className="flex min-h-11 items-center justify-between gap-3 py-2 text-sm text-primary underline"><span>{topic.title}</span>{progress[topic.id]?.reviewedAt && <span className="text-xs text-muted-foreground">Reviewed</span>}</Link></li>)}
                    </ul>
                  </details>)}
                </div>
              </details>)}
            </div>
          </details>;
        })}
        {needle && results === 0 && <p role="status" className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">No matching topics found. Try another term or explore a branch.</p>}
      </section>
    </LibraryPageShell>
  );
}
