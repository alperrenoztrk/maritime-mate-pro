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

/** `extract-work-hours` edge function'ının döndürdüğü ham yapı. */
export interface ExtractResponse {
  crew: { name: string; rank: string }[];
  previousMonth: {
    name: string;
    totalWorkHours: number;
    totalRestHours: number;
    notes?: string;
  }[];
  logbook: {
    date: string;
    name: string;
    intervals: { start: string; end: string; activity?: string }[];
    lowConfidence?: boolean;
  }[];
}

const HOURS_PER_DAY = 24;

export function emptyDay(): DayHours {
  return Array.from({ length: HOURS_PER_DAY }, () => false);
}

/**
 * "HH:MM" → saat indeksi. Tablo saatlik ızgara olduğu için dakika yok sayılır.
 * Bitiş saatinde 24'e ("24:00" = gün sonu) izin verilir; aksi hâlde 20:00–24:00
 * vardiyası 3 saat sayılırdı.
 */
export function parseHour(value: string, max: number): number {
  const parsed = Number.parseInt(String(value ?? "").split(":")[0], 10);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(max, parsed));
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function nextDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
}

/**
 * [start, end) aralığını saatlik ızgaraya işler. Bitiş saati başlangıçtan
 * küçük veya ona eşitse vardiya gece yarısını aşmıştır (örn. 20:00–04:00);
 * kalan saatler atılmak yerine ertesi güne yazılır — aksi hâlde gece
 * vardiyalarının yarısı kaybolur ve STCW ihlalleri görünmez kalırdı.
 */
export function applyInterval(
  days: Record<string, DayHours>,
  date: string,
  start: string,
  end: string,
): void {
  const s = parseHour(start, 23);
  const e = parseHour(end, 24);
  const spanEnd = e > s ? e : e + 24;
  for (let i = s; i < spanEnd; i += 1) {
    const key = i < HOURS_PER_DAY ? date : nextDate(date);
    const day = days[key] ? [...days[key]] : emptyDay();
    day[i % HOURS_PER_DAY] = true;
    days[key] = day;
  }
}

/**
 * Yapay zekâ çıktısını düzenlenebilir personel kayıtlarına çevirir. Model
 * şemadan sapabildiği için eksik alanlar sessizce atlanır: tek bir bozuk
 * kayıt tüm tabloyu düşürmemeli.
 */
export function buildPeople(data: ExtractResponse): PersonRecord[] {
  const map = new Map<string, PersonRecord>();
  for (const c of data?.crew ?? []) {
    const name = (c?.name ?? "").trim();
    if (!name) continue;
    const id = name.toLowerCase();
    if (!map.has(id)) map.set(id, { id, name, rank: c.rank || "—", days: {} });
  }
  for (const e of data?.logbook ?? []) {
    const name = (e?.name ?? "").trim();
    // Gün anahtarı ve sıralama ISO tarihe dayanır; okunamayan tarih tabloyu
    // bozacağı için kayıt atlanır.
    if (!name || !ISO_DATE.test(e?.date ?? "")) continue;
    const id = name.toLowerCase();
    let person = map.get(id);
    if (!person) {
      person = { id, name, rank: "—", days: {} };
      map.set(id, person);
    }
    if (!person.days[e.date]) person.days[e.date] = emptyDay();
    for (const i of e.intervals ?? []) {
      if (!i?.start || !i?.end) continue;
      applyInterval(person.days, e.date, i.start, i.end);
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "tr"));
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
  const blocks: number[] = [];
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
  if (blocks.length === 0) return countRest(day) >= 10; // hiç dinlenme yok → ihlal
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
