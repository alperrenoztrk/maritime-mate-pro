type LocalBackHandler = () => void;

let activeHandler: LocalBackHandler | null = null;

/** Registers the current screen's in-place back action (filter, category, etc.). */
export const registerLocalBackHandler = (handler: LocalBackHandler) => {
  activeHandler = handler;
  return () => {
    if (activeHandler === handler) activeHandler = null;
  };
};

/** Returns true when a screen consumed back without changing routes. */
export const requestLocalBack = () => {
  if (!activeHandler) return false;
  activeHandler();
  return true;
};
