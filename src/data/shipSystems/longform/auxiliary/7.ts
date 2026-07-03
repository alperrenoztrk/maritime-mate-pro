import type { ShipSystemLongForm } from "../types";
import ows from "../environmental-auxiliary/1";

/**
 * Sintine Separatörü (OWS / 15 ppm) — "Yardımcı Makineler" bölümünde de
 * gösterilir. Detaylı anlatım, environmental-auxiliary/1 ile tek kaynaktan
 * paylaşılır.
 */
const content: ShipSystemLongForm = {
  ...ows,
  sectionId: "auxiliary",
  topicIndex: 7,
};

export default content;
