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
import { communication } from "./communication";
import { economics } from "./economics";

export type { CourseEntry, CourseTopic } from "./types";

/**
 * Unified course content registry (single source of truth).
 * Key mapping: machine topics = slug (e.g. "thermodynamics"),
 * deck topics = category id (e.g. "stability"). There are no collisions.
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
  // Deck
  stability,
  navigation,
  cargo,
  meteorology,
  seamanship,
  safety,
  environment,
  communication,
  economics,
};

/** Returns the topic matching the given key (null when absent). */
export function getCourseTopic(key?: string): CourseTopic | null {
  return key ? courseTopics[key] ?? null : null;
}

/** All formula entries of the topic (for the Formulas page). */
export function getFormulaEntries(topic: CourseTopic): CourseEntry[] {
  return topic.entries;
}

/** Only the entries that carry a calculator (for the Calculations page). */
export function getCalculatorEntries(topic: CourseTopic): CourseEntry[] {
  return topic.entries.filter((e) => typeof e.calculate === "function");
}

/** Whether a topic is defined (migrated) in the registry. */
export function hasCourseTopic(key?: string): boolean {
  return !!key && key in courseTopics;
}
