import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function StabilityGZCurvePage() {
  const [gm, setGm] = useState<number>(0);
  const [heelAngle, setHeelAngle] = useState<number>(0);

  const calculateGZ = () => {
    if (gm && heelAngle) {
      const angleRad = (heelAngle * Math.PI) / 180;
      const gz = gm * Math.sin(angleRad);
      return gz.toFixed(3);
    }
    return null;
  };

  const gz = calculateGZ();

  return (
    <div className="container mx-auto p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            GZ Curve and Stability Arm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gm">GM (Metacentric Height) (m)</Label>
              <Input
                id="gm"
                type="number"
                step="0.1"
                value={gm || ""}
                onChange={(e) => setGm(parseFloat(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heelAngle">Angle of heel (degrees)</Label>
              <Input
                id="heelAngle"
                type="number"
                value={heelAngle || ""}
                onChange={(e) => setHeelAngle(parseFloat(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>

          {gz && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-3 text-primary">Calculation Result</h4>
              <p className="text-2xl font-bold">{gz} m</p>
              <p className="text-sm text-muted-foreground mt-1">Stability Arm (GZ)</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">Formula:</h4>
            <p className="text-xs font-mono">GZ = GM × sin(θ)</p>
            <p className="text-xs text-muted-foreground mt-2">
              θ: Angle of heel (in radians)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
