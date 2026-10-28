import { createContext, type MutableRefObject } from 'react';
/** Optional shared clock; standalone ship models retain the R3F clock. */
export const SimulationClock = createContext<MutableRefObject<{ time: number }> | null>(null);
