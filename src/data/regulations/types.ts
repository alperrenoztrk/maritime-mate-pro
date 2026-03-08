export type RegulationCategory =
  | "IMO Sözleşmeleri"
  | "Emniyet Kodları"
  | "Çevresel Düzenlemeler"
  | "Denetim & Sörvey"
  | "Gemi Sertifikaları"
  | "Bölgesel Düzenlemeler";

export type RegulationAmendment = {
  year: string;
  description: string;
};

export type RegulationKeyArticle = {
  id: string;
  title: string;
  summary: string;
};

export type RegulationItem = {
  slug: string;
  label: string;
  category: RegulationCategory;
  overview: string;
  essentials: string[];
  actions: string[];
  resources?: { label: string; href: string }[];
  // ── New comprehensive fields ──
  history?: string;
  applicability?: string[];
  amendments?: RegulationAmendment[];
  keyArticles?: RegulationKeyArticle[];
  penalties?: string[];
  relatedSlugs?: string[];
};
