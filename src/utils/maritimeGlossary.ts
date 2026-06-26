// Maritime terminology glossary
// -----------------------------------------------------------------------------
// The application content is authored in Turkish (the translation source
// language) and rendered in 25 languages through machine translation.
// Generic machine translation does NOT understand maritime context, so
// nautical terms get mistranslated (e.g. "Sancak" -> "Banner" instead of
// "Starboard", "Kıç" -> a vulgar literal word instead of "Stern",
// "İskele Tarafı" -> "Pier side" instead of "Port side").
//
// This module provides a curated, deterministic override layer so that the
// core maritime vocabulary is always rendered with the correct professional
// terminology — including English and the other major maritime languages.
//
// Only well-established, unambiguous nautical equivalents are listed. When a
// language is not provided for a term, the app gracefully falls back to the
// normal machine translation for that language. Ambiguous Turkish words
// (e.g. bare "İskele" = pier/scaffold, "Sancak" = flag/province) are only
// listed as the unambiguous maritime phrase to avoid wrong overrides.
// -----------------------------------------------------------------------------

export interface MaritimeTerm {
  /** Canonical Turkish source term (as authored in the UI). */
  tr: string;
  /** Alternative Turkish spellings/forms that should map to the same term. */
  aliases?: string[];
  /**
   * Professional maritime translation per language code.
   * Turkish ("tr") is the source and therefore never overridden.
   */
  translations: Partial<Record<string, string>>;
  /**
   * When `false`, this term is NOT used for in-text (inline) replacement of
   * leftover Turkish words inside longer translated strings — only for exact
   * whole-string overrides. Use it for Turkish words that also carry a common
   * non-maritime meaning (e.g. "Baca" = chimney, "Akıntı" = flow) to avoid
   * false positives. Defaults to `true`.
   */
  inline?: boolean;
}

