import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { supabase } from "@/integrations/supabase/safeClient";
import type { Json } from "@/integrations/supabase/types";
import { startLearningProgressSync } from "@/utils/learningProgressSync";
export function LearningProgressSync() {
  const { user, loading, mfaChallengeRequired } = useAuth();
  const userId = user?.id;
  useEffect(() => {
    if (loading || !userId || mfaChallengeRequired) return;
    return startLearningProgressSync(userId, async (progress, signal) => {
      const { data, error } = await supabase.rpc("merge_learning_progress", { incoming: progress as unknown as Json }).abortSignal(signal);
      if (error) throw error;
      return data;
    });
  }, [userId, loading, mfaChallengeRequired]);
  return null;
}
