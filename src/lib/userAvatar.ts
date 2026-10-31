import type { User } from "@supabase/supabase-js";

type MetadataBag = Record<string, unknown> | null | undefined;

const AVATAR_KEYS = ["avatar_url", "picture", "photo_url", "image"] as const;

function pickHttpsUrl(bag: MetadataBag): string | undefined {
  if (!bag) return undefined;
  for (const key of AVATAR_KEYS) {
    const value = bag[key];
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    // Only https: an http URL is blocked as mixed content inside the
    // https://localhost Capacitor WebView and shows as a broken image.
    if (/^https:\/\//i.test(trimmed)) return trimmed;
    if (/^http:\/\//i.test(trimmed)) return `https://${trimmed.slice(7)}`;
  }
  return undefined;
}

/**
 * Profile photo for the signed-in user.
 *
 * Google sign-in does not always store the photo under `avatar_url`: depending
 * on the OAuth broker it may be `picture` on the user metadata or only on the
 * identity record. Read every known location instead of a single key.
 */
export function getUserAvatarUrl(user: User | null | undefined): string | undefined {
  if (!user) return undefined;
  const direct = pickHttpsUrl(user.user_metadata as MetadataBag);
  if (direct) return direct;
  for (const identity of user.identities ?? []) {
    const fromIdentity = pickHttpsUrl(identity.identity_data as MetadataBag);
    if (fromIdentity) return fromIdentity;
  }
  return undefined;
}
