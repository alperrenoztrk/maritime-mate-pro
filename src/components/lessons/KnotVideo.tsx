import { useState } from "react";
import { Play } from "lucide-react";

interface KnotVideoProps {
  videoId: string;
  /** Accessible label, e.g. "İzbarço Bağı (Bowline)". */
  title: string;
  /** Local diagram used as the poster / offline fallback. */
  poster: string;
  credit: string;
}

/**
 * A lightweight "click-to-play" YouTube facade. Until the user presses play we
 * only render a still poster + a play button, so the page stays fast and uses
 * no data; the real (verified, embeddable) YouTube iframe is mounted on demand.
 *
 * The poster prefers YouTube's own high-quality thumbnail for a consistent,
 * professional look and silently falls back to the self-hosted diagram when the
 * thumbnail can't load (e.g. offline), so the frame is never blank.
 */
export default function KnotVideo({ videoId, title, poster, credit }: KnotVideoProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <figure className="mx-auto mb-3 max-w-md">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border/40 bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={`${title} — bağ atma videosu`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`${title} bağ atma videosunu oynat`}
          >
            <img
              src={thumbFailed ? poster : thumb}
              onError={() => setThumbFailed(true)}
              alt={`${title} bağının önizlemesi`}
              className={`h-full w-full ${thumbFailed ? "bg-white object-contain" : "object-cover"}`}
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600/90 shadow-lg ring-4 ring-white/25 transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-1 text-center text-micro text-muted-foreground/70">
        Video: {credit}
      </figcaption>
    </figure>
  );
}
