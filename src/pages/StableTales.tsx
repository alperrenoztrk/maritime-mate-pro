import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StableTalesCalculator } from "@/components/stable-tales/StableTalesCalculator";
import { PendulumStabilityCalc } from "@/components/stable-tales/PendulumStabilityCalc";
import { CraneBoomCalculations } from "@/components/stable-tales/CraneBoomCalculations";
import { DrydockStabilityCalc } from "@/components/stable-tales/DrydockStabilityCalc";
import { AdvancedSOLASChecker } from "@/components/stable-tales/AdvancedSOLASChecker";
import { StabilityReportGenerator } from "@/components/stable-tales/StabilityReportGenerator";

export default function StableTalesPage() {
  return (
    <div className="container mx-auto p-6 space-y-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">
            Stable Tales - Advanced Ship Stability Analysis
          </h1>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="calculator">Main Calculation</TabsTrigger>
            <TabsTrigger value="pendulum">Pendulum Method</TabsTrigger>
            <TabsTrigger value="crane">Crane/Dumbar</TabsTrigger>
            <TabsTrigger value="drydock">Pool Operation</TabsTrigger>
            <TabsTrigger value="solas">SOLAS Criteria</TabsTrigger>
            <TabsTrigger value="report">Create Report</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4">
            <StableTalesCalculator />
          </TabsContent>

          <TabsContent value="pendulum" className="space-y-4">
            <PendulumStabilityCalc />
          </TabsContent>

          <TabsContent value="crane" className="space-y-4">
            <CraneBoomCalculations />
          </TabsContent>

          <TabsContent value="drydock" className="space-y-4">
            <DrydockStabilityCalc />
          </TabsContent>

          <TabsContent value="solas" className="space-y-4">
            <AdvancedSOLASChecker />
          </TabsContent>

          <TabsContent value="report" className="space-y-4">
            <StabilityReportGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}