import { useState } from "react";
import { BookOpen, CheckCircle2, Clock, Flame, Layers } from "lucide-react";
import { coursePerformanceData } from "../../data/analytics/analyticsData";

export default function CoursePerformance() {
  const [statusFilter, setStatusFilter] = useState("all");
  const { summary, courses } = coursePerformanceData;

  const filteredCourses = courses.filter((course) => {
    if (statusFilter === "all") return true;
    return course.status === statusFilter;
  });

  return (
    <section className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-xl space-y-6 w-full min-w-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-highest/40 pb-5 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Syllabus Completion
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Course Performance & Mastery
            </h2>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-surface-container rounded-xl p-1 overflow-x-auto max-w-full min-w-0" role="tablist" aria-label="Course status filters">
          <button
            role="tab"
            aria-selected={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-surface-container-high text-on-surface shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
            type="button"
          >
            All ({summary.totalEnrolled})
          </button>
          <button
            role="tab"
            aria-selected={statusFilter === "in_progress"}
            onClick={() => setStatusFilter("in_progress")}
            className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
              statusFilter === "in_progress"
                ? "bg-surface-container-high text-on-surface shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
            type="button"
          >
            In Progress ({summary.inProgress})
          </button>
          <button
            role="tab"
            aria-selected={statusFilter === "completed"}
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
              statusFilter === "completed"
                ? "bg-surface-container-high text-on-surface shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
            type="button"
          >
            Completed ({summary.completed})
          </button>
          <button
            role="tab"
            aria-selected={statusFilter === "planned"}
            onClick={() => setStatusFilter("planned")}
            className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
              statusFilter === "planned"
                ? "bg-surface-container-high text-on-surface shadow-sm"
                : "text-outline hover:text-on-surface"
            }`}
            type="button"
          >
            Planned ({summary.planned})
          </button>
        </div>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <Layers size={18} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-outline block">Enrolled Tracks</span>
            <span className="font-title-lg text-title-lg font-bold text-on-surface">
              {summary.totalEnrolled} Courses
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-outline block">Graduated</span>
            <span className="font-title-lg text-title-lg font-bold text-secondary">
              {summary.completed} Courses
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
            <Flame size={18} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-outline block">Active Now</span>
            <span className="font-title-lg text-title-lg font-bold text-tertiary">
              {summary.inProgress} In Flight
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-highest/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <Clock size={18} />
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-outline block">Topics Mastered</span>
            <span className="font-title-lg text-title-lg font-bold text-on-surface">
              {summary.totalLessonsMastered} / {summary.totalLessons}
            </span>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 w-full min-w-0">
        {filteredCourses.map((course) => {
          const isCompleted = course.status === "completed";
          const isInProgress = course.status === "in_progress";

          return (
            <div
              key={course.id}
              className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between min-w-0 ${
                isCompleted
                  ? "bg-surface-container-high/40 border-surface-container-highest/50"
                  : isInProgress
                  ? "bg-surface-container-high/70 border-primary/30 hover:border-primary/60 shadow-sm"
                  : "bg-surface-container-high/30 border-surface-container-highest/30 opacity-75"
              }`}
            >
              <div className="space-y-3">
                {/* Meta row: Category pill + Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-medium ${course.categoryBadgeColor}`}
                  >
                    {course.category}
                  </span>

                  {isCompleted && (
                    <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-semibold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      <span>{course.statusLabel}</span>
                    </span>
                  )}
                  {isInProgress && (
                    <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-semibold flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      <span>{course.statusLabel}</span>
                    </span>
                  )}
                  {!isCompleted && !isInProgress && (
                    <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-outline">
                      {course.statusLabel}
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="font-title-md text-title-md font-bold text-on-surface line-clamp-2">
                  {course.title}
                </h3>

                {/* Progress bar and Percentage */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-outline">
                      {course.completedLessons} of {course.totalLessons} lessons
                    </span>
                    <span
                      className={`font-bold ${
                        isCompleted
                          ? "text-secondary"
                          : isInProgress
                          ? "text-primary"
                          : "text-outline"
                      }`}
                    >
                      {course.progress}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? "bg-secondary"
                          : isInProgress
                          ? "bg-gradient-to-r from-primary to-tertiary"
                          : "bg-surface-container-highest"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer info: Hours spent & Last Active */}
              <div className="pt-4 mt-3 border-t border-surface-container-highest/40 flex items-center justify-between text-xs text-outline">
                <span className="flex items-center gap-1 text-on-surface font-medium">
                  <Clock size={13} className="text-primary" />
                  {course.hoursSpent} logged
                </span>
                <span>Active: {course.lastActive}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
