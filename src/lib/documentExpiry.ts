export const DOCUMENT_REMINDER_DAYS = [180, 90, 30, 7, 1, 0] as const;

export type DocumentExpiryStatus =
  | "expired"
  | "critical"
  | "warning"
  | "upcoming"
  | "valid"
  | "unknown";

export interface ExpiryState {
  status: DocumentExpiryStatus;
  daysRemaining: number | null;
  label: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function localCalendarDay(value: Date): number {
  return Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
}

export function parseIsoDate(value: string | null | undefined): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }
  return parsed;
}

export function daysUntilExpiry(
  expiryDate: string | null | undefined,
  now: Date = new Date(),
): number | null {
  const expiry = parseIsoDate(expiryDate);
  if (!expiry) return null;
  const expiryDay = Date.UTC(
    expiry.getUTCFullYear(),
    expiry.getUTCMonth(),
    expiry.getUTCDate(),
  );
  return Math.round((expiryDay - localCalendarDay(now)) / DAY_MS);
}

export function getDocumentExpiryState(
  expiryDate: string | null | undefined,
  noExpiry = false,
  now: Date = new Date(),
): ExpiryState {
  if (noExpiry) {
    return { status: "valid", daysRemaining: null, label: "No expiry" };
  }

  const daysRemaining = daysUntilExpiry(expiryDate, now);
  if (daysRemaining === null) {
    return { status: "unknown", daysRemaining: null, label: "Date unreadable" };
  }
  if (daysRemaining < 0) {
    return {
      status: "expired",
      daysRemaining,
      label: `Expired ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) === 1 ? "" : "s"} ago`,
    };
  }
  if (daysRemaining === 0) {
    return { status: "critical", daysRemaining, label: "Expires today" };
  }
  if (daysRemaining <= 30) {
    return { status: "critical", daysRemaining, label: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left` };
  }
  if (daysRemaining <= 90) {
    return { status: "warning", daysRemaining, label: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left` };
  }
  if (daysRemaining <= 180) {
    return { status: "upcoming", daysRemaining, label: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left` };
  }
  return { status: "valid", daysRemaining, label: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left` };
}

export function isReminderDue(
  expiryDate: string | null | undefined,
  reminderDays: readonly number[] = DOCUMENT_REMINDER_DAYS,
  now: Date = new Date(),
): boolean {
  return getReminderMilestone(expiryDate, reminderDays, now) !== null;
}

export function getReminderMilestone(
  expiryDate: string | null | undefined,
  reminderDays: readonly number[] = DOCUMENT_REMINDER_DAYS,
  now: Date = new Date(),
): number | "expired" | null {
  const days = daysUntilExpiry(expiryDate, now);
  if (days === null) return null;
  if (days < 0) return "expired";
  const milestones = [...reminderDays]
    .filter((value) => value >= 0)
    .sort((a, b) => a - b);
  return milestones.find((threshold) => days <= threshold) ?? null;
}

export function sortByExpiry<T extends { expiry_date: string | null; no_expiry: boolean }>(
  documents: T[],
  now: Date = new Date(),
): T[] {
  const rank: Record<DocumentExpiryStatus, number> = {
    expired: 0,
    critical: 1,
    warning: 2,
    upcoming: 3,
    unknown: 4,
    valid: 5,
  };

  return [...documents].sort((a, b) => {
    const aState = getDocumentExpiryState(a.expiry_date, a.no_expiry, now);
    const bState = getDocumentExpiryState(b.expiry_date, b.no_expiry, now);
    if (rank[aState.status] !== rank[bState.status]) {
      return rank[aState.status] - rank[bState.status];
    }
    return (aState.daysRemaining ?? Number.MAX_SAFE_INTEGER) -
      (bState.daysRemaining ?? Number.MAX_SAFE_INTEGER);
  });
}
