import { Compass } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Seyir — tek kaynak ders içeriği.
 * Formüller, mevcut "Seyir Formülleri" sayfasında (NavigationFormulas.tsx)
 * gösterilen GERÇEK bağıntılardan birebir alınmıştır. `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür ve formül metni
 * ile daima aynı matematiği uygular.
 */
export const navigation: CourseTopic = {
  key: "navigation",
  title: "Seyir",
  icon: Compass,
  accent: "from-indigo-500 via-purple-500 to-blue-500",
  group: "deck",
  intro:
    "Mesafe-hız-zaman, rota seyirleri (plane/Mercator/büyük daire), akıntı " +
    "üçgeni, pusula dönüşümleri ve göksel seyir temelleri. Her formülün altında " +
    "onu aynı bağıntıyla hesaplayan araç yer alır.",
  advancedTool: { label: "Gelişmiş Seyir Araçları", href: "/navigation" },
  entries: [
    // ---- Temel Seyir ----
    {
      id: "speed-time-distance",
      name: "Hız – Mesafe – Zaman",
      group: "Temel Seyir",
      formula: "Hız = Mesafe / Zaman",
      variables: [
        { symbol: "Mesafe", label: "Kat edilen mesafe", unit: "nm" },
        { symbol: "Zaman", label: "Geçen süre", unit: "sa" },
        { symbol: "Hız", label: "Sürat", unit: "knot" },
      ],
      source: { code: "Temel seyir — hız–mesafe–zaman bağıntısı" },
      inputs: [
        { key: "distance", label: "Mesafe", unit: "nm", placeholder: "120" },
        { key: "time", label: "Zaman", unit: "sa", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.time <= 0) return [{ label: "Hata", value: "Zaman pozitif olmalı" }];
        const speed = v.distance / v.time;
        return [{ label: "Hız", value: `${speed.toFixed(2)} knot` }];
      },
    },
    {
      id: "speed-conversion",
      name: "Hız Dönüşümleri",
      group: "Temel Seyir",
      formula: "1 knot = 1 nm/sa = 1.852 km/sa = 0.5144 m/s",
      variables: [{ symbol: "V", label: "Sürat", unit: "knot" }],
      source: { code: "Standart birim dönüşümleri" },
      inputs: [{ key: "knots", label: "Sürat", unit: "knot", placeholder: "15" }],
      calculate: (v) => [
        { label: "km/sa", value: `${(v.knots * 1.852).toFixed(2)} km/sa` },
        { label: "m/s", value: `${(v.knots * 0.5144).toFixed(3)} m/s` },
      ],
    },
    {
      id: "eta",
      name: "Tahmini Varış Zamanı (ETA)",
      group: "Temel Seyir",
      formula: "ETA = ETD + (Mesafe / Hız)",
      variables: [
        { symbol: "ETD", label: "Kalkış saati (saat cinsi)", unit: "sa" },
        { symbol: "Mesafe", label: "Mesafe", unit: "nm" },
        { symbol: "Hız", label: "Sürat", unit: "knot" },
      ],
      source: { code: "Temel seyir — ETA/ETD" },
      note: "ETD ondalık saat girilir (örn. 14:30 = 14.5). Sonuç ondalık saat ve seyir süresi olarak verilir.",
      inputs: [
        { key: "etd", label: "Kalkış Saati (ETD)", unit: "sa", placeholder: "8" },
        { key: "distance", label: "Mesafe", unit: "nm", placeholder: "240" },
        { key: "speed", label: "Hız", unit: "knot", placeholder: "12" },
      ],
      calculate: (v) => {
        if (v.speed <= 0) return [{ label: "Hata", value: "Hız pozitif olmalı" }];
        const sailing = v.distance / v.speed;
        const eta = (v.etd + sailing) % 24;
        return [
          { label: "Seyir Süresi", value: `${sailing.toFixed(2)} sa` },
          { label: "ETA", value: `${eta.toFixed(2)} sa (24 sa formatı)` },
        ];
      },
    },
    // ---- Enlem-Boylam ve Mesafe ----
    {
      id: "dlat-dlong",
      name: "D.Lat ve D.Long (Dakika)",
      group: "Enlem-Boylam ve Mesafe",
      formula: "D.Lat = 60·Δφ ;  D.Long = 60·Δλ·cosφ̄",
      variables: [
        { symbol: "Δφ", label: "Enlem farkı", unit: "°" },
        { symbol: "Δλ", label: "Boylam farkı", unit: "°" },
        { symbol: "φ̄", label: "Orta enlem", unit: "°" },
      ],
      source: { code: "Plane sailing — D.Lat/Departure", detail: "1° = 60 NM" },
      note: "Departure (D.Long) için 1° = 60 NM ilişkisi cosφ̄ ile düzeltilir.",
      inputs: [
        { key: "dphi", label: "Enlem Farkı (Δφ)", unit: "°", placeholder: "2.5" },
        { key: "dlambda", label: "Boylam Farkı (Δλ)", unit: "°", placeholder: "3.0" },
        { key: "meanlat", label: "Orta Enlem (φ̄)", unit: "°", placeholder: "40" },
      ],
      calculate: (v) => {
        const dlat = 60 * v.dphi;
        const dep = 60 * v.dlambda * Math.cos((v.meanlat * Math.PI) / 180);
        return [
          { label: "D.Lat", value: `${dlat.toFixed(1)} nm` },
          { label: "Departure (D.Long)", value: `${dep.toFixed(1)} nm` },
        ];
      },
    },
    {
      id: "plane-sailing",
      name: "Plane Sailing (Rota ve Mesafe)",
      group: "Enlem-Boylam ve Mesafe",
      formula: "Kurs = atan2(Dep, dLat) ;  Mesafe = √(dLat² + Dep²)",
      variables: [
        { symbol: "dLat", label: "Enlem farkı mesafesi (60·Δφ)", unit: "nm" },
        { symbol: "Dep", label: "Departure (60·Δλ·cosφ̄)", unit: "nm" },
      ],
      source: { code: "Plane sailing" },
      note: "Kurs 0–360° aralığına normalize edilir.",
      inputs: [
        { key: "dlat", label: "D.Lat", unit: "nm", placeholder: "150" },
        { key: "dep", label: "Departure", unit: "nm", placeholder: "138" },
      ],
      calculate: (v) => {
        const dist = Math.sqrt(v.dlat * v.dlat + v.dep * v.dep);
        let course = (Math.atan2(v.dep, v.dlat) * 180) / Math.PI;
        if (course < 0) course += 360;
        return [
          { label: "Kurs", value: `${course.toFixed(1)} °` },
          { label: "Mesafe", value: `${dist.toFixed(1)} nm` },
        ];
      },
    },
    {
      id: "great-circle-distance",
      name: "Büyük Daire Mesafesi",
      group: "Enlem-Boylam ve Mesafe",
      formula:
        "d = 2R·arcsin(√(sin²(Δφ/2) + cosφ₁·cosφ₂·sin²(Δλ/2)))",
      variables: [
        { symbol: "φ₁, φ₂", label: "Başlangıç/varış enlemleri", unit: "°" },
        { symbol: "Δφ, Δλ", label: "Enlem/boylam farkları", unit: "°" },
        { symbol: "R", label: "Dünya yarıçapı", unit: "≈3440.065 nm" },
      ],
      source: { code: "Büyük daire seyri (haversine)" },
      note: "Doğu boylamları (+), batı boylamları (−) girilir. R = 3440.065 nm.",
      inputs: [
        { key: "lat1", label: "Başlangıç Enlemi (φ₁)", unit: "°", placeholder: "25" },
        { key: "lon1", label: "Başlangıç Boylamı (λ₁)", unit: "°", placeholder: "-40" },
        { key: "lat2", label: "Varış Enlemi (φ₂)", unit: "°", placeholder: "45" },
        { key: "lon2", label: "Varış Boylamı (λ₂)", unit: "°", placeholder: "10" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const R = 3440.065;
        const dphi = rad(v.lat2 - v.lat1);
        const dlam = rad(v.lon2 - v.lon1);
        const a =
          Math.sin(dphi / 2) ** 2 +
          Math.cos(rad(v.lat1)) * Math.cos(rad(v.lat2)) * Math.sin(dlam / 2) ** 2;
        const d = 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
        return [{ label: "Büyük Daire Mesafesi", value: `${d.toFixed(1)} nm` }];
      },
    },
    {
      id: "great-circle-initial-course",
      name: "Büyük Daire İlk Kurs",
      group: "Enlem-Boylam ve Mesafe",
      formula:
        "θ₀ = atan2(sinΔλ·cosφ₂, cosφ₁·sinφ₂ − sinφ₁·cosφ₂·cosΔλ)",
      variables: [
        { symbol: "φ₁, φ₂", label: "Başlangıç/varış enlemleri", unit: "°" },
        { symbol: "Δλ", label: "Boylam farkı", unit: "°" },
      ],
      source: { code: "Büyük daire seyri — başlangıç kursu" },
      note: "Doğu (+), batı (−). Sonuç 0–360° normalize edilir.",
      inputs: [
        { key: "lat1", label: "Başlangıç Enlemi (φ₁)", unit: "°", placeholder: "25" },
        { key: "lon1", label: "Başlangıç Boylamı (λ₁)", unit: "°", placeholder: "-40" },
        { key: "lat2", label: "Varış Enlemi (φ₂)", unit: "°", placeholder: "45" },
        { key: "lon2", label: "Varış Boylamı (λ₂)", unit: "°", placeholder: "10" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const dlam = rad(v.lon2 - v.lon1);
        const y = Math.sin(dlam) * Math.cos(rad(v.lat2));
        const x =
          Math.cos(rad(v.lat1)) * Math.sin(rad(v.lat2)) -
          Math.sin(rad(v.lat1)) * Math.cos(rad(v.lat2)) * Math.cos(dlam);
        let course = (Math.atan2(y, x) * 180) / Math.PI;
        if (course < 0) course += 360;
        return [{ label: "İlk Kurs (θ₀)", value: `${course.toFixed(1)} °` }];
      },
    },
    {
      id: "rhumb-line",
      name: "Rhumb Line (Mercator) Mesafe",
      group: "Enlem-Boylam ve Mesafe",
      formula: "d = 60·√((Δφ)² + (q·Δλ)²)",
      variables: [
        { symbol: "Δφ, Δλ", label: "Enlem/boylam farkı", unit: "°" },
        {
          symbol: "q",
          label: "Genişletilmiş enlem oranı = Δφ / ln(tan(π/4+φ₂/2)/tan(π/4+φ₁/2))",
        },
      ],
      source: { code: "Mercator seyri (rhumb line)" },
      note: "Δφ → 0 olduğunda q = cosφ̄ yaklaşımı kullanılır. Doğu (+), batı (−).",
      inputs: [
        { key: "lat1", label: "Başlangıç Enlemi (φ₁)", unit: "°", placeholder: "36" },
        { key: "lon1", label: "Başlangıç Boylamı (λ₁)", unit: "°", placeholder: "-5" },
        { key: "lat2", label: "Varış Enlemi (φ₂)", unit: "°", placeholder: "40" },
        { key: "lon2", label: "Varış Boylamı (λ₂)", unit: "°", placeholder: "14" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const dphiDeg = v.lat2 - v.lat1;
        const dlamDeg = v.lon2 - v.lon1;
        const phi1 = rad(v.lat1);
        const phi2 = rad(v.lat2);
        const dphi = rad(dphiDeg);
        const dpsi = Math.log(
          Math.tan(Math.PI / 4 + phi2 / 2) / Math.tan(Math.PI / 4 + phi1 / 2)
        );
        const q = Math.abs(dphi) > 1e-9 ? dphi / dpsi : Math.cos((phi1 + phi2) / 2);
        const d = 60 * Math.sqrt(dphiDeg * dphiDeg + (q * dlamDeg) ** 2);
        let brg = (Math.atan2(rad(dlamDeg), dpsi || 1e-9) * 180) / Math.PI;
        if (brg < 0) brg += 360;
        return [
          { label: "Rhumb Line Mesafe", value: `${d.toFixed(1)} nm` },
          { label: "Kurs (Brg)", value: `${brg.toFixed(1)} °` },
        ];
      },
    },
    {
      id: "horizon-range",
      name: "Coğrafi Görüş Mesafesi (Horizon)",
      group: "Enlem-Boylam ve Mesafe",
      formula: "d = 2.08·√h  (h metre, d nm)",
      variables: [{ symbol: "h", label: "Göz/ışık yüksekliği", unit: "m" }],
      source: { code: "Coğrafi görüş mesafesi — yükseklik bağıntısı" },
      inputs: [{ key: "h", label: "Yükseklik (h)", unit: "m", placeholder: "20" }],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Hata", value: "Yükseklik negatif olamaz" }];
        return [{ label: "Görüş Mesafesi", value: `${(2.08 * Math.sqrt(v.h)).toFixed(2)} nm` }];
      },
    },
    {
      id: "vhf-radar-horizon",
      name: "Radar / VHF Ufuk Mesafesi",
      group: "Enlem-Boylam ve Mesafe",
      formula: "d = 2.23·(√h₁ + √h₂)  (h metre, d nm)",
      variables: [
        { symbol: "h₁", label: "Anten/radar yüksekliği", unit: "m" },
        { symbol: "h₂", label: "Hedef yüksekliği", unit: "m" },
      ],
      source: { code: "Radar/VHF ufku (refraksiyon dahil)" },
      inputs: [
        { key: "h1", label: "Anten Yüksekliği (h₁)", unit: "m", placeholder: "30" },
        { key: "h2", label: "Hedef Yüksekliği (h₂)", unit: "m", placeholder: "15" },
      ],
      calculate: (v) => {
        if (v.h1 < 0 || v.h2 < 0) return [{ label: "Hata", value: "Yükseklikler negatif olamaz" }];
        const d = 2.23 * (Math.sqrt(v.h1) + Math.sqrt(v.h2));
        return [{ label: "Ufuk Mesafesi", value: `${d.toFixed(2)} nm` }];
      },
    },
    // ---- Akıntı, Rüzgar ve Pusula ----
    {
      id: "current-triangle",
      name: "Akıntı Üçgeni (CTS / SOG)",
      group: "Akıntı, Rüzgar ve Pusula",
      formula:
        "sin(CTS−TR) = (c/V)·sin(set−TR) ;  SOG = V·cos(CTS−TR) + c·cos(set−TR)",
      variables: [
        { symbol: "TR", label: "İstenen rota (track)", unit: "°" },
        { symbol: "V", label: "Gemi sürati (su üstü)", unit: "knot" },
        { symbol: "set", label: "Akıntı yönü", unit: "°" },
        { symbol: "c", label: "Akıntı hızı (drift)", unit: "knot" },
      ],
      source: { code: "Akıntı üçgeni — CTS/SOG" },
      note: "Açılar 0–360°. CTS = düzeltilmiş pusula rotası, SOG = yer üzeri hız.",
      inputs: [
        { key: "tr", label: "İstenen Rota (TR)", unit: "°", placeholder: "90" },
        { key: "v", label: "Gemi Sürati (V)", unit: "knot", placeholder: "12" },
        { key: "set", label: "Akıntı Yönü (set)", unit: "°", placeholder: "180" },
        { key: "c", label: "Akıntı Hızı (c)", unit: "knot", placeholder: "2" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        if (v.v <= 0) return [{ label: "Hata", value: "Gemi sürati pozitif olmalı" }];
        const ratio = (v.c / v.v) * Math.sin(rad(v.set - v.tr));
        if (Math.abs(ratio) > 1) return [{ label: "Hata", value: "Akıntı çok güçlü, rota korunamaz" }];
        const corr = (Math.asin(ratio) * 180) / Math.PI;
        let cts = v.tr + corr;
        cts = ((cts % 360) + 360) % 360;
        const sog =
          v.v * Math.cos(rad(cts - v.tr)) + v.c * Math.cos(rad(v.set - v.tr));
        return [
          { label: "CTS (Düzeltilmiş Rota)", value: `${cts.toFixed(1)} °` },
          { label: "SOG", value: `${sog.toFixed(2)} knot` },
        ];
      },
    },
    {
      id: "tvmdc",
      name: "Pusula Dönüşümü (TVMDC)",
      group: "Akıntı, Rüzgar ve Pusula",
      formula: "Ct = Cc + Dev + Var  (East +, West −)",
      variables: [
        { symbol: "Cc", label: "Pusula rotası", unit: "°" },
        { symbol: "Dev", label: "Deviasyon", unit: "°" },
        { symbol: "Var", label: "Manyetik sapma (variation)", unit: "°" },
        { symbol: "Ct", label: "Hakiki rota", unit: "°" },
      ],
      source: { code: "TVMDC zinciri (manyetik/pusula düzeltmesi)" },
      note: "Doğu (E) değerler (+), batı (W) değerler (−) girilir. Sonuç 0–360° normalize edilir.",
      inputs: [
        { key: "cc", label: "Pusula Rotası (Cc)", unit: "°", placeholder: "270" },
        { key: "dev", label: "Deviasyon (Dev)", unit: "°", placeholder: "-2" },
        { key: "var", label: "Variation (Var)", unit: "°", placeholder: "5" },
      ],
      calculate: (v) => {
        let ct = v.cc + v.dev + v.var;
        ct = ((ct % 360) + 360) % 360;
        return [
          { label: "Hakiki Rota (Ct)", value: `${ct.toFixed(1)} °` },
          { label: "Pusula Hatası (Dev+Var)", value: `${(v.dev + v.var).toFixed(1)} °` },
        ];
      },
    },
    // ---- Radar ve Manevra ----
    {
      id: "cpa-tcpa",
      name: "TCPA / CPA",
      group: "Radar ve Manevra",
      formula: "tCPA = −(R·Vrel)/|Vrel|² ;  dCPA = |R + Vrel·tCPA|",
      variables: [
        { symbol: "R", label: "Bağıl konum vektörü (Rx, Ry)", unit: "nm" },
        { symbol: "Vrel", label: "Bağıl hız vektörü (Vx, Vy)", unit: "knot" },
      ],
      source: { code: "Radar plotting — CPA/TCPA" },
      note: "Vektör bileşenleri (x: doğu, y: kuzey) girilir. tCPA negatifse hedef uzaklaşmaktadır.",
      inputs: [
        { key: "rx", label: "R_x", unit: "nm", placeholder: "4" },
        { key: "ry", label: "R_y", unit: "nm", placeholder: "6" },
        { key: "vx", label: "Vrel_x", unit: "knot", placeholder: "-3" },
        { key: "vy", label: "Vrel_y", unit: "knot", placeholder: "-5" },
      ],
      calculate: (v) => {
        const v2 = v.vx * v.vx + v.vy * v.vy;
        if (v2 <= 0) return [{ label: "Sonuç", value: "Bağıl hız sıfır — CPA değişmez" }];
        const tcpa = -(v.rx * v.vx + v.ry * v.vy) / v2;
        const cx = v.rx + v.vx * tcpa;
        const cy = v.ry + v.vy * tcpa;
        const dcpa = Math.sqrt(cx * cx + cy * cy);
        return [
          { label: "TCPA", value: `${tcpa.toFixed(2)} sa (${(tcpa * 60).toFixed(1)} dk)` },
          { label: "CPA", value: `${dcpa.toFixed(2)} nm` },
        ];
      },
    },
    {
      id: "rate-of-turn",
      name: "Dönüş Oranı (ROT)",
      group: "Radar ve Manevra",
      formula: "ROT (°/dk) = (30·V) / R",
      variables: [
        { symbol: "V", label: "Sürat", unit: "knot" },
        { symbol: "R", label: "Dönüş yarıçapı", unit: "m" },
      ],
      source: { code: "Manevra — rate of turn" },
      note: "30 = (1852 m/sa) / (60 dk × π/180·... ) basitleştirilmiş katsayı; sayfada verilen bağıntı.",
      inputs: [
        { key: "v", label: "Sürat (V)", unit: "knot", placeholder: "12" },
        { key: "r", label: "Dönüş Yarıçapı (R)", unit: "m", placeholder: "600" },
      ],
      calculate: (v) => {
        if (v.r <= 0) return [{ label: "Hata", value: "Yarıçap pozitif olmalı" }];
        const rot = (30 * v.v) / v.r;
        return [{ label: "Dönüş Oranı (ROT)", value: `${rot.toFixed(2)} °/dk` }];
      },
    },
    // ---- Seyir Emniyeti ----
    {
      id: "ukc",
      name: "Omurga Altı Boşluğu (UKC)",
      group: "Seyir Emniyeti",
      formula: "UKC = CD + HoT − Draft − Squat",
      variables: [
        { symbol: "CD", label: "Harita derinliği (chart datum)", unit: "m" },
        { symbol: "HoT", label: "Gelgit yüksekliği", unit: "m" },
        { symbol: "Draft", label: "Geminin su çekimi", unit: "m" },
        { symbol: "Squat", label: "Squat (basma)", unit: "m" },
      ],
      source: { code: "Seyir emniyeti — UKC bağıntısı" },
      inputs: [
        { key: "cd", label: "Harita Derinliği (CD)", unit: "m", placeholder: "12" },
        { key: "hot", label: "Gelgit Yüksekliği (HoT)", unit: "m", placeholder: "1.5" },
        { key: "draft", label: "Draft", unit: "m", placeholder: "10.5" },
        { key: "squat", label: "Squat", unit: "m", placeholder: "0.4" },
      ],
      calculate: (v) => {
        const ukc = v.cd + v.hot - v.draft - v.squat;
        const durum = ukc > 0 ? "Pozitif boşluk" : "TEHLİKE — yetersiz su";
        return [
          { label: "UKC", value: `${ukc.toFixed(2)} m` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "squat",
      name: "Squat (Açık Su Yaklaşımı)",
      group: "Seyir Emniyeti",
      formula: "Squat ≈ V² / (100·B)",
      variables: [
        { symbol: "V", label: "Sürat", unit: "knot" },
        { symbol: "B", label: "Gemi genişliği (beam)", unit: "m" },
      ],
      source: { code: "Seyir emniyeti — açık su squat yaklaşımı" },
      inputs: [
        { key: "v", label: "Sürat (V)", unit: "knot", placeholder: "14" },
        { key: "b", label: "Genişlik (B)", unit: "m", placeholder: "22" },
      ],
      calculate: (v) => {
        if (v.b <= 0) return [{ label: "Hata", value: "Genişlik pozitif olmalı" }];
        const squat = (v.v * v.v) / (100 * v.b);
        return [{ label: "Squat", value: `${squat.toFixed(2)} m` }];
      },
    },
    // ---- Gelgit ----
    {
      id: "height-of-tide",
      name: "Gelgit Yüksekliği (Onikiler Kuralı)",
      group: "Gelgit",
      formula: "H = Low + (Σ onikiler oranı × Tidal Range)",
      variables: [
        { symbol: "Low", label: "Alçak su yüksekliği", unit: "m" },
        { symbol: "Range", label: "Gelgit genliği (HW − LW)", unit: "m" },
        { symbol: "t", label: "LW'den itibaren geçen saat (1–6)", unit: "sa" },
      ],
      source: { code: "Rule of Twelfths (onikiler kuralı)" },
      note: "Onikiler: 1,3,6,9,11,12 / 12 (saat sonu kümülatif). t=0..6 saat girilir.",
      inputs: [
        { key: "low", label: "Alçak Su (LW)", unit: "m", placeholder: "1.2" },
        { key: "range", label: "Gelgit Genliği (Range)", unit: "m", placeholder: "4.0" },
        { key: "t", label: "Geçen Süre (LW'den)", unit: "sa", placeholder: "3" },
      ],
      calculate: (v) => {
        const cum = [0, 1, 3, 6, 9, 11, 12];
        const hr = Math.max(0, Math.min(6, Math.round(v.t)));
        const fraction = cum[hr] / 12;
        const h = v.low + fraction * v.range;
        return [
          { label: "Yükselen Miktar", value: `${(fraction * v.range).toFixed(2)} m` },
          { label: "Gelgit Yüksekliği (H)", value: `${h.toFixed(2)} m` },
        ];
      },
    },
    // ---- Göksel Seyir ----
    {
      id: "celestial-altitude",
      name: "Hesaplanan Yükseklik (Hc)",
      group: "Göksel Seyir",
      formula: "sin(Hc) = sinφ·sinδ + cosφ·cosδ·cos(LHA)",
      variables: [
        { symbol: "φ", label: "Gözlemci enlemi", unit: "°" },
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
        { symbol: "LHA", label: "Yerel saat açısı", unit: "°" },
      ],
      source: { code: "Sight reduction — hesaplanan yükseklik" },
      note: "Güney enlem/deklinasyon (−) girilir. Nautical Almanac verileri ile kullanılır.",
      inputs: [
        { key: "lat", label: "Enlem (φ)", unit: "°", placeholder: "40" },
        { key: "dec", label: "Deklinasyon (δ)", unit: "°", placeholder: "20" },
        { key: "lha", label: "LHA", unit: "°", placeholder: "45" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const sinHc =
          Math.sin(rad(v.lat)) * Math.sin(rad(v.dec)) +
          Math.cos(rad(v.lat)) * Math.cos(rad(v.dec)) * Math.cos(rad(v.lha));
        const hc = (Math.asin(Math.max(-1, Math.min(1, sinHc))) * 180) / Math.PI;
        return [{ label: "Hesaplanan Yükseklik (Hc)", value: `${hc.toFixed(2)} °` }];
      },
    },
    {
      id: "celestial-azimuth",
      name: "Azimut (Z)",
      group: "Göksel Seyir",
      formula: "cos(Z) = (sinδ − sinφ·sinHc) / (cosφ·cosHc)",
      variables: [
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
        { symbol: "φ", label: "Gözlemci enlemi", unit: "°" },
        { symbol: "Hc", label: "Hesaplanan yükseklik", unit: "°" },
      ],
      source: { code: "Sight reduction — azimut" },
    },
    {
      id: "amplitude",
      name: "Amplitude (Doğuş/Batış Azimutu)",
      group: "Göksel Seyir",
      formula: "A = arcsin(sinδ / cosφ)",
      variables: [
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
        { symbol: "φ", label: "Gözlemci enlemi", unit: "°" },
      ],
      source: { code: "Göksel seyir — amplitude (pusula hatası kontrolü)" },
      note: "Doğu için E, batı için W'den ölçülür. Güney enlem/deklinasyon (−) girilir.",
      inputs: [
        { key: "dec", label: "Deklinasyon (δ)", unit: "°", placeholder: "15" },
        { key: "lat", label: "Enlem (φ)", unit: "°", placeholder: "40" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const ratio = Math.sin(rad(v.dec)) / Math.cos(rad(v.lat));
        if (Math.abs(ratio) > 1) return [{ label: "Hata", value: "Bu enlemde cisim doğmaz/batmaz" }];
        const a = (Math.asin(ratio) * 180) / Math.PI;
        return [{ label: "Amplitude (A)", value: `${a.toFixed(2)} ° (E/W'den)` }];
      },
    },
  ],
};
