import React, { useRef, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import TimeWidgets from "@/components/widgets/TimeWidgets";
import WeatherInfoWidgets from "@/components/widgets/WeatherInfoWidgets";
import LocationCelestialWidgets from "@/components/widgets/LocationCelestialWidgets";
import { ChevronLeft, ChevronRight, Clock3, CloudSun, Globe2, Smartphone, MoveHorizontal, MousePointerClick, Compass } from "lucide-react";

// Uygulama artık yalnızca koyu temayı destekliyor; widget sayfası da her zaman
// koyu renk şemasını kullanır.
const oceanTheme = {
  background: "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900",
  cardBg: "bg-slate-800/60",
  textColor: "text-foreground",
  accentColor: "text-slate-300",
  indicatorColor: "bg-slate-400",
};

const EmptyPage = () => {
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const hasSwiped = useRef(false);
  const [activeTab, setActiveTab] = useState("time");
  const tabs = ["time", "weather", "location"];
  const [showTutorial, setShowTutorial] = useState(false);

  const { loading, error, data, locationLabel } = useCurrentWeather({
    watchPosition: false,
    refreshMs: 300000,
    reverseGeocode: true,
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // İlk açılışta öğreticiyi göster
    const hasSeenTutorial = localStorage.getItem("widgetPageTutorialSeen");
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    localStorage.setItem("widgetPageTutorialSeen", "true");
    setShowTutorial(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
    hasSwiped.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    if (hasSwiped.current || touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchEndX.current - touchStartX.current;
    const swipeThreshold = 60;
    const isRightSwipe = distance > swipeThreshold;
    const isLeftSwipe = distance < -swipeThreshold;

    if (isRightSwipe || isLeftSwipe) {
      const currentIndex = tabs.indexOf(activeTab);
      if (isRightSwipe) {
        if (currentIndex === 0) {
          navigate('/');
        } else {
          setActiveTab(tabs[currentIndex - 1]);
        }
      } else if (isLeftSwipe) {
        if (currentIndex < tabs.length - 1) {
          setActiveTab(tabs[currentIndex + 1]);
        }
      }
      hasSwiped.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!hasSwiped.current && touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchEndX.current - touchStartX.current;
      const isRightSwipe = distance > 100; // Sağa kaydırma
      const isLeftSwipe = distance < -100; // Sola kaydırma

      const currentIndex = tabs.indexOf(activeTab);

      if (isRightSwipe) {
        // Sağa kaydırma: Önceki sekmeye git veya ana sayfaya dön
        if (currentIndex === 0) {
          navigate('/');
        } else {
          setActiveTab(tabs[currentIndex - 1]);
        }
      } else if (isLeftSwipe) {
        // Sola kaydırma: Sonraki sekmeye git
        if (currentIndex < tabs.length - 1) {
          setActiveTab(tabs[currentIndex + 1]);
        }
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    hasSwiped.current = false;
  };

  // Click navigation for left and right zones
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Don't navigate if clicking on interactive elements or within widgets
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]') ||
      target.closest('.weather-widget-clickable') ||
      target.closest('[data-widget-container]') // Widget container'ları engelle
    ) {
      return;
    }

    const clickX = e.clientX;
    const clickY = e.clientY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Only navigate if click is above 70% of screen height
    if (clickY > screenHeight * 0.70) return;
    
    const currentIndex = tabs.indexOf(activeTab);
    
    // Left 35% zone
    if (clickX < screenWidth * 0.35) {
      if (currentIndex === 0) {
        navigate('/');
      } else {
        setActiveTab(tabs[currentIndex - 1]);
      }
    }
    // Right 35% zone
    else if (clickX > screenWidth * 0.65) {
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]);
      }
    }
  };

  // Utility functions
  const degreesToCompass = (degrees: number): string => {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const degreesToWindName = (degrees: number): string => {
    const windNames = [
      "North", "North-northeast", "Northeast", "East-northeast",
      "East", "East-southeast", "Southeast", "South-southeast",
      "South", "South-southwest", "Southwest", "West-southwest",
      "West", "West-northwest", "Northwest", "North-northwest"
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return windNames[index];
  };

  const decimalToDMS = (decimal: number, isLatitude: boolean = true): string => {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = ((minutesFloat - minutes) * 60).toFixed(1);
    const direction = isLatitude
      ? (decimal >= 0 ? "N" : "S")
      : (decimal >= 0 ? "E" : "W");
    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  };

  const wmoToDescription = (code?: number): string => {
    if (code === undefined) return "Unknown";
    if (code === 0) return "Clear";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Cloudy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Showers";
    if (code <= 86) return "Snow Showers";
    if (code >= 95) return "Stormy";
    return "Unknown";
  };

  // Computed values
  const windCompass = useMemo(
    () => (data?.windDirectionDeg !== undefined ? degreesToCompass(data.windDirectionDeg) : "—"),
    [data?.windDirectionDeg]
  );

  const windName = useMemo(
    () => (data?.windDirectionDeg !== undefined ? degreesToWindName(data.windDirectionDeg) : "—"),
    [data?.windDirectionDeg]
  );

  const latitudeDMS = useMemo(
    () => (data?.latitude !== undefined ? decimalToDMS(data.latitude, true) : "—"),
    [data?.latitude]
  );

  const longitudeDMS = useMemo(
    () => (data?.longitude !== undefined ? decimalToDMS(data.longitude, false) : "—"),
    [data?.longitude]
  );

  const weatherDescription = useMemo(() => wmoToDescription(data?.weatherCode), [data?.weatherCode]);

  // Time calculations
  const nationalTime = useMemo(() => {
    const tz = data?.timezoneId;
    try {
      return currentTime.toLocaleTimeString("tr-TR", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } catch {
      return currentTime.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    }
  }, [currentTime, data?.timezoneId]);

  const gmtTime = useMemo(() => {
    return currentTime.toLocaleTimeString("en-GB", { timeZone: "UTC", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  }, [currentTime]);

  const lmtTime = useMemo(() => {
    if (!data?.longitude) return "—";
    const lmtOffset = data.longitude / 15;
    const lmt = new Date(currentTime.getTime() + lmtOffset * 3600000);
    return lmt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  }, [currentTime, data?.longitude]);

  const ztTime = useMemo(() => {
    if (!data?.longitude) return "—";
    const lmtOffset = data.longitude / 15;
    const zt = new Date(currentTime.getTime() + Math.round(lmtOffset) * 3600000);
    return zt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  }, [currentTime, data?.longitude]);

  const sunriseTime = useMemo(() => {
    if (!data?.sunriseIso) return "—";
    const sunrise = new Date(data.sunriseIso);
    return sunrise.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", hour12: false });
  }, [data?.sunriseIso]);

  const sunsetTime = useMemo(() => {
    if (!data?.sunsetIso) return "—";
    const sunset = new Date(data.sunsetIso);
    return sunset.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", hour12: false });
  }, [data?.sunsetIso]);

  if (loading) {
    return (
      <div className={`min-h-screen ${oceanTheme.background} flex items-center justify-center`}>
        <div className={oceanTheme.textColor}>Loading…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${oceanTheme.background} flex items-center justify-center p-6`}>
        <div className="text-red-600 text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen ${oceanTheme.background} px-6 py-8 touch-auto cursor-pointer relative transition-colors duration-sheet`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Sol ok göstergesi - Her zaman göster */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronLeft className={`w-8 h-8 ${oceanTheme.textColor} opacity-40 drop-shadow-lg`} />
          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${oceanTheme.textColor} opacity-40`}></div>
            <div className={`w-1.5 h-1.5 rounded-full ${oceanTheme.textColor} opacity-30`}></div>
            <div className={`w-1.5 h-1.5 rounded-full ${oceanTheme.textColor} opacity-20`}></div>
          </div>
        </div>
      </div>

      {/* Sağ ok göstergesi */}
      {tabs.indexOf(activeTab) < tabs.length - 1 && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <ChevronRight className={`w-8 h-8 ${oceanTheme.textColor} opacity-40 drop-shadow-lg`} />
            <div className="flex gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${oceanTheme.textColor} opacity-20`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${oceanTheme.textColor} opacity-30`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${oceanTheme.textColor} opacity-40`}></div>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Dialog */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-blue-900">
              <Compass className="h-6 w-6 text-blue-700" />
              Welcome!
            </DialogTitle>
            <DialogDescription className="text-base text-blue-800 space-y-3 pt-2">
              <p className="font-medium">There are 3 different categories on the widget page:</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-blue-700" /> <strong>Timestamps</strong></li>
                <li className="flex items-center gap-2"><CloudSun className="h-4 w-4 text-blue-700" /> <strong>Weather</strong></li>
                <li className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-blue-700" /> <strong>Location</strong></li>
              </ul>
              <div className="pt-3 space-y-2 border-t border-blue-300">
                <p className="flex items-center gap-2 font-semibold text-blue-900">
                  <Smartphone className="h-4 w-4" /> Navigation Methods:
                </p>
                <p className="flex items-start gap-2"><MoveHorizontal className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" /> <span><strong>Scroll:</strong> Switch between categories by swiping the page left/right</span></p>
                <p className="flex items-start gap-2"><MousePointerClick className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" /> <span><strong>Click:</strong> Tap the right 35% of the screen to go forward, the left 35% to go back</span></p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={handleCloseTutorial} className="bg-blue-600 hover:bg-blue-700 text-white">
              Got it, Let's get started!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto max-w-[900px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

          <TabsContent value="time" className="space-y-4 animate-fade-in mt-0">
            <h2 className={`flex items-center gap-2 text-xl font-semibold ${oceanTheme.textColor} mb-4`}><Clock3 className="h-5 w-5" /> Timestamps</h2>
            <div data-widget-container>
              <TimeWidgets
                nationalTime={nationalTime}
                gmtTime={gmtTime}
                lmtTime={lmtTime}
                ztTime={ztTime}
                sunriseTime={sunriseTime}
                sunsetTime={sunsetTime}
              />
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-4 animate-fade-in mt-0">
            <h2 className={`flex items-center gap-2 text-xl font-semibold ${oceanTheme.textColor} mb-4`}><CloudSun className="h-5 w-5" /> Weather</h2>
            <div data-widget-container>
              <WeatherInfoWidgets
                temperature={data?.temperatureC}
                humidity={data?.humidityPct}
                pressure={data?.pressureHpa}
                windSpeed={data?.windSpeedKt}
                windDirection={data?.windDirectionDeg}
                windCompass={windCompass}
                windName={windName}
                weatherCode={data?.weatherCode}
                weatherDescription={weatherDescription}
                latitude={data?.latitude}
                longitude={data?.longitude}
              />
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-4 animate-fade-in mt-0">
            <h2 className={`flex items-center gap-2 text-xl font-semibold ${oceanTheme.textColor} mb-4`}><Globe2 className="h-5 w-5" /> Location</h2>
            <div data-widget-container>
              <LocationCelestialWidgets
                locationLabel={locationLabel}
                latitude={data?.latitude}
                longitude={data?.longitude}
                latitudeDMS={latitudeDMS}
                longitudeDMS={longitudeDMS}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Sayfa göstergeleri - Sadece noktalar */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none z-20">
          <div className={`${oceanTheme.cardBg} rounded-full px-4 py-2 border border-white/30 shadow-lg flex items-center gap-1.5`}>
            {tabs.map((tab, idx) => (
              <div
                key={tab}
                className={`h-1.5 rounded-full transition-[background-color,color,border-color,box-shadow,opacity,transform,width] duration-page ${
                  tabs.indexOf(activeTab) === idx
                    ? `w-6 ${oceanTheme.indicatorColor}`
                    : `w-1.5 ${oceanTheme.textColor} opacity-30`
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
