import type { SourceRef } from "@/data/courseContent/types";

interface RuleSection {
  subtitle: string;
  content: string[];
}

interface RuleCategory {
  title: string;
  /** Gerçek standart/kaynak referansı (güverte RuleGroup ile parite). */
  source?: SourceRef;
  rules: RuleSection[];
}

export const machineTopicRules: Record<string, RuleCategory[]> = {
  thermodynamics: [
    { title: "SOLAS – Engine Room Thermal Management", source: { code: "SOLAS II-2/Reg.4", detail: "Hot surface and fuel leakage protection" }, rules: [
      { subtitle: "Thermal Insulation", content: ["Pipes and surfaces with surface temperatures exceeding 220°C must be insulated (SOLAS II-2/Reg.4)", "Protection plates are required to prevent fuel leakage from contacting hot surfaces.", "Exhaust manifold and turbocharger surroundings should be checked regularly"] },
      { subtitle: "Heaters and Heat Exchangers", content: ["Safety valve and pressure gauge are mandatory in steam heaters", "Continuous temperature monitoring with bimetallic thermometer or RTD is required in heat exchangers"] },
    ]},
    { title: "Pressure Vessels and Steam Systems", source: { code: "Class Rules (IACS) / PED", detail: "Pressure equipment design and testing" }, rules: [
      { subtitle: "Safety Valves", content: ["Steam boilers must have at least two safety valves", "The set pressure is adjusted so that it does not exceed the design pressure (typically ±3%)", "Valve opening capacity must accommodate full load steam production"] },
      { subtitle: "Periodic Test", content: ["Periodic hydrostatic test for pressure vessels: ≈ 1.5 × working pressure", "Water level indicators and low-water alarm/cutout should be tested"] },
    ]},
    { title: "Exhaust and Waste Heat Recovery (WHRS)", source: { code: "MARPOL Annex VI / SOLAS II-2", detail: "Exhaust gas boiler and efficiency" }, rules: [
      { subtitle: "Exhaust Gas Economizer", content: ["Dry/wet cleaning procedures should be applied against the risk of soot fire.", "At low load the economizer inlet temperature should be monitored for dew point and acid corrosion"] },
      { subtitle: "Waste Heat Evaluation", content: ["Atık ısı; tatlı su üreteci, yakıt/yağ ısıtma ve buhar üretimine yönlendirilerek verim artırılır"] },
    ]},
  ],
  "fluid-mechanics": [
    { title: "Pump and Pipe Standards", source: { code: "SOLAS II-1/Reg.21", detail: "Bilge pumping arrangements" }, rules: [
      { subtitle: "SOLAS – Bilge Pumps", content: ["At least 2 independent pumps required (SOLAS II-1/Reg.21)", "The emergency bilge pump must be able to be operated from outside the engine room.", "Bilge pipe diameter: d = 25 + 1.68√(L(B+D)) mm"] },
      { subtitle: "Pressure Vessels", content: ["Air tanks must be certified by the classification society", "Safety valve set pressure: 10% more than nominal pressure", "Periodic hydrostatic test: 1.5 × working pressure"] },
    ]},
    { title: "Ballast and Pipe Circuits", source: { code: "SOLAS II-1 / BWM Convention", detail: "Ballast arrangement and treatment" }, rules: [
      { subtitle: "Ballast System", content: ["Ballast pumps and piping must have sufficient redundancy", "In accordance with the Ballast Water Management Convention (D-2), the treatment system capacity must meet the ballast pump flow rate."] },
      { subtitle: "Valve and Insulation", content: ["Suitable isolation valves must be present in pipes between watertight compartments.", "Cross-flooding devices must comply with the damage control plan"] },
    ]},
    { title: "Cavitation and Compressed Air", source: { code: "Class / IACS UR", detail: "Pump NPSH and air circuit" }, rules: [
      { subtitle: "NPSH and Cavitation", content: ["Available NPSH > required NPSH; otherwise cavitation and wear will occur", "Suction side filter/strainer pressure difference should be monitored"] },
      { subtitle: "Compressed Air Circuit", content: ["Starting air tanks must be at least two and have a total capacity of 12 consecutive starts (Class)", "There must be a safety valve and drainage (water/oil separator) in the air circuit."] },
    ]},
  ],
  "machine-elements": [
    { title: "Material and Construction Standards", source: { code: "IACS UR M / ISO 10816-6", detail: "Material, shafting and vibration" }, rules: [
      { subtitle: "Class Requirements", content: ["Shaft line materials must be class approved steel", "Propeller shaft diameter is calculated by class formulas (IACS UR M68)", "Impeller material: Selected according to CU1–CU4 classification"] },
      { subtitle: "Vibration Limits", content: ["ISO 10816-6: ship machinery vibration classification", "Alarm: 11.2 mm/s (rms), Danger: 18 mm/s (rms)", "Torsional vibration analysis: barred speed range application"] },
    ]},
    { title: "Shaft, Bearing and Propeller", source: { code: "IACS UR M68 / class rules", detail: "Propulsion system components" }, rules: [
      { subtitle: "Shaft Sizing", content: ["Intermediate and tail shaft diameters are verified by classy torsional/bending formulas", "Stern tube bearing wear-down should be measured and limit values should be monitored"] },
      { subtitle: "Bearing and Lubrication", content: ["White metal bearing temperature should be monitored and an alarm should be given if the limit is exceeded.", "Minimum speed/temperature conditions for lubrication film thickness must be maintained"] },
    ]},
    { title: "Fasteners and Inspection", source: { code: "Class / NDT standards", detail: "Bolting, welding and non-destructive examination" }, rules: [
      { subtitle: "Bolt and Weld", content: ["Critical bolts must be tightened to torque/tension values according to the manufacturer's instructions", "Welding seams must be done by approved procedure (WPS) and qualified welder"] },
      { subtitle: "Non-Destructive Testing (NDT)", content: ["Crack control is carried out periodically with MPI/UT/PT in critical areas.", "Findings are reported to the class surveyor and recorded"] },
    ]},
  ],
  "diesel-engines": [
    { title: "MARPOL Annex VI – Emissions", source: { code: "MARPOL Annex VI Reg.13", detail: "NOx Tier I/II/III limits" }, rules: [
      { subtitle: "NOx Limits", content: ["Tier I: ≤ 17 g/kWh (n < 130 rpm)", "Tier II: ≤ 14.4 g/kWh (n < 130 rpm)", "Tier III (ECA): ≤ 3.4 g/kWh (n < 130 rpm) — requires SCR or EGR"] },
      { subtitle: "Engine Certification", content: ["EIAPP certification is mandatory for every engine", "Technical file must be on board", "Engine parameters should not deviate from the values in the file"] },
    ]},
    { title: "Manufacturer and Class Requirements", source: { code: "Maker / Class PMS", detail: "Periodic maintenance intervals" }, rules: [
      { subtitle: "Periodic Checks", content: ["Cylinder head: check every 8,000–16,000 operating hours", "Piston and ring: change/check every 16,000–24,000 hours", "Crank bearings: checked by opening the crankcase every 24,000 hours"] },
      { subtitle: "Performance Monitoring", content: ["Maximum combustion pressure (Pmax), exhaust temperatures and SFOC should be monitored as a trend", "Cylinder balance is checked with indicator diagram/PMI"] },
    ]},
    { title: "Crankcase and Safety Device", source: { code: "SOLAS II-1 / IACS UR M", detail: "Explosion protection and safety" }, rules: [
      { subtitle: "Crankcase Protection", content: ["A crankcase explosion relief valve is mandatory for engines with a diameter of ≥ 200 mm", "Must have Oil Mist Detector (OMD) or bearing temperature monitoring system"] },
      { subtitle: "Starter Air Safety", content: ["There must be a flame arrester and explosion vent in the starter air manifold.", "Overspeed protection and emergency stop should be tested"] },
    ]},
  ],
  "ship-systems": [
    { title: "Fuel System Rules", source: { code: "ISO 8217 / MARPOL Annex I", detail: "Fuel quality and tank arrangement" }, rules: [
      { subtitle: "ISO 8217 Fuel Standard", content: ["Bunker fuel must comply with ISO 8217 specifications", "BDN (Bunker Delivery Note) must be kept for 3 years", "The fuel sample is kept under MARPOL for at least 12 months"] },
      { subtitle: "Fuel Tanks", content: ["Double-walled fuel tank: Mandatory on ships over 600 DWT (MARPOL Annex I)", "Quick-closing valve: mandatory on all fuel tanks", "Overflow alarm and high level alarm are required"] },
    ]},
    { title: "Lubrication and Cooling Systems", source: { code: "Class Rules / Maker", detail: "LO and cooling circuit" }, rules: [
      { subtitle: "Lubrication System", content: ["LO pressure must be protected by low pressure alarm and automatic stop", "LO filter pressure difference should be monitored and an alarm should be given in case of by-pass."] },
      { subtitle: "Cooling System", content: ["Temperature and pressure are monitored in central cooling (HT/LT) circuits", "Seawater system is kept well maintained with anti-fouling/anodic protection"] },
    ]},
    { title: "Steering Gear", source: { code: "SOLAS II-1/Reg.29", detail: "Steering gear yedeklilik" }, rules: [
      { subtitle: "Redundancy and Performance", content: ["The main steering gear must be able to move the rudder 35°–35° (opposite) in 28 seconds.", "Auxiliary steering gear or two independent power units must be provided"] },
      { subtitle: "Testing and Drill", content: ["Steering gear must be tested within 12 hours before departure", "Emergency steering drills should be performed every 3 months"] },
    ]},
  ],
  auxiliary: [
    { title: "Auxiliary Machinery Rules", source: { code: "SOLAS II-1/Reg.44", detail: "Emergency power and boiler safety" }, rules: [
      { subtitle: "Generator", content: ["The emergency generator must be activated automatically within 45 seconds (SOLAS II-1/Reg.44)", "Emergency generator fuel capacity: min 18 hours (passenger), min 18 hours (load)", "Reverse power relay is mandatory in parallel operation"] },
      { subtitle: "Boiler", content: ["Safety valve: should open within 3% of set pressure", "Water level alarm: automatic shut-off at low-low level", "Flame monitoring (flame eye): If there is no flame within 5 seconds, fuel cut off"] },
    ]},
    { title: "Separators and Air Compressors", source: { code: "MARPOL Annex I / Class", detail: "OWS and compressed air" }, rules: [
      { subtitle: "Oily Water Separator (OWS)", content: ["Sea discharge must be stopped with 15 ppm alarm and automatic three-way valve", "OWS outlet concentration ≤ 15 ppm; Oil Record Book Part I record is kept"] },
      { subtitle: "Air Compressor", content: ["Starting air tanks must have a total capacity of 12 consecutive starts", "There must be a safety valve, drainage and overtemperature protection."] },
    ]},
    { title: "Fresh Water and Hydrophore", source: { code: "Class / Health Regulations", detail: "Drinking water and evaporator" }, rules: [
      { subtitle: "Fresh Water Generator", content: ["The evaporator should not be operated in areas close to ports/shores (usually < 12 nm)", "Produced water is made drinkable by mineralization/disinfection (UV or chlorination)"] },
      { subtitle: "Hydrophore System", content: ["Drinking water tanks should be closed and ventilated to avoid contamination.", "Periodic water analysis (microbiological) should be performed"] },
    ]},
  ],
  "fuel-technology": [
    { title: "Fuel Quality and Management Rules", source: { code: "MARPOL Annex VI Reg.14/18", detail: "Sulphur limit and fuel quality" }, rules: [
      { subtitle: "MARPOL Annex VI – Sulfur", content: ["Global sulfur limit: 0.50% m/m (after 2020)", "ECA zones: 0.10% m/m", "Washing water criteria when using scrubber: pH ≥ 6.5, PAH ≤ 50 μg/L"] },
      { subtitle: "Fuel Change Procedure", content: ["The temperature difference in the HFO → MGO transition should be maximum 2°C/min", "Risk of thermal shock: sudden cooling damages pumps and injectors", "Change time and tanks must be recorded in the logbook."] },
    ]},
    { title: "Operation Bunker", source: { code: "MARPOL Annex VI Reg.18 / ISGOTT", detail: "BDN, sampling and safety" }, rules: [
      { subtitle: "Bunker Procedure", content: ["Pre-bunker checklist, blind plug control and SOPEP/spill equipment must be ready", "Drip tray and scupper stoppers must be in place around the manifold."] },
      { subtitle: "BDN and Sample", content: ["BDN is stored for at least 3 years; MARPOL sample is kept sealed for at least 12 months", "Sampling should be representative by continuous drip method."] },
    ]},
    { title: "ISO 8217 Specification", source: { code: "ISO 8217", detail: "Marine fuel spesifikasyon parametreleri" }, rules: [
      { subtitle: "Critical Parameters", content: ["Viscosity, density, sulfur, water, ash, CCAI and sediment (TSP) limit values are checked", "Cat fines (Al+Si) ≤ 60 mg/kg (delivered); Typical target at engine inlet ≤ 15 mg/kg"] },
      { subtitle: "Incompatible Fuel", content: ["Notification to the supplier for out-of-specification fuel and de-bunkering if necessary is evaluated", "Mixing of different fuels is avoided due to the risk of instability/sludge"] },
    ]},
  ],
  "cooling-hvac": [
    { title: "Refrigerant Rules", source: { code: "Kigali / Montreal Protocol", detail: "HFC reduction and leak management" }, rules: [
      { subtitle: "Kigali Amendment (Montreal Protocol)", content: ["Gradual reduction of HFC fluids (R-134a, R-404A) is mandatory", "Low GWP fluids should be preferred in new systems (R-290, R-744)", "Leak detection: annual inspection and registration is mandatory"] },
      { subtitle: "SOLAS – Refrigeration Safety", content: ["Refrigerant gas leak alarm: should be displayed in the machine control room", "Breathing apparatus and alarm system are mandatory in NH₃ (R-717) systems", "Engine room ventilators should be activated automatically in case of leakage"] },
    ]},
    { title: "Food Cooling and Hygiene", source: { code: "SOLAS / Health Regulations", detail: "Cold store and food safety" }, rules: [
      { subtitle: "Cold Storage Temperatures", content: ["Frozen food stores are typically kept ≤ −18°C; temperature must be constantly monitored", "Separate cooling rooms/temperatures should be provided for different food groups"] },
      { subtitle: "Hygiene and Maintenance", content: ["Defrosting and cleaning should be done periodically and drains should be kept open.", "Temperature records (data logger) should be kept"] },
    ]},
    { title: "Air Conditioning and Ventilation (HVAC)", source: { code: "ISO 7547 / Class", detail: "Comfort air conditioning and space ventilation" }, rules: [
      { subtitle: "Comfort Air Conditioning", content: ["Design temperature and humidity conditions (ISO 7547) must be met for living spaces", "Fresh air flow and filtration should be sufficient for indoor air quality"] },
      { subtitle: "Engine Room Ventilation", content: ["There must be sufficient fan capacity for combustion air and space cooling.", "Ventilator remote stop and damper closure should be provided in case of fire"] },
    ]},
  ],
  electrical: [
    { title: "IEC 60092 – Ship Electrical Standards", source: { code: "IEC 60092 / SOLAS II-1", detail: "Distribution and emergency power" }, rules: [
      { subtitle: "Distribution System", content: ["The main distribution system should usually be IT (isolated neutral) grounded", "Earth leakage monitoring device is mandatory (IEC 60092-502)", "Selective protection: step settings must be made correctly"] },
      { subtitle: "Emergency Power", content: ["Emergency switchboard must be located in a separate compartment from the main switchboard.", "Emergency power sources: navigation lights, alarm systems, emergency lighting, fire pumps", "Transition time: full load supply within 45 seconds (SOLAS II-1/Reg.44)"] },
    ]},
    { title: "Battery and Emergency Lighting", source: { code: "SOLAS II-1 / III", detail: "Transitional emergency power and lighting" }, rules: [
      { subtitle: "Battery Systems", content: ["The battery room must be properly ventilated (hydrogen accumulation must be prevented)", "Temporary emergency power supply (battery) provides power until the emergency generator is activated"] },
      { subtitle: "Emergency Lighting and Sign", content: ["Emergency lighting duration must be met in escape routes and assembly areas.", "Low-lying lighting (LLL) and markings must be well-maintained"] },
    ]},
    { title: "High Voltage (HV) Safety", source: { code: "IEC 60092-503", detail: "HV system safety" }, rules: [
      { subtitle: "HV Operation Safety", content: ["Permit-to-work, isolation and grounding (LOTO) applies for work on HV equipment", "Qualified personnel and appropriate PPE (arc flash) required"] },
      { subtitle: "Protection and Grounding", content: ["Interlocking and test/measurement procedures must be applied", "Ground fault and overcurrent protection must be set selectively"] },
    ]},
  ],
  automation: [
    { title: "Automation Standards", source: { code: "SOLAS II-1/Reg.51 / IACS UR E", detail: "Alarm and UMS requirements" }, rules: [
      { subtitle: "Alarm System (SOLAS II-1/Reg.51)", content: ["The alarm system must have independent power supply", "Unacknowledged alarm must alert again in 30 minutes", "Cabin alarm: critical alarms must be transmitted to crew quarters"] },
      { subtitle: "Periodless Engine Room (UMS)", content: ["All critical parameters must be monitored for UMS certification", "Bridge alarm panel: main engine, generator and tank levels", "Fire detection: engine room fire detection must be independent"] },
    ]},
    { title: "Monitoring and Control Systems", source: { code: "IACS UR E10/E22", detail: "Sensors, PLC and type approval" }, rules: [
      { subtitle: "Sensor and Measurement", content: ["Redundancy and fail-safe design is applied in critical measurements", "Sensor calibration should be done periodically and records should be kept."] },
      { subtitle: "PLC/DCS and Type Approval", content: ["Control equipment must be class type approved (EMC, environmental testing)", "Software changes must be made under management (version control)"] },
    ]},
    { title: "Cyber Security (OT)", source: { code: "IMO MSC-FAL.1/Circ.3 / IACS UR E26-E27", detail: "Ship cyber risk management" }, rules: [
      { subtitle: "Risk Management", content: ["Cyber risks should be evaluated within the scope of SMS (ISM) (after 2021)", "OT/IT network separation and access control must be implemented"] },
      { subtitle: "Continuity and Backup", content: ["Critical system configurations should be backed up, restoration tested", "USB/portable media and remote access must be kept under control"] },
    ]},
  ],
  "engine-room-ops": [
    { title: "Operation Rules", source: { code: "STCW A-VIII/2 / ISM Code", detail: "Watchkeeping and procedures" }, rules: [
      { subtitle: "STCW – Watch Keeping", content: ["Machinery watch: Regulated in accordance with STCW Code A-VIII/2", "Min. rest: in a 10 hour/24 hour period", "Watch handover: the status of all running systems must be transferred"] },
      { subtitle: "ISM Code – Procedures", content: ["There must be a written procedure for all critical operations.", "Procedure deviations should be reported and root cause analysis performed", "Emergency drills: should be conducted monthly and recorded"] },
    ]},
    { title: "Working and Rest Hours", source: { code: "STCW A-VIII/1 / MLC 2006", detail: "Fatigue prevention" }, rules: [
      { subtitle: "Rest Limits", content: ["Min. 10 hours rest/24 hours and 77 hours/7 days should be provided", "Rest can be divided into two parts at most; one piece must be ≥ 6 hours"] },
      { subtitle: "Recording and Monitoring", content: ["A record of working/rest hours must be kept and be available for audit.", "Exceptions must remain within the limits of the regulation."] },
    ]},
    { title: "Maneuvering and Bridge-Machine Coordination", source: { code: "ISM / Bridge-Engine Procedures", detail: "Stand-by and communications" }, rules: [
      { subtitle: "Stand-by Operation", content: ["Main engine, rudder and auxiliaries should be tested before the maneuver (pre-arrival checklist).", "Telegraph/command compliance and feedback must be verified"] },
      { subtitle: "Contact", content: ["Clear command and confirmation (closed-loop) communication between the bridge and the machine is implemented", "Emergency procedures should be ready for critical situations (blackout, loss of control)"] },
    ]},
  ],
  maintenance: [
    { title: "Maintenance Rules", source: { code: "Class Rules / ISM Code", detail: "PMS and survey regime" }, rules: [
      { subtitle: "Class Requirements", content: ["PMS (Planned Maintenance System): all equipment maintenance records must be kept", "Special survey: full comprehensive check every 5 years", "Intermediate survey: within 2.5 years ± 6 months", "Continuous survey: specific groups of machines are checked sequentially"] },
      { subtitle: "ISM Code – Maintenance", content: ["Critical equipment should be identified and placed on a priority maintenance plan", "In maintenance records: date, work done, spare parts, measurement results", "Malfunction and near-miss events must be reported"] },
    ]},
    { title: "Survey Regime and Condition Monitoring", source: { code: "IACS / Class", detail: "Survey types and CBM" }, rules: [
      { subtitle: "Survey Types", content: ["Annual, Intermediate and Special/Renewal surveys are carried out periodically", "Hull (drydocking) survey typically twice every 5 years (maximum 36 months apart)"] },
      { subtitle: "Condition Based Maintenance (CBM)", content: ["Condition monitoring via vibration, oil analysis and thermography", "Survey credit can be obtained with the approved PMS/CM scheme (class approval required)"] },
    ]},
    { title: "Spare Parts and Critical Equipment", source: { code: "ISM Code", detail: "Critical equipment and spares" }, rules: [
      { subtitle: "Critical Equipment Management", content: ["Equipment that affects safety in case of sudden failure is defined as 'critical' and placed in the testing regime", "Periodic operation (changeover) is performed for spare/standby equipment."] },
      { subtitle: "Spare Parts Stock", content: ["Minimum spare parts required by the class/management are kept on board.", "Stock levels and delivery times are tracked via PMS"] },
    ]},
  ],
  "engine-room-safety": [
    { title: "Engine Room Safety Rules", source: { code: "SOLAS II-2", detail: "Fire safety and emergency shutdown" }, rules: [
      { subtitle: "SOLAS II-2 – Fire Safety", content: ["The engine room must be surrounded by A-60 class partitions", "Fixed CO₂ or FM-200 extinguishing system is mandatory", "Quick-closing valves must operate from outside the engine room", "Ventilator shutdown: must be able to be stopped from outside the engine room"] },
      { subtitle: "Emergency Stop", content: ["Main engine emergency stop: from the bridge and machine control room", "Fuel pumps: must be able to be stopped from outside the engine room", "Ventilators: must be shut down automatically or remotely in case of fire"] },
    ]},
    { title: "Entry to Confined Space", source: { code: "SOLAS III/19 / IMO Res.A.1050(27)", detail: "Enclosed space entry" }, rules: [
      { subtitle: "Atmosphere Measurement", content: ["O₂ ≥ 20.9%, toxic gas and LEL should be measured before entry", "Measurement should be supported at multiple levels (top/middle/bottom) and continuous monitoring"] },
      { subtitle: "Permit and Drill", content: ["Permit-to-work, stand-by and rescue plan are mandatory", "Confined space entry and rescue drills should be carried out every 2 months (SOLAS III/19)"] },
    ]},
    { title: "Fixed Suppression Systems (FSS)", source: { code: "FSS Code", detail: "Fixed fire fighting" }, rules: [
      { subtitle: "Gas/Foam Systems", content: ["There must be an audio/light warning and time delay before CO₂ release.", "Prior to release, space evacuation and ventilator/fuel interruption must be ensured."] },
      { subtitle: "Water Based Systems", content: ["Local application water mist systems protect high-risk equipment", "System pressure/flow tests should be performed periodically"] },
    ]},
  ],
  "environment-machine": [
    { title: "MARPOL – Machinery Related Provisions", source: { code: "MARPOL Annex I/IV/VI", detail: "Oil, waste water and air emissions" }, rules: [
      { subtitle: "Annex I – Oily Wastes", content: ["15 ppm OWS: discharge limit into the sea", "Sludge tank: mandatory on all ships", "Oil Record Book Part I: engine room records should be kept", "Ships over 400 GT: OWS or oil filter device mandatory"] },
      { subtitle: "Annex IV – Wastewater", content: ["Treatment plant effluent: coliform ≤ 250/100mL", "Closer than 12 nautical miles: untreated discharge prohibited", "Closer than 3 nautical miles: discharge is prohibited, even treated (near shore)"] },
      { subtitle: "Annex VI – Air Pollution", content: ["ODS (ozone depleting substances): new use prohibited", "Shipboard incineration: prohibited in port and shore (some items everywhere)", "IAPP certification: Mandatory for ships over 400 GT"] },
    ]},
    { title: "Energy and Emissions Monitoring", source: { code: "MARPOL Annex VI Ch.4", detail: "EEXI, CII and reporting" }, rules: [
      { subtitle: "EEXI / CII", content: ["EEXI (efficiency index) and annual CII (A–E rating) requirements must be met", "Ships rated D/E prepare a corrective action plan (SEEMP Part III)"] },
      { subtitle: "Data Reporting", content: ["Fuel/CO₂ data reported under IMO DCS (≥ 5,000 GT) and EU MRV", "Bunker consumption and distance data are kept verifiable"] },
    ]},
    { title: "Waste and Substance Management", source: { code: "MARPOL Annex V/VI", detail: "Garbage, ozone and VOC" }, rules: [
      { subtitle: "Garbage Management (Annex V)", content: ["Garbage Management Plan and Garbage Record Book are kept", "Discharge of plastic into the sea is strictly prohibited."] },
      { subtitle: "Ozone and VOC", content: ["ODS Record Book is kept; Refrigerant leaks are recorded", "VOC management plan (if appropriate) applied on tankers"] },
    ]},
  ],
  erm: [
    { title: "ERM Rules and Standards", source: { code: "STCW A-III / ISM Code", detail: "ERM competence and human factors" }, rules: [
      { subtitle: "STCW – ERM Competencies", content: ["STCW Code A-III/1 and A-III/2: ERM qualification of engine officers", "Leadership and teamwork: mandatory in competency assessment", "Situational awareness and decision-making skills are evaluated"] },
      { subtitle: "ISM Code – Human Factor", content: ["Occupational safety assessment: should be carried out before each operation", "Fatigue management: working and rest hours are recorded (MLC 2006)", "Communication: effective communication protocol between engine crew and bridge"] },
    ]},
    { title: "Teamwork and Communication", source: { code: "STCW A-III/1-2", detail: "Resource management" }, rules: [
      { subtitle: "Team Management", content: ["Task distribution, prioritization and workload balancing are done", "Safe feedback is encouraged by lowering the authority gradient (assertiveness)"] },
      { subtitle: "Briefing and Debrief", content: ["A critical pre-operation briefing and post-debrief are applied.", "Command/confirmation is verified with closed-loop communication"] },
    ]},
    { title: "Fatigue and Decision Making", source: { code: "MLC 2006 / IMO Fatigue Guidelines", detail: "Human performance" }, rules: [
      { subtitle: "Fatigue Management", content: ["Rest hour limits should be observed and the risk of fatigue should be assessed.", "Watch planning and sleep hygiene should be taken into account"] },
      { subtitle: "Decision Making", content: ["Signs of loss of situational awareness (fixation, complacency) are monitored", "Risks are evaluated with structured decision methods"] },
    ]},
  ],
  "energy-efficiency": [
    { title: "Energy Efficiency Regulations", source: { code: "MARPOL Annex VI Ch.4", detail: "EEDI/EEXI/CII/SEEMP" }, rules: [
      { subtitle: "MARPOL Annex VI – Part 4", content: ["EEDI: Mandatory for new ships contracted after 2013", "EEXI: Mandatory for all existing ships (over 400 GT) after 2023", "CII: annual carbon intensity assessment (A–E rating)", "SEEMP Part III: CII calculation and improvement plan mandatory"] },
      { subtitle: "EU MRV and IMO DCS", content: ["EU MRV: Ships calling at EU ports report CO₂ data", "IMO DCS: Ships over 5,000 GT report fuel consumption", "Both systems collect and report data on an annual basis"] },
    ]},
    { title: "EEXI/CII Application", source: { code: "IMO MEPC.328(76)/MEPC.336(76)", detail: "Calculation and rating" }, rules: [
      { subtitle: "EEXI Calculation", content: ["EEXI must be below the required value depending on the ship type", "Technical measures such as EPL/ShaPoLi (power limiting) may be applied for compliance"] },
      { subtitle: "CII Rating", content: ["Annual operational CII is rated A–E; Thresholds get tighter every year", "A ship that has received a D for three consecutive years or an E once must submit a corrective plan"] },
    ]},
    { title: "Operational Efficiency", source: { code: "SEEMP / Best Practice", detail: "Fuel and energy saving" }, rules: [
      { subtitle: "Navigation Optimization", content: ["Consumption is reduced with trim, speed (slow steaming) and route/weather optimization", "Boat/propeller cleanliness and hull performance are monitored"] },
      { subtitle: "Energy Recovery", content: ["Waste heat recovery (WHRS) and efficient auxiliary load management are applied", "Shore power (cold ironing) is used in suitable ports"] },
    ]},
  ],
};
