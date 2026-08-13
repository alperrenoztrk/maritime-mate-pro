import { Radio } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "What is the correct order and content of a MAYDAY call?",
  "How is a distress alert made with VHF DSC and which channel is used?",
  "How should I evaluate NAVTEX and SafetyNET messages?",
  "How often and how are EPIRB and SART tests carried out?",
  "What are the mandatory equipment requirements by GMDSS sea area?",
  "Which entries must be kept in the radio log book?",
];

const systemPrompt = `You are an assistant specialised in GMDSS and communications at sea.
You provide guidance on VHF/DSC, MF/HF, Inmarsat, NAVTEX, SafetyNET, EPIRB, SART, AIS and distress/urgency/safety communication procedures.
Write your answers step by step and in line with SOLAS and the ITU Radio Regulations; emphasise the order of priority and the safety warnings.
Detect the language the user asked the question in and answer in that same language.`;

export default function CommunicationAssistantPage() {
  return (
    <AssistantInterface
      title="Haberleşme Asistanı"
      badge="Haberleşme Asistanı"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="GMDSS, VHF/DSC veya acil durum haberleşmesiyle ilgili sorunuzu yazın..."
      icon={Radio}
      accentGradient="from-cyan-500 via-blue-500 to-indigo-500"
      iconColor="text-cyan-600 dark:text-cyan-400"
    />
  );
}
