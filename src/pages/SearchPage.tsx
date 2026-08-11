import { Search } from "lucide-react";
import { AppSearchExperience } from "@/components/search/AppSearchExperience";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { SEO } from "@/components/SEO";

export default function SearchPage() {
  return (
    <LibraryPageShell title="Ara" icon={Search} maxWidth="max-w-3xl">
      <SEO
        title="Ara — Mariner's Book"
        description="Dersler, hesaplamalar, operasyonel kaynaklar ve denizcilik terimleri arasında arama yapın."
        path="/search"
      />
      <AppSearchExperience />
    </LibraryPageShell>
  );
}
