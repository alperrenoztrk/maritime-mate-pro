/** Maritime unit factors use SI definitions, with one canonical base per category. */
export interface Unit {
  id: string;
  label: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}
export interface UnitCategory {
  id: string;
  label: string;
  units: Unit[];
}
const linear = (id: string, label: string, symbol: string, factor: number): Unit => ({
  id, label, symbol,
  toBase: (value) => value * factor,
  fromBase: (value) => value / factor,
});
export const MARITIME_UNIT_CATEGORIES: UnitCategory[] = [
  { id: "distance", label: "Distance", units: [
    linear("nm", "Nautical mile", "NM", 1852),
    linear("km", "Kilometre", "km", 1000),
    linear("m", "Metre", "m", 1),
    linear("ft", "Foot", "ft", 0.3048),
    linear("yd", "Yard", "yd", 0.9144),
    linear("cable", "Cable (0.1 NM)", "cable", 185.2),
    linear("fathom", "Fathom", "fathom", 1.8288),
  ] },
  { id: "speed", label: "Speed", units: [
    linear("kn", "Knot", "kn", 1852 / 3600),
    linear("kmh", "Kilometres per hour", "km/h", 1 / 3.6),
    linear("ms", "Metres per second", "m/s", 1),
    linear("mph", "Miles per hour", "mph", 0.44704),
  ] },
  { id: "mass", label: "Mass", units: [
    linear("tonne", "Metric tonne", "t", 1000),
    linear("longton", "Long ton", "LT", 1016.0469088),
    linear("shortton", "Short ton", "ST", 907.18474),
    linear("kg", "Kilogram", "kg", 1),
    linear("lb", "Pound", "lb", 0.45359237),
  ] },
  { id: "volume", label: "Volume", units: [
    linear("m3", "Cubic metre", "m³", 1),
    linear("l", "Litre", "L", 0.001),
    linear("usg", "US liquid gallon", "US gal", 0.003785411784),
    linear("impg", "Imperial gallon", "Imp gal", 0.00454609),
    linear("bbl", "Petroleum barrel", "bbl", 0.158987294928),
    linear("ft3", "Cubic foot", "ft³", 0.028316846592),
  ] },
  { id: "temperature", label: "Temperature", units: [
    { id: "c", label: "Celsius", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
    { id: "f", label: "Fahrenheit", symbol: "°F", toBase: (v) => (v - 32) * 5 / 9,
      fromBase: (v) => v * 9 / 5 + 32 },
    { id: "k", label: "Kelvin", symbol: "K", toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15 },
  ] },
  { id: "pressure", label: "Pressure", units: [
    linear("bar", "Bar", "bar", 1),
    linear("hpa", "Hectopascal / millibar", "hPa", 0.001),
    linear("psi", "Pounds per square inch", "psi", 0.06894757293168),
    linear("atm", "Standard atmosphere", "atm", 1.01325),
    linear("mmhg", "Millimetre of mercury", "mmHg", 0.00133322387415),
    linear("kpa", "Kilopascal", "kPa", 0.01),
  ] },
];

export function convertMaritimeUnit(categoryId: string, fromId: string, toId: string, value: number): number {
  const category = MARITIME_UNIT_CATEGORIES.find((item) => item.id === categoryId);
  const from = category?.units.find((unit) => unit.id === fromId);
  const to = category?.units.find((unit) => unit.id === toId);
  if (!from || !to || !Number.isFinite(value)) throw new RangeError("Enter a valid number and units.");
  const base = from.toBase(value);
  if (categoryId === "temperature" && base < -273.15 - 1e-9) {
    throw new RangeError("Absolute temperature cannot be below 0 K.");
  }
  const result = to.fromBase(base);
  if (!Number.isFinite(result)) throw new RangeError("Conversion overflow.");
  return result;
}
