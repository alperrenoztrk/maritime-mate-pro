import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/** The Canvas is demand-driven: leave time for scrolling and the rest of the
 * app instead of rendering at the phone display's 60/120 Hz refresh rate.
 * OrbitControls can still request frames while paused for camera gestures. */
export function SimulationRenderLoop({ paused, fps }: { paused: boolean; fps: number }) {
  const invalidate = useThree(state => state.invalidate);
  useEffect(() => {
    invalidate();
    if (paused) return;
    const timer = window.setInterval(() => invalidate(), 1000 / fps);
    return () => window.clearInterval(timer);
  }, [paused, fps, invalidate]);
  return null;
}
