import { Target, Trophy, Flame, CheckCircle2 } from "lucide-react";
import { studyGoalsData } from "../../data/planner/plannerData";

export default function StudyGoals() {
  const { daily, weekly, monthly } = studyGoalsData;

  const goals = [
    {
      title: "Daily Study Target",
      subtitle: "Focus target for today",
      data: daily,
      icon: Flame,
      color: "text-tertiary",
      barGradient: "from-tertiary to-primary",
      badge: "In Progress",
      badgeColor: "bg-tertiary-container/30 text-tertiary",
    },
    {
      title: "Weekly Study Goal",
      subtitle: "Weekly aggregate target",
      data: weekly,
      icon: Target,
      color: "text-primary",
      barGradient: "from-secondary to-primary",
      badge: "On Track",
      badgeColor: "bg-primary-container/30 text-primary",
    },
    {
      title: "Monthly Horizon Target",
      subtitle: "November benchmark",
      data: monthly,
      icon: Trophy,
      color: "text-secondary",
      barGradient: "from-secondary to-tertiary",
      badge: "Pacing Well",
      badgeColor: "bg-secondary-container/40 text-secondary",
    },
  ];

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <Target size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Targets & Benchmarks
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Study Goals & Pace
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
          <CheckCircle2 size={16} className="text-secondary" />
          <span>Calculated against scheduled blocks</span>
        </div>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full min-w-0">
        {goals.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-5 space-y-4 hover:border-surface-container-highest transition-colors flex flex-col justify-between min-w-0"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                      <Icon size={18} className={item.color} />
                    </div>
                    <div>
                      <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                        {item.title}
                      </h3>
                      <p className="font-label-sm text-label-sm text-outline">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-medium ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Numbers */}
                <div className="flex items-baseline justify-between mt-5">
                  <div>
                    <span className="font-label-sm text-label-sm text-outline block">Completed</span>
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      {item.data.completed}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-sm text-label-sm text-outline block">Target</span>
                    <span className="font-title-md text-title-md font-medium text-on-surface-variant">
                      / {item.data.target}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 mt-3">
                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.barGradient} rounded-full transition-all duration-500`}
                      style={{ width: `${item.data.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-outline">
                    <span>{item.data.percentage}% Completed</span>
                    <span>{item.data.remaining} remaining</span>
                  </div>
                </div>
              </div>

              {/* Footer mini note */}
              <div className="pt-3 border-t border-surface-container-highest/30 flex items-center justify-between text-xs text-on-surface-variant">
                <span>Daily consistency</span>
                <span className="font-semibold text-secondary">High momentum</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
