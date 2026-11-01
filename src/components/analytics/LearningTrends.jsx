import { TrendingUp, Flame, Clock, Sun, Moon, ArrowUpRight } from "lucide-react";
import { learningTrendsData } from "../../data/analytics/analyticsData";

export default function LearningTrends() {
  const {
    consistencyScore,
    consistencySubtitle,
    productivity,
    comparison,
    monthlyTrend,
    weeklyHeatmap,
  } = learningTrendsData;

  const maxHeatHours = Math.max(...weeklyHeatmap.map((d) => d.hours), 5);

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Behavioral Telemetry
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Learning Consistency & Productivity Trends
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-xs text-outline font-semibold">
          <Flame size={14} className="text-tertiary" />
          <span>Active Streak: 14 Days</span>
        </div>
      </div>

      {/* 3-Column Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
        {/* 1. Weekly Consistency Score & Day Heatmap */}
        <div className="rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-5 flex flex-col justify-between space-y-4 min-w-0">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Weekly Consistency
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary text-xs font-semibold">
                High Adherence
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-headline-lg text-headline-lg font-bold text-secondary">
                {consistencyScore}
              </span>
              <span className="text-xs text-outline font-medium">
                {consistencySubtitle}
              </span>
            </div>

            {/* Mini 7-Day Activity Heat Track */}
            <div className="pt-4 space-y-2">
              <div className="flex items-end justify-between gap-2 h-16 pt-2">
                {weeklyHeatmap.map((item, idx) => {
                  const barHeight = (item.hours / maxHeatHours) * 100;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <div
                        className={`w-full rounded-md transition-all ${
                          item.isPeak
                            ? "bg-tertiary shadow-[0_0_10px_rgba(76,215,246,0.5)]"
                            : item.active
                            ? "bg-primary hover:bg-secondary"
                            : "bg-surface-container-highest"
                        }`}
                        style={{ height: `${Math.max(barHeight, 15)}%` }}
                        title={`${item.day}: ${item.hours}h`}
                      />
                      <span className="text-[10px] text-outline font-semibold">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container-highest/40 text-xs text-outline flex items-center justify-between">
            <span>Streak health: Optimal</span>
            <span className="text-secondary font-medium">0 missed scheduled days</span>
          </div>
        </div>

        {/* 2. Productivity Patterns */}
        <div className="rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-5 flex flex-col justify-between space-y-4 min-w-0">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Productivity Patterns
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-container/30 text-primary text-xs font-semibold">
                Focus Engine
              </span>
            </div>

            <div className="space-y-3.5 mt-3">
              {/* Primary Morning Window */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/60 border border-surface-container-highest/30">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <Sun size={16} />
                </div>
                <div>
                  <span className="text-[11px] text-outline block">Prime Deep-Work Window</span>
                  <span className="text-sm font-bold text-on-surface">
                    {productivity.peakWindow}
                  </span>
                </div>
              </div>

              {/* Secondary Evening Window */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/60 border border-surface-container-highest/30">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
                  <Moon size={16} />
                </div>
                <div>
                  <span className="text-[11px] text-outline block">Revision & Review Window</span>
                  <span className="text-sm font-bold text-on-surface">
                    {productivity.secondaryWindow}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container-highest/40 text-xs text-outline flex items-center justify-between">
            <span>Best Day: {productivity.bestDay}</span>
            <span className="text-primary font-semibold">{productivity.efficiencyRate} focus ratio</span>
          </div>
        </div>

        {/* 3. Study-Hour Comparisons */}
        <div className="rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-5 flex flex-col justify-between space-y-4 min-w-0">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Velocity Comparison
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-secondary">
                <ArrowUpRight size={14} />
                <span>{comparison.percentage}</span>
              </div>
            </div>

            <div className="space-y-4 mt-3">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-outline">This Week</span>
                  <span className="font-bold text-on-surface text-sm">
                    {comparison.thisWeek} hrs
                  </span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-outline">Last Week</span>
                  <span className="font-semibold text-on-surface-variant text-sm">
                    {comparison.lastWeek} hrs
                  </span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-surface-container-highest rounded-full"
                    style={{ width: "74%" }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-secondary font-medium mt-3">
              {comparison.diff} ahead of last week's pace ({comparison.status})
            </p>
          </div>

          <div className="pt-3 border-t border-surface-container-highest/40 text-xs text-outline flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              <span>Monthly Trend</span>
            </span>
            <span className="text-on-surface-variant">{monthlyTrend.growth}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
