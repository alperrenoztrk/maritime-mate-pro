import React from "react";
import AnalogClock from "@/components/AnalogClock";
import { Helmet } from "react-helmet-async";

const ClockPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Helmet>
        <title>Clock</title>
        <meta name="description" content="An analogue clock with properly placed numerals" />
      </Helmet>
      <AnalogClock size={320} showSecondHand className="" />
    </div>
  );
};

export default ClockPage;

