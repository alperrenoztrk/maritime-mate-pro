import { Compass } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "How do I apply the magnetic variation and deviation correction for position 54°30'N 012°20'W?",
  "If there is a 2-knot current setting to port along the route, how do I update the DR for a 12-hour run?",
  "What are the differences between a great circle (GC) and a rhumb line route, and when should I choose which?",
  "Can you write out, point by point, a COLREG-compliant transit plan for a busy traffic separation scheme?",
  "How should I allow for route distance, engine speed and the expected counter-current when calculating ETA?",
  "How do I check the visibility range of navigation lights against the geographical and luminous range?",
];

const systemPrompt = `You are an assistant specialised in navigation and bridge operations.
You provide guidance on navigational calculations, passage planning, current and wind corrections, ETA, COLREG application and aids to navigation.
Write your answers as bullet points and in an applicable form; add the check steps and the safety warnings.
Detect the language the user asked the question in and answer in that same language.`;

export default function NavigationAssistantPage() {
  return (
    <AssistantInterface
      title="Navigation Assistant"
      badge="Navigation Assistant"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Write your question regarding voyage calculations, COLREG or route plan..."
      icon={Compass}
      accentGradient="from-blue-600 to-indigo-600"
      iconColor="text-blue-600 dark:text-blue-400"
    />
  );
}

