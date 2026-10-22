# Fix: Exercises pages not opening (web)

Exercises are free under the Pro rules, so this is a bug, not a Pro lock.

## Steps
1. Open /exercises, a category topic list and a topic detail in the browser (signed in), capture console errors and freezes (logs show main thread blocked 40-140 s).
2. Fix the root cause in ExercisesPage / ExerciseTopicsPage / ExerciseTopicDetailPage / GuidedLessonSession (bad route params, missing data, crash, or heavy synchronous work).
3. Check sibling pages that share the same pattern (lesson topics, quiz) and fix the same issue there.
4. Pro notice: where a page is really Pro-locked (quizzes, exam centre, locked library books, 3D, simulator), make sure ProGate shows a clear "Pro membership required" screen with an upgrade button instead of a blank or stuck page.
5. Verify all exercise pages open on web at 375px, add a small test that exercises routes are never Pro-gated, run lint/typecheck.
