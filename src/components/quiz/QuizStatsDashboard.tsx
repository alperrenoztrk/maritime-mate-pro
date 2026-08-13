import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Clock,
  BookOpen,
  RefreshCw,
  Loader2,
  Trophy,
  Flame,
  Zap
} from 'lucide-react';
import { useQuizStats, type QuizStatsOverview, type CategoryStat } from '@/hooks/useQuizStats';

interface QuizStatsDashboardProps {
  userId?: string;
  onStartQuiz?: (moduleId: string) => void;
}

export function QuizStatsDashboard({ userId, onStartQuiz }: QuizStatsDashboardProps) {
  const { quizResults, categoryStats, overview, loading, error, refresh } = useQuizStats(userId);

  const trendIcon = useMemo(() => {
    if (!overview) return <Minus className="h-4 w-4" />;
    switch (overview.recentTrend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  }, [overview]);

  const trendText = useMemo(() => {
    if (!overview) return 'No data yet';
    switch (overview.recentTrend) {
      case 'improving': return 'Improving';
      case 'declining': return 'Düşüyor';
      default: return 'Stabil';
    }
  }, [overview]);

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-500';
    if (accuracy >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getAccuracyBg = (accuracy: number) => {
    if (accuracy >= 80) return 'bg-green-500';
    if (accuracy >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!userId) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">İlerleme Takibi</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Quiz sonuçlarınızı kaydetmek ve ilerlemenizi takip etmek için giriş yapın.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="font-semibold text-lg mb-2">Error</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <Button variant="outline" onClick={refresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!overview || overview.totalQuizzes === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Target className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">Henüz Quiz Tamamlanmadı</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            İlerlemenizi takip etmek için bir quiz tamamlayın.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Quiz</p>
                  <p className="text-2xl font-bold">{overview.totalQuizzes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ortalama Skor</p>
                  <p className="text-2xl font-bold">%{overview.averageScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En İyi Skor</p>
                  <p className="text-2xl font-bold">%{overview.bestScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  {trendIcon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trend</p>
                  <p className="text-2xl font-bold">{trendText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weakest Categories */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Geliştirilmesi Gereken Konular
              </CardTitle>
            </CardHeader>
            <CardContent>
              {overview.weakestCategories.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Henüz yeterli veri yok (en az 3 soru gerekli)
                </p>
              ) : (
                <div className="space-y-4">
                  {overview.weakestCategories.map((cat, index) => (
                    <div key={cat.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {index + 1}
                          </Badge>
                          <span className="text-sm font-medium">{cat.category}</span>
                        </div>
                        <span className={`text-sm font-bold ${getAccuracyColor(cat.accuracy)}`}>
                          %{cat.accuracy}
                        </span>
                      </div>
                      <Progress value={cat.accuracy} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{cat.correct_answers}/{cat.total_questions} doğru</span>
                        <span>{cat.wrong_answers} yanlış</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Strongest Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Flame className="h-5 w-5 text-green-500" />
                Güçlü Olduğunuz Konular
              </CardTitle>
            </CardHeader>
            <CardContent>
              {overview.strongestCategories.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Henüz yeterli veri yok (en az 3 soru gerekli)
                </p>
              ) : (
                <div className="space-y-4">
                  {overview.strongestCategories.map((cat, index) => (
                    <div key={cat.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-green-500/10">
                            {index + 1}
                          </Badge>
                          <span className="text-sm font-medium">{cat.category}</span>
                        </div>
                        <span className={`text-sm font-bold ${getAccuracyColor(cat.accuracy)}`}>
                          %{cat.accuracy}
                        </span>
                      </div>
                      <Progress value={cat.accuracy} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{cat.correct_answers}/{cat.total_questions} doğru</span>
                        <span>{cat.wrong_answers} yanlış</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Quiz Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Son Quiz Sonuçları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {quizResults.slice(0, 10).map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getAccuracyBg(result.percentage)}`}>
                        {result.percentage >= 60 ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          <XCircle className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{result.exam_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(result.completed_at).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${getAccuracyColor(result.percentage)}`}>
                        %{result.percentage}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {result.score}/{result.total_questions}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">{overview.totalQuestions}</p>
                <p className="text-sm text-muted-foreground">Toplam Soru</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">{overview.totalCorrect}</p>
                <p className="text-sm text-muted-foreground">Doğru Cevap</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">
                  {overview.totalQuestions - overview.totalCorrect}
                </p>
                <p className="text-sm text-muted-foreground">Yanlış Cevap</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-500">{categoryStats.length}</p>
                <p className="text-sm text-muted-foreground">Çalışılan Konu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
