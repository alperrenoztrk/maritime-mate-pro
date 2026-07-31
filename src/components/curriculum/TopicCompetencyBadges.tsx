import { competencyTracks } from "@/data/curriculumHierarchy";
import { cn } from "@/lib/utils";

const competencyLabels: Record<string, string> = {
  colreg: "COLREG",
  "bridge-watchkeeping-brm": "BRM",
  "manoeuvring-pilotage": "Manevra ve Pilotaj",
  "construction-damage-control": "Yapı ve Hasar Kontrolü",
  "security-isps-cyber": "ISPS ve Siber Güvenlik",
  "medical-first-aid": "Tıbbi İlk Yardım",
  gmdss: "GMDSS",
  "maritime-english": "Denizcilik İngilizcesi",
  "regulation-certification": "Mevzuat ve Denetim",
};

export function TopicCompetencyBadges({
  topicId,
  className,
}: {
  topicId?: string;
  className?: string;
}) {
  if (!topicId) return null;

  const relatedTracks = competencyTracks.filter((track) => track.topicIds.includes(topicId));
  if (relatedTracks.length === 0) return null;

  return (
    <span className={cn("mt-1 flex flex-wrap gap-1", className)}>
      {relatedTracks.map((track) => (
        <span
          key={track.id}
          aria-label={track.title}
          className="rounded-md border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-primary"
        >
          {competencyLabels[track.id] ?? track.title}
        </span>
      ))}
    </span>
  );
}
