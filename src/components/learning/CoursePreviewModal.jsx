import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Star,
  User,
  Timer,
  Compass,
  Calendar,
  Flame,
  Bookmark,
  Sparkles,
} from "lucide-react";
import { useModalA11y } from "../../hooks/useModalA11y";
import { focusSessionStore } from "../../utils/focusSessionStore";

export default function CoursePreviewModal({
  course,
  isOpen,
  onClose,
  isBookmarked = false,
  onToggleBookmark,
}) {
  const navigate = useNavigate();

  const modalRef = useModalA11y({
    isOpen,
    onClose,
  });

  // Prevent background scrolling while modal is active
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !course) return null;

  const isCompleted = course.status === "completed" || course.progress === 100;
  const isInProgress = !isCompleted && course.progress > 0;
  const isNotStarted = !isCompleted && (!course.progress || course.progress === 0);

  // Navigation handlers utilizing existing application routes
  const handleOpenFocus = () => {
    onClose();
    focusSessionStore.openModal();
  };

  const handleNavigateVideos = () => {
    onClose();
    navigate("/videos");
  };

  const handleNavigateRoadmaps = () => {
    onClose();
    navigate("/roadmaps");
  };

  const handleNavigatePlanner = () => {
    onClose();
    navigate("/planner");
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto cursor-pointer"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-preview-title"
        aria-describedby="course-preview-description"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-surface-container border border-surface-container-highest shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col outline-none min-w-0 cursor-default"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-surface-container-highest/60 bg-surface-container-low min-w-0">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span
              className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                course.badgeColor || "bg-primary-container/30 text-primary"
              }`}
            >
              {course.categoryLabel || course.category || "Curriculum Track"}
            </span>
            {course.level && (
              <span className="px-2 py-0.5 rounded-md bg-surface-container text-[11px] font-mono text-outline uppercase tracking-wider">
                {course.level}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onToggleBookmark && (
              <button
                type="button"
                onClick={() => onToggleBookmark(course.id)}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark course"}
                title={isBookmarked ? "Remove bookmark" : "Bookmark course"}
                className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                  isBookmarked
                    ? "bg-primary text-on-primary"
                    : "text-outline hover:text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            )}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close modal"
              className="p-1.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 min-w-0 flex-1">
          {/* Thumbnail Preview Banner */}
          <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-surface-container-highest shadow-inner">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${course.thumbnail}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-black/40" />

            {/* Status Pill on Thumbnail */}
            <div className="absolute top-3 left-3">
              {isCompleted ? (
                <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-secondary text-xs font-semibold flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 size={14} className="text-secondary" />
                  <span>Completed (100%)</span>
                </span>
              ) : isInProgress ? (
                <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-tertiary text-xs font-semibold flex items-center gap-1.5 shadow-md">
                  <Flame size={14} className="text-tertiary" />
                  <span>In Progress ({course.progress}%)</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary text-xs font-semibold flex items-center gap-1.5 shadow-md">
                  <BookOpen size={14} className="text-primary" />
                  <span>Not Started (0%)</span>
                </span>
              )}
            </div>

            {/* Hours and Rating Overlay */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-medium flex items-center gap-1 shadow">
                <Star size={13} className="fill-secondary text-secondary" />
                <span>{course.rating || "4.9"}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-medium flex items-center gap-1 shadow">
                <Clock size={13} className="text-outline" />
                <span>{course.hours || "20 hrs"}</span>
              </span>
            </div>
          </div>

          {/* Title and Instructor Row */}
          <div className="space-y-1.5 min-w-0">
            <h3
              id="course-preview-title"
              className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md font-bold text-on-surface leading-tight"
            >
              {course.title}
            </h3>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-outline flex-wrap">
              <span className="flex items-center gap-1 text-on-surface-variant font-medium">
                <User size={14} className="text-primary" />
                <span>{course.instructor}</span>
              </span>
              <span>·</span>
              <span>{course.lessons || "12 structured lessons"}</span>
            </div>
          </div>

          {/* Progress Tracker Bar */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-low border border-surface-container-highest/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-on-surface flex items-center gap-1.5">
                {isCompleted ? (
                  <>
                    <CheckCircle2 size={14} className="text-secondary" />
                    <span>Mastery Status: Completed</span>
                  </>
                ) : isInProgress ? (
                  <>
                    <Flame size={14} className="text-tertiary" />
                    <span>Current Progress: {course.progress}%</span>
                  </>
                ) : (
                  <>
                    <BookOpen size={14} className="text-primary" />
                    <span>Curriculum Status: Ready to Begin</span>
                  </>
                )}
              </span>
              <span className="font-mono text-outline">
                {isCompleted ? "100%" : `${course.progress || 0}%`}
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isCompleted
                    ? "bg-secondary"
                    : isInProgress
                    ? "bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary"
                    : "bg-primary/20"
                }`}
                style={{ width: `${course.progress || 0}%` }}
              />
            </div>

            <p className="text-[11px] text-outline">
              {isCompleted
                ? "You have completed all requirements and assessments in this pathway."
                : isInProgress
                ? `${course.lessons || "In-progress lessons"} · Pick up right where you paused.`
                : "Course enrollment active. Progress begins when you complete your first lesson."}
            </p>
          </div>

          {/* Course Overview Description */}
          <div className="space-y-1.5 min-w-0">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-outline">
              Curriculum Overview
            </h4>
            <p
              id="course-preview-description"
              className="text-sm text-on-surface-variant leading-relaxed"
            >
              {course.description ||
                "Deep dive into production architectures, implementation patterns, and low-latency systems engineering with comprehensive module tracks."}
            </p>
          </div>

          {/* State-Specific Dynamic Context Callouts */}
          {isCompleted && (
            <div className="p-3.5 rounded-xl bg-secondary-container/20 border border-secondary/30 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-secondary shrink-0 mt-0.5" />
              <div className="text-xs text-outline leading-relaxed min-w-0">
                <span className="font-semibold text-secondary">Course Completed: </span>
                You have finished all modules in this track. You can review the material at any time
                or explore advanced career tracks in the Roadmaps section.
              </div>
            </div>
          )}

          {isInProgress && (
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex items-start gap-3">
              <BookOpen size={18} className="text-tertiary shrink-0 mt-0.5" />
              <div className="text-xs text-outline leading-relaxed min-w-0">
                <span className="font-semibold text-on-surface">Active Lesson: </span>
                <span className="text-on-surface-variant font-medium">
                  {course.currentLesson || "Next Scheduled Module"}
                </span>
                {course.timeRemaining && (
                  <span className="ml-2 font-mono text-tertiary">({course.timeRemaining})</span>
                )}
              </div>
            </div>
          )}

          {isNotStarted && (
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex items-start gap-3">
              <Sparkles size={18} className="text-primary shrink-0 mt-0.5" />
              <div className="text-xs text-outline leading-relaxed min-w-0">
                <span className="font-semibold text-on-surface">Curriculum Ready: </span>
                This course has not been started yet (0% progress). Launch the video workshop or
                schedule a dedicated focus block in your study planner to get started.
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Row */}
        <div className="p-4 sm:p-5 border-t border-surface-container-highest/60 bg-surface-container-low flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-highest text-outline hover:text-on-surface text-sm font-medium transition-all cursor-pointer text-center"
          >
            Close
          </button>

          {/* Dynamic Actions based on CTA state */}
          {isCompleted && (
            <>
              <button
                type="button"
                onClick={handleOpenFocus}
                className="px-4 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-container-high text-on-surface text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-surface-container-highest"
              >
                <Timer size={16} className="text-primary" />
                <span>Focus Review</span>
              </button>
              <button
                type="button"
                onClick={handleNavigateRoadmaps}
                className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary hover:brightness-110 text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Compass size={16} />
                <span>Explore Roadmaps</span>
              </button>
            </>
          )}

          {isInProgress && (
            <>
              <button
                type="button"
                onClick={handleOpenFocus}
                className="px-4 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-container-high text-on-surface text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-surface-container-highest"
              >
                <Timer size={16} className="text-primary" />
                <span>Focus Timer</span>
              </button>
              <button
                type="button"
                onClick={handleNavigateVideos}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary-container to-tertiary text-on-surface font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-tertiary/20 hover:brightness-110 transition-all cursor-pointer"
              >
                <Play size={15} className="fill-current" />
                <span>Continue in Videos</span>
              </button>
            </>
          )}

          {isNotStarted && (
            <>
              <button
                type="button"
                onClick={handleNavigatePlanner}
                className="px-4 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-container-high text-on-surface text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-surface-container-highest"
              >
                <Calendar size={16} className="text-secondary" />
                <span>Schedule in Planner</span>
              </button>
              <button
                type="button"
                onClick={handleNavigateVideos}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:brightness-110 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all cursor-pointer"
              >
                <Play size={15} className="fill-current" />
                <span>Begin in Videos</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
