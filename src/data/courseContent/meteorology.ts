import { CloudSun } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Meteoroloji — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür. Tüm formüller
 * mevcut Meteoroloji Formülleri sayfasından ve WeatherCalculations bileşeninden
 * birebir alınmıştır (uydurma yok).
 */
export const meteorology: CourseTopic = {
  key: "meteorology",
  title: "Meteoroloji",
  icon: CloudSun,
  accent: "from-sky-500 via-cyan-500 to-blue-500",
  group: "deck",
  intro:
    "Rüzgâr, dalga, atmosfer ve deniz durumu denklemleri. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "true-wind-speed",
      name: "Gerçek Rüzgâr Hızı",
      group: "Rüzgâr",
      formula: "|Vt| = √(Va² + Vg² + 2·Va·Vg·cos θ)",
      variables: [
        { symbol: "Va", label: "Görünür (apparent) rüzgâr hızı", unit: "kn" },
        { symbol: "Vg", label: "Gemi hızı", unit: "kn" },
        { symbol: "θ", label: "Va vektörü ile gemi hız vektörü arası açı", unit: "°" },
      ],
      source: { code: "Gerçek/görünür rüzgâr vektör bağıntısı" },
      note: "Tanımlar vektöreldir. En güvenlisi V⃗t = V⃗a + V⃗g vektör bağıntısını kullanmaktır.",
      inputs: [
        { key: "va", label: "Görünür Rüzgâr (Va)", unit: "kn", placeholder: "20" },
        { key: "vg", label: "Gemi Hızı (Vg)", unit: "kn", placeholder: "12" },
        { key: "theta", label: "Açı (θ)", unit: "°", placeholder: "60" },
      ],
      calculate: (v) => {
        const rad = (v.theta * Math.PI) / 180;
        const vt = Math.sqrt(v.va * v.va + v.vg * v.vg + 2 * v.va * v.vg * Math.cos(rad));
        return [{ label: "Gerçek Rüzgâr Hızı (|Vt|)", value: `${vt.toFixed(2)} kn` }];
      },
    },
    {
      id: "beaufort-wind-speed",
      name: "Beaufort Rüzgâr Hızı",
      group: "Rüzgâr",
      formula: "V = 0.836 · B^1.5",
      variables: [
        { symbol: "V", label: "Rüzgâr hızı", unit: "m/s" },
        { symbol: "B", label: "Beaufort sayısı (0-12)" },
      ],
      source: { code: "Beaufort ölçeği", detail: "Yaklaşık rüzgâr hızı bağıntısı" },
      note: "Yaklaşık formül. Beaufort 8 (Gale) ≈ 34-40 knot.",
      inputs: [
        { key: "b", label: "Beaufort Sayısı (B)", unit: "", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.b < 0) return [{ label: "Hata", value: "Beaufort sayısı negatif olamaz" }];
        const ms = 0.836 * Math.pow(v.b, 1.5);
        return [
          { label: "Rüzgâr Hızı (V)", value: `${ms.toFixed(2)} m/s` },
          { label: "Rüzgâr Hızı", value: `${(ms * 1.94384).toFixed(1)} kn` },
        ];
      },
    },
    {
      id: "air-density",
      name: "Hava Yoğunluğu",
      group: "Atmosfer",
      formula: "ρ = P / (R · T)",
      variables: [
        { symbol: "ρ", label: "Hava yoğunluğu", unit: "kg/m³" },
        { symbol: "P", label: "Atmosfer basıncı", unit: "Pa" },
        { symbol: "R", label: "Özgül gaz sabiti", unit: "287 J/kg·K" },
        { symbol: "T", label: "Mutlak sıcaklık", unit: "K" },
      ],
      source: { code: "İdeal gaz hal denklemi (nemsiz hava)" },
      note: "Basınç hPa girilir, hesapta Pa'ya çevrilir (×100). Sıcaklık °C girilir, K'ye çevrilir. Standart koşullarda (15°C, 1013,25 hPa) ρ ≈ 1,225 kg/m³.",
      inputs: [
        { key: "p", label: "Basınç (P)", unit: "hPa", placeholder: "1013.25" },
        { key: "t", label: "Sıcaklık (T)", unit: "°C", placeholder: "15" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Hata", value: "Sıcaklık mutlak sıfırın üstünde olmalı" }];
        const rho = (v.p * 100) / (287 * tK);
        return [{ label: "Hava Yoğunluğu (ρ)", value: `${rho.toFixed(3)} kg/m³` }];
      },
    },
    {
      id: "sea-level-pressure",
      name: "Deniz Seviyesine İndirgenmiş Basınç",
      group: "Atmosfer",
      formula: "P₀ = P · e^( (g·h) / (R·T̄) )",
      variables: [
        { symbol: "P₀", label: "Deniz seviyesi basıncı", unit: "hPa" },
        { symbol: "P", label: "Ölçülen basınç", unit: "hPa" },
        { symbol: "g", label: "Yerçekimi ivmesi", unit: "9,81 m/s²" },
        { symbol: "h", label: "Yükseklik", unit: "m" },
        { symbol: "R", label: "Özgül gaz sabiti", unit: "287 J/kg·K" },
        { symbol: "T̄", label: "Ortalama sıcaklık", unit: "K" },
      ],
      source: { code: "Barometrik yükseklik düzeltmesi" },
      note: "Sıcaklık °C girilir, K'ye çevrilir. Yaklaşık: her 8 m yükseklik için 1 hPa düşüş.",
      inputs: [
        { key: "p", label: "Ölçülen Basınç (P)", unit: "hPa", placeholder: "1010" },
        { key: "h", label: "Yükseklik (h)", unit: "m", placeholder: "25" },
        { key: "t", label: "Ortalama Sıcaklık (T̄)", unit: "°C", placeholder: "15" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Hata", value: "Sıcaklık mutlak sıfırın üstünde olmalı" }];
        const p0 = v.p * Math.exp((9.81 * v.h) / (287 * tK));
        return [{ label: "Deniz Seviyesi Basıncı (P₀)", value: `${p0.toFixed(1)} hPa` }];
      },
    },
    {
      id: "dew-point",
      name: "Çiğ Noktası Sıcaklığı",
      group: "Nem",
      formula: "Td ≈ T − ((100 − RH) / 5)",
      variables: [
        { symbol: "Td", label: "Çiğ noktası sıcaklığı", unit: "°C" },
        { symbol: "T", label: "Hava sıcaklığı", unit: "°C" },
        { symbol: "RH", label: "Bağıl nem", unit: "%" },
      ],
      source: { code: "Çiğ noktası basit yaklaşım bağıntısı" },
      note: "Basit yaklaşım formülü. Sis riski: T − Td < 2,5 °C.",
      inputs: [
        { key: "t", label: "Hava Sıcaklığı (T)", unit: "°C", placeholder: "20" },
        { key: "rh", label: "Bağıl Nem (RH)", unit: "%", placeholder: "80" },
      ],
      calculate: (v) => {
        const td = v.t - (100 - v.rh) / 5;
        const spread = v.t - td;
        const durum = spread < 2.5 ? "Sis riski (T − Td < 2,5 °C)" : "Düşük sis riski";
        return [
          { label: "Çiğ Noktası (Td)", value: `${td.toFixed(1)} °C` },
          { label: "Sıcaklık-Çiğ Farkı", value: `${spread.toFixed(1)} °C` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "deep-water-wavelength",
      name: "Derin Su Dalgaboyu",
      group: "Dalga",
      formula: "L = (g · T²) / (2π)",
      variables: [
        { symbol: "L", label: "Dalgaboyu", unit: "m" },
        { symbol: "g", label: "Yerçekimi ivmesi", unit: "9,81 m/s²" },
        { symbol: "T", label: "Dalga periyodu", unit: "s" },
      ],
      source: { code: "Derin su dalga teorisi" },
      note: "Derin su koşulu: derinlik > L/2.",
      inputs: [
        { key: "t", label: "Dalga Periyodu (T)", unit: "s", placeholder: "8" },
      ],
      calculate: (v) => {
        const l = (9.81 * v.t * v.t) / (2 * Math.PI);
        return [{ label: "Dalgaboyu (L)", value: `${l.toFixed(2)} m` }];
      },
    },
    {
      id: "deep-water-wave-speed",
      name: "Dalga Hızı (Derin Su)",
      group: "Dalga",
      formula: "C = L / T = (g · T) / (2π) ≈ 1.56 · T",
      variables: [
        { symbol: "C", label: "Dalga hızı", unit: "m/s" },
        { symbol: "L", label: "Dalgaboyu", unit: "m" },
        { symbol: "T", label: "Dalga periyodu", unit: "s" },
      ],
      source: { code: "Derin su dalga teorisi (faz hızı)" },
      note: "Knot cinsinden: C (kn) ≈ 3,03 · T.",
      inputs: [
        { key: "t", label: "Dalga Periyodu (T)", unit: "s", placeholder: "8" },
      ],
      calculate: (v) => {
        const c = (9.81 * v.t) / (2 * Math.PI);
        return [
          { label: "Dalga Hızı (C)", value: `${c.toFixed(2)} m/s` },
          { label: "Dalga Hızı", value: `${(c * 1.94384).toFixed(2)} kn` },
        ];
      },
    },
    {
      id: "relative-wind-vector",
      name: "Bağıl (Görünür) Rüzgâr Vektörü",
      group: "Rüzgâr",
      formula: "Rx = Wx − Sx ; Ry = Wy − Sy ; Vbağıl = √(Rx² + Ry²)",
      variables: [
        { symbol: "Wx, Wy", label: "Gerçek rüzgâr vektör bileşenleri", unit: "kn" },
        { symbol: "Sx, Sy", label: "Gemi hız vektör bileşenleri", unit: "kn" },
        { symbol: "Vbağıl", label: "Bağıl rüzgâr hızı", unit: "kn" },
      ],
      source: { code: "Bağıl rüzgâr vektör bağıntısı (WeatherCalculations)" },
      note: "Yönler kuzeyden saat yönünde derece; Wx = V·sin(yön), Wy = V·cos(yön). Bağıl yön = atan2(Rx, Ry).",
      inputs: [
        { key: "windSpeed", label: "Gerçek Rüzgâr Hızı", unit: "kn", placeholder: "25" },
        { key: "windDir", label: "Rüzgâr Yönü", unit: "°", placeholder: "270" },
        { key: "shipSpeed", label: "Gemi Hızı", unit: "kn", placeholder: "12" },
        { key: "shipHeading", label: "Gemi Başı", unit: "°", placeholder: "45" },
      ],
      calculate: (v) => {
        const wRad = (v.windDir * Math.PI) / 180;
        const sRad = (v.shipHeading * Math.PI) / 180;
        const wx = v.windSpeed * Math.sin(wRad);
        const wy = v.windSpeed * Math.cos(wRad);
        const sx = v.shipSpeed * Math.sin(sRad);
        const sy = v.shipSpeed * Math.cos(sRad);
        const rx = wx - sx;
        const ry = wy - sy;
        const speed = Math.sqrt(rx * rx + ry * ry);
        let dir = (Math.atan2(rx, ry) * 180) / Math.PI;
        if (dir < 0) dir += 360;
        return [
          { label: "Bağıl Rüzgâr Hızı", value: `${speed.toFixed(1)} kn` },
          { label: "Bağıl Rüzgâr Yönü", value: `${dir.toFixed(0)} °` },
        ];
      },
    },
    {
      id: "wind-force-on-ship",
      name: "Gemi Üzerine Rüzgâr Kuvveti",
      group: "Rüzgâr",
      formula: "F = 0.5 · ρ · V² · A · Cd",
      variables: [
        { symbol: "F", label: "Rüzgâr kuvveti", unit: "N" },
        { symbol: "ρ", label: "Hava yoğunluğu", unit: "kg/m³" },
        { symbol: "V", label: "Bağıl rüzgâr hızı", unit: "m/s" },
        { symbol: "A", label: "Yan rüzgâr alanı (boy × freeboard)", unit: "m²" },
        { symbol: "Cd", label: "Sürükleme katsayısı (tipik 0,8)" },
      ],
      source: { code: "Aerodinamik sürükleme (WeatherCalculations)" },
      note: "Rüzgâr hızı knot girilir, hesapta m/s'ye çevrilir (×0,5144). A = boy × freeboard.",
      inputs: [
        { key: "rho", label: "Hava Yoğunluğu (ρ)", unit: "kg/m³", placeholder: "1.225" },
        { key: "vkn", label: "Bağıl Rüzgâr Hızı (V)", unit: "kn", placeholder: "25" },
        { key: "length", label: "Gemi Boyu", unit: "m", placeholder: "180" },
        { key: "freeboard", label: "Freeboard", unit: "m", placeholder: "12" },
        { key: "cd", label: "Sürükleme Katsayısı (Cd)", unit: "", placeholder: "0.8" },
      ],
      calculate: (v) => {
        const vms = v.vkn * 0.5144;
        const area = v.length * v.freeboard;
        const force = 0.5 * v.rho * vms * vms * area * v.cd;
        return [
          { label: "Rüzgâr Kuvveti (F)", value: `${force.toFixed(0)} N` },
          { label: "Rüzgâr Kuvveti", value: `${(force / 1000).toFixed(1)} kN` },
        ];
      },
    },
    {
      id: "speed-over-ground",
      name: "Akıntı ile Yer Üstü Hız (SOG)",
      group: "Akıntı",
      formula: "Rx = Sx + Cx ; Ry = Sy + Cy ; SOG = √(Rx² + Ry²)",
      variables: [
        { symbol: "Sx, Sy", label: "Gemi hız bileşenleri", unit: "kn" },
        { symbol: "Cx, Cy", label: "Akıntı hız bileşenleri", unit: "kn" },
        { symbol: "SOG", label: "Yer üstü hız", unit: "kn" },
      ],
      source: { code: "Gemi + akıntı vektör toplamı (WeatherCalculations)" },
      note: "Gerçek iz (COG) = atan2(Rx, Ry). Yönler kuzeyden saat yönünde.",
      inputs: [
        { key: "shipSpeed", label: "Gemi Hızı", unit: "kn", placeholder: "12" },
        { key: "shipHeading", label: "Gemi Başı", unit: "°", placeholder: "45" },
        { key: "currentSpeed", label: "Akıntı Hızı", unit: "kn", placeholder: "1.5" },
        { key: "currentDir", label: "Akıntı Yönü", unit: "°", placeholder: "180" },
      ],
      calculate: (v) => {
        const sRad = (v.shipHeading * Math.PI) / 180;
        const cRad = (v.currentDir * Math.PI) / 180;
        const sx = v.shipSpeed * Math.sin(sRad);
        const sy = v.shipSpeed * Math.cos(sRad);
        const cx = v.currentSpeed * Math.sin(cRad);
        const cy = v.currentSpeed * Math.cos(cRad);
        const rx = sx + cx;
        const ry = sy + cy;
        const sog = Math.sqrt(rx * rx + ry * ry);
        let cog = (Math.atan2(rx, ry) * 180) / Math.PI;
        if (cog < 0) cog += 360;
        return [
          { label: "Yer Üstü Hız (SOG)", value: `${sog.toFixed(1)} kn` },
          { label: "Gerçek İz (COG)", value: `${cog.toFixed(0)} °` },
        ];
      },
    },
    {
      id: "beaufort-scale",
      name: "Beaufort Ölçeği (Hızdan Sınıf)",
      group: "Deniz Durumu",
      formula: "Beaufort = f(rüzgâr hızı) — aralık tablosu",
      variables: [
        { symbol: "V", label: "Rüzgâr hızı", unit: "kn" },
        { symbol: "B", label: "Beaufort sayısı (0-12)" },
      ],
      source: { code: "Beaufort ölçeği", detail: "Rüzgâr hızı sınıflandırma tablosu" },
      note: "Rüzgâr hızı (knot) Beaufort kuvvet kademesine eşlenir (WeatherCalculations tablosu).",
      inputs: [
        { key: "windSpeed", label: "Rüzgâr Hızı", unit: "kn", placeholder: "25" },
      ],
      calculate: (v) => {
        const s = v.windSpeed;
        let scale: number;
        let desc: string;
        if (s < 1) { scale = 0; desc = "Calm"; }
        else if (s <= 3) { scale = 1; desc = "Light air"; }
        else if (s <= 7) { scale = 2; desc = "Light breeze"; }
        else if (s <= 12) { scale = 3; desc = "Gentle breeze"; }
        else if (s <= 18) { scale = 4; desc = "Moderate breeze"; }
        else if (s <= 24) { scale = 5; desc = "Fresh breeze"; }
        else if (s <= 31) { scale = 6; desc = "Strong breeze"; }
        else if (s <= 38) { scale = 7; desc = "Near gale"; }
        else if (s <= 46) { scale = 8; desc = "Gale"; }
        else if (s <= 54) { scale = 9; desc = "Strong gale"; }
        else if (s <= 63) { scale = 10; desc = "Storm"; }
        else if (s <= 72) { scale = 11; desc = "Violent storm"; }
        else { scale = 12; desc = "Hurricane"; }
        return [
          { label: "Beaufort", value: `${scale}` },
          { label: "Açıklama", value: desc },
        ];
      },
    },
    {
      id: "douglas-sea-scale",
      name: "Douglas Deniz Ölçeği (Dalgadan Sınıf)",
      group: "Deniz Durumu",
      formula: "Douglas = f(anlamlı dalga yüksekliği) — aralık tablosu",
      variables: [
        { symbol: "Hs", label: "Anlamlı dalga yüksekliği", unit: "m" },
        { symbol: "D", label: "Douglas deniz sayısı (0-9)" },
      ],
      source: { code: "Douglas deniz ölçeği", detail: "Dalga yüksekliği sınıflandırma tablosu" },
      note: "Anlamlı dalga yüksekliği (m) Douglas deniz kademesine eşlenir (WeatherCalculations tablosu).",
      inputs: [
        { key: "waveHeight", label: "Dalga Yüksekliği (Hs)", unit: "m", placeholder: "3.5" },
      ],
      calculate: (v) => {
        const h = v.waveHeight;
        let scale: number;
        let desc: string;
        if (h < 0.1) { scale = 0; desc = "Calm (glassy)"; }
        else if (h <= 0.5) { scale = 1; desc = "Calm (rippled)"; }
        else if (h <= 1.25) { scale = 2; desc = "Smooth (wavelets)"; }
        else if (h <= 2.5) { scale = 3; desc = "Slight"; }
        else if (h <= 4) { scale = 4; desc = "Moderate"; }
        else if (h <= 6) { scale = 5; desc = "Rough"; }
        else if (h <= 9) { scale = 6; desc = "Very rough"; }
        else if (h <= 14) { scale = 7; desc = "High"; }
        else if (h <= 20) { scale = 8; desc = "Very high"; }
        else { scale = 9; desc = "Phenomenal"; }
        return [
          { label: "Douglas", value: `${scale}` },
          { label: "Açıklama", value: desc },
        ];
      },
    },
    {
      id: "geostrophic-wind",
      name: "Geostrofik Rüzgâr",
      group: "Rüzgâr",
      formula: "Vg = (1 / (ρ·f)) · (ΔP / Δn) ,  f = 2Ω·sin φ",
      variables: [
        { symbol: "Vg", label: "Geostrofik rüzgâr hızı", unit: "m/s" },
        { symbol: "ρ", label: "Hava yoğunluğu", unit: "kg/m³" },
        { symbol: "f", label: "Coriolis parametresi", unit: "1/s" },
        { symbol: "ΔP/Δn", label: "Yatay basınç gradyanı", unit: "Pa/m" },
        { symbol: "φ", label: "Enlem", unit: "°" },
      ],
      source: { code: "Dinamik meteoroloji — geostrofik denge" },
      note: "Ω = 7,292×10⁻⁵ rad/s. Basınç gradyanı hPa/100km girilir, hesapta Pa/m'ye çevrilir (1 hPa/100km = 10⁻³ Pa/m). Ekvatorda (φ=0) geçersizdir.",
      inputs: [
        { key: "rho", label: "Hava Yoğunluğu (ρ)", unit: "kg/m³", placeholder: "1.225" },
        { key: "grad", label: "Basınç Gradyanı", unit: "hPa/100km", placeholder: "3" },
        { key: "lat", label: "Enlem (φ)", unit: "°", placeholder: "45" },
      ],
      calculate: (v) => {
        const phi = Math.abs(v.lat);
        if (phi < 1) return [{ label: "Hata", value: "Ekvator yakınında geostrofik denge geçersiz (φ ≥ 1°)" }];
        if (v.rho <= 0) return [{ label: "Hata", value: "Yoğunluk pozitif olmalı" }];
        const f = 2 * 7.292e-5 * Math.sin((phi * Math.PI) / 180);
        const gradPaPerM = v.grad * 1e-3; // hPa/100km → Pa/m
        const vg = gradPaPerM / (v.rho * f);
        return [
          { label: "Coriolis Parametresi (f)", value: `${f.toExponential(3)} 1/s` },
          { label: "Geostrofik Rüzgâr (Vg)", value: `${vg.toFixed(1)} m/s` },
          { label: "Geostrofik Rüzgâr", value: `${(vg * 1.94384).toFixed(1)} kn` },
        ];
      },
    },
    {
      id: "relative-humidity",
      name: "Bağıl Nem (Çiy Noktasından)",
      group: "Atmosfer",
      formula: "RH = 100 · e(Td) / e(T) ,  e(T) = 6.112·exp(17.62·T/(243.12+T))",
      variables: [
        { symbol: "RH", label: "Bağıl nem", unit: "%" },
        { symbol: "T", label: "Hava sıcaklığı (kuru termometre)", unit: "°C" },
        { symbol: "Td", label: "Çiy noktası sıcaklığı", unit: "°C" },
        { symbol: "e", label: "Buhar basıncı", unit: "hPa" },
      ],
      source: { code: "Magnus-Tetens doyma buhar basıncı bağıntısı (WMO)" },
      note: "RH, çiy noktasındaki doyma buhar basıncının hava sıcaklığındaki doyma buhar basıncına oranıdır. Td ≤ T olmalıdır.",
      inputs: [
        { key: "t", label: "Hava Sıcaklığı (T)", unit: "°C", placeholder: "25" },
        { key: "td", label: "Çiy Noktası (Td)", unit: "°C", placeholder: "15" },
      ],
      calculate: (v) => {
        if (v.td > v.t) return [{ label: "Hata", value: "Çiy noktası hava sıcaklığından büyük olamaz" }];
        const es = (t: number) => 6.112 * Math.exp((17.62 * t) / (243.12 + t));
        const rh = (es(v.td) / es(v.t)) * 100;
        return [{ label: "Bağıl Nem (RH)", value: `${rh.toFixed(1)} %` }];
      },
    },
  ],
};
