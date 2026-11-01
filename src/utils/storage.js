/**
 * Skillscovery - Versioned Storage Foundation
 * Provides resilient, safe, versioned persistence utilities with JSON validation,
 * corruption recovery, and graceful fallbacks.
 */

const STORAGE_PREFIX = "skillscovery_v1_";

export const STORAGE_KEYS = {
  // Focus Session / Pomodoro
  FOCUS_SESSION: `${STORAGE_PREFIX}focus_session`,

  // Planner
  PLANNER_SESSIONS: `${STORAGE_PREFIX}planner_sessions`,

  // Music Preferences
  MUSIC_FAVORITES: `${STORAGE_PREFIX}music_favorites`,
  MUSIC_RECENTLY_PLAYED: `${STORAGE_PREFIX}music_recently_played`,
  MUSIC_VOLUME: `${STORAGE_PREFIX}music_volume`,
  MUSIC_SHUFFLE: `${STORAGE_PREFIX}music_shuffle`,
  MUSIC_REPEAT: `${STORAGE_PREFIX}music_repeat`,

  // Videos
  VIDEOS_DATA: `${STORAGE_PREFIX}videos_data`,
  VIDEOS_RECENTLY_WATCHED: `${STORAGE_PREFIX}videos_recently_watched`,

  // Course Bookmarks
  COURSE_BOOKMARKS: `${STORAGE_PREFIX}course_bookmarks`,

  // Roadmaps
  ROADMAP_SELECTED_ID: `${STORAGE_PREFIX}roadmap_selected_id`,

  // Settings
  SETTINGS_PROFILE: `${STORAGE_PREFIX}settings_profile`,
  SETTINGS_APPEARANCE: `${STORAGE_PREFIX}settings_appearance`,
  SETTINGS_LEARNING: `${STORAGE_PREFIX}settings_learning`,
  SETTINGS_NOTIFICATIONS: `${STORAGE_PREFIX}settings_notifications`,

  // Notifications Popover State
  NOTIFICATIONS_READ: `${STORAGE_PREFIX}notifications_read`,
  NOTIFICATIONS_DISMISSED: `${STORAGE_PREFIX}notifications_dismissed`,
};

// Legacy key mappings for seamless backward-compatibility migration
const LEGACY_KEYS = {
  [STORAGE_KEYS.SETTINGS_PROFILE]: "skillscovery_settings_profile",
  [STORAGE_KEYS.SETTINGS_APPEARANCE]: "skillscovery_settings_appearance",
  [STORAGE_KEYS.SETTINGS_LEARNING]: "skillscovery_settings_learning",
  [STORAGE_KEYS.SETTINGS_NOTIFICATIONS]: "skillscovery_settings_notifications",
  [STORAGE_KEYS.VIDEOS_DATA]: "skillscovery_watch_later_ids",
};

/**
 * Check if localStorage is supported and accessible in the current environment
 */
export function isStorageAvailable() {
  if (typeof window === "undefined" || !window.localStorage) {
    return false;
  }
  try {
    const testKey = "__skillscovery_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely retrieve and parse a stored JSON item with corruption resilience.
 *
 * @param {string} key - The versioned storage key to retrieve
 * @param {*} defaultValue - Fallback value if storage is empty, missing, or corrupted
 * @param {Function} [validator] - Optional validation function (e.g. (data) => Array.isArray(data))
 * @returns {*} The parsed item or defaultValue
 */
export function getStoredItem(key, defaultValue, validator = null) {
  if (!isStorageAvailable()) {
    return defaultValue;
  }

  try {
    let raw = window.localStorage.getItem(key);

    // Fall back to legacy key if versioned key has not been populated yet
    if (raw === null && LEGACY_KEYS[key]) {
      const legacyKey = LEGACY_KEYS[key];
      const legacyRaw = window.localStorage.getItem(legacyKey);
      if (legacyRaw !== null) {
        raw = legacyRaw;
        // Migrate to versioned key automatically
        try {
          window.localStorage.setItem(key, legacyRaw);
        } catch {
          // ignore write errors during read migration
        }
      }
    }

    if (raw === null || raw === undefined) {
      return defaultValue;
    }

    const parsed = JSON.parse(raw);

    // If a validator is provided, ensure parsed data satisfies the schema
    if (typeof validator === "function") {
      if (!validator(parsed)) {
        console.warn(`[Storage] Validation failed for stored key "${key}". Falling back to default.`);
        return defaultValue;
      }
    }

    return parsed;
  } catch (err) {
    console.warn(`[Storage] Failed to parse stored key "${key}" (corrupted data). Falling back to default.`, err);
    return defaultValue;
  }
}

/**
 * Safely serialize and persist an item to localStorage.
 *
 * @param {string} key - The versioned storage key
 * @param {*} value - The value to store
 * @returns {boolean} True if write succeeded, false otherwise
 */
export function setStoredItem(key, value) {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (err) {
    console.warn(`[Storage] Failed to write key "${key}" to localStorage.`, err);
    return false;
  }
}

/**
 * Safely remove an item from localStorage.
 *
 * @param {string} key - The versioned storage key to remove
 */
export function removeStoredItem(key) {
  if (!isStorageAvailable()) return;

  try {
    window.localStorage.removeItem(key);
    // Also remove legacy key if mapped
    if (LEGACY_KEYS[key]) {
      window.localStorage.removeItem(LEGACY_KEYS[key]);
    }
  } catch (err) {
    console.warn(`[Storage] Failed to remove key "${key}".`, err);
  }
}

/**
 * Clear all Skillscovery-scoped storage keys.
 */
export function clearAllSkillscoveryStorage() {
  if (!isStorageAvailable()) return;

  try {
    const keysToRemove = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && (k.startsWith("skillscovery_") || Object.values(STORAGE_KEYS).includes(k))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  } catch (err) {
    console.warn("[Storage] Failed to clear Skillscovery storage keys.", err);
  }
}
