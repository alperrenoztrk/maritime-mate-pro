-- Quiz sonuçları tablosu
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  exam_type TEXT, -- 'module', 'preset', 'officer'
  exam_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage NUMERIC(5,2) GENERATED ALWAYS AS (ROUND((score::NUMERIC / NULLIF(total_questions, 0)) * 100, 2)) STORED,
  question_results JSONB NOT NULL DEFAULT '[]'::jsonb,
  time_spent_seconds INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Kategori bazlı performans özeti (materialized view yerine normal tablo)
CREATE TABLE public.user_category_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  wrong_answers INTEGER NOT NULL DEFAULT 0,
  last_attempt_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, category)
);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_category_stats ENABLE ROW LEVEL SECURITY;

-- Quiz results policies
CREATE POLICY "Users can view their own quiz results"
ON public.quiz_results FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results"
ON public.quiz_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quiz results"
ON public.quiz_results FOR DELETE
USING (auth.uid() = user_id);

-- Category stats policies
CREATE POLICY "Users can view their own category stats"
ON public.user_category_stats FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own category stats"
ON public.user_category_stats FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own category stats"
ON public.user_category_stats FOR UPDATE
USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_quiz_results_user_id ON public.quiz_results(user_id);
CREATE INDEX idx_quiz_results_module_id ON public.quiz_results(module_id);
CREATE INDEX idx_quiz_results_completed_at ON public.quiz_results(completed_at DESC);
CREATE INDEX idx_user_category_stats_user_id ON public.user_category_stats(user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_category_stats_updated_at
BEFORE UPDATE ON public.user_category_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();