import { useId } from "react";
import type { SystemFlowStage } from "@/data/shipSystemsProfessionalData";

type Props = {
  title: string;
  stages: readonly SystemFlowStage[];
};

const splitText = (value: string, max = 21): string[] => {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);

  if (lines.length <= 5) return lines;
  return [...lines.slice(0, 4), `${lines.slice(4).join(" ").slice(0, max - 1)}…`];
};

export function SystemArchitectureDiagram({ title, stages }: Props) {
  const markerId = useId().replace(/:/g, "");
  const gradientId = `${markerId}-gradient`;

  return (
    <figure className="overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background/80 to-cyan-500/5 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <figcaption className="text-xs font-semibold text-foreground">The system's actual workflow</figcaption>
        <span className="text-micro uppercase tracking-wide text-muted-foreground">Input → safety/evidence</span>
      </div>

      <div className="grid gap-2 sm:hidden">
        {stages.slice(0, 5).map((stage, index) => (
          <div key={`${stage.label}-${index}`} className="relative flex gap-3 rounded-lg border border-border/50 bg-card/90 p-3">
            {index < Math.min(stages.length, 5) - 1 && (
              <span className="absolute left-[22px] top-[42px] h-[calc(100%+9px)] border-l border-dashed border-primary/35" aria-hidden="true" />
            )}
            <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-micro font-bold text-primary">
              {index + 1}
            </span>
            <div>
              <p className="text-micro font-semibold text-foreground">{stage.label}</p>
              <p className="mt-0.5 text-micro leading-relaxed text-foreground/75">{stage.detail}</p>
            </div>
          </div>
        ))}
        <p className="px-1 text-micro leading-relaxed text-muted-foreground">
          The safety, alarm and recording result is fed back into the control decision.
        </p>
      </div>

      <div className="hidden overflow-x-auto pb-1 sm:block">
        <svg
          viewBox="0 0 770 232"
          className="min-w-[700px] w-full"
          role="img"
          aria-labelledby={`${markerId}-title ${markerId}-desc`}
        >
          <title id={`${markerId}-title`}>{title} system architecture</title>
          <desc id={`${markerId}-desc`}>
            The data or energy flow of equipment from source and input to conversion, control, output and safety-recording.
          </desc>
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.75" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
            </linearGradient>
            <marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="hsl(var(--primary))" opacity="0.75" />
            </marker>
          </defs>

          {stages.slice(0, 5).map((stage, index) => {
            const x = 12 + index * 152;
            const detailLines = splitText(stage.detail);
            return (
              <g key={`${stage.label}-${index}`}>
                {index < 4 && (
                  <path
                    d={`M ${x + 132} 106 L ${x + 148} 106`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    opacity="0.75"
                    markerEnd={`url(#${markerId})`}
                  />
                )}
                <rect
                  x={x}
                  y="28"
                  width="132"
                  height="156"
                  rx="14"
                  fill="hsl(var(--card))"
                  fillOpacity="0.92"
                  stroke="hsl(var(--border))"
                />
                <rect x={x} y="28" width="132" height="8" rx="4" fill={`url(#${gradientId})`} />
                <circle cx={x + 22} cy="55" r="12" fill="hsl(var(--primary))" fillOpacity="0.12" />
                <text
                  x={x + 22}
                  y="59"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="hsl(var(--primary))"
                >
                  {index + 1}
                </text>
                <text x={x + 40} y="58" fontSize="10.5" fontWeight="700" fill="hsl(var(--foreground))">
                  {stage.label}
                </text>
                <text x={x + 12} y="84" fontSize="10.5" fill="hsl(var(--foreground))" opacity="0.82">
                  {detailLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={x + 12} dy={lineIndex === 0 ? 0 : 17}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          <path
            d="M 686 194 C 686 220, 382 220, 382 194"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.45"
            markerEnd={`url(#${markerId})`}
          />
          <text x="534" y="226" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
            Alarms, records and verification feed back into the control decision
          </text>
        </svg>
      </div>
    </figure>
  );
}
