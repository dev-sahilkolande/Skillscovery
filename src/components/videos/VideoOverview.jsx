import { Video, Clock, CheckCircle2, Flame } from "lucide-react";

export default function VideoOverview({ videos = [], onSelectFilter }) {
  const totalVideos = videos.length;
  const completedCount = videos.filter((v) => v.status === "completed").length;
  const inProgressCount = videos.filter((v) => v.status === "in_progress").length;

  // Calculate total watched hours across all videos
  const totalWatchedSeconds = videos.reduce((acc, v) => {
    const fraction = (v.progress || 0) / 100;
    return acc + (v.durationSeconds || 2400) * fraction;
  }, 0);
  const watchedHours = (totalWatchedSeconds / 3600).toFixed(1);

  const cards = [
    {
      id: "total-videos",
      label: "Total Workshop Videos",
      value: `${totalVideos} Videos`,
      subtext: "Across 6 engineering domains",
      icon: Video,
      color: "text-primary",
      bg: "bg-primary-container/20",
      borderHover: "hover:border-primary/50",
      filterValue: "all",
    },
    {
      id: "watched-hours",
      label: "Total Watched Time",
      value: `${watchedHours} hrs`,
      subtext: "Cumulative engineering focus",
      icon: Clock,
      color: "text-tertiary",
      bg: "bg-tertiary-container/30",
      borderHover: "hover:border-tertiary/50",
      filterValue: null,
    },
    {
      id: "completed-videos",
      label: "Videos Completed",
      value: `${completedCount} Completed`,
      subtext: `${Math.round((completedCount / (totalVideos || 1)) * 100)}% overall completion rate`,
      icon: CheckCircle2,
      color: "text-secondary",
      bg: "bg-secondary-container/30",
      borderHover: "hover:border-secondary/50",
      filterValue: "completed",
    },
    {
      id: "in-progress-videos",
      label: "Videos In Progress",
      value: `${inProgressCount} In Flight`,
      subtext: "Ready to resume study",
      icon: Flame,
      color: "text-primary",
      bg: "bg-primary-container/20",
      borderHover: "hover:border-primary/50",
      filterValue: "in_progress",
    },
  ];

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => card.filterValue && onSelectFilter && onSelectFilter(card.filterValue)}
              aria-label={`${card.label}: ${card.value}, ${card.subtext}`}
              className={`w-full text-left rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-surface-container-highest/40 p-4 sm:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${card.borderHover} cursor-pointer flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-w-0`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}
                  >
                    <Icon size={22} className={card.color} />
                  </div>
                  <span className="text-xs font-semibold text-outline px-2.5 py-1 rounded-full bg-surface-container">
                    Active
                  </span>
                </div>

                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">
                  {card.label}
                </span>
                <p className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  {card.value}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-surface-container-highest/40">
                <span className="text-xs text-on-surface-variant leading-tight block">
                  {card.subtext}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
