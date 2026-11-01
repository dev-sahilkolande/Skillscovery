import {
  Clock,
  CheckCircle2,
  Play,
  RotateCw,
  Edit2,
  Trash2,
  Plus,
  BookOpen,
  Calendar,
} from "lucide-react";
import {
  formatDate,
  formatDisplayDate,
  getWeekdayName,
} from "../../utils/dateUtils";

export default function DailySchedule({
  selectedDate,
  sessions,
  onOpenNewSessionModal,
  onEditSession,
  onDeleteSession,
  onToggleStatus,
}) {
  const selectedDateString = formatDate(selectedDate);
  const weekdayName = getWeekdayName(selectedDate);
  const displayDate = formatDisplayDate(selectedDate);

  const daySessions = sessions
    .filter((s) => s.date === selectedDateString)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Timeline Agenda
            </span>
            <span>·</span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              {displayDate}
            </span>
          </div>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {weekdayName}'s Study Blocks
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-label-sm text-label-sm text-outline">
            {daySessions.length} {daySessions.length === 1 ? "Session Scheduled" : "Sessions Scheduled"}
          </span>
          <button
            onClick={() => onOpenNewSessionModal(selectedDateString)}
            className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            type="button"
          >
            <Plus size={14} className="text-primary" />
            <span>Add Block</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {daySessions.length === 0 ? (
        <div className="rounded-xl bg-surface-container/40 p-12 text-center space-y-3 border border-surface-container-highest/30">
          <Calendar size={36} className="mx-auto text-outline opacity-50" />
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            No study blocks for {weekdayName}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
            Take a well-deserved break, or schedule a focused study block to keep your momentum going.
          </p>
          <button
            onClick={() => onOpenNewSessionModal(selectedDateString)}
            className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary-container to-primary text-on-background font-label-sm text-label-sm font-semibold hover:brightness-110 shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            type="button"
          >
            <Plus size={15} />
            <span>Schedule Session on {displayDate}</span>
          </button>
        </div>
      ) : (
        /* Timeline Stepper */
        <div className="relative py-2">
          {/* Vertical Spine */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-surface-container-highest pointer-events-none"></div>

          <div className="space-y-6 relative">
            {daySessions.map((session) => {
              const isCompleted = session.status === "completed";
              const isOngoing = session.status === "ongoing";

              return (
                <div key={session.id} className="flex items-start gap-3 sm:gap-4 group min-w-0">
                  {/* Status Node Icon */}
                  {isCompleted && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_12px_rgba(210,187,255,0.3)]">
                      <CheckCircle2 size={20} className="stroke-[2.5]" />
                    </div>
                  )}

                  {isOngoing && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-secondary-container to-tertiary text-on-background flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_20px_rgba(76,215,246,0.6)]">
                      <RotateCw size={20} className="animate-spin" style={{ animationDuration: "5s" }} />
                    </div>
                  )}

                  {!isCompleted && !isOngoing && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container-highest text-outline flex items-center justify-center flex-shrink-0 z-10">
                      <Clock size={18} />
                    </div>
                  )}

                  {/* Session Card Body */}
                  <div
                    className={`flex-1 p-4 sm:p-5 rounded-2xl border transition-all min-w-0 ${
                      isOngoing
                        ? "bg-surface-container/90 border-l-4 border-l-tertiary border-t border-r border-b border-surface-container-highest shadow-xl"
                        : isCompleted
                        ? "bg-surface-container/50 border-surface-container-highest/40"
                        : "bg-surface-container/70 border-surface-container-highest/40 hover:bg-surface-container"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${session.categoryColor}`}
                        >
                          {session.category}
                        </span>
                        <span className="text-outline text-xs">·</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          {session.subject}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {isCompleted && (
                          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm font-semibold">
                            Completed
                          </span>
                        )}
                        {isOngoing && (
                          <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/40 text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                            Active Session
                          </span>
                        )}
                        {!isCompleted && !isOngoing && (
                          <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-outline font-label-sm text-label-sm">
                            Upcoming
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      {session.title}
                    </h3>

                    {/* Time & Duration */}
                    <div className="flex items-center gap-4 text-xs font-label-sm text-outline mt-1.5">
                      <span className="flex items-center gap-1 text-on-surface font-semibold">
                        <Clock size={13} className="text-primary" />
                        {session.startTime} - {session.endTime}
                      </span>
                      <span>({session.duration})</span>
                    </div>

                    {/* Notes if available */}
                    {session.notes && (
                      <div className="mt-3 p-2.5 rounded-xl bg-surface-container-low/70 border border-surface-container-highest/30 flex items-start gap-2">
                        <BookOpen size={14} className="text-outline shrink-0 mt-0.5" />
                        <p className="font-body-sm text-body-sm text-on-surface-variant text-xs leading-relaxed">
                          {session.notes}
                        </p>
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-surface-container-highest/30">
                      {/* Status Toggle Switcher */}
                      <button
                        onClick={() =>
                          onToggleStatus(
                            session.id,
                            isCompleted ? "upcoming" : isOngoing ? "completed" : "ongoing"
                          )
                        }
                        className="text-xs font-label-sm text-outline hover:text-on-surface transition-colors cursor-pointer flex items-center gap-1.5"
                        type="button"
                      >
                        {isCompleted && <span>Mark as Incomplete</span>}
                        {isOngoing && <span>Mark as Completed</span>}
                        {!isCompleted && !isOngoing && <span>Set as Ongoing</span>}
                      </button>

                      {/* Edit / Delete / Start Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditSession(session)}
                          className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                          type="button"
                          title="Edit Session"
                          aria-label={`Edit session: ${session.title}`}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => onDeleteSession(session.id)}
                          className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors cursor-pointer"
                          type="button"
                          title="Delete Session"
                          aria-label={`Delete session: ${session.title}`}
                        >
                          <Trash2 size={15} />
                        </button>

                        {!isCompleted && (
                          <button
                            onClick={() =>
                              onToggleStatus(session.id, isOngoing ? "completed" : "ongoing")
                            }
                            aria-label={`${isOngoing ? "Finish block" : "Start session"}: ${session.title}`}
                            className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                              isOngoing
                                ? "bg-tertiary text-on-tertiary shadow-[0_0_12px_rgba(76,215,246,0.5)]"
                                : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface"
                            }`}
                            type="button"
                          >
                            <Play size={12} className={isOngoing ? "fill-on-tertiary" : ""} />
                            <span>{isOngoing ? "Finish Block" : "Start Session"}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
