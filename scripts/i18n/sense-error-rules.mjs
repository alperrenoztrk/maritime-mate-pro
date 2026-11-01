// Word-sense error rules for the shipped dictionaries
// -----------------------------------------------------------------------------
// Machine translation picks the everyday meaning of words that are technical
// terms at sea: "bağ" (knot/hitch) becomes "vineyard", "demir" (anchor) becomes
// "iron", "kıç" (stern) a body part, "sancak" (starboard) a banner, a "short
// blast" an explosion, a "draft survey" a document draft, a north "cardinal"
// mark a bird or a church dignitary.
//
// A rule fires only when BOTH halves match: the source string uses the term in
// its maritime sense AND the translation contains the everyday sense — and,
// where a rule lists `right`, the correct term is absent. Matching both halves
// keeps false positives rare; a hit is treated as a wrong translation.
//
// Consumed by scripts/i18n/scan-sense-errors.mjs (report / --check) and by
// scripts/i18n/apply-contextual-fixes.mjs, which replaces a flagged entry with
// the English text (an English line is acceptable, a wrong one is not).

// Whole word / word-start helpers that work for every script (JS \b is ASCII).
const L = '(?<!\\p{L})';
const R = '(?!\\p{L})';
const w = (alts) => new RegExp(`${L}(?:${alts})${R}`, 'iu');
const s = (alts) => new RegExp(`${L}(?:${alts})`, 'iu');
const any = (alts) => new RegExp(`(?:${alts})`, 'u');

// Correct port-side and starboard terms per language (used as `right`).
export const PORT_SIDE = {
  en: w('port'), de: s('backbord'), fr: s('bâbord'), es: s('babor'), it: s('sinistra|babordo|mancina'),
  pt: s('bombordo'), nl: s('bakboord'), ja: any('左舷|左'), 'zh-CN': any('左舷|左'), ko: any('좌현|왼'),
  ru: s('лев'), uk: s('лів'), pl: s('lew|bakburt'), cs: s('lev|levobok'), sv: s('babord'),
  no: s('babord'), da: s('bagbord'), fi: s('paapuur|vasem|vasen'), hu: s('bal'), ro: s('babord|stâng'),
  el: s('αριστερ'), bg: s('ляв|лев'), ar: any('الميسرة|يسار'), hi: any('बाय|बाए|बाईं|पोर्ट'),
};
export const STARBOARD = {
  en: w('starboard'), de: s('steuerbord'), fr: s('tribord'), es: s('estribor'), it: s('dritta|destra'),
  pt: s('estibordo|boreste'), nl: s('stuurboord'), ja: any('右舷|右'), 'zh-CN': any('右舷|右'), ko: any('우현|오른'),
  ru: s('прав'), uk: s('прав'), pl: s('praw|sterburt'), cs: s('prav'), sv: s('styrbord'),
  no: s('styrbord'), da: s('styrbord'), fi: s('tyyrpuur|oike'), hu: s('jobb'), ro: s('tribord|dreapt'),
  el: s('δεξι'), bg: s('десн|дясн'), ar: any('الميمنة|يمين'), hi: any('दाय|दाहि|स्टारबोर्ड'),
};

