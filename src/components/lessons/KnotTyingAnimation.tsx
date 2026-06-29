import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Gauge } from "lucide-react";
import { KNOT_TYING_BY_ID, type KnotTyingDef, type KnotStroke, type KnotObject } from "@/data/knotTyingAnimations";
import type { Vec3 } from "@/utils/knotGeometry";

interface Point2D {
  x: number;
  y: number;
}

interface KnotTyingAnimationProps {
  knotId: string;
  /** Animation playback speed multiplier (0.5 – 2). */
  defaultSpeed?: number;
}

const VIEW_W = 320;
const VIEW_H = 200;
const PADDING = 22;
const REVEAL_RATE = 0.13; // fraction of the whole knot revealed per second at 1x
const HOLD_AT_END_MS = 1300;

const ROLE_COLOR: Record<string, string> = {
  a: "#d97706", // amber-600 — first / thicker rope
  b: "#0d9488", // teal-600 — second / thinner rope
};

// Project a 3D rope point to 2D with a slight depth skew so over/under crossings
// read clearly without a full 3D render.
function project(p: Vec3): Point2D {
  return { x: p.x + p.z * 0.12, y: -p.y + p.z * 0.06 };
}

function polylineLength(pts: Point2D[]): number {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  return len;
}

function pointAtLength(pts: Point2D[], dist: number): Point2D {
  if (pts.length === 0) return { x: 0, y: 0 };
  if (dist <= 0) return pts[0];
  let remaining = dist;
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    if (remaining <= seg) {
      const t = seg === 0 ? 0 : remaining / seg;
      return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t };
    }
    remaining -= seg;
  }
  return pts[pts.length - 1];
}

// Smooth a sparse polyline into a rope-like SVG path (Catmull-Rom → cubic Bézier).
function smoothPath(pts: Point2D[]): string {
  if (pts.length < 2) return "";
  if (pts.length === 2) return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

interface PreparedStroke extends KnotStroke {
  projected: Point2D[];
  length: number;
  start: number; // cumulative reveal distance at which this stroke starts
  path: string;
}

interface PreparedKnot {
  def: KnotTyingDef;
  strokes: PreparedStroke[];
  total: number;
  objects: { type: "post"; x: number; y: number; w: number; h: number; rx: number }[];
  transform: (p: Point2D) => Point2D;
}

function prepareKnot(def: KnotTyingDef): PreparedKnot {
  // Project all stroke points and gather bounds (including object extents).
  const projectedStrokes = def.strokes.map((s) => s.points.map(project));
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const consider = (x: number, y: number) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };
  projectedStrokes.forEach((s) => s.forEach((p) => consider(p.x, p.y)));
  (def.objects ?? []).forEach((o) => {
    if (o.type === "post") {
      consider(o.cx - o.halfWidth, -o.yTop);
      consider(o.cx + o.halfWidth, -o.yBottom);
    }
  });
  if (!isFinite(minX)) {
    minX = -1; minY = -1; maxX = 1; maxY = 1;
  }

  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const scale = Math.min((VIEW_W - 2 * PADDING) / spanX, (VIEW_H - 2 * PADDING) / spanY);
  const offsetX = (VIEW_W - spanX * scale) / 2;
  const offsetY = (VIEW_H - spanY * scale) / 2;
  const transform = (p: Point2D): Point2D => ({
    x: offsetX + (p.x - minX) * scale,
    y: offsetY + (p.y - minY) * scale,
  });

  let cumulative = 0;
  const strokes: PreparedStroke[] = def.strokes.map((s, i) => {
    const projected = projectedStrokes[i].map(transform);
    const length = polylineLength(projected);
    const start = cumulative;
    cumulative += length;
    return { ...s, projected, length, start, path: smoothPath(projected) };
  });

  const objects = (def.objects ?? [])
    .filter((o): o is Extract<KnotObject, { type: "post" }> => o.type === "post")
    .map((o) => {
      const topLeft = transform({ x: o.cx - o.halfWidth, y: -o.yTop });
      const bottomRight = transform({ x: o.cx + o.halfWidth, y: -o.yBottom });
      const w = bottomRight.x - topLeft.x;
      return { type: "post" as const, x: topLeft.x, y: topLeft.y, w, h: bottomRight.y - topLeft.y, rx: w / 2 };
    });

  return { def, strokes, total: cumulative || 1, objects, transform };
}

