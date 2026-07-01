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
        { key: "rx", label: "Rx", unit: "nm", placeholder: "4" },
        { key: "ry", label: "Ry", unit: "nm", placeholder: "6" },
        { key: "vx", label: "Vrelx", unit: "knot", placeholder: "-3" },
        { key: "vy", label: "Vrely", unit: "knot", placeholder: "-5" },
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
      steps: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const term1 = Math.sin(rad(v.lat)) * Math.sin(rad(v.dec));
        const term2 = Math.cos(rad(v.lat)) * Math.cos(rad(v.dec)) * Math.cos(rad(v.lha));
        const sinHc = term1 + term2;
        const hc = (Math.asin(Math.max(-1, Math.min(1, sinHc))) * 180) / Math.PI;
        return [
          {
            title: "Verileri yerleştir",
            expression: `φ = ${v.lat}°, δ = ${v.dec}°, LHA = ${v.lha}°`,
            hint: "Güney enlem ve deklinasyon (−) işaretli girilir; LHA daima 0–360° aralığında.",
          },
          {
            title: "1. terim: sinφ · sinδ",
            expression: `sin(${v.lat}°) · sin(${v.dec}°) = ${Math.sin(rad(v.lat)).toFixed(4)} · ${Math.sin(rad(v.dec)).toFixed(4)}`,
            result: `${term1.toFixed(4)}`,
          },
          {
            title: "2. terim: cosφ · cosδ · cos(LHA)",
            expression: `cos(${v.lat}°) · cos(${v.dec}°) · cos(${v.lha}°)`,
            result: `${term2.toFixed(4)}`,
          },
          {
            title: "Toplam = sin(Hc)",
            expression: `${term1.toFixed(4)} + ${term2.toFixed(4)}`,
            result: `sin(Hc) = ${sinHc.toFixed(4)}`,
          },
          {
            title: "Ters sinüs (arcsin) ile Hc",
            expression: `Hc = arcsin(${sinHc.toFixed(4)})`,
            result: `Hc = ${hc.toFixed(2)}°`,
            hint: "Hc, gözlemcinin varsayılan mevkisinden (AP) cismin teorik yüksekliğidir; Ho ile karşılaştırılarak intercept bulunur.",
          },
        ];
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
      note: "Deklinasyon, enlem ve hesaplanan yükseklik derece girilir; azimut açısı Z (0–180°) hesaplanır.",
      inputs: [
        { key: "dec", label: "Deklinasyon (δ)", unit: "°", placeholder: "20" },
        { key: "lat", label: "Gözlemci Enlemi (φ)", unit: "°", placeholder: "41" },
        { key: "hc", label: "Hesaplanan Yükseklik (Hc)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const r = Math.PI / 180;
        const denom = Math.cos(v.lat * r) * Math.cos(v.hc * r);
        if (Math.abs(denom) < 1e-9) return [{ label: "Hata", value: "Payda sıfıra yakın (φ veya Hc = 90°)" }];
        let cosZ = (Math.sin(v.dec * r) - Math.sin(v.lat * r) * Math.sin(v.hc * r)) / denom;
        cosZ = Math.max(-1, Math.min(1, cosZ));
        const Z = Math.acos(cosZ) / r;
        return [{ label: "Azimut Açısı (Z)", value: `${Z.toFixed(1)}°` }];
      },
      steps: (v) => {
        const r = Math.PI / 180;
        const denom = Math.cos(v.lat * r) * Math.cos(v.hc * r);
        if (Math.abs(denom) < 1e-9)
          return [{ title: "Hata", result: "Payda sıfıra yakın (φ veya Hc = 90°)" }];
        const numer = Math.sin(v.dec * r) - Math.sin(v.lat * r) * Math.sin(v.hc * r);
        let cosZ = numer / denom;
        cosZ = Math.max(-1, Math.min(1, cosZ));
        const Z = Math.acos(cosZ) / r;
        return [
          {
            title: "Verileri yerleştir",
            expression: `δ = ${v.dec}°, φ = ${v.lat}°, Hc = ${v.hc}°`,
          },
          {
            title: "Pay: sinδ − sinφ · sinHc",
            expression: `sin(${v.dec}°) − sin(${v.lat}°)·sin(${v.hc}°)`,
            result: `${numer.toFixed(4)}`,
          },
          {
            title: "Payda: cosφ · cosHc",
            expression: `cos(${v.lat}°) · cos(${v.hc}°)`,
            result: `${denom.toFixed(4)}`,
          },
          {
            title: "Bölüm = cos(Z)",
            expression: `${numer.toFixed(4)} / ${denom.toFixed(4)}`,
            result: `cos(Z) = ${cosZ.toFixed(4)}`,
          },
          {
            title: "Ters kosinüs (arccos) ile Z",
            expression: `Z = arccos(${cosZ.toFixed(4)})`,
            result: `Z = ${Z.toFixed(1)}°`,
            hint: "Z açısı (0–180°), cismin yönüne göre N/S ve E/W ile gerçek azimuta (Zn) çevrilir.",
          },
        ];
      },
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
      steps: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const ratio = Math.sin(rad(v.dec)) / Math.cos(rad(v.lat));
        if (Math.abs(ratio) > 1)
          return [{ title: "Hata", result: "Bu enlemde cisim doğmaz/batmaz (|sinδ/cosφ| > 1)" }];
        const a = (Math.asin(ratio) * 180) / Math.PI;
        return [
          {
            title: "Verileri yerleştir",
            expression: `δ = ${v.dec}°, φ = ${v.lat}°`,
            hint: "Amplitude, doğuş/batışta cismin gerçek azimutudur; pusula hatası kontrolünde kullanılır.",
          },
          {
            title: "Oran: sinδ / cosφ",
            expression: `sin(${v.dec}°) / cos(${v.lat}°) = ${Math.sin(rad(v.dec)).toFixed(4)} / ${Math.cos(rad(v.lat)).toFixed(4)}`,
            result: `${ratio.toFixed(4)}`,
          },
          {
            title: "Ters sinüs (arcsin) ile A",
            expression: `A = arcsin(${ratio.toFixed(4)})`,
            result: `A = ${a.toFixed(2)}° (E/W'den)`,
            hint: "Doğuda E, batıda W'den ölçülür; deklinasyon N ise kuzeye, S ise güneye doğru.",
          },
        ];
      },
    },
    // ---- Konu anlatımından eklenen hesaplayıcılar ----
    {
      id: "arc-time",
      name: "Boylam ↔ Zaman Dönüşümü",
      group: "Enlem-Boylam ve Mesafe",
      formula: "λ(°) = ZF × 15 ;  Boylam(°) × 4 = ZF(dk)",
      variables: [
        { symbol: "λ", label: "Boylam (yay)", unit: "°" },
        { symbol: "ZF", label: "Zaman farkı", unit: "sa" },
      ],
      source: { code: "Göksel seyir — yay/zaman dönüşümü", detail: "360° = 24 sa, 1° = 4 dk" },
      note: "Boylam derecesi gir → eşdeğer zaman farkı (Greenwich'e göre) hesaplanır.",
      inputs: [{ key: "lon", label: "Boylam (λ)", unit: "°", placeholder: "45" }],
      calculate: (v) => {
        const totalMin = Math.abs(v.lon) * 4;
        const h = Math.floor(totalMin / 60);
        const m = totalMin - h * 60;
        return [
          { label: "Zaman Farkı (ondalık)", value: `${(totalMin / 60).toFixed(3)} sa` },
          { label: "Zaman Farkı (sa:dk)", value: `${h} sa ${m.toFixed(1)} dk` },
        ];
      },
    },
    {
      id: "dip",
      name: "Ufuk Çukurlaşması (Dip)",
      group: "Göksel Seyir",
      formula: "Dip = 1.76 × √h  (h metre, Dip dakika)",
      variables: [{ symbol: "h", label: "Göz yüksekliği", unit: "m" }],
      source: { code: "Nautical Almanac — dip of the horizon" },
      note: "Sekstant irtifa düzeltmesinde gözlemcinin göz yüksekliğinden kaynaklanan çukurlaşma.",
      inputs: [{ key: "h", label: "Göz Yüksekliği (h)", unit: "m", placeholder: "12" }],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Hata", value: "Yükseklik negatif olamaz" }];
        const dip = 1.76 * Math.sqrt(v.h);
        return [{ label: "Dip", value: `${dip.toFixed(1)} ′ (dakika)` }];
      },
      steps: (v) => {
        if (v.h < 0) return [{ title: "Hata", result: "Yükseklik negatif olamaz" }];
        const dip = 1.76 * Math.sqrt(v.h);
        return [
          {
            title: "Göz yüksekliğini yerleştir",
            expression: `h = ${v.h} m`,
            hint: "h, gözlemcinin deniz seviyesinden göz yüksekliğidir (köprüüstü vb.).",
          },
          {
            title: "Karekök al",
            expression: `√${v.h} = ${Math.sqrt(v.h).toFixed(3)}`,
          },
          {
            title: "Katsayı ile çarp",
            expression: `Dip = 1.76 × ${Math.sqrt(v.h).toFixed(3)}`,
            result: `Dip = ${dip.toFixed(1)} ′`,
            hint: "Dip, sekstant düzeltmesinde Hs'den DAİMA çıkarılır (ufuk gözün altında görünür).",
          },
        ];
      },
    },
    {
      id: "sextant-correction",
      name: "Sekstant İrtifa Düzeltmesi (Ho)",
      group: "Göksel Seyir",
      formula: "Ho = Hs ± IE − Dip ± R ± SD ± P",
      variables: [
        { symbol: "Hs", label: "Sekstant irtifası", unit: "°" },
        { symbol: "IE", label: "Endeks hatası (E: −, W: +)", unit: "′" },
        { symbol: "Dip", label: "Ufuk çukurlaşması", unit: "′" },
        { symbol: "R", label: "Toplam düzeltme (refraksiyon + SD + P)", unit: "′" },
      ],
      source: { code: "Nautical Almanac — sight reduction (apparent → observed altitude)" },
      note: "IE ve toplam düzeltme dakika (′) girilir. Endeks hatası işaretiyle, dip her zaman çıkarılır, ana düzeltme R işaretiyle eklenir.",
      inputs: [
        { key: "hs", label: "Sekstant İrtifası (Hs)", unit: "°", placeholder: "45.5" },
        { key: "ie", label: "Endeks Hatası (IE)", unit: "′", placeholder: "-1.5" },
        { key: "dip", label: "Dip", unit: "′", placeholder: "6.1" },
        { key: "r", label: "Ana Düzeltme (R)", unit: "′", placeholder: "14.5" },
      ],
      calculate: (v) => {
        const hoMin = v.hs * 60 + v.ie - v.dip + v.r;
        const ho = hoMin / 60;
        return [{ label: "Gözlenen İrtifa (Ho)", value: `${ho.toFixed(3)} °` }];
      },
      steps: (v) => {
        const hsMin = v.hs * 60;
        const afterIe = hsMin + v.ie;
        const afterDip = afterIe - v.dip;
        const hoMin = afterDip + v.r;
        const ho = hoMin / 60;
        return [
          {
            title: "Hs'yi dakikaya çevir",
            expression: `${v.hs}° × 60 = ${hsMin.toFixed(1)} ′`,
            hint: "Tüm düzeltmeler dakika (′) cinsinden yapılır; 1° = 60′.",
          },
          {
            title: "Endeks hatasını (IE) uygula",
            expression: `${hsMin.toFixed(1)} ′ + (${v.ie}) ′`,
            result: `${afterIe.toFixed(1)} ′`,
            hint: "IE işaretiyle eklenir (on-the-arc: −, off-the-arc: +).",
          },
          {
            title: "Dip'i çıkar",
            expression: `${afterIe.toFixed(1)} ′ − ${v.dip} ′`,
            result: `${afterDip.toFixed(1)} ′  (görünen irtifa, Ha)`,
          },
          {
            title: "Ana düzeltmeyi (R) uygula",
            expression: `${afterDip.toFixed(1)} ′ + (${v.r}) ′`,
            result: `${hoMin.toFixed(1)} ′`,
            hint: "R = refraksiyon + yarıçap (SD) + paralaks (P), Almanac'tan alınır.",
          },
          {
            title: "Dereceye geri çevir",
            expression: `${hoMin.toFixed(1)} ′ ÷ 60`,
            result: `Ho = ${ho.toFixed(3)}°`,
            hint: "Ho (gözlenen irtifa), Hc ile karşılaştırılarak intercept (a) bulunur.",
          },
        ];
      },
    },
    {
      id: "intercept",
      name: "Yükseklik Farkı (Intercept)",
      group: "Göksel Seyir",
      formula: "a = Ho − Hc",
      variables: [
        { symbol: "Ho", label: "Gözlenen yükseklik", unit: "°" },
        { symbol: "Hc", label: "Hesaplanan yükseklik", unit: "°" },
      ],
      source: { code: "Marcq St-Hilaire — intercept yöntemi" },
      note: "Pozitif (Toward) → cisme doğru, negatif (Away) → cisimden uzağa. 1′ = 1 NM.",
      inputs: [
        { key: "ho", label: "Gözlenen Yükseklik (Ho)", unit: "°", placeholder: "45.30" },
        { key: "hc", label: "Hesaplanan Yükseklik (Hc)", unit: "°", placeholder: "45.10" },
      ],
      calculate: (v) => {
        const aMin = (v.ho - v.hc) * 60;
        const yon = aMin >= 0 ? "Toward (cisme doğru)" : "Away (cisimden uzağa)";
        return [
          { label: "Intercept (a)", value: `${Math.abs(aMin).toFixed(1)} NM` },
          { label: "Yön", value: yon },
        ];
      },
      steps: (v) => {
        const diff = v.ho - v.hc;
        const aMin = diff * 60;
        const yon = aMin >= 0 ? "Toward (cisme doğru)" : "Away (cisimden uzağa)";
        return [
          {
            title: "Verileri yerleştir",
            expression: `Ho = ${v.ho}°, Hc = ${v.hc}°`,
            hint: "Ho gözlenen, Hc hesaplanan (AP'ye göre) irtifadır.",
          },
          {
            title: "Farkı al (Ho − Hc)",
            expression: `${v.ho}° − ${v.hc}°`,
            result: `${diff.toFixed(3)}°`,
          },
          {
            title: "Deniz miline çevir (× 60)",
            expression: `${diff.toFixed(3)}° × 60 ′/° = ${aMin.toFixed(1)} ′`,
            result: `a = ${Math.abs(aMin).toFixed(1)} NM`,
            hint: "1 yay dakikası = 1 deniz mili.",
          },
          {
            title: "Yönü belirle",
            expression: aMin >= 0 ? "Ho > Hc → cisme doğru" : "Ho < Hc → cisimden uzağa",
            result: yon,
            hint: "Mevki hattı (LOP), AP'den azimut yönünde a kadar bu yöne kaydırılarak çizilir.",
          },
        ];
      },
    },
    {
      id: "meridian-passage-lat",
      name: "Öğle Boyu Enlemi (Meridian Passage)",
      group: "Göksel Seyir",
      formula: "Z = 90° − Ho ;  φ = Z ± δ",
      variables: [
        { symbol: "Ho", label: "Meridyen geçişi gözlenen yükseklik", unit: "°" },
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
      ],
      source: { code: "Göksel seyir — meridyen geçişi enlem hesabı" },
      note: "Zenit mesafesi (Z) ve deklinasyon aynı adda ise toplanır, zıt adda ise çıkarılır. Güney değerler (−) girilerek otomatik hesaplanır.",
      inputs: [
        { key: "ho", label: "Gözlenen Yükseklik (Ho)", unit: "°", placeholder: "68.5" },
        { key: "dec", label: "Deklinasyon (δ, S: −)", unit: "°", placeholder: "20" },
        { key: "bearing", label: "Cisim Yönü (1=Güney/Zenit güneyde, −1=Kuzey)", unit: "", placeholder: "1" },
      ],
      calculate: (v) => {
        const z = 90 - v.ho;
        // Zenit güneyde ise (cisim meridyeni güneyde) enlem = δ + Z, kuzeyde ise δ − Z
        const sign = v.bearing >= 0 ? 1 : -1;
        const lat = v.dec + sign * z;
        const hemis = lat >= 0 ? "N" : "S";
        return [
          { label: "Zenit Mesafesi (Z)", value: `${z.toFixed(2)} °` },
          { label: "Enlem (φ)", value: `${Math.abs(lat).toFixed(2)} ° ${hemis}` },
        ];
      },
      steps: (v) => {
        const z = 90 - v.ho;
        const sign = v.bearing >= 0 ? 1 : -1;
        const lat = v.dec + sign * z;
        const hemis = lat >= 0 ? "N" : "S";
        return [
          {
            title: "Verileri yerleştir",
            expression: `Ho = ${v.ho}°, δ = ${v.dec}°, yön = ${v.bearing >= 0 ? "Zenit güneyde" : "Zenit kuzeyde"}`,
            hint: "Öğle boyu (meridyen geçişi) anında cisim gözlemcinin meridyenindedir.",
          },
          {
            title: "Zenit mesafesi: Z = 90° − Ho",
            expression: `90° − ${v.ho}°`,
            result: `Z = ${z.toFixed(2)}°`,
          },
          {
            title: "Enlem: φ = δ ± Z",
            expression: `${v.dec}° ${sign >= 0 ? "+" : "−"} ${z.toFixed(2)}°`,
            result: `φ = ${Math.abs(lat).toFixed(2)}° ${hemis}`,
            hint: "Z ile δ aynı adda ise toplanır, zıt adda ise çıkarılır (işaretler otomatik).",
          },
        ];
      },
    },
    {
      id: "sight-reduction",
      name: "Mevki Hattı Zinciri (Sight Reduction)",
      group: "Göksel Seyir",
      formula: "GHA → LHA = GHA±λ → Hc, Z → Ho = Hs±düzeltme → a = Ho−Hc",
      variables: [
        { symbol: "GHA", label: "Greenwich saat açısı", unit: "°" },
        { symbol: "λ", label: "Boylam (E: +, W: −)", unit: "°" },
        { symbol: "φ", label: "AP enlemi", unit: "°" },
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
        { symbol: "Hs", label: "Sekstant irtifası", unit: "°" },
        { symbol: "a", label: "Intercept (yükseklik farkı)", unit: "NM" },
      ],
      source: { code: "Marcq St-Hilaire — tam sight reduction zinciri (AP → LOP)" },
      note: "Almanac'tan GHA ve δ alınır. Güney enlem/deklinasyon (−), batı boylam (−) girilir. Tüm düzeltmeler dakika (′).",
      inputs: [
        { key: "gha", label: "GHA", unit: "°", placeholder: "130.5" },
        { key: "lon", label: "Boylam (λ, E:+ W:−)", unit: "°", placeholder: "28" },
        { key: "lat", label: "AP Enlemi (φ)", unit: "°", placeholder: "40" },
        { key: "dec", label: "Deklinasyon (δ)", unit: "°", placeholder: "20" },
        { key: "hs", label: "Sekstant İrtifası (Hs)", unit: "°", placeholder: "45.5" },
        { key: "ie", label: "Endeks Hatası (IE)", unit: "′", placeholder: "-1.5" },
        { key: "dip", label: "Dip", unit: "′", placeholder: "6.1" },
        { key: "r", label: "Ana Düzeltme (R)", unit: "′", placeholder: "14.5" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const norm = (x: number) => ((x % 360) + 360) % 360;
        const lha = norm(v.gha + v.lon);
        const sinHc =
          Math.sin(rad(v.lat)) * Math.sin(rad(v.dec)) +
          Math.cos(rad(v.lat)) * Math.cos(rad(v.dec)) * Math.cos(rad(lha));
        const hc = (Math.asin(Math.max(-1, Math.min(1, sinHc))) * 180) / Math.PI;
        const denom = Math.cos(rad(v.lat)) * Math.cos(rad(hc));
        let z = 0;
        if (Math.abs(denom) >= 1e-9) {
          let cosZ = (Math.sin(rad(v.dec)) - Math.sin(rad(v.lat)) * Math.sin(rad(hc))) / denom;
          cosZ = Math.max(-1, Math.min(1, cosZ));
          z = (Math.acos(cosZ) * 180) / Math.PI;
        }
        const ho = (v.hs * 60 + v.ie - v.dip + v.r) / 60;
        const aMin = (ho - hc) * 60;
        const yon = aMin >= 0 ? "Toward (cisme doğru)" : "Away (cisimden uzağa)";
        return [
          { label: "LHA", value: `${lha.toFixed(2)} °` },
          { label: "Hesaplanan İrtifa (Hc)", value: `${hc.toFixed(2)} °` },
          { label: "Azimut Açısı (Z)", value: `${z.toFixed(1)} °` },
          { label: "Gözlenen İrtifa (Ho)", value: `${ho.toFixed(3)} °` },
          { label: "Intercept (a)", value: `${Math.abs(aMin).toFixed(1)} NM ${yon}` },
        ];
      },
      steps: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const norm = (x: number) => ((x % 360) + 360) % 360;
        const lha = norm(v.gha + v.lon);
        const sinHc =
          Math.sin(rad(v.lat)) * Math.sin(rad(v.dec)) +
          Math.cos(rad(v.lat)) * Math.cos(rad(v.dec)) * Math.cos(rad(lha));
        const hc = (Math.asin(Math.max(-1, Math.min(1, sinHc))) * 180) / Math.PI;
        const denom = Math.cos(rad(v.lat)) * Math.cos(rad(hc));
        let cosZ = 0;
        let z = 0;
        if (Math.abs(denom) >= 1e-9) {
          cosZ = Math.max(-1, Math.min(1, (Math.sin(rad(v.dec)) - Math.sin(rad(v.lat)) * Math.sin(rad(hc))) / denom));
          z = (Math.acos(cosZ) * 180) / Math.PI;
        }
        const ho = (v.hs * 60 + v.ie - v.dip + v.r) / 60;
        const aMin = (ho - hc) * 60;
        const yon = aMin >= 0 ? "Toward (cisme doğru)" : "Away (cisimden uzağa)";
        return [
          {
            title: "1) Yerel Saat Açısı (LHA) = GHA ± λ",
            expression: `${v.gha}° + (${v.lon}°) = ${(v.gha + v.lon).toFixed(2)}° → 0–360° normalize`,
            result: `LHA = ${lha.toFixed(2)}°`,
            hint: "Doğu boylam (+) eklenir, batı boylam (−) çıkarılır. Sonuç 0–360° aralığına indirgenir.",
          },
          {
            title: "2) Hesaplanan İrtifa (Hc)",
            expression: `sin(Hc) = sinφ·sinδ + cosφ·cosδ·cos(LHA) = ${sinHc.toFixed(4)}`,
            result: `Hc = arcsin(${sinHc.toFixed(4)}) = ${hc.toFixed(2)}°`,
            hint: "AP (varsayılan mevki) enlemi ile cismin teorik yüksekliği.",
          },
          {
            title: "3) Azimut Açısı (Z)",
            expression: `cos(Z) = (sinδ − sinφ·sinHc)/(cosφ·cosHc) = ${cosZ.toFixed(4)}`,
            result: `Z = ${z.toFixed(1)}°`,
            hint: "Z, mevki hattının (LOP) çiziminde kullanılan azimut yönüdür.",
          },
          {
            title: "4) Gözlenen İrtifa (Ho) = Hs ± düzeltmeler",
            expression: `${v.hs}° + (${v.ie}′ IE) − ${v.dip}′ Dip + ${v.r}′ R`,
            result: `Ho = ${ho.toFixed(3)}°`,
            hint: "Sekstant okuması Hs, endeks hatası/dip/ana düzeltme ile gerçek irtifaya çevrilir.",
          },
          {
            title: "5) Intercept (a) = Ho − Hc",
            expression: `(${ho.toFixed(3)}° − ${hc.toFixed(2)}°) × 60 = ${aMin.toFixed(1)} ′`,
            result: `a = ${Math.abs(aMin).toFixed(1)} NM — ${yon}`,
            hint: "AP'den azimut (Zn) yönünde a kadar bu yöne gidilerek mevki hattı (LOP) çizilir; iki LOP kesişimi mevkidir.",
          },
        ];
      },
    },
    {
      id: "gc-vertex-lat",
      name: "Büyük Daire Tepe Enlemi (Vertex)",
      group: "Enlem-Boylam ve Mesafe",
      formula: "sin φv = |sin C₁| × cos φ₁",
      variables: [
        { symbol: "C₁", label: "Başlangıç (ilk) kurs", unit: "°" },
        { symbol: "φ₁", label: "Başlangıç enlemi", unit: "°" },
      ],
      source: { code: "Büyük daire seyri — vertex (tepe noktası)" },
      note: "Vertex, büyük dairenin ulaştığı en yüksek enlemdir (kursun 090°/270° olduğu nokta).",
      inputs: [
        { key: "c1", label: "İlk Kurs (C₁)", unit: "°", placeholder: "60" },
        { key: "lat1", label: "Başlangıç Enlemi (φ₁)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const sinPv = Math.abs(Math.sin(rad(v.c1))) * Math.cos(rad(v.lat1));
        const pv = (Math.asin(Math.min(1, sinPv)) * 180) / Math.PI;
        return [{ label: "Tepe Enlemi (φv)", value: `${pv.toFixed(2)} °` }];
      },
    },
    {
      id: "distance-vertical-angle",
      name: "Düşey Açıyla Mesafe (Distance Off)",
      group: "Radar ve Manevra",
      formula: "Mesafe (NM) ≈ 1.856 × Yükseklik(m) / Düşey Açı(′)",
      variables: [
        { symbol: "H", label: "Nesnenin (fener vb.) yüksekliği", unit: "m" },
        { symbol: "α", label: "Sekstantla ölçülen düşey açı", unit: "′" },
      ],
      source: { code: "Admiralty — distance by vertical sextant angle" },
      note: "Yüksekliği bilinen nesnenin (deniz feneri, tepe) düşey açısından mesafe; nesne ufuk içindeyse geçerlidir.",
      inputs: [
        { key: "h", label: "Yükseklik (H)", unit: "m", placeholder: "80" },
        { key: "angle", label: "Düşey Açı (α)", unit: "′", placeholder: "12" },
      ],
      calculate: (v) => {
        if (v.angle <= 0) return [{ label: "Hata", value: "Düşey açı pozitif olmalı" }];
        const dist = (1.856 * v.h) / v.angle;
        return [{ label: "Mesafe", value: `${dist.toFixed(2)} NM` }];
      },
    },
    {
      id: "echo-sounder-depth",
      name: "İskandil (Echo Sounder) Derinliği",
      group: "Seyir Emniyeti",
      formula: "Derinlik = (Ses Hızı × Geçen Süre) / 2",
      variables: [
        { symbol: "c", label: "Suda ses hızı (≈1500 m/s)", unit: "m/s" },
        { symbol: "t", label: "Sinyalin gidiş-dönüş süresi", unit: "s" },
      ],
      source: { code: "Elektronik seyir — echo sounder (yankı iskandil)" },
      inputs: [
        { key: "c", label: "Ses Hızı (c)", unit: "m/s", placeholder: "1500" },
        { key: "t", label: "Gidiş-Dönüş Süresi (t)", unit: "s", placeholder: "0.04" },
      ],
      calculate: (v) => {
        if (v.t < 0) return [{ label: "Hata", value: "Süre negatif olamaz" }];
        const depth = (v.c * v.t) / 2;
        return [{ label: "Derinlik", value: `${depth.toFixed(1)} m` }];
      },
    },
  ],
};
