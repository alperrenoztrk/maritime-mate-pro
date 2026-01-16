import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QuizQuestion } from '@/types/quiz';

export interface QuizResult {
  id: string;
  user_id: string;
  module_id: string;
  exam_type: string | null;
  exam_name: string;
  score: number;
  total_questions: number;
  percentage: number;
  question_results: QuestionResult[];
  time_spent_seconds: number | null;
  completed_at: string;
  created_at: string;
}

export interface QuestionResult {
  questionId: number;
  category: string;
  isCorrect: boolean;
  userAnswer: number;
  correctAnswer: number;
}

export interface CategoryStat {
  id: string;
  user_id: string;
  category: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  accuracy: number;
  last_attempt_at: string | null;
}

export interface QuizStatsOverview {
  totalQuizzes: number;
  totalQuestions: number;
  totalCorrect: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  recentTrend: 'improving' | 'declining' | 'stable';
  weakestCategories: CategoryStat[];
  strongestCategories: CategoryStat[];
}

export function useQuizStats(userId?: string) {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [overview, setOverview] = useState<QuizStatsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load quiz results
  const loadQuizResults = useCallback(async () => {
    if (!userId) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(100);

      if (fetchError) throw fetchError;

      const results = (data || []).map(r => ({
        ...r,
        question_results: (r.question_results as unknown as QuestionResult[]) || []
      }));

      setQuizResults(results);
      return results;
    } catch (err) {
      console.error('Error loading quiz results:', err);
      throw err;
    }
  }, [userId]);

  // Load category stats
  const loadCategoryStats = useCallback(async () => {
    if (!userId) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('user_category_stats')
        .select('*')
        .eq('user_id', userId)
        .order('total_questions', { ascending: false });

      if (fetchError) throw fetchError;

      const stats = (data || []).map(s => ({
        ...s,
        accuracy: s.total_questions > 0 
          ? Math.round((s.correct_answers / s.total_questions) * 100) 
          : 0
      }));

      setCategoryStats(stats);
      return stats;
    } catch (err) {
      console.error('Error loading category stats:', err);
      throw err;
    }
  }, [userId]);

  // Calculate overview
  const calculateOverview = useCallback((results: QuizResult[], stats: CategoryStat[]): QuizStatsOverview => {
    if (results.length === 0) {
      return {
        totalQuizzes: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        averageScore: 0,
        bestScore: 0,
        worstScore: 0,
        recentTrend: 'stable',
        weakestCategories: [],
        strongestCategories: []
      };
    }

    const totalQuizzes = results.length;
    const totalQuestions = results.reduce((sum, r) => sum + r.total_questions, 0);
    const totalCorrect = results.reduce((sum, r) => sum + r.score, 0);
    const averageScore = Math.round((totalCorrect / totalQuestions) * 100);
    const percentages = results.map(r => r.percentage);
    const bestScore = Math.max(...percentages);
    const worstScore = Math.min(...percentages);

    // Calculate trend from last 5 quizzes
    let recentTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (results.length >= 3) {
      const recent = results.slice(0, 5).map(r => r.percentage);
      const older = results.slice(5, 10).map(r => r.percentage);
      
      if (older.length > 0) {
        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
        
        if (recentAvg > olderAvg + 5) recentTrend = 'improving';
        else if (recentAvg < olderAvg - 5) recentTrend = 'declining';
      }
    }

    // Sort categories by accuracy
    const sortedStats = [...stats].filter(s => s.total_questions >= 3);
    const weakestCategories = sortedStats
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);
    const strongestCategories = sortedStats
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 5);

    return {
      totalQuizzes,
      totalQuestions,
      totalCorrect,
      averageScore,
      bestScore,
      worstScore,
      recentTrend,
      weakestCategories,
      strongestCategories
    };
  }, []);

  // Load all data
  const loadAllData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [results, stats] = await Promise.all([
        loadQuizResults(),
        loadCategoryStats()
      ]);

      if (results && stats) {
        setOverview(calculateOverview(results, stats));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId, loadQuizResults, loadCategoryStats, calculateOverview]);

  // Save quiz result
  const saveQuizResult = useCallback(async (
    moduleId: string,
    examType: 'module' | 'preset' | 'officer',
    examName: string,
    score: number,
    totalQuestions: number,
    questions: QuizQuestion[],
    selectedAnswers: { [key: number]: number },
    timeSpentSeconds?: number
  ) => {
    if (!userId) {
      console.warn('Cannot save quiz result: no user ID');
      return null;
    }

    try {
      // Build question results
      const questionResults: QuestionResult[] = questions.map(q => ({
        questionId: q.id,
        category: q.category,
        isCorrect: selectedAnswers[q.id] === q.correctAnswer,
        userAnswer: selectedAnswers[q.id] ?? -1,
        correctAnswer: q.correctAnswer
      }));

      // Insert quiz result
      const { data: result, error: insertError } = await supabase
        .from('quiz_results')
        .insert([{
          user_id: userId,
          module_id: moduleId,
          exam_type: examType,
          exam_name: examName,
          score,
          total_questions: totalQuestions,
          question_results: JSON.parse(JSON.stringify(questionResults)),
          time_spent_seconds: timeSpentSeconds || null
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      // Update category stats
      const categoryUpdates: { [category: string]: { correct: number; total: number } } = {};
      
      for (const qr of questionResults) {
        if (!categoryUpdates[qr.category]) {
          categoryUpdates[qr.category] = { correct: 0, total: 0 };
        }
        categoryUpdates[qr.category].total++;
        if (qr.isCorrect) categoryUpdates[qr.category].correct++;
      }

      // Upsert category stats
      for (const [category, counts] of Object.entries(categoryUpdates)) {
        // First try to get existing stats
        const { data: existing } = await supabase
          .from('user_category_stats')
          .select('*')
          .eq('user_id', userId)
          .eq('category', category)
          .single();

        if (existing) {
          // Update existing
          await supabase
            .from('user_category_stats')
            .update({
              total_questions: existing.total_questions + counts.total,
              correct_answers: existing.correct_answers + counts.correct,
              wrong_answers: existing.wrong_answers + (counts.total - counts.correct),
              last_attempt_at: new Date().toISOString()
            })
            .eq('id', existing.id);
        } else {
          // Insert new
          await supabase
            .from('user_category_stats')
            .insert({
              user_id: userId,
              category,
              total_questions: counts.total,
              correct_answers: counts.correct,
              wrong_answers: counts.total - counts.correct,
              last_attempt_at: new Date().toISOString()
            });
        }
      }

      // Reload data
      await loadAllData();

      return result;
    } catch (err) {
      console.error('Error saving quiz result:', err);
      throw err;
    }
  }, [userId, loadAllData]);

  // Get recent results for a module
  const getModuleResults = useCallback((moduleId: string, limit = 10) => {
    return quizResults
      .filter(r => r.module_id === moduleId)
      .slice(0, limit);
  }, [quizResults]);

  // Initial load
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    quizResults,
    categoryStats,
    overview,
    loading,
    error,
    saveQuizResult,
    getModuleResults,
    refresh: loadAllData
  };
}
