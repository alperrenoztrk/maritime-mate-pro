import { LIGHT_FILL } from "./lightRhythms";

/**
 * What the observer sees looking along a leading line. The rear light is
 * farther away, so it shifts less than the front light when the ship moves
 * off the line: a ship to port of the line sees the rear light to the left of
 * the front light, and the reverse to starboard.
 */
const VIEWS = [
  { key: "port", offset: -14, title: "Rear light to the left", text: "You are to port of the line. Alter to starboard to regain it." },
  { key: "on", offset: 0, title: "Lights in line", text: "You are on the leading line." },
  { key: "starboard", offset: 14, title: "Rear light to the right", text: "You are to starboard of the line. Alter to port to regain it." },
];

export function LeadingLightsFigure() {
  return (
    <figure className="space-y-3 rounded-xl border border-border/50 bg-muted/30 p-4">
      <div className="space-y-3">
        {VIEWS.map((view) => (
          <div key={view.key} className="flex items-center gap-3">
            <svg viewBox="0 0 120 90" className="notranslate h-auto w-28 shrink-0" aria-hidden="true">
              <rect x={0} y={0} width={120} height={90} rx={6} fill="#0b1220" />
              <path d="M 0 66 Q 30 60 60 62 Q 90 64 120 60 L 120 90 L 0 90 Z" fill="#3f3a2e" />
              <line x1={60} y1={6} x2={60} y2={84} stroke="#64748b" strokeWidth={0.8} strokeDasharray="3 3" />
              <line x1={60 + view.offset} y1={24} x2={60 + view.offset} y2={62} stroke="#94a3b8" strokeWidth={2} />
              <line x1={60} y1={50} x2={60} y2={64} stroke="#94a3b8" strokeWidth={2} />
              <circle cx={60 + view.offset} cy={22} r={4} fill={LIGHT_FILL.W} />
              <circle cx={60} cy={48} r={4} fill={LIGHT_FILL.W} />
            </svg>
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-semibold text-foreground">{view.title}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{view.text}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="text-xs leading-relaxed text-muted-foreground">
        Looking towards the lights: the front light is lower and nearer, the rear light higher and farther. The dashed line marks the direction of the leading line.
      </figcaption>
    </figure>
  );
}
