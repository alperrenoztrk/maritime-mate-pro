import { useEffect, useRef, useState } from "react";

/** Seconds of play time; frozen while paused and resumed from the same point. */
export function useLightClock(playing: boolean): number {
  const [seconds, setSeconds] = useState(0);
  const elapsed = useRef(0);
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const startedAt = performance.now() - elapsed.current * 1000;
    const tick = (now: number) => {
      elapsed.current = (now - startedAt) / 1000;
      setSeconds(elapsed.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);
  return seconds;
}
