import { ChevronLeft, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import { getTopicContentsByCategory } from "@/data/topicContents";
import type { TopicDetailContent } from "@/data/navigationTopicContents";
import FluidMechanicsTopicsPage from "@/pages/FluidMechanicsTopicsPage";
import chartPlotting from "@/assets/navigation/chart-plotting.jpg";
import compass from "@/assets/navigation/compass.svg";
import gpsSatellites from "@/assets/navigation/gps-satellites.svg";
import radarDisplay from "@/assets/navigation/radar-display.svg";
import ecdisDisplay from "@/assets/navigation/ecdis-display.svg";
import tideCurrent from "@/assets/navigation/tide-current.svg";
import mercatorProjection from "@/assets/navigation/mercator-projection.svg";
import greatCircleRhumb from "@/assets/navigation/great-circle-vs-rhumb.svg";
import sextant from "@/assets/navigation/sextant.svg";
import weatherSystems from "@/assets/navigation/weather-systems.svg";
import aisTargets from "@/assets/navigation/ais-targets.svg";
import navtexReceiver from "@/assets/navigation/navtex-receiver.svg";
import autopilotControl from "@/assets/navigation/autopilot-control.svg";
import vhfRadio from "@/assets/navigation/vhf-radio.svg";
import safetyEquipment from "@/assets/navigation/safety-equipment.svg";
import gnomonicProjection from "@/assets/navigation/gnomonic-projection.svg";
import coordinateSystem from "@/assets/navigation/coordinate-system-1.jpg";
import latitudeParallels from "@/assets/navigation/latitude-parallels.jpg";
import longitudeConcept from "@/assets/navigation/longitude-concept.jpg";
import yonCompassRose from "@/assets/navigation/yon-compass-rose.jpg";
import yonWindDrift from "@/assets/navigation/yon-wind-drift.png";
import { useTopicContentOverrides } from "@/hooks/useTopicContentOverrides";
import { buildSectionKey, type ContentCategory } from "@/services/topicContentOverrides";

const navigationImageFallbacks = [
  { keywords: ["sextant", "sekstant"], src: sextant },
  { keywords: ["mercator"], src: mercatorProjection },
  { keywords: ["gnomonic", "great circle", "büyük daire", "loxodrom", "loxodrome", "rhumb"], src: greatCircleRhumb },
  { keywords: ["gps", "gnss", "satellite", "trilaterasyon", "dop", "hdop", "pdop"], src: gpsSatellites },
  { keywords: ["radar", "arpa"], src: radarDisplay },
  { keywords: ["ecdis"], src: ecdisDisplay },
  { keywords: ["tide", "gelgit", "tidal", "set", "drift"], src: tideCurrent },
  { keywords: ["chart", "harita", "plot", "mevki", "position", "fix"], src: chartPlotting },
  { keywords: ["compass", "pusula", "bearing", "yön", "true", "manyetik", "variation", "deviation"], src: yonCompassRose },
  { keywords: ["enlem", "latitude"], src: latitudeParallels },
  { keywords: ["boylam", "longitude"], src: longitudeConcept },
  { keywords: ["koordinat", "coordinate"], src: coordinateSystem },
  { keywords: ["wind", "rüzg", "leeway", "dalga"], src: yonWindDrift },
  { keywords: ["weather", "meteoroloji"], src: weatherSystems },
  { keywords: ["ais"], src: aisTargets },
  { keywords: ["navtex"], src: navtexReceiver },
  { keywords: ["autopilot"], src: autopilotControl },
  { keywords: ["vhf", "gmdss", "radio"], src: vhfRadio },
  { keywords: ["squat", "ukc", "emniyet", "safety"], src: safetyEquipment },
  { keywords: ["projection", "projeksiyon"], src: gnomonicProjection },
  { keywords: ["north", "kuzey"], src: compass }
];

const resolveNavigationImage = (
  src: string | undefined,
  sectionTitle: string,
  topicTitle: string,
  alt: string | undefined,
  replaceExternal: boolean
) => {
  if (!src) {
    return undefined;
  }
  if (!replaceExternal || !src.startsWith("http")) {
    return src;
  }
  const haystack = `${alt ?? ""} ${sectionTitle} ${topicTitle}`.toLowerCase();
  const match = navigationImageFallbacks.find(item =>
    item.keywords.some(keyword => haystack.includes(keyword))
  );
  return match?.src ?? chartPlotting;
};

export default function LessonTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{ categoryId: string; topicTitle: string }>();
  const decodedTitle = topicTitle ? decodeURIComponent(topicTitle) : "";
  const overrides = useTopicContentOverrides();
  if (categoryId === "machine" && decodedTitle === "Akışkanlar Mekaniği") {
    return <FluidMechanicsTopicsPage />;
  }
  const fallbackContent: TopicDetailContent = {
    title: decodedTitle || "Konu Detayı",
    introduction:
      "Bu konu başlığı için içerik hazırlanmaktadır. Şimdilik sayfa iskeleti yayınlandı; görseller ve ayrıntılı anlatım en kısa sürede eklenecektir.",
    sections: [
      {
        title: "İçerik hazırlanıyor",
        content:
          "Bu başlık için örnekler, tablolar ve görseller hazırlanıyor. Güncel sürümde bu sayfa, yeni içerikler eklendikçe otomatik olarak zenginleşecektir."
      }
    ]
  };
  const categoryContents = getTopicContentsByCategory(categoryId);
  const content = categoryContents[decodedTitle] ?? fallbackContent;
  const shouldReplaceExternalImages = categoryId === "navigation";

  if (!categoryId || !decodedTitle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">İçerik bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <Link
          to={`/lessons/${categoryId}/topics`}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Geri
        </Link>
        <h1 className="text-base font-bold text-foreground sm:text-lg">{content.title}</h1>
        <div className="w-12" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-8 p-4 sm:p-6">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm leading-relaxed text-foreground/90">{stripMarkdown(content.introduction)}</p>
        </div>

        {content.sections.map((section, index) => {
          const categoryKey = (categoryId ?? "navigation") as ContentCategory;
          const overrideKey = buildSectionKey(categoryKey, decodedTitle || content.title, section.title);
          const override = overrides[overrideKey];
          const resolvedContent = override?.content || section.content;

          return (
          <section key={`${section.title}-${index}`} className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>

            {section.image && (
              <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
                <img
                  src={resolveNavigationImage(
                    section.image,
                    section.title,
                    content.title,
                    section.imageAlt,
                    shouldReplaceExternalImages
                  )}
                  alt={section.imageAlt || section.title}
                  className="h-48 w-full object-contain bg-muted/30"
                  loading="lazy"
                />
              </div>
            )}

            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
                ),
                img: ({ src, alt }) => (
                  <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
                    <img
                      src={resolveNavigationImage(
                        src,
                        section.title,
                        content.title,
                        alt,
                        shouldReplaceExternalImages
                      )}
                      alt={alt || section.title}
                      className="h-48 w-full object-contain bg-muted/30"
                      loading="lazy"
                    />
                  </div>
                )
              }}
            >
              {stripDollarSigns(resolvedContent)}
            </ReactMarkdown>

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-2 pl-1">
                {section.bulletPoints.map((point, pointIndex) => (
                  <li key={`${section.title}-point-${pointIndex}`} className="flex items-start gap-3 text-sm text-foreground/80">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{stripMarkdown(point)}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.formula && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="font-mono text-sm font-medium text-amber-700 dark:text-amber-400">
                  {section.formula.text}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {section.formula.description}
                </p>
              </div>
            )}
          </section>
          );
        })}

        {content.keyPoints && content.keyPoints.length > 0 && (
          <section className="rounded-xl border border-border/40 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-foreground">Önemli Noktalar</h2>
            </div>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li key={`key-point-${index}`} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{stripMarkdown(point)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
