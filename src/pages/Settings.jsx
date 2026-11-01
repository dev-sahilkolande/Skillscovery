import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  X,
  Sparkles,
  Sliders,
} from "lucide-react";
import SettingsNavigation from "../components/settings/SettingsNavigation";
import ProfileSettings from "../components/settings/ProfileSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import LearningPreferences from "../components/settings/LearningPreferences";
import NotificationSettings from "../components/settings/NotificationSettings";
import PrivacySettings from "../components/settings/PrivacySettings";
import AboutSettings from "../components/settings/AboutSettings";
import {
  defaultProfileData,
  defaultAppearanceData,
  defaultLearningPreferences,
  defaultNotificationSettings,
} from "../data/settings/settingsData";
import {
  STORAGE_KEYS,
  getStoredItem,
  setStoredItem,
  removeStoredItem,
} from "../utils/storage";
import { applyAppearanceToDOM } from "../utils/theme";

const VALID_TABS = [
  "profile",
  "appearance",
  "learning",
  "notifications",
  "privacy",
  "about",
];

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : "profile";

  const [toast, setToast] = useState(null);

  const handleSelectTab = (tab) => {
    setSearchParams({ tab });
  };

  // 1. Profile State
  const [profile, setProfile] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.SETTINGS_PROFILE,
      defaultProfileData,
      (data) => typeof data === "object" && data !== null
    )
  );

  // 2. Appearance State
  const [appearance, setAppearance] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.SETTINGS_APPEARANCE,
      defaultAppearanceData,
      (data) => typeof data === "object" && data !== null
    )
  );

  // 3. Learning Preferences State
  const [learningPrefs, setLearningPrefs] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.SETTINGS_LEARNING,
      defaultLearningPreferences,
      (data) => typeof data === "object" && data !== null
    )
  );

  // 4. Notification Settings State
  const [notifications, setNotifications] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.SETTINGS_NOTIFICATIONS,
      defaultNotificationSettings,
      (data) => typeof data === "object" && data !== null
    )
  );

  // Toast feedback helper
  const showToast = useCallback((message) => {
    setToast(message);
    const timer = setTimeout(() => {
      setToast(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  // Apply appearance on mount and when appearance changes
  useEffect(() => {
    applyAppearanceToDOM(appearance);
  }, [appearance]);

  // Save Handlers
  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    setStoredItem(STORAGE_KEYS.SETTINGS_PROFILE, newProfile);
  };

  const handleUpdateAppearance = (newAppearance) => {
    setAppearance(newAppearance);
    applyAppearanceToDOM(newAppearance);
    setStoredItem(STORAGE_KEYS.SETTINGS_APPEARANCE, newAppearance);
  };

  const handleSaveLearning = (newPrefs) => {
    setLearningPrefs(newPrefs);
    setStoredItem(STORAGE_KEYS.SETTINGS_LEARNING, newPrefs);
  };

  const handleUpdateNotifications = (newNotifs) => {
    setNotifications(newNotifs);
    setStoredItem(STORAGE_KEYS.SETTINGS_NOTIFICATIONS, newNotifs);
  };

  // Reset All Preferences to Factory Defaults
  const handleResetDefaults = () => {
    setProfile(defaultProfileData);
    setAppearance(defaultAppearanceData);
    setLearningPrefs(defaultLearningPreferences);
    setNotifications(defaultNotificationSettings);

    applyAppearanceToDOM(defaultAppearanceData);

    removeStoredItem(STORAGE_KEYS.SETTINGS_PROFILE);
    removeStoredItem(STORAGE_KEYS.SETTINGS_APPEARANCE);
    removeStoredItem(STORAGE_KEYS.SETTINGS_LEARNING);
    removeStoredItem(STORAGE_KEYS.SETTINGS_NOTIFICATIONS);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-8"
    >
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-4 sm:right-8 left-4 sm:left-auto max-w-md z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest border border-surface-container-highest/80 text-on-surface shadow-2xl backdrop-blur-lg"
          >
            <CheckCircle2 size={18} className="text-secondary shrink-0" />
            <span className="text-sm font-medium">{toast}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 p-1 rounded-lg text-outline hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Page Hero Header */}
      <section className="relative w-full rounded-2xl bg-surface-container-low/90 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl min-w-0 max-w-full">
        {/* Ambient Glows */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm tracking-wide">
              <Sparkles size={14} className="text-tertiary animate-pulse" />
              <span>Workspace Preferences & Configuration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-headline-lg font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3">
              <span>Settings & Preferences</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-body-lg text-on-surface-variant leading-relaxed">
              Manage your personal polymath profile, learning targets, interface theme, and client notifications.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-surface-container-high/80 border border-surface-container-highest/60 flex items-center gap-2 text-xs font-mono text-outline">
              <Sliders size={15} className="text-primary" />
              <span>Client State Cached</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Settings Layout: Navigation + Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start w-full min-w-0">
        {/* Navigation Tabs Sidebar */}
        <SettingsNavigation
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
        />

        {/* Dynamic Section Content */}
        <div className="flex-1 w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && (
                <ProfileSettings
                  profile={profile}
                  onSaveProfile={handleSaveProfile}
                  showToast={showToast}
                />
              )}

              {activeTab === "appearance" && (
                <AppearanceSettings
                  appearance={appearance}
                  onUpdateAppearance={handleUpdateAppearance}
                  showToast={showToast}
                />
              )}

              {activeTab === "learning" && (
                <LearningPreferences
                  preferences={learningPrefs}
                  onSavePreferences={handleSaveLearning}
                  showToast={showToast}
                />
              )}

              {activeTab === "notifications" && (
                <NotificationSettings
                  notifications={notifications}
                  onUpdateNotifications={handleUpdateNotifications}
                  showToast={showToast}
                />
              )}

              {activeTab === "privacy" && (
                <PrivacySettings
                  onResetDefaults={handleResetDefaults}
                  showToast={showToast}
                />
              )}

              {activeTab === "about" && <AboutSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
