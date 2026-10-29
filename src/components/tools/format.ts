/** Parses a user-typed number ("1,025" or "1.025"); returns NaN for empty/invalid input. */
export const parseNumber = (raw: string | undefined) => {
  const text = (raw ?? "").trim().replace(",", ".");
  return text === "" ? Number.NaN : Number(text);
};

export const fmt = (value: number, digits = 2) =>
  Number.isFinite(value) ? value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "—";

export const signed = (value: number, digits = 2) => (value > 0 ? "+" : value < 0 ? "−" : "") + fmt(Math.abs(value), digits);
