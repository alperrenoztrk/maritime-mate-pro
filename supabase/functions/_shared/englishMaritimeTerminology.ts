// Source-aware English maritime terminology repair.
// -----------------------------------------------------------------------------
// Generic machine translation can produce fluent English that is operationally
// wrong in a maritime context ("Reis" -> "Chief", "Bilge" -> "Wise",
// "ana makine" -> "main machine").  Output-only replacement is unsafe because
// many Turkish words are polysemous: AB is either Able Seaman or European Union,
// demir is anchor or iron, iskele is port side or pier, and tahliye is discharge
// or evacuation.  Every rule below therefore requires BOTH the Turkish source
// sense and a known-bad English rendering.
//
// This module is shared by the web runtime, locale generators and the Supabase
// translation function.  The same exported rule set also powers the regression
// audit, so repair and verification cannot drift apart.

export type EnglishReplacement =
  | string
  | ((match: string, ...groups: string[]) => string);

export interface EnglishTerminologyRule {
  /** Audit family from Maritime_Mate_Pro_English_Terminology_Audit_2026-08-14. */
  id: `T-${string}`;
  label: string;
  source: RegExp;
  wrong: RegExp;
  replacement?: EnglishReplacement;
  applies?: (source: string, translation: string) => boolean;
  repair?: (source: string, translation: string) => string;
}

export interface EnglishTerminologyIssue {
  id: string;
  label: string;
}

const test = (pattern: RegExp, text: string): boolean => {
  pattern.lastIndex = 0;
  return pattern.test(text);
};

const replace = (
  text: string,
  pattern: RegExp,
  replacement: EnglishReplacement,
): string => {
  pattern.lastIndex = 0;
  return text.replace(pattern, replacement as never);
};

const matchCase = (match: string, replacement: string): string => {
  const letters = match.match(/\p{L}/gu)?.join('') ?? '';
  if (letters && letters === letters.toLocaleUpperCase('en')) {
    return replacement.toLocaleUpperCase('en');
  }
  const first = replacement.match(/\p{L}/u)?.[0];
  const matchFirst = match.match(/\p{L}/u)?.[0];
  if (first && matchFirst && matchFirst === matchFirst.toLocaleUpperCase('en')) {
    const index = replacement.indexOf(first);
    return replacement.slice(0, index) + first.toLocaleUpperCase('en') + replacement.slice(index + first.length);
  }
  return replacement;
};

const asTerm = (replacement: string): EnglishReplacement =>
  (match: string) => matchCase(match, replacement);

const asPluralTerm = (singular: string, plural: string): EnglishReplacement =>
  (match: string) => matchCase(match, /s$/i.test(match) ? plural : singular);

const EU_REGULATORY_SOURCE_RE =
  /(?:emisyon|ETS|FuelEU|MRV|SRR|Avrupa\s+Birliği|AB[- ](?:dışı|içi|üye|liman|bayrak|PSC|PRF|direktif|düzenleme)|AB(?:'nin|'de|'ye|'den)?\s+(?:liman|üye|direktif|düzenleme|karbon|emisyon|bayrak)|^\s*AB\s+ÖZELİ:?\s*$|Liman\s*\(AB\))/iu;
const CREW_AB_SOURCE_RE =
  /(?:usta\s+gemici|able\s+seaman|güverte|mürettebat|reis|bosun|OOW|OS\b|lookout|gözc|vardiya|mooring|palamar|halat|tank\s+temiz|yük\s+operasyon|kapalı\s+mekan|LSA|PPE|standby|1\/O|\bAB\s*(?:\/\s*OS|aksiyonu|ekibi|görevi|rolü|sorumluluğu|perspektifi)|\+\s*\d*\s*AB\b)/iu;
const CREW_AB_TARGET_RE =
  /(?<!non-)(?<!intra-)\bEU\b(?!\s*(?:ETS|MRV|SRR|PSC|PRF|Directive|Regulation|Emissions?|ports?\b|member\b|flagged\b|carbon\b|FuelEU))/giu;

const isCrewAbSource = (source: string): boolean =>
  /(?:^|[^\p{L}\p{N}])AB(?![\p{L}\p{N}])/u.test(source) &&
  (CREW_AB_SOURCE_RE.test(source) || !EU_REGULATORY_SOURCE_RE.test(source));

const restoreRegulatoryEu = (source: string, translation: string): string => {
  if (!EU_REGULATORY_SOURCE_RE.test(source) || CREW_AB_SOURCE_RE.test(source)) return translation;
  return translation.replace(/\bAB\b/g, 'EU');
};

const restorePersonnelEvacuation = (source: string, translation: string): string => {
  if (!PERSONNEL_EVACUATION_SOURCE_RE.test(source)) return translation;
  return translation
    .replace(/\b(personnel|passengers?|people|occupants?|casualties)\s+discharge\b/gi, (_m, group: string) => `${group} evacuation`)
    .replace(/\bdischarge\s+of\s+(personnel|passengers?|people|occupants?|casualties)\b/gi, (_m, group: string) => `evacuation of ${group}`)
    .replace(/\bmass\s+discharge\b/gi, 'mass evacuation')
    .replace(/\b(?:very\s+)?fast\s+and\s+reliable\s+discharge\b/gi, 'fast and reliable evacuation')
    .replace(/\bvery\s+fast\s+discharge\b/gi, 'very fast evacuation')
    .replace(/\bdischarge\s+systems\b/gi, 'evacuation systems')
    .replace(/\bdischarge\s+(?:period|time)\b/gi, 'evacuation time')
    .replace(/\bactive\s+cooling\s+and\s+discharge\b/gi, 'active cooling and evacuation')
    .replace(/\bdischarge\s*\+\s*count\b/gi, 'evacuation + headcount')
    .replace(/\bdischarge\s+and\s+(?:a\s+)?(?:complete|full)\s+head\s*count\b/gi, 'evacuation and a full headcount')
    .replace(/\brequires\s+the\s+discharge\s+of\s+the\s+(area|space)\b/gi, (_m, group: string) => `requires evacuation of the ${group}`)
    .replace(/\bDischarge\s+on\s+(Ro-Ro\/cruise\s+ships)\b/g, 'Evacuation on $1');
};

const PORT_DIRECTION_SOURCE_RE =
  /(?:iskele\s+(?:taraf|borda|baş|kıç|omuzluk|fener|çarmıh|dümen)|(?:baş|kıç)\s+iskele|iskele(?:ye|den|de|nin)?\s+(?:dön|al|bas|yanaş|açık|kapalı)|iskele\s*\/\s*sancak|sancak\s*\/\s*iskele|iskelede\s+(?:kırmızı|yeşil)|iskele\s+yön)/iu;
const ANCHOR_SOURCE_EXCLUSION_RE =
  /(?:\bFe\b|demir[- ]karbon|dökme\s+demir|yumuşak\s+demir|indirgenmiş\s+demir|demir\s+(?:cevheri|kütlesi|içeriği|konsantrasyonu|fazı|tozu|parçacıkları|ve\s+bakır|metal|çelik)|demir-konstantan|[γδ]-demir|ferromanyetik|manyetik\s+(?:alan|pusula|sapma|deviation)|demirden\s+yap|çelik[^.!?]{0,80}demir|demir[^.!?]{0,80}(?:alaşım|element|oksitlen|korozyon)|iron\s+ore)/iu;
const ANCHOR_OPERATION_SOURCE_RE =
  /(?:(?:zincir|ırgat|windlass|loça|barboten|funda|fundo|vira|kaloma|demirleme|demirli|çapa|anchor|dragging|walk[- ]back|let\s+go|başüstü|şamandıra)[^.!?]{0,160}\bdemir|\bdemir[^.!?]{0,160}(?:zincir|ırgat|windlass|loça|barboten|funda|fundo|vira|kaloma|demirleme|çapa|anchor|dragging|walk[- ]back|let\s+go|başüstü|fren)|\bdemir(?:i|im|in|de|den|ler)?\s*(?:dip|loça|operasyon|saha|durum|hesap|kayb|temiz|tara|tarıyor|al\b|bırak|fundo|tut|tırnak|serbest|hazır|kaybol|paslan|işaret|yerine)|(?:ikinci|yedek)\s+demir)/iu;
const CURRENT_SOURCE_EXCLUSION_RE = /(?:hava\s+akınt|elektrik\s+akınt|yağ\s+akınt|kan\s+akınt)/iu;
const NON_NAUTICAL_MAP_SOURCE_RE =
  /(?:(?:besleme|tehlike|sorumluluk|risk|[iİIı]s[iİIı]|kompresör|interaction|trap|bait\s+station|alışkanlık|ağ|kural|dünya|yol)\s+harita|atık\s+akış[^.!?]{0,30}harita|konfigürasyon[^.!?]{0,30}harita|sistemin[^.!?]{0,40}harita)/iu;
const ROUTA_IS_COURSE_SOURCE_RE =
  /(?:rota(?:sı|sını|sına|dan|ya)?\s*(?:açı|değer|°|derece|komut|koru|tut|sapma)|(?:hakiki|manyetik|pusula|cayro|gyro|karşı|pruva|COG|HDG)\s+rota|rota\s+(?:hakiki|manyetik|pusula|cayro)|\b\d{1,3}°(?!\s*[NSEW])[^.!?]{0,30}\brota|(?:AIS|ani\s+ve\s+büyük|hız\s+ve)[^.!?]{0,80}rota\s+değiş)/iu;
const ANGULAR_ROUTE_TARGET_RE =
  /\b(?:(?:true|actual|genuine|real|magnetic|compass|gyro|opposite|counter)\s+routes?|routes?\s+(?:angles?|values?|commands?|keeping|measurement|directions?|deviation\s+limits?|lines?)|resulting\s+route|route\s+taken|route\s+is\s+(?:maintained|kept)|(?:sudden\s+and\s+major\s+)?route\s+changes?|change\s+of\s+(?:speed\s+(?:and|or|and\/or)\s+)?route|(?:changing|change)\s+(?:the\s+)?speed\s+(?:and|or|and\/or)\s+route|speed\s+(?:and|or|and\/or)\s+route)\b|\b\d{1,3}°\s*[TM]?\s+routes?\b/giu;
const NON_BEARING_BED_SOURCE_RE =
  /(?:çarşaf|havlu|kamar|revir|hasta|yatak\s+(?:yapım|düzen|takım|odası)|zemin|tezgah|sigara|temizli|hijyen|dezenf|linen|accommodation|steward|kamarot|deniz\s+yata|nehir\s+yata|akarsu\s+yata|kanal\s+yata)/iu;
const ENGINE_BEARING_SOURCE_RE = /yata(?:k|ğ)/iu;
const SHIP_HULL_SOURCE_RE =
  /(?:çelik|sualtı|dalga|gemi|tekne|anot|ICCP|katodik|biofouling|anti-fouling|pervane|propeller|seakeeping|CII|koruyucu\s+potansiyel|koruma\s+akımı|galvanik\s+korozyon|itki\s+kuvveti|ikincil\s+bariyer|wall-sided|iletken-|hat-|bara-|elektrik\s+iletken|toprak\s+kaçağı|topraklama|yalıtım\s+direnci|omurga|enine\s+yapısal|optimum\s+trim|self-righting|makine\s+titreşim|yükün)[^.!?]{0,120}gövde|gövde[^.!?]{0,120}(?:çelik|korozyon|anot|ICCP|katodik|biofouling|anti-fouling|dalga|gemi|tekne|sürtünme|diren[cç]|form|stabilite|BM|GM|pervane|propeller|seakeeping|CII|boya|kaplama|deformasyon|mukavemet|gerilme|yapısal|hacim|mikro\s+kabar|geometri|temiz|yatak\s+hiza|izolasyon|yalıtım|koruyucu\s+potansiyel|koruma\s+akımı|hasar|trim|toprak|sa[cç]|self-righting)/iu;
const NON_OIL_FAT_SOURCE_RE =
  /(?:protein|karbonhidrat|doymuş|makro\s+denge|öğün|gıda|mutfak|pişirme|cooking|fritöz|Class\s+[FK]|doku|enfeksiyon|yanık|buz)/iu;
