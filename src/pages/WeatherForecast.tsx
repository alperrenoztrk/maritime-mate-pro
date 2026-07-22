import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Wind, CloudRain, Compass, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { useHourlyWeather } from "@/hooks/useHourlyWeather";
import { WeatherIcon } from "@/components/weather/WeatherIcon";

function wmoToTr(code?: number): string {
  switch (code) {
    case 0: return "Açık";
    case 1: return "Az bulutlu";
    case 2: return "Parçalı bulutlu";
    case 3: return "Kapalı";
    case 45:
    case 48: return "Sis";
    case 51:
    case 53:
    case 55: return "Çiseleme";
    case 56:
    case 57: return "Donan çiseleme";
    case 61:
    case 63:
    case 65: return "Yağmur";
    case 66:
    case 67: return "Donan yağmur";
    case 71:
    case 73:
    case 75: return "Kar";
    case 77: return "Kar taneleri";
    case 80:
    case 81:
    case 82: return "Sağanak yağmur";
    case 85:
    case 86: return "Kar sağanağı";
    case 95: return "Gök gürültülü fırtına";
    case 96:
    case 99: return "Dolu fırtınası";
    default: return "Belirsiz";
  }
}

function degreesToCompass(degrees: number): string {
  if (Number.isNaN(degrees)) return "-";
  const directions = ["K", "KKD", "KD", "DKD", "D", "DGD", "GD", "GGD", "G", "GGB", "GB", "BGB", "B", "BKB", "KB", "KKB"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export default function WeatherForecast() {
  const [searchParams] = useSearchParams();
  const { locationLabel } = useCurrentWeather();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  
  const lat = Number(searchParams.get('lat'));
  const lon = Number(searchParams.get('lon'));
  const selectedLocationName = searchParams.get('location');
  
  const { loading, error, data } = useWeatherForecast(lat, lon);
  const { loading: hourlyLoading, error: hourlyError, data: hourlyData, fetchHourlyWeather } = useHourlyWeather();

  const dayNames = useMemo(() => {
    return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  }, []);

  const formatDate = (dateStr: string, index: number) => {
    const date = new Date(dateStr);
    const dayName = dayNames[date.getDay()];
    if (index === 0) return "Bugün";
    if (index === 1) return "Yarın";
    return `${dayName} ${date.getDate()}/${date.getMonth() + 1}`;
  };

  const handleDayClick = (date: string) => {
    if (expandedDay === date) {
      setExpandedDay(null);
    } else {
      setExpandedDay(date);
      fetchHourlyWeather(lat, lon, date);
    }
  };

  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.getHours().toString().padStart(2, '0') + ":00";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-card p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">5 Günlük Hava Tahmini</h1>
          <div></div>
        </div>

        {/* Location Info */}
        <Card className="border-border/20 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {selectedLocationName || locationLabel ? (
                  <span className="notranslate" translate="no">{selectedLocationName || locationLabel}</span>
                ) : (
                  "Konum bilgisi alınıyor..."
                )}
              </h2>
              <p className="text-sm text-muted-foreground">
                {Number.isFinite(lat) && Number.isFinite(lon) 
                  ? `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`
                  : "Koordinat bilgisi alınıyor..."
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Content */}
        {loading ? (
          <Card className="border-border/20 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <div className="relative">
                  <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                </div>
                <p className="text-muted-foreground">Hava tahmini yükleniyor...</p>
              </div>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="border-destructive/20 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-destructive font-semibold mb-2">Hava tahmini alınamadı</p>
                <p className="text-muted-foreground text-sm">{error}</p>
              </div>
            </CardContent>
          </Card>
        ) : data ? (
          <div className="grid gap-4">
            {data.daily.map((day, index) => (
              <div key={day.date}>
                <Card className={`border-border/20 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${index === 0 ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardContent className="p-6" onClick={() => handleDayClick(day.date)}>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                      {/* Date & Weather */}
                      <div className="text-center md:text-left">
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {formatDate(day.date, index)}
                        </h3>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                          <WeatherIcon code={day.weatherCode} className="h-9 w-9" />
                          <div>
                            <p className="font-medium text-foreground">{wmoToTr(day.weatherCode)}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(day.date).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Temperature */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Thermometer className="h-5 w-5 text-info" />
                          <span className="text-sm font-medium text-muted-foreground">Sıcaklık</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xl font-bold text-foreground">
                            {Number.isFinite(day.temperatureMax) ? `${Math.round(day.temperatureMax)}°` : "-"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Min: {Number.isFinite(day.temperatureMin) ? `${Math.round(day.temperatureMin)}°` : "-"}
                          </p>
                        </div>
                      </div>

                      {/* Wind */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Wind className="h-5 w-5 text-success" />
                          <span className="text-sm font-medium text-muted-foreground">Rüzgar</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-foreground">
                            {Number.isFinite(day.windSpeedMax) ? `${Math.round(day.windSpeedMax)} kt` : "-"}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                            <Compass className="h-3 w-3" style={{ transform: `rotate(${day.windDirection || 0}deg)` }} />
                            <span>{degreesToCompass(day.windDirection)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Precipitation */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <CloudRain className="h-5 w-5 text-accent" />
                          <span className="text-sm font-medium text-muted-foreground">Yağış</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-foreground">
                            {day.precipitationSum > 0 ? `${day.precipitationSum.toFixed(1)} mm` : "Yok"}
                          </p>
                          <p className="text-xs text-muted-foreground">Toplam</p>
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          {expandedDay === day.date ? (
                            <ChevronUp className="h-6 w-6 text-primary" />
                          ) : (
                            <ChevronDown className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hourly Forecast */}
                {expandedDay === day.date && (
                  <Card className="border-border/20 shadow-lg mt-2 animate-in slide-in-from-top-5 duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="h-5 w-5 text-primary" />
                        Saatlik Tahmin - {formatDate(day.date, index)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {hourlyLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="relative">
                            <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                          </div>
                          <span className="ml-3 text-muted-foreground">Saatlik veriler yükleniyor...</span>
                        </div>
                      ) : hourlyError ? (
                        <div className="text-center py-8">
                          <p className="text-destructive font-semibold mb-2">Saatlik veriler alınamadı</p>
                          <p className="text-muted-foreground text-sm">{hourlyError}</p>
                        </div>
                      ) : hourlyData ? (
                        <div className="grid gap-3 max-h-96 overflow-y-auto">
                          {hourlyData.hourly.map((hour, hourIndex) => (
                            <div key={hour.time} className="flex items-center justify-between p-3 rounded-lg border border-border/10 hover:bg-accent/5 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="text-center w-12">
                                  <p className="font-semibold text-foreground">{formatHour(hour.time)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <WeatherIcon code={hour.weatherCode} className="h-6 w-6" />
                                  <span className="text-sm text-muted-foreground hidden sm:inline">
                                    {wmoToTr(hour.weatherCode)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-1">
                                  <Thermometer className="h-3 w-3 text-info" />
                                  <span className="font-semibold">
                                    {Number.isFinite(hour.temperature) ? `${Math.round(hour.temperature)}°` : "-"}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <Wind className="h-3 w-3 text-success" />
                                  <span>
                                    {Number.isFinite(hour.windSpeed) ? `${Math.round(hour.windSpeed)} kt` : "-"}
                                  </span>
                                  <Compass className="h-3 w-3 ml-1" style={{ transform: `rotate(${hour.windDirection || 0}deg)` }} />
                                </div>
                                
                                {hour.precipitation > 0 && (
                                  <div className="flex items-center gap-1">
                                    <CloudRain className="h-3 w-3 text-accent" />
                                    <span>{hour.precipitation.toFixed(1)}mm</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}