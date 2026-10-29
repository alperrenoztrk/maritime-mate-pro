// Ship Systems topic images — mapped by category and topic index
import windlass from "@/assets/ship-systems/windlass.jpg";
import deckCrane from "@/assets/ship-systems/deck-crane.jpg";
import mooringWinch from "@/assets/ship-systems/mooring-winch.jpg";
import radar from "@/assets/ship-systems/radar.jpg";
import ecdis from "@/assets/ship-systems/ecdis.jpg";
import ais from "@/assets/ship-systems/ais.jpg";
import gps from "@/assets/ship-systems/gps.jpg";
import compass from "@/assets/ship-systems/compass.jpg";
import propeller from "@/assets/ship-systems/propeller.jpg";
import rudder from "@/assets/ship-systems/rudder.jpg";
import boiler from "@/assets/ship-systems/boiler.jpg";
import separator from "@/assets/ship-systems/separator.jpg";
import freshwaterGenerator from "@/assets/ship-systems/freshwater-generator.jpg";

// Exact topic-order image assignments. Unclear or conflicting photo provenance/subject = undefined.\n// Maps category → array of images in topic order
// A slot is undefined when no photo of exactly that subject is available yet.
export const shipSystemImages: Record<string, (string | undefined)[]> = {
  "deck-machinery": [windlass, deckCrane, mooringWinch, undefined, undefined],
  "nav-systems": [radar, ecdis, ais, gps, compass, undefined],
  "main-engine": [undefined, undefined, undefined, propeller, rudder],
  "auxiliary": [undefined, boiler, separator, undefined, undefined, freshwaterGenerator],
};
