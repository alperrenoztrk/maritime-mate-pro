import type { ShipType } from "./types";
import { konteyner } from "./konteyner";
import { roRo } from "./roRo";
import { tanker } from "./tanker";
import { dokme } from "./dokme";
import { yolcu } from "./yolcu";

export type { DepartmentId, ShipType, ShipOperation, ShipOperationDepartment } from "./types";

export const shipTypes: ShipType[] = [konteyner, roRo, tanker, dokme, yolcu];

export const shipTypeMap: Record<string, ShipType> = Object.fromEntries(
  shipTypes.map((s) => [s.id, s]),
);
