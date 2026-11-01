import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Palette,
  GraduationCap,
  LogOut,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { defaultProfileData } from "../../data/settings/settingsData";
import { STORAGE_KEYS, getStoredItem } from "../../utils/storage";

export default function ProfileDropdown({
  isOpen,
  onClose,
  triggerRef,
  onOpenLogoutModal,
}) {
  const dropdownRef = useRef(null);

  // Read profile directly on render whenever dropdown is open
  const profile = getStoredItem(
    STORAGE_KEYS.SETTINGS_PROFILE,
    defaultProfileData,
    (data) => typeof data === "object" && data !== null
  );

  // Escape key and click-outside dismissal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        if (triggerRef?.current) {
          triggerRef.current.focus();
        }
      }
    };

    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      role="menu"
      aria-label="User profile and settings"
      className="fixed top-18 left-3 right-3 sm:absolute sm:top-full sm:left-auto sm:right-0 mt-2 sm:w-80 max-w-sm bg-surface-container-low/95 backdrop-blur-2xl border border-surface-container-highest/60 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col py-2 transition-all"
    >
      {/* Profile Header / Identity Card */}
      <div className="px-4 py-3.5 border-b border-surface-container-highest/40 flex items-center gap-3 bg-surface-container/30">
        <img
          src={profile.avatarUrl || defaultProfileData.avatarUrl}
          alt={`${profile.fullName || "User"}'s avatar`}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/40 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-label-lg text-label-lg font-bold text-on-surface truncate">
              {profile.fullName || defaultProfileData.fullName}
            </h3>
            <span className="shrink-0" title="Active Polymath Pro">
              <Sparkles size={13} className="text-tertiary" />
            </span>
          </div>
          <p className="text-xs text-outline truncate">
            {profile.email || defaultProfileData.email}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-primary-container/30 text-primary text-[10px] font-bold tracking-wide uppercase">
              {profile.role ? profile.role.split("·")[0].trim() : "Level 24 Polymath"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links to Settings Tabs */}
      <div className="py-1 px-1">
        <Link
          to="/settings?tab=profile"
          role="menuitem"
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline group-hover:text-primary group-hover:bg-primary-container/20 transition-colors">
            <User size={16} />
          </div>
          <div className="flex-1">
            <span className="block leading-tight font-semibold">Profile & Account</span>
            <span className="text-[11px] text-outline">Designation & credentials</span>
          </div>
          <ExternalLink size={13} className="text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <Link
          to="/settings?tab=appearance"
          role="menuitem"
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline group-hover:text-secondary group-hover:bg-secondary-container/20 transition-colors">
            <Palette size={16} />
          </div>
          <div className="flex-1">
            <span className="block leading-tight font-semibold">Appearance & Theme</span>
            <span className="text-[11px] text-outline">Dark theme & cosmic accents</span>
          </div>
          <ExternalLink size={13} className="text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <Link
          to="/settings?tab=learning"
          role="menuitem"
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline group-hover:text-tertiary group-hover:bg-tertiary-container/20 transition-colors">
            <GraduationCap size={16} />
          </div>
          <div className="flex-1">
            <span className="block leading-tight font-semibold">Learning Preferences</span>
            <span className="text-[11px] text-outline">Study velocity & target topics</span>
          </div>
          <ExternalLink size={13} className="text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Divider */}
      <div className="my-1 border-t border-surface-container-highest/40"></div>

      {/* Demo Sign Out Action */}
      <div className="p-1">
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onClose();
            onOpenLogoutModal();
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-error hover:bg-error-container/20 transition-colors group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-error-container/20 flex items-center justify-center text-error group-hover:bg-error-container/40 transition-colors">
            <LogOut size={16} />
          </div>
          <div className="flex-1">
            <span className="block leading-tight">Sign Out (Demo)</span>
            <span className="text-[11px] text-on-error-container opacity-80">Reset active demo session</span>
          </div>
        </button>
      </div>
    </div>
  );
}
