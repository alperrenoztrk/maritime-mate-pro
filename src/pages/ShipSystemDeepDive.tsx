import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Eye,
  FileText,
  Lightbulb,
  Loader2,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";
import { shipSystemsData, type ShipSystemTopic } from "@/data/shipSystemsData";
import { shipSystemImages } from "@/data/shipSystemImages";
import {
  getProfessionalSystemGuide,
  type ProfessionalSystemGuide,
} from "@/data/shipSystemsProfessionalData";
import { loadShipSystemLongForm, type ShipSystemLongForm, type ShipSystemCallout } from "@/data/shipSystems/longform/types";
import { SystemArchitectureDiagram } from "@/components/ship-systems/SystemArchitectureDiagram";
import { scrollToTop } from "@/lib/scrollToTop";

const calloutMeta: Record<ShipSystemCallout["type"], { Icon: typeof AlertTriangle; cls: string; label: string }> = {
  warning:    { Icon: AlertTriangle, cls: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200", label: "Warning" },
  reference:  { Icon: BookMarked,    cls: "border-blue-500/40 bg-blue-500/10 text-blue-900 dark:text-blue-200", label: "Referans" },
  tip:        { Icon: Lightbulb,     cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200", label: "hint" },
  example:    { Icon: FileText,      cls: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-200", label: "Example" },
  regulation: { Icon: Scale,         cls: "border-primary/40 bg-primary/10 text-foreground", label: "Mevzuat" },
};

export default function ShipSystemDeepDive() {
  const { sectionId, topicIndex } = useParams<{ sectionId: string; topicIndex: string }>();
  const idx = Number(topicIndex);
  const section = sectionId ? shipSystemsData[sectionId] : undefined;
  const topicMeta = section?.topics[idx];
  const guide = sectionId && topicMeta
    ? getProfessionalSystemGuide(sectionId, idx, topicMeta.title)
    : null;
  const topicImage = sectionId ? shipSystemImages[sectionId]?.[idx] : undefined;

  const [content, setContent] = useState<ShipSystemLongForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  // 0 = konu özeti (eski liste ekranındaki tanım/sistem zinciri/arıza blokları),
  // 1..n = uzun-form bölümleri. Özet artık anlatımın ilk sayfasıdır.
  const [activePage, setActivePage] = useState(0);
  const [viewerImage, setViewerImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!sectionId || Number.isNaN(idx)) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    setContent(null);
    setActivePage(0);
    loadShipSystemLongForm(sectionId, idx)
      .then((c) => {
        if (!cancelled) {
          setContent(c);
          setLoadError(!c);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sectionId, idx]);

  // Each chapter is its own page ("2 / 8"), so Önceki/Sonraki and the chapter
  // chips have to start at the top instead of dropping the reader halfway
  // down the new chapter at the previous one's scroll offset.
  useEffect(() => {
    scrollToTop();
  }, [activePage]);

  if (!section || !topicMeta) {
    return (
      <MobileLayout>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-xl font-bold">Konu bulunamadı</h1>
        </div>
      </MobileLayout>
    );
  }

  const chapters = content?.chapters ?? [];
  const totalPages = chapters.length + 1;
  const chapter = activePage > 0 ? chapters[activePage - 1] : undefined;

  return (
    <MobileLayout>
      <div className="relative min-h-screen px-4 pb-32 py-8">
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-5">
          <header className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-md dark:bg-slate-900/60">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
              <BookOpen className="h-4 w-4" /> Detailed Explanation
            </div>
            <p className="mb-1 text-xs text-muted-foreground">
              {section.title}
            </p>
            <h1 className="text-2xl font-black leading-tight text-foreground">{topicMeta.title}</h1>
            {content?.intro && (
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">{content.intro}</p>
            )}
          </header>

          {loading && (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-card/60 p-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> İçerik yükleniyor…
            </div>
          )}

          {!loading && (
            <>
              {/* Chapter chips */}
              {chapters.length > 0 && (
                <nav className="sticky top-2 z-20 -mx-1 overflow-x-auto rounded-xl border border-border/40 bg-card/80 p-2">
                  <div className="flex gap-1.5">
                    {["Summary", ...chapters.map((ch) => ch.heading.replace(/^\d+\.\s*/, ""))].map((label, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePage(i)}
                        className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                          activePage === i
                            ? "bg-primary text-primary-foreground"
                            : "bg-background/60 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {i === 0 ? label : `${i}. ${label}`}
                      </button>
                    ))}
                  </div>
                </nav>
              )}

              <article className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-md dark:bg-slate-900/60">
                {chapter ? (
                  <>
                    <h2 className="mb-3 text-xl font-bold text-foreground">{chapter.heading}</h2>
                    {chapter.lead && (
                      <p className="mb-5 rounded-lg border-l-4 border-primary/40 bg-primary/5 p-3 text-sm italic leading-relaxed text-foreground/90">
                        {chapter.lead}
                      </p>
                    )}
                    {chapter.sections.map((sec, si) => (
                      <section key={si} className="mb-7">
                        <h3 className="mb-2 text-base font-semibold text-foreground">{sec.subheading}</h3>
                        {sec.paragraphs.map((p, pi) => (
                          <p key={pi} className="mb-3 text-sm leading-relaxed text-foreground/85 dark:text-slate-300">
                            {p}
                          </p>
                        ))}
                        {sec.bullets && (
                          <ul className="mb-3 space-y-1.5 pl-5">
                            {sec.bullets.map((b, bi) => (
                              <li key={bi} className="list-disc text-sm leading-relaxed text-foreground/85 marker:text-primary/60">
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                        {sec.table && (
                          <div className="my-4 overflow-x-auto rounded-lg border border-border/40">
                            {sec.table.caption && (
                              <div className="bg-muted/40 px-3 py-2 text-xs font-semibold text-muted-foreground">
                                {sec.table.caption}
                              </div>
                            )}
                            <table className="w-full text-xs">
                              <thead className="bg-muted/30">
                                <tr>
                                  {sec.table.headers.map((h, hi) => (
                                    <th key={hi} className="px-3 py-2 text-left font-semibold text-foreground">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {sec.table.rows.map((row, ri) => (
                                  <tr key={ri} className="border-t border-border/30">
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="px-3 py-2 text-foreground/85">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {sec.callouts?.map((co, ci) => {
                          const meta = calloutMeta[co.type];
                          const Icon = meta.Icon;
                          return (
                            <div key={ci} className={`my-4 rounded-lg border p-3 ${meta.cls}`}>
                              <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                                <Icon className="h-3.5 w-3.5" />
                                {co.title ?? meta.label}
                              </div>
                              <p className="text-sm leading-relaxed">{co.text}</p>
                            </div>
                          );
                        })}
                      </section>
                    ))}
                  </>
                ) : (
                  <SystemSummary
                    topic={topicMeta}
                    guide={guide}
                    topicImage={topicImage}
                    longFormMissing={loadError && !content}
                    onOpenImage={(src, alt) => setViewerImage({ src, alt })}
                  />
                )}

                {/* Prev/Next */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between border-t border-border/30 pt-4">
                    <button
                      onClick={() => setActivePage((v) => Math.max(0, v - 1))}
                      disabled={activePage === 0}
                      className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" /> Önceki
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {activePage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={() => setActivePage((v) => Math.min(totalPages - 1, v + 1))}
                      disabled={activePage === totalPages - 1}
                      className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-40"
                    >
                      Sonraki <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </article>

              {content?.sources && content.sources.length > 0 && (
                <aside className="rounded-2xl border border-border/40 bg-card/60 p-5 text-xs text-muted-foreground">
                  <div className="mb-2 font-semibold text-foreground">Kaynaklar</div>
                  <ul className="list-disc space-y-1 pl-5">
                    {content.sources.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </aside>
              )}
            </>
          )}
        </div>
      </div>

      {/* Image Viewer Modal */}
      <ImageViewerModal
        src={viewerImage?.src || ""}
        alt={viewerImage?.alt}
        isOpen={!!viewerImage}
        onClose={() => setViewerImage(null)}
      />
    </MobileLayout>
  );
}

/**
 * Sistem listesinden taşınan özet blokları.
 * Tanım, sistem zinciri, hazırlık/izleme/doğrulama, arıza ve kayıt başlıkları
 * liste ekranında değil, anlatımın ilk sayfasında tek kaynaktan okunur.
 */
function SystemSummary({
  topic,
  guide,
  topicImage,
  longFormMissing,
  onOpenImage,
}: {
  topic: ShipSystemTopic;
  guide: ProfessionalSystemGuide | null;
  topicImage?: string;
  longFormMissing: boolean;
  onOpenImage: (src: string, alt: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-foreground">Konu Özeti</h2>

      {longFormMissing && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs leading-relaxed text-muted-foreground">
          Mesleki ders anlatımı yüklenemedi. Bağlantıyı yenileyip tekrar deneyin; aşağıdaki özet
          doğrulanmış konu verisinin tamamını gösterir.
        </p>
      )}

      {topic.introduction && (
        <p className="text-sm leading-relaxed text-foreground/90">{topic.introduction}</p>
      )}

      {guide && (
        <>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-primary">
                <Activity className="h-4 w-4" /> Sistemin görevi
              </div>
              <p className="text-caption leading-relaxed text-foreground/85">{guide.purpose}</p>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
                <ShieldCheck className="h-4 w-4" /> Ne yapmaz / sınırı
              </div>
              <p className="text-caption leading-relaxed text-foreground/85">{guide.boundary}</p>
            </div>
          </div>

          <SystemArchitectureDiagram title={topic.title} stages={guide.flow} />

          {/* Fotoğraf, şemadan sonra ve doğru bağlam açıklamasıyla gösterilir. */}
          {topicImage && (
            <figure className="overflow-hidden rounded-xl border border-border/30 bg-card/50">
              <button
                type="button"
                className="block w-full cursor-zoom-in overflow-hidden text-left group"
                onClick={() => onOpenImage(topicImage, topic.title)}
                aria-label={`${topic.title} fotoğrafını büyüt`}
              >
                <img
                  src={topicImage}
                  alt={`${topic.title} için gerçek gemi kurulum örneği`}
                  className="h-48 w-full object-cover transition-transform duration-page group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </button>
              <figcaption className="border-t border-border/20 px-3 py-2 text-micro leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground/80">Gerçek ekipman fotoğrafı: </span>
                {guide.photoCaption ?? "Fotoğraf yalnız örnek bir fiziksel kurulumu gösterir; üretici, model ve gemiye özgü donanım onaylı plan ve kullanım kitabından doğrulanır."}
              </figcaption>
            </figure>
          )}

          <div className="rounded-xl border border-border/30 bg-card/50 p-3">
            <div className="flex items-start gap-2">
              <UserRoundCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">Sorumluluk ve komuta zinciri</p>
                <p className="mt-1 text-caption leading-relaxed text-foreground/80">{guide.responsibleRole}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { title: "Hazırlık", Icon: ClipboardCheck, items: guide.prepare, className: "border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300" },
              { title: "İşletmede izlenecekler", Icon: Eye, items: guide.monitor, className: "border-cyan-500/20 bg-cyan-500/5 text-cyan-700 dark:text-cyan-300" },
              { title: "Çapraz doğrulama", Icon: CheckCircle2, items: guide.verify, className: "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300" },
              { title: "Durdur ve yükselt", Icon: AlertOctagon, items: guide.stopAndEscalate, className: "border-destructive/25 bg-destructive/5 text-destructive" },
            ].map(({ title, Icon, items, className }) => (
              <section key={title} className={`rounded-xl border p-3 ${className}`}>
                <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold">
                  <Icon className="h-4 w-4" /> {title}
                </h3>
                <div className="space-y-1.5 text-foreground/80">
                  {items.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-caption leading-relaxed">• {item}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}

      {/* Konu bölümleri */}
      {topic.sections
        ?.filter(
          (sec) =>
            (sec.paragraphs && sec.paragraphs.length > 0) ||
            sec.table ||
            sec.formula ||
            sec.example,
        )
        .map((sec, si) => (
          <div key={si} className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-primary">{sec.heading}</h3>
            {sec.paragraphs?.map((p, pi) => (
              <p key={pi} className="text-sm text-foreground/80 leading-relaxed">{p}</p>
            ))}

            {sec.table && (
              <div className="overflow-x-auto rounded-lg border border-border/30">
                <table className="w-full text-xs">
                  <thead><tr className="bg-muted/30">{sec.table.headers.map((h, hi) => <th key={hi} className="px-2 py-1.5 text-left font-medium text-muted-foreground">{h}</th>)}</tr></thead>
                  <tbody>{sec.table.rows.map((row, ri) => <tr key={ri} className="border-t border-border/20">{row.map((cell, ci) => <td key={ci} className="px-2 py-1.5 text-foreground/80">{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            )}

            {sec.formula && (
              <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-3 space-y-1">
                <p className="text-sm font-mono font-semibold text-center text-foreground">{sec.formula.expression}</p>
                {sec.formula.variables.map((v, vi) => (
                  <p key={vi} className="text-micro text-muted-foreground">{v}</p>
                ))}
              </div>
            )}

            {sec.example && (
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 space-y-2">
                <p className="text-xs font-semibold text-accent-foreground">Örnek: {sec.example.problem}</p>
                {sec.example.steps.map((s, si2) => (
                  <p key={si2} className="text-caption font-mono text-foreground/80">{s}</p>
                ))}
                <p className="text-xs font-semibold text-primary">{sec.example.result}</p>
              </div>
            )}
          </div>
        ))}

      {/* Çalışma Prensibi */}
      {topic.workingPrinciple && topic.workingPrinciple.length > 0 && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1">
          <p className="text-xs font-semibold text-primary mb-1">Çalışma Prensibi</p>
          {topic.workingPrinciple.map((wp, wi) => (
            <p key={wi} className="text-caption text-foreground/80 leading-relaxed">• {wp}</p>
          ))}
        </div>
      )}

      {/* Kullanım */}
      {topic.operation && topic.operation.length > 0 && (
        <div className="rounded-lg border border-border/30 bg-card/40 p-3 space-y-1">
          <p className="text-xs font-semibold text-foreground mb-1">Kullanım</p>
          {topic.operation.map((op, oi) => (
            <p key={oi} className="text-caption text-foreground/80 leading-relaxed">{oi + 1}. {op}</p>
          ))}
        </div>
      )}

      {/* Olası Arızalar ve Müdahale */}
      {topic.faults && topic.faults.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-semibold text-destructive">Olası Arızalar ve Müdahale</p>
          <div className="overflow-x-auto rounded-lg border border-destructive/20">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-destructive/10">
                  <th className="px-2 py-1.5 text-left font-medium text-destructive">Arıza</th>
                  <th className="px-2 py-1.5 text-left font-medium text-destructive">Sebep</th>
                  <th className="px-2 py-1.5 text-left font-medium text-destructive">Yapılacak</th>
                </tr>
              </thead>
              <tbody>
                {topic.faults.map((f, fi) => (
                  <tr key={fi} className="border-t border-destructive/10 align-top">
                    <td className="px-2 py-1.5 text-foreground/90 font-medium">{f.fault}</td>
                    <td className="px-2 py-1.5 text-foreground/75">{f.cause}</td>
                    <td className="px-2 py-1.5 text-foreground/75">{f.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Önlemler ve Emniyet */}
      {topic.precautions && topic.precautions.length > 0 && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 space-y-1">
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Önlemler ve Emniyet</p>
          {topic.precautions.map((pc, pci) => (
            <p key={pci} className="text-caption text-foreground/80 leading-relaxed">• {pc}</p>
          ))}
        </div>
      )}

      {/* Önemli Noktalar */}
      {topic.keyPoints && topic.keyPoints.length > 0 && (
        <div className="rounded-lg bg-muted/20 p-3 space-y-1">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Önemli Noktalar</p>
          {topic.keyPoints.map((kp, ki) => (
            <p key={ki} className="text-caption text-foreground/70">• {kp}</p>
          ))}
        </div>
      )}

      {guide && (
        <div className="grid gap-2 sm:grid-cols-2">
          <section className="rounded-xl border border-border/30 bg-card/50 p-3">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold text-foreground">
              <ClipboardCheck className="h-4 w-4 text-primary" /> Kayıt ve objektif kanıt
            </h3>
            <div className="space-y-1.5">
              {guide.records.map((record, recordIndex) => (
                <p key={recordIndex} className="text-caption leading-relaxed text-foreground/75">• {record}</p>
              ))}
            </div>
          </section>
          <section className="rounded-xl border border-border/30 bg-card/50 p-3">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold text-foreground">
              <Scale className="h-4 w-4 text-primary" /> Dayanak ve gemiye özel kaynak
            </h3>
            <div className="space-y-2">
              {guide.references.map((reference, referenceIndex) => (
                <div key={`${reference.code}-${referenceIndex}`}>
                  <p className="text-micro font-semibold text-primary">{reference.code}</p>
                  <p className="text-micro leading-relaxed text-foreground/70">{reference.scope}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
