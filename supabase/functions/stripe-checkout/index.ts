import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS configuration - restrict to known origins
const ALLOWED_ORIGINS = [
  'https://50250357-50a7-4f9d-8353-23b653380abc.lovableproject.com',
  'https://id-preview--50250357-50a7-4f9d-8353-23b653380abc.lovable.app',
  // Capacitor WebView origins: iOS uses capacitor://localhost, Android uses
  // https://localhost (default androidScheme) or http://localhost.
  'capacitor://localhost',
  'ionic://localhost',
  'https://localhost',
  'http://localhost',
  'http://localhost:5173',
  'http://localhost:8080',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin) ||
    /^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin) ||
    /^https?:\/\/localhost(:\d+)?$/.test(origin)
  );
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

interface CreateCheckoutBody {
  priceId?: string;
  successUrl?: string;
  cancelUrl?: string;
  mode?: "payment" | "subscription";
  quantity?: number;
  customerEmail?: string;
}

// Minimal Stripe REST call using fetch to avoid external deps on Deno Edge
async function createStripeCheckoutSession(params: CreateCheckoutBody, corsHeaders: Record<string, string>) {
  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) {
    return new Response(
      JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const priceId = params.priceId || Deno.env.get("STRIPE_DEFAULT_PRICE_ID");
  if (!priceId) {
    return new Response(
      JSON.stringify({ error: "Missing priceId or STRIPE_DEFAULT_PRICE_ID" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const successUrl = params.successUrl || Deno.env.get("STRIPE_SUCCESS_URL") || "https://example.com/success";
  const cancelUrl = params.cancelUrl || Deno.env.get("STRIPE_CANCEL_URL") || "https://example.com/cancel";
  const mode = params.mode || (Deno.env.get("STRIPE_DEFAULT_MODE") as "payment" | "subscription") || "payment";
  const quantity = params.quantity ?? 1;

  const body: any = {
    mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [
      {
        price: priceId,
        quantity,
      },
    ],
  };

  if (params.customerEmail) {
    body.customer_email = params.customerEmail;
  }

  const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(
      Object.fromEntries(
        Object.entries(body).flatMap(([key, value]) => {
          if (key === "line_items") {
            // Encode nested line_items as line_items[0][price], line_items[0][quantity]
            const items = value as Array<Record<string, unknown>>;
            return items.flatMap((item, index) =>
              Object.entries(item).map(([k, v]) => [
                `line_items[${index}][${k}]`,
                String(v),
              ] as [string, string])
            );
          }
          return [[key, String(value)]] as [string, string][];
        }),
      ),
    ),
  });

  const text = await resp.text();
  if (!resp.ok) {
    console.error("Stripe error:", text);
    return new Response(
      JSON.stringify({ error: "Stripe request failed", details: text }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  return new Response(text, {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json().catch(() => ({}))) as CreateCheckoutBody & { test?: boolean };
    
    // Health check request
    if (body.test === true) {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
      return new Response(
        JSON.stringify({ status: stripeKey ? "configured" : "missing_key" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return await createStripeCheckoutSession(body, corsHeaders);
  } catch (e) {
    console.error("Function error:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
