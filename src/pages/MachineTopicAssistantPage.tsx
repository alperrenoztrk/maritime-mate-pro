import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { AssistantInterface } from "@/components/AssistantInterface";

const topicAssistantConfig: Record<string, { quickPrompts: string[]; systemPrompt: string }> = {
  thermodynamics: {
    quickPrompts: [
      "Otto ve Diesel çevrimlerinin verim farklarını karşılaştır.",
      "Egzoz gazı economizer verimliliği nasıl hesaplanır?",
      "Isı eşanjöründe fouling etkisi ve LMTD değişimi nasıl yorumlanır?",
      "Carnot verimi ile gerçek çevrim verimi arasındaki fark neden oluşur?",
    ],
    systemPrompt: "Sen gemi termodinamik ve ısı tekniği uzmanısın. Isı çevrimleri, enerji dönüşümleri, verim hesapları ve ısı transferi konularında rehberlik verirsin. Yanıtlarını teknik ve formül destekli yaz. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "fluid-mechanics": {
    quickPrompts: [
      "Santrifüj pompada kavitasyon belirtileri ve önlemleri nelerdir?",
      "Boru hattında basınç kaybı hesabı nasıl yapılır?",
      "Paralel çalışan pompalarda debi ve basınç değişimi nasıl olur?",
      "Reynolds sayısına göre akış rejimini nasıl belirlerim?",
    ],
    systemPrompt: "Sen gemi akışkanlar mekaniği uzmanısın. Pompa seçimi, boru hesapları, basınç kayıpları, valf tipleri ve akış analizleri konusunda teknik rehberlik verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "machine-elements": {
    quickPrompts: [
      "Pervane şaftı çapı nasıl hesaplanır?",
      "Titreşim analizinde alarm ve tehlike eşikleri nedir?",
      "Rulman arızası belirtileri ve kontrol yöntemleri nelerdir?",
      "Korozyon türleri ve gemide en sık görülen korozyon tipleri nelerdir?",
    ],
    systemPrompt: "Sen gemi makine elemanları ve malzeme bilgisi uzmanısın. Miller, yataklar, kaplinler, titreşim analizi, malzeme seçimi ve korozyon yönetimi konularında teknik danışmanlık verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "diesel-engines": {
    quickPrompts: [
      "Bir silindirde yüksek egzoz sıcaklığının olası nedenleri nelerdir?",
      "İki zamanlı ve dört zamanlı motorların karşılaştırması?",
      "Common rail enjeksiyon sisteminin avantajları nelerdir?",
      "Scavenge fire belirtileri ve müdahale prosedürü nedir?",
    ],
    systemPrompt: "Sen deniz dizel motorları uzmanısın. İki ve dört zamanlı motorlar, yanma süreci, enjeksiyon sistemleri, performans parametreleri ve arıza tespiti konularında deneyimli bir mühendissin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "ship-systems": {
    quickPrompts: [
      "Yakıt sistemi arıtma sırasının doğru akışı nedir?",
      "Yağlama yağı basınç düşüşünün olası nedenleri?",
      "HT ve LT soğutma devrelerinin farkı ve bağlantıları?",
      "Egzoz sistemi back pressure yüksekliğinin etkileri?",
    ],
    systemPrompt: "Sen gemi makine sistemleri uzmanısın. Yakıt, yağlama, soğutma, hava/egzoz ve buhar sistemleri konularında teknik rehberlik verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  auxiliary: {
    quickPrompts: [
      "Jeneratör paralel bağlama prosedürü nasıldır?",
      "Kazan su seviye kontrolü ve alarm sistemleri nasıl çalışır?",
      "Separatör performansı nasıl değerlendirilir?",
      "Tatlı su jeneratörü verimini etkileyen faktörler nelerdir?",
    ],
    systemPrompt: "Sen gemi yardımcı makineleri uzmanısın. Jeneratörler, kazanlar, separatörler, kompresörler, tatlı su jeneratörleri ve pompa sistemleri konularında rehberlik verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "fuel-technology": {
    quickPrompts: [
      "HFO'dan MGO'ya geçiş prosedürü nasıl yapılmalı?",
      "CCAI değeri yakıt kalitesi hakkında ne söyler?",
      "Yakıt filtre tıkanması ve separatör sorunlarının kök nedenleri?",
      "LNG yakıtlı gemilerde BOG yönetimi nasıl yapılır?",
    ],
    systemPrompt: "Sen yakıt teknolojisi ve yönetimi uzmanısın. HFO, MGO, LNG yakıt özellikleri, arıtma süreçleri, viskozite kontrolü ve yakıt kaynaklı arızalar konusunda danışmanlık verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "cooling-hvac": {
    quickPrompts: [
      "Soğutma sisteminde basınç değerleri normalden yüksekse ne yapılmalı?",
      "R-134a'dan R-290'a geçiş yapılabilir mi?",
      "Provision soğutma odası sıcaklık ayarları nedir?",
      "Klima sisteminde nem kontrolü nasıl sağlanır?",
    ],
    systemPrompt: "Sen gemi soğutma ve klima sistemleri uzmanısın. Soğutma çevrimleri, soğutucu akışkanlar, provision soğutma, reefer kargo ve klima sistemleri konusunda rehberlik verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  electrical: {
    quickPrompts: [
      "Black-out senaryosunda acil güç devreye alma adımları?",
      "Toprak kaçağı alarm prosedürü ve arıza tespiti?",
      "Shore connection prosedürü ve güvenlik önlemleri?",
      "Selektif koruma ayarı nasıl yapılır?",
    ],
    systemPrompt: "Sen gemi elektrik sistemleri uzmanısın. AC/DC dağıtım, jeneratör senkronizasyonu, koruma sistemleri, kablo hesapları ve black-out yönetimi konularında rehberlik verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  automation: [
    "PID kontrol parametreleri nasıl ayarlanır?",
    "Alarm sistemi test prosedürü nedir?",
    "4-20 mA sinyal kalibrasyonu nasıl yapılır?",
    "UMS gemilerde köprüüstü alarm yönetimi?",
  ].length ? {
    quickPrompts: [
      "PID kontrol parametreleri nasıl ayarlanır?",
      "Alarm sistemi test prosedürü nedir?",
      "4-20 mA sinyal kalibrasyonu nasıl yapılır?",
      "UMS gemilerde köprüüstü alarm yönetimi?",
    ],
    systemPrompt: "Sen gemi otomasyon ve kontrol sistemleri uzmanısın. Sensörler, transmitterler, PLC, alarm/izleme sistemleri ve uzaktan kontrol konularında danışmanlık verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  } : { quickPrompts: [], systemPrompt: "" },
  "engine-room-ops": {
    quickPrompts: [
      "Seyir öncesi makine hazırlık kontrol listesi?",
      "Makine vardiya devir teslim prosedürü nedir?",
      "Ana makine devreye alma adımları?",
      "Liman operasyonlarında makine dairesi hazırlıkları?",
    ],
    systemPrompt: "Sen makine dairesi operasyonları uzmanısın. Vardiya prosedürleri, seyir hazırlığı, devreye alma/durdurma ve liman operasyonları konularında rehberlik verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  maintenance: {
    quickPrompts: [
      "Planlı bakım sistemi (PMS) nasıl etkin kullanılır?",
      "Yağ analiz sonuçları nasıl yorumlanır?",
      "Klas survey'leri için hazırlık kontrol listesi?",
      "MTBF ve MTTR değerleri bakım planlamasında nasıl kullanılır?",
    ],
    systemPrompt: "Sen gemi bakım ve tutum yönetimi uzmanısın. Planlı bakım, kestirimci bakım, yağ analizleri, klas gereklilikleri ve bakım KPI'ları konularında danışmanlık verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "engine-room-safety": {
    quickPrompts: [
      "Makine dairesi yangınında ilk müdahale adımları?",
      "Crankcase patlaması riski ve önlemleri?",
      "CO₂ söndürme sistemi devreye alma prosedürü?",
      "Makine dairesi kapalı alan giriş prosedürü?",
    ],
    systemPrompt: "Sen makine dairesi güvenliği uzmanısın. Yangın güvenliği, patlama riskleri, acil durdurma sistemleri, kapalı alan güvenliği ve makine kazaları konularında rehberlik verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "environment-machine": {
    quickPrompts: [
      "OWS 15 ppm sınırını aştığında ne yapılmalı?",
      "Sludge tank yönetimi ve bertaraf prosedürleri?",
      "IAPP sertifikası için gerekli kontroller?",
      "Gemi içi atık yönetim planı neleri kapsar?",
    ],
    systemPrompt: "Sen gemi çevre yönetimi ve MARPOL uzmanısın. Sintine, atık yağ, sewage sistemleri, emisyon kontrolü ve çevresel uyumluluk konularında danışmanlık verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  erm: {
    quickPrompts: [
      "Makine dairesinde risk değerlendirmesi nasıl yapılır?",
      "Yorgunluk yönetimi için etkili stratejiler nelerdir?",
      "Takım içi iletişim hataları nasıl azaltılır?",
      "Near-miss raporlama sistemi nasıl kurulur?",
    ],
    systemPrompt: "Sen Engine Resource Management (ERM) uzmanısın. Vardiya yönetimi, insan faktörü, karar verme, liderlik, iletişim ve risk değerlendirmesi konularında rehberlik verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
  "energy-efficiency": {
    quickPrompts: [
      "CII derecelendirmesini iyileştirmek için neler yapılabilir?",
      "EEXI hesaplaması nasıl yapılır?",
      "Atık ısı geri kazanım sistemi verimliliği nasıl artırılır?",
      "Trim optimizasyonuyla yakıt tasarrufu nasıl sağlanır?",
    ],
    systemPrompt: "Sen gemi enerji verimliliği uzmanısın. EEDI, EEXI, CII, SEEMP, atık ısı geri kazanımı, trim optimizasyonu ve yakıt tasarrufu konularında teknik danışmanlık verirsin. Kullanıcının sorusunu hangi dilde sorduğunu tespit et ve aynı dilde cevap ver.",
  },
};

export default function MachineTopicAssistantPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const config = topicSlug ? topicAssistantConfig[topicSlug] : null;

  if (!topic || !config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  return (
    <AssistantInterface
      title={`${topic.title} Asistanı`}
      badge={topic.title}
      quickPrompts={config.quickPrompts}
      systemPrompt={config.systemPrompt}
      placeholder={`${topic.title} ile ilgili sorunuzu yazın...`}
      icon={topic.icon}
      accentGradient={topic.accent}
      iconColor="text-white"
    />
  );
}
