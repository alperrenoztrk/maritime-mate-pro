import { Search } from "lucide-react";
import { AppSearchExperience } from "@/components/search/AppSearchExperience";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { SEO } from "@/components/SEO";

export default function SearchPage() {
  return (
    <LibraryPageShell title="Ara" icon={Search} maxWidth="max-w-3xl">
      <SEO
        title="Search — Mariner's Book"
        description="Search across lessons, calculations, operational references and maritime terms."
        path="/search"
      />
      <AppSearchExperience />
    </LibraryPageShell>
  );
}
