import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { MobileLayout } from "@/components/MobileLayout";
import { CalculationGridScreen } from "@/components/ui/calculation-grid";

interface TankData {
  tankArea: number;
  liquidHeight: number;
  volume: number;
  liquidDensity: number;
  tankType: 'cargo' | 'ballast' | 'fuel' | 'freshwater';
}

interface TankResults {
  volume: number;
  weight: number;
  moment: number;
}

const TankCalculationsPage = ({ initialTab }: { initialTab?: string } = {}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(initialTab || 'sounding');
  const [tankData, setTankData] = useState<TankData>({
    tankArea: 0,
    liquidHeight: 0,
    volume: 0,
    liquidDensity: 1025,
    tankType: 'ballast'
  });
  const [soundingResults, setSoundingResults] = useState<TankResults | null>(null);

  const calculateSoundingTable = () => {
    const volume = tankData.tankArea * tankData.liquidHeight;
    const weight = volume * (tankData.liquidDensity / 1000);
    const moment = volume * (tankData.liquidHeight / 2);
    
    setSoundingResults({
      volume,
      weight,
      moment
    });
    
    toast({
      title: "Başarılı!",
      description: "Sounding Table hesaplamaları tamamlandı!"
    });
  };

  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Tank"
        title="Tank Hesaplamaları"
      >
        <Card className="bg-card border-border shadow-lg">
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex flex-wrap gap-1 p-2 bg-muted/50 rounded-lg">
                <TabsTrigger value="sounding" className="flex-1 min-w-[120px] text-xs">Sounding Table</TabsTrigger>
              </TabsList>
              
              <div className="mt-8"></div>

              <TabsContent value="sounding" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#2F5BFF]">Su Altı Hacim Hesaplama</h3>
                  <p className="text-sm text-muted-foreground">V = A × h</p>
                  <p className="text-xs text-muted-foreground bg-primary/5 p-2 rounded">
                    <strong>Amaç:</strong> Tank hacmi için basit dikdörtgen formülü kullanılır. 
                    Bu formül pratik tank hesaplamaları için uygundur.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tankArea">Tank Alanı A [m²]</Label>
                      <Input
                        id="tankArea"
                        type="number"
                        step="0.01"
                        value={tankData.tankArea || ''}
                        onChange={(e) => setTankData({...tankData, tankArea: parseFloat(e.target.value)})}
                        placeholder="50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="liquidHeight">Sıvı Yüksekliği h [m]</Label>
                      <Input
                        id="liquidHeight"
                        type="number"
                        step="0.01"
                        value={tankData.liquidHeight || ''}
                        onChange={(e) => setTankData({...tankData, liquidHeight: parseFloat(e.target.value)})}
                        placeholder="2.5"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#2F5BFF]">Ağırlık Hesaplama</h3>
                  <p className="text-sm text-muted-foreground">W = V × ρ</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="volume_weight">Hacim V [m³]</Label>
                      <Input
                        id="volume_weight"
                        type="number"
                        step="0.1"
                        value={tankData.volume || ''}
                        onChange={(e) => setTankData({...tankData, volume: parseFloat(e.target.value)})}
                        placeholder="125"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="liquidDensity">Sıvı Yoğunluğu ρ [kg/m³]</Label>
                      <Input
                        id="liquidDensity"
                        type="number"
                        step="0.1"
                        value={tankData.liquidDensity || ''}
                        onChange={(e) => setTankData({...tankData, liquidDensity: parseFloat(e.target.value)})}
                        placeholder="1025"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tankType">Tank Tipi</Label>
                      <Select
                        value={tankData.tankType || ''}
                        onValueChange={(value) => setTankData({...tankData, tankType: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tank tipi seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fuel">Yakıt Tankı</SelectItem>
                          <SelectItem value="ballast">Balast Tankı</SelectItem>
                          <SelectItem value="freshwater">Tatlı Su Tankı</SelectItem>
                          <SelectItem value="cargo">Kargo Tankı</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#2F5BFF]">Moment Hesaplama</h3>
                  <p className="text-sm text-muted-foreground">M = V × h/2</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="volume_moment">Hacim V [m³]</Label>
                      <Input
                        id="volume_moment"
                        type="number"
                        step="0.1"
                        value={tankData.volume || ''}
                        onChange={(e) => setTankData({...tankData, volume: parseFloat(e.target.value)})}
                        placeholder="125"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="liquidHeight_moment">Sıvı Yüksekliği h [m]</Label>
                      <Input
                        id="liquidHeight_moment"
                        type="number"
                        step="0.01"
                        value={tankData.liquidHeight || ''}
                        onChange={(e) => setTankData({...tankData, liquidHeight: parseFloat(e.target.value)})}
                        placeholder="2.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={calculateSoundingTable} 
                    className="px-8 py-2 bg-[#2F5BFF] hover:bg-[#2F5BFF]/90 text-white"
                  >
                    Hesapla
                  </Button>
                </div>

                {soundingResults && (
                  <div className="space-y-4 p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#1d3e8a]">Sounding Table Sonuçları</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Su Altı Hacim (V)</Label>
                        <div className="text-lg font-bold text-[#2F5BFF]">
                          {soundingResults.volume.toFixed(1)} m³
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Ağırlık (W)</Label>
                        <div className="text-lg font-bold text-[#2F5BFF]">
                          {soundingResults.weight.toFixed(1)} ton
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Moment (M)</Label>
                        <div className="text-lg font-bold text-[#2F5BFF]">
                          {soundingResults.moment.toFixed(1)} ton.m
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </CalculationGridScreen>
    </MobileLayout>
  );
};

export default TankCalculationsPage;
export { TankCalculationsPage as TankCalculations };
