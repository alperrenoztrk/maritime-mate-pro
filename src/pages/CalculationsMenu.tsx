import { SEO } from "@/components/SEO";
import CalculationsLibraryPage from "./library/CalculationsLibraryPage";

export default function CalculationsMenu() {
  return (
    <>
      <SEO
        title="Mariner's Book — Denizcilik Hesaplamaları"
        description="Navigasyon, stabilite, yük ve makine için interaktif denizcilik hesaplama araçları; birim dönüştürücüler ve pratik formüller."
        path="/calculations"
      />
      <CalculationsLibraryPage />
    </>
  );
}
