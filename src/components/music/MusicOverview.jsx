import { Music, Disc3, Heart, History } from "lucide-react";
import { tracksData, playlistsData } from "../../data/music/musicData";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

export default function MusicOverview({ onSelectTab }) {
  const { favoriteIds, recentlyPlayed } = useAudioPlayer();

  const cards = [
    {
      id: "all-tracks",
      label: "Total Focus Tracks",
      value: `${tracksData.length}`,
      subtext: "Across 6 sonic categories",
      icon: Music,
      color: "text-primary",
      bg: "bg-primary-container/20",
      borderHover: "hover:border-primary/50",
    },
    {
      id: "playlists",
      label: "Handcrafted Playlists",
      value: `${playlistsData.length} Channels`,
      subtext: "Curated for deep work intervals",
      icon: Disc3,
      color: "text-secondary",
      bg: "bg-secondary-container/30",
      borderHover: "hover:border-secondary/50",
    },
    {
      id: "favorites",
      label: "Favorite Tracks",
      value: `${favoriteIds.length} Starred`,
      subtext: "Quick-access cognitive triggers",
      icon: Heart,
      color: "text-tertiary",
      bg: "bg-tertiary-container/30",
      borderHover: "hover:border-tertiary/50",
    },
    {
      id: "recent",
      label: "Recently Played",
      value: `${recentlyPlayed.length} Recent`,
      subtext: "Resumable session history",
      icon: History,
      color: "text-primary",
      bg: "bg-primary-container/20",
      borderHover: "hover:border-primary/50",
    },
  ];

  return (
    <section className="w-full min-w-0 max-w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectTab && onSelectTab(card.id)}
              aria-label={`${card.label}: ${card.value}, ${card.subtext}`}
              className={`w-full text-left rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-surface-container-highest/40 p-4 sm:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${card.borderHover} cursor-pointer flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-w-0`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}
                  >
                    <Icon size={22} className={card.color} />
                  </div>
                  <span className="text-xs font-semibold text-outline px-2.5 py-1 rounded-full bg-surface-container">
                    Active
                  </span>
                </div>

                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">
                  {card.label}
                </span>
                <p className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                  {card.value}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-surface-container-highest/40">
                <span className="text-xs text-on-surface-variant leading-tight block">
                  {card.subtext}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
