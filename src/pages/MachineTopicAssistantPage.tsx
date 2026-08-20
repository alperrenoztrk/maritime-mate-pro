import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { AssistantInterface } from "@/components/AssistantInterface";

const topicAssistantConfig: Record<string, { quickPrompts: string[]; systemPrompt: string }> = {
  thermodynamics: {
    quickPrompts: [
      "Compare the efficiency differences between the Otto and Diesel cycles.",
      "How is exhaust gas economizer efficiency calculated?",
      "How are the effect of fouling and the change in LMTD interpreted in a heat exchanger?",
      "Why is there a difference between Carnot efficiency and actual cycle efficiency?",
    ],
    systemPrompt: "You are an expert in marine thermodynamics and heat engineering. You provide guidance on thermal cycles, energy conversion, efficiency calculations and heat transfer. Write your answers technically and supported by formulas. Detect the language the user asked the question in and answer in that same language.",
  },
  "fluid-mechanics": {
    quickPrompts: [
      "What are the signs of cavitation in a centrifugal pump and the measures against it?",
      "How is pressure loss in a pipeline calculated?",
      "How do flow and pressure change for pumps running in parallel?",
      "How do I determine the flow regime from the Reynolds number?",
    ],
    systemPrompt: "You are an expert in marine fluid mechanics. You provide technical guidance on pump selection, pipe calculations, pressure losses, valve types and flow analysis. Detect the language the user asked the question in and answer in that same language.",
  },
  "machine-elements": {
    quickPrompts: [
      "How is the propeller shaft diameter calculated?",
      "What are the alarm and danger thresholds in vibration analysis?",
      "What are the signs of bearing failure and the methods for checking it?",
      "What are the types of corrosion and which types are most commonly seen on board?",
    ],
    systemPrompt: "You are an expert in marine machinery components and materials. You provide technical advice on shafts, bearings, couplings, vibration analysis, material selection and corrosion management. Detect the language the user asked the question in and answer in that same language.",
  },
  "diesel-engines": {
    quickPrompts: [
      "What are the possible causes of a high exhaust temperature on one cylinder?",
      "How do two-stroke and four-stroke engines compare?",
      "What are the advantages of a common rail injection system?",
      "What are the signs of a scavenge fire and the response procedure?",
    ],
    systemPrompt: "You are an expert in marine diesel engines. You are an experienced engineer in two- and four-stroke engines, the combustion process, injection systems, performance parameters and fault finding. Detect the language the user asked the question in and answer in that same language.",
  },
  "ship-systems": {
    quickPrompts: [
      "What is the correct sequence of the fuel treatment system?",
      "What are the possible causes of a drop in lubricating oil pressure?",
      "What is the difference between the HT and LT cooling circuits and how are they connected?",
      "What are the effects of high back pressure in the exhaust system?",
    ],
    systemPrompt: "You are an expert in ship machinery systems. You provide technical guidance on fuel, lubrication, cooling, air/exhaust and steam systems. Detect the language the user asked the question in and answer in that same language.",
  },
  auxiliary: {
    quickPrompts: [
      "What is the procedure for paralleling generators?",
      "How do boiler water level control and alarm systems work?",
      "How is separator performance assessed?",
      "Which factors affect fresh water generator efficiency?",
    ],
    systemPrompt: "You are an expert in ship auxiliary machinery. You provide guidance on generators, boilers, separators, compressors, fresh water generators and pump systems. Detect the language the user asked the question in and answer in that same language.",
  },
  "fuel-technology": {
    quickPrompts: [
      "How should the changeover procedure from HFO to MGO be carried out?",
      "What does the CCAI value tell us about fuel quality?",
      "What are the root causes of fuel filter clogging and separator problems?",
      "How is BOG managed on LNG-fuelled ships?",
    ],
    systemPrompt: "You are an expert in fuel technology and management. You advise on the properties of HFO, MGO and LNG, treatment processes, viscosity control and fuel-related failures. Detect the language the user asked the question in and answer in that same language.",
  },
  "cooling-hvac": {
    quickPrompts: [
      "What should be done if the pressures in the refrigeration system are higher than normal?",
      "Is a changeover from R-134a to R-290 possible?",
      "What are the temperature settings for the provision cold rooms?",
      "How to control humidity in the air conditioning system?",
    ],
    systemPrompt: "You are an expert in marine refrigeration and air conditioning systems. You provide guidance on refrigeration cycles, refrigerants, provision cooling, reefer cargo and air conditioning systems. Detect the language the user asked the question in and answer in that same language.",
  },
  electrical: {
    quickPrompts: [
      "What are the steps for bringing emergency power on line in a black-out scenario?",
      "What is the earth fault alarm procedure and how is the fault traced?",
      "What is the shore connection procedure and what are the safety precautions?",
      "How is selective protection coordination set?",
    ],
    systemPrompt: "You are an expert in ship electrical systems. You provide guidance on AC/DC distribution, generator synchronisation, protection systems, cable calculations and black-out management. Detect the language the user asked the question in and answer in that same language.",
  },
  automation: [
    "How are PID control parameters tuned?",
    "What is the alarm system test procedure?",
    "How is a 4-20 mA signal calibrated?",
    "How is bridge alarm management handled on UMS ships?",
  ].length ? {
    quickPrompts: [
      "How are PID control parameters tuned?",
      "What is the alarm system test procedure?",
      "How is a 4-20 mA signal calibrated?",
      "How is bridge alarm management handled on UMS ships?",
    ],
    systemPrompt: "You are an expert in ship automation and control systems. You advise on sensors, transmitters, PLCs, alarm/monitoring systems and remote control. Detect the language the user asked the question in and answer in that same language.",
  } : { quickPrompts: [], systemPrompt: "" },
  "engine-room-ops": {
    quickPrompts: [
      "What is the machinery preparation checklist before departure?",
      "What is the engine watch handover procedure?",
      "What are the steps for starting the main engine?",
      "What engine room preparations are needed for port operations?",
    ],
    systemPrompt: "You are an expert in engine room operations. You provide guidance on watchkeeping procedures, preparation for sea, starting/stopping and port operations. Detect the language the user asked the question in and answer in that same language.",
  },
  maintenance: {
    quickPrompts: [
      "How is a planned maintenance system (PMS) used effectively?",
      "How are oil analysis results interpreted?",
      "What is the preparation checklist for class surveys?",
      "How are MTBF and MTTR values used in maintenance planning?",
    ],
    systemPrompt: "You are an expert in ship maintenance and upkeep management. You advise on planned maintenance, predictive maintenance, oil analysis, class requirements and maintenance KPIs. Detect the language the user asked the question in and answer in that same language.",
  },
  "engine-room-safety": {
    quickPrompts: [
      "What are the first response steps in an engine room fire?",
      "What is the risk of a crankcase explosion and how is it prevented?",
      "What is the procedure for releasing the CO₂ extinguishing system?",
      "What is the enclosed space entry procedure for the engine room?",
    ],
    systemPrompt: "You are an expert in engine room safety. You provide guidance on fire safety, explosion risks, emergency shutdown systems, enclosed space safety and machinery accidents. Detect the language the user asked the question in and answer in that same language.",
  },
  "environment-machine": {
    quickPrompts: [
      "What should be done when the OWS exceeds the 15 ppm limit?",
      "What are the sludge tank management and disposal procedures?",
      "Which checks are required for the IAPP certificate?",
      "What does the shipboard waste management plan cover?",
    ],
    systemPrompt: "You are an expert in ship environmental management and MARPOL. You advise on bilge, waste oil and sewage systems, emission control and environmental compliance. Detect the language the user asked the question in and answer in that same language.",
  },
  erm: {
    quickPrompts: [
      "How is a risk assessment carried out in the engine room?",
      "What are effective strategies for fatigue management?",
      "How can communication errors within the team be reduced?",
      "How is a near-miss reporting system set up?",
    ],
    systemPrompt: "You are an expert in Engine Resource Management (ERM). You provide guidance on watch management, human factors, decision making, leadership, communication and risk assessment. Detect the language the user asked the question in and answer in that same language.",
  },
  "energy-efficiency": {
    quickPrompts: [
      "What can be done to improve the CII rating?",
      "How is the EEXI calculation carried out?",
      "How can the efficiency of a waste heat recovery system be increased?",
      "How are fuel savings achieved through trim optimisation?",
    ],
    systemPrompt: "You are an expert in ship energy efficiency. You provide technical advice on EEDI, EEXI, CII, SEEMP, waste heat recovery, trim optimisation and fuel saving. Detect the language the user asked the question in and answer in that same language.",
  },
};

export default function MachineTopicAssistantPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const config = topicSlug ? topicAssistantConfig[topicSlug] : null;

  if (!topic || !config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  return (
    <AssistantInterface
      title={`${topic.title} Assistant`}
      badge={topic.title}
      quickPrompts={config.quickPrompts}
      systemPrompt={config.systemPrompt}
      placeholder={`${topic.title} — write your question here...`}
      icon={topic.icon}
      accentGradient={topic.accent}
      iconColor="text-white"
    />
  );
}
