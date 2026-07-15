import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { shipSystemsData } from "@/data/shipSystemsData";
import { shipSystemImages } from "@/data/shipSystemImages";
import { hasShipSystemLongForm } from "@/data/shipSystems/longform/types";
import { getProfessionalSystemGuide } from "@/data/shipSystemsProfessionalData";
import { BookSheet } from "@/components/book/BookSheet";
import { SystemArchitectureDiagram } from "@/components/ship-systems/SystemArchitectureDiagram";
import {
  AlertOctagon,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Eye,
} from "lucide-react";


export default function ShipSystemDetailPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const initialTopic = (() => {
    const t = parseInt(searchParams.get("topic") ?? "", 10);
    return Number.isFinite(t) && t >= 0 ? t : 0;
  })();
  useEffect(() => {
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
      <BookSheet title="GEMİ SİSTEMLERİ">
        <p className="bs-muted py-10 text-center text-sm italic">İçerik bulunamadı.</p>
      </BookSheet>
    );
  }

  return (
    <BookSheet title="GEMİ SİSTEMLERİ">
      <h1 className="bs-h2 text-center" style={{ borderBottom: "none" }}>{section.title}</h1>
      <div className="bs-fleuron" aria-hidden="true">❦</div>

      <div className="space-y-1">
          {section.topics.map((topic, idx) => {
            const topicImage = images[idx];
            const guide = sectionId
              ? getProfessionalSystemGuide(sectionId, idx, topic.title)
              : null;
            return (
              <article key={idx} id={`ship-topic-${idx}`} className="bs-reading-section scroll-mt-20">
                <header className="bs-reading-heading">
                  <BookOpen className="h-4 w-4 shrink-0 text-[#7a5c1a]" />
                  <h2>{idx + 1}. {topic.title}</h2>
                </header>

                  <div className="bs-prose px-1 py-4 flex flex-col gap-4">
                    {/* 1. Tanım ve sistemin emniyet sınırı */}
                    {topic.introduction && (
                      <p className="text-sm text-foreground/90 leading-relaxed">{topic.introduction}</p>
                    )}

                    {guide && (
                      <>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <div className="bs-callout">
                            <span className="bs-callout-label">Sistemin görevi</span>
                            <p className="text-[12px] leading-relaxed">{guide.purpose}</p>
                          </div>
                          <div className="bs-callout">
                            <span className="bs-callout-label">Ne yapmaz / sınırı</span>
                            <p className="text-[12px] leading-relaxed">{guide.boundary}</p>
                          </div>
                        </div>

                        <SystemArchitectureDiagram title={topic.title} stages={guide.flow} />

                        {/* Fotoğraf, şemadan sonra ve doğru bağlam açıklamasıyla gösterilir. */}
                        {topicImage && (
                          <figure className="bs-photo overflow-hidden rounded-sm">
                            <img
                              src={topicImage}
                              alt={`${topic.title} için gerçek gemi kurulum örneği`}
                              className="h-48 w-full object-cover"
                              loading="lazy"
                            />
                            <figcaption className="border-t border-dotted border-[rgba(120,80,20,.4)] px-3 py-2 text-[11px] leading-relaxed" style={{ color: "rgba(90,61,20,.72)", filter: "none" }}>
                              <span className="font-semibold">Gerçek ekipman fotoğrafı: </span>
                              {guide.photoCaption ?? "Fotoğraf yalnız örnek bir fiziksel kurulumu gösterir; üretici, model ve gemiye özgü donanım onaylı plan ve kullanım kitabından doğrulanır."}
                            </figcaption>
                          </figure>
                        )}

                        <div className="bs-callout">
                          <span className="bs-callout-label">Sorumluluk ve komuta zinciri</span>
                          <p className="text-[12px] leading-relaxed">{guide.responsibleRole}</p>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                          {[
                            { title: "Hazırlık", Icon: ClipboardCheck, items: guide.prepare, className: "border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300" },
                            { title: "İşletmede izlenecekler", Icon: Eye, items: guide.monitor, className: "border-cyan-500/20 bg-cyan-500/5 text-cyan-700 dark:text-cyan-300" },
                            { title: "Çapraz doğrulama", Icon: CheckCircle2, items: guide.verify, className: "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300" },
                            { title: "Durdur ve yükselt", Icon: AlertOctagon, items: guide.stopAndEscalate, className: "border-destructive/25 bg-destructive/5 text-destructive" },
                          ].map(({ title, Icon, items }) => (
                            <section key={title} className="bs-callout">
                              <h3 className="bs-callout-label flex items-center gap-2" style={{ display: "flex" }}>
                                <Icon className="h-3.5 w-3.5" /> {title}
                              </h3>
                              <div className="space-y-1.5">
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
                          <h3 className="text-sm font-semibold" style={{ color: "#3f2a0e" }}>{sec.heading}</h3>
                          {sec.paragraphs?.map((p, pi) => (
                            <p key={pi} className="text-[13px] leading-relaxed">{p}</p>
                          ))}

                          {sec.table && (
                            <div className="bs-table-wrap">
                              <table className="bs-table">
                                <thead><tr>{sec.table.headers.map((h, hi) => <th key={hi}>{h}</th>)}</tr></thead>
                                <tbody>{sec.table.rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>)}</tbody>
                              </table>
                            </div>
                          )}

                          {sec.formula && (
                            <div className="bs-formula">
                              <p className="text-center text-sm font-semibold">{sec.formula.expression}</p>
                              {sec.formula.variables.map((v, vi) => (
                                <p key={vi} className="bs-muted text-[11px]">{v}</p>
                              ))}
                            </div>
                          )}

                          {sec.example && (
                            <div className="bs-callout">
                              <span className="bs-callout-label">Örnek</span>
                              <p className="text-xs font-semibold">{sec.example.problem}</p>
                              {sec.example.steps.map((s, si2) => (
                                <p key={si2} className="text-[12px]">{s}</p>
                              ))}
                              <p className="text-xs font-semibold">{sec.example.result}</p>
                            </div>
                          )}
                        </div>
                      ))}

                    {/* 4. Çalışma Prensibi */}
                    {topic.workingPrinciple && topic.workingPrinciple.length > 0 && (
                      <div className="bs-callout">
                        <span className="bs-callout-label">Çalışma Prensibi</span>
                        {topic.workingPrinciple.map((wp, wi) => (
                          <p key={wi} className="text-[12px] leading-relaxed">• {wp}</p>
                        ))}
                      </div>
                    )}

                    {/* 5. Kullanım */}
                    {topic.operation && topic.operation.length > 0 && (
                      <div className="bs-callout">
                        <span className="bs-callout-label">Kullanım</span>
                        {topic.operation.map((op, oi) => (
                          <p key={oi} className="text-[12px] leading-relaxed">{oi + 1}. {op}</p>
                        ))}
                      </div>
                    )}

                    {/* 6. Olası Arızalar ve Müdahale */}
                    {topic.faults && topic.faults.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <p className="text-xs font-semibold" style={{ color: "#8f1f1f" }}>Olası Arızalar ve Müdahale</p>
                        <div className="bs-table-wrap">
                          <table className="bs-table">
                            <thead>
                              <tr>
                                <th>Arıza</th>
                                <th>Sebep</th>
                                <th>Yapılacak</th>
                              </tr>
                            </thead>
                            <tbody>
                              {topic.faults.map((f, fi) => (
                                <tr key={fi} className="align-top">
                                  <td className="font-medium">{f.fault}</td>
                                  <td>{f.cause}</td>
                                  <td>{f.action}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 7. Önlemler ve Emniyet */}
                    {topic.precautions && topic.precautions.length > 0 && (
                      <div className="bs-callout" style={{ borderLeftColor: "#8f1f1f" }}>
                        <span className="bs-callout-label" style={{ color: "#8f1f1f" }}>Önlemler ve Emniyet</span>
                        {topic.precautions.map((pc, pci) => (
                          <p key={pci} className="text-[12px] leading-relaxed">• {pc}</p>
                        ))}
                      </div>
                    )}

                    {/* 8. Önemli Noktalar */}
                    {topic.keyPoints && topic.keyPoints.length > 0 && (
                      <div className="bs-callout">
                        <span className="bs-callout-label">Önemli Noktalar</span>
                        {topic.keyPoints.map((kp, ki) => (
                          <p key={ki} className="text-[12px]">• {kp}</p>
                        ))}
                      </div>
                    )}

                    {guide && (
                      <div className="grid gap-2 sm:grid-cols-2">
                        <section className="bs-callout">
                          <span className="bs-callout-label">Kayıt ve objektif kanıt</span>
                          <div className="space-y-1.5">
                            {guide.records.map((record, recordIndex) => (
                              <p key={recordIndex} className="text-[12px] leading-relaxed">• {record}</p>
                            ))}
                          </div>
                        </section>
                        <section className="bs-callout">
                          <span className="bs-callout-label">Dayanak ve gemiye özel kaynak</span>
                          <div className="space-y-2">
                            {guide.references.map((reference, referenceIndex) => (
                              <div key={`${reference.code}-${referenceIndex}`}>
                                <p className="text-[11px] font-semibold">{reference.code}</p>
                                <p className="bs-muted text-[11px] leading-relaxed">{reference.scope}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>
                    )}

                    {sectionId && hasShipSystemLongForm(sectionId, idx) && (
                      <Link
                        to={`/ship-systems/${sectionId}/${idx}`}
                        className="bs-btn--ghost mt-1 self-start"
                      >
                        Mesleki ders anlatımını aç →
                      </Link>
                    )}
                  </div>
              </article>
            );
          })}
      </div>
    </BookSheet>
  );
}
