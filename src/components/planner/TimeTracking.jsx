import { BarChart3, Clock, Zap, TrendingUp } from "lucide-react";
import { timeTrackingData } from "../../data/planner/plannerData";

export default function TimeTracking() {
  const {
    plannedHours,
    actualHours,
    efficiency,
    consistency,
    weeklyDistribution,
    subjectBreakdown,
  } = timeTrackingData;

  const maxDailyHours = Math.max(
    ...weeklyDistribution.map((d) => Math.max(d.planned, d.actual)),
    6.0
  );

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
            <BarChart3 size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Analytics & Telemetry
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Time Tracking & Adherence
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

      {/* High-level KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40">
          <div className="flex items-center gap-2 text-outline mb-1">
            <Clock size={16} className="text-outline" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Planned</span>
          </div>
          <p className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {plannedHours}
          </p>
          <span className="text-xs text-outline">Budgeted for current week</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40">
          <div className="flex items-center gap-2 text-outline mb-1">
            <Zap size={16} className="text-primary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Actual</span>
          </div>
          <p className="font-headline-sm text-headline-sm font-bold text-primary">
            {actualHours}
          </p>
          <span className="text-xs text-secondary font-medium">84% of scheduled budget</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40">
          <div className="flex items-center gap-2 text-outline mb-1">
            <TrendingUp size={16} className="text-secondary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Efficiency</span>
          </div>
          <p className="font-headline-sm text-headline-sm font-bold text-secondary">
            {efficiency}
          </p>
          <span className="text-xs text-outline">Focus score during blocks</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40">
          <div className="flex items-center gap-2 text-outline mb-1">
            <BarChart3 size={16} className="text-tertiary" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Consistency</span>
          </div>
          <p className="font-headline-sm text-headline-sm font-bold text-tertiary">
            98%
          </p>
          <span className="text-xs text-outline">{consistency}</span>
        </div>
      </div>

      {/* Visualizations: Daily Bar Comparison + Subject Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 w-full min-w-0">
        {/* Weekly Day-by-Day Bar Chart */}
        <div className="lg:col-span-7 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Weekly Planned vs. Actual (Hours)
              </h3>
              <span className="text-xs text-outline font-medium">Mon - Sun</span>
            </div>

            {/* Vertical Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-1 sm:gap-3 pt-6 pb-2 px-0.5 sm:px-2 border-b border-surface-container-highest/40">
              {weeklyDistribution.map((item, idx) => {
                const plannedHeight = (item.planned / maxDailyHours) * 100;
                const actualHeight = (item.actual / maxDailyHours) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Planned Bar */}
                      <div
                        className="w-1/2 max-w-[14px] bg-surface-container-highest/80 rounded-t-md transition-all duration-300 relative group"
                        style={{ height: `${Math.max(plannedHeight, 4)}%` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-surface-container-highest text-on-surface text-[10px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                          {item.planned}h
                        </div>
                      </div>

                      {/* Actual Bar */}
                      <div
                        className={`w-1/2 max-w-[14px] rounded-t-md transition-all duration-300 relative group ${
                          item.isCurrent
                            ? "bg-gradient-to-t from-primary to-secondary"
                            : item.actual > 0
                            ? "bg-primary"
                            : "bg-transparent"
                        }`}
                        style={{ height: `${item.actual > 0 ? Math.max(actualHeight, 4) : 0}%` }}
                      >
                        {item.actual > 0 && (
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                            {item.actual}h
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Day label */}
                    <span
                      className={`text-xs font-medium ${
                        item.isCurrent ? "text-primary font-bold" : "text-outline"
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-outline mt-3">
            <span>Peak Day: Thursday (4.5h actual)</span>
            <span className="text-secondary font-medium">On pace for +2.4h weekend</span>
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="lg:col-span-5 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Subject Allocation
              </h3>
              <span className="text-xs text-outline">By Study Hours</span>
            </div>

            <div className="space-y-3.5">
              {subjectBreakdown.map((subj, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-on-surface">{subj.subject}</span>
                    <span className="text-outline font-semibold">
                      {subj.hours} ({subj.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full ${subj.color} rounded-full transition-all duration-500`}
                      style={{ width: `${subj.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-surface-container-highest/40 flex items-center justify-between text-xs text-outline mt-4">
            <span>Focus Balance</span>
            <span className="text-primary font-medium">Distributed Systems leading</span>
          </div>
        </div>
      </div>
    </section>
  );
}
