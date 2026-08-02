import { createContext } from "react";

export type SelectedLocation = {
  latitude: number;
  longitude: number;
  locationLabel: string;
} | null;

export interface LocationContextValue {
  selectedLocation: SelectedLocation;
  setSelectedLocation: (location: SelectedLocation) => void;
}

export const LocationContext = createContext<LocationContextValue | undefined>(undefined);
