import { useState } from "react";
import {
  Trophy,
  Flame,
  Zap,
  Crown,
  ShieldCheck,
  Award,
  Cpu,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { achievementsData } from "../../data/analytics/analyticsData";

const iconMap = {
  Flame: Flame,
  Zap: Zap,
  Crown: Crown,
  ShieldCheck: ShieldCheck,
  Award: Award,
  Cpu: Cpu,
  Trophy: Trophy,
  CheckCircle2: CheckCircle2,
};

export default function AchievementsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const {
    streakAchievements,
    milestoneAchievements,
    hourAchievements,
    courseAchievements,
  } = achievementsData;

  const allAchievements = [
    ...streakAchievements.map((a) => ({ ...a, category: "streaks", categoryLabel: "Streak" })),
    ...milestoneAchievements.map((a) => ({ ...a, category: "milestones", categoryLabel: "Milestone" })),
    ...hourAchievements.map((a) => ({ ...a, category: "hours", categoryLabel: "Study Hours" })),
    ...courseAchievements.map((a) => ({ ...a, category: "courses", categoryLabel: "Course" })),
  ];

  const totalUnlocked = allAchievements.filter((a) => a.unlocked).length;

  const filteredAchievements = allAchievements.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
            <Trophy size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Recognition & Trophies
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Achievements & Learning Milestones
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/30 text-secondary text-xs font-semibold shrink-0">
          <Award size={14} />
          <span>
            {totalUnlocked} of {allAchievements.length} Unlocked
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-xl overflow-x-auto max-w-full min-w-0" role="tablist" aria-label="Achievement category filters">
        <button
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
            activeCategory === "all"
              ? "bg-surface-container-high text-on-surface shadow-sm"
              : "text-outline hover:text-on-surface"
          }`}
          type="button"
        >
          All ({allAchievements.length})
        </button>
        <button
          role="tab"
          aria-selected={activeCategory === "streaks"}
          onClick={() => setActiveCategory("streaks")}
          className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
            activeCategory === "streaks"
              ? "bg-surface-container-high text-on-surface shadow-sm"
              : "text-outline hover:text-on-surface"
          }`}
          type="button"
        >
          Streaks ({streakAchievements.length})
        </button>
        <button
          role="tab"
          aria-selected={activeCategory === "milestones"}
          onClick={() => setActiveCategory("milestones")}
          className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
            activeCategory === "milestones"
              ? "bg-surface-container-high text-on-surface shadow-sm"
              : "text-outline hover:text-on-surface"
          }`}
          type="button"
        >
          Milestones ({milestoneAchievements.length})
        </button>
        <button
          role="tab"
          aria-selected={activeCategory === "hours"}
          onClick={() => setActiveCategory("hours")}
          className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
            activeCategory === "hours"
              ? "bg-surface-container-high text-on-surface shadow-sm"
              : "text-outline hover:text-on-surface"
          }`}
          type="button"
        >
          Study Hours ({hourAchievements.length})
        </button>
        <button
          role="tab"
          aria-selected={activeCategory === "courses"}
          onClick={() => setActiveCategory("courses")}
          className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
            activeCategory === "courses"
              ? "bg-surface-container-high text-on-surface shadow-sm"
              : "text-outline hover:text-on-surface"
          }`}
          type="button"
        >
          Certificates ({courseAchievements.length})
        </button>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1 w-full min-w-0">
        {filteredAchievements.map((item) => {
          const Icon = iconMap[item.icon] || Trophy;

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between space-y-4 min-w-0 ${
                item.unlocked
                  ? "bg-surface-container-high/60 border-surface-container-highest/60 hover:border-tertiary/40 shadow-sm hover:shadow-md"
                  : "bg-surface-container-high/30 border-surface-container-highest/30 opacity-70"
              }`}
            >
              <div>
                {/* Top Row: Icon + Tier Pill */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      item.unlocked
                        ? "bg-surface-container text-tertiary shadow-[0_0_12px_rgba(76,215,246,0.3)]"
                        : "bg-surface-container text-outline"
                    }`}
                  >
                    {item.unlocked ? <Icon size={22} /> : <Lock size={20} />}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-container text-outline">
                      {item.categoryLabel}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                    >
                      {item.tier}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-title-md text-title-md font-bold text-on-surface">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Footer status / progress bar */}
              <div className="pt-3 border-t border-surface-container-highest/40">
                {item.unlocked ? (
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-secondary font-semibold">
                      <CheckCircle2 size={13} />
                      <span>Unlocked</span>
                    </span>
                    <span className="text-outline">{item.unlockedDate}</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-outline font-medium">In Progress</span>
                      <span className="text-primary font-bold">{item.target}</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
