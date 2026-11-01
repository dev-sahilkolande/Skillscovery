/**
 * Skillscovery - Theme & Appearance Utility
 * Applies user-chosen accent colors, UI density, and themes to the DOM.
 */
import { STORAGE_KEYS, getStoredItem } from "./storage";
import { accentColorOptions, defaultAppearanceData } from "../data/settings/settingsData";

/**
 * Apply the given appearance settings to the document root element.
 *
 * @param {Object} appSettings - Appearance settings object
 */
export function applyAppearanceToDOM(appSettings) {
  if (typeof document === "undefined" || !appSettings) return;

  const root = document.documentElement;
  const selectedAccent = accentColorOptions.find(
    (a) => a.id === appSettings.accentColor
  );

  if (selectedAccent) {
    root.style.setProperty("--color-primary", selectedAccent.colorHex);
    root.style.setProperty(
      "--color-primary-container",
      selectedAccent.containerHex
    );
  } else {
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-primary-container");
  }

  root.setAttribute("data-density", appSettings.density || "comfortable");
  root.setAttribute("data-theme", appSettings.theme || "dark");
  root.setAttribute("data-reduced-motion", appSettings.reducedMotion ? "true" : "false");
  root.setAttribute("data-high-contrast", appSettings.highContrast ? "true" : "false");
}

/**
 * Initialize appearance from persisted storage on app bootstrap.
 */
export function initAppearance() {
  const appearance = getStoredItem(
    STORAGE_KEYS.SETTINGS_APPEARANCE,
    defaultAppearanceData,
    (data) => typeof data === "object" && data !== null
  );
  applyAppearanceToDOM(appearance);
}
