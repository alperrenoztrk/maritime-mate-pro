import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface TableColumn {
  key: string;
  label: string;
  unit?: string;
  /** Text column (e.g. a name); numeric otherwise. */
  text?: boolean;
  placeholder?: string;
}

export type TableRow = Record<string, string>;

/**
 * Small editable table for booklet data (weights, tanks, KN values). Each row
 * is a record of typed strings; parsing is left to the caller. On narrow
 * screens the table scrolls horizontally inside its own box.
 */
export function EditableTable({
  columns,
  rows,
  onChange,
  addLabel = "Add row",
  newRow,
  minRows = 0,
  caption,
}: {
  columns: TableColumn[];
  rows: TableRow[];
  onChange: (rows: TableRow[]) => void;
  addLabel?: string;
  newRow: () => TableRow;
  minRows?: number;
  caption: string;
}) {
  const update = (index: number, key: string, value: string) =>
    onChange(rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  const template = `${columns.map((c) => (c.text ? "minmax(7rem,1.6fr)" : "minmax(4.5rem,1fr)")).join(" ")} 2.5rem`;

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <div role="table" aria-label={caption} className="min-w-[28rem] space-y-1.5">
          <div role="row" className="grid gap-1.5 text-micro font-semibold text-muted-foreground" style={{ gridTemplateColumns: template }}>
            {columns.map((c) => (
              <span role="columnheader" key={c.key}>
                {c.label}
                {c.unit && <span className="font-normal"> ({c.unit})</span>}
              </span>
            ))}
            <span />
          </div>
          {rows.map((row, index) => (
            <div role="row" key={index} className="grid items-center gap-1.5" style={{ gridTemplateColumns: template }}>
              {columns.map((c) => (
                <Input
                  key={c.key}
                  role="cell"
                  aria-label={`${c.label} row ${index + 1}`}
                  className="h-9 px-2"
                  type={c.text ? "text" : "number"}
                  inputMode={c.text ? undefined : "decimal"}
                  step={c.text ? undefined : "any"}
                  placeholder={c.placeholder}
                  value={row[c.key] ?? ""}
                  onChange={(e) => update(index, c.key, e.target.value)}
                />
              ))}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove row ${index + 1}`}
                disabled={rows.length <= minRows}
                onClick={() => onChange(rows.filter((_, i) => i !== index))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => onChange([...rows, newRow()])}>
        <Plus className="h-4 w-4" /> {addLabel}
      </Button>
    </div>
  );
}
