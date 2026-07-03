import { useCallback } from 'react';

// The neon theme has been removed from the app, so neon sound effects are
// permanently disabled. This hook is kept as a no-op compatibility stub for
// any existing call sites.
export const useNeonSound = () => {
  const playNeonClick = useCallback(() => {}, []);
  const playNeonHover = useCallback(() => {}, []);
  const playNeonSuccess = useCallback(() => {}, []);

  return {
    playNeonClick,
    playNeonHover,
    playNeonSuccess,
    soundEnabled: false,
  };
};
