import { Clock, CheckCircle2, Flame, TrendingUp, ArrowUpRight } from "lucide-react";
import { overviewKpiData } from "../../data/analytics/analyticsData";

const iconMap = {
  Clock: Clock,
  CheckCircle2: CheckCircle2,
  Flame: Flame,
  TrendingUp: TrendingUp,
};

export default function AnalyticsOverview() {
  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0">
        {overviewKpiData.map((kpi) => {
          const Icon = iconMap[kpi.icon] || Clock;

          return (
            <div
              key={kpi.id}
              className={`rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-surface-container-highest/40 p-4 sm:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${kpi.borderHover} flex flex-col justify-between min-w-0`}
            >
              <div>
                {/* Header: Icon & Trend Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${kpi.bgColor} flex items-center justify-center`}
                  >
                    <Icon size={22} className={kpi.color} />
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high/80 text-xs font-semibold text-secondary">
                    <ArrowUpRight size={13} className="text-secondary" />
                    <span>{kpi.trend}</span>
                  </div>
                </div>

                {/* Metric Label and Value */}
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">
                  {kpi.label}
                </span>
                <p className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  {kpi.value}
                </p>
              </div>

              {/* Footer Subtext */}
              <div className="pt-4 mt-3 border-t border-surface-container-highest/40">
                <span className="text-xs text-on-surface-variant leading-tight block">
                  {kpi.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
