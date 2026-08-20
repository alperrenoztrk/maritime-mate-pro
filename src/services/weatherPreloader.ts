import {
  LAST_POSITION_MAX_AGE_MS,
  readCachedPosition,
  shouldRequestLocation,
  writeCachedPosition,
} from "@/lib/geolocationPermission";
type WeatherResponse = {
  latitude: number;
  longitude: number;
  timezone?: string;
  utc_offset_seconds?: number;
  current_units?: Record<string, string>;
  current?: {
    time?: string;
    temperature_2m?: number;
    relative_humidity_2m?: number;
    pressure_msl?: number;
    surface_pressure?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
    weather_code?: number;
    cloud_cover?: number;
  };
  daily?: {
    time?: string[];
    sunrise?: string[];
    sunset?: string[];
  };
};

type BigDataCloudReverse = {
  latitude?: number;
  longitude?: number;
  locality?: string;
  city?: string;
  principalSubdivision?: string;
  countryName?: string;
  localityInfo?: {
    informative?: Array<{
      name?: string;
      description?: string;
    }>;
  };
};

export type PreloadedWeatherData = {
  temperatureC: number;
  humidityPct: number;
  pressureHpa: number;
  windSpeedKt: number;
  windDirectionDeg: number;
  weatherCode: number;
  cloudCoverPct: number;
  timeIso?: string;
  latitude: number;
  longitude: number;
  timezoneId?: string;
  utcOffsetSeconds?: number;
  locationLabel?: string;
  isFallbackLocation: boolean;
  sunriseIso?: string;
  sunsetIso?: string;
};

type WeatherCoreData = Omit<PreloadedWeatherData, "locationLabel" | "isFallbackLocation">;

class WeatherPreloader {
  private static instance: WeatherPreloader;
  private preloadedData: PreloadedWeatherData | null = null;
  private preloadError: string | null = null;
  private isPreloading: boolean = false;
  private preloadPromise: Promise<PreloadedWeatherData | null> | null = null;

  static getInstance(): WeatherPreloader {
    if (!WeatherPreloader.instance) {
      WeatherPreloader.instance = new WeatherPreloader();
    }
    return WeatherPreloader.instance;
  }

  async preloadWeatherData(): Promise<PreloadedWeatherData | null> {
    if (this.preloadPromise) {
      return this.preloadPromise;
    }

    this.preloadPromise = this.doPreload();
    return this.preloadPromise;
  }

  // Default fallback coordinates (Istanbul)
  private readonly defaultCoords = { latitude: 41.0082, longitude: 28.9784 };

