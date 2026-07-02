import { Radio } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "MAYDAY çağrısının doğru sırası ve içeriği nedir?",
  "VHF DSC ile tehlike çağrısı nasıl yapılır ve hangi kanal kullanılır?",
  "NAVTEX ve SafetyNET mesajlarını nasıl değerlendirmeliyim?",
  "EPIRB ve SART testleri hangi sıklıkla ve nasıl yapılır?",
  "GMDSS deniz alanına göre zorunlu ekipman gereklilikleri nelerdir?",
  "Radyo log defterine hangi kayıtlar tutulmalıdır?",
];

const systemPrompt = `Sen GMDSS ve denizde haberleşme konusunda uzman bir asistansın.
VHF/DSC, MF/HF, Inmarsat, NAVTEX, SafetyNET, EPIRB, SART, AIS ve tehlike/aciliyet/emniyet haberleşme prosedürleri hakkında rehberlik verirsin.
Yanıtlarını adım adım ve SOLAS/ITU Radyo Tüzüğü'ne uygun şekilde yaz; öncelik sırasını ve emniyet uyarılarını vurgula.
Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.`;

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
