export type InputConstraint = {
  label: string;
  unit: string;
  min: number;
  max: number;
  required?: boolean;
  stepHint?: string;
};

export type ConstraintGroup = Record<string, InputConstraint>;

export const stabilityInputConstraints: Record<string, ConstraintGroup> = {
  geometry: {
    length: { label: "Ship's Length (L)", unit: "m", min: 10, max: 450, required: true },
    breadth: { label: "Ship's Breadth (B)", unit: "m", min: 2, max: 80, required: true },
    depth: { label: "Depth (D)", unit: "m", min: 2, max: 60, required: true },
    draft: { label: "Draft (T)", unit: "m", min: 0.5, max: 35, required: true },
    blockCoefficient: { label: "Block Coefficient (Cb)", unit: "-", min: 0.45, max: 0.95, required: true },
    waterplaneCoefficient: { label: "Waterplane Coefficient (Cw)", unit: "-", min: 0.5, max: 0.98, required: true },
    midshipCoefficient: { label: "Midship Section Coefficient (Cm)", unit: "-", min: 0.6, max: 0.99, required: true },
    prismaticCoefficient: { label: "Prismatic Coefficient (Cp)", unit: "-", min: 0.5, max: 0.85, required: true },
    verticalPrismaticCoefficient: { label: "Vertical Prismatic Coefficient (Cvp)", unit: "-", min: 0.5, max: 0.95, required: true }
  },
  gmCalculation: {
    kb: { label: "KB", unit: "m", min: 0, max: 20, required: true },
    bm: { label: "BM", unit: "m", min: 0, max: 30, required: true },
    kg: { label: "KG", unit: "m", min: 0, max: 30, required: true }
  },
  kgInput: {
    value: { label: "KG", unit: "m", min: 0, max: 30, required: true }
  },
  gzCalculation: {
    gm: { label: "GM", unit: "m", min: 0, max: 15, required: true },
    angle: { label: "Angle of Heel", unit: "°", min: 0, max: 90, required: true }
  },
  freeSurface: {
    length: { label: "Tank Boyu (L)", unit: "m", min: 0.5, max: 80, required: true },
    breadth: { label: "Tank Eni (B)", unit: "m", min: 0.5, max: 30, required: true },
    volume: { label: "Volume (V)", unit: "m³", min: 1, max: 20000, required: true }
  },
  windWeather: {
    windSpeed: { label: "Wind Speed", unit: "m/s", min: 0, max: 80, required: true },
    pressure: { label: "Wind Pressure", unit: "N/m²", min: 0, max: 5000, required: true },
    area: { label: "Exposed Area", unit: "m²", min: 1, max: 50000, required: true },
    lever: { label: "Lever Arm", unit: "m", min: 0.5, max: 50, required: true },
    displacement: { label: "Deplasman", unit: "t", min: 10, max: 300000, required: true }
  }
};

export const draftSurveyConstraints: ConstraintGroup = {
  forwardDraft: { label: "Forward Draft", unit: "m", min: 0, max: 25, required: true },
  midshipDraft: { label: "Midships Draft", unit: "m", min: 0, max: 25, required: true },
  aftDraft: { label: "Aft Draft", unit: "m", min: 0, max: 25, required: true }
};
