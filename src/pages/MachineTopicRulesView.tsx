import { useParams } from "react-router-dom";
import { BookOpen, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { machineTopicRules } from "./MachineTopicRulesPage";

export default function MachineTopicRulesView() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const rules = topicSlug ? machineTopicRules[topicSlug] : null;

  if (!topic || !rules) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const TopicIcon = topic.icon;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${topic.accent} text-white shadow-lg`}>
              <TopicIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{topic.title}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" /> Kurallar
              </p>
            </div>
          </div>
        </header>

        {rules.map((category, categoryIndex) => (
          <section key={categoryIndex} className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
            </div>
            {category.source && (
              <p className="text-xs text-muted-foreground pl-7">
                Kaynak: {category.source.code}
                {category.source.detail ? ` — ${category.source.detail}` : ""}
              </p>
            )}
            {category.rules.map((rule, ruleIndex) => (
              <Card key={ruleIndex} className="bg-card/80 border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">{rule.subtitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {rule.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
