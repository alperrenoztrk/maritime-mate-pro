import { useEffect } from 'react';

const MOTION_DURATIONS = {
  instant: 120,
  fast: 180,
  base: 260,
  slow: 360,
} as const;

export const useFrameRate = () => {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Refresh rate controls how often an animation is sampled, not how long the
    // animation should last. Browsers automatically render CSS/WAAPI motion at
    // the display's available refresh rate, so keep human-perceptible durations
    // stable on both 60 Hz and 120 Hz devices.
    const applyMotionPreference = (reduceMotion: boolean) => {
      root.style.setProperty('--frame-rate', 'auto');
      root.style.setProperty('--motion-instant', `${reduceMotion ? 1 : MOTION_DURATIONS.instant}ms`);
      root.style.setProperty('--motion-fast', `${reduceMotion ? 1 : MOTION_DURATIONS.fast}ms`);
      root.style.setProperty('--motion-base', `${reduceMotion ? 1 : MOTION_DURATIONS.base}ms`);
      root.style.setProperty('--motion-slow', `${reduceMotion ? 1 : MOTION_DURATIONS.slow}ms`);
      // Backward-compatible aliases used by older components.
      root.style.setProperty('--animation-duration', `${reduceMotion ? 1 : MOTION_DURATIONS.base}ms`);
      root.style.setProperty('--transition-duration', `${reduceMotion ? 1 : MOTION_DURATIONS.base}ms`);
      root.toggleAttribute('data-reduce-motion', reduceMotion);
    };

    const handleChange = (event: MediaQueryListEvent) => applyMotionPreference(event.matches);
    applyMotionPreference(reducedMotionQuery.matches);
    if (reducedMotionQuery.addEventListener) reducedMotionQuery.addEventListener('change', handleChange);
    else reducedMotionQuery.addListener?.(handleChange);

    return () => {
      if (reducedMotionQuery.removeEventListener) reducedMotionQuery.removeEventListener('change', handleChange);
      else reducedMotionQuery.removeListener?.(handleChange);
    };
  }, []);

  return {
    // Kept for compatibility with existing consumers. Rendering cadence is
    // intentionally delegated to the browser/display compositor.
    frameRate: 'auto' as const,
    updateFrameRate: () => {},
  };
};
