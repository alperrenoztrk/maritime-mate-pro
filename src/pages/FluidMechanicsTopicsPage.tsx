import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Anchor,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  FileText,
  Gauge,
  Lightbulb,
  Ruler,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fluidMechanicsTopicContents } from "@/data/fluidMechanicsContent";
import type { FluidTopicContent } from "@/data/fluidMechanicsContent";

interface FluidSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface FluidMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: FluidSubTopic[];
}

const fluidMechanicsTopics: FluidMainTopic[] = [
  {
    id: "basics",
    number: 1,
    title: "Akışkan Özellikleri ve Basınç",
    icon: Gauge,
    subtopics: [
      { id: "fluid-definition", title: "Akışkan tanımı ve sınıflandırma", hasContent: false },
      { id: "density-viscosity", title: "Yoğunluk, özgül ağırlık ve viskozite", hasContent: false },
      { id: "pressure-pascal", title: "Basınç ve Pascal prensibi", hasContent: true },
      { id: "hydrostatic-pressure", title: "Hidrostatik basınç dağılımı", hasContent: true },
    ],
  },
  {
    id: "continuity",
    number: 2,
    title: "Süreklilik ve Enerji Denklemleri",
    icon: Activity,
    subtopics: [
      { id: "continuity-equation", title: "Süreklilik denklemi (Q = A·V)", hasContent: true },
      { id: "bernoulli", title: "Bernoulli denklemi", hasContent: true },
      { id: "energy-losses", title: "Enerji çizgisi ve kayıp terimleri", hasContent: false },
    ],
  },
  {
    id: "flow-regimes",
    number: 3,
    title: "Akış Rejimleri ve Reynolds",
    icon: Waves,
    subtopics: [
      { id: "laminar-turbulent", title: "Laminer ve türbülanslı akış", hasContent: false },
      { id: "reynolds", title: "Reynolds sayısı ve kritik değerler", hasContent: true },
      { id: "velocity-profile", title: "Hız profilleri", hasContent: false },
    ],
  },
  {
    id: "pipe-flow",
    number: 4,
    title: "Boru Akışı ve Kayıplar",
    icon: Ruler,
    subtopics: [
      { id: "darcy-weisbach", title: "Darcy–Weisbach eşitliği", hasContent: true },
      { id: "friction-factor", title: "Sürtünme faktörü ve Moody diyagramı", hasContent: false },
      { id: "minor-losses", title: "Lokal kayıplar", hasContent: false },
    ],
  },
  {
    id: "pumps",
    number: 5,
    title: "Pompa ve Sistem Eğrileri",
    icon: Zap,
    subtopics: [
      { id: "pump-curves", title: "Pompa karakteristik eğrileri", hasContent: false },
      { id: "npsh-cavitation", title: "NPSH ve kavitasyon", hasContent: true },
      { id: "pump-power", title: "Pompa güç hesabı", hasContent: true },
    ],
  },
  {
    id: "flow-measurement",
    number: 6,
    title: "Debi Ölçümü ve Enstrümantasyon",
    icon: BarChart3,
    subtopics: [
      { id: "venturi-orifice", title: "Venturi ve orifis prensibi", hasContent: true },
      { id: "pitot", title: "Pitot tüpü ile hız ölçümü", hasContent: false },
      { id: "meter-selection", title: "Debi ölçer seçimi", hasContent: false },
    ],
  },
  {
    id: "marine-applications",
    number: 7,
    title: "Denizcilik Uygulamaları",
    icon: Anchor,
    subtopics: [
      { id: "ballast-bilge", title: "Balast ve sintine devreleri", hasContent: false },
      { id: "cooling-circuits", title: "Soğutma suyu devreleri", hasContent: false },
      { id: "fire-main", title: "Yangın hattı hidrolikleri", hasContent: false },
    ],
  },
];

