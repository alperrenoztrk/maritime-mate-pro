import type { ShipType } from "./ShipModel3D";

export const shipTypeOptions: { value: ShipType; label: string; description: string }[] = [
  { value: "container", label: "Konteyner", description: "Güverteyi dolduran konteyner istifleri, kıç üstü yaşam mahalli." },
  { value: "tanker", label: "Tanker", description: "Alçak düz güverte, boru hatları ve manifoldlar." },
  { value: "bulk", label: "Dökme", description: "İri ambar kapakları ve merkez hattı vinçleri." },
  { value: "roro", label: "Ro-Ro", description: "Yüksek araç güvertesi ve kıç rampa düzeni." },
  { value: "passenger", label: "Yolcu", description: "Çok katlı üst yapı ve yaşam alanları." },
];