// Languages we provide hand-verified maritime equivalents for.
// Order is irrelevant; missing entries fall back to machine translation.
export const maritimeTerms: MaritimeTerm[] = [
  // ── Ship sides & ends ──────────────────────────────────────────────
  {
    tr: 'İskele Tarafı',
    aliases: ['İskele tarafı', 'İskele Bordası'],
    translations: {
      en: 'Port side', de: 'Backbordseite', fr: 'Bâbord', es: 'Babor',
      it: 'Babordo', pt: 'Bombordo', nl: 'Bakboord', ru: 'Левый борт',
      ja: '左舷', ko: '좌현', 'zh-CN': '左舷', ar: 'جانب الميسرة', hi: 'वाम पार्श्व',
      sv: 'Babord', no: 'Babord', da: 'Bagbord', fi: 'Paapuuri', pl: 'Lewa burta',
      cs: 'Levobok', hu: 'Bal oldal', ro: 'Babord', el: 'Αριστερή πλευρά', bg: 'Ляв борд',
      uk: 'Лівий борт',
    },
  },
  {
    tr: 'Sancak Tarafı',
    aliases: ['Sancak tarafı', 'Sancak Bordası'],
    translations: {
      en: 'Starboard side', de: 'Steuerbordseite', fr: 'Tribord', es: 'Estribor',
      it: 'Tribordo', pt: 'Estibordo', nl: 'Stuurboord', ru: 'Правый борт',
      ja: '右舷', ko: '우현', 'zh-CN': '右舷', ar: 'جانب الميمنة', hi: 'दक्षिण पार्श्व',
      sv: 'Styrbord', no: 'Styrbord', da: 'Styrbord', fi: 'Tyyrpuuri', pl: 'Prawa burta',
      cs: 'Pravobok', hu: 'Jobb oldal', ro: 'Tribord', el: 'Δεξιά πλευρά', bg: 'Десен борд',
      uk: 'Правий борт',
    },
  },
  {
    tr: 'Pruva',
    aliases: ['Baş', 'Baş Taraf', 'Pruva (Baş)'],
    translations: {
      en: 'Bow', de: 'Bug', fr: 'Proue', es: 'Proa',
      it: 'Prua', pt: 'Proa', nl: 'Boeg', ru: 'Нос',
      ja: '船首', ko: '선수', 'zh-CN': '船首', ar: 'مقدمة السفينة', hi: 'अग्रभाग',
      sv: 'Bog', no: 'Baug', da: 'Bov', fi: 'Keula', pl: 'Dziób',
      cs: 'Příď', hu: 'Hajóorr', ro: 'Proră', el: 'Πλώρη', bg: 'Нос',
      uk: 'Ніс',
    },
  },
  {
    tr: 'Kıç',
    aliases: ['Kıç Taraf', 'Pupa'],
    translations: {
      en: 'Stern', de: 'Heck', fr: 'Poupe', es: 'Popa',
      it: 'Poppa', pt: 'Popa', nl: 'Achtersteven', ru: 'Корма',
      ja: '船尾', ko: '선미', 'zh-CN': '船尾', ar: 'مؤخرة السفينة', hi: 'पिछला भाग',
      sv: 'Akter', no: 'Akter', da: 'Agter', fi: 'Perä', pl: 'Rufa',
      cs: 'Záď', hu: 'Hajófar', ro: 'Pupă', el: 'Πρύμη', bg: 'Кърма',
      uk: 'Корма',
    },
  },
  {
    tr: 'Borda',
    translations: {
      en: "Ship's side", de: 'Bordwand', fr: 'Bordé', es: 'Costado',
      it: 'Murata', pt: 'Costado', nl: 'Boordwand', ru: 'Борт',
      ja: '舷側', ko: '현측', 'zh-CN': '舷侧', ar: 'جانب السفينة', sv: 'Bordläggning',
      no: 'Bordlegging', da: 'Skibsside', fi: 'Laita', pl: 'Burta', cs: 'Bok lodi',
      hu: 'Hajóoldal', ro: 'Bordaj', el: 'Πλευρά πλοίου', bg: 'Борд', uk: 'Борт',
    },
  },

  // ── Structure ──────────────────────────────────────────────────────
  {
    tr: 'Omurga',
    aliases: ['Omurga (Keel)'],
    translations: {
      en: 'Keel', de: 'Kiel', fr: 'Quille', es: 'Quilla',
      it: 'Chiglia', pt: 'Quilha', nl: 'Kiel', ru: 'Киль',
      ja: '竜骨', ko: '용골', 'zh-CN': '龙骨', ar: 'عارضة القاع', sv: 'Köl',
      no: 'Kjøl', da: 'Køl', fi: 'Köli', pl: 'Stępka', cs: 'Kýl',
      hu: 'Hajógerinc', ro: 'Chilă', el: 'Καρίνα', bg: 'Кил', uk: 'Кіль',
    },
  },
  {
    tr: 'Güverte',
    aliases: ['Güverte (Deck)'],
    translations: {
      en: 'Deck', de: 'Deck', fr: 'Pont', es: 'Cubierta',
      it: 'Coperta', pt: 'Convés', nl: 'Dek', ru: 'Палуба',
      ja: '甲板', ko: '갑판', 'zh-CN': '甲板', ar: 'سطح السفينة', hi: 'डेक',
      sv: 'Däck', no: 'Dekk', da: 'Dæk', fi: 'Kansi', pl: 'Pokład',
      cs: 'Paluba', hu: 'Fedélzet', ro: 'Punte', el: 'Κατάστρωμα', bg: 'Палуба',
      uk: 'Палуба',
    },
  },
  {
    tr: 'Ambar',
    aliases: ['Ambar (Hold)', 'Yük Ambarı'],
    translations: {
      en: 'Cargo hold', de: 'Laderaum', fr: 'Cale', es: 'Bodega',
      it: 'Stiva', pt: 'Porão de carga', nl: 'Ruim', ru: 'Трюм',
      ja: '船倉', ko: '선창', 'zh-CN': '货舱', ar: 'عنبر الشحن', sv: 'Lastrum',
      no: 'Lasterom', da: 'Lastrum', fi: 'Lastiruuma', pl: 'Ładownia', cs: 'Nákladový prostor',
      hu: 'Raktér', ro: 'Cală', el: 'Αμπάρι', bg: 'Хамбар', uk: 'Вантажний трюм',
    },
  },
  {
    tr: 'Sintine',
    aliases: ['Sintine (Bilge)'],
    translations: {
      en: 'Bilge', de: 'Bilge', fr: 'Sentine', es: 'Sentina',
      it: 'Sentina', pt: 'Sentina', nl: 'Bilge', ru: 'Льяло',
      ja: 'ビルジ', ko: '빌지', 'zh-CN': '舱底', ar: 'قعر السفينة', sv: 'Slagvatten',
      no: 'Slagvann', da: 'Slagvand', fi: 'Pilssi', pl: 'Zęza', cs: 'Stoka',
      hu: 'Fenékvíz', ro: 'Santină', el: 'Σεντίνα', bg: 'Сантина', uk: 'Лляло',
    },
  },
  {
    tr: 'Baca',
    aliases: ['Baca (Funnel)'],
    // "Baca" also means a household chimney; restrict to whole-string overrides.
    inline: false,
    translations: {
      en: 'Funnel', de: 'Schornstein', fr: 'Cheminée', es: 'Chimenea',
      it: 'Fumaiolo', pt: 'Chaminé', nl: 'Schoorsteen', ru: 'Дымовая труба',
      ja: '煙突', ko: '연돌', 'zh-CN': '烟囱', ar: 'مدخنة السفينة', sv: 'Skorsten',
      no: 'Skorstein', da: 'Skorsten', fi: 'Savupiippu', pl: 'Komin', cs: 'Komín',
      hu: 'Kémény', ro: 'Coș de fum', el: 'Φουγάρο', bg: 'Комин', uk: 'Димова труба',
    },
  },
  {
    tr: 'Köprüüstü',
    aliases: ['Köprü Üstü', 'Köprüüstü (Bridge)', 'Kaptan Köşkü'],
    translations: {
      en: 'Bridge', de: 'Brücke', fr: 'Passerelle', es: 'Puente',
      it: 'Plancia', pt: 'Ponte de comando', nl: 'Brug', ru: 'Ходовой мостик',
      ja: '船橋', ko: '선교', 'zh-CN': '驾驶台', ar: 'جسر القيادة', sv: 'Brygga',
      no: 'Bro', da: 'Bro', fi: 'Komentosilta', pl: 'Mostek', cs: 'Můstek',
      hu: 'Parancsnoki híd', ro: 'Punte de comandă', el: 'Γέφυρα', bg: 'Мостик', uk: 'Місток',
    },
  },
  {
    tr: 'Fribord',
    aliases: ['Fribord (Freeboard)'],
    translations: {
      en: 'Freeboard', de: 'Freibord', fr: 'Franc-bord', es: 'Francobordo',
      it: 'Bordo libero', pt: 'Borda livre', nl: 'Vrijboord', ru: 'Надводный борт',
      ja: '乾舷', ko: '건현', 'zh-CN': '干舷', ar: 'الشاهي', sv: 'Fribord',
      no: 'Fribord', da: 'Fribord', fi: 'Varalaita', pl: 'Wolna burta', cs: 'Volný bok',
      hu: 'Szabadoldal', ro: 'Bord liber', el: 'Ύφαλο', bg: 'Надводен борд', uk: 'Надводний борт',
    },
  },

  // ── Steering & propulsion ──────────────────────────────────────────
  {
    tr: 'Dümen',
    translations: {
      en: 'Rudder', de: 'Ruder', fr: 'Gouvernail', es: 'Timón',
      it: 'Timone', pt: 'Leme', nl: 'Roer', ru: 'Руль',
      ja: '舵', ko: '타', 'zh-CN': '舵', ar: 'دفة', hi: 'पतवार',
      sv: 'Roder', no: 'Ror', da: 'Ror', fi: 'Peräsin', pl: 'Ster',
      cs: 'Kormidlo', hu: 'Kormánylapát', ro: 'Cârmă', el: 'Πηδάλιο', bg: 'Кормило',
      uk: 'Стерно',
    },
  },
  {
    tr: 'Pervane',
    translations: {
      en: 'Propeller', de: 'Schiffsschraube', fr: 'Hélice', es: 'Hélice',
      it: 'Elica', pt: 'Hélice', nl: 'Schroef', ru: 'Гребной винт',
      ja: 'スクリュープロペラ', ko: '프로펠러', 'zh-CN': '螺旋桨', ar: 'مروحة دافعة', hi: 'प्रोपेलर',
      sv: 'Propeller', no: 'Propell', da: 'Skrue', fi: 'Potkuri', pl: 'Śruba napędowa',
      cs: 'Lodní šroub', hu: 'Hajócsavar', ro: 'Elice', el: 'Έλικας', bg: 'Витло',
      uk: 'Гребний гвинт',
    },
  },

  // ── Anchoring & mooring ────────────────────────────────────────────
  {
    tr: 'Çapa',
    aliases: ['Demir (Çapa)', 'Çıpa', 'Çıpa (Anchor)'],
    translations: {
      en: 'Anchor', de: 'Anker', fr: 'Ancre', es: 'Ancla',
      it: 'Àncora', pt: 'Âncora', nl: 'Anker', ru: 'Якорь',
      ja: '錨', ko: '닻', 'zh-CN': '锚', ar: 'مرساة', hi: 'लंगर',
      sv: 'Ankare', no: 'Anker', da: 'Anker', fi: 'Ankkuri', pl: 'Kotwica',
      cs: 'Kotva', hu: 'Horgony', ro: 'Ancoră', el: 'Άγκυρα', bg: 'Котва',
      uk: 'Якір',
    },
  },
  {
    tr: 'Demir Atmak',
    aliases: ['Demir atmak'],
    translations: {
      en: 'Drop anchor', de: 'Anker werfen', fr: 'Mouiller', es: 'Fondear',
      it: 'Dare fondo', pt: 'Fundear', nl: 'Ankeren', ru: 'Отдать якорь',
      ja: '投錨', ko: '투묘', 'zh-CN': '抛锚', ar: 'إرساء المرساة', hi: 'लंगर डालना',
      sv: 'Ankra', no: 'Ankre', da: 'Ankre', fi: 'Ankkuroida', pl: 'Rzucić kotwicę',
      cs: 'Spustit kotvu', hu: 'Horgonyt vetni', ro: 'A ancora', el: 'Αγκυροβολώ', bg: 'Хвърлям котва',
      uk: 'Кинути якір',
    },
  },
  {
    tr: 'Demir Almak',
    aliases: ['Demir almak'],
    translations: {
      en: 'Weigh anchor', de: 'Anker lichten', fr: 'Lever l’ancre', es: 'Levar anclas',
      it: 'Salpare', pt: 'Levantar ferro', nl: 'Anker lichten', ru: 'Сняться с якоря',
      ja: '抜錨', ko: '양묘', 'zh-CN': '起锚', ar: 'رفع المرساة', hi: 'लंगर उठाना',
      sv: 'Lätta ankar', no: 'Lette anker', da: 'Lette anker', fi: 'Nostaa ankkuri', pl: 'Podnieść kotwicę',
      cs: 'Zvednout kotvu', hu: 'Horgonyt felszedni', ro: 'A ridica ancora', el: 'Αποπλέω', bg: 'Вдигам котва',
      uk: 'Знятися з якоря',
    },
  },
  {
    tr: 'Çıma',
    translations: {
      en: 'Mooring line', de: 'Festmacherleine', fr: 'Aussière', es: 'Cabo de amarre',
      it: 'Cima d’ormeggio', pt: 'Cabo de amarração', nl: 'Meertros', ru: 'Швартов',
      ja: '係船索', ko: '계류삭', 'zh-CN': '系泊缆', ar: 'حبل الإرساء', sv: 'Förtöjningslina',
      no: 'Fortøyningsline', da: 'Fortøjning', fi: 'Kiinnitysköysi', pl: 'Cuma', cs: 'Vyvazovací lano',
      hu: 'Kikötőkötél', ro: 'Parâmă de legare', el: 'Κάβος', bg: 'Швартов', uk: 'Швартов',
    },
  },
  {
    tr: 'Halat',
    translations: {
      en: 'Line', de: 'Leine', fr: 'Cordage', es: 'Cabo',
      it: 'Cima', pt: 'Cabo', nl: 'Lijn', ru: 'Трос',
      ja: 'ロープ', ko: '로프', 'zh-CN': '缆绳', ar: 'حبل', hi: 'रस्सा',
      sv: 'Lina', no: 'Line', da: 'Line', fi: 'Köysi', pl: 'Lina',
      cs: 'Lano', hu: 'Kötél', ro: 'Parâmă', el: 'Σκοινί', bg: 'Въже',
      uk: 'Трос',
    },
  },
  {
    tr: 'Şamandıra',
    translations: {
      en: 'Buoy', de: 'Boje', fr: 'Bouée', es: 'Boya',
      it: 'Boa', pt: 'Boia', nl: 'Boei', ru: 'Буй',
      ja: 'ブイ', ko: '부표', 'zh-CN': '浮标', ar: 'عوامة', hi: 'प्लव',
      sv: 'Boj', no: 'Bøye', da: 'Bøje', fi: 'Poiju', pl: 'Boja',
      cs: 'Bóje', hu: 'Bója', ro: 'Geamandură', el: 'Σημαδούρα', bg: 'Шамандура',
      uk: 'Буй',
    },
  },

  // ── Navigation ─────────────────────────────────────────────────────
  {
    tr: 'Seyir',
    translations: {
      en: 'Navigation', de: 'Navigation', fr: 'Navigation', es: 'Navegación',
      it: 'Navigazione', pt: 'Navegação', nl: 'Navigatie', ru: 'Судовождение',
      ja: '航海', ko: '항해', 'zh-CN': '航行', ar: 'ملاحة', hi: 'नौवहन',
      sv: 'Navigation', no: 'Navigasjon', da: 'Navigation', fi: 'Navigointi', pl: 'Nawigacja',
      cs: 'Navigace', hu: 'Navigáció', ro: 'Navigație', el: 'Ναυσιπλοΐα', bg: 'Корабоводене',
      uk: 'Судноводіння',
    },
  },
  {
    tr: 'Rota',
    translations: {
      en: 'Course', de: 'Kurs', fr: 'Cap', es: 'Rumbo',
      it: 'Rotta', pt: 'Rumo', nl: 'Koers', ru: 'Курс',
      ja: '針路', ko: '침로', 'zh-CN': '航向', ar: 'مسار', hi: 'मार्ग',
      sv: 'Kurs', no: 'Kurs', da: 'Kurs', fi: 'Suunta', pl: 'Kurs',
      cs: 'Kurz', hu: 'Irány', ro: 'Drum', el: 'Πορεία', bg: 'Курс',
      uk: 'Курс',
    },
  },
  {
    tr: 'Pusula',
    translations: {
      en: 'Compass', de: 'Kompass', fr: 'Compas', es: 'Compás',
      it: 'Bussola', pt: 'Bússola', nl: 'Kompas', ru: 'Компас',
      ja: 'コンパス', ko: '나침반', 'zh-CN': '罗经', ar: 'بوصلة', hi: 'दिक्सूचक',
      sv: 'Kompass', no: 'Kompass', da: 'Kompas', fi: 'Kompassi', pl: 'Kompas',
      cs: 'Kompas', hu: 'Iránytű', ro: 'Busolă', el: 'Πυξίδα', bg: 'Компас',
      uk: 'Компас',
    },
  },
  {
    tr: 'Kerteriz',
    translations: {
      en: 'Bearing', de: 'Peilung', fr: 'Relèvement', es: 'Marcación',
      it: 'Rilevamento', pt: 'Marcação', nl: 'Peiling', ru: 'Пеленг',
      ja: '方位', ko: '방위', 'zh-CN': '方位', ar: 'اتجاه', sv: 'Bäring',
      no: 'Peiling', da: 'Pejling', fi: 'Suuntima', pl: 'Namiar', cs: 'Náměr',
      hu: 'Irányszög', ro: 'Relevment', el: 'Διόπτευση', bg: 'Пеленг', uk: 'Пеленг',
    },
  },
  {
    tr: 'Mevki',
    aliases: ['Konum (Mevki)'],
    translations: {
      en: 'Position', de: 'Position', fr: 'Position', es: 'Situación',
      it: 'Posizione', pt: 'Posição', nl: 'Positie', ru: 'Местоположение',
      ja: '船位', ko: '선위', 'zh-CN': '船位', ar: 'موقع', hi: 'स्थिति',
      sv: 'Position', no: 'Posisjon', da: 'Position', fi: 'Sijainti', pl: 'Pozycja',
      cs: 'Pozice', hu: 'Pozíció', ro: 'Poziție', el: 'Στίγμα', bg: 'Местоположение',
      uk: 'Місцезнаходження',
    },
  },
  {
    tr: 'Manevra',
    translations: {
      en: 'Maneuver', de: 'Manöver', fr: 'Manœuvre', es: 'Maniobra',
      it: 'Manovra', pt: 'Manobra', nl: 'Manoeuvre', ru: 'Манёвр',
      ja: '操船', ko: '조선', 'zh-CN': '操纵', ar: 'مناورة', hi: 'पैंतरेबाज़ी',
      sv: 'Manöver', no: 'Manøver', da: 'Manøvre', fi: 'Ohjailu', pl: 'Manewr',
      cs: 'Manévr', hu: 'Manőver', ro: 'Manevră', el: 'Ελιγμός', bg: 'Маневра',
      uk: 'Маневр',
    },
  },
  {
    tr: 'Deniz Feneri',
    aliases: ['Deniz feneri'],
    translations: {
      en: 'Lighthouse', de: 'Leuchtturm', fr: 'Phare', es: 'Faro',
      it: 'Faro', pt: 'Farol', nl: 'Vuurtoren', ru: 'Маяк',
      ja: '灯台', ko: '등대', 'zh-CN': '灯塔', ar: 'منارة', hi: 'प्रकाश-स्तंभ',
      sv: 'Fyr', no: 'Fyr', da: 'Fyr', fi: 'Majakka', pl: 'Latarnia morska',
      cs: 'Maják', hu: 'Világítótorony', ro: 'Far', el: 'Φάρος', bg: 'Морски фар',
      uk: 'Маяк',
    },
  },
  {
    tr: 'Seyir Feneri',
    aliases: ['Seyir feneri', 'Borda Feneri', 'Borda feneri'],
    translations: {
      en: 'Navigation light', de: 'Positionslaterne', fr: 'Feu de navigation',
      es: 'Luz de navegación', it: 'Fanale di navigazione',
      pt: 'Luz de navegação', nl: 'Navigatielicht', ru: 'Ходовой огонь',
      ja: '航海灯', ko: '항해등', 'zh-CN': '航行灯', ar: 'ضوء ملاحي', sv: 'Lanterna',
      no: 'Lanterne', da: 'Lanterne', fi: 'Kulkuvalo', pl: 'Światło nawigacyjne', cs: 'Navigační světlo',
      hu: 'Helyzetjelző fény', ro: 'Lumină de navigație', el: 'Φανός ναυσιπλοΐας', bg: 'Навигационна светлина', uk: 'Ходовий вогонь',
    },
  },

  // ── Watches & crew ─────────────────────────────────────────────────
  {
    tr: 'Vardiya',
    translations: {
      en: 'Watch', de: 'Wache', fr: 'Quart', es: 'Guardia',
      it: 'Guardia', pt: 'Quarto de serviço', nl: 'Wacht', ru: 'Вахта',
      ja: '当直', ko: '당직', 'zh-CN': '值班', ar: 'نوبة المراقبة', sv: 'Vakt',
      no: 'Vakt', da: 'Vagt', fi: 'Vahti', pl: 'Wachta', cs: 'Hlídka',
      hu: 'Őrség', ro: 'Cart', el: 'Βάρδια', bg: 'Вахта', uk: 'Вахта',
    },
  },
  {
    tr: 'Mürettebat',
    translations: {
      en: 'Crew', de: 'Besatzung', fr: 'Équipage', es: 'Tripulación',
      it: 'Equipaggio', pt: 'Tripulação', nl: 'Bemanning', ru: 'Экипаж',
      ja: '乗組員', ko: '승무원', 'zh-CN': '船员', ar: 'طاقم', hi: 'चालक दल',
      sv: 'Besättning', no: 'Mannskap', da: 'Besætning', fi: 'Miehistö', pl: 'Załoga',
      cs: 'Posádka', hu: 'Legénység', ro: 'Echipaj', el: 'Πλήρωμα', bg: 'Екипаж',
      uk: 'Екіпаж',
    },
  },
  {
    tr: 'Kaptan',
    translations: {
      en: 'Master', de: 'Kapitän', fr: 'Capitaine', es: 'Capitán',
      it: 'Comandante', pt: 'Comandante', nl: 'Kapitein', ru: 'Капитан',
      ja: '船長', ko: '선장', 'zh-CN': '船长', ar: 'ربان', hi: 'कप्तान',
      sv: 'Befälhavare', no: 'Skipsfører', da: 'Skibsfører', fi: 'Päällikkö', pl: 'Kapitan',
      cs: 'Kapitán', hu: 'Kapitány', ro: 'Comandant', el: 'Πλοίαρχος', bg: 'Капитан',
      uk: 'Капітан',
    },
  },
  {
    tr: 'Lostromo',
    aliases: ['Lostromo (Bosun)'],
    translations: {
      en: 'Boatswain', de: 'Bootsmann', fr: 'Maître d’équipage', es: 'Contramaestre',
      it: 'Nostromo', pt: 'Contramestre', nl: 'Bootsman', ru: 'Боцман',
      ja: '甲板長', ko: '갑판장', 'zh-CN': '水手长', ar: 'رئيس البحارة', sv: 'Båtsman',
      no: 'Båtsmann', da: 'Bådsmand', fi: 'Pursimies', pl: 'Bosman', cs: 'Lodní mistr',
      hu: 'Fedélzetmester', ro: 'Șef de echipaj', el: 'Λοστρόμος', bg: 'Боцман', uk: 'Боцман',
    },
  },

  // ── Safety equipment ───────────────────────────────────────────────
  {
    tr: 'Filika',
    aliases: ['Cankurtaran Filikası'],
    translations: {
      en: 'Lifeboat', de: 'Rettungsboot', fr: 'Canot de sauvetage',
      es: 'Bote salvavidas', it: 'Scialuppa di salvataggio',
      pt: 'Barco salva-vidas', nl: 'Reddingsboot', ru: 'Спасательная шлюпка',
      ja: '救命艇', ko: '구명정', 'zh-CN': '救生艇', ar: 'قارب النجاة', hi: 'जीवन-नौका',
      sv: 'Livbåt', no: 'Livbåt', da: 'Redningsbåd', fi: 'Pelastusvene', pl: 'Łódź ratunkowa',
      cs: 'Záchranný člun', hu: 'Mentőcsónak', ro: 'Barcă de salvare', el: 'Σωσίβια λέμβος', bg: 'Спасителна лодка',
      uk: 'Рятувальна шлюпка',
    },
  },
  {
    tr: 'Can Simidi',
    aliases: ['Can simidi', 'Cankurtaran Simidi'],
    translations: {
      en: 'Lifebuoy', de: 'Rettungsring', fr: 'Bouée de sauvetage',
      es: 'Aro salvavidas', it: 'Salvagente anulare',
      pt: 'Boia salva-vidas', nl: 'Reddingsboei', ru: 'Спасательный круг',
      ja: '救命浮環', ko: '구명부환', 'zh-CN': '救生圈', ar: 'طوق النجاة', hi: 'जीवन-रक्षक छल्ला',
      sv: 'Livboj', no: 'Livbøye', da: 'Redningskrans', fi: 'Pelastusrengas', pl: 'Koło ratunkowe',
      cs: 'Záchranný kruh', hu: 'Mentőöv', ro: 'Colac de salvare', el: 'Σωσίβιο κυκλικό', bg: 'Спасителен пояс',
      uk: 'Рятувальний круг',
    },
  },
  {
    tr: 'Can Yeleği',
    aliases: ['Can yeleği'],
    translations: {
      en: 'Lifejacket', de: 'Rettungsweste', fr: 'Gilet de sauvetage',
      es: 'Chaleco salvavidas', it: 'Giubbotto di salvataggio',
      pt: 'Colete salva-vidas', nl: 'Reddingsvest', ru: 'Спасательный жилет',
      ja: '救命胴衣', ko: '구명조끼', 'zh-CN': '救生衣', ar: 'سترة النجاة', hi: 'जीवन-रक्षक जैकेट',
      sv: 'Flytväst', no: 'Redningsvest', da: 'Redningsvest', fi: 'Pelastusliivi', pl: 'Kamizelka ratunkowa',
      cs: 'Záchranná vesta', hu: 'Mentőmellény', ro: 'Vestă de salvare', el: 'Σωσίβιο γιλέκο', bg: 'Спасителна жилетка',
      uk: 'Рятувальний жилет',
    },
  },

  // ── Stability & hydrostatics ───────────────────────────────────────
  {
    tr: 'Su Çekimi',
    aliases: ['Su çekimi', 'Draft', 'Draft (Su Çekimi)'],
    translations: {
      en: 'Draft', de: 'Tiefgang', fr: 'Tirant d’eau', es: 'Calado',
      it: 'Pescaggio', pt: 'Calado', nl: 'Diepgang', ru: 'Осадка',
      ja: '喫水', ko: '흘수', 'zh-CN': '吃水', ar: 'غاطس', hi: 'ड्राफ्ट',
      sv: 'Djupgående', no: 'Dypgang', da: 'Dybgang', fi: 'Syväys', pl: 'Zanurzenie',
      cs: 'Ponor', hu: 'Merülés', ro: 'Pescaj', el: 'Βύθισμα', bg: 'Газене',
      uk: 'Осадка',
    },
  },
  {
    tr: 'Deplasman',
    translations: {
      en: 'Displacement', de: 'Verdrängung', fr: 'Déplacement', es: 'Desplazamiento',
      it: 'Dislocamento', pt: 'Deslocamento', nl: 'Waterverplaatsing', ru: 'Водоизмещение',
      ja: '排水量', ko: '배수량', 'zh-CN': '排水量', ar: 'إزاحة', sv: 'Deplacement',
      no: 'Deplasement', da: 'Deplacement', fi: 'Uppouma', pl: 'Wyporność', cs: 'Výtlak',
      hu: 'Vízkiszorítás', ro: 'Deplasament', el: 'Εκτόπισμα', bg: 'Водоизместване', uk: 'Водотоннажність',
    },
  },
  {
    tr: 'Stabilite',
    translations: {
      en: 'Stability', de: 'Stabilität', fr: 'Stabilité', es: 'Estabilidad',
      it: 'Stabilità', pt: 'Estabilidade', nl: 'Stabiliteit', ru: 'Остойчивость',
      ja: '復原性', ko: '복원성', 'zh-CN': '稳性', ar: 'اتزان', sv: 'Stabilitet',
      no: 'Stabilitet', da: 'Stabilitet', fi: 'Vakavuus', pl: 'Stateczność', cs: 'Stabilita',
      hu: 'Stabilitás', ro: 'Stabilitate', el: 'Ευστάθεια', bg: 'Устойчивост', uk: 'Остійність',
    },
  },
  {
    tr: 'Meyil',
    aliases: ['Bayılma'],
    // Generic Turkish "meyil" = slope/inclination; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Heel', de: 'Krängung', fr: 'Gîte', es: 'Escora',
      it: 'Sbandamento', pt: 'Adernamento', nl: 'Slagzij', ru: 'Крен',
      ja: '横傾斜', ko: '경사', 'zh-CN': '横倾', ar: 'ميل', sv: 'Krängning',
      no: 'Krenging', da: 'Krængning', fi: 'Kallistuma', pl: 'Przechył', cs: 'Náklon',
      hu: 'Megdőlés', ro: 'Bandare', el: 'Κλίση', bg: 'Крен', uk: 'Крен',
    },
  },

  // ── Environment ────────────────────────────────────────────────────
  {
    tr: 'Gelgit',
    aliases: ['Gel-git', 'Gel-Git'],
    translations: {
      en: 'Tide', de: 'Gezeiten', fr: 'Marée', es: 'Marea',
      it: 'Marea', pt: 'Maré', nl: 'Getij', ru: 'Прилив',
      ja: '潮汐', ko: '조석', 'zh-CN': '潮汐', ar: 'مد وجزر', hi: 'ज्वार-भाटा',
      sv: 'Tidvatten', no: 'Tidevann', da: 'Tidevand', fi: 'Vuorovesi', pl: 'Pływy',
      cs: 'Příliv a odliv', hu: 'Árapály', ro: 'Maree', el: 'Παλίρροια', bg: 'Прилив и отлив',
      uk: 'Припливи',
    },
  },
  {
    tr: 'Akıntı',
    // Generic Turkish "akıntı" = flow/leak; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Current', de: 'Strömung', fr: 'Courant', es: 'Corriente',
      it: 'Corrente', pt: 'Corrente', nl: 'Stroming', ru: 'Течение',
      ja: '海流', ko: '해류', 'zh-CN': '海流', ar: 'تيار بحري', hi: 'धारा',
      sv: 'Ström', no: 'Strøm', da: 'Strøm', fi: 'Virtaus', pl: 'Prąd',
      cs: 'Proud', hu: 'Áramlat', ro: 'Curent', el: 'Ρεύμα', bg: 'Течение',
      uk: 'Течія',
    },
  },

  // ── Course categories / section titles ─────────────────────────────
  {
    tr: 'Gemicilik',
    translations: {
      en: 'Seamanship', de: 'Seemannschaft', fr: 'Matelotage', es: 'Marinería',
      it: 'Arte marinaresca', pt: 'Marinharia', nl: 'Zeemanschap', ru: 'Морское дело',
      ja: 'シーマンシップ', ko: '선박술', 'zh-CN': '航海技术', ar: 'فن البحرية', sv: 'Sjömanskap',
      no: 'Sjømannskap', da: 'Sømandskab', fi: 'Merimiestaito', pl: 'Sztuka żeglarska', cs: 'Námořnické umění',
      hu: 'Tengerészmesterség', ro: 'Marinărie', el: 'Ναυτοσύνη', bg: 'Морско дело', uk: 'Морська справа',
    },
  },
  {
    tr: 'Halatçılık',
    translations: {
      en: 'Marlinespike seamanship', de: 'Tauwerksarbeit', fr: 'Matelotage',
      es: 'Trabajo de cabos', it: 'Lavorazione delle cime',
      pt: 'Trabalho com cabos', nl: 'Touwwerk', ru: 'Такелажное дело',
      ja: 'ロープワーク', ko: '로프워크', 'zh-CN': '绳结技术', sv: 'Tågvirkesarbete', no: 'Tauverksarbeid',
      da: 'Tovværksarbejde', fi: 'Köysityöt', pl: 'Prace linowe', cs: 'Práce s lany', hu: 'Kötélmunka',
      ro: 'Lucrul cu parâme', el: 'Εργασία σχοινιών', bg: 'Такелажно дело', uk: 'Такелажна справа',
    },
  },
  {
    tr: 'Seyir ve Manevra',
    aliases: ['Seyir & Manevra'],
    translations: {
      en: 'Navigation and Maneuvering', de: 'Navigation und Manövrieren',
      fr: 'Navigation et manœuvre', es: 'Navegación y maniobra',
      it: 'Navigazione e manovra', pt: 'Navegação e manobra',
      nl: 'Navigatie en manoeuvreren', ru: 'Судовождение и маневрирование',
      ja: '航海と操船', ko: '항해와 조선', 'zh-CN': '航行与操纵', sv: 'Navigation och manöver', no: 'Navigasjon og manøver',
      da: 'Navigation og manøvre', fi: 'Navigointi ja ohjailu', pl: 'Nawigacja i manewrowanie', cs: 'Navigace a manévrování', hu: 'Navigáció és manőverezés',
      ro: 'Navigație și manevră', el: 'Ναυσιπλοΐα και ελιγμοί', bg: 'Корабоводене и маневриране', uk: 'Судноводіння та маневрування',
    },
  },
  {
    tr: 'Liman ve Manevra',
    aliases: ['Liman & Manevra'],
    translations: {
      en: 'Port and Maneuvering', de: 'Hafen und Manövrieren',
      fr: 'Port et manœuvre', es: 'Puerto y maniobra',
      it: 'Porto e manovra', pt: 'Porto e manobra',
      nl: 'Haven en manoeuvreren', ru: 'Порт и маневрирование',
      ja: '入港と操船', ko: '입항과 조선', 'zh-CN': '港口与操纵', sv: 'Hamn och manöver', no: 'Havn og manøver',
      da: 'Havn og manøvre', fi: 'Satama ja ohjailu', pl: 'Port i manewrowanie', cs: 'Přístav a manévrování', hu: 'Kikötő és manőverezés',
      ro: 'Port și manevră', el: 'Λιμάνι και ελιγμοί', bg: 'Пристанище и маневриране', uk: 'Порт і маневрування',
    },
  },

  // ── Maneuvering & helm commands ────────────────────────────────────
  {
    tr: 'Alabanda',
    translations: {
      en: 'Hard over', de: 'Hart Ruder', fr: 'La barre toute',
      es: 'Toda la caña', it: 'Tutta la barra', pt: 'Todo o leme',
      nl: 'Hard roer', ru: 'Право/лево на борт',
      ja: '一杯舵', ko: '전타', 'zh-CN': '满舵', sv: 'Hårt roder', no: 'Hardt ror',
      da: 'Hårdt ror', fi: 'Täysi ruori', pl: 'Ster na burtę', cs: 'Kormidlo na doraz', ro: 'Cârma banda',
      el: 'Όλο το τιμόνι', bg: 'Борт на руля', uk: 'Право/ліво на борт',
    },
  },
  {
    tr: 'Avara',
    aliases: ['Avara Etmek'],
    translations: {
      en: 'Cast off', de: 'Ablegen', fr: 'Larguer les amarres',
      es: 'Largar amarras', it: 'Mollare gli ormeggi',
      pt: 'Largar amarras', nl: 'Losgooien', ru: 'Отшвартоваться',
      ja: '離岸', ko: '이안', 'zh-CN': '解缆', ar: 'فك الإرساء', sv: 'Kasta loss',
      no: 'Kaste loss', da: 'Kaste los', fi: 'Irrottaa köydet', pl: 'Cumy rzuć', cs: 'Odvázat',
      hu: 'Eloldani', ro: 'A mola', el: 'Μόλα', bg: 'Отдаване на швартови', uk: 'Віддати швартови',
    },
  },
  {
    tr: 'Aborda',
    aliases: ['Aborda Olmak'],
    translations: {
      en: 'Alongside', de: 'Längsseits', fr: 'À couple',
      es: 'De costado', it: 'Sottobordo', pt: 'A contrabordo',
      nl: 'Langszij', ru: 'Лагом',
      ja: '横付け', ko: '접안', 'zh-CN': '靠帮', sv: 'Långsides', no: 'Langs siden',
      da: 'Langs siden', fi: 'Sivuttain', pl: 'Burta w burtę', cs: 'Bok po boku', ro: 'La ureche',
      el: 'Παραβολή', bg: 'Борд до борд', uk: 'Лагом',
    },
  },
  {
    tr: 'Apiko',
    translations: {
      en: 'At short stay', de: 'Anker steht senkrecht', fr: 'À pic',
      es: 'A pique', it: 'A picco', pt: 'A pique', nl: 'Anker is kort',
      ru: 'Панер',
      ja: 'アピーク', ko: '업피크', 'zh-CN': '起锚到位', sv: 'Stagända ankare', no: 'Loddrett anker',
      da: 'Op og ned', pl: 'Kotwica pionowo', ro: 'Ancora la pic', el: 'Άγκυρα κατακόρυφη', bg: 'Котва на пик',
      uk: 'Якір встав',
    },
  },
  {
    tr: 'Funda',
    aliases: ['Funda Demir'],
    translations: {
      en: 'Let go anchor', de: 'Anker fallen lassen', fr: 'Mouiller l’ancre',
      es: 'Fondear el ancla', it: 'Dare fondo', pt: 'Largar a âncora',
      nl: 'Anker laten vallen', ru: 'Отдать якорь',
      ja: '投錨', ko: '닻 투하', 'zh-CN': '抛锚', ar: 'إفلات المرساة', sv: 'Fäll ankar',
      no: 'Slipp anker', da: 'Lad gå anker', fi: 'Pudota ankkuri', pl: 'Rzuć kotwicę', cs: 'Pusť kotvu',
      ro: 'Fundarisește', el: 'Φούντο', bg: 'Фундо', uk: 'Віддати якір',
    },
  },

  // ── Rigging, spars & sails ─────────────────────────────────────────
  {
    tr: 'Matafora',
    translations: {
      en: 'Davit', de: 'Davit', fr: 'Bossoir', es: 'Pescante',
      it: 'Gru di bordo', pt: 'Turco', nl: 'Davit', ru: 'Шлюпбалка',
      ja: 'ダビット', ko: '대빗', 'zh-CN': '吊艇架', ar: 'مدور القارب', sv: 'Dävert',
      no: 'David', da: 'David', fi: 'Taavetti', pl: 'Żurawik', cs: 'Člunový jeřáb',
      hu: 'Csónakdaru', ro: 'Gruie', el: 'Καπόνι', bg: 'Лодбалка', uk: 'Шлюпбалка',
    },
  },
  {
    tr: 'Çarmık',
    translations: {
      en: 'Shroud', de: 'Want', fr: 'Hauban', es: 'Obenque',
      it: 'Sartia', pt: 'Enxárcia', nl: 'Want', ru: 'Ванта',
      ja: 'シュラウド', ko: '슈라우드', 'zh-CN': '侧支索', sv: 'Vant', no: 'Vant',
      da: 'Vant', fi: 'Vantti', pl: 'Wanta', cs: 'Úpona', hu: 'Csarnak',
      ro: 'Sart', el: 'Ξάρτι', bg: 'Ванта', uk: 'Ванта',
    },
  },
  {
    tr: 'Grandi',
    translations: {
      en: 'Mainsail', de: 'Großsegel', fr: 'Grand-voile', es: 'Vela mayor',
      it: 'Randa', pt: 'Vela grande', nl: 'Grootzeil', ru: 'Грот',
      ja: 'メインスル', ko: '메인세일', 'zh-CN': '主帆', sv: 'Storsegel', no: 'Storseil',
      da: 'Storsejl', fi: 'Isopurje', pl: 'Grot', cs: 'Hlavní plachta', hu: 'Nagyvitorla',
      ro: 'Vela mare', el: 'Μαΐστρα', bg: 'Грот', uk: 'Грот',
    },
  },
  {
    tr: 'Gabya',
    translations: {
      en: 'Topsail', de: 'Marssegel', fr: 'Hunier', es: 'Gavia',
      it: 'Gabbia', pt: 'Gávea', nl: 'Marszeil', ru: 'Марсель',
      ja: 'トップスル', ko: '탑세일', 'zh-CN': '中桅帆', sv: 'Märssegel', no: 'Mersseil',
      da: 'Mærssejl', fi: 'Märssypurje', pl: 'Marsel', cs: 'Košová plachta', ro: 'Gabie',
      el: 'Γάμπια', bg: 'Марсел', uk: 'Марсель',
    },
  },
  {
    tr: 'Babafingo',
    translations: {
      en: 'Topgallant sail', de: 'Bramsegel', fr: 'Perroquet',
      es: 'Juanete', it: 'Velaccio', pt: 'Joanete',
      nl: 'Bramzeil', ru: 'Брамсель',
      ja: 'ゲルンスル', ko: '게른세일', 'zh-CN': '上桅帆', sv: 'Bramsegel', no: 'Bramseil',
      da: 'Bramsejl', fi: 'Prammipurje', pl: 'Bramsel', cs: 'Nadkošová plachta', ro: 'Zburător',
      el: 'Μπαμπαφίγκο', bg: 'Брамсел', uk: 'Брамсель',
    },
  },
  {
    tr: 'Cunda',
    translations: {
      en: 'Yardarm', de: 'Rahnock', fr: 'Bout de vergue',
      es: 'Penol', it: 'Penna del pennone', pt: 'Penol',
      nl: 'Ra-nok', ru: 'Нок рея',
      ja: 'ヤードアーム', ko: '활대 끝', 'zh-CN': '帆桁端', sv: 'Rånock', no: 'Rånokk',
      da: 'Rånok', fi: 'Raakapuun nokka', pl: 'Nok rei', cs: 'Nok ráhna', ro: 'Penă',
      el: 'Πένα κεραίας', bg: 'Нок на рея', uk: 'Нок рея',
    },
  },
  {
    tr: 'İskandil',
    aliases: ['Iskandil'],
    translations: {
      en: 'Sounding lead', de: 'Lot', fr: 'Sonde à plomb',
      es: 'Escandallo', it: 'Scandaglio', pt: 'Sonda de prumo',
      nl: 'Dieplood', ru: 'Лот',
      ja: '測鉛', ko: '측연', 'zh-CN': '测深锤', ar: 'مسبار العمق', sv: 'Lod',
      no: 'Lodd', da: 'Lod', fi: 'Luoti', pl: 'Sonda ręczna', cs: 'Olovnice',
      hu: 'Mélységmérő ón', ro: 'Sondă cu plumb', el: 'Βολίδα', bg: 'Лот', uk: 'Ручний лот',
    },
  },

  // ── Helm & sailing commands ────────────────────────────────────────
  {
    // "Viya!" is the Turkish helm command for "Steady!"; "viyalamak" means to
    // hold the heading. Generic MT renders it as the verb "to lick" (yalamak).
    tr: 'Viyalamak',
    aliases: ['Viya', 'Viyala', 'Viya Etmek'],
    translations: {
      en: 'Steady the helm', de: 'Recht so steuern', fr: 'Maintenir le cap',
      es: 'Mantener el rumbo', it: 'Mantenere la rotta', pt: 'Manter o rumo',
      nl: 'Koers houden', ru: 'Так держать',
      ja: 'ステディ', ko: '침로 유지', 'zh-CN': '把定', sv: 'Stötta rodret', no: 'Stødig',
      da: 'Stødig', fi: 'Pidä suunta', pl: 'Tak trzymać', cs: 'Tak držet', ro: 'Așa ține',
      el: 'Σταθερά', bg: 'Така дръж', uk: 'Так тримати',
    },
  },
  {
    tr: 'Orsalamak',
    aliases: ['Orsa', 'Orsa Etmek'],
    translations: {
      en: 'To luff', de: 'Anluven', fr: 'Lofer', es: 'Orzar',
      it: 'Orzare', pt: 'Orçar', nl: 'Oploeven', ru: 'Приводиться к ветру',
      ja: '詰め開き', ko: '바람타기', 'zh-CN': '抢风', sv: 'Lova', no: 'Loffe',
      da: 'Luffe', fi: 'Luovia', pl: 'Ostrzyć', cs: 'Ostřit', ro: 'A orza',
      el: 'Ορτσάρω', bg: 'Орцане', uk: 'Приводитися до вітру',
    },
  },
  {
    tr: 'Abramak',
    // Also a generic verb ("to manage/cope"); whole-string overrides only.
    inline: false,
    translations: {
      en: 'Haul the wind', fr: 'Serrer le vent', es: 'Ceñir el viento',
      it: 'Stringere il vento', pt: 'Cingir o vento',
      ja: '詰め開きで走る', sv: 'Skarpt bidevind', ro: 'A strânge vântul', el: 'Κρατώ τον άνεμο',
    },
  },
  {
    tr: 'Alesta',
    aliases: ['Alesta!'],
    translations: {
      en: 'Stand by', de: 'Klarmachen', fr: 'Paré', es: 'Listo',
      it: 'Pronti', pt: 'Pronto', nl: 'Gereedstaan', ru: 'Приготовиться',
      ja: '用意', ko: '준비', 'zh-CN': '准备', ar: 'استعد', sv: 'Klart',
      no: 'Klar', da: 'Klar', fi: 'Valmiina', pl: 'Gotuj się', cs: 'Připravit',
      hu: 'Készenlét', ro: 'Gata', el: 'Έτοιμοι', bg: 'Готови', uk: 'Приготуватися',
    },
  },

  // ── Deck equipment & fittings ──────────────────────────────────────
  {
    tr: 'Küpeşte',
    translations: {
      en: 'Bulwark', de: 'Schanzkleid', fr: 'Pavois', es: 'Amurada',
      it: 'Impavesata', pt: 'Borda-falsa', nl: 'Verschansing', ru: 'Фальшборт',
      ja: 'ブルワーク', ko: '불워크', 'zh-CN': '舷墙', ar: 'حاجز السطح', sv: 'Reling',
      no: 'Skansekledning', da: 'Lønning', fi: 'Partaalaita', pl: 'Nadburcie', cs: 'Pažení',
      hu: 'Mellvéd', ro: 'Parapet', el: 'Παραπέτο', bg: 'Фалшборд', uk: 'Фальшборт',
    },
  },
  {
    tr: 'Bocurgat',
    aliases: ['Bocurgat (Windlass)', 'Ircat', 'Irgat'],
    translations: {
      en: 'Windlass', de: 'Ankerspill', fr: 'Guindeau', es: 'Molinete',
      it: 'Verricello salpa àncora', pt: 'Molinete', nl: 'Ankerlier', ru: 'Брашпиль',
      ja: '揚錨機', ko: '양묘기', 'zh-CN': '起锚机', ar: 'ونش المرساة', sv: 'Ankarspel',
      no: 'Ankerspill', da: 'Ankerspil', fi: 'Ankkuripeli', pl: 'Winda kotwiczna', cs: 'Kotevní vratidlo',
      hu: 'Horgonycsörlő', ro: 'Vinci de ancoră', el: 'Εργάτης άγκυρας', bg: 'Шпил', uk: 'Брашпиль',
    },
  },
  {
    tr: 'Yeke',
    translations: {
      en: 'Tiller', de: 'Ruderpinne', fr: 'Barre franche', es: 'Caña del timón',
      it: 'Barra del timone', pt: 'Cana do leme', nl: 'Helmstok', ru: 'Румпель',
      ja: 'ティラー', ko: '틸러', 'zh-CN': '舵柄', ar: 'ذراع الدفة', sv: 'Rorkult',
      no: 'Rorkult', da: 'Rorpind', fi: 'Pinna', pl: 'Rumpel', cs: 'Kormidelní páka',
      hu: 'Kormányrúd', ro: 'Eche', el: 'Λαγουδέρα', bg: 'Румпел', uk: 'Румпель',
    },
  },
  {
    tr: 'Baba',
    aliases: ['Baba (Bollard)'],
    // "Baba" also means "father"; restrict to whole-string overrides.
    inline: false,
    translations: {
      en: 'Bollard', de: 'Poller', fr: 'Bitte d’amarrage', es: 'Bita',
      it: 'Bitta', pt: 'Cabeço de amarração', nl: 'Bolder', ru: 'Кнехт',
      ja: 'ボラード', ko: '계선주', 'zh-CN': '系船柱', ar: 'ربيطة', sv: 'Pollare',
      no: 'Pullert', da: 'Pullert', fi: 'Pollari', pl: 'Poler', cs: 'Pacholeúvazný',
      hu: 'Kikötőbak', ro: 'Babale', el: 'Δέστρα', bg: 'Кнехт', uk: 'Кнехт',
    },
  },
  {
    tr: 'Bite',
    aliases: ['Bite (Bitt)'],
    // Matches the English word "bite"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Bitt', de: 'Poller', fr: 'Bitte', es: 'Bita',
      it: 'Bitta', pt: 'Abita', nl: 'Beting', ru: 'Битенг',
      ja: 'ビット', ko: '비트', 'zh-CN': '系缆桩', sv: 'Beting', no: 'Beting',
      da: 'Beding', fi: 'Vantturi', pl: 'Bita', cs: 'Vázací sloupek', ro: 'Bintă',
      el: 'Μπίτα', bg: 'Битенг', uk: 'Бітенг',
    },
  },
  {
    tr: 'Usturmaça',
    translations: {
      en: 'Fender', de: 'Fender', fr: 'Défense', es: 'Defensa',
      it: 'Parabordo', pt: 'Defensa', nl: 'Stootwil', ru: 'Кранец',
      ja: '防舷材', ko: '방현재', 'zh-CN': '碰垫', ar: 'مصد', sv: 'Fender',
      no: 'Fender', da: 'Fender', fi: 'Lepuuttaja', pl: 'Odbijacz', cs: 'Bok-fendr',
      hu: 'Ütköző', ro: 'Baboul', el: 'Μπαλόνι', bg: 'Кранец', uk: 'Кранець',
    },
  },
  {
    tr: 'Lumboz',
    aliases: ['Lumboz (Porthole)'],
    translations: {
      en: 'Porthole', de: 'Bullauge', fr: 'Hublot', es: 'Portilla',
      it: 'Oblò', pt: 'Vigia', nl: 'Patrijspoort', ru: 'Иллюминатор',
      ja: '舷窓', ko: '현창', 'zh-CN': '舷窗', ar: 'كوة', sv: 'Hyttventil',
      no: 'Lugarventil', da: 'Koøje', fi: 'Valoventtiili', pl: 'Bulaj', cs: 'Lodní okénko',
      hu: 'Hajóablak', ro: 'Hublou', el: 'Φινιστρίνι', bg: 'Илюминатор', uk: 'Ілюмінатор',
    },
  },
  {
    tr: 'Forkastel',
    aliases: ['Forkastel (Forecastle)'],
    translations: {
      en: 'Forecastle', de: 'Back', fr: 'Gaillard d’avant', es: 'Castillo de proa',
      it: 'Castello di prua', pt: 'Castelo de proa', nl: 'Bak', ru: 'Бак',
      ja: '船首楼', ko: '선수루', 'zh-CN': '艏楼', sv: 'Back', no: 'Bakk',
      da: 'Bak', fi: 'Keulakansi', pl: 'Dziobówka', cs: 'Příďová nástavba', ro: 'Teugă',
      el: 'Πρόστεγο', bg: 'Бак', uk: 'Бак',
    },
  },

  // ── Mooring, rigging & lifting ─────────────────────────────────────
  {
    tr: 'Palamar',
    translations: {
      en: 'Mooring line', de: 'Festmacherleine', fr: 'Amarre', es: 'Amarra',
      it: 'Cima d’ormeggio', pt: 'Espia', nl: 'Meertros', ru: 'Швартов',
      ja: '係船索', ko: '계선줄', 'zh-CN': '系船缆', ar: 'حبل الإرساء', sv: 'Förtöjningstross',
      no: 'Fortøyningstrosse', da: 'Fortøjningstrosse', fi: 'Kiinnitysköysi', pl: 'Cuma', cs: 'Vyvazovací lano',
      hu: 'Kikötőkötél', ro: 'Parâmă de legare', el: 'Παλαμάρι', bg: 'Швартов', uk: 'Швартов',
    },
  },
  {
    tr: 'Palanga',
    translations: {
      en: 'Tackle', de: 'Talje', fr: 'Palan', es: 'Aparejo',
      it: 'Paranco', pt: 'Talha', nl: 'Talie', ru: 'Тали',
      ja: 'テークル', ko: '태클', 'zh-CN': '滑车组', ar: 'بكرة مركبة', sv: 'Talja',
      no: 'Talje', da: 'Talje', fi: 'Taljat', pl: 'Wielokrążek', cs: 'Kladkostroj',
      hu: 'Csiga', ro: 'Palanc', el: 'Παλάγκο', bg: 'Паланка', uk: 'Талі',
    },
  },
  {
    tr: 'Makara',
    aliases: ['Makara (Block)'],
    // Also a generic "reel/spool/pulley"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Block', de: 'Block', fr: 'Poulie', es: 'Motón',
      it: 'Bozzello', pt: 'Moitão', nl: 'Blok', ru: 'Блок',
      ja: '滑車', ko: '도르래', 'zh-CN': '滑车', ar: 'بكرة', sv: 'Block',
      no: 'Blokk', da: 'Blok', fi: 'Taljapyörä', pl: 'Blok', cs: 'Kladka',
      hu: 'Csigasor', ro: 'Macara', el: 'Μακαράς', bg: 'Макара', uk: 'Блок',
    },
  },
  {
    tr: 'Sapan',
    aliases: ['Sapan (Sling)'],
    // Also means "slingshot"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Sling', de: 'Anschlagseil', fr: 'Élingue', es: 'Eslinga',
      it: 'Braca', pt: 'Linga', nl: 'Strop', ru: 'Строп',
      ja: 'スリング', ko: '슬링', 'zh-CN': '吊索', ar: 'حبل الرفع', sv: 'Stropp',
      no: 'Stropp', da: 'Strop', fi: 'Nostoliina', pl: 'Zawiesie', cs: 'Vázací smyčka',
      hu: 'Emelőheveder', ro: 'Sapan', el: 'Σαμπάνι', bg: 'Сапан', uk: 'Строп',
    },
  },
  {
    tr: 'Arma',
    aliases: ['Arma (Rig)'],
    // Matches "arma" (weapon/coat-of-arms) in several languages; overrides only.
    inline: false,
    translations: {
      en: 'Rigging', de: 'Takelage', fr: 'Gréement', es: 'Aparejo',
      it: 'Attrezzatura velica', pt: 'Mastreação', nl: 'Tuigage', ru: 'Такелаж',
      ja: '艤装', ko: '의장', 'zh-CN': '帆装', sv: 'Rigg', no: 'Rigg',
      da: 'Rigning', fi: 'Takila', pl: 'Olinowanie', cs: 'Takeláž', hu: 'Kötélzet',
      ro: 'Arboradă', el: 'Εξαρτισμός', bg: 'Стъкмяване', uk: 'Такелаж',
    },
  },
  {
    tr: 'Posa',
    aliases: ['Posa (Shackle)'],
    // Length of anchor chain (27.5 m); also a common word, so overrides only.
    inline: false,
    translations: {
      en: 'Shackle', de: 'Kettenlänge', ru: 'Смычка',
      ja: 'シャックル', ko: '섀클', 'zh-CN': '锚链节', sv: 'Schackel', no: 'Sjakkel',
      da: 'Sjækkel', fi: 'Sakkeli', pl: 'Szakla', cs: 'Třmen', ro: 'Cheie de lanț',
      el: 'Κλειδί αλυσίδας', bg: 'Звено', uk: 'Смичка',
    },
  },

  // ── Sails & vessel types ───────────────────────────────────────────
  {
    tr: 'Mayıstra',
    translations: {
      en: 'Mainsail', de: 'Großsegel', fr: 'Grand-voile', es: 'Vela mayor',
      it: 'Randa', pt: 'Vela grande', nl: 'Grootzeil', ru: 'Грот',
      ja: 'メインスル', ko: '메인세일', 'zh-CN': '主帆', sv: 'Storsegel', no: 'Storseil',
      da: 'Storsejl', fi: 'Isopurje', pl: 'Grot', cs: 'Hlavní plachta', hu: 'Nagyvitorla',
      ro: 'Vela mare', el: 'Μαΐστρα', bg: 'Грот', uk: 'Грот',
    },
  },
  {
    tr: 'Uskuna',
    aliases: ['Uskuna (Schooner)'],
    translations: {
      en: 'Schooner', de: 'Schoner', fr: 'Goélette', es: 'Goleta',
      it: 'Goletta', pt: 'Escuna', nl: 'Schoener', ru: 'Шхуна',
      ja: 'スクーナー', ko: '스쿠너', 'zh-CN': '纵帆船', ar: 'سفينة شراعية صغيرة', sv: 'Skonare',
      no: 'Skonnert', da: 'Skonnert', fi: 'Kuunari', pl: 'Szkuner', cs: 'Škuner',
      hu: 'Szkúner', ro: 'Goeletă', el: 'Σκούνα', bg: 'Шхуна', uk: 'Шхуна',
    },
  },

  // ── Operations & incidents ─────────────────────────────────────────
  {
    tr: 'Demir Taramak',
    aliases: ['Demir taramak'],
    translations: {
      en: 'Dragging anchor', de: 'Vor Anker treiben', fr: 'Chasser sur l’ancre',
      es: 'Garrear', it: 'Arare l’ancora', pt: 'Garrar',
      nl: 'Anker krabben', ru: 'Дрейфовать на якоре',
      ja: '走錨', ko: '주묘', 'zh-CN': '走锚', sv: 'Dragga', no: 'Ploge anker',
      da: 'Drive for anker', fi: 'Ankkuri laahaa', pl: 'Dryfowanie na kotwicy', cs: 'Vláčení kotvy', ro: 'Ancora grapează',
      el: 'Άγκυρα ξεσέρνει', bg: 'Влачи котва', uk: 'Дрейф на якорі',
    },
  },
  {
    tr: 'Alabora',
    translations: {
      en: 'Capsize', de: 'Kentern', fr: 'Chavirage', es: 'Zozobra',
      it: 'Capovolgimento', pt: 'Emborcamento', nl: 'Kapseizen', ru: 'Опрокидывание',
      ja: '転覆', ko: '전복', 'zh-CN': '倾覆', ar: 'انقلاب', hi: 'पलटना',
      sv: 'Kantra', no: 'Kantre', da: 'Kæntre', fi: 'Kaatua', pl: 'Wywrócenie',
      cs: 'Převrácení', hu: 'Felborulás', ro: 'Răsturnare', el: 'Ανατροπή', bg: 'Преобръщане',
      uk: 'Перекидання',
    },
  },
  {
    tr: 'Çatma',
    aliases: ['Çatışma'],
    // "Çatma" also has non-nautical senses; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Collision', de: 'Kollision', fr: 'Abordage', es: 'Abordaje',
      it: 'Collisione', pt: 'Abalroamento', nl: 'Aanvaring', ru: 'Столкновение',
      ja: '衝突', ko: '충돌', 'zh-CN': '碰撞', ar: 'تصادم', hi: 'टक्कर',
      sv: 'Kollision', no: 'Kollisjon', da: 'Kollision', fi: 'Yhteentörmäys', pl: 'Kolizja',
      cs: 'Srážka', hu: 'Ütközés', ro: 'Coliziune', el: 'Σύγκρουση', bg: 'Сблъскване',
      uk: 'Зіткнення',
    },
  },
  {
    tr: 'Kamarot',
    // Also a generic loanword; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Steward', de: 'Steward', fr: 'Garçon de cabine', es: 'Camarero',
      it: 'Cameriere di bordo', pt: 'Taifeiro', nl: 'Hofmeester', ru: 'Стюард',
      ja: 'スチュワード', ko: '사무장', 'zh-CN': '服务员', ar: 'خادم السفينة', sv: 'Steward',
      no: 'Steward', da: 'Hovmester', fi: 'Stuertti', pl: 'Steward', cs: 'Stevard',
      hu: 'Steward', ro: 'Steward', el: 'Καμαρότος', bg: 'Стюард', uk: 'Стюард',
    },
  },

  // ── Hull structure (frames, posts, openings) ───────────────────────
  {
    tr: 'Postalar',
    aliases: ['Postalar (Frames)', 'Posta'],
    translations: {
      en: 'Frames', de: 'Spanten', fr: 'Membrures', es: 'Cuadernas',
      it: 'Ordinate', pt: 'Cavernas', nl: 'Spanten', ru: 'Шпангоуты',
      ja: '肋骨', ko: '늑골', 'zh-CN': '肋骨', sv: 'Spant', no: 'Spant',
      da: 'Spanter', fi: 'Kaaret', pl: 'Wręgi', cs: 'Žebra', hu: 'Bordák',
      ro: 'Coaste', el: 'Νομείς', bg: 'Шпангоути', uk: 'Шпангоути',
    },
  },
  {
    tr: 'Baş Bodoslama',
    aliases: ['Baş bodoslama'],
    translations: {
      en: 'Stem', de: 'Vorsteven', fr: 'Étrave', es: 'Roda',
      it: 'Ruota di prua', pt: 'Roda de proa', nl: 'Voorsteven', ru: 'Форштевень',
      ja: '船首材', ko: '선수재', 'zh-CN': '艏柱', sv: 'Förstäv', no: 'Forstevn',
      da: 'Forstævn', fi: 'Keulapylväs', pl: 'Dziobnica', cs: 'Přední vaz', ro: 'Etravă',
      el: 'Πλωριό ποδόσταμο', bg: 'Форщевен', uk: 'Форштевень',
    },
  },
  {
    tr: 'Kıç Bodoslama',
    aliases: ['Kıç bodoslama'],
    translations: {
      en: 'Sternpost', de: 'Achtersteven', fr: 'Étambot', es: 'Codaste',
      it: 'Dritto di poppa', pt: 'Cadaste', nl: 'Achtersteven', ru: 'Ахтерштевень',
      ja: '船尾材', ko: '선미재', 'zh-CN': '艉柱', sv: 'Akterstäv', no: 'Akterstevn',
      da: 'Agterstævn', fi: 'Peräpylväs', pl: 'Tylnica', cs: 'Zadní vaz', ro: 'Etambou',
      el: 'Πρυμνιό ποδόσταμο', bg: 'Ахтерщевен', uk: 'Ахтерштевень',
    },
  },
  {
    tr: 'Ayna Kıç',
    aliases: ['Ayna kıç'],
    translations: {
      en: 'Transom stern', de: 'Spiegelheck', fr: 'Tableau arrière',
      es: 'Popa de espejo', it: 'Poppa a specchio', pt: 'Painel de popa',
      nl: 'Spiegel', ru: 'Транцевая корма',
      ja: 'トランサム船尾', ko: '트랜섬 선미', 'zh-CN': '方艉', sv: 'Spegelakter', no: 'Speilakter',
      da: 'Spejlhæk', fi: 'Peräpeili', pl: 'Pawęż', cs: 'Zrcadlová záď', ro: 'Pupă oglindă',
      el: 'Καθρέφτης πρύμνης', bg: 'Огледална кърма', uk: 'Транцева корма',
    },
  },
  {
    tr: 'Biça',
    // Raised edge around a hatch/opening (coaming).
    inline: false,
    translations: {
      en: 'Coaming', de: 'Süll', fr: 'Surbau', es: 'Brazola', pt: 'Braçola',
      ja: 'ハッチコーミング', sv: 'Sarg', no: 'Lukekarm', da: 'Lugekarm', fi: 'Kansiluukun karmi',
      pl: 'Zrębnica', cs: 'Komings', ro: 'Ramă de gură de magazie', el: 'Στόμιο κύτους',
    },
  },
  {
    tr: 'Manika',
    translations: {
      en: 'Cowl ventilator', de: 'Lüfterkopf', fr: 'Manche à air',
      es: 'Manguerote de ventilación', it: 'Manica a vento',
      pt: 'Manga de ventilação', nl: 'Windkoker', ru: 'Раструб вентилятора',
      ja: '通風筒', ko: '통풍통', 'zh-CN': '通风筒', ar: 'منفذ تهوية', sv: 'Ventilator',
      no: 'Ventilator', da: 'Ventilator', fi: 'Tuuletuskupu', pl: 'Nawietrznik', cs: 'Větrací roura',
      hu: 'Szellőzőcső', ro: 'Manșă de ventilație', el: 'Αεραγωγός', bg: 'Вентилационна тръба', uk: 'Вентиляційний розтруб',
    },
  },

  // ── Anchoring gear & ground tackle ─────────────────────────────────
  {
    tr: 'Dönence',
    // Also the geographic "tropic"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Swivel', de: 'Wirbel', fr: 'Émerillon', es: 'Grillete giratorio',
      it: 'Arganello', pt: 'Destorcedor', nl: 'Wartel', ru: 'Вертлюг',
      ja: 'スイベル', ko: '스위벨', 'zh-CN': '转环', sv: 'Lekare', no: 'Svivel',
      da: 'Svirvel', fi: 'Pyörre', pl: 'Krętlik', cs: 'Obratlík', ro: 'Vârtej',
      el: 'Στρόφιγγα', bg: 'Въртележка', uk: 'Вертлюг',
    },
  },
  {
    tr: 'Merimek',
    translations: {
      en: 'Grapnel', de: 'Draggen', fr: 'Grappin', es: 'Rezón',
      it: 'Grappino', pt: 'Fateixa', nl: 'Dreg', ru: 'Кошка',
      ja: 'グラプネル', ko: '갈고리 닻', 'zh-CN': '抓锚', sv: 'Dragg', no: 'Dregg',
      da: 'Dræg', fi: 'Ankkuriharava', pl: 'Kotwica czterołapowa', cs: 'Lodní hák', ro: 'Ancoră cu gheare',
      el: 'Αρπάγη', bg: 'Котва-котва', uk: 'Кішка',
    },
  },
  {
    tr: 'Safra',
    aliases: ['Safra (Ballast)'],
    // "Safra" also means "bile"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Ballast', de: 'Ballast', fr: 'Lest', es: 'Lastre',
      it: 'Zavorra', pt: 'Lastro', nl: 'Ballast', ru: 'Балласт',
      ja: 'バラスト', ko: '밸러스트', 'zh-CN': '压载', ar: 'صابورة', sv: 'Barlast',
      no: 'Ballast', da: 'Ballast', fi: 'Painolasti', pl: 'Balast', cs: 'Zátěž',
      hu: 'Ballaszt', ro: 'Balast', el: 'Έρμα', bg: 'Баласт', uk: 'Баласт',
    },
  },
  {
    tr: 'Duba',
    translations: {
      en: 'Pontoon', de: 'Ponton', fr: 'Ponton', es: 'Pontón',
      it: 'Pontone', pt: 'Pontão', nl: 'Ponton', ru: 'Понтон',
      ja: 'ポンツーン', ko: '폰툰', 'zh-CN': '趸船', ar: 'عوامة كبيرة', sv: 'Ponton',
      no: 'Pongtong', da: 'Ponton', fi: 'Ponttoni', pl: 'Ponton', cs: 'Ponton',
      hu: 'Úszómű', ro: 'Ponton', el: 'Πλωτήρας', bg: 'Понтон', uk: 'Понтон',
    },
  },

  // ── Deck fittings & rigging ────────────────────────────────────────
  {
    tr: 'Koçboynuzu',
    aliases: ['Koç Boynuzu', 'Koç boynuzu'],
    translations: {
      en: 'Cleat', de: 'Klampe', fr: 'Taquet', es: 'Cornamusa',
      it: 'Galloccia', pt: 'Cunho', nl: 'Kikker', ru: 'Утка',
      ja: 'クリート', ko: '클리트', 'zh-CN': '系索栓', sv: 'Knap', no: 'Klampe',
      da: 'Klampe', fi: 'Knaapi', pl: 'Knaga', cs: 'Vázací knaga', hu: 'Kötélbak',
      ro: 'Tachet', el: 'Δέστρα διπλή', bg: 'Утка', uk: 'Качка',
    },
  },
  {
    tr: 'Boğma',
    // Also "strangling"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Whipping', de: 'Takling', fr: 'Surliure', es: 'Falcaceadura',
      pt: 'Falcaça',
      ja: 'ホイッピング', sv: 'Tagling', no: 'Takling', da: 'Takling', fi: 'Taklaus',
      pl: 'Oplot', cs: 'Ovinutí konce', ro: 'Matiseală', el: 'Ματίσιμο',
    },
  },
  {
    tr: 'Flama',
    translations: {
      en: 'Pennant', de: 'Wimpel', fr: 'Flamme', es: 'Gallardete',
      it: 'Fiamma', pt: 'Flâmula', nl: 'Wimpel', ru: 'Вымпел',
      ja: 'ペナント', ko: '페넌트', 'zh-CN': '三角旗', ar: 'راية', sv: 'Vimpel',
      no: 'Vimpel', da: 'Vimpel', fi: 'Viiri', pl: 'Proporzec', cs: 'Vlajka úzká',
      hu: 'Árbócszalag', ro: 'Flamură', el: 'Επισείων', bg: 'Флаг', uk: 'Вимпел',
    },
  },
  {
    tr: 'Trinket',
    // Identical to the English word "trinket"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Foresail', de: 'Fock', fr: 'Misaine', es: 'Trinquete',
      it: 'Trinchetto', pt: 'Traquete', nl: 'Fok', ru: 'Фок',
      ja: 'フォアスル', ko: '포어세일', 'zh-CN': '前帆', sv: 'Fock', no: 'Fokk',
      da: 'Fok', fi: 'Fokka', pl: 'Fok', cs: 'Přední plachta', ro: 'Trincă',
      el: 'Τρίγκος', bg: 'Фок', uk: 'Фок',
    },
  },

  // ── Crew & pilotage ────────────────────────────────────────────────
  {
    tr: 'Gemiadamı',
    aliases: ['Gemi Adamı', 'Gemi adamı'],
    translations: {
      en: 'Seafarer', de: 'Seemann', fr: 'Marin', es: 'Gente de mar',
      it: 'Marittimo', pt: 'Marítimo', nl: 'Zeevarende', ru: 'Моряк',
      ja: '船員', ko: '선원', 'zh-CN': '海员', ar: 'بحّار', hi: 'नाविक',
      sv: 'Sjöman', no: 'Sjømann', da: 'Sømand', fi: 'Merimies', pl: 'Marynarz',
      cs: 'Námořník', hu: 'Tengerész', ro: 'Navigator', el: 'Ναυτικός', bg: 'Моряк',
      uk: 'Моряк',
    },
  },
  {
    tr: 'Tayfa',
    // Colloquial for "crew/gang"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Rating', de: 'Matrose', fr: 'Matelot', es: 'Marinero',
      it: 'Marinaio', pt: 'Marinheiro', nl: 'Matroos', ru: 'Матрос',
      ja: '部員', ko: '부원', 'zh-CN': '普通船员', ar: 'بحّار عادي', sv: 'Manskap',
      no: 'Menig', da: 'Menig', fi: 'Miehistön jäsen', pl: 'Marynarz szeregowy', cs: 'Námořník mužstva',
      hu: 'Matróz', ro: 'Marinar', el: 'Ναύτης', bg: 'Редови моряк', uk: 'Матрос',
    },
  },
  {
    tr: 'Kılavuz Kaptan',
    aliases: ['Kılavuz Kaptan (Pilot)', 'Kılavuz kaptan'],
    translations: {
      en: 'Maritime pilot', de: 'Lotse', fr: 'Pilote', es: 'Práctico',
      it: 'Pilota', pt: 'Prático', nl: 'Loods', ru: 'Лоцман',
      ja: '水先人', ko: '도선사', 'zh-CN': '引航员', ar: 'مرشد بحري', hi: 'नौवहन-चालक',
      sv: 'Lots', no: 'Los', da: 'Lods', fi: 'Luotsi', pl: 'Pilot morski',
      cs: 'Lodivod', hu: 'Révkalauz', ro: 'Pilot', el: 'Πλοηγός', bg: 'Пилот',
      uk: 'Лоцман',
    },
  },
  {
    tr: 'Römorkör',
    translations: {
      en: 'Tug', de: 'Schlepper', fr: 'Remorqueur', es: 'Remolcador',
      it: 'Rimorchiatore', pt: 'Rebocador', nl: 'Sleepboot', ru: 'Буксир',
      ja: '曳船', ko: '예인선', 'zh-CN': '拖船', ar: 'قاطرة بحرية', hi: 'टग नौका',
      sv: 'Bogserbåt', no: 'Slepebåt', da: 'Slæbebåd', fi: 'Hinaaja', pl: 'Holownik',
      cs: 'Remorkér', hu: 'Vontatóhajó', ro: 'Remorcher', el: 'Ρυμουλκό', bg: 'Влекач',
      uk: 'Буксир',
    },
  },
];