const topicContents: Record<string, FluidTopicContent> = {
  "pressure-pascal": {
    title: "Basınç ve Pascal Prensibi",
    introduction:
      "Basınç, bir yüzeye etkiyen kuvvetin o yüzey alanına oranıdır. Akışkanlar basıncı her yöne eşit iletir; bu prensip hidrolik sistemlerin temelidir.",
    content:
      "Denizcilik uygulamalarında hidrolik dümen sistemleri, vinçler ve kapak tahrikleri bu prensibe dayanır. Basınç artışı akışkanın her noktasına aynı şekilde iletildiği için kuvvet büyütme mümkün olur.",
    bulletPoints: [
      "Basınç skaler bir büyüklüktür ve tüm yönlere eşit etki eder.",
      "Hidrolik sistemlerde küçük pistonla büyük kuvvet üretilebilir.",
    ],
    formula: {
      name: "Basınç",
      expression: "p = F / A",
      description: "Basınç = Kuvvet / Alan",
    },
    keyPoints: [
      "Basınç birimi Pa (N/m²) olarak alınır.",
      "Kapalı akışkanlarda basınç kaybı tüm noktaları etkiler.",
    ],
  },
  "hydrostatic-pressure": {
    title: "Hidrostatik Basınç Dağılımı",
    introduction:
      "Durgun bir akışkanda basınç derinlikle doğru orantılı artar. Deniz suyu basıncı gemi yapısal tasarımında belirleyici bir etkendir.",
    content:
      "Gövde sacları, balast tankları ve deniz suyu girişleri belirli derinliklerdeki basınca göre boyutlandırılır. Hidrostatik basınç, serbest yüzeyden itibaren doğrusal artış gösterir.",
    bulletPoints: [
      "Derinlik arttıkça basınç lineer artar.",
      "Yoğunluk sabit varsayılırsa hesaplama basitleşir.",
    ],
    formula: {
      name: "Hidrostatik Basınç",
      expression: "p = p₀ + ρ·g·h",
      description: "Derinlik h’deki basınç, serbest yüzey basıncına eklenir.",
    },
  },
  "continuity-equation": {
    title: "Süreklilik Denklemi",
    introduction:
      "Sürekli akışta kütle korunur. Bir kesitten giren akış miktarı, diğer kesitten çıkan akış miktarına eşittir.",
    content:
      "Sürekli akış varsayımıyla, boru çapı küçüldüğünde hız artar. Bu ilişki, deniz suyu pompaları ve boru hatlarının tasarımında kritik öneme sahiptir.",
    bulletPoints: [
      "Sıkıştırılamaz akışlarda debi sabittir.",
      "Kesit alanı küçüldükçe hız artar.",
    ],
    formula: {
      name: "Debi",
      expression: "Q = A · V",
      description: "Debi = Kesit alanı × Ortalama hız",
    },
  },
  bernoulli: {
    title: "Bernoulli Denklemi",
    introduction:
      "Enerji korunumu prensibi, akışkanın hız, basınç ve yükseklik enerjileri arasında ilişki kurar.",
    content:
      "Boru hatlarında veya nozullarda hız artışı genellikle basınç düşüşü ile dengelenir. Kayıplar eklendiğinde gerçek sistem davranışı elde edilir.",
    formula: {
      name: "Bernoulli",
      expression: "p/γ + V²/2g + z = sabit",
      description: "Basınç, hız ve yükseklik enerjilerinin toplamı korunur.",
    },
    keyPoints: [
      "Gerçek sistemlerde kayıp terimleri eklenir.",
      "Aynı akım çizgisi üzerinde uygulanır.",
    ],
  },
  reynolds: {
    title: "Reynolds Sayısı ve Akış Rejimi",
    introduction:
      "Reynolds sayısı, ataletsel ve viskoz kuvvetlerin oranıdır. Akışın laminer mi türbülanslı mı olduğunu belirler.",
    content:
      "Denizcilikte soğutma suyu, yakıt ve yağ devrelerinde Reynolds sayısı kontrol edilerek boru içi kayıplar ve ısı transferi değerlendirilir.",
    formula: {
      name: "Reynolds",
      expression: "Re = (ρ · V · D) / μ",
      description: "Reynolds sayısı akış rejimini belirler.",
    },
    bulletPoints: [
      "Re < 2300 genellikle laminer akış kabul edilir.",
      "Re > 4000 türbülanslı akış aralığıdır.",
    ],
  },
  "darcy-weisbach": {
    title: "Darcy–Weisbach Eşitliği",
    introduction:
      "Boru içi sürtünmeden kaynaklanan yük kaybı, Darcy–Weisbach eşitliğiyle ifade edilir.",
    content:
      "Pompa seçimi yapılırken toplam yük kaybı bu eşitlik ile hesaplanır ve sistem eğrisi oluşturulur.",
    formula: {
      name: "Sürtünme Kaybı",
      expression: "h_f = f · (L/D) · (V²/2g)",
      description: "Boru sürtünme kaybı, sürtünme faktörü ve hız karesine bağlıdır.",
    },
  },
  "npsh-cavitation": {
    title: "NPSH ve Kavitasyon",
    introduction:
      "Pompa girişindeki basınç, akışkanın buharlaşma basıncının altına düşerse kavitasyon oluşur.",
    content:
      "Kavitasyon; titreşim, gürültü ve çark hasarı gibi sonuçlar doğurur. NPSH değerleri, emniyetli çalışma sınırını belirler.",
    bulletPoints: [
      "Emme hattı kayıpları NPSH’yi düşürür.",
      "Soğuk akışkanlar genellikle daha düşük buhar basıncına sahiptir.",
    ],
  },
  "pump-power": {
    title: "Pompa Güç Hesabı",
    introduction:
      "Pompa gücü, akışkanın taşınması için gereken hidrolik gücün verimle düzeltilmiş halidir.",
    content:
      "Gemi makinelerinde soğutma suyu ve balast pompaları seçilirken debi, toplam yük ve verim birlikte değerlendirilir.",
    formula: {
      name: "Pompa Gücü",
      expression: "P = (ρ · g · Q · H) / η",
      description: "Hidrolik güç, pompa verimine bölünerek şaft gücü bulunur.",
    },
    keyPoints: [
      "Verim düştükçe gereken güç artar.",
      "Toplam yük, statik + dinamik kayıpları içerir.",
    ],
  },
  "venturi-orifice": {
    title: "Venturi ve Orifis Prensibi",
    introduction:
      "Akışın daralan kesitte hızlanması basınç düşüşü yaratır. Bu basınç farkı ile debi ölçülür.",
    content:
      "Venturi metreler düşük kayıp nedeniyle enerji verimlidir; orifis plakaları daha basit fakat kayıpları yüksektir.",
    bulletPoints: [
      "Basınç farkı ölçümü kalibrasyonla ilişkilendirilir.",
      "Akış yönü ve düz boru uzunluğu ölçüm hassasiyetini etkiler.",
    ],
  },
};