  private async doPreload(): Promise<PreloadedWeatherData | null> {
    if (this.isPreloading) return this.preloadedData;
    
    this.isPreloading = true;
    this.preloadError = null;
    
    console.log("🌤️ [Preloader] Receiving weather data during splash screen...");
    
    try {
      // Get current position with fallback
      let lat: number;
      let lon: number;
      let isFallbackLocation = false;
      
      try {
        // İzin reddedilmişse hiç sorma: kullanıcı her açılışta izin diyaloğu
        // görmesin (bkz. src/lib/geolocationPermission.ts).
        if (!(await shouldRequestLocation())) {
          throw new Error("Location permission not granted");
        }
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          console.log("📍 [Preloader] Konum servisi kontrol ediliyor...");
          if (!("geolocation" in navigator)) {
            console.warn("⚠️ [Preloader] Location service not supported, fallback will be used");
            reject(new Error("Konum servisi desteklenmiyor"));
            return;
          }
          
          console.log("📍 [Preloader] Konum bilgisi isteniyor (5s timeout)...");
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              console.log("✅ [Preloader] Location received:", pos.coords.latitude, pos.coords.longitude);
              resolve(pos);
            },
            (err) => {
              console.warn("⚠️ [Preloader] Failed to get location:", err.message);
              reject(err);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 } // 5s timeout, 5 min cache
          );
        });
        
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        writeCachedPosition({
          latitude: lat,
          longitude: lon,
          accuracyMeters: typeof position.coords.accuracy === "number" ? position.coords.accuracy : null,
        });
      } catch {
        const cached = readCachedPosition();
        if (cached && Date.now() - cached.timestamp < LAST_POSITION_MAX_AGE_MS) {
          console.log("📍 [Preloader] Using last known location");
          lat = cached.latitude;
          lon = cached.longitude;
        } else {
          // Use fallback coordinates if geolocation fails
          console.log("📍 [Preloader] Fallback coordinates are used (Istanbul)");
          lat = this.defaultCoords.latitude;
          lon = this.defaultCoords.longitude;
          isFallbackLocation = true;
        }
      }

      console.log("🌤️ [Preloader] Weather and location data are received in parallel...");
      
      // Fetch weather and location data in parallel
      const [weatherResult, locationResult] = await Promise.allSettled([
        this.fetchWeather(lat, lon),
        this.fetchLocationLabel(lat, lon)
      ]);

      let weatherData: WeatherCoreData | null = null;
      let locationLabel: string | null = null;

      if (weatherResult.status === 'fulfilled') {
        weatherData = weatherResult.value;
      } else {
        console.error("❌ [Preloader] Failed to get weather forecast:", weatherResult.reason);
      }

      if (locationResult.status === 'fulfilled') {
        locationLabel = locationResult.value;
      } else {
        console.warn("⚠️ [Preloader] Failed to get location tag:", locationResult.reason);
      }

      if (weatherData) {
        this.preloadedData = {
          ...weatherData,
          locationLabel: locationLabel || undefined,
          isFallbackLocation,
        };
        console.log("✅ [Preloader] Weather data preloaded successfully");
        return this.preloadedData;
      } else {
        throw new Error("Could not receive weather data");
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      console.error("❌ [Preloader] Weather preload error:", message);
      this.preloadError = message;
      return null;
    } finally {
      this.isPreloading = false;
    }
  }

  private async fetchWeather(lat: number, lon: number): Promise<WeatherCoreData> {
    const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
    weatherUrl.searchParams.set("latitude", String(lat));
    weatherUrl.searchParams.set("longitude", String(lon));
    weatherUrl.searchParams.set(
      "current",
      [
        "temperature_2m",
        "relative_humidity_2m",
        "pressure_msl",
        "wind_speed_10m",
        "wind_direction_10m",
        "weather_code",
          "cloud_cover",
      ].join(",")
    );
    weatherUrl.searchParams.set(
      "daily",
      [
        "sunrise",
        "sunset",
      ].join(",")
    );
    weatherUrl.searchParams.set("forecast_days", "1");
    weatherUrl.searchParams.set("wind_speed_unit", "kn");
    weatherUrl.searchParams.set("timezone", "auto");

    const res = await fetch(weatherUrl.toString());
    if (!res.ok) throw new Error(`Weather data could not be received (${res.status})`);
    const json = (await res.json()) as WeatherResponse;
    const cur = json.current ?? {};
    const sunriseIso = json.daily?.sunrise?.[0];
    const sunsetIso = json.daily?.sunset?.[0];
    
    return {
      temperatureC: cur.temperature_2m ?? NaN,
      humidityPct: cur.relative_humidity_2m ?? NaN,
      pressureHpa: (cur.pressure_msl ?? cur.surface_pressure ?? NaN),
      windSpeedKt: cur.wind_speed_10m ?? NaN,
      windDirectionDeg: cur.wind_direction_10m ?? NaN,
      weatherCode: cur.weather_code ?? -1,
      cloudCoverPct: cur.cloud_cover ?? NaN,
      timeIso: cur.time,
      // The API echoes its forecast grid-cell centre, not the requested
      // device position. Preserve the original coordinates for the widget.
      latitude: lat,
      longitude: lon,
      timezoneId: json.timezone,
      utcOffsetSeconds: json.utc_offset_seconds,
      sunriseIso,
      sunsetIso,
    };
  }

  private async fetchLocationLabel(lat: number, lon: number): Promise<string | null> {
    try {
      const reverseUrl = new URL("https://api.bigdatacloud.net/data/reverse-geocode-client");
      reverseUrl.searchParams.set("latitude", String(lat));
      reverseUrl.searchParams.set("longitude", String(lon));
      reverseUrl.searchParams.set("localityLanguage", "tr");
      const res = await fetch(reverseUrl.toString());
      if (!res.ok) return null;
      const reverseJson = (await res.json()) as BigDataCloudReverse;
      
      // Get city/location info - prioritize more specific info
      let cityLikeName: string | undefined;
      if (reverseJson.city && reverseJson.locality && reverseJson.city !== reverseJson.locality) {
        cityLikeName = `${reverseJson.locality}, ${reverseJson.city}`;
      } else {
        cityLikeName = reverseJson.city || reverseJson.locality || reverseJson.principalSubdivision || reverseJson.countryName;
      }

      // Only fall back to a sea/ocean name when there is no real land address.
      // BigDataCloud's "informative" list includes the neighbouring sea/ocean of
      // a coastal city (e.g. Manhattan → "Atlantic Ocean"), so using it whenever
      // present mislabels on-land positions.
      let seaLikeName: string | undefined;
      if (!cityLikeName) {
        const informative = reverseJson?.localityInfo?.informative || [];
        const waterKeywords = ["sea", "ocean", "gulf", "bay", "strait", "channel", "sound", "deniz", "okyanus", "gulf"];
        for (const keyword of waterKeywords) {
          const match = informative.find((x) => {
            const desc = (x.description || "").toLowerCase();
            const name = (x.name || "").toLowerCase();
            return desc.includes(keyword) || name.includes(keyword);
          });
          if (match?.name) {
            seaLikeName = match.name;
            break;
          }
        }
      }

      return cityLikeName || seaLikeName || null;
    } catch {
      return null;
    }
  }

  getPreloadedData(): PreloadedWeatherData | null {
    return this.preloadedData;
  }

  getPreloadError(): string | null {
    return this.preloadError;
  }

  isPreloadComplete(): boolean {
    return !this.isPreloading && (this.preloadedData !== null || this.preloadError !== null);
  }

  clearPreloadedData(): void {
    this.preloadedData = null;
    this.preloadError = null;
    this.preloadPromise = null;
  }
}

export const weatherPreloader = WeatherPreloader.getInstance();
