import { ExternalLink, Images } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import imageCredits from "@/data/imageCredits.json";

interface ImageCredit {
  title: string;
  url: string;
  author: string;
  license: string;
}

const credits = imageCredits as ImageCredit[];

/**
 * Attribution for the freely licensed photos and diagrams used in the lessons.
 * CC BY and CC BY-SA require the author and licence to be shown; the list is
 * generated from the CREDITS tables by scripts/images/build-credits.mjs.
 */
export default function ImageCreditsPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 px-4 py-6">
      <PageHeader title="Image credits" icon={Images} variant="compact" />
      <p className="text-sm text-muted-foreground">
        The photos and diagrams in the lessons come from Wikimedia Commons and are used under the licences listed below. Tap a title to open its source page.
      </p>
      <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/80">
        {credits.map((credit) => (
          <li key={credit.url} className="px-4 py-3">
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm font-medium text-primary hover:underline"
            >
              <span className="min-w-0 break-words" translate="no" data-no-translate>
                {credit.title}
              </span>
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            </a>
            <p className="mt-1 text-xs text-muted-foreground">
              {credit.author ? (
                <span translate="no" data-no-translate>
                  {credit.author} ·{" "}
                </span>
              ) : null}
              <span translate="no" data-no-translate>
                {credit.license}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
