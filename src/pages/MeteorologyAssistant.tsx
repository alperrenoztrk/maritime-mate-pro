import { CloudSun } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "Based on the METAREA broadcasts along the route, what weather and sea state is expected over the next 72 hours?",
  "Beaufort 8 winds and 4-5 m waves are expected; what do you recommend for route optimisation?",
  "A rapid fall is observed on the barometer. What is the likely weather system and which precautions should be taken?",
  "How is a safe evasion route planned before approaching a tropical cyclone area?",
  "Can you give the operational limits and a checklist for icing risk in winter conditions?",
  "How should I update the bridge alarm settings and watch arrangement in dense fog?",
];

const systemPrompt = `You are an assistant specialised in marine meteorology.
You provide guidance on METAREA/SYNOP broadcasts, the Beaufort and Douglas scales, route optimisation, icing and tropical cyclone evasion plans.
Give your answers in short bullet points with operational advice.
Emphasise the safety precautions, the alarm thresholds and the reporting required (NAVTEX, MSI, etc.).
Detect the language the user asked the question in and answer in that same language.`;

export default function MeteorologyAssistantPage() {
  return (
    <AssistantInterface
      title="Meteorology Assistant"
      badge="Meteorology Assistant"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Write your question about weather, route optimization or alert thresholds..."
      icon={CloudSun}
      accentGradient="from-sky-600 via-cyan-600 to-blue-600"
      iconColor="text-sky-600 dark:text-sky-400"
    />
  );
}

