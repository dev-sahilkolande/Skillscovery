import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCheck, X, BellOff, ArrowRight } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";

export default function NotificationPopover({ isOpen, onClose, triggerRef }) {
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'unread'
  const popoverRef = useRef(null);
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification } =
    useNotifications();

  // Escape key and Click-outside dismissal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        if (triggerRef?.current) {
          triggerRef.current.focus();
        }
      }
    };

    const handleClickOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const filteredNotifications =
    activeFilter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const handleNotificationClick = (item) => {
    markAsRead(item.id);
    onClose();
    if (item.destination) {
      navigate(item.destination);
    }
  };

  return (
    <div
      ref={popoverRef}
      role="region"
      aria-label="Notifications panel"
      className="fixed top-18 left-3 right-3 sm:absolute sm:top-full sm:left-auto sm:right-0 mt-2 sm:w-96 max-w-sm sm:max-w-md bg-surface-container-low/95 backdrop-blur-2xl border border-surface-container-highest/60 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[520px] transition-all"
    >
      {/* Popover Header */}
      <div className="p-3.5 sm:p-4 border-b border-surface-container-highest/40 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="font-label-lg text-label-lg font-bold text-on-surface">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-tertiary-container/40 text-tertiary text-xs font-bold">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-outline hover:text-on-surface font-medium flex items-center gap-1 p-1 rounded-md hover:bg-surface-container transition-colors cursor-pointer"
              type="button"
              aria-label="Mark all notifications as read"
            >
              <CheckCheck size={14} className="text-secondary" />
              <span className="hidden sm:inline">Mark all read</span>
            </button>
          )}
          <button
            onClick={() => {
              onClose();
              if (triggerRef?.current) triggerRef.current.focus();
            }}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            type="button"
            aria-label="Close notifications"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-3.5 sm:px-4 pt-2 pb-1 flex items-center gap-2 border-b border-surface-container-highest/30 shrink-0 bg-surface-container/30">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeFilter === "all"
              ? "bg-surface-container-highest text-on-surface shadow-xs"
              : "text-outline hover:text-on-surface"
          }`}
          type="button"
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setActiveFilter("unread")}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeFilter === "unread"
              ? "bg-surface-container-highest text-on-surface shadow-xs"
              : "text-outline hover:text-on-surface"
          }`}
          type="button"
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notification List Container */}
      <div className="overflow-y-auto flex-1 divide-y divide-surface-container-highest/30">
        {filteredNotifications.length === 0 ? (
          <div className="py-10 px-4 text-center flex flex-col items-center justify-center space-y-2.5">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline">
              <BellOff size={22} />
            </div>
            <p className="font-label-md text-label-md font-semibold text-on-surface">
              {activeFilter === "unread"
                ? "No unread notifications"
                : "No notifications available"}
            </p>
            <p className="text-xs text-outline max-w-xs">
              {activeFilter === "unread"
                ? "You're all caught up with your study agenda and revisions."
                : "Check back later for scheduled revisions and study blocks."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 hover:bg-surface-container/60 transition-colors flex items-start gap-3 group relative ${
                !item.isRead ? "bg-surface-container-high/30" : ""
              }`}
            >
              {/* Unread indicator dot */}
              <div className="pt-1.5 shrink-0">
                {!item.isRead ? (
                  <span className="block w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(76,215,246,0.8)]"></span>
                ) : (
                  <span className="block w-2 h-2 rounded-full bg-surface-container-highest opacity-40"></span>
                )}
              </div>

              {/* Content block */}
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => handleNotificationClick(item)}
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase ${item.categoryColor}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[11px] text-outline font-mono">
                    {item.timestamp}
                  </span>
                </div>

                <h3 className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed line-clamp-2">
                  {item.message}
                </p>

                {item.destination && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-secondary group-hover:underline">
                    <span>View in app</span>
                    <ArrowRight size={12} />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                {!item.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(item.id);
                    }}
                    className="p-1 rounded-md text-outline hover:text-secondary hover:bg-surface-container transition-colors cursor-pointer"
                    type="button"
                    title="Mark as read"
                    aria-label={`Mark ${item.title} as read`}
                  >
                    <CheckCheck size={14} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissNotification(item.id);
                  }}
                  className="p-1 rounded-md text-outline hover:text-error hover:bg-surface-container transition-colors cursor-pointer"
                  type="button"
                  title="Dismiss notification"
                  aria-label={`Dismiss ${item.title}`}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
