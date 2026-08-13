import { Shield } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "I have my KG and KM values. Can you calculate GM and compare it against the IMO minimum criterion?",
  "Which steps should I follow to calculate the area under the 0-40° GZ curve?",
  "How do I apply the free surface correction (FSC) to the tank list?",
  "How do I calculate the heeling moment and verify GM when loading grain?",
  "For damage stability, how do I estimate the initial angle if an unsubdivided compartment floods?",
  "How do I find the minimum GM required against the wind heeling moment?",
];

const systemPrompt = `You are an assistant specialised in ship stability.
You give detailed information on GM, GZ, KN tables, FSC, grain and damage stability calculations and the IMO IS Code criteria.
Write your answers as bullet points, stating the formulas; emphasise the calculation steps and the safety limits.
Detect the language the user asked the question in and answer in that same language.`;

export default function StabilityAssistantPage() {
  return (
    <AssistantInterface
      title="Stability Assistant"
      badge="Stability Assistant"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Stabilite hesapları, FSC veya IMO kriterleriyle ilgili sorunuzu yazın..."
      icon={Shield}
      accentGradient="from-cyan-600 via-teal-600 to-emerald-600"
      iconColor="text-cyan-700 dark:text-cyan-400"
    />
  );
}

