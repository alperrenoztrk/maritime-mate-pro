import { TrendingUp } from "lucide-react";
import { AssistantInterface } from "@/components/AssistantInterface";

const quickPrompts = [
  "Voyage charter ile time charter arasındaki maliyet ve risk farklarını özetler misin?",
  "Bir sefer için TCE (Time Charter Equivalent) hesabını adım adım nasıl yaparım?",
  "Laytime, demurrage ve despatch hesaplamalarını örnekle açıklar mısın?",
  "NOR (Notice of Readiness) ne zaman geçerlidir ve laytime sayımını nasıl başlatır?",
  "Bunker maliyeti ve slow steaming'in sefer ekonomisine etkisini değerlendirir misin?",
  "Incoterms 2020 kapsamında FOB, CFR ve CIF arasındaki fark ve risk devri nedir?",
];

const systemPrompt = `Sen denizcilik alanında ticari operasyonlar ve deniz işletmeciliği uzmanı bir asistansın.
Charter party türleri (voyage, time, bareboat, COA), navlun ve TCE hesapları, laytime/demurrage/despatch, NOR, sefer tahmini (voyage estimation), bunker/yakıt yönetimi, gemi finansmanı ve değerleme, deniz sigortası (H&M, P&I), müşterek avarya, konişmento (Bill of Lading), Hague-Visby kuralları, Incoterms 2020 ve BIMCO standart formları konularında bilgi sahibisin.
Yanıtlarını maddeler halinde, uygulanabilir ve mümkün olduğunda hesap adımlarıyla ver.
Hukuki atıfları (Hague-Visby, Incoterms 2020, York-Antwerp Kuralları, BIMCO formları) koru; uydurma sayısal eşik verme, belirsizse varsayımlarını açıkça belirt.
Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.`;

export default function EconomicsAssistantPage() {
  return (
    <AssistantInterface
      title="Ticari Operasyonlar Asistanı"
      badge="Deniz İşletmeciliği Asistanı"
      quickPrompts={quickPrompts}
      systemPrompt={systemPrompt}
      placeholder="Charter, navlun/TCE, laytime/demurrage veya sefer ekonomisi ile ilgili sorunuzu yazın..."
      icon={TrendingUp}
      accentGradient="from-amber-500 via-yellow-500 to-orange-600"
      iconColor="text-amber-600 dark:text-amber-400"
    />
  );
}
