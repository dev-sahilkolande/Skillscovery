import { BookOpen, CheckCircle2, Flame, Clock, Sparkles } from "lucide-react";
import { learningHeroData } from "../../data/learning/learningData";

const iconMap = {
  BookOpen: BookOpen,
  CheckCircle2: CheckCircle2,
  Flame: Flame,
  Clock: Clock,
};

export default function LearningHero() {
  const { badge, title, subtitle, stats } = learningHeroData;

  return (
    <section className="relative w-full rounded-2xl bg-surface-container-low/90 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl min-w-0 max-w-full">
      {/* Ambient Spectral Glow */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
      <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-tertiary-container/15 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 sm:gap-8 min-w-0">
        {/* Title and Subtitle */}
        <div className="space-y-2.5 sm:space-y-3 max-w-2xl min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm tracking-wide">
            <Sparkles size={14} className="text-tertiary animate-pulse" />
            <span>{badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-headline-lg font-bold text-on-surface tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base lg:text-body-lg text-on-surface-variant leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
          <button
            className="w-full sm:w-auto group relative px-4 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container text-on-background font-label-md text-label-md font-semibold tracking-wide flex items-center justify-center gap-3 shadow-[0_0_28px_rgba(96,1,209,0.35)] hover:shadow-[0_0_36px_rgba(76,215,246,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer min-w-0"
            type="button"
          >
            <BookOpen size={20} className="group-hover:scale-110 transition-transform shrink-0" />
            <div className="text-left min-w-0">
              <span className="block leading-none text-xs uppercase tracking-widest text-tertiary-fixed opacity-90 truncate">
                Curriculum Focus
              </span>
              <span className="font-bold text-sm tracking-normal truncate block">
                Explore All Tracks
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Overview Stat Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-surface-container-highest/40 w-full min-w-0">
        {stats.map((stat, idx) => {
          const Icon = iconMap[stat.icon] || BookOpen;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 sm:gap-4 bg-surface-container-high/60 rounded-xl p-3.5 sm:p-4 shadow-sm hover:bg-surface-container-high transition-colors min-w-0"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0">
                <Icon size={22} className={stat.color} />
              </div>
              <div className="min-w-0">
                <span className="font-label-sm text-label-sm text-outline block uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
