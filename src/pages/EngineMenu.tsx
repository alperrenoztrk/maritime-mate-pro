import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
import { machineTopics } from "@/data/machineTopicData";

export default function EngineMenu() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            Makine Bölümü
          </div>
          <h1 className="text-2xl font-bold text-foreground">Gemi Makineleri</h1>
          <div className="flex justify-center">
            <Link
              to="/calculations"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" />
              Geri
            </Link>
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          {machineTopics.map((topic) => {
            const TopicIcon = topic.icon;
            return (
              <Link
                key={topic.slug}
                to={`/machine/${topic.slug}/calculations`}
                className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${topic.accent} text-white shadow`}>
                  <TopicIcon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-foreground">{topic.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
