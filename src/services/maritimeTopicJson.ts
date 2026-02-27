export interface MaritimeFormula {
  name: string;
  expression: string;
  units: string;
  notes: string;
}

export interface MaritimeWorkedExample {
  problem: string;
  given: string;
  solutionSteps: string;
  result: string;
  interpretation: string;
}

export interface MaritimeVisual {
  title: string;
  type: "svg";
  visualFingerprint: string;
  svgSpec: string;
}

export interface MaritimeTopicPayload {
  mainTopic: string;
  subTopic: string;
  content: {
    narrative: string;
    formulas: MaritimeFormula[];
    workedExample: MaritimeWorkedExample;
    visuals: MaritimeVisual[];
    qualityChecklist: {
      hasNarrative: boolean;
      hasFormulas: boolean;
      hasWorkedExample: boolean;
      hasInterpretation: boolean;
      hasVisual: boolean;
    };
  };
}

const REQUIRED_CHECKS: Array<keyof MaritimeTopicPayload["content"]["qualityChecklist"]> = [
  "hasNarrative",
  "hasFormulas",
  "hasWorkedExample",
  "hasInterpretation",
  "hasVisual",
];

export function buildMaritimeTopicPrompt(args: {
  mainTopic: string;
  subTopic: string;
  courseContext: string;
  extraConstraints?: string;
  usedVisualFingerprints?: string[];
}): string {
  const {
    mainTopic,
    subTopic,
    courseContext,
    extraConstraints = "Yok",
    usedVisualFingerprints = [],
  } = args;

  return [
    "Rolün: Marine Expert için denizcilik konu anlatımı klonlayıcısı. Çıktı yalnızca geçerli JSON olmalı.",
    "Hedef kitle: denizcilik öğrencileri ve aktif denizciler. Dil: kitap dili; teknik ama okunabilir; akıcı.",
    "Zorunlu kurallar:",
    "Her çağrıda sadece 1 alt başlık üret.",
    "Sadece verilen ana başlık ve alt başlık adını kullan. Yeni başlık ekleme, sıralamayı değiştirme, atlama yapma.",
    "Her alt başlıkta konu anlatımı, tüm hesap formülleri, en az 1 tam çözümlü sayısal örnek, sonuç yorumu bulunmalı.",
    "Formüllerde alt çizgi karakteri kullanma.",
    "Madde işareti, emoji, ikon ve yönlendirme kalıpları kullanma.",
    "Görsel zorunlu: konuya birebir bağlı en az 1 SVG üretim talimatı ver. Süs görseli üretme.",
    "Yöntem sınırlarını, hata kaynaklarını ve pratik riskleri belirt.",
    "JSON şeması: { mainTopic, subTopic, content: { narrative, formulas, workedExample, visuals, qualityChecklist } }",
    "Kalite kontrol notu: JSON parse ve qualityChecklist doğrulaması geçmezse içerik kaydedilmez.",
    "Kalite kontrol notu: visualFingerprint daha önce kullanıldıysa içerik reddedilir ve yeniden üretilir.",
    "Kalite kontrol notu: formulas expression alanında alt çizgi karakteri tespit edilirse içerik reddedilir.",
    `Ana başlık: ${mainTopic}`,
    `Alt başlık: ${subTopic}`,
    `Ders bağlamı: ${courseContext}`,
    `Kısıtlar: ${extraConstraints}`,
    `Daha önce kullanılan visualFingerprint listesi: ${usedVisualFingerprints.join(", ") || "Yok"}`,
  ].join("\n");
}

export function validateMaritimeTopicJson(input: string, usedVisualFingerprints: string[] = []): MaritimeTopicPayload {
  let parsed: unknown;

  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error("JSON parse hatası: içerik geçerli JSON değil.");
  }

  const payload = parsed as Partial<MaritimeTopicPayload>;

  if (!payload.mainTopic || !payload.subTopic || !payload.content) {
    throw new Error("Şema hatası: mainTopic, subTopic veya content eksik.");
  }

  if (!payload.content.narrative || typeof payload.content.narrative !== "string") {
    throw new Error("Şema hatası: content.narrative metni zorunludur.");
  }

  if (!Array.isArray(payload.content.formulas) || payload.content.formulas.length === 0) {
    throw new Error("Şema hatası: content.formulas en az bir formül içermelidir.");
  }

  for (const formula of payload.content.formulas) {
    if (!formula.expression || formula.expression.includes("_")) {
      throw new Error("Doğrulama hatası: formulas expression alanında alt çizgi karakteri kullanılamaz.");
    }
  }

  if (!payload.content.workedExample?.interpretation) {
    throw new Error("Şema hatası: workedExample.interpretation zorunludur.");
  }

  if (!Array.isArray(payload.content.visuals) || payload.content.visuals.length === 0) {
    throw new Error("Şema hatası: content.visuals en az bir SVG görseli içermelidir.");
  }

  const usedSet = new Set(usedVisualFingerprints);
  for (const visual of payload.content.visuals) {
    if (visual.type !== "svg") {
      throw new Error("Doğrulama hatası: visuals type değeri svg olmalıdır.");
    }
    if (usedSet.has(visual.visualFingerprint)) {
      throw new Error(`Doğrulama hatası: visualFingerprint tekrar ediyor (${visual.visualFingerprint}).`);
    }
  }

  for (const check of REQUIRED_CHECKS) {
    if (!payload.content.qualityChecklist || payload.content.qualityChecklist[check] !== true) {
      throw new Error(`Kalite kontrol hatası: qualityChecklist.${check} true olmalıdır.`);
    }
  }

  return payload as MaritimeTopicPayload;
}
