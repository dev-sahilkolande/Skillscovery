import {
  Moon,
  Sun,
  Laptop,
  Check,
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  Eye,
} from "lucide-react";
import { accentColorOptions } from "../../data/settings/settingsData";

export default function AppearanceSettings({
  appearance,
  onUpdateAppearance,
  showToast,
}) {
  const handleThemeChange = (newTheme) => {
    onUpdateAppearance({ ...appearance, theme: newTheme });
    if (newTheme === "light") {
      showToast &&
        showToast(
          "Light Theme preview enabled. Deep Midnight remains default across media docks."
        );
    } else if (newTheme === "system") {
      showToast && showToast("Appearance synchronized with system preferences.");
    } else {
      showToast && showToast("Deep Midnight dark theme active.");
    }
  };

  const handleAccentChange = (accentId) => {
    onUpdateAppearance({ ...appearance, accentColor: accentId });
    const selected = accentColorOptions.find((a) => a.id === accentId);
    showToast && showToast(`Accent color updated to ${selected?.name || accentId}!`);
  };

  const handleDensityChange = (newDensity) => {
    onUpdateAppearance({ ...appearance, density: newDensity });
    showToast &&
      showToast(
        newDensity === "compact"
          ? "Compact density activated."
          : "Comfortable density activated."
      );
  };

  const handleToggleOption = (key, label) => {
    const updated = !appearance[key];
    onUpdateAppearance({ ...appearance, [key]: updated });
    showToast &&
      showToast(`${label} ${updated ? "enabled" : "disabled"}.`);
  };

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      {/* 1. Theme Mode Card */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="min-w-0">
              <h4 className="font-title-md text-title-md font-bold text-on-surface">
                Interface Theme
              </h4>
              <p className="text-xs text-outline mt-0.5">
                Select your preferred color scheme and visual appearance.
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary border border-secondary/30 shrink-0">
              Material Design 3
            </span>
          </div>
        </div>

        {/* Theme Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full min-w-0" role="group" aria-label="Theme mode selection">
          {/* Dark Theme (Default) */}
          <button
            onClick={() => handleThemeChange("dark")}
            type="button"
            aria-pressed={appearance.theme === "dark"}
            aria-label="Select Deep Midnight dark theme"
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[9rem] h-auto gap-4 ${
              appearance.theme === "dark"
                ? "bg-surface-container-highest/90 border-primary shadow-lg ring-1 ring-primary"
                : "bg-surface-container/50 border-surface-container-highest/60 hover:bg-surface-container-highest/40"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2 rounded-lg bg-surface-container-lowest text-primary">
                <Moon size={18} />
              </div>
              {appearance.theme === "dark" && (
                <span className="p-1 rounded-full bg-primary text-on-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface flex items-center gap-1.5 flex-wrap">
                <span>Deep Midnight</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-primary/20 text-primary">
                  Native
                </span>
              </div>
              <div className="text-xs text-outline mt-0.5">
                Default high-contrast dark palette for focus & late sessions.
              </div>
            </div>
          </button>

          {/* Light Theme (Preview) */}
          <button
            onClick={() => handleThemeChange("light")}
            type="button"
            aria-pressed={appearance.theme === "light"}
            aria-label="Select Clean Daylight light theme"
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[9rem] h-auto gap-4 relative overflow-hidden ${
              appearance.theme === "light"
                ? "bg-surface-container-highest/90 border-primary shadow-lg ring-1 ring-primary"
                : "bg-surface-container/50 border-surface-container-highest/60 hover:bg-surface-container-highest/40"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                <Sun size={18} />
              </div>
              {appearance.theme === "light" && (
                <span className="p-1 rounded-full bg-primary text-on-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface flex items-center gap-1.5 flex-wrap">
                <span>Clean Daylight</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">
                  Preview
                </span>
              </div>
              <div className="text-xs text-outline mt-0.5">
                Daytime contrast mode with softened dark elevation layers.
              </div>
            </div>
          </button>

          {/* System Mode */}
          <button
            onClick={() => handleThemeChange("system")}
            type="button"
            aria-pressed={appearance.theme === "system"}
            aria-label="Synchronize appearance with system preferences"
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[9rem] h-auto gap-4 ${
              appearance.theme === "system"
                ? "bg-surface-container-highest/90 border-primary shadow-lg ring-1 ring-primary"
                : "bg-surface-container/50 border-surface-container-highest/60 hover:bg-surface-container-highest/40"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2 rounded-lg bg-surface-container-lowest text-tertiary">
                <Laptop size={18} />
              </div>
              {appearance.theme === "system" && (
                <span className="p-1 rounded-full bg-primary text-on-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">System Synchronized</div>
              <div className="text-xs text-outline mt-0.5">
                Automatically align with OS light/dark schedule.
              </div>
            </div>
          </button>
        </div>

        {/* Theme Architecture Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-surface-container-low/80 border border-surface-container-highest/60 flex items-start gap-3 min-w-0">
          <Info size={16} className="text-tertiary shrink-0 mt-0.5" />
          <div className="text-xs text-outline leading-relaxed min-w-0">
            <span className="font-semibold text-on-surface">Architectural Note: </span>
            Skillscovery is natively engineered with a Deep Midnight dark theme design system to
            preserve spectral glows, visualizers, and coding docks. Light mode activates an elevated
            daylight contrast layer while protecting waveform rendering and video stream fidelities.
          </div>
        </div>
      </div>

      {/* 2. Accent Color Selection */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="min-w-0">
              <h4 className="font-title-md text-title-md font-bold text-on-surface">
                Accent Color
              </h4>
              <p className="text-xs text-outline mt-0.5">
                Customize highlights, active badges, and focus rings across the workspace.
              </p>
            </div>
            <span className="text-xs font-mono text-outline shrink-0">
              Live CSS Variable Injection
            </span>
          </div>
        </div>

        {/* Accent Color Swatches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full min-w-0" role="group" aria-label="Accent color selection">
          {accentColorOptions.map((accent) => {
            const isSelected = appearance.accentColor === accent.id;

            return (
              <button
                key={accent.id}
                onClick={() => handleAccentChange(accent.id)}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Select ${accent.name} accent: ${accent.description}`}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-surface-container-highest/90 border-primary shadow-md ring-1 ring-primary"
                    : "bg-surface-container/50 border-surface-container-highest/60 hover:bg-surface-container-highest/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg shadow-inner flex items-center justify-center shrink-0 border border-white/20"
                    style={{ backgroundColor: accent.colorHex }}
                  >
                    {isSelected && <Check size={14} className="text-black stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-on-surface leading-tight">
                      {accent.name}
                    </div>
                    <div className="text-[11px] text-outline line-clamp-1">
                      {accent.description}
                    </div>
                  </div>
                </div>

                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accent.containerHex }}
                />
              </button>
            );
          })}
        </div>

        {/* Live Accent Preview Box */}
        <div className="mt-5 p-4 rounded-xl bg-surface-container-low/70 border border-surface-container-highest/60 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold">
              Primary Badge
            </span>
            <span className="text-xs text-primary font-medium">
              Highlighted Action Preview
            </span>
            <span className="px-2.5 py-0.5 rounded-md border border-primary text-primary text-[11px] font-semibold">
              Ring & Outline
            </span>
          </div>
          <span className="text-[11px] text-outline font-mono">
            Active: {accentColorOptions.find((a) => a.id === appearance.accentColor)?.name || "Cosmic Indigo"}
          </span>
        </div>
      </div>

      {/* 3. Interface Density & Accessibility */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-6">
          <h4 className="font-title-md text-title-md font-bold text-on-surface">
            Display Density & Accessibility
          </h4>
          <p className="text-xs text-outline mt-0.5">
            Adjust information spacing and visual motion behavior.
          </p>
        </div>

        {/* Density Segmented Control */}
        <div className="space-y-4 w-full min-w-0">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-outline mb-2">
              Information Density
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md w-full min-w-0" role="group" aria-label="Information density options">
              <button
                type="button"
                onClick={() => handleDensityChange("comfortable")}
                aria-pressed={appearance.density === "comfortable"}
                aria-label="Set comfortable density with standard padding"
                className={`px-4 py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  appearance.density === "comfortable"
                    ? "bg-surface-container-highest text-on-surface border-primary ring-1 ring-primary shadow-sm"
                    : "bg-surface-container/50 text-outline hover:text-on-surface border-surface-container-highest/60"
                }`}
              >
                <Maximize2 size={16} />
                <span>Comfortable</span>
              </button>

              <button
                type="button"
                onClick={() => handleDensityChange("compact")}
                aria-pressed={appearance.density === "compact"}
                aria-label="Set compact density with reduced card gaps"
                className={`px-4 py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  appearance.density === "compact"
                    ? "bg-surface-container-highest text-on-surface border-primary ring-1 ring-primary shadow-sm"
                    : "bg-surface-container/50 text-outline hover:text-on-surface border-surface-container-highest/60"
                }`}
              >
                <Minimize2 size={16} />
                <span>Compact</span>
              </button>
            </div>
            <p className="text-[11px] text-outline mt-1.5">
              Comfortable provides standard padding; Compact reduces card gaps for dense multi-monitor views.
            </p>
          </div>

          {/* Accessibility Toggles */}
          <div className="pt-4 border-t border-surface-container-highest/40 space-y-3 w-full min-w-0">
            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container/40 border border-surface-container-highest/40 gap-3 min-w-0">
              <div className="space-y-0.5 min-w-0">
                <div className="text-sm font-medium text-on-surface flex items-center gap-2">
                  <Sparkles size={14} className="text-secondary shrink-0" />
                  <span>Reduced Motion</span>
                </div>
                <div className="text-xs text-outline">
                  Minimize animated page transitions and floating ambient glows.
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggleOption("reducedMotion", "Reduced Motion")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer shrink-0 ${
                  appearance.reducedMotion ? "bg-primary" : "bg-surface-container-highest"
                }`}
                role="switch"
                aria-checked={appearance.reducedMotion}
                aria-label="Toggle reduced motion"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    appearance.reducedMotion ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* High Contrast Borders */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container/40 border border-surface-container-highest/40 gap-3 min-w-0">
              <div className="space-y-0.5 min-w-0">
                <div className="text-sm font-medium text-on-surface flex items-center gap-2">
                  <Eye size={14} className="text-tertiary shrink-0" />
                  <span>High Contrast Borders</span>
                </div>
                <div className="text-xs text-outline">
                  Strengthen card edges and dividers for improved visual clarity.
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggleOption("highContrast", "High Contrast Borders")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer shrink-0 ${
                  appearance.highContrast ? "bg-primary" : "bg-surface-container-highest"
                }`}
                role="switch"
                aria-checked={appearance.highContrast}
                aria-label="Toggle high contrast borders"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    appearance.highContrast ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
