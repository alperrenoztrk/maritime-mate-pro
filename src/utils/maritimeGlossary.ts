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
    },
  },
  {
    tr: 'Sancak Tarafı',
    aliases: ['Sancak tarafı', 'Sancak Bordası'],
    translations: {
      en: 'Starboard side', de: 'Steuerbordseite', fr: 'Tribord', es: 'Estribor',
      it: 'Tribordo', pt: 'Estibordo', nl: 'Stuurboord', ru: 'Правый борт',
    },
  },
  {
    tr: 'Pruva',
    aliases: ['Baş', 'Baş Taraf', 'Pruva (Baş)'],
    translations: {
      en: 'Bow', de: 'Bug', fr: 'Proue', es: 'Proa',
      it: 'Prua', pt: 'Proa', nl: 'Boeg', ru: 'Нос',
    },
  },
  {
    tr: 'Kıç',
    aliases: ['Kıç Taraf', 'Pupa'],
    translations: {
      en: 'Stern', de: 'Heck', fr: 'Poupe', es: 'Popa',
      it: 'Poppa', pt: 'Popa', nl: 'Achtersteven', ru: 'Корма',
    },
  },
  {
    tr: 'Borda',
    translations: {
      en: "Ship's side", de: 'Bordwand', fr: 'Bordé', es: 'Costado',
      it: 'Murata', pt: 'Costado', nl: 'Boordwand', ru: 'Борт',
    },
  },

  // ── Structure ──────────────────────────────────────────────────────
  {
    tr: 'Omurga',
    aliases: ['Omurga (Keel)'],
    translations: {
      en: 'Keel', de: 'Kiel', fr: 'Quille', es: 'Quilla',
      it: 'Chiglia', pt: 'Quilha', nl: 'Kiel', ru: 'Киль',
    },
  },
  {
    tr: 'Güverte',
    aliases: ['Güverte (Deck)'],
    translations: {
      en: 'Deck', de: 'Deck', fr: 'Pont', es: 'Cubierta',
      it: 'Coperta', pt: 'Convés', nl: 'Dek', ru: 'Палуба',
    },
  },
  {
    tr: 'Ambar',
    aliases: ['Ambar (Hold)', 'Yük Ambarı'],
    translations: {
      en: 'Cargo hold', de: 'Laderaum', fr: 'Cale', es: 'Bodega',
      it: 'Stiva', pt: 'Porão de carga', nl: 'Ruim', ru: 'Трюм',
    },
  },
  {
    tr: 'Sintine',
    aliases: ['Sintine (Bilge)'],
    translations: {
      en: 'Bilge', de: 'Bilge', fr: 'Sentine', es: 'Sentina',
      it: 'Sentina', pt: 'Sentina', nl: 'Bilge', ru: 'Льяло',
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
    },
  },
  {
    tr: 'Köprüüstü',
    aliases: ['Köprü Üstü', 'Köprüüstü (Bridge)', 'Kaptan Köşkü'],
    translations: {
      en: 'Bridge', de: 'Brücke', fr: 'Passerelle', es: 'Puente',
      it: 'Plancia', pt: 'Ponte de comando', nl: 'Brug', ru: 'Ходовой мостик',
    },
  },
  {
    tr: 'Fribord',
    aliases: ['Fribord (Freeboard)'],
    translations: {
      en: 'Freeboard', de: 'Freibord', fr: 'Franc-bord', es: 'Francobordo',
      it: 'Bordo libero', pt: 'Borda livre', nl: 'Vrijboord', ru: 'Надводный борт',
    },
  },

  // ── Steering & propulsion ──────────────────────────────────────────
  {
    tr: 'Dümen',
    translations: {
      en: 'Rudder', de: 'Ruder', fr: 'Gouvernail', es: 'Timón',
      it: 'Timone', pt: 'Leme', nl: 'Roer', ru: 'Руль',
    },
  },
  {
    tr: 'Pervane',
    translations: {
      en: 'Propeller', de: 'Schiffsschraube', fr: 'Hélice', es: 'Hélice',
      it: 'Elica', pt: 'Hélice', nl: 'Schroef', ru: 'Гребной винт',
    },
  },

  // ── Anchoring & mooring ────────────────────────────────────────────
  {
    tr: 'Çapa',
    aliases: ['Demir (Çapa)', 'Çıpa', 'Çıpa (Anchor)'],
    translations: {
      en: 'Anchor', de: 'Anker', fr: 'Ancre', es: 'Ancla',
      it: 'Àncora', pt: 'Âncora', nl: 'Anker', ru: 'Якорь',
    },
  },
  {
    tr: 'Demir Atmak',
    aliases: ['Demir atmak'],
    translations: {
      en: 'Drop anchor', de: 'Anker werfen', fr: 'Mouiller', es: 'Fondear',
      it: 'Dare fondo', pt: 'Fundear', nl: 'Ankeren', ru: 'Отдать якорь',
    },
  },
  {
    tr: 'Demir Almak',
    aliases: ['Demir almak'],
    translations: {
      en: 'Weigh anchor', de: 'Anker lichten', fr: 'Lever l’ancre', es: 'Levar anclas',
      it: 'Salpare', pt: 'Levantar ferro', nl: 'Anker lichten', ru: 'Сняться с якоря',
    },
  },
  {
    tr: 'Çıma',
    translations: {
      en: 'Mooring line', de: 'Festmacherleine', fr: 'Aussière', es: 'Cabo de amarre',
      it: 'Cima d’ormeggio', pt: 'Cabo de amarração', nl: 'Meertros', ru: 'Швартов',
    },
  },
  {
    tr: 'Halat',
    translations: {
      en: 'Line', de: 'Leine', fr: 'Cordage', es: 'Cabo',
      it: 'Cima', pt: 'Cabo', nl: 'Lijn', ru: 'Трос',
    },
  },
  {
    tr: 'Şamandıra',
    translations: {
      en: 'Buoy', de: 'Boje', fr: 'Bouée', es: 'Boya',
      it: 'Boa', pt: 'Boia', nl: 'Boei', ru: 'Буй',
    },
  },

  // ── Navigation ─────────────────────────────────────────────────────
  {
    tr: 'Seyir',
    translations: {
      en: 'Navigation', de: 'Navigation', fr: 'Navigation', es: 'Navegación',
      it: 'Navigazione', pt: 'Navegação', nl: 'Navigatie', ru: 'Судовождение',
    },
  },
  {
    tr: 'Rota',
    translations: {
      en: 'Course', de: 'Kurs', fr: 'Cap', es: 'Rumbo',
      it: 'Rotta', pt: 'Rumo', nl: 'Koers', ru: 'Курс',
    },
  },
  {
    tr: 'Pusula',
    translations: {
      en: 'Compass', de: 'Kompass', fr: 'Compas', es: 'Compás',
      it: 'Bussola', pt: 'Bússola', nl: 'Kompas', ru: 'Компас',
    },
  },
  {
    tr: 'Kerteriz',
    translations: {
      en: 'Bearing', de: 'Peilung', fr: 'Relèvement', es: 'Marcación',
      it: 'Rilevamento', pt: 'Marcação', nl: 'Peiling', ru: 'Пеленг',
    },
  },
  {
    tr: 'Mevki',
    aliases: ['Konum (Mevki)'],
    translations: {
      en: 'Position', de: 'Position', fr: 'Position', es: 'Situación',
      it: 'Posizione', pt: 'Posição', nl: 'Positie', ru: 'Местоположение',
    },
  },
  {
    tr: 'Manevra',
    translations: {
      en: 'Maneuver', de: 'Manöver', fr: 'Manœuvre', es: 'Maniobra',
      it: 'Manovra', pt: 'Manobra', nl: 'Manoeuvre', ru: 'Манёвр',
    },
  },
  {
    tr: 'Deniz Feneri',
    aliases: ['Deniz feneri'],
    translations: {
      en: 'Lighthouse', de: 'Leuchtturm', fr: 'Phare', es: 'Faro',
      it: 'Faro', pt: 'Farol', nl: 'Vuurtoren', ru: 'Маяк',
    },
  },
  {
    tr: 'Seyir Feneri',
    aliases: ['Seyir feneri', 'Borda Feneri', 'Borda feneri'],
    translations: {
      en: 'Navigation light', de: 'Positionslaterne', fr: 'Feu de navigation',
      es: 'Luz de navegación', it: 'Fanale di navigazione',
      pt: 'Luz de navegação', nl: 'Navigatielicht', ru: 'Ходовой огонь',
    },
  },

  // ── Watches & crew ─────────────────────────────────────────────────
  {
    tr: 'Vardiya',
    translations: {
      en: 'Watch', de: 'Wache', fr: 'Quart', es: 'Guardia',
      it: 'Guardia', pt: 'Quarto de serviço', nl: 'Wacht', ru: 'Вахта',
    },
  },
  {
    tr: 'Mürettebat',
    translations: {
      en: 'Crew', de: 'Besatzung', fr: 'Équipage', es: 'Tripulación',
      it: 'Equipaggio', pt: 'Tripulação', nl: 'Bemanning', ru: 'Экипаж',
    },
  },
  {
    tr: 'Kaptan',
    translations: {
      en: 'Master', de: 'Kapitän', fr: 'Capitaine', es: 'Capitán',
      it: 'Comandante', pt: 'Comandante', nl: 'Kapitein', ru: 'Капитан',
    },
  },
  {
    tr: 'Lostromo',
    aliases: ['Lostromo (Bosun)'],
    translations: {
      en: 'Boatswain', de: 'Bootsmann', fr: 'Maître d’équipage', es: 'Contramaestre',
      it: 'Nostromo', pt: 'Contramestre', nl: 'Bootsman', ru: 'Боцман',
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
    },
  },
  {
    tr: 'Can Simidi',
    aliases: ['Can simidi', 'Cankurtaran Simidi'],
    translations: {
      en: 'Lifebuoy', de: 'Rettungsring', fr: 'Bouée de sauvetage',
      es: 'Aro salvavidas', it: 'Salvagente anulare',
      pt: 'Boia salva-vidas', nl: 'Reddingsboei', ru: 'Спасательный круг',
    },
  },
  {
    tr: 'Can Yeleği',
    aliases: ['Can yeleği'],
    translations: {
      en: 'Lifejacket', de: 'Rettungsweste', fr: 'Gilet de sauvetage',
      es: 'Chaleco salvavidas', it: 'Giubbotto di salvataggio',
      pt: 'Colete salva-vidas', nl: 'Reddingsvest', ru: 'Спасательный жилет',
    },
  },

  // ── Stability & hydrostatics ───────────────────────────────────────
  {
    tr: 'Su Çekimi',
    aliases: ['Su çekimi', 'Draft', 'Draft (Su Çekimi)'],
    translations: {
      en: 'Draft', de: 'Tiefgang', fr: 'Tirant d’eau', es: 'Calado',
      it: 'Pescaggio', pt: 'Calado', nl: 'Diepgang', ru: 'Осадка',
    },
  },
  {
    tr: 'Deplasman',
    translations: {
      en: 'Displacement', de: 'Verdrängung', fr: 'Déplacement', es: 'Desplazamiento',
      it: 'Dislocamento', pt: 'Deslocamento', nl: 'Waterverplaatsing', ru: 'Водоизмещение',
    },
  },
  {
    tr: 'Stabilite',
    translations: {
      en: 'Stability', de: 'Stabilität', fr: 'Stabilité', es: 'Estabilidad',
      it: 'Stabilità', pt: 'Estabilidade', nl: 'Stabiliteit', ru: 'Остойчивость',
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
    },
  },

  // ── Environment ────────────────────────────────────────────────────
  {
    tr: 'Gelgit',
    aliases: ['Gel-git', 'Gel-Git'],
    translations: {
      en: 'Tide', de: 'Gezeiten', fr: 'Marée', es: 'Marea',
      it: 'Marea', pt: 'Maré', nl: 'Getij', ru: 'Прилив',
    },
  },
  {
    tr: 'Akıntı',
    // Generic Turkish "akıntı" = flow/leak; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Current', de: 'Strömung', fr: 'Courant', es: 'Corriente',
      it: 'Corrente', pt: 'Corrente', nl: 'Stroming', ru: 'Течение',
    },
  },

  // ── Course categories / section titles ─────────────────────────────
  {
    tr: 'Gemicilik',
    translations: {
      en: 'Seamanship', de: 'Seemannschaft', fr: 'Matelotage', es: 'Marinería',
      it: 'Arte marinaresca', pt: 'Marinharia', nl: 'Zeemanschap', ru: 'Морское дело',
    },
  },
  {
    tr: 'Halatçılık',
    translations: {
      en: 'Marlinespike seamanship', de: 'Tauwerksarbeit', fr: 'Matelotage',
      es: 'Trabajo de cabos', it: 'Lavorazione delle cime',
      pt: 'Trabalho com cabos', nl: 'Touwwerk', ru: 'Такелажное дело',
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
    },
  },

  // ── Maneuvering & helm commands ────────────────────────────────────
  {
    tr: 'Alabanda',
    translations: {
      en: 'Hard over', de: 'Hart Ruder', fr: 'La barre toute',
      es: 'Toda la caña', it: 'Tutta la barra', pt: 'Todo o leme',
      nl: 'Hard roer', ru: 'Право/лево на борт',
    },
  },
  {
    tr: 'Avara',
    aliases: ['Avara Etmek'],
    translations: {
      en: 'Cast off', de: 'Ablegen', fr: 'Larguer les amarres',
      es: 'Largar amarras', it: 'Mollare gli ormeggi',
      pt: 'Largar amarras', nl: 'Losgooien', ru: 'Отшвартоваться',
    },
  },
  {
    tr: 'Aborda',
    aliases: ['Aborda Olmak'],
    translations: {
      en: 'Alongside', de: 'Längsseits', fr: 'À couple',
      es: 'De costado', it: 'Sottobordo', pt: 'A contrabordo',
      nl: 'Langszij', ru: 'Лагом',
    },
  },
  {
    tr: 'Apiko',
    translations: {
      en: 'At short stay', de: 'Anker steht senkrecht', fr: 'À pic',
      es: 'A pique', it: 'A picco', pt: 'A pique', nl: 'Anker is kort',
      ru: 'Панер',
    },
  },
  {
    tr: 'Funda',
    aliases: ['Funda Demir'],
    translations: {
      en: 'Let go anchor', de: 'Anker fallen lassen', fr: 'Mouiller l’ancre',
      es: 'Fondear el ancla', it: 'Dare fondo', pt: 'Largar a âncora',
      nl: 'Anker laten vallen', ru: 'Отдать якорь',
    },
  },

  // ── Rigging, spars & sails ─────────────────────────────────────────
  {
    tr: 'Matafora',
    translations: {
      en: 'Davit', de: 'Davit', fr: 'Bossoir', es: 'Pescante',
      it: 'Gru di bordo', pt: 'Turco', nl: 'Davit', ru: 'Шлюпбалка',
    },
  },
  {
    tr: 'Çarmık',
    translations: {
      en: 'Shroud', de: 'Want', fr: 'Hauban', es: 'Obenque',
      it: 'Sartia', pt: 'Enxárcia', nl: 'Want', ru: 'Ванта',
    },
  },
  {
    tr: 'Grandi',
    translations: {
      en: 'Mainsail', de: 'Großsegel', fr: 'Grand-voile', es: 'Vela mayor',
      it: 'Randa', pt: 'Vela grande', nl: 'Grootzeil', ru: 'Грот',
    },
  },
  {
    tr: 'Gabya',
    translations: {
      en: 'Topsail', de: 'Marssegel', fr: 'Hunier', es: 'Gavia',
      it: 'Gabbia', pt: 'Gávea', nl: 'Marszeil', ru: 'Марсель',
    },
  },
  {
    tr: 'Babafingo',
    translations: {
      en: 'Topgallant sail', de: 'Bramsegel', fr: 'Perroquet',
      es: 'Juanete', it: 'Velaccio', pt: 'Joanete',
      nl: 'Bramzeil', ru: 'Брамсель',
    },
  },
  {
    tr: 'Cunda',
    translations: {
      en: 'Yardarm', de: 'Rahnock', fr: 'Bout de vergue',
      es: 'Penol', it: 'Penna del pennone', pt: 'Penol',
      nl: 'Ra-nok', ru: 'Нок рея',
    },
  },
  {
    tr: 'İskandil',
    aliases: ['Iskandil'],
    translations: {
      en: 'Sounding lead', de: 'Lot', fr: 'Sonde à plomb',
      es: 'Escandallo', it: 'Scandaglio', pt: 'Sonda de prumo',
      nl: 'Dieplood', ru: 'Лот',
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
    },
  },
  {
    tr: 'Orsalamak',
    aliases: ['Orsa', 'Orsa Etmek'],
    translations: {
      en: 'To luff', de: 'Anluven', fr: 'Lofer', es: 'Orzar',
      it: 'Orzare', pt: 'Orçar', nl: 'Oploeven', ru: 'Приводиться к ветру',
    },
  },
  {
    tr: 'Abramak',
    // Also a generic verb ("to manage/cope"); whole-string overrides only.
    inline: false,
    translations: {
      en: 'Haul the wind', fr: 'Serrer le vent', es: 'Ceñir el viento',
      it: 'Stringere il vento', pt: 'Cingir o vento',
    },
  },
  {
    tr: 'Alesta',
    aliases: ['Alesta!'],
    translations: {
      en: 'Stand by', de: 'Klarmachen', fr: 'Paré', es: 'Listo',
      it: 'Pronti', pt: 'Pronto', nl: 'Gereedstaan', ru: 'Приготовиться',
    },
  },

  // ── Deck equipment & fittings ──────────────────────────────────────
  {
    tr: 'Küpeşte',
    translations: {
      en: 'Bulwark', de: 'Schanzkleid', fr: 'Pavois', es: 'Amurada',
      it: 'Impavesata', pt: 'Borda-falsa', nl: 'Verschansing', ru: 'Фальшборт',
    },
  },
  {
    tr: 'Bocurgat',
    aliases: ['Bocurgat (Windlass)', 'Ircat', 'Irgat'],
    translations: {
      en: 'Windlass', de: 'Ankerspill', fr: 'Guindeau', es: 'Molinete',
      it: 'Verricello salpa àncora', pt: 'Molinete', nl: 'Ankerlier', ru: 'Брашпиль',
    },
  },
  {
    tr: 'Yeke',
    translations: {
      en: 'Tiller', de: 'Ruderpinne', fr: 'Barre franche', es: 'Caña del timón',
      it: 'Barra del timone', pt: 'Cana do leme', nl: 'Helmstok', ru: 'Румпель',
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
    },
  },
  {
    tr: 'Usturmaça',
    translations: {
      en: 'Fender', de: 'Fender', fr: 'Défense', es: 'Defensa',
      it: 'Parabordo', pt: 'Defensa', nl: 'Stootwil', ru: 'Кранец',
    },
  },
  {
    tr: 'Lumboz',
    aliases: ['Lumboz (Porthole)'],
    translations: {
      en: 'Porthole', de: 'Bullauge', fr: 'Hublot', es: 'Portilla',
      it: 'Oblò', pt: 'Vigia', nl: 'Patrijspoort', ru: 'Иллюминатор',
    },
  },
  {
    tr: 'Forkastel',
    aliases: ['Forkastel (Forecastle)'],
    translations: {
      en: 'Forecastle', de: 'Back', fr: 'Gaillard d’avant', es: 'Castillo de proa',
      it: 'Castello di prua', pt: 'Castelo de proa', nl: 'Bak', ru: 'Бак',
    },
  },

  // ── Mooring, rigging & lifting ─────────────────────────────────────
  {
    tr: 'Palamar',
    translations: {
      en: 'Mooring line', de: 'Festmacherleine', fr: 'Amarre', es: 'Amarra',
      it: 'Cima d’ormeggio', pt: 'Espia', nl: 'Meertros', ru: 'Швартов',
    },
  },
  {
    tr: 'Palanga',
    translations: {
      en: 'Tackle', de: 'Talje', fr: 'Palan', es: 'Aparejo',
      it: 'Paranco', pt: 'Talha', nl: 'Talie', ru: 'Тали',
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
    },
  },
  {
    tr: 'Posa',
    aliases: ['Posa (Shackle)'],
    // Length of anchor chain (27.5 m); also a common word, so overrides only.
    inline: false,
    translations: {
      en: 'Shackle', de: 'Kettenlänge', ru: 'Смычка',
    },
  },

  // ── Sails & vessel types ───────────────────────────────────────────
  {
    tr: 'Mayıstra',
    translations: {
      en: 'Mainsail', de: 'Großsegel', fr: 'Grand-voile', es: 'Vela mayor',
      it: 'Randa', pt: 'Vela grande', nl: 'Grootzeil', ru: 'Грот',
    },
  },
  {
    tr: 'Uskuna',
    aliases: ['Uskuna (Schooner)'],
    translations: {
      en: 'Schooner', de: 'Schoner', fr: 'Goélette', es: 'Goleta',
      it: 'Goletta', pt: 'Escuna', nl: 'Schoener', ru: 'Шхуна',
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
    },
  },
  {
    tr: 'Alabora',
    translations: {
      en: 'Capsize', de: 'Kentern', fr: 'Chavirage', es: 'Zozobra',
      it: 'Capovolgimento', pt: 'Emborcamento', nl: 'Kapseizen', ru: 'Опрокидывание',
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
    },
  },
  {
    tr: 'Kamarot',
    // Also a generic loanword; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Steward', de: 'Steward', fr: 'Garçon de cabine', es: 'Camarero',
      it: 'Cameriere di bordo', pt: 'Taifeiro', nl: 'Hofmeester', ru: 'Стюард',
    },
  },

  // ── Hull structure (frames, posts, openings) ───────────────────────
  {
    tr: 'Postalar',
    aliases: ['Postalar (Frames)', 'Posta'],
    translations: {
      en: 'Frames', de: 'Spanten', fr: 'Membrures', es: 'Cuadernas',
      it: 'Ordinate', pt: 'Cavernas', nl: 'Spanten', ru: 'Шпангоуты',
    },
  },
  {
    tr: 'Baş Bodoslama',
    aliases: ['Baş bodoslama'],
    translations: {
      en: 'Stem', de: 'Vorsteven', fr: 'Étrave', es: 'Roda',
      it: 'Ruota di prua', pt: 'Roda de proa', nl: 'Voorsteven', ru: 'Форштевень',
    },
  },
  {
    tr: 'Kıç Bodoslama',
    aliases: ['Kıç bodoslama'],
    translations: {
      en: 'Sternpost', de: 'Achtersteven', fr: 'Étambot', es: 'Codaste',
      it: 'Dritto di poppa', pt: 'Cadaste', nl: 'Achtersteven', ru: 'Ахтерштевень',
    },
  },
  {
    tr: 'Ayna Kıç',
    aliases: ['Ayna kıç'],
    translations: {
      en: 'Transom stern', de: 'Spiegelheck', fr: 'Tableau arrière',
      es: 'Popa de espejo', it: 'Poppa a specchio', pt: 'Painel de popa',
      nl: 'Spiegel', ru: 'Транцевая корма',
    },
  },
  {
    tr: 'Biça',
    // Raised edge around a hatch/opening (coaming).
    inline: false,
    translations: {
      en: 'Coaming', de: 'Süll', fr: 'Surbau', es: 'Brazola', pt: 'Braçola',
    },
  },
  {
    tr: 'Manika',
    translations: {
      en: 'Cowl ventilator', de: 'Lüfterkopf', fr: 'Manche à air',
      es: 'Manguerote de ventilación', it: 'Manica a vento',
      pt: 'Manga de ventilação', nl: 'Windkoker', ru: 'Раструб вентилятора',
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
    },
  },
  {
    tr: 'Merimek',
    translations: {
      en: 'Grapnel', de: 'Draggen', fr: 'Grappin', es: 'Rezón',
      it: 'Grappino', pt: 'Fateixa', nl: 'Dreg', ru: 'Кошка',
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
    },
  },
  {
    tr: 'Duba',
    translations: {
      en: 'Pontoon', de: 'Ponton', fr: 'Ponton', es: 'Pontón',
      it: 'Pontone', pt: 'Pontão', nl: 'Ponton', ru: 'Понтон',
    },
  },

  // ── Deck fittings & rigging ────────────────────────────────────────
  {
    tr: 'Koçboynuzu',
    aliases: ['Koç Boynuzu', 'Koç boynuzu'],
    translations: {
      en: 'Cleat', de: 'Klampe', fr: 'Taquet', es: 'Cornamusa',
      it: 'Galloccia', pt: 'Cunho', nl: 'Kikker', ru: 'Утка',
    },
  },
  {
    tr: 'Boğma',
    // Also "strangling"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Whipping', de: 'Takling', fr: 'Surliure', es: 'Falcaceadura',
      pt: 'Falcaça',
    },
  },
  {
    tr: 'Flama',
    translations: {
      en: 'Pennant', de: 'Wimpel', fr: 'Flamme', es: 'Gallardete',
      it: 'Fiamma', pt: 'Flâmula', nl: 'Wimpel', ru: 'Вымпел',
    },
  },
  {
    tr: 'Trinket',
    // Identical to the English word "trinket"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Foresail', de: 'Fock', fr: 'Misaine', es: 'Trinquete',
      it: 'Trinchetto', pt: 'Traquete', nl: 'Fok', ru: 'Фок',
    },
  },

  // ── Crew & pilotage ────────────────────────────────────────────────
  {
    tr: 'Gemiadamı',
    aliases: ['Gemi Adamı', 'Gemi adamı'],
    translations: {
      en: 'Seafarer', de: 'Seemann', fr: 'Marin', es: 'Gente de mar',
      it: 'Marittimo', pt: 'Marítimo', nl: 'Zeevarende', ru: 'Моряк',
    },
  },
  {
    tr: 'Tayfa',
    // Colloquial for "crew/gang"; whole-string overrides only.
    inline: false,
    translations: {
      en: 'Rating', de: 'Matrose', fr: 'Matelot', es: 'Marinero',
      it: 'Marinaio', pt: 'Marinheiro', nl: 'Matroos', ru: 'Матрос',
    },
  },
  {
    tr: 'Kılavuz Kaptan',
    aliases: ['Kılavuz Kaptan (Pilot)', 'Kılavuz kaptan'],
    translations: {
      en: 'Maritime pilot', de: 'Lotse', fr: 'Pilote', es: 'Práctico',
      it: 'Pilota', pt: 'Prático', nl: 'Loods', ru: 'Лоцман',
    },
  },
  {
    tr: 'Römorkör',
    translations: {
      en: 'Tug', de: 'Schlepper', fr: 'Remorqueur', es: 'Remolcador',
      it: 'Rimorchiatore', pt: 'Rebocador', nl: 'Sleepboot', ru: 'Буксир',
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
