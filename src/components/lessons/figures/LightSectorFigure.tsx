import { LIGHT_FILL } from "./lightRhythms";

const LIGHT = { x: 330, y: 130 };
const RADIUS = 270;

/**
 * Sector limits are bearings of the light FROM SEAWARD, so the observer who
 * sees the light bearing 090° lies on the 270° side of it. The wedge for a
 * sector "a°–b°" is therefore drawn between the reciprocals a+180 and b+180.
 */
const SECTORS = [
  { colour: "R" as const, from: 70, to: 85, label: "R 070°–085°" },
  { colour: "W" as const, from: 85, to: 95, label: "W 085°–095°" },
  { colour: "G" as const, from: 95, to: 110, label: "G 095°–110°" },
];

const pointOnBearing = (bearingFromLight: number, radius: number) => {
  const radians = (bearingFromLight * Math.PI) / 180;
  return { x: LIGHT.x + radius * Math.sin(radians), y: LIGHT.y - radius * Math.cos(radians) };
};

const wedge = (from: number, to: number) => {
  const start = pointOnBearing(from + 180, RADIUS);
  const end = pointOnBearing(to + 180, RADIUS);
  return `M ${LIGHT.x} ${LIGHT.y} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y} Z`;
};

export function LightSectorFigure() {
  const ship = pointOnBearing(270, 115);
  return (
    <figure className="space-y-3 rounded-xl border border-border/50 bg-muted/30 p-4">
      <svg viewBox="0 0 400 260" className="notranslate h-auto w-full" aria-hidden="true">
        <rect x={0} y={0} width={400} height={260} rx={8} fill="#0b1220" />
        <path d="M 340 0 L 400 0 L 400 260 L 338 260 Q 330 200 324 140 Q 320 100 336 50 Q 342 20 340 0 Z" fill="#3f3a2e" />
        {SECTORS.map((sector) => (
          <path key={sector.label} d={wedge(sector.from, sector.to)} fill={LIGHT_FILL[sector.colour]} fillOpacity={0.28} stroke={LIGHT_FILL[sector.colour]} strokeOpacity={0.7} />
        ))}
        {SECTORS.map((sector) => {
          const mid = pointOnBearing((sector.from + sector.to) / 2 + 180, RADIUS - 65);
          return (
            <text key={sector.label} x={mid.x} y={mid.y + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill={LIGHT_FILL[sector.colour]}>
              {sector.label}
            </text>
          );
        })}
        <circle cx={LIGHT.x} cy={LIGHT.y} r={6} fill={LIGHT_FILL.W} />
        <line x1={ship.x + 12} y1={ship.y} x2={LIGHT.x - 14} y2={LIGHT.y} stroke="#e2e8f0" strokeWidth={1.2} strokeDasharray="4 4" />
        <path d={`M ${ship.x - 12} ${ship.y - 5} L ${ship.x + 8} ${ship.y - 5} L ${ship.x + 14} ${ship.y} L ${ship.x + 8} ${ship.y + 5} L ${ship.x - 12} ${ship.y + 5} Z`} fill="#e2e8f0" />
        <text x={ship.x} y={ship.y + 22} textAnchor="middle" fontSize={12} fill="#e2e8f0">090°</text>
        <g fill="#e2e8f0" fontSize={12} fontWeight={600}>
          <path d="M 24 34 L 30 18 L 36 34 Z" />
          <text x={30} y={48} textAnchor="middle">N</text>
        </g>
      </svg>
      <figcaption className="text-xs leading-relaxed text-muted-foreground">
        Sector limits are true bearings of the light seen from seaward. The ship on the left sees the light bearing 090°, inside the white sector 085°–095°. If it drifts south it enters the red sector, if it drifts north the green one. Illustrative values; take the real limits and their meaning from the chart and the List of Lights.
      </figcaption>
    </figure>
  );
}
