import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Users, Clock } from "lucide-react";
import { useLocationSearch, type LocationResult } from '@/hooks/useLocationSearch';
import { useWeatherForecast } from '@/hooks/useWeatherForecast';
import { useCurrentWeather } from '@/hooks/useCurrentWeather';
import { formatDecimalAsDMS } from '@/utils/coordinateUtils';
import { useLocation } from '@/contexts/useSelectedLocation';
import { toast } from 'sonner';

function LocationCard({ location, onSelect }: { location: LocationResult; onSelect: (location: LocationResult) => void }) {
  return (
    <Card 
      className="cursor-pointer border-border/20 shadow-lg hover:shadow-xl transition-[background-color,color,border-color,box-shadow,opacity,transform,width] duration-page hover:scale-[1.02] group"
      onClick={() => onSelect(location)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative mt-1">
            <MapPin className="h-5 w-5 text-primary drop-shadow-sm" />
            <div className="absolute inset-0 animate-pulse opacity-30 group-hover:opacity-0 transition-opacity">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-semibold text-foreground text-lg notranslate" translate="no">{location.name}</h3>
              <p className="text-muted-foreground text-sm notranslate" translate="no">
                {location.admin1 ? `${location.admin1}, ` : ''}{location.country}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden />
                <span className="font-mono text-micro">
                  {formatDecimalAsDMS(location.latitude, true, true)}, {formatDecimalAsDMS(location.longitude, false, true)}
                </span>
              </div>
              
              {location.population && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{location.population.toLocaleString('tr-TR')}</span>
                </div>
              )}
              
              {location.timezone && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{location.timezone}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LocationSelector() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { query, setQuery, results, loading, error } = useLocationSearch();
  const [selectedLocationState, setSelectedLocationState] = useState<LocationResult | null>(null);
  const { setSelectedLocation } = useLocation();
  
  const returnTo = searchParams.get('returnTo') || '/';
  const { locationLabel, isFallbackLocation } = useCurrentWeather();

  const handleLocationSelect = (location: LocationResult) => {
    setSelectedLocationState(location);
    
    // Global context'e kaydet
    setSelectedLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      locationLabel: `${location.name}, ${location.country}`,
    });
    
    toast.success(`Location set: ${location.name}`);
    
    // Seçim sonrası hedef sayfaya dön
    navigate(returnTo);
  };

  const handleUseDeviceLocation = () => {
    setSelectedLocation(null);
    toast.success("Device location will be used");
    navigate(returnTo);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-foreground">Location Picker</h1>
        </div>

        {/* Current Location */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground">
                {locationLabel ? (
                  <span className="notranslate" translate="no">{locationLabel}</span>
                ) : (
                  "Retrieving location information..."
                )}
              </p>
              {isFallbackLocation && (
                <p className="text-xs text-amber-500 mt-1">
                  Location could not be obtained. The default location is shown.
                </p>
              )}
            </div>
            <Button variant="outline" onClick={handleUseDeviceLocation}>
              Use device location
            </Button>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="border-border/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Search className="h-5 w-5 text-primary" />
              Search New Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter a city, country or region name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 text-base"
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Example: Istanbul, Tokyo, New York, Paris, London
            </p>
          </CardContent>
        </Card>

        {/* Search Results */}
        {query.length >= 2 && (
          <Card className="border-border/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center gap-3 py-8">
                  <div className="relative">
                    <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Searching for locations...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-destructive font-semibold mb-2">Search error</p>
                  <p className="text-muted-foreground text-sm">{error}</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      onSelect={handleLocationSelect}
                    />
                  ))}
                </div>
              ) : query.length >= 2 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">"{query}" için sonuç bulunamadı</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try a different search term
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
