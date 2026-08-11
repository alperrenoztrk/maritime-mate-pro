import { SEO } from "@/components/SEO";
import CalculationsLibraryPage from "./library/CalculationsLibraryPage";

export default function CalculationsMenu() {
  return (
    <>
      <SEO
        title="Mariner's Book — Maritime Calculations"
        description="Interactive maritime calculation tools for navigation, stability, cargo and engineering; unit converters and practical formulas."
        path="/calculations"
      />
      <CalculationsLibraryPage />
    </>
  );
}
