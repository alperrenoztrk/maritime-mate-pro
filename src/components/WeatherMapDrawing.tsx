import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Activity,
  Download,
  Trash2,
  Info,
  TrendingDown,
  TrendingUp,
  Move,
  Snowflake,
  Sun,
  CloudRain,
  Gauge
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Tool = "select" | "high" | "low" | "cold-front" | "warm-front" | "stationary-front" | "occluded-front" | "isobar";

interface MapElement {
  id: string;
  type: "high" | "low" | "cold-front" | "warm-front" | "stationary-front" | "occluded-front" | "isobar";
  x: number;
  y: number;
  points?: { x: number; y: number }[];
  pressure?: number;
}

export const WeatherMapDrawing = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [elements, setElements] = useState<MapElement[]>([]);
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [isobarPressure, setIsobarPressure] = useState(1013);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { toast } = useToast();

  const getMousePosition = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const pos = getMousePosition(e);
    
    if (activeTool === "select") {
      setSelectedId(null);
      return;
    }

    if (activeTool === "high" || activeTool === "low") {
      const newElement: MapElement = {
        id: `element-${Date.now()}`,
        type: activeTool,
        x: pos.x,
        y: pos.y,
        pressure: activeTool === "high" ? 1025 : 995
      };
      setElements(prev => [...prev, newElement]);
      toast({
        title: activeTool === "high" ? "Yüksek Basınç Eklendi" : "Alçak Basınç Eklendi",
        description: activeTool === "high" ? "Antisiklon (H) sistemi yerleştirildi" : "Siklon (L) sistemi yerleştirildi",
      });
    } else {
      setIsDrawing(true);
      setCurrentPoints([pos]);
    }
  }, [activeTool, getMousePosition, toast]);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const pos = getMousePosition(e);
    setCurrentPoints(prev => [...prev, pos]);
  }, [isDrawing, getMousePosition]);

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || currentPoints.length < 2) {
      setIsDrawing(false);
      setCurrentPoints([]);
      return;
    }

    const frontType = activeTool as MapElement["type"];
    const newElement: MapElement = {
      id: `element-${Date.now()}`,
      type: frontType,
      x: currentPoints[0].x,
      y: currentPoints[0].y,
      points: currentPoints,
      pressure: frontType === "isobar" ? isobarPressure : undefined
    };
    
    setElements(prev => [...prev, newElement]);
    setIsDrawing(false);
    setCurrentPoints([]);

    const names: Record<string, string> = {
      "cold-front": "Soğuk Cephe",
      "warm-front": "Sıcak Cephe",
      "stationary-front": "Durağan Cephe",
      "occluded-front": "Tıkanık Cephe",
      "isobar": `${isobarPressure} hPa İzobar`
    };

    toast({
      title: `${names[frontType] || "Çizgi"} Eklendi`,
      description: "Haritaya eklendi",
    });
  }, [isDrawing, currentPoints, activeTool, isobarPressure, toast]);

  const handleClear = () => {
    setElements([]);
    setSelectedId(null);
    toast({
      title: "Harita Temizlendi",
      description: "Tüm çizimler silindi",
    });
  };

  const handleExport = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    canvas.width = 1200;
    canvas.height = 700;
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "#f0f9ff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const link = document.createElement("a");
        link.download = `weather-map-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    
    toast({
      title: "Harita İndirildi",
      description: "Hava haritası PNG olarak kaydedildi",
    });
  };

  const deleteSelected = () => {
    if (selectedId) {
      setElements(prev => prev.filter(el => el.id !== selectedId));
      setSelectedId(null);
      toast({ title: "Silindi", description: "Seçili eleman silindi" });
    }
  };

  const renderPressureSystem = (el: MapElement) => {
    const isHigh = el.type === "high";
    const color = isHigh ? "#3b82f6" : "#ef4444";
    const label = isHigh ? "H" : "L";
    const isSelected = selectedId === el.id;

    return (
      <g 
        key={el.id} 
        onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
        style={{ cursor: "pointer" }}
      >
        <circle
          cx={el.x}
          cy={el.y}
          r={40}
          fill="transparent"
          stroke={color}
          strokeWidth={isSelected ? 5 : 3}
        />
        <text
          x={el.x}
          y={el.y + 10}
          textAnchor="middle"
          fontSize={40}
          fontWeight="bold"
          fill={color}
        >
          {label}
        </text>
        <text
          x={el.x}
          y={el.y + 55}
          textAnchor="middle"
          fontSize={14}
          fill={color}
        >
          {el.pressure} hPa
        </text>
      </g>
    );
  };

  const renderFrontLine = (el: MapElement) => {
    if (!el.points || el.points.length < 2) return null;
    
    const colors: Record<string, string> = {
      "cold-front": "#3b82f6",
      "warm-front": "#ef4444",
      "stationary-front": "#8b5cf6",
      "occluded-front": "#f59e0b",
      "isobar": "#64748b"
    };
    
    const color = colors[el.type] || "#000";
    const pathD = el.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const isSelected = selectedId === el.id;

    const symbols: React.ReactNode[] = [];
    if (el.type !== "isobar") {
      const spacing = 50;
      for (let i = 0; i < el.points.length - 1; i++) {
        const p1 = el.points[i];
        const p2 = el.points[i + 1];
        const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
        const numSymbols = Math.floor(dist / spacing);

        for (let j = 1; j <= numSymbols; j++) {
          const t = j / (numSymbols + 1);
          const x = p1.x + t * (p2.x - p1.x);
          const y = p1.y + t * (p2.y - p1.y);
          const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

          if (el.type === "cold-front") {
            symbols.push(
              <polygon
                key={`${el.id}-sym-${i}-${j}`}
                points="0,-12 8,8 -8,8"
                fill={color}
                transform={`translate(${x}, ${y}) rotate(${angle + 90})`}
              />
            );
          } else if (el.type === "warm-front") {
            symbols.push(
              <circle
                key={`${el.id}-sym-${i}-${j}`}
                cx={x}
                cy={y}
                r={8}
                fill={color}
              />
            );
          } else if (el.type === "stationary-front") {
            if (j % 2 === 0) {
              symbols.push(
                <polygon
                  key={`${el.id}-sym-${i}-${j}`}
                  points="0,-10 7,7 -7,7"
                  fill={color}
                  transform={`translate(${x}, ${y}) rotate(${angle + 90})`}
                />
              );
            } else {
              symbols.push(
                <circle
                  key={`${el.id}-sym-${i}-${j}`}
                  cx={x}
                  cy={y}
                  r={7}
                  fill={color}
                />
              );
            }
          } else if (el.type === "occluded-front") {
            symbols.push(
              <g key={`${el.id}-sym-${i}-${j}`} transform={`translate(${x}, ${y})`}>
                <polygon points="0,-8 6,6 -6,6" fill={color} transform={`rotate(${angle + 90})`} />
                <circle cx={10} cy={0} r={5} fill={color} />
              </g>
            );
          }
        }
      }
    }

    const midIndex = Math.floor(el.points.length / 2);
    const midPoint = el.points[midIndex];

    return (
      <g 
        key={el.id}
        onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
        style={{ cursor: "pointer" }}
      >
        <path
          d={pathD}
          stroke={color}
          strokeWidth={isSelected ? 5 : el.type === "isobar" ? 2 : 3}
          strokeDasharray={el.type === "isobar" ? "5,5" : undefined}
          fill="none"
        />
        {symbols}
        {el.type === "isobar" && midPoint && (
          <text
            x={midPoint.x}
            y={midPoint.y - 10}
            textAnchor="middle"
            fontSize={12}
            fill="#475569"
            style={{ background: "#f0f9ff" }}
          >
            {el.pressure} hPa
          </text>
        )}
      </g>
    );
  };

  const renderCurrentDrawing = () => {
    if (!isDrawing || currentPoints.length < 2) return null;
    
    const colors: Record<string, string> = {
      "cold-front": "#3b82f6",
      "warm-front": "#ef4444",
      "stationary-front": "#8b5cf6",
      "occluded-front": "#f59e0b",
      "isobar": "#64748b"
    };
    
    const color = colors[activeTool] || "#000";
    const pathD = currentPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

    return (
      <path
        d={pathD}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="5,5"
        fill="none"
        opacity={0.7}
      />
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            Hava Haritası Çizim Aracı
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Bu araçla hava haritaları üzerinde basınç sistemleri, cepheler ve izobar çizgileri çizerek 
              meteorolojik analiz yapabilirsiniz. Bir araç seçin ve harita üzerine tıklayarak çizim yapın.
            </AlertDescription>
          </Alert>

          {/* Tool Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Basınç Sistemleri</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeTool === "select" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("select")}
                className="gap-2"
              >
                <Move className="h-4 w-4" />
                Seç
              </Button>
              <Button
                variant={activeTool === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("high")}
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Yüksek Basınç (H)
              </Button>
              <Button
                variant={activeTool === "low" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("low")}
                className="gap-2"
              >
                <TrendingDown className="h-4 w-4" />
                Alçak Basınç (L)
              </Button>
            </div>

            <Separator />

            <h3 className="font-semibold text-sm">Cepheler</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeTool === "cold-front" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("cold-front")}
                className="gap-2"
              >
                <Snowflake className="h-4 w-4 text-blue-500" />
                Soğuk Cephe
              </Button>
              <Button
                variant={activeTool === "warm-front" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("warm-front")}
                className="gap-2"
              >
                <Sun className="h-4 w-4 text-red-500" />
                Sıcak Cephe
              </Button>
              <Button
                variant={activeTool === "stationary-front" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("stationary-front")}
                className="gap-2"
              >
                <CloudRain className="h-4 w-4 text-purple-500" />
                Durağan Cephe
              </Button>
              <Button
                variant={activeTool === "occluded-front" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("occluded-front")}
                className="gap-2"
              >
                <Activity className="h-4 w-4 text-amber-500" />
                Tıkanık Cephe
              </Button>
            </div>

            <Separator />

            <h3 className="font-semibold text-sm">İzobar Çizgisi</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={activeTool === "isobar" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTool("isobar")}
                className="gap-2"
              >
                <Gauge className="h-4 w-4" />
                İzobar
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Basınç:</span>
                <input
                  type="number"
                  value={isobarPressure}
                  onChange={(e) => setIsobarPressure(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-sm border rounded"
                  step={4}
                />
                <span className="text-sm text-muted-foreground">hPa</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Canvas Area */}
          <div className="border rounded-lg overflow-hidden bg-sky-50">
            <svg
              ref={svgRef}
              width="100%"
              height={500}
              style={{ maxWidth: "100%", touchAction: "none" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <rect width="100%" height="100%" fill="#f0f9ff" />
              {elements.map(el => 
                el.type === "high" || el.type === "low" 
                  ? renderPressureSystem(el) 
                  : renderFrontLine(el)
              )}
              {renderCurrentDrawing()}
            </svg>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleClear} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Temizle
            </Button>
            {selectedId && (
              <Button variant="destructive" onClick={deleteSelected} className="gap-2">
                <Trash2 className="h-4 w-4" />
                Seçili Sil
              </Button>
            )}
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              PNG İndir
            </Button>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold text-sm">H</div>
              <span className="text-sm">Yüksek Basınç</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 font-bold text-sm">L</div>
              <span className="text-sm">Alçak Basınç</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="w-6 h-0.5 bg-blue-500"></div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-blue-500"></div>
              </div>
              <span className="text-sm">Soğuk Cephe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="w-6 h-0.5 bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
              <span className="text-sm">Sıcak Cephe</span>
            </div>
          </div>

          {/* Info */}
          <div className="text-sm text-muted-foreground">
            <Badge variant="outline" className="mr-2">İpucu</Badge>
            Basınç sistemleri için tıklayın, cepheler ve izobarlar için sürükleyerek çizin. Seçili elemanı silmek için önce tıklayarak seçin.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
