import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Square,
  X,
  Sparkles,
  CheckCircle2,
  Coffee,
  Zap,
  Timer as TimerIcon,
  Brain,
} from "lucide-react";
import { useFocusSession } from "../../hooks/useFocusSession";
import { useModalA11y } from "../../hooks/useModalA11y";

// Icon mapping for presets
const PRESET_ICONS = {
  "short-break": Coffee,
  "quick-focus": Zap,
  pomodoro: TimerIcon,
  "deep-study": Brain,
};

export default function FocusSessionModal({ isOpen, onClose }) {
  const dialogRef = useModalA11y({
    isOpen,
    onClose,
  });

  const {
    mode,
    durationMinutes,
    remainingSeconds,
    sessionTitle,
    formattedTime,
    presets,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
    stopSession,
  } = useFocusSession();

  // Local setup state for idle configuration
  const [selectedDuration, setSelectedDuration] = useState(
    durationMinutes || 25
  );
  const [titleInput, setTitleInput] = useState(
    sessionTitle || "Distributed Systems Focus"
  );

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Circular progress calculations (Radius = 90, Circumference = 2 * PI * 90 ≈ 565.487)
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const totalSeconds = (durationMinutes || selectedDuration || 25) * 60;
  const progressRatio =
    totalSeconds > 0
      ? Math.max(0, Math.min(1, remainingSeconds / totalSeconds))
      : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const handleStart = (e) => {
    e.preventDefault();
    const finalTitle = titleInput.trim() || "Focus Session";
    startSession(selectedDuration, finalTitle);
  };

  const handleStartAnother = () => {
    resetSession();
    // Returns cleanly to idle/setup state without auto-starting
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md transition-opacity cursor-pointer"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="focus-modal-title"
        aria-describedby="focus-modal-desc"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-surface-container-low/95 border border-surface-container-highest/60 rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden max-h-[92vh] flex flex-col justify-between cursor-default"
      >
        {/* Ambient Glows */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-tertiary-container/15 blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-surface-container-highest/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center">
              <TimerIcon size={20} />
            </div>
            <div>
              <h2
                id="focus-modal-title"
                className="text-lg sm:text-xl font-bold text-on-surface leading-tight"
              >
                {mode === "idle" && "Configure Focus Session"}
                {mode === "running" && "Focus Block in Progress"}
                {mode === "paused" && "Focus Block Paused"}
                {mode === "completed" && "Focus Block Complete!"}
              </h2>
              <p id="focus-modal-desc" className="text-xs text-outline">
                {mode === "idle" && "Select duration and define your target task"}
                {mode === "running" && "Stay in cognitive flow — timer is running"}
                {mode === "paused" && "Session paused — take a breath and resume"}
                {mode === "completed" && "Session targets successfully achieved"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Close focus modal"
            title="Close modal (timer keeps running)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic State Body */}
        <div className="relative z-10 py-6 overflow-y-auto flex-1 flex flex-col justify-center">
          {/* STATE A: Session Setup (mode === 'idle') */}
          {mode === "idle" && (
            <form onSubmit={handleStart} className="space-y-6">
              {/* Task Title Input */}
              <div className="space-y-2">
                <label
                  htmlFor="focus-session-title-input"
                  className="font-label-sm text-label-sm uppercase tracking-wider text-outline block font-semibold"
                >
                  Session Objective / Topic
                </label>
                <input
                  id="focus-session-title-input"
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="e.g. Distributed Systems & Raft Consensus"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-outline border border-surface-container-highest/60 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium transition-all"
                  maxLength={80}
                  required
                />
              </div>

              {/* Duration Presets */}
              <div className="space-y-2.5">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block font-semibold">
                  Choose Duration
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset) => {
                    const isSelected = selectedDuration === preset.minutes;
                    const IconComponent =
                      PRESET_ICONS[preset.id] || TimerIcon;

                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedDuration(preset.minutes)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                          isSelected
                            ? "bg-secondary-container/30 border-secondary shadow-[0_0_16px_rgba(96,1,209,0.3)] text-on-surface"
                            : "bg-surface-container/60 border-surface-container-highest/60 text-outline hover:text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <IconComponent
                            size={18}
                            className={
                              isSelected ? "text-tertiary" : "text-outline"
                            }
                          />
                          <span
                            className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-tertiary-container/40 text-tertiary"
                                : "bg-surface-container text-outline"
                            }`}
                          >
                            {preset.minutes}m
                          </span>
                        </div>
                        <div>
                          <span className="font-label-md text-label-md font-bold text-on-surface block leading-snug">
                            {preset.label}
                          </span>
                          <span className="text-[11px] text-outline line-clamp-1">
                            {preset.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Start CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container hover:brightness-110 text-on-background font-label-lg text-label-lg font-bold tracking-wide flex items-center justify-center gap-3 shadow-[0_0_24px_rgba(96,1,209,0.4)] transition-all cursor-pointer"
                >
                  <Play size={20} className="fill-current" />
                  <span>Start {selectedDuration}-Minute Session</span>
                </button>
              </div>
            </form>
          )}

          {/* STATE B & C: Active Timer & Paused State */}
          {(mode === "running" || mode === "paused") && (
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Circular SVG Timer */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 220 220"
                >
                  <defs>
                    <linearGradient
                      id="focusModalGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8083ff" />
                      <stop offset="50%" stopColor="#d2bbff" />
                      <stop offset="100%" stopColor="#4cd7f6" />
                    </linearGradient>
                  </defs>

                  {/* Track Circle */}
                  <circle
                    className="text-surface-container-highest"
                    cx="110"
                    cy="110"
                    fill="none"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="10"
                    opacity="0.25"
                  />

                  {/* Dynamic Progress Circle */}
                  <circle
                    cx="110"
                    cy="110"
                    fill="none"
                    r={radius}
                    stroke={
                      mode === "paused" ? "#908fa0" : "url(#focusModalGradient)"
                    }
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    strokeWidth="10"
                    className="transition-all duration-300 ease-linear"
                    style={{
                      filter:
                        mode === "running"
                          ? "drop-shadow(0px 0px 10px rgba(76, 215, 246, 0.45))"
                          : "none",
                    }}
                  />
                </svg>

                {/* Inner Readout Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                  {/* Status Pill */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        mode === "running"
                          ? "bg-tertiary animate-pulse"
                          : "bg-outline"
                      }`}
                    ></span>
                    <span
                      className={`font-label-sm text-[11px] font-bold uppercase tracking-wider ${
                        mode === "running" ? "text-tertiary" : "text-outline"
                      }`}
                    >
                      {mode === "running" ? "Focusing" : "Paused"}
                    </span>
                  </div>

                  {/* Digital MM:SS Readout */}
                  <span className="font-mono text-4xl sm:text-5xl font-black text-on-surface tracking-tight leading-none drop-shadow-sm">
                    {formattedTime}
                  </span>

                  {/* Session Title & Total Duration */}
                  <span className="mt-2 text-xs sm:text-sm font-semibold text-on-surface-variant truncate max-w-[180px]">
                    {sessionTitle}
                  </span>
                  <span className="text-[11px] text-outline font-mono mt-0.5">
                    {durationMinutes} min block
                  </span>
                </div>
              </div>

              {/* Timer Controls Toolbar */}
              <div className="flex items-center justify-center gap-3 w-full max-w-xs">
                {mode === "running" ? (
                  <button
                    type="button"
                    onClick={pauseSession}
                    className="flex-1 py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    aria-label="Pause focus timer"
                  >
                    <Pause size={18} />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resumeSession}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container hover:brightness-110 text-on-background font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(96,1,209,0.3)]"
                    aria-label="Resume focus timer"
                  >
                    <Play size={18} className="fill-current" />
                    <span>Resume</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={resetSession}
                  className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface transition-all cursor-pointer"
                  title="Reset to full duration"
                  aria-label="Reset timer"
                >
                  <RotateCcw size={18} />
                </button>

                <button
                  type="button"
                  onClick={stopSession}
                  className="p-3 rounded-xl bg-surface-container hover:bg-error-container/30 text-outline hover:text-error transition-all cursor-pointer"
                  title="End and discard session"
                  aria-label="Stop session"
                >
                  <Square size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STATE D: Completed State */}
          {mode === "completed" && (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-tertiary-container/30 text-tertiary flex items-center justify-center shadow-[0_0_28px_rgba(76,215,246,0.5)]">
                  <CheckCircle2 size={42} />
                </div>
                <Sparkles
                  size={20}
                  className="text-secondary absolute -top-1 -right-1 animate-pulse"
                />
              </div>

              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-2xl font-bold text-on-surface">
                  Focus Block Completed!
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  You completed your{" "}
                  <strong className="text-tertiary font-semibold">
                    {durationMinutes}-minute
                  </strong>{" "}
                  study block on{" "}
                  <strong className="text-primary font-semibold">
                    {sessionTitle}
                  </strong>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm pt-2">
                <button
                  type="button"
                  onClick={handleStartAnother}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container hover:brightness-110 text-on-background font-label-md text-label-md font-bold transition-all shadow-[0_0_20px_rgba(96,1,209,0.35)] cursor-pointer"
                >
                  Start Another Session
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="pt-3 border-t border-surface-container-highest/30 flex items-center justify-between text-xs text-outline shrink-0">
          <span>Drift-free high precision timer</span>
          <span>Press ESC to minimize</span>
        </div>
      </div>
    </div>
  );
}
