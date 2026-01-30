import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpenText } from "lucide-react";

const glossaryCategories = [
  "Seyir",
  "Stabilite",
  "Makine",
  "Kargo",
  "Güvenlik",
  "Meteoroloji",
  "Hidrodinamik",
  "Gemicilik",
];

const Glossary = () => {
  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            Hesaplama Merkezi
          </div>
          <div className="flex items-center justify-center gap-2">
            <BookOpenText className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Terimler Sözlüğü</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Derslerde geçen temel kavramları kısa ve net açıklamalarla burada toplayacağız.
          </p>
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

        <section className="space-y-4 rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-md">
          <div className="rounded-xl border border-border/40 bg-background/60 p-4">
            <h2 className="text-lg font-semibold text-foreground">Planlanan Kategoriler</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Terimler sözlüğünü bölüm bölüm hazırlıyoruz. Bu alanlar hazır oldukça ayrıntılı tanımlar, görseller ve
              örneklerle genişleyecek.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {glossaryCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-border/50 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground/80"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Glossary;
