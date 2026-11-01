import { useState } from "react";
import { Activity, Target, Zap, Trophy, Info } from "lucide-react";
import { learningActivityData } from "../../data/analytics/analyticsData";

export default function LearningActivityChart() {
  const [activeFilter, setActiveFilter] = useState("daily");
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const currentDataset = learningActivityData[activeFilter];
  const { title, subtitle, target, unit, summary, dataPoints } = currentDataset;

  // Compute maximum value for scaling bars
  const maxValue = Math.max(...dataPoints.map((d) => Math.max(d.value, d.target || 0)), 1);

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-5 sm:space-y-6 w-full min-w-0 max-w-full">
      {/* Chart Section Header with Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Study Velocity Telemetry
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {title}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Daily, Weekly, Monthly Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-xl self-start sm:self-auto overflow-x-auto max-w-full" role="tablist" aria-label="Activity timeframe filters">
          <button
            role="tab"
            aria-selected={activeFilter === "daily"}
            onClick={() => {
              setActiveFilter("daily");
              setHoveredPoint(null);
            }}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
              activeFilter === "daily"
                ? "bg-surface-container-high text-on-surface shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
            type="button"
          >
            Daily
          </button>
          <button
            role="tab"
            aria-selected={activeFilter === "weekly"}
            onClick={() => {
              setActiveFilter("weekly");
              setHoveredPoint(null);
            }}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
              activeFilter === "weekly"
                ? "bg-surface-container-high text-on-surface shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
            type="button"
          >
            Weekly
          </button>
          <button
            role="tab"
            aria-selected={activeFilter === "monthly"}
            onClick={() => {
              setActiveFilter("monthly");
              setHoveredPoint(null);
            }}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
              activeFilter === "monthly"
                ? "bg-surface-container-high text-on-surface shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
            type="button"
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Metric Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full min-w-0">
        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
            <Zap size={18} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
              Period Total
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {summary.total}
            </span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
            <Target size={18} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
              Average Rate
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {summary.avg}
            </span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary shrink-0">
            <Trophy size={18} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
              Peak Record
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-tertiary">
              {summary.peak}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Chart Canvas */}
      <div className="relative rounded-2xl bg-surface-container/40 border border-surface-container-highest/40 p-4 sm:p-6 pt-10 pb-4 overflow-x-auto w-full max-w-full min-w-0">
        {/* Background Grid Lines & Target Reference Line */}
        <div className="absolute inset-x-6 top-8 bottom-12 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="w-full h-px bg-outline border-t border-dashed border-outline"></div>
          <div className="w-full h-px bg-outline"></div>
          <div className="w-full h-px bg-outline"></div>
          <div className="w-full h-px bg-outline"></div>
        </div>

        {/* Target Benchmark Line Indicator */}
        <div
          className="absolute inset-x-6 border-t-2 border-dashed border-secondary/60 pointer-events-none z-10 transition-all duration-500"
          style={{
            bottom: `${(target / (maxValue * 1.15)) * 100 + 10}%`,
          }}
        >
          <span className="absolute right-0 -top-6 text-[11px] font-semibold text-secondary bg-surface-container-highest px-2 py-0.5 rounded shadow">
            Target: {target} {unit}
          </span>
        </div>

        {/* Bars Container */}
        <div className={`relative z-20 h-64 flex items-end justify-between gap-1.5 sm:gap-6 px-0.5 sm:px-6 ${activeFilter === "monthly" ? "min-w-[480px]" : "w-full min-w-0"}`}>
          {dataPoints.map((point, idx) => {
            const heightPercent = Math.max((point.value / (maxValue * 1.15)) * 100, 6);
            const isHovered = hoveredPoint?.label === point.label;
            const meetsTarget = point.value >= target;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
              >
                {/* Floating Tooltip when hovered */}
                {isHovered && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-30 min-w-[160px] p-2.5 rounded-xl bg-surface-container-highest border border-outline/30 text-on-surface shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                    <span className="text-[11px] font-semibold text-outline block">
                      {point.fullLabel}
                    </span>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="font-bold text-primary">{point.value} hours</span>
                      <span className="text-[10px] text-tertiary font-medium">
                        {point.focusScore} focus
                      </span>
                    </div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">
                      {meetsTarget
                        ? `+${(point.value - target).toFixed(1)}h over target`
                        : `${(target - point.value).toFixed(1)}h under target`}
                    </div>
                  </div>
                )}

                {/* Peak Indicator Tag */}
                {point.isPeak && !isHovered && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-tertiary-container/40 text-tertiary text-[10px] font-bold whitespace-nowrap shadow-sm">
                    Peak
                  </div>
                )}

                {/* Bar Element */}
                <div
                  className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 relative ${
                    point.isPeak
                      ? "bg-gradient-to-t from-primary via-secondary to-tertiary shadow-[0_0_20px_rgba(76,215,246,0.4)]"
                      : point.isCurrent
                      ? "bg-gradient-to-t from-primary to-secondary shadow-[0_0_16px_rgba(128,131,255,0.4)] ring-1 ring-secondary"
                      : meetsTarget
                      ? "bg-gradient-to-t from-primary/80 to-primary hover:from-primary hover:to-secondary"
                      : "bg-surface-container-highest/90 hover:bg-primary/60"
                  } ${isHovered ? "brightness-125 scale-[1.02]" : ""}`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Subtle top cap shimmer */}
                  <div className="w-full h-1 bg-white/30 rounded-t-xl"></div>
                </div>

                {/* X-Axis Label */}
                <span
                  className={`mt-3 font-label-sm text-label-sm transition-colors ${
                    point.isPeak || point.isCurrent
                      ? "text-on-surface font-bold"
                      : isHovered
                      ? "text-primary font-semibold"
                      : "text-outline"
                  }`}
                >
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Legend and Info */}
        <div className="pt-4 mt-2 border-t border-surface-container-highest/40 flex flex-wrap items-center justify-between gap-3 text-xs text-outline px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-gradient-to-t from-primary to-secondary"></span>
              <span>Study Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-secondary"></span>
              <span>Benchmark Target ({target}h)</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-on-surface-variant">
            <Info size={13} />
            <span>Hover columns for detailed session scores and target variance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
