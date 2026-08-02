import { useParams, useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { shipSystemsData } from "@/data/shipSystemsData";
import { shipSystemImages } from "@/data/shipSystemImages";
import { hasShipSystemLongForm } from "@/data/shipSystems/longform/types";
import { getProfessionalSystemGuide } from "@/data/shipSystemsProfessionalData";
import { MobileLayout } from "@/components/MobileLayout";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";
import { SystemArchitectureDiagram } from "@/components/ship-systems/SystemArchitectureDiagram";
import {
  Activity,
  AlertOctagon,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Eye,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";


export default function ShipSystemDetailPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const initialTopic = (() => {
    const t = parseInt(searchParams.get("topic") ?? "", 10);
    return Number.isFinite(t) && t >= 0 ? t : 0;
  })();
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [viewerImage, setViewerImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    // A deep link may position the requested topic, but the container remains
    // closed until the user deliberately opens it.
    setExpandedTopic(null);
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(`ship-topic-${initialTopic}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [initialTopic, sectionId]);

  const section = sectionId ? shipSystemsData[sectionId] : null;
  const images = sectionId ? shipSystemImages[sectionId] || [] : [];

  if (!section) {
    return (
      <MobileLayout>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-muted-foreground">İçerik bulunamadı.</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur">
          <h1 className="text-lg font-bold text-foreground">{section.title}</h1>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-4 space-y-3">
          {section.topics.map((topic, idx) => {
            const isOpen = expandedTopic === idx;
            const topicImage = images[idx];
            const guide = sectionId
              ? getProfessionalSystemGuide(sectionId, idx, topic.title)
              : null;
            return (
              <div key={idx} id={`ship-topic-${idx}`} className="rounded-xl border border-border/30 bg-card/60 overflow-hidden scroll-mt-20">
                <button
                  onClick={() => setExpandedTopic(isOpen ? null : idx)}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-card/80"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-primary" />
                  <span className="flex-1 text-sm font-semibold text-foreground">{topic.title}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {isOpen && (
                  <div className="border-t border-border/20 px-4 py-4 flex flex-col gap-4">
                    {/* 1. Tanım ve sistemin emniyet sınırı */}
                    {topic.introduction && (
                      <p className="text-sm text-foreground/90 leading-relaxed">{topic.introduction}</p>
                    )}

                    {guide && (
                      <>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                            <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-primary">
                              <Activity className="h-4 w-4" /> Sistemin görevi
                            </div>
                            <p className="text-[12px] leading-relaxed text-foreground/85">{guide.purpose}</p>
                          </div>
                          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
                            <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
                              <ShieldCheck className="h-4 w-4" /> Ne yapmaz / sınırı
                            </div>
                            <p className="text-[12px] leading-relaxed text-foreground/85">{guide.boundary}</p>
                          </div>
                        </div>

                        <SystemArchitectureDiagram title={topic.title} stages={guide.flow} />

                        {/* Fotoğraf, şemadan sonra ve doğru bağlam açıklamasıyla gösterilir. */}
                        {topicImage && (
                          <figure className="overflow-hidden rounded-xl border border-border/30 bg-card/50">
                            <button
                              type="button"
                              className="block w-full cursor-zoom-in overflow-hidden text-left group"
                              onClick={() => setViewerImage({ src: topicImage, alt: topic.title })}
                              aria-label={`${topic.title} fotoğrafını büyüt`}
                            >
                              <img
                                src={topicImage}
                                alt={`${topic.title} için gerçek gemi kurulum örneği`}
                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                loading="lazy"
                              />
                            </button>
                            <figcaption className="border-t border-border/20 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
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
                              <p className="mt-1 text-[12px] leading-relaxed text-foreground/80">{guide.responsibleRole}</p>
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
                                  <p key={itemIndex} className="text-[12px] leading-relaxed">• {item}</p>
                                ))}
                              </div>
                            </section>
                          ))}
                        </div>
                      </>
                    )}

                    {/* 2. Konu bölümleri */}
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
                            <p key={pi} className="text-[13px] text-foreground/80 leading-relaxed">{p}</p>
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
                                <p key={vi} className="text-[11px] text-muted-foreground">{v}</p>
                              ))}
                            </div>
                          )}

                          {sec.example && (
                            <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 space-y-2">
                              <p className="text-xs font-semibold text-accent-foreground">Örnek: {sec.example.problem}</p>
                              {sec.example.steps.map((s, si2) => (
                                <p key={si2} className="text-[12px] font-mono text-foreground/80">{s}</p>
                              ))}
                              <p className="text-xs font-semibold text-primary">{sec.example.result}</p>
                            </div>
                          )}
                        </div>
                      ))}

                    {/* 4. Çalışma Prensibi */}
                    {topic.workingPrinciple && topic.workingPrinciple.length > 0 && (
                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1">
                        <p className="text-xs font-semibold text-primary mb-1">Çalışma Prensibi</p>
                        {topic.workingPrinciple.map((wp, wi) => (
                          <p key={wi} className="text-[12px] text-foreground/80 leading-relaxed">• {wp}</p>
                        ))}
                      </div>
                    )}

                    {/* 5. Kullanım */}
                    {topic.operation && topic.operation.length > 0 && (
                      <div className="rounded-lg border border-border/30 bg-card/40 p-3 space-y-1">
                        <p className="text-xs font-semibold text-foreground mb-1">Kullanım</p>
                        {topic.operation.map((op, oi) => (
                          <p key={oi} className="text-[12px] text-foreground/80 leading-relaxed">{oi + 1}. {op}</p>
                        ))}
                      </div>
                    )}

                    {/* 6. Olası Arızalar ve Müdahale */}
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

                    {/* 7. Önlemler ve Emniyet */}
                    {topic.precautions && topic.precautions.length > 0 && (
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 space-y-1">
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Önlemler ve Emniyet</p>
                        {topic.precautions.map((pc, pci) => (
                          <p key={pci} className="text-[12px] text-foreground/80 leading-relaxed">• {pc}</p>
                        ))}
                      </div>
                    )}

                    {/* 8. Önemli Noktalar */}
                    {topic.keyPoints && topic.keyPoints.length > 0 && (
                      <div className="rounded-lg bg-muted/20 p-3 space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Önemli Noktalar</p>
                        {topic.keyPoints.map((kp, ki) => (
                          <p key={ki} className="text-[12px] text-foreground/70">• {kp}</p>
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
                              <p key={recordIndex} className="text-[12px] leading-relaxed text-foreground/75">• {record}</p>
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
                                <p className="text-[11px] font-semibold text-primary">{reference.code}</p>
                                <p className="text-[11px] leading-relaxed text-foreground/70">{reference.scope}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>
                    )}

                    {sectionId && hasShipSystemLongForm(sectionId, idx) && (
                      <Link
                        to={`/ship-systems/${sectionId}/${idx}`}
                        className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20"
                      >
                        Mesleki ders anlatımını aç →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
