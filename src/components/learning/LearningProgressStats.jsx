import { TrendingUp, Award, Target, Flame } from "lucide-react";
import { learningStatsData } from "../../data/learning/learningData";

export default function LearningProgressStats() {
  const {
    weeklyVelocityHours,
    weeklyGoalHours,
    streakDays,
    completionRate,
    skillsProficiency,
  } = learningStatsData;

  return (
    <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6 w-full min-w-0 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Growth Telemetry
          </span>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Learning Progress & Skills
          </h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm font-semibold self-start sm:self-auto shrink-0">
          <TrendingUp size={14} className="text-tertiary" />
          <span>Top 5% Velocity</span>
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full min-w-0">
        <div className="bg-surface-container/60 p-3.5 rounded-xl border border-surface-container-highest/30">
          <div className="flex items-center gap-1.5 text-outline mb-1 font-label-sm text-label-sm">
            <Target size={14} className="text-primary" />
            <span>Weekly Goal</span>
          </div>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {weeklyVelocityHours}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant block text-xs">
            Target: {weeklyGoalHours}
          </span>
        </div>

        <div className="bg-surface-container/60 p-3.5 rounded-xl border border-surface-container-highest/30">
          <div className="flex items-center gap-1.5 text-outline mb-1 font-label-sm text-label-sm">
            <Flame size={14} className="text-secondary" />
            <span>Streak</span>
          </div>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {streakDays} Days
          </span>
          <span className="font-body-sm text-body-sm text-secondary block text-xs font-semibold">
            Ignite Tier
          </span>
        </div>

        <div className="bg-surface-container/60 p-3.5 rounded-xl border border-surface-container-highest/30">
          <div className="flex items-center gap-1.5 text-outline mb-1 font-label-sm text-label-sm">
            <Award size={14} className="text-tertiary" />
            <span>Completion</span>
          </div>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {completionRate}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant block text-xs">
            Overall tracks
          </span>
        </div>
      </div>

      {/* Skills Competency Progress Bars */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
            Core Competencies
          </span>
          <span className="font-label-sm text-label-sm text-primary font-medium">
            Active Verified
          </span>
        </div>

        <div className="space-y-3">
          {skillsProficiency.map((skill, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-label-md">
                <span className="text-on-surface font-medium">{skill.skill}</span>
                <span className="text-outline">{skill.level}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
