// Ship Systems topic images — mapped by category and topic index
import windlass from "@/assets/ship-systems/windlass.jpg";
import deckCrane from "@/assets/ship-systems/deck-crane.jpg";
import mooringWinch from "@/assets/ship-systems/mooring-winch.jpg";
import hatchCover from "@/assets/ship-systems/hatch-cover.jpg";
import capstan from "@/assets/ship-systems/capstan.jpg";
import radar from "@/assets/ship-systems/radar.jpg";
import ecdis from "@/assets/ship-systems/ecdis.jpg";
import ais from "@/assets/ship-systems/ais.jpg";
import gps from "@/assets/ship-systems/gps.jpg";
import compass from "@/assets/ship-systems/compass.jpg";
import echoSounder from "@/assets/ship-systems/echo-sounder.jpg";
import twoStrokeEngine from "@/assets/ship-systems/two-stroke-engine.jpg";
import fourStrokeEngine from "@/assets/ship-systems/four-stroke-engine.jpg";
import shaftLine from "@/assets/ship-systems/shaft-line.jpg";
import propeller from "@/assets/ship-systems/propeller.jpg";
import rudder from "@/assets/ship-systems/rudder.jpg";
import generator from "@/assets/ship-systems/generator.jpg";
import boiler from "@/assets/ship-systems/boiler.jpg";
import separator from "@/assets/ship-systems/separator.jpg";
import compressor from "@/assets/ship-systems/compressor.jpg";
import pump from "@/assets/ship-systems/pump.jpg";
import freshwaterGenerator from "@/assets/ship-systems/freshwater-generator.jpg";

// Maps category → array of images in topic order
export const shipSystemImages: Record<string, string[]> = {
  "deck-machinery": [windlass, deckCrane, mooringWinch, hatchCover, capstan],
  "nav-systems": [radar, ecdis, ais, gps, compass, echoSounder],
  "main-engine": [twoStrokeEngine, fourStrokeEngine, shaftLine, propeller, rudder],
  "auxiliary": [generator, boiler, separator, compressor, pump, freshwaterGenerator],
};
