import { useEffect, useMemo, useState, type CSSProperties } from "react";
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

const glossaryTerms = [
  {
    title: "Mevki (Position)",
    category: "Seyir",
    description: "Bir geminin belirli bir anda enlem ve boylam ile ifade edilen konumudur.",
  },
  {
    title: "DGPS",
    category: "Seyir",
    description: "Uydu konumlamasını yer istasyonu düzeltmeleriyle santimetre–metre düzeyine iyileştiren sistem.",
  },
  {
    title: "GM (Metasentrik Yükseklik)",
    category: "Stabilite",
    description: "G gemi ağırlık merkezi ile metasenter M arasındaki mesafe; ilk stabilitenin temel göstergesidir.",
  },
  {
    title: "Serbest Yüzey Etkisi",
    category: "Stabilite",
    description: "Kısmi dolu tanklarda sıvı yüzeyinin hareketiyle GM değerini düşüren olumsuz etki.",
  },
  {
    title: "Buharlaşma (Evaporation)",
    category: "Meteoroloji",
    description: "Suyun ısı alarak sıvı hâlden gaz hâline geçmesi; nem ve hava olaylarını etkiler.",
  },
  {
    title: "Dew Point (Çiy Noktası)",
    category: "Meteoroloji",
    description: "Havanın doygunluğa ulaşıp yoğunlaşmanın başladığı sıcaklık değeri.",
  },
  {
    title: "Borda",
    category: "Gemicilik",
    description: "Geminin yan yüzeyi; iskele veya sancak borda olarak belirtilir.",
  },
  {
    title: "Ağırlık Merkezleri (KG)",
    category: "Stabilite",
    description: "Gemi ağırlık merkezinin omurgadan ölçülen düşey uzaklığı; stabilite analizinde kritik değerdir.",
  },
  {
    title: "Denizci Alargası",
    category: "Gemicilik",
    description: "Geminin rıhtımdan ayrılıp açık suya doğru emniyetli mesafe alması.",
  },
  {
    title: "Dalga Yükü (Wave Load)",
    category: "Hidrodinamik",
    description: "Dalgaların gövde üzerinde oluşturduğu dinamik yükler; seakeeping hesaplarında kullanılır.",
  },
  {
    title: "Kavitasyon",
    category: "Makine",
    description: "Akışkan içinde basıncın buhar basıncının altına düşmesiyle oluşan kabarcıkların çökmesi olayı.",
  },
  {
    title: "Trim",
    category: "Stabilite",
    description: "Geminin baş-kıç doğrultusunda eğimi; başa veya kıça trim olarak ifade edilir.",
  },
];

const Glossary = () => {
  const [hourlyState, setHourlyState] = useState(() => {
    if (typeof window === "undefined") {
      return { unlockedCount: 1, lastTick: Date.now() };
    }

    const storedCount = window.localStorage.getItem("glossaryHourlyUnlocked");
    const storedTick = window.localStorage.getItem("glossaryHourlyLastTick");
    const now = Date.now();
    const currentHourStart = now - (now % (60 * 60 * 1000));

    if (storedCount && storedTick) {
      return {
        unlockedCount: Math.min(Math.max(Number(storedCount), 1), glossaryTerms.length),
        lastTick: Number(storedTick),
      };
    }

    window.localStorage.setItem("glossaryHourlyUnlocked", "1");
    window.localStorage.setItem("glossaryHourlyLastTick", String(currentHourStart));
    return { unlockedCount: 1, lastTick: currentHourStart };
  });

  useEffect(() => {
    const syncHourlyTerms = () => {
      const now = Date.now();
      const hoursElapsed = Math.floor((now - hourlyState.lastTick) / (60 * 60 * 1000));

      if (hoursElapsed <= 0) {
        return;
      }

      setHourlyState((previous) => {
        const nextUnlocked = Math.min(previous.unlockedCount + hoursElapsed, glossaryTerms.length);
        const nextTick = previous.lastTick + hoursElapsed * 60 * 60 * 1000;

        if (typeof window !== "undefined") {
          window.localStorage.setItem("glossaryHourlyUnlocked", String(nextUnlocked));
          window.localStorage.setItem("glossaryHourlyLastTick", String(nextTick));
        }

        return { unlockedCount: nextUnlocked, lastTick: nextTick };
      });
    };

    syncHourlyTerms();
    const intervalId = window.setInterval(syncHourlyTerms, 60_000);

    return () => window.clearInterval(intervalId);
  }, [hourlyState.lastTick]);

  const availableTerms = useMemo(() => {
    return glossaryTerms.slice(0, Math.min(hourlyState.unlockedCount, glossaryTerms.length));
  }, [hourlyState.unlockedCount]);

  const latestTerm = availableTerms[availableTerms.length - 1];

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
          <div className="rounded-xl border border-border/40 bg-background/70 p-4">
            <h2 className="text-lg font-semibold text-foreground">En Yeni Terim</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sistem, her saat başında sözlüğe yeni bir terim ekler. Burada son eklenen terimi görürsün. Böylece ders
              sırasında tekrarlar düzenli yapılır.
            </p>
            <div className="mt-4 grid gap-3 rounded-2xl border border-border/40 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 text-sm shadow-sm dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {latestTerm.category}
                </span>
                <span className="text-base font-semibold text-foreground">
                  {latestTerm.title}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{latestTerm.description}</p>
            </div>
          </div>
          <div className="rounded-xl border border-border/40 bg-background/60 p-4">
            <h2 className="text-lg font-semibold text-foreground">Saatlik Eklenen Terimler</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Bu liste, saat geçtikçe otomatik olarak genişler. Şu ana kadar eklenen terimler aşağıda sıralanır.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {availableTerms.map((term) => (
                <div
                  key={term.title}
                  className="rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {term.category}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{term.title}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{term.description}</p>
                </div>
              ))}
            </div>
          </div>
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
