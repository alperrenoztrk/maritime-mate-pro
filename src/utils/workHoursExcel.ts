import ExcelJS from "exceljs";
import type { PersonRecord } from "./workHoursStcw";
import {
  countRest,
  countWork,
  evaluateDay,
  reportPerson,
} from "./workHoursStcw";

interface BuildOptions {
  monthLabel: string; // örn. "2025-04"
  vesselName?: string;
}

export async function buildWorkHoursWorkbook(
  people: PersonRecord[],
  options: BuildOptions,
): Promise<Blob> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Mariner's Mate";
  wb.created = new Date();

  // Tüm günleri topla
  const allDates = Array.from(
    new Set(people.flatMap((p) => Object.keys(p.days))),
  ).sort();

  // 1) Özet sayfası
  const summary = wb.addWorksheet("Özet");
  summary.columns = [
    { header: "Ad Soyad", key: "name", width: 28 },
    { header: "Rütbe", key: "rank", width: 18 },
    { header: "Toplam Çalışma (s)", key: "work", width: 18 },
    { header: "Toplam Dinlenme (s)", key: "rest", width: 18 },
    { header: "24s İhlal Sayısı", key: "viol24", width: 16 },
    { header: "7g İhlal Sayısı", key: "viol7", width: 16 },
  ];
  summary.getRow(1).font = { bold: true };
  summary.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E3A8A" },
  };
  summary.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };

  const meta = summary.addRow([]);
  meta.getCell(1).value = `Gemi: ${options.vesselName ?? "—"}`;
  const meta2 = summary.addRow([]);
  meta2.getCell(1).value = `Dönem: ${options.monthLabel}`;
  summary.addRow([]);

  const headerRow = summary.addRow([
    "Ad Soyad",
    "Rütbe",
    "Toplam Çalışma (s)",
    "Toplam Dinlenme (s)",
    "24s İhlal",
    "7g İhlal",
  ]);
  headerRow.font = { bold: true };

  for (const p of people) {
    const r = reportPerson(p);
    summary.addRow([
      p.name,
      p.rank,
      r.totalWork,
      r.totalRest,
      r.dailyViolationDates.length,
      r.weeklyViolationWindows.length,
    ]);
  }

  // 2) Kişi başına detay sayfası
  for (const p of people) {
    const sheetName = (p.name || "Personel").slice(0, 28);
    const sheet = wb.addWorksheet(sheetName);

    // Başlık
    sheet.mergeCells("A1:Z1");
    sheet.getCell("A1").value =
      `${p.name} (${p.rank}) — STCW Rest Hours Record — ${options.monthLabel}`;
    sheet.getCell("A1").font = { bold: true, size: 14 };
    sheet.getCell("A1").alignment = { horizontal: "center" };

    // Kolon başlıkları: Tarih + 00..23 + Çalışma + Dinlenme + İhlal
    const header: (string | number)[] = ["Tarih"];
    for (let h = 0; h < 24; h += 1) header.push(h);
    header.push("W", "R", "İhlal");
    const headRow = sheet.addRow(header);
    headRow.font = { bold: true };
    headRow.alignment = { horizontal: "center" };
    headRow.eachCell((c) => {
      c.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE5E7EB" },
      };
    });

    sheet.getColumn(1).width = 12;
    for (let h = 0; h < 24; h += 1) sheet.getColumn(2 + h).width = 3;
    sheet.getColumn(26).width = 6;
    sheet.getColumn(27).width = 6;
    sheet.getColumn(28).width = 8;

    for (const date of allDates) {
      const day = p.days[date] ?? Array(24).fill(false);
      const ev = evaluateDay(date, day);
      const violation = !ev.rest24Ok || !ev.splitOk;
      const row: (string | number)[] = [date];
      for (let h = 0; h < 24; h += 1) row.push(day[h] ? "W" : "");
      row.push(countWork(day), countRest(day), violation ? "EVET" : "");
      const r = sheet.addRow(row);
      r.alignment = { horizontal: "center" };

      for (let h = 0; h < 24; h += 1) {
        const cell = r.getCell(2 + h);
        if (day[h]) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF1E3A8A" },
          };
          cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
        } else {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF3F4F6" },
          };
        }
      }

      if (violation) {
        const c = r.getCell(28);
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFDC2626" },
        };
        c.font = { bold: true, color: { argb: "FFFFFFFF" } };
      }
    }

    // Lejant
    sheet.addRow([]);
    const legend = sheet.addRow([
      "Lejant: Mavi = Çalışma (W), Gri = Dinlenme. STCW A-VIII/1: 24 saatte ≥ 10 saat, 7 günde ≥ 77 saat dinlenme. Çıktı tahminidir, manuel doğrulayın.",
    ]);
    sheet.mergeCells(`A${legend.number}:AB${legend.number}`);
    legend.getCell(1).font = { italic: true, color: { argb: "FF6B7280" } };
  }

  const buf = await wb.xlsx.writeBuffer();
  return new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
