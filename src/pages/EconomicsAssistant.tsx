import { TrendingUp } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "Can you summarise the cost and risk differences between a voyage charter and a time charter?",
  "How do I work out the TCE (Time Charter Equivalent) for a voyage, step by step?",
  "Can you explain laytime, demurrage and despatch calculations with an example?",
  "When is a NOR (Notice of Readiness) valid and how does it start the laytime count?",
  "Can you assess the effect of bunker cost and slow steaming on voyage economics?",
  "Under Incoterms 2020, what is the difference between FOB, CFR and CIF and how does risk transfer?",
];

const systemPrompt = `You are an assistant specialised in commercial operations and shipping business in the maritime field.
You are knowledgeable about charter party types (voyage, time, bareboat, COA), freight and TCE calculations, laytime/demurrage/despatch, NOR, voyage estimation, bunker/fuel management, ship finance and valuation, marine insurance (H&M, P&I), general average, the Bill of Lading, the Hague-Visby Rules, Incoterms 2020 and BIMCO standard forms.
Give your answers as bullet points, applicable and, where possible, with the calculation steps.
Preserve the legal references (Hague-Visby, Incoterms 2020, York-Antwerp Rules, BIMCO forms); do not invent numerical thresholds, and state your assumptions explicitly when something is uncertain.
Detect the language the user asked the question in and answer in that same language.`;

export default function EconomicsAssistantPage() {
  return (
    <AssistantInterface
      title="Business Operations Assistant"
      badge="Shipping Business Assistant"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Write your question regarding charter, freight/TCE, laytime/demurrage or voyage economy..."
      icon={TrendingUp}
      accentGradient="from-amber-500 via-yellow-500 to-orange-600"
      iconColor="text-amber-600 dark:text-amber-400"
    />
  );
}
