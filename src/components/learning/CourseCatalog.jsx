import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Layers,
  Code2,
  Network,
  Brain,
  Cpu,
  Cloud,
  Star,
  Clock,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Play,
} from "lucide-react";
import { categoriesData, allCoursesData } from "../../data/learning/learningData";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "../../utils/storage";
import CoursePreviewModal from "./CoursePreviewModal";

const categoryIconMap = {
  Layers: Layers,
  Code2: Code2,
  Network: Network,
  Brain: Brain,
  Cpu: Cpu,
  Cloud: Cloud,
};

const statusTabs = [
  { id: "all", label: "All Courses" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "bookmarked", label: "Bookmarked" },
];

export default function CourseCatalog({ onSelectCourse }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedCourse, setLocalSelectedCourse] = useState(null);
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);

  // Persisted bookmarks synchronized with Dashboard CourseCarousel
  const [bookmarkedIds, setBookmarkedIds] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.COURSE_BOOKMARKS,
      ["course-1", "course-3"],
      (arr) => Array.isArray(arr)
    )
  );

  // Sync bookmark updates across tabs / window storage events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (!e || e.key === STORAGE_KEYS.COURSE_BOOKMARKS) {
        const stored = getStoredItem(
          STORAGE_KEYS.COURSE_BOOKMARKS,
          ["course-1", "course-3"],
          (arr) => Array.isArray(arr)
        );
        setBookmarkedIds(stored);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleToggleBookmark = (courseId) => {
    const isBookmarked = bookmarkedIds.includes(courseId);
    const updated = isBookmarked
      ? bookmarkedIds.filter((id) => id !== courseId)
      : [...bookmarkedIds, courseId];

    setBookmarkedIds(updated);
    setStoredItem(STORAGE_KEYS.COURSE_BOOKMARKS, updated);
  };

  const handleOpenCourse = (course) => {
    if (onSelectCourse) {
      onSelectCourse(course);
    } else {
      setLocalSelectedCourse(course);
      setIsLocalModalOpen(true);
    }
  };

  const filteredCourses = useMemo(() => {
    return allCoursesData.filter((course) => {
      const isBookmarked = bookmarkedIds.includes(course.id);
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "bookmarked"
          ? isBookmarked
          : course.status === selectedStatus);
      const matchesSearch =
        searchQuery.trim() === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, searchQuery, bookmarkedIds]);

  return (
    <section className="space-y-6 w-full min-w-0 max-w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 min-w-0">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Full Catalog & Pathways
          </span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            My Courses & Tracks
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-3 text-outline pointer-events-none" />
          <input
            type="text"
            placeholder="Search courses, mentors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search courses and mentors"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container/70 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full max-w-full min-w-0" role="group" aria-label="Course category filters">
        {categoriesData.map((cat) => {
          const Icon = categoryIconMap[cat.icon] || Layers;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Filter by ${cat.label}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary font-semibold shadow-md"
                  : "bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center justify-between border-b border-surface-container-highest/40 pb-3 gap-2 overflow-x-auto max-w-full min-w-0 no-scrollbar">
        <div className="flex items-center gap-2 shrink-0" role="tablist" aria-label="Course status filters">
          {statusTabs.map((tab) => {
            const isSelected = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                  isSelected
                    ? "bg-surface-container-highest text-on-surface font-semibold shadow-sm"
                    : "text-outline hover:text-on-surface"
                }`}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <span className="font-label-sm text-label-sm text-outline hidden sm:inline">
          Showing {filteredCourses.length} of {allCoursesData.length} courses
        </span>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-12 text-center space-y-3">
          <BookOpen size={36} className="mx-auto text-outline opacity-60" />
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            No courses found
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            Try adjusting your search criteria or switching categories to discover available courses.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedStatus("all");
              setSearchQuery("");
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-highest transition-colors"
            type="button"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full min-w-0">
          {filteredCourses.map((course) => {
            const isBookmarked = bookmarkedIds.includes(course.id);

            return (
              <div
                key={course.id}
                onClick={() => handleOpenCourse(course)}
                className="group rounded-2xl bg-surface-container-low/90 backdrop-blur-xl overflow-hidden shadow-xl hover:shadow-[0_12px_32px_rgba(96,1,209,0.25)] transition-all transform hover:-translate-y-1 flex flex-col justify-between min-w-0 cursor-pointer"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative w-full h-40 overflow-hidden bg-surface-container-highest">
                    <div
                      className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${course.thumbnail}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/40"></div>

                    {/* Category Pill */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${course.badgeColor}`}
                      >
                        {course.categoryLabel}
                      </span>
                    </div>

                    {/* Status Indicator & Bookmark Button */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {course.status === "completed" && (
                        <span className="p-1 rounded-full bg-surface-container-lowest/80 text-secondary flex items-center justify-center shadow-md">
                          <CheckCircle2 size={16} />
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBookmark(course.id);
                        }}
                        type="button"
                        aria-pressed={isBookmarked}
                        aria-label={
                          isBookmarked
                            ? `Remove ${course.title} from bookmarks`
                            : `Bookmark ${course.title}`
                        }
                        title={isBookmarked ? "Remove bookmark" : "Bookmark course"}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
                          isBookmarked
                            ? "bg-primary text-on-primary scale-105"
                            : "bg-surface-container-lowest/80 text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest"
                        }`}
                      >
                        <Bookmark
                          size={15}
                          fill={isBookmarked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-surface-container-highest">
                      <div
                        className={`h-full ${
                          course.status === "completed"
                            ? "bg-secondary"
                            : "bg-gradient-to-r from-secondary-container to-tertiary"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-outline font-label-sm text-label-sm">
                      <span className="text-on-surface-variant">{course.instructor}</span>
                      <span className="flex items-center gap-1 text-secondary font-medium">
                        <Star size={12} className="fill-secondary text-secondary" />
                        {course.rating}
                      </span>
                    </div>

                    <h3 className="font-label-md text-label-md font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between font-label-sm text-label-sm text-outline pt-1">
                      <span className="flex items-center gap-1">
                        <BookOpen size={13} />
                        {course.lessons}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {course.hours}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCourse(course);
                    }}
                    aria-label={
                      course.status === "completed"
                        ? `Review ${course.title}`
                        : course.progress > 0
                        ? `Continue ${course.title} at ${course.progress}%`
                        : `Start learning ${course.title}`
                    }
                    className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    type="button"
                  >
                    {course.status === "completed" ? (
                      <>
                        <CheckCircle2 size={14} className="text-secondary" />
                        <span>Review Course</span>
                      </>
                    ) : course.progress > 0 ? (
                      <>
                        <Play size={14} className="text-tertiary" />
                        <span>Continue ({course.progress}%)</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} className="text-primary" />
                        <span>Start Learning</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Standalone Course Preview Modal Fallback */}
      {!onSelectCourse && (
        <CoursePreviewModal
          course={localSelectedCourse}
          isOpen={isLocalModalOpen}
          onClose={() => setIsLocalModalOpen(false)}
          isBookmarked={localSelectedCourse ? bookmarkedIds.includes(localSelectedCourse.id) : false}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
    </section>
  );
}
