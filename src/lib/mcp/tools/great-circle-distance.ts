import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const EARTH_RADIUS_NM = 3440.065; // nautical miles

export default defineTool({
  name: "great_circle_distance",
  title: "Great-circle distance",
  description:
    "Compute the great-circle distance (in nautical miles) and initial bearing (degrees true) between two lat/lon points.",
  inputSchema: {
    lat1: z.number().min(-90).max(90).describe("Latitude of point 1 in decimal degrees."),
    lon1: z.number().min(-180).max(180).describe("Longitude of point 1 in decimal degrees."),
    lat2: z.number().min(-90).max(90).describe("Latitude of point 2 in decimal degrees."),
    lon2: z.number().min(-180).max(180).describe("Longitude of point 2 in decimal degrees."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lat1, lon1, lat2, lon2 }) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const toDeg = (r: number) => (r * 180) / Math.PI;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceNm = EARTH_RADIUS_NM * c;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const bearing = (toDeg(Math.atan2(y, x)) + 360) % 360;
    const summary = `Distance ${distanceNm.toFixed(2)} NM, initial bearing ${bearing.toFixed(1)}° True`;
    return {
      content: [{ type: "text", text: summary }],
      structuredContent: { distanceNm, initialBearingTrue: bearing },
    };
  },
});
