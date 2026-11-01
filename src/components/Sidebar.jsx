import { NavLink } from "react-router-dom";
import { useModalA11y } from "../hooks/useModalA11y";

export default function Sidebar({ isMobileOpen = false, onCloseMobile }) {
  const drawerRef = useModalA11y({
    isOpen: isMobileOpen,
    onClose: onCloseMobile,
  });

  const getNavClass = ({ isActive }) =>
    isActive
      ? "relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all group bg-surface-container-high text-on-surface font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
      : "flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-on-surface-variant font-body-md text-body-md hover:bg-surface-container-high hover:text-on-surface transition-all group";

  const handleNavClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        ref={drawerRef}
        role={isMobileOpen ? "dialog" : undefined}
        aria-modal={isMobileOpen ? "true" : undefined}
        aria-label="Sidebar navigation"
        className={`fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest/95 backdrop-blur-2xl z-50 flex flex-col justify-between py-6 px-4 shadow-2xl lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-6 overflow-y-auto">
          {/* Brand / Logo */}
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-400 text-lg font-extrabold text-white shadow-lg">
                S
              </div>
              <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface">
                Skillscovery
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-label-sm text-label-sm tracking-widest uppercase shadow-[0_0_12px_rgba(210,187,255,0.25)]">
                BETA
              </span>
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                type="button"
                aria-label="Close navigation menu"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Main Navigation"
            className="flex flex-col gap-1.5"
            data-active-classes="bg-surface-container-high text-on-surface font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
          >
            <NavLink
              to="/"
              end
              data-path="dashboard"
              className={getNavClass}
              onClick={handleNavClick}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? "text-primary" : "text-outline group-hover:text-primary"
                    }`}
                  >
                    dashboard
                  </span>
                  <span className="flex-1">Dashboard</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/learning"
              data-path="learning-hub"
              className={getNavClass}
              onClick={handleNavClick}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? "text-primary" : "text-outline group-hover:text-primary"
                    }`}
                  >
                    school
                  </span>
                  <span className="flex-1">Learning Hub</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/roadmaps"
              data-path="my-roadmaps"
              className={getNavClass}
              onClick={handleNavClick}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? "text-primary" : "text-outline group-hover:text-primary"
                    }`}
                  >
                    explore
                  </span>
                  <span className="flex-1">My Roadmaps</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/planner"
              data-path="study-planner"
              className={getNavClass}
              onClick={handleNavClick}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? "text-primary" : "text-outline group-hover:text-primary"
                    }`}
                  >
                    calendar_today
                  </span>
                  <span className="flex-1">Study Planner</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/analytics"
              data-path="analytics"
              className={getNavClass}
              onClick={handleNavClick}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? "text-primary" : "text-outline group-hover:text-primary"
                    }`}
                  >
                    analytics
                  </span>
                  <span className="flex-1">Analytics</span>
                </>
              )}
            </NavLink>

            <div className="pt-4 pb-2 px-3.5">
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                MEDIA & ENTERTAINMENT
              </p>
            </div>

            <NavLink
              to="/music"
              data-path="music-hub"
              className={getNavClass}
              onClick={handleNavClick}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? "text-tertiary" : "text-outline group-hover:text-tertiary"
                    }`}
                  >
                    headphones
                  </span>
                  <span className="flex-1">Music Hub</span>
                  <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm">
                    <span className="w-1 h-2 bg-tertiary rounded-full animate-pulse"></span>
                    <span className="w-1 h-3 bg-tertiary rounded-full animate-pulse"></span>
                    <span className="w-1 h-1.5 bg-tertiary rounded-full animate-pulse"></span>
                  </span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/videos"
              data-path="video-library"
              className={getNavClass}
              onClick={handleNavClick}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? "text-tertiary" : "text-outline group-hover:text-tertiary"
                    }`}
                  >
                    smart_display
                  </span>
                  <span className="flex-1">Video Library</span>
                </>
              )}
            </NavLink>

            <div className="my-2 mx-3.5 h-[1px] bg-surface-container-highest/40"></div>

            <NavLink
              to="/settings"
              data-path="settings"
              className={getNavClass}
              onClick={handleNavClick}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${
                      isActive ? "text-on-surface" : "text-outline group-hover:text-on-surface"
                    }`}
                  >
                    settings
                  </span>
                  <span className="flex-1">Settings</span>
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {/* Pro Quota Widget */}
        <div className="p-4 rounded-2xl bg-surface-container-low/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-3 mt-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-lg">
                cloud_done
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Pro Quota
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">
              PRO TIER
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-secondary-container via-primary-container to-tertiary-container shadow-[0_0_10px_rgba(76,215,246,0.3)]"></div>
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-outline">
              <span>Storage used</span>
              <span>15.2 / 20 GB</span>
            </div>
          </div>
          <button
            className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] cursor-pointer"
            type="button"
          >
            <span>Manage Subscription</span>
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
