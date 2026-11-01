import { useState } from "react";
import {
  GraduationCap,
  Clock,
  Target,
  Sparkles,
  Check,
  RotateCcw,
  BookOpen,
  Calendar,
  BellRing,
} from "lucide-react";
import {
  learningCategoriesList,
  difficultyOptions,
  studyTimeOptions,
  reminderOptions,
} from "../../data/settings/settingsData";

export default function LearningPreferences({
  preferences,
  onSavePreferences,
  showToast,
}) {
  const [localPrefs, setLocalPrefs] = useState({ ...preferences });
  const [hasChanges, setHasChanges] = useState(false);

  const handleFieldChange = (field, value) => {
    setLocalPrefs((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleToggleCategory = (cat) => {
    setLocalPrefs((prev) => {
      const exists = prev.preferredCategories.includes(cat);
      const updated = exists
        ? prev.preferredCategories.filter((c) => c !== cat)
        : [...prev.preferredCategories, cat];
      return { ...prev, preferredCategories: updated };
    });
    setHasChanges(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSavePreferences && onSavePreferences(localPrefs);
    setHasChanges(false);
    showToast && showToast("Learning preferences saved successfully!");
  };

  const handleReset = () => {
    setLocalPrefs({ ...preferences });
    setHasChanges(false);
    showToast && showToast("Changes discarded.");
  };

  // Convert minutes to clean hours / minutes display
  const formatDuration = (mins) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    if (hours > 0 && m > 0) return `${hours} hr ${m} min`;
    if (hours > 0) return `${hours} hr${hours > 1 ? "s" : ""}`;
    return `${m} mins`;
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 w-full min-w-0 max-w-full">
      {/* 1. Daily & Weekly Targets */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-6 flex items-center justify-between flex-wrap gap-2">
          <div className="min-w-0">
            <h4 className="font-title-md text-title-md font-bold text-on-surface">
              Study Goals & Pacing
            </h4>
            <p className="text-xs text-outline mt-0.5">
              Set realistic targets for daily sessions and weekly commitments.
            </p>
          </div>
          <span className="p-2 rounded-lg bg-surface-container-highest/50 text-secondary shrink-0">
            <Target size={18} />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
          {/* Daily Goal Slider */}
          <div className="space-y-3 p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/40 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <label
                htmlFor="daily-goal-range"
                className="text-xs font-semibold uppercase tracking-wider text-outline flex items-center gap-1.5"
              >
                <Clock size={14} className="text-primary shrink-0" />
                <span>Daily Study Goal</span>
              </label>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-primary/20 text-primary font-mono shrink-0">
                {formatDuration(localPrefs.dailyGoalMinutes)}
              </span>
            </div>

            <input
              id="daily-goal-range"
              type="range"
              min="15"
              max="240"
              step="15"
              value={localPrefs.dailyGoalMinutes}
              onChange={(e) =>
                handleFieldChange("dailyGoalMinutes", Number(e.target.value))
              }
              aria-valuemin="15"
              aria-valuemax="240"
              aria-valuenow={localPrefs.dailyGoalMinutes}
              aria-valuetext={formatDuration(localPrefs.dailyGoalMinutes)}
              aria-label="Daily study goal duration in minutes"
              className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-outline font-mono">
              <span>15 min</span>
              <span>1 hr</span>
              <span>2 hrs</span>
              <span>4 hrs</span>
            </div>
          </div>

          {/* Weekly Commitment Target */}
          <div className="space-y-3 p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/40 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <label
                htmlFor="weekly-goal-range"
                className="text-xs font-semibold uppercase tracking-wider text-outline flex items-center gap-1.5"
              >
                <Calendar size={14} className="text-tertiary shrink-0" />
                <span>Weekly Commitment</span>
              </label>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-tertiary/20 text-tertiary font-mono shrink-0">
                {localPrefs.weeklyGoalHours} hrs / week
              </span>
            </div>

            <input
              id="weekly-goal-range"
              type="range"
              min="2"
              max="40"
              step="1"
              value={localPrefs.weeklyGoalHours}
              onChange={(e) =>
                handleFieldChange("weeklyGoalHours", Number(e.target.value))
              }
              aria-valuemin="2"
              aria-valuemax="40"
              aria-valuenow={localPrefs.weeklyGoalHours}
              aria-valuetext={`${localPrefs.weeklyGoalHours} hours per week`}
              aria-label="Weekly commitment target in hours"
              className="w-full accent-tertiary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-outline font-mono">
              <span>2 hrs</span>
              <span>10 hrs</span>
              <span>20 hrs</span>
              <span>40 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Preferred Learning Categories */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-6 flex items-center justify-between flex-wrap gap-2">
          <div className="min-w-0">
            <h4 className="font-title-md text-title-md font-bold text-on-surface">
              Curriculum Focus & Categories
            </h4>
            <p className="text-xs text-outline mt-0.5">
              Select technical areas to prioritize in recommendations and roadmap suggestions.
            </p>
          </div>
          <span className="text-xs font-mono text-outline shrink-0">
            {localPrefs.preferredCategories.length} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full min-w-0" role="group" aria-label="Learning focus categories">
          {learningCategoriesList.map((category) => {
            const isSelected = localPrefs.preferredCategories.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleToggleCategory(category)}
                aria-pressed={isSelected}
                aria-label={`Toggle focus category: ${category}`}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? "bg-primary text-on-primary border-primary shadow-sm"
                    : "bg-surface-container/60 text-outline hover:text-on-surface hover:bg-surface-container border-surface-container-highest/60"
                }`}
              >
                {isSelected ? (
                  <Check size={13} strokeWidth={3} />
                ) : (
                  <Sparkles size={13} className="opacity-40" />
                )}
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Difficulty, Study Rhythm & Reminders */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-6">
          <h4 className="font-title-md text-title-md font-bold text-on-surface">
            Study Rhythm & Timing
          </h4>
          <p className="text-xs text-outline mt-0.5">
            Tailor your preferred technical depth and daily session hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full min-w-0">
          {/* Difficulty Preference */}
          <div className="space-y-2 min-w-0">
            <label
              htmlFor="difficulty-select"
              className="block text-xs font-semibold uppercase tracking-wider text-outline flex items-center gap-1.5"
            >
              <GraduationCap size={14} className="text-secondary shrink-0" />
              <span>Depth Preference</span>
            </label>
            <select
              id="difficulty-select"
              value={localPrefs.difficultyPreference}
              onChange={(e) =>
                handleFieldChange("difficultyPreference", e.target.value)
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface focus:outline-none focus:border-primary transition-all cursor-pointer"
            >
              {difficultyOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Study Time */}
          <div className="space-y-2 min-w-0">
            <label
              htmlFor="study-time-select"
              className="block text-xs font-semibold uppercase tracking-wider text-outline flex items-center gap-1.5"
            >
              <Clock size={14} className="text-primary shrink-0" />
              <span>Optimal Session Time</span>
            </label>
            <select
              id="study-time-select"
              value={localPrefs.preferredStudyTime}
              onChange={(e) =>
                handleFieldChange("preferredStudyTime", e.target.value)
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface focus:outline-none focus:border-primary transition-all cursor-pointer"
            >
              {studyTimeOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Session Reminder Timing */}
          <div className="space-y-2 min-w-0">
            <label
              htmlFor="reminder-timing-select"
              className="block text-xs font-semibold uppercase tracking-wider text-outline flex items-center gap-1.5"
            >
              <BellRing size={14} className="text-tertiary shrink-0" />
              <span>Reminder Lead Time</span>
            </label>
            <select
              id="reminder-timing-select"
              value={localPrefs.reminderTiming}
              onChange={(e) =>
                handleFieldChange("reminderTiming", e.target.value)
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-sm text-on-surface focus:outline-none focus:border-primary transition-all cursor-pointer"
            >
              {reminderOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Auto Progress Toggle */}
        <div className="mt-6 pt-5 border-t border-surface-container-highest/40 flex items-center justify-between gap-3 min-w-0 flex-wrap sm:flex-nowrap">
          <div className="space-y-0.5 min-w-0">
            <div className="text-sm font-medium text-on-surface flex items-center gap-2">
              <BookOpen size={15} className="text-primary shrink-0" />
              <span>Continuous Curriculum Auto-Advance</span>
            </div>
            <div className="text-xs text-outline">
              Automatically queue the next lesson in your active roadmap upon module completion.
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              handleFieldChange(
                "autoStartNextLesson",
                !localPrefs.autoStartNextLesson
              )
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer shrink-0 ${
              localPrefs.autoStartNextLesson
                ? "bg-primary"
                : "bg-surface-container-highest"
            }`}
            role="switch"
            aria-checked={localPrefs.autoStartNextLesson}
            aria-label="Toggle continuous curriculum auto advance"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                localPrefs.autoStartNextLesson
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Floating / Bottom Action Bar */}
      <div className="flex items-center justify-end gap-3 pt-2 flex-wrap">
        {hasChanges && (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-highest text-outline hover:text-on-surface text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Discard Changes</span>
          </button>
        )}
        <button
          type="submit"
          disabled={!hasChanges}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            hasChanges
              ? "bg-primary text-on-primary hover:bg-primary-container shadow-lg shadow-primary/20 cursor-pointer"
              : "bg-surface-container text-outline opacity-60 cursor-not-allowed border border-surface-container-highest"
          }`}
        >
          <Check size={16} />
          <span>Save Learning Preferences</span>
        </button>
      </div>
    </form>
  );
}
