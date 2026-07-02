import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Target, 
  Clock, 
  Award, 
  BookOpen, 
  Shuffle,
  Play,
  RotateCcw,
  ChevronRight,
  Anchor,
  Compass,
  Shield,
  Box,
  Ship,
  Cog,
  Cloud,
  Trophy,
  Flame,
  Star,
  Zap,
  BarChart3,
  User
} from "lucide-react";

import { StabilityQuiz } from "@/components/stability/StabilityQuiz";
import { QuizStatsDashboard } from "@/components/quiz/QuizStatsDashboard";
import { stabilityQuestions } from "@/data/stabilityQuestions";
import { navigationQuestions } from "@/data/navigationQuestions";
import { safetyQuestions } from "@/data/safetyQuestions";
import { cargoQuestions } from "@/data/cargoQuestions";
import { seamanshipQuestions } from "@/data/seamanshipQuestions";
import { machineQuestions } from "@/data/machineQuestions";
import { meteorologyQuestions } from "@/data/meteorologyQuestions";
import { createSeededRng, pickRandomUnique } from "@/utils/random";
import { useQuizStats } from "@/hooks/useQuizStats";
import { supabase } from "@/integrations/supabase/safeClient";
import type { QuizQuestion } from "@/types/quiz";

// Exam module configuration
const examModules = [
  {
    id: "stability",
    title: "Stabilite",
    icon: Anchor,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    questions: stabilityQuestions,
    description: "IS Code, GZ eğrileri, serbest yüzey, hasarlı stabilite",
    topics: ["IS Code 2008", "Grain Code", "GZ/KN", "Serbest Yüzey", "Hasarlı Stabilite"]
  },
  {
    id: "navigation",
    title: "Seyir",
    icon: Compass,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    questions: navigationQuestions,
    description: "Pusula, plotting, COLREG, astronomik seyir, GNSS",
    topics: ["Pusula Hesaplamaları", "Akıntı & Rüzgar", "COLREG", "Elektronik Seyir", "Astronomik Seyir"]
  },
  {
    id: "safety",
    title: "Emniyet",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    questions: safetyQuestions,
    description: "SOLAS, ISM/ISPS, LSA, FFA, PTW, GMDSS",
    topics: ["SOLAS/LSA", "ISM/ISPS", "FFA", "GMDSS", "PTW"]
  },
  {
    id: "cargo",
    title: "Kargo",
    icon: Box,
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    questions: cargoQuestions,
    description: "IMSBC, IMDG, Grain Code, Draft Survey, Konteyner",
    topics: ["IMSBC", "IMDG", "Draft Survey", "Grain", "Konteyner"]
  },
  {
    id: "seamanship",
    title: "Gemicilik",
    icon: Ship,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    questions: seamanshipQuestions,
    description: "Demirleme, palamar, düğümler, manevra, iş emniyeti",
    topics: ["Demirleme", "Palamar", "Düğümler", "COLREG", "İş Emniyeti"]
  },
  {
    id: "machine",
    title: "Makine",
    icon: Cog,
    color: "from-slate-500 to-zinc-500",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
    questions: machineQuestions,
    description: "Ana makine, yakıt sistemi, elektrik, kazan, bakım",
    topics: ["Ana Makine", "Yakıt Sistemi", "Elektrik & Jeneratör", "MARPOL", "Bakım"]
  },
  {
    id: "meteorology",
    title: "Meteoroloji",
    icon: Cloud,
    color: "from-sky-500 to-indigo-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    questions: meteorologyQuestions,
    description: "Rüzgar, basınç sistemleri, fırtına, dalgalar, sis",
    topics: ["Beaufort", "Basınç Sistemleri", "Tropikal Meteoroloji", "Cepheler", "Dalgalar"]
  }
];

