/**
 * Small, curated translations for persistent chrome and the highest-traffic
 * library screens.
 *
 * The application content is authored in Turkish and normally resolved from
 * the large per-language dictionaries in public/locales. Persistent chrome is
 * different: it is visible before a route dictionary settles and must never
 * display a mixture of Turkish and the selected language. Keep that tiny set
 * here so it can be rendered synchronously and offline.
 *
 * English also has a curated overlay for strings introduced by the iOS shell
 * after the last full locale generation. Without this overlay, those exact
 * strings remain Turkish even though the rest of the route is translated.
 */

export const CORE_UI_LANGUAGE_CODES = [
  "tr",
  "en",
  "es",
  "de",
  "fr",
  "it",
  "pt",
  "ru",
  "ja",
  "ko",
  "zh-CN",
  "ar",
  "hi",
  "nl",
  "sv",
  "no",
  "da",
  "fi",
  "pl",
  "cs",
  "hu",
  "ro",
  "el",
  "bg",
  "uk",
] as const;

export type CoreUiLanguageCode = (typeof CORE_UI_LANGUAGE_CODES)[number];

const SHELL_SOURCE_TO_INDEX: Readonly<Record<string, number>> = {
  "Ana bölümler": 0,
  "Ana Sayfa": 1,
  Öğren: 2,
  Araçlar: 3,
  Kütüphane: 4,
  Kitaplık: 4,
  Ara: 5,
  "Uygulamada ara": 6,
  Geri: 7,
  "Geri dön": 7,
};

// Order: main sections, home, learn, tools, library, search, search in app, back.
// These labels are deliberately concise so they remain legible at 200% text.
export const SHELL_COPY_BY_LANGUAGE: Readonly<Record<CoreUiLanguageCode, readonly string[]>> = {
  tr: ["Ana bölümler", "Ana Sayfa", "Öğren", "Araçlar", "Kütüphane", "Ara", "Uygulamada ara", "Geri"],
  en: ["Main sections", "Home", "Learn", "Tools", "Library", "Search", "Search in the app", "Back"],
  es: ["Secciones principales", "Inicio", "Aprender", "Herramientas", "Biblioteca", "Buscar", "Buscar en la aplicación", "Atrás"],
  de: ["Hauptbereiche", "Start", "Lernen", "Werkzeuge", "Bibliothek", "Suchen", "In der App suchen", "Zurück"],
  fr: ["Sections principales", "Accueil", "Apprendre", "Outils", "Bibliothèque", "Rechercher", "Rechercher dans l’application", "Retour"],
  it: ["Sezioni principali", "Home", "Impara", "Strumenti", "Biblioteca", "Cerca", "Cerca nell’app", "Indietro"],
  pt: ["Seções principais", "Início", "Aprender", "Ferramentas", "Biblioteca", "Pesquisar", "Pesquisar no aplicativo", "Voltar"],
  ru: ["Основные разделы", "Главная", "Учиться", "Инструменты", "Библиотека", "Поиск", "Поиск в приложении", "Назад"],
  ja: ["メインセクション", "ホーム", "学ぶ", "ツール", "ライブラリ", "検索", "アプリ内を検索", "戻る"],
  ko: ["주요 섹션", "홈", "학습", "도구", "라이브러리", "검색", "앱에서 검색", "뒤로"],
  "zh-CN": ["主要部分", "首页", "学习", "工具", "资料库", "搜索", "在应用中搜索", "返回"],
  ar: ["الأقسام الرئيسية", "الرئيسية", "تعلّم", "الأدوات", "المكتبة", "بحث", "البحث في التطبيق", "رجوع"],
  hi: ["मुख्य अनुभाग", "होम", "सीखें", "उपकरण", "लाइब्रेरी", "खोजें", "ऐप में खोजें", "वापस"],
  nl: ["Hoofdonderdelen", "Home", "Leren", "Hulpmiddelen", "Bibliotheek", "Zoeken", "Zoeken in de app", "Terug"],
  sv: ["Huvudavsnitt", "Hem", "Lär dig", "Verktyg", "Bibliotek", "Sök", "Sök i appen", "Tillbaka"],
  no: ["Hovedseksjoner", "Hjem", "Lær", "Verktøy", "Bibliotek", "Søk", "Søk i appen", "Tilbake"],
  da: ["Hovedsektioner", "Hjem", "Lær", "Værktøjer", "Bibliotek", "Søg", "Søg i appen", "Tilbage"],
  fi: ["Pääosiot", "Koti", "Opi", "Työkalut", "Kirjasto", "Haku", "Hae sovelluksesta", "Takaisin"],
  pl: ["Główne sekcje", "Strona główna", "Nauka", "Narzędzia", "Biblioteka", "Szukaj", "Szukaj w aplikacji", "Wstecz"],
  cs: ["Hlavní sekce", "Domů", "Učení", "Nástroje", "Knihovna", "Hledat", "Hledat v aplikaci", "Zpět"],
  hu: ["Fő részek", "Kezdőlap", "Tanulás", "Eszközök", "Könyvtár", "Keresés", "Keresés az alkalmazásban", "Vissza"],
  ro: ["Secțiuni principale", "Acasă", "Învață", "Instrumente", "Bibliotecă", "Caută", "Caută în aplicație", "Înapoi"],
  el: ["Κύριες ενότητες", "Αρχική", "Μάθηση", "Εργαλεία", "Βιβλιοθήκη", "Αναζήτηση", "Αναζήτηση στην εφαρμογή", "Πίσω"],
  bg: ["Основни раздели", "Начало", "Учене", "Инструменти", "Библиотека", "Търсене", "Търсене в приложението", "Назад"],
  uk: ["Основні розділи", "Головна", "Навчання", "Інструменти", "Бібліотека", "Пошук", "Пошук у застосунку", "Назад"],
};

