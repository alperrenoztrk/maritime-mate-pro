import { useState, type ReactNode } from "react";
import { LocationContext, type SelectedLocation } from "./location-context";

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocationState] = useState<SelectedLocation>(() => {
    // localStorage'dan başlangıç değerini al
    try {
      const stored = localStorage.getItem('selectedLocation');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const setSelectedLocation = (location: SelectedLocation) => {
    setSelectedLocationState(location);
    // localStorage'a kaydet
    if (location) {
      localStorage.setItem('selectedLocation', JSON.stringify(location));
    } else {
      localStorage.removeItem('selectedLocation');
    }
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
