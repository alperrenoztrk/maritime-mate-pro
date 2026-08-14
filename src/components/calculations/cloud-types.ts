// Import cloud images
import stratusImage from '@/assets/clouds/stratus.jpg';
import stratocumulusImage from '@/assets/clouds/stratocumulus.jpg';
import cumulusImage from '@/assets/clouds/cumulus.jpg';
import cumulonimbusImage from '@/assets/clouds/cumulonimbus.jpg';
import nimbostratusImage from '@/assets/clouds/nimbostratus.jpg';
import altostratusImage from '@/assets/clouds/altostratus.jpg';
import altocumulusImage from '@/assets/clouds/altocumulus.jpg';
import cirrusImage from '@/assets/clouds/cirrus.jpg';
import cirrocumulusImage from '@/assets/clouds/cirrocumulus.jpg';
import cirrostratusImage from '@/assets/clouds/cirrostratus.jpg';
import mammatusImage from '@/assets/clouds/mammatus.jpg';
import lenticularisImage from '@/assets/clouds/lenticularis.jpg';
import arcusImage from '@/assets/clouds/arcus.jpg';
import fractusImage from '@/assets/clouds/fractus.jpg';
import tubaImage from '@/assets/clouds/tuba.jpg';
import asperitasImage from '@/assets/clouds/asperitas.jpg';
import castellanusImage from '@/assets/clouds/castellanus.jpg';
import pyrocumulusImage from '@/assets/clouds/pyrocumulus.jpg';
import contrailsImage from '@/assets/clouds/contrails.jpg';
import virgaImage from '@/assets/clouds/virga.jpg';
import kelvinHelmholtzImage from '@/assets/clouds/kelvin-helmholtz.jpg';

// Fallback (genel fırtına bulutu) — sadece gerektiğinde kullanılmalı
import stormCloudsImage from '@/assets/weather/storm-clouds.jpg';

export interface CloudType {
  id: string;
  name: string;
  nameTr: string;
  code: string;
  mgmCode: string;
  level: 'low' | 'middle' | 'high' | 'vertical';
  altitude: string;
  altitudeFt: string;
  description: string;
  descriptionTr: string;
  characteristics: string[];
  maritimeImportance: string;
  visibility: string;
  wind: string;
  precipitation: string;
  danger: 'low' | 'medium' | 'high';
  imageUrl?: string;
  satelliteChannels?: string[];
  bestDetectionChannel?: string;
}

