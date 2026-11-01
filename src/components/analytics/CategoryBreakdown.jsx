import { PieChart, Clock, Sparkles } from "lucide-react";
import { categoryBreakdownData } from "../../data/analytics/analyticsData";

export default function CategoryBreakdown() {
  const { totalHours, categories } = categoryBreakdownData;

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <PieChart size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Domain Allocation
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Subject Category Breakdown
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-xs font-semibold text-outline shrink-0">
          <Clock size={14} className="text-primary" />
          <span>{totalHours} Total Tracked</span>
        </div>
      </div>

      {/* Multi-Segmented Proportional Bar */}
      <div className="space-y-2">
        <div className="w-full h-4 rounded-xl bg-surface-container overflow-hidden flex p-0.5 gap-0.5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`h-full ${cat.color} rounded-sm transition-all duration-300 relative group cursor-pointer`}
              style={{ width: `${cat.percentage}%` }}
              title={`${cat.name}: ${cat.hours} (${cat.percentage}%)`}
            />
          ))}
        </div>

        {/* Proportional Segment Legend Labels */}
        <div className="flex flex-wrap items-center justify-between text-xs text-outline px-1">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
              <span className="font-medium">{cat.name}</span>
              <span className="font-bold text-on-surface">({cat.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Detailed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 w-full min-w-0">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 sm:p-5 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 hover:border-surface-container-highest transition-all duration-200 flex flex-col justify-between space-y-3 min-w-0"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                  <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                    {cat.name}
                  </h3>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full bg-surface-container ${cat.textColor}`}
                >
                  {cat.percentage}%
                </span>
              </div>

              {/* Progress and hours */}
              <div className="flex items-baseline justify-between mt-3 mb-1.5">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {cat.hours}
                </span>
                <span className="text-xs text-outline font-medium">Logged Focus</span>
              </div>

              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${cat.percentage * 2.5}%` }}
                />
              </div>
            </div>

            {/* Topics mastered */}
            <div className="pt-3 border-t border-surface-container-highest/30">
              <span className="text-[11px] text-outline block mb-0.5 font-medium">
                Core Focus Topics:
              </span>
              <p className="text-xs text-on-surface-variant line-clamp-2">
                {cat.topics}
              </p>
            </div>
          </div>
        ))}

        {/* Summary Card */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-primary-container/20 to-secondary-container/20 border border-surface-container-highest/50 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={16} />
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Curriculum Balance
              </span>
            </div>
            <h3 className="font-title-md text-title-md font-bold text-on-surface mt-2">
              Well-Distributed Engineering Foundation
            </h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Your study time prioritizes core Distributed System Design (32%) and Go Systems Programming (28%), followed by Modern AI (21%).
            </p>
          </div>

          <div className="pt-3 border-t border-surface-container-highest/40 flex items-center justify-between text-xs">
            <span className="text-outline">Domain Diversity</span>
            <span className="font-bold text-secondary">5 Active Tracks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
