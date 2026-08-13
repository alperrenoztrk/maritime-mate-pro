import { Package } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Yük Elleçleme ve İstifleme — tek kaynak ders içeriği.
 * Formüller mevcut CargoCalculations sayfasındaki gerçek ifadelerden alınmış,
 * hesaplayıcılar bu ifadeleri birebir uygular.
 */
export const cargo: CourseTopic = {
  key: "cargo",
  title: "Cargo Handling and Stowage",
  icon: Package,
  accent: "from-amber-500 via-orange-500 to-rose-500",
  group: "deck",
  intro:
    "Stowage factor, draft survey, lashing and grain stability. Each formula is " +
    "followed by the tool that calculates it.",
  advancedTool: { label: "Advanced Cargo Tools", href: "/cargo/calculations" },
  entries: [
    {
      id: "stowage-volume",
      name: "Stowage Volume",
      group: "Stowage",
      formula: "V = W × SF",
      variables: [
        { symbol: "W", label: "Cargo weight", unit: "t" },
        { symbol: "SF", label: "Stowage factor", unit: "m³/t" },
      ],
      source: { code: "Definition of the stowage factor" },
      inputs: [
        { key: "w", label: "Weight (W)", unit: "t", placeholder: "5000" },
        { key: "sf", label: "Stowage Factor (SF)", unit: "m³/t", placeholder: "1.4" },
      ],
      calculate: (v) => [{ label: "Gerekli Hacim (V)", value: `${(v.w * v.sf).toFixed(1)} m³` }],
    },
    {
      id: "net-hold-volume",
      name: "Net Ambar Hacmi (Broken Stowage)",
      group: "Stowage",
      formula: "Vnet = Vambar × (1 − BS)",
      variables: [
        { symbol: "Vambar", label: "Gross hold volume", unit: "m³" },
        { symbol: "BS", label: "Broken stowage ratio", unit: "oran" },
      ],
      source: { code: "Broken stowage relation" },
      note: "BS is entered as a percentage (e.g. 10 → 10%).",
      inputs: [
        { key: "vol", label: "Ambar Hacmi", unit: "m³", placeholder: "8000" },
        { key: "bs", label: "Broken Stowage", unit: "%", placeholder: "10" },
      ],
      calculate: (v) => [{ label: "Net Hacim", value: `${(v.vol * (1 - v.bs / 100)).toFixed(1)} m³` }],
    },
    {
      id: "mass-from-volume",
      name: "Mass from Volume",
      group: "Stowage",
      formula: "W = V × ρ",
      variables: [
        { symbol: "V", label: "Hacim", unit: "m³" },
        { symbol: "ρ", label: "Density", unit: "t/m³" },
      ],
      source: { code: "Mass-volume-density relation" },
      inputs: [
        { key: "vol", label: "Hacim (V)", unit: "m³", placeholder: "8000" },
        { key: "rho", label: "Density (ρ)", unit: "t/m³", placeholder: "0.85" },
      ],
      calculate: (v) => [{ label: "Mass (W)", value: `${(v.vol * v.rho).toFixed(1)} t` }],
    },
    {
      id: "effective-lashing",
      name: "Effective Lashing Force (MSL)",
      group: "Lashing",
      formula: "Fetkin = MSL × cos α",
      variables: [
        { symbol: "MSL", label: "Maximum securing load", unit: "kN" },
        { symbol: "α", label: "Angle between the lashing and the deck", unit: "°" },
      ],
      source: { code: "CSS Code", detail: "Cargo lashing calculation" },
      inputs: [
        { key: "msl", label: "MSL", unit: "kN", placeholder: "100" },
        { key: "alpha", label: "Angle (α)", unit: "°", placeholder: "30" },
      ],
      calculate: (v) => [
        { label: "Etkin Kuvvet", value: `${(v.msl * Math.cos((v.alpha * Math.PI) / 180)).toFixed(2)} kN` },
      ],
    },
    {
      id: "qm-draft",
      name: "Quarter Mean Draft",
      group: "Draft Survey",
      formula: "dQM = (dF + 6 × dM + dA) / 8",
      variables: [
        { symbol: "dF", label: "Forward draft", unit: "m" },
        { symbol: "dM", label: "Vasat draft", unit: "m" },
        { symbol: "dA", label: "Aft draft", unit: "m" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Quarter mean (MMM)" },
      inputs: [
        { key: "df", label: "Forward (dF)", unit: "m", placeholder: "7.80" },
        { key: "dm", label: "Vasat (dM)", unit: "m", placeholder: "8.00" },
        { key: "da", label: "Aft (dA)", unit: "m", placeholder: "8.20" },
      ],
      calculate: (v) => [{ label: "Quarter Mean", value: `${((v.df + 6 * v.dm + v.da) / 8).toFixed(3)} m` }],
    },
    {
      id: "trim-correction-1",
      name: "First Trim Correction",
      group: "Draft Survey",
      formula: "Δ₁ = (Trim × LCF × TPC × 100) / LBP",
      variables: [
        { symbol: "Trim", label: "Trim", unit: "m" },
        { symbol: "LCF", label: "Centre of flotation of the waterplane", unit: "m" },
        { symbol: "TPC", label: "Tonnes per centimetre", unit: "t/cm" },
        { symbol: "LBP", label: "Length between perpendiculars", unit: "m" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "First trim correction" },
      inputs: [
        { key: "trim", label: "Trim", unit: "m", placeholder: "0.40" },
        { key: "lcf", label: "LCF", unit: "m", placeholder: "2.5" },
        { key: "tpc", label: "TPC", unit: "t/cm", placeholder: "25" },
        { key: "lbp", label: "LBP", unit: "m", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.lbp <= 0) return [{ label: "Hata", value: "The LBP must be positive" }];
        return [{ label: "Δ₁", value: `${((v.trim * v.lcf * v.tpc * 100) / v.lbp).toFixed(1)} t` }];
      },
    },
    {
      id: "density-correction",
      name: "Density (Dock Water) Correction",
      group: "Draft Survey",
      formula: "Δcorrected = Δtable × (ρdock / 1.025)",
      variables: [
        { symbol: "Δtable", label: "Tablodan deplasman", unit: "t" },
        { symbol: "ρdock", label: "Dock water density", unit: "t/m³" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Density correction" },
      inputs: [
        { key: "disp", label: "Tabular Displacement", unit: "t", placeholder: "12000" },
        { key: "rho", label: "Liman Suyu (ρ)", unit: "t/m³", placeholder: "1.012" },
      ],
      calculate: (v) => [{ label: "Corrected Displacement", value: `${(v.disp * (v.rho / 1.025)).toFixed(1)} t` }],
    },
    {
      id: "gsv",
      name: "Gross Standard Volume (GSV)",
      group: "Liquid Cargo",
      formula: "GSV = GOV × VCF",
      variables: [
        { symbol: "GOV", label: "Gross observed volume", unit: "m³" },
        { symbol: "VCF", label: "Volume correction factor" },
      ],
      source: { code: "API/ASTM petroleum measurement standard" },
      inputs: [
        { key: "gov", label: "GOV", unit: "m³", placeholder: "5000" },
        { key: "vcf", label: "VCF", unit: "", placeholder: "0.985" },
      ],
      calculate: (v) => [{ label: "GSV", value: `${(v.gov * v.vcf).toFixed(2)} m³` }],
    },
    {
      id: "tml",
      name: "Transportable Moisture Limit (TML)",
      group: "Solid Bulk Cargo",
      formula: "TML = FMP × 0.9",
      variables: [{ symbol: "FMP", label: "Flow moisture point", unit: "%" }],
      source: { code: "IMSBC Code", detail: "Group A cargoes — TML/FMP" },
      inputs: [{ key: "fmp", label: "FMP", unit: "%", placeholder: "15" }],
      calculate: (v) => [{ label: "TML", value: `${(v.fmp * 0.9).toFixed(2)} %` }],
    },
    {
      id: "grain-heel",
      name: "Grain Heeling Angle",
      group: "Solid Bulk Cargo",
      formula: "θ = (57.3 × GHM) / (Δ × GM)",
      variables: [
        { symbol: "GHM", label: "Grain heeling moment", unit: "t·m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GM", label: "Corrected GM", unit: "m" },
      ],
      source: { code: "International Grain Code", detail: "Heeling angle ≤ 12°" },
      inputs: [
        { key: "ghm", label: "GHM", unit: "t·m", placeholder: "800" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.disp <= 0 || v.gm <= 0) return [{ label: "Hata", value: "Δ and GM must be positive" }];
        const theta = (57.3 * v.ghm) / (v.disp * v.gm);
        return [
          { label: "Heeling Angle", value: `${theta.toFixed(2)} °` },
          { label: "Durum", value: theta <= 12 ? "Uygun (≤12°)" : "Limit exceeded" },
        ];
      },
    },
    {
      id: "cargo-deadweight",
      name: "Cargo Capacity (Deadweight Balance)",
      group: "Cargo Planning",
      formula: "Cargo = DWT − (Fuel + Fresh Water + Stores + Constant)",
      variables: [
        { symbol: "DWT", label: "Yaz deadweight (DWT)", unit: "t" },
        { symbol: "Fuel", label: "Fuel + oil (bunkers)", unit: "t" },
        { symbol: "Fresh Water", label: "Fresh water", unit: "t" },
        { symbol: "Kumanya", label: "Kumanya + stores", unit: "t" },
        { symbol: "Constant", label: "Gemi sabiti (constant)", unit: "t" },
      ],
      source: { code: "Deadweight (DWT) balance — cargo capacity" },
      note: "The maximum loadable cargo is found by deducting all the fixed weights (deadweight items) from the summer DWT.",
      inputs: [
        { key: "dwt", label: "Yaz DWT", unit: "t", placeholder: "25000" },
        { key: "fuel", label: "Fuel + Oil", unit: "t", placeholder: "1200" },
        { key: "fw", label: "Fresh Water", unit: "t", placeholder: "300" },
        { key: "stores", label: "Kumanya + Stores", unit: "t", placeholder: "100" },
        { key: "constant", label: "Constant", unit: "t", placeholder: "250" },
      ],
      calculate: (v) => {
        const cargo = v.dwt - (v.fuel + v.fw + v.stores + v.constant);
        return [
          { label: "Cargo Capacity", value: `${cargo.toFixed(0)} t` },
          { label: "Durum", value: cargo > 0 ? "Uygun" : "Deadweight exceeded" },
        ];
      },
    },
    {
      id: "deck-load-intensity",
      name: "Deck/Tank Top Load Density",
      group: "Cargo Planning",
      formula: "p = W / A  (≤ the permissible deck load)",
      variables: [
        { symbol: "p", label: "Load density", unit: "t/m²" },
        { symbol: "W", label: "Cargo weight", unit: "t" },
        { symbol: "A", label: "Base contact area", unit: "m²" },
      ],
      source: { code: "Deck/tank top strength — permissible load density" },
      note: "The calculated density must not exceed the vessel's permissible deck/tank top load limit (t/m²).",
      inputs: [
        { key: "w", label: "Cargo Weight (W)", unit: "t", placeholder: "60" },
        { key: "a", label: "Contact Area (A)", unit: "m²", placeholder: "20" },
        { key: "limit", label: "Permissible Load", unit: "t/m²", placeholder: "5" },
      ],
      calculate: (v) => {
        if (v.a <= 0) return [{ label: "Hata", value: "The area must be positive" }];
        const p = v.w / v.a;
        const status = v.limit > 0 ? (p <= v.limit ? "Uygun" : "Limit exceeded") : "—";
        return [
          { label: "Load Density (p)", value: `${p.toFixed(2)} t/m²` },
          { label: "Durum", value: status },
        ];
      },
    },
    {
      id: "cargo-shift-list",
      name: "Heel Angle from Cargo Shift",
      group: "Cargo Planning",
      formula: "θ = (w × d) / (Δ × GM) × 57.3",
      variables: [
        { symbol: "θ", label: "Heel angle", unit: "°" },
        { symbol: "w", label: "Shifted/transferred cargo", unit: "t" },
        { symbol: "d", label: "Transverse shift distance", unit: "m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GM", label: "Corrected GM", unit: "m" },
      ],
      source: { code: "Stability — heel from a transverse weight shift" },
      note: "Small angle approximation (tan θ ≈ θ). A full solution is required at large angles.",
      inputs: [
        { key: "w", label: "Shifted Cargo (w)", unit: "t", placeholder: "200" },
        { key: "d", label: "Enine Mesafe (d)", unit: "m", placeholder: "8" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.disp <= 0 || v.gm <= 0) return [{ label: "Hata", value: "Δ and GM must be positive" }];
        const theta = ((v.w * v.d) / (v.disp * v.gm)) * 57.3;
        return [{ label: "Heel Angle (θ)", value: `${theta.toFixed(2)} °` }];
      },
    },
  ],
};
