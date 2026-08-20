import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Ship, 
  Waves, 
  Calculator, 
  Scale, 
  Anchor, 
  BarChart3,
  FileText,
  Gauge
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DraftSurveyMenu = () => {
  const navigate = useNavigate();

  const draftCalculations = [
    {
      title: "Standard Draft Survey",
      description: "General cargo draft calculation",
      icon: Ship,
      path: "/draft-survey-standard",
      color: "bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900"
    },
    {
      title: "Bunker Measurement",
      description: "Fuel tonnage calculation",
      icon: Gauge,
      path: "/draft-survey-bunker",
      color: "bg-orange-50 dark:bg-orange-950 hover:bg-orange-100 dark:hover:bg-orange-900"
    },
    {
      title: "Ballast Calculation",
      description: "Ballast water draft effect",
      icon: Waves,
      path: "/draft-survey-ballast",
      color: "bg-cyan-50 dark:bg-cyan-950 hover:bg-cyan-100 dark:hover:bg-cyan-900"
    },
    {
      title: "Density Correction",
      description: "Seawater density effect",
      icon: BarChart3,
      path: "/draft-survey-density",
      color: "bg-purple-50 dark:bg-purple-950 hover:bg-purple-100 dark:hover:bg-purple-900"
    },
    {
      title: "Port Account",
      description: "Port specific calculations",
      icon: Anchor,
      path: "/draft-survey-port",
      color: "bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 dark:hover:bg-amber-900"
    },
    {
      title: "Analysis & Report",
      description: "Result analysis and reporting",
      icon: FileText,
      path: "/draft-survey-analysis",
      color: "bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 dark:hover:bg-rose-900"
    },
    {
      title: "Calculator",
      description: "Quick draft calculations",
      icon: Calculator,
      path: "/draft-survey-calculator",
      color: "bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900"
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Draft Survey Calculations</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {draftCalculations.map((calc, index) => {
          const IconComponent = calc.icon;
          return (
            <Card 
              key={index} 
              className={`${calc.color} border-0 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] duration-control hover:scale-105 cursor-pointer`}
              onClick={() => navigate(calc.path)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background/50">
                    <IconComponent className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-foreground">
                      {calc.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            About Draft Survey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Draft survey is the draft measurements of the ship before and after cargo loading/unloading. 
            It is a method of calculating cargo tonnage by comparing These calculations are based on ISGOTT 
            is carried out in accordance with the standards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DraftSurveyMenu;