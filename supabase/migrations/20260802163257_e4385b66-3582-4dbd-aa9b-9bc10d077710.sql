-- Remove orphan rows so the foreign keys can be added safely
DELETE FROM public.quiz_results q WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = q.user_id);
DELETE FROM public.user_category_stats s WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = s.user_id);
DELETE FROM public.user_generated_components c WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = c.user_id);

ALTER TABLE public.quiz_results
  ADD CONSTRAINT quiz_results_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.user_category_stats
  ADD CONSTRAINT user_category_stats_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.user_generated_components
  ADD CONSTRAINT user_generated_components_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Users must be able to erase their own data
CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can delete their own category stats"
  ON public.user_category_stats FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Public components should not be readable with the anonymous key
DROP POLICY IF EXISTS "Users can view public components" ON public.user_generated_components;
CREATE POLICY "Users can view public components"
  ON public.user_generated_components FOR SELECT TO authenticated
  USING (is_public = true);

GRANT DELETE ON public.profiles TO authenticated;
GRANT DELETE ON public.user_category_stats TO authenticated;