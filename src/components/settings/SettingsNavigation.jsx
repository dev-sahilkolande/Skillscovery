import {
  User,
  Palette,
  GraduationCap,
  Bell,
  ShieldCheck,
  Info,
} from "lucide-react";

const navItems = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal info & designation",
    icon: User,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme, accents & density",
    icon: Palette,
  },
  {
    id: "learning",
    label: "Learning Preferences",
    description: "Study goals & categories",
    icon: GraduationCap,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Reminders & progress alerts",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy & Data",
    description: "Local storage & reset options",
    icon: ShieldCheck,
  },
  {
    id: "about",
    label: "About Skillscovery",
    description: "App info, version & tech stack",
    icon: Info,
  },
];

export default function SettingsNavigation({ activeTab, onSelectTab }) {
  return (
    <nav aria-label="Settings sections" className="flex flex-col gap-2 w-full lg:w-72 shrink-0 min-w-0">
      <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-outline">
        Navigation
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5 w-full min-w-0" role="tablist" aria-label="Settings navigation tabs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-2 sm:gap-3.5 px-2.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-left transition-all cursor-pointer min-w-0 ${
                isActive
                  ? "bg-surface-container-high text-on-surface font-semibold shadow-md border border-surface-container-highest/60 text-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 border border-transparent"
              }`}
              type="button"
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "bg-surface-container-highest/40 text-outline"
                }`}
              >
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`text-sm truncate font-medium ${
                    isActive ? "text-on-surface font-semibold" : "text-on-surface-variant"
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-[11px] text-outline truncate hidden lg:block">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
