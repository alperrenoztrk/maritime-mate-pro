export const calculateGM = (KM: number, KG: number): number => KM - KG;

export const calculateGZ = (GM: number, heelAngle: number): number =>
  GM * Math.sin((heelAngle * Math.PI) / 180);

export const calculateTrim = (aftDraft: number, fwdDraft: number): number => aftDraft - fwdDraft;

export const calculateTPC = (waterplaneArea: number, density = 1.025): number =>
  (waterplaneArea * density) / 100;

export const calculateMTC = (displacement: number, GML: number, length: number): number =>
  (displacement * GML) / (100 * length);

export const calculateDisplacement = (
  length: number,
  breadth: number,
  draft: number,
  blockCoefficient: number,
  density = 1.025
): number => length * breadth * draft * blockCoefficient * density;

export const calculateGreatCircleDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLon = toRad(lon2 - lon1);
  const distance = Math.acos(
    Math.sin(toRad(lat1)) * Math.sin(toRad(lat2)) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon)
  );
  return distance * 60 * (180 / Math.PI);
};

export const toDMS = (decimal: number) => {
  const degrees = Math.floor(decimal);
  const minutes = Math.floor((decimal - degrees) * 60);
  const seconds = (decimal - degrees - minutes / 60) * 3600;
  return { degrees, minutes, seconds };
};

export const getBeaufortScale = (windSpeed: number) => {
  if (windSpeed < 1) return { force: 0, description: 'Calm' };
  if (windSpeed < 4) return { force: 1, description: 'Light air' };
  if (windSpeed < 7) return { force: 2, description: 'Light breeze' };
  if (windSpeed < 11) return { force: 3, description: 'Gentle breeze' };
  if (windSpeed < 17) return { force: 4, description: 'Moderate breeze' };
  if (windSpeed < 22) return { force: 5, description: 'Fresh breeze' };
  if (windSpeed < 28) return { force: 6, description: 'Strong breeze' };
  if (windSpeed < 34) return { force: 7, description: 'Near gale' };
  if (windSpeed < 41) return { force: 8, description: 'Gale' };
  if (windSpeed < 48) return { force: 9, description: 'Strong gale' };
  if (windSpeed < 56) return { force: 10, description: 'Storm' };
  if (windSpeed < 64) return { force: 11, description: 'Violent storm' };
  return { force: 12, description: 'Hurricane' };
};

export const maritimeHelpers = {
  calculateGM,
  calculateGZ,
  calculateTrim,
  calculateTPC,
  calculateMTC,
  calculateDisplacement,
  calculateGreatCircleDistance,
  toDMS,
  getBeaufortScale,
};