export const SENSE_ERROR_RULES = [
  {
    id: 'bag-vineyard',
    label: 'bağ (knot, hitch, mooring) rendered as vineyard',
    src: /bağ/iu,
    wrong: {
      en: s('vineyard'), de: s('weinberg|weingarten|weinbau'), fr: s('vignoble'), es: s('viñedo'),
      it: s('vigneto'), pt: s('vinhedo'), nl: s('wijngaard'), ja: any('ブドウ園|葡萄園|ぶどう園|ブドウ畑'),
      'zh-CN': any('葡萄园'), ko: any('포도원|포도밭'), ru: s('виноградник'), uk: s('виноградник'),
      pl: s('winnic'), cs: s('vinic'), sv: s('vingård'), no: s('vingård|vinmark'), da: s('vingård|vinmark'),
      fi: s('viinitar|viinitil'), hu: s('szőlőskert|szőlőültetvény|szőlőbirtok'), ro: s('podgori'),
      el: s('αμπέλ'), bg: s('лозе|лозя'), ar: any('كرم العنب|مزرعة عنب|مزارع الكروم|كروم العنب'), hi: any('अंगूर के बाग|दाख की बारी|अंगूर का बाग'),
    },
  },
  {
    id: 'demir-iron',
    label: 'demir (anchor) rendered as iron',
    src: /demir(?:i|e|in|de|den|le|ler|leri|li|leme|lemek|lenme|lendi|ledi|lemiş)?\s+(?:at|al|vira|funda|zincir|yer|sahas|tarama|taramas|vardiya|ırgat|loca|mevki|nöbet|tut|bırak|tak|hazırla|donanım|operasyon|manevra|hesab|ışığ|feneri|topu)|demirle|demirli|demirde\b|demire\b|demir\s+atma|demirden\s+kalk|demir\s+alma|\bapiko|demir\s+tarama|demir\s+vardiya/iu,
    skipSrc: /dökme demir|yumuşak demir|demir cevher|demir oksit|demir ve çelik|demir-çelik|demir çelik|çelik ve demir|ferro|flinders/iu,
    wrong: {
      en: w('iron'), de: s('eisen(?!bahn)'), fr: w('fer'), es: w('hierro'), it: w('ferro'), pt: w('ferro'),
      nl: w('ijzer'), ja: any('鉄(?!道)'), 'zh-CN': any('铁(?!路)'), ru: s('желез'), uk: s('залізо|заліза|залізом|залізі'),
      pl: s('żelaz'), cs: s('želez'), sv: w('järn(?:et)?'), no: w('jern(?:et)?'), da: w('jern(?:et)?'),
      fi: s('rauta|raudan'), hu: w('vas(?:at|ból|on|ra|nak)?'), ro: w('fier(?:ul)?'), el: s('σίδηρ|σίδερ'),
      bg: s('желязо'), ar: any('حديد'), hi: any('लोहा|लोहे'),
    },
    right: {
      en: s('anchor'), de: s('anker'), fr: s('ancr'), es: s('ancl'), it: s('ancor'), pt: s('âncora|ancor|fund'),
      nl: s('anker'), ja: any('錨|アンカー|投錨|揚錨'), 'zh-CN': any('锚'), ru: s('якор'), uk: s('якір|якор'),
      pl: s('kotwic'), cs: s('kotv'), sv: s('ankar'), no: s('anker'), da: s('anker'), fi: s('ankkur'),
      hu: s('horgony'), ro: s('ancor'), el: s('άγκυρ|αγκυρ'), bg: s('котв'), ar: any('مرساة|المرساة|رسو'), hi: any('लंगर'),
    },
  },
  {
    id: 'kic-body',
    label: 'kıç (stern) rendered as a body part',
    src: /kıç/iu,
    wrong: {
      en: w('butt|buttocks|ass|arse|backside|bum'), de: s('hintern|gesäß|arsch|popo'), fr: w('fesses?|cul'),
      es: w('culo|nalgas?'), it: w('sedere|culo|natiche'), pt: w('bunda|nádegas?|cu'), nl: w('kont|achterwerk|billen'),
      ja: any('お尻|おしり'), 'zh-CN': any('屁股|臀部'), ko: any('엉덩이'), ru: s('задниц|ягодиц'),
      uk: s('сідниц|дуп'), pl: s('tyłek|tyłk|dupa|dupy|pośladk'), cs: s('zadek|zadku|prdel'),
      sv: w('rumpa|rumpan'), no: w('rumpe|rumpa'), da: w('røv|numse'), fi: s('pylly|perse'),
      hu: s('segg|fenek'), ro: w('cur|fesele'), el: s('πισινό|κώλο'), bg: s('задник|дупе'),
      hi: any('नितंब|चूतड़'),
    },
  },
  {
    id: 'sancak-flag',
    label: 'sancak (starboard) rendered as flag or banner',
    src: /sancak/iu,
    skipSrc: /bayrak|bandıra|flama|forsa|flag/iu,
    wrong: {
      en: w('banner|banners|flag|flags'), de: s('banner|flagge|fahne'), fr: s('bannière|drapeau|étendard'),
      es: s('estandarte|bandera'), it: s('stendard|bandier'), pt: s('estandarte|bandeira'), nl: s('vaandel|vlag|banier'),
      ja: any('旗'), 'zh-CN': any('旗(?!国)'), ko: any('깃발'), ru: s('знам|флаг|стяг'), uk: s('прапор|знам|стяг'),
      pl: s('sztandar|flag'), cs: s('prapor|vlajk'), sv: s('fana|fanan|flagg|baner'), no: s('fane|flagg|banner'),
      da: s('fane|flag|banner'), fi: s('lippu|lipun|viiri'), hu: s('zászló'), ro: s('steag|drapel|stindard'),
      el: s('σημαία|λάβαρο'), bg: s('знаме|флаг'), ar: any('راية|الراية'), hi: any('झंडा|ध्वज'),
    },
    right: STARBOARD,
  },
  {
    id: 'iskele-pier',
    label: 'iskele (port side) rendered as pier or scaffolding',
    src: /iskele\s*(?:taraf|borda|baş|kıç|omuz|alabanda|beş|on\b|yirmi|otuz|\d)|iskele\s+(?:işaret|feneri)|iskelede\s+(?:kal|bırak|tut)|iskelenizde|iskelenize|kanal\s+iskele|alabanda\s+iskele|iskele(?:ye|den|de|si|sine|sinde|ye doğru)?\s*(?:ve|veya|ya da|\/|,)\s*sancak|sancak(?:a|tan|ta|ı|ına|ında)?\s*(?:ve|veya|ya da|\/|,)\s*iskele|iskeleye\s+(?:dön|kaç|çevir|değiştir|alabanda|basar)|iskelede(?:n)?\s+(?:gör|bırak|geç)|iskeleden\s+(?:geç|al)/iu,
    skipSrc: /iskele\s+(?:merdiven|halat|ağ|trabzan|kurul|güvenli)|borda iskelesi|gangway|accommodation ladder|pilot ladder|rıhtım|liman iskelesi|yanaş/iu,
    wrong: {
      en: w('pier|piers|jetty|wharf|scaffold|scaffolding|quay'), de: new RegExp(`${L}(?:pier|gerüst|anlegestelle|landungsbrücke)|${L}(?:steg|stege|kai|kais)${R}`, 'iu'),
      fr: s('jetée|quai|échafaud|ponton|embarcadère'), es: s('muelle|embarcadero|andamio'), it: s('molo|banchina|impalcatur|pontile'),
      pt: s('cais|píer|andaime|pontão'), nl: s('pier|steiger|kade|aanlegplaats'), ja: any('桟橋|足場|埠頭'),
      'zh-CN': any('码头|栈桥|脚手架'), ko: any('부두|잔교|비계'), ru: s('пирс|причал|строительн|леса(?!\\p{L})|пристан'),
      uk: s('пірс|причал|пристан|риштуван'), pl: s('molo|pomost|rusztowan|nabrzeż'), cs: s('molo|přístaviště|lešení'),
      sv: new RegExp(`${L}(?:brygg|byggnadsställning)|${L}(?:pir|piren|kaj|kajen)${R}`, 'iu'), no: new RegExp(`${L}(?:brygg|stillas)|${L}(?:kai|kaia|kaien|pir|piren)${R}`, 'iu'), da: new RegExp(`${L}(?:stillads)|${L}(?:mole|molen|kaj|kajen)${R}`, 'iu'),
      fi: s('laitur|teline'), hu: s('móló|állvány'), ro: w('dig|digul|digului|chei|cheiul|cheiului|schela|schelă|schelei|schele|ponton|pontonul'), el: s('προβλήτα|σκαλωσιά|αποβάθρα'),
      bg: s('кей|пристан|скеле'), ar: any('رصيف|سقالة'), hi: any('घाट|मचान'),
    },
    right: PORT_SIDE,
  },
  {
    id: 'port-harbour',
    label: 'port (side) rendered as harbour, door or gate',
    // The English source always contains "port", which is also the French and
    // Polish word for harbour: do not skip on a source match.
    checkSource: false,
    src: /\bport[- ](?:side|bow|quarter|beam|hand|light|sidelight|anchor|wing|helm|rudder|engine|tack|lookout)\b|\bport and starboard\b|\bstarboard and port\b|\bstarboard or port\b|\bport or starboard\b|\b(?:alter(?:s|ing|ed)?|turn(?:s|ing|ed)?|swing(?:s|ing)?|bear(?:s|ing)?|hard|helm|course|keep(?:s|ing)?|kept|leav(?:e|es|ing)|pass(?:es|ing|ed)?)\b(?:\s+\w+){0,3}\s+to port\b|\bon (?:her|my|your|the|its|our) port\b|\bto port of\b/iu,
    skipSrc: /close to port|alongside|berth|quay|harbou?r|port state|port of|in port\b|port call|port authority|port entry|port facility|port control/iu,
    wrong: {
      de: s('hafen|häfen|tor(?!\\p{L})|tore(?!\\p{L})'), es: s('puerto|puerta'), it: w('porto|porti|porta|porte'),
      pt: w('porto|portos|porta|portas'), nl: s('haven|poort'), ja: any('港|ポート'), 'zh-CN': any('港口|港|端口'),
      ko: any('항구|포트'), cs: s('přístav|bran'), sv: s('hamn')  , no: s('havn'), da: s('havn'),
      fi: s('satam|portti|portin'), hu: s('kikötő|kapu'), el: s('λιμάνι|λιμεν|θύρα|θύρας|πόρτα'), bg: s('пристанищ|порт(?!\\p{L})'),
      ar: any('ميناء|الميناء|منفذ|باب'), hi: any('बंदरगाह'), ro: w('poart[aăă]|porții|portul'), ru: w('порт|порту|порта|порте'),
      uk: w('порт|порту|порті'), pl: w('port|portu|porcie|brama|bramy'), fr: w('port|porte|portes|ports'),
    },
    right: PORT_SIDE,
  },
  {
    id: 'kardinal-church',
    label: 'cardinal mark rendered as the bird or the church title',
    // Turkish "kardinal" is spelt like the German/Nordic noun: do not skip on a
    // source match.
    checkSource: false,
    src: /kardinal|\bcardinal (?:mark|marks|buoy|buoys|beacon|system|quadrant)|\b(?:north|south|east|west)(?:ern)? cardinal/iu,
    wrong: {
      // A trailing hyphen is a German/Nordic compound ("Kardinal- und Ansteuerungszeichen").
      de: new RegExp(`${L}(?:kardinal|kardinals|kardinäle|kardinälen)(?![\\p{L}-])`, 'iu'), es: s('cardenal'), pt: s('cardea(?:l|is)'),
      nl: w('kardinaal|kardinalen'), ja: any('枢機卿'), 'zh-CN': any('红衣主教|枢机'), ko: any('추기경'),
      ru: s('кардинал(?!ь)'), uk: s('кардинал(?!ь)'), pl: s('kardynał'), cs: s('kardinál(?!n)'), hu: s('bíboros'),
      sv: new RegExp(`${L}kardinal(?:en|er|erna)?(?![\\p{L}-])`, 'iu'), no: new RegExp(`${L}kardinal(?:en|er|ene)?(?![\\p{L}-])`, 'iu'),
      da: new RegExp(`${L}kardinal(?:en|er|erne)?(?![\\p{L}-])`, 'iu'), fi: new RegExp(`${L}kardinaali(?:n|a|t)?(?![\\p{L}-])`, 'iu'), fr: /\b(?:le|un|du|au|les|des|ce) cardinal(?:aux)?(?!\p{L})|cardinal (?:du |de l'|de l’)?(?:nord|sud|est|ouest)(?!\p{L})|cardinal (?:oriental|occidental|septentrional|méridional)/iu,
      it: /(?<!\p{L})(?:il|un|del|al|i|dei|lo) cardinal[ei](?!\p{L})|cardinale (?:settentrionale|meridionale|orientale|occidentale|del nord|del sud)/iu,
      ro: w('cardinalul|cardinalului'), bg: /(?<!\p{L})кардинал(?:ът|а|и)?(?!\p{L})/iu,
    },
  },
  {
    id: 'blast-explosion',
    label: 'whistle blast rendered as explosion or gust',
    src: /\b(?:short|prolonged|long|one|two|three|four|five|\d)\s+blasts?\b|\bblasts? (?:of|on) (?:the )?whistle|kısa düdük|uzun düdük|kısa ses|uzun ses/iu,
    wrong: {
      de: s('explosion|detonation|windstoß|böe'), fr: s('explosion|rafale'), es: s('explosi|ráfaga'),
      it: s('esplosion|raffica|raffiche'), pt: s('explos|rajada'), nl: s('explosie|ontploffing|windstoot'),
      ja: any('爆発|爆風|突風'), 'zh-CN': any('爆炸|爆破|阵风'), ko: any('폭발|돌풍'), ru: s('взрыв|порыв'),
      uk: s('вибух|порив'), pl: s('wybuch|eksplozj|podmuch'), cs: s('výbuch|exploz|poryv'), sv: s('explosion|vindby'),
      no: s('eksplosjon|vindkast'), da: s('eksplosion|vindstød'), fi: s('räjähd|tuulenpuuska'), hu: s('robban'),
      ro: s('explozi|rafal'), el: s('έκρηξ|ριπή'), bg: s('взрив|експлоз|порив'), ar: any('انفجار'), hi: any('विस्फोट'),
    },
  },
  {
    id: 'draft-document',
    label: 'ship draft rendered as a document draft',
    src: /\bdraf?u?g?ht\s+(?:survey|marks?|reading|readings|forward|aft|mean|limit|limits|restriction|difference)|\b(?:fore|aft|forward|mean|midships?|deep|light|loaded|summer|maximum|max|arrival|departure|air|static|dynamic)\s+draf?u?g?hts?\b|draft survey|su çekimi|\(draft\)|draft okuma|draft mark/iu,
    wrong: {
      de: s('entwurf|entwürf'), fr: s('brouillon'), es: s('borrador'), it: s('bozza|bozze'), pt: s('rascunho|minuta'),
      nl: w('concept|concepten'), ja: any('下書き|草稿|草案'), 'zh-CN': any('草稿|草案'), ko: any('초안'),
      ru: s('черновик'), uk: s('чернетк'), pl: s('szkic'), cs: s('koncept'), sv: s('utkast'), no: s('utkast'),
      da: s('udkast'), fi: s('luonnos|luonnok'), hu: s('vázlat|tervezet'), ro: s('ciorn'), el: s('προσχέδι'),
      bg: s('чернов'), ar: any('مسودة'), hi: any('मसौदा|प्रारूप'),
    },
  },
  {
    id: 'heel-foot',
    label: 'heel (list of the ship) rendered as the heel of the foot or a shoe',
    src: /\bheel(?:s|ing|ed)?\b(?!\s*(?:bolt|block|piece|pin))|yana yatma|meyil|\bheeling\b/iu,
    wrong: {
      de: s('ferse|absatz'), fr: w('talon|talons'), es: s('talón|tacón|tacones'), it: s('tallone|tacco|tacchi'),
      pt: s('calcanhar|salto alto'), nl: w('hiel|hielen'), ja: any('かかと|踵'), 'zh-CN': any('脚跟|鞋跟|脚后跟'),
      ko: any('발뒤꿈치|뒤꿈치|굽'), ru: s('пятк|каблук'), uk: s('п’ят|п\'ят|підбор'), pl: s('pięt|obcas'),
      cs: s('podpat'), sv: w('häl|hälen|klack'), no: w('hæl|hælen'), da: w('hæl|hælen'), fi: s('kantapä'),
      ro: s('călcâi'), el: s('φτέρν|τακούν'), bg: s('пета|токчет'), ar: /(?<!\p{L})(?:ال|و|ب)?كعب/u, hi: any('एड़ी'),
    },
  },
  {
    id: 'mate-companion',
    label: 'mate (deck officer) rendered as companion or friend',
    src: /\b(?:chief|first|second|third|fourth) mate\b|\bmate on watch\b/iu,
    wrong: {
      de: s('kumpel|kamerad|gefährte'), fr: s('compagnon|copain|camarade'), es: s('compañero|amigo'),
      it: s('compagn|amico'), pt: s('companheir|amigo|colega'), ja: any('仲間|相棒'), 'zh-CN': any('伙伴|伴侣|配偶|伙计'),
      ko: any('동료|짝'), ru: s('приятел|товарищ|напарник'), uk: s('приятел|товариш|напарник'), pl: s('kumpel|kolega|towarzysz'),
      cs: s('kamarád|kolega|druh'), sv: s('kompis|kamrat'), no: s('kompis|kamerat'), da: s('kammerat|makker'),
      fi: s('kaveri|toveri'), hu: s('haver|társ'), ro: s('prieten|tovarăș|coleg'), el: s('σύντροφ|φίλ'),
      bg: s('приятел|другар'), ar: any('رفيق|صديق|زميل'), hi: any('साथी|मित्र'),
    },
  },
  {
    id: 'top-cannon',
    label: 'top (day-shape ball) rendered as cannon',
    src: /(?:siyah|bir|iki|üç)\s+top|top\s+(?:şekl|işaret|asılı|gösterir)|toplar\b|gündüz işaret|ball/iu,
    skipSrc: /top atış|top ateş|topla ateş|silah|gun\b|kanon|cannon/iu,
    wrong: {
      en: w('cannon|cannons|gun|guns'), de: s('kanone|geschütz'), fr: w('canon|canons'), es: s('cañón|cañones'),
      it: s('cannon'), pt: s('canhão|canhões'), nl: w('kanon|kanonnen'), ja: any('大砲|砲'), 'zh-CN': any('大炮|炮'),
      ko: any('대포'), ru: s('пушк|орудие'), uk: s('гармат'), pl: s('armat|dział'), cs: s('dělo|děla|kanón'),
      sv: w('kanon|kanoner'), no: w('kanon|kanoner'), da: w('kanon|kanoner'), fi: s('tykki|tykin'), hu: s('ágyú'),
      ro: w('tun|tunuri'), el: s('κανόνι'), bg: s('оръди|топ(?!\\p{L})'), ar: any('مدفع'), hi: any('तोप'),
    },
  },
  {
    id: 'funda-fondue',
    label: 'funda (let go the anchor) rendered as fondue',
    src: /funda/iu,
    wrong: Object.fromEntries(
      ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'cs', 'hu', 'ro'].map((l) => [l, s('fondue')]),
    ),
  },
  {
    id: 'silici-eraser',
    label: 'silici (wiper, engine-room rating) rendered as eraser',
    src: /silici/iu,
    wrong: {
      en: w('eraser|erasers'), de: s('radiergummi'), fr: w('gomme|gommes'), es: s('goma de borrar|borrador'),
      it: w('gomma|gomme'), pt: s('borracha'), nl: w('gum|gummetje'), ja: any('消しゴム'), 'zh-CN': any('橡皮'),
      ko: any('지우개'), ru: s('ластик'), uk: s('гумк'), pl: s('gumk'), cs: s('guma'), sv: s('suddgummi'),
      no: s('viskelær'), da: s('viskelæder'), fi: s('pyyhekumi'), hu: s('radír'), ro: s('radier'),
      el: s('γόμα'), bg: s('гумичк'), ar: any('ممحاة'), hi: any('रबड़'),
    },
  },
];

