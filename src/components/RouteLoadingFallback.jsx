/**
 * Skillscovery - Route Loading Fallback
 * Provides an accessible, visually consistent, zero-layout-shift loading fallback
 * for React.lazy() dynamic route components.
 */
export default function RouteLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="w-full min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Screen Reader Announcement */}
      <span className="sr-only">Loading page content, please wait...</span>

      {/* Ambient Cosmic Background Glows */}
      <div
        className="absolute w-72 h-72 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none -top-10 -right-10"
        aria-hidden="true"
      />
      <div
        className="absolute w-72 h-72 rounded-full bg-tertiary-container/10 blur-3xl pointer-events-none -bottom-10 -left-10"
        aria-hidden="true"
      />

      {/* Loading Indicator Card */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-surface-container-low/70 border border-surface-container-highest/40 backdrop-blur-xl shadow-xl max-w-xs w-full">
        {/* Animated Brand Logo Icon with Gradient Orbit Ring */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-2xl border-2 border-surface-container-highest flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Spinning Gradient Ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-tertiary border-r-primary animate-spin" />
            {/* Brand Lettermark S */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-400 text-base font-extrabold text-white shadow-md">
              S
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="font-label-md text-label-md font-bold text-on-surface tracking-wide mt-4">
          Loading workspace...
        </h2>
        <p className="text-xs text-outline mt-1">
          Preparing modules and telemetry
        </p>

        {/* Pulsing Loading Bar */}
        <div
          className="w-36 h-1 rounded-full bg-surface-container-highest overflow-hidden mt-4"
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-r from-secondary-container via-primary to-tertiary rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