// Compact source(TR) -> English glossary string for AI prompt guidance.
export const maritimeGlossaryPromptHint: string = maritimeTerms
  .filter((t) => t.translations.en)
  .map((t) => `${t.tr} = ${t.translations.en}`)
  .join('; ');

// Build a normalized lookup index: "<lang>::<normalizedSource>" -> translation
const normalize = (value: string): string =>
  value
    .trim()
    .replace(/\s+/g, ' ')
    // Turkish-aware lowercasing so İ/I fold consistently.
    .toLocaleLowerCase('tr-TR')
    // Drop simple trailing punctuation so "Dümen:" still matches.
    .replace(/[:.!?]+$/, '');

const overrideIndex: Map<string, string> = (() => {
  const index = new Map<string, string>();
  for (const term of maritimeTerms) {
    const sources = [term.tr, ...(term.aliases ?? [])];
    for (const [lang, translation] of Object.entries(term.translations)) {
      if (!translation) continue;
      for (const source of sources) {
        index.set(`${lang}::${normalize(source)}`, translation);
      }
    }
  }
  return index;
})();

/**
 * Returns the curated maritime translation for an exact source phrase, or
 * `null` when there is no override (caller should fall back to machine
 * translation). Matching is case-insensitive and tolerant of surrounding
 * whitespace and trailing punctuation.
 */