// Correct bow terms per language (used as `right` for the baş = bow rule).
export const BOW = {
  en: w('bow|bows|forward|fore|forecastle|head-on'), de: s('bug|vorschiff|vorne|vorn'), fr: s('proue|avant|étrave|gaillard'),
  es: s('proa'), it: s('prua|prora'), pt: s('proa'), nl: s('boeg|voorschip|voor'), ja: any('船首|船首部|バウ'),
  'zh-CN': any('船首|船头'), ko: any('선수|선首|뱃머리'), ru: s('нос|бак'), uk: s('ніс|носов'), pl: s('dzi[oó]b'),
  cs: s('příď|přídě|přídi'), sv: s('för|stäv|bog'), no: s('baug|for(?!\\p{L})|forut'), da: s('stævn|bov|for(?!\\p{L})'),
  fi: s('keula|keulan'), hu: s('orr|hajóorr'), ro: s('prova|provei'), el: s('πλώρ'), bg: s('нос|бак'),
  ar: any('مقدمة|المقدمة|القوس'), hi: any('धनुष|अग्र|बो'),
};

SENSE_ERROR_RULES.push(
  {
    id: 'bas-head',
    label: 'baş (bow) rendered as the head of a body',
    src: /baş\s*(?:ve|-|–|\/)\s*kıç|kıç\s*(?:ve|-|–|\/)\s*baş|baş(?:ı|a|tan)?\s+(?:it|iter|ittirir|düşer|kaçar|kayar|döner|savrul|yükselir|batar|trimli)|başa\s+trim|baş\s+trim|baş\s+omuz|baş\s+taraf|baştaki|baş\s+bodoslama|baş\s+pik|baş\s+kasara|baş\s+üst/iu,
    wrong: {
      de: s('kopf|köpfe'), fr: w('tête|têtes'), es: w('cabeza|cabezas'), it: w('testa|teste'), pt: w('cabeça|cabeças'),
      nl: w('hoofd|hoofden'), ja: any('頭(?!上)'), 'zh-CN': any('头部|脑袋'), ko: any('머리'), ru: s('голов'),
      uk: s('голов'), pl: s('głow'), cs: s('hlav'), sv: w('huvud|huvudet'), no: w('hode|hodet'), da: w('hoved|hovedet'),
      hu: w('fej|fejet|feje|fejjel'), el: s('κεφάλ'), bg: s('глав'), hi: any('सिर'),
    },
    right: BOW,
  },
  {
    id: 'breast-line-body',
    label: 'breast line (mooring line) rendered as a body part',
    src: /\bbreast\s*(?:line|lines|rope|ropes|mooring|moorings)\b|\bbreasting\b|omuz bağı|omuz halatı/iu,
    wrong: {
      fr: s('poitrine|sein'), es: w('pecho|pechos|senos?'), it: w('petto|seno|seni'), pt: w('peito|seios?'),
      nl: s('borst'), ja: any('胸'), 'zh-CN': any('胸'), ko: any('가슴'), ru: s('груд'), uk: s('груд'),
      pl: s('piersi|pierś'), cs: s('hrud|prs'), sv: s('bröst'), no: s('bryst'), da: s('bryst'),
      hu: s('mellzsinór|mellkas|mellvonal'), ro: s('piept|sân'), el: s('στήθ'), bg: s('гърд'),
      ar: any('الثدي|ثدي|الصدر'), hi: any('स्तन|छाती'),
    },
  },
  {
    id: 'bank-finance',
    label: 'bank (river or channel bank) rendered as a financial bank or a bench',
    src: /\bbank\s+(?:cushion|suction|effect|rejection|interaction)|\bbank effects?\b|kıyı etkisi|kanal etkisi/iu,
    wrong: {
      fr: s('banque'), it: s('banca|banche'), ru: s('банк'), uk: s('банк'), pl: w('banku|bank|bankowy|bankowa|banków'),
      cs: s('bank'), fi: s('pankki|pankin|pankki'), hu: s('bankpárna|bankhatás|pad(?!\\p{L})|padszív'), ro: s('bancă|băncii'),
      el: s('τράπεζ|πάγκ'), bg: s('банк'), ar: any('البنك|بنك'), 'zh-CN': any('银行'), ko: any('은행'), ja: any('銀行'),
    },
  },

  {
    id: 'hog-pig',
    label: 'hog (hull hogging) rendered as a pig',
    src: /\bhog(?:s|ging|ged)?\b/iu,
    wrong: {
      de: s('schwein'), fr: s('porc|cochon'), es: s('cerdo|puerco'), it: s('maial|porc'), pt: s('porco'),
      nl: s('varken|zwijn'), ja: any('豚'), 'zh-CN': any('猪'), ko: any('돼지'), ru: s('свин|кабан'), uk: s('свин'),
      pl: s('świni|świnia|wieprz'), cs: s('prase|vepř'), sv: w('gris|grisen|svin'), no: w('gris|grisen|svin'),
      da: w('gris|grisen|svin'), fi: s('sika|sian'), hu: s('disznó|sertés'), ro: w('porc|porcul|porci'),
      el: s('γουρούν|χοίρ'), bg: s('свин|прасе'), ar: any('خنزير'), hi: any('सुअर'),
    },
  },
  {
    id: 'stern-strict',
    label: 'stern (of a ship) rendered as strict or severe',
    src: /\bstern\b/iu,
    wrong: {
      de: s('streng'), fr: s('sévère|strict'), es: s('severo|severa|estrict'), it: s('severo|severa|rigid'),
      pt: s('severo|severa|rígid'), nl: s('streng'), ja: any('厳しい|厳格'), 'zh-CN': any('严厉|严格'), ko: any('엄격|엄한'),
      ru: s('строг|суров'), uk: s('суворий|сувора|строгий|строга'), pl: s('surow|rygor'), cs: s('přísn'),
      sv: s('sträng'), no: s('streng'), da: s('streng'), fi: s('ankar|tiuk'), hu: s('szigorú'), ro: s('sever|strict'),
      el: s('αυστηρ'), bg: s('строг|суров'), ar: any('صارم'), hi: any('कठोर|सख्त'),
    },
  },
  {
    id: 'headline-title',
    label: 'head line (mooring line) rendered as a newspaper headline or page header',
    src: /(?=.*\bhead\s*-?\s*lines?\b|.*\bheadlines?\b)(?=.*(?:breast|spring|stern line|mooring|bağlama|halat|palamar))/isu,
    wrong: {
      de: s('überschrift|schlagzeile|kopfzeile'), fr: s('titre|en-tête'), es: s('titular|encabezado'),
      it: s('titolo|titoli|intestazion'), pt: s('manchete|título|cabeçalho'), nl: s('krantenkop|koptekst'),
      ja: any('見出し|ヘッドライン'), 'zh-CN': any('标题|头条'), ko: any('헤드라인|제목'), ru: s('заголов'), uk: s('заголов'),
      pl: s('nagłów'), cs: s('nadpis|titulek'), sv: s('rubrik'), no: s('overskrift'), da: s('overskrift'),
      fi: s('otsikko|otsikon|otsikot'), hu: s('fejléc|főcím'), ro: s('titlu|antet'), el: s('τίτλ|επικεφαλίδ'),
      bg: s('заглав'), ar: any('عنوان|العناوين'), hi: any('शीर्षक|सुर्खी'),
    },
  },
  {
    id: 'spring-season',
    label: 'spring (mooring line) rendered as the season or a coil spring',
    src: /\bspring\s*-?\s*lines?\b|\b(?:forward|after|aft|fore|back|head|stern)\s+springs?\b|\bsprings?\b(?=.*\b(?:breast|head\s*line|stern\s*line|mooring)\b)|spring halat|spring\s*\(/isu,
    skipSrc: /spring tide|spring-neap|neap|gelgit|tide|tidal|med|cezir|ilkbahar|spring rate|spring-loaded|yay/iu,
    wrong: {
      de: s('frühling|frühjahr|feder'), fr: s('printemps|ressort'), es: s('primavera|resorte'), it: s('primaver|molla|molle'),
      pt: s('primaver|mola(?!\\p{L})|molas'), nl: s('lente|voorjaar|veer(?!t)|veren'), ja: any('春|バネ|ばね'),
      'zh-CN': any('春|弹簧'), ko: any('봄(?!\\p{L})|용수철'), ru: s('весн|пружин'), uk: s('весн|пружин'),
      pl: s('wiosn|sprężyn'), cs: s('jaro|jara|jaře|pružin'), sv: s('fjäder|fjädr'), no: s('fjær'), da: s('forår|fjeder'),
      fi: s('kevä|jousi|jousen'), hu: s('tavasz|rugó'), ro: s('primăvar'), el: s('άνοιξ|ελατήρι'), bg: s('пролет|пружин'),
      ar: any('الربيع|ربيع|نابض'),
    },
  },

  {
    id: 'beam-ray',
    label: 'beam (ship breadth, beam sea) rendered as a ray of light',
    src: /\bbeam\s*(?:sea|seas|wind|winds|swell|on|to)\b|\babeam\b|\bon the (?:port|starboard) beam\b|\bbeam\b(?=.*\b(?:breadth|width|ship|vessel|hull|draft|length)\b)/iu,
    skipSrc: /radar|antenna|anten|light beam|ışın|laser|lazer|sonar|echo|beam width|beamwidth|lobe/iu,
    wrong: {
      de: s('strahl'), fr: s('rayon|faisceau'), es: s('mar de haz|olas? de haz|viento de haz|rayos?(?!\\p{L})'),
      it: s('raggio|fascio'), pt: s('raio|feixe'), nl: s('straal|bundel'), ja: any('光線'), 'zh-CN': any('光束|射线'),
      ko: any('광선'), ru: s('луч'), uk: s('промін'), pl: s('promie|wiązk'), fi: s('säde|säte'), hu: s('sugár|nyaláb'),
      el: s('ακτίν|δέσμ'), bg: s('лъч'),
    },
  },
  {
    id: 'watch-clock',
    label: 'watch (duty period at sea) rendered as a wristwatch or clock',
    src: /\b(?:on|keep(?:s|ing)?|navigational|bridge|engine|anchor|deck|night|morning|afternoon|dog|middle|harbour|port|sea)\s+watch(?:es)?\b|\bwatchkeep|\bwatch officer|\bofficer of the watch|\bwatch handover|\bhand(?:ing)? over the watch|\bwatch bill|vardiya|nöbet/iu,
    skipSrc: /saat|clock|chronometer|kronometre|wristwatch|seiko/iu,
    wrong: {
      fr: s('montre'), es: s('reloj'), it: s('orologio|orologi'), pt: s('relógio'), nl: s('horloge'), ja: any('腕時計'),
      'zh-CN': any('手表'), ko: any('손목시계'), pl: s('zegarek|zegark'), cs: s('hodinky'), sv: s('armbandsur'),
      fi: s('rannekello'), hu: s('karóra'), ro: w('ceas|ceasul|ceasului'), el: s('ρολόι'), bg: s('часовник'),
      de: s('armbanduhr|taschenuhr'),
    },
  },
  {
    // Göksel seyirde "kronometre" Greenwich zamanını tutan deniz kronometresidir;
    // İngilizcede "stopwatch" (süre ölçen saat) başka bir alettir.
    id: 'kronometre-stopwatch',
    label: 'marine chronometer (kronometre) rendered as a stopwatch',
    src: /kronometre/iu,
    wrong: { en: s('stop ?watch') },
  },

  {
    // "Sınıf"/"klas" is the classification society (class rules, class
    // survey, AIS Class A/B) unless the text is about training.
    id: 'sinif-classroom',
    label: 'class (classification society) rendered as a classroom',
    src: /s[ıi]n[ıi]f|klas/iu,
    skipSrc: /eğitim|ders(?:lik|hane)|öğrenci|öğretmen|eğitmen|kurs|training|simülatör|classroom/iu,
    wrong: {
      en: w('classrooms?'), de: s('klassenzimmer|klassenraum|schulklasse'), fr: s('salles? de classe'),
      es: w('aulas?|salón de clases?'), it: w('aula|aule'), pt: s('salas? de aula'), nl: s('klaslokal'),
      da: s('klasseværelse'), sv: s('klassrum'), no: s('klasserom'), fi: s('luokkahuone'),
      pl: s('sala lekcyjn|sali lekcyjn|klasa szkoln|klasie szkoln'), cs: s('učebn'), hu: s('osztályterem|tanterem'),
      ro: s('sala de clasă|sală de clasă|sălii de clasă'), el: s('αίθουσα διδασκαλίας'), ru: s('классн(?:ая|ой|ую) комнат'),
      uk: s('класн(?:а|ій|у) кімнат'), bg: s('класна стая|класната стая'), ja: any('教室'), 'zh-CN': any('教室'),
      ko: any('교실'), ar: any('الفصل الدراسي|فصل دراسي|الفصول الدراسية'),
    },
  },

  {
    // "Havuz" is the dry dock in the stability, survey and maintenance
    // lessons. Swimming pools on passenger ships and pools in the sense of a
    // shared group (fleet, charterer, P&I pool, FuelEU pooling) are skipped.
    // "Havuzlama" (dry-docking) rendered as "pooling" is the same error.
    id: 'havuz-pool',
    label: 'dry dock (havuz) rendered as a swimming pool',
    src: /havuz/iu,
    skipSrc: /yüzme|jakuzi|filo\s+havuz|kaynak\s+havuz|charterer\s+havuz|kiralama\s+havuz|ortak\s+havuz|üyelik|bölgesel\s+havuz|deney\s+havuz|güverte\/havuz|su\s+parkı|cruise|yolcu|deficit|surplus|fuel\s*eu|pooling/iu,
    wrong: {
      en: w('pools?|pooling'), de: s('schwimmbad|schwimmbeck|pool'), fr: s('piscine|pooling|mise en commun'), es: s('piscina|alberca|pooling'),
      it: s('piscin|pooling'), pt: s('piscina|pooling'), nl: s('zwembad|pooling'), ja: any('プール'), 'zh-CN': any('游泳池|泳池|水池'),
      ko: any('수영장|풀장|풀링'), ru: s('бассейн'), uk: s('басейн'), bg: s('басейн'), pl: s('basen|pooling'), cs: s('bazén|pooling'),
      sv: s('pool|simbassäng'), no: s('pool|svømmebasseng|basseng'), da: s('pool|svømmebassin|swimmingpool'),
      fi: s('uima-al|allas|altaa|pooling'), hu: s('medence|uszoda|pooling'), ro: s('piscin|bazin|pooling'), el: s('πισίν'),
      ar: any('مسبح|حمام السباحة|حمام سباحة|بركة'), hi: any('पूल|तरणताल|स्विमिंग'),
    },
  },

  {
    id: 'special-area-private',
    label: 'MARPOL special area (özel alan) rendered as a private area',
    // "Özel alan" is a MARPOL Special Area in these lessons, except where the
    // text is about a cabin or privacy.
    src: /özel\s+(?:alan|bölge)|\bspecial areas?\b/iu,
    skipSrc: /kamara|kişisel|mahremiyet|özel hayat|özel eşya|privacy|cabin/iu,
    wrong: {
      en: w('private (?:areas?|zones?|spaces?|domains?)'), de: s('privat'), fr: s('privé'), es: s('privad'), it: s('privat'), pt: s('privad'), nl: s('privé'),
      ja: any('プライベート|私有|私的'), 'zh-CN': any('私人|私有'), ko: any('사유|프라이빗|개인 구역|개인 지역'),
      ru: s('частн'), uk: s('приватн'), pl: s('prywatn'), cs: s('soukrom'), sv: s('privat'), no: s('privat'),
      da: s('privat'), fi: s('yksityi'), hu: s('magán'), ro: s('privat'), el: s('ιδιωτικ'), bg: s('частн'),
      hi: any('निजी'),
    },
  },

  {
    id: 'res-picture',
    label: 'IMO "Res." (resolution) rendered as a picture or figure caption',
    src: /\bRes\.\s*(?:[A-Z]{1,5}\.?\s*\d|\d|—|–)/u,
    checkSource: false,
    wrong: {
      en: /(?<!\p{L})(?:Pic|Fig|Photo)\.(?=\s*(?:[A-Z]|\d|—|–))/u, de: /(?<!\p{L})(?:Bild|Abb)\./u,
      fr: /(?<!\p{L})(?:Photo|Pic|Fig|Image)\./u, es: /(?<!\p{L})(?:Foto|Fig|Imagen|Img)\./u,
      it: /(?<!\p{L})(?:Foto|Fig|Immagine|Img)\./u, pt: /(?<!\p{L})(?:Foto|Fig|Imagem|Img)\./u,
      nl: /(?<!\p{L})(?:Afb|Foto|Fig)\./u, ru: /(?<!\p{L})Рис\./u, uk: /(?<!\p{L})(?:Мал|Рис)\./u,
      pl: /(?<!\p{L})(?:Ryc|Rys|Zdj)\./u, cs: /(?<!\p{L})Obr\./u, sv: /(?<!\p{L})(?:Bild|Fig)\./u,
      no: /(?<!\p{L})(?:Bilde|Fig)\./u, da: /(?<!\p{L})(?:Billede|Fig)\./u, fi: /(?<!\p{L})Kuva/u,
      hu: /(?<!\p{L})(?:Kép|Ábra)/u, ro: /(?<!\p{L})(?:Fig|Imagine|Img)\./u, el: /(?<!\p{L})Εικ/u,
      bg: /(?<!\p{L})Фиг\./u, ja: /図|写真/u, 'zh-CN': /图|照片/u, ko: /그림|사진/u, ar: /صورة|شكل/u, hi: /चित्र/u,
    },
  },
  {
    id: 'waterplane-seaplane',
    label: 'waterplane (hull section) rendered as a seaplane',
    src: /water\s*-?plane|su hattı alanı|su hattı düzlemi/iu,
    wrong: {
      de: s('wasserflugzeug'), fr: s('hydravion'), es: s('hidroavi'), it: s('idrovolant'), pt: s('hidroavi'),
      nl: s('watervliegtuig'), ja: any('水上飛行機'), 'zh-CN': any('水上飞机'), ko: any('수상 ?비행기'),
      ru: s('гидросамол'), uk: s('гідролітак'), pl: s('hydroplan|wodnosamolot'), cs: s('hydroplán'),
      sv: s('sjöflygplan'), no: s('sjøfly'), da: s('vandflyver'), hu: s('hidroplán'), ro: s('hidroavion'),
      el: s('υδροπλάν'), bg: s('хидроплан'), ar: any('طائرة مائية'), hi: any('समुद्री विमान'),
    },
  },
  {
    id: 'securite-proword',
    label: 'radio proword SÉCURITÉ translated as security or safety',
    src: /^(?=[\s\S]{0,40}$)[\s\S]*(?:SÉCURITÉ|SECURITE|Sécurité)/u,
    wrong: {
      en: w('security'), de: s('sicherheit'), es: s('seguridad'), it: s('sicurezz'), pt: s('seguran'),
      nl: s('veiligheid'), ru: s('безопасн'), uk: s('безпек'), pl: s('bezpiecze'), cs: s('bezpečn'),
      sv: s('säkerhet'), no: s('sikkerhet'), da: s('sikkerhed'), fi: s('turvallisuu'), hu: s('biztonság'),
      ro: s('siguran'), el: s('ασφάλει'), bg: s('безопасн'), ja: any('安全|セキュリティ'), 'zh-CN': any('安全'),
      ko: any('안전|보안'), ar: any('أمن|سلامة'), hi: any('सुरक्षा'),
    },
  },
  {
    id: 'muster-customer',
    label: 'muster (list, station) rendered as customer',
    src: /\bmuster/iu,
    wrong: {
      en: w('customer|customers'), de: s('kunde'), fr: s('client'), es: s('client'), it: s('client'), pt: s('client'),
      nl: s('klant'), ru: s('клиент'), uk: s('клієнт'), pl: s('klient'), cs: s('zákazn'), sv: s('kund'),
      no: s('kunde'), da: s('kunde'), fi: s('asiaka'), hu: s('ügyfél|vevő'), ro: s('client'), el: s('πελάτ'),
      bg: s('клиент'), ja: any('顧客'), 'zh-CN': any('客户'), ko: any('고객'), ar: any('عملاء|عميل|زبائن'), hi: any('ग्राहक'),
    },
  },
  {
    id: 'immersion-suite',
    label: 'immersion suit rendered as a suite',
    src: /immersion suit/iu,
    wrong: {
      en: w('suite|suites'), de: s('suite|immersionssuite'), fr: w('suite|suites'), es: w('suite|suites'),
      it: w('suite'), pt: s('suíte|suite'), nl: w('suite|suites'), ja: any('スイート'), 'zh-CN': any('套房'),
      ko: any('스위트'),
    },
  },
  {
    id: 'let-go-lets-go',
    label: 'let go (mooring/anchor order) rendered as "let us go"',
    src: /\blet go\b/iu,
    wrong: {
      en: /\blet'?s go\b/iu, de: /lass(?:t)? uns gehen|gehen wir/iu, fr: /allons/iu, es: /vamos/iu, it: /andiamo/iu,
      pt: /vamos/iu, nl: /laten we gaan|we gaan/iu, ru: s('пойд|пошли'), uk: s('ходімо|підемо'), pl: s('chodźmy|idziemy'),
      cs: s('pojďme|jdeme'), sv: /låt oss gå|vi går/iu, no: /la oss gå/iu, da: /lad os gå/iu, fi: s('mennään'),
      hu: s('menjünk|gyerünk'), ro: /să mergem|hai să/iu, el: s('πάμε'), bg: s('да вървим|хайде'),
      ja: any('行きましょう|行こう'), 'zh-CN': any('我们走|走吧'), ko: any('가자|갑시다'), ar: any('هيا بنا|لنذهب'), hi: any('चलो|चलिए'),
    },
  },
);

// Stability terms that machine translation from ENGLISH gets wrong (found while
// building the checked-English pivot layer, scripts/i18n/translate-pivot.mjs):
// "trim" becomes cutting/cropping, a "slack tank" a loose or military tank, a
// flooded compartment a flood over land, and heeling a capsize.
SENSE_ERROR_RULES.push(
  {
    id: 'trim-cut',
    label: 'trim (longitudinal inclination) rendered as cutting, cropping or pruning',
    src: /(?<!\p{L})trim/iu,
    wrong: {
      de: s('schneid|beschneid|zuschneid|abschneid'), nl: s('bijsnijd|bijgesned|bijknip|afknip|afsnijd|snoei'),
      fr: w('tailler|taillé|taillée|taillés|taillées|rogner|rogné|rognée|couper|coupé|coupée|découper|découpé'),
      es: w('recortar|recorte|recortes|recortado|recortada|cortar|cortado|podar|poda'),
      it: w('tagliare|tagliato|tagliata|tagliarsi|rifilare|rifilato|potare|potatura'),
      pt: w('cortar|cortado|cortada|aparar|aparado|podar|poda'),
      ro: w('tăia|tăiat|tăiată|tăiate|taie|decupa|decupat|decupată'), cs: s('oříz|ořez|stříh|zastřih'),
      pl: s('przycin|przycię|przytn|obcin|obcię'), hu: s('levág|lenyír|megnyes|nyírás|vágás|vágja|vágni'),
      el: s('κόψ|κοπή|κόβ|ψαλίδ|περικοπ'), bg: s('подрязв|подрязан|изрязв|изрязан|отрязв|отрязан|отреж|подреж'),
      ru: s('обрез|подрез|обреж|подреж'), uk: s('обріз|підріз'), sv: s('klipp|beskär|beskur'),
      no: s('klipp|beskjær|kutt'), da: s('beskær|beskåret|klippet|klipper'), fi: s('leikat|leikata|leikkaa|karsi'),
      ja: any('切り取|切り落|カット|刈り|剪定|トリミング'), 'zh-CN': any('修剪|剪裁|裁剪|切割|剪掉'),
      ko: any('잘리|잘라|자르|자른|잘린|깎|다듬'), ar: /(?<!\p{L})(?:ال|و|ب|ف)?(?:تقليم|تشذيب|يقص|تقص|قص)(?!\p{L})/u,
      hi: any('सिकुड़|काट|छंट|कतर'),
    },
    right: {
      de: s('trimm|hecklast|kopflast'), nl: s('trim|stuurlast|koplast'), fr: s('assiette|trim'),
      es: s('asiento|trimado|trim'), it: s('assetto|trim'), pt: s('trim|compasso'), ro: s('asiet|trim'),
      cs: s('trim'), pl: s('przegłębi|trym'), hu: s('trim'), el: s('διαγωγ|τριμ'), bg: s('диферент|трим'),
      ru: s('диферент|дифферент|трим'), uk: s('диферент|трим'), sv: s('trim'), no: s('trim'), da: s('trim'),
      fi: s('trim'), ja: any('トリム|縦傾斜'), 'zh-CN': any('纵倾|吃水差'), ko: any('트림|종경사'), hi: any('ट्रिम'),
    },
  },
  {
    id: 'slack-tank-loose',
    label: 'slack (partly filled) tank rendered as a loose, limp or military tank',
    src: /slack\s+(?:ballast\s+|fuel\s+|fresh\s+water\s+|water\s+|oil\s+|cargo\s+)?tanks?/iu,
    wrong: {
      de: s('schlaff|locker|lose'), nl: s('slap|slappe'), es: s('floj'), it: s('allentat|carri armati|carro armato'),
      pt: s('froux'), sv: s('slak|slapp'), no: s('slakk'), da: s('slakk|slap'), fi: s('löys'), pl: s('luź|luz'),
      cs: s('uvoln'), hu: s('laza|meglaz'), ro: s('slăbit'), ru: s('слаб|провис'), uk: s('слаб|провис'),
      bg: s('хлабав|провис'), el: s('χαλαρ'), ja: any('緩'), 'zh-CN': any('松弛|松动'), ko: any('느슨'),
      ar: any('الركود|ركود|مرتخ'), hi: any('ढीले|ढीला'),
    },
  },
  {
    id: 'flooding-land-flood',
    label: 'flooding of the hull rendered as a flood over land',
    src: /\bflood(?:ing|ed)\b|downflood|su alma|su basma/iu,
    wrong: {
      de: s('überschwemm|hochwasser'), nl: s('overstrom|overstroom'), it: s('inondazion|alluvion'),
      sv: s('översvämm'), no: s('oversvøm|flom(?!\\p{L})'), da: s('oversvøm'), pl: s('powod|powódź'),
      cs: s('povod'), hu: s('árvíz'), ru: s('наводнен'), uk: s('повін|повен'), bg: s('наводнен'),
      el: s('πλημμύρ'), ja: any('洪水|氾濫'), 'zh-CN': any('洪水|洪涝|水灾'), ko: any('범람|홍수'),
      ar: any('فيضان'), hi: any('बाढ़'),
    },
    right: {
      de: s('flut|geflutet|wassereinbruch|wassereintritt|überflut'), nl: s('vollop|volgelopen|ondergelopen|lek|binnendring'),
      sv: s('vattenfyll|vatteninträng|läck'), no: s('vannfyll|vanninntreng|lekk'), da: s('vandfyld|vandindtræng|læk'),
      ja: any('浸水'), 'zh-CN': any('进水'), ko: any('침수'),
    },
  },
  {
    id: 'list-enumeration',
    label: 'list (heel of the ship) rendered as a list of items',
    src: /\b(?:trim|heel(?:ing)?)\s*(?:and|or|\/|ve|veya|,)\s*list\b|\blist\s*(?:and|or|\/|ve|veya|,)\s*(?:trim|heel)|\blist(?:s|ing|ed)?\s+(?:to|of)\s+(?:port|starboard|\d)|\b(?:angle|degrees?)\s+of\s+list\b|\blist\s+angle\b|\bpermanent\s+list\b|\blist\s+correction\b|\blist\s+(?:düzelt|açısı|kontrol)/iu,
    wrong: {
      de: s('liste'), nl: s('lijst'), fr: s('liste'), es: w('lista|listas|listado'), it: s('elenco|lista'),
      pt: s('lista'), cs: s('seznam'), pl: w('lista|listy|listę|wykaz'), ru: s('список'), uk: s('список'),
      bg: s('списък'), el: s('λίστα|κατάλογ'), sv: s('lista'), no: s('liste'), da: s('liste'), fi: s('lista|luettelo'),
      hu: s('lista|listá'), ro: s('listă|lista|listei'), ja: any('リスト|一覧'), 'zh-CN': any('列表|清单'),
      ko: any('목록|리스트'), ar: any('قائمة'), hi: any('सूची'),
    },
    right: {
      de: s('schlagseite|krängung'), nl: s('slagzij'), fr: s('gîte|bande'), es: s('escora'), it: s('sbandament'),
      pt: s('adernament|banda'), cs: s('náklon'), pl: s('przechył'), ru: s('крен'), uk: s('крен'), bg: s('крен'),
      sv: s('slagsida'), no: s('slagside'), da: s('slagside'),
    },
  },
  {
    id: 'ships-head-body',
    label: "ship's head (heading, bow) rendered as a body part or a boatman",
    src: /\bship['’]?s head\b|\bhead of the (?:ship|vessel)\b/iu,
    wrong: {
      de: s('kopf'), fr: w('tête'), es: s('cabeza'), it: s('testa'), pt: s('cabeça'), nl: w('hoofd'),
      ru: s('голов'), uk: s('голов'), pl: s('głow'), cs: s('hlav'), sv: s('huvud'), no: s('hode'),
      da: s('hoved'), hu: s('fej'), el: s('κεφάλ'), bg: s('глав'), ja: any('船頭|頭'), ko: any('머리'),
      'zh-CN': any('头部|脑袋'), ar: any('رأس'), hi: any('सिर'),
    },
  },
  {
    id: 'yuzme-swimming',
    label: 'yüzme (flotation of a ship) rendered as swimming',
    src: /(?<!\p{L})yüzme(?:si|nin|ye|de)?(?!\p{L})|yüzebilirlik|yüzdürme/iu,
    // People swimming (pools, survival in the water) is really swimming.
    skipSrc: /havuz|ısı kayb|hipotermi|yüzme bil|yüzerek|yüzme hız|sadece yüzme|kazazede|insan|kişi|can yele|denize atla/iu,
    wrong: {
      en: w('swimming|swim'), nl: s('zwem'), fr: s('nage|nager|natation'), es: s('nadar|natación|nado'),
      it: s('nuot'), pt: s('nadar|natação|nado'), sv: s('simning|simma'), no: s('svømm'), da: s('svømn|svømme'),
      fi: s('uinti|uida|uimi'), ro: s('înot'), el: s('κολύμβ|κολυμπ'), bg: s('плуване'), ja: any('水泳|泳'),
      'zh-CN': any('游泳'), ko: any('수영'), ar: any('السباحة|سباحة'), hi: any('तैराकी|तैरना'),
    },
  },
  {
    id: 'heel-capsize',
    label: 'heel (list of the ship) rendered as capsizing or turning off course',
    src: /\bheel(?:s|ing|ed)?\b(?!\s*(?:bolt|block|piece|pin))|yana yatma|meyil/iu,
    skipSrc: /capsiz|alabora|devril/iu,
    wrong: {
      hi: any('पलट|उलट'), ar: any('ينقلب|انقلاب|تنقلب|تنحرف|ينحرف'),
    },
  },
);

const DEFAULT_LANGS = [
  'ar', 'bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr', 'hi', 'hu',
  'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'uk', 'zh-CN',
];
export const SENSE_ERROR_LANGS = DEFAULT_LANGS;

/**
 * Returns the ids of the sense-error rules that fire for one entry.
 * @param {string} source dictionary key (Turkish or English source string)
 * @param {string} value  translation shipped for `lang`
 * @param {string} lang
 */
export function findSenseErrors(source, value, lang) {
  if (typeof value !== 'string' || !value) return [];
  // JS case-insensitive matching does not fold Turkish "İ" to "i".
  const folded = source.replace(/İ/g, 'i');
  const hits = [];
  for (const rule of SENSE_ERROR_RULES) {
    const wrong = rule.wrong[lang];
    if (!wrong || !rule.src.test(folded)) continue;
    if (rule.skipSrc && rule.skipSrc.test(folded)) continue;
    if (!wrong.test(value)) continue;
    // The everyday word is in the source too (an English source, or an
    // English gloss in a Turkish source, that really says it): not a
    // mistranslation.
    if (rule.checkSource !== false && wrong.test(source)) continue;
    const right = rule.right?.[lang];
    if (right && right.test(value)) continue;
    hits.push(rule.id);
  }
  return hits;
}

// Words that can only be Turkish (dotless ı, ğ, capital İ).
const TURKISH_WORD = /(?<!\p{L})\p{L}*[ıİğĞ]\p{L}*(?!\p{L})/gu;

/**
 * Turkish words left in a translation. Words that the English text also keeps
 * (the Turkish letters Ğ and İ in the Morse lessons, a Turkish knot name
 * quoted on purpose) are not leftovers.
 * @param {string} value translation
 * @param {string} [enValue] the English text of the same entry
 */
export function findTurkishLeftovers(value, enValue = '') {
  if (typeof value !== 'string') return [];
  const kept = new Set((enValue.match(TURKISH_WORD) ?? []).map((x) => x.toLocaleLowerCase('tr')));
  return (value.match(TURKISH_WORD) ?? []).filter((x) => !kept.has(x.toLocaleLowerCase('tr')));
}

/**
 * Every wrong-sense rule id plus "turkish-leftover" for one entry.
 * @param {string} source
 * @param {string} value
 * @param {string} lang
 * @param {string} [enValue] English text of the entry (for the leftover check)
 */
export function findTranslationDefects(source, value, lang, enValue) {
  const hits = findSenseErrors(source, value, lang);
  if (lang !== 'en' && findTurkishLeftovers(value, enValue).length) hits.push('turkish-leftover');
  return hits;
}

