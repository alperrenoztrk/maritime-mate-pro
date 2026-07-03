import type { ShipSystemLongForm } from "../types";
import provision from "../environmental-auxiliary/6";

/**
 * Provision Refrigeration (Soğuk Depo) — "Yardımcı Makineler" bölümünde de
 * gösterilir. Detaylı anlatım, environmental-auxiliary/6 ile tek kaynaktan
 * paylaşılır.
 */
const content: ShipSystemLongForm = {
  ...provision,
  sectionId: "auxiliary",
  topicIndex: 10,
};

export default content;
