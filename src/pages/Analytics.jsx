import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import AnalyticsHero from "../components/analytics/AnalyticsHero";
import AnalyticsOverview from "../components/analytics/AnalyticsOverview";
import LearningActivityChart from "../components/analytics/LearningActivityChart";
import CoursePerformance from "../components/analytics/CoursePerformance";
import LearningTrends from "../components/analytics/LearningTrends";
import CategoryBreakdown from "../components/analytics/CategoryBreakdown";
import AchievementsSection from "../components/analytics/AchievementsSection";
import TimeDistribution from "../components/analytics/TimeDistribution";

export default function Analytics() {
  const [toast, setToast] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleExportReport = () => {
    setToast("Analytics summary report generated successfully.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-8"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-4 sm:right-8 left-4 sm:left-auto max-w-md z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest border border-surface-container-highest/80 text-on-surface shadow-2xl backdrop-blur-lg"
          >
            <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
            <span className="text-sm font-medium">{toast}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 p-1 rounded-lg text-outline hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Analytics Hero */}
      <AnalyticsHero onExportReport={handleExportReport} />

      {/* 2. KPI Overview Cards */}
      <AnalyticsOverview />

      {/* 3. Interactive Learning Activity Chart (Daily / Weekly / Monthly) */}
      <LearningActivityChart />

      {/* 4. Course Performance & Mastery */}
      <CoursePerformance />

      {/* 5. Learning Consistency & Productivity Trends */}
      <LearningTrends />

      {/* 6. Subject Category Breakdown */}
      <CategoryBreakdown />

      {/* 7. Achievements & Learning Milestones */}
      <AchievementsSection />

      {/* 8. Time Distribution & Budget Adherence */}
      <TimeDistribution />
    </motion.div>
  );
}