const PERSONNEL_EVACUATION_SOURCE_RE =
  /tahliye\s*\+\s*sayım|acil\s+aydınlatma[^.!?]{0,80}tahliye\s+sistem|(?:personel|insan|yolcu|mürettebat|kazazede|yaralı|kişi|gemiyi\s+terk|abandon\s+ship|filika|lifeboat|freefall|Ro-Ro\s*\/\s*yolcu|ısı\s+çarpması)[^.!?]{0,140}tahliye|tahliye[^.!?]{0,140}(?:personel|insan|yolcu|mürettebat|kazazede|yaralı|kişi|gemiyi\s+terk|abandon\s+ship|filika|lifeboat|freefall|Ro-Ro\s*\/\s*yolcu|ısı\s+çarpması)/iu;
const PSC_SOURCE_RE = /(?:\bPSC\b|port\s+state|liman\s+devleti|Paris\s+MoU|THETIS)/iu;
const PSC_DETENTION_SOURCE_RE =
  /(?:alıkoyma|gemi(?:nin)?\s+tutul|tutulma\s+(?:neden|kriter))/iu;
const NON_COLLISION_CONFLICT_SOURCE_RE =
  /(?:ekip\s+içinde|kültürel|çıkar\s+çatışması|uyum\s+çatışması|rol\s+belirsizliği|talimatı\s+çatışması|çözülmemiş\s+çatışma|fiziksel\s+çatışma|çatışma\s+yönetimi|çatışma\s+çözümü|çatışma\s+bölge|korsanlık|cinsel|davranış)/iu;
const ACCOUNT_SOURCE_RE =
  /^\s*hesap\s*$|\b(?:banka|kullanıcı|üye|oturum|e-posta|google|apple)\s+hesab|hesab[^.!?]{0,40}\b(?:google|apple|e-?posta|şifre|parola|oturum)\b|hesab[ıi]m|hesab[ıi]n[ıi]z|hesap\s+(?:ve\s+veri\s+)?silme|hesab[ıi]\s*(?:kalıcı olarak\s*)?sil/iu;
const CARGO_SECURING_SOURCE_RE =
  /(?:(?:yük|kargo|araç|Ro-Ro|CSS\s+Code|CTU|lashing)[^.!?]{0,120}bağlama|bağlama[^.!?]{0,120}(?:yük|kargo|araç|Ro-Ro|CSS\s+Code|CTU|lashing))/iu;
const MACHINERY_STACK_SOURCE_RE =
  /(?:kazan|yanma|ekonomizer|brülör|O[₂2]|fazla\s+hava|baca\s+(?:kayb|sıcak|damper)|atık\s+ısı|egzoz|flue|uptake)/iu;

const bosunRepair = (_source: string, translation: string): string => {
  let out = translation
    .replace(/\b(?:The\s+)?(?:Chief|Chieftain|Reis|Boss)\s*\(Bosun\)/gi, (m) => matchCase(m, 'Bosun'))
    .replace(/\b(?:Chief|Chieftain|Reis|Boss)(?:'s|s')\b/gi, (m) => matchCase(m, "Bosun's"));
  out = out.replace(
    /\b(?:Chief|Chieftain|Reis|Boss)\b(?!\s+(?:Officer|Mate|Engineer|Cook)\b)/gi,
    (m) => matchCase(m, 'Bosun'),
  );
  return out;
};

const restoreNonNauticalMapSense = (source: string, translation: string): string => {
  if (!NON_NAUTICAL_MAP_SOURCE_RE.test(source)) return translation;
  return translation
    .replace(/\broad\s+chart\b/gi, (m) => matchCase(m, 'roadmap'))
    .replace(
      /\b(feed|supply|hazard|responsibility|risk|interaction|trap|bait\s+station|habit|heat|compressor|network|rule|world|system)\s+(chart)(s?)\b/gi,
      (_m, qualifier: string, chart: string, plural: string) =>
        `${qualifier} ${matchCase(`${chart}${plural}`, plural ? 'maps' : 'map')}`,
    )
    .replace(/\b(chart)(s?)\s+of\s+waste\s+streams\b/gi, (_m, chart: string, plural: string) =>
      `${matchCase(`${chart}${plural}`, plural ? 'maps' : 'map')} of waste streams`)
    .replace(/\b(chart)(s?)\s+of\s+the\s+system\b/gi, (_m, chart: string, plural: string) =>
      `${matchCase(`${chart}${plural}`, plural ? 'maps' : 'map')} of the system`)
    .replace(/\bconfiguration,\s+chart,\s+parameters\b/gi, 'configuration, map, parameters');
};

const restorePassengerShipSense = (source: string, translation: string): string => {
  if (!/(?:yolcu|cruise)[^.!?]{0,20}gemi/iu.test(source)) return translation;
  return translation
    .replace(/\bpassenger\s*\/\s*navigation\s+ships\b/gi, (m) => matchCase(m, 'passenger/cruise ships'))
    .replace(/\bnavigation\s+ship\s+personnel\b/gi, (m) => matchCase(m, 'passenger-ship personnel'))
    .replace(/\bnavigation\s+ships?\b/gi, (m) => matchCase(m, /ships$/i.test(m) ? 'passenger ships' : 'passenger ship'));
};

const restoreConflictZoneSense = (source: string, translation: string): string => {
  if (!/çatışma\s+bölge/iu.test(source)) return translation;
  return translation.replace(/\bcollision\s+zones?\b/gi, (m) =>
    matchCase(m, /zones$/i.test(m) ? 'conflict zones' : 'conflict zone'));
};

const restoreGasFreeingSense = (source: string, translation: string): string => {
  if (!/gas-freeing/iu.test(source)) return translation;
  return translation.replace(
    /gas-freeing\s*\(discharging\s+the\s+tank\s+for\s+human\s+entry\)/gi,
    'gas-freeing (ventilating the tank for human entry)',
  );
};

const quarterRepair = (source: string, translation: string): string => {
  const term = /kıç\s+omuzluk/iu.test(source)
    ? 'stern quarter'
    : /baş\s+omuzluk/iu.test(source)
      ? 'bow quarter'
      : 'quarter';
  return translation.replace(/\bshoulder(?:\s+strap|\s+pad)?\b/gi, (m) => matchCase(m, term));
};

const funnelRepair = (source: string, translation: string): string => {
  const term = MACHINERY_STACK_SOURCE_RE.test(source) ? 'stack' : 'funnel';
  return translation.replace(/\bchimneys?\b/gi, (m) =>
    matchCase(m, /s$/i.test(m) ? `${term}s` : term));
};

const courseRepair = (_source: string, translation: string): string => {
  return replace(translation, ANGULAR_ROUTE_TARGET_RE, (phrase: string) =>
    phrase.replace(/\broutes?\b/i, (route) =>
      matchCase(route, /s$/i.test(route) ? 'courses' : 'course')));
};

const navigationLightRepair = (source: string, translation: string): string => {
  const term = /deniz\s+fener/iu.test(source)
    ? 'lighthouse'
    : /(?:seyir|borda|silyon|kıç)\s+fener/iu.test(source)
      ? 'navigation light'
      : 'light';
  return translation.replace(/\blanterns?\b/gi, (m) =>
    matchCase(m, /s$/i.test(m) ? `${term}s` : term));
};

const navigationRepair = (source: string, translation: string): string => {
  if (/akıntısız\s+seyir/iu.test(source)) {
    return translation.replace(/\b(?:smooth\s+sailing|sailing\s+without\s+current)\b/gi, (m) => matchCase(m, 'navigation without current'));
  }
  if (/akıntılı\s+seyir/iu.test(source)) {
    return translation.replace(/\bsmooth\s+sailing\b/gi, (m) => matchCase(m, 'navigation with current'));
  }
  if (/düzlem\s+seyir/iu.test(source)) {
    return translation.replace(/\blevel\s+sailing\b/gi, (m) => matchCase(m, 'plane sailing'));
  }
  if (/seyir\s+dönem/iu.test(source)) {
    return translation.replace(/\bsailing\s+periods?\b/gi, (m) => matchCase(m, /s$/i.test(m) ? 'sea-service periods' : 'sea-service period'));
  }
  if (/seyir\s+saat/iu.test(source)) {
    return translation.replace(/\b(?:sailing|cruise)\s+(?:time|hours?)\b/gi, (m) => matchCase(m, 'hours underway'));
  }
  return translation.replace(/\bcruise\b(?!\s+(?:ships?|liners?|vessels?)\b)/gi, (m) => matchCase(m, 'navigation'));
};

const dischargeRepair = (source: string, translation: string): string => {
  const term = /(?:CO[₂2]|gaz|sabit\s+yangın|release)/iu.test(source) ? 'discharge' : 'unloading';
  return translation.replace(/\b(?:evacuation|unloading|venting)\b/gi, (m) => {
    const replacement = /^venting$/i.test(m) && term === 'discharge' ? 'discharging' : term;
    return matchCase(m, replacement);
  });
};

const rudderRepair = (source: string, translation: string): string => {
  const term = /dümen\s+(?:makinesi\s+daires|daires)/iu.test(source)
    ? 'steering gear compartment'
    : /dümen\s+makines/iu.test(source)
      ? 'steering gear'
      : 'rudder';
  return translation.replace(/\bsteering\s+wheel(?:\s+house)?\b/gi, (m) => matchCase(m, term));
};

