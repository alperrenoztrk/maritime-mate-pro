import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

// CDMVT mnemonic: Compass + Deviation = Magnetic; Magnetic + Variation = True.
// Easterly errors are positive, westerly errors are negative.
export default defineTool({
  name: "compass_conversion",
  title: "Compass ↔ Magnetic ↔ True conversion",
  description:
    "Convert between Compass, Magnetic and True headings using variation and deviation (CDMVT rule). Provide exactly one of compass, magnetic or true.",
  inputSchema: {
    compass: z.number().min(0).max(360).nullable().describe("Compass heading in degrees, or null."),
    magnetic: z.number().min(0).max(360).nullable().describe("Magnetic heading in degrees, or null."),
    trueHeading: z.number().min(0).max(360).nullable().describe("True heading in degrees, or null."),
    variation: z.number().describe("Variation in degrees. East is positive, West is negative."),
    deviation: z.number().describe("Deviation in degrees. East is positive, West is negative."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ compass, magnetic, trueHeading, variation, deviation }) => {
    const given = [compass, magnetic, trueHeading].filter((v) => v !== null).length;
    if (given !== 1) {
      return {
        content: [{ type: "text", text: "Provide exactly one of compass, magnetic, or trueHeading." }],
        isError: true,
      };
    }
    const norm = (v: number) => ((v % 360) + 360) % 360;
    let C: number, M: number, T: number;
    if (compass !== null) {
      C = compass;
      M = norm(C + deviation);
      T = norm(M + variation);
    } else if (magnetic !== null) {
      M = magnetic;
      C = norm(M - deviation);
      T = norm(M + variation);
    } else {
      T = trueHeading as number;
      M = norm(T - variation);
      C = norm(M - deviation);
    }
    const summary = `Compass ${C.toFixed(1)}° | Magnetic ${M.toFixed(1)}° | True ${T.toFixed(1)}° (Var ${variation}°, Dev ${deviation}°)`;
    return {
      content: [{ type: "text", text: summary }],
      structuredContent: { compass: C, magnetic: M, trueHeading: T, variation, deviation },
    };
  },
});
