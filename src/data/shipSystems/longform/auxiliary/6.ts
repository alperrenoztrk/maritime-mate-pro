import type { ShipSystemLongForm } from "../types";
import incinerator from "../environmental-auxiliary/3";

/**
 * İnsinerator (Atık Yakma Fırını) — "Yardımcı Makineler" bölümünde de
 * gösterilir. Detaylı anlatım, environmental-auxiliary/3 ile tek kaynaktan
 * paylaşılır; içerik tekrarı olmaması için oradaki içerik yeniden kullanılır.
 */
const content: ShipSystemLongForm = {
  ...incinerator,
  sectionId: "auxiliary",
  topicIndex: 6,
};

export default content;