const ENGINE_SPEED_SOURCE_RE =
  /(?:aktif\s+uyarı[^.!?]{0,80}devirde|vardiya\s+devir|devirde\s+pusula|güç\s*\/\s*devir|devir\s+hatas|devire\s*\(basınç|(?:dört|iki|yarım|her\s*2)\s+devir|IACS\s+UR\s+M68|kritik\s+devir|L10|L₁₀|devir\s+bazlı|devir\s+kontrol|gerçek\s+devir\s+koşul|devir\s+kaçağı|yeterli\s+devir|orta\s+devir)/iu;

const engineSpeedRepair = (source: string, translation: string): string => {
  const normalizedSource = source.toLocaleLowerCase('tr');
  if (/devir\s+kaçağı/u.test(normalizedSource)) {
    return translation.replace(/\bcycle\s+leakage\b/gi, (m) => matchCase(m, 'overspeed'));
  }
  if (/devir\s+bazlı/u.test(normalizedSource)) {
    return translation.replace(/\bcycle[- ]based\b/gi, (m) => matchCase(m, 'engine-speed based'));
  }
  const term = /(?:l10|l₁₀|(?:dört|iki|yarım|her\s*2)\s+devir)/u.test(normalizedSource)
    ? 'revolution'
    : /(?:vardiya\s+devir|devirde\s+(?:pusula|aktar))/u.test(normalizedSource)
      ? 'watch handover'
      : 'speed';
  return translation.replace(/\bcycles?\b/gi, (m) => {
    const plural = /s$/i.test(m);
    return matchCase(m, plural ? `${term}s` : term);
  });
};

export const ENGLISH_TERMINOLOGY_RULES: EnglishTerminologyRule[] = [
  { id: 'T-001', label: 'Reis must be Bosun', source: /\breis/iu, wrong: /\b(?:the\s+)?(?:chief|chieftain|reis|boss)\b(?!\s+(?:officer|mate|engineer|cook)\b)(?:\s*\(Bosun\))?/iu, repair: bosunRepair },
  { id: 'T-002', label: 'crew AB must not become EU', source: /(?:^|[^\p{L}\p{N}])AB(?![\p{L}\p{N}])/u, wrong: CREW_AB_TARGET_RE, applies: isCrewAbSource, replacement: 'AB' },
  { id: 'T-003', label: 'Usta Gemici must be Able Seaman', source: /usta\s+gemici/iu, wrong: /\bmaster\s+sailor\b/giu, replacement: asTerm('Able Seaman') },
  { id: 'T-004', label: 'Birinci Zabit must be Chief Officer', source: /birinci\s+zabit/iu, wrong: /\bfirst\s+officer\b/giu, replacement: asTerm('Chief Officer') },
  { id: 'T-005', label: 'ship rank Kaptan must be Master', source: /\bkaptan/iu, wrong: /\bcaptain\b/giu, applies: (source) => !/kaptan\s+(?:Cook|Phillips|Smith)\b/iu.test(source), replacement: asTerm('Master') },
  { id: 'T-006', label: 'Aşçı must be Cook', source: /\başçı/iu, wrong: /\b(?:ship\s+)?chef\b/giu, replacement: asTerm('Cook') },
  { id: 'T-007', label: 'Gözcü/gözcülük must use lookout', source: /gözc/iu, wrong: /\b(?:watcher|surveillance|observation)\b/giu, replacement: asTerm('lookout') },
  { id: 'T-008', label: 'shipboard vardiya must be watch', source: /vardiya/iu, wrong: /\bshifts?\b/giu, replacement: asPluralTerm('watch', 'watches') },
  { id: 'T-009', label: 'Kapalı mekan must be enclosed space', source: /kapalı\s+(?:mekan|mekân|mahal)/iu, wrong: /\bindoor(?:\s+space)?\b/giu, replacement: asTerm('enclosed space') },
  { id: 'T-010', label: 'Toplanma alanı must be muster station', source: /toplanma\s+alan/iu, wrong: /\bgathering\s+area\b/giu, replacement: asTerm('muster station') },
  { id: 'T-011', label: 'Terk gemi must be abandon ship', source: /terk\s+gemi/iu, wrong: /\babandoned\s+ship\b/giu, replacement: asTerm('abandon ship') },
  { id: 'T-012', label: 'Can simidi must be lifebuoy', source: /can\s+simid/iu, wrong: /\b(?:life\s+ring|donut)s?\b/giu, replacement: asPluralTerm('lifebuoy', 'lifebuoys') },
  { id: 'T-013', label: 'Can salı must use IMO liferaft spelling', source: /can\s+sal/iu, wrong: /\blife\s+rafts?\b/giu, replacement: asPluralTerm('liferaft', 'liferafts') },
  { id: 'T-014', label: 'LSA dalış elbisesi must be immersion suit', source: /dalış\s+elbises/iu, wrong: /\bdiving\s+suits?\b/giu, replacement: asPluralTerm('immersion suit', 'immersion suits') },
  { id: 'T-015', label: 'Yangın elbisesi must be firefighter outfit', source: /yangın\s+elbises/iu, wrong: /\bfire\s+suit\b/giu, replacement: asTerm("firefighter's outfit") },
  { id: 'T-016', label: 'Can kurtarma must use life-saving', source: /can\s+kurtarma/iu, wrong: /\blife\s+saving\b/giu, replacement: asTerm('life-saving') },
  { id: 'T-017', label: 'shipboard tatbikat must be drill', source: /tatbikat/iu, wrong: /\b(?:exercise|practice)s?\b/giu, replacement: asPluralTerm('drill', 'drills') },
  { id: 'T-018', label: 'COLREG RAM phrase must be standard', source: /manevra\s+kabiliyeti\s+kısıtlı/iu, wrong: /\b(?:limited|restricted)\s+maneuverability\b/giu, replacement: asTerm('restricted in her ability to manoeuvre') },
  { id: 'T-019', label: 'Yangın dolabı must be fire-hose cabinet', source: /yangın\s+dolab/iu, wrong: /\bfire\s+cabinet\b/giu, replacement: asTerm('fire-hose cabinet') },
  { id: 'T-020', label: 'Denize atım must be discharge to sea', source: /denize\s+atım/iu, wrong: /\bmy\s+horse\s+to\s+the\s+sea\b/giu, replacement: asTerm('discharge to sea') },
  { id: 'T-021', label: 'Denize atım YOK must be no discharge to sea', source: /denize\s+atım\s+yok/iu, wrong: /\bI\s+DO\s+NOT\s+throw\s+a\s+horse\s+into\s+the\s+sea\b/giu, replacement: 'NO discharge to sea' },
  { id: 'T-022', label: 'FREEFALL İNDİRME must be free-fall launching', source: /freefall\s+indirme/iu, wrong: /\bfreefall\s+download\b/giu, replacement: 'FREE-FALL LAUNCHING' },
  { id: 'T-023', label: 'SAL İNDİRME must be liferaft launching', source: /sal\s+indirme/iu, wrong: /\brail\s+download\b/giu, replacement: 'LIFERAFT LAUNCHING' },
  { id: 'T-024', label: 'closing a generator breaker must not say turn off', source: /şalteri\s+kapat/iu, wrong: /\bturn\s+off\s+the\s+(?:master\s+)?switch\b/giu, replacement: asTerm('close the breaker') },
  { id: 'T-025', label: 'opening a generator breaker must not say turn on', source: /şalteri\s+aç/iu, wrong: /\bturn\s+on\s+the\s+(?:master\s+)?switch\b/giu, replacement: asTerm('open the breaker') },
  { id: 'T-026', label: 'MARPOL pis su must be sewage', source: /pis\s+su/iu, wrong: /\bdirty\s+water\b/giu, replacement: asTerm('sewage') },
  { id: 'T-027', label: 'Bilge must not become Wise', source: /\bbilge\b/iu, wrong: /\bwise\b/giu, replacement: asTerm('bilge') },
  { id: 'T-028', label: 'Ambar must be cargo hold', source: /ambar/iu, wrong: /\bwarehouses?\b/giu, replacement: asPluralTerm('cargo hold', 'cargo holds') },
  { id: 'T-029', label: 'directional iskele must be port', source: PORT_DIRECTION_SOURCE_RE, wrong: /\b(?:pier|scaffolding|dock)(?:\s+side)?\b/giu, replacement: asTerm('port') },
  { id: 'T-030', label: 'directional sancak must be starboard', source: /sancak/iu, wrong: /\b(?:flag|banner)(?:\s+side)?\b/giu, replacement: asTerm('starboard') },
  { id: 'T-031', label: 'omuzluk must be hull quarter', source: /omuzluk/iu, wrong: /\bshoulder(?:\s+strap|\s+pad)?\b/iu, repair: quarterRepair },
  { id: 'T-032', label: 'Loça must be hawse pipe', source: /loça/iu, wrong: /\blodge\b/giu, replacement: asTerm('hawse pipe') },
  { id: 'T-033', label: 'Barboten must be cable lifter', source: /barboten/iu, wrong: /\bbarboten\b/giu, replacement: asTerm('cable lifter') },
  { id: 'T-034', label: 'mooring baba must be bollard', source: /(?:palamar|halat|bağla|mooring|güverte|rıhtım|\bbaba(?:lar|ya|dan|nın)?\b)/iu, wrong: /\b(?:father|dad|dollars?)\b/giu, replacement: asTerm('bollard') },
  { id: 'T-035', label: 'Borda must be ship side', source: /borda/iu, wrong: /\bsideboard\b/giu, replacement: asTerm("ship's side") },
  { id: 'T-036', label: 'ship baca must be funnel/stack', source: /baca/iu, wrong: /\bchimneys?\b/iu, repair: funnelRepair },
  { id: 'T-037', label: 'Omurga must be keel', source: /omurga/iu, wrong: /\bspines?\b/giu, replacement: asPluralTerm('keel', 'keels') },
  { id: 'T-038', label: 'ship gövde must be hull', source: /gövde/iu, wrong: /\bbody\b/giu, applies: (source) => SHIP_HULL_SOURCE_RE.test(source.toLocaleLowerCase('tr')), replacement: asTerm('hull') },
  { id: 'T-039', label: 'ship structural perde must be bulkhead', source: /(?:su\s+geçirmez|watertight|yangın|çarpışma|çatışma|tank|gemi|enine|boyuna|bölme|sınır)\s+perde|perde\s+(?:sacı|mukavemet|kapı)|kapak\s*\/\s*perde\s*\/\s*tank/iu, wrong: /\bcurtains?\b/giu, replacement: asPluralTerm('bulkhead', 'bulkheads') },
  { id: 'T-040', label: 'Matafora must be davit', source: /matafora/iu, wrong: /\bcrane(?:-like\s+mechanism)?s?\b/giu, replacement: asPluralTerm('davit', 'davits') },
  { id: 'T-041', label: 'Kenter kilidi must be joining shackle', source: /kenter\s+kilid/iu, wrong: /\bkenter\s+lock\b/giu, replacement: asTerm('Kenter joining shackle') },
  { id: 'T-042', label: 'anchor-chain/lifting kilit must be shackle', source: /(?:demir|zincir|kenter|posa)[^.!?]{0,40}kil(?:it|id)|kil(?:it|id)[^.!?]{0,40}(?:demir|zincir|27[,.]5)|(?:bakla\s+boya|tel\s+sarımlar|kaç\s+kilit|yaklaşık\s+\d+\s+kilit)|(?:halat|makara)[^.!?]{0,30}kanca[^.!?]{0,30}kilit/iu, wrong: /\blocks?\b/giu, replacement: asPluralTerm('shackle', 'shackles') },
  { id: 'T-043', label: 'Çıma must be rope end', source: /çıma/iu, wrong: /\bsticks?\b/giu, replacement: asPluralTerm('rope end', 'rope ends') },
  { id: 'T-044', label: 'Palamar/bağlama halatı must be mooring line', source: /(?:palamar|bağlama)\s+halat/iu, wrong: /\bmooring\s+ropes?\b/giu, replacement: asPluralTerm('mooring line', 'mooring lines') },
  { id: 'T-045', label: 'operational halat must be line', source: /(?:baş|kıç|spring|çekme|römork|tug|palamar)\s+halat|halat(?:ı|ın|lar)?\s+(?:ver|al|tut|boşla|bağla|çöz|ger|kop)/iu, wrong: /\brope(s)?\b/giu, replacement: (_m, plural) => plural ? 'lines' : 'line' },
  { id: 'T-046', label: 'ship bağlama must be mooring', source: /(?:gemi|rıhtım|iskele|palamar|halat)[^.!?]{0,40}bağlama|bağlama\s+(?:operasyon|istasyon|plan|ekip|donanım)/iu, wrong: /\b(?:binding|connecting)(?:\s+operation)?\b/giu, applies: (source) => !CARGO_SECURING_SOURCE_RE.test(source), replacement: asTerm('mooring') },
  { id: 'T-047', label: 'Yük bağlama must be cargo securing', source: CARGO_SECURING_SOURCE_RE, wrong: /\b(?:load|cargo)?\s*(?:binding|connecting|mooring)\b/giu, replacement: asTerm('cargo securing') },
  { id: 'T-048', label: 'Gemici bağları must be seamanship knots', source: /(?:gemici\s+bağları|izbarço|düğüm)/iu, wrong: /\b(?:Gemici\s+)?Vineyards?\b/giu, replacement: asTerm('seamanship knots') },
  { id: 'T-049', label: 'Gemicilik must be seamanship', source: /gemicilik/iu, wrong: /\b(?:shipping|sailing)\b/giu, replacement: asTerm('seamanship') },
  { id: 'T-050', label: 'anchor demir must not become iron', source: /demir/iu, wrong: /\biron\b/giu, applies: (source) => ANCHOR_OPERATION_SOURCE_RE.test(source) && !ANCHOR_SOURCE_EXCLUSION_RE.test(source), replacement: asTerm('anchor') },
  { id: 'T-051', label: 'magnetic demir kütlesi must remain iron mass', source: /demir\s+kütlesi|manyetik[^.!?]{0,60}demir/iu, wrong: /\banchor\s+mass\b/giu, replacement: asTerm('iron mass') },
  { id: 'T-052', label: 'Vira must be heave in', source: /\bvira\b/iu, wrong: /\b(?:steering|sailing|bending|vira|turn(?:ing)?)\b/giu, replacement: asTerm('heave in') },
  { id: 'T-053', label: 'Funda must be let go anchor', source: /\bfunda\b/iu, wrong: /\b(?:moored|sheathing|bending|heather|foundation)\b/giu, replacement: asTerm('let go anchor') },
  { id: 'T-054', label: 'Laçka must be slack away', source: /laçka/iu, wrong: /\b(?:drifting|empty)\b/giu, replacement: asTerm('slack away') },
  { id: 'T-055', label: 'Volta et must be make fast', source: /volta\s+et/iu, wrong: /\bpac(?:e|ing)\b/giu, replacement: asTerm('make fast') },
  { id: 'T-056', label: 'Fora must be cast off', source: /\bfora\b/iu, wrong: /\b(?:put\s+in|forward)\b/giu, replacement: asTerm('cast off') },
  { id: 'T-057', label: 'Koç boynuzuna volta must be make fast to cleat', source: /koç\s*boynuzuna\s+volta/iu, wrong: /\bvolta\s+to\s+the\s+ram'?s\s+horn\b/giu, replacement: asTerm('make fast to the cleat') },
  { id: 'T-058', label: 'Mapacık must be padeye', source: /mapacık/iu, wrong: /\bmapacık\b/giu, replacement: asTerm('padeye') },
  { id: 'T-059', label: 'Bumba must be boom or derrick', source: /bumba/iu, wrong: /\bbombs?\b/giu, replacement: asPluralTerm('derrick', 'derricks') },
  { id: 'T-060', label: 'Çekmenin temel prensipleri must be towing', source: /çekmenin\s+temel\s+prensipleri/iu, wrong: /\bbasic\s+principles\s+of\s+drawing\b/giu, replacement: 'BASIC PRINCIPLES OF TOWING' },
  { id: 'T-061', label: 'Pruva pruvaya must be head-on', source: /pruva\s+pruvaya\s+karşılaşma/iu, wrong: /\bprow\s+to\s+bow\s+(?:encounter|meeting)\b/giu, replacement: asTerm('head-on situation') },
  { id: 'T-062', label: 'IALA şamandıra must be buoy', source: /şamandıra/iu, wrong: /\bfloats?\b/giu, replacement: asPluralTerm('buoy', 'buoys') },
  { id: 'T-063', label: 'anchor irgat must be windlass', source: /(?:demir|zincir|anchor)[^.!?]{0,50}ırgat|ırgat[^.!?]{0,50}(?:demir|zincir|anchor)/iu, wrong: /\bcapstans?\b/giu, replacement: asPluralTerm('windlass', 'windlasses') },
  { id: 'T-064', label: 'nautical harita must be chart', source: /harita/iu, wrong: /\bmaps?\b/giu, applies: (source) => !NON_NAUTICAL_MAP_SOURCE_RE.test(source), replacement: asPluralTerm('chart', 'charts') },
  { id: 'T-065', label: 'Kağıt harita must be paper chart', source: /kağıt\s+harita/iu, wrong: /\bpaper\s+maps?\b/giu, replacement: asPluralTerm('paper chart', 'paper charts') },
  { id: 'T-066', label: 'Harita datum must be chart datum', source: /harita\s+datum/iu, wrong: /\bmap\s+datum\b/giu, replacement: asTerm('chart datum') },
  { id: 'T-067', label: 'angular rota must be course', source: ROUTA_IS_COURSE_SOURCE_RE, wrong: ANGULAR_ROUTE_TARGET_RE, repair: courseRepair },
  { id: 'T-068', label: 'Pusula rotası must be compass course', source: /pusula\s+rotas/iu, wrong: /\bcompass\s+route\b/giu, replacement: asTerm('compass course') },
  { id: 'T-069', label: 'Karşı rota must be reciprocal course', source: /karşı\s+rota/iu, wrong: /\bopposite\s+route\b/giu, replacement: asTerm('reciprocal course') },
  { id: 'T-070', label: 'navigation hakiki must be true', source: /hakiki/iu, wrong: /\b(?:genuine|real)\b/giu, replacement: asTerm('true') },
  { id: 'T-071', label: 'seyir must use navigation terminology', source: /seyir/iu, wrong: /\b(?:cruise(?!\s+(?:ships?|liners?|vessels?)\b)|smooth\s+sailing|sailing\s+without\s+current|level\s+sailing|sailing\s+periods?|sailing\s+hours?)\b/iu, repair: navigationRepair },
  { id: 'T-072', label: 'Seyir planı must be passage plan', source: /seyir\s+plan/iu, wrong: /\b(?:cruise|sailing|navigation)\s+plan\b/giu, replacement: asTerm('passage plan') },
  { id: 'T-073', label: 'Seyir jurnali must be deck logbook', source: /seyir\s+(?:jurnal|günlü|log)/iu, wrong: /\b(?:cruise|navigation)\s+log(?:\s*book|book)?\b/giu, replacement: asTerm('deck logbook') },
  { id: 'T-074', label: 'navigation mevki must be position', source: /mevki/iu, wrong: /\b(?:location|place)\b/giu, replacement: asTerm('position') },
  { id: 'T-075', label: 'navigation fener must be light', source: /fener/iu, wrong: /\blanterns?\b/iu, repair: navigationLightRepair },
  { id: 'T-076', label: 'sea akıntı must be current', source: /akıntı/iu, wrong: /\bflows?\b/giu, applies: (source) => !CURRENT_SOURCE_EXCLUSION_RE.test(source), replacement: asPluralTerm('current', 'currents') },
  { id: 'T-077', label: 'Dev abbreviation must be preserved', source: /(?:^|[^\p{L}\p{N}])Dev(?![\p{L}\p{N}])/u, wrong: /\bgiant\b/giu, replacement: 'Dev' },
  { id: 'T-078', label: 'maritime çatışma must be collision', source: /çatışma/iu, wrong: /\bconflicts?\b/giu, applies: (source) => !NON_COLLISION_CONFLICT_SOURCE_RE.test(source), replacement: asPluralTerm('collision', 'collisions') },
  { id: 'T-079', label: 'Baş açısı/yönü must be heading', source: /baş\s+(?:açısı|yönü)/iu, wrong: /\bhead\s+(?:angle|direction)\b/giu, replacement: (m) => /angle/i.test(m) ? matchCase(m, 'heading angle') : matchCase(m, 'heading') },
  { id: 'T-080', label: 'port kılavuzluk must be pilotage', source: /kılavuzluk/iu, wrong: /\bguidance\b/giu, replacement: asTerm('pilotage') },
  { id: 'T-081', label: 'Ana makine must be main engine', source: /ana\s+makine/iu, wrong: /\b(?:main|host)\s+machine\b/giu, replacement: asTerm('main engine') },
  { id: 'T-082', label: 'Makine dairesi must be engine room', source: /makine\s+daires/iu, wrong: /\bmachine\s+room\b/giu, replacement: asTerm('engine room') },
  { id: 'T-083', label: 'Dümen makinesi must be steering gear', source: /dümen\s+makines/iu, wrong: /\bsteering\s+machine\b/giu, replacement: asTerm('steering gear') },
  { id: 'T-084', label: 'Makine bölümü must be engine department', source: /makine\s+bölüm/iu, wrong: /\b(?:machinery|machine)\s+(?:section|department)\b/giu, replacement: asTerm('engine department') },
  { id: 'T-085', label: 'ship makine mühendisi must be marine engineer', source: /makine\s+mühendis/iu, wrong: /\bmechanical\s+engineer\b/giu, replacement: asTerm('marine engineer') },
  { id: 'T-086', label: 'Makine gücü must be engine power', source: /makine\s+güc/iu, wrong: /\bmachine\s+power\b/giu, replacement: asTerm('engine power') },
  { id: 'T-087', label: 'Yardımcı makine must be auxiliary machinery', source: /yardımcı\s+makine/iu, wrong: /\bauxiliary\s+machines?\b/giu, replacement: asTerm('auxiliary machinery') },
  { id: 'T-088', label: 'Makine yükü must be engine load', source: /makine\s+yük/iu, wrong: /\bmachine\s+load\b/giu, replacement: asTerm('engine load') },
  { id: 'T-089', label: 'Makine telgrafı must be engine telegraph', source: /makine\s+telgraf/iu, wrong: /\bmachine\s+telegraph\b/giu, replacement: asTerm('engine telegraph') },
  { id: 'T-090', label: 'machinery yatak must be bearing', source: ENGINE_BEARING_SOURCE_RE, wrong: /\bbeds?\b/giu, applies: (source) => !NON_BEARING_BED_SOURCE_RE.test(source), replacement: asPluralTerm('bearing', 'bearings') },
  { id: 'T-091', label: 'silindir gömleği must be cylinder liner', source: /gömle(?:k|ğ)/iu, wrong: /\b(?:cylinder\s+)?shirts?\b/giu, applies: (source) => !/(?:arc-rated|pantolon|düğme|elbise|giysi|kıyafet|yüzdürme)/iu.test(source), replacement: asPluralTerm('cylinder liner', 'cylinder liners') },
  { id: 'T-092', label: 'Süpürme havası must be scavenge air', source: /süpürme\s+havas/iu, wrong: /\b(?:sweep|sweeping)\s+air\b/giu, replacement: asTerm('scavenge air') },
  { id: 'T-093', label: 'Dolgu basıncı must be charge-air pressure', source: /dolgu\s+basınc/iu, wrong: /\bfilling\s+pressure\b/giu, replacement: asTerm('charge-air pressure') },
  { id: 'T-094', label: 'Şarj havası must be charge air', source: /şarj\s+havas/iu, wrong: /\bcharging\s+air\b/giu, replacement: asTerm('charge air') },
  { id: 'T-095', label: 'engine devir must be speed/rpm', source: /devir/iu, wrong: /\bcycles?\b/iu, applies: (source) => ENGINE_SPEED_SOURCE_RE.test(source.toLocaleLowerCase('tr')), repair: engineSpeedRepair },
  { id: 'T-096', label: 'machinery/pollution yağ must be oil', source: /yağ/iu, wrong: /\bfats?\b/giu, applies: (source) => !NON_OIL_FAT_SOURCE_RE.test(source), replacement: asTerm('oil') },
  { id: 'T-097', label: 'marine kazan must be boiler', source: /(?:buhar|brülör|besleme\s+suyu|yardımcı|egzoz|yakıt|basınç|seviye)[^.!?]{0,40}kazan|kazan[^.!?]{0,40}(?:buhar|brülör|besleme\s+suyu|yardımcı|egzoz|yakıt|basınç|seviye)/iu, wrong: /\b(?:win|winning)\b/giu, replacement: asTerm('boiler') },
  { id: 'T-098', label: 'technical kaçak must be leak', source: /(?:gaz|yakıt|yağ|su|buhar|hava|elektrik|toprak|boru|tank|valf|pompa)[^.!?]{0,40}kaçak|kaçak[^.!?]{0,40}(?:gaz|yakıt|yağ|su|buhar|hava|elektrik|toprak|boru|tank|valf|pompa)/iu, wrong: /\b(?:fugitive|illegal)\b/giu, replacement: asTerm('leak') },
  { id: 'T-099', label: 'Krank sapması must be crankshaft deflection', source: /krank\s+sapma/iu, wrong: /\bcrank\s+deviation\b/giu, replacement: asTerm('crankshaft deflection') },
  { id: 'T-100', label: 'rudder-system dümen must not be steering wheel', source: /dümen/iu, wrong: /\bsteering\s+wheel(?:\s+house)?\b/iu, applies: (source) => !/dümen\s+çark/iu.test(source), repair: rudderRepair },
  { id: 'T-101', label: 'cargo yükleme must be loading', source: /yükleme/iu, wrong: /\binstallation\b/giu, replacement: asTerm('loading') },
  { id: 'T-102', label: 'Yükleme bilgisayarı must be loading computer', source: /yükleme\s+bilgisayar/iu, wrong: /\binstallation\s+computer\b/giu, replacement: asTerm('loading computer') },
  { id: 'T-103', label: 'cargo/CO2 boşaltma must not be evacuation', source: /boşalt/iu, wrong: /\b(?:evacuation|venting)\b/iu, applies: (source) => !PERSONNEL_EVACUATION_SOURCE_RE.test(source) && (/(?:kargo|tank|pompa|hat|tortu|ayrışma)/iu.test(source) || (/(?:CO[₂2]|gaz|sabit\s+yangın|release)/iu.test(source) && !/tahliye/iu.test(source)) || /boşaltma\s+hazırlığı/iu.test(source)), repair: dischargeRepair },
  { id: 'T-104', label: 'cargo/pollution tahliye must be discharge', source: /tahliye/iu, wrong: /\bevacuation\b/giu, applies: (source) => !PERSONNEL_EVACUATION_SOURCE_RE.test(source) && /(?:tahliye[^.!?]{0,60}(?:kargo|tank|balast|pompa|valf|hat|sintine)|(?:kargo|tank|balast|pompa|valf|hat|sintine)[^.!?]{0,60}tahliye|MARPOL|Ek\s+[IVX]+|Annex\s+[IVX]+|OWS|ppm|prewash|slop|ODMCS|Draft\s+Survey|araç\s+yerleştirme)/iu.test(source), replacement: asTerm('discharge') },
  { id: 'T-105', label: 'Yük emniyeti must use cargo terminology', source: /yük\s+emniyet/iu, wrong: /\bload\s+(?:security|safety)\b/giu, replacement: asTerm('cargo securing') },
  { id: 'T-106', label: 'Yük planı must be cargo plan', source: /yük\s+plan/iu, wrong: /\bload\s+plan\b/giu, replacement: asTerm('cargo plan') },
  { id: 'T-107', label: 'Yük operasyonu must be cargo operation', source: /yük\s+operasyon/iu, wrong: /\b(?:load|freight)\s+operations?\b/giu, replacement: asPluralTerm('cargo operation', 'cargo operations') },
  { id: 'T-108', label: 'Yük hattı must be load line', source: /yük\s+hatt/iu, wrong: /\bloading\s+line\b/giu, replacement: asTerm('load line') },
  { id: 'T-109', label: 'Tehlikeli yük must be dangerous goods', source: /tehlikeli\s+yük/iu, wrong: /\bdangerous\s+load\b/giu, replacement: asTerm('dangerous goods') },
  { id: 'T-110', label: 'Yük miktarı must be cargo quantity', source: /yük\s+miktar/iu, wrong: /\bload\s+amount\b/giu, replacement: asTerm('cargo quantity') },
  { id: 'T-111', label: 'cargo istif must be stowage', source: /istif/iu, wrong: /\bstack(?:ing|ed)?\b/giu, applies: (source) => !/(?:konteyner|container)\s+(?:stack|yığın)/iu.test(source), replacement: (m) => matchCase(m, /ing$/i.test(m) ? 'stowing' : 'stowage') },
  { id: 'T-112', label: 'Kaldırma merkezi must be center of buoyancy', source: /kaldırma\s+merkez/iu, wrong: /\blifting\s+cent(?:er|re)\b/giu, replacement: asTerm('center of buoyancy') },
  { id: 'T-113', label: 'Kaldırma kuvveti must be buoyant force', source: /kaldırma\s+kuvvet/iu, wrong: /\b(?:lift|lifting)\s+force\b/giu, replacement: asTerm('buoyant force') },
  { id: 'T-114', label: 'Yatırıcı moment must be heeling moment', source: /yatırıcı\s+moment/iu, wrong: /\btilting\s+moment\b/giu, replacement: asTerm('heeling moment') },
  { id: 'T-115', label: 'Yalpa must be roll', source: /yalpa/iu, wrong: /\b(?:wobble|sway)(?:ing)?\b/giu, replacement: (m) => matchCase(m, /ing$/i.test(m) ? 'rolling' : 'roll') },
  { id: 'T-116', label: 'stability meyil must be heel', source: /meyil/iu, wrong: /\b(?:inclination|slope)\b/giu, replacement: asTerm('heel') },
  { id: 'T-117', label: 'Su çekimi must be draft', source: /su\s+çekim/iu, wrong: /\b(?:water\s+withdrawal|water\s+draft)\b/giu, replacement: asTerm('draft') },
  { id: 'T-118', label: 'Kesme kuvveti must be shear force', source: /kesme\s+kuvvet/iu, wrong: /\bcutting\s+force\b/giu, replacement: asTerm('shear force') },
  { id: 'T-119', label: 'Doğrultma kolu must be righting arm', source: /doğrultma\s+kol/iu, wrong: /\bstraightening\s+(?:arm|lever)s?\b/giu, replacement: asPluralTerm('righting arm', 'righting arms') },
  { id: 'T-120', label: 'Yatma açısı must be angle of heel', source: /yatma\s+açıs/iu, wrong: /\b(?:tilt\s+angle|bank\s+angle|angle\s+of\s+repose)\b/giu, replacement: asTerm('angle of heel') },
  { id: 'T-121', label: 'Eğim testi must be inclining test', source: /eğim\s+test/iu, wrong: /\bslope\s+test\b/giu, replacement: asTerm('inclining test') },
  { id: 'T-122', label: 'Yüzme merkezi must be center of flotation', source: /yüzme\s+merkez/iu, wrong: /\bswimming\s+cent(?:er|re)\b/giu, replacement: asTerm('center of flotation') },
  { id: 'T-123', label: 'Denge açısı must be equilibrium angle', source: /denge\s+açıs/iu, wrong: /\bbalance\s+angle\b/giu, replacement: asTerm('equilibrium angle') },
  { id: 'T-124', label: 'Kararlı denge must be stable equilibrium', source: /kararlı\s+denge/iu, wrong: /\bstable\s+balance\b/giu, replacement: asTerm('stable equilibrium') },
  { id: 'T-125', label: 'Serbest borda must be freeboard', source: /serbest\s+borda/iu, wrong: /\bfree\s+ship'?s\s+side\b/giu, replacement: asTerm('freeboard') },
  { id: 'T-126', label: 'Klas must be class/classification society', source: /\bklas/iu, wrong: /\bKlas(?:\s+Society)?\b/gu, replacement: (m) => /society/i.test(m) ? 'Classification Society' : 'Class' },
  { id: 'T-127', label: 'Statüter must be statutory', source: /statüter/iu, wrong: /\b(?:statute|status\s+quo|status)\b/giu, replacement: asTerm('statutory') },
  { id: 'T-128', label: 'PSC alıkoyma must be detention', source: /(?:alıkoyma|tutulma|gemi(?:nin)?\s+tutul)/iu, wrong: /\bretention\b/giu, applies: (source) => PSC_SOURCE_RE.test(source) || PSC_DETENTION_SOURCE_RE.test(source), replacement: asTerm('detention') },
  { id: 'T-129', label: 'inspection/planning eksiklik must be deficiency', source: /eksiklik/iu, wrong: /\b(?:lack|shortcoming)s?\b/giu, replacement: asPluralTerm('deficiency', 'deficiencies') },
  { id: 'T-130', label: 'PSC denetimi must be inspection', source: /denetim/iu, wrong: /\bPSC\s+audits?\b/giu, replacement: asPluralTerm('PSC inspection', 'PSC inspections') },
  { id: 'T-131', label: 'technical hesap must be calculation', source: /hesap/iu, wrong: /\baccounts?\b/giu, applies: (source) => !ACCOUNT_SOURCE_RE.test(source), replacement: asPluralTerm('calculation', 'calculations') },
  { id: 'T-132', label: 'charter kiracı must be charterer', source: /kiracı/iu, wrong: /\b(?:tenant|lessee)s?\b/giu, replacement: asPluralTerm('charterer', 'charterers') },
  { id: 'T-133', label: 'Donatan must be shipowner', source: /donatan/iu, wrong: /\boutfitter\b/giu, replacement: asTerm('shipowner') },
  { id: 'T-134', label: 'Lay Time must be laytime', source: /lay\s*time/iu, wrong: /\bLay\s+Time\b/g, replacement: 'Laytime' },
  // Found while migrating the interface layer out of Turkish: short labels give
  // the engine no context, so a seakeeping table came back reading "Yaw
  // Amplitude" for roll and "Trace Coefficient" for the wake fraction.
  { id: 'T-135', label: 'Kıç pik must be after peak', source: /k[ıi]ç\s*pik|aft\s*peak/iu, wrong: /\bcanker\s+peak\b/giu, replacement: asTerm('Aft Peak') },
  { id: 'T-136', label: 'Yalpa must be roll', source: /yalpa/iu, wrong: /\byaw\b/giu, replacement: asTerm('roll') },
  { id: 'T-137', label: 'Baş vurma must be pitch', source: /(?:ba[şs]\s*vurma|tangage)/iu, wrong: /\btangage\b/giu, replacement: asTerm('pitch') },
  { id: 'T-138', label: 'İz katsayısı must be wake fraction', source: /[İIıi]z\s*katsay/iu, wrong: /\btrace\s+coefficient\b/giu, replacement: asTerm('wake fraction') },
  { id: 'T-139', label: 'Gövde verimi must be hull efficiency', source: /g[öo]vde\s*verim/iu, wrong: /\bstem\s+efficiency\b/giu, replacement: asTerm('hull efficiency') },
  { id: 'T-140', label: 'Düşey ivme must be vertical acceleration', source: /d[üu][şs]ey\s*ivme/iu, wrong: /\bdusey\s+acceleration\b/giu, replacement: asTerm('vertical acceleration') },
  { id: 'T-141', label: 'Dalıp çıkma must be heave', source: /dal[ıi]p\s*[çc][ıi]kma/iu, wrong: /\bdiving\s+amplitude\b/giu, replacement: asTerm('heave amplitude') },
  { id: 'T-142', label: 'cargo ton must stay a tonne', source: /\bton\b/iu, wrong: /\btones?\b/giu, replacement: asPluralTerm('tonne', 'tonnes') },
];

// Technical/formula strings that were incorrectly classified as language-
// independent and therefore shipped unchanged in en.json.  Symbols and formula
// variables are preserved; only the natural-language labels are translated.
export const TECHNICAL_ENGLISH_OVERRIDES: Readonly<Record<string, string>> = {
  '-25°C ile -18°C arası (donmuş)': '-25°C to -18°C (frozen)',
  '+10°C ile +15°C arası': '+10°C to +15°C',
  '+2°C ile +5°C arası (taze)': '+2°C to +5°C (fresh)',
  '~70°K – 70°G (A3); kutuplar (A4) hariç': '~70°N–70°S (A3); excluding polar regions (A4)',
  '−180°–+180° arası': '−180° to +180°',
  '≈ 0.812′ Doğu': '≈ 0.812′ East',
  '≈ 23° Doğu': '≈ 23° East',
  '≈ 35° Batı': '≈ 35° West',
  '≈ 35° Doğu': '≈ 35° East',
  '≈ 39.0′ Doğu': '≈ 39.0′ East',
  '≈ 48′ Doğu': '≈ 48′ East',
  '≈ 59.1′ Doğu': '≈ 59.1′ East',
  '≈ 9.4° Batı': '≈ 9.4° West',
  '≥ 100 m (düdük ≥12 m, çan ≥20 m)': '≥ 100 m (whistle ≥12 m, bell ≥20 m)',
  '≥3 mil (öğütülmüş ≤25 mm)': '≥3 miles (comminuted to ≤25 mm)',
  '════════════════════ Açı ≈ 60° – 120° → Güçlü Fix ════════════════════': '════════════════════ Angle ≈ 60°–120° → Strong Fix ════════════════════',
  '════════════════════ LOP’lar 60° – 120° açıyla kesişmelidir ════════════════════': '════════════════════ LOPs should intersect at 60°–120° ════════════════════',
  '✓ IMO limiti içinde (≤ 12°)': '✓ Within the IMO limit (≤ 12°)',
  '0°–180° arası →': '0°–180° →',
  '0°–90° arası, her iki yönde': '0°–90° in both directions',
  '1 m³ kargonun ağırlığı (t/m³)': 'Weight of 1 m³ of cargo (t/m³)',
  '180°–360° arası →': '180°–360° →',
  "30°'de ≈693′, 60°'de 1200′ (yüksek enlemde iki kat)": '≈693′ at 30°, 1200′ at 60° (double at high latitudes)',
  'Açı (°)': 'Angle (°)',
  'Açı (°)    GZ (m)': 'Angle (°)    GZ (m)',
  'Açı (θ)': 'Angle (θ)',
  'Açı olarak: θ = arctan(Trim / LBP)': 'As an angle: θ = arctan(Trim / LBP)',
  'Açık Su Verimi (η₀)': 'Open-water Efficiency (η₀)',
  'Akü; 25°C': 'Battery; 25°C',
  'Ara yönler: NE (45°), SE (135°), SW (225°), NW (315°)': 'Intercardinal directions: NE (45°), SE (135°), SW (225°), NW (315°)',
  'Başlangıç Boylamı (λ₁)': 'Initial Longitude (λ₁)',
  'Başlangıç Deplasmanı (Δ₀)': 'Initial Displacement (Δ₀)',
  'Başlangıç Enlemi (φ₁)': 'Initial Latitude (φ₁)',
  'Başlangıç: 029° 20.0′ E Varış: 030° 05.0′ E': 'Start: 029° 20.0′ E Arrival: 030° 05.0′ E',
  'Başlangıç: 08° 20′ N, 023° 10′ E Varış: 05° 40′ S, 020° 30′ W': 'Start: 08° 20′ N, 023° 10′ E Arrival: 05° 40′ S, 020° 30′ W',
  'Başlangıç: 25° N, 040° W': 'Start: 25° N, 040° W',
  'Başlangıç: 36° 10.0′ N Varış: 36° 34.0′ N': 'Start: 36° 10.0′ N Arrival: 36° 34.0′ N',
  'Başlangıç: 36° 10.0′ N, 029° 20.0′ E Varış: 36° 34.0′ N, 030° 05.0′ E': 'Start: 36° 10.0′ N, 029° 20.0′ E Arrival: 36° 34.0′ N, 030° 05.0′ E',
  'Boş bölme: μ ≈ 0.97': 'Empty compartment: μ ≈ 0.97',
  'Boylam Farkı (Δλ)': 'Longitude Difference (Δλ)',
  'CO₂ yoğunluk katsayısı (≈ 1/0,56 m³/kg)': 'CO₂ density factor (≈ 1/0.56 m³/kg)',
  'Çap 1 (D₁)': 'Diameter 1 (D₁)',
  'Çap 2 (D₂)': 'Diameter 2 (D₂)',
  'Çikolata: +12°C ile +18°C': 'Chocolate: +12°C to +18°C',
  'Dec Güneş: 12° 15.3′ N': 'Sun Declination: 12° 15.3′ N',
  'DLo ≈ 1°57.5′ Doğu boylam': 'DLo ≈ 1°57.5′ East longitude',
  'DR mevkii 35° 42.5′ N, 028° 17.3′ E ise → AP: 36° 00′ N, 028° 00′ E seçilebilir': 'If the DR position is 35° 42.5′ N, 028° 17.3′ E → AP may be selected as 36° 00′ N, 028° 00′ E',
  'Enlem Farkı (Δφ)': 'Latitude Difference (Δφ)',
  'Gerçek rüzgâr ≈ 17 kn, yön ≈ 198° T': 'True wind ≈ 17 kn, direction ≈ 198° T',
  'GHA Güneş (10:24 UTC): 335° 42.5′': 'Sun GHA (10:24 UTC): 335° 42.5′',
  'GM₀ ≥ 0.30 m (FSE düzeltmesi sonrası)': 'GM₀ ≥ 0.30 m (after FSE correction)',
  'Gösterim: 045°M, 180°M gibi': 'Display: 045°M, 180°M, etc.',
  'Gösterim: 045°T, 180°T, 270°T gibi': 'Display: 045°T, 180°T, 270°T, etc.',
  'GZmax ≥ 0.20 m (θ ≥ 30° için)': 'GZmax ≥ 0.20 m (for θ ≥ 30°)',
  'Hesaplayıcı P ve cos(φ) ile φ = arccos(pf), Q = P·tan(φ), S = P/pf hesaplar.': 'The calculator uses P and cos(φ) to calculate φ = arccos(pf), Q = P·tan(φ), S = P/pf.',
  'HFO için CF ≈ 3,114 t CO₂/t yakıt.': 'For HFO, CF ≈ 3.114 t CO₂/t fuel.',
  'Hız 1 (V₁)': 'Speed 1 (V₁)',
  'IMO: GZ≥0,20m, GZmax açısı ≥25°': 'IMO: GZ≥0.20 m, GZmax angle ≥25°',
  'İdeal η ≈ %59.2.': 'Ideal η ≈ 59.2%.',
  'İki açı (A-B → θ₁, B-C → θ₂)': 'Two angles (A-B → θ₁, B-C → θ₂)',
  'İki kerterizde 30°, üçte 10°': '30° with two bearings, 10° with three',
  'İlaç/aşı: +2°C ile +8°C (bazıları -20°C)': 'Medicines/vaccines: +2°C to +8°C (some at -20°C)',
  'İlk Açı (°)': 'Initial Angle (°)',
  'İlk açı: a (örn. 30°)': 'Initial angle: a (e.g. 30°)',
  'İlk Boy (L₀)': 'Initial Length (L₀)',
  'İlk Genlik (θ₁)': 'Initial Amplitude (θ₁)',
  'İlk Kurs (θ₀)': 'Initial Course (θ₀)',
  'Kesme çiçek: +2°C ile +8°C': 'Cut flowers: +2°C to +8°C',
  'Küçük açı yaklaşımı (θ < 10°)': 'Small-angle approximation (θ < 10°)',
  'Küçük açı: 0° - 10° aralığı': 'Small angle: 0°–10° range',
  'Küçük açılarda (θ < 10-15°):': 'At small angles (θ < 10–15°):',
  'LHA 0°–180° → batı': 'LHA 0°–180° → west',
  'LHA 0°–180° → gök cismi batıda': 'LHA 0°–180° → celestial body to the west',
  'LHA 180°–360° → doğu': 'LHA 180°–360° → east',
  'LHA 180°–360° → gök cismi doğuda': 'LHA 180°–360° → celestial body to the east',
  'LNG ≈ -163 °C, LPG ≈ -42 °C taşınır.': 'LNG is carried at ≈ -163°C, LPG at ≈ -42°C.',
  'LOP kesişim açıları: 60°, 75°, 45°': 'LOP intersection angles: 60°, 75°, 45°',
  'Mapacık': 'Padeye',
  'Merkez açı: d ≈ arccos 0.809 ≈ 36°': 'Central angle: d ≈ arccos 0.809 ≈ 36°',
  'Merkez açı: θ ≈ arccos 0.596 ≈': 'Central angle: θ ≈ arccos 0.596 ≈',
  'MGO/MDO için CF ≈ 3,206 t CO₂/t yakıt.': 'For MGO/MDO, CF ≈ 3.206 t CO₂/t fuel.',
  'O₂ (%21), H₂S, CO, HC ve LEL ölçümü': 'Measurement of O₂ (21%), H₂S, CO, HC and LEL',
  'O₂ %20.9 (min %19.5), LEL <%1, H₂S <10 ppm, CO <25 ppm güvenli sınırlardır.': 'O₂ 20.9% (min 19.5%), LEL <1%, H₂S <10 ppm and CO <25 ppm are safe limits.',
  'Sextant ölçümü (Hs): 41° 23.4′': 'Sextant Observation (Hs): 41° 23.4′',
  'Sıcaklık aralığı -30°C ile +30°C': 'Temperature range -30°C to +30°C',
  'Sıcaklık aralığı: -30°C ile +30°C': 'Temperature range: -30°C to +30°C',
  'Sıcaklık farkı (HT 5–8°C, LT 10–15°C)': 'Temperature difference (HT 5–8°C, LT 10–15°C)',
  'Sıcaklık Farkı (T₁−T₂)': 'Temperature Difference (T₁−T₂)',
  'Sıvı Yoğunluğu ρ [kg/m³]': 'Liquid Density ρ [kg/m³]',
  'Silyon 135°, kıç 225°': 'Masthead light 135°, stern light 225°',
  'sin C₁ ve cos φ₁ hesaplanır.': 'sin C₁ and cos φ₁ are calculated.',
  'sin(θ) ≈ θ (radyan) kullanılabilir': 'sin(θ) ≈ θ (radians) may be used',
  'Soğuk oda: 0–4°C, dondurucu: -18 ile -25°C': 'Cold room: 0–4°C, freezer: -18°C to -25°C',
  'Standart koşullarda (15°C, 1013.25 hPa) ρ ≈ 1.225 kg/m³': 'Under standard conditions (15°C, 1013.25 hPa), ρ ≈ 1.225 kg/m³',
  'Süt ürünleri: +2°C ile +4°C': 'Dairy products: +2°C to +4°C',
  'Taşınmış LOP₁ ile LOP₂’nin kesişimi →': 'Intersection of advanced LOP₁ and LOP₂ →',
  'Taze (soğutulmuş) et: -1°C ile +2°C': 'Fresh (chilled) meat: -1°C to +2°C',
  'Taze balık: 0°C ile +2°C': 'Fresh fish: 0°C to +2°C',
  'Tipik değer: 50° - 80°': 'Typical value: 50°–80°',
  'v₁ (Hız)': 'v₁ (Speed)',
  'v₂ (Hız)': 'v₂ (Speed)',
  'V₂ (Hız)': 'V₂ (Speed)',
  'Varış Boylamı (λ₂)': 'Arrival Longitude (λ₂)',
  'Varış Enlemi (φ₂)': 'Arrival Latitude (φ₂)',
  'Varış mevkii: 37°01.0′ N – 030°30.6′ E': 'Arrival position: 37°01.0′ N – 030°30.6′ E',
  'Varış: 45° N, 010° E': 'Arrival: 45° N, 010° E',
  'Yaşam mahalleri: μ ≈ 0.95': 'Accommodation spaces: μ ≈ 0.95',
  'Yatak Ömrü (L₁₀)': 'Bearing Life (L₁₀)',
  'Yoğunluk Düzeltmesi (Δρ)': 'Density Correction (Δρ)',
  'Yük ambarı (konteyner): μ ≈ 0.70': 'Cargo hold (containers): μ ≈ 0.70',
  'Zn doğrultusuna dik (Zn ± 90°)': 'Perpendicular to the Zn direction (Zn ± 90°)',
  'Zn yön referansıdır; LOP ona dik çizilir (Zn ± 90°).': 'Zn is the direction reference; the LOP is plotted perpendicular to it (Zn ± 90°).',
  'Δλ: boylam farkı': 'Δλ: longitude difference',
  'ρ: Sıvının yoğunluğu (t/m³)': 'ρ: Liquid density (t/m³)',
  'ρ: Su yoğunluğu (t/m³)': 'ρ: Water density (t/m³)',
  ': Kerteriz (°T veya °M)': ': Bearing (°T or °M)',
  '±0.10 ile ±0.20 mm': '±0.10 to ±0.20 mm',
  '±1.0 ile ±2.0 mm': '±1.0 to ±2.0 mm',
  '════════════════════ Enlem: 15° – 60° ════════════════════': '════════════════════ Latitude: 15°–60° ════════════════════',
  '1000 bar ve 1500°C': '1000 bar and 1500°C',
  '150-200 bar ve 400-500°C': '150–200 bar and 400–500°C',
  '2 bar ve 100°C': '2 bar and 100°C',
  '225°T (kerteriz + 180°)': '225°T (bearing + 180°)',
  '5 bar ve 50°C': '5 bar and 50°C',
  '60°-120° (ideal 90°)': '60°–120° (ideal 90°)',
  '8° 30.0′ Kuzey enleminde': 'At latitude 8° 30.0′ North',
  'Birim: m³/t veya ft³/ton': 'Unit: m³/t or ft³/ton',
  'CO₂ (R-744) ve NH₃ (R-717)': 'CO₂ (R-744) and NH₃ (R-717)',
  'Elma, armut: 0°C ile +1°C': 'Apples, pears: 0°C to +1°C',
  'Kuzey: 0° veya 360°': 'North: 0° or 360°',
  'Mevcut mevki: 39°23.4′ N – 010°33.9′ W': 'Current position: 39°23.4′ N – 010°33.9′ W',
  'Narenciye: +4°C ile +8°C': 'Citrus fruit: +4°C to +8°C',
  "Son bilinen mevki: 35° 00.0' N, 010° 00.0' E": "Last known position: 35° 00.0' N, 010° 00.0' E",
  'Sonraki Genlik (θ₂)': 'Next Amplitude (θ₂)',
  'Te ≈ Tr / 2  veya  Te ≈ Tr': 'Te ≈ Tr / 2  or  Te ≈ Tr',
};

export const EXACT_ENGLISH_OVERRIDES: Readonly<Record<string, string>> = {
  ...TECHNICAL_ENGLISH_OVERRIDES,
  // ASCII-only Turkish fragments can bypass a Turkish-character residue scan.
  // Keep these source-exact because they mix formula notation with translatable
  // labels and must not be altered by broad token replacement.
  '+2 ila +4°C': '+2°C to +4°C',
  '+8 ila +12°C': '+8°C to +12°C',
  '−18 ila −25°C': '−18°C to −25°C',
  '≈ 60°-120° (keskin/dik)': '≈ 60°–120° (acute/right)',
  '≥ 30° (tercihen ≥ 60°)': '≥ 30° (preferably ≥ 60°)',
  '════════════════════ ≈ 30° – 90° → Kabul Edilebilir Fix ════════════════════': '════════════════════ ≈ 30°–90° → Acceptable Fix ════════════════════',
  '════════════════════ 030°T < 045°T → Emniyetli tarafta ════════════════════': '════════════════════ 030°T < 045°T → On the Safe Side ════════════════════',
  '0-30° Alan ≥': 'Area 0–30° ≥',
  '0-40° Alan ≥': 'Area 0–40° ≥',
  '30-40° Alan ≥': 'Area 30–40° ≥',
  '10.0 L/m²/dk': '10.0 L/m²/min',
  '2.5 L/m²/dk': '2.5 L/m²/min',
  '4.0 L/m²/dk': '4.0 L/m²/min',
  '6.5 L/m²/dk': '6.5 L/m²/min',
  'Atmosfer testi (O₂, LEL, H₂S)': 'Atmospheric test (O₂, LEL, H₂S)',
  'Azimuta dik: Zn ± 90°': 'Perpendicular to the azimuth: Zn ± 90°',
  'Basit Rankine η ≈ %40.1.': 'Simple Rankine η ≈ 40.1%.',
  'BOD₅ ≤ 25, TSS ≤ 35, Koliform ≤ 100 limitleri': 'BOD₅ ≤ 25, TSS ≤ 35, coliform ≤ 100 limits',
  'D-2: ≥50 µm organizma < 10/m³; 10-50 µm < 10/mL': 'D-2: organisms ≥50 µm < 10/m³; organisms 10–50 µm < 10/mL',
  'Daima 000°–180°': 'Always 000°–180°',
  'Dakikada 2°C (2°C/dakika)': '2°C per minute (2°C/min)',
  'Debiye': 'Flow Rate',
  'Demir-Constantan': 'Iron–Constantan',
  'Demir: Walk out the anchor — Let go port/starboard anchor — Slack away the cable.': 'Anchor: Walk out the anchor — Let go port/starboard anchor — Slack away the cable.',
  'Donatan (owner)': 'Shipowner',
  'Donatana': 'Shipowner',
  "DR Mevkii: 35° 18.0' N, 010° 38.2' E": "DR Position: 35° 18.0' N, 010° 38.2' E",
  'DR mevkii: 36° 42′ N, 029° 18′ E': 'DR position: 36° 42′ N, 029° 18′ E',
  'Emniyetli tarafta (030° < 045°)': 'On the safe side (030° < 045°)',
  'En az 30° (tercihen 40°)': 'At least 30° (preferably 40°)',
  'En az 5°': 'At least 5°',
  'En az 90°': 'At least 90°',
  "GZ ≥ 0,20 m (≥30°'de); GZ maks ≥25-30°'de; GM₀ ≥ 0,15 m": 'GZ ≥ 0.20 m at ≥30°; GZ max at ≥25–30°; GM₀ ≥ 0.15 m',
  "GZ ≥ 0,20 m (genellikle ≥30°'de)": 'GZ ≥ 0.20 m (generally at ≥30°)',
  'Hakiki Rota ± 180°': 'True Course ± 180°',
  'IMO kriteri: θmax ≥ 25°': 'IMO criterion: θmax ≥ 25°',
  'Inmarsat uydu (~70°K–70°G)': 'Inmarsat satellite (~70°N–70°S)',
  'Kriter 1 — GZ₃₀ ≥ 0,20 m:': 'Criterion 1 — GZ₃₀ ≥ 0.20 m:',
  'Kriter 6 — GM₀ ≥ 0,15 m:': 'Criterion 6 — GM₀ ≥ 0.15 m:',
  'Kurs ≈ 037°, Mesafe ≈ 180 NM': 'Course ≈ 037°, Distance ≈ 180 NM',
  'Kurs ≈ 050°, Mesafe ≈ 187 NM': 'Course ≈ 050°, Distance ≈ 187 NM',
  'Kurs ≈ 060°, Mesafe ≈ 240 NM': 'Course ≈ 060°, Distance ≈ 240 NM',
  'Kurs ≈ 090°, Mesafe ≈ 120 NM': 'Course ≈ 090°, Distance ≈ 120 NM',
  'L₁₀ (devir)': 'L₁₀ (revolutions)',
  'L₁₀ (saat)': 'L₁₀ (hours)',
  'Makine dairesi: μ ≈ 0.85': 'Engine room: μ ≈ 0.85',
  'Mesafe: ▭ cos 63.4° ≈ 0.447 ▭': 'Distance: ▭ cos 63.4° ≈ 0.447 ▭',
  'R₀ (0°C direnci)': 'R₀ (resistance at 0°C)',
  'Silyon 360°, yan fenerler 90°': 'Masthead light 360°, sidelights 90°',
  'Yaz deadweight (DWT)': 'Summer deadweight (DWT)',
  'Yeni Deplasman (Δ₁)': 'New Displacement (Δ₁)',
  'Δλ’nin radyan': 'Δλ in radians',
  'θ > 45° iken': 'When θ > 45°',
  'Gali': 'Galley',
  'GAZFREE:': 'GAS-FREE:',

  // Full-sentence corrections where word-level substitution would preserve a
  // fluent-looking but technically incorrect machine translation.
  'Her risk için B planı oluşturulmalı; makine arızasında manevra, kötü hava koşullarında alternatif rota ve trafik sıkışıklığında bekleme alanı hazır olmalıdır. PSC denetimleri bu kısmı özellikle kontrol eder.': 'A contingency plan should be prepared for each risk; manoeuvring arrangements for engine failure, an alternative route in adverse weather, and a waiting area for traffic congestion should be ready. PSC inspections specifically check this section.',
  '2015 yılında kaptan, Joaquin kasırgasının rotasına yaklaşan bir rotada ısrar etti. Köprüüstündeki junior zabitler endişelerini açıkça ifade edemedi. Gemi battı ve 33 mürettebat hayatını kaybetti. NTSB raporu, "challenge culture" eksikliğini ve kaptanın situational awareness kaybını başlıca neden olarak gösterdi. Bu vaka modern BRM eğitimlerinin temel ders çalışmasıdır.': 'In 2015, the Master insisted on a route close to Hurricane Joaquin\'s track. Junior officers on the bridge were unable to voice their concerns clearly. The ship sank with the loss of all 33 crew members. The NTSB report identified the lack of a challenge culture and the Master\'s loss of situational awareness as major factors. This case is a core case study in modern BRM training.',
  'Başlangıç kursu, büyük daire rotasına giriş anındaki gerçek kurstur.': 'The initial course is the true course at the point of joining the great-circle route.',
  'Büyük daire üzerinde ekvatora en uzak nokta; ortodrom seyrinde rota en yüksek veya en düşük enleme ulaşır.': 'The point on a great circle farthest from the equator; in great-circle sailing, the route reaches its highest or lowest latitude.',

  // Source-exact fixes for glossary headings whose machine translation either
  // retained Turkish or selected a non-maritime everyday sense.
  'Falya': 'Lap Joint',
  'İskele (Port)': 'Port',
  'Çıma': 'Rope End',
  'Irgatbaşı': 'Capstan Head',
  'Bağ (Knot)': 'Knot',
  'Kıstırma (Stopper)': 'Stopper',
  'Büyük Daire Seyri (Great Circle)': 'Great-circle Sailing',
  'Derinlik Ölçer (Echo Sounder)': 'Echo Sounder',
  'Yüzdürme Merkezi (B – Buoyancy)': 'Center of Buoyancy (B)',
  'GZ (Doğrultucu Kol)': 'GZ (Righting Arm)',
  'Karina (Hull)': 'Underwater Hull',
  'Log (Hız Ölçer)': 'Speed Log',
  'Swell (Ölü Deniz)': 'Swell',
  'Denizci Alargası': 'Standing Off',
  'Kanal Seyrüseferi': 'Canal Navigation',
  'Şamandıraya Bağlanma': 'Mooring to a Buoy',
  'Güverte Ambarı (Tweendeck)': 'Tweendeck',
  'Neta': 'Shipshape',
  'DLat (Enlem Değişimi)': 'DLat (Difference of Latitude)',
  'DLong (Boylam Değişimi)': 'DLong (Difference of Longitude)',
  'Dip (Ufuk Alçalması)': 'Dip of the Horizon',
  'Kick (Başlangıç Sapması)': 'Kick',
  'Amele Bağı (Reef Knot)': 'Reef Knot',
  'Yoma (Sheet Bend)': 'Sheet Bend',
  'Çift Kazık Bağı': 'Double Clove Hitch',
  'Constrictor Bağı': 'Constrictor Knot',
  'Monsun': 'Monsoon',
  'Lodos': 'Lodos (southwester)',
  'Denize Atım': 'Discharge to Sea',
  'Denize atım YOK': 'NO Discharge to Sea',
  'FREEFALL İNDİRME': 'FREE-FALL LAUNCHING',
  'SAL İNDİRME': 'LIFERAFT LAUNCHING',
  'ÇEKMENİN TEMEL PRENSİPLERİ': 'BASIC PRINCIPLES OF TOWING',
  'Pruva pruvaya karşılaşma': 'Head-on Situation',
  'Koç Boynuzuna Volta': 'Make Fast to the Cleat',
  'Serbest borda': 'Freeboard',
  'Ana (tercihli) kanal sancakta; işaret iskelede bırakılır': 'Main (preferred) channel to starboard; leave the mark to port',
  'Ana kanal iskelede': 'Main channel to port',
  "Bölge A'da kırmızı iskele işaretidir. Bölge B'de aynı renk sancakta kalır; bu yüzden önce bölge belirlenir.": 'In Region A, red is a port-hand mark. In Region B, the same colour marks starboard; therefore identify the buoyage region first.',
  'I (India): Rotamı iskeleye değiştiriyorum.': 'I (India): I am altering my course to port.',
  'Rotamı iskeleye çeviriyorum': 'I am altering my course to port',
  'Rotamı iskeleye değiştiriyorum': 'I am altering my course to port',
  'Verilen başın iskelesine geçme': 'Do not allow the vessel to come to port of the ordered heading',
  'Gangway (iskele): gemi ile rıhtım arasına yatay/az eğimli kurulan geçiş köprüsü.': 'Gangway: a horizontal or slightly inclined access bridge rigged between the ship and the quay.',
  'Bağ ara (ör. izbarço, bowline, demir)…': 'Search knots (e.g. bowline, anchor)…',
  'Kaloma (Scope) ve Tutuş': 'Scope and Holding',
  'Sheet bend (anele bağı/dülger bağı) ne için uygundur?': 'What is a sheet bend suitable for?',
  'Temel düğümler: izbarço (sabit göz), camadan, sekiz, volta/kazık bağı.': 'Basic knots: bowline (fixed eye), reef knot, figure-eight knot, round turn/clove hitch.',
  'Sarımlar yük altında sıkışır; bu nedenle bağ yalnız sürekli gerilim altında tutar. Uzun bir cisim çekilirken çalışan uca yarım anele eklenir (dülger bağı + yarım anele).': 'The turns jam under load, so the hitch holds only under continuous tension. When towing a long object, add a half hitch to the working end (timber hitch + half hitch).',
  'Sarımlar yük binince sıkıştığı için bağın tutması sürekli gerginliğe bağlıdır. Uzun bir cismi yedeklerken çekilen uca ayrıca bir yarım anele atın (dülger + yarım anele).': 'Because the turns jam under load, the hitch holds only under continuous tension. When towing a long object, add a half hitch to the working end (timber hitch + half hitch).',
  'Beden üzerine bir yarım anele daha atarak kilitleyin; çımayı ince halatla bedene sürce (seizing) yaparak emniyete alın.': 'Add another half hitch around the standing part, then seize the working end to the standing part with small stuff.',
  'Tek bir kilit volta yeterlidir; fazlası halatı yük altında çözmeyi zorlaştırır. İlk turu daima uzak boynuzdan başlatın.': 'One locking turn is sufficient; extra turns make the line harder to release under load. Always start the first turn around the far horn.',
  '1.1 Halat tipleri ve işlevleri (head, breast, spring)': '1.1 Mooring-line types and functions (head, breast, spring)',
  'After Breast Line (Kıç Omuz Bağı): Kıç bölgesinden dik olarak kıyıya gönderilen halat.': "After Breast Line: A line led approximately perpendicular to the ship's fore-and-aft line from the aft part of the vessel to the berth.",
  'After Spring (Kıç Spring): Kıç bölgesinden pruva yönüne doğru gönderilen halat. Geminin geri kaymasını önler.': 'After Spring: A line led forward from the aft part of the vessel; it prevents astern movement.',
  'Forward Breast Line (Baş Omuz Bağı): Pruva bölgesinden dik olarak kıyıya gönderilen halat. Gemiyi iskeleye yakın tutar.': "Forward Breast Line: A line led approximately perpendicular to the ship's fore-and-aft line from the forward part of the vessel to keep her alongside the berth.",
  'Forward Spring (Baş Spring): Pruva bölgesinden kıça doğru gönderilen halat. Geminin ileri kaymasını önler.': 'Forward Spring: A line led aft from the forward part of the vessel; it prevents ahead movement.',
  'Head Line (Baş Bağı): Pruvanın en ön kısmından ileriye doğru gönderilen halat. Gemiyi iskeleye çeker.': 'Head Line: A line led forward from the bow to the berth; it prevents astern movement.',
  'Stern Line (Kıç Bağı): Kıçın en arka kısmından geriye doğru gönderilen halat.': 'Stern Line: A line led aft from the stern to the berth; it prevents ahead movement.',
  'Can salının painter (bağlama) halatının işlevi nedir?': "What is the function of the liferaft's painter line?",
  'Painter (bağlama halatı) kesilir.': 'The painter line is cut.',
  '2.1 Gypsy (Wildcat) ve zincir yatağı': '2.1 Gypsy (Wildcat) and chain pockets',
  'Diğerleri normal olduğu için alarmı susturup yatağa dönerim': 'Since everything else is normal, I silence the alarm and go back to bed.',
  'Bocurgat veya ırgat başında çalışan, demir operasyonlarını yürüten personel.': 'Personnel who work at a capstan or windlass and carry out anchoring operations.',
  'Doğal havalandırma: Rüzgar bacaları (ventilators)': 'Natural ventilation: cowls (ventilators)',
  'Bağlama Ekipmanları': 'Securing Equipment',
  'Bağlama ekipmanları sertifikalı olmalıdır': 'Securing equipment must be certified',
  'Çelik halat veya zincir bağlama': 'Securing with wire rope or chain',
  'Çelik halat veya zincir ile bağlama': 'Securing with wire rope or chain',
  'Demir Bağı': 'Anchor Bend',
  'Demir kaybı': 'Loss of the anchor',
  'Demir yerine geçer': 'Replaces the anchor',
  'Demirin paslanması': 'Rusting of the anchor',
  'Daha hızlı demir almak': 'Weigh anchor faster',
  'Dört kollu çapa benzeri demir ağırlık; küçük teknelerde demirleme amacıyla kullanılır.': 'A four-armed grapnel anchor used by small craft.',
  'Limanlarda gemilerin bağlandığı ağır demir blok; şamandıra veya halka ile bağlantılıdır.': 'A heavy mooring sinker connected to a buoy or ring.',
  'Makine dairesinde ciddi su alımında ana deniz suyu pompasıyla acil boşaltma': 'Emergency dewatering using the main seawater pump in the event of severe engine-room flooding',
  'Periyodik boşaltma yapılmazsa tortu birikir, denge bozulur ve ayrışma verimi düşer.': 'If sludge is not discharged periodically, it accumulates, upsets the balance and reduces separation efficiency.',
  'Silindir basıncı ölçümü ve gaz boşaltması için': 'For measuring cylinder pressure and releasing cylinder gas',
  'Seyir Günlüğü ve Kayıt': 'Deck Logbook and Records',
  '1.2 Malzeme istifleme ve sabitleme': '1.2 Material Storage and Securing',
  '6.1 Workshop, alet panosu ve yedek parça istifi': '6.1 Workshop, Tool Board and Spare-parts Storage',
  'Avrupa Birliği (AB)': 'European Union (EU)',
  'Ağır gövde': 'Heavy hull',
  'Dar derin gövde': 'Narrow, deep hull',
  'Gövde Formu:': 'Hull Form:',
  'Gövde Verimi': 'Hull Efficiency',
  'Gövde-boru': 'Shell-and-tube',
  'Gövde-boru (shell&tube)': 'Shell-and-tube',
  'Gövdeye bağlama yasaktır': 'Bonding to the hull is prohibited',
  'Gövdeyi ısıtarak': 'By heating the hull',
  'Boru/eşanjör kaçağı veya gövdeden su girişi': 'Pipe/heat-exchanger leakage or water ingress from the shell side',
  'Ceket suyu ön ısıtması ile gövde homojen ısınır; soğuk makinede ani yükleme çatlak riskini artırır.': 'Jacket-water preheating warms the engine block evenly; sudden loading of a cold engine increases the risk of cracking.',
  'Kompakt gövdeli istasyon': 'Compact operator station',
  'Titreşim ve gövde sıcaklığı normal mi?': 'Are vibration and casing temperature normal?',
  'Motor gövdesini çevreleyen soğutma suyu devresi; kapalı devre tatlı su ile çalışır.': 'Cooling-water circuit surrounding the engine block; it operates as a closed fresh-water circuit.',
  'Motor ve kompresörün aynı kapalı gövde içinde olduğu, sızdırmazlık gerektirmeyen tip': 'Hermetic type in which the motor and compressor share the same sealed casing',
  'Minimum 6 knot hız kapasitesi. En az 5 kişi taşıma kapasitesi (1 yaralı yatırılabilmeli). Rijit veya şişirilebilir gövde. Self-righting özelliği (devrilme sonrası kendini düzeltme). Çekme kancası ve emniyet hattı. Motor: Dıştan takma veya içten.': 'Minimum speed of 6 knots. Capacity for at least five persons, including one casualty lying down. Rigid or inflatable hull. Self-righting capability. Towing hook and safety line. Outboard or inboard engine.',
  'Hydrostatic test (gövde)': 'Hydrostatic test (cylinder)',
  'Pozitif basınç kaybı hem hava girişiyle patlayıcı atmosfer hem de vakumla tank gövdesi çökmesi riski yaratır.': 'Loss of positive pressure risks both an explosive atmosphere from air ingress and tank-shell collapse under vacuum.',
  'Bu bölgelerde yanıcı gaz bulunabilir; sertifikalı Ex ekipmanın gövde bütünlüğü bozulmadan kullanılması şarttır.': 'Flammable gas may be present in these areas; certified Ex equipment must be used without compromising enclosure integrity.',
  'Metasantr Yüksekliği (meyil deneyi)': 'Metacentric Height (inclining experiment)',
  'Hava Kriteri Rüzgâr Meyil Kolları': 'Weather Criterion Wind Heeling Arms',
  'Meyil (Heel):': 'Heel:',
  '10.5-11.5 (kazan)': '10.5–11.5 (boiler)',
  'İki kazan': 'Two boilers',
  'Kazan': 'Boiler',
  '2. MSB\'den feederleri sırayla ayırarak kaçak feederi bul': '2. Isolate the feeders one by one at the MSB to identify the faulty feeder',
  'Kaçak': 'Leak',
  'Kaçak kayıt zorunluluğu': 'Leak-recording requirement',
  'Buz doku donmasına, yağ ise ısının hapsolmasına yol açar.': 'Ice can cause tissue freezing, while grease traps heat.',
  'Soğutma doku hasarını sınırlar; buz doku donmasına yol açar, yağ ise ısıyı hapseder ve enfeksiyon riskini artırır.': 'Cooling limits tissue damage; ice can cause tissue freezing, while grease traps heat and increases the risk of infection.',
  'Dört zamanlı orta devir çevrimiyle jeneratör veya redüksiyon dişlisi üzerinden propulsion gücü üretmek.': 'Produce propulsion power with a four-stroke medium-speed engine through a generator or reduction gear.',
  'İki zamanlıda emme-sıkıştırma ve güç-egzoz aynı devirde tamamlanır; dört zamanlıda çevrim iki devir sürer.': 'In a two-stroke engine, compression and the power/exhaust events are completed within one revolution; in a four-stroke engine, the cycle takes two revolutions.',
  'Dönüşüm formülü: Hakiki = Pusula + Var + Dev.': 'Conversion formula: True = Compass + Var + Dev.',
  'Ana Makine Seyir Hazırlık Prosedürü': 'Main Engine Pre-Departure Preparation Procedure',
  'Acil Tahliye ve Yangın Devre Dışı Bırakma (Quick Closing & Shut-off)': 'Emergency Isolation and Fire Shut-off (Quick Closing & Shut-off)',
  'Duman tahliyesi': 'Smoke extraction',
  'Duman tahliyesi için kapı açma kararı neden dikkatli verilmelidir?': 'Why must a decision to open a door for smoke extraction be made carefully?',
  'Kompresör ve hava sistemi bileşenlerinde oluşan kondens suyunun otomatik olarak tahliye edilmesi, hava kalitesi ve sistem güvenliği için gereklidir.': 'Automatic drainage of condensate from compressor and air-system components is necessary for air quality and system safety.',
  'Madde, geminin buzlu limana girmeye zorlanamayacağını ve alternatif liman/tahliye düzenini belirler.': 'The clause states that the ship cannot be forced to enter an ice-bound port and sets out the alternative port/discharge arrangement.',
  'Pis su sisteminde vakum tahliyeli (vacuum) düzenlemenin avantajı nedir?': 'What is the advantage of a vacuum collection arrangement in the sewage system?',
  'Denize düşen kişinin kurtarılması ve can salına yaklaşma için kullanılan hızlı tahliye botu.': 'A fast rescue boat used to recover a person overboard and marshal liferafts.',
  'Tahlisiye araçlarının doğru prosedürle indirilmesi, tahliye operasyonunun başarısı için hayati önem taşır.': 'Correct launching of life-saving appliances is vital to a successful abandonment operation.',
};

const applyRule = (rule: EnglishTerminologyRule, source: string, translation: string): string => {
  if (!test(rule.source, source)) return translation;
  if (rule.applies && !rule.applies(source, translation)) return translation;
  if (!test(rule.wrong, translation)) return translation;
  if (rule.repair) return rule.repair(source, translation);
  if (rule.replacement === undefined) return translation;
  return replace(translation, rule.wrong, rule.replacement);
};

/** Repairs one Turkish-source/English-target pair. Idempotent by design. */
export const repairEnglishMaritimeTerminology = (
  source: string,
  translation: string,
): string => {
  if (!source || !translation) return translation;
  const exact = EXACT_ENGLISH_OVERRIDES[source];
  if (exact !== undefined) return exact;

  let out = restoreNonNauticalMapSense(source, translation);
  out = restorePassengerShipSense(source, out);
  out = restoreConflictZoneSense(source, out);
  out = restoreGasFreeingSense(source, out);
  out = restorePersonnelEvacuation(source, out);
  out = restoreRegulatoryEu(source, out);
  for (const rule of ENGLISH_TERMINOLOGY_RULES) out = applyRule(rule, source, out);

  // Additional high-confidence knot transliterations found while reviewing the
  // Turkish-character residue.  These are not new audit families; they belong
  // to the seamanship-knot family (T-048).
  if (/[iİIı]zbar[cç]o/u.test(source)) out = out.replace(/[iİIı]zbar[cç]o(?:n)?/gu, 'bowline');
  return out;
};

/** Returns every known terminology defect still present after translation. */
export const findEnglishMaritimeTerminologyIssues = (
  source: string,
  translation: string,
): EnglishTerminologyIssue[] => {
  const issues: EnglishTerminologyIssue[] = [];
  const exact = EXACT_ENGLISH_OVERRIDES[source];
  if (exact !== undefined) {
    if (translation !== exact) {
      issues.push({ id: 'TR-RESIDUE', label: 'English target contains untranslated Turkish technical text' });
    }
    return issues;
  }
  for (const rule of ENGLISH_TERMINOLOGY_RULES) {
    if (!test(rule.source, source)) continue;
    if (rule.applies && !rule.applies(source, translation)) continue;
    if (test(rule.wrong, translation)) issues.push({ id: rule.id, label: rule.label });
  }
  return issues;
};
