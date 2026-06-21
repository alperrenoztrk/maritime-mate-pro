import type { SourceRef } from "@/data/courseContent/types";

/**
 * Senaryo / Vaka pratiği modeli ("Dersler Beta").
 *
 * Dallanan karar-ağacı: "Vardiyadasın, X oldu, ne yaparsın?" Her seçim gerçek
 * kural referansıyla (COLREG/STCW/SOLAS) öğretici geri bildirim verir. Amaç,
 * teoriyi gemi pratiğine bağlamaktır.
 */

export type ChoiceOutcome = "safe" | "risky" | "danger";

export interface ScenarioChoice {
  text: string;
  /** Seçimin niteliği — renk/ikon ve geri bildirim tonu için. */
  outcome: ChoiceOutcome;
  /** Bu seçimin NEDEN doğru/yanlış olduğunun öğretici açıklaması. */
  feedback: string;
  /** Gerçek kural atfı (uydurma kural engellemek için). */
  source?: SourceRef;
  /** Sonraki adımın id'si; verilmezse senaryo biter (debrief gösterilir). */
  next?: string;
}

export interface ScenarioStep {
  id: string;
  /** O anki durumun anlatımı. */
  situation: string;
  /** İsteğe bağlı diyagram (public/diagrams veya import path). */
  image?: string;
  question: string;
  choices: ScenarioChoice[];
}

export interface Scenario {
  id: string;
  title: string;
  level: "cadet" | "officer";
  /** Birleşik registry anahtarı / kategori id (örn. "navigation"). */
  topicKey: string;
  /** Başlangıç brifingi (durumun kurulması). */
  briefing: string;
  learningGoals: string[];
  /** steps[0] başlangıç adımıdır; akış `next` ile ilerler. */
  steps: ScenarioStep[];
  /** Kapanış dersi: kural özeti + çıkarımlar. */
  debrief: string;
}
