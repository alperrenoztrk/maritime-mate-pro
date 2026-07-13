import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

// Solve the classic speed/time/distance triangle. Provide exactly two of the three.
export default defineTool({
  name: "speed_time_distance",
  title: "Speed / Time / Distance",
  description:
    "Solve for the missing value in the speed–time–distance relationship. Speed in knots, time in hours, distance in nautical miles. Provide exactly two of the three.",
  inputSchema: {
    speedKnots: z.number().positive().nullable().describe("Speed in knots, or null."),
    timeHours: z.number().positive().nullable().describe("Time in hours, or null."),
    distanceNm: z.number().positive().nullable().describe("Distance in nautical miles, or null."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ speedKnots, timeHours, distanceNm }) => {
    const given = [speedKnots, timeHours, distanceNm].filter((v) => v !== null).length;
    if (given !== 2) {
      return {
        content: [{ type: "text", text: "Provide exactly two of speedKnots, timeHours, distanceNm." }],
        isError: true,
      };
    }
    let s = speedKnots, t = timeHours, d = distanceNm;
    if (s === null) s = (d as number) / (t as number);
    else if (t === null) t = (d as number) / (s as number);
    else d = (s as number) * (t as number);
    const summary = `Speed ${s!.toFixed(2)} kn · Time ${t!.toFixed(2)} h · Distance ${d!.toFixed(2)} NM`;
    return {
      content: [{ type: "text", text: summary }],
      structuredContent: { speedKnots: s, timeHours: t, distanceNm: d },
    };
  },
});
