import { Wrench } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "The exhaust temperature of one cylinder on the main engine is 50°C higher than the others. What are the possible causes and the points to check?",
  "Our SFOC figures have risen by 5% over the last few weeks. What are the possible causes of this increase and the measures that can be taken?",
  "The HT cooling water temperature is running above normal. What are the possible causes and the check procedure?",
  "Abnormal vibration has been detected on the main engine. What is the systematic fault-finding approach and which points should be checked?",
  "The fuel viscosity has been measured low. How should the separator and viscometer checks be carried out?",
  "There is heavy black smoke from the standby diesel generator. Can you share the possible root causes and adjustment recommendations?",
];

const systemPrompt = `You are an assistant specialised as a marine engineer.
You provide guidance on ship machinery, fuel and lubricating oil systems, cooling, maintenance planning and fault finding.
Write your answers as bullet points and in an applicable form; emphasise safety and compliance with MARPOL/SOLAS and the maker's instructions.
Add step-by-step check recommendations and alarm thresholds.
Detect the language the user asked the question in and answer in that same language.`;

export default function MachineAssistant() {
  return (
    <AssistantInterface
      title="Makine Asistanı"
      badge="Makine Asistanı"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Makine sistemi ile ilgili sorunuzu veya arızayı yazın..."
      icon={Wrench}
      accentGradient="from-slate-600 via-zinc-600 to-slate-800"
      iconColor="text-slate-700 dark:text-slate-300"
    />
  );
}

