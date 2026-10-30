import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Compass, RotateCcw } from "lucide-react";
import { getCurriculumCourse } from "@/data/curriculumHierarchy";
import { courseHref } from "@/data/learningGuide";
import { answerAssessment, assessmentResult, assessmentSteps, emptyAssessment, parseAssessment, profileQuestions, questionsFor, type AssessmentState } from "@/data/learningAssessment";

const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

export function LearningAssessment({ storageKey, onExplore }: { storageKey: string; onExplore: () => void }) {
  const [state, setState] = useState<AssessmentState>(() => {
    try { return parseAssessment(localStorage.getItem(storageKey)); } catch { return emptyAssessment(); }
  });
  const [saveFailed, setSaveFailed] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);
  const steps = assessmentSteps(state.answers);
  const question = steps[state.step];
  const selected = state.answers[question.id];
  const diagnostic = "correct" in question;
  const options = diagnostic ? [...question.options, "I don't know yet"] : question.options;
  const result = assessmentResult(state.answers);

  useEffect(() => {
    if (hasNavigated.current) title.current?.focus();
    hasNavigated.current = true;
  }, [state.step, state.completed]);
  const update = (next: AssessmentState) => {
    setState(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setSaveFailed(false); }
    catch { setSaveFailed(true); }
  };
  const restart = () => update(emptyAssessment());

  return <section aria-label="Personal learning pathway" className="mx-auto w-full max-w-2xl space-y-5">
    {saveFailed && <p role="status" className="rounded-xl border p-3 text-sm">Your answers work for this visit, but could not be saved on this device.</p>}
    {state.completed ? <>
      <div className="space-y-4 rounded-3xl border bg-card p-6 sm:p-8">
        <Compass className="h-9 w-9 text-primary" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your starting point</p>
        <h1 ref={title} tabIndex={-1} className="text-3xl font-bold tracking-tight outline-none">{result.level}</h1>
        <p className="text-muted-foreground">{result.correct} / {result.total} knowledge questions answered correctly. This short sample suggests where to start; it does not establish professional competence.</p>
        <p className="text-sm">{profileQuestions[3].options[state.answers.pace]}</p>
        <p className="text-sm text-muted-foreground">{state.answers.pace === 0 ? "Read one idea and explain it in your own words." : state.answers.pace === 1 ? "Read a lesson, then try its linked practice questions." : "Read, practise and revisit the points you found difficult."}</p>
      </div>
      <section className="space-y-3" aria-labelledby="placement-topics">
        <h3 id="placement-topics" className="text-lg font-semibold">What your answers suggest</h3>
        <div className="grid gap-2 sm:grid-cols-2">{result.courses.map((course) => <div key={course.course} className="rounded-2xl border bg-card p-4">
          <p className="font-medium">{getCurriculumCourse(course.course)?.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{course.correct < course.total ? "Worth revisiting" : "Promising start"} · {course.correct} / {course.total}</p>
        </div>)}</div>
      </section>
      <section className="space-y-3" aria-labelledby="placement-path">
        <h3 id="placement-path" className="text-lg font-semibold">Your learning sequence</h3>
        <p className="text-sm text-muted-foreground">A reading order based on your goals and answers. Courses remain open, and your existing lesson progress is kept.</p>
        <ol className="space-y-2">{result.recommendations.map((course, index) => <li key={course}>
          <Link to={courseHref(course)} className="flex min-h-16 items-center gap-4 rounded-2xl border bg-card p-4 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">{index + 1}</span>
            <span className="flex-1"><span className="block font-medium">{getCurriculumCourse(course)?.title}</span><span className="text-xs text-muted-foreground">{result.gaps.includes(course) ? "Revisit concepts from your knowledge check" : "Build towards your learning goal"}</span></span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </li>)}</ol>
        <Link to={courseHref(result.recommendations[0])} className={`${primary} w-full`}>Start my learning path <ArrowRight className="h-4 w-4" aria-hidden /></Link>
      </section>
      <details className="rounded-2xl border p-4">
        <summary className="min-h-11 cursor-pointer font-medium">Review my answers</summary>
        <ul className="space-y-4">{questionsFor(state.answers).map((item) => <li key={item.id} className="border-t pt-4">
          <p className="font-medium">{item.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">Your answer: {item.options[state.answers[item.id]] ?? "I don't know yet"}</p>
          <p className="mt-1 text-sm">Correct answer: {item.options[item.correct]}</p>
          <p className="mt-2 text-sm text-muted-foreground">{item.explanation}</p>
        </li>)}</ul>
      </details>
      <p className="text-xs text-muted-foreground">This placement is saved on this device for the current profile. Repeating it replaces this placement, not your lesson history.</p>
      <div className="flex flex-wrap gap-2"><button type="button" onClick={restart} className={secondary}><RotateCcw className="h-4 w-4" aria-hidden />Retake placement</button><button type="button" onClick={onExplore} className={secondary}>Explore all subjects</button></div>
    </> : <>
      <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground"><span>{diagnostic ? "A quick knowledge check" : "Let's get to know you"}</span><span>{state.step + 1} / {steps.length}</span></div>
      <div role="progressbar" aria-label="Placement progress" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={state.step} className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none" style={{ width: `${state.step / steps.length * 100}%` }} /></div>
      <div className="rounded-3xl border bg-card p-5 sm:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{diagnostic ? "Find your starting point" : "A path that fits you"}</p>
        <h1 ref={title} tabIndex={-1} id="placement-question" className="text-2xl font-bold leading-tight tracking-tight outline-none sm:text-3xl">{question.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{"hint" in question ? question.hint : "Choose what you think is right. It's fine not to know — that's how we find useful lessons."}</p>
        <fieldset aria-labelledby="placement-question" className="mt-6 space-y-3">
          <legend className="sr-only">Choose one answer</legend>
          {options.map((option, index) => <label key={`${question.id}-${index}`} className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors ${selected === index ? "border-primary bg-primary/10" : "bg-background hover:border-primary/50"}`}>
            <input type="radio" name={question.id} value={index} checked={selected === index} onChange={() => update(answerAssessment(state, question.id, index))} className="h-5 w-5 shrink-0 accent-primary" />
            <span className="flex-1 text-sm font-medium leading-relaxed">{option}</span>{selected === index && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
          </label>)}
        </fieldset>
        <div className="mt-7 flex items-center gap-3">
          {state.step > 0 && <button type="button" className={secondary} onClick={() => update({ ...state, step: state.step - 1 })}>Previous</button>}
          <button type="button" disabled={selected === undefined} className={`${primary} flex-1`} onClick={() => update(state.step === steps.length - 1 ? { ...state, completed: true } : { ...state, step: state.step + 1 })}>{state.step === steps.length - 1 ? "Show my learning path" : "Continue"}<ArrowRight className="h-4 w-4" aria-hidden /></button>
        </div>
      </div>
      <p className="text-center text-xs leading-relaxed text-muted-foreground">About 3 minutes · Your answers are saved on this device as you go.</p>
      <button type="button" onClick={onExplore} className="mx-auto block min-h-11 text-sm text-muted-foreground underline underline-offset-4">Explore subjects without placement</button>
    </>}
  </section>;
}
