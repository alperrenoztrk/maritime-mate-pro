import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ENGLISH_TERMINOLOGY_RULES,
  EXACT_ENGLISH_OVERRIDES,
  TECHNICAL_ENGLISH_OVERRIDES,
  findEnglishMaritimeTerminologyIssues,
  repairEnglishMaritimeTerminology,
} from './englishMaritimeTerminology.ts';

test('all 155 audited terminology families have a regression rule', () => {
  const expected = Array.from({ length: 155 }, (_, index) => `T-${String(index + 1).padStart(3, '0')}`);
  assert.deepEqual([...new Set(ENGLISH_TERMINOLOGY_RULES.map(({ id }) => id))].sort(), expected);
});

test('all 135 audited untranslated technical labels have exact English', () => {
  assert.equal(Object.keys(TECHNICAL_ENGLISH_OVERRIDES).length, 135);
  for (const [source, target] of Object.entries(TECHNICAL_ENGLISH_OVERRIDES)) {
    assert.notEqual(target, source, source);
    assert.equal(repairEnglishMaritimeTerminology(source, source), target, source);
  }
});

test('every exact override is applied and passes the terminology audit', () => {
  for (const [source, target] of Object.entries(EXACT_ENGLISH_OVERRIDES)) {
    assert.notEqual(target, source, source);
    assert.equal(repairEnglishMaritimeTerminology(source, source), target, source);
    assert.deepEqual(findEnglishMaritimeTerminologyIssues(source, target), [], source);
  }
});

test('high-risk maritime mistranslations are repaired source-aware', () => {
  const cases: Array<[string, string, string]> = [
    ['Reis (Bosun)', 'The Chief (Bosun)', 'Bosun'],
    ["1. Reis'in Rolü", "1. The Chief's Role", "1. The Bosun's Role"],
    ['Usta Gemici', 'Master Sailor', 'Able Seaman'],
    ['Birinci Zabit', 'First Officer', 'Chief Officer'],
    ['Bilge omurgası', 'Wise Keel', 'Bilge Keel'],
    ['Ana makine gücü', 'Main machine power', 'Main engine power'],
    ['Makine dairesi', 'Machine room', 'Engine room'],
    ['Dümen makinesi', 'Steering machine', 'Steering gear'],
    ['Omurga mukavemeti', 'Spine strength', 'Keel strength'],
    ['Yükleme bilgisayarı', 'Installation computer', 'Loading computer'],
    ['Doğrultma kolu', 'Straightening arm', 'Righting arm'],
    ['Kaldırma merkezi', 'Lifting center', 'Center of buoyancy'],
    ['Yüzme merkezi', 'Swimming Center', 'Center of flotation'],
    ['Eğim testi', 'Slope test', 'Inclining test'],
    ['PSC alıkoyma kaydı', 'PSC retention record', 'PSC detention record'],
    ['Kiracı (charter party)', 'Tenant (charter party)', 'Charterer (charter party)'],
    ['Denize atım YOK', 'I DO NOT throw a horse into the sea', 'NO Discharge to Sea'],
    ['FREEFALL İNDİRME', 'FREEFALL DOWNLOAD', 'FREE-FALL LAUNCHING'],
    ['Bağlama halatı adedi', 'Number of mooring ropes', 'Number of mooring lines'],
    ['Hakiki rota', 'Genuine route', 'True course'],
    ['Akıntısız seyir', 'Smooth sailing', 'Navigation without current'],
    ['Akıntıda trafik akışına dik heading', 'Heading at right angles to the traffic flow in a current', 'Heading at right angles to the traffic flow in a current'],
    ['Captain mode aracı kaptan tercihlerini kaydeder', 'The Captain mode tool stores the captain’s preferences', 'The Captain mode tool stores the Master’s preferences'],
    ['İki devir', 'Two cycles', 'Two revolutions'],
    ['Gemi gövdesi', 'Ship body', 'Ship hull'],
    ['Ana makine yatağı', 'Main engine bed', 'Main engine bearing'],
    ['Silindir gömleği', 'Cylinder shirt', 'Cylinder liner'],
    ['Dümen makinesi dairesi', 'Steering wheel house', 'Steering gear compartment'],
    ['MARPOL yük tahliye kuralları', 'MARPOL cargo evacuation rules', 'MARPOL cargo discharge rules'],
    ['Kazan baca kaybı', 'Boiler chimney loss', 'Boiler stack loss'],
    ['Demir dipte', 'Iron at the bottom', 'Anchor at the bottom'],
    ['Ro-Ro yük bağlama planı', 'Ro-Ro cargo binding plan', 'Ro-Ro cargo securing plan'],
    ['Bilge water deşarjı özel alanlarda nasıl yapılır?', 'How is Bilge water discharged in private areas?', 'How is Bilge water discharged in special areas?'],
    ['Kamara, mürettebatın özel alanıdır.', "The cabin is the crew's private space.", "The cabin is the crew's private space."],
    ['≥3 milden deşarj edilebilir', 'can be discharged from ≥3 mils', 'can be discharged from ≥3 miles'],
    ['4.2 Pilot ladder güvenliği — IMO Res. A.1045(27)', '4.2 Pilot ladder safety — IMO Fig. A.1045(27)', '4.2 Pilot ladder safety — IMO Res. A.1045(27)'],
    ['Muster listesi ve acil durum planında rollerin önceden tanımlanmasıyla', 'By pre-defining roles in the customer list and emergency plan', 'By pre-defining roles in the muster list and emergency plan'],
    ['Emniyet Haberleşmesi (SECURITE)', 'Security Communications (SECURITE)', 'Safety Communications (SECURITE)'],
    ['Malzeme ve bağlantılar sınıf kurallarına uymalıdır.', 'Materials and connections must comply with classroom rules.', 'Materials and connections must comply with class rules.'],
    ['Havuz dönemi', 'Pool period', 'Dry dock period'],
    ['Ağır yükler ambarın alt kısmına istiflenir.', 'Heavy loads are stacked in the lower part of the hold.', 'Heavy loads are stowed in the lower part of the hold.'],
    ['Havuzun pencere dışında yapılması klas askıya alınmasına yol açar.', 'Building the pool outside the window will result in classy suspension.', 'Dry-docking outside the window will result in class suspension.'],
    ['Havuz operasyonlarında GM sıfıra düştüğünde kritik an oluşur', 'Critical moment occurs when GM drops to zero in pool operations', 'Critical moment occurs when GM drops to zero in dry-docking operations'],
    ['Model deney havuzunda direnç ölçümü', 'Resistance measurement in the model test pool', 'Resistance measurement in the towing tank'],
    ['Dry-dock hazırlığı; izolasyon sınırlarını yönetmek', 'Dry-dock preparation; managing insulation limits', 'Dry-dock preparation; managing isolation boundaries'],
    ['Halatın ucu (mooring) babaya bağlanır', 'The end of the line is made fast to the bollard in mooring', 'The end of the line is made fast to the bollard in mooring'],
    [
      'CO₂ boşaltma öncesi personel tahliyesi hayati önemdedir.',
      'Personnel discharge before CO₂ discharge is vital.',
      'Personnel evacuation before CO₂ discharge is vital.',
    ],
  ];
  for (const [source, wrong, expected] of cases) {
    assert.equal(repairEnglishMaritimeTerminology(source, wrong), expected, source);
    assert.deepEqual(findEnglishMaritimeTerminologyIssues(source, expected), [], source);
  }
});

