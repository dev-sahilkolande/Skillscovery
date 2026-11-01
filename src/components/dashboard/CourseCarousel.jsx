import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck, Play, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { coursesData } from "../../data/dashboard/coursesData";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "../../utils/storage";

export default function CourseCarousel() {
  const navigate = useNavigate();
  const { courses } = coursesData;
  const carouselRef = useRef(null);

  // Active filter tab: 'in_progress' | 'bookmarked'
  const [activeFilter, setActiveFilter] = useState("in_progress");

  // Bookmarked courses state persisted in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.COURSE_BOOKMARKS,
      ["course-1", "course-3"],
      (arr) => Array.isArray(arr)
    )
  );

  // Carousel scroll state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [activeFilter, bookmarkedIds]);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const handleToggleBookmark = (courseId) => {
    const isBookmarked = bookmarkedIds.includes(courseId);
    const updated = isBookmarked
      ? bookmarkedIds.filter((id) => id !== courseId)
      : [...bookmarkedIds, courseId];

    setBookmarkedIds(updated);
    setStoredItem(STORAGE_KEYS.COURSE_BOOKMARKS, updated);
  };

  const handleResumeCourse = () => {
    navigate("/learning");
  };

  // Filter courses based on active tab
  const displayedCourses =
    activeFilter === "bookmarked"
      ? courses.filter((c) => bookmarkedIds.includes(c.id))
      : courses;

  return (
    <section className="space-y-4 sm:space-y-5 w-full min-w-0 max-w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Video Curricula
          </span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            Continue Learning
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-surface-container rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFilter("in_progress")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-label-sm text-label-sm font-semibold transition-colors shrink-0 cursor-pointer ${
                activeFilter === "in_progress"
                  ? "bg-surface-container-high text-on-surface shadow-sm"
                  : "text-outline hover:text-on-surface"
              }`}
              type="button"
              aria-pressed={activeFilter === "in_progress"}
            >
              In Progress ({courses.length})
            </button>
            <button
              onClick={() => setActiveFilter("bookmarked")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-label-sm text-label-sm font-semibold transition-colors shrink-0 cursor-pointer ${
                activeFilter === "bookmarked"
                  ? "bg-surface-container-high text-on-surface shadow-sm"
                  : "text-outline hover:text-on-surface"
              }`}
              type="button"
              aria-pressed={activeFilter === "bookmarked"}
            >
              Bookmarked ({bookmarkedIds.length})
            </button>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={!canScrollLeft}
              className={`p-1.5 sm:p-2 rounded-xl bg-surface-container text-on-surface transition-colors cursor-pointer ${
                !canScrollLeft
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-surface-container-high"
              }`}
              type="button"
              aria-label="Previous courses"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              className={`p-1.5 sm:p-2 rounded-xl bg-surface-container text-on-surface transition-colors cursor-pointer ${
                !canScrollRight
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-surface-container-high"
              }`}
              type="button"
              aria-label="Next courses"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State for Bookmarks */}
      {displayedCourses.length === 0 ? (
        <div className="p-8 rounded-2xl bg-surface-container-low/90 border border-surface-container-highest/50 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline">
            <BookOpen size={24} />
          </div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            No Bookmarked Curricula
          </h3>
          <p className="font-body-sm text-body-sm text-outline max-w-sm">
            Save courses to this section by clicking the bookmark icon on any curriculum card.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("in_progress")}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer"
          >
            View In-Progress Courses
          </button>
        </div>
      ) : (
        /*  Course Cards Scroll Container  */
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="w-full max-w-full min-w-0 flex gap-3.5 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {displayedCourses.map((course) => {
            const isBookmarked = bookmarkedIds.includes(course.id);

            return (
              <div
                key={course.id}
                className="w-[270px] sm:w-[340px] lg:w-[calc(33.333%-16px)] max-w-[calc(100vw-2.25rem)] shrink-0 snap-start group relative rounded-2xl bg-surface-container-low/90 backdrop-blur-xl overflow-hidden shadow-xl hover:shadow-[0_12px_32px_rgba(96,1,209,0.25)] transition-all transform hover:-translate-y-1 flex flex-col justify-between"
              >
                {/*  Thumbnail with Scrim & Play Button  */}
                <div className="relative w-full h-48 overflow-hidden bg-surface-container-highest">
                  <div
                    className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                    data-alt={course.dataAlt}
                    style={{
                      backgroundImage: `url('${course.thumbnailUrl}')`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/40"></div>

                  {/*  Badges  */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm font-semibold ${course.categoryBadgeColor}`}
                    >
                      {course.category}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleBookmark(course.id)}
                    className={`absolute top-3 right-3 p-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md transition-colors cursor-pointer ${
                      isBookmarked
                        ? "text-primary bg-primary-container/40"
                        : "text-outline hover:text-primary"
                    }`}
                    type="button"
                    aria-label={
                      isBookmarked
                        ? `Remove ${course.title} from bookmarks`
                        : `Bookmark ${course.title}`
                    }
                    title={isBookmarked ? "Remove bookmark" : "Bookmark course"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck size={16} />
                    ) : (
                      <Bookmark size={16} />
                    )}
                  </button>

                  {/*  Glass Hover Play Button  */}
                  <div
                    onClick={handleResumeCourse}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs bg-surface-container-lowest/30 cursor-pointer"
                  >
                    <div
                      className={`w-14 h-14 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface flex items-center justify-center transform group-hover:scale-110 transition-transform ${course.playGlow}`}
                    >
                      <Play
                        size={24}
                        className={`fill-current pl-0.5 ${course.playIconColor}`}
                      />
                    </div>
                  </div>

                  {/*  Progress Bar attached to thumb bottom  */}
                  <div className="absolute bottom-0 inset-x-0 h-1.5 bg-surface-container-highest">
                    <div
                      className={`h-full ${course.progressWidth} ${course.progressGradient}`}
                    ></div>
                  </div>
                </div>

                {/*  Body  */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-outline font-label-sm text-label-sm">
                      <span>{course.instructor}</span>
                      <span>{course.timeRemaining}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-surface-container-highest/40">
                    <span
                      className={`font-label-sm text-label-sm font-medium ${course.lessonColor}`}
                    >
                      {course.lessonText}
                    </span>
                    <button
                      onClick={handleResumeCourse}
                      className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold transition-all cursor-pointer"
                      type="button"
                    >
                      Resume
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
