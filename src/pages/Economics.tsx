import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { EconomicCalculations } from "@/components/calculations/EconomicCalculations";

const Economics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Commercial Operations in Maritime Business
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg border-0">
                      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">Maritime Economics</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <EconomicCalculations />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Economics;