test('polysemous terms keep their legitimate non-maritime sense', () => {
  const cases: Array<[string, string]> = [
    ['AB Emisyon Ticaret Sistemi', 'EU Emissions Trading System'],
    ['5000+ GT; AB içi seferlerin %100\'ü, AB-dışı seferlerin %50\'si', '100% of intra-EU voyages, 50% of non-EU voyages'],
    ['Demir cevheri yükü', 'Iron ore cargo'],
    ['Yüzme havuzu pompası', 'Swimming pool pump'],
    ['Zincir stoppe zinciri mekanik olarak kilitleyerek yükü ırgattan alır.', 'The chain stopper locks the chain mechanically and takes the load off the windlass.'],
    ['Otomatik seviye vericiler: radar, float/şamandıra (mekanik) tipleri vardır.', 'Automatic level transmitters are of the radar and float (mechanical) types.'],
    ['İstif yüksekliği arttıkça üst konteynerlerin yükü artar.', 'As the stack height increases, the load on the upper containers increases.'],
    ['Filo havuzu: Aynı tip gemilerde merkezi stok paylaşımı', 'Fleet pool: Central stock sharing of the same type of ships'],
    ['Simülatör eğitimi sınıfta başlar', 'Simulator training starts in the classroom'],
    ['Dökme demir ve çelik', 'Cast iron and steel'],
    ['Demir (Fe) konsantrasyonu', 'Iron (Fe) concentration'],
    ['Manyetik sapma demir kütlesinden etkilenir', 'Magnetic deviation is affected by iron mass'],
    ['İskele kurulumu ve sökümü', 'Scaffolding installation and removal'],
    ['Acil tahliye planı', 'Emergency evacuation plan'],
    ['Personel tahliyesi', 'Personnel evacuation'],
    ['Kullanıcı hesabı', 'User account'],
    ['Konteyner stack yüksekliği', 'Container stack height'],
    ['Şamandıra gövdesi', 'Buoy body'],
    ['Kamaradaki yatak', 'Bed in the cabin'],
    ['Gıdada doymuş yağ', 'Saturated fat in food'],
    ['Kompresör haritası', 'Compressor map'],
    ['Bu seyrin risk haritası', 'Risk map for this voyage'],
    ['Yolcu gemisi personeli ve seyir güvenliği', 'Cruise ship personnel and safety of navigation'],
    ['Fırtınadan kaçınmak için rota değişikliği', 'Route change to avoid the storm'],
  ];
  for (const [source, target] of cases) {
    assert.equal(repairEnglishMaritimeTerminology(source, target), target, source);
    assert.deepEqual(findEnglishMaritimeTerminologyIssues(source, target), [], source);
  }
});