export default function KnotTyingAnimation({ knotId, defaultSpeed = 1 }: KnotTyingAnimationProps) {
  const def = KNOT_TYING_BY_ID[knotId];
  const prepared = useMemo(() => (def ? prepareKnot(def) : null), [def]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const [progress, setProgress] = useState(prefersReducedMotion ? 1 : 0);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [speed, setSpeed] = useState(defaultSpeed);

  const progressRef = useRef(progress);
  progressRef.current = progress;
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const holdUntilRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);

  // Pause the animation loop while the widget is scrolled off-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => (visibleRef.current = e.isIntersecting)),
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      holdUntilRef.current = null;
      return;
    }

    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (visibleRef.current) {
        const current = progressRef.current;
        if (current >= 1) {
          // Hold the finished knot briefly, then loop.
          if (holdUntilRef.current == null) holdUntilRef.current = ts + HOLD_AT_END_MS;
          if (ts >= holdUntilRef.current) {
            holdUntilRef.current = null;
            setProgress(0);
          }
        } else {
          const next = Math.min(1, current + dt * speed * REVEAL_RATE);
          setProgress(next);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [isPlaying, speed]);

  if (!def || !prepared) return null;

  const revealDistance = progress * prepared.total;
  const steps = def.steps;
  let activeStepIndex = 0;
  for (let i = 0; i < steps.length; i++) {
    if (progress + 1e-6 >= steps[i].at) activeStepIndex = i;
  }
  const activeStep = steps[activeStepIndex];

  // Head marker — the working end currently being laid.
  let head: Point2D | null = null;
  if (progress > 0.01 && progress < 0.995) {
    const reach = revealDistance;
    let acc = 0;
    for (const s of prepared.strokes) {
      if (s.overlay) continue;
      if (reach <= acc + s.length) {
        head = pointAtLength(s.projected, reach - acc);
        break;
      }
      acc += s.length;
      head = s.projected[s.projected.length - 1];
    }
  }

  const handleRestart = () => {
    holdUntilRef.current = null;
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-border/50 bg-card/80 overflow-hidden"
      data-no-translate
    >
      {/* Title row */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-border/40 bg-muted/30">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-foreground truncate">{def.name}</span>
          <span className="text-[11px] text-muted-foreground truncate">{def.nameEn}</span>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
            def.difficulty === "Kolay"
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              : def.difficulty === "Orta"
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
          }`}
        >
          {def.difficulty}
        </span>
      </div>

      {/* Animation stage */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-[200px] block"
        role="img"
        aria-label={`${def.name} bağının nasıl yapıldığını gösteren animasyon`}
      >
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="hsl(var(--card))" />

        {/* Objects (post / bollard) */}
        {prepared.objects.map((o, i) => (
          <rect
            key={`obj-${i}`}
            x={o.x}
            y={o.y}
            width={o.w}
            height={o.h}
            rx={o.rx}
            fill="hsl(var(--muted))"
            stroke="hsl(var(--muted-foreground))"
            strokeOpacity={0.4}
          />
        ))}

        {/* Ghost guide — the full rope path */}
        {prepared.strokes.map((s, i) =>
          s.overlay ? null : (
            <path
              key={`ghost-${i}`}
              d={s.path}
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.22}
              strokeWidth={9}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1 9"
            />
          ),
        )}

        {/* Revealed rope — casing first (over/under), then coloured strand */}
        {prepared.strokes.map((s, i) => {
          const local = Math.max(0, Math.min(1, (revealDistance - s.start) / (s.length || 1)));
          if (local <= 0) return null;
          const offset = 1 - local;
          const color = ROLE_COLOR[s.role] ?? ROLE_COLOR.a;
          return (
            <g key={`rope-${i}`}>
              <path
                d={s.path}
                fill="none"
                stroke="hsl(var(--card))"
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={offset}
              />
              <path
                d={s.path}
                fill="none"
                stroke={color}
                strokeWidth={10}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={offset}
              />
              {/* subtle highlight for a rope sheen */}
              <path
                d={s.path}
                fill="none"
                stroke="#ffffff"
                strokeOpacity={0.25}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={offset}
              />
            </g>
          );
        })}

        {/* Working-end marker */}
        {head && (
          <g>
            <circle cx={head.x} cy={head.y} r={9} fill="hsl(var(--primary))" fillOpacity={0.18}>
              <animate attributeName="r" values="7;11;7" dur="1.1s" repeatCount="indefinite" />
            </circle>
            <circle cx={head.x} cy={head.y} r={4.5} fill="hsl(var(--primary))" />
          </g>
        )}
      </svg>

      {/* Step caption */}
      <div className="px-3 py-2.5 border-t border-border/40">
        <div className="flex items-center gap-1.5 mb-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === activeStepIndex
                  ? "w-6 bg-amber-500"
                  : i < activeStepIndex
                    ? "w-3 bg-amber-500/50"
                    : "w-3 bg-muted-foreground/25"
              }`}
            />
          ))}
        </div>
        <p className="text-sm font-medium text-foreground">{activeStep.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{activeStep.description}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-border/40 bg-muted/20">
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600 transition-colors"
          aria-label={isPlaying ? "Duraklat" : "Oynat"}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {isPlaying ? "Duraklat" : "Oynat"}
        </button>
        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          aria-label="Baştan oynat"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Baştan
        </button>

        {/* Scrubber */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={progress}
          onChange={(e) => {
            setIsPlaying(false);
            holdUntilRef.current = null;
            setProgress(parseFloat(e.target.value));
          }}
          className="flex-1 min-w-[60px] accent-amber-500"
          aria-label="Adım çubuğu"
        />

        <div className="flex items-center gap-1 text-muted-foreground" title="Hız">
          <Gauge className="h-3.5 w-3.5" />
          <select
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="bg-transparent text-xs text-foreground outline-none"
            aria-label="Animasyon hızı"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>

      {/* Usage note */}
      <div className="px-3 py-2 border-t border-border/40">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Kullanım: </span>
          {def.use}
          {def.strengthLoss && (
            <span className="ml-1 text-amber-600 dark:text-amber-400">({def.strengthLoss})</span>
          )}
        </p>
      </div>
    </div>
  );
}
