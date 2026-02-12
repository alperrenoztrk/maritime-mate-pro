import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { ArrowLeft, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CalcTool {
  name: string;
  description: string;
  inputs: { key: string; label: string; unit: string; placeholder?: string }[];
  calculate: (vals: Record<string, number>) => { label: string; value: string }[];
}

const topicCalculations: Record<string, CalcTool[]> = {
  thermodynamics: [
    {
      name: "Carnot Verimi",
      description: "Sıcak ve soğuk kaynak sıcaklıkları ile Carnot çevrim verimini hesaplar.",
      inputs: [
        { key: "th", label: "Sıcak Kaynak (T_H)", unit: "°C", placeholder: "500" },
        { key: "tl", label: "Soğuk Kaynak (T_L)", unit: "°C", placeholder: "30" },
      ],
      calculate: (v) => {
        const TH = v.th + 273.15;
        const TL = v.tl + 273.15;
        const eta = (1 - TL / TH) * 100;
        return [{ label: "Carnot Verimi (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "LMTD Hesabı",
      description: "Isı eşanjöründe logaritmik ortalama sıcaklık farkını hesaplar (karşı akış).",
      inputs: [
        { key: "t1i", label: "Sıcak Giriş", unit: "°C" },
        { key: "t1o", label: "Sıcak Çıkış", unit: "°C" },
        { key: "t2i", label: "Soğuk Giriş", unit: "°C" },
        { key: "t2o", label: "Soğuk Çıkış", unit: "°C" },
      ],
      calculate: (v) => {
        const dt1 = v.t1i - v.t2o;
        const dt2 = v.t1o - v.t2i;
        if (dt1 <= 0 || dt2 <= 0) return [{ label: "Hata", value: "Sıcaklık farkları pozitif olmalı" }];
        const lmtd = Math.abs(dt1 - dt2) < 0.01 ? dt1 : (dt1 - dt2) / Math.log(dt1 / dt2);
        return [{ label: "LMTD", value: `${lmtd.toFixed(2)} °C` }];
      },
    },
  ],
  "fluid-mechanics": [
    {
      name: "Reynolds Sayısı",
      description: "Akış rejimini belirlemek için Reynolds sayısını hesaplar.",
      inputs: [
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1000" },
        { key: "v", label: "Hız (v)", unit: "m/s", placeholder: "2" },
        { key: "d", label: "Çap (D)", unit: "m", placeholder: "0.1" },
        { key: "mu", label: "Dinamik Viskozite (μ)", unit: "Pa·s", placeholder: "0.001" },
      ],
      calculate: (vals) => {
        const re = (vals.rho * vals.v * vals.d) / vals.mu;
        const regime = re < 2300 ? "Laminer" : re < 4000 ? "Geçiş" : "Türbülanslı";
        return [
          { label: "Reynolds Sayısı", value: re.toFixed(0) },
          { label: "Akış Rejimi", value: regime },
        ];
      },
    },
    {
      name: "Pompa Gücü",
      description: "Santrifüj pompa gücünü hesaplar.",
      inputs: [
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "q", label: "Debi (Q)", unit: "m³/h", placeholder: "100" },
        { key: "h", label: "Basma Yüksekliği (H)", unit: "m", placeholder: "30" },
        { key: "eta", label: "Verim (η)", unit: "%", placeholder: "75" },
      ],
      calculate: (vals) => {
        const qm3s = vals.q / 3600;
        const power = (vals.rho * 9.81 * qm3s * vals.h) / (vals.eta / 100);
        return [{ label: "Pompa Gücü", value: `${(power / 1000).toFixed(2)} kW` }];
      },
    },
  ],
  "diesel-engines": [
    {
      name: "İndike Güç (IHP)",
      description: "Ana makinenin indike gücünü hesaplar.",
      inputs: [
        { key: "pmi", label: "Ortalama İndike Basınç (P_mi)", unit: "bar", placeholder: "18" },
        { key: "l", label: "Strok (L)", unit: "m", placeholder: "2.5" },
        { key: "a", label: "Piston Alanı (A)", unit: "m²", placeholder: "0.35" },
        { key: "n", label: "Devir (n)", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Silindir Sayısı (k)", unit: "adet", placeholder: "6" },
      ],
      calculate: (v) => {
        const ihp = (v.pmi * 100 * v.l * v.a * v.n * v.k) / 60000;
        return [{ label: "İndike Güç (IHP)", value: `${ihp.toFixed(1)} kW` }];
      },
    },
    {
      name: "SFOC Hesabı",
      description: "Özgül yakıt tüketimini hesaplar.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "kg/saat", placeholder: "5000" },
        { key: "bhp", label: "Fren Gücü (BHP)", unit: "kW", placeholder: "25000" },
      ],
      calculate: (v) => {
        const sfoc = (v.fc * 1000) / v.bhp;
        return [{ label: "SFOC", value: `${sfoc.toFixed(1)} g/kW·h` }];
      },
    },
  ],
  "ship-systems": [
    {
      name: "Yakıt Tüketimi",
      description: "Seyir süresine göre toplam yakıt tüketimini hesaplar.",
      inputs: [
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "bhp", label: "BHP", unit: "kW", placeholder: "15000" },
        { key: "t", label: "Süre", unit: "saat", placeholder: "240" },
      ],
      calculate: (v) => {
        const fc = (v.sfoc * v.bhp * v.t) / 1e6;
        return [{ label: "Toplam Yakıt", value: `${fc.toFixed(1)} ton` }];
      },
    },
  ],
  auxiliary: [
    {
      name: "Jeneratör Gücü (3 Faz)",
      description: "Üç fazlı jeneratör elektrik gücünü hesaplar.",
      inputs: [
        { key: "v", label: "Hat Gerilimi (V)", unit: "V", placeholder: "440" },
        { key: "i", label: "Hat Akımı (I)", unit: "A", placeholder: "500" },
        { key: "pf", label: "Güç Faktörü (cos φ)", unit: "", placeholder: "0.8" },
      ],
      calculate: (vals) => {
        const p = Math.sqrt(3) * vals.v * vals.i * vals.pf;
        return [
          { label: "Aktif Güç (P)", value: `${(p / 1000).toFixed(1)} kW` },
          { label: "Görünür Güç (S)", value: `${(Math.sqrt(3) * vals.v * vals.i / 1000).toFixed(1)} kVA` },
        ];
      },
    },
  ],
  electrical: [
    {
      name: "Gerilim Düşümü",
      description: "Kablo gerilim düşümünü hesaplar.",
      inputs: [
        { key: "i", label: "Akım (I)", unit: "A", placeholder: "100" },
        { key: "r", label: "Birim Direnç (R)", unit: "Ω/km", placeholder: "0.5" },
        { key: "l", label: "Kablo Uzunluğu (L)", unit: "m", placeholder: "50" },
        { key: "pf", label: "Güç Faktörü", unit: "", placeholder: "0.85" },
      ],
      calculate: (v) => {
        const drop = 2 * v.i * (v.r / 1000) * v.l * v.pf;
        return [{ label: "Gerilim Düşümü", value: `${drop.toFixed(2)} V` }];
      },
    },
  ],
  "cooling-hvac": [
    {
      name: "COP Hesabı",
      description: "Soğutma sistemi performans katsayısını hesaplar.",
      inputs: [
        { key: "ql", label: "Soğutma Kapasitesi (Q_L)", unit: "kW", placeholder: "50" },
        { key: "wc", label: "Kompresör Gücü (W)", unit: "kW", placeholder: "15" },
      ],
      calculate: (v) => {
        const cop = v.ql / v.wc;
        return [{ label: "COP", value: cop.toFixed(2) }];
      },
    },
  ],
  "fuel-technology": [
    {
      name: "CCAI Hesabı",
      description: "Yakıt aromatiklik indeksini hesaplar.",
      inputs: [
        { key: "d", label: "Yoğunluk 15°C (D)", unit: "kg/m³", placeholder: "991" },
        { key: "v", label: "Viskozite 50°C (ν)", unit: "cSt", placeholder: "380" },
      ],
      calculate: (vals) => {
        const ccai = vals.d - 81.703 * Math.log10(Math.log10(vals.v + 0.85)) - 483.5;
        const quality = ccai < 840 ? "İyi" : ccai < 870 ? "Kabul edilebilir" : "Zayıf tutuşma";
        return [
          { label: "CCAI", value: ccai.toFixed(0) },
          { label: "Kalite", value: quality },
        ];
      },
    },
  ],
  maintenance: [
    {
      name: "MTBF ve Kullanılabilirlik",
      description: "Ekipman güvenilirlik ve kullanılabilirlik hesabı.",
      inputs: [
        { key: "hours", label: "Toplam Çalışma Süresi", unit: "saat", placeholder: "8760" },
        { key: "failures", label: "Arıza Sayısı", unit: "adet", placeholder: "3" },
        { key: "repair", label: "Toplam Onarım Süresi", unit: "saat", placeholder: "72" },
      ],
      calculate: (v) => {
        if (v.failures === 0) return [{ label: "MTBF", value: "Arıza yok — sonsuz" }];
        const mtbf = v.hours / v.failures;
        const mttr = v.repair / v.failures;
        const avail = mtbf / (mtbf + mttr) * 100;
        return [
          { label: "MTBF", value: `${mtbf.toFixed(0)} saat` },
          { label: "MTTR", value: `${mttr.toFixed(1)} saat` },
          { label: "Kullanılabilirlik", value: `${avail.toFixed(1)}%` },
        ];
      },
    },
  ],
  "energy-efficiency": [
    {
      name: "CII Hesabı",
      description: "Yıllık karbon yoğunluğu göstergesini hesaplar.",
      inputs: [
        { key: "co2", label: "Toplam CO₂ Emisyonu", unit: "ton", placeholder: "25000" },
        { key: "dwt", label: "DWT", unit: "ton", placeholder: "50000" },
        { key: "dist", label: "Toplam Mesafe", unit: "NM", placeholder: "80000" },
      ],
      calculate: (v) => {
        const cii = (v.co2 * 1e6) / (v.dwt * v.dist);
        return [{ label: "CII (AER)", value: `${cii.toFixed(2)} g CO₂/(DWT·NM)` }];
      },
    },
  ],
  "environment-machine": [
    {
      name: "CO₂ Emisyon Hesabı",
      description: "Yakıt tüketiminden CO₂ emisyonunu hesaplar.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "ton", placeholder: "100" },
        { key: "cf", label: "Karbon Faktörü (C_f)", unit: "t-CO₂/t-yakıt", placeholder: "3.114" },
      ],
      calculate: (v) => ({ label: "CO₂ Emisyonu", value: `${(v.fc * v.cf).toFixed(1)} ton CO₂` } as any),
    },
  ],
  "engine-room-safety": [
    {
      name: "CO₂ Miktar Hesabı",
      description: "Sabit CO₂ söndürme sistemi için gerekli miktarı hesaplar.",
      inputs: [
        { key: "vol", label: "Korunan Hacim", unit: "m³", placeholder: "2000" },
      ],
      calculate: (v) => {
        const mass = v.vol * 0.56;
        return [{ label: "Gerekli CO₂ Miktarı", value: `${mass.toFixed(0)} kg` }];
      },
    },
  ],
  erm: [
    {
      name: "Risk Değerlendirmesi",
      description: "Olasılık × Şiddet ile risk seviyesini hesaplar.",
      inputs: [
        { key: "prob", label: "Olasılık (1–5)", unit: "", placeholder: "3" },
        { key: "sev", label: "Şiddet (1–5)", unit: "", placeholder: "4" },
      ],
      calculate: (v) => {
        const risk = v.prob * v.sev;
        const level = risk <= 4 ? "Düşük" : risk <= 12 ? "Orta" : "Yüksek";
        return [
          { label: "Risk Puanı", value: `${risk}` },
          { label: "Risk Seviyesi", value: level },
        ];
      },
    },
  ],
  "machine-elements": [
    {
      name: "Mil Çapı (Burulma)",
      description: "Belirli tork ve izin verilen kayma gerilmesi için minimum mil çapını hesaplar.",
      inputs: [
        { key: "t", label: "Tork (T)", unit: "N·m", placeholder: "50000" },
        { key: "tau", label: "İzin Verilen τ", unit: "MPa", placeholder: "60" },
      ],
      calculate: (v) => {
        const d = Math.pow((16 * v.t) / (Math.PI * v.tau * 1e6), 1 / 3) * 1000;
        return [{ label: "Minimum Çap", value: `${d.toFixed(1)} mm` }];
      },
    },
  ],
  automation: [
    {
      name: "4-20 mA Dönüşüm",
      description: "Ölçüm değerini 4-20 mA sinyaline dönüştürür.",
      inputs: [
        { key: "x", label: "Ölçülen Değer", unit: "", placeholder: "75" },
        { key: "xmin", label: "Aralık Min", unit: "", placeholder: "0" },
        { key: "xmax", label: "Aralık Max", unit: "", placeholder: "100" },
      ],
      calculate: (v) => {
        const i = 4 + (16 * (v.x - v.xmin) / (v.xmax - v.xmin));
        return [{ label: "Çıkış Akımı", value: `${i.toFixed(2)} mA` }];
      },
    },
  ],
  "engine-room-ops": [
    {
      name: "Kalan Yakıt Menzili",
      description: "Mevcut yakıt stokuyla tahmini çalışma süresini hesaplar.",
      inputs: [
        { key: "stock", label: "Yakıt Stoku", unit: "ton", placeholder: "500" },
        { key: "rate", label: "Tüketim Hızı", unit: "ton/gün", placeholder: "30" },
      ],
      calculate: (v) => {
        const days = v.stock / v.rate;
        return [
          { label: "Tahmini Menzil", value: `${days.toFixed(1)} gün` },
          { label: "Saat", value: `${(days * 24).toFixed(0)} saat` },
        ];
      },
    },
  ],
};

function CalcToolCard({ tool }: { tool: CalcTool }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);

  const handleCalc = () => {
    const numVals: Record<string, number> = {};
    for (const inp of tool.inputs) {
      const v = parseFloat(vals[inp.key] || "0");
      if (isNaN(v)) return;
      numVals[inp.key] = v;
    }
    const r = tool.calculate(numVals);
    setResults(Array.isArray(r) ? r : [r]);
  };

  return (
    <Card className="bg-card/80 backdrop-blur border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{tool.name}</CardTitle>
        <p className="text-xs text-muted-foreground">{tool.description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {tool.inputs.map((inp) => (
            <div key={inp.key} className="space-y-1">
              <Label className="text-xs">{inp.label} {inp.unit && <span className="text-muted-foreground">({inp.unit})</span>}</Label>
              <Input
                type="number"
                placeholder={inp.placeholder}
                value={vals[inp.key] || ""}
                onChange={(e) => setVals((p) => ({ ...p, [inp.key]: e.target.value }))}
                className="h-9"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleCalc} size="sm" className="w-full gap-2">
          <Calculator className="h-4 w-4" /> Hesapla
        </Button>
        {results && (
          <div className="bg-primary/5 rounded-lg p-3 space-y-1">
            {results.map((r, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-semibold text-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MachineTopicCalculationsPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const calcs = topicSlug ? topicCalculations[topicSlug] : null;

  if (!topic || !calcs || calcs.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Hesaplama aracı bulunamadı</p>
      </div>
    );
  }

  const TopicIcon = topic.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <header className="space-y-3">
          <Link to="/lessons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Derslere Dön
          </Link>
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${topic.accent} text-white shadow-lg`}>
              <TopicIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{topic.title}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calculator className="h-3.5 w-3.5" /> Hesaplamalar
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-4">
          {calcs.map((tool, idx) => (
            <CalcToolCard key={idx} tool={tool} />
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Link to="/lessons" className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground">
            Tüm Derslere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
