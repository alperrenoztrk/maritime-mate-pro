export type FeedSource = {
  id: string;
  name: string;
  url: string;
};

export type NewsLocaleConfig = {
  language: string;
  countryCode: string;
  countryName: string;
  hl: string;
  ceid: string;
  queries: ReadonlyArray<{
    id: "industry" | "ports" | "safety";
    name: string;
    query: string;
    freshness: "7d" | "14d";
  }>;
};

const locale = (
  language: string,
  countryCode: string,
  countryName: string,
  hl: string,
  ceid: string,
  industry: string,
  ports: string,
  safety: string,
): NewsLocaleConfig => ({
  language,
  countryCode,
  countryName,
  hl,
  ceid,
  queries: [
    { id: "industry", name: "Maritime industry", query: industry, freshness: "7d" },
    { id: "ports", name: "Ports and logistics", query: ports, freshness: "7d" },
    { id: "safety", name: "Safety and rules", query: safety, freshness: "14d" },
  ],
});

/**
 * One regional edition for every language exposed by LanguageContext.
 * Queries deliberately use native maritime terms so Google News returns
 * publishers from the selected country's edition rather than translated
 * copies of the existing English feeds.
 */
export const NEWS_LOCALE_CONFIGS: Record<string, NewsLocaleConfig> = {
  tr: locale("tr", "TR", "Türkiye", "tr", "TR:tr", "denizcilik OR gemi OR deniz taşımacılığı", "liman OR konteyner OR deniz lojistiği", "deniz kazası OR denizci OR SOLAS OR MARPOL"),
  en: locale("en", "GB", "United Kingdom", "en-GB", "GB:en", "shipping OR maritime OR vessel", "port OR container shipping OR sea freight", "marine casualty OR seafarer OR SOLAS OR MARPOL"),
  es: locale("es", "ES", "España", "es", "ES:es", "marítimo OR naviera OR buque", "puerto OR contenedores OR logística marítima", "accidente marítimo OR marinos OR SOLAS OR MARPOL"),
  de: locale("de", "DE", "Deutschland", "de", "DE:de", "Schifffahrt OR Reederei OR Schiff", "Hafen OR Container OR Seefracht", "Seeunfall OR Seeleute OR SOLAS OR MARPOL"),
  fr: locale("fr", "FR", "France", "fr", "FR:fr", "maritime OR armateur OR navire", "port OR conteneur OR fret maritime", "accident maritime OR marin OR SOLAS OR MARPOL"),
  it: locale("it", "IT", "Italia", "it", "IT:it", "marittimo OR armatore OR nave", "porto OR container OR logistica marittima", "incidente marittimo OR marittimi OR SOLAS OR MARPOL"),
  pt: locale("pt", "PT", "Portugal", "pt-PT", "PT:pt-150", "marítimo OR armador OR navio", "porto OR contentor OR logística marítima", "acidente marítimo OR marítimos OR SOLAS OR MARPOL"),
  ja: locale("ja", "JP", "日本", "ja", "JP:ja", "海運 OR 船舶 OR 海事", "港湾 OR コンテナ OR 物流", "海難 OR 船員 OR SOLAS OR MARPOL"),
  ko: locale("ko", "KR", "대한민국", "ko", "KR:ko", "해운 OR 선박 OR 해양", "항만 OR 컨테이너 OR 물류", "해양 사고 OR 선원 OR SOLAS OR MARPOL"),
  "zh-CN": locale("zh-CN", "CN", "中国", "zh-CN", "CN:zh-Hans", "航运 OR 船舶 OR 海事", "港口 OR 集装箱 OR 物流", "海难 OR 船员 OR SOLAS OR MARPOL"),
  nl: locale("nl", "NL", "Nederland", "nl", "NL:nl", "scheepvaart OR rederij OR schip", "haven OR container OR zeevracht", "scheepsongeval OR zeevarenden OR SOLAS OR MARPOL"),
  sv: locale("sv", "SE", "Sverige", "sv", "SE:sv", "sjöfart OR rederi OR fartyg", "hamn OR container OR sjöfrakt", "sjöolycka OR sjömän OR SOLAS OR MARPOL"),
  no: locale("no", "NO", "Norge", "no", "NO:no", "skipsfart OR rederi OR skip", "havn OR container OR sjøfrakt", "sjøulykke OR sjøfolk OR SOLAS OR MARPOL"),
  da: locale("da", "DK", "Danmark", "da", "DK:da", "skibsfart OR rederi OR skib", "havn OR container OR søfragt", "søulykke OR søfarende OR SOLAS OR MARPOL"),
  fi: locale("fi", "FI", "Suomi", "fi", "FI:fi", "merenkulku OR varustamo OR alus", "satama OR kontti OR merirahti", "merionnettomuus OR merenkulkija OR SOLAS OR MARPOL"),
  pl: locale("pl", "PL", "Polska", "pl", "PL:pl", "żegluga OR armator OR statek", "port OR kontener OR fracht morski", "wypadek morski OR marynarze OR SOLAS OR MARPOL"),
  cs: locale("cs", "CZ", "Česko", "cs", "CZ:cs", "námořní doprava OR rejdařství OR loď", "přístav OR kontejner OR námořní přeprava", "námořní nehoda OR námořník OR SOLAS OR MARPOL"),
  hu: locale("hu", "HU", "Magyarország", "hu", "HU:hu", "hajózás OR hajótársaság OR hajó", "kikötő OR konténer OR tengeri fuvar", "tengeri baleset OR tengerész OR SOLAS OR MARPOL"),
  ro: locale("ro", "RO", "România", "ro", "RO:ro", "maritim OR armator OR navă", "port OR container OR transport maritim", "accident maritim OR navigator OR SOLAS OR MARPOL"),
};

const LANGUAGE_ALIASES: Record<string, string> = {
  nb: "no",
  nn: "no",
  zh: "zh-CN",
  "zh-hans": "zh-CN",
  "zh-cn": "zh-CN",
};

export function resolveNewsLocale(value: unknown): NewsLocaleConfig {
  const raw = typeof value === "string" ? value.trim().replace(/_/g, "-").toLowerCase() : "";
  const exactKey = Object.keys(NEWS_LOCALE_CONFIGS).find((key) => key.toLowerCase() === raw);
  const alias = LANGUAGE_ALIASES[raw] || LANGUAGE_ALIASES[raw.split("-")[0]];
  const base = raw.split("-")[0];
  return NEWS_LOCALE_CONFIGS[exactKey || alias || base] || NEWS_LOCALE_CONFIGS.en;
}

export function buildRegionalFeeds(config: NewsLocaleConfig): FeedSource[] {
  const languageId = config.language.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return config.queries.map((entry) => {
    const params = new URLSearchParams({
      q: `${entry.query} when:${entry.freshness}`,
      hl: config.hl,
      gl: config.countryCode,
      ceid: config.ceid,
    });
    return {
      id: `regional-${languageId}-${entry.id}`,
      name: `${config.countryName} · ${entry.name}`,
      url: `https://news.google.com/rss/search?${params.toString()}`,
    };
  });
}

export function getFeedsForLanguage(language: unknown, englishFeeds: FeedSource[]): {
  locale: NewsLocaleConfig;
  feeds: FeedSource[];
} {
  const resolved = resolveNewsLocale(language);
  const regionalFeeds = buildRegionalFeeds(resolved);
  return {
    locale: resolved,
    // Keep the established international/English sources available in the
    // English edition; all other editions are intentionally regional-only.
    feeds: resolved.language === "en" ? [...englishFeeds, ...regionalFeeds] : regionalFeeds,
  };
}
