import ExcelJS from "exceljs";

export type ItemStatus = "ok" | "deficiency" | "na" | "pending";

export interface ChecklistItem {
  id: string;
  title: string;
  /** Short reference to the relevant convention / regulation. */
  ref: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}


export interface ItemState {
  status: ItemStatus;
  note: string;
}

export type ChecklistState = Record<string, ItemState>;

export function loadState(STORAGE_KEY: string): ChecklistState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveState(STORAGE_KEY: string, state: ChecklistState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function clearState(STORAGE_KEY: string) {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export interface Summary {
  total: number;
  ok: number;
  deficiency: number;
  na: number;
  pending: number;
  /** Ratio of reviewed (non-pending) items, 0–1. */
  progress: number;
}

export function summarize(PSC_CHECKLIST: ChecklistCategory[], state: ChecklistState): Summary {
  const total = PSC_CHECKLIST.reduce((n, c) => n + c.items.length, 0);
  let ok = 0;
  let deficiency = 0;
  let na = 0;
  for (const cat of PSC_CHECKLIST) {
    for (const item of cat.items) {
      const status = state[item.id]?.status ?? "pending";
      if (status === "ok") ok++;
      else if (status === "deficiency") deficiency++;
      else if (status === "na") na++;
    }
  }
  const pending = total - ok - deficiency - na;
  const reviewed = total - pending;
  return {
    total,
    ok,
    deficiency,
    na,
    pending,
    progress: total === 0 ? 0 : reviewed / total,
  };
}

const STATUS_LABEL: Record<ItemStatus, string> = {
  ok: "Compliant",
  deficiency: "Deficiency",
  na: "N/A",
  pending: "Pending",
};

export async function buildPscReport(
  PSC_CHECKLIST: ChecklistCategory[],
  sheetTitle: string,
  state: ChecklistState,
  vesselName: string,
  inspectionDate: string,
): Promise<Blob> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Mariner's Book";
  const ws = wb.addWorksheet(sheetTitle.slice(0, 31).replace(/[\\/?*[\]:]/g, " "));

  ws.columns = [
    { header: "Category", key: "cat", width: 26 },
    { header: "Item", key: "item", width: 52 },
    { header: "Reference", key: "ref", width: 20 },
    { header: "Status", key: "status", width: 16 },
    { header: "Note", key: "note", width: 40 },
  ];

  ws.getRow(1).font = { bold: true };
  ws.spliceRows(1, 0, [`Ship: ${vesselName || "-"}`], [`Date: ${inspectionDate || "-"}`], []);

  for (const cat of PSC_CHECKLIST) {
    for (const item of cat.items) {
      const st = state[item.id]?.status ?? "pending";
      const note = state[item.id]?.note ?? "";
      const row = ws.addRow({
        cat: cat.title,
        item: item.title,
        ref: item.ref,
        status: STATUS_LABEL[st],
        note,
      });
      if (st === "deficiency") {
        row.getCell("status").font = { color: { argb: "FFC0392B" }, bold: true };
      } else if (st === "ok") {
        row.getCell("status").font = { color: { argb: "FF1E8449" } };
      }
    }
  }

  const buf = await wb.xlsx.writeBuffer();
  return new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}
