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
    aliases: ['Demir (Çapa)'],
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
    translations: {
      en: 'Current', de: 'Strömung', fr: 'Courant', es: 'Corriente',
      it: 'Corrente', pt: 'Corrente', nl: 'Stroming', ru: 'Течение',
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
