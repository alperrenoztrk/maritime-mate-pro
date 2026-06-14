import { Link } from "react-router-dom";
import { ArrowLeft, FlaskConical, Clock4, ClipboardCheck } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";

const FEATURES = [
  {
    to: "/beta/work-hours",
    title: "Otomatik Çalışma Saati Tablosu",
    description:
      "Jurnal, önceki ay tablosu ve personel listesi fotoğraflarından MLC/STCW formatında çalışma saati tablosu üretir. Excel olarak indirilir.",
    icon: Clock4,
    badge: "Yeni",
  },
  {
    to: "/beta/psc-checklist",
    title: "PSC Denetim Hazırlık Listesi",
    description:
      "Liman Devleti Kontrolü öncesi sertifika, can kurtarma, yangın, seyir, MARPOL ve MLC maddelerini madde madde kontrol edin. Excel rapor olarak indirilir.",
    icon: ClipboardCheck,
    badge: "Yeni",
  },
];

export default function BetaFeaturesPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 pb-24 pt-8 dark:from-[hsl(20,40%,6%)] dark:via-[hsl(20,40%,8%)] dark:to-[hsl(20,40%,10%)]"
      data-no-translate
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 backdrop-blur dark:text-amber-300">
            <FlaskConical className="h-3.5 w-3.5" />
            Beta Laboratuvarı
          </div>
          <h1 className="text-2xl font-bold text-foreground">Beta Özellikler</h1>
          <p className="text-sm text-muted-foreground">
            Test aşamasındaki araçlar. Çıktıları daima manuel doğrulayın.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" />
              Ana sayfa
            </Link>
          </div>
        </header>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-800 dark:text-amber-200">
          <strong className="font-semibold">Uyarı:</strong> Beta özellikler
          deneme aşamasındadır. Resmi denetim, sörvey veya PSC süreçlerinde
          kullanmadan önce her veriyi manuel kontrol edin.
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.to}
                to={f.to}
                className="group relative flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-500/60 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 text-white shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  {f.badge && (
                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      {f.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    {f.title}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
