import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LearningHero from "../components/learning/LearningHero";
import ContinueLearningSection from "../components/learning/ContinueLearningSection";
import CourseCatalog from "../components/learning/CourseCatalog";
import LearningProgressStats from "../components/learning/LearningProgressStats";
import RecentlyAccessed from "../components/learning/RecentlyAccessed";
import CoursePreviewModal from "../components/learning/CoursePreviewModal";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "../utils/storage";

export default function Learning() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Synchronized course bookmarks with storage
  const [bookmarkedIds, setBookmarkedIds] = useState(() =>
    getStoredItem(
      STORAGE_KEYS.COURSE_BOOKMARKS,
      ["course-1", "course-3"],
      (arr) => Array.isArray(arr)
    )
  );

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

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleBookmark = (courseId) => {
    const isBookmarked = bookmarkedIds.includes(courseId);
    const updated = isBookmarked
      ? bookmarkedIds.filter((id) => id !== courseId)
      : [...bookmarkedIds, courseId];

    setBookmarkedIds(updated);
    setStoredItem(STORAGE_KEYS.COURSE_BOOKMARKS, updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-8"
    >
      {/* 1. Welcome & Activity Summary */}
      <LearningHero />

      {/* 2. Continue Learning In-Progress Tracks */}
      <ContinueLearningSection onSelectCourse={handleSelectCourse} />

      {/* 3. Course Catalog & Filterable Learning Categories */}
      <CourseCatalog onSelectCourse={handleSelectCourse} />

      {/* 4. Split Grid: Learning Statistics & Recently Accessed Resources */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0">
        <div className="lg:col-span-7 w-full min-w-0">
          <LearningProgressStats />
        </div>
        <div className="lg:col-span-5 w-full min-w-0">
          <RecentlyAccessed />
        </div>
      </section>

      {/* 5. Course Details & Learning Actions Preview Modal */}
      <CoursePreviewModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isBookmarked={selectedCourse ? bookmarkedIds.includes(selectedCourse.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </motion.div>
  );
}
