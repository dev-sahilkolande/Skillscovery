import { useState } from "react";
import { X, Calendar, AlertCircle } from "lucide-react";
import { formatDate, parseDate, getWeekdayName } from "../../utils/dateUtils";
import { useModalA11y } from "../../hooks/useModalA11y";

const categoryColorMap = {
  "System Design": "bg-primary-container/30 text-primary",
  Programming: "bg-secondary-container/40 text-secondary",
  "Artificial Intelligence": "bg-tertiary-container/30 text-tertiary",
  "Computer Science": "bg-tertiary-container/30 text-tertiary",
  "Cloud & DevOps": "bg-secondary-container/40 text-secondary",
  Mathematics: "bg-primary-container/30 text-primary",
};

const categories = [
  "System Design",
  "Programming",
  "Artificial Intelligence",
  "Computer Science",
  "Cloud & DevOps",
  "Mathematics",
];

export default function SessionModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  defaultDate = "2026-11-05",
}) {
  const modalContainerRef = useModalA11y({
    isOpen,
    onClose,
  });

  const initialDateStr = initialData?.date || defaultDate || formatDate(new Date());
  const initialDayName = initialData?.day || getWeekdayName(parseDate(initialDateStr));

  const [formData, setFormData] = useState(() => ({
    subject: initialData?.subject || "",
    title: initialData?.title || "",
    date: initialDateStr,
    day: initialDayName,
    startTime: initialData?.startTime || "10:00",
    endTime: initialData?.endTime || "11:30",
    duration: initialData?.duration || "90 min",
    category: initialData?.category || "System Design",
    status: initialData?.status || "upcoming",
    notes: initialData?.notes || "",
  }));

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const derivedDay = getWeekdayName(parseDate(value));
      setFormData((prev) => ({ ...prev, date: value, day: derivedDay }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      setError("Please specify a subject or course name.");
      return;
    }
    if (!formData.title.trim()) {
      setError("Please provide a session title or focus topic.");
      return;
    }
    if (!formData.date) {
      setError("Please choose a valid session date.");
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setError("Please specify both start and end times.");
      return;
    }

    const categoryColor =
      categoryColorMap[formData.category] || "bg-primary-container/30 text-primary";

    const sessionPayload = {
      ...(initialData ? initialData : {}),
      id: initialData?.id || `sess-${Date.now()}`,
      subject: formData.subject.trim(),
      title: formData.title.trim(),
      day: formData.day,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration: formData.duration.trim() || "60 min",
      category: formData.category,
      categoryColor,
      status: formData.status,
      notes: formData.notes.trim(),
    };

    onSave(sessionPayload);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        ref={modalContainerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-modal-title"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-2xl bg-surface-container border border-surface-container-highest shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 max-h-[92vh] overflow-y-auto outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-container-highest pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <div>
              <h2 id="session-modal-title" className="font-title-lg text-title-lg font-bold text-on-surface">
                {initialData ? "Edit Study Session" : "Schedule Study Block"}
              </h2>
              <p className="font-label-sm text-label-sm text-outline">
                {initialData ? "Update session parameters and notes" : "Reserve dedicated deep-work time"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            type="button"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="p-3.5 rounded-xl bg-error/10 border border-error/30 text-error flex items-center gap-2 text-sm"
          >
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="session-subject"
                className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
              >
                Subject / Course
              </label>
              <input
                id="session-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Distributed Systems"
                aria-invalid={Boolean(error && !formData.subject.trim())}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface placeholder:text-outline text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="session-category"
                className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
              >
                Category
              </label>
              <select
                id="session-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Session Title */}
          <div>
            <label
              htmlFor="session-title"
              className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
            >
              Focus Topic / Title
            </label>
            <input
              id="session-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Kafka Partition Rebalancing & Heartbeats"
              aria-invalid={Boolean(error && !formData.title.trim())}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface placeholder:text-outline text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Date & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="session-date"
                className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
              >
                Session Date ({formData.day})
              </label>
              <input
                id="session-date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                aria-invalid={Boolean(error && !formData.date)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label
                htmlFor="session-status"
                className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
              >
                Session Status
              </label>
              <select
                id="session-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="upcoming">Upcoming (Scheduled)</option>
                <option value="ongoing">Ongoing (In Focus)</option>
                <option value="completed">Completed (Finished)</option>
              </select>
            </div>
          </div>

          {/* Times & Duration */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="session-start-time"
                className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
              >
                Start Time
              </label>
              <input
                id="session-start-time"
                type="text"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="14:00"
                aria-label="Start time (24-hour format)"
                className="w-full px-3 py-2 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors text-center font-mono"
              />
            </div>
            <div>
              <label
                htmlFor="session-end-time"
                className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
              >
                End Time
              </label>
              <input
                id="session-end-time"
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="15:30"
                aria-label="End time (24-hour format)"
                className="w-full px-3 py-2 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors text-center font-mono"
              />
            </div>
            <div>
              <label
                htmlFor="session-duration"
                className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
              >
                Duration
              </label>
              <input
                id="session-duration"
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="90 min"
                aria-label="Session duration"
                className="w-full px-3 py-2 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface text-sm focus:outline-none focus:border-primary transition-colors text-center"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="session-notes"
              className="block text-xs font-semibold text-outline uppercase tracking-wider mb-1.5"
            >
              Study Notes / Objectives
            </label>
            <textarea
              id="session-notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Work through protocol diagrams and write summary notes in Obsidian..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest text-on-surface placeholder:text-outline text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Dialog Action Buttons */}
          <div className="pt-4 border-t border-surface-container-highest flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors text-sm font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-secondary-container via-inverse-primary to-tertiary-container text-on-background font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {initialData ? "Save Changes" : "Create Study Block"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
