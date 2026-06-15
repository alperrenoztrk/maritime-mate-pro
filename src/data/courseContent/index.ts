import type { CourseEntry, CourseTopic } from "./types";
import { thermodynamics } from "./thermodynamics";
import { fluidMechanics } from "./fluid-mechanics";
import { machineElements } from "./machine-elements";
import { dieselEngines } from "./diesel-engines";
import { shipSystems } from "./ship-systems";
import { auxiliary } from "./auxiliary";
import { fuelTechnology } from "./fuel-technology";
import { coolingHvac } from "./cooling-hvac";
import { electrical } from "./electrical";
import { automation } from "./automation";
import { engineRoomOps } from "./engine-room-ops";
import { maintenance } from "./maintenance";
import { engineRoomSafety } from "./engine-room-safety";
import { environmentMachine } from "./environment-machine";
import { erm } from "./erm";
import { energyEfficiency } from "./energy-efficiency";
import { stability } from "./stability";
import { navigation } from "./navigation";
import { cargo } from "./cargo";
import { meteorology } from "./meteorology";
import { seamanship } from "./seamanship";
import { safety } from "./safety";
import { environment } from "./environment";

export type { CourseEntry, CourseTopic } from "./types";

/**
 * Birleşik ders içeriği registry'si (tek kaynak).
 * Anahtar eşlemesi: makine konuları = slug (örn. "thermodynamics"),
 * güverte konuları = kategori id (örn. "stability"). Çakışma yoktur.
 */
export const courseTopics: Record<string, CourseTopic> = {
  // Makine
  thermodynamics,
  "fluid-mechanics": fluidMechanics,
  "machine-elements": machineElements,
  "diesel-engines": dieselEngines,
  "ship-systems": shipSystems,
  auxiliary,
  "fuel-technology": fuelTechnology,
  "cooling-hvac": coolingHvac,
  electrical,
  automation,
  "engine-room-ops": engineRoomOps,
  maintenance,
  "engine-room-safety": engineRoomSafety,
  "environment-machine": environmentMachine,
  erm,
  "energy-efficiency": energyEfficiency,
  // Güverte
  stability,
  navigation,
  cargo,
  meteorology,
  seamanship,
  safety,
  environment,
};

/** Verilen anahtara karşılık gelen konuyu döndürür (yoksa null). */
export function getCourseTopic(key?: string): CourseTopic | null {
  return key ? courseTopics[key] ?? null : null;
}

/** Konunun tüm formül girdileri (Formüller sayfası için). */
export function getFormulaEntries(topic: CourseTopic): CourseEntry[] {
  return topic.entries;
}

/** Yalnız hesaplayıcısı olan girdiler (Hesaplamalar sayfası için). */
export function getCalculatorEntries(topic: CourseTopic): CourseEntry[] {
  return topic.entries.filter((e) => typeof e.calculate === "function");
}

/** Bir konunun registry'de tanımlı (migrate edilmiş) olup olmadığı. */
export function hasCourseTopic(key?: string): boolean {
  return !!key && key in courseTopics;
}
