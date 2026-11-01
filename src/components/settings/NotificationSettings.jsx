import {
  Bell,
  Calendar,
  Award,
  Sparkles,
  Flame,
  Volume2,
  Info,
} from "lucide-react";

const notificationItems = [
  {
    id: "dailyReminders",
    title: "Daily Study Reminders",
    description:
      "Alerts to start your scheduled study session according to your preferred study rhythm.",
    icon: Bell,
    badge: "Session Cadence",
  },
  {
    id: "streakProtection",
    title: "Study Streak & Recovery Reminders",
    description:
      "Timely reminders before midnight to protect your active 18-day study streak.",
    icon: Flame,
    badge: "Streak Alert",
    iconColor: "text-amber-400",
  },
  {
    id: "milestoneAlerts",
    title: "Learning Milestone Celebrations",
    description:
      "In-app toasts and celebratory badges when completing roadmap modules and video workshops.",
    icon: Award,
    badge: "Achievement",
    iconColor: "text-secondary",
  },
  {
    id: "weeklySummaries",
    title: "Weekly Progress Analytics Digest",
    description:
      "Overview notification summarizing study hours, completed topics, and velocity against weekly goals.",
    icon: Calendar,
    badge: "Weekly Report",
    iconColor: "text-tertiary",
  },
  {
    id: "courseRecommendations",
    title: "Curriculum Recommendations",
    description:
      "Personalized alerts when new advanced workshops or roadmap tracks match your technical focus.",
    icon: Sparkles,
    badge: "Discovery",
    iconColor: "text-primary",
  },
  {
    id: "audioPlaybackEvents",
    title: "Focus Music Track Transitions",
    description:
      "Subtle toast banner indicating when lo-fi audio tracks advance during active study blocks.",
    icon: Volume2,
    badge: "Audio Dock",
    iconColor: "text-outline",
  },
];

export default function NotificationSettings({
  notifications,
  onUpdateNotifications,
  showToast,
}) {
  const handleToggle = (id, title) => {
    const updated = !notifications[id];
    onUpdateNotifications({
      ...notifications,
      [id]: updated,
    });
    showToast &&
      showToast(`${title} ${updated ? "activated" : "disabled"}.`);
  };

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      {/* Notifications Header Card */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="pb-4 border-b border-surface-container-highest/40 mb-6 flex items-center justify-between flex-wrap gap-2">
          <div className="min-w-0">
            <h4 className="font-title-md text-title-md font-bold text-on-surface">
              Notification Preferences
            </h4>
            <p className="text-xs text-outline mt-0.5">
              Customize which reminders and milestones trigger in-app updates.
            </p>
          </div>
          <span className="text-xs font-mono text-outline shrink-0">
            {Object.values(notifications).filter(Boolean).length} / {notificationItems.length} active
          </span>
        </div>

        {/* Notification Toggles List */}
        <div className="space-y-3.5 w-full min-w-0">
          {notificationItems.map((item) => {
            const Icon = item.icon;
            const isEnabled = !!notifications[item.id];

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/40 hover:bg-surface-container/70 transition-all gap-3 sm:gap-4 min-w-0 w-full"
              >
                <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isEnabled
                        ? "bg-surface-container-highest text-primary"
                        : "bg-surface-container-lowest text-outline"
                    }`}
                  >
                    <Icon size={18} className={item.iconColor || "text-primary"} />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-on-surface">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-surface-container-highest text-outline uppercase tracking-wider shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-outline leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Accessible Toggle Button */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.id, item.title)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    isEnabled ? "bg-primary" : "bg-surface-container-highest"
                  }`}
                  role="switch"
                  aria-checked={isEnabled}
                  aria-label={`Toggle ${item.title}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* In-App Notifications Disclaimer */}
        <div className="mt-5 p-3.5 rounded-xl bg-surface-container-low/80 border border-surface-container-highest/60 flex items-start gap-3 min-w-0">
          <Info size={16} className="text-tertiary shrink-0 mt-0.5" />
          <div className="text-xs text-outline leading-relaxed min-w-0">
            <span className="font-semibold text-on-surface">Client-Side Scoped: </span>
            Notification preferences regulate in-app HUD toasts, streak badges, and study planner reminders.
            No external push protocols or background email servers are engaged in this frontend build.
          </div>
        </div>
      </div>
    </div>
  );
}
