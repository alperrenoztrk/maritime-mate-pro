import React, { useState } from "react";
import { ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import { useLanguage } from "@/contexts/useLanguage";
import { stripMarkdown } from "@/utils/cleanText";
import { ReportAiContentButton } from "@/components/ai/ReportAiContentButton";
import { requireConsent } from "@/lib/consent";

// UI string translations for all 25 supported languages
const UI_TRANSLATIONS: Record<string, {
  quickQuestions: string;
  writeQuestion: string;
  send: string;
  preparing: string;
  response: string;
  pleaseWrite: string;
  noResponse: string;
  errorOccurred: string;
  defaultPlaceholder: string;
}> = {
  tr: {
    quickQuestions: "Quick Questions",
    writeQuestion: "Write Your Question",
    send: "Send",
    preparing: "The answer is being prepared...",
    response: "Reply",
    pleaseWrite: "Please write a question",
    noResponse: "No response received",
    errorOccurred: "An error occurred while receiving the response",
    defaultPlaceholder: "Write your question...",
  },
  en: {
    quickQuestions: "Quick Questions",
    writeQuestion: "Write Your Question",
    send: "Send",
    preparing: "Preparing response...",
    response: "Response",
    pleaseWrite: "Please write a question",
    noResponse: "Could not get response",
    errorOccurred: "An error occurred while getting the response",
    defaultPlaceholder: "Write your question...",
  },
  es: {
    quickQuestions: "Preguntas Rápidas",
    writeQuestion: "Escriba su Pregunta",
    send: "Enviar",
    preparing: "Preparando respuesta...",
    response: "Respuesta",
    pleaseWrite: "Por favor escriba una pregunta",
    noResponse: "No se pudo obtener respuesta",
    errorOccurred: "Ocurrió un error al obtener la respuesta",
    defaultPlaceholder: "Escriba su pregunta...",
  },
  de: {
    quickQuestions: "Schnellfragen",
    writeQuestion: "Ihre Frage eingeben",
    send: "Senden",
    preparing: "Antwort wird vorbereitet...",
    response: "Antwort",
    pleaseWrite: "Bitte schreiben Sie eine Frage",
    noResponse: "Antwort konnte nicht abgerufen werden",
    errorOccurred: "Beim Abrufen der Antwort ist ein Fehler aufgetreten",
    defaultPlaceholder: "Schreiben Sie Ihre Frage...",
  },
  fr: {
    quickQuestions: "Questions Rapides",
    writeQuestion: "Rédigez votre question",
    send: "Envoyer",
    preparing: "Préparation de la réponse...",
    response: "Réponse",
    pleaseWrite: "Veuillez écrire une question",
    noResponse: "Impossible d'obtenir une réponse",
    errorOccurred: "Une erreur s'est produite lors de l'obtention de la réponse",
    defaultPlaceholder: "Rédigez votre question...",
  },
  it: {
    quickQuestions: "Domande Rapide",
    writeQuestion: "Scrivi la tua domanda",
    send: "Invia",
    preparing: "Preparazione risposta...",
    response: "Risposta",
    pleaseWrite: "Si prega di scrivere una domanda",
    noResponse: "Impossibile ottenere risposta",
    errorOccurred: "Si è verificato un errore durante il recupero della risposta",
    defaultPlaceholder: "Scrivi la tua domanda...",
  },
  pt: {
    quickQuestions: "Perguntas Rápidas",
    writeQuestion: "Escreva sua pergunta",
    send: "Enviar",
    preparing: "Preparando resposta...",
    response: "Resposta",
    pleaseWrite: "Por favor escreva uma pergunta",
    noResponse: "Não foi possível obter resposta",
    errorOccurred: "Ocorreu um erro ao obter a resposta",
    defaultPlaceholder: "Escreva sua pergunta...",
  },
  ru: {
    quickQuestions: "Быстрые вопросы",
    writeQuestion: "Введите ваш вопрос",
    send: "Отправить",
    preparing: "Подготовка ответа...",
    response: "Ответ",
    pleaseWrite: "Пожалуйста, введите вопрос",
    noResponse: "Не удалось получить ответ",
    errorOccurred: "Произошла ошибка при получении ответа",
    defaultPlaceholder: "Введите ваш вопрос...",
  },
  ja: {
    quickQuestions: "クイック質問",
    writeQuestion: "質問を入力してください",
    send: "送信",
    preparing: "回答を準備中...",
    response: "回答",
    pleaseWrite: "質問を入力してください",
    noResponse: "回答を取得できませんでした",
    errorOccurred: "回答の取得中にエラーが発生しました",
    defaultPlaceholder: "質問を入力してください...",
  },
  ko: {
    quickQuestions: "빠른 질문",
    writeQuestion: "질문을 입력하세요",
    send: "전송",
    preparing: "답변 준비 중...",
    response: "답변",
    pleaseWrite: "질문을 입력해 주세요",
    noResponse: "답변을 가져올 수 없습니다",
    errorOccurred: "답변을 가져오는 중 오류가 발생했습니다",
    defaultPlaceholder: "질문을 입력하세요...",
  },
  "zh-CN": {
    quickQuestions: "快速提问",
    writeQuestion: "输入您的问题",
    send: "发送",
    preparing: "准备回答中...",
    response: "回答",
    pleaseWrite: "请输入问题",
    noResponse: "无法获取回答",
    errorOccurred: "获取回答时出错",
    defaultPlaceholder: "输入您的问题...",
  },
  ar: {
    quickQuestions: "أسئلة سريعة",
    writeQuestion: "اكتب سؤالك",
    send: "إرسال",
    preparing: "جارٍ إعداد الإجابة...",
    response: "الإجابة",
    pleaseWrite: "يرجى كتابة سؤال",
    noResponse: "تعذّر الحصول على الإجابة",
    errorOccurred: "حدث خطأ أثناء الحصول على الإجابة",
    defaultPlaceholder: "اكتب سؤالك...",
  },
  hi: {
    quickQuestions: "त्वरित प्रश्न",
    writeQuestion: "अपना प्रश्न लिखें",
    send: "भेजें",
    preparing: "उत्तर तैयार हो रहा है...",
    response: "उत्तर",
    pleaseWrite: "कृपया एक प्रश्न लिखें",
    noResponse: "उत्तर प्राप्त नहीं हो सका",
    errorOccurred: "उत्तर प्राप्त करने में त्रुटि हुई",
    defaultPlaceholder: "अपना प्रश्न लिखें...",
  },
  nl: {
    quickQuestions: "Snelle vragen",
    writeQuestion: "Schrijf uw vraag",
    send: "Verzenden",
    preparing: "Antwoord voorbereiden...",
    response: "Antwoord",
    pleaseWrite: "Schrijf alstublieft een vraag",
    noResponse: "Kon geen antwoord krijgen",
    errorOccurred: "Er is een fout opgetreden bij het ophalen van het antwoord",
    defaultPlaceholder: "Schrijf uw vraag...",
  },
  sv: {
    quickQuestions: "Snabbfrågor",
    writeQuestion: "Skriv din fråga",
    send: "Skicka",
    preparing: "Förbereder svar...",
    response: "Svar",
    pleaseWrite: "Skriv en fråga",
    noResponse: "Kunde inte få svar",
    errorOccurred: "Ett fel uppstod vid hämtning av svaret",
    defaultPlaceholder: "Skriv din fråga...",
  },
  no: {
    quickQuestions: "Raske spørsmål",
    writeQuestion: "Skriv spørsmålet ditt",
    send: "Send",
    preparing: "Forbereder svar...",
    response: "Svar",
    pleaseWrite: "Vennligst skriv et spørsmål",
    noResponse: "Kunne ikke hente svar",
    errorOccurred: "Det oppstod en feil ved henting av svaret",
    defaultPlaceholder: "Skriv spørsmålet ditt...",
  },
  da: {
    quickQuestions: "Hurtige spørgsmål",
    writeQuestion: "Skriv dit spørgsmål",
    send: "Send",
    preparing: "Forbereder svar...",
    response: "Svar",
    pleaseWrite: "Skriv venligst et spørgsmål",
    noResponse: "Kunne ikke hente svar",
    errorOccurred: "Der opstod en fejl ved hentning af svaret",
    defaultPlaceholder: "Skriv dit spørgsmål...",
  },
  fi: {
    quickQuestions: "Pikaviestit",
    writeQuestion: "Kirjoita kysymyksesi",
    send: "Lähetä",
    preparing: "Valmistellaan vastausta...",
    response: "Vastaus",
    pleaseWrite: "Kirjoita kysymys",
    noResponse: "Vastausta ei saatu",
    errorOccurred: "Virhe vastauksen haussa",
    defaultPlaceholder: "Kirjoita kysymyksesi...",
  },
  pl: {
    quickQuestions: "Szybkie pytania",
    writeQuestion: "Napisz swoje pytanie",
    send: "Wyślij",
    preparing: "Przygotowywanie odpowiedzi...",
    response: "Odpowiedź",
    pleaseWrite: "Proszę napisać pytanie",
    noResponse: "Nie udało się uzyskać odpowiedzi",
    errorOccurred: "Wystąpił błąd podczas pobierania odpowiedzi",
    defaultPlaceholder: "Napisz swoje pytanie...",
  },
  cs: {
    quickQuestions: "Rychlé otázky",
    writeQuestion: "Napište svou otázku",
    send: "Odeslat",
    preparing: "Příprava odpovědi...",
    response: "Odpověď",
    pleaseWrite: "Prosím napište otázku",
    noResponse: "Nepodařilo se získat odpověď",
    errorOccurred: "Při získávání odpovědi došlo k chybě",
    defaultPlaceholder: "Napište svou otázku...",
  },
  hu: {
    quickQuestions: "Gyors kérdések",
    writeQuestion: "Írja be kérdését",
    send: "Küldés",
    preparing: "Válasz előkészítése...",
    response: "Válasz",
    pleaseWrite: "Kérjük, írjon kérdést",
    noResponse: "Nem sikerült választ kapni",
    errorOccurred: "Hiba történt a válasz lekérése közben",
    defaultPlaceholder: "Írja be kérdését...",
  },
  ro: {
    quickQuestions: "Întrebări rapide",
    writeQuestion: "Scrieți întrebarea dvs.",
    send: "Trimite",
    preparing: "Se pregătește răspunsul...",
    response: "Răspuns",
    pleaseWrite: "Vă rugăm să scrieți o întrebare",
    noResponse: "Nu s-a putut obține un răspuns",
    errorOccurred: "A apărut o eroare la obținerea răspunsului",
    defaultPlaceholder: "Scrieți întrebarea dvs....",
  },
  el: {
    quickQuestions: "Γρήγορες ερωτήσεις",
    writeQuestion: "Γράψτε την ερώτησή σας",
    send: "Αποστολή",
    preparing: "Προετοιμασία απάντησης...",
    response: "Απάντηση",
    pleaseWrite: "Παρακαλώ γράψτε μια ερώτηση",
    noResponse: "Αδυναμία λήψης απάντησης",
    errorOccurred: "Παρουσιάστηκε σφάλμα κατά τη λήψη απάντησης",
    defaultPlaceholder: "Γράψτε την ερώτησή σας...",
  },
  bg: {
    quickQuestions: "Бързи въпроси",
    writeQuestion: "Напишете въпроса си",
    send: "Изпращане",
    preparing: "Подготовка на отговора...",
    response: "Отговор",
    pleaseWrite: "Моля, напишете въпрос",
    noResponse: "Не може да се получи отговор",
    errorOccurred: "Възникна грешка при получаването на отговора",
    defaultPlaceholder: "Напишете въпроса си...",
  },
  uk: {
    quickQuestions: "Швидкі запитання",
    writeQuestion: "Напишіть своє запитання",
    send: "Надіслати",
    preparing: "Підготовка відповіді...",
    response: "Відповідь",
    pleaseWrite: "Будь ласка, напишіть запитання",
    noResponse: "Не вдалося отримати відповідь",
    errorOccurred: "Виникла помилка при отриманні відповіді",
    defaultPlaceholder: "Напишіть своє запитання...",
  },
};

interface AssistantInterfaceProps {
  title: string;
  /** @deprecated The title already names the assistant. */
  badge?: string;
  quickPrompts: string[];
  systemPrompt: string;
  placeholder?: string;
  icon: LucideIcon;
  /** @deprecated Kept for existing callers; the shared tool shell sets the colours. */
  accentGradient?: string;
  /** @deprecated */
  iconColor?: string;
}

export function AssistantInterface({
  title,
  quickPrompts,
  systemPrompt,
  placeholder,
  icon: Icon,
}: AssistantInterfaceProps) {
  const { currentLanguage } = useLanguage();
  const ui = UI_TRANSLATIONS[currentLanguage] ?? UI_TRANSLATIONS.en;
  const effectivePlaceholder = placeholder ?? ui.defaultPlaceholder;

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const strictFormatRules = `
MANDATORY FORMAT RULES:
- IMPORTANT: Always respond in the same language as the user's question. If the user writes in English, respond in English. If in Turkish, respond in Turkish. If in Spanish, respond in Spanish. Match the user's language exactly.
- Do not use "#" or "*" characters in responses.
- Use "-" for bullet points if needed.
- If the user asks for a formula, write only the formula(s).
- In formula responses, do not include explanations, headings, notes or any non-formula text.
- Do not use markdown/latex formatting in formula lines (underscore _ is allowed).
`.trim();

  const askQuestion = async (q: string) => {
    if (!q.trim()) {
      toast.error(ui.pleaseWrite);
      return;
    }

    try {
      await requireConsent("ai");
    } catch (err) {
      toast.error((err as Error).message);
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const { data, error } = await supabase.functions.invoke("gemini-chat", {
        body: {
          messages: [
            { role: "system", content: `${systemPrompt}\n\n${strictFormatRules}` },
            { role: "user", content: q }
          ]
        }
      });

      if (error) throw error;

      setResponse(data?.text || ui.noResponse);
      setQuestion("");
    } catch (err) {
      console.error("Assistant error:", err);
      toast.error(ui.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title={title} icon={Icon}>
      <ToolNotice>
        AI answers can be wrong. Check figures, rules and limits against the ship's documents and the regulations
        before acting on them.
      </ToolNotice>

      <ToolSection title={ui.quickQuestions} icon={Lightbulb}>
        <div className="grid gap-2 sm:grid-cols-2">
          {quickPrompts.map((prompt, index) => (
            <Button
              key={`${prompt}-${index}`}
              variant="outline"
              size="sm"
              className="h-auto justify-start whitespace-normal px-3 py-2 text-left text-xs leading-snug"
              onClick={() => {
                setQuestion(prompt);
                askQuestion(prompt);
              }}
              disabled={loading}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </ToolSection>

      <ToolSection title={ui.writeQuestion}>
        <Textarea
          placeholder={effectivePlaceholder}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[100px] resize-none"
          aria-label={ui.writeQuestion}
        />
        <Button onClick={() => askQuestion(question)} disabled={loading || !question.trim()} className="w-full gap-2">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {ui.preparing}
            </>
          ) : (
            ui.send
          )}
        </Button>
      </ToolSection>

      {response && (
        <ToolSection title={ui.response} icon={Lightbulb}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground notranslate" translate="no">
            {stripMarkdown(response)}
          </div>
          <div className="border-t border-border/40 pt-2">
            <ReportAiContentButton surface="assistant_interface" content={response} prompt={question} />
          </div>
        </ToolSection>
      )}
    </ToolPage>
  );
}