export default function FluidMechanicsTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSubtopicClick = (subtopicId: string, hasContent: boolean) => {
    if (hasContent && topicContents[subtopicId]) {
      setSelectedTopic(subtopicId);
    }
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const currentContent = selectedTopic ? topicContents[selectedTopic] : null;

  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-4">
            <div className="mx-auto flex max-w-4xl items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <Waves className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Akışkanlar Mekaniği</h1>
                <p className="text-sm text-muted-foreground">7 Ana Konu • Makine Müfredatı</p>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="mx-auto max-w-4xl space-y-4 p-4 pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {fluidMechanicsTopics.map((topic) => {
                const TopicIcon = topic.icon;
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="overflow-hidden rounded-xl border border-border/40 bg-card/80 backdrop-blur"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white">
                          {topic.number}
                        </span>
                        <div className="flex items-center gap-2">
                          <TopicIcon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground leading-tight">
                            {topic.title}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="mt-2 space-y-1">
                        {topic.subtopics.map((subtopic) => (
                          <motion.button
                            key={subtopic.id}
                            onClick={() => handleSubtopicClick(subtopic.id, subtopic.hasContent)}
                            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                              subtopic.hasContent && topicContents[subtopic.id]
                                ? "cursor-pointer hover:bg-primary/5"
                                : "cursor-not-allowed opacity-50"
                            }`}
                            whileTap={subtopic.hasContent && topicContents[subtopic.id] ? { scale: 0.98 } : {}}
                          >
                            {subtopic.hasContent && topicContents[subtopic.id] ? (
                              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                            ) : (
                              <Circle className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                            )}
                            <span className="text-sm text-foreground">{subtopic.title}</span>
                            {subtopic.hasContent && topicContents[subtopic.id] && (
                              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <section className="mt-6 rounded-2xl border border-border/40 bg-card/80 p-6 backdrop-blur">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Makine Hesaplamaları", href: "/machine/calculations" },
                  { title: "Makine Formülleri", href: "/machine/formulas" },
                  { title: "Makine Kuralları", href: "/machine/rules" },
                ].map((resource) => (
                  <Link
                    key={resource.href}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-primary/40 hover:bg-background"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{resource.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </section>

            <div className="flex justify-center pt-2">
              <Link
                to="/lessons"
                className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
              >
                <BookOpen className="h-4 w-4" />
                Tüm Derslere Dön
              </Link>
            </div>
          </div>
        </ScrollArea>
      </div>

      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
              <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
                <h2 className="truncate pr-4 text-lg font-bold text-foreground">
                  {currentContent.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="mx-auto max-w-4xl space-y-6 p-4 pb-20">
                <div className="rounded-xl border-l-4 border-primary bg-primary/5 p-4">
                  <p className="font-medium leading-relaxed text-foreground">
                    {currentContent.introduction}
                  </p>
                </div>

                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line leading-relaxed text-foreground">
                    {currentContent.content}
                  </div>
                </div>

                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="space-y-2 rounded-xl bg-muted/50 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">Önemli Noktalar</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.formula && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-600" />
                      <h3 className="font-semibold text-amber-700 dark:text-amber-400">
                        {currentContent.formula.name}
                      </h3>
                    </div>
                    <div className="mt-2 font-mono text-sm text-amber-700 dark:text-amber-400">
                      {currentContent.formula.expression}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {currentContent.formula.description}
                    </p>
                  </div>
                )}

                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="rounded-xl border border-border/40 bg-card/60 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">Notlar</h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm text-foreground/80">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
