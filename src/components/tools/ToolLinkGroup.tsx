import type { LucideIcon } from "lucide-react";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import { LibraryCompactCard, LibrarySectionHeading } from "@/components/library/LibraryInterface";

export interface ToolLink {
  title: string;
  icon: LucideIcon;
  to: string;
}

export function ToolLinkGroup({ title, links, accent = "accent-teal" }: { title: string; links: ToolLink[]; accent?: string }) {
  return (
    <section className="space-y-3">
      <LibrarySectionHeading badge={links.length}>{title}</LibrarySectionHeading>
      <InsetGroupedList columns={2}>
        {links.map((link) => (
          <LibraryCompactCard key={link.to} title={link.title} icon={link.icon} accent={accent} to={link.to} />
        ))}
      </InsetGroupedList>
    </section>
  );
}
