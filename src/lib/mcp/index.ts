import { auth, defineMcp } from "@lovable.dev/mcp-js";
import compassConversionTool from "./tools/compass-conversion";
import greatCircleDistanceTool from "./tools/great-circle-distance";
import speedTimeDistanceTool from "./tools/speed-time-distance";

// The OAuth issuer MUST be the direct Supabase host, built from the project ref
// at build time so the entry stays import-safe (no runtime env reads).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "mariners-book-mcp",
  title: "Mariner's Book MCP",
  version: "0.1.0",
  instructions:
    "Maritime calculation tools from Mariner's Book. Use `great_circle_distance` for lat/lon distance and bearing, `compass_conversion` for CDMVT True/Magnetic/Compass conversions, and `speed_time_distance` to solve the speed/time/distance triangle.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [greatCircleDistanceTool, compassConversionTool, speedTimeDistanceTool],
});
