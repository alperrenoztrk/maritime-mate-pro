import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { hasSubTopicContent } from "@/data/machineTopicDetailContent";
import { machineTopicLessons } from "@/data/machineTopicLessonData";
import { GraduationCap, BookOpen, FileText, Lightbulb, ChevronRight, ChevronDown } from "lucide-react";

export default function MachineTopicLessonsPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topicConfig = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const lessonData = topicSlug ? machineTopicLessons[topicSlug] : null;
  const [expandedTopics, setExpandedTopics] = useState<number[]>([]);

  const toggleTopic = (index: number) => {
    setExpandedTopics((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!topicConfig || !lessonData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const TopicIcon = topicConfig.icon;

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            <GraduationCap className="h-4 w-4" />
            Konu Anlatımı
          </div>

          <div className="flex items-center justify-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${topicConfig.accent} text-white shadow-lg`}
            >
              <TopicIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{lessonData.title}</h1>
          </div>

          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            {lessonData.description}
          </p>
        </header>

        {/* Key Topics */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Ana Konular</h2>
            <span className="ml-auto text-xs text-muted-foreground">
              {lessonData.keyTopics.length} başlık
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {lessonData.keyTopics.map((topic, index) => {
              const isExpanded = expandedTopics.includes(index);
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-border/40 bg-card/80 backdrop-blur transition-all"
                >
                  <button
                    onClick={() => toggleTopic(index)}
                    className="w-full cursor-pointer p-4 text-left transition-colors hover:bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${topicConfig.accent} text-sm font-bold text-white`}
                      >
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{topic.title}</h3>
                          <span className="rounded-full bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
                            {topic.subTopics.length} alt başlık
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{topic.description}</p>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border/40 bg-background/50 p-4">
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {topic.subTopics.map((sub, subIndex) => {
                          const hasContent = topicSlug ? hasSubTopicContent(topicSlug, sub.title) : false;
                          const Wrapper = hasContent ? Link : "div" as any;
                          const linkProps = hasContent ? { to: `/machine/${topicSlug}/topics/${encodeURIComponent(sub.title)}` } : {};
                          return (
                            <Wrapper
                              key={subIndex}
                              {...linkProps}
                              className="flex items-center gap-2 rounded-lg border border-primary/20 bg-card/60 px-3 py-2 text-left text-sm transition-colors hover:border-primary/40 hover:bg-card"
                            >
                              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span className="flex-1 text-foreground/90">{sub.title}</span>
                            </Wrapper>
                          );
                        })}

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Links */}
        <section className="rounded-2xl border border-border/40 bg-card/80 p-6 backdrop-blur">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {lessonData.resources.map((resource, index) => (
              <Link
                key={index}
                to={resource.href}
                className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-primary/40 hover:bg-background"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{resource.title}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>

        {/* Back */}
        <div className="flex justify-center pt-2">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Tüm Derslere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
