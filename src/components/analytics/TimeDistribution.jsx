import { BarChart3, Clock, Zap, CheckCircle2 } from "lucide-react";
import { timeDistributionData } from "../../data/analytics/analyticsData";

export default function TimeDistribution() {
  const { plannedVsActual, subjectTimes, weeklyComparison } = timeDistributionData;

  const maxWeeklyHours = Math.max(
    ...weeklyComparison.map((w) => Math.max(w.planned, w.actual)),
    35.0
  );

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <BarChart3 size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Budget & Adherence
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Time Distribution & Planned vs. Actual Hours
            </h2>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-outline">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></span>
            <span>Planned</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
            <span>Actual</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40">
          <div className="flex items-center gap-2 text-outline mb-1">
            <Clock size={16} />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Planned Budget</span>
          </div>
          <p className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {plannedVsActual.planned}
          </p>
          <span className="text-xs text-outline">Weekly scheduled target</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40">
          <div className="flex items-center gap-2 text-outline mb-1">
            <Zap size={16} className="text-primary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Actual Logged</span>
          </div>
          <p className="font-headline-sm text-headline-sm font-bold text-primary">
            {plannedVsActual.actual}
          </p>
          <span className="text-xs text-secondary font-medium">84% of weekly budget</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40">
          <div className="flex items-center gap-2 text-outline mb-1">
            <CheckCircle2 size={16} className="text-secondary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Adherence Rate</span>
          </div>
          <p className="font-headline-sm text-headline-sm font-bold text-secondary">
            {plannedVsActual.adherenceRate}
          </p>
          <span className="text-xs text-outline">Schedule fidelity score</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40">
          <div className="flex items-center gap-2 text-outline mb-1">
            <BarChart3 size={16} className="text-tertiary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Variance</span>
          </div>
          <p className="font-headline-sm text-headline-sm font-bold text-tertiary">
            {plannedVsActual.variance}
          </p>
          <span className="text-xs text-outline">Pacing on target</span>
        </div>
      </div>

      {/* Split Grid: Subject-wise Time Allocation + Weekly Study-Hour Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 w-full min-w-0">
        {/* Left: Subject-wise Time Distribution */}
        <div className="lg:col-span-5 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Subject-Wise Time Allocation
              </h3>
              <span className="text-xs text-outline">Planned vs. Actual</span>
            </div>

            <div className="space-y-4">
              {subjectTimes.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-on-surface">{item.subject}</span>
                    <span className="text-outline">
                      <strong className="text-primary">{item.actual}h</strong> / {item.planned}h
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden flex">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${(item.actual / item.planned) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-outline">
                    <span>{item.pct}% of total focus</span>
                    <span>{Math.round((item.actual / item.planned) * 100)}% budget met</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-surface-container-highest/40 flex items-center justify-between text-xs text-outline mt-4">
            <span>Primary Focus Domain</span>
            <span className="text-primary font-medium">Distributed System Design</span>
          </div>
        </div>

        {/* Right: Weekly Study-Hour Comparison Bar Chart */}
        <div className="lg:col-span-7 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Weekly Study-Hour Comparison (Hours)
              </h3>
              <span className="text-xs text-outline">Past 5 Weeks</span>
            </div>

            {/* Vertical Bar Chart */}
            <div className="h-52 flex items-end justify-between gap-1.5 sm:gap-4 pt-6 pb-2 px-1 sm:px-3 border-b border-surface-container-highest/40">
              {weeklyComparison.map((item, idx) => {
                const plannedHeight = (item.planned / maxWeeklyHours) * 100;
                const actualHeight = (item.actual / maxWeeklyHours) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Planned Bar */}
                      <div
                        className="w-1/2 max-w-[16px] bg-surface-container-highest rounded-t-md transition-all duration-300 relative group"
                        style={{ height: `${Math.max(plannedHeight, 6)}%` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-surface-container-highest text-on-surface text-[10px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                          {item.planned}h planned
                        </div>
                      </div>

                      {/* Actual Bar */}
                      <div
                        className={`w-1/2 max-w-[16px] rounded-t-md transition-all duration-300 relative group ${
                          item.isCurrent
                            ? "bg-gradient-to-t from-primary to-secondary shadow-[0_0_12px_rgba(128,131,255,0.4)]"
                            : "bg-primary"
                        }`}
                        style={{ height: `${Math.max(actualHeight, 6)}%` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap font-bold">
                          {item.actual}h actual
                        </div>
                      </div>
                    </div>

                    {/* Week label */}
                    <span
                      className={`text-xs font-medium text-center ${
                        item.isCurrent ? "text-primary font-bold" : "text-outline"
                      }`}
                    >
                      {item.week}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-outline mt-3">
            <span>Peak Week: W42 (31.0h logged)</span>
            <span className="text-secondary font-medium">94% average budget adherence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
