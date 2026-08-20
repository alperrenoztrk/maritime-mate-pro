import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  X,
  DollarSign,
  TrendingUp,
  Ship,
  Clock,
  FileCheck,
  Scale,
  Briefcase,
  Landmark,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

interface EconSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface EconMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: EconSubTopic[];
}

const econTopics: EconMainTopic[] = [
  {
    id: "shipping-market",
    number: 1,
    title: "Maritime Market",
    icon: TrendingUp,
    subtopics: [
      { id: "market-overview", title: "General structure of the maritime market", hasContent: true },
      { id: "supply-demand", title: "Supply-demand balance and price formation", hasContent: true },
      { id: "shipping-cycles", title: "Shipping cycles", hasContent: true },
      { id: "market-indices", title: "BDI and market indices", hasContent: true },
    ],
  },
  {
    id: "chartering",
    number: 2,
    title: "Charter Types",
    icon: FileCheck,
    subtopics: [
      { id: "voyage-charter", title: "Voyage Charter", hasContent: true },
      { id: "time-charter", title: "Time Charter", hasContent: true },
      { id: "bareboat-charter", title: "Bareboat Charter (bare hull rental)", hasContent: true },
      { id: "coa", title: "COA (Contract of Affreightment)", hasContent: true },
    ],
  },
  {
    id: "freight-calculation",
    number: 3,
    title: "Freight and TCE Calculation",
    icon: DollarSign,
    subtopics: [
      { id: "freight-basics", title: "Freight concept and calculation", hasContent: true },
      { id: "tce-calculation", title: "TCE (Time Charter Equivalent) calculation", hasContent: true },
      { id: "worldscale", title: "Worldscale system", hasContent: true },
      { id: "bunker-cost", title: "Fuel cost calculation", hasContent: true },
    ],
  },
  {
    id: "laytime-demurrage",
    number: 4,
    title: "Laytime and Demurrage",
    icon: Clock,
    subtopics: [
      { id: "laytime-basics", title: "Laytime concept and calculation", hasContent: true },
      { id: "notice-of-readiness", title: "Notice of Readiness (NOR)", hasContent: true },
      { id: "demurrage-calc", title: "Demurrage calculation", hasContent: true },
      { id: "despatch", title: "Despatch (early loading/unloading bonus)", hasContent: true },
    ],
  },
  {
    id: "voyage-estimation",
    number: 5,
    title: "Voyage Estimation and Cost Analysis",
    icon: Ship,
    subtopics: [
      { id: "voyage-costs", title: "Expedition costs and components", hasContent: true },
      { id: "voyage-estimation-calc", title: "Voyage estimate calculation", hasContent: true },
      { id: "profit-loss", title: "Profit-loss analysis", hasContent: true },
    ],
  },
  {
    id: "ship-finance",
    number: 6,
    title: "Ship Financing and Valuation",
    icon: Landmark,
    subtopics: [
      { id: "ship-acquisition", title: "Ship acquisition methods", hasContent: true },
      { id: "ship-valuation", title: "Ship valuation methods", hasContent: true },
      { id: "depreciation", title: "Depreciation calculation", hasContent: true },
      { id: "ship-sale-purchase", title: "Ship buying and selling (S&P) and Saleform/MOA", hasContent: true },
    ],
  },
  {
    id: "maritime-insurance",
    number: 7,
    title: "Marine Insurance",
    icon: Scale,
    subtopics: [
      { id: "hull-machinery", title: "Hull and Machinery (H&M) insurance", hasContent: true },
      { id: "pi-club", title: "P&I Clubs and liability insurance", hasContent: true },
      { id: "cargo-insurance", title: "Cargo insurance and clauses", hasContent: true },
      { id: "general-average", title: "General Average and York-Antwerp Rules", hasContent: true },
    ],
  },
  {
    id: "maritime-contracts",
    number: 8,
    title: "Maritime Contracts and Law",
    icon: Briefcase,
    subtopics: [
      { id: "charter-party", title: "Charter party forms", hasContent: true },
      { id: "bill-of-lading", title: "Bill of Lading", hasContent: true },
      { id: "maritime-claims", title: "Maritime claims and arbitration", hasContent: true },
      { id: "incoterms", title: "Incoterms and delivery methods", hasContent: true },
    ],
  },
];

interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
}

