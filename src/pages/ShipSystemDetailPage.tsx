import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { shipSystemsData } from "@/data/shipSystemsData";
import { shipSystemImages } from "@/data/shipSystemImages";
import { MobileLayout } from "@/components/MobileLayout";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

export default function ShipSystemDetailPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const initialTopic = (() => {
    const t = parseInt(searchParams.get("topic") ?? "", 10);
    return Number.isFinite(t) && t >= 0 ? t : 0;
  })();
  const [expandedTopic, setExpandedTopic] = useState<number | null>(initialTopic);
  const [viewerImage, setViewerImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    setExpandedTopic(initialTopic);
    // scroll target topic into view after render
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
        <BottomNavigation />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur">
          <h1 className="text-lg font-bold text-foreground">{section.title}</h1>
          <p className="text-xs text-muted-foreground">{section.description}</p>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-4 space-y-3">
          {section.topics.map((topic, idx) => {
            const isOpen = expandedTopic === idx;
            const topicImage = images[idx];
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
                  <div className="border-t border-border/20 px-4 py-4 space-y-4">
                    {/* Topic Image */}
                    {topicImage && (
                      <div
                        className="overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => setViewerImage({ src: topicImage, alt: topic.title })}
                      >
                        <img
                          src={topicImage}
                          alt={topic.title}
                          className="w-full h-44 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <p className="text-sm text-foreground/90 leading-relaxed">{topic.introduction}</p>

                    {topic.sections.map((sec, si) => (
                      <div key={si} className="space-y-2">
                        <h3 className="text-sm font-semibold text-primary">{sec.heading}</h3>
                        {sec.paragraphs.map((p, pi) => (
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

                    {topic.workingPrinciple && topic.workingPrinciple.length > 0 && (
                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1">
                        <p className="text-xs font-semibold text-primary mb-1">Çalışma Prensibi</p>
                        {topic.workingPrinciple.map((wp, wi) => (
                          <p key={wi} className="text-[12px] text-foreground/80 leading-relaxed">• {wp}</p>
                        ))}
                      </div>
                    )}

                    {topic.operation && topic.operation.length > 0 && (
                      <div className="rounded-lg border border-border/30 bg-card/40 p-3 space-y-1">
                        <p className="text-xs font-semibold text-foreground mb-1">Kullanım</p>
                        {topic.operation.map((op, oi) => (
                          <p key={oi} className="text-[12px] text-foreground/80 leading-relaxed">{oi + 1}. {op}</p>
                        ))}
                      </div>
                    )}

                    {topic.faults && topic.faults.length > 0 && (
                      <div className="space-y-1.5">
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

                    {topic.precautions && topic.precautions.length > 0 && (
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 space-y-1">
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Önlemler ve Emniyet</p>
                        {topic.precautions.map((pc, pci) => (
                          <p key={pci} className="text-[12px] text-foreground/80 leading-relaxed">• {pc}</p>
                        ))}
                      </div>
                    )}

                    {topic.keyPoints.length > 0 && (
                      <div className="rounded-lg bg-muted/20 p-3 space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Önemli Noktalar</p>
                        {topic.keyPoints.map((kp, ki) => (
                          <p key={ki} className="text-[12px] text-foreground/70">• {kp}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <BottomNavigation />

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
