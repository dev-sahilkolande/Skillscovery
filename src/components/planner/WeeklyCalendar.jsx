import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import {
  getMonday,
  getSunday,
  formatWeekRange,
  getWeekDays,
} from "../../utils/dateUtils";

export default function WeeklyCalendar({
  sessions,
  selectedDate,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
  onToday,
  viewMode,
  onChangeViewMode,
  onOpenNewSessionModal,
}) {
  const monday = getMonday(selectedDate);
  const sunday = getSunday(monday);
  const weekDays = getWeekDays(selectedDate);
  const isCurrentWeek = weekDays.some((d) => d.isToday);
  const headerDateRange = formatWeekRange(monday, sunday);

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Calendar Header with Navigation and View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <CalendarIcon size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Calendar & Dispatch
              </span>
              {isCurrentWeek && (
                <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary text-[10px] font-bold uppercase tracking-wider">
                  Current Week
                </span>
              )}
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
              {headerDateRange}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Week Nav Buttons */}
          <div className="flex items-center gap-1 bg-surface-container rounded-xl p-1">
            <button
              onClick={onPrevWeek}
              className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
              title="Previous Week"
              aria-label="Previous Week"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={onToday}
              className="px-2.5 py-1 rounded-lg font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              Today
            </button>
            <button
              onClick={onNextWeek}
              className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
              title="Next Week"
              aria-label="Next Week"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* View Mode Toggle: Daily vs Weekly */}
          <div className="flex items-center gap-1 bg-surface-container rounded-xl p-1" role="group" aria-label="Calendar view mode">
            <button
              onClick={() => onChangeViewMode("daily")}
              aria-pressed={viewMode === "daily"}
              className={`px-3 py-1 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                viewMode === "daily"
                  ? "bg-surface-container-high text-on-surface font-semibold shadow-sm"
                  : "text-outline hover:text-on-surface"
              }`}
              type="button"
            >
              Daily View
            </button>
            <button
              onClick={() => onChangeViewMode("weekly")}
              aria-pressed={viewMode === "weekly"}
              className={`px-3 py-1 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                viewMode === "weekly"
                  ? "bg-surface-container-high text-on-surface font-semibold shadow-sm"
                  : "text-outline hover:text-on-surface"
              }`}
              type="button"
            >
              Weekly Grid
            </button>
          </div>
        </div>
      </div>

      {/* Week Day Pill Selector (Active in both modes) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 w-full min-w-0" role="group" aria-label="Days of the week">
        {weekDays.map((day) => {
          const daySessions = sessions.filter((s) => s.date === day.dateString);
          const isSelected = day.isSelected;
          const isToday = day.isToday;

          return (
            <button
              key={day.dateString}
              onClick={() => onSelectDate(day.date)}
              aria-pressed={isSelected}
              aria-label={`${day.dayName}, ${day.dateString}: ${daySessions.length} study blocks scheduled${isToday ? ", Today" : ""}`}
              className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[92px] min-w-0 ${
                isSelected
                  ? "bg-surface-container border-primary shadow-[0_0_16px_rgba(128,131,255,0.25)] ring-1 ring-primary"
                  : isToday
                  ? "bg-surface-container-high/60 border-secondary/50 hover:bg-surface-container-high"
                  : "bg-surface-container-high/30 border-surface-container-highest/30 hover:bg-surface-container-high/60 hover:border-surface-container-highest"
              }`}
              type="button"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                  {day.dayShort}
                </span>
                {isToday && (
                  <span
                    className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(210,187,255,0.8)]"
                    title="Today"
                  ></span>
                )}
              </div>

              <div className="mt-2">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {day.dayNumber}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-label-sm mt-1">
                <span
                  className={`${
                    daySessions.length > 0
                      ? "text-tertiary font-medium"
                      : "text-outline"
                  }`}
                >
                  {daySessions.length} {daySessions.length === 1 ? "block" : "blocks"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Weekly Grid View: Expanded column grid showing cards across all days */}
      {viewMode === "weekly" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 pt-4 border-t border-surface-container-highest/30 w-full min-w-0">
          {weekDays.map((day) => {
            const daySessions = sessions.filter((s) => s.date === day.dateString);
            const isSelected = day.isSelected;

            return (
              <div
                key={day.dateString}
                className={`rounded-xl p-3 border flex flex-col justify-between min-h-[220px] transition-colors ${
                  isSelected
                    ? "bg-surface-container/70 border-primary/40 ring-1 ring-primary/30"
                    : "bg-surface-container/40 border-surface-container-highest/30"
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-surface-container-highest/40 pb-1.5">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold block">
                        {day.dayName}
                      </span>
                      <span className="text-[11px] text-outline">
                        {day.dayShort} {day.dayNumber}
                      </span>
                    </div>
                    <span className="text-xs text-outline font-label-sm">
                      {daySessions.length}
                    </span>
                  </div>

                  {daySessions.length === 0 ? (
                    <div className="py-8 text-center text-xs text-outline">
                      <span>Rest Day</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {daySessions.map((session) => (
                        <button
                          key={session.id}
                          type="button"
                          onClick={() => onSelectDate(day.date)}
                          aria-label={`View ${session.title} on ${day.dayName}`}
                          className="w-full text-left p-2.5 rounded-lg bg-surface-container-high/80 hover:bg-surface-container-high border border-surface-container-highest/50 cursor-pointer transition-colors space-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        >
                          <div className="flex items-center justify-between text-[11px] font-label-sm">
                            <span className="text-secondary font-medium truncate max-w-[90px]">
                              {session.subject}
                            </span>
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                session.status === "completed"
                                  ? "bg-secondary"
                                  : session.status === "ongoing"
                                  ? "bg-tertiary animate-pulse"
                                  : "bg-outline"
                              }`}
                            ></span>
                          </div>
                          <p className="font-label-sm text-label-sm text-on-surface font-medium line-clamp-2 leading-tight">
                            {session.title}
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-outline pt-0.5">
                            <Clock size={10} />
                            <span>{session.startTime}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    onSelectDate(day.date);
                    onOpenNewSessionModal(day.dateString);
                  }}
                  aria-label={`Add study block for ${day.dayName}, ${day.dateString}`}
                  className="w-full mt-2 py-1.5 text-center text-xs text-outline hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
                  type="button"
                >
                  + Add Block
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