// Preset exam configurations
const examPresets = [
  {
    id: "quick",
    title: "Hızlı Test",
    description: "10 soruluk hızlı değerlendirme",
    icon: Zap,
    count: 10,
    time: 10,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "standard",
    title: "Standart Sınav",
    description: "25 soruluk kapsamlı test",
    icon: Target,
    count: 25,
    time: 30,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "full",
    title: "Tam Sınav",
    description: "50 soruluk derinlemesine sınav",
    icon: Award,
    count: 50,
    time: 60,
    color: "from-purple-500 to-violet-500"
  },
  {
    id: "marathon",
    title: "Maraton",
    description: "100 soruluk zorlu maraton",
    icon: Trophy,
    count: 100,
    time: 120,
    color: "from-orange-500 to-red-500"
  }
];

// Deck Officer exam simulation
const deckOfficerExams = [
  {
    id: "3rd-officer",
    title: "3. Zabit Sınavı",
    description: "Vardiya Zabiti yeterliliği",
    modules: ["navigation", "stability", "safety", "seamanship", "meteorology"],
    questionDistribution: { navigation: 30, stability: 25, safety: 20, seamanship: 15, meteorology: 10 },
    totalQuestions: 50,
    passingScore: 60,
    icon: Star
  },
  {
    id: "2nd-officer",
    title: "2. Zabit Sınavı",
    description: "Baş Vardiya Zabiti yeterliliği",
    modules: ["navigation", "stability", "safety", "cargo", "seamanship"],
    questionDistribution: { navigation: 25, stability: 25, safety: 20, cargo: 20, seamanship: 10 },
    totalQuestions: 50,
    passingScore: 65,
    icon: Star
  },
  {
    id: "chief-officer",
    title: "1. Zabit Sınavı",
    description: "Birinci Zabit yeterliliği",
    modules: ["navigation", "stability", "safety", "cargo", "seamanship"],
    questionDistribution: { navigation: 20, stability: 30, safety: 15, cargo: 25, seamanship: 10 },
    totalQuestions: 60,
    passingScore: 70,
    icon: Flame
  },
  {
    id: "master",
    title: "Kaptan Sınavı",
    description: "Gemi Kaptanı yeterliliği",
    modules: ["navigation", "stability", "safety", "cargo", "seamanship", "meteorology"],
    questionDistribution: { navigation: 20, stability: 25, safety: 15, cargo: 20, seamanship: 10, meteorology: 10 },
    totalQuestions: 75,
    passingScore: 75,
    icon: Trophy
  }
];

