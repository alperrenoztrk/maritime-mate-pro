import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { getCurriculumCourse } from "@/data/curriculumHierarchy";
import { courseHref } from "@/data/learningGuide";
import { answerAssessment, assessmentResult, assessmentSteps, emptyAssessment, parseAssessment, profileQuestions, questionsFor, type AssessmentState } from "@/data/learningAssessment";
import { GuideStage, type GuideGesture } from "@/components/curriculum/GuideAvatar";
import { MOTION_EASE_OUT, MOTION_SECONDS, useReducedMotion } from "@/hooks/useAppMotion";
import { hapticNotify, hapticSelection } from "@/lib/haptics";

const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

// Answers slide in the direction of travel ("Previous" reverses it) and
// cascade once the guide has started speaking. The outgoing list stops taking
// taps at once: its handlers still belong to the previous question.
const answerList: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 28 }),
  center: { opacity: 1, x: 0, pointerEvents: "auto", transition: { duration: MOTION_SECONDS.page, ease: MOTION_EASE_OUT, staggerChildren: 0.06, delayChildren: 0.3 } },
  exit: (direction: number) => ({ opacity: 0, x: direction * -28, pointerEvents: "none", transition: { duration: MOTION_SECONDS.control, ease: MOTION_EASE_OUT } }),
};
const answerItem: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 30 } },
};
const stillList: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, pointerEvents: "auto", transition: { duration: MOTION_SECONDS.press } },
  exit: { opacity: 0, pointerEvents: "none", transition: { duration: MOTION_SECONDS.press } },
};
const stillItem: Variants = { enter: { opacity: 1 }, center: { opacity: 1 } };

interface LearningAssessmentProps {
  storageKey: string;
  /** Opens the subject catalogue (the knowledge tree). */
  onExplore: () => void;
  /** First sign-in: every question must be answered; there is no way to skip. */
  required?: boolean;
  /** The last answer was submitted. */
  onComplete?: () => void;
  /** Required mode: leaves the result for the app. */
  onFinish?: () => void;
}

