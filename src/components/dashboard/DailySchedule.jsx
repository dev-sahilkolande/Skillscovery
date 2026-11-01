import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { revisionData, scheduleData } from "../../data/dashboard/scheduleData";
import { useFocusSession } from "../../hooks/useFocusSession";

export default function DailySchedule() {
  const navigate = useNavigate();
  const { totalCards, items: revisionItems } = revisionData;
  const { totalBlocks, sessions } = scheduleData;

  const { mode, sessionTitle, startSession, openModal } = useFocusSession();

  // Handle revision play button
  const handleRevisionPlay = (item) => {
    // If a session is already active (running or paused), do not overwrite it — open existing session
    if (mode === "running" || mode === "paused") {
      openModal();
      return;
    }

    // Start a focused review block for this specific topic
    startSession(15, `Revision: ${item.title}`);
    openModal();
  };

  // Handle speed review action
  const handleSpeedReview = useCallback(() => {
    if (mode === "running" || mode === "paused") {
      openModal();
      return;
    }

    startSession(5, "Speed Review: Spaced Repetition");
    openModal();
  }, [mode, startSession, openModal]);

  // Keyboard shortcut: Space triggers speed review when appropriate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code !== "Space" && e.key !== " ") return;

      const active = document.activeElement;
      const isInteractive =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.tagName === "SELECT" ||
          active.tagName === "BUTTON" ||
          active.isContentEditable);

      if (isInteractive) return;

      e.preventDefault();
      handleSpeedReview();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSpeedReview]);

  return (
    <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8 min-w-0">
      {/*  Pending Revision Card (Spaced Repetition)  */}
      <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-3.5 sm:p-6 shadow-xl space-y-5 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-error-container/30 text-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">
                psychology
              </span>
            </div>
            <div className="min-w-0">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                Spaced Repetition
              </span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                Due Revisions
              </h2>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-error-container/40 text-on-error-container font-label-sm text-label-sm font-semibold shrink-0">
            {totalCards}
          </span>
        </div>
        <div className="space-y-3 min-w-0">
          {revisionItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 sm:p-3.5 rounded-xl bg-surface-container/80 hover:bg-surface-container transition-all flex items-center justify-between gap-2.5 sm:gap-3 group min-w-0 ${
                item.isOverdue ? "border-l-2 border-l-error" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-label-md text-label-md font-semibold text-on-surface transition-colors truncate ${
                      item.isOverdue
                        ? "group-hover:text-error"
                        : "group-hover:text-primary"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${item.tagColor}`}
                  >
                    {item.cardsCount}
                  </span>
                </div>
                <span
                  className={`font-body-sm text-body-sm flex items-center gap-1 mt-0.5 ${
                    item.isOverdue
                      ? "text-error font-medium"
                      : "text-outline"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-xs ${item.dueIconColor}`}
                  >
                    {item.isOverdue ? "warning" : "schedule"}
                  </span>
                  {item.dueText}
                </span>
              </div>
              <button
                onClick={() => handleRevisionPlay(item)}
                className={`w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface transition-all cursor-pointer shrink-0 ${
                  item.isOverdue
                    ? "hover:bg-error hover:text-on-error"
                    : "hover:bg-primary-container hover:text-on-primary"
                }`}
                type="button"
                aria-label={`Start revision session for ${item.title}`}
                title={
                  mode === "running" || mode === "paused"
                    ? "View active focus session"
                    : `Start revision: ${item.title}`
                }
              >
                <span className="material-symbols-outlined text-sm">
                  play_arrow
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Speed Review CTA */}
        <button
          onClick={handleSpeedReview}
          className="w-full py-3 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer min-w-0 overflow-hidden"
          type="button"
          aria-label={
            mode === "running" || mode === "paused"
              ? `Open active focus block: ${sessionTitle}`
              : "Start 5-minute Speed Review (Press Space)"
          }
        >
          <span className="truncate min-w-0">
            {mode === "running" || mode === "paused"
              ? `View Active Session (${sessionTitle})`
              : "Start 5m Speed Review"}
          </span>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-outline font-label-sm text-label-sm shrink-0">
            SPACE
          </kbd>
        </button>
      </div>

      {/*  Today's Study Schedule & Target Goals  */}
      <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-3.5 sm:p-6 shadow-xl space-y-5 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">
                event_upcoming
              </span>
            </div>
            <div className="min-w-0">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                Schedule
              </span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                Today's Focus Agenda
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/planner")}
            className="font-label-sm text-label-sm text-tertiary hover:underline cursor-pointer shrink-0"
          >
            {totalBlocks}
          </button>
        </div>
        <div className="space-y-4 min-w-0">
          {sessions.map((session, idx) => {
            const isLast = idx === sessions.length - 1;
            return (
              <div
                key={session.id}
                onClick={() => navigate("/planner")}
                className={`relative pl-6 cursor-pointer group min-w-0 ${
                  !isLast
                    ? "before:absolute before:left-2 before:top-2 before:bottom-0 before:w-0.5 before:bg-surface-container-highest"
                    : ""
                }`}
              >
                {session.stateType === "completed" && (
                  <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                )}
                {session.stateType === "current" && (
                  <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-secondary/20"></span>
                )}
                {session.stateType === "upcoming" && (
                  <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-surface-container-highest"></span>
                )}

                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <span
                    className={`font-label-sm text-label-sm ${session.statusColor}`}
                  >
                    {session.time}
                  </span>
                  {session.stateType === "current" ? (
                    <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      {session.status}
                    </span>
                  ) : (
                    <span
                      className={`font-label-sm text-label-sm ${session.statusColor}`}
                    >
                      {session.status}
                    </span>
                  )}
                </div>
                <h4 className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {session.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {session.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
