import { Sparkles, BarChart2, Download, Calendar } from "lucide-react";
import { analyticsHeroData } from "../../data/analytics/analyticsData";

export default function AnalyticsHero({ onExportReport }) {
  const { badge, title, subtitle, period } = analyticsHeroData;

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
              <Calendar size={13} />
              <span>{period}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-headline-lg font-bold text-on-surface tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base lg:text-body-lg text-on-surface-variant leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onExportReport}
            className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-all flex items-center gap-2 border border-surface-container-highest/60 hover:border-outline/40 shadow-sm cursor-pointer"
            type="button"
          >
            <Download size={16} className="text-secondary" />
            <span>Export Report</span>
          </button>

          <div className="px-4 py-2 rounded-xl bg-primary-container/20 border border-primary/20 flex items-center gap-2">
            <BarChart2 size={16} className="text-primary" />
            <span className="font-label-sm text-label-sm font-semibold text-primary">
              Telemetry Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
