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

/**
 * Port State Control (Liman Devleti Kontrolü) hazırlık kontrol listesi.
 * Maddeler Paris/Tokyo MoU denetim alanlarına göre gruplanmıştır.
 */
export const PSC_CHECKLIST: ChecklistCategory[] = [
  {
    id: "certificates",
    title: "Sertifikalar ve Dokümanlar",
    items: [
      { id: "cert-class", title: "Klas sertifikası ve sörvey raporları güncel", ref: "SOLAS / Klas" },
      { id: "cert-safety-construction", title: "Cargo Ship Safety Construction sertifikası geçerli", ref: "SOLAS I/12" },
      { id: "cert-safety-equipment", title: "Cargo Ship Safety Equipment sertifikası + Form E ekleri", ref: "SOLAS I/12" },
      { id: "cert-safety-radio", title: "Cargo Ship Safety Radio sertifikası geçerli", ref: "SOLAS I/12" },
      { id: "cert-load-line", title: "Yükleme hattı (Load Line) sertifikası geçerli", ref: "ILLC 1966" },
      { id: "cert-iopp", title: "IOPP sertifikası ve Supplement güncel", ref: "MARPOL Ek I" },
      { id: "cert-doc-smc", title: "DOC kopyası ve geçerli SMC mevcut", ref: "ISM Code" },
      { id: "cert-issc", title: "ISSC (güvenlik) sertifikası geçerli", ref: "ISPS Code" },
      { id: "cert-mlc", title: "MLC uygunluk belgesi (DMLC I & II) ve sertifika", ref: "MLC 2006" },
      { id: "cert-minimum-manning", title: "Minimum Safe Manning belgesi ve uyum", ref: "SOLAS V/14" },
    ],
  },
  {
    id: "lsa",
    title: "Can Kurtarma Teçhizatı (LSA)",
    items: [
      { id: "lsa-lifeboat", title: "Filika ve mataforalar çalışır, son servis tarihleri geçerli", ref: "SOLAS III/20" },
      { id: "lsa-release-gear", title: "Filika serbest bırakma düzeneği bakımlı ve etiketli", ref: "MSC.1/Circ.1392" },
      { id: "lsa-liferaft", title: "Can salı servis tarihleri geçerli, HRU takılı", ref: "SOLAS III/20" },
      { id: "lsa-lifejacket", title: "Can yelekleri yeterli sayıda, ışık ve düdük çalışır", ref: "SOLAS III/7" },
      { id: "lsa-immersion", title: "Dalış (immersion) elbiseleri mevcut ve sağlam", ref: "SOLAS III/32" },
      { id: "lsa-epirb", title: "EPIRB pil ve HRU tarihi geçerli, test kaydı var", ref: "SOLAS IV/7" },
      { id: "lsa-pyrotechnics", title: "İşaret fişekleri (pyrotechnics) son kullanma tarihi geçerli", ref: "SOLAS III/35" },
    ],
  },
  {
    id: "fire",
    title: "Yangın Emniyeti",
    items: [
      { id: "fire-extinguishers", title: "Portatif yangın söndürücüler dolu ve bakımlı", ref: "SOLAS II-2/10" },
      { id: "fire-fixed-system", title: "Sabit yangın söndürme sistemi (CO2/köpük) basınç ve test kaydı", ref: "SOLAS II-2/10" },
      { id: "fire-dampers", title: "Yangın damperleri ve havalandırma kapatma çalışır", ref: "SOLAS II-2/5" },
      { id: "fire-doors", title: "Yangın kapıları kendiliğinden kapanır, etiketli", ref: "SOLAS II-2/9" },
      { id: "fire-pumps", title: "Yangın ve acil yangın pompası test edildi", ref: "SOLAS II-2/10" },
      { id: "fire-fireman-outfit", title: "İtfaiyeci teçhizatı ve SCBA hava tüpleri dolu", ref: "SOLAS II-2/10" },
      { id: "fire-plan", title: "Yangın planı kapıda ve geminin dışında mevcut", ref: "SOLAS II-2/15" },
    ],
  },
  {
    id: "navigation",
    title: "Seyir ve Köprüüstü",
    items: [
      { id: "nav-charts", title: "Seyir haritaları/ECDIS güncel ve düzeltilmiş", ref: "SOLAS V/19, V/27" },
      { id: "nav-publications", title: "Seyir yayınları (List of Lights, Sailing Directions) güncel", ref: "SOLAS V/27" },
      { id: "nav-lights-shapes", title: "Seyir fenerleri, şekiller ve ses cihazları çalışır", ref: "COLREG" },
      { id: "nav-gmdss", title: "GMDSS teçhizatı çalışır, batarya testi yapıldı", ref: "SOLAS IV" },
      { id: "nav-magnetic-compass", title: "Manyetik pusula deviasyon kartı güncel", ref: "SOLAS V/19" },
      { id: "nav-bnwas", title: "BNWAS kurulu ve çalışır durumda", ref: "SOLAS V/19" },
      { id: "nav-voyage-plan", title: "Berth-to-berth seyir planı hazır ve onaylı", ref: "SOLAS V/34" },
    ],
  },
  {
    id: "marpol",
    title: "Çevre / MARPOL",
    items: [
      { id: "marpol-orb", title: "Oil Record Book (Part I/II) güncel ve doğru", ref: "MARPOL Ek I" },
      { id: "marpol-ows", title: "15 ppm yağlı su separatörü ve alarmı çalışır", ref: "MARPOL Ek I" },
      { id: "marpol-garbage", title: "Çöp kayıt defteri ve çöp yönetim planı güncel", ref: "MARPOL Ek V" },
      { id: "marpol-sewage", title: "Pis su (sewage) arıtma sistemi çalışır", ref: "MARPOL Ek IV" },
      { id: "marpol-sopep", title: "SOPEP planı, ekipman ve kayıtlar mevcut", ref: "MARPOL Ek I/37" },
      { id: "marpol-bunker", title: "Bunker delivery notları ve yakıt kükürt uyumu (VLSFO)", ref: "MARPOL Ek VI" },
      { id: "marpol-bwms", title: "Balast suyu yönetim planı ve kayıt defteri güncel", ref: "BWM Convention" },
    ],
  },
  {
    id: "mlc",
    title: "MLC ve Mürettebat",
    items: [
      { id: "mlc-sea", title: "Tüm gemiadamları için imzalı iş sözleşmesi (SEA)", ref: "MLC A2.1" },
      { id: "mlc-hours", title: "Çalışma/dinlenme saati kayıtları uyumlu ve imzalı", ref: "MLC A2.3 / STCW" },
      { id: "mlc-wages", title: "Maaş bordroları güncel ve ödenmiş", ref: "MLC A2.2" },
      { id: "mlc-food", title: "Yiyecek ve içme suyu yeterli, mutfak hijyenik", ref: "MLC A3.2" },
      { id: "mlc-accommodation", title: "Mürettebat yaşam mahalleri temiz ve bakımlı", ref: "MLC A3.1" },
      { id: "mlc-medical", title: "Revir, ilaç dolabı ve tıbbi sertifikalar güncel", ref: "MLC A4.1" },
      { id: "mlc-complaint", title: "Şikayet prosedürü panoda ilan edilmiş", ref: "MLC A5.1.5" },
    ],
  },
  {
    id: "ism",
    title: "ISM / Operasyon",
    items: [
      { id: "ism-drills", title: "Yangın ve gemiyi terk talimleri kayıtlı ve düzenli", ref: "SOLAS III/19" },
      { id: "ism-familiarization", title: "Yeni katılan personel tanıtım (familiarization) kaydı", ref: "ISM 6" },
      { id: "ism-muster-list", title: "Tatbikat (muster) listesi güncel ve görünür", ref: "SOLAS III/8" },
      { id: "ism-nonconformity", title: "Uygunsuzluk ve düzeltici faaliyet kayıtları kapatılmış", ref: "ISM 9" },
      { id: "ism-pms", title: "Planlı bakım sistemi (PMS) güncel", ref: "ISM 10" },
      { id: "ism-isps-drills", title: "Güvenlik (ISPS) tatbikatları ve kayıtları mevcut", ref: "ISPS / SOLAS XI-2" },
    ],
  },
];

const STORAGE_KEY = "beta-psc-checklist-v1";

export interface ItemState {
  status: ItemStatus;
  note: string;
}

export type ChecklistState = Record<string, ItemState>;

export function loadState(): ChecklistState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveState(state: ChecklistState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function clearState() {
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

export function summarize(state: ChecklistState): Summary {
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
  ok: "Uygun",
  deficiency: "Eksiklik",
  na: "Geçersiz (N/A)",
  pending: "Bekliyor",
};

export async function buildPscReport(
  state: ChecklistState,
  vesselName: string,
  inspectionDate: string,
): Promise<Blob> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Maritime Mate Pro";
  const ws = wb.addWorksheet("PSC Hazırlık");

  ws.columns = [
    { header: "Kategori", key: "cat", width: 26 },
    { header: "Madde", key: "item", width: 52 },
    { header: "Referans", key: "ref", width: 20 },
    { header: "Durum", key: "status", width: 16 },
    { header: "Not", key: "note", width: 40 },
  ];

  ws.getRow(1).font = { bold: true };
  ws.spliceRows(1, 0, [`Gemi: ${vesselName || "-"}`], [`Tarih: ${inspectionDate || "-"}`], []);

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
