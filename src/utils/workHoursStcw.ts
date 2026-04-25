// STCW A-VIII/1 ve MLC 2006 Standard A2.3 kapsamında dinlenme saati doğrulamaları.
// Veri modeli: kişi başına gün × 24 saat (true = çalışma, false = dinlenme).

export type DayHours = boolean[]; // length 24, indeks = saat (0..23)

export interface PersonRecord {
  id: string;
  name: string;
  rank: string;
  // gün anahtarı: YYYY-MM-DD
  days: Record<string, DayHours>;
}

export interface DailyViolation {
  date: string;
  restHours: number;
  longestRestBlock: number;
  splitOk: boolean;
  rest24Ok: boolean; // 24 saat içinde ≥ 10 saat dinlenme
}

export interface PersonStcwReport {
  personId: string;
  totalWork: number;
  totalRest: number;
  dailyViolationDates: string[]; // 24 saatlik kuralı ihlal eden günler
  weeklyViolationWindows: { startDate: string; restHours: number }[]; // 7 günde < 77
}

const HOURS_PER_DAY = 24;

export function emptyDay(): DayHours {
  return Array.from({ length: HOURS_PER_DAY }, () => false);
}

export function countRest(day: DayHours): number {
  return day.filter((h) => !h).length;
}

export function countWork(day: DayHours): number {
  return day.filter((h) => h).length;
}

// En uzun ardışık dinlenme bloğunu döner (saat).
export function longestRestBlock(day: DayHours): number {
  let best = 0;
  let cur = 0;
  for (const isWork of day) {
    if (!isWork) {
      cur += 1;
      if (cur > best) best = cur;
    } else {
      cur = 0;
    }
  }
  return best;
}

// STCW: dinlenme en fazla 2 parçaya bölünmeli, biri ≥ 6 saat.
export function restSplitsValid(day: DayHours): boolean {
  let blocks: number[] = [];
  let cur = 0;
  for (const isWork of day) {
    if (!isWork) {
      cur += 1;
    } else if (cur > 0) {
      blocks.push(cur);
      cur = 0;
    }
  }
  if (cur > 0) blocks.push(cur);
  if (blocks.length === 0) return countRest(day) >= 10; // hiç çalışma yok
  if (blocks.length > 2) return false;
  return blocks.some((b) => b >= 6);
}

export function evaluateDay(date: string, day: DayHours): DailyViolation {
  const rest = countRest(day);
  return {
    date,
    restHours: rest,
    longestRestBlock: longestRestBlock(day),
    splitOk: restSplitsValid(day),
    rest24Ok: rest >= 10,
  };
}

// 7 günlük kayan pencerede toplam dinlenme < 77 ihlal sayar.
export function evaluateWeekly(
  sortedDates: string[],
  dayMap: Record<string, DayHours>,
): { startDate: string; restHours: number }[] {
  const out: { startDate: string; restHours: number }[] = [];
  for (let i = 0; i + 6 < sortedDates.length; i += 1) {
    let total = 0;
    for (let j = 0; j < 7; j += 1) {
      total += countRest(dayMap[sortedDates[i + j]] ?? emptyDay());
    }
    if (total < 77) out.push({ startDate: sortedDates[i], restHours: total });
  }
  return out;
}

export function reportPerson(person: PersonRecord): PersonStcwReport {
  const dates = Object.keys(person.days).sort();
  let totalWork = 0;
  let totalRest = 0;
  const dailyViolations: string[] = [];
  for (const d of dates) {
    const day = person.days[d];
    totalWork += countWork(day);
    totalRest += countRest(day);
    const ev = evaluateDay(d, day);
    if (!ev.rest24Ok || !ev.splitOk) dailyViolations.push(d);
  }
  return {
    personId: person.id,
    totalWork,
    totalRest,
    dailyViolationDates: dailyViolations,
    weeklyViolationWindows: evaluateWeekly(dates, person.days),
  };
}