/** English copy audited against the rendered home, lessons, calculations,
 * library, ship-systems, glossary and global-search flows. */
export const ENGLISH_CORE_SCREEN_COPY: Readonly<Record<string, string>> = {
  "Denizcilik çalışma alanı": "Maritime workspace",
  "Dersler, hesaplama araçları ve operasyonel kaynaklar tek, sakin bir çalışma alanında.":
    "Lessons, calculation tools, and operational references in one calm workspace.",
  Özet: "Overview",
  Haberler: "News",
  "Widget'lar": "Widgets",
  "Ana ekran görünümü": "Home view",
  "Hızlı Erişim": "Quick Access",
  "Sık kullanılan bölümler": "Frequently used sections",
  Dersler: "Lessons",
  "Güverte ve makine": "Deck and engine",
  Alıştırmalar: "Exercises",
  "Bilgini pekiştir": "Reinforce your knowledge",
  Personel: "Crew",
  "Roller ve görevler": "Roles and duties",
  "Gemi Sistemleri": "Ship Systems",
  "Sistem başvuruları": "System references",
  Operasyonlar: "Operations",
  "Gemi operasyonları": "Ship operations",
  Sözlük: "Glossary",
  "Denizcilik terimleri": "Maritime terms",
  Beta: "Beta",
  "Yeni özellikler": "New features",
  Notlar: "Notes",
  "Kişisel notların": "Your personal notes",
  Ayarlar: "Settings",
  "Uygulama tercihleri": "App preferences",
  "Güverte Kitaplığı": "Deck Library",
  "Makine Kitaplığı": "Engine Library",
  "Dersler ana ekranına dön": "Return to the lessons home",
  "Operasyonel Kaynaklar": "Operational References",
  "Hızlı Başvuru": "Quick Reference",
  "Personel ve Görevler": "Crew and Duties",
  Köprüüstü: "Bridge",
  "Köprüüstü Cihazları": "Bridge Equipment",
  "Gemi Görevleri": "Shipboard Duties",
  "Gemi Operasyonları": "Ship Operations",
  "Makine Bölümü": "Engineering Department",
  "Denizcilik Sözlüğü": "Maritime Glossary",
  Mevzuat: "Regulations",
  "Geçiş Planı": "Passage Planning",
  "İşaret ve Haberleşme": "Signals and Communications",
  "Gemi Sistemleri ve Ekipmanları": "Ship Systems and Equipment",
  "Konu veya ekipman ara…": "Search topics or equipment…",
  "Gemi sistemlerinde ara": "Search ship systems",
  "Arama Sonuçları": "Search Results",
  "Eşleşen konu bulunamadı.": "No matching topic found.",
  "Denizcilik Terimleri Sözlüğü": "Maritime Glossary",
  "Terim ara…": "Search terms…",
  "Denizcilik terimlerinde ara": "Search maritime terms",
  Kategoriler: "Categories",
  "Aradığınız terim bulunamadı.": "The term you searched for was not found.",
  Hesaplamalar: "Calculations",
  "Hesaplama ara…": "Search calculations…",
  "Hesaplamalarda ara": "Search calculations",
  "Hesaplama kategorilerine dön": "Return to calculation categories",
  Favoriler: "Favorites",
  "Son Kullanılan": "Recently Used",
  "Hızlı Araçlar": "Quick Tools",
  "Aramanızla eşleşen hesaplama bulunamadı.": "No calculation matched your search.",
  "Navigasyon ve Seyir": "Navigation and Watchkeeping",
  "Yük ve Stabilite": "Cargo and Stability",
  "Makine ve Tüketim": "Engineering and Consumption",
  "Formüller ve Dönüştürücüler": "Formulas and Converters",
  "Draft Hesabı": "Draft Calculation",
  "Stabilite / Trim": "Stability / Trim",
  "Yakıt Tüketimi": "Fuel Consumption",
  "Sefer Süresi": "Voyage Duration",
  "Yük Dağılımı": "Cargo Distribution",
  "Birim Dönüştürücü": "Unit Converter",
  "Favorilere ekle": "Add to favorites",
  "Favorilerden çıkar": "Remove from favorites",
  "Sayfa, hesaplama veya konu ara…": "Search pages, calculations, or topics…",
  "Sayfa, konu, terim veya düğüm ara…": "Search pages, topics, terms, or nodes…",
  "Son aramalar": "Recent Searches",
  Öneriler: "Suggestions",
  "İçerik dizini yükleniyor…": "Loading content index…",
  "Sonuç bulunamadı": "No results found",
  "↑↓ gezin": "↑↓ navigate",
  "↵ aç": "↵ open",
  "esc kapat": "esc close",
  "İçerik dizini yükleniyor": "Loading content index",
};

export const ENGLISH_CORE_UI_AUDIT_SOURCES = Object.freeze(
  Object.keys(ENGLISH_CORE_SCREEN_COPY),
);

const isCoreUiLanguage = (languageCode: string): languageCode is CoreUiLanguageCode =>
  (CORE_UI_LANGUAGE_CODES as readonly string[]).includes(languageCode);

export const getCoreUiTranslation = (
  source: string,
  languageCode: string,
): string | null => {
  if (!source || !languageCode) return null;
  if (languageCode === "tr") return source;

  const shellIndex = SHELL_SOURCE_TO_INDEX[source];
  if (shellIndex !== undefined && isCoreUiLanguage(languageCode)) {
    return SHELL_COPY_BY_LANGUAGE[languageCode][shellIndex] ?? null;
  }

  if (languageCode === "en") {
    return ENGLISH_CORE_SCREEN_COPY[source] ?? null;
  }

  return null;
};