const topicContents: Record<string, TopicContent> = {
  // =====================================================
  // BÖLÜM 1 - DENİZCİLİK PİYASASI
  // =====================================================
  "market-overview": {
    title: "General Structure of the Maritime Market",
    introduction: "The shipping market is a global economic ecosystem where more than 80% of world trade is transported and where supply and demand are constantly changing.",
    content: `MARKET STRUCTURE:

The shipping market consists of four sub-markets:

1. FREIGHT MARKET:
The market in which the cargo transport service is bought and sold. Freight rates are set by the balance between supply (the ship tonnage available) and demand (the volume of cargo to be carried).

2. SALE & PURCHASE MARKET (Second-hand Ships):
The market in which existing ships are bought and sold. Ship prices are shaped by freight rates, the age and type of the ship and general market expectations.

3. NEWBUILDING MARKET:
The market in which new ships are ordered from shipyards. The volume of orders depends on expectations for the future market. Delivery time is generally 2-4 years.

4. DEMOLITION/SCRAP MARKET:
The market in which ships that have reached the end of their economic life are sold for breaking. Scrap prices are directly linked to steel prices.

MARKET PARTICIPANTS:

- Ship Owner: the owner of the ship
- Charterer: the party chartering the ship (usually the cargo owner or a trader)
- Broker: the person/firm acting as intermediary between owner and charterer
- Operator: the party operating the ship commercially`,
    bulletPoints: [
      "4 sub markets: freight, second hand, new build, scrap",
      "Freight rates are determined according to the supply-demand balance",
      "Broker acts as an intermediary between shipowner and charterer",
    ],
    keyPoints: [
      "80%+ of world trade is transported by sea",
      "Ship prices and freight rates are correlated with each other",
      "New construction orders depend on future expectations; delivery 2-4 years",
    ],
  },
  "supply-demand": {
    title: "Supply-Demand Balance and Price Formation",
    introduction: "Freight rates in the maritime market are formed according to the balance between the available ship tonnage (supply) and the amount of cargo to be transported (demand).",
    content: `THE SUPPLY SIDE:

Supply is the total carrying capacity of the world merchant fleet (on a DWT basis).

Factors affecting supply:
1. Fleet size: the number and tonnage of existing ships
2. Newbuilding deliveries: new ships delivered from the yards
3. Ships going for scrap: ships withdrawn for demolition
4. Fleet productivity: speed (slow steaming affects supply), waiting times
5. Lay-up: taking ships out of service in a weak market

THE DEMAND SIDE:

Demand is determined by the volume and structure of world trade.

Factors affecting demand:
1. Global economic growth (GDP)
2. International trade volume
3. Commodity prices
4. Geopolitical factors (war, embargo, canal closure)
5. Seasonal variations
6. Ton-mile demand: cargo volume × distance carried

PRICE FORMATION:

Supply > Demand → freight rates fall (soft market)
Demand > Supply → freight rates rise (firm market)

In shipping, supply is inelastic in the short term (building a new ship takes 2-4 years); changes in demand therefore cause extreme volatility in prices.`,
    bulletPoints: [
      "Supply = available fleet capacity; inelastic in the short run",
      "Demand = trade volume in ton-miles",
      "Supply inelasticity is the main reason for freight fluctuations",
    ],
    keyPoints: [
      "Slow steaming supports freight by reducing effective supply",
      "Ton-mile = cargo quantity × transport distance; Demand increases as distance increases",
      "New ship orders increase supply after 2-4 years; delay effect",
    ],
  },
  "shipping-cycles": {
    title: "Shipping Cycles",
    introduction: "The shipping market historically experiences boom and bust periods on 7-10 year cycles.",
    content: `PHASES OF THE CYCLE:

Martin Stopford's classic shipping cycle model has four phases:

1. TROUGH:
Freight rates are below operating costs. Ships are laid up or sold for scrap. There are no new orders. Owners make losses.

2. RECOVERY:
Freight rates begin to rise as supply falls and/or demand increases. Ships return to service. Owners reach break-even.

3. PEAK/PLATEAU:
Freight rates are high and profitability is strong. Ship prices rise rapidly. Shipyards fill their order books. Owners place new orders.

4. COLLAPSE:
The newbuildings ordered at the peak are delivered, supply exceeds demand and freight rates fall sharply. The cycle returns to the trough.

CYCLE LENGTH:

Short cycles: 3-4 years (seasonal and short-term fluctuations)
Long cycles: 7-10 years (classic shipping cycle)
Very long cycles: 50-60 years (technological changes; the transition from sail to steam, from steam to diesel, containerisation)

STRATEGIC IMPLICATION:

The golden rule of the cycle is to buy at the trough and sell at the peak. In practice most owners do the opposite: they order when the market is strong and are forced to sell when it is weak.`,
    bulletPoints: [
      "4 phases: bottom → recovery → peak → decline",
      "Typical cycle time 7-10 years",
      "2008: BDI 11,793 → 663 (94% drop) worst crash in history",
    ],
    keyPoints: [
      "Overordering at the top is the main reason for the next decline",
      "Supply inelasticity increases the severity of cycles",
      "The Stopford model is the basic framework of maritime economics",
    ],
  },
  "market-indices": {
    title: "BDI and Market Indices",
    introduction: "Baltic Dry Index (BDI) is the most important indicator of the bulk freight market and is considered a barometer of global trade activity.",
    content: `BDI (BALTIC DRY INDEX):

The BDI is published daily in London by the Baltic Exchange. It is a weighted average of four sub-indices:

1. BCI (Baltic Capesize Index): ships of 180,000+ DWT. Iron ore and coal routes.
2. BPI (Baltic Panamax Index): 65,000-80,000 DWT. Grain, coal, minerals.
3. BSI (Baltic Supramax Index): 52,000-58,000 DWT. Various bulk cargoes.
4. BHSI (Baltic Handysize Index): 28,000-38,000 DWT. Regional dry bulk trades.

HOW THE BDI IS CALCULATED:

BDI = (BCI + BPI + BSI + BHSI) / 4 (simplified)

Each sub-index is built from the average of the daily charter rates on defined routes. The reference date is 1985 = 1,000 points.

OTHER IMPORTANT INDICES:

BDTI (Baltic Dirty Tanker Index): crude oil tanker freight rates
BCTI (Baltic Clean Tanker Index): product tanker freight rates
SCFI (Shanghai Containerized Freight Index): container freight rates
WCI (World Container Index): the Drewry container index
Worldscale: the tanker freight reference index

THE ECONOMIC SIGNIFICANCE OF THE BDI:

Because the BDI is not open to speculation (an empty ship carries no cargo) it is regarded as reflecting real economic activity. It is therefore used as a leading indicator in macroeconomic analysis and commodity markets.`,
    formula: {
      name: "BDI Calculation (Simplified)",
      expression: "BDI = (BCI + BPI + BSI + BHSI) / 4",
      description: "Each sub-index is the average of daily T/C rates on specific routes. 1985 = 1,000 points reference.",
    },
    bulletPoints: [
      "BDI consists of 4 sub-indices: BCI, BPI, BSI, BHSI",
      "Baltic Exchange daily publications in London",
      "It reflects real activity as it is not open to speculation",
    ],
    keyPoints: [
      "BDI = bulk cargo market; BDTI = tanker market",
      "BDI is considered a macroeconomic leading indicator",
      "Capesize ships are the most volatile component of BDI",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - CHARTER TÜRLERİ
  // =====================================================
  "voyage-charter": {
    title: "Voyage Charter",
    introduction: "Voyage charter is a type of charter in which the shipowner undertakes to transport a specific cargo from one specific port to another.",
    content: `STRUCTURE OF A VOYAGE CHARTER:

In a voyage charter the owner:
- Equips the ship and provides the crew
- Pays the fuel costs
- Pays the port costs (in most cases)
- Carries the agreed cargo from port A to port B

The charterer:
- Pays the freight
- Has the cargo ready
- Pays demurrage if the loading/discharging time (laytime) is exceeded

FREIGHT CALCULATION:

Freight is usually set on a $/tonne basis.

Total Freight = Cargo quantity (tonnes) × Freight rate ($/tonne)

Example: 50,000 tonnes of iron ore × $12/tonne = $600,000

ALTERNATIVE FREIGHT CALCULATIONS:

Lump sum freight: a fixed sum independent of the cargo quantity
Worldscale (tankers): a percentage of a reference rate

COST ALLOCATION (VOYAGE CHARTER):

Owner's side: fuel, crew, insurance, maintenance, port costs (generally)
Charterer's side: freight, loading/discharging costs (as agreed)

CONTRACT: A voyage charter party (C/P) form is used. Common forms: GENCON (general cargo), ASBATANKVOY (tanker).`,
    formula: {
      name: "Voyage Charter Freight Calculation",
      expression: "Total Freight = Cargo Quantity (tonnes) × Freight Rate ($/tonne)",
      description: "The freight rate is determined by market conditions. The cargo quantity is the amount on the B/L (bill of lading).",
    },
    examples: [
      {
        problem: "55,000 tonnes of coal, South Africa to Rotterdam, freight rate $14.50/tonne. Calculate the total freight.",
        solution: "Toplam Navlun = 55.000 × $14,50 = $797.500",
      },
    ],
    bulletPoints: [
      "The shipowner covers fuel, crew and port expenses",
      "Freight is usually calculated on a $/ton basis",
      "GENCON is the most common form of voyage charter party",
    ],
    keyPoints: [
      "In Voyage charter, operational risk belongs to the shipowner.",
      "Exceeding laytime leads to demurrage",
      "Lump sum freight is a fixed fee independent of the cargo quantity.",
    ],
  },
  "time-charter": {
    title: "Time Charter",
    introduction: "Time charter is a type of rental in which the shipowner puts the ship at the disposal of the charterer for a certain period of time; The charterer bears fuel and port costs.",
    content: `STRUCTURE OF A TIME CHARTER:

The owner:
- Delivers the ship fully equipped and crewed
- Pays the crew, insurance, maintenance and classification costs
- Is responsible for the technical operation of the ship

The charterer:
- Pays a daily/monthly hire
- Pays the bunker (fuel) costs
- Pays the port costs
- Is responsible for the commercial operation of the ship (cargo selection, route)

HIRE CALCULATION:

Hire is usually set on a $/day basis.

Total Hire = Daily Hire ($/day) × Duration (days)

Example: $15,000/day × 365 days = $5,475,000/year

OFF-HIRE:

No hire is paid for periods when the ship is not available for the charterer's use (breakdown, drydocking, crew problems). This is known as "off-hire". The off-hire period is determined by the clauses in the charter party.

CONTRACT FORMS:

NYPE (New York Produce Exchange): the most widely used time charter party form
BALTIME: an alternative form
SHELLTIME: for tankers`,
    formula: {
      name: "Time Charter Hire Calculation",
      expression: "Total Hire = Daily Hire ($/day) × Charter Duration (days)",
      description: "Off-hire days are deducted from the total time.",
    },
    examples: [
      {
        problem: "A 12-month time charter, daily hire $18,500, off-hire 5 days. Calculate the total hire income.",
        solution: "Charter period = 365 − 5 = 360 days. Total Hire = 360 × $18,500 = $6,660,000",
      },
    ],
    bulletPoints: [
      "Charterer covers fuel and port expenses",
      "Hire is based on $/day",
      "Off-hire: hire is not paid when the ship is not ready",
    ],
    keyPoints: [
      "In time charter, commercial risk belongs to the charterer and technical risk belongs to the shipowner.",
      "NYPE is the most common time charter party form",
      "Off-hire clause is the most discussed part of the charter party.",
    ],
  },
  "bareboat-charter": {
    title: "Bareboat Charter",
    introduction: "Bareboat charter is a type of rental in which the shipowner delivers the ship to the charterer without crew and equipment, and the charterer assumes full operational control of the ship.",
    content: `STRUCTURE OF A BAREBOAT CHARTER:

In this type of charter the bareboat charterer is effectively the disponent owner of the ship (operating it as if the owner).

The owner:
- Delivers the ship as a bare hull
- Retains title to the ship

The charterer:
- Provides and employs the crew
- Pays all operating costs (fuel, port, insurance, maintenance)
- Is fully responsible for the technical and commercial operation of the ship
- Pays hire

DURATION: Generally long term (5-20 years). Where it is used for financing it can run for the life of the ship.

AS A FINANCING INSTRUMENT:

A bareboat charter is often used as a ship financing instrument:
1. The bank buys or finances the ship
2. It charters it to the owner on a bareboat basis
3. At the end of the charter the ship is transferred to the owner (hire-purchase)

This structure is similar to an operating lease.

CONTRACT: BARECON (the BIMCO Bareboat Charter Party) is the most common form.`,
    bulletPoints: [
      "Charterer covers all expenses including crew",
      "The charterer is the non-disponent owner of the ship.",
      "It is usually a long-term (5-20 years) contract",
    ],
    keyPoints: [
      "In bareboat charter, all risk belongs to the charterer.",
      "Widely used as a financing tool (hire-purchase)",
      "BARECON is BIMCO's standard bareboat form",
    ],
  },
  "coa": {
    title: "COA (Contract of Affreightment)",
    introduction: "COA is a long-term freight contract that promises to transport a certain amount of freight within a certain period of time; No specific ship is identified.",
    content: `STRUCTURE OF A COA:

Under a COA the owner undertakes to carry a defined total quantity of cargo (for example 500,000 tonnes a year) on a defined route within a defined period (for example 1-3 years). The carriage is performed over several voyages.

FEATURES:

1. No ship is named: the owner selects a suitable ship (right of substitution)
2. The cargo quantity and schedule are fixed: on an annual or monthly basis
3. The freight rate is fixed or index-linked
4. Each voyage works like a separate voyage charter, but the freight is agreed in advance

ADVANTAGES:

For the owner:
- Long-term income security
- Easier fleet planning

For the charterer:
- Long-term security of carriage
- The freight rate is known in advance
- Protection against market volatility (hedging)

DISADVANTAGES:

- If the market rises the owner continues to carry at a low freight rate
- If the market falls the charterer pays a high freight rate
- Price risk exists for both parties

WHERE IT IS USED:

It is common for high-volume, regularly shipped commodities such as iron ore, coal and bauxite. The major mining companies (BHP, Rio Tinto, Vale) use COAs.`,
    bulletPoints: [
      "COA contains a commitment to transport, not a specific ship",
      "Provides long-term income security",
      "Common in large volume commodities such as iron ore and coal",
    ],
    keyPoints: [
      "COA = long-term freight contract; ship not specified",
      "The shipowner has the right to substitution",
      "Market risk exists for both parties",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - NAVLUN VE TCE
  // =====================================================
  "freight-basics": {
    title: "Freight Concept and Calculation",
    introduction: "Freight is the fee paid for transporting cargo by sea and constitutes the basic income item of the maritime economy.",
    content: `TYPES OF FREIGHT:

1. Unit freight: calculated on a $/tonne, $/m³ or $/TEU basis.
   Total = Cargo quantity × Unit rate

2. Lump sum freight: a fixed sum independent of the cargo quantity.
   Advantageous for the owner: the income is fixed even if the stowage factor is poor.

3. Worldscale (WS): used in the tanker market. A percentage of a reference rate.
   Actual freight = WS rate × Flat Rate

4. Time Charter Equivalent (TCE): freight income on a daily basis, used to compare different charter types.

PAYMENT TERMS:

- Freight Prepaid: the freight is paid in advance at the load port.
- Freight Collect: the freight is paid at the discharge port.
- Freight is usually calculated on the quantity shown on the bill of lading (B/L).

ADDRESS COMMISSION AND BROKERAGE:

Address Commission: the commission paid to the charterer (usually 3.75%)
Brokerage: the commission paid to the broker (usually 1.25%)
Total: 5% of the freight is the standard commission rate.

Net Freight = Gross Freight × (1 − commission rate)`,
    formula: {
      name: "Net Freight Calculation",
      expression: "Net Freight = Gross Freight × (1 − Commission %)",
      description: "Standard commission: 3.75% address commission + 1.25% brokerage = 5% total.",
    },
    examples: [
      {
        problem: "60,000 tonnes of wheat, freight $18/tonne, 3.75% address commission + 1.25% brokerage. Calculate the net freight.",
        solution: "Gross Freight = 60,000 × $18 = $1,080,000. Total commission = 5%. Net Freight = $1,080,000 × (1 − 0.05) = $1,080,000 × 0.95 = $1,026,000.",
      },
    ],
    bulletPoints: [
      "4 freight types: unit, lump sum, Worldscale, TCE",
      "Standard commission: 3.75% address + 1.25% brokerage = 5%",
      "Freight can be paid as prepaid or collect",
    ],
    keyPoints: [
      "Net freight = gross freight − commissions",
      "B/L quantity forms the basis of freight calculation",
      "Lump sum freight puts the stowage factor risk on the charterer",
    ],
  },
  "tce-calculation": {
    title: "TCE (Time Charter Equivalent) Calculation",
    introduction: "TCE is a key performance indicator that converts voyage charter revenues into time charter equivalent on a daily basis and helps compare the profitability of different voyages.",
    content: `THE TCE FORMULA:

TCE = (Net Freight Income − Voyage Costs) / Voyage Duration (days)

Unit: $/day

VOYAGE COSTS:
- Fuel cost (bunkers)
- Port costs
- Canal transit dues (Suez, Panama)
- Agency costs

VOYAGE DURATION:
Total days = days at sea + days in port

Days at sea = Distance (nautical miles) / Speed (knots) / 24

Fuel cost is the largest variable item in the TCE calculation. Consumption at sea and consumption in port are calculated separately.`,
    formula: {
      name: "TCE Calculation",
      expression: "TCE = (Freight − Voyage Costs) / Voyage Duration",
      description: "TCE is calculated on a $/day basis. It is used to compare all voyage charter offers on a time charter basis.",
    },
    examples: [
      {
        problem: "Net freight $800,000. Fuel: $180,000, port costs: $45,000, canal: $60,000. Voyage duration 28 days. TCE?",
        solution: "Voyage Costs = $180,000 + $45,000 + $60,000 = $285,000. TCE = ($800,000 − $285,000) / 28 = $515,000 / 28 = $18,393/day.",
      },
    ],
    bulletPoints: [
      "TCE = (Net Freight − Voyage Costs) / Voyage Duration",
      "Fuel is the largest variable cost",
      "TCE compares the profitability of different voyages",
    ],
    keyPoints: [
      "TCE > Time Charter hire → voyage charter is more profitable",
      "In TCE calculation, commissions must be deducted from net freight",
      "Days at sea = distance / speed / 24",
    ],
  },
  "worldscale": {
    title: "Worldscale System",
    introduction: "Worldscale is a standard pricing system used in the tanker freight market that establishes a reference freight rate for each route.",
    content: `WHAT IS WORLDSCALE?

Worldscale (WS) is a reference rate table updated every year by the Worldscale Association. For each route a base freight rate ($/tonne) known as the "flat rate" (WS100) is set.

HOW IT WORKS:

The flat rate is the freight rate a standard ship (a 75,000 DWT tanker) needs on a given route in order to break even.

The market freight is expressed as a percentage of Worldscale:

Actual freight = WS rate (%) × Flat rate ($/tonne)

Example:
Route: Ras Tanura → Rotterdam
Flat rate: $20.00/tonne
Market rate: WS 65

Freight = 65/100 × $20.00 = $13.00/tonne

WS100 = the flat rate = break-even
WS > 100: the owner is profitable
WS < 100: the owner makes a loss or a small profit

UPDATING:

The flat rates are updated every year on 1 January. The update reflects changes in fuel prices, port costs and canal dues.`,
    formula: {
      name: "Worldscale Freight Calculation",
      expression: "Freight = (WS Rate / 100) × Flat Rate ($/tonne)",
      description: "WS100 = flat rate (breakeven). WS rate varies according to market conditions.",
    },
    examples: [
      {
        problem: "Flat rate $22.50/tonne, market rate WS 72. 80,000 tonnes of crude oil. Calculate the total freight.",
        solution: "Birim navlun = 72/100 × $22,50 = $16,20/ton. Toplam navlun = 80.000 × $16,20 = $1.296.000.",
      },
    ],
    bulletPoints: [
      "WS100 = flat rate = standard breakeven point",
      "Market rate expressed as a percentage of WS",
      "Flat rates are updated on January 1 each year",
    ],
    keyPoints: [
      "Worldscale is the universal language of the tanker market",
      "WS > 100 shipowners are profitable; WS < 100 low profit/loss",
      "Flat rate is calculated on a standard 75,000 DWT tanker basis",
    ],
  },
  "bunker-cost": {
    title: "Fuel Cost Calculation",
    introduction: "Fuel (bunker) cost constitutes the largest item of voyage expenses and directly affects freight profitability.",
    content: `FUEL TYPES AND PRICES:

HFO (Heavy Fuel Oil): high sulphur (3.5%), the cheapest. Requires a scrubber.
VLSFO (Very Low Sulphur Fuel Oil): 0.50% sulphur, IMO 2020 compliant. The standard fuel.
LSMGO (Low Sulphur Marine Gas Oil): 0.10% sulphur, for ECA areas. The most expensive.
LNG: an alternative fuel, for dual-fuel engines.

FUEL CONSUMPTION CALCULATION:

Daily consumption at sea: tonnes/day (main engine + auxiliaries)
Daily consumption in port: tonnes/day (auxiliaries + generators only)

Total Fuel = (Sea days × Sea consumption) + (Port days × Port consumption)

Total Fuel Cost = Total Fuel (tonnes) × Fuel Price ($/tonne)

Days at sea = Distance (NM) / (Speed (knots) × 24)`,
    formula: {
      name: "Fuel Cost Calculation",
      expression: "Fuel Cost = [(Dsea × Csea) + (Dport × Cport)] × Price",
      description: "D: number of days, C: daily consumption (ton/day), Price: $/ton. It should be calculated separately according to fuel type.",
    },
    examples: [
      {
        problem: "A distance of 4,200 NM at 14 knots. 32 tonnes/day of VLSFO at sea ($580/tonne), 4 tonnes/day in port (5 days). Total fuel cost?",
        solution: "Sea days = 4,200 / (14 × 24) = 12.5 days. Fuel at sea = 12.5 × 32 = 400 tonnes. Fuel in port = 5 × 4 = 20 tonnes. Total = 420 tonnes. Cost = 420 × $580 = $243,600.",
      },
    ],
    bulletPoints: [
      "VLSFO (0.50%) standard fuel; LSMGO (0.10%) ECA fuel",
      "Fuel typically accounts for 50-70% of voyage costs",
      "Speed reduction (slow steaming) significantly reduces fuel costs",
    ],
    keyPoints: [
      "Fuel consumption is proportional to the cube of the speed (approximately)",
      "Using LSMGO in ECA regions can increase costs by 30-50%",
      "Bunker prices vary significantly by region (Singapore, Rotterdam, Fujairah)",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - LAYTIME VE DEMURRAGE
  // =====================================================
  "laytime-basics": {
    title: "Laytime Concept and Calculation",
    introduction: "Laytime is the time allowed for loading and/or unloading on a charter party; Exceeding this period will lead to demurrage.",
    content: `DEFINITION OF LAYTIME:

Laytime is the free time the charterer may use to load and/or discharge the ship. It is stated in the charter party in days or hours.

METHODS OF SETTING LAYTIME:

1. Fixed laytime: a defined number of days (e.g. 7 days loading, 5 days discharging)
2. Customary Quick Despatch (CQD): at the speed customary for the port
3. Rate-based: tonnes/day (e.g. a loading rate of 8,000 tonnes/day)
   Laytime = Cargo quantity / Loading rate

TYPES OF DAY:

Running Days: counted continuously, 24/7 (including Sundays and holidays)
Working Days: only working days are counted
Weather Working Days (WWD): working days on which the weather permits work
SHEX (Sundays and Holidays Excluded): Sundays and holidays are not counted
SHINC (Sundays and Holidays Included): Sundays and holidays are included

Laytime starts after a valid NOR (Notice of Readiness) has been tendered and the waiting period stated in the charter party has elapsed.`,
    formula: {
      name: "Rate Based Laytime Calculation",
      expression: "Laytime (days) = Cargo Quantity (tonnes) / Loading Rate (tonnes/day)",
      description: "WWD of 24 consecutive hours SHEX UU (most common laytime definition). UU = Unless Used.",
    },
    examples: [
      {
        problem: "52,000 tonnes of coal, loading rate 8,000 tonnes/day. Laytime?",
        solution: "Laytime = 52,000 / 8,000 = 6.5 days (6 days 12 hours).",
      },
    ],
    bulletPoints: [
      "Running days: 7/24; WWD: weather permitting business days; SHEX: except holiday",
      "Laytime starts after certain time from NOR",
      "UU (Unless Used): if worked on holiday, it is not deducted from laytime",
    ],
    keyPoints: [
      "Laytime calculation forms the basis of demurrage/despatch",
      "WWD SHEX UU is the most common laytime definition",
      "EIU (Even If Used): laytime stops even if worked on holiday",
    ],
  },
  "notice-of-readiness": {
    title: "Notice of Readiness (NOR)",
    introduction: "NOR is a written notification informing the charterer that the ship is fully ready for loading/unloading and triggers the start of laytime counting.",
    content: `WHAT IS A NOR?

The Notice of Readiness (NOR) is the formal document by which the master or the agent notifies the charterer that the ship is ready to load/discharge.

CONDITIONS FOR A VALID NOR:

1. The ship must be alongside the berth or at the anchorage/waiting area
2. The ship must be ready in all respects (holds clean, gear working)
3. Free pratique must have been granted
4. Customs formalities must be complete
5. The NOR must be tendered within the hours stated in the charter party

NOR AND THE START OF LAYTIME:

There is usually a waiting period between tendering the NOR and the start of laytime:
- NOR during working hours: laytime usually starts 6 hours later
- NOR outside working hours: it starts at 08:00 on the next working day

This period is stated in the laytime clause of the charter party.

WIBON / WIPON:

WIBON (Whether In Berth Or Not): the NOR is valid even if the ship is not alongside the berth.
WIPON (Whether In Port Or Not): the NOR is valid even if the ship is not within the port limits (rare).

The WIBON clause is an important protection in the owner's favour; waiting for a berth then consumes laytime.`,
    bulletPoints: [
      "NOR is the official document stating that the ship is ready.",
      "After NOR, laytime usually starts with a 6-hour wait.",
      "WIBON: NOR is valid even during dock waiting",
    ],
    keyPoints: [
      "NOR validity is the starting point of laytime calculation",
      "WIBON clause protects the shipowner from the risk of dock waiting",
      "It is mandatory for NOR to fully comply with the conditions of the charter party",
    ],
  },
  "demurrage-calc": {
    title: "Demurrage Calculation",
    introduction: "Demurrage is the delay compensation paid by the charterer to the shipowner in case the laytime is exceeded.",
    content: `CALCULATING DEMURRAGE:

Demurrage = Time Exceeded (days) × Demurrage Rate ($/day)

The demurrage rate is fixed in the charter party. It is usually higher than the time charter hire rate.

CALCULATION STEPS:

1. Establish the laytime allowed
2. Calculate the time used (according to the type of day)
3. Time exceeded = Time used − Laytime allowed
4. Demurrage = Time exceeded × Rate

AN IMPORTANT RULE: "Once on demurrage, always on demurrage"
Once demurrage has started, time runs continuously including holidays and weather (running days). This rule is a settled principle of international maritime law.

REVERSIBLE LAYTIME:

In some charter parties the loading and discharging laytime is combined (reversible). In that case time saved in loading can be used in discharging, or vice versa.

Total laytime = loading + discharging time allowed
Total used = actual loading + discharging time`,
    formula: {
      name: "Demurrage Calculation",
      expression: "Demurrage ($) = Time Exceeded (days) × Demurrage Rate ($/day)",
      description: "The once on demurrage, always on demurrage rule applies; Uninterrupted running days are counted.",
    },
    examples: [
      {
        problem: "Laytime: 5 days. Time used: 7 days 12 hours. Demurrage rate: $25,000/day. Demurrage?",
        solution: "Time exceeded = 7.5 − 5.0 = 2.5 days. Demurrage = 2.5 × $25,000 = $62,500.",
      },
    ],
    bulletPoints: [
      "Demurrage = days exceeded × rate",
      "Once on demurrage, always on demurrage rule",
      "Reversible laytime: loading and unloading time can be combined",
    ],
    keyPoints: [
      "Demurrage rate is generally higher than T/C hire; has a deterrent effect",
      "SHEX rule does not apply after demurrage begins",
      "Reversible laytime provides flexibility in favor of the shipowner",
    ],
  },
  "despatch": {
    title: "Despatch (Early Loading/Unloading Bonus)",
    introduction: "Despatch is the premium paid by the shipowner to the charterer when loading/unloading is completed below the laytime.",
    content: `CALCULATING DESPATCH:

Despatch = Time Saved (days) × Despatch Rate ($/day)

THE DESPATCH RATE:

The standard rate is half the demurrage rate.

Despatch Rate = Demurrage Rate / 2

This rule is known as "half demurrage" and is the market standard.

Some charter parties distinguish between "all time saved" and "working time saved":
- All time saved: the total time saved including Sundays/holidays
- Working time saved: only the time saved on working days

THE LOGIC OF DESPATCH:

If the ship leaves early the owner can start the next voyage sooner. But the despatch rate is half the demurrage rate, reflecting the fact that the owner loses more from a delay than it gains from time saved.`,
    formula: {
      name: "Despatch Calculation",
      expression: "Despatch = Time Saved × (Demurrage Rate / 2)",
      description: "Half demurrage standard. It can be calculated as all time saved or working time saved.",
    },
    examples: [
      {
        problem: "Laytime 6 days, loading completed in 4.5 days. Demurrage rate $22,000/day. Despatch?",
        solution: "Time saved = 6 − 4.5 = 1.5 days. Despatch rate = $22,000 / 2 = $11,000/day. Despatch = 1.5 × $11,000 = $16,500.",
      },
    ],
    bulletPoints: [
      "Despatch rate = half of demurrage rate (standard)",
      "All time saved: including holidays; working time saved: working days only",
      "Despatch encourages charterers to fast operation",
    ],
    keyPoints: [
      "Half demurrage = despatch rate is market standard",
      "All time saved is more costly for the shipowner; More advantageous for the charterer",
      "The right to despatch must be clearly stated in the charter party.",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - SEFER TAHMİNİ
  // =====================================================
  "voyage-costs": {
    title: "Expedition Costs and Components",
    introduction: "Ship operating costs consist of fixed and variable items; Accurate calculation of all cost components in voyage evaluation is the basis of profitability analysis.",
    content: `COST CATEGORIES:

1. OPERATING COSTS (OPEX):
The fixed costs incurred whether the ship trades or not.
- Crew wages and benefits
- Insurance premiums (H&M, P&I)
- Maintenance and repair
- Spare parts and consumables
- Management costs (ship management fee)
- Classification survey costs
- Drydocking amortisation

Typical OPEX: $5,000-$12,000/day (depending on ship type)

2. VOYAGE COSTS:
The variable costs directly related to a particular voyage.
- Fuel (bunkers): the largest item
- Port costs (port charges, pilotage, towage)
- Canal transit dues (Suez, Panama)
- Agency fees

3. CAPITAL COSTS:
- Loan principal and interest payments
- Depreciation (for accounting purposes)

4. COMMISSIONS:
- Address commission (3.75%)
- Brokerage (1.25%)
Total: 5% of the freight`,
    bulletPoints: [
      "OPEX: crew, insurance, maintenance – continues even if the ship is not operating",
      "Fuel accounts for 50-70% of voyage costs",
      "Capital costs depend on loan repayment schedule",
    ],
    keyPoints: [
      "Daily cost = OPEX + Capital cost depreciation",
      "Breakeven TCE = OPEX/day + Capital/day",
      "Canal transit fees can be $500,000+ on large ships",
    ],
  },
  "voyage-estimation-calc": {
    title: "Voyage Estimation Calculation",
    introduction: "Voyage estimation is a systematic cost-income analysis to calculate the profitability of a voyage in advance.",
    content: `VOYAGE ESTIMATION STEPS:

1. INCOME:
Gross Freight = Cargo quantity × Freight rate
Net Freight = Gross Freight × (1 − commission %)

2. VOYAGE DURATION:
Sea days = Distance / (Speed × 24)
Port days = Laytime + waiting (estimated)
Total duration = Sea days + Port days (each port)

3. FUEL COST:
Fuel at sea = Sea days × Sea consumption × Fuel price
Fuel in port = Port days × Port consumption × Fuel price

4. PORT AND OTHER COSTS:
Load port costs + Discharge port costs + Canal + Agency

5. TCE:
TCE = (Net Freight − Total Voyage Cost) / Voyage Duration

6. PROFITABILITY:
Daily Profit = TCE − OPEX/day − Capital cost/day`,
    examples: [
      {
        problem: "55,000 tonnes of iron ore, Tubarão (Brazil) → Qingdao (China). Freight $22/tonne, 5% commission. Distance 11,200 NM, speed 13.5 knots. Consumption at sea 35 tonnes/day of VLSFO ($590/tonne). Port days 10 (total). Port consumption 3 tonnes/day. Port costs $120,000. No canal. OPEX $7,500/day. TCE and daily profit?",
        solution: "Gross freight = 55,000 × $22 = $1,210,000. Net freight = $1,210,000 × 0.95 = $1,149,500. Sea days = 11,200 / (13.5 × 24) = 34.6 days. Total duration = 34.6 + 10 = 44.6 days. Fuel at sea = 34.6 × 35 × $590 = $714,210. Fuel in port = 10 × 3 × $590 = $17,700. Total cost = $714,210 + $17,700 + $120,000 = $851,910. TCE = ($1,149,500 − $851,910) / 44.6 = $6,673/day. Daily profit = $6,673 − $7,500 = −$827/day (a loss).",
      },
    ],
    bulletPoints: [
      "6 steps: revenue → duration → fuel → port → TCE → profitability",
      "If TCE > OPEX + capital, the trip is profitable",
      "Sea day calculation: distance / (speed × 24)",
    ],
    keyPoints: [
      "Even negative TCE could mean ship could be better than lay-up",
      "Voyage estimation is made using spreadsheets or software.",
      "The relationship between speed and fuel consumption (approximate cube rule) is critical",
    ],
  },
  "profit-loss": {
    title: "Profit-Loss Analysis",
    introduction: "In maritime business, profit-loss analysis is made on a voyage-based and periodic basis and the economic performance of the ship is evaluated.",
    content: `VOYAGE-BASED ANALYSIS:

Voyage Profit/Loss = Net Freight − (Voyage Costs + OPEX × Voyage Duration + Capital Cost × Voyage Duration)

Alternatively, on a TCE basis:
Daily Profit/Loss = TCE − Daily OPEX − Daily Capital Cost

PERIOD ANALYSIS:

Annual income: ∑(net freight of all voyages) or T/C hire × 365
Annual expenditure: OPEX × 365 + voyage costs + capital cost
Annual Profit = Income − Expenditure

BREAK-EVEN ANALYSIS:

Break-even TCE = Daily OPEX + Daily Capital Cost

This figure shows the minimum daily income the ship needs simply to cover its costs.

DECISION CRITERIA:

1. TCE > break-even → the voyage is acceptable
2. TCE < break-even but > OPEX → the voyage makes a loss but covers part of the capital cost; better than lay-up
3. TCE < OPEX → laying the ship up may make more sense

ROI (Return on Investment):

ROI = Annual Net Profit / Ship Investment Value × 100

In the shipping industry a good ROI is generally in the range of 8-15%.`,
    formula: {
      name: "Breakeven TCE",
      expression: "Break-even TCE = OPEX/day + Capital Cost/day",
      description: "The minimum daily income required to cover the ship's expenses.",
    },
    bulletPoints: [
      "TCE > breakeven → profitable trip; TCE < OPEX → lay-up should be evaluated",
      "Trip-based and periodic analysis should be done together",
      "ROI target: 8-15% range",
    ],
    keyPoints: [
      "Even in a loss-making campaign, partial coverage of capital costs is better than lay-up",
      "Breakeven TCE is the most critical threshold value in decision making",
      "Spot market etc. T/C decision depends on risk-return balance",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - GEMİ FİNANSMANI
  // =====================================================
  "ship-acquisition": {
    title: "Ship Acquisition Methods",
    introduction: "Ship acquisition can be accomplished through equity capital, bank loan, leasing or different financing structures; Each method has different advantages and risks.",
    content: `METHODS OF ACQUISITION:

1. EQUITY: direct purchase from the company's own resources. The risk lies entirely with the company but there is no interest burden.

2. BANK LOAN (Mortgage): the most common method. The ship is secured by a mortgage. Loan-to-value ratio (LTV): usually 60-70%. Term: 5-12 years. Banks specialising in ship finance: Hamburg Commercial Bank, DNB, ING, CIT, ABN AMRO.

3. LEASING: financial leasing (bareboat charter + option). The leasing company buys the ship and charters it to the owner. A purchase option applies at the end of the term.

4. BOND ISSUE: large shipping companies can borrow from the capital markets.

5. PUBLIC OFFERING (IPO/Equity Market): shipping companies can issue shares on the New York, Oslo and Athens exchanges.

6. PRIVATE EQUITY: an increasingly important source of finance in recent years.

NEWBUILDING vs. SECOND-HAND:

Newbuilding: yard price + supervision + delivery time (2-4 years). Advantage: full compliance with current regulations, low maintenance. Disadvantage: long delivery time, high cost.

Second-hand: immediate delivery. Advantage: immediate income. Disadvantage: maintenance risk, older regulations, shorter remaining economic life.`,
    bulletPoints: [
      "Bank loan is the most common; LTV 60-70%, maturity 5-12 years",
      "Leasing = bareboat charter + purchase option",
      "New construction delivery time is 2-4 years; second hand immediate delivery",
    ],
    keyPoints: [
      "Ship mortgage (mortgage) is the bank's basic collateral",
      "The LTV ratio is affected by declines in ship value; covenant risk",
      "Second hand is preferred at the market peak, new construction is preferred at the bottom",
    ],
  },
  "ship-valuation": {
    title: "Ship Valuation Methods",
    introduction: "Ship valuation is done by different methods for purchasing-selling, credit, insurance and accounting purposes.",
    content: `VALUATION METHODS:

1. MARKET VALUE:
Current sale prices of ships of similar age, type and size are taken as the reference. This is the most common method.
Sources: VesselsValue, Clarksons, Baltic Exchange S&P assessments.

2. SCRAP VALUE:
Ship = Light displacement tonnage (LDT) × scrap steel price ($/LDT)
This is taken as the minimum value.

3. NEWBUILDING PRICE:
The order price of a new ship of similar type. This is the upper reference.

4. DISCOUNTED CASH FLOW (DCF):
The ship's future cash flows discounted to present value.
NPV = ∑ [CFt / (1+r)^t]

5. CHARTER-FREE VALUE:
The ship is valued free of any charter commitment. This is the measure closest to true market value.

FACTORS AFFECTING SHIP VALUE:

- Age of the ship (the most critical: the depreciation curve)
- Ship type and size
- The state of the current freight market
- Special equipment (ice class, scrubber, BWTS)
- Maintenance condition and class records`,
    bulletPoints: [
      "Market value: comparison with similar ship sales",
      "Scrap value = LDT × $/LDT is the minimum value",
      "DCF discounts future cash flows to present value",
    ],
    keyPoints: [
      "Ship age is the most critical determinant of value",
      "When the freight market rises, ship values also increase",
      "Charter-free market value is usually used in bank LTV calculation",
    ],
  },
  "depreciation": {
    title: "Depreciation Calculation",
    introduction: "Depreciation is the systematic expense of the cost of a ship over its economic life and is an important tool in tax planning.",
    content: `DEPRECIATION METHODS:

1. STRAIGHT-LINE DEPRECIATION:

Annual Depreciation = (Ship Cost − Scrap Value) / Economic Life

This is the most common method. In shipping the standard economic life is generally taken as 25 years.

2. DECLINING BALANCE:
A fixed percentage is applied each year to the remaining value. Depreciation is higher in the early years.

3. UNITS OF PRODUCTION:
Depreciation per day or per mile the ship trades. Rarely used in practice.

ESTIMATING SCRAP VALUE:

Scrap value = LDT × estimated scrap price
Typical LDT: 15-25% of the ship's DWT
Scrap price: $350-550/LDT (depending on market conditions)`,
    formula: {
      name: "Linear Depreciation",
      expression: "Annual Depreciation = (Cost − Scrap Value) / Economic Life",
      description: "Standard economic life: 25 years. Scrap value is estimated by LDT × $/LDT.",
    },
    examples: [
      {
        problem: "Ship cost $35,000,000, scrap value $5,000,000, economic life 25 years. Annual and daily depreciation?",
        solution: "Annual = ($35,000,000 − $5,000,000) / 25 = $1,200,000/year. Daily = $1,200,000 / 365 = $3,288/day.",
      },
    ],
    bulletPoints: [
      "Straight-line depreciation is the most common; standard life 25 years",
      "Scrap value = LDT × $/LDT",
      "Daily depreciation is used in the breakeven TCE calculation",
    ],
    keyPoints: [
      "Depreciation does not create cash outflow; provides tax advantage",
      "LDT is usually 15-25% of DWT",
      "Special regulations (EEDI, scrubber) can increase retroactive value",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - DENİZ SİGORTASI
  // =====================================================
  "hull-machinery": {
    title: "Hull and Machinery (H&M) Insurance",
    introduction: "H&M (Hull & Machinery) insurance covers physical damage to the ship, part of the collision liability and salvage costs.",
    content: `SCOPE OF H&M INSURANCE:

Hull and Machinery insurance protects the physical structure of the ship against marine risks.

RISKS COVERED:
- Perils of the sea (storm, grounding, sinking)
- Fire and explosion
- Collision damage
- Theft and piracy
- Machinery breakdown (under certain clauses)
- Crew negligence

INSURED VALUE:

Agreed Value: the fixed value stated in the policy. In the event of a loss the indemnity is paid on this value. It is usually set close to market value.

IMPORTANT CLAUSES:

ITC Hulls (Institute Time Clauses – Hulls): the standard H&M clause.

3/4 RDC (Running Down Clause): covers three quarters of collision liability. The remaining quarter falls under P&I insurance.

Deductible: the excess borne by the assured on each claim. Typical: $100,000-$250,000.

FACTORS DETERMINING THE PREMIUM:

- Age and type of ship
- Flag State and classification society
- Trading area
- Loss record
- The insured value of the ship`,
    bulletPoints: [
      "H&M covers physical damage to the ship and 3/4 of collision liability",
      "Agreed value is determined as a fixed value in the policy.",
      "ITC Hulls is the standard H&M clause",
    ],
    keyPoints: [
      "3/4 RDC: 3/4 of collision liability H&M, 1/4 P&I",
      "Deductible is the deductible amount assumed by the insured for each damage.",
      "Ship age and damage history directly affect the premium rate",
    ],
  },
  "pi-club": {
    title: "P&I Clubs and Liability Insurance",
    introduction: "P&I (Protection and Indemnity) clubs are mutual insurance organizations that cover shipowners' liabilities towards third parties.",
    content: `WHAT IS A P&I CLUB?

P&I clubs are mutual insurance associations formed by shipowners together. They are not for profit.

The International Group of P&I Clubs consists of 13 clubs and insures more than 90% of the world merchant fleet. Members include Gard, Britannia, Steamship Mutual, UK P&I Club, Skuld and others.

SCOPE OF COVER:

Protection:
- Crew injury and death
- Passenger claims
- One quarter of collision liability (the part not covered by H&M)
- Wreck removal
- Pollution liability (oil pollution)
- Quarantine expenses

Indemnity:
- Cargo damage
- Loss of freight
- Container damage
- Port/terminal damage

SPECIAL FEATURES:

1. Pooling: large claims are shared between the clubs
2. Supplementary Call: an additional call can be levied if claims are heavy
3. Unlimited cover: there is no limit of cover for most risks`,
    bulletPoints: [
      "P&I = mutual insurance; non-profit",
      "International Group insures 90%+ of the world's fleet",
      "Pollution liability is covered by P&I",
    ],
    keyPoints: [
      "P&I covers 1/4 of collision liability outside H&M coverage",
      "Inter-club pooling mechanism works in case of major damages",
      "P&I certificate is a port entry requirement (CLC, BWR certificates)",
    ],
  },
  "cargo-insurance": {
    title: "Cargo Insurance and Clauses",
    introduction: "Cargo insurance covers the damage or loss that the transported cargo may suffer due to maritime risks.",
    content: `CARGO INSURANCE CLAUSES:

The Institute Cargo Clauses (ICC) offer cover at three levels:

ICC (A) – All Risks: the widest cover. All risks are covered except those expressly excluded.
Exclusions: war, strikes, delay, ordinary wear and tear, insufficient packing.

ICC (B): named perils are covered.
Scope: fire, explosion, collision, overturning, grounding, earthquake, lightning, entry of sea water.

ICC (C): the narrowest cover. Only major casualties are covered.
Scope: fire, explosion, collision, grounding, sinking, overturning.

ADDITIONAL CLAUSES:
- War Clause: war risk
- Strikes Clause: strike risk
- Institute Frozen Food Clauses: frozen foodstuffs

INSURED VALUE:

CIF + 10% = the standard insured value
(Cost + Insurance + Freight) + a 10% profit margin

GENERAL AVERAGE:

This is a concept unique to maritime law. Voluntary sacrifices made to save the ship and the cargo (jettison of cargo, salvage remuneration) are shared proportionally between all the interests involved. The York-Antwerp Rules apply.`,
    bulletPoints: [
      "ICC (A): all risks; ICC (B): named perils; ICC (C): minimum coverage",
      "Insurance value: CIF + 10% standard",
      "General average: sacrifice costs are shared proportionately",
    ],
    keyPoints: [
      "ICC (A) is the most common cargo insurance clause",
      "War and strike risks are not covered in standard clauses; additional clause required",
      "General average is calculated according to the York-Antwerp Rules",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - SÖZLEŞMELER VE HUKUK
  // =====================================================
  "charter-party": {
    title: "Charter Party Forms",
    introduction: "Charter party is a rental agreement between the shipowner and the charterer; standard forms are prepared by BIMCO and other organizations.",
    content: `THE PRINCIPAL FORMS:

VOYAGE CHARTER PARTY:
- GENCON (General Charter): the most common general cargo form. Produced by BIMCO.
- ASBATANKVOY: the standard form for tanker voyages.
- AMWELSH: coal trades.
- NORGRAIN: grain trades.

TIME CHARTER PARTY:
- NYPE (New York Produce Exchange): the most common time charter form.
- BALTIME: an alternative time charter form.
- SHELLTIME: produced by Shell for tankers.

BAREBOAT CHARTER PARTY:
- BARECON: the BIMCO standard bareboat form.

IMPORTANT CLAUSES:

1. Preamble: the parties, the description of the ship, period/route
2. Cargo Clause: description and quantity of cargo
3. Laytime/Demurrage: time and rate
4. Off-hire: the conditions under which hire ceases in a time charter
5. Withdrawal: the right to withdraw the ship if hire is not paid
6. War/Ice Clause: war and ice risk
7. Arbitration: the dispute resolution method (London, New York)

BIMCO:

The Baltic and International Maritime Council is the most important source of shipping contract forms. It has published more than 100 standard forms and clauses.`,
    bulletPoints: [
      "GENCON: general cargo, NYPE: time charter, BARECON: bareboat",
      "BIMCO has published more than 100 standard forms",
      "Arbitration usually takes place in London or New York",
    ],
    keyPoints: [
      "The most critical clauses of the charter party: laytime, demurrage, off-hire, withdrawal",
      "NYPE Clause 8 (off-hire) and Clause 11 (withdrawal) are the most discussed sections",
      "Rider clauses: special clauses added to the standard form",
    ],
  },
  "bill-of-lading": {
    title: "Bill of Lading",
    introduction: "Bill of Lading (B/L) is a negotiable document that documents the receipt of the cargo in maritime transportation, is proof of the transportation contract and ensures the transfer of ownership.",
    content: `THE 3 FUNCTIONS OF A BILL OF LADING:

1. RECEIPT: it is evidence that the cargo has been loaded on board, or received for carriage. The quantity, condition and description of the cargo are stated in the B/L.

2. EVIDENCE OF THE CONTRACT OF CARRIAGE: it records the terms of carriage between the carrier and the shipper.

3. DOCUMENT OF TITLE: whoever holds the B/L can claim the cargo. It can be transferred by endorsement. This feature distinguishes the B/L from other transport documents.

TYPES OF BILL OF LADING:

Clean B/L: states that the cargo was shipped in apparent good order and condition.
Claused/Dirty B/L: contains a remark that the cargo is damaged or short.
Shipped B/L: states that the cargo has actually been loaded on board.
Received for Shipment B/L: states that the cargo has been received for carriage.
Straight B/L: made out to a named consignee; it cannot be endorsed.
Order B/L: made out "to order" or "to order of shipper"; it can be transferred by endorsement.

THE HAGUE-VISBY RULES:

They set out the carrier's minimum liability for the cargo. The carrier must perform its obligation of seaworthiness.`,
    bulletPoints: [
      "B/L: is receipt + proof of contract + proof of ownership",
      "Clean B/L: no damage record; claused B/L: there is damage/missing record",
      "Order B/L is transferable by endorsement; straight B/L non-transferable",
    ],
    keyPoints: [
      "The ownership document feature of B/L makes it a negotiable instrument.",
      "Hague-Visby Rules determine the minimum liability of the carrier",
      "In Letter of Credit transactions, clean shipped B/L is required.",
    ],
  },
  "maritime-claims": {
    title: "Maritime Claims and Arbitration",
    introduction: "Maritime disputes are generally resolved through arbitration; Maritime claims may lead to the arrest of the ship.",
    content: `MARITIME CLAIMS:

A maritime claim covers all legal claims arising out of maritime trade.

THE PRINCIPAL TYPES OF CLAIM:

1. Ship mortgage
2. Crew claims (wages, compensation)
3. Salvage remuneration
4. Collision damage claims
5. Cargo damage claims
6. Bunker claims
7. Port charges
8. Repair and maintenance claims
9. Freight claims
10. Demurrage claims

SHIP ARREST:

Under the 1952 and 1999 Arrest Conventions, a party with a maritime claim may apply to the court for the arrest of the ship. The ship is detained until the debt is paid or security is provided.

ARBITRATION:

The great majority of maritime disputes are resolved by arbitration. Arbitration is faster than litigation, confidential and conducted by expert arbitrators.

The main arbitration centres:
- London (LMAA – London Maritime Arbitrators Association): the most common
- New York (SMA – Society of Maritime Arbitrators)
- Singapore (SIAC)
- Hong Kong (HKIAC)

English law is the most widely applied legal system in shipping contracts.`,
    bulletPoints: [
      "Ship arrest is the guarantee of maritime receivables.",
      "London (LMAA) is the most common maritime arbitration center",
      "English law is the standard choice in maritime contracts",
    ],
    keyPoints: [
      "Crew receivables are among the top priority maritime receivables.",
      "Arbitral awards are internationally enforceable under the 1958 New York Convention",
      "The arbitration clause in the charter party determines jurisdiction",
    ],
  },

  // =====================================================
  // EK BAŞLIKLAR (2. tur domain taraması)
  // =====================================================
  "incoterms": {
    title: "Incoterms and Delivery Methods",
    introduction: "Incoterms (International Commercial Terms) are delivery rules published by ICC that standardize at what point costs, risks and responsibilities change hands between buyer and seller in international trade. Freight, insurance and risk determine the answer to the question.",
    content: `WHY DO THEY MATTER?

Incoterms define clearly who pays the carriage cost, at what point the risk of damage or loss passes to the buyer and who arranges insurance. In shipping they form the basis of the commercial flow together with the contract of carriage and the bill of lading.

TERMS SPECIFIC TO SEA TRANSPORT:

- FAS (Free Alongside Ship): the seller brings the goods alongside the ship; from that point the risk is with the buyer.
- FOB (Free On Board): the seller loads the goods on board; once the goods are on board the risk passes to the buyer. Freight and insurance are for the buyer's account.
- CFR (Cost and Freight): the seller pays the freight but the risk passes to the buyer at the load port.
- CIF (Cost, Insurance and Freight): CFR plus the seller also arranges minimum insurance; the risk again passes at the load port.

TERMS FOR ALL MODES OF TRANSPORT:

EXW, FCA, CPT, CIP, DAP, DPU, DDP — for container/multimodal transport FCA/CIP are recommended instead of FOB/CIF.

THE DISTINCTION BETWEEN RISK AND COST:

An important subtlety: under some terms (CFR/CIF) the seller pays the freight/insurance, yet RISK passes to the buyer much earlier (on loading); the points at which cost and risk transfer can be different.`,
    bulletPoints: [
      "Incoterms define the transition point for costs, risks and insurance liability.",
      "FAS/FOB/CFR/CIF are terms specific to maritime transportation.",
      "FCA/CIP is preferred in container/multimodal.",
      "In CFR/CIF, the risk is in the loading, but the freight is on the seller.",
    ],
    keyPoints: [
      "Incoterms 'freight/insurance/who bears the risk?' standardizes the question.",
      "Cost and risk transition points may differ (especially CIF/CFR).",
      "It is published by the ICC and is explicitly referenced in the contract.",
    ],
  },
  "general-average": {
    title: "General Average and York-Antwerp Rules",
    introduction: "General average (GA) is the principle of sharing proportionately among all saved interests (ship, cargo, freight) the extraordinary sacrifices and expenses made knowingly and reasonably to save the common sea voyage adventure (ship + cargo) from a danger.",
    content: `THE BASIC PRINCIPLE:

A deliberate sacrifice made at a time of danger (for example jettisoning part of the cargo when aground, water damage caused in fighting a fire, expenditure incurred for salvage) is not borne by one party alone, because the sacrifice is made to save the common interest. The cost is therefore shared between all the values saved.

CONDITIONS FOR GENERAL AVERAGE:

- There must be a real and common danger.
- The sacrifice must be voluntary and reasonable.
- It must be extraordinary in nature.
- It must be made to save the common adventure.

THE YORK-ANTWERP RULES:

The calculation and application of general average is carried out within the framework of the internationally accepted York-Antwerp Rules (YAR). Most charter parties and bills of lading refer to general average being adjusted in accordance with the YAR.

THE PROCESS:

- The average adjuster identifies the sacrifices and expenditure and calculates the contributory values.
- The cargo may not be released until a general average guarantee/deposit (GA bond / GA deposit) has been provided.
- Cargo owners generally have their GA contribution covered under their cargo insurance.

THE DIFFERENCE FROM PARTICULAR AVERAGE:

Particular average is accidental damage borne only by the party that suffers it; it is not shared. General average is the sharing of a deliberate sacrifice.`,
    bulletPoints: [
      "GA: sharing of deliberate sacrifice made in common danger by all interests.",
      "Conditions: actual common danger + intentional + reasonable + extraordinary.",
      "York-Antwerp Rules is the GA calculation framework.",
      "Average adjuster calculates contribution margins; GA bond/deposit is taken.",
    ],
    keyPoints: [
      "GA apportions intentional sacrifice; Private average is not apportioned.",
      "Most contracts make reference to the York-Antwerp Rules for GA.",
      "GA contribution is usually covered by cargo insurance.",
    ],
  },
  "ship-sale-purchase": {
    title: "Ship Trading (S&P) and Saleform/MOA",
    introduction: "Second-hand ship trading (Sale and Purchase – S&P) is an important branch of the maritime market. The transaction is carried out by an agreed upon sales contract (Memorandum of Agreement – MOA, usually Norwegian Saleform).",
    content: `THE S&P PROCESS:

1. Market research and identification of candidate ships (through a broker).
2. Preliminary agreement on price and terms (recap / subjects).
3. Signing of the MOA (usually on a standard form: the Norwegian Saleform – NSF, or Nipponsale, etc.).
4. Inspection of the ship: document review, physical survey and class records.
5. Underwater/drydock inspection (divers' inspection or drydocking) — if required.
6. Delivery: payment of the price and transfer of the ship under a Protocol of Delivery and Acceptance.

THE KEY ELEMENTS OF THE MOA:

- Price and payment terms (deposit – usually 10% into an escrow account).
- Inspection terms and the right to reject.
- Place/time of delivery and the condition of the ship on delivery (class maintained, certificates valid, free of mortgages/liens).
- Transfer of bunkers/lubricating oils and stores.

POINTS TO WATCH ON DELIVERY:

The ship must be delivered 'class maintained, free of encumbrances'. A change of flag, new registration and discharge of the mortgage are coordinated at the moment of delivery.

RELATIONSHIP WITH VALUATION:

The S&P price is set by the state of the market and the age/type/condition and earning potential of the ship (it is linked to the ship valuation methods).`,
    bulletPoints: [
      "The S&P transaction is executed with MOA (usually Norwegian Saleform).",
      "Inspection + class/document review + pooling (if necessary) is performed.",
      "Deposit is usually 10%; Delivery is made via Protocol of Delivery.",
      "The ship class is delivered preserved and free from mortgages/liens.",
    ],
    keyPoints: [
      "MOA establishes price, inspection, delivery and condition requirements.",
      "Upon delivery, flag/registration/mortgage procedures are carried out in coordination.",
      "The S&P price is linked to ship valuation and the market.",
    ],
  },
};

export default function EconomicsTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSubtopicClick = (subtopicId: string, hasContent: boolean) => {
    if (hasContent && topicContents[subtopicId]) {
      setSelectedTopic(subtopicId);
    }
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const currentContent = selectedTopic ? topicContents[selectedTopic] : null;

  // Back tuşu açık bir yazıyı asla kapatmaz: konu anlatımı ekrandayken
  // geri tuşu yutulur, yazı ancak kendi kapatma düğmesiyle kapanır.
  useArticleBackGuard(Boolean(currentContent));

  return (
    <div
      className="relative min-h-screen overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Maritime Management</h1>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {econTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                          {topic.number}
                        </span>
                        <span className="font-semibold text-foreground text-sm leading-tight">
                          {topic.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-1 mt-2">
                        {topic.subtopics.map((subtopic) => (
                          <motion.button
                            key={subtopic.id}
                            onClick={() => handleSubtopicClick(subtopic.id, subtopic.hasContent)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                              subtopic.hasContent && topicContents[subtopic.id]
                                ? "hover:bg-indigo-500/5 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            whileTap={subtopic.hasContent && topicContents[subtopic.id] ? { scale: 0.98 } : {}}
                          >
                            <span className="text-sm text-foreground">{subtopic.title}</span>
                            {subtopic.hasContent && topicContents[subtopic.id] && (
                              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Economic Calculations", href: "/economics" },
                  { title: "Formulas", href: "/formulas" },
                  { title: "All Lessons", href: "/lessons" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-indigo-500/40 hover:bg-background"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{resource.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>

      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="relative z-10 bg-background/95 border-b border-border">
              <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
                <h2 className="text-lg font-bold text-foreground truncate pr-4">
                  {currentContent.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="p-4 space-y-6 pb-20 max-w-4xl mx-auto">
                <div className="bg-indigo-500/10 rounded-xl p-4 border-l-4 border-indigo-500">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                <StructuredLessonText text={currentContent.content} />

                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.formula && (
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      {currentContent.formula.name}
                    </h3>
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-indigo-600 dark:text-indigo-400 mb-2">
                      {currentContent.formula.expression}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentContent.formula.description}
                    </p>
                  </div>
                )}

                {currentContent.examples && currentContent.examples.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                    <h3 className="font-semibold text-foreground mb-2">Numerical Example</h3>
                    {currentContent.examples.map((example, index) => (
                      <div key={index} className="text-sm text-foreground">
                        <p className="font-medium">Question: {example.problem}</p>
                        <p className="text-muted-foreground mt-1">Solution: {example.solution}</p>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="bg-indigo-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                      Key Information
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{index + 1}.</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentContent.warnings && currentContent.warnings.length > 0 && (
                  <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
                    <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Warnings
                    </h3>
                    <div className="space-y-2">
                      {currentContent.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-destructive font-bold">!</span>
                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
