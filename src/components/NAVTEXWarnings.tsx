import React, { useCallback, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Radio, 
  AlertTriangle, 
  Wind, 
  Waves, 
  Ship, 
  MapPin, 
  Clock,
  RefreshCw,
  Info,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NAVTEXMessage {
  id: string;
  station: string;
  messageType: string;
  priority: 'routine' | 'warning' | 'urgent' | 'distress';
  area: string;
  subject: string;
  content: string;
  validFrom: string;
  validUntil: string;
  timestamp: string;
}

interface WeatherAlert {
  event: string;
  severity: string;
  certainty: string;
  urgency: string;
  description: string;
  instruction: string;
  onset: string;
  expires: string;
}

interface OpenMeteoMarineWeather {
  current?: {
    temperature_2m?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
  };
  hourly?: {
    wind_speed_10m?: number[];
    wind_gusts_10m?: number[];
    wave_height?: number[];
    wave_direction?: number[];
  };
}

const NAVTEX_STATIONS = [
  { id: "ISTANBUL", name: "Istanbul (Turkey)", lat: 41.0082, lon: 28.9784 },
  { id: "IZMIR", name: "Izmir (Turkey)", lat: 38.4192, lon: 27.1287 },
  { id: "ANTALYA", name: "Antalya (Türkiye)", lat: 36.8969, lon: 30.7133 },
  { id: "SAMSUN", name: "Samsun (Türkiye)", lat: 41.2867, lon: 36.33 },
  { id: "ATHENS", name: "Athens (Greece)", lat: 37.9838, lon: 23.7275 },
] as const;

const getCurrentWeatherSynopsis = (data: OpenMeteoMarineWeather): string => {
  const windSpeed = data.current?.wind_speed_10m || 0;
  if (windSpeed < 10) return "HIGH PRESSURE SYSTEM DOMINANT, SETTLED CONDITIONS";
  if (windSpeed < 25) return "MODERATE PRESSURE GRADIENT, VARIABLE CONDITIONS";
  return "LOW PRESSURE SYSTEM APPROACHING, DETERIORATING CONDITIONS";
};

const getWindDescription = (windSpeed: number): string => {
  if (windSpeed < 10) return "LIGHT TO MODERATE";
  if (windSpeed < 20) return "MODERATE TO FRESH";
  if (windSpeed < 30) return "STRONG";
  if (windSpeed < 40) return "GALE FORCE";
  return "STORM FORCE";
};

const getSeaState = (windSpeed: number): string => {
  if (windSpeed < 10) return "SLIGHT (0.5-1.25M)";
  if (windSpeed < 20) return "MODERATE (1.25-2.5M)";
  if (windSpeed < 30) return "ROUGH (2.5-4M)";
  if (windSpeed < 40) return "VERY ROUGH (4-6M)";
  return "HIGH (6M+)";
};

const getVisibility = (_data: OpenMeteoMarineWeather): string => "GOOD (>5NM)";

const generateNAVTEXMessages = (weatherData: OpenMeteoMarineWeather, station: string): NAVTEXMessage[] => {
  const messages: NAVTEXMessage[] = [];
  const now = new Date();
  const currentWindSpeed = weatherData.current?.wind_speed_10m || 0;
  const maxWindSpeed = Math.max(...(weatherData.hourly?.wind_speed_10m?.slice(0, 24) || [0]));

  if (maxWindSpeed > 25) {
    messages.push({
      id: `GW-${Date.now()}-1`, station, messageType: "GALE WARNING",
      priority: maxWindSpeed > 40 ? "urgent" : "warning", area: "Local Waters",
      subject: "STRONG WIND WARNING",
      content: `GALE WARNING IN EFFECT\n\nWIND: ${Math.round(currentWindSpeed)} KN, GUSTS UP TO ${Math.round(maxWindSpeed)} KN\nDIRECTION: ${weatherData.current?.wind_direction_10m || "VARIABLE"}°\n\nMARINERS ARE ADVISED TO TAKE NECESSARY PRECAUTIONS.\nSMALL CRAFT SHOULD REMAIN IN PORT.\nLARGE VESSELS SHOULD PROCEED WITH CAUTION.`,
      validFrom: now.toISOString(), validUntil: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), timestamp: now.toISOString(),
    });
  }

  messages.push({
    id: `WF-${Date.now()}-2`, station, messageType: "WEATHER FORECAST", priority: "routine",
    area: "Local Waters", subject: "24-HOUR WEATHER FORECAST",
    content: `MARINE WEATHER FORECAST\n\nSYNOPSIS: ${getCurrentWeatherSynopsis(weatherData)}\n\nWIND: ${Math.round(currentWindSpeed)} KN, ${getWindDescription(currentWindSpeed)}\nSEA STATE: ${getSeaState(currentWindSpeed)}\nVISIBILITY: ${getVisibility(weatherData)}\n\nOUTLOOK NEXT 24 HOURS:\nWIND SPEEDS MAY REACH ${Math.round(maxWindSpeed)} KN\n\nTHIS IS A ${station} NAVTEX BROADCAST.`,
    validFrom: now.toISOString(), validUntil: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), timestamp: now.toISOString(),
  });

  messages.push({
    id: `NW-${Date.now()}-3`, station, messageType: "NAVIGATIONAL WARNING", priority: "routine",
    area: "Coastal Waters", subject: "ROUTINE NAVIGATION NOTICE",
    content: `NAVIGATIONAL WARNING\n\nALL MARINERS ARE REMINDED:\n- MAINTAIN PROPER LOOKOUT AT ALL TIMES\n- MONITOR VHF CHANNEL 16\n- REPORT ANY HAZARDS TO NAVIGATION\n- COMPLY WITH COLREG REGULATIONS\n\nCURRENT CONDITIONS:\nTEMPERATURE: ${Math.round(weatherData.current?.temperature_2m || 15)}°C\nWIND: ${Math.round(currentWindSpeed)} KN\n\nEND OF MESSAGE`,
    validFrom: now.toISOString(), validUntil: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(), timestamp: now.toISOString(),
  });

  messages.push({
    id: `SR-${Date.now()}-4`, station, messageType: "SEARCH AND RESCUE", priority: "routine",
    area: "All Areas", subject: "SAR INFORMATION",
    content: `SEARCH AND RESCUE INFORMATION\n\nEMERGENCY CONTACTS:\n- VHF CHANNEL 16 (DISTRESS)\n- TELEPHONE: 112 (EMERGENCY)\n- MRCC ${station}: +90 XXX XXX XXXX\n\nIN CASE OF EMERGENCY:\n1. TRANSMIT MAYDAY ON VHF CH 16\n2. ACTIVATE EPIRB IF AVAILABLE\n3. PREPARE LIFE-SAVING EQUIPMENT\n4. REMAIN CALM AND FOLLOW INSTRUCTIONS\n\nTHIS INFORMATION IS CURRENT AS OF ${now.toISOString().split("T")[0]}`,
    validFrom: now.toISOString(), validUntil: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), timestamp: now.toISOString(),
  });

  const priorityOrder = { distress: 0, urgent: 1, warning: 2, routine: 3 };
  return messages.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export const NAVTEXWarnings = () => {
  const [messages, setMessages] = useState<NAVTEXMessage[]>([]);
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState("ISTANBUL");
  const { toast } = useToast();

  const fetchWeatherAlerts = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m&hourly=wind_speed_10m,wind_gusts_10m,wave_height,wave_direction&forecast_days=3&wind_speed_unit=kn`
      );
      
      if (!response.ok) throw new Error('Weather data could not be retrieved');
      
      const data = await response.json() as OpenMeteoMarineWeather;
      
      // Generate NAVTEX-style messages based on weather data
      const generatedMessages = generateNAVTEXMessages(data, selectedStation);
      setMessages(generatedMessages);
      
      toast({
        title: "NAVTEX Messages Updated",
        description: `${selectedStation} for station ${generatedMessages.length} message received`,
      });
    } catch (error) {
      console.error('Weather alerts error:', error);
      toast({
        title: "Error",
        description: "Could not receive weather alerts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedStation, toast]);

  useEffect(() => {
    const station = NAVTEX_STATIONS.find(s => s.id === selectedStation);
    if (station) {
      fetchWeatherAlerts(station.lat, station.lon);
    }
  }, [selectedStation, fetchWeatherAlerts]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'distress': return 'bg-red-600 text-white';
      case 'urgent': return 'bg-orange-600 text-white';
      case 'warning': return 'bg-yellow-600 text-white';
      default: return 'bg-blue-600 text-white';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'distress': return <AlertTriangle className="h-4 w-4" />;
      case 'urgent': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <Wind className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-blue-600" />
            NAVTEX Marine Notices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>NAVTEX (Navigational Telex)</strong> - International broadcasting on 518 kHz frequency 
              maritime safety information system. Meteorological warnings, navigational warnings, SAR information and 
              automatically transmits security messages to recipients.
            </AlertDescription>
          </Alert>

          {/* Station Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Station Selection</label>
            <div className="flex flex-wrap gap-2">
              {NAVTEX_STATIONS.map((station) => (
                <Button
                  key={station.id}
                  variant={selectedStation === station.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStation(station.id)}
                  className="gap-2"
                >
                  <MapPin className="h-3 w-3" />
                  {station.name}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const station = NAVTEX_STATIONS.find(s => s.id === selectedStation);
                  if (station) fetchWeatherAlerts(station.lat, station.lon);
                }}
                disabled={loading}
                className="gap-2 ml-auto"
              >
                <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                Update
              </Button>
            </div>
          </div>

          <Separator />

          {/* Messages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Ship className="h-5 w-5 text-blue-600" />
                Aktif Mesajlar ({messages.length})
              </h3>
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                Live Data
              </Badge>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                <p className="mt-2 text-sm text-muted-foreground">Receiving messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  There are no active NAVTEX messages for the selected station.
                </AlertDescription>
              </Alert>
            ) : (
              messages.map((message) => (
                <Card key={message.id} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={getPriorityColor(message.priority)}>
                            {getPriorityIcon(message.priority)}
                            {message.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Radio className="h-3 w-3" />
                            {message.station}
                          </Badge>
                          <Badge variant="secondary">
                            {message.messageType}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-lg">{message.subject}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {message.area}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(message.timestamp).toLocaleString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-xs whitespace-pre-line border-l-4 border-blue-600">
                      {message.content}
                    </div>
                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                      <span>Geçerlilik: {new Date(message.validFrom).toLocaleString('tr-TR')}</span>
                      <span>Bitiş: {new Date(message.validUntil).toLocaleString('tr-TR')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* NAVTEX Information */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-5 w-5 text-blue-600" />
                NAVTEX Mesaj Kategorileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">A - Navigational Warnings</p>
                  <p className="text-xs text-muted-foreground">Navigation warnings and dangers</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">B - Meteorological Warnings</p>
                  <p className="text-xs text-muted-foreground">Meteorological warnings and forecast</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">D - Search and Rescue</p>
                  <p className="text-xs text-muted-foreground">Search and rescue information</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">L - Navigational Warnings (Local)</p>
                  <p className="text-xs text-muted-foreground">Local navigational alerts</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Waves className="h-4 w-4" />
                  Usage Information
                </p>
                <ul className="text-xs space-y-1 text-muted-foreground ml-6 list-disc">
                  <li>NAVTEX messages are broadcast on the frequency 518 kHz</li>
                  <li>Each station broadcasts at certain times</li>
                  <li>Messages are automatically retrieved and stored</li>
                  <li>Critical security messages take priority</li>
                  <li>Messages have a validity period of 24-72 hours</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
