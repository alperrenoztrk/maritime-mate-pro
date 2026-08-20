// Beta: Otomatik çalışma saati çıkarımı.
// Üç görsel grubunu (personel listesi, önceki ay tablosu, jurnal sayfaları) Lovable AI vision
// üzerinden okur ve yapılandırılmış JSON döner. Çıktı tahminidir; UI tarafında düzenlenir.

import { getCorsHeaders } from "../_shared/cors.ts";
import {
  validateAuth,
  unauthorizedResponse,
  errorResponse,
  logError,
  GENERIC_ERRORS,
} from "../_shared/auth.ts";

interface ImageInput {
  // data URL: data:image/jpeg;base64,...
  dataUrl: string;
}

interface RequestBody {
  crewListImages: ImageInput[];
  previousMonthImages: ImageInput[];
  logbookImages: ImageInput[];
  monthLabel: string; // "2025-04"
  vesselName?: string;
}

interface ToolCallChoice {
  message?: {
    tool_calls?: Array<{
      function?: { name?: string; arguments?: string };
    }>;
  };
}

interface PreviousMonthResult {
  entries?: Array<{
    name: string;
    totalWorkHours: number;
    totalRestHours: number;
    notes?: string;
  }>;
}

interface LogbookResult {
  entries?: Array<{
    date: string;
    name: string;
    intervals: Array<{ start: string; end: string; activity?: string }>;
    lowConfidence?: boolean;
  }>;
}

class GatewayError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: string,
  ) {
    super(message);
    this.name = "GatewayError";
  }
}

const MODEL = "google/gemini-2.5-pro";
const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

async function callGateway(payload: unknown): Promise<unknown> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");
  const resp = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new GatewayError(`Gateway error ${resp.status}`, resp.status, text);
  }
  return await resp.json();
}

function imageContent(images: ImageInput[]): unknown[] {
  return images.map((img) => ({
    type: "image_url",
    image_url: { url: img.dataUrl },
  }));
}

async function extractCrew(images: ImageInput[]) {
  const data = await callGateway({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a ship crew list reader. Remove personnel names and ranks from the image. Just use tools.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Get the staff list in these images:" },
          ...imageContent(images),
        ],
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "return_crew",
          description: "Returns the staff list.",
          parameters: {
            type: "object",
            properties: {
              crew: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    rank: { type: "string" },
                  },
                  required: ["name", "rank"],
                  additionalProperties: false,
                },
              },
            },
            required: ["crew"],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "return_crew" } },
  });
  return parseToolCall(data, "return_crew");
}

async function extractPreviousMonth(images: ImageInput[]) {
  const data = await callGateway({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are the STCW working hours table reader. Subtract the total working and rest hours for each staff member from the previous month's summary.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Summarize the previous month's working hours table by person:",
          },
          ...imageContent(images),
        ],
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "return_previous_month",
          description: "Returns a summary of the previous month.",
          parameters: {
            type: "object",
            properties: {
              entries: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    totalWorkHours: { type: "number" },
                    totalRestHours: { type: "number" },
                    notes: { type: "string" },
                  },
                  required: ["name", "totalWorkHours", "totalRestHours"],
                  additionalProperties: false,
                },
              },
            },
            required: ["entries"],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: {
      type: "function",
      function: { name: "return_previous_month" },
    },
  });
  return parseToolCall(data, "return_previous_month");
}

async function extractLogbook(
  images: ImageInput[],
  monthLabel: string,
  knownCrew: { name: string; rank: string }[],
) {
  const crewHint = knownCrew
    .map((c) => `${c.name} (${c.rank})`)
    .slice(0, 30)
    .join(", ");
  const data = await callGateway({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a deck logbook reader. You can extract Watch and work records based on day and time. Be sure to return time ranges in HH:MM-HH:MM format. If in doubt, mark that entry as 'lowConfidence'.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Month: ${monthLabel}. Known crew (reference): ${crewHint}. Extract each crew member's working periods from the log pages below.`,
          },
          ...imageContent(images),
        ],
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "return_logbook",
          description: "Returns journal entries.",
          parameters: {
            type: "object",
            properties: {
              entries: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    date: {
                      type: "string",
                      description: "YYYY-MM-DD",
                    },
                    name: { type: "string" },
                    intervals: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          start: {
                            type: "string",
                            description: "HH:MM",
                          },
                          end: { type: "string", description: "HH:MM" },
                          activity: { type: "string" },
                        },
                        required: ["start", "end"],
                        additionalProperties: false,
                      },
                    },
                    lowConfidence: { type: "boolean" },
                  },
                  required: ["date", "name", "intervals"],
                  additionalProperties: false,
                },
              },
            },
            required: ["entries"],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "return_logbook" } },
  });
  return parseToolCall(data, "return_logbook");
}

function parseToolCall(data: unknown, fnName: string): unknown {
  const choices = (data as { choices?: ToolCallChoice[] } | null)?.choices ?? [];
  for (const c of choices) {
    const calls = c?.message?.tool_calls ?? [];
    for (const tc of calls) {
      if (tc?.function?.name === fnName) {
        try {
          return JSON.parse(tc.function.arguments ?? "{}");
        } catch {
          return {};
        }
      }
    }
  }
  return {};
}

Deno.serve(async (req) => {
  const cors = getCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  const auth = await validateAuth(req);
  if (!auth.user) return unauthorizedResponse(cors, auth.error ?? undefined);

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return errorResponse(cors, 400, GENERIC_ERRORS.INVALID_INPUT);
  }
  if (
    !body?.crewListImages?.length ||
    !body?.previousMonthImages?.length ||
    !body?.logbookImages?.length ||
    !body?.monthLabel
  ) {
    return errorResponse(cors, 400, GENERIC_ERRORS.INVALID_INPUT);
  }

  try {
    const crewResult = (await extractCrew(body.crewListImages)) as {
      crew?: { name: string; rank: string }[];
    };
    const crew = crewResult.crew ?? [];

    const [prevResult, logResult] = await Promise.all([
      extractPreviousMonth(body.previousMonthImages),
      extractLogbook(body.logbookImages, body.monthLabel, crew),
    ]) as [PreviousMonthResult, LogbookResult];

    return new Response(
      JSON.stringify({
        crew,
        previousMonth: prevResult.entries ?? [],
        logbook: logResult.entries ?? [],
      }),
      {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    logError("extract-work-hours", error);
    if (error instanceof GatewayError && error.status === 429)
      return errorResponse(cors, 429, GENERIC_ERRORS.RATE_LIMIT);
    if (error instanceof GatewayError && error.status === 402)
      return errorResponse(
        cors,
        402,
        "AI credits expired. Add credits from Workspace settings.",
      );
    return errorResponse(cors, 500);
  }
});
