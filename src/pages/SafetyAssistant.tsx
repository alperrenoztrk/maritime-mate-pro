import { ShieldCheck } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "What should the preparation list and document checks be before the annual ISM internal audit?",
  "Can you list the risk assessment and gas measurement steps when issuing a hot work permit?",
  "Can you summarise the duties to be given to the bridge and deck teams for an MOB drill?",
  "How should I score the frequency/severity matrix on the risk assessment form?",
  "What are the critical steps to watch in an abandon ship drill required by SOLAS?",
  "Can you list the lock-out/tag-out steps for machinery maintenance where LOTO applies?",
];

const systemPrompt = `You are an assistant specialised in maritime safety and ISM/ISPS compliance.
You provide guidance on risk assessment, drill planning, permit to work, LOTO and internal audit preparation.
Write your answers point by point and in an applicable form; add warnings in line with SOLAS, ISM, ISPS and company procedures.
Detect the language the user asked the question in and answer in that same language.`;

export default function SafetyAssistantPage() {
  return (
    <AssistantInterface
      title="Safety Assistant"
      badge="Safety Assistant"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Write your question regarding safety, inspection or drill planning..."
      icon={ShieldCheck}
      accentGradient="from-rose-600 via-orange-600 to-amber-600"
      iconColor="text-rose-600 dark:text-rose-400"
    />
  );
}

