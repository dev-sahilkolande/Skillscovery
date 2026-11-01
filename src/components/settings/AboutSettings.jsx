import {
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { aboutInfo } from "../../data/settings/settingsData";

export default function AboutSettings() {
  const { appName, version, buildChannel, releaseDate, description, stack, phases } =
    aboutInfo;

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      {/* 1. App Identity & Version Card */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-surface-container-highest/40">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-primary-container to-cyan-400 text-2xl font-extrabold text-white shadow-xl">
              S
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  {appName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary text-xs font-semibold border border-secondary/30 shrink-0">
                  {buildChannel}
                </span>
              </div>
              <p className="text-xs text-outline font-mono truncate">
                Version {version} · Released {releaseDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-surface-container text-xs font-semibold text-primary border border-surface-container-highest/80 flex items-center gap-1.5">
              <Sparkles size={13} className="text-tertiary" />
              <span>Full-Stack Cockpit</span>
            </span>
          </div>
        </div>

        {/* Product Description */}
        <div className="pt-6 space-y-3 min-w-0">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-outline">
            Product Vision & Architecture
          </h4>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* 2. Technology Stack */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Code2 size={16} className="text-primary shrink-0" />
            <h4 className="font-title-md text-title-md font-bold text-on-surface">
              Core Dependencies & Engine
            </h4>
          </div>
          <span className="text-xs font-mono text-outline shrink-0">
            Verified package.json Manifest
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full min-w-0">
          {stack.map((item) => (
            <div
              key={item.name}
              className="p-3.5 rounded-xl bg-surface-container/50 border border-surface-container-highest/50 flex flex-col justify-between min-w-0"
            >
              <span className="text-xs text-outline font-medium truncate">
                {item.name}
              </span>
              <span className="text-sm font-bold font-mono text-on-surface mt-1">
                v{item.version}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Engineering Milestones Status */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Layers size={16} className="text-secondary shrink-0" />
            <h4 className="font-title-md text-title-md font-bold text-on-surface">
              Engineering Milestones Status
            </h4>
          </div>
          <span className="text-xs font-mono text-outline shrink-0">
            11 Phases Defined
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full min-w-0">
          {phases.map((ph, index) => {
            const isCompleted = ph.status === "Completed";

            return (
              <div
                key={index}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-container/40 border border-surface-container-highest/40 text-xs min-w-0"
              >
                <span className="text-on-surface font-medium truncate mr-2 min-w-0">
                  {ph.name}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 ${
                    isCompleted
                      ? "bg-secondary-container/30 text-secondary border border-secondary/30"
                      : "bg-primary-container/30 text-primary border border-primary/30"
                  }`}
                >
                  {isCompleted && <CheckCircle2 size={10} />}
                  <span>{ph.status}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Frontend Demonstration Disclaimer */}
      <div className="p-4 rounded-2xl bg-surface-container-low/90 border border-surface-container-highest/60 flex items-start gap-3.5 min-w-0 max-w-full">
        <ShieldCheck size={18} className="text-tertiary shrink-0 mt-0.5" />
        <div className="text-xs text-outline leading-relaxed space-y-1 min-w-0">
          <div className="font-semibold text-on-surface text-sm">
            Frontend Demonstration Architecture
          </div>
          <p>
            Skillscovery is implemented as an interactive, fully responsive frontend prototype.
            All user preferences, track playlists, video bookmark queues, and schedule timelines are
            emulated client-side and cached in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
