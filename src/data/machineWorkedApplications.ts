import type { MachineSubTopicSection } from "./machineTopicDetailContent";

/** Original worked applications; numerical values describe teaching models. */
export const machineWorkedApplications: Record<string, MachineSubTopicSection[]> = {
  "automation|PID kontrol algoritması": [
    {
      heading: "From an Error Signal to a Control Action",
      paragraphs: [
        "Consider a temperature-control loop. The controller compares the set point with the measured process value, so the error is e = set point − process value. Proportional action responds to the error now, integral action responds to its accumulated history, and derivative action responds to its rate of change. A controller that sees only the present error cannot distinguish a steady offset from a fast-changing disturbance.",
        "For the parallel-form teaching model, the three contributions are added. The gains have units that convert their respective input quantities to controller-output units. Real installations also require the correct action direction, output limits, integral anti-windup, derivative filtering and a suitable sample time. The numbers below are an arithmetic illustration, not tuning settings for a shipboard controller.",
      ],
      formula: { expression: "u = Kp × e + Ki × integral(e dt) + Kd × de/dt", variables: ["e: control error", "u: controller output", "Kp, Ki, Kd: gains for this parallel controller form"] },
      example: {
        problem: "A teaching loop has e = 5, accumulated error = 12 and de/dt = −0.5. With Kp = 2, Ki = 0.1 and Kd = 1 in consistent units, find the output before limiting.",
        steps: ["Proportional contribution: 2 × 5 = 10 output units.", "Integral contribution: 0.1 × 12 = 1.2 output units.", "Derivative contribution: 1 × (−0.5) = −0.5 output units.", "Sum: u = 10 + 1.2 − 0.5 = 10.7 output units."],
        result: "The model output is 10.7 units before applying actuator limits. The negative derivative contribution reflects a falling error.",
      },
      bulletPoints: ["Do not confuse the control error with the measured temperature itself.", "A zero present error does not necessarily imply a zero integral contribution.", "Standard-form and parallel-form controller parameters cannot be copied between forms without conversion."],
    },
  ],
  "fluid-mechanics|Sistem eğrisi ve çalışma noktası": [
    {
      heading: "Why the Pump Curve Alone Does Not Set the Flow",
      paragraphs: [
        "A centrifugal pump supplies a head that changes with flow. The connected piping system requires a head that includes the static difference and the losses in pipes, valves and fittings. The operating point is where supplied head equals required head. Reading a flow from the pump curve without considering the system curve leaves half of the problem unspecified.",
        "For a fixed-speed teaching example, represent the pump by H = 40 − 0.002Q² and the system by H = 10 + 0.001Q². H is in metres of the pumped liquid and Q is in cubic metres per hour; the numerical coefficients therefore carry the corresponding units. These simplified curves describe the example only. An actual assessment also checks efficiency, suction conditions, power and the manufacturer's permitted operating range.",
      ],
      example: {
        problem: "Find the operating flow and head at the intersection of the two example curves.",
        steps: ["Set supplied head equal to required head: 40 − 0.002Q² = 10 + 0.001Q².", "Collect terms: 30 = 0.003Q², so Q² = 10,000.", "For forward flow, Q = 100 m³/h.", "Substitute into either curve: H = 40 − 0.002 × 10,000 = 20 m."],
        result: "The example operates at 100 m³/h and 20 m head. A change in system resistance moves the intersection even if the pump speed stays unchanged.",
      },
      bulletPoints: ["Head is energy per unit weight; it is not the same quantity as flow rate.", "The highest flow on a plotted curve is not automatically an acceptable operating point.", "Compare observations with both the system condition and the pump characteristic before attributing a low flow to a pump defect."],
    },
  ],
};
