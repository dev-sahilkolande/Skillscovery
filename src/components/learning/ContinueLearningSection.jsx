import { useState } from "react";
import { Play, Clock, BookOpen, CheckCircle } from "lucide-react";
import { continueLearningData, allCoursesData } from "../../data/learning/learningData";

export default function ContinueLearningSection({ onSelectCourse }) {
  const [activeCourseId, setActiveCourseId] = useState(null);

  const handleResume = (course) => {
    setActiveCourseId(course.id);
    setTimeout(() => {
      setActiveCourseId(null);
    }, 1200);

    if (onSelectCourse) {
      const fullCourse = allCoursesData.find(
        (c) => c.title === course.title || c.id === course.id
      );
      onSelectCourse(fullCourse ? { ...fullCourse, ...course } : course);
    }
  };

  return (
    <section className="space-y-5 w-full min-w-0 max-w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 min-w-0">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Resume Study Sessions
          </span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            Continue Learning
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          {continueLearningData.length} Courses In Progress
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full min-w-0">
        {continueLearningData.map((course) => {
          const isResuming = activeCourseId === course.id;

          return (
            <div
              key={course.id}
              onClick={() => handleResume(course)}
              className="group relative rounded-2xl bg-surface-container-low/90 backdrop-blur-xl overflow-hidden shadow-xl hover:shadow-[0_12px_32px_rgba(96,1,209,0.25)] transition-all transform hover:-translate-y-1 flex flex-col justify-between min-w-0 cursor-pointer"
            >
              <div>
                {/* Thumbnail with Overlay */}
                <div className="relative w-full h-44 overflow-hidden bg-surface-container-highest">
                  <div
                    className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${course.thumbnail}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/50"></div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm font-semibold ${course.categoryBadgeColor}`}
                    >
                      {course.category}
                    </span>
                  </div>

                  {/* Play Button Glass Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs bg-surface-container-lowest/30">
                    <div className="w-12 h-12 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play size={22} className="text-tertiary fill-tertiary pl-0.5" />
                    </div>
                  </div>

                  {/* Attached Progress Bar */}
                  <div className="absolute bottom-0 inset-x-0 h-1.5 bg-surface-container-highest">
                    <div
                      className={`h-full bg-gradient-to-r ${course.gradient}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-outline font-label-sm text-label-sm">
                    <span className="text-on-surface-variant font-medium">{course.instructor}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-outline" />
                      {course.timeRemaining}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  {/* Current Active Lesson Sub-block */}
                  <div className="p-2.5 rounded-xl bg-surface-container/70 border border-surface-container-highest/50 flex items-center gap-2.5">
                    <BookOpen size={16} className="text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider text-[10px]">
                        Current Lesson
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface truncate font-medium">
                        {course.currentLesson}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Actions */}
              <div className="px-5 pb-5 pt-1 flex items-center justify-between border-t border-surface-container-highest/30">
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                  <CheckCircle size={14} className="text-secondary" />
                  <span>
                    {course.completedLessons} / {course.totalLessons} lessons ({course.progress}%)
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResume(course);
                  }}
                  aria-label={`Resume ${course.title}`}
                  className={`px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isResuming
                      ? "bg-tertiary text-on-tertiary shadow-[0_0_12px_rgba(76,215,246,0.6)]"
                      : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface"
                  }`}
                  type="button"
                >
                  <Play size={12} className={isResuming ? "fill-on-tertiary" : ""} />
                  <span>{isResuming ? "Resuming..." : "Resume"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
