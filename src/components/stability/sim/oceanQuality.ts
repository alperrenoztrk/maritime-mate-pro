export type OceanQuality = 'performance' | 'balanced' | 'high';

/** Conservative first frame on phones; users can still select more detail. */
export function defaultOceanQuality(): OceanQuality {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    ? 'performance' : 'balanced';
}

export const OCEAN_SEGMENTS: Record<OceanQuality, number> = {
  performance: 64,
  balanced: 96,
  high: 192,
};