export const getMaritimeTranslationOverride = (
  sourceText: string,
  languageCode: string
): string | null => {
  if (!sourceText || !languageCode) return null;
  return overrideIndex.get(`${languageCode}::${normalize(sourceText)}`) ?? null;
};

// -----------------------------------------------------------------------------
// In-text correction rules (applied on top of the page-wide machine translation)
// -----------------------------------------------------------------------------
// Generic page translation (Google widget) often leaves niche Turkish maritime
// terms UNTRANSLATED (e.g. "Pruva", "Sancak", "Lostromo", "Vardiya") or renders
// them non-maritime. These rules fix such terms inside already-translated text.
//
// The primary, false-positive-free mechanism is "leftover source term": if the
// original Turkish maritime word still appears in the translated output, it is
// almost certainly the maritime term, so we replace it with the correct word in
// the active language. A small, conservative set of curated "wrong -> right"
// corrections complements this for the highest-confidence cases.

export interface MaritimeCorrectionRule {
  pattern: RegExp;
  replacement: string;
}

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Word boundaries that also respect Unicode letters/digits (incl. Turkish ones),
// so "Pruva" matches but "Pruvalar" or a substring does not.
const wordRule = (source: string, replacement: string): MaritimeCorrectionRule => ({
  pattern: new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(source)}(?![\\p{L}\\p{N}])`, 'giu'),
  replacement,
});

// Curated, high-confidence "wrong machine output -> correct maritime term".
// Keep these strict (exact tokens that are unlikely to occur in any other,
// non-maritime context) to avoid false positives.
const curatedCorrections: Record<string, Array<[string, string]>> = {
  en: [
    // Google frequently transliterates these Ottoman/Turkish-rooted terms.
    ['Sanjak', 'Starboard'],
  ],
};

const correctionRulesCache = new Map<string, MaritimeCorrectionRule[]>();

/**
 * Returns ordered maritime correction rules for a target language. Rules are
 * sorted so that longer (multi-word) source phrases are applied before shorter
 * ones. Returns an empty array for the source language (Turkish) where no
 * correction is needed.
 */
export const getMaritimeCorrectionRules = (languageCode: string): MaritimeCorrectionRule[] => {
  if (!languageCode || languageCode === 'tr') return [];
  const cached = correctionRulesCache.get(languageCode);
  if (cached) return cached;

  const rules: Array<{ source: string; rule: MaritimeCorrectionRule }> = [];

  for (const term of maritimeTerms) {
    if (term.inline === false) continue;
    const translation = term.translations[languageCode];
    if (!translation) continue;
    // Only the canonical Turkish term is used for inline replacement; aliases
    // may include ambiguous generic words and are reserved for whole-string
    // overrides via getMaritimeTranslationOverride().
    rules.push({ source: term.tr, rule: wordRule(term.tr, translation) });
  }

  for (const [wrong, right] of curatedCorrections[languageCode] ?? []) {
    rules.push({ source: wrong, rule: wordRule(wrong, right) });
  }

  // Longer source phrases first so "Seyir ve Manevra" wins over "Seyir".
  rules.sort((a, b) => b.source.length - a.source.length);

  const ordered = rules.map((entry) => entry.rule);
  correctionRulesCache.set(languageCode, ordered);
  return ordered;
};

const matcherCache = new Map<string, RegExp | null>();

/**
 * Returns a single combined (non-global) regex used as a cheap pre-check so the
 * caller can skip the full rule set for text that contains no maritime term.
 * Returns `null` when there are no rules for the language.
 */
export const getMaritimeCorrectionMatcher = (languageCode: string): RegExp | null => {
  if (matcherCache.has(languageCode)) return matcherCache.get(languageCode) ?? null;
  const rules = getMaritimeCorrectionRules(languageCode);
  const matcher = rules.length
    ? new RegExp(rules.map((rule) => rule.pattern.source).join('|'), 'iu')
    : null;
  matcherCache.set(languageCode, matcher);
  return matcher;
};

/**
 * Applies maritime correction rules to a single string and returns the
 * corrected string (unchanged if no rule matched).
 */
export const applyMaritimeCorrections = (text: string, languageCode: string): string => {
  if (!text) return text;
  const matcher = getMaritimeCorrectionMatcher(languageCode);
  if (!matcher || !matcher.test(text)) return text;

  let result = text;
  for (const { pattern, replacement } of getMaritimeCorrectionRules(languageCode)) {
    pattern.lastIndex = 0;
    if (pattern.test(result)) {
      pattern.lastIndex = 0;
      result = result.replace(pattern, replacement);
    }
  }
  return result;
};
