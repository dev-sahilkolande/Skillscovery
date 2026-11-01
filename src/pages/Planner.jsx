import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import PlannerHero from "../components/planner/PlannerHero";
import WeeklyCalendar from "../components/planner/WeeklyCalendar";
import DailySchedule from "../components/planner/DailySchedule";
import UpcomingSessions from "../components/planner/UpcomingSessions";
import StudyGoals from "../components/planner/StudyGoals";
import TimeTracking from "../components/planner/TimeTracking";
import SessionModal from "../components/planner/SessionModal";
import { initialSessionsData } from "../data/planner/plannerData";
import { parseDate, formatDate } from "../utils/dateUtils";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "../utils/storage";

export default function Planner() {
  const [sessions, setSessions] = useState(() =>
    getStoredItem(STORAGE_KEYS.PLANNER_SESSIONS, initialSessionsData, (data) => Array.isArray(data))
  );
  // Initial date starts on Thursday, Nov 5, 2026 to showcase the initial mock sessions
  const [selectedDate, setSelectedDate] = useState(() => new Date(2026, 10, 5));
  const [viewMode, setViewMode] = useState("daily");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [modalDefaultDate, setModalDefaultDate] = useState("2026-11-05");
  const [toast, setToast] = useState(null);

  // Persist sessions to storage on change
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.PLANNER_SESSIONS, sessions);
  }, [sessions]);

  // Auto-dismiss toast after 3.5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (text, type = "success") => {
    setToast({ text, type });
  };

  const handlePrevWeek = () => {
    setSelectedDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7)
    );
  };

  const handleNextWeek = () => {
    setSelectedDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7)
    );
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    showToast("Jumped to current date", "info");
  };

  const handleSelectDate = (date) => {
    const d = date instanceof Date ? date : parseDate(date);
    setSelectedDate(d);
  };

  const handleOpenNewSession = (targetDateStr) => {
    setEditingSession(null);
    setModalDefaultDate(targetDateStr || formatDate(selectedDate));
    setIsModalOpen(true);
  };

  const handleEditSession = (session) => {
    setEditingSession(session);
    setModalDefaultDate(session.date || formatDate(selectedDate));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSession(null);
  };

  const handleSaveSession = (sessionPayload) => {
    setSessions((prev) => {
      const exists = prev.some((s) => s.id === sessionPayload.id);
      if (exists) {
        return prev.map((s) => (s.id === sessionPayload.id ? sessionPayload : s));
      }
      return [sessionPayload, ...prev];
    });

    // Navigate to session date so newly added/edited session is immediately visible
    if (sessionPayload.date) {
      setSelectedDate(parseDate(sessionPayload.date));
    }

    if (editingSession) {
      showToast(`Updated session: "${sessionPayload.title}"`, "info");
    } else {
      showToast(`Scheduled new study block: "${sessionPayload.title}"`, "success");
    }
  };

  const handleDeleteSession = (sessionId) => {
    const target = sessions.find((s) => s.id === sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast(`Removed session: "${target?.title || "Study block"}"`, "warning");
  };

  const handleToggleStatus = (sessionId, nextStatus) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        let updatedStatus = nextStatus;
        if (!updatedStatus) {
          if (s.status === "upcoming") updatedStatus = "ongoing";
          else if (s.status === "ongoing") updatedStatus = "completed";
          else updatedStatus = "upcoming";
        }
        return { ...s, status: updatedStatus };
      })
    );

    const target = sessions.find((s) => s.id === sessionId);
    const updatedStatusText =
      nextStatus ||
      (target?.status === "upcoming"
        ? "ongoing"
        : target?.status === "ongoing"
        ? "completed"
        : "upcoming");
    showToast(`Marked "${target?.title}" as ${updatedStatusText}`, "info");
  };

  const handleStartSession = (sessionId) => {
    const target = sessions.find((s) => s.id === sessionId);
    if (target) {
      if (target.date) {
        setSelectedDate(parseDate(target.date));
      }
      handleToggleStatus(sessionId, "ongoing");
      showToast(`Focus session started: "${target.title}"`, "success");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col w-full min-w-0 max-w-full pb-16 space-y-8"
    >
      {/* Interactive Toast Notification Feedback */}
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
            {toast.type === "success" && (
              <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
            )}
            {toast.type === "info" && (
              <Info size={18} className="text-primary flex-shrink-0" />
            )}
            {toast.type === "warning" && (
              <AlertCircle size={18} className="text-tertiary flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.text}</span>
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

      {/* 1. Planner Overview Hero */}
      <PlannerHero onOpenNewSessionModal={() => handleOpenNewSession()} />

      {/* 2. Weekly Calendar with Navigation & View Switching */}
      <WeeklyCalendar
        sessions={sessions}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onOpenNewSessionModal={handleOpenNewSession}
      />

      {/* 3. Daily Study Schedule (when in daily view) */}
      {viewMode === "daily" && (
        <DailySchedule
          selectedDate={selectedDate}
          sessions={sessions}
          onOpenNewSessionModal={handleOpenNewSession}
          onEditSession={handleEditSession}
          onDeleteSession={handleDeleteSession}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {/* 4. Upcoming Sessions Queue across all days */}
      <UpcomingSessions
        sessions={sessions}
        onStartSession={handleStartSession}
        onEditSession={handleEditSession}
        onOpenNewSessionModal={() => handleOpenNewSession()}
      />

      {/* 5. Study Goals Progress */}
      <StudyGoals />

      {/* 6. Time Tracking & Adherence Analytics */}
      <TimeTracking />

      {/* 7. Interactive Session Creation / Edit Modal */}
      {isModalOpen && (
        <SessionModal
          key={editingSession ? editingSession.id : `new-${modalDefaultDate}`}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveSession}
          initialData={editingSession}
          defaultDate={modalDefaultDate}
        />
      )}
    </motion.div>
  );
}
