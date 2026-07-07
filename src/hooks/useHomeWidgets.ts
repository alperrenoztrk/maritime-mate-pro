export type HomeWidgetId =
  | "clock-national"
  | "clock-gmt"
  | "weather"
  | "wind"
  | "location"
  | "sun";

export interface HomeWidgetMeta {
  id: HomeWidgetId;
  label: string;
  description: string;
  size: "small" | "medium";
}

// All widgets are always active and shown on the home screen, in this order.
export const AVAILABLE_WIDGETS: HomeWidgetMeta[] = [
  { id: "clock-national", label: "Yerel Saat", description: "Bulunduğun bölgenin saati", size: "small" },
  { id: "clock-gmt", label: "GMT / UTC", description: "Greenwich ortalama zamanı", size: "small" },
  { id: "weather", label: "Hava Durumu", description: "Sıcaklık ve durum", size: "small" },
  { id: "wind", label: "Rüzgâr", description: "Yön ve hız (kt)", size: "small" },
  { id: "location", label: "Konum", description: "Enlem / boylam (DMS)", size: "medium" },
  { id: "sun", label: "Güneş", description: "Doğuş & batış saatleri", size: "medium" },
];
