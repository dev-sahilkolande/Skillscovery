import { heroData } from "../../data/dashboard/heroData";
import { useFocusSession } from "../../hooks/useFocusSession";

export default function HeroBanner() {
  const { mode, formattedTime, openModal } = useFocusSession();

  const {
    trackTitle,
    userName,
    currentTopic,
    pomodoroRemaining,
    pomodoroAction,
    dailyGoal,
    tracksMastery,
    streak,
  } = heroData;

  // Derive dynamic label and badge from live focus session state if active
  let actionBadge = pomodoroAction.badge;
  let actionLabel = pomodoroAction.label;

  if (mode === "running") {
    actionBadge = "Active Focus";
    actionLabel = `In Progress (${formattedTime})`;
  } else if (mode === "paused") {
    actionBadge = "Session Paused";
    actionLabel = `Resume (${formattedTime})`;
  } else if (mode === "completed") {
    actionBadge = "Session Complete";
    actionLabel = "Review Summary";
  }

  return (
    <section className="relative w-full rounded-2xl bg-surface-container-low/90 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl min-w-0">
      {/*  Ambient Spectral Energy Glow  */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
      <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-tertiary-container/15 blur-3xl pointer-events-none"></div>
      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 sm:gap-8">
        {/*  Greeting Text & Status  */}
        <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm tracking-wide">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
            <span>{trackTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-headline-lg font-bold text-on-surface tracking-tight leading-tight">
            Welcome back, {userName}!{" "}
            <span className="inline-block transform hover:rotate-12 transition-transform duration-300">
              🚀
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-body-lg text-on-surface-variant leading-relaxed">
            You're on track to master{" "}
            <span className="text-primary font-semibold">
              {currentTopic}
            </span>
            . You have {pomodoroRemaining} left on your recommended Pomodoro cycle.
          </p>
        </div>
        {/*  Quick Action Pill  */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={openModal}
            className="w-full sm:w-auto group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container text-on-background font-label-md text-label-md font-semibold tracking-wide flex items-center justify-center gap-3 shadow-[0_0_28px_rgba(96,1,209,0.35)] hover:shadow-[0_0_36px_rgba(76,215,246,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            type="button"
            aria-label={`Open Focus Session - ${actionLabel}`}
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
              play_circle
            </span>
            <div className="text-left">
              <span className="block leading-none text-xs uppercase tracking-widest text-tertiary-fixed opacity-90">
                {actionBadge}
              </span>
              <span className="font-bold text-sm tracking-normal">
                {actionLabel}
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse ml-1"></span>
          </button>
        </div>
      </div>
      {/*  Quick Overview Stat Grid  */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 bg-surface-container/40 rounded-xl p-3 sm:p-5">
        {/*  Daily Learning Goal with Progress Dial  */}
        <div className="flex items-center gap-3.5 sm:gap-4 bg-surface-container-high/60 rounded-xl p-3 sm:p-4 shadow-sm hover:bg-surface-container-high transition-colors min-w-0">
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-14 h-14 transform -rotate-90"
              viewBox="0 0 56 56"
            >
              <circle
                className="text-surface-container-highest"
                cx="28"
                cy="28"
                fill="none"
                r="23"
                stroke="currentColor"
                strokeWidth="4.5"
              ></circle>
              <circle
                cx="28"
                cy="28"
                fill="none"
                r="23"
                stroke="url(#goalGradient)"
                strokeDasharray={dailyGoal.strokeDasharray}
                strokeDashoffset={dailyGoal.strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="4.5"
              ></circle>
              <defs>
                <linearGradient
                  id="goalGradient"
                  x1="0%"
                  x2="100%"
                  y1="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6001d1"></stop>
                  <stop offset="50%" stopColor="#8083ff"></stop>
                  <stop offset="100%" stopColor="#4cd7f6"></stop>
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute font-label-md text-label-md font-bold text-on-surface">
              {dailyGoal.percentage}%
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-label-sm text-label-sm text-outline block uppercase tracking-wider">
              Daily Goal
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {dailyGoal.timeSpent}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant block truncate">
              Target: {dailyGoal.target}
            </span>
          </div>
        </div>
        {/*  Overall Course Completion  */}
        <div className="flex items-center gap-3.5 sm:gap-4 bg-surface-container-high/60 rounded-xl p-3 sm:p-4 shadow-sm hover:bg-surface-container-high transition-colors min-w-0">
          <div className="w-14 h-14 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-2xl">
              auto_graph
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                {tracksMastery.label}
              </span>
              <span className="font-label-sm text-label-sm font-semibold text-secondary">
                {tracksMastery.percentage}% Overall
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-secondary to-tertiary"
                style={{ width: `${tracksMastery.percentage}%` }}
              ></div>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 block truncate">
              {tracksMastery.subtext}
            </span>
          </div>
        </div>
        {/*  Streak Day Counters  */}
        <div className="flex flex-col justify-center bg-surface-container-high/60 rounded-xl p-3 sm:p-4 shadow-sm hover:bg-surface-container-high transition-colors min-w-0 md:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between gap-1 mb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-base shrink-0">🔥</span>
              <span className="font-label-md text-label-md font-bold text-on-surface truncate">
                {streak.days} Days Streak
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-tertiary font-semibold shrink-0">
              {streak.tier}
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1 xl:gap-1.5 items-center justify-items-center">
            {streak.weeklyHistory.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                {item.status === "completed" && (
                  <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-xs sm:text-label-sm font-bold flex items-center justify-center">
                    ✓
                  </span>
                )}
                {item.status === "active" && (
                  <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-gradient-to-tr from-secondary-container to-tertiary text-on-background font-label-sm text-xs sm:text-label-sm font-bold flex items-center justify-center shadow-[0_0_10px_rgba(76,215,246,0.6)]">
                    🔥
                  </span>
                )}
                {item.status === "upcoming" && (
                  <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-surface-container-highest text-outline font-label-sm text-xs sm:text-label-sm font-medium flex items-center justify-center">
                    ·
                  </span>
                )}
                <span
                  className={`font-label-sm text-[11px] sm:text-label-sm ${
                    item.status === "active"
                      ? "text-primary font-bold"
                      : "text-outline"
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