export default function ExamPreparationPage() {
  const [activeTab, setActiveTab] = useState("modules");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [selectedOfficerExam, setSelectedOfficerExam] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizActive, setQuizActive] = useState(false);
  const [lastScore, setLastScore] = useState<{ score: number; total: number } | null>(null);
  const [seed, setSeed] = useState<number>(Date.now());
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const quizStartTime = useRef<number>(0);

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Quiz stats hook
  const { saveQuizResult, refresh: refreshStats } = useQuizStats(userId);

  // Calculate total questions
  const totalQuestions = useMemo(() => {
    return examModules.reduce((sum, mod) => sum + mod.questions.length, 0);
  }, []);

  // Generate questions for module-based quiz
  const startModuleQuiz = (moduleId: string, count: number) => {
    const module = examModules.find(m => m.id === moduleId);
    if (!module) return;

    const rng = createSeededRng(seed);
    const selected = pickRandomUnique(module.questions, Math.min(count, module.questions.length), rng);
    setQuizQuestions(selected);
    setSelectedModule(moduleId);
    setSelectedAnswers({});
    quizStartTime.current = Date.now();
    setQuizActive(true);
  };

  // Generate questions for preset exam
  const startPresetExam = (presetId: string) => {
    const preset = examPresets.find(p => p.id === presetId);
    if (!preset) return;

    // Combine all questions and pick randomly
    const allQuestions = examModules.flatMap(m => m.questions);
    const rng = createSeededRng(seed);
    const selected = pickRandomUnique(allQuestions, Math.min(preset.count, allQuestions.length), rng);
    setQuizQuestions(selected);
    setSelectedPreset(presetId);
    setSelectedAnswers({});
    quizStartTime.current = Date.now();
    setQuizActive(true);
  };

  // Generate questions for officer exam simulation
  const startOfficerExam = (examId: string) => {
    const exam = deckOfficerExams.find(e => e.id === examId);
    if (!exam) return;

    const rng = createSeededRng(seed);
    const selected: QuizQuestion[] = [];

    // Pick questions according to distribution
    for (const moduleId of exam.modules) {
      const module = examModules.find(m => m.id === moduleId);
      if (!module) continue;

      const percentage = exam.questionDistribution[moduleId as keyof typeof exam.questionDistribution] || 0;
      const count = Math.round((percentage / 100) * exam.totalQuestions);
      const moduleQuestions = pickRandomUnique(module.questions, Math.min(count, module.questions.length), rng);
      selected.push(...moduleQuestions);
    }

    // Shuffle final selection
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }

    setQuizQuestions(selected.slice(0, exam.totalQuestions));
    setSelectedOfficerExam(examId);
    setSelectedAnswers({});
    quizStartTime.current = Date.now();
    setQuizActive(true);
  };

  const handleQuizComplete = async (score: number, total: number, answers: { [key: number]: number }) => {
    setLastScore({ score, total });
    setSelectedAnswers(answers);

    // Save to database if user is logged in
    if (userId) {
      const moduleId = selectedModule || selectedPreset || selectedOfficerExam || 'mixed';
      const examType = selectedModule ? 'module' : selectedPreset ? 'preset' : 'officer';
      const examName = selectedModule 
        ? examModules.find(m => m.id === selectedModule)?.title || 'Quiz'
        : selectedPreset
          ? examPresets.find(p => p.id === selectedPreset)?.title || 'Sınav'
          : selectedOfficerExam
            ? deckOfficerExams.find(e => e.id === selectedOfficerExam)?.title || 'Zabit Sınavı'
            : 'Quiz';

      const timeSpent = Math.round((Date.now() - quizStartTime.current) / 1000);

      try {
        await saveQuizResult(
          moduleId,
          examType as 'module' | 'preset' | 'officer',
          examName,
          score,
          total,
          quizQuestions,
          answers,
          timeSpent
        );
        refreshStats();
      } catch (err) {
        console.error('Failed to save quiz result:', err);
      }
    }
  };

  const resetQuiz = () => {
    setQuizActive(false);
    setSelectedModule(null);
    setSelectedPreset(null);
    setSelectedOfficerExam(null);
    setQuizQuestions([]);
    setSeed(Date.now());
  };

  // Active quiz view
  if (quizActive && quizQuestions.length > 0) {
    const currentExamTitle = selectedModule 
      ? examModules.find(m => m.id === selectedModule)?.title
      : selectedPreset
        ? examPresets.find(p => p.id === selectedPreset)?.title
        : selectedOfficerExam
          ? deckOfficerExams.find(e => e.id === selectedOfficerExam)?.title
          : "Quiz";

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">{currentExamTitle}</h1>
              <Badge variant="secondary">{quizQuestions.length} Soru</Badge>
            </div>
            <Button variant="outline" size="sm" onClick={resetQuiz}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
          </div>

          <StabilityQuiz 
            questions={quizQuestions} 
            onComplete={handleQuizComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Sınav Hazırlık Merkezi</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <BookOpen className="h-3 w-3" />
                {totalQuestions} Soru
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSeed(Date.now())}
                className="gap-1"
              >
                <Shuffle className="h-4 w-4" />
                Karıştır
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Last score display */}
        {lastScore && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Son Sonuç:</span>
                  <span className="font-bold text-lg">
                    {lastScore.score}/{lastScore.total}
                  </span>
                  <span className="text-muted-foreground">
                    ({Math.round((lastScore.score / lastScore.total) * 100)}%)
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setLastScore(null)}>
                  Kapat
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="modules" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Modüller
            </TabsTrigger>
            <TabsTrigger value="presets" className="gap-2">
              <Target className="h-4 w-4" />
              Hızlı Sınav
            </TabsTrigger>
            <TabsTrigger value="officer" className="gap-2">
              <Award className="h-4 w-4" />
              Zabit Sınavları
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              İstatistikler
            </TabsTrigger>
          </TabsList>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-4 mt-4">
            <QuizStatsDashboard userId={userId} />
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {examModules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`relative overflow-hidden hover:shadow-lg transition-all ${module.borderColor} ${module.bgColor}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5`} />
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${module.color}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <Badge variant="secondary">{module.questions.length} soru</Badge>
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {module.topics.slice(0, 3).map(topic => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {module.topics.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{module.topics.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1"
                            onClick={() => startModuleQuiz(module.id, 10)}
                          >
                            10 Soru
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1"
                            onClick={() => startModuleQuiz(module.id, 25)}
                          >
                            25 Soru
                          </Button>
                          <Button 
                            size="sm"
                            className={`flex-1 bg-gradient-to-r ${module.color} text-white`}
                            onClick={() => startModuleQuiz(module.id, module.questions.length)}
                          >
                            Tümü
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Presets Tab */}
          <TabsContent value="presets" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {examPresets.map((preset, index) => {
                const Icon = preset.icon;
                return (
                  <motion.div
                    key={preset.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="relative overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => startPresetExam(preset.id)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${preset.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${preset.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{preset.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {preset.count} soru
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              ~{preset.time} dk
                            </span>
                          </div>
                        </div>
                        <Button size="icon" variant="ghost" className="shrink-0">
                          <Play className="h-5 w-5" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Combined topic exam */}
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shuffle className="h-5 w-5" />
                  Karışık Konu Sınavı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[10, 25, 50, 100].map(count => (
                    <Button 
                      key={count}
                      variant="outline"
                      onClick={() => startPresetExam(examPresets.find(p => p.count === count)?.id || "standard")}
                    >
                      {count} Soru
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Officer Exams Tab */}
          <TabsContent value="officer" className="space-y-4 mt-4">
            <div className="grid gap-4">
              {deckOfficerExams.map((exam, index) => {
                const Icon = exam.icon;
                return (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="relative overflow-hidden hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/60">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="font-bold text-lg">{exam.title}</h3>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {exam.modules.map(moduleId => {
                                const module = examModules.find(m => m.id === moduleId);
                                if (!module) return null;
                                const ModuleIcon = module.icon;
                                const percentage = exam.questionDistribution[moduleId as keyof typeof exam.questionDistribution];
                                return (
                                  <Badge key={moduleId} variant="secondary" className="gap-1">
                                    <ModuleIcon className="h-3 w-3" />
                                    {module.title} ({percentage}%)
                                  </Badge>
                                );
                              })}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  {exam.totalQuestions} soru
                                </span>
                                <span className="flex items-center gap-1">
                                  <Award className="h-4 w-4" />
                                  Geçme: %{exam.passingScore}
                                </span>
                              </div>
                              <Button 
                                className="gap-2"
                                onClick={() => startOfficerExam(exam.id)}
                              >
                                Sınava Başla
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Exam info */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Not:</strong> Bu sınavlar gerçek STCW sınavlarını simüle etmektedir.</p>
                    <p>Soru dağılımları IMO yeterlilik tabloları baz alınarak hazırlanmıştır.</p>
                    <p>Gerçek sınavlarda sözlü ve pratik değerlendirmeler de bulunur.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Statistics Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Soru Havuzu İstatistikleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {examModules.map(module => {
                const Icon = module.icon;
                return (
                  <div key={module.id} className="text-center space-y-1">
                    <div className={`mx-auto w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${module.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="font-bold">{module.questions.length}</div>
                    <div className="text-xs text-muted-foreground">{module.title}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t text-center">
              <div className="text-2xl font-bold text-primary">{totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Toplam Soru</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
