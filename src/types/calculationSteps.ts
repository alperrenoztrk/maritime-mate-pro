export interface CalculationStep {
  step: number;
  title: string;
  formula: string;
  substitution?: string;
  result?: string;
  explanation?: string;
}
