-- Yapay zekâ içeriği bildirimleri.
--
-- Google Play'in Üretken Yapay Zekâ politikası, AI tarafından üretilen
-- rahatsız edici/yanlış içeriği kullanıcının UYGULAMA İÇİNDEN bildirebilmesini
-- zorunlu tutar. Bildirimler burada toplanır; uygulama içi arayüz
-- src/components/ai/ReportAiContentButton.tsx.
--
-- Kullanıcı yalnızca kendi bildirimlerini yazabilir ve okuyabilir; inceleme
-- service_role ile yapılır.

CREATE TABLE IF NOT EXISTS public.ai_content_reports (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Bildirimin geldiği AI yüzeyi (ai_tutor, ask_ai, assistant, ...).
  surface TEXT NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN (
    'inaccurate',   -- denizcilik açısından yanlış / tehlikeli bilgi
    'offensive',    -- rahatsız edici, nefret söylemi, uygunsuz
    'unsafe',       -- can/mal güvenliğini riske atan tavsiye
    'other'
  )),
  -- Bildirilen AI yanıtı ve varsa kullanıcının sorusu. Uzun yanıtlar
  -- istemcide kırpılır; sütun sınırı kötüye kullanımı da engeller.
  reported_content TEXT NOT NULL CHECK (char_length(reported_content) <= 8000),
  user_prompt TEXT CHECK (char_length(user_prompt) <= 4000),
  note TEXT CHECK (char_length(note) <= 1000),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reviewed', 'actioned', 'dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_content_reports_status ON public.ai_content_reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_content_reports_user_id ON public.ai_content_reports(user_id);

GRANT SELECT, INSERT ON public.ai_content_reports TO authenticated;
GRANT ALL ON public.ai_content_reports TO service_role;

ALTER TABLE public.ai_content_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can file own AI reports" ON public.ai_content_reports;
CREATE POLICY "Users can file own AI reports" ON public.ai_content_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own AI reports" ON public.ai_content_reports;
CREATE POLICY "Users can view own AI reports" ON public.ai_content_reports
  FOR SELECT USING (auth.uid() = user_id);
-- UPDATE/DELETE politikası bilinçli olarak yok: bildirim gönderildikten sonra
-- kullanıcı tarafından değiştirilemez, inceleme service_role ile yapılır.
