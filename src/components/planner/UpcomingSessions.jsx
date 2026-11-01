import { Calendar, Clock, Play, BookOpen, ArrowRight, Sparkles } from "lucide-react";

export default function UpcomingSessions({
  sessions,
  onStartSession,
  onEditSession,
  onOpenNewSessionModal,
}) {
  // Filter for upcoming sessions across all days
  const upcomingSessions = sessions.filter((s) => s.status === "upcoming");

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Queue & Next Up
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Upcoming Study Sessions
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-surface-container text-outline font-label-sm text-label-sm">
            {upcomingSessions.length} Pending
          </span>
        </div>
      </div>

      {/* Sessions Grid */}
      {upcomingSessions.length === 0 ? (
        <div className="py-12 text-center rounded-xl bg-surface-container/30 border border-dashed border-surface-container-highest/60 p-4 sm:p-6">
          <p className="font-body-md text-body-md text-on-surface-variant">
            No upcoming sessions queued. You are fully caught up!
          </p>
          <button
            onClick={onOpenNewSessionModal}
            className="mt-4 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold cursor-pointer"
            type="button"
          >
            Schedule a Study Session
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full min-w-0">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="group relative rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high border border-surface-container-highest/40 hover:border-primary/40 p-4 sm:p-5 transition-all flex flex-col justify-between shadow-sm hover:shadow-lg min-w-0"
            >
              <div className="space-y-3">
                {/* Day & Category Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label-sm text-label-sm font-semibold text-primary px-2.5 py-0.5 rounded-md bg-primary-container/20">
                    {session.day} · {session.date}
                  </span>
                  <span
                    className={`font-label-sm text-label-sm px-2.5 py-0.5 rounded-full ${
                      session.categoryColor || "bg-surface-container text-outline"
                    }`}
                  >
                    {session.category}
                  </span>
                </div>

                {/* Subject & Title */}
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">
                    {session.subject}
                  </span>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2 mt-0.5 group-hover:text-primary transition-colors">
                    {session.title}
                  </h3>
                </div>

                {/* Timing Meta */}
                <div className="flex items-center gap-4 text-outline font-body-sm text-body-sm pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-tertiary" />
                    <span>
                      {session.startTime} - {session.endTime}
                    </span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{session.duration}</span>
                  </div>
                </div>

                {/* Notes preview if present */}
                {session.notes && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant/80 line-clamp-2 bg-surface-container/50 rounded-lg p-2.5 italic">
                    "{session.notes}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-surface-container-highest/40 flex items-center justify-between gap-3">
                <button
                  onClick={() => onEditSession && onEditSession(session)}
                  aria-label={`View and edit details for ${session.title}`}
                  className="font-label-sm text-label-sm text-outline hover:text-on-surface flex items-center gap-1 transition-colors cursor-pointer"
                  type="button"
                >
                  <BookOpen size={14} />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => onStartSession && onStartSession(session.id)}
                  aria-label={`Start focus session for ${session.title}`}
                  className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  type="button"
                >
                  <Play size={14} fill="currentColor" />
                  <span>Start Focus</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
