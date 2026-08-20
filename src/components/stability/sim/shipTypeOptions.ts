import type { ShipType } from "./ShipModel3D";

export const shipTypeOptions: { value: ShipType; label: string; description: string }[] = [
  { value: "container", label: "Container", description: "Container stacks filling the deck, living quarters above Stern." },
  { value: "tanker", label: "Tanker", description: "Low flat Deck, pipelines and manifolds." },
  { value: "bulk", label: "Bulk", description: "Bulky Cargo hold covers and centreline winches." },
  { value: "roro", label: "Ro-Ro", description: "High vehicle deck and Stern ramp layout." },
  { value: "passenger", label: "Passenger", description: "Multi-storey superstructure and living spaces." },
];