export function LearningAssessment({ storageKey, onExplore, required = false, onComplete, onFinish }: LearningAssessmentProps) {
  const [state, setState] = useState<AssessmentState>(() => {
    try { return parseAssessment(localStorage.getItem(storageKey)); } catch { return emptyAssessment(); }
  });
  const [saveFailed, setSaveFailed] = useState(false);
  // A first, untouched required placement opens with the guide's greeting.
  const [welcomed, setWelcomed] = useState(() => !required || state.completed || Object.keys(state.answers).length > 0);
  const [direction, setDirection] = useState(1);
  const [gesture, setGesture] = useState<{ name: GuideGesture; key: number }>({ name: "speak", key: 0 });
  const [celebrate, setCelebrate] = useState(false);
  const reduced = useReducedMotion();
  const title = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);
  const steps = assessmentSteps(state.answers);
  const question = steps[state.step];
  const selected = state.answers[question.id];
  const diagnostic = "correct" in question;
  const options = diagnostic ? [...question.options, "I don't know yet"] : question.options;
  const result = assessmentResult(state.answers);
  const last = state.step === steps.length - 1;

  useEffect(() => {
    if (hasNavigated.current) title.current?.focus();
    hasNavigated.current = true;
  }, [state.step, state.completed, welcomed]);
  const update = (next: AssessmentState) => {
    setState(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setSaveFailed(false); }
    catch { setSaveFailed(true); }
  };
  const gestureNow = (name: GuideGesture) => setGesture((current) => ({ name, key: current.key + 1 }));
  const choose = (index: number) => {
    update(answerAssessment(state, question.id, index));
    hapticSelection();
    gestureNow("nod");
  };
  const move = (step: number) => {
    setDirection(step > state.step ? 1 : -1);
    update({ ...state, step });
    gestureNow("speak");
  };
  const finish = () => {
    update({ ...state, completed: true });
    setCelebrate(true);
    gestureNow("cheer");
    hapticNotify("success");
    onComplete?.();
  };
  const restart = () => {
    update(emptyAssessment());
    setCelebrate(false);
    gestureNow("speak");
  };

  // One stage for every phase, so the guide stays on screen and only her
  // speech changes between the greeting, the questions and the result.
  let speechKey: string;
  let speech: ReactNode;
  let below: ReactNode = null;
  if (state.completed) {
    speechKey = "result";
    speech = <>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Your starting point</p>
      <h1 ref={title} tabIndex={-1} className="mt-2 text-3xl font-bold tracking-tight outline-none">{result.level}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.correct} / {result.total} knowledge questions answered correctly. This short sample suggests where to start; it does not establish professional competence.</p>
      <p className="mt-3 text-sm">{profileQuestions[3].options[state.answers.pace]}</p>
      <p className="mt-1 text-sm text-muted-foreground">{state.answers.pace === 0 ? "Read one idea and explain it in your own words." : state.answers.pace === 1 ? "Read a lesson, then try its linked practice questions." : "Read, practise and revisit the points you found difficult."}</p>
    </>;
  } else if (!welcomed) {
    speechKey = "welcome";
    speech = <>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Your personal learning path</p>
      <h1 ref={title} tabIndex={-1} className="mt-2 text-2xl font-bold leading-tight tracking-tight outline-none sm:text-3xl">Welcome aboard!</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">I'm your learning guide. Answer a few short questions and I'll suggest where to start and which lessons to read next.</p>
    </>;
    below = <div className="space-y-3">
      <button type="button" className={`${primary} w-full sm:w-auto`} onClick={() => { setWelcomed(true); gestureNow("speak"); }}>Let's begin<ArrowRight className="h-4 w-4" aria-hidden /></button>
      <p className="text-xs leading-relaxed text-muted-foreground">About 3 minutes · Your answers are saved on this device as you go.</p>
    </div>;
  } else {
    speechKey = question.id;
    speech = <>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{diagnostic ? "Find your starting point" : "A path that fits you"}</p>
      <h1 ref={title} tabIndex={-1} id="placement-question" className="text-xl font-bold leading-snug tracking-tight outline-none sm:text-2xl">{question.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{"hint" in question ? question.hint : "Choose what you think is right. It's fine not to know — that's how we find useful lessons."}</p>
    </>;
    below = <>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.fieldset key={question.id} aria-labelledby="placement-question" className="space-y-3" custom={direction} variants={reduced ? stillList : answerList} initial="enter" animate="center" exit="exit">
          <legend className="sr-only">Choose one answer</legend>
          {options.map((option: string, index: number) => {
            const checked = selected === index;
            return <motion.label key={`${question.id}-${index}`} variants={reduced ? stillItem : answerItem} className={`relative flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border p-3 pr-4 transition-[background-color,border-color,box-shadow,transform] duration-control active:scale-[0.99] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background ${checked ? "border-primary bg-primary/10 shadow-elev-1" : "bg-background hover:border-primary/50"}`}>
              <input type="radio" name={question.id} value={index} checked={checked} onChange={() => choose(index)} className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none rounded-2xl opacity-0" />
              <span aria-hidden translate="no" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold transition-colors duration-control ${checked ? "border-primary bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground"}`}>
                {checked
                  ? <motion.span initial={reduced ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 520, damping: 18 }}><Check className="h-4 w-4" /></motion.span>
                  : diagnostic && index === question.options.length ? "?" : String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-sm font-medium leading-relaxed">{option}</span>
            </motion.label>;
          })}
        </motion.fieldset>
      </AnimatePresence>
      <div className="mt-6 flex items-center gap-3">
        {state.step > 0 && <button type="button" className={secondary} onClick={() => move(state.step - 1)}>Previous</button>}
        <motion.button type="button" disabled={selected === undefined} whileTap={reduced || selected === undefined ? undefined : { scale: 0.97 }} className={`${primary} flex-1`} onClick={() => last ? finish() : move(state.step + 1)}>{last ? "Show my learning path" : "Continue"}<ArrowRight className="h-4 w-4" aria-hidden /></motion.button>
      </div>
      <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">{required ? "Answer every question to see your learning path. Your answers are saved on this device as you go." : "About 3 minutes · Your answers are saved on this device as you go."}</p>
      {!required && <button type="button" onClick={onExplore} className="mx-auto mt-2 block min-h-11 text-sm text-muted-foreground underline underline-offset-4">Explore subjects without placement</button>}
    </>;
  }

  return <section aria-label="Personal learning pathway" className="mx-auto w-full max-w-4xl space-y-5">
    {saveFailed && <p role="status" className="rounded-xl border p-3 text-sm">Your answers work for this visit, but could not be saved on this device.</p>}
    {!state.completed && welcomed && <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={diagnostic ? "check" : "profile"} initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -6 }} transition={{ duration: MOTION_SECONDS.control }}>{diagnostic ? "A quick knowledge check" : "Let's get to know you"}</motion.span>
        </AnimatePresence>
        <span className="tabular-nums">{state.step + 1} / {steps.length}</span>
      </div>
      <div role="progressbar" aria-label="Placement progress" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={state.step} className="h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full rounded-full bg-primary" initial={false} animate={{ width: `${state.step / steps.length * 100}%` }} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22 }} />
      </div>
    </div>}
    <GuideStage gesture={gesture} speechKey={speechKey} below={below} celebrate={celebrate} hero={!state.completed && !welcomed}>{speech}</GuideStage>
    {state.completed && <>
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
          <Link to={courseHref(course)} onClick={onFinish} className="flex min-h-16 items-center gap-4 rounded-2xl border bg-card p-4 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">{index + 1}</span>
            <span className="flex-1"><span className="block font-medium">{getCurriculumCourse(course)?.title}</span><span className="text-xs text-muted-foreground">{result.gaps.includes(course) ? "Revisit concepts from your knowledge check" : "Build towards your learning goal"}</span></span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </li>)}</ol>
        <Link to={courseHref(result.recommendations[0])} onClick={onFinish} className={`${primary} w-full`}>Start my learning path <ArrowRight className="h-4 w-4" aria-hidden /></Link>
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
      {required
        ? <div className="flex flex-wrap gap-2"><button type="button" onClick={onExplore} className={secondary}>Explore the learning map</button><button type="button" onClick={onFinish} className={secondary}>Continue to the app</button></div>
        : <div className="flex flex-wrap gap-2"><button type="button" onClick={restart} className={secondary}><RotateCcw className="h-4 w-4" aria-hidden />Retake placement</button><button type="button" onClick={onExplore} className={secondary}>Explore all subjects</button></div>}
    </>}
  </section>;
}
