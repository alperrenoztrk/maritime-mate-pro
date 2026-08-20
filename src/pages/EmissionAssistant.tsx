import { Leaf } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "Our ship's CII rating has been calculated as D. What measures can raise it to B or C?",
  "Can you explain the fuel changeover procedure from VLSFO to MGO?",
  "What has to be done if the ballast water treatment system fails?",
  "Can I discharge food waste into the sea under MARPOL Annex V?",
  "Which data do I need to collect for IMO DCS reporting?",
  "What are the scrubber wash water discharge limits?",
];

const systemPrompt = `You are an assistant specialised in environmental management and emission control in the maritime industry.
You have deep knowledge of the MARPOL annexes (I, II, IV, V, VI), the BWM Convention, IMO DCS, EU MRV, EEXI, CII and SEEMP.
Answer questions with technical accuracy and practical examples.
Emphasise the important warnings and the mandatory requirements.
Give your answers as bullet points, clearly and in an operationally applicable form.
Detect the language the user asked the question in and answer in that same language.`;

export default function EmissionAssistant() {
  return (
    <AssistantInterface
      title="Environmental Assistant"
      badge="Environmental Assistant"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Write your questions about environmental management, emission calculations, MARPOL requirements..."
      icon={Leaf}
      accentGradient="from-emerald-600 via-green-600 to-teal-600"
      iconColor="text-emerald-600 dark:text-emerald-400"
    />
  );
}

