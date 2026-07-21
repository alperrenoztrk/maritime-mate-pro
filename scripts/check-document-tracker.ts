import assert from "node:assert/strict";
import {
  daysUntilExpiry,
  getDocumentExpiryState,
  getReminderMilestone,
  isReminderDue,
  parseIsoDate,
  sortByExpiry,
} from "../src/lib/documentExpiry";

const now = new Date("2026-07-20T12:00:00Z");

assert.equal(parseIsoDate("2026-02-29"), null, "invalid leap date must be rejected");
assert.ok(parseIsoDate("2028-02-29"), "valid leap date must be accepted");
assert.equal(daysUntilExpiry("2026-07-20", now), 0);
assert.equal(daysUntilExpiry("2026-07-21", now), 1);
assert.equal(daysUntilExpiry("2026-07-19", now), -1);

assert.equal(getDocumentExpiryState(null, false, now).status, "unknown");
assert.equal(getDocumentExpiryState(null, true, now).label, "Süresiz");
assert.equal(getDocumentExpiryState("2026-07-19", false, now).status, "expired");
assert.equal(getDocumentExpiryState("2026-08-19", false, now).status, "critical");
assert.equal(getDocumentExpiryState("2026-10-18", false, now).status, "warning");
assert.equal(getDocumentExpiryState("2027-01-16", false, now).status, "upcoming");
assert.equal(getDocumentExpiryState("2027-01-17", false, now).status, "valid");

assert.equal(isReminderDue("2027-01-16", undefined, now), true, "180-day reminder must trigger");
assert.equal(isReminderDue("2027-01-17", undefined, now), false, "181 days must not trigger");
assert.equal(isReminderDue(null, undefined, now), false, "unknown dates must not trigger");
assert.equal(getReminderMilestone("2027-01-11", undefined, now), 180);
assert.equal(getReminderMilestone("2026-10-10", undefined, now), 90);
assert.equal(getReminderMilestone("2026-07-19", undefined, now), "expired");

const sorted = sortByExpiry(
  [
    { id: "valid", expiry_date: "2027-12-01", no_expiry: false },
    { id: "unknown", expiry_date: null, no_expiry: false },
    { id: "expired", expiry_date: "2026-07-01", no_expiry: false },
    { id: "critical", expiry_date: "2026-07-25", no_expiry: false },
  ],
  now,
);
assert.deepEqual(sorted.map((item) => item.id), ["expired", "critical", "unknown", "valid"]);

console.log("document tracker checks passed");
