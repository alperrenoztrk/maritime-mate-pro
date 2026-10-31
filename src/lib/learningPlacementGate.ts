import { emptyAssessment, parseAssessment, type AssessmentState } from "@/data/learningAssessment";

/**
 * The learning placement is required once per account, right after the first
 * sign-in. Completion is recorded on the device (the placement's own storage,
 * which also keeps the answers) and, as a timestamp only, in the account's auth
 * metadata so a second device does not ask again. The answers never leave the
 * device.
 *
 * Kept free of the Supabase client so the rules run under node:test.
 */
export const PLACEMENT_DONE_KEY = "learning_placement_completed_at";

/** The account's completion time, or null when the account has no valid record. */
export const placementDoneAt = (metadata: unknown): string | null => {
  if (!metadata || typeof metadata !== "object") return null;
  const value = (metadata as Record<string, unknown>)[PLACEMENT_DONE_KEY];
  return typeof value === "string" && Number.isFinite(Date.parse(value)) ? value : null;
};

export const readPlacement = (storageKey: string): AssessmentState => {
  try { return parseAssessment(localStorage.getItem(storageKey)); } catch { return emptyAssessment(); }
};

export const isPlacementDone = (local: AssessmentState, metadata: unknown) =>
  local.completed || placementDoneAt(metadata) !== null;

/** Finished on this device while offline: the account record is still missing. */
export const needsPlacementBackfill = (local: AssessmentState, metadata: unknown) =>
  local.completed && placementDoneAt(metadata) === null;

export interface PlacementGateInput {
  signedIn: boolean;
  loading: boolean;
  /** 2FA is pending: the account is not usable yet. */
  mfaChallengeRequired: boolean;
  /** The sign-in screens themselves (see isPublicPath). */
  publicRoute: boolean;
  done: boolean;
}

export const shouldRequirePlacement = ({ signedIn, loading, mfaChallengeRequired, publicRoute, done }: PlacementGateInput) =>
  signedIn && !loading && !mfaChallengeRequired && !publicRoute && !done;

/** The user_metadata patch for supabase.auth.updateUser (top-level keys merge). */
export const placementDoneUpdate = (at = new Date()) => ({ [PLACEMENT_DONE_KEY]: at.toISOString() });