// MGM Bulut Kataloğu'na göre tüm bulut tipleri
export const cloudTypes: CloudType[] = [
  // ALÇAK BULUTLAR (0-2 km)
  {
    id: 'stratus',
    name: 'Stratus',
    nameTr: 'Stratus',
    code: 'St',
    mgmCode: 'CL 6',
    level: 'low',
    altitude: '0-2 km',
    altitudeFt: '0-6,500 ft',
    description: 'Gray layer cloud with uniform base',
    descriptionTr: 'Gray layer cloud with smooth base',
    characteristics: [
      'smooth gray layer',
      'Completely blocks the sun',
      'fog-like appearance',
      'Occurs close to the ground'
    ],
    maritimeImportance: 'Severely reduces visibility, risk of sea fog',
    visibility: 'Very bad (< 1 km)',
    wind: 'Hafif (< 10 knot)',
    precipitation: 'Drizzle or light snow',
    danger: 'high',
    imageUrl: stratusImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch9 (IR10.8)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch1 (VIS0.6) - Best channel for low low clouds'
  },
  {
    id: 'stratocumulus',
    name: 'Stratocumulus',
    nameTr: 'stratocumulus',
    code: 'Sc',
    mgmCode: 'CL 5',
    level: 'low',
    altitude: '0.5-2 km',
    altitudeFt: '1,600-6,500 ft',
    description: 'Low lumpy gray or white patches in layers',
    descriptionTr: 'Low, lumpy gray or white sheets',
    characteristics: [
      'Gray or whitish bumps',
      'Blue sky can be seen through them',
      'In wave or row form',
      'Most common cloud type'
    ],
    maritimeImportance: 'Indicator of changing weather conditions',
    visibility: 'Orta (3-10 km)',
    wind: 'Orta (10-20 knot)',
    precipitation: 'Light rain or snow spray',
    danger: 'low',
    imageUrl: stratocumulusImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch2 (VIS0.8)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch12 (HRV) - For high resolution vision'
  },
  {
    id: 'cumulus',
    name: 'Cumulus',
    nameTr: 'cumulus',
    code: 'Cu',
    mgmCode: 'CL 1-2',
    level: 'low',
    altitude: '0.5-2 km',
    altitudeFt: '1,600-6,500 ft',
    description: 'Puffy cotton-like fair weather clouds',
    descriptionTr: 'Nice weather clouds with cotton look',
    characteristics: [
      'shaped like cotton balls',
      'white and fluffy',
      'Flat base, dome top',
      'Occurs on sunny days'
    ],
    maritimeImportance: 'Indicator of good weather conditions',
    visibility: 'Excellent (> 10 km)',
    wind: 'Hafif-orta (5-15 knot)',
    precipitation: 'Usually not',
    danger: 'low',
    imageUrl: cumulusImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch2 (VIS0.8)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch2 (VIS0.8) - Cumulus shading detection'
  },
  {
    id: 'cumulonimbus',
    name: 'Cumulonimbus',
    nameTr: 'cumulonimbus',
    code: 'Cb',
    mgmCode: 'CL 3,9',
    level: 'vertical',
    altitude: '0.5-16 km',
    altitudeFt: '1,600-52,000 ft',
    description: 'Towering storm cloud with anvil top',
    descriptionTr: 'Giant storm cloud with anvil top',
    characteristics: [
      'Very high vertical development',
      'anvil-shaped peak',
      'Dark grey or black base',
      'Lightning and thunder'
    ],
    maritimeImportance: 'Severe storm, lightning danger, waterspout risk',
    visibility: 'Very bad (< 1 km)',
    wind: 'Very powerful (> 35 knots)',
    precipitation: 'Heavy rain, hail, snow',
    danger: 'high',
    imageUrl: cumulonimbusImage,
    satelliteChannels: ['Ch4 (IR3.9)', 'Ch9 (IR10.8)', 'Ch10 (IR12.0)'],
    bestDetectionChannel: 'Ch4 (IR3.9) - Storm top detection, day/night'
  },
  {
    id: 'nimbostratus',
    name: 'Nimbostratus',
    nameTr: 'Nimbostratus',
    code: 'Ns',
    mgmCode: 'CM 2',
    level: 'middle',
    altitude: '2-7 km',
    altitudeFt: '6,500-23,000 ft',
    description: 'Dark, thick cloud producing continuous rain',
    descriptionTr: 'Dark, thick cloud that brings constant rain',
    characteristics: [
      'Dark grey, thick layer',
      'Completely blocks the sun',
      'Taban belirsiz',
      'constant rainfall'
    ],
    maritimeImportance: 'Prolonged rainfall, poor visibility, difficult navigation conditions',
    visibility: 'Poor (1-3 km)',
    wind: 'Medium-strong (15-30 knots)',
    precipitation: 'Continuous moderate/heavy rain',
    danger: 'medium',
    imageUrl: nimbostratusImage,
    satelliteChannels: ['Ch9 (IR10.8)', 'Ch10 (IR12.0)', 'Ch5 (WV6.2)'],
    bestDetectionChannel: 'Ch10 (IR12.0) - Thick precipitation clouds'
  },

  // ORTA BULUTLAR (2-7 km)
  {
    id: 'altostratus',
    name: 'Altostratus',
    nameTr: 'altostratus',
    code: 'As',
    mgmCode: 'CM 1',
    level: 'middle',
    altitude: '2-7 km',
    altitudeFt: '6,500-23,000 ft',
    description: 'Gray sheet often covering entire sky',
    descriptionTr: 'Gray blanket covering the sky',
    characteristics: [
      'Grey or blue-grey layer',
      'The sun appears uncertain',
      'Does not cast shadows',
      'Harbinger of frontal approach'
    ],
    maritimeImportance: 'Bad weather in 12-24 hours, front approaching',
    visibility: 'Orta (5-10 km)',
    wind: 'Artan (15-25 knot)',
    precipitation: 'Starts in 12 hours',
    danger: 'medium',
    imageUrl: altostratusImage,
    satelliteChannels: ['Ch7 (IR8.7)', 'Ch9 (IR10.8)', 'Ch5 (WV6.2)'],
    bestDetectionChannel: 'Ch7 (IR8.7) - Orta seviye bulutlar'
  },
  {
    id: 'altocumulus',
    name: 'Altocumulus',
    nameTr: 'altocumulus',
    code: 'Ac',
    mgmCode: 'CM 3-9',
    level: 'middle',
    altitude: '2-7 km',
    altitudeFt: '6,500-23,000 ft',
    description: 'Gray or white patches in waves or bands',
    descriptionTr: 'Grey/white patches in waves or bands',
    characteristics: [
      'Grey or white patches',
      'In waves or rows',
      'Creates small shadows',
      'View of a flock of sheep'
    ],
    maritimeImportance: 'Weather change is approaching, rain is possible within 24 hours',
    visibility: 'Good (8-15 km)',
    wind: 'Orta (10-25 knot)',
    precipitation: 'possible within 24 hours',
    danger: 'low',
    imageUrl: altocumulusImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch7 (IR8.7)', 'Ch9 (IR10.8)'],
    bestDetectionChannel: 'Ch1 (VIS0.6) - Visual of middle cloud structures'
  },

  // YÜKSEK BULUTLAR (5-13 km)
  {
    id: 'cirrus',
    name: 'Cirrus',
    nameTr: 'cirrus',
    code: 'Ci',
    mgmCode: 'CH 1-4',
    level: 'high',
    altitude: '5-13 km',
    altitudeFt: '16,500-42,500 ft',
    description: 'Thin, wispy, hair-like ice clouds',
    descriptionTr: 'Thin, feathery, threadlike clouds of ice',
    characteristics: [
      'Thin, white fibers',
      'Feather or hair strand appearance',
      'It consists of ice crystals',
      'Shows wind direction'
    ],
    maritimeImportance: 'Weather change after 48-72 hours, front is away',
    visibility: 'Excellent (>20 km)',
    wind: 'high end strong',
    precipitation: 'None (possible after 48-72 hours)',
    danger: 'low',
    imageUrl: cirrusImage,
    satelliteChannels: ['Ch5 (WV6.2)', 'Ch6 (WV7.3)', 'Ch11 (IR13.4)'],
    bestDetectionChannel: 'Ch11 (IR13.4) - Cirrus height and analysis'
  },
  {
    id: 'cirrocumulus',
    name: 'Cirrocumulus',
    nameTr: 'cirrocumulus',
    code: 'Cc',
    mgmCode: 'CH 5-9',
    level: 'high',
    altitude: '5-13 km',
    altitudeFt: '16,500-42,500 ft',
    description: 'Small white patches in ripples (mackerel sky)',
    descriptionTr: 'Small white spots (fish scale sky)',
    characteristics: [
      'small white spots',
      'fish scale pattern',
      'Does not cast shadows',
      'Thin and translucent'
    ],
    maritimeImportance: 'Sign of weather change, "fish-scale cloud, rain in three days"',
    visibility: 'Excellent (>20 km)',
    wind: 'Variable',
    precipitation: 'Possible within 24-48 hours',
    danger: 'low',
    imageUrl: cirrocumulusImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch11 (IR13.4)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch12 (HRV) - Thin high clouds, high resolution'
  },
  {
    id: 'cirrostratus',
    name: 'Cirrostratus',
    nameTr: 'cirrostratus',
    code: 'Cs',
    mgmCode: 'CH',
    level: 'high',
    altitude: '5-13 km',
    altitudeFt: '16,500-42,500 ft',
    description: 'Thin sheet creating halos around sun/moon',
    descriptionTr: 'Thin layer forming a sun/moon halo',
    characteristics: [
      'whitish thin cover',
      'Creates a sun/moon halo',
      'It covers the whole sky',
      'translucent'
    ],
    maritimeImportance: 'Seeing a halo is a sign of an approaching storm.',
    visibility: 'Good (10-20 km)',
    wind: 'getting stronger',
    precipitation: 'within 12-24 hours',
    danger: 'medium',
    imageUrl: cirrostratusImage,
    satelliteChannels: ['Ch5 (WV6.2)', 'Ch11 (IR13.4)', 'Ch3 (NIR1.6)'],
    bestDetectionChannel: 'Ch3 (NIR1.6) - Thin ice clouds, cloud phase detection'
  },

  // ÖZEL BULUTLAR
  {
    id: 'mammatus',
    name: 'Mammatus',
    nameTr: 'mammatus',
    code: 'Mam',
    mgmCode: 'private',
    level: 'low',
    altitude: 'Variable',
    altitudeFt: 'Variable',
    description: 'Pouch-like hanging protuberances',
    descriptionTr: 'sac-like protrusions',
    characteristics: [
      'Ters yumrular',
      'It occurs under Cb',
      'Sign of severe turbulence',
      'rare'
    ],
    maritimeImportance: 'Severe storm and turbulence indicator',
    visibility: 'Variable',
    wind: 'very variable',
    precipitation: 'severe soon',
    danger: 'high',
    imageUrl: mammatusImage,
    satelliteChannels: ['Ch4 (IR3.9)', 'Ch9 (IR10.8)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch4 (IR3.9) - Storm structures and details'
  },
  {
    id: 'lenticularis',
    name: 'Lenticularis',
    nameTr: 'lenticularis',
    code: 'Len',
    mgmCode: 'Ac len',
    level: 'middle',
    altitude: '2-7 km',
    altitudeFt: '6,500-23,000 ft',
    description: 'Smooth lens or almond shaped',
    descriptionTr: 'Lenticular or almond shaped',
    characteristics: [
      'lens shaped',
      'mountain wave indicator',
      'appears motionless',
      'Sign of strong wind'
    ],
    maritimeImportance: 'Very strong winds near the mountain',
    visibility: 'good',
    wind: 'Very strong (local)',
    precipitation: 'Usually not',
    danger: 'medium',
    imageUrl: lenticularisImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch7 (IR8.7)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch1 (VIS0.6) - Lens cloud structures'
  },
  {
    id: 'castellanus',
    name: 'Castellanus',
    nameTr: 'castellanus',
    code: 'Cas',
    mgmCode: 'Ac cas',
    level: 'middle',
    altitude: '2-7 km',
    altitudeFt: '6,500-23,000 ft',
    description: 'Turret-shaped cloud tops',
    descriptionTr: 'Tower-shaped cloud tops',
    characteristics: [
      'tower shaped hills',
      'vertical development',
      'A sign of unstable weather',
      'If seen in the morning, storm in the afternoon'
    ],
    maritimeImportance: 'thunderstorm precursor',
    visibility: 'good',
    wind: 'Artan',
    precipitation: 'within 6-12 hours',
    danger: 'medium',
    imageUrl: castellanusImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch7 (IR8.7)', 'Ch9 (IR10.8)'],
    bestDetectionChannel: 'Ch1 (VIS0.6) - Tower cloud structures'
  },
  {
    id: 'fractus',
    name: 'Fractus',
    nameTr: 'fractus',
    code: 'Fra',
    mgmCode: 'St fra, Cu fra',
    level: 'low',
    altitude: '0-2 km',
    altitudeFt: '0-6,500 ft',
    description: 'Ragged cloud fragments',
    descriptionTr: 'Shattered cloud fragments',
    characteristics: [
      'irregular pieces',
      'fast action',
      'Occurs under precipitation',
      'sign of windy weather'
    ],
    maritimeImportance: 'Strong wind and turbulence',
    visibility: 'Variable',
    wind: 'strong',
    precipitation: 'ongoing',
    danger: 'medium',
    imageUrl: fractusImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch9 (IR10.8)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch12 (HRV) - Fractured cloud fragments'
  },
  {
    id: 'tuba',
    name: 'Tuba',
    nameTr: 'Tuba',
    code: 'Tub',
    mgmCode: 'private',
    level: 'low',
    altitude: 'cb base',
    altitudeFt: 'Cb base',
    description: 'Funnel cloud (tornado precursor)',
    descriptionTr: 'Funnel cloud (tornado precursor)',
    characteristics: [
      'funnel shaped',
      'Cb hangs from its base',
      'Doner',
      'tornado pioneer'
    ],
    maritimeImportance: 'Water hose danger! Get away immediately',
    visibility: 'very bad',
    wind: 'Swivels, very violent',
    precipitation: 'severe',
    danger: 'high',
    imageUrl: tubaImage,
    satelliteChannels: ['Ch4 (IR3.9)', 'Ch9 (IR10.8)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch4 (IR3.9) - Huni bulut tespiti'
  },
  {
    id: 'arcus',
    name: 'Arcus',
    nameTr: 'Arkus',
    code: 'Arc',
    mgmCode: 'private',
    level: 'low',
    altitude: '0.5-2 km',
    altitudeFt: '1,600-6,500 ft',
    description: 'Shelf or roll cloud',
    descriptionTr: 'Shelf or roll cloud',
    characteristics: [
      'Horizontal roll shape',
      'ahead of the storm',
      'Approaches fast',
      'sudden increase in wind'
    ],
    maritimeImportance: 'Squall line approaching, sudden high wind',
    visibility: 'decreases rapidly',
    wind: 'Sudden increase (>40 knots)',
    precipitation: 'right behind',
    danger: 'high',
    imageUrl: arcusImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch4 (IR3.9)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch4 (IR3.9) - Raf/rulo bulut, squall line'
  },
  {
    id: 'asperitas',
    name: 'Asperitas',
    nameTr: 'Asperitas',
    code: 'Asp',
    mgmCode: 'private',
    level: 'low',
    altitude: '1-2 km',
    altitudeFt: '3,300-6,500 ft',
    description: 'Wave-like undulations',
    descriptionTr: 'Dalga benzeri dalgalanmalar',
    characteristics: [
      'wavy base',
      'sea wave view',
      'Nadir',
      'sign of turbulence'
    ],
    maritimeImportance: 'Atmospheric instability, variable conditions',
    visibility: 'Orta',
    wind: 'Variable',
    precipitation: 'possible',
    danger: 'medium',
    imageUrl: asperitasImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch9 (IR10.8)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch1 (VIS0.6) - Wave-like structures'
  },
  {
    id: 'pyrocumulus',
    name: 'Pyrocumulus',
    nameTr: 'pyrocumulus',
    code: 'Pyr',
    mgmCode: 'private',
    level: 'vertical',
    altitude: '0-8 km',
    altitudeFt: '0-26,000 ft',
    description: 'Fire-induced cumulus',
    descriptionTr: 'Fire-induced cumulus',
    characteristics: [
      'Occurs on fire',
      'Rapid vertical development',
      'Gri-kahverengi',
      'Creates its own weather system'
    ],
    maritimeImportance: 'Dangerous conditions during coastal fires',
    visibility: 'Very bad (smoke)',
    wind: 'Variable, strong',
    precipitation: 'Rare, ashfall',
    danger: 'high',
    imageUrl: pyrocumulusImage,
    satelliteChannels: ['Ch4 (IR3.9)', 'Ch7 (IR8.7)', 'Ch9 (IR10.8)'],
    bestDetectionChannel: 'Ch7 (IR8.7) - Fire clouds and smoke'
  },
  {
    id: 'contrails',
    name: 'Contrails',
    nameTr: 'Condensation Trace',
    code: 'Con',
    mgmCode: 'Yapay',
    level: 'high',
    altitude: '8-12 km',
    altitudeFt: '26,000-40,000 ft',
    description: 'Aircraft condensation trails',
    descriptionTr: 'Aircraft condensation traces',
    characteristics: [
      'straight lines',
      'can spread',
      'humidity indicator',
      'Yapay bulut'
    ],
    maritimeImportance: 'Information about the upper atmosphere humidity status',
    visibility: 'Etkilemez',
    wind: 'top level',
    precipitation: 'None',
    danger: 'low',
    imageUrl: contrailsImage,
    satelliteChannels: ['Ch5 (WV6.2)', 'Ch11 (IR13.4)', 'Ch1 (VIS0.6)'],
    bestDetectionChannel: 'Ch5 (WV6.2) - Upper atmospheric humidity'
  },
  {
    id: 'virga',
    name: 'Virga',
    nameTr: 'Virga',
    code: 'Vir',
    mgmCode: 'private',
    level: 'middle',
    altitude: 'below cloud base',
    altitudeFt: 'Below cloud base',
    description: 'Rain that evaporates before reaching ground',
    descriptionTr: 'Precipitation that evaporates before reaching the ground',
    characteristics: [
      'Sarkan perdeler',
      'Does not reach the ground',
      'Kuru hava belirtisi',
      'visual misleading'
    ],
    maritimeImportance: 'Kuru hava, ancak mikro patlama riski',
    visibility: 'good',
    wind: 'Sudden changes are possible',
    precipitation: 'Does not reach the ground',
    danger: 'medium',
    imageUrl: virgaImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch9 (IR10.8)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch1 (VIS0.6) - Rain curtains'
  },
  {
    id: 'kelvin-helmholtz',
    name: 'Kelvin-Helmholtz',
    nameTr: 'Kelvin-Helmholtz',
    code: 'KH',
    mgmCode: 'private',
    level: 'middle',
    altitude: '2-7 km',
    altitudeFt: '6,500-23,000 ft',
    description: 'Wave clouds resembling ocean waves',
    descriptionTr: 'Clouds that look like ocean waves',
    characteristics: [
      'breaking waveform',
      'very rare',
      'wind shear',
      'short lived'
    ],
    maritimeImportance: 'Severe wind shear and turbulence',
    visibility: 'good',
    wind: 'Kesme (shear)',
    precipitation: 'None',
    danger: 'high',
    imageUrl: kelvinHelmholtzImage,
    satelliteChannels: ['Ch1 (VIS0.6)', 'Ch7 (IR8.7)', 'Ch12 (HRV)'],
    bestDetectionChannel: 'Ch12 (HRV) - Wind shear waves'
  }
];

// Tehlike seviyesine göre sıralama
export const cloudTypesByDanger = [...cloudTypes].sort((a, b) => {
  const dangerOrder = { high: 0, medium: 1, low: 2 };
  return dangerOrder[a.danger] - dangerOrder[b.danger];
});

// Seviyeye göre gruplama
export const cloudTypesByLevel = {
  low: cloudTypes.filter(c => c.level === 'low'),
  middle: cloudTypes.filter(c => c.level === 'middle'),
  high: cloudTypes.filter(c => c.level === 'high'),
  vertical: cloudTypes.filter(c => c.level === 'vertical')
};

// MGM koduna göre hızlı erişim
export const cloudTypeByMGMCode: Record<string, CloudType> = cloudTypes.reduce((acc, cloud) => {
  acc[cloud.mgmCode] = cloud;
  return acc;
}, {} as Record<string, CloudType>);