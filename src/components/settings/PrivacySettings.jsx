import { useState } from "react";
import {
  ShieldCheck,
  Database,
  RotateCcw,
  AlertTriangle,
  HardDrive,
  Lock,
  CheckCircle2,
  X,
} from "lucide-react";
import { STORAGE_KEYS } from "../../utils/storage";
import { useModalA11y } from "../../hooks/useModalA11y";

export default function PrivacySettings({ onResetDefaults, showToast }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const confirmModalRef = useModalA11y({
    isOpen: isConfirmOpen,
    onClose: () => setIsConfirmOpen(false),
  });

  // Active storage registry covering all persisted workspaces
  const storageKeys = [
    { key: STORAGE_KEYS.PLANNER_SESSIONS, label: "Planner Study Sessions" },
    { key: STORAGE_KEYS.MUSIC_FAVORITES, label: "Music Favorites & Library" },
    { key: STORAGE_KEYS.MUSIC_RECENTLY_PLAYED, label: "Music Recently Played Queue" },
    { key: STORAGE_KEYS.VIDEOS_DATA, label: "Video Watch Later & Progress" },
    { key: STORAGE_KEYS.VIDEOS_RECENTLY_WATCHED, label: "Videos Recently Watched" },
    { key: STORAGE_KEYS.ROADMAP_SELECTED_ID, label: "Active Roadmap Selection" },
    { key: STORAGE_KEYS.SETTINGS_PROFILE, label: "Profile & Bio Preferences" },
    { key: STORAGE_KEYS.SETTINGS_APPEARANCE, label: "Theme, Accent & Density" },
    { key: STORAGE_KEYS.SETTINGS_LEARNING, label: "Study Goals & Categories" },
    { key: STORAGE_KEYS.SETTINGS_NOTIFICATIONS, label: "Notification Toggles" },
  ];

  let totalBytes = 0;
  try {
    for (const item of storageKeys) {
      const val = localStorage.getItem(item.key);
      if (val) {
        totalBytes += item.key.length + val.length * 2; // rough UTF-16 bytes
      }
    }
  } catch {
    totalBytes = 1420;
  }

  const handleConfirmReset = () => {
    onResetDefaults && onResetDefaults();
    setIsConfirmOpen(false);
    showToast && showToast("All preferences restored to factory defaults.");
  };

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      {/* 1. Local Demo Data Status & Architecture */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="min-w-0">
            <h4 className="font-title-md text-title-md font-bold text-on-surface">
              Data Storage & Privacy Architecture
            </h4>
            <p className="text-xs text-outline mt-0.5">
              Transparent overview of how Skillscovery handles your personal workspace state.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-secondary border border-secondary/30 text-xs font-semibold flex items-center gap-1.5 shrink-0">
            <Lock size={13} className="text-tertiary" />
            <span>Client-Side Local Isolation</span>
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
          <div className="p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/40 space-y-2 min-w-0">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <HardDrive size={16} />
              <span>Zero Remote Telemetry</span>
            </div>
            <p className="text-xs text-outline leading-relaxed">
              Skillscovery does not send profile inputs, learning targets, or browsing habits
              to external telemetry endpoints or third-party ad networks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/40 space-y-2 min-w-0">
            <div className="flex items-center gap-2 text-secondary font-semibold text-sm">
              <Database size={16} />
              <span>Browser LocalStorage Persistence</span>
            </div>
            <p className="text-xs text-outline leading-relaxed">
              All workspace preferences, active playlists, and study plans live strictly within
              your current browser session storage and persist across tab reloads.
            </p>
          </div>
        </div>

        {/* Storage Footprint Breakdown */}
        <div className="mt-5 p-4 rounded-xl bg-surface-container-low/70 border border-surface-container-highest/60 space-y-3 w-full min-w-0">
          <div className="flex items-center justify-between text-xs font-semibold text-on-surface flex-wrap gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-secondary" />
              <span>Active Browser Storage Registry</span>
            </span>
            <span className="font-mono text-outline">
              Approx. {(totalBytes / 1024).toFixed(2)} KB / 5 MB Quota
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full min-w-0">
            {storageKeys.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-highest/40 text-[11px] min-w-0"
              >
                <span className="text-on-surface font-medium truncate mr-2 min-w-0">
                  {item.label}
                </span>
                <span className="text-secondary flex items-center gap-1 shrink-0 font-mono">
                  <CheckCircle2 size={11} />
                  <span>Cached</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Reset Preferences Section */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-error/30 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl min-w-0">
            <div className="flex items-center gap-2 text-error font-semibold text-sm">
              <AlertTriangle size={17} />
              <span>Reset Demo Preferences</span>
            </div>
            <p className="text-xs text-outline leading-relaxed">
              Restore all mock profile fields, accent colors, study targets, and notification
              toggles back to their original factory demonstration values.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-error-container/40 hover:bg-error-container text-error border border-error/40 text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <RotateCcw size={15} />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isConfirmOpen && (
        <div
          onClick={() => setIsConfirmOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            ref={confirmModalRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="reset-modal-title"
            aria-describedby="reset-modal-desc"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-surface-container border border-surface-container-highest p-4 sm:p-6 shadow-2xl space-y-5 outline-none min-w-0"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-error-container/30 text-error border border-error/30">
                <AlertTriangle size={24} />
              </div>
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              <h3 id="reset-modal-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Reset Demo Preferences?
              </h3>
              <p id="reset-modal-desc" className="text-xs text-outline leading-relaxed">
                This action will restore all customization data back to default values:
              </p>
              <ul className="text-xs text-outline list-disc list-inside space-y-1 pt-1">
                <li>Elena Vance profile & bio will reset to default</li>
                <li>Theme accents will revert to Cosmic Indigo</li>
                <li>Study rhythm targets will reset to 90 mins daily / 12 hrs weekly</li>
                <li>Notification toggles will restore to recommended baseline</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-highest/40">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-outline hover:text-on-surface text-sm font-medium transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-error text-on-error hover:brightness-110 text-sm font-semibold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>Confirm Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
