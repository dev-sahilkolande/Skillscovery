import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";
import NotificationPopover from "./topbar/NotificationPopover";
import ProfileDropdown from "./topbar/ProfileDropdown";
import DemoLogoutModal from "./topbar/DemoLogoutModal";
import FocusSessionModal from "./focus/FocusSessionModal";
import { useNotifications } from "../hooks/useNotifications";
import { useFocusSession } from "../hooks/useFocusSession";
import { focusSessionStore } from "../utils/focusSessionStore";
import { defaultProfileData } from "../data/settings/settingsData";
import { STORAGE_KEYS, getStoredItem } from "../utils/storage";

export default function Topbar({ onToggleMobileMenu, isMobileMenuOpen = false }) {
  const navigate = useNavigate();

  // Search input ref & state
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform || "");

  // Popover state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Trigger refs for focus restoration
  const notificationsButtonRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Hook subscriptions
  const { unreadCount } = useNotifications();
  const {
    mode: focusMode,
    formattedTime,
    sessionTitle,
    isModalOpen,
    openModal,
    closeModal,
    pauseSession,
    resumeSession,
    resetSession,
  } = useFocusSession();

  // Profile data reactively read from storage
  const [profile, setProfile] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.SETTINGS_PROFILE,
      defaultProfileData,
      (data) => typeof data === "object" && data !== null
    )
  );

  // Listen for local profile updates and storage sync
  useEffect(() => {
    const handleStorageChange = () => {
      const updated = getStoredItem(
        STORAGE_KEYS.SETTINGS_PROFILE,
        defaultProfileData,
        (data) => typeof data === "object" && data !== null
      );
      setProfile(updated);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K to focus search input
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.select();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Demo logout confirmation handler
  const handleConfirmLogout = () => {
    // 1. Stop any running focus timer safely
    focusSessionStore.stopSession();

    // 2. Close modal
    setIsLogoutModalOpen(false);

    // 3. Show honest demo confirmation feedback
    setToast(
      "Signed out of demo session. Your learning data and preferences remain saved."
    );

    // 4. Return to Dashboard
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/learning?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Toast Feedback Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 sm:top-24 right-4 sm:right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest border border-surface-container-highest/80 text-on-surface shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200"
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
        </div>
      )}

      <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 sm:h-20 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-2.5 sm:px-6 lg:px-8 gap-2 sm:gap-4 transition-[left] duration-300">
        {/* Search Input & Mobile Drawer Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-1 max-w-md min-w-0">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-surface-container/80 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center justify-center cursor-pointer shrink-0"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label={
              isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">menu</span>
          </button>

          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full flex items-center min-w-0"
            role="search"
          >
            <span
              className="material-symbols-outlined absolute left-2.5 sm:left-3 text-outline text-base sm:text-xl pointer-events-none"
              aria-hidden="true"
            >
              search
            </span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 sm:pl-11 pr-3 sm:pr-16 py-1.5 sm:py-2.5 rounded-xl bg-surface-container/70 text-on-surface placeholder:text-outline text-xs sm:text-sm font-body-md focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all truncate"
              placeholder="Search courses, tracks, docs..."
              type="text"
              aria-label="Search courses, tracks, and documentation"
            />
            <kbd className="hidden sm:inline-block absolute right-3 px-2 py-0.5 rounded-md bg-surface-container-highest/80 text-on-surface-variant font-label-sm text-label-sm font-semibold pointer-events-none">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </form>
        </div>

        {/* Right Controls: Streak, Notifications, Focus Action & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Streak Counter */}
          <div
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface-container/80 shadow-[0_0_16px_rgba(245,158,11,0.2)]"
            aria-label="18 Days Study Streak"
          >
            <span className="text-sm sm:text-lg" aria-hidden="true">
              🔥
            </span>
            <span className="font-label-md text-label-md font-semibold text-on-surface hidden sm:inline">
              18 Days Streak
            </span>
            <span className="font-label-sm text-[11px] sm:text-label-sm font-semibold text-on-surface sm:hidden">
              18d
            </span>
          </div>

          {/* Notifications Icon Button & Popover */}
          <div className="relative">
            <button
              ref={notificationsButtonRef}
              onClick={() => {
                setIsNotificationsOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
              className={`relative p-1.5 sm:p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                isNotificationsOpen
                  ? "bg-surface-container text-on-surface ring-1 ring-primary/40"
                  : "bg-surface-container/80 text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
              type="button"
              aria-label={`Notifications${
                unreadCount > 0 ? ` (${unreadCount} unread)` : ""
              }`}
              aria-haspopup="dialog"
              aria-expanded={isNotificationsOpen}
            >
              <span
                className="material-symbols-outlined text-lg sm:text-xl"
                aria-hidden="true"
              >
                notifications
              </span>
              {unreadCount > 0 && (
                <span
                  className="absolute top-1 sm:top-2 right-1 sm:right-2 w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(76,215,246,0.8)]"
                  aria-hidden="true"
                ></span>
              )}
            </button>

            {/* Notification Popover */}
            <NotificationPopover
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              triggerRef={notificationsButtonRef}
            />
          </div>

          {/* Focus Session Topbar Integration (Shared Store) */}
          {focusMode === "idle" && (
            <button
              onClick={openModal}
              className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container hover:brightness-110 text-on-background font-label-md text-label-md font-semibold transition-all shadow-[0_0_20px_rgba(96,1,209,0.3)] cursor-pointer"
              type="button"
              aria-label="Start Focus Session"
              title="Configure Focus Session"
            >
              <span
                className="material-symbols-outlined text-lg"
                aria-hidden="true"
              >
                play_arrow
              </span>
              <span className="hidden lg:inline">Start Focus Session</span>
              <span className="lg:hidden">Focus</span>
            </button>
          )}

          {focusMode === "running" && (
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-secondary-container/20 border border-secondary/40 shadow-[0_0_16px_rgba(96,1,209,0.25)]">
              <button
                type="button"
                onClick={openModal}
                className="flex items-center gap-2 text-left hover:opacity-85 transition-opacity cursor-pointer"
                aria-label="View focus timer controls"
                title="Open focus controls"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse shrink-0"
                  aria-hidden="true"
                ></span>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs font-bold text-on-surface leading-tight">
                    {formattedTime}
                  </span>
                  <span className="text-[10px] text-tertiary truncate max-w-[110px] font-medium leading-none">
                    {sessionTitle}
                  </span>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  pauseSession();
                }}
                type="button"
                className="ml-0.5 p-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors cursor-pointer"
                aria-label="Pause focus timer"
                title="Pause"
              >
                <span className="material-symbols-outlined text-base">pause</span>
              </button>
            </div>
          )}

          {focusMode === "paused" && (
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface-container-high border border-outline/30">
              <button
                type="button"
                onClick={openModal}
                className="flex items-center gap-2 text-left hover:opacity-85 transition-opacity cursor-pointer"
                aria-label="View paused focus timer controls"
                title="Open focus controls"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full bg-outline shrink-0"
                  aria-hidden="true"
                ></span>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs font-bold text-on-surface leading-tight">
                    {formattedTime}
                  </span>
                  <span className="text-[10px] text-outline truncate max-w-[110px] font-medium leading-none">
                    Paused
                  </span>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resumeSession();
                }}
                type="button"
                className="ml-0.5 p-1 rounded-lg bg-secondary-container text-on-secondary-container hover:brightness-110 transition-colors cursor-pointer"
                aria-label="Resume focus timer"
                title="Resume"
              >
                <span className="material-symbols-outlined text-base">
                  play_arrow
                </span>
              </button>
            </div>
          )}

          {focusMode === "completed" && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-tertiary-container/20 border border-tertiary/40">
              <button
                type="button"
                onClick={openModal}
                className="flex items-center gap-1.5 text-left hover:opacity-85 transition-opacity cursor-pointer"
                aria-label="View focus session completion summary"
                title="View completion summary"
              >
                <span
                  className="material-symbols-outlined text-tertiary text-base"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-label-sm text-label-sm font-bold text-tertiary">
                  Completed
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetSession();
                }}
                type="button"
                className="ml-0.5 p-1 rounded-lg hover:bg-surface-container transition-colors text-outline hover:text-on-surface cursor-pointer"
                aria-label="Reset focus session"
                title="Reset timer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          )}

          {/* User Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              ref={profileButtonRef}
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setIsNotificationsOpen(false);
              }}
              className={`flex items-center gap-1.5 sm:gap-2.5 pl-1 sm:pl-2 py-1 pr-1 sm:pr-2 rounded-xl transition-all cursor-pointer ${
                isProfileOpen
                  ? "bg-surface-container-high ring-1 ring-primary/40"
                  : "hover:bg-surface-container/60"
              }`}
              type="button"
              aria-label="User account menu"
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
            >
              <img
                alt={`${profile.fullName || defaultProfileData.fullName}'s profile avatar`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-primary/40 shrink-0"
                src={profile.avatarUrl || defaultProfileData.avatarUrl}
              />
              <div className="hidden xl:flex flex-col text-left">
                <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight truncate max-w-[120px]">
                  {profile.fullName || defaultProfileData.fullName}
                </span>
                <span className="font-label-sm text-label-sm text-primary leading-tight truncate max-w-[120px]">
                  {profile.role
                    ? profile.role.split("·")[0].trim()
                    : "Level 24 Polymath"}
                </span>
              </div>
              <span
                className="material-symbols-outlined text-outline text-sm hidden sm:inline"
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            <ProfileDropdown
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              triggerRef={profileButtonRef}
              onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* Demo Logout Confirmation Modal */}
      <DemoLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />

      {/* Focus Session Modal */}
      <FocusSessionModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
