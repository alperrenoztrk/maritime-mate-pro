export const PACK_FORMAT: number;
export function unpackValues(keys: string[], values: unknown[], baseValues?: unknown[]): Record<string, string>;
export function packLocales(options?: {
  localesDir?: string;
  removeLegacy?: boolean;
  log?: (...args: unknown[]) => void;
}): unknown;