test('legacy broad repairs are narrowed back to their source sense', () => {
  assert.equal(
    repairEnglishMaritimeTerminology('Risk haritası ne zaman güncellenir?', 'When is the risk chart updated?'),
    'When is the risk map updated?',
  );
  assert.equal(
    repairEnglishMaritimeTerminology('Kompresör haritası', 'Compressor chart'),
    'Compressor map',
  );
  assert.equal(
    repairEnglishMaritimeTerminology('Yolcu gemisi personeli ve seyir güvenliği', 'Navigation ship personnel and safety of navigation'),
    'Passenger-ship personnel and safety of navigation',
  );
  assert.equal(
    repairEnglishMaritimeTerminology('Stratejik sular ve çatışma bölgeleri', 'Strategic waters and collision zones'),
    'Strategic waters and conflict zones',
  );
});

test('legacy overcorrection of regulatory AB is restored to EU', () => {
  assert.equal(repairEnglishMaritimeTerminology('AB ÖZELİ:', 'AB SPECIAL:'), 'EU SPECIAL:');
  assert.equal(repairEnglishMaritimeTerminology('Liman (AB)', 'Port (AB)'), 'Port (EU)');
  assert.equal(
    repairEnglishMaritimeTerminology('AB üyesi devletler', 'AB member states'),
    'EU member states',
  );
});

test('course repair is limited to angular navigation phrases', () => {
  assert.equal(
    repairEnglishMaritimeTerminology(
      'AIS raporlarında rota değişimi ve alternatif rota',
      'AIS reports on route change and alternative routes',
    ),
    'AIS reports on course change and alternative routes',
  );
  assert.equal(
    repairEnglishMaritimeTerminology(
      'Vertex enlemi 62°N olan bir büyük daire rotası',
      'A great-circle route with a vertex latitude of 62°N',
    ),
    'A great-circle route with a vertex latitude of 62°N',
  );
});

test('havuzlama is dry-docking, but FuelEU pooling stays pooling', () => {
  assert.equal(
    repairEnglishMaritimeTerminology('ölçümler havuzlamada yapılır.', 'measurements are made during pooling.'),
    'measurements are made during dry-docking.',
  );
  assert.equal(
    repairEnglishMaritimeTerminology("Deficit'in maliyeti ve havuzlamanın ekonomik mantığı", 'The cost of the deficit and the economic logic of pooling'),
    'The cost of the deficit and the economic logic of pooling',
  );
});

test('yüzme of a hull or a float is flotation, not swimming', () => {
  assert.equal(
    repairEnglishMaritimeTerminology('LCF: Yüzme merkezi konumu (midship\'ten)', 'LCF: Swim center location (from midship)'),
    'LCF: Centre of flotation location (from midship)',
  );
  assert.equal(
    repairEnglishMaritimeTerminology("d: LCF'ye (yüzme merkezine) göre boyuna mesafe (m)", 'd: Longitudinal distance relative to LCF (center of swimming) (m)'),
    'd: Longitudinal distance relative to LCF (centre of flotation) (m)',
  );
  assert.equal(repairEnglishMaritimeTerminology('Mekanik yüzme', 'Mechanical swimming'), 'Mechanical flotation');
  assert.equal(
    repairEnglishMaritimeTerminology('Yüzme ve kaldırma kuvvetinin fiziksel temelleri', 'Physical foundations of swimming and buoyancy'),
    'Physical foundations of flotation and buoyancy',
  );
  assert.equal(
    repairEnglishMaritimeTerminology('yüzdükten sonraki emniyetli mevkii içerir', 'safe position after swimming'),
    'safe position after refloating',
  );
});
