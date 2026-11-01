import { Play, Sparkles, Film } from "lucide-react";
import { videosHeroData } from "../../data/videos/videoData";

export default function VideosHero({ onFeaturedPlay }) {
  const { badge, title, subtitle } = videosHeroData;

  return (
    <section className="relative w-full rounded-2xl bg-surface-container-low/90 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl min-w-0 max-w-full">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
      <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 min-w-0">
        {/* Title and Badge */}
        <div className="space-y-2.5 sm:space-y-3 max-w-2xl min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm tracking-wide">
              <Sparkles size={14} className="text-tertiary animate-pulse" />
              <span>{badge}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-outline font-label-sm text-label-sm">
              <Film size={13} className="text-primary" />
              <span>Technical Deep-Dives & Workshops</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-headline-lg font-bold text-on-surface tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base lg:text-body-lg text-on-surface-variant leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
          <button
            onClick={onFeaturedPlay}
            className="w-full sm:w-auto group relative px-4 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container text-on-background font-label-md text-label-md font-semibold tracking-wide flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(96,1,209,0.35)] hover:shadow-[0_0_36px_rgba(76,215,246,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer min-w-0"
            type="button"
          >
            <Play size={18} fill="currentColor" className="group-hover:scale-110 transition-transform shrink-0" />
            <div className="text-left min-w-0">
              <span className="block leading-none text-xs uppercase tracking-widest text-tertiary-fixed opacity-90 truncate">
                Featured Workshop
              </span>
              <span className="font-bold text-sm tracking-normal truncate block">
                Resume Distributed Raft Deep-Dive
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
