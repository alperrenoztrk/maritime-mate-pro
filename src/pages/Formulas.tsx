import { MobileLayout } from "@/components/MobileLayout";
import { Brain } from "lucide-react";
import { UnifiedMaritimeAssistant } from "@/components/UnifiedMaritimeAssistant";

const Formulas = () => {
  return (
    <MobileLayout>
      {/* Header Section - Mobil optimize */}
      <div className="text-center mb-6 px-2">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
          <h1
            className="text-xl sm:text-2xl font-bold text-foreground leading-tight break-words nature-title"
            data-translatable
          >
            Mark'a Sor
          </h1>
        </div>
      </div>

      <UnifiedMaritimeAssistant />
    </MobileLayout>
  );
};

export default Formulas;
