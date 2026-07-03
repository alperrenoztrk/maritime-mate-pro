import type { ShipSystemLongForm } from "../types";
import stp from "../environmental-auxiliary/2";

/**
 * Sewage Treatment Plant (STP) — "Yardımcı Makineler" bölümünde de gösterilir.
 * Detaylı anlatım, environmental-auxiliary/2 ile tek kaynaktan paylaşılır.
 */
const content: ShipSystemLongForm = {
  ...stp,
  sectionId: "auxiliary",
  topicIndex: 8,
};

export default content;
