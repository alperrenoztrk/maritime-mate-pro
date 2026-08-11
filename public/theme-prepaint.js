(() => {
  const storageKey = "maritime-ui-theme-v2";
  let preference = "system";

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      preference = stored;
    }
  } catch {
    // Restricted WebViews can deny storage; system appearance remains safe.
  }

  const resolved = preference === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : preference;

  document.documentElement.classList.add(resolved);
  document.documentElement.style.colorScheme = resolved;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute("content", resolved === "dark" ? "#111318" : "#f8fafb");
  }
})();
