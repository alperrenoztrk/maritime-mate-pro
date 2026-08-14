import React from "react";
import AnalogClock from "@/components/AnalogClock";
import { Helmet } from "react-helmet-async";

const ClockPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Helmet>
        <title>Time</title>
        <meta name="description" content="Analogue clock with properly placed numerals" />
      </Helmet>
      <AnalogClock size={320} showSecondHand className="" />
    </div>
  );
};

export default ClockPage;

