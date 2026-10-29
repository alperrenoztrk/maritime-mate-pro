import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface ChartLine {
  key: string;
  label: string;
  /** Lever at an angle (m). */
  value: (angle: number) => number;
  /** Heeling levers are drawn dashed in the second series colour. */
  kind: "righting" | "heeling";
}

export interface ChartMarker {
  angle: number;
  label: string;
}

/**
 * Statical stability diagram. Series colours are the validated reference
 * categorical slots 1 (blue, righting lever) and 2 (orange, heeling levers),
 * light and dark steps; heeling levers are also dashed so identity never
 * relies on colour alone.
 */
export function GzChart({
  lines,
  from = 0,
  to,
  step = 1,
  markers = [],
  title,
}: {
  lines: ChartLine[];
  from?: number;
  to: number;
  step?: number;
  markers?: ChartMarker[];
  title: string;
}) {
  const data: Array<Record<string, number>> = [];
  for (let a = from; a <= to + 1e-9; a += step) {
    const row: Record<string, number> = { angle: Math.round(a * 10) / 10 };
    for (const line of lines) row[line.key] = Math.round(line.value(a) * 1000) / 1000;
    data.push(row);
  }

  return (
    <figure className="space-y-2 rounded-xl border border-border/40 bg-background/65 p-3 [--series-1:#2a78d6] [--series-2:#eb6834] dark:[--series-1:#3987e5] dark:[--series-2:#d95926]">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-foreground">{title}</span>
        <span className="flex flex-wrap gap-3 text-muted-foreground">
          {lines.map((line) => (
            <span key={line.key} className="inline-flex items-center gap-1.5">
              <svg width="18" height="6" aria-hidden>
                <line x1="0" y1="3" x2="18" y2="3" stroke={line.kind === "righting" ? "var(--series-1)" : "var(--series-2)"} strokeWidth="2" strokeDasharray={line.kind === "heeling" ? "4 3" : undefined} />
              </svg>
              {line.label}
            </span>
          ))}
        </span>
      </figcaption>
      <div className="h-64 w-full" role="img" aria-label={`${title}: lever in metres against heel angle in degrees`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 18, right: 16, bottom: 4, left: -8 }}>
            <CartesianGrid stroke="hsl(var(--border))" strokeOpacity={0.6} vertical={false} />
            <XAxis
              dataKey="angle"
              type="number"
              domain={[from, to]}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              unit="°"
            />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} unit=" m" width={52} />
            <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.6} />
            {markers.map((m) => (
              <ReferenceLine
                key={m.label}
                x={m.angle}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="2 3"
                label={{ value: m.label, position: "top", fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
            ))}
            <Tooltip
              cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12, color: "hsl(var(--foreground))" }}
              labelFormatter={(angle) => `Heel ${angle}°`}
              formatter={(value: number, name: string) => [`${Number(value).toFixed(3)} m`, lines.find((l) => l.key === name)?.label ?? name]}
            />
            {lines.map((line) => (
              <Line
                key={line.key}
                dataKey={line.key}
                type="monotone"
                dot={false}
                isAnimationActive={false}
                stroke={line.kind === "righting" ? "var(--series-1)" : "var(--series-2)"}
                strokeWidth={2}
                strokeDasharray={line.kind === "heeling" ? "6 4" : undefined}
                activeDot={{ r: 4, stroke: "hsl(var(--card))", strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
