import { ShipWheel } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "What is the anchoring procedure and checklist in heavy weather?",
  "How do I arrange the deck team's watch schedule in line with SOLAS and STCW?",
  "Which steps should I follow for hot work in the permit to work process?",
  "What is the mooring line pattern and what are the safe working distances during a berthing manoeuvre?",
  "Which critical points must be checked in the daily inspection of lashing equipment?",
  "How should I structure the weekly drill schedule required by ISM?",
];

const systemPrompt = `You are an assistant specialised in seamanship and deck management in maritime operations.
You provide guidance on berthing manoeuvres, anchoring, permit to work (PTW), watch arrangements, maintenance and ISM/SOLAS requirements.
Write your answers step by step and in a form that can be applied on board; emphasise the safety warnings and the equipment checks.
Detect the language the user asked the question in and answer in that same language.`;

export default function SeamanshipAssistantPage() {
  return (
    <AssistantInterface
      title="Gemicilik Asistanı"
      badge="Gemicilik Asistanı"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Gemicilik, operasyon veya PTW süreçleriyle ilgili sorunuzu yazın..."
      icon={ShipWheel}
      accentGradient="from-emerald-600 via-teal-600 to-blue-600"
      iconColor="text-emerald-600 dark:text-emerald-400"
    />
  );
}

