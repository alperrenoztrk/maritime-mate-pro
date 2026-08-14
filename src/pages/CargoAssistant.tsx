import { Boxes } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "Can you list the pre-loading draft survey steps and the corrections required?",
  "What are the segregation, ventilation and fire precautions for IMDG Class 3 cargoes?",
  "How is the list moment check and the operational limits calculated for grain cargoes?",
  "How do I select the tackle and check deck strength in a heavy-lift operation?",
  "How do I optimise the power load plan for reefer containers?",
  "Can you give advice on keeping trim and stability safe during cargo handling in port?",
];

const systemPrompt = `You are an assistant specialised in cargo and operations in the maritime field.
You are knowledgeable about loading plans, draft surveys, trim/stability, IMDG, IMSBC, the Grain Code, charter parties and terminal operations.
Give your answers as bullet points and in an actionable form.
Emphasise safety, class and SOLAS/MARPOL requirements; write the calculation or check steps clearly.
Detect the language the user asked the question in and answer in that same language.`;

export default function CargoAssistantPage() {
  return (
    <AssistantInterface
      title="Yük Elleçleme ve İstifleme Asistanı"
      badge="Kargo Asistanı"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Kargo operasyonu, trim/stabilite veya IMDG ile ilgili sorunuzu yazın..."
      icon={Boxes}
      accentGradient="from-amber-600 via-orange-600 to-rose-600"
      iconColor="text-amber-600 dark:text-amber-400"
    />
  );
}

